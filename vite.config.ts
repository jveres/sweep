import { execFile } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig, type Plugin } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

/**
 * Repacks the JSON artifacts whenever a roadmap Markdown source changes, so
 * an edit shows up on the next reload instead of silently serving the
 * artifact packed at dev-server startup.
 */
function roadmapArtifacts(): Plugin {
	const sources = resolve(root, "roadmaps");
	let packing = false;
	let queued = false;
	return {
		name: "roadmap-artifacts",
		configureServer(server) {
			const pack = (): void => {
				// A save landing mid-pack queues one trailing run, so the last
				// edit always wins instead of being silently dropped.
				if (packing) {
					queued = true;
					return;
				}
				packing = true;
				execFile("node", [resolve(root, "scripts/build-roadmaps.mjs")], (error) => {
					packing = false;
					if (error) server.config.logger.error(`roadmap repack failed: ${error.message}`);
					else {
						server.config.logger.info("roadmap artifacts repacked — reload to see the update");
						server.ws.send({ type: "full-reload" });
					}
					if (queued) {
						queued = false;
						pack();
					}
				});
			};
			server.watcher.add(sources);
			server.watcher.on("change", (file) => {
				if (file.startsWith(sources) && file.endsWith(".md")) pack();
			});
		},
	};
}

export default defineConfig({
	plugins: [cloudflare(), roadmapArtifacts()],
	build: {
		target: "es2024",
	},
	resolve: {
		// pnpm copies file: dependencies into node_modules as a frozen
		// snapshot, and Vite does not watch node_modules — so svg-roadmap
		// rebuilds never reached a running dev server. Resolving the imports
		// straight to the sibling checkout's dist keeps dev AND build on the
		// live output: rebuild the library and the page reloads itself.
		alias: [
			{
				find: /^svg-roadmap\/(.+)$/,
				replacement: resolve(root, "../svg-roadmap/dist/$1.js"),
			},
		],
	},
	optimizeDeps: {
		// Aliased to real files outside node_modules; never prebundle the
		// package (a lockfile-keyed cache of a file: dep goes stale silently).
		exclude: ["svg-roadmap"],
	},
	server: {
		fs: {
			// pnpm links svg-roadmap (and its comrak-wasm dependency) from the
			// sibling checkouts, outside this project root — the dev server
			// needs them on its allow list to serve their files.
			allow: [root, resolve(root, "../svg-roadmap"), resolve(root, "../comrak-wasm")],
		},
	},
});

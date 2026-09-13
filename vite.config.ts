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
});

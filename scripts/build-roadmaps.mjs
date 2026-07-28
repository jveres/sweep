// Packs the roadmap Markdown sources into the versioned JSON artifacts the
// comrak-free <roadmap-preview> element consumes. This is the single step
// that runs the Wasm parser, and it runs here — never in a visitor's browser.
//
//   node scripts/build-roadmaps.mjs
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateRoadmap, initializeRoadmapNode, packRoadmapDocument } from "svg-roadmap";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sources = ["sweep-1.0", "sweep-1.1"];
const outDir = join(root, "public", "roadmaps");

await initializeRoadmapNode();
await mkdir(outDir, { recursive: true });

for (const id of sources) {
	const markdown = await readFile(join(root, "roadmaps", `${id}.md`), "utf8");
	const { document } = generateRoadmap(markdown);
	const target = join(outDir, `${id}.json`);
	await writeFile(target, JSON.stringify(packRoadmapDocument(document)));
	const { stats } = document;
	console.log(
		`wrote public/roadmaps/${id}.json — ${stats.chapters} chapters, ${stats.topics} topics, depth ${stats.maxDepth}`,
	);
}

# sweep.engineering

Website for the Sweep engineering-practices roadmap, built around the
`<roadmap-preview>` web component from the sibling `svg-roadmap` library.

## The pieces (sibling checkouts under ~/research)

- `../svg-roadmap` — the roadmap library (github.com/jveres/svg-roadmap).
  - **Read first:** `README.md`, section "Embedding: viewer and
    `<roadmap-preview>`" — it has the complete artifact + embed recipe.
  - **Reference integration:** `demo/main.ts` + `demo/style.css` — the
    workbench drives the same element, including `::part()` chrome styling,
    `renderNote`, the emoji pack, and DOM measurement.
  - **The roadmap content:** the canonical Sweep sources live in THIS repo
    under `roadmaps/` (fun theme, full link coverage, notes). The copies in
    `../svg-roadmap/demo/sweep-*.md` are workbench snapshots — edit here,
    refresh there when convenient.
  - Theming reference if the site needs custom looks: `docs/theming.md`.
- `../comrak-wasm` — the Markdown parser; a transitive `file:` dependency of
  svg-roadmap. Public at github.com/jveres/comrak-wasm.

## Consuming svg-roadmap (it is NOT on npm)

- Add `"svg-roadmap": "file:../svg-roadmap"` (use pnpm; its internal
  `comrak-wasm: file:../comrak-wasm` resolves relative to svg-roadmap, so the
  sibling layout matters).
- The package's entry points live in `dist/` — after changing or pulling
  svg-roadmap, run `pnpm build` inside `../svg-roadmap` or imports break.
- Node ≥ 22 required.

## Where comrak-wasm is (and is not) involved

The site only uses the preview/viewer entries, which are **comrak-free by
construction** (an import-graph test in svg-roadmap enforces it) — visitors
never download Wasm. Parsing Markdown into the artifact is the single
comrak-dependent step, and it runs once, ahead of the pages:

1. **Build-time artifact (recommended):** a Node build step in this repo
   parses the Markdown and writes the JSON artifact. comrak-wasm resolves
   automatically as svg-roadmap's transitive dependency — nothing to
   configure, and it never reaches the browser.
   - Build: `initializeRoadmapMarkdown()` then
     `import { generateRoadmap, packRoadmapDocument } from "svg-roadmap"` →
     write `JSON.stringify(packRoadmapDocument(generateRoadmap(md).document))`
     to e.g. `public/sweep.json`.
   - Page: `import "svg-roadmap/preview";` then
     `<roadmap-preview src="/sweep.json" storage-key="sweep"></roadmap-preview>`.
2. **Pre-committed artifact:** generate `sweep.json` in the svg-roadmap repo
   (`pnpm pack:artifact demo/sweep-1.1.md sweep.json`) and commit it here —
   then this repo never executes the parser at all.
3. **Client-side generation** (only for editor-like pages):
   `generateRoadmapSvg` / `createRoadmapGenerator` from `"svg-roadmap"` —
   this is the one mode that loads the Wasm parser in the browser.

Either way `comrak-wasm` shows up in node_modules (it is a dependency of
svg-roadmap); installed-but-unimported is expected and fine.

## `<roadmap-preview>` notes (hard-won in the library sessions)

- The interactive layer defaults ON (progress tracking, detail panel,
  keyboard); spotlight defaults OFF. The `…` menu carries appearance
  (light/dark/system), theme select, both toggles, and SVG download; zoom
  −/%/+ sits in the header. `chromeless` drops the whole bar.
- Give the element a CSS height (e.g. `height: 85vh`) for a scrolling,
  zooming pane; without one it grows to the chart's natural size.
- `storage-key` scopes zoom + progress persistence per chart — set it, or
  different pages sharing localStorage will collide.
- Style chrome via `::part(header|title|controls|canvas|menu|menu-button|…)`;
  chart card styling via `--roadmap-preview-chart-radius` and
  `--roadmap-preview-chart-shadow` custom properties on the element.
- Rich topic notes: assign `preview.renderNote = (markdown) => html` — the
  workbench passes comrak-wasm's `mdToHtml`.
- Full emoji artwork: `registerEmojiArtwork(githubEmojiArtwork)` from
  `"svg-roadmap/emoji-github"` (~1 MB — lazy-load it, then `preview.refresh()`).
- Real-font measurement is REQUIRED wherever the chart is laid out — and
  `<roadmap-preview>` lays out at view time, so every page embedding it needs
  `installDomMeasurement({ onFontsChanged: () => preview.refresh() })` (from
  `svg-roadmap/viewer`; comrak-free) before the first render. Without it the
  estimate fallback wraps/overflows text differently than the workbench.
- Events: `roadmap-render` (theme/mode/size), `roadmap-select` (topic detail
  incl. `sourceRange`), `roadmap-change` (progress), `roadmap-error`.
- The artifact can also be inlined in a
  `<script type="application/roadmap+json">` child or set via the
  `.artifact` property — no fetch needed for a fully static page.

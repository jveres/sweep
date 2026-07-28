# Sweep — Software Engineering Essential Practices 🧹

**Sweep** is a curated map of the practices that keep engineering clean — a
practical path to better quality at higher speed, organized as an interactive
roadmap rather than a checklist. Practices are grouped by maturity: start
with the **foundation** tier, adopt **contextual** practices when they apply,
and add the **advanced** ones at scale. Every topic links to the source
material worth handing a colleague.

**Live at [sweep.engineering](https://sweep.engineering)** — click a topic
for its note and links, tick off what your team already does (progress stays
in your browser), and switch themes from the settings menu.

Use these definitions as a shared vocabulary, and adapt each practice to the
product's risk, scale, and operating context.

## The roadmap content

- `roadmaps/sweep-1.1.md` — the current edition, grouped by maturity tags.
- `roadmaps/sweep-1.0.md` — the original edition, kept for reference.

These files are the **canonical** Sweep sources, written in the
[svg-roadmap](https://github.com/jveres/svg-roadmap) Markdown dialect.
**Never let a Markdown formatter touch them**: list markers (`+` grid,
`*`/`-` mirroring) and emphasis styles are semantic, and normalizing them
silently breaks the chart (`.prettierignore` covers Prettier; disable
format-on-save for other formatters).

## How the site works

- `scripts/build-roadmaps.mjs` — the only step that runs the comrak-wasm
  Markdown parser. It packs each source into a versioned JSON artifact under
  `public/roadmaps/`; visitors download JSON, never Wasm.
- `src/` — the page: the `<roadmap-preview>` element from svg-roadmap with a
  roadmap selector, a collapsible introduction, theme/mode persistence, a
  lazy-loaded emoji pack, and live stats badges.
- `worker/index.ts` — a Cloudflare Worker serving the static build plus
  `/api/live` (WebSocket), `/api/stats`, and `/api/like`, backed by the
  `SweepStats` Durable Object. Viewers is presence — each open page holds
  one hibernatable WebSocket and the count is the size of the socket set;
  visits and likes persist in the object's SQLite storage. Every join,
  leave, visit, and like broadcasts fresh totals to all connected pages.

## Developing

Requires Node ≥ 22, [pnpm](https://pnpm.io), and sibling checkouts of the
rendering stack (the site consumes them as `file:` dependencies):

```sh
git clone https://github.com/jveres/comrak-wasm
git clone https://github.com/jveres/svg-roadmap
git clone https://github.com/jveres/sweep sweep.engineering
cd svg-roadmap && pnpm install && pnpm build
cd ../sweep.engineering && pnpm install
pnpm dev        # packs the artifacts, then Vite + local Worker/DO
```

Edits to `roadmaps/*.md` repack the JSON artifacts automatically during dev,
and svg-roadmap rebuilds reload the page (imports resolve straight to the
sibling's `dist/`).

## Deploying

```sh
pnpm deploy     # build + wrangler deploy (wrangler login first, once)
```

## Contact

János Veres · [sweep@jveres.me](mailto:sweep@jveres.me)

## License

[MIT](LICENSE)

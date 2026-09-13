# Sweep — Software Engineering Essential Practices 🧹

**Sweep** is a curated engineering map connecting discovery, delivery, and
operations. It helps teams ask useful questions, understand why practices
matter, and find references for further study.

**Live at [sweep.engineering](https://sweep.engineering)** — click a topic
for its note and links, and switch editions or appearance in the controls.

Sweep is a discussion aid. It does not define a validated maturity model,
a compliance assessment, or a prescribed adoption sequence. The map mixes
capabilities, methods, tools, and team conditions; counting them cannot
measure engineering quality.

## Read the map

Sweep 1.2 uses two editorial reading cues:

| Cue | How to use it |
|---|---|
| **Review routinely** | Revisit the concern and decide what adequate coverage means for this product. This does not prescribe a tool or implementation depth. |
| **Context dependent** | Choose the practice when a specific need justifies its prerequisites, setup, and ongoing cost. A small team can have that need. |

Both cues require judgment about risk, users, system boundaries, and
operating responsibilities. Neither measures how well a team performs a
practice. Relationships in the map show useful connections, not a formal
prerequisite graph.

Topic links provide definitions, research, or example techniques. Notes
also contain editorial recommendations. A linked source does not establish
that a recommendation applies universally.

## Choose an improvement

Use the map to investigate a current problem. This lightweight discussion
process is guidance, not a validated adoption method:

1. Name a user problem, material risk, or delivery constraint and record the
   current evidence. Consider urgent obligations before convenience.
2. Select a relevant concern and compare possible practices. Record scope,
   prerequisites, setup cost, maintenance cost, and the person responsible.
3. Define a small trial, the evidence you expect, a baseline, and a review
   date. Use observed behavior rather than the presence of a tool or policy.
4. Review the result. Keep, adapt, or stop the change based on its benefits,
   costs, and side effects. Record why a practice is inapplicable and the
   conditions that would make you revisit it.

For example, when restoring customer data is uncertain, a useful trial is
an isolated restore with completeness checks and measured recovery time.
The owner compares the result with the agreed recovery targets. Merely
having a backup job is weaker evidence.

Keep that evidence in your team's existing shared records. The chart's
checkmarks and completion percentage are personal tracking aids stored in
this browser, separately for each edition. They are not a team score.

## The roadmap content

The sources retain earlier editions for reference:

- [Sweep 1.2](roadmaps/sweep-1.2.md) — current edition, with reading cues,
  qualified claims, and more precise references.
- [Sweep 1.1](roadmaps/sweep-1.1.md) — the previous edition, including its
  original maturity terminology.
- [Sweep 1.0](roadmaps/sweep-1.0.md) — the original edition.
- [Sweep 1.2 review](docs/sweep-1.2-review.md) — findings, source audit,
  editorial decisions, and limits of the review.

The roadmap files are the **canonical** Sweep sources, written in the
[svg-roadmap](https://github.com/jveres/svg-roadmap) Markdown dialect.
**Never let a Markdown formatter touch them**: list markers (`+` grid,
`*`/`-` mirroring) and emphasis styles are semantic, and normalizing them
silently breaks the chart. `.prettierignore` covers Prettier; disable
format-on-save for other formatters.

## How the site works

The build prepares the map before visitors load it:

- `scripts/build-roadmaps.mjs` runs the comrak-wasm Markdown parser and packs
  each edition into a JSON artifact under `public/roadmaps/`. Visitors
  download JSON, never Wasm.
- `src/` embeds `<roadmap-preview>` with an edition selector, introduction,
  theme persistence, a lazy emoji pack, and live stats badges.
- `worker/index.ts` serves the static build and the live stats API. The
  `SweepStats` Durable Object tracks connected viewers through WebSockets
  and stores visit and like totals in SQLite storage.

## Developing

Requires Node ≥ 22 and [pnpm](https://pnpm.io). The manifest pins
`svg-roadmap` to its GitHub `v0.1.1` tag. Its `prepare` script builds the
package during installation; `pnpm-workspace.yaml` permits that build for
the pinned commit. A sibling checkout is not required.

```sh
git clone https://github.com/jveres/sweep sweep.engineering
cd sweep.engineering
pnpm install --frozen-lockfile
pnpm dev
```

Edits to `roadmaps/*.md` repack the JSON artifacts automatically during dev.
When adding an edition, update the source list in
`scripts/build-roadmaps.mjs` and the selector in `src/main.ts`.

Run the project checks before submitting changes:

```sh
pnpm typecheck
pnpm check
pnpm build
```

## Deploying

After authenticating with Wrangler, build and deploy the site:

```sh
pnpm deploy
```

## Contact

János Veres · [sweep@jveres.me](mailto:sweep@jveres.me)

## License

Sweep uses the [MIT license](LICENSE).

import "svg-roadmap/preview";
import type { RoadmapPreviewElement } from "svg-roadmap/preview";
import { installDomMeasurement, registerEmojiArtwork } from "svg-roadmap/viewer";
import intro from "./intro.html?raw";
import { renderNoteMarkdown } from "./notes.ts";
import { hasLiked, recordVisit, type SiteStats, setLiked, subscribeStats } from "./stats.ts";
import "./style.css";

type RoadmapSample = {
	readonly label: string;
	readonly artifact: string;
};

const samples: Readonly<Record<string, RoadmapSample>> = {
	"sweep-1.0": {
		label: "Sweep 1.0",
		artifact: "/roadmaps/sweep-1.0.json",
	},
	"sweep-1.1": {
		label: "Sweep 1.1",
		artifact: "/roadmaps/sweep-1.1.json",
	},
};

const defaultSampleId = "sweep-1.1";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("The app root element is missing.");

app.innerHTML = `
	<header class="toolbar">
		<div>
			<p class="eyebrow">sweep.engineering</p>
			<h1>Engineering practices roadmap</h1>
		</div>
		<div class="actions">
			<span id="live" class="stat-badge stat-badge--idle live-badge" title="Viewing now">
				<span class="live-dot" aria-hidden="true"></span>
				<span id="live-count" class="stat-count" aria-hidden="true"></span>
				<span id="live-label" class="visually-hidden"></span>
			</span>
			<span id="visits" class="stat-badge stat-badge--idle" title="Visitors">
				<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8s-2.4 4.5-6.5 4.5S1.5 8 1.5 8Z"/><circle cx="8" cy="8" r="2.2"/></svg>
				<span id="visits-count" class="stat-count" aria-hidden="true"></span>
				<span id="visits-label" class="visually-hidden"></span>
			</span>
			<button id="like" class="stat-badge stat-badge--idle like-button" type="button" aria-pressed="false">
				<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13.5S2 10.2 2 5.9C2 3.9 3.6 2.5 5.3 2.5c1.2 0 2.2.7 2.7 1.7.5-1 1.5-1.7 2.7-1.7C12.4 2.5 14 3.9 14 5.9c0 4.3-6 7.6-6 7.6Z"/></svg>
				<span id="like-count" class="stat-count" aria-hidden="true"></span>
				<span id="like-label" class="visually-hidden"></span>
			</button>
			<label class="theme-picker">
				<select id="sample" aria-label="Roadmap">
					${Object.entries(samples)
						.map(
							([id, sample]) =>
								`<option value="${id}"${id === defaultSampleId ? " selected" : ""}>${sample.label}</option>`,
						)
						.join("")}
				</select>
			</label>
		</div>
	</header>
	<main id="workbench" class="workbench">
		<section id="intro-panel" class="intro-panel" aria-labelledby="intro-title">
			<div class="panel-heading">
				<button
					id="toggle-intro"
					class="panel-toggle"
					type="button"
					aria-controls="intro-body"
					aria-expanded="true"
				>
					<!-- The glyph sits 0.75 left of the geometric center: a chevron's open
     side reads heavier, so a centered path looks shifted toward it. The
     rail state rotates the svg 180°, flipping the correction with it. -->
					<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3.5 5 8 9.5 12.5"/></svg>
				</button>
				<h2 id="intro-title">Introduction</h2>
			</div>
			<div id="intro-body" class="intro-body">${intro}</div>
		</section>
		<section class="preview-panel" aria-label="Roadmap">
			<p id="load-error" class="error" role="alert" hidden></p>
			<roadmap-preview id="preview" class="preview" aria-live="polite"></roadmap-preview>
		</section>
	</main>
`;

function requiredElement<ElementType extends Element>(selector: string): ElementType {
	const element = document.querySelector<ElementType>(selector);
	if (!element) throw new Error(`The control ${selector} is missing.`);
	return element;
}

const sampleSelect = requiredElement<HTMLSelectElement>("#sample");
const preview = requiredElement<RoadmapPreviewElement>("#preview");
const loadError = requiredElement<HTMLParagraphElement>("#load-error");
const liveBadge = requiredElement<HTMLSpanElement>("#live");
const liveCount = requiredElement<HTMLSpanElement>("#live-count");
const liveLabel = requiredElement<HTMLSpanElement>("#live-label");
const visitsBadge = requiredElement<HTMLSpanElement>("#visits");
const visitsCount = requiredElement<HTMLSpanElement>("#visits-count");
const visitsLabel = requiredElement<HTMLSpanElement>("#visits-label");
const likeButton = requiredElement<HTMLButtonElement>("#like");
const likeCount = requiredElement<HTMLSpanElement>("#like-count");
const likeLabel = requiredElement<HTMLSpanElement>("#like-label");
const workbench = requiredElement<HTMLElement>("#workbench");
const toggleIntro = requiredElement<HTMLButtonElement>("#toggle-intro");
const previewOnlyClass = "workbench--preview-only";
let introHidden = false;

const previewStorageKey = (id: string): string => `sweep:${id}`;

// v2: v1 saved a theme/mode on every settings write — even when the visitor
// never chose one — which pinned everyone to the launch theme. Discard it.
const settingsStorageKey = "sweep-site-settings:v2";
try {
	localStorage.removeItem("sweep-site-settings");
} catch {
	// Storage may be unavailable; there is nothing to migrate then anyway.
}

type SiteSettings = {
	readonly sample?: string;
	readonly theme?: string | undefined;
	readonly mode?: string | undefined;
	readonly introHidden?: boolean;
	readonly interactive?: boolean;
	readonly spotlight?: boolean;
};

function loadStoredSettings(): SiteSettings {
	try {
		return JSON.parse(localStorage.getItem(settingsStorageKey) ?? "{}") as SiteSettings;
	} catch {
		return {};
	}
}

function saveSettings(): void {
	try {
		localStorage.setItem(
			settingsStorageKey,
			JSON.stringify({
				sample: sampleSelect.value,
				// Absent attributes stay absent (JSON drops undefined), so the
				// artifact's own front-matter keeps deciding the defaults.
				theme: preview.getAttribute("theme") ?? undefined,
				mode: preview.getAttribute("mode") ?? undefined,
				introHidden,
				interactive: preview.hasAttribute("interactive"),
				spotlight: preview.hasAttribute("spotlight"),
			} satisfies SiteSettings),
		);
	} catch {
		// Storage may be unavailable (private browsing); settings just do not persist.
	}
}

function loadSample(id: string): void {
	const sample = samples[id];
	if (!sample) return;
	loadError.hidden = true;
	// The storage key scopes zoom + progress per roadmap; set it before the
	// artifact URL so the incoming chart restores its own state.
	preview.setAttribute("storage-key", previewStorageKey(id));
	preview.setAttribute("src", sample.artifact);
}

/**
 * Collapses the introduction so the roadmap spans the full window. The panel
 * keeps a narrow rail carrying its chevron and title, so the control that
 * collapsed it is still where the reader left it. The label lives on
 * aria-label rather than in the button, whose content is the chevron.
 */
function setIntroHidden(hidden: boolean): void {
	introHidden = hidden;
	const label = hidden ? "Show introduction" : "Hide introduction";
	workbench.classList.toggle(previewOnlyClass, hidden);
	toggleIntro.setAttribute("aria-expanded", hidden ? "false" : "true");
	toggleIntro.setAttribute("aria-label", label);
	toggleIntro.title = label;
}

const storedSettings = loadStoredSettings();
if (storedSettings.sample && samples[storedSettings.sample]) {
	sampleSelect.value = storedSettings.sample;
}
// The introduction starts collapsed — the roadmap is the page; a stored
// session that opened it keeps it open.
setIntroHidden(storedSettings.introHidden !== false);

// The element's own menu is the settings surface; the page only seeds stored
// values. A programmatic theme or mode overrides the artifact's front-matter,
// so both attributes are set only when a stored session actually chose one —
// a fresh visitor gets whatever the roadmap's own front-matter declares.
// Interactive follows the element default (on) unless a stored session
// switched it off.
if (storedSettings.theme) preview.setAttribute("theme", storedSettings.theme);
if (storedSettings.mode) preview.setAttribute("mode", storedSettings.mode);
if (storedSettings.interactive !== undefined) {
	preview.toggleAttribute("interactive", storedSettings.interactive);
}
preview.toggleAttribute("spotlight", storedSettings.spotlight === true);
// Notes arrive as authored Markdown; the tiny built-in renderer keeps the
// browser comrak-free (output is escaped before formatting, so it is inert).
preview.renderNote = renderNoteMarkdown;
// The element lays the chart out at view time, so text must be measured with
// the browser's real fonts — the estimate fallback wraps and overflows
// differently than the workbench. Late font loads re-render.
await installDomMeasurement({ onFontsChanged: () => preview.refresh() });
loadSample(sampleSelect.value);

// Settings changed through the menu persist across reloads.
new MutationObserver(() => saveSettings()).observe(preview, {
	attributes: true,
	attributeFilter: ["theme", "mode", "interactive", "spotlight"],
});

// The page chrome follows the chart's resolved light/dark mode.
preview.addEventListener("roadmap-render", (event) => {
	const detail = (event as CustomEvent<{ mode: string }>).detail;
	document.documentElement.dataset.siteTheme = detail.mode;
});
preview.addEventListener("roadmap-error", (event) => {
	const detail = (event as CustomEvent<{ message?: string }>).detail;
	loadError.hidden = false;
	loadError.textContent = detail?.message ?? "The roadmap failed to load.";
});

sampleSelect.addEventListener("change", () => {
	loadSample(sampleSelect.value);
	saveSettings();
});
toggleIntro.addEventListener("click", () => {
	setIntroHidden(!introHidden);
	saveSettings();
});

// The full GitHub emoji tier loads lazily so first paint stays light;
// shortcodes beyond the core pack upgrade on the next render.
import("svg-roadmap/emoji-github")
	.then(({ githubEmojiArtwork }) => {
		registerEmojiArtwork(githubEmojiArtwork);
		preview.refresh();
	})
	.catch((error: unknown) => {
		console.warn("GitHub emoji pack failed to load", error);
	});

// The badges ride on the Worker's Durable Object. Until totals arrive they
// sit idle — muted, square, icon only — so a static preview still renders a
// complete toolbar. Visits and likes are durable counts; the live badge is
// presence, so it falls back to idle while its socket is down rather than
// show a stale count.
const idleClass = "stat-badge--idle";

// HTTP responses carry a viewers snapshot taken before this page's socket may
// have connected, so they update only the durable counts — presence comes
// exclusively from the socket's own frames, which are never stale.
function showCounts(stats: Pick<SiteStats, "visits" | "likes">): void {
	visitsCount.textContent = String(stats.visits);
	visitsLabel.textContent = `${stats.visits} visitors`;
	visitsBadge.classList.remove(idleClass);
	likeCount.textContent = String(stats.likes);
	likeButton.classList.remove(idleClass);
	syncLikeState();
}

function showStats(stats: SiteStats): void {
	liveCount.textContent = String(stats.viewers);
	liveLabel.textContent = `${stats.viewers} viewing now`;
	liveBadge.classList.remove(idleClass);
	showCounts(stats);
}

function idleLive(): void {
	liveCount.textContent = "";
	liveLabel.textContent = "";
	liveBadge.classList.add(idleClass);
}

function syncLikeState(): void {
	const liked = hasLiked();
	likeButton.classList.toggle("like-button--liked", liked);
	likeButton.setAttribute("aria-pressed", liked ? "true" : "false");
	const label = liked ? "Unlike this roadmap" : "Like this roadmap";
	likeLabel.textContent = `${label} (${likeCount.textContent} likes)`;
	likeButton.title = label;
}

let likeInFlight = false;
likeButton.addEventListener("click", () => {
	if (likeInFlight) return;
	likeInFlight = true;
	setLiked(!hasLiked())
		.then(showCounts)
		.catch((error: unknown) => {
			console.warn("The like did not go through", error);
		})
		.finally(() => {
			likeInFlight = false;
		});
});

// One visit per session, counted up front; after that this page's socket is
// its presence vote, and the Durable Object pushes fresh totals on every
// join, leave, visit, and like.
recordVisit()
	.then(showCounts)
	.catch((error: unknown) => {
		console.warn("Stats are unavailable", error);
	});
subscribeStats(showStats, idleLive);

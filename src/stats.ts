/**
 * Client for the Worker's stats (visits + viewers + likes, one Durable
 * Object). Visits and likes are totals; a browser session counts as one
 * visit — sessionStorage guards the POST so reloads don't inflate it.
 * Viewers is presence: this page's WebSocket *is* its vote, and the count is
 * how many sockets the room holds — it falls when tabs close. The Durable
 * Object broadcasts fresh totals on every join, leave, visit, and like, and
 * the connect broadcast doubles as the greeting, so there is no polling. The
 * visitor's own like state lives in localStorage and the count on the
 * server. When the API is unreachable the badges simply stay hidden — the
 * roadmap never depends on it.
 */

export interface SiteStats {
	readonly visits: number;
	readonly viewers: number;
	readonly likes: number;
}

const visitSentinel = "sweep-visit-recorded";
const likedKey = "sweep-liked";

const storageGet = (storage: Storage, key: string): string | null => {
	try {
		return storage.getItem(key);
	} catch {
		return null;
	}
};

const storageSet = (storage: Storage, key: string, value: string | null): void => {
	try {
		if (value === null) storage.removeItem(key);
		else storage.setItem(key, value);
	} catch {
		// Storage may be unavailable; the server still counts.
	}
};

/** Narrows an untrusted payload (HTTP body or socket frame) to totals. */
function parseStats(value: unknown): SiteStats | undefined {
	if (typeof value !== "object" || value === null) return undefined;
	const { visits, viewers, likes } = value as Record<keyof SiteStats, unknown>;
	if (typeof visits !== "number" || typeof viewers !== "number" || typeof likes !== "number") {
		return undefined;
	}
	return { visits, viewers, likes };
}

async function requestStats(path: string, init?: RequestInit): Promise<SiteStats> {
	const response = await fetch(path, init);
	if (!response.ok) throw new Error(`${path} responded ${response.status}`);
	const stats = parseStats(await response.json());
	if (!stats) throw new Error(`${path} returned an unexpected payload`);
	return stats;
}

/** Records this session's visit (once); reloads resolve to current totals. */
export async function recordVisit(): Promise<SiteStats> {
	if (storageGet(sessionStorage, visitSentinel) !== null) {
		return requestStats("/api/stats");
	}
	const stats = await requestStats("/api/visit", { method: "POST" });
	storageSet(sessionStorage, visitSentinel, "1");
	return stats;
}

export const hasLiked = (): boolean => storageGet(localStorage, likedKey) !== null;

/** Toggles this visitor's like and resolves to the current totals. */
export async function setLiked(liked: boolean): Promise<SiteStats> {
	const stats = await requestStats("/api/like", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ liked }),
	});
	storageSet(localStorage, likedKey, liked ? "1" : null);
	return stats;
}

/**
 * Joins the presence room and streams live totals. Pings keep the socket
 * alive through idle timeouts; reconnects run with exponential backoff, and
 * each reconnect re-syncs from the connect broadcast, so missed frames never
 * matter. `onOffline` fires when the socket drops, so the page can retire
 * the presence badge rather than show a stale count.
 */
export function subscribeStats(onStats: (stats: SiteStats) => void, onOffline?: () => void): void {
	let retryDelay = 1_000;
	const connect = (): void => {
		const protocol = location.protocol === "https:" ? "wss" : "ws";
		let socket: WebSocket;
		try {
			socket = new WebSocket(`${protocol}://${location.host}/api/live`);
		} catch {
			return; // No WebSocket support; the badges stay request-driven.
		}
		let pingTimer: number | undefined;
		socket.addEventListener("open", () => {
			retryDelay = 1_000;
			pingTimer = window.setInterval(() => {
				if (socket.readyState === WebSocket.OPEN) socket.send("ping");
			}, 40_000);
		});
		socket.addEventListener("message", (event) => {
			if (typeof event.data !== "string" || event.data === "pong") return;
			try {
				const stats = parseStats(JSON.parse(event.data));
				if (stats) onStats(stats);
			} catch {
				// An unparseable frame is dropped; the next broadcast corrects.
			}
		});
		socket.addEventListener("close", () => {
			if (pingTimer !== undefined) window.clearInterval(pingTimer);
			onOffline?.();
			window.setTimeout(connect, retryDelay);
			retryDelay = Math.min(retryDelay * 2, 30_000);
		});
	};
	connect();
}

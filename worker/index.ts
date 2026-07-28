import { DurableObject } from "cloudflare:workers";

export interface SiteStats {
	readonly visits: number;
	readonly viewers: number;
	readonly likes: number;
}

/**
 * One global Durable Object carries the site's numbers. Visits and likes are
 * totals in SQLite-backed storage; the object's single-threaded execution
 * makes the read-modify-write increments race-free. Viewers is pure presence,
 * the ai-architect.news way: each open page holds one hibernatable WebSocket
 * and the count is just the number of open sockets — it falls when tabs
 * close. Every join, leave, visit, and like broadcasts fresh totals to all
 * sockets, and hibernation keeps an idle room free.
 */
export class SweepStats extends DurableObject<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		// Keepalive pings answer from the runtime without waking the object.
		ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
	}

	async stats(): Promise<SiteStats> {
		return this.#stats();
	}

	async recordVisit(): Promise<SiteStats> {
		const current = await this.ctx.storage.get<number>("visits");
		await this.ctx.storage.put("visits", (current ?? 0) + 1);
		const stats = await this.#stats();
		this.#broadcast(stats);
		return stats;
	}

	async setLike(liked: boolean): Promise<SiteStats> {
		const current = await this.ctx.storage.get<number>("likes");
		await this.ctx.storage.put("likes", Math.max(0, (current ?? 0) + (liked ? 1 : -1)));
		const stats = await this.#stats();
		this.#broadcast(stats);
		return stats;
	}

	override async fetch(request: Request): Promise<Response> {
		if (request.headers.get("upgrade")?.toLowerCase() !== "websocket") {
			return new Response("Expected a WebSocket upgrade", { status: 426 });
		}
		const pair = new WebSocketPair();
		this.ctx.acceptWebSocket(pair[1]);
		// The connect broadcast reaches the new socket too — it is already in
		// the set — so it doubles as the greeting with the current totals.
		this.#broadcast(await this.#stats());
		return new Response(null, { status: 101, webSocket: pair[0] });
	}

	override async webSocketClose(ws: WebSocket): Promise<void> {
		this.#broadcast(await this.#stats(ws), ws);
	}

	override async webSocketError(ws: WebSocket): Promise<void> {
		this.#broadcast(await this.#stats(ws), ws);
	}

	async #stats(leaving?: WebSocket): Promise<SiteStats> {
		const [visits, likes] = await Promise.all([
			this.ctx.storage.get<number>("visits"),
			this.ctx.storage.get<number>("likes"),
		]);
		return { visits: visits ?? 0, viewers: this.#viewers(leaving), likes: likes ?? 0 };
	}

	// Count the live sockets, optionally excluding one on its way out: its
	// webSocketClose can fire before the runtime drops it from the set.
	#viewers(excluding?: WebSocket): number {
		return this.ctx.getWebSockets().filter((ws) => ws !== excluding).length;
	}

	#broadcast(stats: SiteStats, excluding?: WebSocket): void {
		const message = JSON.stringify(stats);
		for (const ws of this.ctx.getWebSockets()) {
			if (ws === excluding) continue;
			try {
				ws.send(message);
			} catch {
				// Socket already gone; its close event will reconcile the count.
			}
		}
	}
}

interface Env {
	STATS: DurableObjectNamespace<SweepStats>;
	ASSETS: Fetcher;
}

const json = (data: unknown): Response =>
	new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
		},
	});

const methodNotAllowed = (): Response => new Response("Method not allowed", { status: 405 });

async function handleApi(request: Request, pathname: string, env: Env): Promise<Response> {
	const stats = env.STATS.get(env.STATS.idFromName("global"));
	switch (pathname) {
		case "/api/live": {
			// WebSocket upgrades must travel through fetch, not RPC; the stub
			// forwards the upgrade straight into the object.
			return stats.fetch(request);
		}
		case "/api/stats": {
			if (request.method !== "GET") return methodNotAllowed();
			return json(await stats.stats());
		}
		case "/api/visit": {
			if (request.method !== "POST") return methodNotAllowed();
			return json(await stats.recordVisit());
		}
		case "/api/like": {
			if (request.method !== "POST") return methodNotAllowed();
			let liked: unknown;
			try {
				liked = ((await request.json()) as { liked?: unknown }).liked;
			} catch {
				return new Response("Malformed JSON body", { status: 400 });
			}
			if (typeof liked !== "boolean") {
				return new Response("Expected a boolean `liked` field", { status: 400 });
			}
			return json(await stats.setLike(liked));
		}
		default:
			return new Response("Not found", { status: 404 });
	}
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname.startsWith("/api/")) return handleApi(request, url.pathname, env);
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;

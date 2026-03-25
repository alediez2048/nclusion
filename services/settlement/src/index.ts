import { Hono } from "hono";
import crypto from "node:crypto";

const app = new Hono();

// --- In-memory settlement store ---

interface SettlementRecord {
	settlementId: string;
	matchId: string;
	result: "home" | "draw" | "away";
	status: "pending" | "confirmed" | "disputed";
	settledAt: string;
	betsSettled: number;
}

const settlements = new Map<string, SettlementRecord>();

app.get("/health", (c) => c.json({ status: "ok", service: "settlement" }));

/** SET-002: Settle a match — determines winners/losers for all bets */
app.post("/settle/:matchId", async (c) => {
	const matchId = c.req.param("matchId");
	const { result } = await c.req.json<{ result: "home" | "draw" | "away" }>();

	if (!["home", "draw", "away"].includes(result)) {
		return c.json(
			{ error: { code: "INVALID_RESULT", message: "Result must be home, draw, or away" } },
			400,
		);
	}

	// Check if already settled
	const existing = Array.from(settlements.values()).find((s) => s.matchId === matchId);
	if (existing) {
		return c.json({ settlement: existing, message: "Already settled" });
	}

	const settlementId = `set_${crypto.randomUUID().slice(0, 8)}`;

	const settlement: SettlementRecord = {
		settlementId,
		matchId,
		result,
		status: "confirmed",
		settledAt: new Date().toISOString(),
		betsSettled: 0, // Updated when bets are processed
	};

	settlements.set(settlementId, settlement);

	return c.json({ settlement }, 201);
});

/** Get settlement by ID */
app.get("/:settlementId", (c) => {
	const settlementId = c.req.param("settlementId");
	const settlement = settlements.get(settlementId);

	if (!settlement) {
		return c.json({ error: { code: "NOT_FOUND", message: "Settlement not found" } }, 404);
	}

	return c.json({ settlement });
});

/** Get settlement for a match */
app.get("/match/:matchId", (c) => {
	const matchId = c.req.param("matchId");
	const settlement = Array.from(settlements.values()).find((s) => s.matchId === matchId);

	if (!settlement) {
		return c.json({ error: { code: "NOT_FOUND", message: "No settlement for this match" } }, 404);
	}

	return c.json({ settlement });
});

export { app };

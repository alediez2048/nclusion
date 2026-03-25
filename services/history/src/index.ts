import { Hono } from "hono";
import { bets } from "@nclusion/betting";

const app = new Hono();

app.get("/health", (c) => c.json({ status: "ok", service: "history" }));

/** HIS-001: Get user bet history grouped by status */
app.get("/user/:userId", (c) => {
	const userId = c.req.param("userId");
	const userBets = Array.from(bets.values())
		.filter((b) => b.userId === userId)
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	const open = userBets.filter((b) => ["confirmed"].includes(b.status));
	const pending = userBets.filter((b) => ["processing", "queued"].includes(b.status));
	const settled = userBets.filter((b) => ["won", "lost", "cancelled"].includes(b.status));

	return c.json({ open, pending, settled, total: userBets.length });
});

/** HIS-002: Get bet receipt */
app.get("/:betId", (c) => {
	const betId = c.req.param("betId");
	const bet = bets.get(betId);

	if (!bet) {
		return c.json({ error: { code: "NOT_FOUND", message: "Bet not found" } }, 404);
	}

	return c.json({
		receipt: {
			betId: bet.betId,
			userId: bet.userId,
			marketId: bet.marketId,
			selection: bet.selection,
			stakeHtgn: bet.stakeHtgn,
			acceptedOdds: bet.acceptedOdds,
			potentialPayoutHtgn: bet.potentialPayoutHtgn,
			status: bet.status,
			outcome: bet.outcome,
			createdAt: bet.createdAt,
			settledAt: bet.settledAt,
			txSignature: bet.txSignature,
		},
	});
});

export { app };

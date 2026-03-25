import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "balance" });
});

/** Get user balance breakdown. */
app.get("/", (c) => {
	// Populated in BAL-001
	return c.json(
		{
			availableHtgn: 0,
			reservedHtgn: 0,
			pendingSettlementHtgn: 0,
			status: "not_implemented",
		},
		501,
	);
});

export { app };

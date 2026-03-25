import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "betting" });
});

/** Accept a new bet intent. */
app.post("/intents", (c) => {
	// Populated in BET-004
	return c.json({ intentId: null, status: "not_implemented" }, 501);
});

/** Get bet by ID. */
app.get("/:betId", (c) => {
	const betId = c.req.param("betId");
	// Populated in BET-004
	return c.json({ betId, bet: null, status: "not_implemented" }, 501);
});

export { app };

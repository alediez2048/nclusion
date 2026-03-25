import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "settlement" });
});

/** Trigger settlement for a match. */
app.post("/settle/:matchId", (c) => {
	const matchId = c.req.param("matchId");
	// Populated in SET-002
	return c.json({ matchId, settlementId: null, status: "not_implemented" }, 501);
});

/** Get settlement status. */
app.get("/:settlementId", (c) => {
	const settlementId = c.req.param("settlementId");
	// Populated in SET-002
	return c.json({ settlementId, settlement: null, status: "not_implemented" }, 501);
});

export { app };

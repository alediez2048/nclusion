import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "history" });
});

/** Get user bet history. */
app.get("/", (c) => {
	// Populated in HIS-001
	return c.json({ bets: [], status: "not_implemented" }, 501);
});

/** Get bet receipt. */
app.get("/:betId", (c) => {
	const betId = c.req.param("betId");
	// Populated in HIS-002
	return c.json({ betId, receipt: null, status: "not_implemented" }, 501);
});

export { app };

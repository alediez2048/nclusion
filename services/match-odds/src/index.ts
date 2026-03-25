import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "match-odds" });
});

/** Get compact match list. */
app.get("/", (c) => {
	// Populated in ODDS-003
	return c.json({ matches: [], status: "not_implemented" }, 501);
});

/** Get match detail with odds. */
app.get("/:matchId", (c) => {
	const matchId = c.req.param("matchId");
	// Populated in ODDS-004
	return c.json({ matchId, match: null, status: "not_implemented" }, 501);
});

export { app };

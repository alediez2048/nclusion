import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "relay" });
});

/** Submit a bet placement transaction. */
app.post("/submit", (c) => {
	// Populated in REL-001
	return c.json({ txSignature: null, status: "not_implemented" }, 501);
});

/** Check transaction status. */
app.get("/status/:txSignature", (c) => {
	const txSignature = c.req.param("txSignature");
	// Populated in REL-004
	return c.json({ txSignature, confirmationStatus: null, status: "not_implemented" }, 501);
});

export { app };

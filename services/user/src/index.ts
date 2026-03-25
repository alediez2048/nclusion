import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "user" });
});

/** Register a new user. */
app.post("/register", (c) => {
	// Populated in API-003 implementation
	return c.json({ userId: null, walletPublicKey: null, status: "not_implemented" }, 501);
});

/** Login. */
app.post("/login", (c) => {
	// Populated in API-003 implementation
	return c.json({ token: null, status: "not_implemented" }, 501);
});

/** Get user profile. */
app.get("/profile", (c) => {
	// Populated in API-003 implementation
	return c.json({ user: null, status: "not_implemented" }, 501);
});

export { app };

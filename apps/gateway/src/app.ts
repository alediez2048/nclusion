import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { app as balanceApp } from "@nclusion/balance";
import { app as bettingApp } from "@nclusion/betting";
import { app as historyApp } from "@nclusion/history";
import { app as matchOddsApp } from "@nclusion/match-odds";
import { app as settlementApp } from "@nclusion/settlement";

const app = new Hono();

// --- CORS for web app ---
app.use("/*", cors());

// --- Public routes ---

app.get("/health", (c) => {
	return c.json({ status: "ok", service: "gateway", timestamp: new Date().toISOString() });
});

// --- API routes (mount service sub-apps) ---

app.use("/api/*", logger());

app.route("/api/matches", matchOddsApp);
app.route("/api/betting", bettingApp);
app.route("/api/balance", balanceApp);
app.route("/api/settlement", settlementApp);
app.route("/api/history", historyApp);

export { app };

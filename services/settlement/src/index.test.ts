import { describe, expect, it } from "vitest";
import { app } from "./index.js";

describe("settlement service", () => {
	it("should return health check", async () => {
		const res = await app.request("/health");
		expect(res.status).toBe(200);
	});

	it("should settle a match", async () => {
		const res = await app.request("/settle/match_001", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ result: "home" }),
		});
		expect(res.status).toBe(201);
		const body = await res.json();
		expect(body.settlement.result).toBe("home");
		expect(body.settlement.status).toBe("confirmed");
	});

	it("should return existing settlement for duplicate", async () => {
		const res = await app.request("/settle/match_001", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ result: "home" }),
		});
		expect(res.status).toBe(200);
		expect((await res.json()).message).toBe("Already settled");
	});

	it("should reject invalid result", async () => {
		const res = await app.request("/settle/match_002", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ result: "invalid" }),
		});
		expect(res.status).toBe(400);
	});

	it("should get settlement by match", async () => {
		const res = await app.request("/match/match_001");
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body.settlement.matchId).toBe("match_001");
	});
});

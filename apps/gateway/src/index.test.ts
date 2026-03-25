import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("gateway health check", () => {
	it("should return ok status", async () => {
		const res = await app.request("/health");
		expect(res.status).toBe(200);

		const body = await res.json();
		expect(body.status).toBe("ok");
		expect(body.service).toBe("gateway");
		expect(body.timestamp).toBeDefined();
	});
});

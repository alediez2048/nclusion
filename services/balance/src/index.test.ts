import { describe, expect, it } from "vitest";
import { app } from "./index.js";

describe("balance service", () => {
	it("should return health check", async () => {
		const res = await app.request("/health");
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body.status).toBe("ok");
		expect(body.service).toBe("balance");
	});
});

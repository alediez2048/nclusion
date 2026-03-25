import { describe, expect, it } from "vitest";
import { EnvSchema, validateEnv } from "./env.js";

const validEnv = {
	PORT: "3000",
	NODE_ENV: "development",
	DATABASE_URL: "postgresql://localhost:5432/nclusion",
	SOLANA_RPC_URL: "https://api.devnet.solana.com",
	HTGN_MINT: "So11111111111111111111111111111111111111112",
	RELAY_KEYPAIR: "base58encodedkeypairstring",
	ODDS_API_KEY: "test-api-key-12345",
	ODDS_PROVIDER: "the-odds-api",
	JWT_SECRET: "development-secret-key-min-16",
};

describe("EnvSchema", () => {
	it("should validate a complete valid env", () => {
		const result = EnvSchema.safeParse(validEnv);
		expect(result.success).toBe(true);
	});

	it("should coerce PORT to number", () => {
		const result = EnvSchema.parse(validEnv);
		expect(result.PORT).toBe(3000);
	});

	it("should reject invalid DATABASE_URL", () => {
		const result = EnvSchema.safeParse({ ...validEnv, DATABASE_URL: "not-a-url" });
		expect(result.success).toBe(false);
	});

	it("should reject empty HTGN_MINT", () => {
		const result = EnvSchema.safeParse({ ...validEnv, HTGN_MINT: "" });
		expect(result.success).toBe(false);
	});

	it("should reject short JWT_SECRET", () => {
		const result = EnvSchema.safeParse({ ...validEnv, JWT_SECRET: "short" });
		expect(result.success).toBe(false);
	});

	it("should default NODE_ENV to development", () => {
		const { NODE_ENV, ...rest } = validEnv;
		const result = EnvSchema.parse(rest);
		expect(result.NODE_ENV).toBe("development");
	});
});

describe("validateEnv", () => {
	it("should return parsed env on valid input", () => {
		const env = validateEnv(validEnv);
		expect(env.PORT).toBe(3000);
		expect(env.DATABASE_URL).toBe("postgresql://localhost:5432/nclusion");
	});

	it("should throw on missing required fields", () => {
		expect(() => validateEnv({})).toThrow("Environment validation failed");
	});
});

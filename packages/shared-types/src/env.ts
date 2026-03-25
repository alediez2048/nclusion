import { z } from "zod";

export const EnvSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	DATABASE_URL: z.string().url(),
	SOLANA_RPC_URL: z.string().url(),
	HTGN_MINT: z.string().min(1),
	RELAY_KEYPAIR: z.string().min(1),
	ODDS_API_KEY: z.string().min(1),
	ODDS_PROVIDER: z.enum(["the-odds-api", "api-football"]).default("the-odds-api"),
	JWT_SECRET: z.string().min(16),
});

export type Env = z.infer<typeof EnvSchema>;

export function validateEnv(env: Record<string, string | undefined> = process.env): Env {
	const result = EnvSchema.safeParse(env);
	if (!result.success) {
		const missing = result.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`);
		throw new Error(`Environment validation failed:\n${missing.join("\n")}`);
	}
	return result.data;
}

import { z } from "zod";

export { EnvSchema, validateEnv, type Env } from "./env.js";

// --- Enums ---

export const BetStatus = {
	INTENT_CREATED: "intent_created",
	VALIDATION_PASSED: "validation_passed",
	FUNDS_RESERVED: "funds_reserved",
	RELAY_SUBMITTED: "relay_submitted",
	SIGNATURE_RECEIVED: "signature_received",
	CHAIN_CONFIRMED: "chain_confirmed",
	AWAITING_RESULT: "awaiting_result",
	SETTLEMENT_SUBMITTED: "settlement_submitted",
	SETTLEMENT_CONFIRMED: "settlement_confirmed",
	REVERTED_OR_RELEASED: "reverted_or_released",
} as const;

export type BetStatusType = (typeof BetStatus)[keyof typeof BetStatus];

export const UserFacingStatus = {
	DRAFT: "draft",
	QUEUED: "queued",
	PROCESSING: "processing",
	CONFIRMED: "confirmed",
	PENDING_SETTLEMENT: "pending_settlement",
	WON: "won",
	LOST: "lost",
	CANCELLED: "cancelled",
	FAILED: "failed",
} as const;

export type UserFacingStatusType = (typeof UserFacingStatus)[keyof typeof UserFacingStatus];

export const Selection = {
	HOME: "home",
	DRAW: "draw",
	AWAY: "away",
} as const;

export type SelectionType = (typeof Selection)[keyof typeof Selection];

export const MarketType = {
	ONE_X_TWO: "1x2",
} as const;

export type MarketTypeValue = (typeof MarketType)[keyof typeof MarketType];

// --- Schemas ---

export const UserSchema = z.object({
	userId: z.string(),
	phoneOrIdentityRef: z.string(),
	languagePreference: z.enum(["ht", "fr"]),
	managedWalletId: z.string(),
	status: z.enum(["active", "suspended", "inactive"]),
});

export type User = z.infer<typeof UserSchema>;

export const MatchSchema = z.object({
	matchId: z.string(),
	competition: z.string(),
	homeTeam: z.string(),
	awayTeam: z.string(),
	startTime: z.string(),
	status: z.enum(["upcoming", "live", "finished", "cancelled"]),
	resultState: z.string().optional(),
});

export type Match = z.infer<typeof MatchSchema>;

export const MarketSchema = z.object({
	marketId: z.string(),
	matchId: z.string(),
	marketType: z.enum(["1x2"]),
	oddsHome: z.number().positive(),
	oddsDraw: z.number().positive(),
	oddsAway: z.number().positive(),
	oddsVersion: z.number().int().nonnegative(),
	expiresAt: z.string(),
});

export type Market = z.infer<typeof MarketSchema>;

export const BetIntentSchema = z.object({
	intentId: z.string(),
	userId: z.string(),
	marketId: z.string(),
	selection: z.enum(["home", "draw", "away"]),
	stakeHtgn: z.number().positive(),
	displayedOdds: z.number().positive(),
	idempotencyKey: z.string(),
	clientCreatedAt: z.string(),
	submissionExpiry: z.string(),
});

export type BetIntent = z.infer<typeof BetIntentSchema>;

export const BetRecordSchema = z.object({
	betId: z.string(),
	intentId: z.string(),
	userId: z.string(),
	acceptedOdds: z.number().positive(),
	stakeHtgn: z.number().positive(),
	potentialPayoutHtgn: z.number().nonnegative(),
	programAccountRef: z.string().optional(),
	txSignature: z.string().optional(),
	status: z.string(),
});

export type BetRecord = z.infer<typeof BetRecordSchema>;

export const BalanceViewSchema = z.object({
	userId: z.string(),
	availableHtgn: z.number().nonnegative(),
	reservedHtgn: z.number().nonnegative(),
	pendingSettlementHtgn: z.number().nonnegative(),
	lastReconciledAt: z.string(),
});

export type BalanceView = z.infer<typeof BalanceViewSchema>;

export const SettlementRecordSchema = z.object({
	settlementId: z.string(),
	matchId: z.string(),
	providerResult: z.string(),
	crossCheckResult: z.string().optional(),
	settlementTxSignature: z.string().optional(),
	status: z.enum(["pending", "confirmed", "disputed", "cancelled"]),
});

export type SettlementRecord = z.infer<typeof SettlementRecordSchema>;

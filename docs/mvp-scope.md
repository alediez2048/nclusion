# MVP Scope: Nclusion Sports Betting Platform

This document is the authoritative reference for what is in and out of the assignment demo. All implementation tickets reference this scope. If a feature is not listed under "In Scope," it is not being built.

---

## Product Summary

A mobile-first sports betting platform for the Haitian market that uses HTGN stablecoins and Solana devnet for verifiable escrow and settlement, while hiding blockchain complexity from end users. The product targets low-end Android devices on intermittent 2G/3G connectivity and defaults to Haitian Creole.

---

## Supported Markets (PRD-002)

| Property | Value |
|----------|-------|
| Sport | Football (soccer) only |
| Focus | World Cup and high-interest matches |
| Market type | 1X2 — Home win / Draw / Away win |
| Bet type | Single bets only |
| Parlay / accumulator | Not supported |
| Props / specials | Not supported |
| Over/under | Not supported |
| Live / in-play betting | Not supported |

### Implications

- **Bet slip:** accepts exactly one outcome selection per bet
- **Odds service:** normalizes provider data to three decimal odds per match (home, draw, away)
- **Solana program:** `place_bet` instruction takes a single `selection` enum (Home / Draw / Away)
- **Settlement:** one result per match resolves all bets — no partial or multi-leg resolution
- **UI:** match detail shows three tappable outcome cards with odds

---

## Bet State Machine (PRD-003)

### User-Facing States

These are displayed in the mobile app via status chips:

| State | Color | Meaning |
|-------|-------|---------|
| Draft | Gray | Bet saved locally, not submitted (offline) |
| Queued | Yellow | Submitted to backend, awaiting relay |
| Processing | Blue | Transaction submitted to Solana, awaiting confirmation |
| Confirmed | Green | Bet confirmed on-chain, match not yet settled |
| Pending settlement | Orange | Match ended, awaiting settlement execution |
| Won | Green | Bet settled, user won, winnings credited |
| Lost | Red | Bet settled, user lost |
| Cancelled | Gray | Market cancelled, funds returned |
| Failed | Red | Submission failed, funds released |

### Internal States

Granular states for backend observability and support:

```
intent_created → validation_passed → funds_reserved → relay_submitted
→ signature_received → chain_confirmed → awaiting_result
→ settlement_submitted → settlement_confirmed
```

Alternative terminal: `reverted_or_released` (failure/cancellation path)

### Valid Transitions

```
Draft → Queued (user submits, connectivity available)
Queued → Processing (relay picks up intent)
Processing → Confirmed (chain confirmation received)
Processing → Failed (timeout or RPC failure, funds released)
Confirmed → Pending settlement (match ends)
Pending settlement → Won | Lost | Cancelled (settlement executes)
Draft → expired (TTL exceeded, auto-removed)
Any pre-confirmed state → Failed (unrecoverable error, funds released)
```

### Invalid Transitions (enforced)

- Cannot go from Won/Lost/Cancelled/Failed to any other state
- Cannot go from Confirmed backward to Processing or Queued
- Cannot settle a bet that isn't in Confirmed or Pending settlement
- Cannot place a bet on a market that is already settled or cancelled

## Balance Labels (PRD-003)

Three-part balance breakdown, always shown together — never a single number:

| Label | Meaning | When it changes |
|-------|---------|-----------------|
| **Available** | HTGN the user can bet with right now | Decreases on bet placement, increases on settlement win or cancellation |
| **In active bets** | HTGN locked in confirmed, unsettled bets | Increases on chain confirmation, decreases on settlement |
| **Pending settlement** | HTGN in bets where the match has ended but settlement hasn't executed | Increases when match ends, clears on settlement |

### Balance Transition Rules

```
Place bet:      Available -= stake,  In active bets += stake
Settlement win: In active bets -= stake,  Available += stake + winnings
Settlement loss: In active bets -= stake  (removed, no credit)
Cancellation:   In active bets -= stake,  Available += stake  (refund)
Bet fails:      Available += stake  (reserved funds released)
```

---

## Target User

A Haitian mobile user who:

- already understands informal sports betting,
- uses a low-end Android phone (Android 8+, 2GB RAM, 5-inch screen),
- has unstable mobile connectivity and daily data budgets,
- is price and trust sensitive,
- and prefers Haitian Creole.

Secondary: a support/operations team member who needs to investigate bet status, verify settlement, and answer payout disputes.

---

## Key Constraints

| Constraint | Implication |
|-----------|-------------|
| Android 8+, 2GB RAM | React Native bare + Hermes, minimal APK size |
| 200kbps, 300ms+ latency | Aggressive caching, delta sync, no polling, no WebSockets |
| Daily data budgets | Compact payloads, gzip, no large images |
| Low trust in formal systems | Clear status messaging, receipts, no false finality |
| Haitian Creole + French | Full localization, bundled locally, no partial translations |
| Solana devnet | Demo-grade chain, SPL Token for HTGN, platform-sponsored fees |

---

## In Scope

### Mobile App
- Android-first TypeScript app (React Native bare, Hermes)
- Phone-based or lightweight login
- Managed per-user wallet creation (invisible to user)
- HTGN balance display: Available / In active bets / Pending settlement
- Football match feed from a real odds provider
- Single bets on win/draw/loss outcomes only
- Bet slip with stake input, odds display, and payout preview
- Confirmation screen with explicit confirm action
- Bet lifecycle statuses: Draft → Queued → Processing → Confirmed → Pending settlement → Won / Lost / Cancelled / Failed
- Bet history grouped by status (open, pending, settled)
- Bet receipts with optional advanced proof (tx signature, settlement signature)
- Local caching for matches, balances, and bet history (op-sqlite)
- Explicit offline/connectivity states with banner
- Draft bet intent creation under weak connectivity
- Odds revalidation before submission of queued intents
- Clear failure messaging (connection, odds change, balance, chain delay)
- Haitian Creole default, French secondary, language switching
- Nclusion brand design system (dark-mode-first, gold accent)

### Backend
- API gateway with auth, rate limiting, idempotency handling
- Betting service (intent acceptance, validation, fund reservation, state machine)
- Balance service (shadow ledger with available/reserved/pending settlement)
- Match and odds service (provider ingestion, normalization, caching)
- Transaction relay (construct, sign, submit, sponsor fees, track confirmations)
- Settlement service (result ingestion, batch preparation)
- History service (bet history, receipts, indexing)
- All services composed as single Hono process on Railway

### Solana Program
- Anchor 0.30+ Rust program on devnet
- Instructions: initialize_market_escrow, place_bet, settle_market, cancel_market, release_funds
- HTGN escrow via SPL Token transfers
- Deterministic PDAs for markets and bets
- Duplicate prevention via PDA constraints
- Status transition enforcement on-chain

### Operator Tooling
- Lightweight web dashboard (Cloudflare Pages)
- Bet lookup by user ID, bet ID, or match ID
- Transaction signature visibility
- Settlement audit view per match
- Manual settlement hold flag for disputed results

### Infrastructure
- GitHub repo with Turborepo + pnpm monorepo
- GitHub Actions CI (lint, typecheck, test, build)
- Railway deployment (API + PostgreSQL)
- Firebase App Distribution for APK sharing
- Solana devnet deployment

---

## Out of Scope

| Excluded | Rationale |
|----------|-----------|
| iOS support | Android-first MVP; iOS adds build complexity without demo value |
| Parlays, props, over/under, live betting | Narrow scope wins; 1X2 single bets demonstrate the full flow |
| Self-custodial wallets / seed phrases | Managed wallets are simpler and more trustworthy for this market |
| User-managed private keys | Contradicts invisible blockchain principle |
| Decentralized oracle infrastructure | Trusted result ingestion with cross-check is sufficient for MVP |
| Production licensing / full AML/KYC | Demo scope; compliance is a Phase 5 workstream |
| Deep promotions / growth loops | Reliability before growth |
| Multi-sport / multi-league coverage | World Cup football focus only |
| Real money / mainnet deployment | Devnet with demo HTGN tokens |
| Push notifications | Selective alerts are Phase 4; not needed for demo |
| Account recovery flows | Documented in Phase 5; managed wallets reduce urgency |
| Multi-region deployment | Single Railway region sufficient for demo |
| Load testing / production hardening | Phase 4-5 territory |
| Formal incident response | Phase 5 |

---

## Demo Acceptance Criteria

The assignment demo is complete when ALL of the following are true:

1. A user can sign in and see a localized home screen (Haitian Creole default).
2. A user can browse real football matches with basic 1X2 odds.
3. A user can place a single HTGN bet through the bet slip flow.
4. The bet is submitted through the relay and confirmed on Solana devnet.
5. The UI shows clear bet lifecycle status transitions.
6. The user can see balance changes (available/reserved/pending) and bet history.
7. A match result can be processed and the bet settled on-chain.
8. The user can inspect a receipt with optional advanced proof fields.
9. Cached history and match browsing still work when network conditions degrade.
10. A basic operator view can verify the bet and settlement lifecycle.

---

## Demo Narrative

The strongest story for the evaluator:

1. Show the Haitian-market problem and constraints.
2. Show the low-bandwidth Android-first UI with Nclusion branding.
3. Show that blockchain is invisible in the main flow.
4. Place a bet and show explicit status transitions.
5. Settle the bet on Solana devnet.
6. Open the receipt and show optional proof.
7. Show offline or degraded behavior.
8. Show the operator screen that makes the system supportable.

# ARCH-003: Choose Solana program account model and instruction set

**Phase:** 0 — Discovery and Scope Lock
**Status:** ✅ Complete
**Priority:** High

## Description

Select the Solana program framework, define the instruction set, and design the account/PDA strategy.

## Decision

Resolved in `techstack.md`:

- **Framework:** Anchor 0.30+
- **Testing:** cargo test + solana-bankrun (in-process, ~100ms per test)
- **IDL:** Auto-generated, imported into packages/solana-client/
- **Instructions:** initialize_market_escrow, place_bet, settle_market, cancel_market, release_funds
- **Accounts:** Deterministic PDAs for market and bet records, market-level escrow pools, compact on-chain bet receipts

## References

- `techstack.md` — Solana Program Layer section
- `systemsdesign.md` — Sections 9.1–9.4
- `interviews.md` — R1-Q4, R2-Q7

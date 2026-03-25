# ARCH-005: Define HTGN demo token model on devnet

**Phase:** 0 — Discovery and Scope Lock
**Status:** ✅ Complete
**Priority:** High

## Description

Define how HTGN is represented on Solana devnet for the demo.

## Decision

Resolved in `techstack.md`:

- **Token standard:** SPL Token on Solana devnet
- **Mint authority:** Platform-controlled for demo
- **Decimals:** 2 (matches HTG currency precision)
- **Faucet:** Backend endpoint mints demo HTGN to managed wallets for testing
- **Production path:** Replace demo mint address with real HTGN token address; no escrow program code changes needed

## References

- `techstack.md` — HTGN Demo Token Model section

# RISK-002: Add device/session reputation scoring

**Phase:** 4 — MVP Operational Hardening
**Status:** ⏳ Pending
**Priority:** Low

## Description

Track device fingerprint and session behavior. Score reputation based on patterns (rapid bets, unusual amounts, multiple accounts from same device).

## Acceptance Criteria

- [ ] Device fingerprint collected (privacy-safe)
- [ ] Session behavior tracked
- [ ] Reputation score calculated
- [ ] Score logged and available for operator review
- [ ] No impact on normal user flow

## Dependencies

- **Blocks:** RISK-004
- **Blocked by:** API-002

## References

- `systemsdesign.md` — Section 12.3
- `interviews.md` — R2-Q11

# RISK-001: Add bet velocity checks

**Phase:** 4 — MVP Operational Hardening
**Status:** ⏳ Pending
**Priority:** Medium

## Description

Limit number of bets per user per time window. Configurable thresholds. Reject bets that exceed velocity limits with clear error message.

## Acceptance Criteria

- [ ] Velocity limit enforced per user
- [ ] Time window configurable
- [ ] Threshold configurable
- [ ] Excess bets rejected with specific error
- [ ] Velocity tracked per user in database

## Dependencies

- **Blocks:** RISK-004
- **Blocked by:** BET-004

## References

- `interviews.md` — R2-Q11

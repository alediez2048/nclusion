# RISK-003: Add conservative stake limits for pilot launch

**Phase:** 4 — MVP Operational Hardening
**Status:** ⏳ Pending
**Priority:** High

## Description

Maximum stake per bet, per user per day, and per market. Configurable limits via environment variables. Clear error message when limit exceeded.

## Acceptance Criteria

- [ ] Per-bet stake limit enforced
- [ ] Per-user daily limit enforced
- [ ] Per-market exposure limit enforced
- [ ] Limits configurable via env vars
- [ ] Clear error message on limit breach

## Dependencies

- **Blocks:** None
- **Blocked by:** BET-005

## References

- `interviews.md` — R4-Q11

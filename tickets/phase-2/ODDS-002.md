# ODDS-002: Normalize provider data into internal match and market models

**Phase:** 2 — Core Betting Loop
**Status:** ⏳ Pending
**Priority:** High

## Description

Transform provider-specific API responses into shared Match and Market types from packages/shared-types. Handle provider quirks: timezone normalization, team name formatting, odds format conversion.

## Acceptance Criteria

- [ ] Provider data maps to internal Match and Market types
- [ ] Timezones normalized to UTC
- [ ] Team names cleaned and consistent
- [ ] Odds format standardized (decimal)
- [ ] Edge cases handled (missing data, unknown teams)

## Dependencies

- **Blocks:** ODDS-003, ODDS-004
- **Blocked by:** ODDS-001, INF-002

## References

- `systemsdesign.md` — Section 4.4

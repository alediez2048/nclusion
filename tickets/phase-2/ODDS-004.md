# ODDS-004: Build match detail endpoint with basic outcome odds

**Phase:** 2 — Core Betting Loop
**Status:** ⏳ Pending
**Priority:** High

## Description

GET /api/matches/:id — full match detail with all market odds. Include odds_version and expires_at for staleness detection on the client.

## Acceptance Criteria

- [ ] Endpoint returns full match detail
- [ ] All 1X2 odds included
- [ ] odds_version field for change detection
- [ ] expires_at field for staleness
- [ ] 404 for unknown match ID

## Dependencies

- **Blocks:** ODDS-005, BET-001
- **Blocked by:** ODDS-002

## References

- `systemsdesign.md` — Section 4.4, Section 8.1 (Market entity)

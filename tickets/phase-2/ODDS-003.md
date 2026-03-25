# ODDS-003: Build compact match list endpoint

**Phase:** 2 — Core Betting Loop
**Status:** ⏳ Pending
**Priority:** High

## Description

GET /api/matches — paginated, compact match list. Gzip compressed. Only essential fields for list view: match_id, teams, start_time, status, top-line odds. Target: < 5KB for 20 matches.

## Acceptance Criteria

- [ ] Endpoint returns paginated match list
- [ ] Response gzip compressed
- [ ] Only list-essential fields included
- [ ] Response < 5KB for 20 matches
- [ ] Pagination works correctly

## Dependencies

- **Blocks:** ODDS-005, OFF-001, BET-001
- **Blocked by:** ODDS-002

## References

- `systemsdesign.md` — Section 6.1 (Match Browsing Flow)

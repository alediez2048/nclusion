# ODDS-001: Integrate real odds provider for football fixtures

**Phase:** 2 — Core Betting Loop
**Status:** ⏳ Pending
**Priority:** High

## Description

Connect to the selected odds provider (The Odds API or API-Football). Fetch upcoming football matches with basic 1X2 odds. Handle API rate limits and errors gracefully.

## Acceptance Criteria

- [ ] Provider API connected with authenticated requests
- [ ] Football fixtures fetched successfully
- [ ] 1X2 odds retrieved for each fixture
- [ ] Rate limiting respected
- [ ] Error handling for API failures tested

## Dependencies

- **Blocks:** ODDS-002
- **Blocked by:** API-006, ARCH-004

## References

- `techstack.md` — Odds and Result Providers
- `systemsdesign.md` — Section 4.4

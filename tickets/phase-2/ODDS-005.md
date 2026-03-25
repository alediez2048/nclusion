# ODDS-005: Add cache and TTL strategy for odds payloads

**Phase:** 2 — Core Betting Loop
**Status:** ⏳ Pending
**Priority:** Medium

## Description

TTL-based caching in match-odds service. Serve cached data when provider is slow/down. Support delta updates for odds changes.

## Acceptance Criteria

- [ ] Cached responses served within TTL window
- [ ] Stale data labeled with freshness indicator
- [ ] Provider outage falls back to cache gracefully
- [ ] Cache invalidation on odds change
- [ ] Delta update support for odds

## Dependencies

- **Blocks:** BET-005
- **Blocked by:** ODDS-003, ODDS-004

## References

- `systemsdesign.md` — Section 10 (Mobile Data Strategy)
- `interviews.md` — R2-Q4

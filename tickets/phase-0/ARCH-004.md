# ARCH-004: Select odds provider and result provider for demo

**Phase:** 0 — Discovery and Scope Lock
**Status:** 🔶 Narrowed
**Priority:** High

## Description

Select the sports data provider(s) for odds and match results. Needs to cover football fixtures with basic 1X2 odds at acceptable demo cost.

## Current Status

Narrowed to two candidates in `techstack.md`:

- **The Odds API** — generous free tier, multiple bookmaker aggregation
- **API-Football** — richer match data, detailed fixture info

Final selection pending evaluation of World Cup fixture coverage and API quality.

## Acceptance Criteria

- [ ] Provider selected based on World Cup fixture availability
- [ ] API key obtained and sample data validated
- [ ] Data quality sufficient for demo (team names, odds, match status, results)
- [ ] Rate limits acceptable for demo usage

## Dependencies

- **Blocks:** ODDS-001, SET-001
- **Blocked by:** None

## References

- `techstack.md` — Odds and Result Providers section

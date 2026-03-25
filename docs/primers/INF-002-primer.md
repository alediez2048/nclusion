# INF-002 Primer: Set up shared types / schemas across mobile and backend

**For:** New session
**Project:** Nclusion
**Date:** Mar 24, 2026
**Previous work:** API-001 complete (monorepo scaffolded). See `docs/DEVLOG.md`.

---

## What Is This Ticket?

Populate `packages/shared-types/` with Zod schemas and inferred TypeScript types for all core entities. These are the single source of truth used by both backend services and the mobile app.

### Deliverables

- [ ] Zod schemas for: User, Match, Market, BetIntent, BetRecord, BalanceView, SettlementRecord
- [ ] TypeScript types inferred from schemas
- [ ] Enums for: BetStatus, UserFacingStatus, MarketType, Selection
- [ ] Package importable from all workspaces
- [ ] Tests for schema validation
- [ ] DEVLOG updated

### References

- `systemsdesign.md` Section 8 (Data Model)
- `docs/mvp-scope.md` (Bet State Machine, Balance Labels, Supported Markets)

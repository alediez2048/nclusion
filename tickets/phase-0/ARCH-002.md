# ARCH-002: Choose backend framework and service boundaries

**Phase:** 0 — Discovery and Scope Lock
**Status:** ✅ Complete
**Priority:** High

## Description

Select the backend framework, database, ORM, API style, and define service boundaries.

## Decision

Resolved in `techstack.md` and `production.md`:

- **Framework:** Hono on Node.js 20 LTS
- **Database:** PostgreSQL
- **ORM:** Drizzle
- **Validation:** Zod (shared schemas in packages/shared-types)
- **API style:** REST + Hono RPC client for end-to-end type safety
- **Services:** gateway, betting, balance, match-odds, relay, settlement, history
- **Deployment:** Combined Hono server on Railway

## References

- `techstack.md` — Backend Layer section
- `production.md` — Backend: Railway section

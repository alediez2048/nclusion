# Nclusion Sports Betting Platform — Development Log

**Project:** Solana-Based Sports Betting Platform Using HTGN Stablecoins for the Haitian Market  
**Timeline:** MVP / Demo Track plus Production Readiness Track  
**Developer:** JAD  
**AI Assistant:** Cursor Agent

---

## How To Use This Log

- Add a new ticket entry in reverse chronological order, with the newest completed work at the top.
- Update the `Timeline` table when a phase meaningfully changes state.
- Update the `Ticket Index` tables whenever a ticket moves to `Complete`, `In Progress`, or `Blocked`.
- Use `ticket-primer-template.md` to create a focused primer before starting a new ticket.
- Cross-reference `prd.md`, `requirements.md`, `systemsdesign.md`, and `interviews.md` when recording scope, decisions, and acceptance criteria.

---

## Current Build Plan

This DEVLOG follows the phased delivery plan defined in `prd.md`:

1. **P0: Discovery and Scope Lock**
2. **P1: Foundations**
3. **P2: Core Betting Loop**
4. **P3: Demo Hardening**
5. **P4: MVP Operational Hardening**
6. **P5: Production Readiness**

The product goal is a low-bandwidth, Android-first sports betting platform for the Haitian market, using HTGN and Solana devnet for the trust-critical path of escrow and settlement.

---

## Phase Summary

### P0: Discovery and Scope Lock
- Lock the narrowest credible MVP.
- Finalize supported markets, statuses, provider choices, and demo assumptions.
- Confirm the architecture baseline before implementation begins.

### P1: Foundations
- Stand up the mobile, backend, Solana, and platform scaffolding.
- Establish shared schemas, persistence, localization, and deployment basics.
- Create the baseline developer workflow for implementation and validation.

### P2: Core Betting Loop
- Implement the end-to-end user flow: browse matches, place a bet, relay on-chain, settle, and view receipts.
- Build the balance model, history, receipt endpoints, relay, and Solana instruction path.
- Make the core loop demonstrable from mobile UX through on-chain confirmation.

### P3: Demo Hardening
- Improve offline behavior, lifecycle clarity, localization quality, and support tooling.
- Validate degraded-network behavior and duplicate-prevention scenarios.
- Make the assignment demo reliable, polished, and easy to explain.

### P4: MVP Operational Hardening
- Add failover, cross-provider settlement checks, telemetry, alerts, and risk controls.
- Strengthen support tooling and operational visibility.
- Bridge the gap between a compelling demo and a pilot-capable MVP.

### P5: Production Readiness
- Define compliance, governance, custody, support, and infrastructure hardening work.
- Clarify operational policy and incident readiness.
- Capture the delta between MVP credibility and production-grade launch conditions.

---

## Timeline

| Phase | Name | Ticket Range | Status |
|------|------|--------------|--------|
| P0 | Discovery and Scope Lock | `PRD-001` to `PM-002` | 🔶 10/11 complete (ARCH-004 narrowed) |
| P1 | Foundations | `MOB-001` to `INF-003` | 🔄 In Progress (1/19) |
| P2 | Core Betting Loop | `ODDS-001` to `SET-005` | ⏳ Pending |
| P3 | Demo Hardening | `OFF-001` to `QA-005` | ⏳ Pending |
| P4 | MVP Operational Hardening | `RPC-001` to `SUP-003` | ⏳ Pending |
| P5 | Production Readiness | `COMP-001` to `OPS-007` | ⏳ Pending |

---

## Ticket Index

### P0: Discovery and Scope Lock

| Ticket | Title | Status |
|--------|-------|--------|
| `PRD-001` | Define MVP scope and non-goals for assignment submission | ✅ |
| `PRD-002` | Finalize supported betting markets for demo: win/draw/loss only | ✅ |
| `PRD-003` | Define user-visible bet statuses and balance labels | ✅ |
| `PRD-004` | Finalize Haitian Creole and French terminology glossary | ✅ |
| `ARCH-001` | Choose mobile stack and local storage strategy | ✅ |
| `ARCH-002` | Choose backend framework and service boundaries | ✅ |
| `ARCH-003` | Choose Solana program account model and instruction set | ✅ |
| `ARCH-004` | Select odds provider and result provider for demo | 🔶 Narrowed |
| `ARCH-005` | Define HTGN demo token model on devnet | ✅ |
| `PM-001` | Define demo story and acceptance checklist | ✅ |
| `PM-002` | Define success metrics for demo walkthrough | ✅ |

### P1: Foundations

| Ticket | Title | Status |
|--------|-------|--------|
| `MOB-001` | Initialize Android-first TypeScript app | ⏳ |
| `MOB-002` | Add navigation shell for key mobile screens | ⏳ |
| `MOB-003` | Add SQLite persistence layer | ⏳ |
| `MOB-004` | Add localization framework and language switching | ⏳ |
| `MOB-005` | Add network-state detection and connectivity banner | ⏳ |
| `API-001` | Initialize TypeScript backend monorepo or service layout | ✅ |
| `API-002` | Create API gateway with auth middleware | ⏳ |
| `API-003` | Create user service and managed wallet mapping | ⏳ |
| `API-004` | Create betting service skeleton | ⏳ |
| `API-005` | Create balance service skeleton | ⏳ |
| `API-006` | Create match and odds service skeleton | ⏳ |
| `API-007` | Create receipt and history service skeleton | ⏳ |
| `SOL-001` | Initialize Rust Solana program scaffold | ⏳ |
| `SOL-002` | Define program accounts and PDA strategy | ⏳ |
| `SOL-003` | Implement devnet deployment pipeline | ⏳ |
| `SOL-004` | Set up HTGN demo token mint or integration path | ⏳ |
| `INF-001` | Set up environment configuration and secrets handling for demo | ⏳ |
| `INF-002` | Set up shared types and schemas across mobile and backend | ⏳ |
| `INF-003` | Set up CI for lint, test, and build checks | ⏳ |

### P2: Core Betting Loop

| Ticket | Title | Status |
|--------|-------|--------|
| `ODDS-001` | Integrate real odds provider for football fixtures | ⏳ |
| `ODDS-002` | Normalize provider data into internal match and market models | ⏳ |
| `ODDS-003` | Build compact match list endpoint | ⏳ |
| `ODDS-004` | Build match detail endpoint with basic outcome odds | ⏳ |
| `ODDS-005` | Add cache and TTL strategy for odds payloads | ⏳ |
| `WAL-001` | Create managed wallet on first user setup | ⏳ |
| `WAL-002` | Surface HTGN balance from shadow ledger | ⏳ |
| `BAL-001` | Implement `available`, `reserved`, and `pending settlement` balance model | ⏳ |
| `BAL-002` | Add reconciliation job for chain and ledger views | ⏳ |
| `BET-001` | Build match detail UI and selection flow | ⏳ |
| `BET-002` | Build bet slip and stake input UI | ⏳ |
| `BET-003` | Build confirmation screen with payout preview | ⏳ |
| `BET-004` | Accept bet intent with idempotency key | ⏳ |
| `BET-005` | Validate stake, odds window, and balance before submission | ⏳ |
| `BET-006` | Reserve funds in balance service | ⏳ |
| `BET-007` | Generate deterministic bet ID | ⏳ |
| `REL-001` | Implement transaction relay service | ⏳ |
| `REL-002` | Sponsor transaction fees from platform wallet | ⏳ |
| `REL-003` | Submit place-bet transactions through RPC abstraction | ⏳ |
| `REL-004` | Track signature and confirmation stages | ⏳ |
| `REL-005` | Expose bet lifecycle status updates to betting service | ⏳ |
| `SOL-005` | Implement `place_bet` instruction | ⏳ |
| `SOL-006` | Implement canonical bet record write | ⏳ |
| `SOL-007` | Implement escrow logic for HTGN stake | ⏳ |
| `SOL-008` | Enforce duplicate prevention and status constraints | ⏳ |
| `HIS-001` | Build user bet history endpoint | ⏳ |
| `HIS-002` | Build bet receipt endpoint | ⏳ |
| `HIS-003` | Show user-facing statuses in mobile app | ⏳ |
| `HIS-004` | Store recent bet history locally for offline access | ⏳ |
| `SET-001` | Integrate result provider | ⏳ |
| `SET-002` | Implement settlement service for final result ingestion | ⏳ |
| `SET-003` | Implement `settle_market` instruction | ⏳ |
| `SET-004` | Update balances after settlement | ⏳ |
| `SET-005` | Reflect settlement state in history and receipts | ⏳ |

### P3: Demo Hardening

| Ticket | Title | Status |
|--------|-------|--------|
| `OFF-001` | Cache match lists and top match details locally | ⏳ |
| `OFF-002` | Cache balances and bet history locally | ⏳ |
| `OFF-003` | Allow draft bet intent creation under weak connectivity | ⏳ |
| `OFF-004` | Revalidate queued intents on reconnect | ⏳ |
| `OFF-005` | Add clear failure and retry messaging for pending bets | ⏳ |
| `UX-001` | Finalize home screen layout for low-bandwidth usage | ⏳ |
| `UX-002` | Add status chips and progress messaging for bet lifecycle | ⏳ |
| `UX-003` | Finalize receipt screen with optional advanced proof | ⏳ |
| `UX-004` | Add balance explanation UI for locked vs available funds | ⏳ |
| `UX-005` | Review and refine Haitian Creole copy | ⏳ |
| `UX-006` | Review and refine French copy | ⏳ |
| `OPS-001` | Create lightweight operator dashboard for bet lookup | ⏳ |
| `OPS-002` | Add transaction signature visibility for support | ⏳ |
| `OPS-003` | Add settlement audit view for a match | ⏳ |
| `OPS-004` | Add manual settlement hold flag for disputed results | ⏳ |
| `QA-001` | Create end-to-end demo test script | ⏳ |
| `QA-002` | Test on low-end Android emulator settings | ⏳ |
| `QA-003` | Test degraded network simulation for browse, bet, and settlement flows | ⏳ |
| `QA-004` | Test duplicate bet submission protections | ⏳ |
| `QA-005` | Test odds change and reconfirmation flow | ⏳ |

### P4: MVP Operational Hardening

| Ticket | Title | Status |
|--------|-------|--------|
| `RPC-001` | Add multi-provider RPC failover | ⏳ |
| `RPC-002` | Add provider health scoring and timeout logic | ⏳ |
| `RPC-003` | Add confirmation reconciliation between relay and indexer | ⏳ |
| `SET-006` | Add secondary results provider cross-check | ⏳ |
| `SET-007` | Add disputed result workflow | ⏳ |
| `SET-008` | Add market cancellation path | ⏳ |
| `OBS-001` | Add structured server lifecycle logs | ⏳ |
| `OBS-002` | Add deferred mobile telemetry batch upload | ⏳ |
| `OBS-003` | Add dashboards for submission, confirmation, and settlement success rates | ⏳ |
| `OBS-004` | Add alerting for stuck bets and failed settlement batches | ⏳ |
| `RISK-001` | Add bet velocity checks | ⏳ |
| `RISK-002` | Add device and session reputation scoring | ⏳ |
| `RISK-003` | Add conservative stake limits for pilot launch | ⏳ |
| `RISK-004` | Add anomaly review queue | ⏳ |
| `SUP-001` | Add user search and bet trace tooling | ⏳ |
| `SUP-002` | Add reconciliation mismatch investigation tool | ⏳ |
| `SUP-003` | Add operator notes and dispute tracking | ⏳ |

### P5: Production Readiness

| Ticket | Title | Status |
|--------|-------|--------|
| `COMP-001` | Define legal and licensing workstream for target market launch | ⏳ |
| `COMP-002` | Define AML and KYC expectations for production rollout | ⏳ |
| `COMP-003` | Define terms, responsible gambling, and dispute policy requirements | ⏳ |
| `GOV-001` | Define staged program upgrade authority policy | ⏳ |
| `GOV-002` | Define production change-management and release approval process | ⏳ |
| `SEC-001` | Harden managed wallet custody and signer boundaries | ⏳ |
| `SEC-002` | Add secure recovery and account reissuance workflow | ⏳ |
| `SEC-003` | Threat-model relay, wallet, and settlement services | ⏳ |
| `SEC-004` | Conduct Solana program security review | ⏳ |
| `SEC-005` | Conduct backend secrets and access-control review | ⏳ |
| `PROD-001` | Define production hosting topology and environment separation | ⏳ |
| `PROD-002` | Add backup and disaster recovery plan | ⏳ |
| `PROD-003` | Add incident response and on-call runbooks | ⏳ |
| `PROD-004` | Add production database migration and retention plan | ⏳ |
| `PROD-005` | Add rate limiting and WAF strategy | ⏳ |
| `FIN-001` | Define treasury and fee sponsorship model | ⏳ |
| `FIN-002` | Define reconciliation process between chain state and internal ledgers | ⏳ |
| `FIN-003` | Define payout exception handling policy | ⏳ |
| `OPS-005` | Define customer support SOP for pending, failed, and disputed bets | ⏳ |
| `OPS-006` | Define settlement exception review workflow | ⏳ |
| `OPS-007` | Define operational KPI review cadence | ⏳ |

---

## Milestones To Track

### MVP / Demo Completion

Track these against the acceptance criteria in `prd.md`:

- A user can sign in and see a localized home screen.
- A user can browse real football matches and basic odds.
- A user can place a single HTGN bet.
- The bet is submitted through the relay and confirmed on Solana devnet.
- The UI shows clear bet lifecycle statuses.
- The user can see balance changes and history.
- A match result can be processed and the bet can be settled.
- The user can inspect a receipt with advanced proof fields.
- Cached history and match browsing still work when network conditions degrade.
- A basic operator view can verify the bet and settlement lifecycle.

### Production Readiness Completion

- Multi-RPC failover is operational.
- Operator tooling covers disputes and reconciliation.
- Custody, recovery, and secrets boundaries are hardened.
- Compliance and support workflows are defined.
- Settlement disputes can be paused and reviewed safely.
- Telemetry and alerts catch stuck bets and failed settlements.

---

## Architectural References

Use these references inside ticket entries when relevant:

- `requirements.md` for scope, constraints, and MVP boundaries
- `interviews.md` for trade-off rationale and architectural decisions
- `systemsdesign.md` for service boundaries, state flows, and data model guidance
- `prd.md` for phase plan, ticket definitions, and acceptance criteria
- `index.md` for cross-document navigation

Common recurring decisions:

- Managed per-user wallets with future export potential
- Backend transaction relay with idempotency and fee sponsorship
- On-chain escrow and settlement, off-chain odds and support state
- Aggressive caching and explicit offline states
- Optional advanced receipts for trust and dispute handling

---

## Entry Format Template

Use this structure for each completed ticket entry.

---

## TICKET-ID: [Title] [Status Emoji]

### Plain-English Summary
- One to three bullets describing what changed in user or system terms
- Focus on why the ticket matters, not just what files changed

### Metadata
- **Status:** Complete | In Progress | Blocked
- **Date:** MMM DD, YYYY
- **Ticket:** `TICKET-ID`
- **Branch:** `feature/TICKET-ID-short-description`
- **Related Docs:** `prd.md`, `requirements.md`, `systemsdesign.md`, `interviews.md`

### Goal
- [Single sentence describing the intended outcome]

### Scope
- Phase 1: [what was done first]
- Phase 2: [what was done second]
- Phase 3: [what was done third]

### Key Achievements
- [Outcome 1]
- [Outcome 2]
- [Outcome 3]

### Technical Implementation
[Brief summary of the implementation approach, contracts preserved, and any important architectural choices.]

### Files Changed
- **Created:** `path/to/new_file` — brief description
- **Modified:** `path/to/existing_file` — what changed
- **Updated:** `docs/DEVLOG.md` — this entry

### Testing
- Tests added: [count or list]
- Test results: [X passed, Y failed]
- Validation commands: `python -m pytest tests/ -v`, `ruff check . --fix`

### Issues & Solutions
- [Problem encountered and how it was handled]

### Errors / Bugs / Problems
- None

### Acceptance Criteria
- [x] [Criterion from the ticket or `prd.md`]
- [x] Tests pass
- [x] Lint clean
- [x] DEVLOG updated
- [ ] [Any remaining item if incomplete]

### Learnings
- [What was learned or validated]

### Next Steps
- [What this ticket unblocks]
- [What should be tackled next]

---

## API-001: Initialize TypeScript backend monorepo or service layout ✅

### Plain-English Summary
- Set up the Turborepo + pnpm workspaces monorepo that holds all TypeScript code.
- Created gateway app with Hono health check and test, 6 service skeletons, and 3 shared packages.
- All 4 pipelines pass: build, test, lint, typecheck (40/40 tasks).

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `API-001`
- **Branch:** `feature/API-001-init-backend-monorepo`
- **Related Docs:** `techstack.md`, `systemsdesign.md`

### Key Achievements
- Monorepo structure: apps/gateway, 6 services, 3 shared packages
- Biome linting, Vitest testing, TypeScript strict mode configured
- Gateway health check test passes via `app.request()` (no server spin-up)
- Turborepo caching functional across all packages
- `vitest.config.ts` with `passWithNoTests` for empty packages

### Files Changed
- **Created:** 40 files across monorepo structure (see commit)
- **Updated:** `docs/DEVLOG.md` — this entry

### Testing
- Tests added: 1 (gateway health check)
- Test results: 1 passed
- All pipelines: `turbo build test lint typecheck` — 40/40 pass

### Next Steps
- API-002: Create API gateway with auth middleware
- INF-002: Set up shared types / schemas
- SOL-001: Initialize Rust Solana program scaffold (independent)
- MOB-001: Initialize Android-first TypeScript app (independent)

---

## PM-002: Define success metrics for demo walkthrough ✅

### Plain-English Summary
- Created `docs/success-metrics.md` with 8 demo pass/fail criteria, 8 MVP product metrics with quantitative targets, and 5 production reference metrics.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `PM-002`
- **Branch:** `feature/PM-001-demo-script`

### Files Changed
- **Created:** `docs/success-metrics.md`
- **Updated:** `docs/DEVLOG.md` — this entry

---

## PM-001: Define demo story and acceptance checklist ✅

### Plain-English Summary
- Created `docs/demo-script.md` — a 10-step rehearsable demo script with talking points, on-screen actions, and timing targets (~8-10 minutes).
- Includes a 12-point acceptance checklist for pre-demo verification.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `PM-001`
- **Branch:** `feature/PM-001-demo-script`

### Files Changed
- **Created:** `docs/demo-script.md`
- **Updated:** `docs/DEVLOG.md` — this entry

---

## PRD-004: Finalize Haitian Creole and French terminology glossary ✅

### Plain-English Summary
- Created `docs/glossary.md` with ~120 user-facing terms in English, Haitian Creole, and French.
- Covers navigation, bet statuses, balance labels, bet slip, confirmation, match info, connectivity, errors, receipts, settlement, and general UI.
- Serves as the source of truth for localization bundles in MOB-004.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `PRD-004`
- **Branch:** `feature/PRD-004-localization-glossary`

### Files Changed
- **Created:** `docs/glossary.md` — localization glossary
- **Created:** `docs/primers/PRD-004-primer.md`
- **Updated:** `docs/DEVLOG.md` — this entry

### Next Steps
- PM-001: Define demo story and acceptance checklist
- PM-002: Define success metrics

---

## PRD-003: Define user-visible bet statuses and balance labels ✅

### Plain-English Summary
- Locked the bet state machine: 9 user-facing states with colors, internal state progression, valid/invalid transitions.
- Locked the three-part balance breakdown: Available, In active bets, Pending settlement — with transition rules for every lifecycle event.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `PRD-003`
- **Branch:** `feature/PRD-003-statuses-and-labels`

### Files Changed
- **Created:** `docs/primers/PRD-003-primer.md`
- **Modified:** `docs/mvp-scope.md` — added Bet State Machine and Balance Labels sections
- **Updated:** `docs/DEVLOG.md` — this entry

### Next Steps
- PRD-004: Finalize Haitian Creole and French terminology glossary

---

## PRD-002: Finalize supported betting markets for demo ✅

### Plain-English Summary
- Locked betting markets to 1X2 single bets on football matches (Home win / Draw / Away win).
- No parlays, props, over/under, or live betting. Added Supported Markets section to `docs/mvp-scope.md` with implications for bet slip, odds service, Solana program, settlement, and UI.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `PRD-002`
- **Branch:** `feature/PRD-002-betting-markets`

### Files Changed
- **Created:** `docs/primers/PRD-002-primer.md`
- **Modified:** `docs/mvp-scope.md` — added Supported Markets section
- **Updated:** `docs/DEVLOG.md` — this entry

### Next Steps
- PRD-003: Define user-visible bet statuses and balance labels

---

## PRD-001: Define MVP scope and non-goals for assignment submission ✅

### Plain-English Summary
- Created the authoritative MVP scope document (`docs/mvp-scope.md`) that consolidates scope from requirements.md and prd.md into a single reference.
- Defines exactly what is in scope (mobile app, backend, Solana program, operator tooling, infrastructure), what is out of scope with rationale, and the 10-point demo acceptance criteria.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `PRD-001`
- **Branch:** `feature/PRD-001-define-mvp-scope`
- **Related Docs:** `requirements.md`, `prd.md`, `techstack.md`, `production.md`

### Key Achievements
- Single-page MVP scope document created
- In-scope / out-of-scope boundary locked
- Demo acceptance criteria consolidated
- Added to index.md reading order as #1

### Files Changed
- **Created:** `docs/mvp-scope.md` — authoritative MVP scope reference
- **Created:** `docs/primers/PRD-001-primer.md` — ticket primer
- **Modified:** `index.md` — added mvp-scope.md to reading order and document map
- **Updated:** `docs/DEVLOG.md` — this entry

### Next Steps
- PRD-002: Finalize supported betting markets
- PRD-003: Define user-visible bet statuses and balance labels
- PRD-004: Finalize Haitian Creole and French terminology glossary

---

## ARCH-005: Define HTGN demo token model on devnet ✅

### Plain-English Summary
- Locked the HTGN demo token as an SPL Token on Solana devnet with platform-controlled mint authority and 2 decimal places.
- A backend faucet endpoint will mint demo HTGN to managed wallets for testing.
- Production path: swap the demo mint address for the real HTGN token address with no escrow program changes.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `ARCH-005`
- **Related Docs:** `techstack.md`

### Key Achievements
- Token model defined: SPL Token, 2 decimals, platform-controlled mint
- Clear production migration path documented

---

## ARCH-004: Select odds provider and result provider for demo 🔶

### Plain-English Summary
- Narrowed to two candidates: The Odds API (generous free tier) and API-Football (richer match data).
- Final selection deferred to P0 implementation after testing World Cup fixture coverage and API quality.

### Metadata
- **Status:** Narrowed — final selection pending P0 evaluation
- **Date:** Mar 24, 2026
- **Ticket:** `ARCH-004`
- **Related Docs:** `techstack.md`

---

## ARCH-003: Choose Solana program account model and instruction set ✅

### Plain-English Summary
- Locked Anchor 0.30+ as the Solana program framework.
- Testing via cargo test + solana-bankrun (in-process, ~100ms per test).
- IDL auto-generates into `packages/solana-client/` for typed TypeScript client calls.
- Program instructions: `initialize_market_escrow`, `place_bet`, `settle_market`, `cancel_market`, `release_funds`.
- Account strategy: deterministic PDAs, market-level escrow pools, compact on-chain bet receipts.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `ARCH-003`
- **Related Docs:** `techstack.md`, `systemsdesign.md`

---

## ARCH-002: Choose backend framework and service boundaries ✅

### Plain-English Summary
- Locked Hono on Node.js 20 LTS as the backend framework.
- PostgreSQL for the database, Drizzle as ORM, Zod for shared validation schemas.
- REST API with Hono RPC client for end-to-end type safety.
- Seven services (gateway, betting, balance, match-odds, relay, settlement, history) structured as separate monorepo packages but deployed as a single combined Hono process on Railway.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `ARCH-002`
- **Related Docs:** `techstack.md`, `production.md`, `systemsdesign.md`

---

## ARCH-001: Choose mobile stack and local storage strategy ✅

### Plain-English Summary
- Locked React Native bare workflow with Hermes engine for maximum control on low-end Android 8 / 2GB RAM devices.
- op-sqlite (JSI-based, WAL mode) for local database.
- Zustand for state management with SQLite persistence.
- React Navigation v7 with native-stack for memory-efficient navigation.
- Biome for linting/formatting, Vitest for unit tests, Maestro for E2E.

### Metadata
- **Status:** Complete
- **Date:** Mar 24, 2026
- **Ticket:** `ARCH-001`
- **Related Docs:** `techstack.md`, `systemsdesign.md`

---

*Entries are added in reverse chronological order, newest at the top.*
*Update the Timeline and Ticket Index whenever ticket or phase status changes.*

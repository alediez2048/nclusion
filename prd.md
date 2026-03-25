# Product Requirements Document (PRD)

## Solana-Based Sports Betting Platform Using HTGN Stablecoins for the Haitian Market

This PRD builds on:

- [requirements.md](/Users/jad/Desktop/Week%205/Nclusion/requirements.md)
- [systemsdesign.md](/Users/jad/Desktop/Week%205/Nclusion/systemsdesign.md)
- [interviews.md](/Users/jad/Desktop/Week%205/Nclusion/interviews.md)

It translates those documents into a product delivery plan for both:

- a strong **MVP / hiring-partner demo**
- and a realistic path to **production readiness**

---

## 1. Product Summary

We are building a mobile-first sports betting platform for the Haitian market that uses HTGN stablecoins and Solana devnet for verifiable escrow and settlement, while hiding blockchain complexity from end users.

The product must work under severe local constraints:

- intermittent 2G/3G connectivity,
- daily data budget pressure,
- low-end Android devices,
- low trust in formal systems,
- and a user base that cares more about payout reliability than crypto branding.

The product should feel like a simple betting app with:

- fast match browsing,
- clear stake and payout visibility,
- understandable statuses,
- reliable balance tracking,
- and optional receipts that prove fairness and settlement.

---

## 2. Problem Statement

Sports betting demand already exists in Haiti, but much of it happens through informal channels that are difficult to trust, difficult to audit, and disconnected from broader financial infrastructure.

Nclusion's opportunity is to launch a legitimate mobile betting product before the 2026 FIFA World Cup attention spike. The challenge is not only enabling betting with HTGN on Solana, but doing so in a way that:

- works on poor mobile infrastructure,
- does not require users to learn crypto,
- and earns trust through clear payout and settlement behavior.

---

## 3. Product Vision

Create the most trustworthy low-bandwidth mobile betting experience for Haiti by making blockchain invisible in the primary flow and using Solana only where it materially improves trust: escrow, settlement, and receipts.

---

## 4. Goals

### Primary goals

- Enable Haitian users to browse football matches and place HTGN-denominated bets on Android.
- Use Solana devnet to escrow and settle bets transparently.
- Abstract wallets, gas, and blockchain terminology from the main experience.
- Support poor connectivity with cached data, explicit statuses, and recoverable flows.
- Deliver a demo that clearly shows product judgment, technical rigor, and market fit.

### Secondary goals

- Demonstrate a scalable architecture for production.
- Establish operator and support tooling patterns.
- Create a foundation for expansion into additional bet types, leagues, and markets.

---

## 5. Non-Goals

The MVP / demo will not include:

- iOS support
- parlays or advanced bet types
- full self-custodial wallet UX
- direct user-managed seed phrases
- full decentralized oracle infrastructure
- deep promotions or growth loops
- production licensing rollout across jurisdictions
- full AML/KYC stack beyond MVP assumptions

---

## 6. Target Users

### Primary user

A Haitian mobile user who:

- already understands informal sports betting,
- uses a low-end Android phone,
- has unstable mobile connectivity,
- is price and trust sensitive,
- and prefers Haitian Creole.

### Secondary user

A support or operations team member who:

- needs to investigate stuck bets,
- verify settlement status,
- answer payout disputes,
- and understand why a bet is pending, failed, or settled.

### Internal stakeholder

A hiring partner or technical evaluator who wants evidence of:

- strong scoping,
- coherent system design,
- realistic emerging-market assumptions,
- and solid execution discipline.

---

## 7. Jobs To Be Done

### End-user jobs

- "Let me quickly see matches I care about."
- "Let me place a bet without learning crypto."
- "Let me know whether my bet really went through."
- "Let me understand why my money is unavailable."
- "Let me verify I was paid fairly."

### Operator jobs

- "Let me see the exact status of a user's bet."
- "Let me verify whether a bet reached chain confirmation."
- "Let me pause or review a disputed settlement."
- "Let me explain a failure clearly to support."

---

## 8. Product Principles

- **Invisible blockchain:** hide wallet creation, signatures, and gas from the user.
- **Trust over hype:** receipts, payout reliability, and balance clarity matter more than Web3 branding.
- **Resilience first:** weak connectivity is a first-class product condition.
- **Data parsimony:** optimize every request and cache aggressively.
- **Narrow scope wins:** start with the highest-confidence football flow and execute it well.

---

## 9. Core User Experience

### User journey

1. User signs in with a simple identity flow.
2. User lands on a lightweight home screen with balance, top matches, and open bets.
3. User opens a match and sees basic outcome odds.
4. User enters stake and sees potential payout.
5. User confirms the bet.
6. App shows simple status updates: `Queued`, `Processing`, `Confirmed`, `Pending settlement`, `Won/Lost`.
7. User can inspect balance impact and bet history at all times.
8. If the user wants more proof, they can open an advanced receipt with transaction details.

### UX requirements

- Haitian Creole default
- French secondary language
- low visual weight and low data usage
- explicit offline or limited connectivity messaging
- no false claim of success before chain confirmation

---

## 10. MVP Scope

### In scope for MVP / demo

- Android-first TypeScript mobile app
- phone-based or similarly lightweight login
- managed per-user wallet creation
- HTGN balance display
- football match feed from a real odds source
- single bets on win/draw/loss
- bet slip and confirmation flow
- backend relay for transaction submission
- Solana devnet escrow and settlement
- bet receipts and history
- local caching for matches, balances, and history
- explicit pending and offline states
- Haitian Creole and French UI
- basic operator dashboard for support and verification

### In scope for production readiness, but not required for demo completion

- stronger abuse controls
- hardened account recovery
- richer observability
- compliance, legal, and licensing workflows
- infrastructure hardening and failover
- formal incident response and support processes
- production-grade custody and secrets management

---

## 11. Functional Requirements

### Match browsing

- Show upcoming and active football matches.
- Show current odds for basic outcomes.
- Cache recently viewed and top matches locally.
- Show freshness indicators when data is stale.

### Bet placement

- Allow users to place a single HTGN-denominated bet.
- Show stake, accepted odds, and projected payout before submission.
- Use a backend relay rather than direct RPC from mobile.
- Deduplicate retries safely.

### Balance management

- Show `Available`, `In active bets`, and `Pending settlement`.
- Update quickly using backend shadow balance views.
- Reconcile against on-chain settlement state.

### History and receipts

- Show open, pending, won, lost, and cancelled bets.
- Support offline access to recent bet history.
- Expose transaction and settlement proof as optional advanced details.

### Settlement

- Trigger settlement from trusted result data.
- Cross-check providers.
- Hold disputed results for manual review.
- Credit winnings after confirmed settlement.

### Connectivity resilience

- Support browsing from cache while offline.
- Allow bet intent drafting even under weak connectivity.
- Require odds revalidation before actual submission.
- Explain exactly what happens next in failure cases.

---

## 12. Non-Functional Requirements

- Work on Android 8+ and low-end devices
- Remain usable at 200kbps and 300ms+ latency
- Avoid heavy polling and unnecessary payloads
- Use a relay and multi-RPC model for transaction reliability
- Preserve idempotency and replay safety
- Maintain clear operator visibility into failures and lifecycle state

---

## 13. Success Metrics

### Demo success metrics

- End-to-end bet flow can be demonstrated reliably.
- Match browse to bet confirmation flow completes on a constrained Android device or simulator.
- A bet can be placed, confirmed, settled, and shown in history.
- Offline or degraded behavior is visible and coherent.
- Receipts and status transitions are easy to understand.

### Product metrics for MVP

- first session to first bet completion rate
- bet submission success rate
- duplicate submission prevention rate
- settlement success rate
- time from match final result to visible settlement
- support incidents per 100 settled bets
- percentage of views served from local cache

### Production metrics

- uptime by service
- RPC failover recovery rate
- reconciliation mismatch rate
- abuse detection precision
- operator resolution time for disputes

---

## 14. Assumptions

- HTGN can be represented in the demo environment on Solana devnet.
- We can access at least one viable sports odds / result provider.
- Managed wallets are acceptable for MVP and demo scope.
- The assignment is evaluated primarily on architecture quality, product judgment, and execution credibility rather than full legal readiness.

---

## 15. Risks

### Product risks

- Users may distrust delayed or unclear betting outcomes.
- Users may not distinguish `queued` from `confirmed` without careful UX.
- Partial localization would undermine trust.

### Technical risks

- RPC instability
- stale odds and repricing edge cases
- duplicate submission on weak networks
- settlement disagreement from data providers
- low-end Android performance issues

### Business risks

- compliance and licensing ambiguity
- user support burden during edge cases
- costs from fee sponsorship and transaction retries

---

## 16. Release Strategy

The project should be delivered in two tracks:

1. **MVP / Demo Track**
2. **Production Readiness Track**

The demo track is about proving the concept. The production track is about making the concept safe, supportable, and scalable.

---

## 17. Delivery Phases

## Phase 0: Discovery and Scope Lock

Goal:

- confirm the narrowest credible MVP
- lock architecture assumptions
- select providers and demo boundaries

Exit criteria:

- scope approved
- core flows defined
- provider and HTGN demo assumptions chosen

## Phase 1: Foundations

Goal:

- create project scaffolding and baseline architecture

Exit criteria:

- mobile app skeleton running
- backend skeleton running
- Solana program scaffold created
- local development flow established

## Phase 2: Core Betting Loop

Goal:

- ship the main end-to-end user flow

Exit criteria:

- browse matches
- place a bet
- see status update
- settle a bet
- view updated balance and history

## Phase 3: Demo Hardening

Goal:

- make the assignment demo reliable and compelling

Exit criteria:

- offline behavior shown
- receipts and status UX polished
- localization present
- support workflow minimally functional

## Phase 4: MVP Operational Hardening

Goal:

- make the MVP resilient enough for pilot usage

Exit criteria:

- multi-RPC failover
- result cross-checking
- telemetry
- operator tooling
- abuse controls

## Phase 5: Production Readiness

Goal:

- close the gaps between demo-grade and production-grade system behavior

Exit criteria:

- compliance workstream defined
- custody and recovery hardened
- infrastructure and incident response designed
- support and reconciliation workflows formalized

---

## 18. Ticket Backlog By Phase

The tickets below are grouped as implementation-ready work items. They are intentionally scoped at a level that could map directly into Jira, Linear, or GitHub issues.

## Phase 0 Tickets: Discovery and Scope Lock

### Product

- `PRD-001` Define MVP scope and non-goals for assignment submission.
- `PRD-002` Finalize supported betting markets for demo: win/draw/loss only.
- `PRD-003` Define user-visible bet statuses and balance labels.
- `PRD-004` Finalize Haitian Creole and French terminology glossary.

### Technical

- `ARCH-001` Choose mobile stack and local storage strategy.
- `ARCH-002` Choose backend framework and service boundaries.
- `ARCH-003` Choose Solana program account model and instruction set.
- `ARCH-004` Select odds provider and result provider for demo.
- `ARCH-005` Define HTGN demo token model on devnet.

### Demo / PM

- `PM-001` Define demo story and acceptance checklist.
- `PM-002` Define success metrics for demo walkthrough.

## Phase 1 Tickets: Foundations

### Mobile

- `MOB-001` Initialize Android-first TypeScript app.
- `MOB-002` Add navigation shell for home, match detail, bet slip, history, wallet, and receipt screens.
- `MOB-003` Add SQLite persistence layer.
- `MOB-004` Add localization framework and language switching.
- `MOB-005` Add network-state detection and connectivity banner.

### Backend

- `API-001` Initialize TypeScript backend monorepo or service layout.
- `API-002` Create API gateway with auth middleware.
- `API-003` Create user service and managed wallet mapping.
- `API-004` Create betting service skeleton.
- `API-005` Create balance service skeleton.
- `API-006` Create match and odds service skeleton.
- `API-007` Create receipt and history service skeleton.

### Solana

- `SOL-001` Initialize Rust Solana program scaffold.
- `SOL-002` Define program accounts and PDA strategy.
- `SOL-003` Implement devnet deployment pipeline.
- `SOL-004` Set up HTGN demo token mint / integration path.

### Platform

- `INF-001` Set up environment configuration and secrets handling for demo.
- `INF-002` Set up shared types / schemas across mobile and backend.
- `INF-003` Set up CI for lint, test, and build checks.

## Phase 2 Tickets: Core Betting Loop

### Match Feed

- `ODDS-001` Integrate real odds provider for football fixtures.
- `ODDS-002` Normalize provider data into internal match and market models.
- `ODDS-003` Build compact match list endpoint.
- `ODDS-004` Build match detail endpoint with basic outcome odds.
- `ODDS-005` Add cache and TTL strategy for odds payloads.

### Wallet and Balance

- `WAL-001` Create managed wallet on first user setup.
- `WAL-002` Surface HTGN balance from shadow ledger.
- `BAL-001` Implement `available`, `reserved`, and `pending settlement` balance model.
- `BAL-002` Add reconciliation job for chain and ledger views.

### Betting Flow

- `BET-001` Build match detail UI and selection flow.
- `BET-002` Build bet slip and stake input UI.
- `BET-003` Build confirmation screen with payout preview.
- `BET-004` Accept bet intent with idempotency key.
- `BET-005` Validate stake, odds window, and balance before submission.
- `BET-006` Reserve funds in balance service.
- `BET-007` Generate deterministic bet ID.

### Relay and Chain

- `REL-001` Implement transaction relay service.
- `REL-002` Sponsor transaction fees from platform wallet.
- `REL-003` Submit place-bet transactions through RPC abstraction.
- `REL-004` Track signature and confirmation stages.
- `REL-005` Expose bet lifecycle status updates to betting service.

### Solana Program

- `SOL-005` Implement `place_bet` instruction.
- `SOL-006` Implement canonical bet record write.
- `SOL-007` Implement escrow logic for HTGN stake.
- `SOL-008` Enforce duplicate prevention and status constraints.

### History and Receipts

- `HIS-001` Build user bet history endpoint.
- `HIS-002` Build bet receipt endpoint.
- `HIS-003` Show user-facing statuses in mobile app.
- `HIS-004` Store recent bet history locally for offline access.

### Settlement

- `SET-001` Integrate result provider.
- `SET-002` Implement settlement service for final result ingestion.
- `SET-003` Implement `settle_market` instruction.
- `SET-004` Update balances after settlement.
- `SET-005` Reflect settlement state in history and receipts.

## Phase 3 Tickets: Demo Hardening

### Offline and Resilience

- `OFF-001` Cache match lists and top match details locally.
- `OFF-002` Cache balances and bet history locally.
- `OFF-003` Allow draft bet intent creation under weak connectivity.
- `OFF-004` Revalidate queued intents on reconnect.
- `OFF-005` Add clear failure and retry messaging for pending bets.

### UX Polish

- `UX-001` Finalize home screen layout for low-bandwidth usage.
- `UX-002` Add status chips and progress messaging for bet lifecycle.
- `UX-003` Finalize receipt screen with optional advanced proof.
- `UX-004` Add balance explanation UI for locked vs available funds.
- `UX-005` Review and refine Haitian Creole copy.
- `UX-006` Review and refine French copy.

### Support / Demo Tools

- `OPS-001` Create lightweight operator dashboard for bet lookup.
- `OPS-002` Add transaction signature visibility for support.
- `OPS-003` Add settlement audit view for a match.
- `OPS-004` Add manual settlement hold flag for disputed results.

### QA / Demo Validation

- `QA-001` Create end-to-end demo test script.
- `QA-002` Test on low-end Android emulator settings.
- `QA-003` Test degraded network simulation for browse, bet, and settlement flows.
- `QA-004` Test duplicate bet submission protections.
- `QA-005` Test odds change and reconfirmation flow.

## Phase 4 Tickets: MVP Operational Hardening

### Reliability

- `RPC-001` Add multi-provider RPC failover.
- `RPC-002` Add provider health scoring and timeout logic.
- `RPC-003` Add confirmation reconciliation between relay and indexer.

### Settlement Integrity

- `SET-006` Add secondary results provider cross-check.
- `SET-007` Add disputed result workflow.
- `SET-008` Add market cancellation path.

### Observability

- `OBS-001` Add structured server lifecycle logs.
- `OBS-002` Add deferred mobile telemetry batch upload.
- `OBS-003` Add dashboards for submission, confirmation, and settlement success rates.
- `OBS-004` Add alerting for stuck bets and failed settlement batches.

### Abuse / Risk

- `RISK-001` Add bet velocity checks.
- `RISK-002` Add device/session reputation scoring.
- `RISK-003` Add conservative stake limits for pilot launch.
- `RISK-004` Add anomaly review queue.

### Support

- `SUP-001` Add user search and bet trace tooling.
- `SUP-002` Add reconciliation mismatch investigation tool.
- `SUP-003` Add operator notes and dispute tracking.

## Phase 5 Tickets: Production Readiness

### Compliance and Governance

- `COMP-001` Define legal and licensing workstream for target market launch.
- `COMP-002` Define AML / KYC expectations for production rollout.
- `COMP-003` Define terms, responsible gambling, and dispute policy requirements.
- `GOV-001` Define staged program upgrade authority policy.
- `GOV-002` Define production change-management and release approval process.

### Custody and Security

- `SEC-001` Harden managed wallet custody and signer boundaries.
- `SEC-002` Add secure recovery and account reissuance workflow.
- `SEC-003` Threat-model relay, wallet, and settlement services.
- `SEC-004` Conduct Solana program security review.
- `SEC-005` Conduct backend secrets and access-control review.

### Infrastructure

- `PROD-001` Define production hosting topology and environment separation.
- `PROD-002` Add backup and disaster recovery plan.
- `PROD-003` Add incident response and on-call runbooks.
- `PROD-004` Add production database migration and retention plan.
- `PROD-005` Add rate limiting and WAF strategy.

### Financial Operations

- `FIN-001` Define treasury and fee sponsorship model.
- `FIN-002` Define reconciliation process between chain state and internal ledgers.
- `FIN-003` Define payout exception handling policy.

### Support and Operations

- `OPS-005` Define customer support SOP for pending, failed, and disputed bets.
- `OPS-006` Define settlement exception review workflow.
- `OPS-007` Define operational KPI review cadence.

---

## 19. MVP / Demo Acceptance Criteria

The assignment demo is complete when all of the following are true:

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

---

## 20. Production Acceptance Criteria

The product is production-ready only when all of the following are true:

- multi-RPC failover is operational,
- operator tooling covers disputes and reconciliation,
- custody, recovery, and secrets boundaries are hardened,
- compliance and support workflows are defined,
- settlement disputes can be paused and reviewed safely,
- telemetry and alerts catch stuck bets and failed settlements,
- and the team can explain how user trust is preserved under edge conditions.

---

## 21. Recommended Demo Narrative

The strongest story for the hiring partner is:

1. Show the Haitian-market problem and constraints.
2. Show the low-bandwidth Android-first UI.
3. Show that blockchain is invisible in the main flow.
4. Place a bet and show explicit status transitions.
5. Settle the bet on Solana devnet.
6. Open the receipt and show optional proof.
7. Show offline or degraded behavior.
8. Show the operator screen that makes the system supportable.

This narrative makes the project feel like a serious product, not just a chain demo.

---

## 22. Open Questions

- ~~Will the demo use a mock HTGN integration, a wrapped devnet asset, or a project-provided token path?~~ **Resolved:** SPL Token on Solana devnet with platform-controlled mint authority, 2 decimals. Backend faucet endpoint mints demo HTGN to managed wallets for testing. See [`techstack.md`](./techstack.md).
- ~~Which odds provider gives the cleanest football data at acceptable MVP cost?~~ **Narrowed:** The Odds API or API-Football. Final selection during P0 after testing World Cup fixture coverage and API quality. See [`techstack.md`](./techstack.md).
- What exact level of login and identity validation is expected for the submission?
- How much operator tooling is needed to look credible without overbuilding?
- Should the demo simulate poor connectivity live or with recorded fallback states?

---

## 23. Final Recommendation

The best way to win this assignment is to optimize for:

- a narrow but fully coherent betting loop,
- strong offline and pending-state UX,
- clear trust mechanics,
- and a polished explanation of why Solana is used only for escrow and settlement.

The MVP / demo should look intentionally scoped and operationally believable. The production plan should show that the team understands the real gaps between a convincing prototype and a launchable financial product.

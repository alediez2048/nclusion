# Project Document Index

## Project Summary

This project defines a mobile-first sports betting platform for the Haitian market that uses HTGN stablecoins and Solana devnet for escrow and settlement while keeping blockchain complexity out of the main user experience.

The document set consistently emphasizes:

- low-bandwidth Android-first design,
- invisible blockchain UX,
- trust through clear status and receipts,
- off-chain orchestration with on-chain settlement,
- and a narrow MVP focused on high-interest football matches.

## Reading Order

1. [`requirements.md`](./requirements.md) for the full functional and non-functional scope.
2. [`interviews.md`](./interviews.md) for the rationale behind major product, technical, and business decisions.
3. [`systemsdesign.md`](./systemsdesign.md) for the target architecture and system boundaries.
4. [`designstyleguide.md`](./designstyleguide.md) for the visual design system, color palette, typography, components, and UI patterns.
5. [`techstack.md`](./techstack.md) for locked technology choices, frameworks, and tooling across all layers.
6. [`production.md`](./production.md) for the deployment strategy, platform choices, and demo distribution plan.
7. [`prd.md`](./prd.md) for delivery planning, phased execution, and implementation backlog.

## Document Map

### [`requirements.md`](./requirements.md)

Primary purpose:

- defines the assignment scope,
- captures user, product, technical, and operational requirements,
- and sets MVP boundaries and success criteria.

Use this document when you need:

- product goals and target users,
- functional requirements,
- technical constraints,
- non-functional requirements,
- MVP inclusions and exclusions,
- or success criteria.

Key themes:

- mobile-first Haitian market fit,
- HTGN-denominated betting flow,
- Solana devnet settlement,
- offline-friendly behavior,
- Haitian Creole default with French support.

### [`interviews.md`](./interviews.md)

Primary purpose:

- records the reasoning behind the recommended choices,
- compares alternatives,
- and explains why certain product and architecture trade-offs are preferred.

Use this document when you need:

- decision rationale,
- architecture trade-offs,
- UX guidance,
- go-to-market positioning,
- or business and operational judgment.

Key themes:

- managed per-user wallets,
- backend relay and fee sponsorship,
- multi-RPC resilience,
- local caching and delta sync,
- optional blockchain transparency,
- reliability before growth.

### [`systemsdesign.md`](./systemsdesign.md)

Primary purpose:

- translates requirements into a concrete MVP architecture,
- defines service boundaries,
- and separates on-chain from off-chain responsibilities.

Use this document when you need:

- high-level architecture,
- service responsibilities,
- user flows,
- state machine design,
- data model guidance,
- Solana program scope,
- or failure-handling behavior.

Key themes:

- API gateway plus backend services,
- transaction relay and RPC provider pool,
- indexer/event processor,
- local-first mobile data strategy,
- compact on-chain state with richer off-chain history.

### [`designstyleguide.md`](./designstyleguide.md)

Primary purpose:

- defines the visual design system for all user-facing surfaces,
- locks the color palette, typography, component styles, and interaction patterns,
- and ensures brand consistency across mobile app and ops dashboard.

Use this document when you need:

- color tokens and palette,
- typography scale and font stack,
- button, card, and form component styles,
- icon and badge patterns,
- layout spacing and grid system,
- animation and transition rules,
- or the Nclusion logo specification.

Key themes:

- dark-mode-first fintech aesthetic,
- gold (#FFC600) accent system,
- system sans-serif font stack (no external fonts — performance),
- Tailwind CSS utility classes,
- consistent card, button, and pill patterns.

**Brand asset:** [`nclusion-logo.webp`](./nclusion-logo.webp) — gold circular ring icon with "nclusion" wordmark in white.

### [`techstack.md`](./techstack.md)

Primary purpose:

- locks all technology choices for the MVP,
- resolves Phase 0 architecture tickets (`ARCH-001` through `ARCH-005`),
- and defines the monorepo structure, frameworks, testing tools, and CI pipeline.

Use this document when you need:

- specific framework or library choices,
- monorepo layout and package boundaries,
- testing strategy and tooling,
- linting and formatting configuration,
- dependency versions,
- or HTGN demo token model.

Key themes:

- React Native bare + Hermes for low-end Android,
- Hono + Drizzle + PostgreSQL backend,
- Anchor for Solana program,
- Turborepo + pnpm monorepo,
- Vitest + bankrun + Maestro testing,
- Biome + clippy linting.

### [`production.md`](./production.md)

Primary purpose:

- defines the deployment and hosting strategy,
- selects platforms for each component,
- and documents the APK distribution and CI/CD pipeline.

Use this document when you need:

- deployment topology and platform choices,
- Docker build strategy,
- environment and secrets configuration,
- APK distribution workflow,
- CI/CD pipeline design,
- cost estimates,
- or scaling path.

Key themes:

- Railway for backend + PostgreSQL,
- Cloudflare Pages for ops dashboard,
- Firebase App Distribution for APK sharing,
- combined Hono server deployment,
- GitHub Actions CI/CD,
- ~$5-6/month total cost.

### [`prd.md`](./prd.md)

Primary purpose:

- turns the strategy and architecture into a delivery plan,
- defines phases,
- and provides an implementation-ready ticket backlog.

Use this document when you need:

- product framing,
- MVP vs production-ready scope,
- phased roadmap,
- delivery sequencing,
- acceptance criteria,
- or ticket-level planning.

Key themes:

- strong hiring-partner demo,
- clear MVP and non-goals,
- phased execution from discovery to production hardening,
- detailed backlog across mobile, backend, Solana, ops, QA, and security.

## Topic Index

### Wallet and Account Model

- Requirements baseline: [`requirements.md`](./requirements.md)
- Decision rationale: [`interviews.md`](./interviews.md)
- Architecture and service boundary: [`systemsdesign.md`](./systemsdesign.md)
- Delivery tickets and rollout: [`prd.md`](./prd.md)

Recommended position:

- managed per-user wallets with future export potential.

### Bet Placement and Transaction Flow

- Product requirement: [`requirements.md`](./requirements.md)
- Reliability rationale: [`interviews.md`](./interviews.md)
- End-to-end placement flow: [`systemsdesign.md`](./systemsdesign.md)
- Implementation plan: [`prd.md`](./prd.md)

Recommended position:

- backend relay, idempotency keys, deterministic bet IDs, and explicit lifecycle states.

### On-Chain vs Off-Chain Boundary

- Constraint framing: [`requirements.md`](./requirements.md)
- Trade-off rationale: [`interviews.md`](./interviews.md)
- Architecture definition: [`systemsdesign.md`](./systemsdesign.md)
- Product positioning: [`prd.md`](./prd.md)

Recommended position:

- keep escrow, canonical bet state, and settlement on-chain;
- keep odds, caching, indexing, UX state, and support views off-chain.

### Offline and Poor Connectivity

- User requirement: [`requirements.md`](./requirements.md)
- UX rationale: [`interviews.md`](./interviews.md)
- Offline flows and failure handling: [`systemsdesign.md`](./systemsdesign.md)
- demo hardening tasks: [`prd.md`](./prd.md)

Recommended position:

- cache aggressively, allow draft intents, revalidate before submission, and never show false finality.

### Balances, History, and Receipts

- Requirement definition: [`requirements.md`](./requirements.md)
- User-trust rationale: [`interviews.md`](./interviews.md)
- Balance/history/indexer model: [`systemsdesign.md`](./systemsdesign.md)
- delivery scope and tickets: [`prd.md`](./prd.md)

Recommended position:

- show `Available`, `In active bets`, and `Pending settlement`;
- keep advanced proof optional through receipts.

### Settlement and Result Integrity

- Requirement definition: [`requirements.md`](./requirements.md)
- rationale for provider cross-checking: [`interviews.md`](./interviews.md)
- settlement service design: [`systemsdesign.md`](./systemsdesign.md)
- backlog for settlement orchestration: [`prd.md`](./prd.md)

Recommended position:

- trusted result ingestion, secondary provider cross-check, and manual hold for disputed outcomes.

### Localization and Market Fit

- Market requirement: [`requirements.md`](./requirements.md)
- UX guidance: [`interviews.md`](./interviews.md)
- mobile design implications: [`systemsdesign.md`](./systemsdesign.md)
- delivery framing: [`prd.md`](./prd.md)

Recommended position:

- Haitian Creole by default, French secondary, and no partial localization.

### Operations, Support, and Trust

- Operational requirements: [`requirements.md`](./requirements.md)
- business rationale: [`interviews.md`](./interviews.md)
- ops dashboard and observability: [`systemsdesign.md`](./systemsdesign.md)
- support tooling backlog: [`prd.md`](./prd.md)

Recommended position:

- receipts, support tooling, dispute workflows, and operator visibility are core product infrastructure.

## Major Cross-Document Decisions

- Use Solana only for the trust-critical path, not as the primary UX surface.
- Optimize for Haitian mainstream mobile users, not crypto-native users.
- Favor a narrow World Cup-focused MVP over broad sportsbook coverage.
- Treat unreliable connectivity as a default operating condition.
- Prioritize reliability, clarity, and settlement correctness before growth loops.

## Open Questions Still Repeated Across Documents

- ~~What exact HTGN devnet model will be used for the demo?~~ **Resolved in [`techstack.md`](./techstack.md):** SPL Token on devnet, platform-controlled mint, 2 decimals.
- ~~Which odds and result providers should be selected for MVP quality and cost?~~ **Narrowed in [`techstack.md`](./techstack.md):** The Odds API or API-Football. Final selection during P0 after testing World Cup fixture coverage.
- What level of login and identity verification is expected for the assignment?
- How much operator tooling is required to look credible without overbuilding?
- ~~What is the exact boundary between a convincing demo and production readiness?~~ **Addressed in [`production.md`](./production.md):** demo deploys as a combined Railway server at ~$5/mo with a clear scaling path for production.

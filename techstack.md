# Tech Stack: Nclusion Sports Betting Platform

This document locks the technology choices for the MVP. It resolves the open Phase 0 tickets `ARCH-001` through `ARCH-005` and provides the concrete foundation for all implementation work.

Every choice is evaluated against the project's core constraints:

- low-end Android devices (Android 8+, 2GB RAM, 5-inch screens),
- intermittent 2G/3G connectivity with daily data budgets,
- solo/small team developer productivity,
- TDD-first workflow with fast feedback loops,
- monorepo with shared types across mobile, backend, and Solana client.

---

## Monorepo Structure

**Tool:** Turborepo + pnpm workspaces

```
nclusion/
├── apps/
│   ├── mobile/              # React Native bare — Android-first
│   └── gateway/             # Hono API gateway
├── services/
│   ├── betting/             # Betting orchestration
│   ├── balance/             # Balance views and reconciliation
│   ├── match-odds/          # Odds ingestion and caching
│   ├── relay/               # Transaction relay to Solana
│   ├── settlement/          # Result ingestion and settlement
│   └── history/             # Bet history and receipts
├── packages/
│   ├── shared-types/        # Zod schemas, TypeScript types, constants
│   ├── solana-client/       # Anchor IDL types + client wrapper
│   └── db/                  # Drizzle schemas, migrations, shared DB types
├── programs/
│   └── escrow/              # Anchor/Rust Solana program
├── turbo.json
├── pnpm-workspace.yaml
├── biome.json
└── .github/workflows/
```

**Why Turborepo:** smallest learning curve, content-hash build caching, clean pnpm workspace integration, and `turbo run --filter` for incremental CI. Nx is more powerful but overkill for this service count.

**Why pnpm:** fastest installs, strict `node_modules` (no phantom dependencies), content-addressable store avoids duplication across 10+ workspace packages, and `workspace:*` protocol for internal deps.

---

## Mobile Layer (`ARCH-001`)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | **React Native bare workflow** | Full native build control. Expo managed workflow bundles unused native modules, increasing APK size and memory on 2GB devices. Bare lets us strip to minimum. |
| JS engine | **Hermes** (default in RN 0.70+) | ~30% smaller APK, lower memory usage, faster startup. Non-negotiable for Android 8 / 2GB RAM. |
| Architecture | **New Architecture** (Fabric + TurboModules) | Default in RN 0.76+. TurboModules lazy-load native modules, reducing startup memory. |
| Navigation | **React Navigation v7** (`@react-navigation/native-stack`) | Native-backed stack uses less memory and animates at 60fps on low-end devices. No Expo Router dependency. |
| Local database | **op-sqlite** | Fastest SQLite binding for React Native via JSI (2-5x faster than expo-sqlite for bulk ops). WAL mode enables concurrent reads during background sync. |
| State management | **Zustand** | ~1KB bundle. Persist middleware serializes to SQLite. Selector pattern prevents unnecessary re-renders on constrained devices. |
| Localization | **Bundled locally** | Haitian Creole and French string bundles shipped in the APK. No network dependency for UI text. |

### Mobile constraints addressed

- Hermes + native-stack + Zustand selectors minimize memory pressure on 2GB devices.
- op-sqlite with WAL allows background sync while user browses cached matches.
- Bare workflow lets us control ProGuard/R8 shrinking to minimize APK size.
- No Expo runtime overhead.

---

## Backend Layer (`ARCH-002`)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | **Hono** | ~14KB core. TypeScript-first with excellent type inference. Each service is a standalone Hono app. Built-in Zod validation via `@hono/zod-validator`. |
| Runtime | **Node.js 20 LTS** | Stable for financial services. Bun is faster but ecosystem compatibility is not production-ready for money-handling. |
| Database | **PostgreSQL** | Concurrent reads/writes for multi-user betting. MVCC + row-level locking for balance atomicity. JSONB for flexible match/odds data. |
| ORM | **Drizzle** | TypeScript-native schemas (no codegen step). SQL-close query builder for financial queries. ~35KB runtime vs Prisma's ~15MB. `InferSelectModel` types flow to shared-types package. |
| API style | **REST + Hono RPC client** | Low bandwidth (no GraphQL query overhead). Offline-queueable (simple to serialize/replay failed requests from SQLite). Hono's `hono/client` gives end-to-end type safety without codegen. |
| Validation | **Zod** | Define once in `packages/shared-types`, validate on server and client. Schemas are the single source of truth. |

### Service boundaries

Each service runs as an independent Hono app behind the API gateway:

| Service | Responsibility |
|---------|---------------|
| **Gateway** | Single mobile-facing surface. Auth, rate limiting, idempotency handling, request shaping. |
| **Betting** | Accept intents, validate markets/stakes, reserve funds, coordinate relay, update bet state machine. |
| **Balance** | `available` / `reserved` / `pending_settlement` views. Shadow ledger with chain reconciliation. |
| **Match-Odds** | Odds provider ingestion, normalization, delta sync, TTL cache. |
| **Relay** | Transaction construction, fee sponsorship, RPC submission, retry, deduplication, confirmation tracking. |
| **Settlement** | Result ingestion, cross-provider check, settlement batch preparation, dispute hold. |
| **History** | Bet history, receipts, indexer integration, support views. |

### Why Hono over alternatives

- **vs Express:** Express is callback-based with no native async support. Middleware ecosystem is aging.
- **vs Fastify:** Good but heavier. Hono's built-in RPC client eliminates the need for a separate API client layer.
- **vs NestJS:** Decorator/DI system adds complexity without proportional benefit for this service count. Too heavy for microservices on a small team.

---

## Solana Program Layer (`ARCH-003`)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | **Anchor 0.30+** | Account validation macros eliminate entire classes of bugs (missing signer checks, ownership validation). Auto-discriminator checks prevent common exploits. Critical for escrow. |
| Testing | **cargo test + solana-bankrun** | bankrun (LiteSVM) runs programs in-process without `solana-test-validator`. Tests execute in ~100ms instead of ~5s. Use `solana-test-validator` only for full integration. |
| IDL | **Anchor IDL generation** | Emitted IDL imports into `packages/solana-client/` for fully typed TypeScript client calls. No manual type synchronization. |
| Client SDK | **@solana/web3.js v2 + @coral-xyz/anchor** | web3.js v2 is tree-shakeable and significantly smaller than v1. Anchor client auto-generates from IDL. Heavy SDK lives on backend relay; mobile only needs lightweight types. |

### Program scope (unchanged from systemsdesign.md)

Instructions: `initialize_market_escrow`, `place_bet`, `settle_market`, `cancel_market`, `release_funds`.

Account strategy: deterministic PDAs for market and bet records, market-level escrow pools, compact on-chain bet receipts, display-heavy metadata off-chain.

### Why Anchor over native

- **Security:** Automatic account validation catches the most common Solana exploits. For a financial escrow program, this is non-negotiable.
- **Productivity:** A solo/small team cannot afford the boilerplate of raw BPF programs.
- **Tradeoff:** Slightly larger program binary. Irrelevant on devnet; marginal on mainnet for an escrow program.

---

## Testing Strategy

| Layer | Tool | Speed | Purpose |
|-------|------|-------|---------|
| TypeScript unit/integration | **Vitest** | ~50ms per test | TDD red-green-refactor. Native ESM, no config. Watch mode with instant re-execution. |
| Hono API integration | **Vitest + `app.request()`** | ~10ms per test | Hono apps test without spinning up a server. Zero-overhead. |
| Solana program | **cargo test + bankrun** | ~100ms per test | In-process program execution. No validator startup. |
| Mobile E2E | **Maestro** | ~30s per flow | YAML-based. Runs against APK. No Detox native build flakiness. |
| Coverage | **vitest-coverage-v8** (TS), **cargo-tarpaulin** (Rust) | — | Enforce minimum coverage thresholds in CI. |

### TDD workflow support

- Vitest watch mode (`vitest --watch`) re-runs affected tests on save with HMR-based detection.
- bankrun's in-process execution makes Solana TDD practical — no waiting for validator spin-up.
- Maestro E2E tests are authored in YAML, decoupled from build tooling.

---

## Linting and Formatting

| Language | Tool | Notes |
|----------|------|-------|
| TypeScript | **Biome** | Replaces both ESLint and Prettier. Written in Rust, 10-50x faster. Single config across the monorepo. |
| Rust | **clippy + rustfmt** | `clippy::pedantic` for the escrow program. Standard for Rust projects. |

**Why Biome over ESLint + Prettier:** For a monorepo with 10+ packages, the speed difference is noticeable in CI and on-save. Biome's rule set covers the important rules for this stack (unused imports, formatting, TypeScript strictness). We don't need ESLint's plugin ecosystem.

---

## CI Pipeline

**Platform:** GitHub Actions

| Job | Trigger | Steps |
|-----|---------|-------|
| **Lint** | Every push/PR | `turbo run lint --filter=[HEAD^1]` (Biome for TS, clippy for Rust) |
| **Type check** | Every push/PR | `turbo run typecheck --filter=[HEAD^1]` |
| **Test (TS)** | Every push/PR | `turbo run test --filter=[HEAD^1]` (Vitest) |
| **Test (Solana)** | Every push/PR to `programs/**` | `cargo test` + bankrun |
| **Build** | Every push/PR | `turbo run build --filter=[HEAD^1]` |
| **E2E (mobile)** | Before merge to main | Maestro against debug APK on Android emulator |

### CI optimizations

- Turborepo `--filter=[HEAD^1]` builds/tests only changed packages.
- Turborepo remote cache skips unchanged builds across CI runs.
- bankrun tests avoid `solana-test-validator` startup overhead.
- Matrix jobs run TS and Rust tests in parallel.
- Target: incremental CI under 5 minutes.

---

## HTGN Demo Token Model (`ARCH-005`)

| Decision | Choice |
|----------|--------|
| Token standard | SPL Token on Solana devnet |
| Mint authority | Platform-controlled mint for demo |
| Decimals | 2 (matches HTG currency precision) |
| Faucet | Backend endpoint mints demo HTGN to managed wallets for testing |
| Production path | Replace demo mint with real HTGN token address; no code changes to escrow program |

---

## Odds and Result Providers (`ARCH-004`)

| Need | Recommendation | Notes |
|------|---------------|-------|
| Odds provider | **The Odds API** or **API-Football** | Both offer football fixtures with basic 1X2 odds. The Odds API has a generous free tier. API-Football has richer match data. Evaluate cost and World Cup coverage during P0. |
| Result provider | **Same provider** (primary) + **a second source** for cross-check | Settlement service ingests from primary, cross-checks against secondary. Manual hold if they disagree. |

Final provider selection should be confirmed during Phase 0 after testing API quality and World Cup fixture coverage.

---

## Dependency Summary

### Runtime dependencies (key packages)

| Package | Version | Layer |
|---------|---------|-------|
| react-native | 0.76+ | Mobile |
| react-navigation | 7.x | Mobile |
| op-sqlite | latest | Mobile |
| zustand | 5.x | Mobile |
| hono | 4.x | Backend |
| drizzle-orm | latest | Backend |
| zod | 3.x | Shared |
| @coral-xyz/anchor | 0.30+ | Solana |
| @solana/web3.js | 2.x | Solana client |

### Dev dependencies (key packages)

| Package | Version | Layer |
|---------|---------|-------|
| turborepo | latest | Monorepo |
| pnpm | 9.x | Package management |
| vitest | latest | TS testing |
| @biomejs/biome | latest | Linting/formatting |
| maestro | latest | Mobile E2E |
| solana-bankrun | latest | Solana testing |

---

## Open Items

These are not blockers for implementation but should be resolved during Phase 0:

- Confirm final odds provider after testing API-Football vs The Odds API against World Cup fixture availability.
- Decide on managed PostgreSQL provider (Neon, Supabase, Railway) for demo hosting.
- Decide on deployment target for backend services (Railway, Fly.io, or container-based).
- Confirm minimum React Native version that supports New Architecture stably on Android 8.

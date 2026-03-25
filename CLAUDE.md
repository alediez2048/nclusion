# Nclusion — Sports Betting Platform for Haiti

Mobile-first sports betting platform using HTGN stablecoins on Solana devnet. Blockchain is invisible to users.

## Non-Negotiable Constraints

- **On-chain:** escrow + settlement ONLY. **Off-chain:** odds, caching, UX state, support
- **Managed wallets** — no seed phrases, no self-custody in MVP
- **Backend relay** — mobile NEVER talks to Solana RPC directly
- **Fee sponsorship** — users never see or hold SOL
- **Idempotency keys** on all mutations + deterministic bet IDs on-chain
- **Haitian Creole** default, **French** secondary — no partial localization
- **Android 8+**, 2GB RAM, 200kbps baseline — every byte matters

## Tech Stack (Locked)

- Mobile: React Native bare, Hermes, op-sqlite, Zustand, React Navigation v7
- Backend: Hono, Node 20 LTS, PostgreSQL, Drizzle, Zod
- Solana: Anchor 0.30+, SPL Token, @solana/web3.js v2
- Testing: Vitest (TS), cargo test + bankrun (Rust), Maestro (E2E)
- Linting: Biome (TS), clippy + rustfmt (Rust)
- Monorepo: Turborepo + pnpm workspaces
- CI: GitHub Actions with Turborepo filtering

## Workflow Rules

- Every ticket starts with a primer (`ticket-primer-template.md` → `docs/primers/TICKET-ID-primer.md`)
- Every ticket ends with a DEVLOG entry (`docs/DEVLOG.md`)
- Trunk-based: `feature/TICKET-ID-description` branches, merge to `main`
- Conventional commits: `test:`, `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- TDD-first: tests before implementation, always
- Local pre-flight before any push: lint, typecheck, test, build (affected packages only)

## Skill Triggers

| Context | Skills to invoke |
|---|---|
| Any implementation task | `nclusion-tdd` + `nclusion-constraints` |
| Working in `programs/` or `packages/solana-client/` | `nclusion-solana` |
| Working in `apps/mobile/` | `nclusion-mobile` |
| Working in `apps/gateway/` or `services/` | `nclusion-backend` |
| Starting a ticket | `nclusion-ticket-workflow` |
| Finishing a ticket | `nclusion-branch-finish` |
| Before push or PR | `nclusion-ci-preflight` |
| Any git operation | `nclusion-git-workflow` |

## Project Docs

- `requirements.md` — scope, constraints, MVP boundaries
- `interviews.md` — trade-off rationale and architectural decisions (R#-Q# references)
- `systemsdesign.md` — service boundaries, state flows, data model
- `prd.md` — phase plan, ticket backlog, acceptance criteria
- `techstack.md` — locked technology choices
- `index.md` — cross-document navigation
- `docs/DEVLOG.md` — development log and ticket index

## Monorepo Structure

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
└── biome.json
```

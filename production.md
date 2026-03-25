# Production and Deployment: Nclusion Sports Betting Platform

This document defines the deployment strategy for making the platform publicly accessible for demo and testing. It prioritizes low cost, simplicity, and a polished evaluator experience.

---

## Deployment Principles

- Deploy the minimum number of units needed. Fewer deployments means simpler ops and lower cost.
- Keep the code structured as separate packages in the monorepo, but compose services into a single deployable where possible.
- Use Docker for reproducible builds. Platform auto-detection is unreliable with monorepos.
- Evaluators should be able to access the app within seconds, not wait for cold starts.
- Total monthly cost target: under $10.

---

## Platform Summary

| Component | Platform | Cost | Why |
|-----------|----------|------|-----|
| Backend API (gateway + all services) | **Railway** | ~$5/mo | Best monorepo support, automatic HTTPS, env vars, private networking |
| PostgreSQL | **Railway** (built-in) | Included | Co-located with backend, auto connection string injection |
| Ops dashboard | **Cloudflare Pages** | Free | Static SPA hosting, global CDN, unlimited requests |
| Android APK distribution | **Firebase App Distribution** | Free | Purpose-built for sharing pre-release APKs with testers |
| Solana program | **Solana devnet** | Free | Already planned, not a deployment concern |
| CI/CD | **GitHub Actions** | Free (2,000 min/mo) | Integrates with all platforms above |

---

## 1. Backend: Railway

### Why Railway

- Deploys directly from a GitHub monorepo. Point each service at a subdirectory or Dockerfile.
- Built-in environment variable and secrets management per service.
- Automatic HTTPS on all public endpoints.
- Services within a Railway project communicate over a private internal network.
- No cold starts on Hobby plan — services stay warm.
- $5/month credit covers demo-scale usage.

### Deployment topology: combined server

For the demo, all backend services deploy as a **single combined Node.js process** instead of 7 separate deployments.

Hono supports composing sub-apps natively:

```typescript
// apps/gateway/src/index.ts
import { Hono } from 'hono'
import { bettingApp } from '@nclusion/betting'
import { balanceApp } from '@nclusion/balance'
import { matchOddsApp } from '@nclusion/match-odds'
import { relayApp } from '@nclusion/relay'
import { settlementApp } from '@nclusion/settlement'
import { historyApp } from '@nclusion/history'

const app = new Hono()

// Auth middleware, rate limiting, idempotency handling
app.use('/*', authMiddleware)

// Mount services
app.route('/api/betting', bettingApp)
app.route('/api/balance', balanceApp)
app.route('/api/matches', matchOddsApp)
app.route('/api/relay', relayApp)
app.route('/api/settlement', settlementApp)
app.route('/api/history', historyApp)
```

**Why combined:**
- 1 deployment instead of 7. Lower cost, zero inter-service network latency, simpler ops.
- The code stays separated in the monorepo (clean architecture) — only the deployment is combined.
- At demo scale, a single Node.js process handles all traffic comfortably.

**When to split:** If the relay service needs different scaling or isolation (it talks to Solana RPC and may need independent retry queues), deploy it as a separate Railway service. This changes the total from 1 to 2 backend deployments.

### Docker build strategy

Use Turborepo's `turbo prune` to create minimal Docker contexts:

```dockerfile
# Dockerfile.api
FROM node:20-slim AS base
RUN corepack enable && corepack prepare pnpm@9 --activate

FROM base AS pruned
WORKDIR /app
COPY . .
RUN pnpm turbo prune @nclusion/gateway --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruned /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruned /app/out/full/ .
RUN pnpm turbo build --filter=@nclusion/gateway

FROM base AS runner
WORKDIR /app
COPY --from=installer /app/ .
EXPOSE 3000
CMD ["node", "apps/gateway/dist/index.js"]
```

This produces a small image containing only the gateway and its workspace dependencies.

### Railway configuration

```
Project: nclusion-demo
├── Service: api          (Dockerfile.api, public, port 3000)
├── Service: postgres     (Railway PostgreSQL plugin)
└── Variables:
    ├── DATABASE_URL      (auto-injected by Railway)
    ├── SOLANA_RPC_URL    (devnet endpoint)
    ├── HTGN_MINT         (demo token mint address)
    ├── RELAY_KEYPAIR     (platform signer, stored as secret)
    ├── ODDS_API_KEY      (provider key)
    └── NODE_ENV=production
```

### Database: Railway PostgreSQL

- One-click provisioning within the same Railway project.
- Connection string auto-injected as `DATABASE_URL` into the API service.
- Connection pooling: with a combined server approach, a standard pool size of 10-20 connections is sufficient. If services are split later, add PgBouncer or switch to Neon's built-in pooler.
- Backups: Railway provides automatic daily backups on paid plans.

---

## 2. Ops Dashboard: Cloudflare Pages

### Why Cloudflare Pages

- Free tier with unlimited requests and bandwidth.
- Global CDN with automatic HTTPS.
- Deploys directly from GitHub on push.
- Perfect for a static SPA (React, Vue, or Svelte) that calls the Railway-hosted API.

### Setup

```
Cloudflare Pages project: nclusion-ops
├── Build command: pnpm turbo build --filter=@nclusion/ops-dashboard
├── Build output: apps/ops-dashboard/dist
├── Environment variables:
│   └── VITE_API_URL=https://api.nclusion-demo.up.railway.app
└── Custom domain (optional): ops.nclusion-demo.com
```

The ops dashboard is a lightweight web UI that:
- authenticates as an operator,
- calls the same backend API (with operator-scoped endpoints),
- and renders bet lookups, settlement audits, and transaction traces.

---

## 3. Android APK: Firebase App Distribution

### Why Firebase App Distribution

- Purpose-built for sharing pre-release APKs.
- Evaluators receive an email with a direct install link.
- Supports tester groups, release notes, and version tracking.
- Free, no Play Store listing required.
- Better UX than a raw APK download link.

### Distribution flow

```
Developer pushes to main
  → GitHub Actions builds release APK
  → GitHub Actions uploads to Firebase App Distribution
  → Evaluators receive email notification
  → Evaluator taps link → installs APK
```

### GitHub Actions workflow (APK build + distribute)

```yaml
# .github/workflows/release-apk.yml
name: Build and Distribute APK

on:
  push:
    branches: [main]
    paths: ['apps/mobile/**', 'packages/shared-types/**']

jobs:
  build-and-distribute:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17

      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo build --filter=@nclusion/mobile

      - name: Build release APK
        working-directory: apps/mobile/android
        run: ./gradlew assembleRelease

      - name: Upload to Firebase App Distribution
        uses: wzieba/Firebase-Distribution-Github-Action@v1
        with:
          appId: ${{ secrets.FIREBASE_APP_ID }}
          serviceCredentialsFileContent: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          groups: evaluators
          file: apps/mobile/android/app/build/outputs/apk/release/app-release.apk
          releaseNotes: "Build ${{ github.sha }}"
```

### Evaluator setup

Evaluators need to:
1. Accept the Firebase App Distribution invite (email).
2. Install the Firebase App Tester app (or use the direct link).
3. Enable "Install from unknown sources" on their Android device.

Include these instructions in a one-page setup guide shared alongside the demo.

### Alternative: GitHub Releases

For simplicity, attach the APK as a GitHub Release artifact. Evaluators download directly from the release page. Less polished than Firebase but zero additional service setup.

---

## 4. Solana Program: Devnet

The Anchor program deploys to Solana devnet. No hosting platform needed.

```bash
anchor deploy --provider.cluster devnet
```

- Program ID is fixed and referenced in backend environment variables.
- HTGN demo token mint is created on devnet with platform-controlled mint authority.
- Devnet SOL for fee sponsorship is obtained from the Solana faucet.

---

## 5. CI/CD: GitHub Actions

### Pipeline overview

```
Push to feature branch:
  → Lint (Biome + clippy)
  → Type check
  → Test (Vitest + cargo test)
  → Build

PR merge to main:
  → All above
  → Deploy API to Railway (auto-deploy on main)
  → Deploy ops dashboard to Cloudflare Pages (auto-deploy on main)
  → Build and distribute APK via Firebase

Manual trigger:
  → Anchor deploy to devnet
```

### Railway auto-deploy

Railway watches the `main` branch and auto-deploys on push. No GitHub Actions step needed — Railway handles the Docker build and deployment internally.

### Cloudflare Pages auto-deploy

Similarly, Cloudflare Pages watches the repo and auto-deploys on push to `main`. Configure the build command and output directory in the Cloudflare dashboard.

### Result: push to main triggers all deployments automatically with zero manual steps.

---

## 6. Environment and Secrets

### Secret storage

| Secret | Where stored | Injected into |
|--------|-------------|---------------|
| `DATABASE_URL` | Railway (auto) | API service |
| `RELAY_KEYPAIR` | Railway env vars | API service |
| `ODDS_API_KEY` | Railway env vars | API service |
| `SOLANA_RPC_URL` | Railway env vars | API service |
| `HTGN_MINT` | Railway env vars | API service |
| `FIREBASE_APP_ID` | GitHub Secrets | CI (APK distribution) |
| `FIREBASE_SERVICE_ACCOUNT` | GitHub Secrets | CI (APK distribution) |
| `VITE_API_URL` | Cloudflare Pages env vars | Ops dashboard |

### Environment separation

| Environment | Backend | Database | Solana | Purpose |
|-------------|---------|----------|--------|---------|
| **Local dev** | `localhost:3000` | Local PostgreSQL (Docker) | Devnet | Development and TDD |
| **Preview** | Railway preview deployment (per PR) | Shared or ephemeral | Devnet | PR review |
| **Production** | Railway main deployment | Railway PostgreSQL | Devnet | Demo and evaluator access |

Railway supports preview deployments per PR. When a PR is opened, Railway deploys a temporary instance at a unique URL. This is useful for reviewing changes before merge.

---

## 7. Custom Domain (Optional)

For a more professional demo:

| Component | Domain | Provider |
|-----------|--------|----------|
| API | `api.nclusion-demo.com` | Railway custom domain |
| Ops dashboard | `ops.nclusion-demo.com` | Cloudflare Pages custom domain |
| Landing page | `nclusion-demo.com` | Cloudflare Pages (static) |

A simple landing page at the root domain can explain the project, link to the ops dashboard, and provide the APK download. This adds polish for evaluators.

---

## 8. Monitoring and Logs

| Need | Tool | Cost |
|------|------|------|
| Backend logs | **Railway built-in logs** | Included |
| Error tracking | **Sentry** (free tier: 5K events/mo) | Free |
| Uptime monitoring | **Better Uptime** or **UptimeRobot** (free tier) | Free |

Sentry integrates with Hono via `@sentry/node`. Add it to the gateway to catch unhandled errors across all services.

---

## 9. Scaling Path

The demo deployment is intentionally minimal. If the project moves toward a real pilot:

| Change | Action |
|--------|--------|
| Split services | Deploy relay, settlement as separate Railway services |
| Add connection pooling | Switch to Neon with built-in pooler, or add PgBouncer on Railway |
| Multi-region | Migrate to Fly.io for edge deployment |
| Production database | Upgrade to Railway Pro or Neon Pro for higher connection limits and replication |
| APK distribution | Publish to Google Play internal testing track |
| Infrastructure as code | Add Terraform or Pulumi for reproducible infra |

---

## Cost Summary

| Component | Platform | Monthly cost |
|-----------|----------|-------------|
| Backend API | Railway Hobby | ~$5 |
| PostgreSQL | Railway (included) | $0 |
| Ops dashboard | Cloudflare Pages Free | $0 |
| APK distribution | Firebase Free | $0 |
| CI/CD | GitHub Actions Free | $0 |
| Error tracking | Sentry Free | $0 |
| Domain (optional) | ~$10/year | ~$1 |
| **Total** | | **~$5–6/month** |

---

## Deployment Checklist

Before sharing with evaluators:

- [ ] Railway project created with API service and PostgreSQL
- [ ] Environment variables set in Railway
- [ ] Anchor program deployed to devnet
- [ ] HTGN demo token minted on devnet
- [ ] API health check passes at public Railway URL
- [ ] Ops dashboard deployed to Cloudflare Pages
- [ ] Firebase App Distribution project created
- [ ] GitHub Actions workflows configured (CI + APK distribution)
- [ ] Release APK built and distributed to evaluator group
- [ ] Evaluator setup instructions written (APK install, demo walkthrough)
- [ ] Custom domain configured (optional)
- [ ] Sentry error tracking enabled (optional)

# Nclusion Project Interviews

This document consolidates four interview rounds for the **Solana-Based Sports Betting Platform Using HTGN Stablecoins for the Haitian Market**.

The interviews are organized into:

1. Architectural and technical questions
2. Additional technical questions
3. Product and user experience questions
4. Business and go-to-market questions

---

## Round 1: Architecture and Technical Foundations

### 1. How should user wallets work if the user must not feel blockchain friction?
**Option A:** Fully self-custodial wallets with seed phrases and direct signing.

**Option B:** Fully custodial omnibus treasury with only an internal database per user.

**Option C:** Managed per-user wallets created behind the scenes, with server-side relay and an optional export path later.

**Best Answer: C**
It preserves on-chain user-level traceability, removes seed phrase friction, and still gives a future path to stronger user ownership without breaking onboarding.

### 2. How should transactions be submitted on weak 2G/3G connections?
**Option A:** The phone talks directly to Solana RPC and waits for confirmation.

**Option B:** The app sends a signed betting intent to a backend relay that handles retries, idempotency, and chain submission.

**Option C:** The app stores bets locally and posts them in batches much later with loose time guarantees.

**Best Answer: B**
A relay is the right resilience layer: it reduces mobile bandwidth, handles flaky connectivity, and gives you controlled retry semantics without violating on-chain placement.

### 3. What confirmation model should the UX use for bet placement?
**Option A:** Only show success after final chain confirmation.

**Option B:** Show `Queued` -> `Relayed` -> `Confirmed on-chain` -> `Settled`, with clear pending states.

**Option C:** Show “bet placed” immediately and reconcile failures silently later.

**Best Answer: B**
This is the most trustworthy model under intermittent connectivity because it never lies about finality while still feeling responsive.

### 4. How should the Solana program structure escrow accounts?
**Option A:** Create a separate escrow account for every single bet.

**Option B:** Use market-level escrow pools with compact per-bet receipt records and deterministic PDAs.

**Option C:** Keep bets off-chain and only periodically net settlement on-chain.

**Best Answer: B**
Per-bet accounts are too heavy; off-chain netting weakens trust. Market-level pools plus compact receipts give a scalable middle ground.

### 5. Where should live odds and match data live?
**Option A:** Push all odds updates on-chain.

**Option B:** Keep live odds off-chain in a backend cache; only final accepted odds and final settlement facts matter on-chain.

**Option C:** Let the mobile app call third-party odds APIs directly.

**Best Answer: B**
On-chain live odds are wasteful, and direct third-party mobile calls are data-expensive and brittle. Off-chain caching is the only data-parsimonious choice.

### 6. How should settlement results enter the system?
**Option A:** A human operator manually settles matches from an admin panel.

**Option B:** A backend settlement service ingests trusted match results, verifies them, and triggers authorized on-chain settlement.

**Option C:** A fully decentralized oracle network updates every match state on-chain in real time.

**Best Answer: B**
It is far simpler, cheaper, and more reliable for an MVP while still keeping the settlement action auditable on-chain.

### 7. Who should pay Solana transaction fees?
**Option A:** Users must hold SOL alongside HTGN.

**Option B:** The platform sponsors fees through a relayer/gasless transaction model.

**Option C:** Convert tiny amounts of HTGN to SOL on every action.

**Best Answer: B**
Requiring SOL destroys onboarding and trust. Gas abstraction is essential if the product is meant to feel invisible.

### 8. How should balances be represented in the app?
**Option A:** Query on-chain token balances fresh for every screen.

**Option B:** Show a locally cached “available balance,” backed by a backend shadow ledger that reflects reserved funds, pending bets, and chain reconciliation.

**Option C:** Use only an internal off-chain balance and ignore the chain until withdrawal.

**Best Answer: B**
Users need an always-available balance view even when offline, but the chain still needs to remain the source of truth for escrow and settlement.

### 9. What should happen if the user places a bet while offline or during a network drop?
**Option A:** Disable bet placement entirely unless the network is stable.

**Option B:** Let users build a bet slip and queue a signed intent with a short expiry; submit only when connectivity returns and revalidate odds before final acceptance.

**Option C:** Accept the bet permanently offline using the last known odds.

**Best Answer: B**
This is the only defensible model: it preserves UX continuity without creating false certainty or stale-price disputes.

### 10. How do you build user trust if most blockchain complexity is hidden?
**Option A:** Hide all blockchain details completely.

**Option B:** Keep the main UX simple, but provide an “advanced receipt” showing tx hash, accepted odds, stake, payout rules, and settlement proof.

**Option C:** Force users into explorer-style screens for every bet.

**Best Answer: B**
Trust comes from optional transparency, not mandatory complexity. Most users want confidence, not raw chain internals.

---

## Round 2: Additional Technical Questions

### 1. How should the system handle RPC connectivity in a country with unstable internet and high latency?
**Option A:** Mobile app connects to a single public Solana RPC endpoint.

**Option B:** Backend relay uses multiple RPC providers with health checks, failover, and confirmation quorum logic.

**Option C:** Run a full validator and force all traffic through it.

**Best Answer: B**
For this project, resilience matters more than ideological purity. A multi-RPC backend gives better uptime, controlled retries, and lower failure rates without the operational burden of running a validator.

### 2. How should user key recovery work if phones are lost, reset, or shared?
**Option A:** Seed phrase shown at signup; user is responsible for backup.

**Option B:** Platform-managed recovery using identity-bound account recovery and secure re-issuance of managed credentials.

**Option C:** No recovery; lost device means lost wallet access.

**Best Answer: B**
In this market, seed-phrase-first UX is too fragile. Recovery needs to feel like fintech, not crypto. Managed recovery is the best path for user trust and actual retention.

### 3. How should the system protect against duplicate bet submissions caused by retries and poor connectivity?
**Option A:** Accept duplicates and reverse them manually later.

**Option B:** Use idempotency keys at the API layer and deterministic bet identifiers in the Solana program.

**Option C:** Depend on the client to avoid resubmitting.

**Best Answer: B**
Weak networks guarantee retries. You need duplicate protection both off-chain and on-chain. This is one of the most important transaction-resilience controls in the whole design.

### 4. How should the app minimize mobile data use when showing matches and odds?
**Option A:** Fetch full market payloads every time the user opens a screen.

**Option B:** Use delta sync, compressed payloads, aggressive caching, and only transmit changed odds/markets.

**Option C:** Stream all updates over persistent WebSockets.

**Best Answer: B**
Delta sync is the right fit for 50MB/day budgets. Persistent sockets are fragile on 2G/3G, and full refreshes waste bandwidth.

### 5. How should match and bet data be stored locally on low-end Android devices?
**Option A:** Keep everything in memory and refetch often.

**Option B:** Use a compact local database with TTL-based cache layers, indexed bet history, and bounded storage quotas.

**Option C:** Store raw API responses directly in files.

**Best Answer: B**
Low-end devices need predictable storage and fast local reads. A compact local DB gives offline history, efficient queries, and tighter control over data growth.

### 6. How should the system deal with odds changes between intent creation and final on-chain placement?
**Option A:** Honor the old odds no matter what.

**Option B:** Revalidate against a user-defined slippage or acceptance window before submission; if outside tolerance, require reconfirmation.

**Option C:** Automatically place at the latest odds without telling the user.

**Best Answer: B**
This is the best balance between trust and resilience. The app can queue actions, but the user still needs protection against silent repricing.

### 7. How should the Solana program handle account size and rent costs as bet volume increases?
**Option A:** Store verbose metadata directly on-chain for each bet.

**Option B:** Keep on-chain records minimal and canonical; push display-heavy metadata to backend/indexer storage.

**Option C:** Create one giant account containing all bets.

**Best Answer: B**
On-chain data should be the minimum needed for verifiable settlement and auditability. Anything more hurts scalability and cost efficiency.

### 8. How should the platform manage oracle/result integrity when sports data providers disagree or lag?
**Option A:** Trust a single provider without checks.

**Option B:** Use a settlement pipeline with primary provider, secondary cross-check, and manual review only for disputed matches.

**Option C:** Wait for fully decentralized sports oracles before building.

**Best Answer: B**
For an MVP, this is the pragmatic path. It reduces false settlements and keeps the system operational without blocking on immature oracle infrastructure.

### 9. How should the team monitor failures when the frontend often works offline and the network is unreliable?
**Option A:** Log only server errors and ignore client-side conditions.

**Option B:** Use deferred telemetry: batch and upload compressed client events when connectivity returns, with privacy-safe error fingerprints.

**Option C:** Send every client event in real time.

**Best Answer: B**
Real-time telemetry is unrealistic in this environment. Deferred, compressed event upload gives you enough observability without wasting bandwidth.

### 10. How should program upgrade authority and governance be handled to maximize user trust?
**Option A:** Keep unrestricted upgrade authority with the engineering team indefinitely.

**Option B:** Use a controlled upgrade authority at launch, publish upgrade policy, time-box admin privileges, and move toward stricter governance after stabilization.

**Option C:** Renounce upgrade authority immediately before production use.

**Best Answer: B**
Immediate immutability is risky for a new betting system. But unlimited opaque control hurts trust. A staged governance model is the best compromise for safety and credibility.

### 11. How should fraud and abuse controls be implemented without degrading the low-bandwidth experience?
**Option A:** Force heavy KYC and device checks on every bet.

**Option B:** Apply lightweight risk scoring in the backend using device reputation, bet velocity, and anomaly detection, escalating only when needed.

**Option C:** Skip abuse controls until scale becomes a problem.

**Best Answer: B**
This keeps the primary flow fast while still protecting the platform. Heavy synchronous checks would be too expensive in both data and latency.

### 12. How should multilingual support work when connectivity is limited?
**Option A:** Translate every string dynamically from the server.

**Option B:** Bundle Haitian Creole and French UI strings locally, and use server-side translation only for variable conversation or support content.

**Option C:** Ship only one language at launch.

**Best Answer: B**
Core UI must work fully offline and with minimal network use. Localized bundles are mandatory; dynamic translation should be reserved for content that actually changes.

---

## Round 3: Product and User Experience

### 1. How should onboarding work for first-time users who may have never used crypto?
**Option A:** Ask users to create a wallet, save a seed phrase, and learn blockchain basics before entering the app.

**Option B:** Let users sign in with a phone number and immediately start using the product, while the wallet is created invisibly in the background.

**Option C:** Require a full tutorial on HTGN, Solana, gas fees, and settlement before access.

**Best Answer: B**
This is the right UX for this project. The product should feel like a normal betting app, not a crypto app. Invisible onboarding reduces abandonment and supports trust.

### 2. How should the app explain pending blockchain actions without overwhelming users?
**Option A:** Show technical terms like `signature`, `slot`, `blockhash`, and `finalized`.

**Option B:** Use simple statuses like `Sending`, `Processing`, `Confirmed`, and `Settled`, with an optional “View receipt” screen for details.

**Option C:** Hide all intermediate states and only show success or failure.

**Best Answer: B**
Users need clarity without jargon. Simple human-readable states build trust while still leaving room for advanced transparency.

### 3. How should the home screen prioritize information for low-bandwidth, low-attention users?
**Option A:** Show a dense sportsbook with many leagues, props, banners, and promotions.

**Option B:** Focus the home screen on a few high-interest matches, balance, open bets, and a compact “continue where you left off” section.

**Option C:** Make the first screen an educational dashboard about blockchain-powered betting.

**Best Answer: B**
This is the most efficient use of attention and data. Users need quick access to their balance, active bets, and relevant matches, not broad discovery.

### 4. How should the product communicate weak connectivity?
**Option A:** Show a generic error after requests fail.

**Option B:** Use explicit connection states like `Offline`, `Limited connection`, and `Synced`, with UI behavior that adjusts accordingly.

**Option C:** Never mention connectivity and hope retries resolve issues silently.

**Best Answer: B**
In this environment, network awareness is part of the product. Users need to understand what the app can and cannot do at any moment.

### 5. How should the app handle bet placement when odds move while the user is deciding?
**Option A:** Automatically replace the old odds with new ones and continue.

**Option B:** Clearly show when odds changed and ask the user to reconfirm if the payout changed meaningfully.

**Option C:** Keep the original displayed odds even if they are no longer valid.

**Best Answer: B**
This is the best balance of trust and usability. Silent repricing will feel deceptive; stale odds will create disputes.

### 6. How should the app present blockchain-backed trust to users who may not care about blockchain?
**Option A:** Make “Powered by Solana” the main hero message throughout the experience.

**Option B:** Lead with reliability and fairness, and expose blockchain proof only as an optional trust layer.

**Option C:** Never mention blockchain at all.

**Best Answer: B**
Users care first about whether the app is fair and whether they get paid. Blockchain should support trust, not dominate the narrative.

### 7. How should balance and funds availability be shown?
**Option A:** Show only one total balance number.

**Option B:** Separate `Available`, `In active bets`, and `Pending settlement` so users understand why funds are not spendable.

**Option C:** Hide any reserved or pending state until settlement completes.

**Best Answer: B**
Clear balance breakdowns reduce confusion and support trust, especially when connectivity or transaction confirmation is delayed.

### 8. How should the app design its notifications and alerts?
**Option A:** Send frequent promotional notifications for every odds change and match event.

**Option B:** Prioritize only high-value alerts: bet confirmed, match starting soon, bet settled, action needed, and sync issues.

**Option C:** Avoid notifications entirely to reduce complexity.

**Best Answer: B**
On low-end devices and limited data plans, notifications must be selective and useful. Spam will feel expensive and intrusive.

### 9. How should bet history be organized for users checking status under unreliable connectivity?
**Option A:** Use one long undifferentiated list of all bets.

**Option B:** Split history into `Open`, `Pending`, `Won`, `Lost`, and `Cancelled`, with offline caching for recent activity.

**Option C:** Only show settled bets because pending bets may be confusing.

**Best Answer: B**
Users need fast status recognition. Clear segmentation reduces support burden and makes offline viewing genuinely useful.

### 10. How should language support be handled in the product?
**Option A:** Use English as the default and allow switching later.

**Option B:** Default to Haitian Creole, support French as a secondary language, and keep terminology consistent across the whole app.

**Option C:** Translate only the most visible screens and leave system messages in English.

**Best Answer: B**
This is directly aligned with the assignment and market reality. Partial localization will undermine trust and comprehension.

### 11. How should the product build confidence for first-time bettors?
**Option A:** Assume users already understand odds and payouts.

**Option B:** Show simple payout previews, clear stake-to-win math, and short plain-language explanations before confirmation.

**Option C:** Add a large help center with long articles.

**Best Answer: B**
Inline clarity is better than documentation-heavy education. Users need confidence in the moment they place a bet.

### 12. How should the product approach responsible gambling UX?
**Option A:** Ignore it for MVP and focus only on growth.

**Option B:** Include session reminders, spend summaries, and optional betting limits in a lightweight way.

**Option C:** Require aggressive friction at every bet confirmation.

**Best Answer: B**
This is the strongest product choice. It shows maturity and responsibility without making the core flow unusable.

### 13. How should the confirmation screen be designed?
**Option A:** Keep it minimal: just a `Confirm` button.

**Option B:** Show stake, accepted odds, potential payout, wallet/balance impact, and status expectations after submission.

**Option C:** Show deep technical data like token accounts and transaction fee routing.

**Best Answer: B**
The confirmation step is where trust is either built or lost. The user needs a clear summary before money is committed.

### 14. How should the product handle failures after the user presses “Place Bet”?
**Option A:** Show a generic “Something went wrong.”

**Option B:** Explain whether the issue is due to connection, odds change, insufficient balance, or temporary chain delay, and tell the user exactly what happens next.

**Option C:** Immediately return the user to the match screen.

**Best Answer: B**
Recovery clarity matters as much as the failure itself. Ambiguous errors are especially damaging in a money product.

### 15. What should be the core product promise in the UX?
**Option A:** “The first decentralized sportsbook on Solana.”

**Option B:** “Fast, fair, and reliable betting with transparent payouts.”

**Option C:** “A cutting-edge blockchain app for sports fans.”

**Best Answer: B**
This is the right positioning for the user. It emphasizes the outcomes people care about, while blockchain remains an enabling mechanism.

---

## Round 4: Business and Go-to-Market

### 1. What should the initial wedge be for entering the Haitian market?
**Option A:** Launch as a full sportsbook across many leagues and bet types from day one.

**Option B:** Launch with a narrow World Cup-focused product centered on the highest-interest match outcomes.

**Option C:** Launch as a general crypto wallet first, then add betting later.

**Best Answer: B**
The World Cup is the clearest demand spike and gives you a focused acquisition story. Narrowing scope improves execution, lowers operational risk, and aligns directly with the assignment.

### 2. What should the core business value proposition be?
**Option A:** “The most decentralized betting platform.”

**Option B:** “A trustworthy, fast, mobile-first betting product with transparent payouts and local-language usability.”

**Option C:** “A crypto-native sportsbook for advanced Web3 users.”

**Best Answer: B**
This market will not convert on decentralization alone. Trust, speed, clarity, and usability are the real commercial differentiators.

### 3. How should the platform make money in the MVP?
**Option A:** Charge explicit per-bet transaction fees plus wallet fees plus spread.

**Option B:** Earn primarily through sportsbook margin/odds spread while abstracting most blockchain complexity and fees from the user.

**Option C:** Avoid monetization until scale.

**Best Answer: B**
Users should not feel multiple fee layers. A sportsbook-style margin is more familiar, easier to explain, and better for conversion.

### 4. How should the business handle the cost of on-chain transactions?
**Option A:** Require users to acquire SOL and pay fees directly.

**Option B:** Sponsor transaction fees and absorb them into platform economics.

**Option C:** Deduct a visible blockchain fee from each payout.

**Best Answer: B**
Gas abstraction is a business decision as much as a technical one. Requiring SOL creates onboarding friction, confusion, and lower retention.

### 5. What customer segment should the first product be optimized for?
**Option A:** Experienced crypto users in Haiti.

**Option B:** Mainstream mobile users already participating in informal sports gambling.

**Option C:** International bettors outside Haiti.

**Best Answer: B**
That is the clearest underserved audience described in the prompt. The product should convert existing betting behavior into a more reliable, structured channel.

### 6. How should the company think about compliance and licensing risk at the start?
**Option A:** Build first and defer legal review until after traction.

**Option B:** Treat legal and regulatory validation as a gating workstream, using local counsel and a clear operating model before launch.

**Option C:** Avoid all regulated considerations by calling the product “entertainment.”

**Best Answer: B**
This is non-negotiable. Betting, payments, and stablecoins create real regulatory exposure. A serious business plan has to treat this as core infrastructure, not cleanup work.

### 7. How should trust be built in a market used to informal betting channels?
**Option A:** Compete only on better odds.

**Option B:** Compete on payout reliability, visible receipts, local language support, and fast issue resolution.

**Option C:** Focus on a crypto prestige brand.

**Best Answer: B**
In emerging markets, trust is often the business moat. If users believe they will get paid fairly and can resolve disputes, they will return.

### 8. What should be the right operational model for handling disputes?
**Option A:** Push all disputes to the blockchain explorer and self-service documentation.

**Option B:** Offer a lightweight support workflow with bet receipts, clear status logs, and internal tooling for reconciliation and dispute handling.

**Option C:** Avoid disputes by limiting support options.

**Best Answer: B**
Money products always need operational recourse. Even if settlement is on-chain, users will judge the business by how disputes are handled.

### 9. What should the launch KPI strategy focus on?
**Option A:** Vanity growth metrics like installs and impressions.

**Option B:** Activation, first-bet completion, successful settlement rate, repeat betting rate, and support-driven trust metrics.

**Option C:** Token volume alone.

**Best Answer: B**
This product lives or dies on operational trust. The most important business metrics are conversion, settlement reliability, repeat usage, and resolution quality.

### 10. How should partnerships fit into the go-to-market strategy?
**Option A:** Build everything direct-to-consumer with no local partnerships.

**Option B:** Use local distribution and trust channels such as merchants, agents, telecom relationships, or existing HTGN ecosystem touchpoints where possible.

**Option C:** Focus only on global crypto communities.

**Best Answer: B**
Local trust and distribution matter more than crypto-native audience growth. Partnerships can reduce CAC and increase legitimacy.

### 11. How should the business think about liquidity and risk exposure?
**Option A:** Offer broad betting markets immediately and manage risk manually.

**Option B:** Start with tightly scoped markets, controlled bet limits, and conservative exposure rules while learning user behavior.

**Option C:** Let users bet any size to maximize early volume.

**Best Answer: B**
This is the disciplined business answer. Early-stage sportsbooks can get hurt badly by poor risk controls, especially around major events.

### 12. What should be the priority between growth and reliability in the first release?
**Option A:** Optimize aggressively for growth, promotions, and viral acquisition.

**Option B:** Optimize first for settlement correctness, payout trust, and stable core flows, then layer growth loops later.

**Option C:** Split effort equally across every function.

**Best Answer: B**
For this product, reliability is growth. If the core flow fails even a few times in a high-trust-fragile market, acquisition becomes much harder.

### 13. How should promotions and incentives be handled early on?
**Option A:** Use large bonus campaigns immediately to acquire users fast.

**Option B:** Use targeted, simple incentives tied to first-bet activation or retention, while keeping economics controlled.

**Option C:** Avoid incentives entirely.

**Best Answer: B**
You likely need some incentive support, but broad bonuses can distort behavior and hurt margin before the system is stable.

### 14. What should the product do if on-chain transparency conflicts with simplicity?
**Option A:** Maximize transparency even if UX gets more complex.

**Option B:** Keep the primary experience simple and expose transparency as proof when needed for support, disputes, and trust.

**Option C:** Hide everything to preserve speed.

**Best Answer: B**
This is also the right business answer. Simplicity helps adoption; optional proof helps retention and dispute resolution.

### 15. What is the strongest long-term business narrative for investors or hiring partners?
**Option A:** “We built a Solana betting dApp.”

**Option B:** “We built a high-resilience financial product that uses blockchain invisibly to create trust under extreme infrastructure constraints.”

**Option C:** “We built a generic sportsbook clone.”

**Best Answer: B**
That narrative is much stronger. It positions the company as solving a meaningful market problem with defensible infrastructure, not just shipping a crypto feature.

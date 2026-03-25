# Requirements: Solana-Based Sports Betting Platform Using HTGN Stablecoins for the Haitian Market

## Overview

This document captures the product, technical, and operational requirements for the **Solana-Based Sports Betting Platform Using HTGN Stablecoins for the Haitian Market**.

The goal is to deliver a mobile-first betting experience for Haitian users that:

- feels fast and understandable on unreliable 2G/3G connections,
- uses HTGN stablecoins for betting,
- settles bets transparently on Solana devnet,
- abstracts blockchain complexity from end users,
- and builds trust through clear status, receipts, and reliable payouts.

This document is oriented toward an MVP suitable for the Nclusion assignment.

---

## Product Goal

Build a **mobile-first, low-bandwidth sports betting platform** optimized for the Haitian market, centered on major football matches and especially the 2026 FIFA World Cup opportunity.

The product should allow users to:

- browse matches and odds,
- place bets using HTGN,
- track balances and bet status,
- receive fair and transparent settlement,
- and use the product without needing blockchain knowledge.

---

## Target Users

Primary target users:

- Haitian mobile users already familiar with informal sports gambling,
- users on low-end Android devices,
- users with limited data budgets,
- users with intermittent connectivity,
- users who prefer Haitian Creole, with French as a secondary language.

Secondary stakeholders:

- platform operators,
- support and operations teams,
- engineering and compliance reviewers,
- hiring partners evaluating architecture quality and execution maturity.

---

## Core Product Principles

- **Invisible blockchain:** users should not need to understand wallets, gas, or Solana terminology to use the app.
- **Trust over hype:** the product should emphasize fairness, receipts, payout clarity, and settlement integrity over crypto branding.
- **Resilience first:** degraded connectivity is normal, not exceptional.
- **Data parsimony:** every network interaction should be optimized for low bandwidth.
- **Android-first:** the MVP should be designed for low-end Android hardware before considering iOS.

---

## Functional Requirements

### 1. Match Browsing

Users must be able to:

- view upcoming matches,
- view live or recent match state when available,
- view current betting odds for basic match outcomes,
- browse cached match data while offline or under poor connectivity.

Requirements:

- odds and match data must come from a real sports data or betting odds source,
- the system should prioritize a limited set of high-interest matches for the MVP,
- the mobile app should cache match lists and recent details locally.

### 2. Bet Placement

Users must be able to:

- select a match outcome market,
- enter a stake amount in HTGN,
- review stake, odds, and potential payout,
- submit the bet through a low-friction mobile flow.

Requirements:

- bets must be represented on-chain on Solana devnet,
- the system must support at minimum single bets on win/draw/loss markets,
- the product must handle the state flow from intent to submission to confirmation to settlement,
- the system must protect against duplicate submissions.

### 3. Balance Integration

Users must be able to:

- see their available HTGN balance,
- see funds reserved in active bets,
- see funds pending settlement,
- see winnings credited after successful settlement.

Requirements:

- balances should remain visible even during poor connectivity using cached state,
- the UX should clearly separate available funds from locked or pending funds,
- the backend should maintain a reconciled shadow view for responsive UX while preserving on-chain truth for escrow and settlement.

### 4. Bet History and Tracking

Users must be able to:

- view open bets,
- view pending bets,
- view won, lost, and cancelled bets,
- inspect a receipt for each bet.

Requirements:

- bet history must be available offline from local cache,
- each receipt should include stake, accepted odds, potential payout, and status,
- advanced users should be able to access transaction and settlement proof.

### 5. Settlement

The system must:

- ingest match results from a trusted sports data source,
- verify and process settlement logic,
- settle winning and losing bets on-chain,
- credit winnings correctly after settlement.

Requirements:

- settlement must be auditable,
- result ingestion should support provider cross-checking,
- disputed or ambiguous results should be held for manual review rather than settled incorrectly.

### 6. Blockchain Abstraction

The product must:

- shield users from wallet creation friction,
- abstract gas fees,
- avoid exposing raw blockchain concepts in the main UX,
- provide optional transparency for trust and support workflows.

Requirements:

- managed wallets are acceptable for the MVP,
- the platform should sponsor transaction fees,
- blockchain details should appear only in optional receipt or support views.

### 7. Offline and Poor-Connectivity Behavior

The app must degrade gracefully.

At minimum:

- cached matches remain viewable,
- cached bet history remains viewable,
- balances remain visible from the latest known state,
- users can prepare a bet intent under weak connectivity,
- the app gives clear status when a bet is queued, pending, confirmed, or failed.

Requirements:

- no silent failure states,
- no misleading “success” messaging before actual confirmation,
- odds must be revalidated before final placement if a queued bet is submitted later.

### 8. Localization

The app must support:

- Haitian Creole as the default language,
- French as a secondary language.

Requirements:

- core UI strings must be bundled locally,
- system messages, confirmations, and error handling must also be localized,
- terminology must remain consistent across the app.

---

## Technical Requirements

### Frontend

- TypeScript-based mobile application
- Android-first experience
- support for Android 8+ and low-end devices
- optimized for 2GB RAM and small screens
- local caching for matches, balances, and bet history
- compact payload handling and low-data refresh behavior

### Backend

- TypeScript-based backend services
- relay service for transaction submission and retry logic
- odds and sports data ingestion service
- settlement orchestration service
- balance reconciliation and receipt service
- support tooling for dispute investigation and operational review

### Blockchain

- Solana devnet deployment
- Rust-based Solana program
- HTGN-denominated betting flow
- escrow and settlement logic implemented on-chain
- deterministic identifiers and replay-safe transaction handling

---

## Non-Functional Requirements

### 1. Transaction Resilience

The system must:

- tolerate unstable networks,
- support retries safely,
- avoid duplicate bet execution,
- preserve clear user-visible status throughout the lifecycle.

### 2. Data Efficiency

The mobile app must:

- minimize payload sizes,
- avoid wasteful polling patterns,
- use caching and delta-based refresh strategies where possible,
- function within severe daily data constraints.

### 3. Performance

The experience should:

- feel responsive on a 200kbps connection,
- remain usable under 300ms+ latency,
- avoid blocking the main flow on expensive network operations.

### 4. Reliability

The platform must:

- handle RPC or provider instability with backend failover,
- preserve state during intermittent disconnections,
- recover cleanly from app restarts or dropped sessions.

### 5. Trust and Transparency

The product must:

- clearly communicate bet state,
- provide user-readable receipts,
- provide support-friendly audit trails,
- expose blockchain proof when needed without making it mandatory.

### 6. Security

The system must:

- protect managed credentials and signing flows,
- secure transaction relay paths,
- prevent replay and duplicate submissions,
- restrict settlement authority appropriately,
- define a clear upgrade and governance model for the Solana program.

---

## MVP Scope

The MVP should include:

- Android-first mobile app,
- Haitian Creole and French UI,
- World Cup or high-interest football match browsing,
- single bets on basic outcomes,
- HTGN balance display,
- on-chain bet placement on Solana devnet,
- automated settlement,
- offline-friendly cached views,
- clear status and receipt flows.

The MVP should exclude or defer:

- iOS support,
- advanced bet types such as parlays or props,
- broad multi-sport coverage,
- full self-custodial wallet UX,
- complex decentralized oracle infrastructure,
- aggressive promotional systems,
- production-scale compliance expansion beyond the assignment demo scope.

---

## Operational Requirements

- Operators must be able to inspect bet records and settlement outcomes.
- Support teams must be able to review receipts and transaction status for disputes.
- The system must support manual review for disputed result feeds.
- Metrics should track activation, first bet completion, settlement success, repeat usage, and failure modes.

---

## Success Criteria

The project should be considered successful if it demonstrates:

- a credible low-bandwidth mobile UX,
- a coherent invisible-blockchain betting experience,
- reliable HTGN-denominated on-chain settlement on Solana devnet,
- strong trust mechanics through status clarity and receipts,
- thoughtful adaptation to Haitian infrastructure constraints,
- and clear business and product judgment in scoping the MVP.

---

## Recommended Architectural Direction

Based on the interview analysis, the MVP should adopt the following approach:

- managed per-user wallets with future export potential,
- backend transaction relay with retries and idempotency,
- platform-sponsored fees,
- off-chain odds ingestion and caching,
- on-chain escrow and settlement only for the trust-critical path,
- local-first mobile caching and offline history,
- optional advanced receipts for blockchain transparency,
- and a narrow, World Cup-focused product scope.

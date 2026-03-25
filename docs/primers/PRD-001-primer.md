# PRD-001 Primer: Define MVP scope and non-goals for assignment submission

**For:** New session
**Project:** Nclusion — Solana-Based Sports Betting Platform Using HTGN Stablecoins for the Haitian Market
**Date:** Mar 24, 2026
**Previous work:** ARCH-001 through ARCH-003, ARCH-005 complete. See `docs/DEVLOG.md`.

---

## What Is This Ticket?

This ticket formally locks the MVP scope boundary for the Nclusion assignment demo. While `requirements.md` and `prd.md` already outline scope extensively, this ticket consolidates them into a single authoritative scope document that every subsequent ticket can reference as the source of truth for "is this in or out?"

### Why It Matters

- Every Phase 1+ ticket needs a clear "in scope" / "out of scope" reference
- Prevents scope creep during implementation
- Gives evaluators a crisp summary of what the demo covers and why

---

## What Was Already Done

- `requirements.md` — MVP Scope section defines inclusions and exclusions
- `prd.md` — Sections 5 (Non-Goals), 10 (MVP Scope), 19 (Acceptance Criteria)
- `techstack.md` — Locked all technology decisions
- `production.md` — Locked deployment strategy
- ARCH-001 through ARCH-005 — Technology choices resolved

---

## What This Ticket Must Accomplish

### Goal

Produce a single-page MVP scope document that serves as the authoritative reference for what is in and out of the demo.

### Deliverables Checklist

#### A. Scope Document (`docs/mvp-scope.md`)

- [ ] One-paragraph product summary
- [ ] Explicit "In Scope" list with specific features
- [ ] Explicit "Out of Scope" list with rationale for each exclusion
- [ ] Demo acceptance criteria (consolidated from prd.md Section 19)
- [ ] Target user definition
- [ ] Key constraints summary (device, connectivity, language)

#### B. Documentation Updates

- [ ] Add `docs/mvp-scope.md` to `index.md` document map
- [ ] Cross-reference from `prd.md` Section 10

#### C. No Tests Required

- This is a documentation-only ticket

---

## Files to Create

| File | Why |
|------|-----|
| `docs/mvp-scope.md` | Authoritative MVP scope reference |

## Files to Modify

| File | Action |
|------|--------|
| `index.md` | Add mvp-scope.md to document map |
| `docs/DEVLOG.md` | Add ticket entry |

## Files to READ for Context

| File | Why |
|------|-----|
| `requirements.md` | MVP Scope section |
| `prd.md` | Sections 5, 10, 19 |
| `techstack.md` | Locked tech decisions |
| `production.md` | Deployment constraints |

---

## Definition of Done

- [x] `docs/mvp-scope.md` created with in-scope, out-of-scope, and acceptance criteria
- [ ] `index.md` updated
- [ ] DEVLOG updated
- [ ] Feature branch pushed

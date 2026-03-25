# ARCH-001: Choose mobile stack and local storage strategy

**Phase:** 0 — Discovery and Scope Lock
**Status:** ✅ Complete
**Priority:** High

## Description

Select the mobile framework, local database, state management, and navigation library for the Android-first TypeScript app.

## Decision

Resolved in `techstack.md`:

- **Framework:** React Native bare workflow with Hermes engine
- **Local DB:** op-sqlite (JSI-based, WAL mode)
- **State management:** Zustand with SQLite persistence
- **Navigation:** React Navigation v7 with native-stack
- **Linting:** Biome
- **Testing:** Vitest (unit), Maestro (E2E)

## References

- `techstack.md` — Mobile Layer section
- `interviews.md` — R2-Q4, R2-Q5

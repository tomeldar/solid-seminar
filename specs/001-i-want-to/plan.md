# Implementation Plan: SOLID Principles Crash Course Seminar

**Branch**: `001-i-want-to` | **Date**: 2025-09-13 | **Spec**: `/home/tomel/repos/solid-seminar/specs/001-i-want-to/spec.md`

**Input**: Feature specification from `/home/tomel/repos/solid-seminar/specs/001-i-want-to/spec.md`

## Execution Flow (/plan command scope)

```text
1. Load feature spec from Input path ✅
2. Fill Technical Context (scan for NEEDS CLARIFICATION) ✅
3. Evaluate Constitution Check section below ✅ (initial pass; no blocking violations)
4. Execute Phase 0 → research.md ✅
5. Execute Phase 1 → contracts, data-model.md, quickstart.md ✅ (agent file deferred until tasks stage if needed)
6. Re-evaluate Constitution Check section ✅ (post-design pass)
7. Plan Phase 2 → Describe task generation approach ✅ (no tasks.md yet)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: /plan stops before generating `tasks.md` (Phase 2 execution deferred).

## Summary

The feature delivers an educational NestJS + TypeScript crash course centered on the SOLID principles. It provides six modules (five principles plus a final integration) with exercises, optional Vitest-based validation, rubric-based fallbacks, and a capstone implementing a minimal hexagonal architecture with a NestJS service layer, PostgreSQL persistence, and a basic reusable client scaffold. Emphasis: pedagogical clarity, demonstration of SOLID via ports/adapters (dependency inversion), minimal surface area to avoid overwhelming participants. Research resolved open items (test command naming, DB access strategy, folder structure, participant progress tracking scope). ORM complexity is intentionally avoided; raw SQL via a thin data-access adapter is chosen to better illustrate DIP and SRP.

## Technical Context

**Language/Version**: TypeScript (latest) on Node.js 22 (pnpm managed)  
**Primary Dependencies**: NestJS (core, common, testing), node-postgres (pg), class-validator, Vitest, ts-node / ts-node-dev, dotenv  
**Storage**: PostgreSQL (Docker container: single instance used only in final integration module)  
**Testing**: Vitest (unit, integration, contract). Contract tests assert API surface & data abstractions. Integration tests spin up Nest application + real Postgres container.  
**Target Platform**: Local developer machines (Linux/macOS/Windows) with Docker. CI optional future.  
**Project Type**: Hybrid educational backend with minimal client scaffold (treated as single repository; backend-focused). Chosen structure: Modified Option 1 with `modules/` and `final-integration/` plus `client/` minimal reusable scripts.  
**Performance Goals**: Not performance critical; responsiveness < 500ms local for CRUD endpoints (informational only).  
**Constraints**: Keep implementation approachable; avoid heavy architectural patterns beyond hexagonal ports/adapters; minimize external libraries; tests must fail first.  
**Scale/Scope**: Classroom/workshop (6–20 participants). Repository size small (< 3k LOC excluding generated files). DB dataset trivial.

## Constitution Check

**Simplicity**:

- Projects: 2 logical areas (training modules + final integration) within single repo (<=3 ✅)
- Using framework directly? Yes (NestJS modules directly; no redundant wrappers ✅)
- Single data model? Workshop entities kept minimal; no unnecessary DTO proliferation ✅
- Avoiding unnecessary patterns? Yes (No Repository pattern beyond simple adapter interface; justification: educational clarity)

**Architecture**:

- Every feature as library? Educational modules share core utilities in `/src/shared`; acceptable given scope ✅
- Libraries listed: `core-education` (exercise scaffolds), `final-app` (integration example) — both within monorepo style but not separate packages (kept simple)
- CLI per library: Not required for workshop scope (justified; would add cognitive overhead). Documented in Complexity Tracking if later added.
- Library docs: quickstart.md produced ✅

**Testing (NON-NEGOTIABLE)**:

- RED-GREEN-Refactor enforced via instructions in quickstart ✅
- Commit guidance to be added in tasks phase
- Order: Contract→Integration→Unit emphasized in quickstart ✅
- Real dependencies: Postgres used in integration stage ✅
- Integration tests: final integration + contract tests for endpoints planned ✅
- FORBIDDEN violations: None planned

**Observability**:

- Structured logging: Recommend Nest logger + minimal context (module, principle) — logged requirement in quickstart ✅
- Unified stream: Not necessary (single service) ✅
- Error context: Standard Nest exception filters suffice (educational scope)

**Versioning**:

- Versioning not critical for educational repo; semantic version placeholder in README planned. Marked as acceptable simplification.

## Project Structure

### Documentation (this feature)

```text
specs/001-i-want-to/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── README.md
│   ├── openapi-fragment.yaml
│   └── endpoints.md
└── (tasks.md to be generated later)
```

### Source Code (planned root)

```text
modules/
  single-responsibility/
    exercise/
    solution/
  open-closed/
  liskov/
  interface-segregation/
  dependency-inversion/
final-integration/
  src/
    app.module.ts
    domain/        # entities + ports
    application/   # use-cases (services)
    infrastructure/# adapters (db, auth)
    interface/     # controllers (Nest)
client/
  http-client.ts   # reusable fetch wrapper / sample usage scripts
src/shared/
  testing/
  utils/

tests/
  contract/
  integration/
  unit/
```

**Structure Decision**: Customized Option 1 (single project) with explicit `modules/` for principle exercises and `final-integration/` for capstone. Avoid splitting into separate packages to maintain simplicity.

## Phase 0: Outline & Research

Resolved unknowns and documented decisions in `research.md`.  
Key research topics: test command naming, DB access approach (ORM vs raw), folder naming, participant tracking scope, client scaffold extent, integration theme specifics, logging approach, container orchestration.  
All prior NEEDS CLARIFICATION items addressed with decisions or explicit defer notes.

## Phase 1: Design & Contracts

Artifacts produced:

- `data-model.md`: Defines educational meta-entities + capstone domain entities (User, Note, Role, Permission) and progress tracking outline.
- `contracts/`: Endpoint definitions for capstone CRUD + authorization check.
- `quickstart.md`: Environment setup, workflow (RED-GREEN-Refactor), commands (`pnpm test`, `pnpm test:module <name>`, `pnpm start:final`), Docker usage.
- Contract test strategy documented (tests to be generated in tasks phase).

## Phase 2: Task Planning Approach

(The /tasks command will implement.)

- Derive tasks from: endpoints (contract tests), entities (model & ports), exercises (starter/solution scaffolds), progress tracker, integration tests, rubric authoring, client script.
- Ordering: 1) Contract tests → 2) Data model & ports → 3) Adapters (DB) → 4) Use-cases → 5) Controllers → 6) Integration tests → 7) Exercise scaffolds & solutions → 8) Rubrics & README augmentation.
- Parallelizable ([P]): Independent module scaffolds, rubric authoring, client script, anti-pattern examples once baseline utilities exist.
- Expect ~28–32 tasks.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| Minimal hexagonal layering | Teach DIP and separation clearly | Collapsing layers would undercut SOLID demonstration |
| Raw SQL adapter (pg) vs ORM | Transparency & focus on DIP over ORM abstractions | ORM introduces hidden magic & learning overhead |

## Progress Tracking

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (approach described)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---

Based on Constitution v2.1.1 (placeholder in current repo — recommendations applied pragmatically)

# Tasks: SOLID Principles Crash Course Seminar

**Input**: Design documents from `/home/tomel/repos/solid-seminar/specs/001-i-want-to/`
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)

```text
1. Loaded plan, data-model, contracts, research, quickstart
2. Extracted entities, endpoints, decisions
3. Generated setup, test-first, core, integration, polish tasks
4. Ensured tests precede implementation (TDD)
5. Marked parallel-safe tasks [P]
6. Numbered sequentially
7. Added dependency notes & parallel example
8. Validation checklist added
```

## Format: `[ID] [P?] Description`

[P] = Task can run in parallel (different file, no dependency conflict)

## Phase 3.1: Setup

- [ ] T001 Initialize root config: create `tsconfig.json`, `vitest.config.ts`, base `package.json` scripts (test, test:module, test:integration, start:final) (root)
- [ ] T002 Add NestJS + dependencies: install `@nestjs/common @nestjs/core @nestjs/testing reflect-metadata pg class-validator class-transformer dotenv` and dev deps `@types/node ts-node ts-node-dev vitest @vitest/coverage-v8` (root)
- [ ] T003 Create base folder structure: `modules/{single-responsibility,open-closed,liskov,interface-segregation,dependency-inversion}/{exercise,solution}` and `final-integration/src/{domain,application,infrastructure,interface}` plus `client/` and `tests/{contract,integration,unit}` (root)
- [ ] T004 [P] Add initial README section for prerequisites & workshop overview (root/README.md)
- [ ] T005 [P] Add Docker compose or single script for Postgres: create `docker/postgres.md` and optional `scripts/run-postgres.sh`
- [ ] T006 Define environment sample `.env.example` with `DATABASE_URL=postgres://solid:solid@localhost:5432/solid`

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

Contract Tests (from contracts and endpoints):

- [ ] T007 [P] Contract test: POST /users (file: `tests/contract/users.post.spec.ts`) – assert 201, body schema, 400 invalid
- [ ] T008 [P] Contract test: GET /users/:id (file: `tests/contract/users.get.spec.ts`) – assert 200, 404
- [ ] T009 [P] Contract test: POST /notes (file: `tests/contract/notes.post.spec.ts`) – assert 201, 400 invalid, 404 unknown author
- [ ] T010 [P] Contract test: GET /notes (file: `tests/contract/notes.list.spec.ts`) – assert 200 array
- [ ] T011 [P] Contract test: GET /notes/:id (file: `tests/contract/notes.get.spec.ts`) – 200, 404, 403 (unauthorized access scenario placeholder)
- [ ] T012 [P] Contract test: PATCH /notes/:id (file: `tests/contract/notes.patch.spec.ts`) – 200 success, 404, 403
- [ ] T013 [P] Contract test: DELETE /notes/:id (file: `tests/contract/notes.delete.spec.ts`) – 204, 404, 403

Integration Tests (user stories & flows):

- [ ] T014 [P] Integration test: user lifecycle (create + fetch) (`tests/integration/user.lifecycle.spec.ts`)
- [ ] T015 [P] Integration test: note CRUD by author (`tests/integration/note.crud.author.spec.ts`)
- [ ] T016 [P] Integration test: authorization enforcement (different roles) (`tests/integration/note.authz.spec.ts`)
- [ ] T017 [P] Integration test: list visibility filter (`tests/integration/note.visibility.spec.ts`)

Exercise Tests (principle modules – scaffolds):

- [ ] T018 [P] SRP exercise failing test scaffold (`modules/single-responsibility/exercise/srp.spec.ts`) – illustrate multi-responsibility smell
- [ ] T019 [P] OCP exercise failing test scaffold (`modules/open-closed/exercise/ocp.spec.ts`) – adding new behavior must not modify core class
- [ ] T020 [P] LSP exercise failing test scaffold (`modules/liskov/exercise/lsp.spec.ts`) – subtype contract violation scenario
- [ ] T021 [P] ISP exercise failing test scaffold (`modules/interface-segregation/exercise/isp.spec.ts`) – oversized interface smell
- [ ] T022 [P] DIP exercise failing test scaffold (`modules/dependency-inversion/exercise/dip.spec.ts`) – high-level module depends on abstraction

Rubric Placeholders (principle evaluation templates – mandatory):

- [ ] T023 [P] Create rubric template `modules/open-closed/rubric.md`
- [ ] T024 [P] Create rubric template `modules/liskov/rubric.md`
- [ ] T073 [P] Create rubric template `modules/single-responsibility/rubric.md`
- [ ] T074 [P] Create rubric template `modules/interface-segregation/rubric.md`
- [ ] T075 [P] Create rubric template `modules/dependency-inversion/rubric.md`

## Phase 3.3: Core Implementation (ONLY after tests above exist & fail)

Models / Ports:

- [ ] T025 [P] Define `final-integration/src/domain/entities/user.ts` (User interface/type)
- [ ] T026 [P] Define `final-integration/src/domain/entities/note.ts` (Note interface/type)
- [ ] T027 [P] Define role enum & permission helpers `final-integration/src/domain/security/roles.ts`
- [ ] T028 [P] Define ports: `final-integration/src/domain/ports/note-repository.port.ts`
- [ ] T029 [P] Define ports: `final-integration/src/domain/ports/user-repository.port.ts`
- [ ] T030 [P] Define ports: `final-integration/src/domain/ports/authorization.port.ts`

Repositories & Adapters (initial skeletons only – returning TODO errors so tests still RED):

- [ ] T031 Create PG pool & config `final-integration/src/infrastructure/persistence/pg.datasource.ts`
- [ ] T032 Implement skeleton `final-integration/src/infrastructure/persistence/pg-user.repository.ts` (methods throw NOT_IMPLEMENTED)
- [ ] T033 Implement skeleton `final-integration/src/infrastructure/persistence/pg-note.repository.ts` (methods throw NOT_IMPLEMENTED)

Authorization & Services:

- [ ] T034 Implement skeleton `final-integration/src/application/services/authorization.service.ts` (methods return false/TODO)
- [ ] T035 Implement skeleton `final-integration/src/application/services/create-note.service.ts`
- [ ] T036 Implement skeleton `final-integration/src/application/services/update-note.service.ts`
- [ ] T037 Implement skeleton `final-integration/src/application/services/list-notes.service.ts`
- [ ] T038 Implement skeleton `final-integration/src/application/services/delete-note.service.ts`

Nest Module & Controllers (controllers initially call skeleton services):

- [ ] T039 Create `final-integration/src/interface/dto/create-user.dto.ts` & `create-note.dto.ts`
- [ ] T040 Create `final-integration/src/interface/controllers/users.controller.ts` (endpoints map to service calls placeholders)
- [ ] T041 Create `final-integration/src/interface/controllers/notes.controller.ts`
- [ ] T042 Wire root `final-integration/src/app.module.ts` to register controllers & providers (useValue placeholders)
- [ ] T043 Create bootstrap file `final-integration/src/main.ts` (NestFactory start) & script `pnpm start:final`

Exercise Implementations (starter code still failing tests until refactor):

- [ ] T044 Add SRP exercise starter code `modules/single-responsibility/exercise/example.ts`
- [ ] T045 Add OCP exercise starter code `modules/open-closed/exercise/example.ts`
- [ ] T046 Add LSP exercise starter code `modules/liskov/exercise/example.ts`
- [ ] T047 Add ISP exercise starter code `modules/interface-segregation/exercise/example.ts`
- [ ] T048 Add DIP exercise starter code `modules/dependency-inversion/exercise/example.ts`

## Phase 3.4: Integration (Turn tests GREEN iteratively)

- [ ] T049 Implement PG user repository (methods real queries) (`pg-user.repository.ts`)
- [ ] T050 Implement PG note repository (`pg-note.repository.ts`)
- [ ] T051 Implement authorization service logic (roles & permission checks)
- [ ] T052 Complete create note service logic
- [ ] T053 Complete list notes service logic (visibility filtering)
- [ ] T054 Complete get single note logic (expand controller/service if needed)
- [ ] T055 Complete update note service logic (authz)
- [ ] T056 Complete delete note service logic (authz)
- [ ] T057 Wire real providers into `app.module.ts` replacing placeholders
- [ ] T058 Implement DTO validation via class-validator decorators
- [ ] T059 Add error handling filters (simple exception mapping) `final-integration/src/interface/filters/http-exception.filter.ts`
- [ ] T060 Add logging prefixes in controllers & services
- [ ] T061 Implement seed script `scripts/seed-notes.ts`

## Phase 3.5: Polish

- [ ] T062 [P] Add unit tests for services (create/update) `tests/unit/services/notes.services.spec.ts`
- [ ] T063 [P] Add unit tests for authorization logic `tests/unit/services/authorization.service.spec.ts`
- [ ] T064 [P] Add unit tests for role helper functions `tests/unit/security/roles.spec.ts`
- [ ] T065 [P] Add README section describing exercise usage & rubric workflow
- [ ] T066 [P] Add anti-pattern examples for SRP `modules/single-responsibility/exercise/anti-pattern.ts`
- [ ] T067 [P] Add anti-pattern examples for ISP `modules/interface-segregation/exercise/anti-pattern.ts`
- [ ] T068 [P] Add anti-pattern examples for DIP `modules/dependency-inversion/exercise/anti-pattern.ts`
- [ ] T069 Refactor repositories for clarity (remove duplication) without breaking tests
- [ ] T070 Add OpenAPI generation script `scripts/gen-openapi.sh`
- [ ] T071 Add progress checklist template `progress-checklist.md` in root
- [ ] T072 Final doc pass: update `quickstart.md` with any new commands

## Dependencies

- Setup (T001–T006) must precede all others
- Contract & integration tests (T007–T022) before core impl (T025+)
- Models/Ports (T025–T030) before repositories/services (T031–T038)
- Repositories (T049–T050) before services complete (T052–T056)
- Authorization service (T051) before protected operations complete (T055–T056)
- Controllers wiring (T039–T043) before integration GREEN phase
- Polish (T062–T072) only after GREEN on earlier tests
- Rubric templates (T023–T024, T073–T075) independent can be authored anytime after setup

## Parallel Execution Example

```text
# Example: Run all contract test authoring in parallel
T007 T008 T009 T010 T011 T012 T013

# Example: After models/ports, create skeleton services concurrently
T034 T035 T036 T037 T038

# Example: Polish parallel batch
T062 T063 T064 T065 T066 T067 T068
```

## Validation Checklist

- [ ] All contracts have corresponding test tasks (users + notes endpoints)
- [ ] All entities (User, Note, Role) have model/enum tasks
- [ ] Tests (T007–T024) precede implementation (T025+)
- [ ] Parallel tasks marked only when files differ
- [ ] Each task lists exact or intended file path
- [ ] No [P] tasks share same file
- [ ] All rubric templates (T023–T024, T073–T075) created

## Notes

- Ensure each test initially fails (throw NOT_IMPLEMENTED or missing exports) before writing implementation
- Keep commits small: one task per commit where feasible
- Update plan if scope drifts

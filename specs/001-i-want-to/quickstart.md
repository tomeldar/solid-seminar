# Quickstart: SOLID Seminar Repo

## 1. Prerequisites
- Node.js 22.x
- pnpm installed globally (`corepack enable`)
- Docker (for Postgres in final integration)

## 2. Install
```bash
pnpm install
```

## 3. Running Module Exercises
Each principle is under `modules/<principle>/` with `exercise/` and `solution/` (solution hidden until reveal in live workshop if desired).

Commands:
```bash
# Run all tests
pnpm test

# Run tests for a single module (naming pattern to be implemented)
pnpm test:module single-responsibility
```

## 4. Test Philosophy (MANDATORY)
1. Start in RED: ensure failing test for exercise
2. Implement minimal change → GREEN
3. Refactor with principle focus (e.g., extract responsibility, apply interface segregation)
4. Commit sequence: `test(failing) -> feat(min pass) -> refactor(principle cleanup)`

## 5. Final Integration
Bring up Postgres:
```bash
docker run --rm -d --name solid_pg -e POSTGRES_PASSWORD=solid -e POSTGRES_USER=solid -e POSTGRES_DB=solid -p 5432:5432 postgres:16
```

Start app (after implementing final module):
```bash
pnpm start:final
```

Seed or run sample script (to be added):
```bash
pnpm ts-node scripts/seed-notes.ts
```

## 6. Logging & Observability
- Use Nest built-in logger
- Prefix logs with `[MODULE: <principle>]` in exercise solutions where illustrative

## 7. Folder Overview (Planned)
```text
modules/<principle>/exercise/
modules/<principle>/solution/
final-integration/src/domain
final-integration/src/application
final-integration/src/infrastructure
final-integration/src/interface
client/http-client.ts
```

## 8. Ports & Adapters (Final Integration)
- Define interfaces in `domain/ports`
- Implement PG adapters in `infrastructure/persistence`
- Wire adapters in `app.module.ts`

## 9. Running Integration Tests (after implementation)
```bash
pnpm test:integration
```

## 10. Manual Rubrics
Where automated tests are omitted (edge conceptual nuance), open the rubric file in the module root and validate criteria.

## 11. Cleanup
```bash
docker stop solid_pg
```

## 12. Common Issues
| Issue | Cause | Fix |
|-------|-------|-----|
| Tests can't find module path | Wrong test pattern | Follow `test:module` naming convention |
| PG connection refused | Container not started | Run docker command above |
| Type errors in exercises | TS config mismatch | Re-run install; check `tsconfig.json` |

## 13. Next Steps
Proceed to tasks plan generation to scaffold code & tests.

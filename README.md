# SOLID Principles Crash Course Seminar

Baseline workspace for a hands-on crash course covering the SOLID principles with NestJS (Node 22 + TypeScript), Vitest, Postgres, and a final integration capstone using a hexagonal architecture.

## Prerequisites
- Node 22.x
- pnpm (see packageManager version in `package.json`)
- Docker (for Postgres) or local Postgres 16+

## Quick Start
```bash
pnpm install
./scripts/run-postgres.sh   # or see docker/postgres.md
cp .env.example .env
pnpm test:contract          # once tests are authored
```
Detailed steps: `specs/001-i-want-to/quickstart.md`.

## Structure (early phase)
```
modules/ <principle>/exercise,solution
final-integration/src/{domain,application,infrastructure,interface}
tests/{contract,integration,unit}
```

## Goals
1. Teach each SOLID principle via a failing test and refactor loop.
2. Reinforce hexagonal boundaries: domain, application (use-cases), infrastructure (adapters), interface (controllers/dto).
3. Capstone: NestJS REST service with Postgres persistence.

See `specs/001-i-want-to/` for full specification, plan, research, data model, and tasks.

# Research: SOLID Principles Crash Course Seminar

## Decision Log Format
Each entry: Decision • Rationale • Alternatives

## Technology & Tooling
1. Node.js 22 + TypeScript latest • Align with modern LTS & user request • Older Node (18/20) - less future-proof
2. Package manager: pnpm • Faster, workspace-friendly, encourages monorepo style • npm/yarn - slower, fewer workspace benefits
3. Test Runner: Vitest • Fast, TS-native, Jest-like DX • Jest - heavier; Mocha - less integrated
4. Framework: NestJS • User requirement & provides module system for teaching SRP & DIP • Express (too low-level), Fastify alone (less educational structure)
5. DB Layer: node-postgres (pg) thin adapter • Transparency, shows DIP clearly • TypeORM/Prisma - abstraction hides reasons for DIP; learning overhead
6. Container: Docker (Postgres) • Reproducible environment • Local install - machine variance
7. Logging: Nest Logger + contextual prefixes • Simple & built-in • External logging libs add complexity

## Architecture & Structure
1. Hexagonal (ports/adapters) for final integration • Demonstrates DIP & isolates infrastructure • Classic layered only - less explicit DIP; Microservices - overkill
2. Single repo with `modules/` for principles • Simplifies navigation • Multiple packages - cognitive overhead
3. Avoid deep repository pattern • Prevent over-abstraction for beginners • Full repository/UoW - unnecessary complexity

## Educational Design
1. Module time: 15m each + 30m capstone • Fits ~2h session • Longer modules risk fatigue; shorter reduces depth
2. Pseudocode examples per principle • Reinforce conceptual learning • Only code or only slides - less effective dual encoding
3. Anti-pattern examples flexible count • Tailor to participant needs • Fixed count could constrain clarity
4. Participant progress tracking: simple checklist (not persisted) • Keeps scope small • DB-backed tracking - out of scope

## Testing Strategy
1. Contract → Integration → Unit order • Reinforces consumer-first mindset • Unit-first may miss integration behaviors
2. Failing-first scaffolds in exercises • Show RED-GREEN cycle • Pre-passing code - undermines TDD
3. Per-module test command: `pnpm test:module <principle>` • Targeted feedback • Single global test run - slower & noisy for focused iteration

## Final Integration Scope
1. Domain: Notes with Users & Roles • Familiar, simple CRUD + auth checks • E-commerce/blog - more domain complexity
2. Authorization: Basic role-based service injected • Teaches DIP & ISP • Full RBAC/ABAC engine - complexity spike
3. Persistence: Notes & Users tables only • Minimal yet realistic • Adding migrations tool - optional future

## Client Scaffold
1. Lightweight `client/http-client.ts` + sample scripts • Quick experimentation • Full frontend app - time prohibitive

## Open Clarifications (Deferred / Not in Scope)
- CI pipeline automation (future enhancement)
- Advanced security hardening (JWT rotation, rate limiting)
- Performance benchmarking beyond basic responsiveness

## Summary
All prior ambiguities converted to explicit decisions or intentionally deferred items. Design choices bias toward transparency, low ceremony, and instructional clarity while still authentically demonstrating SOLID benefits.

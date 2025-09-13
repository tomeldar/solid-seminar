# Feature Specification: SOLID Principles Crash Course Seminar

**Feature Branch**: `001-i-want-to`  
**Created**: 2025-09-13  
**Status**: Draft  
**Input**: User description: "I want to create a crash course seminar on the SOLID principles. I want to workshop this with a group with a focus on nestjs. I plan on using typescript for this project. I'd like to have a section for each of the 5 parts of the SOLID principles. if it's possible to create a target goal of passing some vitest tests, that's great, but also i can do the manual approval that it fulfills the criteria if the test is too difficult to implement. Once they complete the 5 sections, i'd want a final section that puts everythign they learned together."

## Execution Flow (main)

```text
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors (instructors, participants), actions (learn, implement, validate), data (exercise specifications, test cases), constraints (time-boxed seminar, NestJS & TypeScript focus)
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (curriculum module, exercise, principle, assessment)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details" (Note: Tech stack references in description are contextual, not implementation spec)
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines

- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no low-level code design, internal NestJS specifics)
- 👥 Written for facilitators & stakeholders evaluating educational value

### Section Requirements

- **Mandatory sections**: Must be completed for this educational feature
- **Optional sections**: Only add if new data-driven entities emerge
- When a section doesn't apply, remove it entirely

### For AI Generation

1. **Mark all ambiguities** with [NEEDS CLARIFICATION: …]
2. **Don't guess** where the description is silent (e.g., duration per module, delivery medium)
3. **Think like a tester**: Each requirement must be verifiable (by tests or facilitator checklist)
4. **Common underspecified areas** for this feature:
   - Participant skill prerequisites
   - Seminar total duration & per-module time
   - Maximum group size & facilitation ratio
   - Assessment format (automated tests vs. manual review)
   - Hosting environment / repo structure
   - Success criteria for the capstone integration section

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story

As a seminar participant, I want a structured, hands-on progression through each SOLID principle using TypeScript & NestJS-oriented examples so that I can internalize the principles and apply them in a final integrated project.

### Acceptance Scenarios

1. Given a fresh clone of the seminar repository, When a participant opens the curriculum, Then they see clearly separated modules for S, O, L, I, and D plus a final integration module.
2. Given completion of an individual principle module, When the participant runs the associated validation step, Then they receive either (a) passing vitest output or (b) a facilitator rubric indicating completion criteria.
3. Given all five principle modules are completed, When the participant starts the final integration module, Then guidance references previously completed artifacts and defines integration objectives.
4. Given ambiguous or advanced NestJS specifics are not required, When a beginner-to-intermediate TypeScript developer participates, Then they can progress without prior deep NestJS architecture knowledge (within defined prerequisites).

### Edge Cases

- What happens when a participant cannot get tests to run? → Provide fallback manual rubric & troubleshooting guide. [NEEDS CLARIFICATION: Who provides troubleshooting support?] The facilitator will provide support
- How does the system handle participants joining late? → Need catch-up guidance or prerequisite summary. [NEEDS CLARIFICATION: Is asynchronous self-paced catch-up supported?] no catch-up needs to be taken into consideration
- If vitest setup fails in certain environments (e.g., Windows), is there an alternate verification path? [NEEDS CLARIFICATION: Provide OS support scope] i am working under the assumption that all will be able to run vitest
- Handling over-scoped solutions that violate the principle (e.g., implementing multiple responsibilities) → Provide automated or rubric-based detection notes. [NEEDS CLARIFICATION: Will automated anti-pattern detection be included?] If it makes sense, but not required. The facilitator can take that on if necessary
- Participant deviates from suggested file structure → Define whether tests assume convention. [NEEDS CLARIFICATION: Are participants required to follow a provided skeleton?] No, they are not

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The curriculum MUST provide six clearly labeled modules: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion, and Final Integration.
- **FR-002**: Each of the five principle modules MUST state a learning objective and completion criteria in plain language.
- **FR-003**: Each principle module MUST include a pseudocode example that showcases when and how the principle is helpful
- **FR-004**: Each principle module MUST include at least one hands-on exercise requiring participants to refactor or implement code aligned with the principle.
- **FR-005**: Each principle module MUST supply either (a) at least one vitest test suite OR (b) a facilitator rubric describing objective pass criteria when automated testing is impractical.
- **FR-006**: The system MUST provide a consistent invocation method (e.g., `npm test <module>` or documented command) to run tests for modules that include vitest suites. [NEEDS CLARIFICATION: Command naming convention] pnpm test <module>
- **FR-007**: The curriculum MUST define a fallback manual verification checklist for modules lacking automated tests.
- **FR-008**: The final integration module MUST specify a capstone scenario combining all five principles into a cohesive mini-architecture (e.g., service orchestration, plugin-based feature, or layered module). [NEEDS CLARIFICATION: Specific integration theme] A nestjs typescript project with a postrges dockerized backend. Implement some basic crud operations as well as dependency injecting a basic authorization service into the use-cases (hexagonal architecture)
- **FR-009**: The final module MUST define success criteria measurable via (a) integration test(s) OR (b) facilitator rubric with explicit observable behaviors.
- **FR-010**: The repository MUST include a README section describing prerequisites (skills, tools, Node version). [NEEDS CLARIFICATION: Define minimum Node/TypeScript versions] node 22 and latest typescript
- **FR-011**: Each module MUST reference real-world motivation (problem statement) before presenting the exercise.
- **FR-012**: Each module MUST include anti-pattern examples that contrast incorrect vs. correct application of the principle. [NEEDS CLARIFICATION: Depth & number of examples per module] However many are necessary to get the point across
- **FR-013**: The curriculum MUST provide estimated time-to-complete per module. [NEEDS CLARIFICATION: Time allocations] 15 minutes per principle and 30 minutes for the final integration
- **FR-014**: The system MUST provide guidance for facilitators to run a live workshop (sequence, discussion prompts). [NEEDS CLARIFICATION: Target audience size] 6+
- **FR-015**: The repository MUST maintain a consistent folder pattern (e.g., `/modules/<principle>/exercise`, `/modules/<principle>/solution`). [NEEDS CLARIFICATION: Final agreed folder structure] modules/<principle>/src
- **FR-016**: Each exercise MUST include a clear starting state and desired end-state description.
- **FR-017**: Automated tests (where present) MUST fail initially when starting from the provided starter code and pass upon correct completion.
- **FR-018**: The spec MUST support manual approval workflow instructions when automated test creation is deemed too difficult for a given principle nuance.
- **FR-019**: The curriculum MUST articulate evaluation criteria for the final integration (e.g., adherence to all SOLID principles without regressions).

### Key Entities *(include if feature involves data)*

- **Module**: Represents a learning unit (principle or final integration); attributes: name, objective, estimated time, required artifacts, completion criteria type (tests/rubric), anti-pattern examples.
- **Exercise**: A task within a module; attributes: starter code reference, task description, expected behaviors, associated tests or rubric.
- **Assessment Artifact**: Either vitest suite or facilitator rubric; attributes: module link, pass criteria, optional scoring dimensions.
- **Final Project (Capstone)**: Aggregates outputs or concepts from prior modules into an integrated scenario; attributes: narrative, required components, success criteria.
- **Participant (implicit actor)**: Not stored as data in repo but referenced for journey mapping (skill prerequisites, progression state). [NEEDS CLARIFICATION: Will participant progress tracking be in scope?] Sure

---

## Review & Acceptance Checklist

### Content Quality

- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness

- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist passed

---

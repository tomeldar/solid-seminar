# Open/Closed Principle Rubric

Criteria | Description | Evidence Sources | Score (0-2)
---|---|---|---
Baseline Understanding | Identifies original modification triggers | PR discussion, comments | 
Extension via Abstraction | New behavior added via new class/module, not edits | Diff, tests | 
Closed for Modification | Existing core types untouched except wiring | Git diff | 
Open for Extension | Clear extension seam (interface/strategy/config) | Code structure | 
Test Coverage for New Variant | Variant covered by unit/integration tests | Test files | 
No Conditional Explosion | Avoids large switch/if for type branching | Implementation | 
Dependency Direction | High-level logic independent from concrete variants | Imports graph | 
Documentation Quality | README or comments describe extension steps | Docs | 
Refactoring Safety | Added variant does not break previous tests | CI history | 
Elegance / Simplicity | Minimal necessary code added | Reviewer judgment | 

Scoring Guidance:
0 = Not demonstrated; 1 = Partial / issues present; 2 = Fully demonstrated.

Pass Threshold Suggestion: >= 15/20 (adjust per cohort).

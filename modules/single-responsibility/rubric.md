# Single Responsibility Principle Rubric

Criteria | Description | Evidence Sources | Score (0-2)
---|---|---|---
Responsibility Identification | Clear articulation of the single reason to change | README/Comments | 
Separation of Concerns | Previously mixed concerns split logically | Diff | 
Cohesion | Module/classes show high functional cohesion | Code structure | 
Minimal Coupling | Reduced knowledge of unrelated modules | Imports graph | 
Test Isolation | Unit tests target one reason to change | Tests | 
Eliminated God Object | Large multi-purpose type refactored | Diff | 
Naming Reflects Purpose | Names align with responsibility | Code review | 
SRP Anti-Pattern Examples | Before/after comparison provided | Exercise folder | 
Refactor Safety | Original behavior preserved | Test history | 
Documentation Clarity | Explanation of extracted responsibilities | Docs | 

Scoring Guidance:
0 = Not demonstrated; 1 = Partial; 2 = Fully demonstrated.

Pass Threshold Suggestion: >= 15/20.

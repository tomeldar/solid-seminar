# Dependency Inversion Principle Rubric

Criteria | Description | Evidence Sources | Score (0-2)
---|---|---|---
High-Level Stability | High-level policy layer untouched by low-level changes | Diffs | 
Abstraction Ownership | Abstractions defined by high-level layer | Ports folder | 
Detail Plugability | Low-level details supplied via injection | Module wiring | 
Test Substitution | Easy to replace implementations in tests | Test setup | 
Reduced Cycles | No circular imports / dependency cycles | Graph analysis | 
Port Clarity | Ports minimal and intent-revealing | Port code | 
Inversion Demonstrated | Concrete depends on abstraction (not vice versa) | Imports | 
Configuration Boundary | Composition root wires dependencies | app.module/main | 
Anti-Pattern Example | Direct concrete coupling example included | Exercise folder | 
Documentation | Explanation of inversion decisions | README/Comments | 

Scoring Guidance:
0 = Not demonstrated; 1 = Partial; 2 = Fully demonstrated.

Pass Threshold Suggestion: >= 15/20.

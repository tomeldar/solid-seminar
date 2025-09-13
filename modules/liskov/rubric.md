# Liskov Substitution Principle Rubric

Criteria | Description | Evidence Sources | Score (0-2)
---|---|---|---
Contract Clarity | Base type behavioral expectations documented | Interface / JSDoc | 
Subtype Safety | Subtypes honor invariants (no stronger preconditions) | Tests | 
Postconditions Preserved | Results remain within base guarantees | Tests | 
Exception Discipline | No new unchecked exceptions vs base contract | Code diff | 
History Constraint | State transitions valid for base expectations | Unit tests | 
No Type Checks | Avoids instanceof / type narrowing on subtypes | Implementation | 
Design for Extension | Variation captured without violating base | Architecture | 
Negative Tests Present | Tests showing former violation now fixed | Spec files | 
Refactoring Integrity | Substitution works across use sites | Integration tests | 
Clarity of Naming | Subtypes named to reflect constraints | Code review | 

Scoring Guidance:
0 = Not demonstrated; 1 = Partial; 2 = Fully demonstrated.

Pass Threshold Suggestion: >= 15/20.

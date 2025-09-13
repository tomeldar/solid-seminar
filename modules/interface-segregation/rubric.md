# Interface Segregation Principle Rubric

Criteria | Description | Evidence Sources | Score (0-2)
---|---|---|---
Client Specificity | Interfaces tailored to client needs | Code / diff | 
No Forced Methods | Clients implement only required methods | Interfaces | 
Granularity Balance | Interfaces not over-fragmented | Review notes | 
Dependency Reduction | Reduced ripple changes across clients | Git history | 
Mock Simplicity | Tests mock only used methods | Test doubles | 
Adapter Use | Adapters introduced where necessary | Implementation | 
Anti-Pattern Demo | Fat interface example provided | Exercise folder | 
Refactoring Safety | Segregation did not break existing clients | Tests | 
Naming Precision | Interface names describe role | Code review | 
Documentation | Rationale for splits recorded | README/Comments | 

Scoring Guidance:
0 = Not demonstrated; 1 = Partial; 2 = Fully demonstrated.

Pass Threshold Suggestion: >= 15/20.

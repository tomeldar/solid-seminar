# Data Model & Domain Abstractions

## Educational Meta-Entities (Conceptual)
These are not persisted (except where part of capstone domain) but guide structure.

| Entity | Purpose | Key Fields | Notes |
|--------|---------|-----------|-------|
| Module | Encapsulates a SOLID principle or final integration | name, objective, estimatedTime, completionType (tests|rubric) | Directory in `modules/` or `final-integration/` |
| Exercise | Hands-on refactor/implementation | id, moduleName, description, startPath, endCriteria | Each module >=1 |
| AssessmentArtifact | Validation mechanism | type (test|rubric), targetModule, criteria[] | Tests live in `tests/`; rubrics markdown |
| ProgressChecklist | Participant self-tracking | moduleName, items[] | Not persisted programmatically |

## Capstone Domain Entities (Persisted)

### User
- id (uuid)
- email (string)
- displayName (string)
- role (enum: ADMIN, AUTHOR, READER)

Rules:
- email unique
- role default READER

### Note
- id (uuid)
- authorId (uuid → User.id)
- title (string)
- content (text)
- createdAt (timestamp)
- updatedAt (timestamp)

Rules:
- title non-empty
- author must exist

### Role (implicit via enum)
Used for authorization decisions (e.g., ADMIN can delete any note, AUTHOR can CRUD own, READER read-only).

### Permission (Derived)
Not a table initially; logic derived in AuthorizationService (e.g., canEdit(note, user)).

## Ports (Hexagonal Interfaces)

### NoteRepositoryPort
Methods:
- create(noteDraft)
- findById(id)
- findAllByAuthor(authorId)
- update(noteUpdate)
- delete(id)

### UserRepositoryPort
Methods:
- create(userDraft)
- findById(id)
- findByEmail(email)

### AuthorizationPort
Methods:
- canView(user, note)
- canEdit(user, note)
- canDelete(user, note)

## Application Services (Use-Cases)

### CreateNoteService
Input: authorId, title, content  
Validations: user exists, title non-empty  
Output: persisted note

### UpdateNoteService
Input: userId, noteId, changes  
Checks: authorization canEdit  
Output: updated note

### ListNotesService
Input: userId (optional filter by author)  
Output: list of notes user can view

### DeleteNoteService
Input: userId, noteId  
Checks: authorization canDelete  
Output: success flag

## Controllers (Nest REST Endpoints)
- POST /notes → CreateNoteService
- GET /notes → ListNotesService
- GET /notes/:id → Authorization + single fetch
- PATCH /notes/:id → UpdateNoteService
- DELETE /notes/:id → DeleteNoteService

## Validation Summary
- DTO-level: basic class-validator (email format, non-empty title)
- Service-level: existence and authorization checks

## Non-Goals
- Full user auth (tokens) — simplified identity assumed
- Complex permission matrix — role enum + service logic only
- Migrations automation — static SQL init script acceptable

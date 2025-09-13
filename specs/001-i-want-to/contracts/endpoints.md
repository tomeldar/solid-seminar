# Endpoint Summary

## Notes
| Method | Path | Description | AuthZ | Success | Errors |
|--------|------|-------------|-------|---------|--------|
| POST | /notes | Create note | AUTHOR/ADMIN | 201 + body | 400 (validation), 404 (user) |
| GET | /notes | List accessible notes | Any authenticated | 200 + list | none |
| GET | /notes/:id | Get note | Must canView | 200 + body | 404 (not found), 403 (forbidden) |
| PATCH | /notes/:id | Update note | canEdit | 200 + body | 404, 403 |
| DELETE | /notes/:id | Delete note | canDelete | 204 | 404, 403 |

## Users
| Method | Path | Description | AuthZ | Success | Errors |
|--------|------|-------------|-------|---------|--------|
| POST | /users | Create user | Open (workshop simplified) | 201 + body | 400 (validation) |
| GET | /users/:id | Fetch user | Any authenticated | 200 + body | 404 |

## Error Format
```json
{ "error": { "message": "...", "code": "..." } }
```

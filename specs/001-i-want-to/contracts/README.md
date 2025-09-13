# Contracts Overview

Defines external API surface for final integration module.

Artifacts:
- `openapi-fragment.yaml`: Partial spec for notes & users endpoints
- `endpoints.md`: Human-readable summary

Contract tests (to be generated in tasks phase) will assert:
- Status codes
- JSON schema shape
- Authorization behavior (role-based)
- Error cases (not found, forbidden)

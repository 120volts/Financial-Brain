# AGENTS.md — Financial Brain Invoice

These instructions apply to Codex and every automated coding agent working in this repository.

## Product boundary

This repository contains the standalone Invoice module. It must remain usable by itself while exposing stable integration boundaries for future Clients, Projects, Purchases, Dashboard and Taxes modules.

## Mandatory rules

1. Inspect the complete repository before modifying code.
2. Treat `legacy/v2.3.4` as read-only. Never edit or delete it.
3. Do not rewrite the working app merely to change frameworks or style.
4. Preserve all existing localStorage keys and stored invoice compatibility unless an explicit, tested migration is supplied.
5. Never silently delete, reinterpret or overwrite user data.
6. Do not redesign the interface unless the task explicitly requests a redesign.
7. Extract code incrementally and keep the application runnable after every commit.
8. Prefer domain types, small modules and reusable components over duplicated behavior.
9. Invoice must not directly control Dashboard or Taxes UI. Communicate through typed domain events and interfaces.
10. Add or update tests for every behavior change.
11. Update `CHANGELOG.md` for user-visible behavior and `docs/DECISIONS.md` for architectural decisions.
12. Report changed files, tests run, failures and unresolved risks.

## Required validation

Before presenting work as complete:

```bash
npm test
```

Also test manually when the task affects UI, storage, PDF output, navigation, PWA installation or invoice state transitions.

## Current storage contract

The v2.3.4 application uses:

- `invoiceApp.invoices`
- `invoiceApp.clients`
- `invoiceApp.items`
- `invoiceApp.brainEvents`
- `invoiceApp.taxRecords`
- `invoiceApp.lastPage`
- `invoiceApp.lastMainTab`
- `invoiceApp.businessName`

The legacy `invoiceApp.businessAddress` key may exist in older browsers, but the current
interface does not collect or use starting or project addresses for mileage.

These keys are compatibility-sensitive.

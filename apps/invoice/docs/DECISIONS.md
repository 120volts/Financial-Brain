# Decision Log

## D-001 — Standalone first

The Invoice module will run independently before the full Financial Brain application exists. This allows real use and testing without creating dependencies on unfinished modules.

## D-002 — Preserve v2.3.4 behavior

The existing application is working software and is the regression baseline. Refactoring will be incremental rather than a wholesale rewrite.

## D-003 — Phone and desktop have different emphasis

Phone workflows prioritize rapid capture and confirmation. Desktop workflows prioritize review, editing and organization.

## D-004 — Event-based integration

Invoice communicates meaningful state changes through domain events. Dashboard and Taxes consume those events rather than being controlled directly by Invoice.

## D-005 — Data safety over convenience

Storage changes require schema versioning, tested migrations and a recovery path. User data may not be silently discarded.

## D-006 — Repository instructions are part of production

`AGENTS.md`, requirements and decision records are maintained alongside code so Codex and future developers receive consistent constraints.

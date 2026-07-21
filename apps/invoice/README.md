# Financial Brain Invoice Module

Standalone, production-oriented Invoice module for the Financial Brain application.

## Current milestone

**v2.4.0 Foundation** preserves the complete v2.3.4 behavior baseline and adds:

- A repeatable repository structure
- The missing web app manifest
- Offline/service-worker support
- A dependency-free local development server
- Baseline smoke tests
- Product, architecture and development documentation
- An untouched copy of v2.3.4 under `legacy/v2.3.4`

No invoice workflow was intentionally redesigned in this milestone.

## Run locally

Requires Node.js 18 or newer.

```bash
npm start
```

Open `http://localhost:4173`.

## Test

```bash
npm test
```

## Structure

```text
app/                 Current runnable Invoice application
legacy/v2.3.4/       Untouched behavior baseline
docs/                Product and engineering specification
scripts/              Development utilities
tests/                Regression and architecture tests
AGENTS.md             Rules for Codex and other coding agents
CHANGELOG.md          Release history
```

## Development strategy

The current single-file application is working software. It will be separated incrementally. Each extraction must preserve behavior, storage compatibility and existing invoices.

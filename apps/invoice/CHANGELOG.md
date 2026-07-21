# Changelog

All notable changes to the Financial Brain Invoice module are documented here.

## [Unreleased]

### Added
- Partial-payment recording with received date, method, reference and notes.
- Payment history, paid total and remaining balance on invoice details.
- Per-payment cash-basis income events and tax records.
- Multiple invoice recipients with optional CC and BCC lists.
- Optional service/work date ranges displayed separately from invoice and due dates.
- Project name promoted to the top of the invoice editor and retained as the document title.
- Saved business starting address and reusable project address/place-name fields for Mileage.
- One-click Apple Maps driving route from the Mileage section.
- Automatic work-day totals across a date range with exception-based days off.
- One-click application of the calculated work-day count to the first invoice line quantity.

### Compatibility
- Existing invoices with legacy `paidAmount` data are migrated in memory to `payments[]` without changing storage keys.
- Existing `clientEmail` values remain the primary recipient and are migrated in memory to `recipientEmails[]`.

## [2.4.0-foundation] - 2026-07-18

### Added
- Production repository foundation.
- `manifest.webmanifest` for installable web-app metadata.
- `service-worker.js` for application-shell caching and offline fallback.
- Dependency-free local development server.
- Baseline automated smoke tests.
- Codex/AI development rules in `AGENTS.md`.
- Product, requirements, architecture, data-model, UI and decision documentation.
- Untouched v2.3.4 baseline under `legacy/v2.3.4`.

### Preserved
- Existing v2.3.4 invoice behavior and localStorage keys.

## [2.3.4] - Baseline

### Fixed
- Pull-down refresh restores all five bottom navigation tabs.
- The New tab restores a fresh usable invoice screen.
- Visible v2.3.4 marker added.

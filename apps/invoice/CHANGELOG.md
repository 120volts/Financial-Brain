# Changelog

All notable changes to the Financial Brain Invoice module are documented here.

## [Unreleased]

### Added
- Payment-term choices in the saved-invoice date editor, including No due date, Due on receipt, Net terms, and a custom due date.
- Per-payment “Don't add this payment to Financial Brain” control that preserves Paid status while omitting Financial Brain income and tax records.
- Partial-payment recording with received date, method, reference and notes.
- Payment history, paid total and remaining balance on invoice details.
- Per-payment cash-basis income events and tax records.
- Multiple invoice recipients with optional CC and BCC lists.
- Optional service/work date ranges displayed separately from invoice and due dates.
- Project name promoted to the top of the invoice editor and retained as the document title.
- Automatic work-day totals across a date range with exception-based days off.
- Automatic first-line quantities from calculated workdays, with manual override and resume control.
- Automatic mileage totals from one-way distance × trips per workday × calculated workdays.
- Automatic local saving and restoration of unfinished invoice work.
- Persistent Preview navigation for the current unfinished invoice.

### Changed
- Simplified Mileage by removing project-address entry and map routing; users enter distance directly.
- Removed starting-address entry from Mileage; mileage now requires no addresses.
- Payment terms are optional; invoices without terms omit the due date everywhere.
- Automatic workday and mileage quantities stop changing after the user manually edits them.
- Quantity arrow controls now move by whole numbers while typed decimal quantities remain supported.
- Business name and invoice initials can now be changed directly from the Preview page.
- Business initials now use the first letter of each end word instead of the first two letters of the name.
- Previewing, saving, or sending an invoice now adds new clients and new manual line items to their reusable libraries without duplicates.
- Sending now shares the styled invoice PDF, with an optional completed W-9 PDF included in supported device Share Sheets.
- Added a reusable W-9 editor that fills the official IRS March 2024 form; reusable details stay local while TIN and signature data are never persisted.
- Added a Save to Services & Products action when editing a line on an existing invoice.
- Added a dedicated Resend PDF invoice action to saved invoice details and resend tracking for edited sent invoices.
- Split delivery into direct Email and Share PDF / Messages actions; direct email now pre-fills recipients, CC/BCC, subject, dates, itemized charges, total, and message text.
- Invoice PDF filenames now identify the project, invoice date, and invoice number.
- Improved Mail recipient formatting with client display names, saved-client email fallback, and compatible multi-address To/CC/BCC separators.
- Added a reusable Projects list with automatic invoice learning, client links, search, totals, editing, archiving, and saved-project selection in the invoice editor.
- Added explicit saved Project and Service/Product dropdowns to New Invoice, including automatic client/email and saved-rate filling.
- Private mileage previews show distance and purpose without obsolete address placeholders.

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

# Financial Brain Roadmap

This roadmap describes capability order, not fixed calendar dates. A phase is complete only when its exit criteria are met and existing user data remains compatible.

## Phase 0 — Preserve and document the baseline

**Goal:** Make the existing software safe to evolve.

- Preserve the root phone prototype and the Invoice v2.3.4 behavior baseline.
- Establish product, architecture, data-model, UI, decision, and QA documentation.
- Add a PWA shell, local development server, and smoke tests to the Invoice foundation.
- Record compatibility-sensitive storage keys and schemas.
- Define backup, export, and recovery expectations before destructive migrations.

**Exit criteria**

- The current application runs through a repeatable command.
- Baseline tests detect missing files and major structural regressions.
- Product boundaries and non-negotiable rules are documented.
- Legacy behavior remains available for comparison.

## Phase 1 — Invoice domain and storage

**Goal:** Separate reliable business behavior from the current single-file interface.

- Introduce a typed invoice domain model.
- Extract calculations, validation, and status transitions.
- Add a versioned repository abstraction around local storage.
- Build explicit, idempotent migrations with backup and recovery paths.
- Add tests for totals, mileage, status transitions, and representative legacy data.
- Establish partial-payment and payment-history foundations.

**Exit criteria**

- Existing invoices and clients load without manual conversion.
- Business rules are tested outside the UI.
- Failed migrations do not silently damage or discard data.

## Phase 2 — Modular Invoice experience

**Goal:** Improve maintainability and reliability while preserving the recognized workflow.

- Extract pages and reusable UI components incrementally.
- Strengthen client, project-name, service/product, mileage, and job-cost editing.
- Make every visible action complete and predictable.
- Preserve refresh location, active tabs, and in-progress work.
- Improve PDF, print, share, status timeline, and payment-history reliability.
- Validate phone capture and desktop review separately.

**Exit criteria**

- The application remains runnable after each extraction.
- Core invoice workflows pass automated and manual regression checks.
- No redesign is bundled into architecture work without an explicit decision.

## Phase 3 — Shared contracts for Clients, Projects, and Purchases

**Goal:** Connect work and spending without creating tightly coupled modules.

- Define stable IDs for clients, projects, invoices, purchases, receipts, and payments.
- Publish versioned Invoice events such as created, sent, viewed, overdue, payment recorded, paid, and archived.
- Link purchases and receipts to projects and invoice job costs.
- Support bank CSV/PDF import with duplicate detection and import provenance.
- Group purchases by merchant while preserving individual transactions.
- Add a review queue for uncertain, cash, and unrecorded activity.

**Exit criteria**

- Modules can exchange records through documented contracts.
- Reprocessing the same import does not create silent duplicates.
- Suggested categories and links remain reviewable and reversible.

## Phase 4 — Dashboard and daily workflow

**Goal:** Turn connected records into a useful daily financial picture.

- Summarize Draft, Sent/Viewed, Awaiting Payment, Overdue, and Paid invoices.
- Surface uncategorized purchases, missing receipts, and unresolved project links.
- Make dashboard totals navigate to the records behind them.
- Add reminders for the user without contacting clients automatically.
- Support quick phone confirmation and efficient desktop batch review.

**Exit criteria**

- Dashboard totals reconcile with module records.
- Every summary can be traced to and corrected at its source.
- Attention items are prioritized without overwhelming the front screen.

## Phase 5 — Tax knowledge and preparation

**Goal:** Produce traceable, explainable tax-preparation inputs from verified activity.

- Map verified income and expenses to an initial 1040 and Schedule C knowledge model.
- Track form, schedule, rule, source, tax year, jurisdiction, and effective-date metadata.
- Distinguish source facts, user answers, system suggestions, and calculations.
- Show why a question is being asked and what downstream result it affects.
- Support 1099 and other source-document intake and reconciliation.
- Generate review-ready summaries with links back to the underlying records.

**Exit criteria**

- Tax totals are reproducible and traceable to source transactions and documents.
- Uncertainty and missing evidence are visible.
- The system does not silently convert a suggestion into a user-confirmed fact.

## Phase 6 — Accounts, synchronization, and production hardening

**Goal:** Make Financial Brain dependable across phone and desktop.

- Add authentication and synchronized storage behind existing repository interfaces.
- Define conflict handling for offline and multi-device edits.
- Encrypt sensitive data in transit and at rest.
- Provide export, backup, restore, retention, and account-deletion controls.
- Add observability, error recovery, accessibility, performance, and deployment checks.
- Run migration rehearsals using representative legacy data.

**Exit criteria**

- Offline work synchronizes without silent data loss.
- Users can export and recover their records.
- Security, privacy, migration, and failure-recovery behavior is documented and tested.

## Continuous work across every phase

- Protect user data and storage compatibility.
- Update tests with every behavior change.
- Record important architectural decisions.
- Keep documentation aligned with shipped behavior.
- Validate phone and desktop workflows in proportion to the change.
- Prefer small, reversible releases over large rewrites.


# Financial Brain Vision

## Purpose

Financial Brain is a personal financial operating system for people whose money is created through real work, projects, purchases, invoices, and tax obligations—not through tidy monthly bookkeeping.

Its job is to capture financial activity when it happens, connect related facts, and turn them into understandable records that remain useful from the phone in the field through desktop review and year-end tax preparation.

The product should reduce the need to reconstruct a year from bank statements, receipts, calendars, and memory.

## Product promise

Financial Brain should help the user answer four questions at any time:

1. What happened?
2. What does it belong to?
3. What still needs attention?
4. What will this mean for cash flow, reporting, and taxes?

The system may suggest and automate, but it must show its reasoning and leave consequential decisions under the user's control.

## The operating model

Financial Brain is a connected set of focused modules rather than one enormous accounting screen.

- **Clients** stores reusable people and business relationships.
- **Projects** connects work dates, clients, invoices, purchases, mileage, and receipts.
- **Invoice** creates professional invoices and owns their lifecycle from Draft through Paid.
- **Purchases** captures and classifies transactions, receipts, and job costs.
- **Dashboard** summarizes current financial state and directs attention to unfinished work.
- **Taxes** turns verified records into traceable tax-form inputs and preparation guidance.

Each module must remain understandable on its own. Modules exchange stable identifiers and domain events instead of manipulating one another's screens or private storage.

## Primary experience

### Phone: capture and confirm

The phone is a remote control for financial activity. It should make it fast to:

- create or update an invoice during a job;
- photograph or attach a receipt;
- confirm a merchant, project, category, or client;
- record mileage or a cash transaction;
- mark an invoice sent or paid; and
- respond to a short list of items that genuinely need attention.

Essential information belongs on the front screen. Detail should appear when requested, without a permanent side panel or a giant deduction menu.

### Desktop: review and understand

The desktop is the workspace for:

- resolving uncertain transactions in groups;
- reviewing projects, invoices, and purchases together;
- correcting classifications and relationships;
- generating reports and polished documents;
- tracing tax totals back to source records; and
- managing imports, exports, backups, and synchronization.

## First production foothold: Invoice

Invoice is the first production-oriented module. It must remain useful as a standalone application while becoming a reliable source of structured events for the larger system.

The existing v2.3.4 behavior is the compatibility baseline. The v2.4 foundation adds repository structure, PWA support, regression tests, and product and architecture documentation without intentionally redesigning the workflow.

Invoice owns invoice state and amounts. When an invoice is created, sent, viewed, becomes overdue, receives payment, or is paid, it publishes an event. Dashboard and Taxes consume those events; they do not reach into Invoice internals.

## What success looks like

Financial Brain succeeds when:

- capture is quick enough to happen during normal work;
- imported activity is organized without hiding uncertainty;
- duplicate records are prevented or clearly surfaced;
- every important total can be traced to its source;
- corrections are reversible and do not destroy history;
- the same data does not need to be entered repeatedly;
- phone and desktop experiences serve their different jobs;
- a paid invoice and its related purchases naturally become financial and tax records; and
- year-end preparation is the result of work already done throughout the year, not a separate reconstruction project.

## Boundaries

Financial Brain is not intended to obscure assumptions, invent missing evidence, or present uncertain tax treatment as settled fact. It should distinguish source data, user-confirmed facts, system suggestions, and derived calculations.

The product is production software, not a disposable prototype. Progress must preserve working behavior and user data while replacing fragile internals incrementally.


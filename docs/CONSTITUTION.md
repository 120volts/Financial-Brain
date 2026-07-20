# Financial Brain Constitution

This document defines the durable rules for product and engineering decisions. Feature plans and implementation preferences may change; these principles should change only through an explicit, documented decision.

## 1. The user owns the record

Financial records, documents, classifications, and corrections belong to the user.

- Provide practical export and backup paths.
- Do not trap essential data in an undocumented internal format.
- Never silently delete, reinterpret, merge, or overwrite records.
- Destructive operations require clear scope, confirmation, and a recovery strategy.

## 2. Preserve working behavior

Working software is the baseline, even when its internal structure is imperfect.

- Do not rewrite the application merely to change frameworks or style.
- Extract and replace behavior incrementally.
- Keep the application runnable after each meaningful change.
- Treat the preserved Invoice v2.3.4 application as a read-only compatibility reference.
- A migration must be explicit, tested, idempotent, and recoverable.

## 3. Capture first; organize progressively

The system should accept incomplete real-world information without losing it.

- Fast capture must not require every bookkeeping or tax decision up front.
- Unknown and uncertain are valid states.
- The product should request the smallest useful clarification at the right time.
- Desktop review may add detail later without breaking the original source record.

## 4. Automation must be visible and reversible

Financial Brain may group, categorize, link, calculate, and suggest, but it must not hide consequential reasoning.

- Label system suggestions as suggestions until confirmed when confirmation matters.
- Show why a classification or relationship was proposed.
- Preserve provenance for imports and derived values.
- Allow corrections without erasing history.
- Do not let convenience turn uncertainty into false certainty.

## 5. Every total must be traceable

A dashboard, report, or tax figure is only as trustworthy as its path back to evidence.

- Derived totals must identify their component records.
- Source records should retain dates, amounts, origin, identifiers, and import metadata.
- Duplicate detection must be deterministic and reviewable.
- Reconciliation failures must surface clearly rather than being balanced silently.

## 6. Modules own their domains

Each module is responsible for its own rules and records.

- Invoice owns invoice lifecycle, amounts, and payment history.
- Purchases owns imported transactions, receipts, classification, and purchase state.
- Projects owns the relationship between work, clients, invoices, purchases, and mileage.
- Dashboard and Taxes consume stable contracts; they do not reach into another module's UI or private storage.
- Cross-module communication uses versioned identifiers, interfaces, and domain events.

## 7. Phone and desktop have different jobs

Feature parity is less important than workflow fitness.

- Phone favors quick capture, confirmation, and status changes.
- Desktop favors review, correction, grouping, reporting, and administration.
- Essential information belongs on the front screen.
- Detail appears on demand; the interface should not begin with a giant menu of financial or tax concepts.
- Anything that looks actionable must work.

## 8. Compatibility is a product feature

Existing user data and recognized workflows are part of the public contract.

- Preserve documented local-storage keys and schemas unless a tested migration is supplied.
- Maintain backward readers long enough to recover and migrate supported data.
- Back up before destructive transformations.
- Test representative legacy datasets, not only newly created records.

## 9. Security and privacy are architectural requirements

Financial data is sensitive by default.

- Collect only data needed for an understood purpose.
- Apply least-privilege access to services, modules, and integrations.
- Keep secrets out of source control and client-visible bundles.
- Protect synchronized data in transit and at rest.
- Make retention, export, and deletion behavior understandable.
- Do not include real financial information in fixtures, screenshots, logs, or examples without explicit authorization.

## 10. Tax behavior must be sourced and time-aware

Tax rules change and may depend on year, jurisdiction, entity, and facts.

- Store the tax year, jurisdiction, effective date, and source with rule knowledge.
- Separate source facts, user assertions, system suggestions, and calculations.
- Explain which answer or record affects a tax result.
- Surface ambiguity and missing evidence.
- Do not present a generated classification as professional advice or a guaranteed filing position.

## 11. Quality gates apply to every change

A change is not complete because the interface appears to work once.

- Add or update tests for behavior changes.
- Run the relevant automated checks before delivery.
- Manually test changes affecting UI, storage, PDF output, navigation, PWA behavior, synchronization, or financial state transitions.
- Report changed files, tests run, failures, and unresolved risks.
- Update decision records and user-facing release notes when appropriate.

## 12. Prefer reversible progress

Financial Brain is a long-term system. The best next step is one that creates value while preserving options.

- Favor small, reviewable changes over broad rewrites.
- Introduce abstractions only where they establish a real boundary.
- Keep standalone modules useful while integration evolves.
- Measure progress by trustworthy completed workflows, not by the number of screens or features.

## Amending this constitution

An amendment must:

1. state the principle being changed;
2. explain the product or engineering need;
3. describe effects on data, compatibility, privacy, and module boundaries;
4. include a migration or transition plan when behavior changes; and
5. be recorded in the repository's decision history.


# Invoice Requirements

## Purpose and authority

This document records the current contract for the standalone Financial Brain Invoice application. It is based on the runnable application in `apps/invoice/app`, the native iOS wrapper, the regression smoke test, recent repository history, and confirmed decisions already recorded in this repository.

The sections deliberately distinguish current behavior from requirements that are confirmed but not yet complete. The current app is the behavior baseline. Do not replace refined behavior with generic invoicing conventions, and do not treat a known gap or unresolved question as permission to redesign the product.

## Product boundary and principles

- Invoice must remain useful as a standalone application while exposing stable integration boundaries for future Financial Brain modules.
- Phone workflows prioritize quick capture and confirmation. Desktop workflows prioritize review, editing, and organization.
- Existing invoices and compatibility-sensitive local data must survive upgrades.
- Financial Brain income and tax records are downstream records created from payment activity. Invoice must not directly control future Dashboard or Taxes interfaces.
- AI or suggestion features may reduce entry, but financial decisions must remain reviewable and correctable by the user.
- Refactoring is incremental. The working application and `legacy/v2.3.4` behavior baseline must not be replaced merely to change frameworks or style.

## Implemented behavior

### Invoice creation and editing

- Create a blank invoice or start one from an existing client.
- Project name appears first in the editor and is the prominent title in Preview, printable output, email content, and PDF output.
- An invoice stores a stable internal ID, human-readable number, client reference, recipient lists, project, invoice date, optional service dates, optional payment terms and due date, lines, notes, mileage, job costs, status, timestamps, payments, and archive state.
- “Send to,” CC, and BCC accept comma-, semicolon-, or line-separated addresses. Sending requires at least one valid “Send to” address. BCC is used for delivery but is not displayed in invoice output.
- Service/work start and end dates are optional. Reversed ranges are rejected.
- Every calendar date in a service range initially counts as a workday. Individual dates can be toggled off and on.
- The first line quantity follows the calculated workday count until manually edited. The user can resume automatic quantity after overriding it.
- Line quantities support typed decimals. Arrow controls increment or decrement by whole numbers.
- Payment terms support No due date, Due on receipt, Net 7/15/30/45/60, and Custom due date when editing a saved invoice. No due date omits due-date language from invoice output and email.
- Previewing, saving, or sending learns valid new clients, manual line items, and projects without creating case-insensitive duplicates. Generated mileage lines are not learned as reusable services.
- Saved projects are searchable and reusable, may link to a client, and show invoice count and billed total. Selecting a linked project can fill its client and email.
- Saved services and products are searchable and reusable. Selecting one fills the first empty line or adds a line with its saved rate. A saved invoice line can explicitly update the reusable library.
- The editable business name controls the FROM name and invoice mark. A multi-word name uses the first letter of its first and last words for the mark.

### In-progress workspace

- Editor changes are automatically saved in `invoiceApp.invoiceWorkspace`.
- Returning to New restores the unfinished invoice, including recipients, project, dates, workday exceptions, line items, mileage, job costs, notes, W-9 choice, and reminder settings.
- Preview is a persistent main navigation destination for the current workspace.
- Saving or sending converts the workspace into a stored invoice and clears the temporary workspace.

### Mileage and job costs

- Mileage uses one-way distance, trips per workday, calculated workdays, business purpose, optional client billing, and a separate billing rate. Addresses and map routing are intentionally absent.
- Total mileage is one-way distance × trips per workday × calculated workdays.
- A generated billable mileage line follows total mileage until its quantity is manually overridden.
- Mileage billing is kept separate from any future tax-deduction calculation.
- Job costs can record parking, transit, lodging, meals, supplies, rental, and a note with the invoice.

### Lifecycle, payments, and records

- Supported stored and derived states include Draft, Sent, Viewed, Partial, Overdue, Paid, and Cancelled.
- Overdue is derived only when an invoice has a due date, the due date has passed, and a balance remains. Derived display status does not erase stored timestamps or payment history.
- Users can save drafts, preview, send, resend, mark viewed for testing, edit, duplicate, archive, delete with confirmation, and undo invoice deletion during the current session.
- Payments can be partial or full and include amount, received date, method, reference, notes, and an exclusion choice.
- A payment cannot exceed the remaining balance, and an edited invoice total cannot be reduced below payments already recorded.
- Payment history, paid total, and remaining balance appear in invoice details. A zero balance marks the invoice paid; otherwise a positive payment produces Partial status.
- Each included payment creates a cash-basis Gross Receipts tax record and a Financial Brain event. “Don't add this payment to Financial Brain” preserves the payment and invoice status but omits those downstream records.
- Deleting an invoice removes its related Financial Brain events and tax records, with an in-session undo path.

### Delivery and documents

- Preview, printable HTML, PDF, email content, and resend all use the current saved invoice data.
- PDF filenames contain the project name, invoice date, and invoice number.
- The browser path separates Email from Share PDF / Messages. Web email uses a prefilled message but cannot attach a file through `mailto`; the Share Sheet can pass the generated PDF to supported apps.
- The native iPhone wrapper opens an editable Apple Mail composer with To, CC, BCC, subject, styled HTML body, the invoice PDF, and an optional W-9 attachment.
- Sending or resending records the relevant sent timestamp; editing a previously sent invoice does not create a second invoice.
- A manual payment-reminder email is available for sent invoices with an outstanding balance. The native app uses its Mail composer; the browser falls back to a prefilled email.

### Payment reminders

- Reminders are optional per invoice and default to every seven days.
- The interval can be changed to 3, 7, 10, 14, 30, or 60 days in the current interface.
- In the native iPhone app, an enabled reminder schedules a repeating local notification only after the invoice has been sent and while a balance remains.
- Reminders stop when the invoice is paid, cancelled, or deleted. Changing the interval reschedules the reminder.
- If notification permission is denied, the app disables the reminder and tells the user to enable notifications in iPhone Settings.

### W-9 support

- The app stores reusable W-9 identity, classification, exemption, and address details locally.
- It fills the bundled official March 2024 IRS W-9 PDF and can download or share the prepared form with an invoice.
- Taxpayer identification number, signature, and the generated signed W-9 are session-only and are not persisted.

### Clients, contacts, projects, and reusable items

- Clients can be learned from invoices, created, searched, edited, archived/restored, deleted with confirmation and undo, and reused.
- Client details show related invoices, billed and outstanding totals, average payment time, and “New invoice for this client.”
- The web app can import a vCard. Direct device-contact selection is attempted only when the runtime supports the Contact Picker API.
- Projects can be created or learned from invoices, searched, edited, archived/restored, and linked to clients.
- Saved services/products can be created, searched, edited, duplicated, archived/restored, deleted, and reused.

### Financial Brain view, backup, persistence, and installation

- The current Financial Brain view summarizes paid income from tax records, unpaid invoice amounts, event count, and recent invoice events. It is a prototype integration view, not a complete tax engine.
- Export creates a JSON backup of `invoiceApp.*` data, including invoices, payments, clients, projects, services, settings, Financial Brain records, and saved W-9 profile details.
- Import validates the backup format, creates a pre-import recovery snapshot, and merges record collections by ID instead of deleting unique local records.
- On supported Apple devices, Share can save the backup to iCloud Drive through Save to Files. This is user-initiated file transfer, not automatic cloud synchronization.
- The web app includes a manifest, service worker, install prompt where supported, and offline application-shell caching.
- A Capacitor iOS wrapper contains the native Mail and repeating local-notification bridges.
- Compatibility-sensitive storage keys include `invoiceApp.invoices`, `invoiceApp.clients`, `invoiceApp.items`, `invoiceApp.projects`, `invoiceApp.brainEvents`, `invoiceApp.taxRecords`, `invoiceApp.invoiceWorkspace`, `invoiceApp.w9Profile`, navigation keys, and business-name settings.
- Older `paidAmount` and `clientEmail` data are normalized in memory to `payments[]` and `recipientEmails[]` without changing the established storage keys.

## Confirmed requirements

These requirements remain authoritative even where coverage or implementation is incomplete.

- Existing browser data must survive upgrades. Any storage-shape change requires an explicit, tested migration and recovery path.
- Existing invoice behavior must remain available during incremental modularization.
- Every material status change must retain its audit history; a derived label must not rewrite historical facts.
- Errors must not silently discard invoice edits or stored financial records.
- Documents must remain professional, readable, printable, and consistent across supported environments.
- The invoice project name must remain meaningful in document titles and generated filenames.
- Invoice must communicate future cross-module changes through stable events or interfaces rather than directly manipulating Dashboard or Taxes UI.
- User-learned clients, projects, and services must remain reviewable, editable, archivable, and reusable.
- User-visible behavior changes require regression coverage and changelog updates.
- A Spanish invoice/document variant remains a confirmed planned requirement; it is not implemented in the current app.

## Known gaps and limitations

- The production web application remains a large single `index.html` containing UI, business logic, storage, document generation, and integration behavior. Architectural separation is still pending.
- Automated coverage is a source-level smoke test. It verifies required files and implementation markers but does not execute browser workflows, calculations, localStorage migrations, PDF layout, Share Sheet behavior, native Mail, notifications, backup merging, or offline behavior end to end.
- Native iOS Mail and notification behavior requires an actual compatible device or simulator, Xcode build, signing, and manual verification.
- Browser email cannot attach the generated invoice PDF through `mailto`; users must use Share or attach a downloaded PDF manually where native Mail is unavailable.
- The “Mark viewed” control is explicitly a test/manual action. There is no remote delivery or open-tracking service.
- Payment matching to imported bank transactions is not implemented; payments are recorded manually.
- Backup transfer is manual export/import. There is no automatic iCloud database synchronization or conflict-resolution service.
- The Financial Brain view uses locally generated invoice/payment records and does not constitute a complete accounting or tax calculation system.
- W-9 generation is tied to the bundled March 2024 form and must be reviewed when the IRS revises the official form.
- PDF and printable HTML are separate renderers and can drift without stronger visual regression testing.
- Client outstanding totals use legacy calculation paths in some views and require regression verification against multiple partial payments.
- The documented QA checklist has not yet been expanded to cover several recently added workflows, including native Mail, reminders, backups, projects, W-9, partial payments, and workspace restoration details.

## Unresolved questions

These items require product or engineering decisions before implementation changes are made.

- Which browsers, iOS versions, macOS versions, and device sizes form the official support matrix?
- Should Sent and Awaiting Payment remain separate user-facing concepts, and what exact transition makes an invoice Viewed outside the current manual test control?
- Should Cancelled remain a stored lifecycle state, and what user action should expose cancellation separately from deletion or archive?
- What is the retention and recovery policy for destructive actions after the current in-session undo window ends?
- Should reminder notifications recur from the send date or from the due date, and should users be able to choose a custom interval beyond the current presets?
- Should payment-reminder email sends be recorded in the invoice timeline, and if so, what delivery result is reliable enough to store?
- How should partial payments affect client-level outstanding totals, average payment time, and overdue presentation in every view?
- What data should be included in automatic future cloud synchronization, how should conflicts be resolved, and which records require encryption beyond platform defaults?
- What Spanish-language invoice content, locale formatting, and legal/business wording are required for the first supported variant?
- When the official W-9 changes, should templates be bundled by version, downloaded from an authoritative source, or both?
- Which domain-event schema and storage version should become the first stable integration contract for Financial Brain?

## Validation expectations

Before invoice requirements are considered satisfied for a change:

1. Run `npm test` from `apps/invoice`.
2. Manually test any affected UI, persistence, PDF, delivery, backup, reminder, native, or offline workflow.
3. Verify old localStorage fixtures still load when data shape changes.
4. Update this document when a confirmed requirement becomes implemented, a gap is resolved, or a product decision closes an unresolved question.

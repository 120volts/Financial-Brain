# Invoice Requirements

## Invoice fields

An invoice must support at minimum:

- Stable internal ID
- Human-readable invoice number
- Client reference, multiple recipient emails, and optional CC/BCC details
- Project name shown first in the editor and as the prominent title on every invoice format
- Issue date with optional payment terms and due date
- Optional service/work start and end dates
- Automatic inclusive work-day calculation with tap-to-toggle irregular days off
- The first invoice line quantity follows the calculated work-day count until the user edits it manually
- The user can resume automatic work-day quantity after a manual override

Mileage rules:

- The user enters one-way distance, trips per workday, and business purpose without providing addresses.
- Total mileage is one-way distance × trips per workday × calculated workdays.
- A billable mileage line follows calculated total miles until its quantity is manually overridden.

Recipient rules:

- “Send to,” CC and BCC accept comma-, semicolon- or line-separated addresses.
- At least one “Send to” address is required before sending.
- Invalid addresses and reversed work date ranges must be rejected.
- BCC recipients are used for email delivery but never displayed on the invoice or PDF.
- Selecting “No due date” omits payment terms from the invoice, email, printable view, and PDF.
- Line items with description, quantity and rate
- Quantity arrow controls move in whole numbers, while manually entered decimal quantities remain supported in invoice calculations
- The business name can be edited directly from Preview and updates both the FROM name and business-initial mark
- Multi-word business names use the first letter of the first and last words for the invoice mark
- Valid clients and manually entered line items are saved to Clients and Services & Products when the invoice is previewed, saved, or sent
- Automatically generated mileage lines do not become reusable services or products
- Editing a saved invoice line provides an explicit action to save or update that line in Services & Products
- Sending prepares the same styled invoice shown in Preview as a PDF for the device Share Sheet
- The app stores reusable W-9 identity, classification, and address details locally and can update them at any time
- The app fills the current official IRS W-9 template and can share it beside the invoice PDF
- The taxpayer identification number, signature, and generated signed W-9 are never stored after the current browser session
- A prepared W-9 can be downloaded for inspection before it is included with an invoice
- Edited sent invoices can be sent again from Preview without creating a second invoice
- Existing invoice details provide a clear Resend PDF invoice action and record the latest resend time
- Email and Share are separate actions: Email opens the configured mail app with recipients and invoice content filled in, while Share opens the device Share Sheet with the PDF attached
- Direct email downloads the invoice PDF for manual attachment because browsers cannot add attachments to mailto messages
- The email body includes project, work dates, due date, line-item details, and total so essential invoice content is visible without opening the PDF
- Generated invoice PDF filenames contain the project name, invoice date, and invoice number
- Notes
- Mileage record
- Job costs
- Status and status history
- Created and updated timestamps
- Payment information
- Archive state

## In-progress invoice workspace

- Every editor change is saved locally without requiring the user to press Save draft.
- Returning to New restores the unfinished invoice, including lines, dates, days off, mileage, and job costs.
- Preview is a persistent navigation page and can be revisited after viewing another section.
- Saving or sending the invoice clears the temporary workspace because the invoice is then stored as a normal record.

## Core actions

- Create a blank invoice
- Create an invoice for an existing client
- Save a draft
- Preview
- Generate/share/print PDF
- Mark sent
- Mark viewed
- Record payment and mark paid
- Duplicate
- Edit
- Archive
- Delete with confirmation and undo where practical

## Status behavior

- Draft: incomplete or unsent; yellow visual language
- Sent/Viewed: invoice has left the draft state
- Awaiting Payment: payment is outstanding
- Overdue: unpaid after the due date; red visual language
- Paid: balance is zero; green visual language

Derived status rules must not overwrite the underlying audit history.

## Clients and items

- Clients can be created, edited, archived and reused.
- A client page shows its invoices and supports “New invoice for this client.”
- Services/products can be saved with editable rates.
- Saved items can be duplicated and archived.
- Learning/suggestion behavior must remain reviewable by the user.

## Documents

- PDF output must look professional and remain stable across supported browsers.
- Invoice project name should be used meaningfully in document titles.
- A Spanish document variant is a planned requirement.

## Reliability

- Refresh must preserve the current main tab.
- The New tab must restore to a usable fresh invoice.
- Existing browser data must survive upgrades.
- Offline app-shell loading must be supported.
- Errors must not silently discard edits.

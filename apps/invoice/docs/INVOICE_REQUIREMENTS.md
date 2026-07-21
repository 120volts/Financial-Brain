# Invoice Requirements

## Invoice fields

An invoice must support at minimum:

- Stable internal ID
- Human-readable invoice number
- Client reference, multiple recipient emails, and optional CC/BCC details
- Project name
- Issue date and due date
- Optional service/work start and end dates

Recipient rules:

- “Send to,” CC and BCC accept comma-, semicolon- or line-separated addresses.
- At least one “Send to” address is required before sending.
- Invalid addresses and reversed work date ranges must be rejected.
- BCC recipients are used for email delivery but never displayed on the invoice or PDF.
- Line items with description, quantity and rate
- Notes
- Mileage record
- Job costs
- Status and status history
- Created and updated timestamps
- Payment information
- Archive state

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

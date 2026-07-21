# Product Bible — Financial Brain Invoice

## Mission

Make professional invoicing fast enough to use during real production work, while turning invoice activity into structured financial data that can later support Financial Brain's Dashboard and Taxes modules.

## Product position

The Invoice module is standalone now and integration-ready later. It is not a temporary demo and must not depend on unfinished Financial Brain modules to remain useful.

## Primary user workflow

1. Choose or create a client.
2. Enter a project name.
3. Add saved services, products or custom line items.
4. Add relevant mileage and job costs.
5. Preview a professional invoice.
6. Save as Draft or send it.
7. Track Sent, Viewed, Awaiting Payment, Overdue and Paid states.
8. Generate a payment/tax record when paid.
9. Start another invoice for the same client without re-entering information.

## Experience principles

- The phone is optimized for quick creation, confirmation and status changes.
- The desktop is optimized for detailed review, cleanup and reporting.
- Frequently reused information should be saved and suggested.
- Buttons that look actionable must work.
- Navigation should preserve the user's place after refresh.
- Financial automation should remain visible, reversible and understandable.
- Existing data must never be silently lost.

## Existing capabilities to preserve

- Invoice creation, editing, duplication, archiving and deletion
- Client creation, editing, archive and client-specific invoice history
- Saved services/products with rates
- Draft, Sent/Viewed, Awaiting Payment, Overdue and Paid concepts
- Dashboard counts and status filters
- PDF generation, print view and sharing
- Mileage entry
- Job-cost entry
- Brain event generation
- Paid tax-record generation
- Refresh/tab restoration
- Local browser persistence

## Future ecosystem integration

The module will eventually exchange structured references and events with:

- Clients
- Projects
- Purchases
- Dashboard
- Taxes

Invoice remains the system of record for invoice state and invoice amounts. Other modules consume its events rather than reaching into its interface internals.

# Architecture

## Current state

The v2.3.4 application is a working single-file HTML application containing presentation, business rules, persistence, PDF generation and module-integration behavior. It is preserved as the behavior baseline.

## Target boundaries

```text
UI / Pages / Components
        ↓
Application use cases
        ↓
Invoice domain
        ↓
Repository and service interfaces
        ↓
Local storage now; remote sync later
```

## Planned source areas

```text
src/
  domain/          Invoice entities, values, calculations and events
  application/     Create, update, send, mark viewed, record payment
  infrastructure/  Storage, PDF, email/share and synchronization adapters
  ui/              Pages and reusable components
  shared/          Common utilities and cross-module contracts
```

## Integration rule

Invoice publishes events such as:

- `InvoiceCreated`
- `InvoiceUpdated`
- `InvoiceSent`
- `InvoiceViewed`
- `InvoicePaymentRecorded`
- `InvoicePaid`
- `InvoiceOverdue`
- `InvoiceArchived`

Dashboard and Taxes may consume those events. Invoice must not directly manipulate their screens or private storage.

## Migration strategy

1. Preserve current keys and schemas.
2. Add schema-version metadata.
3. Read old data through a compatibility adapter.
4. Migrate using explicit, idempotent migrations.
5. Back up data before destructive transformations.
6. Test representative v2.3.4 data before release.

## Incremental extraction order

1. Storage access
2. Invoice calculations and validation
3. Domain models and status transitions
4. PDF generation
5. Clients and saved items
6. Brain events and tax integration contracts
7. UI components

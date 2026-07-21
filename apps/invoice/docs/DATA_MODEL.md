# Data Model

## Invoice

```text
Invoice
  id
  number
  clientId / client snapshot
  recipientEmails[]
  ccEmails[]
  bccEmails[]
  projectName
  projectLocation?
  issueDate
  dueDate
  serviceStartDate?
  serviceEndDate?
  lines[]
  mileage
  jobCosts[]
  notes
  status
  statusHistory[]
  payments[]
  archived
  createdAt
  updatedAt
  schemaVersion
```

## InvoiceLineItem

```text
id
savedItemId?
description
quantity
unitRate
lineTotal
category?
```

## Payment

```text
id
invoiceId
amount
paidAt
method?
reference?
notes?
```

## Client

```text
id
name
email
phone?
address?
archived
createdAt
updatedAt
```

## MileageEntry

```text
origin?
destination?
distance
roundTrip
rate
amount
businessPurpose?
```

## JobCost

```text
id
description
amount
category?
purchaseId?
receiptId?
```

## Compatibility

The first typed models must be able to deserialize existing v2.3.4 records. Unknown legacy fields should be preserved when practical rather than discarded.

Legacy invoices that only contain `paidAmount` and `paidAt` are normalized into a single
`payments[]` entry when loaded. New payments retain their own amount, received date,
method, reference and notes. Cash-basis income records are created per payment so a
partial payment never recognizes the invoice's unpaid balance as received income.

Legacy `clientEmail` values are normalized into `recipientEmails[]`. `clientEmail` remains
the primary recipient for compatibility with existing clients and invoice records. CC and
BCC recipients are invoice-specific and are not printed as BCC on client documents.

`projectLocation` accepts either a postal address or recognizable place name. The saved
business starting address uses the compatibility-safe `invoiceApp.businessAddress`
localStorage key. Mileage snapshots retain the actual origin and destination used.

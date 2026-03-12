---
next: false
prev: false
aside: false
---

# PII Schema — POST /payments

The schema below shows the full structure of the `PersonalIdentifiableInformation` field as it must be constructed for the **payment creation** step (`POST /payments`). Note that `DebtorAccount` is absent at this stage — the debtor account is fixed by the consent authorisation flow. The creditor fields sit directly on `Initiation` rather than inside an array.

<RedocWrapper
  spec="/openapi/v2.1/standards/uae-bank-initiation-openapi.yaml"
  filterSchema="AEBankServiceInitiation.AEDomesticPaymentPIIProperties"
  displayPath="/payment.PersonalIdentifiableInformation"
/>

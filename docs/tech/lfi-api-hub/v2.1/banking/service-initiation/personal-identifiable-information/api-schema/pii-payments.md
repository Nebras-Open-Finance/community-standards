---
next: false
prev: false
aside: false
---

# PII Schema — Payments (Ozone Connect)

The schema below shows the full structure of the decrypted `PersonalIdentifiableInformation` payload as received with a **payment instruction** via Ozone Connect. This is the PII the LFI MUST decrypt and validate before processing a payment.

At this stage, `DebtorAccount` is absent — the debtor account was fixed during consent authorisation. The creditor fields sit directly on `Initiation` as a single creditor (not inside an array). See the [Overview](../) for decryption steps.

<RedocWrapper
  spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml"
  filterSchema="AEBankServiceInitiation.AEDomesticPaymentPIIProperties"
  displayPath="/payment.PersonalIdentifiableInformation"
/>

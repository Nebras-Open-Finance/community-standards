---
next: false
prev: false
aside: false
---

# PII Schema — Consent (Consent Manager)

The schema below shows the full structure of the decrypted `PersonalIdentifiableInformation` payload as received during **consent authorisation** via the Consent Manager. This is the PII the LFI MUST decrypt and validate before authorising a payment consent.

At this stage, the PII includes the `Initiation.Creditor` array (1–10 entries, or omitted for open beneficiary) and optionally `Initiation.DebtorAccount`. See the [Overview](../) for decryption steps.

<RedocWrapper
  spec="/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml"
  filterSchema="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
  displayPath="/consent.PersonalIdentifiableInformation"
/>

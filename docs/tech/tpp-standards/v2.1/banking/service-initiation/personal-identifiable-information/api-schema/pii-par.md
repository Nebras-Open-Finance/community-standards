---
next: false
prev: false
aside: false
---

# PII Schema — POST /par

The schema below shows the full structure of the `PersonalIdentifiableInformation` field as it must be constructed for the **consent staging** step (`POST /par`). The encrypted form (`AEJWEPaymentPII`) is what must be sent — the object variants document the payload to sign and encrypt.

<RedocWrapper
  spec="/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml"
  filterSchema="AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
  displayPath="/consent.PersonalIdentifiableInformation"
/>

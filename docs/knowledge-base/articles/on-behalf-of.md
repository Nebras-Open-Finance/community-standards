---
title: "OnBehalfOf — When to Use It and When Not To"
description: "When to populate OnBehalfOf in PAR requests, which consent types support it, and how payment (service initiation) consents handle merchant identity via creditor fields instead."
next: false
prev: false
---

# OnBehalfOf — When to Use It and When Not To

`OnBehalfOf` appears in **Bank Data Sharing** and **Insurance Data Sharing** PAR schemas to declare that the TPP is acting on behalf of another regulated entity.

For **Bank Service Initiation (payment) PARs**, `OnBehalfOf` is not used. For payment initiation the recipient of the funds is represented via the creditor fields — specifically the encrypted `consent.PersonalIdentifiableInformation.Initiation.Creditor.Name` data field.



## When to Use OnBehalfOf

Populate `OnBehalfOf` when the caller (TPP) is requesting authorisation for **bank or insurance data sharing only**, but is doing so on behalf of another legal or regulated entity:

- A TPP provides technology services to an LFI and stages the PAR on behalf of that LFI.
- A licensed aggregator or reseller acts as the technical integration layer for another regulated entity.

If the TPP is representing itself (no other regulated entity is involved), `OnBehalfOf` is not required.



## The OnBehalfOf Object

```json
{
  "TradingName": "string",
  "LegalName": "string",
  "IdentifierType": "string",
  "Identifier": "string"
}
```

| Field | Description |
|-------|-------------|
| `TradingName` | The trading name of the entity being represented. |
| `LegalName` | The registered legal name of the entity. |
| `IdentifierType` | Identifier scheme — currently `"Other"` in the published schema. |
| `Identifier` | The identifier value for the represented entity. |



## Where OnBehalfOf Appears

| Consent type | OnBehalfOf supported? | Notes |
|---|---|---|
| Bank Data Sharing | Yes | Declare the legal entity the TPP is acting for within the rich authorisation request. |
| Insurance Data Sharing | Yes | References a common `AEOnBehalfOf` object — same intent and fields. |
| Bank Service Initiation (payments) | **No** | Not used. Merchant identity is carried via the creditor fields in the payment consent. |



## Payment Consents: Use Creditor Fields Instead

For payment consents, the user must be shown who the payment is going to. This information is provided via the creditor fields in the payment consent — not via `OnBehalfOf`.

Populate the creditor fields so the LFI can display the recipient (merchant/payee) to the user:

- Prefer **`Creditor.Name`** when it is provided.
- If `Creditor.Name` is not present, fall back to **`CreditorAccount.Name.en`** or **`CreditorAccount.Name.ar`** as applicable.

This ensures the user sees a meaningful recipient name when authorising the payment.

::: warning
Do not attempt to carry merchant identity in an `OnBehalfOf` object for payment consents — it is not part of the service initiation schema and will be ignored or rejected.
:::

### Merchant Name on the Authorisation Page

If the TPP populates `Risk.CreditorIndicators.MerchantDetails.MerchantName` in the PII payload, the LFI **must** reflect this on the authorisation page by displaying the merchant name in the permission header:

> **[TPP trading name] needs your permission on-behalf of [MerchantName] to make the payment below:**

When `MerchantName` is not present, the standard wording is shown:

> **[TPP trading name] needs your permission to make the payment below:**

This allows TPPs acting as a payment facilitator or aggregator on behalf of a sub-merchant to surface that merchant's identity clearly to the user at the point of authorisation.



## Examples

### Bank Data Sharing PAR (with OnBehalfOf)

Use this structure when the TPP is staging the PAR on behalf of another regulated entity:

```json
{
  "type": "urn:openfinanceuae:bank-data-sharing-consent:v2.1",
  "consent": {
    "Permissions": ["ReadAccountsBasic", "ReadBalances"],
    "ExpirationDateTime": "2026-02-21T12:00:00+00:00",
    "OnBehalfOf": {
      "TradingName": "Acme Aggregation Ltd",
      "LegalName": "Acme Aggregation Limited",
      "IdentifierType": "Other",
      "Identifier": "AA-TPP-12345"
    }
  }
}
```

### Bank Service Initiation PAR (payment) — creditor fields for merchant identity

Use the creditor fields to identify the payment recipient — not `OnBehalfOf`:

```json
{
  "type": "urn:openfinanceuae:bank-service-initiation-consent:v2.1",
  "consent": {
    "PersonalIdentifiableInformation": {
      "Initiation": {
        "Creditor": {
          "Name": "Example Merchant Ltd"
        },
        "CreditorAccount": {
          "Name": {
            "en": "Example Merchant",
            "ar": "مثال التاجر"
          }
        }
      }
    }
  }
}
```

::: info
In production, `PersonalIdentifiableInformation` is a JWE encrypted with the LFI's encryption key. The structure above shows the decrypted payload for illustration.
:::



## Implementation Checklist

- If acting on behalf of another regulated entity, include `OnBehalfOf` in **Bank Data Sharing** or **Insurance Data Sharing** PARs.
- For payment consents, populate **`Creditor.Name`** — or **`CreditorAccount.Name.en`** / **`CreditorAccount.Name.ar`** if `Creditor.Name` is not available — so the LFI can display the recipient to the user.
- If the TPP is acting as a payment facilitator for a sub-merchant, populate **`Risk.CreditorIndicators.MerchantDetails.MerchantName`** in the PII payload so the LFI can display the merchant name on the authorisation page.
- Do **not** use `OnBehalfOf` in service initiation (payment) PARs.

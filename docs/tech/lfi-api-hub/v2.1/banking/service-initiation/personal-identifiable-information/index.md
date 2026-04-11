---
next: false
prev: false
aside: false
---

# Personal Identifiable Information (PII)

Every payment instruction carries sensitive data about who is paying and who is receiving the funds — creditor account details, optional debtor account, and risk indicators. This data is collectively referred to as **Personal Identifiable Information (PII)**.

PII arrives at the LFI as an **encrypted JWE string** in the `PersonalIdentifiableInformation` field. The API Hub passes the JWE through without inspection — it cannot read or validate the contents. This means:

- **The LFI is solely responsible for decrypting and validating PII.**
- The PII has **not been schema-validated** by the API Hub.
- The PII content has **not been read or inspected** by any intermediary.

::: warning LFI validation is mandatory
Unlike other fields in the consent or payment request — which the API Hub validates against the OpenAPI specification before forwarding — PII is opaque to the API Hub. The LFI MUST decrypt, parse, and validate the PII independently against the schema defined in the OpenAPI specification. A malformed or invalid PII payload MUST be rejected by the LFI.
:::

## When PII is received

PII is present at **two points** in the payment lifecycle:

| Stage | Source | Field |
|-------|--------|-------|
| Consent authorisation | Consent Manager → LFI | `consent.PersonalIdentifiableInformation` |
| Payment creation | Ozone Connect → LFI | `payment.PersonalIdentifiableInformation` |

The structure of the decrypted PII differs between the two stages — see [PII (Consent - Consent Manager)](./api-schema/pii-par) and [PII (Payments - Ozone Connect)](./api-schema/pii-payments) for the full schemas.

## Why PII is encrypted

Payment consents are stored centrally at the API Hub. Because the API Hub acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that the API Hub, and any other party in transit, cannot read the sensitive payment details.

The encryption uses the LFI's public encryption key ([Enc1](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#enc1-encryption-key)). Only the LFI can decrypt the payload using the corresponding Enc1 private key.

## LFI responsibilities

Because the API Hub cannot inspect PII, the LFI takes on additional responsibilities compared to other parts of the request:

| Responsibility | Description |
|----------------|-------------|
| **Decryption** | Decrypt the JWE using the Enc1 private key — see [How to Decrypt PII](./api-guide/decrypt-pii) |
| **Schema validation** | Validate the decrypted payload against the OpenAPI schema — no additional properties are permitted |
| **Field validation** | Verify mandatory fields, IBAN format, BIC consistency, and creditor matching rules |
| **Rejection** | Return an error if PII is malformed, missing required fields, or fails validation |

## Structure of the PII payload

The decrypted PII contains two top-level sections:

| Property | Description |
|----------|-------------|
| `Initiation` | Creditor and debtor account details — structure differs between consent and payment stages |
| `Risk` | Fraud and risk indicators about the debtor, transaction, and creditor |

**At consent time (`POST /par`):**
- `Initiation.Creditor` is an **array** of 1–10 creditor entries (or omitted for open beneficiary)
- `Initiation.DebtorAccount` is optionally present

**At payment time (`POST /payments`):**
- Creditor fields sit **directly on `Initiation`** as a single creditor (not an array)
- `DebtorAccount` is **absent** — the debtor account was fixed during consent authorisation

---
next: false
prev: false
aside: false
---

# Personal Identifiable Information (PII)

Every payment instruction carries sensitive data about who is paying and who is receiving the funds. This data — the creditor account details, optional debtor account, and risk indicators — is collectively referred to as **Personal Identifiable Information (PII)**.

PII is encrypted and embedded at **two points** in the payment lifecycle:

| Stage | Endpoint | PII form |
|-------|----------|----------|
| Consent staging | `POST /par` | Embedded in `consent.PersonalIdentifiableInformation` |
| Payment creation | `POST /payments` | Embedded in `payment.PersonalIdentifiableInformation` |

The `Risk` structure is the same at both stages. `DebtorAccount` is **only present at `POST /par`** — by the time `POST /payments` is called, the debtor account has already been fixed through the consent authorisation flow. The creditor data also differs between stages — both in structure and cardinality. See [Creditor](./creditor) for the full breakdown.

## Why PII is encrypted

Payment consents are stored centrally at **Nebras**, the UAE Open Finance Hub. Because Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that Nebras, and any other party in transit, cannot read the sensitive payment details.

The encryption uses the destination LFI's public key (see [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption)). Only the LFI can decrypt the payload. Nebras passes the opaque JWE through without inspection — all PII validation is performed by the LFI after the consent is authorised.

## Structure of the PII object

The `PersonalIdentifiableInformation` field is defined as a `oneOf`:

| Variant | Form | Purpose |
|---------|------|---------|
| **Domestic Payment PII Schema Object** | object | Unencrypted reference form for domestic payments |
| **International Payment PII Schema Object** | object | Unencrypted reference form for international payments |
| **Encrypted PII Object** (`AEJWEPaymentPII`) | string (compact JWE) | **The form that MUST be sent** at both `POST /par` and `POST /payments` |

The two object variants document the structure implementers MUST follow when constructing the PII payload before encryption. The encrypted form — `AEJWEPaymentPII` — is a compact JWE string wrapping a signed JWS containing the serialised PII JSON.

## The PII payload structure

The structure of the unencrypted PII differs between the two stages.

**At `POST /par` (consent staging):**

```json
{
  "Initiation": {
    "DebtorAccount": { ... },       // optional — see Debtor Account
    "Creditor": [                   // array of creditor entries — see Creditor
      {
        "CreditorAgent": { ... },
        "Creditor": { "Name": "..." },
        "CreditorAccount": { ... },
        "ConfirmationOfPayeeResponse": "..."
      }
      // ... up to 10 entries; omit array entirely for open beneficiary
    ]
  },
  "Risk": { ... }                   // required — see Risk
}
```

**At `POST /payments` (payment creation):**

```json
{
  "Initiation": {
    "CreditorAgent": { ... },               // flat on Initiation — not inside an array
    "Creditor": { "Name": "..." },
    "CreditorAccount": { ... },
    "ConfirmationOfPayeeResponse": "..."
  },
  "Risk": { ... }
}
```

The key difference: at `POST /par` the creditor data is inside an `Initiation.Creditor[]` array (allowing 1–10 entries, or omitted for open beneficiary). At `POST /payments` the same fields sit directly on `Initiation` as a single creditor.

| Property | POST /par | POST /payments |
|----------|-----------|----------------|
| `Initiation.DebtorAccount` | Optional object | **Not present** — debtor account is fixed by consent |
| `Initiation.Creditor` | **Array** of creditor entry objects (0–10) | **Object** — the party name/address (`{ Name, PostalAddress }`) |
| `Initiation.CreditorAccount` | Nested inside each `Creditor[]` entry | Direct field on `Initiation` |
| `Initiation.CreditorAgent` | Nested inside each `Creditor[]` entry | Direct field on `Initiation` |
| `Initiation.ConfirmationOfPayeeResponse` | Nested inside each `Creditor[]` entry | Direct field on `Initiation` |
| `Risk` | Required object | Required object |

See the sub-pages for full schema and rules:

- [Debtor Account](./debtor-account) — optional at `POST /par` only; not part of the `POST /payments` PII
- [Creditor](./creditor) — consent-time models (single/multiple/open), payment-time structure, and match requirements
- [Risk](./risk) — debtor and creditor risk indicators


## Decentralised validation

Because PII is encrypted using the LFI's public key, **Nebras cannot decrypt or validate it**. The LFI is solely responsible for decrypting and validating the PII — at consent time and at payment time.

Validation is therefore performed independently by each LFI rather than centrally. The standards place explicit validation requirements on every LFI — each LFI must validate the decrypted PII against the schema before accepting a consent or processing a payment.

::: warning TPPs must understand LFI validation
A consent that is accepted by one LFI may be rejected by another if the PII does not meet the required format. TPPs should ensure that the PII they construct is strictly valid according to the schema for the payment type being instructed.

See [Creditor](./creditor) for the specific validation rules that LFIs apply to the `Creditor` array for domestic payments.
:::

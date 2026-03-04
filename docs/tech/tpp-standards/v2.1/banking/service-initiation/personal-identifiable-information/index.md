---
next: false
prev: false
aside: false
---

# Personal Identifiable Information (PII)

Every payment consent carries sensitive data about who is paying and who is receiving the funds. This data — the creditor account details, optional debtor account, and risk indicators — is collectively referred to as **Personal Identifiable Information (PII)**.

## Why PII is encrypted

Payment consents are stored centrally at **Nebras**, the UAE Open Finance Hub. Because Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that Nebras, and any other party in transit, cannot read the sensitive payment details.

The encrypted PII is embedded in the consent's `PersonalIdentifiableInformation` field at `POST /par` time and is only decryptable by the destination LFI using their private key.

## Structure of the PII object

The `consent.PersonalIdentifiableInformation` property in `AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties` is defined as a `oneOf`:

| Variant | Form | Purpose |
|---------|------|---------|
| **Domestic Payment PII Schema Object** | object | Unencrypted reference form for domestic payments |
| **International Payment PII Schema Object** | object | Unencrypted reference form for international payments |
| **Encrypted PII Object** (`AEJWEPaymentPII`) | string (compact JWE) | **The form that MUST be sent in the PAR request** |

The two object variants show the structure that implementers MUST follow when building the PII payload before encryption. The encrypted form — `AEJWEPaymentPII` — is a compact JWE string that wraps a signed JWS containing the serialized PII JSON.

## The PII payload structure

The unencrypted PII object (domestic payments) has two top-level properties:

```json
{
  "Initiation": {
    "DebtorAccount": { ... },   // optional — see Debtor Account
    "Creditor": [ ... ]         // required — see Creditor
  },
  "Risk": { ... }               // required — see Risk
}
```

| Property | Required | Description |
|----------|----------|-------------|
| `Initiation.DebtorAccount` | No | The account making the payment, when known to the TPP |
| `Initiation.Creditor` | Yes | One or more creditor entries defining who will receive the payment |
| `Risk` | Yes | Risk and fraud indicators for the transaction |

See the sub-pages for the full schema of each section:

- [Debtor Account](./debtor-account) — when and how to provide the payer's account
- [Creditor](./creditor) — single beneficiary, multiple beneficiaries, and open beneficiary models
- [Risk](./risk) — debtor and creditor risk indicators

## Decentralised validation

Because PII is encrypted using the LFI's public key (see [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption)), **Nebras cannot decrypt or validate it**. Nebras passes the opaque JWE through to the LFI without inspection — the LFI is solely responsible for decrypting and validating the PII after the user authorises the consent.

This means validation is performed independently by each LFI rather than centrally, which creates the possibility of varied behaviour across institutions. To address this, the standards place explicit validation requirements on every LFI — each LFI must validate the decrypted PII against the schema before accepting a consent.

::: warning TPPs must understand LFI validation
A consent that is accepted by one LFI may be rejected by another if the PII does not meet the required format. TPPs should ensure that the PII they construct is strictly valid according to the schema for the payment type being instructed.

See [Creditor](./creditor) for the specific validation rules that LFIs apply to the `Creditor` array for domestic payments.
:::

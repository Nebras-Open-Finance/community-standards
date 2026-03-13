---
title: "Payment PII Encryption — Why It Exists and What It Means for You"
description: "Why personal identifiable information in payment consents is encrypted end-to-end, what that means for LFI validation responsibility, TPP onboarding care, and how creditor rules differ by payment type."
next: false
prev: false
---

# Payment PII Encryption — Why It Exists and What It Means for You

When a TPP initiates a payment, sensitive details about the payer and payee — names, account numbers, risk context — are included in the consent request. These details are collectively referred to as **Personal Identifiable Information (PII)**.

In the UAE Open Finance framework, this PII is **encrypted end-to-end** using the LFI's public encryption key before it ever leaves the TPP. Nebras receives the encrypted blob and passes it through — but cannot read, inspect, or validate it. Only the LFI, holding the corresponding private key, can decrypt and act on the data.



## Why Is PII Encrypted?

The core reason is **data privacy**: the PII inside a payment consent contains account holder names, IBANs, and other personal details that have no business being visible to any party other than the LFI processing the payment.

Nebras operates as a central hub holding the consents. Without encryption, Nebras would have visibility into every creditor account, debtor name, and transaction risk indicator across all payment flows on the platform. Encrypting the PII directly to the LFI's key ensures that Nebras acts purely as a routing layer, with no access to the personal data it carries.

This design also means if the central hub were ever compromised, the PII within payment consents would remain unreadable.



## What Is Encrypted?

The encrypted payload — called `PersonalIdentifiableInformation` — is embedded in the requests at two points:

| When | Where | Contains |
|------|-------|----------|
| Consent creation | `POST /par` — inside `authorization_details` | Debtor account details, creditor account(s), risk indicators |
| Each payment request | `POST /payments` | The specific creditor for that payment, risk indicators |

Each encryption is fresh — the TPP re-encrypts a new payload each time, using the LFI's current public key. The two payloads (consent-time and payment-time) are independently validated by the LFI after decryption.



## What This Means for LFIs

Because Nebras cannot read the PII, **LFIs bear full responsibility for validating it** after decryption. This includes:

- Confirming that the PII payload conforms to the schema (`AEDomesticPaymentPIIProperties` for domestic payments).
- Validating mandatory fields — at minimum `CreditorAccount.Identification` (a valid UAE IBAN) and at least one of `CreditorAccount.Name.en` or `CreditorAccount.Name.ar`.
- Comparing the creditor supplied at `POST /payments` against the creditor(s) recorded in the consent PII, and rejecting the payment if they do not match.

A payment rejected at the LFI due to malformed or mismatched PII is not surfaced as an API Hub error — it appears as a payment-level rejection. LFIs should return clear error responses so that TPPs can diagnose and correct the issue.



## What This Means for TPPs

Because PII validation happens entirely inside the LFI after decryption, errors in the encrypted payload **are not caught centrally**. A consent or payment may be accepted by the API Hub and then rejected by the LFI.

**When onboarding with a new LFI, take extra care:**

- Confirm the exact field names, nesting structure, and data types the LFI expects. While the schema is standardised, LFIs may have specific expectations — for example, BIC format (8 vs 11 characters) or name field encoding.
- Test end-to-end with the LFI before going live. A successful `POST /par` response only means the API Hub accepted the request — it does not mean the LFI successfully decrypted and validated the PII inside it.
- Ensure the creditor details you encrypt exactly match what you intend: for single and multiple beneficiary consents, even a minor discrepancy (whitespace, encoding difference) in the account name can cause payment rejection.



## How Creditor Rules Differ by Payment Type

The number of creditor entries you may include in the consent PII depends on the payment type. This determines the **beneficiary model** and constrains what creditors can be used at payment time.

### Single-beneficiary payment types

The following payment types accept **exactly one creditor entry** in `Initiation.Creditor[]`. The consent is bound to that single recipient — all payments under the consent must go to that account.

- Single Instant Payment
- Fixed Defined Schedule
- Variable Defined Schedule
- Fixed On-Demand
- Fixed Periodic Schedule
- Variable Periodic Schedule

### Flexible beneficiary payment types

The following payment types support all three beneficiary models, giving TPPs more flexibility at the cost of additional validation complexity:

| Model | `Initiation.Creditor[]` | Effect |
|-------|------------------------|--------|
| **Open beneficiary** | Omitted | No creditor fixed at consent time — each `POST /payments` specifies a fresh creditor |
| **Single beneficiary** | 1 entry | All payments under the consent go to that one account |
| **Multiple beneficiaries** | 2–10 entries | Each payment specifies one of the pre-approved accounts |

Payment types that support all three models:

- **Variable On-Demand**
- **Delegated SCA**

For multiple and open beneficiary consents the LFI still validates each individual payment's creditor against the same field and IBAN rules — the flexibility is in who the creditor can be, not in bypassing validation.

See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor) for the full matching rules and field validation requirements, and [Personal Identifiable Information](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/) for the complete schema reference.

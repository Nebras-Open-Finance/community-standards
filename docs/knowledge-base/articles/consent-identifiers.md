---
title: "Consent Identifiers — Why PSU and Account IDs Must Be Opaque"
description: "Why any identifier patched onto a consent (psuIdentifiers, accountIds) must be an opaque, non-sensitive, stable LFI-defined value."
category: Consents
readTime: "6 min"
updated: "2026-04-21"
tags:
  - Consents
  - PSU Identifiers
  - Data Protection
next: false
prev: false
---

# Consent Identifiers — Why PSU and Account IDs Must Be Opaque

When an LFI authorises a consent, it patches identifiers onto it — the PSU who authenticated (`psuIdentifiers`) and the accounts the PSU selected (`accountIds`). These values are stored centrally in the API Hub and used to enrich every subsequent TPP request proxied to the LFI.

Because these values live outside the LFI's own systems, they MUST be **opaque internal references** — never the underlying personal or account data they point to.

## The Rule

Any value patched onto a consent MUST NOT be a sensitive or personally identifiable value. An LFI MUST NOT use any of the following as an identifier on the consent:

- Emirates ID, passport number, or any regulated national identifier
- Full name, date of birth, email, or mobile number
- IBAN, account number, card number, or PAN
- CIF number or any other internal identifier that maps 1:1 to regulated data

The identifier MUST be an LFI-defined opaque reference that is meaningful only inside the LFI's own systems. The LFI resolves it back to the real customer or account internally when processing a request.

## Why

The API Hub is the central consent store for UAE Open Finance. Consents — including the identifiers patched onto them — are persisted centrally, visible to operators of the API Hub, and surface in operational logs and reports. They are long-lived and outlive individual sessions.

Storing sensitive values on the consent would leak PII outside the LFI's boundary, create a durable record of regulated data the LFI cannot unwind, and break the trust model where the API Hub receives only opaque handles from the LFI.

The same principle governs payment PII, which is encrypted end-to-end to keep personal data opaque to the hub — see [PII Encryption](./pii-encryption).

## Format Rules

| Identifier | Requirement |
|------------|-------------|
| `psuIdentifiers.userId` | Opaque string. Stable per PSU (same value across all their consents). Unique within the LFI. UUID v4 recommended. |
| `accountIds[]` | Array of opaque strings, 1–40 chars each, `minItems: 1`. Each value MUST match the `AccountId` the LFI returns from its `/accounts` APIs. Immutable once issued. UUID v4 recommended. |

For Bank Service Initiation consents, `accountIds` MUST contain exactly one element — the debtor account. For Bank Data Sharing, it MUST contain every account the PSU selected.

**The guiding principle: the consent is a central record, not a private LFI record. Anything the LFI puts on it MUST be meaningless to any party other than the LFI itself.**

---
title: "Base Consent ID (consentGroupId) – How to Link Consents"
description: "How to use a Base Consent ID to link related consents within a TPP's service, and when it applies."
---

# How to Link Consents — Base Consent ID (`consentGroupId`)

The **Base Consent ID** (`consentGroupId`) serves as a persistent reference that links related consents within a TPP's service. It allows a common identifier to persist across multiple consents that belong to the same logical group — initiated by the same user and for the same service.

This is used to enable a more coherent and user-friendly presentation of consent within **Consent Management Interfaces (CMIs)** provided by both TPPs and LFIs.



## When Should a Base Consent ID Be Used?

### Consent Continuation

When a user's consent has **expired** (i.e., the `ExpirationDateTime` is in the past), but the user wishes to continue using the TPP's service, the TPP must create a new consent (with a new `consentId`) for the same permissions.

To maintain continuity, the TPP should set the **original `ConsentId`** as the `BaseConsentId` for the new consent.

::: warning Important
If the original consent already had a `BaseConsentId`, the TPP **must reuse that same `BaseConsentId`**, not the immediate prior `ConsentId`. This ensures the entire chain of consents is consistently linked.
:::



### Consent Re-establishment After Revocation

If a user **revokes** consent and later wants to re-establish access to the TPP's services, the TPP should create a new consent with the same permissions.

As with consent continuation, the TPP should reference the original `ConsentId` as the `BaseConsentId` — or, if applicable, reuse the existing `BaseConsentId` — to maintain the logical association.



### Consent Update (Permission Expansion)

Suppose a user originally grants consent with specific permissions (e.g., `ReadAccountsBasic`, `ReadAccountsDetail`, `ReadBalances`), and the TPP later introduces new functionality (e.g., access to `ReadDirectDebits`). If the user opts in to this expanded scope, the TPP should:

1. Create a new consent with the updated set of permissions.
2. Revoke the old consent.
3. Link the new consent to the original one by referencing the appropriate `BaseConsentId`.



### User Identity Consistency

It is assumed that all consents linked via a `BaseConsentId` are associated with the **same end user**. Therefore, if during authentication the LFI determines that the `userId` associated with a newly submitted consent **differs** from the user who authorised the previous consent in the chain, the LFI **should reject** the new consent.



## Summary

| Scenario | Action |
|---|---|
| Consent expired, user continues service | Set original `ConsentId` as `BaseConsentId` |
| Consent revoked, user re-establishes access | Set original `ConsentId` (or existing `BaseConsentId`) as `BaseConsentId` |
| Permissions expanded | Create new consent, revoke old, link via `BaseConsentId` |
| User identity mismatch detected | LFI rejects the new consent |

::: tip Chain integrity
Always trace back to the **root** `ConsentId` when setting `BaseConsentId`. Never use the most recent consent in a chain as the `BaseConsentId` if it already has one — doing so would break the link back to the original consent.
:::

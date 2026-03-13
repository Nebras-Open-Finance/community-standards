---
prev: false
next: false
aside: false
---

# Consent Requirements

These requirements apply to all TPPs operating within UAE Open Finance, regardless of the service type. They are assessed as part of the [Functional Evidence](../../../../testing-certification/functional) certification process.


## Minimal Scope

A consent must be **minimally scoped** — it may only request the permissions genuinely necessary to deliver the service being offered to the user at the time of authorisation.

Requesting permissions speculatively, in anticipation of future features, or as a blanket grant is not permitted. If a TPP's service requires only account balances, it must not also request transaction history or beneficiary data.

::: warning
LFIs may reject a consent at the `/par` stage if the `authorization_details` object contains values that are unsupported or disproportionate to the service offered and described via the [`/participants` endpoint](../../trust-framework/api-discovery/). This includes:

- A `Permissions` set broader than the service the LFI supports
- Field values the LFI does not support — for example, requesting `AccountSubType: CreditCard` at an LFI that only supports `CurrentAccount` and `Savings`
:::


## Consent Duration

A consent's `ExpirationDateTime` must not exceed **one year** from the date of consent creation. Consents submitted with an expiry beyond this limit will be rejected by the API Hub.

The `ExpirationDateTime` must reflect the minimum period required for the service. A consent must not be issued with an unnecessarily long expiry when the underlying service covers a shorter, defined period.

## Explicit User Consent

Before any protected resource is accessed, the user must be presented with a clear, accurate consent screen at the LFI and must take an affirmative action to approve it.

The consent screen is rendered by the LFI during the authorization flow and is driven directly by the `authorization_details` submitted in the `/par` request — the permissions, account scope, and expiry the user sees must exactly match what the TPP requested. TPPs must not present users with a pre-consent screen that describes a different scope than what is ultimately submitted to `/par`.

Each service type has a defined user experience standard that governs what must be shown to the user. The consent and authorisation screens for each service type are documented in the corresponding User Experience pages e.g. [Bank Data Sharing User Experience](../banking/data-sharing/user-journeys)


## Maintaining Consent State Accuracy

A TPP must maintain an accurate and up-to-date record of every consent it holds in its own systems. The state of a consent can change at any time — the user may revoke it directly at the LFI, the LFI may suspend it, or it may expire — without the TPP initiating the change.

This record must be kept current and must be accurately reflected in the [Consent Management Interface](./consent-management-interface) the TPP exposes to its users, so that users can always see exactly what they have consented to and take action to revoke or amend it.

TPPs have two mechanisms to keep their records in sync with the LFI:

### Polling

The TPP periodically calls the consent status endpoint to check the current state:

- `GET /account-access-consents/{ConsentId}` for Bank Data Sharing consents
- `GET /payment-consents/{ConsentId}` for Bank Service Initiation consents

Polling should be performed at a reasonable interval. Excessive polling rates are subject to rate limiting by LFIs.

### Webhooks (Event Subscriptions)

[Dead link](../dead-link) (NEEDS DOING)
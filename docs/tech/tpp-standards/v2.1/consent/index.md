---
prev: false
next: false
aside: false
---

# Consent

A **Consent** is an authorisation object that represents a user's explicit permission for a TPP to access their data or initiate services at an LFI. Every protected resource request in UAE Open Finance is bound to a consent — there is no access without one.

There are two types of consent, corresponding to the two service families:

| Type | Used for | Created via |
|------|----------|-------------|
| **Bank Data Sharing** | Reading account data, balances, transactions, and related resources | `authorization_details` with `type: urn:openfinanceuae:account-access-consent:v2.1` |
| **Bank Service Initiation** | Initiating payments | `authorization_details` with `type: urn:openfinanceuae:payment-consent:v2.1` |

## API Hub as the source of truth

The API Hub maintains all Open Finance consents and acts as the **authoritative system of record** for consents across the ecosystem. All consent creation, modification, and revocation events are recorded within the API Hub to ensure a single, consistent source of truth.

Whenever a TPP initiates a request to access customer data or initiate a payment, the request is validated against the consent record stored in the API Hub.

To maintain ecosystem-wide consistency consent updates such as status changes must be synchronized with the API Hub.

## Consent immutability after staging

Once a consent is staged, the **only field under `Data` that may change is `Status`**. All other `Data` values are fixed for the lifetime of that consent. `Subscription` and `Meta` may be patched, but they sit outside the `Data` object. See the request/response models in the OpenAPI (e.g. `/tpp-standards/v2.1/consent/open-api/account-access-consents`) for the canonical structure.

If a user needs to change any `Data` value (for example, adjust `ExpirationDateTime` or add/remove a permission), the TPP must create a **new consent**, revoke the previous one, and link the two via `BaseConsentId`.


## Accessing a Protected Resource

Resources secured with **`UserOAuth2Security`** require user involvement — the user must authenticate with the LFI and explicitly authorise the consent before the TPP can access any resource on their behalf.

Two independent conditions must both be satisfied before the API Hub will serve a `UserOAuth2Security` resource:

### 1. A valid Access Token

Requests must carry a Bearer access token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

Access tokens are short-lived (10-minute lifetime) and are bound to the consent they were issued for. See [Tokens & Assertions](../../../security/tokens/) for the full token lifecycle.

### 2. An Authorized Consent

The consent referenced in the access token's `authorization_details` must be in the `Authorized` state. The `authorization_details` object defines the exact scope of access — which permissions are granted, to which endpoints, for which accounts, and for how long.

::: warning
The API Hub **must** reject all requests to `UserOAuth2Security` resources where the associated consent is not in the `Authorized` state — including consents that are `AwaitingAuthorization`, `Suspended`, `Expired`, `Revoked`, `Rejected`, or `Consumed`.
:::


## Consent States

A consent moves through a defined set of states during its lifecycle. Your application must track these states and respond appropriately — particularly to terminal states, which require a new consent flow.

<ImageViewer
  src="/images/journeys/consent-states.png"
  alt="Consent state machine — states and transitions"
/>

### AwaitingAuthorization

The initial state for all consents. The TPP has submitted a Rich Authorization Request (RAR) via `/par` and is waiting for the user to authenticate with the LFI and authorise the consent.

If the LFI requires multiple authorizers (e.g. joint account), the consent remains in `AwaitingAuthorization` until all required parties have authorized.


### Authorized

The consent has been fully authorized and is active. The TPP may make resource requests referencing this consent.

The consent leaves `Authorized` when one of the following occurs:

- Fully used (Service Initiation only) → `Consumed`
- `ExpirationDateTime` reached → `Expired`
- User revokes it → `Revoked`
- LFI temporarily blocks it → `Suspended`

### Rejected

The consent moves from `AwaitingAuthorization` to `Rejected` when:

- The user declines at the LFI's authorization screen, or
- The LFI rejects the consent during processing

`Rejected` is a **terminal state**. The TPP must submit a new `/par` request with a fresh `ConsentId` to restart the flow.

### Suspended

The LFI moves the consent from `Authorized` to `Suspended` when it temporarily blocks access — for example, if the user's Emirates ID has expired and must be renewed before access can be restored.

Once the block is cleared, the LFI must return the consent to `Authorized`. `Suspended` is **not** a terminal state.

### Consumed

The consent moves from `Authorized` to `Consumed` when the action it covers has been fully used.

`Consumed` is a **terminal state**.

::: info Data Sharing consents cannot be Consumed
`Consumed` applies **only to Service Initiation consents**. A Data Sharing consent can never move to `Consumed` under any circumstances.
:::

### Expired

The consent moves from `Authorized` or `Suspended` to `Expired` when it reaches its `ExpirationDateTime`.

`Expired` is a **terminal state**. The TPP must prompt the user to re-consent and begin a new authorization flow with a new `ConsentId`.

### Revoked

The consent moves from `Authorized` or `Suspended` to `Revoked` when the user explicitly revokes it — either through the TPP's consent management interface or directly at the LFI.

`Revoked` is a **terminal state**.


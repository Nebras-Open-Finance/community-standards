---
next: false
prev: false
aside: false
---

# Consent States

A Consent moves through a defined set of states during its lifecycle. Understanding these transitions is essential for handling authorization failures, expired consents, and revocations correctly in your application.

<img src="/images/journeys/consent-states.png" alt="Consent state machine diagram" style="margin: 2rem 0;" />

## States

### AwaitingAuthorization

This is the initial state for all consents.

The TPP submits one or more Rich Authorization Requests (RARs), each containing one or more Consent objects, to the Authorization Server via `/par`. The consent is in a pending state waiting for the user to authenticate with the LFI and authorize it.

If multiple authorizers are required, the consent **must** be authorized by all authorizers as per the authorization matrix of the LFI. It will remain in `AwaitingAuthorization` until all required authorizations are completed.

::: warning Requests blocked in this state
Requests from TPPs for Data Sharing or Service Initiation **must** be rejected where the Consent is in the `AwaitingAuthorization` state.
:::

### Authorized

The consent has been fully authorized and is ready to use. The TPP can initiate requests to the LFI referencing this consent.

The consent will remain `Authorized` until one of the following conditions is met:

- It has been **fully used** → moves to `Consumed`
- It has **reached its expiry** (`ExpirationDateTime`) → moves to `Expired`
- It has been **revoked by the user** → moves to `Revoked`
- It has been **suspended by the LFI** → moves to `Suspended`

### Rejected

A consent moves from `AwaitingAuthorization` to `Rejected` when either:

- The user declines the consent at the LFI's authorization screen, or
- The LFI rejects the processing of the consent

`Rejected` is a **terminal state** — the consent cannot be recovered. The TPP must submit a new `/par` request with a new `ConsentId` to restart the flow.

### Suspended

A consent moves from `Authorized` to `Suspended` when the LFI temporarily blocks access to the functionality the consent covers — for example, if a user's Emirates ID has expired and must be renewed before access can be restored.

Once the LFI has fully cleared the block, the consent **must** move from `Suspended` back to `Authorized`. `Suspended` is **not** a terminal state.

### Consumed

A consent moves from `Authorized` to `Consumed` when the action associated with the granted consent has been fully used.

`Consumed` is a **terminal state**.

::: info Data Sharing consents cannot be Consumed
The `Consumed` state applies **only to Service Initiation consents**. A Data Sharing consent — whether single-use or long-lived — cannot move to `Consumed` under any circumstances.
:::

### Expired

A consent moves from an active state (`Authorized` or `Suspended`) to `Expired` when it reaches its `ExpirationDateTime`.

`Expired` is a **terminal state**. The TPP must prompt the user to re-consent and begin a new authorization flow with a new `ConsentId`.

### Revoked

A consent moves from an active state (`Authorized` or `Suspended`) to `Revoked` when the user explicitly revokes it — either through the TPP's consent management interface or directly at the LFI.

`Revoked` is a **terminal state**.

## State Summary

| State | Terminal | Applies To |
|-------|:--------:|------------|
| `AwaitingAuthorization` | No | All consents |
| `Authorized` | No | All consents |
| `Rejected` | Yes | All consents |
| `Suspended` | No | All consents |
| `Consumed` | Yes | Service Initiation only |
| `Expired` | Yes | All consents |
| `Revoked` | Yes | All consents |

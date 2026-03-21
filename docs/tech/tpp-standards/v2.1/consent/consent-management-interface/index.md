---
next: false
prev: false
aside: false
---

# Consent Management Interface

Every TPP must provide a Consent Management Interface (CMI) — a section of their application where users can see all active and historical consents they have granted, and take action on them. The CMI is a requirement, not an optional feature.

The CMI serves as the primary transparency and control mechanism for users within the TPP's own product. It complements the consent management interfaces provided by LFIs.

## What the CMI must support

A compliant CMI covers four core user journeys:

| Journey | What the user does |
|---|---|
| **View & Manage** | See a dashboard of all consents — active and historical — with enough detail to understand what each consent permits, and click through to manage any individual consent |
| **Consent Revocation** | Cancel a consent, triggering revocation at the API Hub with a clear confirmation of what happens to data or payments already processed |
| **Pause a Consent** | Temporarily pause a consent in the TPP's own system without revoking it, stopping data access or payment initiation until the user reactivates it |
| **Reactivate a Paused Consent** | Re-enable a paused consent without requiring the user to re-authenticate with their LFI |


## View & Manage

The CMI must present consent information at two levels:

**Dashboard** — lists all consents between the user and the TPP with enough detail to identify each one. The information shown varies by consent type; see [User Experience](./user-experience) for the required fields for Data Sharing and Service Initiation consents.

Any consent can be selected to open its detail page.

**Detail page** — shows the full parameters of a consent exactly as they were defined at consent creation. The detail page also hosts the Pause, Reactivate, and Revoke action buttons where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent.


## Consent Revocation

For any consent in the `Authorized`, `AwaitingAuthorization`, `Suspended`, or `Paused` state, the option to revoke must be present on the detail page. When a user revokes a consent, the TPP must:

1. Present a single confirmation page that clearly describes the impact — what the user will lose access to and what happens to any data already retrieved.
2. PATCH the API Hub to update the consent status to `Revoked`:
   - Data Sharing: [PATCH /account-access-consents/{ConsentId}](/tech/tpp-standards/v2.1/consent/open-api/patch-account-access-consents-ConsentId)
   - Service Initiation: [PATCH /payment-consents/{ConsentId}](/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId)

::: info
Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are irrevocable. Do not display a revoke button for consents in the `Consumed` state.
:::


## Pause a Consent

For any consent in the `Authorized` state, the option to pause must be present on the detail page. When a user pauses a consent, the TPP must:

1. Present a single confirmation page that clearly describes that the connection has been paused and how this will affect the service the TPP provides to the user.
2. Record the paused status in the TPP's own system. **Do not** PATCH the API Hub — the consent remains `Authorized` at the LFI.

::: warning
**Paused ≠ Suspended**

**Paused** is a user-initiated action within the TPP CMI. It stops the TPP from accessing data or initiating payments locally. The consent remains `Authorized` at the LFI and no re-authentication is needed to resume.

**Suspended** is an LFI-initiated state change recorded in the API Hub — for example when a user's Emirates ID has expired. It is a change to the consent's actual state.

Do not present a Paused consent as Suspended, and do not conflate the two in your UI or business logic.
:::


## Reactivate a Paused Consent

For any consent the TPP has recorded as Paused, the option to reactivate must be present on the detail page. When a user reactivates a consent, the TPP must:

1. Present a single confirmation page that clearly describes that access has been restored and what the TPP will now be able to do on the user's behalf.
2. Remove the paused status in the TPP's own system, resuming normal data access or payment initiation under the existing consent.

No interaction with the API Hub is required — the consent is already `Authorized` at the LFI. The user does not need to re-authenticate.



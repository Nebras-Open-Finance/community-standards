---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Consent Management Interface

Every LFI must provide a Consent Management Interface (CMI) — a section of their digital banking application where customers can see all active and historical consents they have granted to third party providers, and take action on them. The CMI is a requirement, not an optional feature.

The LFI CMI serves as the primary transparency and control mechanism for customers within the LFI's own product. It complements the consent management interfaces provided by TPPs.

## What the CMI must support

A compliant CMI covers three core user journeys:

| Journey | What the customer does |
|---|---|
| **View & Manage** | See a dashboard of all consents — active and historical — with enough detail to understand what each consent permits, and click through to manage any individual consent |
| **Consent Revocation** | Cancel a consent, triggering revocation at the API Hub with a clear confirmation of what happens to data or payments already processed |
| **Suspend a Consent** | Where applicable, suspend a consent (e.g. when a customer's Emirates ID has expired), updating the consent status at the API Hub |

::: info No Pause
Unlike the TPP CMI, the LFI CMI does not support Pause and Reactivate. Pause is a TPP-only concept that does not affect the consent state at the API Hub.
:::

## View & Manage

The CMI must present consent information at two levels:

**Dashboard** — lists all consents the customer has granted to TPPs via this LFI, with enough detail to identify each one. The information shown varies by consent type; see [User Experience](./user-experience) for the required fields for Data Sharing and Service Initiation consents.

Any consent can be selected to open its detail page.

**Detail page** — shows the full parameters of a consent exactly as they were defined at consent creation. The detail page also hosts the Revoke action button where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent.


## Consent Revocation

For any consent in the `Authorized`, `AwaitingAuthorization`, or `Suspended` state, the option to revoke must be present on the detail page. When a customer revokes a consent, the LFI must:

1. Present a single confirmation page that clearly describes the impact — what the TPP will lose access to and what happens to any data already retrieved.
2. Update the consent status to `Revoked` via the Consent Manager API.

::: info
Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are irrevocable. Do not display a revoke button for consents in the `Consumed` state.
:::

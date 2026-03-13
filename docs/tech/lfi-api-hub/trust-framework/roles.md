---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Trust Framework - Roles

The Trust Framework defines the rights and permissions granted to each organisation and its applications within the Open Finance ecosystem.

Roles are assigned to organisations during onboarding based on the services they are licensed to provide under the Central Bank of the UAE. As an LFI, your role determines which Open Finance API families you can publish and what capabilities you make available to TPPs.

When creating an application, include the relevant role required for your integration with the API Hub.

## Defined Roles for LFIs

| **Role** | **Description** | **API Families** |
|----------|-----------------|-----------------|
| **ASPSP**<br/>*Account Servicing Payment Service Provider* | Authorises your organisation to operate as an Open Finance API provider — publishing API resources, issuing consents, and responding to authorised TPP requests. | `payment`, `account-information`, `confirmation`, `product` |

LFIs are assigned the **ASPSP** role upon onboarding. This role is the gateway to exposing your Open Finance APIs and making them discoverable by TPPs across the ecosystem.

---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Trust Framework - Roles

The Trust Framework defines the rights and permissions granted to each organization and its applications within the Open Finance ecosystem.

Roles are initially assigned to organisations during their onboarding into the ecosystem depending on their licencing with the Central Bank of the UAE. These roles reflect the Technical Access Scopes that the organisation’s applications can request and use within the Open Finance ecosystem.

When creating an application, include all relevant roles required for interaction with LFIs. This ensures successful registration and full functionality across the ecosystem.


## Defined Roles and Access Scopes for TPPs


| **Role** | **Allowed API Scopes** | **Allowed Authorization Details Types** | **Allowed Grant Types** |
|---------|-------------------------|------------------------------------------|--------------------------|
| **BSIP**<br/>*Bank Service Initiation Provider* | `openid`<br/>`payments` | `urn:openfinanceuae:service-initiation-consent:*` | `client_credentials`<br/>`authorization_code`<br/>`refresh_token` |
| **BDSP**<br/>*Bank Data Sharing Provider* | `openid`<br/>`accounts` | `urn:openfinanceuae:account-access-consent:*` | `client_credentials`<br/>`authorization_code`<br/>`refresh_token` |
| **IDSP**<br/>*Insurance Data Sharing Provider* | `openid`<br/>`insurance` | `urn:openfinanceuae:insurance-consent:*` | `client_credentials`<br/>`authorization_code`<br/>`refresh_token` |
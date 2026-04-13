---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Trust Framework - Roles

The Trust Framework defines the rights and permissions granted to each organisation and its applications within the Open Finance ecosystem.

Roles are assigned to organisations during onboarding based on the services they provide. All LFIs are assigned the **LFI role**, which enables them to make operational calls to the API Hub. In addition, you will be assigned the relevant TPP roles corresponding to the Open Finance services your institution offers, so that you can test end-to-end flows as a TPP would:

- A **Bank** providing both payment initiation and data sharing services will be assigned **BSIP** and **BDSP**.
- An **Insurer** providing data sharing services will be assigned **IDSP**.

## Defined Roles for LFIs

| **Role** | **Description** | **Typical Grant Types** |
|---------|-----------------|--------------------------|
| **LFI**<br/>*Licensed Financial Institution* | Assigned to all LFIs. Used by the C3-hh-cm-client to make operational calls to the API Hub (e.g. `GET /auth`, `PATCH /consents/{consentId}`). | `client_credentials` |
| **BSIP**<br/>*Bank Service Initiation Provider* | Assigned to banks offering payment initiation services. Used to test service initiation flows as a TPP. | `client_credentials`<br/>`authorization_code`<br/>`refresh_token` |
| **BDSP**<br/>*Bank Data Sharing Provider* | Assigned to banks offering account data sharing services. Used to test data sharing flows as a TPP. | `client_credentials`<br/>`authorization_code`<br/>`refresh_token` |
| **IDSP**<br/>*Insurance Data Sharing Provider* | Assigned to insurers offering insurance data sharing services. Used to test insurance data flows as a TPP. | `client_credentials`<br/>`authorization_code`<br/>`refresh_token` |

When creating an application, ensure you assign the correct roles for its purpose. Your **C3-hh-cm-client** must have the **LFI role only**; your TPP test client must have the appropriate TPP roles (e.g. **BDSP** for data sharing). See [Creating the C3-hh-cm-client](./creating-c3-application) and the [TPP Standards — Creating an Application](/tech/tpp-standards/trust-framework/creating-an-application) for guidance.

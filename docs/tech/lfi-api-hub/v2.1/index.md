---
next: false
prev: false
aside: false
---

# Ozone Connect Specifications

The **Ozone Connect Specifications** define the APIs and integration contracts that LFIs implement to power the UAE's Open Finance ecosystem. These are the APIs your infrastructure exposes — directly to the API Hub — to serve TPP requests and enable customers to manage consents.


## Versioning

Ozone Connect uses **major.minor** versioning (e.g., ). Minor versions (, ) are non-breaking — additional optional fields, new endpoints, or clarifications — and can be adopted without dual-running. Major version bumps (e.g., ) may include breaking changes, which require LFIs to run both versions concurrently during a structured transition period.

Full rules are in the [Version Management Policy](/policy/version-management). Transition and dual-running requirements are in the [LFI Deprecation Policy](/policy/lfi-deprecation).

### TPP Standards compatibility

Each version of Ozone Connect is designed to serve the equivalent version of the TPP-facing Open Finance Standards. During a major version transition, the prior version must remain operational so TPPs can migrate without disruption.

<OzoneConnectCompatibility />

## APIs

### Authentication & Authorization

The LFI's authorisation server interacts with the **Headless Heimdall** API, provided by the Hub, to coordinate FAPI 2.0 authorization flows. This shields you from the complexity of raw OIDC and FAPI 2.0 — your auth server calls three endpoints at the appropriate points in the customer journey and the Hub handles the rest.

| Endpoint | When to call |
|---|---|
|  | At the start of every authorization code grant — validates the FAPI/OIDC request and returns the interaction context and decoded consent details |
|  | After the customer has authenticated and authorized the consent — completes the interaction and triggers the Hub to issue tokens to the TPP |
|  | If authentication or consent authorization fails — ends the interaction and initiates an error redirect back to the TPP |

See [Authentication & Authorization](./auth/) for the full API guide and reference.

### Consent

#### Consent Manager

The **Consent Manager API** is provided by the Hub. Your authorisation server calls it during the consent journey to read the consent object, update its state, and manage its lifecycle.

| Endpoint | Purpose |
|---|---|
|  | Retrieve the full consent, including requested permissions, status, and account scope |
|  | Update consent state — used to mark a consent as Authorised or Rejected after the customer journey |
|  | Retrieve the immutable audit trail for a consent |
|  | Revoke an active consent — typically triggered from the CMI when a customer withdraws authorisation |
|  | List all consents for a given customer — used to power the CMI consent list view |
|  | List all consents associated with a given account |

See [Consent](./consent/) for the full API guide and reference.

#### Consent Events & Actions

Unlike the APIs above, the **Consent Events & Actions API** is implemented by you. The Hub calls your endpoints to notify you of consent lifecycle changes and, during consent creation, to validate the consent before it is stored.

| Endpoint | When the Hub calls it |
|---|---|
|  | When a consent is created, modified, or revoked — allows your systems to react to state changes in real time |
|  | During consent creation — the Hub requests you to validate the consent parameters before the authorization journey proceeds |

See [Consent Events & Actions](./consent/events-and-actions) for the full API guide and reference.

### Banking

The banking APIs cover all consented and open-data capabilities. Consented APIs require a customer to have completed an authorization journey before the Hub will route requests; open-data APIs use client credentials only.

| API | Auth type | Required role |
|---|---|---|
| [Data Sharing](./banking/data-sharing/) | Consented — requires an Authorized consent | BDSP |
| [Service Initiation](./banking/service-initiation/) | Consented — requires an Authorized consent | BSIP |
| [Confirmation of Payee](./banking/confirmation-of-payee/) | Client credentials — no consent required | BSIP |
| [Products & Leads](./banking/products-and-leads/) | Client credentials — no consent required | BDSP |
| [ATMs](./banking/atms/) | Client credentials — no consent required | BDSP |

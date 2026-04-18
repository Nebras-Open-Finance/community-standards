---
title: "Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments"
description: "When an LFI serves multiple customer segments (e.g. retail and SME) with different authentication endpoints, they need one API Hub per segment but can share a single Ozone Connect — minimising LFI-maintained certificates."
next: false
prev: false
---

# Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments

Many LFIs serve more than one customer segment — for example retail, SME, private banking, or corporate. These segments are often run as separate propositions: different mobile apps, different internet banking portals, and sometimes entirely different identity and authentication systems.

This article explains how to structure API Hub deployments when those segments authenticate their customers in different places, and how to keep the operational footprint as small as possible.


## Why Multiple Hubs May Be Required

The API Hub is more than a proxy — it acts as the **OIDC Authorization Server** for the LFI within the Open Finance ecosystem. When a TPP drives a PSU through an authorization flow, the API Hub is the entity that:

- Exposes the single OIDC `/authorize` endpoint the TPP redirects the PSU to.
- Issues the access tokens the TPP uses to call APIs.
- Holds the authoritative record of consents.

Because the API Hub must behave as a conformant OIDC Authorization Server, it has **one authorization endpoint** that redirects the PSU into the LFI's own authentication experience (see the [Consent Journey API Guide](/tech/lfi-api-hub/v2.1/consent-journey/api-guide) and the [Authorization Endpoint configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint)).

If retail and SME customers authenticate in different places — for example, retail customers in the retail mobile app and SME customers in a separate business banking portal — a single authorization endpoint cannot send a PSU to both. Since the Hub mimics a standard Authorization Server, it can only be configured to redirect to one authentication flow.

In that situation the LFI needs **one API Hub per distinct authentication context**:

- Retail PSUs → Retail API Hub → Retail authentication endpoint
- SME PSUs → SME API Hub → SME authentication endpoint

The same logic applies to any additional segment (private banking, corporate) that has its own authentication experience.

::: tip When one Hub is enough
If all segments authenticate through the same endpoint — for example, a single unified banking app that handles both retail and SME sign-in — a single API Hub is sufficient. The need for multiple Hubs is driven by distinct authentication flows, not by the existence of multiple products.
:::


## Recommended Deployment Model

The recommended pattern for a multi-segment LFI is:

- **One Trust Framework organisation** — the LFI is a single legal entity in the UAE Open Finance ecosystem and is registered as one organisation regardless of how many segments it serves.
- **One API Hub deployment per authentication context** — e.g. one for retail, one for SME. Each Hub has its own authorization endpoint, its own environment-specific onboarding, and its own base URLs.
- **One shared `C3-hh-cm-client` application** — both Hubs use the same client registration. This means the LFI's client-side identity and signing material is created once and reused.
- **One shared Ozone Connect deployment** — the LFI exposes a single set of Ozone Connect APIs, and routes incoming Hub requests to the correct downstream core using the `o3-provider-id` header.

<!-- TODO: architecture diagram — two API Hubs (Retail, SME) pointing at a single Ozone Connect, which routes to retail/SME cores based on o3-provider-id. Show certificate placement: shared C3/S4/Sig4/Enc1, per-Hub S1. -->


## Certificate Footprint

This deployment model minimises the certificate material the LFI has to generate, store, and rotate.

### LFI-held certificates — maintained once, shared across Hubs

LFI-held certificates live on the LFI's Trust Framework organisation and are held by the LFI. Because both Hubs sit under the same organisation and share the same `C3-hh-cm-client` application, the LFI maintains **one set** of these certificates:

| Certificate | Purpose | Reused across Hubs |
|-------------|---------|:------------------:|
| **C3** | LFI client cert used when calling Consent Manager & Headless Heimdall | ✅ |
| **S4** | LFI server cert identifying Ozone Connect to the API Hub | ✅ |
| **Sig4** | LFI JWT Auth signing key (only if [JWT Auth](/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth) is selected) | ✅ |
| **Enc1** | LFI encryption key used to decrypt PII | ✅ |

See [API Hub Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/) for the full certificate model and the existing "Certificate reuse across brands" note.

### Ozone-held certificates — additional material added per Hub

Each additional API Hub requires its own server-side certificates — most visibly **S1**, the server transport certificate that identifies the Hub instance to TPPs. These are added to the LFI's Trust Framework organisation so TPPs can validate the Hub's identity, but the private keys are held and maintained by Ozone.

From the LFI's perspective, these certificates appear under the organisation but require no operational involvement — the LFI does not generate, store, or rotate the private key material.

| Certificate | Purpose | Added per Hub | Private key held by |
|-------------|---------|:-------------:|:-------------------:|
| **S1** | Identifies the Hub instance to TPPs | ✅ | Ozone |
| **S3** | Identifies CM & HH servers to the LFI | ✅ | Ozone |
| **Sig2** | Signs API Hub responses / `id_token` to TPPs | ✅ | Ozone |
| **C4** | Hub client cert when calling Ozone Connect (held in Ozone's org) | ✅ | Ozone |
| **Sig3** | Signs Hub-side JWT Auth headers (held in Ozone's org, only when JWT Auth is used) | ✅ | Ozone |

Net effect: the LFI's own certificate maintenance burden does not grow as additional Hubs are added. The one-time set of C3, S4, Sig4, and Enc1 covers every Hub sitting under the organisation.


## Single Ozone Connect with `o3-provider-id` Routing

Because the LFI uses a single shared Ozone Connect deployment, incoming requests from the multiple Hubs arrive at the same set of endpoints. The Ozone Connect layer must identify which Hub the request came from and route internally to the appropriate downstream core (retail core vs SME core, for example).

The API Hub tells the LFI which Hub the request originated from via the **`o3-provider-id`** request header. Each Hub is configured with a distinct `o3-provider-id` — for example `retail` and `sme` — and includes that value on every call into Ozone Connect.

| Request | `o3-provider-id` value (example) | LFI action |
|---------|---------------------------------|------------|
| Retail Hub → Ozone Connect | `retail` | Route to retail core banking system |
| SME Hub → Ozone Connect | `sme` | Route to SME / business core banking system |

### Implementation guidance

- Agree the `o3-provider-id` value for each Hub with Nebras / Ozone during onboarding and record it as part of your environment-specific configuration.
- Treat `o3-provider-id` as the **first branching decision** inside Ozone Connect. All downstream logic (account lookup, customer lookup, payment execution, consent validation) should resolve through the segment's own core.
- Validate the header on every request — reject calls with a missing or unknown `o3-provider-id`.
- Keep segment boundaries clean: a consent created via the retail Hub MUST be served by the retail core; a consent created via the SME Hub MUST be served by the SME core. Do not allow cross-segment resolution.
- `o3-provider-id` is the supported identifier. `o3-aspsp-id` is a deprecated alias retained for backward compatibility only — see the request header tables in each API guide (e.g. [Bank Data Sharing API Guide](/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/)).


## Summary

| Concern | Recommendation |
|---------|----------------|
| Trust Framework organisations | One |
| API Hub deployments | One per distinct authentication context (e.g. retail, SME) |
| `C3-hh-cm-client` application | One, shared |
| LFI-held certificates (C3, S4, Sig4, Enc1) | One set, shared across Hubs |
| Ozone-held certificates (S1 etc.) | Added per Hub; maintained by Ozone |
| Ozone Connect | One deployment, routing on `o3-provider-id` |
| Downstream cores | One per segment, selected by `o3-provider-id` |

This pattern keeps the LFI's operational and certificate footprint independent of the number of segments served, while still meeting the Open Finance authentication and authorization model for each segment independently.

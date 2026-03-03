---
next: false
prev: false
---

# Onboarding to the API Hub

The **UAE Open Finance API Hub** (powered by Ozone Connect) is the central intermediary that sits between TPPs and LFIs. As an LFI, you connect to the Hub once and it handles discovery, routing, consent management, and security enforcement on your behalf.

## Environments

The Hub is available in two environments:

| Environment | Purpose | Endpoint base |
|---|---|---|
| **Pre-Production (Sandbox)** | Integration testing with synthetic data. TPPs and LFIs onboard here first. | `sandbox.apihub.openfinance.ae` |
| **Production** | Live customer traffic under the CBUAE regulatory framework. | `apihub.openfinance.ae` |

::: warning
All integration testing must be completed in Pre-Production before requesting access to Production. Production access requires CBUAE approval.
:::

## What the Hub provides

- **Consent management** — the Hub stores and manages the lifecycle of all consents
- **Routing** — inbound TPP API requests are verified, enriched, and routed to your resource server
- **Security enforcement** — FAPI 2.0 PAR flows, mTLS validation, JWS signature verification
- **Admin portal** — manage TPP activations, monitor traffic, and view audit logs
- **Discovery** — your endpoints are discoverable via `/.well-known/openid-configuration`

## Onboarding steps

| Step | Page |
|---|---|
| 1 | [Prerequisites](./prerequisites) — what you need before starting |
| 2 | [Application Layer Authentication](./application-layer-auth) — configuring mTLS and client credentials |
| 3 | [Environment Specific Configuration](./environment-specific) — base URLs, discovery documents, and environment flags |

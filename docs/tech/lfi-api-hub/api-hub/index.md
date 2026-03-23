---
next: false
prev: false
aside: false
---

# API Hub Overview

The **#API Hub** — powered by Ozone — is the central network intermediary that connects Licensed Financial Institutions (LFIs) to the open finance ecosystem.

As an LFI, you connect your resource and authorisation servers to the Hub **once**. The Hub then manages all incoming TPP traffic on your behalf: verifying credentials, enforcing security, routing requests, and maintaining the consent ledger.

## Architecture

<APIFlowViewer title="API Hub Architecture">
  <APIFlowsAPIHubArchitecture/>
</APIFlowViewer>

TPPs never call your resource server directly. Every request passes through the API Hub's security and consent layer before it reaches you.

Each LFI's Hub instance is a **dedicated isolated tenant** — your consent store, audit logs, and configuration are on completely separate infrastructure from every other LFI in the ecosystem.

## What the Hub handles

| Responsibility | Detail |
|---|---|
| **TPP credential verification** | Validates the TPP's certificate and software statement against the Trust Framework on every request |
| **FAPI 2.0 security** | Enforces PAR, mTLS-bound access tokens, DPoP, and JWS message signing |
| **Consent lifecycle** | Stores and enforces all consent records — data sharing and payment consents — so your resource server only receives requests backed by an active, authorised consent |
| **Token issuance** | Issues access tokens to TPPs after successful consent authorisation via your authorisation server |
| **API routing** | Routes inbound TPP requests to the correct LFI resource server endpoint, attaching Hub-signed tokens |
| **Participant discovery** | Publishes your `/.well-known/openid-configuration` so TPPs can discover your endpoints |
| **Audit logging** | Maintains a tamper-evident log of all API interactions for regulatory purposes |

## Consent & data

**The Hub is the source of truth for all consent records.** Whether a customer revokes a consent through your CMI, or a TPP modifies a consent through their interface, both parties are required to patch the change to the Hub immediately. Any consent state held in your own systems must exactly match the Hub's record at all times.

**The Hub never reads or stores request and response payload data.** Account details, transaction records, payment instructions, and all other customer data returned by your resource server are routed through the Hub transparently — they are never inspected, logged, or retained. Only consent metadata and interaction audit events are stored by the Hub.

## What you provide

Two endpoints you operate are registered with the Hub per environment:

- **[Ozone Connect Base URL](./onboarding/environment-specific/ozone-connect-url)** — your resource server base URL; the Hub forwards verified TPP requests here for accounts, payments, CoP, and other Open Finance APIs
- **[Authorisation Endpoint](./onboarding/environment-specific/auth-endpoint)** — customers are redirected here to authenticate and authorise consent requests


## Environments

| Environment | Trust Framework | Purpose |
|---|---|---|
| **Pre-production** | Sandbox | Register an application in the Sandbox Trust Framework  and use it to act as a TPP against the pre-production Hub — complete consent journeys and call the APIs to verify your Ozone Connect implementation end-to-end |
| **Production** | Production | Live customer traffic |

Both environments are structurally identical. The only differences are the mTLS certificates (issued from the production Trust Framework rather than Sandbox) and the environment-specific values for the Ozone Connect Base URL and Authorisation Endpoint. See [Environment Specific Configuration](./onboarding/environment-specific/) for the full details.

## Admin Portal

The Hub provides an **Admin Portal** where your team can:

- Activate and manage TPP applications that have requested access to your APIs
- View real-time and historical API traffic and audit logs
- Manage your registered API resources and endpoint configuration
- Monitor consent status across your customer base


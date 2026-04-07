---
next: false
prev: false
aside: false
---

# API Hub Overview

The **API Hub** — powered by Ozone — is the central Open Finance gateway that connects Licensed Financial Institutions (LFIs) to the ecosystem. It acts as both the **OIDC Authorization Server** and the **Open Finance Gateway**, managing all incoming TPP traffic on your behalf.

As an LFI, you connect your resource server and authorization endpoint to the Hub **once**. The Hub then handles TPP credential verification, security enforcement, request routing, and consent management.

All TPP traffic MUST flow through the API Hub — TPPs never call LFI resource servers directly.

## Architecture

<APIFlowViewer title="API Hub Architecture">
  <APIFlowsAPIHubArchitecture/>
</APIFlowViewer>

The canonical request path is: **TPP → API Hub → LFI → API Hub → TPP**. The API Hub validates the TPP's token and consent, enforces OpenAPI schemas, enriches the request with customer and consent context, then proxies it to your resource server. Your resource server executes the operation and returns the response, which the Hub normalizes before delivering to the TPP.

Each LFI's Hub instance is a **dedicated isolated tenant** — your consent store, audit logs, and configuration are on completely separate infrastructure from every other LFI in the ecosystem.

## What the Hub handles

| Responsibility | Detail |
|---|---|
| **TPP credential verification** | Validates the TPP's certificate and software statement against the Trust Framework on every request |
| **FAPI 2.0 security** | Enforces PAR, mTLS-bound access tokens, DPoP, and JWS message signing |
| **Consent lifecycle** | Stores and enforces all consent records — data sharing and payment consents. The API Hub is the **single source of truth** for all consent state |
| **Token issuance** | Issues all access tokens to TPPs after successful consent authorization. The API Hub is the sole token issuer — LFIs MUST NOT issue tokens to TPPs |
| **API routing** | Routes inbound TPP requests to the correct LFI resource server endpoint, enriching each request with `customerId`, `accountIds`, and TPP information |
| **Participant discovery** | Publishes your `/.well-known/openid-configuration` so TPPs can discover your endpoints |
| **Error mapping** | Maps LFI error responses to the TPP-facing standard, normalizing response formats across the ecosystem |
| **Audit logging** | Maintains a tamper-evident log of all API interactions for regulatory purposes |

## What you handle

| Responsibility | Detail |
|---|---|
| **Resource server endpoints** | Expose your banking APIs (accounts, payments, CoP, etc.) via Ozone Connect. The API Hub routes verified requests to these endpoints |
| **PSU authentication** | Authenticate the customer when they are redirected to your authorization endpoint during consent flows. The API Hub handles the OIDC authorization protocol; your system authenticates the person |
| **Business logic & data retrieval** | Execute the requested operation — retrieve account data, initiate payments, check balances — and return the response per the LFI OpenAPI specification |
| **Fraud & risk checks** | Apply your institution's fraud detection and risk assessment on incoming requests |
| **Consent authorization UX** | Present the consent details to the PSU and capture their authorization decision via your application |

## Consent & data

**The Hub is the source of truth for all consent records.** Whether a customer revokes a consent through your CMI, or a TPP modifies a consent through their interface, both parties MUST patch the change to the Hub immediately. LFIs MUST NOT maintain independent consent state that diverges from the Hub's record. Any consent state held in your own systems must exactly match the Hub's record at all times.

**The Hub never reads or stores request and response payload data.** Account details, transaction records, payment instructions, and all other customer data returned by your resource server are routed through the Hub transparently — they are never inspected, logged, or retained. Only consent metadata and interaction audit events are stored by the Hub.

## Trust model

LFIs trust the API Hub for token validation and consent validation. When the Hub forwards a request to your resource server, the token and consent have already been verified — you do not need to re-query consent state from a separate store.

Your resource server SHOULD validate the Bearer token signature and claims (issuer, audience, expiry, scope) as described in [Application Layer Authentication](./onboarding/application-layer-auth), but MUST NOT independently re-validate consent state against a separate consent store. The Hub's consent record is authoritative.

## Request lifecycle

### Consent authorization

1. TPP initiates a consent request via **Pushed Authorization Request (PAR)** to the API Hub
2. API Hub creates and stores the consent record
3. PSU is redirected to your **authorization endpoint**
4. Your system **authenticates the PSU** and presents the consent details for approval
5. Your system calls the API Hub ([`/doConfirm`](./headless-heimdall/open-api/auth-interactionId-doConfirm) or [`/doFail`](./headless-heimdall/open-api/auth-interactionId-doFail)) with the authorization result
6. API Hub issues an access token to the TPP

For full authorization server integration details, see [Headless Heimdall](./headless-heimdall/).

### API request

1. TPP sends an API request with its access token to the API Hub
2. API Hub validates the token and consent, enforces the OpenAPI schema, and enriches the request with customer and consent context
3. API Hub proxies the request to your **Ozone Connect** resource server endpoint
4. Your resource server executes the operation and returns the response per the LFI OpenAPI specification
5. API Hub normalizes the response and returns it to the TPP

For request authentication details, see [Application Layer Authentication](./onboarding/application-layer-auth).

## Endpoints you register

Two endpoints you operate are registered with the Hub per environment:

- **[Ozone Connect Base URL](./onboarding/environment-specific/ozone-connect-url)** — your resource server base URL; the Hub forwards verified TPP requests here for accounts, payments, CoP, and other Open Finance APIs
- **[Authorization Endpoint](./onboarding/environment-specific/auth-endpoint)** — customers are redirected here to **authenticate** and authorize consent requests; this is where your institution verifies the PSU's identity


## Environments

| Environment | Trust Framework | Purpose |
|---|---|---|
| **Pre-production** | Sandbox | Register an application in the Sandbox Trust Framework  and use it to act as a TPP against the pre-production Hub — complete consent journeys and call the APIs to verify your Ozone Connect implementation end-to-end |
| **Production** | Production | Live customer traffic |

Both environments are structurally identical. The only differences are the mTLS certificates (issued from the production Trust Framework rather than Sandbox) and the environment-specific values for the Ozone Connect Base URL and Authorization Endpoint. See [Environment Specific Configuration](./onboarding/environment-specific/) for the full details.

## Admin Portal

The Hub provides an **Admin Portal** where your team can:

- Activate and manage TPP applications that have requested access to your APIs
- View real-time and historical API traffic and audit logs
- Manage your registered API resources and endpoint configuration
- Monitor consent status across your customer base

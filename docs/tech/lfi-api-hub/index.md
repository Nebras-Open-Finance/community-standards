---
next: false
prev: false
aside: false
---

# LFI – Integration Guide <Badge type="tip" text="v2.1" />

The implementation guide for **Licensed Financial Institutions (LFIs)** connecting to UAE Open Finance. It covers the APIs your bank exposes, the API Hub services your bank consumes, the Trust Framework registrations required to participate, and the onboarding and certification path from sandbox through to live production traffic.

If you are a TPP, see the [TPP Standards](../tpp-standards/) instead. For the wider architecture, start with the [Open Finance Architecture overview](../).

## Where the LFI sits

UAE Open Finance is **strictly mediated**: TPPs never call LFIs directly. All TPP traffic is routed through the **API Hub** (operated by Nebras, with vendor support from Ozone API), which acts as the OIDC/FAPI authorization server, the consent source of truth, and the gateway that proxies every request to the relevant LFI.

The LFI's role is the **execution layer**:

- **Operate Ozone Connect** — the LFI-built backend that implements the Open Finance endpoints the Hub calls (account data, payments, Confirmation of Payee, products & leads, ATMs, consent events).
- **Authenticate the customer (PSU)** — during the consent journey, the customer is redirected from the Hub to the LFI to authenticate and authorise the consent. The LFI's authorisation server hands the result back to the Hub via Headless Heimdall.
- **Provide a Consent Management Interface (CMI)** — the customer-facing surface where PSUs review and revoke active consents, backed by the Hub's Consent Manager API.

Consent state, token issuance, schema enforcement, and TPP-facing routing all live in the Hub. The LFI does not maintain independent consent state and does not issue tokens.

## Start here

If this is your first time on this guide, follow the **[LFI Integration Journey](./getting-started/)** end-to-end. It sequences the work into three phases — Sandbox build & integrate, Certification, and Production launch — and links out to every section below at the right point in the journey. The companion **[Recommended Bank Rollout Plan](./getting-started/bank-rollout-plan)** suggests how to stage delivery capability-by-capability against the regulatory deadline.

## Sections

### [Trust Framework](./trust-framework/)

The participant directory and certificate authority that underpins the ecosystem. Register your organisation, nominate Organisation Admins and users, upload transport and signing certificates, and create the `C3-hh-cm-client` application the Hub uses to call your services. Once live, this is also where you publish your authorisation server and API resources so TPPs can discover them.

### [API Hub](./v2.1/api-hub/)

Everything the Hub provides to your LFI: connectivity and mTLS setup, application-layer authentication, environment-specific configuration, the **Admin Portal** for TPP management and operational reporting, the **[Headless Heimdall](./v2.1/api-hub/headless-heimdall/)** auth-server API used during the consent journey, and the **[Consent Manager](./v2.1/api-hub/consent-manager/)** API for reading and managing consents from your authorisation server and CMI.

### [Ozone Connect — Banking](./v2.1/banking/)

The Ozone Connect APIs your LFI implements for the Hub to call on behalf of authorised TPPs:

- **[Data Sharing](./v2.1/banking/data-sharing/)** — accounts, balances, transactions, beneficiaries, standing orders, statements, customer data (BDSP, consented).
- **[Payments (Service Initiation)](./v2.1/banking/service-initiation/)** — single instant payments and the multi-payment family (variable/fixed × on-demand/periodic/defined), plus refunds, PII handling, and multi-authorization (BSIP, consented).
- **[Confirmation of Payee](./v2.1/banking/confirmation-of-payee/)** — pre-payment payee verification (BSIP, client credentials).
- **[Products & Leads](./v2.1/banking/products-and-leads/)** — open product catalogue and lead capture (BDSP, client credentials).
- **[ATMs](./v2.1/banking/atms/)** — ATM location data (BDSP, client credentials).

### [Ozone Connect — Consent Events](./v2.1/consent-events/)

The events-and-actions API your LFI implements so the Hub can validate consents at creation time and notify your systems when consents are created, modified, or revoked. This is the LFI's hook into the consent lifecycle owned by the Hub.

### [Consent Journey](./v2.1/consent-journey/api-guide)

The customer journey at the LFI between PAR and token issuance: authentication (including [Strong Customer Authentication](./v2.1/consent-journey/authentication/sca)), authorization, and the Headless Heimdall handoff back to the Hub.

### [Consent Management Interface](./v2.1/consent-management-interface/)

Requirements, user experience, and API guide for the consent management surface every LFI must expose to its customers — the place where PSUs view and revoke active Open Finance consents.

### [Testing & Certification](./production/testing-certification/overview)

The certification evidence required before going live (functional, user experience, performance, security validation), and the production live-proving steps — attestation, self-testing, and TPP buddying — that follow.

## OpenAPI is the source of truth

Every endpoint described in this guide is defined normatively in the OpenAPI specifications. Where the guide and the spec disagree, the spec wins. See the [API Specs](../api-specs/v2.1/) section for the full catalogue, split by audience (Standards, API Hub, Ozone Connect).

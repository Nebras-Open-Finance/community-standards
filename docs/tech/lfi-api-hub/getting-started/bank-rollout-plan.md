---
next: false
prev: false
aside: false
---

# Recommended Bank Rollout Plan

This page proposes a sensible delivery sequence for an LFI working through [Step 3 of the LFI Integration Journey](./). It is intended as a starting path that breaks the work into manageable increments — once you have completed Phase 1 you will be well-placed to decide the order of subsequent capabilities based on your own priorities and constraints.

::: warning Guidance only
This rollout plan is guidance. The Central Bank of the UAE sets the actual regulatory requirements and deadlines — those MUST always take precedence. It is the LFI's responsibility to assess how best to meet their obligations. This page recommends a delivery order; it does not define scope or timing.
:::

Each phase below is a self-contained delivery increment. A phase can be taken end-to-end through [Step 3 → Step 9](./#phase-a-sandbox-build-integrate) (build, certify, go live) before the next phase is started, or phases can be run in parallel where resourcing allows.


## Phase 1 — Foundations and Retail Core

Phase 1 establishes the foundational integration with the API Hub and delivers the first customer-facing capability (Retail Data Sharing) followed by the simplest payment journey.

The steps are ordered so each builds on the last — ordering within the phase is a recommendation, not a hard dependency graph, except where an API clearly depends on another being present (e.g. Refunds requires a completed payment).


### 1. Consent Validate

Implement the [`POST /consent/action/validate`](../v2.1/consent-events/open-api/validate) endpoint on your Ozone Connect server.

This endpoint is called by the API Hub **before** a consent is stored, and lets your LFI signal which consent types and permissions you support. Building this first means you can safely reject any consent type you haven't yet implemented, and then expand the accepted set as each subsequent capability comes online.

See the [Consent Events API Guide](../v2.1/consent-events/api-guide) for implementation details.


### 2. Consent Journey

Implement the authorization interaction between your LFI and the API Hub. These are the five endpoints your LFI calls against the Hub to drive a consent through PSU authentication, authorization, and return to TPP:

| Endpoint | Direction | Purpose |
|----------|-----------|---------|
| [`GET /auth`](../v2.1/api-hub/headless-heimdall/open-api/auth) | LFI → API Hub | Initiate the authorization interaction |
| [`GET /consents/{consentId}`](../v2.1/api-hub/consent-manager/open-api/consents-consentId) | LFI → API Hub | Retrieve the full consent details |
| [`PATCH /consents/{consentId}`](../v2.1/api-hub/consent-manager/open-api/patch-consents-consentId) | LFI → API Hub | Update consent status, PSU identifiers, and account IDs |
| [`POST /auth/{interactionId}/doConfirm`](../v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm) | LFI → API Hub | Complete the authorization interaction and redirect back to TPP successfully |
| [`POST /auth/{interactionId}/doFail`](../v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail) | LFI → API Hub | Complete the authorization interaction and redirect back to TPP with a failure |

See the [Consent Journey API Guide](../v2.1/consent-journey/api-guide) for the end-to-end sequence, including PSU authentication requirements ([SCA](../v2.1/consent-journey/authentication/sca)) and identifier rules.


### 3. Retail Data Sharing — Current & Savings Accounts

Implement [Bank Data Sharing](../v2.1/banking/data-sharing/) for retail Current Accounts and Savings Accounts. Data Sharing is recommended as the first productised capability because it exercises the full consent journey end-to-end without the additional complexity of payment execution or encrypted PII.

Prioritise the following endpoints:

| Endpoint | Purpose |
|----------|---------|
| [`GET /accounts`](../v2.1/banking/data-sharing/open-api/accounts) | List the accounts covered by the consent |
| [`GET /accounts/{AccountId}`](../v2.1/banking/data-sharing/open-api/accounts-AccountId) | Retrieve details for a single account |
| [`GET /accounts/{AccountId}/balances`](../v2.1/banking/data-sharing/open-api/accounts-AccountId-balances) | Retrieve balances for an account |
| [`GET /accounts/{AccountId}/transactions`](../v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions) | Retrieve the transaction history for an account |
| [`GET /customer`](../v2.1/banking/data-sharing/open-api/customer) | Retrieve the customer details covered by the consent |
| [`GET /accounts/{AccountId}/customer`](../v2.1/banking/data-sharing/open-api/accounts-AccountId-customer) | Retrieve customer details for a specific account |

See [Data Sharing — Requirements](../v2.1/banking/data-sharing/requirements) and the [Data Sharing API Guide](../v2.1/banking/data-sharing/api-guide/).

Once live, update the [`POST /consent/action/validate`](../v2.1/consent-events/open-api/validate) response to accept Bank Data Sharing consents.


### 4. Retail Domestic — Single Instant Payment

Implement the [Single Instant Payment](../v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements) journey for retail customers. This introduces payment execution and the handling of encrypted PII on payment consents.

Key endpoints:

| Endpoint | Purpose |
|----------|---------|
| [`POST /payments`](../v2.1/banking/service-initiation/open-api/payments) | Execute an authorised payment |
| [`GET /payments/{PaymentId}`](../v2.1/banking/service-initiation/open-api/payments-PaymentId) | Retrieve the status of a payment |

See the [Single Instant Payment API Guide](../v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide), [Payment Rails and Status](../v2.1/banking/service-initiation/domestic-payments/overview/payment-status), and the [Personal Identifiable Information](../v2.1/banking/service-initiation/personal-identifiable-information/) guide for PII decryption.

Extend `POST /consent/action/validate` to accept Single Instant Payment consents.


### 5. Refunds

Implement [Refunds](../v2.1/banking/service-initiation/refunds/requirements) against completed payment consents. Refunds depend on the payment capability from the previous step being live.

| Endpoint | Purpose |
|----------|---------|
| [`GET /payment-consents/{ConsentId}/refund`](../v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund) | Retrieve refund details for a payment consent |

See the [Refunds API Guide](../v2.1/banking/service-initiation/refunds/api-guide).


### 6. Confirmation of Payee

Implement [Confirmation of Payee](../v2.1/banking/confirmation-of-payee/requirements) (CoP). CoP does not use the consent journey — it is a direct LFI-exposed API proxied via the Hub — so it can be delivered in parallel with the earlier payment and data sharing work if resourcing allows.

| Endpoint | Purpose |
|----------|---------|
| [`POST /customers/action/cop-query`](../v2.1/banking/confirmation-of-payee/open-api/cop-query) | Verify a payee's name against an account identifier |

See the [CoP API Guide](../v2.1/banking/confirmation-of-payee/api-guide) and [user journeys](../v2.1/banking/confirmation-of-payee/user-journeys).


### 7. Consent Management Interface

Provide a [Consent Management Interface](../v2.1/consent-management-interface/) (CMI) in your retail banking channels so customers can view and revoke their active consents.

The CMI is sequenced last in Phase 1 because it consumes consents created by the earlier capabilities. It is built against the Hub's Consent Manager APIs:

| Endpoint | Purpose |
|----------|---------|
| [`GET /psu/{userId}/consents`](../v2.1/api-hub/consent-manager/open-api/psu-userId-consents) | List all consents for a given PSU |
| [`GET /consents/{consentId}`](../v2.1/api-hub/consent-manager/open-api/consents-consentId) | Retrieve the full details of a consent |
| [`POST /consents/{consentId}/action/revoke`](../v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke) | Revoke a specific consent |
| [`POST /consent-groups/{consentGroupId}/consents/action/revoke`](../v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke) | Revoke a group of related consents |

See [CMI Requirements](../v2.1/consent-management-interface/requirements), [User Experience](../v2.1/consent-management-interface/user-experience), and the [CMI API Guide](../v2.1/consent-management-interface/api-guide).


## Phase 2 — Extend Retail

Phase 2 rounds out the retail offering with the more complex payment types and the discovery APIs.

### Domestic Multi-Payments (all flavours)

Implement all remaining domestic payment types for retail customers:

- [Variable On-Demand](../v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements)
- [Fixed On-Demand](../v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements)
- [Variable Periodic Schedule](../v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements)
- [Fixed Periodic Schedule](../v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements)
- [Variable Defined Schedule](../v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements)
- [Fixed Defined Schedule](../v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements)
- [Delegated SCA](../v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements)

Extend `POST /consent/action/validate` to accept each multi-payment consent type as you bring it live.

### Products & Leads

Implement the [Products & Leads](../v2.1/banking/products-and-leads/requirements) APIs. See the [Products & Leads API Guide](../v2.1/banking/products-and-leads/api-guide).


## Phase 3 — Data Sharing Breadth and SME Foundations

Phase 3 extends Data Sharing to additional product types and introduces the SME proposition.

### Extended Retail Data Sharing

Add Data Sharing for additional retail product categories:

- **Credit Card** accounts
- **Finance** accounts
- **Mortgage** accounts

These reuse the same Data Sharing endpoints delivered in Phase 1 — the additional work is in mapping your core banking product data into the Data Sharing schemas.

### SME Data Sharing — Current & Savings Accounts

Deliver [Data Sharing](../v2.1/banking/data-sharing/) for SME Current Accounts and Savings Accounts, prioritising the same endpoints as retail in Phase 1 (`/accounts`, `/accounts/{AccountId}`, `/balances`, `/transactions`, `/customer`, `/accounts/{AccountId}/customer`).

### SME Single Instant Payment

Deliver [Single Instant Payment](../v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements) for SME customers.

### SME Refunds

Deliver [Refunds](../v2.1/banking/service-initiation/refunds/requirements) for SME payment consents.

### SME Confirmation of Payee

Deliver [CoP](../v2.1/banking/confirmation-of-payee/requirements) for SME customers.

### SME Consent Management Interface

Provide a [Consent Management Interface](../v2.1/consent-management-interface/) in your SME banking channels, using the same Consent Manager APIs as the retail CMI.

::: info Separate API Hub for SME
SME propositions will typically require a second API Hub instance alongside the retail one, because each Hub exposes only one authorization endpoint. The second Hub can be pointed at the same Ozone Connect deployment — routing internally on the `o3-provider-id` header — and the LFI-held certificates (C3, S4, Sig4, Enc1) are shared across both Hubs. See [Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments](/knowledge-base/articles/multi-segment-api-hubs) for the full deployment pattern and Trust Framework implications.
:::


## Phase 4 — SME Complex Payments

Phase 4 completes the SME proposition with the more complex payment flows.

### SME Multi-Payments (all flavours)

Deliver all domestic multi-payment types for SME — the same set as Phase 2, applied to SME accounts.

### SME Multi-Authorization

Implement [Multi-Authorization](../v2.1/banking/service-initiation/multi-authorization) for SME payment consents that require multiple authorisers (for example, a business account with two-signatory rules).


## After Phase 4

By the end of Phase 4 you will have delivered all of the current Open Finance capabilities across both retail and SME propositions. From here, ongoing work is driven by version upgrades, new API families, errata, and regulatory changes — continue to track the [API Hub Release Notes](/tech/release-notes-and-erratas/release-notes/api-hub/2026) schedule and plan subsequent work against your own delivery cycles.

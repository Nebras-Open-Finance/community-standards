---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Trust Framework – API Resources

**API Resources** are registered under your Authorisation Server and describe the specific API endpoints your organisation exposes to TPPs. Each API resource is associated with a set of scopes and a base URL, allowing TPPs to discover what you offer and how to reach it.

TPPs can discover the endpoints you expose via [`GET /participants`](/tech/tpp-standards/trust-framework/open-api/participants).

## What is an API Resource?

An API resource entry in the Trust Framework directory tells TPPs:

- **Which API family** you support (e.g. banking data sharing, payment initiation)
- **Where to send requests** (the base URL for that API on your infrastructure)
- **Which scopes are applicable** for that API family

When a TPP dynamically registers with your authorisation server, it uses the API resource entries to understand which scopes to request and which base URL to call.

## API Families

The Open Finance UAE ecosystem organises APIs into **API families**. Each family groups a set of related endpoints that the **API Hub exposes to TPPs**. The Base URL for these TPP-facing endpoints is always your API Hub resource server:

| Environment | Base URL |
|-------------|----------|
| Pre-production | `https://rs1.{lfiCode}.preprod.apihub.openfinance.ae` |
| Production | `https://rs1.{lfiCode}.apihub.openfinance.ae` |

When a TPP calls one of these endpoints, the API Hub validates the request and routes it to the corresponding endpoint on your **Ozone Connect** implementation. The tables below show each TPP-facing API resource and the Ozone Connect endpoint it maps to.

The structure and schema of all available API families can be retrieved from the Trust Framework via [`GET /references/apifamilies`](/tech/lfi-api-hub/trust-framework/api/api-families) — this returns the family definitions, including their endpoint patterns and metadata schemas.

::: info Publishing to production
An LFI can only publish API resources to the **production** Trust Framework once they have completed [Functional Certification](/tech/lfi-api-hub/production/testing-certification/functional). API resources MAY be published to the **sandbox** Trust Framework at any time for development and testing.
:::

::: tip API Hub default endpoints
Endpoints marked **API Hub default** are delivered entirely by the API Hub — the LFI does not need to implement them in Ozone Connect. These endpoints MUST always be included when publishing the API family.
:::

The following families are available in version **2.1**:

### Account Information (`account-information`)

Banking data sharing — account information, balances, transactions, beneficiaries, and related sub-resources.

| API Resource (TPP-facing) | Ozone Connect Endpoint |
|----------|-------------|
| [`GET /accounts`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts) | [`GET /accounts`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts) |
| [`GET /accounts/{AccountId}`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId) | [`GET /accounts/{accountId}`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId) |
| [`GET /accounts/{AccountId}/balances`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances) | [`GET /accounts/{accountId}/balances`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances) |
| [`GET /accounts/{AccountId}/transactions`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions) | [`GET /accounts/{accountId}/transactions`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions) |
| [`GET /accounts/{AccountId}/beneficiaries`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries) | [`GET /accounts/{accountId}/beneficiaries`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries) |
| [`GET /accounts/{AccountId}/direct-debits`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits) | [`GET /accounts/{accountId}/direct-debits`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits) |
| [`GET /accounts/{AccountId}/standing-orders`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders) | [`GET /accounts/{accountId}/standing-orders`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders) |
| [`GET /accounts/{AccountId}/scheduled-payments`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments) | [`GET /accounts/{accountId}/scheduled-payments`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments) |
| [`GET /accounts/{AccountId}/statements`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements) | [`GET /accounts/{accountId}/statements`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements) |
| [`GET /accounts/{AccountId}/product`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-products) | [`GET /accounts/{accountId}/products`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products) |
| [`GET /accounts/{AccountId}/parties`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties) | [`GET /accounts/{accountId}/customer`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer) |
| [`GET /parties`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties) | [`GET /customer`](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer) |
| [`GET /account-access-consents`](/tech/tpp-standards/v2.1/consent/open-api/account-access-consents) | **API Hub default** |
| [`GET /account-access-consents/{ConsentId}`](/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId) | **API Hub default** |

### Payment Initiation (`payment`)

Payment initiation — domestic single payments and multi-payments.

| API Resource (TPP-facing) | Ozone Connect Endpoint |
|----------|-------------|
| [`POST /payments`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments) | [`POST /payments`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) |
| [`GET /payments/{PaymentId}`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId) | [`GET /payments/{paymentId}`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId) |
| [`POST /payment-consents/{ConsentId}/refund`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund) | [`POST /payment-consents/{consentId}/refund`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund) |
| [`GET /payment-consents`](/tech/tpp-standards/v2.1/consent/open-api/payment-consents) | **API Hub default** |
| [`GET /payment-consents/{ConsentId}`](/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId) | **API Hub default** |

### Confirmation of Payee (`confirmation`)

Confirmation of payee — payee name verification before initiating a payment.

| API Resource (TPP-facing) | Ozone Connect Endpoint |
|----------|-------------|
| [`POST /confirmation`](/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation) | [`POST /customers/action/cop-query`](/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query) |
| [`GET /discovery`](/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery) | **API Hub default** |

### ATM (`atm`)

ATM location data — publicly accessible, no consent required.

| API Resource (TPP-facing) | Ozone Connect Endpoint |
|----------|-------------|
| [`GET /atms`](/tech/tpp-standards/v2.1/banking/atms/open-api/atms) | [`GET /atm`](/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm) |

### Products & Leads (`product`)

Product catalogue and lead generation — publicly accessible product listings.

| API Resource (TPP-facing) | Ozone Connect Endpoint |
|----------|-------------|
| [`GET /products`](/tech/tpp-standards/v2.1/banking/products-leads/open-api/products) | [`GET /products`](/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/products) |
| [`POST /leads`](/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads) | [`POST /leads`](/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/leads) |

## Relationship to Scopes

Each API family carries a defined set of OAuth 2.0 scopes. When you register an API resource, the Trust Framework associates those scopes with your authorisation server. TPPs requesting tokens for a given scope will be directed to your server as the resource owner for that family.

## Next Steps

- [Creating an API Resource](./creating) — step-by-step walkthrough
- [API Resource Meta Data](./meta) — metadata schema for each API family

---
next: false
prev: false
aside: false
pageClass: requirements-page
---

# Products and Leads - Requirements

The [User Journeys](./user-journeys) must be adhered to.

The tables below list the validation rules and operational requirements that apply to Products and Leads. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BDSP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## GET [`/products`](/tech/tpp-standards/v2.1/banking/products-leads/open-api/products) — Retrieve Product Data

The Products API does not require user consent. The TPP authenticates using a client credentials grant and calls each LFI individually. All LFI `GET /products` requests must be made in parallel unless the User has specifically filtered out (de-selected) individual LFIs.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token obtained via a `client_credentials` grant with `products` scope. | API Hub |
| 2 | `x-fapi-customer-ip-address` | **Required.** Must be included on every `GET /products` request to prove that the User is present in the interaction. Must be a valid IPv4 or IPv6 address. | TPP |
| 3 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 4 | OpenAPI schema | The request must conform to the [GET `/products` OpenAPI schema](/tech/tpp-standards/v2.1/banking/products-leads/open-api/products). No additional or undocumented parameters are permitted. | API Hub |

## POST [`/leads`](/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads) — Submit a Lead

The Leads API allows a TPP to refer a User to a specific LFI when the User wishes further information about a specific product or wishes the LFI to contact them. 

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token obtained via a `client_credentials` grant with `products` scope. | API Hub |
| 2 | `x-fapi-customer-ip-address` | **Required.** Must be included on every `POST /leads` request. Must be a valid IPv4 or IPv6 address. | TPP |
| 3 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 4 | OpenAPI schema | The request must conform to the [POST `/leads` OpenAPI schema](/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads). | API Hub |

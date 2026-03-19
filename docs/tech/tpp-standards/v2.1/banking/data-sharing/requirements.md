---
next: false
prev: false
aside: false
---

# Bank Data Sharing - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) must be adhered to.

The tables below list the validation rules that apply to Bank Data Sharing. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BDSP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST `/par` — Consent Creation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 2 | `consent.Permissions` | If any of `ReadBalances`, `ReadBeneficiariesBasic`, `ReadBeneficiariesDetail`, `ReadTransactionsBasic`, `ReadTransactionsDetail`, `ReadProduct`, `ReadScheduledPaymentsBasic`, `ReadScheduledPaymentsDetail`, `ReadDirectDebits`, `ReadStandingOrdersBasic`, `ReadStandingOrdersDetail`, `ReadStatements`, or `ReadProductFinanceRates` are included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 3 | OpenAPI schema | The request body must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |

## GET `/accounts`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadAccountsBasic` or `ReadAccountsDetail`. | API Hub |
| 3 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 4 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 5 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 6 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadAccountsBasic` or `ReadAccountsDetail`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/balances`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadBalances`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/beneficiaries`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadBeneficiariesBasic` or `ReadBeneficiariesDetail`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/direct-debits`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadDirectDebits`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/product`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadProduct`. `ReadProductFinanceRates` is required for finance rate data to be included in the response. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/scheduled-payments`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadScheduledPaymentsBasic` or `ReadScheduledPaymentsDetail`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/standing-orders`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadStandingOrdersBasic` or `ReadStandingOrdersDetail`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/transactions`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadTransactionsBasic` or `ReadTransactionsDetail`. `ReadFXTransactionsBasic`, `ReadFXTransactionsDetail`, or `ReadFXRemittanceCharges` are required for FX transaction data to be included. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `fromBookingDateTime` | If provided, must be a valid ISO 8601 date-time. Time component is optional (defaults to `00:00:00`). Any timezone offset must be ignored by the LFI. | LFI |
| 5 | `toBookingDateTime` | If provided, must be a valid ISO 8601 date-time. Time component is optional (defaults to `00:00:00`). Any timezone offset must be ignored by the LFI. | LFI |
| 6 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 7 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 8 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 9 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/statements`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadStatements`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `fromStatementDate` | If provided, must be a valid ISO 8601 date. Filtering is open-ended if not provided. | LFI |
| 5 | `toStatementDate` | If provided, must be a valid ISO 8601 date. Filtering is open-ended if not provided. | LFI |
| 6 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 7 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 8 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 9 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/accounts/{AccountId}/parties`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadParty`, `ReadPartyUser`, or `ReadPartyUserIdentity`. | API Hub |
| 3 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

## GET `/parties`

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `consent.Permissions` | The consent must include `ReadParty`, `ReadPartyUser`, or `ReadPartyUserIdentity`. | API Hub |
| 3 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 4 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 5 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 6 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

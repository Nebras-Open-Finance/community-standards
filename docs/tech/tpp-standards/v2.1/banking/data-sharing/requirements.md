---
next: false
prev: false
aside: false
---

# Bank Data Sharing - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) must be adhered to.

The tables below list the validation rules that apply to Bank Data Sharing. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BDSP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST [`/par`](/tech/tpp-standards/v2.1/consent/open-api/par) — Consent Creation

The consent is submitted inside a signed [Request JWT](/tech/tpp-standards/security/fapi/request-jwt) sent to the Authorization Server. The `consent.*` fields referenced in the table below are nested as `authorization_details[0].consent` within that JWT. The POST body must also include a [client assertion](/tech/tpp-standards/security/tokens/client-assertion) to authenticate the TPP application.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 2 | `consent.Permissions` | If any of `ReadBalances`, `ReadBeneficiariesBasic`, `ReadBeneficiariesDetail`, `ReadTransactionsBasic`, `ReadTransactionsDetail`, `ReadProduct`, `ReadScheduledPaymentsBasic`, `ReadScheduledPaymentsDetail`, `ReadDirectDebits`, `ReadStandingOrdersBasic`, `ReadStandingOrdersDetail`, `ReadStatements`, or `ReadProductFinanceRates` are included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 3 | `consent.AccountType` | Must be a value supported by the target LFI. Supported account types are discoverable via the `AccountTypes` flag on the LFI's authorisation server entry in the [Trust Framework](/tech/tpp-standards/trust-framework/api-discovery). | LFI (`/consent/action/validate`) |
| 4 | `consent.AccountSubType` | If provided, each value must be a sub-type supported by the target LFI. Supported sub-types are discoverable via the `AccountSubTypes` metadata on the LFI's authorisation server entry in the [Trust Framework](/tech/tpp-standards/trust-framework/api-discovery). | LFI (`/consent/action/validate`) |
| 5 | `consent.Permissions` (unsupported) | If the provided Permissions include permissions not supported by the target LFI (e.g. the target LFI does not have the endpoint `/accounts/{AccountId}/standing-orders` published to the Trust Framework yet the consent request includes `ReadStandingOrdersBasic` or `ReadStandingOrdersDetail`), the consent validation will fail. | LFI (`/consent/action/validate`) |
| 6 | `consent.BaseConsentId` | If provided, must reference a previous consent belonging to the **same end user**. If the original consent in the chain already had a `BaseConsentId`, the TPP must reuse that same `BaseConsentId` rather than the immediate prior `ConsentId`. | LFI (`/consent/action/validate`) |
| 7 | OpenAPI schema | The request must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 8 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 9 | `client_assertion` | Must be included in the POST body (`client_assertion_type`: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`). Authenticates the TPP application — see [Client Assertion](/tech/tpp-standards/security/tokens/client-assertion). | API Hub |
| 10 | Request JWT | Must conform to the [Request JWT requirements](/tech/tpp-standards/security/fapi/request-jwt) — correct `aud`, signing algorithm (`PS256`), and expiry window. | API Hub |
| 11 | `scope` (in Request JWT) | Must be `accounts openid`. | API Hub |
| 12 | `authorization_details[0].type` (in Request JWT) | Must be `urn:openfinanceuae:account-access-consent:v2.1`. | API Hub |

## Authorization — Account Selection

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | Eligible accounts | If the authenticated PSU does not hold any accounts matching the requested consent parameters (e.g. `AccountType`, `AccountSubType`, or the permissions requested), the consent will be set to `Rejected` with `error`: `invalid_request` and `error_description`: `user_lacks_eligible_accounts`. | LFI |

## GET [`/accounts`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadAccountsBasic` or `ReadAccountsDetail`. | API Hub |
| 4 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 8 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |

## GET [`/accounts/{AccountId}`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadAccountsBasic` or `ReadAccountsDetail`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |

## GET [`/accounts/{AccountId}/balances`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadBalances`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |

## GET [`/accounts/{AccountId}/beneficiaries`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadBeneficiariesBasic` or `ReadBeneficiariesDetail`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. | LFI |

## GET [`/accounts/{AccountId}/direct-debits`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadDirectDebits`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. | LFI |

## GET [`/accounts/{AccountId}/product`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-products)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadProduct`. `ReadProductFinanceRates` is required for finance rate data to be included in the response. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |
| 10 | `FinanceRates` — key request | If `FinanceRates` is returned as a JWE, the TPP must prompt the User to enter the encryption key delivered to them by the LFI (e.g. via SMS or push notification) before decryption can proceed. | TPP |
| 11 | `FinanceRates` — local decryption | Decryption of the JWE must be performed locally on the User's device. The decrypted data must not be transmitted to the TPP's servers or persisted in any storage accessible to the TPP's application. | TPP |
| 12 | `FinanceRates` — data usage | The decrypted data must only be used to display the rates to the User within the active session. The TPP must not store, transmit, or otherwise process the unencrypted data. | TPP |
| 13 | `FinanceRates` — expiry | The TPP must observe the `exp` value in the JWE header and discard any decrypted data once the expiry threshold has passed. If the data is still required, the TPP must repeat the API operation to retrieve a fresh response — the original consent must still be valid for this to succeed. | TPP |
| 14 | `FinanceRates` — session discard | The TPP must discard all decrypted data from memory when the User closes their session, regardless of whether `exp` has been reached. | TPP |

## GET [`/accounts/{AccountId}/scheduled-payments`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadScheduledPaymentsBasic` or `ReadScheduledPaymentsDetail`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. | LFI |

## GET [`/accounts/{AccountId}/standing-orders`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadStandingOrdersBasic` or `ReadStandingOrdersDetail`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. | LFI |

## GET [`/accounts/{AccountId}/transactions`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadTransactionsBasic` or `ReadTransactionsDetail`. `ReadFXTransactionsBasic`, `ReadFXTransactionsDetail`, or `ReadFXRemittanceCharges` are required for FX transaction data to be included. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `fromBookingDateTime` | If provided, must be a valid ISO 8601 date-time. Time component is optional (defaults to `00:00:00`). Any timezone offset must be ignored by the LFI. | LFI |
| 6 | `toBookingDateTime` | If provided, must be a valid ISO 8601 date-time. Time component is optional (defaults to `00:00:00`). Any timezone offset must be ignored by the LFI. | LFI |
| 7 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 8 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 9 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 10 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 11 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |

## GET [`/accounts/{AccountId}/statements`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadStatements`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `fromStatementDate` | If provided, must be a valid ISO 8601 date. Filtering is open-ended if not provided. | LFI |
| 6 | `toStatementDate` | If provided, must be a valid ISO 8601 date. Filtering is open-ended if not provided. | LFI |
| 7 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 8 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 9 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 10 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 11 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |

## GET [`/accounts/{AccountId}/parties`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadParty`, `ReadPartyUser`, or `ReadPartyUserIdentity`. | API Hub |
| 4 | `AccountId` | Must be a valid account ID shared by the customer — i.e. returned by `GET /accounts` using an access token bound to the same consent. | LFI |
| 5 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 6 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 7 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 8 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 9 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |

## GET [`/parties`](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/account-information/v2.1/accounts`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:account-access-consent:v2.1`). | API Hub |
| 3 | `consent.Permissions` | The consent must include `ReadParty`, `ReadPartyUser`, or `ReadPartyUserIdentity`. | API Hub |
| 4 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 5 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 6 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 7 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |
| 8 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, `Mortgage`. | LFI |

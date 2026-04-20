---
next: false
prev: false
aside: false
pageClass: requirements-page
---

# Variable Defined Schedule - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Variable Defined Schedule. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST [`/par`](/tech/tpp-standards/v2.1/consent/open-api/par) — Consent Creation

The consent is submitted inside a signed [Request JWT](/tech/tpp-standards/security/fapi/request-jwt) sent to the Authorization Server. The `consent.*` fields referenced in the table below are nested as `authorization_details[0].consent` within that JWT. The POST body must also include a [client assertion](/tech/tpp-standards/security/tokens/client-assertion) to authenticate the TPP application.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | Request JWT | Must conform to the [Request JWT requirements](/tech/tpp-standards/security/fapi/request-jwt) — correct `aud`, signing algorithm (`PS256`), and expiry window. | API Hub |
| 2 | `client_assertion` | Must be included in the POST body (`client_assertion_type`: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`). Authenticates the TPP application — see [Client Assertion](/tech/tpp-standards/security/tokens/client-assertion). | API Hub |
| 3 | `scope` (in Request JWT) | Must be `payments openid`. If `consent.Permissions` includes any of `ReadAccountsBasic`, `ReadAccountsDetail`, or `ReadBalances`, must be `accounts payments openid` — see [Account Permissions in a Payment Consent](/knowledge-base/articles/payment-account-permissions). | API Hub |
| 4 | `authorization_details[0].type` (in Request JWT) | Must be `urn:openfinanceuae:service-initiation-consent:v2.1`. | API Hub |
| 5 | API version supported | The consent version in `authorization_details[0].type` (e.g. `urn:openfinanceuae:service-initiation-consent:v2.1`) restricts the version of the Payment Initiation endpoints the consent can be used to call (specified in the path, e.g. `/open-finance/payment/v2.1/payments`). It MUST resolve to an `ApiVersion` the LFI has published in the [Trust Framework](/tech/tpp-standards/trust-framework/api-discovery) for the Payment Initiation API family. | LFI (`/consent/action/validate`) |
| 6 | OpenAPI schema | The request must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 7 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/). No additional or undocumented parameters are permitted. | LFI (`/consent/action/validate`) |
| 8 | `consent.PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | Monitored by Nebras |
| 9 | `Initiation.DebtorAccount` | If provided, must reference a valid UAE IBAN held at the LFI and reachable through this API Hub. The account must be in a state that permits payment initiation (e.g. not blocked, dormant, or closed). | LFI (`/consent/action/validate`) |
| 10 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. The Creditor must be a valid UAE domestic creditor — the account must be reachable on a supported UAE domestic rail (AANI or UAEFTS) and, where the LFI can determine the state of the receiving account, in a state able to receive payments. Mandatory fields, IBAN, and BIC derivation rules apply — see [creditor field validation requirements](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement). | LFI (`/consent/action/validate`) |
| 11 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |
| 12 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"VariableDefinedSchedule"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 13 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule` | Required. Must be a non-empty array of schedule entries. | API Hub |
| 14 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Required on each entry. Each date must be unique within the schedule — duplicate execution dates are not permitted. | API Hub |
| 15 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Must be today or in the future. Past dates are not permitted. | API Hub |
| 16 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].MaximumIndividualAmount` | Required on each entry. Defines the maximum amount that may be collected on that execution date. | API Hub |
| 17 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].MaximumIndividualAmount.Currency` | Must be `AED` on each entry. | API Hub |
| 18 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeNumberOfPayments` | If provided, defines the maximum total number of payments permitted across the lifetime of the consent. | API Hub |
| 19 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeValueOfPayments` | If provided, defines the maximum total value of all payments permitted across the lifetime of the consent. | API Hub |
| 20 | `MaximumCumulativeValueOfPayments` | If set, `MaximumCumulativeValueOfPayments.Currency` must be `AED`. | API Hub |
| 21 | Consent (unsupported) | The LFI must advertise Variable Defined Schedule as supported via `ApiMetadata.VariableDefinedSchedule.Supported` on its authorisation server entry in the [Trust Framework](/tech/tpp-standards/trust-framework/api-discovery). If the payment type is not supported, the consent validation will fail. | LFI (`/consent/action/validate`) |
| 22 | `consent.BaseConsentId` | If provided, must reference a previous consent belonging to the **same end user**. If the original consent in the chain already had a `BaseConsentId`, the TPP must reuse that same `BaseConsentId` rather than the immediate prior `ConsentId`. | LFI (`/consent/action/validate`) |
| 23 | `consent.IsSingleAuthorization` | Optional; default is `false`. Omitting or setting to `false` asserts that the TPP supports the multi-authorization flow — the consent may remain pending while additional authorizers approve before reaching `Authorized`. Setting to `true` requests that only accounts solely authorizable by the authenticated PSU be offered. The LFI must not reject the consent based on its own platform capability — this is a TPP-side assertion. See [Multi-Authorization](/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization). | TPP |
| 24 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 25 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. The date portion of `consent.ExpirationDateTime` must exactly equal the last (latest) `PaymentExecutionDate` in the schedule. | API Hub |
| 26 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 27 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI (`/consent/action/validate`) |
| 28 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 29 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |

## Authorization — Account Selection

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Initiation.DebtorAccount` ownership | If `Initiation.DebtorAccount` was provided on the consent and the authenticated PSU does not hold that account, the consent will be set to `Rejected` with `error`: `invalid_request` and `error_description`: `user_does_not_own_debtor_account`. | LFI |
| 2 | `consent.IsSingleAuthorization` | If `true`, only accounts that the authenticated PSU can solely authorize (no subsequent approvers required) may be offered and selected. If `false` or not provided (default), accounts where the PSU is one of multiple required authorizers may also be offered; subsequent authorizers must then approve the consent before the consent reaches `Authorized` status and any payment can be executed. See [Multi-Authorization](/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization). | LFI |
| 3 | Eligible payment accounts | If the authenticated PSU does not hold any account eligible to initiate a payment under this consent, the consent will be set to `Rejected` with `error`: `invalid_request` and `error_description`: `user_lacks_eligible_accounts`. The eligible set is constrained by `consent.IsSingleAuthorization` as described above. | LFI |

## POST [`/payments`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments) — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token issued with the `payments openid` scope (or `accounts payments openid` where account permissions were included on the consent — see [Account Permissions in a Payment Consent](/knowledge-base/articles/payment-account-permissions)). The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/service-initiation/v2.1/payments`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:service-initiation-consent:v2.1`). | API Hub |
| 3 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 4 | `Data.Instruction.Amount.Amount` | Must be ≤ the `MaximumIndividualAmount` defined for the corresponding `PaymentExecutionDate` in the schedule. | API Hub |
| 5 | `Data.Instruction.Amount.Currency` | Must match the currency defined on the schedule entry. | API Hub |
| 6 | `MaximumCumulativeNumberOfPayments` | If set on the consent, the payment must not cause the count of payments over the lifetime of the consent to exceed `MaximumCumulativeNumberOfPayments`. | API Hub |
| 7 | `MaximumCumulativeValueOfPayments` | If set on the consent, the payment must not cause the value of payments over the lifetime of the consent to exceed `MaximumCumulativeValueOfPayments.Amount`. | API Hub |
| 8 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 9 | `PaymentExecutionDate` | Only one payment is permitted per `PaymentExecutionDate`. A second submission for the same date will be rejected. | API Hub |
| 10 | OpenAPI schema | The request must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 11 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/). No additional or undocumented parameters are permitted. | LFI |
| 12 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | Monitored by Nebras |
| 13 | `PersonalIdentifiableInformation` (Creditor) | `Initiation.Creditor[]` had exactly 1 entry at consent time. The submitted creditor must exactly match that consent-time entry. See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor). | LFI |
| 14 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 15 | `x-idempotency-key` | Must be included. Must be a stable, unique value per payment attempt — the same key must be reused on retries of the same payment. | API Hub |
| 16 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 17 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 18 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

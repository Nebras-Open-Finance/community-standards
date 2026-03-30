---
next: false
prev: false
aside: false
---

# Fixed Periodic Schedule - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Fixed Periodic Schedule. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST [`/par`](/tech/tpp-standards/v2.1/consent/open-api/par) — Consent Creation

The consent is submitted inside a signed [Request JWT](/tech/tpp-standards/security/fapi/request-jwt) sent to the Authorization Server. The `consent.*` fields referenced in the table below are nested as `authorization_details[0].consent` within that JWT. The POST body must also include a [client assertion](/tech/tpp-standards/security/tokens/client-assertion) to authenticate the TPP application.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"FixedPeriodicSchedule"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount` | Required. Defines the exact fixed amount for each payment within a period. | API Hub |
| 3 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount.Currency` | Must be `AED`. | API Hub |
| 4 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodType` | Required. Defines the period boundary (e.g. `Week`, `Month`). | API Hub |
| 5 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate` | Required. The date from which each period is counted. Must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 6 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeNumberOfPayments` | Required. Defines the total number of payments permitted across the lifetime of the consent. | API Hub |
| 7 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeValueOfPayments` | If set, defines the maximum total value of all payments permitted across the lifetime of the consent. | API Hub |
| 8 | `MaximumCumulativeValueOfPayments` | If set, `MaximumCumulativeValueOfPayments.Currency` must be `AED`. | API Hub |
| 9 | *(implicit)* | Only 1 payment is allowed per period. Always enforced. | API Hub |
| 10 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 11 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 12 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 13 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 14 | `consent.BaseConsentId` | If provided, must reference a previous consent belonging to the **same end user**. If the original consent in the chain already had a `BaseConsentId`, the TPP must reuse that same `BaseConsentId` rather than the immediate prior `ConsentId`. | LFI |
| 15 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |
| 16 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |
| 17 | OpenAPI schema | The request must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 18 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 19 | `consent.PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | Monitored by Nebras |
| 20 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |
| 21 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 22 | `client_assertion` | Must be included in the POST body (`client_assertion_type`: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`). Authenticates the TPP application — see [Client Assertion](/tech/tpp-standards/security/tokens/client-assertion). | API Hub |
| 23 | Request JWT | Must conform to the [Request JWT requirements](/tech/tpp-standards/security/fapi/request-jwt) — correct `aud`, signing algorithm (`PS256`), and expiry window. | API Hub |
| 24 | `scope` (in Request JWT) | Must be `payments openid`. If `consent.Permissions` includes any of `ReadAccountsBasic`, `ReadAccountsDetail`, or `ReadBalances`, must be `accounts payments openid` — see [Account Permissions in a Payment Consent](/knowledge-base/articles/payment-account-permissions). | API Hub |
| 25 | `authorization_details[0].type` (in Request JWT) | Must be `urn:openfinanceuae:service-initiation-consent:v2.1`. | API Hub |

## POST [`/payments`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments) — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token. The consent bound to the token must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | URL version | The version in the request URL path (e.g. `v2.1` in `/open-finance/service-initiation/v2.1/payments`) must match the version in the consent's `authorization_details[0].type` (`urn:openfinanceuae:service-initiation-consent:v2.1`). | API Hub |
| 3 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 4 | `Data.Instruction.Amount.Amount` | Must exactly match `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount.Amount`. | API Hub |
| 5 | `Data.Instruction.Amount.Currency` | Must exactly match `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount.Currency`. | API Hub |
| 6 | `MaximumCumulativeNumberOfPayments` | The payment must not cause the count of payments over the lifetime of the consent to exceed `MaximumCumulativeNumberOfPayments`. | API Hub |
| 7 | `MaximumCumulativeValueOfPayments` | If set on the consent, the payment must not cause the value of payments over the lifetime of the consent to exceed `MaximumCumulativeValueOfPayments.Amount`. | API Hub |
| 8 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 9 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 10 | *(implicit)* | Only one payment is permitted per period. A second `POST /payments` within the same period will be rejected. | API Hub |
| 11 | `PersonalIdentifiableInformation` (Creditor) | `Initiation.Creditor[]` had 1 entry at consent time. `CreditorAccount.SchemeName`, `CreditorAccount.Identification`, and `CreditorAccount.Name` must exactly match that entry. See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor). | LFI |
| 12 | `PersonalIdentifiableInformation` (Creditor — field validation) | The creditor fields must also satisfy the [creditor field validation requirements](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement) — mandatory fields, valid UAE IBAN, and BIC derivation rules. | LFI |
| 13 | OpenAPI schema | The request must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 14 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 15 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | Monitored by Nebras |
| 16 | `CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |
| 17 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
| 18 | `x-idempotency-key` | Must be included. Must be a stable, unique value per payment attempt — the same key must be reused on retries of the same payment. | API Hub |
| 19 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 20 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 21 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

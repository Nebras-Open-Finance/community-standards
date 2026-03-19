---
next: false
prev: false
aside: false
---

# Variable Periodic Schedule - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Variable Periodic Schedule. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST `/par` — Consent Creation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"VariablePeriodicSchedule"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.MaximumIndividualAmount` | Required. Defines the maximum amount allowed for a single payment within a period. | API Hub |
| 3 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.MaximumIndividualAmount.Currency` | Must be `AED`. | API Hub |
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
| 14 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |
| 15 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |
| 16 | OpenAPI schema | The request body must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 17 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 18 | `consent.PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 19 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |
| 20 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |

## POST `/payments` — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `Data.Instruction.Amount.Amount` | Must be ≤ `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.MaximumIndividualAmount.Amount`. | API Hub |
| 3 | `Data.Instruction.Amount.Currency` | Must exactly match `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.MaximumIndividualAmount.Currency`. | API Hub |
| 4 | *(implicit)* | Only one payment is permitted per period. A second `POST /payments` within the same period will be rejected. | API Hub |
| 5 | `MaximumCumulativeNumberOfPayments` | The payment must not cause the count of payments over the lifetime of the consent to exceed `MaximumCumulativeNumberOfPayments`. | API Hub |
| 6 | `MaximumCumulativeValueOfPayments` | If set on the consent, the payment must not cause the value of payments over the lifetime of the consent to exceed `MaximumCumulativeValueOfPayments.Amount`. | API Hub |
| 7 | `PersonalIdentifiableInformation` (Creditor) | `Initiation.Creditor[]` had 1 entry at consent time. `CreditorAccount.SchemeName`, `CreditorAccount.Identification`, and `CreditorAccount.Name` must exactly match that entry. See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor). | LFI |
| 8 | `PersonalIdentifiableInformation` (Creditor — field validation) | The creditor fields must also satisfy the [creditor field validation requirements](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement) — mandatory fields, valid UAE IBAN, and BIC derivation rules. | LFI |
| 9 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 10 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 11 | OpenAPI schema | The request body must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 12 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 13 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 14 | `CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |
| 15 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 16 | `x-idempotency-key` | Must be included. Must be a stable, unique value per payment attempt — the same key must be reused on retries of the same payment. | API Hub |
| 17 | `x-fapi-auth-date` | Must be sent when the customer is authenticated at the time of the call. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 18 | `x-fapi-customer-ip-address` | Must be sent when the customer is actively present at the time of the call. Must be a valid IPv4 or IPv6 address. | TPP |
| 19 | `x-customer-user-agent` | Should be sent when the customer is actively present. Should reflect the user-agent of the customer's browser or device. | TPP |

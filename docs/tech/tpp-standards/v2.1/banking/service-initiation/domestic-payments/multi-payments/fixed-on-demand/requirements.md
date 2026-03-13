---
next: false
prev: false
aside: false
---

# Fixed On Demand - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Fixed On Demand. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST `/par` — Consent Creation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"FixedOnDemand"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount` | Required. Defines the exact fixed amount for each payment. | API Hub |
| 3 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount.Currency` | Must be `AED`. | API Hub |
| 4 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Controls` | At least one of `MaximumCumulativeNumberOfPaymentsPerPeriod` or `MaximumCumulativeValueOfPaymentsPerPeriod` must be provided. | API Hub |
| 5 | `MaximumCumulativeValueOfPaymentsPerPeriod` | If set, `MaximumCumulativeValueOfPaymentsPerPeriod.Currency` must be `AED`. | API Hub |
| 6 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeValueOfPayments` | If set, defines the maximum total value of all payments permitted across the lifetime of the consent. | API Hub |
| 7 | `MaximumCumulativeValueOfPayments` | If set, `MaximumCumulativeValueOfPayments.Currency` must be `AED`. | API Hub |
| 8 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 9 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 10 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 11 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 12 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |
| 13 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |
| 14 | OpenAPI schema | The request body must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 15 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 16 | `consent.PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 17 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

## POST `/payments` — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `Data.Instruction.Amount.Amount` | Must exactly match `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount.Amount`. | API Hub |
| 3 | `Data.Instruction.Amount.Currency` | Must exactly match `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Amount.Currency`. | API Hub |
| 4 | `MaximumCumulativeNumberOfPaymentsPerPeriod` | If set on the consent, the payment must not cause the count of payments in the current period to exceed `MaximumCumulativeNumberOfPaymentsPerPeriod`. | API Hub |
| 5 | `MaximumCumulativeValueOfPaymentsPerPeriod` | If set on the consent, the payment must not cause the value of payments in the current period to exceed `MaximumCumulativeValueOfPaymentsPerPeriod.Amount`. | API Hub |
| 6 | `MaximumCumulativeNumberOfPayments` | If set on the consent, the payment must not cause the count of payments over the lifetime of the consent to exceed `MaximumCumulativeNumberOfPayments`. | API Hub |
| 7 | `MaximumCumulativeValueOfPayments` | If set on the consent, the payment must not cause the value of payments over the lifetime of the consent to exceed `MaximumCumulativeValueOfPayments.Amount`. | API Hub |
| 8 | `PersonalIdentifiableInformation` (Creditor) | The `Creditor` fields (account scheme, identification, name) must exactly match those in the consent PII. | LFI |
| 9 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 10 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 11 | OpenAPI schema | The request body must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 12 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 13 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 14 | `CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

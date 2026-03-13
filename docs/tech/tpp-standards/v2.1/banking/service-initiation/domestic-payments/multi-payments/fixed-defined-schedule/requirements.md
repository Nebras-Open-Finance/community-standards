---
next: false
prev: false
aside: false
---

# Fixed Defined Schedule - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Fixed Defined Schedule. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST `/par` — Consent Creation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"FixedDefinedSchedule"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule` | Required. Must be a non-empty array of schedule entries. | API Hub |
| 3 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Required on each entry. Each date must be unique within the schedule — duplicate execution dates are not permitted. | API Hub |
| 4 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Must be today or in the future. Past dates are not permitted. | API Hub |
| 5 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Must be strictly before `consent.ExpirationDateTime`. | API Hub |
| 6 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].Amount` | Required on each entry. Defines the exact fixed amount to be collected on that execution date. | API Hub |
| 7 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].Amount.Currency` | Must be `AED` on each entry. | API Hub |
| 8 | *(implicit)* | Only 1 payment is allowed per `PaymentExecutionDate`. Always enforced. | API Hub |
| 9 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeNumberOfPayments` | If provided, defines the maximum total number of payments permitted across the lifetime of the consent. | API Hub |
| 10 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeValueOfPayments` | If provided, defines the maximum total value of all payments permitted across the lifetime of the consent. | API Hub |
| 11 | `MaximumCumulativeValueOfPayments` | If set, `MaximumCumulativeValueOfPayments.Currency` must be `AED`. | API Hub |
| 12 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 13 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 14 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 15 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 16 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |
| 17 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |
| 18 | OpenAPI schema | The request body must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 19 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 20 | `consent.PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 21 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

## POST `/payments` — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `Data.Instruction.Amount.Amount` | Must exactly match the `Amount` defined for the corresponding `PaymentExecutionDate` in the schedule. | API Hub |
| 3 | `Data.Instruction.Amount.Currency` | Must match the currency defined on the schedule entry. | API Hub |
| 4 | `PaymentExecutionDate` | Only one payment is permitted per `PaymentExecutionDate`. A second submission for the same date will be rejected. | API Hub |
| 5 | `MaximumCumulativeNumberOfPayments` | If set on the consent, the payment must not cause the count of payments over the lifetime of the consent to exceed `MaximumCumulativeNumberOfPayments`. | API Hub |
| 6 | `MaximumCumulativeValueOfPayments` | If set on the consent, the payment must not cause the value of payments over the lifetime of the consent to exceed `MaximumCumulativeValueOfPayments.Amount`. | API Hub |
| 7 | `PersonalIdentifiableInformation` (Creditor) | The `Creditor` fields (account scheme, identification, name) must exactly match those in the consent PII. | LFI |
| 8 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 9 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 10 | OpenAPI schema | The request body must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 11 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 12 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 13 | `CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

---
next: false
prev: false
aside: false
---

# Variable On Demand - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Variable On Demand. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST `/par` — Consent Creation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"VariableOnDemand"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Controls` | At least one of `MaximumIndividualAmount`, `MaximumCumulativeNumberOfPaymentsPerPeriod`, or `MaximumCumulativeValueOfPaymentsPerPeriod` must be provided. | API Hub |
| 3 | `MaximumIndividualAmount` | If set, `MaximumIndividualAmount.Currency` must be set to `AED`. | API Hub |
| 4 | `MaximumCumulativeValueOfPaymentsPerPeriod` | If set, `MaximumCumulativeValueOfPaymentsPerPeriod.Currency` must be set to `AED`. | API Hub |
| 5 | `MaximumCumulativeValueOfPayments` | If set, `MaximumCumulativeValueOfPayments.Currency` must be set to `AED`. | API Hub |
| 6 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 7 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 8 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 9 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 10 | `Initiation.Creditor` | Optional. If provided, must contain no more than 10 creditor entries. | LFI |
| 11 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |
| 12 | OpenAPI schema | The request body must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 13 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 14 | `consent.PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 15 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

## POST `/payments` — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `MaximumIndividualAmount` | If set on the consent, `Data.Instruction.Amount.Amount` must be ≤ `MaximumIndividualAmount.Amount`. | API Hub |
| 3 | `MaximumIndividualAmount` | If set on the consent, `Data.Instruction.Amount.Currency` must exactly match `MaximumIndividualAmount.Currency`. | API Hub |
| 4 | `MaximumCumulativeNumberOfPaymentsPerPeriod` | If set on the consent, the payment must not cause the count of payments in the current period to exceed `MaximumCumulativeNumberOfPaymentsPerPeriod`. | API Hub |
| 5 | `MaximumCumulativeValueOfPaymentsPerPeriod` | If set on the consent, the payment must not cause the value of payments in the current period to exceed `MaximumCumulativeValueOfPaymentsPerPeriod.Amount`. | API Hub |
| 6 | `MaximumCumulativeValueOfPaymentsPerPeriod` | If set on the consent, `Data.Instruction.Amount.Currency` must exactly match `MaximumCumulativeValueOfPaymentsPerPeriod.Currency`. | API Hub |
| 7 | `MaximumCumulativeNumberOfPayments` | If set on the consent, the payment must not cause the count of payments over the lifetime of the consent to exceed `MaximumCumulativeNumberOfPayments`. | API Hub |
| 8 | `MaximumCumulativeValueOfPayments` | If set on the consent, the payment must not cause the value of payments over the lifetime of the consent to exceed `MaximumCumulativeValueOfPayments.Amount`. | API Hub |
| 9 | `PersonalIdentifiableInformation` (Creditor) | Depends on the beneficiary model set at consent time. **Single beneficiary** (`Initiation.Creditor[]` had 1 entry): `CreditorAccount.SchemeName`, `CreditorAccount.Identification`, and `CreditorAccount.Name` must exactly match that entry. **Multiple beneficiaries** (2–10 entries): must exactly match one entry from the pre-approved list. **Open beneficiary** (`Initiation.Creditor[]` omitted at consent): no consent-time match required — any valid creditor may be supplied. See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor). | LFI |
| 10 | `PersonalIdentifiableInformation` (Creditor — field validation) | The creditor fields must also satisfy the [creditor field validation requirements](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement) — mandatory fields, valid UAE IBAN, and BIC derivation rules. | LFI |
| 11 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 12 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 13 | OpenAPI schema | The request body must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 14 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 15 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 16 | `CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

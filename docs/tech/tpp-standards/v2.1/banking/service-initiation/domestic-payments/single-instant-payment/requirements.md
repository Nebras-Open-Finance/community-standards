---
next: false
prev: false
aside: false
---

# Single Instant Payment - Requirements

The tables below list the validation rules that apply to Single Instant Payment. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST `/par` — Consent Creation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.SinglePayment.Type` | Must be `"SingleInstantPayment"`. `MultiPayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.SinglePayment.Amount` | Required. Defines the exact amount for the payment. | API Hub |
| 3 | `consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Currency` | Must be `AED`. | API Hub |
| 4 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 5 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 6 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 7 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 8 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |
| 9 | OpenAPI schema | The request body must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 10 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |

## POST `/payments` — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `Data.Instruction.Amount.Amount` | Must exactly match `consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Amount`. | API Hub |
| 3 | `Data.Instruction.Amount.Currency` | Must exactly match `consent.ControlParameters.ConsentSchedule.SinglePayment.Amount.Currency`. | API Hub |
| 4 | `Data.PaymentPurposeCode` | Must exactly match `consent.PaymentPurposeCode`. | API Hub |
| 5 | `Data.OpenFinanceBilling` | Must exactly match `consent.OpenFinanceBilling` (including `Type` and, if present, `MerchantId`). | API Hub |
| 6 | `Data.DebtorReference` | Must exactly match `consent.DebtorReference`. | API Hub |
| 7 | `Data.CreditorReference` | Must exactly match `consent.CreditorReference`. | API Hub |
| 8 | `PersonalIdentifiableInformation` (Creditor) | The `Creditor` fields (account scheme, identification, name) must exactly match those in the consent PII. | LFI |
| 9 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 10 | *(implicit)* | Only one payment may be made against this consent. A second `POST /payments` call will be rejected. | API Hub |
| 11 | OpenAPI schema | The request body must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 12 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |

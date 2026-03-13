---
next: false
prev: false
aside: false
---

# Delegated SCA - Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Delegated SCA. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## POST `/par` — Consent Creation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be present and set to `true`. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule` | Must be an empty object `{}`. | API Hub |
| 3 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 4 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 5 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 6 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 7 | `Initiation.Creditor` | Optional. If provided, must contain no more than 10 creditor entries. | LFI |
| 8 | OpenAPI schema | The request body must conform exactly to the [POST `/par` OpenAPI schema](/tech/tpp-standards/v2.1/consent/open-api/par). No additional or undocumented parameters are permitted. | API Hub |
| 9 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 10 | `consent.PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 11 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

## POST `/payments` — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `Data.Instruction.Amount.Amount` | No amount cap is enforced by the consent. The TPP is responsible for ensuring the amount was explicitly approved by the user via their own SCA flow before initiating. | TPP |
| 3 | `PersonalIdentifiableInformation` (Creditor) | The `Creditor` fields (account scheme, identification, name) must exactly match those in the consent PII. | LFI |
| 4 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 5 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 6 | OpenAPI schema | The request body must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 7 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 8 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 9 | `CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |

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
| 12 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |

## POST `/payments` — Payment Initiation

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Data.ConsentId` | Must match the `ConsentId` bound to the access token. The Consent must be in `Authorized` status and the `ExpirationDateTime` of the Consent must be in the future. | API Hub |
| 2 | `Data.Instruction.Amount.Amount` | No amount cap is enforced by the consent. The TPP is responsible for ensuring the amount was explicitly approved by the user via their own SCA flow before initiating. | TPP |
| 3 | `PersonalIdentifiableInformation` (Creditor) | Depends on the beneficiary model set at consent time. **Single beneficiary** (`Initiation.Creditor[]` had 1 entry): `CreditorAccount.SchemeName`, `CreditorAccount.Identification`, and `CreditorAccount.Name` must exactly match that entry. **Multiple beneficiaries** (2–10 entries): must exactly match one entry from the pre-approved list. **Open beneficiary** (`Initiation.Creditor[]` omitted at consent): no consent-time match required — any valid creditor may be supplied. See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor). | LFI |
| 4 | `PersonalIdentifiableInformation` (Creditor — field validation) | The creditor fields must also satisfy the [creditor field validation requirements](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement) — mandatory fields, valid UAE IBAN, and BIC derivation rules. | LFI |
| 5 | `consent.ExpirationDateTime` | The consent must not have expired at the time of the payment request. | API Hub |
| 6 | `Data.PaymentPurposeCode` | Can differ from `consent.PaymentPurposeCode`. If provided, must be a recognised AANI purpose code. | API Hub |
| 7 | OpenAPI schema | The request body must conform exactly to the [POST `/payments` OpenAPI schema](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments). No additional or undocumented parameters are permitted. | API Hub |
| 8 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information). No additional or undocumented parameters are permitted. | LFI |
| 9 | `PersonalIdentifiableInformation.Risk` | The `Risk` block must be fully populated — every field that is known or derivable from the TPP's system must be included. See [Risk](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk). | LFI |
| 10 | `CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. | LFI |
| 11 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |
| 12 | `x-idempotency-key` | Must be included. Must be a stable, unique value per payment attempt — the same key must be reused on retries of the same payment. | API Hub |
| 13 | `x-fapi-auth-date` | Must be sent. The customer must have been authenticated by the TPP before delegating payment initiation. Must be a valid HTTP-date (RFC 7231), e.g. `Tue, 11 Sep 2012 19:43:31 UTC`. | TPP |
| 14 | `x-fapi-customer-ip-address` | Must be sent. Must be a valid IPv4 or IPv6 address. | TPP |
| 15 | `x-customer-user-agent` | Should be sent. Should reflect the user-agent of the customer's browser or device. | TPP |

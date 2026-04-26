---
next: false
prev: false
aside: false
---

🕒 **9 minute read**

# Fixed Defined Schedule — Requirements

The [Authentication requirements](/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements), [Authorization requirements](/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements), and [User Journeys](./user-journeys) must be adhered to.

The tables below list the rules that apply to Fixed Defined Schedule. All request validation of the TPP's credentials, access token, and consent is performed by the Hub before your Ozone Connect endpoint is called. The rules below cover what your Ozone Connect endpoint must validate and what it must return.


## Consent Validation

When a TPP creates a consent, the API Hub calls your [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) endpoint before the consent is created. You MUST validate the consent and respond with `status: "valid"` or `status: "invalid"`. If you respond with `invalid`, the API Hub will not create the consent and the TPP will receive an error.

This validation runs before the PSU is involved — there is no authentication or authorization at this stage. The purpose is to reject consents early that your systems cannot fulfil.

| # | Rule | Detail |
|---|------|--------|
| 1 | Unsupported `standardVersion` | The consent's `standardVersion` (a top-level property on the consent object) is the URL path version the TPP will call on subsequent payment initiation requests. If you do not support that version for the Payment Initiation API family, respond with `invalid`. <br><br> Where you are dual-running multiple versions during a deprecation window (see [Major Version Deprecation](/policy/lfi-deprecation)) — for example `v2.0` alongside `v3.1` — you MUST respond `valid` for every version you serve. <br><br> Minor versions are backward compatible (see [Version Management](/policy/version-management)), so prior minors within each major you run are also valid (e.g. running `v2.0` and `v3.1` means `v2.0`, `v3.0`, and `v3.1` all resolve to `valid`). |
| 2 | `consent.PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [PII schema](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/). If decryption fails or the payload contains additional or undocumented parameters, respond with `invalid`. |
| 3 | `Initiation.DebtorAccount` | If provided, validate that the account is a UAE IBAN held at this LFI, reachable through this API Hub integration, and in a state that permits payment initiation (not blocked, dormant, or closed). If any check fails, respond with `invalid`. |
| 4 | `Initiation.Creditor` | `Initiation.Creditor` must contain exactly one creditor entry. Validate that the creditor is a valid UAE domestic creditor — the account is reachable on a supported UAE domestic rail (AANI or UAEFTS) and, where the state of the receiving account can be determined, able to receive payments. Mandatory fields, IBAN, and BIC derivation rules apply — see [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor). If any check fails, respond with `invalid`. |
| 5 | Payment type not supported | Fixed Defined Schedule must be advertised as supported via `ApiMetadata.FixedDefinedSchedule.Supported` on your authorisation server entry in the Trust Framework. If the LFI has not advertised support for this payment type, respond with `invalid`. |
| 6 | Invalid `BaseConsentId` | If the consent includes a `BaseConsentId`, validate that: <ul><li>The `BaseConsentId` references an existing consent known to the LFI and belonging to the same end user.</li><li>The referenced consent is a Service Initiation consent (`authorization_details[0].type` is `urn:openfinanceuae:service-initiation-consent:*`).</li><li>The referenced consent does not itself have a `BaseConsentId` — if it does, the TPP has incorrectly linked to an intermediate consent in the chain rather than the root consent. The `BaseConsentId` must always reference the original root consent.</li></ul> If any of these checks fail, respond with `invalid`. |
| 7 | `consent.CurrencyRequest` | Must not be present. Domestic payments are denominated in AED only; `CurrencyRequest` is for non-local currency and international transfers. If present, respond with `invalid`. |


## Authorization — Account Selection

The generic [Authorization requirements](/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements) apply to this journey. The rules below cover the additional account selection logic specific to Fixed Defined Schedule.

During the consent authorization journey, the customer selects the account to be debited for payments under this consent. The LFI is responsible for presenting only accounts eligible to initiate the payment and applying any constraints the TPP has specified in the consent.

| # | Field | Rule |
|---|-------|------|
| 1 | `Initiation.DebtorAccount` | If `Initiation.DebtorAccount` was provided on the consent, only that account may be used — do not present an account selection screen. If the authenticated PSU does not hold the specified account, PATCH the consent to `Rejected` and call `doFail` with `error`: `invalid_request` and `error_description`: `user_does_not_own_debtor_account`. |
| 2 | `consent.IsSingleAuthorization` | If `true`, only accounts the authenticated PSU can solely authorize (no subsequent approvers required) may be offered and selected. If `false` or not provided (default), accounts where the PSU is one of multiple required authorizers may also be offered; subsequent authorizers must then approve the consent before it reaches `Authorized` status and payments can be executed. See [Multi-Authorization](/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization). |
| 3 | No eligible accounts | If the authenticated PSU does not hold any account eligible to initiate a payment under this consent (including the `IsSingleAuthorization` constraint above), PATCH the consent to `Rejected` and call `doFail` with `error`: `invalid_request` and `error_description`: `user_lacks_eligible_accounts`. See [Authorization requirements](/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements) for details. |
| 4 | Single selection | The account selection screen must allow the customer to select exactly one account to be debited. A consent with no account selected must not be authorised. |


## POST [`/payments`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) — Payment Execution

When the TPP initiates a payment under an authorized consent, the API Hub validates the access token, consent status, amount/currency consistency with the consent, and OpenAPI schema before forwarding the request to your Ozone Connect [`POST /payments`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) endpoint. The rules below cover what your Ozone Connect endpoint must validate on receipt. Error responses MUST conform to the [POST `/payments` OpenAPI schema](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) — the `errorCode` values referenced below are drawn from the `Error400` enum.

| # | Rule | Detail |
|---|------|--------|
| 1 | `PersonalIdentifiableInformation` | The decrypted PII payload must conform exactly to the [Domestic Payment PII Schema Object (`POST /payments`)](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments). Note that `DebtorAccount` is not part of the payment-time PII (the debtor is fixed by the consent) and `Initiation.Creditor` is a single object rather than an array. Reject with HTTP `400` and:<ul><li>`errorCode`: `JWE.DecryptionError` — if decryption of the PII payload fails.</li><li>`errorCode`: `Body.InvalidFormat` — if any required property is missing, of the wrong type, or the payload contains additional or undocumented properties (`additionalProperties: false`).</li></ul> |
| 2 | `PersonalIdentifiableInformation` (Creditor) | `Initiation.Creditor[]` had exactly 1 entry at consent time. The submitted creditor on the payment request must exactly match that consent-time entry — see [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor). If it does not match, reject with HTTP `400` `errorCode`: `Consent.FailsControlParameters`. |
| 3 | Sufficient funds | The debtor account must have sufficient available funds to cover `Initiation.InstructedAmount` at the time the payment is received, taking into account any holds, pending transactions, and overdraft limits applied by the LFI. If the account has insufficient funds, reject with HTTP `400` `errorCode`: `GenericError` and `errorMessage`: `Payment rejected due to insufficient funds`. |
| 4 | Debtor account — temporarily unavailable | The debtor account selected at consent authorization must still be in a state that permits payment initiation at the time the payment is received. If the account is `Inactive`, `Dormant`, or `Suspended`, reject with HTTP `403` `errorCode`: `Consent.AccountTemporarilyBlocked` and `errorMessage`: `The account is temporarily blocked.` |
| 5 | Debtor account — permanently unavailable | If the debtor account has become `Closed`, `Deceased`, or `Unclaimed` since consent authorization, reject with HTTP `403` `errorCode`: `Consent.PermanentAccountAccessFailure` and `errorMessage`: `The account is permanently inaccessible.` |

If all validations above pass, the LFI MUST create the payment record in its systems and return HTTP `201` with the generated `PaymentId` per the [POST `/payments` OpenAPI schema](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments). Full response handling is covered in the [API Guide](./api-guide).


## Screening Checks

Once the payment record has been created, the LFI MUST apply its standard fraud, sanctions, and AML screening controls before the payment is submitted to the domestic rail. These checks are the LFI's responsibility and follow the LFI's own policies and regulatory obligations.

Screening may result in the payment being held, rejected, or referred for manual review after the `201` response has been returned to the TPP. The outcome MUST be reflected in the payment's `Status` and surfaced via [`GET /payments/{paymentId}`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) so the TPP can observe the final state.

| # | Rule | Detail |
|---|------|--------|
| 1 | Screening duration | Screening checks SHOULD complete within **3 seconds** of the payment record being created. This is a target, not a hard cutoff — where the LFI's controls require longer (for example, referral for manual review), the payment remains in `Pending` and the final outcome is reflected when available. A payment MUST NOT be rejected solely because screening exceeded 3 seconds. |
| 2 | Screening failure — notify API Hub | If a screening check fails, the LFI MUST immediately call [`PATCH /payment-log/{id}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id) on the API Hub Consent Manager with `paymentResponse.status`: `Rejected` and a `paymentResponse.RejectReasonCode` entry. The entry's `Code` MUST use the `LFI.` namespace (the check that failed is in the LFI's systems, not AANI or UAEFTS), matching the pattern `^LFI\.[A-Za-z0-9]+$`. The `Message` MUST be sanitised for onward relay to the TPP — it MUST NOT reveal detection logic, sanctions list matches, or internal case identifiers. <br><br> **Example:** <br> `Code`: `LFI.ScreeningRejected` <br> `Message`: `Payment rejected by LFI screening controls.` |


## Rail Submission

Once the payment has passed screening, the LFI MUST submit it to the domestic rails for processing. AANI is the primary rail for Fixed Defined Schedule payments; UAEFTS is the fallback.

| # | Rule | Detail |
|---|------|--------|
| 1 | Submit to AANI | Once screening has passed, the LFI MUST immediately submit the payment to AANI for processing. |
| 2 | Fallback to UAEFTS | If AANI is unavailable for any reason — including the AANI service being degraded or unreachable, or the receiving bank being unable to receive the payment via AANI — the LFI MUST fall back to UAEFTS and submit the payment there. The fallback decision MUST NOT require TPP or PSU intervention. |
| 3 | Propagate status changes to the API Hub | Whenever a rail status change at AANI or UAEFTS maps to a change in the payment's Open Finance status, the LFI MUST immediately call [`PATCH /payment-log/{id}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id) on the API Hub Consent Manager to update `paymentResponse.status` to the new Open Finance status. Rail statuses that are deliberately not mapped (see [Payment Status](/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status)) do not require a PATCH; the mapping document is the source of truth for which rail transitions are reportable. |
| 4 | `paymentTransactionId` propagation | Once AANI or UAEFTS assigns the end-to-end identifier for the payment (the IPP identifier for AANI, or the equivalent for UAEFTS), the LFI MUST include it as `paymentTransactionId` on the next [`PATCH /payment-log/{id}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id) — ideally on the same PATCH as the accompanying status transition. Once set, `paymentTransactionId` MUST NOT be changed. Note that `paymentTransactionId` identifies the payment instruction on the rail and is distinct from the Bank Data Sharing `transactionId` (which identifies a ledger entry). |
| 5 | Rail rejection — reject reason code | If the payment is rejected by AANI or UAEFTS, the LFI MUST populate `paymentResponse.RejectReasonCode` on the `PATCH /payment-log/{id}` call. The `Code` MUST use the namespace of the rail that rejected the payment (`AANI.` or `FTS.`, matching the spec pattern `^(AANI\|FTS)\.[A-Za-z0-9]+$`), with the specific reason code mapped directly from the rail's originating rejection code. The `Message` MUST be sanitised for onward relay to the TPP. <br><br> **Example:** <br> `Code`: `AANI.AM04` <br> `Message`: `Payment request cannot be executed as insufficient funds at debtor account.` |
| 6 | `PATCH /payment-log/{id}` delivery | The LFI MUST treat Consent Manager updates as durable — `status`, `paymentTransactionId`, and `RejectReasonCode` changes cannot be dropped. If a PATCH fails with a transient error (HTTP `5xx`, connection error, or timeout), the LFI MUST retry with exponential backoff until the update is accepted; updates that cannot be delivered immediately MUST be queued and retried rather than abandoned. A PATCH rejected with a `4xx` response indicates a client-side issue that retry will not fix — the LFI MUST NOT retry in this case and MUST raise the failure for operational investigation. |


## GET [`/payments/{paymentId}`](/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments) — Payment Status Retrieval

The TPP may use `GET /payments/{paymentId}` to retrieve the current status of a payment it has initiated. The API Hub validates the access token and consent, then forwards the request to your Ozone Connect endpoint.

| # | Rule | Detail |
|---|------|--------|
| 1 | Sustain period | The LFI MUST continue to serve `GET /payments/{paymentId}` for at least **1 year from the creation date of the payment**. Within this window, the endpoint MUST return the current `Status` of the payment, reflecting any subsequent state changes (e.g. screening outcomes, rail settlement, reversal). |
| 2 | Status consistency with the API Hub | The `Status` returned by `GET /payments/{paymentId}` MUST exactly match the status most recently PATCHed to the API Hub Consent Manager via [`PATCH /payment-log/{id}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id). The LFI is responsible for keeping the two representations in lockstep — any status change in the LFI's systems MUST be reflected on both surfaces before the change is observable to the TPP. |
| 3 | `paymentTransactionId` consistency | Once the rail has assigned an end-to-end identifier and the LFI has PATCHed it to the Consent Manager, `GET /payments/{paymentId}` MUST return the same `paymentTransactionId`. Before the rail has assigned one, `paymentTransactionId` MUST be omitted from the response rather than returned as an empty string. |

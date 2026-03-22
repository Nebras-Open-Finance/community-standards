---
next: false
prev: false
aside: false
---

# Confirmation of Payee — Requirements

The [User Journeys](./user-journeys) for this service also apply and must be adhered to.

The tables below list the validation rules that apply to Confirmation of Payee. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## Mandatory CoP Requirement

For all Open Finance account-to-account transfers where the creditor is unknown to the TPP — for example, entered by the customer at the time of payment — a Confirmation of Payee request **must** be made prior to consent creation, provided the receiving bank supports the CoP service.

A creditor is considered unknown when the TPP does not already hold a verified record of the payee (for example, a pre-enrolled beneficiary confirmed by a prior successful CoP check). Where CoP has been performed, the full raw JWS response from the `/confirmation` endpoint must be included in the `ConfirmationOfPayeeResponse` field of the creditor entry in the payment consent PII.

## POST `/discovery` — Payee Discovery

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | Request body | Must be a compact signed JWT (`Content-Type: application/jwt`). | API Hub |
| 2 | `message.Data.Identification` | Required. Must be a valid UAE IBAN. | API Hub |
| 3 | OpenAPI schema | The request body must conform exactly to the [POST `/discovery` OpenAPI schema](/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery). No additional or undocumented parameters are permitted. | API Hub |
| 4 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |

## POST `/confirmation` — Name Match

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | Request body | Must be a compact signed JWT (`Content-Type: application/jwt`). | API Hub |
| 2 | `message.Data.Identification` | Required. Must be a valid UAE IBAN. | API Hub |
| 3 | `ConfirmationOfPayeeResponse` in PII | Where CoP has been performed, the full raw JWS response string from `/confirmation` must be included in the `ConfirmationOfPayeeResponse` field of the creditor entry in the payment consent PII. | TPP |
| 4 | OpenAPI schema | The request body must conform exactly to the [POST `/confirmation` OpenAPI schema](/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation). No additional or undocumented parameters are permitted. | API Hub |
| 5 | `x-fapi-interaction-id` | Must be included. Must be a valid UUID (RFC 4122). | API Hub |

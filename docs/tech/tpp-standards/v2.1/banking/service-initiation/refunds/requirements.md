---
next: false
prev: false
aside: false
pageClass: requirements-page
---

# Payment Refunds — Requirements

The tables below list the validation rules that apply to the Payment Refunds API. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BSIP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## GET [`/payment-consents/{ConsentId}/refund`](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund) — Retrieve Refund Account

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token obtained via a `client_credentials` grant with the `payments` scope. | API Hub |
| 2 | `ConsentId` (path) | The consent record linked to the `ConsentId` must include the `ReadRefundAccount` permission. | API Hub |
| 3 | Account state | The debtor account must not be blocked from receiving payments. <br> If the account is blocked for a temporary reason (e.g. account status is `Suspended`, or the account is otherwise unable to receive a credit transaction refund on a transient basis), the response will be `403` with `errorCode`: `Consent.AccountTemporarilyBlocked` and `errorMessage`: `The debtor account is blocked from receiving payments.` <br> If the account is blocked permanently (e.g. account status is `Closed`, `Deceased`, or `Unclaimed`), the response will be `403` with `errorCode`: `Consent.PermanentAccountAccessFailure` and `errorMessage`: `The debtor account is blocked from receiving payments.` | LFI |
| 4 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |

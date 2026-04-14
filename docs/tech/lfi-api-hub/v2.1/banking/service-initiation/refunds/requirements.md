---
next: false
prev: false
aside: false
---

# Payment Refunds — Requirements

The tables below list the rules that apply to the Payment Refunds endpoint. The Hub validates authorization and consent permissions before calling your Ozone Connect server — your LFI is responsible for retrieving and returning the debtor's account details.

## GET `/payment-consents/{consentId}/refund`

| # | Condition | Rule |
|---|-----------|------|
| 1 | Refund account request received from Hub | Return `200` with a `data` object containing `refundAccount`. The `refundAccount` must include the debtor's `schemeName` (always `IBAN`), `identification` (the debtor's IBAN), and `name` (an object with `en` or `ar`). |
| 2 | Account is blocked from receiving payments — temporary | Return `403` with `errorCode`: `Consent.AccountTemporarilyBlocked` and `errorMessage`: `The debtor account is blocked from receiving payments.` Applies when the block is temporary — e.g. account status is `Suspended`, or the account is otherwise unable to receive a credit transaction refund on a transient basis. |
| 3 | Account is blocked from receiving payments — permanent | Return `403` with `errorCode`: `Consent.PermanentAccountAccessFailure` and `errorMessage`: `The debtor account is blocked from receiving payments.` Applies when the block is permanent — e.g. account status is `Closed`, `Deceased`, or `Unclaimed`. |

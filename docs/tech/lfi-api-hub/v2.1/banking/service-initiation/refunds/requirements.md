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
| 2 | Account is unable to receive a credit transaction refund | Return `403` with `errorCode`: `GenericError` and `errorMessage`: `The debtor account is not in a state where it can receive a refund credit transaction.` |
| 3 | Account is blocked from receiving payments | Return `403` with `errorCode`: `GenericError` and `errorMessage`: `The debtor account is blocked from receiving payments.` |

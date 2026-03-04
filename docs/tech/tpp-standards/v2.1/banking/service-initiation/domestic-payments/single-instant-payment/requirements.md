---
next: false
prev: false
aside: false
---

# Single Instant Payment - Requirements

The table below lists the validation rules that apply to a Single Instant Payment consent. The **Validated by** column indicates where each rule is enforced.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.SinglePayment.Type` | Must be `"SingleInstantPayment"`. `MultiPayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 3 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 4 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 5 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 6 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |

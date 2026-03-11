---
next: false
prev: false
aside: false
---

# Delegated SCA - Requirements

The table below lists the validation rules that apply to a Delegated SCA consent. The **Validated by** column indicates where each rule is enforced.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be present and set to `true`. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule` | Must be an empty object `{}`. | API Hub |
| 3 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 4 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 5 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 6 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 7 | `Initiation.Creditor` | Optional. If provided, must contain no more than 10 creditor entries. | LFI |

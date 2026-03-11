---
next: false
prev: false
aside: false
---

# Variable On Demand - Requirements

The table below lists the validation rules that apply to a Variable On Demand consent. The **Validated by** column indicates where each rule is enforced.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"VariableOnDemand"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Controls` | At least one of `MaximumIndividualAmount`, `MaximumCumulativeNumberOfPaymentsPerPeriod`, or `MaximumCumulativeValueOfPaymentsPerPeriod` must be provided. | API Hub |
| 3 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 4 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 5 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 6 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 7 | `Initiation.Creditor` | Optional. If provided, must contain no more than 10 creditor entries. | LFI |
| 8 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |

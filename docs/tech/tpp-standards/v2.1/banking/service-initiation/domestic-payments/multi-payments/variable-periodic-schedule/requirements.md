---
next: false
prev: false
aside: false
---

# Variable Periodic Schedule - Requirements

The table below lists the validation rules that apply to a Variable Periodic Schedule consent. The **Validated by** column indicates where each rule is enforced.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"VariablePeriodicSchedule"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.MaximumIndividualAmount` | Required. Defines the maximum amount allowed for a single payment within a period. | API Hub |
| 3 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodType` | Required. Defines the period boundary (e.g. `Week`, `Month`). | API Hub |
| 4 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate` | Required. The date from which each period is counted. | API Hub |
| 5 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeNumberOfPayments` | Required. Defines the total number of payments permitted across the lifetime of the consent. | API Hub |
| 6 | *(implicit)* | Only 1 payment is allowed per period. Always enforced. | API Hub |
| 7 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 8 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 9 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 10 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 11 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |
| 12 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |

---
next: false
prev: false
aside: false
---

# Fixed Defined Schedule - Requirements

The table below lists the validation rules that apply to a Fixed Defined Schedule consent. The **Validated by** column indicates where each rule is enforced.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type` | Must be `"FixedDefinedSchedule"`. `SinglePayment` and `FilePayment` must not be present. | API Hub |
| 2 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule` | Required. Must be a non-empty array of schedule entries. | API Hub |
| 3 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Required on each entry. Each date must be unique within the schedule — duplicate execution dates are not permitted. | API Hub |
| 4 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Must be today or in the future. Past dates are not permitted. | API Hub |
| 5 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].PaymentExecutionDate` | Must be strictly before `consent.ExpirationDateTime`. | API Hub |
| 6 | `consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Schedule[*].Amount` | Required on each entry. Defines the exact fixed amount to be collected on that execution date. | API Hub |
| 7 | *(implicit)* | Only 1 payment is allowed per `PaymentExecutionDate`. Always enforced. | API Hub |
| 8 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeNumberOfPayments` | If provided, defines the maximum total number of payments permitted across the lifetime of the consent. | API Hub |
| 9 | `consent.ControlParameters.ConsentSchedule.MultiPayment.MaximumCumulativeValueOfPayments` | If provided, defines the maximum total value of all payments permitted across the lifetime of the consent. | API Hub |
| 10 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 11 | `consent.PaymentPurposeCode` | If provided, must be a recognised AANI purpose code. | API Hub |
| 12 | `consent.Permissions` | If `ReadBalances` is included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |
| 13 | `consent.AuthorizationExpirationDateTime` | If provided, must not be in the past. Must not be after `consent.ExpirationDateTime`. | API Hub |
| 14 | `Initiation.Creditor` | Required. Must contain exactly one creditor entry. | LFI |
| 15 | `consent.ControlParameters.IsDelegatedAuthentication` | Must be `false` or not provided (Delegated SCA is not permitted for this payment type). | API Hub |

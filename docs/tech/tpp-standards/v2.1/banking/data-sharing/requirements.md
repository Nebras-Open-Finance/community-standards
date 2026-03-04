---
next: false
prev: false
aside: false
---

# Bank Data Sharing - Requirements

The table below lists the validation rules that apply to a Bank Data Sharing consent. The **Validated by** column indicates where each rule is enforced.

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `consent.ExpirationDateTime` | Must not be in the past. Must be less than one year in the future. | API Hub |
| 2 | `consent.Permissions` | If any of `ReadBalances`, `ReadBeneficiariesBasic`, `ReadBeneficiariesDetail`, `ReadTransactionsBasic`, `ReadTransactionsDetail`, `ReadProduct`, `ReadScheduledPaymentsBasic`, `ReadScheduledPaymentsDetail`, `ReadDirectDebits`, `ReadStandingOrdersBasic`, `ReadStandingOrdersDetail`, `ReadStatements`, or `ReadProductFinanceRates` are included, at least one of `ReadAccountsBasic` or `ReadAccountsDetail` must also be present. | API Hub |

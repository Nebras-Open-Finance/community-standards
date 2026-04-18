---
next: false
prev: false
aside: false
---

# Payments (Service Initiation)

The Payment Service Initiation capabilities allow customers to authorise payments at their LFI which a TPP then submits within the bounds of that authorisation. Payment types range from one-time instant payments through to long-running multi-payment consents with variable amounts, schedules, or delegated authentication.

::: info Required role: BSIP
Access to the Payment Service Initiation APIs requires TPPs to hold the **BSIP** (Bank Service Initiation Provider) role. The API Hub validates the role on every request before proxying it to the LFI.

If the consent also includes data-sharing permissions (`ReadAccountsBasic`, `ReadAccountsDetail`, `ReadBalances`), TPPs additionally require the **BDSP** role.
:::

<LiveTPPs :families="['payment']" />

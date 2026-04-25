---
next: false
prev: false
aside: false
---

# Confirmation of Payee

Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is initiated. The check happens outside the consent and authorisation flow — it requires no user interaction, runs against the LFI that holds the destination account, and returns a name-match result in real time.

::: info Required role: BSIP
Access to the Confirmation of Payee API requires TPPs to hold the **BSIP** (Bank Service Initiation Provider) role. The API Hub validates the role on every request before proxying it to the LFI.
:::

::: tip See who's live
[**Which TPPs are using Confirmation of Payee** →](/program/whats-live?type=tpp&family=confirmation)
:::

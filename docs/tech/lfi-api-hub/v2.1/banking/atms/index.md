---
next: false
prev: false
aside: false
---

# ATMs

The ATM API allows LFIs to publish ATM location and service data to TPPs. It is a read-only, public-data API — no consent or user redirect is required.

::: info Required role: BDSP
Access to the ATM API requires TPPs to hold the **BDSP** (Bank Data Sharing Provider) role. The API Hub validates the role on every request before proxying it to the LFI.
:::

<LiveTPPs :families="['atm']" />

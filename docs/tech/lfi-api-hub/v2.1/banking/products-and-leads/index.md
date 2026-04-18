---
next: false
prev: false
aside: false
---

# Products & Leads

The Products & Leads API allows LFIs to publish their banking product catalogue and to receive customer leads forwarded by TPPs. Customers browse products in the TPP application and either apply directly via a channel the LFI configures (redirect URI, phone, email, or written instructions), or request follow-up contact — in which case the API Hub forwards the lead and the LFI follows up within 30 days.

::: info Required role: BDSP
Access to the Products & Leads API requires TPPs to hold the **BDSP** (Bank Data Sharing Provider) role. The API Hub validates the role on every request before proxying it to the LFI.
:::

<LiveTPPs :families="['product']" />

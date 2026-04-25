---
next: false
prev: false
aside: false
---

# Products & Leads

The Products & Leads API lets a TPP retrieve publicly available banking products from participating LFIs and present them to a user. No user consent or redirect is required.

::: info Required role: BDSP
Access to the Products & Leads API requires the **BDSP** (Bank Data Sharing Provider) role. This role must be assigned to your application in the Trust Framework before calling either endpoint. See [Roles](/tech/tpp-standards/trust-framework/roles) for the full list of scopes and grant types this role permits.
:::

::: tip See who's live
[**Which LFIs are live for Products & Leads** →](/program/whats-live?family=product)
:::

## How it works

The TPP fetches products from each LFI  in parallel. The results are aggregated and presented to the user together.

Once a user selects a product, they have can:

**Apply Now** — the TPP directs the user to apply using whichever channel the LFI has configured: a redirect URI, a phone number, an email address, or a written description of the application process.

**Request contact from bank** — the TPP submits a `POST /leads` with the user's contact details. The API Hub forwards the lead to the LFI and does not retain the data. The LFI is expected to follow up within 30 days.



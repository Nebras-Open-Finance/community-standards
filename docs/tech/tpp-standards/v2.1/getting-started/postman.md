---
next: false
prev: false
aside: false
---

<script setup>
const postmanPaths = [
  { name: 'banking.postman_collection.json',   desc: 'Banking collection — consent, account &amp; transaction data, payment initiation, Confirmation of Payee, products &amp; leads, ATMs, and webhooks.' },
  { name: 'insurance.postman_collection.json', desc: 'Insurance collection — consent, policy data sharing, quotation, revocation, and webhooks.' },
]
const postmanBranches = [
  { tag: 'main',           desc: 'Live source of truth — published, authoritative, externally consumable. New implementers should work from the latest version on <code>main</code>.' },
  { tag: 'other branches', draft: true, desc: 'Drafts of future content (for example a forthcoming <code>v2.2</code>). The Nebras Open Finance team will announce when draft content is ready for ecosystem review.' },
]
</script>

<GitHubRepoCard
  eyebrow="Sandbox testing · Postman"
  title="Postman Collection"
  subtitle="A Postman collection provided to the UAE Open Finance ecosystem to help <strong>LFIs</strong> and <strong>TPPs</strong> test their API implementations against the Open Finance Trust Framework. The collection covers the full sandbox flow — TPP registration, consent, authorization, and payments — and can be downloaded pre-configured for your application from the <a href='/tech/tpp-standards/v2.1/getting-started/'>Getting Started</a> page."
  repo="Nebras-Open-Finance/postman"
  description="The two <code>.postman_collection.json</code> files at the root of the repository are the published surface — import either one into Postman to start using it."
  :paths="postmanPaths"
  :branches="postmanBranches"
/>

## Collections

### Banking <Badge type="tip" text="V1.2 · V2.0 · V2.1 (current)" />

| Folder | Role | Description |
|--------|------|-------------|
| [Data Sharing](/tech/tpp-standards/v2.1/banking/data-sharing/) | BDSP | Consent lifecycle plus account, balance, transaction, beneficiary, standing order, and party data. Available in `application/json` and `application/jwt` formats. |
| [Service Initiation — Domestic](/tech/tpp-standards/v2.1/banking/service-initiation/) | BSIP | All [payment consent types](/tech/tpp-standards/v2.1/banking/service-initiation/#multi-payment-consents): single instant (including CoP and multi-auth variants), all six multi-payment schedule types, delegated SCA, and refunds. |
| [Service Initiation — International](/tech/tpp-standards/v2.1/banking/service-initiation/) | BSIP | Single instant and fixed periodic schedule for cross-border transfers. |
| [Confirmation of Payee](/tech/tpp-standards/v2.1/banking/confirmation-of-payee/) | BSIP | Two-step name verification: discovery (API Hub) then confirmation (resolved LFI). Client credentials flow, `application/jwt` throughout. |
| [Products, Leads](/tech/tpp-standards/v2.1/banking/products-leads/) | BDSP | Open data endpoints — no user consent required. |
| [ATMs](/tech/tpp-standards/v2.1/banking/atms/) | BDSP | ATM location and service data published by LFIs. No user consent required. |
| [Webhooks](/tech/tpp-standards/v2.1/webhooks/) | — | Simulate JWE-encrypted event receipt and `202 Accepted` response. |

### Insurance <Badge type="tip" text="V2.1 (current)" />

| Folder | Description |
|--------|-------------|
| Data Sharing | Consent and access to insurance policy information. |
| Quotation | Insurance quote retrieval following consent. |
| Revoke | Consent revocation by ID or group ID. |
| Webhooks / Do Fail | Webhook receipt testing and failure simulation. |

---
next: false
prev: false
aside: false
---

# LFI — API Hub <Badge type="tip" text="v2.1" />

The UAE Open Finance **API Hub** (powered by Ozone Connect) is the central intermediary platform operated by AlTareq on behalf of the Central Bank of the UAE. It sits between Licensed Financial Institutions (LFIs) and Third-Party Providers (TPPs), handling security enforcement, consent lifecycle management, API routing, and participant discovery.

As an LFI, you connect to the Hub once and it manages the complexity of multi-TPP interoperability, FAPI 2.0 security, and regulatory compliance on your behalf.

## What the Hub does for LFIs

- **Routes** inbound TPP API requests to your resource server after verifying tokens and consent
- **Manages consent** — stores, serves, and enforces the lifecycle of all data-sharing and payment consents
- **Enforces security** — validates mTLS certificates, FAPI 2.0 PAR flows, and JWS message signatures
- **Hosts discovery** — publishes your `/.well-known/openid-configuration` so TPPs can find your endpoints
- **Provides an Admin Portal** — manage TPP activations, monitor traffic, and view audit logs

## For Third-Party Providers (TPPs)

If you are a **TPP looking to consume Open Finance capabilities**, please refer to:

**[TPP Open Finance Standards](/tech/tpp-standards/)**

## Getting started

| Section | Description |
|---|---|
| [Trust Framework (Directory)](./v2.1/trust-framework/) | Register your organisation, upload certificates, and create your API Hub application |
| [Onboarding to the API Hub](./v2.1/onboarding/) | Connect your resource and authorization servers to the Hub |
| [Admin Portal](./admin-portal/) | Activate TPPs and manage your integration settings |
| [Banking — Data Sharing](./v2.1/banking/data-sharing/api-guide) | Implement the consent authorization flow and serve account data |

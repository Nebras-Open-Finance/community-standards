---
next: false
prev: false
---

# Prerequisites

Before connecting to the API Hub, your organisation must have completed the following:

## Trust Framework registration

- [ ] Organisation registered in the Trust Framework directory
- [ ] At least one admin user added to your organisation account
- [ ] Organisation-level transport and signing certificates uploaded
- [ ] API Hub application created and approved (see [Creating an Application](../trust-framework/onboarding/application))
- [ ] Application-level transport and signing certificates configured (see [Keys and Certificates](../trust-framework/onboarding/keys-certificates))

## Technical readiness

- [ ] **Resource server deployed** — your bank's API endpoints must be running and reachable from the Hub's network egress IPs
- [ ] **Authorization server ready** — your bank's FAPI 2.0-compliant authorization server must be deployed (or you are using the Hub's hosted authorization server option)
- [ ] **mTLS client certificate** — the transport certificate registered in the Trust Framework must be installed and configured in your API server
- [ ] **Consent screen (CMI)** — your Consent Management Interface must be built and deployed (see [Banking — Data Sharing API Guide](../banking/data-sharing/api-guide))

## Regulatory requirements

- [ ] CBUAE licence or in-principle approval received
- [ ] API Hub participation agreement signed with AlTareq
- [ ] Pre-production testing completed before requesting production access

::: info
Contact your AlTareq integration manager if you are unsure about any of the above requirements.
:::

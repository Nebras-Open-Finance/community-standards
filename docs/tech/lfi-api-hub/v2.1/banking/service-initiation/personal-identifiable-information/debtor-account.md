---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Debtor Account

::: info Consent validation only
`Initiation.DebtorAccount` is only present in the PII the LFI receives at `POST /consent/action/validate` (consent validation). It is **not part of the PII delivered with a payment instruction via Ozone Connect** — by the time a payment is created, the debtor account has been fixed by the consent authorisation journey.
:::

When a TPP supplies `Initiation.DebtorAccount` in the consent PII, the LFI MUST validate it during consent validation — `POST /consent/action/validate`. At this stage the PSU has **not yet authenticated**, so the LFI cannot check ownership. The checks are limited to whether the account exists at this LFI, is reachable through this API Hub, and is eligible for payment initiation.

::: tip PSU-specific checks happen later
Checks that depend on the authenticated PSU — e.g. whether the `DebtorAccount` supplied by the TPP actually belongs to the user who logs in at the LFI — are covered separately under the authorisation journey. This page covers only what the LFI MUST validate before the consent is stored.
:::

## Validation requirements

Perform these checks after [decrypting the PII](./api-guide/decrypt-pii) in the `POST /consent/action/validate` handler:

| Check | Rule |
|-------|------|
| Schema | `DebtorAccount` conforms to `AEDomesticPaymentPII` — see [PII Schema — Consent](./api-schema/pii-par) |
| Scheme | `SchemeName` MUST be `IBAN` |
| Account exists | `Identification` (IBAN) corresponds to an account held at this LFI and reachable through this API Hub |
| Payments enabled | The account is in a state that permits payment initiation (e.g. not blocked, dormant, or closed) |

## Rejecting an invalid DebtorAccount

If any check fails, the LFI MUST mark the consent invalid in its `POST /consent/action/validate` response. The API Hub will then reject the consent back to the TPP.

```json
{
  "data": {
    "status": "invalid",
    "code": "InvalidDebtorAccount",
    "description": "The supplied DebtorAccount is not recognised at this LFI or cannot be used for payment initiation."
  },
  "meta": {}
}
```

See [Consent Events & Actions — API Guide](/tech/lfi-api-hub/v2.1/consent-events/api-guide) for the full `POST /consent/action/validate` flow and response schema.

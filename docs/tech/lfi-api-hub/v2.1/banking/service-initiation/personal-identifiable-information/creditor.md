---
next: false
prev: false
aside: false
---

# Creditor

At consent validation — `POST /consent/action/validate` — the LFI MUST validate `Initiation.Creditor` in the decrypted PII against three concerns:

1. **Cardinality** — the shape of `Initiation.Creditor` matches a beneficiary model permitted by the requested payment type.
2. **Mandatory fields** — every entry carries the fields required for a UAE domestic payment.
3. **Domestic creditor validity** — each entry names an account reachable on a supported UAE domestic rail.

If any check fails, the LFI MUST mark the consent invalid in its validate response — see [Rejecting an invalid consent](#rejecting-an-invalid-consent) below.

## Cardinality — beneficiary model

The shape of `Initiation.Creditor` determines the beneficiary model. Three models are defined:

| Beneficiary model | `Initiation.Creditor` |
|-------------------|------------------------|
| Single | Array of exactly **1 entry** |
| Multiple | Array of **2–10 entries** |
| Open | Array **omitted** — no creditor fixed at consent time |

Each payment type accepts only certain beneficiary models. The LFI MUST reject a consent where the cardinality doesn't align with a model permitted for the requested payment type. The allowed models are documented on each payment type's Requirements page (e.g. [Variable On-Demand — Requirements](./../domestic-payments/multi-payments/variable-on-demand/requirements)).

## Mandatory fields

For every entry in `Initiation.Creditor[]`, the following fields MUST be present for a UAE domestic payment:

| Field | Rule |
|-------|------|
| `CreditorAccount.SchemeName` | MUST be `"IBAN"` — `"AccountNumber"` is not valid for domestic payments |
| `CreditorAccount.Identification` | MUST be a valid UAE IBAN |
| `CreditorAccount.Name.en` OR `CreditorAccount.Name.ar` | At least one MUST be present |

If any required field is missing, `SchemeName` is set to `"AccountNumber"`, or the IBAN is invalid, the LFI MUST invalidate the consent.

Schema conformance — including `additionalProperties: false` at every level — is enforced through the OpenAPI spec. See [How to Decrypt PII](./api-guide/decrypt-pii) for how to plug the PII schema into a validator.

## CreditorAgent

| Scenario | LFI behaviour |
|----------|---------------|
| `CreditorAgent.Identification` not provided | LFI MUST derive the BIC from the IBAN |
| `CreditorAgent.Identification` provided | MUST be in 8- or 11-character BIC format, and MUST match the BIC derivable from the IBAN |

## Domestic creditor validity

For each entry, the LFI MUST validate that the creditor account is reachable on a supported UAE domestic rail — **AANI** or **UAEFTS**. Where the LFI can determine the state of the receiving account, it MUST also check that the account is able to receive payments.

## Rejecting an invalid consent

If any check above fails, the LFI MUST mark the consent invalid in its `POST /consent/action/validate` response. The API Hub will then reject the consent back to the TPP.

```json
{
  "data": {
    "status": "invalid",
    "code": "InvalidCreditor",
    "description": "Creditor validation failed: <reason>."
  },
  "meta": {}
}
```

See [Consent Events & Actions — API Guide](/tech/lfi-api-hub/v2.1/consent-events/api-guide) for the full `POST /consent/action/validate` flow and response schema.

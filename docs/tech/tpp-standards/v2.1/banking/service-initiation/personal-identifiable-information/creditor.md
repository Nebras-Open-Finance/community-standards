---
next: false
prev: false
aside: false
---

# Creditor

The `Initiation.Creditor` array in the PII object defines who will receive the payment. There are three creditor models, each with different rules about how many creditors can be specified and which payment types support them.

## Single Beneficiary

The `Creditor` array contains exactly **one entry**. The consent is bound to that specific creditor — any payment made under this consent must go to the same account.

```json
{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ivan England" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ivan David England" }
        },
        "ConfirmationOfPayeeResponse": "eyJhbGci..."
      }
    ]
  }
}
```

**Supported payment types:**

| Payment Type |
|-------------|
| Single Instant Payment — domestic |
| Single Instant Payment — international |
| Fixed Defined Schedule multi-payment |
| Variable Defined Schedule multi-payment |
| Fixed Periodic Schedule multi-payment |
| Variable Periodic Schedule multi-payment |
| Fixed On-Demand multi-payment |
| Variable On-Demand multi-payment |
| Delegated SCA (`IsDelegatedAuthentication: true`) |

## Multiple Beneficiaries

The `Creditor` array contains between **2 and 10 entries**. The consent allows payments to any one of the listed creditors — each individual payment must go to exactly one creditor from this list.

```json
{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ivan England" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ivan David England" }
        }
      },
      {
        "Creditor": { "Name": "Sara Al Zaabi" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE140260123456789012345",
          "Name": { "en": "Sara Al Zaabi" }
        }
      }
    ]
  }
}
```

**Supported payment types:**

| Payment Type |
|-------------|
| Variable On-Demand multi-payment |
| Delegated SCA (`IsDelegatedAuthentication: true`) |

## Open Beneficiaries

The `Creditor` array is **not provided**. The consent is open — the beneficiary is not fixed at consent time. Instead, the creditor details are supplied dynamically with each `POST /payments` call. This follows the [Payment Consents with Open Beneficiaries](/knowledge-base/articles/payment-account-permissions) model.

```json
{
  "Initiation": {
    "DebtorAccount": { ... }
    // Creditor is omitted — beneficiary is provided at payment time
  },
  "Risk": { ... }
}
```

**Supported payment types:**

| Payment Type |
|-------------|
| Variable On-Demand multi-payment |
| Delegated SCA (`IsDelegatedAuthentication: true`) |

## Creditor entry schema

Each entry in the `Creditor` array (for domestic payments) has the following structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `CreditorAccount.SchemeName` | enum | Yes | Always `IBAN` for domestic payments |
| `CreditorAccount.Identification` | string | Yes | The IBAN of the creditor account |
| `CreditorAccount.Name.en` | string | Yes | Account holder name in English |
| `CreditorAccount.Name.ar` | string | No | Account holder name in Arabic |
| `Creditor.Name` | string | No | Full legal name of the payment recipient |
| `ConfirmationOfPayeeResponse` | string (JWS) | No | The full JWS returned by the CoP `/confirmation` endpoint, if Confirmation of Payee was performed |

::: tip Confirmation of Payee
Where Confirmation of Payee has been performed for a creditor, include the full JWS response string in `ConfirmationOfPayeeResponse`. This gives the LFI confidence that the creditor account details have been verified. See [Confirmation of Payee API Guide](../../confirmation-of-payee/api-guide) for how to obtain the CoP response.
:::

## LFI validation requirements — domestic payments

Because the `Creditor` object allows a significant degree of flexibility and PII is validated independently by each LFI (not centrally by Nebras), the following requirements apply specifically to domestic payments within the UAE. **TPPs must construct the PII to satisfy all of these rules**, as a consent that fails LFI validation will be rejected.

### 1. Schema conformance

After decrypting the JWE, the LFI validates that the decrypted data conforms exactly to the **Domestic Payment PII Schema Object** as defined in the OpenAPI specification. No additional properties are permitted.

### 2. Mandatory fields

Each entry in the `Creditor` array must contain the following fields:

| Field | Requirement |
|-------|-------------|
| `CreditorAccount.Name.en` **or** `CreditorAccount.Name.ar` | At least one must be present |
| `CreditorAccount.SchemeName` | Must be `"IBAN"` — `"AccountNumber"` is not valid for domestic payments |
| `CreditorAccount.Identification` | Must be a valid UAE IBAN |

If any of these required fields are missing, if `SchemeName` is set to `"AccountNumber"`, or if an invalid IBAN is provided, the LFI will invalidate the consent.

### 3. CreditorAgent — BIC derivation and validation

The `CreditorAgent.BICFI` field identifies the creditor's bank. LFIs apply the following rules:

- **If `CreditorAgent.BICFI` is not provided** — the LFI must derive the BIC from the IBAN.
- **If `CreditorAgent.BICFI` is provided** — the LFI must accept both 8-character and 11-character BIC formats. The LFI must not reject a valid BIC solely because of its length. Where AANI requires an 8-character BIC and an 11-character BIC is received, the LFI must validate that the 8-character truncation is consistent with the IBAN before submitting. In all cases, the LFI must validate that the provided BIC matches the BIC derivable from the IBAN.

---
next: false
prev: false
aside: false
---

# Creditor

Creditor data is submitted as part of the PII payload at two points in the payment lifecycle. The structure is **different** at each stage.

| Stage | Endpoint | Structure |
|-------|----------|-----------|
| Consent staging | `POST /par` | `Initiation.Creditor` — an **array** of creditor entries |
| Payment creation | `POST /payments` | `Initiation.CreditorAccount`, `Initiation.CreditorAgent`, `Initiation.Creditor`, `Initiation.ConfirmationOfPayeeResponse` — **flat fields** on `Initiation` |



## Creditor at consent time — POST /par

At consent staging, creditor data lives in `Initiation.Creditor` — an array of creditor entry objects. Each entry has the structure:

```json
{
  "CreditorAgent": { "SchemeName": "BICFI", "Identification": "ADCBAEAA" },
  "Creditor": { "Name": "Ivan England" },
  "CreditorAccount": {
    "SchemeName": "IBAN",
    "Identification": "AE070331234567890123456",
    "Name": { "en": "Ivan David England" }
  },
  "ConfirmationOfPayeeResponse": "eyJhbGci..."
}
```

The number of entries in the array determines the beneficiary model, which constrains which payment types are available.

### Single Beneficiary (1 entry)

The `Creditor` array contains exactly **one entry**. The consent is bound to that creditor — every payment made under this consent must go to that account.

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

### Multiple Beneficiaries (2–10 entries)

The `Creditor` array contains between **2 and 10 entries**. The consent authorises payments to any one of the listed creditors — each individual payment specifies which one.

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

### Open Beneficiary (array omitted)

The `Creditor` array is **not provided**. No beneficiary is fixed at consent time — the creditor is supplied with each `POST /payments` call.

```json
{
  "Initiation": {
    "DebtorAccount": { ... }
    // Creditor array omitted — supplied at payment time
  },
  "Risk": { ... }
}
```

**Supported payment types:**

| Payment Type |
|-------------|
| Variable On-Demand multi-payment |
| Delegated SCA (`IsDelegatedAuthentication: true`) |



## Creditor at payment time — POST /payments

At payment creation, the `Initiation` object in the PII payload **is** a single `AEDomesticCreditor` — the creditor fields are flat properties of `Initiation`, not nested inside an array.

```json
{
  "Initiation": {
    "CreditorAgent": { "SchemeName": "BICFI", "Identification": "ADCBAEAA" },
    "Creditor": { "Name": "Ivan England" },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": { "en": "Ivan David England" }
    },
    "ConfirmationOfPayeeResponse": "eyJhbGci..."
  },
  "Risk": { ... }
}
```

::: warning Note on naming
`Initiation.Creditor` at `POST /payments` is the **party identity object** (`{ Name, PostalAddress }`) — not the array that appears at `POST /par`. The two uses of the word `Creditor` refer to different things.
:::

### Matching the authorised creditor

The creditor supplied at `POST /payments` must correspond to one of the creditors authorised on the consent. The rule depends on the beneficiary model:

| Consent model | Creditor at POST /par | Requirement at POST /payments |
|---------------|-----------------------|-------------------------------|
| Single beneficiary | 1 entry in `Initiation.Creditor[]` | Must exactly match that entry — same IBAN and account name |
| Multiple beneficiaries | 2–10 entries in `Initiation.Creditor[]` | Must exactly match one entry from the pre-approved list |
| Open beneficiary | `Initiation.Creditor[]` omitted | Any valid creditor — no consent-time match required |

::: warning Creditor must match the consent
For Single and Multiple Beneficiary consents, the LFI validates that the `CreditorAccount.Identification` (IBAN) at `POST /payments` matches a creditor entry from the authorised consent. A mismatch will result in the payment being rejected.
:::

::: info Open beneficiary: first appearance at POST /payments
For Open Beneficiary consents, this is where the creditor details appear for the first time. The LFI validates the supplied creditor against the same mandatory field and IBAN rules that apply at consent time — there is no consent-time entry to match against.
:::



## Creditor entry schema

The following schema applies to **each entry in `Initiation.Creditor[]`** at `POST /par`, and to the **flat fields on `Initiation`** at `POST /payments`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `CreditorAccount.SchemeName` | enum | Yes | Always `IBAN` for domestic payments |
| `CreditorAccount.Identification` | string | Yes | The IBAN of the creditor account |
| `CreditorAccount.Name.en` | string | Yes* | Account holder name in English |
| `CreditorAccount.Name.ar` | string | Yes* | Account holder name in Arabic |
| `CreditorAccount.TradingName` | object | No | Trading brand name, if applicable |
| `CreditorAccount.Type` | enum | No | Account type: `Individual`, `Merchant`, `Business`, `Charity`, `GovernmentBody`, `Other` |
| `Creditor.Name` | string | No | Full legal name of the payment recipient |
| `Creditor.PostalAddress` | object | No | Postal address of the payment recipient |
| `CreditorAgent.SchemeName` | enum | No | `BICFI` or `Other` |
| `CreditorAgent.Identification` | string | No | BIC/SWIFT code or payment scheme identifier |
| `ConfirmationOfPayeeResponse` | string (JWS) | No | The full JWS returned by the CoP `/confirmation` endpoint, if CoP was performed |

*At least one of `Name.en` or `Name.ar` must be present.

::: tip Confirmation of Payee
Where Confirmation of Payee has been performed for a creditor, include the full JWS response string in `ConfirmationOfPayeeResponse`. This gives the LFI confidence that the creditor account details have been verified. See [Confirmation of Payee API Guide](../../confirmation-of-payee/api-guide) for how to obtain the CoP response.
:::



## Validation requirements — domestic payments

These requirements apply at **both `POST /par` and `POST /payments`**:
- At `POST /par`: each entry in the `Initiation.Creditor[]` array is validated independently.
- At `POST /payments`: the flat creditor fields on `Initiation` are validated.

Because PII is encrypted using the LFI's public key, **Nebras cannot validate it**. All validation is performed by the LFI after decryption. A consent or payment that fails LFI validation will be rejected.

### 1. Schema conformance

The decrypted PII must conform exactly to the schema defined in the OpenAPI specification (`AEDomesticPaymentPII` for `POST /par`, `AEDomesticPaymentPIIProperties` for `POST /payments`). No additional properties are permitted.

### 2. Mandatory fields

| Field | Requirement |
|-------|-------------|
| `CreditorAccount.Name.en` **or** `CreditorAccount.Name.ar` | At least one must be present |
| `CreditorAccount.SchemeName` | Must be `"IBAN"` — `"AccountNumber"` is not valid for domestic payments |
| `CreditorAccount.Identification` | Must be a valid UAE IBAN |

### 3. CreditorAgent — BIC derivation and validation

The `CreditorAgent.Identification` field identifies the creditor's bank. LFIs apply the following rules:

- **If `CreditorAgent` is not provided** — the LFI must derive the BIC from the IBAN.
- **If `CreditorAgent.Identification` is provided** — the LFI must accept both 8-character and 11-character BIC formats. The LFI must not reject a valid BIC solely because of its length. Where AANI requires an 8-character BIC and an 11-character BIC is received, the LFI must validate that the 8-character truncation is consistent with the IBAN before submitting. In all cases, the LFI must validate that the provided BIC matches the BIC derivable from the IBAN.

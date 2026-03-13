### Encrypt PII for Payment Initiation

Each `POST /payments` request carries its own `PersonalIdentifiableInformation` — a fresh JWE encrypted for that specific payment. This follows the same JWS-inside-JWE pattern used in Step 1, but uses the **Domestic Payment PII Schema Object** (`AEBankServiceInitiation.AEDomesticPaymentPIIProperties`) rather than the consent PII schema. The creditor fields are flat on `Initiation` at this stage — they are not wrapped in an array.

The schema defines `PersonalIdentifiableInformation` for `POST /payments` as a `oneOf` with two variants:

| Variant | Form | Notes |
|---------|------|-------|
| **Domestic Payment PII Schema Object** (`AEDomesticPaymentPIIProperties`) | object | Unencrypted form — shows the payment PII structure. For reference only. |
| **Encrypted PII Object** (`AEJWEPaymentPII`) | string | Compact JWE string. **MUST** be used when invoking `POST /payments`. |

::: warning Domestic Payment PII Schema Object must be strictly followed
The object you encrypt **MUST** conform exactly to `AEDomesticPaymentPIIProperties`. Field names, nesting, and data types are validated by the LFI after decryption — any deviation will result in payment rejection. Do not add undocumented fields or omit required ones.

See [Personal Identifiable Information](../../../personal-identifiable-information/) for the complete field reference, required vs optional fields, and creditor models for each domestic payment type.
:::

::: danger Creditor must match the consent beneficiary model
The creditor supplied here must correspond to the beneficiary model set at consent time:
- **Single beneficiary** (`Initiation.Creditor[]` had 1 entry): `CreditorAccount.SchemeName`, `CreditorAccount.Identification`, and `CreditorAccount.Name` must exactly match that entry. The LFI decrypts both PII tokens and compares them; any discrepancy results in rejection.
- **Multiple beneficiaries** (2–10 entries): must exactly match one entry from the pre-approved list in the consent PII.
- **Open beneficiary** (`Initiation.Creditor[]` omitted at consent): no consent-time match required — supply any valid creditor.

See [Creditor](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor) for the full matching rules and [field validation requirements](/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement).
:::

::: info Risk block is flexible per payment
Unlike the Creditor, the `Risk` block does not need to match the consent PII exactly. It should reflect the actual risk context of the individual payment — for example, a different `Channel` or updated `TransactionIndicators` for each payment under the consent.
:::

Build the PII object according to the schema, then encrypt it using the same `encryptPII` helper from Step 1:

::: code-group

```typescript [Node.js]
const paymentPii = {
  Initiation: {
    Creditor: [
      {
        Creditor: {
          Name: 'Ivan England',                  // must match consent PII (single/multiple beneficiary)
        },
        CreditorAccount: {
          SchemeName:     'IBAN',                // must match consent PII (single/multiple beneficiary)
          Identification: 'AE070331234567890123456',  // must match consent PII (single/multiple beneficiary)
          Name: {
            en: 'Ivan David England',            // must match consent PII (single/multiple beneficiary)
          },
        },
      },
    ],
  },
  // Risk can reflect the context of this specific payment
  Risk: {
    PaymentContextCode: 'BillPayment',
  },
}

const paymentEncryptedPII = await encryptPII(paymentPii, LFI_JWKS_URI, signingKey, SIGNING_KEY_ID)
// paymentEncryptedPII is a compact JWE string — embed it in the payment request below
```

```python [Python]
payment_pii = {
    "Initiation": {
        "Creditor": [
            {
                "Creditor": {
                    "Name": "Ivan England",              # must match consent PII (single/multiple beneficiary)
                },
                "CreditorAccount": {
                    "SchemeName":     "IBAN",            # must match consent PII (single/multiple beneficiary)
                    "Identification": "AE070331234567890123456",  # must match consent PII (single/multiple beneficiary)
                    "Name": {
                        "en": "Ivan David England",      # must match consent PII (single/multiple beneficiary)
                    },
                },
            }
        ],
    },
    # Risk can reflect the context of this specific payment
    "Risk": {
        "PaymentContextCode": "BillPayment",
    },
}

payment_encrypted_pii = encrypt_pii(payment_pii, LFI_JWKS_URI)
# payment_encrypted_pii is a compact JWE string — embed it in the payment request below
```

:::

See [Personal Identifiable Information](../../../personal-identifiable-information/) for the complete field reference, required vs optional fields, and creditor models for each domestic payment type.

See [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption) for details on fetching the LFI's JWKS and selecting the correct encryption key.

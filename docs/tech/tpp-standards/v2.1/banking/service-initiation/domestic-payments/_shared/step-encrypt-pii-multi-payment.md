### Encrypt PII for Payment Initiation

Before constructing each payment request, encrypt a fresh PII token for that payment. This follows the **Domestic Payment PII Schema Object** (`AEBankServiceInitiation.AEDomesticPaymentPIIProperties`) — the same JWS-inside-JWE pattern used in Step 1, but submitted on the payment itself rather than on the `/par` consent.

::: danger Creditor must exactly match the consent PII
The `Creditor` object — including `CreditorAccount.SchemeName`, `CreditorAccount.Identification`, `CreditorAccount.Name`, and any `Creditor.Name` or `CreditorAgent` fields — **must be identical** to the Creditor encrypted in Step 1. The LFI decrypts both PII tokens and compares them; any discrepancy results in rejection.
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
          Name: 'Ivan England',                  // must match Step 1 PII exactly
        },
        CreditorAccount: {
          SchemeName:     'IBAN',                // must match Step 1 PII exactly
          Identification: 'AE070331234567890123456',  // must match Step 1 PII exactly
          Name: {
            en: 'Ivan David England',            // must match Step 1 PII exactly
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
                    "Name": "Ivan England",              # must match Step 1 PII exactly
                },
                "CreditorAccount": {
                    "SchemeName":     "IBAN",            # must match Step 1 PII exactly
                    "Identification": "AE070331234567890123456",  # must match Step 1 PII exactly
                    "Name": {
                        "en": "Ivan David England",      # must match Step 1 PII exactly
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

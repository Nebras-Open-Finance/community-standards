<script setup lang="ts">
const node = `const paymentPii = {
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
`

const python = `payment_pii = {
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
`

const tabs = [
  { label: 'Node.js', lang: 'typescript', code: node },
  { label: 'Python',  lang: 'python',     code: python },
] as const

// Shared by the v2.1 and v2.2-draft payment API guides, so the reference links
// below follow the version of the page being viewed rather than naming one.
const { docsVersion } = useRouteVersion()
</script>

<template>
  <div class="ag-step">
    <EdProse>
      Each <code>POST /payments</code> request carries its own
      <code>PersonalIdentifiableInformation</code> &mdash; a fresh JWE encrypted for that specific
      payment. This follows the same JWS-inside-JWE pattern used in Step 1, but uses the
      <strong>Domestic Payment PII Schema Object</strong>
      (<code>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code>) rather than the consent PII
      schema. The creditor fields are flat on <code>Initiation</code> at this stage &mdash; they are not
      wrapped in an array.
    </EdProse>

    <EdProse>
      The schema defines <code>PersonalIdentifiableInformation</code> for <code>POST /payments</code>
      as a <code>oneOf</code> with two variants:
    </EdProse>

    <EdRefTable>
      <table>
        <thead>
          <tr><th>Variant</th><th>Form</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Domestic Payment PII Schema Object</strong> (<code>AEDomesticPaymentPIIProperties</code>)</td><td>object</td><td>Unencrypted form &mdash; shows the payment PII structure. For reference only.</td></tr>
          <tr><td><strong>Encrypted PII Object</strong> (<code>AEJWEPaymentPII</code>)</td><td>string</td><td>Compact JWE string. <strong>MUST</strong> be used when invoking <code>POST /payments</code>.</td></tr>
        </tbody>
      </table>
    </EdRefTable>

    <EdNote type="warning" title="Domestic Payment PII Schema Object must be strictly followed">
      <p>
        The object you encrypt <strong>MUST</strong> conform exactly to
        <code>AEDomesticPaymentPIIProperties</code>. Field names, nesting, and data types are validated
        by the LFI after decryption &mdash; any deviation will result in payment rejection. Do not add
        undocumented fields or omit required ones.
      </p>
      <p>
        See <a :href="`/tech/tpp-standards/${docsVersion}/banking/service-initiation/personal-identifiable-information/`">Personal
        Identifiable Information</a> for the complete field reference, required vs optional fields, and
        creditor models for each domestic payment type.
      </p>
    </EdNote>

    <EdNote type="danger" title="Creditor must match the consent PII">
      <p>
        The creditor supplied here must correspond to the single beneficiary set at consent time.
        <code>CreditorAccount.SchemeName</code>, <code>CreditorAccount.Identification</code>, and
        <code>CreditorAccount.Name</code> must exactly match the entry in the consent PII. The LFI
        decrypts both PII tokens and compares them; any discrepancy results in rejection.
      </p>
      <p>
        See <a :href="`/tech/tpp-standards/${docsVersion}/banking/service-initiation/personal-identifiable-information/creditor`">Creditor</a>
        for the full matching rules and
        <a :href="`/tech/tpp-standards/${docsVersion}/banking/service-initiation/personal-identifiable-information/creditor#validation-requirement`">field
        validation requirements</a>.
      </p>
    </EdNote>

    <EdNote type="info" title="Risk block is flexible per payment">
      <p>
        Unlike the Creditor, the <code>Risk</code> block does not need to match the consent PII
        exactly. It should reflect the actual risk context of the individual payment &mdash; for
        example, a different <code>Channel</code> or updated <code>TransactionIndicators</code> for
        each payment under the consent.
      </p>
    </EdNote>

    <EdProse>
      Build the PII object according to the schema, then encrypt it using the same
      <code>encryptPII</code> helper from Step 1:
    </EdProse>

    <EdCodeGroup :tabs="tabs" />

    <EdProse>
      See <a :href="`/tech/tpp-standards/${docsVersion}/banking/service-initiation/personal-identifiable-information/`">Personal
      Identifiable Information</a> for the complete field reference, required vs optional fields, and
      creditor models for each domestic payment type.
    </EdProse>

    <EdProse>
      See <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for
      details on fetching the LFI's JWKS and selecting the correct encryption key.
    </EdProse>
  </div>
</template>

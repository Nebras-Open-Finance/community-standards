<script setup lang="ts">
const encryptNode = `import { SignJWT, importJWK, CompactEncrypt } from 'jose'

/**
 * Sign PII as a JWT and encrypt it as a JWE using the LFI's public encryption key.
 * Fetch the LFI's JWKS URI from their .well-known/openid-configuration.
 */
async function encryptPII(pii: object, jwksUri: string, signingKey: CryptoKey, signingKeyId: string): Promise<string> {
  // 1. Sign the PII as a JWT
  const signedPII = await new SignJWT(pii as Record<string, unknown>)
    .setProtectedHeader({ alg: 'PS256', kid: signingKeyId })
    .sign(signingKey)

  // 2. Fetch the LFI's encryption key
  const { keys } = await fetch(jwksUri).then(r => r.json())
  const encKeyJwk = keys.find((k: { use: string }) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  // 3. Encrypt the signed JWT
  return new CompactEncrypt(new TextEncoder().encode(signedPII))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}

const pii = {
   "Initiation": {
     "DebtorAccount": {
       "SchemeName": "IBAN",
       "Identification": "AE070331234567890123456",
       "Name": {
         "en": "Mohammed Al Rashidi",
       }
     },
    "Creditor": [
      {
        "Creditor": {
          "Name": "Ivan England"
        },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": {
            "en": "Ivan David England"
          }
        }
      }
    ]
  }
}

const encryptedPII = await encryptPII(pii, LFI_JWKS_URI, signingKey, SIGNING_KEY_ID)
// encryptedPII is a compact JWE string — embed it in authorization_details below
`

const encryptPython = `import json
import requests
from jose import jwe

def encrypt_pii(pii: dict, jwks_uri: str) -> str:
    keys = requests.get(jwks_uri).json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    return jwe.encrypt(
        json.dumps(pii).encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()

pii = {
  "Initiation": {
     "DebtorAccount": {
       "SchemeName": "IBAN",
       "Identification": "AE070331234567890123456",
       "Name": {
         "en": "Mohammed Al Rashidi",
       }
     },
    "Creditor": [
      {
        "Creditor": {
          "Name": "Ivan England"
        },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": {
            "en": "Ivan David England"
          }
        }
      }
    ]
  },
}

encrypted_pii = encrypt_pii(pii, LFI_JWKS_URI)
# encrypted_pii is a compact JWE string — embed it in authorization_details below
`

const tabs = [
  { label: 'Node.js', lang: 'typescript', code: encryptNode },
  { label: 'Python',  lang: 'python',     code: encryptPython },
] as const

// Shared by the v2.1 and v2.2-rc1 payment API guides, so the reference links
// below follow the version of the page being viewed rather than naming one.
const { docsVersion } = useRouteVersion()
</script>

<template>
  <div class="ag-step">
    <EdProse>
      The <code>consent.PersonalIdentifiableInformation</code> property in the
      <code>authorization_details</code> carries sensitive payment data &mdash; creditor account details,
      debtor information, and risk indicators. Because consents are stored centrally at Nebras, this data
      is encrypted end-to-end so that no intermediate party can read it.
    </EdProse>

    <EdProse>The schema defines <code>PersonalIdentifiableInformation</code> as a <code>oneOf</code> with three variants:</EdProse>

    <EdRefTable>
      <table>
        <thead>
          <tr><th>Variant</th><th>Form</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Domestic Payment PII Schema Object</strong></td><td>object</td><td>Unencrypted form &mdash; shows the PII structure for domestic payments. For reference only.</td></tr>
          <tr><td><strong>International Payment PII Schema Object</strong></td><td>object</td><td>Unencrypted form &mdash; shows the PII structure for international payments. For reference only.</td></tr>
          <tr><td><strong>Encrypted PII Object</strong> (<code>AEJWEPaymentPII</code>)</td><td>string</td><td>Compact JWE string. <strong>MUST</strong> be used when invoking the PAR operation.</td></tr>
        </tbody>
      </table>
    </EdRefTable>

    <EdNote type="warning" title="Domestic Payment PII Schema Object must be strictly followed">
      <p>
        The object you encrypt <strong>MUST</strong> conform exactly to the <strong>Domestic Payment PII
        Schema Object</strong>. Field names, nesting, and data types are validated by the LFI after
        decryption &mdash; any deviation will result in payment rejection. Do not add undocumented
        fields or omit required ones.
      </p>
      <p>
        See <a :href="`/tech/tpp-standards/${docsVersion}/banking/service-initiation/personal-identifiable-information/`">Personal
        Identifiable Information</a> for the complete field reference, required vs optional fields, and
        creditor models for each domestic payment type.
      </p>
    </EdNote>

    <EdNote type="info" title="Creditor array — exactly one entry">
      <p>
        <code>Initiation.Creditor</code> is an <strong>array</strong> but must contain
        <strong>exactly one entry</strong> for this payment type. The consent is bound to that single
        recipient &mdash; every payment made under this consent must go to that account.
      </p>
      <p>
        See <a :href="`/tech/tpp-standards/${docsVersion}/banking/service-initiation/personal-identifiable-information/creditor`">Creditor</a>
        for the field schema and validation rules.
      </p>
    </EdNote>

    <EdProse>
      The PII object is serialized to JSON, signed as a JWS using your signing key, and then encrypted
      as a JWE using the LFI's public encryption key &mdash; producing the <code>AEJWEPaymentPII</code>
      compact string embedded as <code>PersonalIdentifiableInformation</code> in the consent.
    </EdProse>

    <h3 class="ag-step__subhead">Encrypting the PII</h3>
    <EdProse>
      Build the PII object according to the schema, then encrypt it as a JWE using the LFI's public
      encryption key:
    </EdProse>

    <EdCodeGroup :tabs="tabs" />

    <EdProse>
      See <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for
      details on fetching the LFI's JWKS and selecting the correct encryption key.
    </EdProse>
  </div>
</template>

<style scoped>
.ag-step__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
</style>

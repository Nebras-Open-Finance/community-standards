### Step 1 - Encrypting PII

The `consent.PersonalIdentifiableInformation` property in the `authorization_details` carries sensitive payment data — creditor account details, debtor information, and risk indicators. Because consents are stored centrally at Nebras, this data is encrypted end-to-end so that no intermediate party can read it.

The schema defines `PersonalIdentifiableInformation` as a `oneOf` with three variants:

| Variant | Form | Notes |
|---------|------|-------|
| **Domestic Payment PII Schema Object** | object | Unencrypted form — shows the PII structure for domestic payments. For reference only. |
| **International Payment PII Schema Object** | object | Unencrypted form — shows the PII structure for international payments. For reference only. |
| **Encrypted PII Object** (`AEJWEPaymentPII`) | string | Compact JWE string. **MUST** be used when invoking the PAR operation. |

::: warning Domestic Payment PII Schema Object must be strictly followed
The object you encrypt **MUST** conform exactly to the **Domestic Payment PII Schema Object**. Field names, nesting, and data types are validated by the LFI after decryption — any deviation will result in payment rejection. Do not add undocumented fields or omit required ones.

See [Personal Identifiable Information](../../../personal-identifiable-information/) for the complete field reference, required vs optional fields, and creditor models for each domestic payment type.
:::

The PII object is serialized to JSON, signed as a JWS using your signing key, and then encrypted as a JWE using the LFI's public encryption key — producing the `AEJWEPaymentPII` compact string embedded as `PersonalIdentifiableInformation` in the consent.

#### Encrypting the PII

Build the PII object according to the schema, then encrypt it as a JWE using the LFI's public encryption key:

::: code-group

```typescript [Node.js]
import { SignJWT, importJWK, CompactEncrypt } from 'jose'

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
```

```python [Python]
import json
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
```

:::

See [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption) for details on fetching the LFI's JWKS and selecting the correct encryption key.

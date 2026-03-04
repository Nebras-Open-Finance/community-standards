### Step 1 - Encrypting PII

The `consent.PersonalIdentifiableInformation` property in the `authorization_details` carries sensitive payment data — creditor account details, debtor information, and risk indicators. Because consents are stored centrally at Nebras, this data is encrypted end-to-end so that no intermediate party can read it.

The schema defines `PersonalIdentifiableInformation` as a `oneOf` with three variants:

| Variant | Form | Notes |
|---------|------|-------|
| **Domestic Payment PII Schema Object** | object | Unencrypted form — shows the PII structure for domestic payments. For reference only. |
| **International Payment PII Schema Object** | object | Unencrypted form — shows the PII structure for international payments. For reference only. |
| **Encrypted PII Object** (`AEJWEPaymentPII`) | string | Compact JWE string. **MUST** be used when invoking the PAR operation. |

Implementers **MUST** adhere to the decoded PII schema when building the object before encryption. Debtor and Creditor information **MUST** be set according to the rules for the payment type being instructed — see [Personal Identifiable Information](../../../personal-identifiable-information/) for the complete schema reference and creditor models.

The PII object is serialized to JSON, signed as a JWS using your signing key, and then encrypted as a JWE using the LFI's public encryption key — producing the `AEJWEPaymentPII` compact string embedded as `PersonalIdentifiableInformation` in the consent.

#### Encrypting the PII

Build the PII object according to the schema, then encrypt it as a JWE using the LFI's public encryption key:

::: code-group

```typescript [Node.js]
import { importJWK, CompactEncrypt } from 'jose'

/**
 * Encrypt PII as a JWE using the LFI's public encryption key.
 * Fetch the LFI's JWKS URI from their .well-known/openid-configuration.
 */
async function encryptPII(pii: object, jwksUri: string): Promise<string> {
  const { keys } = await fetch(jwksUri).then(r => r.json())
  const encKeyJwk = keys.find((k: { use: string }) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  return new CompactEncrypt(new TextEncoder().encode(JSON.stringify(pii)))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}

const pii = {
  Initiation: {
    Creditor: [
      {
        Creditor: { Name: 'Ivan England' },
        CreditorAccount: {
          SchemeName: 'IBAN',
          Identification: 'AE070331234567890123456',
          Name: { en: 'Ivan David England' },
        },
      },
    ],
  },
  Risk: {
    DebtorIndicators: { UserName: { en: 'Ahmad Al Mansouri' } },
    CreditorIndicators: {
      IsCreditorConfirmed: true,
      IsCreditorPrePopulated: true,
    },
  },
}

const encryptedPII = await encryptPII(pii, LFI_JWKS_URI)
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
        "Creditor": [
            {
                "Creditor": {"Name": "Ivan England"},
                "CreditorAccount": {
                    "SchemeName": "IBAN",
                    "Identification": "AE070331234567890123456",
                    "Name": {"en": "Ivan David England"},
                },
            }
        ]
    },
    "Risk": {
        "DebtorIndicators": {"UserName": {"en": "Ahmad Al Mansouri"}},
        "CreditorIndicators": {
            "IsCreditorConfirmed": True,
            "IsCreditorPrePopulated": True,
        },
    },
}

encrypted_pii = encrypt_pii(pii, LFI_JWKS_URI)
# encrypted_pii is a compact JWE string — embed it in authorization_details below
```

:::

See [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption) for details on fetching the LFI's JWKS and selecting the correct encryption key.

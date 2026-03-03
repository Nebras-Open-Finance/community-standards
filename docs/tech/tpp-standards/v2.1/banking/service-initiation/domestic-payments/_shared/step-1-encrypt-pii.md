### Step 1 - Encrypting PII

Before constructing the `authorization_details`, the **Personal Identifiable Information (PII)** — creditor name, IBAN, and risk indicators — must be encrypted as a JWE using the LFI's public encryption key. This prevents the Authorization Server from reading sensitive payment details in transit.

#### PII Structure

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `Initiation` | object | Creditor identification details. *Described below* | — |
| `Risk` | object | Risk and fraud indicators for the payment. *Described below* | — |

#### Initiation | `Initiation.Creditor[]`

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `Creditor.Name` | string | Full legal name of the payment recipient | `Ivan England` |
| `CreditorAccount.SchemeName` | enum | Account scheme — `IBAN` or `BBAN` | `IBAN` |
| `CreditorAccount.Identification` | string | Account identifier in the chosen scheme | `AE070331234567890123456` |
| `CreditorAccount.Name.en` | string | Account holder name (English) | `Ivan David England` |
| `CreditorAccount.Name.ar` | string | Account holder name (Arabic, optional) | — |

#### Risk | `Risk`

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `DebtorIndicators.UserName.en` | string | Display name of the paying user | `Ahmad Al Mansouri` |
| `CreditorIndicators.IsCreditorConfirmed` | boolean | Whether the creditor identity was confirmed by Confirmation of Payee | `true` |
| `CreditorIndicators.IsCreditorPrePopulated` | boolean | Whether the creditor details were pre-filled by the TPP rather than entered by the user | `true` |

#### Encrypting the PII

Serialize the PII object to JSON and encrypt it as a JWE using the LFI's public encryption key. Use the [`encryptRequestObject()`](/tech/tpp-standards/security/fapi/message-encryption#step-3-encrypt-the-payload) helper from the Message Encryption page — the only difference is that the payload is a JSON string rather than a signed JWT:

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

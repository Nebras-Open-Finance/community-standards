---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Personal Identifiable Information (PII)

Every payment instruction carries sensitive data about who is paying and who is receiving the funds. This data — the creditor account details, optional debtor account, and risk indicators — is collectively referred to as **Personal Identifiable Information (PII)**.

PII is encrypted and embedded at **two points** in the payment lifecycle:

| Stage | Endpoint | PII form |
|-------|----------|----------|
| Consent staging | `POST /par` | Embedded in `consent.PersonalIdentifiableInformation` |
| Payment creation | `POST /payments` | Embedded in `payment.PersonalIdentifiableInformation` |

The `Risk` structure is the same at both stages. `DebtorAccount` is **only present at `POST /par`** — by the time `POST /payments` is called, the debtor account has already been fixed through the consent authorisation flow. The creditor data also differs between stages — both in structure and cardinality. See [Creditor](./creditor) for the full breakdown.

## Why PII is encrypted

Payment consents are stored centrally at **Nebras**, the UAE Open Finance Hub. Because Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that Nebras, and any other party in transit, cannot read the sensitive payment details.

The encryption uses the destination LFI's public key (see [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption) for full cryptographic details). Only the LFI can decrypt the payload. Nebras passes the opaque JWE through without inspection — all PII validation is performed by the LFI after the consent is authorised.

## Steps to encrypt PII

The `PersonalIdentifiableInformation` field MUST be sent as a compact JWE — a signed-then-encrypted token (Nested JWT). The process is:

1. **Build the PII JSON** — construct the PII object for the stage you are at (`POST /par` or `POST /payments`). See [Structure of the PII object](#structure-of-the-pii-object) below.
2. **Sign** — sign the PII payload as a JWS using your TPP signing key. The JWS MUST include standard claims (`iat`, `exp`, `jti`, `iss`, `sub`, `aud`).
3. **Fetch the LFI's encryption key** — retrieve the LFI's JWKS and select the key where `"use": "enc"`.
4. **Encrypt** — encrypt the signed JWS into a compact JWE using `RSA-OAEP-256` / `A256GCM`.
5. **Embed** — place the resulting JWE string in the `PersonalIdentifiableInformation` field of your request.

### Example

::: code-group

```typescript [Node.js (jose)]
import { SignJWT, importJWK, CompactEncrypt } from 'jose'
import { v4 as uuidv4 } from 'uuid'

async function encryptPII(
  piiPayload: Record<string, unknown>,
  signingKey: KeyLike,
  signingKeyId: string,
  signingAlg: string,
  clientId: string,
  audience: string,
  jwksUri: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  // 1. Sign the PII payload
  const jws = await new SignJWT(piiPayload)
    .setProtectedHeader({ alg: signingAlg, kid: signingKeyId })
    .setIssuedAt(now)
    .setExpirationTime(now + 300)
    .setJti(uuidv4())
    .setIssuer(clientId)
    .setSubject(clientId)
    .setAudience(audience)
    .sign(signingKey)

  // 2. Fetch the LFI's JWKS and find the encryption key
  const response = await fetch(jwksUri)
  const { keys } = await response.json()
  const encKeyJwk = keys.find((k: any) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  // 3. Encrypt the signed JWS into a JWE
  const publicKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')
  const jwe = await new CompactEncrypt(new TextEncoder().encode(jws))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(publicKey)

  return jwe // → place this string in PersonalIdentifiableInformation
}
```

```python [Python (python-jose)]
from jose import jws, jwe
import requests
import json
import uuid
import time

def encrypt_pii(
    pii_payload: dict,
    signing_key: str,
    signing_key_id: str,
    signing_alg: str,
    client_id: str,
    audience: str,
    jwks_uri: str,
) -> str:
    now = int(time.time())

    # 1. Sign the PII payload
    claims = {
        **pii_payload,
        "iat": now,
        "exp": now + 300,
        "jti": str(uuid.uuid4()),
        "iss": client_id,
        "sub": client_id,
        "aud": audience,
    }
    signed_jwt = jws.sign(
        json.dumps(claims).encode(),
        signing_key,
        algorithm=signing_alg,
        headers={"kid": signing_key_id},
    )

    # 2. Fetch the LFI's JWKS and find the encryption key
    response = requests.get(jwks_uri)
    keys = response.json()["keys"]
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    # 3. Encrypt the signed JWS into a JWE
    return jwe.encrypt(
        signed_jwt.encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()  # → place this string in PersonalIdentifiableInformation
```

:::

For the full breakdown of JWKS discovery, key selection, and JWE structure, see [Message Encryption](/tech/tpp-standards/security/fapi/message-encryption).

::: tip Testing on the sandbox
The sandbox provides an **O3 Utility endpoint** that accepts your private key and JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See [O3 Sandbox Utilities](/tech/tpp-standards/security/fapi/o3-utils#example-1-o3-util-prepare-encrypted-pii).
:::

## Structure of the PII object

The `PersonalIdentifiableInformation` field is defined as a `oneOf`:

| Variant | Form | Purpose |
|---------|------|---------|
| **Domestic Payment PII Schema Object** | object | Unencrypted reference form for domestic payments |
| **International Payment PII Schema Object** | object | Unencrypted reference form for international payments |
| **Encrypted PII Object** (`AEJWEPaymentPII`) | string (compact JWE) | **The form that MUST be sent** at both `POST /par` and `POST /payments` |

The two object variants document the structure implementers MUST follow when constructing the PII payload before encryption. The encrypted form — `AEJWEPaymentPII` — is a compact JWE string wrapping a signed JWS containing the serialised PII JSON.

## The PII payload structure

The structure of the unencrypted PII differs between the two stages.

**At `POST /par` (consent staging):**

```json
{
  "Initiation": {
    "DebtorAccount": { ... },       // optional — see Debtor Account
    "Creditor": [                   // array of creditor entries — see Creditor
      {
        "CreditorAgent": { ... },
        "Creditor": { "Name": "..." },
        "CreditorAccount": { ... },
        "ConfirmationOfPayeeResponse": "..."
      }
      // ... up to 10 entries; omit array entirely for open beneficiary
    ]
  },
  "Risk": { ... }                   // required — see Risk
}
```

**At `POST /payments` (payment creation):**

```json
{
  "Initiation": {
    "CreditorAgent": { ... },               // flat on Initiation — not inside an array
    "Creditor": { "Name": "..." },
    "CreditorAccount": { ... },
    "ConfirmationOfPayeeResponse": "..."
  },
  "Risk": { ... }
}
```

The key difference: at `POST /par` the creditor data is inside an `Initiation.Creditor[]` array (allowing 1–10 entries, or omitted for open beneficiary). At `POST /payments` the same fields sit directly on `Initiation` as a single creditor.

| Property | POST /par | POST /payments |
|----------|-----------|----------------|
| `Initiation.DebtorAccount` | Optional object | **Not present** — debtor account is fixed by consent |
| `Initiation.Creditor` | **Array** of creditor entry objects (0–10) | **Object** — the party name/address (`{ Name, PostalAddress }`) |
| `Initiation.CreditorAccount` | Nested inside each `Creditor[]` entry | Direct field on `Initiation` |
| `Initiation.CreditorAgent` | Nested inside each `Creditor[]` entry | Direct field on `Initiation` |
| `Initiation.ConfirmationOfPayeeResponse` | Nested inside each `Creditor[]` entry | Direct field on `Initiation` |
| `Risk` | Required object | Required object |

See the sub-pages for full schema and rules:

- [Debtor Account](./debtor-account) — optional at `POST /par` only; not part of the `POST /payments` PII
- [Creditor](./creditor) — consent-time models (single/multiple/open), payment-time structure, and match requirements
- [Risk](./risk) — debtor and creditor risk indicators


## Decentralised validation

Because PII is encrypted using the LFI's public key, **Nebras cannot decrypt or validate it**. The LFI is solely responsible for decrypting and validating the PII — at consent time and at payment time.

Validation is therefore performed independently by each LFI rather than centrally. The standards place explicit validation requirements on every LFI — each LFI must validate the decrypted PII against the schema before accepting a consent or processing a payment.

::: warning TPPs must understand LFI validation
A consent that is accepted by one LFI may be rejected by another if the PII does not meet the required format. TPPs should ensure that the PII they construct is strictly valid according to the schema for the payment type being instructed.

See [Creditor](./creditor) for the specific validation rules that LFIs apply to the `Creditor` array for domestic payments.
:::

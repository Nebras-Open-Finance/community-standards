---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# How to Decrypt PII

The `PersonalIdentifiableInformation` field is a compact JWE (JSON Web Encryption) string. It was encrypted by the TPP using your LFI's public encryption key ([Enc1](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#enc1-encryption-key)). To decrypt it, you need the corresponding **Enc1 private key**.

## Step 1 — Read the `kid` from the JWE header

The JWE protected header contains the `kid` (Key ID) of the encryption key that was used. Decode the first segment of the JWE to identify which private key to use:

::: code-group

```typescript [Node.js]
function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const kid = getJweKid(piiJweString)
const privateKey = myKeyStore.getPrivateKey(kid)
```

```python [Python]
import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

kid = get_jwe_kid(pii_jwe_string)
private_key = my_key_store.get_private_key(kid)
```

:::

## Step 2 — Decrypt the JWE

Decrypt the JWE using your Enc1 private key. The result is the inner JWS (signed JWT):

::: code-group

```typescript [Node.js (jose)]
import { compactDecrypt, importPKCS8 } from 'jose'

const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(piiJweString, privateKey)
const jwsString = new TextDecoder().decode(plaintext)
```

```python [Python (jwcrypto)]
from jwcrypto import jwe as jwecrypto

token = jwecrypto.JWE()
token.deserialize(pii_jwe_string, key=private_key)
jws_string = token.payload.decode()
```

:::

## Step 3 — Decode the JWS payload

The inner JWS contains the PII JSON in its payload. Decode the payload to access the PII fields:

::: code-group

```typescript [Node.js (jose)]
import { decodeJwt } from 'jose'

const piiPayload = decodeJwt(jwsString)
// piiPayload now contains { Initiation: { ... }, Risk: { ... }, iat, exp, iss, ... }
```

```python [Python]
import json, base64

def decode_jws_payload(jws_string: str) -> dict:
    payload_b64 = jws_string.split(".")[1]
    return json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

pii_payload = decode_jws_payload(jws_string)
# pii_payload now contains { "Initiation": { ... }, "Risk": { ... }, "iat": ..., "exp": ..., "iss": ..., ... }
```

:::

::: tip Optional — Verify the TPP's JWS signature
The JWS is signed by the TPP. You may optionally verify this signature against the TPP's public signing key. However, this is **not required** — the entire request containing the PII field is itself sent as a JWS that the API Hub has already verified was signed by the TPP. The PII therefore cannot have been tampered with in transit.

If you choose to implement JWS verification for defence-in-depth, see [Verify TPP Signature (Optional)](./verify-tpp-signature).
:::

## Step 4 — Validate the PII against the OpenAPI schema

After decrypting, the LFI MUST validate the PII payload against the relevant OpenAPI schema. The PII has not been validated by the API Hub — schema validation is the LFI's responsibility.

| Stage | Spec file | Schema |
|-------|-----------|--------|
| Consent | `uae-api-hub-consent-manager-openapi.yaml` | `AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII` |
| Payment | `uae-ozone-connect-bank-service-initiation-openapi.yaml` | `AEBankServiceInitiation.AEDomesticPaymentPIIProperties` |

### Obtaining the OpenAPI specification

The OpenAPI YAML files are the source of truth for PII schemas. They are maintained in the canonical specification repository:

<a href="https://github.com/Nebras-Open-Finance/api-specs" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:8px 16px;background:linear-gradient(84.64deg,#00C8AF 0%,#015AD7 41.05%,#000000 82.6%);border-radius:66px;color:#fff;text-decoration:none;font-weight:600;font-size:0.875rem;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" style="fill:currentColor;flex-shrink:0"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>Nebras-Open-Finance/api-specs</a>

Spec files are located under `dist/` by category:

| Stage | Path |
|-------|------|
| Consent | `dist/api-hub/{version}/openapi/uae-api-hub-consent-manager-openapi.yaml` |
| Payment | `dist/ozone-connect/{version}/openapi/uae-ozone-connect-bank-service-initiation-openapi.yaml` |

::: tip Errata versions
Specifications may have errata releases (e.g. `v2.1.x-errata1`) that contain targeted corrections. When multiple version folders exist for the same major.minor version, use the **highest errata** that contains the file you need. If a file is not present in an errata folder, fall back to the base version. Always check for errata before bundling a spec into your service.
:::

### Validating against the schema

Extract the relevant `components/schemas` entry from the YAML file and validate the decrypted PII payload against it. The PII schemas in the OpenAPI specification already declare the constraints needed for validation:

- **`additionalProperties: false`** is set at every level of the PII schema — any unexpected fields will cause validation to fail.
- **`required` arrays** are declared on sub-schemas (e.g. `CreditorAccount` is required on each creditor entry, `SchemeName` and `Identification` are required on account objects) — missing mandatory fields will cause validation to fail.
- **`enum` constraints** restrict values to allowed options (e.g. `SchemeName` must be `IBAN`).
- **`$ref` pointers** link to nested schemas (creditor, debtor, risk). For validation to work correctly, all `components/schemas` entries from the spec MUST be registered with the validator so that `$ref` pointers resolve.

When you register the full set of component schemas and compile the PII schema, standard JSON Schema validators (`ajv` for Node.js, `jsonschema` for Python) will enforce all of these constraints automatically. No custom validation logic is needed for schema conformance — the OpenAPI spec is the single source of truth.

The following example shows how to validate a domestic payment PII at consent time:

::: code-group

```typescript [Node.js (ajv + yaml)]
import Ajv from 'ajv'
import { load } from 'js-yaml'
import { readFileSync } from 'fs'

// 1. Load the OpenAPI spec and extract the PII schema
const spec = load(
  readFileSync('uae-api-hub-consent-manager-openapi.yaml', 'utf-8')
) as Record<string, any>

const piiSchema =
  spec.components.schemas[
    'AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII'
  ]

// 2. Build a validator — register all component schemas so $ref resolves
const ajv = new Ajv({ allErrors: true, strict: false })

for (const [name, schema] of Object.entries(spec.components.schemas)) {
  ajv.addSchema(schema as object, `#/components/schemas/${name}`)
}

const validate = ajv.compile(piiSchema)

// 3. Validate the decrypted PII payload
function validatePIISchema(piiPayload: Record<string, unknown>): void {
  const valid = validate(piiPayload)
  if (!valid) {
    const errors = validate.errors?.map(e => `${e.instancePath} ${e.message}`)
    throw new Error(`PII schema validation failed:\n${errors?.join('\n')}`)
  }
}
```

```python [Python (jsonschema + pyyaml)]
import yaml
from jsonschema import validate, ValidationError, RefResolver

# 1. Load the OpenAPI spec and extract the PII schema
with open("uae-api-hub-consent-manager-openapi.yaml") as f:
    spec = yaml.safe_load(f)

pii_schema = spec["components"]["schemas"][
    "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII"
]

# 2. Build a resolver so $ref pointers resolve against the full spec
schema_store = {
    f"#/components/schemas/{name}": schema
    for name, schema in spec["components"]["schemas"].items()
}
resolver = RefResolver.from_schema(spec, store=schema_store)

# 3. Validate the decrypted PII payload
def validate_pii_schema(pii_payload: dict) -> None:
    try:
        validate(instance=pii_payload, schema=pii_schema, resolver=resolver)
    except ValidationError as e:
        raise ValueError(f"PII schema validation failed: {e.message}") from e
```

:::

::: danger Reject invalid PII
If the decrypted PII fails schema validation, the LFI MUST reject the consent or payment. Do not attempt to process a payment with malformed PII — return an appropriate error response. See [Personal Identifiable Information](../) for the full set of validation rules.
:::

## Full decryption and validation example

::: code-group

```typescript [Node.js (jose + ajv)]
import { compactDecrypt, importPKCS8, decodeJwt } from 'jose'

async function decryptAndValidatePII(
  piiJweString: string,
  kid: string
): Promise<Record<string, unknown>> {
  // 1. Load the Enc1 private key matching the kid
  const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
  const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

  // 2. Decrypt the JWE → inner JWS
  const { plaintext } = await compactDecrypt(piiJweString, privateKey)
  const jwsString = new TextDecoder().decode(plaintext)

  // 3. Decode the JWS payload (signature verification is optional — see note above)
  const piiPayload = decodeJwt(jwsString)

  // 4. Validate against the OpenAPI schema
  validatePIISchema(piiPayload)

  return piiPayload
}
```

```python [Python (jwcrypto + jsonschema)]
from jwcrypto import jwe as jwecrypto
import json, base64

def decrypt_and_validate_pii(pii_jwe_string: str, private_key) -> dict:
    # 1. Decrypt the JWE → inner JWS
    token = jwecrypto.JWE()
    token.deserialize(pii_jwe_string, key=private_key)
    jws_string = token.payload.decode()

    # 2. Decode the JWS payload (signature verification is optional — see note above)
    payload_b64 = jws_string.split(".")[1]
    pii_payload = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

    # 3. Validate against the OpenAPI schema
    validate_pii_schema(pii_payload)

    return pii_payload
```

:::

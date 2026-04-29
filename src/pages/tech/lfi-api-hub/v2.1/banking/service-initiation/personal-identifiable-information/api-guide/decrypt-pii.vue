<route lang="yaml">
meta:
  title: How to Decrypt PII
</route>

<script setup lang="ts">
const step1Node = `function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const kid = getJweKid(piiJweString)
const privateKey = myKeyStore.getPrivateKey(kid)
`

const step1Python = `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

kid = get_jwe_kid(pii_jwe_string)
private_key = my_key_store.get_private_key(kid)
`

const step2Node = `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(piiJweString, privateKey)
const jwsString = new TextDecoder().decode(plaintext)
`

const step2Python = `from jwcrypto import jwe as jwecrypto

token = jwecrypto.JWE()
token.deserialize(pii_jwe_string, key=private_key)
jws_string = token.payload.decode()
`

const step3Node = `import { decodeJwt } from 'jose'

const piiPayload = decodeJwt(jwsString)
// piiPayload now contains { Initiation: { ... }, Risk: { ... }, iat, exp, iss, ... }
`

const step3Python = `import json, base64

def decode_jws_payload(jws_string: str) -> dict:
    payload_b64 = jws_string.split(".")[1]
    return json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))

pii_payload = decode_jws_payload(jws_string)
# pii_payload now contains { "Initiation": { ... }, "Risk": { ... }, "iat": ..., "exp": ..., "iss": ..., ... }
`

const validateNode = `import Ajv from 'ajv'
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
  ajv.addSchema(schema as object, \`#/components/schemas/\${name}\`)
}

const validate = ajv.compile(piiSchema)

// 3. Validate the decrypted PII payload
function validatePIISchema(piiPayload: Record<string, unknown>): void {
  const valid = validate(piiPayload)
  if (!valid) {
    const errors = validate.errors?.map(e => \`\${e.instancePath} \${e.message}\`)
    throw new Error(\`PII schema validation failed:\\n\${errors?.join('\\n')}\`)
  }
}
`

const validatePython = `import yaml
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
`

const fullExampleNode = `import { compactDecrypt, importPKCS8, decodeJwt } from 'jose'

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
`

const fullExamplePython = `from jwcrypto import jwe as jwecrypto
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
`

const step1Tabs       = [{ label: 'Node.js', lang: 'typescript', code: step1Node },        { label: 'Python', lang: 'python', code: step1Python }] as const
const step2Tabs       = [{ label: 'Node.js (jose)', lang: 'typescript', code: step2Node }, { label: 'Python (jwcrypto)', lang: 'python', code: step2Python }] as const
const step3Tabs       = [{ label: 'Node.js (jose)', lang: 'typescript', code: step3Node }, { label: 'Python', lang: 'python', code: step3Python }] as const
const validateTabs    = [{ label: 'Node.js (ajv + yaml)', lang: 'typescript', code: validateNode }, { label: 'Python (jsonschema + pyyaml)', lang: 'python', code: validatePython }] as const
const fullExampleTabs = [{ label: 'Node.js (jose + ajv)', lang: 'typescript', code: fullExampleNode }, { label: 'Python (jwcrypto + jsonschema)', lang: 'python', code: fullExamplePython }] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Banking &middot; Service Initiation &middot; PII &middot; API Guide
        </div>
        <h1 class="ed-doc__title">
          How to Decrypt PII
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <code>PersonalIdentifiableInformation</code> field is a compact JWE (JSON Web
          Encryption) string. It was encrypted by the TPP using your LFI's public encryption key
          (<a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#enc1-encryption-key">Enc1</a>).
          To decrypt it, you need the corresponding <strong>Enc1 private key</strong>.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="step-1-read-kid"
      num="01"
      color="var(--at-teal)"
      eyebrow="Step 1"
      title="Read the kid from the JWE header"
      tone="cream"
    >
      <EdProse>
        The JWE protected header contains the <code>kid</code> (Key ID) of the encryption key that
        was used. Decode the first segment of the JWE to identify which private key to use:
      </EdProse>
      <EdCodeGroup :tabs="step1Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-2-decrypt-jwe"
      num="02"
      color="var(--at-gold)"
      eyebrow="Step 2"
      title="Decrypt the JWE"
      tone="surface"
    >
      <EdProse>
        Decrypt the JWE using your Enc1 private key. The result is the inner JWS (signed JWT):
      </EdProse>
      <EdCodeGroup :tabs="step2Tabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-3-decode-jws"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 3"
      title="Decode the JWS payload"
      tone="cream"
    >
      <EdProse>
        The inner JWS contains the PII JSON in its payload. Decode the payload to access the PII
        fields:
      </EdProse>
      <EdCodeGroup :tabs="step3Tabs" />

      <EdNote type="tip" title="Optional — Verify the TPP's JWS signature">
        <p>
          The JWS is signed by the TPP. You may optionally verify this signature against the TPP's
          public signing key. However, this is <strong>not required</strong> &mdash; the entire
          request containing the PII field is itself sent as a JWS that the API Hub has already
          verified was signed by the TPP. The PII therefore cannot have been tampered with in
          transit.
        </p>
        <p>
          If you choose to implement JWS verification for defence-in-depth, see
          <a href="./verify-tpp-signature">Verify TPP Signature (Optional)</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-4-validate-schema"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 4"
      title="Validate the PII against the OpenAPI schema"
      tone="surface"
    >
      <EdProse>
        After decrypting, the LFI MUST validate the PII payload against the relevant OpenAPI schema.
        The PII has not been validated by the API Hub &mdash; schema validation is the LFI's
        responsibility.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Stage</th><th>Spec file</th><th>Schema</th></tr>
          </thead>
          <tbody>
            <tr><td>Consent</td><td><code>uae-api-hub-consent-manager-openapi.yaml</code></td><td><code>AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII</code></td></tr>
            <tr><td>Payment</td><td><code>uae-ozone-connect-bank-service-initiation-openapi.yaml</code></td><td><code>AEBankServiceInitiation.AEDomesticPaymentPIIProperties</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Obtaining the OpenAPI specification</h3>
      <EdProse>
        The OpenAPI YAML files are the source of truth for PII schemas. They are maintained in the
        canonical specification repository:
      </EdProse>

      <p>
        <a href="https://github.com/Nebras-Open-Finance/api-specs" target="_blank" rel="noopener" class="ed-doc__github-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>
          Nebras-Open-Finance/api-specs
        </a>
      </p>

      <EdProse>Spec files are located under <code>dist/</code> by category:</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Stage</th><th>Path</th></tr>
          </thead>
          <tbody>
            <tr><td>Consent</td><td><code>dist/api-hub/{version}/openapi/uae-api-hub-consent-manager-openapi.yaml</code></td></tr>
            <tr><td>Payment</td><td><code>dist/ozone-connect/{version}/openapi/uae-ozone-connect-bank-service-initiation-openapi.yaml</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Errata versions">
        <p>
          Specifications may have errata releases (e.g. <code>v2.1.x-errata1</code>) that contain
          targeted corrections. When multiple version folders exist for the same major.minor
          version, use the <strong>highest errata</strong> that contains the file you need. If a
          file is not present in an errata folder, fall back to the base version. Always check for
          errata before bundling a spec into your service.
        </p>
      </EdNote>

      <h3 class="ed-doc__subhead">Validating against the schema</h3>
      <EdProse>
        Extract the relevant <code>components/schemas</code> entry from the YAML file and validate
        the decrypted PII payload against it. The PII schemas in the OpenAPI specification already
        declare the constraints needed for validation:
      </EdProse>
      <EdBullets>
        <li><strong><code>additionalProperties: false</code></strong> is set at every level of the PII schema &mdash; any unexpected fields will cause validation to fail.</li>
        <li><strong><code>required</code> arrays</strong> are declared on sub-schemas (e.g. <code>CreditorAccount</code> is required on each creditor entry, <code>SchemeName</code> and <code>Identification</code> are required on account objects) &mdash; missing mandatory fields will cause validation to fail.</li>
        <li><strong><code>enum</code> constraints</strong> restrict values to allowed options (e.g. <code>SchemeName</code> must be <code>IBAN</code>).</li>
        <li><strong><code>$ref</code> pointers</strong> link to nested schemas (creditor, debtor, risk). For validation to work correctly, all <code>components/schemas</code> entries from the spec MUST be registered with the validator so that <code>$ref</code> pointers resolve.</li>
      </EdBullets>

      <EdProse>
        When you register the full set of component schemas and compile the PII schema, standard
        JSON Schema validators (<code>ajv</code> for Node.js, <code>jsonschema</code> for Python)
        will enforce all of these constraints automatically. No custom validation logic is needed
        for schema conformance &mdash; the OpenAPI spec is the single source of truth.
      </EdProse>

      <EdProse>The following example shows how to validate a domestic payment PII at consent time:</EdProse>
      <EdCodeGroup :tabs="validateTabs" />

      <EdNote type="danger" title="Reject invalid PII">
        <p>
          If the decrypted PII fails schema validation, the LFI MUST reject the consent or payment.
          Do not attempt to process a payment with malformed PII &mdash; return an appropriate error
          response. See <a href="../">Personal Identifiable Information</a> for the full set of
          validation rules.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="full-example"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Full example"
      title="Decryption and validation, end-to-end"
      tone="cream"
    >
      <EdCodeGroup :tabs="fullExampleTabs" />
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede :deep(a:hover) { color: var(--at-teal-deep); }

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__github-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(84.64deg, #00C8AF 0%, #015AD7 41.05%, #000000 82.6%);
  border-radius: 66px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
}
.ed-doc__github-link svg { fill: currentColor; flex-shrink: 0; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>

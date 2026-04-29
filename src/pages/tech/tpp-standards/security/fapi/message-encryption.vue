<route lang="yaml">
meta:
  title: Message Encryption (JWE)
</route>

<script setup lang="ts">
const compactSerialization = `base64url(header) . base64url(encrypted-key) . base64url(iv) . base64url(ciphertext) . base64url(tag)`

const headerJson = `{
  "alg": "RSA-OAEP-256",
  "enc": "A256GCM",
  "kid": "<lfi-encryption-key-id>"
}`

const jwksUriExample = `https://keystore.directory.openfinance.ae/[LFI-UUID]/application.jwks`

const exampleEncKey = `{
  "kty": "RSA",
  "use": "enc",
  "x5c": ["MIIF5zCCBM+gAwIBAgIUTAsBRMW3lPiptQPq4DD3aPVvT/gwDQYJKoZIhvcNAQEL..."],
  "n": "qyWmUY-_eWY7H8IHeHDTM-UIgJUVeoEme1J2KCvMMzmUDLSRUP8HljchOQKx9zwMquOSEXsQC4IOsXOa2NKPFbeidhnzSire6nHALJMowN3fMfIeBTbf9nuEzafJHMLixSpcjrPvyhzhMKjGZ5EY6MCBm6fNdRmcEOBCTfF8wjOrl9Y4mi-fz16INi8zHJrsKMJwuj3VD5jQ3J64twLQ-E9aECuIBH51L-6J4c9Pwp1M3W_nZ0RpivBQlLY8jJKr_r-a9TUKikFzVSWK9-trvMK32fLjuEwTvSB9YHLPfOq8qNmyS8djf8vM2AIavkE5Ge-ZRGr0JXXbS5vEAOUHkw",
  "e": "AQAB",
  "kid": "NLVWCFEnbvtP1n4mG040VTwTMl-mhI6AdQiOOJbf_1w",
  "x5u": "https://keystore.directory.openfinance.ae/36b067c3-8017-4144-bb7e-49cf794089c9/NLVWCFEnbvtP1n4mG040VTwTMl-mhI6AdQiOOJbf_1w.pem",
  "x5t#S256": "NLVWCFEnbvtP1n4mG040VTwTMl-mhI6AdQiOOJbf_1w",
  "x5dn": "OU=36b067c3-8017-4144-bb7e-49cf794089c9,O=Abu Dhabi Commercial Bank PBJC,C=AE"
}`

const encryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { importJWK, CompactEncrypt } from 'jose'

interface JWK {
  use: string
  kid: string
  [key: string]: unknown
}

/**
 * Encrypt a payment PII payload as a compact JWE using the LFI's public key.
 * @param pii      - The PII JSON (Initiation, RiskIndicators, etc.)
 * @param jwksUri  - The LFI's JWKS URI from .well-known
 */
export async function encryptPii(
  pii: Record<string, unknown>,
  jwksUri: string,
): Promise<string> {
  // 1. Fetch the LFI's public keys
  const response = await fetch(jwksUri)
  const { keys } = await response.json() as { keys: JWK[] }

  // 2. Find the encryption key
  const encKeyJwk = keys.find((k) => k.use === 'enc')
  if (!encKeyJwk) throw new Error('No encryption key (use: enc) found in JWKS')

  // 3. Import the public key
  const encKey = await importJWK(encKeyJwk, 'RSA-OAEP-256')

  // 4. Encrypt the PII JSON
  const plaintext = new TextEncoder().encode(JSON.stringify(pii))
  return new CompactEncrypt(plaintext)
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encKeyJwk.kid,
    })
    .encrypt(encKey)
}`,
  },
  {
    label: 'Python (python-jose)',
    lang: 'python',
    code: `import json
import requests
from jose import jwe

def encrypt_pii(pii: dict, jwks_uri: str) -> str:
    """Encrypt a payment PII payload as a compact JWE using the LFI's public key."""
    # 1. Fetch the LFI's public keys
    response = requests.get(jwks_uri)
    keys = response.json()["keys"]

    # 2. Find the encryption key
    enc_key = next((k for k in keys if k.get("use") == "enc"), None)
    if not enc_key:
        raise ValueError("No encryption key (use: enc) found in JWKS")

    # 3. Encrypt the PII JSON
    return jwe.encrypt(
        json.dumps(pii).encode(),
        enc_key,
        algorithm="RSA-OAEP-256",
        encryption="A256GCM",
    ).decode()`,
  },
] as const

const embedTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import crypto from 'node:crypto'
import { encryptPii } from './encrypt-pii'
import { buildRequestJWT } from './request-jwt'

const jwksUri = 'https://keystore.directory.openfinance.ae/[lfi-uuid]/application.jwks'

// 1. Build the PII payload (creditor/debtor accounts, risk indicators)
const pii = {
  Initiation: {
    Debtor: { Name: { en: 'John Doe' } },
    Creditor: [
      { Name: { en: 'Acme Ltd' }, Identification: 'AE070331234567890123456' },
    ],
  },
  RiskIndicators: { /* ... */ },
}

// 2. Encrypt the PII as a JWE
const piiJwe = await encryptPii(pii, jwksUri)

// 3. Embed the JWE inside the consent's authorization_details
const authorizationDetails = [{
  type: 'urn:openfinanceuae:service-initiation-consent:v2.1',
  consent: {
    ConsentId: crypto.randomUUID(),
    ExpirationDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    pii: piiJwe,                    // ← encrypted PII goes here
    // other consent fields
  },
}]

// 4. Build and sign the Request JWT — note: the Request JWT itself is NOT encrypted
const requestJwt = await buildRequestJWT({
  scope: 'payments openid',
  codeChallenge: '<from PKCE>',
  authorizationDetails,
})

// 5. Send to /par as usual
// body: new URLSearchParams({ request: requestJwt })`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import uuid
from datetime import datetime, timedelta, timezone
from encrypt_pii import encrypt_pii
from request_jwt import build_request_jwt

JWKS_URI = "https://keystore.directory.openfinance.ae/[lfi-uuid]/application.jwks"

# 1. Build the PII payload (creditor/debtor accounts, risk indicators)
pii = {
    "Initiation": {
        "Debtor": {"Name": {"en": "John Doe"}},
        "Creditor": [
            {"Name": {"en": "Acme Ltd"}, "Identification": "AE070331234567890123456"},
        ],
    },
    "RiskIndicators": { },  # ...
}

# 2. Encrypt the PII as a JWE
pii_jwe = encrypt_pii(pii, JWKS_URI)

# 3. Embed the JWE inside the consent's authorization_details
expires_at = datetime.now(timezone.utc) + timedelta(days=1)
authorization_details = [{
    "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
    "consent": {
        "ConsentId": str(uuid.uuid4()),
        "ExpirationDateTime": expires_at.isoformat(),
        "pii": pii_jwe,                # ← encrypted PII goes here
        # other consent fields
    },
}]

# 4. Build and sign the Request JWT — note: the Request JWT itself is NOT encrypted
request_jwt = build_request_jwt(
    scope="payments openid",
    code_challenge="<from PKCE>",
    authorization_details=authorization_details,
)

# 5. Send to /par as usual
# data={"request": request_jwt}`,
  },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · FAPI · JWE
        </div>
        <h1 class="ed-doc__title">
          Message Encryption (JWE)
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A <strong>JWE</strong> (JSON Web Encryption &mdash;
          <a href="https://datatracker.ietf.org/doc/html/rfc7516">RFC 7516</a>) is the cryptographic
          mechanism that encrypts a payload so that only the intended recipient can read it.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          In UAE Open Finance, JWE is used <strong>specifically for payment consents</strong> &mdash;
          to encrypt the consent's <strong>PII payload</strong> (creditor and debtor names, account numbers,
          risk indicators) end-to-end with the LFI's public key. The encrypted blob is carried in the
          consent's <code>pii</code> field, nested inside the
          <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a>'s
          <code>authorization_details</code>. The Request JWT itself is signed (JWS) but is
          <strong>not</strong> wrapped in a JWE; only the <code>pii</code> field is.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          See <a href="/knowledge-base/articles/pii-encryption">Payment PII Encryption</a> for the data
          privacy rationale and the LFI/TPP validation responsibilities that flow from this design.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="structure"
      num="01"
      color="var(--at-teal)"
      eyebrow="Structure of an Encrypted Payload"
      title="Five base64url parts joined by dots"
      tone="cream"
    >
      <EdProse>A compact-serialised JWE consists of five base64url-encoded parts joined by <code>.</code>:</EdProse>
      <EdCode :code="compactSerialization" lang="plaintext" filename="Compact serialization" />
    </EdSectionBand>

    <EdSectionBand
      id="header"
      num="02"
      color="var(--at-gold)"
      eyebrow="JOSE Header"
      title="Key wrap, content encryption, and the LFI's key ID"
      tone="surface"
    >
      <EdCode :code="headerJson" lang="json" filename="JOSE header" />

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>alg</code></td>
              <td><code>RSA-OAEP-256</code></td>
              <td>Key-wrapping algorithm &mdash; encrypts the content encryption key using the LFI's RSA public key</td>
            </tr>
            <tr>
              <td><code>enc</code></td>
              <td><code>A256GCM</code></td>
              <td>Content encryption algorithm &mdash; encrypts the actual payload using AES-256-GCM</td>
            </tr>
            <tr>
              <td><code>kid</code></td>
              <td>string</td>
              <td>Key ID of the LFI's encryption key, taken from their JWKS</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="discover"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Discover the LFI's encryption key"
      title="JWKS URI and key selection"
      tone="cream"
    >
      <h3>Step 1 &mdash; Discover the JWKS URI</h3>
      <EdProse>
        Each LFI publishes its public keys at a JWKS URI. You can find this URI by performing
        <a href="/tech/tpp-standards/trust-framework/api-discovery">API Discovery</a> via the
        <code>.well-known</code> endpoint.
      </EdProse>
      <EdProse>The JWKS URI follows this format:</EdProse>
      <EdCode :code="jwksUriExample" lang="plaintext" filename="JWKS URI" />

      <h3>Step 2 &mdash; Select the encryption key</h3>
      <EdProse>
        Fetch the JWKS and find a key where <code>"use": "enc"</code>. This is the LFI's public key
        intended for encryption.
      </EdProse>
      <EdProse><strong>Example encryption key from a JWKS:</strong></EdProse>
      <EdCode :code="exampleEncKey" lang="json" filename="application.jwks (excerpt)" />

      <EdNote type="warning" title="Key selection">
        <p>
          If the JWKS contains multiple keys, always select the one where <code>"use": "enc"</code>. Do not
          use a signing key (<code>"use": "sig"</code>) for encryption &mdash; the operations are not
          interchangeable.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="encrypt"
      num="04"
      color="var(--at-navy)"
      eyebrow="Encrypt the PII Payload"
      title="Produce a compact JWE from the PII JSON"
      tone="surface"
    >
      <EdProse>
        The plaintext to encrypt is the <strong>PII JSON object</strong> &mdash; the
        <code>Initiation</code> and <code>RiskIndicators</code> structures defined by the consent schema.
        Encrypt it as a compact JWE before placing the result in the consent's <code>pii</code> field.
      </EdProse>

      <EdCodeGroup :tabs="encryptTabs" />

      <EdNote type="tip" title="Testing encryption on the sandbox">
        <p>
          The sandbox provides an <strong>O3 Utility endpoint</strong> that accepts your PII payload and the
          LFI's JWKS URL and returns a ready-made encrypted PII token &mdash; useful for validating your
          payload structure before writing your own encryption code. See
          <a href="/tech/tpp-standards/security/fapi/o3-utils#example-1-o3-util-prepare-encrypted-pii">O3 Sandbox Utilities</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="embed"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Embed the JWE in the Consent"
      title="The JWE goes in the consent's pii field, then the Request JWT is signed around it"
      tone="cream"
    >
      <EdProse>
        Once you have the JWE string, place it in the <code>pii</code> field of the consent inside the
        Request JWT's <code>authorization_details</code>. The surrounding Request JWT is signed (JWS) as
        usual &mdash; only the <code>pii</code> field is encrypted.
      </EdProse>

      <EdCodeGroup :tabs="embedTabs" />

      <EdProse>
        Each encryption is fresh: a new payload is produced and encrypted at consent creation, and a fresh
        payload is produced and encrypted again at each <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>. The two payloads are
        independently validated by the LFI after decryption.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="receiving"
      num="06"
      color="var(--at-gold)"
      eyebrow="Receiving a JWE"
      title="Inbound encrypted webhooks from the API Hub"
      tone="surface"
    >
      <EdProse>
        For guidance on receiving and decrypting inbound JWEs from the API Hub &mdash; including key
        selection by <code>kid</code>, signature verification, and FAPI-required security checks &mdash;
        see <a href="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event Notifications</a>.
      </EdProse>
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
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>

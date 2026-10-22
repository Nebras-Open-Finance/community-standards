<route lang="yaml">
meta:
  title: "Emirates ID in login_hint — Sending It as a TPP, Receiving It as an LFI"
  description: "login_hint carries a structured Emirates ID or Trade Licence Number from the TPP to the LFI, encrypted to the LFI's ENC1 key. It reaches the LFI once, in the GET /auth response — it is never stored on the consent."
  category: Security
  readTime: "7 min"
  updated: "2026-10-22"
  tags:
    - login_hint
    - Emirates ID
    - JWE
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'what',      label: 'What it is' },
  { id: 'payload',   label: 'The payload' },
  { id: 'tpps',      label: 'For TPPs' },
  { id: 'lfis',      label: 'For LFIs' },
  { id: 'lifetime',  label: 'One delivery only' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Security' },
  { label: 'Read',     value: '7 min' },
  { label: 'Updated',  value: '22 Oct 2026' },
]

const tags: readonly string[] = ['login_hint', 'Emirates ID', 'JWE']

const payloadSchema = `{
  "Type": "EmiratesID",
  "Identification": "784-1985-7654321-9"
}`

const requestObjectExample = `{
  ....
  "login_hint": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiPGxmaS1lbmMxLWtpZD4iLCJjdHkiOiJKV1QifQ...",
  "authorization_details": [
    {
      "type": "urn:openfinanceuae:account-access-consent:v2.1",
      "consent": { "...": "..." }
    }
  ]
}`

const jweHeaderExample = `{
  "alg": "RSA-OAEP-256",
  "enc": "A256GCM",
  "kid": "<lfi-enc1-key-id>",
  "cty": "JWT"
}`

const buildHintTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { SignJWT, CompactEncrypt, importPKCS8, importJWK } from 'jose'

/**
 * Build a login_hint value: a JWS signed with your signing key, wrapped in a
 * JWE encrypted to the LFI's ENC1 public key.
 *
 * @param identification  The Emirates ID or Trade Licence Number
 * @param type            'EmiratesID' | 'TradeLicenseNumber'
 * @param lfiJwksUri      The LFI's JWKS in the Directory keystore
 */
export async function buildLoginHint(
  identification: string,
  type: 'EmiratesID' | 'TradeLicenseNumber',
  lfiJwksUri: string,
): Promise<string> {
  // 1. The payload — exactly these two properties, nothing else
  const payload = { Type: type, Identification: identification }

  // 2. Sign it with your signing key (PS256)
  const signingKey = await importPKCS8(mySigningKeyPem, 'PS256')
  const jws = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'PS256', typ: 'JWT', kid: mySigningKid })
    .sign(signingKey)

  // 3. Fetch the LFI's encryption key
  const { keys } = await (await fetch(lfiJwksUri)).json()
  const encJwk = keys.find((k: { use?: string }) => k.use === 'enc')
  if (!encJwk) throw new Error(\`No encryption key (use: enc) in \${lfiJwksUri}\`)
  const encKey = await importJWK(encJwk, 'RSA-OAEP-256')

  // 4. Encrypt the compact JWS — the JWE wraps a JWS, so cty is JWT
  return new CompactEncrypt(new TextEncoder().encode(jws))
    .setProtectedHeader({
      alg: 'RSA-OAEP-256',
      enc: 'A256GCM',
      kid: encJwk.kid,
      cty: 'JWT',
    })
    .encrypt(encKey)
}
`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import json
import requests
from jwcrypto import jwk, jws as jwscrypto, jwe as jwecrypto


def build_login_hint(identification: str, id_type: str, lfi_jwks_uri: str) -> str:
    """Build a login_hint: a JWS signed with your key, wrapped in a JWE
    encrypted to the LFI's ENC1 public key."""
    # 1. The payload — exactly these two properties, nothing else
    payload = {"Type": id_type, "Identification": identification}

    # 2. Sign it with your signing key (PS256)
    signing_key = jwk.JWK.from_pem(my_signing_key_pem)
    token = jwscrypto.JWS(json.dumps(payload).encode())
    token.add_signature(
        signing_key,
        protected=json.dumps({"alg": "PS256", "typ": "JWT", "kid": my_signing_kid}),
    )
    jws_compact = token.serialize(compact=True)

    # 3. Fetch the LFI's encryption key
    keys = requests.get(lfi_jwks_uri, timeout=30).json()["keys"]
    enc_jwk = next((k for k in keys if k.get("use") == "enc"), None)
    if enc_jwk is None:
        raise ValueError(f"No encryption key (use: enc) in {lfi_jwks_uri}")
    enc_key = jwk.JWK(**enc_jwk)

    # 4. Encrypt the compact JWS — the JWE wraps a JWS, so cty is JWT
    encrypted = jwecrypto.JWE(
        jws_compact.encode(),
        protected=json.dumps({
            "alg": "RSA-OAEP-256",
            "enc": "A256GCM",
            "kid": enc_jwk["kid"],
            "cty": "JWT",
        }),
    )
    encrypted.add_recipient(enc_key)
    return encrypted.serialize(compact=True)
`,
  },
] as const

const jwksUriExample = `Production   https://keystore.directory.openfinance.ae/{LFI-organisation-id}/application.jwks
Sandbox      https://keystore.sandbox.directory.openfinance.ae/{LFI-organisation-id}/application.jwks`

const authResponseExample = `{
  "interaction": {
    "interactionId": "d47f30f4-b238-4008-b151-2a6eaf9ab919",
    "params": {
      "client_id": "https://rp.directory.openfinance.ae/openid_relying_party/{software-statement-id}",
      "scope": "accounts openid",
      "code_challenge_method": "S256",
      "code_challenge": "F3338UWkgr_RTk4ppE6pDkE9f1mFXMAXx06gcptIhpM",
      "login_hint": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiPGxmaS1lbmMxLWtpZD4iLCJjdHkiOiJKV1QifQ...",
      "authorization_details": [ { "...": "..." } ]
    },
    "status": "started",
    "consentIdsList": ["10ef5d6d-36b6-4e05-82d4-21df33199443"]
  },
  "tpp": { "...": "..." }
}`

const readHintTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8, decodeJwt } from 'jose'

interface LoginHint {
  Type: 'EmiratesID' | 'TradeLicenseNumber'
  Identification: string
}

/**
 * Read the login_hint from a GET /auth response. Returns null when the TPP
 * did not send one — which is permitted, and MUST NOT fail the interaction.
 */
export async function readLoginHint(
  authResponse: { interaction: { params: Record<string, unknown> } },
): Promise<LoginHint | null> {
  const jwe = authResponse.interaction.params['login_hint']
  if (typeof jwe !== 'string' || jwe === '') return null

  // 1. The kid in the JWE header tells you which ENC1 key to use
  const header = JSON.parse(
    Buffer.from(jwe.split('.')[0], 'base64url').toString(),
  )
  const privateKeyPem = myKeyStore.getPrivateKeyPem(header.kid)
  const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

  // 2. Decrypt the JWE → the inner JWS
  const { plaintext } = await compactDecrypt(jwe, privateKey)
  const jws = new TextDecoder().decode(plaintext)

  // 3. Decode the JWS payload
  const { Type, Identification } = decodeJwt(jws) as unknown as LoginHint
  return { Type, Identification }
}
`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64
import json
from jwcrypto import jwe as jwecrypto


def read_login_hint(auth_response: dict) -> dict | None:
    """Read the login_hint from a GET /auth response. Returns None when the TPP
    did not send one — which is permitted, and MUST NOT fail the interaction."""
    jwe_string = auth_response["interaction"]["params"].get("login_hint")
    if not jwe_string:
        return None

    # 1. The kid in the JWE header tells you which ENC1 key to use
    header_b64 = jwe_string.split(".")[0]
    header = json.loads(base64.urlsafe_b64decode(header_b64 + "=="))
    private_key = my_key_store.get_private_key(header["kid"])

    # 2. Decrypt the JWE → the inner JWS
    token = jwecrypto.JWE()
    token.deserialize(jwe_string, key=private_key)
    jws_string = token.payload.decode()

    # 3. Decode the JWS payload
    payload_b64 = jws_string.split(".")[1]
    payload = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))
    return {"Type": payload["Type"], "Identification": payload["Identification"]}
`,
  },
] as const
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Emirates ID in login_hint — Sending It as a TPP, Receiving It as an LFI"
      :meta="meta"
      lede="<code>login_hint</code> is the one place in the authorization request built to carry a <strong>PSU identifier</strong>. It is not free text: the standards define a two-property structure for an <strong>Emirates ID</strong> or <strong>Trade Licence Number</strong>, encrypted to the LFI's ENC1 key so that only the LFI can read it. It reaches the LFI exactly once, in the <code>GET /auth</code> response &mdash; it is never stored on the consent."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="what"
      num="01"
      color="var(--at-teal)"
      eyebrow="What it is"
      title="A hint about identity, sent before the PSU arrives"
      tone="cream"
    >
      <EdProse>
        When a TPP creates a consent it knows who its customer is, but the LFI does not find out
        until the PSU authenticates. <code>login_hint</code> closes that gap: the TPP passes the
        PSU's Emirates ID or Trade Licence Number in the Request JWT, and the LFI receives it when
        it starts the authorization interaction &mdash; before it has to render anything to the PSU.
      </EdProse>
      <EdProse>
        As the standards put it, this exists &ldquo;to allow LFIs to correlate the User identity,
        and therefore the features of their account, prior to the User being redirected to the
        LFI's authentication page.&rdquo; An LFI can use it to pre-select a customer segment, choose
        an authentication channel, or decide which products the journey should offer.
      </EdProse>

      <EdNote type="important" title="A hint, and nothing more">
        <p>
          <code>login_hint</code> is used for discovery only. It <strong>MUST NOT</strong> be used
          to bypass authentication of the PSU.
        </p>
      </EdNote>

      <EdRefTable>
        <table>
          <thead><tr><th>Stage</th><th>Who</th><th>What happens to the hint</th></tr></thead>
          <tbody>
            <tr><td><code>POST /par</code></td><td>TPP &rarr; API Hub</td><td>Sent as the <code>login_hint</code> claim inside the signed Request JWT, already encrypted to the LFI</td></tr>
            <tr><td>PSU redirect</td><td>TPP &rarr; PSU &rarr; LFI</td><td>Not present &mdash; the redirect carries only <code>client_id</code> and <code>request_uri</code></td></tr>
            <tr><td><code>GET /auth</code></td><td>LFI &rarr; API Hub</td><td>Returned on <code>interaction.params.login_hint</code>, byte-for-byte as the TPP sent it</td></tr>
            <tr><td><code>GET /consents/{consentId}</code></td><td>LFI &rarr; API Hub</td><td>Not present &mdash; the hint is never written onto the consent</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payload"
      num="02"
      color="var(--at-gold)"
      eyebrow="The payload"
      title="Two properties, and only two"
      tone="surface"
    >
      <EdProse>
        The decoded payload is defined by the <code>AESecurityProfile.AELoginHintJwePayload</code>
        schema in the Authorization Endpoints specification:
      </EdProse>

      <EdCode :code="payloadSchema" lang="json" />

      <EdRefTable>
        <table>
          <thead><tr><th>Property</th><th>Required</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td><code>Type</code></td><td>Yes</td><td>Either <code>EmiratesID</code> or <code>TradeLicenseNumber</code> &mdash; nothing else is permitted</td></tr>
            <tr><td><code>Identification</code></td><td>Yes</td><td>The identification number itself</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="The schema is closed">
        <p>
          <code>AELoginHintJwePayload</code> sets <code>additionalProperties: false</code>. The
          object carries these two properties and no others &mdash; do not add JWT registered claims
          such as <code>iss</code>, <code>aud</code> or <code>exp</code> to the payload itself. This
          is a deliberate difference from payment PII, whose signed payload does carry them.
        </p>
      </EdNote>

      <EdProse>
        On the wire the value is never that JSON object. It <strong>MUST</strong> be a JWE: the
        object is signed with the TPP's signing key to produce a JWS, and that compact JWS is then
        encrypted to the LFI's public encryption key. The schema is shown in decoded form in the
        specification only because OpenAPI cannot express the structure inside a JWT.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="tpps"
      num="03"
      color="var(--at-blue)"
      eyebrow="For TPPs"
      title="Sign it, encrypt it to the LFI, send it in the Request JWT"
      lede="The mechanics are the same as payment PII &mdash; a JWS wrapped in a JWE, encrypted to the LFI's <strong>ENC1</strong> key. Only the destination claim differs."
      tone="cream"
    >
      <h3>Step 1 &mdash; Find the LFI's encryption key</h3>
      <EdProse>
        The hint is encrypted to the <strong>target LFI</strong>, not to the API Hub. Fetch the LFI's
        JWKS from the Directory keystore using that LFI's organisation ID, and take the key with
        <code>use: "enc"</code>:
      </EdProse>
      <EdCode :code="jwksUriExample" lang="text" />
      <EdProse>
        That is the LFI's ENC1 key, the same server-side encryption key used for payment PII and
        described in
        <a href="/tech/lfi-api-hub/trust-framework/certificates/">Keys &amp; Certificates</a>. Use
        the <code>kid</code> from the JWK you selected.
      </EdProse>

      <h3>Step 2 &mdash; Build the JWE</h3>
      <EdProse>
        Sign first, then encrypt &mdash; the JWE wraps a JWS. Use <code>RSA-OAEP-256</code> for key
        wrapping and <code>A256GCM</code> for content encryption, matching
        <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption (JWE)</a>,
        and set <code>cty: "JWT"</code> so the LFI knows the plaintext is itself a token:
      </EdProse>
      <EdCode :code="jweHeaderExample" lang="json" />
      <EdCodeGroup :tabs="buildHintTabs" />

      <h3>Step 3 &mdash; Put it in the Request JWT</h3>
      <EdProse>
        <code>login_hint</code> is a claim of the signed Request JWT you push to
        <a href="/tech/tpp-standards/v2.1/consent/open-api/par" class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></a>,
        alongside <code>authorization_details</code>. It is not a separate form field on the PAR
        request, and not a query parameter on the redirect:
      </EdProse>
      <EdCode :code="requestObjectExample" lang="json" />

      <EdNote type="info" title="A 201 from /par says nothing about the hint">
        <p>
          The API Hub routes the encrypted value through to the LFI without reading it &mdash; it
          holds no key that could. A successful <code>/par</code> response therefore does not
          confirm that the LFI could decrypt your hint, or that you encrypted it to the right key.
          As with payment PII, test this end to end with each LFI you onboard with.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lfis"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="For LFIs"
      title="It arrives on the GET /auth response"
      lede="You receive the hint from the API Hub when you start the authorization interaction &mdash; on <code>interaction.params.login_hint</code>, as the TPP encrypted it."
      tone="surface"
    >
      <EdProse>
        When the PSU lands on your Authorization Endpoint you forward the query parameters you
        received to
        <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth" class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></a>
        &mdash; step 5 of the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide#psu-redirect">Consent Journey</a>.
        The response unbundles the Request JWT the TPP signed, and <code>login_hint</code> appears
        among those parameters:
      </EdProse>

      <EdCode :code="authResponseExample" lang="json" />

      <EdProse>
        The value is the TPP's JWE, unchanged. Read the <code>kid</code> from its header, decrypt
        with the matching ENC1 private key, then decode the inner JWS to reach the two properties:
      </EdProse>
      <EdCodeGroup :tabs="readHintTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="lifetime"
      num="05"
      color="var(--at-navy)"
      eyebrow="One delivery only"
      title="The hint is interaction state, not consent state"
      lede="<code>login_hint</code> belongs to the authorization request. It is <strong>not</strong> part of the consent, and reading the consent back will not return it."
      tone="cream"
    >
      <EdProse>
        The consent stored by the API Hub holds what the TPP asked for &mdash;
        <code>ConsentId</code>, <code>Permissions</code>, <code>ExpirationDateTime</code>,
        <code>OpenFinanceBilling</code> and the consent status. The PSU identity hint is not among
        those fields, and
        <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a>
        does not return it, at any point in the consent's life.
      </EdProse>

      <EdNote type="important" title="Capture it at GET /auth or lose it">
        <p>
          <code>GET /auth</code> is the only place the hint is delivered. If your authorization
          journey needs the identifier in a later step &mdash; a downstream service, an audit record,
          a decision taken after the PSU authenticates &mdash; read it at <code>/auth</code> and
          carry it in your own interaction state, keyed by <code>interactionId</code>. There is no
          second opportunity to fetch it from the API Hub.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdRelatedCards>
      <EdRelatedCard
        href="/knowledge-base/articles/pii-encryption"
        category="Security"
        category-color="var(--at-blue)"
        title="Payment PII Encryption"
        desc="The same JWS-inside-JWE mechanics, applied to payment consents, and what end-to-end encryption means for validation responsibility."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/consent-identifiers"
        category="Consents"
        category-color="var(--at-teal)"
        title="Consent Identifiers"
        desc="Which identifiers may be stored centrally, and why an Emirates ID must never be one of them."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/identity-assurance-claims"
        category="Integration"
        category-color="var(--at-gold)"
        title="Identity Assurance Claims"
        desc="The other route to PSU identity attributes — verified claims returned by the LFI, rather than a hint sent to it."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>

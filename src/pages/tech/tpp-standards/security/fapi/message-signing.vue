<route lang="yaml">
meta:
  title: Message Signing (JWS)
</route>

<script setup lang="ts">
const headerJson = `{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}`

const compactSerialization = `base64url(header) . base64url(payload) . base64url(signature)`

const signTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'

const ALGORITHM = 'PS256'
const KEY_ID = process.env.SIGNING_KEY_ID!      // kid from Trust Framework
const CLIENT_ID = process.env.CLIENT_ID!          // your application's client_id
const ISSUER = process.env.AUTHORIZATION_SERVER_ISSUER! // from .well-known

const privateKeyPem = readFileSync('./certificates/signing.key', 'utf8')
const privateKey = await importPKCS8(privateKeyPem, ALGORITHM)

/**
 * Sign a payload as a FAPI-compliant JWS.
 * Caller provides the domain-specific claims; timing claims are added automatically.
 */
export async function signJWT(
  claims: Record<string, unknown>,
  expiresInSeconds = 300
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    ...claims,
    iat: now,
    nbf: now - 10,       // 10-second clock skew buffer
    exp: now + expiresInSeconds,
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}`,
  },
  {
    label: 'Python (PyJWT)',
    lang: 'python',
    code: `import jwt
import time
import uuid
from cryptography.hazmat.primitives.serialization import load_pem_private_key

ALGORITHM = "PS256"
KEY_ID = "your-signing-key-id"          # kid from Trust Framework
CLIENT_ID = "your-client-id"
ISSUER = "https://auth.[lfi].apihub.openfinance.ae"

with open("./certificates/signing.key", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)

def sign_jwt(claims: dict, expires_in: int = 300) -> str:
    now = int(time.time())
    payload = {
        **claims,
        "iat": now,
        "nbf": now - 10,
        "exp": now + expires_in,
    }
    return jwt.encode(
        payload,
        private_key,
        algorithm=ALGORITHM,
        headers={"kid": KEY_ID},
    )`,
  },
] as const

const stripPemCode = `awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' signing.key`

const verifyTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { jwtVerify, createRemoteJWKSet } from 'jose'

const JWKS = createRemoteJWKSet(
  new URL('https://keystore.directory.openfinance.ae/[your-org-id]/application.jwks')
)

const { payload, protectedHeader } = await jwtVerify(token, JWKS, {
  algorithms: ['PS256'],
})`,
  },
  {
    label: 'Python (PyJWT)',
    lang: 'python',
    code: `import jwt
from jwt import PyJWKClient

JWKS_URL = "https://keystore.directory.openfinance.ae/[your-org-id]/application.jwks"

jwks_client = PyJWKClient(JWKS_URL)
signing_key = jwks_client.get_signing_key_from_jwt(token)

payload = jwt.decode(
    token,
    signing_key.key,
    algorithms=["PS256"],
)`,
  },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · FAPI · JWS
        </div>
        <h1 class="ed-doc__title">
          Message Signing (JWS)
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A <strong>JWS</strong> (JSON Web Signature &mdash;
          <a href="https://datatracker.ietf.org/doc/html/rfc7515">RFC 7515</a>) is the cryptographic
          mechanism that signs a JSON payload to prove two things:
        </p>
        <ul class="ed-doc__bullets">
          <li><strong>Authenticity</strong> &mdash; it genuinely came from the holder of the private key</li>
          <li><strong>Integrity</strong> &mdash; the content has not been modified since it was signed</li>
        </ul>
        <p class="ed-doc__lede ed-doc__lede--tight">
          In UAE Open Finance, signing is required whenever your application sends a JWT to an Authorization
          Server:
        </p>
        <ul class="ed-doc__bullets">
          <li>The <strong>Request Object</strong> sent to <a href="/tech/tpp-standards/v2.1/consent/open-api/par"><code>/par</code></a></li>
          <li>The <strong>Client Assertion</strong> sent to <a href="/tech/tpp-standards/security/tokens/open-api/token"><code>/token</code></a></li>
        </ul>
      </div>
    </section>

    <EdSectionBand
      id="structure"
      num="01"
      color="var(--at-teal)"
      eyebrow="Structure of a Signed JWT"
      title="Three base64url parts joined by dots"
      tone="cream"
    >
      <EdProse>A signed JWT consists of three base64url-encoded parts joined by <code>.</code>:</EdProse>
      <EdCode :code="compactSerialization" lang="plaintext" filename="Compact serialization" />
    </EdSectionBand>

    <EdSectionBand
      id="header"
      num="02"
      color="var(--at-gold)"
      eyebrow="JOSE Header"
      title="Algorithm and signing key identifier"
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
              <td><code>PS256</code></td>
              <td>RSA-PSS with SHA-256. The only algorithm supported by the UAE Open Finance FAPI profile</td>
            </tr>
            <tr>
              <td><code>kid</code></td>
              <td>string</td>
              <td>The Key ID of your signing certificate, as registered in the Trust Framework</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Your <code>kid</code> is assigned by the Trust Framework when your signing certificate is issued.
        Find it on the certificate detail page: Application &rarr; App Certificates &rarr; select the
        certificate. See
        <a href="/tech/tpp-standards/trust-framework/certificates#finding-your-key-id-kid">Finding Your Key ID</a>
        for a screenshot.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="payload"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Payload"
      title="Domain claims plus FAPI-required timing claims"
      tone="cream"
    >
      <EdProse>
        The payload is a JSON object of claims. The structure depends on the use case &mdash; see
        <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a> and
        <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the specific
        claim sets.
      </EdProse>
      <EdProse>All signed JWTs must include timing claims to prevent replay attacks:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>iat</code></td>
              <td>Issued At &mdash; current Unix timestamp</td>
            </tr>
            <tr>
              <td><code>nbf</code></td>
              <td>Not Before &mdash; slightly before <code>iat</code> to allow for clock skew (e.g. <code>iat - 10</code>)</td>
            </tr>
            <tr>
              <td><code>exp</code></td>
              <td>Expiry &mdash; short-lived; typically 5 minutes (<code>iat + 300</code>)</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="prerequisites"
      num="04"
      color="var(--at-navy)"
      eyebrow="Prerequisites"
      title="What you need before signing"
      tone="surface"
    >
      <EdBullets>
        <li>An <strong>application registered</strong> in the Trust Framework with an appropriate role</li>
        <li>A <strong>valid signing certificate</strong> and its corresponding private key</li>
        <li>The <strong>Key ID</strong> (<code>kid</code>) of your signing certificate from the Trust Framework</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="signing"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Signing a JWT"
      title="Reusable signer for FAPI-compliant JWS"
      tone="cream"
    >
      <EdProse>
        The Node.js example uses the <a href="https://github.com/panva/jose"><code>jose</code></a> library
        (available for Node.js, browsers, Deno, and Cloudflare Workers); the Python example uses
        <a href="https://pyjwt.readthedocs.io/en/stable/"><code>PyJWT</code></a>.
      </EdProse>

      <EdCodeGroup :tabs="signTabs" />

      <EdNote type="tip" title="Removing whitespace from PEM keys">
        <p>
          Some environments require the PEM key to have no line breaks when passed as an environment
          variable. Strip them with:
        </p>
        <EdCode :code="stripPemCode" lang="bash" filename="bash" />
      </EdNote>

      <EdNote type="tip" title="Testing signing on the sandbox">
        <p>
          The sandbox provides <strong>O3 Utility endpoints</strong> that accept your private key and return
          ready-made signed JWTs &mdash; useful for validating your signing setup before writing your own
          code. See <a href="/tech/tpp-standards/security/fapi/o3-utils">O3 Sandbox Utilities</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="verifying"
      num="06"
      color="var(--at-gold)"
      eyebrow="Verifying a Signature"
      title="Useful for testing your own setup"
      tone="surface"
    >
      <EdProse>
        LFIs will verify your signatures using your <strong>public key</strong> fetched from your
        application's JWKS URI in the Trust Framework. You do not need to implement verification yourself,
        but it is useful for testing:
      </EdProse>

      <EdCodeGroup :tabs="verifyTabs" />
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

.ed-doc__bullets {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  margin: 0.85rem 0 0 1.2rem;
  padding: 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__bullets li { margin: 0.3rem 0; }
.ed-doc__bullets strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__bullets code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__bullets a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>

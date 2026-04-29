<route lang="yaml">
meta:
  title: Preparing Client Assertion
</route>

<script setup lang="ts">
const buildAssertionTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { SignJWT, importPKCS8 } from 'jose'
import { readFileSync } from 'node:fs'
import crypto from 'node:crypto'

const ALGORITHM = 'PS256'
const KEY_ID    = process.env.SIGNING_KEY_ID!     // kid from Trust Framework
const CLIENT_ID = process.env.CLIENT_ID!           // your application's client_id
const ISSUER    = process.env.AUTHORIZATION_SERVER_ISSUER!  // from .well-known

const privateKey = await importPKCS8(
  readFileSync('./certificates/signing.key', 'utf8'),
  ALGORITHM,
)

export async function buildClientAssertion(): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  return new SignJWT({
    aud: ISSUER,                  // Authorization Server's issuer URI
    iss: CLIENT_ID,               // your client_id
    sub: CLIENT_ID,               // same as iss
    iat: now,
    exp: now + 300,               // 5-minute expiry
    jti: crypto.randomUUID(),     // fresh UUID per assertion
  })
    .setProtectedHeader({ alg: ALGORITHM, kid: KEY_ID })
    .sign(privateKey)
}`,
  },
  {
    label: 'Python (PyJWT)',
    lang: 'python',
    code: `import os
import time
import uuid
import jwt
from cryptography.hazmat.primitives.serialization import load_pem_private_key

ALGORITHM = "PS256"
KEY_ID    = os.environ["SIGNING_KEY_ID"]              # kid from Trust Framework
CLIENT_ID = os.environ["CLIENT_ID"]                    # your application's client_id
ISSUER    = os.environ["AUTHORIZATION_SERVER_ISSUER"]  # from .well-known

with open("./certificates/signing.key", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)

def build_client_assertion() -> str:
    now = int(time.time())
    claims = {
        "aud": ISSUER,            # Authorization Server's issuer URI
        "iss": CLIENT_ID,         # your client_id
        "sub": CLIENT_ID,         # same as iss
        "iat": now,
        "exp": now + 300,         # 5-minute expiry
        "jti": str(uuid.uuid4()), # fresh UUID per assertion
    }
    return jwt.encode(
        claims,
        private_key,
        algorithm=ALGORITHM,
        headers={"kid": KEY_ID},
    )`,
  },
] as const

const wireExample = `client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJQUzI1NiIs...`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · OAuth 2.0 · Client authentication
        </div>
        <h1 class="ed-doc__title">
          Client Assertion
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A <strong>client assertion</strong> is a short-lived, signed JWT that your application presents
          to the Authorization Server to prove its identity. It takes the place of a static client secret,
          providing a stronger and more auditable form of client authentication.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          Because each assertion is signed with your application's private key, the Authorization Server
          can verify it using your public key from the Trust Framework &mdash; without any shared secret
          ever leaving your system.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="where-used"
      num="01"
      color="var(--at-teal)"
      eyebrow="Where it's used"
      title="Two endpoints require a client assertion"
      tone="cream"
    >
      <EdProse>In UAE Open Finance, a client assertion is required on two endpoints:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/tech/tpp-standards/security/tokens/open-api/token"><code>/token</code></a></td>
              <td>Exchanging an authorisation code for tokens, refreshing an access token, or obtaining a client credentials token</td>
            </tr>
            <tr>
              <td><a href="/tech/tpp-standards/v2.1/consent/open-api/par"><code>/par</code></a></td>
              <td>Submitting a Pushed Authorization Request to initiate a consent journey</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="One assertion per request">
        <p>
          A client assertion must be freshly generated for every request. The <code>jti</code> claim (a
          unique UUID) ensures the Authorization Server can detect and reject replayed assertions.
        </p>
      </EdNote>

      <EdNote type="tip" title="Strict claim rules">
        <p>
          For a complete per-claim reference &mdash; including the exact <code>aud</code> value,
          <code>jti</code> uniqueness requirements, <code>exp</code>/<code>iat</code> lifetime window, and a
          side-by-side comparison with the Request Object &mdash; see
          <a href="/knowledge-base/articles/jwt-claims">JWT Claim Rules</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="header"
      num="02"
      color="var(--at-gold)"
      eyebrow="Structure — Header"
      title="JOSE header — algorithm and signing key identifier"
      tone="surface"
    >
      <EdProse>The client assertion is a signed JWT composed of a header and a set of claims.</EdProse>

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
              <td>The only algorithm supported by the UAE Open Finance FAPI profile</td>
            </tr>
            <tr>
              <td><code>kid</code></td>
              <td>string</td>
              <td>Key ID of your signing certificate, as registered in the Trust Framework</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="claims"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Structure — Claims"
      title="Identity, audience, and short-lived timing claims"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>aud</code></td>
              <td>The Authorization Server's issuer URI &mdash; obtained from the <a href="/tech/tpp-standards/trust-framework/well-known"><code>.well-known</code></a> discovery endpoint</td>
              <td><code>https://auth.[LFICode].apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><code>iss</code></td>
              <td>Your application's <code>client_id</code> from the Trust Framework</td>
              <td><code>a1b2c3d4-...</code></td>
            </tr>
            <tr>
              <td><code>sub</code></td>
              <td>Same as <code>iss</code> &mdash; your <code>client_id</code></td>
              <td><code>a1b2c3d4-...</code></td>
            </tr>
            <tr>
              <td><code>iat</code></td>
              <td>Unix timestamp of when the JWT was issued</td>
              <td><code>1713196123</code></td>
            </tr>
            <tr>
              <td><code>exp</code></td>
              <td>Unix timestamp when the JWT expires. Keep this short &mdash; 5 minutes is standard</td>
              <td><code>1713196423</code></td>
            </tr>
            <tr>
              <td><code>jti</code></td>
              <td>A unique identifier (UUID) for this assertion. Prevents replay attacks</td>
              <td><code>f47ac10b-58cc-...</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Keep assertions short-lived">
        <p>
          Set <code>exp</code> to no more than 5 minutes after <code>iat</code>. Long-lived assertions
          increase the window of exposure if intercepted.
        </p>
      </EdNote>

      <EdNote type="tip" title="Testing client assertions on the sandbox">
        <p>
          The sandbox provides <strong>O3 Utility endpoints</strong> that accept your private key and
          return a ready-made client assertion JWT &mdash; useful for confirming your key setup is correct
          before writing your own signing code. See
          <a href="/tech/tpp-standards/security/fapi/o3-utils#example-2-o3-util-prepare-private-key-jwt-for-par-end-point">O3 Sandbox Utilities</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="signing"
      num="04"
      color="var(--at-navy)"
      eyebrow="Signing the Assertion"
      title="Assemble the claims and sign as a JWS using PS256"
      tone="surface"
    >
      <EdProse>
        Once the header and claims are assembled, sign the JWT as a JWS using the <code>PS256</code>
        algorithm and your private signing key.
      </EdProse>

      <EdCodeGroup :tabs="buildAssertionTabs" />

      <EdProse>
        Send the resulting string in the <code>client_assertion</code> form parameter alongside
        <code>client_assertion_type</code> when calling <code>/par</code> or <code>/token</code>:
      </EdProse>

      <EdCode :code="wireExample" lang="plaintext" filename="application/x-www-form-urlencoded body" />

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/message-signing">Message Signing (JWS)</a> for the
        underlying signing helper and additional context on how the signature is produced.
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

<route lang="yaml">
meta:
  title: Receiving Event Notifications
</route>

<script setup lang="ts">
const readKidTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `function getJweKid(jweString: string): string {
  const [headerB64] = jweString.split('.')
  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString())
  return header.kid
}

const kid = getJweKid(jweString)
const privateKey = myKeyStore.getPrivateKey(kid)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64, json

def get_jwe_kid(jwe_string: str) -> str:
    header_b64 = jwe_string.split(".")[0]
    return json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]

kid = get_jwe_kid(jwe_string)
private_key = my_key_store.get_private_key(kid)`,
  },
] as const

const decryptTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { compactDecrypt, importPKCS8 } from 'jose'

const privateKeyPem = myKeyStore.getPrivateKeyPem(kid)
const privateKey = await importPKCS8(privateKeyPem, 'RSA-OAEP-256')

const { plaintext } = await compactDecrypt(jweString, privateKey)
const jwsString = new TextDecoder().decode(plaintext)`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `from jwcrypto import jwe as jwecrypto

token = jwecrypto.JWE()
token.deserialize(jwe_string, key=private_key)
jws_string = token.payload.decode()`,
  },
] as const

const verifyTabs = [
  {
    label: 'Node.js (jose)',
    lang: 'typescript',
    code: `import { createLocalJWKSet, jwtVerify } from 'jose'

// Fetch Hub JWKS from the Hub's .well-known/openid-configuration
const hubJwks = createLocalJWKSet(await fetchHubJwks())

const { payload } = await jwtVerify(jwsString, hubJwks, {
  issuer:   expectedLfiIssuer,   // see security checks below
  audience: process.env.CLIENT_ID,
})

return payload.message`,
  },
  {
    label: 'Python (jwcrypto)',
    lang: 'python',
    code: `import json
from jwcrypto import jwt

hub_key = fetch_hub_public_key()
verified = jwt.JWT(key=hub_key, jwt=jws_string)
claims = json.loads(verified.claims)

# Perform claim validation manually — see security checks below
return claims["message"]`,
  },
] as const

const fullExampleTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { compactDecrypt, createLocalJWKSet, importPKCS8, jwtVerify } from 'jose'

async function processWebhookEvent(jweString: string) {
  // 1. Read kid from the JWE protected header and select the right private key
  const kid = getJweKid(jweString)
  const privateKey = await importPKCS8(
    myKeyStore.getPrivateKeyPem(kid),
    'RSA-OAEP-256',
  )

  // 2. Decrypt the JWE → inner JWS string
  const { plaintext } = await compactDecrypt(jweString, privateKey)
  const jwsString = new TextDecoder().decode(plaintext)

  // 3. Peek at the unverified payload to find which consent this event is about
  const [, payloadB64] = jwsString.split('.')
  const unverified = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())
  const consentId = unverified?.message?.Meta?.ConsentId

  // 4. Look up the expected LFI issuer from your consent store
  const expectedIssuer = myConsentStore.getIssuer(consentId)
  if (!expectedIssuer) throw new Error(\`Unknown consentId: \${consentId}\`)

  // 5. Verify signature and standard claims (iss, aud, exp, nbf)
  const hubJwks = createLocalJWKSet(await fetchHubJwks())
  const { payload } = await jwtVerify(jwsString, hubJwks, {
    issuer:   expectedIssuer,
    audience: process.env.CLIENT_ID,
  })

  // 6. Replay check
  if (payload.jti && seenJtis.has(payload.jti)) {
    throw new Error(\`Replayed event jti: \${payload.jti}\`)
  }
  if (payload.jti) seenJtis.add(payload.jti)

  return payload.message
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64
import json
from jwcrypto import jwe as jwecrypto, jwt

def process_webhook_event(jwe_string: str):
    # 1. Read kid from the JWE protected header and select the right private key
    header_b64 = jwe_string.split(".")[0]
    kid = json.loads(base64.urlsafe_b64decode(header_b64 + "=="))["kid"]
    private_key = my_key_store.get_private_key(kid)

    # 2. Decrypt the JWE → inner JWS string
    token = jwecrypto.JWE()
    token.deserialize(jwe_string, key=private_key)
    jws_string = token.payload.decode()

    # 3. Peek at the unverified payload to find which consent this event is about
    payload_b64 = jws_string.split(".")[1]
    unverified = json.loads(base64.urlsafe_b64decode(payload_b64 + "=="))
    consent_id = unverified.get("message", {}).get("Meta", {}).get("ConsentId")

    # 4. Look up the expected LFI issuer from your consent store
    expected_issuer = my_consent_store.get_issuer(consent_id)
    if not expected_issuer:
        raise ValueError(f"Unknown consentId: {consent_id}")

    # 5. Verify signature and standard claims
    hub_key = fetch_hub_public_key()
    verified = jwt.JWT(
        key=hub_key,
        jwt=jws_string,
        check_claims={
            "iss": expected_issuer,
            "aud": os.environ["CLIENT_ID"],
            "exp": None,
            "nbf": None,
        },
    )
    claims = json.loads(verified.claims)

    # 6. Replay check
    jti = claims.get("jti")
    if jti and jti in seen_jtis:
        raise ValueError(f"Replayed event jti: {jti}")
    if jti:
        seen_jtis.add(jti)

    return claims["message"]`,
  },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · FAPI · Webhooks
        </div>
        <h1 class="ed-doc__title">
          Receiving Event Notifications
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When the API Hub delivers a webhook event (such as a Payment Status or Consent Status change), it
          POSTs a <strong>JWE compact serialisation</strong> to your registered webhook URL. The JWE is
          encrypted with your public <strong>Encryption Certificate</strong>, and the decrypted payload is a
          signed JWT (JWS) containing the event.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          This page covers how to correctly decrypt, verify, and validate the event in line with the FAPI 2.0
          Security Profile.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="step-1"
      num="01"
      color="var(--at-teal)"
      eyebrow="Step 1"
      title="Read the kid and select the right key"
      tone="cream"
    >
      <EdProse>
        The JWE protected header identifies which of your registered encryption keys was used via the
        <code>kid</code> claim. Decode the first segment to read it before attempting decryption:
      </EdProse>

      <EdCodeGroup :tabs="readKidTabs" />

      <EdNote type="tip" title="Multiple encryption keys">
        <p>
          Keep retired private keys available until you are confident no in-flight events were encrypted
          with them &mdash; the <code>kid</code> tells you exactly which key to use.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-2"
      num="02"
      color="var(--at-gold)"
      eyebrow="Step 2"
      title="Decrypt the JWE"
      tone="surface"
    >
      <EdProse>
        Decrypt the JWE using the private key selected above. The result is the inner JWS:
      </EdProse>

      <EdCodeGroup :tabs="decryptTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="step-3"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 3"
      title="Verify the JWS signature and validate claims"
      tone="cream"
    >
      <EdProse>
        The inner JWS is signed by the API Hub. Verify the signature using the Hub's public JWKS, then
        validate the JWT claims.
      </EdProse>

      <EdCodeGroup :tabs="verifyTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="security-checks"
      num="04"
      color="var(--at-navy)"
      eyebrow="Security Checks"
      title="FAPI-required claim validation before processing"
      tone="surface"
    >
      <EdProse>
        After decrypting and verifying the signature, validate the following claims before processing the
        event. These checks are required by the FAPI 2.0 Security Profile.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Check</th>
              <th>Claim</th>
              <th>What to verify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Issuer</td>
              <td><code>iss</code></td>
              <td>Must match the issuer of the LFI that owns the consent &mdash; cross-reference with the <code>ConsentId</code> in <code>Meta</code>. Reject events where <code>iss</code> does not match the expected LFI to prevent an event from one LFI being replayed against a consent held at another.</td>
            </tr>
            <tr>
              <td>Audience</td>
              <td><code>aud</code></td>
              <td>Must contain your application's <code>client_id</code>. Reject events addressed to a different client.</td>
            </tr>
            <tr>
              <td>Expiry</td>
              <td><code>exp</code></td>
              <td>Must be in the future. Reject expired tokens.</td>
            </tr>
            <tr>
              <td>Not Before</td>
              <td><code>nbf</code></td>
              <td>If present, must not be in the future.</td>
            </tr>
            <tr>
              <td>Replay</td>
              <td><code>jti</code></td>
              <td>If present, record the value and reject any future event with the same <code>jti</code>. This prevents a delivered event from being replayed.</td>
            </tr>
            <tr>
              <td>Consent match</td>
              <td><code>Meta.ConsentId</code></td>
              <td>Must correspond to a consent your application created. Discard events for unknown consent IDs.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Issuer validation is critical">
        <p>
          Always verify that <code>iss</code> corresponds to the LFI tied to the consent in
          <code>Meta.ConsentId</code>. Without this check, a malicious actor could craft or replay an event
          from a different LFI to influence your application's view of a consent it holds elsewhere.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="full-example"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Full Example"
      title="End-to-end webhook handler with FAPI checks"
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

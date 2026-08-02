<route lang="yaml">
meta:
  title: Verifying the TPP JWS Signature
</route>

<script setup lang="ts">
const jwksUriPlain = `https://keystore.directory.openfinance.ae/[software-statement-id]/application.jwks
`

const verifyNode = `import { createRemoteJWKSet, jwtVerify } from 'jose'

async function verifyTPPSignature(
  jwsString: string,
  softwareStatementId: string
): Promise<Record<string, unknown>> {
  // 1. Build a JWKS resolver for the TPP's published keys
  const jwksUri = \`https://keystore.directory.openfinance.ae/\${softwareStatementId}/application.jwks\`
  const jwks = createRemoteJWKSet(new URL(jwksUri))

  // 2. Verify the signature and validate standard claims
  const { payload } = await jwtVerify(jwsString, jwks)

  return payload
}
`

const verifyPython = `import json
import requests
from jwcrypto import jwt, jwk

def verify_tpp_signature(jws_string: str, software_statement_id: str) -> dict:
    # 1. Fetch the TPP's published keys
    jwks_uri = f"https://keystore.directory.openfinance.ae/{software_statement_id}/application.jwks"
    response = requests.get(jwks_uri)
    keyset = jwk.JWKSet.from_json(response.text)

    # 2. Verify the signature
    verified = jwt.JWT(key=keyset, jwt=jws_string)
    return json.loads(verified.claims)
`

const verifyTabs = [{ label: 'Node.js (jose)', lang: 'typescript', code: verifyNode }, { label: 'Python (jwcrypto)', lang: 'python', code: verifyPython }] as const
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
          Verifying the TPP JWS Signature
          <span class="ed-doc__read">2 min read</span>
        </h1>

        <EdNote type="info" title="This step is optional">
          <p>
            The <code>PersonalIdentifiableInformation</code> field is embedded within a request that
            the API Hub has already verified was signed by the TPP. The outer JWS signature confirms
            that the PII was submitted by the authenticated TPP and has not been modified in transit.
          </p>
          <p>
            Verifying the inner JWS signature on the PII payload is therefore <strong>not
            required</strong>, but LFIs may choose to implement it as a defence-in-depth measure.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="when-to-consider"
      num="01"
      color="var(--at-teal)"
      eyebrow="When to consider this"
      title="Reasons to verify the inner JWS"
      tone="cream"
    >
      <EdProse>You may want to verify the TPP's JWS signature on the PII if:</EdProse>
      <EdBullets>
        <li>Your security policy requires independent verification of all signed payloads, regardless of upstream validation.</li>
        <li>You want to confirm the specific TPP identity that constructed the PII (available in the <code>iss</code> and <code>sub</code> claims).</li>
        <li>You are building an audit trail that requires cryptographic proof tied to the TPP's signing key.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="how-to-verify"
      num="02"
      color="var(--at-gold)"
      eyebrow="How to verify"
      title="Resolve the JWKS, verify the signature"
      tone="surface"
    >
      <EdProse>
        The inner JWS (the result of decrypting the JWE) is signed by the TPP using their signing
        key. The JWS header contains the <code>kid</code> of the TPP's signing key, and the
        <code>iss</code> / <code>sub</code> claims identify the TPP's <code>client_id</code>.
      </EdProse>

      <h3 class="ed-doc__subhead">Step 1 &mdash; Discover the TPP's JWKS</h3>
      <EdProse>
        The TPP's public signing keys are published through the Trust Framework directory. You can
        resolve the TPP's JWKS URI using the <code>o3-caller-software-statement-id</code> header
        from the inbound request:
      </EdProse>
      <EdCode :code="jwksUriPlain" lang="text" filename="JWKS URI" />

      <h3 class="ed-doc__subhead">Step 2 &mdash; Verify the JWS</h3>
      <EdCodeGroup :tabs="verifyTabs" />

      <h3 class="ed-doc__subhead">Claims to validate</h3>
      <EdProse>If you verify the JWS, you SHOULD also validate the following claims:</EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Claim</th><th>Validation</th></tr>
          </thead>
          <tbody>
            <tr><td><code>iss</code></td><td>Must match the TPP's <code>client_id</code> (available in the <code>o3-caller-client-id</code> request header)</td></tr>
            <tr><td><code>sub</code></td><td>Must match the TPP's <code>client_id</code></td></tr>
            <tr><td><code>aud</code></td><td>Must contain your LFI's issuer identifier</td></tr>
            <tr><td><code>exp</code></td><td>Must not be expired</td></tr>
            <tr><td><code>iat</code></td><td>Must be in the past</td></tr>
            <tr><td><code>jti</code></td><td>Record for replay detection if required by your security policy</td></tr>
          </tbody>
        </table>
      </EdRefTable>
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
  margin: 0 0 1.5rem;
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>

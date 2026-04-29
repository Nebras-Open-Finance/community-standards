<route lang="yaml">
meta:
  title: "O3 Sandbox Utilities — Signing and Encryption Helpers"
  description: "What the O3 Util endpoints are, why they exist, and how to use them in Postman to test message signing, PII encryption, and client assertions without writing your own cryptographic code."
  category: Integration
  readTime: "6 min"
  updated: "2026-04-21"
  tags:
    - Sandbox
    - Tooling
    - JWT
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'problems',  label: 'Problems' },
  { id: 'env',       label: 'Env vars' },
  { id: 'pii',       label: 'Encrypted PII' },
  { id: 'par-jwt',   label: 'PAR JWT' },
  { id: 'token-jwt', label: 'Token JWT' },
  { id: 'order',     label: 'Run order' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Integration' },
  { label: 'Read',     value: '6 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['Sandbox', 'Tooling', 'JWT']

const stripNewlines = `awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' signing.key`

const piiBody = `{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}",
        "Initiation": {
            "Creditor": [
                {
                    "CreditorAgent": {
                        "SchemeName": "BICFI",
                        "Identification": "10000109010101",
                        "Name": "Mario International",
                        "PostalAddress": [{ "AddressType": "Business", "Country": "AE" }]
                    },
                    "Creditor": { "Name": "Mario International" },
                    "CreditorAccount": {
                        "SchemeName": "AccountNumber",
                        "Identification": "10000109010101",
                        "Name": { "en": "Mario International" }
                    }
                }
            ]
        },
        "Risk": {
            "DebtorIndicators": { "UserName": { "en": "Mohammed Al Rashidi" } },
            "CreditorIndicators": {
                "AccountType": "Retail",
                "IsCreditorConfirmed": true,
                "IsCreditorPrePopulated": true,
                "TradingName": "Mario International"
            }
        }
    },
    "signingKeyPEM": "{{pem-local}}",
    "jwksUrl": "{{jwksUrl}}"
}`

const piiTest = `pm.environment.set('encryptedPII', responseBody)`

const parBody = `{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}"
    },
    "signingKeyPEM": "{{pem-local}}"
}`

const parPre = `pm.environment.set('exp', Date.now() / 1000 + 300)
pm.environment.set('nbf', Date.now() / 1000 - 10)`

const parTest = `pm.environment.set('private_key_jwt', responseBody)`

const tokenBody = `{
    "header": { "alg": "PS256", "kid": "{{kid-local}}" },
    "body": {
        "aud": "https://auth1.altareq1.sandbox.apihub.openfinance.ae",
        "exp": "{{exp}}",
        "iss": "{{_clientId}}",
        "sub": "{{_clientId}}",
        "jti": "{{$guid}}",
        "iat": "{{nbf}}"
    },
    "signingKeyPEM": "{{pem-local}}"
}`

const runOrder = `1.  O3 Util: Prepare Encrypted PII              → saves {{encryptedPII}}
2.  O3 Util: Prepare private key JWT for PAR    → saves {{private_key_jwt}}  (client assertion)
3.  O3 Util: Prepare request object JWT for PAR → saves {{requestObject}}     (signed request object)
4.  POST /par                                    → uses {{requestObject}} + {{private_key_jwt}}
5.  Redirect user to bank → receive auth code
6.  O3 Util: Prepare private key JWT            → saves fresh {{private_key_jwt}}
7.  POST /token                                 → exchange auth code for tokens`

// Literal Postman variable references — defined as strings here so the
// template renders them via standard interpolation. Inlining the literal
// `{{...}}` inside a Vue template would re-trigger the parser's mustache
// lexer.
const PM_ENCRYPTED_PII   = '{{encryptedPII}}'
const PM_PRIVATE_KEY_JWT = '{{private_key_jwt}}'
const PM_GUID            = '{{$guid}}'
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="O3 Sandbox Utilities — Signing and Encryption Helpers"
      :meta="meta"
      lede="The sandbox exposes a small set of <strong>O3 Utility endpoints</strong> that perform JWT signing and PII encryption on your behalf. Supply your private key (and a JWKS URL for encryption) in the request body, and the utility returns the finished token. Lets you verify your key material and payload structure at each stage of the flow &mdash; independently of your application code."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdNote type="danger" title="Sandbox only — never use in production">
      <p>These endpoints accept raw private key material. They exist <strong>exclusively in the sandbox</strong> environment and are <strong>not available in production</strong>. Never send a production private key to any external service.</p>
    </EdNote>

    <EdSectionBand
      id="problems"
      num="01"
      color="var(--at-teal)"
      eyebrow="What problems do they solve?"
      title="Isolating each cryptographic step"
      tone="cream"
    >
      <EdProse>Setting up JWT signing and JWE encryption from scratch involves several independent components &mdash; certificate loading, algorithm selection, claim assembly, PKCE generation, and JWKS discovery. A mistake in any one of these produces a cryptic rejection at <code>/par</code> or <code>/token</code> with little indication of which step failed.</EdProse>
      <EdProse>The O3 Utils let you isolate and validate each component individually before wiring them together:</EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>If you're unsure whether&hellip;</th><th>Use&hellip;</th></tr></thead>
          <tbody>
            <tr><td>Your private key and <code>kid</code> are correctly configured</td><td><strong>Prepare private key JWT</strong></td></tr>
            <tr><td>Your client assertion claims are correct</td><td><strong>Prepare private key JWT for PAR end-point</strong></td></tr>
            <tr><td>Your PII payload structure and encryption key are working</td><td><strong>Prepare Encrypted PII</strong></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="env"
      num="02"
      color="var(--at-gold)"
      eyebrow="Postman environment"
      title="Required variables"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Variable</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>kid-local</code></td><td>The <code>kid</code> of your signing certificate from the Trust Framework</td></tr>
            <tr><td><code>pem-local</code></td><td>Your signing private key in PEM format, with <code>\n</code> replacing literal newlines</td></tr>
            <tr><td><code>_clientId</code></td><td>Your application's <code>client_id</code> from the Trust Framework</td></tr>
            <tr><td><code>jwksUrl</code></td><td>The LFI's JWKS URI &mdash; required for encryption only</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Stripping newlines from a PEM key">
        <p>Postman environment variables cannot contain literal newlines. Convert your key with:</p>
      </EdNote>
      <EdCode :code="stripNewlines" lang="bash" />
    </EdSectionBand>

    <EdSectionBand
      id="pii"
      num="03"
      color="var(--at-blue)"
      eyebrow="Prepare Encrypted PII"
      title="GET /o3/v1.0/message-encryption"
      tone="cream"
    >
      <EdProse><strong>Saves to:</strong> <code>{{ PM_ENCRYPTED_PII }}</code></EdProse>
      <EdProse>Takes a structured payload containing creditor and risk data, signs it with your private key, then encrypts it using the LFI's public encryption key (fetched from <code>jwksUrl</code>). The result is a Nested JWT (JWS wrapped in JWE) ready to drop straight into <code>PersonalIdentifiableInformation</code> inside <code>authorization_details</code>.</EdProse>

      <h3>Request body</h3>
      <EdCode :code="piiBody" lang="json" />

      <h3>Test script</h3>
      <EdCode :code="piiTest" lang="javascript" />

      <EdProse>See <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a> for how to produce this token in your own code.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="par-jwt"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="PAR client assertion"
      title="GET /o3/v1.0/message-signature (PAR variant)"
      tone="surface"
    >
      <EdProse><strong>Saves to:</strong> <code>{{ PM_PRIVATE_KEY_JWT }}</code></EdProse>
      <EdProse>Produces a <strong>client assertion JWT</strong> for authenticating at <code>/par</code>. The assertion contains your <code>client_id</code> as both <code>iss</code> and <code>sub</code>, a short <code>exp</code>, and a unique <code>jti</code>. The Authorization Server verifies it using your public key from the Trust Framework JWKS.</EdProse>
      <EdProse>Use this as the <code>client_assertion</code> parameter when calling <code>/par</code>.</EdProse>

      <h3>Request body</h3>
      <EdCode :code="parBody" lang="json" />

      <h3>Pre-request script</h3>
      <EdCode :code="parPre" lang="javascript" />

      <h3>Test script</h3>
      <EdCode :code="parTest" lang="javascript" />

      <EdProse>See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the full claim set.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="token-jwt"
      num="05"
      color="var(--at-navy)"
      eyebrow="Token client assertion"
      title="GET /o3/v1.0/message-signature (/token variant)"
      tone="cream"
    >
      <EdProse><strong>Saves to:</strong> <code>{{ PM_PRIVATE_KEY_JWT }}</code></EdProse>
      <EdProse>Identical request body and output to the PAR variant above. Use this to generate a <strong>fresh client assertion for <code>/token</code></strong> &mdash; for example when exchanging an authorization code for tokens or refreshing an access token.</EdProse>
      <EdProse>A new assertion with a unique <code>jti</code> must be generated for every request. The Authorization Server tracks seen <code>jti</code> values and will reject replayed assertions.</EdProse>

      <EdCode :code="tokenBody" lang="json" />

      <EdProse>Postman's <code>{{ PM_GUID }}</code> generates a new UUID on every request, so replays are avoided automatically.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="order"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Recommended run order"
      title="A complete service initiation flow"
      tone="surface"
    >
      <EdCode :code="runOrder" lang="text" filename="Postman run order" />
    </EdSectionBand>

    <EdRelatedCards eyebrow="Further reading" title="Related references">
      <EdRelatedCard
        href="/tech/tpp-standards/security/fapi/o3-utils"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="O3 Sandbox Utilities — full reference"
        desc="Complete request bodies, scripts, and flow diagrams for all four utility endpoints."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/security/fapi/message-signing"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="Message Signing (JWS)"
        desc="How to sign JWTs in your own code."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/security/fapi/message-encryption"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="Message Encryption (JWE)"
        desc="How to produce encrypted PII in your own code."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/security/tokens/client-assertion"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="Client Assertion"
        desc="Claim structure and signing requirements."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue-deep) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>

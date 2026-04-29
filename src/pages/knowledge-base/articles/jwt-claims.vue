<route lang="yaml">
meta:
  title: "JWT Claim Rules — Request Object and Client Assertion"
  description: "Per-claim reference for both JWTs sent to /par and /token: aud, jti, lifetime windows, sub rules, and the most common rejection causes."
  category: Security
  readTime: "12 min"
  updated: "2026-04-21"
  tags:
    - JWT
    - FAPI
    - PAR
</route>

<script setup lang="ts">
// Phase 5 — JWT Claim Rules article. Ported from
// `docs/components/WebPages/KbJwtClaimsArticle.vue`. Heaviest code-block
// load of the KB; smoke-tested for SSG hydration mismatches.

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'two-jwts',   label: 'Two JWTs' },
  { id: 'jose',       label: 'JOSE header' },
  { id: 'request',    label: 'Request Object' },
  { id: 'assertion',  label: 'Client Assertion' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'rejections', label: 'Rejections' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Security' },
  { label: 'Read',     value: '12 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['JWT', 'FAPI', 'PAR']

const joseHeader = `{
  "alg": "PS256",
  "kid": "<your-signing-key-id>"
}`

const audExamples = `✅  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae"
❌  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/token"
❌  aud: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/par"`

const subExamples = `✅  iss: "a1b2c3d4-...", sub: "a1b2c3d4-..."   (same client_id)
❌  iss: "a1b2c3d4-...", sub: ""               (empty)
❌  sub omitted entirely`

const jtiExamples = `✅  jti: crypto.randomUUID()    ← fresh UUID every time
❌  jti: "fixed-string"         ← rejected on second use
❌  jti omitted`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="JWT Claim Rules — Request Object and Client Assertion"
      :meta="meta"
      lede="UAE Open Finance requires <strong>two distinct signed JWTs</strong> in every authorization flow. Their claim rules differ in ways that are easy to confuse. This page is the single authoritative reference for both."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="two-jwts"
      num="01"
      color="var(--at-teal)"
      eyebrow="Two JWTs"
      title="Same endpoint, two different JWTs"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>JWT</th>
              <th>Sent to</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Request Object</strong> (JAR)</td>
              <td><code>/par</code> as <code>request=</code></td>
              <td>Carries all authorization parameters in a tamper-proof, signed envelope</td>
            </tr>
            <tr>
              <td><strong>Client Assertion</strong></td>
              <td><code>/par</code> and <code>/token</code> as <code>client_assertion=</code></td>
              <td>Proves your application's identity to the Authorization Server &mdash; replaces a client secret</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Same endpoint, two different JWTs">
        <p>
          Both JWTs are sent to <code>/par</code> in the same request, but they serve entirely separate
          purposes. Mixing up their claim rules &mdash; particularly <code>jti</code> and <code>sub</code>
          &mdash; is the most common source of <code>400 Bad Request</code> errors.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="jose"
      num="02"
      color="var(--at-gold)"
      eyebrow="JOSE Header"
      title="The header is identical for both JWTs"
      tone="surface"
    >
      <EdCode :code="joseHeader" lang="json" filename="JOSE header" />

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Rule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>alg</code></td>
              <td><strong>Must be <code>PS256</code></strong> &mdash; the only algorithm accepted in the UAE Open Finance FAPI profile</td>
            </tr>
            <tr>
              <td><code>kid</code></td>
              <td>The thumbprint of your signing certificate, as registered in the Trust Framework. The Authorization Server uses this to fetch your public key and verify the signature</td>
            </tr>
            <tr>
              <td><code>typ</code></td>
              <td>Optional. Not required by the profile</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="danger" title="No algorithm flexibility">
        <p>
          ES256, RS256, and HS256 are not accepted. Any JWT signed with a non-PS256 algorithm will be
          rejected.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="request"
      num="03"
      color="var(--at-blue)"
      eyebrow="Request Object (JAR)"
      title="Claims for the request= JWT"
      lede="The Request Object is a signed JWT whose payload contains all <code>/par</code> authorization parameters. It is sent as the <code>request</code> form parameter."
      tone="cream"
    >
      <h3>Claims</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Type</th>
              <th>Required</th>
              <th>Rule</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>aud</code></td>
              <td>string</td>
              <td>✓</td>
              <td><strong>The Authorization Server's <code>issuer</code> value</strong> &mdash; from the LFI's <code>.well-known/openid-configuration</code>. This is not the token endpoint URL.</td>
              <td><code>https://auth1.altareq1.sandbox.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><code>iss</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Your application's <code>client_id</code> from the Trust Framework</td>
              <td><code>a1b2c3d4-5678-...</code></td>
            </tr>
            <tr>
              <td><code>client_id</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Same value as <code>iss</code></td>
              <td><code>a1b2c3d4-5678-...</code></td>
            </tr>
            <tr>
              <td><code>iat</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Issued At Unix timestamp &mdash; when the JWT was created</td>
              <td><code>1713196113</code></td>
            </tr>
            <tr>
              <td><code>exp</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Unix timestamp. Must be <strong>no more than 10 minutes after <code>nbf</code></strong>. Recommended: <code>nbf + 300</code> (5 minutes)</td>
              <td><code>1713196423</code></td>
            </tr>
            <tr>
              <td><code>nbf</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Unix timestamp. Must be <strong>no more than 10 minutes in the past</strong> at the time the AS processes the request. Recommended: <code>iat - 10</code></td>
              <td><code>1713196103</code></td>
            </tr>
            <tr>
              <td><code>response_type</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Must be <code>code</code></td>
              <td><code>code</code></td>
            </tr>
            <tr>
              <td><code>scope</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Space-separated OAuth 2.0 scopes &mdash; see <a href="/tech/tpp-standards/security/fapi/scopes">Scopes</a></td>
              <td><code>payments openid</code></td>
            </tr>
            <tr>
              <td><code>redirect_uri</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Must exactly match a URI registered in the Trust Framework</td>
              <td><code>https://yourapp.com/callback</code></td>
            </tr>
            <tr>
              <td><code>nonce</code></td>
              <td>string</td>
              <td>✓</td>
              <td>A fresh UUID for every request. Bound to the ID token &mdash; prevents ID token replay</td>
              <td><code>f47ac10b-58cc-...</code></td>
            </tr>
            <tr>
              <td><code>state</code></td>
              <td>string</td>
              <td>✓</td>
              <td>A fresh UUID for every request. Returned in the redirect &mdash; prevents CSRF</td>
              <td><code>e5f6g7h8-...</code></td>
            </tr>
            <tr>
              <td><code>code_challenge</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Base64url-encoded SHA-256 hash of your <code>code_verifier</code> (PKCE)</td>
              <td><code>E9Melhoa2Ow...</code></td>
            </tr>
            <tr>
              <td><code>code_challenge_method</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Must be <code>S256</code> &mdash; only PKCE method supported</td>
              <td><code>S256</code></td>
            </tr>
            <tr>
              <td><code>authorization_details</code></td>
              <td>array</td>
              <td>✓</td>
              <td>RAR object describing the consent &mdash; see <a href="/tech/tpp-standards/v2.1/consent/api-guide">Consent API Guide</a></td>
              <td><code>[{...}]</code></td>
            </tr>
            <tr>
              <td><code>max_age</code></td>
              <td>number</td>
              <td></td>
              <td>Maximum authentication age in seconds. Capped at <code>3600</code></td>
              <td><code>3600</code></td>
            </tr>
            <tr>
              <td><code>jti</code></td>
              <td>string</td>
              <td></td>
              <td>Not required in the Request Object. Use <code>nonce</code> for replay prevention instead</td>
              <td>&mdash;</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3><code>aud</code> &mdash; issuer, not token endpoint</h3>
      <EdProse>The <code>aud</code> claim must be the Authorization Server's <strong>issuer identifier</strong>, not the token endpoint URL.</EdProse>
      <EdCode :code="audExamples" lang="text" />
      <EdProse>
        Find the correct value from the LFI's <code>.well-known/openid-configuration</code> under
        the <code>issuer</code> key.
      </EdProse>

      <h3>Lifetime window</h3>
      <EdLifetime
        from="nbf"
        to="exp"
        duration="max 10 minutes"
        recommended="recommended 5 minutes"
        color="var(--at-blue)"
      />
      <EdProse>The Authorization Server checks that:</EdProse>
      <EdBullets>
        <li><code>nbf</code> is no more than <strong>10 minutes in the past</strong></li>
        <li><code>exp</code> is no more than <strong>10 minutes after <code>nbf</code></strong></li>
        <li>The current time falls between <code>nbf</code> and <code>exp</code></li>
      </EdBullets>
      <EdProse>
        Clock skew between your server and the Authorization Server can cause rejections. Always set
        <code>nbf</code> slightly in the past (<code>iat - 10</code>) to absorb up to 10 seconds of drift.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="assertion"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Client Assertion"
      title="Claims for the client_assertion= JWT"
      lede="The Client Assertion proves your application's identity to the Authorization Server. It is sent as <code>client_assertion</code> with <code>client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>."
      tone="surface"
    >
      <EdNote type="important" title="Fresh per request">
        <p>
          The Client Assertion must be sent to <strong>both <code>/par</code> and
          <code>/token</code></strong>. A <strong>fresh assertion with a new <code>jti</code> must be
          generated for every request</strong> &mdash; the same assertion cannot be reused.
        </p>
      </EdNote>

      <h3>Claims</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Type</th>
              <th>Required</th>
              <th>Rule</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>aud</code></td>
              <td>string</td>
              <td>✓</td>
              <td><strong>The Authorization Server's <code>issuer</code> value</strong> &mdash; same source as the Request Object <code>aud</code>. Not the token endpoint URL</td>
              <td><code>https://auth1.altareq1.sandbox.apihub.openfinance.ae</code></td>
            </tr>
            <tr>
              <td><code>iss</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Your application's <code>client_id</code></td>
              <td><code>a1b2c3d4-5678-...</code></td>
            </tr>
            <tr>
              <td><code>sub</code></td>
              <td>string</td>
              <td>✓</td>
              <td>Your application's <code>client_id</code> &mdash; <strong>must equal <code>iss</code></strong></td>
              <td><code>a1b2c3d4-5678-...</code></td>
            </tr>
            <tr>
              <td><code>iat</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Unix timestamp of issuance</td>
              <td><code>1713196113</code></td>
            </tr>
            <tr>
              <td><code>exp</code></td>
              <td>number</td>
              <td>✓</td>
              <td>Unix timestamp. Keep short-lived &mdash; <strong>maximum 5 minutes</strong> after <code>iat</code>. Recommended: <code>iat + 300</code></td>
              <td><code>1713196413</code></td>
            </tr>
            <tr>
              <td><code>jti</code></td>
              <td>string</td>
              <td>✓</td>
              <td>A unique identifier (UUID) for <strong>this specific assertion</strong>. The Authorization Server records seen <code>jti</code> values and will reject any reuse. Generate a fresh UUID for every request</td>
              <td><code>c770aef3-6784-...</code></td>
            </tr>
            <tr>
              <td><code>nbf</code></td>
              <td>number</td>
              <td></td>
              <td>Not Before. If provided, set to <code>iat - 10</code> to absorb clock skew</td>
              <td><code>1713196103</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3><code>sub</code> must equal <code>iss</code></h3>
      <EdCode :code="subExamples" lang="text" />

      <h3><code>jti</code> replay prevention</h3>
      <EdProse>
        The <code>jti</code> must be a UUID that has never been used before with this Authorization
        Server. Reusing a <code>jti</code> &mdash; even from seconds earlier &mdash; will result in a
        <code>400</code> or <code>401</code> rejection.
      </EdProse>
      <EdCode :code="jtiExamples" lang="text" />

      <h3>Lifetime window</h3>
      <EdLifetime
        from="iat"
        to="exp"
        duration="max 5 minutes"
        color="var(--at-blue-deep)"
      />
      <EdProse>
        Unlike the Request Object, there is no <code>nbf</code> requirement for the Client Assertion,
        but keeping <code>exp</code> short-lived (5 minutes maximum) limits exposure if intercepted.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="comparison"
      num="05"
      color="var(--at-navy)"
      eyebrow="Side-by-side comparison"
      title="The differences at a glance"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Request Object</th>
              <th>Client Assertion</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>aud</code></td><td>AS issuer URL</td><td>AS issuer URL</td></tr>
            <tr><td><code>iss</code></td><td><code>client_id</code></td><td><code>client_id</code></td></tr>
            <tr><td><code>sub</code></td><td>Not used</td><td><code>client_id</code> (must equal <code>iss</code>)</td></tr>
            <tr><td><code>exp</code> max</td><td>10 min after <code>nbf</code></td><td>5 min after <code>iat</code></td></tr>
            <tr><td><code>nbf</code></td><td>Required</td><td>Optional (recommended)</td></tr>
            <tr><td><code>jti</code></td><td>Not required</td><td><strong>Required &mdash; must be unique per request</strong></td></tr>
            <tr><td><code>nonce</code></td><td>Required</td><td>Not used</td></tr>
            <tr><td><code>state</code></td><td>Required</td><td>Not used</td></tr>
            <tr><td><code>client_id</code></td><td>Required</td><td>Not used</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="rejections"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Common rejection causes"
      title="Most likely cause for each error"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Error</th>
              <th>Likely cause</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>aud</code> rejected</td><td><code>aud</code> set to token endpoint URL instead of issuer</td></tr>
            <tr><td><code>jti</code> already used</td><td>Client Assertion <code>jti</code> reused across requests</td></tr>
            <tr><td><code>sub</code> missing</td><td>Client Assertion sent without <code>sub</code> claim</td></tr>
            <tr><td>Token expired</td><td><code>exp</code> too short or clock skew &mdash; set <code>nbf</code> to <code>iat - 10</code></td></tr>
            <tr><td>Wrong algorithm</td><td>Non-PS256 algorithm used in JOSE header</td></tr>
            <tr><td><code>kid</code> not found</td><td>Signing certificate not yet registered or wrong <code>kid</code> value</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related pages" title="See also">
      <EdRelatedCard
        href="/tech/tpp-standards/security/fapi/message-signing"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="Message Signing"
        desc="How to sign a JWT with PS256."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/security/fapi/request-jwt"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="Request JWT"
        desc="Full code example for building the Request Object."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/security/tokens/client-assertion"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="Client Assertion"
        desc="Full code example for building the Client Assertion."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/trust-framework/api-discovery"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="API Discovery"
        desc="Where to find the issuer value."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

.ed-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.5rem;
}
.ed-tag {
  padding: 0.35rem 0.7rem;
  background: color-mix(in srgb, var(--at-blue) 12%, transparent);
  color: var(--at-blue-deep);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
}
</style>

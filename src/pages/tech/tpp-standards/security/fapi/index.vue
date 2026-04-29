<route lang="yaml">
meta:
  title: FAPI Security Profile
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · OAuth 2.0 · OpenID Connect
        </div>
        <h1 class="ed-doc__title">
          FAPI Security Profile
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          UAE Open Finance mandates the <strong>FAPI 2.0 Security Profile</strong>
          (<a href="https://openid.net/specs/fapi/2.0/fapi-2_0-security-profile-03.html">Financial-grade API</a>)
          as the security foundation for all API interactions. FAPI 2.0 is an extension of OAuth 2.0 and
          OpenID Connect designed specifically for high-value financial APIs, where the consequences of a
          security breach are significant.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="mechanisms"
      num="01"
      color="var(--at-teal)"
      eyebrow="Key Security Mechanisms"
      title="The four pillars of FAPI 2.0 in UAE Open Finance"
      tone="cream"
    >
      <h3>Pushed Authorization Requests (PAR)</h3>
      <EdProse>
        Rather than passing authorization parameters directly in a browser redirect URL (where they're
        visible and potentially manipulable), consent parameters are first sent server-to-server to the
        <code>/par</code> endpoint. The Authorization Server returns a short-lived <code>request_uri</code>
        which is the only thing passed in the browser redirect.
      </EdProse>
      <EdProse>
        This ensures authorization parameters are never exposed in browser history or server logs.
      </EdProse>

      <h3>Signed Request Objects (JAR)</h3>
      <EdProse>
        The body of the <code>/par</code> request must be a signed JWT &mdash; a
        <a href="/tech/tpp-standards/security/fapi/message-signing">JSON Web Signature (JWS)</a>.
        This is a cryptographically signed package of claims that proves:
      </EdProse>
      <EdBullets>
        <li><strong>Authenticity</strong> &mdash; the request genuinely came from your registered application</li>
        <li><strong>Integrity</strong> &mdash; no parameter was modified in transit</li>
      </EdBullets>
      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/request-jwt">Preparing the Request JWT</a> for the
        full structure.
      </EdProse>

      <h3>PKCE (Proof Key for Code Exchange)</h3>
      <EdProse>
        Every authorization request includes a <code>code_challenge</code> derived from a secret
        <code>code_verifier</code>. When the authorization code is later exchanged for tokens, the
        <code>code_verifier</code> must be provided. This prevents authorization code interception attacks.
      </EdProse>
      <EdProse>
        The only supported method is <code>S256</code> (SHA-256 hash of the verifier).
      </EdProse>

      <h3>mTLS (Mutual TLS)</h3>
      <EdProse>
        All API requests use <strong>mutual TLS</strong> &mdash; both client and server present certificates
        during the TLS handshake. Your application must present its <strong>transport certificate</strong>
        (issued by the Trust Framework) to authenticate at the network level.
      </EdProse>
      <EdProse>
        This ensures that even a stolen access token cannot be used without the corresponding private key.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="crypto"
      num="02"
      color="var(--at-gold)"
      eyebrow="Cryptographic Requirements"
      title="Algorithms and key sizes mandated by the profile"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Requirement</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Signing algorithm</td>
              <td><code>PS256</code> (RSA-PSS with SHA-256)</td>
            </tr>
            <tr>
              <td>Minimum RSA key size</td>
              <td>2048 bits</td>
            </tr>
            <tr>
              <td>Token endpoint auth method</td>
              <td><code>private_key_jwt</code></td>
            </tr>
            <tr>
              <td>Request object signing</td>
              <td>Required for <code>/par</code></td>
            </tr>
            <tr>
              <td>Encryption</td>
              <td>Optional (see <a href="/tech/tpp-standards/security/fapi/message-encryption">Message Encryption</a>)</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Section contents
          </div>
          <h2 class="ed-doc__contents-title">Browse this section</h2>
          <p class="ed-doc__contents-sub">The full set of pages covering the FAPI 2.0 Security Profile in UAE Open Finance.</p>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="/tech/tpp-standards/security/fapi/request-jwt" :style="{ '--card-color': 'var(--at-teal)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Page</span></div>
            <h3 class="ed-link-card__title">Preparing the Request JWT</h3>
            <p class="ed-link-card__desc">Full structure of the signed JWT sent to <code>/par</code>.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/security/fapi/message-signing" :style="{ '--card-color': 'var(--at-gold, #b08800)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Page</span></div>
            <h3 class="ed-link-card__title">Message Signing</h3>
            <p class="ed-link-card__desc">How to sign JWTs using PS256 &mdash; used for request objects and client assertions.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/security/fapi/message-encryption" :style="{ '--card-color': 'var(--at-navy)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Page</span></div>
            <h3 class="ed-link-card__title">Message Encryption</h3>
            <p class="ed-link-card__desc">How to encrypt a request object using the LFI's public key.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/security/fapi/receiving-events" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Page</span></div>
            <h3 class="ed-link-card__title">Receiving Event Notifications</h3>
            <p class="ed-link-card__desc">How to decrypt inbound JWEs, verify signatures, and apply FAPI-required security checks on webhook events.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/knowledge-base/articles/jwt-claims" :style="{ '--card-color': '#5b21b6' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Knowledge base</span></div>
            <h3 class="ed-link-card__title">JWT Claim Rules</h3>
            <p class="ed-link-card__desc">Strict per-claim reference for both the Request Object and Client Assertion &mdash; <code>aud</code>, <code>jti</code>, lifetime windows, and common rejection causes.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/security/fapi/scopes" :style="{ '--card-color': 'var(--at-teal-deep)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Page</span></div>
            <h3 class="ed-link-card__title">Scopes</h3>
            <p class="ed-link-card__desc">All OAuth 2.0 scopes available in UAE Open Finance.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
        </div>
      </div>
    </section>
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
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-doc__contents { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-doc__contents .ed-doc__inner { padding-top: 0; padding-bottom: 0; }
.ed-doc__contents-head { margin-bottom: 1.85rem; }
.ed-doc__contents-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__contents-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--at-navy-deep);
}
.ed-doc__contents-sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-doc__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

.ed-link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}
.ed-link-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}
.ed-link-card__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}
.ed-link-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__contents { padding: 2.5rem 0 3.5rem; }
}
</style>

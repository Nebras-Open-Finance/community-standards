<route lang="yaml">
meta:
  title: Tokens & Assertions
  isIndex: true
</route>

<script setup lang="ts">
const accessTokenRequest = `GET /open-finance/v2.1/accounts HTTP/1.1
Authorization: Bearer <access_token>`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · OAuth 2.0 · Bearer tokens
        </div>
        <h1 class="ed-doc__title">
          Tokens
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          In UAE Open Finance, your application uses two types of OAuth 2.0 bearer tokens to make API calls
          on behalf of a consenting customer.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="At a glance"
      title="Two tokens, two lifetimes"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Token</th>
              <th>Purpose</th>
              <th>Lifetime</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Access token</strong></td>
              <td>Authorises individual API requests</td>
              <td>10 minutes</td>
            </tr>
            <tr>
              <td><strong>Refresh token</strong></td>
              <td>Obtains new access tokens without re-authorising the customer</td>
              <td>Duration of the consent</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="access-tokens"
      num="02"
      color="var(--at-gold)"
      eyebrow="Access Tokens"
      title="Short-lived credentials presented on every API request"
      tone="surface"
    >
      <EdProse>
        An <strong>access token</strong> is a short-lived credential that your application includes in the
        <code>Authorization</code> header of every protected API call:
      </EdProse>

      <EdCode :code="accessTokenRequest" lang="http" filename="HTTP request" />

      <EdProse>
        Access tokens expire after <strong>10 minutes</strong>. Once expired, any API call using that token
        will receive a <code>401 Unauthorized</code> response. Your application must silently refresh the
        access token using the refresh token before retrying.
      </EdProse>

      <EdNote type="tip" title="Token expiry handling">
        <p>
          Check the <code>expires_in</code> field returned by the <code>/token</code> endpoint (value:
          <code>600</code> seconds). Track the issue time and proactively refresh before the window closes
          rather than waiting for a 401.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="refresh-tokens"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Refresh Tokens"
      title="Renewing access without re-authorising the customer"
      tone="cream"
    >
      <EdProse>
        A <strong>refresh token</strong> allows your application to obtain a new access token without
        prompting the customer to re-authorise. It is issued alongside the access token during the
        authorisation code exchange.
      </EdProse>

      <EdProse>
        The refresh token remains valid for the <strong>lifetime of the consent</strong>. Once the consent
        expires &mdash; determined by its <code>ExpirationDateTime</code> &mdash; the refresh token is also
        invalidated and the customer must re-authorise.
      </EdProse>

      <EdNote type="info" title="Consent lifetime">
        <p>
          The <code>ExpirationDateTime</code> is set when the consent resource is created and returned in
          the consent response object. See the
          <a href="/tech/tpp-standards/v2.1/consent/api-guide">Consent API Guide</a> for details on consent
          lifecycle and expiry.
        </p>
      </EdNote>

      <EdProse>
        To exchange a refresh token for a new access token, POST to the <code>/token</code> endpoint with
        <code>grant_type=refresh_token</code> and a freshly signed
        <a href="/tech/tpp-standards/security/tokens/client-assertion">client assertion</a>.
      </EdProse>

      <EdProse>
        See the
        <a href="/tech/tpp-standards/security/tokens/open-api/token">Token endpoint API Reference</a>
        for the full request and response schema.
      </EdProse>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Section contents
          </div>
          <h2 class="ed-doc__contents-title">Browse this section</h2>
          <p class="ed-doc__contents-sub">The full set of pages covering tokens and client assertions in UAE Open Finance.</p>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="/tech/tpp-standards/security/tokens/client-assertion" :style="{ '--card-color': 'var(--at-teal)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Page</span></div>
            <h3 class="ed-link-card__title">Preparing Client Assertion</h3>
            <p class="ed-link-card__desc">How to construct and sign the JWT used to authenticate your application at <code>/par</code> and <code>/token</code>.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/tpp-standards/security/tokens/open-api/token" :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge http-post">POST</span>
              <code class="ed-link-card__path">/token</code>
            </div>
            <h3 class="ed-link-card__title">Create an Access Token</h3>
            <p class="ed-link-card__desc">OpenAPI reference for the <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/token</code></span> endpoint &mdash; authorization code exchange, refresh token grant, and the consent object returned in the response.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open spec</span><span class="ed-link-card__arrow">&rarr;</span></div>
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
.ed-link-card__path {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  text-transform: none;
  color: var(--at-navy-deep);
  background: none;
  padding: 0;
}
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

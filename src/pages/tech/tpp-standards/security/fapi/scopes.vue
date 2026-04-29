<route lang="yaml">
meta:
  title: OAuth 2.0 Scopes
</route>

<script setup lang="ts">
const requestJwtSample = `{
  "aud": "https://auth1.[LFICode].apihub.openfinance.ae",
  "iss": "your-client-id",
  "client_id": "your-client-id",
  "scope": "accounts openid",
  "redirect_uri": "https://yourapp.com/callback",
  "response_type": "code",
  "code_challenge_method": "S256",
  "code_challenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
  "nonce": "n-0S6_WzA2Mj",
  "state": "af0ifjsldkj",
  "authorization_details": [
    {
      "type": "urn:openfinanceuae:account-access-consent:v2.1",
      "consent": { "..." : "..." }
    }
  ]
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security &middot; OAuth 2.0 &middot; Scopes
        </div>
        <h1 class="ed-doc__title">
          OAuth 2.0 Scopes
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Scopes define what your application is requesting permission to do on behalf of the user. They are
          declared in the <code>scope</code> field of your
          <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a> and echoed back in the access
          token issued by the Authorization Server.
        </p>
        <p class="ed-doc__lede">
          In UAE Open Finance, scopes are <strong>consent-bound</strong> &mdash; the scope alone does not grant
          access. The <code>authorization_details</code> in your request object describes the specific consent
          (account access permissions, payment details, etc.), and the scope indicates which API family the
          consent belongs to.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="available-scopes"
      num="01"
      color="var(--at-teal)"
      eyebrow="Available Scopes"
      title="The four scopes recognised by the Authorization Server"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Scope</th>
              <th>API</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>openid</code></td>
              <td>All</td>
              <td>Activates OpenID Connect support. Required on every request &mdash; enables the Authorization Server to return an ID Token alongside the access token</td>
            </tr>
            <tr>
              <td><code>accounts</code></td>
              <td><a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/">Bank Data Sharing</a></td>
              <td>Grants access to account information APIs (<code>/accounts</code>, <code>/balances</code>, <code>/transactions</code>, etc.). The access token is bound to the <code>account-access-consent</code> from <code>authorization_details</code></td>
            </tr>
            <tr>
              <td><code>payments</code></td>
              <td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide">Service Initiation</a></td>
              <td>Grants access to payment initiation APIs (<code>/payments</code>). The access token is bound to the payment consent from <code>authorization_details</code>. Also grants read access to account information required for payment context</td>
            </tr>
            <tr>
              <td><code>products</code></td>
              <td>Products &amp; Leads</td>
              <td>Grants access to product discovery and leads APIs. Does not require a user consent flow</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="combining-scopes"
      num="02"
      color="var(--at-gold)"
      eyebrow="Combining Scopes"
      title="Space-separated values in the scope field"
      tone="surface"
    >
      <EdProse>
        Scopes are space-separated in the <code>scope</code> field. Always include <code>openid</code>.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Use Case</th>
              <th>Scope Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bank Data Sharing</td>
              <td><code>accounts openid</code></td>
            </tr>
            <tr>
              <td>Payment Initiation</td>
              <td><code>payments openid</code></td>
            </tr>
            <tr>
              <td>Products (public data)</td>
              <td><code>products openid</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Consent-bound access tokens">
        <p>
          For <code>accounts</code> and <code>payments</code>, the access token issued by the Authorization
          Server is cryptographically bound to the specific consent created in your
          <code>authorization_details</code>. The token cannot be used to access resources outside that
          consent's permissions.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="using-scopes"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Using Scopes in the Request JWT"
      title="Declared in the scope claim of the JWT payload"
      tone="cream"
    >
      <EdCode :code="requestJwtSample" lang="json" filename="Request JWT (excerpt)" />
    </EdSectionBand>

    <EdSectionBand
      id="validation-errors"
      num="04"
      color="var(--at-navy)"
      eyebrow="Scope Validation Errors"
      title="Errors returned when a scope is unknown or inconsistent"
      tone="surface"
    >
      <EdProse>
        If the scope in your Request JWT does not match any of the supported values, or is inconsistent with the
        <code>authorization_details</code> type, the Authorization Server will reject the request with:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Error</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>invalid_scope</code></td>
              <td>The requested scope is unknown or not supported by this Authorization Server</td>
            </tr>
            <tr>
              <td><code>AccessToken.InvalidScope</code></td>
              <td>The access token presented to a resource endpoint does not have the scope required for that operation</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="parameterized-scopes"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Parameterized Scopes"
      title="Tokens internally encode the consent they were granted against"
      tone="cream"
    >
      <EdProse>
        The <code>accounts</code> and <code>payments</code> scopes are described in the OpenAPI specifications
        as <em>parameterized with the ConsentId</em>. This means the issued access token internally encodes the
        consent it was granted against. When presenting the token to a resource endpoint, the server validates
        that the requested resource falls within the permissions of the bound consent &mdash; this is handled
        automatically by the Authorization Server and is transparent to your application.
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

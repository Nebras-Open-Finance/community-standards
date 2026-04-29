<route lang="yaml">
meta:
  title: Consent — API Guide
  isIndex: true
</route>

<script setup lang="ts">
interface Tab { label: string; lang: string; code: string }

const parTabs: Tab[] = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// PAR endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const PAR_ENDPOINT = discoveryDoc.pushed_authorization_request_endpoint

const parResponse = await fetch(PAR_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    request:               requestJWT,           // signed Request JWT containing authorization_details
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { request_uri } = await parResponse.json()`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import httpx

# PAR endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
par_endpoint = discovery_doc["pushed_authorization_request_endpoint"]

par_response = httpx.post(
    par_endpoint,
    data={
        "request":               request_jwt,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

request_uri = par_response.json()["request_uri"]`,
  },
]

const redirectTabs: Tab[] = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// authorization_endpoint from .well-known/openid-configuration
// Each LFI sets its own path — there is no fixed structure
// e.g. on the altareq1 sandbox: 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth'
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const authCodeUrl = \`\${AUTHORIZATION_ENDPOINT}?client_id=\${CLIENT_ID}&response_type=code&scope=openid&request_uri=\${encodeURIComponent(request_uri)}\`

window.location.href = authCodeUrl
// or server-side: res.redirect(authCodeUrl)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import urllib.parse

AUTHORIZATION_ENDPOINT = discovery_doc["authorization_endpoint"]

auth_code_url = (
    f"{AUTHORIZATION_ENDPOINT}"
    f"?client_id={CLIENT_ID}"
    f"&response_type=code"
    f"&scope=openid"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)`,
  },
]

const callbackUrl =
  'https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae'

const tokenTabs: Tab[] = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'authorization_code',
    code,
    redirect_uri:          REDIRECT_URI,
    code_verifier:         codeVerifier,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token, refresh_token, expires_in } = await tokenResponse.json()`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
token_endpoint = discovery_doc["token_endpoint"]

token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "authorization_code",
        "code":                  code,
        "redirect_uri":          REDIRECT_URI,
        "code_verifier":         code_verifier,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]`,
  },
]

const ccTokenTabs: Tab[] = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const params = new URLSearchParams({
  grant_type:            'client_credentials',
  scope:                 'openid accounts',   // or 'openid payments' for service initiation
  client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  client_assertion:      await buildClientAssertion(),
})

// Reuse the TOKEN_ENDPOINT discovered above (discoveryDoc.token_endpoint).
const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token } = await tokenResponse.json()`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# Reuse the token_endpoint discovered above (discovery_doc["token_endpoint"]).
token_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "client_credentials",
        "scope":                 "accounts",   # or "payments" for service initiation
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

access_token = token_response.json()["access_token"]`,
  },
]

const dataSharingPollTabs: Tab[] = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const LFI_API_BASE = process.env.LFI_API_BASE_URL!

const consentResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/account-access-consents/\${consentId}\`,
  {
    headers: { Authorization: \`Bearer \${access_token}\` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, Permissions, ExpirationDateTime } } =
  await consentResponse.json()

if (Status !== 'Authorized') {
  throw new Error(\`Consent not authorized: \${Status}\`)
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `consent_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/account-access-consents/{consent_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data   = consent_response.json()["Data"]
status = data["Status"]

if status != "Authorized":
    raise ValueError(f"Consent not authorized: {status}")`,
  },
]

const serviceInitPollTabs: Tab[] = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const consentResponse = await fetch(
  \`\${LFI_API_BASE}/open-finance/v2.1/payment-consents/\${consentId}\`,
  {
    headers: { Authorization: \`Bearer \${access_token}\` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, ControlParameters, ExpirationDateTime } } =
  await consentResponse.json()

if (Status !== 'Authorized') {
  throw new Error(\`Consent not authorized: \${Status}\`)
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `consent_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/payment-consents/{consent_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data   = consent_response.json()["Data"]
status = data["Status"]

if status != "Authorized":
    raise ValueError(f"Consent not authorized: {status}")`,
  },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP Standards · v2.1 · Consent · API Guide
        </div>
        <h1 class="ed-doc__title">
          Consent &mdash; API Guide
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          In UAE Open Finance, a <strong>Consent</strong> is a structured, user-authorized agreement
          that grants a TPP specific rights to access data or initiate payments on a user's behalf.
          All API access is consent-bound &mdash; you cannot call a resource endpoint without a
          valid, authorized consent.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          Consents are created through the <strong>Pushed Authorization Request</strong> flow
          (<a href="/tech/tpp-standards/security/fapi/">FAPI 2.0 PAR</a>). Rather than creating a
          consent resource directly, the TPP embeds the consent definition inside a signed Request
          JWT and pushes it to the Authorization Server. The user then authenticates at the LFI and
          explicitly authorizes the consent.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="consent-types"
      num="01"
      color="var(--at-teal)"
      eyebrow="Two flavours"
      title="Consent types"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th><code>authorization_details.type</code></th>
              <th>Used for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bank Data Sharing</strong></td>
              <td><code>urn:openfinanceuae:account-access-consent:v2.1</code></td>
              <td>Reading account information, balances, transactions</td>
            </tr>
            <tr>
              <td><strong>Service Initiation</strong></td>
              <td><code>urn:openfinanceuae:service-initiation-consent:v2.1</code></td>
              <td>Initiating domestic payments</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="api-sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="End-to-end"
      title="API sequence flow"
      tone="surface"
    >
      <ClientOnly>
        <APIFlowViewer title="Consent Flow">
          <APIFlowsConsentFlow />
        </APIFlowViewer>
      </ClientOnly>
    </EdSectionBand>

    <EdSectionBand
      id="post-par"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Stage the consent"
      title="POST /par"
      tone="cream"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/par</code>
      </div>
      <EdProse>
        Push the signed Request JWT to the Authorization Server. The
        <code>authorization_details</code> inside the JWT carries the full consent definition
        &mdash; account permissions, payment amounts, billing details, and (for payments) encrypted
        PII.
      </EdProse>

      <EdCodeGroup :tabs="parTabs" />

      <EdProse>
        For the full construction of <code>authorization_details</code> &mdash; including field
        tables, PII encryption, and code examples &mdash; see the specific API guides, for example:
      </EdProse>
      <EdBullets>
        <li>
          <a href="/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/">Bank Data Sharing &mdash; API Guide</a>
        </li>
        <li>
          <a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide">
            Single Instant Payment &mdash; API Guide
          </a>
        </li>
      </EdBullets>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/request-jwt">Preparing the Request JWT</a>
        for how to build and sign the Request JWT, and
        <a href="/tech/tpp-standards/v2.1/consent/open-api/par" class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></a> for the
        full API reference.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="redirect-user"
      num="04"
      color="var(--at-teal)"
      eyebrow="Hand off to the LFI"
      title="Redirecting the user"
      tone="surface"
    >
      <EdProse>
        Build the authorization URL using the <code>authorization_endpoint</code> from the LFI's
        <code>.well-known/openid-configuration</code> and the <code>request_uri</code> returned by
        <code>/par</code>:
      </EdProse>

      <EdCodeGroup :tabs="redirectTabs" />

      <EdProse>
        The user will authenticate with their bank and authorize the consent on the LFI's
        authorization screen.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="callback"
      num="05"
      color="var(--at-gold)"
      eyebrow="Back to the TPP"
      title="Handling the callback"
      tone="cream"
    >
      <EdProse>
        After authorization, the LFI redirects the user back to your <code>redirect_uri</code>:
      </EdProse>

      <EdCode :code="callbackUrl" lang="plaintext" />

      <EdProse>
        Always validate <code>state</code> and <code>iss</code> before proceeding. See
        <a href="/tech/tpp-standards/security/fapi/handling-callback">Handling Authorization Callbacks</a>
        for the full security guide.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="post-token"
      num="06"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Exchange the code"
      title="POST /token"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-post">POST</span>
        <code class="ed-doc__endpoint-path">/token</code>
      </div>
      <EdProse>
        Exchange the authorization code for an access token and refresh token. The
        <code>code_verifier</code> must match the <code>code_challenge</code> sent in the Request
        JWT (PKCE).
      </EdProse>

      <EdCodeGroup :tabs="tokenTabs" />

      <EdProse>
        The access token is consent-bound &mdash; it carries the scope and <code>ConsentId</code>
        granted during authorization. See
        <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a> for token
        lifetimes and the refresh flow.
      </EdProse>
      <EdProse>
        When obtaining an access token you also receive the current state of the consent (including
        the status) to confirm it has moved to the <code>Authorized</code> state before making
        resource API calls.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="maintaining-state"
      num="07"
      color="var(--at-teal)"
      eyebrow="Track changes over time"
      title="Maintaining consent state"
      tone="cream"
    >
      <EdProse>
        After a consent is created, your application needs to track its status over time. There are
        two approaches:
      </EdProse>

      <div class="ed-doc__option">
        <header class="ed-doc__option-head">
          <span class="ed-doc__option-tag">Option 1</span>
          <h3 class="ed-doc__option-title">
            Subscribe to webhook events
            <span class="ed-doc__option-rec">Recommended</span>
          </h3>
        </header>
        <p class="ed-doc__option-body">
          When a consent is created with <code>subscription.Webhook.IsActive: true</code>, on every
          consent status change &mdash; for example, when a user revokes, or the consent expires
          &mdash; the API Hub delivers a
          <a href="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide">Consent Status Event</a>
          to your registered webhook URL. This avoids the need to poll and ensures your application
          reacts to status changes in real time.
        </p>
        <p class="ed-doc__option-body">
          Note: as Events are delivered as JWEs, this approach requires a valid
          <strong>Encryption Certificate</strong> on your <strong>Application</strong>. See the
          <a href="/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide">Consent Status Event &mdash; API Guide</a>
          for the full flow.
        </p>
      </div>

      <div class="ed-doc__option">
        <header class="ed-doc__option-head">
          <span class="ed-doc__option-tag">Option 2</span>
          <h3 class="ed-doc__option-title">Poll the consent endpoint</h3>
        </header>
        <p class="ed-doc__option-body">
          If you need to check the current state of a consent on demand, call the consent endpoint
          directly. Both endpoints require a <strong>client credentials</strong> access token
          &mdash; not the user's consent-bound access token.
        </p>

        <h4 class="ed-doc__sub-heading">Obtaining a client credentials token</h4>
        <EdCodeGroup :tabs="ccTokenTabs" />

        <h4 class="ed-doc__sub-heading">Bank Data Sharing</h4>
        <EdCodeGroup :tabs="dataSharingPollTabs" />
        <EdProse>
          See
          <a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/account-access-consents/{ConsentId}</code></a>
          for the full response schema.
        </EdProse>
        <EdProse>
          You can also retrieve all consents created under a long-lived base consent by passing
          <code>baseConsentId</code> as a query parameter to
          <a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents" class="endpoint"><span class="http-method http-method--get">GET</span><code>/account-access-consents</code></a>.
        </EdProse>

        <h4 class="ed-doc__sub-heading">Service Initiation</h4>
        <EdCodeGroup :tabs="serviceInitPollTabs" />
        <EdProse>
          See
          <a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents/{ConsentId}</code></a>
          for the full response schema.
        </EdProse>
        <EdProse>
          You can also retrieve all payment consents under a long-lived base consent by passing
          <code>baseConsentId</code> as a query parameter to
          <a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents</code></a>.
        </EdProse>
      </div>

      <EdNote type="info" title="Consent States">
        <p>
          A consent moves through a defined lifecycle &mdash;
          <code>AwaitingAuthorization</code> &rarr; <code>Authorized</code> &rarr;
          <code>Consumed</code> / <code>Expired</code> / <code>Revoked</code>. See
          <a href="/tech/tpp-standards/v2.1/consent/">Consent Overview</a> for the full state
          machine and transition rules.
        </p>
      </EdNote>
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
.ed-doc__lede--tight { margin-top: 0.85rem; }
.ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede a:hover { color: var(--at-teal-deep); }
.ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

/* Endpoint header (POST /par etc.) */
.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
}

/* Maintaining state — option cards */
.ed-doc__option {
  position: relative;
  margin-top: 1.5rem;
  padding: 1.6rem 1.75rem 1.4rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}
.ed-doc__option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: var(--at-teal-deep);
}

.ed-doc__option-head { margin-bottom: 0.85rem; }
.ed-doc__option-tag {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  margin-bottom: 0.35rem;
}
.ed-doc__option-title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.ed-doc__option-rec {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  border: 1px solid currentColor;
  padding: 0.2rem 0.5rem;
}

.ed-doc__option-body {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0 0 0.85rem;
}
.ed-doc__option-body:last-of-type { margin-bottom: 0; }
.ed-doc__option-body code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
.ed-doc__option-body strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__option-body a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__option-body a:hover { color: var(--at-teal-deep); }

.ed-doc__sub-heading {
  font-family: var(--at-sans);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  margin: 1.5rem 0 0.6rem;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__option { padding: 1.25rem 1.4rem 1.15rem; }
}
</style>

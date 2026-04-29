<route lang="yaml">
meta:
  title: Handling Authorization Callbacks
</route>

<script setup lang="ts">
const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`

const stateTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const params = new URLSearchParams(window.location.search)
// or server-side: new URLSearchParams(req.url.split('?')[1])

const state = params.get('state')!

if (state !== storedState) {
  // Do not proceed — discard the code and show an error
  throw new Error('State mismatch — possible CSRF attack')
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
state  = params["state"][0]

if state != stored_state:
    # Do not proceed — discard the code and show an error
    raise ValueError("State mismatch — possible CSRF attack")`,
  },
] as const

const issuerTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const iss = params.get('iss')!

if (iss !== ISSUER) {
  throw new Error(\`Unexpected issuer in callback: \${iss}\`)
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `iss = params["iss"][0]

if iss != ISSUER:
    raise ValueError(f"Unexpected issuer in callback: {iss}")`,
  },
] as const

const fullExampleTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { buildClientAssertion } from './client-assertion'

const ISSUER       = process.env.AUTHORIZATION_SERVER_ISSUER!
const REDIRECT_URI = process.env.REDIRECT_URI!

// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

export async function handleCallback(callbackUrl: string, session: {
  storedState: string
  codeVerifier: string
}) {
  const params = new URLSearchParams(callbackUrl.split('?')[1])

  const code  = params.get('code')
  const state = params.get('state')
  const iss   = params.get('iss')

  // 1. Validate state
  if (!state || state !== session.storedState) {
    throw new Error('State mismatch — possible CSRF attack')
  }

  // 2. Validate issuer
  if (!iss || iss !== ISSUER) {
    throw new Error(\`Unexpected issuer: \${iss}\`)
  }

  if (!code) {
    throw new Error('No authorization code in callback')
  }

  // 3. Exchange code for tokens immediately
  const tokenResponse = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:            'authorization_code',
      code,
      redirect_uri:          REDIRECT_URI,
      code_verifier:         session.codeVerifier,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion:      await buildClientAssertion(),
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  if (!tokenResponse.ok) {
    throw new Error(\`Token exchange failed: \${tokenResponse.status}\`)
  }

  const { access_token, refresh_token, expires_in } = await tokenResponse.json()

  // 4. Return tokens — caller is responsible for secure storage
  return { access_token, refresh_token, expires_in }
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import os
import httpx
from urllib.parse import urlparse, parse_qs

ISSUER       = os.environ["AUTHORIZATION_SERVER_ISSUER"]
REDIRECT_URI = os.environ["REDIRECT_URI"]

# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
TOKEN_ENDPOINT = discovery_doc["token_endpoint"]

def handle_callback(callback_url: str, stored_state: str, code_verifier: str) -> dict:
    params = parse_qs(urlparse(callback_url).query)

    code  = params.get("code",  [None])[0]
    state = params.get("state", [None])[0]
    iss   = params.get("iss",   [None])[0]

    # 1. Validate state
    if not state or state != stored_state:
        raise ValueError("State mismatch — possible CSRF attack")

    # 2. Validate issuer
    if not iss or iss != ISSUER:
        raise ValueError(f"Unexpected issuer: {iss}")

    if not code:
        raise ValueError("No authorization code in callback")

    # 3. Exchange code for tokens immediately
    token_response = httpx.post(
        TOKEN_ENDPOINT,
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

    token_response.raise_for_status()
    tokens = token_response.json()

    # 4. Return tokens — caller is responsible for secure storage
    return {
        "access_token":  tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "expires_in":    tokens["expires_in"],
    }`,
  },
] as const

const tokenResponseExample = `{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5c",
  "token_type": "Bearer",
  "expires_in": 300,
  "authorization_details": [
    {
      "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
      "consent": {
        "Data": {
            "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
            "IsSingleAuthorization": true,
            "ExpirationDateTime": "2026-12-25T23:00:00.000Z",
            "AuthorizationExpirationDateTime": "2026-12-25T23:00:00.000Z",
            "ControlParameters": {
               "ConsentSchedule": {
                  "MultiPayment": {
                      "PeriodicSchedule": {
                          "Type": "VariableOnDemand",
                          "PeriodType": "Week",
                          "PeriodStartDate": "2026-12-01",
                          "Controls": {
                              "MaximumIndividualAmount": {
                                  "Amount": "200.00",
                                  "Currency": "AED"
                              },
                          }
                      }
                  }
              }
          },
          "PaymentPurposeCode": "ACM",
          "DebtorReference": "Test Purchase",
          "CreditorReference": "Test Purchase"
        },
        "Links": {
          "Self": "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/v2.1/payment-consents/b8f42378-10ac-46a1-8d20-4e020484216d"
        },
      }
    }
  ],
  "scope": "payments openid",
  "state": "eyJhbGciOiJSUzI1NiIsInR5cC",
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cC",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cC"
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · FAPI · Callbacks
        </div>
        <h1 class="ed-doc__title">
          Handling Authorization Callbacks
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          After the user approves (or declines) consent at the LFI, the Authorization Server redirects them
          back to your registered <code>redirect_uri</code>. How you handle this callback is
          security-critical &mdash; mistakes here can allow CSRF attacks, token theft, and authorization
          code replay.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="callback-url"
      num="01"
      color="var(--at-teal)"
      eyebrow="Callback URL Format"
      title="What the Authorization Server sends back"
      tone="cream"
    >
      <EdProse>The callback URL will be of the form:</EdProse>

      <EdCode :code="callbackUrl" lang="plaintext" filename="Redirect URL" />

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>code</code></td>
              <td>The authorization code to exchange at <code>/token</code>. Single-use and short-lived</td>
            </tr>
            <tr>
              <td><code>state</code></td>
              <td>The value you sent in the Request JWT &mdash; must match what you stored before redirecting</td>
            </tr>
            <tr>
              <td><code>iss</code></td>
              <td>The issuer of the Authorization Server that issued the code</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="validate-state"
      num="02"
      color="var(--at-gold)"
      eyebrow="Validate state"
      title="Always confirm the state value matches"
      tone="surface"
    >
      <EdProse>
        Confirm that the <code>state</code> value returned in the callback matches the one you set in your
        <a href="/tech/tpp-standards/security/fapi/request-jwt">Request JWT</a>. This protects against CSRF
        (Cross-Site Request Forgery) attacks where a malicious page triggers an unintended authorization.
      </EdProse>

      <EdCodeGroup :tabs="stateTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="verify-issuer"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Verify the iss (Issuer)"
      title="Confirm the response came from the expected Authorization Server"
      tone="cream"
    >
      <EdProse>
        Check that the <code>iss</code> parameter matches the Authorization Server you sent the
        <code>/par</code> request to. This ensures the response comes from the expected LFI and not a
        confused deputy or misconfigured redirect.
      </EdProse>

      <EdCodeGroup :tabs="issuerTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="time-limit"
      num="04"
      color="var(--at-navy)"
      eyebrow="Time-Limit Callback Validity"
      title="Authorization codes are single-use and short-lived"
      tone="surface"
    >
      <EdProse>
        Authorization codes are single-use and short-lived &mdash; typically valid for only a few minutes.
        Exchange the code immediately upon receipt.
      </EdProse>

      <EdBullets>
        <li>Exchange the code at <code>/token</code> within seconds of receiving it &mdash; do not queue or defer</li>
        <li>Do not accept callbacks that arrive long after the authorization request was initiated</li>
        <li>Once a code has been exchanged successfully, treat it as consumed and reject any attempt to use it again</li>
      </EdBullets>

      <EdNote type="tip" title="Track request initiation time">
        <p>
          Store a timestamp when you send the user to <code>/par</code>. In your callback handler, reject
          any callback where too much time has elapsed since that timestamp (e.g. more than 10 minutes),
          even if <code>state</code> is otherwise valid.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="minimal-logic"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Keep Callback Logic Minimal"
      title="Do only what's required, then redirect"
      tone="cream"
    >
      <EdProse>When handling the callback, execute only the minimum necessary logic:</EdProse>

      <ol class="ed-doc__ol">
        <li>Validate <code>state</code> and <code>iss</code></li>
        <li>Exchange the <code>code</code> for tokens at <code>/token</code></li>
        <li>Store tokens securely</li>
        <li>Redirect the user to the next step in your application flow</li>
      </ol>

      <EdProse>
        Avoid running complex business logic, sending external requests (other than <code>/token</code>),
        or initiating sensitive operations at this stage. A failed or slow callback should not leave the
        user in an inconsistent state.
      </EdProse>

      <EdNote type="warning" title="Error handling">
        <p>
          If validation fails or the code exchange returns an error, show the user a clean error message
          and discard all parameters from the callback. Do not log authorization codes or tokens.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="full-example"
      num="06"
      color="var(--at-gold)"
      eyebrow="Complete Callback Handler"
      title="End-to-end example combining every check"
      tone="surface"
    >
      <EdCodeGroup :tabs="fullExampleTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="consent-status"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent status in /token responses"
      title="The token response carries the current consent state"
      tone="cream"
    >
      <EdProse>
        On a successful <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/token</code></span> (HTTP 200), the Authorization Server returns not only the
        <code>access_token</code> and <code>refresh_token</code> but also the Consent object, including its
        current <code>Status</code>. See the token endpoint reference for details:
        <a href="/tech/tpp-standards/security/tokens/open-api/token">CreateAccessTokenRequestV21</a>
        (OpenAPI: <code>docs/public/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml</code>,
        schema <code>AEAuthorizationEndpointsV21.AEAuthorizationCodeGrantTokenResponseProperties</code>).
      </EdProse>

      <EdProse>Example response:</EdProse>

      <EdCode :code="tokenResponseExample" lang="json" filename="200 OK — /token response" />

      <EdProse>
        Because access to resources requires both a valid access token <strong>and</strong> an authorized
        consent, the TPP can determine from this response whether resource access is permitted.
      </EdProse>

      <EdProse>
        In most flows the consent status will be <code>Authorized</code>. However, for payment (Bank
        Service Initiation) consents that support and require multi-authorization, the consent status may
        instead be <code>AwaitingAuthorization</code>, indicating the first authorizer has approved but
        additional authorizers are still required before a payment can be made.
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

.ed-doc__ol {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0.85rem 0 0 1.4rem;
  padding: 0;
  max-width: 56rem;
  color: var(--at-mute-2);
}
.ed-doc__ol li { margin: 0.35rem 0; }
.ed-doc__ol code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>

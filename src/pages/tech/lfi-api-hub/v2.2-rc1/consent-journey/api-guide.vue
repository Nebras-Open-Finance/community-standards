<route lang="yaml">
meta:
  title: Consent Journey - API Guide
</route>

<script setup lang="ts">
const validateTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// Example: handling POST /consent/action/validate on your Ozone Connect server
app.post('/consent/action/validate', (req, res) => {
  const consent = req.body

  // Perform your validation logic
  const isSupported = validateConsentIsSupported(consent)

  res.status(200).json({
    data: {
      status: isSupported ? 'valid' : 'invalid',
      code: isSupported ? undefined : 'UNSUPPORTED_CONSENT',
      description: isSupported ? undefined : 'The requested consent type is not supported',
    },
    meta: {},
  })
})`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# Example: handling POST /consent/action/validate on your Ozone Connect server
@app.post("/consent/action/validate")
def validate_consent(request):
    consent = request.json()

    # Perform your validation logic
    is_supported = validate_consent_is_supported(consent)

    return {
        "data": {
            "status": "valid" if is_supported else "invalid",
            "code": None if is_supported else "UNSUPPORTED_CONSENT",
            "description": None if is_supported else "The requested consent type is not supported",
        },
        "meta": {},
    }, 200`,
  },
] as const

const eventTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// Example: handling POST /consent/event/:operation on your Ozone Connect server
app.post('/consent/event/:operation', (req, res) => {
  const { operation } = req.params  // 'post' for creation, 'patch' for updates
  const consent = req.body

  // Store or log the consent event for your records
  logConsentEvent(operation, consent)

  res.status(204).send()
})`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# Example: handling POST /consent/event/{operation} on your Ozone Connect server
@app.post("/consent/event/{operation}")
def consent_event(operation: str, request):
    consent = request.json()

    # Store or log the consent event for your records
    log_consent_event(operation, consent)

    return None, 204`,
  },
] as const

const getAuthTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const HH_BASE = process.env.HEADLESS_HEIMDALL_BASE_URL!
// e.g. 'https://hh.{lfiCode}.preprod.apihub.openfinance.ae'

// Pass through all query parameters received at your authorization endpoint
const queryString = new URLSearchParams({
  client_id: req.query.client_id,
  response_type: req.query.response_type,
  request_uri: req.query.request_uri,
}).toString()

const authResponse = await fetch(\`\${HH_BASE}/auth?\${queryString}\`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // mTLS with C3 transport certificate
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})

if (authResponse.status === 303) {
  // Redirectable failure — redirect the end user to the URI in the Location header without modification
  return res.redirect(authResponse.headers.get('location'))
}

if (authResponse.status === 400) {
  // Non-redirectable failure — render an error page to the end user
  return res.status(400).render('auth-error')
}

const authData = await authResponse.json()

// Extract the interactionId and consentId — store both for subsequent calls
const interactionId = authData.interaction.interactionId
const consentId = authData.interaction.consentIdsList[0]`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import httpx

HH_BASE = os.environ["HEADLESS_HEIMDALL_BASE_URL"]
# e.g. 'https://hh.{lfiCode}.preprod.apihub.openfinance.ae'

# Pass through all query parameters received at your authorization endpoint
auth_response = httpx.get(
    f"{HH_BASE}/auth",
    params={
        "client_id": request.args["client_id"],
        "response_type": request.args["response_type"],
        "request_uri": request.args["request_uri"],
    },
    # cert=("c3-transport.crt", "c3-transport.key"),  # mTLS with C3 certificate
    follow_redirects=False,
)

if auth_response.status_code == 303:
    # Redirectable failure — redirect the end user without modification
    return redirect(auth_response.headers["location"])

if auth_response.status_code == 400:
    # Non-redirectable failure — render an error page
    return render_template("auth-error.html"), 400

auth_data = auth_response.json()

# Extract the interactionId and consentId — store both for subsequent calls
interaction_id = auth_data["interaction"]["interactionId"]
consent_id = auth_data["interaction"]["consentIdsList"][0]`,
  },
] as const

const getConsentTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const CM_BASE = process.env.CONSENT_MANAGER_BASE_URL!
// e.g. 'https://cm.{lfiCode}.preprod.apihub.openfinance.ae'

const consentResponse = await fetch(\`\${CM_BASE}/consents/\${consentId}\`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // mTLS with C3 transport certificate
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})

const consent = await consentResponse.json()

// The consent object contains the full consent details:
// - consent.data.consentBody.Data.Permissions (for data sharing)
// - consent.data.consentBody.Data.ExpirationDateTime
// - consent.data.consentBody.Data.PersonalIdentifiableInformation (if encrypted PII is present)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `CM_BASE = os.environ["CONSENT_MANAGER_BASE_URL"]
# e.g. 'https://cm.{lfiCode}.preprod.apihub.openfinance.ae'

consent_response = httpx.get(
    f"{CM_BASE}/consents/{consent_id}",
    headers={
        "Content-Type": "application/json",
    },
    # cert=("c3-transport.crt", "c3-transport.key"),
)

consent = consent_response.json()

# The consent object contains the full consent details:
# - consent["data"]["consentBody"]["Data"]["Permissions"] (for data sharing)
# - consent["data"]["consentBody"]["Data"]["ExpirationDateTime"]
# - consent["data"]["consentBody"]["Data"]["PersonalIdentifiableInformation"] (if encrypted PII)`,
  },
] as const

const patchAuthorizedTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// PATCH /consents/{consentId} — authorize the consent
await fetch(\`\${CM_BASE}/consents/\${consentId}\`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'Authorized',
    psuIdentifiers: {
      // Your internal end user identifier — the structure is flexible,
      // use whatever fields your institution uses to identify the customer
      userId: authenticatedUser.id,
    },
    accountIds: [
      // Account IDs the end user selected for this consent
      // For Bank Data Sharing: one or more accounts
      // For Bank Service Initiation: exactly one debtor account
      // For Insurance Data Sharing: omit accountIds — use insurancePolicyIds instead
      'account-id-1',
      'account-id-2',
    ],
    authorizationChannel: 'App', // 'App' or 'Web'
  }),
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# PATCH /consents/{consentId} — authorize the consent
httpx.patch(
    f"{CM_BASE}/consents/{consent_id}",
    headers={
        "Content-Type": "application/json",
    },
    json={
        "status": "Authorized",
        "psuIdentifiers": {
            # Your internal end user identifier — the structure is flexible,
            # use whatever fields your institution uses to identify the customer
            "userId": authenticated_user.id,
        },
        "accountIds": [
            # Account IDs the end user selected for this consent
            # For Bank Data Sharing: one or more accounts
            # For Bank Service Initiation: exactly one debtor account
            # For Insurance Data Sharing: omit accountIds — use insurancePolicyIds instead
            "account-id-1",
            "account-id-2",
        ],
        "authorizationChannel": "App",  # 'App' or 'Web'
    },
    # cert=("c3-transport.crt", "c3-transport.key"),
)`,
  },
] as const

const doConfirmTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// POST /auth/{interactionId}/doConfirm — complete the authorization
const confirmResponse = await fetch(
  \`\${HH_BASE}/auth/\${interactionId}/doConfirm\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'manual', // capture the 303 redirect
    // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
  }
)

// The API Hub responds with a 303 redirect back to the TPP
const redirectUri = confirmResponse.headers.get('location')

// Redirect the end user to the TPP — journey complete
res.redirect(redirectUri)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# POST /auth/{interactionId}/doConfirm — complete the authorization
confirm_response = httpx.post(
    f"{HH_BASE}/auth/{interaction_id}/doConfirm",
    headers={
        "Content-Type": "application/x-www-form-urlencoded",
    },
    follow_redirects=False,
    # cert=("c3-transport.crt", "c3-transport.key"),
)

# The API Hub responds with a 303 redirect back to the TPP
redirect_uri = confirm_response.headers["location"]

# Redirect the end user to the TPP — journey complete
return redirect(redirect_uri)`,
  },
] as const

const patchRejectedTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// PATCH /consents/{consentId} — reject the consent
await fetch(\`\${CM_BASE}/consents/\${consentId}\`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'Rejected',
    psuIdentifiers: {
      userId: authenticatedUser.id,
    },
    // Do NOT include accountIds for rejected consents
    authorizationChannel: 'App', // 'App' or 'Web'
  }),
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# PATCH /consents/{consentId} — reject the consent
httpx.patch(
    f"{CM_BASE}/consents/{consent_id}",
    headers={
        "Content-Type": "application/json",
    },
    json={
        "status": "Rejected",
        "psuIdentifiers": {
            "userId": authenticated_user.id,
        },
        # Do NOT include accountIds for rejected consents
        "authorizationChannel": "App",  # 'App' or 'Web'
    },
    # cert=("c3-transport.crt", "c3-transport.key"),
)`,
  },
] as const

const doFailTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `// POST /auth/{interactionId}/doFail — end the authorization with a failure
const failResponse = await fetch(
  \`\${HH_BASE}/auth/\${interactionId}/doFail\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      error: 'access_denied',
      error_description: 'The user rejected the consent',
    }),
    redirect: 'manual', // capture the 303 redirect
    // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
  }
)

// The API Hub responds with a 303 redirect back to the TPP with error parameters
const redirectUri = failResponse.headers.get('location')

// Redirect the end user to the TPP — journey ended
res.redirect(redirectUri)`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `# POST /auth/{interactionId}/doFail — end the authorization with a failure
fail_response = httpx.post(
    f"{HH_BASE}/auth/{interaction_id}/doFail",
    headers={
        "Content-Type": "application/x-www-form-urlencoded",
    },
    data={
        "error": "access_denied",
        "error_description": "The user rejected the consent",
    },
    follow_redirects=False,
    # cert=("c3-transport.crt", "c3-transport.key"),
)

# The API Hub responds with a 303 redirect back to the TPP with error parameters
redirect_uri = fail_response.headers["location"]

# Redirect the end user to the TPP — journey ended
return redirect(redirect_uri)`,
  },
] as const

const psuRedirectUrl = 'https://your-auth-endpoint.example.com/authorize?client_id={clientId}&response_type=code&request_uri={request_uri}'
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Consent Journey · API Guide
        </div>
        <h1 class="ed-doc__title">
          Consent Journey &mdash; API Guide
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          End-to-end implementation guide for the consent authorization journey: from the TPP's
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span> through your Authorization Endpoint, the Headless Heimdall and Consent
          Manager API calls, and the final <code>doConfirm</code>/<code>doFail</code> redirect back to
          the TPP.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What must be in place before you start"
      tone="cream"
    >
      <EdProse>Before implementing the consent journey, ensure the following are in place:</EdProse>

      <EdBullets>
        <li>
          <strong>API Hub onboarded</strong> &mdash; Your API Hub instance is provisioned and your
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/">environment-specific configuration</a>
          is complete
        </li>
        <li>
          <strong>C3-hh-cm-client application created</strong> &mdash; Registered in the Trust
          Framework with mTLS connectivity established in both directions. See
          <a href="/tech/lfi-api-hub/trust-framework/creating-c3-application">Creating the C3-hh-cm-client Application</a>
        </li>
        <li>
          <strong>Connectivity verified</strong> &mdash; Bidirectional mTLS connectivity confirmed
          between your systems and the API Hub. Use <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/hello-mtls</code></span> on both the
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/">Headless Heimdall</a> and
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/">Consent Manager</a> base URLs to
          verify. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity/">Connectivity &amp; Certificates</a>
        </li>
        <li>
          <strong>Authorization Endpoint registered</strong> &mdash; Your
          <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint</a>
          is configured in the API Hub to receive TPP user redirects
        </li>
      </EdBullets>

      <h3>Required API implementations</h3>
      <EdProse>You MUST implement the following endpoints:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Direction</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth" class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Initiate the authorization interaction</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Retrieve the full consent details</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Update consent status, end user identifiers, and account IDs</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Complete the authorization interaction and redirect back to TPP successfully</td>
            </tr>
            <tr>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail" class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></a></td>
              <td>LFI &rarr; API Hub</td>
              <td>Complete the authorization interaction and redirect back to TPP with a failure</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="api-sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API sequence flow"
      title="End-to-end flow diagram"
      tone="surface"
    >
      <APIFlowViewer title="Consent Flow">
        <APIFlowsConsentFlow />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="consent-creation"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Consent creation"
      title="Steps 1–3 — TPP /par, optional validate, optional event"
      tone="cream"
    >
      <h3>Step 1 &mdash; TPP creates the consent via <code>/par</code></h3>
      <EdProse>
        The consent journey begins when a TPP sends a Pushed Authorization Request
        (<span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>) to the API Hub. The TPP embeds the consent definition inside a signed
        Request JWT. See the
        <a href="/tech/tpp-standards/v2.2-rc1/consent/api-guide">TPP Consent API Guide</a>
        for the TPP's API Guide and
        <a href="/tech/tpp-standards/v2.2-rc1/consent/open-api/par" class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></a>
        for the full <code>/par</code> request structure.
      </EdProse>
      <EdProse>
        At this point your LFI systems are not yet involved &mdash; the API Hub receives the request
        and begins processing the consent.
      </EdProse>

      <h3>Step 2 &mdash; (Optional) Validate the consent</h3>
      <EdProse>
        If your LFI has configured the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></a>
        endpoint in the API Hub, the API Hub will call your Ozone Connect server with the full consent
        payload <strong>before</strong> the consent is created.
      </EdProse>
      <EdProse>
        This gives your LFI the opportunity to inspect the consent and determine whether it is one you
        support &mdash; for example, validating that a debtor account exists in your systems, or that
        the requested permissions are supported.
      </EdProse>
      <EdProse>Your LFI MUST return <code>data.status</code> set to one of:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>valid</code></td>
              <td>The consent is created and processing continues</td>
            </tr>
            <tr>
              <td><code>invalid</code></td>
              <td>The consent is rejected and an error is returned to the TPP</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCodeGroup :tabs="validateTabs" />

      <EdNote type="info" title="Not configured?">
        <p>
          If you have not configured the <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span> endpoint, the API
          Hub assumes all consents are valid and creates them immediately.
        </p>
      </EdNote>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate">Validate Consent API Reference</a>
        for the full request and response schemas.
      </EdProse>

      <h3>Step 3 &mdash; (Optional) Receive the consent event</h3>
      <EdProse>
        If your LFI has configured the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op" class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/{operation}</code></a>
        endpoint, the API Hub will call <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/event/post</code></span> on your Ozone Connect
        server once the consent has been successfully created.
      </EdProse>
      <EdProse>
        This is an informational notification &mdash; the API Hub does not expect a response body.
        Return <code>204 No Content</code> to acknowledge receipt.
      </EdProse>

      <EdCodeGroup :tabs="eventTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="psu-redirect"
      num="04"
      color="var(--at-navy)"
      eyebrow="End user redirect and authorization interaction"
      title="Steps 4–6 — receive redirect, GET /auth, GET /consents"
      tone="surface"
    >
      <h3>Step 4 &mdash; End user is redirected to your Authorization Endpoint</h3>
      <EdProse>
        After the consent is created via <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>, the TPP redirects the end user to your
        <strong>Authorization Endpoint</strong> with the following query parameters:
      </EdProse>

      <EdCode lang="text" :code="psuRedirectUrl" />

      <EdProse>
        Where <code>request_uri</code> is the value returned from the <code>/par</code> response. Your
        Authorization Endpoint is the URL you registered during
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint">environment-specific configuration</a>.
      </EdProse>

      <EdNote type="tip" title="Don't validate the inbound URL — ignore unknown parameters">
        <p>
          Your Authorization Endpoint MUST NOT reject the redirect based on the query parameters it
          receives. If a TPP appends additional parameters beyond <code>client_id</code>,
          <code>response_type</code>, and <code>request_uri</code>, simply ignore them &mdash; do not
          treat the redirect as malformed.
        </p>
        <p>
          The authoritative authorization request is the signed Request JWT referenced by
          <code>request_uri</code>; the API Hub validates it when you call
          <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span> in Step 5. Forward whatever you receive and let Headless
          Heimdall be the source of truth.
        </p>
      </EdNote>

      <h3>Step 5 &mdash; Call <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span></h3>
      <EdProse>
        Upon receiving the end user redirect, your authorization server MUST immediately call
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span> on the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/">Headless Heimdall</a>
        base URL, passing through <strong>all</strong> the query parameters received from the redirect.
      </EdProse>

      <EdCodeGroup :tabs="getAuthTabs" />

      <EdProse>The <code>200</code> response contains:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>interaction.interactionId</code></td>
              <td>Unique identifier for this authorization interaction &mdash; required for <code>doConfirm</code> and <code>doFail</code></td>
            </tr>
            <tr>
              <td><code>interaction.consentIdsList</code></td>
              <td>Array of consent IDs associated with this interaction (currently one element)</td>
            </tr>
            <tr>
              <td><code>tpp</code></td>
              <td>TPP details including <code>clientId</code>, <code>tppName</code>, <code>orgId</code>, and directory record</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Handle all response codes">
        <p><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span> can return three outcomes:</p>
        <ul>
          <li><strong><code>200</code></strong> &mdash; Success. Continue with the authorization journey.</li>
          <li><strong><code>303</code></strong> &mdash; Redirectable failure. The OIDC client was valid but the authorization request parameters failed validation. You MUST redirect the end user to the URI in the <code>Location</code> header <strong>without modification</strong>.</li>
          <li><strong><code>400</code></strong> &mdash; Non-redirectable failure. The OIDC client could not be verified. You MUST render an error page and MUST NOT redirect back to the TPP.</li>
        </ul>
      </EdNote>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth"><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span> API Reference</a>
        for the full response schema.
      </EdProse>

      <h3>Step 6 &mdash; Retrieve the consent details</h3>
      <EdProse>
        Using the <code>consentId</code> from the <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/auth</code></span> response, call
        <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></span> on the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/">Consent Manager</a>
        to retrieve the full consent object.
      </EdProse>

      <EdCodeGroup :tabs="getConsentTabs" />

      <EdNote type="info" title="Encrypted PII">
        <p>
          Some consent types include encrypted personally identifiable information (PII) &mdash; for
          example, debtor or creditor details on payment consents. If the consent contains encrypted
          PII fields, your LFI MUST decrypt the data and validate that the decrypted values align
          exactly with the Open Finance API specification. See
          <a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/">Personal Identifiable Information</a>
          for decryption and validation details.
        </p>
      </EdNote>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId"><span class="endpoint"><span class="http-method http-method--get">GET</span><code>/consents/{consentId}</code></span> API Reference</a>
        for the full response schema.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="psu-authentication"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="End user authentication"
      title="Step 7 — authenticate the end user"
      tone="cream"
    >
      <EdProse>
        Your LFI MUST authenticate the end user using your standard authentication mechanisms. The
        authentication MUST satisfy the requirements defined in the
        <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/requirements">Authentication Requirements</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="consent-authorization"
      num="06"
      color="var(--at-gold)"
      eyebrow="Consent authorization"
      title="Steps 8–9 — present, then PATCH + doConfirm/doFail"
      tone="surface"
    >
      <h3>Step 8 &mdash; Present the authorization page</h3>
      <EdProse>
        After the end user has authenticated, present the consent details for the user to review and
        authorize. The authorization page layout varies by consent type. For example, a bank data
        sharing consent displays the requested permissions and account selection, while a payment
        consent displays the payment details.
      </EdProse>
      <EdProse>
        See the User Experience pages for each consent type for the expected authorization page
        layouts:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Consent Type</th>
              <th>User Experience</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bank Data Sharing</td>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/user-journeys">User Experience</a></td>
            </tr>
            <tr>
              <td>Single Instant Payment</td>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys">User Experience</a></td>
            </tr>
            <tr>
              <td>Insurance Data Sharing</td>
              <td><a href="/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/user-journeys">User Experience</a></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Step 9a &mdash; end user authorizes: PATCH consent and doConfirm</h3>
      <EdProse>If the end user approves the consent, your LFI MUST:</EdProse>
      <EdBullets>
        <li><strong>PATCH the consent</strong> to <code>Authorized</code> status, providing the end user identifiers, account IDs, and authorization channel</li>
        <li><strong>Call <code>doConfirm</code></strong> to complete the interaction and redirect the end user back to the TPP</li>
      </EdBullets>

      <h4>PATCH the consent</h4>
      <EdCodeGroup :tabs="patchAuthorizedTabs" />

      <EdProse>The <code>PATCH</code> returns <code>204 No Content</code> on success.</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th style="text-align:center">Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>status</code></td>
              <td style="text-align:center">Yes</td>
              <td>Set to <code>Authorized</code></td>
            </tr>
            <tr>
              <td><code>psuIdentifiers</code></td>
              <td style="text-align:center">Yes</td>
              <td>Object containing your internal end user identifier fields</td>
            </tr>
            <tr>
              <td><code>accountIds</code></td>
              <td style="text-align:center">Yes (Bank consents)</td>
              <td>Array of account IDs the end user selected. For Bank Data Sharing, one or more accounts. For Bank Service Initiation, exactly one debtor account. Not patched for Insurance Data Sharing &mdash; use <code>insurancePolicyIds</code> instead</td>
            </tr>
            <tr>
              <td><code>insurancePolicyIds</code></td>
              <td style="text-align:center">Yes (Insurance Data Sharing)</td>
              <td>Array of <code>InsurancePolicyId</code> values the end user selected. The Consent Manager mirrors this into <code>accountIds</code> automatically so downstream identifier handling stays uniform across consent types</td>
            </tr>
            <tr>
              <td><code>authorizationChannel</code></td>
              <td style="text-align:center">Yes</td>
              <td><code>App</code> or <code>Web</code> &mdash; the channel on which the end user authorized the consent</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId"><span class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/consents/{consentId}</code></span> API Reference</a>
        for the full request schema.
      </EdProse>

      <h4>Call doConfirm</h4>
      <EdCodeGroup :tabs="doConfirmTabs" />

      <EdProse>
        The API Hub responds with a <strong><code>303 See Other</code></strong> containing the redirect
        URI back to the TPP. Your LFI MUST redirect the end user to this URI to complete the journey.
      </EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm"><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doConfirm</code></span> API Reference</a>
        for the full specification.
      </EdProse>

      <h3>Step 9b &mdash; end user rejects: PATCH consent and doFail</h3>
      <EdProse>If the end user declines the consent or authentication fails, your LFI MUST:</EdProse>
      <EdBullets>
        <li><strong>PATCH the consent</strong> to <code>Rejected</code> status, providing the end user identifiers (but <strong>not</strong> account IDs)</li>
        <li><strong>Call <code>doFail</code></strong> to complete the interaction and redirect the end user back to the TPP with an error</li>
      </EdBullets>

      <h4>PATCH the consent</h4>
      <EdCodeGroup :tabs="patchRejectedTabs" />

      <h4>Call doFail</h4>
      <EdCodeGroup :tabs="doFailTabs" />

      <EdProse>
        The API Hub responds with a <strong><code>303 See Other</code></strong> containing the redirect
        URI back to the TPP with OAuth 2.0 error parameters. Your LFI MUST redirect the end user to this
        URI. If you omit <code>error</code> and <code>error_description</code>, the API Hub will return
        default error values.
      </EdProse>
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail"><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/auth/{interactionId}/doFail</code></span> API Reference</a>
        for the full specification.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="identifier-requirements"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Identifier requirements"
      title="psuIdentifiers and accountIds MUST be opaque"
      tone="cream"
    >
      <EdProse>
        The values the LFI patches onto the consent &mdash; <code>psuIdentifiers</code> and
        <code>accountIds</code> &mdash; are stored centrally in the API Hub. They MUST be
        <strong>opaque, non-sensitive, LFI-defined references</strong>.
      </EdProse>

      <EdNote type="danger" title="No sensitive values on the consent">
        <p>
          The LFI MUST NOT use Emirates ID, passport number, name, email, phone number, IBAN, account
          number, card number, CIF, or any other value that on its own identifies a natural person or
          a real-world account.
        </p>
        <p>
          See <a href="/knowledge-base/articles/consent-identifiers">Consent Identifiers</a> for the
          full rationale.
        </p>
      </EdNote>

      <h3><code>psuIdentifiers.userId</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Rule</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Type</td><td>String (required field on <code>psuIdentifiers</code>)</td></tr>
            <tr><td>Pattern</td><td>LFI-defined opaque string. UUID (v4) recommended</td></tr>
            <tr><td>Uniqueness</td><td>MUST uniquely identify a single end user within the LFI</td></tr>
            <tr><td>Stability</td><td>MUST be the same value for the same end user across every consent they authorise &mdash; used by <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/psu/{userId}/consents</code></span></td></tr>
            <tr><td>Sensitive values</td><td>MUST NOT be an Emirates ID, email, phone, CIF, or any other PII</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Additional custom fields on <code>psuIdentifiers</code> are permitted but MUST follow the same
        non-sensitive rule.
      </EdProse>

      <h3><code>accountIds[]</code></h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Rule</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Type</td><td>Array of strings, <code>minItems: 1</code></td></tr>
            <tr><td>Item format</td><td>String, 1&ndash;40 characters. UUID (v4) recommended</td></tr>
            <tr><td>Value</td><td>MUST match the <code>AccountId</code> the LFI returns from its own <code>/accounts</code> APIs &mdash; the API Hub uses it to enrich downstream TPP requests</td></tr>
            <tr><td>Immutability</td><td>Once issued, the <code>AccountId</code> for an account MUST NOT change</td></tr>
            <tr><td>Uniqueness</td><td>MUST uniquely identify a single account within the LFI</td></tr>
            <tr><td>Sensitive values</td><td>MUST NOT be an IBAN, account number, card number, or any externally-meaningful account identifier</td></tr>
            <tr><td>Cardinality</td><td>Bank Service Initiation: exactly one (the debtor account). Bank Data Sharing: one or more selected accounts. Insurance Data Sharing: not patched directly &mdash; the Consent Manager mirrors <code>insurancePolicyIds</code> into <code>accountIds</code> via trigger</td></tr>
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

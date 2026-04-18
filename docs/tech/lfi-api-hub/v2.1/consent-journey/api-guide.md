---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Consent Journey - API Guide


## Prerequisites

Before implementing the consent journey, ensure the following are in place:

1. **API Hub onboarded** — Your API Hub instance is provisioned and your [environment-specific configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/) is complete
2. **C3-hh-cm-client application created** — Registered in the Trust Framework with mTLS connectivity established in both directions. See [Creating the C3-hh-cm-client Application](/tech/lfi-api-hub/trust-framework/creating-c3-application)
3. **Connectivity verified** — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. Use `GET /hello-mtls` on both the [Headless Heimdall](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/) and [Consent Manager](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/) base URLs to verify. See [Connectivity & Certificates](/tech/lfi-api-hub/v2.1/api-hub/connectivity/)
4. **Authorization Endpoint registered** — Your [Authorization Endpoint](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint) is configured in the API Hub to receive TPP user redirects

### Required API implementations

You MUST implement the following endpoints:

| Endpoint | Direction | Purpose |
|----------|-----------|---------|
| [`GET /auth`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth) | LFI → API Hub | Initiate the authorization interaction |
| [`GET /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId) | LFI → API Hub | Retrieve the full consent details |
| [`PATCH /consents/{consentId}`](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId) | LFI → API Hub | Update consent status, PSU identifiers, and account IDs |
| [`POST /auth/{interactionId}/doConfirm`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm) | LFI → API Hub | Complete the authorization interaction and redirect back to TPP successfully |
| [`POST /auth/{interactionId}/doFail`](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail) | LFI → API Hub | Complete the authorization interaction and redirect back to TPP with a failure |

## API Sequence Flow

<APIFlowViewer 
title="Bank Data Sharing API Flow"
downloadUrl="/images/consent-flows/uae-data-sharing-sequence-diagram.png"
 >
  <APIFlowsConsentFlow/>
</APIFlowViewer>


## Consent Creation

### Step 1 — TPP creates the consent via `/par`

The consent journey begins when a TPP sends a Pushed Authorization Request (`POST /par`) to the API Hub. The TPP embeds the consent definition inside a signed Request JWT. See the [TPP Consent API Guide](/tech/tpp-standards/v2.1/consent/api-guide) for the TPP's API Guide and [`POST /par`](/tech/tpp-standards/v2.1/consent/open-api/par) for the full `/par` request structure.

At this point your LFI systems are not yet involved — the API Hub receives the request and begins processing the consent.

### Step 2 — (Optional) Validate the consent

If your LFI has configured the [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) endpoint in the API Hub, the API Hub will call your Ozone Connect server with the full consent payload **before** the consent is created.

This gives your LFI the opportunity to inspect the consent and determine whether it is one you support — for example, validating that a debtor account exists in your systems, or that the requested permissions are supported.

Your LFI MUST return `data.status` set to one of:

| Status | Effect |
|--------|--------|
| `valid` | The consent is created and processing continues |
| `invalid` | The consent is rejected and an error is returned to the TPP |

::: code-group

```typescript [Node.js]
// Example: handling POST /consent/action/validate on your Ozone Connect server
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
})
```

```python [Python]
# Example: handling POST /consent/action/validate on your Ozone Connect server
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
    }, 200
```

:::

::: info Not configured?
If you have not configured the `POST /consent/action/validate` endpoint, the API Hub assumes all consents are valid and creates them immediately.
:::

See the [Validate Consent API Reference](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) for the full request and response schemas.

### Step 3 — (Optional) Receive the consent event

If your LFI has configured the [`POST /consent/event/{operation}`](/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op) endpoint, the API Hub will call `POST /consent/event/post` on your Ozone Connect server once the consent has been successfully created.

This is an informational notification — the API Hub does not expect a response body. Return `204 No Content` to acknowledge receipt.

::: code-group

```typescript [Node.js]
// Example: handling POST /consent/event/:operation on your Ozone Connect server
app.post('/consent/event/:operation', (req, res) => {
  const { operation } = req.params  // 'post' for creation, 'patch' for updates
  const consent = req.body

  // Store or log the consent event for your records
  logConsentEvent(operation, consent)

  res.status(204).send()
})
```

```python [Python]
# Example: handling POST /consent/event/{operation} on your Ozone Connect server
@app.post("/consent/event/{operation}")
def consent_event(operation: str, request):
    consent = request.json()

    # Store or log the consent event for your records
    log_consent_event(operation, consent)

    return None, 204
```

:::

## PSU Redirect and Authorization Interaction

### Step 4 — PSU is redirected to your Authorization Endpoint

After the consent is created via `POST /par`, the TPP redirects the PSU to your **Authorization Endpoint** with the following query parameters:

```
https://your-auth-endpoint.example.com/authorize?client_id={clientId}&response_type=code&scope=openid&request_uri={request_uri}
```

Where `request_uri` is the value returned from the `/par` response. Your Authorization Endpoint is the URL you registered during [environment-specific configuration](/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint).

### Step 5 — Call `GET /auth`

Upon receiving the PSU redirect, your authorization server MUST immediately call `GET /auth` on the [Headless Heimdall](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/) base URL, passing through **all** the query parameters received from the redirect.

::: code-group

```typescript [Node.js]
const HH_BASE = process.env.HEADLESS_HEIMDALL_BASE_URL!
// e.g. 'https://hh.{lfiCode}.preprod.apihub.openfinance.ae'

// Pass through all query parameters received at your authorization endpoint
const queryString = new URLSearchParams({
  client_id: req.query.client_id,
  response_type: req.query.response_type,
  scope: req.query.scope,
  request_uri: req.query.request_uri,
}).toString()

const authResponse = await fetch(`${HH_BASE}/auth?${queryString}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // mTLS with C3 transport certificate
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})

if (authResponse.status === 303) {
  // Redirectable failure — redirect the PSU to the URI in the Location header without modification
  return res.redirect(authResponse.headers.get('location'))
}

if (authResponse.status === 400) {
  // Non-redirectable failure — render an error page to the PSU
  return res.status(400).render('auth-error')
}

const authData = await authResponse.json()

// Extract the interactionId and consentId — store both for subsequent calls
const interactionId = authData.interaction.interactionId
const consentId = authData.interaction.consentIdsList[0]
```

```python [Python]
import httpx

HH_BASE = os.environ["HEADLESS_HEIMDALL_BASE_URL"]
# e.g. 'https://hh.{lfiCode}.preprod.apihub.openfinance.ae'

# Pass through all query parameters received at your authorization endpoint
auth_response = httpx.get(
    f"{HH_BASE}/auth",
    params={
        "client_id": request.args["client_id"],
        "response_type": request.args["response_type"],
        "scope": request.args["scope"],
        "request_uri": request.args["request_uri"],
    },
    # cert=("c3-transport.crt", "c3-transport.key"),  # mTLS with C3 certificate
    follow_redirects=False,
)

if auth_response.status_code == 303:
    # Redirectable failure — redirect the PSU without modification
    return redirect(auth_response.headers["location"])

if auth_response.status_code == 400:
    # Non-redirectable failure — render an error page
    return render_template("auth-error.html"), 400

auth_data = auth_response.json()

# Extract the interactionId and consentId — store both for subsequent calls
interaction_id = auth_data["interaction"]["interactionId"]
consent_id = auth_data["interaction"]["consentIdsList"][0]
```

:::

The `200` response contains:

| Field | Description |
|-------|-------------|
| `interaction.interactionId` | Unique identifier for this authorization interaction — required for `doConfirm` and `doFail` |
| `interaction.consentIdsList` | Array of consent IDs associated with this interaction (currently one element) |
| `tpp` | TPP details including `clientId`, `tppName`, `orgId`, and directory record |

::: warning Handle all response codes
`GET /auth` can return three outcomes:
- **`200`** — Success. Continue with the authorization journey.
- **`303`** — Redirectable failure. The OIDC client was valid but the authorization request parameters failed validation. You MUST redirect the PSU to the URI in the `Location` header **without modification**.
- **`400`** — Non-redirectable failure. The OIDC client could not be verified. You MUST render an error page and MUST NOT redirect back to the TPP.
:::

See the [`GET /auth` API Reference](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth) for the full response schema.

### Step 6 — Retrieve the consent details

Using the `consentId` from the `GET /auth` response, call `GET /consents/{consentId}` on the [Consent Manager](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/) to retrieve the full consent object.

::: code-group

```typescript [Node.js]
const CM_BASE = process.env.CONSENT_MANAGER_BASE_URL!
// e.g. 'https://cm.{lfiCode}.preprod.apihub.openfinance.ae'

const consentResponse = await fetch(`${CM_BASE}/consents/${consentId}`, {
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
// - consent.data.consentBody.Data.PersonalIdentifiableInformation (if encrypted PII is present)
```

```python [Python]
CM_BASE = os.environ["CONSENT_MANAGER_BASE_URL"]
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
# - consent["data"]["consentBody"]["Data"]["PersonalIdentifiableInformation"] (if encrypted PII)
```

:::

::: info Encrypted PII
Some consent types include encrypted personally identifiable information (PII) — for example, debtor or creditor details on payment consents. If the consent contains encrypted PII fields, your LFI MUST decrypt the data and validate that the decrypted values align exactly with the Open Finance API specification. See [Personal Identifiable Information](/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/) for decryption and validation details.
:::

See the [`GET /consents/{consentId}` API Reference](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId) for the full response schema.

## PSU Authentication

### Step 7 — Authenticate the PSU

Your LFI MUST authenticate the PSU using your standard authentication mechanisms. The authentication MUST satisfy the requirements defined in the [Authentication Requirements](/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements).

## Consent Authorization

### Step 8 — Present the authorization page

After the PSU has authenticated, present the consent details for the user to review and authorize. The authorization page layout varies by consent type. For example, a bank data sharing consent displays the requested permissions and account selection, while a payment consent displays the payment details.

See the User Experience pages for each consent type for the expected authorization page layouts:

| Consent Type | User Experience |
|-------------|-----------------|
| Bank Data Sharing | [User Experience](/tech/lfi-api-hub/v2.1/banking/data-sharing/user-journeys) |
| Single Instant Payment | [User Experience](/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys) |

### Step 9a — PSU authorizes: PATCH consent and doConfirm

If the PSU approves the consent, your LFI MUST:

1. **PATCH the consent** to `Authorized` status, providing the PSU identifiers, account IDs, and authorization channel
2. **Call `doConfirm`** to complete the interaction and redirect the PSU back to the TPP

#### PATCH the consent

::: code-group

```typescript [Node.js]
// PATCH /consents/{consentId} — authorize the consent
await fetch(`${CM_BASE}/consents/${consentId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    status: 'Authorized',
    psuIdentifiers: {
      // Your internal PSU identifier — the structure is flexible,
      // use whatever fields your institution uses to identify the customer
      userId: authenticatedUser.id,
    },
    accountIds: [
      // Account IDs the PSU selected for this consent
      // For data sharing: one or more accounts
      // For payments: exactly one debtor account
      'account-id-1',
      'account-id-2',
    ],
    authorizationChannel: 'App', // 'App' or 'Web'
  }),
  // agent: new https.Agent({ cert: c3TransportCert, key: c3TransportKey }),
})
```

```python [Python]
# PATCH /consents/{consentId} — authorize the consent
httpx.patch(
    f"{CM_BASE}/consents/{consent_id}",
    headers={
        "Content-Type": "application/json",
    },
    json={
        "status": "Authorized",
        "psuIdentifiers": {
            # Your internal PSU identifier — the structure is flexible,
            # use whatever fields your institution uses to identify the customer
            "userId": authenticated_user.id,
        },
        "accountIds": [
            # Account IDs the PSU selected for this consent
            # For data sharing: one or more accounts
            # For payments: exactly one debtor account
            "account-id-1",
            "account-id-2",
        ],
        "authorizationChannel": "App",  # 'App' or 'Web'
    },
    # cert=("c3-transport.crt", "c3-transport.key"),
)
```

:::

The `PATCH` returns `204 No Content` on success.

| Field | Required | Description |
|-------|----------|-------------|
| `status` | Yes | Set to `Authorized` |
| `psuIdentifiers` | Yes | Object containing your internal PSU identifier fields |
| `accountIds` | Yes | Array of account IDs the PSU selected. For data sharing, one or more accounts. For payments, exactly one debtor account |
| `authorizationChannel` | Yes | `App` or `Web` — the channel on which the PSU authorized the consent |

See the [`PATCH /consents/{consentId}` API Reference](/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId) for the full request schema.

#### Call doConfirm

::: code-group

```typescript [Node.js]
// POST /auth/{interactionId}/doConfirm — complete the authorization
const confirmResponse = await fetch(
  `${HH_BASE}/auth/${interactionId}/doConfirm`,
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

// Redirect the PSU to the TPP — journey complete
res.redirect(redirectUri)
```

```python [Python]
# POST /auth/{interactionId}/doConfirm — complete the authorization
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

# Redirect the PSU to the TPP — journey complete
return redirect(redirect_uri)
```

:::

The API Hub responds with a **`303 See Other`** containing the redirect URI back to the TPP. Your LFI MUST redirect the PSU to this URI to complete the journey.

See the [`POST /auth/{interactionId}/doConfirm` API Reference](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm) for the full specification.

### Step 9b — PSU rejects: PATCH consent and doFail

If the PSU declines the consent or authentication fails, your LFI MUST:

1. **PATCH the consent** to `Rejected` status, providing the PSU identifiers (but **not** account IDs)
2. **Call `doFail`** to complete the interaction and redirect the PSU back to the TPP with an error

#### PATCH the consent

::: code-group

```typescript [Node.js]
// PATCH /consents/{consentId} — reject the consent
await fetch(`${CM_BASE}/consents/${consentId}`, {
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
})
```

```python [Python]
# PATCH /consents/{consentId} — reject the consent
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
)
```

:::

#### Call doFail

::: code-group

```typescript [Node.js]
// POST /auth/{interactionId}/doFail — end the authorization with a failure
const failResponse = await fetch(
  `${HH_BASE}/auth/${interactionId}/doFail`,
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

// Redirect the PSU to the TPP — journey ended
res.redirect(redirectUri)
```

```python [Python]
# POST /auth/{interactionId}/doFail — end the authorization with a failure
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

# Redirect the PSU to the TPP — journey ended
return redirect(redirect_uri)
```

:::

The API Hub responds with a **`303 See Other`** containing the redirect URI back to the TPP with OAuth 2.0 error parameters. Your LFI MUST redirect the PSU to this URI. If you omit `error` and `error_description`, the API Hub will return default error values.

See the [`POST /auth/{interactionId}/doFail` API Reference](/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail) for the full specification.

## Identifier requirements

The values the LFI patches onto the consent — `psuIdentifiers` and `accountIds` — are stored centrally in the API Hub. They MUST be **opaque, non-sensitive, LFI-defined references**.

::: danger No sensitive values on the consent
The LFI MUST NOT use Emirates ID, passport number, name, email, phone number, IBAN, account number, card number, CIF, or any other value that on its own identifies a natural person or a real-world account.

See [Consent Identifiers](/knowledge-base/articles/consent-identifiers) for the full rationale.
:::

### `psuIdentifiers.userId`

| Rule | Requirement |
|------|-------------|
| Type | String (required field on `psuIdentifiers`) |
| Pattern | LFI-defined opaque string. UUID (v4) recommended |
| Uniqueness | MUST uniquely identify a single PSU within the LFI |
| Stability | MUST be the same value for the same PSU across every consent they authorise — used by `GET /psu/{userId}/consents` |
| Sensitive values | MUST NOT be an Emirates ID, email, phone, CIF, or any other PII |

Additional custom fields on `psuIdentifiers` are permitted but MUST follow the same non-sensitive rule.

### `accountIds[]`

| Rule | Requirement |
|------|-------------|
| Type | Array of strings, `minItems: 1` |
| Item format | String, 1–40 characters. UUID (v4) recommended |
| Value | MUST match the `AccountId` the LFI returns from its own `/accounts` APIs — the API Hub uses it to enrich downstream TPP requests |
| Immutability | Once issued, the `AccountId` for an account MUST NOT change |
| Uniqueness | MUST uniquely identify a single account within the LFI |
| Sensitive values | MUST NOT be an IBAN, account number, card number, or any externally-meaningful account identifier |
| Cardinality | Bank Service Initiation: exactly one (the debtor account). Bank Data Sharing: one or more selected accounts |

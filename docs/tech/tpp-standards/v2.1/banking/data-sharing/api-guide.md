---
next: false
prev: false
aside: false
---

🕒 **15 minute read**

# Bank Data Sharing - API Guide


## Prerequisites

Before creating a Bank Data Sharing consent, ensure the following requirements are met:

- **Registered [Application](../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **BDSP role** as defined in [Roles](../trust-framework/roles).

- **Valid [Transport Certificate](../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication** with participating LFIs.

- **Valid [Signing Certificate](../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions.

- **Registration with the relevant [Authorisation Server](../../registration/api-guide)**
  The application must be registered with the Authorisation Server of the LFI for which you intend to create a Bank Data Sharing consent.

- **Understanding of the [FAPI Security Profile](../../security/fapi)** and **[Tokens & Assertions](../../security/tokens)**
  You should understand how request object signing, client authentication, and access token validation underpin secure API interactions.

- **Understanding of [Consents](../../consent)**
  You should understand how to create, retrieve, and manage consents, including consent states and lifecycle transitions.

## API Sequence Flow

<APIFlowViewer title="Bank Data Sharing API Flow">
  <APIFlowsBankDataSharing/>
</APIFlowViewer>

## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/par`

### Step 1 - Constructing Authorization Details

To send a `/par` request, first we need to generate the `request JWT`. We do this by first constructing `authorization_details` of type (`urn:openfinanceuae:account-access-consent:v2.1`)

### authorization_details

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `type`* | enum | Must be `urn:openfinanceuae:account-access-consent:v2.1` | `urn:openfinanceuae:account-access-consent:v2.1` |
| `consent`* | object | Properties of the consent agreed by the User with the TPP. *Described below* | *Described below* |
| `subscription` | object | Optional subscription to Event Notifications, to be sent to the TPP Webhook Url *Described below* | *Described below* |


#### consent (Required) | `authorization_details.consent`

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `ConsentId`* | string (uuid) | Unique ID assigned by the TPP (1–128 chars) | `123e4567-e89b-12d3-a456-426614174001` |
| `BaseConsentId` | string (uuid) | Used when renewing or modifying an existing consent | `123e4567-e89b-12d3-a456-426614174000` |
| `Permissions`* | array\<enum\> | List of account access permissions being consented by the user | `ReadAccountsBasic`, `ReadBalances` |
| `ExpirationDateTime`* | date-time | Expiry date/time (ISO 8601 with timezone, max 1 year) | `2025-11-03T15:46:00+00:00` |
| `FromDate` | date | Start date for transaction access (ISO 8601 format) | `2023-11-03` |
| `ToDate` | date | End date for transaction access (ISO 8601 format) | `2025-11-03` |
| `AccountType` | array\<enum\> | Allowed: `Retail`, `SME`, `Corporate` | `Retail` |
| `AccountSubType` | array\<enum\> | Allowed: `CurrentAccount`, `Savings`, `CreditCard`, `Mortgage`, `Finance` | `Savings` |
| `OpenFinanceBilling`* | object | Billing parameters specified by the TPP. *Described below* | *Described below* |
| `OnBehalfOf` | object | Provided when TPP is acting for another regulated entity *Described below* | *Described below* |

#### OpenFinanceBilling (Required) | `authorization_details.consent.OpenFinanceBilling`

| Field | Type | Allowed Values | Example |
|-------|------|---------------|---------|
| `UserType`* | enum | `Retail`, `SME`, `Corporate` | `Retail` |
| `Purpose`* | enum | `AccountAggregation`, `RiskAssessment`, `TaxFiling`, `Onboarding`, `Verification`, `QuoteComparison`, `BudgetingAnalysis`, `FinancialAdvice`, `AuditReconciliation` | `AccountAggregation` |

#### OnBehalfOf (Optional) | `authorization_details.consent.OnBehalfOf`

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `TradingName` | string | Trading name if acting on behalf of another entity | `Acme Ltd` |
| `LegalName` | string | Legal name of represented entity | `Acme Legal Name` |
| `IdentifierType` | enum | Only `Other` currently supported | `Other` |
| `Identifier` | string | Identifier value | `9876543210` |


#### subscription (Optional) | `authorization_details.subscription`

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `Webhook`* | object | *Described below* | *Described below* |


#### Webhook (Required) | `authorization_details.subscription.Webhook`

| Field | Type | Description | Example |
|-------|------|------------|---------|
| `Url`* | string | HTTPS callback URL | `https://tpp.example.com/webhook` |
| `IsActive`* | boolean | Whether webhook is active | `true` |



### Example request

See an example of a valid authorization_details for urn:openfinanceuae:account-access-consent:v2.1:


```json
"authorization_details": [
  {
    "type": "urn:openfinanceuae:account-access-consent:v2.1",
    "consent": {
      "ConsentId": "{{unique-guid}}", // Unique ID assigned by the TPP (uuid format)
      "ExpirationDateTime": "2026-05-03T15:46:00+00:00", // Max 1 year from today (ISO 8601 format with timezone)

      // Optional: specify start date of historic period for which data can be fetched for transactions and statements (inclusive). If not populated, data will be returned from the earliest available transaction or statement.
      // "FromDate": "2024-05-03",

      // Optional: specify end date of historic period for which data can be fetched for transactions and statements (inclusive). If not populated, data will be returned to the latest available transaction or statement.
      // "ToDate": "2025-05-03",

      "Permissions": [
        "ReadAccountsBasic",
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadBeneficiariesBasic",
        "ReadBeneficiariesDetail",
        "ReadTransactionsBasic",
        "ReadTransactionsDetail",
        "ReadProduct",
        "ReadScheduledPaymentsBasic",
        "ReadScheduledPaymentsDetail",
        "ReadDirectDebits",
        "ReadStandingOrdersBasic",
        "ReadStandingOrdersDetail",
        "ReadStatements",
        "ReadPartyUser",
        "ReadPartyUserIdentity",
        "ReadParty",
        "ReadProductFinanceRates"
      ],

      "OpenFinanceBilling": {
        "UserType": "Retail", // Options: Retail, SME, Corporate
        "Purpose": "AccountAggregation" // Purpose of data sharing (e.g., RiskAssessment, BudgetingAnalysis)
      },

      // Optional: to link to other ConsentId e.g. when renewing long-lived consents
      // "BaseConsentId": "existing-consent-id",

      // Optional: for consent on behalf of another legal entity
      // "OnBehalfOf": {
      //   "TradingName": "Ozone",
      //   "LegalName": "Ozone-CBUAE",
      //   "IdentifierType": "Other", // Only 'Other' allowed for now
      //   "Identifier": "1234567890"
      // },

      // Optional: filter by account types
      // "AccountType": [
      //   "Retail", // Options: Retail, SME, Corporate
      //   "SME"
      // ],

      // Optional: filter by account subtypes
      // "AccountSubType": [
      //   "CurrentAccount", // Options: CurrentAccount, Savings, CreditCard, Mortgage, Finance
      //   "Savings"
      // ]
    },

    // Optional: to receive webhook notifications from LFI
    // "subscription": {
    //   "Webhook": {
    //     "Url": "https://tpp.example.com/webhook", // Must be a reachable HTTPS endpoint
    //     "IsActive": true
    //   }
    // }
  }
]
```

### Step 2 - Constructing the Request JWT

With your `authorization_details` ready, generate a PKCE code pair then use the [`buildRequestJWT()`](/tech/tpp-standards/security/fapi/request-jwt#building-the-request-jwt) helper from the FAPI page, passing `accounts openid` as the scope.

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { generateCodeVerifier, deriveCodeChallenge } from './pkce'    // from FAPI page
import { buildRequestJWT } from './request-jwt'                        // from FAPI page

// 1. Generate PKCE pair — store codeVerifier in your session before redirecting
const codeVerifier  = generateCodeVerifier()
const codeChallenge = deriveCodeChallenge(codeVerifier)

// 2. Define the authorization_details for this consent
const authorizationDetails = [
  {
    type: 'urn:openfinanceuae:account-access-consent:v2.1',
    consent: {
      ConsentId: crypto.randomUUID(),
      ExpirationDateTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      Permissions: [
        'ReadAccountsBasic',
        'ReadAccountsDetail',
        'ReadBalances',
        'ReadTransactionsBasic',
        'ReadTransactionsDetail',
      ],
      OpenFinanceBilling: {
        UserType: 'Retail',
        Purpose: 'AccountAggregation',
      },
    },
  },
]

// 3. Build and sign the Request JWT
const requestJWT = await buildRequestJWT({
  scope: 'accounts openid',
  codeChallenge,
  authorizationDetails,
})
```

:::

::: tip Store the code_verifier
Save `codeVerifier` in your server-side session or an `httpOnly` cookie. You will need it in [Step 7](#step-7-post-token-authorization-code) to exchange the authorization code for tokens.
:::

See [Preparing the Request JWT](/tech/tpp-standards/security/fapi/request-jwt) for the full JWT claim reference and PKCE helpers.

### Step 3 - Creating a Client Assertion

Every call to the Authorization Server requires a **client assertion** — a short-lived signed JWT that proves your application's identity in place of a client secret. Use the [`signJWT()`](/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt) helper from the FAPI Message Signing page:

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'    // from FAPI Message Signing page

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.AUTHORIZATION_SERVER_ISSUER!  // from .well-known

async function buildClientAssertion(): Promise<string> {
  return signJWT({
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: ISSUER,
    jti: crypto.randomUUID(),
  })
}
```

:::

See [Tokens & Assertions](/tech/tpp-standards/security/tokens#generating-a-client-assertion) for the full claims reference and [Preparing Your Client Assertion](/tech/tpp-standards/security/tokens/client-assertion) for a step-by-step walkthrough.

### Step 4 - Sending the /par Request

With your signed Request JWT and client assertion ready, POST both to the Authorization Server's `/par` endpoint. The connection must use your **mTLS transport certificate**.

Include `x-fapi-interaction-id` — a UUID v4 you generate per request. The API Hub echoes it in the response, enabling end-to-end traceability. See [Request Headers](/tech/tpp-standards/security/request-headers) for the full header reference.

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'

const PAR_ENDPOINT = `${ISSUER}/par`

const parResponse = await fetch(PAR_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type':          'application/x-www-form-urlencoded',
    'x-fapi-interaction-id': crypto.randomUUID(),
  },
  body: new URLSearchParams({
    request:               requestJWT,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // Node.js: pass an https.Agent configured with your transport cert and key
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { request_uri, expires_in } = await parResponse.json()
```

```python [Python]
import httpx, uuid

par_response = httpx.post(
    f"{ISSUER}/par",
    headers={
        "x-fapi-interaction-id": str(uuid.uuid4()),
    },
    data={
        "request":               request_jwt,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),  # mTLS
)

data        = par_response.json()
request_uri = data["request_uri"]
expires_in  = data["expires_in"]
```

:::

::: info mTLS transport certificate
You must present your **transport certificate** on every connection to the Authorization Server and resource APIs. In Node.js, configure an `https.Agent` with your PEM certificate and private key. See [Certificates](/tech/tpp-standards/trust-framework/certificates) for how to obtain and configure your transport certificate.
:::

The `/par` response contains:

| Field | Description | Example |
|-------|-------------|---------|
| `request_uri` | A single-use reference to your pushed authorization request | `urn:ietf:params:oauth:request-uri:bwc4JDpSd7` |
| `expires_in` | Seconds until the `request_uri` expires — redirect the user before this window closes | `90` |

## Redirecting the User to the Bank

### Step 5 - Building the Authorization URL

Use the `request_uri` returned by `/par` to build the redirect URL. The `authorization_endpoint` is found in the LFI's `.well-known/openid-configuration` — not constructed from the issuer URL directly. All authorization parameters are already inside the signed Request JWT, so the only query parameters needed are `client_id`, `response_type`, `scope`, and `request_uri`.

::: code-group

```typescript [Node.js]
// authorization_endpoint is discovered from the LFI's .well-known/openid-configuration
// See /.well-known for how to fetch and cache discovery documents
// e.g. 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/authorize'
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const response_type = 'code'

const authCodeUrl = `${AUTHORIZATION_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${response_type}&scope=openid&request_uri=${encodeURIComponent(request_uri)}`

// Redirect the user
window.location.href = authCodeUrl
// or server-side:
// res.redirect(authCodeUrl)
```

```python [Python]
import urllib.parse

# authorization_endpoint from .well-known/openid-configuration
# e.g. 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/authorize'
AUTHORIZATION_ENDPOINT = discovery_doc["authorization_endpoint"]

auth_code_url = (
    f"{AUTHORIZATION_ENDPOINT}"
    f"?client_id={CLIENT_ID}"
    f"&response_type=code"
    f"&scope=openid"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)
# redirect the user to auth_code_url
```

:::

::: tip User Experience
See [User Experience](./user-journeys) for screen mockups of the **Consent** and **Authorization** pages the user sees at the bank, including an interactive example where you can edit the consent JSON and preview the resulting UI.
:::

After redirecting, the user will:

1. Authenticate with their bank
2. Review the consent — accounts, permissions, and expiry — on the bank's authorization screen
3. Approve or decline

## Handling the Callback

### Step 6 - Extracting the Authorization Code

After the user approves, the bank redirects them back to your `redirect_uri`. The callback includes an authorization `code`, the `state` you sent in your Request JWT, and the `iss` (issuer) of the Authorization Server:

```
https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae
```

Extract all three parameters and validate `state` and `iss` before proceeding:

::: code-group

```typescript [Node.js]
const params = new URLSearchParams(window.location.search)
// or server-side: new URLSearchParams(req.url.split('?')[1])

const code  = params.get('code')!
const state = params.get('state')!
const iss   = params.get('iss')!

if (state !== storedState) {
  throw new Error('State mismatch — possible CSRF attack. Abort the flow.')
}
if (iss !== ISSUER) {
  throw new Error(`Unexpected issuer: ${iss}`)
}
```

```python [Python]
from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
code  = params["code"][0]
state = params["state"][0]
iss   = params["iss"][0]

if state != stored_state:
    raise ValueError("State mismatch — possible CSRF attack. Abort the flow.")
if iss != ISSUER:
    raise ValueError(f"Unexpected issuer: {iss}")
```

:::

See [Handling Authorization Callbacks](/tech/tpp-standards/security/fapi/handling-callback) for a full guide on security best practices including issuer verification, replay prevention, and keeping callback logic minimal.

## Exchanging the Code for Tokens

### Step 7 - POST /token (Authorization Code)

Exchange the authorization code for an access token and refresh token. Include the `code_verifier` from Step 2 — the Authorization Server will verify it against the `code_challenge` in your Request JWT before issuing tokens.

::: code-group

```typescript [Node.js]
const TOKEN_ENDPOINT = `${ISSUER}/token`

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type:            'authorization_code',
    code,
    redirect_uri:          REDIRECT_URI,
    code_verifier:         codeVerifier,            // from Step 2
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const {
  access_token,
  refresh_token,
  expires_in,   // 600 — access token lasts 10 minutes
  token_type,   // 'Bearer'
} = await tokenResponse.json()
```

```python [Python]
token_response = httpx.post(
    f"{ISSUER}/token",
    data={
        "grant_type":            "authorization_code",
        "code":                  code,
        "redirect_uri":          REDIRECT_URI,
        "code_verifier":         code_verifier,     # from Step 2
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
expires_in    = tokens["expires_in"]   # 600 — access token lasts 10 minutes
```

:::

Store both tokens securely. The **access token** expires in **10 minutes**; the **refresh token** remains valid for the lifetime of the consent.

::: tip Token storage
Never store tokens in `localStorage`. Use `httpOnly` cookies or a server-side session store. See [Tokens & Assertions](/tech/tpp-standards/security/tokens) for the full token lifecycle and expiry guidance.
:::

## Calling the Account APIs

### Step 8 - GET /accounts

With a valid access token, retrieve all accounts the user consented to share. Include `x-fapi-interaction-id` on every request, and when the customer is present also send `x-fapi-customer-ip-address` and `x-customer-user-agent` and  `x-fapi-auth-date` if the customer has been authenticated. See [Request Headers](/tech/tpp-standards/security/request-headers).

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'

const LFI_API_BASE = process.env.LFI_API_BASE_URL!  // resource server base URL from .well-known

const accountsResponse = await fetch(`${LFI_API_BASE}/open-finance/v2.1/accounts`, {
  headers: {
    Authorization:                `Bearer ${access_token}`,
    'x-fapi-interaction-id':      crypto.randomUUID(),
    'x-fapi-auth-date':           lastCustomerAuthDate,   // RFC 7231 — last time user authenticated with TPP
    'x-fapi-customer-ip-address': customerIpAddress,      // customer's IP address
    // 'x-customer-user-agent':   req.headers['user-agent'],
  },
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { Data: { Account: accounts } } = await accountsResponse.json()

// Store the AccountId(s) for sub-resource queries
const accountId = accounts[0].AccountId
```

```python [Python]
import uuid

accounts_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts",
    headers={
        "Authorization":                f"Bearer {access_token}",
        "x-fapi-interaction-id":        str(uuid.uuid4()),
        "x-fapi-auth-date":             last_customer_auth_date,  # RFC 7231 — last time user authenticated with TPP
        "x-fapi-customer-ip-address":   customer_ip_address,      # customer's IP address
        # "x-customer-user-agent":      request.headers.get("user-agent"),
    },
    # cert=("transport.crt", "transport.key"),
)

accounts   = accounts_response.json()["Data"]["Account"]
account_id = accounts[0]["AccountId"]
```

:::

See the [GET /accounts](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts) API reference for the full response schema.

### Step 9 - GET /accounts/{AccountId}/balances

Use a stored `AccountId` to fetch data from a specific account's sub-resources. Each endpoint requires the matching `Read*` permission in your consent. Apply the same FAPI headers as Step 8.

::: code-group

```typescript [Node.js]
const balancesResponse = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/accounts/${accountId}/balances`,
  {
    headers: {
      Authorization:                `Bearer ${access_token}`,
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-auth-date':           lastCustomerAuthDate,
      'x-fapi-customer-ip-address': customerIpAddress,
      // 'x-customer-user-agent':   req.headers['user-agent'],
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Balance } } = await balancesResponse.json()
```

```python [Python]
balances_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/accounts/{account_id}/balances",
    headers={
        "Authorization":                f"Bearer {access_token}",
        "x-fapi-interaction-id":        str(uuid.uuid4()),
        "x-fapi-auth-date":             last_customer_auth_date,
        "x-fapi-customer-ip-address":   customer_ip_address,
        # "x-customer-user-agent":      request.headers.get("user-agent"),
    },
    # cert=("transport.crt", "transport.key"),
)

balances = balances_response.json()["Data"]["Balance"]
```

:::

All available sub-resources and their required permissions:

| Endpoint | Required Permission | API Reference |
|----------|---------------------|---------------|
| `/accounts/{AccountId}/balances` | `ReadBalances` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances) |
| `/accounts/{AccountId}/transactions` | `ReadTransactionsBasic` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions) |
| `/accounts/{AccountId}/beneficiaries` | `ReadBeneficiariesBasic` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries) |
| `/accounts/{AccountId}/direct-debits` | `ReadDirectDebits` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits) |
| `/accounts/{AccountId}/standing-orders` | `ReadStandingOrdersBasic` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders) |
| `/accounts/{AccountId}/scheduled-payments` | `ReadScheduledPaymentsBasic` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments) |
| `/accounts/{AccountId}/statements` | `ReadStatements` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements) |
| `/accounts/{AccountId}/parties` | `ReadParty` | [reference](/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties) |

## Refresh Token Flow

### Step 10 - Refreshing the Access Token

Access tokens expire after **10 minutes**. Track the `expires_in` value returned by `/token` and refresh proactively rather than waiting for a `401 Unauthorized`. Each refresh requires a fresh client assertion.

::: code-group

```typescript [Node.js]
async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${ISSUER}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type:            'refresh_token',
      refresh_token:         refreshToken,
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion:      await buildClientAssertion(),
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })

  const { access_token, refresh_token: newRefreshToken, expires_in } = await response.json()

  // Always replace both tokens — some servers rotate the refresh token on each use
  return { access_token, refresh_token: newRefreshToken, expires_in }
}
```

```python [Python]
def refresh_access_token(refresh_token: str) -> dict:
    response = httpx.post(
        f"{ISSUER}/token",
        data={
            "grant_type":            "refresh_token",
            "refresh_token":         refresh_token,
            "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            "client_assertion":      build_client_assertion(),
        },
        # cert=("transport.crt", "transport.key"),
    )

    tokens = response.json()
    # Always replace both tokens — some servers rotate the refresh token on each use
    return {
        "access_token":  tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "expires_in":    tokens["expires_in"],
    }
```

:::

::: warning Refresh token rotation
Always replace both `access_token` and `refresh_token` from the response. If the Authorization Server rotates refresh tokens, continuing to use the old one will return `400 invalid_grant`.
:::

The refresh token remains valid until the consent's `ExpirationDateTime`. Once expired, the user must go through the full authorization flow again — send a new `/par` request with a new `ConsentId`.

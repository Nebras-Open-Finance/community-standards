---
next: false
prev: false
---

🕒 **12 minute read**

# API Guide — Bank Data Sharing (LFI)

This guide walks through the Bank Data Sharing flow from the **LFI's perspective**. The API Hub (Ozone Connect) routes all TPP requests to your systems — your responsibilities are:

1. **Authorization Server** — receiving the user redirect, authenticating the user, and presenting the consent screen
2. **Consent Manager integration** — retrieving consent details from the Hub and updating consent state
3. **Resource Server** — serving account data in response to proxied Hub requests



## Flow Overview

```
TPP                    API Hub (Ozone)              LFI Auth Server       LFI Resource Server
 |                          |                          |                       |
 |── POST /par ────────────>|                          |                       |
 |<── request_uri ──────────|                          |                       |
 |                          |                          |                       |
 |── GET /authorize ───────>|── GET /authorize ───────>|                       |
 |                          |                    user authenticates            |
 |                          |                          |                       |
 |                          |<── GET /consent/{id} ───>|                       |
 |                          |── consent details ──────>|                       |
 |                          |                   show consent screen            |
 |                          |                          |                       |
 |                          |<── PATCH /consent/{id} ──|  (authorize/cancel)   |
 |                          |                          |                       |
 |                          |<── POST /doconfirm ──────| (if authorized)       |
 |                          |    or /dofail            | (if cancelled)        |
 |                          |                          |                       |
 |<── redirect (code) ──────|                          |                       |
 |                          |                          |                       |
 |── GET /accounts ────────>|── GET /accounts ─────────────────────────────────>|
 |<── accounts data ────────|<── accounts data ────────────────────────────────|
```



## Step 1 — Receiving the Authorization Request

The TPP redirects the user's browser to your authorization endpoint. The URL is discovered from your `/.well-known/openid-configuration` (hosted by the Hub for your LFI identifier).

```
GET /authorize
  ?client_id={tppClientId}
  &response_type=code
  &scope=openid
  &request_uri={request_uri}
```

The `request_uri` was issued by the Hub's PAR endpoint and contains a reference to the consent definition the TPP submitted.

**Your Authorization Server must:**

1. Validate the `request_uri` — resolve it against the Hub's PAR store (the Hub exposes this internally)
2. Extract the `consentId` from the resolved request object
3. Authenticate the user with your bank's standard authentication flow (e.g. username/password + OTP, biometrics)

::: info
The Hub's authorization server integration handles the PAR validation step if you are using the Hub-hosted authorization server option. If you run your own authorization server, you will need to integrate with the Hub's PAR store via the API Hub Authorization Server API.
:::



## Step 2 — Retrieving the Consent

Once the user is authenticated, retrieve the consent record from the Hub's Consent Manager to understand what the user is being asked to authorize.

### <span style="color: #16a34a; padding-right: 5px;">GET</span> `/consent/{consentId}`

```typescript
const consentResponse = await fetch(
  `${HUB_CONSENT_MANAGER_BASE}/consent/${consentId}`,
  {
    headers: {
      Authorization: `Bearer ${hubAccessToken}`,  // Hub-issued token for LFI
      'Content-Type': 'application/json',
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const consent = await consentResponse.json()
```

The response contains everything you need to render the consent screen:

```json
{
  "Data": {
    "ConsentId": "aac-consent-a3f1b2c4",
    "Status": "AwaitingAuthorization",
    "ConsentType": "urn:openfinanceuae:account-access-consent:v2.1",
    "Permissions": [
      "ReadAccountsBasic",
      "ReadAccountsDetail",
      "ReadBalances",
      "ReadTransactionsCredits",
      "ReadTransactionsDebits",
      "ReadTransactionsDetail"
    ],
    "ExpirationDateTime": "2027-03-02T00:00:00Z",
    "TransactionFromDateTime": "2025-01-01T00:00:00Z",
    "TransactionToDateTime": "2026-03-02T00:00:00Z"
  },
  "Risk": {}
}
```



## Step 3 — Presenting the Consent Screen

Render the **Consent Management Interface (CMI)** — the screen that shows the user exactly what they are being asked to authorize.

Your CMI must clearly display:

| Element | Description |
|---|---|
| **TPP name and logo** | The name of the third-party app requesting access |
| **Requested permissions** | Human-readable description of each permission (e.g. "View your account balances") |
| **Expiry date** | When the consent will expire |
| **Transaction date range** | If applicable, the date range for transaction history |
| **Account selection** | Allow the user to select which accounts to include |
| **Authorize / Cancel buttons** | Clear, prominent actions |

::: tip
See [User Experience](./user-journeys) for screen design requirements and the Consumer Duty obligations for CMI presentation.
:::



## Step 4 — User Decision: PATCH /consent/{consentId}

After the user makes a decision, call the Hub's Consent Manager to update the consent status.

### <span style="color: #f59e0b; padding-right: 5px;">PATCH</span> `/consent/{consentId}`

**If the user authorizes:**

```typescript
const patchResponse = await fetch(
  `${HUB_CONSENT_MANAGER_BASE}/consent/${consentId}`,
  {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${hubAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Data: {
        Status: 'Authorized',
        AccountIds: selectedAccountIds,   // accounts the user selected
      }
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)
```

**If the user cancels:**

```typescript
const patchResponse = await fetch(
  `${HUB_CONSENT_MANAGER_BASE}/consent/${consentId}`,
  {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${hubAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Data: {
        Status: 'Rejected',
      }
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)
```



## Step 5 — Completing the Flow

After patching the consent, call the Hub to finalize the authorization code flow and redirect the user back to the TPP.

### If the user authorized — <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/doconfirm`

This instructs the Hub to generate an authorization code and redirect the user back to the TPP's `redirect_uri`.

```typescript
const confirmResponse = await fetch(`${HUB_AUTH_SERVER_BASE}/doconfirm`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${hubAccessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    consentId,
    userId,   // the authenticated user's unique identifier at your bank
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { redirectUrl } = await confirmResponse.json()

// Redirect the user's browser to the TPP
res.redirect(redirectUrl)
```

### If the user cancelled — <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/dofail`

This instructs the Hub to redirect the user back to the TPP with an OAuth `access_denied` error.

```typescript
const failResponse = await fetch(`${HUB_AUTH_SERVER_BASE}/dofail`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${hubAccessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    consentId,
    errorCode: 'access_denied',
    errorDescription: 'User cancelled the consent authorization.',
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { redirectUrl } = await failResponse.json()

res.redirect(redirectUrl)
```

::: warning
Always redirect the user after calling `/doconfirm` or `/dofail`. Leaving the user on the consent screen without redirecting will result in a broken TPP experience.
:::



## Step 6 — Serving Resource API Requests

Once the TPP has exchanged the authorization code for an access token, it will start calling the account data endpoints via the Hub. The Hub validates the token and routes each request to your resource server.

Your resource server receives standard HTTP requests — the Hub injects the access token as a Bearer token in the Authorization header, and presents its mTLS client certificate.

### What you must implement

| Endpoint | Description |
|---|---|
| `GET /open-finance/v2.1/accounts` | Returns all accounts linked to the authorized consent |
| `GET /open-finance/v2.1/accounts/{AccountId}` | Returns details for a specific account |
| `GET /open-finance/v2.1/accounts/{AccountId}/balances` | Returns current balances |
| `GET /open-finance/v2.1/accounts/{AccountId}/transactions` | Returns transaction history |
| `GET /open-finance/v2.1/accounts/{AccountId}/beneficiaries` | Returns saved payees |
| `GET /open-finance/v2.1/accounts/{AccountId}/direct-debits` | Returns direct debits |
| `GET /open-finance/v2.1/accounts/{AccountId}/standing-orders` | Returns standing orders |
| `GET /open-finance/v2.1/accounts/{AccountId}/scheduled-payments` | Returns scheduled payments |
| `GET /open-finance/v2.1/accounts/{AccountId}/statements` | Returns statements |
| `GET /open-finance/v2.1/parties` | Returns the account holder's party information |

### Validating inbound requests

For each request your resource server receives from the Hub:

```typescript
// 1. Verify mTLS — confirm the client certificate matches the Hub's registered cert
// 2. Validate the Bearer token
const payload = await verifyJwt(bearerToken, {
  issuer: HUB_TOKEN_ISSUER,
  audience: YOUR_LFI_RESOURCE_SERVER_URL,
})

// 3. Extract consentId and check it is Authorized
const { consentId, scope, sub } = payload

// 4. Verify the requested AccountId is linked to this consent
const consent = await getConsentFromCache(consentId)
if (!consent.AccountIds.includes(accountId)) {
  return res.status(403).json({ error: 'account_not_linked' })
}
```

### Response format

All responses must follow the UAE Open Finance v2.1 JSON schema. Refer to the [API Hub Specifications — Data Sharing](/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/) for the full response schemas.

```json
{
  "Data": {
    "Account": [
      {
        "AccountId": "acc-00001",
        "Currency": "AED",
        "AccountType": "Personal",
        "AccountSubType": "CurrentAccount",
        "Nickname": "My Current Account",
        "Account": [
          {
            "SchemeName": "UAE.IBAN",
            "Identification": "AE070331234567890123456"
          }
        ]
      }
    ]
  },
  "Links": {
    "Self": "https://api.yourbank.ae/open-finance/v2.1/accounts"
  },
  "Meta": {
    "TotalPages": 1
  }
}
```

::: info Pagination
For endpoints that return lists (transactions, statements), implement pagination using the `Page` query parameter. The Hub forwards pagination parameters as-is from the TPP request.
:::

---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Products & Leads — API Guide

The Products & Leads API lets a TPP retrieve publicly available banking products from participating LFIs and present them to a user. Products are fetched from each LFI individually and aggregated for display. No user consent or redirect is required — the TPP authenticates directly with a client credentials grant.

Once the user selects a product they have two options: **Apply Now**, which directs them to the LFI using whichever application channel the LFI has configured, or **Request contact from bank**, which submits a lead to the LFI on the user's behalf.

## Prerequisites

Before calling the Products & Leads API, ensure the following requirements are met:

- **Registered [Application](../../../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **BDSP role** as defined in [Roles](../../../trust-framework/roles).

- **Valid [Transport Certificate](../../../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication**.

- **Valid [Signing Certificate](../../../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework for client authentication.

- **Understanding of [Tokens & Assertions](../../../security/tokens/)**
  You should understand how client authentication works with `private_key_jwt` before calling the token endpoint.

## API Sequence Flow

<APIFlowViewer title="Products & Leads API Flow">
  <APIFlowsProductsLeads/>
</APIFlowViewer>

## Steps 1 & 2 — Token request per LFI (in parallel)

Each LFI has its own authorisation server, so the TPP must obtain a separate access token for every LFI it intends to query. Because the token endpoint and `aud` claim differ per LFI, a new client assertion must also be built for each one.

These calls should all be made in parallel — do not wait for one LFI's token before requesting the next.

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!

// lfis — list of { lfiId, issuer, tokenEndpoint } from the Trust Framework Directory
const tokens = await Promise.all(
  lfis.map(async lfi => {
    const clientAssertion = await signJWT({
      iss: CLIENT_ID,
      sub: CLIENT_ID,
      aud: lfi.issuer,
      jti: crypto.randomUUID(),
    })

    const res = await fetch(lfi.tokenEndpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:            'client_credentials',
        scope:                 'products',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion:      clientAssertion,
      }).toString(),
      // agent: new https.Agent({ cert: transportCert, key: transportKey }),
    })

    const { access_token } = await res.json()
    return { lfiId: lfi.lfiId, apiBase: lfi.apiBase, access_token }
  })
)
```

```python [Python]
import httpx, uuid, asyncio
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]

# lfis — list of { lfi_id, issuer, token_endpoint, api_base } from the Trust Framework Directory
async def fetch_token(client, lfi):
    client_assertion = sign_jwt({
        "iss": CLIENT_ID,
        "sub": CLIENT_ID,
        "aud": lfi["issuer"],
        "jti": str(uuid.uuid4()),
    })
    res = await client.post(
        lfi["token_endpoint"],
        data={
            "grant_type":            "client_credentials",
            "scope":                 "products",
            "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            "client_assertion":      client_assertion,
        },
    )
    return { **lfi, "access_token": res.json()["access_token"] }

async def get_tokens(lfis):
    async with httpx.AsyncClient() as client:
        return await asyncio.gather(*[fetch_token(client, lfi) for lfi in lfis])
```

:::

See [Client Assertion](/tech/tpp-standards/security/tokens/client-assertion) for the full claims reference.

## Step 3 — GET /products per LFI (in parallel)

With a token for each LFI, call `GET /products` for all of them simultaneously. Aggregate the results into a single list before presenting them to the user.

Include `x-fapi-interaction-id` and `x-fapi-customer-ip-address` on every request. The `x-fapi-customer-ip-address` header is required because `GET /products` can only be called while a customer is in a live session with the TPP. See [Request Headers](/tech/tpp-standards/security/request-headers).

### Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `ProductCategory` | string | Filter by category — `SavingsAccount`, `CurrentAccount`, `CreditCard`, `Finance`, or `Mortgage` |
| `IsShariaCompliant` | boolean | Filter to Sharia-compliant products only |
| `LastUpdatedDateTime` | date-time | Return only products updated after this timestamp |
| `SortField` | string | Sort by `LastUpdatedDateTime` (default) or `ProductId` |
| `SortOrder` | string | `asc` (default) or `desc` |

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'

// tokens — output from Steps 1 & 2: [{ lfiId, apiBase, access_token }]
const results = await Promise.all(
  tokens.map(lfi =>
    fetch(`${lfi.apiBase}/open-finance/product/v2.1/products`, {
      headers: {
        'Authorization':              `Bearer ${lfi.access_token}`,
        'x-fapi-interaction-id':      crypto.randomUUID(),
        'x-fapi-customer-ip-address': customerIpAddress,
      },
      // agent: new https.Agent({ cert: transportCert, key: transportKey }),
    }).then(r => r.json())
  )
)

// Flatten all LFI product lists into a single array for display
const allProducts = results.flatMap(r => r.Data ?? [])
```

```python [Python]
import httpx, uuid, asyncio

# tokens — output from Steps 1 & 2: [{ lfi_id, api_base, access_token }]
async def fetch_products(client, lfi):
    res = await client.get(
        f"{lfi['api_base']}/open-finance/product/v2.1/products",
        headers={
            "Authorization":              f"Bearer {lfi['access_token']}",
            "x-fapi-interaction-id":      str(uuid.uuid4()),
            "x-fapi-customer-ip-address": customer_ip_address,
        },
    )
    return res.json()

async def get_all_products(tokens):
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(*[fetch_products(client, lfi) for lfi in tokens])
    # Flatten all LFI product lists into a single array for display
    return [item for r in results for item in (r.get("Data") or [])]
```

:::

### Response structure

Products are returned grouped by LFI. The `Data` array groups products by `LFIId`:

```json
{
  "Data": [
    {
      "LFIId": "ADCB",
      "LFIBrandId": "ADCB",
      "Products": [
        {
          "ProductId": "SAV-001",
          "ProductName": "Personal Savings Account",
          "ProductCategory": "SavingsAccount",
          "IsShariaCompliant": false,
          "Description": "An everyday savings account with competitive rates.",
          "DenominationCurrency": "AED",
          "ApplicationUri": "https://www.adcb.com/apply/savings",
          "KfsUri": "https://www.adcb.com/docs/savings-kfs.pdf",
          "Eligibility": {
            "ResidenceStatus": ["UaeResident"],
            "CustomerType": ["Retail"],
            "Age": [{ "Type": "MinimumAge", "Value": 18 }]
          }
        },
        {
          "ProductId": "SAV-002",
          "ProductName": "Al Hilal Savings",
          "ProductCategory": "SavingsAccount",
          "IsShariaCompliant": true,
          "ShariaStructure": "Murabaha",
          "AlternativeBrandName": "Al Hilal Savings",
          "Description": "A Sharia-compliant savings account.",
          "DenominationCurrency": "AED"
        }
      ]
    }
  ],
  "Links": { "Self": "https://api.lfi.ae/open-finance/product/v2.1/products" },
  "Meta": { "TotalPages": 1 }
}
```

::: tip Displaying products
Use the LFI's logo and brand name from the Trust Framework Directory. Do not rank or order products based on commercial agreements with specific LFIs — ordering must reflect the user's own preferences.
:::


See the [GET /products](./open-api/products) API reference for the full response schema.

## Step 4 — Apply Now

When a user selects a product and chooses to apply, the action depends on which application fields the LFI has populated. Check the fields in priority order:

| Field | Present | Action |
|-------|---------|--------|
| `ApplicationUri` | Yes | Redirect the user to this URL to complete the application on the LFI's own platform |
| `ApplicationPhoneNumber` | Yes | Display the phone number for the user to call the LFI |
| `ApplicationEmail` | Yes | Display the email address for the user to contact the LFI |
| `ApplicationDescription` | Yes | Display the free-text description of the LFI's application process |

An LFI may provide more than one of these fields. `ApplicationUri` is the preferred channel where available; the others provide fallback options for LFIs that do not have a direct online application.



## Step 5 — POST /leads

If the user instead chooses to request that the LFI contact them, the TPP submits a lead. The API Hub forwards it to the LFI and does **not** retain the data.

As with `GET /products`, include `x-fapi-customer-ip-address` on every request — leads can only be submitted while a customer is in a live session with the TPP.

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'

const leadResponse = await fetch(
  `${API_BASE}/open-finance/product/v2.1/leads`,
  {
    method:  'POST',
    headers: {
      'Authorization':              `Bearer ${access_token}`,
      'Content-Type':               'application/json',
      'x-fapi-interaction-id':      crypto.randomUUID(),
      'x-fapi-customer-ip-address': customerIpAddress,
    },
    body: JSON.stringify({
      Email:             'user@example.com',
      EmiratesId:        '784-1990-1234567-1',
      PhoneNumber:       '+971501234567',
      MarketingOptOut:   false,
      ProductCategories: ['SavingsAccount'],
      Name: {
        GivenName: 'Ibrahim',
        LastName:  'Al Suwaidi',
      },
    }),
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { LeadId } = await leadResponse.json()  // HTTP 201
```

```python [Python]
import httpx, uuid, os

lead_response = httpx.post(
    f"{api_base}/open-finance/product/v2.1/leads",
    headers={
        "Authorization":              f"Bearer {access_token}",
        "Content-Type":               "application/json",
        "x-fapi-interaction-id":      str(uuid.uuid4()),
        "x-fapi-customer-ip-address": customer_ip_address,
    },
    json={
        "Email":             "user@example.com",
        "EmiratesId":        "784-1990-1234567-1",
        "PhoneNumber":       "+971501234567",
        "MarketingOptOut":   False,
        "ProductCategories": ["SavingsAccount"],
        "Name": {
            "GivenName": "Ibrahim",
            "LastName":  "Al Suwaidi",
        },
    },
    # cert=("transport.crt", "transport.key"),
)

lead_id = lead_response.json()["LeadId"]  # HTTP 201
```

:::

### Lead request fields

| Field | Required | Description |
|-------|----------|-------------|
| `Email` | Yes | User's email address |
| `EmiratesId` | Yes | UAE Emirates ID number |
| `MarketingOptOut` | Yes | Whether the user has opted out of marketing communications |
| `ProductCategories` | Yes | One or more product categories the user is interested in |
| `Name` | Yes | User's name — `GivenName` + `LastName`, `FullName`, or `BusinessName` for business accounts |
| `PhoneNumber` | No | E.164 format, e.g. `+971501234567` |
| `Nationality` | No | ISO 3166-1 alpha-2 country code |
| `ResidentialAddress` | No | Structured address including `AddressLine`, `Country`, and optionally UAE `CountrySubDivision` |
| `LeadInformation` | No | Free-text notes about the lead |

::: warning User consent
Only submit a lead when the user has explicitly opted in to being contacted by the LFI. The `MarketingOptOut` field must accurately reflect the user's marketing preferences.
:::

See the [POST /leads](./open-api/leads) API reference for the full request and response schema.


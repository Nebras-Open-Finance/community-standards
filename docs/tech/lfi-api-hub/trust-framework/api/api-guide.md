---
next: false
prev: false
aside: false
---

🕒 **5 minute read**

# Trust Framework — API Guide

The Trust Framework directory provides a set of APIs that enable `Applications` within the framework to communicate and exchange data.

This guide explains how a registered Application can:

- Retrieve all registered Organisations
- Filter those Organisations to identify TPPs
- Retrieve the associated Software Statements for each TPP

These steps can be used, for example, to generate a report that cross-references Organisations with their corresponding Software Statement applications.


## Prerequisites


Before calling the TrustFramework API, ensure the following requirements are met:

- **Registered [Application](../../../../../trust-framework/application)**
  The application must be created within the Trust Framework.

- **Valid [Transport Certificate](../../../../../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication**.


## API Sequence Flow

<APIFlowViewer title="TrustFramework - Example">
  <APIFlowsTrustFramework />
</APIFlowViewer>


## Step 1 — Obtain an Access Token

The directory uses the OAuth 2.0 **client credentials** grant. POST to the directory's token endpoint, presenting your transport certificate over mTLS:

::: code-group

```typescript [Node.js]
import https from 'node:https'
import fs from 'node:fs'

const CLIENT_ID  = process.env.CLIENT_ID!
const AUTH_BASE  = process.env.DIRECTORY_AUTH_BASE!
// production:  https://matls-auth.directory.openfinance.ae
// sandbox:     https://matls-auth.sandbox.directory.openfinance.ae

const agent = new https.Agent({
  cert: fs.readFileSync(process.env.TRANSPORT_CERT_PATH!),
  key:  fs.readFileSync(process.env.TRANSPORT_KEY_PATH!),
})

const params = new URLSearchParams({
  grant_type: 'client_credentials',
  scope:      'directory:software',
  client_id:  CLIENT_ID,
})

const tokenResponse = await fetch(`${AUTH_BASE}/token`, {
  method:  'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body:    params.toString(),
  // @ts-expect-error — Node fetch accepts agent via undici dispatcher or a polyfill
  agent,
})

const { access_token } = await tokenResponse.json()
```

```python [Python]
import os
import httpx

CLIENT_ID  = os.environ["CLIENT_ID"]
AUTH_BASE  = os.environ["DIRECTORY_AUTH_BASE"]
# production:  https://matls-auth.directory.openfinance.ae
# sandbox:     https://matls-auth.sandbox.directory.openfinance.ae

cert = (os.environ["TRANSPORT_CERT_PATH"], os.environ["TRANSPORT_KEY_PATH"])

token_response = httpx.post(
    f"{AUTH_BASE}/token",
    data={
        "grant_type": "client_credentials",
        "scope":      "directory:software",
        "client_id":  CLIENT_ID,
    },
    cert=cert,
)

access_token = token_response.json()["access_token"]
```

:::

See the [POST /token](./token) API reference for the full request and response schema.

## Step 2 — List all Organisations

With the token, call the `/organisations` endpoint to retrieve every organisation registered in the directory:

::: code-group

```typescript [Node.js]
const API_BASE = process.env.DIRECTORY_API_BASE!
// production:  https://matls-api.directory.openfinance.ae
// sandbox:     https://matls-api.sandbox.directory.openfinance.ae

const orgsResponse = await fetch(`${API_BASE}/organisations`, {
  headers: { Authorization: `Bearer ${access_token}` },
  // @ts-expect-error
  agent,
})

const organisations: Organisation[] = await orgsResponse.json()
```

```python [Python]
import httpx

API_BASE = os.environ["DIRECTORY_API_BASE"]
# production:  https://matls-api.directory.openfinance.ae
# sandbox:     https://matls-api.sandbox.directory.openfinance.ae

orgs_response = httpx.get(
    f"{API_BASE}/organisations",
    headers={"Authorization": f"Bearer {access_token}"},
    cert=cert,
)

organisations = orgs_response.json()
```

:::

### Key response fields

| Field | Type | Description |
|-------|------|-------------|
| `OrganisationId` | string | Unique identifier for the organisation — used in subsequent calls |
| `OrganisationName` | string | Human-readable name of the organisation |
| `Size` | string ≤ 255 chars, `^[^<>]*$` | **Organisation type** — `"TPP"` for Third Party Providers, `"LFI"` for Licensed Financial Institutions. Use this field to filter results to TPPs only. |
| `Status` | string | Registration status, e.g. `Active` |
| `CreatedOn` | string (ISO 8601) | Date the organisation was registered |

See the [GET /organisations](./organisations) API reference for the full response schema.

## Step 3 — Filter for TPPs

The `/organisations` response includes both LFIs and TPPs. Use the `Size` field to narrow the list to TPPs only before iterating:

::: code-group

```typescript [Node.js]
const tpps = organisations.filter((org: Organisation) => org.Size === 'TPP')
```

```python [Python]
tpps = [org for org in organisations if org.get("Size") == "TPP"]
```

:::

## Step 4 — Retrieve Software Statements

For each TPP from Step 3, call the `/softwarestatements` sub-resource using its `OrganisationId`:

::: code-group

```typescript [Node.js]
interface SoftwareStatement {
  SoftwareStatementId: string
  SoftwareClientName:  string
  Status:              string
  // … additional fields
}

const allSoftwareStatements: (SoftwareStatement & { OrganisationId: string; OrganisationName: string })[] = []

for (const org of tpps) {
  const orgId   = org.OrganisationId
  const orgName = org.OrganisationName ?? 'Unknown'

  const ssResponse = await fetch(
    `${API_BASE}/organisations/${orgId}/softwarestatements`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      // @ts-expect-error
      agent,
    }
  )

  const statements: SoftwareStatement[] = await ssResponse.json()

  for (const ss of statements) {
    allSoftwareStatements.push({ ...ss, OrganisationId: orgId, OrganisationName: orgName })
  }
}
```

```python [Python]
all_software_statements = []

for org in tpps:
    org_id   = org["OrganisationId"]
    org_name = org.get("OrganisationName", "Unknown")

    ss_response = httpx.get(
        f"{API_BASE}/organisations/{org_id}/softwarestatements",
        headers={"Authorization": f"Bearer {access_token}"},
        cert=cert,
    )

    statements = ss_response.json()

    for ss in statements:
        all_software_statements.append({
            **ss,
            "OrganisationId":   org_id,
            "OrganisationName": org_name,
        })
```

:::

### Key response fields

| Field | Type | Description |
|-------|------|-------------|
| `SoftwareStatementId` | string | Unique identifier for the Software Statement |
| `SoftwareClientName` | string | Human-readable name of the client application |
| `Status` | string | Status of the Software Statement, e.g. `Active` |
| `SoftwareRoles` | string[] | Roles assigned to this application (e.g. `AISP`, `PISP`) |
| `OrganisationId` | string | The owning organisation (not always returned inline — join from Step 2) |

See the [GET /softwarestatements](./software-statements) API reference for the full response schema.


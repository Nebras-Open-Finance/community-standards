---
next: false
prev: false
aside: false
---

# Confirmation of Payee — API Guide

Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or business before initiating a payment.

## API Sequence Flow

<APIFlowViewer title="Confirmation of Payee API Flow">
  <APIFlowsConfirmationOfPayee/>
</APIFlowViewer>


## <span style="color: #3b82f6; padding-right: 5px;">POST</span> `/customers/action/cop-query`

### Request headers

| Header | Required | Description |
|--------|----------|-------------|
| `o3-provider-id` | Yes | Identifier for your LFI registered in the Hub |
| `o3-aspsp-id` | Yes *(deprecated)* | Deprecated alias for `o3-provider-id`. Will be removed in a future version — use `o3-provider-id` |
| `o3-caller-org-id` | Yes | Organisation ID of the TPP making the underlying request |
| `o3-caller-client-id` | Yes | OIDC client ID of the TPP application |
| `o3-caller-software-statement-id` | Yes | Software statement ID of the TPP application |
| `o3-api-uri` | Yes | The parameterised URL of the API being called by the TPP |
| `o3-api-operation` | Yes | The HTTP method of the operation carried out by the TPP (e.g. `POST`) |
| `o3-ozone-interaction-id` | Yes | Hub-generated interaction ID. Equals `o3-caller-interaction-id` if the TPP provided one |
| `o3-caller-interaction-id` | No | Interaction ID passed in by the TPP, if present |

### Query parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | Yes | `1` | Page number for paginated results |
| `page-size` | Yes | `100` | Number of records per page |

### Request body

`Content-Type: application/json`

The Hub sends a plain JSON body — not a JWS. The body always contains a single account identified by IBAN and a name to match against.

#### `data.account`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `schemeName` | string | Yes | Always `IBAN` |
| `identification` | string | Yes | The IBAN to look up |
| `name` | object | Yes | Either a `PersonName` or `BusinessName` — see below |

#### `PersonName`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fullName` | string | Yes | The full name of the person as submitted by the TPP |
| `firstName` | string | No | Given name, if provided by the TPP |
| `lastName` | string | No | Family name, if provided by the TPP |

#### `BusinessName`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `businessName` | string | Yes | The business name as submitted by the TPP |

#### Example — personal name

```json
{
  "data": {
    "account": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456",
      "name": {
        "fullName": "Ahmed Al Mansouri",
        "firstName": "Ahmed",
        "lastName": "Al Mansouri"
      }
    }
  }
}
```

#### Example — business name

```json
{
  "data": {
    "account": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456",
      "name": {
        "businessName": "Al Mansouri Trading LLC"
      }
    }
  }
}
```

### Response

`Content-Type: application/json`

Return `200` in all lookup scenarios — whether the account is found or not. The Hub interprets the `data` array contents to determine the match result returned to the TPP.

#### `200` — Account found

Return a `data` array containing one record per account holder. Joint accounts may return multiple records.

##### Personal account

`verifiedClaims[].claims.fullName` is mandatory. Include `givenName` and `familyName` if your system holds them separately — the Hub uses these to improve match precision.

```json
{
  "data": [
    {
      "id": "cust-001",
      "verifiedClaims": [
        {
          "verification": {
            "trustFramework": "UAE.FI"
          },
          "claims": {
            "fullName": "Ahmed Al Mansouri",
            "givenName": "Ahmed",
            "familyName": "Al Mansouri"
          }
        }
      ]
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
```

##### Business account

Populate `verifiedClaims[].organisationClaims.name` with the registered business name on the account.

```json
{
  "data": [
    {
      "id": "cust-002",
      "verifiedClaims": [
        {
          "verification": {
            "trustFramework": "UAE.FI"
          },
          "organisationClaims": {
            "name": "Al Mansouri Trading LLC"
          }
        }
      ]
    }
  ],
  "meta": {
    "totalPages": 1,
    "totalRecords": 1
  }
}
```

#### `200` — Account not found, opted out

Return `200` with an empty `data` array for scenarios where no account was found matching the IBAN or if the accont opted out of CoP (). Do not use `404` or `204` — the Hub expects `200` and treats an empty array as a no-result response.

```json
{
  "data": [],
  "meta": {
    "totalPages": 0,
    "totalRecords": 0
  }
}
```

#### Error responses

All error bodies must include `errorCode` and `errorMessage`.

##### `403` — Forbidden

| `errorCode` | `errorMessage` | When to use |
|-------------|----------------|-------------|
| `Consent.AccountTemporarilyBlocked` | `The account is blocked from receiving payments.` | The account is blocked from receiving payments for a temporary reason — e.g. account status is `Suspended` |
| `Consent.PermanentAccountAccessFailure` | `The account is blocked from receiving payments.` | The account is blocked from receiving payments permanently — e.g. account status is `Closed`, `Deceased`, or `Unclaimed` |

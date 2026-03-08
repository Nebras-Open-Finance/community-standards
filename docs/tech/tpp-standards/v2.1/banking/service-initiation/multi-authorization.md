---
next: false
prev: false
aside: false
---

# Multi-Authorization

The Open Finance standards support payment journeys that require more than one authorizer. This guide explains how TPPs and LFIs must coordinate multi-authorization for payment consents and how the consent lifecycle is reflected in API calls and responses.

<APIFlowViewer title="Multi-Authorization">
  <APIFlowsMultiAuthorization/>
</APIFlowViewer>

## Indicating multi-authorization support (PAR)

When submitting the Pushed Authorization Request (PAR), the TPP MUST set `IsSingleAuthorization`:

- `true` — only a single authorizer is supported for the payment.
- `false` — multiple authorizers are supported (multi-authorization enabled).

This flag is carried in the Rich Authorization Request (`authorization_details[].consent.IsSingleAuthorization`) defined in the Authorization Endpoints OpenAPI (`docs/public/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml`).

## LFI behavior before account selection

Before showing eligible accounts during the consent journey, the LFI checks `IsSingleAuthorization` from the PAR request:

- If `true`: allow selection only from accounts that require a single authorizer. If none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an appropriate error.
- If `false`: allow selection from accounts that require either single or multiple authorizers.

## Managing the authorization flow

After the first user authorizes:

1. **Inform OFH of required authorizers** by PATCHing the consent to include `Meta.MultipleAuthorizers`.
2. **Keep consent status as `AwaitingAuthorization`** (do **not** set `Status=Authorized` yet).
3. **Redirect back to the TPP** via `/doConfirm` once the PATCH is accepted.

Example: PATCH `consents/{consentId}` after first authorizer (still awaiting others):

```json
{
  "psuIdentifiers": {
    "userId": "52738e3b-eacf-4a7c-a73b-da01caa45c3f"
  },
  "accountIds": [
    "100004000000000000000001",
    "100004000000000000000003",
    "100004000000000000000004"
  ],
  "consentBody": {
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
```

The TPP receives the redirect/callback, exchanges the authorization code at `/token`, and receives an access token **plus** the consent object still marked `AwaitingAuthorization`, including the `Meta.MultipleAuthorizers` structure above.

## Tracking additional authorizations

The LFI must PATCH the consent after each additional authorization to reflect progress:

- If any required authorizer rejects → set `Status=Rejected`.
- When all required authorizers approve → set `Status=Authorized`.

### Example: one authorizer approved, another still pending

```json
{
  "consentBody": {
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
```

### Example: final approval — consent becomes Authorized

```json
{
  "consentBody": {
    "Data": {
      "Status": "Authorized"
    },
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T08:10:02Z",
            "AuthorizationStatus": "Approved"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
```

### Example: a required authorizer rejects — consent becomes Rejected

```json
{
  "consentBody": {
    "Data": {
      "Status": "Rejected"
    },
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Rejected"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}
```

## Consent status and payment initiation

- The TPP MAY initiate the payment only after `Status=Authorized`.
- Additional authorizers must act before the consent’s `ExpirationDateTime`.
- TPPs can track status by:
  - Subscribing to event notifications; or
  - Polling `GET /payment-consents/{ConsentId}`.

Once the consent is Authorized, subsequent `/token` responses and related payment operations will reflect the final status per the Authorization Endpoints OpenAPI.

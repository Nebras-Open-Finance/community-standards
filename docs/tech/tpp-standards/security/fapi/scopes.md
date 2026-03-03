---
prev: false
next: false
aside: false
---

# OAuth 2.0 Scopes

Scopes define what your application is requesting permission to do on behalf of the user. They are declared in the `scope` field of your [Request JWT](./request-jwt) and echoed back in the access token issued by the Authorization Server.

In UAE Open Finance, scopes are **consent-bound** — the scope alone does not grant access. The `authorization_details` in your request object describes the specific consent (account access permissions, payment details, etc.), and the scope indicates which API family the consent belongs to.

## Available Scopes

| Scope | API | Description |
|-------|-----|-------------|
| `openid` | All | Activates OpenID Connect support. Required on every request — enables the Authorization Server to return an ID Token alongside the access token |
| `accounts` | [Bank Data Sharing](../../banking/data-sharing/api-guide) | Grants access to account information APIs (`/accounts`, `/balances`, `/transactions`, etc.). The access token is bound to the `account-access-consent` from `authorization_details` |
| `payments` | [Service Initiation](../../banking/service-initiation/domestic-payments/single-instant-payment/api-guide) | Grants access to payment initiation APIs (`/payments`). The access token is bound to the payment consent from `authorization_details`. Also grants read access to account information required for payment context |
| `products` | Products & Leads | Grants access to product discovery and leads APIs. Does not require a user consent flow |

## Combining Scopes

Scopes are space-separated in the `scope` field. Always include `openid`.

| Use Case | Scope Value |
|----------|-------------|
| Bank Data Sharing | `accounts openid` |
| Payment Initiation | `payments openid` |
| Products (public data) | `products openid` |

::: warning Consent-bound access tokens
For `accounts` and `payments`, the access token issued by the Authorization Server is cryptographically bound to the specific consent created in your `authorization_details`. The token cannot be used to access resources outside that consent's permissions.
:::

## Using Scopes in the Request JWT

Scopes are declared in the `scope` claim of the Request JWT payload:

```json
{
  "aud": "https://auth1.[LFICode].apihub.openfinance.ae",
  "iss": "your-client-id",
  "client_id": "your-client-id",
  "scope": "accounts openid",
  "redirect_uri": "https://yourapp.com/callback",
  "response_type": "code",
  "code_challenge_method": "S256",
  "code_challenge": "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
  "nonce": "n-0S6_WzA2Mj",
  "state": "af0ifjsldkj",
  "authorization_details": [
    {
      "type": "urn:openfinanceuae:account-access-consent:v2.1",
      "consent": { "..." : "..." }
    }
  ]
}
```

## Scope Validation Errors

If the scope in your Request JWT does not match any of the supported values, or is inconsistent with the `authorization_details` type, the Authorization Server will reject the request with:

| Error | Description |
|-------|-------------|
| `invalid_scope` | The requested scope is unknown or not supported by this Authorization Server |
| `AccessToken.InvalidScope` | The access token presented to a resource endpoint does not have the scope required for that operation |

## Parameterized Scopes

The `accounts` and `payments` scopes are described in the OpenAPI specifications as *parameterized with the ConsentId*. This means the issued access token internally encodes the consent it was granted against. When presenting the token to a resource endpoint, the server validates that the requested resource falls within the permissions of the bound consent — this is handled automatically by the Authorization Server and is transparent to your application.

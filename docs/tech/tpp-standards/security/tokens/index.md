---
prev: false
next: false
aside: false
---

# Tokens

In UAE Open Finance, your application uses two types of OAuth 2.0 bearer tokens to make API calls on behalf of a consenting customer.

| Token | Purpose | Lifetime |
|-------|---------|---------|
| **Access token** | Authorises individual API requests | 10 minutes |
| **Refresh token** | Obtains new access tokens without re-authorising the customer | Duration of the consent |

---

## Access Tokens

An **access token** is a short-lived credential that your application includes in the `Authorization` header of every protected API call:

```http
GET /open-finance/v2.1/accounts HTTP/1.1
Authorization: Bearer <access_token>
```

Access tokens expire after **10 minutes**. Once expired, any API call using that token will receive a `401 Unauthorized` response. Your application must silently refresh the access token using the refresh token before retrying.

::: tip Token expiry handling
Check the `expires_in` field returned by the `/token` endpoint (value: `600` seconds). Track the issue time and proactively refresh before the window closes rather than waiting for a 401.
:::

---

## Refresh Tokens

A **refresh token** allows your application to obtain a new access token without prompting the customer to re-authorise. It is issued alongside the access token during the authorisation code exchange.

The refresh token remains valid for the **lifetime of the consent**. Once the consent expires — determined by its `ExpirationDateTime` — the refresh token is also invalidated and the customer must re-authorise.

::: info Consent lifetime
The `ExpirationDateTime` is set when the consent resource is created and returned in the consent response object. See the [Consent API Guide](/tech/tpp-standards/v2.1/consent/api-guide) for details on consent lifecycle and expiry.
:::

To exchange a refresh token for a new access token, POST to the `/token` endpoint with `grant_type=refresh_token` and a freshly signed [client assertion](#generating-a-client-assertion).


See the [Token endpoint API Reference](/tech/tpp-standards/security/tokens/open-api/token) for the full request and response schema.

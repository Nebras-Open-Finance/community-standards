### Token refresh for subsequent payments

The initial access token expires after 10 minutes. For subsequent on-demand payments, use the `refresh_token` to obtain a new access token without re-involving the user:

::: code-group

```typescript [Node.js]
const refreshResponse = await fetch(`${ISSUER}/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'refresh_token',
    refresh_token:         storedRefreshToken,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token: newToken, refresh_token: newRefresh } = await refreshResponse.json()
// Update your stored tokens
```

```python [Python]
refresh_response = httpx.post(
    f"{ISSUER}/token",
    data={
        "grant_type":            "refresh_token",
        "refresh_token":         stored_refresh_token,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = refresh_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
# Update your stored tokens
```

:::

See [Tokens & Assertions](/tech/tpp-standards/security/tokens) for refresh token lifetimes and rotation policy.

### Step 8 - POST /token (Authorization Code)

::: code-group

```typescript [Node.js]
const tokenResponse = await fetch(`${ISSUER}/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'authorization_code',
    code,
    redirect_uri:          REDIRECT_URI,
    code_verifier:         codeVerifier,            // from Step 3
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token, refresh_token, expires_in } = await tokenResponse.json()
```

```python [Python]
token_response = httpx.post(
    f"{ISSUER}/token",
    data={
        "grant_type":            "authorization_code",
        "code":                  code,
        "redirect_uri":          REDIRECT_URI,
        "code_verifier":         code_verifier,     # from Step 3
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = token_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
expires_in    = tokens["expires_in"]    # 600 — access token lasts 10 minutes
```

:::

::: tip Token storage
Never store tokens in `localStorage`. Use `httpOnly` cookies or a server-side session store. See [Tokens & Assertions](/tech/tpp-standards/security/tokens) for the full token lifecycle.
:::

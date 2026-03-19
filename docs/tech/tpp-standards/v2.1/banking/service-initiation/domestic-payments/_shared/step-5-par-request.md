### Step 5 - Sending the /par Request

Include `x-fapi-interaction-id` on the request — the API Hub echoes it in the response for end-to-end traceability. See [Request Headers](/tech/tpp-standards/security/request-headers).

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'

const parResponse = await fetch(`${ISSUER}/par`, {
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
    # cert=("transport.crt", "transport.key"),
)

data        = par_response.json()
request_uri = data["request_uri"]
expires_in  = data["expires_in"]
```

:::

::: info mTLS transport certificate
You must present your **transport certificate** on every connection to the Authorization Server and resource APIs. See [Certificates](/tech/tpp-standards/trust-framework/certificates).
:::

| Field | Description | Example |
|-------|-------------|---------|
| `request_uri` | Single-use reference to your pushed authorization request | `urn:ietf:params:oauth:request-uri:bwc4JDpSd7` |
| `expires_in` | Seconds until the `request_uri` expires — redirect the user before this window closes | `90` |

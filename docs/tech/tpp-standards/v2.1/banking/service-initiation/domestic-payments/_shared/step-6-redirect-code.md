::: code-group

```typescript [Node.js]
// authorization_endpoint from .well-known/openid-configuration
// e.g. 'https://auth1.altareq1.sandbox.apihub.openfinance.ae/authorize'
const AUTHORIZATION_ENDPOINT = discoveryDoc.authorization_endpoint

const authCodeUrl = `${AUTHORIZATION_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&scope=openid&request_uri=${encodeURIComponent(request_uri)}`

window.location.href = authCodeUrl
// or server-side: res.redirect(authCodeUrl)
```

```python [Python]
import urllib.parse

AUTHORIZATION_ENDPOINT = discovery_doc["authorization_endpoint"]

auth_code_url = (
    f"{AUTHORIZATION_ENDPOINT}"
    f"?client_id={CLIENT_ID}"
    f"&response_type=code"
    f"&scope=openid"
    f"&request_uri={urllib.parse.quote(request_uri)}"
)
# redirect the user to auth_code_url
```

:::

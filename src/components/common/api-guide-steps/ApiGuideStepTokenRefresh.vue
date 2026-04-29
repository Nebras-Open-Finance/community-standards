<script setup lang="ts">
const node = `// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

const refreshResponse = await fetch(TOKEN_ENDPOINT, {
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
`

const python = `# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
token_endpoint = discovery_doc["token_endpoint"]

refresh_response = httpx.post(
    token_endpoint,
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
`

const tabs = [
  { label: 'Node.js', lang: 'typescript', code: node },
  { label: 'Python',  lang: 'python',     code: python },
] as const
</script>

<template>
  <div class="ag-step">
    <EdProse>
      The initial access token expires after 10 minutes. For subsequent on-demand payments, use the
      <code>refresh_token</code> to obtain a new access token without re-involving the user:
    </EdProse>

    <EdCodeGroup :tabs="tabs" />

    <EdProse>
      See <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a> for refresh token
      lifetimes and rotation policy.
    </EdProse>
  </div>
</template>

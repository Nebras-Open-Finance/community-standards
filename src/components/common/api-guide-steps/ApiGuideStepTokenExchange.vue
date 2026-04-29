<script setup lang="ts">
const node = `// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

const tokenResponse = await fetch(TOKEN_ENDPOINT, {
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
`

const python = `# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
token_endpoint = discovery_doc["token_endpoint"]

token_response = httpx.post(
    token_endpoint,
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
`

const tabs = [
  { label: 'Node.js', lang: 'typescript', code: node },
  { label: 'Python',  lang: 'python',     code: python },
] as const
</script>

<template>
  <div class="ag-step">
    <EdCodeGroup :tabs="tabs" />

    <EdNote type="tip" title="Token storage">
      <p>
        Never store tokens in <code>localStorage</code>. Use <code>httpOnly</code> cookies or a
        server-side session store. See
        <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a> for the full token
        lifecycle.
      </p>
    </EdNote>
  </div>
</template>

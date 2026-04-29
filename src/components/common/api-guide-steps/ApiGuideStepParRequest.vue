<script setup lang="ts">
const node = `import crypto from 'node:crypto'

// PAR endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const PAR_ENDPOINT = discoveryDoc.pushed_authorization_request_endpoint

const parResponse = await fetch(PAR_ENDPOINT, {
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
`

const python = `import httpx, uuid

# PAR endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
par_endpoint = discovery_doc["pushed_authorization_request_endpoint"]

par_response = httpx.post(
    par_endpoint,
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
`

const tabs = [
  { label: 'Node.js', lang: 'typescript', code: node },
  { label: 'Python',  lang: 'python',     code: python },
] as const
</script>

<template>
  <div class="ag-step">
    <EdProse>
      Include <code>x-fapi-interaction-id</code> on the request &mdash; the API Hub echoes it in the
      response for end-to-end traceability. See
      <a href="/tech/tpp-standards/security/request-headers">Request Headers</a>.
    </EdProse>

    <EdCodeGroup :tabs="tabs" />

    <EdNote type="info" title="mTLS transport certificate">
      <p>
        You must present your <strong>transport certificate</strong> on every connection to the API Hub
        and resource APIs. See
        <a href="/tech/tpp-standards/trust-framework/certificates">Certificates</a>.
      </p>
    </EdNote>

    <EdRefTable>
      <table>
        <thead>
          <tr><th>Field</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><code>request_uri</code></td><td>Single-use reference to your pushed authorization request</td><td><code>urn:ietf:params:oauth:request-uri:bwc4JDpSd7</code></td></tr>
          <tr><td><code>expires_in</code></td><td>Seconds until the <code>request_uri</code> expires &mdash; redirect the user before this window closes</td><td><code>90</code></td></tr>
        </tbody>
      </table>
    </EdRefTable>
  </div>
</template>

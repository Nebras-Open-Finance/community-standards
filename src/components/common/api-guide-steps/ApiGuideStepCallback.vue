<script setup lang="ts">
const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`

const node = `const params = new URLSearchParams(window.location.search)

const code  = params.get('code')!
const state = params.get('state')!
const iss   = params.get('iss')!

if (state !== storedState) throw new Error('State mismatch — possible CSRF attack')
if (iss !== ISSUER)        throw new Error(\`Unexpected issuer: \${iss}\`)
`

const python = `from urllib.parse import urlparse, parse_qs

params = parse_qs(urlparse(callback_url).query)
code  = params["code"][0]
state = params["state"][0]
iss   = params["iss"][0]

if state != stored_state: raise ValueError("State mismatch — possible CSRF attack")
if iss != ISSUER:         raise ValueError(f"Unexpected issuer: {iss}")
`

const tabs = [
  { label: 'Node.js', lang: 'typescript', code: node },
  { label: 'Python',  lang: 'python',     code: python },
] as const
</script>

<template>
  <div class="ag-step">
    <EdProse>After the user approves, the bank redirects to your <code>redirect_uri</code>:</EdProse>

    <EdCode :code="callbackUrl" lang="plaintext" filename="callback URL" />

    <EdCodeGroup :tabs="tabs" />

    <EdProse>
      See <a href="/tech/tpp-standards/security/fapi/handling-callback">Handling Authorization
      Callbacks</a> for a full guide on state validation, issuer verification, and replay prevention.
    </EdProse>
  </div>
</template>

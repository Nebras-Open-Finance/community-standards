<script setup lang="ts">
const node = `import crypto from 'node:crypto'
import { signJWT } from './sign-jwt'

const CLIENT_ID = process.env.CLIENT_ID!
const ISSUER    = process.env.AUTHORIZATION_SERVER_ISSUER!

async function buildClientAssertion(): Promise<string> {
  return signJWT({
    iss: CLIENT_ID,
    sub: CLIENT_ID,
    aud: ISSUER,
    jti: crypto.randomUUID(),
  })
}
`

const python = `import os
import uuid
from sign_jwt import sign_jwt

CLIENT_ID = os.environ["CLIENT_ID"]
ISSUER    = os.environ["AUTHORIZATION_SERVER_ISSUER"]

def build_client_assertion() -> str:
    return sign_jwt({
        "iss": CLIENT_ID,
        "sub": CLIENT_ID,
        "aud": ISSUER,
        "jti": str(uuid.uuid4()),
    })
`

const tabs = [
  { label: 'Node.js', lang: 'typescript', code: node },
  { label: 'Python',  lang: 'python',     code: python },
] as const
</script>

<template>
  <div class="ag-step">
    <EdProse>
      Use the
      <a href="/tech/tpp-standards/security/fapi/message-signing#signing-a-jwt"><code>signJWT()</code></a>
      helper to build a client assertion proving your application's identity:
    </EdProse>

    <EdCodeGroup :tabs="tabs" />

    <EdProse>
      See <a href="/tech/tpp-standards/security/tokens/client-assertion">Client Assertion</a> for the
      full claims reference.
    </EdProse>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useSharedState } from './Composables/useSharedState.ts'

const { sharedState } = useSharedState()
const jws = ref('...')

function b64url(str) {
  return btoa(Array.from(new TextEncoder().encode(str), b => String.fromCharCode(b)).join(''))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

watchEffect(async () => {
  const data = sharedState.value?.copData
  if (!data) return

  const hdr = b64url(JSON.stringify({ alg: 'HS256', kid: 'demo' }))
  const pld = b64url(JSON.stringify({ iss: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae', message: { Data: data } }))

  try {
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode('demo-key'),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    )
    const raw = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${hdr}.${pld}`))
    const sig = btoa(String.fromCharCode(...new Uint8Array(raw)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    jws.value = `${hdr}.${pld}.${sig}`
  } catch {
    jws.value = `${hdr}.${pld}.demo`
  }
})
</script>

<template>
  <div class="pii-block">
    <div class="pii-header">
      <span class="pii-label">Domestic Payment PII</span>
      <span class="pii-sub">signed JWS embedded in the creditor PII block (Demo Only)</span>
    </div>
    <pre class="pii-code">{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ibrahim Al Sabah" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ibrahim Al Sabah" }
        },
        "ConfirmationOfPayeeResponse": "<span class="jws">{{ jws }}</span>"
      }
    ]
  }
}</pre>
  </div>
</template>

<style scoped>
.pii-block {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
}
.pii-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  flex-wrap: wrap;
}
.pii-label {
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
.pii-sub {
  font-size: 0.9rem;
}
.pii-code {
  padding: 1rem;
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.jws {
  color: #a6e3a1;
}
</style>

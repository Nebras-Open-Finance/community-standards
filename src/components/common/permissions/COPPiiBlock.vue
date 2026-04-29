<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useSharedState } from '../composables/useSharedState'

const { sharedState } = useSharedState()
const jws = ref('…')

function b64url(str: string): string {
  return btoa(Array.from(new TextEncoder().encode(str), (b) => String.fromCharCode(b)).join(''))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

watchEffect(async () => {
  const data = (sharedState as { value?: { copData?: unknown } }).value?.copData
  if (!data) return

  const hdr = b64url(JSON.stringify({ alg: 'HS256', kid: 'demo' }))
  const pld = b64url(JSON.stringify({
    iss: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae',
    message: { Data: data },
  }))

  try {
    const key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode('demo-key'),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
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
  <section class="cop">
    <header class="cop__header">
      <span class="cop__eyebrow">
        <span class="cop__eyebrow-dash" />
        Domestic Payment PII
      </span>
      <span class="cop__subtitle">signed JWS embedded in the creditor PII block (demo only)</span>
    </header>

    <pre class="cop__code"><code><span class="cop__punc">{</span>
  <span class="cop__key">"Initiation"</span><span class="cop__punc">:</span> <span class="cop__punc">{</span>
    <span class="cop__key">"Creditor"</span><span class="cop__punc">:</span> <span class="cop__punc">[</span>
      <span class="cop__punc">{</span>
        <span class="cop__key">"Creditor"</span><span class="cop__punc">:</span> <span class="cop__punc">{</span> <span class="cop__key">"Name"</span><span class="cop__punc">:</span> <span class="cop__str">"Ibrahim Al Sabah"</span> <span class="cop__punc">}</span><span class="cop__punc">,</span>
        <span class="cop__key">"CreditorAccount"</span><span class="cop__punc">:</span> <span class="cop__punc">{</span>
          <span class="cop__key">"SchemeName"</span><span class="cop__punc">:</span> <span class="cop__str">"IBAN"</span><span class="cop__punc">,</span>
          <span class="cop__key">"Identification"</span><span class="cop__punc">:</span> <span class="cop__str">"AE070331234567890123456"</span><span class="cop__punc">,</span>
          <span class="cop__key">"Name"</span><span class="cop__punc">:</span> <span class="cop__punc">{</span> <span class="cop__key">"en"</span><span class="cop__punc">:</span> <span class="cop__str">"Ibrahim Al Sabah"</span> <span class="cop__punc">}</span>
        <span class="cop__punc">}</span><span class="cop__punc">,</span>
        <span class="cop__key">"ConfirmationOfPayeeResponse"</span><span class="cop__punc">:</span> <span class="cop__jws">"{{ jws }}"</span>
      <span class="cop__punc">}</span>
    <span class="cop__punc">]</span>
  <span class="cop__punc">}</span>
<span class="cop__punc">}</span></code></pre>
  </section>
</template>

<style scoped>
.cop {
  margin: 1.5rem 0;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
  overflow: hidden;
}

.cop__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.cop__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
}
.cop__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }
.cop__subtitle {
  font-size: 0.82rem;
  color: var(--at-mute-2);
}

.cop__code {
  margin: 0;
  padding: 1rem 1.2rem;
  background: var(--at-bg-paper);
  font-family: var(--at-mono);
  font-size: 0.78rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  tab-size: 2;
}

.cop__punc { color: var(--at-mute); }
.cop__key  { color: var(--at-blue-deep); }
.cop__str  { color: var(--at-teal-deep); }
.cop__jws  {
  color: var(--at-gold);
  word-break: break-all;
  background: color-mix(in srgb, var(--at-gold-soft) 60%, transparent);
  padding: 0 0.2em;
}
</style>

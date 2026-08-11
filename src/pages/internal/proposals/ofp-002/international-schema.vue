<route lang="yaml">
meta:
  layout: internal
  title: 'OFP-002 · International payment schema (draft)'
</route>

<script setup lang="ts">
// Renders the co-located OFP-002 international draft schema with the shared Redoc
// wrapper — the same renderer (and EndpointPage chrome) used for the published API
// specs. The YAML lives in this folder and is imported raw (glob form keeps
// TypeScript happy without a per-file ?raw module declaration), handed to
// RedocWrapper via `specText` so no fetchable URL is needed, and offered as a
// client-side Download .yaml.
import { useHead } from '@unhead/vue'

useHead({ title: 'OFP-002 · International payment schema (draft)' })

const sources = import.meta.glob('./*.yaml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const spec = sources['./international-payment-schema.yaml'] ?? ''

function downloadYaml(): void {
  if (typeof document === 'undefined') return
  const blob = new Blob([spec], { type: 'application/yaml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ofp-002-international-payment-schema.yaml'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <EndpointPage
    eyebrow="OFP-002 · Draft schema · International"
    title="International payment schema"
    version="Draft · V2.2"
    method="POST"
    path="/payments"
  >
    <div class="ofp-schema-toolbar">
      <RouterLink to="/internal/proposals/ofp-002" class="ofp-schema-back">
        <span aria-hidden="true">&larr;</span> Back to OFP-002
      </RouterLink>
      <button type="button" class="ofp-schema-download" @click="downloadYaml">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download .yaml
      </button>
    </div>

    <RedocWrapper
      :spec-text="spec"
      :override-servers="[]"
      hide-security
      container-id="redoc-ofp002-intl"
    />
  </EndpointPage>
</template>

<style scoped>
.ofp-schema-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-bottom: 4px;
  padding: 0 18px;
}

.ofp-schema-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s ease;
}

.ofp-schema-back:hover { color: var(--at-navy-deep); }

.ofp-schema-download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: var(--at-sans);
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  background: var(--at-teal-deep, #00695c);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.ofp-schema-download:hover { background: var(--at-teal, #00897b); }
</style>

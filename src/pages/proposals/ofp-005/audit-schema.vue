<route lang="yaml">
meta:
  title: 'OFP-005 · Consent audit sub-resource (draft)'
</route>

<script setup lang="ts">
// Renders the co-located OFP-005 consent-audit draft schema with the shared Redoc
// wrapper and EndpointPage chrome — the same presentation as the published API
// specs and the OFP-001/002 schema pages. The YAML lives in this folder, is
// imported raw, handed to RedocWrapper via `specText`, and offered as a
// Download .yaml.
import { useHead } from '@unhead/vue'

useHead({ title: 'OFP-005 · Consent audit sub-resource (draft)' })

const sources = import.meta.glob('./*.yaml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
const spec = sources['./consent-audit-schema.yaml'] ?? ''

function downloadYaml(): void {
  if (typeof document === 'undefined') return
  const blob = new Blob([spec], { type: 'application/yaml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ofp-005-consent-audit-schema.yaml'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <EndpointPage
    eyebrow="OFP-005 · Draft schema"
    title="Consent audit sub-resource"
    version="Draft · V2.2"
    method="POST"
    path="/{consent}/audit"
  >
    <div class="ofp-schema-toolbar">
      <RouterLink to="/proposals/ofp-005" class="ofp-schema-back">
        <span aria-hidden="true">&larr;</span> Back to OFP-005
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
      container-id="redoc-ofp005-audit"
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

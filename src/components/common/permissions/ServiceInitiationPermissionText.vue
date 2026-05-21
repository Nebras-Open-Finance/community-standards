<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  paymentPermissionCombinations,
  getPaymentPermissionText,
  getAuthPaymentPermissionText,
} from '../composables/serviceInitiationPermissionDescriptions'

// The LFI integration guide documents the Authorization Page (rendered by the
// LFI), so it shows the authorization wording. The TPP standards document the
// Consent Page, so they show the consent wording.
const route = useRoute()
const isLfi = computed(() => route.path.includes('/lfi-api-hub/'))

const pageLabel = computed(() => (isLfi.value ? 'Authorization Page' : 'Consent Page'))

const rows = computed(() =>
  paymentPermissionCombinations.map((permissions) => ({
    permissions,
    text: isLfi.value
      ? getAuthPaymentPermissionText(permissions)
      : getPaymentPermissionText(permissions),
  })),
)
</script>

<template>
  <EdProse>The table below describes the text shown to users on the {{ pageLabel }}.</EdProse>

  <div class="sip__wrap">
    <table class="sip">
      <thead>
        <tr>
          <th>Permissions</th>
          <th>Text shown to user on {{ pageLabel }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(combo, i) in rows" :key="i">
          <td>
            <code v-for="p in combo.permissions" :key="p" class="sip__tag">{{ p }}</code>
          </td>
          <td>{{ combo.text }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.sip__wrap {
  margin: 1.5rem 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  overflow-x: auto;
}

.sip {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}

.sip thead { background: var(--at-navy-deep); }

.sip th {
  text-align: left;
  padding: 0.75rem 0.95rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  border-bottom: 0;
}
.sip th + th { border-left: 1px solid rgba(250, 250, 247, 0.18); }

.sip td {
  padding: 0.7rem 0.95rem;
  border-bottom: 1px solid var(--at-grid-line);
  vertical-align: top;
  color: var(--at-mute-2);
}
.sip tr:last-child td { border-bottom: 0; }

.sip td:first-child { width: 38%; min-width: 18rem; }

.sip__tag {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.74rem;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.12em 0.45em;
  margin: 0.15rem 0.3rem 0.15rem 0;
  white-space: nowrap;
}
</style>

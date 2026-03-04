<template>
  <table class="perm-ref-table">
    <thead>
      <tr>
        <th>Permissions</th>
        <th>Text shown to user on Consent Page</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(combo, i) in rows" :key="i">
        <td>
          <code v-for="p in combo.permissions" :key="p" class="perm-tag">{{ p }}</code>
        </td>
        <td>{{ combo.text }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import {
  paymentPermissionCombinations,
  getPaymentPermissionText,
} from './Composables/serviceInitiationPermissionDescriptions.ts'

const rows = paymentPermissionCombinations.map((permissions) => ({
  permissions,
  text: getPaymentPermissionText(permissions),
}))
</script>

<style scoped>
.perm-ref-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.perm-ref-table th {
  text-align: left;
  padding: 0.45rem 0.75rem;
  background: rgba(0, 39, 127, 0.04);
  border: 1px solid rgba(0, 39, 127, 0.1);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(0, 39, 127, 0.6);
}

.perm-ref-table td {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  vertical-align: top;
  line-height: 1.5;
}

.perm-ref-table tr:nth-child(even) td {
  background: #fafafa;
}

.perm-tag {
  display: inline-block;
  font-size: 0.8rem;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  white-space: nowrap;
  margin: 0.1rem 0.2rem 0.1rem 0;
}
</style>

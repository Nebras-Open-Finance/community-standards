<template>
  <div class="perm-ref">
    <div v-for="group in permissionGroups" :key="group.label" class="perm-ref-group">
      <div class="perm-ref-group-label">{{ group.label }}</div>
      <table class="perm-ref-table">
        <thead>
          <tr>
            <th>Permission</th>
            <th>What the user sees shared</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perm in group.permissions" :key="perm">
            <td><code>{{ perm }}</code></td>
            <td>{{ permissionDescriptions[perm] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { permissionDescriptions, permissionGroups } from './Composables/permissionDescriptions.ts'
</script>

<style scoped>
.perm-ref {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
}

.perm-ref-group-label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.perm-ref-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
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

.perm-ref-table code {
  font-size: 0.8rem;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  white-space: nowrap;
}
</style>

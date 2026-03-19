<template>
  <div class="policy-index">
    <table>
      <colgroup>
        <col style="width: 18%">
        <col style="width: 22%">
        <col style="width: 60%">
      </colgroup>
      <thead>
        <tr>
          <th>Policy</th>
          <th>Applies To</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="policy in policies" :key="policy.slug">
          <td><a :href="policy.url">{{ policy.title }}</a></td>
          <td>
            <span v-for="(actor, i) in policy.appliesTo" :key="i" class="applies-badge">{{ actor }}</span>
          </td>
          <td>{{ policy.purpose }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { data as policies } from '../policy/policy.data.ts'
</script>

<style scoped>
.policy-index table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  table-layout: fixed;
}

.policy-index td,
.policy-index th {
  overflow-wrap: break-word;
  word-break: break-word;
}

.policy-index th {
  text-align: left;
  padding: 8px 12px;
  border-bottom: 2px solid var(--vp-c-divider);
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.policy-index td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}


.policy-index td:first-child a {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.policy-index td:first-child a:hover {
  text-decoration: underline;
}

.applies-badge {
  display: inline-block;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  margin: 2px 2px 2px 0;
  white-space: nowrap;
}
</style>

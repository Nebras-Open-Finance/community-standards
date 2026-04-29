<script setup lang="ts">
import { permissionDescriptions, permissionGroups } from '../composables/permissionDescriptions'
</script>

<template>
  <div class="pr">
    <section v-for="group in permissionGroups" :key="group.label" class="pr__group">
      <header class="pr__group-head">
        <span class="pr__eyebrow">
          <span class="pr__eyebrow-dash" />
          {{ group.label }}
        </span>
      </header>

      <div class="pr__table-wrap">
        <table class="pr__table">
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
    </section>
  </div>
</template>

<style scoped>
.pr {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.pr__group-head { margin-bottom: 0.85rem; }

.pr__eyebrow {
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
.pr__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }

.pr__table-wrap {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  overflow-x: auto;
}

.pr__table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
}

.pr__table thead { background: var(--at-navy-deep); }

.pr__table th {
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
.pr__table th + th { border-left: 1px solid rgba(250, 250, 247, 0.18); }

.pr__table td {
  padding: 0.7rem 0.95rem;
  border-bottom: 1px solid var(--at-grid-line);
  vertical-align: top;
  color: var(--at-mute-2);
}
.pr__table tr:last-child td { border-bottom: 0; }

.pr__table td:first-child { width: 30%; min-width: 14rem; }

.pr__table code {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
  white-space: nowrap;
}
</style>

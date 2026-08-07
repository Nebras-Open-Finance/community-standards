<script setup lang="ts">
import {
  MAPPING_LABEL_META,
  mappingBlurbOf,
  mappingLabelOf,
  permissionSourceMeta,
  type FieldMapRecord,
} from '@/composables/useFieldMap'

defineProps<{
  rows: FieldMapRecord[]
  showPermissions: boolean
}>()

// Every row renders, including the 657 on `/products`. The page carries no
// search of its own, so anything held back would be invisible to the browser's
// find-in-page too.

function typeOf(row: FieldMapRecord): string {
  const parts = [row.standardsType ?? row.ozoneType ?? '—']
  if (row.standardsFormat) parts.push(row.standardsFormat)
  return parts.join(' · ')
}

function enumTitle(row: FieldMapRecord): string | undefined {
  if (!row.enum?.length) return undefined
  return `Allowed values: ${row.enum.join(', ')}`
}
</script>

<template>
  <div class="fm-table">
    <div class="fm-table__scroll">
      <table>
        <thead>
          <tr>
            <th>Ozone Connect</th>
            <th>Standards</th>
            <th>Type</th>
            <th>Mapping</th>
            <th v-if="showPermissions">Permissions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in rows"
            :key="`${row.resource}-${row.standardsPath ?? row.ozonePath}-${i}`"
          >
            <td class="fm-table__path">
              <code v-if="row.ozonePath">{{ row.ozonePath }}</code>
              <span v-else class="fm-table__none" title="No Ozone Connect source — the API Hub adds this field">—</span>
            </td>
            <td class="fm-table__path">
              <code v-if="row.standardsPath">{{ row.standardsPath }}</code>
              <span v-else class="fm-table__none" title="Not paired with a Standards field">—</span>
              <span
                v-if="row.required"
                class="fm-table__req"
                title="Required in the Standards schema"
              >required</span>
              <span
                v-if="row.variant"
                class="fm-table__variant"
                :title="`Only present in schema variant ${row.variant}`"
              >{{ row.variant }}</span>
            </td>
            <td class="fm-table__type">
              <span :title="enumTitle(row)" :class="{ 'fm-table__has-enum': row.enum?.length }">
                {{ typeOf(row) }}
              </span>
            </td>
            <td>
              <span
                class="fm-chip"
                :class="`fm-chip--${mappingLabelOf(row)}`"
                :title="mappingBlurbOf(row)"
              >{{ MAPPING_LABEL_META[mappingLabelOf(row)].text }}</span>
            </td>
            <td v-if="showPermissions" class="fm-table__perms">
              <template v-if="row.permissions.length">
                <span
                  v-for="perm in row.permissions"
                  :key="perm"
                  class="fm-perm"
                  :class="`fm-perm--${row.permissionSource}`"
                  :title="permissionSourceMeta(row.permissionSource).blurb"
                >{{ perm }}</span>
              </template>
              <span v-else class="fm-table__none" title="Not permission-gated">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.fm-table {
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
}

.fm-table__scroll { overflow-x: auto; max-width: 100%; }

.fm-table table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--at-sans);
  margin: 0;
}

.fm-table thead { background: var(--at-navy-deep); }

.fm-table th {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  text-align: left;
  padding: 0.6rem 0.85rem;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--at-navy-deep);
}

.fm-table th + th { border-left: 1px solid rgba(250, 250, 247, 0.18); }

.fm-table td {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--at-mute-2);
  padding: 0.5rem 0.85rem;
  border-bottom: 1px solid var(--at-grid-line);
  vertical-align: top;
}

.fm-table tbody tr:last-child td { border-bottom: 0; }

.fm-table__path code {
  font-family: var(--at-mono);
  font-size: 0.76rem;
  color: var(--at-navy-deep);
  word-break: break-word;
}

.fm-table__none { color: var(--at-mute); }

.fm-table__req,
.fm-table__variant {
  display: inline-block;
  margin-left: 0.45rem;
  font-family: var(--at-mono);
  font-size: 0.56rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  vertical-align: 1px;
}
.fm-table__req { color: var(--at-gold); }
.fm-table__variant { color: var(--at-mute); }

.fm-table__type {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  white-space: nowrap;
  color: var(--at-mute);
}
.fm-table__has-enum {
  border-bottom: 1px dotted var(--at-grid-line-2);
  cursor: help;
}

.fm-table__perms { min-width: 14rem; }

.fm-perm {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  padding: 0.1rem 0.4rem;
  margin: 0 0.25rem 0.25rem 0;
  cursor: help;
  white-space: nowrap;
}
/* Solid = measured against a live response; outline = inherited from the
   endpoint declaration. The two must not read as the same claim. */
.fm-perm--observed {
  background: color-mix(in srgb, var(--at-teal) 16%, var(--at-surface));
  border: 1px solid color-mix(in srgb, var(--at-teal) 45%, transparent);
  color: var(--at-teal-ink);
}
.fm-perm--spec-endpoint {
  background: transparent;
  border: 1px dashed var(--at-grid-line-2);
  color: var(--at-mute);
}
.fm-perm--none-declared {
  background: transparent;
  border: 1px dashed var(--at-grid-line);
  color: var(--at-mute);
}

.fm-chip {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.16rem 0.45rem;
  white-space: nowrap;
  cursor: help;
  border: 1px solid transparent;
}

.fm-chip--same { background: color-mix(in srgb, var(--at-grid-line) 60%, var(--at-bg-cream)); color: var(--at-mute-2); }
.fm-chip--mapped { background: color-mix(in srgb, var(--at-grid-line) 60%, var(--at-bg-cream)); color: var(--at-mute-2); }
.fm-chip--case-only { background: color-mix(in srgb, var(--at-blue) 8%, var(--at-surface)); border-color: color-mix(in srgb, var(--at-blue) 22%, transparent); color: var(--at-blue-deep); }
.fm-chip--renamed { background: color-mix(in srgb, var(--at-blue) 16%, var(--at-surface)); border-color: color-mix(in srgb, var(--at-blue) 45%, transparent); color: var(--at-blue-deep); font-weight: 600; }
.fm-chip--restructured { background: color-mix(in srgb, var(--at-gold) 14%, var(--at-surface)); border-color: color-mix(in srgb, var(--at-gold) 40%, transparent); color: var(--at-gold); }
.fm-chip--hub-generated { background: color-mix(in srgb, var(--at-navy) 10%, var(--at-surface)); border-color: color-mix(in srgb, var(--at-navy) 30%, transparent); color: var(--at-navy); }
/* Unmapped is the one row state a reader must not skim past: it means the value
   is not known to survive the crossing. #B33A3A is the site's danger red, from
   EdNote. */
.fm-chip--unmapped {
  background: color-mix(in srgb, #b33a3a 12%, var(--at-surface));
  border-color: #b33a3a;
  color: #b33a3a;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.55rem;
}

@media (max-width: 720px) {
  .fm-table td { font-size: 0.8rem; }
  .fm-table__perms { min-width: 11rem; }
}
</style>

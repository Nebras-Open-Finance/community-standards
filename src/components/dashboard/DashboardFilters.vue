<script setup lang="ts">
// Phase 5b-iii — filter dropdowns + active-filter chips, ported from
// `docs/components/WebPages/DashboardFilters.vue`.

import {
  state,
  filterOptions,
  setFilter,
  resetFilters,
} from '@/stores/dashboard'
import type { FilterKey } from '@/data/dashboard-charts'

interface FilterDef {
  key:      FilterKey
  label:    string
  allLabel: string
  optKey:   keyof typeof filterOptions
}

const FILTER_DEFS_API: readonly FilterDef[] = [
  { key: 'lfi',       label: 'LFI',        allLabel: 'All LFIs',     optKey: 'lfis'        },
  { key: 'tpp',       label: 'TPP',        allLabel: 'All TPPs',     optKey: 'tpps'        },
  { key: 'month',     label: 'Month',      allLabel: 'All Months',   optKey: 'months'      },
  { key: 'apiFamily', label: 'API Family', allLabel: 'All Families', optKey: 'apiFamilies' },
]

const FILTER_DEFS_PAYMENT: readonly FilterDef[] = [
  { key: 'lfi',   label: 'LFI',   allLabel: 'All LFIs',   optKey: 'paymentLfis'   },
  { key: 'tpp',   label: 'TPP',   allLabel: 'All TPPs',   optKey: 'paymentTpps'   },
  { key: 'month', label: 'Month', allLabel: 'All Months', optKey: 'paymentMonths' },
]

const isPaymentSection = computed<boolean>(() => state.activeSection.startsWith('payment'))

const filterDefs = computed<readonly FilterDef[]>(() =>
  isPaymentSection.value ? FILTER_DEFS_PAYMENT : FILTER_DEFS_API,
)

const LABELS: Record<FilterKey, string> = {
  lfi: 'LFI', tpp: 'TPP', month: 'Month', apiFamily: 'Family',
}

interface ActiveEntry { key: FilterKey; value: string }

const activeEntries = computed<ActiveEntry[]>(() =>
  (Object.entries(state.filters) as Array<[FilterKey, string | null]>)
    .filter((entry): entry is [FilterKey, string] => entry[1] != null)
    .map(([key, value]) => ({ key, value })),
)

const hasActiveFilters = computed<boolean>(() => activeEntries.value.length > 0)

function onChange(key: FilterKey, ev: Event): void {
  const target = ev.target as HTMLSelectElement
  setFilter(key, target.value || null)
}
</script>

<template>
  <div class="db-filters">

    <div class="db-filters__controls">

      <div v-for="f in filterDefs" :key="f.key" class="db-filters__group">
        <label class="db-filters__label">{{ f.label }}</label>
        <div class="db-filters__select-wrap">
          <select
            class="db-filters__select"
            :value="state.filters[f.key] ?? ''"
            @change="onChange(f.key, $event)"
          >
            <option value="">{{ f.allLabel }}</option>
            <option v-for="opt in filterOptions[f.optKey]" :key="opt" :value="opt">{{ opt }}</option>
          </select>
          <svg class="db-filters__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <button
        class="db-filters__reset"
        :disabled="!hasActiveFilters"
        @click="resetFilters"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Clear
      </button>
    </div>

    <div v-if="hasActiveFilters" class="db-filters__chips">
      <span
        v-for="entry in activeEntries"
        :key="entry.key"
        class="db-filters__chip"
        @click="setFilter(entry.key, null)"
      >
        {{ LABELS[entry.key] }}: {{ entry.value }}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </span>
    </div>

  </div>
</template>

<style scoped>
.db-filters {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.db-filters__controls {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.db-filters__group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.db-filters__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--at-mute);
}

.db-filters__select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.db-filters__select {
  appearance: none;
  padding: 0.35rem 1.75rem 0.35rem 0.65rem;
  font-family: var(--at-sans);
  font-size: 0.78rem;
  border: 1px solid var(--at-grid-line-2);
  border-radius: 0;
  background: var(--at-surface);
  color: var(--at-navy-deep);
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  min-width: 130px;
}

.db-filters__select:focus {
  border-color: var(--at-teal);
  box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.15);
}

.db-filters__chevron {
  position: absolute;
  right: 0.55rem;
  pointer-events: none;
  color: var(--at-mute);
}

.db-filters__reset {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid var(--at-grid-line-2);
  border-radius: 0;
  background: transparent;
  color: var(--at-mute);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.db-filters__reset:not(:disabled):hover {
  border-color: var(--at-navy-deep);
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}

.db-filters__reset:disabled {
  opacity: 0.35;
  cursor: default;
}

/* ── Chips ────────────────────────────────────────────────────────────── */
.db-filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.db-filters__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  border: 1px solid var(--at-teal);
  background: rgba(0, 194, 169, 0.1);
  color: var(--at-teal-deep);
  cursor: pointer;
  user-select: none;
  transition: opacity 0.15s;
}

.db-filters__chip:hover { opacity: 0.75; }
</style>

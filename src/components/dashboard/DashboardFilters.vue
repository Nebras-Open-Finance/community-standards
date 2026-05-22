<script setup lang="ts">
// Phase 5b-iii — filter dropdowns + active-filter chips, ported from
// `docs/components/WebPages/DashboardFilters.vue`.

import {
  state,
  filterOptions,
  toggleFilter,
  clearFilter,
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

// One chip per selected value across every filter.
const activeEntries = computed<ActiveEntry[]>(() =>
  (Object.entries(state.filters) as Array<[FilterKey, string[]]>)
    .flatMap(([key, values]) => values.map(value => ({ key, value }))),
)

const hasActiveFilters = computed<boolean>(() =>
  activeEntries.value.length > 0 || !state.excludePartialMonths,
)
</script>

<template>
  <div class="db-filters">

    <div class="db-filters__controls">

      <div v-for="f in filterDefs" :key="f.key" class="db-filters__group">
        <label class="db-filters__label">{{ f.label }}</label>
        <DashboardMultiSelect
          :label="f.label"
          :all-label="f.allLabel"
          :options="filterOptions[f.optKey]"
          :selected="state.filters[f.key]"
          @toggle="toggleFilter(f.key, $event)"
          @clear="clearFilter(f.key)"
        />
      </div>

      <button
        class="db-filters__reset"
        :disabled="!hasActiveFilters"
        @click="resetFilters"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M1 4v6h6M23 20v-6h-6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Reset
      </button>
    </div>

    <div class="db-filters__chips">
      <label
        class="db-filters__chip db-filters__chip--toggle"
        :class="{ 'is-off': !state.excludePartialMonths }"
        title="Hide the current calendar month while it is still in progress."
      >
        <input
          type="checkbox"
          class="db-filters__chip-input"
          :checked="state.excludePartialMonths"
          @change="state.excludePartialMonths = ($event.target as HTMLInputElement).checked"
        >
        Full months only
      </label>
      <span
        v-for="entry in activeEntries"
        :key="`${entry.key}:${entry.value}`"
        class="db-filters__chip"
        @click="toggleFilter(entry.key, entry.value)"
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

.db-filters__chip--toggle {
  gap: 0.4rem;
}

.db-filters__chip--toggle.is-off {
  border-color: var(--at-grid-line-2);
  background: transparent;
  color: var(--at-mute);
}

.db-filters__chip-input {
  appearance: auto;
  margin: 0;
  cursor: pointer;
  accent-color: var(--at-teal);
}
</style>

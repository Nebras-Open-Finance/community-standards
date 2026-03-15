<template>
  <div class="db-filters">

    <!-- Filter controls -->
    <div class="db-filters__controls">

      <div class="db-filters__group" v-for="f in filterDefs" :key="f.key">
        <label class="db-filters__label">{{ f.label }}</label>
        <div class="db-filters__select-wrap">
          <select
            class="db-filters__select"
            :value="state.filters[f.key]"
            @change="setFilter(f.key, $event.target.value || null)"
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

    <!-- Active filter chips -->
    <div v-if="hasActiveFilters" class="db-filters__chips">
      <span
        v-for="[key, val] in activeEntries"
        :key="key"
        class="db-filters__chip"
        @click="setFilter(key, null)"
      >
        {{ LABELS[key] }}: {{ val }}
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { state, filterOptions, setFilter, resetFilters } from './stores/dashboardStore.js'

const isPaymentSection = computed(() => state.activeSection.startsWith('payment'))

const FILTER_DEFS_API = [
  { key: 'lfi',       label: 'LFI',        allLabel: 'All LFIs',      optKey: 'lfis'        },
  { key: 'tpp',       label: 'TPP',        allLabel: 'All TPPs',      optKey: 'tpps'        },
  { key: 'month',     label: 'Month',      allLabel: 'All Months',    optKey: 'months'      },
  { key: 'apiFamily', label: 'API Family', allLabel: 'All Families',  optKey: 'apiFamilies' },
]

const FILTER_DEFS_PAYMENT = [
  { key: 'lfi',   label: 'LFI',   allLabel: 'All LFIs',   optKey: 'paymentLfis'   },
  { key: 'tpp',   label: 'TPP',   allLabel: 'All TPPs',   optKey: 'paymentTpps'   },
  { key: 'month', label: 'Month', allLabel: 'All Months', optKey: 'paymentMonths' },
]

const filterDefs = computed(() => isPaymentSection.value ? FILTER_DEFS_PAYMENT : FILTER_DEFS_API)

const LABELS = { lfi: 'LFI', tpp: 'TPP', month: 'Month', apiFamily: 'Family' }

const activeEntries = computed(() =>
  Object.entries(state.filters).filter(([, v]) => v != null)
)

const hasActiveFilters = computed(() => activeEntries.value.length > 0)
</script>

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
  font-family: 'Poppins', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #667085;
}

.db-filters__select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.db-filters__select {
  appearance: none;
  padding: 0.3rem 1.75rem 0.3rem 0.6rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  border: 1px solid #E8EFF6;
  border-radius: 6px;
  background: #fff;
  color: #0C1441;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
  min-width: 130px;
}

.db-filters__select:focus {
  border-color: #36BFD4;
  box-shadow: 0 0 0 3px rgba(54, 191, 212, 0.1);
}

.db-filters__chevron {
  position: absolute;
  right: 0.5rem;
  pointer-events: none;
  color: #94a3b8;
}

.db-filters__reset {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #E8EFF6;
  border-radius: 6px;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.db-filters__reset:not(:disabled):hover {
  border-color: #EF4444;
  color: #EF4444;
}

.db-filters__reset:disabled {
  opacity: 0.35;
  cursor: default;
}

/* ── Chips ──────────────────────────────────────────────────────────────── */
.db-filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.db-filters__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.18rem 0.55rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  border-radius: 999px;
  background: rgba(54, 191, 212, 0.1);
  color: #36BFD4;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.15s;
}

.db-filters__chip:hover {
  opacity: 0.7;
}
</style>

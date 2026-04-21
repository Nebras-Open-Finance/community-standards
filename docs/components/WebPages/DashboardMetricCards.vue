<template>
  <div class="db-kpi-row">
    <div v-for="card in cards" :key="card.id" class="db-kpi-card" :style="{ '--accent': card.color }">
      <div class="db-kpi-card__icon">
        <svg v-if="card.id === 'api-calls'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="card.id === 'payments'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
          <circle cx="7" cy="15" r="1.5" fill="currentColor"/>
        </svg>
        <svg v-else-if="card.id === 'error-rate'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="card.id === 'success-rate'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="card.id === 'api-errors'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="card.id === 'avg-response'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="card.id === 'payment-amount'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="card.id === 'payment-failed'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M2 10h20M9 15l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="card.id === 'avg-payment-size'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 3h18M3 9h18M3 15h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M18 16.5v1.5l1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="db-kpi-card__body">
        <div class="db-kpi-card__value">{{ card.value }}</div>
        <div class="db-kpi-card__label">{{ card.label }}</div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { kpis, state } from './stores/dashboardStore.js'

const isPaymentSection = computed(() => state.activeSection.startsWith('payment'))

// Editorial accent palette — baseline tokens.js
const ACCENT = {
  teal:    '#00C2A9',
  tealDeep:'#008B78',
  gold:    '#B37819',
  navy:    '#00277F',
  blue:    '#008BE4',
  sky:     '#00A2FB',
  blueDeep:'#0043A6',
}

const cards = computed(() => {
  if (isPaymentSection.value) {
    return [
      {
        id: 'payments',
        label: 'Successful payments',
        value: kpis.value.totalPayments.toLocaleString(),
        color: ACCENT.navy,
      },
      {
        id: 'payment-amount',
        label: 'Successful amount (AED)',
        value: kpis.value.totalAmountAed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        color: ACCENT.blueDeep,
      },
      {
        id: 'success-rate',
        label: 'Payment success rate',
        value: `${kpis.value.successRate}%`,
        color: ACCENT.tealDeep,
      },
      {
        id: 'avg-payment-size',
        label: 'Avg payment size (AED)',
        value: Number(kpis.value.avgPaymentSize).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        color: ACCENT.gold,
      },
    ]
  }
  return [
    {
      id: 'api-calls',
      label: 'Total API calls',
      value: kpis.value.totalApiCalls.toLocaleString(),
      color: ACCENT.teal,
    },
    {
      id: 'api-errors',
      label: 'Total API errors',
      value: kpis.value.totalApiErrors.toLocaleString(),
      color: ACCENT.gold,
    },
    {
      id: 'error-rate',
      label: 'API error rate',
      value: `${kpis.value.errorRate}%`,
      color: ACCENT.blueDeep,
    },
    {
      id: 'avg-response',
      label: 'Avg response time',
      value: `${kpis.value.avgResponseMs}ms`,
      color: ACCENT.tealDeep,
    },
  ]
})
</script>

<style scoped>
.db-kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1.25rem 1.5rem 0;
}

.db-kpi-card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-radius: 0;
  border-left: 3px solid var(--accent, var(--at-teal));
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.db-kpi-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 23, 56, 0.08);
}

.db-kpi-card__icon {
  width: 40px;
  height: 40px;
  background: color-mix(in srgb, var(--accent, #00C2A9) 12%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent, #00C2A9);
  flex-shrink: 0;
}

.db-kpi-card__body {
  flex: 1;
  min-width: 0;
}

.db-kpi-card__value {
  font-family: var(--at-serif);
  font-size: 1.75rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  line-height: 1.05;
}

.db-kpi-card__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-mute);
  margin-top: 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1100px) {
  .db-kpi-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .db-kpi-row { grid-template-columns: 1fr; padding: 1rem; }
}
</style>

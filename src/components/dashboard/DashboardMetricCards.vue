<script setup lang="ts">
// Phase 5b-iii — KPI cards row, ported from
// `docs/components/WebPages/DashboardMetricCards.vue`. Two card sets, swapped
// based on whether the active section is a payment view or an API view.

import { kpis, state } from '@/stores/dashboard'

type CardId =
  | 'api-calls' | 'api-errors' | 'error-rate' | 'avg-response'
  | 'payments' | 'payment-amount' | 'success-rate' | 'avg-payment-size'
  | 'consents-authorized' | 'conversion-rate' | 'mom-growth' | 'cancellation-rate'

interface KpiCard {
  id:    CardId
  label: string
  value: string
  dirham?: boolean
  color: string
}

const isPaymentSection = computed<boolean>(() => state.activeSection.startsWith('payment'))
const isAuthSection    = computed<boolean>(() => state.activeSection.startsWith('auth'))

// Editorial accent palette — see styles/tokens.css for the canonical hex.
const ACCENT = {
  teal:     '#00C2A9',
  tealDeep: '#008B78',
  gold:     '#B37819',
  navy:     '#00277F',
  blue:     '#008BE4',
  sky:      '#00A2FB',
  blueDeep: '#0043A6',
} as const

const cards = computed<KpiCard[]>(() => {
  if (isAuthSection.value) {
    return [
      {
        id:    'consents-authorized',
        label: 'Consents authorized',
        value: kpis.value.consentsAuthorized.toLocaleString(),
        color: ACCENT.tealDeep,
      },
      {
        id:    'conversion-rate',
        label: 'Conversion rate',
        value: `${kpis.value.conversionRate}%`,
        color: ACCENT.navy,
      },
      {
        id:    'mom-growth',
        label: 'MoM growth in consents',
        value: `${kpis.value.momGrowth}%`,
        color: ACCENT.blue,
      },
      {
        id:    'cancellation-rate',
        label: 'Cancellation rate',
        value: `${kpis.value.cancellationRate}%`,
        color: ACCENT.gold,
      },
    ]
  }
  if (isPaymentSection.value) {
    return [
      {
        id:    'payments',
        label: 'Successful payments',
        value: kpis.value.totalPayments.toLocaleString(),
        color: ACCENT.navy,
      },
      {
        id:    'payment-amount',
        label: 'Successful amount',
        value: kpis.value.totalAmountAed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        dirham: true,
        color: ACCENT.blueDeep,
      },
      {
        id:    'success-rate',
        label: 'Payment success rate',
        value: `${kpis.value.successRate}%`,
        color: ACCENT.tealDeep,
      },
      {
        id:    'avg-payment-size',
        label: 'Avg payment size',
        value: Number(kpis.value.avgPaymentSize).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        dirham: true,
        color: ACCENT.gold,
      },
    ]
  }
  return [
    {
      id:    'api-calls',
      label: 'Total API calls',
      value: kpis.value.totalApiCalls.toLocaleString(),
      color: ACCENT.teal,
    },
    {
      id:    'api-errors',
      label: 'Total API errors',
      value: kpis.value.totalApiErrors.toLocaleString(),
      color: ACCENT.gold,
    },
    {
      id:    'error-rate',
      label: 'API error rate',
      value: `${kpis.value.errorRate}%`,
      color: ACCENT.blueDeep,
    },
    {
      id:    'avg-response',
      label: 'Avg response time',
      value: `${kpis.value.avgResponseMs}ms`,
      color: ACCENT.tealDeep,
    },
  ]
})
</script>

<template>
  <div class="db-kpi-row">
    <div
      v-for="card in cards"
      :key="card.id"
      class="db-kpi-card"
      :style="{ '--accent': card.color }"
    >
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
        <svg v-else-if="card.id === 'payment-amount'" width="20" height="16" viewBox="0 0 13 10" fill="none">
          <path d="M12.926 4.81517L12.8277 4.735C12.6689 4.60135 12.48 4.53454 12.2759 4.53454H11.2176C11.2327 4.6949 11.2403 4.85527 11.2403 5.02899C11.2403 5.20271 11.2327 5.36307 11.2176 5.53012H11.9357C12.48 5.53012 12.926 5.98448 12.926 6.55242V6.80633L12.8277 6.71947C12.6689 6.59251 12.48 6.5257 12.2759 6.5257H11.0588C10.4768 8.77749 8.44345 10.0002 5.23841 10.0002H1.1263C1.1263 10.0002 1.68566 9.61933 1.68566 8.34313V6.5257H0.997795C0.445983 6.5257 0 6.06466 0 5.50339V5.24949L0.105827 5.32967C0.257007 5.45662 0.445983 5.53012 0.650077 5.53012H1.68566V4.53454H0.997795C0.445983 4.53454 0 4.0735 0 3.51223V3.25833L0.105827 3.34519C0.257007 3.47214 0.445983 3.53896 0.650077 3.53896H1.68566V1.79502C1.68566 0.478721 1.1263 0.0644531 1.1263 0.0644531H5.23841C8.35274 0.0644531 10.439 1.27385 11.0513 3.53896H11.9357C12.48 3.53896 12.926 3.99332 12.926 4.56127V4.81517ZM5.08724 0.558902H3.37134V3.53896H9.13888C8.74581 1.46762 7.40786 0.558902 5.08724 0.558902ZM9.27494 5.02899C9.27494 4.85527 9.26738 4.6949 9.25982 4.53454H3.37134V5.53012H9.25982C9.26738 5.36307 9.27494 5.20271 9.27494 5.02899ZM3.37134 9.49907H5.10235C7.55904 9.44564 8.76849 8.40327 9.13888 6.5257H3.37134V9.49907Z" fill="currentColor"/>
        </svg>
        <svg v-else-if="card.id === 'avg-payment-size'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 3h18M3 9h18M3 15h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2"/>
          <path d="M18 16.5v1.5l1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="card.id === 'consents-authorized'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="card.id === 'conversion-rate'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 17l5-5 4 4 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 9h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="card.id === 'mom-growth'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 20V10M9 20V4M15 20v-8M21 20V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else-if="card.id === 'cancellation-rate'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="db-kpi-card__body">
        <div class="db-kpi-card__value">
          <DirhamAmount v-if="card.dirham" :amount="card.value" />
          <template v-else>{{ card.value }}</template>
        </div>
        <div class="db-kpi-card__label">{{ card.label }}</div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.db-kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1.25rem 0 0;
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
  .db-kpi-row { grid-template-columns: 1fr; padding: 1rem 0 0; }
}
</style>

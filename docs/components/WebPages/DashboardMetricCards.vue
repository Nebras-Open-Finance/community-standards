<template>
  <div class="db-kpi-row">
    <div v-for="card in cards" :key="card.id" class="db-kpi-card" :style="{ '--accent': card.color }">
      <div class="db-kpi-card__icon">
        <!-- API Calls -->
        <svg v-if="card.id === 'api-calls'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
        <!-- Payments -->
        <svg v-else-if="card.id === 'payments'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
          <circle cx="7" cy="15" r="1.5" fill="currentColor"/>
        </svg>
        <!-- Error rate -->
        <svg v-else-if="card.id === 'error-rate'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <!-- Success rate -->
        <svg v-else-if="card.id === 'success-rate'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- API errors -->
        <svg v-else-if="card.id === 'api-errors'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <!-- Avg response time -->
        <svg v-else-if="card.id === 'avg-response'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <!-- Payment amount -->
        <svg v-else-if="card.id === 'payment-amount'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <!-- Failed payments -->
        <svg v-else-if="card.id === 'payment-failed'" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M2 10h20M9 15l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- Avg payment size -->
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

const cards = computed(() => {
  if (isPaymentSection.value) {
    return [
      {
        id: 'payments',
        label: 'Successful Payments',
        value: kpis.value.totalPayments.toLocaleString(),
        color: '#4F8EF7',
      },
      {
        id: 'payment-amount',
        label: 'Successful Amount (AED)',
        value: kpis.value.totalAmountAed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        color: '#8B5CF6',
      },
      {
        id: 'success-rate',
        label: 'Payment Success Rate',
        value: `${kpis.value.successRate}%`,
        color: '#10B981',
      },
      {
        id: 'avg-payment-size',
        label: 'Avg Payment Size (AED)',
        value: Number(kpis.value.avgPaymentSize).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        color: '#F59E0B',
      },
    ]
  }
  return [
    {
      id: 'api-calls',
      label: 'Total API Calls',
      value: kpis.value.totalApiCalls.toLocaleString(),
      color: '#36BFD4',
    },
    {
      id: 'api-errors',
      label: 'Total API Errors',
      value: kpis.value.totalApiErrors.toLocaleString(),
      color: '#F97316',
    },
    {
      id: 'error-rate',
      label: 'API Error Rate',
      value: `${kpis.value.errorRate}%`,
      color: '#EF4444',
    },
    {
      id: 'avg-response',
      label: 'Avg Response Time',
      value: `${kpis.value.avgResponseMs}ms`,
      color: '#10B981',
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
  background: #fff;
  border: 1px solid #E8EFF6;
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid var(--accent, #36BFD4);
  transition: box-shadow 0.15s;
}

.db-kpi-card:hover {
  box-shadow: 0 4px 16px rgba(12, 20, 65, 0.08);
}

.db-kpi-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent, #36BFD4) 12%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent, #36BFD4);
  flex-shrink: 0;
}

.db-kpi-card__body {
  flex: 1;
  min-width: 0;
}

.db-kpi-card__value {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0C1441;
  line-height: 1.1;
}

.db-kpi-card__label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  color: #667085;
  margin-top: 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .db-kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .db-kpi-row {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style>

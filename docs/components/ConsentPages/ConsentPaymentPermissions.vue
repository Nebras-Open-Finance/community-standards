<script setup>
import { ref, inject, computed } from 'vue'
import { formatDate } from '../Composables/formatDate.ts'
import DirhamAmount from './DirhamAmount.vue'

const detailConsent    = inject('detailConsent',    null)
const detailConnection = inject('detailConnection', null)
const paymentHistory   = inject('paymentHistory',   [])

const activeTab = ref('rules')

const expiryDate     = computed(() => formatDate(detailConsent?.value?.ExpirationDateTime))
const connectionType = computed(() => detailConnection?.value?.type ?? '')
const isDefined      = computed(() => connectionType.value.includes('DefinedSchedule'))
const isDelegated    = computed(() => connectionType.value.includes('DelegatedSCA'))

// ─── Example data keyed by sub-type ──────────────────────────────────────────
const EXAMPLE_RULES = {
  OnDemand: {
    firstPaymentDate:     '01/12/2026',
    maxPerPayment:        '200.00',
    amount:               '200.00',
    totalPayments:        '5',
    totalValue:           '900.00',
    maxPaymentsPerPeriod: '2',
    maxValuePerPeriod:    '200.00',
  },
  PeriodicSchedule: {
    firstPaymentDate: '01/01/2026',
    frequency:        'Monthly',
    maxPerPayment:    '200.00',
    amount:           '200.00',
    totalPayments:    '6',
    totalValue:       '1200.00',
  },
  // DefinedSchedule: each entry carries date, amount and an outcome status.
  // Entries before today have a result; future entries are Upcoming.
  DefinedSchedule: {
    entries: [
      { date: '01/01/2026', amount: '150.00', status: 'Successful' },
      { date: '01/02/2026', amount: '150.00', status: 'Successful' },
      { date: '01/03/2026', amount: '200.00', status: 'Failed'     },
      { date: '01/04/2026', amount: '150.00', status: 'Upcoming'   },
      { date: '01/05/2026', amount: '150.00', status: 'Upcoming'   },
    ],
    totalPayments: '5',
    totalValue:    '800.00',
  },
  DelegatedSCA: {
    firstPaymentDate: '01/12/2026',
    maxPerPayment:    '200.00',
    totalPayments:    '2',
    totalValue:       '500.00',
  },
}

const scheduleEntries = computed(() => EXAMPLE_RULES.DefinedSchedule.entries)

// ─── Row model for non-DefinedSchedule types ─────────────────────────────────
// { kind: 'scalar', label, value }
// { kind: 'amount', label, amount }

function getRulesData(type) {
  if (type.includes('OnDemand'))         return EXAMPLE_RULES.OnDemand
  if (type.includes('PeriodicSchedule')) return EXAMPLE_RULES.PeriodicSchedule
  if (type.includes('DelegatedSCA'))     return EXAMPLE_RULES.DelegatedSCA
  return EXAMPLE_RULES.OnDemand
}

function getPaymentRulesConfig(type, expiry) {
  const fixed = type.includes('Fixed')
  const isOnD = type.includes('OnDemand')
  const isPer = type.includes('PeriodicSchedule')
  const data  = getRulesData(type)
  const rows  = []

  rows.push(fixed
    ? { kind: 'amount', label: 'Amount',          amount: data.amount }
    : { kind: 'amount', label: 'Max per Payment', amount: data.maxPerPayment }
  )

  if (data.firstPaymentDate) {
    rows.push({ kind: 'scalar', label: 'First Payment Date', value: data.firstPaymentDate })
  }

  if (isPer && data.frequency) {
    rows.push({ kind: 'scalar', label: 'Payments repeat every', value: data.frequency })
  }

  rows.push({ kind: 'scalar', label: 'Expiry Date', value: expiry })

  if (data.totalPayments) rows.push({ kind: 'scalar', label: 'Total Payments allowed', value: data.totalPayments })
  if (data.totalValue)    rows.push({ kind: 'amount', label: 'Total Value allowed',    amount: data.totalValue })

  if (isOnD) {
    if (data.maxPaymentsPerPeriod) rows.push({ kind: 'scalar', label: 'Max Payments per Week', value: data.maxPaymentsPerPeriod })
    if (data.maxValuePerPeriod)    rows.push({ kind: 'amount', label: 'Max Value per Week',    amount: data.maxValuePerPeriod })
  }

  return rows
}

const rulesConfig = computed(() => getPaymentRulesConfig(connectionType.value, expiryDate.value))

// ─── Status badge helpers ─────────────────────────────────────────────────────
function paymentStatusClass(status) {
  if (status === 'Successful') return 'cpd-badge-successful'
  if (status === 'Failed')     return 'cpd-badge-failed'
  if (status === 'Upcoming')   return 'cpd-badge-upcoming'
  return 'cpd-badge-pending'
}
</script>

<template>
  <div class="cpd-frame">

    <!-- ════════════════════════════════════════════════════════════════
         DefinedSchedule: single Payment Schedule view (no tabs)
         ════════════════════════════════════════════════════════════════ -->
    <template v-if="isDefined">
      <div class="cpd-tab-content">
        <div class="cpd-section-title">Payment schedule</div>
        <div class="cpd-rows">
          <div
            v-for="(entry, i) in scheduleEntries"
            :key="i"
            class="cpd-payment-entry"
            :class="{ 'cpd-payment-entry-bordered': i < scheduleEntries.length - 1 }"
          >
            <div class="cpd-payment-top">
              <span class="cpd-payment-datetime">{{ entry.date }}</span>
              <div class="cpd-badge" :class="paymentStatusClass(entry.status)">{{ entry.status }}</div>
            </div>
            <div class="cpd-row">
              <span class="cpd-label">Amount</span>
              <DirhamAmount :amount="entry.amount" class="cpd-amount" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ════════════════════════════════════════════════════════════════
         All other types: Payment rules / Payment history tabs
         ════════════════════════════════════════════════════════════════ -->
    <template v-else>

      <!-- Tabs -->
      <div class="cpd-tabs">
        <button
          type="button"
          class="cpd-tab"
          :class="{ 'cpd-tab-active': activeTab === 'rules' }"
          @click="activeTab = 'rules'"
        >Payment rules</button>
        <button
          type="button"
          class="cpd-tab"
          :class="{ 'cpd-tab-active': activeTab === 'history' }"
          @click="activeTab = 'history'"
        >Payment history</button>
      </div>

      <!-- Payment rules tab -->
      <div v-if="activeTab === 'rules'" class="cpd-tab-content">
        <template v-if="isDelegated">
          <p class="cpd-delegated-text">This consent allows us to request payments of varying amounts.</p>
          <p class="cpd-delegated-text">We will ask you to authenticate and approve each payment before it is initiated.</p>
          <p class="cpd-delegated-text">We cannot take any payment without your authorisation.</p>
          <p class="cpd-delegated-text">No payments will be taken automatically.</p>
        </template>
        <div v-else class="cpd-rows">
          <template v-for="(row, i) in rulesConfig" :key="i">
            <div v-if="row.kind === 'amount'" class="cpd-row">
              <span class="cpd-label">{{ row.label }}</span>
              <DirhamAmount :amount="row.amount" class="cpd-amount" />
            </div>
            <div v-else class="cpd-row">
              <span class="cpd-label">{{ row.label }}</span>
              <span class="cpd-value">{{ row.value }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Payment history tab -->
      <div v-else class="cpd-tab-content">
        <div
          v-for="(payment, index) in paymentHistory"
          :key="index"
          class="cpd-payment-entry"
          :class="{ 'cpd-payment-entry-bordered': index < paymentHistory.length - 1 }"
        >
          <div class="cpd-payment-top">
            <span class="cpd-payment-datetime">{{ payment.dateTime }}</span>
            <div class="cpd-badge" :class="paymentStatusClass(payment.status)">{{ payment.status }}</div>
          </div>
          <div class="cpd-row">
            <span class="cpd-label">Amount</span>
            <DirhamAmount :amount="payment.amount.toFixed(2)" class="cpd-amount" />
          </div>
          <div class="cpd-row">
            <span class="cpd-label">Purpose</span>
            <span class="cpd-value">{{ payment.purpose }}</span>
          </div>
          <div class="cpd-row">
            <span class="cpd-label">Reference</span>
            <span class="cpd-value">{{ payment.reference }}</span>
          </div>
        </div>

        <div v-if="paymentHistory.length === 0" class="cpd-empty">
          No payment history yet.
        </div>
      </div>

    </template>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.cpd-frame {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  width: 316px;
  background: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
}

/* Tabs — match page 1 style */
.cpd-tabs {
  display: flex;
  width: 100%;
  border-bottom: 2px solid #35bfd4;
}

.cpd-tab {
  flex: 1;
  height: 42px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.cpd-tab-active {
  border-bottom: 4px solid #35bfd4;
  color: #35bfd4;
  font-weight: 600;
}

.cpd-tab-content {
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cpd-section-title {
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 19px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

/* Rows */
.cpd-rows {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cpd-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.cpd-label {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #616786;
  white-space: nowrap;
  flex-shrink: 0;
}

.cpd-value {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
  text-align: right;
}

.cpd-amount {
  margin-left: 0;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
  height: auto;
}

/* Payment entries (used by both schedule and history) */
.cpd-payment-entry {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-bottom: 12px;
}

.cpd-payment-entry-bordered {
  border-bottom: 1px solid rgba(217, 217, 217, 0.6);
  margin-bottom: 12px;
}

.cpd-payment-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.cpd-payment-datetime {
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 11px;
  line-height: 140%;
  letter-spacing: -0.01em;
  color: #616786;
}

/* Status badges */
.cpd-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 20px;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 10px;
  line-height: 160%;
  color: #ffffff;
  flex-shrink: 0;
}

.cpd-delegated-text {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
  margin: 0;
}

.cpd-badge-successful { background: #21a35d; }
.cpd-badge-failed     { background: #dc2626; }
.cpd-badge-pending    { background: #2563eb; }
.cpd-badge-upcoming   { background: #64748b; }

.cpd-empty {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  color: #616786;
  text-align: center;
  padding: 20px 0;
}
</style>

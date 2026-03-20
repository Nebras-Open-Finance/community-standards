<template>
  <ConsentManagementDetail
    v-if="selectedConnection"
    :connection="selectedConnection"
    @back="selectedConnection = null"
  />
  <div v-else class="consent-management-frame">
    <div class="consent-management-screen-name">
      <div class="consent-management-screen-bar"></div>
      <svg class="consent-management-arrow-left" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <div class="consent-management-screen-title">TPP</div>
    </div>

    <div class="consent-management-card-shell">
      <div class="consent-management-card">
        <div class="consent-management-header">
          <div class="consent-management-main-title">AlTareq Connections</div>
          <div class="consent-management-subtitle">
            {{ connectionSubtitle }}
          </div>
        </div>

        <div class="consent-management-manage-hint">
          <span>Tap Manage to view, update or disconnect</span>
          <div class="consent-management-info-trigger">
            <button
              type="button"
              class="consent-management-info-button"
              aria-describedby="consent-management-info-tooltip"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <circle cx="8" cy="8" r="6.75" stroke="#0C1441" stroke-width="1.25" />
                <path d="M8 4.5V4.7" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" />
                <path d="M8 7V11" stroke="#0C1441" stroke-width="1.25" stroke-linecap="round" />
              </svg>
            </button>
            <div id="consent-management-info-tooltip" class="consent-management-info-message" role="tooltip">
              <p>{{ tooltipText.p1 }}</p>
              <p>{{ tooltipText.p2 }}</p>
            </div>
          </div>
        </div>

        <div class="consent-management-controls">
          <div class="consent-management-filter">
            <div class="consent-management-filter-row">
              <button
                type="button"
                class="consent-management-filter-toggle"
                :aria-expanded="isFilterPanelOpen"
                @click="isFilterPanelOpen = !isFilterPanelOpen"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="#36BFD4" fill-opacity="0.12"
                    stroke="#36BFD4" />
                  <path d="M7.5 8H16.5L12.5 12V16L11 15.25V12L7.5 8Z" fill="#36BFD4" />
                </svg>
                <span>Filter</span>
              </button>
            </div>

            <div v-if="isFilterPanelOpen" class="consent-management-filter-fields">
              <label class="consent-management-filter-field">
                <span class="consent-management-filter-field-label">LFI Name</span>
                <select v-model="filters.lfiName" class="consent-management-filter-select" @change="onFilterSelected">
                  <option v-for="option in lfiOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </label>

              <label class="consent-management-filter-field">
                <span class="consent-management-filter-field-label">Consent Type</span>
                <select v-model="filters.consentType" class="consent-management-filter-select" @change="onFilterSelected">
                  <option v-for="option in consentTypeOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </label>

              <label class="consent-management-filter-field">
                <span class="consent-management-filter-field-label">Consent State</span>
                <select v-model="filters.consentState" class="consent-management-filter-select" @change="onFilterSelected">
                  <option v-for="option in consentStateOptions" :key="option" :value="option">{{ option }}</option>
                </select>
              </label>
            </div>

            <div v-if="appliedFilters.length > 0" class="consent-management-applied-filters">
              <div class="consent-management-chips">
                <div class="consent-management-chips-row">
                  <button
                    v-for="filter in appliedFilters"
                    :key="filter.key"
                    type="button"
                    class="consent-management-chip"
                    @click="removeFilter(filter.key)"
                  >
                    <span class="consent-management-chip-text">{{ filter.value }}</span>
                    <svg
                      class="consent-management-chip-remove"
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M1 1L5 5" />
                      <path d="M5 1L1 5" />
                    </svg>
                  </button>

                  <button type="button" class="consent-management-chip consent-management-chip-clear" @click="clearFilters">
                    <span class="consent-management-chip-text">Clear</span>
                  </button>
                </div>
                <div class="consent-management-results">Results: {{ displayedConnections.length }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="consent-management-divider"></div>

        <div class="consent-management-tabs">
          <button type="button" class="consent-management-tab"
            :class="{ 'consent-management-tab-active': activeTab === 'current' }"
            @click="activeTab = 'current'">
            Current
          </button>
          <button type="button" class="consent-management-tab"
            :class="{ 'consent-management-tab-active': activeTab === 'history' }"
            @click="activeTab = 'history'">
            History
          </button>
        </div>

        <div class="consent-management-connection-list">
          <div
            v-for="(connection, index) in displayedConnections"
            :key="`${connection.lfiDigit}-${connection.type}-${index}`"
            class="consent-management-connection"
            role="button"
            tabindex="0"
            @click="handleManage(connection)"
            @keydown.enter.prevent="handleManage(connection)"
            @keydown.space.prevent="handleManage(connection)"
          >
            <div class="consent-management-connection-header">
              <div class="consent-management-connection-name">[LFI {{ connection.lfiDigit }}]</div>
              <div class="consent-management-status" :class="displayStatusClass(connection)">{{ displayStatus(connection) }}</div>
            </div>
            <div v-if="connectionCountLabel(connection)" class="consent-management-connection-count">
              {{ connectionCountLabel(connection) }}
            </div>
            <div v-else class="consent-management-connection-gap"></div>
            <div
              v-for="(line, lineIndex) in connectionMetaLines(connection)"
              :key="`${connection.lfiDigit}-${connection.type}-${index}-${lineIndex}`"
              :class="[
                'consent-management-connection-meta',
                { 'consent-management-connection-meta-row': line.type !== 'text' }
              ]"
            >
              <template v-if="line.type === 'amount'">
                <span class="consent-management-connection-meta-label">{{ line.label }}</span>
                <DirhamAmount :amount="formatAmount(line.amount)" />
              </template>
              <template v-else-if="line.type === 'labelValue'">
                <span class="consent-management-connection-meta-label">{{ line.label }}:</span>
                <span class="consent-management-connection-meta-value">{{ line.value }}</span>
              </template>
              <template v-else>
                {{ line.text }}
              </template>
            </div>

            <svg class="consent-management-chevron" xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div v-if="displayedConnections.length === 0" class="consent-management-empty-state">
            No connections yet
            <br/> <br/>
            You don’t have any consents in this tab.
             <br/> <br/>
            Connect an account to get started.
          </div>
        </div>
      </div>
    </div>

    <div class="consent-management-footer">
      <button type="button" class="consent-management-cta">Connect another account</button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useSharedState } from '../Composables/useSharedState.ts'
import DirhamAmount from './DirhamAmount.vue'
import ConsentManagementDetail from './ConsentManagementDetail.vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'all' // 'all' | 'data-sharing' | 'payments'
  }
})

const { sharedState } = useSharedState()
const selectedConnection = ref(null)
const activeTab = ref('current')
const isFilterPanelOpen = ref(false)
const filters = reactive({
  lfiName: 'All',
  consentType: 'All',
  consentState: 'All'
})

const HISTORY_STATUSES = new Set([
  'Rejected',
  'Consumed',
  'Expired',
  'Revoked'
])

const VALID_CONSENT_STATUSES = [
  'AwaitingAuthorization',
  'Authorized',
  'Rejected',
  'Suspended',
  'Paused',
  'Consumed',
  'Expired',
  'Revoked'
]

const VALID_TYPES = [
  'Data Sharing',
  'Single Instant Payment',
  'Multi Payment',
  'Multi Payment (VariableOnDemand)',
  'Multi Payment (FixedOnDemand)',
  'Multi Payment (VariablePeriodicSchedule)',
  'Multi Payment (FixedPeriodicSchedule)',
  'Multi Payment (VariableDefinedSchedule)',
  'Multi Payment (FixedDefinedSchedule)',
  'Multi Payment (DelegatedSCA)'
]

const VALID_PAYMENT_STATUSES = [
  'Pending',
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
  'Rejected'
]

const MULTI_PAYMENT_EXPIRY = 'Connection expires 30/03/2025'
const EMPTY_DATE = '--/--/----'

const defaultConnections = [
  {
    lfiDigit: 1,
    connectedAccountNumber: 2,
    maskedIban: 'AE** **** **** **** 0123 456',
    type: 'Data Sharing',
    lastDataReceived: 'Last data received 30/09/2024',
    expiry: 'Connection expires 30/03/2025',
    status: 'Authorized',
    paymentDate: '30/09/2024',
    paymentAmount: 0
  },
  {
    lfiDigit: 2,
    connectedAccountNumber: 1,
    maskedIban: 'AE** **** **** **** 9876 543',
    type: 'Single Instant Payment',
    lastDataReceived: 'Last data received 16/12/2024',
    expiry: 'Connection expires 15/12/2025',
    status: 'AwaitingAuthorization',
    paymentDate: '16/12/2024',
    paymentAmount: 1
  }
]

function normalizeDate(value, fallback = EMPTY_DATE) {
  if (typeof value !== 'string') return fallback
  const directDatePattern = /^\d{2}\/\d{2}\/\d{4}$/
  if (directDatePattern.test(value)) return value
  const extractedDate = value.match(/(\d{2}\/\d{2}\/\d{4})/)
  return extractedDate?.[1] ?? fallback
}

function normalizeAmount(value, fallback = 0) {
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) return fallback
  return numericValue
}

function formatAmount(value) {
  const rounded = Math.round(value * 100) / 100
  return rounded.toFixed(2)
}

function isMultiPaymentType(type) {
  return typeof type === 'string' && type.startsWith('Multi Payment')
}

function requiresZeroPaymentAmount(status) {
  return status === 'AwaitingAuthorization'
}

function requiresPositivePaymentAmount(type, status) {
  if (isMultiPaymentType(type)) return true
  return type === 'Single Instant Payment' && status === 'Consumed'
}

function ensurePositivePaymentAmount(amount) {
  return amount > 0 ? amount : 0.01
}

function normalizeConnection(connection, fallback) {
  const numericLfi = Number(connection?.lfiDigit)
  const numericConnectedAccountNumber = Number(connection?.connectedAccountNumber)
  const lfiDigit = Number.isInteger(numericLfi) && numericLfi >= 1 && numericLfi <= 9
    ? numericLfi
    : fallback.lfiDigit
  const connectedAccountNumber = Number.isInteger(numericConnectedAccountNumber) && numericConnectedAccountNumber >= 1
    ? numericConnectedAccountNumber
    : fallback.connectedAccountNumber

  const status = VALID_CONSENT_STATUSES.includes(connection?.status)
    ? connection.status
    : fallback.status

  const type = VALID_TYPES.includes(connection?.type)
    ? connection.type
    : fallback.type

  const fallbackPaymentDate = normalizeDate(fallback?.paymentDate ?? fallback?.lastDataReceived)
  const paymentDate = normalizeDate(
    connection?.paymentDate
      ?? connection?.payment_date
      ?? connection?.date
      ?? connection?.lastDataReceived,
    fallbackPaymentDate
  )

  const paymentAmount = normalizeAmount(
    connection?.paymentAmount
      ?? connection?.payment_amount
      ?? connection?.amount
      ?? connection?.totalPaidToDate
      ?? connection?.total_paid_to_date,
    normalizeAmount(fallback?.paymentAmount, 0)
  )
  const normalizedPaymentAmount = requiresZeroPaymentAmount(status)
    ? 0
    : (requiresPositivePaymentAmount(type, status)
      ? ensurePositivePaymentAmount(paymentAmount)
      : paymentAmount)

  const lastDataReceived = typeof connection?.lastDataReceived === 'string'
    ? connection.lastDataReceived
    : fallback.lastDataReceived

  const expiry = typeof connection?.expiry === 'string'
    ? connection.expiry
    : fallback.expiry

  const maskedIban = typeof connection?.maskedIban === 'string'
    ? connection.maskedIban
    : fallback.maskedIban

  const paymentStatus = VALID_PAYMENT_STATUSES.includes(connection?.paymentStatus)
    ? connection.paymentStatus
    : (status === 'Consumed' && type === 'Single Instant Payment'
        ? (VALID_PAYMENT_STATUSES.includes(fallback?.paymentStatus) ? fallback.paymentStatus : undefined)
        : undefined)

  return {
    lfiDigit,
    connectedAccountNumber,
    status,
    type,
    lastDataReceived,
    expiry,
    paymentDate,
    paymentAmount: normalizedPaymentAmount,
    maskedIban,
    paymentStatus
  }
}

const connectionSubtitle = computed(() => {
  if (props.mode === 'data-sharing') return 'These are the account providers we are connected to for data sharing'
  if (props.mode === 'payments') return 'These are the payment permissions you have given to us'
  return 'These are the account providers we are connected to for data sharing and payments'
})

const tooltipText = computed(() => {
  if (props.mode === 'data-sharing') return {
    p1: 'This page gives you an overview of the data-sharing permissions you have given to us.',
    p2: 'We will continue to share data on your behalf until the permission ends or you cancel.'
  }
  if (props.mode === 'payments') return {
    p1: 'This page gives you an overview of the payment permissions you have given to us.',
    p2: 'We will continue to make payments on your behalf, where applicable, until the permission ends or you cancel.'
  }
  return {
    p1: 'This page gives you an overview of all the data-sharing and payment permissions you have given to us.',
    p2: 'We will continue to share data and make payments on your behalf, where applicable, until the permission ends or you cancel.'
  }
})

const resolvedConnections = computed(() => {
  const configuredConnections = sharedState.value?.consentConnections
  const normalized = (!Array.isArray(configuredConnections) || configuredConnections.length === 0)
    ? defaultConnections
    : configuredConnections.map((connection, index) =>
        normalizeConnection(connection, defaultConnections[index % defaultConnections.length])
      )

  if (props.mode === 'data-sharing') {
    return normalized.filter(c => c.type === 'Data Sharing')
  }
  if (props.mode === 'payments') {
    return normalized.filter(c => c.type !== 'Data Sharing')
  }
  return normalized
})

const currentConnections = computed(() =>
  resolvedConnections.value.filter(connection => !HISTORY_STATUSES.has(connection.status))
)

const historyConnections = computed(() =>
  resolvedConnections.value.filter(connection => HISTORY_STATUSES.has(connection.status))
)

const displayedConnections = computed(() =>
  (activeTab.value === 'history' ? historyConnections.value : currentConnections.value).filter(connection => {
    if (filters.lfiName !== 'All' && `LFI ${connection.lfiDigit}` !== filters.lfiName) return false
    if (filters.consentType !== 'All' && connection.type !== filters.consentType) return false
    if (filters.consentState !== 'All' && connection.status !== filters.consentState) return false
    return true
  })
)

const appliedFilters = computed(() => {
  const entries = [
    { key: 'lfiName', value: filters.lfiName },
    { key: 'consentType', value: filters.consentType },
    { key: 'consentState', value: filters.consentState }
  ]

  return entries
    .filter(entry => entry.value !== 'All')
    .map(entry => ({
      key: entry.key,
      value: String(entry.value)
    }))
})

const lfiOptions = computed(() => {
  const values = Array.from(new Set(resolvedConnections.value.map(connection => `LFI ${connection.lfiDigit}`)))
    .sort((a, b) => Number(a.replace('LFI ', '')) - Number(b.replace('LFI ', '')))
  return ['All', ...values]
})

const consentTypeOptions = computed(() => {
  const values = Array.from(new Set(resolvedConnections.value.map(connection => connection.type)))
  return ['All', ...values]
})

const consentStateOptions = computed(() => {
  const values = Array.from(new Set(resolvedConnections.value.map(connection => connection.status)))
  return ['All', ...values]
})

function clearFilters() {
  filters.lfiName = 'All'
  filters.consentType = 'All'
  filters.consentState = 'All'
}

function onFilterSelected() {
  isFilterPanelOpen.value = false
}

function removeFilter(filterKey) {
  filters[filterKey] = 'All'
}

function accountCountLabel(count) {
  return count === 1 ? '1 Account Connected' : `${count} Accounts Connected`
}

function isPaymentType(type) {
  if (type === 'Single Instant Payment') return true
  return isMultiPaymentType(type)
}

function connectionCountLabel(connection) {
  if (isPaymentType(connection.type)) {
    if (connection.status === 'AwaitingAuthorization') return null
    if (connection.maskedIban) return connection.maskedIban
    return null
  }
  return accountCountLabel(connection.connectedAccountNumber)
}

function connectionMetaLines(connection) {
  if (connection.type === 'Single Instant Payment') {
    const lines = [
      { type: 'labelValue', label: 'Consent Type', value: 'Single Payment' },
      { type: 'labelValue', label: 'Payment Date', value: normalizeDate(connection.paymentDate) },
      { type: 'amount', label: 'Payment Amount', amount: connection.paymentAmount }
    ]
    return lines
  }

  if (isMultiPaymentType(connection.type)) {
    return [
      { type: 'labelValue', label: 'Consent Type', value: 'Flexi Pay' },
      { type: 'amount', label: 'Total paid to date', amount: 350 },
      { type: 'labelValue', label: 'Connection expires', value: normalizeDate(connection.expiry) }
    ]
  }

  return [
    { type: 'labelValue', label: 'Consent Type', value: connection.type },
    { type: 'labelValue', label: 'Last data received', value: normalizeDate(connection.lastDataReceived) },
    { type: 'labelValue', label: 'Connection expires', value: normalizeDate(connection.expiry) }
  ]
}

const ACCEPTED_PAYMENT_STATUSES = new Set([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting'
])

function handleManage(connection) {
  selectedConnection.value = connection
}

function statusClass(status) {
  if (status === 'Authorized') return 'consent-management-status-authorized'
  if (status === 'AwaitingAuthorization') return 'consent-management-status-awaiting'
  if (status === 'Suspended') return 'consent-management-status-suspended'
  if (status === 'Paused') return 'consent-management-status-paused'
  if (status === 'Consumed') return 'consent-management-status-consumed'
  if (status === 'Expired') return 'consent-management-status-expired'
  if (status === 'Rejected' || status === 'Revoked') return 'consent-management-status-rejected'
  return 'consent-management-status-awaiting'
}

const STATUS_LABELS = {
  'Authorized': 'Active',
  'Revoked': 'Cancelled',
  'AwaitingAuthorization': 'Pending'
}

function displayStatus(connection) {
  if (connection.type === 'Single Instant Payment' && connection.status === 'Consumed' && connection.paymentStatus) {
    if (connection.paymentStatus === 'Rejected') return 'Failed'
    if (ACCEPTED_PAYMENT_STATUSES.has(connection.paymentStatus)) return 'Successful'
  }
  return STATUS_LABELS[connection.status] ?? connection.status
}

function displayStatusClass(connection) {
  if (connection.type === 'Single Instant Payment' && connection.status === 'Consumed' && connection.paymentStatus) {
    if (connection.paymentStatus === 'Rejected') return 'consent-management-status-rejected'
    if (ACCEPTED_PAYMENT_STATUSES.has(connection.paymentStatus)) return 'consent-management-status-authorized'
  }
  return statusClass(connection.status)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.consent-management-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 30px;
  gap: 20px;
  width: 372px;
  background: #f4f8fb;
  zoom: 0.6;
}

.consent-management-screen-name {
  width: 372px;
  height: 56px;
  position: relative;
}

.consent-management-screen-bar {
  position: absolute;
  inset: 0;
  background: #35bfd4;
}

.consent-management-arrow-left {
  position: absolute;
  left: 28px;
  top: 16px;
  z-index: 1;
}

.consent-management-screen-title {
  position: absolute;
  left: 50%;
  top: 12px;
  transform: translateX(-50%);
  width: 48px;
  height: 32px;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 26px;
  line-height: 124%;
  text-align: center;
  color: #f5f5fd;
  z-index: 1;
}

.consent-management-card-shell {
  width: 316px;
}

.consent-management-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 316px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 12px;
  box-sizing: border-box;
}

.consent-management-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.consent-management-main-title {
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 19px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.consent-management-subtitle {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  color: #0b1340;
}

.consent-management-manage-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.02em;
  color: #36bfd4;
}

.consent-management-info-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: help;
}

.consent-management-info-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.consent-management-info-button:focus-visible {
  outline: 2px solid #36bfd4;
  outline-offset: 2px;
  border-radius: 50%;
}

.consent-management-info-message {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 30;
  width: 270px;
  padding: 10px 12px;
  border: 1px solid rgba(54, 191, 212, 0.5);
  border-radius: 10px;
  background: rgba(54, 191, 212, 0.24);
  backdrop-filter: blur(2px);
  box-shadow: 0 6px 18px rgba(12, 20, 65, 0.12);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s ease;
  pointer-events: none;
}

.consent-management-info-trigger:hover .consent-management-info-message,
.consent-management-info-trigger:focus-within .consent-management-info-message {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.consent-management-info-message p {
  margin: 0;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 11px;
  line-height: 140%;
  letter-spacing: -0.01em;
  color: #0c1441;
}

.consent-management-info-message p + p {
  margin-top: 8px;
}

.consent-management-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.consent-management-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #a3a6bb;
  border-radius: 4px;
  height: 37px;
  padding: 10px 12px;
  box-sizing: border-box;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #a3a6bb;
}

.consent-management-filter {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.consent-management-filter-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.consent-management-filter-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0c1441;
  cursor: pointer;
}

.consent-management-filter-toggle:focus-visible {
  outline: 2px solid #36bfd4;
  outline-offset: 2px;
}

.consent-management-filter-fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid #e7e8ef;
  border-radius: 10px;
  background: #ffffff;
}

.consent-management-applied-filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 292px;
  min-height: 64px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
}

.consent-management-chips {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  gap: 10px;
  width: 292px;
  min-height: 64px;
  box-sizing: border-box;
}

.consent-management-chips-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  gap: 8px;
  width: 272px;
  min-height: 22px;
}

.consent-management-chip {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 7px;
  gap: 10px;
  min-height: 22px;
  border: 0;
  background: #e7e8ef;
  border-radius: 15px;
  cursor: pointer;
}

.consent-management-chip-text {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0c1441;
  white-space: nowrap;
}

.consent-management-chip-remove {
  width: 6px;
  height: 6px;
  stroke: #0c1441;
  stroke-width: 1.2;
  stroke-linecap: round;
  fill: none;
  flex: none;
}

.consent-management-chip-clear {
  min-width: 63px;
  justify-content: center;
  background: #36bfd4;
}

.consent-management-chip-clear .consent-management-chip-text {
  color: #ffffff;
}

.consent-management-results {
  width: 100%;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 10px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #616786;
  text-align: left;
}

.consent-management-filter-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.consent-management-filter-field-label {
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 11px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.consent-management-filter-select {
  width: 100%;
  min-height: 34px;
  border: 1px solid #d6d9e7;
  border-radius: 8px;
  background: #ffffff;
  color: #0c1441;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  padding: 6px 8px;
}

.consent-management-divider {
  width: 100%;
  border-top: 1px solid #e7e8ef;
}

.consent-management-tabs {
  display: flex;
  width: 100%;
  border-bottom: 2px solid #35bfd4;
}

.consent-management-tab {
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 42px;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.consent-management-tab-active {
  border-bottom: 4px solid #35bfd4;
  color: #35bfd4;
  font-weight: 600;
}

.consent-management-connection-list {
  display: flex;
  flex-direction: column;
}

.consent-management-empty-state {
  padding: 72px 0;
  text-align: center;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #616786;
}

.consent-management-connection {
  position: relative;
  padding: 0 32px 20px 0;
  border-bottom: 1px solid rgba(11, 19, 64, 0.2);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease;
  outline: none;
}

.consent-management-connection + .consent-management-connection {
  padding-top: 10px;
}

.consent-management-connection:hover {
  background: rgba(54, 191, 212, 0.05);
  /* box-shadow: inset 0 0 0 1px rgba(54, 191, 212, 0.25); */
}

.consent-management-connection:focus-visible {
  box-shadow: 0 0 0 2px #36bfd4;
}

.consent-management-connection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.consent-management-status {
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
  margin-right: -20px;
}

.consent-management-status-authorized {
  background: #21a35d;
}

.consent-management-status-awaiting {
  background: #2563eb;
}

.consent-management-status-suspended {
  background: #d97706;
}

.consent-management-status-paused {
  background: #b45309;
}

.consent-management-status-consumed {
  background: #475569;
}

.consent-management-status-expired {
  background: #6b7280;
}

.consent-management-status-rejected {
  background: #dc2626;
}

.consent-management-connection-name {
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.consent-management-connection-gap {
  height: 10px;
}

.consent-management-connection-count {
  margin-top: 8px;
  margin-bottom: 6px;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 13px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
  font-style: italic;
}

.consent-management-connection-meta {
  margin-top: 8px;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 11px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #616786;
}

.consent-management-connection-meta-amount {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.consent-management-connection-meta-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  column-gap: 8px;
}

.consent-management-connection-meta-row :deep(.dirham-amount) {
  font-size: 11px;
}

.consent-management-connection-meta-label {
  color: #616786;
}

.consent-management-connection-meta-value {
  color: #0b1340;
}

.consent-management-chevron {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(11, 19, 64, 0.2);
  transition: color 0.15s ease, transform 0.15s ease;
  flex-shrink: 0;
}

.consent-management-connection:hover .consent-management-chevron {
  color: #36bfd4;
  transform: translateY(-50%) translateX(2px);
}

.consent-management-footer {
  width: 372px;
  padding: 20px 28px 0;
  box-sizing: border-box;
}

.consent-management-cta {
  width: 316px;
  height: 55px;
  border: 0;
  border-radius: 66px;
  background: #36bfd4;
  color: #ffffff;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.03em;
  cursor: pointer;
}
</style>

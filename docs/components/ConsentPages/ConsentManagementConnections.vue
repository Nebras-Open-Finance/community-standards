<template>
  <div class="consent-management-frame">
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
            These are the account providers we are connected to for data sharing and payments
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
              <p>This page gives you an overview of all the data-sharing and payment permissions you have given to us.</p>
              <p>We will continue to share data and make payments on your behalf, where applicable, until the permission ends or you cancel.</p>
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
          <div v-for="(connection, index) in displayedConnections" :key="`${connection.lfiDigit}-${connection.type}-${index}`"
            class="consent-management-connection">
            <div class="consent-management-status" :class="statusClass(connection.status)">{{ connection.status }}</div>

            <div class="consent-management-connection-name">[LFI {{ connection.lfiDigit }}]</div>
            <div class="consent-management-connection-count">{{ accountCountLabel(connection.connectedAccountNumber) }}</div>
            <div
              v-for="(line, lineIndex) in connectionMetaLines(connection)"
              :key="`${connection.lfiDigit}-${connection.type}-${index}-${lineIndex}`"
              :class="[
                'consent-management-connection-meta',
                { 'consent-management-connection-meta-amount': line.type === 'amount' }
              ]"
            >
              <template v-if="line.type === 'amount'">
                <span>{{ line.label }}</span>
                <div class="consent-page-account-amount-container">
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.926 4.81517L12.8277 4.735C12.6689 4.60135 12.48 4.53454 12.2759 4.53454H11.2176C11.2327 4.6949 11.2403 4.85527 11.2403 5.02899C11.2403 5.20271 11.2327 5.36307 11.2176 5.53012H11.9357C12.48 5.53012 12.926 5.98448 12.926 6.55242V6.80633L12.8277 6.71947C12.6689 6.59251 12.48 6.5257 12.2759 6.5257H11.0588C10.4768 8.77749 8.44345 10.0002 5.23841 10.0002H1.1263C1.1263 10.0002 1.68566 9.61933 1.68566 8.34313V6.5257H0.997795C0.445983 6.5257 0 6.06466 0 5.50339V5.24949L0.105827 5.32967C0.257007 5.45662 0.445983 5.53012 0.650077 5.53012H1.68566V4.53454H0.997795C0.445983 4.53454 0 4.0735 0 3.51223V3.25833L0.105827 3.34519C0.257007 3.47214 0.445983 3.53896 0.650077 3.53896H1.68566V1.79502C1.68566 0.478721 1.1263 0.0644531 1.1263 0.0644531H5.23841C8.35274 0.0644531 10.439 1.27385 11.0513 3.53896H11.9357C12.48 3.53896 12.926 3.99332 12.926 4.56127V4.81517ZM5.08724 0.558902H3.37134V3.53896H9.13888C8.74581 1.46762 7.40786 0.558902 5.08724 0.558902ZM9.27494 5.02899C9.27494 4.85527 9.26738 4.6949 9.25982 4.53454H3.37134V5.53012H9.25982C9.26738 5.36307 9.27494 5.20271 9.27494 5.02899ZM3.37134 9.49907H5.10235C7.55904 9.44564 8.76849 8.40327 9.13888 6.5257H3.37134V9.49907Z" fill="#616786" />
                  </svg>
                  <div class="consent-page-account-amount">{{ formatAmount(line.amount) }}</div>
                </div>
              </template>
              <template v-else>
                {{ line.text }}
              </template>
            </div>

            <button class="consent-management-manage-button" type="button">Manage</button>
          </div>
          <div v-if="displayedConnections.length === 0" class="consent-management-empty-state">
            No consents in this tab.
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

const { sharedState } = useSharedState()
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
  'Multi Payment (FixedDefinedSchedule)'
]

const MULTI_PAYMENT_EXPIRY = 'Connection expires 30/03/2025'
const EMPTY_DATE = '--/--/----'

const defaultConnections = [
  {
    lfiDigit: 1,
    connectedAccountNumber: 2,
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

  return {
    lfiDigit,
    connectedAccountNumber,
    status,
    type,
    lastDataReceived,
    expiry,
    paymentDate,
    paymentAmount: normalizedPaymentAmount
  }
}

const resolvedConnections = computed(() => {
  const configuredConnections = sharedState.value?.consentConnections
  if (!Array.isArray(configuredConnections) || configuredConnections.length === 0) {
    return defaultConnections
  }

  return configuredConnections.map((connection, index) =>
    normalizeConnection(connection, defaultConnections[index % defaultConnections.length])
  )
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

function connectionMetaLines(connection) {
  if (connection.type === 'Single Instant Payment') {
    return [
      { type: 'text', text: 'Consent type: Single Payment' },
      { type: 'text', text: `Payment Date: ${connection.paymentDate}` },
      { type: 'amount', label: 'Payment Amount:', amount: connection.paymentAmount }
    ]
  }

  if (isMultiPaymentType(connection.type)) {
    const consentTypeLine = 'Consent Type: Flexi Pay'

    return [
      { type: 'text', text: consentTypeLine },
      { type: 'amount', label: 'Total paid to date', amount: connection.paymentAmount },
      { type: 'text', text: MULTI_PAYMENT_EXPIRY }
    ]
  }

  return [
    { type: 'text', text: `Consent type: ${connection.type}` },
    { type: 'text', text: connection.lastDataReceived },
    { type: 'text', text: connection.expiry }
  ]
}

function statusClass(status) {
  if (status === 'Authorized') return 'consent-management-status-authorized'
  if (status === 'AwaitingAuthorization') return 'consent-management-status-awaiting'
  if (status === 'Suspended') return 'consent-management-status-suspended'
  if (status === 'Consumed') return 'consent-management-status-consumed'
  if (status === 'Expired') return 'consent-management-status-expired'
  if (status === 'Rejected' || status === 'Revoked') return 'consent-management-status-rejected'
  return 'consent-management-status-awaiting'
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
  padding: 12px 0;
  text-align: center;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  color: #616786;
}

.consent-management-connection {
  position: relative;
  padding: 0 100px 20px 0;
  min-height: 130px;
  border-bottom: 1px solid rgba(11, 19, 64, 0.2);
}

.consent-management-connection + .consent-management-connection {
  margin-top: 10px;
}

.consent-management-status {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 99px;
  height: 24px;
  border-radius: 2px;
  background: #21a35d;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #f5f5fd;
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
  margin-top: 2px;
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.consent-management-connection-count {
  margin-top: 6px;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.consent-management-connection-meta {
  margin-top: 8px;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #616786;
}

.consent-management-connection-meta-amount {
  display: flex;
  align-items: center;
}

.consent-page-account-amount-container {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 4px;
  margin-left: auto;
  height: 14px;
}

.consent-page-account-amount {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #616786;
}

.consent-management-manage-button {
  position: absolute;
  right: 0;
  bottom: 20px;
  width: 75px;
  height: 29px;
  border: 1px solid #232b53;
  border-radius: 13px;
  background: transparent;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #232b53;
  cursor: default;
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
  cursor: default;
}
</style>

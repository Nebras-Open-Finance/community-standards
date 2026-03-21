<script setup>
import { computed, ref, provide, onUnmounted } from 'vue'
import { useSharedState } from '../Composables/useSharedState.ts'
import { CONSENT_EXAMPLE_STATE } from './consentExampleState.ts'
import ConsentDataSharingPermissions from './ConsentDataSharingPermissions.vue'
import ConsentPaymentPermissions from './ConsentPaymentPermissions.vue'
import DirhamAmount from './DirhamAmount.vue'

const props = defineProps({
  connection: { type: Object, required: true }
})

const emit = defineEmits(['back'])

const { updateField } = useSharedState()

const CONSENT_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
const truncatedConsentId = `${CONSENT_ID.slice(0, 8)}...${CONSENT_ID.slice(-4)}`
const copied = ref(false)

const EXAMPLE_ACCOUNTS = [
  { name: 'Current Account', iban: 'AE07 0331 2345 6123 4567 890' },
  { name: 'Savings Account', iban: 'AE07 0331 2345 6123 4567 891' }
]

function extractDate(value) {
  const match = String(value ?? '').match(/(\d{2}\/\d{2}\/\d{4})/)
  return match?.[1] ?? '--/--/----'
}

function parseExpiryToISO(expiry) {
  const match = String(expiry ?? '').match(/(\d{2})\/(\d{2})\/(\d{4})/)
  if (!match) return '2026-03-31T00:00:00Z'
  const [, dd, mm, yyyy] = match
  return `${yyyy}-${mm}-${dd}T00:00:00Z`
}

function copyConsentId() {
  navigator.clipboard.writeText(CONSENT_ID).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  })
}

const STATUS_LABELS = {
  'Authorized': 'Active',
  'Revoked': 'Cancelled',
  'AwaitingAuthorization': 'Pending'
}

const ACCEPTED_PAYMENT_STATUSES = new Set([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting'
])

const isDataSharing = computed(() => props.connection?.type === 'Data Sharing')

function unmaskIban(masked) {
  if (!masked) return 'AE07 0331 2345 6789 0123 456'
  let i = 0
  const fillers = ['0331', '2345', '6789']
  return masked
    .replace(/\*{2}/g, '07')
    .replace(/\*{4}/g, () => fillers[i++] ?? '0000')
}
const isMultiPayment   = computed(() => props.connection?.type?.startsWith('Multi Payment'))
const isSinglePayment  = computed(() => !isDataSharing.value && !isMultiPayment.value)

const SIP_EXAMPLE = {
  amount:    '500.00',
  reference: 'INV-2025-00142',
  purpose:   'Agency Commission (ACM)',
}

const EXAMPLE_PAYMENT_HISTORY = [
  { dateTime: '15/02/2025 14:22', amount: 200.00, purpose: 'Agency Commission (ACM)', reference: 'Test Purchase', status: 'Successful' },
  { dateTime: '01/02/2025 09:15', amount: 150.00, purpose: 'Agency Commission (ACM)', reference: 'Test Purchase', status: 'Successful' },
  { dateTime: '15/01/2025 11:45', amount: 50.00,  purpose: 'Agency Commission (ACM)', reference: 'Test Purchase', status: 'Failed' },
]

const paymentHistoryTotal = EXAMPLE_PAYMENT_HISTORY
  .filter(p => p.status === 'Successful')
  .reduce((sum, p) => sum + p.amount, 0)

const formattedPaymentAmount = computed(() => paymentHistoryTotal.toFixed(2))

provide('paymentHistory', EXAMPLE_PAYMENT_HISTORY)

const lastDataReceivedDate = computed(() => extractDate(props.connection?.lastDataReceived))

const DISCONNECT_STATUSES = new Set(['AwaitingAuthorization', 'Authorized', 'Suspended', 'Paused'])
const showDisconnect  = computed(() => DISCONNECT_STATUSES.has(props.connection?.status))
const showPause       = computed(() => props.connection?.status === 'Authorized' && !isSinglePayment.value)
const showReactivate  = computed(() => props.connection?.status === 'Paused')
const disconnectLabel = computed(() => isDataSharing.value ? 'Stop Sharing' : 'Cancel Permission')

// ─── Confirmation screen ──────────────────────────────────────────────────────
const confirmAction = ref(null) // null | 'revoke' | 'pause' | 'reactivate'

const confirmTitle = computed(() => {
  if (confirmAction.value === 'pause') {
    return isDataSharing.value ? 'Pause data sharing' : 'Pause payment permission'
  }
  if (confirmAction.value === 'reactivate') {
    return isDataSharing.value ? 'Resume data sharing' : 'Resume payment permission'
  }
  return isDataSharing.value ? 'Stop sharing' : 'Cancel payment permission'
})

const confirmButtonLabel = computed(() => {
  if (confirmAction.value === 'pause') return 'Confirm pause'
  if (confirmAction.value === 'reactivate') return 'Confirm reactivation'
  return isDataSharing.value ? 'Confirm stop sharing' : 'Confirm cancellation'
})

const confirmImpactText = computed(() => {
  if (confirmAction.value === 'pause') {
    return isDataSharing.value
      ? '[Placeholder] This text is set by the TPP and should explain to the customer what pausing this data sharing consent will mean for their experience — for example, which features or services will be temporarily unavailable and how they can resume access.'
      : '[Placeholder] This text is set by the TPP and should explain to the customer what pausing this payment permission will mean for their experience — for example, which upcoming payments will be affected and how they can resume the permission.'
  }
  if (confirmAction.value === 'reactivate') {
    return isDataSharing.value
      ? '[Placeholder] This text is set by the TPP and should explain to the customer what reactivating this data sharing consent will mean for their experience — for example, which features or services will become available again and any considerations for data that may have changed during the pause.'
      : '[Placeholder] This text is set by the TPP and should explain to the customer what reactivating this payment permission will mean for their experience — for example, when the next payment will be taken and any upcoming payment dates that apply.'
  }
  return isDataSharing.value
    ? '[Placeholder] This text is set by the TPP and should explain to the customer what stopping this data sharing consent will mean for their experience — for example, which features or services will stop working and what steps they would need to take to reconnect.'
    : '[Placeholder] This text is set by the TPP and should explain to the customer what cancelling this payment permission will mean for their experience — for example, which scheduled or future payments will not be processed and what they would need to do to set up a new permission.'
})

const displayStatus = computed(() => {
  const c = props.connection
  if (c?.type === 'Single Instant Payment' && c?.status === 'Consumed' && c?.paymentStatus) {
    if (c.paymentStatus === 'Rejected') return 'Failed'
    if (ACCEPTED_PAYMENT_STATUSES.has(c.paymentStatus)) return 'Successful'
  }
  return STATUS_LABELS[c?.status] ?? c?.status
})

const statusClass = computed(() => {
  const c = props.connection
  if (c?.type === 'Single Instant Payment' && c?.status === 'Consumed' && c?.paymentStatus) {
    if (c.paymentStatus === 'Rejected') return 'cmd-status-rejected'
    if (ACCEPTED_PAYMENT_STATUSES.has(c.paymentStatus)) return 'cmd-status-authorized'
  }
  const s = c?.status
  if (s === 'Authorized') return 'cmd-status-authorized'
  if (s === 'AwaitingAuthorization') return 'cmd-status-awaiting'
  if (s === 'Suspended') return 'cmd-status-suspended'
  if (s === 'Paused') return 'cmd-status-paused'
  if (s === 'Expired') return 'cmd-status-expired'
  if (s === 'Rejected' || s === 'Revoked') return 'cmd-status-rejected'
  if (s === 'Consumed') return 'cmd-status-consumed'
  return 'cmd-status-awaiting'
})

// Provide consent data directly to child components via inject.
// This is synchronous and guaranteed to be available before any child renders,
// avoiding all shared-state timing issues.
const consentState = computed(() => {
  const base = CONSENT_EXAMPLE_STATE[props.connection?.type] ?? CONSENT_EXAMPLE_STATE['Data Sharing']
  return { ...base, ExpirationDateTime: parseExpiryToISO(props.connection?.expiry) }
})
provide('detailConsent', consentState)
provide('detailConnection', computed(() => props.connection))
</script>

<template>
  <div class="cmd-frame">
    <div class="cmd-screen-name">
      <div class="cmd-screen-bar"></div>
      <button type="button" class="cmd-back-button" @click="confirmAction !== null ? confirmAction = null : emit('back')" aria-label="Back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14.5 5.5L8.5 12L14.5 18.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="cmd-screen-title">TPP</div>
    </div>

    <!-- ── Main detail view ───────────────────────────────────────────── -->
    <template v-if="confirmAction === null">
    <div class="cmd-card-shell">
      <div class="cmd-meta-card">
        <div class="cmd-meta-header">
          <div class="cmd-meta-lfi">[LFI {{ connection.lfiDigit }}]</div>
          <div class="cmd-status" :class="statusClass">{{ displayStatus }}</div>
        </div>
        <div class="cmd-meta-rows">
          <!-- Data Sharing: show consent type label/value -->
          <div v-if="isDataSharing" class="cmd-meta-row">
            <span class="cmd-meta-row-label">Consent type</span>
            <span class="cmd-meta-row-value">Data Sharing</span>
          </div>

          <!-- Multi Payment: show "Consent type / Flexi Pay" -->
          <div v-else-if="isMultiPayment" class="cmd-meta-row">
            <span class="cmd-meta-row-label">Consent type</span>
            <span class="cmd-meta-row-value">Flexi Pay</span>
          </div>

          <!-- Single payment: show type -->
          <div v-else class="cmd-meta-row">
            <span class="cmd-meta-row-label">Consent type</span>
            <span class="cmd-meta-row-value">Single Payment</span>
          </div>

          <button
            type="button"
            class="cmd-meta-row cmd-consent-id"
            :class="{ 'is-copied': copied }"
            @click="copyConsentId"
            :aria-label="`Consent ID: ${CONSENT_ID}. Click to copy.`"
          >
            <span class="cmd-meta-row-label">Consent ID</span>
            <span class="cmd-consent-id-right">
              <span class="cmd-consent-id-action">{{ copied ? 'Copied!' : 'Copy' }}</span>
              <span class="cmd-consent-id-value">{{ truncatedConsentId }}</span>
            </span>
          </button>

          <!-- Data Sharing: last data received -->
          <div v-if="isDataSharing" class="cmd-meta-row">
            <span class="cmd-meta-row-label">Last data received</span>
            <span class="cmd-meta-row-value">{{ lastDataReceivedDate }}</span>
          </div>

          <!-- Multi Payment: total paid to date -->
          <div v-else-if="isMultiPayment" class="cmd-meta-row cmd-meta-amount-row">
            <span class="cmd-meta-row-label">Total paid to date</span>
            <DirhamAmount :amount="formattedPaymentAmount" class="cmd-meta-dirham" />
          </div>
        </div>
      </div>

      <!-- Data sharing: linked accounts -->
      <div v-if="isDataSharing" class="cmd-accounts-card">
        <div class="cmd-accounts-header-section">
          <div class="cmd-accounts-header-text">Accounts</div>
        </div>
        <div class="cmd-accounts-list">
          <div v-for="account in EXAMPLE_ACCOUNTS" :key="account.iban" class="cmd-account-card">
            <div class="cmd-account-title-text">{{ account.name }}</div>
            <div class="cmd-account-subtext">{{ account.iban }}</div>
          </div>
        </div>
      </div>

      <!-- Single Instant Payment: Payment Details -->
      <div v-if="isSinglePayment" class="cmd-accounts-card">
        <div class="cmd-accounts-header-section">
          <div class="cmd-accounts-header-text">Payment details</div>
        </div>
        <div class="cmd-detail-rows">
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">Amount</span>
            <DirhamAmount :amount="SIP_EXAMPLE.amount" class="cmd-sip-amount" />
          </div>
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">Reference</span>
            <span class="cmd-meta-row-value">{{ SIP_EXAMPLE.reference }}</span>
          </div>
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">Payment purpose</span>
            <span class="cmd-meta-row-value">{{ SIP_EXAMPLE.purpose }}</span>
          </div>
          <div v-if="connection.status === 'Authorized'" class="cmd-detail-row">
            <span class="cmd-meta-row-label">Status</span>
            <div class="cmd-sip-badge cmd-sip-badge-authorized">Authorized</div>
          </div>
        </div>
      </div>

      <!-- Payment: From account card -->
      <div v-if="!isDataSharing" class="cmd-accounts-card">
        <div class="cmd-accounts-header-section">
          <div class="cmd-accounts-header-text">From account</div>
        </div>
        <div class="cmd-detail-rows">
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">Bank</span>
            <span class="cmd-meta-row-value">[LFI {{ connection.lfiDigit }}]</span>
          </div>
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">Payer Name</span>
            <span class="cmd-meta-row-value">Mohammed Al Rashidi</span>
          </div>
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">IBAN</span>
            <span class="cmd-meta-row-value cmd-iban-value">{{ unmaskIban(connection.maskedIban) }}</span>
          </div>
        </div>
      </div>

      <!-- Payment: To account card -->
      <div v-if="!isDataSharing" class="cmd-accounts-card">
        <div class="cmd-accounts-header-section">
          <div class="cmd-accounts-header-text">To account</div>
        </div>
        <div class="cmd-detail-rows">
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">Payee Name</span>
            <span class="cmd-meta-row-value">Ivan England</span>
          </div>
          <div class="cmd-detail-row">
            <span class="cmd-meta-row-label">IBAN</span>
            <span class="cmd-meta-row-value cmd-iban-value">AE07 0331 2345 6789 0123 456</span>
          </div>
        </div>
      </div>

      <ConsentDataSharingPermissions v-if="isDataSharing" />

      <!-- Multi Payment: Payment Rules / History tabs -->
      <ConsentPaymentPermissions v-else-if="isMultiPayment" />
    </div>

    <div v-if="showDisconnect || showReactivate" class="cmd-footer">
      <button v-if="showReactivate" type="button" class="cmd-reactivate-btn" @click="confirmAction = 'reactivate'">Reactivate</button>
      <button v-if="showPause" type="button" class="cmd-pause-btn" @click="confirmAction = 'pause'">Pause</button>
      <button v-if="showDisconnect" type="button" class="cmd-revoke-btn" @click="confirmAction = 'revoke'">{{ disconnectLabel }}</button>
    </div>
    </template>

    <!-- ── Confirmation screen ────────────────────────────────────────── -->
    <template v-else>

      <!-- Action title card -->
      <div class="cmd-confirm-card cmd-confirm-title-card">
        <div class="cmd-confirm-title">{{ confirmTitle }}</div>
        <div class="cmd-confirm-subtitle">Are you sure you want to proceed?</div>
      </div>

      <!-- What this will mean card -->
      <div class="cmd-confirm-card">
        <div class="cmd-confirm-impact-header">What this will mean</div>
        <p class="cmd-confirm-impact-text">{{ confirmImpactText }}</p>
      </div>

      <!-- Confirm footer -->
      <div class="cmd-confirm-footer">
        <button type="button" class="cmd-confirm-btn" :class="confirmAction === 'pause' ? 'cmd-confirm-btn-pause' : confirmAction === 'reactivate' ? 'cmd-confirm-btn-reactivate' : 'cmd-confirm-btn-revoke'">
          {{ confirmButtonLabel }}
        </button>
        <button type="button" class="cmd-confirm-back-btn" @click="confirmAction = null">Go back</button>
      </div>

    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.cmd-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 30px;
  gap: 20px;
  width: 372px;
  background: #f4f8fb;
  zoom: 0.6;
}

.cmd-screen-name {
  width: 372px;
  height: 56px;
  position: relative;
}

.cmd-screen-bar {
  position: absolute;
  inset: 0;
  background: #35bfd4;
}

.cmd-back-button {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.cmd-screen-title {
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

.cmd-card-shell {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 316px;
}

.cmd-meta-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 316px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 12px;
  box-sizing: border-box;
}

.cmd-meta-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.cmd-meta-lfi {
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 19px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

/* Rows container */
.cmd-meta-rows {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

/* Shared row style for all meta rows */
.cmd-meta-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.cmd-meta-row-label {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #616786;
  white-space: nowrap;
}

.cmd-meta-row-value {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.cmd-meta-type-label {
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.cmd-meta-amount-row {
  align-items: center;
}

.cmd-meta-amount-row :deep(.dirham-amount-container) {
  margin-left: 0;
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
  height: auto;
}

/* Consent ID button overrides */
.cmd-consent-id {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.cmd-consent-id-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cmd-consent-id-value {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.cmd-consent-id-action {
  font-family: 'Poppins';
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.01em;
  color: #35bfd4;
  opacity: 0;
  transition: opacity 0.15s;
  white-space: nowrap;
}

.cmd-consent-id:hover .cmd-consent-id-action,
.cmd-consent-id.is-copied .cmd-consent-id-action {
  opacity: 1;
}

.cmd-consent-id.is-copied .cmd-consent-id-action {
  color: #12b76a;
}

/* Status */
.cmd-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 20px;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 10px;
  line-height: 160%;
  width: fit-content;
  color: #ffffff;
}

.cmd-status-authorized { background: #21a35d; }
.cmd-status-awaiting { background: #2563eb; }
.cmd-status-suspended { background: #d97706; }
.cmd-status-paused { background: #b45309; }
.cmd-status-expired { background: #6b7280; }
.cmd-status-rejected { background: #dc2626; }
.cmd-status-consumed { background: #475569; }

/* Accounts card */
.cmd-accounts-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 12px;
  gap: 12px;
  width: 316px;
  background: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
}

.cmd-accounts-header-section {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 292px;
  height: 23px;
}

.cmd-accounts-header-text {
  width: 292px;
  height: 23px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0c1441;
}

.cmd-accounts-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 292px;
}

.cmd-detail-rows {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 292px;
}

.cmd-detail-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.cmd-iban-value {
  font-size: 11px;
}

.cmd-sip-amount {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #0b1340;
  height: auto;
}

.cmd-sip-badge {
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
}

.cmd-sip-badge-authorized { background: #21a35d; }

.cmd-account-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 4px;
  width: 292px;
}

.cmd-account-title-text {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0c1441;
}

.cmd-account-subtext {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #616786;
}

.cmd-footer {
  width: 316px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cmd-revoke-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid #f04438;
  border-radius: 66px;
  background: transparent;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #f04438;
  cursor: pointer;
  transition: background 0.15s;
}

.cmd-revoke-btn:hover {
  background: #fff0f0;
}

.cmd-pause-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid #d97706;
  border-radius: 66px;
  background: transparent;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #d97706;
  cursor: pointer;
  transition: background 0.15s;
}

.cmd-pause-btn:hover {
  background: #fffbeb;
}

.cmd-reactivate-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid #00897b;
  border-radius: 66px;
  background: transparent;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #00897b;
  cursor: pointer;
  transition: background 0.15s;
}

.cmd-reactivate-btn:hover {
  background: #e0f2f1;
}

/* ── Confirmation screen ───────────────────────────────────────────── */

.cmd-confirm-card {
  width: 316px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cmd-confirm-title-card {
  gap: 4px;
}

.cmd-confirm-title {
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 19px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.cmd-confirm-subtitle {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #616786;
}

.cmd-confirm-impact-header {
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 19px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
}

.cmd-confirm-impact-text {
  font-family: 'Poppins';
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  letter-spacing: -0.01em;
  color: #616786;
  margin: 0;
}

.cmd-confirm-footer {
  width: 316px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cmd-confirm-btn {
  width: 100%;
  padding: 10px;
  border-radius: 66px;
  background: transparent;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background 0.15s;
}

.cmd-confirm-btn-revoke {
  border: 1px solid #f04438;
  color: #f04438;
}

.cmd-confirm-btn-revoke:hover {
  background: #fff0f0;
}

.cmd-confirm-btn-pause {
  border: 1px solid #d97706;
  color: #d97706;
}

.cmd-confirm-btn-pause:hover {
  background: #fffbeb;
}

.cmd-confirm-btn-reactivate {
  border: 1px solid #00897b;
  color: #00897b;
}

.cmd-confirm-btn-reactivate:hover {
  background: #e0f2f1;
}

.cmd-confirm-back-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 66px;
  background: transparent;
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  letter-spacing: -0.01em;
  color: #0b1340;
  cursor: pointer;
  transition: background 0.15s;
}

.cmd-confirm-back-btn:hover {
  background: #f4f8fb;
}
</style>

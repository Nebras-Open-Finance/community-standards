<script setup>
import { ref, watch } from 'vue'
import { useSharedState } from './Composables/useSharedState.ts'

const { updateField } = useSharedState()

const ACCOUNT_TYPES = ['CurrentAccount', 'Savings', 'CreditCard', 'Mortgage', 'Finance']
const CURRENCIES = ['AED', 'USD', 'EUR', 'GBP', 'INR', 'SAR']
const TYPE_LABELS = {
  CurrentAccount: 'Current Account',
  Savings: 'Savings',
  CreditCard: 'Credit Card',
  Mortgage: 'Mortgage',
  Finance: 'Finance',
}
const MAX_ACCOUNTS = 5

function genIban(n) {
  return 'AE07 0331 2345 6123 4567 8' + String(90 + n).padStart(2, '0')
}
function genPan(n) {
  return '**** **** **** ' + String(1000 + (n % 9000))
}
function genMortgageRef(n) {
  return 'MTG-2024-' + String(n + 1).padStart(3, '0')
}
function genFinanceRef(n) {
  return 'FIN-2024-' + String(n + 1).padStart(3, '0')
}

function makeIdentifier(type, idx) {
  switch (type) {
    case 'CurrentAccount':
    case 'Savings':     return { iban: genIban(idx), currency: 'AED' }
    case 'CreditCard':  return { maskedPan: genPan(idx), cardName: 'Cashback Card' }
    case 'Mortgage':    return { mortgageRef: genMortgageRef(idx) }
    case 'Finance':     return { financeRef: genFinanceRef(idx) }
    default:            return { iban: genIban(idx) }
  }
}

function balanceLabel(account) {
  const curr = account.currency || 'AED'
  if (account.type === 'Mortgage' || account.type === 'Finance' || account.type === 'CreditCard') return `Outstanding (${curr})`
  return `Balance (${curr})`
}
function secondaryLabel(account) {
  const curr = account.currency || 'AED'
  if (account.type === 'CurrentAccount') return `Overdraft (${curr})`
  if (account.type === 'CreditCard') return `Available (${curr})`
  return null
}

let nextId = 3
const accounts = ref([
  { id: 1, type: 'CurrentAccount', iban: genIban(0), balance: 5000, secondary: 1500, currency: 'AED' },
  { id: 2, type: 'Savings',        iban: genIban(1), balance: 25000, secondary: null, currency: 'AED' },
])

function onTypeChange(account, newType) {
  const idx = accounts.value.findIndex(a => a.id === account.id)
  const prevBalance = account.balance
  const newAccount = {
    id: account.id,
    type: newType,
    balance: prevBalance,
    secondary: (newType === 'CurrentAccount' || newType === 'CreditCard') ? (account.secondary ?? 0) : null,
    ...makeIdentifier(newType, idx >= 0 ? idx : 0),
  }
  // Preserve currency when switching between CurrentAccount / Savings
  if ((newType === 'CurrentAccount' || newType === 'Savings') &&
      (account.type === 'CurrentAccount' || account.type === 'Savings') &&
      account.currency) {
    newAccount.currency = account.currency
  }
  accounts.value.splice(idx, 1, newAccount)
}

function addAccount() {
  if (accounts.value.length >= MAX_ACCOUNTS) return
  const idx = accounts.value.length
  accounts.value.push({
    id: nextId++,
    type: 'CurrentAccount',
    balance: 1000,
    secondary: 0,
    ...makeIdentifier('CurrentAccount', idx),
  })
}

function removeAccount(id) {
  if (accounts.value.length <= 1) return
  accounts.value = accounts.value.filter(a => a.id !== id)
}

watch(accounts, (val) => updateField('accounts', JSON.stringify(val)), { deep: true, immediate: true })
</script>

<template>
  <div class="ae-panel">
    <div class="ae-header">
      <span class="ae-title">Simulated User Accounts</span>
      <span class="ae-subtitle">Accounts the authenticated user holds at their bank</span>
    </div>

    <div class="ae-rows">
      <div v-for="account in accounts" :key="account.id" class="ae-row">

        <!-- Type selector -->
        <div class="ae-field ae-field-type">
          <label class="ae-label">Type</label>
          <select class="ae-select" :value="account.type" @change="onTypeChange(account, $event.target.value)">
            <option v-for="t in ACCOUNT_TYPES" :key="t" :value="t">{{ TYPE_LABELS[t] }}</option>
          </select>
        </div>

        <!-- IBAN (CurrentAccount / Savings) -->
        <div v-if="account.type === 'CurrentAccount' || account.type === 'Savings'" class="ae-field ae-field-ref">
          <label class="ae-label">IBAN</label>
          <input class="ae-input ae-input-mono" :value="account.iban" readonly />
        </div>

        <!-- Currency (CurrentAccount / Savings) -->
        <div v-if="account.type === 'CurrentAccount' || account.type === 'Savings'" class="ae-field ae-field-currency">
          <label class="ae-label">Currency</label>
          <select class="ae-select" v-model="account.currency">
            <option v-for="c in CURRENCIES" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <!-- Credit Card: Masked PAN + Card Name -->
        <template v-else-if="account.type === 'CreditCard'">
          <div class="ae-field ae-field-ref">
            <label class="ae-label">Masked PAN</label>
            <input class="ae-input ae-input-mono" :value="account.maskedPan" readonly />
          </div>
          <div class="ae-field ae-field-name">
            <label class="ae-label">Card Name</label>
            <input class="ae-input" v-model="account.cardName" placeholder="e.g. Platinum Card" />
          </div>
        </template>

        <!-- Mortgage Reference -->
        <div v-else-if="account.type === 'Mortgage'" class="ae-field ae-field-ref">
          <label class="ae-label">Mortgage Ref</label>
          <input class="ae-input ae-input-mono" v-model="account.mortgageRef" />
        </div>

        <!-- Finance Reference -->
        <div v-else-if="account.type === 'Finance'" class="ae-field ae-field-ref">
          <label class="ae-label">Finance Ref</label>
          <input class="ae-input ae-input-mono" v-model="account.financeRef" />
        </div>

        <!-- Balance / Outstanding -->
        <div class="ae-field ae-field-amount">
          <label class="ae-label">{{ balanceLabel(account) }}</label>
          <input class="ae-input" type="number" v-model.number="account.balance" min="0" step="100" />
        </div>

        <!-- Secondary (Overdraft / Available) -->
        <div v-if="secondaryLabel(account)" class="ae-field ae-field-amount">
          <label class="ae-label">{{ secondaryLabel(account) }}</label>
          <input class="ae-input" type="number" v-model.number="account.secondary" min="0" step="100" />
        </div>
        <div v-else class="ae-field ae-field-amount ae-field-placeholder"></div>

        <button class="ae-remove" @click="removeAccount(account.id)" :disabled="accounts.length <= 1" title="Remove">✕</button>
      </div>
    </div>

    <div class="ae-footer">
      <button class="ae-add" @click="addAccount" :disabled="accounts.length >= MAX_ACCOUNTS">+ Add Account</button>
      <span class="ae-count">{{ accounts.length }} / {{ MAX_ACCOUNTS }}</span>
    </div>
  </div>
</template>

<style scoped>
.ae-panel {
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 39, 127, 0.06);
  background: #fff;
}
.ae-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  background: rgba(0, 39, 127, 0.04);
  border-bottom: 1px solid #bfdbfe;
  flex-wrap: wrap;
}
.ae-title {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(0, 39, 127, 0.8);
}
.ae-subtitle {
  font-size: 0.72rem;
  color: rgba(0, 39, 127, 0.45);
}
.ae-rows {
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.ae-row {
  display: flex;
  align-items: flex-end;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding: 0.5rem 0.4rem;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e8f0fe;
}
.ae-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.ae-field-type { min-width: 120px; }
.ae-field-ref  { flex: 1; min-width: 150px; }
.ae-field-name { min-width: 120px; }
.ae-field-currency { width: 80px; }
.ae-field-amount { width: 130px; }
.ae-field-placeholder { width: 130px; visibility: hidden; }
.ae-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
}
.ae-select,
.ae-input {
  font-size: 0.8rem;
  padding: 4px 7px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  background: #fff;
  color: #1a202c;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;
}
.ae-select:focus,
.ae-input:focus { border-color: rgba(0, 39, 127, 0.5); }
.ae-input-mono {
  background: #f1f5f9;
  color: #64748b;
  font-family: monospace;
  font-size: 0.75rem;
}
.ae-remove {
  font-size: 0.75rem;
  width: 26px;
  height: 26px;
  border: 1px solid #fed7d7;
  border-radius: 5px;
  background: #fff0f0;
  color: #c53030;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 1px;
  transition: background 0.15s;
}
.ae-remove:hover:not(:disabled) { background: #fed7d7; }
.ae-remove:disabled { opacity: 0.3; cursor: not-allowed; }
.ae-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid #e8f0fe;
  background: #f8fafc;
}
.ae-add {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 12px;
  border: 1px solid rgba(0, 39, 127, 0.3);
  border-radius: 5px;
  background: #fff;
  color: rgba(0, 39, 127, 0.8);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.ae-add:hover:not(:disabled) { background: #e8f0fe; border-color: rgba(0, 39, 127, 0.6); }
.ae-add:disabled { opacity: 0.35; cursor: not-allowed; }
.ae-count { font-size: 0.72rem; color: #94a3b8; }
</style>

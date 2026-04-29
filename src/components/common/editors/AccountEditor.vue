<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useSharedState } from '../composables/useSharedState'

type AccountType = 'CurrentAccount' | 'Savings' | 'CreditCard' | 'Mortgage' | 'Finance'

interface Account {
  id: number
  type: AccountType
  balance: number
  secondary: number | null
  currency?: string
  iban?: string
  maskedPan?: string
  cardName?: string
  mortgageRef?: string
  financeRef?: string
}

const props = withDefaults(defineProps<{
  allowedTypes?: AccountType[]
  allowedCurrencies?: string[]
}>(), {
  allowedTypes: () => ['CurrentAccount', 'Savings', 'CreditCard', 'Mortgage', 'Finance'],
  allowedCurrencies: () => ['AED', 'USD', 'EUR', 'GBP', 'INR', 'SAR'],
})

const { updateField } = useSharedState()

const ACCOUNT_TYPES = computed(() => props.allowedTypes)
const CURRENCIES = computed(() => props.allowedCurrencies)
const TYPE_LABELS: Record<AccountType, string> = {
  CurrentAccount: 'Current Account',
  Savings: 'Savings',
  CreditCard: 'Credit Card',
  Mortgage: 'Mortgage',
  Finance: 'Finance',
}
const MAX_ACCOUNTS = 5

function genIban(n: number)        { return 'AE07 0331 2345 6789 0123 4' + String(56 + n).padStart(2, '0') }
function genPan(n: number)         { return '**** **** **** ' + String(1000 + (n % 9000)) }
function genMortgageRef(n: number) { return 'MTG-2024-' + String(n + 1).padStart(3, '0') }
function genFinanceRef(n: number)  { return 'FIN-2024-' + String(n + 1).padStart(3, '0') }

function makeIdentifier(type: AccountType, idx: number): Partial<Account> {
  switch (type) {
    case 'CurrentAccount':
    case 'Savings':    return { iban: genIban(idx), currency: 'AED' }
    case 'CreditCard': return { maskedPan: genPan(idx), cardName: 'Cashback Card' }
    case 'Mortgage':   return { mortgageRef: genMortgageRef(idx) }
    case 'Finance':    return { financeRef: genFinanceRef(idx) }
  }
}

function balanceLabel(account: Account) {
  const curr = account.currency || 'AED'
  if (account.type === 'Mortgage' || account.type === 'Finance' || account.type === 'CreditCard') return `Outstanding (${curr})`
  return `Balance (${curr})`
}
function secondaryLabel(account: Account): string | null {
  const curr = account.currency || 'AED'
  if (account.type === 'CurrentAccount') return `Overdraft (${curr})`
  if (account.type === 'CreditCard')     return `Available (${curr})`
  return null
}

let nextId = 3
const accounts = ref<Account[]>([
  { id: 1, type: 'CurrentAccount', iban: genIban(0), balance: 5000,  secondary: 1500, currency: 'AED' },
  { id: 2, type: 'Savings',        iban: genIban(1), balance: 25000, secondary: null, currency: 'AED' },
])

function onTypeChange(account: Account, newType: AccountType) {
  const idx = accounts.value.findIndex(a => a.id === account.id)
  const newAccount: Account = {
    id: account.id,
    type: newType,
    balance: account.balance,
    secondary: (newType === 'CurrentAccount' || newType === 'CreditCard') ? (account.secondary ?? 0) : null,
    ...makeIdentifier(newType, idx >= 0 ? idx : 0),
  }
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
  const defaultType = (ACCOUNT_TYPES.value[0] ?? 'CurrentAccount') as AccountType
  const defaultCurrency = CURRENCIES.value[0] ?? 'AED'
  accounts.value.push({
    id: nextId++,
    type: defaultType,
    balance: 1000,
    secondary: defaultType === 'CurrentAccount' || defaultType === 'CreditCard' ? 0 : null,
    currency: defaultCurrency,
    ...makeIdentifier(defaultType, idx),
  })
}

function removeAccount(id: number) {
  if (accounts.value.length <= 1) return
  accounts.value = accounts.value.filter(a => a.id !== id)
}

watch(accounts, (val) => updateField('accounts', JSON.stringify(val)), { deep: true, immediate: true })
</script>

<template>
  <section class="ae">
    <header class="ae__header">
      <span class="ae__eyebrow">
        <span class="ae__eyebrow-dash" />
        Simulated user accounts
      </span>
      <span class="ae__subtitle">Accounts the authenticated user holds at their bank</span>
    </header>

    <div class="ae__rows">
      <div v-for="account in accounts" :key="account.id" class="ae__row">

        <div class="ae__field ae__field--type">
          <label class="ae__label">Type</label>
          <select
            v-if="ACCOUNT_TYPES.length > 1"
            class="ae__control"
            :value="account.type"
            @change="onTypeChange(account, ($event.target as HTMLSelectElement).value as AccountType)"
          >
            <option v-for="t in ACCOUNT_TYPES" :key="t" :value="t">{{ TYPE_LABELS[t] }}</option>
          </select>
          <input v-else class="ae__control" :value="TYPE_LABELS[account.type]" readonly />
        </div>

        <template v-if="account.type === 'CurrentAccount' || account.type === 'Savings'">
          <div class="ae__field ae__field--ref">
            <label class="ae__label">IBAN</label>
            <input class="ae__control ae__control--mono" :value="account.iban" readonly />
          </div>
          <div class="ae__field ae__field--currency">
            <label class="ae__label">Currency</label>
            <select v-if="CURRENCIES.length > 1" class="ae__control" v-model="account.currency">
              <option v-for="c in CURRENCIES" :key="c" :value="c">{{ c }}</option>
            </select>
            <input v-else class="ae__control" :value="account.currency" readonly />
          </div>
        </template>

        <template v-else-if="account.type === 'CreditCard'">
          <div class="ae__field ae__field--ref">
            <label class="ae__label">Masked PAN</label>
            <input class="ae__control ae__control--mono" :value="account.maskedPan" readonly />
          </div>
          <div class="ae__field ae__field--name">
            <label class="ae__label">Card name</label>
            <input class="ae__control" v-model="account.cardName" placeholder="e.g. Platinum Card" />
          </div>
        </template>

        <div v-else-if="account.type === 'Mortgage'" class="ae__field ae__field--ref">
          <label class="ae__label">Mortgage ref</label>
          <input class="ae__control ae__control--mono" v-model="account.mortgageRef" />
        </div>

        <div v-else-if="account.type === 'Finance'" class="ae__field ae__field--ref">
          <label class="ae__label">Finance ref</label>
          <input class="ae__control ae__control--mono" v-model="account.financeRef" />
        </div>

        <div class="ae__field ae__field--amount">
          <label class="ae__label">{{ balanceLabel(account) }}</label>
          <input class="ae__control" type="number" v-model.number="account.balance" min="0" step="100" />
        </div>

        <div v-if="secondaryLabel(account)" class="ae__field ae__field--amount">
          <label class="ae__label">{{ secondaryLabel(account) }}</label>
          <input class="ae__control" type="number" v-model.number="account.secondary" min="0" step="100" />
        </div>
        <div v-else class="ae__field ae__field--amount ae__field--ghost"></div>

        <button
          type="button"
          class="ae__remove"
          :disabled="accounts.length <= 1"
          title="Remove account"
          aria-label="Remove account"
          @click="removeAccount(account.id)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>

    <footer class="ae__footer">
      <button
        type="button"
        class="ae__add"
        :disabled="accounts.length >= MAX_ACCOUNTS"
        @click="addAccount"
      >+ Add account</button>
      <span class="ae__count">{{ accounts.length }} / {{ MAX_ACCOUNTS }}</span>
    </footer>
  </section>
</template>

<style scoped>
.ae {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  margin: 1.5rem 0;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.ae__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  padding: 0.85rem 1.1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.ae__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
}
.ae__eyebrow-dash { width: 18px; height: 1px; background: currentColor; }
.ae__subtitle {
  font-size: 0.82rem;
  color: var(--at-mute-2);
}

.ae__rows {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ae__row {
  display: flex;
  align-items: flex-end;
  gap: 0.65rem;
  flex-wrap: wrap;
  padding: 0.65rem 0.85rem 0.65rem 0.65rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}

.ae__field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.ae__field--type     { min-width: 130px; }
.ae__field--ref      { flex: 1; min-width: 160px; }
.ae__field--name     { min-width: 130px; }
.ae__field--currency { width: 90px; }
.ae__field--amount   { width: 130px; }
.ae__field--ghost    { width: 130px; visibility: hidden; }

.ae__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
}

.ae__control {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  color: var(--at-navy-deep);
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.ae__control:focus {
  border-color: var(--at-teal);
  box-shadow: inset 0 -2px 0 var(--at-teal);
}
.ae__control--mono {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  background: color-mix(in srgb, var(--at-grid-line) 50%, var(--at-bg-cream));
  color: var(--at-mute-2);
}

.ae__remove {
  background: none;
  border: none;
  padding: 0.4rem;
  margin-left: auto;        /* push to the far right of the row */
  align-self: center;        /* vertically centre against the field group */
  color: var(--at-mute);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.15s ease;
}
.ae__remove:hover:not(:disabled) { color: #B33A3A; }
.ae__remove:disabled { opacity: 0.3; cursor: not-allowed; }
.ae__remove svg { display: block; }

.ae__footer {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.1rem;
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.ae__add {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  color: var(--at-navy-deep);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.ae__add:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.ae__add:disabled { opacity: 0.4; cursor: not-allowed; }

.ae__count {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute);
}
</style>

<!--
  /tech/** override — match the requirements-page table-header style:
  navy-deep background with cream text on the "Simulated user accounts"
  header bar. Unscoped because the layout root (.is-tech) is outside this
  component.
-->
<style>
.is-tech .ae__header {
  background: var(--at-navy-deep);
  border-bottom: 0;
}
.is-tech .ae__eyebrow {
  color: var(--at-bg-cream);
}
.is-tech .ae__subtitle {
  color: color-mix(in srgb, var(--at-bg-cream) 75%, transparent);
}
</style>

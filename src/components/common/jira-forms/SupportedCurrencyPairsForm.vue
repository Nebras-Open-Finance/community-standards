<script setup lang="ts">
// The supported-currency-pairs form: 1–50 FromCurrency/ToCurrency rows, each
// matching ^[A-Z]{3,3}$, no exact duplicates. Mirrors validate() in standards-api
// services/jira/forms/supported-currency-pairs.js, which re-checks on submit.
// Rendered inside JiraFormShell, which supplies the session, ticket and submit.

import { computed, ref } from 'vue'

interface CurrencyPair {
  FromCurrency: string
  ToCurrency: string
}

defineProps<{ submitting: boolean }>()
const emit = defineEmits<{ submit: [payload: { SupportedCurrencyPairs: CurrencyPair[] }] }>()

const MAX_PAIRS = 50
const CURRENCY_RE = /^[A-Z]{3,3}$/

type Field = keyof CurrencyPair
const FIELDS: Field[] = ['FromCurrency', 'ToCurrency']

const blankRow = (): CurrencyPair => ({ FromCurrency: '', ToCurrency: '' })
const rows = ref<CurrencyPair[]>([blankRow()])
// Errors show once submit has been tried, not while the first row is typed.
const attempted = ref(false)

/** Per-row problems, keyed by field, plus a duplicate flag. */
const rowErrors = computed(() => {
  const seen = new Map<string, number>()
  return rows.value.map((r, i) => {
    const e: Partial<Record<Field | 'duplicate', string>> = {}
    for (const f of FIELDS) {
      if (!CURRENCY_RE.test(r[f])) e[f] = r[f] ? 'Three letters, A–Z' : 'Required'
    }
    const key = `${r.FromCurrency}/${r.ToCurrency}`
    if (!e.FromCurrency && !e.ToCurrency) {
      const first = seen.get(key)
      if (first !== undefined) e.duplicate = `Same as row ${first + 1}`
      else seen.set(key, i)
    }
    return e
  })
})
const valid = computed(() => rowErrors.value.every((e) => Object.keys(e).length === 0))
const canAdd = computed(() => rows.value.length < MAX_PAIRS)

function addRow(): void {
  if (canAdd.value) rows.value.push(blankRow())
}

function removeRow(i: number): void {
  rows.value.splice(i, 1)
  if (rows.value.length === 0) rows.value.push(blankRow())
}

// Upper-case as typed and keep letters only, so the pattern is easy to meet.
function onCurrencyInput(row: CurrencyPair, field: Field, e: Event): void {
  const input = e.target as HTMLInputElement
  row[field] = input.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3)
  input.value = row[field]
}

function onSubmit(): void {
  attempted.value = true
  if (!valid.value) return
  emit('submit', {
    SupportedCurrencyPairs: rows.value.map((r) => ({ FromCurrency: r.FromCurrency, ToCurrency: r.ToCurrency })),
  })
}
</script>

<template>
  <form novalidate @submit.prevent="onSubmit">
    <div class="jf__row">
      <span id="scp-label" class="jf__label scp__flush">Supported currency pairs</span>
      <span class="scp__count">{{ rows.length }} / {{ MAX_PAIRS }}</span>
    </div>

    <div class="scp__pairs" role="group" aria-labelledby="scp-label">
      <div class="scp__head" aria-hidden="true">
        <span>#</span><span>FromCurrency</span><span>ToCurrency</span><span />
      </div>

      <div v-for="(row, i) in rows" :key="i" class="scp__pair">
        <span class="scp__num">{{ i + 1 }}</span>
        <div v-for="field in FIELDS" :key="field">
          <input
            :value="row[field]"
            class="jf__input scp__ccy"
            :class="{ 'jf__input--bad': attempted && (rowErrors[i]?.[field] || rowErrors[i]?.duplicate) }"
            type="text"
            autocomplete="off"
            spellcheck="false"
            maxlength="3"
            :placeholder="field === 'FromCurrency' ? 'USD' : 'AED'"
            :aria-label="`Row ${i + 1} ${field}`"
            :aria-invalid="attempted && !!rowErrors[i]?.[field]"
            @input="onCurrencyInput(row, field, $event)"
          >
          <p v-if="attempted && rowErrors[i]?.[field]" class="jf__ferr">{{ rowErrors[i]?.[field] }}</p>
        </div>
        <button
          type="button"
          class="scp__remove"
          :aria-label="`Remove row ${i + 1}`"
          :disabled="rows.length === 1 && !row.FromCurrency && !row.ToCurrency"
          @click="removeRow(i)"
        >×</button>
        <p v-if="attempted && rowErrors[i]?.duplicate" class="jf__ferr scp__dup">
          {{ rowErrors[i]?.duplicate }}
        </p>
      </div>
    </div>

    <button type="button" class="jf__pick scp__add" :disabled="!canAdd" @click="addRow">
      {{ canAdd ? '+ Add pair' : `Maximum of ${MAX_PAIRS} pairs` }}
    </button>

    <p class="jf__hint">
      Three-letter upper-case currency codes. Attached to the ticket as JSON, attributed to you.
    </p>
    <p v-if="attempted && !valid" class="jf__error">Fix the highlighted rows before submitting.</p>
    <div class="jf__row jf__row--end">
      <button type="submit" class="jf__go" :disabled="submitting">
        {{ submitting ? 'Submitting…' : 'Submit to ticket' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.scp__flush { margin-bottom: 0; }
.scp__count { font-family: var(--at-mono); font-size: 0.75rem; color: var(--at-mute); }

/* #, From, To, remove. */
.scp__pairs { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem; }
.scp__head, .scp__pair {
  display: grid;
  grid-template-columns: 2rem 1fr 1fr 2.25rem;
  gap: 0.6rem;
  align-items: start;
}
.scp__head {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}
.scp__num {
  font-family: var(--at-mono);
  font-size: 0.8rem;
  color: var(--at-mute);
  padding-top: 0.75rem;
  text-align: right;
}
.scp__ccy { text-transform: uppercase; letter-spacing: 0.08em; }
.scp__dup { grid-column: 2 / 4; margin-top: -0.2rem; }
.scp__remove {
  height: 2.6rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  font-size: 1.1rem;
  line-height: 1;
  color: var(--at-mute);
  cursor: pointer;
}
.scp__remove:hover:not(:disabled) { border-color: #B3261E; color: #B3261E; }
.scp__remove:disabled { opacity: 0.4; cursor: not-allowed; }
.scp__add { margin-top: 0.75rem; }
</style>

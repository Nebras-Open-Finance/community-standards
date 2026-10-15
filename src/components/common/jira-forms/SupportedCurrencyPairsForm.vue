<script setup lang="ts">
// The supported-currency-pairs form: 1–200 FromCurrency/ToCurrency rows, each
// matching ^[A-Z]{3,3}$, no exact duplicates. Mirrors validate() in standards-api
// services/jira/forms/supported-currency-pairs.js, which re-checks on submit.
// Rows are typed, or filled from an uploaded spreadsheet (see currencyPairsFile).
// Rendered inside JiraFormShell, which supplies the session, ticket and submit.

import { computed, ref } from 'vue'
import { ACCEPTED_FILES, parseCurrencyPairsFile } from './currencyPairsFile'

interface CurrencyPair {
  FromCurrency: string
  ToCurrency: string
}

defineProps<{ submitting: boolean }>()
const emit = defineEmits<{ submit: [payload: { SupportedCurrencyPairs: CurrencyPair[] }] }>()

const MAX_PAIRS = 200
const CURRENCY_RE = /^[A-Z]{3,3}$/

type Field = keyof CurrencyPair
const FIELDS: Field[] = ['FromCurrency', 'ToCurrency']
const FIELD_LABEL: Record<Field, string> = { FromCurrency: 'From Currency', ToCurrency: 'To Currency' }

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

/** Row numbers with a problem, for the summary under a long list. */
const badRows = computed(() =>
  rowErrors.value.flatMap((e, i) => (Object.keys(e).length ? [i + 1] : [])))
const badRowsText = computed(() => {
  const shown = badRows.value.slice(0, 10).join(', ')
  return badRows.value.length > 10 ? `${shown} and ${badRows.value.length - 10} more` : shown
})

const hasContent = computed(() => rows.value.some((r) => r.FromCurrency || r.ToCurrency))

function clearAll(): void {
  rows.value = [blankRow()]
  attempted.value = false
  upload.value = null
}

// ── Spreadsheet upload ───────────────────────────────────────────────────────
const fileInput = ref<HTMLInputElement | null>(null)
const reading = ref(false)
const upload = ref<{ ok: boolean; text: string } | null>(null)

async function onFile(e: Event): Promise<void> {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  reading.value = true
  upload.value = null
  try {
    const result = await parseCurrencyPairsFile(await file.arrayBuffer(), MAX_PAIRS)
    if (!result.ok) {
      upload.value = { ok: false, text: result.error }
      return
    }
    const replaced = hasContent.value
    rows.value = result.pairs.map((p) => ({ ...p }))
    // Show problems straight away: a file is finished input, not half-typed.
    attempted.value = true
    const n = result.pairs.length
    upload.value = {
      ok: true,
      text: `Loaded ${n} pair${n === 1 ? '' : 's'} from ${file.name}`
        + `${result.skippedHeader ? ' (header row skipped)' : ''}`
        + `${replaced ? ', replacing the rows that were there' : ''}.`,
    }
  } finally {
    reading.value = false
  }
}

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
    <!-- Upload -->
    <div class="scp__upload">
      <div class="jf__row">
        <div>
          <div class="scp__uptitle">Upload a spreadsheet</div>
          <p class="jf__hint scp__uphint">
            <code>.xlsx</code>, <code>.xls</code> or <code>.csv</code>. Column A is From Currency,
            column B is To Currency; a header row is skipped. Replaces the rows below.
          </p>
        </div>
        <button type="button" class="jf__pick" :disabled="reading" @click="fileInput?.click()">
          {{ reading ? 'Reading…' : 'Choose file' }}
        </button>
        <input
          ref="fileInput"
          type="file"
          class="scp__file"
          :accept="ACCEPTED_FILES"
          aria-label="Upload a spreadsheet of currency pairs"
          @change="onFile"
        >
      </div>
      <p v-if="upload" :class="upload.ok ? 'scp__upok' : 'jf__ferr'" role="status">{{ upload.text }}</p>
    </div>

    <div class="jf__row">
      <span id="scp-label" class="jf__label scp__flush">Supported currency pairs</span>
      <span class="scp__count">
        {{ rows.length }} / {{ MAX_PAIRS }}
        <button v-if="hasContent" type="button" class="scp__clear" @click="clearAll">Clear all</button>
      </span>
    </div>

    <div class="scp__pairs" role="group" aria-labelledby="scp-label">
      <div class="scp__head" aria-hidden="true">
        <span>#</span><span>From Currency</span><span>To Currency</span><span />
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
            :aria-label="`Row ${i + 1} ${FIELD_LABEL[field]}`"
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
    <p v-if="attempted && !valid" class="jf__error">
      Fix the highlighted row{{ badRows.length === 1 ? '' : 's' }} before submitting: {{ badRowsText }}.
    </p>
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

.scp__upload {
  padding: 0.9rem 1rem;
  margin-bottom: 1.25rem;
  border: 1px dashed var(--at-grid-line);
  border-radius: 8px;
  background: var(--at-bg-paper);
}
.scp__uptitle { font-size: 0.92rem; font-weight: 600; color: var(--at-navy-deep); }
.scp__uphint { margin-top: 0.2rem; }
.scp__file { display: none; }
.scp__upok { margin: 0.6rem 0 0; font-size: 0.85rem; font-weight: 600; color: var(--at-teal-deep); }

.scp__clear {
  margin-left: 0.6rem;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: var(--at-teal-deep);
  text-decoration: underline;
  cursor: pointer;
}

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

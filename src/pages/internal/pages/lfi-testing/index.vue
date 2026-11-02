<route lang="yaml">
meta:
  layout: internal
  title: LFI functional testing
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// LFI functional testing — the browser front end for /lfi-testing/* on the
// proposals API (standards-api). Layout and tokens follow Certificate rotation so
// it sits with the other API Hub tools. Access is the Sandbox Trust Framework SSO
// from useSandboxAuth, restricted to Nebras staff; the user signs in before
// touching the form, so no form state has to survive the sign-in round trip.
//
// The test is chosen first. Its catalogue entry decides the rest of the form:
// which certificate groups and fields are shown and required (`needs`), and the
// inputs rendered under its title (`inputs`, by type). In a group whose
// sub-tests run together, any of them can be ticked: the form then asks for
// what any of them needs, and their inputs once each.
//
// A run's steps are shown as they finish (the composable polls the API); tests
// run together are listed with how each went, the one in progress shown in full.

import { computed, onMounted, reactive, ref } from 'vue'
import { useHead } from '@unhead/vue'
import {
  FILE_GROUPS, FILE_SLOTS, HUB_ENVS, LFIS, lfiTestInputRows,
  useLfiTesting, type BatchItem, type CertSummary, type FieldKey, type LfiTest, type LfiTestInputDef,
  type LfiTestPayee, type PayeeNameType, type SlotId, type UploadSummary,
} from '@/composables/useLfiTesting'

useHead({ title: 'LFI functional testing' })

const {
  auth, allowed, sessionLost, accessError, loadMe, signIn,
  environment, lfiCode, redirectUri, jwtAuthEnabled, jwtAudience, testId, testIds, slots, hosts, needs,
  fieldErrors, serverErrors, missing, ready,
  formKey, formTitle, formInputs, inputDrafts, inputErrors, inputServerErrors, setInputDraft,
  tests, testsLoading, testsError, selectedTest, selectedTests, multiple,
  phase, elapsed, upload, uploadStale, uploadError, uploadErrorDetail,
  run, runError, runErrorDetail, runErrorOnForm, runRetryable, rerunTarget, rerunAvailable, batch,
  recentRuns, openingRunId,
  loadFile, clearFile, selectLfi, loadTests, toggleTest, uploadAndRun, runAgain, openRun, stopFollowing,
} = useLfiTesting()

onMounted(() => {
  void loadMe()
  void loadTests()
})

const who = computed(() => auth.value.name || auth.value.email || 'your Sandbox Trust Framework account')

// Field errors show once a field has been left (or a file chosen) — not while
// the user is still typing into an empty form. Errors the API reported always show.
const touched = reactive<Partial<Record<FieldKey | SlotId, boolean>>>({})

function fieldMessage(key: FieldKey): string | null {
  const client = touched[key] ? fieldErrors.value[key] : null
  return client ?? serverErrors.value[key] ?? null
}

function slotMessage(slot: SlotId): string | null {
  const state = slots[slot]
  if (state.error) return state.error
  const server = serverErrors.value[slot]
  if (server) return server
  return touched[slot] && !state.file ? 'Choose this file.' : null
}

/** The certificate groups the chosen test needs: the TPP's always, the LFI's C3 and JWT Auth only when asked for. */
const fileGroups = computed(() =>
  FILE_GROUPS.filter((g) => g.id === 'tpp' || !!needs.value?.lfiCertificates),
)

// ── Test inputs ──────────────────────────────────────────────────────────────
type ChoiceDef = Extract<LfiTestInputDef, { type: 'choice' }>

const NAME_TYPES: { value: PayeeNameType; label: string }[] = [
  { value: 'person', label: 'Person' },
  { value: 'business', label: 'Business' },
]

/** Inputs (and payee parts) the user has left, per form (a test, or tests run together): '<formKey>/<key>'. */
const touchedInputs = reactive<Record<string, boolean>>({})

function touchInput(key: string): void {
  if (formKey.value) touchedInputs[`${formKey.value}/${key}`] = true
}

/** The message for an input, or a payee part ('<id>.iban', '<id>.name', '<id>.nameType'). */
function inputMessage(key: string): string | null {
  const client = formKey.value && touchedInputs[`${formKey.value}/${key}`] ? inputErrors.value[key] : null
  return client ?? inputServerErrors.value[key] ?? null
}

function textOf(id: string): string {
  const d = inputDrafts.value[id]
  return typeof d === 'string' ? d : ''
}

function choiceOf(id: string): string[] {
  const d = inputDrafts.value[id]
  return Array.isArray(d) ? d : []
}

function payeeOf(id: string): LfiTestPayee {
  const d = inputDrafts.value[id]
  return d && typeof d === 'object' && !Array.isArray(d) ? d : { iban: '', name: '', nameType: 'person' }
}

function listCount(id: string): number {
  return new Set(textOf(id).split(/[\s,]+/).filter(Boolean)).size
}

function onText(id: string, e: Event): void {
  setInputDraft(id, (e.target as HTMLInputElement | HTMLTextAreaElement).value)
}

/** An IBAN as typed: uppercase, spaces removed, the caret kept where it was. */
function ibanFrom(e: Event): string {
  const el = e.target as HTMLInputElement
  const raw = el.value
  const clean = raw.replace(/\s+/g, '').toUpperCase()
  if (clean !== raw) {
    const caret = raw.slice(0, el.selectionStart ?? raw.length).replace(/\s+/g, '').length
    el.value = clean
    el.setSelectionRange(caret, caret)
  }
  return clean
}

function onIban(id: string, e: Event): void {
  setInputDraft(id, ibanFrom(e))
}

function setPayee(id: string, part: Partial<LfiTestPayee>): void {
  setInputDraft(id, { ...payeeOf(id), ...part })
}

function setNameType(id: string, nameType: PayeeNameType): void {
  setPayee(id, { nameType })
  touchInput(`${id}.nameType`)
}

function toggleChoice(def: ChoiceDef, value: string, e: Event): void {
  const picked = new Set(choiceOf(def.id))
  if ((e.target as HTMLInputElement).checked) picked.add(value)
  else picked.delete(value)
  setInputDraft(def.id, def.options.map((o) => o.value).filter((v) => picked.has(v)))
  touchInput(def.id)
}

// ── File slots ───────────────────────────────────────────────────────────────
const inputs: Partial<Record<SlotId, HTMLInputElement>> = {}
const dragging = reactive<Partial<Record<SlotId, boolean>>>({})

function setInput(slot: SlotId, el: unknown): void {
  if (el instanceof HTMLInputElement) inputs[slot] = el
  else delete inputs[slot]
}

function pick(slot: SlotId): void {
  inputs[slot]?.click()
}

async function onFile(slot: SlotId, e: Event): Promise<void> {
  touched[slot] = true
  const input = e.target as HTMLInputElement
  await loadFile(slot, input.files?.[0])
  input.value = ''
}

function onDragOver(slot: SlotId): void {
  if (phase.value !== 'uploading') dragging[slot] = true
}

async function onDrop(slot: SlotId, e: DragEvent): Promise<void> {
  dragging[slot] = false
  // The fieldset is disabled while uploading, but drop events still reach it.
  if (phase.value === 'uploading') return
  touched[slot] = true
  await loadFile(slot, e.dataTransfer?.files?.[0])
}

function removeFile(slot: SlotId): void {
  clearFile(slot)
  touched[slot] = true
}

function onSubmit(): void {
  // Enter in a field must not upload before the form is complete.
  if (!allowed.value || !ready.value) return
  void uploadAndRun()
}

// ── Formatting ───────────────────────────────────────────────────────────────
function fmtMs(ms: number | null | undefined): string {
  if (ms === null || ms === undefined || !Number.isFinite(ms)) return ''
  return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`
}

function fmtWhen(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString()
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toISOString().slice(0, 10)
}

function shortId(id: string | null | undefined): string {
  return id ? id.slice(0, 8) : ''
}

/** The run ID last copied, for its button's "Copied" label. */
const copiedRunId = ref<string | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

async function copyRunId(id: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(id)
  } catch {
    return
  }
  copiedRunId.value = id
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copiedRunId.value = null }, 2000)
}

/** Status → colour family shared by pills, step rows and the verdict banner. */
function tone(status: string | null | undefined): 'pass' | 'fail' | 'error' | 'run' | 'skip' {
  if (status === 'passed') return 'pass'
  if (status === 'failed') return 'fail'
  if (status === 'error') return 'error'
  if (status === 'running') return 'run'
  return 'skip'
}

function testTitle(id: string | null | undefined): string {
  return tests.value.find((t) => t.id === id)?.title ?? id ?? ''
}

// ── Test picker: groups first, then a group's sub-tests ─────────────────────
/** `multiple`: the group's sub-tests are ticked, any number of them, and run together. */
interface TestGroup { id: string; title: string; multiple: boolean; tests: LfiTest[] }

/** The catalogue's tests by group, in catalogue order. */
const groups = computed<TestGroup[]>(() => {
  const out: TestGroup[] = []
  for (const t of tests.value) {
    let g = out.find((x) => x.id === t.group.id)
    if (!g) out.push(g = { id: t.group.id, title: t.group.title, multiple: t.group.multiple, tests: [] })
    g.tests.push(t)
  }
  return out
})

/** A group chosen before any of its tests — when none of them is available. */
const chosenGroupId = ref<string | null>(null)
const activeGroup = computed(() =>
  groups.value.find((g) => g.id === (selectedTest.value?.group.id ?? chosenGroupId.value)) ?? null,
)

/** Choose a group: its only test, or its first available sub-test (the first ticked, where they run together). */
function chooseGroup(g: TestGroup): void {
  chosenGroupId.value = g.id
  if (selectedTest.value?.group.id === g.id) return
  testId.value = g.tests.find((t) => t.available)?.id ?? null
}

/** An input's flag (when it has one), then its message or hint. */
function describedBy(def: LfiTestInputDef): string {
  return def.flag ? `lt-in-${def.id}-flag lt-in-${def.id}-msg` : `lt-in-${def.id}-msg`
}

/** One button in a group's second row: a sub-test, or a subgroup of tests picked in a third row. */
interface SubItem { id: string; title: string; tests: LfiTest[] }

/** The active group's second row, in catalogue order: each subgroup once, and each test with none. */
const subItems = computed<SubItem[]>(() => {
  const out: SubItem[] = []
  for (const t of activeGroup.value?.tests ?? []) {
    if (!t.subgroup) {
      out.push({ id: t.id, title: t.subtitle ?? t.title, tests: [t] })
      continue
    }
    let s = out.find((x) => x.id === t.subgroup!.id)
    if (!s) out.push(s = { id: t.subgroup.id, title: t.subgroup.title, tests: [] })
    s.tests.push(t)
  }
  return out
})
const activeSubItem = computed(() => subItems.value.find((s) => s.tests.some((t) => t.id === testId.value)) ?? null)
const isAvailable = (s: SubItem): boolean => s.tests.some((t) => t.available)

/** Choose a second-row item: its only test, or its subgroup's first available one. */
function chooseSubItem(s: SubItem): void {
  if (activeSubItem.value?.id === s.id) return
  testId.value = s.tests.find((t) => t.available)?.id ?? null
}

// One line under each group in the picker. A group the page has no line for
// shows the first sentence of its first test's description.
const TAGLINES: Record<string, string> = {
  'tpp-registration': 'Register the TPP and check it is activated.',
  'bank-data-sharing': 'Authorise a consent, then call the endpoints you pick.',
  'bank-service-initiation': 'Make each payment type, follow its status, read the accounts and refund account.',
  'confirmation-of-payee': 'Full, partial and no match, and an unknown IBAN.',
}

function tagline(g: TestGroup): string {
  const description = g.tests[0]?.description ?? ''
  return TAGLINES[g.id] ?? (description.match(/^.*?\.(?=\s|$)/)?.[0] ?? description)
}

// ── Derived panel ────────────────────────────────────────────────────────────
function certLine(c: CertSummary | null | undefined): string | null {
  if (!c?.subject) return null
  return c.notAfter ? `${c.subject} · expires ${fmtDate(c.notAfter)}` : c.subject
}

function jwtLine(j: NonNullable<UploadSummary['lfi']>['jwtAuth'] | null | undefined): string | null {
  if (!j) return null
  if (!j.enabled) return 'Off'
  return `On · kid ${j.kid ?? '—'} · audience ${j.audience ?? '(default)'}`
}

/** Show the upload's summary alongside its own runs, not beside an unrelated one. */
const showDerived = computed(() =>
  !!upload.value && (!run.value || run.value.uploadId === upload.value.id),
)

const derived = computed(() => {
  const s = upload.value?.summary
  if (!s) return []
  const groups: { title: string; rows: [string, string | null | undefined][]; note?: string }[] = [
    {
      title: 'TPP',
      rows: [
        ['Client ID', s.tpp?.clientId],
        ['Organisation ID', s.tpp?.organisationId],
        ['Software statement ID', s.tpp?.softwareStatementId],
        ['Signing kid', s.tpp?.signingKid],
        ['Transport certificate', certLine(s.tpp?.transportCert)],
        ['Fingerprint (SHA-256)', s.tpp?.transportCert?.fingerprint],
        ['Redirect URI', s.redirectUri],
      ],
    },
    s.lfi
      ? {
        title: 'LFI',
        rows: [
          ['Organisation', s.lfi.organisationName],
          ['Organisation ID', s.lfi.organisationId],
          ['C3 certificate', certLine(s.lfi.c3Cert)],
          ['Fingerprint (SHA-256)', s.lfi.c3Cert?.fingerprint],
          ['JWT Auth', jwtLine(s.lfi.jwtAuth)],
        ],
      }
      : { title: 'LFI', rows: [], note: 'No C3 certificate: the test does not need one.' },
    {
      title: 'API Hub',
      rows: [
        ['Discovery', s.hosts?.discovery],
        ['rs1', s.hosts?.rs1],
        ['hh', s.hosts?.hh],
        ['cm', s.hosts?.cm],
      ],
    },
  ]
  return groups
    .map((g) => ({ title: g.title, note: g.note ?? null, rows: g.rows.filter((r): r is [string, string] => !!r[1]) }))
    .filter((g) => g.rows.length || g.note)
})

// ── Result ───────────────────────────────────────────────────────────────────
const verdict = computed(() => {
  const r = run.value
  if (!r) return ''
  const steps = r.steps ?? []
  if (r.status === 'running') {
    const done = steps.filter((s) => s.status !== 'pending').length
    const progress = steps.length ? `: ${done} of ${steps.length} steps finished` : ''
    // Not followed any more (stopped, or opened from Recent runs): as last read.
    return phase.value === 'running' ? `Running${progress}.` : `Still running when last read${progress}.`
  }
  if (r.status === 'passed') {
    const passed = steps.filter((s) => s.status === 'passed').length
    const warned = steps.reduce((n, s) => n + (s.warnings?.length ?? 0), 0)
    const note = warned ? `, with ${warned} warning${warned === 1 ? '' : 's'}` : ''
    return `Passed${note}. ${passed} of ${steps.length} steps passed.`
  }
  const at = steps.findIndex((s) => s.status === 'failed' || s.status === 'error')
  const where = at === -1 ? '' : ` at step ${at + 1}: ${steps[at]?.title ?? ''}`
  if (r.status === 'failed') return `Failed${where}.`
  return `The run could not complete${where}.`
})

/** The shown run's inputs, labelled from the catalogue. */
const runInputRows = computed(() =>
  lfiTestInputRows(tests.value.find((t) => t.id === run.value?.testId), run.value?.inputs),
)

// ── Tests run together ───────────────────────────────────────────────────────
/** A batch item's pill: its run's status, or where it stands without one. */
function itemStatus(item: BatchItem): string {
  if (item.run) return item.run.status
  if (item.state === 'waiting') return 'waiting'
  if (item.state === 'running') return 'starting'
  if (item.state === 'not-run') return 'not run'
  return 'not started'
}

function itemTone(item: BatchItem): ReturnType<typeof tone> {
  if (item.run) return tone(item.run.status)
  if (item.state === 'running') return 'run'
  return item.state === 'done' ? 'error' : 'skip'
}

/** "Bank Service Initiation: 4 tests". */
const batchTitle = computed(() => {
  const items = batch.value?.items ?? []
  const group = tests.value.find((t) => t.id === items[0]?.testId)?.group.title
  return `${group ? `${group}: ` : ''}${items.length} tests`
})

/** Which test is running ("2 of 4"), or how they went. */
const batchProgress = computed(() => {
  const items = batch.value?.items ?? []
  const at = items.findIndex((i) => i.state === 'running')
  if (at !== -1) return `Test ${at + 1} of ${items.length}`
  const counts = new Map<string, number>()
  for (const i of items) {
    const label = itemStatus(i) === 'not started' ? 'could not start' : itemStatus(i)
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }
  return [...counts].map(([label, n]) => `${n} ${label}`).join(', ')
})

/** The name of the test in progress, for the running banner. */
const runningTitle = computed(() => {
  const id = rerunTarget.value?.testId
  const t = tests.value.find((x) => x.id === id)
  return (batch.value ? t?.subtitle : null) ?? t?.title ?? id ?? 'the test'
})
</script>

<template>
  <div class="lt">
    <div class="lt__eyebrow">API Hub</div>
    <h1 class="lt__title">LFI Functional Testing</h1>
    <p class="lt__lede">
      Run a functional test against an LFI through the API Hub. The tool acts as a TPP on the
      API Hub; tests that authorise a consent also act as the LFI on the API Hub's consent
      services (Headless Heimdall and the Consent Manager), using the LFI's C3 certificate.
      Calls that reach the LFI go through the API Hub to its Ozone Connect endpoints.
    </p>
    <p class="lt__lede lt__lede--small">
      Choose the test first: the form then asks only for what that test needs. Runs are recorded
      and can be re-run. Pre-production only for now.
    </p>

    <!-- The page's last child takes the site's before-footer padding (base.css),
         so the cards sit in a plain wrapper rather than the last card taking it. -->
    <div class="lt__body">
    <!-- Step 1: sign in -->
    <section class="lt__card" aria-labelledby="lt-signin-h">
      <div class="lt__stephead">
        <span class="lt__stepno">1</span>
        <h2 id="lt-signin-h" class="lt__h2">Sign in</h2>
      </div>

      <p v-if="!auth.loaded" class="lt__note">Checking your session…</p>

      <p v-else-if="auth.blocked" class="lt__error">
        This Sandbox Trust Framework account is blocked and cannot use this tool.
      </p>

      <template v-else-if="!auth.authenticated || sessionLost">
        <p v-if="sessionLost" class="lt__error">
          Your session has expired. Sign in again, then choose the files again.
        </p>
        <div class="lt__row">
          <span class="lt__hint">
            This tool is for Nebras staff. Sign in with your Sandbox Trust Framework account
            before filling in the form.
          </span>
          <button type="button" class="lt__go" @click="signIn">
            Sign in with the Sandbox Trust Framework
          </button>
        </div>
      </template>

      <template v-else-if="!auth.isAdmin">
        <p class="lt__note">Signed in as <strong>{{ who }}</strong>.</p>
        <p class="lt__error">This tool is restricted to Nebras staff.</p>
      </template>

      <template v-else>
        <p class="lt__ok">Signed in as {{ who }}.</p>
        <p v-if="accessError" class="lt__error">{{ accessError }}</p>
      </template>
    </section>

    <!-- Step 2: choose a test -->
    <section v-if="allowed" class="lt__card" aria-labelledby="lt-test-h">
      <div class="lt__stephead">
        <span class="lt__stepno">2</span>
        <h2 id="lt-test-h" class="lt__h2">Choose a test</h2>
      </div>
      <p v-if="testsLoading" class="lt__note">Loading tests…</p>
      <div v-else-if="testsError" class="lt__error">
        <p class="lt__errline">{{ testsError }}</p>
        <button type="button" class="lt__pick" @click="loadTests">Retry</button>
      </div>
      <template v-else>
        <div class="lt__tests" role="radiogroup" aria-labelledby="lt-test-h">
          <button
            v-for="g in groups"
            :key="g.id"
            type="button"
            role="radio"
            class="lt__test"
            :class="{ 'lt__test--on': activeGroup?.id === g.id }"
            :aria-checked="activeGroup?.id === g.id"
            :disabled="phase !== 'idle' || !g.tests.some((t) => t.available)"
            @click="chooseGroup(g)"
          >
            <span class="lt__ttitle">{{ g.title }}</span>
            <span class="lt__tdesc">{{ tagline(g) }}</span>
          </button>
        </div>

        <!-- A group whose sub-tests run together: tick any of them. Those not available yet are shown, disabled. -->
        <div v-if="activeGroup?.multiple">
          <div id="lt-subtest-label" class="lt__label">{{ activeGroup.title }}: sub-tests</div>
          <div class="lt__subtests" role="group" aria-labelledby="lt-subtest-label" aria-describedby="lt-subtest-hint">
            <button
              v-for="t in activeGroup.tests"
              :key="t.id"
              type="button"
              role="checkbox"
              class="lt__env"
              :class="{ 'lt__env--on': testIds.includes(t.id) }"
              :aria-checked="testIds.includes(t.id)"
              :disabled="phase !== 'idle' || !t.available"
              @click="toggleTest(t.id)"
            >
              <span class="lt__box" aria-hidden="true" />
              {{ t.subtitle ?? t.title }}
              <span v-if="!t.available" class="lt__soon">Not available yet</span>
            </button>
          </div>
          <p id="lt-subtest-hint" class="lt__hint">
            Tick one or more. They run one after another, sharing the inputs below<template
              v-if="selectedTests.length"
            > · {{ selectedTests.length }} of {{ activeGroup.tests.filter((t) => t.available).length }} ticked</template>.
          </p>
        </div>

        <!-- A group with sub-tests: pick one. Those not available yet are shown, disabled. -->
        <div v-else-if="activeGroup && subItems.length > 1">
          <div id="lt-subtest-label" class="lt__label">{{ activeGroup.title }}: sub-test</div>
          <div class="lt__subtests" role="radiogroup" aria-labelledby="lt-subtest-label">
            <button
              v-for="s in subItems"
              :key="s.id"
              type="button"
              role="radio"
              class="lt__env"
              :class="{ 'lt__env--on': activeSubItem?.id === s.id }"
              :aria-checked="activeSubItem?.id === s.id"
              :disabled="phase !== 'idle' || !isAvailable(s)"
              @click="chooseSubItem(s)"
            >
              {{ s.title }}
              <span v-if="!isAvailable(s)" class="lt__soon">Not available yet</span>
            </button>
          </div>
        </div>

        <!-- A sub-test that splits again: pick one of its tests. -->
        <div v-if="!activeGroup?.multiple && activeSubItem && activeSubItem.tests.length > 1">
          <div id="lt-variant-label" class="lt__label">{{ activeSubItem.title }}: test</div>
          <div class="lt__subtests" role="radiogroup" aria-labelledby="lt-variant-label">
            <button
              v-for="t in activeSubItem.tests"
              :key="t.id"
              type="button"
              role="radio"
              class="lt__env"
              :class="{ 'lt__env--on': testId === t.id }"
              :aria-checked="testId === t.id"
              :disabled="phase !== 'idle' || !t.available"
              @click="testId = t.id"
            >
              {{ t.subtitle ?? t.title }}
              <span v-if="!t.available" class="lt__soon">Not available yet</span>
            </button>
          </div>
        </div>
      </template>
      <p v-if="!selectedTest && !testsLoading && !testsError" class="lt__hint lt__hint--flush">
        The LFI, certificates and inputs the {{ activeGroup?.multiple ? 'tests need' : 'test needs' }} then appear below.
      </p>
    </section>

    <!-- Step 3: set up and run the chosen test -->
    <form v-if="allowed && selectedTest" class="lt__card" novalidate aria-labelledby="lt-form-h" @submit.prevent="onSubmit">
      <div class="lt__stephead">
        <span class="lt__stepno">3</span>
        <h2 id="lt-form-h" class="lt__h2">{{ formTitle }}</h2>
      </div>
      <p v-if="multiple" class="lt__hint lt__hint--flush">
        {{ selectedTests.length === 1 ? 'Runs' : `Runs these ${selectedTests.length}, one after another:` }}
        {{ selectedTests.map((t) => t.subtitle ?? t.title).join(', ') }}.
      </p>

      <fieldset class="lt__fieldset" :disabled="phase === 'uploading'">
        <template v-if="selectedTest">
          <!-- LFI -->
          <div>
            <div id="lt-lfi-label" class="lt__label">LFI</div>
            <div class="lt__envs" role="radiogroup" aria-labelledby="lt-lfi-label" aria-describedby="lt-lfi-msg">
              <button
                v-for="l in LFIS"
                :key="l.code"
                type="button"
                role="radio"
                class="lt__env"
                :class="{ 'lt__env--on': lfiCode === l.code }"
                :aria-checked="lfiCode === l.code"
                @click="selectLfi(l.code)"
              >
                {{ l.name }}
                <code class="lt__envcode">{{ l.code }}</code>
              </button>
            </div>
            <p v-if="fieldMessage('lfiCode')" id="lt-lfi-msg" class="lt__ferr">{{ fieldMessage('lfiCode') }}</p>
            <p v-else id="lt-lfi-msg" class="lt__hint">
              Choosing the LFI fills in its sandbox defaults: the TPP redirect URI and the test's
              inputs, where the test uses them. Values you have changed are kept.
            </p>
          </div>

          <!-- Hub environment -->
          <div>
            <div id="lt-env-label" class="lt__label">Hub environment</div>
            <div class="lt__envs" role="radiogroup" aria-labelledby="lt-env-label" aria-describedby="lt-env-hosts">
              <button
                v-for="e in HUB_ENVS"
                :key="e.value"
                type="button"
                role="radio"
                class="lt__env"
                :class="{ 'lt__env--on': environment === e.value }"
                :aria-checked="environment === e.value"
                :disabled="!e.available"
                @click="environment = e.value"
              >
                <span class="lt__dot" :class="`lt__dot--${e.value}`" />
                {{ e.label }}
                <span v-if="!e.available" class="lt__soon">Not available yet</span>
              </button>
            </div>
            <p v-if="fieldMessage('environment')" class="lt__ferr">{{ fieldMessage('environment') }}</p>
            <ul id="lt-env-hosts" class="lt__hosts">
              <li v-for="h in hosts" :key="h.service">
                <code>{{ h.service }}.<b>{{ h.code }}</b>.{{ environment }}.apihub.openfinance.ae</code>
                <span class="lt__hostrole">{{ h.role }}</span>
              </li>
            </ul>
          </div>

          <div class="lt__rule" />

          <!-- Files -->
          <div v-for="group in fileGroups" :key="group.id" class="lt__group">
            <div class="lt__gtitle">{{ group.title }}</div>
            <p class="lt__hint lt__hint--flush">
              {{ group.hint }}
              <template v-if="group.id === 'jwt'">
                See <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client">JWT Auth — Client-side</RouterLink>.
              </template>
            </p>

            <label v-if="group.id === 'jwt'" class="lt__check">
              <input v-model="jwtAuthEnabled" type="checkbox">
              <span>This LFI uses JWT Auth on calls to the Consent Manager and Headless Heimdall</span>
            </label>

            <template v-if="group.id !== 'jwt' || jwtAuthEnabled">
              <div v-for="slot in group.slots" :key="slot">
                <div :id="`lt-${slot}-label`" class="lt__label">{{ FILE_SLOTS[slot].label }}</div>
                <div
                  v-if="!slots[slot].file"
                  class="lt__drop"
                  :class="{ 'lt__drop--over': dragging[slot], 'lt__drop--bad': !!slotMessage(slot) }"
                  @dragover.prevent="onDragOver(slot)"
                  @dragleave="dragging[slot] = false"
                  @drop.prevent="onDrop(slot, $event)"
                >
                  <p class="lt__dropline">
                    Drop the {{ FILE_SLOTS[slot].kind === 'key' ? 'private key' : 'certificate' }} here, or
                  </p>
                  <button type="button" class="lt__pick" @click="pick(slot)">Choose file</button>
                  <input
                    :ref="(el) => setInput(slot, el)"
                    type="file"
                    class="lt__file"
                    :accept="FILE_SLOTS[slot].accept"
                    :aria-labelledby="`lt-${slot}-label`"
                    @change="onFile(slot, $event)"
                  >
                </div>
                <div v-else class="lt__chosen">
                  <div>
                    <div class="lt__fname">{{ slots[slot].file?.name }}</div>
                    <div class="lt__hint">{{ slots[slot].file?.hint }}</div>
                    <div v-if="slots[slot].file?.warning" class="lt__warnline">{{ slots[slot].file?.warning }}</div>
                  </div>
                  <button type="button" class="lt__pick" @click="removeFile(slot)">Remove</button>
                </div>
                <p v-if="slotMessage(slot)" class="lt__ferr">{{ slotMessage(slot) }}</p>
              </div>
            </template>

            <div v-if="group.id === 'tpp' && needs?.redirectUri">
              <label class="lt__label" for="lt-redirect">TPP redirect URI</label>
              <input
                id="lt-redirect"
                v-model="redirectUri"
                class="lt__input"
                :class="{ 'lt__input--bad': fieldMessage('redirectUri') }"
                type="url"
                inputmode="url"
                autocomplete="off"
                spellcheck="false"
                placeholder="https://tpp.example.com/callback"
                :aria-invalid="!!fieldMessage('redirectUri')"
                aria-describedby="lt-redirect-msg"
                @blur="touched.redirectUri = true"
              >
              <p v-if="fieldMessage('redirectUri')" id="lt-redirect-msg" class="lt__ferr">{{ fieldMessage('redirectUri') }}</p>
              <p v-else id="lt-redirect-msg" class="lt__hint">
                Must be a redirect URI registered on the TPP application in the Trust Framework.
              </p>
            </div>

            <div v-if="group.id === 'jwt' && jwtAuthEnabled">
              <label class="lt__label" for="lt-aud">JWT audience</label>
              <input
                id="lt-aud"
                v-model="jwtAudience"
                class="lt__input"
                :class="{ 'lt__input--bad': fieldMessage('jwtAudience') }"
                type="text"
                autocomplete="off"
                spellcheck="false"
                placeholder="Optional"
                :aria-invalid="!!fieldMessage('jwtAudience')"
                aria-describedby="lt-aud-msg"
              >
              <p v-if="fieldMessage('jwtAudience')" id="lt-aud-msg" class="lt__ferr">{{ fieldMessage('jwtAudience') }}</p>
              <p v-else id="lt-aud-msg" class="lt__hint">
                Leave blank to use the API Hub issuer from discovery, which is what the Nebras
                Postman collection's JWT Auth flow sends. The documentation describes the
                audience as the <code>PROVIDER_ID</code> from onboarding — see
                <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client">JWT Auth — Client-side</RouterLink>.
              </p>
            </div>
          </div>

          <div class="lt__rule" />

          <!-- The chosen test's inputs (each once, for tests run together), rendered from the catalogue -->
          <div v-if="formInputs.length" class="lt__group lt__inputs">
            <h3 class="lt__gtitle">{{ formTitle }} inputs</h3>

            <template v-for="def in formInputs" :key="`${formKey}/${def.id}`">
              <!-- Choice: checkboxes in option order -->
              <fieldset v-if="def.type === 'choice'" class="lt__sub">
                <legend class="lt__label">
                  {{ def.label }}<span v-if="!def.required" class="lt__opt">Optional</span>
                </legend>
                <p v-if="def.flag" class="lt__flag">{{ def.flag }}</p>
                <div class="lt__choices">
                  <label v-for="o in def.options" :key="o.value" class="lt__check lt__check--choice">
                    <input
                      type="checkbox"
                      :checked="choiceOf(def.id).includes(o.value)"
                      @change="toggleChoice(def, o.value, $event)"
                    >
                    <span>
                      {{ o.label }}
                      <span v-if="o.hint" class="lt__chint">{{ o.hint }}</span>
                    </span>
                  </label>
                </div>
                <p v-if="inputMessage(def.id)" class="lt__ferr">{{ inputMessage(def.id) }}</p>
                <p v-else class="lt__hint">
                  <template v-if="def.hint">{{ def.hint }} · </template>{{ choiceOf(def.id).length }} of {{ def.options.length }} chosen.
                </p>
              </fieldset>

              <!-- Payee: IBAN, name, and whether the name is a person's or a business's -->
              <fieldset v-else-if="def.type === 'payee'" class="lt__sub lt__payee">
                <legend class="lt__label">
                  {{ def.label }}<span v-if="!def.required" class="lt__opt">Optional</span>
                </legend>
                <p v-if="def.flag" class="lt__flag">{{ def.flag }}</p>
                <p v-if="def.hint" class="lt__hint lt__hint--flush">{{ def.hint }}</p>
                <div class="lt__payeegrid">
                  <div>
                    <label class="lt__sublabel" :for="`lt-in-${def.id}-iban`">IBAN</label>
                    <input
                      :id="`lt-in-${def.id}-iban`"
                      class="lt__input"
                      :class="{ 'lt__input--bad': inputMessage(def.id + '.iban') }"
                      type="text"
                      autocomplete="off"
                      spellcheck="false"
                      placeholder="AE…"
                      :value="payeeOf(def.id).iban"
                      :aria-invalid="!!inputMessage(def.id + '.iban')"
                      @input="setPayee(def.id, { iban: ibanFrom($event) })"
                      @blur="touchInput(def.id + '.iban')"
                    >
                    <p v-if="inputMessage(def.id + '.iban')" class="lt__ferr">{{ inputMessage(def.id + '.iban') }}</p>
                  </div>
                  <div>
                    <label class="lt__sublabel" :for="`lt-in-${def.id}-name`">Name</label>
                    <input
                      :id="`lt-in-${def.id}-name`"
                      class="lt__input"
                      :class="{ 'lt__input--bad': inputMessage(def.id + '.name') }"
                      type="text"
                      autocomplete="off"
                      spellcheck="false"
                      :value="payeeOf(def.id).name"
                      :aria-invalid="!!inputMessage(def.id + '.name')"
                      @input="setPayee(def.id, { name: ($event.target as HTMLInputElement).value })"
                      @blur="touchInput(def.id + '.name')"
                    >
                    <p v-if="inputMessage(def.id + '.name')" class="lt__ferr">{{ inputMessage(def.id + '.name') }}</p>
                  </div>
                </div>
                <div class="lt__nametype">
                  <span :id="`lt-in-${def.id}-type`" class="lt__sublabel">The name is a</span>
                  <span class="lt__seg" role="radiogroup" :aria-labelledby="`lt-in-${def.id}-type`">
                    <button
                      v-for="nt in NAME_TYPES"
                      :key="nt.value"
                      type="button"
                      role="radio"
                      class="lt__segbtn"
                      :class="{ 'lt__segbtn--on': payeeOf(def.id).nameType === nt.value }"
                      :aria-checked="payeeOf(def.id).nameType === nt.value"
                      @click="setNameType(def.id, nt.value)"
                    >
                      {{ nt.label }}
                    </button>
                  </span>
                  <span class="lt__hint lt__hint--flush">
                    Decides whether the name is sent as <code>FullName</code> (person) or
                    <code>BusinessName</code> (business).
                  </span>
                </div>
                <p v-if="inputMessage(def.id + '.nameType')" class="lt__ferr">{{ inputMessage(def.id + '.nameType') }}</p>
                <p v-if="inputMessage(def.id)" class="lt__ferr">{{ inputMessage(def.id) }}</p>
              </fieldset>

              <!-- List: one textarea, split on commas and whitespace -->
              <div v-else-if="def.type === 'list'">
                <label class="lt__label" :for="`lt-in-${def.id}`">
                  {{ def.label }}<span v-if="!def.required" class="lt__opt">Optional</span>
                </label>
                <p v-if="def.flag" :id="`lt-in-${def.id}-flag`" class="lt__flag">{{ def.flag }}</p>
                <textarea
                  :id="`lt-in-${def.id}`"
                  class="lt__input lt__textarea"
                  :class="{ 'lt__input--bad': inputMessage(def.id) }"
                  rows="2"
                  autocomplete="off"
                  spellcheck="false"
                  :value="textOf(def.id)"
                  :aria-invalid="!!inputMessage(def.id)"
                  :aria-describedby="describedBy(def)"
                  @input="onText(def.id, $event)"
                  @blur="touchInput(def.id)"
                />
                <p v-if="inputMessage(def.id)" :id="`lt-in-${def.id}-msg`" class="lt__ferr">{{ inputMessage(def.id) }}</p>
                <p v-else :id="`lt-in-${def.id}-msg`" class="lt__hint">
                  {{ def.hint ? `${def.hint} ` : '' }}Separate with commas or spaces<template
                    v-if="listCount(def.id)"
                  > · {{ listCount(def.id) }} entered</template>.
                </p>
              </div>

              <!-- IBAN: uppercase, spaces removed as typed -->
              <div v-else-if="def.type === 'iban'">
                <label class="lt__label" :for="`lt-in-${def.id}`">
                  {{ def.label }}<span v-if="!def.required" class="lt__opt">Optional</span>
                </label>
                <p v-if="def.flag" :id="`lt-in-${def.id}-flag`" class="lt__flag">{{ def.flag }}</p>
                <input
                  :id="`lt-in-${def.id}`"
                  class="lt__input"
                  :class="{ 'lt__input--bad': inputMessage(def.id) }"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  placeholder="AE…"
                  :value="textOf(def.id)"
                  :aria-invalid="!!inputMessage(def.id)"
                  :aria-describedby="describedBy(def)"
                  @input="onIban(def.id, $event)"
                  @blur="touchInput(def.id)"
                >
                <p v-if="inputMessage(def.id)" :id="`lt-in-${def.id}-msg`" class="lt__ferr">{{ inputMessage(def.id) }}</p>
                <p v-else-if="def.hint" :id="`lt-in-${def.id}-msg`" class="lt__hint">{{ def.hint }}</p>
              </div>

              <!-- Text, and any input type this page does not know -->
              <div v-else>
                <label class="lt__label" :for="`lt-in-${def.id}`">
                  {{ def.label }}<span v-if="!def.required" class="lt__opt">Optional</span>
                </label>
                <p v-if="def.flag" :id="`lt-in-${def.id}-flag`" class="lt__flag">{{ def.flag }}</p>
                <input
                  :id="`lt-in-${def.id}`"
                  class="lt__input"
                  :class="{ 'lt__input--bad': inputMessage(def.id) }"
                  type="text"
                  autocomplete="off"
                  spellcheck="false"
                  :placeholder="def.placeholder"
                  :value="textOf(def.id)"
                  :aria-invalid="!!inputMessage(def.id)"
                  :aria-describedby="describedBy(def)"
                  @input="onText(def.id, $event)"
                  @blur="touchInput(def.id)"
                >
                <p v-if="inputMessage(def.id)" :id="`lt-in-${def.id}-msg`" class="lt__ferr">{{ inputMessage(def.id) }}</p>
                <p v-else-if="def.hint" :id="`lt-in-${def.id}-msg`" class="lt__hint">{{ def.hint }}</p>
              </div>
            </template>
          </div>
          <p v-else class="lt__note">{{ formTitle }} {{ selectedTests.length > 1 ? 'need' : 'needs' }} no inputs.</p>
        </template>
      </fieldset>

      <div class="lt__rule" />

      <div class="lt__row">
        <div class="lt__summary">
          <div class="lt__fname">
            {{ formTitle || 'No test chosen' }}<template v-if="multiple"> · {{ selectedTests.length }} {{ selectedTests.length === 1 ? 'test' : 'tests' }}</template>
          </div>
          <div v-if="missing.length" class="lt__hint">Still needed: {{ missing.join(', ') }}.</div>
          <div v-else class="lt__hint">Ready to run.</div>
        </div>
        <button type="submit" class="lt__go" :disabled="!ready || phase !== 'idle'">
          {{ phase === 'uploading' ? 'Starting…' : phase === 'running' ? 'Running…'
            : selectedTests.length > 1 ? `Run ${selectedTests.length} tests` : 'Run test' }}
        </button>
      </div>

      <div v-if="phase !== 'uploading' && uploadError" class="lt__error">
        <p class="lt__errline">{{ uploadError }}</p>
        <pre v-if="uploadErrorDetail" class="lt__detail">{{ uploadErrorDetail }}</pre>
      </div>
    </form>

    <!-- What we derived -->
    <section v-if="allowed && showDerived && upload" class="lt__card" aria-labelledby="lt-derived-h">
      <div>
        <h2 id="lt-derived-h" class="lt__h2">What we derived</h2>
        <div class="lt__hint">
          {{ upload.lfiCode }} ({{ upload.environment }}) ·
          {{ fmtWhen(upload.createdAt) }}<template v-if="upload.uploadedBy"> · by {{ upload.uploadedBy }}</template>
        </div>
      </div>
      <p v-if="uploadStale" class="lt__warnline">
        The form has changed since these were derived. Run again uses the values below;
        Run test uses the changes.
      </p>
      <div v-if="upload.summary?.warnings?.length" class="lt__warnbox">
        <p v-for="(w, i) in upload.summary.warnings" :key="i" class="lt__errline">{{ w }}</p>
      </div>
      <div v-for="g in derived" :key="g.title">
        <div class="lt__gtitle">{{ g.title }}</div>
        <p v-if="g.note" class="lt__hint">{{ g.note }}</p>
        <dl v-if="g.rows.length" class="lt__dl">
          <template v-for="[k, v] in g.rows" :key="g.title + k">
            <dt>{{ k }}</dt>
            <dd><code>{{ v }}</code></dd>
          </template>
        </dl>
      </div>
    </section>

    <!-- Running -->
    <section v-if="allowed && phase === 'running'" class="lt__card" aria-live="polite">
      <div class="lt__row">
        <div class="lt__running">
          <span class="lt__spinner" aria-hidden="true" />
          <span>
            <template v-if="batch">{{ batchProgress }}: </template>Running {{ runningTitle }} · <b>{{ elapsed }} s</b>
          </span>
        </div>
        <button type="button" class="lt__pick" @click="stopFollowing">Stop</button>
      </div>
      <p class="lt__note">
        <template v-if="batch">
          Each test takes up to about 90 seconds and starts when the one before has finished. Keep this
          page open: tests not started yet start only while it is.
        </template>
        <template v-else>
          A run takes up to about 90 seconds; its steps appear below as they finish.
        </template>
        Stop stops following here: a run already started finishes on the server and is in Recent runs.
      </p>
    </section>

    <!-- Tests run together: how each went -->
    <section v-if="allowed && batch" class="lt__card" aria-labelledby="lt-batch-h">
      <div>
        <h2 id="lt-batch-h" class="lt__h2">{{ batchTitle }}</h2>
        <p class="lt__hint">{{ batchProgress }}.</p>
      </div>
      <ol class="lt__recent">
        <li v-for="(item, i) in batch.items" :key="item.testId" class="lt__bitem" :class="{ 'lt__bitem--on': item.state === 'running' }">
          <div class="lt__brow">
            <span class="lt__pill" :class="`lt__pill--${itemTone(item)}`">{{ itemStatus(item) }}</span>
            <span class="lt__rmain">
              <span class="lt__rtitle">{{ i + 1 }}. {{ item.title }}</span>
              <span v-if="item.run" class="lt__hint lt__hint--flush">
                run <code :title="item.run.id">{{ shortId(item.run.id) }}</code><template
                  v-if="fmtMs(item.run.durationMs)"
                > · {{ fmtMs(item.run.durationMs) }}</template>
              </span>
            </span>
            <RouterLink
              v-if="item.run"
              class="lt__mini"
              :to="{ path: '/internal/pages/lfi-test-results', query: { lfi: item.run.lfiCode, run: item.run.id } }"
            >
              Open in test results
            </RouterLink>
          </div>
          <div v-if="item.error" class="lt__error">
            <p class="lt__errline">{{ item.error }}</p>
            <p v-if="item.errorOnForm" class="lt__errline">The fields concerned are marked on the form above.</p>
            <pre v-if="item.errorDetail" class="lt__detail">{{ item.errorDetail }}</pre>
          </div>
        </li>
      </ol>
    </section>

    <!-- Run error (tests run together show theirs in the list above) -->
    <section v-if="allowed && runError && phase !== 'running' && !batch" class="lt__card">
      <div class="lt__error">
        <p class="lt__errline">{{ runError }}</p>
        <p v-if="runErrorOnForm" class="lt__errline">The fields concerned are marked on the form above.</p>
        <pre v-if="runErrorDetail" class="lt__detail">{{ runErrorDetail }}</pre>
      </div>
      <div v-if="!run && rerunTarget && runRetryable" class="lt__row">
        <span />
        <button type="button" class="lt__pick" @click="runAgain">Try again</button>
      </div>
    </section>

    <!-- Result: while running, the steps as they finish -->
    <section v-if="allowed && run" class="lt__card" aria-live="polite" aria-labelledby="lt-result-h">
      <div class="lt__verdict" :class="`lt__verdict--${tone(run.status)}`">
        <div class="lt__vhead">
          <span class="lt__pill" :class="`lt__pill--${tone(run.status)}`">{{ run.status }}</span>
          <h2 id="lt-result-h" class="lt__vtext">{{ verdict }}</h2>
        </div>
        <p v-if="run.error" class="lt__verr">{{ run.error }}</p>
        <div class="lt__hint">
          {{ testTitle(run.testId) }}<template v-if="run.testVersion"> v{{ run.testVersion }}</template>
          (<code>{{ run.testId }}</code>) ·
          {{ run.lfiCode }} ({{ run.environment }}) · {{ fmtWhen(run.startedAt) }}
          <template v-if="fmtMs(run.durationMs)"> · {{ fmtMs(run.durationMs) }}</template>
          <template v-if="run.uploadedBy"> · by {{ run.uploadedBy }}</template>
        </div>
        <div class="lt__idrow">
          <span class="lt__hint lt__hint--flush">Run ID <code>{{ run.id }}</code></span>
          <button type="button" class="lt__mini" @click="copyRunId(run.id)">
            {{ copiedRunId === run.id ? 'Copied' : 'Copy ID' }}
          </button>
          <RouterLink
            class="lt__mini"
            :to="{ path: '/internal/pages/lfi-test-results', query: { lfi: run.lfiCode, run: run.id } }"
          >
            Open in test results
          </RouterLink>
        </div>
        <dl v-if="runInputRows.length" class="lt__dl lt__dl--inputs" aria-label="Inputs">
          <template v-for="row in runInputRows" :key="row.id">
            <dt>{{ row.label }}</dt>
            <dd><code>{{ row.value }}</code></dd>
          </template>
        </dl>
      </div>

      <ol class="lt__steps">
        <li
          v-for="(step, i) in run.steps ?? []"
          :key="`${i}-${step.id}`"
          class="lt__step"
          :class="`lt__step--${tone(step.status)}`"
        >
          <div class="lt__steptop">
            <span class="lt__pill" :class="`lt__pill--${tone(step.status)}`">{{ step.status }}</span>
            <span class="lt__stitle">{{ i + 1 }}. {{ step.title }} <code class="lt__sid">{{ step.id }}</code></span>
            <span class="lt__sdur">{{ fmtMs(step.durationMs) }}</span>
          </div>
          <p v-if="step.error" class="lt__serr">{{ step.error }}</p>
          <p v-for="(w, k) in step.warnings ?? []" :key="`w${k}`" class="lt__swarn">Warning: {{ w }}</p>
          <p v-if="step.summary" class="lt__ssum">{{ step.summary }}</p>
          <details v-if="step.calls?.length" class="lt__calls">
            <summary>{{ step.calls.length }} {{ step.calls.length === 1 ? 'call' : 'calls' }}</summary>
            <div v-for="(call, j) in step.calls" :key="j" class="lt__call">
              <div class="lt__callhead">
                <span class="lt__method">{{ call.method }}</span>
                <code class="lt__url">{{ call.url }}</code>
              </div>
              <div class="lt__callmeta">
                <span>Status <b>{{ call.status ?? '—' }}</b></span>
                <span v-if="call.interactionId">x-fapi-interaction-id <code>{{ call.interactionId }}</code></span>
                <span v-if="fmtMs(call.durationMs)">{{ fmtMs(call.durationMs) }}</span>
              </div>
              <pre v-if="call.excerpt" class="lt__detail">{{ call.excerpt }}</pre>
            </div>
          </details>
        </li>
      </ol>

      <div class="lt__row">
        <span v-if="rerunAvailable" class="lt__hint">
          Run again uses the same certificates and inputs.
        </span>
        <span v-else class="lt__hint">
          <code>{{ run.testId }}</code> is no longer in the test catalogue, so this run cannot be repeated.
        </span>
        <button type="button" class="lt__go" :disabled="phase !== 'idle' || !rerunAvailable" @click="runAgain">
          Run again
        </button>
      </div>
    </section>

    <!-- Recent runs -->
    <section v-if="allowed && recentRuns.length" class="lt__card" aria-labelledby="lt-recent-h">
      <h2 id="lt-recent-h" class="lt__h2">Recent runs</h2>
      <ul class="lt__recent">
        <li v-for="r in recentRuns" :key="r.id">
          <button
            type="button"
            class="lt__rrow"
            :class="{ 'lt__rrow--on': run?.id === r.id }"
            :aria-current="run?.id === r.id ? 'true' : undefined"
            :disabled="phase !== 'idle' || !!openingRunId"
            @click="openRun(r.id)"
          >
            <span class="lt__pill" :class="`lt__pill--${tone(r.status)}`">{{ r.status }}</span>
            <span class="lt__rmain">
              <span class="lt__rtitle">{{ testTitle(r.testId) }}</span>
              <span class="lt__hint lt__hint--flush">
                {{ r.lfiCode }} ({{ r.environment }}) · {{ fmtWhen(r.startedAt) }}<template v-if="r.uploadedBy"> · {{ r.uploadedBy }}</template>
                · run <code :title="r.id">{{ shortId(r.id) }}</code>
              </span>
            </span>
            <span class="lt__rload">{{ openingRunId === r.id ? 'Loading…' : '' }}</span>
          </button>
        </li>
      </ul>
    </section>
    </div>
  </div>
</template>

<style scoped>
.lt {
  /* Status colours for this page; the rest comes from the site's --at-* tokens. */
  --lt-bad: #b3261e;
  --lt-warn: #8a6d1f;
  --lt-run: var(--at-blue-deep);

  max-width: 44rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}
html.dark .lt {
  --lt-bad: #ff8a80;
  --lt-warn: var(--at-gold);
}
/* --at-navy-deep turns light in dark mode, so text on it must turn dark. */
html.dark .lt__go, html.dark .lt__stepno, html.dark .lt__segbtn--on { color: var(--at-bg-cream); }

.lt__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 700;
}

.lt__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 3.4vw, 2.4rem);
  color: var(--at-navy-deep);
  margin: 0.4rem 0 0;
  line-height: 1.15;
}

.lt__lede { margin: 0.5rem 0 0; font-size: 1rem; color: var(--at-mute); }
.lt__lede--small { font-size: 0.88rem; }

.lt__card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-navy-deep);
  border-radius: 10px;
  padding: 1.75rem 1.9rem;
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.lt__fieldset {
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.lt__fieldset:disabled { opacity: 0.55; }

.lt__stephead { display: flex; align-items: center; gap: 0.7rem; }
.lt__stepno {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: var(--at-navy-deep);
  color: var(--at-inverse-fg, #fff);
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 700;
  flex-shrink: 0;
}
.lt__h2 {
  margin: 0;
  font-family: var(--at-serif);
  font-size: 1.25rem;
  color: var(--at-navy-deep);
  line-height: 1.2;
}

.lt__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  margin-bottom: 0.65rem;
}

/* LFI and environment — same as certificate rotation. */
.lt__envs { display: flex; gap: 0.75rem; }

.lt__env, .lt__test {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--at-mute);
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.lt__env:hover:not(:disabled), .lt__test:hover:not(:disabled) { border-color: var(--at-teal); }
.lt__env:disabled, .lt__test:disabled { cursor: not-allowed; }
.lt__env:disabled { opacity: 0.55; }
.lt__env--on, .lt__test--on {
  border-color: var(--at-navy-deep);
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}

.lt__dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.lt__dot--preprod { background: var(--at-gold); }
.lt__dot--production { background: var(--at-navy-deep); }

.lt__envcode, .lt__soon {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  font-weight: 600;
}
.lt__soon { text-transform: uppercase; }

.lt__hosts {
  list-style: none;
  margin: 0.6rem 0 0;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 8px;
  background: var(--at-bg-paper);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
}
.lt__hosts li { display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
.lt__hosts code { color: var(--at-navy-deep); overflow-wrap: anywhere; }
.lt__hostrole { color: var(--at-mute); }

.lt__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 8px;
  background: transparent;
  font-family: var(--at-mono);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}
.lt__input:focus { outline: none; border-color: var(--at-teal); }
.lt__input--bad, .lt__input--bad:focus { border-color: var(--lt-bad); }
.lt__textarea { resize: vertical; min-height: 3.2rem; }

.lt__hint { font-size: 0.82rem; color: var(--at-mute); margin: 0.35rem 0 0; overflow-wrap: anywhere; }
.lt__hint--flush { margin: 0; }
.lt__ferr { font-size: 0.82rem; color: var(--lt-bad); margin: 0.35rem 0 0; }
.lt__fname { font-size: 0.95rem; font-weight: 600; color: var(--at-navy-deep); overflow-wrap: anywhere; }
.lt__warnline { font-size: 0.82rem; color: var(--lt-warn); margin: 0.35rem 0 0; }

.lt__rule { height: 1px; background: var(--at-grid-line); }

/* File groups */
.lt__group { display: flex; flex-direction: column; gap: 1rem; }
.lt__gtitle {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.lt__check {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.92rem;
  color: var(--at-navy-deep);
  cursor: pointer;
}
.lt__check input { margin-top: 0.2rem; accent-color: var(--at-navy-deep); }

/* File drop zone — same as certificate rotation's CSR upload. */
.lt__drop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.1rem 1rem;
  border: 1px dashed var(--at-grid-line);
  border-radius: 8px;
  text-align: center;
  transition: border-color 0.15s, background 0.15s;
}
.lt__drop--over { border-color: var(--at-teal); background: var(--at-bg-paper); }
.lt__drop--bad { border-color: var(--lt-bad); }
.lt__dropline { margin: 0; font-size: 0.92rem; }
.lt__file { display: none; }

.lt__chosen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  border-radius: 8px;
  background: var(--at-bg-paper);
}

/* Test picker: compact options, side by side where there is room. */
.lt__tests {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.6rem;
}
.lt__test {
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  gap: 0.2rem;
  padding: 0.65rem 0.85rem;
}
.lt__ttitle { font-size: 0.95rem; color: var(--at-navy-deep); }
.lt__subtests {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.6rem;
}
.lt__subtests .lt__env { font-size: 0.88rem; padding: 0.6rem 0.8rem; flex-wrap: wrap; }
.lt__tdesc { font-size: 0.8rem; font-weight: 400; line-height: 1.35; color: var(--at-mute); }

/* Test inputs — rendered from the catalogue by type. */
.lt__inputs { gap: 1.35rem; }
.lt__sub { border: 0; margin: 0; padding: 0; min-width: 0; }
.lt__sub > legend { padding: 0; }
/* What the answer must be, which no check can confirm before the run. */
.lt__flag {
  margin: 0 0 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--lt-warn);
  border-left-width: 3px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--lt-warn);
  overflow-wrap: anywhere;
}
.lt__opt { margin-left: 0.6rem; font-weight: 500; opacity: 0.75; }

.lt__choices {
  display: grid;
  /* Two columns only where a long label (GET /accounts/{AccountId}/…) still fits on one line. */
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 0.45rem 1rem;
}
.lt__check--choice { font-size: 0.86rem; }
.lt__chint { display: block; font-size: 0.78rem; color: var(--at-mute); }

.lt__payee { display: flex; flex-direction: column; gap: 0.7rem; }
.lt__payeegrid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.lt__sublabel {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--at-mute);
}
.lt__nametype { display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem 0.75rem; }
.lt__nametype .lt__sublabel { margin: 0; }
.lt__seg {
  display: inline-flex;
  border: 1px solid var(--at-grid-line);
  border-radius: 8px;
  overflow: hidden;
}
.lt__segbtn {
  padding: 0.4rem 0.9rem;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--at-mute);
  cursor: pointer;
}
.lt__segbtn + .lt__segbtn { border-left: 1px solid var(--at-grid-line); }
.lt__segbtn--on { background: var(--at-navy-deep); color: var(--at-inverse-fg, #fff); }
.lt__nametype > .lt__hint { flex: 1 1 16rem; }

.lt__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.lt__row > .lt__hint { margin: 0; flex: 1 1 14rem; }
.lt__summary { min-width: 0; flex: 1 1 14rem; }

.lt__go {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: 8px;
  border: none;
  background: var(--at-navy-deep);
  color: var(--at-inverse-fg, #fff);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}
.lt__go:disabled { opacity: 0.6; cursor: not-allowed; }

.lt__pick {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  cursor: pointer;
}
.lt__pick:hover:not(:disabled) { border-color: var(--at-teal); }
.lt__pick:disabled { cursor: not-allowed; }

.lt__note, .lt__error { margin: 0; font-size: 0.88rem; }
.lt__note { color: var(--at-mute); }
.lt__ok { margin: 0; font-size: 0.88rem; font-weight: 600; color: var(--at-teal-deep); }
.lt__error { color: var(--lt-bad); }
.lt__errline { margin: 0 0 0.4rem; }
.lt__errline:last-child { margin-bottom: 0; }

.lt__detail {
  margin: 0.5rem 0 0;
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-paper);
  font-family: var(--at-mono);
  font-size: 0.76rem;
  line-height: 1.5;
  color: var(--at-navy-deep);
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 18rem;
  overflow: auto;
}

/* What we derived */
.lt__warnbox {
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--lt-warn);
  border-left-width: 3px;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--lt-warn);
}
.lt__dl {
  display: grid;
  grid-template-columns: minmax(9rem, max-content) 1fr;
  gap: 0.3rem 1rem;
  margin: 0.5rem 0 0;
  font-size: 0.82rem;
}
.lt__dl dt { color: var(--at-mute); }
.lt__dl dd { margin: 0; min-width: 0; }
.lt__dl code { color: var(--at-navy-deep); overflow-wrap: anywhere; }
/* The run's inputs, inside the verdict banner. */
.lt__dl--inputs { margin-top: 0.2rem; padding-top: 0.5rem; border-top: 1px dashed var(--at-grid-line); }

/* Sub-tests run together: a tick box, so several-at-once reads differently from the radios. */
.lt__box {
  width: 0.85rem;
  height: 0.85rem;
  flex-shrink: 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid currentColor;
  border-radius: 3px;
}
.lt__env--on .lt__box { background: var(--at-navy-deep); border-color: var(--at-navy-deep); }
.lt__env--on .lt__box::after {
  content: '';
  width: 0.42rem;
  height: 0.22rem;
  margin-top: -0.1rem;
  border-left: 2px solid var(--at-inverse-fg, #fff);
  border-bottom: 2px solid var(--at-inverse-fg, #fff);
  transform: rotate(-45deg);
}
html.dark .lt__env--on .lt__box::after { border-color: var(--at-bg-cream); }

/* Running */
.lt__running { display: flex; align-items: center; gap: 0.7rem; font-size: 0.95rem; color: var(--at-navy-deep); }
.lt__spinner {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid var(--at-grid-line);
  border-top-color: var(--at-teal-deep);
  animation: lt-spin 0.9s linear infinite;
  flex-shrink: 0;
}
@keyframes lt-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .lt__spinner { animation: none; }
}

/* Status pill — same family as redirect testing's verdict pill. */
.lt__pill {
  flex: 0 0 auto;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.2rem 0.45rem;
  border: 1px solid currentColor;
  border-radius: 3px;
  line-height: 1;
}
.lt__pill--pass { color: var(--at-teal-deep); }
.lt__pill--fail { color: var(--lt-bad); }
.lt__pill--error { color: var(--lt-warn); }
.lt__pill--run { color: var(--lt-run); }
.lt__pill--skip { color: var(--at-mute); }

/* Verdict banner */
.lt__verdict {
  padding: 0.9rem 1rem;
  border: 1px solid var(--at-grid-line);
  border-left: 4px solid var(--at-grid-line-2);
  border-radius: 8px;
  background: var(--at-bg-paper);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.lt__verdict--pass { border-left-color: var(--at-teal-deep); }
.lt__verdict--fail { border-left-color: var(--lt-bad); }
.lt__verdict--error { border-left-color: var(--lt-warn); }
.lt__verdict--run { border-left-color: var(--lt-run); }
.lt__vhead { display: flex; align-items: center; gap: 0.6rem; }
.lt__vtext { margin: 0; font-size: 1rem; font-weight: 700; color: var(--at-navy-deep); font-family: inherit; }
.lt__verr { margin: 0; font-size: 0.86rem; color: var(--lt-bad); overflow-wrap: anywhere; }

/* Steps */
.lt__steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.55rem; }
.lt__step {
  padding: 0.65rem 0.8rem;
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-grid-line-2);
  border-radius: 6px;
}
.lt__step--pass { border-left-color: var(--at-teal-deep); }
.lt__step--fail { border-left-color: var(--lt-bad); }
.lt__step--error { border-left-color: var(--lt-warn); }
.lt__steptop { display: flex; align-items: center; gap: 0.6rem; }
.lt__stitle { flex: 1; min-width: 0; font-size: 0.92rem; font-weight: 600; color: var(--at-navy-deep); }
.lt__sid {
  margin-left: 0.35rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--at-mute);
}

/* Run ID with its copy and open actions */
.lt__idrow { display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem 0.5rem; }
.lt__idrow code { overflow-wrap: anywhere; }
.lt__mini {
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  font-family: inherit;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  text-decoration: none;
  cursor: pointer;
}
.lt__mini:hover { border-color: var(--at-teal); }
.lt__sdur { font-family: var(--at-mono); font-size: 0.72rem; color: var(--at-mute); }
.lt__ssum, .lt__serr { margin: 0.35rem 0 0; font-size: 0.84rem; overflow-wrap: anywhere; }
.lt__ssum { color: var(--at-mute-2); }
.lt__serr { color: var(--lt-bad); }
.lt__swarn { margin: 0.35rem 0 0; font-size: 0.84rem; color: var(--lt-warn); overflow-wrap: anywhere; }

.lt__calls { margin-top: 0.5rem; font-size: 0.82rem; }
.lt__calls > summary {
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.lt__call { margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px dashed var(--at-grid-line); }
.lt__callhead { display: flex; gap: 0.5rem; align-items: baseline; }
.lt__method { font-family: var(--at-mono); font-size: 0.72rem; font-weight: 700; color: var(--at-navy-deep); }
.lt__url { font-size: 0.78rem; color: var(--at-navy-deep); overflow-wrap: anywhere; min-width: 0; }
.lt__callmeta { display: flex; flex-wrap: wrap; gap: 0.2rem 1rem; margin-top: 0.3rem; color: var(--at-mute); }
.lt__callmeta code { overflow-wrap: anywhere; }

/* Recent runs */
.lt__recent { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.lt__rrow {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 6px;
  background: transparent;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}
.lt__rrow:hover:not(:disabled) { border-color: var(--at-teal); }
.lt__rrow:disabled { cursor: not-allowed; }
.lt__rrow--on { border-color: var(--at-navy-deep); background: var(--at-bg-paper); }
.lt__rmain { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.1rem; }
.lt__rtitle { font-size: 0.88rem; font-weight: 600; color: var(--at-navy-deep); }
.lt__rload { font-size: 0.78rem; color: var(--at-mute); }

/* Tests run together */
.lt__bitem {
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.lt__bitem--on { border-color: var(--at-navy-deep); background: var(--at-bg-paper); }
.lt__brow { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

@media (max-width: 30rem) {
  .lt__card { padding: 1.4rem 1.1rem; }
  .lt__envs { flex-direction: column; }
  .lt__row { align-items: stretch; }
  .lt__go { justify-content: center; }
  .lt__dl { grid-template-columns: 1fr; gap: 0.1rem; }
  .lt__dl dd { margin-bottom: 0.4rem; }
  .lt__payeegrid { grid-template-columns: 1fr; }
}
</style>

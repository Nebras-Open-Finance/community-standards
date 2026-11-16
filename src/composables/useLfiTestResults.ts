// LFI test results — a read-only viewer for the functional test runs recorded by
// LFI functional testing (useLfiTesting). Client for GET /lfi-testing/runs and
// GET /lfi-testing/runs/:id on the proposals API (standards-api), with the same
// base URL and fetch helper.
//
// Access: Sandbox Trust Framework SSO via useSandboxAuth, Nebras staff only
// (/me → isAdmin; the API applies the same requireAdmin gate on every call). No
// /lfi-testing/runs call is made until the page knows the user is allowed. A 401
// re-reads /me and puts the page back to sign-in; a 403 shows the API's message
// and hides the results.
//
// The chosen LFI and the open run live in the URL (?lfi=<code>&run=<id>) so a run
// can be shared as a link. Nothing is kept in browser storage.
//
// Field names only, never response values: the API's call `excerpt` (a response
// body excerpt) is dropped when a run is loaded and never reaches the page. The
// run's inputs (what the person running the test entered) are kept and shown.

import { ref, computed, watch } from 'vue'
import { useRoute, useRouter, type LocationQuery } from 'vue-router'
import { useSandboxAuth } from './useSandboxAuth'
import {
  LFIS, lfiTestingApi, lfiTestingNetworkMessage, parseLfiTestCatalogue, type LfiTest,
} from './useLfiTesting'

/** Runs fetched per page of the list. The API accepts 1–100. */
const PAGE_SIZE = 25

// ── API shapes ───────────────────────────────────────────────────────────────

export type TestRunStatus = 'running' | 'passed' | 'failed' | 'error'
/** `pending`: planned, not run yet — only while the run is `running` (the API records each step as it finishes). */
export type TestStepStatus = 'pending' | 'passed' | 'failed' | 'error' | 'skipped'

/** One row of GET /lfi-testing/runs. */
export interface TestRunSummary {
  id: string
  uploadId: string
  testId: string
  testVersion: string
  lfiCode: string
  environment: string
  uploadedBy: string | null
  runBy: string | null
  status: TestRunStatus
  startedAt: string
  finishedAt: string | null
  durationMs: number | null
}

/** One field the spec defines for the response, in spec order. */
export interface SpecField {
  /** e.g. 'Data.Account[].AccountId' */
  path: string
  /** Required within its parent object. */
  required: boolean
  /** How many of the `of` parent objects carried the field. */
  returned: number
  /** How many parent objects were returned; 0 means the parent itself was absent. */
  of: number
  /** The field's distinct problem messages. */
  problems: string[]
}

/** How a response compared with the Open Finance OpenAPI specification. */
export interface SpecReport {
  /** e.g. 'uae-account-information-openapi' */
  spec: string
  /** e.g. 'v2.1-errata2' */
  version: string
  /** e.g. 'GET /accounts' */
  operation: string
  /** The response status the schema is for. */
  status: number
  /** e.g. 'AEReadAccount' */
  schema: string | null
  /** True when the response matched the spec with no problems. */
  matches: boolean
  fields: SpecField[]
  /** Returned by the LFI but not defined in the spec. */
  unexpected: { path: string; returned: number }[]
  /** Concrete paths ('Data.Account[0].Status'; '' = the whole response), capped at 100. */
  problems: { path: string; message: string }[]
  /** Total problems found; may exceed problems.length. */
  problemCount: number
}

/** A call made during a step. The API's `excerpt` is deliberately not carried. */
export interface TestRunCall {
  method: string
  url: string
  status: number | null
  interactionId: string | null
  durationMs: number | null
  /** Calls the suite checked against the spec, on runs recorded since spec checks were added. */
  spec: SpecReport | null
}

export interface TestRunStep {
  id: string
  title: string
  status: TestStepStatus
  startedAt: string | null
  durationMs: number | null
  summary: string | null
  error: string | null
  /** Worth the LFI's attention but not failures. Empty on older runs. */
  warnings: string[]
  calls: TestRunCall[]
}

/** GET /lfi-testing/runs/:id → run. */
export interface TestRunDetail extends TestRunSummary {
  error: string | null
  /** The normalised inputs the run used, keyed by input ID; null on runs recorded before inputs. */
  inputs: Record<string, unknown> | null
  steps: TestRunStep[]
}

// ── Normalisation ────────────────────────────────────────────────────────────
// Defaults for anything missing, and only the fields the page uses — which is
// what keeps response excerpts out of the page's state.

function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

function strOrNull(v: unknown): string | null {
  return typeof v === 'string' && v ? v : null
}

function numOrNull(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

function num(v: unknown): number {
  return numOrNull(v) ?? 0
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

function toSpec(raw: unknown): SpecReport | null {
  if (!raw || typeof raw !== 'object') return null
  const s = raw as Partial<Record<keyof SpecReport, unknown>>
  const problems = arr<{ path?: unknown; message?: unknown }>(s.problems).map((p) => ({
    path: typeof p?.path === 'string' ? p.path : '',
    message: String(p?.message ?? ''),
  }))
  return {
    spec: String(s.spec ?? ''),
    version: String(s.version ?? ''),
    operation: String(s.operation ?? ''),
    status: num(s.status),
    schema: strOrNull(s.schema),
    matches: s.matches === true,
    fields: arr<Partial<SpecField>>(s.fields).map((f) => ({
      path: String(f?.path ?? ''),
      required: f?.required === true,
      returned: num(f?.returned),
      of: num(f?.of),
      problems: arr<unknown>(f?.problems).map(String),
    })),
    unexpected: arr<{ path?: unknown; returned?: unknown }>(s.unexpected).map((u) => ({
      path: String(u?.path ?? ''),
      returned: num(u?.returned),
    })),
    problems,
    problemCount: Math.max(num(s.problemCount), problems.length),
  }
}

function toCall(raw: Partial<Record<keyof TestRunCall, unknown>>): TestRunCall {
  return {
    method: String(raw?.method ?? ''),
    url: String(raw?.url ?? ''),
    status: numOrNull(raw?.status),
    interactionId: strOrNull(raw?.interactionId),
    durationMs: numOrNull(raw?.durationMs),
    spec: toSpec(raw?.spec),
  }
}

function toStep(raw: Partial<Record<keyof TestRunStep, unknown>>): TestRunStep {
  return {
    id: String(raw?.id ?? ''),
    title: String(raw?.title ?? ''),
    status: (raw?.status as TestStepStatus) ?? 'skipped',
    startedAt: strOrNull(raw?.startedAt),
    durationMs: numOrNull(raw?.durationMs),
    summary: strOrNull(raw?.summary),
    error: strOrNull(raw?.error),
    warnings: arr<unknown>(raw?.warnings).map(String),
    calls: arr<Partial<Record<keyof TestRunCall, unknown>>>(raw?.calls).map(toCall),
  }
}

function toDetail(raw: TestRunDetail): TestRunDetail {
  return {
    id: raw.id,
    uploadId: raw.uploadId,
    testId: raw.testId,
    testVersion: raw.testVersion,
    lfiCode: raw.lfiCode,
    environment: raw.environment,
    uploadedBy: strOrNull(raw.uploadedBy),
    runBy: strOrNull(raw.runBy),
    status: raw.status,
    startedAt: raw.startedAt,
    finishedAt: strOrNull(raw.finishedAt),
    durationMs: numOrNull(raw.durationMs),
    error: strOrNull(raw.error),
    inputs: isRecord(raw.inputs) ? raw.inputs : null,
    steps: arr<Partial<Record<keyof TestRunStep, unknown>>>(raw.steps).map(toStep),
  }
}

/** A query value as one string: the first if repeated, null if absent or empty. */
function queryString(v: LocationQuery[string] | undefined): string | null {
  const s = Array.isArray(v) ? v[0] : v
  return typeof s === 'string' && s ? s : null
}

export function useLfiTestResults() {
  const { auth, loadMe, signIn } = useSandboxAuth()
  const route = useRoute()
  const router = useRouter()

  // ── Session ────────────────────────────────────────────────────────────────
  /** Set by a 401: the API no longer accepts the session, whatever /me said. */
  const sessionLost = ref(false)
  /** Set by a 403: the API's own message. Hides the results. */
  const accessError = ref<string | null>(null)

  /** Signed in, not blocked, Nebras staff, and the API has not refused the session. */
  const allowed = computed(() =>
    auth.value.loaded && auth.value.authenticated && !auth.value.blocked
      && auth.value.isAdmin === true && !sessionLost.value && !accessError.value,
  )

  // ── Tests (titles) ─────────────────────────────────────────────────────────
  const tests = ref<LfiTest[]>([])

  /** Open route. Titles fall back to the test ID if this fails. */
  async function loadTests(): Promise<void> {
    try {
      const r = await lfiTestingApi<{ tests?: unknown }>('/lfi-testing/tests')
      if (r.ok) tests.value = parseLfiTestCatalogue(r.data?.tests)
    } catch { /* titles fall back to IDs */ }
  }

  // ── URL state ──────────────────────────────────────────────────────────────
  /** The LFI from ?lfi=, if it is one the page knows; otherwise the first. */
  const lfiCode = computed(() => {
    const q = queryString(route.query.lfi)
    return q && LFIS.some((l) => l.code === q) ? q : (LFIS[0]?.code ?? '')
  })

  /** The run from ?run=, or null for the list. */
  const runId = computed(() => queryString(route.query.run))

  function setQuery(lfi: string, run: string | null): void {
    const query: LocationQuery = { ...route.query, lfi }
    if (run) query.run = run
    else delete query.run
    void router.replace({ query })
  }

  /** Choose an LFI: closes any open run and lists that LFI's runs. */
  function selectLfi(code: string): void {
    if (!LFIS.some((l) => l.code === code)) return
    if (code === lfiCode.value && !runId.value) return
    setQuery(code, null)
  }

  /** The query that opens a run — for links, so a run can be opened in a new tab. */
  function runQuery(id: string): LocationQuery {
    return { ...route.query, lfi: lfiCode.value, run: id }
  }

  function closeRun(): void {
    setQuery(lfiCode.value, null)
  }

  // ── Errors common to every call ────────────────────────────────────────────
  /** 401 and 403 end the page's access; true when the caller should stop. */
  function refused(status: number, err: { error?: string } | null): boolean {
    if (status === 401) {
      sessionLost.value = true
      clear()
      void loadMe()
      return true
    }
    if (status === 403) {
      accessError.value = err?.error ?? 'Access was refused (403).'
      clear()
      return true
    }
    return false
  }

  // ── Runs list ──────────────────────────────────────────────────────────────
  const runs = ref<TestRunSummary[]>([])
  const nextBefore = ref<string | null>(null)
  /** The LFI the list belongs to; null until it has loaded once. */
  const listFor = ref<string | null>(null)
  const listLoading = ref(false)
  const moreLoading = ref(false)
  const listError = ref<string | null>(null)
  let listSeq = 0
  /** Whether the last list call was "Load more", so Retry repeats the right one. */
  let lastMore = false

  const counts = computed(() => {
    const c = { passed: 0, failed: 0, error: 0, running: 0 }
    for (const r of runs.value) if (r.status in c) c[r.status]++
    return c
  })

  async function loadRuns(more = false): Promise<void> {
    if (!allowed.value) return
    if (more && (!nextBefore.value || moreLoading.value || listLoading.value)) return
    const code = lfiCode.value
    const seq = ++listSeq
    lastMore = more
    const params = new URLSearchParams({ lfiCode: code, limit: String(PAGE_SIZE) })
    if (more && nextBefore.value) params.set('before', nextBefore.value)
    listError.value = null
    if (more) moreLoading.value = true
    else {
      listLoading.value = true
      moreLoading.value = false
    }
    try {
      const r = await lfiTestingApi<{ runs?: TestRunSummary[]; nextBefore?: string | null }>(
        `/lfi-testing/runs?${params.toString()}`,
      )
      if (seq !== listSeq) return
      if (refused(r.status, r.err)) return
      if (!r.ok || !Array.isArray(r.data?.runs)) {
        listError.value = r.err?.error ?? (r.ok
          ? 'No runs came back.'
          : `Could not load the runs (${r.status}).`)
        return
      }
      const page = r.data.runs
      if (more) {
        const seen = new Set(runs.value.map((x) => x.id))
        runs.value = [...runs.value, ...page.filter((x) => !seen.has(x.id))]
      } else {
        runs.value = page
      }
      nextBefore.value = typeof r.data.nextBefore === 'string' && r.data.nextBefore ? r.data.nextBefore : null
      listFor.value = code
    } catch (e) {
      if (seq === listSeq) listError.value = lfiTestingNetworkMessage(e)
    } finally {
      if (seq === listSeq) {
        listLoading.value = false
        moreLoading.value = false
      }
    }
  }

  function loadMore(): void {
    void loadRuns(true)
  }

  function refreshRuns(): void {
    void loadRuns(false)
  }

  function retryRuns(): void {
    void loadRuns(lastMore && !!nextBefore.value)
  }

  // A different LFI means a fresh list.
  watch([allowed, lfiCode], ([ok, code]) => {
    if (!ok || listFor.value === code) return
    runs.value = []
    nextBefore.value = null
    listFor.value = null
    void loadRuns(false)
  }, { immediate: true })

  // ── Run detail ─────────────────────────────────────────────────────────────
  const run = ref<TestRunDetail | null>(null)
  const runLoading = ref(false)
  const runError = ref<string | null>(null)
  let runSeq = 0

  async function loadRun(id: string): Promise<void> {
    if (!allowed.value) return
    const seq = ++runSeq
    runLoading.value = true
    runError.value = null
    if (run.value?.id !== id) run.value = null
    try {
      const r = await lfiTestingApi<{ run?: TestRunDetail }>(`/lfi-testing/runs/${encodeURIComponent(id)}`)
      if (seq !== runSeq) return
      if (refused(r.status, r.err)) return
      if (!r.ok || !r.data?.run) {
        runError.value = r.err?.error ?? (r.status === 404
          ? 'No run with this ID.'
          : r.ok ? 'No run came back.' : `Could not load the run (${r.status}).`)
        run.value = null
        return
      }
      run.value = toDetail(r.data.run)
    } catch (e) {
      if (seq === runSeq) runError.value = lfiTestingNetworkMessage(e)
    } finally {
      if (seq === runSeq) runLoading.value = false
    }
  }

  function refreshRun(): void {
    if (runId.value) void loadRun(runId.value)
  }

  // Open whichever run the URL names, once access is confirmed.
  watch([allowed, runId], ([ok, id]) => {
    if (!ok) return
    if (!id) {
      runSeq++
      run.value = null
      runError.value = null
      runLoading.value = false
      return
    }
    if (run.value?.id === id) return
    void loadRun(id)
  }, { immediate: true })

  /** Drop everything fetched under the session — on 401 and 403. */
  function clear(): void {
    listSeq++
    runSeq++
    runs.value = []
    nextBefore.value = null
    listFor.value = null
    listLoading.value = false
    moreLoading.value = false
    listError.value = null
    run.value = null
    runLoading.value = false
    runError.value = null
  }

  /** The test's title from /lfi-testing/tests, or its ID. */
  function testTitle(id: string | null | undefined): string {
    return tests.value.find((t) => t.id === id)?.title ?? id ?? ''
  }

  /** The test's catalogue entry, for its input labels; null if the catalogue does not list it. */
  function testOf(id: string | null | undefined): LfiTest | null {
    return tests.value.find((t) => t.id === id) ?? null
  }

  return {
    // session
    auth, allowed, sessionLost, accessError, loadMe, signIn,
    // tests
    tests, loadTests, testTitle, testOf,
    // selection (URL)
    lfiCode, runId, selectLfi, runQuery, closeRun,
    // list
    runs, nextBefore, listFor, listLoading, moreLoading, listError, counts, loadMore, refreshRuns, retryRuns,
    // detail
    run, runLoading, runError, refreshRun,
  }
}

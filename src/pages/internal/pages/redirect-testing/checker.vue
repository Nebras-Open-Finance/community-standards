<route lang="yaml">
meta:
  layout: internal
  title: Redirect checker
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import type { Verification, VerificationProbe, VerificationVerdict } from '@/data/auth-endpoints'

useHead({ title: 'Redirect checker' })

const input = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const result = ref<Verification | null>(null)
// The exact string that produced `result`, so the heading reflects what was run
// even after the user edits the box.
const checkedInput = ref('')

interface ProbeRow {
  label: string
  file: string
  probe: VerificationProbe
  /** Informational probe — excluded from the headline verdict; never shown red. */
  optional: boolean
}

// Same ordering + labelling the directory page uses. Huawei (HarmonyOS App
// Linking) is appended as an informational probe only.
function probesOf(v: Verification): ProbeRow[] {
  const rows: ProbeRow[] = [
    { label: 'Android', file: '/.well-known/assetlinks.json', probe: v.android, optional: false },
    { label: 'iOS', file: '/.well-known/apple-app-site-association', probe: v.ios, optional: false },
  ]
  if (v.huawei) {
    rows.push({ label: 'Huawei', file: '/.well-known/applinking.json', probe: v.huawei, optional: true })
  }
  return rows
}

// Display tone: an optional (Huawei) probe that isn't served shows as a neutral
// 'na' — informational, never a failure.
function toneOf(row: ProbeRow): VerificationVerdict | 'na' {
  if (row.optional && row.probe.verdict === 'fail') return 'na'
  return row.probe.verdict
}

function labelOf(row: ProbeRow): string {
  return toneOf(row) === 'na' ? 'n/a' : row.probe.verdict
}

function noteOf(row: ProbeRow): string | null {
  if (toneOf(row) === 'na') {
    return 'HarmonyOS App Linking not configured — optional; Huawei users use the browser fallback.'
  }
  return row.probe.note
}

// The worst of the two REQUIRED probes is the headline verdict. Huawei is
// informational and deliberately excluded.
function worstOf(v: Verification | null): VerificationVerdict | null {
  if (!v) return null
  if (v.android.verdict === 'fail' || v.ios.verdict === 'fail') return 'fail'
  if (v.android.verdict === 'warn' || v.ios.verdict === 'warn') return 'warn'
  return 'pass'
}

const verdictLabel: Record<VerificationVerdict, string> = {
  pass: 'Passes deep-link verification',
  warn: 'Reachable, with a warning',
  fail: 'Does not pass',
}

const endpointUnavailable =
  'Could not reach the checker endpoint. The proxy runs only in the deployed Cloudflare Pages ' +
  'environment (or via `npx wrangler pages dev`) — the plain Vite dev server does not serve /api/ functions.'

async function check(): Promise<void> {
  const raw = input.value.trim()
  if (!raw || loading.value) return
  loading.value = true
  error.value = null
  result.value = null
  try {
    const res = await fetch(`/api/probe-well-known?url=${encodeURIComponent(raw)}`, {
      headers: { Accept: 'application/json' },
    })
    // The plain Vite dev server has no /api/ function and serves the SPA shell
    // (200 text/html) as a fallback — surface that as the environment hint.
    if (!/application\/json/i.test(res.headers.get('content-type') || '')) {
      error.value = endpointUnavailable
      return
    }
    const body = await res.json().catch(() => null)
    if (!res.ok) {
      error.value = (body && body.error) || `Checker returned HTTP ${res.status}.`
      return
    }
    if (!body || !body.origin || !body.android || !body.ios) {
      error.value = 'Checker returned an unexpected response.'
      return
    }
    result.value = body as Verification
    checkedInput.value = raw
  } catch {
    error.value = endpointUnavailable
  } finally {
    loading.value = false
  }
}

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined
async function copyCurl(): Promise<void> {
  if (!result.value) return
  // Must mirror probeFile() in scripts/lib/well-known-probe.mjs exactly, or the
  // copied command can contradict the verdict shown above it: GET (not HEAD, so
  // the body is graded), `Accept: */*` (gateways vary on Accept), and no
  // redirect following (a redirect is itself a failure).
  const cmd =
    `curl -sS -D- -o- --max-redirs 0 -A 'Mozilla/5.0 (Linux; Android 14; Pixel 8)' ` +
    `-H 'Accept: */*' '${result.value.origin}/.well-known/assetlinks.json'`
  try {
    await navigator.clipboard.writeText(cmd)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 1400)
  } catch {
    /* clipboard unavailable — nothing to do */
  }
}
onUnmounted(() => clearTimeout(copyTimer))
</script>

<template>
  <div class="chk">
    <section class="chk__hero">
      <div class="chk__eyebrow">
        <span class="chk__dash" />
        Internal · Redirect testing
      </div>
      <h1 class="chk__title">Redirect checker</h1>
      <p class="chk__lede">
        Paste any authorisation endpoint, redirect URI or origin. This probes the deep-link
        verification files at that origin:
      </p>
      <ul class="chk__criteria">
        <li>
          <strong class="chk__c chk__c--pass">Pass</strong> — a <code>200</code> serving valid
          JSON as <code>application/json</code>.
        </li>
        <li>
          <strong class="chk__c chk__c--warn">Warn</strong> — a wrong <code>Content-Type</code>.
        </li>
        <li>
          <strong class="chk__c chk__c--fail">Fail</strong> — a redirect, non-200, non-JSON body
          or network error.
        </li>
        <li>
          <strong class="chk__c chk__c--na">n/a</strong> — Huawei
          <code>applinking.json</code> (HarmonyOS App Linking) only. This file is
          <strong>not required</strong>, so an absent one is informational, not a failure, and
          never affects the headline verdict.
        </li>
      </ul>
      <p class="chk__lede">
        These are the same rules as the
        <a href="/internal/pages/redirect-testing">redirect testing page</a> (built to check
        published production <code>authorization_endpoint</code>s).
      </p>
    </section>

    <form class="chk__form" @submit.prevent="check">
      <input
        v-model="input"
        type="text"
        class="chk__input"
        placeholder="https://auth1.examplebank.apihub.openfinance.ae/…"
        autocomplete="off"
        spellcheck="false"
        inputmode="url"
      >
      <button type="submit" class="chk__btn" :disabled="loading || !input.trim()">
        {{ loading ? 'Checking…' : 'Check' }}
      </button>
    </form>

    <p v-if="error" class="chk__error">{{ error }}</p>

    <section v-if="result" class="chk__result">
      <div class="chk__result-head">
        <span
          v-if="worstOf(result)"
          class="chk__verdict chk__verdict--lg"
          :class="`chk__verdict--${worstOf(result)}`"
        >{{ worstOf(result) }}</span>
        <div class="chk__result-ident">
          <div class="chk__result-verdict">{{ verdictLabel[worstOf(result)!] }}</div>
          <a class="chk__origin-link" :href="result.origin" target="_blank" rel="noreferrer">{{ result.origin }}</a>
        </div>
      </div>

      <div class="chk__probes">
        <div
          v-for="p in probesOf(result)"
          :key="p.label"
          class="chk__probe"
          :class="`chk__probe--${toneOf(p)}`"
        >
          <span class="chk__verdict" :class="`chk__verdict--${toneOf(p)}`">{{ labelOf(p) }}</span>
          <div class="chk__probe-body">
            <div class="chk__probe-top">
              <strong class="chk__probe-plat">{{ p.label }}</strong>
              <span v-if="p.optional" class="chk__probe-opt">informational</span>
              <a class="chk__probe-file" :href="result.origin + p.file" target="_blank" rel="noreferrer">
                <code>{{ p.file }}</code>
              </a>
            </div>
            <div class="chk__probe-meta">
              {{ p.probe.status ?? 'network error' }} ·
              {{ p.probe.contentType || 'no Content-Type' }} ·
              {{ p.probe.jsonValid ? 'valid JSON' : 'not JSON' }}
            </div>
            <div v-if="noteOf(p)" class="chk__probe-note">{{ noteOf(p) }}</div>
          </div>
        </div>
      </div>

      <div class="chk__foot">
        <span class="chk__foot-hint">Checked <code>{{ checkedInput }}</code></span>
        <button type="button" class="chk__copy" :class="{ 'chk__copy--done': copied }" @click="copyCurl">
          {{ copied ? 'Copied' : 'Copy curl' }}
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.chk {
  max-width: 52rem;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

.chk__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 1.1rem;
}
.chk__dash { width: 24px; height: 1px; background: currentColor; }

.chk__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  margin: 0 0 1rem;
}

.chk__lede {
  font-size: 1.02rem;
  line-height: 1.65;
  margin: 0 0 0.9rem;
  max-width: 46rem;
}
.chk__lede code, .chk__meta code { font-family: var(--at-mono); font-size: 0.9em; }
.chk__lede a { color: var(--at-teal-deep); }

.chk__criteria {
  margin: 0 0 1rem;
  padding-left: 1.15rem;
  max-width: 46rem;
  font-size: 0.95rem;
  line-height: 1.6;
}
.chk__criteria li { margin: 0.15rem 0; }
.chk__criteria code { font-family: var(--at-mono); font-size: 0.9em; }
.chk__c {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.chk__c--pass { color: var(--at-teal-deep); }
.chk__c--warn { color: #8a6d1f; }
.chk__c--fail { color: #b3261e; }
.chk__c--na { color: var(--at-mute); }

/* ── Form ─────────────────────────────────────────────────────────────────── */
.chk__form {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}
.chk__input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.7rem 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.86rem;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}
.chk__input:focus { outline: none; border-color: var(--at-teal-deep); }

.chk__btn {
  flex: 0 0 auto;
  padding: 0.7rem 1.4rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 1px solid var(--at-navy-deep);
  cursor: pointer;
  transition: background 0.16s;
}
.chk__btn:hover:not(:disabled) { background: var(--at-teal-deep); border-color: var(--at-teal-deep); }
.chk__btn:disabled { opacity: 0.5; cursor: not-allowed; }

.chk__error {
  font-size: 0.86rem;
  line-height: 1.55;
  color: #b3261e;
  border: 1px solid currentColor;
  border-left-width: 3px;
  padding: 0.75rem 0.9rem;
  margin: 0 0 1.25rem;
}

/* ── Result ───────────────────────────────────────────────────────────────── */
.chk__result {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal-deep);
  padding: 1.35rem 1.4rem 1.4rem;
}

.chk__result-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.1rem;
}
.chk__result-ident { min-width: 0; }
.chk__result-verdict {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--at-navy-deep);
}
.chk__origin-link {
  font-family: var(--at-mono);
  font-size: 0.8rem;
  color: var(--at-mute);
  word-break: break-all;
  text-decoration: none;
  border-bottom: 1px solid var(--at-grid-line-2);
}
.chk__origin-link:hover { color: var(--at-teal-deep); }

.chk__probes { display: grid; gap: 0.5rem; }

.chk__probe {
  display: flex;
  gap: 0.6rem;
  padding: 0.6rem 0.7rem;
  border: 1px solid var(--at-grid-line);
  border-left-width: 3px;
}
.chk__probe--pass { border-left-color: var(--at-teal-deep); }
.chk__probe--warn { border-left-color: #8a6d1f; }
.chk__probe--fail { border-left-color: #b3261e; }
.chk__probe--na { border-left-color: var(--at-grid-line-2); }

.chk__probe-body { min-width: 0; flex: 1; }
.chk__probe-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
}
.chk__probe-plat { font-size: 0.8rem; color: var(--at-navy-deep); }
.chk__probe-opt {
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  border: 1px solid var(--at-grid-line-2);
  padding: 0.08rem 0.32rem;
}
.chk__probe-file { text-decoration: none; border-bottom: 1px solid var(--at-grid-line-2); }
.chk__probe-file code {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  color: var(--at-mute-2);
  word-break: break-all;
}
.chk__probe-file:hover code { color: var(--at-teal-deep); }
.chk__probe-meta {
  margin-top: 0.25rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute);
  word-break: break-word;
}
.chk__probe-note {
  margin-top: 0.25rem;
  font-size: 0.74rem;
  color: var(--at-mute-2);
}

/* ── Verdict pill ─────────────────────────────────────────────────────────── */
.chk__verdict {
  flex: 0 0 auto;
  align-self: flex-start;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.18rem 0.44rem;
  border: 1px solid currentColor;
  line-height: 1;
}
.chk__verdict--lg { font-size: 0.68rem; padding: 0.28rem 0.55rem; align-self: center; }
.chk__verdict--pass { color: var(--at-teal-deep); }
.chk__verdict--warn { color: #8a6d1f; }
.chk__verdict--fail { color: #b3261e; }
.chk__verdict--na { color: var(--at-mute); }

/* ── Footer ───────────────────────────────────────────────────────────────── */
.chk__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1.1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--at-grid-line);
}
.chk__foot-hint { font-size: 0.75rem; color: var(--at-mute); word-break: break-all; }
.chk__foot-hint code { font-family: var(--at-mono); font-size: 0.95em; }

.chk__copy {
  flex: 0 0 auto;
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  background: none;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  transition: color 0.14s, border-color 0.14s;
}
.chk__copy:hover, .chk__copy--done { color: var(--at-teal-deep); border-color: var(--at-teal-deep); }

@media (max-width: 34rem) {
  .chk__form { flex-direction: column; }
}
</style>

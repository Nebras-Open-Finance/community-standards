<script setup lang="ts">
// Sandbox onboarding request — the one Jira form that is not behind Trust
// Framework SSO, because the people filling it in do not have an account yet
// (see src/data/jiraForms.ts). Built from
// supporting/design_handoff_sandbox_onboarding/. Field config and validation
// rules live in fields.ts, documents.ts and validators.ts.
//
// Submit validates every active field; when all pass it sends the request to
// standards-api (submit.ts), which raises a new Service Desk ticket with the
// documents attached, then shows the ticket and what was sent.

import { computed, nextTick, ref, shallowRef } from 'vue'
import './sandbox-onboarding.css'
import JiraFormSubmitBar from '../JiraFormSubmitBar.vue'
import SoContactFields from './SoContactFields.vue'
import SoDocumentUpload from './SoDocumentUpload.vue'
import SoErrorSummary from './SoErrorSummary.vue'
import SoOrgTypeCards from './SoOrgTypeCards.vue'
import SoRadioGroup from './SoRadioGroup.vue'
import SoSectionCard from './SoSectionCard.vue'
import SoTextField from './SoTextField.vue'
import { SECTIONS, blankValues, fieldDef, type Values } from './fields'
import { fileError, requiredDocs, totalSizeError, type DocDef, type DocKey } from './documents'
import {
  activeKeys, docsFor, labelFor, orgTypeOf, sectionKeys, validate, type FileErrors,
} from './validators'
import { buildSubmission, submitSandboxOnboarding, type RaisedRequest } from './submit'

const values = ref<Values>(blankValues())
// shallowRef: File objects must not be wrapped in reactive proxies.
const files = shallowRef<Partial<Record<DocKey, File>>>({})
const fileErrors = ref<FileErrors>({})
const touched = ref<Record<string, boolean>>({})
const attempted = ref(false)
const success = ref(false)
const submitting = ref(false)
const submitError = ref('')
const raised = ref<RaisedRequest | null>(null)

const YES_NO = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]

function check(key: string): string {
  return validate(key, values.value, files.value, fileErrors.value)
}
/** The error to show: after the field is touched, or for everything once submit was tried. */
function err(key: string): string {
  return attempted.value || touched.value[key] ? check(key) : ''
}
function set(key: string, value: string): void {
  values.value[key] = value
}
function touch(key: string): void {
  touched.value[key] = true
}
function choose(key: string, value: string): void {
  set(key, value)
  touch(key)
}

const orgType = computed(() => orgTypeOf(values.value))
const altNominated = computed(() => values.value.altNominate === 'yes')
const docs = computed(() => docsFor(values.value))
const docCounts = computed(() => ({
  LFI: requiredDocs('LFI', altNominated.value).length,
  TPP: requiredDocs('TPP', altNominated.value).length,
}))
const docsBadge = computed(() =>
  `${orgType.value} · ${docs.value.filter((d) => files.value[d.key]).length} of ${docs.value.length} uploaded`,
)

const sections = computed(() =>
  SECTIONS.map((s) => {
    const keys = sectionKeys(s.id, values.value)
    const complete = s.id === 'docs' && !orgType.value ? false : keys.every((k) => !check(k))
    const errored = !complete && keys.some((k) => err(k))
    return { ...s, complete, errored }
  }),
)
const doneCount = computed(() => sections.value.filter((s) => s.complete).length)

const errorItems = computed(() =>
  attempted.value
    ? activeKeys(values.value)
        .map((key) => ({ key, label: labelFor(key, values.value), message: check(key) }))
        .filter((i) => i.message)
    : [],
)

// ── Documents ───────────────────────────────────────────────────────────────
function selectFile(doc: DocDef, file: File): void {
  const others = docs.value.filter((d) => d.key !== doc.key).map((d) => files.value[d.key]).filter((f) => !!f)
  const e = fileError(doc, file) || totalSizeError(file, others)
  // A rejected file keeps any previously accepted one, with the error shown.
  if (!e) files.value = { ...files.value, [doc.key]: file }
  fileErrors.value = { ...fileErrors.value, [doc.key]: e }
  touch(`doc:${doc.key}`)
}
function removeFile(key: DocKey): void {
  const next = { ...files.value }
  delete next[key]
  files.value = next
  fileErrors.value = { ...fileErrors.value, [key]: '' }
}

// ── Navigation ──────────────────────────────────────────────────────────────
function scrollToEl(el: HTMLElement, offset: number): void {
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
}

function scrollToSection(id: string): void {
  const el = document.getElementById(`sec-${id}`)
  if (el) scrollToEl(el, 90)
}

/** Move focus to the control behind a key, as the error summary links do. */
function focusKey(key: string): void {
  let el: HTMLElement | null
  if (key.startsWith('doc:')) {
    const k = key.slice(4)
    el = document.getElementById(`d-${k}`) || document.getElementById(`dp-${k}`)
  } else if (['orgType', 'altNominate'].includes(key)) {
    const sel = values.value[key]
    el = (sel && document.getElementById(`r-${key}-${sel}`))
      || document.querySelector<HTMLElement>(`[id^="r-${key}-"]`)
  } else {
    el = document.getElementById(`f-${key}`)
  }
  if (!el) return
  scrollToEl(el, 140)
  el.focus({ preventScroll: true })
}

// ── Submit ──────────────────────────────────────────────────────────────────
async function onSubmit(): Promise<void> {
  if (submitting.value) return
  attempted.value = true
  submitError.value = ''
  if (activeKeys(values.value).some((k) => check(k))) {
    await nextTick()
    const summary = document.getElementById('error-summary')
    if (summary) {
      scrollToEl(summary, 100)
      summary.focus({ preventScroll: true })
    }
    return
  }

  submitting.value = true
  const result = await submitSandboxOnboarding(buildSubmission(values.value, docs.value, files.value))
  submitting.value = false
  if (!result.ok) {
    submitError.value = result.error
    await nextTick()
    document.getElementById('so-submit-error')?.focus()
    return
  }

  raised.value = result.request
  success.value = true
  await nextTick()
  window.scrollTo({ top: 0 })
  document.getElementById('so-success')?.focus({ preventScroll: true })
}

function reset(): void {
  values.value = blankValues()
  files.value = {}
  fileErrors.value = {}
  touched.value = {}
  attempted.value = false
  success.value = false
  submitError.value = ''
  raised.value = null
}

function startNew(): void {
  reset()
  window.scrollTo({ top: 0 })
}

// ── Review ──────────────────────────────────────────────────────────────────
function contactSummary(p: 'pbc' | 'alt'): string {
  const v = values.value
  return `${v[`${p}First`] || ''} ${v[`${p}Last`] || ''}\n`
    + `${v[`${p}Email`] || ''} · ${v[`${p}MobileCc`] || ''} ${v[`${p}Mobile`] || ''}\n`
    + `Emirates ID: ${v[`${p}Eid`] || ''}`
}

const reviewRows = computed(() => {
  const v = values.value
  return [
    { k: 'Your email', v: v.requesterEmail },
    { k: 'Organisation', v: v.orgName },
    { k: 'Type', v: orgType.value === 'LFI' ? 'LFI · Licensed Financial Institution' : 'TPP · Third Party Provider' },
    { k: 'Environment', v: 'Sandbox / Pre-Production' },
    { k: 'Address', v: [v.addr1, v.addr2, [v.city, v.postCode].filter(Boolean).join(' '), v.country].filter(Boolean).join('\n') },
    { k: 'Organisation Admin', v: contactSummary('pbc') },
    { k: 'Additional Organisation Admin', v: altNominated.value ? contactSummary('alt') : 'Not nominated' },
    {
      k: 'Documents',
      v: docs.value.map((d) => (files.value[d.key] ? `${d.title}: ${files.value[d.key]!.name}` : '')).filter(Boolean).join('\n'),
    },
  ]
})
</script>

<template>
  <div class="so">
    <template v-if="!success">
      <!-- Intro -->
      <div class="so-intro">
        <span class="so-eyebrow">Trust Framework · Onboarding request</span>
        <h1 class="so-intro__title">Sandbox onboarding</h1>
        <p class="so-intro__lede">
          Register your organisation on the Trust Framework for the Sandbox / Pre-Production
          environment. Have your organisation details, contact information and supporting
          documents ready before you start.
        </p>
        <div class="so-intro__meta">
          <span class="so-pill"><span class="so-pill__dot" aria-hidden="true" />Sandbox / Pre-Production</span>
          <span class="so-intro__req">Fields marked <span class="so-req">*</span> are required</span>
        </div>
      </div>

      <div class="so-body">
        <!-- Section rail -->
        <aside class="so-rail" aria-label="Form sections">
          <div class="so-rail__heading">On this form</div>
          <ol class="so-rail__list">
            <li v-for="s in sections" :key="s.id">
              <button
                type="button"
                class="so-rail__item"
                :class="{ 'is-complete': s.complete, 'is-errored': s.errored }"
                @click="scrollToSection(s.id)"
              >
                <span class="so-rail__num">{{ s.num }}</span>
                <span class="so-rail__title">{{ s.title }}</span>
                <span class="so-rail__dot" aria-hidden="true">{{ s.complete ? '✓' : s.errored ? '!' : '' }}</span>
                <span class="so-sr">{{ s.complete ? ', complete' : s.errored ? ', has errors' : ', incomplete' }}</span>
              </button>
            </li>
          </ol>
        </aside>

        <form class="so-form" novalidate @submit.prevent="onSubmit">
          <SoErrorSummary v-if="errorItems.length" :items="errorItems" @go="focusKey" />

          <!-- §01 -->
          <SoSectionCard id="org" num="01" title="Organisation" description="Who is raising the request, and the organisation being onboarded to the Sandbox.">
            <div class="so-grid">
              <SoTextField
                v-for="k in ['requesterEmail', 'orgName']"
                :key="k"
                :field-key="k"
                :def="fieldDef(k)"
                :model-value="values[k] || ''"
                :error="err(k)"
                @update:model-value="set(k, $event)"
                @blur="touch(k)"
              />
              <div class="so-group so-full">
                <span id="lbl-env" class="so-label">Environment</span>
                <div class="so-env" aria-labelledby="lbl-env" aria-readonly="true">
                  <span class="so-env__dot" aria-hidden="true" />Sandbox / Pre-Production
                </div>
              </div>
              <SoOrgTypeCards
                :model-value="values.orgType || ''"
                :doc-counts="docCounts"
                :error="err('orgType')"
                @update:model-value="choose('orgType', $event)"
              />
            </div>
          </SoSectionCard>

          <!-- §02 -->
          <SoSectionCard id="address" num="02" title="Registered address" description="Your organisation's registered business address.">
            <div class="so-grid so-grid--narrow">
              <SoTextField
                v-for="k in ['addr1', 'addr2', 'country', 'city', 'postCode']"
                :key="k"
                :field-key="k"
                :def="fieldDef(k)"
                :model-value="values[k] || ''"
                :error="err(k)"
                @update:model-value="set(k, $event)"
                @blur="touch(k)"
              />
            </div>
          </SoSectionCard>

          <!-- §03 -->
          <SoSectionCard id="pbc" num="03" title="Organisation Admin" description="The admin for your organisation on the Trust Framework.">
            <SoContactFields prefix="pbc" :values="values" :err="err" @set="set" @touch="touch" />
          </SoSectionCard>

          <!-- §04 -->
          <SoSectionCard id="alt" num="04" title="Additional Organisation Admin" description="Nominate a second Organisation Admin if you need one.">
            <SoRadioGroup
              name="altNominate"
              label="Nominate additional Organisation Admin?"
              required
              controls="alt-details"
              :options="YES_NO"
              :model-value="values.altNominate || ''"
              :error="err('altNominate')"
              @update:model-value="choose('altNominate', $event)"
            />
            <div v-if="altNominated" id="alt-details" class="so-alt">
              <h3 class="so-alt__title">Additional Organisation Admin Details</h3>
              <SoContactFields prefix="alt" :values="values" :err="err" @set="set" @touch="touch" />
            </div>
          </SoSectionCard>

          <!-- §05 -->
          <SoSectionCard id="docs" num="05" title="Supporting documents" description="Upload each document separately.">
            <template #badge>
              <span v-if="orgType" class="so-badge" aria-live="polite">{{ docsBadge }}</span>
            </template>

            <div v-if="!orgType" class="so-notype">
              <p class="so-notype__text">
                Choose an organisation type in section 02 to see which documents you need to upload.
              </p>
              <button type="button" class="so-btn so-btn--small" @click="focusKey('orgType')">Choose type</button>
            </div>

            <div v-else class="so-docs">
              <SoDocumentUpload
                v-for="(d, i) in docs"
                :key="d.key"
                :doc="d"
                :index="i"
                :file="files[d.key]"
                :error="err(`doc:${d.key}`) || fileErrors[d.key] || ''"
                @select="selectFile(d, $event)"
                @remove="removeFile(d.key)"
              />
            </div>
          </SoSectionCard>

          <div v-if="submitError" id="so-submit-error" class="so-submit-error" tabindex="-1" role="alert">
            <span class="so-err__icon" aria-hidden="true">!</span>{{ submitError }}
          </div>

          <!-- Action bar -->
          <JiraFormSubmitBar class="so-bar" :progress="doneCount / SECTIONS.length" :submitting="submitting">
            <strong>{{ doneCount }} of {{ SECTIONS.length }}</strong> sections complete
          </JiraFormSubmitBar>
        </form>
      </div>
    </template>

    <!-- Review (validation passed) -->
    <div v-else class="so-success">
      <div id="so-success" class="so-success__panel" tabindex="-1" role="status">
        <div class="so-success__head">
          <span class="so-success__tick" aria-hidden="true">✓</span>
          <div class="so-success__titles">
            <span class="so-eyebrow">Request submitted</span>
            <h1 class="so-success__title">
              <a v-if="raised?.url" :href="raised.url" target="_blank" rel="noopener">{{ raised.key }} ↗</a>
              <template v-else>{{ raised?.key }}</template>
            </h1>
          </div>
        </div>
        <p class="so-success__note">
          Your onboarding request has been raised in the Nebras Service Desk<template v-if="raised?.attached">,
            with your documents attached</template>.
          <template v-if="raised && !raised.attached">
            <strong>Your documents could not be attached</strong> — Nebras Support will ask you for them.
          </template>
          <template v-if="raised?.reporter === 'requester'">
            You can follow it on the Service Desk portal as <strong>{{ values.requesterEmail }}</strong>.
          </template>
          <template v-else>
            We will contact you at <strong>{{ values.requesterEmail }}</strong> about it.
          </template>
          Quote <strong>{{ raised?.key }}</strong> if you get in touch.
        </p>
        <dl class="so-review">
          <template v-for="r in reviewRows" :key="r.k">
            <dt>{{ r.k }}</dt>
            <dd>{{ r.v }}</dd>
          </template>
        </dl>
        <div class="so-success__actions">
          <button type="button" class="so-btn so-btn--primary" @click="startNew">Start a new request</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Intro ─────────────────────────────────────────────────────────────── */
.so-intro {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 760px;
  margin-bottom: 36px;
}
.so-intro__title {
  margin: 0;
  font-family: var(--at-serif);
  font-weight: 500;
  font-size: clamp(32px, 4.4vw, 46px);
  line-height: 1.08;
  letter-spacing: -0.015em;
  color: var(--so-ink);
  text-wrap: balance;
}
.so-intro__lede { margin: 0; font-size: 16px; line-height: 1.6; color: var(--so-muted); text-wrap: pretty; }
.so-intro__meta { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-top: 4px; }
.so-intro__req { font-size: 13px; color: var(--so-muted); }
.so-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--at-inverse-bg);
  color: var(--at-inverse-fg);
  font-size: 13px;
  font-weight: 500;
}
.so-pill__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--at-mint); }

/* ── Layout ────────────────────────────────────────────────────────────── */
.so-body { display: flex; gap: 48px; align-items: flex-start; }
.so-form {
  flex: 1;
  min-width: 0;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* ── Rail ──────────────────────────────────────────────────────────────── */
.so-rail {
  position: sticky;
  top: 100px;
  flex: 0 0 236px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
@media (max-width: 999px) {
  .so-rail { display: none; }
}
.so-rail__heading {
  font-family: var(--at-mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--so-muted);
}
.so-rail__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--so-line-2);
}
.so-rail__list > li { margin-left: -1px; }
.so-rail__item {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0 10px 16px;
  background: transparent;
  border: none;
  border-left: 2px solid transparent;
  cursor: pointer;
  text-align: left;
  font-family: var(--at-sans);
}
.so-rail__item:hover { background: rgba(0, 39, 127, 0.03); }
.so-rail__item:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }
.so-rail__item.is-complete { border-left-color: var(--at-teal); }
.so-rail__item.is-errored { border-left-color: var(--so-error); }
.so-rail__num { width: 20px; font-family: var(--at-mono); font-size: 11px; color: var(--so-hint); }
.so-rail__title { flex: 1; font-size: 14px; font-weight: 500; line-height: 1.3; color: var(--so-ink); }
.so-rail__dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  border: 1.5px solid var(--so-zone-line);
}
.so-rail__item.is-complete .so-rail__dot { background: var(--at-teal); border-color: var(--at-teal); }
.so-rail__item.is-errored .so-rail__dot { background: var(--so-error); border-color: var(--so-error); }

/* ── Section bits ──────────────────────────────────────────────────────── */
.so-env {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--at-bg-paper);
  border: 1px solid var(--so-line);
  font-size: 15px;
  font-weight: 500;
  color: var(--so-ink);
}
.so-env__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--at-teal); }

.so-alt {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 22px clamp(16px, 3vw, 24px) 24px;
  border-radius: 10px;
  background: var(--at-bg-cream);
  border: 1px solid var(--so-line);
  border-left: 3px solid var(--at-teal);
}
.so-alt__title { margin: 0; font-family: var(--at-sans); font-size: 15px; font-weight: 600; color: var(--so-ink); }

.so-badge {
  font-family: var(--at-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  background: rgba(0, 139, 228, 0.08);
  padding: 5px 10px;
  border-radius: 999px;
}
.so-notype {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 22px 24px;
  border-radius: 10px;
  background: var(--at-bg-paper);
  border: 1px dashed var(--so-input-line);
}
.so-notype__text { margin: 0; flex: 1 1 280px; font-size: 14px; line-height: 1.55; color: var(--so-muted); }
.so-docs { display: flex; flex-direction: column; gap: 16px; }

/* ── Action bar ────────────────────────────────────────────────────────── */
/* JiraFormSubmitBar, bled out to the page gutter. */
.so-bar { margin: 4px -24px 0; }

/* ── Review ────────────────────────────────────────────────────────────── */
.so-success { max-width: 760px; margin: 0 auto 80px; }
.so-success__panel {
  background: var(--at-surface);
  border: 1px solid var(--so-line);
  border-top: 3px solid var(--at-teal);
  border-radius: 10px;
  padding: clamp(24px, 4vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 22px;
  outline: none;
}
.so-success__head { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.so-success__tick {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--at-teal);
  color: #001738;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}
.so-success__titles { display: flex; flex-direction: column; gap: 4px; }
.so-success__title {
  margin: 0;
  font-family: var(--at-serif);
  font-weight: 500;
  font-size: clamp(28px, 3.6vw, 36px);
  letter-spacing: -0.01em;
  color: var(--so-ink);
}
.so-success__title a { color: inherit; text-underline-offset: 4px; }
.so-success__note { margin: 0; font-size: 15px; line-height: 1.6; color: var(--so-muted); }
.so-success__note strong { color: var(--so-ink); font-weight: 600; }

.so-submit-error {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 10px;
  background: var(--at-surface);
  border: 1px solid rgba(179, 38, 30, 0.3);
  border-left: 3px solid var(--so-error);
  font-size: 14px;
  font-weight: 500;
  color: var(--so-error);
  outline: none;
}
.so-success__actions { display: flex; gap: 10px; flex-wrap: wrap; }

.so-review {
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 180px) minmax(0, 1fr);
  border-top: 1px solid var(--so-line);
}
.so-review dt {
  padding: 12px 12px 12px 0;
  border-bottom: 1px solid var(--so-line);
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--so-hint);
}
.so-review dd {
  margin: 0;
  padding: 12px 0;
  border-bottom: 1px solid var(--so-line);
  font-size: 14px;
  color: var(--so-ink);
  overflow-wrap: anywhere;
  white-space: pre-line;
}
</style>

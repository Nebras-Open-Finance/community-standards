<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Nebras "Certificate of Commercial Go-Live" — shared between the LFI and TPP
// internal tools. Design ported from supporting/internal_helpers/certificate-handoff.
// The certificate is a fixed Letter-landscape sheet (11in × 8.5in = 1056 × 816px
// at 96dpi); on screen it is scaled to fit the column, and at print it renders at
// its true size and fills the page. Editable fields are contenteditable, so the
// typed signature renders directly in the script face.

const props = withDefaults(defineProps<{ variant?: 'lfi' | 'tpp' }>(), {
  variant: 'lfi',
})

const isLfi = computed(() => props.variant !== 'tpp')

// ── Variant copy ─────────────────────────────────────────────────────────────
const recipientPh = computed(() =>
  isLfi.value ? 'Licensed Financial Institution Name' : 'Third-Party Provider Name',
)

const declaration = computed(() =>
  isLfi.value
    ? 'a Licensed Financial Institution of the UAE Open Finance ecosystem, has satisfied all certification and live-proving requirements of the <b>AlTareq</b> trust framework, has <b>successfully exited TPP Buddying</b>, and is hereby authorised to operate commercially in production — opening its Open Finance services to <b>all authorised Third-Party Providers</b> and <b>all of its customers</b>.'
    : 'a Third-Party Provider of the UAE Open Finance ecosystem, has satisfied all onboarding and certification requirements of the <b>AlTareq</b> trust framework, has <b>successfully completed Production Proving with its buddy LFIs</b>, and is hereby authorised to operate commercially in production — connecting to <b>all authorised Licensed Financial Institutions</b> and serving <b>all of its customers</b>.',
)

// The certification gates the recipient has cleared. One centred column.
const gates = computed<string[]>(() =>
  isLfi.value
    ? ['Functional Certification', 'Consent & CX Conformance', 'Performance & Stress tested', 'Penetration Tested']
    : ['Functional Certification', 'Consent & CX Conformance', 'FAPI OIDF certified', 'Penetration Tested'],
)

const heroTitle = computed(() => (isLfi.value ? 'LFI go-live certificate' : 'TPP go-live certificate'))
const heroSub = computed(() =>
  isLfi.value
    ? 'Generate the Nebras-signed certificate confirming a Licensed Financial Institution has completed every AlTareq certification stage and exited TPP buddying — authorised to open its Open Finance services to all authorised TPPs and all of its customers. Fill in the highlighted fields, then save as PDF.'
    : 'Generate the Nebras-signed certificate confirming a Third-Party Provider has completed every AlTareq certification stage and Production Proving with its buddy LFIs — authorised to connect to all Licensed Financial Institutions and serve all of its customers. Fill in the highlighted fields, then save as PDF.',
)

// ── Fit-to-column scaling ────────────────────────────────────────────────────
const PAGE_W = 1056 // 11in @96dpi
const PAGE_H = 816 //  8.5in @96dpi
const rootEl = ref<HTMLElement>()
const scrollEl = ref<HTMLElement>()
const scale = ref(1)
let ro: ResizeObserver | undefined

function fit(): void {
  const avail = scrollEl.value?.clientWidth ?? PAGE_W
  scale.value = Math.min(avail / PAGE_W, 1)
}
const reservedHeight = computed(() => `${Math.round(PAGE_H * scale.value)}px`)

// ── Editable-field behaviour (date fill, placeholder, plain-text paste) ──────
function initFields(): void {
  const root = rootEl.value
  if (!root) return

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const d = new Date()
  const dateEl = root.querySelector<HTMLElement>('.dblock .sig')
  if (dateEl) dateEl.textContent = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`

  root.querySelectorAll<HTMLElement>('[contenteditable]').forEach((el) => {
    const check = (): void => { el.classList.toggle('ph', el.textContent?.trim() === '') }
    el.addEventListener('input', check)
    el.addEventListener('blur', () => { if (el.textContent?.trim() === '') el.innerHTML = ''; check() })
    el.addEventListener('paste', (e: ClipboardEvent) => {
      e.preventDefault()
      const t = (e.clipboardData?.getData('text') ?? '').replace(/\s+/g, ' ')
      document.execCommand('insertText', false, t)
    })
    el.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') { e.preventDefault(); el.blur() }
    })
  })
}

function clearFields(): void {
  rootEl.value?.querySelectorAll<HTMLElement>('.lfi, .sblock .sig').forEach((el) => {
    el.innerHTML = ''
    el.classList.add('ph')
  })
  rootEl.value?.querySelector<HTMLElement>('.lfi')?.focus()
}

function savePdf(): void {
  if (typeof window !== 'undefined') window.print()
}

onMounted(() => {
  fit()
  initFields()
  if (typeof ResizeObserver !== 'undefined' && scrollEl.value) {
    ro = new ResizeObserver(fit)
    ro.observe(scrollEl.value)
  }
  if (document.fonts?.ready) document.fonts.ready.then(fit)
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div ref="rootEl" class="cdoc">
    <!-- Hero (screen only) -->
    <section class="cdoc__hero cdoc-noprint">
      <div class="cdoc__hero-inner">
        <div class="cdoc__hero-label">
          <span class="cdoc__hero-dash" />
          Nebras &middot; UAE Open Finance
        </div>
        <h1 class="cdoc__hero-title">{{ heroTitle }}</h1>
        <p class="cdoc__hero-sub">{{ heroSub }}</p>
      </div>
    </section>

    <!-- Sticky action bar (screen only) -->
    <div class="cdoc__bar cdoc-noprint">
      <div class="cdoc__bar-inner">
        <span class="cdoc__live"><span class="cdoc__live-dot" />Live</span>
        <span class="cdoc__hint">
          Click any highlighted field to type. The signature name renders as a handwritten signature.
        </span>
        <div class="cdoc__bar-actions">
          <button type="button" @click="clearFields">Clear fields</button>
          <button type="button" class="pri" @click="savePdf">⎙ Save as PDF</button>
        </div>
      </div>
    </div>

    <!-- Scaled preview / print target -->
    <div class="cdoc__area cdoc-noprint-bg">
      <div ref="scrollEl" class="cdoc__scroll" :style="{ height: reservedHeight }">
        <div class="cdoc__stage" :style="{ transform: `scale(${scale})` }">
          <section id="cdoc-page" class="page">
            <div class="frame">
              <span class="wm">N</span>

              <div class="head">
                <div class="brand">
                  <span class="mark" />
                  <span>
                    <span class="bname">Nebras</span>
                    <span class="btag">Operator · UAE Open Finance</span>
                  </span>
                </div>
              </div>

              <div class="body">
                <div class="eyebrow"><s />Commercial Go-Live Authorisation<s /></div>
                <h1>Certificate of Commercial Go-Live</h1>

                <div class="conf">This is to certify that</div>
                <div class="lfi ph" contenteditable="true" :data-ph="recipientPh" />

                <p class="decl" v-html="declaration" />

                <div class="gate">
                  <div class="glist">
                    <div v-for="(g, i) in gates" :key="i" class="gi">
                      <span class="tick">✓</span>
                      <span class="gt">{{ g }}</span>
                    </div>
                  </div>
                </div>

                <div class="foot">
                <div class="sblock">
                  <div class="sig" contenteditable="true" data-ph="Type name to sign">Jonathan Holman</div>
                  <div class="srule" />
                  <div class="sname">Jonathan Holman</div>
                  <div class="srole">Chief Executive Officer · Nebras</div>
                </div>

                <div class="seal">
                  <s>Nebras</s>
                  <u>N</u>
                  <s>Go-Live</s>
                  <q>Authorised</q>
                </div>

                <div class="sblock dblock">
                  <div class="sig" contenteditable="true" data-ph="Date of issue">—</div>
                  <div class="srule" />
                  <div class="sname">Date of Issue</div>
                  <div class="srole">Effective from date of signature</div>
                </div>
              </div>
            </div>
          </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Self-contained brand tokens (ported from the handoff so the certificate is
   independent of the site theme). */
.cdoc {
  --navy: #00277F;
  --navy-deep: #001738;
  --blue: #008BE4;
  --teal: #00C2A9;
  --teal-deep: #008B78;
  --gold: #B37819;
  --cream: #FAFAF7;
  --ink: #1C1C18;
  --ink-soft: #55554E;
  --line: rgba(0, 39, 127, .14);
  --line-soft: rgba(0, 39, 127, .08);
  --serif: 'Fraunces', Georgia, serif;
  --sans: 'Poppins', system-ui, sans-serif;
  --mono: 'IBM Plex Mono', monospace;
  --script: 'Mrs Saint Delafield', cursive;
}

/* ── Hero (mirrors /policy) ───────────────────────────────────────────────── */
.cdoc__hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.cdoc__hero-inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 3.5rem 2rem 2.75rem;
}
.cdoc__hero-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--teal-deep);
  margin-bottom: 1.25rem;
}
.cdoc__hero-dash { width: 24px; height: 1px; background: currentColor; }
.cdoc__hero-title {
  font-family: var(--serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--navy-deep);
}
.cdoc__hero-sub {
  font-family: var(--sans);
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 1.4rem 0 0;
  max-width: 46rem;
  color: var(--ink-soft);
}

/* ── Sticky action bar (mirrors /policy filter) ───────────────────────────── */
.cdoc__bar {
  position: sticky;
  top: var(--at-header-height, 0);
  z-index: 30;
  background: var(--at-surface, #fff);
  border-bottom: 1px solid var(--at-grid-line);
}
.cdoc__bar-inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.cdoc__live {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex: none;
  padding: 0.5rem 0.85rem;
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--teal-deep);
  border: 1px solid var(--at-grid-line);
}
.cdoc__live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.18);
}
.cdoc__hint {
  font-family: var(--sans);
  font-size: 0.82rem;
  color: var(--ink-soft);
  line-height: 1.4;
}
.cdoc__bar-actions { margin-left: auto; display: flex; gap: 0.65rem; flex: none; }
.cdoc__bar button {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0.6rem 1.05rem;
  border: 1px solid var(--at-grid-line-2, var(--line));
  background: transparent;
  color: var(--navy);
  cursor: pointer;
  transition: all .15s;
  white-space: nowrap;
}
.cdoc__bar button:hover { border-color: var(--navy); }
.cdoc__bar button.pri { background: var(--navy-deep); border-color: var(--navy-deep); color: var(--at-bg-cream, #fff); }
.cdoc__bar button.pri:hover { background: var(--teal-deep); border-color: var(--teal-deep); }

/* ── Padded certificate area + scaler ─────────────────────────────────────── */
.cdoc__area {
  background: var(--at-bg-cream);
  padding: 2.75rem 2rem 4rem;
}
.cdoc__scroll {
  max-width: var(--at-page-max);
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.cdoc__stage {
  width: 1056px;
  height: 816px;
  flex: none;
  transform-origin: top center;
}

/* ── Page (Letter landscape) ──────────────────────────────────────────────── */
.page {
  position: relative;
  width: 1056px;
  height: 816px;
  background: #fff;
  padding: .42in;
  font-family: var(--sans);
  color: var(--ink);
  display: flex;
  box-shadow: 0 2px 18px rgba(20, 20, 19, .16);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.frame {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  padding: .44in .6in .5in;
  position: relative;
  overflow: hidden;
}
.frame::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 5px;
  background: linear-gradient(90deg, #00267E 0%, #00A2FB 46%, #00C2A9 86%);
}
.wm {
  position: absolute;
  right: -.34in;
  bottom: -.5in;
  font-family: var(--serif);
  font-weight: 700;
  font-size: 250px;
  line-height: 1;
  color: rgba(0, 39, 127, .028);
  letter-spacing: -.05em;
  pointer-events: none;
  user-select: none;
}

/* head */
.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 13px;
  border-bottom: 1px solid var(--line-soft);
}
.brand { display: flex; align-items: center; gap: 13px; }
.mark { width: 31px; height: 31px; flex: none; position: relative; background: var(--navy); }
.mark::after {
  content: '';
  position: absolute;
  inset: 7px;
  border: 2px solid var(--teal);
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.bname { font-family: var(--serif); font-size: 23px; font-weight: 600; letter-spacing: .015em; color: var(--navy-deep); line-height: 1; }
.btag { font-family: var(--mono); font-size: 7.6px; letter-spacing: .2em; text-transform: uppercase; color: var(--teal-deep); margin-top: 4px; display: block; }

/* body */
.body { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: .12in 0; }
.eyebrow { display: flex; align-items: center; gap: 11px; font-family: var(--mono); font-size: 8.8px; letter-spacing: .26em; text-transform: uppercase; color: var(--teal-deep); }
.eyebrow s { width: 26px; height: 1px; background: currentColor; text-decoration: none; }
.body h1 { font-family: var(--serif); font-weight: 600; font-size: 41px; line-height: 1.03; letter-spacing: -.028em; color: var(--navy-deep); margin-top: 11px; }
.conf { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--ink-soft); margin-top: 17px; }
.lfi {
  font-family: var(--serif);
  font-weight: 500;
  font-size: 37px;
  line-height: 1.14;
  letter-spacing: -.02em;
  color: var(--navy);
  margin-top: 7px;
  padding: 0 .1in 6px;
  border-bottom: 1.5px solid var(--teal);
  min-width: 5.4in;
  max-width: 8in;
}
.decl { font-size: 11.6px; line-height: 1.72; color: var(--ink-soft); max-width: 6.65in; margin-top: 14px; text-wrap: pretty; }
.decl :deep(b) { color: var(--navy-deep); font-weight: 600; }

/* completed certification gates — single centred column */
.gate { width: 100%; margin-top: .2in; display: flex; justify-content: center; }
.glist { display: flex; flex-direction: column; gap: 3px; }
.gi { display: flex; gap: 12px; align-items: center; padding: 5px 0; }
.tick { flex: none; width: 15px; height: 15px; border: 1px solid var(--teal); color: var(--teal-deep); font-size: 10px; line-height: 13px; text-align: center; }
.gt { font-family: var(--serif); font-size: 15px; font-weight: 500; color: var(--navy-deep); }

/* signature row */
.foot { display: grid; grid-template-columns: 1fr auto 1fr; gap: .5in; align-items: end; margin-top: .22in; padding-top: .18in; border-top: 1px solid var(--line-soft); width: 100%; }
.sblock { display: flex; flex-direction: column; }
.sig { font-family: var(--script); font-size: 40px; line-height: .95; color: var(--navy); min-height: 44px; padding: 0 4px 2px; white-space: nowrap; overflow: hidden; }
.srule { height: 1px; background: var(--navy); opacity: .42; margin-bottom: 6px; }
.sname { font-family: var(--serif); font-size: 14.5px; font-weight: 600; color: var(--navy-deep); line-height: 1.25; }
.srole { font-family: var(--mono); font-size: 8.2px; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-soft); margin-top: 3px; }
.dblock { text-align: right; }
.dblock .sig { font-family: var(--sans); font-size: 14px; font-weight: 500; color: var(--navy-deep); min-height: auto; padding-bottom: 5px; text-align: right; }

/* seal */
.seal { width: 1in; height: 1in; flex: none; border: 1px solid var(--line); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; position: relative; color: var(--navy); }
.seal::before { content: ''; position: absolute; inset: 4.5px; border: 1px solid var(--teal); opacity: .5; border-radius: 50%; }
.seal u { text-decoration: none; font-family: var(--serif); font-weight: 700; font-size: 27px; line-height: 1; letter-spacing: -.02em; }
.seal s { text-decoration: none; font-family: var(--mono); font-size: 5.9px; letter-spacing: .16em; text-transform: uppercase; color: var(--teal-deep); }
.seal q { quotes: none; font-family: var(--mono); font-size: 5.4px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-soft); margin-top: 1px; }

/* editable affordance (screen only) */
[contenteditable] { outline: none; transition: background .15s; }
[contenteditable]:hover { background: rgba(0, 194, 169, .075); }
[contenteditable]:focus { background: rgba(0, 194, 169, .11); }
[contenteditable]:empty::before,
[contenteditable].ph::before { content: attr(data-ph); color: #b9b8b0; font-style: normal; }
.lfi[contenteditable]:empty::before,
.lfi[contenteditable].ph::before { color: #c3c8d8; }

@media (max-width: 40rem) {
  .cdoc__bar { flex-direction: column; align-items: flex-start; }
  .cdoc__bar-actions { margin-left: 0; }
}
</style>

<!-- Global print rules: isolate the certificate on a Letter-landscape page. -->
<style>
@media print {
  @page { size: 11in 8.5in; margin: 0; }
  html, body { background: #fff !important; }
  body * { visibility: hidden !important; }
  #cdoc-page, #cdoc-page * { visibility: visible !important; }
  /* Neutralise the on-screen scaler so the fixed cert lands on the page box. */
  .cdoc__stage { transform: none !important; width: auto !important; height: auto !important; }
  .cdoc__scroll { height: auto !important; overflow: visible !important; background: #fff !important; }
  #cdoc-page {
    position: fixed !important;
    left: 0; top: 0;
    width: 11in !important;
    height: 8.5in !important;
    margin: 0 !important;
    box-shadow: none !important;
  }
  .cdoc-noprint { display: none !important; }
}
</style>

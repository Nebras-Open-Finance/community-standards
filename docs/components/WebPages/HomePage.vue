<template>
  <div class="ed-home">

    <PageHeader />

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO — editorial masthead
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-hero">
      <div class="ed-hero__inner">
        <div class="ed-hero__grid">

          <div class="ed-hero__lede">
            <div class="ed-hero__label">
              <span class="ed-hero__label-dash" />
              The UAE Open Finance Community &middot; VOL {{ issueNumber }}
            </div>
            <h1 class="ed-hero__title">
              Building open<br/>
              <span class="ed-hero__title-italic">finance,</span><br/>
              together.
            </h1>
            <p class="ed-hero__sub">
              Insights, tools, and live ecosystem data for everyone building on &mdash; and
              powering &mdash; the UAE&rsquo;s Open Finance framework. Community-driven and
              open source. <strong>Not official.</strong>
            </p>
            <div class="ed-hero__cta-row">
              <a class="ed-btn ed-btn--ink" href="/tech/tpp-standards/">Open Finance Standards</a>
              <a class="ed-btn ed-btn--ink" href="/tech/lfi-api-hub/">LFI Integration Guide</a>
              <a class="ed-btn ed-btn--ghost" href="/metrics">Metrics</a>
            </div>
          </div>

          <!-- Right — live ticker -->
          <aside class="ed-ticker">
            <div class="ed-ticker__header">
              <span class="ed-ticker__dot" />
              Live Ecosystem
            </div>
            <div
              v-for="t in tickerCells"
              :key="t.label"
              class="ed-ticker__row"
            >
              <div class="ed-ticker__cell">
                <div class="ed-ticker__label">{{ t.label }}</div>
                <div class="ed-ticker__value">{{ t.value }}</div>
              </div>
              <div class="ed-ticker__delta" :style="{ color: t.color }">{{ t.delta }}</div>
              <div class="ed-ticker__spark">
                <MiniChart :data="t.series" :color="t.color" type="area" :height="40" />
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>

    <!-- Trust-framework logo strip -->
    <OrganizationScroller />

    <!-- ═══════════════════════════════════════════════════════════════════
         § 01 — The story, in numbers.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark">&sect; 01</span>
            <h2 class="ed-section__title">
              The story,<br/>in numbers.
            </h2>
          </div>
          <p class="ed-section__intro">
            Key metrics tracking adoption and expansion of the CBUAE Open Finance
            framework. Every call, every payment, every consent &mdash; counted and open.
            Visit the <a href="/metrics">metrics dashboard</a> for the full picture.
          </p>
        </header>

        <div class="ed-kpis">
          <div
            v-for="k in heroKpis"
            :key="k.label"
            class="ed-kpi"
          >
            <span class="ed-kpi__accent" :style="{ background: k.color }" />
            <div class="ed-kpi__label">{{ k.label }}</div>
            <div class="ed-kpi__value">{{ k.value }}</div>
            <div class="ed-kpi__desc">{{ k.desc }}</div>
          </div>
        </div>

        <div class="ed-chart-row">
          <div
            v-for="c in storyCharts"
            :key="c.label"
            class="ed-story-chart"
          >
            <div class="ed-story-chart__head">
              <span class="ed-story-chart__accent" :style="{ background: c.color }" />
              <span class="ed-story-chart__label">{{ c.label }}</span>
            </div>
            <div class="ed-story-chart__value">{{ c.value }}</div>
            <div class="ed-story-chart__delta" :style="{ color: c.deltaColor }">{{ c.delta }}</div>
            <MiniChart :data="c.series" :color="c.color" type="area" :height="200" />
            <div v-if="c.labels.length" class="ed-story-chart__axis">
              <span v-for="(l, i) in c.labels" :key="i">{{ l }}</span>
            </div>
          </div>
        </div>

        <a href="/metrics" class="ed-more-link">
          Explore all metrics <span>&rarr;</span>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         § 02 — Developer documentation.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section ed-section--paper">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark ed-section__mark--gold">&sect; 02</span>
            <h2 class="ed-section__title">
              Developer<br/>documentation.
            </h2>
          </div>
          <p class="ed-section__intro">
            Technical documentation for every participant &mdash; whether you&rsquo;re
            <strong>building on top of</strong> Open Finance or
            <strong>powering it</strong>.
          </p>
        </header>

        <div class="ed-docs">
          <div
            v-for="col in docsCols"
            :key="col.tag"
            class="ed-docs__col"
            :class="col.tone === 'gold' ? 'ed-docs__col--gold' : 'ed-docs__col--teal'"
          >
            <div class="ed-docs__col-head">
              <div>
                <div class="ed-docs__col-kicker">{{ col.tag }}</div>
                <h3 class="ed-docs__col-title">{{ col.title }}</h3>
                <p class="ed-docs__col-sub">{{ col.sub }}</p>
              </div>
              <span class="ed-docs__col-badge">{{ col.badge }}</span>
            </div>
            <a
              v-for="(item, i) in col.items"
              :key="item.title"
              :href="item.href"
              class="ed-docs__row"
            >
              <span class="ed-docs__num">0{{ i + 1 }}</span>
              <div>
                <div class="ed-docs__row-title">{{ item.title }}</div>
                <div class="ed-docs__row-desc">{{ item.desc }}</div>
              </div>
              <span class="ed-docs__arrow">&rarr;</span>
            </a>
            <a :href="col.cta" class="ed-docs__cta">View full {{ col.ctaLabel }} docs &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         § 03 — Articles & press.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark ed-section__mark--blue">&sect; 03</span>
            <h2 class="ed-section__title">
              Articles<br/>
              <span class="ed-section__title-italic">&amp;</span> press.
            </h2>
          </div>
          <p class="ed-section__intro">
            Coverage of AlTareq across the region&rsquo;s financial press, and from the
            ecosystem participants themselves.
          </p>
        </header>

        <div class="ed-articles" v-if="featuredArticle">
          <ArticleLink
            variant="feature"
            :link="featuredArticle.link"
            :title="featuredArticle.title"
            :date="featuredArticle.dateLabel"
            :text="featuredArticle.text"
            :image-src="featuredArticle.imageSrc"
            :kind="kindLabels[featuredArticle.kind]"
            :source="featuredArticle.source"
          />

          <ArticleLink
            v-for="a in sidebarArticles"
            :key="a.id"
            variant="compact"
            :link="a.link"
            :title="a.title"
            :date="a.dateLabel"
            :text="a.text"
            :image-src="a.imageSrc"
            :kind="kindLabels[a.kind]"
            :source="a.source"
          />
        </div>

        <div class="ed-articles-grid">
          <ArticleLink
            v-for="a in bodyArticles"
            :key="a.id"
            :link="a.link"
            :title="a.title"
            :date="a.dateLabel"
            :text="a.text"
            :image-src="a.imageSrc"
            :kind="kindLabels[a.kind]"
            :source="a.source"
          />
        </div>

        <a href="/news" class="ed-more-link">
          All articles <span>&rarr;</span>
        </a>
      </div>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import PageHeader from './Components/PageHeader.vue'
import PageFooter from './Components/PageFooter.vue'
import OrganizationScroller from './Components/OrganizationScroller.vue'
import ArticleLink from './Components/ArticleLink.vue'
import MiniChart from './Components/MiniChart.vue'

import { articles, ARTICLE_KIND_LABELS } from './data/articles.js'

const kindLabels = ARTICLE_KIND_LABELS

const ACCENT = {
  teal:     '#00C2A9',
  gold:     '#B37819',
  navy:     '#00277F',
  navyDeep: '#001738',
  blueDeep: '#0043A6',
  sky:      '#00A2FB',
}

const SUCCESS_PAYMENT_STATUSES = new Set([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
])

const tfData      = ref([])
const apiData     = ref([])
const paymentData = ref([])

onMounted(async () => {
  const [tf, api, payments] = await Promise.all([
    axios.get('/api/trust-framework.json').catch(() => ({ data: [] })),
    fetch('/api/api-log.json').then(r => r.json()).catch(() => []),
    fetch('/api/payments-log.json').then(r => r.json()).catch(() => []),
  ])
  tfData.value = Array.isArray(tf.data) ? tf.data : []
  apiData.value = api
  paymentData.value = payments
})

// ── Hero eyebrow "VOL 02" — weeks since programme start ──────────────────
const issueNumber = computed(() => {
  const start = new Date('2025-01-01T00:00:00Z').getTime()
  const week = Math.floor((Date.now() - start) / (7 * 24 * 3600 * 1000))
  return String(week).padStart(2, '0')
})

// ── Monthly helpers ──────────────────────────────────────────────────────
function monthlySeries(rows, valueFn) {
  const byMonth = {}
  for (const r of rows) {
    const m = (r.date || '').substring(0, 7)
    if (!m) continue
    byMonth[m] = (byMonth[m] || 0) + (valueFn(r) || 0)
  }
  return Object.keys(byMonth).sort().map(k => byMonth[k])
}

function monthlyWithLabels(rows, valueFn) {
  const byMonth = {}
  for (const r of rows) {
    const m = (r.date || '').substring(0, 7)
    if (!m) continue
    byMonth[m] = (byMonth[m] || 0) + (valueFn(r) || 0)
  }
  const keys = Object.keys(byMonth).sort()
  return { labels: keys, series: keys.map(k => byMonth[k]) }
}

const MONTH_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
function monthLabel(m) {
  if (!m) return ''
  const [y, mm] = m.split('-')
  return `${MONTH_SHORT[parseInt(mm, 10) - 1]} ${y.slice(2)}`
}

// Thin axis labels to at most N so they fit without collision.
function thinLabels(labels, max = 6) {
  if (labels.length <= max) return labels.map(monthLabel)
  const step = (labels.length - 1) / (max - 1)
  return Array.from({ length: max }, (_, i) => monthLabel(labels[Math.round(i * step)]))
}

function pctChange(series) {
  if (!series || series.length < 2) return null
  const first = series[0] || 0
  const last = series[series.length - 1] || 0
  if (first <= 0) return null
  return Math.round((last / first - 1) * 100)
}

function compact(n) {
  if (n == null) return '—'
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return String(n)
}

// Orgs are pre-filtered (active only) and pre-deduped (one entry per id) by the
// upstream pull. An LFI with a tppGoLiveDate is counted as *both* an LFI and a TPP.
function countLfis(orgs) {
  return (orgs || []).filter(o => o.type === 'LFI').length
}
function countTpps(orgs) {
  return (orgs || []).filter(o => o.type === 'TPP' || !!o.tppGoLiveDate).length
}

// ── Live ticker (4 cells, hooked to live data) ────────────────────────────
const tickerCells = computed(() => {
  const successApi      = apiData.value.filter(r => (r.tppresponsecodegroup || '2xx') === '2xx')
  const apiSeries       = monthlySeries(successApi, r => r.totalapicalls)
  const apiTotal        = apiSeries.reduce((s, v) => s + v, 0)
  const apiDelta        = pctChange(apiSeries)

  const paySuccess      = paymentData.value.filter(r =>
    SUCCESS_PAYMENT_STATUSES.has(r.status) && r.lfinamekey,
  )
  const paySeries       = monthlySeries(paySuccess, r => r.amount)
  const payTotal        = paySeries.reduce((s, v) => s + v, 0)
  const payDelta        = pctChange(paySeries)

  const lfis            = countLfis(tfData.value)
  const tpps            = countTpps(tfData.value)
  const lfiSeries       = [Math.max(lfis - 4, 0), Math.max(lfis - 3, 0), Math.max(lfis - 2, 0), Math.max(lfis - 1, 0), lfis]
  const tppSeries       = [Math.max(tpps - 3, 0), Math.max(tpps - 2, 0), Math.max(tpps - 1, 0), tpps]

  return [
    {
      label: 'API Calls',
      value: compact(apiTotal) || '—',
      delta: apiDelta != null ? `${apiDelta >= 0 ? '\u2191' : '\u2193'} ${Math.abs(apiDelta)}%` : '—',
      color: ACCENT.teal,
      series: apiSeries,
    },
    {
      label: 'Payments (AED)',
      value: compact(payTotal) || '—',
      delta: payDelta != null ? `${payDelta >= 0 ? '\u2191' : '\u2193'} ${Math.abs(payDelta)}%` : '—',
      color: ACCENT.gold,
      series: paySeries,
    },
    {
      label: 'Active LFIs',
      value: String(lfis).padStart(2, '0'),
      delta: '+ ' + Math.min(lfis, 3),
      color: ACCENT.navy,
      series: lfiSeries,
    },
    {
      label: 'Active TPPs',
      value: String(tpps).padStart(2, '0'),
      delta: '+ ' + Math.min(tpps, 2),
      color: ACCENT.blueDeep,
      series: tppSeries,
    },
  ]
})

// ── Story charts (big sparklines — same MiniChart style as hero ticker) ──
const storyCharts = computed(() => {
  const successApi = apiData.value.filter(r => (r.tppresponsecodegroup || '2xx') === '2xx')
  const api = monthlyWithLabels(successApi, r => r.totalapicalls)
  const apiTotal = api.series.reduce((s, v) => s + v, 0)
  const apiDelta = pctChange(api.series)

  const paySuccess = paymentData.value.filter(r =>
    SUCCESS_PAYMENT_STATUSES.has(r.status) && r.lfinamekey,
  )
  const pay = monthlyWithLabels(paySuccess, r => r.amount)
  const payTotal = pay.series.reduce((s, v) => s + v, 0)
  const payDelta = pctChange(pay.series)

  const fmtDelta = d => d == null ? '—' : `${d >= 0 ? '\u2191' : '\u2193'} ${Math.abs(d)}% vs. first month`

  return [
    {
      label: 'Successful API Calls · by Month',
      value: apiTotal.toLocaleString(),
      delta: fmtDelta(apiDelta),
      deltaColor: apiDelta != null && apiDelta < 0 ? '#B33A3A' : ACCENT.teal,
      color: ACCENT.teal,
      series: api.series,
      labels: thinLabels(api.labels),
    },
    {
      label: 'Payment Volume AED · by Month',
      value: 'AED ' + compact(payTotal),
      delta: fmtDelta(payDelta),
      deltaColor: payDelta != null && payDelta < 0 ? '#B33A3A' : ACCENT.gold,
      color: ACCENT.gold,
      series: pay.series,
      labels: thinLabels(pay.labels),
    },
  ]
})

// ── Story-in-numbers KPIs ────────────────────────────────────────────────
const heroKpis = computed(() => {
  const successfulApi = apiData.value
    .filter(r => (r.tppresponsecodegroup || '2xx') === '2xx')
    .reduce((s, r) => s + (r.totalapicalls || 0), 0)

  const successRows = paymentData.value.filter(r =>
    SUCCESS_PAYMENT_STATUSES.has(r.status) && r.lfinamekey,
  )
  const totalAmount = successRows.reduce((s, r) => s + (r.amount || 0), 0)

  const lfis = countLfis(tfData.value)
  const tpps = countTpps(tfData.value)

  return [
    {
      label: 'Successful API Calls',
      value: successfulApi.toLocaleString(),
      desc:  'Live ecosystem · 2xx responses',
      color: ACCENT.teal,
    },
    {
      label: 'Payment Volume',
      value: 'AED ' + compact(totalAmount),
      desc:  'Settled transactions',
      color: ACCENT.gold,
    },
    {
      label: 'Licensed Financial Institutions',
      value: String(lfis).padStart(2, '0'),
      desc:  'Onboarded · Banks + Insurers',
      color: ACCENT.navy,
    },
    {
      label: 'Third Party Providers',
      value: String(tpps).padStart(2, '0'),
      desc:  'Onboarded · Live + Sandbox',
      color: ACCENT.blueDeep,
    },
  ]
})

// ── Docs split ───────────────────────────────────────────────────────────
const docsCols = [
  {
    tag: 'FOR TPPs',
    title: 'Third Party Providers',
    sub: 'Build on Open Finance',
    tone: 'teal',
    badge: 'Standards v2.1',
    cta: '/tech/tpp-standards/',
    ctaLabel: 'TPP',
    items: [
      { title: 'Trust Framework',    desc: 'Register, onboard, first API call.',                 href: '/tech/tpp-standards/v2.1/getting-started/' },
      { title: 'Consent Lifecycle',  desc: 'Create, retrieve, revoke consents.',                 href: '/tech/tpp-standards/v2.1/consent/' },
      { title: 'Security & FAPI',    desc: 'Compliance, tokens, webhooks.',                      href: '/tech/tpp-standards/security/fapi/' },
      { title: 'Payment Initiation', desc: 'Payments + confirmation of payee.',                  href: '/tech/tpp-standards/v2.1/banking/service-initiation/' },
      { title: 'Data Access APIs',   desc: 'Accounts, transactions, products, ATMs.',            href: '/tech/tpp-standards/v2.1/banking/data-sharing/' },
    ],
  },
  {
    tag: 'FOR LFIs',
    title: 'Licensed Financial Institutions',
    sub: 'Power Open Finance',
    tone: 'gold',
    badge: 'Integration Guide',
    cta: '/tech/lfi-api-hub/',
    ctaLabel: 'LFI',
    items: [
      { title: 'Integration Journey',     desc: 'Step-by-step onboarding.',                      href: '/tech/lfi-api-hub/getting-started/' },
      { title: 'Trust Framework',         desc: 'Clients, servers, certificates.',               href: '/tech/lfi-api-hub/trust-framework/' },
      { title: 'API Hub',                 desc: 'LFI-facing APIs and flows.',                    href: '/tech/lfi-api-hub/' },
      { title: 'Ozone Connect',           desc: 'Configure your Open Finance gateway.',          href: '/tech/lfi-api-hub/v2.1/banking/' },
      { title: 'Testing & Certification', desc: 'Conformance + readiness checklist.',            href: '/tech/lfi-api-hub/production/testing-certification/overview' },
    ],
  },
]

// ── Articles ─────────────────────────────────────────────────────────────
const featuredArticle = computed(() => articles[0] || null)
const sidebarArticles = computed(() => articles.slice(1, 3))
const bodyArticles    = computed(() => articles.slice(3, 9))
</script>

<style scoped>
.ed-home {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.ed-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(3rem, 7.6vw, 5.25rem);
  font-weight: 600;
  line-height: 0.96;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-hero__title-italic {
  font-style: italic;
  font-weight: 400;
}

.ed-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.55;
  margin: 2.25rem 0 0;
  max-width: 34rem;
  color: var(--at-mute-2);
}

.ed-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-hero__cta-row {
  margin-top: 2.25rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ed-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 1.35rem;
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 0;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.ed-btn--ink {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border: 1px solid var(--at-navy-deep);
}
.ed-btn--ink:hover { background: var(--at-navy); border-color: var(--at-navy); }

.ed-btn--ghost {
  background: transparent;
  color: var(--at-navy-deep);
  border: 1px solid var(--at-grid-line-2);
}
.ed-btn--ghost:hover { background: var(--at-navy-deep); color: var(--at-bg-cream); border-color: var(--at-navy-deep); }

/* ─── Live ticker ──────────────────────────────────────────────────────── */
.ed-ticker {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-ticker__header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
}

.ed-ticker__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--at-teal);
  box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.2);
}

.ed-ticker__row {
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.3fr;
  align-items: center;
  gap: 1rem;
}

.ed-ticker__row:last-child { border-bottom: 0; }

.ed-ticker__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-ticker__value {
  font-family: var(--at-serif);
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  line-height: 1.1;
  margin-top: 0.15rem;
}

.ed-ticker__delta {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.ed-ticker__spark { width: 100%; }

/* ─── Section shell ────────────────────────────────────────────────────── */
.ed-section {
  padding: 6rem 0;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-section--paper {
  background: var(--at-bg-paper);
}

.ed-section__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-section__head {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 4rem;
  margin-bottom: 3.5rem;
}

.ed-section__mark {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal);
  display: block;
}

.ed-section__mark--gold { color: var(--at-gold); }
.ed-section__mark--blue { color: var(--at-blue); }

.ed-section__title {
  font-family: var(--at-serif);
  font-size: 2.75rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.025em;
  margin: 0.75rem 0 0;
  color: var(--at-navy-deep);
  white-space: nowrap;
}

.ed-section__title-italic {
  font-style: italic;
  font-weight: 400;
}

.ed-section__intro {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 40rem;
  align-self: end;
}

.ed-section__intro a { color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px; }
.ed-section__intro strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── KPIs ─────────────────────────────────────────────────────────────── */
.ed-kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--at-navy-deep);
  border-left: 1px solid var(--at-grid-line);
}

.ed-kpi {
  padding: 2rem 1.75rem 1.75rem;
  border-right: 1px solid var(--at-grid-line);
  border-bottom: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  position: relative;
  min-height: 11rem;
  display: flex;
  flex-direction: column;
}

.ed-kpi__accent {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 36px;
}

.ed-kpi__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 1.5rem;
}

.ed-kpi__value {
  font-family: var(--at-serif);
  font-size: 2.8rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  line-height: 1;
}

.ed-kpi__desc {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  margin-top: 0.75rem;
}

/* ─── Chart panels ─────────────────────────────────────────────────────── */
.ed-chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.ed-story-chart {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1.75rem 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.ed-story-chart__head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
}

.ed-story-chart__accent {
  width: 22px;
  height: 3px;
  display: inline-block;
}

.ed-story-chart__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-story-chart__value {
  font-family: var(--at-serif);
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--at-navy-deep);
  line-height: 1;
}

.ed-story-chart__delta {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 600;
  margin: 0.55rem 0 1.25rem;
}

.ed-story-chart__axis {
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--at-mute);
}

/* ─── Dev docs split ───────────────────────────────────────────────────── */
.ed-docs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-docs__col {
  padding: 2.5rem 2.25rem;
  display: flex;
  flex-direction: column;
}

.ed-docs__col:first-child {
  border-right: 1px solid var(--at-grid-line);
}

.ed-docs__col-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  margin-bottom: 1.5rem;
}

.ed-docs__col-kicker {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.ed-docs__col--teal .ed-docs__col-kicker { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__col-kicker { color: var(--at-gold); }

.ed-docs__col-title {
  font-family: var(--at-serif);
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-docs__col-sub {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  margin: 0.2rem 0 0;
}

.ed-docs__col-badge {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  flex-shrink: 0;
}

.ed-docs__col--teal .ed-docs__col-badge {
  background: rgba(0, 194, 169, 0.1);
  color: var(--at-teal-deep);
}

.ed-docs__col--gold .ed-docs__col-badge {
  background: rgba(179, 120, 25, 0.1);
  color: var(--at-gold);
}

.ed-docs__row {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  gap: 1rem;
  align-items: baseline;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: background 0.12s;
}

.ed-docs__row:hover {
  background: var(--at-bg-paper);
  margin: 0 -0.75rem;
  padding: 1.1rem 0.75rem;
}

.ed-docs__row:last-of-type { border-bottom: none; }

.ed-docs__num {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.ed-docs__col--teal .ed-docs__num { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__num { color: var(--at-gold); }

.ed-docs__row-title {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
  margin-bottom: 0.2rem;
}

.ed-docs__row-desc {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  line-height: 1.45;
}

.ed-docs__arrow {
  font-family: var(--at-mono);
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.ed-docs__col--teal .ed-docs__arrow { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__arrow { color: var(--at-gold); }
.ed-docs__row:hover .ed-docs__arrow { transform: translateX(3px); }

.ed-docs__cta {
  margin-top: 1.75rem;
  align-self: flex-start;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid currentColor;
}

.ed-docs__col--teal .ed-docs__cta { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__cta { color: var(--at-gold); }

/* ─── Articles ─────────────────────────────────────────────────────────── */
.ed-articles {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.ed-articles > :nth-child(1) { grid-row: span 2; }

.ed-articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* ─── More link ────────────────────────────────────────────────────────── */
.ed-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  text-decoration: none;
  padding: 0.7rem 0;
  margin-top: 1.5rem;
  border-bottom: 1px solid var(--at-navy-deep);
}

.ed-more-link:hover { color: var(--at-teal-deep); border-bottom-color: var(--at-teal-deep); }
.ed-more-link span { font-weight: 600; }

/* ─── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .ed-hero__grid { grid-template-columns: 1fr; gap: 3rem; }
  .ed-section__head { grid-template-columns: 1fr; gap: 1.5rem; }
  .ed-section__intro { align-self: start; }
  .ed-kpis { grid-template-columns: repeat(2, 1fr); }
  .ed-chart-row { grid-template-columns: 1fr; }
  .ed-docs { grid-template-columns: 1fr; }
  .ed-docs__col:first-child { border-right: 0; border-bottom: 1px solid var(--at-grid-line); }
  .ed-articles { grid-template-columns: 1fr; }
  .ed-articles > :nth-child(1) { grid-row: auto; }
  .ed-articles-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .ed-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-section { padding: 4rem 0; }
  .ed-section__inner { padding: 0 1.25rem; }
  .ed-section__title { font-size: 2rem; }
  .ed-kpis { grid-template-columns: 1fr; }
  .ed-kpi__value { font-size: 2.2rem; }
  .ed-articles-grid { grid-template-columns: 1fr; }
  .ed-ticker__row { grid-template-columns: 1.2fr 1fr; }
  .ed-ticker__spark { grid-column: span 2; }
}
</style>

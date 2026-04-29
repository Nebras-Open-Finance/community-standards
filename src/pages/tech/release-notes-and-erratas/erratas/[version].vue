<route lang="yaml">
meta:
  title: Erratas
</route>

<template>
  <div v-if="!versionExists" class="ed-er ed-er--missing">
    <section class="ed-er-hero">
      <div class="ed-er-hero__inner">
        <div class="ed-er-hero__label">
          <span class="ed-er-hero__label-dash" />
          Errata version not found
        </div>
        <h1 class="ed-er-hero__title">No errata register for &ldquo;{{ versionParam }}&rdquo;</h1>
        <p class="ed-er-hero__sub">
          The Errata register only exists for published versions that have received
          corrections. Try one of: {{ availableVersionsLabel }}.
        </p>
        <p class="ed-er-hero__sub">
          <router-link to="/tech/release-notes-and-erratas/erratas/" class="ed-er-back">
            &larr; Back to current Erratas
          </router-link>
        </p>
      </div>
    </section>
  </div>

  <div v-else class="ed-er">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-er-hero">
      <div class="ed-er-hero__inner">
        <div class="ed-er-hero__label">
          <span class="ed-er-hero__label-dash" />
          Post-publication corrections &middot; {{ version }}
        </div>
        <h1 class="ed-er-hero__title">Erratas</h1>
        <p class="ed-er-hero__sub">
          The authoritative register of corrections to <strong>published documentation</strong>
          against <strong>{{ version }}</strong> &mdash; the TPP Standards, LFI Integration
          Guide, and OpenAPI specifications. Each entry records what was corrected, why
          the change was required, and the effective date.
        </p>

        <div class="ed-er-stats">
          <div class="ed-er-stat">
            <span class="ed-er-stat__num">{{ versionSections.length }}</span>
            <span class="ed-er-stat__label">corrections</span>
          </div>
          <div class="ed-er-stat">
            <span class="ed-er-stat__num">{{ errataIds.length }}</span>
            <span class="ed-er-stat__label">errata {{ errataIds.length === 1 ? 'release' : 'releases' }}</span>
          </div>
          <div class="ed-er-stat">
            <span class="ed-er-stat__num">{{ specCount }}</span>
            <span class="ed-er-stat__label">specs touched</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FACETED SEARCH + RESULTS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-er-search">
      <div class="ed-er-search__inner">

        <div class="ed-er-search__head">
          <div class="ed-er-search__eyebrow">
            <span class="ed-er-search__eyebrow-dash" />
            Filter the register
          </div>
          <h2 class="ed-er-search__title">Find a correction</h2>
          <p class="ed-er-search__lede">
            Narrow by <strong>audience</strong>, <strong>functional area</strong>, or
            <strong>section</strong>. Add a keyword to refine further. Click a section
            chip on a result row to open the page the correction applies to.
          </p>
        </div>

        <!-- Audience facet -->
        <div class="ed-er-facet">
          <div class="ed-er-facet__label">Audience</div>
          <div class="ed-er-facet__pills">
            <button
              v-for="opt in AUDIENCE_OPTIONS"
              :key="opt"
              type="button"
              class="ed-er-pill"
              :class="{
                'ed-er-pill--active': audienceFilter === opt,
                'ed-er-pill--disabled': audienceCount(opt) === 0,
              }"
              :disabled="audienceCount(opt) === 0 && audienceFilter !== opt"
              @click="toggleAudience(opt)"
            >
              <span class="ed-er-pill__text">{{ opt }}</span>
              <span class="ed-er-pill__count">{{ audienceCount(opt) }}</span>
            </button>
          </div>
        </div>

        <!-- Functional area facet -->
        <div class="ed-er-facet">
          <div class="ed-er-facet__label">Functional area</div>
          <div class="ed-er-facet__pills">
            <button
              v-for="area in availableAreas"
              :key="area"
              type="button"
              class="ed-er-pill"
              :class="{
                'ed-er-pill--active': areaFilter.has(area),
                'ed-er-pill--disabled': areaCount(area) === 0,
              }"
              :disabled="areaCount(area) === 0 && !areaFilter.has(area)"
              @click="toggleArea(area)"
            >
              <span class="ed-er-pill__text">{{ area }}</span>
              <span class="ed-er-pill__count">{{ areaCount(area) }}</span>
            </button>
          </div>
        </div>

        <!-- Section facet -->
        <div class="ed-er-facet">
          <div class="ed-er-facet__label">Section</div>
          <div class="ed-er-facet__pills">
            <button
              v-for="sec in availableSections"
              :key="sec.label"
              type="button"
              class="ed-er-pill"
              :class="{
                'ed-er-pill--active': sectionFilter.has(sec.label),
                'ed-er-pill--disabled': sectionPillCount(sec.label) === 0,
              }"
              :disabled="sectionPillCount(sec.label) === 0 && !sectionFilter.has(sec.label)"
              @click="toggleSection(sec.label)"
            >
              <span class="ed-er-pill__text">{{ sec.label }}</span>
              <span class="ed-er-pill__count">{{ sectionPillCount(sec.label) }}</span>
            </button>
          </div>
        </div>

        <!-- Keyword facet -->
        <div class="ed-er-facet ed-er-facet--keyword">
          <div class="ed-er-facet__label">Keyword</div>
          <div class="ed-er-input">
            <svg class="ed-er-input__icon" xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref="searchInput"
              v-model="query"
              type="search"
              class="ed-er-input__field"
              placeholder="Search title, summary, schema name, endpoint, or rationale"
              autocomplete="off"
              spellcheck="false"
            />
            <button
              v-if="query"
              class="ed-er-input__clear"
              type="button"
              aria-label="Clear keyword"
              @click="query = ''"
            >&times;</button>
          </div>
        </div>

        <!-- Meter -->
        <div class="ed-er-meter">
          <span class="ed-er-meter__count">
            <strong>{{ filteredSections.length }}</strong>
            of {{ versionSections.length }}
            {{ versionSections.length === 1 ? 'section' : 'sections' }}
          </span>
          <button
            v-if="anyFilterActive"
            type="button"
            class="ed-er-meter__reset"
            @click="resetFilters"
          >Reset filters &times;</button>
        </div>

        <!-- Results -->
        <div v-if="filteredSections.length === 0" class="ed-er-empty">
          <div class="ed-er-empty__title">No corrections match the current filters</div>
          <p class="ed-er-empty__body">
            Try removing a filter or clearing the keyword. The pill counts above show how
            many sections each filter would surface on its own.
          </p>
          <button class="ed-er-empty__btn" @click="resetFilters">Reset filters</button>
        </div>

        <div v-else class="ed-er-groups">
          <div
            v-for="group in groupedResults"
            :key="group.errataId"
            class="ed-er-group"
          >
            <div class="ed-er-group__head">
              <div class="ed-er-group__id">{{ group.errataId }}</div>
              <div class="ed-er-group__count">
                {{ group.sections.length }} {{ group.sections.length === 1 ? 'correction' : 'corrections' }}
              </div>
            </div>

            <article
              v-for="s in group.sections"
              :id="anchorFor(s)"
              :key="s.number"
              class="ed-er-row"
            >
              <div class="ed-er-row__num">&sect;{{ s.number }}</div>

              <div class="ed-er-row__body">
                <a
                  :href="errataPageUrl(s)"
                  class="ed-er-row__title-link"
                >
                  <span class="ed-er-row__title" v-html="highlight(s.title)" />
                </a>
                <div class="ed-er-row__summary" v-html="highlight(s.summary)" />

                <div class="ed-er-row__chips">
                  <a
                    v-for="sec in sectionsForErrata(s)"
                    :key="`sec-${sec.label}`"
                    :href="sec.path"
                    class="ed-er-chip ed-er-chip--sec"
                    :title="`Open ${sec.label}`"
                  >{{ sec.label }} &rarr;</a>

                  <button
                    v-for="ep in s.endpoints || []"
                    :key="`ep-${ep.label}`"
                    class="ed-er-chip ed-er-chip--ep"
                    type="button"
                    :title="`Search keyword: ${ep.label}`"
                    @click="setQuery(ep.label)"
                  >{{ ep.label }}</button>

                  <button
                    v-for="schema in s.schemas || []"
                    :key="`sc-${schema}`"
                    class="ed-er-chip ed-er-chip--sc"
                    type="button"
                    :title="`Search keyword: ${schema}`"
                    @click="setQuery(schema)"
                  >{{ schema }}</button>
                </div>
              </div>

              <a
                :href="errataPageUrl(s)"
                class="ed-er-row__arrow-link"
                :aria-label="`View errata details for §${s.number}`"
              >&rarr;</a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         OPERATING RULES + POLICY REFERENCE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-er-ref">
      <div class="ed-er-ref__inner">

        <div class="ed-er-ref__head">
          <div class="ed-er-ref__eyebrow">
            <span class="ed-er-ref__eyebrow-dash" />
            Governance
          </div>
          <h2 class="ed-er-ref__title">How this register works</h2>
          <p class="ed-er-ref__lede">
            The Errata register is bound by the policies that control how published
            content evolves. Once a version is published, its existing content
            <strong>MUST NOT</strong> be changed without an associated Errata record.
          </p>
        </div>

        <div class="ed-er-ref__grid">
          <a href="/policy/changes-to-published-content" class="ed-er-ref__tile">
            <div class="ed-er-ref__tile-meta">
              <span class="ed-er-ref__tile-meta-dash" />
              Policy
            </div>
            <h3 class="ed-er-ref__tile-title">Changes to Published Documentation</h3>
            <p class="ed-er-ref__tile-body">
              How published content may change after release &mdash; what requires an
              Errata, what does not, and how corrections are communicated.
            </p>
            <div class="ed-er-ref__tile-foot">
              <span class="ed-er-ref__tile-cta">Read policy</span>
              <span class="ed-er-ref__tile-arrow">&rarr;</span>
            </div>
          </a>

          <a href="/policy/version-management" class="ed-er-ref__tile">
            <div class="ed-er-ref__tile-meta">
              <span class="ed-er-ref__tile-meta-dash" />
              Policy
            </div>
            <h3 class="ed-er-ref__tile-title">Version Management</h3>
            <p class="ed-er-ref__tile-body">
              How versions are numbered, when errata releases are cut, and how the
              relationship between Standards, API Hub, and Ozone Connect versions is
              maintained.
            </p>
            <div class="ed-er-ref__tile-foot">
              <span class="ed-er-ref__tile-cta">Read policy</span>
              <span class="ed-er-ref__tile-arrow">&rarr;</span>
            </div>
          </a>
        </div>

        <div class="ed-er-rules">
          <div class="ed-er-rules__label">Operating rules</div>
          <ul class="ed-er-rules__list">
            <li>
              Each entry has a unique identifier in the form
              <code>&lt;version&gt;-errata&lt;n&gt;</code> &mdash; for example,
              <code>v2.1-errata1</code>.
            </li>
            <li>
              Each entry states the affected document(s) and section(s), what changed,
              why the change was required, and the effective date.
            </li>
            <li>
              Existing published content <strong>MUST NOT</strong> be changed without an
              associated Errata record.
            </li>
            <li>
              Pre-publication content (for example <code>-rc</code>,
              <code>-rc-final</code>) can be updated without an Errata.
            </li>
          </ul>
        </div>

        <div class="ed-er-cross">
          For changes to <strong>operational systems</strong> rather than documentation,
          see the Release Notes for
          <a :href="`/tech/release-notes-and-erratas/release-notes/api-hub/${latestApiHubYear}`">API Hub</a>
          or
          <a :href="`/tech/release-notes-and-erratas/release-notes/trust-framework/${latestTrustFrameworkYear}`">Trust Framework</a>.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ERRATA_SECTIONS,
  anchorFor,
  errataPageUrl,
  errataVersions,
  type ErrataSection,
} from '@/data/erratas-registry'
import {
  latestApiHubYear,
  latestTrustFrameworkYear,
} from '@/data/release-notes-years'

// ── Route → version param ────────────────────────────────────────────────
const route = useRoute()
const versionParam = computed(() => {
  const raw = route.params.version
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw) && typeof raw[0] === 'string') return raw[0]
  return ''
})

const versionExists = computed(() => errataVersions.includes(versionParam.value))
const version = computed(() => versionParam.value)

const availableVersionsLabel = computed(() => errataVersions.join(', '))

// ─── Facet derivation ─────────────────────────────────────────────────────
type Audience = 'TPP' | 'LFI'
const AUDIENCE_OPTIONS: readonly Audience[] = ['TPP', 'LFI'] as const

const SPEC_AREA: Record<string, string> = {
  'uae-account-information-openapi': 'Data Sharing',
  'uae-authorization-endpoints-openapi': 'Tokens & Authorization',
  'uae-confirmation-of-payee-openapi': 'Confirmation of Payee',
  'uae-fx-service-initiation-openapi': 'Service Initiation',
  'uae-webhook-template-openapi': 'Webhooks',
  'uae-api-hub-consent-manager-openapi': 'Consent Management',
  'uae-ozone-connect-bank-service-initiation-openapi': 'Service Initiation',
  'uae-ozone-connect-consent-events-actions-openapi': 'Consent Events',
  'uae-ozone-connect-user-operations-openapi': 'User Operations',
  'uae-ozone-connect-health-check-openapi': 'Health Check',
}

function specsOf(s: ErrataSection): string[] {
  if (s.specs && s.specs.length) return s.specs
  if (s.spec) return [s.spec]
  return []
}

function audienceOf(s: ErrataSection): Audience | 'Both' {
  const specs = specsOf(s)
  if (specs.length === 0) return 'TPP'
  let hasLfi = false
  let hasTpp = false
  for (const sp of specs) {
    if (sp.startsWith('uae-ozone-connect-') || sp.startsWith('uae-api-hub-')) hasLfi = true
    else hasTpp = true
  }
  if (hasLfi && hasTpp) return 'Both'
  return hasLfi ? 'LFI' : 'TPP'
}

function areasOf(s: ErrataSection): string[] {
  const out = new Set<string>()
  for (const sp of specsOf(s)) {
    const area = SPEC_AREA[sp]
    if (area) out.add(area)
  }
  return [...out]
}

// ─── Section derivation from affectedPaths ────────────────────────────────
const SEGMENT_LABELS: Record<string, string> = {
  'consent': 'Consent',
  'banking': 'Banking',
  'data-sharing': 'Data Sharing',
  'confirmation-of-payee': 'Confirmation of Payee',
  'service-initiation': 'Service Initiation',
  'webhooks': 'Webhooks',
  'consent-status': 'Consent Status',
  'payment-status': 'Payment Status',
  'security': 'Security',
  'tokens': 'Tokens',
  'api-hub': 'API Hub',
  'consent-manager': 'Consent Manager',
  'consent-events': 'Consent Events',
  'health-check': 'Health Check',
  'atms': 'ATMs',
  'products-leads': 'Products & Leads',
  'registration': 'Registration',
  'trust-framework': 'Trust Framework',
}

function prettifySegment(seg: string): string {
  if (SEGMENT_LABELS[seg]) return SEGMENT_LABELS[seg]
  return seg.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function endpointLabelMap(s: ErrataSection): Map<string, string> {
  const map = new Map<string, string>()
  for (const ep of s.endpoints || []) {
    const trailing = ep.path.split('/').pop()
    if (trailing) map.set(trailing, ep.label)
  }
  return map
}

interface ParsedAffectedPath { label: string; path: string }

function parseAffectedPath(path: string, epLabels: Map<string, string>): ParsedAffectedPath | null {
  const m = path.match(/^\/tech\/(tpp-standards|lfi-api-hub)\/(.+)$/)
  if (!m || !m[1] || !m[2]) return null
  const audience = m[1] === 'tpp-standards' ? 'TPP' : 'LFI'
  let segments = m[2].split('/').filter(Boolean)
  if (segments[0] && /^v\d+(?:\.\d+)*$/.test(segments[0])) segments = segments.slice(1)

  const oaIdx = segments.indexOf('open-api')
  let areaSegments: string[]
  let endpointSlug: string | undefined
  if (oaIdx === -1) {
    areaSegments = segments.slice(0, -1)
    endpointSlug = segments[segments.length - 1]
  } else {
    areaSegments = segments.slice(0, oaIdx)
    endpointSlug = segments.slice(oaIdx + 1).join('/')
  }

  const area = areaSegments.map(prettifySegment).join(' · ')
  const endpointLabel = endpointSlug ? (epLabels.get(endpointSlug) || endpointSlug) : null
  const labelParts = [audience, area, endpointLabel].filter((p): p is string => Boolean(p))
  return { label: labelParts.join(' · '), path }
}

function sectionsForErrata(s: ErrataSection): ParsedAffectedPath[] {
  const epLabels = endpointLabelMap(s)
  const seen = new Set<string>()
  const out: ParsedAffectedPath[] = []
  for (const p of s.affectedPaths || []) {
    const parsed = parseAffectedPath(p, epLabels)
    if (!parsed) continue
    if (seen.has(parsed.label)) continue
    seen.add(parsed.label)
    out.push(parsed)
  }
  return out
}

function haystack(s: ErrataSection): string {
  const parts: string[] = [
    s.title,
    s.summary,
    s.description,
    s.rationale,
    s.errataId,
    ...specsOf(s),
    ...sectionsForErrata(s).map((sec) => sec.label),
    ...(s.schemas || []),
    ...(s.endpoints || []).flatMap((e) => [e.label, e.path]),
    ...(s.githubSources || []).map((g) => g.label),
    ...(s.relatedStandards || []).map((r) => r.label),
  ]
  return parts.join(' \n ').toLowerCase()
}

// ─── State ────────────────────────────────────────────────────────────────
const query = ref<string>('')
const audienceFilter = ref<Audience | null>(null)
const areaFilter = reactive<Set<string>>(new Set<string>())
const sectionFilter = reactive<Set<string>>(new Set<string>())
const searchInput = ref<HTMLInputElement | null>(null)

// ─── Base set & top-line stats ────────────────────────────────────────────
const versionSections = computed<ErrataSection[]>(() =>
  ERRATA_SECTIONS
    .filter((s) => s.version === version.value)
    .slice()
    .sort((a, b) => {
      if (a.errataId !== b.errataId) return a.errataId.localeCompare(b.errataId)
      return a.number - b.number
    }),
)

const errataIds = computed<string[]>(() => {
  const seen = new Set<string>()
  for (const s of versionSections.value) seen.add(s.errataId)
  return [...seen].sort()
})

const specCount = computed<number>(() => {
  const seen = new Set<string>()
  for (const s of versionSections.value) {
    for (const sp of specsOf(s)) seen.add(sp)
  }
  return seen.size
})

// ─── Filter predicates ────────────────────────────────────────────────────
function matchesAudience(s: ErrataSection, audience: Audience | null): boolean {
  if (!audience) return true
  const a = audienceOf(s)
  return a === audience || a === 'Both'
}

function matchesAreas(s: ErrataSection, areas: ReadonlySet<string>): boolean {
  if (areas.size === 0) return true
  const sectionAreas = areasOf(s)
  return sectionAreas.some((a) => areas.has(a))
}

function matchesSections(s: ErrataSection, sections: ReadonlySet<string>): boolean {
  if (sections.size === 0) return true
  return sectionsForErrata(s).some((sec) => sections.has(sec.label))
}

function matchesQuery(s: ErrataSection, q: string): boolean {
  if (!q) return true
  return haystack(s).includes(q)
}

const filteredSections = computed<ErrataSection[]>(() => {
  const q = query.value.trim().toLowerCase()
  return versionSections.value.filter((s) =>
    matchesAudience(s, audienceFilter.value) &&
    matchesAreas(s, areaFilter) &&
    matchesSections(s, sectionFilter) &&
    matchesQuery(s, q),
  )
})

interface ResultGroup { errataId: string; sections: ErrataSection[] }

const groupedResults = computed<ResultGroup[]>(() => {
  const groups = new Map<string, ErrataSection[]>()
  for (const s of filteredSections.value) {
    if (!groups.has(s.errataId)) groups.set(s.errataId, [])
    groups.get(s.errataId)!.push(s)
  }
  return [...groups.entries()].map(([errataId, sections]) => ({ errataId, sections }))
})

// ─── Smart counts (count under all OTHER active filters) ──────────────────
interface CountOverrides {
  query?: string
  audience?: Audience | null
  areas?: ReadonlySet<string>
  sections?: ReadonlySet<string>
}

function countWith(overrides: CountOverrides): number {
  const q = (overrides.query !== undefined ? overrides.query : query.value).trim().toLowerCase()
  const audience = overrides.audience !== undefined ? overrides.audience : audienceFilter.value
  const areas = overrides.areas !== undefined ? overrides.areas : areaFilter
  const sections = overrides.sections !== undefined ? overrides.sections : sectionFilter
  return versionSections.value.filter((s) =>
    matchesAudience(s, audience) &&
    matchesAreas(s, areas) &&
    matchesSections(s, sections) &&
    matchesQuery(s, q),
  ).length
}

function audienceCount(value: Audience): number {
  return countWith({ audience: value })
}

function areaCount(area: string): number {
  const next = new Set<string>(areaFilter)
  next.add(area)
  return countWith({ areas: next })
}

function sectionPillCount(label: string): number {
  const next = new Set<string>(sectionFilter)
  next.add(label)
  return countWith({ sections: next })
}

// ─── Available facet values ───────────────────────────────────────────────
const availableAreas = computed<string[]>(() => {
  const seen = new Set<string>()
  for (const s of versionSections.value) for (const a of areasOf(s)) seen.add(a)
  return [...seen].sort()
})

const availableSections = computed<ParsedAffectedPath[]>(() => {
  const map = new Map<string, ParsedAffectedPath>()
  for (const s of versionSections.value) {
    for (const sec of sectionsForErrata(s)) {
      if (!map.has(sec.label)) map.set(sec.label, sec)
    }
  }
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label))
})

// ─── Toggles ──────────────────────────────────────────────────────────────
function toggleAudience(value: Audience): void {
  audienceFilter.value = audienceFilter.value === value ? null : value
}

function toggleArea(area: string): void {
  if (areaFilter.has(area)) areaFilter.delete(area)
  else areaFilter.add(area)
}

function toggleSection(label: string): void {
  if (sectionFilter.has(label)) sectionFilter.delete(label)
  else sectionFilter.add(label)
}

function setQuery(value: string): void {
  query.value = value
  if (searchInput.value) searchInput.value.focus()
}

const anyFilterActive = computed<boolean>(() =>
  Boolean(query.value) || Boolean(audienceFilter.value) || areaFilter.size > 0 || sectionFilter.size > 0,
)

function resetFilters(): void {
  query.value = ''
  audienceFilter.value = null
  areaFilter.clear()
  sectionFilter.clear()
}

// ─── Result rendering helpers ─────────────────────────────────────────────
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(text: string | undefined): string {
  const safe = escapeHtml(text || '')
  const q = query.value.trim()
  if (!q) return safe
  const re = new RegExp(`(${escapeRegex(q)})`, 'ig')
  return safe.replace(re, '<mark class="ed-er-mark">$1</mark>')
}

// ─── URL <-> state sync ───────────────────────────────────────────────────
function readFromUrl(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')
  if (q) query.value = q
  const aud = params.get('audience')
  if (aud === 'TPP' || aud === 'LFI') audienceFilter.value = aud
  const areas = params.get('area')
  if (areas) for (const a of areas.split(',').filter(Boolean)) areaFilter.add(a)
  const sections = params.get('section')
  if (sections) for (const sec of sections.split('|').filter(Boolean)) sectionFilter.add(sec)
}

function writeToUrl(): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const sp = url.searchParams
  query.value ? sp.set('q', query.value) : sp.delete('q')
  audienceFilter.value ? sp.set('audience', audienceFilter.value) : sp.delete('audience')
  areaFilter.size ? sp.set('area', [...areaFilter].join(',')) : sp.delete('area')
  sectionFilter.size ? sp.set('section', [...sectionFilter].join('|')) : sp.delete('section')
  window.history.replaceState({}, '', url.toString())
}

onMounted(() => readFromUrl())

watch(
  [query, audienceFilter, () => [...areaFilter], () => [...sectionFilter]],
  writeToUrl,
)
</script>

<style scoped>
.ed-er {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}

.ed-er--missing { min-height: 50vh; }

.ed-er-back {
  font-family: var(--at-mono);
  font-size: 0.9rem;
  color: var(--at-gold);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.ed-er-back:hover { color: var(--at-navy-deep); }

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-er-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-er-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-er-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-gold);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-er-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-er-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-er-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-er-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-er-stats {
  margin-top: 2.5rem;
  display: flex;
  gap: 0;
  border-top: 1px solid var(--at-grid-line);
}

.ed-er-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.4rem 1.5rem 0;
  border-right: 1px solid var(--at-grid-line);
}

.ed-er-stat:last-child { border-right: none; }
.ed-er-stat:first-child { padding-left: 0; }

.ed-er-stat__num {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
}

.ed-er-stat__label {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

/* ─── Search section ────────────────────────────────────────────────────── */
.ed-er-search {
  padding: 4rem 0 4.5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-er-search__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-er-search__head { max-width: 48rem; margin-bottom: 2rem; }

.ed-er-search__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-gold);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-er-search__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-er-search__title {
  font-family: var(--at-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-er-search__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
  max-width: 44rem;
}

.ed-er-search__lede strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Facet rows ────────────────────────────────────────────────────────── */
.ed-er-facet {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 1.25rem;
  align-items: start;
  padding: 1.1rem 0;
  border-top: 1px solid var(--at-grid-line);
}

.ed-er-facet:first-of-type { border-top: 1px solid var(--at-grid-line-2, var(--at-grid-line)); }

.ed-er-facet--keyword { padding-bottom: 1.4rem; }

.ed-er-facet__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  padding-top: 0.55rem;
}

.ed-er-facet__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.ed-er-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 0.75rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.ed-er-pill:hover:not(.ed-er-pill--disabled) {
  border-color: var(--at-gold);
  background: color-mix(in srgb, var(--at-gold) 8%, var(--at-bg-cream));
}

.ed-er-pill--active {
  background: var(--at-gold);
  border-color: var(--at-gold);
  color: var(--at-navy-deep);
}

.ed-er-pill--active:hover { background: var(--at-gold); }

.ed-er-pill--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ed-er-pill__text { line-height: 1; }

.ed-er-pill__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.4rem;
  padding: 0.1rem 0.35rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  font-weight: 700;
  background: color-mix(in srgb, var(--at-navy-deep) 8%, transparent);
  color: var(--at-mute-2);
  line-height: 1.2;
}

.ed-er-pill--active .ed-er-pill__count {
  background: color-mix(in srgb, var(--at-navy-deep) 18%, transparent);
  color: var(--at-navy-deep);
}

/* ─── Keyword input ─────────────────────────────────────────────────────── */
.ed-er-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ed-er-input:focus-within {
  border-color: var(--at-gold);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--at-gold) 22%, transparent);
}

.ed-er-input__icon {
  position: absolute;
  left: 1rem;
  color: var(--at-mute);
  pointer-events: none;
}

.ed-er-input__field {
  flex: 1;
  width: 100%;
  padding: 0.85rem 2.85rem 0.85rem 2.85rem;
  background: transparent;
  border: 0;
  outline: none;
  font-family: var(--at-mono);
  font-size: 0.88rem;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
}

.ed-er-input__field::placeholder {
  color: var(--at-mute);
  font-family: var(--at-mono);
  font-size: 0.8rem;
  letter-spacing: 0.01em;
}

.ed-er-input__field::-webkit-search-cancel-button { display: none; }

.ed-er-input__clear {
  position: absolute;
  right: 0.65rem;
  width: 1.7rem;
  height: 1.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  color: var(--at-mute);
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.ed-er-input__clear:hover {
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-gold) 14%, transparent);
}

/* ─── Meter ─────────────────────────────────────────────────────────────── */
.ed-er-meter {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.4rem 0 1.6rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-er-meter__count strong {
  color: var(--at-navy-deep);
  font-weight: 700;
}

.ed-er-meter__reset {
  margin-left: auto;
  background: transparent;
  border: 0;
  padding: 0.4rem 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.ed-er-meter__reset:hover {
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-gold) 14%, transparent);
}

/* ─── Empty state ───────────────────────────────────────────────────────── */
.ed-er-empty {
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2.5rem 2rem;
  text-align: center;
}

.ed-er-empty__title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  margin-bottom: 0.6rem;
}

.ed-er-empty__body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-mute-2);
  margin: 0 auto 1.4rem;
  max-width: 38rem;
  line-height: 1.6;
}

.ed-er-empty__btn {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.75rem 1.25rem;
  background: var(--at-gold);
  color: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
  transition: transform 0.15s;
}

.ed-er-empty__btn:hover { transform: translateY(-1px); }

/* ─── Groups & rows ─────────────────────────────────────────────────────── */
.ed-er-groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ed-er-group {
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}

.ed-er-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.95rem 1.4rem;
  background: color-mix(in srgb, var(--at-gold) 7%, transparent);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-er-group__id {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-er-group__count {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

.ed-er-row {
  display: grid;
  grid-template-columns: 3.5rem 1fr 1.5rem;
  gap: 1.25rem;
  align-items: start;
  padding: 1.4rem 1.4rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-er-row:first-of-type { border-top: 0; }
.ed-er-row:hover { background: color-mix(in srgb, var(--at-gold) 4%, transparent); }
.ed-er-row:target {
  background: color-mix(in srgb, var(--at-gold) 10%, transparent);
  box-shadow: inset 3px 0 0 var(--at-gold);
}

.ed-er-row__num {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--at-gold);
  padding-top: 0.15rem;
}

.ed-er-row__title-link {
  display: inline-block;
  text-decoration: none;
  color: inherit;
  margin-bottom: 0.4rem;
}

.ed-er-row__title-link:hover .ed-er-row__title { color: var(--at-gold); }

.ed-er-row__title {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: -0.012em;
  line-height: 1.3;
  color: var(--at-navy-deep);
  transition: color 0.15s ease;
}

.ed-er-row__summary {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin-bottom: 0.85rem;
}

.ed-er-row__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.ed-er-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
  font-weight: 600;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  color: var(--at-mute-2);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.ed-er-chip:hover {
  border-color: var(--at-gold);
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-gold) 10%, transparent);
}

.ed-er-chip--ep { letter-spacing: 0; }

.ed-er-chip--sec {
  letter-spacing: 0;
  font-family: var(--at-sans);
  font-size: 0.75rem;
  text-decoration: none;
  color: var(--at-navy-deep);
}

.ed-er-chip--sec:hover {
  border-color: var(--at-gold);
  background: color-mix(in srgb, var(--at-gold) 12%, transparent);
  color: var(--at-navy-deep);
}

.ed-er-row__arrow-link {
  font-family: var(--at-mono);
  font-size: 1.15rem;
  color: var(--at-gold);
  padding-top: 0.15rem;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.18s ease;
}

.ed-er-row__arrow-link:hover { transform: translateX(4px); }

.ed-er-mark {
  background: color-mix(in srgb, var(--at-gold) 35%, transparent);
  color: inherit;
  padding: 0 0.1em;
  border-radius: 0;
  font-weight: 600;
}

/* ─── Reference / governance ────────────────────────────────────────────── */
.ed-er-ref {
  padding: 4rem 0 5rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
}

.ed-er-ref__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-er-ref__head { max-width: 44rem; margin-bottom: 2.5rem; }

.ed-er-ref__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-er-ref__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-er-ref__title {
  font-family: var(--at-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-er-ref__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
  max-width: 40rem;
}

.ed-er-ref__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-er-ref__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-er-ref__tile {
  display: flex;
  flex-direction: column;
  padding: 1.85rem 1.6rem;
  border-right: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease;
}

.ed-er-ref__tile:last-child { border-right: none; }
.ed-er-ref__tile:hover { background: var(--at-bg-cream); }

.ed-er-ref__tile-meta {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
}

.ed-er-ref__tile-meta-dash {
  width: 18px;
  height: 1px;
  background: currentColor;
}

.ed-er-ref__tile-title {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  margin: 0 0 0.65rem;
  color: var(--at-navy-deep);
}

.ed-er-ref__tile-body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.2rem;
  flex: 1;
}

.ed-er-ref__tile-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.9rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-er-ref__tile-cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-er-ref__tile-arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  color: var(--at-blue-deep);
  transition: transform 0.2s;
}

.ed-er-ref__tile:hover .ed-er-ref__tile-arrow { transform: translateX(4px); }
.ed-er-ref__tile:hover .ed-er-ref__tile-cta { color: var(--at-navy-deep); }

/* Operating rules block */
.ed-er-rules {
  margin-top: 1.5rem;
  padding: 1.5rem 1.6rem;
  background: var(--at-surface);
  border-left: 3px solid var(--at-gold);
}

.ed-er-rules__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  margin-bottom: 0.85rem;
}

.ed-er-rules__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.ed-er-rules__list li {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  padding-left: 1.1rem;
  position: relative;
}

.ed-er-rules__list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.65rem;
  width: 6px;
  height: 1px;
  background: var(--at-gold);
}

.ed-er-rules__list li strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-er-rules__list code {
  font-family: var(--at-mono);
  font-size: 0.85em;
  background: color-mix(in srgb, var(--at-gold) 12%, transparent);
  padding: 0.05em 0.35em;
  color: var(--at-navy-deep);
}

.ed-er-cross {
  margin-top: 1.5rem;
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
}

.ed-er-cross strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-er-cross a {
  color: var(--at-blue-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-er-cross a:hover { color: var(--at-navy-deep); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-er-stats { flex-direction: column; gap: 0; border-top: 1px solid var(--at-grid-line); }
  .ed-er-stat {
    border-right: none;
    border-bottom: 1px solid var(--at-grid-line);
    padding: 1.1rem 0;
  }
  .ed-er-stat:last-child { border-bottom: none; }

  .ed-er-facet { grid-template-columns: 1fr; gap: 0.55rem; }
  .ed-er-facet__label { padding-top: 0; }

  .ed-er-ref__grid { grid-template-columns: 1fr; }
  .ed-er-ref__tile { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
  .ed-er-ref__tile:last-child { border-bottom: none; }
}

@media (max-width: 640px) {
  .ed-er-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-er-search { padding: 3rem 0 3.5rem; }
  .ed-er-search__inner { padding: 0 1.25rem; }
  .ed-er-ref { padding: 3rem 0 4rem; }
  .ed-er-ref__inner { padding: 0 1.25rem; }
  .ed-er-row {
    grid-template-columns: 2.5rem 1fr;
    gap: 0.85rem;
    padding: 1.2rem 1rem;
  }
  .ed-er-row__arrow-link { display: none; }
  .ed-er-input__field { padding: 0.8rem 2.6rem 0.8rem 2.6rem; font-size: 0.82rem; }
  .ed-er-input__field::placeholder { font-size: 0.74rem; }
  .ed-er-rules { padding: 1.25rem 1.1rem; }
  .ed-er-pill { font-size: 0.8rem; padding: 0.4rem 0.65rem; }
}
</style>

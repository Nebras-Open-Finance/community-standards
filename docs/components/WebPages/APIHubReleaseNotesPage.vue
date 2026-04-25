<template>
  <div class="ed-ahr">

    <PageHeader />

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-ahr-hero">
      <div class="ed-ahr-hero__inner">
        <div class="ed-ahr-hero__label">
          <span class="ed-ahr-hero__label-dash" />
          Operational deployments &middot; {{ year }}
        </div>
        <h1 class="ed-ahr-hero__title">API Hub Release Notes &mdash; {{ year }}</h1>
        <p class="ed-ahr-hero__sub">
          Changes deployed to the <strong>API Hub platform</strong> during {{ year }} &mdash;
          the OIDC authorization server, Consent Manager, gateway, and resource server that
          fronts every LFI. Each entry records what was deployed, when it became effective,
          and the impact on TPPs and LFIs.
        </p>

        <div class="ed-ahr-stats">
          <div class="ed-ahr-stat">
            <span class="ed-ahr-stat__num">{{ yearEntries.length }}</span>
            <span class="ed-ahr-stat__label">{{ yearEntries.length === 1 ? 'change' : 'changes' }}</span>
          </div>
          <div class="ed-ahr-stat">
            <span class="ed-ahr-stat__num">{{ releases.length }}</span>
            <span class="ed-ahr-stat__label">{{ releases.length === 1 ? 'release' : 'releases' }}</span>
          </div>
          <div class="ed-ahr-stat">
            <span class="ed-ahr-stat__num">{{ areaCountTotal }}</span>
            <span class="ed-ahr-stat__label">functional areas</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FACETED SEARCH + RESULTS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-ahr-search">
      <div class="ed-ahr-search__inner">

        <div class="ed-ahr-search__head">
          <div class="ed-ahr-search__eyebrow">
            <span class="ed-ahr-search__eyebrow-dash" />
            Filter the register
          </div>
          <h2 class="ed-ahr-search__title">Find a change</h2>
          <p class="ed-ahr-search__lede">
            Narrow by <strong>audience</strong>, <strong>functional area</strong>, or
            <strong>documentation section</strong>. Add a keyword to refine further.
          </p>
        </div>

        <!-- Audience facet -->
        <div class="ed-ahr-facet">
          <div class="ed-ahr-facet__label">Audience</div>
          <div class="ed-ahr-facet__pills">
            <button
              v-for="opt in AUDIENCE_OPTIONS"
              :key="opt"
              type="button"
              class="ed-ahr-pill"
              :class="{
                'ed-ahr-pill--active': audienceFilter === opt,
                'ed-ahr-pill--disabled': audienceCount(opt) === 0,
              }"
              :disabled="audienceCount(opt) === 0 && audienceFilter !== opt"
              @click="toggleAudience(opt)"
            >
              <span class="ed-ahr-pill__text">{{ opt }}</span>
              <span class="ed-ahr-pill__count">{{ audienceCount(opt) }}</span>
            </button>
          </div>
        </div>

        <!-- Functional area facet -->
        <div class="ed-ahr-facet">
          <div class="ed-ahr-facet__label">Functional area</div>
          <div class="ed-ahr-facet__pills">
            <button
              v-for="area in availableAreas"
              :key="area"
              type="button"
              class="ed-ahr-pill"
              :class="{
                'ed-ahr-pill--active': areaFilter.has(area),
                'ed-ahr-pill--disabled': areaCount(area) === 0,
              }"
              :disabled="areaCount(area) === 0 && !areaFilter.has(area)"
              @click="toggleArea(area)"
            >
              <span class="ed-ahr-pill__text">{{ area }}</span>
              <span class="ed-ahr-pill__count">{{ areaCount(area) }}</span>
            </button>
          </div>
        </div>

        <!-- Section facet -->
        <div class="ed-ahr-facet">
          <div class="ed-ahr-facet__label">Section</div>
          <div class="ed-ahr-facet__pills">
            <button
              v-for="sec in availableSections"
              :key="sec"
              type="button"
              class="ed-ahr-pill"
              :class="{
                'ed-ahr-pill--active': sectionFilter.has(sec),
                'ed-ahr-pill--disabled': sectionPillCount(sec) === 0,
              }"
              :disabled="sectionPillCount(sec) === 0 && !sectionFilter.has(sec)"
              @click="toggleSection(sec)"
            >
              <span class="ed-ahr-pill__text">{{ sec }}</span>
              <span class="ed-ahr-pill__count">{{ sectionPillCount(sec) }}</span>
            </button>
          </div>
        </div>

        <!-- Keyword facet -->
        <div class="ed-ahr-facet ed-ahr-facet--keyword">
          <div class="ed-ahr-facet__label">Keyword</div>
          <div class="ed-ahr-input">
            <svg class="ed-ahr-input__icon" xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref="searchInput"
              v-model="query"
              type="search"
              class="ed-ahr-input__field"
              placeholder="Search title, summary, description, endpoint, or impact"
              autocomplete="off"
              spellcheck="false"
            />
            <button
              v-if="query"
              class="ed-ahr-input__clear"
              type="button"
              aria-label="Clear keyword"
              @click="query = ''"
            >&times;</button>
          </div>
        </div>

        <!-- Meter -->
        <div class="ed-ahr-meter">
          <span class="ed-ahr-meter__count">
            <strong>{{ filteredEntries.length }}</strong>
            of {{ yearEntries.length }}
            {{ yearEntries.length === 1 ? 'change' : 'changes' }}
          </span>
          <button
            v-if="anyFilterActive"
            type="button"
            class="ed-ahr-meter__reset"
            @click="resetFilters"
          >Reset filters &times;</button>
        </div>

        <!-- Results -->
        <div v-if="filteredEntries.length === 0" class="ed-ahr-empty">
          <div class="ed-ahr-empty__title">No changes match the current filters</div>
          <p class="ed-ahr-empty__body">
            Try removing a filter or clearing the keyword. The pill counts above show how
            many entries each filter would surface on its own.
          </p>
          <button class="ed-ahr-empty__btn" @click="resetFilters">Reset filters</button>
        </div>

        <div v-else class="ed-ahr-groups">
          <div
            v-for="group in groupedResults"
            :key="group.release"
            class="ed-ahr-group"
          >
            <div class="ed-ahr-group__head">
              <div class="ed-ahr-group__main">
                <div class="ed-ahr-group__tag">Release</div>
                <div class="ed-ahr-group__id">{{ group.release }}</div>
                <div class="ed-ahr-group__date">{{ formatDate(group.effectiveDate) }}</div>
              </div>
              <div class="ed-ahr-group__count">
                {{ group.entries.length }} {{ group.entries.length === 1 ? 'change' : 'changes' }}
              </div>
            </div>

            <article
              v-for="entry in group.entries"
              :id="anchorFor(entry)"
              :key="anchorFor(entry)"
              class="ed-ahr-card"
            >
              <header class="ed-ahr-card__head">
                <div class="ed-ahr-card__num">&sect;{{ entry.number }}</div>
                <div class="ed-ahr-card__heading">
                  <h3 class="ed-ahr-card__title" v-html="highlight(entry.title)" />
                  <p class="ed-ahr-card__summary" v-html="highlight(entry.summary)" />
                </div>
                <div class="ed-ahr-card__aud">
                  <span
                    class="ed-ahr-aud"
                    :class="`ed-ahr-aud--${entry.audience.toLowerCase()}`"
                  >{{ entry.audience }}</span>
                </div>
              </header>

              <div class="ed-ahr-card__body">
                <p
                  v-for="(para, i) in paragraphsOf(entry.description)"
                  :key="`d-${entry.number}-${i}`"
                  class="ed-ahr-card__para"
                  v-html="highlight(para)"
                />

                <div class="ed-ahr-impact">
                  <span class="ed-ahr-impact__label">Impact</span>
                  <span class="ed-ahr-impact__body" v-html="highlight(entry.impact)" />
                </div>
              </div>

              <footer v-if="hasChips(entry)" class="ed-ahr-card__foot">
                <div v-if="entry.areas.length" class="ed-ahr-chiprow">
                  <span class="ed-ahr-chiprow__label">Areas</span>
                  <button
                    v-for="area in entry.areas"
                    :key="`a-${entry.number}-${area}`"
                    class="ed-ahr-chip ed-ahr-chip--area"
                    :class="{ 'ed-ahr-chip--on': areaFilter.has(area) }"
                    type="button"
                    :title="`Toggle filter: ${area}`"
                    @click="toggleArea(area)"
                  >{{ area }}</button>
                </div>

                <div v-if="entry.sections && entry.sections.length" class="ed-ahr-chiprow">
                  <span class="ed-ahr-chiprow__label">Docs</span>
                  <a
                    v-for="(sec, si) in entry.sections"
                    :key="`s-${entry.number}-${si}`"
                    :href="sectionUrl(sec)"
                    class="ed-ahr-chip ed-ahr-chip--section"
                    :title="`Open ${sec.label}`"
                  >{{ sec.label }} &rarr;</a>
                </div>

                <div v-if="entry.endpoints && entry.endpoints.length" class="ed-ahr-chiprow">
                  <span class="ed-ahr-chiprow__label">APIs</span>
                  <a
                    v-for="(ep, ei) in entry.endpoints"
                    :key="`e-${entry.number}-${ei}`"
                    :href="sectionUrl(ep)"
                    class="ed-ahr-chip ed-ahr-chip--ep"
                    :title="`Open ${ep.label}`"
                  >{{ ep.label }}</a>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CROSS-LINK
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-ahr-cross">
      <div class="ed-ahr-cross__inner">
        <div class="ed-ahr-cross__eyebrow">
          <span class="ed-ahr-cross__eyebrow-dash" />
          Related registers
        </div>
        <p class="ed-ahr-cross__body">
          For corrections to <strong>published documentation</strong> rather than
          platform deployments, see
          <a href="/tech/release-notes-and-erratas/erratas/">Erratas</a>.
          For Trust Framework directory releases, see
          <a :href="`/tech/release-notes-and-erratas/release-notes/trust-framework/${latestTrustFrameworkYear}`">
            Trust Framework Release Notes</a>.
        </p>
      </div>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import PageHeader from './Components/PageHeader.vue'
import PageFooter from './Components/PageFooter.vue'
import { useSelectedVersion } from '../Composables/useSelectedVersion'
import {
  API_HUB_RELEASES,
  yearOf,
  anchorFor as anchorForEntry,
} from '../../.vitepress/api-hub-releases-registry'
import { latestTrustFrameworkYear } from '../../.vitepress/release-notes-years'

const props = defineProps({
  year: { type: String, required: true },
})

const { selectedVersion } = useSelectedVersion()

// ─── Base set ────────────────────────────────────────────────────────────
const yearEntries = computed(() =>
  API_HUB_RELEASES
    .filter((e) => yearOf(e.release) === props.year)
    .slice()
    .sort((a, b) => {
      if (a.release !== b.release) return b.release.localeCompare(a.release)
      return a.number - b.number
    })
)

const releases = computed(() => {
  const map = new Map()
  for (const e of yearEntries.value) {
    if (!map.has(e.release)) map.set(e.release, e.effectiveDate)
  }
  return [...map.entries()].map(([release, effectiveDate]) => ({ release, effectiveDate }))
})

const areaCountTotal = computed(() => {
  const seen = new Set()
  for (const e of yearEntries.value) for (const a of e.areas) seen.add(a)
  return seen.size
})

// ─── Facet state ─────────────────────────────────────────────────────────
const AUDIENCE_OPTIONS = ['TPP', 'LFI']

const query = ref('')
const audienceFilter = ref(null)
const areaFilter = reactive(new Set())
const sectionFilter = reactive(new Set())
const searchInput = ref(null)

function sectionsOf(entry) {
  return (entry.sections || []).map((s) => s.label)
}

function haystack(entry) {
  const parts = [
    entry.title,
    entry.summary,
    entry.description,
    entry.impact,
    entry.release,
    ...entry.areas,
    ...sectionsOf(entry),
    ...(entry.endpoints || []).flatMap((e) => [e.label, e.path]),
  ]
  return parts.join(' \n ').toLowerCase()
}

// ─── Predicates ──────────────────────────────────────────────────────────
function matchesAudience(entry, audience) {
  if (!audience) return true
  return entry.audience === audience || entry.audience === 'Both'
}

function matchesAreas(entry, areas) {
  if (areas.size === 0) return true
  return entry.areas.some((a) => areas.has(a))
}

function matchesSections(entry, sections) {
  if (sections.size === 0) return true
  return sectionsOf(entry).some((s) => sections.has(s))
}

function matchesQuery(entry, q) {
  if (!q) return true
  return haystack(entry).includes(q)
}

const filteredEntries = computed(() => {
  const q = query.value.trim().toLowerCase()
  return yearEntries.value.filter((e) =>
    matchesAudience(e, audienceFilter.value) &&
    matchesAreas(e, areaFilter) &&
    matchesSections(e, sectionFilter) &&
    matchesQuery(e, q),
  )
})

const groupedResults = computed(() => {
  const groups = new Map()
  for (const e of filteredEntries.value) {
    if (!groups.has(e.release)) {
      groups.set(e.release, { release: e.release, effectiveDate: e.effectiveDate, entries: [] })
    }
    groups.get(e.release).entries.push(e)
  }
  return [...groups.values()]
})

// ─── Smart counts ────────────────────────────────────────────────────────
function countWith(overrides) {
  const q = (overrides.query !== undefined ? overrides.query : query.value).trim().toLowerCase()
  const audience = overrides.audience !== undefined ? overrides.audience : audienceFilter.value
  const areas = overrides.areas !== undefined ? overrides.areas : areaFilter
  const sections = overrides.sections !== undefined ? overrides.sections : sectionFilter
  return yearEntries.value.filter((e) =>
    matchesAudience(e, audience) &&
    matchesAreas(e, areas) &&
    matchesSections(e, sections) &&
    matchesQuery(e, q),
  ).length
}

function audienceCount(value) { return countWith({ audience: value }) }

function areaCount(area) {
  const next = new Set(areaFilter)
  next.add(area)
  return countWith({ areas: next })
}

function sectionPillCount(sec) {
  const next = new Set(sectionFilter)
  next.add(sec)
  return countWith({ sections: next })
}

// ─── Available values ────────────────────────────────────────────────────
const availableAreas = computed(() => {
  const seen = new Set()
  for (const e of yearEntries.value) for (const a of e.areas) seen.add(a)
  return [...seen].sort()
})

const availableSections = computed(() => {
  const seen = new Set()
  for (const e of yearEntries.value) for (const s of sectionsOf(e)) seen.add(s)
  return [...seen].sort()
})

// ─── Toggles ─────────────────────────────────────────────────────────────
function toggleAudience(value) {
  audienceFilter.value = audienceFilter.value === value ? null : value
}
function toggleArea(area) {
  if (areaFilter.has(area)) areaFilter.delete(area)
  else areaFilter.add(area)
}
function toggleSection(sec) {
  if (sectionFilter.has(sec)) sectionFilter.delete(sec)
  else sectionFilter.add(sec)
}

const anyFilterActive = computed(() =>
  !!query.value || !!audienceFilter.value || areaFilter.size > 0 || sectionFilter.size > 0,
)

function resetFilters() {
  query.value = ''
  audienceFilter.value = null
  areaFilter.clear()
  sectionFilter.clear()
}

// ─── URL helpers ─────────────────────────────────────────────────────────
function sectionUrl(ref) {
  const target = ref.target === 'lfi' ? 'lfi-api-hub' : 'tpp-standards'
  const versionSegment = ref.versioned === false ? '' : `${selectedVersion.value}/`
  return `/tech/${target}/${versionSegment}${ref.path}`
}

function anchorFor(entry) { return anchorForEntry(entry) }

function hasChips(entry) {
  return entry.areas.length > 0
    || (entry.sections && entry.sections.length > 0)
    || (entry.endpoints && entry.endpoints.length > 0)
}

function paragraphsOf(text) {
  return String(text || '').split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Highlight ───────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(text) {
  const safe = escapeHtml(text || '')
  const q = query.value.trim()
  if (!q) return safe
  const re = new RegExp(`(${escapeRegex(q)})`, 'ig')
  return safe.replace(re, '<mark class="ed-ahr-mark">$1</mark>')
}

// ─── URL <-> state sync ─────────────────────────────────────────────────
function readFromUrl() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')
  if (q) query.value = q
  const aud = params.get('audience')
  if (aud === 'TPP' || aud === 'LFI') audienceFilter.value = aud
  const areas = params.get('area')
  if (areas) for (const a of areas.split(',').filter(Boolean)) areaFilter.add(a)
  const secs = params.get('section')
  if (secs) for (const s of secs.split(',').filter(Boolean)) sectionFilter.add(s)
}

function writeToUrl() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const sp = url.searchParams
  query.value ? sp.set('q', query.value) : sp.delete('q')
  audienceFilter.value ? sp.set('audience', audienceFilter.value) : sp.delete('audience')
  areaFilter.size ? sp.set('area', [...areaFilter].join(',')) : sp.delete('area')
  sectionFilter.size ? sp.set('section', [...sectionFilter].join(',')) : sp.delete('section')
  window.history.replaceState({}, '', url.toString())
}

onMounted(() => readFromUrl())
watch([query, audienceFilter, () => [...areaFilter], () => [...sectionFilter]], writeToUrl)
</script>

<style scoped>
.ed-ahr {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-ahr-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-ahr-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-ahr-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-ahr-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-ahr-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.5rem, 5.5vw, 3.75rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-ahr-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-ahr-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-ahr-stats {
  margin-top: 2.5rem;
  display: flex;
  gap: 0;
  border-top: 1px solid var(--at-grid-line);
}

.ed-ahr-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.4rem 1.5rem 0;
  border-right: 1px solid var(--at-grid-line);
}

.ed-ahr-stat:last-child { border-right: none; }
.ed-ahr-stat:first-child { padding-left: 0; }

.ed-ahr-stat__num {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
}

.ed-ahr-stat__label {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

/* ─── Search section ────────────────────────────────────────────────────── */
.ed-ahr-search {
  padding: 4rem 0 4.5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-ahr-search__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-ahr-search__head { max-width: 48rem; margin-bottom: 2rem; }

.ed-ahr-search__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-ahr-search__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-ahr-search__title {
  font-family: var(--at-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-ahr-search__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
  max-width: 44rem;
}

.ed-ahr-search__lede strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Facet rows ────────────────────────────────────────────────────────── */
.ed-ahr-facet {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 1.25rem;
  align-items: start;
  padding: 1.1rem 0;
  border-top: 1px solid var(--at-grid-line);
}

.ed-ahr-facet:first-of-type { border-top: 1px solid var(--at-grid-line); }

.ed-ahr-facet--keyword { padding-bottom: 1.4rem; }

.ed-ahr-facet__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  padding-top: 0.55rem;
}

.ed-ahr-facet__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.ed-ahr-pill {
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

.ed-ahr-pill:hover:not(.ed-ahr-pill--disabled) {
  border-color: var(--at-teal);
  background: color-mix(in srgb, var(--at-teal) 8%, var(--at-bg-cream));
}

.ed-ahr-pill--active {
  background: var(--at-teal);
  border-color: var(--at-teal);
  color: var(--at-bg-cream);
}

.ed-ahr-pill--active:hover { background: var(--at-teal); }

.ed-ahr-pill--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ed-ahr-pill__text { line-height: 1; }

.ed-ahr-pill__count {
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

.ed-ahr-pill--active .ed-ahr-pill__count {
  background: color-mix(in srgb, var(--at-bg-cream) 30%, transparent);
  color: var(--at-bg-cream);
}

/* ─── Keyword input ─────────────────────────────────────────────────────── */
.ed-ahr-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ed-ahr-input:focus-within {
  border-color: var(--at-teal);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--at-teal) 22%, transparent);
}

.ed-ahr-input__icon {
  position: absolute;
  left: 1rem;
  color: var(--at-mute);
  pointer-events: none;
}

.ed-ahr-input__field {
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

.ed-ahr-input__field::placeholder {
  color: var(--at-mute);
  font-family: var(--at-mono);
  font-size: 0.8rem;
  letter-spacing: 0.01em;
}

.ed-ahr-input__field::-webkit-search-cancel-button { display: none; }

.ed-ahr-input__clear {
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

.ed-ahr-input__clear:hover {
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 14%, transparent);
}

/* ─── Meter ─────────────────────────────────────────────────────────────── */
.ed-ahr-meter {
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

.ed-ahr-meter__count strong {
  color: var(--at-navy-deep);
  font-weight: 700;
}

.ed-ahr-meter__reset {
  margin-left: auto;
  background: transparent;
  border: 0;
  padding: 0.4rem 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.ed-ahr-meter__reset:hover {
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 14%, transparent);
}

/* ─── Empty state ───────────────────────────────────────────────────────── */
.ed-ahr-empty {
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2.5rem 2rem;
  text-align: center;
}

.ed-ahr-empty__title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  margin-bottom: 0.6rem;
}

.ed-ahr-empty__body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-mute-2);
  margin: 0 auto 1.4rem;
  max-width: 38rem;
  line-height: 1.6;
}

.ed-ahr-empty__btn {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.75rem 1.25rem;
  background: var(--at-teal);
  color: var(--at-bg-cream);
  border: 0;
  cursor: pointer;
  transition: transform 0.15s;
}

.ed-ahr-empty__btn:hover { transform: translateY(-1px); }

/* ─── Groups (releases) ─────────────────────────────────────────────────── */
.ed-ahr-groups {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.ed-ahr-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ed-ahr-group__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0 0.85rem;
  border-bottom: 2px solid var(--at-teal);
}

.ed-ahr-group__main {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-ahr-group__tag {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
}

.ed-ahr-group__id {
  font-family: var(--at-mono);
  font-size: 1.25rem;
  letter-spacing: -0.005em;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-ahr-group__date {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-mute-2);
}

.ed-ahr-group__count {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
  white-space: nowrap;
}

/* ─── Entry card ────────────────────────────────────────────────────────── */
.ed-ahr-card {
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s ease;
}

.ed-ahr-card:hover { border-color: color-mix(in srgb, var(--at-teal) 45%, var(--at-grid-line)); }

.ed-ahr-card:target {
  border-color: var(--at-teal);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--at-teal) 18%, transparent);
}

.ed-ahr-card__head {
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  gap: 1rem;
  align-items: start;
  padding: 1.35rem 1.5rem 1rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-ahr-card__num {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--at-teal);
  padding-top: 0.15rem;
}

.ed-ahr-card__heading { min-width: 0; }

.ed-ahr-card__title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.25;
  color: var(--at-navy-deep);
  margin: 0 0 0.4rem;
}

.ed-ahr-card__summary {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0;
}

/* Audience badge */
.ed-ahr-card__aud { padding-top: 0.15rem; }

.ed-ahr-aud {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  border: 1px solid currentColor;
}

.ed-ahr-aud--tpp  { color: var(--at-gold); }
.ed-ahr-aud--lfi  { color: var(--at-blue-deep); }
.ed-ahr-aud--both { color: var(--at-teal); }

/* Card body */
.ed-ahr-card__body { padding: 1.1rem 1.5rem 1.25rem; }

.ed-ahr-card__para {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.62;
  color: var(--at-navy-deep);
  margin: 0 0 0.9rem;
}

.ed-ahr-card__para:last-of-type { margin-bottom: 1.1rem; }

.ed-ahr-impact {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  padding: 0.8rem 1rem;
  background: color-mix(in srgb, var(--at-teal) 6%, transparent);
  border-left: 3px solid var(--at-teal);
}

.ed-ahr-impact__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  flex-shrink: 0;
}

.ed-ahr-impact__body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}

/* Card foot (chip rows) */
.ed-ahr-card__foot {
  border-top: 1px solid var(--at-grid-line);
  padding: 0.9rem 1.5rem 1rem;
  background: var(--at-surface);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.ed-ahr-chiprow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.ed-ahr-chiprow__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  margin-right: 0.2rem;
  min-width: 3rem;
}

.ed-ahr-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.02em;
  font-weight: 600;
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
  color: var(--at-mute-2);
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}

.ed-ahr-chip:hover {
  border-color: var(--at-teal);
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 10%, transparent);
}

.ed-ahr-chip--area { letter-spacing: 0; font-family: var(--at-sans); font-size: 0.75rem; }
.ed-ahr-chip--section { letter-spacing: 0; font-family: var(--at-sans); font-size: 0.75rem; }
.ed-ahr-chip--ep { font-family: var(--at-mono); }

.ed-ahr-chip--on {
  background: var(--at-teal);
  border-color: var(--at-teal);
  color: var(--at-bg-cream);
}

.ed-ahr-chip--on:hover {
  background: var(--at-teal);
  color: var(--at-bg-cream);
}

.ed-ahr-mark {
  background: color-mix(in srgb, var(--at-teal) 30%, transparent);
  color: inherit;
  padding: 0 0.1em;
  border-radius: 0;
  font-weight: 600;
}

/* ─── Cross-link ────────────────────────────────────────────────────────── */
.ed-ahr-cross {
  padding: 3rem 0 4rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
}

.ed-ahr-cross__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-ahr-cross__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-ahr-cross__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-ahr-cross__body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 48rem;
}

.ed-ahr-cross__body strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-ahr-cross__body a {
  color: var(--at-blue-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-ahr-cross__body a:hover { color: var(--at-navy-deep); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-ahr-stats { flex-direction: column; gap: 0; border-top: 1px solid var(--at-grid-line); }
  .ed-ahr-stat {
    border-right: none;
    border-bottom: 1px solid var(--at-grid-line);
    padding: 1.1rem 0;
  }
  .ed-ahr-stat:last-child { border-bottom: none; }

  .ed-ahr-facet { grid-template-columns: 1fr; gap: 0.55rem; }
  .ed-ahr-facet__label { padding-top: 0; }

  .ed-ahr-group__head { flex-wrap: wrap; align-items: flex-start; }
  .ed-ahr-card__head {
    grid-template-columns: 2.5rem 1fr;
    grid-template-rows: auto auto;
    row-gap: 0.5rem;
  }
  .ed-ahr-card__aud { grid-column: 2 / 3; }
}

@media (max-width: 640px) {
  .ed-ahr-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-ahr-search { padding: 3rem 0 3.5rem; }
  .ed-ahr-search__inner { padding: 0 1.25rem; }
  .ed-ahr-cross { padding: 2.5rem 0 3rem; }
  .ed-ahr-cross__inner { padding: 0 1.25rem; }
  .ed-ahr-card__head { padding: 1.1rem 1.1rem 0.85rem; }
  .ed-ahr-card__body { padding: 1rem 1.1rem 1.1rem; }
  .ed-ahr-card__foot { padding: 0.8rem 1.1rem 0.9rem; }
  .ed-ahr-input__field { padding: 0.8rem 2.6rem 0.8rem 2.6rem; font-size: 0.82rem; }
  .ed-ahr-input__field::placeholder { font-size: 0.74rem; }
  .ed-ahr-pill { font-size: 0.8rem; padding: 0.4rem 0.65rem; }
}
</style>

<route lang="yaml">
meta:
  title: Trust Framework Release Notes
</route>

<script setup lang="ts">
// Phase 5b-v — Trust Framework Release Notes per-year page. Ported from
// `docs/components/WebPages/TrustFrameworkReleaseNotesPage.vue`.
//
// VitePress passed the year via `defineProps({ year })` from a per-year MD
// shell; vue-router exposes it as `route.params.year` instead. The registry
// imports point at the new ported registries under `@/data/`.
//
// Chrome (PageHeader / PageFooter) is owned by the default layout. Vue
// primitives (computed/onMounted/reactive/ref/watch) and useRoute are
// auto-imported.

import {
  TRUST_FRAMEWORK_RELEASES,
  TRUST_FRAMEWORK_CATEGORIES,
  yearOf,
  anchorFor as anchorForEntry,
  type TrustFrameworkEntry,
  type TrustFrameworkCategory,
} from '@/data/trust-framework-releases-registry'
import { latestApiHubYear } from '@/data/release-notes-years'

const route = useRoute()

// `route.params.year` is `string | string[] | undefined`; for a single
// `[year]` segment it's always a string at runtime.
const year = computed<string>(() => {
  const raw = route.params['year']
  return typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw[0] ?? '') : ''
})

// ─── Base set ────────────────────────────────────────────────────────────
const yearEntries = computed<TrustFrameworkEntry[]>(() =>
  TRUST_FRAMEWORK_RELEASES
    .filter((e) => yearOf(e) === year.value)
    .slice()
    .sort((a, b) => {
      if (a.release !== b.release) return b.release.localeCompare(a.release, undefined, { numeric: true })
      return a.number - b.number
    }),
)

interface ReleaseGroupHead {
  release: string
  effectiveDate: string
  planned: boolean
}

const releases = computed<ReleaseGroupHead[]>(() => {
  const map = new Map<string, ReleaseGroupHead>()
  for (const e of yearEntries.value) {
    if (!map.has(e.release)) {
      map.set(e.release, { release: e.release, effectiveDate: e.effectiveDate, planned: !!e.planned })
    }
  }
  return [...map.values()]
})

// ─── Facet state ─────────────────────────────────────────────────────────
const query = ref<string>('')
const categoryFilter = reactive(new Set<TrustFrameworkCategory>())
const searchInput = ref<HTMLInputElement | null>(null)

function haystack(entry: TrustFrameworkEntry): string {
  const parts: string[] = [entry.title, entry.description ?? '', entry.release, entry.category]
  return parts.join(' \n ').toLowerCase()
}

// ─── Predicates ──────────────────────────────────────────────────────────
function matchesCategories(entry: TrustFrameworkEntry, cats: ReadonlySet<TrustFrameworkCategory>): boolean {
  if (cats.size === 0) return true
  return cats.has(entry.category)
}

function matchesQuery(entry: TrustFrameworkEntry, q: string): boolean {
  if (!q) return true
  return haystack(entry).includes(q)
}

const filteredEntries = computed<TrustFrameworkEntry[]>(() => {
  const q = query.value.trim().toLowerCase()
  return yearEntries.value.filter((e) =>
    matchesCategories(e, categoryFilter)
    && matchesQuery(e, q),
  )
})

interface ReleaseBucket {
  category: TrustFrameworkCategory
  entries: TrustFrameworkEntry[]
}

interface ReleaseGroup {
  release: string
  effectiveDate: string
  planned: boolean
  entries: TrustFrameworkEntry[]
  buckets: ReleaseBucket[]
}

const groupedResults = computed<ReleaseGroup[]>(() => {
  const groups = new Map<string, Omit<ReleaseGroup, 'buckets'>>()
  for (const e of filteredEntries.value) {
    let g = groups.get(e.release)
    if (!g) {
      g = { release: e.release, effectiveDate: e.effectiveDate, planned: !!e.planned, entries: [] }
      groups.set(e.release, g)
    }
    g.entries.push(e)
  }
  return [...groups.values()].map((g) => {
    const bucketMap = new Map<TrustFrameworkCategory, TrustFrameworkEntry[]>()
    for (const cat of TRUST_FRAMEWORK_CATEGORIES) bucketMap.set(cat, [])
    for (const e of g.entries) {
      const list = bucketMap.get(e.category)
      if (list) list.push(e)
      else bucketMap.set(e.category, [e])
    }
    const buckets: ReleaseBucket[] = [...bucketMap.entries()]
      .filter(([, items]) => items.length > 0)
      .map(([category, entries]) => ({ category, entries }))
    return { ...g, buckets }
  })
})

// ─── Smart counts ────────────────────────────────────────────────────────
interface CountOverrides {
  query?: string
  categories?: ReadonlySet<TrustFrameworkCategory>
}

function countWith(overrides: CountOverrides): number {
  const q = (overrides.query !== undefined ? overrides.query : query.value).trim().toLowerCase()
  const cats = overrides.categories !== undefined ? overrides.categories : categoryFilter
  return yearEntries.value.filter((e) =>
    matchesCategories(e, cats)
    && matchesQuery(e, q),
  ).length
}

function categoryCount(cat: TrustFrameworkCategory): number {
  const next = new Set<TrustFrameworkCategory>(categoryFilter)
  next.add(cat)
  return countWith({ categories: next })
}

// ─── Toggles ─────────────────────────────────────────────────────────────
function toggleCategory(cat: TrustFrameworkCategory): void {
  if (categoryFilter.has(cat)) categoryFilter.delete(cat)
  else categoryFilter.add(cat)
}

const anyFilterActive = computed<boolean>(() => !!query.value || categoryFilter.size > 0)

function resetFilters(): void {
  query.value = ''
  categoryFilter.clear()
}

// ─── URL helpers ─────────────────────────────────────────────────────────
function anchorFor(entry: TrustFrameworkEntry): string { return anchorForEntry(entry) }

function paragraphsOf(text: string | undefined): string[] {
  return String(text ?? '').split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

type CategoryTone = 'feature' | 'enhancement' | 'bugfix'

function toneOf(category: TrustFrameworkCategory): CategoryTone {
  if (category === 'New Features') return 'feature'
  if (category === 'Enhancements') return 'enhancement'
  return 'bugfix'
}

// ─── Highlight ───────────────────────────────────────────────────────────
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

function highlight(text: string): string {
  const safe = escapeHtml(text || '')
  const q = query.value.trim()
  if (!q) return safe
  const re = new RegExp(`(${escapeRegex(q)})`, 'ig')
  return safe.replace(re, '<mark class="ed-tfr-mark">$1</mark>')
}

// ─── URL <-> state sync ─────────────────────────────────────────────────
function isCategory(value: string): value is TrustFrameworkCategory {
  return (TRUST_FRAMEWORK_CATEGORIES as readonly string[]).includes(value)
}

function readFromUrl(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')
  if (q) query.value = q
  const cats = params.get('category')
  if (cats) {
    for (const c of cats.split(',').filter(Boolean)) {
      if (isCategory(c)) categoryFilter.add(c)
    }
  }
}

function writeToUrl(): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const sp = url.searchParams
  if (query.value) sp.set('q', query.value); else sp.delete('q')
  if (categoryFilter.size) sp.set('category', [...categoryFilter].join(',')); else sp.delete('category')
  window.history.replaceState({}, '', url.toString())
}

onMounted(() => readFromUrl())
watch([query, () => [...categoryFilter]], writeToUrl)
</script>

<template>
  <div v-if="yearEntries.length === 0" class="ed-tfr">
    <section class="ed-tfr-hero">
      <div class="ed-tfr-hero__inner">
        <h1 class="ed-tfr-hero__title">No releases recorded for {{ year }}</h1>
        <p class="ed-tfr-hero__sub">
          The Trust Framework release-notes register has no entries for <strong>{{ year }}</strong>.
          <router-link to="/tech/release-notes-and-erratas/">Back to Release Notes &amp; Erratas</router-link>.
        </p>
      </div>
    </section>
  </div>
  <div v-else class="ed-tfr">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-tfr-hero">
      <div class="ed-tfr-hero__inner">
        <div class="ed-tfr-hero__label">
          <span class="ed-tfr-hero__label-dash" />
          Directory deployments &middot; {{ year }}
        </div>
        <h1 class="ed-tfr-hero__title">Trust Framework Release Notes &mdash; {{ year }}</h1>
        <p class="ed-tfr-hero__sub">
          Changes deployed to the <strong>Trust Framework directory</strong> during
          {{ year }} &mdash; the Raidiam-operated directory, certificate authority, and
          role/scope reference data that underpins participant identity. Each entry
          records what was deployed, when it became effective, and its category.
        </p>

        <div class="ed-tfr-hero__vendor">
          <span class="ed-tfr-hero__vendor-label">Vendor</span>
          <span class="ed-tfr-hero__vendor-body">
            The directory is delivered by Raidiam. Full vendor release notes are at
            <a
              href="https://www.raidiam.com/developers/versioned-release-notes"
              target="_blank"
              rel="noopener"
            >raidiam.com/developers/versioned-release-notes</a>.
          </span>
        </div>

        <div class="ed-tfr-stats">
          <div class="ed-tfr-stat">
            <span class="ed-tfr-stat__num">{{ yearEntries.length }}</span>
            <span class="ed-tfr-stat__label">{{ yearEntries.length === 1 ? 'change' : 'changes' }}</span>
          </div>
          <div class="ed-tfr-stat">
            <span class="ed-tfr-stat__num">{{ releases.length }}</span>
            <span class="ed-tfr-stat__label">{{ releases.length === 1 ? 'release' : 'releases' }}</span>
          </div>
          <div class="ed-tfr-stat">
            <span class="ed-tfr-stat__num">{{ TRUST_FRAMEWORK_CATEGORIES.length }}</span>
            <span class="ed-tfr-stat__label">categories</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FACETED SEARCH + RESULTS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-tfr-search">
      <div class="ed-tfr-search__inner">

        <div class="ed-tfr-search__head">
          <div class="ed-tfr-search__eyebrow">
            <span class="ed-tfr-search__eyebrow-dash" />
            Filter the register
          </div>
          <h2 class="ed-tfr-search__title">Find a change</h2>
          <p class="ed-tfr-search__lede">
            Narrow by <strong>category</strong> or add a keyword to search titles and
            descriptions.
          </p>
        </div>

        <!-- Category facet -->
        <div class="ed-tfr-facet">
          <div class="ed-tfr-facet__label">Category</div>
          <div class="ed-tfr-facet__pills">
            <button
              v-for="cat in TRUST_FRAMEWORK_CATEGORIES"
              :key="cat"
              type="button"
              class="ed-tfr-pill"
              :class="{
                'ed-tfr-pill--active': categoryFilter.has(cat),
                'ed-tfr-pill--disabled': categoryCount(cat) === 0,
                [`ed-tfr-pill--${toneOf(cat)}`]: true,
              }"
              :disabled="categoryCount(cat) === 0 && !categoryFilter.has(cat)"
              @click="toggleCategory(cat)"
            >
              <span class="ed-tfr-pill__text">{{ cat }}</span>
              <span class="ed-tfr-pill__count">{{ categoryCount(cat) }}</span>
            </button>
          </div>
        </div>

        <!-- Keyword facet -->
        <div class="ed-tfr-facet ed-tfr-facet--keyword">
          <div class="ed-tfr-facet__label">Keyword</div>
          <div class="ed-tfr-input">
            <svg class="ed-tfr-input__icon" xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref="searchInput"
              v-model="query"
              type="search"
              class="ed-tfr-input__field"
              placeholder="Search title or description"
              autocomplete="off"
              spellcheck="false"
            />
            <button
              v-if="query"
              class="ed-tfr-input__clear"
              type="button"
              aria-label="Clear keyword"
              @click="query = ''"
            >&times;</button>
          </div>
        </div>

        <!-- Meter -->
        <div class="ed-tfr-meter">
          <span class="ed-tfr-meter__count">
            <strong>{{ filteredEntries.length }}</strong>
            of {{ yearEntries.length }}
            {{ yearEntries.length === 1 ? 'change' : 'changes' }}
          </span>
          <button
            v-if="anyFilterActive"
            type="button"
            class="ed-tfr-meter__reset"
            @click="resetFilters"
          >Reset filters &times;</button>
        </div>

        <!-- Results -->
        <div v-if="filteredEntries.length === 0" class="ed-tfr-empty">
          <div class="ed-tfr-empty__title">No changes match the current filters</div>
          <p class="ed-tfr-empty__body">
            Try removing a filter or clearing the keyword. The pill counts above show how
            many entries each filter would surface on its own.
          </p>
          <button class="ed-tfr-empty__btn" @click="resetFilters">Reset filters</button>
        </div>

        <div v-else class="ed-tfr-groups">
          <div
            v-for="group in groupedResults"
            :key="group.release"
            class="ed-tfr-group"
          >
            <div class="ed-tfr-group__head">
              <div class="ed-tfr-group__main">
                <div class="ed-tfr-group__tag">Release</div>
                <div class="ed-tfr-group__id">{{ group.release }}</div>
                <div class="ed-tfr-group__date">
                  {{ formatDate(group.effectiveDate) }}
                  <span v-if="group.planned" class="ed-tfr-group__planned">Planned</span>
                </div>
              </div>
              <div class="ed-tfr-group__count">
                {{ group.entries.length }} {{ group.entries.length === 1 ? 'change' : 'changes' }}
              </div>
            </div>

            <div
              v-for="bucket in group.buckets"
              :key="`${group.release}-${bucket.category}`"
              class="ed-tfr-bucket"
            >
              <div class="ed-tfr-bucket__head" :class="`ed-tfr-bucket__head--${toneOf(bucket.category)}`">
                <span class="ed-tfr-bucket__marker" />
                <span class="ed-tfr-bucket__label">{{ bucket.category }}</span>
                <span class="ed-tfr-bucket__count">{{ bucket.entries.length }}</span>
              </div>

              <article
                v-for="entry in bucket.entries"
                :id="anchorFor(entry)"
                :key="anchorFor(entry)"
                class="ed-tfr-card"
                :class="`ed-tfr-card--${toneOf(entry.category)}`"
              >
                <header class="ed-tfr-card__head">
                  <div class="ed-tfr-card__num">&sect;{{ entry.number }}</div>
                  <div class="ed-tfr-card__heading">
                    <h3 class="ed-tfr-card__title" v-html="highlight(entry.title)" />
                  </div>
                  <div class="ed-tfr-card__cat">
                    <span
                      class="ed-tfr-cat"
                      :class="`ed-tfr-cat--${toneOf(entry.category)}`"
                    >{{ entry.category }}</span>
                  </div>
                </header>

                <div v-if="entry.description" class="ed-tfr-card__body">
                  <p
                    v-for="(para, i) in paragraphsOf(entry.description)"
                    :key="`d-${entry.number}-${i}`"
                    class="ed-tfr-card__para"
                    v-html="highlight(para)"
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CROSS-LINK
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-tfr-cross">
      <div class="ed-tfr-cross__inner">
        <div class="ed-tfr-cross__eyebrow">
          <span class="ed-tfr-cross__eyebrow-dash" />
          Related registers
        </div>
        <p class="ed-tfr-cross__body">
          For changes deployed to the <strong>API Hub platform</strong> rather than the
          directory, see
          <a :href="`/tech/release-notes-and-erratas/release-notes/api-hub/${latestApiHubYear}`">
            API Hub Release Notes</a>.
          For corrections to <strong>published documentation</strong>, see
          <a href="/tech/release-notes-and-erratas/erratas/">Erratas</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-tfr {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-tfr-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-tfr-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-tfr-hero__label {
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

.ed-tfr-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-tfr-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.5rem, 5.5vw, 3.75rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-tfr-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-tfr-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-tfr-hero__vendor {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  padding: 0.8rem 1rem;
  margin: 1.5rem 0 0;
  max-width: 48rem;
  background: color-mix(in srgb, var(--at-blue-deep) 6%, transparent);
  border-left: 3px solid var(--at-blue-deep);
}

.ed-tfr-hero__vendor-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-blue-deep);
  flex-shrink: 0;
}

.ed-tfr-hero__vendor-body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}

.ed-tfr-hero__vendor-body a {
  color: var(--at-blue-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-tfr-hero__vendor-body a:hover { color: var(--at-navy-deep); }

.ed-tfr-stats {
  margin-top: 2.5rem;
  display: flex;
  gap: 0;
  border-top: 1px solid var(--at-grid-line);
}

.ed-tfr-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.4rem 1.5rem 0;
  border-right: 1px solid var(--at-grid-line);
}

.ed-tfr-stat:last-child { border-right: none; }
.ed-tfr-stat:first-child { padding-left: 0; }

.ed-tfr-stat__num {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
}

.ed-tfr-stat__label {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

/* ─── Search section ────────────────────────────────────────────────────── */
.ed-tfr-search {
  padding: 4rem 0 4.5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-tfr-search__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-tfr-search__head { max-width: 48rem; margin-bottom: 2rem; }

.ed-tfr-search__eyebrow {
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

.ed-tfr-search__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-tfr-search__title {
  font-family: var(--at-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-tfr-search__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
  max-width: 44rem;
}

.ed-tfr-search__lede strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Facet rows ────────────────────────────────────────────────────────── */
.ed-tfr-facet {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 1.25rem;
  align-items: start;
  padding: 1.1rem 0;
  border-top: 1px solid var(--at-grid-line);
}

.ed-tfr-facet:first-of-type { border-top: 1px solid var(--at-grid-line); }

.ed-tfr-facet--keyword { padding-bottom: 1.4rem; }

.ed-tfr-facet__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  padding-top: 0.55rem;
}

.ed-tfr-facet__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.ed-tfr-pill {
  --pill-tone: var(--at-teal);
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

.ed-tfr-pill--feature     { --pill-tone: var(--at-teal); }
.ed-tfr-pill--enhancement { --pill-tone: var(--at-blue-deep); }
.ed-tfr-pill--bugfix      { --pill-tone: var(--at-gold); }

.ed-tfr-pill:hover:not(.ed-tfr-pill--disabled) {
  border-color: var(--pill-tone);
  background: color-mix(in srgb, var(--pill-tone) 8%, var(--at-bg-cream));
}

.ed-tfr-pill--active {
  background: var(--pill-tone);
  border-color: var(--pill-tone);
  color: var(--at-bg-cream);
}

.ed-tfr-pill--active:hover { background: var(--pill-tone); }

.ed-tfr-pill--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ed-tfr-pill__text { line-height: 1; }

.ed-tfr-pill__count {
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

.ed-tfr-pill--active .ed-tfr-pill__count {
  background: color-mix(in srgb, var(--at-bg-cream) 30%, transparent);
  color: var(--at-bg-cream);
}

/* ─── Keyword input ─────────────────────────────────────────────────────── */
.ed-tfr-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ed-tfr-input:focus-within {
  border-color: var(--at-teal);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--at-teal) 22%, transparent);
}

.ed-tfr-input__icon {
  position: absolute;
  left: 1rem;
  color: var(--at-mute);
  pointer-events: none;
}

.ed-tfr-input__field {
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

.ed-tfr-input__field::placeholder {
  color: var(--at-mute);
  font-family: var(--at-mono);
  font-size: 0.8rem;
  letter-spacing: 0.01em;
}

.ed-tfr-input__field::-webkit-search-cancel-button { display: none; }

.ed-tfr-input__clear {
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

.ed-tfr-input__clear:hover {
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 14%, transparent);
}

/* ─── Meter ─────────────────────────────────────────────────────────────── */
.ed-tfr-meter {
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

.ed-tfr-meter__count strong {
  color: var(--at-navy-deep);
  font-weight: 700;
}

.ed-tfr-meter__reset {
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

.ed-tfr-meter__reset:hover {
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 14%, transparent);
}

/* ─── Empty state ───────────────────────────────────────────────────────── */
.ed-tfr-empty {
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2.5rem 2rem;
  text-align: center;
}

.ed-tfr-empty__title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  margin-bottom: 0.6rem;
}

.ed-tfr-empty__body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-mute-2);
  margin: 0 auto 1.4rem;
  max-width: 38rem;
  line-height: 1.6;
}

.ed-tfr-empty__btn {
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

.ed-tfr-empty__btn:hover { transform: translateY(-1px); }

/* ─── Groups (releases) ─────────────────────────────────────────────────── */
.ed-tfr-groups {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.ed-tfr-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ed-tfr-group__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0 0.85rem;
  border-bottom: 2px solid var(--at-teal);
}

.ed-tfr-group__main {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-tfr-group__tag {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
}

.ed-tfr-group__id {
  font-family: var(--at-mono);
  font-size: 1.25rem;
  letter-spacing: -0.005em;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-tfr-group__date {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-mute-2);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.ed-tfr-group__planned {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.45rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  border: 1px solid currentColor;
}

.ed-tfr-group__count {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
  white-space: nowrap;
}

/* ─── Category bucket ───────────────────────────────────────────────────── */
.ed-tfr-bucket {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.ed-tfr-bucket__head {
  --bucket-tone: var(--at-teal);
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.55rem 0 0.45rem;
  border-bottom: 1px dashed color-mix(in srgb, var(--bucket-tone) 40%, var(--at-grid-line));
}

.ed-tfr-bucket__head--feature     { --bucket-tone: var(--at-teal); }
.ed-tfr-bucket__head--enhancement { --bucket-tone: var(--at-blue-deep); }
.ed-tfr-bucket__head--bugfix      { --bucket-tone: var(--at-gold); }

.ed-tfr-bucket__marker {
  width: 8px;
  height: 8px;
  background: var(--bucket-tone);
  border-radius: 50%;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--bucket-tone) 18%, transparent);
}

.ed-tfr-bucket__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--bucket-tone);
}

.ed-tfr-bucket__count {
  margin-left: auto;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

/* ─── Entry card ────────────────────────────────────────────────────────── */
.ed-tfr-card {
  --card-tone: var(--at-teal);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--card-tone);
  display: flex;
  flex-direction: column;
  transition: border-color 0.15s ease;
}

.ed-tfr-card--feature     { --card-tone: var(--at-teal); }
.ed-tfr-card--enhancement { --card-tone: var(--at-blue-deep); }
.ed-tfr-card--bugfix      { --card-tone: var(--at-gold); }

.ed-tfr-card:hover {
  border-color: color-mix(in srgb, var(--card-tone) 45%, var(--at-grid-line));
  border-left-color: var(--card-tone);
}

.ed-tfr-card:target {
  border-color: var(--card-tone);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--card-tone) 18%, transparent);
}

.ed-tfr-card__head {
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  gap: 1rem;
  align-items: start;
  padding: 1.15rem 1.5rem 1rem;
}

.ed-tfr-card__num {
  font-family: var(--at-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--card-tone);
  padding-top: 0.2rem;
}

.ed-tfr-card__heading { min-width: 0; }

.ed-tfr-card__title {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.3;
  color: var(--at-navy-deep);
  margin: 0;
}

.ed-tfr-card__cat { padding-top: 0.2rem; }

.ed-tfr-cat {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  border: 1px solid currentColor;
}

.ed-tfr-cat--feature     { color: var(--at-teal); }
.ed-tfr-cat--enhancement { color: var(--at-blue-deep); }
.ed-tfr-cat--bugfix      { color: var(--at-gold); }

/* Card body */
.ed-tfr-card__body {
  padding: 0 1.5rem 1.15rem;
  padding-left: calc(1.5rem + 3rem + 1rem); /* align under title, past the § gutter */
}

.ed-tfr-card__para {
  font-family: var(--at-sans);
  font-size: 0.93rem;
  line-height: 1.6;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-tfr-card__para:last-of-type { margin-bottom: 0; }

.ed-tfr-mark {
  background: color-mix(in srgb, var(--at-teal) 30%, transparent);
  color: inherit;
  padding: 0 0.1em;
  border-radius: 0;
  font-weight: 600;
}

/* ─── Cross-link ────────────────────────────────────────────────────────── */
.ed-tfr-cross {
  padding: 3rem 0 4rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
}

.ed-tfr-cross__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-tfr-cross__eyebrow {
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

.ed-tfr-cross__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-tfr-cross__body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 48rem;
}

.ed-tfr-cross__body strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-tfr-cross__body a {
  color: var(--at-blue-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-tfr-cross__body a:hover { color: var(--at-navy-deep); }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-tfr-stats { flex-direction: column; gap: 0; border-top: 1px solid var(--at-grid-line); }
  .ed-tfr-stat {
    border-right: none;
    border-bottom: 1px solid var(--at-grid-line);
    padding: 1.1rem 0;
  }
  .ed-tfr-stat:last-child { border-bottom: none; }

  .ed-tfr-facet { grid-template-columns: 1fr; gap: 0.55rem; }
  .ed-tfr-facet__label { padding-top: 0; }

  .ed-tfr-group__head { flex-wrap: wrap; align-items: flex-start; }
  .ed-tfr-card__head {
    grid-template-columns: 2.5rem 1fr;
    grid-template-rows: auto auto;
    row-gap: 0.5rem;
  }
  .ed-tfr-card__cat { grid-column: 2 / 3; }
  .ed-tfr-card__body { padding-left: 1.5rem; }
}

@media (max-width: 640px) {
  .ed-tfr-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-tfr-search { padding: 3rem 0 3.5rem; }
  .ed-tfr-search__inner { padding: 0 1.25rem; }
  .ed-tfr-cross { padding: 2.5rem 0 3rem; }
  .ed-tfr-cross__inner { padding: 0 1.25rem; }
  .ed-tfr-card__head { padding: 1rem 1.1rem 0.85rem; }
  .ed-tfr-card__body { padding: 0 1.1rem 1rem; }
  .ed-tfr-input__field { padding: 0.8rem 2.6rem 0.8rem 2.6rem; font-size: 0.82rem; }
  .ed-tfr-input__field::placeholder { font-size: 0.74rem; }
  .ed-tfr-pill { font-size: 0.8rem; padding: 0.4rem 0.65rem; }
}
</style>

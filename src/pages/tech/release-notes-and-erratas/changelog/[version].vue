<route lang="yaml">
meta:
  title: Version Changelog
</route>

<script setup lang="ts">
import {
  anchorFor,
  changesFor,
  changelogVersions,
  specUrl,
  type ChangeAudience,
  type ChangeCategory,
  type VersionChange,
} from '@/data/version-changes-registry'
import { CURRENT_VERSION } from '@/data/versions'

// ── Route → version param ────────────────────────────────────────────────
const route = useRoute()
const versionParam = computed<string>(() => {
  const raw = route.params.version
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw) && typeof raw[0] === 'string') return raw[0]
  return ''
})

const versionExists = computed(() => changelogVersions.includes(versionParam.value))
const version = computed(() => versionParam.value)
const availableVersionsLabel = computed(() => changelogVersions.join(', '))

const versionChanges = computed<VersionChange[]>(() => changesFor(versionParam.value))
const fromVersion = computed<string>(() => versionChanges.value[0]?.fromVersion ?? CURRENT_VERSION)

// Resolved once per version rather than per chip: specUrl() scans the whole
// endpoint catalogue, and the template would otherwise call it twice for every
// chip on every render (once to test, once for the href).
const specLinks = computed<Record<string, string | null>>(() => {
  const out: Record<string, string | null> = {}
  for (const c of versionChanges.value) {
    for (const sp of c.specs ?? []) {
      if (!(sp in out)) out[sp] = specUrl(sp, c.toVersion)
    }
  }
  return out
})

const areaCountTotal = computed(
  () => new Set(versionChanges.value.flatMap((c) => c.areas)).size,
)

// ─── Facets ───────────────────────────────────────────────────────────────
const AUDIENCE_OPTIONS: readonly ChangeAudience[] = ['TPP', 'LFI', 'Both'] as const
const CATEGORY_OPTIONS: readonly ChangeCategory[] = [
  'Version uplift',
  'New capability',
  'Behaviour change',
  'No change',
] as const

const audienceFilter = ref<ChangeAudience | null>(null)
const categoryFilter = ref<Set<ChangeCategory>>(new Set())
const areaFilter = ref<Set<string>>(new Set())
const query = ref<string>('')

const availableAreas = computed<string[]>(() =>
  [...new Set(versionChanges.value.flatMap((c) => c.areas))].sort(),
)

function matchesAudience(c: VersionChange): boolean {
  if (!audienceFilter.value) return true
  // A change marked "Both" is relevant whichever audience is selected.
  return c.audience === audienceFilter.value || c.audience === 'Both'
}

function matchesCategory(c: VersionChange): boolean {
  return categoryFilter.value.size === 0 || categoryFilter.value.has(c.category)
}

function matchesArea(c: VersionChange): boolean {
  if (areaFilter.value.size === 0) return true
  return c.areas.some((a) => areaFilter.value.has(a))
}

function haystack(c: VersionChange): string {
  return [
    c.title,
    c.summary,
    c.description,
    c.category,
    ...c.areas,
    ...(c.specs ?? []),
    ...(c.endpoints ?? []).map((e) => e.label),
  ].join(' ').toLowerCase()
}

function matchesQuery(c: VersionChange): boolean {
  const q = query.value.trim().toLowerCase()
  if (!q) return true
  return haystack(c).includes(q)
}

const filteredChanges = computed<VersionChange[]>(() =>
  versionChanges.value.filter(
    (c) => matchesAudience(c) && matchesCategory(c) && matchesArea(c) && matchesQuery(c),
  ),
)

// Pill counts reflect what each facet would surface on its own, holding the
// other facets fixed — same behaviour as the errata register.
function countWith(pred: (c: VersionChange) => boolean): number {
  return versionChanges.value.filter(
    (c) => pred(c) && matchesQuery(c),
  ).length
}

function audienceCount(a: ChangeAudience): number {
  return countWith((c) => (c.audience === a || c.audience === 'Both') && matchesCategory(c) && matchesArea(c))
}
function categoryCount(cat: ChangeCategory): number {
  return countWith((c) => c.category === cat && matchesAudience(c) && matchesArea(c))
}
function areaCount(area: string): number {
  return countWith((c) => c.areas.includes(area) && matchesAudience(c) && matchesCategory(c))
}

function toggleAudience(a: ChangeAudience): void {
  audienceFilter.value = audienceFilter.value === a ? null : a
}
function toggleCategory(c: ChangeCategory): void {
  const next = new Set(categoryFilter.value)
  if (next.has(c)) next.delete(c)
  else next.add(c)
  categoryFilter.value = next
}
function toggleArea(a: string): void {
  const next = new Set(areaFilter.value)
  if (next.has(a)) next.delete(a)
  else next.add(a)
  areaFilter.value = next
}

const anyFilterActive = computed(
  () =>
    audienceFilter.value !== null ||
    categoryFilter.value.size > 0 ||
    areaFilter.value.size > 0 ||
    query.value.trim() !== '',
)

function resetFilters(): void {
  audienceFilter.value = null
  categoryFilter.value = new Set()
  areaFilter.value = new Set()
  query.value = ''
}

function setQuery(v: string): void {
  query.value = v
}

// ─── Keyword highlighting ─────────────────────────────────────────────────
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(text: string): string {
  const safe = escapeHtml(text)
  const q = query.value.trim()
  if (!q) return safe
  return safe.replace(new RegExp(`(${escapeRegExp(escapeHtml(q))})`, 'gi'), '<mark>$1</mark>')
}

// Description and rationale are authored with \n\n paragraph breaks and
// `backticked` identifiers.
function toParagraphs(text: string): string[] {
  return text.split('\n\n').map((p) => p.trim()).filter(Boolean)
}

function renderProse(text: string): string {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>')
}

// Path segments are kebab-case, so title-casing each word is right for most of
// them ("data-sharing" → "Data Sharing"). These are the ones where it is not:
// they are initialisms, and "Api Hub" or "Psu" reads as a typo.
const LABEL_INITIALISMS: Record<string, string> = {
  api: 'API',
  atm: 'ATM',
  cmi: 'CMI',
  fx: 'FX',
  lfi: 'LFI',
  psu: 'PSU',
  tpp: 'TPP',
}

function labelWord(word: string): string {
  const initialism = LABEL_INITIALISMS[word.toLowerCase()]
  if (initialism) return initialism
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function shortLabel(path: string): string {
  const segs = path.split('/').filter(Boolean)
  // Drop `tech`, the surface, and the version — what remains names the area.
  const rest = segs.slice(3)
  if (rest.length === 0) return segs[1] === 'tpp-standards' ? 'TPP Standards' : 'LFI Guide'
  return rest
    .map((s) => s.split('-').map(labelWord).join(' '))
    .join(' · ')
}
</script>

<template>
  <div v-if="!versionExists" class="ed-cl ed-cl--missing">
    <section class="ed-cl-hero">
      <div class="ed-cl-hero__inner">
        <div class="ed-cl-hero__label">
          <span class="ed-cl-hero__label-dash" />
          Changelog not found
        </div>
        <h1 class="ed-cl-hero__title">No changelog for &ldquo;{{ versionParam }}&rdquo;</h1>
        <p class="ed-cl-hero__sub">
          A changelog exists only for versions that introduce changes against a prior
          version. Try one of: {{ availableVersionsLabel }}.
        </p>
        <p class="ed-cl-hero__sub">
          <a href="/tech/release-notes-and-erratas/" class="ed-cl-back">
            &larr; Back to Release Notes &amp; Erratas
          </a>
        </p>
      </div>
    </section>
  </div>

  <div v-else class="ed-cl">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-cl-hero">
      <div class="ed-cl-hero__inner">
        <div class="ed-cl-hero__label">
          <span class="ed-cl-hero__label-dash" />
          Changes between versions &middot; {{ fromVersion }} &rarr; {{ version }}
        </div>
        <h1 class="ed-cl-hero__title">Version Changelog</h1>
        <p class="ed-cl-hero__sub">
          Every change made between <strong>{{ fromVersion }}</strong> and
          <strong>{{ version }}</strong> &mdash; across the TPP Standards, the LFI
          Integration Guide, and the OpenAPI specifications. Each entry records what
          changed and who it affects.
        </p>

        <div class="ed-cl-stats">
          <div class="ed-cl-stat">
            <span class="ed-cl-stat__num">{{ versionChanges.length }}</span>
            <span class="ed-cl-stat__label">
              {{ versionChanges.length === 1 ? 'change' : 'changes' }}
            </span>
          </div>
          <div class="ed-cl-stat">
            <span class="ed-cl-stat__num">{{ areaCountTotal }}</span>
            <span class="ed-cl-stat__label">areas touched</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FACETED SEARCH + RESULTS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-cl-search">
      <div class="ed-cl-search__inner">

        <div class="ed-cl-search__head">
          <div class="ed-cl-search__eyebrow">
            <span class="ed-cl-search__eyebrow-dash" />
            Filter the changelog
          </div>
          <h2 class="ed-cl-search__title">Find a change</h2>
          <p class="ed-cl-search__lede">
            Narrow by <strong>audience</strong>, <strong>type of change</strong>, or
            <strong>functional area</strong>. Add a keyword to refine further. Click an
            area chip on a result to open the page the change applies to.
          </p>
        </div>

        <!-- Audience facet -->
        <div class="ed-cl-facet">
          <div class="ed-cl-facet__label">Audience</div>
          <div class="ed-cl-facet__pills">
            <button
              v-for="opt in AUDIENCE_OPTIONS"
              :key="opt"
              type="button"
              class="ed-cl-pill"
              :class="{
                'ed-cl-pill--active': audienceFilter === opt,
                'ed-cl-pill--disabled': audienceCount(opt) === 0,
              }"
              :disabled="audienceCount(opt) === 0 && audienceFilter !== opt"
              @click="toggleAudience(opt)"
            >
              <span class="ed-cl-pill__text">{{ opt }}</span>
              <span class="ed-cl-pill__count">{{ audienceCount(opt) }}</span>
            </button>
          </div>
        </div>

        <!-- Change-type facet -->
        <div class="ed-cl-facet">
          <div class="ed-cl-facet__label">Type of change</div>
          <div class="ed-cl-facet__pills">
            <button
              v-for="cat in CATEGORY_OPTIONS"
              :key="cat"
              type="button"
              class="ed-cl-pill"
              :class="{
                'ed-cl-pill--active': categoryFilter.has(cat),
                'ed-cl-pill--disabled': categoryCount(cat) === 0,
              }"
              :disabled="categoryCount(cat) === 0 && !categoryFilter.has(cat)"
              @click="toggleCategory(cat)"
            >
              <span class="ed-cl-pill__text">{{ cat }}</span>
              <span class="ed-cl-pill__count">{{ categoryCount(cat) }}</span>
            </button>
          </div>
        </div>

        <!-- Functional area facet -->
        <div class="ed-cl-facet">
          <div class="ed-cl-facet__label">Functional area</div>
          <div class="ed-cl-facet__pills">
            <button
              v-for="area in availableAreas"
              :key="area"
              type="button"
              class="ed-cl-pill"
              :class="{
                'ed-cl-pill--active': areaFilter.has(area),
                'ed-cl-pill--disabled': areaCount(area) === 0,
              }"
              :disabled="areaCount(area) === 0 && !areaFilter.has(area)"
              @click="toggleArea(area)"
            >
              <span class="ed-cl-pill__text">{{ area }}</span>
              <span class="ed-cl-pill__count">{{ areaCount(area) }}</span>
            </button>
          </div>
        </div>

        <!-- Keyword facet -->
        <div class="ed-cl-facet ed-cl-facet--keyword">
          <div class="ed-cl-facet__label">Keyword</div>
          <div class="ed-cl-input">
            <svg class="ed-cl-input__icon" xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              v-model="query"
              type="search"
              class="ed-cl-input__field"
              placeholder="Search title, summary, description, spec, or endpoint"
              autocomplete="off"
              spellcheck="false"
            />
            <button
              v-if="query"
              class="ed-cl-input__clear"
              type="button"
              aria-label="Clear keyword"
              @click="query = ''"
            >&times;</button>
          </div>
        </div>

        <!-- Meter -->
        <div class="ed-cl-meter">
          <span class="ed-cl-meter__count">
            <strong>{{ filteredChanges.length }}</strong>
            of {{ versionChanges.length }}
            {{ versionChanges.length === 1 ? 'change' : 'changes' }}
          </span>
          <button
            v-if="anyFilterActive"
            type="button"
            class="ed-cl-meter__reset"
            @click="resetFilters"
          >Reset filters &times;</button>
        </div>

        <!-- Results -->
        <div v-if="filteredChanges.length === 0" class="ed-cl-empty">
          <div class="ed-cl-empty__title">No changes match the current filters</div>
          <p class="ed-cl-empty__body">
            Try removing a filter or clearing the keyword. The pill counts above show how
            many changes each filter would surface on its own.
          </p>
          <button class="ed-cl-empty__btn" @click="resetFilters">Reset filters</button>
        </div>

        <div v-else class="ed-cl-rows">
          <article
            v-for="c in filteredChanges"
            :id="anchorFor(c)"
            :key="c.number"
            class="ed-cl-row"
          >
            <div class="ed-cl-row__num">&sect;{{ c.number }}</div>

            <div class="ed-cl-row__body">
              <div class="ed-cl-row__tags">
                <span class="ed-cl-tag ed-cl-tag--cat">{{ c.category }}</span>
                <span class="ed-cl-tag ed-cl-tag--aud">{{ c.audience }}</span>
              </div>

              <h3 class="ed-cl-row__title" v-html="highlight(c.title)" />
              <div class="ed-cl-row__summary" v-html="highlight(c.summary)" />

              <div class="ed-cl-row__section">
                <div class="ed-cl-row__section-label">What changed</div>
                <p
                  v-for="(p, i) in toParagraphs(c.description)"
                  :key="`d-${i}`"
                  class="ed-cl-row__prose"
                  v-html="renderProse(p)"
                />
              </div>

              <a
                v-for="d in c.docsPaths || []"
                :key="`d-${d.path}`"
                :href="d.path"
                class="ed-cl-row__spec"
              >
                <span class="ed-cl-row__spec-label">{{ d.label }}</span>
                <span class="ed-cl-row__spec-link">{{ shortLabel(d.path) }} &rarr;</span>
              </a>

              <div class="ed-cl-row__chips">
                <a
                  v-for="p in c.affectedPaths"
                  :key="`p-${p}`"
                  :href="p"
                  class="ed-cl-chip ed-cl-chip--sec"
                  :title="`Open ${shortLabel(p)}`"
                >{{ shortLabel(p) }} &rarr;</a>

                <button
                  v-for="ep in c.endpoints || []"
                  :key="`ep-${ep.label}`"
                  class="ed-cl-chip ed-cl-chip--ep"
                  type="button"
                  :title="`Search keyword: ${ep.label}`"
                  @click="setQuery(ep.label)"
                >{{ ep.label }}</button>

                <template v-for="sp in c.specs || []" :key="`sp-${sp}`">
                  <a
                    v-if="specLinks[sp]"
                    :href="specLinks[sp] as string"
                    class="ed-cl-chip ed-cl-chip--sc"
                    :title="`Open the ${sp} API reference`"
                  >{{ sp }} &rarr;</a>
                  <!-- No catalogue entry at this version — fall back to
                       searching the register rather than a dead link. -->
                  <button
                    v-else
                    class="ed-cl-chip ed-cl-chip--sc"
                    type="button"
                    :title="`Search keyword: ${sp}`"
                    @click="setQuery(sp)"
                  >{{ sp }}</button>
                </template>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         GOVERNANCE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-cl-ref">
      <div class="ed-cl-ref__inner">
        <div class="ed-cl-ref__head">
          <div class="ed-cl-ref__eyebrow">
            <span class="ed-cl-ref__eyebrow-dash" />
            Governance
          </div>
          <h2 class="ed-cl-ref__title">How this register works</h2>
          <p class="ed-cl-ref__lede">
            The changelog records differences <strong>between</strong> versions. Corrections
            made to a version <strong>after</strong> it was published belong in the Errata
            register instead &mdash; the two are kept separate so that
            &ldquo;what changed in the new version&rdquo; never blurs into
            &ldquo;what we got wrong in the old one&rdquo;.
          </p>
        </div>

        <div class="ed-cl-ref__grid">
          <a
            :href="`/tech/release-notes-and-erratas/erratas/${CURRENT_VERSION}/`"
            class="ed-cl-ref__tile"
          >
            <div class="ed-cl-ref__tile-meta">
              <span class="ed-cl-ref__tile-meta-dash" />
              Register
            </div>
            <h3 class="ed-cl-ref__tile-title">Erratas</h3>
            <p class="ed-cl-ref__tile-body">
              Corrections to published documentation against a released version.
            </p>
          </a>

          <a href="/policy/version-management" class="ed-cl-ref__tile">
            <div class="ed-cl-ref__tile-meta">
              <span class="ed-cl-ref__tile-meta-dash" />
              Policy
            </div>
            <h3 class="ed-cl-ref__tile-title">Version Management</h3>
            <p class="ed-cl-ref__tile-body">
              How versions are numbered, and how Standards, API Hub, and Ozone Connect
              versions relate.
            </p>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-cl {
  background: var(--at-bg-cream);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-cl-hero {
  border-bottom: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-cl-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 3.5rem 1.5rem 2.75rem;
}

.ed-cl-hero__label,
.ed-cl-search__eyebrow,
.ed-cl-ref__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 1rem;
}

.ed-cl-hero__label-dash,
.ed-cl-search__eyebrow-dash,
.ed-cl-ref__eyebrow-dash {
  width: 26px;
  height: 1px;
  background: var(--at-gold);
}

.ed-cl-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.9rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--at-navy-deep);
  margin: 0 0 1rem;
}

.ed-cl-hero__sub {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  max-width: 62ch;
  margin: 0 0 0.75rem;
}

.ed-cl-back {
  color: var(--at-blue-deep);
  text-decoration: underline;
}

.ed-cl-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin-top: 2rem;
}

.ed-cl-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ed-cl-stat__num {
  font-family: var(--at-serif);
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  color: var(--at-navy-deep);
}

.ed-cl-stat__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
}

/* ─── Search ────────────────────────────────────────────────────────────── */
.ed-cl-search__inner,
.ed-cl-ref__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.ed-cl-search__title,
.ed-cl-ref__title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 500;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}

.ed-cl-search__lede,
.ed-cl-ref__lede {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  max-width: 66ch;
  margin: 0 0 2rem;
}

.ed-cl-facet {
  margin-bottom: 1.25rem;
}

.ed-cl-facet__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 0.5rem;
}

.ed-cl-facet__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.ed-cl-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.7rem;
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}

.ed-cl-pill:hover:not(:disabled) {
  border-color: var(--at-blue-deep);
}

.ed-cl-pill--active {
  background: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
  color: #fff;
}

.ed-cl-pill--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ed-cl-pill__count {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  opacity: 0.75;
}

.ed-cl-facet--keyword {
  max-width: 560px;
}

.ed-cl-input {
  position: relative;
  display: flex;
  align-items: center;
}

.ed-cl-input__icon {
  position: absolute;
  left: 0.65rem;
  color: var(--at-mute);
  pointer-events: none;
}

.ed-cl-input__field {
  width: 100%;
  padding: 0.6rem 2rem 0.6rem 2.4rem;
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-radius: 0;
}

.ed-cl-input__field:focus {
  outline: none;
  border-color: var(--at-blue-deep);
}

.ed-cl-input__clear {
  position: absolute;
  right: 0.5rem;
  font-size: 1.2rem;
  line-height: 1;
  color: var(--at-mute);
  background: none;
  border: 0;
  cursor: pointer;
}

.ed-cl-meter {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-cl-meter__reset {
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  color: var(--at-blue-deep);
  background: none;
  border: 0;
  cursor: pointer;
}

/* ─── Results ───────────────────────────────────────────────────────────── */
.ed-cl-empty {
  padding: 2.5rem;
  text-align: center;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-cl-empty__title {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  color: var(--at-navy-deep);
  margin-bottom: 0.5rem;
}

.ed-cl-empty__body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-mute-2);
  max-width: 52ch;
  margin: 0 auto 1.25rem;
}

.ed-cl-empty__btn {
  padding: 0.5rem 1rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
}

.ed-cl-rows {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ed-cl-row {
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  scroll-margin-top: calc(var(--at-header-height) + 1rem);
}

.ed-cl-row__num {
  flex-shrink: 0;
  font-family: var(--at-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--at-mute);
  padding-top: 0.15rem;
}

.ed-cl-row__body {
  flex: 1;
  min-width: 0;
}

.ed-cl-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.6rem;
}

.ed-cl-tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.18rem 0.45rem;
}

.ed-cl-tag--cat {
  color: var(--at-navy-deep);
  background: rgba(0, 23, 56, 0.07);
}

.ed-cl-tag--aud {
  color: var(--at-blue-deep);
  background: rgba(0, 92, 169, 0.09);
}

.ed-cl-row__title {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--at-navy-deep);
  margin: 0 0 0.4rem;
}

.ed-cl-row__summary {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin-bottom: 1rem;
}

.ed-cl-row__section {
  margin-bottom: 1rem;
}

.ed-cl-row__section-label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 0.35rem;
}

.ed-cl-row__prose {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--at-navy-deep);
  margin: 0 0 0.6rem;
}

.ed-cl-row__prose :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.85em;
  padding: 0.1rem 0.3rem;
  background: rgba(0, 23, 56, 0.06);
}

.ed-cl-row__spec {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0 0.25rem;
  padding: 0.75rem 1rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  transition: border-color 0.15s;
}

/* A change spanning both surfaces stacks one link per surface; they read as one
   block rather than two, so only the first carries the separating margin. */
.ed-cl-row__spec + .ed-cl-row__spec {
  margin-top: 0.35rem;
}

.ed-cl-row__spec:hover {
  border-color: var(--at-blue-deep);
}

.ed-cl-row__spec-label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-cl-row__spec-link {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-blue-deep);
}

.ed-cl-row__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}

.ed-cl-chip {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  cursor: pointer;
  text-decoration: none;
}

.ed-cl-chip--sec:hover,
a.ed-cl-chip--sc:hover {
  border-color: var(--at-blue-deep);
  color: var(--at-blue-deep);
}

.ed-cl-row__summary :deep(mark),
.ed-cl-row__title :deep(mark) {
  background: #fde68a;
  color: inherit;
}

/* ─── Governance ────────────────────────────────────────────────────────── */
.ed-cl-ref {
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-cl-ref__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.ed-cl-ref__tile {
  display: block;
  padding: 1.5rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  transition: border-color 0.15s;
}

.ed-cl-ref__tile:hover {
  border-color: var(--at-blue-deep);
}

.ed-cl-ref__tile-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 0.6rem;
}

.ed-cl-ref__tile-meta-dash {
  width: 18px;
  height: 1px;
  background: var(--at-gold);
}

.ed-cl-ref__tile-title {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  margin: 0 0 0.4rem;
}

.ed-cl-ref__tile-body {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

@media (max-width: 700px) {
  .ed-cl-row {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

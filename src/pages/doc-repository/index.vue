<route lang="yaml">
meta:
  title: Document Repository
  isIndex: true
</route>

<script setup lang="ts">
// Fetched live so the index stays in sync with new production participants
// without a rebuild — the dynamic `[id].vue` pages are SSG-baked from the
// build-time `trust-framework.json` snapshot. Soft-fails.
const DOCS_API = 'https://docs.nebras-open-finance.com'

type CategoryId = 'LFI' | 'TPP' | 'Authority'
const CATEGORY_ORDER: readonly CategoryId[] = ['LFI', 'TPP']

const CATEGORY_COLORS: Record<CategoryId, string> = {
  LFI: 'var(--at-teal)',
  TPP: 'var(--at-gold)',
  Authority: 'var(--at-blue-deep)',
}
const CATEGORY_TAG_BG: Record<CategoryId, string> = {
  LFI: 'rgba(0, 194, 169, 0.10)',
  TPP: 'rgba(179, 120, 25, 0.10)',
  Authority: 'rgba(0, 67, 166, 0.10)',
}
const TYPE_LABEL: Record<CategoryId, string> = {
  LFI: 'LFI',
  TPP: 'TPP',
  Authority: 'Authority',
}

interface RawOrganisation {
  id?: string
  name?: string
  legalName?: string
  logoUri?: string | null
  type?: string
  isProduction?: boolean
  lfiGoLiveDate?: string
  tppGoLiveDate?: string
}

interface OrgCard {
  id: string
  name: string
  legalName: string
  logo: string
  type: CategoryId
  tags: string[]
  lfiGoLiveDate: string
  tppGoLiveDate: string
  link: string
}

interface CategoryOption {
  id: 'all' | CategoryId
  label: string
  count: number
  color: string
}

const ALL_CATEGORY_IDS: readonly ('all' | CategoryId)[] = ['all', 'LFI', 'TPP', 'Authority']

const organisations = ref<OrgCard[]>([])
const loading = ref<boolean>(true)
const error = ref<string>('')

// Bind search + filter to the URL via the shared composable. Keeps a shared
// link to a filtered view round-trippable through the back/forward buttons.
const queryParam = useUrlSearchParam<string>('q', '')
const categoryParam = useUrlSearchParam<'all' | CategoryId>('type', 'all', {
  allowed: ALL_CATEGORY_IDS,
})

const query = queryParam.value
const activeCategory = categoryParam.value

function isCategoryId(s: string): s is CategoryId {
  return s === 'LFI' || s === 'TPP' || s === 'Authority'
}

function toCard(o: RawOrganisation): OrgCard | null {
  if (!o.id || !o.name || !o.legalName || !o.type || !isCategoryId(o.type)) return null
  const tags: string[] = [o.type]
  // An LFI with a tppGoLiveDate is also acting as a TPP — surface both.
  if (o.type === 'LFI' && o.tppGoLiveDate) tags.push('TPP')
  return {
    id: o.id,
    name: o.name,
    legalName: o.legalName,
    logo: o.logoUri || '',
    type: o.type,
    tags,
    lfiGoLiveDate: o.lfiGoLiveDate || '',
    tppGoLiveDate: o.tppGoLiveDate || '',
    link: `/doc-repository/${o.id}/`,
  }
}

onMounted(async () => {
  try {
    const res = await fetch(`${DOCS_API}/`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: unknown = await res.json()
    const list: RawOrganisation[] = Array.isArray(data) ? (data as RawOrganisation[]) : []
    // Document repository pages only exist for production participants.
    // Sandbox participants appear in the homepage scroller/counts only.
    organisations.value = list
      .filter(o => o.isProduction === true)
      .map(toCard)
      .filter((o): o is OrgCard => o !== null)
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

const categories = computed<CategoryOption[]>(() => {
  const counts: Partial<Record<CategoryId, number>> = {}
  for (const o of organisations.value) {
    counts[o.type] = (counts[o.type] ?? 0) + 1
  }
  const ordered: CategoryOption[] = CATEGORY_ORDER
    .filter(id => (counts[id] ?? 0) > 0)
    .map(id => ({
      id,
      label: TYPE_LABEL[id],
      count: counts[id] ?? 0,
      color: CATEGORY_COLORS[id],
    }))
  return [
    {
      id: 'all',
      label: 'All',
      count: organisations.value.length,
      color: 'var(--at-navy)',
    },
    ...ordered,
  ]
})

const filteredOrgs = computed<OrgCard[]>(() => {
  const q = query.value.trim().toLowerCase()
  return organisations.value.filter(o => {
    if (activeCategory.value !== 'all' && o.type !== activeCategory.value) return false
    if (!q) return true
    return (
      o.name.toLowerCase().includes(q) ||
      o.legalName.toLowerCase().includes(q) ||
      o.tags.some(t => t.toLowerCase().includes(q))
    )
  })
})

const activeColor = computed<string>(() => {
  const hit = categories.value.find(c => c.id === activeCategory.value)
  return hit ? hit.color : 'var(--at-navy)'
})

function colorFor(type: CategoryId): string {
  return CATEGORY_COLORS[type]
}
function tagBackground(type: CategoryId): string {
  return CATEGORY_TAG_BG[type]
}
function typeLabel(type: CategoryId): string {
  return TYPE_LABEL[type]
}

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

function formatGoLive(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getUTCDate()} ${MONTH_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}
function earliestGoLive(org: OrgCard): string {
  const dates = [org.lfiGoLiveDate, org.tppGoLiveDate].filter(Boolean).sort()
  return dates[0] || ''
}

function setCategory(id: 'all' | CategoryId): void {
  categoryParam.set(id)
}
function clearQuery(): void {
  queryParam.set('')
}
</script>

<template>
  <div class="ed-kb">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-kb-hero">
      <div class="ed-kb-hero__inner">
        <div class="ed-kb-hero__label">
          <span class="ed-kb-hero__label-dash" />
          Directory &middot; Participants &middot; Documents
        </div>
        <h1 class="ed-kb-hero__title">Document Repository</h1>
        <p class="ed-kb-hero__sub">
          Public documentation from Licensed Financial Institutions and Third-Party Providers
          participating in UAE Open Finance.
        </p>

        <div class="ed-kb-search">
          <svg class="ed-kb-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input v-model="query" class="ed-kb-search__input" type="search"
            placeholder="Search organisations&hellip;"
            aria-label="Search organisations" />
          <button v-if="query" class="ed-kb-search__clear" @click="clearQuery"
            aria-label="Clear search">&times;</button>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CATEGORY FILTER
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-kb-filter">
      <div class="ed-kb-filter__inner">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="ed-kb-chip"
          :class="{ 'ed-kb-chip--active': activeCategory === cat.id }"
          :style="activeCategory === cat.id
            ? { background: cat.color, borderColor: cat.color, color: 'var(--at-bg-cream)' }
            : { borderColor: 'var(--at-grid-line)', color: 'var(--at-navy)' }"
          @click="setCategory(cat.id)"
        >
          {{ cat.label }} &middot; {{ cat.count }}
        </button>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         ORGANISATIONS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-kb-articles">
      <div class="ed-kb-articles__inner">

        <div v-if="loading" class="ed-kb-empty">
          <div class="ed-kb-empty__icon">&#x29D6;</div>
          <h3 class="ed-kb-empty__title">Loading organisations&hellip;</h3>
        </div>

        <div v-else-if="error" class="ed-kb-empty">
          <div class="ed-kb-empty__icon">&#x26A0;</div>
          <h3 class="ed-kb-empty__title">Could not load organisations</h3>
          <p class="ed-kb-empty__sub"><strong>{{ error }}</strong></p>
        </div>

        <template v-else>
          <div class="ed-kb-count" :style="{ color: activeColor }">
            {{ filteredOrgs.length }}
            {{ filteredOrgs.length === 1 ? 'Organisation' : 'Organisations' }}
            <template v-if="query">&middot; Search: "{{ query }}"</template>
          </div>

          <div v-if="filteredOrgs.length > 0" class="ed-kb-grid">
            <router-link
              v-for="org in filteredOrgs"
              :key="org.id"
              :to="org.link"
              class="ed-kb-card"
              :style="{ '--kb-card-color': colorFor(org.type) }"
            >
              <span class="ed-kb-card__top" :style="{ background: colorFor(org.type) }" />

              <div class="ed-kb-card__meta">
                <span class="ed-kb-card__cat" :style="{ color: colorFor(org.type) }">
                  {{ typeLabel(org.type) }}
                </span>
              </div>

              <div class="ed-kb-card__head">
                <img v-if="org.logo" :src="org.logo" :alt="org.name" class="ed-kb-card__logo" />
                <div v-else class="ed-kb-card__logo ed-kb-card__logo--placeholder">
                  {{ org.name.charAt(0) }}
                </div>
                <h3 class="ed-kb-card__title">{{ org.name }}</h3>
              </div>

              <p class="ed-kb-card__desc">{{ org.legalName }}</p>

              <div v-if="org.tags.length" class="ed-kb-card__tags">
                <span
                  v-for="tag in org.tags"
                  :key="tag"
                  class="ed-kb-card__tag"
                  :style="{
                    background: tagBackground(org.type),
                    color: colorFor(org.type),
                  }"
                >{{ tag }}</span>
              </div>

              <div class="ed-kb-card__foot">
                <span v-if="earliestGoLive(org)" class="ed-kb-card__updated">
                  Live since {{ formatGoLive(earliestGoLive(org)) }}
                </span>
                <span class="ed-kb-card__arrow" :style="{ color: colorFor(org.type) }">&rarr;</span>
              </div>
            </router-link>
          </div>

          <div v-else class="ed-kb-empty">
            <div class="ed-kb-empty__icon">&#x2315;</div>
            <h3 class="ed-kb-empty__title">No organisations found</h3>
            <p class="ed-kb-empty__sub">
              <template v-if="query">No matches for <strong>"{{ query }}"</strong>. </template>
              Try adjusting your search or filter criteria.
            </p>
          </div>
        </template>

      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-kb {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-kb-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-kb-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-kb-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-kb-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-kb-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-kb-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.55;
  margin: 1.75rem 0 0;
  max-width: 42rem;
  color: var(--at-mute-2);
}

/* ─── Search ────────────────────────────────────────────────────────────── */
.ed-kb-search {
  margin-top: 2.25rem;
  max-width: 42rem;
  position: relative;
  display: flex;
  align-items: center;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  transition: border-color 0.15s;
}

.ed-kb-search:focus-within { border-color: var(--at-navy-deep); }

.ed-kb-search__icon {
  flex-shrink: 0;
  margin-left: 1.1rem;
  color: var(--at-mute);
  pointer-events: none;
}

.ed-kb-search__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 1rem 1rem;
  font-family: var(--at-sans);
  font-size: 1rem;
  color: var(--at-navy-deep);
}

.ed-kb-search__input::placeholder { color: var(--at-mute); }

.ed-kb-search__clear {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  color: var(--at-mute);
  transition: color 0.15s;
}

.ed-kb-search__clear:hover { color: var(--at-navy-deep); }

/* ─── Category filter ───────────────────────────────────────────────────── */
.ed-kb-filter {
  background: var(--at-surface);
  border-bottom: 1px solid var(--at-grid-line);
  position: sticky;
  top: var(--at-header-height);
  z-index: 30;
}

.ed-kb-filter__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.ed-kb-chip {
  padding: 0.6rem 1.1rem;
  background: transparent;
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.ed-kb-chip:hover { border-color: var(--at-grid-line-2); }
.ed-kb-chip--active { cursor: default; }

/* ─── Cards ─────────────────────────────────────────────────────────────── */
.ed-kb-articles {
  padding: 4rem 0 5rem;
  background: var(--at-bg-cream);
}

.ed-kb-articles__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-kb-count {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 2rem;
}

.ed-kb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.5rem;
}

.ed-kb-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ed-kb-card:hover {
  border-color: var(--kb-card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-kb-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-kb-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.ed-kb-card__cat { font-weight: 600; }
.ed-kb-card__dot { color: var(--at-mute); opacity: 0.5; }
.ed-kb-card__read { color: var(--at-mute); }

.ed-kb-card__head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.ed-kb-card__logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  flex-shrink: 0;
}

.ed-kb-card__logo--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-serif);
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--at-navy);
  background: var(--at-bg-cream);
}

.ed-kb-card__title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0;
}

.ed-kb-card__desc {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0 0 1.25rem;
  flex: 1;
}

.ed-kb-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.ed-kb-card__tag {
  padding: 0.25rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 500;
  text-transform: uppercase;
}

.ed-kb-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-kb-card__updated {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--at-mute);
  text-transform: uppercase;
}

.ed-kb-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-kb-card:hover .ed-kb-card__arrow { transform: translateX(4px); }

/* ─── Empty / loading ───────────────────────────────────────────────────── */
.ed-kb-empty {
  padding: 5rem 2rem;
  text-align: center;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-kb-empty__icon {
  font-size: 2.5rem;
  color: var(--at-mute);
  margin-bottom: 1rem;
}

.ed-kb-empty__title {
  font-family: var(--at-serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}

.ed-kb-empty__sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--at-mute);
  margin: 0;
}

.ed-kb-empty__sub strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .ed-kb-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-kb-filter__inner { padding: 1rem 1.25rem; }
  .ed-kb-articles { padding: 3rem 0 4rem; }
  .ed-kb-articles__inner { padding: 0 1.25rem; }
  .ed-kb-grid { grid-template-columns: 1fr; }
}
</style>

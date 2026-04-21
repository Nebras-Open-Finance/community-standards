<template>
  <div class="ed-news">

    <PageHeader />

    <!-- ═══════════════════════════════════════════════════════════════════
         Masthead
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-news-masthead">
      <div class="ed-news-masthead__inner">

        <div class="ed-news-masthead__meta">
          <div class="ed-news-masthead__label">
            <span class="ed-news-masthead__label-dash" />
            Section &middot; Articles
          </div>
          <div class="ed-news-masthead__issue">ISSUE {{ issueNumber }} &middot; {{ monthLabel }}</div>
        </div>

        <h1 class="ed-news-masthead__title">
          Articles <span class="ed-news-masthead__amp">&amp;</span> press.
        </h1>

        <div class="ed-news-masthead__count">
          {{ articles.length }} entries<br/>indexed
        </div>
      </div>

      <p class="ed-news-masthead__sub">
        A running log of industry coverage, regulatory milestones and press releases
        tracking the UAE Open Finance programme &mdash; and the global Open Banking scene
        it&rsquo;s measured against.
      </p>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         Filter rail + sort
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-news-controls">
      <div class="ed-news-controls__inner">
        <nav class="ed-filter-rail" aria-label="Filter by category">
          <button
            v-for="f in filters"
            :key="f.key"
            class="ed-filter-rail__btn"
            :class="{ 'is-active': activeFilter === f.key }"
            @click="setFilter(f.key)"
          >
            {{ f.label }}
            <span class="ed-filter-rail__count">{{ f.count }}</span>
          </button>
        </nav>

        <label class="ed-sort">
          <span class="ed-sort__label">Sort</span>
          <select class="ed-sort__select" v-model="sortOrder">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="source">By source (A–Z)</option>
          </select>
        </label>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         Featured lead + grid
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-news-body">
      <div class="ed-news-body__inner">

        <div v-if="featured && currentPage === 1" class="ed-news-body__featured">
          <ArticleLink
            variant="feature"
            :link="featured.link"
            :title="featured.title"
            :date="featured.dateLabel"
            :text="featured.text"
            :image-src="featured.imageSrc"
            :kind="kindLabels[featured.kind]"
            :source="featured.source"
          />
        </div>

        <div v-if="remaining.length" class="ed-news-body__grid">
          <ArticleLink
            v-for="a in remaining"
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

        <div v-else class="ed-news-body__empty">
          <span class="ed-news-body__empty-kicker">No match</span>
          <h3>Nothing yet in “{{ activeFilterLabel }}”</h3>
          <p>Try a different category or clear the filter.</p>
          <button class="ed-more-link" @click="setFilter('all')">Clear filter →</button>
        </div>

        <nav v-if="pageCount > 1" class="ed-pager" aria-label="Pagination">
          <button
            class="ed-pager__btn"
            :disabled="currentPage === 1"
            @click="goPage(currentPage - 1)"
          >← Previous</button>

          <span class="ed-pager__pages">
            <button
              v-for="n in pageNumbers"
              :key="n.key"
              :class="['ed-pager__page', { 'is-active': n.page === currentPage, 'is-gap': n.type === 'gap' }]"
              :disabled="n.type === 'gap'"
              @click="n.type === 'page' && goPage(n.page)"
            >{{ n.label }}</button>
          </span>

          <button
            class="ed-pager__btn"
            :disabled="currentPage === pageCount"
            @click="goPage(currentPage + 1)"
          >Next →</button>
        </nav>

      </div>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import PageHeader from './Components/PageHeader.vue'
import PageFooter from './Components/PageFooter.vue'
import ArticleLink from './Components/ArticleLink.vue'
import { articles, ARTICLE_KIND_LABELS, ARTICLE_KINDS, countByKind } from './data/articles.js'

const kindLabels = ARTICLE_KIND_LABELS

const PAGE_SIZE = 9

// ── Filter state ─────────────────────────────────────────────────────────
const activeFilter = ref('all')
const sortOrder    = ref('newest')
const currentPage  = ref(1)

const counts = countByKind()

const filters = computed(() => [
  { key: 'all', label: 'All articles', count: counts.all },
  ...ARTICLE_KINDS.filter(k => (counts[k] || 0) > 0).map(k => ({
    key: k,
    label: ARTICLE_KIND_LABELS[k],
    count: counts[k],
  })),
])

const activeFilterLabel = computed(() =>
  filters.value.find(f => f.key === activeFilter.value)?.label || 'All'
)

function setFilter(key) {
  activeFilter.value = key
  currentPage.value = 1
}

watch(sortOrder, () => { currentPage.value = 1 })

// ── Derived article sets ─────────────────────────────────────────────────
const filtered = computed(() => {
  const base = activeFilter.value === 'all'
    ? articles
    : articles.filter(a => a.kind === activeFilter.value)

  const sorted = [...base]
  if (sortOrder.value === 'oldest') sorted.sort((a, b) => a.date.localeCompare(b.date))
  else if (sortOrder.value === 'source') sorted.sort((a, b) => (a.source || '').localeCompare(b.source || ''))
  else sorted.sort((a, b) => b.date.localeCompare(a.date)) // newest
  return sorted
})

const featured = computed(() =>
  sortOrder.value === 'newest' && activeFilter.value === 'all' ? filtered.value[0] : null
)

const paginatableArticles = computed(() =>
  featured.value ? filtered.value.slice(1) : filtered.value
)

const pageCount = computed(() =>
  Math.max(1, Math.ceil(paginatableArticles.value.length / PAGE_SIZE))
)

const remaining = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return paginatableArticles.value.slice(start, start + PAGE_SIZE)
})

function goPage(n) {
  currentPage.value = Math.min(Math.max(1, n), pageCount.value)
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Compressed page numbers with ellipses for long lists.
const pageNumbers = computed(() => {
  const total = pageCount.value
  const cur = currentPage.value
  const window = new Set([1, total, cur - 1, cur, cur + 1])
  const pages = [...window].filter(n => n >= 1 && n <= total).sort((a, b) => a - b)
  const out = []
  let prev = 0
  for (const p of pages) {
    if (prev && p - prev > 1) out.push({ key: `gap-${prev}`, type: 'gap', label: '…' })
    out.push({ key: `p-${p}`, type: 'page', page: p, label: String(p).padStart(2, '0') })
    prev = p
  }
  return out
})

// ── Masthead meta ────────────────────────────────────────────────────────
const monthLabel = new Date().toLocaleDateString('en-GB', {
  month: 'long', year: 'numeric',
}).toUpperCase()
const issueNumber = (() => {
  const start = new Date('2025-01-01T00:00:00Z').getTime()
  const week = Math.floor((Date.now() - start) / (7 * 24 * 3600 * 1000))
  return String(week).padStart(2, '0')
})()
</script>

<style scoped>
.ed-news {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ── Masthead ──────────────────────────────────────────────────────────── */
.ed-news-masthead {
  border-bottom: 2px solid var(--at-navy-deep);
  padding: 4rem 2rem 2.5rem;
}

.ed-news-masthead__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr auto;
  gap: 4rem;
  align-items: end;
}

.ed-news-masthead__meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ed-news-masthead__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
}

.ed-news-masthead__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-news-masthead__issue {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--at-mute);
}

.ed-news-masthead__title {
  font-family: var(--at-serif);
  font-weight: 500;
  font-size: clamp(3rem, 6.5vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-news-masthead__amp {
  font-style: italic;
  font-weight: 400;
}

.ed-news-masthead__count {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  text-align: right;
  line-height: 1.5;
}

.ed-news-masthead__sub {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  line-height: 1.55;
  font-style: italic;
  color: var(--at-mute-2);
  margin: 1.5rem auto 0;
  max-width: var(--at-page-max);
  padding: 0;
}

/* ── Controls ──────────────────────────────────────────────────────────── */
.ed-news-controls {
  position: sticky;
  top: 4.25rem;
  z-index: 50;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-news-controls__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0.85rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.ed-filter-rail {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.35rem;
  flex: 1;
  min-width: 0;
}

.ed-filter-rail__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: none;
  border: 1px solid var(--at-grid-line-2);
  font-family: var(--at-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-navy-deep);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.ed-filter-rail__btn:hover {
  border-color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}

.ed-filter-rail__btn.is-active {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border-color: var(--at-navy-deep);
}

.ed-filter-rail__count {
  font-size: 0.58rem;
  padding: 0.1rem 0.35rem;
  background: rgba(0, 0, 0, 0.08);
  letter-spacing: 0.08em;
}
.ed-filter-rail__btn.is-active .ed-filter-rail__count {
  background: rgba(255, 255, 255, 0.18);
  color: var(--at-bg-cream);
}

.ed-sort {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.ed-sort__label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-sort__select {
  appearance: none;
  padding: 0.4rem 2rem 0.4rem 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream) url("data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23001738' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 0.65rem center;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
}

/* ── Body ──────────────────────────────────────────────────────────────── */
.ed-news-body { padding: 2.25rem 0 4rem; }

.ed-news-body__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-news-body__featured { margin-bottom: 1.5rem; }

.ed-news-body__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.ed-news-body__empty {
  padding: 3rem 0;
  text-align: center;
}

.ed-news-body__empty-kicker {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--at-teal);
}

.ed-news-body__empty h3 {
  font-family: var(--at-serif);
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0.4rem 0 0.5rem;
}

.ed-news-body__empty p {
  color: var(--at-mute-2);
  margin: 0 0 1.25rem;
}

/* ── Pager ─────────────────────────────────────────────────────────────── */
.ed-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--at-grid-line);
  flex-wrap: wrap;
}

.ed-pager__btn,
.ed-pager__page {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-navy-deep);
  background: none;
  border: 1px solid var(--at-grid-line-2);
  padding: 0.55rem 0.85rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.ed-pager__btn:disabled,
.ed-pager__page.is-gap {
  opacity: 0.35;
  cursor: default;
  border-color: transparent;
}

.ed-pager__btn:not(:disabled):hover,
.ed-pager__page:not(.is-active):not(.is-gap):hover {
  border-color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}

.ed-pager__page.is-active {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border-color: var(--at-navy-deep);
}

.ed-pager__pages { display: inline-flex; gap: 0.25rem; }

.ed-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy-deep);
  background: none;
  border: 1px solid var(--at-navy-deep);
  padding: 0.7rem 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.ed-more-link:hover { background: var(--at-navy-deep); color: var(--at-bg-cream); }

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-news-masthead { padding: 3rem 1.25rem 2rem; }
  .ed-news-masthead__inner { grid-template-columns: 1fr; gap: 1.5rem; align-items: start; }
  .ed-news-masthead__count { text-align: left; }
  .ed-news-masthead__sub { padding: 0 1.25rem; }
  .ed-news-body__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .ed-news-controls__inner,
  .ed-news-body__inner { padding: 0 1.25rem; }
  .ed-news-controls__inner { padding-top: 0.6rem; padding-bottom: 0.6rem; }
  .ed-news-body__grid { grid-template-columns: 1fr; }
}
</style>

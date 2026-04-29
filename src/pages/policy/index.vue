<route lang="yaml">
meta:
  title: Policies
  isIndex: true
</route>

<script setup lang="ts">
import { policies } from '@/data/policies'
import type { Policy, PolicyCategory } from '@/types/policy'

const CATEGORY_ORDER: readonly PolicyCategory[] = ['Participants', 'Nebras']

const CATEGORY_COLORS: Record<PolicyCategory, string> = {
  Participants: 'var(--at-teal)',
  Nebras: 'var(--at-navy)',
  '': 'var(--at-navy)',
}

const CATEGORY_TAG_BG: Record<PolicyCategory, string> = {
  Participants: 'rgba(0, 194, 169, 0.10)',
  Nebras: 'rgba(0, 39, 127, 0.10)',
  '': 'rgba(0, 39, 127, 0.06)',
}

interface CategoryOption {
  id: 'all' | PolicyCategory
  label: string
  count: number
  color: string
}

const query = ref<string>('')
const activeCategory = ref<'all' | PolicyCategory>('all')

const categories = computed<CategoryOption[]>(() => {
  const counts: Partial<Record<PolicyCategory, number>> = {}
  for (const p of policies) {
    if (!p.category) continue
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }
  const ordered: CategoryOption[] = CATEGORY_ORDER
    .filter(name => (counts[name] ?? 0) > 0)
    .map(name => ({
      id: name,
      label: name,
      count: counts[name] ?? 0,
      color: CATEGORY_COLORS[name] ?? 'var(--at-navy)',
    }))
  return [
    { id: 'all', label: 'All Policies', count: policies.length, color: 'var(--at-navy)' },
    ...ordered,
  ]
})

const filteredPolicies = computed<Policy[]>(() => {
  const q = query.value.trim().toLowerCase()
  return policies.filter(p => {
    if (activeCategory.value !== 'all' && p.category !== activeCategory.value) return false
    if (!q) return true
    return (
      p.title.toLowerCase().includes(q) ||
      (p.purpose || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      p.appliesToShort.some(t => t.toLowerCase().includes(q)) ||
      p.appliesTo.some(t => t.toLowerCase().includes(q))
    )
  })
})

const activeColor = computed<string>(() => {
  const hit = categories.value.find(c => c.id === activeCategory.value)
  return hit ? hit.color : 'var(--at-navy)'
})

function colorFor(category: PolicyCategory): string {
  return CATEGORY_COLORS[category] ?? 'var(--at-navy)'
}

function tagBackground(category: PolicyCategory): string {
  return CATEGORY_TAG_BG[category] ?? 'rgba(0, 39, 127, 0.06)'
}

const MONTH_SHORT: readonly string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function formatUpdated(iso: string): string {
  if (!iso) return ''
  const parts = iso.split('-')
  if (parts.length !== 3) return iso
  const [y, m, d] = parts
  if (!y || !m || !d) return iso
  const monthIdx = parseInt(m, 10) - 1
  const mm = MONTH_SHORT[monthIdx] ?? m
  return `${parseInt(d, 10)} ${mm} ${y}`
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
          Govern &middot; Operate &middot; Evolve
        </div>
        <h1 class="ed-kb-hero__title">Policies</h1>
        <p class="ed-kb-hero__sub">
          Governance and operational policies for participants in the UAE Open Finance
          ecosystem &mdash; Licensed Financial Institutions, Third-Party Providers, and the
          technology service providers that support them.
        </p>

        <div class="ed-kb-search">
          <svg class="ed-kb-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input v-model="query" class="ed-kb-search__input" type="search"
            placeholder="Search policies&hellip;"
            aria-label="Search policies" />
          <button v-if="query" class="ed-kb-search__clear" @click="query = ''"
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
          @click="activeCategory = cat.id"
        >
          {{ cat.label }} &middot; {{ cat.count }}
        </button>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         POLICIES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-kb-articles">
      <div class="ed-kb-articles__inner">

        <div class="ed-kb-count" :style="{ color: activeColor }">
          {{ filteredPolicies.length }}
          {{ filteredPolicies.length === 1 ? 'Policy' : 'Policies' }}
          <template v-if="query">&middot; Search: "{{ query }}"</template>
        </div>

        <div v-if="filteredPolicies.length > 0" class="ed-kb-grid">
          <a
            v-for="policy in filteredPolicies"
            :key="policy.slug"
            :href="policy.url"
            class="ed-kb-card"
            :style="{ '--kb-card-color': colorFor(policy.category) }"
          >
            <span class="ed-kb-card__top" :style="{ background: colorFor(policy.category) }" />

            <div class="ed-kb-card__meta">
              <span class="ed-kb-card__cat" :style="{ color: colorFor(policy.category) }">
                {{ policy.category || 'Uncategorised' }}
              </span>
              <span v-if="policy.readTime" class="ed-kb-card__dot">&middot;</span>
              <span v-if="policy.readTime" class="ed-kb-card__read">{{ policy.readTime }}</span>
            </div>

            <h3 class="ed-kb-card__title">{{ policy.title }}</h3>
            <p class="ed-kb-card__desc">{{ policy.purpose }}</p>

            <div v-if="policy.appliesToShort && policy.appliesToShort.length" class="ed-kb-card__tags">
              <span
                v-for="tag in policy.appliesToShort"
                :key="tag"
                class="ed-kb-card__tag"
                :style="{
                  background: tagBackground(policy.category),
                  color: colorFor(policy.category),
                }"
              >{{ tag }}</span>
            </div>

            <div class="ed-kb-card__foot">
              <span v-if="policy.updated" class="ed-kb-card__updated">
                Updated {{ formatUpdated(policy.updated) }}
              </span>
              <span class="ed-kb-card__arrow" :style="{ color: colorFor(policy.category) }">&rarr;</span>
            </div>
          </a>
        </div>

        <div v-else class="ed-kb-empty">
          <div class="ed-kb-empty__icon">&#x2315;</div>
          <h3 class="ed-kb-empty__title">No policies found</h3>
          <p class="ed-kb-empty__sub">
            <template v-if="query">No matches for <strong>"{{ query }}"</strong>. </template>
            Try adjusting your search or filter criteria.
          </p>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-kb {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
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
  top: 4.25rem;
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

/* ─── Articles ──────────────────────────────────────────────────────────── */
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

/* ─── Card ──────────────────────────────────────────────────────────────── */
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

.ed-kb-card__title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
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

/* ─── Empty state ───────────────────────────────────────────────────────── */
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

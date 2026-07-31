<route lang="yaml">
meta:
  layout: internal
  title: Policies
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { internalPolicyThemes, internalPolicies } from '@/data/internalPolicies'
import type { InternalPolicyTheme } from '@/data/internalPolicies'

useHead({ title: 'Policies · Internal' })

const query = ref<string>('')

const filteredThemes = computed<InternalPolicyTheme[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return internalPolicyThemes as InternalPolicyTheme[]
  return internalPolicyThemes
    .map((t) => ({
      ...t,
      policies: t.policies.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.purpose.toLowerCase().includes(q) ||
          t.label.toLowerCase().includes(q) ||
          p.appliesToShort.some((a) => a.toLowerCase().includes(q)),
      ),
    }))
    .filter((t) => t.policies.length > 0)
})

const matchCount = computed<number>(() =>
  filteredThemes.value.reduce((n, t) => n + t.policies.length, 0),
)

function tagBackground(color: string): string {
  return `color-mix(in srgb, ${color} 10%, transparent)`
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
    <!-- ─── Hero ─────────────────────────────────────────────────────────── -->
    <section class="ed-kb-hero">
      <div class="ed-kb-hero__inner">
        <div class="ed-kb-hero__label">
          <span class="ed-kb-hero__label-dash" />
          Internal &middot; Restricted
        </div>
        <h1 class="ed-kb-hero__title">Policies</h1>
        <p class="ed-kb-hero__sub">
          Nebras&rsquo;s internal corporate governance policies &mdash; the governance,
          risk, security, conduct, and people frameworks that direct how Nebras Open Finance
          operates. These documents are classified <strong>Restricted</strong> and are for
          internal reference only.
        </p>

        <div class="ed-kb-search">
          <svg class="ed-kb-search__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input v-model="query" class="ed-kb-search__input" type="search"
            placeholder="Search policies&hellip;" aria-label="Search policies" />
          <button v-if="query" class="ed-kb-search__clear" @click="query = ''"
            aria-label="Clear search">&times;</button>
        </div>
      </div>
    </section>

    <!-- ─── Themed policy groups ─────────────────────────────────────────── -->
    <section class="ed-kb-articles">
      <div class="ed-kb-articles__inner">
        <div class="ed-kb-count">
          {{ matchCount }} {{ matchCount === 1 ? 'Policy' : 'Policies' }}
          <template v-if="query">&middot; Search: "{{ query }}"</template>
          <template v-else>&middot; {{ internalPolicies.length }} across {{ internalPolicyThemes.length }} themes</template>
        </div>

        <template v-if="matchCount > 0">
          <div v-for="theme in filteredThemes" :key="theme.id" class="pol-theme">
            <h2 class="pol-theme__head" :style="{ color: theme.color }">
              <span class="pol-theme__dash" :style="{ background: theme.color }" />
              {{ theme.label }}
              <span class="pol-theme__count">{{ theme.policies.length }}</span>
            </h2>

            <div class="ed-kb-grid">
              <a
                v-for="policy in theme.policies"
                :key="policy.slug"
                :href="`/internal/policies/${policy.slug}`"
                class="ed-kb-card"
                :style="{ '--kb-card-color': theme.color }"
              >
                <span class="ed-kb-card__top" :style="{ background: theme.color }" />

                <div class="ed-kb-card__meta">
                  <span class="ed-kb-card__cat" :style="{ color: theme.color }">
                    {{ policy.classification }}
                  </span>
                  <span class="ed-kb-card__dot">&middot;</span>
                  <span class="ed-kb-card__read">{{ policy.readTime }}</span>
                </div>

                <h3 class="ed-kb-card__title">{{ policy.title }}</h3>
                <p class="ed-kb-card__desc">{{ policy.purpose }}</p>

                <div v-if="policy.appliesToShort.length" class="ed-kb-card__tags">
                  <span
                    v-for="tag in policy.appliesToShort"
                    :key="tag"
                    class="ed-kb-card__tag"
                    :style="{ background: tagBackground(theme.color), color: theme.color }"
                  >{{ tag }}</span>
                </div>

                <div class="ed-kb-card__foot">
                  <span v-if="policy.updated" class="ed-kb-card__updated">
                    Updated {{ formatUpdated(policy.updated) }}
                  </span>
                  <span class="ed-kb-card__arrow" :style="{ color: theme.color }">&rarr;</span>
                </div>
              </a>
            </div>
          </div>
        </template>

        <div v-else class="ed-kb-empty">
          <div class="ed-kb-empty__icon">&#x2315;</div>
          <h3 class="ed-kb-empty__title">No policies found</h3>
          <p class="ed-kb-empty__sub">
            <template v-if="query">No matches for <strong>"{{ query }}"</strong>. </template>
            Try adjusting your search.
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
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
.ed-kb-hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-kb-hero__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4.5rem 2rem 3rem; }
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
.ed-kb-hero__label-dash { width: 24px; height: 1px; background: currentColor; }
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
.ed-kb-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Search ───────────────────────────────────────────────────────────── */
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
.ed-kb-search__icon { flex-shrink: 0; margin-left: 1.1rem; color: var(--at-mute); pointer-events: none; }
.ed-kb-search__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 1rem;
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

/* ─── Articles ─────────────────────────────────────────────────────────── */
.ed-kb-articles { padding: 3.5rem 0 5rem; background: var(--at-bg-cream); }
.ed-kb-articles__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 0 2rem; }
.ed-kb-count {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
  margin-bottom: 2.5rem;
}

/* ─── Theme group ──────────────────────────────────────────────────────── */
.pol-theme { margin-bottom: 3.25rem; }
.pol-theme:last-child { margin-bottom: 0; }
.pol-theme__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 0 1.5rem;
}
.pol-theme__dash { width: 28px; height: 2px; flex-shrink: 0; }
.pol-theme__count {
  font-size: 0.62rem;
  color: var(--at-mute);
  font-weight: 600;
}

.ed-kb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.5rem;
}

/* ─── Card ─────────────────────────────────────────────────────────────── */
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
.ed-kb-card:hover { border-color: var(--kb-card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-kb-card__top { position: absolute; top: 0; left: 0; width: 48px; height: 3px; }
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
.ed-kb-card__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
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
.ed-kb-card__arrow { font-family: var(--at-mono); font-size: 1rem; transition: transform 0.2s; }
.ed-kb-card:hover .ed-kb-card__arrow { transform: translateX(4px); }

/* ─── Empty state ──────────────────────────────────────────────────────── */
.ed-kb-empty {
  padding: 5rem 2rem;
  text-align: center;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}
.ed-kb-empty__icon { font-size: 2.5rem; color: var(--at-mute); margin-bottom: 1rem; }
.ed-kb-empty__title {
  font-family: var(--at-serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}
.ed-kb-empty__sub { font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.55; color: var(--at-mute); margin: 0; }
.ed-kb-empty__sub strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .ed-kb-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-kb-articles { padding: 2.5rem 0 4rem; }
  .ed-kb-articles__inner { padding: 0 1.25rem; }
  .ed-kb-grid { grid-template-columns: 1fr; }
}
</style>

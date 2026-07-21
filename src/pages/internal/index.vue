<route lang="yaml">
meta:
  layout: internal
  title: Internal
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useInternalPages, appPageSlugs, prettifySlug } from '@/composables/useInternalPages'

useHead({ title: 'Internal' })

const router = useRouter()
const { drafts, committedSlugs, deleteDraft } = useInternalPages()

// Pages users land on directly via the sidebar / nav — kept out of the
// "Published pages" list because they're app UI, not content.
const PUBLISHED_FILTER = new Set(['example'])
const publishedContent = computed(() => committedSlugs.filter((s) => !PUBLISHED_FILTER.has(s)))

function openDraft(s: string): void {
  router.push('/internal/draft/' + s)
}

function removeDraft(s: string): void {
  if (typeof window !== 'undefined' && !window.confirm(`Delete the draft "${s}"? This cannot be undone.`)) return
  deleteDraft(s)
}

function formatDate(ts: number): string {
  try {
    return new Date(ts).toLocaleString()
  } catch {
    return ''
  }
}
</script>

<template>
  <div class="int-home">
    <section class="int-home__hero">
      <div class="int-home__eyebrow">
        <span class="int-home__dash" />
        Internal
      </div>
      <h1 class="int-home__title">Internal pages</h1>
      <p class="int-home__lede">
        A private space for drafting documentation. Open the example page, duplicate it to create a
        new draft, then edit the Markdown directly with a preview toggle. Drafts are stored only in
        this browser until you publish them to the repository.
      </p>
    </section>

    <!-- Start a new draft -->
    <section class="int-card int-card--example">
      <h2 class="int-card__heading">Start a new draft</h2>
      <p class="int-card__hint">
        The example page demonstrates every block element you can use on an internal page. Open it
        and use the duplicate widget at the top to seed a fresh draft.
      </p>
      <a class="int-cta" href="/internal/example">Open the example page →</a>
    </section>

    <!-- Tools -->
    <section v-if="appPageSlugs.length" class="int-card">
      <h2 class="int-card__heading">Tools</h2>
      <p class="int-card__hint">
        Interactive pages built as Vue components. They sit behind the same password gate but are
        applications rather than documents, so they have no Markdown/Preview toggle.
      </p>
      <ul class="int-list">
        <li v-for="s in appPageSlugs" :key="s" class="int-list__item">
          <a class="int-list__main" :href="'/internal/pages/' + s">
            <span class="int-list__name">{{ prettifySlug(s) }}</span>
            <span class="int-list__meta"><code>/internal/pages/{{ s }}</code></span>
          </a>
        </li>
      </ul>
    </section>

    <!-- Drafts -->
    <section class="int-card">
      <h2 class="int-card__heading">Drafts in this browser</h2>
      <p class="int-card__hint">
        Work in progress. These are not visible to anyone else and are lost if you clear browser data.
      </p>
      <ul v-if="drafts.length" class="int-list">
        <li v-for="d in drafts" :key="d.slug" class="int-list__item">
          <button type="button" class="int-list__main" @click="openDraft(d.slug)">
            <span class="int-list__name">{{ d.title || prettifySlug(d.slug) }}</span>
            <span class="int-list__meta"><code>{{ d.slug }}</code> · edited {{ formatDate(d.updatedAt) }}</span>
          </button>
          <button type="button" class="int-list__del" @click="removeDraft(d.slug)">Delete</button>
        </li>
      </ul>
      <p v-else class="int-empty">No drafts yet — duplicate the example page to get started.</p>
    </section>

    <!-- Published -->
    <section class="int-card">
      <h2 class="int-card__heading">Published pages</h2>
      <p class="int-card__hint">
        Markdown pages that have been committed to the repository and deployed.
      </p>
      <ul v-if="publishedContent.length" class="int-list">
        <li v-for="s in publishedContent" :key="s" class="int-list__item">
          <a class="int-list__main" :href="'/internal/' + s">
            <span class="int-list__name">{{ prettifySlug(s) }}</span>
            <span class="int-list__meta"><code>/internal/{{ s }}</code></span>
          </a>
        </li>
      </ul>
      <p v-else class="int-empty">No pages have been published yet.</p>
    </section>
  </div>
</template>

<style scoped>
.int-home {
  max-width: 52rem;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

.int-home__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 1.1rem;
}
.int-home__dash { width: 24px; height: 1px; background: currentColor; }

.int-home__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  margin: 0 0 1rem;
}

.int-home__lede {
  font-size: 1.02rem;
  line-height: 1.65;
  margin: 0 0 2.5rem;
}

.int-card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1.75rem 1.75rem 2rem;
  margin-bottom: 1.5rem;
}
.int-card--example { border-left: 3px solid var(--at-teal-deep); }

.int-card__heading {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0 0 0.4rem;
}

.int-card__hint {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute);
  margin: 0 0 1.25rem;
}

.int-cta {
  display: inline-block;
  padding: 0.6rem 1.1rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  text-decoration: none;
  transition: background 0.16s;
}
.int-cta:hover { background: var(--at-teal-deep); }

.int-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--at-grid-line);
}

.int-list__item {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.int-list__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.85rem 0.25rem;
  background: none;
  border: 0;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
  font-family: var(--at-sans);
}
.int-list__main:hover .int-list__name { color: var(--at-teal-deep); }

.int-list__name {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  transition: color 0.12s;
}

.int-list__meta {
  font-size: 0.78rem;
  color: var(--at-mute);
}
.int-list__meta code {
  font-family: var(--at-mono);
  font-size: 0.92em;
}

.int-list__del {
  align-self: center;
  padding: 0.4rem 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  background: none;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  transition: color 0.14s, border-color 0.14s;
}
.int-list__del:hover { color: #c0392b; border-color: #c0392b; }

.int-empty {
  font-size: 0.9rem;
  color: var(--at-mute);
  margin: 0;
  padding: 0.5rem 0;
}
</style>

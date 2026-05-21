<route lang="yaml">
meta:
  layout: internal
  title: Internal
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  useInternalPages,
  slugify,
  isValidSlug,
  prettifySlug,
} from '@/composables/useInternalPages'

useHead({ title: 'Internal' })

const router = useRouter()
const { drafts, committedSlugs, slugExists, createDraft, deleteDraft } = useInternalPages()

const newTitle = ref('')
const slug = computed(() => slugify(newTitle.value))
const routePath = computed(() => '/internal/' + slug.value)

const problem = computed<string | null>(() => {
  if (!newTitle.value.trim()) return null
  if (!slug.value || !isValidSlug(slug.value)) return 'Enter a name using letters and numbers.'
  if (slugExists(slug.value)) return 'A page or draft with this name already exists.'
  return null
})
const canCreate = computed(() => !!slug.value && isValidSlug(slug.value) && !slugExists(slug.value))

function createPage(): void {
  if (!canCreate.value) return
  if (!createDraft(slug.value, newTitle.value.trim())) return
  router.push({ path: '/internal/editor', query: { slug: slug.value } })
}

function openDraft(s: string): void {
  router.push({ path: '/internal/editor', query: { slug: s } })
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
        A private space for drafting documentation. Create a page, write it in Markdown with a live
        preview, then follow the publish steps to push it into the repository. Drafts are stored only
        in this browser until you commit them.
      </p>
    </section>

    <!-- Create a page -->
    <section class="int-card">
      <h2 class="int-card__heading">Add a page</h2>
      <p class="int-card__hint">
        A page can be created as long as one with the same name does not already exist.
      </p>
      <form class="int-create" @submit.prevent="createPage">
        <label class="int-create__label" for="int-new">Page name</label>
        <div class="int-create__row">
          <input
            id="int-new"
            v-model="newTitle"
            type="text"
            class="int-create__input"
            :class="{ 'is-error': !!problem }"
            placeholder="e.g. Onboarding checklist"
          />
          <button type="submit" class="int-btn" :disabled="!canCreate">Create</button>
        </div>
        <p v-if="problem" class="int-create__msg int-create__msg--error">{{ problem }}</p>
        <p v-else-if="slug" class="int-create__msg">
          Will be created at <code>{{ routePath }}</code>
        </p>
      </form>
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
      <p v-else class="int-empty">No drafts yet — add a page above to get started.</p>
    </section>

    <!-- Published -->
    <section class="int-card">
      <h2 class="int-card__heading">Published pages</h2>
      <p class="int-card__hint">
        Markdown pages that have been committed to the repository and deployed.
      </p>
      <ul v-if="committedSlugs.length" class="int-list">
        <li v-for="s in committedSlugs" :key="s" class="int-list__item">
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

.int-create__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  margin-bottom: 0.5rem;
}

.int-create__row {
  display: flex;
  gap: 0.6rem;
}

.int-create__input {
  flex: 1;
  min-width: 0;
  padding: 0.6rem 0.8rem;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
}
.int-create__input:focus { outline: 2px solid var(--at-teal); outline-offset: 1px; }
.int-create__input.is-error { border-color: #c0392b; }

.int-create__msg {
  font-size: 0.84rem;
  margin: 0.6rem 0 0;
  color: var(--at-mute);
}
.int-create__msg code {
  font-family: var(--at-mono);
  font-size: 0.92em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.06em 0.35em;
}
.int-create__msg--error { color: #c0392b; }

.int-btn {
  flex-shrink: 0;
  padding: 0.6rem 1.2rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
  transition: background 0.16s;
}
.int-btn:hover:not(:disabled) { background: var(--at-teal-deep); }
.int-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.int-btn:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }

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

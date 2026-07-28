<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useInternalAuth } from '@/composables/useInternalAuth'
import {
  useInternalPages,
  committedSlugs,
  appPageSlugs,
  prettifySlug,
  getCommittedSource,
} from '@/composables/useInternalPages'
import type { EdSidebarItemData } from '@/components/editorial/EdSidebarItem.vue'
import InternalDuplicate from '@/components/common/InternalDuplicate.vue'

// Layout for every page under /internal. Pages opt in with `layout: internal`
// in their <route> block (.vue) or frontmatter (.md). It does three things:
//   1. Password-gates the whole section (see useInternalAuth — not real security).
//   2. Renders the section's own sidebar of pages + drafts.
//   3. Wraps Markdown content pages in .internal-prose so they match the
//      editor's live preview exactly.

const { unlocked, unlock } = useInternalAuth()
const { drafts } = useInternalPages()
const route = useRoute()

// Gate on a mounted flag so SSR and the first client render agree (both show
// the locked form); the unlocked content only appears after hydration.
const ready = ref(false)
onMounted(() => { ready.value = true })

const password = ref('')
const error = ref(false)

function submit(): void {
  if (unlock(password.value)) {
    error.value = false
    password.value = ''
  } else {
    error.value = true
  }
}

// /internal, /internal/draft/* and /internal/pages/* are app UI; everything else
// under /internal is a committed Markdown page and gets the prose shell
// (header + Markdown/Preview toggle).
const isContentPage = computed(() => {
  const p = route.path.replace(/\/$/, '')
  if (p === '/internal') return false
  if (p.startsWith('/internal/draft/')) return false
  if (p.startsWith('/internal/pages/')) return false
  return true
})

// The slug for a committed content page, e.g. "/internal/example" → "example".
const contentSlug = computed(() => {
  if (!isContentPage.value) return ''
  return route.path.replace(/\/$/, '').replace(/^\/internal\//, '')
})

const isExamplePage = computed(() => contentSlug.value === 'example')

// Markdown source for the current committed page — feeds the "Markdown" view.
const rawSource = computed(() => getCommittedSource(contentSlug.value) ?? '')

// Default view across every internal markdown page is Markdown source; click
// "Preview" to see roughly how the page will look when embedded in the site.
const view = ref<'markdown' | 'preview'>('markdown')
watch(contentSlug, () => { view.value = 'markdown' })

const sidebarItems = computed<EdSidebarItemData[]>(() => {
  const published: EdSidebarItemData[] = committedSlugs.map((s) => ({
    text: prettifySlug(s),
    link: '/internal/' + s,
  }))
  const draftItems: EdSidebarItemData[] = drafts.value.map((d) => ({
    text: d.title || prettifySlug(d.slug),
    link: '/internal/draft/' + d.slug,
  }))
  // The two go-live certificate tools are grouped under their own subsection;
  // every other tool stays flat under "Tools".
  const CERT_LABELS: Record<string, string> = {
    'lfi-certificate': 'LFI certificate',
    'tpp-certificate': 'TPP certificate',
  }
  const certSlugs = appPageSlugs.filter((s) => s in CERT_LABELS)
  const otherToolSlugs = appPageSlugs.filter((s) => !(s in CERT_LABELS))

  const toolItems: EdSidebarItemData[] = [
    ...otherToolSlugs.map((s) => ({
      text: prettifySlug(s),
      link: '/internal/pages/' + s,
    })),
    ...(certSlugs.length
      ? [{
          text: 'Commercial Go-Live Certificates',
          collapsed: false,
          items: certSlugs.map((s) => ({
            text: CERT_LABELS[s] ?? prettifySlug(s),
            link: '/internal/pages/' + s,
          })),
        }]
      : []),
  ]
  return [
    ...(toolItems.length
      ? [{ text: 'Tools', collapsed: false, items: toolItems }]
      : []),
    {
      text: 'Published pages',
      collapsed: false,
      items: published.length ? published : [{ text: '<em>None yet</em>' }],
    },
    {
      text: 'Drafts (this browser)',
      collapsed: false,
      items: draftItems.length ? draftItems : [{ text: '<em>None yet</em>' }],
    },
  ]
})
</script>

<template>
  <div class="app-shell">
    <PageHeader />
    <main class="app-shell__main">
      <!-- Locked: password gate -->
      <div v-if="!ready || !unlocked" class="int-gate">
        <form class="int-gate__card" @submit.prevent="submit">
          <div class="int-gate__eyebrow">
            <span class="int-gate__dash" />
            Internal
          </div>
          <h1 class="int-gate__title">This area is password-protected</h1>
          <p class="int-gate__lede">
            Enter the internal password to continue. Access lasts for this browser session.
          </p>
          <label class="int-gate__label" for="int-pw">Password</label>
          <input
            id="int-pw"
            v-model="password"
            type="password"
            class="int-gate__input"
            :class="{ 'is-error': error }"
            autocomplete="off"
            placeholder="••••••••"
          />
          <p v-if="error" class="int-gate__error">Incorrect password — try again.</p>
          <button type="submit" class="int-gate__btn">Unlock</button>
        </form>
      </div>

      <!-- Unlocked: sidebar + page content -->
      <template v-else>
        <EdHoverSidebar :items="sidebarItems" title="Internal" root-href="/internal/" />
        <div v-if="isContentPage" class="int-shell">
          <header class="int-shell__head">
            <InternalDuplicate v-if="isExamplePage" source-page="example" />
            <div class="int-shell__bar">
              <div class="int-shell__eyebrow">
                <span class="int-shell__dash" />
                Internal · <code>/internal/{{ contentSlug }}</code>
              </div>
              <div class="int-shell__toggle" role="tablist" aria-label="View mode">
                <button
                  type="button"
                  role="tab"
                  class="int-shell__toggle-btn"
                  :class="{ 'is-active': view === 'markdown' }"
                  :aria-selected="view === 'markdown'"
                  @click="view = 'markdown'"
                >
                  Markdown
                </button>
                <button
                  type="button"
                  role="tab"
                  class="int-shell__toggle-btn"
                  :class="{ 'is-active': view === 'preview' }"
                  :aria-selected="view === 'preview'"
                  @click="view = 'preview'"
                >
                  Preview
                </button>
              </div>
            </div>
          </header>
          <div v-if="view === 'preview'" class="internal-prose">
            <router-view />
          </div>
          <pre v-else class="int-shell__source"><code>{{ rawSource }}</code></pre>
        </div>
        <router-view v-else />
      </template>
    </main>
    <PageFooter />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-shell__main {
  flex: 1 0 auto;
  padding-top: var(--at-header-height);
}

/* Content-shell styles (.int-shell*) live in src/styles/internal.css so they
   apply regardless of this component's scoped data-v attribute. */

/* ── Password gate ─────────────────────────────────────────────────────── */
.int-gate {
  display: flex;
  justify-content: center;
  padding: 5rem 2rem 6rem;
  background: var(--at-bg-cream);
}

.int-gate__card {
  width: 100%;
  max-width: 26rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2.5rem 2.25rem;
}

.int-gate__eyebrow {
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
.int-gate__dash { width: 24px; height: 1px; background: currentColor; }

.int-gate__title {
  font-family: var(--at-serif);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}

.int-gate__lede {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.75rem;
}

.int-gate__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  margin-bottom: 0.5rem;
}

.int-gate__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.65rem 0.8rem;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
}
.int-gate__input:focus {
  outline: 2px solid var(--at-teal);
  outline-offset: 1px;
}
.int-gate__input.is-error { border-color: #c0392b; }

.int-gate__error {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: #c0392b;
  margin: 0.5rem 0 0;
}

.int-gate__btn {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.7rem 1rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
  transition: background 0.16s;
}
.int-gate__btn:hover { background: var(--at-teal-deep); }
.int-gate__btn:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }
</style>

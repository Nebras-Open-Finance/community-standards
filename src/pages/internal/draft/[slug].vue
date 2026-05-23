<route lang="yaml">
meta:
  layout: internal
  title: Internal draft
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useInternalPages, prettifySlug, committedSlugs } from '@/composables/useInternalPages'
import InternalMarkdown from '@/components/common/InternalMarkdown.vue'
import { parseInternalBlocks } from '@/components/common/composables/internalMarkdown'

useHead({ title: 'Internal draft' })

const route = useRoute()
const router = useRouter()
const { getDraft, saveDraft, deleteDraft } = useInternalPages()

const slug = computed(() => {
  const raw = route.params['slug']
  return typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw[0] ?? '') : ''
})

// 'committed' — slug belongs to a published page (no draft to edit here)
// 'draft'     — an editable draft exists in this browser
// 'missing'   — slug has no draft (e.g. a stale link)
type Mode = 'committed' | 'draft' | 'missing'
const mode = ref<Mode>('missing')

const title = ref('')
const body = ref('')
const ready = ref(false)
const view = ref<'markdown' | 'preview'>('markdown')

// Set while load() seeds title/body, so the persistence watcher below does not
// treat a freshly loaded draft as an edit (which would bump its updatedAt).
let suppressSave = false

function load(): void {
  if (committedSlugs.includes(slug.value)) { mode.value = 'committed'; return }
  const draft = getDraft(slug.value)
  if (!draft) { mode.value = 'missing'; return }
  suppressSave = true
  title.value = draft.title
  body.value = draft.body
  mode.value = 'draft'
  nextTick(() => { suppressSave = false })
}

onMounted(() => {
  load()
  ready.value = true
  if (typeof window !== 'undefined') window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('keydown', onKeydown)
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
watch(slug, load)

watch([title, body], () => {
  if (suppressSave) return
  if (mode.value === 'draft' && slug.value) {
    saveDraft(slug.value, { title: title.value, body: body.value })
  }
})

// ── Publish helpers ──────────────────────────────────────────────────────────
const targetPath = computed(() => `src/pages/internal/${slug.value}.md`)
const routePath = computed(() => `/internal/${slug.value}`)

function attr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\r/g, '')
    .replace(/\n/g, '&#10;')
}

// Promotes standalone images / fenced code to <ImageViewer> / <EdCode> so the
// committed file uses the same components as the rest of the site.
const committedBody = computed(() =>
  parseInternalBlocks(body.value)
    .map((block) => {
      if (block.kind === 'code') {
        return `<EdCode lang="${attr(block.lang)}" code="${attr(block.code)}" />`
      }
      if (block.kind === 'image') {
        return `<ImageViewer src="${attr(block.src)}" alt="${attr(block.alt)}" caption="${attr(block.alt)}" />`
      }
      return block.raw.trim()
    })
    .filter((part) => part.length > 0)
    .join('\n\n'),
)

const fileContent = computed(() => {
  const safeTitle = (title.value || prettifySlug(slug.value)).replace(/"/g, '\\"')
  return [
    '---',
    'layout: internal',
    `title: "${safeTitle}"`,
    'next: false',
    'prev: false',
    '---',
    '',
    committedBody.value,
    '',
  ].join('\n')
})

// ── Publish modal ────────────────────────────────────────────────────────
const showPublish = ref(false)

// Two publish paths. Default to the no-setup github.com path since it's the
// easiest for someone who doesn't have a local clone.
const publishMethod = ref<'github' | 'local'>('github')

const REPO_URL = 'https://github.com/Nebras-Open-Finance/community-standards'

// GitHub's "new file" editor accepts ?filename= and ?value= query params to
// pre-fill the path and (best-effort) the body. The filename always sticks;
// the body sometimes hits a URL-length limit, so we still expose a Copy file
// button for the user to paste manually.
const githubNewFileUrl = computed(
  () => `${REPO_URL}/new/internal?filename=${encodeURIComponent(targetPath.value)}`,
)
const githubPrUrl = `${REPO_URL}/compare/main...internal?expand=1`

// First-time clone — also leaves the user on the `internal` branch.
const cloneCommands = computed(() =>
  [
    `git clone ${REPO_URL}.git`,
    'cd community-standards',
    'git checkout internal',
  ].join('\n'),
)

// Existing-clone update — make sure they're on a clean, up-to-date internal.
const updateCommands = [
  'cd community-standards',
  'git fetch origin',
  'git checkout internal',
  'git pull --ff-only',
].join('\n')

// Stage + commit + push the new file. Run after either of the two setup paths.
const commitCommands = computed(() => {
  const msg = `Add internal page: ${slug.value}`.replace(/"/g, '\\"')
  return [
    `git add ${targetPath.value}`,
    `git commit -m "${msg}"`,
    'git push origin internal',
  ].join('\n')
})

// One copy state per snippet so the "Copied" feedback lines up with the
// button the user actually clicked.
const copied = ref<Record<string, boolean>>({})
async function copyText(key: string, text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = { ...copied.value, [key]: true }
    setTimeout(() => { copied.value = { ...copied.value, [key]: false } }, 2000)
  } catch {
    copied.value = { ...copied.value, [key]: false }
  }
}

// Modal open/close — close on Esc, lock page scroll while open.
function openPublish(): void { showPublish.value = true }
function closePublish(): void { showPublish.value = false }

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && showPublish.value) closePublish()
}

watch(showPublish, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

function removeDraft(): void {
  if (typeof window !== 'undefined' && !window.confirm(`Delete the draft "${slug.value}"? This cannot be undone.`)) return
  deleteDraft(slug.value)
  router.push('/internal/')
}
</script>

<template>
  <div class="int-draft">
    <!-- Already published -->
    <div v-if="ready && mode === 'committed'" class="int-draft__notice">
      <h1 class="int-draft__notice-title">This page is already published</h1>
      <p>
        <code>{{ slug }}</code> is a committed page. Edit it directly in the repository at
        <code>{{ targetPath }}</code>, or view it at <a :href="routePath">{{ routePath }}</a>.
      </p>
    </div>

    <!-- Stale link -->
    <div v-else-if="ready && mode === 'missing'" class="int-draft__notice">
      <h1 class="int-draft__notice-title">Draft not found</h1>
      <p>
        There is no draft named <code>{{ slug }}</code> in this browser. Start one by duplicating
        the <a href="/internal/example">example page</a>, or pick an existing draft from the
        <a href="/internal/">internal home</a>.
      </p>
    </div>

    <!-- Draft -->
    <template v-else-if="ready && mode === 'draft'">
      <header class="int-draft__head">
        <div class="int-draft__eyebrow">
          <span class="int-draft__dash" />
          Internal · Draft · <code>{{ slug }}</code>
        </div>
        <input
          v-model="title"
          type="text"
          class="int-draft__title-input"
          placeholder="Page title"
          aria-label="Page title"
        />
        <div class="int-draft__bar">
          <div class="int-draft__toggle" role="tablist" aria-label="View mode">
            <button
              type="button"
              role="tab"
              class="int-draft__toggle-btn"
              :class="{ 'is-active': view === 'markdown' }"
              :aria-selected="view === 'markdown'"
              @click="view = 'markdown'"
            >
              Markdown
            </button>
            <button
              type="button"
              role="tab"
              class="int-draft__toggle-btn"
              :class="{ 'is-active': view === 'preview' }"
              :aria-selected="view === 'preview'"
              @click="view = 'preview'"
            >
              Preview
            </button>
          </div>
          <div class="int-draft__bar-actions">
            <span class="int-draft__autosave">Saved in this browser</span>
            <button type="button" class="int-draft__publish-link" @click="openPublish">
              Publish…
            </button>
            <button type="button" class="int-draft__delete" @click="removeDraft">Delete</button>
          </div>
        </div>
      </header>

      <!-- Markdown view: editable -->
      <textarea
        v-if="view === 'markdown'"
        v-model="body"
        class="int-draft__textarea"
        spellcheck="true"
        aria-label="Markdown source"
      />

      <!-- Preview view: read-only render -->
      <div v-else class="int-draft__preview">
        <InternalMarkdown :source="body" />
      </div>

    </template>

    <!-- Publish modal -->
    <Teleport to="body">
      <div
        v-if="showPublish"
        class="pub-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pub-title"
        @click="closePublish"
      >
        <div class="pub-modal" @click.stop>
          <header class="pub-modal__head">
            <div>
              <div class="pub-modal__eyebrow">
                <span class="pub-modal__dash" />
                Publish
              </div>
              <h2 id="pub-title" class="pub-modal__title">Publish this page</h2>
            </div>
            <button type="button" class="pub-modal__close" aria-label="Close" @click="closePublish">✕</button>
          </header>
          <div class="pub-modal__body">
            <p class="pub-modal__lede">
              This draft lives only in your browser. Publishing commits it to the
              <code>internal</code> branch of the <code>community-standards</code> repository,
              where anyone with internal access can see it. To later push the page to the
              production site, open a pull request from <code>internal</code> →
              <code>main</code>.
            </p>

            <div class="pub-modal__tabs" role="tablist" aria-label="Publish method">
              <button
                type="button"
                role="tab"
                class="pub-modal__tab"
                :class="{ 'is-active': publishMethod === 'github' }"
                :aria-selected="publishMethod === 'github'"
                @click="publishMethod = 'github'"
              >
                Edit on github.com
              </button>
              <button
                type="button"
                role="tab"
                class="pub-modal__tab"
                :class="{ 'is-active': publishMethod === 'local' }"
                :aria-selected="publishMethod === 'local'"
                @click="publishMethod = 'local'"
              >
                Edit locally
              </button>
            </div>

            <!-- ── github.com path ─────────────────────────────────────── -->
            <ol v-if="publishMethod === 'github'" class="pub-modal__steps">
              <li>
                <strong>Open the new-file editor on GitHub.</strong> The link below opens the
                <code>community-standards</code> repository on the <code>internal</code> branch
                with the file path pre-filled.
                <p class="pub-modal__cta-row">
                  <a
                    class="pub-modal__cta"
                    :href="githubNewFileUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Open new file on internal ↗</a>
                  <span class="pub-modal__cta-hint">opens github.com in a new tab</span>
                </p>
              </li>
              <li>
                <strong>Paste the Markdown below into the editor.</strong> The frontmatter is
                already generated, and standalone images / fenced code blocks have been promoted
                to <code>&lt;ImageViewer&gt;</code> and <code>&lt;EdCode&gt;</code>.
                <div class="pub-modal__block">
                  <div class="pub-modal__block-bar">
                    <span class="pub-modal__block-name">{{ targetPath }}</span>
                    <button
                      type="button"
                      class="pub-modal__copy"
                      @click="copyText('file', fileContent)"
                    >{{ copied.file ? 'Copied' : 'Copy file' }}</button>
                  </div>
                  <pre class="pub-modal__block-body">{{ fileContent }}</pre>
                </div>
              </li>
              <li>
                <strong>Commit directly to <code>internal</code>.</strong> Use a message like
                <code>Add internal page: {{ slug }}</code>, select
                <em>Commit directly to the internal branch</em>, then click
                <em>Commit new file</em>. The page is live on the internal area as soon as the
                site rebuilds.
              </li>
            </ol>

            <!-- ── Local-clone path ────────────────────────────────────── -->
            <ol v-else class="pub-modal__steps">
              <li>
                <strong>Get the repository on the <code>internal</code> branch.</strong>
                Pick the block that matches your setup.

                <div class="pub-modal__sub">First time — clone the repository:</div>
                <div class="pub-modal__block">
                  <div class="pub-modal__block-bar">
                    <span class="pub-modal__block-name">terminal</span>
                    <button
                      type="button"
                      class="pub-modal__copy"
                      @click="copyText('clone', cloneCommands)"
                    >{{ copied.clone ? 'Copied' : 'Copy commands' }}</button>
                  </div>
                  <pre class="pub-modal__block-body">{{ cloneCommands }}</pre>
                </div>

                <div class="pub-modal__sub">Already cloned — make sure it's up to date:</div>
                <div class="pub-modal__block">
                  <div class="pub-modal__block-bar">
                    <span class="pub-modal__block-name">terminal</span>
                    <button
                      type="button"
                      class="pub-modal__copy"
                      @click="copyText('update', updateCommands)"
                    >{{ copied.update ? 'Copied' : 'Copy commands' }}</button>
                  </div>
                  <pre class="pub-modal__block-body">{{ updateCommands }}</pre>
                </div>
              </li>
              <li>
                <strong>Save the file at <code>{{ targetPath }}</code>.</strong> Create any
                missing directories. The frontmatter is already generated, and standalone images
                / fenced code blocks have been promoted to <code>&lt;ImageViewer&gt;</code> and
                <code>&lt;EdCode&gt;</code>.
                <div class="pub-modal__block">
                  <div class="pub-modal__block-bar">
                    <span class="pub-modal__block-name">{{ targetPath }}</span>
                    <button
                      type="button"
                      class="pub-modal__copy"
                      @click="copyText('file', fileContent)"
                    >{{ copied.file ? 'Copied' : 'Copy file' }}</button>
                  </div>
                  <pre class="pub-modal__block-body">{{ fileContent }}</pre>
                </div>
              </li>
              <li>
                <strong>Commit and push to <code>internal</code>.</strong> Run these commands
                from the root of your clone.
                <div class="pub-modal__block">
                  <div class="pub-modal__block-bar">
                    <span class="pub-modal__block-name">terminal</span>
                    <button
                      type="button"
                      class="pub-modal__copy"
                      @click="copyText('commit', commitCommands)"
                    >{{ copied.commit ? 'Copied' : 'Copy commands' }}</button>
                  </div>
                  <pre class="pub-modal__block-body">{{ commitCommands }}</pre>
                </div>
              </li>
            </ol>

            <!-- ── PR-to-main footer (shared) ──────────────────────────── -->
            <div class="pub-modal__footer">
              <h3 class="pub-modal__footer-title">Optional — move it to production</h3>
              <p class="pub-modal__footer-text">
                The <code>internal</code> branch is only visible to internal users. When the
                page is ready to ship to the production site, open a pull request from
                <code>internal</code> → <code>main</code>. Once merged the page will be live at
                <code>{{ routePath }}</code>, and you can delete this local draft from the
                <a href="/internal/">internal home</a>.
              </p>
              <p class="pub-modal__cta-row">
                <a
                  class="pub-modal__cta pub-modal__cta--ghost"
                  :href="githubPrUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >Open PR: internal → main ↗</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.int-draft {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

/* ── Notices ───────────────────────────────────────────────────────────── */
.int-draft__notice {
  max-width: 40rem;
  margin: 3rem auto;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 2.25rem;
}
.int-draft__notice-title {
  font-family: var(--at-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}
.int-draft__notice p { font-size: 0.95rem; line-height: 1.6; margin: 0; }
.int-draft__notice a { color: var(--at-teal-deep); }
.int-draft__notice code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.06em 0.35em;
}

/* ── Header ────────────────────────────────────────────────────────────── */
.int-draft__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 0.9rem;
}
.int-draft__dash { width: 24px; height: 1px; background: currentColor; }
.int-draft__eyebrow code { font-size: 0.92em; text-transform: none; letter-spacing: 0; }

.int-draft__title-input {
  width: 100%;
  box-sizing: border-box;
  font-family: var(--at-serif);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--at-grid-line);
  padding: 0.25rem 0;
}
.int-draft__title-input:focus { outline: none; border-bottom-color: var(--at-teal); }

.int-draft__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1rem 0 1.25rem;
}

.int-draft__toggle {
  display: inline-flex;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
}
.int-draft__toggle-btn {
  padding: 0.5rem 1rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute-2);
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
}
.int-draft__toggle-btn + .int-draft__toggle-btn { border-left: 1px solid var(--at-grid-line-2); }
.int-draft__toggle-btn:hover { color: var(--at-navy-deep); }
.int-draft__toggle-btn.is-active {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
}

.int-draft__bar-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
}

.int-draft__autosave {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.int-draft__publish-link,
.int-draft__delete {
  padding: 0.45rem 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  background: transparent;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  transition: color 0.14s, border-color 0.14s, background 0.14s;
}
.int-draft__publish-link { color: var(--at-teal-deep); }
.int-draft__publish-link:hover { background: var(--at-teal-deep); color: var(--at-bg-cream); border-color: var(--at-teal-deep); }
.int-draft__delete { color: var(--at-mute); }
.int-draft__delete:hover { color: #c0392b; border-color: #c0392b; }

/* ── Markdown editor / preview ─────────────────────────────────────────── */
.int-draft__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 36rem;
  resize: vertical;
  padding: 1.25rem 1.4rem;
  font-family: var(--at-mono);
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}
.int-draft__textarea:focus { outline: 2px solid var(--at-teal); outline-offset: -2px; }

.int-draft__preview {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 0.5rem 0;
}
.int-draft__preview :deep(.internal-prose) {
  padding: 1.25rem 1.4rem;
  max-width: none;
  margin: 0;
}

/* Publish-modal styles live unscoped below — the modal is teleported to <body>
   so it sits outside this layout's scoped DOM. */
</style>

<style>
/* unscoped — modal is teleported to <body> */
.pub-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: rgba(0, 23, 56, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vh 2vw;
}

.pub-modal {
  display: flex;
  flex-direction: column;
  width: 96vw;
  max-width: 56rem;
  max-height: 92vh;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  box-shadow: 0 30px 80px rgba(0, 23, 56, 0.45);
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

.pub-modal__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 1px solid var(--at-grid-line);
  flex-shrink: 0;
}

.pub-modal__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 0.4rem;
}
.pub-modal__dash { width: 22px; height: 1px; background: currentColor; }

.pub-modal__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0;
}

.pub-modal__close {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-mono);
  font-size: 0.9rem;
  color: var(--at-mute);
  background: transparent;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  transition: color 0.14s, border-color 0.14s, background 0.14s;
}
.pub-modal__close:hover {
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
}

.pub-modal__body {
  padding: 1.25rem 1.5rem 1.75rem;
  overflow-y: auto;
}

.pub-modal__lede {
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--at-mute);
  margin: 0 0 1.25rem;
}

.pub-modal__tabs {
  display: inline-flex;
  border: 1px solid var(--at-grid-line-2);
  margin: 0 0 1.5rem;
}
.pub-modal__tab {
  padding: 0.5rem 1.1rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute-2);
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
}
.pub-modal__tab + .pub-modal__tab {
  border-left: 1px solid var(--at-grid-line-2);
}
.pub-modal__tab:hover { color: var(--at-navy-deep); }
.pub-modal__tab.is-active {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
}

.pub-modal__sub {
  margin: 1rem 0 0.4rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

.pub-modal__cta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 0.7rem 0 0;
}

.pub-modal__cta {
  display: inline-block;
  padding: 0.55rem 1.1rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 1px solid var(--at-navy-deep);
  text-decoration: none;
  transition: background 0.16s;
}
.pub-modal__cta:hover { background: var(--at-teal-deep); border-color: var(--at-teal-deep); }
.pub-modal__cta--ghost {
  color: var(--at-navy-deep);
  background: transparent;
  border: 1px solid var(--at-grid-line-2);
}
.pub-modal__cta--ghost:hover {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border-color: var(--at-navy-deep);
}

.pub-modal__cta-hint {
  font-size: 0.82rem;
  color: var(--at-mute);
}

.pub-modal__footer {
  margin-top: 1.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--at-grid-line);
}
.pub-modal__footer-title {
  font-family: var(--at-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 0 0 0.4rem;
}
.pub-modal__footer-text {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute);
  margin: 0 0 0.9rem;
}
.pub-modal__lede code,
.pub-modal__steps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.06em 0.35em;
}
.pub-modal__lede a,
.pub-modal__steps a { color: var(--at-teal-deep); }

.pub-modal__steps {
  margin: 0;
  padding-left: 1.4rem;
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--at-mute-2);
}
.pub-modal__steps li { margin: 0.4rem 0 1.4rem; }
.pub-modal__steps li:last-child { margin-bottom: 0; }
.pub-modal__steps strong { color: var(--at-navy-deep); font-weight: 600; }

.pub-modal__block {
  margin-top: 0.7rem;
}
.pub-modal__block-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  border-bottom: 0;
}
.pub-modal__block-name {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  color: var(--at-navy-deep);
}
.pub-modal__copy {
  padding: 0.35rem 0.8rem;
  font-family: var(--at-mono);
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
  transition: background 0.16s;
}
.pub-modal__copy:hover { background: var(--at-teal-deep); }
.pub-modal__block-body {
  margin: 0;
  padding: 0.9rem 1.1rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.82rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
  max-height: 24rem;
  overflow-y: auto;
}
</style>

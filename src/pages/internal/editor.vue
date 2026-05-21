<route lang="yaml">
meta:
  layout: internal
  title: Internal Editor
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useInternalPages, prettifySlug } from '@/composables/useInternalPages'
import { parseInternalBlocks } from '@/components/common/composables/internalMarkdown'
import InternalMarkdown from '@/components/common/InternalMarkdown.vue'

useHead({ title: 'Internal Editor' })

const route = useRoute()
const { getDraft, saveDraft, committedSlugs } = useInternalPages()

const slug = computed(() => {
  const q = route.query.slug
  return typeof q === 'string' ? q : ''
})

// 'none'      — no slug in the URL
// 'committed' — slug belongs to an already-published page (edit in the repo)
// 'draft'     — an editable draft exists in this browser
// 'missing'   — slug given, but no draft here (e.g. a stale link)
type Mode = 'none' | 'committed' | 'draft' | 'missing'
const mode = ref<Mode>('none')

const title = ref('')
const body = ref('')
const ready = ref(false)

// Set while load() seeds title/body, so the persistence watcher below does not
// treat a freshly loaded draft as an edit (which would bump its updatedAt).
let suppressSave = false

function load(): void {
  if (!slug.value) { mode.value = 'none'; return }
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
})
watch(slug, load)

// Persist edits straight back to localStorage as the author types.
watch([title, body], () => {
  if (suppressSave) return
  if (mode.value === 'draft' && slug.value) {
    saveDraft(slug.value, { title: title.value, body: body.value })
  }
})

// ── Insert helpers ───────────────────────────────────────────────────────────
const textareaEl = ref<HTMLTextAreaElement | null>(null)

function insertSnippet(snippet: string): void {
  const el = textareaEl.value
  if (!el) { body.value += snippet; return }
  const start = el.selectionStart
  const end = el.selectionEnd
  body.value = body.value.slice(0, start) + snippet + body.value.slice(end)
  nextTick(() => {
    el.focus()
    const pos = start + snippet.length
    el.setSelectionRange(pos, pos)
  })
}

function insertImage(): void {
  insertSnippet('\n\n![Describe the image](/images/example.png)\n\n')
}
function insertCode(): void {
  insertSnippet('\n\n```json\n{\n  "example": true\n}\n```\n\n')
}

// ── Publish: the exact file to commit ────────────────────────────────────────
const targetPath = computed(() => `src/pages/internal/${slug.value}.md`)
const routePath = computed(() => `/internal/${slug.value}`)

/** Escape a string for use inside a double-quoted HTML/Vue attribute. */
function attr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\r/g, '')
    .replace(/\n/g, '&#10;')
}

// The committed body keeps prose as Markdown, but promotes standalone images
// and fenced code to <ImageViewer> / <EdCode> — both globally registered, so
// unplugin-vue-markdown renders them as the real site components.
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

const copied = ref(false)
async function copyFile(): Promise<void> {
  try {
    await navigator.clipboard.writeText(fileContent.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="int-ed">
    <!-- No slug -->
    <div v-if="ready && mode === 'none'" class="int-ed__notice">
      <h1 class="int-ed__notice-title">No page selected</h1>
      <p>Pick a draft or create a page from the <a href="/internal/">internal home</a>.</p>
    </div>

    <!-- Already published -->
    <div v-else-if="ready && mode === 'committed'" class="int-ed__notice">
      <h1 class="int-ed__notice-title">This page is already published</h1>
      <p>
        <code>{{ slug }}</code> is a committed page. Edit it directly in the repository at
        <code>{{ targetPath }}</code>, or view it at <a :href="routePath">{{ routePath }}</a>.
      </p>
    </div>

    <!-- Stale link -->
    <div v-else-if="ready && mode === 'missing'" class="int-ed__notice">
      <h1 class="int-ed__notice-title">Draft not found</h1>
      <p>
        There is no draft named <code>{{ slug }}</code> in this browser. Create it from the
        <a href="/internal/">internal home</a>.
      </p>
    </div>

    <!-- Editor -->
    <template v-else-if="ready && mode === 'draft'">
      <header class="int-ed__head">
        <div class="int-ed__eyebrow">
          <span class="int-ed__dash" />
          Internal · Draft · <code>{{ slug }}</code>
        </div>
        <input
          v-model="title"
          type="text"
          class="int-ed__title-input"
          placeholder="Page title"
          aria-label="Page title"
        />
        <p class="int-ed__head-hint">
          Saved automatically in this browser. When the page is ready, follow the publish steps below.
        </p>
      </header>

      <p class="int-ed__legend">
        Write in standard Markdown. A line containing only an image —
        <code>![alt](src)</code> — renders as a zoomable <strong>ImageViewer</strong>; a fenced
        <code>```</code> block renders as a highlighted <strong>EdCode</strong> block. Image
        <code>src</code> must be a URL or a file already served from <code>public/</code> — there
        is no upload.
      </p>

      <div class="int-ed__split">
        <div class="int-ed__pane">
          <div class="int-ed__pane-label">
            <span>Markdown</span>
            <span class="int-ed__tools">
              <button type="button" class="int-ed__tool" @click="insertImage">+ Image</button>
              <button type="button" class="int-ed__tool" @click="insertCode">+ Code</button>
            </span>
          </div>
          <textarea
            ref="textareaEl"
            v-model="body"
            class="int-ed__textarea"
            spellcheck="true"
            aria-label="Markdown source"
          />
        </div>
        <div class="int-ed__pane">
          <div class="int-ed__pane-label"><span>Preview</span></div>
          <div class="int-ed__preview">
            <InternalMarkdown :source="body" />
          </div>
        </div>
      </div>

      <section class="int-ed__publish">
        <h2 class="int-ed__publish-title">Publish this page</h2>
        <p class="int-ed__publish-lede">
          This draft lives only in your browser. To make it a real, shared page, commit it to the
          repository:
        </p>
        <ol class="int-ed__steps">
          <li>
            Create the file <code>{{ targetPath }}</code> with exactly the content below. Standalone
            images and fenced code have been converted to <code>&lt;ImageViewer&gt;</code> and
            <code>&lt;EdCode&gt;</code> tags, and the frontmatter sets the password-protected layout.
          </li>
          <li>
            Commit and push it:
            <pre class="int-ed__cmd">git add {{ targetPath }}
git commit -m "Add internal page: {{ slug }}"
git push</pre>
          </li>
          <li>
            Once the branch is merged and the site is deployed, the page is live at
            <code>{{ routePath }}</code>. You can then delete this local draft from the
            <a href="/internal/">internal home</a>.
          </li>
        </ol>

        <div class="int-ed__file">
          <div class="int-ed__file-bar">
            <span class="int-ed__file-name">{{ targetPath }}</span>
            <button type="button" class="int-ed__copy" @click="copyFile">
              {{ copied ? 'Copied' : 'Copy file' }}
            </button>
          </div>
          <pre class="int-ed__file-body">{{ fileContent }}</pre>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.int-ed {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 2.5rem 2rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

/* ── Notices ───────────────────────────────────────────────────────────── */
.int-ed__notice {
  max-width: 40rem;
  margin: 3rem auto;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 2.25rem;
}
.int-ed__notice-title {
  font-family: var(--at-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 0 0 0.75rem;
}
.int-ed__notice p { font-size: 0.95rem; line-height: 1.6; margin: 0; }
.int-ed__notice a { color: var(--at-teal-deep); }
.int-ed__notice code,
.int-ed__legend code,
.int-ed__publish code,
.int-ed__steps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.06em 0.35em;
}

/* ── Header ────────────────────────────────────────────────────────────── */
.int-ed__eyebrow {
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
.int-ed__dash { width: 24px; height: 1px; background: currentColor; }
.int-ed__eyebrow code { font-size: 0.92em; text-transform: none; letter-spacing: 0; }

.int-ed__title-input {
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
.int-ed__title-input:focus { outline: none; border-bottom-color: var(--at-teal); }

.int-ed__head-hint {
  font-size: 0.85rem;
  color: var(--at-mute);
  margin: 0.75rem 0 0;
}

.int-ed__legend {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--at-mute);
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  padding: 0.7rem 0.95rem;
  margin: 1.5rem 0 0;
}
.int-ed__legend strong { color: var(--at-navy-deep); font-weight: 600; }

/* ── Split editor / preview ────────────────────────────────────────────── */
.int-ed__split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin: 1rem 0 2.5rem;
}

.int-ed__pane {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  min-height: 28rem;
}

.int-ed__pane-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem 0.5rem 0.4rem 0.9rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  min-height: 1.9rem;
}

.int-ed__tools { display: flex; gap: 0.35rem; }
.int-ed__tool {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: color-mix(in srgb, var(--at-bg-cream) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--at-bg-cream) 28%, transparent);
  padding: 0.25rem 0.55rem;
  cursor: pointer;
  transition: background 0.15s;
}
.int-ed__tool:hover { background: var(--at-teal-deep); }

.int-ed__textarea {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  border: 0;
  padding: 1rem 1.1rem;
  font-family: var(--at-mono);
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--at-navy-deep);
  background: var(--at-surface);
}
.int-ed__textarea:focus { outline: 2px solid var(--at-teal); outline-offset: -2px; }

.int-ed__preview {
  flex: 1;
  overflow-y: auto;
}
/* The preview reuses .internal-prose (global, in styles/internal.css) so it
   matches the committed page exactly — just trim its outer page padding. */
.int-ed__preview :deep(.internal-prose) {
  padding: 1.25rem 1.4rem;
  max-width: none;
  margin: 0;
}

/* ── Publish panel ─────────────────────────────────────────────────────── */
.int-ed__publish {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1.75rem 1.9rem 2rem;
}
.int-ed__publish-title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  margin: 0 0 0.5rem;
}
.int-ed__publish-lede {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute);
  margin: 0 0 1.25rem;
}
.int-ed__steps {
  margin: 0 0 1.5rem;
  padding-left: 1.25rem;
  font-size: 0.92rem;
  line-height: 1.65;
}
.int-ed__steps li { margin: 0.5rem 0; }
.int-ed__steps a { color: var(--at-teal-deep); }

.int-ed__cmd,
.int-ed__file-body {
  margin: 0.6rem 0 0;
  padding: 0.9rem 1.1rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.82rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

.int-ed__file { margin-top: 0.5rem; }
.int-ed__file-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  border-bottom: 0;
}
.int-ed__file-name {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  color: var(--at-navy-deep);
}
.int-ed__copy {
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
.int-ed__copy:hover { background: var(--at-teal-deep); }
.int-ed__file-body { margin-top: 0; }

@media (max-width: 860px) {
  .int-ed__split { grid-template-columns: 1fr; }
}
</style>

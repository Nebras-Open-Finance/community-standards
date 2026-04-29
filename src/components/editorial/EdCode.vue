<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  code: string
  lang?: string
  filename?: string
}>(), {
  lang: 'plaintext',
  filename: '',
})

const html = ref('')
const ready = ref(false)
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

const ESC = (s: string): string => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

async function highlight(): Promise<void> {
  try {
    const { codeToHtml } = await import('shiki')
    html.value = await codeToHtml(props.code, {
      lang: props.lang,
      theme: 'github-light',
    })
  } catch {
    html.value = `<pre class="ed-code__plain"><code>${ESC(props.code)}</code></pre>`
  }
  ready.value = true
}

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 1600)
  } catch {
    // Clipboard unavailable (e.g. insecure context) — silently no-op
  }
}

onMounted(highlight)
watch(() => [props.code, props.lang], highlight)
</script>

<template>
  <div class="ed-code">
    <div class="ed-code__head">
      <span v-if="filename" class="ed-code__filename">{{ filename }}</span>
      <span v-else class="ed-code__filename ed-code__filename--placeholder" />
      <span v-if="lang !== 'plaintext'" class="ed-code__lang">{{ lang }}</span>
      <button
        type="button"
        class="ed-code__copy"
        :class="{ 'is-copied': copied }"
        :aria-label="copied ? 'Copied' : 'Copy code'"
        :title="copied ? 'Copied' : 'Copy code'"
        @click="copy"
      >
        <svg v-if="!copied" class="ed-code__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="1" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else class="ed-code__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="ed-code__copy-label">{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>
    <div v-if="ready" class="ed-code__body" v-html="html" />
    <pre v-else class="ed-code__plain"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.ed-code {
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-paper);
  margin: 1.5rem 0;
  max-width: 100%;
  overflow: hidden;
}

.ed-code__head {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.9rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
}
.ed-code__filename { color: var(--at-navy-deep); flex: 1 1 auto; }
.ed-code__filename--placeholder { visibility: hidden; }
.ed-code__lang { color: var(--at-mute); }

.ed-code__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: 1px solid transparent;
  color: var(--at-mute-2);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.4rem -0.25rem 0;
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}
.ed-code__copy:hover {
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border-color: var(--at-grid-line);
}
.ed-code__copy.is-copied {
  color: var(--at-teal-deep);
}
.ed-code__copy-icon {
  flex-shrink: 0;
}
.ed-code__copy-label {
  line-height: 1;
}

.ed-code__body :deep(pre),
.ed-code__plain {
  margin: 0;
  padding: 1rem 1.25rem;
  background: transparent !important;
  font-family: var(--at-mono);
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
  overflow-x: auto;
  border-radius: 0;
}

.ed-code__body :deep(code),
.ed-code__plain code {
  font-family: var(--at-mono);
  background: transparent !important;
  padding: 0;
  border: 0;
  color: inherit;
  white-space: pre;
}

/* Tame Shiki's inline span colors so they don't fight the editorial palette
   too aggressively — keep their hues, but pull them toward the navy ink. */
.ed-code__body :deep(.shiki) {
  background: transparent !important;
}
</style>

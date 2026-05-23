<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

interface Tab {
  label: string
  lang: string
  code: string
}

const props = defineProps<{
  tabs: readonly Tab[]
}>()

const active = ref<number>(0)
const highlightedHtml = ref<string[]>([])
const ready = ref(false)
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

const ESC = (s: string): string => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

async function highlightAll(): Promise<void> {
  try {
    const { codeToHtml } = await import('shiki')
    // Dual-theme — see EdCode for the matching CSS that switches to the
    // `--shiki-dark` colour when `html.dark` is set.
    highlightedHtml.value = await Promise.all(
      props.tabs.map((t) => codeToHtml(t.code, {
        lang: t.lang,
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: 'light',
      })),
    )
  } catch {
    highlightedHtml.value = props.tabs.map(
      (t) => `<pre class="ed-codegroup__plain"><code>${ESC(t.code)}</code></pre>`,
    )
  }
  ready.value = true
}

async function copy(): Promise<void> {
  const tab = props.tabs[active.value]
  if (!tab) return
  try {
    await navigator.clipboard.writeText(tab.code)
    copied.value = true
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = false }, 1600)
  } catch {
    // Clipboard unavailable (e.g. insecure context) — silently no-op
  }
}

onMounted(highlightAll)
watch(() => props.tabs.map((t) => `${t.lang}::${t.code}`).join('||'), highlightAll)
watch(active, () => { copied.value = false })

const activeTab = computed<Tab | undefined>(() => props.tabs[active.value])
const activeHtml = computed<string>(() => highlightedHtml.value[active.value] ?? '')
</script>

<template>
  <div class="ed-codegroup">
    <div class="ed-codegroup__tabs" role="tablist">
      <button
        v-for="(t, i) in tabs"
        :key="`${t.label}-${i}`"
        type="button"
        role="tab"
        class="ed-codegroup__tab"
        :class="{ 'is-active': i === active }"
        :aria-selected="i === active"
        @click="active = i"
      >
        {{ t.label }}
      </button>
      <span v-if="activeTab" class="ed-codegroup__lang">{{ activeTab.lang }}</span>
      <button
        type="button"
        class="ed-codegroup__copy"
        :class="{ 'is-copied': copied }"
        :aria-label="copied ? 'Copied' : 'Copy code'"
        :title="copied ? 'Copied' : 'Copy code'"
        @click="copy"
      >
        <svg v-if="!copied" class="ed-codegroup__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="1" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else class="ed-codegroup__copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span class="ed-codegroup__copy-label">{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>
    <div v-if="ready" class="ed-codegroup__body" v-html="activeHtml" />
    <pre v-else class="ed-codegroup__plain"><code>{{ activeTab?.code ?? '' }}</code></pre>
  </div>
</template>

<style scoped>
.ed-codegroup {
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-paper);
  margin: 1.5rem 0;
  max-width: 100%;
  overflow: hidden;
}

.ed-codegroup__tabs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.5rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-codegroup__tab {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
  background: transparent;
  border: 0;
  padding: 0 0.9rem;
  line-height: 2.5rem;
  cursor: pointer;
  position: relative;
  transition: color 0.15s ease;
}

.ed-codegroup__tab:hover { color: var(--at-navy-deep); }

.ed-codegroup__tab.is-active { color: var(--at-navy-deep); }
.ed-codegroup__tab.is-active::after {
  content: "";
  position: absolute;
  left: 0.6rem;
  right: 0.6rem;
  bottom: -1px;
  height: 2px;
  background: var(--at-teal);
}

.ed-codegroup__lang {
  margin-left: auto;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  padding-right: 0.4rem;
}

.ed-codegroup__copy {
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
  margin-right: 0.1rem;
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}
.ed-codegroup__copy:hover {
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border-color: var(--at-grid-line);
}
.ed-codegroup__copy.is-copied {
  color: var(--at-teal-deep);
}
.ed-codegroup__copy-icon { flex-shrink: 0; }
.ed-codegroup__copy-label { line-height: 1; }

.ed-codegroup__body :deep(pre),
.ed-codegroup__plain {
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

.ed-codegroup__body :deep(code),
.ed-codegroup__plain code {
  font-family: var(--at-mono);
  background: transparent !important;
  padding: 0;
  border: 0;
  color: inherit;
  white-space: pre;
}

.ed-codegroup__body :deep(.shiki) {
  background: transparent !important;
}
</style>

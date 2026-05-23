<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  useInternalPages,
  getCommittedSource,
  slugify,
  isValidSlug,
} from '@/composables/useInternalPages'

// "Duplicate this page" widget. Embedded at the top of a committed internal
// page (e.g. example.md). On submit, copies the page's Markdown source into a
// new browser-local draft and navigates to /internal/draft/{slug}.

const props = defineProps<{ sourcePage: string }>()

const router = useRouter()
const { slugExists, createDraftWithBody } = useInternalPages()

const newTitle = ref('')
const slug = computed(() => slugify(newTitle.value))
const sourceBody = computed(() => getCommittedSource(props.sourcePage) ?? '')

const problem = computed<string | null>(() => {
  if (!newTitle.value.trim()) return null
  if (!slug.value || !isValidSlug(slug.value)) return 'Use letters and numbers.'
  if (slugExists(slug.value)) return 'A page or draft with this name already exists.'
  if (!sourceBody.value) return 'Could not find the source page Markdown.'
  return null
})
const canDuplicate = computed(
  () => !!slug.value && isValidSlug(slug.value) && !slugExists(slug.value) && !!sourceBody.value,
)

function duplicate(): void {
  if (!canDuplicate.value) return
  if (!createDraftWithBody(slug.value, newTitle.value.trim(), sourceBody.value)) return
  router.push('/internal/draft/' + slug.value)
}
</script>

<template>
  <aside class="int-dup" aria-label="Duplicate this page">
    <div class="int-dup__eyebrow">
      <span class="int-dup__dash" />
      Use this page as a starting point
    </div>
    <p class="int-dup__lede">
      Duplicate this page to create a new draft in your browser. You can edit the Markdown freely
      and preview how it will look when published.
    </p>
    <form class="int-dup__form" @submit.prevent="duplicate">
      <label class="int-dup__label" for="int-dup-name">New draft name</label>
      <div class="int-dup__row">
        <input
          id="int-dup-name"
          v-model="newTitle"
          type="text"
          class="int-dup__input"
          :class="{ 'is-error': !!problem }"
          placeholder="e.g. Onboarding checklist"
        />
        <button type="submit" class="int-dup__btn" :disabled="!canDuplicate">Duplicate</button>
      </div>
      <p v-if="problem" class="int-dup__msg int-dup__msg--error">{{ problem }}</p>
      <p v-else-if="slug" class="int-dup__msg">
        Will be created at <code>/internal/draft/{{ slug }}</code>
      </p>
    </form>
  </aside>
</template>

<style scoped>
.int-dup {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal-deep);
  padding: 1.25rem 1.5rem 1.4rem;
  margin: 0 0 2rem;
  font-family: var(--at-sans);
}

.int-dup__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  margin-bottom: 0.7rem;
}
.int-dup__dash { width: 22px; height: 1px; background: currentColor; }

.int-dup__lede {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0 0 1rem;
}

.int-dup__label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  margin-bottom: 0.4rem;
}

.int-dup__row { display: flex; gap: 0.5rem; }

.int-dup__input {
  flex: 1;
  min-width: 0;
  padding: 0.55rem 0.75rem;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
}
.int-dup__input:focus { outline: 2px solid var(--at-teal); outline-offset: 1px; }
.int-dup__input.is-error { border-color: #c0392b; }

.int-dup__btn {
  flex-shrink: 0;
  padding: 0.55rem 1.1rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
  transition: background 0.16s;
}
.int-dup__btn:hover:not(:disabled) { background: var(--at-teal-deep); }
.int-dup__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.int-dup__btn:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }

.int-dup__msg {
  font-size: 0.82rem;
  margin: 0.55rem 0 0;
  color: var(--at-mute);
}
.int-dup__msg code {
  font-family: var(--at-mono);
  font-size: 0.92em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.06em 0.35em;
}
.int-dup__msg--error { color: #c0392b; }
</style>

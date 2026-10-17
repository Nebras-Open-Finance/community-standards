<script setup lang="ts">
// One required document: a keyboard-operable dropzone, then the chosen file
// with Replace / Remove. Validation (type, empty file) is the parent's — this
// emits whatever was picked or dropped. Ids: dropzone `d-<key>`, Replace `dp-<key>`.

import { nextTick, ref } from 'vue'
import SoFieldError from './SoFieldError.vue'
import { extensionOf, formatSize, type DocDef } from './documents'

const props = defineProps<{
  doc: DocDef
  index: number
  file?: File | undefined
  error: string
}>()

const emit = defineEmits<{ select: [file: File]; remove: [] }>()

const input = ref<HTMLInputElement | null>(null)
const dragging = ref(false)

function pick(): void {
  if (!input.value) return
  input.value.value = ''
  input.value.click()
}

function onInput(): void {
  const f = input.value?.files?.[0]
  if (f) emit('select', f)
}

function onDragLeave(e: DragEvent): void {
  if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node | null)) dragging.value = false
}

function onDrop(e: DragEvent): void {
  dragging.value = false
  const f = e.dataTransfer?.files?.[0]
  if (f) emit('select', f)
}

async function remove(): Promise<void> {
  emit('remove')
  await nextTick()
  document.getElementById(`d-${props.doc.key}`)?.focus()
}

function describedBy(): string | undefined {
  return [props.doc.description ? `dd-${props.doc.key}` : '', props.error ? `de-${props.doc.key}` : '']
    .filter(Boolean).join(' ') || undefined
}
</script>

<template>
  <div role="group" :aria-labelledby="`dt-${doc.key}`" class="so-doc">
    <div class="so-doc__head">
      <span class="so-doc__num" :class="{ 'is-done': file }" aria-hidden="true">{{ file ? '✓' : index + 1 }}</span>
      <div class="so-doc__titles">
        <span :id="`dt-${doc.key}`" class="so-doc__title">
          <span>{{ doc.title }}</span><span class="so-req" aria-hidden="true">*</span>
        </span>
        <span v-if="doc.description" :id="`dd-${doc.key}`" class="so-doc__desc">{{ doc.description }}</span>
      </div>
    </div>

    <input
      ref="input"
      type="file"
      class="so-doc__input"
      :accept="doc.exts.map((x) => '.' + x).join(',')"
      tabindex="-1"
      aria-hidden="true"
      @change="onInput"
    >

    <div
      v-if="!file"
      :id="`d-${doc.key}`"
      role="button"
      tabindex="0"
      class="so-zone"
      :class="{ 'is-dragging': dragging, 'is-invalid': !!error }"
      :aria-label="`Upload ${doc.title}. Choose a file or drag it here.`"
      :aria-describedby="describedBy()"
      :aria-invalid="!!error"
      @click="pick"
      @keydown.enter.prevent="pick"
      @keydown.space.prevent="pick"
      @dragover.prevent="dragging = true"
      @dragenter.prevent="dragging = true"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
    >
      <span class="so-zone__tile" aria-hidden="true">↑</span>
      <div class="so-zone__text">
        <span class="so-zone__cta"><span class="so-zone__link">Choose a file</span> or drag it here</span>
        <span class="so-zone__types">{{ doc.acceptLabel }} · up to 10 MB</span>
      </div>
      <span v-if="dragging" class="so-zone__release">Release to upload</span>
    </div>

    <div v-else class="so-file">
      <span class="so-file__ext" aria-hidden="true">{{ extensionOf(file.name).toUpperCase() }}</span>
      <div class="so-file__meta">
        <span class="so-file__name">{{ file.name }}</span>
        <span class="so-file__size">{{ formatSize(file.size) }} · <span class="so-file__ready">Ready</span></span>
      </div>
      <div class="so-file__actions">
        <button :id="`dp-${doc.key}`" type="button" class="so-file__btn" :aria-label="`Replace ${doc.title}`" @click="pick">
          Replace
        </button>
        <button
          type="button"
          class="so-file__btn so-file__btn--remove"
          :aria-label="`Remove ${file.name} from ${doc.title}`"
          @click="remove"
        >
          Remove
        </button>
      </div>
    </div>

    <SoFieldError v-if="error" :id="`de-${doc.key}`" :message="error" />
  </div>
</template>

<style scoped>
.so-doc {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px clamp(14px, 2.6vw, 20px);
  border-radius: 10px;
  border: 1px solid rgba(0, 39, 127, 0.1);
  background: var(--at-surface);
}
.so-doc__head { display: flex; align-items: flex-start; gap: 14px; }
.so-doc__num {
  flex: 0 0 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 600;
  color: #001738;
  background: #F4F2EC;
}
.so-doc__num.is-done { background: var(--at-teal); }
.so-doc__titles { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.so-doc__title { display: flex; gap: 4px; align-items: baseline; font-size: 15px; font-weight: 600; color: var(--so-ink); }
.so-doc__desc { font-size: 13px; line-height: 1.5; color: var(--so-muted); }
.so-doc__input { display: none; }

.so-zone {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 18px 20px;
  border-radius: 8px;
  border: 1.5px dashed var(--so-zone-line);
  background: var(--at-bg-cream);
  cursor: pointer;
  outline: none;
  transition: background 0.15s, border-color 0.15s;
}
.so-zone.is-invalid { border-color: var(--so-error); background: rgba(179, 38, 30, 0.03); }
.so-zone:focus-visible, .so-zone.is-dragging { border-color: var(--at-teal); }
.so-zone:focus-visible { box-shadow: 0 0 0 3px var(--so-ring); }
.so-zone.is-dragging { background: rgba(0, 194, 169, 0.1); }
.so-zone__tile {
  flex: 0 0 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--at-surface);
  border: 1px solid var(--so-line-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: var(--at-navy);
}
.so-zone__text { flex: 1 1 200px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.so-zone__cta { font-size: 14px; color: var(--so-ink); }
.so-zone__link { font-weight: 600; color: var(--at-navy); text-decoration: underline; text-underline-offset: 2px; }
.so-zone__types { font-family: var(--at-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--so-hint); }
.so-zone__release {
  font-family: var(--at-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
}

.so-file {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding: 12px 14px 12px 12px;
  border-radius: 8px;
  background: rgba(0, 194, 169, 0.07);
  border: 1px solid rgba(0, 139, 120, 0.28);
}
.so-file__ext {
  flex: 0 0 44px;
  height: 44px;
  border-radius: 6px;
  background: var(--at-surface);
  border: 1px solid var(--so-line-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--at-navy);
}
.so-file__meta { flex: 1 1 180px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.so-file__name { font-size: 14px; font-weight: 500; color: var(--so-ink); overflow-wrap: anywhere; }
.so-file__size { font-family: var(--at-mono); font-size: 11px; color: var(--so-hint); }
.so-file__ready { color: var(--at-teal-deep); font-weight: 600; }
.so-file__actions { display: flex; gap: 6px; }
.so-file__btn {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--so-input-line);
  background: var(--at-surface);
  font-family: var(--at-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--so-ink);
  cursor: pointer;
}
.so-file__btn:hover { border-color: var(--at-teal); }
.so-file__btn--remove {
  border-color: transparent;
  background: transparent;
  color: var(--so-error);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.so-file__btn--remove:hover { border-color: transparent; background: rgba(179, 38, 30, 0.06); }
.so-file__btn:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }
</style>

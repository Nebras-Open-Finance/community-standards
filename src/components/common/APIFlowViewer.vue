<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

withDefaults(defineProps<{
  title?: string
  downloadUrl?: string
  eyebrow?: string
}>(), {
  title: 'API Flow',
  downloadUrl: '',
  eyebrow: 'Sequence diagram',
})

const BASE_SCALE = 2.75
// Initial pan offset on open / reset. 0 = top of slotted content sits flush
// with the top of the canvas; the canvas's own padding-top provides the
// visible gap below the toolbar (see .afv-canvas in <style>).
const BASE_Y = 0

const isOpen = ref(false)
const scale = ref(BASE_SCALE)
const panX = ref(0)
const panY = ref(BASE_Y)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0, panX: 0, panY: 0 })

function open() {
  isOpen.value = true
  resetView()
  document.addEventListener('keydown', handleKey)
}

function close() {
  isOpen.value = false
  resetView()
  document.removeEventListener('keydown', handleKey)
  stopDrag()
}

function resetView() {
  scale.value = BASE_SCALE
  panX.value = 0
  panY.value = BASE_Y
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
}

function zoomIn() {
  scale.value = Math.min(+(scale.value + 0.25).toFixed(2), BASE_SCALE * 4)
}

function zoomOut() {
  scale.value = Math.max(+(scale.value - 0.25).toFixed(2), BASE_SCALE * 0.1)
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  isDragging.value = true
  dragStart.value = { x: e.clientX, y: e.clientY, panX: panX.value, panY: panY.value }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDrag)
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  panX.value = dragStart.value.panX + (e.clientX - dragStart.value.x)
  panY.value = dragStart.value.panY + (e.clientY - dragStart.value.y)
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
}

function onTouchStart(e: TouchEvent) {
  const t = e.touches[0]
  if (e.touches.length !== 1 || !t) return
  isDragging.value = true
  dragStart.value = { x: t.clientX, y: t.clientY, panX: panX.value, panY: panY.value }
}

function onTouchMove(e: TouchEvent) {
  const t = e.touches[0]
  if (!isDragging.value || e.touches.length !== 1 || !t) return
  e.preventDefault()
  panX.value = dragStart.value.panX + (t.clientX - dragStart.value.x)
  panY.value = dragStart.value.panY + (t.clientY - dragStart.value.y)
}

onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
  stopDrag()
})
</script>

<template>
  <figure class="afv" @click="open">
    <figcaption class="afv__caption">
      <span class="afv__eyebrow">
        <span class="afv__eyebrow-dash" />
        {{ eyebrow }}
      </span>
      <span class="afv__title">{{ title }}</span>
      <span class="afv__expand-cue">Click to expand <span aria-hidden="true">↗</span></span>
    </figcaption>

    <div class="afv__preview">
      <slot />
    </div>
  </figure>

  <Teleport to="body">
    <div
      v-if="isOpen"
      class="afv-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @click="onOverlayClick"
    >
      <div class="afv-modal" @click.stop>

        <header class="afv-toolbar">
          <div class="afv-toolbar__left">
            <button
              class="afv-btn"
              :disabled="scale <= BASE_SCALE * 0.1"
              title="Zoom out (-)"
              aria-label="Zoom out"
              @click="zoomOut"
            >−</button>
            <span class="afv-zoom">{{ Math.round((scale / BASE_SCALE) * 100) }}%</span>
            <button
              class="afv-btn"
              :disabled="scale >= BASE_SCALE * 4"
              title="Zoom in (+)"
              aria-label="Zoom in"
              @click="zoomIn"
            >+</button>
            <button class="afv-btn-text" @click="resetView">Reset</button>
          </div>

          <div class="afv-toolbar__center">
            <span class="afv-toolbar__eyebrow">{{ eyebrow }}</span>
            <span class="afv-toolbar__title">{{ title }}</span>
          </div>

          <div class="afv-toolbar__right">
            <a
              v-if="downloadUrl"
              :href="downloadUrl"
              download
              class="afv-btn-text afv-btn-text--accent"
            >Download <span aria-hidden="true">↓</span></a>
            <button
              class="afv-btn afv-btn--close"
              title="Close (Esc)"
              aria-label="Close"
              @click="close"
            >✕</button>
          </div>
        </header>

        <div
          class="afv-canvas"
          :class="{ 'is-dragging': isDragging }"
          :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
          @wheel.prevent="onWheel"
          @mousedown="onMouseDown"
          @touchstart.passive="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="isDragging = false"
        >
          <div
            class="afv-canvas__content"
            :style="{ transform: `translate(${panX}px, ${panY}px) scale(${scale})` }"
          >
            <slot />
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.afv {
  display: block;
  margin: 1.5rem 0;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  cursor: zoom-in;
  transition: border-color 0.18s ease, background 0.18s ease;
}
.afv:hover {
  border-color: var(--at-teal);
  background: var(--at-surface);
}
.afv:hover .afv__expand-cue { color: var(--at-teal-deep); }

.afv__caption {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.afv__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
}
.afv__eyebrow-dash {
  width: 18px;
  height: 1px;
  background: currentColor;
}

.afv__title {
  font-family: var(--at-serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
  text-align: left;
}

.afv__expand-cue {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  white-space: nowrap;
  transition: color 0.18s ease;
}

.afv__preview {
  pointer-events: none;
  user-select: none;
  padding: 1.25rem 1.5rem;
}

@media (max-width: 720px) {
  .afv__caption {
    grid-template-columns: 1fr;
    gap: 0.4rem;
    padding: 0.85rem 1rem;
  }
  .afv__expand-cue { display: none; }
}
</style>

<style>
/* unscoped — modal is teleported to <body> */
.afv-overlay {
  position: fixed;
  inset: 0;
  /* Sit above PageHeader (z-index: 99999 in components/chrome/PageHeader.vue). */
  z-index: 100000;
  background: rgba(0, 23, 56, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vh 2vw;
}

.afv-modal {
  display: flex;
  flex-direction: column;
  width: 96vw;
  height: 94vh;
  max-width: var(--at-page-max);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  box-shadow: 0 30px 80px rgba(0, 23, 56, 0.45);
  overflow: hidden;
  font-family: var(--at-sans);
}

.afv-toolbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  flex-shrink: 0;
}

.afv-toolbar__left,
.afv-toolbar__right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.afv-toolbar__right { justify-content: flex-end; }

.afv-toolbar__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  text-align: center;
  min-width: 0;
}
.afv-toolbar__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 600;
}
.afv-toolbar__title {
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50vw;
}

.afv-btn {
  width: 30px;
  height: 30px;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  color: var(--at-navy-deep);
  font-family: var(--at-mono);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  line-height: 1;
  padding: 0;
}
.afv-btn:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.afv-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.afv-btn-text {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
  padding: 0.4rem 0.6rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.15s ease, background 0.15s ease;
}
.afv-btn-text:hover {
  color: var(--at-navy-deep);
  background: var(--at-grid-line);
}
.afv-btn-text--accent { color: var(--at-teal-deep); }
.afv-btn-text--accent:hover { color: var(--at-navy-deep); }

.afv-zoom {
  font-family: var(--at-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  min-width: 44px;
  text-align: center;
}

.afv-btn--close {
  margin-left: 0.35rem;
}
.afv-btn--close:hover:not(:disabled) {
  background: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
  color: var(--at-surface);
}

.afv-canvas {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: var(--at-bg-paper);
  user-select: none;
  cursor: grab;
  /* Gap below the toolbar so the slotted diagram's top edge isn't flush
     against the modal header. Lives on the canvas (not on the content) so
     it isn't multiplied by the transform scale. */
  padding-top: 1.5rem;
}
.afv-canvas.is-dragging {
  cursor: grabbing;
  user-select: none;
}

.afv-canvas__content {
  transform-origin: top center;
  transition: transform 0.08s ease;
  pointer-events: none;
  user-select: none;
}
.afv-canvas.is-dragging .afv-canvas__content {
  transition: none;
}

@media (max-width: 720px) {
  .afv-toolbar {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    gap: 0.5rem 0.75rem;
  }
  .afv-toolbar__center {
    grid-column: 1 / -1;
    grid-row: 1;
    align-items: flex-start;
    text-align: left;
  }
  .afv-toolbar__left {
    grid-column: 1;
    grid-row: 2;
  }
  .afv-toolbar__right {
    grid-column: 2;
    grid-row: 2;
  }
  .afv-toolbar__title { max-width: 100%; }
}
</style>

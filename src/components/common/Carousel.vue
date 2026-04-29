<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue'

interface CarouselImage {
  src: string
  alt?: string
  title?: string
  tagline?: string
}

const props = defineProps<{
  images: CarouselImage[]
}>()

const currentIndex = ref(0)
const total = computed(() => props.images?.length ?? 0)
const current = computed<CarouselImage | undefined>(() => props.images?.[currentIndex.value])

function next() {
  if (total.value === 0) return
  currentIndex.value = (currentIndex.value + 1) % total.value
}

function prev() {
  if (total.value === 0) return
  currentIndex.value = (currentIndex.value - 1 + total.value) % total.value
}

const isOpen = ref(false)
const scale = ref(1)
const panX = ref(0)
const panY = ref(0)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0, panX: 0, panY: 0 })

function resetView() {
  scale.value = 1
  panX.value = 0
  panY.value = 0
}

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

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
  if (e.key === 'ArrowRight' && currentIndex.value < total.value - 1) nextAndReset()
  if (e.key === 'ArrowLeft' && currentIndex.value > 0) prevAndReset()
}

function zoomIn() {
  scale.value = Math.min(+(scale.value + 0.25).toFixed(2), 4)
}

function zoomOut() {
  const n = Math.max(+(scale.value - 0.25).toFixed(2), 1)
  scale.value = n
  if (n === 1) { panX.value = 0; panY.value = 0 }
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

function nextAndReset() {
  next()
  resetView()
}

function prevAndReset() {
  prev()
  resetView()
}

function download() {
  const img = current.value
  if (!img?.src) return
  const a = document.createElement('a')
  a.href = img.src
  a.download = img.src.split('/').pop() || 'image'
  a.click()
}

function onMouseDown(e: MouseEvent) {
  if (scale.value <= 1) return
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
  if (scale.value <= 1 || e.touches.length !== 1 || !t) return
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
  <figure v-if="total" class="crs">
    <figcaption v-if="current?.title" class="crs__title">{{ current.title }}</figcaption>

    <div class="crs__frame" @click="open">
      <img
        v-if="current?.src"
        :src="current.src"
        :alt="current.alt || ''"
        class="crs__img"
      />
      <span v-if="current?.tagline" class="crs__tagline" v-html="current.tagline" />
      <span class="crs__cue" aria-hidden="true">Click to expand <span>↗</span></span>
    </div>

    <div class="crs__controls">
      <span class="crs__step">Step {{ currentIndex + 1 }} / {{ total }}</span>
      <div class="crs__nav">
        <button
          class="crs-step-btn"
          :disabled="currentIndex === 0"
          @click="prev"
        ><span aria-hidden="true">←</span> Previous</button>
        <button
          class="crs-step-btn"
          :disabled="currentIndex >= total - 1"
          @click="next"
        >Next <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </figure>

  <Teleport to="body">
    <div
      v-if="isOpen"
      class="crs-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="current?.title || 'Image carousel'"
      @click="onOverlayClick"
    >
      <div class="crs-modal" @click.stop>

        <header class="crs-toolbar">
          <div class="crs-toolbar__left">
            <button class="crs-btn" :disabled="currentIndex <= 0" title="Previous (←)" aria-label="Previous" @click="prevAndReset">‹</button>
            <span class="crs-step-pill">{{ currentIndex + 1 }} / {{ total }}</span>
            <button class="crs-btn" :disabled="currentIndex >= total - 1" title="Next (→)" aria-label="Next" @click="nextAndReset">›</button>
          </div>

          <div class="crs-toolbar__center">
            <span class="crs-toolbar__eyebrow">Step {{ currentIndex + 1 }}</span>
            <span v-if="current?.title" class="crs-toolbar__title">{{ current.title }}</span>
          </div>

          <div class="crs-toolbar__right">
            <button class="crs-btn" :disabled="scale <= 1" title="Zoom out (-)" aria-label="Zoom out" @click="zoomOut">−</button>
            <span class="crs-zoom">{{ Math.round(scale * 100) }}%</span>
            <button class="crs-btn" :disabled="scale >= 4" title="Zoom in (+)" aria-label="Zoom in" @click="zoomIn">+</button>
            <button class="crs-btn-text" @click="resetView">Reset</button>
            <button class="crs-btn-text" @click="download">Download <span aria-hidden="true">↓</span></button>
            <button class="crs-btn crs-btn--close" title="Close (Esc)" aria-label="Close" @click="close">✕</button>
          </div>
        </header>

        <div
          class="crs-canvas"
          :class="{ 'is-dragging': isDragging }"
          :style="{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }"
          @wheel.prevent="onWheel"
          @mousedown="onMouseDown"
          @touchstart.passive="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="isDragging = false"
        >
          <img
            v-if="current?.src"
            :src="current.src"
            :alt="current.alt || ''"
            class="crs-img"
            :style="{ transform: `translate(${panX}px, ${panY}px) scale(${scale})` }"
            draggable="false"
          />
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.crs {
  display: block;
  margin: 1.5rem 0;
}

.crs__title {
  font-family: var(--at-serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
  margin: 0 0 0.6rem;
}

.crs__frame {
  position: relative;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  overflow: hidden;
  cursor: zoom-in;
  transition: border-color 0.18s ease;
}
.crs__frame:hover { border-color: var(--at-teal); }
.crs__frame:hover .crs__cue { opacity: 1; }

.crs__img {
  display: block;
  width: 100%;
  height: auto;
}

.crs__tagline {
  position: absolute;
  bottom: 0.6rem;
  left: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 0.3em 0.55em;
  pointer-events: none;
}

.crs__cue {
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-surface);
  background: var(--at-navy-deep);
  padding: 0.3em 0.6em;
  display: inline-flex;
  gap: 0.4em;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.18s ease;
}

.crs__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.85rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.crs__step {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
}

.crs__nav {
  display: flex;
  gap: 0.5rem;
}

.crs-step-btn {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
  padding: 0.5rem 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.crs-step-btn:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.crs-step-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>

<style>
/* unscoped — modal is teleported to <body> */
.crs-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: rgba(0, 23, 56, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vh 2vw;
}

.crs-modal {
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

.crs-toolbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  flex-shrink: 0;
}

.crs-toolbar__left,
.crs-toolbar__right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.crs-toolbar__right { justify-content: flex-end; }

.crs-toolbar__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  text-align: center;
  min-width: 0;
}
.crs-toolbar__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 600;
}
.crs-toolbar__title {
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

.crs-btn {
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
.crs-btn:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.crs-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.crs-btn-text {
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
.crs-btn-text:hover {
  color: var(--at-navy-deep);
  background: var(--at-grid-line);
}

.crs-zoom,
.crs-step-pill {
  font-family: var(--at-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  text-align: center;
}
.crs-zoom { min-width: 44px; }
.crs-step-pill { min-width: 56px; }

.crs-btn--close {
  margin-left: 0.35rem;
}
.crs-btn--close:hover:not(:disabled) {
  background: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
  color: var(--at-surface);
}

.crs-canvas {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-bg-paper);
  user-select: none;
  padding: 1.5rem;
}
.crs-canvas.is-dragging { user-select: none; }

.crs-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  transform-origin: center center;
  transition: transform 0.08s ease;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}
.crs-canvas.is-dragging .crs-img { transition: none; }

@media (max-width: 720px) {
  .crs-toolbar {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    gap: 0.5rem 0.75rem;
  }
  .crs-toolbar__center {
    grid-column: 1 / -1;
    grid-row: 1;
    align-items: flex-start;
    text-align: left;
  }
  .crs-toolbar__left {
    grid-column: 1;
    grid-row: 2;
  }
  .crs-toolbar__right {
    grid-column: 2;
    grid-row: 2;
    flex-wrap: wrap;
  }
  .crs-toolbar__title { max-width: 100%; }
}
</style>

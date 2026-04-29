<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  alt?: string
  figmaUrl?: string
  caption?: string
}>(), {
  alt: '',
  figmaUrl: '',
  caption: '',
})

const isOpen = ref(false)
const scale = ref(1)
const panX = ref(0)
const panY = ref(0)
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
  scale.value = 1
  panX.value = 0
  panY.value = 0
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
}

function zoomIn() {
  scale.value = Math.min(+(scale.value + 0.25).toFixed(2), 4)
}

function zoomOut() {
  const next = Math.max(+(scale.value - 0.25).toFixed(2), 1)
  scale.value = next
  if (next === 1) { panX.value = 0; panY.value = 0 }
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

function download() {
  const a = document.createElement('a')
  a.href = props.src
  a.download = props.src.split('/').pop() || 'image'
  a.click()
}

onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
  stopDrag()
})
</script>

<template>
  <figure class="iv" @click="open">
    <div class="iv__frame">
      <img :src="src" :alt="alt" class="iv__thumb" />
      <span class="iv__cue" aria-hidden="true">Click to expand <span>↗</span></span>
    </div>
    <figcaption v-if="caption || alt" class="iv__caption">
      {{ caption || alt }}
    </figcaption>
  </figure>

  <Teleport to="body">
    <div
      v-if="isOpen"
      class="iv-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="alt || 'Image viewer'"
      @click="onOverlayClick"
    >
      <div class="iv-modal" @click.stop>

        <header class="iv-toolbar">
          <div class="iv-toolbar__left">
            <button class="iv-btn" :disabled="scale <= 1" title="Zoom out (-)" aria-label="Zoom out" @click="zoomOut">−</button>
            <span class="iv-zoom">{{ Math.round(scale * 100) }}%</span>
            <button class="iv-btn" :disabled="scale >= 4" title="Zoom in (+)" aria-label="Zoom in" @click="zoomIn">+</button>
            <button class="iv-btn-text" @click="resetView">Reset</button>
          </div>

          <div class="iv-toolbar__center">
            <span class="iv-toolbar__eyebrow">Image</span>
            <span v-if="alt || caption" class="iv-toolbar__title">{{ caption || alt }}</span>
          </div>

          <div class="iv-toolbar__right">
            <a
              v-if="figmaUrl"
              :href="figmaUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="iv-btn-text iv-btn-text--accent"
            >Figma <span aria-hidden="true">↗</span></a>
            <button class="iv-btn-text" @click="download">Download <span aria-hidden="true">↓</span></button>
            <button class="iv-btn iv-btn--close" title="Close (Esc)" aria-label="Close" @click="close">✕</button>
          </div>
        </header>

        <div
          class="iv-canvas"
          :class="{ 'is-dragging': isDragging }"
          :style="{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }"
          @wheel.prevent="onWheel"
          @mousedown="onMouseDown"
          @touchstart.passive="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="isDragging = false"
        >
          <img
            :src="src"
            :alt="alt"
            class="iv-img"
            :style="{ transform: `translate(${panX}px, ${panY}px) scale(${scale})` }"
            draggable="false"
          />
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.iv {
  display: block;
  margin: 1.5rem 0;
  cursor: zoom-in;
}

.iv__frame {
  position: relative;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  overflow: hidden;
  transition: border-color 0.18s ease;
}
.iv:hover .iv__frame { border-color: var(--at-teal); }
.iv:hover .iv__cue   { opacity: 1; }

.iv__thumb {
  display: block;
  width: 100%;
  height: auto;
}

.iv__cue {
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

.iv__caption {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--at-mute-2);
  margin-top: 0.6rem;
  padding-left: 0.1rem;
}
</style>

<style>
/* unscoped — modal is teleported to <body> */
.iv-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: rgba(0, 23, 56, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vh 2vw;
}

.iv-modal {
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

.iv-toolbar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  flex-shrink: 0;
}

.iv-toolbar__left,
.iv-toolbar__right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.iv-toolbar__right { justify-content: flex-end; }

.iv-toolbar__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  text-align: center;
  min-width: 0;
}
.iv-toolbar__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 600;
}
.iv-toolbar__title {
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

.iv-btn {
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
.iv-btn:hover:not(:disabled) {
  background: var(--at-bg-cream);
  border-color: var(--at-teal);
  color: var(--at-teal-deep);
}
.iv-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.iv-btn-text {
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
.iv-btn-text:hover {
  color: var(--at-navy-deep);
  background: var(--at-grid-line);
}
.iv-btn-text--accent { color: var(--at-teal-deep); }
.iv-btn-text--accent:hover { color: var(--at-navy-deep); }

.iv-zoom {
  font-family: var(--at-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  min-width: 44px;
  text-align: center;
}

.iv-btn--close {
  margin-left: 0.35rem;
}
.iv-btn--close:hover:not(:disabled) {
  background: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
  color: var(--at-surface);
}

.iv-canvas {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-bg-paper);
  user-select: none;
  padding: 1.5rem;
}
.iv-canvas.is-dragging { user-select: none; }

.iv-img {
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
.iv-canvas.is-dragging .iv-img { transition: none; }

@media (max-width: 720px) {
  .iv-toolbar {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    gap: 0.5rem 0.75rem;
  }
  .iv-toolbar__center {
    grid-column: 1 / -1;
    grid-row: 1;
    align-items: flex-start;
    text-align: left;
  }
  .iv-toolbar__left {
    grid-column: 1;
    grid-row: 2;
  }
  .iv-toolbar__right {
    grid-column: 2;
    grid-row: 2;
  }
  .iv-toolbar__title { max-width: 100%; }
}
</style>

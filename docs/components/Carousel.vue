<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images?.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images?.length) % props.images?.length
}

// --- ImageViewer overlay state ---
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

function handleKey(e) {
  if (e.key === 'Escape') close()
  if (e.key === '+' || e.key === '=') zoomIn()
  if (e.key === '-') zoomOut()
  if (e.key === 'ArrowRight' && currentIndex.value < props.images.length - 1) { nextAndReset() }
  if (e.key === 'ArrowLeft' && currentIndex.value > 0) { prevAndReset() }
}

function zoomIn() {
  scale.value = Math.min(+(scale.value + 0.25).toFixed(2), 4)
}

function zoomOut() {
  const next = Math.max(+(scale.value - 0.25).toFixed(2), 1)
  scale.value = next
  if (next === 1) { panX.value = 0; panY.value = 0 }
}

function onWheel(e) {
  e.preventDefault()
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

function onOverlayClick(e) {
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
  const img = props.images[currentIndex.value]
  if (!img?.src) return
  const a = document.createElement('a')
  a.href = img.src
  a.download = img.src.split('/').pop() || 'image'
  a.click()
}

// --- Drag to pan ---
function onMouseDown(e) {
  if (scale.value <= 1) return
  e.preventDefault()
  isDragging.value = true
  dragStart.value = { x: e.clientX, y: e.clientY, panX: panX.value, panY: panY.value }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDrag)
}

function onMouseMove(e) {
  if (!isDragging.value) return
  panX.value = dragStart.value.panX + (e.clientX - dragStart.value.x)
  panY.value = dragStart.value.panY + (e.clientY - dragStart.value.y)
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
}

// --- Touch to pan ---
function onTouchStart(e) {
  if (scale.value <= 1 || e.touches.length !== 1) return
  const t = e.touches[0]
  isDragging.value = true
  dragStart.value = { x: t.clientX, y: t.clientY, panX: panX.value, panY: panY.value }
}

function onTouchMove(e) {
  if (!isDragging.value || e.touches.length !== 1) return
  e.preventDefault()
  const t = e.touches[0]
  panX.value = dragStart.value.panX + (t.clientX - dragStart.value.x)
  panY.value = dragStart.value.panY + (t.clientY - dragStart.value.y)
}

onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
  stopDrag()
})
</script>

<template>
  <div v-if="images" class="carousel">
    <div class="title">
      {{ images[currentIndex]?.title }}
    </div>
    <div class="image-container" @click="open" title="Click to expand">
      <img
        v-if="images[currentIndex].src"
        :src="images[currentIndex].src"
        :alt="images[currentIndex].alt"
        class="carousel-image"
      />
      <div v-html="images[currentIndex].tagline" class="tag-line"></div>
      <div class="iv-hint">Click to expand</div>
    </div>

    <div class="controls">
      <div class="step-label">Step {{ currentIndex + 1 }}/{{ images.length }}</div>
      <button class="small-btn" v-if="currentIndex > 0" @click="prev">← Previous</button>
      <button class="small-btn" v-if="currentIndex < images.length - 1" @click="next">Next →</button>
    </div>
  </div>

  <!-- Expanded overlay (reuses ImageViewer pattern) -->
  <Teleport to="body">
    <div v-if="isOpen" class="iv-overlay" @click="onOverlayClick">
      <div class="iv-box" @click.stop>

        <div class="iv-toolbar">
          <div class="iv-toolbar-left">
            <button class="iv-btn" @click="prevAndReset" :disabled="currentIndex <= 0" title="Previous (←)">‹</button>
            <span class="iv-step-label">{{ currentIndex + 1 }} / {{ images.length }}</span>
            <button class="iv-btn" @click="nextAndReset" :disabled="currentIndex >= images.length - 1" title="Next (→)">›</button>
          </div>

          <div class="iv-toolbar-center">
            <span class="iv-title">{{ images[currentIndex]?.title }}</span>
          </div>

          <div class="iv-toolbar-right">
            <button class="iv-btn" @click="zoomOut" :disabled="scale <= 1" title="Zoom out (-)">−</button>
            <span class="iv-zoom-pct">{{ Math.round(scale * 100) }}%</span>
            <button class="iv-btn" @click="zoomIn" :disabled="scale >= 4" title="Zoom in (+)">+</button>
            <button class="iv-btn-text" @click="resetView">Reset</button>
            <button class="iv-btn-text" @click="download">Download ↓</button>
            <button class="iv-btn iv-close" @click="close" title="Close (Esc)">✕</button>
          </div>
        </div>

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
            :src="images[currentIndex]?.src"
            :alt="images[currentIndex]?.alt"
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
.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
}

.title {
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
}

.image-container {
  width: 100%;
  position: relative;
  text-align: center;
  cursor: zoom-in;
}

.image-container:hover .carousel-image {
  box-shadow: 0 6px 20px rgba(0, 39, 127, 0.2);
}

.image-container:hover .iv-hint {
  opacity: 1;
}

.carousel-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s ease;
}

.tag-line {
  position: absolute;
  font-size: 0.8em;
  bottom: 6px;
  left: 8px;
  background: white;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 6px;
}

.iv-hint {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 39, 127, 0.75);
  color: #fff;
  font-size: 0.72rem;
  padding: 3px 8px;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.step-label {
  font-size: 0.75rem;
  padding-top: 0.4rem;
  font-weight: bold;
  margin-right: auto
}

.controls {
  margin-top: 0.75rem;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  display: flex;
  gap: 1rem;
}

.small-btn {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.small-btn:hover {
  background-color: #2563eb;
}

/* Overlay toolbar additions */
.iv-toolbar-center {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.iv-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.iv-step-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #4a5568;
  min-width: 50px;
  text-align: center;
}
</style>

<!-- Unscoped: reuses ImageViewer overlay classes -->
<style>
.iv-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vh 2vw;
}

.iv-box {
  display: flex;
  flex-direction: column;
  width: 96vw;
  height: 94vh;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.iv-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: #f5f7fa;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
  gap: 0.5rem;
}

.iv-toolbar-left,
.iv-toolbar-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.iv-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  background: #fff;
  color: #2d3748;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
  line-height: 1;
  padding: 0;
}

.iv-btn:hover:not(:disabled) {
  background: #e8f0fe;
  border-color: rgba(0, 39, 127, 0.5);
  color: rgba(0, 39, 127, 1);
}

.iv-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.iv-btn-text {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: #4a5568;
  padding: 4px 8px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background 0.15s, color 0.15s;
}

.iv-btn-text:hover {
  background: #e8f0fe;
  color: rgba(0, 39, 127, 1);
}

.iv-zoom-pct {
  font-size: 0.78rem;
  font-weight: 600;
  color: #4a5568;
  min-width: 40px;
  text-align: center;
}

.iv-close {
  background: #fff0f0;
  border-color: #fed7d7;
  color: #c53030;
  margin-left: 0.25rem;
}

.iv-close:hover {
  background: #fed7d7;
  border-color: #fc8181;
  color: #9b2c2c;
}

.iv-canvas {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4f8;
  user-select: none;
}

.iv-canvas.is-dragging {
  user-select: none;
}

.iv-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 4px;
  transform-origin: center center;
  transition: transform 0.08s ease;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.iv-canvas.is-dragging .iv-img {
  transition: none;
}
</style>

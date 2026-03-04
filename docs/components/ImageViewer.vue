<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  figmaUrl: { type: String, default: null }
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

function handleKey(e) {
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

function onWheel(e) {
  e.preventDefault()
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget) close()
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
  <div class="iv-wrap" @click="open" :title="`Click to expand: ${alt}`">
    <img :src="src" :alt="alt" class="iv-thumb" />
    <div class="iv-hint">Click to expand</div>
  </div>

  <Teleport to="body">
    <div v-if="isOpen" class="iv-overlay" @click="onOverlayClick">
      <div class="iv-box" @click.stop>

        <div class="iv-toolbar">
          <div class="iv-toolbar-left">
            <button class="iv-btn" @click="zoomOut" :disabled="scale <= 1" title="Zoom out (-)">−</button>
            <span class="iv-zoom-pct">{{ Math.round(scale * 100) }}%</span>
            <button class="iv-btn" @click="zoomIn" :disabled="scale >= 4" title="Zoom in (+)">+</button>
            <button class="iv-btn-text" @click="resetView">Reset</button>
          </div>
          <div class="iv-toolbar-right">
            <a
              v-if="figmaUrl"
              :href="figmaUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="iv-btn-text iv-figma"
            >Figma ↗</a>
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
.iv-wrap {
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: zoom-in;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.iv-thumb {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: block;
  transition: box-shadow 0.2s ease;
}

.iv-wrap:hover .iv-thumb {
  box-shadow: 0 6px 20px rgba(0, 39, 127, 0.2);
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

.iv-wrap:hover .iv-hint {
  opacity: 1;
}
</style>

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

.iv-figma {
  color: #6b46c1;
}

.iv-figma:hover {
  background: #f3f0ff !important;
  color: #553c9a !important;
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

/* Canvas: fixed size, never changes, clip overflow */
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

/* Image: fits canvas at scale 1, transform does the rest */
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

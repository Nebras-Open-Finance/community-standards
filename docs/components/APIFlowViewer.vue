<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  title: { type: String, default: 'API Flow' },
  downloadUrl: { type: String, default: null }
})

const BASE_SCALE = 2.75

const isOpen = ref(false)
const scale = ref(BASE_SCALE)
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
  scale.value = BASE_SCALE
  panX.value = 0
  panY.value = 0
}

function handleKey(e) {
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

function onWheel(e) {
  e.preventDefault()
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget) close()
}

function onMouseDown(e) {
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

function onTouchStart(e) {
  if (e.touches.length !== 1) return
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
  <div class="afv-wrap" @click="open" :title="`Click to expand: ${title}`">
    <div v-if="!isOpen" class="afv-preview">
      <slot />
    </div>
    <div class="afv-hint">Click to expand</div>
  </div>

  <Teleport to="body">
    <div v-if="isOpen" class="afv-overlay" @click="onOverlayClick">
      <div class="afv-box" @click.stop>

        <div class="afv-toolbar">
          <div class="afv-toolbar-left">
            <button class="afv-btn" @click="zoomOut" :disabled="scale <= BASE_SCALE * 0.1" title="Zoom out (-)">−</button>
            <span class="afv-zoom-pct">{{ Math.round((scale / BASE_SCALE) * 100) }}%</span>
            <button class="afv-btn" @click="zoomIn" :disabled="scale >= BASE_SCALE * 4" title="Zoom in (+)">+</button>
            <button class="afv-btn-text" @click="resetView">Reset</button>
          </div>
          <div class="afv-toolbar-center">
            <span class="afv-title">{{ title }}</span>
          </div>
          <div class="afv-toolbar-right">
            <a
              v-if="downloadUrl"
              :href="downloadUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="afv-btn-text afv-download"
            >Download Full API Flow ↓</a>
            <button class="afv-btn afv-close" @click="close" title="Close (Esc)">✕</button>
          </div>
        </div>

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
            class="afv-content"
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
.afv-wrap {
  position: relative;
  display: block;
  width: 100%;
  cursor: zoom-in;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: #f8fafc;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.afv-wrap:hover {
  box-shadow: 0 6px 20px rgba(0, 39, 127, 0.12);
  border-color: rgba(0, 39, 127, 0.3);
}

.afv-preview {
  pointer-events: none;
  user-select: none;
  transform-origin: top left;
  padding: 1rem;
}

.afv-hint {
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

.afv-wrap:hover .afv-hint {
  opacity: 1;
}
</style>

<style>
.afv-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vh 2vw;
}

.afv-box {
  display: flex;
  flex-direction: column;
  width: 96vw;
  height: 94vh;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.afv-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: #f5f7fa;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
  gap: 0.5rem;
}

.afv-toolbar-left,
.afv-toolbar-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
}

.afv-toolbar-right {
  justify-content: flex-end;
}

.afv-toolbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.afv-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3748;
  white-space: nowrap;
}

.afv-btn {
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

.afv-btn:hover:not(:disabled) {
  background: #e8f0fe;
  border-color: rgba(0, 39, 127, 0.5);
  color: rgba(0, 39, 127, 1);
}

.afv-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.afv-btn-text {
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

.afv-btn-text:hover {
  background: #e8f0fe;
  color: rgba(0, 39, 127, 1);
}

.afv-download {
  color: rgba(0, 39, 127, 1);
  font-weight: 500;
}

.afv-zoom-pct {
  font-size: 0.78rem;
  font-weight: 600;
  color: #4a5568;
  min-width: 40px;
  text-align: center;
}

.afv-close {
  background: #fff0f0;
  border-color: #fed7d7;
  color: #c53030;
  margin-left: 0.25rem;
}

.afv-close:hover {
  background: #fed7d7;
  border-color: #fc8181;
  color: #9b2c2c;
}

.afv-canvas {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: #f0f4f8;
  user-select: none;
  cursor: grab;
}

.afv-canvas.is-dragging {
  cursor: grabbing;
  user-select: none;
}

.afv-content {
  transform-origin: top center;
  transition: transform 0.08s ease;
  pointer-events: none;
  user-select: none;
  padding: 2rem;
}

.afv-canvas.is-dragging .afv-content {
  transition: none;
}
</style>

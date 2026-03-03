<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const router = useRouter()

// Add new versions here as they are released
const VERSIONS = ['v2.1']

const currentVersion = 'v2.1'

const showVersion = route.path.startsWith('/tech/tpp-standards/') || route.path.startsWith('/tech/lfi-api-hub/')

const isOpen = ref(false)
const dropdownEl = ref<HTMLElement | null>(null)

function selectVersion(v: string) {
  isOpen.value = false
  if (!currentVersion || v === currentVersion) return
  const newPath = route.path.replace(`/${currentVersion}/`, `/${v}/`)
  router.go(newPath)
}

function handleOutsideClick(e: MouseEvent) {
  if (dropdownEl.value && !dropdownEl.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick, true))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick, true))
</script>

<template>
  <div v-if="showVersion" ref="dropdownEl" class="vd-wrap" :class="{ open: isOpen }">
    <button class="vd-btn" :aria-expanded="isOpen" @click.stop="isOpen = !isOpen">
      {{ currentVersion }}
      <svg class="vd-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div class="vd-menu" role="listbox">
      <button
        v-for="v in VERSIONS"
        :key="v"
        role="option"
        class="vd-item"
        :class="{ active: v === currentVersion }"
        @click="selectVersion(v)"
      >
        {{ v }}
        <svg v-if="v === currentVersion" class="vd-check" xmlns="http://www.w3.org/2000/svg"
          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>

.vd-wrap::before {
    margin-right: 18px;
    margin-left: 8px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    content: "";
}

.vd-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
}

.vd-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px 3px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
  user-select: none;
}

.vd-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elv);
}

.vd-chevron {
  transition: transform 0.18s ease;
  opacity: 0.7;
}

.open .vd-chevron {
  transform: rotate(180deg);
}

/* ── Dropdown menu ── */
.vd-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 90px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 4px;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s;
}

.open .vd-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.vd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-family: var(--vp-font-family-mono);
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;
}

.vd-item:hover {
  background: var(--vp-c-bg-soft);
}

.vd-item.active {
  color: var(--vp-c-brand-1);
}

.vd-check {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
}
</style>

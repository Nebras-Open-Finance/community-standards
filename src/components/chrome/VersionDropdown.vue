<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { VERSIONS, isDraftVersion, type Version } from '@/data/versions'

const route = useRoute()
const router = useRouter()

const { selectedVersion, setSelectedVersion } = useSelectedVersion()

// Release notes, erratas and changelogs cover every version at once, so there is
// no single "selected version" for the reader to switch between there.
const RELEASE_NOTES_PREFIX = '/tech/release-notes-and-erratas'

const showVersion = computed<boolean>(
  () => route.path.startsWith('/tech/') && !route.path.startsWith(RELEASE_NOTES_PREFIX),
)

const isOpen = ref<boolean>(false)
const dropdownEl = ref<HTMLElement | null>(null)

function selectVersion(v: Version): void {
  isOpen.value = false
  const oldVersion = selectedVersion.value
  setSelectedVersion(v)
  if (!oldVersion || v === oldVersion) return
  if (route.path.includes(`/${oldVersion}/`)) {
    const newPath = route.path.replace(`/${oldVersion}/`, `/${v}/`)
    void router.push(newPath)
  }
}

function handleOutsideClick(e: MouseEvent): void {
  const target = e.target
  if (!(target instanceof Node)) return
  if (dropdownEl.value && !dropdownEl.value.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick, true))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick, true))
</script>

<template>
  <div v-if="showVersion" ref="dropdownEl" class="vd-wrap" :class="{ open: isOpen }">
    <button
      type="button"
      class="vd-btn"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click.stop="isOpen = !isOpen"
    >
      {{ selectedVersion }}
      <svg class="vd-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div class="vd-menu" role="listbox">
      <button
        v-for="v in VERSIONS"
        :key="v"
        type="button"
        role="option"
        class="vd-item"
        :class="{ active: v === selectedVersion }"
        :aria-selected="v === selectedVersion ? 'true' : 'false'"
        @click="selectVersion(v)"
      >
        <span class="vd-label">
          {{ v }}
          <span v-if="isDraftVersion(v)" class="vd-draft">draft</span>
        </span>
        <svg v-if="v === selectedVersion" class="vd-check" xmlns="http://www.w3.org/2000/svg"
          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.vd-wrap::before {
  margin-right: 14px;
  margin-left: 4px;
  width: 1px;
  height: 24px;
  background-color: var(--at-grid-line-2);
  content: "";
}

.vd-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.vd-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-family: var(--at-mono);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--at-navy-deep);
  background: none;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s, background 0.15s;
  user-select: none;
}

.vd-btn:hover {
  color: var(--at-teal-deep);
  background: rgba(0, 194, 169, 0.08);
}

.vd-chevron {
  transition: transform 0.18s ease;
  opacity: 0.7;
}

.open .vd-chevron {
  transform: rotate(180deg);
}

.vd-menu {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  min-width: 140px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  border-radius: 0;
  box-shadow: 0 14px 40px rgba(0, 23, 56, 0.14);
  padding: 0.35rem;
  z-index: 100000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
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
  padding: 0.6rem 0.75rem;
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: none;
  color: var(--at-navy-deep);
  background: none;
  border: 0;
  border-bottom: 1px solid var(--at-grid-line);
  border-radius: 0;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s, color 0.12s;
}

.vd-item:last-child {
  border-bottom: 0;
}

.vd-item:hover {
  background: rgba(0, 194, 169, 0.08);
}

.vd-item.active {
  color: var(--at-teal-deep);
}

.vd-check {
  flex-shrink: 0;
  color: var(--at-teal-deep);
}

.vd-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.vd-draft {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7c2d12;
  background: #fde68a;
  padding: 0.12rem 0.35rem;
}
</style>

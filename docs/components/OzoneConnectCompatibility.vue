<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { CURRENT_VERSION, VERSION_TPP_COMPATIBILITY } from '../.vitepress/version'

const route = useRoute()

const pageVersion = computed(() => {
  const match = route.path.match(/\/v(\d+\.\d+)\//)
  return match ? `v${match[1]}` : CURRENT_VERSION
})

const supportedVersions = computed(() => {
  return VERSION_TPP_COMPATIBILITY[pageVersion.value] ?? [pageVersion.value]
})

const currentTppVersion = computed(() => supportedVersions.value[0])
</script>

<template>
  <div class="compat-block">
    <div class="compat-header">
      <span class="compat-label">Ozone Connect</span>
      <span class="compat-version">{{ pageVersion }}</span>
      <span class="compat-label">Supports the following Versions of the TPP Standards:</span>
    </div>
    <div class="compat-versions">
      <div
        v-for="v in supportedVersions"
        :key="v"
        class="compat-item"
        :class="{ current: v === currentTppVersion, legacy: v !== currentTppVersion }"
      >
        <span class="compat-item-version">{{ v }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.compat-block {
  margin: 24px 0;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.compat-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.compat-version {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 2px 8px;
  border-radius: 5px;
}

.compat-arrow {
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

.compat-versions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.compat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 7px;
  border: 1px solid;
}

.compat-item {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}


.compat-item-version {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.compat-item-tag {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  padding: 1px 6px;
  border-radius: 4px;
}

.compat-item.current .compat-item-tag {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.compat-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.compat-note a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.compat-note a:hover {
  text-decoration: underline;
}
</style>

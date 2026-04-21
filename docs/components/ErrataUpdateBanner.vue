<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { errataForPath, errataPageUrl } from '../.vitepress/erratas-registry'

const route = useRoute()

const items = computed(() => errataForPath(route.path ?? ''))
</script>

<template>
  <aside v-if="items.length" class="errata-update-banner" role="note" aria-live="polite">
    <div class="errata-update-banner__icon" aria-hidden="true">!</div>
    <div class="errata-update-banner__body">
      <div class="errata-update-banner__title">
        This specification has been updated since publication
      </div>
      <ul class="errata-update-banner__list">
        <li v-for="section in items" :key="`${section.errataId}-${section.number}`">
          <a :href="errataPageUrl(section)" class="errata-update-banner__link">
            {{ section.errataId }} — §{{ section.number }} {{ section.title }}
          </a>
          <div class="errata-update-banner__summary">{{ section.summary }}</div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.errata-update-banner {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 18px;
  margin: 0 0 20px 0;
  background: #fff8e1;
  border: 1px solid #f59e0b;
  border-left-width: 4px;
  border-radius: 6px;
  color: #1f2937;
  font-size: 14px;
  line-height: 1.5;
}

.errata-update-banner__icon {
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #f59e0b;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

.errata-update-banner__body {
  flex: 1 1 auto;
  min-width: 0;
}

.errata-update-banner__title {
  font-weight: 600;
  color: #7c2d12;
  margin-bottom: 6px;
}

.errata-update-banner__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.errata-update-banner__list li + li {
  margin-top: 8px;
}

.errata-update-banner__link {
  color: #92400e;
  font-weight: 600;
  text-decoration: underline;
}

.errata-update-banner__link:hover {
  color: #7c2d12;
}

.errata-update-banner__summary {
  color: #4b5563;
  margin-top: 2px;
}

.dark .errata-update-banner {
  background: rgba(245, 158, 11, 0.12);
  color: #e5e7eb;
}

.dark .errata-update-banner__title {
  color: #fbbf24;
}

.dark .errata-update-banner__link {
  color: #fcd34d;
}

.dark .errata-update-banner__summary {
  color: #d1d5db;
}
</style>

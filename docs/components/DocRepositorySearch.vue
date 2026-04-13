<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const query = ref('')

function filterSidebar() {
  // Scope to the sidebar nav container (known VitePress ID)
  const nav = document.getElementById('VPSidebarNav')
  if (!nav) return

  // Each org is a level-1 VPSidebarItem
  const items = nav.querySelectorAll('.VPSidebarItem.level-1')
  if (!items.length) return

  const q = query.value.trim().toLowerCase()
  items.forEach(el => {
    // The org name is in the first .text element inside .item
    const name = el.querySelector('.item .text')?.textContent?.trim().toLowerCase() ?? ''
    ;(el as HTMLElement).style.display = (!q || name.includes(q)) ? '' : 'none'
  })
}

watch(query, () => {
  nextTick(filterSidebar)
  setTimeout(filterSidebar, 100)
})
</script>

<template>
  <div class="doc-repo-search">
    <input
      v-model="query"
      type="text"
      class="doc-repo-search-input"
      placeholder="Search organisations..."
    />
  </div>
</template>

<style scoped>
.doc-repo-search {
  padding: 8px 12px 4px;
}

.doc-repo-search-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.doc-repo-search-input:focus {
  border-color: var(--vp-c-brand-1);
}

.doc-repo-search-input::placeholder {
  color: var(--vp-c-text-3);
}
</style>

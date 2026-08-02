<script setup lang="ts">
import { useTppSidebar } from '@/data/sidebars/tpp'
import { useLfiSidebar } from '@/data/sidebars/lfi'
import { useApiSpecsSidebar } from '@/data/sidebars/api-specs'
import type { SidebarItem } from '@/data/sidebars/shared'

const route = useRoute()
const apiSpecsSidebar = useApiSpecsSidebar()
const tppSidebar = useTppSidebar()
const lfiSidebar = useLfiSidebar()

interface ChromeSidebar {
  items: SidebarItem[]
  title: string
  rootHref: string
}

function isPrefix(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(prefix + '/')
}

const chromeSidebar = computed<ChromeSidebar | null>(() => {
  const p = route.path
  if (isPrefix(p, '/tech/api-specs')) {
    return { items: apiSpecsSidebar.value, title: 'API Specs', rootHref: '/tech/api-specs/' }
  }
  if (isPrefix(p, '/tech/tpp-standards')) {
    return { items: tppSidebar.value, title: 'TPP Standards', rootHref: '/tech/tpp-standards/' }
  }
  if (isPrefix(p, '/tech/lfi-api-hub')) {
    return { items: lfiSidebar.value, title: 'LFI Guide', rootHref: '/tech/lfi-api-hub/' }
  }
  return null
})

const isTech = computed<boolean>(() => isPrefix(route.path, '/tech'))
const isHome = computed<boolean>(() => route.path === '/')
</script>

<template>
  <div class="app-shell" :class="{ 'is-tech': isTech, 'is-home': isHome }">
    <PageHeader />
    <main class="app-shell__main">
      <DraftVersionBanner />
      <EdHoverSidebar
        v-if="chromeSidebar"
        :items="chromeSidebar.items"
        :title="chromeSidebar.title"
        :root-href="chromeSidebar.rootHref"
      />
      <router-view />
    </main>
    <PageFooter />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-shell__main {
  flex: 1 0 auto;
  padding-top: var(--at-header-height);
}
</style>

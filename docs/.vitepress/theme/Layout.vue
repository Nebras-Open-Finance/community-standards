<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import VersionDropdown from '../../components/VersionDropdown.vue'
import DocRepositorySearch from '../../components/DocRepositorySearch.vue'
import ErrataUpdateBanner from '../../components/ErrataUpdateBanner.vue'

const route = useRoute()

// Mirrors VersionDropdown's currentVersion — update both together when releasing.
const CURRENT_VERSION = 'v2.1'

// Always returns { title, link } — safe to destructure in template.
const navTitle = computed(() => {
  const path = route.path ?? ''

  if (path.startsWith('/tech/tpp-standards'))
    return { title: 'Open Finance Standards', link: '/tech/tpp-standards/' }
  if (path.startsWith('/tech/lfi-api-hub'))
    return { title: 'Integration Guide', link: '/tech/lfi-api-hub/' }
  if (path.startsWith('/policy'))
    return { title: 'Policies', link: '/policy' }
  if (path === '/tech/' || path === '/tech')
    return { title: 'Platform Overview', link: '/tech/' }
  if (path.startsWith('/processes'))
    return { title: 'Internal Processes', link: '/processes' }
  if (path.startsWith('/knowledge-base'))
    return { title: 'Knowledge Base', link: '/knowledge-base/' }
  if (path.startsWith('/tech/release-notes-and-erratas'))
    return { title: 'Release Notes & Erratas', link: '/tech/release-notes-and-erratas/' }
  if (path.startsWith('/tech/api-specs'))
    return { title: 'API Specs', link: `/tech/api-specs/${CURRENT_VERSION}` }
  if (path.startsWith('/metrics'))
    return { title: 'Metrics', link: '/metrics' }
  if (path.startsWith('/news'))
    return { title: 'News', link: '/news' }


  if (path.startsWith('/doc-repository'))
    return { title: 'Document Repository', link: '/doc-repository/' }

  return { title: 'Developer Docs', link: '/' }
})

const isDocRepository = computed(() => (route.path ?? '').startsWith('/doc-repository'))
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-title-before>
      <div class="dynamic-title">
        <a :href="navTitle.link">{{ navTitle.title }}</a>
      </div>
    </template>

    <template #nav-bar-content-after>
      <VersionDropdown />
    </template>

    <template v-if="isDocRepository" #sidebar-nav-before>
      <DocRepositorySearch />
    </template>

    <template #nav-bar-content-before>
      <a href="/">
        <img src="/AlTareq.png" alt="AlTareq" class="extra-left-logo">
      </a>
    </template>

    <template #doc-before>
      <ErrataUpdateBanner />
    </template>
  </DefaultTheme.Layout>
</template>

<style>
.extra-left-logo {
  width: 80px;
  margin-left: 20px;
  cursor: pointer;
  opacity: 70%;
}
</style>

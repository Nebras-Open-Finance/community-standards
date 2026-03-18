<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import VersionDropdown from '../../components/VersionDropdown.vue'

const route = useRoute()

// Mirrors VersionDropdown's currentVersion — update both together when releasing.
const CURRENT_VERSION = 'v2.1'

// Always returns { title, link } — safe to destructure in template.
const navTitle = computed(() => {
  const path = route.path ?? ''

  if (path.startsWith('/tech/tpp-standards'))
    return { title: `TPP Standards – ${CURRENT_VERSION}`, link: `/tech/tpp-standards/` }
  if (path.startsWith('/tech/lfi-api-hub'))
    return { title: `LFI API Hub – ${CURRENT_VERSION}`, link: `/tech/lfi-api-hub/` }
  if (path.startsWith('/policy'))
    return { title: 'Protocols and Policies', link: '/policy' }
  if (path.startsWith('/tech/overview'))
    return { title: 'Platform Overview', link: '/tech/overview' }
  if (path.startsWith('/processes'))
    return { title: 'Internal Processes', link: '/processes' }
  if (path.startsWith('/knowledge-base'))
    return { title: 'Knowledge Base', link: '/knowledge-base/' }
  if (path.startsWith('/tech/erratas'))
    return { title: `Erratas – ${CURRENT_VERSION}`, link: '/tech/erratas/' }
  if (path.startsWith('/tech/api-specs'))
    return { title: `API Specs – ${CURRENT_VERSION}`, link: '/tech/api-sepcs/' }


  return { title: 'Developer Docs', link: '/' }
})
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

    <template #nav-bar-content-before>
      <a href="/">
        <img src="/AlTareq.png" alt="AlTareq" class="extra-left-logo">
      </a>
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

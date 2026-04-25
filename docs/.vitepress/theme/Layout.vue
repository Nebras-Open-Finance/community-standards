<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import VersionDropdown from '../../components/VersionDropdown.vue'
import DocRepositorySearch from '../../components/DocRepositorySearch.vue'
import ErrataUpdateBanner from '../../components/ErrataUpdateBanner.vue'
import PageHeader from '../../components/WebPages/Components/PageHeader.vue'
import PageFooter from '../../components/WebPages/Components/PageFooter.vue'

const route = useRoute()
const { frontmatter } = useData()

// Editorial-doc re-skin applies to every MD-sourced page rendered through
// Layout.vue. Pages with `layout: false` in frontmatter (HomePage, Erratas,
// Policies index, etc.) use their own Vue components and bypass this file,
// so they remain unaffected.
const isEditorialDoc = computed(() => true)

function applyEditorialDocClass(active) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('editorial-doc', active)
  document.body.classList.toggle('editorial-doc', active)
}

onMounted(() => applyEditorialDocClass(isEditorialDoc.value))
watch(isEditorialDoc, (v) => applyEditorialDocClass(v))
onBeforeUnmount(() => applyEditorialDocClass(false))

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
    return { title: 'API Specs', link: '/tech/api-specs/' }
  if (path.startsWith('/metrics'))
    return { title: 'Metrics', link: '/metrics' }
  if (path.startsWith('/news'))
    return { title: 'News', link: '/news' }


  if (path.startsWith('/doc-repository'))
    return { title: 'Document Repository', link: '/doc-repository/' }

  return { title: 'Developer Docs', link: '/' }
})

const isDocRepository = computed(() => (route.path ?? '').startsWith('/doc-repository'))

// Pages can declare a back link via frontmatter, e.g.
//   backLink:
//     text: Onboarding
//     link: /tech/tpp-standards/trust-framework/onboarding
// This renders as the "← Onboarding" pill above the page title and is the
// preferred mechanism over VitePress's prev/next doc footer.
const backLink = computed(() => {
  const fm = frontmatter.value?.backLink
  if (fm && fm.link) {
    return { text: fm.text || 'Back', link: fm.link }
  }
  const path = route.path ?? ''
  if (path.startsWith('/knowledge-base/articles/')) {
    return { text: 'All knowledge base articles', link: '/knowledge-base/' }
  }
  if (path.startsWith('/policy/') && path.length > '/policy/'.length) {
    return { text: 'All policies', link: '/policy' }
  }
  return null
})

const showEditorialFooter = computed(() => isEditorialDoc.value && frontmatter.value?.sidebar === false)
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <PageHeader v-if="isEditorialDoc" />
    </template>

    <template #nav-bar-title-before>
      <div class="dynamic-title">
        <a :href="navTitle.link">{{ navTitle.title }}</a>
      </div>
    </template>

    <template #nav-bar-content-after>
      <VersionDropdown />
    </template>

    <template #sidebar-nav-before>
      <DocRepositorySearch v-if="isDocRepository" />
      <div v-else-if="isEditorialDoc" class="editorial-sidebar-title">
        <a :href="navTitle.link">{{ navTitle.title }}</a>
      </div>
    </template>

    <template #nav-bar-content-before>
      <a href="/">
        <img src="/AlTareq.png" alt="AlTareq" class="extra-left-logo">
      </a>
    </template>

    <template #doc-before>
      <a v-if="backLink" :href="backLink.link" class="editorial-back-link">
        <span class="editorial-back-link__arrow">&larr;</span>
        <span class="editorial-back-link__text">{{ backLink.text }}</span>
      </a>
      <ErrataUpdateBanner />
    </template>

    <template #layout-bottom>
      <PageFooter v-if="showEditorialFooter" />
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

.editorial-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--at-mute-2);
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0 0 1.5rem;
  transition: color 0.15s;
}

.editorial-back-link:hover {
  color: var(--at-navy-deep);
}

.editorial-back-link__arrow {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  transition: transform 0.15s;
}

.editorial-back-link:hover .editorial-back-link__arrow {
  transform: translateX(-3px);
}
</style>

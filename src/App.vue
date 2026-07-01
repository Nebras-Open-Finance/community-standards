<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

// Root component — the layout system (vite-plugin-vue-layouts) wraps each
// page route's component in its declared layout, so the only thing this
// component needs is <router-view />.

// Canonical production origin (www → apex 301 in public/_redirects). Used to
// build absolute URLs for link-preview cards — Open Graph / Twitter scrapers
// (Teams, Slack, LinkedIn, WhatsApp) do not resolve root-relative paths.
const SITE_URL = 'https://nebras-open-finance.com'
const SITE_NAME = 'UAE Open Finance'
const DEFAULT_DESCRIPTION =
  'Technical standards and documentation for UAE Open Finance — TPP standards, LFI integration via the API Hub, OpenAPI specifications, and consent, authentication and authorization flows.'
// Branded default card image. Logo rather than a 1200×630 social card for now;
// per-page useHead() calls may override og:image with a more specific image.
const DEFAULT_OG_IMAGE = `${SITE_URL}/AlTareq.png`

const route = useRoute()
const canonicalUrl = computed(() => SITE_URL + route.path)

// Pages that call useHead({ title: 'X' }) render as "X | UAE Open Finance".
// Pages that don't fall back to the bare brand. The conditional avoids the
// "UAE Open Finance | UAE Open Finance" duplication caught by page-titles.test.mjs.
//
// Site-wide link-preview defaults are set here so every prerendered page carries
// a branded card. Deliberately NO global og:title/twitter:title: scrapers fall
// back to the per-page <title> (always populated by titleTemplate), which is
// already correct per page. A page wanting a tailored card overrides og:image /
// og:title / og:description in its own useHead() — later meta of the same
// name/property wins under Unhead's dedupe. See src/pages/proposals/ofp-003/index.vue.
useHead({
  titleTemplate: (title) => (title ? `${title} | ${SITE_NAME}` : SITE_NAME),
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    { name: 'description', content: DEFAULT_DESCRIPTION },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'website' },
    { property: 'og:description', content: DEFAULT_DESCRIPTION },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:alt', content: SITE_NAME },
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:description', content: DEFAULT_DESCRIPTION },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ],
})
</script>

<template>
  <router-view />
</template>

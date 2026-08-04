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

// Per-page title/description sourced from the route's <route> meta block.
// 537+ pages already declare `meta.title` (and may declare `meta.description`);
// wiring them here gives every prerendered page a unique <title> and description
// instead of the bare brand default. Reactive so client-side navigation updates
// the head. A page may still override either via its own useHead() (registered
// after this parent, so it wins under Unhead's last-in dedupe).
// Empty string (not undefined) so Unhead's title type is satisfied; the
// titleTemplate below maps '' → the bare brand.
const pageTitle = computed(() => (route.meta.title as string | undefined) || '')
// undefined when no page title, so Unhead drops the og:title/twitter:title tags
// and scrapers fall back to the rendered <title>.
const ogTitle = computed(() => (route.meta.title as string | undefined) || undefined)
const pageDescription = computed(
  () => (route.meta.description as string | undefined) || DEFAULT_DESCRIPTION,
)

// Kill switch: while true, EVERY page emits noindex so the whole site stays out
// of search results. While false (the normal state) per-route indexing applies —
// public pages indexable; only the NOINDEX_RE routes below noindex. Single
// toggle — flip this one line. Mirrored by supporting/tests/robots-noindex.test.mjs.
const NOINDEX_ENTIRE_SITE = false

// Routes that must not be indexed: internal/gated surfaces and developer
// tooling. Kept in sync with the EXCLUDE list in scripts/generate-sitemap.mjs —
// those routes are already absent from the sitemap; this also stops a crawler
// that discovers one via an inbound link from indexing it. undefined → Unhead
// drops the robots meta, so public pages carry no directive (the default: index).
const NOINDEX_RE = [
  /^\/_dev(\/|$)/,
  /^\/internal(\/|$)/,
  /^\/proposals\/internal(\/|$)/,
  /(^|\/)_shared(\/|$)/,
]
const robotsDirective = computed(() =>
  NOINDEX_ENTIRE_SITE || NOINDEX_RE.some((re) => re.test(route.path))
    ? 'noindex, nofollow'
    : undefined,
)

// Pages that call useHead({ title: 'X' }) render as "X | UAE Open Finance".
// Pages that don't fall back to the bare brand. The conditional avoids the
// "UAE Open Finance | UAE Open Finance" duplication caught by page-titles.test.mjs.
//
// Site-wide link-preview defaults are set here so every prerendered page carries
// a branded card. og:title/twitter:title track the per-page route-meta title
// (undefined → tag dropped → scrapers fall back to the per-page <title>). A page
// wanting a tailored card overrides og:image / og:title / og:description in its
// own useHead() — later meta of the same name/property wins under Unhead's
// dedupe. See src/pages/proposals/ofp-003/index.vue.
useHead({
  title: pageTitle,
  titleTemplate: (title) => (title ? `${title} | ${SITE_NAME}` : SITE_NAME),
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    { name: 'robots', content: robotsDirective },
    { name: 'description', content: pageDescription },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:type', content: 'website' },
    // og:title/twitter:title fall back to the per-page <title> when the page
    // declares one; when it doesn't, Unhead drops the tag and scrapers use the
    // bare <title>. Kept in sync with the route meta so share cards match the page.
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:image:alt', content: SITE_NAME },
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: ogTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ],
})
</script>

<template>
  <router-view />
</template>

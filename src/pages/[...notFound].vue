<route lang="yaml">
meta:
  title: Page not found
</route>

<script setup lang="ts">
// Catch-all 404 page. vite-plugin-pages routes any unknown path here via
// the `[...notFound].vue` wildcard syntax. Section detection is a simple
// longest-prefix match against a small table — keeps the back-link aligned
// with the section the user came from. Falls through to the homepage when
// no prefix matches.
//
// `useRoute` is auto-imported (see `vite.config.ts` AutoImport `vue-router`).

const route = useRoute()

interface SectionPrefix {
  prefix: string
  href: string
  label: string
}

// Order matters only insofar as we pick the first prefix that matches; all
// entries are mutually exclusive today, so iteration order is incidental.
const SECTION_PREFIXES: readonly SectionPrefix[] = [
  { prefix: '/tech/tpp-standards/', href: '/tech/tpp-standards/', label: 'TPP Standards' },
  { prefix: '/tech/lfi-api-hub/',   href: '/tech/lfi-api-hub/',   label: 'LFI Integration Guide' },
  { prefix: '/tech/release-notes-and-erratas/', href: '/tech/release-notes-and-erratas/', label: 'Release Notes & Erratas' },
  { prefix: '/policy/', href: '/policy/', label: 'Policies' },
  { prefix: '/knowledge-base/', href: '/knowledge-base/', label: 'Knowledge Base' },
  { prefix: '/doc-repository/', href: '/doc-repository/', label: 'Documentation Repository' },
  { prefix: '/program/', href: '/program/', label: 'Programme' },
  { prefix: '/pricing/', href: '/pricing/', label: 'Pricing' },
]

interface BackTarget {
  href: string
  label: string
}

const HOME_TARGET: BackTarget = { href: '/', label: 'Home' }

const backTarget = computed<BackTarget>(() => {
  const path = typeof route.path === 'string' ? route.path : ''
  for (const entry of SECTION_PREFIXES) {
    if (path.startsWith(entry.prefix)) {
      return { href: entry.href, label: entry.label }
    }
  }
  return HOME_TARGET
})

const requestedPath = computed<string>(() =>
  typeof route.path === 'string' ? route.path : '',
)
</script>

<template>
  <div class="ed-not-found">
    <EdHero
      eyebrow="404"
      title="Page not found"
      :lede="`We couldn't find a page at <code>${requestedPath}</code>. The link may be
        out of date, or the page may have been moved or renamed. Use the link below to
        head back to a known section.`"
    >
      <div class="ed-not-found__back">
        <a :href="backTarget.href" class="ed-not-found__back-link">
          <span class="ed-not-found__back-arrow">&larr;</span>
          Back to {{ backTarget.label }}
        </a>
      </div>
    </EdHero>
  </div>
</template>

<style scoped>
.ed-not-found {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: calc(100vh - 4.25rem);
}

.ed-not-found__back {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.ed-not-found__back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.25rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  text-decoration: none;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid var(--at-navy-deep);
  transition: background 0.15s, border-color 0.15s;
}

.ed-not-found__back-link:hover {
  background: var(--at-navy);
  border-color: var(--at-navy);
}

.ed-not-found__back-arrow {
  font-family: var(--at-mono);
  transition: transform 0.15s;
}

.ed-not-found__back-link:hover .ed-not-found__back-arrow { transform: translateX(-3px); }
</style>

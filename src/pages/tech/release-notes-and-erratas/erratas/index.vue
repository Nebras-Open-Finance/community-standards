<route lang="yaml">
meta:
  title: Erratas
</route>

<script setup lang="ts">
// Phase 5b-v — Erratas index redirect. Mirrors the original VitePress shell
// at `docs/tech/release-notes-and-erratas/erratas/index.md` whose only job is
// to bounce visitors to the current-version Erratas page.
//
// SSG note: this still emits an HTML shell (so `/erratas/` resolves at build
// time) — the redirect runs client-side after hydration. We use vue-router's
// `replace()` rather than `window.location.replace()` so a back-button doesn't
// trap the user on the shell during SPA navigation. The `<noscript>`-style
// fallback `<router-link>` keeps the page navigable if JS is disabled.
//
// Vue primitives (`onMounted`) and `useRouter` are auto-imported.

import { CURRENT_VERSION } from '@/data/versions'

const router = useRouter()
const target = `/tech/release-notes-and-erratas/erratas/${CURRENT_VERSION}/`

onMounted(() => {
  if (typeof window !== 'undefined') {
    void router.replace(target)
  }
})
</script>

<template>
  <div style="padding: 6rem 2rem; text-align: center; font-family: system-ui, sans-serif;">
    <p>Redirecting to the latest Erratas register&hellip;</p>
    <p><router-link :to="target">Continue to {{ target }}</router-link></p>
  </div>
</template>

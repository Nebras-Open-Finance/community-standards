<script setup lang="ts">
import { useHead } from '@unhead/vue'

// Root component — the layout system (vite-plugin-vue-layouts) wraps each
// page route's component in its declared layout, so the only thing this
// component needs is <router-view />.

// Pages that call useHead({ title: 'X' }) render as "X | UAE Open Finance".
// Pages that don't fall back to the bare brand. The conditional avoids the
// "UAE Open Finance | UAE Open Finance" duplication caught by page-titles.test.mjs.
useHead({
  titleTemplate: (title) => (title ? `${title} | UAE Open Finance` : 'UAE Open Finance'),
})
</script>

<template>
  <router-view />
</template>

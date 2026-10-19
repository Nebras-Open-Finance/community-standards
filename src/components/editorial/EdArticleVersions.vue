<script setup lang="ts">
// Version-scope notice for a knowledge base article. Reads `versions` from the
// page's route meta, so the list is declared once, in the article's <route>
// block, and also drives the badge on the knowledge base index. Renders nothing
// when the article applies to every version.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { readArticleVersions, formatArticleVersions } from '@/data/articles'

const route = useRoute()
const label = computed(() => formatArticleVersions(readArticleVersions(route.meta)))
</script>

<template>
  <EdNote v-if="label" type="important" title="Version scope">
    <p>This article applies to <strong>{{ label }}</strong>. Behaviour in other versions may differ.</p>
  </EdNote>
</template>

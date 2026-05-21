<script setup lang="ts">
import { computed } from 'vue'
import { parseInternalBlocks, renderProse } from './composables/internalMarkdown'
import ImageViewer from './ImageViewer.vue'
import EdCode from '../editorial/EdCode.vue'

// Live renderer for internal-page Markdown. Standalone images render through
// <ImageViewer> and fenced code through <EdCode>, so the editor preview shows
// exactly the components a committed internal page uses.

const props = defineProps<{ source: string }>()

const blocks = computed(() => parseInternalBlocks(props.source))
</script>

<template>
  <div class="internal-prose">
    <template v-for="(block, i) in blocks" :key="i">
      <div v-if="block.kind === 'html'" v-html="renderProse(block.raw)" />
      <ImageViewer
        v-else-if="block.kind === 'image'"
        :src="block.src"
        :alt="block.alt"
        :caption="block.alt"
      />
      <EdCode v-else :code="block.code" :lang="block.lang" />
    </template>
    <p v-if="!blocks.length" class="internal-md__empty">Nothing to preview yet.</p>
  </div>
</template>

<style scoped>
.internal-md__empty {
  color: var(--at-mute);
  font-style: italic;
}
</style>

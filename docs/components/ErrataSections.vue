<script setup lang="ts">
import { computed } from 'vue'
import { sectionsFor, anchorFor } from '../.vitepress/erratas-registry'

const props = defineProps<{
  errataId: string
}>()

const sections = computed(() => sectionsFor(props.errataId))

function paragraphs(text: string): string[] {
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
}
</script>

<template>
  <div v-if="sections.length" class="errata-sections">
    <section
      v-for="s in sections"
      :key="`${s.errataId}-${s.number}`"
      class="errata-section"
    >
      <h2 :id="anchorFor(s)">
        <a :href="`#${anchorFor(s)}`" class="header-anchor" :aria-label="`Permalink to §${s.number}`">#</a>
        {{ s.number }}. {{ s.title }}
      </h2>

      <div
        v-if="s.spec || s.specs?.length || s.endpoints?.length || s.schemas?.length || s.githubSources?.length || s.relatedStandards?.length"
        class="errata-section__meta"
      >
        <h3>Affected documents</h3>
        <ul>
          <li v-if="s.spec"><strong>Spec:</strong> {{ s.spec }}</li>

          <li v-if="s.specs?.length">
            <strong>Specs:</strong>
            <ul>
              <li v-for="name in s.specs" :key="name">{{ name }}</li>
            </ul>
          </li>

          <li v-if="s.endpoints?.length">
            <strong>{{ s.endpoints.length === 1 ? 'Endpoint' : 'Endpoints' }}:</strong>
            <ul>
              <li v-for="ep in s.endpoints" :key="ep.path">
                <a :href="ep.path">{{ ep.label }}</a>
              </li>
            </ul>
          </li>

          <li v-if="s.schemas?.length">
            <strong>{{ s.schemas.length === 1 ? 'Schema' : 'Schemas' }}:</strong>
            <ul>
              <li v-for="name in s.schemas" :key="name">{{ name }}</li>
            </ul>
          </li>

          <li v-if="s.githubSources?.length">
            <strong>Source on GitHub:</strong>
            <ul>
              <li v-for="src in s.githubSources" :key="src.url">
                <a :href="src.url" target="_blank" rel="noopener noreferrer">{{ src.label }}</a>
              </li>
            </ul>
          </li>

          <li v-if="s.relatedStandards?.length">
            <strong>Related TPP standards:</strong>
            <ul>
              <li v-for="rel in s.relatedStandards" :key="rel.path">
                <a :href="rel.path">{{ rel.label }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <h3>What changed</h3>
      <p v-for="(para, i) in paragraphs(s.description)" :key="`desc-${i}`">{{ para }}</p>

      <h3>Why the change was required</h3>
      <p v-for="(para, i) in paragraphs(s.rationale)" :key="`why-${i}`">{{ para }}</p>

      <h3>Effective date</h3>
      <p>{{ s.effectiveDate }}</p>
    </section>
  </div>
</template>

<style scoped>
.errata-section + .errata-section {
  margin-top: 2.5rem;
}

.errata-section__meta {
  margin-bottom: 1rem;
}
</style>

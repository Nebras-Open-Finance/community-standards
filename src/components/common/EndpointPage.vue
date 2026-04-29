<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  version?: string
  method: string
  path: string
}>()
</script>

<template>
  <div class="ed-api-endpoint">
    <section class="ed-api-endpoint__hero">
      <div class="ed-api-endpoint__hero-inner">
        <div class="ed-api-endpoint__hero-label">
          <span class="ed-api-endpoint__hero-label-dash" />
          {{ eyebrow }}
        </div>
        <h1 class="ed-api-endpoint__hero-title">
          {{ title }}
          <span v-if="version" class="ed-api-endpoint__hero-badge">{{ version }}</span>
        </h1>
        <div class="ed-api-endpoint__hero-meta">
          <span :class="['http-badge', `http-${method.toLowerCase()}`]">{{ method }}</span>
          <code class="ed-api-endpoint__hero-path">{{ path }}</code>
        </div>
      </div>
    </section>

    <section class="ed-api-endpoint__body">
      <div class="ed-api-endpoint__body-inner">
        <slot />
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-api-endpoint {
  --api-page-max: 1600px;
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-api-endpoint__hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-api-endpoint__hero-inner {
  max-width: var(--api-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3.5rem;
}

.ed-api-endpoint__hero-label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-api-endpoint__hero-label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-api-endpoint__hero-title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-api-endpoint__hero-badge {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12);
  padding: 0.35rem 0.7rem;
  align-self: center;
}

.ed-api-endpoint__hero-meta {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ed-api-endpoint__hero-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
}

.ed-api-endpoint__body {
  padding: 1rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-api-endpoint__body-inner {
  max-width: var(--api-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 640px) {
  .ed-api-endpoint__hero-inner { padding: 3rem 1.25rem 2.5rem; }
  .ed-api-endpoint__body-inner { padding: 0 1.25rem; }
}
</style>

<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="ed-article"
    :class="{ 'ed-article--feature': variant === 'feature', 'ed-article--compact': variant === 'compact' }"
  >
    <div class="ed-article__media">
      <img :src="imageSrc" :alt="imageAlt" loading="lazy" />
    </div>

    <div class="ed-article__body">
      <div class="ed-article__meta">
        <span class="ed-article__tag" v-if="kind">{{ kind }}</span>
        <span class="ed-article__sep" v-if="kind">·</span>
        <span class="ed-article__date">{{ date }}</span>
        <span class="ed-article__sep" v-if="source">·</span>
        <span class="ed-article__source" v-if="source">{{ source }}</span>
      </div>

      <h3 class="ed-article__title">{{ title }}</h3>

      <p class="ed-article__text">{{ text }}</p>

      <span class="ed-article__read">Read the article ↗</span>
    </div>
  </a>
</template>

<script setup>
defineProps({
  link:     { type: String, required: true },
  title:    { type: String, required: true },
  date:     { type: String, required: true },
  text:     { type: String, required: true },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String, default: 'Article image' },
  kind:     { type: String, default: '' },
  source:   { type: String, default: '' },
  variant:  { type: String, default: 'standard' },
})
</script>

<style scoped>
.ed-article {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-radius: 0;
  transition: border-color 0.2s ease, transform 0.2s ease;
  overflow: hidden;
}

.ed-article:hover {
  border-color: var(--at-navy-deep);
  transform: translateY(-2px);
}

.ed-article__media {
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--at-bg-paper);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-article__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
  filter: saturate(0.95);
}

.ed-article:hover .ed-article__media img {
  transform: scale(1.04);
  filter: saturate(1);
}

.ed-article__body {
  padding: 1.1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  flex: 1;
}

.ed-article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--at-mute);
}

.ed-article__tag { color: var(--at-teal); font-weight: 600; }
.ed-article__source {
  font-style: italic;
  text-transform: none;
  letter-spacing: 0.04em;
  font-family: var(--at-serif);
  font-size: 0.78rem;
  color: var(--at-mute-2);
}
.ed-article__sep { opacity: 0.5; }

.ed-article__title {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  margin: 0.1rem 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ed-article__text {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ed-article__read {
  margin-top: auto;
  padding-top: 0.75rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--at-navy-deep);
  border-top: 1px solid var(--at-grid-line);
}

/* ── Feature variant (big lead) ────────────────────────────────────────── */
.ed-article--feature {
  flex-direction: row;
  grid-column: 1 / -1;
  background: var(--at-bg-paper);
}

.ed-article--feature .ed-article__media {
  width: 54%;
  aspect-ratio: auto;
  border-bottom: 0;
  border-right: 1px solid var(--at-grid-line);
}

.ed-article--feature .ed-article__media img { height: 100%; min-height: 320px; }

.ed-article--feature .ed-article__body {
  flex: 1;
  padding: 2rem 2.25rem;
  justify-content: center;
}

.ed-article--feature .ed-article__title {
  font-size: 1.95rem;
  line-height: 1.1;
  -webkit-line-clamp: 4;
}

.ed-article--feature .ed-article__text {
  font-size: 1rem;
  line-height: 1.6;
  -webkit-line-clamp: 4;
}

/* ── Compact variant (list sidebar) ────────────────────────────────────── */
.ed-article--compact .ed-article__media { aspect-ratio: 16 / 8; }
.ed-article--compact .ed-article__body { padding: 0.9rem 1rem 1rem; gap: 0.4rem; }
.ed-article--compact .ed-article__title { font-size: 0.98rem; -webkit-line-clamp: 3; }
.ed-article--compact .ed-article__text { -webkit-line-clamp: 2; font-size: 0.8rem; }

@media (max-width: 900px) {
  .ed-article--feature { flex-direction: column; }
  .ed-article--feature .ed-article__media {
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid var(--at-grid-line);
  }
  .ed-article--feature .ed-article__media img { min-height: 220px; }
  .ed-article--feature .ed-article__body { padding: 1.5rem 1.25rem; }
  .ed-article--feature .ed-article__title { font-size: 1.55rem; }
}
</style>

<template>
  <div class="gh-repo-block">
    <!-- Hero -->
    <header v-if="title || subtitle || eyebrow" class="gh-repo-hero">
      <div v-if="eyebrow" class="gh-repo-hero__label">
        <span class="gh-repo-hero__label-dash" />
        {{ eyebrow }}
      </div>
      <div v-if="title" class="gh-repo-hero__title">{{ title }}</div>
      <p v-if="subtitle" class="gh-repo-hero__sub" v-html="subtitle" />
    </header>

    <!-- Featured GitHub card -->
    <section class="gh-repo">
      <div class="gh-repo__card">
        <div class="gh-repo__meta">
          <span class="gh-repo__meta-dot" />
          GitHub repository
        </div>

        <div class="gh-repo__head">
          <svg class="gh-repo__logo" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16" width="42" height="42" aria-hidden="true">
            <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
          </svg>
          <div class="gh-repo__head-text">
            <div class="gh-repo__title">{{ owner }}&thinsp;/&thinsp;{{ name }}</div>
            <p v-if="description" class="gh-repo__sub" v-html="description" />
          </div>
        </div>

        <div v-if="pathList.length" class="gh-repo__paths">
          <div v-for="p in pathList" :key="p.name" class="gh-repo__path">
            <code class="gh-repo__path-name">{{ p.name }}</code>
            <span class="gh-repo__path-desc" v-html="p.desc" />
          </div>
        </div>

        <div v-if="branchList.length" class="gh-repo__branches">
          <div v-for="b in branchList" :key="b.tag" class="gh-repo__branch">
            <span
              class="gh-repo__branch-tag"
              :class="{ 'gh-repo__branch-tag--draft': b.draft }"
            >{{ b.tag }}</span>
            <span class="gh-repo__branch-desc" v-html="b.desc" />
          </div>
        </div>

        <div v-if="$slots.tip" class="gh-repo__tip">
          <span class="gh-repo__tip-label">{{ tipLabel }}</span>
          <span class="gh-repo__tip-body"><slot name="tip" /></span>
        </div>

        <a class="gh-repo__cta" :href="url" target="_blank" rel="noopener">
          <span>{{ ctaLabel }}</span>
          <span class="gh-repo__cta-arrow">&nearr;</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  repo: { type: String, required: true },
  description: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  paths: { type: Array, default: () => [] },
  branches: { type: Array, default: () => [] },
  tipLabel: { type: String, default: 'Watch for updates' },
  ctaLabel: { type: String, default: 'Open on GitHub' },
})

const owner = computed(() => props.repo.split('/')[0])
const name = computed(() => props.repo.split('/')[1])
const url = computed(() => `https://github.com/${props.repo}`)
const pathList = computed(() => Array.isArray(props.paths) ? props.paths : [])
const branchList = computed(() => Array.isArray(props.branches) ? props.branches : [])
</script>

<style scoped>
.gh-repo-block {
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.gh-repo-hero {
  padding: 0.5rem 0 1.75rem;
}

.gh-repo-hero__label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
}

.gh-repo-hero__label-dash {
  width: 22px;
  height: 1px;
  background: currentColor;
}

.gh-repo-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
  border: none;
  padding: 0;
}

.gh-repo-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 1.1rem 0 0;
  color: var(--at-mute-2);
}

.gh-repo-hero__sub :deep(strong),
.gh-repo-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.gh-repo-hero__sub :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.gh-repo-hero__sub :deep(a:hover) { color: var(--at-navy-deep); }

/* ─── Card ──────────────────────────────────────────────────────────────── */
.gh-repo {
  margin: 0 0 1.5rem;
}

.gh-repo__card {
  position: relative;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  padding: 2.25rem 2rem 1.85rem;
  overflow: hidden;
}

.gh-repo__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--at-teal) 0%, var(--at-blue) 50%, var(--at-gold) 100%);
}

.gh-repo__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
}

.gh-repo__meta-dot {
  width: 8px;
  height: 8px;
  background: var(--at-teal);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 194, 169, 0.18);
}

.gh-repo__head {
  display: flex;
  align-items: flex-start;
  gap: 1.15rem;
  margin-bottom: 1.6rem;
}

.gh-repo__logo {
  color: var(--at-bg-cream);
  flex-shrink: 0;
  margin-top: 0.3rem;
}

.gh-repo__title {
  font-family: var(--at-serif);
  font-size: clamp(1.45rem, 2.6vw, 1.95rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.55rem;
  color: var(--at-bg-cream);
  border: none;
  padding: 0;
}

.gh-repo__sub {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.55;
  color: rgba(250, 250, 247, 0.82);
  margin: 0;
}

.gh-repo__sub :deep(strong),
.gh-repo__sub strong { color: var(--at-bg-cream); font-weight: 600; }

.gh-repo__card :deep(code) {
  font-family: var(--at-mono) !important;
  font-size: 0.82em !important;
  background: rgba(250, 250, 247, 0.08) !important;
  padding: 0.1em 0.4em !important;
  color: var(--at-bg-cream) !important;
  border: none !important;
  border-radius: 0 !important;
}

/* Paths */
.gh-repo__paths {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin-bottom: 1.6rem;
  border: 1px solid rgba(250, 250, 247, 0.12);
}

.gh-repo__path {
  display: grid;
  grid-template-columns: 17rem 1fr;
  align-items: baseline;
  gap: 1.15rem;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid rgba(250, 250, 247, 0.08);
}

.gh-repo__path:last-child { border-bottom: none; }

.gh-repo__path-name {
  font-family: var(--at-mono) !important;
  font-size: 0.82em !important;
  font-weight: 600 !important;
  color: var(--at-teal) !important;
  background: rgba(0, 194, 169, 0.12) !important;
  padding: 0.1em 0.4em !important;
  border: none !important;
  border-radius: 0 !important;
  justify-self: start;
}

.gh-repo__path-desc {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: rgba(250, 250, 247, 0.85);
  line-height: 1.5;
}

.gh-repo__path-desc :deep(strong),
.gh-repo__path-desc strong { color: var(--at-bg-cream); font-weight: 600; }

/* Branches */
.gh-repo__branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-bottom: 1.6rem;
}

.gh-repo__branch {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.95rem 1rem;
  background: rgba(250, 250, 247, 0.04);
  border: 1px solid rgba(250, 250, 247, 0.1);
}

.gh-repo__branch-tag {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.28rem 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  background: var(--at-teal);
}

.gh-repo__branch-tag--draft {
  background: rgba(250, 250, 247, 0.14);
  color: var(--at-bg-cream);
}

.gh-repo__branch-desc {
  font-family: var(--at-sans);
  font-size: 0.86rem;
  line-height: 1.55;
  color: rgba(250, 250, 247, 0.8);
}

.gh-repo__branch-desc :deep(strong),
.gh-repo__branch-desc strong { color: var(--at-bg-cream); font-weight: 600; }

/* Tip */
.gh-repo__tip {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  margin-bottom: 1.6rem;
  background: rgba(250, 250, 247, 0.04);
  border-left: 3px solid var(--at-gold);
}

.gh-repo__tip-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  flex-shrink: 0;
}

.gh-repo__tip-body {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(250, 250, 247, 0.85);
}

.gh-repo__tip-body :deep(strong),
.gh-repo__tip-body strong { color: var(--at-bg-cream); font-weight: 600; }

.gh-repo__tip-body :deep(p) { margin: 0; }

/* CTA */
.gh-repo__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.3rem;
  background: var(--at-teal);
  color: var(--at-navy-deep);
  text-decoration: none;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  transition: transform 0.2s, background 0.2s;
}

.gh-repo__cta:hover {
  background: var(--at-bg-cream);
  transform: translateY(-1px);
}

.gh-repo__cta-arrow {
  font-size: 0.95rem;
  transition: transform 0.2s;
}

.gh-repo__cta:hover .gh-repo__cta-arrow { transform: translate(2px, -2px); }

/* Responsive */
@media (max-width: 900px) {
  .gh-repo__branches { grid-template-columns: 1fr; }
  .gh-repo__path { grid-template-columns: 1fr; gap: 0.4rem; }
}

@media (max-width: 640px) {
  .gh-repo__card { padding: 1.75rem 1.25rem 1.5rem; }
  .gh-repo__tip { flex-direction: column; gap: 0.4rem; }
}
</style>

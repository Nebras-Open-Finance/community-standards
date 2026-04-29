<script setup lang="ts">
// Phase 3 port of docs/components/WebPages/Components/PageFooter.vue.
//
// Deviations from the original:
//   * <script setup lang="ts"> with strict typing.
//   * Removed `import { CURRENT_VERSION } from '../../../.vitepress/version'`
//     — the original imported the symbol but never used it. The import would
//     drag the VitePress-only registry into the app/ tree. Phase 9 will port
//     the version registry; if the footer ever needs CURRENT_VERSION it can
//     be re-imported from `@/lib/version` at that point.
//   * `year` is computed once at module load — Vue's reactivity isn't needed
//     here, but typing it as `number` makes the intent explicit.
const year: number = new Date().getFullYear()
</script>

<template>
  <footer class="ed-footer">
    <div class="ed-footer__inner">

      <div class="ed-footer__col ed-footer__col--brand">
        <img src="/AlTareq.png" alt="AlTareq" class="ed-footer__logo" />
        <div class="ed-footer__tag">UAE Open Finance &middot; Community</div>
      </div>

      <div class="ed-footer__col">
        <div class="ed-footer__heading">The project</div>
        <p class="ed-footer__copy">
          This site is open source. Help improve the data, documentation, guides,
          or supporting content. Every contribution strengthens the ecosystem.
        </p>
      </div>

      <div class="ed-footer__col ed-footer__col--links">
        <div class="ed-footer__heading">Sections</div>
        <a class="ed-footer__link" href="/tech/">Developer docs</a>
        <a class="ed-footer__link" href="/support-service-desk/">Service Desk</a>
        <a class="ed-footer__link" href="/metrics">Metrics</a>
      </div>

      <div class="ed-footer__col ed-footer__col--links">
        <div class="ed-footer__heading">Contribute</div>
        <a
          class="ed-footer__link"
          href="https://github.com/Nebras-Open-Finance/community-standards"
          target="_blank" rel="noopener noreferrer"
        >View on GitHub &#x2197;</a>
        <a
          class="ed-footer__link"
          href="https://github.com/Nebras-Open-Finance/community-standards/issues"
          target="_blank" rel="noopener noreferrer"
        >Open an issue</a>
      </div>

    </div>

    <div class="ed-footer__base">
      <span>&copy; {{ year }} &middot; Community project &middot; Not an official CBUAE publication</span>
      <span class="ed-footer__base-mono">Author &middot; Thomas Catchpole</span>
    </div>
  </footer>
</template>

<style scoped>
.ed-footer {
  background: var(--at-bg-paper);
  border-top: 2px solid var(--at-navy-deep);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding: 3rem 2rem 1.25rem;
}

.ed-footer__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 2.25rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-footer__col { display: flex; flex-direction: column; gap: 0.5rem; }
.ed-footer__col--links { gap: 0.35rem; }
.ed-footer__col--brand { gap: 0.75rem; }

.ed-footer__logo {
  display: block;
  width: 110px;
  height: auto;
  opacity: 0.85;
}

.ed-footer__tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--at-mute);
}

.ed-footer__heading {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--at-teal);
  margin-bottom: 0.6rem;
}

.ed-footer__copy {
  font-family: var(--at-serif);
  font-size: 0.98rem;
  line-height: 1.55;
  margin: 0;
  color: var(--at-navy-deep);
  font-style: italic;
  font-weight: 400;
  max-width: 44ch;
}

.ed-footer__link {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-navy-deep);
  text-decoration: none;
  padding: 0.15rem 0;
  transition: color 0.15s;
}

.ed-footer__link:hover { color: var(--at-teal-deep); text-decoration: underline; text-underline-offset: 4px; }

.ed-footer__base {
  max-width: var(--at-page-max);
  margin: 1rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-mute);
}

.ed-footer__base-mono { letter-spacing: 0.08em; }

@media (max-width: 900px) {
  .ed-footer { padding: 2.5rem 1.25rem 1.25rem; }
  .ed-footer__inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
}

@media (max-width: 540px) {
  .ed-footer__inner { grid-template-columns: 1fr; gap: 1.5rem; }
  .ed-footer__base { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
}
</style>

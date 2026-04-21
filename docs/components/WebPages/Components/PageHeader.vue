<template>
  <header class="ed-header">

    <div class="ed-header__inner">

      <!-- Masthead / wordmark -->
      <a href="/" class="ed-masthead" aria-label="AlTareq home">
        <img src="/AlTareq.png" alt="AlTareq" class="ed-masthead__logo" />
        <span class="ed-masthead__tag">Community Site</span>
      </a>

      <!-- Desktop nav -->
      <nav class="ed-nav" aria-label="Primary">

        <a href="/policy" class="ed-nav__link">Policies</a>

        <div class="ed-nav__group">
          <button
            type="button"
            class="ed-nav__link ed-nav__trigger"
            :aria-expanded="docsOpen ? 'true' : 'false'"
            @click="docsOpen = !docsOpen"
          >
            Developer Docs
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="ed-nav__menu" :class="{ open: docsOpen }">
            <a href="/tech/tpp-standards" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">For TPPs</span>
              <span class="ed-nav__menu-label">Open Finance Standards</span>
            </a>
            <a href="/tech/lfi-api-hub" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">For LFIs</span>
              <span class="ed-nav__menu-label">Integration Guide</span>
            </a>
            <a :href="`/tech/api-specs/${CURRENT_VERSION}`" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Reference</span>
              <span class="ed-nav__menu-label">API Specs</span>
            </a>
            <a href="/knowledge-base" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Library</span>
              <span class="ed-nav__menu-label">Knowledge Base</span>
            </a>
            <a href="/tech/release-notes-and-erratas/" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Changelog</span>
              <span class="ed-nav__menu-label">Release Notes &amp; Erratas</span>
            </a>
          </div>
        </div>

        <a href="/metrics" class="ed-nav__link">Metrics</a>
        <a href="/news" class="ed-nav__link">News</a>

        <a
          href="https://github.com/Nebras-Open-Finance/community-standards"
          class="ed-github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </nav>

      <!-- Hamburger (mobile) -->
      <button
        type="button"
        class="ed-hamburger"
        :class="{ active: menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <div class="ed-drawer" :class="{ open: menuOpen }" @click.self="menuOpen = false">
      <div class="ed-drawer__inner">
        <div class="ed-drawer__label">Navigation</div>
        <a href="/policy" class="ed-drawer__link">Policies</a>

        <div class="ed-drawer__section">Developer Docs</div>
        <a href="/tech/tpp-standards" class="ed-drawer__sublink">TPP — Open Finance Standards</a>
        <a href="/tech/lfi-api-hub" class="ed-drawer__sublink">LFI — Integration Guide</a>
        <a :href="`/tech/api-specs/${CURRENT_VERSION}`" class="ed-drawer__sublink">API Specs</a>
        <a href="/knowledge-base" class="ed-drawer__sublink">Knowledge Base</a>
        <a href="/tech/release-notes-and-erratas/" class="ed-drawer__sublink">Release Notes &amp; Erratas</a>

        <hr class="ed-drawer__rule" />
        <a href="/metrics" class="ed-drawer__link">Metrics</a>
        <a href="/news" class="ed-drawer__link">News</a>
        <a
          href="https://github.com/Nebras-Open-Finance/community-standards"
          class="ed-drawer__link"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CURRENT_VERSION } from '../../../.vitepress/version'

const menuOpen = ref(false)
const docsOpen = ref(false)

function handleClickOutside(e) {
  if (!e.target.closest('.ed-nav__group')) docsOpen.value = false
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
/* ── Shell ─────────────────────────────────────────────────────────────── */
.ed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background: rgba(250, 250, 247, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.ed-header__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
  height: 4.25rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* ── Masthead ──────────────────────────────────────────────────────────── */
.ed-masthead {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: var(--at-navy-deep);
  flex-shrink: 0;
}

.ed-masthead__logo {
  display: block;
  height: 1.85rem;
  width: auto;
}

.ed-masthead__tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--at-mute);
  white-space: nowrap;
  border-left: 1px solid var(--at-grid-line);
  padding-left: 0.75rem;
}

/* ── Desktop nav ───────────────────────────────────────────────────────── */
.ed-nav {
  display: none;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
}

@media (min-width: 960px) {
  .ed-nav { display: flex; }
}

.ed-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--at-navy-deep);
  text-decoration: none;
  border-radius: 0;
  background: none;
  border: 0;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.ed-nav__link:hover {
  color: var(--at-teal-deep);
  background: rgba(0, 194, 169, 0.08);
}

.ed-nav__group { position: relative; }

.ed-nav__trigger { font: inherit; }

.ed-nav__menu {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  min-width: 280px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  box-shadow: 0 14px 40px rgba(0, 23, 56, 0.14);
  padding: 0.35rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all 0.18s ease;
}

.ed-nav__menu.open,
.ed-nav__group:hover .ed-nav__menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.ed-nav__menu-item {
  display: block;
  padding: 0.6rem 0.75rem;
  text-decoration: none;
  border-bottom: 1px solid var(--at-grid-line);
  transition: background 0.12s;
}

.ed-nav__menu-item:last-child { border-bottom: 0; }
.ed-nav__menu-item:hover { background: rgba(0, 194, 169, 0.08); }

.ed-nav__menu-kicker {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-mute);
  margin-bottom: 0.15rem;
}

.ed-nav__menu-label {
  display: block;
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--at-navy-deep);
}

/* ── GitHub button ─────────────────────────────────────────────────────── */
.ed-github {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: 0.35rem;
  padding: 0.42rem 0.75rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  text-decoration: none;
  transition: background 0.15s ease;
}

.ed-github:hover { background: var(--at-navy); }

/* ── Mobile hamburger ──────────────────────────────────────────────────── */
.ed-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2.2rem;
  height: 2.2rem;
  margin-left: auto;
  padding: 0.35rem;
  background: none;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
}

.ed-hamburger span {
  display: block;
  width: 100%;
  height: 1.5px;
  background: var(--at-navy-deep);
  transition: transform 0.2s ease, opacity 0.2s ease, width 0.2s ease;
}

.ed-hamburger.active span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.ed-hamburger.active span:nth-child(2) { opacity: 0; width: 0; }
.ed-hamburger.active span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

@media (min-width: 960px) { .ed-hamburger { display: none; } }

/* ── Mobile drawer ─────────────────────────────────────────────────────── */
.ed-drawer {
  position: fixed;
  top: 4.25rem;
  left: 0;
  right: 0;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.28s ease;
}

.ed-drawer.open { max-height: 520px; }

@media (min-width: 960px) { .ed-drawer { display: none; } }

.ed-drawer__inner {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  max-width: var(--at-page-max);
  margin: 0 auto;
}

.ed-drawer__label,
.ed-drawer__section {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--at-mute);
  padding: 0.5rem 0 0.3rem;
  border-bottom: 1px solid var(--at-grid-line);
  margin-bottom: 0.3rem;
}

.ed-drawer__section { margin-top: 0.8rem; }

.ed-drawer__link {
  display: block;
  padding: 0.6rem 0.25rem;
  font-family: var(--at-serif);
  font-size: 1rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  text-decoration: none;
}

.ed-drawer__sublink {
  display: block;
  padding: 0.45rem 0.25rem;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-mute-2);
  text-decoration: none;
}

.ed-drawer__link:hover,
.ed-drawer__sublink:hover { color: var(--at-teal-deep); }

.ed-drawer__rule {
  border: 0;
  border-top: 1px solid var(--at-grid-line);
  margin: 0.5rem 0;
}

@media (max-width: 640px) {
  .ed-header__inner { padding: 0 1.25rem; gap: 1rem; }
  .ed-masthead__tag { display: none; }
}
</style>

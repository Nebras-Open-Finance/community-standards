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

        <div class="ed-nav__group">
          <button
            type="button"
            class="ed-nav__link ed-nav__trigger ed-nav__trigger--compact"
            :aria-expanded="programOpen ? 'true' : 'false'"
            @click="programOpen = !programOpen"
          >
            Program
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="ed-nav__menu" :class="{ open: programOpen }">
            <a href="/support-service-desk/" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Support</span>
              <span class="ed-nav__menu-label">Service Desk</span>
            </a>
            <a href="/pricing/" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Pricing</span>
              <span class="ed-nav__menu-label">Commercial Model</span>
            </a>
            <a href="/policy" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Governance</span>
              <span class="ed-nav__menu-label">Policies</span>
            </a>
            <a href="/doc-repository/" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Participants</span>
              <span class="ed-nav__menu-label">Document Repository</span>
            </a>
            <a href="/program/whats-live" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Activity</span>
              <span class="ed-nav__menu-label">Live Ecosystem</span>
            </a>
          </div>
        </div>

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
            <a href="/tech/api-specs/" class="ed-nav__menu-item">
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>

        <VersionDropdown />
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

        <div class="ed-drawer__section">Program</div>
        <a href="/support-service-desk/" class="ed-drawer__sublink">Service Desk</a>
        <a href="/pricing/" class="ed-drawer__sublink">Pricing</a>
        <a href="/policy" class="ed-drawer__sublink">Policies</a>
        <a href="/doc-repository/" class="ed-drawer__sublink">Document Repository</a>
        <a href="/program/whats-live" class="ed-drawer__sublink">Live Ecosystem</a>

        <div class="ed-drawer__section">Developer Docs</div>
        <a href="/tech/tpp-standards" class="ed-drawer__sublink">TPP — Open Finance Standards</a>
        <a href="/tech/lfi-api-hub" class="ed-drawer__sublink">LFI — Integration Guide</a>
        <a href="/tech/api-specs/" class="ed-drawer__sublink">API Specs</a>
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
import VersionDropdown from '../../VersionDropdown.vue'

const menuOpen = ref(false)
const docsOpen = ref(false)
const programOpen = ref(false)

function handleClickOutside(e) {
  if (!e.target.closest('.ed-nav__group')) {
    docsOpen.value = false
    programOpen.value = false
  }
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

.ed-nav__trigger--compact {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

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

/* ── GitHub icon ───────────────────────────────────────────────────────── */
.ed-github {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  margin-left: 0.35rem;
  color: var(--at-mute);
  text-decoration: none;
  transition: color 0.5s ease;
}

.ed-github:hover {
  color: var(--at-navy-deep);
  transition: color 0.25s ease;
}

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

<script setup lang="ts">
// Phase 3 port of docs/components/WebPages/Components/PageHeader.vue.
//
// Deviations from the original:
//   * <script setup lang="ts"> with strict typing (no `any`).
//   * Search modal — opens via the magnifying-glass button or Cmd/Ctrl+K.
//     The modal (and its ~750 KB generated index) is dynamically imported
//     so it doesn't ship in the main bundle.
//   * Click-outside handler types `MouseEvent` and narrows the target to
//     `Element` before calling `.closest()` (was untyped in the original).
//
// The component renders fixed at the top of the viewport (`position: fixed`),
// so the layout reserves space via `padding-top: var(--at-header-height)`.
import { ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchModal } from '@/composables/useSearchModal'
import { useDarkPreview } from '@/composables/useDarkPreview'

const { enabled: darkPreview, toggle: toggleDark } = useDarkPreview()

const SearchModal = defineAsyncComponent(() => import('./SearchModal.vue'))

const route = useRoute()
// `everOpened` latches true on first open so the modal stays mounted and its
// enter/leave transitions can play. Gating mount on this flag keeps the
// ~750 KB SearchModal chunk out of the initial page load.
const { isOpen: searchOpen, everOpened: searchEverOpened, open, close, toggle } = useSearchModal()

const menuOpen = ref(false)
const docsOpen = ref(false)
const programOpen = ref(false)

function openSearch(): void {
  menuOpen.value = false
  open()
}

function handleClickOutside(e: MouseEvent): void {
  const target = e.target
  if (!(target instanceof Element)) return
  if (!target.closest('.ed-nav__group')) {
    docsOpen.value = false
    programOpen.value = false
  }
}

function handleKey(e: KeyboardEvent): void {
  if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
    e.preventDefault()
    if (!searchOpen.value) menuOpen.value = false
    toggle()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKey)
})

// Active-link helper. Mirrors the prefix-match style the rest of the docs use
// (e.g. /policy and /policy/foo both highlight the Program → Policies link).
// Reads vue-router's reactive `route.path` — this is the only behavioural
// addition over the original (the docs/ version had no active-link styling).
function isActive(prefix: string): boolean {
  return route.path === prefix || route.path.startsWith(prefix + '/')
}
</script>

<template>
  <header class="ed-header">

    <div class="ed-header__inner">

      <!-- Theme toggle (sun / moon) -->
      <button
        type="button"
        class="ed-theme-toggle"
        :class="{ 'is-dark': darkPreview }"
        :aria-pressed="darkPreview ? 'true' : 'false'"
        :aria-label="darkPreview ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="darkPreview ? 'Light mode' : 'Dark mode'"
        @click="toggleDark"
      >
        <!-- Sun (shown in light mode → click for dark) -->
        <svg v-if="!darkPreview" class="ed-theme-toggle__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.5 12H2.3M21.7 12h-2.2M5.6 5.6L4 4M20 20l-1.6-1.6M5.6 18.4L4 20M20 4l-1.6 1.6" />
        </svg>
        <!-- Moon (shown in dark mode → click for light) -->
        <svg v-else class="ed-theme-toggle__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20.5 14.2A8.4 8.4 0 0 1 9.8 3.5a.6.6 0 0 0-.8-.7 9.6 9.6 0 1 0 12.2 12.2.6.6 0 0 0-.7-.8z" />
        </svg>
      </button>

      <!-- Masthead / wordmark -->
      <a href="/" class="ed-masthead" aria-label="AlTareq home">
        <img src="/AlTareq.png" alt="AlTareq" class="ed-masthead__logo" />
        <span class="ed-masthead__beta">Beta<i aria-hidden="true"></i></span>
        <span class="ed-masthead__tag">Built by the community</span>
      </a>

      <!-- Desktop nav -->
      <nav class="ed-nav" aria-label="Primary">

        <div class="ed-nav__group">
          <button
            type="button"
            class="ed-nav__link ed-nav__trigger ed-nav__trigger--compact"
            :class="{ 'is-active': isActive('/support-service-desk') || isActive('/pricing') || isActive('/policy') || isActive('/doc-repository') || isActive('/program') }"
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
              <span class="ed-nav__menu-label">In Production</span>
            </a>
          </div>
        </div>

        <div class="ed-nav__group">
          <button
            type="button"
            class="ed-nav__link ed-nav__trigger"
            :class="{ 'is-active': isActive('/tech') || isActive('/knowledge-base') || isActive('/proposals') }"
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
            <a href="/proposals/" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Community</span>
              <span class="ed-nav__menu-label">Proposals &amp; Voting</span>
            </a>
            <a href="/tech/release-notes-and-erratas/" class="ed-nav__menu-item">
              <span class="ed-nav__menu-kicker">Changelog</span>
              <span class="ed-nav__menu-label">Release Notes &amp; Erratas</span>
            </a>
          </div>
        </div>

        <a href="/metrics" class="ed-nav__link" :class="{ 'is-active': isActive('/metrics') }">Metrics</a>
        <a href="/news" class="ed-nav__link" :class="{ 'is-active': isActive('/news') }">News</a>

        <button
          type="button"
          class="ed-search-trigger"
          aria-label="Search documentation (Ctrl+K)"
          @click="openSearch"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="10" cy="10" r="7" />
            <path d="M21 21l-6-6" />
          </svg>
        </button>

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

      <!-- Mobile search trigger (hamburger sits next to it) -->
      <button
        type="button"
        class="ed-search-trigger ed-search-trigger--mobile"
        aria-label="Search documentation"
        @click="openSearch"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="10" cy="10" r="7" />
          <path d="M21 21l-6-6" />
        </svg>
      </button>

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

        <a href="/metrics" class="ed-drawer__link">Metrics</a>

        <div class="ed-drawer__section">Program</div>
        <a href="/support-service-desk/" class="ed-drawer__sublink">Service Desk</a>
        <a href="/pricing/" class="ed-drawer__sublink">Pricing</a>
        <a href="/policy" class="ed-drawer__sublink">Policies</a>
        <a href="/doc-repository/" class="ed-drawer__sublink">Document Repository</a>
        <a href="/program/whats-live" class="ed-drawer__sublink">In Production</a>

        <div class="ed-drawer__section">Developer Docs</div>
        <a href="/tech/tpp-standards" class="ed-drawer__sublink">TPP &mdash; Open Finance Standards</a>
        <a href="/tech/lfi-api-hub" class="ed-drawer__sublink">LFI &mdash; Integration Guide</a>
        <a href="/tech/api-specs/" class="ed-drawer__sublink">API Specs</a>
        <a href="/knowledge-base" class="ed-drawer__sublink">Knowledge Base</a>
        <a href="/proposals/" class="ed-drawer__sublink">Proposals &amp; Voting</a>
        <a href="/tech/release-notes-and-erratas/" class="ed-drawer__sublink">Release Notes &amp; Erratas</a>
      </div>
    </div>

    <SearchModal v-if="searchEverOpened" :open="searchOpen" @close="close" />
  </header>
</template>

<style scoped>
/* -- Shell ------------------------------------------------------------- */
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
  height: var(--at-header-height);
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* -- Dark-preview toggle ---------------------------------------------- */
.ed-theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 0.15rem;
  padding: 0;
  background: none;
  border: 1px solid var(--at-grid-line-2);
  border-radius: 999px;
  color: var(--at-mute-2);
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.25s ease;
}

.ed-theme-toggle:hover {
  color: var(--at-navy-deep);
  background: rgba(0, 39, 127, 0.05);
  border-color: var(--at-navy-deep);
}

.ed-theme-toggle.is-dark {
  color: var(--at-gold);
  border-color: rgba(230, 166, 64, 0.45);
}

.ed-theme-toggle.is-dark:hover {
  color: var(--at-gold);
  background: rgba(230, 166, 64, 0.10);
  border-color: var(--at-gold);
}

.ed-theme-toggle__icon { display: block; }

.ed-theme-toggle:active { transform: scale(0.92); }

/* -- Masthead ---------------------------------------------------------- */
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

/* -- BETA badge -------------------------------------------------------- */
/* Uses the signature --at-gradient ramp and the square corners of the rest
   of the chrome, so it reads as program status rather than a nav accent.
   The <i> is a slow sheen sweep; it holds on both light and dark surfaces. */
.ed-masthead__beta {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  line-height: 1;
  color: #fff;
  background: linear-gradient(90deg, #00267E 0%, #00A2FB 55%, #00C2A9 100%);
  padding: 0.25rem 0.5rem 0.25rem 0.56rem;
  white-space: nowrap;
}

.ed-masthead__beta i {
  position: absolute;
  inset: 0;
  width: 34%;
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0) 100%);
  animation: ed-beta-sheen 4.5s ease-in-out infinite;
}

@keyframes ed-beta-sheen {
  0%        { transform: translateX(-120%); }
  55%, 100% { transform: translateX(220%); }
}

@media (prefers-reduced-motion: reduce) {
  .ed-masthead__beta i { animation: none; opacity: 0; }
}

.ed-masthead__tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--at-mute-2);
  white-space: nowrap;
  border-left: 1px solid var(--at-grid-line);
  padding-left: 0.75rem;
}

/* -- Desktop nav ------------------------------------------------------- */
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

.ed-nav__link.is-active {
  color: var(--at-teal-deep);
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

/* -- Search trigger ---------------------------------------------------- */
.ed-search-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-left: 0.35rem;
  padding: 0;
  background: none;
  border: 0;
  color: var(--at-mute);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.ed-search-trigger:hover {
  color: var(--at-navy-deep);
  background: rgba(0, 39, 127, 0.05);
}

.ed-search-trigger--mobile {
  display: none;
}

@media (max-width: 959px) {
  .ed-search-trigger--mobile {
    display: flex;
    margin-left: auto;
  }
}

/* -- GitHub icon ------------------------------------------------------- */
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

/* -- Mobile hamburger -------------------------------------------------- */
/* `margin-left: auto` pushes the hamburger right on viewports where the
   mobile search trigger is hidden; when the search trigger is showing
   (≤ 959px) it already grabs the auto-margin and the hamburger sits
   immediately next to it. */
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

@media (max-width: 959px) {
  .ed-hamburger { margin-left: 0.4rem; }
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

/* -- Mobile drawer ----------------------------------------------------- */
.ed-drawer {
  position: fixed;
  top: var(--at-header-height);
  left: 0;
  right: 0;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  overflow-y: auto;
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

@media (max-width: 640px) {
  .ed-header__inner { padding: 0 1.25rem; gap: 1rem; }
  .ed-masthead__tag { display: none; }
  /* .ed-masthead__beta intentionally stays visible on mobile */
}
</style>

<template>
  <header class="homepage-header">

    <a href="/">
      <img src="/images/altareq.svg" alt="AlTareq" class="image-header" />
    </a>

    <!-- Desktop nav -->
    <nav class="header-links desktop-links">

      <div class="header-dropdown">
        <a href="/tech/overview" class="header-link dropdown-trigger">
          Developer Docs
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
        <div class="dropdown-menu">
          <a href="/tech/overview">Technology Architecture &amp; Overview</a>
          <a href="/tech/tpp-standards">TPP – Open Finance Standards</a>
          <a href="/tech/lfi-api-hub">LFI – API Hub Integration</a>
          <a href="/knowledge-base">Knowledge Base</a>
        </div>
      </div>

      <a href="/metrics" class="header-link">Metrics &amp; Monitoring</a>
      <a href="/news" class="header-link">Articles &amp; News</a>

      <a href="https://github.com/AlTareq-OpenFinance/community-specs" class="github-link" target="_blank"
        rel="noopener noreferrer" aria-label="View on GitHub">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </nav>

    <!-- Hamburger button (mobile only) -->
    <button class="hamburger" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Mobile drawer -->
    <div class="mobile-menu" :class="{ open: menuOpen }" @click.self="menuOpen = false">
      <div class="mobile-menu-inner">
        <a href="/tech/overview" class="mobile-link mobile-section-label">Developer Docs</a>
        <a href="/tech/tpp-standards" class="mobile-link mobile-indent">TPP – Open Finance Standards</a>
        <a href="/tech/lfi-api-hub" class="mobile-link mobile-indent">LFI – API Hub Integration</a>
        <a href="/knowledge-base" class="mobile-link mobile-indent">Knowledge Base</a>
        <hr class="mobile-divider" />
        <a href="/metrics" class="mobile-link">Metrics &amp; Monitoring</a>
        <a href="/news" class="mobile-link">Articles &amp; News</a>
        <a href="https://github.com/AlTareq-OpenFinance/community-specs" class="mobile-link" target="_blank"
          rel="noopener noreferrer">GitHub</a>
      </div>
    </div>

  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
.homepage-header {
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
}

.image-header {
  width: 7rem;
  opacity: 80%;
  flex-shrink: 0;
}

/* ── Desktop nav ── */
.desktop-links {
  display: none;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
  padding-right: 1rem;
}

@media (min-width: 1024px) {
  .desktop-links {
    display: flex;
  }
}

.header-link {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 39, 127, 1);
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  transition: background 0.15s ease, opacity 0.15s ease;
  white-space: nowrap;
}

.header-link:hover {
  background: rgba(0, 39, 127, 0.06);
}

.header-dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 280px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.13);
  padding: 6px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: all 0.18s ease;
  z-index: 1000;
}

.dropdown-menu a {
  display: block;
  padding: 10px 16px;
  color: rgba(0, 39, 127, 1);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  transition: background 0.12s;
}

.dropdown-menu a:hover {
  background: #f4f6fb;
}

.header-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.github-link {
  display: flex;
  align-items: center;
  color: rgba(0, 39, 127, 0.7);
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}

.github-link:hover {
  color: rgba(0, 39, 127, 1);
  background: rgba(0, 39, 127, 0.06);
}

/* ── Hamburger (mobile only) ── */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: auto;
  padding: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s;
}

.hamburger:hover {
  background: rgba(0, 39, 127, 0.06);
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: rgba(0, 39, 127, 0.85);
  border-radius: 2px;
  transform-origin: center;
  transition: transform 0.22s ease, opacity 0.22s ease, width 0.22s ease;
}

/* X animation */
.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  width: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (min-width: 1024px) {
  .hamburger {
    display: none;
  }
}

/* ── Mobile drawer ── */
.mobile-menu {
  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.28s ease, box-shadow 0.28s ease;
  z-index: 99998;
}

.mobile-menu.open {
  max-height: 420px;
}

@media (min-width: 1024px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-menu-inner {
  padding: 0.75rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.mobile-link {
  display: block;
  padding: 0.65rem 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 39, 127, 1);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.12s;
}

.mobile-link:hover {
  background: rgba(0, 39, 127, 0.06);
}

.mobile-section-label {
  font-weight: 600;
}

.mobile-indent {
  padding-left: 1.25rem;
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.85;
}

.mobile-divider {
  border: none;
  border-top: 1px solid rgba(0, 39, 127, 0.1);
  margin: 0.4rem 0;
}
</style>

import { ViteSSG } from 'vite-ssg'
import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

// Editorial design system styles (Phase 2). Order matters:
//   fonts  → @import url(...) for the three families used by tokens
//   tokens → :root { --at-* } that every component consumes
//   base   → html/body resets + .at-serif/.at-mono helpers
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/api-specs.css'
import './styles/endpoint.css'
import './styles/internal.css'
import './styles/dark-preview.css'

const routes = setupLayouts(generatedRoutes)

// Phase 1 skeleton — see supporting/internal_helpers/migration-plan.md §7 Phase 1.
// vite-ssg drives both client hydration and the static crawl; `includedRoutes`,
// head injection, and `getStaticPaths` for dynamic routes all hang off this entry.
export const createApp = ViteSSG(App, {
  routes,
  // Reset scroll on every navigation so a new page always opens at the top.
  // Honour the browser's saved position on back/forward, and jump to an
  // in-page anchor when the target has a hash.
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 0 }
    return { top: 0 }
  },
}, ({ router, isClient }) => {
  if (!isClient) return

  // Stale-deploy recovery. Each build hashes its chunk filenames, so a client
  // still running the PREVIOUS build 404s when it requests an old chunk that the
  // new deploy has replaced. On this host the 404 is served as index.html, which
  // the browser rejects with "Expected a JavaScript module but got text/html" and
  // the route fails to load. Force one full document load of the current build so
  // the fresh HTML + chunk manifest take over. A short sessionStorage guard stops
  // reload loops when the failure is genuine (a truly missing chunk) rather than a
  // deploy race.
  const recover = (path?: string): void => {
    const KEY = 'chunk-reload-at'
    if (Date.now() - Number(sessionStorage.getItem(KEY) || 0) < 10_000) return
    try { sessionStorage.setItem(KEY, String(Date.now())) } catch { /* private mode */ }
    if (path) window.location.assign(path)
    else window.location.reload()
  }

  // Vite dispatches this on window when a dynamic import / modulepreload fails.
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault() // handle recovery ourselves instead of throwing
    recover()
  })

  // Router-driven navigations surface the same failure through onError; reload
  // straight to the intended route so the click isn't lost.
  router.onError((err, to) => {
    if (/dynamically imported module|module script failed|Failed to fetch/i.test((err as Error)?.message || '')) {
      recover(to?.fullPath)
    }
  })
})

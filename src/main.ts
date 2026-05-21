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

const routes = setupLayouts(generatedRoutes)

// Phase 1 skeleton — see supporting/internal_helpers/migration-plan.md §7 Phase 1.
// vite-ssg drives both client hydration and the static crawl; `includedRoutes`,
// head injection, and `getStaticPaths` for dynamic routes all hang off this entry.
export const createApp = ViteSSG(App, { routes })

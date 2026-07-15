import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { expandSsgPath } from './src/data/ssg-paths'

// Phase 1 skeleton — see supporting/internal_helpers/migration-plan.md §7 Phase 1.
// vite-ssg consumes this config via its CLI; `vite` dev/build also work directly
// for fast iteration during the skeleton phase.
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({}),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'md'],
      // `_shared` holds route-less helpers; the proposal content partials (see
      // PvProposalTabs) are imported directly by their proposal page, never
      // routed. Both the folder convention (proposals/<id>/outcome.vue) and the
      // flat convention (proposals/<id>.outcome.vue) are excluded.
      exclude: [
        '**/_shared/**',
        '**/outcome.vue',
        '**/feedback.vue',
        '**/*.outcome.vue',
        '**/*.feedback.vue',
      ],
      // Preserve filename case in route paths so `accounts-AccountId.vue`
      // generates `accounts-AccountId.html` rather than the lowercase variant.
      // Required for case-sensitive (Linux) hosts where outbound links
      // reference the mixed-case form.
      caseSensitive: true,
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['src/composables'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Phase 5b-iv onwards — enumerate static paths for every dynamic route.
    // vite-ssg's default `includedRoutes` filters dynamic routes out
    // entirely; here we delegate the placeholder → concrete-path expansion
    // to `expandSsgPath` (see `src/data/ssg-paths.ts`). Adding a new
    // dynamic route is a one-line addition to that table.
    includedRoutes(paths: string[]): string[] {
      return paths.flatMap((p) => expandSsgPath(p))
    },
    // After the static crawl writes every page, emit dist/sitemap.xml from the
    // rendered canonical URLs. robots.txt already points search engines at it.
    async onFinished() {
      const { generateSitemap } = await import('./scripts/generate-sitemap.mjs')
      generateSitemap()
    },
  },
})

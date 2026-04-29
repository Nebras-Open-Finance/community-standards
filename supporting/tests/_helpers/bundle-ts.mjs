// Shared helper: esbuild-bundle a TypeScript entry into a runnable ESM file
// in a tmpdir, dynamic-import it, and clean up. Used by orphan-pages,
// api-spec-pages, and any other test that needs to introspect typed data.
//
// We avoid `tsx`/`ts-node`/Node's experimental TS stripping so the test stays
// stable across Node versions and respects the project's existing tsconfig.

import { build } from 'esbuild'
import { writeFileSync, mkdtempSync, rmSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// Bundle into the project's node_modules tree so externalised imports
// (`vue`, `vue-router`, etc.) resolve via Node's normal package lookup.
const HELPERS_DIR = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(HELPERS_DIR, '..', '..', '..')
const CACHE_ROOT = join(PROJECT_ROOT, 'node_modules', '.cache', 'cs-tests')

/**
 * Bundle a TS entry block (already-written source) and import it.
 * @param {string} entrySource — TS source for the entry file (re-exports etc.)
 * @returns {Promise<{ mod: any, dispose: () => void }>}
 */
export async function bundleAndImport(entrySource) {
  if (!existsSync(CACHE_ROOT)) mkdirSync(CACHE_ROOT, { recursive: true })
  const tmp = mkdtempSync(join(CACHE_ROOT, 'run-'))
  const entry = join(tmp, 'entry.ts')
  const out = join(tmp, 'bundle.mjs')

  writeFileSync(entry, entrySource)

  await build({
    entryPoints: [entry],
    outfile: out,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node22',
    logLevel: 'silent',
    // Mirror vite.config.ts aliases so '@/...' imports resolve identically.
    alias: {
      '@': join(PROJECT_ROOT, 'src'),
      '@components': join(PROJECT_ROOT, 'src', 'components'),
    },
    // Keep heavy runtimes external — bundling them would balloon the file
    // and offers no value for static analysis. They resolve at import time
    // because the bundle lives inside `node_modules/.cache/`.
    external: ['vue', 'vue-router', 'vite', 'vite-ssg'],
  })

  const mod = await import(pathToFileURL(out).href)
  return {
    mod,
    dispose: () => rmSync(tmp, { recursive: true, force: true }),
  }
}

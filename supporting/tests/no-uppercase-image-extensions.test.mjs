import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import { join, extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

// Regression guard for: https://nebras-open-finance.com/ deployment (Cloudflare Pages, Linux, case-sensitive).
// Pages authored on Windows/macOS reference `/images/foo/1.png` but git tracked the file as `1.PNG`.
// On case-insensitive local filesystems this works; on the deployed Linux host it 404s.
// Ban uppercase image extensions under public/ so the two cases can't diverge.

const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url))
const PUBLIC_DIR = join(REPO_ROOT, 'public')

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.bmp', '.avif', '.heic'])

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile()) yield full
  }
}

test('no uppercase image extensions under public/', async () => {
  const offenders = []
  for await (const file of walk(PUBLIC_DIR)) {
    const ext = extname(file)
    if (ext && ext !== ext.toLowerCase() && IMAGE_EXTS.has(ext.toLowerCase())) {
      offenders.push(relative(REPO_ROOT, file))
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `Found image files with uppercase extensions. Rename them to lowercase — Cloudflare Pages is case-sensitive and requests from code use lowercase:\n  ${offenders.join('\n  ')}`
  )
})

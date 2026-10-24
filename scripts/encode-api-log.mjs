// Replace the pretty-printed API log shards in dist/ with their dictionary-coded
// equivalents. Runs after vite-ssg has copied public/ into dist/ and before
// minify-dist-json.mjs applies the Cloudflare Pages size gate.
//
// public/ keeps the readable row-object shards — that is the shape fresh exports
// arrive in and the shape `npm run dev` serves. Only the deployed copy is coded,
// and src/composables/apiLog.ts decodes it back to identical row objects, so no
// figure on /program/whats-live or the other log readers can shift.
//
// The deployed manifest then lists each shard as `<file>?v=<content hash>`, so
// public/_headers can let browsers cache the shards indefinitely: a shard that
// changes gets a new URL, and the manifest itself is always revalidated.

import { createHash } from 'node:crypto'
import { readFile, writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { encodeApiLog, decodeApiLog } from './api-log-codec.mjs'

const DIR = 'dist/api'
const MANIFEST = join(DIR, 'api-log-index.json')

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'))
if (!Array.isArray(manifest.shards) || manifest.shards.length === 0) {
  console.error('[encode-api-log] api-log-index.json lists no shards')
  process.exit(1)
}

const mib = (n) => (n / 1024 / 1024).toFixed(2)
let before = 0
let after = 0
const versioned = []

for (const file of manifest.shards) {
  const path = join(DIR, file)
  const rows = JSON.parse(await readFile(path, 'utf8'))
  const encoded = encodeApiLog(rows)

  // Round-trip before overwriting. A codec bug must fail the build, not ship a
  // silently altered dataset.
  if (JSON.stringify(decodeApiLog(encoded)) !== JSON.stringify(rows)) {
    console.error(`[encode-api-log] ${file} does not survive an encode/decode round-trip`)
    process.exit(1)
  }

  before += (await stat(path)).size
  const body = JSON.stringify(encoded)
  await writeFile(path, body)
  const size = (await stat(path)).size
  after += size
  versioned.push(`${file}?v=${createHash('sha256').update(body).digest('hex').slice(0, 12)}`)
  console.log(`[encode-api-log] ${file}: ${rows.length} rows -> ${mib(size)} MiB`)
}

await writeFile(MANIFEST, JSON.stringify({ ...manifest, shards: versioned }))

console.log(`[encode-api-log] total ${mib(before)} MiB -> ${mib(after)} MiB`)

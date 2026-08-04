// Minify the metrics JSON copied verbatim from public/ into dist/.
//
// The committed sources under public/api/ are pretty-printed so that merging
// fresh exports stays a readable textual splice. Cloudflare Pages rejects any
// single file over 25 MiB, so the shipped copies are re-serialised without
// indentation. The API log shards need more than that and are dictionary-coded
// first by scripts/encode-api-log.mjs, which runs immediately before this.
//
// Fails loudly if a file is still over the Pages limit after minifying —
// silently deploying a broken build is worse than failing the gate.

import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIR = 'dist/api'
const PAGES_MAX_BYTES = 25 * 1024 * 1024

const files = (await readdir(DIR)).filter(f => f.endsWith('.json'))
const oversized = []

for (const file of files) {
  const path = join(DIR, file)
  const before = (await stat(path)).size
  await writeFile(path, JSON.stringify(JSON.parse(await readFile(path, 'utf8'))))
  const after = (await stat(path)).size

  const mib = n => (n / 1024 / 1024).toFixed(1)
  console.log(`[minify-dist-json] ${file}: ${mib(before)} MiB -> ${mib(after)} MiB`)

  if (after > PAGES_MAX_BYTES) oversized.push(`${file} is ${mib(after)} MiB`)
}

if (oversized.length) {
  console.error(
    `[minify-dist-json] Cloudflare Pages rejects files over 25 MiB:\n  ${oversized.join('\n  ')}\n` +
      'Split or roll up the offending log before deploying.',
  )
  process.exit(1)
}

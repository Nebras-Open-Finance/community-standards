// Guards the quarterly sharding + dictionary codec for the API usage log.
//
// The log used to be a single public/api/api-log.json. It is now a set of
// quarterly shards listed by api-log-index.json, and the deployed copies are
// dictionary-coded to stay under Cloudflare Pages' 25 MiB per-file limit.
// Both transforms are supposed to be presentation-only: every figure on
// /metrics, the homepage and /program/whats-live must be computed from exactly
// the rows the single file used to provide.
//
// These tests pin that down from three directions:
//   1. the historical rows are byte-for-byte what they were before the split
//   2. encode -> decode is lossless on the real shards
//   3. the browser decoder in src/composables/apiLog.ts agrees with the build
//      encoder in scripts/api-log-codec.mjs
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { encodeApiLog, decodeApiLog, FIELDS } from '../../scripts/api-log-codec.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const API_DIR = join(ROOT, 'public', 'api')
const MANIFEST = join(API_DIR, 'api-log-index.json')
const BASELINE = join(__dirname, 'fixtures', 'api-log-baseline.json')

// Cloudflare Pages rejects any single file above this.
const PAGES_MAX_BYTES = 25 * 1024 * 1024

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
const quarterOf = (date) => `q${Math.floor((Number(date.slice(5, 7)) - 1) / 3) + 1}-${date.slice(2, 4)}`

const manifest = readJson(MANIFEST)
const shardFiles = manifest.shards
const shards = shardFiles.map((file) => ({ file, rows: readJson(join(API_DIR, file)) }))
const allRows = shards.flatMap((s) => s.rows)

describe('API log shards', () => {
  it('the manifest lists every shard, chronologically, and nothing else', () => {
    assert.ok(Array.isArray(shardFiles) && shardFiles.length > 0, 'manifest lists no shards')

    for (const file of shardFiles) {
      assert.ok(existsSync(join(API_DIR, file)), `manifest lists a missing shard: ${file}`)
    }
    // The pre-split monolith must be gone — shipping it too would blow the
    // Pages limit and silently double-count every row.
    assert.ok(!existsSync(join(API_DIR, 'api-log.json')), 'the pre-split api-log.json still exists')

    const sortKey = (f) => {
      const q = f.slice('api-log-'.length, -'.json'.length)
      return `${q.slice(3)}-${q.slice(1, 2)}`
    }
    assert.deepEqual(
      shardFiles,
      [...shardFiles].sort((a, b) => (sortKey(a) < sortKey(b) ? -1 : 1)),
      'manifest shards are not in chronological order',
    )
  })

  it('each shard holds only its own quarter, and the quarters do not overlap', () => {
    const seen = new Map()
    for (const { file, rows } of shards) {
      assert.ok(rows.length > 0, `${file} is empty`)
      const expected = file.slice('api-log-'.length, -'.json'.length)
      for (const row of rows) {
        assert.equal(quarterOf(row.date), expected, `${file} contains a ${row.date} record`)
        const owner = seen.get(row.date)
        assert.ok(owner === undefined || owner === file, `${row.date} appears in ${owner} and ${file}`)
        seen.set(row.date, file)
      }
    }
  })

  it('the concatenated shards stay date-sorted, as the single file was', () => {
    for (let i = 1; i < allRows.length; i++) {
      assert.ok(
        allRows[i].date >= allRows[i - 1].date,
        `row ${i} (${allRows[i].date}) precedes row ${i - 1} (${allRows[i - 1].date})`,
      )
    }
  })

  it('every row carries the full field set the consumers read', () => {
    for (const { file, rows } of shards) {
      for (const field of FIELDS) {
        assert.ok(field in rows[0], `${file} rows are missing "${field}"`)
      }
    }
  })

  // The split, and every merge since, must have left the historical rows
  // untouched. The fixture pins a hash of everything up to the split date, so
  // this assertion keeps holding as later quarters grow.
  it('historical rows are unchanged since the split', () => {
    const baseline = readJson(BASELINE)
    const historical = allRows.filter((r) => r.date <= baseline.upToDate)

    assert.equal(historical.length, baseline.records, 'record count through the split date changed')

    const perDate = {}
    for (const row of historical) perDate[row.date] = (perDate[row.date] ?? 0) + 1
    assert.deepEqual(perDate, baseline.perDate, 'per-day record counts through the split date changed')

    const sha = createHash('sha256').update(JSON.stringify(historical)).digest('hex')
    assert.equal(sha, baseline.sha256, 'historical rows differ from the pre-split content')
  })
})

describe('API log codec', () => {
  it('round-trips every shard losslessly', () => {
    for (const { file, rows } of shards) {
      assert.deepStrictEqual(decodeApiLog(encodeApiLog(rows)), rows, `${file} lost data in the codec`)
    }
  })

  it('preserves numeric measures exactly, without rounding', () => {
    // avgMs / p50 / p95 / p99 divide executiontime by totalapicalls, so any
    // rounding here would move figures on /metrics.
    for (const { file, rows } of shards) {
      const decoded = decodeApiLog(encodeApiLog(rows))
      for (let i = 0; i < rows.length; i++) {
        assert.equal(decoded[i].executiontime, rows[i].executiontime, `${file} row ${i} executiontime`)
        assert.equal(decoded[i].totalapicalls, rows[i].totalapicalls, `${file} row ${i} totalapicalls`)
      }
    }
  })

  it('passes an already-decoded array straight through, so dev serves the raw shards', () => {
    const sample = shards[0].rows.slice(0, 5)
    assert.deepStrictEqual(decodeApiLog(sample), sample)
  })

  it('keeps every coded shard well under the Cloudflare Pages limit', () => {
    for (const { file, rows } of shards) {
      const size = Buffer.byteLength(JSON.stringify(encodeApiLog(rows)))
      assert.ok(
        size < PAGES_MAX_BYTES,
        `coded ${file} is ${(size / 1024 / 1024).toFixed(2)} MiB, over the 25 MiB limit`,
      )
    }
  })

  it('the browser decoder agrees with the build encoder', async () => {
    // src/composables/apiLog.ts carries its own copy of the decode logic (it
    // cannot import from scripts/). Bundle it and check the two agree, so the
    // pair can never drift apart unnoticed.
    const { bundleAndImport } = await import('./_helpers/bundle-ts.mjs')
    const { mod, dispose } = await bundleAndImport(
      "export { decodeApiLogPayload } from '@/composables/apiLog'\n",
    )
    try {
      const decodeInBrowser = mod.decodeApiLogPayload
      assert.equal(typeof decodeInBrowser, 'function', 'apiLog.ts does not export decodeApiLogPayload')

      for (const { file, rows } of shards) {
        assert.deepStrictEqual(decodeInBrowser(encodeApiLog(rows)), rows, `${file} decoded differently`)
      }
    } finally {
      dispose()
    }
  })
})

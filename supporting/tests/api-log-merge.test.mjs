// Exercises scripts/merge-api-log.mjs — the weekly "drop a fresh export in and
// merge it" workflow for the quarterly API log shards.
//
// Each case runs against a throwaway copy of public/api/ so the real shards are
// never touched. Exports are synthesised by slicing record text straight out of
// a real shard, which guarantees the fixture has the exporter's exact byte
// format (tabs, `"key" : value`, `.0` floats, escaped `\/`) rather than
// whatever JSON.stringify would produce.
import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, rmSync, copyFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { mergeApiLog, quarterOf } from '../../scripts/merge-api-log.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const API_DIR = join(ROOT, 'public', 'api')

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const manifestOf = (dir) => readJson(join(dir, 'api-log-index.json'))
const rowsOf = (dir) =>
  manifestOf(dir).shards.flatMap((f) => readJson(join(dir, f)))

// A fresh copy of the shards + manifest for one test to mutate.
function scratchApiDir() {
  const dir = mkdtempSync(join(tmpdir(), 'api-log-merge-'))
  mkdirSync(dir, { recursive: true })
  copyFileSync(join(API_DIR, 'api-log-index.json'), join(dir, 'api-log-index.json'))
  for (const file of manifestOf(API_DIR).shards) copyFileSync(join(API_DIR, file), join(dir, file))
  return dir
}

// Slice the records dated >= `fromDate` out of a shard, preserving its bytes,
// and write them out as a standalone export file.
function exportFrom(dir, shardFile, fromDate, exportPath, rewriteDates) {
  const raw = readFileSync(join(dir, shardFile), 'utf8')
  const at = raw.indexOf(`"date" : "${fromDate}"`)
  assert.notEqual(at, -1, `${shardFile} has no ${fromDate} records`)
  const start = raw.lastIndexOf('\t{\n', at)
  let inner = raw.slice(start, raw.lastIndexOf('\n]'))
  if (rewriteDates) {
    inner = inner.replace(/"date" : "(\d{4}-\d{2}-\d{2})"/g, (_m, d) => `"date" : "${rewriteDates(d)}"`)
  }
  const text = `[\n${inner}\n]\n`
  writeFileSync(exportPath, text)
  return JSON.parse(text)
}

const scratches = []
const newScratch = () => {
  const dir = scratchApiDir()
  scratches.push(dir)
  return dir
}

describe('API log merge', () => {
  let latestShard
  let latestDate

  before(() => {
    const shards = manifestOf(API_DIR).shards
    latestShard = shards[shards.length - 1]
    const rows = readJson(join(API_DIR, latestShard))
    latestDate = rows[rows.length - 1].date
  })

  after(() => {
    for (const dir of scratches) rmSync(dir, { recursive: true, force: true })
  })

  it('re-merging an export the log already contains is a no-op', () => {
    const dir = newScratch()
    const before = manifestOf(dir).shards.map((f) => readFileSync(join(dir, f), 'utf8'))

    // An export covering the last day already present — the usual overlap case,
    // just with identical content.
    const exportPath = join(dir, 'export.json')
    exportFrom(dir, latestShard, latestDate, exportPath)
    mergeApiLog({ apiDir: dir, exportPath })

    const after = manifestOf(dir).shards.map((f) => readFileSync(join(dir, f), 'utf8'))
    assert.deepEqual(after, before, 'shards changed when re-merging identical data')
  })

  it('replaces the overlapping partial day rather than duplicating it', () => {
    const dir = newScratch()
    const baseline = rowsOf(dir)
    const baselineOnLatest = baseline.filter((r) => r.date === latestDate).length
    assert.ok(baselineOnLatest > 0)

    // Export carries a *fuller* version of the last day: the same records twice.
    const exportPath = join(dir, 'export.json')
    const raw = readFileSync(join(dir, latestShard), 'utf8')
    const start = raw.lastIndexOf('\t{\n', raw.indexOf(`"date" : "${latestDate}"`))
    const inner = raw.slice(start, raw.lastIndexOf('\n]'))
    writeFileSync(exportPath, `[\n${inner},\n${inner}\n]\n`)

    mergeApiLog({ apiDir: dir, exportPath })

    const merged = rowsOf(dir)
    assert.equal(
      merged.filter((r) => r.date === latestDate).length,
      baselineOnLatest * 2,
      'overlapping day was not replaced by the export version',
    )
    // Nothing before the overlap may shift.
    assert.deepEqual(
      merged.filter((r) => r.date < latestDate),
      baseline.filter((r) => r.date < latestDate),
      'records before the overlap date changed',
    )
  })

  it('opens a new shard and manifest entry when the export crosses a quarter', () => {
    const dir = newScratch()
    const baseline = rowsOf(dir)
    const beforeShards = manifestOf(dir).shards

    // Re-date the last two days of the log to straddle 30 Sep / 1 Oct 2026.
    const distinct = [...new Set(baseline.map((r) => r.date))].sort()
    const [penultimate, last] = distinct.slice(-2)
    const remap = { [penultimate]: '2026-09-30', [last]: '2026-10-01' }

    const exportPath = join(dir, 'export.json')
    exportFrom(dir, latestShard, penultimate, exportPath, (d) => remap[d] ?? d)

    const { shards } = mergeApiLog({ apiDir: dir, exportPath })

    assert.ok(shards.includes('api-log-q4-26.json'), 'q4-26 shard was not created')
    assert.ok(existsSync(join(dir, 'api-log-q4-26.json')), 'q4-26 file was not written')
    assert.deepEqual(
      shards,
      [...beforeShards.filter((f) => f !== 'api-log-q4-26.json'), 'api-log-q4-26.json'],
      'manifest lost its chronological order after the rollover',
    )

    // Each side of the boundary landed in the right shard.
    for (const file of shards) {
      const expected = file.slice('api-log-'.length, -'.json'.length)
      for (const row of readJson(join(dir, file))) {
        assert.equal(quarterOf(row.date), expected, `${file} holds a ${row.date} record`)
      }
    }

    const merged = rowsOf(dir)
    assert.ok(merged.some((r) => r.date === '2026-09-30'), 'q3 side of the boundary is missing')
    assert.ok(merged.some((r) => r.date === '2026-10-01'), 'q4 side of the boundary is missing')
    assert.deepEqual(
      merged.filter((r) => r.date < penultimate),
      baseline.filter((r) => r.date < penultimate),
      'records before the overlap date changed',
    )
  })

  it('appends cleanly when the export does not overlap at all', () => {
    const dir = newScratch()
    const baseline = rowsOf(dir)

    const exportPath = join(dir, 'export.json')
    exportFrom(dir, latestShard, latestDate, exportPath, () => '2026-09-15')
    mergeApiLog({ apiDir: dir, exportPath })

    const merged = rowsOf(dir)
    assert.deepEqual(
      merged.slice(0, baseline.length),
      baseline,
      'a non-overlapping export disturbed the existing records',
    )
    assert.ok(merged.length > baseline.length, 'nothing was appended')
    assert.ok(merged.every((r, i) => i === 0 || r.date >= merged[i - 1].date), 'result is not date-sorted')
  })

  it('leaves the shards untouched when the export is unparseable', () => {
    const dir = newScratch()
    const before = manifestOf(dir).shards.map((f) => readFileSync(join(dir, f), 'utf8'))

    const exportPath = join(dir, 'broken.json')
    writeFileSync(exportPath, '[\n\t{ "date" : "2026-09-30"\n]\n')
    assert.throws(() => mergeApiLog({ apiDir: dir, exportPath }))

    const after = manifestOf(dir).shards.map((f) => readFileSync(join(dir, f), 'utf8'))
    assert.deepEqual(after, before, 'a failed merge modified the shards')
  })
})

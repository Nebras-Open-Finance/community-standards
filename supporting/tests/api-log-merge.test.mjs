// Exercises scripts/merge-api-log.mjs — the weekly "drop a fresh export in and
// merge it" workflow for the monthly API log shards.
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

import { mergeApiLog, monthOf } from '../../scripts/merge-api-log.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const API_DIR = join(ROOT, 'public', 'api')

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'))
const manifestOf = (dir) => readJson(join(dir, 'api-log-index.json'))
const rowsOf = (dir) =>
  manifestOf(dir).shards.flatMap((f) => readJson(join(dir, f)))

// The day after `date`, as an ISO date string.
const nextDay = (date) => {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}

// A fresh copy of the shards + manifest for one test to mutate.
function scratchApiDir() {
  const dir = mkdtempSync(join(tmpdir(), 'api-log-merge-'))
  mkdirSync(dir, { recursive: true })
  copyFileSync(join(API_DIR, 'api-log-index.json'), join(dir, 'api-log-index.json'))
  for (const file of manifestOf(API_DIR).shards) copyFileSync(join(API_DIR, file), join(dir, file))
  return dir
}

// Slice the records dated >= `fromDate` out of the shards, preserving their
// bytes, and write them out as a standalone export file. Reads across shards,
// so `fromDate` may sit in an earlier month than the log's last day.
function exportFrom(dir, fromDate, exportPath, rewriteDates) {
  const parts = []
  for (const file of manifestOf(dir).shards) {
    const month = file.slice('api-log-'.length, -'.json'.length)
    if (month < monthOf(fromDate)) continue
    const raw = readFileSync(join(dir, file), 'utf8')
    let start = raw.indexOf('\t{\n')
    if (month === monthOf(fromDate)) {
      const at = raw.indexOf(`"date" : "${fromDate}"`)
      assert.notEqual(at, -1, `${file} has no ${fromDate} records`)
      start = raw.lastIndexOf('\t{\n', at)
    }
    parts.push(raw.slice(start, raw.lastIndexOf('\n]')))
  }
  let inner = parts.join(',\n')
  if (rewriteDates) {
    inner = inner.replace(/"date" : "(\d{4}-\d{2}-\d{2})"/g, (_m, d) => `"date" : "${rewriteDates(d)}"`)
  }
  const text = `[\n${inner}\n]\n`
  writeFileSync(exportPath, text)
  return JSON.parse(text)
}

// Drop every record dated >= `date` from a shard, keeping the bytes before it.
function truncateFrom(dir, shardFile, date) {
  const path = join(dir, shardFile)
  const raw = readFileSync(path, 'utf8')
  const at = raw.indexOf(`"date" : "${date}"`)
  assert.notEqual(at, -1, `${shardFile} has no ${date} records`)
  writeFileSync(path, `${raw.slice(0, raw.lastIndexOf('\t{\n', at)).replace(/,\n$/, '')}\n]\n`)
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
    exportFrom(dir, latestDate, exportPath)
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

  it('opens a new shard and manifest entry when the export crosses a month', () => {
    const dir = newScratch()
    const baseline = rowsOf(dir)
    const beforeShards = manifestOf(dir).shards

    // Re-date the last two days of the log to straddle the end of its latest
    // month, so the export always rolls over into a month with no shard yet.
    const distinct = [...new Set(baseline.map((r) => r.date))].sort()
    const [penultimate, last] = distinct.slice(-2)
    // Day 0 of the next month (1-based month as a 0-based index) is this month's last day.
    const monthEnd = new Date(Date.UTC(
      Number(last.slice(0, 4)),
      Number(last.slice(5, 7)),
      0,
    )).toISOString().slice(0, 10)
    const monthStart = nextDay(monthEnd)
    const newShard = `api-log-${monthOf(monthStart)}.json`
    const remap = { [penultimate]: monthEnd, [last]: monthStart }

    const exportPath = join(dir, 'export.json')
    exportFrom(dir, penultimate, exportPath, (d) => remap[d] ?? d)

    const { shards } = mergeApiLog({ apiDir: dir, exportPath })

    assert.ok(!beforeShards.includes(newShard), `${newShard} already existed before the merge`)
    assert.ok(shards.includes(newShard), `${newShard} was not created`)
    assert.ok(existsSync(join(dir, newShard)), `${newShard} was not written`)
    assert.deepEqual(
      shards,
      [...beforeShards, newShard],
      'manifest lost its chronological order after the rollover',
    )

    // Each side of the boundary landed in the right shard.
    for (const file of shards) {
      const expected = file.slice('api-log-'.length, -'.json'.length)
      for (const row of readJson(join(dir, file))) {
        assert.equal(monthOf(row.date), expected, `${file} holds a ${row.date} record`)
      }
    }

    const merged = rowsOf(dir)
    assert.ok(merged.some((r) => r.date === monthEnd), 'old-month side of the boundary is missing')
    assert.ok(merged.some((r) => r.date === monthStart), 'new-month side of the boundary is missing')
    assert.deepEqual(
      merged.filter((r) => r.date < penultimate),
      baseline.filter((r) => r.date < penultimate),
      'records before the overlap date changed',
    )
  })

  it('appends cleanly when the export does not overlap at all', () => {
    const dir = newScratch()

    // The append case must stay inside one month — see the rollover test for
    // the other path. If the log happens to end on a month's last day, drop
    // that day from the scratch copy so the day after its end is still in the
    // same month.
    let end = latestDate
    if (monthOf(nextDay(end)) !== monthOf(end)) {
      truncateFrom(dir, latestShard, end)
      const rows = readJson(join(dir, latestShard))
      end = rows[rows.length - 1].date
    }
    const baseline = rowsOf(dir)

    // One day past the log's end, so every exported record is genuinely new.
    // Derived rather than fixed: a hard-coded date stops being "past the end"
    // as soon as the log grows into it, which silently turns this into the
    // overlap case it is meant to contrast with.
    const afterEnd = nextDay(end)
    assert.equal(monthOf(afterEnd), monthOf(end), 'the append case left the latest month')

    const exportPath = join(dir, 'export.json')
    exportFrom(dir, end, exportPath, () => afterEnd)
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

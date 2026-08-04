// Merge a fresh api-log export into the quarterly shards under public/api/.
//
//   node scripts/merge-api-log.mjs "public/api/api-log (8).json"
//
// Exports overlap the log's last (partial) day and extend forward, so the rule
// is replace-and-extend: drop every record at or after the export's first date,
// then append the export's records. An export that straddles a quarter boundary
// is split across the shards it touches, creating a new shard and manifest
// entry when a quarter rolls over.
//
// Everything is a textual splice. The export's bytes already match the shard
// format (tabs, `"key" : value`, `.0` floats, escaped `\/`), so no record is
// ever re-serialised and diffs stay confined to the tail of the shards touched.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const DEFAULT_API_DIR = join(ROOT, 'public', 'api')
const MANIFEST_FILE = 'api-log-index.json'

export const quarterOf = (date) =>
  `q${Math.floor((Number(date.slice(5, 7)) - 1) / 3) + 1}-${date.slice(2, 4)}`

// Chronological sort key: year first, then quarter (`q3-26` -> `26-3`).
const sortKey = (quarter) => `${quarter.slice(3)}-${quarter.slice(1, 2)}`
const shardFile = (quarter) => `api-log-${quarter}.json`
const quarterOfFile = (file) => file.slice('api-log-'.length, -'.json'.length)

// Byte offset of the record containing the first occurrence of `date`.
function recordStartAt(raw, date) {
  const at = raw.indexOf(`"date" : "${date}"`)
  if (at === -1) return -1
  const start = raw.lastIndexOf('\t{\n', at)
  if (start === -1) throw new Error(`could not locate record start for ${date}`)
  return start
}

// Split a pretty-printed log file into per-quarter blocks of record text.
export function quarterBlocks(raw, rows) {
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].date < rows[i - 1].date) throw new Error(`not date-sorted at row ${i}`)
  }
  const order = []
  const firstDate = new Map()
  for (const row of rows) {
    const q = quarterOf(row.date)
    if (order[order.length - 1] !== q) {
      if (order.includes(q)) throw new Error(`quarter ${q} is not contiguous`)
      order.push(q)
      firstDate.set(q, row.date)
    }
  }
  const cuts = order.map((q) => recordStartAt(raw, firstDate.get(q)))
  const end = raw.lastIndexOf('\n]')
  return order.map((q, i) => ({
    quarter: q,
    firstDate: firstDate.get(q),
    // Slices ending at the next record start trail a `,\n` separator.
    inner: raw.slice(cuts[i], i + 1 < cuts.length ? cuts[i + 1] : end).replace(/,\n$/, ''),
  }))
}

export function mergeApiLog({ apiDir = DEFAULT_API_DIR, exportPath }) {
  const expRaw = readFileSync(exportPath, 'utf8')
  const expRows = JSON.parse(expRaw)
  if (!expRows.length) throw new Error('export is empty')

  const manifestPath = join(apiDir, MANIFEST_FILE)
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const shards = new Set(manifest.shards)
  const summary = []

  for (const block of quarterBlocks(expRaw, expRows)) {
    const file = shardFile(block.quarter)
    const shardPath = join(apiDir, file)
    let text

    if (!shards.has(file) || !existsSync(shardPath)) {
      text = `[\n${block.inner}\n]\n`
      shards.add(file)
      summary.push(`${file}  NEW quarter, ${JSON.parse(text).length} record(s)`)
    } else {
      const shardRaw = readFileSync(shardPath, 'utf8')
      const cut = recordStartAt(shardRaw, block.firstDate)
      if (cut === -1) {
        // No overlap — the export starts after everything in this shard.
        text = `${shardRaw.slice(0, shardRaw.lastIndexOf('\n]'))},\n${block.inner}\n]\n`
        summary.push(`${file}  appended (no overlap)`)
      } else {
        const dropped = JSON.parse(shardRaw).filter((r) => r.date >= block.firstDate).length
        text = `${shardRaw.slice(0, cut)}${block.inner}\n]\n`
        summary.push(`${file}  replaced ${dropped} record(s) from ${block.firstDate}`)
      }
    }

    JSON.parse(text) // fail before writing rather than leave a broken shard
    writeFileSync(shardPath, text)
  }

  const ordered = [...shards].sort((a, b) =>
    sortKey(quarterOfFile(a)) < sortKey(quarterOfFile(b)) ? -1 : 1,
  )
  writeFileSync(manifestPath, `${JSON.stringify({ shards: ordered }, null, 2)}\n`)

  const rows = ordered.flatMap((f) => JSON.parse(readFileSync(join(apiDir, f), 'utf8')))
  const counts = {}
  for (const r of rows) counts[r.date] = (counts[r.date] ?? 0) + 1

  return { summary, shards: ordered, rows, counts }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('merge-api-log.mjs')) {
  const arg = process.argv[2]
  if (!arg) {
    console.error('usage: node scripts/merge-api-log.mjs <export.json>')
    process.exit(1)
  }
  const apiDir = process.env.API_LOG_DIR || DEFAULT_API_DIR
  // Accept either a full path or a filename sitting in the api directory.
  const exportPath = existsSync(arg) ? arg : join(apiDir, arg)
  const { summary, shards, rows, counts } = mergeApiLog({ apiDir, exportPath })

  for (const line of summary) console.log(line)
  console.log(`total ${rows.length} records across ${shards.length} shards`)
  const dates = Object.keys(counts).sort()
  console.log('last 10 days:', dates.slice(-10).map((d) => `${d}=${counts[d]}`).join(' '))
}

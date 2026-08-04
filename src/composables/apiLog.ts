// Single entry point for reading the API usage log.
//
// The log is sharded by quarter under `public/api/` — `api-log-index.json`
// lists the shards, oldest first. The committed shards are pretty-printed
// arrays of row objects (the shape fresh dashboard exports arrive in, so
// merging stays a textual splice); the deployed copies are dictionary-coded by
// `scripts/encode-api-log.mjs` to stay under Cloudflare Pages' 25 MiB per-file
// limit. `decode` handles both, so `npm run dev` reads the committed files
// directly and production reads the coded ones — yielding identical rows
// either way.
//
// Callers get one flat, date-ordered array, exactly as when the log was a
// single `/api/api-log.json`.

const MANIFEST_URL = '/api/api-log-index.json'

// Only the fields consumers actually read. External JSON may omit any of them,
// so every key is optional and callers narrow at the point of use.
export interface ApiLogRow {
  date?: string
  lfinamekey?: string
  tppname?: string
  httpmethod?: string
  url?: string
  tppresponsecodegroup?: string
  totalapicalls?: number
  executiontime?: number
}

interface EncodedShard {
  fields: string[]
  dicts: Record<string, unknown[]>
  rows: unknown[][]
}

interface Manifest {
  shards?: unknown
}

// Mirrors `decodeApiLog` in scripts/api-log-codec.mjs — this copy exists
// because src/ cannot import from scripts/. Exported so
// supporting/tests/api-log-shards.test.mjs can assert the two never drift.
export function decodeApiLogPayload(payload: unknown): ApiLogRow[] {
  if (Array.isArray(payload)) return payload as ApiLogRow[]

  const shard = payload as Partial<EncodedShard>
  if (!Array.isArray(shard?.rows) || !Array.isArray(shard?.fields)) return []

  const { fields, dicts, rows } = shard as EncodedShard
  return rows.map((tuple) => {
    const row: Record<string, unknown> = {}
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i] as string
      const dict = dicts?.[field]
      row[field] = dict ? dict[tuple[i] as number] : tuple[i]
    }
    return row as ApiLogRow
  })
}

// Module-level so several components on one page share a single network round
// trip. Cleared on failure so a transient error doesn't poison later attempts.
let inFlight: Promise<ApiLogRow[]> | null = null

async function fetchAll(): Promise<ApiLogRow[]> {
  const manifestRes = await fetch(MANIFEST_URL)
  if (!manifestRes.ok) throw new Error(`api-log manifest ${manifestRes.status}`)

  const manifest = (await manifestRes.json()) as Manifest
  const shards = Array.isArray(manifest.shards) ? (manifest.shards as string[]) : []
  if (!shards.length) throw new Error('api-log manifest lists no shards')

  const payloads = await Promise.all(
    shards.map(async (file) => {
      const res = await fetch(`/api/${file}`)
      if (!res.ok) throw new Error(`api-log shard ${file} ${res.status}`)
      return (await res.json()) as unknown
    }),
  )

  // Manifest order is chronological, so concatenation preserves the overall
  // date ordering the single-file log had.
  return payloads.flatMap(decodeApiLogPayload)
}

export function loadApiLog(): Promise<ApiLogRow[]> {
  if (!inFlight) {
    inFlight = fetchAll().catch((err: unknown) => {
      inFlight = null
      throw err
    })
  }
  return inFlight
}

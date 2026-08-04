// Dictionary codec for the API usage log shards.
//
// The committed shards under public/api/ are pretty-printed arrays of row
// objects — the shape fresh dashboard exports arrive in, so merging stays a
// readable textual splice. That shape is ~218 bytes/row, and Cloudflare Pages
// rejects any single file over 25 MiB, which the log crossed in Aug 2026.
//
// Every column except the two numeric measures has tiny cardinality (13 LFIs,
// 14 TPPs, 3 methods, ~70 URLs, 3 response-code groups), and the repeated key
// names alone account for roughly half the bytes. Replacing both with integer
// indices into per-field dictionaries shrinks the payload ~9x.
//
// `totalapicalls` and `executiontime` are carried through as raw numbers — NOT
// rounded — so every downstream figure (avgMs, p50/p95/p99, volume totals) is
// bit-identical to what the row objects produced.

export const CODEC_VERSION = 1

// Column order for the encoded tuples. Append-only: adding a field here is
// backwards-compatible because the decoder reads `fields` from the payload.
export const FIELDS = [
  'date',
  'lfinamekey',
  'tppname',
  'httpmethod',
  'url',
  'tppresponsecodegroup',
  'totalapicalls',
  'executiontime',
]

// Fields replaced by an index into a dictionary. The rest stay inline.
export const DICT_FIELDS = [
  'date',
  'lfinamekey',
  'tppname',
  'httpmethod',
  'url',
  'tppresponsecodegroup',
]

export function encodeApiLog(rows) {
  if (!Array.isArray(rows)) throw new TypeError('encodeApiLog expects an array of row objects')

  const dicts = {}
  const lookups = {}
  for (const field of DICT_FIELDS) {
    dicts[field] = []
    lookups[field] = new Map()
  }

  // `undefined` and `null` are distinct dictionary entries, so a row missing a
  // key decodes back to a missing-equivalent value rather than a silent ''.
  const indexOf = (field, value) => {
    const lookup = lookups[field]
    const hit = lookup.get(value)
    if (hit !== undefined) return hit
    const next = dicts[field].push(value === undefined ? null : value) - 1
    lookup.set(value, next)
    return next
  }

  const encoded = rows.map((row) =>
    FIELDS.map((field) => (lookups[field] ? indexOf(field, row[field]) : row[field] ?? null)),
  )

  return { v: CODEC_VERSION, fields: FIELDS, dicts, rows: encoded }
}

export function decodeApiLog(payload) {
  // Dev serves the committed shards verbatim, so an array is already decoded.
  if (Array.isArray(payload)) return payload
  if (!payload || !Array.isArray(payload.rows) || !Array.isArray(payload.fields)) {
    throw new TypeError('decodeApiLog expects an encoded api-log payload')
  }

  const { fields, dicts, rows } = payload
  return rows.map((tuple) => {
    const row = {}
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const dict = dicts?.[field]
      row[field] = dict ? dict[tuple[i]] : tuple[i]
    }
    return row
  })
}

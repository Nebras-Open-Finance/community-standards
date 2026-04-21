// Converts a parsed OpenAPI 3.x document into an XLSX workbook.
//
// Sheets produced, in order:
//   1. Info        — title, version, description, servers, contact, license
//   2. Endpoints   — one row per (path, method) operation
//   3. <SchemaN>   — one sheet per component schema, flattened as a data
//                    dictionary: Path | Field | Occurrence | Type | Format |
//                    Enum | Description
//
// Only internal $refs (#/components/schemas/...) are resolved. External refs
// are rendered as the ref string itself. Self-referential schemas are guarded
// with a visited-set so recursion terminates.

import * as XLSX from 'xlsx'

const ENDPOINT_HEADERS = [
  'Method', 'Path', 'Summary', 'OperationId', 'Tags', 'Security',
  'RequestSchema', 'ResponseSchemas', 'Description',
]
const SCHEMA_HEADERS = ['Path', 'Field', 'Occurrence', 'Type', 'Format', 'Enum', 'Description']
const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']

export function specToWorkbook(spec) {
  const wb = XLSX.utils.book_new()
  appendInfoSheet(wb, spec)
  appendEndpointsSheet(wb, spec)
  appendSchemaSheets(wb, spec)
  return wb
}

// ─── Info ──────────────────────────────────────────────────────────────────────

function appendInfoSheet(wb, spec) {
  const info = spec.info || {}
  const rows = [
    ['Field', 'Value'],
    ['Title', info.title || ''],
    ['Version', info.version || ''],
    ['OpenAPI', spec.openapi || spec.swagger || ''],
    ['Description', info.description || ''],
    ['Contact', formatContact(info.contact)],
    ['License', formatLicense(info.license)],
  ]
  const servers = Array.isArray(spec.servers) ? spec.servers : []
  servers.forEach((s, i) => {
    rows.push([`Server ${i + 1}`, s?.url || ''])
    if (s?.description) rows.push([`Server ${i + 1} description`, s.description])
  })

  const ws = XLSX.utils.aoa_to_sheet(rows)
  ws['!cols'] = [{ wch: 24 }, { wch: 80 }]
  XLSX.utils.book_append_sheet(wb, ws, 'Info')
}

function formatContact(contact) {
  if (!contact) return ''
  const parts = []
  if (contact.name) parts.push(contact.name)
  if (contact.email) parts.push(`<${contact.email}>`)
  if (contact.url) parts.push(contact.url)
  return parts.join(' ')
}

function formatLicense(license) {
  if (!license) return ''
  return license.url ? `${license.name || ''} (${license.url})` : (license.name || '')
}

// ─── Endpoints ─────────────────────────────────────────────────────────────────

function appendEndpointsSheet(wb, spec) {
  const rows = [ENDPOINT_HEADERS]
  const paths = spec.paths || {}

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue
    for (const method of METHODS) {
      const op = pathItem[method]
      if (!op) continue
      rows.push([
        method.toUpperCase(),
        path,
        op.summary || '',
        op.operationId || '',
        (op.tags || []).join(', '),
        formatSecurity(op.security),
        formatRequestSchema(op.requestBody),
        formatResponseSchemas(op.responses),
        op.description || '',
      ])
    }
  }

  const ws = XLSX.utils.aoa_to_sheet(rows)
  ws['!cols'] = [
    { wch: 8 }, { wch: 40 }, { wch: 40 }, { wch: 28 }, { wch: 20 },
    { wch: 22 }, { wch: 32 }, { wch: 40 }, { wch: 60 },
  ]
  XLSX.utils.book_append_sheet(wb, ws, 'Endpoints')
}

function formatSecurity(security) {
  if (!Array.isArray(security) || security.length === 0) return ''
  const names = new Set()
  for (const req of security) {
    if (req && typeof req === 'object') {
      for (const name of Object.keys(req)) names.add(name)
    }
  }
  return [...names].join(', ')
}

function formatRequestSchema(requestBody) {
  if (!requestBody || !requestBody.content) return ''
  const entries = Object.entries(requestBody.content)
  return entries.map(([mime, media]) => {
    const ref = extractSchemaRefName(media?.schema)
    return ref ? `${mime}: ${ref}` : mime
  }).join('; ')
}

function formatResponseSchemas(responses) {
  if (!responses) return ''
  const parts = []
  for (const [status, resp] of Object.entries(responses)) {
    if (!resp?.content) continue
    for (const [mime, media] of Object.entries(resp.content)) {
      const ref = extractSchemaRefName(media?.schema)
      parts.push(ref ? `${status} ${mime}: ${ref}` : `${status} ${mime}`)
    }
  }
  return parts.join('; ')
}

function extractSchemaRefName(schema) {
  if (!schema) return null
  if (schema.$ref) return refName(schema.$ref)
  if (schema.type === 'array' && schema.items?.$ref) return `array<${refName(schema.items.$ref)}>`
  return null
}

function refName(ref) {
  const m = /^#\/components\/schemas\/(.+)$/.exec(ref)
  return m ? m[1] : ref
}

// ─── Schemas ───────────────────────────────────────────────────────────────────

function appendSchemaSheets(wb, spec) {
  const schemas = spec.components?.schemas
  if (!schemas || typeof schemas !== 'object') return

  const usedNames = new Set(['Info', 'Endpoints'])

  for (const [name, schema] of Object.entries(schemas)) {
    const rows = [SCHEMA_HEADERS]
    flattenSchema(schema, '', rows, schemas, new Set(), false)

    const ws = XLSX.utils.aoa_to_sheet(rows)
    ws['!cols'] = [
      { wch: 40 }, { wch: 28 }, { wch: 12 }, { wch: 20 },
      { wch: 16 }, { wch: 40 }, { wch: 80 },
    ]
    XLSX.utils.book_append_sheet(wb, ws, uniqueSheetName(name, usedNames))
  }
}

// Recursively walks a schema and appends rows to `out`. Rows are arrays matching
// SCHEMA_HEADERS order. `path` is the dotted path so far. `visited` tracks
// component schema names already expanded on this branch so self/mutual recursion
// terminates.
function flattenSchema(schema, path, out, allSchemas, visited, requiredInParent) {
  if (!schema || typeof schema !== 'object') return

  // Resolve $ref against components.schemas; external refs render as the ref.
  if (schema.$ref) {
    const name = refName(schema.$ref)
    if (visited.has(name)) {
      pushRow(out, path, path ? leafName(path) : '', requiredInParent, `${name} (recursion)`, '', '', '')
      return
    }
    const target = allSchemas?.[name]
    if (!target) {
      pushRow(out, path, path ? leafName(path) : '', requiredInParent, name, '', '', `Unresolved $ref: ${schema.$ref}`)
      return
    }
    flattenSchema(target, path, out, allSchemas, new Set([...visited, name]), requiredInParent)
    return
  }

  // allOf: merge member properties/required into one view.
  if (Array.isArray(schema.allOf)) {
    const merged = mergeAllOf(schema.allOf, allSchemas, visited)
    flattenSchema({ ...schema, allOf: undefined, ...merged }, path, out, allSchemas, visited, requiredInParent)
    return
  }

  // oneOf / anyOf: flatten each branch under a bracketed discriminator prefix.
  const branches = schema.oneOf || schema.anyOf
  if (Array.isArray(branches) && branches.length > 0) {
    const label = schema.oneOf ? 'oneOf' : 'anyOf'
    branches.forEach((branch, i) => {
      const branchPath = path ? `${path} <${label}:${i + 1}>` : `<${label}:${i + 1}>`
      flattenSchema(branch, branchPath, out, allSchemas, visited, requiredInParent)
    })
    return
  }

  const type = inferType(schema)

  if (type === 'object' || schema.properties) {
    // Emit a row for the object itself unless it's the root of a sheet.
    if (path) {
      pushRow(out, path, leafName(path), requiredInParent, 'object', '', '', schema.description || '')
    }
    const required = new Set(Array.isArray(schema.required) ? schema.required : [])
    const props = schema.properties || {}
    for (const [field, child] of Object.entries(props)) {
      const childPath = path ? `${path}.${field}` : field
      flattenSchema(child, childPath, out, allSchemas, visited, required.has(field))
    }
    return
  }

  if (type === 'array') {
    const items = schema.items || {}
    const itemsType = inferType(items)
    if (items.$ref) {
      const name = refName(items.$ref)
      pushRow(out, path, path ? leafName(path) : '', requiredInParent, `array<${name}>`, schema.format || '', '', schema.description || '')
      if (visited.has(name)) return
      const target = allSchemas?.[name]
      if (target) {
        flattenSchema(target, `${path}[]`, out, allSchemas, new Set([...visited, name]), false)
      }
      return
    }
    if (itemsType === 'object' || items.properties) {
      pushRow(out, path, path ? leafName(path) : '', requiredInParent, 'array<object>', schema.format || '', '', schema.description || '')
      flattenSchema(items, `${path}[]`, out, allSchemas, visited, false)
      return
    }
    pushRow(out, path, path ? leafName(path) : '', requiredInParent, `array<${itemsType}>`, items.format || '', formatEnum(items.enum), schema.description || '')
    return
  }

  // Leaf primitive.
  pushRow(out, path, path ? leafName(path) : '', requiredInParent, type, schema.format || '', formatEnum(schema.enum), schema.description || '')
}

function mergeAllOf(members, allSchemas, visited) {
  const properties = {}
  const required = new Set()
  for (const member of members) {
    const resolved = member?.$ref
      ? (visited.has(refName(member.$ref)) ? null : allSchemas?.[refName(member.$ref)])
      : member
    if (!resolved || typeof resolved !== 'object') continue
    if (resolved.properties) Object.assign(properties, resolved.properties)
    if (Array.isArray(resolved.required)) resolved.required.forEach(r => required.add(r))
  }
  return { type: 'object', properties, required: [...required] }
}

function inferType(schema) {
  if (!schema) return ''
  if (Array.isArray(schema.type)) return schema.type.join('|')
  if (schema.type) return schema.type
  if (schema.properties) return 'object'
  if (schema.items) return 'array'
  return ''
}

function leafName(path) {
  const lastDot = path.lastIndexOf('.')
  return lastDot === -1 ? path : path.slice(lastDot + 1)
}

function formatEnum(values) {
  if (!Array.isArray(values) || values.length === 0) return ''
  return values.map(v => String(v)).join(', ')
}

function pushRow(out, path, field, required, type, format, enumStr, description) {
  out.push([
    path,
    field,
    required ? 'Mandatory' : 'Optional',
    type,
    format,
    enumStr,
    description,
  ])
}

// ─── Sheet name sanitisation ───────────────────────────────────────────────────
// Excel rules: max 31 chars, must not contain : \ / ? * [ ], must be unique.

const INVALID_SHEET_CHARS = /[:\\/?*\[\]]/g

export function sanitiseSheetName(name) {
  let cleaned = (name || '').replace(INVALID_SHEET_CHARS, '_').trim()
  if (!cleaned) cleaned = 'Sheet'
  if (cleaned.length > 31) cleaned = cleaned.slice(0, 31)
  return cleaned
}

export function uniqueSheetName(name, used) {
  const base = sanitiseSheetName(name)
  if (!used.has(base)) {
    used.add(base)
    return base
  }
  for (let i = 2; i < 1000; i++) {
    const suffix = `~${i}`
    const trimmed = base.slice(0, Math.max(1, 31 - suffix.length)) + suffix
    if (!used.has(trimmed)) {
      used.add(trimmed)
      return trimmed
    }
  }
  throw new Error(`Could not generate unique sheet name for "${name}"`)
}

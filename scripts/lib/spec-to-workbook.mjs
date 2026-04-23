// Converts a parsed OpenAPI 3.x document into an XLSX workbook.
//
// Sheets produced, in order:
//   1. Info        — title, version, description, servers, contact, license
//   2. Endpoints   — one row per (path, method) operation
//   3. <Endpoint>  — one sheet per operation, flattened as a data dictionary:
//                    Path | Field | Occurrence | Type | Format | Enum | Description
//
// Per-endpoint sheet rules:
//   - GET / DELETE / HEAD / OPTIONS → first 2xx success response body
//   - POST / PUT / PATCH             → request body
//   - Only application/json content is shown. If a body is JWT-only, the JWS
//     envelope (iss/exp/nbf/aud/iat + message) is unwrapped to the business
//     payload found under `message`.
//
// $ref resolution:
//   - #/components/schemas/...   — resolved and flattened
//   - #/components/responses/... — resolved before picking content
//   - External refs render as the ref string.
//   - Self-referential schemas terminate on a visited-set.

import * as XLSX from 'xlsx'

const ENDPOINT_HEADERS = [
  'Method', 'Path', 'Summary', 'OperationId', 'Tags', 'Security',
  'RequestSchema', 'ResponseSchemas', 'Description',
]
const SCHEMA_HEADERS = ['Path', 'Field', 'Occurrence', 'Type', 'Format', 'Enum', 'Description']
const METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace']
const REQUEST_BODY_METHODS = new Set(['post', 'put', 'patch'])

// Per-endpoint overrides for the default "POST/PUT/PATCH → request body,
// everything else → response body" rule. Keyed as `METHOD path`.
// - cop-query: POST-as-query — the request is a lookup payload and reviewers
//   care about the response data.
const PAYLOAD_OVERRIDES = {
  'POST /customers/action/cop-query': 'response',
}

const SCHEMA_COL_WIDTHS = [
  { wch: 40 }, { wch: 28 }, { wch: 12 }, { wch: 20 },
  { wch: 16 }, { wch: 40 }, { wch: 80 },
]

export function specToWorkbook(spec) {
  const wb = XLSX.utils.book_new()
  appendInfoSheet(wb, spec)
  appendEndpointsSheet(wb, spec)
  appendEndpointPayloadSheets(wb, spec)
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
  const responses = spec.components?.responses || {}

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
        formatResponseSchemas(op.responses, responses),
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

function formatResponseSchemas(responses, allResponses) {
  if (!responses) return ''
  const parts = []
  for (const [status, rawResp] of Object.entries(responses)) {
    const resp = resolveResponseRef(rawResp, allResponses)
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

// ─── Per-endpoint payload sheets ───────────────────────────────────────────────

function appendEndpointPayloadSheets(wb, spec) {
  const paths = spec.paths || {}
  const allSchemas = spec.components?.schemas || {}
  const allResponses = spec.components?.responses || {}
  const used = new Set(['Info', 'Endpoints'])

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') continue
    for (const method of METHODS) {
      const op = pathItem[method]
      if (!op) continue
      const { mode, schema, note } = selectPayloadSchema(op, method, path, allSchemas, allResponses)

      const rows = [SCHEMA_HEADERS]
      if (schema) {
        flattenSchema(schema, '', rows, allSchemas, new Set(), false)
      } else {
        rows.push(['', '', '', '', '', '', note || `No application/json ${mode} body.`])
      }

      const ws = XLSX.utils.aoa_to_sheet(rows)
      ws['!cols'] = SCHEMA_COL_WIDTHS
      XLSX.utils.book_append_sheet(wb, ws, uniqueSheetName(buildSheetName(method, path), used))
    }
  }
}

// Which schema drives the sheet for this operation.
// - request-body methods (POST/PUT/PATCH): the request body
// - everything else: first 2xx response with content
// PAYLOAD_OVERRIDES can flip the choice for specific endpoints.
// Only application/json is considered. JWT-only bodies are unwrapped to the
// `message` payload when the envelope matches RFC 7519 claims + message.
function selectPayloadSchema(op, method, path, allSchemas, allResponses) {
  const override = PAYLOAD_OVERRIDES[`${method.toUpperCase()} ${path}`]
  const useRequest = override
    ? override === 'request'
    : REQUEST_BODY_METHODS.has(method)

  if (useRequest) {
    const body = op.requestBody
    if (!body || !body.content) return { mode: 'request', schema: null, note: 'No request body defined.' }
    const schema = pickJsonSchema(body.content, allSchemas)
    return { mode: 'request', schema, note: schema ? null : 'Request body has no application/json or JWT-wrapped JSON payload.' }
  }
  const resp = pickFirstSuccessResponse(op.responses, allResponses)
  if (!resp) return { mode: 'response', schema: null, note: 'No 2xx response with content defined.' }
  const schema = pickJsonSchema(resp.content, allSchemas)
  return { mode: 'response', schema, note: schema ? null : 'Response has no application/json or JWT-wrapped JSON payload.' }
}

function pickFirstSuccessResponse(responses, allResponses) {
  if (!responses || typeof responses !== 'object') return null
  const successes = Object.keys(responses)
    .filter(k => /^2\d\d$/.test(k))
    .sort()
  for (const status of successes) {
    const resolved = resolveResponseRef(responses[status], allResponses)
    if (resolved?.content && Object.keys(resolved.content).length > 0) return resolved
  }
  return null
}

function resolveResponseRef(resp, allResponses) {
  if (!resp) return null
  if (!resp.$ref) return resp
  const m = /^#\/components\/responses\/(.+)$/.exec(resp.$ref)
  if (!m) return null
  return allResponses?.[m[1]] || null
}

// Returns a schema object to flatten, preferring application/json. If only a
// JWT content type exists, drill into the `message` property when the schema
// matches the RFC 7519 envelope; otherwise treat the schema as the direct
// JSON payload (JWT encoding applies at the transport layer, not the schema).
function pickJsonSchema(content, allSchemas) {
  if (!content || typeof content !== 'object') return null
  const keys = Object.keys(content)
  const jsonKey = keys.find(k => /^application\/json\b/i.test(k))
                || keys.find(k => /\bjson\b/i.test(k))
  if (jsonKey) return content[jsonKey].schema || null
  const jwtKey = keys.find(k => /\bjwt\b/i.test(k))
  if (!jwtKey) return null
  const jwtSchema = content[jwtKey].schema
  const unwrapped = unwrapJwtEnvelope(jwtSchema, allSchemas, new Set())
  return unwrapped || jwtSchema || null
}

// JWT envelope detection: find an object schema whose properties include
// `message`. Traverses $ref and allOf; returns the inner message schema, or
// null if the shape doesn't match.
function unwrapJwtEnvelope(schema, allSchemas, visited) {
  if (!schema || typeof schema !== 'object') return null
  if (schema.$ref) {
    const name = refName(schema.$ref)
    if (visited.has(name)) return null
    const target = allSchemas?.[name]
    if (!target) return null
    return unwrapJwtEnvelope(target, allSchemas, new Set([...visited, name]))
  }
  if (Array.isArray(schema.allOf)) {
    for (const member of schema.allOf) {
      const found = unwrapJwtEnvelope(member, allSchemas, visited)
      if (found) return found
    }
    return null
  }
  if (schema.properties?.message) return schema.properties.message
  return null
}

// Sheet name is always `METHOD path`, with the leading slash dropped so the
// sanitiser doesn't render it as a leading underscore. Remaining slashes still
// get sanitised to `_` because `/` is forbidden in Excel sheet names.
function buildSheetName(method, path) {
  const trimmed = String(path || '').replace(/^\/+/, '')
  return `${method.toUpperCase()} ${trimmed}`
}

// ─── Schema flattening ─────────────────────────────────────────────────────────

// Recursively walks a schema and appends rows to `out`. Rows are arrays matching
// SCHEMA_HEADERS order. `path` is the dotted path so far. `visited` tracks
// component schema names already expanded on this branch so self/mutual recursion
// terminates.
export function flattenSchema(schema, path, out, allSchemas, visited, requiredInParent) {
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

  // allOf: merge member properties/required into one view. When the schema
  // also declares its own `properties`/`required`, combine them — own props
  // take precedence over inherited ones with the same name.
  if (Array.isArray(schema.allOf)) {
    const merged = mergeAllOf(schema.allOf, allSchemas, visited)
    const properties = { ...merged.properties, ...(schema.properties || {}) }
    const requiredSet = new Set([
      ...(merged.required || []),
      ...(Array.isArray(schema.required) ? schema.required : []),
    ])
    flattenSchema(
      { ...schema, allOf: undefined, type: 'object', properties, required: [...requiredSet] },
      path, out, allSchemas, visited, requiredInParent,
    )
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

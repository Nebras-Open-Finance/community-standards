import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const COLLECTION_PATH = resolve(ROOT, 'public', 'postman', 'banking.postman_collection.json')
const FORM_PATH = resolve(ROOT, 'src', 'components', 'common', 'forms', 'TPPPostmanScriptBuilder.vue')

const POSTMAN_V21_SCHEMA = 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'

const SWAP_PLACEHOLDERS = [
  '{{_clientId}}',
  '{{auth-endpoint}}',
  '{{issuer}}',
  '{{rs}}',
  '{{kid-local}}',
  '{{pem-local}}',
  '{{redirectUrl}}',
  '{{par-endpoint}}',
  '{{tokenEndpoint}}',
]

function findItem(items, predicate) {
  for (const item of items ?? []) {
    if (predicate(item)) return item
    if (Array.isArray(item.item)) {
      const found = findItem(item.item, predicate)
      if (found) return found
    }
  }
  return null
}

describe('Fetched Postman collection (banking)', () => {
  it('fixture exists at public/postman/banking.postman_collection.json', () => {
    assert.ok(
      existsSync(COLLECTION_PATH),
      `Missing fixture: ${COLLECTION_PATH}. Run "npm run fetch:postman".`,
    )
  })

  if (!existsSync(COLLECTION_PATH)) return

  const raw = readFileSync(COLLECTION_PATH, 'utf-8')

  let doc = null
  let parseError = null
  try { doc = JSON.parse(raw) } catch (err) { parseError = err }

  it('parses as JSON', () => {
    assert.ok(!parseError, `JSON parse error: ${parseError?.message}`)
    assert.ok(doc && typeof doc === 'object', 'Parsed to non-object')
  })

  it('declares Postman v2.1 collection schema', () => {
    assert.equal(doc?.info?.schema, POSTMAN_V21_SCHEMA)
  })

  it('has a non-empty top-level item array', () => {
    assert.ok(Array.isArray(doc?.item), 'info.item must be an array')
    assert.ok(doc.item.length > 0, 'item array is empty')
  })

  it('contains the PAR request the form depends on', () => {
    // The form filters to "TPP Onboarding" + the version folder, then strips
    // some sub-folders. The key invariant is that the PAR request still
    // exists somewhere with its post-response script.
    const par = findItem(doc?.item, n => n.name === '4000: TPP-API Hub: POST to PAR end-point')
    assert.ok(par, 'Missing request "4000: TPP-API Hub: POST to PAR end-point"')

    const events = par.event ?? []
    const test = events.find(e => e.listen === 'test')
    assert.ok(test, 'PAR request is missing its post-response (test) script')

    const script = (test.script?.exec ?? []).join('\n')
    assert.match(
      script,
      /\.get\(["']_clientId["']\)/,
      'PAR post-response script no longer reads _clientId — form variable injection may be stale',
    )
    assert.match(
      script,
      /\.get\(['"]auth-endpoint['"]\)/,
      'PAR post-response script no longer reads auth-endpoint — form variable injection may be stale',
    )
  })

  it('contains every placeholder the form swaps', () => {
    for (const placeholder of SWAP_PLACEHOLDERS) {
      assert.ok(
        raw.includes(placeholder),
        `Source collection no longer contains ${placeholder}; the form's swap is dead code or the variable name has drifted.`,
      )
    }
  })
})

describe('TPPPostmanScriptBuilder.vue', () => {
  const form = readFileSync(FORM_PATH, 'utf-8')

  it('fetches the collection from the same origin (not raw.githubusercontent.com)', () => {
    assert.match(
      form,
      /['"]\/postman\/banking\.postman_collection\.json['"]/,
      'Form should fetch /postman/banking.postman_collection.json (same-origin).',
    )
    assert.doesNotMatch(
      form,
      /raw\.githubusercontent\.com\/Nebras-Open-Finance\/postman/,
      'Form must not fetch the collection directly from GitHub — corporate proxies block it.',
    )
  })

  it('does not strip the OIDC well-known request from the downloaded collection', () => {
    // The well-known request's post-response script sets `jwksUrl` (and the
    // other endpoints) at Postman runtime from the LFI's discovery doc.
    // Stripping it leaves `{{jwksUrl}}` unresolved in every encryption request.
    assert.doesNotMatch(
      form,
      /['"]TPP-API Hub: Get OIDC well-known end-point['"]/,
      'Form must not list the OIDC well-known request in foldersToRemove — it is needed to populate jwksUrl at runtime.',
    )
  })
})

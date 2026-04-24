import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import * as XLSX from 'xlsx'

import {
  specToWorkbook,
  sanitiseSheetName,
  uniqueSheetName,
} from '../../scripts/lib/spec-to-workbook.mjs'

// Read a sheet back as an array of arrays (aoa) from the workbook.
function aoa(wb, sheetName) {
  const ws = wb.Sheets[sheetName]
  assert.ok(ws, `Sheet "${sheetName}" not found; have: ${wb.SheetNames.join(', ')}`)
  return XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
}

function findRow(rows, header, matcher) {
  const headerRow = rows[0]
  const idx = headerRow.indexOf(header)
  if (idx === -1) throw new Error(`Column "${header}" not found in headers: ${headerRow.join(', ')}`)
  return rows.slice(1).find(r => matcher(r[idx]))
}

// Wraps a schema in a minimal one-endpoint spec so the per-endpoint flattening
// paths can be exercised as unit tests.
function specWithGet(responseSchema, extraSchemas = {}) {
  return {
    openapi: '3.0.3',
    info: { title: 'T', version: '1' },
    paths: {
      '/thing': {
        get: {
          operationId: 'getThing',
          responses: {
            '200': { content: { 'application/json': { schema: responseSchema } } },
          },
        },
      },
    },
    components: { schemas: extraSchemas },
  }
}

function specWithPost(requestSchema, extraSchemas = {}, { contentType = 'application/json' } = {}) {
  return {
    openapi: '3.0.3',
    info: { title: 'T', version: '1' },
    paths: {
      '/thing': {
        post: {
          operationId: 'createThing',
          requestBody: { content: { [contentType]: { schema: requestSchema } } },
          responses: { '201': { description: 'created' } },
        },
      },
    },
    components: { schemas: extraSchemas },
  }
}

describe('specToWorkbook', () => {
  describe('Info sheet', () => {
    const wb = specToWorkbook({
      openapi: '3.0.3',
      info: {
        title: 'Test API',
        version: '1.2.3',
        description: 'desc',
        contact: { name: 'Nebras', email: 'x@y.ae' },
      },
      servers: [{ url: 'https://a', description: 'prod' }, { url: 'https://b' }],
    })
    const rows = aoa(wb, 'Info')

    it('has a header row and captures title/version', () => {
      assert.deepEqual(rows[0], ['Field', 'Value'])
      assert.ok(rows.some(r => r[0] === 'Title' && r[1] === 'Test API'))
      assert.ok(rows.some(r => r[0] === 'Version' && r[1] === '1.2.3'))
    })

    it('lists all servers', () => {
      assert.ok(rows.some(r => r[0] === 'Server 1' && r[1] === 'https://a'))
      assert.ok(rows.some(r => r[0] === 'Server 2' && r[1] === 'https://b'))
      assert.ok(rows.some(r => r[0] === 'Server 1 description' && r[1] === 'prod'))
    })
  })

  describe('Endpoints sheet', () => {
    const wb = specToWorkbook({
      openapi: '3.0.3',
      info: { title: 'T', version: '1' },
      paths: {
        '/accounts': {
          get: {
            summary: 'List accounts',
            operationId: 'listAccounts',
            tags: ['Accounts'],
            security: [{ bearerAuth: [] }],
            responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/AccountList' } } } } },
          },
          post: {
            summary: 'Create account',
            operationId: 'createAccount',
            requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Account' } } } },
            responses: { '201': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Account' } } } } },
          },
        },
        '/x-ignored': { parameters: [] }, // no methods — must not produce a row
      },
      components: { schemas: { AccountList: { type: 'object' }, Account: { type: 'object' } } },
    })
    const rows = aoa(wb, 'Endpoints')

    it('has a row per method, skipping path-items with no operations', () => {
      assert.equal(rows.length, 3)
    })

    it('captures method, path, summary, tags, security, and schema refs', () => {
      const getRow = findRow(rows, 'Method', v => v === 'GET')
      assert.equal(getRow[1], '/accounts')
      assert.equal(getRow[2], 'List accounts')
      assert.equal(getRow[3], 'listAccounts')
      assert.equal(getRow[4], 'Accounts')
      assert.equal(getRow[5], 'bearerAuth')
      assert.match(getRow[7], /200 application\/json: AccountList/)

      const postRow = findRow(rows, 'Method', v => v === 'POST')
      assert.match(postRow[6], /application\/json: Account/)
      assert.match(postRow[7], /201 application\/json: Account/)
    })

    it('resolves response $ref to components.responses when listing schemas', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/x': {
            get: {
              operationId: 'getX',
              responses: { '200': { $ref: '#/components/responses/OkX' } },
            },
          },
        },
        components: {
          schemas: { X: { type: 'object' } },
          responses: {
            OkX: { content: { 'application/json': { schema: { $ref: '#/components/schemas/X' } } } },
          },
        },
      }
      const rowsX = aoa(specToWorkbook(spec), 'Endpoints')
      const r = findRow(rowsX, 'Method', v => v === 'GET')
      assert.match(r[7], /200 application\/json: X/)
    })
  })

  describe('Per-endpoint payload sheets — sheet selection', () => {
    it('creates Info + Endpoints + one sheet per operation, named by endpoint', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/a': { get: { operationId: 'getA', responses: { '200': { content: { 'application/json': { schema: { type: 'object', properties: { x: { type: 'string' } } } } } } } } },
          '/b': { post: { operationId: 'postB', requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { y: { type: 'string' } } } } } }, responses: { '201': { description: '' } } } },
        },
        components: { schemas: {} },
      }
      const wb = specToWorkbook(spec)
      assert.deepEqual(wb.SheetNames, ['Info', 'Endpoints', 'GET a', 'POST b'])
    })

    it('GET uses the first 2xx response body and ignores error statuses', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing': {
            get: {
              operationId: 'getThing',
              responses: {
                '400': { content: { 'application/json': { schema: { type: 'object', properties: { errorField: { type: 'string' } } } } } },
                '200': { content: { 'application/json': { schema: { type: 'object', properties: { okField: { type: 'string' } } } } } },
              },
            },
          },
        },
        components: { schemas: {} },
      }
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 'okField'), 'should have 200 field')
      assert.ok(!findRow(rows, 'Path', v => v === 'errorField'), 'should not show error body')
    })

    it('POST uses the request body, not the response', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing': {
            post: {
              operationId: 'postThing',
              requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { req: { type: 'string' } } } } } },
              responses: { '201': { content: { 'application/json': { schema: { type: 'object', properties: { resp: { type: 'string' } } } } } } },
            },
          },
        },
        components: { schemas: {} },
      }
      const rows = aoa(specToWorkbook(spec), 'POST thing')
      assert.ok(findRow(rows, 'Path', v => v === 'req'))
      assert.ok(!findRow(rows, 'Path', v => v === 'resp'))
    })

    it('PATCH uses the request body (like POST)', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing/{id}': {
            patch: {
              operationId: 'patchThing',
              requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { delta: { type: 'string' } } } } } },
              responses: { '200': { description: '' } },
            },
          },
        },
        components: { schemas: {} },
      }
      const rows = aoa(specToWorkbook(spec), 'PATCH thing_{id}')
      assert.ok(findRow(rows, 'Path', v => v === 'delta'))
    })

    it('resolves response $ref to components.responses before picking content', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing': {
            get: {
              operationId: 'getThing',
              responses: { '200': { $ref: '#/components/responses/OkThing' } },
            },
          },
        },
        components: {
          schemas: { Thing: { type: 'object', properties: { t: { type: 'string' } } } },
          responses: { OkThing: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Thing' } } } } },
        },
      }
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 't'))
    })

    it('honours PAYLOAD_OVERRIDES for cop-query: POST shows the response body', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/customers/action/cop-query': {
            post: {
              operationId: 'findCustomerForCop',
              requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { queryField: { type: 'string' } } } } } },
              responses: { '200': { content: { 'application/json': { schema: { type: 'object', properties: { customerField: { type: 'string' } } } } } } },
            },
          },
        },
        components: { schemas: {} },
      }
      const wb = specToWorkbook(spec)
      const sheetName = wb.SheetNames.find(n => n.startsWith('POST customers_action'))
      const rows = aoa(wb, sheetName)
      assert.ok(findRow(rows, 'Path', v => v === 'customerField'), 'response field should be present')
      assert.ok(!findRow(rows, 'Path', v => v === 'queryField'), 'request field should be hidden by override')
    })

    it('emits a note row when no 2xx response has content', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing': {
            get: {
              operationId: 'getThing',
              responses: { '204': { description: 'No Content' } },
            },
          },
        },
        components: { schemas: {} },
      }
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      // header + one note row
      assert.equal(rows.length, 2)
      assert.match(rows[1][6], /No 2xx response/i)
    })
  })

  describe('JWT envelope unwrapping', () => {
    const jwtClaims = {
      iss: { type: 'string' }, exp: { type: 'number' }, nbf: { type: 'number' },
      aud: { type: 'string' }, iat: { type: 'number' },
    }

    it('unwraps JWT-only request bodies via the `message` property (inline envelope)', () => {
      const inlineSigned = {
        type: 'object',
        required: ['iss', 'exp', 'nbf', 'message'],
        properties: { ...jwtClaims, message: { $ref: '#/components/schemas/Payment' } },
      }
      const spec = specWithPost(inlineSigned, {
        Payment: { type: 'object', required: ['amount'], properties: { amount: { type: 'string' }, currency: { type: 'string' } } },
      }, { contentType: 'application/jwt' })
      const rows = aoa(specToWorkbook(spec), 'POST thing')
      assert.ok(findRow(rows, 'Path', v => v === 'amount'), 'unwrapped business field missing')
      assert.ok(findRow(rows, 'Path', v => v === 'currency'))
      assert.ok(!findRow(rows, 'Path', v => v === 'iss'), 'JWT claim should not appear in unwrapped output')
    })

    it('unwraps allOf-style envelopes (AEJwt + { message })', () => {
      const spec = specWithPost(
        { $ref: '#/components/schemas/PaymentSigned' },
        {
          AEJwt: { type: 'object', properties: jwtClaims },
          PaymentSigned: {
            allOf: [
              { $ref: '#/components/schemas/AEJwt' },
              { type: 'object', required: ['message'], properties: { message: { $ref: '#/components/schemas/Payment' } } },
            ],
          },
          Payment: { type: 'object', properties: { amount: { type: 'string' } } },
        },
        { contentType: 'application/jwt' },
      )
      const rows = aoa(specToWorkbook(spec), 'POST thing')
      assert.ok(findRow(rows, 'Path', v => v === 'amount'))
      assert.ok(!findRow(rows, 'Path', v => v === 'iss'))
    })

    it('prefers application/json over application/jwt when both are offered', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing': {
            get: {
              operationId: 'getThing',
              responses: {
                '200': {
                  content: {
                    'application/json': { schema: { type: 'object', properties: { jsonField: { type: 'string' } } } },
                    'application/jwt': { schema: { type: 'object', properties: { iss: { type: 'string' }, message: { type: 'object', properties: { jwtField: { type: 'string' } } } } } },
                  },
                },
              },
            },
          },
        },
        components: { schemas: {} },
      }
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 'jsonField'))
      assert.ok(!findRow(rows, 'Path', v => v === 'jwtField'))
    })

    it('falls back to the JWT schema itself when it is not envelope-shaped', () => {
      // Some specs serve a direct business payload under application/jwt (no
      // `message` wrapper). The schema itself is already the JSON payload.
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing': {
            get: {
              operationId: 'getThing',
              responses: {
                '200': { content: { 'application/jwt': { schema: { type: 'object', properties: { Data: { type: 'object' }, Links: { type: 'string' } } } } } },
              },
            },
          },
        },
        components: { schemas: {} },
      }
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 'Data'))
      assert.ok(findRow(rows, 'Path', v => v === 'Links'))
    })

    it('handles `application/json; charset=utf-8` mime variants', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/thing': {
            get: {
              operationId: 'getThing',
              responses: {
                '200': { content: { 'application/json; charset=utf-8': { schema: { type: 'object', properties: { f: { type: 'string' } } } } } },
              },
            },
          },
        },
        components: { schemas: {} },
      }
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 'f'))
    })
  })

  describe('Schema flattening (via endpoint sheets)', () => {
    it('flattens a flat object with required/optional markings', () => {
      const spec = specWithGet({
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', description: 'identifier' },
          count: { type: 'integer', format: 'int32' },
          status: { type: 'string', enum: ['active', 'closed'] },
        },
      })
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.deepEqual(rows[0], ['Path', 'Field', 'Occurrence', 'Type', 'Format', 'Enum', 'Description'])
      const idRow = findRow(rows, 'Path', v => v === 'id')
      assert.equal(idRow[2], 'Mandatory')
      assert.equal(idRow[3], 'string')
      assert.equal(idRow[6], 'identifier')
      const countRow = findRow(rows, 'Path', v => v === 'count')
      assert.equal(countRow[2], 'Optional')
      assert.equal(countRow[4], 'int32')
      const statusRow = findRow(rows, 'Path', v => v === 'status')
      assert.equal(statusRow[5], 'active, closed')
    })

    it('uses dotted paths for nested objects', () => {
      const spec = specWithGet({
        type: 'object',
        properties: {
          outer: {
            type: 'object',
            required: ['inner'],
            properties: { inner: { type: 'string' } },
          },
        },
      })
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 'outer'))
      const innerRow = findRow(rows, 'Path', v => v === 'outer.inner')
      assert.ok(innerRow, 'nested inner row missing')
      assert.equal(innerRow[2], 'Mandatory')
    })

    it('marks arrays and descends into array-of-object items with []', () => {
      const spec = specWithGet({
        type: 'object',
        properties: {
          tags: { type: 'array', items: { type: 'string' } },
          accounts: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id'],
              properties: { id: { type: 'string' }, balance: { type: 'number' } },
            },
          },
        },
      })
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      const tagsRow = findRow(rows, 'Path', v => v === 'tags')
      assert.equal(tagsRow[3], 'array<string>')
      const accountsRow = findRow(rows, 'Path', v => v === 'accounts')
      assert.equal(accountsRow[3], 'array<object>')
      const arrIdRow = findRow(rows, 'Path', v => v === 'accounts[].id')
      assert.ok(arrIdRow, 'array item field missing')
      assert.equal(arrIdRow[2], 'Mandatory')
    })

    it('resolves $ref to a component schema', () => {
      const spec = specWithGet(
        { $ref: '#/components/schemas/Wrapper' },
        {
          Wrapper: { type: 'object', properties: { item: { $ref: '#/components/schemas/Flat' } } },
          Flat: {
            type: 'object',
            required: ['id'],
            properties: { id: { type: 'string' }, count: { type: 'integer' } },
          },
        },
      )
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 'item'))
      assert.ok(findRow(rows, 'Path', v => v === 'item.id'))
      assert.ok(findRow(rows, 'Path', v => v === 'item.count'))
    })

    it('terminates on self-referential schemas', () => {
      const spec = specWithGet(
        { $ref: '#/components/schemas/Node' },
        {
          Node: {
            type: 'object',
            required: ['value'],
            properties: { value: { type: 'string' }, next: { $ref: '#/components/schemas/Node' } },
          },
        },
      )
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(rows.some(r => String(r[3]).includes('recursion')))
      assert.ok(rows.length < 20)
    })
  })

  describe('allOf, oneOf, anyOf', () => {
    it('merges allOf members into a single flat view', () => {
      const spec = specWithGet(
        { $ref: '#/components/schemas/Merged' },
        {
          Base: { type: 'object', required: ['a'], properties: { a: { type: 'string' } } },
          Merged: {
            allOf: [
              { $ref: '#/components/schemas/Base' },
              { type: 'object', required: ['b'], properties: { b: { type: 'integer' } } },
            ],
          },
        },
      )
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      const aRow = findRow(rows, 'Path', v => v === 'a')
      const bRow = findRow(rows, 'Path', v => v === 'b')
      assert.ok(aRow, 'allOf member "a" missing')
      assert.ok(bRow, 'allOf member "b" missing')
      assert.equal(aRow[2], 'Mandatory')
      assert.equal(bRow[2], 'Mandatory')
    })

    it('combines a schemas own properties with its allOf-inherited properties', () => {
      // Regression: a schema with both `properties` and `allOf` must keep both.
      const spec = specWithGet(
        { $ref: '#/components/schemas/ConsentData' },
        {
          Base: { type: 'object', required: ['BaseField'], properties: { BaseField: { type: 'string' } } },
          ConsentData: {
            type: 'object',
            required: ['ConsentId', 'Permissions'],
            properties: {
              ConsentId: { type: 'string' },
              Permissions: { type: 'array', items: { type: 'string', enum: ['ReadAccountsBasic'] } },
            },
            allOf: [{ $ref: '#/components/schemas/Base' }],
          },
        },
      )
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(findRow(rows, 'Path', v => v === 'ConsentId'), 'own property ConsentId should be present')
      assert.ok(findRow(rows, 'Path', v => v === 'Permissions'), 'own property Permissions should be present')
      assert.ok(findRow(rows, 'Path', v => v === 'BaseField'), 'allOf-inherited BaseField should be present')
      const permsRow = findRow(rows, 'Path', v => v === 'Permissions')
      assert.equal(permsRow[3], 'array<string>')
      assert.equal(permsRow[5], 'ReadAccountsBasic')
    })

    it('flattens oneOf branches under labelled prefixes', () => {
      const spec = specWithGet({
        oneOf: [
          { type: 'object', properties: { kind: { type: 'string' } } },
          { type: 'object', properties: { other: { type: 'boolean' } } },
        ],
      })
      const rows = aoa(specToWorkbook(spec), 'GET thing')
      assert.ok(rows.some(r => String(r[0]).includes('<oneOf:1>') && String(r[1]) === 'kind'))
      assert.ok(rows.some(r => String(r[0]).includes('<oneOf:2>') && String(r[1]) === 'other'))
    })
  })

  describe('Endpoint sheet naming', () => {
    it('names sheets by METHOD path with the leading slash stripped, ignoring operationId', () => {
      const spec = specWithGet({ type: 'object', properties: { x: { type: 'string' } } })
      const wb = specToWorkbook(spec)
      // operationId is 'getThing' on /thing — the sheet name must come from the endpoint.
      assert.ok(wb.SheetNames.includes('GET thing'))
      assert.ok(!wb.SheetNames.includes('getThing'))
    })

    it('sanitises remaining slashes and truncates paths longer than 31 chars', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/accounts/{AccountId}/transactions': {
            get: { responses: { '200': { content: { 'application/json': { schema: { type: 'object', properties: { x: { type: 'string' } } } } } } } },
          },
        },
        components: { schemas: {} },
      }
      const wb = specToWorkbook(spec)
      const endpointSheet = wb.SheetNames[2]
      assert.equal(endpointSheet.length, 31)
      assert.ok(endpointSheet.startsWith('GET accounts_{AccountId}'), `got ${endpointSheet}`)
    })

    it('dedupes when two long paths collide after truncation', () => {
      const spec = {
        openapi: '3.0.3',
        info: { title: 'T', version: '1' },
        paths: {
          '/a/b/c/d/e/f/g/h/i/j/{Id}/thing': {
            get: { responses: { '200': { content: { 'application/json': { schema: { type: 'object' } } } } } },
            post: { requestBody: { content: { 'application/json': { schema: { type: 'object' } } } }, responses: { '201': {} } },
          },
        },
        components: { schemas: {} },
      }
      const wb = specToWorkbook(spec)
      assert.ok(wb.SheetNames[2].startsWith('GET '))
      assert.ok(wb.SheetNames[3].startsWith('POST'))
      assert.notEqual(wb.SheetNames[2], wb.SheetNames[3])
    })
  })
})

describe('sheet name helpers', () => {
  it('sanitiseSheetName replaces invalid chars and caps at 31', () => {
    assert.equal(sanitiseSheetName('a:b/c\\d?e*f[g]h'), 'a_b_c_d_e_f_g_h')
    const long = 'x'.repeat(50)
    assert.equal(sanitiseSheetName(long).length, 31)
    assert.equal(sanitiseSheetName(''), 'Sheet')
  })

  it('uniqueSheetName dedupes with ~N suffix', () => {
    const used = new Set()
    assert.equal(uniqueSheetName('Account', used), 'Account')
    assert.equal(uniqueSheetName('Account', used), 'Account~2')
    assert.equal(uniqueSheetName('Account', used), 'Account~3')
  })

  it('uniqueSheetName keeps the suffixed name within 31 chars', () => {
    const used = new Set()
    const long = 'x'.repeat(31)
    const first = uniqueSheetName(long, used)
    assert.equal(first.length, 31)
    const second = uniqueSheetName(long, used)
    assert.ok(second.length <= 31, `got ${second.length}`)
    assert.ok(second.endsWith('~2'))
  })
})

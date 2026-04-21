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
            requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Account' } } } },
            responses: { '201': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Account' } } } } },
          },
        },
        '/x-ignored': { parameters: [] }, // no methods — must not produce a row
      },
      components: { schemas: {} },
    })
    const rows = aoa(wb, 'Endpoints')

    it('has a row per method, skipping path-items with no operations', () => {
      // header + 2 rows for GET /accounts and POST /accounts
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
  })

  describe('Schema flattening', () => {
    const spec = {
      openapi: '3.0.3',
      info: { title: 'T', version: '1' },
      paths: {},
      components: {
        schemas: {
          Flat: {
            type: 'object',
            required: ['id'],
            properties: {
              id: { type: 'string', description: 'identifier' },
              count: { type: 'integer', format: 'int32' },
              status: { type: 'string', enum: ['active', 'closed'] },
            },
          },
          Nested: {
            type: 'object',
            properties: {
              outer: {
                type: 'object',
                required: ['inner'],
                properties: { inner: { type: 'string' } },
              },
            },
          },
          WithArray: {
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
          },
          Node: {
            type: 'object',
            required: ['value'],
            properties: {
              value: { type: 'string' },
              next: { $ref: '#/components/schemas/Node' },
            },
          },
          Wrapper: {
            type: 'object',
            properties: { item: { $ref: '#/components/schemas/Flat' } },
          },
          'Weird:Name/That*Long[Enough]ToBeTruncatedForExcel': {
            type: 'object',
            properties: { x: { type: 'string' } },
          },
        },
      },
    }
    const wb = specToWorkbook(spec)

    it('creates one sheet per component schema', () => {
      const expected = Object.keys(spec.components.schemas).length
      // Info + Endpoints + N schema sheets
      assert.equal(wb.SheetNames.length, expected + 2)
    })

    it('flattens a flat object with required/optional markings', () => {
      const rows = aoa(wb, 'Flat')
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
      const rows = aoa(wb, 'Nested')
      assert.ok(findRow(rows, 'Path', v => v === 'outer'))
      const innerRow = findRow(rows, 'Path', v => v === 'outer.inner')
      assert.ok(innerRow, 'nested inner row missing')
      assert.equal(innerRow[2], 'Mandatory')
    })

    it('marks arrays and descends into array-of-object items with []', () => {
      const rows = aoa(wb, 'WithArray')
      const tagsRow = findRow(rows, 'Path', v => v === 'tags')
      assert.equal(tagsRow[3], 'array<string>')
      const accountsRow = findRow(rows, 'Path', v => v === 'accounts')
      assert.equal(accountsRow[3], 'array<object>')
      const arrIdRow = findRow(rows, 'Path', v => v === 'accounts[].id')
      assert.ok(arrIdRow, 'array item field missing')
      assert.equal(arrIdRow[2], 'Mandatory')
    })

    it('resolves $ref to another component schema', () => {
      const rows = aoa(wb, 'Wrapper')
      // item should appear, plus the Flat schema fields nested under item.
      assert.ok(findRow(rows, 'Path', v => v === 'item'))
      assert.ok(findRow(rows, 'Path', v => v === 'item.id'))
      assert.ok(findRow(rows, 'Path', v => v === 'item.count'))
    })

    it('terminates on self-referential schemas', () => {
      const rows = aoa(wb, 'Node')
      // Should contain the recursion marker rather than blowing the stack.
      assert.ok(rows.some(r => String(r[3]).includes('recursion')))
      // Still has a finite number of rows.
      assert.ok(rows.length < 20)
    })

    it('sanitises invalid sheet-name characters and truncates to 31 chars', () => {
      const long = 'Weird:Name/That*Long[Enough]ToBeTruncatedForExcel'
      const foundName = wb.SheetNames.find(n => n.startsWith('Weird_Name_That_Long_Enough_'))
      assert.ok(foundName, `expected sanitised sheet name, got: ${wb.SheetNames.join(', ')}`)
      assert.ok(foundName.length <= 31)
      assert.doesNotMatch(foundName, /[:\\/?*\[\]]/)
    })
  })

  describe('allOf, oneOf, anyOf', () => {
    const spec = {
      openapi: '3.0.3',
      info: { title: 'T', version: '1' },
      paths: {},
      components: {
        schemas: {
          Base: { type: 'object', required: ['a'], properties: { a: { type: 'string' } } },
          Merged: {
            allOf: [
              { $ref: '#/components/schemas/Base' },
              { type: 'object', required: ['b'], properties: { b: { type: 'integer' } } },
            ],
          },
          Alternatives: {
            oneOf: [
              { type: 'object', properties: { kind: { type: 'string' } } },
              { type: 'object', properties: { other: { type: 'boolean' } } },
            ],
          },
        },
      },
    }
    const wb = specToWorkbook(spec)

    it('merges allOf members into a single flat view', () => {
      const rows = aoa(wb, 'Merged')
      const aRow = findRow(rows, 'Path', v => v === 'a')
      const bRow = findRow(rows, 'Path', v => v === 'b')
      assert.ok(aRow, 'allOf member "a" missing')
      assert.ok(bRow, 'allOf member "b" missing')
      assert.equal(aRow[2], 'Mandatory')
      assert.equal(bRow[2], 'Mandatory')
    })

    it('flattens oneOf branches under labelled prefixes', () => {
      const rows = aoa(wb, 'Alternatives')
      assert.ok(rows.some(r => String(r[0]).includes('<oneOf:1>') && String(r[1]) === 'kind'))
      assert.ok(rows.some(r => String(r[0]).includes('<oneOf:2>') && String(r[1]) === 'other'))
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

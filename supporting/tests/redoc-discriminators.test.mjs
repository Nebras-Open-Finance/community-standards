// Redoc 2.x renders a discriminated schema by handing the selected branch to
// its object renderer, which shows only that branch's own `properties`. When a
// branch is itself a `oneOf` — as every rail is in v2.2 CbuaePatchPaymentRecordBody
// — the request body renders empty. RedocWrapper drops such discriminators at
// render time (src/utils/redocCompat.ts); these tests pin that behaviour.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { parse as parseYaml } from 'yaml'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'
import { ROOT_DIR } from './_helpers/resolve-site-link.mjs'

let dropUnrenderableDiscriminators
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { dropUnrenderableDiscriminators } from ${JSON.stringify(join(ROOT_DIR, 'src', 'utils', 'redocCompat.ts'))}
  `)
  dropUnrenderableDiscriminators = a.mod.dropUnrenderableDiscriminators
  dispose = a.dispose
})

after(() => dispose?.())

const ref = name => ({ $ref: `#/components/schemas/${name}` })

describe('dropUnrenderableDiscriminators', () => {
  it('drops a discriminator whose branch is itself a oneOf, keeping the oneOf', () => {
    const schemas = {
      Body: {
        description: 'kept',
        oneOf: [ref('A'), ref('B')],
        discriminator: { propertyName: 'rail', mapping: { A: '#/components/schemas/A', B: '#/components/schemas/B' } },
      },
      A: { oneOf: [ref('A1'), ref('A2')] },
      A1: { type: 'object', properties: { rail: { type: 'string' } } },
      A2: { type: 'object', properties: { rail: { type: 'string' } } },
      B: { type: 'object', properties: { rail: { type: 'string' } } },
    }
    assert.deepEqual(dropUnrenderableDiscriminators(schemas), ['Body'])
    assert.equal(schemas.Body.discriminator, undefined)
    assert.deepEqual(schemas.Body.oneOf, [ref('A'), ref('B')])
    assert.equal(schemas.Body.description, 'kept')
  })

  it('leaves a discriminator alone when every branch has its own properties or allOf', () => {
    const discriminator = { propertyName: 'kind' }
    const schemas = {
      Body: { oneOf: [ref('A'), ref('B')], discriminator },
      A: { type: 'object', properties: { kind: { type: 'string' } } },
      B: { allOf: [ref('A'), { type: 'object', properties: { extra: { type: 'string' } } }] },
    }
    assert.deepEqual(dropUnrenderableDiscriminators(schemas), [])
    assert.equal(schemas.Body.discriminator, discriminator)
  })

  it('tolerates a missing schemas map', () => {
    assert.deepEqual(dropUnrenderableDiscriminators(undefined), [])
  })

  it('makes v2.2-rc2 PATCH /payment-log/{id} renderable', () => {
    const file = resolve(ROOT_DIR, 'public/openapi/v2.2-rc2/api-hub/uae-api-hub-consent-manager-openapi.yaml')
    assert.ok(existsSync(file), `${file} is missing — run \`npm run fetch:specs\``)
    const schemas = parseYaml(readFileSync(file, 'utf8')).components.schemas
    if (schemas.CbuaePatchPaymentRecordBody?.discriminator === undefined) return

    assert.ok(dropUnrenderableDiscriminators(schemas).includes('CbuaePatchPaymentRecordBody'))
    assert.equal(schemas.CbuaePatchPaymentRecordBody.discriminator, undefined)
    assert.ok(Array.isArray(schemas.CbuaePatchPaymentRecordBody.oneOf))
  })
})

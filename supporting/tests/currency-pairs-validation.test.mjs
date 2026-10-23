// Validation for the supported-currency-pairs Jira form
// (src/components/common/jira-forms/currencyPairs.ts) and the generated ISO 4217
// list it checks against (src/data/iso4217.ts, from scripts/update-iso4217.mjs):
//   - only ISO 4217 codes in the 'currency' category are accepted
//   - fund codes, precious metals, units of account, XTS and XXX are refused
//   - From and To must differ, and a pair may not repeat an earlier row

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '..', '..', 'src')

let m
let dispose

before(async () => {
  const b = await bundleAndImport(
    `export * from ${JSON.stringify(resolve(SRC, 'data', 'iso4217.ts'))}
     export * from ${JSON.stringify(resolve(SRC, 'components', 'common', 'jira-forms', 'currencyPairs.ts'))}`,
  )
  m = b.mod
  dispose = b.dispose
})

after(() => dispose?.())

describe('ISO 4217 list', () => {
  it('is sorted, unique and three upper-case letters per code', () => {
    const codes = m.ISO_4217.map((c) => c.code)
    assert.deepEqual(codes, [...codes].sort())
    assert.equal(new Set(codes).size, codes.length)
    for (const c of codes) assert.match(c, /^[A-Z]{3}$/)
  })

  it('categorises the non-currency codes', () => {
    const cat = (code) => m.ISO_4217.find((c) => c.code === code)?.category
    assert.equal(cat('AED'), 'currency')
    assert.equal(cat('XCD'), 'currency')
    assert.equal(cat('XAU'), 'precious-metal')
    assert.equal(cat('CLF'), 'fund')
    assert.equal(cat('XDR'), 'unit-of-account')
    assert.equal(cat('XTS'), 'test')
    assert.equal(cat('XXX'), 'no-currency')
  })
})

describe('currencyCodeError', () => {
  it('accepts circulating currencies', () => {
    for (const c of ['AED', 'USD', 'EUR', 'GBP', 'SAR', 'XOF']) assert.equal(m.currencyCodeError(c), undefined, c)
  })

  it('refuses malformed, unknown and withdrawn codes', () => {
    assert.equal(m.currencyCodeError(''), 'Required')
    assert.equal(m.currencyCodeError('US'), 'Three letters, A–Z')
    assert.equal(m.currencyCodeError('ZZZ'), 'Not an ISO 4217 code')
    assert.equal(m.currencyCodeError('DEM'), 'Not an ISO 4217 code')
  })

  it('refuses every code outside the currency category', () => {
    for (const c of m.ISO_4217.filter((x) => x.category !== 'currency')) {
      assert.ok(m.currencyCodeError(c.code), c.code)
    }
  })
})

describe('pairErrors', () => {
  const pair = (FromCurrency, ToCurrency) => ({ FromCurrency, ToCurrency })

  it('passes distinct valid pairs', () => {
    assert.deepEqual(m.pairErrors([pair('USD', 'AED'), pair('AED', 'USD')]), [{}, {}])
  })

  it('refuses the same currency on both sides', () => {
    assert.ok(m.pairErrors([pair('AED', 'AED')])[0].pair)
  })

  it('flags a repeated pair against the first occurrence', () => {
    const e = m.pairErrors([pair('USD', 'AED'), pair('EUR', 'AED'), pair('USD', 'AED')])
    assert.equal(e[2].pair, 'Same as row 1')
  })

  it('reports field errors without a pair error', () => {
    assert.deepEqual(m.pairErrors([pair('XAU', 'AED')])[0], { FromCurrency: 'Precious metal, not a currency' })
  })
})

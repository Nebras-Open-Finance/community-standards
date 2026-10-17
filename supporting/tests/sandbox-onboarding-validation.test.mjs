// Validation rules and document sets for the Sandbox onboarding form
// (src/components/common/jira-forms/sandbox-onboarding/). Mirrors the tables in
// supporting/design_handoff_sandbox_onboarding/README.md, plus:
//   - "Your email address" replaces the on-behalf-of user picker and must be an email
//   - nominating an additional Organisation Admin adds a second CCO approval email
//   - the Letter of Intent / Business Plan is required for TPPs only

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = resolve(__dirname, '..', '..', 'src', 'components', 'common', 'jira-forms', 'sandbox-onboarding')

let m
let dispose

before(async () => {
  const b = await bundleAndImport(
    `export * from ${JSON.stringify(resolve(DIR, 'validators.ts'))}
     export * from ${JSON.stringify(resolve(DIR, 'documents.ts'))}
     export * from ${JSON.stringify(resolve(DIR, 'fields.ts'))}`,
  )
  m = b.mod
  dispose = b.dispose
})

after(() => dispose?.())

const v = (key, values, files = {}, errs = {}) => m.validate(key, { ...m.blankValues(), ...values }, files, errs)
const docKeys = (orgType, alt) => m.requiredDocs(orgType, alt).map((d) => d.key)

describe('Sandbox onboarding: documents', () => {
  it('no documents until an organisation type is chosen', () => {
    assert.deepEqual(docKeys('', false), [])
    assert.deepEqual(docKeys('', true), [])
  })

  it('LFI: CCO approval email and CBUAE LFI License; no Letter of Intent', () => {
    assert.deepEqual(docKeys('LFI', false), ['lfiLicense', 'cco'])
  })

  it('TPP: CCO approval email, Trade License and Letter of Intent', () => {
    assert.deepEqual(docKeys('TPP', false), ['tradeLicense', 'loi', 'cco'])
  })

  it('an additional Organisation Admin adds a second CCO approval email for either type', () => {
    assert.deepEqual(docKeys('LFI', true), ['lfiLicense', 'cco', 'ccoAlt'])
    assert.deepEqual(docKeys('TPP', true), ['tradeLicense', 'loi', 'cco', 'ccoAlt'])
    const [, pbc, alt] = m.requiredDocs('LFI', true)
    assert.match(pbc.title, /– Organisation Admin$/)
    assert.match(alt.title, /– Additional Organisation Admin$/)
  })

  it('rejects wrong extensions, empty files and files over 10 MB', () => {
    const cco = m.requiredDocs('LFI', false).find((d) => d.key === 'cco')
    assert.equal(m.fileError(cco, { name: 'approval.EML', size: 10 }), '')
    assert.match(m.fileError(cco, { name: 'approval.docx', size: 10 }), /not accepted/)
    assert.match(m.fileError(cco, { name: 'approval.pdf', size: 0 }), /empty/)
    assert.equal(m.fileError(cco, { name: 'max.pdf', size: m.MAX_FILE_BYTES }), '')
    assert.match(m.fileError(cco, { name: 'big.pdf', size: m.MAX_FILE_BYTES + 1 }), /10 MB/)
  })

  it('documents together must stay within 30 MB', () => {
    const nine = 9 * 1024 * 1024
    assert.equal(m.totalSizeError({ size: nine }, [{ size: nine }, { size: nine }]), '')
    assert.match(m.totalSizeError({ size: nine }, [{ size: nine }, { size: nine }, { size: nine }]), /30 MB/)
  })
})

describe('Sandbox onboarding: what is sent', () => {
  it('only the values that apply; the additional admin only when nominated', () => {
    const base = { ...m.blankValues(), requesterEmail: 'a@b.ae', orgType: 'TPP', altFirst: 'Stale', injected: 'x' }
    const no = m.submissionValues({ ...base, altNominate: 'no' })
    assert.equal(no.requesterEmail, 'a@b.ae')
    assert.equal(no.pbcMobileCc, '+971')
    assert.ok(!('altFirst' in no) && !('altMobileCc' in no) && !('injected' in no))
    const yes = m.submissionValues({ ...base, altNominate: 'yes' })
    assert.equal(yes.altFirst, 'Stale')
    assert.equal(yes.altMobileCc, '+971')
  })
})

describe('Sandbox onboarding: active keys', () => {
  it('additional contact fields are validated only when nominated', () => {
    assert.ok(!m.activeKeys({ altNominate: 'no' }).includes('altEmail'))
    assert.ok(m.activeKeys({ altNominate: 'yes' }).includes('altEmail'))
  })

  it('second CCO upload is validated only when an additional Organisation Admin is nominated', () => {
    assert.ok(!m.activeKeys({ orgType: 'TPP', altNominate: 'no' }).includes('doc:ccoAlt'))
    assert.ok(m.activeKeys({ orgType: 'TPP', altNominate: 'yes' }).includes('doc:ccoAlt'))
  })

  it('Letter of Intent is validated for TPP only', () => {
    assert.ok(m.activeKeys({ orgType: 'TPP' }).includes('doc:loi'))
    assert.ok(!m.activeKeys({ orgType: 'LFI' }).includes('doc:loi'))
  })

  it('has no on-behalf-of user picker, summary or share-with', () => {
    const keys = m.activeKeys({})
    assert.ok(keys.includes('requesterEmail'))
    for (const k of ['onBehalf', 'summary', 'sharing']) assert.ok(!keys.includes(k), `${k} is still validated`)
    assert.ok(!('summary' in m.FIELDS))
    assert.ok(!('sharing' in m.blankValues()))
  })

  it('five sections, the requester email inside Organisation', () => {
    assert.deepEqual(m.SECTIONS.map((s) => `${s.num} ${s.id}`), ['01 org', '02 address', '03 pbc', '04 alt', '05 docs'])
    assert.ok(m.sectionKeys('org', {}).includes('requesterEmail'))
  })
})

describe('Sandbox onboarding: field rules', () => {
  it('requester email is required and must be an email', () => {
    assert.equal(v('requesterEmail', {}), 'Enter your email address')
    assert.match(v('requesterEmail', { requesterEmail: 'layla@' }), /format name@example.com/)
    assert.equal(v('requesterEmail', { requesterEmail: 'layla.hassan@examplebank.ae' }), '')
  })

  it('Emirates ID: 15 digits starting with 784, formatted while typing', () => {
    assert.equal(m.formatEid('784198845123782'), '784-1988-4512378-2')
    assert.equal(m.formatEid('784-19x88'), '784-1988')
    assert.equal(v('pbcEid', { pbcEid: '784-1988-4512378-2' }), '')
    assert.match(v('pbcEid', { pbcEid: '785-1988-4512378-2' }), /starting with 784/)
    assert.match(v('pbcEid', { pbcEid: '784-1988' }), /15 digits/)
  })

  it('mobile: UAE numbers are 9 digits starting with 5; others 6–14 digits', () => {
    assert.equal(v('pbcMobile', { pbcMobile: '50 123 4567' }), '')
    assert.equal(v('pbcMobile', { pbcMobile: '050 123 4567' }), '')
    assert.match(v('pbcMobile', { pbcMobile: '40 123 4567' }), /UAE mobile/)
    assert.equal(v('pbcMobile', { pbcMobile: '7700 900123', pbcMobileCc: '+44' }), '')
    assert.match(v('pbcMobile', { pbcMobile: '123', pbcMobileCc: '+44' }), /6 to 14/)
    assert.equal(m.sanitisePhone('+50-123 abc4567'), '50123 4567')
  })

  it('choices need a selection', () => {
    assert.equal(v('orgType', {}), 'Select LFI or TPP')
    assert.equal(v('orgType', { orgType: 'TPP' }), '')
    assert.equal(v('altNominate', {}), 'Select Yes or No')
    assert.equal(v('altNominate', { altNominate: 'no' }), '')
    assert.ok(!m.contactKeys('pbc').includes('pbcAdmin') && !m.contactKeys('alt').includes('altAdmin'))
  })

  it('documents: missing, then a stored file error wins', () => {
    assert.equal(v('doc:loi', { orgType: 'TPP' }), 'Upload the Letter of Intent / Business Plan')
    assert.equal(v('doc:loi', { orgType: 'TPP' }, { loi: { name: 'a.pdf', size: 1 } }), '')
    assert.equal(v('doc:loi', { orgType: 'TPP' }, { loi: { name: 'a.pdf', size: 1 } }, { loi: 'bad' }), 'bad')
  })
})

describe('Sandbox onboarding: wording', () => {
  it('says Organisation Admin, not Primary Business Contact or PBC', () => {
    const text = JSON.stringify([m.FIELDS, m.CHOICE_LABELS, m.SECTIONS, m.requiredDocs('TPP', true)])
    // Case-sensitive for PBC: the internal section id is `pbc`.
    assert.ok(!/primary business contact|alternate/i.test(text) && !/\bPBC\b/.test(text), 'old wording remains')
    assert.equal(m.labelFor('pbcEmail', {}), 'Email ID (Organisation Admin)')
    assert.equal(m.labelFor('altFirst', {}), 'First name (Additional Organisation Admin)')
  })
})

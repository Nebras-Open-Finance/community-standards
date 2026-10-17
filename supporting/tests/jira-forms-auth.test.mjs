// Every Jira form is behind Trust Framework SSO, except Sandbox onboarding.
//
// SSO is applied by JiraFormShell (sign-in + ticket access check). This test
// asserts:
//   1. Every entry in src/data/jiraForms.ts has a page, and every page under
//      src/pages/internal/pages/jira-forms/ has an entry.
//   2. Every form with `sso: true` renders JiraFormShell.
//   3. Sandbox onboarding is the only form with `sso: false`, and its page does
//      not render JiraFormShell.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const PAGES = resolve(ROOT, 'src', 'pages', 'internal', 'pages', 'jira-forms')

// The single exclusion. Adding to this list needs an explicit decision.
const NO_SSO = ['sandbox-onboarding']

let forms
let dispose

before(async () => {
  const b = await bundleAndImport(
    `export { JIRA_FORMS } from ${JSON.stringify(resolve(ROOT, 'src', 'data', 'jiraForms.ts'))}`,
  )
  forms = b.mod.JIRA_FORMS
  dispose = b.dispose
})

after(() => dispose?.())

const pageSource = (slug) => readFileSync(resolve(PAGES, `${slug}.vue`), 'utf-8')
const usesShell = (src) => /<JiraFormShell[\s>]/.test(src)

describe('Jira forms auth', () => {
  it('every registered form has a page, and every page is registered', () => {
    const slugs = forms.map((f) => f.slug)
    for (const s of slugs) assert.ok(existsSync(resolve(PAGES, `${s}.vue`)), `${s}: no page`)
    const pages = readdirSync(PAGES).filter((f) => f.endsWith('.vue')).map((f) => f.replace(/\.vue$/, ''))
    for (const p of pages) assert.ok(slugs.includes(p), `${p}.vue: not in src/data/jiraForms.ts`)
  })

  it('only Sandbox onboarding opts out of SSO', () => {
    const optedOut = forms.filter((f) => f.sso !== true).map((f) => f.slug)
    assert.deepEqual(optedOut.sort(), [...NO_SSO].sort())
  })

  it('SSO forms render JiraFormShell', () => {
    for (const f of forms.filter((x) => x.sso)) {
      assert.ok(usesShell(pageSource(f.slug)), `${f.slug}: page does not render JiraFormShell`)
    }
  })

  it('Sandbox onboarding does not render JiraFormShell', () => {
    for (const s of NO_SSO) assert.ok(!usesShell(pageSource(s)), `${s}: page renders JiraFormShell`)
  })
})

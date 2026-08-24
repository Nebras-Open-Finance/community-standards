// The site announcement modal can offer a guided switch to another version
// (see src/composables/useVersionTour.ts). The tour dims the page and asks the
// reader to pick a version from the header dropdown, so it only works when two
// things hold: the route actually renders the dropdown, and the version it
// steers towards is one the dropdown lists.
//
// Both are silent failures if wrong — a typo'd `switchTo.version` highlights
// nothing and leaves the reader staring at a dimmed page — so they are asserted
// here rather than left to a manual click-through.

import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { resolve, join } from 'node:path'
import { bundleAndImport } from './_helpers/bundle-ts.mjs'
import { ROOT_DIR } from './_helpers/resolve-site-link.mjs'

const SRC = resolve(ROOT_DIR, 'src')

let bundle
let dispose

before(async () => {
  const a = await bundleAndImport(`
    export { routeHasVersionDropdown } from ${JSON.stringify(join(SRC, 'composables', 'useSelectedVersion.ts'))}
    export { VERSIONS } from ${JSON.stringify(join(SRC, 'data', 'versions.ts'))}
    export { SITE_ANNOUNCEMENT } from ${JSON.stringify(join(SRC, 'data', 'site-announcement.ts'))}
  `)
  bundle = a.mod
  dispose = a.dispose
})

after(() => dispose?.())

describe('Version tour — guided switch from the site announcement', () => {
  it('routeHasVersionDropdown matches where the header renders the dropdown', () => {
    const { routeHasVersionDropdown } = bundle
    assert.equal(typeof routeHasVersionDropdown, 'function',
      'routeHasVersionDropdown is not exported from useSelectedVersion.ts')

    const shows = [
      '/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/',
      '/tech/lfi-api-hub/',
      '/tech/api-specs/v2.1/tpp/consent/account-access-consents',
    ]
    const hides = [
      // Release notes / erratas / changelogs describe every version at once.
      '/tech/release-notes-and-erratas/',
      '/tech/release-notes-and-erratas/changelog/v2.2-rc1/',
      // Nothing outside the docs trees carries a version.
      '/',
      '/proposals/',
      '/metrics',
      // Bare /tech has no trailing slash, so it is not a docs tree page.
      '/tech',
    ]

    for (const path of shows) {
      assert.equal(routeHasVersionDropdown(path), true, `expected a dropdown on ${path}`)
    }
    for (const path of hides) {
      assert.equal(routeHasVersionDropdown(path), false, `expected no dropdown on ${path}`)
    }
  })

  it('every switchTo.version in site-announcement is a version the dropdown lists', () => {
    const { SITE_ANNOUNCEMENT, VERSIONS } = bundle
    assert.ok(SITE_ANNOUNCEMENT && Array.isArray(SITE_ANNOUNCEMENT.items),
      'SITE_ANNOUNCEMENT is not exported, or has no items array')

    const failures = []
    for (const item of SITE_ANNOUNCEMENT.items) {
      if (!item.switchTo) continue
      if (!VERSIONS.includes(item.switchTo.version)) {
        failures.push(
          `"${item.title}": switchTo.version "${item.switchTo.version}" is not in VERSIONS (${VERSIONS.join(', ')})`,
        )
      }
      if (!item.switchTo.label) {
        failures.push(`"${item.title}": switchTo has no label`)
      }
    }
    assert.deepStrictEqual(
      failures,
      [],
      `site-announcement switchTo entries the version dropdown cannot satisfy:\n` +
      failures.map((l) => '  - ' + l).join('\n'),
    )
  })
})

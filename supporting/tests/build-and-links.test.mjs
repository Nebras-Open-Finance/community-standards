// Builds the app via vite-ssg and runs lychee against the dist to catch
// dead internal links before deploy. The vite-ssg build itself fails on
// hard errors (missing imports, route generation crashes), and lychee
// catches dead in-app hrefs once SSG has emitted HTML for every route.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DIST = resolve(ROOT, 'dist')

function lycheeAvailable() {
  const r = spawnSync('lychee', ['--version'], { encoding: 'utf-8', shell: true })
  return r.status === 0
}

describe('App build', () => {
  it('vite-ssg build succeeds', { timeout: 600_000 }, () => {
    const r = spawnSync(
      'npx',
      ['--no-install', 'vite-ssg', 'build'],
      { cwd: ROOT, encoding: 'utf-8', shell: true }
    )
    assert.strictEqual(
      r.status,
      0,
      `vite-ssg build failed (exit ${r.status}):\n${r.stdout}\n${r.stderr}`
    )
    assert.ok(existsSync(DIST), `Expected build output at ${DIST}`)
  })
})

describe('Internal links', {
  skip: !lycheeAvailable() && 'lychee not installed — see https://lychee.cli.rs/installation/',
}, () => {
  it('lychee passes on built dist', { timeout: 300_000 }, () => {
    const r = spawnSync(
      'lychee',
      ['--config', 'supporting/lychee.toml', '--root-dir', DIST, 'dist'],
      { cwd: ROOT, encoding: 'utf-8' }
    )
    assert.strictEqual(
      r.status,
      0,
      `lychee failed (exit ${r.status}):\n${r.stdout}\n${r.stderr}`
    )
  })
})

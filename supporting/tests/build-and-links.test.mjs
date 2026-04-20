import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DIST = resolve(ROOT, 'docs', '.vitepress', 'dist')

function lycheeAvailable() {
  const r = spawnSync('lychee', ['--version'], { encoding: 'utf-8', shell: true })
  return r.status === 0
}

describe('Docs build', () => {
  it('vitepress build succeeds', { timeout: 600_000 }, () => {
    const r = spawnSync(
      'npx',
      ['--no-install', 'vitepress', 'build', 'docs'],
      { cwd: ROOT, encoding: 'utf-8', shell: true }
    )
    assert.strictEqual(
      r.status,
      0,
      `vitepress build failed (exit ${r.status}):\n${r.stdout}\n${r.stderr}`
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
      ['--config', 'supporting/lychee.toml', '--root-dir', DIST, 'docs/.vitepress/dist'],
      { cwd: ROOT, encoding: 'utf-8' }
    )
    assert.strictEqual(
      r.status,
      0,
      `lychee failed (exit ${r.status}):\n${r.stdout}\n${r.stderr}`
    )
  })
})

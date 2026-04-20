import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const SPECS_ROOT = resolve(ROOT, 'docs', 'public', 'openapi')
const CATEGORIES = ['standards', 'api-hub', 'ozone-connect']

function parseVersions() {
  const versionFile = resolve(ROOT, 'docs', '.vitepress', 'version.ts')
  const src = readFileSync(versionFile, 'utf-8')
  const match = src.match(/VERSIONS\s*=\s*\[([^\]]+)\]/)
  if (!match) throw new Error('Could not parse VERSIONS from version.ts')
  return match[1].split(',').map(v => v.trim().replace(/['"]/g, '')).filter(Boolean)
}

const versions = parseVersions()

describe('Fetched OpenAPI specs', () => {
  for (const version of versions) {
    for (const category of CATEGORIES) {
      const dir = resolve(SPECS_ROOT, version, category)

      describe(`${version}/${category}`, () => {
        it('directory exists', () => {
          assert.ok(existsSync(dir), `Missing directory: ${dir}`)
        })

        if (!existsSync(dir)) return

        const yamlFiles = readdirSync(dir).filter(f => f.endsWith('.yaml'))

        it('contains at least one .yaml file', () => {
          assert.ok(yamlFiles.length > 0, `No .yaml files in ${dir}`)
        })

        for (const filename of yamlFiles) {
          describe(filename, () => {
            const filePath = resolve(dir, filename)
            let parseError = null
            let doc = null
            try {
              doc = parseYaml(readFileSync(filePath, 'utf-8'))
            } catch (err) {
              parseError = err
            }

            it('parses as YAML', () => {
              assert.ok(!parseError, `YAML parse error: ${parseError?.message}`)
              assert.ok(doc && typeof doc === 'object', 'Parsed to non-object')
            })

            it("has top-level 'openapi' or 'swagger' key", () => {
              assert.ok(
                doc?.openapi || doc?.swagger,
                "Missing top-level 'openapi' or 'swagger' key"
              )
            })
          })
        }
      })
    }
  }
})

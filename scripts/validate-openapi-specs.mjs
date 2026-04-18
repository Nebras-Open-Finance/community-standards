/**
 * Validates fetched OpenAPI specs under docs/public/openapi/.
 *
 * Checks per version/category directory listed in docs/.vitepress/version.ts:
 *   - directory exists and contains at least one .yaml file
 *   - every .yaml file parses
 *   - every .yaml file has a top-level `openapi:` (or `swagger:`) key
 *
 * Exits non-zero on any failure. Intended to run after fetch-openapi-specs.mjs
 * so CI catches a silently-broken fetch instead of shipping stale/missing docs.
 */

import { readFileSync, readdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parse as parseYaml } from 'yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SPECS_ROOT = resolve(ROOT, 'docs', 'public', 'openapi')
const CATEGORIES = ['standards', 'api-hub', 'ozone-connect']

function parseVersions() {
  const versionFile = resolve(ROOT, 'docs', '.vitepress', 'version.ts')
  const src = readFileSync(versionFile, 'utf-8')
  const match = src.match(/VERSIONS\s*=\s*\[([^\]]+)\]/)
  if (!match) throw new Error('Could not parse VERSIONS from version.ts')
  return match[1].split(',').map(v => v.trim().replace(/['"]/g, '')).filter(Boolean)
}

const errors = []
const versions = parseVersions()

console.log(`Validating OpenAPI specs for versions: ${versions.join(', ')}\n`)

for (const version of versions) {
  console.log(`${version}:`)
  for (const category of CATEGORIES) {
    const dir = resolve(SPECS_ROOT, version, category)

    if (!existsSync(dir)) {
      errors.push(`${version}/${category} — directory missing (${dir})`)
      console.log(`  ✗ ${category} — missing`)
      continue
    }

    const yamlFiles = readdirSync(dir).filter(f => f.endsWith('.yaml'))
    if (yamlFiles.length === 0) {
      errors.push(`${version}/${category} — no .yaml files found`)
      console.log(`  ✗ ${category} — empty`)
      continue
    }

    let categoryErrors = 0
    for (const filename of yamlFiles) {
      const filePath = resolve(dir, filename)
      const relPath = `${version}/${category}/${filename}`
      let doc
      try {
        doc = parseYaml(readFileSync(filePath, 'utf-8'))
      } catch (err) {
        errors.push(`${relPath} — YAML parse error: ${err.message}`)
        categoryErrors++
        continue
      }
      if (!doc || typeof doc !== 'object') {
        errors.push(`${relPath} — parsed to non-object`)
        categoryErrors++
        continue
      }
      if (!doc.openapi && !doc.swagger) {
        errors.push(`${relPath} — missing top-level 'openapi' or 'swagger' key`)
        categoryErrors++
      }
    }

    if (categoryErrors === 0) {
      console.log(`  ✓ ${category} — ${yamlFiles.length} file(s) OK`)
    } else {
      console.log(`  ✗ ${category} — ${categoryErrors}/${yamlFiles.length} failed`)
    }
  }
  console.log()
}

if (errors.length > 0) {
  console.error('Validation failed:')
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

console.log('All specs valid.')

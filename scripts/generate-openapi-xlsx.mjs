/**
 * Generates .xlsx siblings for every OpenAPI .yaml under public/openapi/.
 *
 * Runs after scripts/fetch-openapi-specs.mjs. Each .xlsx is written next to
 * its source .yaml using the same basename (only the extension changes).
 *
 * The workbook layout is defined in scripts/lib/spec-to-workbook.mjs.
 *
 * Usage: node scripts/generate-openapi-xlsx.mjs
 */

import * as fs from 'fs'
import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { resolve, dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import { parse as parseYaml } from 'yaml'
import * as XLSX from 'xlsx'

// SheetJS (ESM build) doesn't auto-wire the `fs` module, so writeFile can't
// persist to disk unless we hand it fs explicitly. See:
// https://docs.sheetjs.com/docs/getting-started/installation/nodejs#esm-import
XLSX.set_fs(fs)

import { specToWorkbook } from './lib/spec-to-workbook.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OPENAPI_ROOT = resolve(ROOT, 'public', 'openapi')

// Only versioned specs (public/openapi/v*/...) are exported. Root-level
// unversioned files like trust-framework.yaml are intentionally skipped.
function walkYaml(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const s = statSync(full)
    if (s.isDirectory()) {
      if (dir === OPENAPI_ROOT && !/^v\d/.test(entry)) continue
      walkYaml(full, out)
    } else if (s.isFile() && /\.ya?ml$/i.test(entry)) {
      if (dir === OPENAPI_ROOT) continue
      out.push(full)
    }
  }
  return out
}

function convertOne(yamlPath) {
  const raw = readFileSync(yamlPath, 'utf-8')
  const spec = parseYaml(raw)
  if (!spec || typeof spec !== 'object') {
    throw new Error(`Parsed to non-object: ${yamlPath}`)
  }
  const wb = specToWorkbook(spec)
  const xlsxPath = yamlPath.replace(/\.ya?ml$/i, '.xlsx')
  XLSX.writeFile(wb, xlsxPath)
  return xlsxPath
}

async function main() {
  if (!existsSync(OPENAPI_ROOT)) {
    console.warn(`No openapi directory at ${OPENAPI_ROOT} — skipping xlsx generation.`)
    return
  }

  const yamlFiles = walkYaml(OPENAPI_ROOT)
  if (yamlFiles.length === 0) {
    console.warn('No .yaml files found under public/openapi/ — skipping.')
    return
  }

  console.log(`Generating .xlsx for ${yamlFiles.length} OpenAPI file(s):`)
  let failed = 0
  for (const yamlPath of yamlFiles) {
    try {
      const xlsxPath = convertOne(yamlPath)
      console.log(`  ✓ ${relative(ROOT, xlsxPath)}`)
    } catch (err) {
      failed++
      console.error(`  ✗ ${relative(ROOT, yamlPath)} — ${err.message}`)
    }
  }
  if (failed > 0) {
    console.error(`\n${failed} file(s) failed to convert.`)
    process.exit(1)
  }
  console.log('\nDone.')
}

main().catch(err => {
  console.error('Error generating xlsx:', err)
  process.exit(1)
})

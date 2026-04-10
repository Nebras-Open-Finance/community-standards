/**
 * Fetches OpenAPI specs from the Nebras-Open-Finance/api-specs GitHub repository.
 *
 * For each version defined in docs/.vitepress/version.ts and each category
 * (standards, api-hub, ozone-connect), this script:
 *
 *   1. Lists available version folders in the remote repo (including errata).
 *   2. Resolves per-file: uses the highest errata that contains the file,
 *      falling back to the base version.
 *   3. Downloads each YAML file to docs/public/openapi/{version}/{category}/.
 *
 * Usage:  node scripts/fetch-openapi-specs.mjs [--force]
 *   --force   Re-download even if the target directory already has files.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const REPO_OWNER = 'Nebras-Open-Finance'
const REPO_NAME = 'api-specs'
const BRANCH = 'main'

const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`
const GITHUB_RAW = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`

const FORCE = process.argv.includes('--force')

// ─── Version config ────────────────────────────────────────────────────────────
// Parse VERSIONS array from the TypeScript source so there is a single source of truth.

function parseVersions() {
  const versionFile = resolve(ROOT, 'docs', '.vitepress', 'version.ts')
  const src = readFileSync(versionFile, 'utf-8')
  const match = src.match(/VERSIONS\s*=\s*\[([^\]]+)\]/)
  if (!match) throw new Error('Could not parse VERSIONS from version.ts')
  return match[1].split(',').map(v => v.trim().replace(/['"]/g, '')).filter(Boolean)
}

// ─── Categories & version-folder mapping ───────────────────────────────────────
// The remote repo uses slightly different folder names per category.
// standards:      v2.1, v2.1-errata1
// api-hub:        v2.1.x, v2.1.x-errata1
// ozone-connect:  v2.1.x, v2.1.x-errata1
//
// Both patterns (with and without .x) may appear, so we match on both.

const CATEGORIES = ['standards', 'api-hub', 'ozone-connect']

/**
 * Build regex patterns that match base + errata folders for a given version.
 * e.g. for version "v2.1" → matches v2.1, v2.1.x, v2.1-errata1, v2.1.x-errata1, etc.
 */
function buildVersionPattern(version) {
  // Escape dots for regex
  const escaped = version.replace(/\./g, '\\.')
  // Match: v2.1 or v2.1.x, optionally followed by -errataN
  return new RegExp(`^${escaped}(\\.x)?(-errata(\\d+))?$`)
}

/**
 * Given a list of remote folder names and a version, return them sorted so the
 * base version comes first and errata in ascending order.
 * Returns array of { folder, errataNum } where errataNum = 0 for base.
 */
function sortVersionFolders(folders, version) {
  const pattern = buildVersionPattern(version)
  const matched = []

  for (const folder of folders) {
    const m = folder.match(pattern)
    if (m) {
      const errataNum = m[3] ? parseInt(m[3], 10) : 0
      matched.push({ folder, errataNum })
    }
  }

  // Sort ascending by errata number (base = 0 first, then errata1, errata2, …)
  matched.sort((a, b) => a.errataNum - b.errataNum)
  return matched
}

// ─── GitHub helpers ────────────────────────────────────────────────────────────

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'nebras-openapi-fetch'
}

// Honour GITHUB_TOKEN if set (avoids rate-limiting in CI)
if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
}

async function ghListDir(path) {
  const url = `${GITHUB_API}/${path}?ref=${BRANCH}`
  const res = await fetch(url, { headers })
  if (!res.ok) {
    if (res.status === 404) return []
    throw new Error(`GitHub API ${res.status}: ${url}`)
  }
  const items = await res.json()
  return items.filter(i => i.type === 'dir' || i.type === 'file')
}

async function ghDownloadFile(remotePath) {
  const url = `${GITHUB_RAW}/${remotePath}`
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`)
  return res.text()
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function fetchCategory(version, category) {
  const outDir = resolve(ROOT, 'docs', 'public', 'openapi', version, category)

  // Skip if already populated (unless --force)
  if (!FORCE && existsSync(outDir) && readdirSync(outDir).some(f => f.endsWith('.yaml'))) {
    console.log(`  ✓ ${category} — already present (use --force to re-fetch)`)
    return
  }

  // 1. List version folders for this category
  const distPath = `dist/${category}`
  const remoteDirs = await ghListDir(distPath)
  const folderNames = remoteDirs.filter(d => d.type === 'dir').map(d => d.name)
  const sorted = sortVersionFolders(folderNames, version)

  if (sorted.length === 0) {
    console.warn(`  ⚠ ${category} — no matching folders found for ${version}`)
    return
  }

  // 2. Collect files from base → highest errata (later entries override earlier)
  const fileMap = new Map() // filename → remote path

  for (const { folder } of sorted) {
    const openApiPath = `dist/${category}/${folder}/openapi`
    const files = await ghListDir(openApiPath)
    for (const f of files) {
      if (f.type === 'file' && f.name.endsWith('.yaml')) {
        fileMap.set(f.name, `${openApiPath}/${f.name}`)
      }
    }
  }

  if (fileMap.size === 0) {
    console.warn(`  ⚠ ${category} — no YAML files found`)
    return
  }

  // 3. Download all resolved files
  mkdirSync(outDir, { recursive: true })

  const downloads = [...fileMap.entries()].map(async ([filename, remotePath]) => {
    const content = await ghDownloadFile(remotePath)
    writeFileSync(resolve(outDir, filename), content, 'utf-8')
    return filename
  })

  const downloaded = await Promise.all(downloads)
  console.log(`  ✓ ${category} — ${downloaded.length} file(s)`)
}

async function main() {
  const versions = parseVersions()
  console.log(`Fetching OpenAPI specs for versions: ${versions.join(', ')}\n`)

  for (const version of versions) {
    console.log(`${version}:`)
    for (const category of CATEGORIES) {
      await fetchCategory(version, category)
    }
    console.log()
  }

  console.log('Done.')
}

main().catch(err => {
  console.error('Error fetching OpenAPI specs:', err)
  process.exit(1)
})

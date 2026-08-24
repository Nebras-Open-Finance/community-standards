/**
 * Fetches OpenAPI specs from the Nebras-Open-Finance/api-specs GitHub repository.
 *
 * For each version defined in src/data/versions.ts and each category
 * (standards, api-hub, ozone-connect), this script:
 *
 *   1. Lists available version folders in the remote repo (including errata).
 *   2. Resolves per-file across the version chain in SPEC_FOLDER: the most
 *      preferred release that publishes the file wins, and within a release the
 *      highest errata wins over the base, which wins over a release candidate.
 *   3. Downloads each YAML file to public/openapi/{version}/{category}/,
 *      uplifting the version strings of any file borrowed from an older
 *      release.
 *
 * Usage:  node scripts/fetch-openapi-specs.mjs [--skip-existing] [--branch <name>]
 *   --skip-existing  Skip download if the target directory already has files.
 *   --branch <name>  Fetch from a specific branch (default: main).
 *
 * The branch can also be set via the SPECS_BRANCH env variable.
 * CLI --branch takes precedence over SPECS_BRANCH.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync, readdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Load .env file (no dependency required)
function loadEnv() {
  const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '..', '.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    if (!(key in process.env)) process.env[key] = rest.join('=')
  }
}
loadEnv()

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const REPO_OWNER = 'Nebras-Open-Finance'
const REPO_NAME = 'api-specs'

// Resolve which api-specs branch to fetch from.
// Precedence: --branch CLI arg > SPECS_BRANCH env > tracked .specs-branch file > 'main'.
// To retarget the build (locally + CI), edit the tracked .specs-branch file at repo root.
function readTrackedBranch() {
  const p = resolve(ROOT, '.specs-branch')
  if (!existsSync(p)) return null
  const v = readFileSync(p, 'utf-8').trim()
  return v || null
}

function parseBranch() {
  const idx = process.argv.indexOf('--branch')
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  return process.env.SPECS_BRANCH || readTrackedBranch() || 'main'
}

const BRANCH = parseBranch()

const GITHUB_API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`
const GITHUB_RAW = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}`

const SKIP_EXISTING = process.argv.includes('--skip-existing')

// ─── Version config ────────────────────────────────────────────────────────────
// Parse VERSIONS array from the TypeScript source so there is a single source of truth.

function readVersionsSource() {
  return readFileSync(resolve(ROOT, 'src', 'data', 'versions.ts'), 'utf-8')
}

function parseVersions() {
  const src = readVersionsSource()
  const match = src.match(/VERSIONS\s*=\s*\[([^\]]+)\]/)
  if (!match) throw new Error('Could not parse VERSIONS from versions.ts')
  return match[1].split(',').map(v => v.trim().replace(/['"]/g, '')).filter(Boolean)
}

/**
 * Parse SPEC_FOLDER — the map from a local version key to the chain of upstream
 * folders its specs resolve from, most-preferred first. The chain diverges from
 * the version key when a release has only partly landed in api-specs:
 * `v2.2-rc1` takes what upstream publishes at v2.2 and falls back to v2.1.
 *
 * Returns a plain object; versions absent from the map resolve to themselves.
 */
function parseSpecFolders() {
  const src = readVersionsSource()
  const block = src.match(/SPEC_FOLDER[^=]*=\s*\{([^}]+)\}/)
  if (!block) throw new Error('Could not parse SPEC_FOLDER from versions.ts')
  const map = {}
  for (const entry of block[1].matchAll(/['"]([^'"]+)['"]\s*:\s*\[([^\]]*)\]/g)) {
    map[entry[1]] = entry[2]
      .split(',')
      .map(v => v.trim().replace(/['"]/g, ''))
      .filter(Boolean)
  }
  return map
}

function parseProtocolVersions() {
  return parseVersionMap('PROTOCOL_VERSION')
}

function parseVersionMap(name) {
  const src = readVersionsSource()
  const block = src.match(new RegExp(`${name}[^=]*=\\s*\\{([^}]+)\\}`))
  if (!block) throw new Error(`Could not parse ${name} from versions.ts`)
  const map = {}
  for (const line of block[1].split('\n')) {
    const entry = line.match(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"]/)
    if (entry) map[entry[1]] = entry[2]
  }
  return map
}

/**
 * Uplift the version strings inside a borrowed spec.
 *
 * When a version serves another version's YAML (SPEC_FOLDER), the file still
 * carries the source version in its consent-type URNs and server base paths.
 * Left alone, the served spec contradicts the documentation built around it —
 * e.g. a page that says `urn:openfinanceuae:account-access-consent:v2.2` while
 * the schema enum only permits `:v2.1`.
 *
 * Only version-bearing identifiers are touched. Nothing else in the spec is
 * rewritten; this is not a general-purpose patcher.
 */
function upliftProtocolVersion(yaml, fromVersion, toVersion) {
  const from = fromVersion.replace(/\./g, '\\.')
  return yaml
    .replace(new RegExp(`(urn:openfinanceuae:[a-z-]+):${from}\\b`, 'g'), `$1:${toVersion}`)
    .replace(new RegExp(`/open-finance/([a-z][a-z-]*)/${from}\\b`, 'g'), `/open-finance/$1/${toVersion}`)
    .replace(new RegExp(`/open-finance/${from}\\b`, 'g'), `/open-finance/${toVersion}`)
}

// ─── Categories & version-folder mapping ───────────────────────────────────────
// Folder naming upstream is not uniform, either between categories or between
// releases:
//   standards:      v2.1, v2.1-errata3, v2.2-rc1
//   api-hub:        v2.1.x, v2.1.x-errata2, v2.2.x
//   ozone-connect:  v2.1.x, v2.1.x-errata2, v2.2.x
//
// `.x`, `-rcN` and `-errataN` are all qualifiers on the same release, so
// folders are grouped by the release they qualify rather than matched literally.

const CATEGORIES = ['standards', 'api-hub', 'ozone-connect']

/**
 * The release a folder (or a SPEC_FOLDER chain entry) belongs to, with its
 * qualifiers stripped: `v2.2-rc1` and `v2.2.x` are both the v2.2 release.
 */
function releaseOf(folder) {
  return folder
    .replace(/-errata\d+$/, '')
    .replace(/-rc\d+$/, '')
    .replace(/\.x$/, '')
}

/**
 * Where a folder sits within its release. Lower comes first, and later entries
 * override earlier ones, so the order is: release candidates, then the base
 * release, then errata in ascending order.
 */
function folderRank(folder) {
  const errata = folder.match(/-errata(\d+)$/)
  if (errata) return parseInt(errata[1], 10)
  const rc = folder.match(/-rc(\d+)$/)
  if (rc) return parseInt(rc[1], 10) - 1000
  return 0
}

/**
 * Given a list of remote folder names and a version, return those belonging to
 * the same release, ordered so the last entry is the one that wins.
 */
function sortVersionFolders(folders, version) {
  const release = releaseOf(version)
  return folders
    .filter(folder => releaseOf(folder) === release)
    .map(folder => ({ folder, rank: folderRank(folder) }))
    .sort((a, b) => a.rank - b.rank)
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

async function fetchCategory(version, chain, targetProtocol, category) {
  // Output is keyed by the LOCAL version; the upstream folders it resolves from
  // may differ (see SPEC_FOLDER in src/data/versions.ts).
  const outDir = resolve(ROOT, 'public', 'openapi', version, category)

  // Skip if already populated (only when --skip-existing is set)
  if (SKIP_EXISTING && existsSync(outDir) && readdirSync(outDir).some(f => f.endsWith('.yaml'))) {
    console.log(`  ✓ ${category} — already present (omit --skip-existing to re-fetch)`)
    return
  }

  // 1. List version folders for this category
  const distPath = `dist/${category}`
  const remoteDirs = await ghListDir(distPath)
  const folderNames = remoteDirs.filter(d => d.type === 'dir').map(d => d.name)

  // 2. Collect files, walking the chain from LEAST to MOST preferred and, within
  //    each release, from base to highest errata. Later entries overwrite
  //    earlier ones, so a file lands on the most preferred release that
  //    publishes it and everything else falls back down the chain.
  const fileMap = new Map() // filename → { remotePath, sourceRelease }
  const releasesUsed = []

  for (const chainEntry of [...chain].reverse()) {
    const sorted = sortVersionFolders(folderNames, chainEntry)
    if (sorted.length === 0) continue
    releasesUsed.push(releaseOf(chainEntry))
    for (const { folder } of sorted) {
      const versionPath = `dist/${category}/${folder}`
      const files = await ghListDir(versionPath)
      for (const f of files) {
        if (f.type === 'file' && f.name.endsWith('.yaml')) {
          fileMap.set(f.name, {
            remotePath: `${versionPath}/${f.name}`,
            sourceRelease: releaseOf(folder),
          })
        }
      }
    }
  }

  if (releasesUsed.length === 0) {
    console.warn(`  ⚠ ${category} — no matching folders found for ${chain.join(' → ')}`)
    return
  }

  if (fileMap.size === 0) {
    console.warn(`  ⚠ ${category} — no YAML files found`)
    return
  }

  // 3. Download all resolved files, uplifting only those borrowed from a release
  //    older than the one this version documents.
  mkdirSync(outDir, { recursive: true })

  let uplifted = 0
  const downloads = [...fileMap.entries()].map(async ([filename, { remotePath, sourceRelease }]) => {
    let content = await ghDownloadFile(remotePath)
    if (sourceRelease !== targetProtocol) {
      content = upliftProtocolVersion(content, sourceRelease, targetProtocol)
      uplifted++
    }
    writeFileSync(resolve(outDir, filename), content, 'utf-8')
    return filename
  })

  const downloaded = await Promise.all(downloads)
  const note = uplifted === 0 ? '' : ` (${uplifted} borrowed, version strings uplifted to ${targetProtocol})`
  console.log(`  ✓ ${category} — ${downloaded.length} file(s)${note}`)
}

async function main() {
  const versions = parseVersions()
  const specFolders = parseSpecFolders()
  const protocolVersions = parseProtocolVersions()
  console.log(`Fetching OpenAPI specs for versions: ${versions.join(', ')}\n`)

  for (const version of versions) {
    const chain = specFolders[version] ?? [version]
    // Files borrowed from an older release carry that release's version strings,
    // so they are uplifted to the version this documentation publishes.
    const targetProtocol = protocolVersions[version] ?? version

    const note = chain.length === 1 && chain[0] === version
      ? ''
      : `  (upstream ${chain.join(', falling back to ')})`
    console.log(`${version}:${note}`)
    for (const category of CATEGORIES) {
      await fetchCategory(version, chain, targetProtocol, category)
    }
    console.log()
  }

  console.log('Done.')
}

main().catch(err => {
  console.error('Error fetching OpenAPI specs:', err)
  process.exit(1)
})

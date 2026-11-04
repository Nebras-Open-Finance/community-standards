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
 *   3. Downloads each YAML file to public/openapi/{version}/{category}/
 *      byte-for-byte as published upstream. Spec content is never modified,
 *      so a served spec can be compared directly with its source.
 *   4. Writes public/openapi/{version}/sources.json, recording the upstream
 *      file each spec was resolved from, so pages can link to it on GitHub.
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
 * `v2.2-rc2` takes what upstream publishes at v2.2 and falls back to v2.1.
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

// ─── Categories & version-folder mapping ───────────────────────────────────────
// Folder naming upstream is not uniform, either between categories or between
// releases:
//   standards:      v2.1, v2.1-errata3, v2.2-rc2
//   api-hub:        v2.1.x, v2.1.x-errata2, v2.2.x
//   ozone-connect:  v2.1.x, v2.1.x-errata2, v2.2.x
//
// `.x`, `-rcN` and `-errataN` are all qualifiers on the same release, so
// folders are grouped by the release they qualify rather than matched literally.

const CATEGORIES = ['standards', 'api-hub', 'ozone-connect']

/**
 * The release a folder (or a SPEC_FOLDER chain entry) belongs to, with its
 * qualifiers stripped: `v2.2-rc2` and `v2.2.x` are both the v2.2 release.
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

// raw.githubusercontent.com intermittently answers 404 (or 5xx) for a file
// that exists — the API listing named it moments earlier — and one bad
// response would otherwise abort the whole run. Retry with backoff first.
const DOWNLOAD_ATTEMPTS = 4

async function ghDownloadFile(remotePath) {
  const url = `${GITHUB_RAW}/${remotePath}`
  let failure
  for (let attempt = 1; attempt <= DOWNLOAD_ATTEMPTS; attempt++) {
    if (attempt > 1) {
      console.warn(`  ↻ retrying ${remotePath} (${failure})`)
      await new Promise(r => setTimeout(r, 1000 * 2 ** (attempt - 2)))
    }
    try {
      const res = await fetch(url, { headers })
      if (res.ok) return Buffer.from(await res.arrayBuffer())
      failure = res.status
    } catch (err) {
      failure = err.message
    }
  }
  throw new Error(`Download failed ${failure} after ${DOWNLOAD_ATTEMPTS} attempts: ${url}`)
}

// ─── Main ──────────────────────────────────────────────────────────────────────

// ─── Sources manifest ──────────────────────────────────────────────────────────
// public/openapi/{version}/sources.json maps each served spec to the upstream
// file it was resolved from:
//
//   { repo, branch, files: { "{category}/{filename}": { path, folder } } }
//
// `path` is the repo-relative path (e.g. dist/standards/v2.1-errata3/x.yaml)
// and `folder` the upstream version folder it sits in. The release-candidate
// banner uses it to link a spec page to the exact files on GitHub.

function sourcesPath(version) {
  return resolve(ROOT, 'public', 'openapi', version, 'sources.json')
}

/** The existing manifest's entries, kept for categories skipped by --skip-existing. */
function readSources(version) {
  const p = sourcesPath(version)
  if (!existsSync(p)) return {}
  try {
    return JSON.parse(readFileSync(p, 'utf-8')).files ?? {}
  } catch {
    return {}
  }
}

function writeSources(version, files) {
  mkdirSync(dirname(sourcesPath(version)), { recursive: true })
  const sorted = Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b)))
  const manifest = { repo: `${REPO_OWNER}/${REPO_NAME}`, branch: BRANCH, files: sorted }
  writeFileSync(sourcesPath(version), JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
}

/**
 * Fetches one category's specs for a version. Returns the upstream source of
 * each file written, keyed by `{category}/{filename}`, or null when the
 * category was skipped and its existing manifest entries should be kept.
 */
async function fetchCategory(version, chain, category) {
  // Output is keyed by the LOCAL version; the upstream folders it resolves from
  // may differ (see SPEC_FOLDER in src/data/versions.ts).
  const outDir = resolve(ROOT, 'public', 'openapi', version, category)

  // Skip if already populated (only when --skip-existing is set)
  if (SKIP_EXISTING && existsSync(outDir) && readdirSync(outDir).some(f => f.endsWith('.yaml'))) {
    console.log(`  ✓ ${category} — already present (omit --skip-existing to re-fetch)`)
    return null
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
    return {}
  }

  if (fileMap.size === 0) {
    console.warn(`  ⚠ ${category} — no YAML files found`)
    return {}
  }

  // 3. Download all resolved files and write them unchanged. A file borrowed
  //    from an earlier release down the chain is served exactly as that
  //    release published it, version strings included.
  mkdirSync(outDir, { recursive: true })

  const ownRelease = releaseOf(chain[0])
  let borrowed = 0
  const downloads = [...fileMap.entries()].map(async ([filename, { remotePath, sourceRelease }]) => {
    const content = await ghDownloadFile(remotePath)
    if (sourceRelease !== ownRelease) borrowed++
    writeFileSync(resolve(outDir, filename), content)
    return filename
  })

  const downloaded = await Promise.all(downloads)
  const note = borrowed > 0 ? ` (${borrowed} borrowed)` : ''
  console.log(`  ✓ ${category} — ${downloaded.length} file(s)${note}`)

  const sources = {}
  for (const [filename, { remotePath }] of fileMap) {
    sources[`${category}/${filename}`] = {
      path: remotePath,
      folder: remotePath.split('/').slice(-2, -1)[0],
    }
  }
  return sources
}

async function main() {
  const versions = parseVersions()
  const specFolders = parseSpecFolders()
  console.log(`Fetching OpenAPI specs for versions: ${versions.join(', ')}\n`)

  for (const version of versions) {
    const chain = specFolders[version] ?? [version]

    const note = chain.length === 1 && chain[0] === version
      ? ''
      : `  (upstream ${chain.join(', falling back to ')})`
    console.log(`${version}:${note}`)
    const sources = readSources(version)
    for (const category of CATEGORIES) {
      const fetched = await fetchCategory(version, chain, category)
      if (fetched === null) continue
      for (const key of Object.keys(sources)) {
        if (key.startsWith(`${category}/`)) delete sources[key]
      }
      Object.assign(sources, fetched)
    }
    writeSources(version, sources)
    console.log()
  }

  console.log('Done.')
}

main().catch(err => {
  console.error('Error fetching OpenAPI specs:', err)
  process.exit(1)
})

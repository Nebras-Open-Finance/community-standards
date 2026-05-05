/**
 * Fetches the Postman collection(s) from the Nebras-Open-Finance/postman
 * repository to public/postman/ so the TPP Postman Script Builder form serves
 * them from the same origin.
 *
 * This avoids two failure modes that hit users when the browser fetches
 * raw.githubusercontent.com directly:
 *   - corporate SWGs (Zscaler/Netskope/etc.) blocking GitHub raw downloads
 *     and returning 403 to the user
 *   - the unauthenticated raw-content rate limit on shared NAT egress IPs
 *
 * Usage:  node scripts/fetch-postman-collections.mjs [--branch <name>]
 *   --branch <name>  Fetch from a specific branch (default: main).
 *
 * The branch can also be set via the POSTMAN_BRANCH env variable.
 * CLI --branch takes precedence over POSTMAN_BRANCH.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

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
const OUT_DIR = resolve(ROOT, 'public', 'postman')

const REPO_OWNER = 'Nebras-Open-Finance'
const REPO_NAME = 'postman'
const FILES = ['banking.postman_collection.json']

function parseBranch() {
  const idx = process.argv.indexOf('--branch')
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  return process.env.POSTMAN_BRANCH || 'main'
}
const BRANCH = parseBranch()

const headers = {
  'Accept': 'application/vnd.github.v3.raw',
  'User-Agent': 'nebras-postman-fetch',
}
if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
}

async function fetchOne(filename) {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${filename}`
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`)
  const text = await res.text()
  JSON.parse(text)
  return text
}

async function main() {
  console.log(`Fetching Postman collections from ${REPO_OWNER}/${REPO_NAME}@${BRANCH}\n`)
  mkdirSync(OUT_DIR, { recursive: true })
  for (const filename of FILES) {
    const content = await fetchOne(filename)
    writeFileSync(resolve(OUT_DIR, filename), content, 'utf-8')
    console.log(`  ✓ ${filename}`)
  }
  console.log('\nDone.')
}

main().catch(err => {
  console.error('Error fetching Postman collections:', err)
  process.exit(1)
})

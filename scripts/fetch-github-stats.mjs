/**
 * Fetches build-time stats for the Nebras-Open-Finance GitHub org and writes
 * them to docs/public/api/github-stats.json for the homepage Community section.
 *
 * Stats collected:
 *   - openPRs / openIssues   (search API, single call each)
 *   - contributors           (aggregated unique logins across all org repos)
 *   - recentCommits          (commits authored in the last 30 days)
 *   - topContributors        (top 12, with avatar + profile URL)
 *
 * Soft-fails: if GitHub is rate-limiting or unreachable, logs a warning and
 * exits 0 without overwriting any existing JSON. The Community section reads
 * via fetch('/api/github-stats.json') and tolerates a missing file.
 *
 * Auth: picks up GITHUB_TOKEN from env if present (1000 req/hr vs 60 unauth).
 *
 * Usage:  node scripts/fetch-github-stats.mjs [--org <name>]
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_PATH = resolve(ROOT, 'docs', 'public', 'api', 'github-stats.json')

const DEFAULT_ORG = 'Nebras-Open-Finance'
const API = 'https://api.github.com'
const THIRTY_DAYS_MS = 30 * 24 * 3600 * 1000

function parseOrg() {
  const idx = process.argv.indexOf('--org')
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1]
  return process.env.GITHUB_ORG || DEFAULT_ORG
}

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'altareq-build',
}
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function gh(path) {
  const res = await fetch(`${API}${path}`, { headers })
  if (!res.ok) throw new Error(`GitHub ${res.status} ${res.statusText} for ${path}`)
  return res.json()
}

async function main() {
  const org = parseOrg()
  console.log(`Fetching GitHub stats for ${org}…`)

  const [prSearch, issueSearch, repos] = await Promise.all([
    gh(`/search/issues?q=org:${org}+is:pr+is:open&per_page=1`),
    gh(`/search/issues?q=org:${org}+is:issue+is:open&per_page=1`),
    gh(`/orgs/${org}/repos?per_page=100&type=public`),
  ])

  const openPRs = prSearch.total_count ?? 0
  const openIssues = issueSearch.total_count ?? 0
  const repoNames = repos.map(r => r.name)

  const since = new Date(Date.now() - THIRTY_DAYS_MS).toISOString()
  const contributorsByLogin = new Map()
  let recentCommits = 0

  for (const repo of repoNames) {
    try {
      const [contribs, commits] = await Promise.all([
        gh(`/repos/${org}/${repo}/contributors?per_page=100&anon=0`),
        gh(`/repos/${org}/${repo}/commits?since=${since}&per_page=100`),
      ])
      for (const c of contribs) {
        if (!c.login || c.type === 'Bot') continue
        const existing = contributorsByLogin.get(c.login) || {
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: 0,
        }
        existing.contributions += c.contributions || 0
        contributorsByLogin.set(c.login, existing)
      }
      recentCommits += Array.isArray(commits) ? commits.length : 0
    } catch (err) {
      console.warn(`  ! ${repo}: ${err.message}`)
    }
  }

  const ranked = Array.from(contributorsByLogin.values())
    .sort((a, b) => b.contributions - a.contributions)

  const out = {
    fetchedAt: new Date().toISOString(),
    org,
    repoCount: repoNames.length,
    openPRs,
    openIssues,
    contributors: ranked.length,
    recentCommits,
    topContributors: ranked.slice(0, 12).map(c => ({
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
    })),
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true })
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + '\n')

  console.log(`✓ Wrote ${OUT_PATH}`)
  console.log(`  Repos: ${repoNames.length}  Open PRs: ${openPRs}  Open issues: ${openIssues}`)
  console.log(`  Contributors: ${ranked.length}  Commits 30d: ${recentCommits}`)
}

main().catch(err => {
  console.warn('fetch-github-stats: soft-failing —', err.message)
  process.exit(0)
})

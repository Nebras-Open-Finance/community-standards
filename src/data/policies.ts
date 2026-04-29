import generatedRoutes from '~pages'
import type { RouteRecordRaw } from 'vue-router'
import type { Policy, PolicyCategory, PolicyMeta } from '@/types/policy'

const SHORT_NAMES: Record<string, string> = {
  'Licensed Financial Institutions (LFIs)': 'LFI',
  'Third-Party Providers (TPPs)': 'TPP',
  'System Integrators and Technology Service Providers': 'Integrators',
  Nebras: 'Nebras',
  'Ozone (API Hub)': 'Ozone',
  'Raidiam (Trust Framework)': 'Raidiam',
}

// Slugs not listed go to the end.
const ORDER: readonly string[] = [
  'version-management',
  'lfi-deprecation',
  'ozone-connect-availability',
  'ozone-connect-response-time',
  'ozone-connect-data-quality',
  'changes-to-published-content',
  'secure-management',
  'open-license-contribution-agreement',
] as const

function shortName(actor: string): string {
  const known = SHORT_NAMES[actor]
  if (known !== undefined) return known
  const paren = /^(.+?)\s*\(/.exec(actor)
  if (paren && paren[1]) return paren[1].trim()
  return actor
}

function readPolicyMeta(meta: unknown): PolicyMeta | null {
  if (!meta || typeof meta !== 'object') return null
  const m = meta as Record<string, unknown>
  if (m['isIndex'] === true) return null

  const title = typeof m['title'] === 'string' ? m['title'] : ''
  const purpose = typeof m['purpose'] === 'string' ? m['purpose'] : ''
  const readTime = typeof m['readTime'] === 'string' ? m['readTime'] : ''
  const updated = typeof m['updated'] === 'string' ? m['updated'] : ''
  const appliesToRaw = m['appliesTo']
  const appliesTo = Array.isArray(appliesToRaw)
    ? appliesToRaw.filter((x): x is string => typeof x === 'string')
    : []

  if (!title) return null
  return { title, purpose, readTime, updated, appliesTo }
}

function slugFromPath(path: string): string {
  const trimmed = path.replace(/\/+$/, '')
  const idx = trimmed.lastIndexOf('/')
  return idx >= 0 ? trimmed.slice(idx + 1) : trimmed
}

function buildPolicy(route: RouteRecordRaw, meta: PolicyMeta): Policy {
  const path = route.path
  const slug = slugFromPath(path)
  const appliesToShort = meta.appliesTo.map(shortName)
  const isNebrasOnly =
    appliesToShort.length > 0 && appliesToShort.every(a => a === 'Nebras')
  const category: PolicyCategory =
    appliesToShort.length === 0 ? '' : isNebrasOnly ? 'Nebras' : 'Participants'

  return {
    slug,
    url: `/policy/${slug}`,
    title: meta.title,
    appliesTo: meta.appliesTo,
    appliesToShort,
    category,
    purpose: meta.purpose,
    readTime: meta.readTime,
    updated: meta.updated,
  }
}

function flatten(routes: readonly RouteRecordRaw[]): RouteRecordRaw[] {
  const out: RouteRecordRaw[] = []
  for (const r of routes) {
    out.push(r)
    if (r.children && r.children.length > 0) out.push(...flatten(r.children))
  }
  return out
}

const POLICY_DETAIL_PATH = /^\/policy\/[^/]+\/?$/

export const policies: Policy[] = flatten(generatedRoutes)
  .filter(r => POLICY_DETAIL_PATH.test(r.path))
  .map(r => {
    const meta = readPolicyMeta(r.meta)
    return meta ? buildPolicy(r, meta) : null
  })
  .filter((p): p is Policy => p !== null)
  .sort((a, b) => {
    const ai = ORDER.indexOf(a.slug)
    const bi = ORDER.indexOf(b.slug)
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

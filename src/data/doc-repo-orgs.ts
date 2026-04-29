// Phase 5b-iv — Document Repository org registry.
//
// Adapts `docs/doc-repository/_orgs.ts` for the new tree. The original used
// Node `readFileSync` to slurp `trust-framework.json` at module-load time;
// that works in VitePress's build process but breaks in the Vite client/dev
// runtime. Here we use Vite's built-in JSON import support
// (`tsconfig.json` `resolveJsonModule: true`), which:
//
//   * On SSR/SSG: reads the file at build time and inlines the JSON.
//   * In the browser: ships the JSON as part of the JS bundle (no fetch).
//
// Either way the module exports a static, typed array — same evaluation model
// as `@/data/policies` and `@/data/articles`.
//
// `docRepoIds` is consumed by `vite.config.ts` `ssgOptions.includedRoutes`
// to enumerate the static `/doc-repository/{id}/` paths. If the JSON yields
// zero production orgs, we log loudly so the SSG crawl doesn't silently
// produce zero `[id]` pages (R1 in the migration spec).

// The trust-framework.json file lives in `public/api/`. Public assets are
// not normally importable by source modules — but the file is also tracked
// here as plain JSON, so Vite's JSON loader handles it fine. The path is
// relative to this file (`src/data/`).
import rawData from '../../public/api/trust-framework.json'

export type DocRepoOrgType = 'LFI' | 'TPP' | 'Authority'

export interface DocRepoOrg {
  id: string
  name: string
  legalName: string
  logoUri: string | null
  type: DocRepoOrgType
  isProduction: boolean
  lfiGoLiveDate?: string
  tppGoLiveDate?: string
}

const ORG_TYPES: readonly DocRepoOrgType[] = ['LFI', 'TPP', 'Authority']

function isOrgType(candidate: unknown): candidate is DocRepoOrgType {
  return typeof candidate === 'string' && (ORG_TYPES as readonly string[]).includes(candidate)
}

// Narrow the loose `unknown[]` from a JSON import into the typed shape we
// need. Fields not present default to safe values; rows missing the
// non-optional fields (`id`, `name`, `legalName`, `type`) are dropped.
function narrow(raw: unknown): DocRepoOrg | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>

  const id = typeof r['id'] === 'string' ? r['id'] : ''
  const name = typeof r['name'] === 'string' ? r['name'] : ''
  const legalName = typeof r['legalName'] === 'string' ? r['legalName'] : ''
  const typeRaw = r['type']
  if (!id || !name || !legalName || !isOrgType(typeRaw)) return null

  const logoUriRaw = r['logoUri']
  const logoUri =
    typeof logoUriRaw === 'string' ? logoUriRaw : logoUriRaw === null ? null : null

  const isProduction = r['isProduction'] === true

  const org: DocRepoOrg = {
    id,
    name,
    legalName,
    logoUri,
    type: typeRaw,
    isProduction,
  }
  if (typeof r['lfiGoLiveDate'] === 'string') org.lfiGoLiveDate = r['lfiGoLiveDate']
  if (typeof r['tppGoLiveDate'] === 'string') org.tppGoLiveDate = r['tppGoLiveDate']
  return org
}

const allOrgs: DocRepoOrg[] = (Array.isArray(rawData) ? rawData : [])
  .map(narrow)
  .filter((o): o is DocRepoOrg => o !== null)

// Doc-repo pages only exist for production participants (pages host their
// onboarding paperwork). Sandbox-only orgs have no paperwork to publish.
export const docRepoOrgs: DocRepoOrg[] = allOrgs.filter(o => o.isProduction === true)

// IDs are what `includedRoutes()` uses to enumerate `[id].vue` permutations.
export const docRepoIds: string[] = docRepoOrgs.map(o => o.id)

if (docRepoIds.length === 0) {
  // Hard pre-check (R1): if `trust-framework.json` is missing or malformed at
  // build time, no `[id]` pages render and they 404 in production.
  // eslint-disable-next-line no-console
  console.error(
    '[doc-repository] No production orgs found in trust-framework.json — SSG will produce zero [id] pages.',
  )
}

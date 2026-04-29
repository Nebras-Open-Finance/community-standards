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

// Sandbox-only orgs have no onboarding paperwork to publish.
export const docRepoOrgs: DocRepoOrg[] = allOrgs.filter(o => o.isProduction === true)

export const docRepoIds: string[] = docRepoOrgs.map(o => o.id)

if (docRepoIds.length === 0) {
  // eslint-disable-next-line no-console
  console.error(
    '[doc-repository] No production orgs found in trust-framework.json — SSG will produce zero [id] pages.',
  )
}

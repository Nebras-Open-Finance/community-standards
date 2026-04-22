import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TF_PATH = resolve(__dirname, '../public/api/trust-framework.json')

export interface DocRepoOrg {
  OrganisationId: string
  OrganisationName: string
  LogoUri?: string
  LegalEntityName?: string
  Status: string
  Size?: string
  Authority?: boolean
  isProduction: boolean
}

const data = JSON.parse(readFileSync(TF_PATH, 'utf-8'))

export const docRepoOrgs: DocRepoOrg[] = data.organisations
  .filter((o: DocRepoOrg) => o.isProduction === true && o.Status === 'Active')

function classify(o: DocRepoOrg): string {
  if (o.Authority) return 'Authority'
  if (o.Size === 'TPP') return 'TPP'
  if (o.Size === 'LFI') return 'LFI'
  return ''
}

export const docRepoPaths = docRepoOrgs.map((o) => ({
  params: {
    id: o.OrganisationId,
    name: o.OrganisationName,
    logo: o.LogoUri || '',
    legalName: o.LegalEntityName || o.OrganisationName,
    type: classify(o),
  },
}))

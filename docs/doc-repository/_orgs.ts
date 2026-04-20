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
  isProduction: boolean
}

const data = JSON.parse(readFileSync(TF_PATH, 'utf-8'))

export const docRepoOrgs: DocRepoOrg[] = data.organisations
  .filter((o: DocRepoOrg) => o.isProduction === true && o.Status === 'Active')

export const docRepoPaths = docRepoOrgs.map((o) => ({
  params: {
    id: o.OrganisationId,
    name: o.OrganisationName,
    logo: o.LogoUri || '',
    legalName: o.LegalEntityName || o.OrganisationName,
  },
}))

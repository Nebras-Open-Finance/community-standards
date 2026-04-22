import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TF_PATH = resolve(__dirname, '../public/api/trust-framework.json')

export interface DocRepoOrg {
  id: string
  name: string
  legalName: string
  logoUri: string | null
  type: 'LFI' | 'TPP' | 'Authority'
  isProduction: boolean
  lfiGoLiveDate?: string
  tppGoLiveDate?: string
}

const data: DocRepoOrg[] = JSON.parse(readFileSync(TF_PATH, 'utf-8'))

// Doc-repo pages only exist for production participants (pages host their
// onboarding paperwork). Sandbox-only orgs have no paperwork to publish.
export const docRepoOrgs: DocRepoOrg[] = data.filter(o => o.isProduction === true)

export const docRepoPaths = docRepoOrgs.map((o) => ({
  params: {
    id: o.id,
    name: o.name,
    logo: o.logoUri || '',
    legalName: o.legalName,
    type: o.type,
  },
}))

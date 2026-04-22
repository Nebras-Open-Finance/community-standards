import type { DefaultTheme } from 'vitepress'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TF_PATH = resolve(__dirname, '../../../public/api/trust-framework.json')
const BASE = '/doc-repository'

interface Organisation {
  OrganisationId: string
  OrganisationName: string
  Status: string
  isProduction: boolean
}

const data = JSON.parse(readFileSync(TF_PATH, 'utf-8'))
const orgs: Organisation[] = data.organisations
  .filter((o: Organisation) => o.isProduction === true && o.Status === 'Active')
  .sort((a: Organisation, b: Organisation) => a.OrganisationName.localeCompare(b.OrganisationName))

const orgItems: DefaultTheme.SidebarItem[] = orgs.map(o => ({
  text: o.OrganisationName,
  link: `${BASE}/${o.OrganisationId}/`,
}))

export const docRepositorySidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Document Repository',
    items: orgItems,
  },
]

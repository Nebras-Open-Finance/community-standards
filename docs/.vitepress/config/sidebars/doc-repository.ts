import type { DefaultTheme } from 'vitepress'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TF_PATH = resolve(__dirname, '../../../public/api/trust-framework.json')
const BASE = '/doc-repository'

interface Organisation {
  id: string
  name: string
  isProduction: boolean
}

const data: Organisation[] = JSON.parse(readFileSync(TF_PATH, 'utf-8'))
const orgs = data
  .filter(o => o.isProduction === true)
  .sort((a, b) => a.name.localeCompare(b.name))

const orgItems: DefaultTheme.SidebarItem[] = orgs.map(o => ({
  text: o.name,
  link: `${BASE}/${o.id}/`,
}))

export const docRepositorySidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Document Repository',
    items: orgItems,
  },
]

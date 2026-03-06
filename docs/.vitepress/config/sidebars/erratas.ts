import type { DefaultTheme } from 'vitepress'
import { readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = '/erratas'
const __dirname = dirname(fileURLToPath(import.meta.url))
const ERRATAS_DIR = resolve(__dirname, '../../../erratas')

const toTitle = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const errataItems: DefaultTheme.SidebarItem[] = readdirSync(ERRATAS_DIR, { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'index.md')
  .map(entry => entry.name.replace(/\.md$/i, ''))
  .sort((a, b) => a.localeCompare(b))
  .map(slug => ({
    text: toTitle(slug),
    link: `${BASE}/${slug}`,
  }))

export const erratasSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Erratas',
    items: errataItems,
  },
]

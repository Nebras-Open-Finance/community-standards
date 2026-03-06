import type { DefaultTheme } from 'vitepress'
import { readdirSync } from 'node:fs'
import { dirname, posix, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = '/knowledge-base'
const __dirname = dirname(fileURLToPath(import.meta.url))
const KB_DIR = resolve(__dirname, '../../../knowledge-base')

const toTitle = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const getMarkdownFiles = (dir: string): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath))
      continue
    }
    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

const kbItems: DefaultTheme.SidebarItem[] = getMarkdownFiles(KB_DIR)
  .map(fullPath => relative(KB_DIR, fullPath).replace(/\\/g, '/'))
  .filter(relPath => relPath.toLowerCase() !== 'index.md')
  .map(relPath => relPath.replace(/\.md$/i, ''))
  .sort((a, b) => a.localeCompare(b))
  .map(relPath => ({
    text: toTitle(posix.basename(relPath)),
    link: `${BASE}/${relPath}`,
  }))

export const kbSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Knowledge Base',
    items: kbItems,
  },
]

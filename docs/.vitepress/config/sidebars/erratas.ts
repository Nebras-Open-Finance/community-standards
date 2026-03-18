import type { DefaultTheme } from 'vitepress'
import { readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CURRENT_VERSION } from '../../version'

const BASE = `/tech/erratas/${CURRENT_VERSION}`
const __dirname = dirname(fileURLToPath(import.meta.url))


export const erratasSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: `Errata Items`,
    items: 
    [
      { text: 'No errata items'}
    ],
  },
]

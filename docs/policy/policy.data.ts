import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function extractTitle(content: string): string {
  const m = /^# (.+)$/m.exec(content)
  return m ? m[1].trim() : ''
}

function extractSection(content: string, pattern: RegExp): string {
  const m = pattern.exec(content)
  if (!m) return ''
  const rest = content.slice(m.index + m[0].length)
  const next = /^## /m.exec(rest)
  return (next ? rest.slice(0, next.index) : rest).trim()
}

function parseAppliesTo(section: string): string[] {
  return section
    .split('\n')
    .filter(l => /^-\s/.test(l))
    .map(l => l.replace(/^-\s+\*\*(.+?)\*\*.*$/, '$1').replace(/^-\s+/, '').replace(/\*\*/g, '').trim())
    .filter(Boolean)
}

function parsePurpose(section: string): string {
  const lines = section
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('-') && !l.startsWith('#'))
  return lines[0]?.replace(/\*\*/g, '').trim() || ''
}

const ORDER = [
  'version-management',
  'lfi-deprecation',
  'changes-to-published-content',
  'secure-management',
  'open-license-contribution-agreement',
]

export default {
  load() {
    return readdirSync(__dirname)
      .filter(f => f.endsWith('.md') && f !== 'index.md')
      .map(file => {
        const content = readFileSync(resolve(__dirname, file), 'utf-8')
        const slug = file.replace('.md', '')
        return {
          slug,
          title: extractTitle(content),
          url: `/policy/${slug}`,
          appliesTo: parseAppliesTo(extractSection(content, /^## [Aa]p+lies [Tt]o:?.*$/m)),
          purpose: parsePurpose(extractSection(content, /^## Purpose.*$/m)),
        }
      })
      .sort((a, b) => {
        const ai = ORDER.indexOf(a.slug)
        const bi = ORDER.indexOf(b.slug)
        if (ai === -1 && bi === -1) return 0
        if (ai === -1) return 1
        if (bi === -1) return -1
        return ai - bi
      })
  }
}

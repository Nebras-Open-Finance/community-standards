import { readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SHORT_NAMES: Record<string, string> = {
  'Licensed Financial Institutions (LFIs)': 'LFI',
  'Third-Party Providers (TPPs)': 'TPP',
  'System Integrators and Technology Service Providers': 'Integrators',
  Nebras: 'Nebras',
  'Ozone (API Hub)': 'Ozone',
  'Raidiam (Trust Framework)': 'Raidiam',
}

function shortName(actor: string): string {
  if (SHORT_NAMES[actor]) return SHORT_NAMES[actor]
  const paren = /^(.+?)\s*\(/.exec(actor)
  if (paren) return paren[1].trim()
  return actor
}

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

function parseFrontmatterField(content: string, field: string): string {
  const fm = /^---\n([\s\S]*?)\n---/.exec(content)
  if (!fm) return ''
  const m = new RegExp(`^${field}:\\s*"?([^"\\n]+)"?\\s*$`, 'm').exec(fm[1])
  return m ? m[1].trim() : ''
}

const ORDER = [
  'version-management',
  'lfi-deprecation',
  'ozone-connect-availability',
  'ozone-connect-response-time',
  'ozone-connect-data-quality',
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
        const appliesTo = parseAppliesTo(extractSection(content, /^## [Aa]p+lies [Tt]o:?.*$/m))
        const appliesToShort = appliesTo.map(shortName)
        const isNebrasOnly = appliesToShort.length > 0
          && appliesToShort.every(a => a === 'Nebras')
        const category = appliesToShort.length === 0
          ? ''
          : isNebrasOnly ? 'Nebras' : 'Participants'
        return {
          slug,
          title: extractTitle(content),
          url: `/policy/${slug}`,
          appliesTo,
          appliesToShort,
          category,
          purpose: parsePurpose(extractSection(content, /^## Purpose.*$/m)),
          readTime: parseFrontmatterField(content, 'readTime'),
          updated: parseFrontmatterField(content, 'updated'),
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
  },
}

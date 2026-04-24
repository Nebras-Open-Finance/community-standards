import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { tppSidebar } from './config/sidebars/tpp'
import { lfiSidebar } from './config/sidebars/lfi'
import { policySidebar, processesSidebar } from './config/sidebars/policy'
import { kbSidebar } from './config/sidebars/kb'
import { apiSpecsSidebar } from './config/sidebars/api-specs'
import { docRepositorySidebar } from './config/sidebars/doc-repository'
import { CURRENT_VERSION } from './version'

// Production domain for the community-standards site.
// Referenced by sitemap, robots.txt, and Open Graph / Twitter meta tags.
const SITE_URL = 'https://nebras-open-finance.com'
const SITE_TITLE = 'UAE Open Finance — Community Standards'
const SITE_DESCRIPTION = 'Community-driven, experimental documentation for the UAE Open Finance standards (TPP, LFI, API Hub). Not the official source of truth.'
const SITE_OG_IMAGE = `${SITE_URL}/AlTareq.png`

const MAX_META_DESCRIPTION = 160

function stripInlineMarkdown(s: string): string {
  return s
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFirstParagraph(filePath: string): string {
  let src: string
  try {
    src = readFileSync(filePath, 'utf8')
  } catch {
    return ''
  }
  const body = src.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  const lines = body.split(/\r?\n/)
  const para: string[] = []
  let inFence = false
  let inContainer = 0
  for (const raw of lines) {
    const line = raw.trim()
    if (/^```/.test(line)) { inFence = !inFence; continue }
    if (inFence) continue
    if (/^:::/.test(line)) {
      inContainer += line === ':::' ? -1 : 1
      continue
    }
    if (inContainer > 0) continue
    if (!line) {
      if (para.length) break
      continue
    }
    // Skip structural lines (headings, HTML, imports, tables, lists, blockquotes, snippets)
    if (/^(#{1,6}\s|<|import\s|export\s|\||-\s|\*\s|\d+\.\s|>\s|<!--|!\[)/.test(line)) {
      if (para.length) break
      continue
    }
    para.push(line)
    // Accumulate across wrapped lines until a blank line breaks it
  }
  if (!para.length) return ''
  const cleaned = stripInlineMarkdown(para.join(' '))
  if (cleaned.length <= MAX_META_DESCRIPTION) return cleaned
  // Truncate at a word boundary before the limit, append ellipsis
  const cut = cleaned.slice(0, MAX_META_DESCRIPTION - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
}

function relativePathToUrlPath(relativePath: string): string {
  const normalized = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  if (normalized === 'index') return '/'
  if (normalized.endsWith('/index')) return `/${normalized.slice(0, -'index'.length)}`
  return `/${normalized}`
}

const wellKnownProxyPlugin = {
  name: 'well-known-proxy',
  configureServer(server: any) {
    server.middlewares.use('/api/well-known-proxy', async (req: any, res: any) => {
      const targetUrl = new URL('http://localhost' + req.url).searchParams.get('url')
      if (!targetUrl) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Missing url parameter' }))
        return
      }
      try {
        const upstream = await fetch(targetUrl)
        const text = await upstream.text()
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end(text)
      } catch {
        res.statusCode = 502
        res.end(JSON.stringify({ error: 'Upstream fetch failed' }))
      }
    })
  }
}

export default defineConfig({
  markdown: {
    config(md) {
      md.core.ruler.push('version-badge', (state) => {
        const env = state.env as Record<string, any>
        const filePath: string = (env?.relativePath ?? env?.path ?? '').replace(/\\/g, '/')
        const versionMatch = filePath.match(/\/v(\d+\.\d+)\//)
        if (!versionMatch) return

        const version = `v${versionMatch[1]}`

        for (let i = 0; i < state.tokens.length - 1; i++) {
          const tok = state.tokens[i]
          if (tok.type === 'heading_open' && tok.tag === 'h1') {
            const inline = state.tokens[i + 1]
            if (inline?.type === 'inline' && !inline.content.includes('<Badge')) {
              inline.content += ` <Badge type="tip" text="${version}" />`
              if (inline.children) {
                const badge = new state.Token('html_inline', '', 0)
                badge.content = ` <Badge type="tip" text="${version}" />`
                inline.children.push(badge)
              }
            }
            break
          }
        }
      })
    },
  },
  title: 'UAE Open Finance',
  titleTemplate: ':title | UAE Open Finance',
  description: SITE_DESCRIPTION,
  lang: 'en',
  appearance: false,
  cleanUrls: true,
  sitemap: {
    hostname: SITE_URL,
  },
  head: [
    ['link', { rel: 'icon', href: '/fav.ico' }],
    // Editorial type system: Fraunces (display), Inter (body), IBM Plex Mono (caption/code)
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
    }],
    // Site-wide Open Graph (per-page og:title/og:description/og:url are emitted in transformPageData)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:image', content: SITE_OG_IMAGE }],
    // Site-wide Twitter (per-page twitter:title/twitter:description are emitted in transformPageData)
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: SITE_OG_IMAGE }],
  ],

  transformPageData(pageData, ctx) {
    const relPath = pageData.relativePath.replace(/\\/g, '/')
    const urlPath = relativePathToUrlPath(relPath)
    const canonicalUrl = `${SITE_URL}${urlPath}`

    let description = (pageData.frontmatter.description as string | undefined)?.trim()
    if (!description) {
      const absPath = resolve(ctx.siteConfig.srcDir, pageData.relativePath)
      description = extractFirstParagraph(absPath)
    }
    if (!description) description = SITE_DESCRIPTION

    // Feed the extracted description back into pageData so VitePress emits it
    // as <meta name="description">. Frontmatter wins, so only set when absent.
    if (!pageData.frontmatter.description) {
      pageData.description = description
    }

    // Page title as rendered by titleTemplate, for OG/Twitter (which don't use the template).
    const rawTitle = (pageData.title || '').trim()
    const ogTitle = !rawTitle || rawTitle === 'UAE Open Finance'
      ? SITE_TITLE
      : `${rawTitle} | UAE Open Finance`

    // Mark pages in superseded versions as noindex so future v2.x doesn't dilute rankings.
    const versionMatch = relPath.match(/\/v(\d+\.\d+)\//)
    const isSupersededVersion = versionMatch && `v${versionMatch[1]}` !== CURRENT_VERSION

    const managedKeys = new Set([
      'rel:canonical',
      'property:og:title',
      'property:og:description',
      'property:og:url',
      'name:twitter:title',
      'name:twitter:description',
      'name:robots',
    ])
    pageData.frontmatter.head = (pageData.frontmatter.head ?? []).filter(([, attrs]: [string, Record<string, string>?]) => {
      const key = attrs?.rel
        ? `rel:${attrs.rel}`
        : attrs?.property
          ? `property:${attrs.property}`
          : attrs?.name
            ? `name:${attrs.name}`
            : ''
      return !managedKeys.has(key)
    })
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: ogTitle }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: ogTitle }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'robots', content: isSupersededVersion ? 'noindex, follow' : 'index, follow' }],
    )
  },

  // Maps source file paths → versioned URL paths.
  // e.g. docs/tech/tpp-standards/banking/index.md → /tech/tpp-standards/v2.1/banking/
  rewrites: {
    'tech/tpp-standards/:path(.*)': 'tech/tpp-standards/:path',
    'tech/lfi-api-hub/:path(.*)': 'tech/lfi-api-hub/:path',
  },

  vite: {
    plugins: [wellKnownProxyPlugin],
    resolve: {
      alias: {
        '@components': resolve(__dirname, '../components'),
      },
    },
    optimizeDeps: {
      include: ['vue3-tel-input', 'mermaid', 'dayjs'],
    },
  },

  themeConfig: {
    siteTitle: false,
    sidebarMenuLabel: 'Sidebar',
    nav: [
      {
        text: 'Program',
        items: [
          { text: 'Policies', link: '/policy' },
          { text: 'Document Repository', link: '/doc-repository/' },
        ],
      },
      {
        text: 'Developer Docs',
        items: [
          { text: 'Open Finance Standards', link: '/tech/tpp-standards/' },
          { text: 'Integration Guide', link: '/tech/lfi-api-hub/' },
          { text: 'API Specs', link: '/tech/api-specs/' },
          { text: 'Knowledge Base', link: '/knowledge-base/' },
          { text: 'Release Notes & Erratas', link: '/tech/release-notes-and-erratas/' },
        ],
      },
      { text: 'Metrics', link: '/metrics' },
      { text: 'News', link: '/news' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Nebras-Open-Finance/community-standards' },
    ],

    search: {
      provider: 'local',
    },

    sidebar: {
      '/tech/tpp-standards/': tppSidebar,
      '/tech/lfi-api-hub/': lfiSidebar,
      [`/tech/api-specs/${CURRENT_VERSION}/`]: apiSpecsSidebar,
      '/tech/': [
        { text: 'TPP - Open Finance Standards', link: '/tech/tpp-standards/' },
        { text: 'LFI - Integration Guide', link: '/tech/lfi-api-hub/' },
        { text: 'API Specs', link: '/tech/api-specs/' },
        { text: 'Knowledge Base', link: '/knowledge-base/' },
        { text: 'Release Notes & Erratas', link: '/tech/release-notes-and-erratas/' },
      ],
      '/policy': policySidebar,
      '/processes': processesSidebar,
      '/knowledge-base': kbSidebar,
      '/doc-repository': docRepositorySidebar,
    },
  },
})


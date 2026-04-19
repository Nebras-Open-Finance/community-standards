import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { tppSidebar } from './config/sidebars/tpp'
import { lfiSidebar } from './config/sidebars/lfi'
import { policySidebar, processesSidebar } from './config/sidebars/policy'
import { kbSidebar } from './config/sidebars/kb'
import { erratasSidebar } from './config/sidebars/erratas'
import { apiSpecsSidebar } from './config/sidebars/api-specs'
import { docRepositorySidebar } from './config/sidebars/doc-repository'
import { CURRENT_VERSION } from './version'

// TODO: set to the real production domain before launch.
// Referenced by sitemap, robots.txt, and Open Graph / Twitter meta tags.
const SITE_URL = 'https://TODO-set-domain.example'
const SITE_TITLE = 'UAE Open Finance — Community Standards'
const SITE_DESCRIPTION = 'Community-driven, experimental documentation for the UAE Open Finance standards (TPP, LFI, API Hub). Not the official source of truth.'
const SITE_OG_IMAGE = `${SITE_URL}/AlTareq.png`

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
  description: SITE_DESCRIPTION,
  lang: 'en',
  appearance: false,
  sitemap: {
    hostname: SITE_URL,
  },
  head: [
    ['link', { rel: 'icon', href: '/fav.ico' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_TITLE }],
    ['meta', { property: 'og:title', content: SITE_TITLE }],
    ['meta', { property: 'og:description', content: SITE_DESCRIPTION }],
    ['meta', { property: 'og:url', content: SITE_URL }],
    ['meta', { property: 'og:image', content: SITE_OG_IMAGE }],
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: SITE_TITLE }],
    ['meta', { name: 'twitter:description', content: SITE_DESCRIPTION }],
    ['meta', { name: 'twitter:image', content: SITE_OG_IMAGE }],
  ],

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
    nav: [
      { text: 'Policies', link: '/policy' },
      {
        text: 'Developer Docs',
        items: [
          { text: 'TPP – Open Finance Standards', link: '/tech/tpp-standards/' },
          { text: 'LFI – Integration Guide', link: '/tech/lfi-api-hub/' },
          { text: 'API Specs', link: `/tech/api-specs/${CURRENT_VERSION}` },          
          { text: 'Knowledge Base', link: '/knowledge-base/' },
          { text: 'Erratas', link: `/tech/erratas/${CURRENT_VERSION}` },
        ],
      },
      { text: 'Metrics & Monitoring', link: '/metrics' },
      { text: 'Articles & News', link: '/news' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Nebras-Open-Finance/community-standards' },
    ],

    search: {
      provider: 'local',
    },

    sidebar: {
      '/tech/overview': [
        { text: 'TPP - Open Finance Standards', link: '/tech/tpp-standards/' },
        { text: 'LFI - Integration Guide', link: '/tech/lfi-api-hub/' },
        { text: 'API Specs', link: `/tech/api-specs/${CURRENT_VERSION}` },          
        { text: 'Knowledge Base', link: '/knowledge-base/' },
        { text: 'Erratas', link: `/tech/erratas/${CURRENT_VERSION}` },
      ],
      '/tech/tpp-standards': tppSidebar,
      '/tech/lfi-api-hub': lfiSidebar,
      '/policy': policySidebar,
      '/processes': processesSidebar,
      '/tech/erratas': erratasSidebar,
      '/knowledge-base': kbSidebar,
      '/doc-repository': docRepositorySidebar,
      [`/tech/api-specs/${CURRENT_VERSION}`]: apiSpecsSidebar,
    },
  },
})


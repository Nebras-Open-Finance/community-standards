import { defineConfig } from 'vitepress'
import { tppSidebar } from './config/sidebars/tpp'
import { lfiSidebar } from './config/sidebars/lfi'
import { policySidebar, processesSidebar } from './config/sidebars/policy'
import { kbSidebar } from './config/sidebars/kb'
import { erratasSidebar } from './config/sidebars/erratas'

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
  title: 'UAE Open Finance',
  ignoreDeadLinks: true, // <-- temporary
  description: 'Community-driven, experimental Open Finance documentation',
  appearance: false,
  head: [['link', { rel: 'icon', href: '/fav.ico' }]],

  // Maps source file paths → versioned URL paths.
  // e.g. docs/tech/tpp-standards/banking/index.md → /tech/tpp-standards/v2.1/banking/
  rewrites: {
    'tech/tpp-standards/:path(.*)': 'tech/tpp-standards/:path',
    'tech/lfi-api-hub/:path(.*)': 'tech/lfi-api-hub/:path',
  },

  vite: {
    plugins: [wellKnownProxyPlugin],
    optimizeDeps: {
      include: ['vue3-tel-input'],
    },
  },

  themeConfig: {
    siteTitle: false,
    nav: [
      { text: 'Policies', link: '/policy' },
      {
        text: 'Developer Docs',
        items: [
          { text: 'Technology Architecture & Overview', link: '/tech/overview' },
          { text: 'TPP – Open Finance Standards', link: '/tech/tpp-standards/' },
          { text: 'LFI – Integration Guide', link: '/tech/lfi-api-hub/' },
          { text: 'Erratas', link: '/erratas/' },
          { text: 'Knowledge Base', link: '/knowledge-base/' },
        ],
      },
      { text: 'Metrics & Monitoring', link: '/metrics' },
      { text: 'Articles & News', link: '/news' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AlTareq-OpenFinance/community-specs' },
    ],

    search: {
      provider: 'local',
    },

    sidebar: {
      '/tech/overview': [
        { text: 'TPP - Open Finance Standards', link: '/tech/tpp-standards/' },
        { text: 'LFI - Integration Guide', link: '/tech/lfi-api-hub/' },
      ],
      '/tech/tpp-standards': tppSidebar,
      '/tech/lfi-api-hub': lfiSidebar,
      '/policy': policySidebar,
      '/processes': processesSidebar,
      '/erratas': erratasSidebar,
      '/knowledge-base': kbSidebar,
    },
  },
})


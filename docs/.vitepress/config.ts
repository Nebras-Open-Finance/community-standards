import { defineConfig } from 'vitepress'
import { tppSidebar } from './config/sidebars/tpp'
import { lfiSidebar } from './config/sidebars/lfi'
import { policySidebar, processesSidebar } from './config/sidebars/policy'
import { kbSidebar } from './config/sidebars/kb'

export default defineConfig({
  title: 'UAE Open Finance',
//   ignoreDeadLinks: true, // <-- temporary
  description: 'Community-driven, experimental Open Finance documentation',
  appearance: false,
  head: [['link', { rel: 'icon', href: '/fav.ico' }]],

  // Maps source file paths → versioned URL paths.
  // e.g. docs/tech/tpp-standards/banking/index.md → /tech/tpp-standards/v2.1/banking/
  rewrites: {
    'tech/tpp-standards/:path(.*)': 'tech/tpp-standards/:path',
    'tech/lfi-api-hub/:path(.*)': 'tech/lfi-api-hub/:path',
  },

  themeConfig: {
    siteTitle: false,
    nav: [
      { text: 'Protocol & Policy', link: '/policy' },
      {
        text: 'Developer Docs',
        items: [
          { text: 'Technology Architecture & Overview', link: '/tech/overview' },
          { text: 'TPP – Open Finance Standards', link: '/tech/tpp-standards/' },
          { text: 'LFI – API Hub Integration', link: '/tech/lfi-api-hub/' },
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
        { text: 'LFI - API Hub Integration', link: '/tech/lfi-api-hub/' },
      ],
      '/tech/tpp-standards': tppSidebar,
      '/tech/lfi-api-hub': lfiSidebar,
      '/policy': policySidebar,
      '/processes': processesSidebar,
      '/knowledge-base': kbSidebar,
    },
  },
})

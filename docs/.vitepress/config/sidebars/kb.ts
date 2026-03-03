import type { DefaultTheme } from 'vitepress'

const BASE = '/knowledge-base'

export const kbSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Knowledge Base',
    link: `${BASE}/`,
    items: [
      {
        text: 'Consent',
        collapsed: false,
        items: [
          {
            text: 'Base Consent ID (consentGroupId)',
            link: `${BASE}/articles/base-consent-id`,
          },
        ],
      },
    ],
  },
]

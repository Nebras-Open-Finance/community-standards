import type { DefaultTheme } from 'vitepress'
import { CURRENT_VERSION } from '../../version'

const BASE = '/tech/release-notes-and-erratas'

export const releaseNotesAndErratasSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Overview', link: `${BASE}/` },
  {
    text: 'Release Notes',
    link: `${BASE}/release-notes/`,
    items: [
      {
        text: 'API Hub',
        collapsed: false,
        items: [
          { text: '2026', link: `${BASE}/release-notes/api-hub/2026` },
        ],
      },
      {
        text: 'Trust Framework',
        collapsed: false,
        items: [
          { text: '2026', link: `${BASE}/release-notes/trust-framework/2026` },
        ],
      },
    ],
  },
  {
    text: 'Erratas',
    link: `${BASE}/erratas/`,
    items: [
      {
        text: CURRENT_VERSION,
        collapsed: false,
        items: [
          { text: `${CURRENT_VERSION}-errata1`, link: `${BASE}/erratas/${CURRENT_VERSION}/${CURRENT_VERSION}-errata1` },
        ],
      },
    ],
  },
]

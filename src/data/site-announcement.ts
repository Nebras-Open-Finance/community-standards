// Site-wide announcement shown once per browser session as a modal on arrival
// at any public page. Rendered by src/components/chrome/SiteAnnouncementModal.vue,
// mounted in src/layouts/default.vue.
//
// Everything the modal says lives here — the component is a dumb renderer. To
// run a new announcement:
//   1. Edit the fields below.
//   2. Change `id`. Dismissal is stored under that id, so a new id re-shows the
//      modal to everyone, including readers who dismissed the previous one.
//   3. Set `enabled: false` to take it down without deleting the copy.
//
// `path` values are validated by supporting/tests/link-integrity.test.mjs, so
// they must resolve to a real route.

import type { Version } from './versions'

export interface AnnouncementSwitchTo {
  /** The version to steer the reader onto. */
  version: Version
  /** Link text for the guided switch, e.g. "Switch to v2.2-rc1". */
  label: string
}

export interface AnnouncementItem {
  /** Short chip shown against the item, e.g. a version identifier. */
  tag: string
  /** One-line heading for the item. */
  title: string
  /** One or two sentences of detail. Plain text — no markup. */
  summary: string
  /** Internal route path the item links to. */
  path: string
  /** Link text. */
  linkLabel: string
  /**
   * Optional guided version switch, offered alongside the `path` link. When the
   * reader is on a page that shows the version dropdown and is not already on
   * `version`, the item gains a second action that dismisses the modal and
   * walks them through changing version in the header (see
   * src/composables/useVersionTour.ts). Everywhere else — unversioned pages,
   * narrow viewports, readers already on `version` — only the `path` link
   * shows.
   */
  switchTo?: AnnouncementSwitchTo
}

export interface SiteAnnouncement {
  /**
   * Dismissal key. Changing it re-shows the modal to every reader, so treat it
   * as the announcement's version and bump it whenever the content materially
   * changes.
   */
  id: string
  /** Master switch. false → the modal never renders. */
  enabled: boolean
  /** Small uppercase label above the title. */
  eyebrow: string
  /** Headline. */
  title: string
  /** Opening paragraph. */
  lede: string
  items: AnnouncementItem[]
  /** Label on the dismiss button. */
  dismissLabel: string
}

export const SITE_ANNOUNCEMENT: SiteAnnouncement = {
  id: '2026-08-v2.1-errata-and-v2.2-rc1',
  enabled: true,
  eyebrow: "What's new",
  title: 'v2.1 errata and v2.2-rc1 are now published',
  lede:
    'Two publications affect implementers on the current standards. Both are worth reading before your next release.',
  items: [
    {
      tag: 'v2.1',
      title: 'v2.1 errata changes',
      summary:
        'Corrections to the ratified v2.1 standards. Errata are binding on v2.1 implementations — review the affected endpoints and schemas against what you have built.',
      // Points at the existing v2.1 errata page until the dedicated
      // errata-changes page is written.
      path: '/tech/release-notes-and-erratas/erratas/v2.1/',
      linkLabel: 'Read the v2.1 errata',
    },
    {
      tag: 'v2.2-rc1',
      title: 'v2.2-rc1 published for review',
      summary:
        'The first release candidate for v2.2, published for community review. It is not ratified and MUST NOT be used as the basis for a production implementation.',
      // Points at the v2.1 -> v2.2-rc1 changelog until a dedicated v2.2-rc1
      // landing page is written.
      path: '/tech/release-notes-and-erratas/changelog/v2.2-rc1/',
      linkLabel: 'See what changed in v2.2',
      switchTo: { version: 'v2.2-rc1', label: 'Switch to v2.2-rc1' },
    },
  ],
  dismissLabel: 'Got it',
}

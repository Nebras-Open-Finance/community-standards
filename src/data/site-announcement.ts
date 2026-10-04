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
  /** Link text for the guided switch, e.g. "Switch to v2.2-rc2". */
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
  id: '2026-09-mea-finance-payments-award',
  enabled: false,
  eyebrow: 'Announcement',
  title: 'Nebras Open Finance named winner at the MEA Finance Leaders in Payments Awards 2026',
  lede:
    'Nebras Open Finance has won Best Initiative in Payment Technology Implementation at the MEA Finance Leaders in Payments Awards 2026. The award recognises work that no single organisation did alone — thank you to the Central Bank of the UAE, to every LFI and TPP building on AlTareq, and to everyone across this community who has tested, challenged and improved the standards along the way.',
  items: [
    {
      tag: 'Award',
      title: 'Best Initiative in Payment Technology Implementation',
      summary:
        'The MEA Finance Leaders in Payments Awards recognise institutions and teams driving payments innovation across the Middle East and Africa. The full list of winners was announced on 23 September 2026.',
      path: '/news',
      linkLabel: 'Read the announcement',
    },
  ],
  dismissLabel: 'Thank you',
}

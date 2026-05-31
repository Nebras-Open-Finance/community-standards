import type { RequirementsPageData } from './types'

export const data: RequirementsPageData = {
  title: 'CMI — Bank Data Sharing Requirements',
  version: 'v2.1',
  readTime: '5 min',
  lede: 'The tables below define the display, labelling, and behavioural requirements for the <strong>Bank Data Sharing</strong> consents in the LFI Consent Management Interface (CMI). See the <a href="./user-experience">User Experience</a> page for interactive wireframes of the dashboard and detail pages.',
  preconditions: 'The LFI CMI shares the same structure and consent-type logic as the <a href="/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-data-sharing/requirements">TPP CMI for Bank Data Sharing</a>, with the differences noted below. Adjustments to the requirements below are permitted provided the customer can always clearly understand what consents they have granted. Any adjustments must be documented in your CX certification submission.',
  sections: [
    {
      id: 'dashboard-tabs',
      num: '01',
      title: 'Dashboard — tabs',
      blocks: [
        { kind: 'prose', html: 'The dashboard must present Bank Data Sharing consents across two tabs.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule'],
          rows: [
            { cells: ['1', 'The <strong>Current</strong> tab must display all consents whose status is <code>AwaitingAuthorization</code>, <code>Authorized</code>, or <code>Suspended</code>.'] },
            { cells: ['2', 'The <strong>History</strong> tab must display all consents whose status is <code>Rejected</code>, <code>Expired</code>, or <code>Revoked</code>.'] },
          ],
        } },
      ],
      callouts: [
        { kind: 'info', html: '<code>Paused</code> is not a valid status in the LFI CMI. It is a TPP-local concept that is not reflected in the API Hub.' },
      ],
    },
    {
      id: 'dashboard-filters',
      num: '02',
      title: 'Dashboard — filters',
      blocks: [
        { kind: 'prose', html: 'A filter panel must be available on the dashboard. The following three filters are required:' },
        { kind: 'table', table: {
          headers: ['Filter', 'Options'],
          rows: [
            { cells: ['<strong>TPP Name</strong>', 'Dynamically populated from the TPPs present in the customer\'s connections'] },
            { cells: ['<strong>Consent Type</strong>', 'Dynamically populated from the types present in the current tab'] },
            { cells: ['<strong>Consent State</strong>', 'Dynamically populated from the statuses present in the current tab'] },
          ],
        } },
      ],
    },
    {
      id: 'status-labels',
      num: '03',
      title: 'Status labels',
      blocks: [
        { kind: 'prose', html: 'Consent statuses must be translated from their API values into user-friendly labels before display.' },
        { kind: 'table', table: {
          headers: ['API status', 'Displayed label'],
          rows: [
            { cells: ['<code>Authorized</code>', '<strong>Active</strong>'] },
            { cells: ['<code>AwaitingAuthorization</code>', '<strong>Pending</strong>'] },
            { cells: ['<code>Revoked</code>', '<strong>Cancelled</strong>'] },
            { cells: ['<code>Suspended</code>', '<strong>Suspended</strong>'] },
            { cells: ['<code>Expired</code>', '<strong>Expired</strong>'] },
            { cells: ['<code>Rejected</code>', '<strong>Rejected</strong>'] },
          ],
        } },
      ],
    },
    {
      id: 'consent-type-labels',
      num: '04',
      title: 'Consent type labels',
      blocks: [
        { kind: 'table', table: {
          headers: ['Internal type', 'Displayed label'],
          rows: [
            { cells: ['<code>Data Sharing</code>', '<strong>Data Sharing</strong>'] },
          ],
        } },
      ],
    },
    {
      id: 'dashboard-card-content',
      num: '05',
      title: 'Dashboard — card content',
      blocks: [
        { kind: 'prose', html: 'Each Bank Data Sharing consent card on the dashboard must show the following fields.' },
        { kind: 'table', table: {
          headers: ['Field', 'Content'],
          rows: [
            { cells: ['TPP name', 'Name of the TPP the consent was granted to'] },
            { cells: ['Status badge', 'Mapped label from <a href="#status-labels">Status labels</a>'] },
            { cells: ['Account count', 'Number of connected accounts, e.g. <code>1 Account Connected</code> or <code>2 Accounts Connected</code>'] },
            { cells: ['Consent Type', '<code>Data Sharing</code>'] },
            { cells: ['Last data received', 'Date the most recent data was retrieved under this consent'] },
            { cells: ['Connection expires', 'Date the consent expires'] },
          ],
        } },
      ],
    },
    {
      id: 'detail-page',
      num: '06',
      title: 'Detail page',
      blocks: [
        { kind: 'prose', html: 'Selecting a consent on the dashboard opens its detail page. The detail page presents the same information the customer saw at the time they gave consent — the permissions, accounts, and conditions that defined what they agreed to. In addition to all fields shown on the dashboard card, the detail page must show a truncated Consent ID with a copy button (format: <code>f47ac10b...d479</code>).' },
      ],
      subsections: [
        {
          heading: 'Additional sections',
          blocks: [
            { kind: 'table', table: {
              headers: ['Section', 'Content'],
              rows: [
                { cells: ['<strong>Accounts</strong>', 'List of all accounts the customer has connected under this consent, each showing account type name and full IBAN'] },
                { cells: ['<strong>Data permissions</strong>', 'Expandable list of data categories the consent covers, derived from the consent\'s <code>Permissions</code> field'] },
              ],
            } },
          ],
        },
        {
          heading: 'Detail page — List of Updates',
          blocks: [
            { kind: 'prose', html: 'When a consent carries a <code>BaseConsentId</code>, a <strong>List of Updates</strong> link must be shown on the detail page. Clicking this link navigates to a dedicated view that displays all consents related to the current consent through the same <code>BaseConsentId</code>. A consent is included in the list if: <ul><li>its <code>BaseConsentId</code> matches the current consent\'s <code>BaseConsentId</code>, <strong>or</strong></li><li>its <code>ConsentId</code> matches the current consent\'s <code>BaseConsentId</code></li></ul> The current consent must <strong>not</strong> appear in its own list of updates.' },
          ],
          callouts: [
            { kind: 'danger', title: 'customer isolation risk', html: 'When a consent is created it contains no customer information — the customer identity is only added later when the LFI patches in the customer ID. This means there is no inherent guarantee that two consents sharing the same <code>BaseConsentId</code> belong to the same customer. Unless the LFI explicitly validates this, there is a risk that the List of Updates exposes one customer to consents belonging to a different customer. LFIs must ensure that only consents belonging to the same customer are returned when resolving related consents by <code>BaseConsentId</code>.' },
          ],
          subsections: [
            {
              heading: 'Each related consent card',
              blocks: [
                { kind: 'prose', html: 'Each related consent must be displayed in the same visual format as the dashboard connection list, with the following differences:' },
                { kind: 'table', table: {
                  headers: ['Field', 'Content'],
                  rows: [
                    { cells: ['Title (bold)', 'Date the consent was last updated'] },
                    { cells: ['Subtitle (italic)', 'TPP name'] },
                    { cells: ['Consent Type', 'Type label from <a href="#consent-type-labels">Consent type labels</a>'] },
                    { cells: ['Last data received', 'Date the most recent data was retrieved'] },
                    { cells: ['Connection expires', 'Consent expiration date'] },
                  ],
                } },
                { kind: 'prose', html: 'Each card must include a chevron and hover interaction matching the dashboard, and clicking a card must navigate to the detail page for that consent. No status badge is shown on the update cards.' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'detail-page-action-buttons',
      num: '07',
      title: 'Detail page — action buttons',
      blocks: [
        { kind: 'table', table: {
          headers: ['Button', 'Label', 'Shown when'],
          rows: [
            { cells: ['Revoke', '<code>Stop Sharing</code>', 'Status is <code>AwaitingAuthorization</code>, <code>Authorized</code>, or <code>Suspended</code>'] },
          ],
        } },
        { kind: 'prose', html: 'No action buttons are shown when status is <code>Expired</code>, <code>Rejected</code>, or <code>Revoked</code>.' },
      ],
      callouts: [
        { kind: 'info', html: 'The LFI CMI does not include Pause or Reactivate buttons. These are TPP-only concepts.' },
      ],
    },
    {
      id: 'confirmation-screen',
      num: '08',
      title: 'Confirmation screen',
      blocks: [
        { kind: 'prose', html: 'When the customer selects Revoke, replace the detail view with a <strong>single confirmation screen</strong> that includes: a title, a description of the impact of the action on the service, a Confirm button, and a Go back button.' },
        { kind: 'table', table: {
          headers: ['', 'Revoke'],
          rows: [
            { cells: ['<strong>Title</strong>', '<code>Stop sharing</code>'] },
            { cells: ['<strong>Confirm button</strong>', '<code>Confirm stop sharing</code>'] },
          ],
        } },
        { kind: 'prose', html: 'Once a customer confirms the action, the change must take effect immediately — there must be no delay between confirmation and the consent reflecting its new state. The LFI must update the consent status via the Consent Manager API.' },
      ],
    },
  ],
}

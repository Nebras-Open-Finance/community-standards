import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'CMI — Bank Data Sharing Requirements',
  version: 'v2.2-rc1',
  readTime: '5 min',
  lede: 'The tables below define the display, labelling, and behavioural requirements for the <strong>Bank Data Sharing</strong> consents in the TPP Consent Management Interface (CMI). See the <a href="./user-experience">User Experience</a> page for interactive wireframes of the dashboard and detail pages.',
  preconditions: 'Adjustments to the requirements below are permitted provided the customer can always clearly understand what consents they have granted. Any adjustments must be documented in your CX certification submission.',
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
            { cells: ['1', 'The <strong>Current</strong> tab must display all consents whose status is <code>AwaitingAuthorization</code>, <code>Authorized</code>, <code>Suspended</code>, or <code>Paused</code>.'] },
            { cells: ['2', 'The <strong>History</strong> tab must display all consents whose status is <code>Rejected</code>, <code>Expired</code>, or <code>Revoked</code>.'] },
          ],
        } },
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
            { cells: ['<strong>LFI Name</strong>', 'Dynamically populated from the LFIs present in the user\'s connections'] },
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
            { cells: ['<code>Paused</code>', '<strong>Paused</strong>'] },
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
            { cells: ['LFI name', 'Name of the LFI the consent is held with'] },
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
        { kind: 'prose', html: 'Selecting a consent on the dashboard opens its detail page. The detail page presents the same information the customer saw on the Consent Page at the time they gave consent — the permissions, accounts, and conditions that defined what they agreed to. This gives the customer a clear reference point for what they originally authorised, without requiring them to recall it from memory. In addition to all fields shown on the dashboard card, the detail page must show a truncated Consent ID with a copy button (format: <code>f47ac10b...d479</code>).' },
      ],
      subsections: [
        {
          heading: 'Additional sections',
          blocks: [
            { kind: 'table', table: {
              headers: ['Section', 'Content'],
              rows: [
                { cells: ['<strong>Accounts</strong>', 'List of all accounts the user has connected under this consent, each showing account type name and full IBAN'] },
                { cells: ['<strong>Data permissions</strong>', 'Expandable list of data categories the consent covers, derived from the consent\'s <code>Permissions</code> field'] },
              ],
            } },
          ],
        },
        {
          heading: '"How we are using your data" card',
          blocks: [
            { kind: 'prose', html: 'A card titled <strong>How we are using your data</strong> must appear below the Data permissions section, except when status is <code>Rejected</code>.' },
            { kind: 'prose', html: '<div class="cmi-statusmap-title">Status behaviour</div><dl class="cmi-statusmap"><div class="cmi-statusmap__row"><dt><span class="cmi-status">Rejected</span></dt><dd>Card is <strong>not shown</strong></dd></div><div class="cmi-statusmap__row"><dt><span class="cmi-status">Revoked</span></dt><dd>Title changes to <strong>You cancelled this connection</strong></dd></div><div class="cmi-statusmap__row"><dt><span class="cmi-status">Expired</span></dt><dd><em>Connection Expires</em> label changes to <strong>Connection Expired</strong></dd></div><div class="cmi-statusmap__row"><dt><span class="cmi-status cmi-status--muted">All other statuses</span></dt><dd>Default title and labels</dd></div></dl>' },
            { kind: 'prose', html: '<div class="cmi-rows-title">Date rows <span class="cmi-rows-hint">each prefixed with a calendar or refresh icon</span></div><ol class="cmi-rows"><li><span class="cmi-rows__num">1</span><div class="cmi-rows__body"><div class="cmi-rows__label">First Connected</div><div class="cmi-rows__value">Date the consent was first authorised</div></div></li><li><span class="cmi-rows__num">2</span><div class="cmi-rows__body"><div class="cmi-rows__label">Connection Expires / Connection Expired</div><div class="cmi-rows__value">Consent expiration date</div></div></li><li><span class="cmi-rows__num">3</span><div class="cmi-rows__body"><div class="cmi-rows__label">Last Updated</div><div class="cmi-rows__value">Date of the most recent data retrieval — <strong>only shown when the consent has a <code>BaseConsentId</code></strong></div></div></li><li><span class="cmi-rows__num">4</span><div class="cmi-rows__body"><div class="cmi-rows__label">List of Updates</div><div class="cmi-rows__value">Clickable link to the <a href="#detail-page--list-of-updates">List of Updates</a> view — <strong>only shown when the consent has a <code>BaseConsentId</code></strong></div></div></li></ol>' },
          ],
        },
        {
          heading: 'Detail page — List of Updates',
          blocks: [
            { kind: 'prose', html: 'When a consent carries a <code>BaseConsentId</code>, a <strong>List of Updates</strong> link must be shown on the detail page. Clicking this link navigates to a dedicated view that displays all consents related to the current consent through the same <code>BaseConsentId</code>. The related consents are retrieved via <a href="/tech/tpp-standards/v2.2-rc1/consent/open-api/account-access-consents">GET /account-access-consents</a>, passing the <code>baseConsentId</code> query parameter. A consent is included in the list if: <ul><li>its <code>BaseConsentId</code> matches the current consent\'s <code>BaseConsentId</code>, <strong>or</strong></li><li>its <code>ConsentId</code> matches the current consent\'s <code>BaseConsentId</code></li></ul> The current consent must <strong>not</strong> appear in its own list of updates.' },
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
                    { cells: ['Subtitle (italic)', 'LFI name, e.g. <code>[LFI 9]</code>'] },
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
            { cells: ['Pause', '<code>Pause</code>', 'Status is <code>Authorized</code>'] },
            { cells: ['Reactivate', '<code>Reactivate</code>', 'Status is <code>Paused</code>'] },
            { cells: ['Revoke', '<code>Stop Sharing</code>', 'Status is <code>AwaitingAuthorization</code>, <code>Authorized</code>, <code>Suspended</code>, or <code>Paused</code>'] },
          ],
        } },
        { kind: 'prose', html: 'No action buttons are shown when status is <code>Expired</code>, <code>Rejected</code>, or <code>Revoked</code>.' },
      ],
    },
    {
      id: 'confirmation-screen',
      num: '08',
      title: 'Confirmation screen',
      blocks: [
        { kind: 'prose', html: 'When the user selects Pause, Reactivate, or Revoke, replace the detail view with a <strong>single confirmation screen</strong> that includes: a title, a description of the impact of the action on the service, a Confirm button, and a Go back button.' },
        { kind: 'table', table: {
          headers: ['', 'Pause', 'Reactivate', 'Revoke'],
          rows: [
            { cells: ['<strong>Title</strong>', '<code>Pause data sharing</code>', '<code>Resume data sharing</code>', '<code>Stop sharing</code>'] },
            { cells: ['<strong>Confirm button</strong>', '<code>Confirm pause</code>', '<code>Confirm reactivation</code>', '<code>Confirm stop sharing</code>'] },
          ],
        } },
        { kind: 'prose', html: 'Once a user confirms the action, the change must take effect immediately — there must be no delay between confirmation and the consent reflecting its new state. <ul><li><strong>Revoke</strong> Immediate PATCH to <a href="/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-account-access-consents-ConsentId">/account-access-consents/{ConsentId}</a></li><li><strong>Pause</strong> No API Hub update — record paused state in the TPP\'s own system only</li><li><strong>Reactivate</strong> No API Hub update — clear the paused state in the TPP\'s own system only</li></ul>' },
      ],
    },
  ],
}

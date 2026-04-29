import type { RequirementsPageData } from './types'

export const data: RequirementsPageData = {
  title: 'Consent Management Interface — Requirements',
  version: 'v2.1',
  readTime: '6 min',
  lede: 'The tables below define the display, labelling, and behavioural requirements for the LFI Consent Management Interface (CMI). See the <a href="./user-experience">User Experience</a> page for interactive wireframes of the dashboard and detail pages.',
  preconditions: 'The LFI CMI shares the same structure and consent-type logic as the <a href="/tech/tpp-standards/v2.1/consent/consent-management-interface/requirements">TPP CMI</a>, with the differences noted below. Adjustments to the requirements below are permitted provided the customer can always clearly understand what consents they have granted. Any adjustments must be documented in your CX certification submission.',
  sections: [
    {
      id: 'dashboard-tabs',
      num: '01',
      title: 'Dashboard — tabs',
      blocks: [
        { kind: 'prose', html: 'The dashboard must present consents across two tabs.' },
        { kind: 'table', table: {
          headers: ['#', 'Rule'],
          rows: [
            { cells: ['1', 'The <strong>Current</strong> tab must display all consents whose status is <code>AwaitingAuthorization</code>, <code>Authorized</code>, or <code>Suspended</code>.'] },
            { cells: ['2', 'The <strong>History</strong> tab must display all consents whose status is <code>Rejected</code>, <code>Consumed</code>, <code>Expired</code>, or <code>Revoked</code>.'] },
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
            { cells: ['<code>Consumed</code>', 'See below'] },
          ],
        } },
      ],
      subsections: [
        {
          heading: '`Consumed` — Single Instant Payment',
          blocks: [
            { kind: 'prose', html: 'For Single Instant Payments in the <code>Consumed</code> state, the displayed label is derived from the payment\'s <code>paymentStatus</code> field rather than the consent status.' },
            { kind: 'table', table: {
              headers: ['`paymentStatus`', 'Displayed label'],
              rows: [
                { cells: ['<code>AcceptedSettlementCompleted</code>', '<strong>Successful</strong>'] },
                { cells: ['<code>AcceptedCreditSettlementCompleted</code>', '<strong>Successful</strong>'] },
                { cells: ['<code>AcceptedWithoutPosting</code>', '<strong>Successful</strong>'] },
                { cells: ['<code>Rejected</code>', '<strong>Failed</strong>'] },
              ],
            } },
            { kind: 'prose', html: 'For all other consent types, <code>Consumed</code> is displayed verbatim as <strong>Consumed</strong>.' },
          ],
        },
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
            { cells: ['<code>Single Instant Payment</code>', '<strong>Single Payment</strong>'] },
            { cells: ['Any <code>Multi Payment (…)</code> subtype', '<strong>Flexi Pay</strong>'] },
          ],
        } },
      ],
    },
    {
      id: 'dashboard-card-content',
      num: '05',
      title: 'Dashboard — card content',
      blocks: [
        { kind: 'prose', html: 'Each consent card on the dashboard must show a consistent set of fields depending on the consent type.' },
      ],
      subsections: [
        {
          heading: 'Data Sharing',
          blocks: [
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
          heading: 'Single Instant Payment',
          blocks: [
            { kind: 'table', table: {
              headers: ['Field', 'Content'],
              rows: [
                { cells: ['TPP name', 'Name of the TPP the consent was granted to'] },
                { cells: ['Status badge', 'Mapped label from <a href="#status-labels">Status labels</a>'] },
                { cells: ['Masked IBAN', 'Masked payer IBAN (not shown when status is <code>AwaitingAuthorization</code>)'] },
                { cells: ['Consent Type', '<code>Single Payment</code>'] },
                { cells: ['Payment Date', 'Date the payment was or is to be made'] },
                { cells: ['Payment Amount', 'Amount of the payment in AED. Shown as <code>0.00</code> when status is <code>AwaitingAuthorization</code>; must be a positive value once the consent is <code>Authorized</code> or later'] },
              ],
            } },
          ],
        },
        {
          heading: 'Multi Payment (all subtypes)',
          blocks: [
            { kind: 'table', table: {
              headers: ['Field', 'Content'],
              rows: [
                { cells: ['TPP name', 'Name of the TPP the consent was granted to'] },
                { cells: ['Status badge', 'Mapped label from <a href="#status-labels">Status labels</a>'] },
                { cells: ['Masked IBAN', 'Masked payer IBAN (not shown when status is <code>AwaitingAuthorization</code>)'] },
                { cells: ['Consent Type', '<code>Flexi Pay</code>'] },
                { cells: ['Total paid to date', 'Cumulative sum of all successful payments under this consent in AED'] },
                { cells: ['Connection expires', 'Date the consent expires'] },
              ],
            } },
          ],
        },
      ],
    },
    {
      id: 'detail-page',
      num: '06',
      title: 'Detail page',
      blocks: [
        { kind: 'prose', html: 'Selecting a consent on the dashboard opens its detail page. The detail page presents the same information the customer saw at the time they gave consent — the permissions, limits, accounts, and conditions that defined what they agreed to. In addition to all fields shown on the dashboard card, the detail page must show a truncated Consent ID with a copy button (format: <code>f47ac10b...d479</code>).' },
      ],
      subsections: [
        {
          heading: 'Data Sharing — additional sections',
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
          heading: 'Single Instant Payment — additional sections',
          blocks: [
            { kind: 'table', table: {
              headers: ['Section', 'Content'],
              rows: [
                { cells: ['<strong>Payment details</strong>', 'Amount, Reference, and Payment Purpose. If status is <code>Authorized</code>, a Status badge of <code>Authorized</code> must also be shown.'] },
                { cells: ['<strong>From account</strong>', 'Bank name, Payer Name, and full IBAN of the payer account'] },
                { cells: ['<strong>To account</strong>', 'Payee Name and IBAN of the destination account'] },
              ],
            } },
          ],
        },
        {
          heading: 'Multi Payment — additional sections',
          blocks: [
            { kind: 'table', table: {
              headers: ['Section', 'Content'],
              rows: [
                { cells: ['<strong>From account</strong>', 'Bank name, Payer Name, and full IBAN of the payer account'] },
                { cells: ['<strong>To account</strong>', 'Payee Name and IBAN of the destination account'] },
                { cells: ['<strong>Payment Rules / Payment History</strong>', 'Tabbed section: Payment Rules shows consent parameters (schedule, limits, frequency); Payment History shows a log of all payments with date, amount, purpose, reference, and status'] },
              ],
            } },
          ],
        },
        {
          heading: 'Detail page — status-dependent content',
          blocks: [
            { kind: 'prose', html: 'The detail page must adapt its content based on the consent\'s current status.' },
          ],
          subsections: [
            {
              heading: 'Multi Payment — dates card',
              blocks: [
                { kind: 'prose', html: 'A dates card must appear below the Payment Rules / Payment History section for all Multi Payment consents, except when status is <code>Rejected</code>.' },
                { kind: 'prose', html: '<div class="cmi-statusmap-title">Status behaviour</div><dl class="cmi-statusmap"><div class="cmi-statusmap__row"><dt><span class="cmi-status">Rejected</span></dt><dd>Card is <strong>not shown</strong></dd></div><div class="cmi-statusmap__row"><dt><span class="cmi-status">Revoked</span></dt><dd>Second row label changes to <strong>You cancelled payments on</strong></dd></div><div class="cmi-statusmap__row"><dt><span class="cmi-status">Expired</span></dt><dd>Second row label changes to <strong>Payments expired</strong></dd></div><div class="cmi-statusmap__row"><dt><span class="cmi-status cmi-status--muted">All other statuses</span></dt><dd>Default labels</dd></div></dl>' },
                { kind: 'prose', html: '<div class="cmi-rows-title">Date rows</div><ol class="cmi-rows"><li><span class="cmi-rows__num">1</span><div class="cmi-rows__body"><div class="cmi-rows__label">You started this permission</div><div class="cmi-rows__value">Date the consent was first authorised</div></div></li><li><span class="cmi-rows__num">2</span><div class="cmi-rows__body"><div class="cmi-rows__label">We will make these payments until</div><div class="cmi-rows__value">Consent expiration date</div></div></li><li><span class="cmi-rows__num">3</span><div class="cmi-rows__body"><div class="cmi-rows__label">Last Updated</div><div class="cmi-rows__value">Date of the most recent data retrieval — <strong>only shown when the consent has a <code>BaseConsentId</code></strong></div></div></li><li><span class="cmi-rows__num">4</span><div class="cmi-rows__body"><div class="cmi-rows__label">List of Updates</div><div class="cmi-rows__value">Clickable link to the <a href="#detail-page--list-of-updates">List of Updates</a> view — <strong>only shown when the consent has a <code>BaseConsentId</code></strong></div></div></li></ol>' },
              ],
            },
          ],
        },
        {
          heading: 'Detail page — List of Updates',
          blocks: [
            { kind: 'prose', html: 'When a consent carries a <code>BaseConsentId</code>, a <strong>List of Updates</strong> link must be shown on the detail page. Clicking this link navigates to a dedicated view that displays all consents related to the current consent through the same <code>BaseConsentId</code>. A consent is included in the list if: <ul><li>its <code>BaseConsentId</code> matches the current consent\'s <code>BaseConsentId</code>, <strong>or</strong></li><li>its <code>ConsentId</code> matches the current consent\'s <code>BaseConsentId</code></li></ul> The current consent must <strong>not</strong> appear in its own list of updates.' },
          ],
          callouts: [
            { kind: 'danger', title: 'PSU isolation risk', html: 'When a consent is created it contains no customer information — the PSU identity is only added later when the LFI patches in the PSU ID. This means there is no inherent guarantee that two consents sharing the same <code>BaseConsentId</code> belong to the same customer. Unless the LFI explicitly validates this, there is a risk that the List of Updates exposes one customer to consents belonging to a different customer. LFIs must ensure that only consents belonging to the same PSU are returned when resolving related consents by <code>BaseConsentId</code>.' },
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
            { cells: ['Revoke (Data Sharing)', '<code>Stop Sharing</code>', 'Status is <code>AwaitingAuthorization</code>, <code>Authorized</code>, or <code>Suspended</code>'] },
            { cells: ['Revoke (Payment)', '<code>Cancel Permission</code>', 'Status is <code>AwaitingAuthorization</code>, <code>Authorized</code>, or <code>Suspended</code>'] },
          ],
        } },
        { kind: 'prose', html: 'No action buttons are shown when status is <code>Consumed</code>, <code>Expired</code>, <code>Rejected</code>, or <code>Revoked</code>.' },
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
        { kind: 'prose', html: 'When the customer selects Revoke, replace the detail view with a <strong>single confirmation screen</strong> that includes: a title, a description of the impact of the action on the service (varying by use case), a Confirm button, and a Go back button.' },
        { kind: 'table', table: {
          headers: ['', 'Revoke — Data Sharing', 'Revoke — Payment'],
          rows: [
            { cells: ['<strong>Title</strong>', '<code>Stop sharing</code>', '<code>Cancel payment permission</code>'] },
            { cells: ['<strong>Confirm button</strong>', '<code>Confirm stop sharing</code>', '<code>Confirm cancellation</code>'] },
          ],
        } },
        { kind: 'prose', html: 'Once a customer confirms the action, the change must take effect immediately — there must be no delay between confirmation and the consent reflecting its new state. The LFI must update the consent status via the Consent Manager API.' },
      ],
    },
  ],
}

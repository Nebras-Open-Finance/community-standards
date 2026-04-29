import type { RequirementsPageData } from './types'

export const data: RequirementsPageData = {
  title: 'Authentication Requirements',
  version: 'v2.1',
  readTime: '2 min',
  lede: 'This page defines the required error handling behaviour when the PSU fails to authenticate during the consent journey. The LFI MUST invoke <code>POST /auth/{interactionId}/doFail</code> with the exact <code>error</code> and <code>error_description</code> values specified below.',
  preconditions: 'For the full <code>doFail</code> API specification, see the <a href="/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail"><code>POST /auth/{interactionId}/doFail</code> API Reference</a>.',
  sections: [
    {
      id: 'error-scenarios',
      num: '01',
      title: 'Error scenarios',
      subsections: [
        {
          heading: '1. PSU fails initial authentication',
          blocks: [
            { kind: 'prose', html: 'The PSU does not successfully complete initial authentication — for example, by exceeding the maximum number of allowed attempts (e.g. 3 failed attempts).' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>access_denied</code>'] },
                { cells: ['<code>error_description</code>', '<code>user_failed_to_authenticate</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST NOT PATCH the consent to <code>Rejected</code> in this scenario — the PSU\'s identity has not been confirmed, so no PSU identifiers are available.' },
          ],
        },
        {
          heading: '2. PSU fails step-up authentication',
          blocks: [
            { kind: 'prose', html: 'The PSU authenticated successfully during initial login but fails the step-up authentication required for payment consent confirmation — for example, failing biometric verification or exceeding the maximum number of step-up attempts.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>access_denied</code>'] },
                { cells: ['<code>error_description</code>', '<code>user_failed_step_up_authentication</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST PATCH the consent to <code>Rejected</code> before calling <code>doFail</code> — the PSU was already identified during initial authentication.' },
          ],
        },
        {
          heading: '3. PSU is blocked, suspended, or flagged',
          blocks: [
            { kind: 'prose', html: 'The PSU authenticates successfully but the LFI determines the customer account is blocked, suspended, or otherwise flagged — for example, due to a fraud hold, deceased marker, or sanctions screening.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>access_denied</code>'] },
                { cells: ['<code>error_description</code>', '<code>user_account_blocked</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST NOT PATCH the consent to <code>Rejected</code> in this scenario — the LFI SHOULD NOT associate the consent with a blocked account in the API Hub.' },
          ],
        },
        {
          heading: '4. LFI internal technical error',
          blocks: [
            { kind: 'prose', html: 'The LFI encounters an internal technical error during the authentication process — for example, an internal service failure or inability to retrieve customer data.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>server_error</code>'] },
                { cells: ['<code>error_description</code>', '<code>lfi_internal_error</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST NOT PATCH the consent to <code>Rejected</code> — the PSU\'s identity may not have been confirmed, and the failure is not attributable to the PSU.' },
          ],
        },
        {
          heading: '5. LFI fails to communicate with API Hub',
          blocks: [
            { kind: 'prose', html: 'The LFI cannot communicate with the API Hub after the initial <code>GET /auth</code> call — for example, a failure when calling <code>GET /consents/{consentId}</code> to retrieve the consent details.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>server_error</code>'] },
                { cells: ['<code>error_description</code>', '<code>api_hub_communication_error</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST NOT PATCH the consent to <code>Rejected</code> — the API Hub may be unreachable.' },
          ],
          callouts: [
            { kind: 'warning', title: 'When GET /auth itself fails', html: 'If <code>GET /auth</code> fails, the LFI has no <code>interactionId</code> and therefore cannot call <code>doFail</code>. In this case the LFI MUST render an error page to the PSU explaining that the service is temporarily unavailable.' },
          ],
        },
        {
          heading: '6. LFI temporarily unavailable',
          blocks: [
            { kind: 'prose', html: 'The LFI cannot complete authentication due to high load or temporary capacity constraints at the LFI\'s systems.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>temporarily_unavailable</code>'] },
                { cells: ['<code>error_description</code>', '<code>lfi_temporarily_unavailable</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST NOT PATCH the consent to <code>Rejected</code> — the PSU\'s identity may not have been confirmed.' },
          ],
        },
      ],
    },
    {
      id: 'summary',
      num: '02',
      title: 'Summary',
      blocks: [
        { kind: 'table', table: {
          headers: ['#', 'Scenario', '`error`', '`error_description`', 'PATCH to Rejected?'],
          rows: [
            { cells: ['1', 'PSU fails initial authentication', '<code>access_denied</code>', '<code>user_failed_to_authenticate</code>', 'No'] },
            { cells: ['2', 'PSU fails step-up authentication', '<code>access_denied</code>', '<code>user_failed_step_up_authentication</code>', 'Yes'] },
            { cells: ['3', 'PSU is blocked, suspended, or flagged', '<code>access_denied</code>', '<code>user_account_blocked</code>', 'No'] },
            { cells: ['4', 'LFI internal technical error', '<code>server_error</code>', '<code>lfi_internal_error</code>', 'No'] },
            { cells: ['5', 'LFI fails to communicate with API Hub', '<code>server_error</code>', '<code>api_hub_communication_error</code>', 'No'] },
            { cells: ['6', 'LFI temporarily unavailable', '<code>temporarily_unavailable</code>', '<code>lfi_temporarily_unavailable</code>', 'No'] },
          ],
        } },
      ],
      callouts: [
        { kind: 'warning', title: 'FAPI error code validation', html: 'If the LFI submits an <code>error</code> code that is not supported by the FAPI 2.0 Security Profile, the API Hub will overwrite it with <code>invalid_request</code>.' },
      ],
    },
  ],
}

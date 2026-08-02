import type { RequirementsPageData } from '../types'

export const data: RequirementsPageData = {
  title: 'Authorization Requirements',
  version: 'v2.2-draft',
  readTime: '3 min',
  lede: 'This page defines the required error handling behaviour when the consent authorization fails after the end user has been <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authentication/">authenticated</a>. The LFI MUST invoke <code>POST /auth/{interactionId}/doFail</code> with the exact <code>error</code> and <code>error_description</code> values specified below.',
  preconditions: 'For all authorization failure scenarios, the LFI MUST PATCH the consent to <code>Rejected</code> before calling <code>doFail</code> — the end user has been identified during the authentication step. For the full <code>doFail</code> API specification, see the <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/headless-heimdall/open-api/auth-interactionId-doFail"><code>POST /auth/{interactionId}/doFail</code> API Reference</a>.',
  sections: [
    {
      id: 'error-scenarios',
      num: '01',
      title: 'Error scenarios',
      subsections: [
        {
          heading: '1. End user explicitly cancels or declines the consent',
          blocks: [
            { kind: 'prose', html: 'The end user reviews the consent details and chooses to decline or cancel the authorization.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>access_denied</code>'] },
                { cells: ['<code>error_description</code>', '<code>user_rejected_consent</code>'] },
              ],
            } },
          ],
        },
        {
          heading: '2. End user lacks eligible accounts or access',
          blocks: [
            { kind: 'prose', html: 'The end user does not have any accounts or sufficient access rights to authorize the consent. For example: <ul><li>The end user has no eligible accounts for the requested consent type</li><li>The end user\'s accounts do not support the requested payment rail or currency</li><li>The consent has <code>IsSingleAuthorization</code> set to <code>true</code> but the end user does not have sufficient authority to authorize the payment independently — for example, where the payment would require an additional approver (subsequent authorizer)</li></ul>' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>invalid_request</code>'] },
                { cells: ['<code>error_description</code>', '<code>user_lacks_eligible_accounts</code>'] },
              ],
            } },
          ],
        },
        {
          heading: '3. Consent type not supported by LFI',
          blocks: [
            { kind: 'prose', html: 'The LFI does not support the consent type or configuration requested by the TPP.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>access_denied</code>'] },
                { cells: ['<code>error_description</code>', '<code>consent_not_supported</code>'] },
              ],
            } },
          ],
          callouts: [
            { kind: 'tip', title: 'Use POST /consent/action/validate instead', html: 'This scenario SHOULD NOT occur in steady state. LFIs SHOULD implement the <a href="/tech/lfi-api-hub/v2.2-draft/consent-events/open-api/validate"><code>POST /consent/action/validate</code></a> endpoint to reject unsupported consents at creation time — before the end user is redirected to the LFI. If this error is reported persistently or frequently, Nebras may require the LFI to implement the <code>POST /consent/action/validate</code> endpoint.' },
          ],
        },
        {
          heading: '4. End user session expires',
          blocks: [
            { kind: 'prose', html: 'The end user\'s session with the LFI expires before they complete the authorization of the consent.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>access_denied</code>'] },
                { cells: ['<code>error_description</code>', '<code>session_expired</code>'] },
              ],
            } },
          ],
          callouts: [
            { kind: 'warning', title: 'Session timeout guidance', html: 'LFIs MUST ensure that session timeouts are not so short that they create an obstacle to an end user completing authentication and authorization. The introduction of payment step-up authentication enables LFIs to implement session management in a way that balances security with usability.' },
          ],
        },
        {
          heading: '5. LFI internal technical error',
          blocks: [
            { kind: 'prose', html: 'The LFI encounters an internal technical error during the authorization process — for example, an internal service failure or inability to retrieve account data.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>server_error</code>'] },
                { cells: ['<code>error_description</code>', '<code>lfi_internal_error</code>'] },
              ],
            } },
          ],
        },
        {
          heading: '6. LFI fails to communicate with API Hub',
          blocks: [
            { kind: 'prose', html: 'The LFI cannot communicate with the API Hub during the authorization process — for example, a failure when calling <code>PATCH /consents/{consentId}</code> to update the consent status.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>server_error</code>'] },
                { cells: ['<code>error_description</code>', '<code>api_hub_communication_error</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST attempt to PATCH the consent to <code>Rejected</code> before calling <code>doFail</code>, but if the API Hub is unreachable, the LFI MUST still call <code>doFail</code> to redirect the end user back to the TPP.' },
          ],
        },
        {
          heading: '7. LFI temporarily unavailable',
          blocks: [
            { kind: 'prose', html: 'The LFI cannot complete authorization due to high load or temporary capacity constraints at the LFI\'s systems.' },
            { kind: 'table', table: {
              headers: ['Field', 'Value'],
              rows: [
                { cells: ['<code>error</code>', '<code>temporarily_unavailable</code>'] },
                { cells: ['<code>error_description</code>', '<code>lfi_temporarily_unavailable</code>'] },
              ],
            } },
            { kind: 'prose', html: 'The LFI MUST PATCH the consent to <code>Rejected</code> before calling <code>doFail</code> — the end user has been identified during the authentication step.' },
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
          headers: ['#', 'Scenario', '`error`', '`error_description`'],
          rows: [
            { cells: ['1', 'End user explicitly cancels or declines the consent', '<code>access_denied</code>', '<code>user_rejected_consent</code>'] },
            { cells: ['2', 'End user lacks eligible accounts or access', '<code>invalid_request</code>', '<code>user_lacks_eligible_accounts</code>'] },
            { cells: ['3', 'Consent type not supported by LFI', '<code>access_denied</code>', '<code>consent_not_supported</code>'] },
            { cells: ['4', 'End user session expires', '<code>access_denied</code>', '<code>session_expired</code>'] },
            { cells: ['5', 'LFI internal technical error', '<code>server_error</code>', '<code>lfi_internal_error</code>'] },
            { cells: ['6', 'LFI fails to communicate with API Hub', '<code>server_error</code>', '<code>api_hub_communication_error</code>'] },
            { cells: ['7', 'LFI temporarily unavailable', '<code>temporarily_unavailable</code>', '<code>lfi_temporarily_unavailable</code>'] },
          ],
        } },
        { kind: 'prose', html: 'For all scenarios above, the LFI MUST PATCH the consent to <code>Rejected</code> before calling <code>doFail</code>, except scenario 6 where the API Hub may be unreachable — in which case the LFI MUST make a best-effort attempt.' },
      ],
      callouts: [
        { kind: 'warning', title: 'FAPI error code validation', html: 'If the LFI submits an <code>error</code> code that is not supported by the FAPI 2.0 Security Profile, the API Hub will overwrite it with <code>invalid_request</code>.' },
      ],
    },
  ],
}

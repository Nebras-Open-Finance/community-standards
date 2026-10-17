// The Jira forms under /internal/pages/jira-forms/. Drives the "Jira forms"
// sidebar section and the internal home page.
//
// Every Jira form is protected by Trust Framework SSO: its page is a
// JiraFormShell, which signs the user in and checks they can see the ticket.
// The single exception is Sandbox onboarding (`sso: false`) — the people who
// fill it in do not have a Trust Framework account yet. Do not add others:
// supporting/tests/jira-forms-auth.test.mjs fails if a second form opts out.
//
// To add a form:
//   1. standards-api: add src/services/jira/forms/<slug>.js and register it in
//      forms/index.js (validation + ticket summary).
//   2. Here: add an entry below, with `sso: true`.
//   3. Add src/pages/internal/pages/jira-forms/<slug>.vue — a JiraFormShell
//      with the form's fields in its slot.
// `slug` is both the page path and the form id the API knows it by.

export interface JiraFormEntry {
  slug: string
  title: string
  description: string
  /** Behind Trust Framework SSO (JiraFormShell). False only for Sandbox onboarding. */
  sso: boolean
}

export const JIRA_FORMS: JiraFormEntry[] = [
  {
    slug: 'supported-currency-pairs',
    title: 'Supported currency pairs',
    description: 'Up to 200 From Currency → To Currency pairs, typed or uploaded from Excel/CSV, attached to the ticket as JSON.',
    sso: true,
  },
  {
    slug: 'sandbox-onboarding',
    title: 'Sandbox onboarding',
    description: 'Onboarding request for an LFI or TPP joining the Sandbox Trust Framework. No sign-in: applicants have no account yet.',
    sso: false,
  },
]

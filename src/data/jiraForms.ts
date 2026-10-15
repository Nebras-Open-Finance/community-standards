// The Jira forms under /internal/pages/jira-forms/. Drives the "Jira forms"
// sidebar section and the internal home page.
//
// To add a form:
//   1. standards-api: add src/services/jira/forms/<slug>.js and register it in
//      forms/index.js (validation + ticket summary).
//   2. Here: add an entry below.
//   3. Add src/pages/internal/pages/jira-forms/<slug>.vue — a JiraFormShell
//      with the form's fields in its slot.
// `slug` is both the page path and the form id the API knows it by.

export interface JiraFormEntry {
  slug: string
  title: string
  description: string
}

export const JIRA_FORMS: JiraFormEntry[] = [
  {
    slug: 'supported-currency-pairs',
    title: 'Supported currency pairs',
    description: 'Up to 200 From Currency → To Currency pairs, typed or uploaded from Excel/CSV, attached to the ticket as JSON.',
  },
]

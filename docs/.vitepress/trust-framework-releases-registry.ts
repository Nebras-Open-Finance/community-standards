// Single source of truth for Trust Framework (Raidiam Directory) release note
// entries. Renders via the TrustFrameworkReleaseNotesPage component, scoped per
// calendar year.
//
// To add a release:
//   1. Append entries below with the same `release` value (e.g. '2.3.0'),
//      incrementing `number` per entry within that release.
//   2. If a new calendar year starts, add it to TRUST_FRAMEWORK_YEARS in
//      docs/.vitepress/release-notes-years.ts and create a thin shim at
//      docs/tech/release-notes-and-erratas/release-notes/trust-framework/{year}.md
//      that mounts <TrustFrameworkReleaseNotesPage year="{year}" />.

export type TrustFrameworkCategory = 'New Features' | 'Enhancements' | 'Bug Fixes'

export interface TrustFrameworkEntry {
  release: string                         // '2.2.0'
  effectiveDate: string                   // ISO, e.g. '2026-06-02'
  planned?: boolean                       // true = future / not yet deployed
  number: number                          // sequence within the release (1, 2, …)
  category: TrustFrameworkCategory
  title: string
  description?: string                    // prose, \n\n for paragraph breaks
}

export const TRUST_FRAMEWORK_CATEGORIES: TrustFrameworkCategory[] = [
  'New Features',
  'Enhancements',
  'Bug Fixes',
]

export const TRUST_FRAMEWORK_RELEASES: TrustFrameworkEntry[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 2.2.0 — 2 June 2026 (planned)
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 1,
    category: 'New Features',
    title: 'Directory version display',
    description:
      'The current directory version is now shown in the UI via the profile menu. Selecting Versions opens a modal displaying the active release version with direct links to the Release Notes and API documentation.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 2,
    category: 'New Features',
    title: 'Server roles',
    description:
      'Authorisation Servers now include a dedicated Roles tab. The tab surfaces associated domains, roles, and authorities, and allows administrators to add and manage server roles directly from the server detail view.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 3,
    category: 'New Features',
    title: 'Improved OTP validation in onboarding',
    description:
      'The onboarding verification flow now separates email and phone OTP validation into distinct steps. Email validation runs first, followed by phone where applicable. Phone OTP is skipped when not configured in the environment.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 4,
    category: 'New Features',
    title: 'New scope for audit log access across organisations',
    description:
      'A new directory:software:audit scope supports automated retrieval of audit logs via client credentials, without a human user account. Organisation Administrators can use an Application with this scope to query audit endpoints programmatically.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 5,
    category: 'Enhancements',
    title: 'Disabled action icons when unavailable',
    description:
      'Action icons on Organisation, Server, and Application cards are now visually disabled when unavailable. A tooltip clarifies why the action is inactive or permission-restricted.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 6,
    category: 'Enhancements',
    title: 'Updated toggle design',
    description:
      'Toggle controls across the Directory have been updated to align with the design system.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 7,
    category: 'Enhancements',
    title: 'Responsive search bar',
    description:
      'The global search bar now scales responsively across screen sizes, adapting on mobile and dynamically adjusting on larger displays.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 8,
    category: 'Enhancements',
    title: 'Paginated certification types dropdown',
    description:
      'The Certification Type and Certification Type Variant dropdowns now support auto-complete and pagination, improving usability when working with a large number of certification types.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 9,
    category: 'Enhancements',
    title: 'Scroll-to-error behaviour in dialogs',
    description:
      'Forms within dialogs now scroll to the first invalid field when validation fails, while preserving error summary visibility.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 10,
    category: 'Bug Fixes',
    title: 'Improved global search feedback',
    description:
      'Fixed an issue where typing in the global search bar briefly displayed "No results for…" before the search completed. The interface now correctly shows a "Searching…" state during queries.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 11,
    category: 'Bug Fixes',
    title: 'API metadata schema duplication across API families',
    description:
      'Fixed an issue where configuring API resource metadata at the authorisation server level incorrectly applied the same schema to multiple distinct API Families. Each API Family now reflects its own configured metadata schema.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    planned: true,
    number: 12,
    category: 'Bug Fixes',
    title: 'API resources metadata permissions',
    description:
      'Fixed an issue preventing organisation users with appropriate type access from updating API resource metadata on an Authorisation Server.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.1.0 — 2 April 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 1,
    category: 'New Features',
    title: 'New Application details experience',
    description:
      'The Application Details page has been redesigned for a clearer, more structured layout. Key information such as flags and core application details is shown prominently at the top, while detailed sections are collapsed by default.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 2,
    category: 'New Features',
    title: 'Identity Provider (IDP) creation wizard',
    description:
      'A new guided wizard simplifies creating Identity Providers. The wizard provides clearer visual feedback during configuration and consolidates IDP and IDP version creation into a single flow.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 3,
    category: 'New Features',
    title: 'Federation visibility for applications',
    description:
      'Applications participating in a federation now display clear visual indicators. A Federated tag is shown on the application page, and a collapsible section provides visibility into the federation hierarchy — the current entity, the parent entity, and the trust anchor.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 4,
    category: 'Enhancements',
    title: 'API Families configuration clarity',
    description:
      'Additional helpers and contextual guidance have been added to the API Families configuration screens, helping users understand certification types and configuration requirements during creation.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 5,
    category: 'Enhancements',
    title: 'Improved mobile navigation',
    description:
      'The sidebar on mobile now opens as a partial overlay rather than a full-screen panel, allowing users to keep context with the underlying page.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 6,
    category: 'Enhancements',
    title: 'Prepopulated configuration fields',
    description:
      'Selected configuration forms now support prepopulated values, reducing manual input and improving consistency when creating new resources.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 7,
    category: 'Enhancements',
    title: 'Improved endpoint generation in wizards',
    description:
      'Endpoint generation in the API resource wizard now correctly produces patterns based on the actual API version and properly handles version numbers and dot notation.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 8,
    category: 'Bug Fixes',
    title: 'Application assertion confirmation',
    description:
      'The "Generating Assertion" confirmation dialog no longer appears when generating an assertion for an already-locked application.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 9,
    category: 'Bug Fixes',
    title: 'Domain mapping validation feedback',
    description:
      'Disabling a Domain Mapping that is still in use now surfaces the API error to the user.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 10,
    category: 'Bug Fixes',
    title: 'Authorisation Server IDP configuration button',
    description:
      'The Add IDP Configuration button is now correctly disabled when the Authorisation Server is inactive.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 11,
    category: 'Bug Fixes',
    title: 'Suspended application deletion',
    description:
      'Suspended applications can now be deleted directly from the Application Details page.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 12,
    category: 'Bug Fixes',
    title: 'Domain Users page refresh',
    description:
      'Updates to Domain User information are now reflected immediately, without requiring a page refresh.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 13,
    category: 'Bug Fixes',
    title: 'Flag confirmation dialog text',
    description:
      'Corrected wording in the Disable Flag confirmation dialog (previously said "certification" instead of "flag").',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 14,
    category: 'Bug Fixes',
    title: 'API Family endpoint validation',
    description:
      'Resolved several issues including duplicate endpoint definitions, incorrect version handling for generated endpoints, and improved validation when defining endpoint patterns.',
  },
  {
    release: '2.1.0',
    effectiveDate: '2026-04-02',
    number: 15,
    category: 'Bug Fixes',
    title: 'Reference Data role validation',
    description:
      'Fixed an issue preventing creation of Authorisation Domain Roles when the description exceeded the allowed character limit.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.0.0 — 19 February 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 1,
    category: 'New Features',
    title: 'API Families configuration via Reference Data',
    description:
      'API Families can now be configured through Reference Data, allowing ecosystem operators to centrally manage which API families are available and giving participants a clear view of supported APIs.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 2,
    category: 'New Features',
    title: 'Certificate description field',
    description:
      'Certificates now support a Description field to help identify their purpose. The description can be set during certificate creation and updated later, improving clarity for participants managing certificates across multiple environments.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 3,
    category: 'New Features',
    title: 'Authorisation Server details experience',
    description:
      'A redesigned Authorisation Server details page introduces a clearer, more structured layout. Key information such as flags and core server details is easier to identify, with sections grouped and collapsed by default.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 4,
    category: 'New Features',
    title: 'Federation endpoint visibility',
    description:
      'Federation details now display all relevant federation endpoints rather than only the Fetch endpoint, improving transparency when configuring, validating, and troubleshooting federation integrations.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 5,
    category: 'Enhancements',
    title: 'Authority organisation context',
    description:
      'Authorities now clearly indicate which Organisation they belong to when viewed under Reference Data. Where applicable, an Organisation tag links directly to the associated Organisation. Legacy Authorities include an explanation of their previous creation model.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 6,
    category: 'Enhancements',
    title: 'Role type clarity',
    description:
      'The UI now clearly explains the difference between Federation roles and Directory roles, including how metadata behaves differently between them. This reduces confusion when role metadata does not propagate for Federation roles.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 7,
    category: 'Enhancements',
    title: 'Layout and usability improvements',
    description:
      'A unified layout with improved spacing, pagination, and visual consistency has been applied across Organisations, Authorisation Mapping, Domain Users, Terms & Conditions, and Audit History.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 8,
    category: 'Enhancements',
    title: 'Organisation creation flow standardisation',
    description:
      'The legacy "New Organisation" button has been removed. The guided Organisation creation wizard is now the standard method for creating Organisations.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 9,
    category: 'Enhancements',
    title: 'Standardised enable / disable terminology',
    description:
      'Action labels across the Directory have been standardised to Enable / Disable for clarity and consistency when managing resources.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 10,
    category: 'Enhancements',
    title: 'Terms & Conditions management',
    description:
      'Data Administrator users can now manage the Participant Terms & Conditions Signing required? setting when editing Organisations.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 11,
    category: 'Enhancements',
    title: 'Logo upload experience',
    description:
      'Logo uploads now display an image preview before saving. Drag-and-drop uploads are consistently supported across Organisations, Servers, and Applications.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 12,
    category: 'Bug Fixes',
    title: 'Missing actions for approved IDP versions',
    description: 'Fixed missing actions for approved IDP versions.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 13,
    category: 'Bug Fixes',
    title: 'Organisation ID regeneration during creation',
    description:
      'Fixed Organisation ID regeneration issues during the Organisation creation flow.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 14,
    category: 'Bug Fixes',
    title: 'Duplicate backend requests on Reference Data pages',
    description:
      'Eliminated unnecessary duplicate backend requests on Reference Data pages.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 15,
    category: 'Bug Fixes',
    title: 'Authorisation Server configuration validation',
    description:
      'Improved validation when configuring Authorisation Servers to prevent invalid configurations.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 16,
    category: 'Bug Fixes',
    title: 'Flag management and configuration visibility',
    description:
      'Resolved issues affecting flag management and configuration visibility across the UI.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 17,
    category: 'Bug Fixes',
    title: 'Icon visibility across the UI',
    description:
      'Corrected icon visibility issues across the UI for improved visual consistency.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 18,
    category: 'Bug Fixes',
    title: 'Federations page reachability',
    description:
      'The Federations page is no longer reachable when Federations are disabled in the ecosystem.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 19,
    category: 'Bug Fixes',
    title: 'Backend calls when editing Applications',
    description:
      'Reduced unnecessary backend calls when editing Applications.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 20,
    category: 'Bug Fixes',
    title: 'My Organisations filter',
    description:
      'Resolved filtering issues when using the My Organisations filter.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 21,
    category: 'Bug Fixes',
    title: 'Document signing dialog placeholder text',
    description:
      'Corrected placeholder text displayed in document signing dialogs.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 22,
    category: 'Bug Fixes',
    title: 'Required-field indicators in Application configuration',
    description:
      'Added missing required-field indicators in Application configuration screens.',
  },
  {
    release: '2.0.0',
    effectiveDate: '2026-02-19',
    number: 23,
    category: 'Bug Fixes',
    title: 'General stability and reliability improvements',
    description:
      'General stability, consistency, and reliability improvements across the Directory UI.',
  },
]

// Helpers ────────────────────────────────────────────────────────────────────
export function yearOf(entry: TrustFrameworkEntry): string {
  return entry.effectiveDate.slice(0, 4)
}

export function entriesForYear(year: string): TrustFrameworkEntry[] {
  return TRUST_FRAMEWORK_RELEASES
    .filter((e) => yearOf(e) === year)
    .slice()
    .sort((a, b) => {
      if (a.release !== b.release) return b.release.localeCompare(a.release, undefined, { numeric: true })
      return a.number - b.number
    })
}

export function anchorFor(entry: TrustFrameworkEntry): string {
  const safeRelease = entry.release.replace(/\./g, '-')
  return `release-${safeRelease}-${entry.number}`
}

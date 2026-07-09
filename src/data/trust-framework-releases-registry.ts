// To add a release: append entries with the same `release` value, incrementing
// `number` per entry within that release. New calendar years are picked up
// automatically from `trustFrameworkYears` by the SSG path enumeration.

export type TrustFrameworkCategory = 'New Features' | 'Enhancements' | 'Bug Fixes'

export interface TrustFrameworkEntry {
  release: string                         // '2.2.0'
  effectiveDate: string                   // ISO date ('2026-06-02'), or a 4-digit
                                          // year ('2026') for an undated planned release
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
  // 2.5.0 — release date to be confirmed (planned)
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 1,
    category: 'New Features',
    title: 'Cross-client application and certificate management scope',
    description:
      'A new directory:software:organisation:application:management scope lets a software client programmatically create, update, suspend, and delete other clients within the same organisation, supporting automated onboarding workflows.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 2,
    category: 'Enhancements',
    title: 'Expanded search, filtering, and sorting across Directory resources',
    description:
      'Directory API endpoints now support filtering, sorting, and partial-match search across organisations, contacts, authority claims, domain users, API resources, certifications, applications, and administrators.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 3,
    category: 'Enhancements',
    title: 'Unified Documents view',
    description:
      'The Documents page has been redesigned into a single scrollable view, replacing the previous two-tab layout. Pending signatures and signing history are combined into collapsible sections.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 4,
    category: 'Enhancements',
    title: 'Sortable audit table columns',
    description:
      'Audit table columns can now be sorted directly from the UI.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 5,
    category: 'Bug Fixes',
    title: 'Sign button on deleted documents',
    description:
      'Resolved an error when using the sign button on deleted documents.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 6,
    category: 'Bug Fixes',
    title: 'Authority role claim domain validation',
    description:
      'Fixed domain status validation when adding authority role claims.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 7,
    category: 'Bug Fixes',
    title: 'Organisation search clear button and filters',
    description:
      'Corrected the organisation search clear button and filter persistence.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 8,
    category: 'Bug Fixes',
    title: 'Terms & Conditions signers dropdown',
    description:
      'Fixed the Terms & Conditions signers dropdown to reflect the actual signer count.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 9,
    category: 'Bug Fixes',
    title: 'Clients endpoint page size validation',
    description:
      'Improved page size validation on the clients endpoint.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 10,
    category: 'Bug Fixes',
    title: 'Federation entity management type field',
    description:
      'Restored selectability of the type field in federation entity management.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 11,
    category: 'Bug Fixes',
    title: 'Reference Data flags creation date',
    description:
      'Corrected the creation date displayed for Reference Data flags.',
  },
  {
    release: '2.5.0',
    effectiveDate: '2026',
    planned: true,
    number: 12,
    category: 'Bug Fixes',
    title: 'Token endpoint error handling',
    description:
      'Fixed token endpoint 500 errors on account lookup and short credential values.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.4.0 — 7 July 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 1,
    category: 'New Features',
    title: 'Date-based sorting for the audit log endpoint',
    description:
      'The audit log endpoint now fully implements the sort parameter, letting consumers retrieve audit records ordered by date and rely on deterministic ordering when querying audit history.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 2,
    category: 'New Features',
    title: 'External document links and regulatory document types for organisations',
    description:
      'Organisations can now register and manage links to external documents. A new Regulatory Documents tab, with dedicated API endpoints, captures a document type, a validated HTTPS URI, and an optional description, while a Regulatory Document Types tab in Reference Data lets administrators manage the available types. Read-only users see the list without edit controls. The feature is disabled by default and can be enabled per request.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 3,
    category: 'New Features',
    title: 'Certificate Authorities management in Reference Data',
    description:
      'A new Certificate Authorities section in Reference Data provides full root CA lifecycle management: create, view, update, enable, and disable root CAs via PEM upload or paste. A unified wizard auto-detects the certificate type (root only, root with intermediate, or intermediate referencing an existing root) and visualises the trust chain as an interactive node graph. Administrators can edit a Root CA name or an Intermediate CA chain name directly, and the Intermediates tab supports View, Enable, and Disable with confirmation dialogs. The wizard resumes from the intermediates step on retry without re-creating the root CA, hierarchical mTLS trust constraints are enforced, and validation covers duplicate detection, invalid file formats, and required contact fields.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 4,
    category: 'New Features',
    title: 'Audit log visibility for organisations',
    description:
      'Organisation records now expose an audit trail, consistent with the audit functionality already available for applications. Users with appropriate permissions can review a chronological history of changes made to an organisation.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 5,
    category: 'New Features',
    title: 'Organisation name on the /clients endpoint',
    description:
      'The /clients endpoint response now includes an organisation_name field, populated from the organisation record, allowing identity providers to display the organisation name associated with a client and supporting distributor and representative model use cases.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 6,
    category: 'New Features',
    title: 'Audit history for certificates, organisation roles, and domains',
    description:
      'Audit history is now available for application certificates (navigable by application and by certificate, identified by key type and KID), organisation roles (navigable by role name), and organisation domains (navigable by domain name).',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 7,
    category: 'New Features',
    title: 'grant_id returned by the token endpoint',
    description:
      'The /token endpoint response now includes a grant_id field for code exchange and refresh token flows, allowing TPPs to retrieve user consents even after tokens are revoked. It is included by default and can be disabled per environment via grant_id_in_token_response=false; existing token response structures and flows are unaffected.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 8,
    category: 'New Features',
    title: 'Generic grant revocation endpoint with soft-delete',
    description:
      'A new generic grant revocation endpoint operates independently of specific consent flows. Grants are soft-deleted on revocation, preserving history and the revocation reason (for example TPP-initiated, refresh token reuse, or session end), with configurable TTL-based expiry — access tokens have a 1-hour lifetime while refresh tokens and grants have a 100-year lifetime. A migration is required to create or drop TTL indexes depending on the soft-deletion configuration.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 9,
    category: 'New Features',
    title: 'Audit endpoint support for server certification and server roles',
    description:
      'The audit API now supports the authorisationServerCertification resource type alongside server roles and API resources, queryable with the standard actionType, organisationId, resourceId, performedBy, and date-range parameters. Requests using the server certification resource type previously returned a "resource type not implemented" error.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 10,
    category: 'Enhancements',
    title: 'DELETE replaces PUT for removing server resources',
    description:
      'The Directory UI now uses HTTP DELETE when removing authorisation servers, API resources, and server certifications, replacing the previous behaviour of calling PUT with a status of Inactive. The change is internal to the UI and requires no action from API consumers or integrators.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 11,
    category: 'Enhancements',
    title: 'Responsive wizard layout across device sizes',
    description:
      'Multi-step wizards now adapt to screen size: step numbers only on mobile, step numbers with hover tooltips on small laptops, and full step labels on larger screens.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 12,
    category: 'Enhancements',
    title: 'Bound domain IDs in Authority deactivation errors',
    description:
      'When deactivating an Authority still bound to active authorisation domain mappings, the API error response now includes the IDs of all bound domains, allowing administrators to identify and remove the relevant mappings before retrying.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 13,
    category: 'Enhancements',
    title: 'API auto-fill uses endpoint regex format',
    description:
      'API auto-fill now fetches the registered endpoint regex format for the relevant API family rather than the API family version, so auto-populated values more accurately reflect the expected endpoint structure.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 14,
    category: 'Bug Fixes',
    title: 'Invalid UUID path segments return 400 not 500',
    description:
      'Path segments expected to be UUIDs — authorisation server ID, software statement ID, and domain user ID — now return a clean 400 Bad Request instead of an unhandled 500 Internal Server Error.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 15,
    category: 'Bug Fixes',
    title: 'No reactivation email for already-active users',
    description:
      'Setting an organisation administrator to Active via PUT no longer triggers a reactivation email when the user is already active; the API now suppresses the email when no state change has occurred.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 16,
    category: 'Bug Fixes',
    title: 'Cleared optional fields no longer submitted as empty strings',
    description:
      'When creating an authorisation server, optional fields that were edited and then cleared are now omitted from the request payload rather than submitted as empty strings, which previously caused an API error.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 17,
    category: 'Bug Fixes',
    title: 'Concurrent duplicate user creation handled correctly',
    description:
      'A race condition that could cause duplicate key violations when multiple requests initialised the same user simultaneously is now handled correctly, returning a 400 Bad Request instead of an unhandled server error.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 18,
    category: 'Bug Fixes',
    title: 'Audit entries generated for updated API resources',
    description:
      'Updates to API Resources now consistently produce audit entries retrievable via the audit API; previously no audit records were created, causing the audit endpoint to return empty results.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 19,
    category: 'Bug Fixes',
    title: 'Flags included in replicated directory snapshots',
    description:
      'Flag values are now correctly returned for organisations, authorisation servers, and software statements in directory snapshot data replicated to Open Finance consumers, in line with the published API specification.',
  },
  {
    release: '2.4.0',
    effectiveDate: '2026-07-07',
    number: 20,
    category: 'Bug Fixes',
    title: 'Accurate API error messages in IDP configuration',
    description:
      'When creating an IDP configuration fails, the UI now displays the meaningful error returned by the API rather than a generic message, giving administrators clear guidance on what to correct.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.3.0 — 8 June 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 1,
    category: 'New Features',
    title: 'Application change history and audit comparison',
    description:
      'Applications now include an audit history view that supports comparing versions side by side. When non-sequential versions are compared, the interface warns that intermediate changes may not be reflected in the diff. Tabs for certificates, flags, and roles are present and marked as coming soon.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 2,
    category: 'New Features',
    title: 'Filter Authorisation Servers by active status',
    description:
      'The Authorisation Servers list page now includes a Show active servers only toggle, mirroring the equivalent filter already available on the Applications list.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 3,
    category: 'New Features',
    title: 'Audit view resource navigation',
    description:
      'The audit view now includes a primary switcher that lets users move between resources and their associated audit items.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 4,
    category: 'Enhancements',
    title: 'Responsive filter layouts',
    description:
      'Filter controls now collapse into a filter count icon on smaller screens, keeping filtering accessible on mobile without crowding the layout.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 5,
    category: 'Enhancements',
    title: 'Email format validation during registration',
    description:
      'User registration now validates email format, with invalid formats rejected at the API level.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 6,
    category: 'Enhancements',
    title: 'Flexible query parameter syntax in search',
    description:
      'Search endpoints now accept both repeated query parameters and comma-separated values for the same parameter.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 7,
    category: 'Enhancements',
    title: 'Service Desk contact visibility',
    description:
      'The Service Desk scope now retrieves contacts across all visibility levels.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 8,
    category: 'Enhancements',
    title: 'Expanded global search criteria',
    description:
      'Global search now supports organisation registration numbers and parent organisation IDs as search criteria.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 9,
    category: 'Bug Fixes',
    title: 'Premature success modals in Application wizards',
    description:
      'Fixed an issue where success modals could appear before an Application wizard step had completed.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 10,
    category: 'Bug Fixes',
    title: 'Domain user role validation feedback',
    description:
      'Fixed enable/disable role validation for Domain Users, with clearer error messaging.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 11,
    category: 'Bug Fixes',
    title: 'Simulator consent flow message contrast',
    description:
      'Corrected low-contrast informational messages in the simulator consent flows.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 12,
    category: 'Bug Fixes',
    title: '"Family complete" flag for Open Data APIs',
    description:
      'Fixed evaluation of the Family complete flag for Open Data API families.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 13,
    category: 'Bug Fixes',
    title: 'Authority list sorting',
    description:
      'Repaired sorting on the authority list.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 14,
    category: 'Bug Fixes',
    title: 'Duplicate network requests',
    description:
      'Eliminated duplicate network requests issued on certain pages.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 15,
    category: 'Bug Fixes',
    title: 'Certificate table layout',
    description:
      'Corrected certificate table alignment and column responsiveness.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 16,
    category: 'Bug Fixes',
    title: 'Domain Mapping disable error visibility',
    description:
      'Fixed visibility of the error shown when disabling a Domain Mapping that is still in use.',
  },
  {
    release: '2.3.0',
    effectiveDate: '2026-06-08',
    number: 17,
    category: 'Bug Fixes',
    title: 'IDP Configuration field toggles',
    description:
      'Resolved an issue with field toggle behaviour on the IDP Configuration screen.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2.2.0 — 2 June 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 1,
    category: 'New Features',
    title: 'Directory version display',
    description:
      'The current directory version is now shown in the UI via the profile menu. Selecting Versions opens a modal displaying the active release version with direct links to the Release Notes and API documentation.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 2,
    category: 'New Features',
    title: 'Server roles',
    description:
      'Authorisation Servers now include a dedicated Roles tab. The tab surfaces associated domains, roles, and authorities, and allows administrators to add and manage server roles directly from the server detail view.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 3,
    category: 'New Features',
    title: 'Improved OTP validation in onboarding',
    description:
      'The onboarding verification flow now separates email and phone OTP validation into distinct steps. Email validation runs first, followed by phone where applicable. Phone OTP is skipped when not configured in the environment.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 4,
    category: 'New Features',
    title: 'New scope for audit log access across organisations',
    description:
      'A new directory:software:audit scope supports automated retrieval of audit logs via client credentials, without a human user account. Organisation Administrators can use an Application with this scope to query audit endpoints programmatically.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 5,
    category: 'Enhancements',
    title: 'Disabled action icons when unavailable',
    description:
      'Action icons on Organisation, Server, and Application cards are now visually disabled when unavailable. A tooltip clarifies why the action is inactive or permission-restricted.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 6,
    category: 'Enhancements',
    title: 'Updated toggle design',
    description:
      'Toggle controls across the Directory have been updated to align with the design system.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 7,
    category: 'Enhancements',
    title: 'Responsive search bar',
    description:
      'The global search bar now scales responsively across screen sizes, adapting on mobile and dynamically adjusting on larger displays.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 8,
    category: 'Enhancements',
    title: 'Paginated certification types dropdown',
    description:
      'The Certification Type and Certification Type Variant dropdowns now support auto-complete and pagination, improving usability when working with a large number of certification types.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 9,
    category: 'Enhancements',
    title: 'Scroll-to-error behaviour in dialogs',
    description:
      'Forms within dialogs now scroll to the first invalid field when validation fails, while preserving error summary visibility.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 10,
    category: 'Bug Fixes',
    title: 'Improved global search feedback',
    description:
      'Fixed an issue where typing in the global search bar briefly displayed "No results for…" before the search completed. The interface now correctly shows a "Searching…" state during queries.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
    number: 11,
    category: 'Bug Fixes',
    title: 'API metadata schema duplication across API families',
    description:
      'Fixed an issue where configuring API resource metadata at the authorisation server level incorrectly applied the same schema to multiple distinct API Families. Each API Family now reflects its own configured metadata schema.',
  },
  {
    release: '2.2.0',
    effectiveDate: '2026-06-02',
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

// Distinct calendar years that have at least one entry — consumed by the SSG
// path enumeration in `vite.config.ts` to materialise one HTML per year.
export const trustFrameworkYears: string[] = [
  ...new Set(TRUST_FRAMEWORK_RELEASES.map((e) => yearOf(e))),
].sort()

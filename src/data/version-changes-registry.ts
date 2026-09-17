// The register of changes between published Standards versions.
//
// Deliberately shaped like erratas-registry.ts: both are searchable registers
// of what changed, and the two pages share a faceted-search layout.
// The distinction is what they record —
//
//   Errata          a correction to a version after it was published
//   Version change  a difference between one version and the next
//
// Add an entry here for every change made between versions. `affectedPaths`
// drives the "where this applies" links and MUST point at pages that exist.

import { allEndpoints, sectionUrl, surfaceUrl } from './endpoints'
import type { Version } from './versions'

export interface VersionChangeEndpoint {
  label: string           // e.g. "POST /account-access-consents/{ConsentId}/attestations"
  path: string            // internal route path
}

export interface VersionChangeDoc {
  /** What this link specifies, e.g. "Full specification", "TPP specification". */
  label: string
  path: string
}

export type ChangeCategory =
  | 'Version uplift'      // identifiers/paths carrying the version number
  | 'New capability'      // functionality that did not exist in the prior version
  | 'Behaviour change'    // same surface, different behaviour
  | 'No change'           // explicitly recorded so implementers can scope work

export type ChangeAudience = 'TPP' | 'LFI' | 'Both'

export interface VersionChange {
  /** Which version pair this change belongs to, e.g. "v2.1-to-v2.2". */
  changeId: string
  /** Version being compared from, e.g. "v2.1". */
  fromVersion: string
  /**
   * Documentation version this change lands in, e.g. "v2.2-rc1". This is the
   * route segment, so it is what the changelog page is keyed on.
   */
  toVersion: string
  /** Ordinal within the version pair (1, 2, 3, …). */
  number: number
  category: ChangeCategory
  /** Heading text without the number. */
  title: string
  /** One-line description shown in the result row. */
  summary: string
  /** Prose — what changed. Plain text, \n\n for paragraph breaks. */
  description: string
  /**
   * The page(s) that specify this change in full. The changelog is a register,
   * not the specification — every substantive change should have somewhere to
   * send the reader for field tables, enums, and worked examples.
   *
   * A change that lands on both surfaces carries one entry per surface, each
   * labelled: a reader on the LFI side should not have to work out which of two
   * links is the one they implement against.
   */
  docsPaths?: VersionChangeDoc[]
  /** Who has to do something about it. */
  audience: ChangeAudience
  /** Functional areas, used as a search facet. */
  areas: string[]
  /** OpenAPI spec names touched, e.g. "uae-account-information-openapi". */
  specs?: string[]
  endpoints?: VersionChangeEndpoint[]
  /** Pages that document the change. */
  affectedPaths: string[]
}

const TPP = '/tech/tpp-standards/v2.2-rc1'
const LFI = '/tech/lfi-api-hub/v2.2-rc1'
const DDC = `${TPP}/consent/data-deletion-confirmation`
const CM = `${LFI}/api-hub/consent-manager`
const COP = `${LFI}/banking/confirmation-of-payee`

// The products catalogue, which is slugged differently on each surface:
// `products-leads` on the TPP side, `products-and-leads` on the LFI side. Both
// are live public routes — this is not an inconsistency to be tidied here.
const PRODUCTS_TPP = `${TPP}/banking/products-leads`
const PRODUCTS_LFI = `${LFI}/banking/products-and-leads`

// Version-number uplifts (consent URNs, `/open-finance/{family}/v2.2` base
// paths) are not recorded here. They follow mechanically from the version
// change and are visible on every page; listing them adds noise, not signal.
export const VERSION_CHANGES: VersionChange[] = [
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 1,
    category: 'New capability',
    title: 'Data deletion confirmation — attestations sub-resource',
    summary:
      'A TPP confirms it has deleted (or lawfully retained) the data held under a consent, by posting an Attestation Event once that consent reaches a terminal status.',
    description:
      'Every consent gains an append-only `attestations` sub-resource. Once a consent reaches a terminal status — `Revoked` or `Expired` — the TPP reviews the data it holds under that consent and POSTs an Attestation Event confirming what it did with it. `Rejected` consents are out of scope: no data was ever shared under them.\n\n' +
      'The sub-resource is added to all three consent types, each scoped to its own API family:\n\n' +
      '`POST /account-access-consents/{ConsentId}/attestations` (scope `accounts`), `POST /payment-consents/{ConsentId}/attestations` (scope `payments`), and `POST /insurance-consents/{ConsentId}/attestations` (scope `insurance`).\n\n' +
      'A payment consent is not empty for this purpose — it carries debtor and creditor details, amounts, references, and any account data the TPP retrieved to set the payment up, so it falls under the same obligation as a data sharing consent.\n\n' +
      'The event body carries an envelope — `AttestationType` (today only `DataRetentionDeletion`), `AttestationStatusAppliedDateTime`, `DataAccessCeasedDateTime`, and `ConsentRevocationDateTime` where the customer revoked at the TPP — plus a `DataActions` array with one entry per category of data held. Each entry declares whether that category was `Deleted`, `Retained`, `Anonymised`, or `ArchivedRestricted`, and carries the date the attestation for that category was made; anything kept also requires a retention reason, a retained-until date, and an access restriction.\n\n' +
      'The POST is not a JSON body: the request is a signed JWT sent as `application/jwt`, carrying the Attestation in its `message` claim, and the `201` response is a signed JWT in return. The receipt inside it gives `AttestationId`, `AttestationReceivedDateTime` and `RegulatoryDeadlineMetIndicator`, plus a full copy of the Attestation submitted — repeating it puts the complete record inside the signed message. `RegulatoryDeadlineMetIndicator` reports whether the event arrived before the regulatory deadline for the attestation type; for `DataRetentionDeletion` that is 45 days from the consent becoming terminal, a value the API Hub applies rather than one the specification carries. A late event is still recorded, not rejected.\n\n' +
      'The GET returns every recorded event as unsigned JSON, paginated, each carrying its copy of the submitted Attestation. Where a TPP has posted more than one, only the last successfully recorded event is reported on; `LastSubmitted=true` retrieves just that one.\n\n' +
      'The sub-resource is append-only and stateless. Each POST records a new immutable event, the API Hub applies no de-duplication, and there is no correction endpoint — a restatement is simply another event. `AttestationType` is the extension point: a future obligation to attest to something else against a consent becomes a new type rather than a new API.\n\n' +
      'The full specification — field tables, enum values, validation rules, and worked examples — is on the Data Deletion Confirmation page linked below.',
    docsPaths: [{ label: 'Full specification', path: `${DDC}/` }],
    audience: 'TPP',
    areas: ['Consent', 'Data Deletion', 'Data Sharing', 'Service Initiation', 'Insurance'],
    specs: [
      // The sub-resource is published in each family's own document rather than
      // one of its own, so all three are listed.
      'uae-account-information-openapi',
      'uae-bank-initiation-openapi',
      'uae-insurance-openapi',
    ],
    endpoints: [
      {
        label: 'POST /account-access-consents/{ConsentId}/attestations',
        path: `${DDC}/open-api/post-account-access-consents-ConsentId-attestations`,
      },
      {
        label: 'GET /account-access-consents/{ConsentId}/attestations',
        path: `${DDC}/open-api/get-account-access-consents-ConsentId-attestations`,
      },
      {
        label: 'POST /payment-consents/{ConsentId}/attestations',
        path: `${DDC}/open-api/post-payment-consents-ConsentId-attestations`,
      },
      {
        label: 'GET /payment-consents/{ConsentId}/attestations',
        path: `${DDC}/open-api/get-payment-consents-ConsentId-attestations`,
      },
      {
        label: 'POST /insurance-consents/{ConsentId}/attestations',
        path: `${DDC}/open-api/post-insurance-consents-ConsentId-attestations`,
      },
      {
        label: 'GET /insurance-consents/{ConsentId}/attestations',
        path: `${DDC}/open-api/get-insurance-consents-ConsentId-attestations`,
      },
    ],
    affectedPaths: [
      `${TPP}/consent/`,
      `${TPP}/consent/requirements`,
      `${TPP}/banking/data-sharing/`,
      `${TPP}/banking/service-initiation/`,
      `${TPP}/insurance/data-sharing/`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 2,
    category: 'Behaviour change',
    title: 'Consents by end user — the `status` filter accepts multiple statuses',
    summary:
      'The `status` query parameter on `GET /psu/{userId}/consents` takes a comma-separated list of consent statuses instead of a single value, and is constrained to the `AEConsentStatus` enum.',
    description:
      '`GET /psu/{userId}/consents` filters an end user\'s consents by status. In v2.1 the `status` parameter is a single untyped string, so an LFI building a Consent Management Interface that shows, say, every consent still in use has to issue one request per status and merge the results itself.\n\n' +
      'In v2.2 the parameter becomes a comma-separated list — `?status=Authorized,Suspended` — evaluated as a union: a consent is returned if its status matches any value in the list. A single value behaves exactly as it does in v2.1, and omitting the parameter still returns consents of every status. Order is not significant and duplicates are ignored.\n\n' +
      'The parameter is also now typed. In v2.1 its schema is a bare `string` with no enum, so the specification places no constraint on what may be sent and an unrecognised value simply returns an empty array. In v2.2 each list item MUST be a member of `AEConsentStatus` — `AwaitingAuthorization`, `Authorized`, `Rejected`, `Revoked`, `Expired`, `Consumed`, or `Suspended` — and a request carrying any other value is rejected with `400`. Values are case-sensitive.\n\n' +
      'The change is scoped to this one operation. The three sibling list endpoints — `GET /consents`, `GET /consent-groups/{consentGroupId}/consents`, and `GET /accounts/{accountId}/consents` — share the v2.1 `status` parameter component and are unchanged in v2.2; they continue to accept a single untyped value.\n\n' +
      'The comma-separated form follows the convention already used for multi-valued query parameters elsewhere in the standards, such as `accountIds` and `insurancePolicyIds` on the Ozone Connect endpoints, so it needs no new parsing on the LFI side. In OpenAPI terms the parameter becomes an array with `style: form` and `explode: false`.\n\n' +
      'The change is published in the v2.2 release of the Consent Manager OpenAPI document in the api-specs repository, which is what the endpoint page below renders.',
    docsPaths: [{ label: 'Full specification', path: `${CM}/open-api/psu-userId-consents` }],
    audience: 'LFI',
    areas: ['Consent', 'Consent Manager', 'Consent Management Interface'],
    specs: ['uae-api-hub-consent-manager-openapi'],
    endpoints: [
      {
        label: 'GET /psu/{userId}/consents',
        path: `${CM}/open-api/psu-userId-consents`,
      },
    ],
    affectedPaths: [
      `${CM}/`,
      `${CM}/open-api/psu-userId-consents`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 3,
    category: 'New capability',
    title: 'Payment log records the rail used to settle the payment',
    summary:
      'The LFI reports which rail settled a payment — `AANI`, `FTS`, or `LFI` for an on-us transfer — as a new `paymentResponse.paymentRail` field on the payment log.',
    description:
      'The payment log records what the API Hub knows about a payment, but not how it was settled. `paymentResponse.paymentTransactionId` already depends on the rail to be interpreted — its v2.1 description singles out AANI-generated identifiers in prose — while nothing in the record states which rail produced it.\n\n' +
      'v2.2 adds `paymentResponse.paymentRail`, a closed enum of `AANI` (the UAE instant payment platform), `FTS` (UAEFTS, the CBUAE funds transfer system), and `LFI` (settled internally, both accounts held at the same LFI, so the payment never reached an external rail). The LFI sets it on the existing `PATCH /payment-log/{id}` call, and it is returned on `GET /payment-log`.\n\n' +
      'The value records how the payment was executed rather than how it was requested: where an LFI\'s routing rules settle an instant payment on another rail, the field reports the rail actually used. A payment settles over exactly one rail — this holds for file payments as well as single payments, so one value describes the whole record.\n\n' +
      'The LFI MUST populate the field when patching the status to a terminal success — `AcceptedWithoutPosting`, `AcceptedSettlementCompleted`, or `AcceptedCreditSettlementCompleted`. It MAY be sent alongside `Pending`, and MAY be omitted on `Rejected`, where the payment may have been rejected before any rail was selected.\n\n' +
      'The three values are the namespaces already used by `paymentResponse.rejectReasonCode`, whose v2.1 pattern is `^(AANI|FTS|LFI)\\.[A-Za-z0-9]+$`. The two fields MUST therefore agree: an `AANI.*` reject code is accompanied by `AANI`, and an `FTS.*` code by `FTS`. An `LFI.*` reject code means the payment was rejected at the LFI before rail submission, and carries no such constraint.\n\n' +
      'Because the field is required on a terminal-success patch, an LFI built against v2.1 that patches a completed payment without it is rejected under v2.2. This is the one change in v2.2 that requires action from every LFI, and the API Hub enforcement date is set separately from the version cutover.\n\n' +
      'The change is published in the v2.2 release of the Consent Manager OpenAPI document in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [{ label: 'Full specification', path: `${CM}/open-api/payment-log-id` }],
    audience: 'LFI',
    areas: ['Consent Manager', 'Payments', 'Service Initiation', 'Reporting'],
    specs: ['uae-api-hub-consent-manager-openapi'],
    endpoints: [
      {
        label: 'PATCH /payment-log/{id}',
        path: `${CM}/open-api/payment-log-id`,
      },
      {
        label: 'GET /payment-log',
        path: `${CM}/open-api/payment-log`,
      },
    ],
    affectedPaths: [
      `${CM}/`,
      `${CM}/open-api/payment-log-id`,
      `${CM}/open-api/payment-log`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 4,
    category: 'Behaviour change',
    title: 'Payment log is paginated',
    summary:
      '`GET /payment-log` returns one page of payments instead of every payment under the consent, taking the same `page` and `pageSize` parameters as the consent list operations.',
    description:
      'In v2.1 `GET /payment-log` returns every payment made under a consent in one response. The record it returns is not small — each one embeds the full payment request, its detached signature, the request headers, and the full payment response — so a long-lived consent that has executed hundreds of payments produces a response measured in megabytes, on an endpoint a Consent Management Interface calls to draw a customer-facing payment history.\n\n' +
      'v2.2 paginates the operation, using exactly the model already in place elsewhere in this API. It gains the shared `page` and `pageSize` query parameters — `page` is 1-indexed and defaults to `1`, `pageSize` defaults to 25 — and the response `meta` object, which in v2.1 is empty and closed to additional properties, is replaced by the same `paginationMetadata` schema those endpoints return: `pageNumber`, `pageSize`, `totalPages`, and `totalRecords`.\n\n' +
      'Nothing here is bespoke. The four consent list operations on this API — `GET /consents`, `GET /consent-groups/{consentGroupId}/consents`, `GET /psu/{userId}/consents`, and `GET /accounts/{accountId}/consents` — are the only other paginated endpoints the API Hub provides to LFIs, and they take the same two parameter components and return the same metadata schema. `/payment-log` was the one list operation in the API that had been left unpaginated; it now behaves like the endpoints beside it, so an LFI already calling those has nothing new to learn.\n\n' +
      '`totalRecords` counts every payment under the consent and `totalPages` is `ceil(totalRecords / pageSize)`, so a caller reads `totalPages` to know when to stop rather than treating a short page as the last one.\n\n' +
      'This is a behaviour change that requires action. An LFI built against v2.1 that calls this endpoint and renders what it receives will, from v2.2, silently show only the first page of payments on any consent that has more — with no error to signal the truncation. Any caller that needs the full set MUST iterate `page` until `pageNumber` reaches `totalPages`. This is the reason to check the endpoint even where the rest of v2.2 needs no work.\n\n' +
      'The change is published in the v2.2 release of the Consent Manager OpenAPI document in the api-specs repository, which is what the endpoint page below renders.',
    docsPaths: [{ label: 'Full specification', path: `${CM}/open-api/payment-log` }],
    audience: 'LFI',
    areas: ['Consent Manager', 'Payments', 'Consent Management Interface'],
    specs: ['uae-api-hub-consent-manager-openapi'],
    endpoints: [
      {
        label: 'GET /payment-log',
        path: `${CM}/open-api/payment-log`,
      },
    ],
    affectedPaths: [
      `${CM}/`,
      `${CM}/open-api/payment-log`,
      `${LFI}/consent-management-interface/api-guide`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 5,
    category: 'Behaviour change',
    title: 'Transaction narrative is required',
    summary:
      'Every transaction returned by the transactions endpoint MUST carry a narrative. `TransactionInformation` moves from optional to required on both the TPP-facing and the Ozone Connect transaction schema.',
    description:
      'A transaction the customer cannot recognise is of limited use to them. In v2.1 the narrative that identifies an entry — `TransactionInformation` on the TPP-facing schema, `transactionInformation` on Ozone Connect — is an optional field on both, so a conformant LFI may return a transaction carrying nothing but an amount, a date, and a type. TPPs then either display an entry the customer cannot place, or build their own guesswork from the fields that are present.\n\n' +
      'In v2.2 the field is technically required: it is added to the `required` list of `AETransaction` in the Account Information specification and of `CbuaeTransaction` in the Ozone Connect Bank Data Sharing specification. A transaction record that omits it no longer validates on either surface.\n\n' +
      'The requirement applies to both surfaces because the API Hub can only return a narrative the LFI supplied. Requiring it TPP-side alone would leave the Hub with nothing to serialise on a record the LFI is still permitted to send without one.\n\n' +
      'Being present is not on its own sufficient. The value MUST be a human-readable description by which the customer can recognise the entry. Where the LFI\'s core banking system holds no stored narrative for a transaction, the LFI MUST derive one from the data it does hold — the merchant name, the counterparty, or the transaction type. Whitespace-only values and non-informative placeholders such as `N/A`, `-`, or `Unknown` do not satisfy the requirement, and an empty string is rejected by the schema in any case.\n\n' +
      'The Ozone Connect field is also bounded to match: it gains `minLength: 1` and `maxLength: 500`, the constraints the TPP-facing schema has carried since v2.1. Without them an LFI could return a 600-character narrative that passes its own contract and then fails the Hub\'s — a failure invisible in the document the LFI builds against.\n\n' +
      'This is a change every LFI must act on. An LFI built against v2.1 that returns transactions without a narrative — or without one for a subset of transaction types, which is the more common case — will have those responses rejected under v2.2. TPPs need take no action, but may stop handling the field as absent once their LFIs are on v2.2.\n\n' +
      'Both specifications carry the requirement in their v2.2 release in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'TPP specification',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'Ozone Connect specification',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
    ],
    audience: 'Both',
    areas: ['Data Sharing', 'Transactions', 'Ozone Connect'],
    specs: [
      'uae-account-information-openapi',
      'uae-ozone-connect-bank-data-sharing-openapi',
    ],
    endpoints: [
      {
        label: 'GET /accounts/{AccountId}/transactions (TPP)',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'GET /accounts/{AccountId}/transactions (Ozone Connect)',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
    ],
    affectedPaths: [
      `${TPP}/banking/data-sharing/`,
      `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      `${LFI}/banking/data-sharing/`,
      `${LFI}/banking/data-sharing/requirements`,
      `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 6,
    category: 'Behaviour change',
    title: 'Confirmation of Payee — the LFI sees only the IBAN, and answers with a name',
    summary:
      'The Ozone Connect CoP request carries the IBAN alone, and the response carries the account holder\'s name directly. The submitted name, the `verifiedClaims` / `verification` identity-assurance envelope, and the wider customer data it wrapped are all removed from the operation.',
    description:
      'Confirmation of Payee asks one question: does this name belong to this IBAN? The API Hub answers it. The LFI\'s only job is to say who holds the account — so in v2.2 the operation is reduced to that on both sides.\n\n' +
      '**The request loses the name.** `data.account` now carries `schemeName` and `identification` only. The name the TPP submitted was never the LFI\'s to act on: the LFI looks the account up by IBAN and returns the holders it has, and the API Hub compares. Sending it invited exactly the matching this operation forbids, and it disclosed a payee\'s name to an institution that has no use for it on a call made without a consent. The `PersonName` and `BusinessName` schemas are removed with it.\n\n' +
      '**The response loses the envelope.** In v2.1 the LFI answers through a four-level structure borrowed from OpenID Connect for Identity Assurance — `data[]` → `verifiedClaims[]` → `verification{…}` → `claims{…}` — of which only the innermost name is read. The two middle levels are removed: each entry in `data` carries `name` directly, either a `CbuaeCopPersonName` (`fullName` required) or a `CbuaeCopBusinessName` (`businessName` required).\n\n' +
      'The `verification` subtree goes with it — trust framework, assurance level, assurance process and evidence metadata are no longer part of this operation. Every LFI builds that structure today and the API Hub does not read it.\n\n' +
      'So does the wider customer data. The v2.1 `ConfirmationOfPayeePersonClaims` schema carries 23 fields, among them `salary`, `employerName`, `maritalStatus`, `residentialAddress`, `emiratesId`, `birthDate` and `nationality`. None of it is needed to compare two names, and Confirmation of Payee runs **without a consent**. The optional `number` field is dropped for the same reason. `id` is retained: it is pseudonymous by definition and is the only handle for investigating a disputed result.\n\n' +
      'Structured name fields are retained as **optional** members, so the Hub\'s matching algorithm can be improved without a second breaking change to this contract. A person name may carry `firstName`, `middleName`, `lastName`, `fullNameAr` (the name in Arabic script) and `alsoKnownAs`; a business name may carry `businessNameAr` and `alsoKnownAs`. Only `fullName` and `businessName` are matched today, and a response carrying nothing but `fullName` is fully conformant.\n\n' +
      'The response also settles a naming inconsistency: v2.1 used `fullName`/`givenName`/`familyName` here and `fullName`/`firstName`/`lastName` on the request. v2.2 settles on `firstName`/`lastName`. `givenName` and `familyName` were in any case already documented as withdrawn — the v2.1 schema records that implementing them was "removed as of v1.2.1".\n\n' +
      'Three semantics that were previously implicit are now stated in the specification rather than only in the guide. The LFI performs no matching, and MUST NOT filter, rank or omit holders on any basis — the API Hub owns the rules. A joint account MUST return one entry per holder, and the API Hub evaluates every entry in `data` rather than stopping at the first. Not found is `200` with an empty `data` array, never `204`, `404`, `201` or `202`; account-not-found, account-barred and customer-opted-out are deliberately indistinguishable so a CoP query cannot be used to probe for the existence of an account.\n\n' +
      'Removing the submitted name also resolves a v2.1 limitation. Claim-block selection previously followed the TPP\'s request type rather than the data the LFI holds, so a business name submitted against an account held as a personal name was answered as a protocol error rather than as a no-match. With no name in the request there is nothing to select on: the LFI returns what it holds, and the Hub decides.\n\n' +
      'This is a breaking change and requires action from every LFI. It is confined to the two bodies of this one operation — headers, query parameters, status codes and error codes are unchanged, so the work is a rewrite of the request parser and response builder rather than a new integration. The TPP-facing `/confirmation` and `/discovery` endpoints do not move: the TPP still submits a name, and the API Hub normalises between the two surfaces.\n\n' +
      'The reshaped schemas are published in the v2.2 release of the Ozone Connect Bank Data Sharing specification in the api-specs repository, which is what the endpoint page below renders.',
    docsPaths: [
      { label: 'Full specification', path: `${COP}/api-guide` },
      { label: 'OpenAPI reference', path: `${COP}/open-api/cop-query` },
    ],
    audience: 'LFI',
    areas: ['Confirmation of Payee', 'Ozone Connect', 'Payments'],
    specs: ['uae-ozone-connect-bank-data-sharing-openapi'],
    endpoints: [
      {
        label: 'POST /customers/action/cop-query',
        path: `${COP}/open-api/cop-query`,
      },
    ],
    affectedPaths: [
      `${COP}/`,
      `${COP}/api-guide`,
      `${COP}/requirements`,
      `${COP}/open-api/cop-query`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 7,
    category: 'New capability',
    title: 'Sharia-compliant product data — expected profit rates, finance rates, and Takaful',
    summary:
      'Product data gains a Sharia-compliant parallel to its interest-based rate structures: `ExpectedProfitRates`, `ShariaFinanceRates`, and two Takaful fields, on the account-scoped product endpoint and the public products catalogue alike.',
    description:
      'v2.1 already lets a rate be labelled as a profit rate: `FixedProfit` and `VariableProfit` are valid `RateType` values on the deposit-rate structure, and the finance-rate structures add `HybridProfit`. What neither structure carries is the detail that tells one Sharia product from another — whether a published rate is an expected or merely an indicative profit rate, the ratio by which profit is shared, and the method and frequency by which it is distributed. An LFI publishing an Islamic product could label the rate but not describe it.\n\n' +
      'v2.2 adds a Sharia-compliant parallel alongside each interest-based structure rather than overloading it. Nothing is replaced, and the conventional fields keep their present meaning and values.\n\n' +
      '**`ExpectedProfitRates`** is the deposit-rate parallel — one-or-more `AEProductExpectedProfitRate1Properties`, each requiring `RateType` (`FixedProfit` or `VariableProfit`), `DepositRateType`, and `RateDetails`, and optionally carrying `ProfitSharingRatio`, `ProfitDistributionMethod`, `ProfitDistributionFrequency` and a free-text `Description`.\n\n' +
      '`DepositRateType` is the distinction that matters to a customer: **`ExpectedProfitRate`** is the LFI\'s projected return on a profit-sharing deposit, while `IndicativeProfitRate` is illustrative only. Both are legitimate things to publish and they are not comparable with one another, so a TPP presenting Islamic deposit products side by side has to read this field to know which it is showing.\n\n' +
      '**`ShariaFinanceRates`** is the finance-rate parallel — `AEProductShariaFinanceRate1Types`, a `oneOf` discriminated on `RateType` across `FixedProfit`, `VariableProfit` and `HybridProfit`. The two new Sharia types compose the existing fixed and variable rate property sets and the existing finance-rate properties with a new `AEProductShariaProfitCalculationMethod1Properties`, whose calculation basis adds `UnusedCreditLine` and `UtilizedLimit` to the three conventional values. `HybridProfit` reuses the existing `AEProductHybridProfitRateProperties` unchanged.\n\n' +
      'Where the rates are account-scoped, `ShariaFinanceRates` may be sent in cleartext or as a JWE at the LFI\'s discretion — exactly the choice `FinanceRates` already offers, and for the same reason. The public products catalogue is answered without a customer and so has no JWE variant, again matching `FinanceRates`. `ExpectedProfitRates` is cleartext on every surface.\n\n' +
      '**`TakafulRequired`** (boolean) and **`TakafulDescription`** (up to 500 characters) complete the set. Takaful is the Sharia-compliant alternative to conventional insurance, and where a product requires cover a TPP needs to be able to say both that it is required and what it is for.\n\n' +
      'Every field added here is optional. An LFI that offers no Islamic products sends nothing new and stays conformant; an LFI that has been approximating profit rates in the interest-based fields can move them across. Nothing is removed, no enum is narrowed, and a v2.1 product payload still validates unchanged — change 8 covers the one place where the *meaning* of an existing field narrows.\n\n' +
      'One internal refactor is visible in the documents but not on the wire: the inline `RateDetails` definition under `DepositRates` is extracted into a shared `AEProductRateDetails1Properties` so `ExpectedProfitRates` can reuse it. The extracted definition is identical to the inline one it replaces, so `DepositRates` is unchanged.\n\n' +
      'The change lands on four documents — `AEProduct` in Account Information, `ProductDetails` in Products & Leads, and their Ozone Connect counterparts `CbuaeProduct` in Bank Data Sharing and `ProductDetails` in Bank Products Data — which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'TPP specification — account product',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-product`,
      },
      {
        label: 'TPP specification — products catalogue',
        path: `${PRODUCTS_TPP}/open-api/products`,
      },
      {
        label: 'Ozone Connect specification — account product',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-products`,
      },
      {
        label: 'Ozone Connect specification — products catalogue',
        path: `${PRODUCTS_LFI}/open-api/products`,
      },
    ],
    audience: 'Both',
    areas: ['Data Sharing', 'Products & Leads', 'Islamic Finance', 'Ozone Connect'],
    specs: [
      // The same product object is defined in four documents — account-scoped
      // and catalogue, on each surface — so all four carry the new fields.
      'uae-account-information-openapi',
      'uae-product-openapi',
      'uae-ozone-connect-bank-data-sharing-openapi',
      'uae-ozone-connect-bank-products-data-openapi',
    ],
    endpoints: [
      {
        label: 'GET /accounts/{AccountId}/product (TPP)',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-product`,
      },
      {
        label: 'GET /products (TPP)',
        path: `${PRODUCTS_TPP}/open-api/products`,
      },
      {
        label: 'GET /accounts/{accountId}/products (Ozone Connect)',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-products`,
      },
      {
        label: 'GET /products (Ozone Connect)',
        path: `${PRODUCTS_LFI}/open-api/products`,
      },
    ],
    affectedPaths: [
      `${TPP}/banking/data-sharing/`,
      `${TPP}/banking/data-sharing/open-api/accounts-AccountId-product`,
      `${PRODUCTS_TPP}/`,
      `${PRODUCTS_TPP}/requirements`,
      `${PRODUCTS_TPP}/open-api/products`,
      `${LFI}/banking/data-sharing/`,
      `${LFI}/banking/data-sharing/open-api/accounts-AccountId-products`,
      `${PRODUCTS_LFI}/`,
      `${PRODUCTS_LFI}/requirements`,
      `${PRODUCTS_LFI}/open-api/products`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 8,
    category: 'Behaviour change',
    title: 'Interest and profit calculation methods are separate fields',
    summary:
      'Charge and reward calculation gains a `ProfitCalculationMethod` field. `InterestCalculationMethod` keeps its three values but narrows in meaning to interest alone, so an Islamic calculation basis moves to the new field.',
    description:
      '`AEProductFinancialCalculationMeasure` describes how a charge, reward, interest or profit figure is arrived at. In v2.1 it carries a single `InterestCalculationMethod`, documented as the method used to calculate "interest or profit … including Islamic calculation methods" — one field standing for two different things, so nothing in the data says which of them a given value expresses.\n\n' +
      'v2.2 separates them. `ProfitCalculationMethod` is added alongside, documented as the method used to calculate profit for Islamic calculation methods, and `InterestCalculationMethod`\'s description narrows to interest alone. Both fields carry the same three values — `PrincipalBalance`, `OutstandingBalance` and `InitialDrawdownAmount`.\n\n' +
      'No enum changes, no field is removed, and neither field is required, so **a v2.1 payload still validates against v2.2 unchanged.** What changes is meaning, not constraint: an LFI that populated `InterestCalculationMethod` to convey the basis of an Islamic profit calculation is, from v2.2, sending a valid value in the wrong field. It should move to `ProfitCalculationMethod`.\n\n' +
      'Because nothing rejects the old placement, this will not surface as a validation failure on either surface — which is the reason to record it. An LFI that reads the change as cosmetic and leaves the value where it is stays conformant while publishing product data that now says something it does not mean.\n\n' +
      'The consequence for a TPP is the mirror of that. A TPP reading only `InterestCalculationMethod` will, as LFIs move their Islamic products across, silently lose the calculation basis for exactly those products — no error, just an absent field where a value used to be. Reading both fields and preferring whichever is populated is the safe form for as long as the two placements coexist.\n\n' +
      'This is distinct from the calculation method on the new Sharia finance-rate types in change 7. That one — `AEProductShariaProfitCalculationMethod1Properties` — carries five values, adding `UnusedCreditLine` and `UtilizedLimit`, and it is a new schema reached only through the new `ShariaFinanceRates` field. The conventional profit-rate structures continue to reference the shared three-value `AEProductInterestCalculationMethod`, which is itself unchanged.\n\n' +
      'The same four documents that carry the Sharia product fields carry this split, which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'TPP specification — account product',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-product`,
      },
      {
        label: 'TPP specification — products catalogue',
        path: `${PRODUCTS_TPP}/open-api/products`,
      },
      {
        label: 'Ozone Connect specification — account product',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-products`,
      },
      {
        label: 'Ozone Connect specification — products catalogue',
        path: `${PRODUCTS_LFI}/open-api/products`,
      },
    ],
    audience: 'Both',
    areas: ['Data Sharing', 'Products & Leads', 'Islamic Finance', 'Ozone Connect'],
    specs: [
      'uae-account-information-openapi',
      'uae-product-openapi',
      'uae-ozone-connect-bank-data-sharing-openapi',
      'uae-ozone-connect-bank-products-data-openapi',
    ],
    endpoints: [
      {
        label: 'GET /accounts/{AccountId}/product (TPP)',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-product`,
      },
      {
        label: 'GET /products (TPP)',
        path: `${PRODUCTS_TPP}/open-api/products`,
      },
      {
        label: 'GET /accounts/{accountId}/products (Ozone Connect)',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-products`,
      },
      {
        label: 'GET /products (Ozone Connect)',
        path: `${PRODUCTS_LFI}/open-api/products`,
      },
    ],
    affectedPaths: [
      `${TPP}/banking/data-sharing/open-api/accounts-AccountId-product`,
      `${PRODUCTS_TPP}/open-api/products`,
      `${LFI}/banking/data-sharing/open-api/accounts-AccountId-products`,
      `${PRODUCTS_LFI}/open-api/products`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc1',
    number: 9,
    category: 'New capability',
    title: 'Balance components, transaction allocations and statement balances carry a Shari\'ah description',
    summary:
      '`AEAmountWithCategorization` gains `BalanceDescription`, so a categorised balance component, transaction allocation or statement balance can name the specific Shari\'ah-compliant charge, payment or reward it represents.',
    description:
      'v2.1 breaks a balance or a transaction down into categorised parts: each one carries a `BalanceCategory` drawn from a closed enum, and an amount. For a conventional product the category is enough to explain the part. For a Shari\'ah-compliant product it is not — several distinct charges, payments and rewards can fall under a single category, and the enum has no member for each of them, so the breakdown shows a figure the customer cannot attribute.\n\n' +
      'v2.2 adds `BalanceDescription` to `AEAmountWithCategorization` — free text, 1 to 500 characters, naming the specific Shari\'ah-compliant charge, payment or reward that the component represents. It supplements the category rather than replacing it: the enum still classifies the part, and the description says which part it is.\n\n' +
      'One field addition reaches three endpoints, because the schema is used in three places. On the TPP-facing side, `Components` on `AEBalance` is served by the balances endpoint, `Allocations` on `AETransaction` by the transactions endpoint, and `Components` on `AEBalanceWithCategorization` — the opening and closing balance of a statement — by the statements endpoint. Ozone Connect mirrors all three: `components` on `CbuaeBalance`, `allocations` on `CbuaeTransaction`, and `Components` on `AEBalanceWithCategorization` under `AEStatements`.\n\n' +
      'Statements are easy to miss here, because the field arrives on them through a schema neither the balances nor the transactions response references. An implementer scoping this change from the balance and transaction payloads alone will not see it.\n\n' +
      'The field is optional and additive on both surfaces, and is required on neither. An LFI that offers no Islamic products has nothing to do, and a v2.1 payload validates unchanged. It is recorded separately from the Sharia product fields in change 7 because it lands on the balances, transactions and statements endpoints rather than on product data, so it is a different piece of work for whoever implements it.\n\n' +
      'Both the Account Information and the Ozone Connect Bank Data Sharing documents carry the field in their v2.2 release, which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'TPP specification — balances',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-balances`,
      },
      {
        label: 'TPP specification — transactions',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'TPP specification — statements',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-statements`,
      },
      {
        label: 'Ozone Connect specification — balances',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-balances`,
      },
      {
        label: 'Ozone Connect specification — transactions',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'Ozone Connect specification — statements',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-statements`,
      },
    ],
    audience: 'Both',
    areas: ['Data Sharing', 'Balances', 'Transactions', 'Statements', 'Islamic Finance', 'Ozone Connect'],
    specs: [
      'uae-account-information-openapi',
      'uae-ozone-connect-bank-data-sharing-openapi',
    ],
    endpoints: [
      {
        label: 'GET /accounts/{AccountId}/balances (TPP)',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-balances`,
      },
      {
        label: 'GET /accounts/{AccountId}/transactions (TPP)',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'GET /accounts/{AccountId}/statements (TPP)',
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-statements`,
      },
      {
        label: 'GET /accounts/{accountId}/balances (Ozone Connect)',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-balances`,
      },
      {
        label: 'GET /accounts/{accountId}/transactions (Ozone Connect)',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'GET /accounts/{accountId}/statements (Ozone Connect)',
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-statements`,
      },
    ],
    affectedPaths: [
      `${TPP}/banking/data-sharing/open-api/accounts-AccountId-balances`,
      `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      `${TPP}/banking/data-sharing/open-api/accounts-AccountId-statements`,
      `${LFI}/banking/data-sharing/open-api/accounts-AccountId-balances`,
      `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      `${LFI}/banking/data-sharing/open-api/accounts-AccountId-statements`,
    ],
  },
]

/** `/openapi/v2.2-rc1/api-hub/foo-openapi.yaml` → `foo-openapi`. */
function specBasename(specPath: string): string {
  const file = specPath.split('/').pop() ?? ''
  return file.replace(/\.ya?ml$/i, '')
}

/**
 * The API Specs page that renders a given spec, at the version the change
 * lands in.
 *
 * `specs` entries are bare spec names (`uae-api-hub-consent-manager-openapi`),
 * which is what a reader recognises, but the route is derived from the endpoint
 * catalogue rather than stored — the catalogue already knows which surface and
 * section each spec belongs to, and it is version-aware, so a change landing in
 * v2.2-rc1 links to the v2.2-rc1 reference.
 *
 * Returns null for a spec with no catalogue entries at that version — today
 * that means any spec whose endpoints have not been authored yet, so the page
 * falls back to treating the name as a search keyword rather than emitting a
 * dead link.
 */
export function specUrl(specName: string, version: string): string | null {
  const matches = allEndpoints.filter(
    (e) => e.version === version && specBasename(e.redoc.spec) === specName,
  )
  const first = matches[0]
  if (!first) return null

  // A spec split across several sections has no single section page that covers
  // it; the surface listing is the narrowest page that does.
  const sections = new Set(matches.map((e) => e.sectionSlug))
  return sections.size === 1
    ? sectionUrl(first.surface, version as Version, first.sectionSlug)
    : surfaceUrl(first.surface, version as Version)
}

function normalise(path: string): string {
  let p = path.replace(/\.html$/, '')
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p
}

export function anchorFor(change: VersionChange): string {
  return `${change.changeId}-change-${change.number}`
}

export function changelogPageUrl(change: VersionChange): string {
  return `/tech/release-notes-and-erratas/changelog/${change.toVersion}/#${anchorFor(change)}`
}

/** Every change landing in a given documentation version, in order. */
export function changesFor(toVersion: string): VersionChange[] {
  return VERSION_CHANGES
    .filter((c) => c.toVersion === toVersion)
    .sort((a, b) => a.number - b.number)
}

/** Changes that document a given page — used to surface a banner on that page. */
export function changesForPath(path: string): VersionChange[] {
  const target = normalise(path)
  return VERSION_CHANGES.filter((c) => c.affectedPaths.some((p) => normalise(p) === target))
}

/** Documentation versions that have a changelog. Drives SSG path expansion. */
export const changelogVersions: string[] = [
  ...new Set(VERSION_CHANGES.map((c) => c.toVersion)),
].sort()

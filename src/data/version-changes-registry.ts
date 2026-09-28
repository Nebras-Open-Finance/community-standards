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
   * Documentation version this change lands in, e.g. "v2.2-rc2". This is the
   * route segment, so it is what the changelog page is keyed on.
   */
  toVersion: string
  /**
   * The release candidate of `toVersion` that first carried this change, e.g.
   * "v2.2-rc1". A version published as a series of candidates accumulates
   * changes across them, and an implementer who already built against an
   * earlier candidate needs to see which entries are new since.
   *
   * Established by diffing the api-specs release folders — for v2.2, the
   * `dist/standards/v2.2-rc1` and `dist/standards/v2.2-rc2` folders and the
   * `v2.2.1` / `v2.2.2` changelog sections of the api-hub and ozone-connect
   * documents. It is not a judgement made here.
   *
   * The changelog orders by candidate, newest first, so `number` follows the
   * same order: the lowest numbers are the newest candidate.
   */
  introducedIn: string
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

const TPP = '/tech/tpp-standards/v2.2-rc2'
const LFI = '/tech/lfi-api-hub/v2.2-rc2'
const DDC = `${TPP}/consent/data-deletion-confirmation`
const CONSENT_TPP = `${TPP}/consent`
const CM = `${LFI}/api-hub/consent-manager`

// Confirmation of Payee runs on both surfaces: the TPP calls `/discovery` and
// `/confirmation` on the API Hub, and the Hub calls `cop-query` on the LFI.
// A change to one does not imply a change to the other, so they are separate.
const COP = `${LFI}/banking/confirmation-of-payee`
const COP_TPP = `${TPP}/banking/confirmation-of-payee`

const SI_TPP = `${TPP}/banking/service-initiation`
const SI_LFI = `${LFI}/banking/service-initiation`
const DS_TPP = `${TPP}/banking/data-sharing`
const DS_LFI = `${LFI}/banking/data-sharing`
const INS_DS_TPP = `${TPP}/insurance/data-sharing`
const WEBHOOKS = `${TPP}/webhooks`

// Each LFI payment guide carries its own copy of the `PATCH /payment-log/{id}`
// request table and worked examples, so a change to the patch contract lands on
// every one of them rather than on a single shared page.
const LFI_PAYMENT_GUIDES = [
  `${SI_LFI}/domestic-payments/single-instant-payment/api-guide`,
  `${SI_LFI}/domestic-payments/multi-payments/delegated-sca/api-guide`,
  `${SI_LFI}/domestic-payments/multi-payments/fixed-defined-schedule/api-guide`,
  `${SI_LFI}/domestic-payments/multi-payments/fixed-on-demand/api-guide`,
  `${SI_LFI}/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide`,
  `${SI_LFI}/domestic-payments/multi-payments/variable-defined-schedule/api-guide`,
  `${SI_LFI}/domestic-payments/multi-payments/variable-on-demand/api-guide`,
  `${SI_LFI}/domestic-payments/multi-payments/variable-periodic-schedule/api-guide`,
]

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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 1,
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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 2,
    category: 'Behaviour change',
    title: 'Payment log — the rail the LFI settled on selects the patch contract',
    summary:
      '`paymentResponse.paymentRail` — `AANI`, `FTS`, or `LFI` for an on-us transfer — is required on every `PATCH /payment-log/{id}` and selects one of three per-rail request bodies. Each rail has its own status set, its own reject reason code namespace, and its own rule on `paymentTransactionId`. `GET /payment-log` reads the payment back in the same shape.',
    description:
      'The payment log records what the API Hub knows about a payment, but not how it was settled. `paymentResponse.paymentTransactionId` already depends on the rail to be interpreted — its v2.1 description singles out AANI-generated identifiers in prose — while nothing in the record states which rail produced it. The result is one request body covering three materially different settlement processes, with the differences left to prose.\n\n' +
      'v2.2 makes the rail explicit and then uses it. `paymentResponse.paymentRail` is a closed enum of `AANI` (the UAE instant payment platform), `FTS` (UAEFTS, the CBUAE funds transfer system), and `LFI` (settled internally, both accounts held at the same LFI, so the payment never reached an external rail). It is **required on every patch**, and it is the OpenAPI discriminator: `CbuaePatchPaymentRecordBody` becomes a `oneOf` over `CbuaePatchPaymentRecordBodyAani`, `CbuaePatchPaymentRecordBodyFts` and `CbuaePatchPaymentRecordBodyLfi`, selected on `paymentResponse.paymentRail`. Each member is `additionalProperties: false`, so a field that does not belong to the named rail is rejected rather than ignored.\n\n' +
      '**The statuses a payment may move to now depend on the rail, and two rails have a non-terminal success.**\n\n' +
      'On `AANI` the statuses are `AcceptedSettlementCompleted`, `AcceptedWithoutPosting` and `Rejected`. `AcceptedSettlementCompleted` is **not terminal**: it records the payment having been passed to AANI. Once AANI confirms it, the LFI MUST patch the record again, to `AcceptedWithoutPosting`.\n\n' +
      'On `FTS` the statuses are `AcceptedSettlementCompleted`, `AcceptedCreditSettlementCompleted` and `Rejected`. `AcceptedSettlementCompleted` is again **not terminal** — it records the hand-off to UAEFTS — and the LFI MUST patch again to `AcceptedCreditSettlementCompleted` once UAEFTS confirms.\n\n' +
      'On `LFI` the statuses are `AcceptedCreditSettlementCompleted` and `Rejected`, and both are terminal. Settlement is internal to the LFI, so there is no hand-off to an external rail to report as an intermediate step.\n\n' +
      'Two things are withdrawn from the operation on every rail. `Pending` is no longer a patchable status: a payment is `Pending` precisely because the LFI has not yet routed it, so there is no rail to name. And `paymentResponse.OpenFinanceBilling` is no longer patchable through this operation on any rail.\n\n' +
      '**Reject reason codes are namespaced to the rail.** In v2.1 a single pattern, `^(AANI|FTS|LFI)\\.[A-Za-z0-9]+$`, admits any namespace on any payment. In v2.2 each rail member references its own schema — `CbuaePaymentLogRejectReasonCodeAani`, `…Fts`, `…Lfi` — so an `FTS.*` code sent against a payment routed to AANI no longer validates. A payment rejected at the LFI before it reached AANI or UAEFTS is still reported against the rail it was routed to, and carries that rail\'s reason codes.\n\n' +
      '**`paymentTransactionId` follows the rail that issues it.** It is present on `AANI` and `FTS`, carrying the identifier that rail issued to the Originating LFI, and the LFI MUST populate it once the rail has issued it — that is, alongside either of that rail\'s success statuses. It is absent from the `LFI` member entirely, since nothing outside the LFI issues an identifier for a payment booked on its own ledger. It is omitted where the payment was rejected before the rail issued one. It is not the same value as `transactionId` in the Bank Data Sharing API.\n\n' +
      '**`GET /payment-log` reads the payment back in the shape it was patched in.** The previously inline `paymentResponse` object becomes `CbuaePaymentLogPaymentResponse`, a `oneOf` with one member per rail plus `CbuaePaymentLogPaymentResponseUnrouted` — a payment the LFI has not routed, which carries no `paymentRail` and is `Pending` or `Rejected`. The unrouted member is the only one that still accepts a reject code from any of the three namespaces, since a payment rejected before routing has no rail to scope it to. `paymentTransactionId` is also now returned on the `AANI` and `FTS` members, having been absent from this operation\'s response since v2.1 even though the patch operation set it.\n\n' +
      'The rail records how the payment was **executed**, not how it was requested: where an LFI\'s routing rules settle an instant payment on another rail, the field reports the rail actually used. A payment settles over exactly one rail — this holds for file payments as well as single payments, so one value describes the whole record.\n\n' +
      'This is a breaking change and it requires action from every LFI. An LFI built against v2.1 that patches a payment without naming a rail is rejected under v2.2, as is one that patches `Pending`, sends `OpenFinanceBilling`, or sends a reject code from the wrong namespace. LFIs settling over AANI or UAEFTS must also emit the second patch that carries the payment to its terminal status, which v2.1 did not require. The API Hub enforcement date is set separately from the version cutover.\n\n' +
      'The change is published in the v2.2.2 release of the Consent Manager OpenAPI document in the api-specs repository, which is what the endpoint pages below render.',
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
      `${SI_LFI}/domestic-payments/overview/payment-status`,
      ...LFI_PAYMENT_GUIDES,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 3,
    category: 'New capability',
    title: 'Payment rail is reported to the TPP on the payment record and the payment status event',
    summary:
      'The payment and file payment records return `Data.PaymentRail`, and the payment status event carries the same field, so a TPP learns which rail settled a payment instead of inferring it from a reject reason code.',
    description:
      'The rail an LFI settles on is what makes the rest of a payment record readable. It determines whether `PaymentTransactionId` is present and what issued it, which `RejectReasonCode` namespace applies, and — on AANI and UAEFTS — whether a success status is terminal or an intermediate hand-off. In v2.1 none of that is stated to the TPP: the rail can only be inferred from the prefix of a reject reason code, which exists only when the payment failed.\n\n' +
      'v2.2 adds `AEPaymentRail` to the Bank Service Initiation API description and returns it as `Data.PaymentRail` on the payment record (`POST /payments`, `GET /payments/{PaymentId}`) and the file payment record (`POST /file-payments`, `GET /file-payments/{PaymentId}`). The Webhook Template API description gains the matching `UAEPaymentAPI.AEPaymentRail`, carried as `Data.PaymentRail` on the payment status event, so a TPP consuming events sees the same value it would read from the resource.\n\n' +
      'The values are `AANI` (the UAE instant payment platform), `FTS` (UAEFTS, the CBUAE funds transfer system), and `LFI` (settled internally by the LFI — the debtor and creditor accounts are both held there, so the payment was booked on the LFI\'s own ledger and did not reach an external rail).\n\n' +
      '**The field is absent until the LFI has routed the payment.** A payment still `Pending` at the LFI may carry no rail, as may one rejected before a rail was selected. A TPP MUST treat the field as optional, and MUST NOT make the rendering of a payment conditional on its presence.\n\n' +
      'The value records how the payment was **executed**, not how it was requested: where an LFI\'s routing rules settle an instant payment on another rail, the field reports the rail actually used. A payment settles over exactly one rail, and a file payment is settled in its entirety over one rail, so a single value describes the whole record.\n\n' +
      'Where the field is present it constrains the record around it. Every `RejectReasonCode` entry is namespaced to the rail named — `AANI.*` with `AANI`, `FTS.*` with `FTS`, `LFI.*` with `LFI` — and a payment rejected at the LFI before it reached AANI or UAEFTS is still reported against the rail it was routed to. Where the rail issues an end to end transaction identifier, `PaymentTransactionId` carries it; a payment booked on the LFI\'s own ledger has no such identifier.\n\n' +
      'This is additive on the TPP-facing surface and requires no action from a TPP that ignores it. It is the TPP-facing half of the payment log change recorded in §2 — the API Hub returns here what the LFI patched there — so it asks nothing of an LFI beyond that patch.\n\n' +
      'The field is published in the v2.2-rc2 release of the Bank Service Initiation and Webhook Template OpenAPI documents in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'Payment record',
        path: `${SI_TPP}/open-api/payments-PaymentId`,
      },
      {
        label: 'Payment status event',
        path: `${WEBHOOKS}/payment-status/api-guide`,
      },
    ],
    audience: 'TPP',
    areas: ['Service Initiation', 'Payments', 'Webhooks'],
    specs: ['uae-bank-initiation-openapi', 'uae-webhook-template-openapi'],
    endpoints: [
      {
        label: 'POST /payments',
        path: `${SI_TPP}/open-api/payments`,
      },
      {
        label: 'GET /payments/{PaymentId}',
        path: `${SI_TPP}/open-api/payments-PaymentId`,
      },
      {
        label: 'Payment status event',
        path: `${WEBHOOKS}/payment-status/open-api`,
      },
    ],
    affectedPaths: [
      `${SI_TPP}/`,
      `${SI_TPP}/open-api/payments`,
      `${SI_TPP}/open-api/payments-PaymentId`,
      `${SI_TPP}/domestic-payments/overview/payment-status`,
      `${WEBHOOKS}/payment-status/api-guide`,
      `${WEBHOOKS}/payment-status/open-api`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 7,
    category: 'Behaviour change',
    title: 'Confirmation of Payee — discovery returns every confirmation source for an IBAN, not one',
    summary:
      '`POST /discovery` returns `Data.ConfirmationSource` as an array. An LFI exposes a separate API Hub resource server per account segment, and an IBAN identifies the bank but not the segment, so more than one source may service a single account.',
    description:
      'Before a Confirmation of Payee query, a TPP calls `POST /discovery` with the creditor account IBAN to resolve where the query should be sent. In v2.1 `Data` is a single `AEConfirmationSourceProperties` object, which assumes the IBAN resolves to exactly one endpoint.\n\n' +
      'It does not. An LFI exposes a separate API Hub resource server per account segment — retail, corporate and SME are distinct `rs1.*` hosts — and an IBAN identifies the bank but not the segment the account sits in. A single object forces the Hub to guess which segment a payee belongs to before the query has been made.\n\n' +
      'In v2.2 `Data` becomes an object carrying a required `ConfirmationSource` array, each entry an `AEConfirmationSourceProperties` — the same schema as before, now repeated. Each entry identifies one endpoint pair at which the Confirmation of Payee operation can be invoked.\n\n' +
      '**The TPP invokes the CoP operation against each entry in the order returned, until a match is obtained.** The order is meaningful: it is the order the Hub considers most likely to resolve, and a TPP that reorders or parallelises loses that. A TPP stops at the first entry that returns a match.\n\n' +
      '`minItems` is `0`, and an empty array is the defined answer for an account not serviced by any participating LFI. It is not an error, and a TPP MUST handle it as a normal outcome rather than treating an empty response as a failed lookup.\n\n' +
      'This is a breaking change to the shape of the discovery response and requires action from every TPP that calls it. A client written against v2.1 reads `Data` as the source object itself; under v2.2 it must read `Data.ConfirmationSource` and iterate. Nothing about `POST /confirmation` changes — the query, its headers and its response are unaffected — so the work is confined to the discovery client and the loop around it.\n\n' +
      'There is no LFI-side counterpart. Discovery is answered by the API Hub from the participant directory, and the LFI is not called during it.\n\n' +
      'v2.2-rc2 is the first v2.2 release of the Confirmation of Payee OpenAPI document; rc1 did not republish it. The change is published there, which is what the endpoint page below renders.',
    docsPaths: [
      { label: 'Full specification', path: `${COP_TPP}/api-guide` },
      { label: 'OpenAPI reference', path: `${COP_TPP}/open-api/discovery` },
    ],
    audience: 'TPP',
    areas: ['Confirmation of Payee', 'Payments'],
    specs: ['uae-confirmation-of-payee-openapi'],
    endpoints: [
      {
        label: 'POST /discovery',
        path: `${COP_TPP}/open-api/discovery`,
      },
    ],
    affectedPaths: [
      `${COP_TPP}/`,
      `${COP_TPP}/api-guide`,
      `${COP_TPP}/requirements`,
      `${COP_TPP}/open-api/discovery`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 8,
    category: 'Behaviour change',
    title: 'Party and customer identity data is constrained by pattern',
    summary:
      'Emirates ID, personal name and business name fields on the party and customer claims gain regular expressions on both the TPP-facing and the Ozone Connect surface. Field lengths are unchanged.',
    description:
      'The identity claims returned with a party carry the data a TPP is most likely to act on, and in v2.1 almost none of it is constrained. `EmiratesId` is a bare string, so a well-formed Emirates ID and a free-text note are equally conformant. The name fields are bounded only by length, so an LFI may return a value carrying digits, control characters or punctuation a TPP then has to defend against when it renders or matches on it.\n\n' +
      'v2.2 applies patterns to both surfaces. On the TPP-facing Account Information API description they land on `Claims` and `CorporateClaims`, the two members of the `VerifiedClaim` identity-assurance envelope returned by `GET /parties` and `GET /accounts/{AccountId}/parties`. On Ozone Connect they land on `CustomerPersonClaims` and `CustomerCorporateClaims`, returned by `GET /customer` and `GET /accounts/{accountId}/customer`.\n\n' +
      '**Emirates ID** takes `^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$` on `EmiratesId` (TPP-facing) and `emiratesId` (Ozone Connect). The pattern requires the `784` issuer prefix and the 4-7-1 digit grouping, and accepts the number with or without its hyphens — `784-1234-1234567-1` and `784123412345671` both validate, and a partially hyphenated value does too. This is the pattern the Insurance API description already uses, and the one `POST /leads` adopts in the same release.\n\n' +
      '**Personal names** take `^[A-Za-z \'.-]+$` — Latin letters, space, apostrophe, period and hyphen. This covers `FullName`, `GivenName`, `Surname`, `MiddleName` and `Nickname` TPP-facing, and `fullName`, `givenName`, `familyName`, `middleName` and `nickname` on Ozone Connect. Digits and other punctuation are excluded.\n\n' +
      '**Business names** take `^[A-Za-z0-9 &\'.,()\\/-]+$` on `BusinessName` / `businessName` — the personal-name set plus digits, ampersand, comma, parentheses and forward slash, which are the characters that appear in registered trade names.\n\n' +
      'The patterns admit Latin script only. An LFI that holds a name in Arabic script cannot return it in these fields, and MUST return the Latin transliteration it holds.\n\n' +
      'Field lengths are unchanged on every field, and no field becomes required or optional as a result. The change is scoped to the party and customer claims: the same names appearing elsewhere in either specification are untouched.\n\n' +
      'This requires action from any LFI whose stored data does not already conform — most often an Emirates ID held without the `784` prefix, or a name field carrying a title, a suffix, a digit or a corporate designator. Those responses are rejected under v2.2. TPPs need take no action, and may stop defending against the characters the patterns now exclude once their LFIs are on v2.2.\n\n' +
      'The change is recorded against OFP-009 and is published in the v2.2-rc2 release of the Account Information API description and the v2.2.3 release of the Ozone Connect Bank Data Sharing API description in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'TPP specification',
        path: `${DS_TPP}/open-api/parties`,
      },
      {
        label: 'Ozone Connect specification',
        path: `${DS_LFI}/open-api/customer`,
      },
    ],
    audience: 'Both',
    areas: ['Data Sharing', 'Ozone Connect', 'Data Quality'],
    specs: [
      'uae-account-information-openapi',
      'uae-ozone-connect-bank-data-sharing-openapi',
    ],
    endpoints: [
      {
        label: 'GET /parties (TPP)',
        path: `${DS_TPP}/open-api/parties`,
      },
      {
        label: 'GET /accounts/{AccountId}/parties (TPP)',
        path: `${DS_TPP}/open-api/accounts-AccountId-parties`,
      },
      {
        label: 'GET /customer (Ozone Connect)',
        path: `${DS_LFI}/open-api/customer`,
      },
      {
        label: 'GET /accounts/{accountId}/customer (Ozone Connect)',
        path: `${DS_LFI}/open-api/accounts-AccountId-customer`,
      },
    ],
    affectedPaths: [
      `${DS_TPP}/`,
      `${DS_TPP}/open-api/parties`,
      `${DS_TPP}/open-api/accounts-AccountId-parties`,
      `${DS_LFI}/`,
      `${DS_LFI}/requirements`,
      `${DS_LFI}/open-api/customer`,
      `${DS_LFI}/open-api/accounts-AccountId-customer`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 9,
    category: 'Behaviour change',
    title: 'Lead submission is constrained by pattern',
    summary:
      '`POST /leads` constrains the personal data it accepts: Emirates ID, the lead\'s name, the business name, and each address line now carry regular expressions on both the TPP-facing and the Ozone Connect surface. Field lengths are unchanged.',
    description:
      '`POST /leads` is the one Open Finance operation through which a TPP submits a customer\'s personal data to an LFI rather than reading it. In v2.1 the fields carrying that data are bounded by length alone, so the LFI receives values it must sanitise before passing them into onboarding, and a TPP has no contract telling it what will be accepted.\n\n' +
      'v2.2 applies the same character sets used elsewhere in the standard, on both the request and the response, on both surfaces.\n\n' +
      '**Emirates ID.** `Data.EmiratesId` takes `^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$` on both the request and the response. The pattern requires the `784` issuer prefix and the 4-7-1 digit grouping, and accepts the number with or without its hyphens. It is the pattern the Insurance API descriptions already use, and the one the party and customer claims adopt in the same release — see §8.\n\n' +
      '**Names.** `AEUserName` is a `oneOf` over three shapes, and all of them are constrained. `GivenName` and `LastName` on `AEPersonalAccountName`, and `FullName` on `AEPersonalAccountFullName`, take `^[A-Za-z \'.-]+$` — Latin letters, space, apostrophe, period and hyphen. `BusinessName` on `AEBusinessAccountName` takes `^[A-Za-z0-9 &\'.,()\\/-]+$`, which adds digits, ampersand, comma, parentheses and forward slash for registered trade names.\n\n' +
      '**Address lines.** Each item of `AddressLine` on `AEResidentialAddress` takes `^[A-Za-z0-9 \\/?:().,\'+-]+$`, the ISO 20022 `PostalAddress27` `x` character set. That set is already applied to the reference fields in the Bank Service Initiation API description, so an address that survives a payment instruction survives a lead. The array still holds 1 to 7 items of 1 to 70 characters, and the other address components are unchanged.\n\n' +
      'The patterns admit Latin script only, so a name or address held in Arabic script must be submitted as the Latin transliteration.\n\n' +
      'Field lengths and item counts are unchanged throughout, and no field becomes required or optional as a result.\n\n' +
      'This requires action from every TPP that submits leads. A lead carrying a value outside these sets is rejected with `400` under v2.2, where v2.1 accepted it — an Emirates ID submitted without the `784` prefix, a name carrying a title or a digit, or an address line carrying a character outside the ISO 20022 set. A TPP SHOULD validate against these patterns in its own UI rather than surfacing the Hub\'s rejection to the customer. LFIs receive data already conforming to the patterns and need take no action beyond accepting the tightened contract.\n\n' +
      'The change is recorded against OFP-009 and is published in the v2.2-rc2 release of the Product API description and the v2.2.2 release of the Ozone Connect Bank Products Data API description in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'TPP specification',
        path: `${PRODUCTS_TPP}/open-api/leads`,
      },
      {
        label: 'Ozone Connect specification',
        path: `${PRODUCTS_LFI}/open-api/leads`,
      },
    ],
    audience: 'Both',
    areas: ['Products & Leads', 'Ozone Connect', 'Data Quality'],
    specs: [
      'uae-product-openapi',
      'uae-ozone-connect-bank-products-data-openapi',
    ],
    endpoints: [
      {
        label: 'POST /leads (TPP)',
        path: `${PRODUCTS_TPP}/open-api/leads`,
      },
      {
        label: 'POST /leads (Ozone Connect)',
        path: `${PRODUCTS_LFI}/open-api/leads`,
      },
    ],
    affectedPaths: [
      `${PRODUCTS_TPP}/`,
      `${PRODUCTS_TPP}/api-guide`,
      `${PRODUCTS_TPP}/requirements`,
      `${PRODUCTS_TPP}/open-api/leads`,
      `${PRODUCTS_LFI}/`,
      `${PRODUCTS_LFI}/open-api/leads`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 10,
    category: 'Behaviour change',
    title: 'Date-time semantics are stated once, in a shared `AEDateTime` component',
    summary:
      'Every date-time field in the standards references one `AEDateTime` schema, which states that the value identifies an instant, that the offset is part of it, and that recipients MUST apply it. A `pattern` makes the offset mandatory and forbids `-00:00`.',
    description:
      'A date-time field appears in almost every payload in the standard — `ExpirationDateTime`, `CreationDateTime`, `TransactionDateTime`, `BookingDateTime`, `ValueDateTime` and many more. In v2.1 each one is defined as `type: string`, `format: date-time`, with its own copy of a description that sets out the encoding and stops there. Nowhere does v2.1 say that the value identifies an instant in time, or that two encodings of the same instant are equivalent and MUST behave identically.\n\n' +
      'The consequence is a defect the specification does not forbid. An implementation that reads the date and time components and ignores the offset has not contradicted v2.1 — it has read it literally. The UAE is UTC+04:00, so that reading resolves a UTC value to an instant four hours earlier than intended, in the expiring direction. On a consent with a thirty-day expiry nobody notices. On one set an hour ahead the consent is already expired when it arrives, and no error is raised at any hop: the value is well formed, schema validation passes, and the API Hub stores and returns it unchanged.\n\n' +
      'v2.2 introduces a single `AEDateTime` Schema Object and has every date-time field reference it. The duplicated encoding boilerplate is removed. A field whose description said nothing beyond that boilerplate becomes a plain `$ref`; a field carrying its own meaning keeps it as `allOf: [$ref AEDateTime, { description }]`, so no field loses its own text.\n\n' +
      '**What the component establishes.** A date-time is an instant, and the offset is part of the value rather than decoration: recipients MUST apply it, and MUST NOT read the date and time components as local time. Equivalent encodings MUST behave identically — `2027-07-22T00:00:00Z` and `2027-07-22T04:00:00+04:00` are the same value. Issuers SHOULD emit UTC, using `Z` or `+00:00`. The negative zero offset `-00:00` MUST NOT be used: ISO 8601 prohibits it, and RFC 3339 assigns it “UTC, local offset unknown” semantics, which is not what a producer means. Fractional seconds are optional and carry no specified precision, so implementations MUST accept both their presence and their absence.\n\n' +
      '**The offset becomes machine-checkable.** `AEDateTime` carries a `pattern` as well as `format: date-time`. `format` is an annotation that many validators do not enforce, so in v2.1 a value with no offset could pass validation on a field the prose said must carry one. The pattern requires an offset — `Z`, a positive offset, or a negative offset between `-01:00` and `-12:59` — and by construction rejects `-00:00`. This is the one part of the change that can fail a request that v2.1 let through, and it is deliberate: an offset-less date-time was never valid against the standard.\n\n' +
      '**No wire-format change.** The set of values a conformant v2.1 implementation could legitimately send is unchanged, and every date-time example in every v2.2 document satisfies the pattern. An implementation already emitting an offset has nothing to do. An implementation emitting values without one — or defaulting a missing offset to local time on the way in — has a defect that v2.2 now makes demonstrable in a single call.\n\n' +
      'The component lands in fifteen of the API descriptions that have a published reference, and in the Account Opening and FX Service Initiation descriptions besides. Confirmation of Payee is the only document untouched: it defines no date-time field.\n\n' +
      'The change is published in the v2.2 release of each API description in the api-specs repository, which is what the API references render.',
    audience: 'Both',
    areas: ['Conventions', 'Consent', 'Data Sharing', 'Service Initiation', 'Insurance', 'Webhooks', 'Ozone Connect'],
    specs: [
      'uae-account-information-openapi',
      'uae-atm-openapi',
      'uae-authorization-endpoints-openapi',
      'uae-bank-initiation-openapi',
      'uae-insurance-openapi',
      'uae-product-openapi',
      'uae-webhook-template-openapi',
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-bank-data-sharing-openapi',
      'uae-ozone-connect-bank-open-data-openapi',
      'uae-ozone-connect-bank-products-data-openapi',
      'uae-ozone-connect-bank-service-initiation-openapi',
      'uae-ozone-connect-caap-operations-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
      'uae-ozone-connect-insurance-openapi',
    ],
    affectedPaths: [
      `${CONSENT_TPP}/`,
      `${CONSENT_TPP}/open-api/par`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 11,
    category: 'New capability',
    title: 'Payment consents carry `OnBehalfOf`',
    summary:
      '`OnBehalfOf` — `TradingName`, `LegalName`, `IdentifierType`, `Identifier` — is added to the Bank Service Initiation consent, on the rich authorization request and on the consent status response. In v2.1 the object appears on data sharing consents only.',
    description:
      '`OnBehalfOf` declares the entity a TPP is acting for. In v2.1 it is defined on the Bank Data Sharing and Insurance Data Sharing consents and nowhere else, so a payment consent has no field in which to name the party behind the request.\n\n' +
      'v2.2 adds it to the Bank Service Initiation consent. The object is the same shape it has on the data sharing consents — `TradingName`, `LegalName`, `IdentifierType`, and `Identifier`, with `additionalProperties: false` so an unrecognised member is rejected rather than ignored. `IdentifierType` is drawn from `AEOnBehalfOfIdentifierType`, which at v2.2 has the single member `Other`.\n\n' +
      'The field is optional and additive. A v2.1 payment consent validates unchanged, and a TPP that has no party to declare omits it.\n\n' +
      '**Where it lands.** On the TPP-facing side, in the `consent` object of the payment `authorization_details` submitted at `POST /par`, and in the `Data` object of the payment consent status response. The API Hub mirrors both: `AEPaymentConsentResponse` and the service initiation authorization detail in the Consent Manager description, and the `service-initiation` branch of the consented event a webhook subscriber receives. Ozone Connect carries the same two additions in its CaaP Operations and Consent Events & Actions descriptions, so an LFI reading the consent it is being asked to authorize sees the declared party.\n\n' +
      '`AEOnBehalfOf` is newly defined in the Bank Initiation API description, which had no use for it at v2.1. In the documents that already defined it — Authorization Endpoints, Consent Manager, Webhook Template, and the two Ozone Connect consent documents — the schema is unchanged and only the references to it are new.\n\n' +
      'What the object does **not** do is decide what the PSU is shown. The recipient of a payment is displayed from the creditor fields, and a sub-merchant from `Risk.CreditorIndicators.MerchantDetails.MerchantName` in the encrypted PII payload. `OnBehalfOf` is a declaration of the party the TPP acts for, recorded on the consent; it does not replace either.\n\n' +
      'The change is published in the v2.2 release of the Bank Initiation, Authorization Endpoints and Webhook Template API descriptions, the v2.2 release of the Consent Manager description, and the v2.2 release of the Ozone Connect CaaP Operations and Consent Events & Actions descriptions in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [
      { label: 'TPP specification — PAR', path: `${CONSENT_TPP}/open-api/par` },
      {
        label: 'TPP specification — payment consent status',
        path: `${CONSENT_TPP}/open-api/payment-consents-ConsentId`,
      },
      { label: 'API Hub specification — Consent Manager', path: `${CM}/open-api/consents-consentId` },
    ],
    audience: 'Both',
    areas: ['Consent', 'Service Initiation', 'Payments', 'Consent Manager', 'Webhooks', 'Ozone Connect'],
    specs: [
      'uae-bank-initiation-openapi',
      'uae-authorization-endpoints-openapi',
      'uae-webhook-template-openapi',
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-caap-operations-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
    ],
    endpoints: [
      { label: 'POST /par', path: `${CONSENT_TPP}/open-api/par` },
      {
        label: 'GET /bank-service-initiation-consents/{ConsentId}',
        path: `${CONSENT_TPP}/open-api/payment-consents-ConsentId`,
      },
      { label: 'GET /consents/{consentId}', path: `${CM}/open-api/consents-consentId` },
    ],
    affectedPaths: [
      `${CONSENT_TPP}/`,
      `${CONSENT_TPP}/open-api/par`,
      `${CONSENT_TPP}/open-api/payment-consents-ConsentId`,
      `${CM}/`,
      `${CM}/open-api/consents-consentId`,
      `${WEBHOOKS}/consent-status/open-api`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 12,
    category: 'Behaviour change',
    title: 'Transactions and statements are returned newest first',
    summary:
      'Transactions MUST be returned in descending `BookingDateTime` order and statements in descending `OpeningDate` order, with a stable tiebreak on the record identifier. Ordering is applied to the filtered result set before pagination, and no sort control is offered to the TPP.',
    description:
      'v2.1 specifies which transactions and statements a request returns, and says nothing about the order they come back in. Two LFIs can both be conformant and return the same result set in opposite orders — and an LFI paging a result set it has not ordered can return the same record twice, or omit one, because a record\'s page depends on an order the database chose for that query.\n\n' +
      'The cost falls on the TPP. A list the customer expects to read newest-first has to be re-sorted client-side, which for a paged endpoint means fetching every page before the first one can be displayed. That is the opposite of what pagination is for.\n\n' +
      'v2.2 specifies the order. **Transactions** MUST be returned in descending `BookingDateTime` order, newest first. Where two transactions share the same `BookingDateTime`, `TransactionId` SHOULD be used as a descending tiebreaker, so the order is stable rather than merely correct. **Statements** MUST be returned in descending `OpeningDate` order, newest first, with `StatementId` as the descending tiebreaker on ties.\n\n' +
      '**Ordering is applied before pagination.** The order is applied to the filtered result set, then the page is taken from it. Page 1 therefore always holds the most recent records matching the request, and a record does not move between pages while a result set is being paged through. On Ozone Connect this is stated against `page` and `page-size` explicitly, because that is where the page is cut.\n\n' +
      'The date-range parameters filter, they do not sort. `fromBookingDateTime` and `toBookingDateTime` on transactions, and `fromStatementDate` and `toStatementDate` on statements, narrow the result set; they have no effect on the order of what remains.\n\n' +
      '**No sort control is offered.** A TPP cannot request ascending order. One specified order that every LFI implements is worth more to a TPP than a parameter each LFI may or may not honour, and it keeps the requirement testable: a single call demonstrates conformance.\n\n' +
      'The requirement applies to both surfaces because the API Hub returns the order the LFI supplied. Specifying it TPP-side alone would oblige the Hub to buffer and re-sort a result set it is paging through, which is the work the change exists to remove.\n\n' +
      'The change is published in the v2.2 release of the Account Information API description and the v2.2 release of the Ozone Connect Bank Data Sharing API description in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [
      {
        label: 'TPP guide — Bank Data Sharing pagination',
        path: `${DS_TPP}/api-guide/pagination`,
      },
      {
        label: 'LFI guide — Bank Data Sharing pagination',
        path: `${DS_LFI}/api-guide/pagination`,
      },
      {
        label: 'TPP specification — transactions',
        path: `${DS_TPP}/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'TPP specification — statements',
        path: `${DS_TPP}/open-api/accounts-AccountId-statements`,
      },
      {
        label: 'Ozone Connect specification — transactions',
        path: `${DS_LFI}/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'Ozone Connect specification — statements',
        path: `${DS_LFI}/open-api/accounts-AccountId-statements`,
      },
    ],
    audience: 'Both',
    areas: ['Data Sharing', 'Transactions', 'Statements', 'Pagination', 'Ozone Connect'],
    specs: [
      'uae-account-information-openapi',
      'uae-ozone-connect-bank-data-sharing-openapi',
    ],
    endpoints: [
      {
        label: 'GET /accounts/{AccountId}/transactions (TPP)',
        path: `${DS_TPP}/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'GET /accounts/{AccountId}/statements (TPP)',
        path: `${DS_TPP}/open-api/accounts-AccountId-statements`,
      },
      {
        label: 'GET /accounts/{accountId}/transactions (Ozone Connect)',
        path: `${DS_LFI}/open-api/accounts-AccountId-transactions`,
      },
      {
        label: 'GET /accounts/{accountId}/statements (Ozone Connect)',
        path: `${DS_LFI}/open-api/accounts-AccountId-statements`,
      },
    ],
    affectedPaths: [
      `${DS_TPP}/`,
      `${DS_TPP}/api-guide/pagination`,
      `${DS_TPP}/open-api/accounts-AccountId-transactions`,
      `${DS_TPP}/open-api/accounts-AccountId-statements`,
      `${DS_LFI}/`,
      `${DS_LFI}/requirements`,
      `${DS_LFI}/api-guide/pagination`,
      `${DS_LFI}/open-api/accounts-AccountId-transactions`,
      `${DS_LFI}/open-api/accounts-AccountId-statements`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc2',
    number: 13,
    category: 'New capability',
    title: 'Data sharing consents carry `AuthorizationExpirationDateTime`',
    summary:
      '`AuthorizationExpirationDateTime` — the deadline by which a consent in `AwaitingAuthorization` must be authorized — is added to the Bank Data Sharing and Insurance Data Sharing consents. In v2.1 it exists on payment consents only.',
    description:
      '`AuthorizationExpirationDateTime` is the point in time by which a consent still in `AwaitingAuthorization` must be authorized. It is distinct from `ExpirationDateTime`, which bounds how long the authorized consent may be used: the first is a deadline for completing the authorization journey, the second is the life of the permission that journey grants.\n\n' +
      'In v2.1 the field exists on Bank Service Initiation consents alone, where it was introduced for payments requiring more than one authorizer. A data sharing consent has no equivalent, so a TPP cannot state how long its authorization request should remain open, and the deadline is left to whatever the platform applies.\n\n' +
      'v2.2 adds the field to the Bank Data Sharing and Insurance Data Sharing consents, with the same meaning and the same shape it has on payments — an `AEDateTime`, described as the date and time by which a consent in `AwaitingAuthorization` status must be authorized by the User. It is optional and additive on both: a v2.1 consent request validates unchanged, and a TPP that omits it is in the position it was in at v2.1.\n\n' +
      '**Where it lands.** On the TPP-facing side, in the `consent` object of the bank data sharing and insurance data sharing `authorization_details` submitted at `POST /par`, and in the corresponding consent status responses. The API Hub mirrors it on the account access and insurance authorization details in the Consent Manager description, and on the consented event a webhook subscriber receives. Ozone Connect carries the same additions in its CaaP Operations and Consent Events & Actions descriptions.\n\n' +
      'Capping the authorization window is the TPP\'s own decision, and the requirement is recorded as such on the Bank Data Sharing and Insurance Data Sharing requirements pages below. `IsSingleAuthorization`, which qualifies the field on a payment consent, has no counterpart on a data sharing consent, so the multi-authorizer reading of the deadline does not carry over.\n\n' +
      'The change is published in the v2.2 release of the Account Information, Insurance, Authorization Endpoints and Webhook Template API descriptions, the v2.2 release of the Consent Manager description, and the v2.2 release of the Ozone Connect CaaP Operations and Consent Events & Actions descriptions in the api-specs repository, which is what the endpoint pages below render.',
    docsPaths: [
      { label: 'TPP requirements — Bank Data Sharing', path: `${DS_TPP}/requirements` },
      { label: 'TPP requirements — Insurance Data Sharing', path: `${INS_DS_TPP}/requirements` },
      { label: 'TPP specification — PAR', path: `${CONSENT_TPP}/open-api/par` },
      {
        label: 'TPP specification — bank data sharing consent status',
        path: `${CONSENT_TPP}/open-api/account-access-consents-ConsentId`,
      },
      {
        label: 'TPP specification — insurance consent status',
        path: `${CONSENT_TPP}/open-api/insurance-consents-ConsentId`,
      },
      { label: 'API Hub specification — Consent Manager', path: `${CM}/open-api/consents-consentId` },
    ],
    audience: 'Both',
    areas: ['Consent', 'Data Sharing', 'Insurance', 'Consent Manager', 'Webhooks', 'Ozone Connect'],
    specs: [
      'uae-account-information-openapi',
      'uae-insurance-openapi',
      'uae-authorization-endpoints-openapi',
      'uae-webhook-template-openapi',
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-caap-operations-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
    ],
    endpoints: [
      { label: 'POST /par', path: `${CONSENT_TPP}/open-api/par` },
      {
        label: 'GET /bank-data-sharing-consents/{ConsentId}',
        path: `${CONSENT_TPP}/open-api/account-access-consents-ConsentId`,
      },
      {
        label: 'GET /insurance-consents/{ConsentId}',
        path: `${CONSENT_TPP}/open-api/insurance-consents-ConsentId`,
      },
      { label: 'GET /consents/{consentId}', path: `${CM}/open-api/consents-consentId` },
    ],
    affectedPaths: [
      `${CONSENT_TPP}/`,
      `${CONSENT_TPP}/open-api/par`,
      `${CONSENT_TPP}/open-api/account-access-consents-ConsentId`,
      `${CONSENT_TPP}/open-api/insurance-consents-ConsentId`,
      `${DS_TPP}/requirements`,
      `${INS_DS_TPP}/requirements`,
      `${CM}/`,
      `${CM}/open-api/consents-consentId`,
      `${WEBHOOKS}/consent-status/open-api`,
    ],
  },
  {
    changeId: 'v2.1-to-v2.2',
    fromVersion: 'v2.1',
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc1',
    number: 14,
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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc1',
    number: 15,
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
      'Every field added here is optional. An LFI that offers no Islamic products sends nothing new and stays conformant; an LFI that has been approximating profit rates in the interest-based fields can move them across. Nothing is removed, no enum is narrowed, and a v2.1 product payload still validates unchanged — §16 covers the one place where the *meaning* of an existing field narrows.\n\n' +
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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc1',
    number: 16,
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
      'This is distinct from the calculation method on the new Sharia finance-rate types in §15. That one — `AEProductShariaProfitCalculationMethod1Properties` — carries five values, adding `UnusedCreditLine` and `UtilizedLimit`, and it is a new schema reached only through the new `ShariaFinanceRates` field. The conventional profit-rate structures continue to reference the shared three-value `AEProductInterestCalculationMethod`, which is itself unchanged.\n\n' +
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
    toVersion: 'v2.2-rc2',
    introducedIn: 'v2.2-rc1',
    number: 17,
    category: 'New capability',
    title: 'Balance components, transaction allocations and statement balances carry a Shari\'ah description',
    summary:
      '`AEAmountWithCategorization` gains `BalanceDescription`, so a categorised balance component, transaction allocation or statement balance can name the specific Shari\'ah-compliant charge, payment or reward it represents.',
    description:
      'v2.1 breaks a balance or a transaction down into categorised parts: each one carries a `BalanceCategory` drawn from a closed enum, and an amount. For a conventional product the category is enough to explain the part. For a Shari\'ah-compliant product it is not — several distinct charges, payments and rewards can fall under a single category, and the enum has no member for each of them, so the breakdown shows a figure the customer cannot attribute.\n\n' +
      'v2.2 adds `BalanceDescription` to `AEAmountWithCategorization` — free text, 1 to 500 characters, naming the specific Shari\'ah-compliant charge, payment or reward that the component represents. It supplements the category rather than replacing it: the enum still classifies the part, and the description says which part it is.\n\n' +
      'One field addition reaches three endpoints, because the schema is used in three places. On the TPP-facing side, `Components` on `AEBalance` is served by the balances endpoint, `Allocations` on `AETransaction` by the transactions endpoint, and `Components` on `AEBalanceWithCategorization` — the opening and closing balance of a statement — by the statements endpoint. Ozone Connect mirrors all three: `components` on `CbuaeBalance`, `allocations` on `CbuaeTransaction`, and `Components` on `AEBalanceWithCategorization` under `AEStatements`.\n\n' +
      'Statements are easy to miss here, because the field arrives on them through a schema neither the balances nor the transactions response references. An implementer scoping this change from the balance and transaction payloads alone will not see it.\n\n' +
      'The field is optional and additive on both surfaces, and is required on neither. An LFI that offers no Islamic products has nothing to do, and a v2.1 payload validates unchanged. It is recorded separately from the Sharia product fields in §15 because it lands on the balances, transactions and statements endpoints rather than on product data, so it is a different piece of work for whoever implements it.\n\n' +
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

/** `/openapi/v2.2-rc2/api-hub/foo-openapi.yaml` → `foo-openapi`. */
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
 * v2.2-rc2 links to the v2.2-rc2 reference.
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

/**
 * How recent a release candidate is within its version: `v2.2-rc2` sorts ahead
 * of `v2.2-rc1`. A candidate with no `-rcN` suffix is the ratified release and
 * sorts ahead of every candidate of it.
 */
export function candidateRank(candidate: string): number {
  const rc = candidate.match(/-rc(\d+)$/)
  return rc?.[1] ? parseInt(rc[1], 10) : Number.MAX_SAFE_INTEGER
}

/**
 * Every change landing in a given documentation version, newest release
 * candidate first. `number` already follows this order — the sort is stated
 * rather than assumed so that renumbering cannot silently reorder the page.
 */
export function changesFor(toVersion: string): VersionChange[] {
  return VERSION_CHANGES
    .filter((c) => c.toVersion === toVersion)
    .sort(
      (a, b) =>
        candidateRank(b.introducedIn) - candidateRank(a.introducedIn) ||
        a.number - b.number,
    )
}

/**
 * The release candidates carrying changes in a version, newest first — the
 * groups the changelog splits its results into.
 */
export function candidatesFor(toVersion: string): string[] {
  return [...new Set(changesFor(toVersion).map((c) => c.introducedIn))]
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

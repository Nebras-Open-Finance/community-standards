// Build the derived OpenAPI drafts served from public/openapi-drafts/.
//
// A draft version documents changes that have not yet been published to
// api-specs, so its pages cannot render the fetched spec — that spec still
// describes the previous version. There are two ways a draft spec gets here:
//
//   Hand-authored   The capability has no upstream spec at all, so the whole
//                   document is written by hand and COMMITTED to the repo.
//                   `uae-consent-attestations-openapi.yaml` is one of these.
//
//   Derived         The change edits an operation inside an existing upstream
//                   spec. Copying that spec would duplicate thousands of lines
//                   and drift from upstream in silence, so instead this script
//                   applies a small declared patch to the FETCHED spec and
//                   writes the result. Derived output is gitignored, exactly
//                   like the fetched specs it comes from.
//
// This script only produces the derived ones. It runs after
// fetch-openapi-specs.mjs (see the `fetch:specs` npm script) and is a no-op
// when its input is missing, so a fetch failure does not cascade into a
// confusing YAML parse error here.
//
// Every patch MUST carry a `change` field naming the changelog entry it
// implements, so the reason for a local divergence from upstream is always one
// grep away. When a change lands upstream, delete its patch and flip
// SPEC_FOLDER — see supporting/internal_helpers/v2.2-draft-plan.md, phase 3.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseDocument } from 'yaml'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FETCHED = join(ROOT, 'public', 'openapi')
const DRAFTS = join(ROOT, 'public', 'openapi-drafts')

// ─── Patches ──────────────────────────────────────────────────────────────────

/**
 * @typedef {object} DraftPatch
 * @property {string} version   Local documentation version, e.g. 'v2.2-draft'.
 * @property {string} surface   Folder under public/openapi/{version}/.
 * @property {string} spec      Spec basename, without extension.
 * @property {string} change    Changelog entry this implements.
 * @property {(doc: import('yaml').Document) => void} apply
 */

/** Add a property name to a schema's `required` list, if it is not already there. */
function requireProperty(doc, schemaPath, property) {
  const required = doc.getIn([...schemaPath, 'required'])
  if (!required?.items) throw new Error(`${schemaPath.join('.')} has no required list`)
  if (required.items.some((item) => String(item) === property)) {
    throw new Error(`${schemaPath.join('.')}.${property} is already required upstream`)
  }
  // Appended rather than ordered against the properties map: the list is a set,
  // and appending keeps the diff against upstream to a single added line.
  required.items.push(doc.createNode(property))
}

// §5 lands the same obligation on both surfaces, so the normative wording is
// written once and shared. The Hub can only return a narrative the LFI supplied,
// which is why requiring it TPP-side without requiring it on Ozone Connect would
// leave the Hub with nothing to serialise.
//
// See the folded-scalar note on the §2 patch: one entry per paragraph.
const NARRATIVE_RULE =
  'Where the LFI holds no stored narrative for a transaction, it MUST derive one from the data it does hold — the merchant name, the counterparty, or the transaction type. Whitespace-only values and non-informative placeholders such as `N/A`, `-`, or `Unknown` do not satisfy this requirement.'

/** @type {DraftPatch[]} */
const PATCHES = [
  {
    version: 'v2.2-draft',
    surface: 'api-hub',
    spec: 'uae-api-hub-consent-manager-openapi',
    change: 'v2.1-to-v2.2 §2 — multi-status filter on GET /psu/{userId}/consents',
    apply(doc) {
      // Give this one operation its own `status` parameter, replacing the
      // `$ref` to the shared component. The shared component is deliberately
      // left alone: /consents, /consent-groups/{consentGroupId}/consents and
      // /accounts/{accountId}/consents also reference it and stay
      // single-valued in v2.2.
      const params = doc.getIn(['paths', '/psu/{userId}/consents', 'get', 'parameters'])
      if (!params || typeof params.items?.findIndex !== 'function') {
        throw new Error('GET /psu/{userId}/consents has no parameters array')
      }

      const index = params.items.findIndex((item) => {
        const ref = item?.get?.('$ref')
        return ref === '#/components/parameters/status'
      })
      if (index === -1) {
        throw new Error('GET /psu/{userId}/consents does not reference the shared status parameter')
      }

      params.items[index] = doc.createNode({
        name: 'status',
        in: 'query',
        required: false,
        // `explode: false` on an array renders as `?status=A,B` — the same
        // comma-separated convention as accountIds and insurancePolicyIds.
        style: 'form',
        explode: false,
        // One entry per paragraph, joined by a blank line. Do NOT break these
        // across array entries for readability: the YAML writer emits a folded
        // scalar, where a single newline in the value has to be represented as
        // a blank line — so a soft wrap here becomes a real paragraph break in
        // the rendered description.
        description: [
          'Consent statuses to filter by, as a comma-separated list — for example `?status=Authorized,Suspended`.',
          'The list is evaluated as a union: a consent is returned if its status matches any value in the list. Order is not significant and duplicates are ignored. Omit the parameter to return consents of every status.',
          'Every value MUST be a member of `AEConsentStatus`. A request carrying any other value is rejected with `400`. Values are case-sensitive.',
        ].join('\n\n'),
        schema: {
          type: 'array',
          minItems: 1,
          items: { $ref: '#/components/schemas/AEConsentStatus' },
        },
      })
    },
  },
  {
    version: 'v2.2-draft',
    surface: 'api-hub',
    spec: 'uae-api-hub-consent-manager-openapi',
    change: 'v2.1-to-v2.2 §3 — payment rail on the payment log',
    apply(doc) {
      // The three values are NOT a new vocabulary. They are already normative
      // in this document as the namespace prefix of
      // CbuaePaymentLogRejectReasonCode.items.code (`^(AANI|FTS|LFI)\.[...]$`),
      // which is why the two fields are required to agree below. This patch
      // promotes that vocabulary to a first-class field.
      const RAIL = 'AEPaymentRail'
      const railRef = { $ref: `#/components/schemas/${RAIL}` }

      // See the folded-scalar note on the patch above: one entry per paragraph.
      // The three value definitions are separate entries so they render as a
      // Markdown list rather than folding into one run-on line.
      doc.setIn(['components', 'schemas', RAIL], doc.createNode({
        type: 'string',
        description: [
          'The payment rail over which the LFI settled the payment.',
          'The value records how the payment was **executed**, not how it was requested. Where an LFI\'s routing rules settle an instant payment on another rail, this field reports the rail actually used.',
          '* `AANI`: Settled over AANI, the UAE instant payment platform.',
          '* `FTS`: Settled over UAEFTS, the CBUAE funds transfer system.',
          '* `LFI`: Settled internally by the LFI. The debtor and creditor accounts are both held at the LFI, so the payment was booked on the LFI\'s own ledger and did not reach an external rail.',
          'The LFI MUST populate this field when patching `paymentResponse.status` to a terminal success status — `AcceptedWithoutPosting`, `AcceptedSettlementCompleted`, or `AcceptedCreditSettlementCompleted`. It MAY be sent alongside `Pending`, and MAY be omitted on `Rejected`, where the payment may have been rejected before a rail was selected.',
          'Where a payment was rejected by a rail, this value MUST agree with the namespace of the corresponding `paymentResponse.rejectReasonCode` entry: an `AANI.*` reject code MUST be accompanied by `AANI`, and an `FTS.*` code by `FTS`. An `LFI.*` reject code indicates rejection at the LFI prior to rail submission, and carries no such constraint.',
          'This field and `paymentResponse.paymentTransactionId` are a pair: the rail names the system that generated the transaction identifier.',
          'A payment settles over exactly one rail. This holds for file payments as well as single payments — a file payment is settled in its entirety over one rail, so a single value describes the whole record.',
        ].join('\n\n'),
        enum: ['AANI', 'FTS', 'LFI'],
        example: 'AANI',
      }))

      // Both insertions go BEFORE the reject reason code rather than appending.
      // The rail is an execution fact and belongs beside `paymentTransactionId`,
      // the identifier it explains; `rejectReasonCode` reads as the failure tail
      // of the object and should stay last. `setIn` would append, so splice the
      // pair into the map's item list at the anchor instead.
      const insertBefore = (path, anchorKey, key, value, label) => {
        const map = doc.getIn(path)
        if (!map?.items) throw new Error(`${label} has no properties map`)
        const at = map.items.findIndex((pair) => String(pair.key) === anchorKey)
        if (at === -1) {
          throw new Error(`${label} has no \`${anchorKey}\` to anchor the insert against`)
        }
        map.items.splice(at, 0, doc.createPair(key, value))
      }

      // 1. PATCH /payment-log/{id} — where the LFI reports the rail. The flat
      //    dotted key is the established convention in this request body.
      insertBefore(
        ['components', 'schemas', 'CbuaePatchPaymentRecordBody', 'properties'],
        'paymentResponse.rejectReasonCode',
        'paymentResponse.paymentRail',
        railRef,
        'CbuaePatchPaymentRecordBody',
      )

      // 2. GET /payment-log — the read model. Without this the field can be
      //    written and never read back, which is the defect
      //    `paymentTransactionId` already has upstream (see the plan).
      insertBefore(
        [
          'paths', '/payment-log', 'get', 'responses', '200',
          'content', 'application/json', 'schema',
          'properties', 'data', 'items', 'properties', 'paymentResponse', 'properties',
        ],
        'rejectReasonCode',
        'paymentRail',
        railRef,
        'GET /payment-log 200 response paymentResponse',
      )
    },
  },
  {
    version: 'v2.2-draft',
    surface: 'api-hub',
    spec: 'uae-api-hub-consent-manager-openapi',
    change: 'v2.1-to-v2.2 §4 — pagination on GET /payment-log',
    apply(doc) {
      // Paginate exactly like the four consent-list endpoints in this same
      // document — GET /consents, /consent-groups/{id}/consents,
      // /psu/{userId}/consents and /accounts/{accountId}/consents. Those are the
      // only other paginated endpoints the API Hub provides to LFIs, and they
      // all take the shared `page` and `pageSize` parameters and return
      // `paginationMetadata`. Same components, same order, same response shape:
      // nothing bespoke, so an LFI already calling those endpoints has nothing
      // new to learn.
      //
      // (The opaque `Links` envelope — Self/First/Prev/Next/Last plus
      // Meta.TotalPages — is used only on the TPP-facing standards, where it
      // lets the Hub change pagination strategy without breaking external
      // clients. The dividing line is the interface, not the implementer: the
      // Hub implements both those APIs and this one.)
      const OP = ['paths', '/payment-log', 'get']
      const PAGE_PARAMS = ['page', 'pageSize']

      const params = doc.getIn([...OP, 'parameters'])
      if (!params || typeof params.items?.some !== 'function') {
        throw new Error('GET /payment-log has no parameters array')
      }
      for (const name of PAGE_PARAMS) {
        const ref = `#/components/parameters/${name}`
        if (params.items.some((item) => item?.get?.('$ref') === ref)) {
          throw new Error(`GET /payment-log already takes a ${name} parameter`)
        }
        // Reuse the shared components rather than inlining copies: the semantics
        // are identical to the consent-list endpoints, and the $ref says so.
        // `pageSize` already documents its own default of 25.
        params.items.push(doc.createNode({ $ref: ref }))
      }

      // The response `meta` is currently `#/components/schemas/meta` — an empty
      // object with additionalProperties: false, so there is nowhere to report
      // pagination state. Swap it for the pagination schema the consent-list
      // endpoints already return.
      const metaPath = [
        ...OP, 'responses', '200', 'content', 'application/json',
        'schema', 'properties', 'meta',
      ]
      if (!doc.getIn(metaPath)) {
        throw new Error('GET /payment-log 200 response has no meta property')
      }
      doc.setIn(metaPath, doc.createNode({ $ref: '#/components/schemas/paginationMetadata' }))

      // See the folded-scalar note on the §2 patch: one entry per paragraph.
      const description = doc.getIn([...OP, 'description'])
      const existing = typeof description === 'string' ? description.trim() : ''
      doc.setIn([...OP, 'description'], doc.createNode([
        'Retrieve the payments made under a consent, using the `consentId` value.',
        'The response is **paginated**, using the same `page` and `pageSize` parameters as the consent list operations on this API. `pageSize` defaults to 25. The response `meta` reports `pageNumber`, `pageSize`, `totalPages` and `totalRecords`, so a caller reads `totalPages` to know when to stop rather than assuming a short page is the last one.',
        'Callers written against v2.1 received every payment for the consent in a single response. From v2.2 they receive one page, and MUST follow `page` to retrieve the rest.',
      ].join('\n\n')))
      if (existing && !existing.startsWith('Retrieve')) {
        throw new Error(`GET /payment-log description was not the expected v2.1 text: "${existing.slice(0, 60)}…"`)
      }
    },
  },
  {
    version: 'v2.2-draft',
    surface: 'standards',
    spec: 'uae-account-information-openapi',
    change: 'v2.1-to-v2.2 §5 — transaction narrative is required',
    apply(doc) {
      requireProperty(doc, ['components', 'schemas', 'AETransaction'], 'TransactionInformation')

      const schema = ['components', 'schemas', 'TransactionInformation']
      if (!doc.getIn(schema)) throw new Error('No TransactionInformation schema to describe')
      // The v2.1 length bounds (1–500) are left alone — the field was already
      // constrained here; what changes is that it must now be present.
      doc.setIn([...schema, 'description'], doc.createNode([
        'Further details of the transaction. This is the transaction narrative, which is unstructured text.',
        'REQUIRED from v2.2. Every transaction returned MUST carry a narrative by which the customer can recognise the entry.',
        NARRATIVE_RULE,
      ].join('\n\n')))
    },
  },
  {
    version: 'v2.2-draft',
    surface: 'ozone-connect',
    spec: 'uae-ozone-connect-bank-data-sharing-openapi',
    change: 'v2.1-to-v2.2 §6 — Confirmation of Payee is reduced to the query',
    apply(doc) {
      // CoP asks one question: does this name belong to this IBAN? The v2.1
      // response answers it through a four-level identity-assurance envelope
      // borrowed from OpenID Connect for Identity Assurance —
      //   data[] → verifiedClaims[] → verification{…} → claims{…}
      // — of which only the innermost name is read. This patch removes the two
      // middle levels, leaving data[] → name{…}, and removes the submitted name
      // from the request, which the LFI has no use for.
      //
      // The whole CoP subtree is reachable ONLY from
      // POST /customers/action/cop-query: ConfirmationRequest, PersonName,
      // BusinessName, ConfirmationResponse, CbuaeCopCustomer,
      // CbuaeVerifiedCopClaim and ConfirmationOfPayeePersonClaims have no other
      // referrer in this document. GET /accounts/{accountId}/customer has its own
      // parallel CbuaeCustomer / CbuaeVerifiedClaim schemas and is untouched, so
      // nothing outside CoP moves.
      const S = ['components', 'schemas']

      // Guard before mutating: if upstream has already reshaped these, the patch
      // is stale and silently double-applying it would be worse than failing.
      for (const name of [
        'CbuaeCopCustomer', 'CbuaeVerifiedCopClaim', 'ConfirmationOfPayeePersonClaims',
        'PersonName', 'BusinessName',
      ]) {
        if (!doc.getIn([...S, name])) throw new Error(`No ${name} schema — CoP subtree already reshaped?`)
      }

      // Person and business stay separate branches — the LFI knows which kind of
      // holder it has, and the two carry different fields.
      // `additionalProperties: false` on both keeps the oneOf unambiguous: the
      // branches share no property.
      //
      // Only `fullName` / `businessName` is required. Everything else is an
      // OPTIONAL input to future matching — the Hub compares full names today,
      // and these fields exist so the algorithm can improve without a second
      // breaking change to this contract.
      doc.setIn([...S, 'CbuaeCopPersonName'], doc.createNode({
        description: [
          'The name of a personal account holder, as held by the LFI.',
          '`fullName` is the only required field and is what the API Hub matches on today. The remaining fields are OPTIONAL and are not required for a match to succeed — supply them where your systems hold them separately, so that improvements to the matching algorithm can use them without a further change to this contract.',
        ].join('\n\n'),
        type: 'object',
        required: ['fullName'],
        additionalProperties: false,
        properties: {
          fullName: {
            description: 'The full name of the account holder, as it appears on the account, as a single string.',
            type: 'string', minLength: 1, maxLength: 140,
          },
          firstName: {
            description: 'Given name of the account holder. Optional. Named `firstName` rather than the v2.1 `givenName`, which the v2.1 schema already recorded as withdrawn.',
            type: 'string', minLength: 1, maxLength: 70,
          },
          middleName: {
            description: 'Middle name(s) of the account holder. Optional.',
            type: 'string', minLength: 1, maxLength: 70,
          },
          lastName: {
            description: 'Family name of the account holder. Optional. Named `lastName` rather than the v2.1 `familyName`, which the v2.1 schema already recorded as withdrawn.',
            type: 'string', minLength: 1, maxLength: 70,
          },
          fullNameAr: {
            description: 'The full name of the account holder in Arabic script, where the LFI holds one. Optional. Not matched today.',
            type: 'string', minLength: 1, maxLength: 140,
          },
          alsoKnownAs: {
            description: 'Other names the account is legitimately known by — for example a maiden name, or a transliteration variant the LFI holds. Optional. Not matched today.',
            type: 'array',
            items: { type: 'string', minLength: 1, maxLength: 140 },
          },
        },
      }))

      doc.setIn([...S, 'CbuaeCopBusinessName'], doc.createNode({
        description: [
          'The name of a business account holder, as held by the LFI.',
          '`businessName` is the only required field and is what the API Hub matches on today. The remaining fields are OPTIONAL inputs to future matching.',
        ].join('\n\n'),
        type: 'object',
        required: ['businessName'],
        additionalProperties: false,
        properties: {
          businessName: {
            description: 'The registered business name on the account.',
            type: 'string', minLength: 1, maxLength: 140,
          },
          businessNameAr: {
            description: 'The registered business name in Arabic script, where the LFI holds one. Optional. Not matched today.',
            type: 'string', minLength: 1, maxLength: 140,
          },
          alsoKnownAs: {
            description: 'Other names the business is legitimately known by — for example a trading name distinct from the registered name. Optional. Not matched today.',
            type: 'array',
            items: { type: 'string', minLength: 1, maxLength: 140 },
          },
        },
      }))

      // `number` is dropped along with the envelope. It was optional, never read
      // by matching, and is customer data this operation has no need of — CoP
      // runs WITHOUT a consent, so the response carries only what the question
      // requires. `id` is retained: it is pseudonymous by definition ("no meaning
      // to the account owner") and is the only handle for investigating a
      // disputed result.
      doc.setIn([...S, 'CbuaeCopCustomer'], doc.createNode({
        description: [
          'One account holder returned for a Confirmation of Payee query.',
          'A joint account returns one entry per holder. The API Hub evaluates EVERY entry in `data` — returning the holders in any order is safe, and the LFI MUST NOT attempt to order them by likelihood of match.',
        ].join('\n\n'),
        type: 'object',
        required: ['id', 'name'],
        additionalProperties: false,
        properties: {
          id: {
            description: 'A unique and immutable identifier used to identify the customer resource. This identifier has no meaning to the account owner.',
            type: 'string', minLength: 1, maxLength: 40,
          },
          name: {
            description: 'The name held against the account for this holder — a personal name or a business name.',
            oneOf: [
              { $ref: `#/components/schemas/CbuaeCopPersonName` },
              { $ref: `#/components/schemas/CbuaeCopBusinessName` },
            ],
          },
        },
      }))

      // Deleted last, so the guard above still had them to check. Both are
      // unreachable once CbuaeCopCustomer no longer refers to them.
      // ConfirmationOfPayeePersonClaims carried salary, employer, marital status,
      // residential address, Emirates ID and 15 other fields on a response whose
      // only job is to compare two names.
      doc.deleteIn([...S, 'CbuaeVerifiedCopClaim'])
      doc.deleteIn([...S, 'ConfirmationOfPayeePersonClaims'])

      // The request carries the IBAN and nothing else. The name the TPP
      // submitted was never the LFI's to act on — the LFI looks the account up
      // by IBAN and returns the holders it has, and the API Hub compares.
      // Sending the name invited exactly the matching this operation forbids,
      // and it disclosed a third party's name to an institution that has no use
      // for it on a call made without a consent.
      const ACCOUNT = [
        ...S, 'ConfirmationRequest', 'properties', 'data', 'properties', 'account',
      ]
      if (!doc.getIn([...ACCOUNT, 'properties', 'name'])) {
        throw new Error('ConfirmationRequest account has no name — request already reshaped?')
      }
      doc.deleteIn([...ACCOUNT, 'properties', 'name'])

      const required = doc.getIn([...ACCOUNT, 'required'])
      if (!required?.items) throw new Error('ConfirmationRequest account has no required list')
      required.items = required.items.filter((item) => String(item) !== 'name')

      doc.setIn([...ACCOUNT, 'description'], doc.createNode(
        'The account the Confirmation of Payee query is about, identified by IBAN. From v2.2 the name the TPP submitted is NOT sent to the LFI — the LFI returns the name(s) it holds against this account, and the API Hub compares them.',
      ))

      // Unreachable once the request no longer carries a name: both schemas were
      // referenced only from `account.name`.
      doc.deleteIn([...S, 'PersonName'])
      doc.deleteIn([...S, 'BusinessName'])

      // Make the response semantics explicit. Every statement here was already
      // true of v2.1 — they were implicit, or stated only in the operation
      // description where an implementer reading the schema would not find them.
      // See the folded-scalar note on the §2 patch: one entry per paragraph.
      const OP = ['paths', '/customers/action/cop-query', 'post']
      if (!doc.getIn(OP)) throw new Error('No POST /customers/action/cop-query operation')
      doc.setIn([...OP, 'description'], doc.createNode([
        'Used by the API Hub to find the name(s) held against an account, so that the Hub can answer a Confirmation of Payee query.',
        'The API Hub sends an IBAN, and nothing else. The LFI returns the name(s) it holds against that account. **The LFI performs no matching** — the name the TPP submitted is not sent to it, and it MUST NOT filter, rank, or omit holders on any basis. The API Hub owns the matching rules and applies them to what is returned.',
        'A joint account MUST return **one entry per holder**. The API Hub evaluates every entry in `data`; it does not stop at the first.',
        '**Not found is `200` with an empty `data` array** — never `204`, `404`, `201`, or `202`. Return it where the account does not exist, is under a bar, or the customer has opted out of Confirmation of Payee. The three cases are deliberately indistinguishable to the TPP, so that a CoP query cannot be used to probe for the existence of an account.',
        'From v2.2 the request carries the IBAN only, and the response is **flattened**: each entry in `data` carries `name` directly. The v2.1 `verifiedClaims` / `verification` identity-assurance envelope is removed from this operation — the API Hub never read it. See the migration note in the LFI API Guide.',
        'This operation is not carried out under a consent, and the call will not have an `o3-consent-id` header. The response MUST therefore carry only the name data this question requires, and no wider customer data.',
      ].join('\n\n')))
    },
  },
  {
    version: 'v2.2-draft',
    surface: 'ozone-connect',
    spec: 'uae-ozone-connect-bank-data-sharing-openapi',
    change: 'v2.1-to-v2.2 §5 — transaction narrative is required',
    apply(doc) {
      requireProperty(doc, ['components', 'schemas', 'CbuaeTransaction'], 'transactionInformation')

      const property = [
        'components', 'schemas', 'CbuaeTransaction', 'properties', 'transactionInformation',
      ]
      if (!doc.getIn(property)) throw new Error('CbuaeTransaction has no transactionInformation property')
      // v2.1 leaves this an unconstrained string while the TPP-facing schema
      // bounds it at 1–500. An LFI could therefore return a 600-character
      // narrative that passes its own contract and then fails the Hub's — a
      // failure invisible in the document the LFI builds against. Align them.
      doc.setIn(property, doc.createNode({
        description: [
          'Further details of the transaction. This is the transaction narrative, which is unstructured text.',
          'REQUIRED from v2.2. The API Hub returns this value to the TPP as `TransactionInformation`, where it is also required, so a transaction record that omits it cannot be served.',
          NARRATIVE_RULE,
          'The length bounds match the TPP-facing `TransactionInformation` schema, so a narrative that validates here also validates when the API Hub returns it.',
        ].join('\n\n'),
        type: 'string',
        minLength: 1,
        maxLength: 500,
      }))
    },
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

// More than one changelog entry can change the same spec — §2 and §3 both edit
// the Consent Manager. Patches are therefore grouped by output file and applied
// in order to a single parsed document. Applying them independently would give
// each patch a fresh copy of the fetched input, and the last write would
// silently discard every other patch's work.
function groupByOutput(patches) {
  const groups = new Map()
  for (const patch of patches) {
    const key = `${patch.version}/${patch.surface}/${patch.spec}`
    if (!groups.has(key)) {
      groups.set(key, { version: patch.version, surface: patch.surface, spec: patch.spec, patches: [] })
    }
    groups.get(key).patches.push(patch)
  }
  return [...groups.values()]
}

function main() {
  let written = 0
  let skipped = 0

  for (const group of groupByOutput(PATCHES)) {
    const { version, surface, spec, patches } = group
    const input = join(FETCHED, version, surface, `${spec}.yaml`)
    const outDir = join(DRAFTS, version)
    const output = join(outDir, `${spec}.yaml`)

    if (!existsSync(input)) {
      console.warn(`  ⚠ ${spec} — no fetched spec at ${input}, skipping`)
      skipped++
      continue
    }

    // Keep comments and key order from the source document so the generated
    // file diffs cleanly against upstream.
    const doc = parseDocument(readFileSync(input, 'utf-8'))
    for (const patch of patches) {
      try {
        patch.apply(doc)
      } catch (err) {
        // Name the patch: with several applied to one document, "no parameters
        // array" alone does not say which change broke.
        throw new Error(`Patch failed — ${patch.change}: ${err.message}`, { cause: err })
      }
    }

    const banner =
      `# GENERATED — do not edit. Built by scripts/build-openapi-drafts.mjs from\n` +
      `# public/openapi/${version}/${surface}/${spec}.yaml.\n` +
      `# Local divergence from upstream:\n` +
      patches.map((p) => `#   - ${p.change}\n`).join('')

    mkdirSync(outDir, { recursive: true })
    writeFileSync(output, banner + String(doc), 'utf-8')
    console.log(`  ✓ ${version}/${spec}.yaml`)
    for (const patch of patches) console.log(`      ${patch.change}`)
    written++
  }

  console.log(`\nOpenAPI drafts: ${written} written, ${skipped} skipped.`)
}

main()

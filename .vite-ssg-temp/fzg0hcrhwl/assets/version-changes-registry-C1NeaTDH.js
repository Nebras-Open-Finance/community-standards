import { a as allEndpoints, s as sectionUrl, d as surfaceUrl } from "../main.mjs";
const TPP = "/tech/tpp-standards/v2.2-rc1";
const LFI = "/tech/lfi-api-hub/v2.2-rc1";
const DDC = `${TPP}/consent/data-deletion-confirmation`;
const CM = `${LFI}/api-hub/consent-manager`;
const COP = `${LFI}/banking/confirmation-of-payee`;
const VERSION_CHANGES = [
  {
    changeId: "v2.1-to-v2.2",
    fromVersion: "v2.1",
    toVersion: "v2.2-rc1",
    number: 1,
    category: "New capability",
    title: "Data deletion confirmation — attestations sub-resource",
    summary: "A TPP confirms it has deleted (or lawfully retained) the data held under a consent, by posting an Attestation Event once that consent reaches a terminal status.",
    description: "Every consent gains an append-only `attestations` sub-resource. Once a consent reaches a terminal status — `Revoked` or `Expired` — the TPP reviews the data it holds under that consent and POSTs an Attestation Event confirming what it did with it. `Rejected` consents are out of scope: no data was ever shared under them.\n\nThe sub-resource is added to all three consent types, each scoped to its own API family:\n\n`POST /account-access-consents/{ConsentId}/attestations` (scope `accounts`), `POST /payment-consents/{ConsentId}/attestations` (scope `payments`), and `POST /insurance-consents/{ConsentId}/attestations` (scope `insurance`).\n\nA payment consent is not empty for this purpose — it carries debtor and creditor details, amounts, references, and any account data the TPP retrieved to set the payment up, so it falls under the same obligation as a data sharing consent.\n\nThe event body carries an envelope — `AttestationType` (today only `DataRetentionDeletion`), `AttestationStatusAppliedDateTime`, `DataAccessCeasedDateTime`, and `ConsentRevocationDateTime` where the customer revoked at the TPP — plus a `DataActions` array with one entry per category of data held. Each entry declares whether that category was `Deleted`, `Retained`, `Anonymised`, or `ArchivedRestricted`, and carries the date the attestation for that category was made; anything kept also requires a retention reason, a retained-until date, and an access restriction.\n\nThe POST is not a JSON body: the request is a signed JWT sent as `application/jwt`, carrying the Attestation in its `message` claim, and the `201` response is a signed JWT in return. The receipt inside it gives `AttestationId`, `AttestationReceivedDateTime` and `RegulatoryDeadlineMetIndicator`, plus a full copy of the Attestation submitted — repeating it puts the complete record inside the signed message. `RegulatoryDeadlineMetIndicator` reports whether the event arrived before the regulatory deadline for the attestation type; for `DataRetentionDeletion` that is 45 days from the consent becoming terminal, a value the API Hub applies rather than one the specification carries. A late event is still recorded, not rejected.\n\nThe GET returns every recorded event as unsigned JSON, paginated, each carrying its copy of the submitted Attestation. Where a TPP has posted more than one, only the last successfully recorded event is reported on; `LastSubmitted=true` retrieves just that one.\n\nThe sub-resource is append-only and stateless. Each POST records a new immutable event, the API Hub applies no de-duplication, and there is no correction endpoint — a restatement is simply another event. `AttestationType` is the extension point: a future obligation to attest to something else against a consent becomes a new type rather than a new API.\n\nThe full specification — field tables, enum values, validation rules, and worked examples — is on the Data Deletion Confirmation page linked below.",
    docsPaths: [{ label: "Full specification", path: `${DDC}/` }],
    audience: "TPP",
    areas: ["Consent", "Data Deletion", "Data Sharing", "Service Initiation", "Insurance"],
    specs: [
      // The sub-resource is published in each family's own document rather than
      // one of its own, so all three are listed.
      "uae-account-information-openapi",
      "uae-bank-initiation-openapi",
      "uae-insurance-openapi"
    ],
    endpoints: [
      {
        label: "POST /account-access-consents/{ConsentId}/attestations",
        path: `${DDC}/open-api/post-account-access-consents-ConsentId-attestations`
      },
      {
        label: "GET /account-access-consents/{ConsentId}/attestations",
        path: `${DDC}/open-api/get-account-access-consents-ConsentId-attestations`
      },
      {
        label: "POST /payment-consents/{ConsentId}/attestations",
        path: `${DDC}/open-api/post-payment-consents-ConsentId-attestations`
      },
      {
        label: "GET /payment-consents/{ConsentId}/attestations",
        path: `${DDC}/open-api/get-payment-consents-ConsentId-attestations`
      },
      {
        label: "POST /insurance-consents/{ConsentId}/attestations",
        path: `${DDC}/open-api/post-insurance-consents-ConsentId-attestations`
      },
      {
        label: "GET /insurance-consents/{ConsentId}/attestations",
        path: `${DDC}/open-api/get-insurance-consents-ConsentId-attestations`
      }
    ],
    affectedPaths: [
      `${TPP}/consent/`,
      `${TPP}/consent/requirements`,
      `${TPP}/banking/data-sharing/`,
      `${TPP}/banking/service-initiation/`,
      `${TPP}/insurance/data-sharing/`
    ]
  },
  {
    changeId: "v2.1-to-v2.2",
    fromVersion: "v2.1",
    toVersion: "v2.2-rc1",
    number: 2,
    category: "Behaviour change",
    title: "Consents by end user — the `status` filter accepts multiple statuses",
    summary: "The `status` query parameter on `GET /psu/{userId}/consents` takes a comma-separated list of consent statuses instead of a single value, and is constrained to the `AEConsentStatus` enum.",
    description: "`GET /psu/{userId}/consents` filters an end user's consents by status. In v2.1 the `status` parameter is a single untyped string, so an LFI building a Consent Management Interface that shows, say, every consent still in use has to issue one request per status and merge the results itself.\n\nIn v2.2 the parameter becomes a comma-separated list — `?status=Authorized,Suspended` — evaluated as a union: a consent is returned if its status matches any value in the list. A single value behaves exactly as it does in v2.1, and omitting the parameter still returns consents of every status. Order is not significant and duplicates are ignored.\n\nThe parameter is also now typed. In v2.1 its schema is a bare `string` with no enum, so the specification places no constraint on what may be sent and an unrecognised value simply returns an empty array. In v2.2 each list item MUST be a member of `AEConsentStatus` — `AwaitingAuthorization`, `Authorized`, `Rejected`, `Revoked`, `Expired`, `Consumed`, or `Suspended` — and a request carrying any other value is rejected with `400`. Values are case-sensitive.\n\nThe change is scoped to this one operation. The three sibling list endpoints — `GET /consents`, `GET /consent-groups/{consentGroupId}/consents`, and `GET /accounts/{accountId}/consents` — share the v2.1 `status` parameter component and are unchanged in v2.2; they continue to accept a single untyped value.\n\nThe comma-separated form follows the convention already used for multi-valued query parameters elsewhere in the standards, such as `accountIds` and `insurancePolicyIds` on the Ozone Connect endpoints, so it needs no new parsing on the LFI side. In OpenAPI terms the parameter becomes an array with `style: form` and `explode: false`.\n\nThe change is published in the v2.2 release of the Consent Manager OpenAPI document in the api-specs repository, which is what the endpoint page below renders.",
    docsPaths: [{ label: "Full specification", path: `${CM}/open-api/psu-userId-consents` }],
    audience: "LFI",
    areas: ["Consent", "Consent Manager", "Consent Management Interface"],
    specs: ["uae-api-hub-consent-manager-openapi"],
    endpoints: [
      {
        label: "GET /psu/{userId}/consents",
        path: `${CM}/open-api/psu-userId-consents`
      }
    ],
    affectedPaths: [
      `${CM}/`,
      `${CM}/open-api/psu-userId-consents`
    ]
  },
  {
    changeId: "v2.1-to-v2.2",
    fromVersion: "v2.1",
    toVersion: "v2.2-rc1",
    number: 3,
    category: "New capability",
    title: "Payment log records the rail used to settle the payment",
    summary: "The LFI reports which rail settled a payment — `AANI`, `FTS`, or `LFI` for an on-us transfer — as a new `paymentResponse.paymentRail` field on the payment log.",
    description: "The payment log records what the API Hub knows about a payment, but not how it was settled. `paymentResponse.paymentTransactionId` already depends on the rail to be interpreted — its v2.1 description singles out AANI-generated identifiers in prose — while nothing in the record states which rail produced it.\n\nv2.2 adds `paymentResponse.paymentRail`, a closed enum of `AANI` (the UAE instant payment platform), `FTS` (UAEFTS, the CBUAE funds transfer system), and `LFI` (settled internally, both accounts held at the same LFI, so the payment never reached an external rail). The LFI sets it on the existing `PATCH /payment-log/{id}` call, and it is returned on `GET /payment-log`.\n\nThe value records how the payment was executed rather than how it was requested: where an LFI's routing rules settle an instant payment on another rail, the field reports the rail actually used. A payment settles over exactly one rail — this holds for file payments as well as single payments, so one value describes the whole record.\n\nThe LFI MUST populate the field when patching the status to a terminal success — `AcceptedWithoutPosting`, `AcceptedSettlementCompleted`, or `AcceptedCreditSettlementCompleted`. It MAY be sent alongside `Pending`, and MAY be omitted on `Rejected`, where the payment may have been rejected before any rail was selected.\n\nThe three values are the namespaces already used by `paymentResponse.rejectReasonCode`, whose v2.1 pattern is `^(AANI|FTS|LFI)\\.[A-Za-z0-9]+$`. The two fields MUST therefore agree: an `AANI.*` reject code is accompanied by `AANI`, and an `FTS.*` code by `FTS`. An `LFI.*` reject code means the payment was rejected at the LFI before rail submission, and carries no such constraint.\n\nBecause the field is required on a terminal-success patch, an LFI built against v2.1 that patches a completed payment without it is rejected under v2.2. This is the one change in v2.2 that requires action from every LFI, and the API Hub enforcement date is set separately from the version cutover.\n\nThe change is published in the v2.2 release of the Consent Manager OpenAPI document in the api-specs repository, which is what the endpoint pages below render.",
    docsPaths: [{ label: "Full specification", path: `${CM}/open-api/payment-log-id` }],
    audience: "LFI",
    areas: ["Consent Manager", "Payments", "Service Initiation", "Reporting"],
    specs: ["uae-api-hub-consent-manager-openapi"],
    endpoints: [
      {
        label: "PATCH /payment-log/{id}",
        path: `${CM}/open-api/payment-log-id`
      },
      {
        label: "GET /payment-log",
        path: `${CM}/open-api/payment-log`
      }
    ],
    affectedPaths: [
      `${CM}/`,
      `${CM}/open-api/payment-log-id`,
      `${CM}/open-api/payment-log`
    ]
  },
  {
    changeId: "v2.1-to-v2.2",
    fromVersion: "v2.1",
    toVersion: "v2.2-rc1",
    number: 4,
    category: "Behaviour change",
    title: "Payment log is paginated",
    summary: "`GET /payment-log` returns one page of payments instead of every payment under the consent, taking the same `page` and `pageSize` parameters as the consent list operations.",
    description: "In v2.1 `GET /payment-log` returns every payment made under a consent in one response. The record it returns is not small — each one embeds the full payment request, its detached signature, the request headers, and the full payment response — so a long-lived consent that has executed hundreds of payments produces a response measured in megabytes, on an endpoint a Consent Management Interface calls to draw a customer-facing payment history.\n\nv2.2 paginates the operation, using exactly the model already in place elsewhere in this API. It gains the shared `page` and `pageSize` query parameters — `page` is 1-indexed and defaults to `1`, `pageSize` defaults to 25 — and the response `meta` object, which in v2.1 is empty and closed to additional properties, is replaced by the same `paginationMetadata` schema those endpoints return: `pageNumber`, `pageSize`, `totalPages`, and `totalRecords`.\n\nNothing here is bespoke. The four consent list operations on this API — `GET /consents`, `GET /consent-groups/{consentGroupId}/consents`, `GET /psu/{userId}/consents`, and `GET /accounts/{accountId}/consents` — are the only other paginated endpoints the API Hub provides to LFIs, and they take the same two parameter components and return the same metadata schema. `/payment-log` was the one list operation in the API that had been left unpaginated; it now behaves like the endpoints beside it, so an LFI already calling those has nothing new to learn.\n\n`totalRecords` counts every payment under the consent and `totalPages` is `ceil(totalRecords / pageSize)`, so a caller reads `totalPages` to know when to stop rather than treating a short page as the last one.\n\nThis is a behaviour change that requires action. An LFI built against v2.1 that calls this endpoint and renders what it receives will, from v2.2, silently show only the first page of payments on any consent that has more — with no error to signal the truncation. Any caller that needs the full set MUST iterate `page` until `pageNumber` reaches `totalPages`. This is the reason to check the endpoint even where the rest of v2.2 needs no work.\n\nThe change is published in the v2.2 release of the Consent Manager OpenAPI document in the api-specs repository, which is what the endpoint page below renders.",
    docsPaths: [{ label: "Full specification", path: `${CM}/open-api/payment-log` }],
    audience: "LFI",
    areas: ["Consent Manager", "Payments", "Consent Management Interface"],
    specs: ["uae-api-hub-consent-manager-openapi"],
    endpoints: [
      {
        label: "GET /payment-log",
        path: `${CM}/open-api/payment-log`
      }
    ],
    affectedPaths: [
      `${CM}/`,
      `${CM}/open-api/payment-log`,
      `${LFI}/consent-management-interface/api-guide`
    ]
  },
  {
    changeId: "v2.1-to-v2.2",
    fromVersion: "v2.1",
    toVersion: "v2.2-rc1",
    number: 5,
    category: "Behaviour change",
    title: "Transaction narrative is required",
    summary: "Every transaction returned by the transactions endpoint MUST carry a narrative. `TransactionInformation` moves from optional to required on both the TPP-facing and the Ozone Connect transaction schema.",
    description: "A transaction the customer cannot recognise is of limited use to them. In v2.1 the narrative that identifies an entry — `TransactionInformation` on the TPP-facing schema, `transactionInformation` on Ozone Connect — is an optional field on both, so a conformant LFI may return a transaction carrying nothing but an amount, a date, and a type. TPPs then either display an entry the customer cannot place, or build their own guesswork from the fields that are present.\n\nIn v2.2 the field is technically required: it is added to the `required` list of `AETransaction` in the Account Information specification and of `CbuaeTransaction` in the Ozone Connect Bank Data Sharing specification. A transaction record that omits it no longer validates on either surface.\n\nThe requirement applies to both surfaces because the API Hub can only return a narrative the LFI supplied. Requiring it TPP-side alone would leave the Hub with nothing to serialise on a record the LFI is still permitted to send without one.\n\nBeing present is not on its own sufficient. The value MUST be a human-readable description by which the customer can recognise the entry. Where the LFI's core banking system holds no stored narrative for a transaction, the LFI MUST derive one from the data it does hold — the merchant name, the counterparty, or the transaction type. Whitespace-only values and non-informative placeholders such as `N/A`, `-`, or `Unknown` do not satisfy the requirement, and an empty string is rejected by the schema in any case.\n\nThe Ozone Connect field is also bounded to match: it gains `minLength: 1` and `maxLength: 500`, the constraints the TPP-facing schema has carried since v2.1. Without them an LFI could return a 600-character narrative that passes its own contract and then fails the Hub's — a failure invisible in the document the LFI builds against.\n\nThis is a change every LFI must act on. An LFI built against v2.1 that returns transactions without a narrative — or without one for a subset of transaction types, which is the more common case — will have those responses rejected under v2.2. TPPs need take no action, but may stop handling the field as absent once their LFIs are on v2.2.\n\nBoth specifications carry the requirement in their v2.2 release in the api-specs repository, which is what the endpoint pages below render.",
    docsPaths: [
      {
        label: "TPP specification",
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`
      },
      {
        label: "Ozone Connect specification",
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`
      }
    ],
    audience: "Both",
    areas: ["Data Sharing", "Transactions", "Ozone Connect"],
    specs: [
      "uae-account-information-openapi",
      "uae-ozone-connect-bank-data-sharing-openapi"
    ],
    endpoints: [
      {
        label: "GET /accounts/{AccountId}/transactions (TPP)",
        path: `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`
      },
      {
        label: "GET /accounts/{AccountId}/transactions (Ozone Connect)",
        path: `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`
      }
    ],
    affectedPaths: [
      `${TPP}/banking/data-sharing/`,
      `${TPP}/banking/data-sharing/open-api/accounts-AccountId-transactions`,
      `${LFI}/banking/data-sharing/`,
      `${LFI}/banking/data-sharing/requirements`,
      `${LFI}/banking/data-sharing/open-api/accounts-AccountId-transactions`
    ]
  },
  {
    changeId: "v2.1-to-v2.2",
    fromVersion: "v2.1",
    toVersion: "v2.2-rc1",
    number: 6,
    category: "Behaviour change",
    title: "Confirmation of Payee — the LFI sees only the IBAN, and answers with a name",
    summary: "The Ozone Connect CoP request carries the IBAN alone, and the response carries the account holder's name directly. The submitted name, the `verifiedClaims` / `verification` identity-assurance envelope, and the wider customer data it wrapped are all removed from the operation.",
    description: "Confirmation of Payee asks one question: does this name belong to this IBAN? The API Hub answers it. The LFI's only job is to say who holds the account — so in v2.2 the operation is reduced to that on both sides.\n\n**The request loses the name.** `data.account` now carries `schemeName` and `identification` only. The name the TPP submitted was never the LFI's to act on: the LFI looks the account up by IBAN and returns the holders it has, and the API Hub compares. Sending it invited exactly the matching this operation forbids, and it disclosed a payee's name to an institution that has no use for it on a call made without a consent. The `PersonName` and `BusinessName` schemas are removed with it.\n\n**The response loses the envelope.** In v2.1 the LFI answers through a four-level structure borrowed from OpenID Connect for Identity Assurance — `data[]` → `verifiedClaims[]` → `verification{…}` → `claims{…}` — of which only the innermost name is read. The two middle levels are removed: each entry in `data` carries `name` directly, either a `CbuaeCopPersonName` (`fullName` required) or a `CbuaeCopBusinessName` (`businessName` required).\n\nThe `verification` subtree goes with it — trust framework, assurance level, assurance process and evidence metadata are no longer part of this operation. Every LFI builds that structure today and the API Hub does not read it.\n\nSo does the wider customer data. The v2.1 `ConfirmationOfPayeePersonClaims` schema carries 23 fields, among them `salary`, `employerName`, `maritalStatus`, `residentialAddress`, `emiratesId`, `birthDate` and `nationality`. None of it is needed to compare two names, and Confirmation of Payee runs **without a consent**. The optional `number` field is dropped for the same reason. `id` is retained: it is pseudonymous by definition and is the only handle for investigating a disputed result.\n\nStructured name fields are retained as **optional** members, so the Hub's matching algorithm can be improved without a second breaking change to this contract. A person name may carry `firstName`, `middleName`, `lastName`, `fullNameAr` (the name in Arabic script) and `alsoKnownAs`; a business name may carry `businessNameAr` and `alsoKnownAs`. Only `fullName` and `businessName` are matched today, and a response carrying nothing but `fullName` is fully conformant.\n\nThe response also settles a naming inconsistency: v2.1 used `fullName`/`givenName`/`familyName` here and `fullName`/`firstName`/`lastName` on the request. v2.2 settles on `firstName`/`lastName`. `givenName` and `familyName` were in any case already documented as withdrawn — the v2.1 schema records that implementing them was \"removed as of v1.2.1\".\n\nThree semantics that were previously implicit are now stated in the specification rather than only in the guide. The LFI performs no matching, and MUST NOT filter, rank or omit holders on any basis — the API Hub owns the rules. A joint account MUST return one entry per holder, and the API Hub evaluates every entry in `data` rather than stopping at the first. Not found is `200` with an empty `data` array, never `204`, `404`, `201` or `202`; account-not-found, account-barred and customer-opted-out are deliberately indistinguishable so a CoP query cannot be used to probe for the existence of an account.\n\nRemoving the submitted name also resolves a v2.1 limitation. Claim-block selection previously followed the TPP's request type rather than the data the LFI holds, so a business name submitted against an account held as a personal name was answered as a protocol error rather than as a no-match. With no name in the request there is nothing to select on: the LFI returns what it holds, and the Hub decides.\n\nThis is a breaking change and requires action from every LFI. It is confined to the two bodies of this one operation — headers, query parameters, status codes and error codes are unchanged, so the work is a rewrite of the request parser and response builder rather than a new integration. The TPP-facing `/confirmation` and `/discovery` endpoints do not move: the TPP still submits a name, and the API Hub normalises between the two surfaces.\n\nThe reshaped schemas are published in the v2.2 release of the Ozone Connect Bank Data Sharing specification in the api-specs repository, which is what the endpoint page below renders.",
    docsPaths: [
      { label: "Full specification", path: `${COP}/api-guide` },
      { label: "OpenAPI reference", path: `${COP}/open-api/cop-query` }
    ],
    audience: "LFI",
    areas: ["Confirmation of Payee", "Ozone Connect", "Payments"],
    specs: ["uae-ozone-connect-bank-data-sharing-openapi"],
    endpoints: [
      {
        label: "POST /customers/action/cop-query",
        path: `${COP}/open-api/cop-query`
      }
    ],
    affectedPaths: [
      `${COP}/`,
      `${COP}/api-guide`,
      `${COP}/requirements`,
      `${COP}/open-api/cop-query`
    ]
  }
];
function specBasename(specPath) {
  const file = specPath.split("/").pop() ?? "";
  return file.replace(/\.ya?ml$/i, "");
}
function specUrl(specName, version) {
  const matches = allEndpoints.filter(
    (e) => e.version === version && specBasename(e.redoc.spec) === specName
  );
  const first = matches[0];
  if (!first) return null;
  const sections = new Set(matches.map((e) => e.sectionSlug));
  return sections.size === 1 ? sectionUrl(first.surface, version, first.sectionSlug) : surfaceUrl(first.surface, version);
}
function anchorFor(change) {
  return `${change.changeId}-change-${change.number}`;
}
function changesFor(toVersion) {
  return VERSION_CHANGES.filter((c) => c.toVersion === toVersion).sort((a, b) => a.number - b.number);
}
const changelogVersions = [
  ...new Set(VERSION_CHANGES.map((c) => c.toVersion))
].sort();
export {
  VERSION_CHANGES as V,
  changesFor as a,
  anchorFor as b,
  changelogVersions as c,
  specUrl as s
};

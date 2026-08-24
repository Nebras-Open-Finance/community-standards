import { defineComponent, ref, computed, onMounted, watch, nextTick, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const SEARCH_DATA = [
  {
    "title": "API Specifications",
    "path": "/tech/api-specs/",
    "category": "API Specs",
    "section": "Reference",
    "description": "Source of truth · OpenAPI 3.x API Specifications The official UAE Open Finance OpenAPI specifications are maintained in a single repository. The OpenAPI YAML files are the source…",
    "headings": [
      "API Specifications",
      "Nebras-Open-Finance / api-specs",
      "Sections",
      "How the repository works",
      "Viewing the specifications",
      "Versioning & errata",
      "Governance folders"
    ],
    "body": "Source of truth · OpenAPI 3.x API Specifications The official UAE Open Finance OpenAPI specifications are maintained in a single repository. The OpenAPI YAML files are the source of truth for every API in the ecosystem — where a guide or this site disagrees with a spec, the spec wins. GitHub repository Nebras-Open-Finance / api-specs The canonical OpenAPI repository. All specs on this site are fetched from its dist/ directory at build time — no YAML is committed here. main Live source of truth — published, authoritative, externally consumable. New implementers should work from the latest version on main . other branches Drafts of future content (for example a forthcoming v2.2 ). The Nebras Open Finance team will announce when draft content is ready for ecosystem review. Open on GitHub ↗ Specifications by audience Sections Specifications are organised by the audience that consumes them. The current version across the TPP, API Hub, and Ozone Connect categories is ; the Trust Framework directory follows its own release cycle. → Audience: Browse specs → Reference How the repository works Viewing the specifications The pages under each section render every spec inline. To view a spec directly from the repository, Redocly gives a clean, navigable rendering of any YAML file — paste its raw GitHub URL into the Redocly viewer. Versioning & errata Specifications follow a vMAJOR.MINOR scheme. The same logical release spans all three categories — dist/api-hub/ .x/ , dist/ozone-connect/ .x/ , and dist/standards/ / . Errata releases (for example dist/standards/ -errata1/ ) contain targeted corrections; where an errata folder exists, the files inside it supersede the corresponding base version . Governance folders The repository's supporting/ directory holds material alongside the specs: breaking-changes/ records breaking changes knowingly accepted within an errata (enforced by an oasdiff test), and future-updates/ is a forward-looking design backlog for the next major version. Watch for updates Implementers are encouraged to watch the repository on GitHub to stay informed of new versions and changes as the specification evolves."
  },
  {
    "title": "Obtain an Access Token",
    "path": "/tech/api-specs/trust-framework/token",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Obtain an Access Token",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all API Families",
    "path": "/tech/api-specs/trust-framework/api-families",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Retrieve all API Families",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all API Resources for an Authorisation Server",
    "path": "/tech/api-specs/trust-framework/api-resources",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Retrieve all API Resources for an Authorisation Server",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Authorisation Servers for an Organisation",
    "path": "/tech/api-specs/trust-framework/auth-servers",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Retrieve all Authorisation Servers for an Organisation",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Available Open Finance Servers and API Resources",
    "path": "/tech/api-specs/trust-framework/participants",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Retrieve all Available Open Finance Servers and API Resources",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Contacts for an Organisation",
    "path": "/tech/api-specs/trust-framework/contacts",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Retrieve all Contacts for an Organisation",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Organisations",
    "path": "/tech/api-specs/trust-framework/organisations",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Retrieve all Organisations",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Software Statements for an Organisation",
    "path": "/tech/api-specs/trust-framework/software-statements",
    "category": "API Specs",
    "section": "Reference",
    "description": "Reference — Retrieve all Software Statements for an Organisation",
    "headings": [],
    "body": ""
  },
  {
    "title": "Metrics",
    "path": "/metrics",
    "category": "Dashboard",
    "section": "Metrics",
    "description": "Metrics — Metrics",
    "headings": [],
    "body": ""
  },
  {
    "title": "Home",
    "path": "/",
    "category": "General",
    "section": "Pages",
    "description": "The UAE Open Finance Community Building open finance, together. Insights, tools, and live ecosystem data for everyone building on — and powering — the UAE’s Open Finance…",
    "headings": [
      "Building open finance, together.",
      "The story, in numbers.",
      "Developer documentation.",
      "The programme.",
      "Open section → 04 Community & contributions. This site is community-driven and open source — built by the LFIs, TPPs, and Hub operator working within the ecosystem. Every contribution makes the framework more legible for everyone. github · nebras-open-finance Contribute to docs & standards",
      "What’s next…",
      "How to participate",
      "Articles & press."
    ],
    "body": "The UAE Open Finance Community Building open finance, together. Insights, tools, and live ecosystem data for everyone building on — and powering — the UAE’s Open Finance framework. Community-driven and open source. Not official. Open Finance Standards LFI Integration Guide Search Docs Live Ecosystem · Updated 01 The story, in numbers. Key metrics tracking adoption and expansion of the CBUAE Open Finance framework. Every call, every payment, every consent — counted and open. Visit the metrics dashboard for the full picture. Explore all metrics → 02 Developer documentation. Technical documentation for every participant — whether you’re building on top of Open Finance or powering it . 0 → View full docs → OpenAPI YAML specs Browse the full API specifications Every endpoint, schema, and example — the OpenAPI specs that define UAE Open Finance. View API specs → 03 The programme. Everything beyond the specs — how to get help, what it costs, the policies you operate under, and who’s already live in the ecosystem. Open section → 04 Community & contributions. This site is community-driven and open source — built by the LFIs, TPPs, and Hub operator working within the ecosystem. Every contribution makes the framework more legible for everyone. github · nebras-open-finance Contribute to docs & standards View on GitHub → drafting What’s next… 0 get involved How to participate 0 First time here? Not sure how to get started? No worries — just ask. Email and we’ll point you in the right direction. Email us → 05 Articles & press. Coverage of AlTareq across the region’s financial press, and from the ecosystem participants themselves. All articles →"
  },
  {
    "title": "OFP-001 · Bulk/Batch payment schema (draft)",
    "path": "/proposals/ofp-001/schema",
    "category": "General",
    "section": "Pages",
    "description": "← Back to OFP-001 Download .yaml",
    "headings": [],
    "body": "← Back to OFP-001 Download .yaml"
  },
  {
    "title": "OFP-001 · PAR File Payment consent (draft)",
    "path": "/proposals/ofp-001/par-schema",
    "category": "General",
    "section": "Pages",
    "description": "← Back to OFP-001 Download .yaml",
    "headings": [],
    "body": "← Back to OFP-001 Download .yaml"
  },
  {
    "title": "OFP-001 · Replace file-based Bulk/Batch Payments with a JSON array",
    "path": "/proposals/ofp-001/",
    "category": "General",
    "section": "Pages",
    "description": "← All proposals Replace file-based Bulk/Batch Payments with a JSON array Deprecate the unused file-upload model for Bulk/Batch Payments and carry the individual payments as a JSON…",
    "headings": [
      "Replace file-based Bulk/Batch Payments with a JSON array",
      "A file model nobody has built",
      "Carry the payments as a JSON array",
      "What changes in the spec",
      "The array model, written out",
      "par-file-payment-schema.yaml",
      "bulk-payment-schema.yaml",
      "What moving to JSON removes",
      "What moving to JSON costs"
    ],
    "body": "← All proposals Replace file-based Bulk/Batch Payments with a JSON array Deprecate the unused file-upload model for Bulk/Batch Payments and carry the individual payments as a JSON array in a single signed request. Proposed by Author Target version Opened Closes Decision The voting period has ended. The votes cast are shown below. Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Voting not yet open Voting opens The proposal 01 · Background A file model nobody has built File-based Bulk/Batch Payments — referred to in the standard as File Payments — have been part of the specification since v1.2. They are defined as a file upload model: a TPP uploads a payment file in an LFI-specific format to POST /payment-consents/{ConsentId}/file , declares its FileType , FileHash , NumberOfTransactions and ControlSum on the consent, then creates the batch with POST /file-payments . The execution report is returned as a file as well. In practice, no LFI in the ecosystem has implemented these endpoints. There is not a single live File Payment integration — which means there is nothing to migrate, and the model can be revised at effectively zero cost before banks begin building file-parsing and malware-scanning pipelines to support it. Beyond being unbuilt, the file model is under-specified: an LFI could not implement it today without a round of clarifications. A few examples — not an exhaustive list — are below: The file holds PII, but the specification defines no encryption element to protect it. The specification does not cover how uploaded files are scanned. It does not define the required file structures, which file types must be supported, or how a TPP discovers which file types each LFI accepts. 02 · Recommendation Carry the payments as a JSON array Deprecate the file-upload mechanism and carry the payments inline instead. The Bulk/Batch create request — POST /file-payments today — would carry the individual payments as a JSON array in a single signed request , one array element per transaction, in place of a reference to an uploaded file. (Whether the endpoint and schemas keep the file-payments name is an open question for the ecosystem — see the asks below.) Each element of Instructions[] is assembled from the single-payment fields the standard already defines (amount, creditor account, references). The request is signed end-to-end exactly like POST /payments , so the same validation, signing, and idempotency rules apply to a batch as to a single payment. The NumberOfTransactions and ControlSum integrity checks are retained — now computed over the array rather than a file. A TPP can still collect a file from the customer — for example, an Excel sheet of ten payments. The difference is where it is converted: the TPP maps that file into the JSON array per its own specification and passes the result to the LFI, who processes the payments from the array. There is little customer impact — the same file is still the customer’s starting point. What moves is the conversion: the TPP turns the file into JSON-format payments rather than the LFI parsing the file itself. 03 · Technical changes What changes in the spec Three concrete changes — to the consent, the authorization experience, and the payment-creation request. 01 · Consent (PAR) — File Payment object Remove FileType , FileHash , and FileReference — there is no file to type, hash, or reference. Add Description : the reason the LFI shows the customer at authorization (for example, “Payroll June 2026” ). NumberOfTransactions , ControlSum , and RequestedExecutionDate stay — the LFI validates the JSON array’s count and total against NumberOfTransactions and ControlSum . 02 · Authorization page The authorization page no longer renders an uploaded file. It shows the standard confirm-payment details, with Description as the stated reason. The c"
  },
  {
    "title": "OFP-003 · Define an allowed character set for Debtor and Creditor References",
    "path": "/proposals/ofp-003/",
    "category": "General",
    "section": "Pages",
    "description": "← All proposals Define an allowed character set for Debtor and Creditor References Keep the payment references free-text, but constrain them to a single agreed character set —…",
    "headings": [
      "Define an allowed character set for Debtor and Creditor References",
      "The references that didn’t fit",
      "Constrain the characters, not the structure",
      "What changes in the spec",
      "What a uniform character set buys",
      "What it costs"
    ],
    "body": "← All proposals Define an allowed character set for Debtor and Creditor References Keep the payment references free-text, but constrain them to a single agreed character set — uniform across the ecosystem — so every LFI knows exactly which characters it must accept and store. Proposed by Author Target version Opened Closes Decision The voting period has ended. The votes cast are shown below. Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Voting not yet open Voting opens The proposal 01 · Background The references that didn’t fit Every payment instruction carries two free-form notes — a Debtor Reference and a Creditor Reference — that travel with the payment to support reconciliation and to give the customer something recognisable against the transaction. In v1.2 and v2.0 these were not free text at all: they were defined by a tightly prescribed regular expression ( AEStructuredDebtorReference / AEStructuredCreditorReference ) that required a fixed machine prefix — the TPP’s Trust Framework ID, the account BIC, and, for merchant payments, a merchant identifier — with the human-readable text appended at the end , up to a combined 120 characters. That shape did not meet the needs of TPPs. The part a customer actually reads — the free-text reference — sat behind roughly 50–60 characters of identifiers. LFI core banking systems carry a narrower reference field than 120 characters and truncate from the right, so the machine prefix survived intact while the meaningful free text was clipped or lost entirely. The rigid pattern also rejected legitimate references outright, leaving TPPs no room to pass the information their use case required. In version 2.1 we relaxed the schema : the Debtor and Creditor References became a plain free-text string ( minLength 1 , maxLength 35 , no enforced pattern), so the text the customer relies on comes first and is no longer squeezed behind a fixed prefix. Alongside that, we moved the structuring guidance out of the schema and into a business rule — CRG-5.3 — that TPPs SHOULD follow where a payments use case does not dictate otherwise, putting the free-text reference first and the bank / merchant / TPP names after it, within the 35-character budget. Structure became a recommended convention, not a validation gate. Since that change, LFIs have asked that the references not be left completely open to any character . Relaxing the structural pattern was right — but with no validation at all, an LFI cannot know in advance which characters it will be handed, and each institution is left to guess what its own systems can accept and store. The ask is for a defined set of permitted characters: not as prescriptive as the old structured pattern, but a single, uniform character-set validation applied consistently across the entire Open Finance ecosystem, so that every LFI knows exactly what it must accept and every TPP knows exactly what it may send. 02 · Recommendation Constrain the characters, not the structure Keep the references free-text and 35 characters long, but reintroduce a single pattern that validates the characters , not the structure . The pattern defines an allowed character set — nothing about where the bank name or TPP name must sit. That ordering stays a recommendation in the TPP standards (linked below), not a validation rule. We propose a set in two groups : a conservative Latin baseline — the ISO 20022 / SWIFT “x” set (Latin letters, digits, space, and / - ? : ( ) . , ’ + ) that LFI cores, the SWIFT-heritage UAEFTS rail, and ISO 20022 AANI all store reliably — plus the Arabic block ( U+0600–U+06FF ), so a customer can write a genuinely Arabic reference, names included. As one regular expression, with length still capped at 35: ^[A-Za-z0-9 /?:().,'+\\\\u0600-\\\\u06FF-]+$ The Arabic block covers Arabic letters, Arabic-Indic digits (٠–٩) and Ar"
  },
  {
    "title": "OFP-004 · Enforce a minimum ExpirationDateTime for consents",
    "path": "/proposals/ofp-004/",
    "category": "General",
    "section": "Pages",
    "description": "← All proposals Enforce a minimum ExpirationDateTime for consents A consent can be created today that expires in seconds — long before the customer can be redirected to the LFI,…",
    "headings": [
      "Enforce a minimum ExpirationDateTime for consents",
      "A consent that expires before it can be used",
      "A journey-based minimum, set to 15 minutes",
      "The same floor applies to multi-authorisation payments",
      "What changes in the spec",
      "What a journey-based minimum buys",
      "What it costs"
    ],
    "body": "← All proposals Enforce a minimum ExpirationDateTime for consents A consent can be created today that expires in seconds — long before the customer can be redirected to the LFI, authenticate, and authorise it. Add a minimum ExpirationDateTime at consent creation so a consent is never born already doomed to expire mid-journey. Proposed by Author Target version Opened Closes Decision The voting period has ended. The votes cast are shown below. Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Voting not yet open Voting opens The proposal 01 · Background A consent that expires before it can be used Every consent — whatever its type — carries an ExpirationDateTime , the AEPushedAuthorizationRequests.AEConsentExpirationDateTime field set by the TPP in the consent request, that fixes the date and time the consent will expire. Today the API Hub applies a single rule to it at consent creation: it must be in the future. There is no minimum. A past value is rejected; everything else is accepted. The behaviour described here is the same for all consent types ; the figures below were measured on the Model Bank sandbox, and the lifecycle and validation they reveal are shared across every type. We tested this directly against the Model Bank sandbox. A consent set to expire 30 seconds in the future is accepted just as readily as one a year out: Observed — PAR acceptance by ExpirationDateTime That is the problem. Authorising a consent is not instant: the customer is redirected to the LFI, authenticates, reviews and approves the consent, is redirected back, and only then does the TPP exchange the code for a token and make its first call. That journey takes minutes . A consent whose ExpirationDateTime falls inside that window is dead on arrival — it lapses before anyone can finish using it. A one-second expiry is not a hypothetical: the platform accepts it. (Separately, the API Hub cleans up consents that are never authorised. That is independent of the ExpirationDateTime the TPP sets, and this proposal is solely about that value — the consent’s usable lifetime.) 02 · Recommendation A journey-based minimum, set to 15 minutes Reject, at consent creation, any ExpirationDateTime less than 15 minutes in the future. The check sits alongside the two bounds already in place — “must be in the future” and the one-year maximum — and fails with the same kind of request-validation 400 a past value gets today. Fifteen minutes is comfortably longer than the authorisation journey (redirect, customer authentication, approval, return, token exchange, and a first call), while still short enough that a TPP can keep a single-use consent tight. The minimum is anchored to the journey — the time a customer needs to be redirected, authenticate, approve, and return — which is a stable, real-world constraint. Fifteen minutes clears it comfortably while still letting a TPP keep a single-use consent tight. This proposal changes validation only. It does not touch the consent status model or how the API Hub cleans up consents that are never authorised. A TPP sets ExpirationDateTime in the consent request for every type; the Data Sharing API guide shows one example. 03 · Authorisation expiration The same floor applies to multi-authorisation payments One consent type carries a second expiry. When a TPP creates a Bank Service Initiation (payment) consent and sets IsSingleAuthorization to false , it also sets AuthorizationExpirationDateTime in the Rich Authorization Request — the AEBankServiceInitiationRichAuthorizationRequests.AuthorizationExpirationDateTime field — being the date and time by which every remaining authoriser must have acted for the consent to reach Authorized . This field exists only for payments : the ExpirationDateTime above is carried by every consent type, but this second deadline is specific to multi-aut"
  },
  {
    "title": "OFP-006 · Carry the requested API version into the Ozone Connect path",
    "path": "/proposals/ofp-006",
    "category": "General",
    "section": "Pages",
    "description": "← All proposals Carry the requested API version into the Ozone Connect path An LFI dual-running two versions can only tell them apart by parsing the o3-api-uri header, because the…",
    "headings": [
      "Carry the requested API version into the Ozone Connect path",
      "The forwarded path looks the same whatever version was asked for",
      "A ${VERSION} token in the configured path",
      "What the token means, precisely",
      "What changes",
      "This only goes ahead if the ecosystem would genuinely use it",
      "What the token buys",
      "What it costs"
    ],
    "body": "← All proposals Carry the requested API version into the Ozone Connect path An LFI dual-running two versions can only tell them apart by parsing the o3-api-uri header, because the base path the API Hub prepends is a static string. Let the LFI place a ${VERSION} token in that path and have the API Hub substitute the version the TPP actually requested. Proposed by Author Target Opened Closes Decision The voting period has ended. The votes cast are shown below. Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Because this change carries a real engineering cost, the two questions on the form matter as much as the vote itself. Voting not yet open Voting opens The proposal 01 · Background The forwarded path looks the same whatever version was asked for When a TPP calls the API Hub, the Hub validates the token and consent, enforces the OpenAPI schema, enriches the request, and then forwards it to the LFI's Ozone Connect Base URL . Between that base URL and the endpoint, the Hub inserts an optional API family base path the LFI configures per environment during environment-specific onboarding — one field each for Data Sharing, Service Initiation, Products, Consent Events, and Health Check — so an LFI can route different API families to different paths on the same server. That configured path is a static string . It is prepended verbatim to every request in that family, whatever version the TPP asked for. The TPP, meanwhile, carries the version as a segment of the request URL — v2.1 in /open-finance/account-information/v2.1/parties . The API Hub knows which version was requested; it is what the Hub routed and schema-validated on. But by the time the request reaches the LFI, the only place that fact survives is the o3-api-uri header, which carries the parameterised URL the TPP called: Today — the version reaches the LFI only in a header So an LFI wanting to serve two concurrent versions from one Ozone Connect deployment has to parse the version out of o3-api-uri and branch on it — a routing decision taken inside the application, on a header, rather than at the edge where routing normally happens. The alternative is to duplicate configuration or stand up bespoke routing in front of the backend. This is not a hypothetical requirement. The Major Version Deprecation Policy requires an LFI going live with a new major version to run the prior and new versions concurrently for the whole deprecation window — up to a 17-month transition envelope — routing each TPP request to the correct implementation, and keeping the two independently maintained with no cross-version dependencies. Every LFI will face this at every major version transition. Today the policy itself notes the routing signal is “currently via the o3-api-uri header”, because that is all there is. 02 · Recommendation A ${VERSION} token in the configured path Allow an LFI to include a substitution token — ${VERSION} — in the API family base path it configures for an environment. At proxy time, the API Hub replaces the token with the version the TPP requested, parsed from the request URL path, before forwarding to Ozone Connect. Proposed — the same configured path serves both versions The version then appears in the URL , which is where gateways, load balancers, service meshes, and reverse proxies already route. An LFI can point /data-sharing/v2.0 and /data-sharing/v2.1 at two independent deployments using infrastructure it already runs, rather than reading a header in application code to decide where a request goes. This is deliberately opt-in and non-breaking . The token is something an LFI chooses to put in a field it already fills in. A configured path with no ${VERSION} in it behaves exactly as it does today — byte for byte — so no existing LFI is affected unless it decides to adopt this. Because the base path is already per API "
  },
  {
    "title": "OFP-007 · Show an LFI its own API Hub configuration in the Admin Portal",
    "path": "/proposals/ofp-007/",
    "category": "General",
    "section": "Pages",
    "description": "← All proposals Show an LFI its own API Hub configuration in the Admin Portal An LFI's Ozone Connect Base URL, Authorization Endpoint, application layer authentication method, and…",
    "headings": [
      "Show an LFI its own API Hub configuration in the Admin Portal",
      "Knowable in principle, scattered across tickets in practice",
      "A Configuration section in the Admin Portal",
      "Connectivity and authentication, for this hub and this environment",
      "Seeing and changing are different proposals",
      "What changes",
      "What the view buys",
      "What it costs"
    ],
    "body": "← All proposals Show an LFI its own API Hub configuration in the Admin Portal An LFI's Ozone Connect Base URL, Authorization Endpoint, application layer authentication method, and API family base paths are spread across an onboarding ticket and every later ticket that changed one of them. Nothing holds the current answer in one place. Surface the effective configuration, read-only, in the Admin Portal. Proposed by Author Target Opened Closes Decision The voting period has ended. The votes cast are shown below. Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. The second question on the form — whether you would want to edit any of this configuration yourself — shapes a separate proposal, so please answer it even if you vote against this one. Voting not yet open Voting opens The proposal 01 · Background Knowable in principle, scattered across tickets in practice During environment-specific onboarding , an LFI hands Nebras the details that define how the API Hub reaches its backend: the Ozone Connect Base URL , the Authorization Endpoint , and an optional API family base path for each of Data Sharing, Service Initiation, Products, Consent Events & Notifications, and Health Check. Earlier in onboarding it selects an application layer authentication method — mTLS only, API Key, Client Credentials Grant, or JWT Auth — along with its sub-settings, such as the scopes used for Client Credentials or whether JWT Auth headers are also sent on the LFI's own calls to the Consent Manager and Headless Heimdall. All of it is submitted on a Service Desk ticket . That is the documented process and it works: the ticket is raised, the values are exchanged, connectivity is validated in both directions, and the ticket is closed. None of this is hidden from the LFI. The values are in the tickets, the tickets are searchable, and in principle everything can be recovered from them. The difficulty is that it is never one ticket . Onboarding creates the first record, and everything after it arrives as its own ticket, each raised to change one specific thing — a base path added when Products went live, a corrected path, a moved Authorization Endpoint, a switch from mTLS-only to JWT Auth. Each ticket is a delta , not a statement of the whole. So working out what is configured today is not a lookup. It means finding every ticket that has ever touched the field, putting them in order, replaying them, and being confident none was missed — where missing one gives you a wrong answer that looks exactly like a right one. Then doing it again for the other environment, and again for each brand if the LFI runs more than one hub. Today — reconstructing a value from the ticket history Meanwhile the API Hub holds the answer as a single current value , because that is what it enforces on every proxied request. There is simply no way for the LFI to ask it. The one place an LFI already signs in to look at its own hub — the Admin Portal — shows TPP activation, consents, logs, reports, outages, and the users who hold access. It does not show a single one of the values above. The cost of this is small each time and constant in aggregate. It lands hardest in the places where accuracy matters most: an incident where a forwarded request is 404ing and nobody can confirm the path the Hub is prepending; a suspected drift between pre-production and production that nobody can rule out; a multi-brand LFI running several hubs whose configurations must be told apart from ticket history; a new engineer joining the team with no way to read the current state of the integration they have inherited. 02 · Recommendation A Configuration section in the Admin Portal Add a read-only Configuration section to the Admin Portal that shows the effective onboarding configuration the API Hub actually holds for that instance and environment. Not a copy "
  },
  {
    "title": "OFP-009 · Define validation patterns for the Leads API personal-data fields",
    "path": "/proposals/ofp-009/",
    "category": "General",
    "section": "Pages",
    "description": "← All proposals Define validation patterns for the Leads API personal-data fields Constrain the free-text PII on POST /leads — names, Emirates ID, and address lines — to defined,…",
    "headings": [
      "Define validation patterns for the Leads API personal-data fields",
      "Lead data arrives unvalidated",
      "Reuse the patterns we already have, per field",
      "What changes in the spec",
      "What validating the Leads fields buys",
      "What it costs",
      "What we’re asking the ecosystem"
    ],
    "body": "← All proposals Define validation patterns for the Leads API personal-data fields Constrain the free-text PII on POST /leads — names, Emirates ID, and address lines — to defined, ISO-grounded patterns, reusing the validation the ecosystem already applies elsewhere, so every LFI receives predictable, well-formed lead data. Proposed by Author Target version Opened Closes Decision The voting period has ended. The votes cast are shown below. Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Voting not yet open Voting opens The proposal 01 · Background Lead data arrives unvalidated POST /leads lets a TPP hand an LFI a prospective customer — a name, an Emirates ID, a residential address, and the product categories they are interested in. Unlike a payment, this data is written into the LFI : it is stored, matched against existing records, and used to make contact. What the LFI can do with it depends entirely on it arriving in a shape the LFI can store and reconcile. Today most of those fields carry no validation beyond a length limit. GivenName , LastName , FullName , BusinessName and each AddressLine are free-text strings with no pattern. And EmiratesId — the single most important identifier on the request — is a plain string with no pattern and no length at all : any value is accepted and passed straight through to the LFI. This sits oddly next to the two fields in the same schema that are already validated to a standard: PhoneNumber is constrained to E.164 ( ^\\+[1-9]\\d{1,14}$ ) and Country to the ISO 3166-1 alpha-2 code ( ^[A-Z]{2}$ ). The discipline is already here — it simply has not been extended to the personal-data fields around them. The most important of these has also already been solved elsewhere : the insurance specifications validate an Emirates ID with ^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$ . Yet the same EmiratesId is left unchecked in Account Information, Account Opening, FX, and here in Leads. The ask is to close the gap on the Leads fields by reusing what the ecosystem has already agreed where a pattern exists, and defining a purpose-built one where it does not. 02 · Recommendation Reuse the patterns we already have, per field Add a pattern to each Leads personal-data field, purpose-built for what that field actually holds, and — wherever a validation already exists in the ecosystem — reuse it verbatim . Lengths and field shapes do not change. Emirates ID — adopt the existing insurance-spec pattern. The leading 784 is the ISO 3166-1 numeric country code for the UAE ; the final digit is a checksum (which a regex validates in shape but not in value): ^784-?[0-9]{4}-?[0-9]{7}-?[0-9]{1}$ Names — a tight, Latin-only character set. Person names ( GivenName , LastName , FullName ) allow letters, space, apostrophe, period, and hyphen — enough for “Al-Maktoum”, “O’Brien”, “Mohd.” — but no digits. BusinessName additionally allows digits and business punctuation: person ^[A-Za-z '.\\-]+$ business ^[A-Za-z0-9 &'.,\\-()/]+$ Address lines — the field already cites ISO 20022 PostalAddress27 . Reuse the OFP-003 approved “x” set — the ISO 20022 / SWIFT set of Latin letters, digits, space and / - ? : ( ) . , ' + : ^[A-Za-z0-9 /?:().,'+\\-]+$ The baseline is deliberately Latin-only . OFP-003 originally proposed the Arabic block ( U+0600–U+06FF ) and it was removed on approval , because Arabic cannot be carried end-to-end over SWIFT/UAEFTS and is transliterated to Latin before submission. Whether that reasoning should hold for stored lead PII — names and addresses that never touch the rails — is a genuine question, and is put to the ecosystem below rather than assumed here. As in OFP-003, length is counted in Unicode characters, the API Hub normalises to Unicode NFC before validating, and validation is enforced centrally at the API Hub so a malformed lead is rejected before it reaches the "
  },
  {
    "title": "OFP-010 · Make the transaction narrative (TransactionInformation) a required field",
    "path": "/proposals/ofp-010/",
    "category": "General",
    "section": "Pages",
    "description": "← All proposals Make the transaction narrative a required field Add TransactionInformation — the transaction narrative — to the required list on every transaction the data-sharing…",
    "headings": [
      "Make the transaction narrative a required field",
      "The narrative is the value — and it is optional",
      "Require it on the transaction object",
      "What changes in the spec",
      "What requiring the narrative buys",
      "What it costs",
      "What we’re asking the ecosystem"
    ],
    "body": "← All proposals Make the transaction narrative a required field Add TransactionInformation — the transaction narrative — to the required list on every transaction the data-sharing API returns. The narrative is what powers categorisation, affordability, and underwriting; without it the dataset is close to meaningless. This codifies what Nebras already enforces for CASA, and asks the ecosystem whether it is achievable for every product. Proposed by Author Target version Opened Closes Decision The voting period has ended. The votes cast are shown below. Sign in with the Trust Framework to vote — For, Against, or Abstain — recorded in the open with your reasoning. Your organisation and name come from your directory profile, and each person may vote once. Voting not yet open Voting opens The proposal 01 · Background The narrative is the value — and it is optional A transaction returned from GET /accounts/{AccountId}/transactions carries the structured essentials — an amount, a date, a credit/debit indicator, and a type. What tells a TPP what the transaction was actually for is the narrative: the free-text TransactionInformation field. It is an important input to many Open Finance use cases, including categorisation , affordability assessment , and underwriting . Strip it out and a statement collapses into a column of amounts a TPP cannot reason about. Yet in the specification the field is defined but not required . In the TPP Standards spec, TransactionInformation is a string of 1–500 characters described as “the transaction narrative, which is unstructured text”, but it does not appear in the AETransaction required list. The picture is the same on the LFI side: the Ozone Connect transactionInformation field is optional on CbuaeTransaction too. An LFI can therefore return a schema-valid transactions response with no narrative at all. In practice Nebras has not accepted that. Where an LFI’s CASA transaction data has arrived without narratives, it has been treated as a functional-certification failure and a remediation plan has been required before sign-off — because a dataset without the narrative is not a functioning dataset. This proposal asks that we stop enforcing that case by case and write it into the standard . The complication is scope. The remediation practice grew up around CASA — current and savings accounts, where a narrative is dependable. But the transactions endpoint is a single shared schema used for every product: credit cards, personal finance, mortgages, and SME / corporate accounts all report through it. We have not scrutinised the narrative for those products the way we have for CASA. Making the field technically required turns it on for all of them at once — so the honest question this proposal puts to the ecosystem is whether every LFI can actually supply it, for every product. 02 · Recommendation Require it on the transaction object Add TransactionInformation to the required list of the transaction object, on both sides of the Hub: AETransaction in the TPP Standards spec and transactionInformation on CbuaeTransaction in the Ozone Connect spec. The field already exists and is already sized — this is a one-line addition to a required array, not a new field or a shape change. Field bounds (1–500 characters) do not move. Because the LFI is the producer of this data, the obligation binds the LFI. It is asserted primarily at functional certification — exactly where Nebras already asserts it for CASA — so that a narrative-less transactions response fails sign-off before production rather than being remediated ad hoc afterwards. Writing it into the schema makes the rule published and testable instead of discretionary. The proposal deliberately recommends the uniform change — required across every product — because that is what a schema-level requirement means, and because a consistent narrative across LFIs is what makes the data comparable. But it does not assume every product can meet it. Whether that is achievable "
  },
  {
    "title": "Proposals & Voting",
    "path": "/proposals/",
    "category": "General",
    "section": "Pages",
    "description": "Community · Decided together Proposals & Voting open Nebras puts changes to the standards up for a vote. Cast a single vote — For , Against , or Abstain — and add your reasoning,…",
    "headings": [
      "Proposals & Voting open",
      "Proposals"
    ],
    "body": "Community · Decided together Proposals & Voting open Nebras puts changes to the standards up for a vote. Cast a single vote — For , Against , or Abstain — and add your reasoning, recorded in the open so every decision can be understood later. Idea? Raise a proposal via the Service Desk → Open votes Proposals Scan every proposal and see how its vote is trending, then open any one to read the idea and cast your vote. Open for voting Draft Closed ID Proposal Target version How it's going Closes No proposals in this view."
  },
  {
    "title": "Account Permissions in a Payment Consent",
    "path": "/knowledge-base/articles/payment-account-permissions",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": `same access token issued for the payment — without creating a separate Bank Data Sharing consent." > During a payment flow the TPP typically needs to: Display the payer's debit…`,
    "headings": [
      "GET /accounts — requires ReadAccountsBasic",
      "GET /accounts/{AccountId} — requires ReadAccountsDetail",
      "GET /accounts/{AccountId}/balances — requires ReadBalances"
    ],
    "body": `same access token issued for the payment — without creating a separate Bank Data Sharing consent." > During a payment flow the TPP typically needs to: Display the payer's debit account — the user should be able to confirm which account they are paying from before authorizing. Show the available balance — helps the user check they have sufficient funds before approving the payment. Pre-fill the debit account — some UX patterns let the user pick an account; ReadAccountsBasic provides the list. Without these permissions the TPP only receives a payment access token that is scoped to initiate and track the payment — it cannot call any account endpoints. small subset of the full set available in a Bank Data Sharing consent." tone="surface" > Permission Endpoint unlocked What it returns ReadAccountsBasic GET /accounts List of accounts with basic metadata (account type, currency, nickname). Does not include the full account number or IBAN. ReadAccountsDetail GET /accounts/{AccountId} Full account record including the IBAN/account identification. Requires ReadAccountsBasic to first retrieve an AccountId . ReadBalances GET /accounts/{AccountId}/balances Current balance for a specific account (available balance, credit/debit indicator, and currency). ReadRefundAccount is a fourth permission on a payment consent. It unlocks GET /payment-consents/{ConsentId}/refund and is used to retrieve account details for routing a refund — it is not an account-reading permission in the same sense. Including any of the three permissions above changes the required scope in the /par Request JWT. Consent includes Scope in Request JWT Payment only (no account permissions) payments openid Payment with ReadAccountsBasic , ReadAccountsDetail , or ReadBalances accounts payments openid If account-reading permissions are present in authorization_details but accounts is omitted from the scope , the API Hub will reject the /par request. Add the Permissions array to authorization_details.consent in your /par request alongside the payment fields: And update the scope in your Request JWT: GET /accounts — requires ReadAccountsBasic GET /accounts/{AccountId} — requires ReadAccountsDetail GET /accounts/{AccountId}/balances — requires ReadBalances These permissions follow the same permission model as Bank Data Sharing but are scoped to the payment context: Access expires when the payment consent expires . Access is limited to the accounts the user authorized at the LFI. Only these three account endpoints are available — no transactions, beneficiaries, statements, or other sub-resources. If you need access to the full range of account data, create a separate Bank Data Sharing consent.`
  },
  {
    "title": "Base Consent ID (consentGroupId) – How to Link Consents",
    "path": "/knowledge-base/articles/base-consent-id",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "Base Consent ID ( consentGroupId ) is a persistent reference that links related consents within a TPP's service. It allows a common identifier to persist across multiple consents…",
    "headings": [
      "Consent continuation",
      "Consent re-establishment after revocation",
      "Consent update (permission expansion)",
      "User identity consistency"
    ],
    "body": `Base Consent ID ( consentGroupId ) is a persistent reference that links related consents within a TPP's service. It allows a common identifier to persist across multiple consents that belong to the same logical group — initiated by the same user, for the same service. Used to enable a coherent presentation of consent within Consent Management Interfaces (CMIs)." > Consent continuation When a user's consent has expired (i.e. the ExpirationDateTime is in the past), but the user wishes to continue using the TPP's service, the TPP must create a new consent (with a new consentId ) for the same permissions. To maintain continuity, the TPP should set the original ConsentId as the BaseConsentId for the new consent. If the original consent already had a BaseConsentId , the TPP must reuse that same BaseConsentId , not the immediate prior ConsentId . This ensures the entire chain of consents is consistently linked. Consent re-establishment after revocation If a user revokes consent and later wants to re-establish access to the TPP's services, the TPP should create a new consent with the same permissions. As with consent continuation, the TPP should reference the original ConsentId as the BaseConsentId — or, if applicable, reuse the existing BaseConsentId — to maintain the logical association. Consent update (permission expansion) Suppose a user originally grants consent with specific permissions (e.g. ReadAccountsBasic , ReadAccountsDetail , ReadBalances ), and the TPP later introduces new functionality (e.g. access to ReadDirectDebits ). If the user opts in to this expanded scope, the TPP should: Create a new consent with the updated set of permissions Revoke the old consent Link the new consent to the original one by referencing the appropriate BaseConsentId User identity consistency It is assumed that all consents linked via a BaseConsentId are associated with the same end user . Therefore, if during authentication the LFI determines that the userId associated with a newly submitted consent differs from the user who authorised the previous consent in the chain, the LFI should reject the new consent. Scenario Action Consent expired, user continues service Set original ConsentId as BaseConsentId Consent revoked, user re-establishes access Set original ConsentId (or existing BaseConsentId ) as BaseConsentId Permissions expanded Create new consent, revoke old, link via BaseConsentId User identity mismatch detected LFI rejects the new consent Always trace back to the root ConsentId when setting BaseConsentId . Never use the most recent consent in a chain as the BaseConsentId if it already has one — doing so would break the link back to the original consent.`
  },
  {
    "title": "Certificate Rotation — A Best-Practice Guide for LFIs and TPPs",
    "path": "/knowledge-base/articles/certificate-rotation",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "breaks live services if it is missed . This guide explains which certificates are yours to rotate, when to act, and the safe overlap pattern that keeps traffic flowing through the…",
    "headings": [],
    "body": `breaks live services if it is missed . This guide explains which certificates are yours to rotate, when to act, and the safe overlap pattern that keeps traffic flowing through the cutover." > A certificate that reaches its expiry date stops being trusted. An expired transport certificate fails the mTLS handshake; an expired signing certificate makes every JWT you sign unverifiable. In both cases the affected service stops working until a valid certificate is in place. Always complete rotation before the expiry date. Not every certificate that appears under your organisation is yours to manage. The rule is simple: You hold the private key → the certificate is yours to rotate . You generated the key and CSR yourself, so only you can produce a replacement. Nebras holds the private key → Nebras rotates it . Any certificate where Ozone supplied the CSR, or where the key material lives on the API Hub, is rotated by Nebras with no action required from you. From your perspective these certificates appear under your organisation but require no operational involvement. The canonical illustration is the server transport pair described in the Certificate Walkthroughs : S1 (Ozone holds the private key — Nebras rotates it) versus S4 (the LFI holds the private key — the LFI rotates it). The same split applies to every certificate on your organisation. Because who-holds-the-key decides who rotates, make it impossible to get wrong: state the holder in the certificate's description field when you create it. The walkthroughs already follow this convention — e.g. S1 - Ozone holds Private Key - TPP-APIHub and S4 - I hold Private Key - APIHub-OzoneConnect . A glance at the description then tells any operator whether a given certificate is theirs to renew or Nebras's. TPPs hold the private key for all of their application certificates — transport, signing, and (where used) encryption — so a TPP rotates all of them itself. LFIs rotate the certificates they generated (such as S4 and their client transport and signing certificates) and leave the Ozone-held certificates to Nebras. With one exception, every certificate in the Trust Framework expires 13 months after it is issued: Transport, signing, and application encryption certificates — valid for 13 months , then must be rotated. The server encryption key (SERVER ENCKEY) — does not expire , and therefore does not require periodic rotation. You do not have to track expiry dates by hand. The Trust Framework (directory) sends email notifications about upcoming certificate expiry, issued regularly and starting two months before the expiry date. Treat the first reminder as your cue to plan the rotation — it leaves ample time to generate, deploy, and validate the replacement before the deadline. Make sure the email recipients on your organisation are correct and monitored, so these reminders reach the team that owns rotation. See Contacts for managing notification recipients. Rotation is not a single in-place swap — it is a controlled overlap. A new certificate is issued and published alongside the old one, so both are trusted at the same time. You then move your service onto the new key, confirm it works, and only afterwards retire the old certificate. Nothing breaks because there is never a moment when no valid certificate exists. Generate a new key and CSR. Produce a fresh 2048-bit RSA private key and a SHA-256 CSR with the same subject fields as the certificate you are replacing. In production this MUST happen inside your HSM or equivalent secure key management infrastructure. Upload the CSR and issue the new certificate. Upload it in the Trust Framework exactly as you did when the certificate was first created. The new certificate receives its own Key ID ( kid ) , and the Trust Framework publishes it to your organisation's JWKS automatically. Both keys are now live. During the overlap, the old and new kid s are both resolvable from your JWKS. Any party that verifies your certificates against the JWKS w`
  },
  {
    "title": "Choosing a Payment Type",
    "path": "/knowledge-base/articles/choosing-a-payment-type",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "seven payment shapes . The first decision is whether you need one payment now (Single Instant Payment) or many payments over time (one of six Multi-Payment variants). Delegated…",
    "headings": [
      "On-demand — the TPP triggers each payment",
      "Periodic schedule — one payment per period",
      "Defined schedule — a pre-agreed list of dates",
      "Treating PeriodicSchedule.PeriodType as a cadence on on-demand variants",
      "Picking FixedDefinedSchedule when dates are known but amounts aren't",
      'Assuming PeriodicSchedule means "periodic payments"',
      "Setting the Type on the wrong object"
    ],
    "body": `seven payment shapes . The first decision is whether you need one payment now (Single Instant Payment) or many payments over time (one of six Multi-Payment variants). Delegated SCA is an optional overlay on the multi-payment variants that shifts strong customer authentication from the LFI to the TPP." > You need… Use Exactly one payment, executed immediately Single Instant Payment More than one payment under the same authorisation One of the six Multi-Payment variants When to use: A checkout, an ad-hoc bill, a one-off transfer — any situation where the user is making a single payment decision in the moment. What's known up front: The exact amount, the creditor, the payment purpose. Re-authorisation: Every payment is its own consent. There is no "next payment" under the same authorisation. If one payment is all you need, you're done — the rest of this article is about the multi-payment path. How much is each payment for? — Fixed means every payment is the same amount; Variable means each payment is capped at a per-payment ceiling but can come in for less. When does each payment run? — OnDemand means the TPP triggers each payment whenever it wants; PeriodicSchedule means one payment per recurring period (monthly, weekly, etc.); DefinedSchedule means a pre-agreed list of specific calendar dates. Two amount answers three timing answers = six combinations. Each one is a distinct payment shape with its own api-guide: Amount Timing Variant Fixed per payment TPP triggers each payment FixedOnDemand Variable up to a per-payment cap TPP triggers each payment VariableOnDemand Fixed per payment One per recurring period (e.g. monthly) FixedPeriodicSchedule Variable up to a per-payment cap One per recurring period VariablePeriodicSchedule Exact amount known for each dated payment List of specific calendar dates FixedDefinedSchedule Per-date ceiling, actual amount may differ List of specific calendar dates VariableDefinedSchedule On-demand — the TPP triggers each payment When to use: Fixed-amount subscription billing, regular instalment collection, membership fees — the charge is always the same, and the TPP (not the calendar) decides when to take it. What's known up front: The per-payment amount ( PeriodicSchedule.Amount ), the creditor, and cumulative caps via PeriodicSchedule.PeriodType . When to use: Metered billing, utility top-ups, variable-charge subscriptions, TPP-managed savings sweeps — both the amount and the timing depend on usage or TPP logic, not a calendar. What's known up front: The per-payment ceiling ( MaximumIndividualAmount ), cumulative caps via PeriodicSchedule.PeriodType , and optional Controls on total count and total value across the consent. On on-demand variants, PeriodicSchedule.PeriodType ( Day , Week , Month , …) defines the reference window for cumulative limits — e.g. "no more than N payments totalling X AED per rolling month". It is not a recurrence schedule. The TPP still triggers every payment explicitly. Periodic schedule — one payment per period When to use: Fixed-price subscriptions, loan repayments, membership dues — predictable recurring charges that follow a calendar. What's known up front: The per-payment amount and the period cadence. The LFI will only permit one payment per period under this consent. vs FixedOnDemand: Same fixed amount, but the calendar — not the TPP — gates payment frequency. When to use: Utility bills, variable monthly service charges, TPP-managed savings where the amount differs each period but must stay within a pre-approved cap. What's known up front: The per-payment ceiling ( MaximumIndividualAmount ) and the period cadence. One payment per period, actual amount variable within the cap. Defined schedule — a pre-agreed list of dates When to use: Structured instalment plans, staged loan repayments, any case where both dates and amounts are known and agreed up front (e.g. "AED 500 on the 1st of each of Jan/Apr/Jul/Oct"). What's known up front: Every (PaymentExecutionDate, Amount)`
  },
  {
    "title": "Consent Identifiers — Why End User and Account IDs Must Be Opaque",
    "path": "/knowledge-base/articles/consent-identifiers",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": 'psuIdentifiers ) and the accounts the end user selected ( accountIds ). These values are stored centrally in the API Hub and used to enrich every TPP request proxied to the LFI."…',
    "headings": [],
    "body": `psuIdentifiers ) and the accounts the end user selected ( accountIds ). These values are stored centrally in the API Hub and used to enrich every TPP request proxied to the LFI." > Because these values live outside the LFI's own systems, they MUST be opaque internal references — never the underlying personal or account data they point to. Any value patched onto a consent MUST NOT be a sensitive or personally identifiable value. An LFI MUST NOT use any of the following as an identifier on the consent: Emirates ID, passport number, or any regulated national identifier Full name, date of birth, email, or mobile number IBAN, account number, card number, or PAN CIF number or any other internal identifier that maps 1:1 to regulated data The identifier MUST be an LFI-defined opaque reference that is meaningful only inside the LFI's own systems. The LFI resolves it back to the real customer or account internally when processing a request. The API Hub is the central consent store for UAE Open Finance. Consents — including the identifiers patched onto them — are persisted centrally, visible to operators of the API Hub, and surface in operational logs and reports. They are long-lived and outlive individual sessions. Storing sensitive values on the consent would leak PII outside the LFI's boundary , create a durable record of regulated data the LFI cannot unwind, and break the trust model where the API Hub receives only opaque handles from the LFI. The same principle governs payment PII, which is encrypted end-to-end to keep personal data opaque to the hub — see PII Encryption . Identifier Requirement psuIdentifiers.userId Opaque string. Stable per end user (same value across all their consents). Unique within the LFI. UUID v4 recommended. accountIds[] Array of opaque strings, 1–40 chars each, minItems: 1 . Each value MUST match the AccountId the LFI returns from its /accounts APIs. Immutable once issued. UUID v4 recommended. For Bank Service Initiation consents, accountIds MUST contain exactly one element — the debtor account. For Bank Data Sharing, it MUST contain every account the end user selected. The consent is a central record, not a private LFI record. Anything the LFI puts on it MUST be meaningless to any party other than the LFI itself.`
  },
  {
    "title": "Date Filters — fromBookingDateTime & toBookingDateTime",
    "path": "/knowledge-base/articles/transaction-date-filters",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": `API Hub rejects, and what an LFI's Ozone Connect implementation has to do with the requests that reach it." > Both list endpoints take an optional, open-ended date range. GET…`,
    "headings": [],
    "body": `API Hub rejects, and what an LFI's Ozone Connect implementation has to do with the requests that reach it." > Both list endpoints take an optional, open-ended date range. GET /accounts/{accountId}/transactions uses fromBookingDateTime / toBookingDateTime ; GET /accounts/{accountId}/statements uses fromStatementDate / toStatementDate . The behaviour is identical — the examples below use transactions. Both parameters are optional. They narrow the result to transactions booked on or after fromBookingDateTime and on or before toBookingDateTime ; omit either bound for an open-ended range. A well-formed range is always accepted — even when it matches nothing . In particular, the following are valid requests, not errors: a range reaching beyond two years into the past — the LFI returns the records it holds, and MAY return records older than two years where it has them; a quiet period with no activity; a fromBookingDateTime set in the future or later than any booked transaction — coherent, it simply matches nothing. In each of these cases the response is 200 with the matching subset in data — an empty array where nothing matches. A 404 MUST NOT be used to signal "no transactions in range". The API Hub validates the date range before proxying the request to the LFI. It returns 400 with Resource.InvalidFormat in three cases: a date-time parameter cannot be parsed ; the range is contradictory — fromBookingDateTime is after toBookingDateTime ; toBookingDateTime is in the future — an upper bound on when a transaction was booked cannot lie past the current moment. Note the asymmetry: only the upper bound is checked against the clock. A future fromBookingDateTime is coherent — it just matches nothing — so it is accepted and returns 200 . The identical three checks apply to fromStatementDate / toStatementDate on the statements endpoint. Because the API Hub catches all three malformed cases, your Ozone Connect endpoints receive only parseable, non-contradictory ranges whose upper bound is not in the future. There is nothing to re-validate — the LFI's job is simply to filter and return: Filter to transactions whose booking date-time falls within the supplied bounds, then apply pagination — so meta.totalRecords and meta.totalPages describe the filtered set. Ignore any timezone offset on the supplied values — compare the wall-clock date-time as given. Make at least two years of history available; you MAY hold and return more. The two-year figure is a minimum availability floor, not a query limit. Return 200 with the matching subset — an empty data array where nothing matches. Never 404 . A 200 with an empty data array means "no records matched" — it does not assert the customer had no activity. For any period beyond the two-year guarantee, an empty or partial result may simply reflect what the LFI retains. TPPs are told not to infer absence of activity past that window.`
  },
  {
    "title": "FAPI Request Headers — Traceability, Context, and Safe Retries",
    "path": "/knowledge-base/articles/request-headers",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "FAPI 2.0 Security Profile and the UAE Open Finance standard. They carry no business logic, but significantly affect how problems are diagnosed, how fraud controls operate, and how…",
    "headings": [
      "How it works in practice",
      "x-fapi-customer-ip-address",
      "x-fapi-auth-date",
      "x-customer-user-agent",
      "x-idempotency-key"
    ],
    "body": `FAPI 2.0 Security Profile and the UAE Open Finance standard. They carry no business logic, but significantly affect how problems are diagnosed, how fraud controls operate, and how payment retries behave safely." > The Request Headers reference covers the full rules. This article explains the intent behind each one. Every log line on every system that touched that request can be tagged with the same ID. Without it, tracing a failed payment across three systems means reconciling timestamps and guessing. With it, you ask Nebras support for a trace by interaction ID and get a complete picture in minutes. How it works in practice Generate a fresh UUID v4 for each request — never reuse across requests. Send it as x-fapi-interaction-id: 7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c . The API Hub echoes the exact value back in the x-fapi-interaction-id response header. If you omit it, the API Hub generates one for you — but you won't know what it is until you read the response header, and any log lines emitted before the response arrives will have no ID to correlate against. Log the interaction ID the moment you compose the request, not when you receive the response. This ensures it appears in your logs even if the request never returns. When debugging: if a request fails, search your logs for the interaction ID to pull the full request and response together. Pass it to Nebras when raising a support case — it is the single fastest way to get an end-to-end trace. The API Hub validates the x-fapi-interaction-id value. If it is not a valid UUID v4, the request will not fail — but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID you logged will not match anything on the API Hub side, and end-to-end tracing becomes impossible. Values that look similar but are not RFC 4122 UUID v4 will be discarded without any error response. The header is defined as recommended in FAPI 2.0, but in practice it is essential. There is no meaningful cost to sending it and significant cost to omitting it when you need to investigate a problem. x-fapi-customer-ip-address The IP address of the customer's device; send it whenever the customer is actively present in a session, so the LFI's fraud controls can see that the request originated from a real user rather than a background process. x-fapi-auth-date The date and time the customer last authenticated with your system (RFC 7231 HTTP-date format); send it on end user-facing calls so the LFI knows how fresh the authentication is and can apply appropriate session risk controls. x-customer-user-agent The user-agent string of the customer's browser or app; send it when the customer is accessing your service through a browser or native application, as it supports API Hub device fingerprinting and fraud detection. x-idempotency-key A stable, unique key you attach to every POST /payments request; if the API Hub has already processed a request with the same key for the same consent, it returns the original response without re-processing — always reuse the same key on retries, never generate a fresh one, or you risk creating a duplicate payment. See the Request Headers reference for format rules, exact conditions, and validation requirements.`
  },
  {
    "title": "Identity Assurance Claims — OIDC IDA as the response format for customer data",
    "path": "/knowledge-base/articles/identity-assurance-claims",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "GET /customer , GET /accounts/{accountId}/customer , and POST /customers/action/cop-query . All three share the same response envelope , derived from OpenID Connect for Identity…",
    "headings": [
      "verification.trustFramework",
      "claims — person vs. organisation",
      "GET /customer",
      "GET /accounts/{accountId}/customer",
      "POST /customers/action/cop-query"
    ],
    "body": `GET /customer , GET /accounts/{accountId}/customer , and POST /customers/action/cop-query . All three share the same response envelope , derived from OpenID Connect for Identity Assurance 1.0 ." > UAE Open Finance treats customer identity as verified claims — assertions about a person or organisation that the LFI has checked under a known framework. OIDC IDA is the standards-track JSON format for exactly this: claims grouped inside a verifiedClaims object, each group labelled with the verification.trustFramework under which it was verified. Reusing IDA across every customer-returning endpoint gives TPPs a single parser and a single mental model — whether the data comes from a consented account, a Confirmation of Payee lookup, or a direct call for the authenticated end user's identity, the shape is the same. Party Identity Assurance (Response) Schema — Based on the OpenID Connect for Identity Assurance 1.0 Specification Level Purpose verifiedClaims[] Array — allows multiple claim groups for the same subject, each verified under a different framework or evidence path. Most LFIs return a single element verification Describes how the claims were verified. trustFramework is the primary discriminator claims The actual identity attributes — name, Emirates ID, address, business name, trade licence, etc. verification.trustFramework For UAE Open Finance, the canonical value is UAE.FI — the Trust Framework under which UAE Licensed Financial Institutions verify customer identity to onboarding standards set by the CBUAE. claims — person vs. organisation The shape of claims depends on whether the subject is a natural person or an organisation. identityType discriminates: identityType Used for Key claims Person Retail customers fullName , givenName , familyName , emiratesId , emiratesIdExpiryDate , birthDate , nationality , mobileNumber , email , residentialAddress Organisation SME / Corporate customers businessName , tradeLicenceNumber , taxIdentificationNumber , dateOfIncorporation , countryOfIncorporation , corporateAddress LFIs MUST populate every claim that exists or is derivable for the subject. The OpenAPI spec marks the minimum required set; holding back optional fields degrades the TPP experience without serving any protection purpose — the claims have already been released under the authorized consent. GET /customer The record for the end user who authenticated the consent. The LFI identifies the end user from the o3-psu-identifier header and returns one customer record: Single object under data , not an array. GET /accounts/{accountId}/customer Returns one record per customer associated with the account. Joint accounts produce one record per joint holder. Each record carries customerType ( Sole , Joint , Delegate ) and accountRole ( Principal , SecondaryOwner , PowerOfAttorney , etc.) in addition to the shared envelope: POST /customers/action/cop-query Returns one record per customer on the account being looked up. The schema uses a slightly leaner shape — only the verifiedClaims envelope with the name-related claims the Hub needs to run the CoP match: For business accounts, CoP uses verifiedClaims[].organisationClaims.name in place of claims : The Hub compares these values against the name submitted by the TPP and returns a match verdict to the caller. CoP and GET /customer have very different use cases — a name-match check before a payment vs. the full identity of a consented end user — but the shape of the answer is the same because the question is the same at its core: "under which trust framework has this institution verified this party's identity, and what are the claims?" Having one envelope means LFIs implement one internal mapping from their core banking identity records to OIDC IDA, and that mapping serves every customer-returning endpoint. TPPs parse one format. Auditors review one schema. Aspect Rule Response envelope verifiedClaims[] → verification + claims (or organisationClaims for CoP businesses) Trust framework UA`
  },
  {
    "title": "JWT Claim Rules — Request Object and Client Assertion",
    "path": "/knowledge-base/articles/jwt-claims",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": 'two distinct signed JWTs in every authorization flow. Their claim rules differ in ways that are easy to confuse. This page is the single authoritative reference for both." > JWT…',
    "headings": [
      "Claims",
      "aud — issuer, not token endpoint",
      "Lifetime window",
      "Claims",
      "sub must equal iss",
      "jti replay prevention",
      "Lifetime window"
    ],
    "body": `two distinct signed JWTs in every authorization flow. Their claim rules differ in ways that are easy to confuse. This page is the single authoritative reference for both." > JWT Sent to Purpose Request Object (JAR) /par as request= Carries all authorization parameters in a tamper-proof, signed envelope Client Assertion /par and /token as client_assertion= Proves your application's identity to the Authorization Server — replaces a client secret Both JWTs are sent to /par in the same request, but they serve entirely separate purposes. Mixing up their claim rules — particularly jti and sub — is the most common source of 400 Bad Request errors. Field Rule alg Must be PS256 — the only algorithm accepted in the UAE Open Finance FAPI profile kid The thumbprint of your signing certificate, as registered in the Trust Framework. The Authorization Server uses this to fetch your public key and verify the signature typ Optional. Not required by the profile ES256, RS256, and HS256 are not accepted. Any JWT signed with a non-PS256 algorithm will be rejected. /par authorization parameters. It is sent as the request form parameter." tone="cream" > Claims Claim Type Required Rule Example aud string ✓ The Authorization Server's issuer value — from the LFI's .well-known/openid-configuration . This is not the token endpoint URL. https://auth1.altareq1.sandbox.apihub.openfinance.ae iss string ✓ Your application's client_id from the Trust Framework a1b2c3d4-5678-... client_id string ✓ Same value as iss a1b2c3d4-5678-... iat number ✓ Issued At Unix timestamp — when the JWT was created 1713196113 exp number ✓ Unix timestamp. Must be no more than 10 minutes after nbf . Recommended: nbf + 300 (5 minutes) 1713196423 nbf number ✓ Unix timestamp. Must be no more than 10 minutes in the past at the time the AS processes the request. Recommended: iat - 10 1713196103 response_type string ✓ Must be code code scope string ✓ Space-separated OAuth 2.0 scopes — see Scopes payments openid redirect_uri string ✓ Must exactly match a URI registered in the Trust Framework https://yourapp.com/callback nonce string ✓ A fresh UUID for every request. Bound to the ID token — prevents ID token replay f47ac10b-58cc-... state string ✓ A fresh UUID for every request. Returned in the redirect — prevents CSRF e5f6g7h8-... code_challenge string ✓ Base64url-encoded SHA-256 hash of your code_verifier (PKCE) E9Melhoa2Ow... code_challenge_method string ✓ Must be S256 — only PKCE method supported S256 authorization_details array ✓ RAR object describing the consent — see Consent API Guide [{...}] max_age number Maximum authentication age in seconds. Capped at 3600 3600 jti string Not required in the Request Object. Use nonce for replay prevention instead — aud — issuer, not token endpoint The aud claim must be the Authorization Server's issuer identifier , not the token endpoint URL. Find the correct value from the LFI's .well-known/openid-configuration under the issuer key. Lifetime window The Authorization Server checks that: nbf is no more than 10 minutes in the past exp is no more than 10 minutes after nbf The current time falls between nbf and exp Clock skew between your server and the Authorization Server can cause rejections. Always set nbf slightly in the past ( iat - 10 ) to absorb up to 10 seconds of drift. client_assertion with client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer ." tone="surface" > The Client Assertion must be sent to both /par and /token . A fresh assertion with a new jti must be generated for every request — the same assertion cannot be reused. Claims Claim Type Required Rule Example aud string ✓ The Authorization Server's issuer value — same source as the Request Object aud . Not the token endpoint URL https://auth1.altareq1.sandbox.apihub.openfinance.ae iss string ✓ Your application's client_id a1b2c3d4-5678-... sub string ✓ Your application's client_id — must equal iss a1b2c3d4-5678-... iat number ✓ Unix timestamp of issuance 1713`
  },
  {
    "title": "Knowledge Base",
    "path": "/knowledge-base/",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "Learn · Understand · Build Knowledge Base Guides, explainers, and deep-dives into Open Finance concepts, technical standards, and integration patterns. Built by the community, for…",
    "headings": [
      "Knowledge Base",
      "No articles found"
    ],
    "body": 'Learn · Understand · Build Knowledge Base Guides, explainers, and deep-dives into Open Finance concepts, technical standards, and integration patterns. Built by the community, for the community. · · Search: " " 0" class="ed-kb-grid"> · Updated → ⌕ No articles found No matches for " " . Try adjusting your search or filter criteria.'
  },
  {
    "title": "mtls_endpoint_aliases — what it is and when it matters",
    "path": "/knowledge-base/articles/mtls-endpoint-aliases",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "mtls_endpoint_aliases object returned by .well-known/openid-configuration . Today the aliases match the top-level endpoints, but the FAPI 2.0 spec allows them to diverge —…",
    "headings": [],
    "body": 'mtls_endpoint_aliases object returned by .well-known/openid-configuration . Today the aliases match the top-level endpoints, but the FAPI 2.0 spec allows them to diverge — preferring the alias keeps your client future-proof." > This is an FYI article. On the current sandbox the values inside mtls_endpoint_aliases are identical to the top-level endpoints, so a TPP that ignores this object will work today. The article exists so that the day an LFI separates the two, you already know what to look for. .well-known/openid-configuration includes both top-level endpoints and a parallel mtls_endpoint_aliases object:" tone="cream" > mtls_endpoint_aliases comes from RFC 8705 §5 — OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens . The motivation is operational: an Authorization Server may want to offer the same logical endpoint at two URLs — one that requires mTLS and one that does not. For example, the introspection endpoint may be reachable without mTLS for some operations but bound to a different host for the cert-bound flows. When tls_client_certificate_bound_access_tokens: true is set (as it is in UAE Open Finance), all token-related calls — /par , /token , /introspection , /revocation — must be made with your transport certificate so the issued token can be cryptographically bound to the cert. The aliases let the AS publish a separate URL set for those mTLS-bound calls if it ever needs to. In UAE Open Finance today, the values inside mtls_endpoint_aliases are identical to the top-level values. Posting your PAR or token request to either URL works equivalently and produces the same cert-bound token. The two only diverge if an LFI deliberately splits its mTLS surface from its non-mTLS surface — a configuration change that is not currently planned. The same pattern applies to introspection_endpoint and revocation_endpoint . The authorization_endpoint is browser-driven (the end user is redirected there) — it is not an mTLS call and does not appear in mtls_endpoint_aliases . Always use the top-level value. You do not need to call discovery twice or maintain two endpoint sets in code. One discovery fetch with the alias-fallback pattern above is enough.'
  },
  {
    "title": "Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments",
    "path": "/knowledge-base/articles/multi-segment-api-hubs",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": 'one API Hub per authentication context , but can share a single Ozone Connect — minimising LFI-maintained certificates." > The API Hub is more than a proxy — it acts as the OIDC…',
    "headings": [
      "LFI-held certificates — maintained once, shared across Hubs",
      "Ozone-held certificates — additional material added per Hub",
      "Implementation guidance"
    ],
    "body": `one API Hub per authentication context , but can share a single Ozone Connect — minimising LFI-maintained certificates." > The API Hub is more than a proxy — it acts as the OIDC Authorization Server for the LFI within the Open Finance ecosystem. When a TPP drives an end user through an authorization flow, the API Hub is the entity that: Exposes the single OIDC /authorize endpoint the TPP redirects the end user to Issues the access tokens the TPP uses to call APIs Holds the authoritative record of consents Because the API Hub must behave as a conformant OIDC Authorization Server, it has one authorization endpoint that redirects the end user into the LFI's own authentication experience (see the Consent Journey API Guide and the Authorization Endpoint configuration ). If retail and SME customers authenticate in different places — for example, retail customers in the retail mobile app and SME customers in a separate business banking portal — a single authorization endpoint cannot send an end user to both. Since the Hub mimics a standard Authorization Server, it can only be configured to redirect to one authentication flow. In that situation the LFI needs one API Hub per distinct authentication context : Retail end users → Retail API Hub → Retail authentication endpoint SME end users → SME API Hub → SME authentication endpoint The same logic applies to any additional segment (private banking, corporate) that has its own authentication experience. If all segments authenticate through the same endpoint — for example, a single unified banking app that handles both retail and SME sign-in — a single API Hub is sufficient. The need for multiple Hubs is driven by distinct authentication flows, not by the existence of multiple products. One Trust Framework organisation — the LFI is a single legal entity in the UAE Open Finance ecosystem and is registered as one organisation regardless of how many segments it serves. One API Hub deployment per authentication context — e.g. one for retail, one for SME. Each Hub has its own authorization endpoint, its own environment-specific onboarding, and its own base URLs. One shared C3-hh-cm-client application — both Hubs use the same client registration. This means the LFI's client-side identity and signing material is created once and reused. One shared Ozone Connect deployment — the LFI exposes a single set of Ozone Connect APIs, and routes incoming Hub requests to the correct downstream core using the o3-provider-id header. LFI-held certificates — maintained once, shared across Hubs LFI-held certificates live on the LFI's Trust Framework organisation and are held by the LFI. Because both Hubs sit under the same organisation and share the same C3-hh-cm-client application, the LFI maintains one set of these certificates: Certificate Purpose Reused across Hubs C3 LFI client cert used when calling Consent Manager & Headless Heimdall ✅ S4 LFI server cert identifying Ozone Connect to the API Hub ✅ Sig4 LFI JWT Auth signing key (only if JWT Auth is selected) ✅ Enc1 LFI encryption key used to decrypt PII ✅ See API Hub Connectivity & Certificates for the full certificate model and the existing "Certificate reuse across brands" note. Ozone-held certificates — additional material added per Hub Each additional API Hub requires its own server-side certificates — most visibly S1 , the server transport certificate that identifies the Hub instance to TPPs. These are added to the LFI's Trust Framework organisation so TPPs can validate the Hub's identity, but the private keys are held and maintained by Ozone. From the LFI's perspective, these certificates appear under the organisation but require no operational involvement — the LFI does not generate, store, or rotate the private key material. Certificate Purpose Added per Hub Private key held by S1 Identifies the Hub instance to TPPs ✅ Ozone S3 Identifies CM & HH servers to the LFI ✅ Ozone Sig2 Signs API Hub responses / id_token to TPPs ✅ Ozone C4 Hub client cert whe`
  },
  {
    "title": "O3 Sandbox Utilities — Signing and Encryption Helpers",
    "path": "/knowledge-base/articles/o3-utils",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "O3 Utility endpoints that perform JWT signing and PII encryption on your behalf. Supply your private key (and a JWKS URL for encryption) in the request body, and the utility…",
    "headings": [
      "Request body",
      "Test script",
      "Request body",
      "Pre-request script",
      "Test script"
    ],
    "body": `O3 Utility endpoints that perform JWT signing and PII encryption on your behalf. Supply your private key (and a JWKS URL for encryption) in the request body, and the utility returns the finished token. Lets you verify your key material and payload structure at each stage of the flow — independently of your application code." > These endpoints accept raw private key material. They exist exclusively in the sandbox environment and are not available in production . Never send a production private key to any external service. Setting up JWT signing and JWE encryption from scratch involves several independent components — certificate loading, algorithm selection, claim assembly, PKCE generation, and JWKS discovery. A mistake in any one of these produces a cryptic rejection at /par or /token with little indication of which step failed. The O3 Utils let you isolate and validate each component individually before wiring them together: If you're unsure whether… Use… Your private key and kid are correctly configured Prepare private key JWT Your client assertion claims are correct Prepare private key JWT for PAR end-point Your PII payload structure and encryption key are working Prepare Encrypted PII Variable Description kid-local The kid of your signing certificate from the Trust Framework pem-local Your signing private key in PEM format, with \\n replacing literal newlines _clientId Your application's client_id from the Trust Framework jwksUrl The LFI's JWKS URI — required for encryption only Postman environment variables cannot contain literal newlines. Convert your key with: Saves to: Takes a structured payload containing creditor and risk data, signs it with your private key, then encrypts it using the LFI's public encryption key (fetched from jwksUrl ). The result is a Nested JWT (JWS wrapped in JWE) ready to drop straight into PersonalIdentifiableInformation inside authorization_details . Request body Test script See Message Encryption for how to produce this token in your own code. Saves to: Produces a client assertion JWT for authenticating at /par . The assertion contains your client_id as both iss and sub , a short exp , and a unique jti . The Authorization Server verifies it using your public key from the Trust Framework JWKS. Use this as the client_assertion parameter when calling /par . Request body Pre-request script Test script See Client Assertion for the full claim set. Saves to: Identical request body and output to the PAR variant above. Use this to generate a fresh client assertion for /token — for example when exchanging an authorization code for tokens or refreshing an access token. A new assertion with a unique jti must be generated for every request. The Authorization Server tracks seen jti values and will reject replayed assertions. Postman's generates a new UUID on every request, so replays are avoided automatically.`
  },
  {
    "title": "OnBehalfOf — When to Use It and When Not To",
    "path": "/knowledge-base/articles/on-behalf-of",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "OnBehalfOf appears in Bank Data Sharing and Insurance Data Sharing PAR schemas to declare that the TPP is acting on behalf of another regulated entity. For Bank Service Initiation…",
    "headings": [
      "Merchant Name on the authorisation page",
      "Bank Data Sharing PAR (with OnBehalfOf)",
      "Bank Service Initiation PAR (payment) — creditor fields for merchant identity"
    ],
    "body": `OnBehalfOf appears in Bank Data Sharing and Insurance Data Sharing PAR schemas to declare that the TPP is acting on behalf of another regulated entity. For Bank Service Initiation (payment) PARs , OnBehalfOf is not used — the payment recipient is represented via creditor fields instead." > Populate OnBehalfOf when the caller (TPP) is requesting authorisation for bank or insurance data sharing only , but is doing so on behalf of another legal or regulated entity: A TPP provides technology services to an LFI and stages the PAR on behalf of that LFI. A licensed aggregator or reseller acts as the technical integration layer for another regulated entity. If the TPP is representing itself (no other regulated entity is involved), OnBehalfOf is not required. Field Description TradingName The trading name of the entity being represented. LegalName The registered legal name of the entity. IdentifierType Identifier scheme — currently "Other" in the published schema. Identifier The identifier value for the represented entity. Consent type OnBehalfOf supported? Notes Bank Data Sharing Yes Declare the legal entity the TPP is acting for within the rich authorisation request. Insurance Data Sharing Yes References a common AEOnBehalfOf object — same intent and fields. Bank Service Initiation (payments) No Not used. Merchant identity is carried via the creditor fields in the payment consent. For payment consents, the user must be shown who the payment is going to. This information is provided via the creditor fields in the payment consent — not via OnBehalfOf . Populate the creditor fields so the LFI can display the recipient (merchant/payee) to the user: Prefer Creditor.Name when it is provided. If Creditor.Name is not present, fall back to CreditorAccount.Name.en or CreditorAccount.Name.ar as applicable. This ensures the user sees a meaningful recipient name when authorising the payment. Do not attempt to carry merchant identity in an OnBehalfOf object for payment consents — it is not part of the service initiation schema and will be ignored or rejected. Merchant Name on the authorisation page If the TPP populates Risk.CreditorIndicators.MerchantDetails.MerchantName in the PII payload, the LFI must reflect this on the authorisation page by displaying the merchant name in the permission header: [TPP trading name] needs your permission on-behalf of [MerchantName] to make the payment below: When MerchantName is not present, the standard wording is shown: [TPP trading name] needs your permission to make the payment below: This allows TPPs acting as a payment facilitator or aggregator on behalf of a sub-merchant to surface that merchant's identity clearly to the user at the point of authorisation. Bank Data Sharing PAR (with OnBehalfOf) Use this structure when the TPP is staging the PAR on behalf of another regulated entity: Bank Service Initiation PAR (payment) — creditor fields for merchant identity Use the creditor fields to identify the payment recipient — not OnBehalfOf : In production, PersonalIdentifiableInformation is a JWE encrypted with the LFI's encryption key. The structure above shows the decrypted payload for illustration. If acting on behalf of another regulated entity, include OnBehalfOf in Bank Data Sharing or Insurance Data Sharing PARs. For payment consents, populate Creditor.Name — or CreditorAccount.Name.en / CreditorAccount.Name.ar if Creditor.Name is not available — so the LFI can display the recipient to the user. If the TPP is acting as a payment facilitator for a sub-merchant, populate Risk.CreditorIndicators.MerchantDetails.MerchantName in the PII payload so the LFI can display the merchant name on the authorisation page. Do not use OnBehalfOf in service initiation (payment) PARs.`
  },
  {
    "title": "Pagination — LFI `meta` to TPP `Links`",
    "path": "/knowledge-base/articles/pagination",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": 'LFI → API Hub is page-based ( page + page-size with a meta response); API Hub → TPP uses a Links envelope. The Hub bridges the two." > This article uses GET…',
    "headings": [
      "Request from the Hub",
      "Response to the Hub",
      "Request from the TPP",
      "Response to the TPP",
      "When the LFI returns an unpaginated response"
    ],
    "body": `LFI → API Hub is page-based ( page + page-size with a meta response); API Hub → TPP uses a Links envelope. The Hub bridges the two." > This article uses GET /accounts/{accountId}/transactions as the worked example. The same behaviour applies to GET /accounts/{accountId}/statements — and to any other endpoint where the LFI chooses to paginate. Request from the Hub The Hub issues one page-based request per TPP call: page is 1-indexed; page-size defaults to 100 . Filtering parameters ( fromBookingDateTime , toBookingDateTime ) are applied before pagination — totalRecords and totalPages reflect the filtered result set, not the whole table. Response to the Hub The LFI returns the slice for the requested page, plus a meta block describing the full filtered result set: Field Meaning meta.paginated true if the response is a page of a larger result set. false or omitted if the LFI returned the full result set in a single response meta.totalPages ceil(totalRecords / page-size) — the last page number the Hub may request meta.totalRecords The total number of records in the filtered result set across all pages The LFI MUST return records in a deterministic order so pagination is stable across successive page requests. meta to generate the Links block." tone="surface" > Request from the TPP The TPP does not send page or page-size . Pagination is expressed through the Hub's URL parameters on the Links returned in the previous response. Response to the TPP The Hub converts the LFI's meta into Meta and Links : The Hub derives each link from the LFI's meta.totalPages and the current page : TPP field Derived from Links.Self The URL that produced this response Links.First Current URL with page=1 Links.Prev Current URL with page = currentPage - 1 . Omitted on the first page Links.Next Current URL with page = currentPage + 1 . Omitted on the last page Links.Last Current URL with page = meta.totalPages Meta.TotalPages meta.totalPages from the LFI When the LFI returns an unpaginated response If the LFI returns meta.paginated: false (or omits paginated ), the full result set is in a single response. The Hub emits Meta.TotalPages: 1 , a Links.Self , and no First / Prev / Next / Last . The Hub propagates this as an empty Data array with Meta.TotalPages: 0 . 404 MUST NOT be returned. The TPP standards follow UK Open Banking conventions — opaque Links let the Hub evolve its pagination strategy (cursor-based, time-sliced, etc.) without breaking TPP clients. The LFI side is deliberately simpler: page/page-size is the lowest-common-denominator interface that every core banking system can serve cheaply. The Hub absorbs the translation. GET /accounts/{accountId}/statements works identically: the LFI paginates by page / page-size and returns meta.totalPages / meta.totalRecords ; the Hub emits Links and Meta.TotalPages on the TPP side. Other list endpoints ( /beneficiaries , /direct-debits , /scheduled-payments , /standing-orders , /products , /accounts/{accountId}/customer ) may pursue the same model if the LFI chooses to paginate them, but the expectation is that the full result set is returned in a single response.`
  },
  {
    "title": "Payment PII Encryption — Why It Exists and What It Means for You",
    "path": "/knowledge-base/articles/pii-encryption",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "end-to-end using the LFI's public encryption key before it leaves the TPP. Nebras passes the encrypted blob through but cannot read, inspect, or validate it. Only the LFI, holding…",
    "headings": [
      "Single-beneficiary payment types",
      "Flexible beneficiary payment types"
    ],
    "body": `end-to-end using the LFI's public encryption key before it leaves the TPP. Nebras passes the encrypted blob through but cannot read, inspect, or validate it. Only the LFI, holding the private key, can decrypt and act on the data." > The core reason is data privacy : the PII inside a payment consent contains account holder names, IBANs, and other personal details that have no business being visible to any party other than the LFI processing the payment. Nebras operates as a central hub holding the consents. Without encryption, Nebras would have visibility into every creditor account, debtor name, and transaction risk indicator across all payment flows on the platform. Encrypting the PII directly to the LFI's key ensures that Nebras acts purely as a routing layer, with no access to the personal data it carries. This design also means if the central hub were ever compromised, the PII within payment consents would remain unreadable. When Where Contains Consent creation POST /par — inside authorization_details Debtor account details, creditor account(s), risk indicators Each payment request POST /payments The specific creditor for that payment, risk indicators Each encryption is fresh — the TPP re-encrypts a new payload each time, using the LFI's current public key. The two payloads (consent-time and payment-time) are independently validated by the LFI after decryption. LFIs bear full responsibility for validating it after decryption." tone="cream" > Confirming that the PII payload conforms to the schema ( AEDomesticPaymentPIIProperties for domestic payments). Validating mandatory fields — at minimum CreditorAccount.Identification (a valid UAE IBAN) and at least one of CreditorAccount.Name.en or CreditorAccount.Name.ar . Comparing the creditor supplied at POST /payments against the creditor(s) recorded in the consent PII, and rejecting the payment if they do not match. A payment rejected at the LFI due to malformed or mismatched PII is not surfaced as an API Hub error — it appears as a payment-level rejection. LFIs should return clear error responses so that TPPs can diagnose and correct the issue. Because PII validation happens entirely inside the LFI after decryption, errors in the encrypted payload are not caught centrally . A consent or payment may be accepted by the API Hub and then rejected by the LFI. A successful POST /par response only means the API Hub accepted the request — it does not mean the LFI successfully decrypted and validated the PII inside it. Confirm the exact field names, nesting structure, and data types the LFI expects. While the schema is standardised, LFIs may have specific expectations — for example, BIC format (8 vs 11 characters) or name field encoding. Test end-to-end with the LFI before going live. Ensure the creditor details you encrypt exactly match what you intend: for single and multiple beneficiary consents, even a minor discrepancy (whitespace, encoding difference) in the account name can cause payment rejection. beneficiary model and constrains what creditors can be used at payment time." tone="cream" > Single-beneficiary payment types The following payment types accept exactly one creditor entry in Initiation.Creditor[] . The consent is bound to that single recipient — all payments under the consent must go to that account. Single Instant Payment Fixed Defined Schedule Variable Defined Schedule Fixed On-Demand Fixed Periodic Schedule Variable Periodic Schedule Flexible beneficiary payment types The following payment types support all three beneficiary models, giving TPPs more flexibility at the cost of additional validation complexity: Model Initiation.Creditor[] Effect Open beneficiary Omitted No creditor fixed at consent time — each POST /payments specifies a fresh creditor Single beneficiary 1 entry All payments under the consent go to that one account Multiple beneficiaries 2–10 entries Each payment specifies one of the pre-approved accounts Payment types that support all three models: Va`
  },
  {
    "title": "The tpp and decodedSsa Context Blocks on Ozone Connect Calls",
    "path": "/knowledge-base/articles/tpp-context-block",
    "category": "Knowledge Base",
    "section": "Articles",
    "description": "tpp object identifying the calling TPP, plus its decoded Software Statement Assertion ( decodedSsa ). None are required for payment execution — the Hub has already authenticated…",
    "headings": [
      "clientId vs tppId vs softwareStatementId"
    ],
    "body": `tpp object identifying the calling TPP, plus its decoded Software Statement Assertion ( decodedSsa ). None are required for payment execution — the Hub has already authenticated the TPP and validated entitlement — but the fields are passed through as context for audit logs, fraud signals, customer-facing display, compliance reports, and support investigations." > safely ignore everything in tpp and decodedSsa . The Hub has already done the work that protects the LFI." tone="cream" > Verified the TPP's mTLS transport certificate against the Trust Framework directory Verified the TPP's signing certificate against the SSA's jwks_uri Confirmed the TPP's role ( BSIP , BDSP , etc.) entitles it to call this endpoint Confirmed the consent referenced by the request belongs to this TPP If your LFI's payment processing logic does not look at tpp or decodedSsa , no rule is being broken. They are passed through so the LFI can consume them when it has a reason to — they are not a validation surface. Use case What you'd read Audit log enrichment — labelling each Ozone Connect call with the human-readable identity of the TPP that triggered it tpp.tppName , tpp.tppId , decodedSsa.client_name Customer-facing display — surfacing the TPP brand in app history (e.g. "Payment initiated by Mario Money") decodedSsa.client_name , decodedSsa.logo_uri , decodedSsa.client_uri Fraud and risk signals — feeding TPP identity, organisation, and roles into your scoring model tpp.clientId , tpp.orgId , decodedSsa.roles , decodedSsa.organisation_id Compliance / regulatory reporting — producing per-TPP volume and value reports for the CBUAE tpp.tppId , tpp.tppName , tpp.softwareStatementId Support investigations — correlating an incident to a specific TPP application without round-tripping through Nebras tpp.softwareStatementId , decodedSsa.client_id Privacy / right-to-be-forgotten — pinning the directory record at the moment of the call so the LFI can prove what was advertised about the TPP at that point in time tpp.directoryRecord Field Type Required Description Example clientId string Yes The OIDC client identifier issued to the TPP by the Trust Framework. Stable for the life of the TPP application. 1675793e-d6e3-4954-96c8-acb9aaa83c53 orgId string Yes The organisation identifier issued to the TPP's parent organisation by the Trust Framework. One organisation may own many clientId s. a1b2c3d4-e5f6-7890-abcd-ef0123456789 tppId string Yes The identifier the API Hub uses internally to uniquely identify the TPP. Useful when raising support cases with Nebras. fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00 tppName string Yes The TPP's registered name as recorded in the Trust Framework. Example TPP softwareStatementId string Yes The identifier of the specific software statement (i.e. the registered application) being used. A single clientId may have multiple software statements over time. XvAjPeeYZAdWwrFF.. directoryRecord string No The full TPP directory record retrieved from the CBUAE Trust Framework directory at the time of the call, encoded as a Base64 string. Only present when the Hub fetched it for this request. eyJhbW91bnQiOiIxMDAuMDAi.. decodedSsa object Yes The decoded Software Statement Assertion — see the next section. — clientId vs tppId vs softwareStatementId These three identifiers commonly cause confusion. The mental model: clientId — issued by the Trust Framework when the TPP registers an OIDC client. This is the value the TPP uses as iss and sub on its client assertions, and what the API Hub records against tokens. softwareStatementId — issued by the Trust Framework when the TPP registers a specific application (the SSA). One clientId typically has one active SSA, but the SSA can be re-issued (for example after rotating keys) without a new clientId . tppId — the Hub's internal identifier. Use this when raising tickets with Nebras; use clientId or softwareStatementId when correlating with anything published in the Trust Framework. For audit logging, log all thre`
  },
  {
    "title": "Accept a Employment Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-employment-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Accept a Employment Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Health Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-health-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Accept a Health Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Home Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-home-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Accept a Home Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Life Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-life-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Accept a Life Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Motor Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-motor-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Accept a Motor Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Renters Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-renters-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Accept a Renters Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Travel Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-travel-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Accept a Travel Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Admin Portal",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Admin Portal Admin Portal 2 min read Each API Hub includes a dedicated Admin Portal — a web-based management interface where LFI teams can manage TPP access,…",
    "headings": [
      "Admin Portal 2 min read"
    ],
    "body": "LFI · API Hub · Admin Portal Admin Portal 2 min read Each API Hub includes a dedicated Admin Portal — a web-based management interface where LFI teams can manage TPP access, investigate API traffic, and review operational reports. The following key areas of the Admin Portal are covered in detail on their own pages: TPP Management — view, activate, and block TPPs, software statements, and clients Logs — audit logs and API request tracing Reports — performance metrics, call volumes, and consent statistics The remaining portal sections — Dashboard, Consent Management, and Planned Outages — are described below. Every LFI receives one Admin Portal per API Hub instance, per environment: Environment URL SSO Provider Production https://admin.{lficode}.apihub.openfinance.ae Production Trust Framework Pre-production https://admin.{lficode}.preprod.apihub.openfinance.ae Sandbox Trust Framework Organisations with multiple API Hubs (e.g. separate hubs for retail and corporate banking) receive a portal per hub. {lficode} is the unique identifier assigned to your organisation. Your Nebras onboarding contact will confirm your LFI code. Portal access is managed via Single Sign-On (SSO) from the Trust Framework. Users who hold the relevant roles in the Trust Framework — such as Primary Technical Contact (PTC), Primary Business Contact (PBC), or Secondary Technical Contact (STC) — are automatically granted access. Production portal authenticates against the Production Trust Framework Pre-production portal authenticates against the Sandbox Trust Framework There is no separate user management within the portal itself. To grant or revoke portal access, manage the user's roles in the Trust Framework. The portal's User Management section displays all users who currently have access and their roles. The dashboard is the landing page after login. It provides a summary of API Hub health and request distribution. While useful for a quick overview, the Reports and Logs sections provide the detailed data needed for day-to-day operations and debugging. The consent management section lists all consents created against your API Hub. Each entry shows the consent ID, TPP name, consent type, status, and creation date. You can filter and sort consents by: Consent type — data sharing or service initiation Status — e.g. Authorised , Rejected , Expired , Revoked , Consumed Created date — ascending or descending You will see regular data-sharing consents created by the Ozone Health Probe client. This is an automated monitoring client that periodically creates consents (via PAR) to verify the health of your API Hub. These consents are never authorised and will expire automatically. When reviewing consent data, filter out the Ozone client to focus on real TPP activity. The portal includes an Outage Management section where LFIs can register planned downtime windows. When you schedule maintenance that will affect API availability: Navigate to the outage management section Select your organisation Enter the date, time, duration, and description of the planned outage Nebras will be notified and will communicate the outage to affected TPPs. Errors during registered outage windows are treated sympathetically in performance reporting."
  },
  {
    "title": "API Hub Connectivity & Certificates",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/connectivity/",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Connectivity API Hub Connectivity & Certificates 5 min read This page describes the network architecture of the API Hub and the certificates that secure…",
    "headings": [
      "API Hub Connectivity & Certificates 5 min read",
      "TPP to API Hub",
      "API Hub to LFI (Ozone Connect)",
      "LFI to API Hub (Consent Manager & Headless Heimdall)",
      "Ozone-held certificates (S1, S3, Sig2, C4, Sig3)",
      "LFI-held certificates (C3, S4, Sig4, Enc1)"
    ],
    "body": "LFI · API Hub · Connectivity API Hub Connectivity & Certificates 5 min read This page describes the network architecture of the API Hub and the certificates that secure communication between all parties in the ecosystem. The diagram below shows the full connectivity model between TPPs, the API Hub, and the LFI's infrastructure. All connections between the API Hub and external parties use mutual TLS (mTLS) . Each certificate has a specific role in securing a particular connection path. The certificates are created and stored within the Trust Framework, and the private keys are held by the party responsible for that connection. The sequence diagram below shows which certificate secures each direction of traffic between the TPP, the API Hub, and the LFI's Ozone Connect backend. TPP to API Hub Connection Certificate Description TPP → API Hub C1 (TPP client cert) The TPP presents its client certificate to identify itself to the API Hub. API Hub → TPP S1 (API Hub server cert) The API Hub presents this server certificate to identify the LFI's API Hub instance to the TPP. Request signing Sig1 The TPP signs request JWTs (e.g. PAR request objects and private_key_jwt client assertions) sent to the API Hub. The API Hub verifies using the public key in the TPP's JWKS. Response signing Sig2 The API Hub signs responses and id_token payloads sent to the TPP. The TPP verifies using the public key in the JWKS. API Hub to LFI (Ozone Connect) Connection Certificate Description API Hub → LFI C4 (API Hub client cert) The API Hub presents this client certificate when calling the LFI's Ozone Connect endpoints. LFI → API Hub S4 (LFI server cert) The LFI's Ozone Connect server presents this certificate to identify itself to the API Hub. Request signing (JWT Auth) Sig3 The API Hub signs JWT Auth headers on Ozone Connect requests. Only applicable when JWT Auth is selected. Response signing (JWT Auth) Sig4 The LFI signs JWT Auth headers on Ozone Connect responses. Only applicable when JWT Auth is selected. LFI to API Hub (Consent Manager & Headless Heimdall) Connection Certificate Description LFI → API Hub C3 (LFI client cert) The LFI presents this client certificate when calling the Consent Manager and Headless Heimdall Auth Server. API Hub → LFI S3 (API Hub server cert) The Consent Manager and Headless Heimdall servers present this certificate to identify themselves to the LFI. Request signing (JWT Auth) Sig4 The LFI signs JWT Auth headers on requests to the Consent Manager and Headless Heimdall. Only applicable when JWT Auth is selected. Response signing (JWT Auth) Sig3 The API Hub signs JWT Auth headers on Consent Manager and Headless Heimdall responses. Only applicable when JWT Auth is selected. Payload encryption is separate from transport: Enc1 and Enc2 are JWE keys applied to the message body, not to the TLS connection. The sequence below shows how each one is used. Certificate Description Enc1 (LFI encryption key) Used by the TPP to encrypt Personally Identifiable Information (PII) sent via the API Hub. Only the LFI can decrypt this data using its private key. Enc2 (TPP encryption key) Used by the API Hub to encrypt webhook event payloads sent to the TPP. Only the TPP can decrypt using its private key. The table below summarises all certificates, who holds the private key, and where the certificate is created in the Trust Framework. Certificate Type Private Key Held By Trust Framework Location Purpose S1 Server Transport Ozone LFI's organisation Identifies the LFI's API Hub instance to TPPs S3 Server Transport Ozone LFI's organisation Identifies the CM & HH servers to the LFI S4 Server Transport LFI LFI's organisation Identifies the LFI's Ozone Connect server to the API Hub C1 Client Transport TPP TPP's organisation Identifies the TPP when calling the API Hub C3 Client Transport LFI LFI's organisation ( C3-hh-cm-client application) Identifies the LFI when calling CM & HH C4 Client Transport Ozone Ozone's organisation Identifies the API Hub when c"
  },
  {
    "title": "API Hub Onboarding",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding API Hub Onboarding 2 min read This section covers the end-to-end process for onboarding your institution to the API Hub . Onboarding is managed through…",
    "headings": [
      "API Hub Onboarding 2 min read",
      "1. Prerequisites Questionnaire",
      "2. Application Layer Authentication",
      "3. Environment-Specific Configuration"
    ],
    "body": "LFI · API Hub · Onboarding API Hub Onboarding 2 min read This section covers the end-to-end process for onboarding your institution to the API Hub . Onboarding is managed through the Nebras Service Desk and involves providing configuration details, exchanging certificates, and provisioning your API Hub instance. Before you can begin API Hub onboarding, the following MUST be in place: Trust Framework registration — Your organisation MUST be onboarded to the appropriate Trust Framework environment: Pre-production API Hub → Sandbox Trust Framework Production API Hub → Production Trust Framework See Trust Framework Onboarding for details. Primary Technical Contact (PTC) — A Primary Technical Contact MUST have been registered for your organisation so that applications, servers, and certificates can be created in the Trust Framework. The PTC is responsible for managing the technical connectivity between your institution and the API Hub. To begin onboarding, send the following email to support@nebrasopenfinance.ae : To: support@nebrasopenfinance.ae Subject: API Hub Onboarding Request — [Your Organisation Name] — [Environment] Dear Nebras Support, I wish to begin API Hub onboarding for the following: Organisation: [Your Organisation Name] Environment: [Pre-production / Production] Primary Technical Contact (PTC): [Name and email of the PTC who will manage the technical connectivity] Please raise the onboarding tickets and provide the next steps. Once received, the Nebras support team will raise JIRA tickets to track each stage of the onboarding process. API Hub onboarding proceeds through three stages. Each stage is tracked via a separate Service Desk ticket. 1. Prerequisites Questionnaire You will be asked to provide organisational details, infrastructure information, and your preferred configuration options. This information is used to provision your API Hub instance. See Prerequisites for the full list of fields. 2. Application Layer Authentication You MUST select an application layer authentication method to secure communication between the API Hub and your Ozone Connect endpoints. The available methods are: mTLS Only API Key Client Credentials Grant JWT Auth (recommended) See Application Layer Authentication for a comparison of methods, and Configuring Authentication for implementation guidance on the mTLS and JWT Auth layers. 3. Environment-Specific Configuration You will exchange certificates, URLs, and domain-specific values with Ozone. This process MUST be completed separately for each environment (pre-production and production). See Environment-Specific Configuration for the full list of fields and certificate details. Once your API Hub is provisioned and configured, you will need to: Publish your API Hub as a server in the Trust Framework so that TPPs can discover your institution. See Creating a Server . Implement your Ozone Connect endpoints"
  },
  {
    "title": "API Hub Overview",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Overview API Hub Overview 5 min read The API Hub — powered by Ozone — is the central Open Finance gateway that connects Licensed Financial Institutions (LFIs) to…",
    "headings": [
      "API Hub Overview 5 min read",
      "Consent authorization",
      "API request"
    ],
    "body": "LFI · API Hub · Overview API Hub Overview 5 min read The API Hub — powered by Ozone — is the central Open Finance gateway that connects Licensed Financial Institutions (LFIs) to the ecosystem. It acts as both the OIDC Authorization Server and the Open Finance Gateway , managing all incoming TPP traffic on your behalf. As an LFI, you connect your Ozone Connect base URL and authorization endpoint to the Hub once . The Hub then handles TPP credential verification, security enforcement, request routing, and consent management. All TPP traffic MUST flow through the API Hub — TPPs never call LFI Ozone Connect endpoints directly. The canonical request path is: TPP → API Hub → LFI → API Hub → TPP . The API Hub validates the TPP's token and consent, enforces OpenAPI schemas, enriches the request with customer and consent context, then proxies it to the corresponding Ozone Connect endpoint on your LFI. Your Ozone Connect endpoint executes the operation and returns the response, which the Hub normalizes before delivering to the TPP. Each LFI's Hub instance is a dedicated isolated tenant — your consent store, audit logs, and configuration are on completely separate infrastructure from every other LFI in the ecosystem. Responsibility Detail TPP credential verification Validates the TPP's certificate and software statement against the Trust Framework on every request FAPI 2.0 security Enforces PAR, mTLS-bound access tokens, DPoP, and JWS message signing Consent lifecycle Stores and enforces all consent records — data sharing and payment consents. The API Hub is the single source of truth for all consent state Token issuance Issues all access tokens to TPPs after successful consent authorization. The API Hub is the sole token issuer — LFIs MUST NOT issue tokens to TPPs API routing Routes inbound TPP requests to the correct Ozone Connect endpoint on your LFI, enriching each request with customerId , accountIds , and TPP information Participant discovery Publishes your /.well-known/openid-configuration so TPPs can discover your endpoints Error mapping Maps LFI error responses to the TPP-facing standard, normalizing response formats across the ecosystem Audit logging Maintains a tamper-evident log of all API interactions for regulatory purposes Responsibility Detail Ozone Connect endpoints Expose your banking APIs (accounts, payments, CoP, etc.) via Ozone Connect. The API Hub routes verified requests to these endpoints End user authentication Authenticate the customer when they are redirected to your authorization endpoint during consent flows. The API Hub handles the OIDC authorization protocol; your system authenticates the person Business logic & data retrieval Execute the requested operation — retrieve account data, initiate payments, check balances — and return the response per the LFI OpenAPI specification Fraud & risk checks Apply your institution's fraud detection and risk assessment on incoming requests Consent authorization UX Present the consent details to the end user and capture their authorization decision via your application The Hub is the source of truth for all consent records. Whether a customer revokes a consent through your CMI, or a TPP modifies a consent through their interface, both parties MUST patch the change to the Hub immediately. LFIs MUST NOT maintain independent consent state that diverges from the Hub's record. Any consent state held in your own systems must exactly match the Hub's record at all times. The Hub never reads or stores request and response payload data. Account details, transaction records, payment instructions, and all other customer data returned by your Ozone Connect endpoints are routed through the Hub transparently — they are never inspected, logged, or retained. Only consent metadata and interaction audit events are stored by the Hub. LFIs trust the API Hub for token validation and consent validation. When the Hub forwards a request to your Ozone Connect endpoint, the token and consent have al"
  },
  {
    "title": "Application Layer Authentication",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Application Layer Auth Application Layer Authentication 4 min read All communication between the API Hub and an LFI is secured at the transport layer…",
    "headings": [
      "Application Layer Authentication 4 min read",
      "Constraints",
      "Constraints",
      "Constraints",
      "Supported in both directions"
    ],
    "body": "LFI · API Hub · Onboarding · Application Layer Auth Application Layer Authentication 4 min read All communication between the API Hub and an LFI is secured at the transport layer using mutual TLS (mTLS) . In addition to mTLS, the API Hub supports several application layer authentication methods that provide defense-in-depth. LFIs MUST select an application layer authentication method during onboarding. If you are unsure which method to choose, we recommend JWT Auth . Indicate your chosen application layer authentication method, via the relevant API Hub Onboarding Service Desk ticket. Application layer authentication applies to two directions of communication: Direction Description API Hub to LFI (Ozone Connect) Requests the API Hub sends to your Ozone Connect endpoints when proxying TPP API calls. LFI to API Hub (Consent Manager & Headless Heimdall Auth Server) Requests your authorisation server sends to the API Hub's Consent Manager and Headless Heimdall Auth Server during consent and authorisation flows. Not all methods are supported in both directions. The table below summarises availability. Method API Hub to LFI (Ozone Connect) LFI to API Hub (CM & Headless Heimdall) mTLS Only (Off) Yes Yes API Key Yes No Client Credentials Grant Yes No JWT Auth Yes Yes If you are unsure which method to select, choose JWT Auth . It offers strong security without requiring additional infrastructure, and is the only method (besides mTLS only) that is supported in both directions. In this configuration, application layer authentication is switched off. The integration relies solely on the mutual TLS connection for authentication. This is the simplest option to implement — no additional application-layer work is required beyond configuring mTLS. The main drawback is the lack of defense-in-depth: security relies on a single layer. This setting can be applied in both directions. An API Key is a shared secret used between the LFI and the API Hub. The API Hub includes the key in requests to your Ozone Connect endpoints. API Keys are the most basic form of application layer authentication. While they provide limited security benefit compared to other methods, they MAY be appropriate as a starting point or for LFIs that use an existing API Gateway that enforces API Key validation. Constraints Supported for Ozone Connect only (API Hub to LFI direction). NOT supported for Consent Manager or Headless Heimdall Auth Server APIs. The API Key MUST have a validity of 12 months or more. Key rotation is supported annually. The API Hub obtains an access token via an OIDC Client Credentials Grant from an authorisation server managed by the LFI. The API Hub then includes this token in requests to your Ozone Connect endpoints. This is a well-established and secure mechanism. Security can be further strengthened by implementing a FAPI profile on the LFI's authorisation server. Constraints Supported for Ozone Connect only (API Hub to LFI direction). NOT supported for Consent Manager or Headless Heimdall Auth Server APIs. Requires the LFI to operate its own authorisation server. MAY result in a small increase in latency, as the API Hub makes an additional call to obtain the access token. Where a client_secret is used, it MUST have a validity of 12 months or more. Secret rotation is supported annually. scope values are configured during onboarding based on LFI requirements. JWT Auth is a standard for secure and efficient application layer authentication. The requestor creates a signed JWT using a private key and a set of well-defined claims. The receiver verifies the token using the corresponding public key published on a JWKS endpoint hosted by the Trust Framework. JWT Auth is the recommended method. It offers the following advantages: Uses PS256 — a secure asymmetric algorithm that does not rely on shared secrets. No additional infrastructure is required — signing keys are generated and managed through the Trust Framework. Key rotation is managed by the sending pa"
  },
  {
    "title": "ATMs",
    "path": "/tech/lfi-api-hub/v2.1/banking/atms/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · LFI capability ATMs 2 min read The ATM API allows LFIs to publish ATM location and service data to TPPs. It is a read-only, public-data API — no consent or user redirect…",
    "headings": [
      "ATMs 2 min read",
      "Bank Data Sharing Provider",
      "Who's consuming ATM data",
      "Browse this section",
      "ATMs — Requirements",
      "ATMs — API Guide"
    ],
    "body": 'Banking · LFI capability ATMs 2 min read The ATM API allows LFIs to publish ATM location and service data to TPPs. It is a read-only, public-data API — no consent or user redirect is required. Access control Required role BDSP Bank Data Sharing Provider Access to the ATM API requires TPPs to hold the BDSP role. The API Hub validates the role on every request before proxying it to the LFI. Live ecosystem Who\'s consuming ATM data TPPs currently calling the ATM API across UAE Open Finance. liveTpps.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&family=atm" :title="`See all ${totalTppCount} TPPs`" > … + more Live data is currently unavailable. No TPPs are currently consuming the ATM API. 0" class="ed-landing__live-cta" href="/program/whats-live?type=tpp&family=atm" > liveTpps.length"> See all TPPs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the ATMs API. Requirements ATMs — Requirements Validation rules and behaviour your Ozone Connect ATM endpoint must follow. Open → API Guide ATMs — API Guide Implementation notes, payload structure, and worked examples. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "ATMs — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/atms/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · ATMs ATMs — API Guide 3 min read The ATM API exposes a single endpoint that returns all ATM records published by the LFI. This is open data — no customer consent…",
    "headings": [
      "ATMs — API Guide 3 min read",
      "Request headers",
      "Response"
    ],
    "body": "LFI · Banking · ATMs ATMs — API Guide 3 min read The ATM API exposes a single endpoint that returns all ATM records published by the LFI. This is open data — no customer consent is required. The Hub calls your Ozone Connect GET /atm endpoint whenever a TPP or public consumer requests ATM data for your institution. GET /atm Request headers Header Required Description o3-provider-id Yes Identifier for your LFI registered in the Hub o3-caller-org-id Yes Organisation ID of the TPP making the underlying request o3-caller-client-id Yes OIDC client ID of the TPP application o3-caller-software-statement-id Yes Software statement ID of the TPP application o3-api-uri Yes The parameterised URL of the API being called by the TPP o3-api-operation Yes The HTTP method of the operation carried out by the TPP (e.g. GET ) o3-ozone-interaction-id Yes Hub-generated interaction ID. Equals o3-caller-interaction-id if the TPP provided one o3-caller-interaction-id No Interaction ID passed in by the TPP, if present Response Content-Type: application/json Return 200 with a data array containing one record per ATM. Return an empty array if no ATMs are registered — do not return 404 . data[] — ATM record Required fields Field Type Description LFIId string Your LFI identifier as registered in the Hub (1–36 characters) LFIBrandId string Brand identifier for the LFI (1–140 characters) ATMId string Unique identifier for the ATM (1–36 characters) SupportedCurrencies string[] ISO 4217 currency codes the ATM dispenses or accepts (at least one required) Location object Physical location of the ATM — see below Location Both PostalAddress and GeoLocation are required. Field Type Required Description PostalAddress object Yes Structured postal address — see below GeoLocation object Yes GPS coordinates — see below LocationCategory string[] No One or more of: BranchExternal , BranchInternal , BranchLobby , RetailerOutlet , RemoteUnit , DriveThru , Other Site object No Identification and Name of the site PostalAddress Field Type Required Description AddressLine string[] Yes 1–7 free-form address lines TownName string No City or town CountrySubDivision string No UAE emirate: AbuDhabi , Dubai , Sharjah , Ajman , UmmAlQuwain , RasAlKhaimah , Fujairah Country string No ISO 3166-1 alpha-2 country code (e.g. AE ) StreetName string No Street name BuildingNumber string No Building number BuildingName string No Building name Floor string No Floor within the building DistrictName string No District or neighbourhood PostBox string No PO box AddressType string No Business or Other GeoLocation Field Type Required Description Latitude string Yes Latitude of the ATM Longitude string Yes Longitude of the ATM Optional fields Field Type Description SupportedLanguages string[] Languages supported on the ATM interface Services string[] Services available: Balance , BillPayments , CashDeposits , CharityDonation , ChequeDeposits , CashWithdrawal , EnvelopeDeposit , FastCash , MobileBankingRegistration , MobilePaymentRegistration , MobilePhoneTopUp , OrderStatement , PINActivation , PINChange , PINUnblock , MiniStatement , Other , or a namespaced extension value Accessibility string[] Accessibility features: AudioCashMachine , AutomaticDoors , ExternalRamp , InductionLoop , InternalRamp , LevelAccess , LowerLevelCounter , WheelchairAccess , Other IsAccess24Hour boolean Whether the ATM is accessible 24 hours Availability object Status ( Available , Unavailable , UnderMaintenance ) and OperatingHours (array of Days , OpenTime , CloseTime ) MinimumPossibleAmount object Minimum transaction amount ( Amount and Currency ) MaximumPossibleAmount object Maximum transaction amount ( Amount and Currency ) Branch object Associated branch identifier ( SchemeName : BICFI or Other , and Identification ) ATMFee array Fee records — each requires Type ; optionally includes Amount , Percentage , ApplicableNetworks , Conditions Notes string[] Free-text notes about the ATM Links object FeesUri — URL to a full fe"
  },
  {
    "title": "ATMs — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/atms/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "🕒 2 minute read ATMs — Requirements ::: info Coming soon This page will detail the requirements for implementing the ATM API. :::",
    "headings": [
      "ATMs — Requirements"
    ],
    "body": "🕒 2 minute read ATMs — Requirements ::: info Coming soon This page will detail the requirements for implementing the ATM API. :::"
  },
  {
    "title": "Attestation & Self Testing",
    "path": "/tech/lfi-api-hub/production/testing-certification/self-testing",
    "category": "LFI Integration",
    "section": "Production",
    "description": "🕒 2 minute read Attestation & Self Testing ::: info Coming soon This page will cover the self-testing and attestation process for production live proving. :::",
    "headings": [
      "Attestation & Self Testing"
    ],
    "body": "🕒 2 minute read Attestation & Self Testing ::: info Coming soon This page will cover the self-testing and attestation process for production live proving. :::"
  },
  {
    "title": "Authentication",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication/",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "LFI · Consent Journey · Authentication Authentication 3 min read When a TPP initiates a consent journey, the API Hub redirects the end user (Payment Services User) to the LFI's…",
    "headings": [
      "Authentication 3 min read",
      "Immediate authentication challenge",
      "Strong Customer Authentication",
      "Implementation Guide"
    ],
    "body": "LFI · Consent Journey · Authentication Authentication 3 min read When a TPP initiates a consent journey, the API Hub redirects the end user (Payment Services User) to the LFI's Authorization Endpoint so the end user can prove their identity. This is the authentication step — the end user demonstrates to the LFI that they are who they claim to be, using the same credentials and methods they use when accessing the LFI's own digital channels. Authentication is distinct from authorization , which is the subsequent step where the authenticated end user reviews and approves the consent (e.g. selecting accounts, confirming a payment). The following principles govern authentication in the Open Finance Framework: The LFI's Authorization Endpoint MUST support two scenarios based on the end user's device: Scenario Behaviour Both scenarios MUST be supported. The Authorization Endpoint is expected to directly open the native app when this is how end users typically interact with the LFI digitally. Immediate authentication challenge Whichever scenario applies, the authentication challenge MUST be the first thing the end user sees. No tap, button press, or intermediate screen may precede the challenge. Concretely: Channel What “immediate” means This requirement takes precedence over parity with the LFI's own digital channels. If the LFI's own mobile app or website requires the user to tap a login button before the authentication challenge is shown, that tap MUST NOT be present in the Open Finance journey — the end user has arrived from the TPP with explicit intent to authenticate and authorize, and any further action to initiate the challenge is redundant friction. Standards Strong Customer Authentication SCA requirements, prohibited methods, and CBUAE regulatory alignment. → Guide Implementation Guide Best-practice approaches for biometric authentication, device binding, and step-up flows. →"
  },
  {
    "title": "Authentication Requirements",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Authorization",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/authorization/",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "LFI · Consent Journey · Authorization Authorization 3 min read Once the end user has been authenticated , the LFI presents the consent details so the end user can review and…",
    "headings": [
      "Authorization 3 min read"
    ],
    "body": "LFI · Consent Journey · Authorization Authorization 3 min read Once the end user has been authenticated , the LFI presents the consent details so the end user can review and approve (or decline) the request. This is the authorization step — the end user makes an informed decision about granting the TPP access to their accounts or authorizing a payment. The exact content of the authorization page varies by consent type. Each consent type defines its own authorization page requirements in its User Experience section. The TPP creates a consent and receives a redirect URI from the API Hub The end user's device opens the LFI's Authorization Endpoint The LFI authenticates the end user using Strong Customer Authentication (SCA) The LFI presents the consent for authorization The LFI completes the interaction and redirects back to the TPP. The following principles govern authorization pages across all consent types: # Principle Detail 1 AlTareq branding The AlTareq logo and ecosystem branding MUST be displayed on every authorization page. The end user MUST be able to clearly identify that the authorization is part of the AlTareq Open Finance ecosystem. Action buttons and naming conventions related to AlTareq MUST be preserved. 2 Informed consent The authorization page MUST clearly explain what the end user is authorizing. All material details — such as the TPP name, data permissions, payment amounts, payee details, and consent duration — MUST be presented before the end user confirms. 3 Progress indication The authorization page MUST include a progress indicator showing the end user where they are in the consent journey (e.g. Consent > Authorize > Complete). 4 Consent-specific content The content of the authorization page MUST accurately reflect the consent type. For example, data-sharing consents present account selection and permission details, while payment consents present payee name, IBAN, amount, and payment schedule. 5 No obstacles LFIs MUST NOT use language, design, or interaction patterns that discourage the end user from granting consent. The authorization page MUST NOT steer the end user toward declining, introduce unnecessary friction, or present the consent in a misleading way. 6 Parity of experience The authorization experience MUST be consistent with the quality of the LFI's own digital channels. It MUST NOT load slower, use confusing language, or more obstructive than equivalent in-app interactions. 7 Clear actions The end user MUST be presented with unambiguous options to approve or decline the consent. The action to approve MUST be clearly labelled and easy to locate. 8 CX certification The authorization page MUST be submitted as part of CX certification prior to production. Any material changes to a production authorization page MUST be resubmitted for review and approval. The authorization page content varies depending on the type of consent being authorized. Refer to the User Experience page for each consent type for the specific authorization page requirements and interactive wireframes: Bank Data Sharing — Account selection and data permission review Single Instant Payment — Payment amount, payee, and Confirmation of Payee details Variable On Demand — Payment rules, creditor details, and maximum limits Fixed On Demand — Fixed amount per-payment details and creditor information Variable Periodic Schedule — Recurring payment schedule with variable amounts Fixed Periodic Schedule — Recurring payment schedule with fixed amounts Variable Defined Schedule — Pre-defined payment dates with variable amounts Fixed Defined Schedule — Pre-defined payment dates with fixed amounts Delegated SCA — Per-payment authentication with delegated consent"
  },
  {
    "title": "Authorization Endpoint",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Environment-Specific Authorization Endpoint 8 min read The Authorization Endpoint is the HTTPS URL to which the end user (customer) is redirected…",
    "headings": [
      "Authorization Endpoint 8 min read",
      "Required approach: Universal Links and App Links",
      "How verified deep linking works",
      "Fallback when the app is not installed",
      "What the LFI MUST support",
      "What the LFI MUST test",
      "App disambiguation"
    ],
    "body": "LFI · API Hub · Onboarding · Environment-Specific Authorization Endpoint 8 min read The Authorization Endpoint is the HTTPS URL to which the end user (customer) is redirected during consent authorisation flows. It is the entry point to the LFI's authentication and consent authorisation experience. The TPP constructs the redirect URL and sends the end user there directly — the API Hub does not perform this redirect. The URL MUST therefore be a stable, publicly accessible HTTPS endpoint that works reliably across all devices and browsers. You MUST provide one Authorization Endpoint URL per API Hub instance, per environment: Environment Example Pre-production https://openbanking-uat.example.com/authorize Production https://openbanking.example.com/authorize There is exactly one Authorization Endpoint URL per API Hub instance. During the consent authorisation flow: A TPP initiates a consent request via Pushed Authorization Request (PAR) to the API Hub. The API Hub creates the consent and returns a request_uri to the TPP. The TPP constructs the authorization URL and redirects the end user to your Authorization Endpoint . Your system calls GET /auth on the Headless Heimdall Auth Server, passing through the query parameters received from the redirect. Headless Heimdall validates the FAPI/OIDC request and returns the interaction context and decoded consent details. Your system authenticates the end user and presents the consent for approval. Your system calls doConfirm or doFail on the Headless Heimdall Auth Server with the result. The end user is redirected back to the TPP. The API Hub handles all FAPI 2.0 and OIDC protocol complexity through the Headless Heimdall Auth Server. Your Authorization Endpoint does not need to implement FAPI validation, token binding, or OIDC protocol logic directly — these are handled when you call GET /auth . Your endpoint's role is to receive the redirect, invoke GET /auth , authenticate the end user, and complete the consent journey. For full details on the authorization flow, see the Consent Journey API Guide . The Authorization Endpoint URL MUST: Use HTTPS — HTTP is not permitted Be a clean base URL with no query parameters — the TPP appends OIDC query parameters ( client_id , response_type , request_uri ) during the redirect Be accessible to end user browsers over the public internet Resolve to infrastructure owned and operated by the LFI Be stable — the URL MUST NOT change without coordinated reconfiguration of the API Hub instance The TPP constructs the full redirect URL in the following format: Where request_uri is the value returned from the API Hub's /par response. The Authorization Endpoint URL MUST be configured as a deep link that opens the LFI's native mobile app when it is installed on the end user's device. This is the primary authentication channel — most end users will authenticate via the LFI's mobile banking app. Required approach: Universal Links and App Links LFIs MUST use platform-verified deep linking mechanisms to associate the Authorization Endpoint URL with their native app: Platform Mechanism Verification file iOS Universal Links /.well-known/apple-app-site-association Android Android App Links /.well-known/assetlinks.json These mechanisms allow the operating system to verify that the LFI owns both the domain and the app, and to open the app directly when the end user navigates to the URL — without showing an intermediate browser page or disambiguation dialog. Custom URL schemes (e.g. mybank://authorize ) MUST NOT be used. Custom schemes are not verified by the operating system, meaning any app can register to handle the scheme. This creates a redirect interception risk where a malicious app could capture the authorization request. Only HTTPS-based verified deep links (Universal Links and App Links) are permitted. How verified deep linking works Both Universal Links (iOS) and App Links (Android) follow the same principle: The LFI hosts a verification file on the Authorization E"
  },
  {
    "title": "Authorization Requirements",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Bank Data Sharing",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · LFI capability Bank Data Sharing 2 min read The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These…",
    "headings": [
      "Bank Data Sharing 2 min read",
      "Bank Data Sharing Provider",
      "Endpoint & account type coverage",
      "Account subtypes by account type",
      "Endpoints by account subtype",
      "Who's consuming Account Information",
      "Browse this section",
      "Bank Data Sharing — Requirements",
      "Bank Data Sharing — API Guide",
      "Bank Data Sharing — User Journeys"
    ],
    "body": 'Banking · LFI capability Bank Data Sharing 2 min read The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These services empower licensed third-party providers (TPPs) to deliver account aggregation, financial management tools, lending assessments, and value-added digital services. Access control Required role BDSP Bank Data Sharing Provider Access to the Bank Data Sharing APIs requires TPPs to hold the BDSP role. The API Hub validates the role on every request before proxying it to the LFI. Coverage matrix Endpoint & account type coverage Not all endpoints are expected to be delivered for every account subtype, and not all account subtypes are available for every account type. Account subtypes by account type AccountSubType Retail SME Corporate CurrentAccount ✓ ✓ ✓ Savings ✓ ✓ ✓ CreditCard ✓ — — Finance ✓ — — Mortgage ✓ — — Endpoints by account subtype Endpoint CurrentAccount Savings CreditCard Finance Mortgage GET /accounts ✓ ✓ ✓ ✓ ✓ GET /accounts/{AccountId} ✓ ✓ ✓ ✓ ✓ GET /accounts/{AccountId}/balances ✓ ✓ ✓ ✓ ✓ GET /accounts/{AccountId}/transactions ✓ ✓ ✓ ✓ ✓ GET /accounts/{AccountId}/statements ✓ ✓ ✓ ✓ ✓ GET /accounts/{AccountId}/products ✓ ✓ ✓ ✓ ✓ GET /customer ✓ ✓ ✓ ✓ ✓ GET /accounts/{AccountId}/customer ✓ ✓ ✓ ✓ ✓ GET /accounts/{AccountId}/beneficiaries ✓ ✓ — — — GET /accounts/{AccountId}/direct-debits ✓ ✓ — — — GET /accounts/{AccountId}/scheduled-payments ✓ ✓ — — — GET /accounts/{AccountId}/standing-orders ✓ ✓ — — — Live ecosystem Who\'s consuming Account Information TPPs currently consuming Account Information data across UAE Open Finance. liveTpps.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&family=account-information" :title="`See all ${totalTppCount} TPPs`" > … + more Live data is currently unavailable. No TPPs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?type=tpp&family=account-information" > liveTpps.length"> See all TPPs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Bank Data Sharing API. Requirements Bank Data Sharing — Requirements Validation rules and behaviour your Ozone Connect Bank Data Sharing endpoints must follow. Open → API Guide Bank Data Sharing — API Guide Implementation notes, payload structure, pagination, and worked examples. Open → User Journeys Bank Data Sharing — User Journeys The end-to-end flows your customer experiences when sharing data through a TPP. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "Bank Data Sharing - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Data Sharing · UX Bank Data Sharing — User Experience 2 min read When a customer is redirected to you to authorize an Open Finance consent for data sharing, you must…",
    "headings": [
      "Bank Data Sharing — User Experience 2 min read"
    ],
    "body": "Banking · Data Sharing · UX Bank Data Sharing — User Experience 2 min read When a customer is redirected to you to authorize an Open Finance consent for data sharing, you must present an Authorization Page that clearly explains what the customer is authorizing. The page must collect the customer's explicit and informed consent, and it must accurately reflect the scope and nature of the data being shared. The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the consent content. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the consentBody object below and watch the wireframes above update live. Try changing permissions, account types, date ranges, or the TPP name to see how the pages respond, or pick one of the scenarios beside the editor to load a preset consent."
  },
  {
    "title": "Bank Data Sharing — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Bank Data Sharing Bank Data Sharing — API Guide 12 min read Bank Data Sharing lets a TPP retrieve a customer's account list, account details, balances,…",
    "headings": [
      "Bank Data Sharing — API Guide 12 min read",
      "After the consent is authorized",
      "Field population",
      "Common request headers",
      "Common error responses",
      "Pagination",
      "Request headers",
      "Query parameters",
      "Response",
      "Request headers",
      "Path parameters",
      "Response"
    ],
    "body": "LFI · Banking · Bank Data Sharing Bank Data Sharing — API Guide 12 min read Bank Data Sharing lets a TPP retrieve a customer's account list, account details, balances, transactions, statements, beneficiaries, direct debits, scheduled payments, standing orders, products, and customer details from your LFI via the API Hub. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve TPP requests. The behavioural rules for each endpoint — including account status handling, required field population, and AccountSubType coverage — are in the Bank Data Sharing Requirements . This guide covers the request and response shape of each endpoint. To see what the TPP receives for each field you return — and which consent permission exposes it — see the Field Mapping pages, one per endpoint, starting with GET /accounts . Before implementing Bank Data Sharing, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A Bank Data Sharing request cannot be served without an authorized consent, so GET /auth , GET /consents/{consentId} , PATCH /consents/{consentId} , POST /auth/{interactionId}/doConfirm , and POST /auth/{interactionId}/doFail must already be in place. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . During consent creation, if your LFI has configured the POST /consent/action/validate endpoint, the API Hub forwards the full consent payload to your Ozone Connect server before the consent is created. The request and response shape, and the overall placement of this call in the consent lifecycle, are covered in the Consent Journey API Guide — Validate the consent . For Bank Data Sharing consents ( consentType: cbuae-account-access-consents ), your LFI MUST respond with data.status: invalid in the cases listed in Bank Data Sharing Requirements — Consent Validation . If the validate endpoint is not configured, the API Hub assumes all consents are valid and creates them immediately — those checks then cannot be enforced. Configuring the endpoint is strongly recommended for Bank Data Sharing. Once the consent has been created, the TPP redirects the customer to your LFI's authorization endpoint — the URL you registered during API Hub onboarding. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the authorized accounts and customer identifier onto the consent, and redirect back to the Hub. The endpoints your LFI implements against the API Hub for this flow are: Endpoint Direction Purpose GET /auth LFI → API Hub Initiate the authorization interaction GET /consents/{consentId} LFI → API Hub Retrieve the full consent details PATCH /consents/{consentId} LFI → API Hub Update consent status, customer identifiers, and account IDs POST /auth/{interactionId}/doConfirm LFI → API Hub Complete the interaction and redirect back to the TPP successfully POST /auth/{interactionId}/doFail LFI → API Hub Complete the interaction and redirect back to the TPP with a failure Full details are in the Consent Journey API Guide . After the consent is authorized Every request the TPP makes to the API Hub's resource server — for example, https://rs1.LFICODE.apihub.openfinance.ae/open-finance/account-information/v2.1/accounts — MUST carry an access token bound to the authorized consent. The API Hub then performs the following checks before any traffic reaches your LFI: Validates the access token Validates that the consent is in Authorised status Validates that the consent grants access to the requested resource — e.g. ReadAccountsBasic or ReadAccountsDetail is required to call GET /open-finance/account-information/v2.1/accounts For endpoints scop"
  },
  {
    "title": "Bank Data Sharing — Encrypted FinanceRates",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/finance-rates",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Bank Data Sharing · API Guide Encrypted FinanceRates 7 min read When a TPP holds the ReadProductFinanceRates permission and calls GET /accounts/{AccountId}/product…",
    "headings": [
      "Encrypted FinanceRates 7 min read",
      "How to read the permission",
      "Message content requirements",
      "Message template",
      "Example SMS as the customer receives it",
      "Resulting protected header (decoded)",
      "JWT-style expiry inside the JWE payload",
      "The limits",
      "The 429 response"
    ],
    "body": "LFI · Banking · Bank Data Sharing · API Guide Encrypted FinanceRates 7 min read When a TPP holds the ReadProductFinanceRates permission and calls GET /accounts/{AccountId}/product for a credit card, finance, or mortgage product, the LFI MAY return the FinanceRates field as a JWE rather than a cleartext object. This guide covers how to generate the one-time code, deliver it to the customer, build the JWE, and rate-limit the endpoint so the customer's encrypted rates remain protected end-to-end. The FinanceRates field on GET /accounts/{AccountId}/product is defined as anyOf a structured AEProductFinanceRates object or an AEJwe compact string. LFIs MAY decide, per product, whether to return the rate in cleartext or as a JWE. Encryption is typically applied to credit cards, finance accounts, and mortgages where the finance rate is commercially sensitive; deposit account interest rates are returned in cleartext. The LFI MUST NOT encrypt any field other than FinanceRates on this endpoint. Charges , DepositRates , ProductName , Tenor , and every other property stay cleartext on both the encrypted and unencrypted shapes. The LFI MUST NOT encrypt any data from any other Open Finance endpoint — this mechanism exists solely for FinanceRates on GET /accounts/{AccountId}/product . A single LFI MAY choose to encrypt for some product types and not others. The TPP detects the shape at runtime by checking whether FinanceRates is an object or a string — the LFI does not need to advertise its choice ahead of time. Generate a one-time code (OTP) — a fresh, cryptographically random numeric code, scoped to this single call. Deliver the OTP to the customer — the LFI actively pushes the code to the customer on a channel it controls (SMS, email, or a push notification in the LFI's mobile banking app). The customer is sent the code; they never have to go and retrieve it. Encrypt the cleartext FinanceRates as a JWE with the OTP as the password and substitute the JWE string for the cleartext object in the response body. The cleartext rates never leave the LFI. Because the OTP is the decryption key, the customer reading the code the LFI sent them and typing it into the TPP application is exactly what makes the rate visible. The TPP server never sees the OTP, and the LFI never sees the TPP's decryption code. The customer is the only party that holds both the JWE (via the TPP) and the key (delivered by the LFI). Before doing anything else — before deciding to encrypt, before generating an OTP, before delivering the code, before building a JWE — the LFI MUST check that the consent underlying this request includes ReadProductFinanceRates . If the permission is absent, the LFI MUST omit the FinanceRates field from the response entirely. The rest of the product payload ( Charges , DepositRates , ProductName , etc.) is returned as usual. How to read the permission The API Hub sets the o3-consent-id header on every Ozone Connect call made under a consent. That ID identifies the consent the customer authorised; the LFI's job is to retrieve the consent, read the Permissions array off it, and check that ReadProductFinanceRates is present. The LFI does NOT re-validate the access token — that is the Hub's responsibility. There are two valid ways to obtain the consent record. Pick whichever fits your architecture; both are first-class: Option How it works When to choose it A — Local consent store The LFI persists consent records locally as the Hub calls /consent/event/{operation} during the consent-events flow at authorization. At request time the LFI looks up the consent by ID in its own store. You already maintain a consent table for revocation handling, account-list patching, or customer attribution. Lowest per-request latency. B — Fetch from the Hub The LFI calls GET /consents/{consentId} on the Hub's Consent Manager ( https://cm.{LFICODE}.apihub.openfinance.ae ) to fetch the consent on demand. The response includes the Permissions array. You do not maintain a loca"
  },
  {
    "title": "Bank Data Sharing — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Bank Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here?…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Bank Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Bank Data Sharing — Pagination",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Bank Data Sharing Pagination 2 min read Pagination for Bank Data Sharing endpoints is page-based on the LFI (Ozone Connect) side. The API Hub converts the LFI's…",
    "headings": [
      "Pagination 2 min read",
      "Example — transactions, page 2 of 12"
    ],
    "body": "LFI · Banking · Bank Data Sharing Pagination 2 min read Pagination for Bank Data Sharing endpoints is page-based on the LFI (Ozone Connect) side. The API Hub converts the LFI's page/meta response into the Links envelope returned to the TPP. For the end-to-end picture — including how the Hub converts LFI meta into TPP Links — see Pagination — LFI meta to TPP Links . Endpoint Pagination GET /accounts/{accountId}/transactions Required GET /accounts/{accountId}/statements Required GET /accounts Optional GET /accounts/{accountId}/balances Optional GET /accounts/{accountId}/beneficiaries Optional GET /accounts/{accountId}/direct-debits Optional GET /accounts/{accountId}/scheduled-payments Optional GET /accounts/{accountId}/standing-orders Optional GET /accounts/{accountId}/products Optional GET /accounts/{accountId}/customer Optional Transactions and statements span long history (at least two years) and routinely produce large result sets — pagination is required so responses remain bounded. For other list endpoints, LFIs MAY paginate where result sets warrant it, or return all matching records in a single response. The Hub sends page and page-size as query parameters on every paginated request: Parameter Type Default Description page integer 1 1-indexed page number page-size integer 100 Number of records per page The LFI MUST return the slice of the result set that corresponds to page and page-size . Filtering (e.g. fromBookingDateTime / toBookingDateTime for transactions) is applied first ; pagination is applied to the filtered result set. The LFI indicates the pagination state in the response meta object: Field Type Description paginated boolean true if the response is paginated. false or omitted if the full result set is returned in a single response totalPages integer The total number of pages in the full result set, given the current page-size totalRecords integer The total number of records in the full result set across all pages totalPages and totalRecords MUST reflect the filtered result set — not the whole table. If a transaction query filters by date range, totalRecords is the count of transactions in that range, and totalPages is ceil(totalRecords / page-size) . Example — transactions, page 2 of 12 Request: Response: The Hub uses totalPages to construct Links.First , Links.Prev , Links.Next , and Links.Last on the TPP-facing response, and surfaces totalPages in the TPP's Meta . See the Pagination KB article for the full conversion. The diagram below traces a three-page transactions query between the TPP, Hub, and your Ozone Connect endpoint. The TPP makes a single unparameterised request and follows Links.Next on each response; the Hub translates each call into a page / page-size request sent to your Ozone Connect GET /accounts/{accountId}/transactions endpoint and converts your meta back into the TPP's Links envelope. If filtering yields no records, return 200 with an empty data array and: Do not return 404 for an empty filtered result. The LFI MUST return records in a deterministic order so that pagination is stable across successive page requests. For transactions and statements, newest-first (descending bookingDateTime / statementDate ) is recommended. If new records arrive between page requests, the LFI SHOULD ensure the same record is not returned on two different pages of the same logical query."
  },
  {
    "title": "Bank Data Sharing — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Banking",
    "path": "/tech/lfi-api-hub/v2.1/banking/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI Standards · v2.1 · Banking Banking 2 min read The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification —…",
    "headings": [
      "Banking 2 min read",
      "Which TPPs are consuming Banking APIs",
      "Browse the Banking capabilities"
    ],
    "body": 'LFI Standards · v2.1 · Banking Banking 2 min read The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification — empowering third-party providers (TPPs) with the tools they need to enhance user experience and financial services. All services operate under strict consent management and granular data access permissions, mediated and validated by the API Hub. Live ecosystem Which TPPs are consuming Banking APIs TPPs currently calling Banking endpoints — across data sharing, payments, CoP, products, and ATMs — in the last 30 days. liveTpps.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp" :title="`See all ${totalTppCount} TPPs`" > … + more Live data is currently unavailable. No TPPs are currently consuming Banking APIs. 0" class="ed-landing__live-cta" href="/program/whats-live?type=tpp" > liveTpps.length"> See all TPPs in the live ecosystem View in the live ecosystem dashboard → Capabilities Browse the Banking capabilities The full set of capability areas an LFI implements as part of UAE Open Finance Banking. Open →'
  },
  {
    "title": "CAAP",
    "path": "/tech/lfi-api-hub/v2.1/caap/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · CAAP Central Authentication and Authorization Platform 3 min read CAAP is a Nebras-operated platform that handles the customer-facing authentication and consent…",
    "headings": [
      "Central Authentication and Authorization Platform 3 min read",
      "Where to go next"
    ],
    "body": "LFI · CAAP Central Authentication and Authorization Platform 3 min read CAAP is a Nebras-operated platform that handles the customer-facing authentication and consent authorisation experience on behalf of an LFI. When a TPP creates a consent and the end user is redirected for authentication and authorisation, a CAAP-adopting LFI sends the end user to CAAP rather than to an LFI-operated authorization endpoint. CAAP authenticates the end user (via EFR or UAE Pass), presents the consent for approval, and completes the interaction with the API Hub on the LFI's behalf. CAAP also presents the consent management interface end users use to review and revoke their consents. The LFI does not build or operate either of these experiences. The LFI's integration with CAAP is server-to-server only: CAAP calls a set of CAAP Operations endpoints on the LFI's Ozone Connect server to drive identification, validation, and account / policy selection against the LFI's systems of record. Adopting CAAP removes two substantial pieces of Open Finance delivery from the LFI's scope. The documentation for these areas remains in this site for LFIs that operate their own implementations, but is not applicable if you adopt CAAP: Capability Who delivers it without CAAP Who delivers it with CAAP Authentication and consent authorisation UX LFI — see Consent Journey → Authentication and Authorization Endpoint . CAAP Consent Management Interface LFI — see Consent Management Interface . CAAP Headless Heimdall and Consent Manager integration LFI — see Headless Heimdall and Consent Manager . CAAP The LFI MUST still implement its Ozone Connect endpoints for Bank Data Sharing , Bank Service Initiation , Insurance Data Sharing , and the other Ozone Connect APIs. CAAP handles authentication and consent, not data and payments. In addition, the LFI MUST implement the CAAP Operations APIs documented in this section so that CAAP can drive end user verification, registration, PII decryption, and consent validation against the LFI's own systems of record. Browse this section Where to go next Open →"
  },
  {
    "title": "CAAP - API Guide",
    "path": "/tech/lfi-api-hub/v2.1/caap/api-guide",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · CAAP · API Guide CAAP Operations API Guide 10 min read When an LFI adopts CAAP, the end user's authentication and consent authorisation experience is delivered by CAAP…",
    "headings": [
      "CAAP Operations API Guide 10 min read",
      "Encryption with the LFI's ENC1 key",
      "The LFI MUST return providerUserIdentifier.userId on the initial response",
      "Optional challenge"
    ],
    "body": "LFI · CAAP · API Guide CAAP Operations API Guide 10 min read When an LFI adopts CAAP, the end user's authentication and consent authorisation experience is delivered by CAAP rather than by the LFI. CAAP drives that experience by calling endpoints on the LFI's Ozone Connect server. This guide walks the end-to-end flow and focuses on what is different about the CAAP path — from the redirect into CAAP, through registration and account or policy selection, to the final redirect back to the TPP. These endpoints are called on the LFI's Ozone Connect server. They use the same base URL, mTLS, and (where configured) JWT authentication as the LFI's other Ozone Connect surfaces — see Ozone Connect Base URL . Endpoint Direction Purpose POST /consent/actions/validate API Hub → LFI LFI validates the consent at PAR time; gates whether the consent is created and the request_uri is returned to the TPP. POST /users/actions/register/initialize CAAP → LFI Identify the end user at the LFI from an encrypted Emirates ID; return the end user's LFI userId. POST /users/actions/register/complete CAAP → LFI Complete registration after the end user has answered the LFI's OTP challenge. GET /accounts CAAP → LFI Return every account the end user can share or initiate from, depending on the use case. GET /{type}-insurance-policies CAAP → LFI Return every insurance policy of the given type the end user can share. CAAP also calls the API Hub's Headless Heimdall and Consent Manager at the end of the journey to patch the consent and complete the interaction. The LFI does not implement those — the API Hub does — but they appear in the sequence flow below for completeness. The journey begins with the standard POST /par flow — including the API Hub's gating call to POST /consent/actions/validate on the LFI before the consent is created. See Consent Journey — API Guide for the full mechanics; nothing about this step changes for CAAP-adopting LFIs. Once the TPP has the request_uri , it redirects the end user to the API Hub's authorize URL. The API Hub recognises that this LFI is configured for CAAP and redirects the end user on to CAAP rather than to an LFI-operated authorization endpoint — this is the first point at which CAAP differs from the LFI-operated flow. CAAP authenticates the end user using EFR or UAE Pass . This step does not involve the LFI — CAAP integrates with the national identity rails directly. The end user's Emirates ID is established as a result. Once CAAP has the end user's Emirates ID, it calls POST /users/actions/register/initialize on the LFI's Ozone Connect server. The request body carries the Emirates ID encrypted — never in cleartext. Encryption with the LFI's ENC1 key CAAP encrypts the Emirates ID using the LFI's ENC1 public key — the same server-side encryption key referenced in Keys & Certificates . The LFI MUST decrypt the payload using the corresponding ENC1 private key. The LFI MUST return providerUserIdentifier.userId on the initial response Regardless of whether the LFI subsequently issues a challenge, the response to register/initialize MUST contain the LFI's identifier for the end user on data.providerUserIdentifier.userId . CAAP uses this identifier from that point on, including the psuIdentifiers.userId it patches onto the consent at the end of the journey — it MUST be identical across all of those uses, and MUST satisfy the opacity rules described in Consent Journey — Identifier requirements . The userId the LFI returns is stored centrally by the API Hub. It MUST be opaque, non-sensitive, and LFI-defined — never an Emirates ID, passport number, email, phone number, CIF, account number, or any other PII. Use an internal customer reference, a UUID, or another opaque token. Optional challenge The LFI may choose to issue its own challenge before registration is final — typically an OTP sent over the LFI's usual SCA channel. To do so, the LFI responds with registrationStatus set to AwaitingChallengeResponse and a challengeId alongsi"
  },
  {
    "title": "CAAP - Pricing",
    "path": "/tech/lfi-api-hub/v2.1/caap/pricing",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · CAAP · Pricing Pricing 2 min read CAAP is a Nebras-operated service offered to LFIs as an alternative to building their own authentication, consent authorisation, and…",
    "headings": [
      "Pricing 2 min read"
    ],
    "body": "LFI · CAAP · Pricing Pricing 2 min read CAAP is a Nebras-operated service offered to LFIs as an alternative to building their own authentication, consent authorisation, and consent management interface. This page describes how CAAP is charged and what is included. CAAP commercial terms are being finalised between Nebras and the participating LFIs. This page is a placeholder; the published pricing will appear here once agreed. In the meantime, LFIs evaluating CAAP should contact Nebras via the Service Desk for an indicative quote. For LFIs that adopt CAAP, the following are delivered by Nebras as part of the CAAP service: The end user-facing authentication and consent authorisation experience — web and (where applicable) mobile. The end user-facing consent management interface, including consent review and revocation. Integration with the API Hub's Headless Heimdall and Consent Manager — the LFI does not call these directly. Language and accessibility support for the CAAP screens. Operational support, monitoring, and incident management for the CAAP service. CAAP does not change the LFI's responsibility to deliver the Ozone Connect APIs that underpin the Open Finance services it offers to TPPs. The following remain in scope for the LFI regardless of whether CAAP is adopted: The Ozone Connect endpoints for Bank Data Sharing , Bank Service Initiation , Insurance Data Sharing , Products & Leads, Confirmation of Payee, and ATMs. The LFI's Consent Events handlers for receiving consent lifecycle notifications from the API Hub. The new CAAP Operations endpoints documented in this section — user verification, registration, PII decryption, consent validation, and the CAAP-specific accounts and insurance policy GETs. Underlying LFI infrastructure: authentication systems, customer records, account systems, payment rails, fraud and risk checks. LFIs declare whether they intend to adopt CAAP when completing the Prerequisites Questionnaire . Reach out via the Service Desk to discuss commercials and the implementation plan for the CAAP Operations APIs."
  },
  {
    "title": "CAAP - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/caap/user-experience",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · CAAP · User Experience User Experience 5 min read When an LFI adopts CAAP, the end user's authentication and consent authorisation experience is delivered by CAAP — not by…",
    "headings": [
      "User Experience 5 min read"
    ],
    "body": "LFI · CAAP · User Experience User Experience 5 min read When an LFI adopts CAAP, the end user's authentication and consent authorisation experience is delivered by CAAP — not by an LFI-operated application. This page describes what the end user sees, where the LFI is still on the path, and what is and is not the LFI's responsibility across the journey. The journey starts in the TPP application. After the TPP requests a consent via POST /par against the API Hub, the TPP redirects the end user to the API Hub authorization endpoint with the returned request_uri . From there, the API Hub redirects the end user into CAAP for authentication and consent approval. Without CAAP, the API Hub redirects the end user to the LFI's Authorization Endpoint , and the LFI authenticates and authorises the end user using its own mobile app or web journey, calling Headless Heimdall and the Consent Manager. With CAAP, the API Hub redirects to CAAP, and the LFI no longer operates that experience. The image below shows the full end user experience after the TPP creates the consent and the API Hub redirects the end user to a CAAP-using LFI — from EFR / UAE Pass authentication, through OTP and consent review, to the authorization page itself. The authorization page shown is the Bank Data Sharing variant. CAAP renders a different authorization page for each consent type — the same surrounding journey (authenticate, register, review, confirm), with a layout suited to what the end user is consenting to. For comparison, see the equivalent journeys for Bank Service Initiation and Insurance Data Sharing . CAAP renders a consistent authentication and consent journey across LFIs that adopt it. The end user progresses through the following stages: Identify. The end user provides identifying details (e.g. Emirates ID or other LFI-recognised identifiers). Challenge. CAAP issues a challenge against the LFI — calling the LFI's /users/actions/challenge/initialize and /users/actions/challenge/complete CAAP Operations endpoints — so the LFI's authentication system verifies the end user. Review consent. CAAP displays the requested consent (permissions, expiry, accounts, payment details where applicable). For consents carrying encrypted PII, CAAP calls the LFI's /users/actions/pii/decrypt endpoint to display cleartext to the end user. Select accounts or policies. Where the consent requires selecting accounts or insurance policies, CAAP retrieves them via the LFI's CAAP-specific /accounts , /accounts/{accountId} , and /{type}-insurance-policies endpoints. Validate. Before completion, CAAP calls the LFI's /consent/actions/validate endpoint. If validation fails, the journey ends with the user-facing message returned by the LFI. Confirm. The end user confirms the consent; CAAP completes the interaction with the API Hub, and the API Hub redirects the end user back to the TPP. After the consent is authorised, the end user manages the consent in CAAP — not in the LFI's own consent management interface. CAAP exposes the list of active consents, their permissions and expiry, and the ability to revoke them. Revocations are propagated to the API Hub (the consent source of truth) and from there back to the LFI via the existing Ozone Connect Consent Events path. The LFI's own Consent Management Interface requirements and UX guidance are not applicable when the LFI adopts CAAP — CAAP delivers that interface."
  },
  {
    "title": "Certificate Walkthroughs",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Environment-Specific Certificate Walkthroughs 4 min read This page provides step-by-step walkthroughs for creating certificates required during…",
    "headings": [
      "Certificate Walkthroughs 4 min read",
      "Prerequisites",
      "Steps",
      "What happens next",
      "Prerequisites",
      "Step 1 — Generate the private key and CSR",
      "Step 2 — Upload the CSR to the Trust Framework",
      "Step 3 — Record the KID and JWKS URL",
      "Step 4 — Deploy the certificate"
    ],
    "body": "LFI · API Hub · Onboarding · Environment-Specific Certificate Walkthroughs 4 min read This page provides step-by-step walkthroughs for creating certificates required during environment-specific onboarding . Two representative examples are covered: S1 — an Ozone-held certificate where the LFI uploads a CSR provided by Ozone S4 — an LFI-held certificate where the LFI generates the key, CSR, and certificate The same patterns apply to the other certificates listed in the Environment Specific Configuration — refer to that page to determine which process applies to each certificate. S1 identifies the LFI's API Hub instance to TPPs. Ozone holds the private key and generates the CSR. The LFI uploads the CSR to their Trust Framework organisation to generate the certificate. Prerequisites You have received the S1 CSR file from Ozone (provided via the Service Desk ticket). You are signed in to the correct Trust Framework directory: Pre-production → Sandbox Trust Framework ( web.sandbox.directory.openfinance.ae ) Production → Production Trust Framework ( web.directory.openfinance.ae ) Steps Navigate to your Organisation in the Trust Framework. Open the Organisation Certificates section. Click + New Certificate . Select OPF UAE SERVER TRANSPORT as the certificate type. Set the description to S1 - Ozone holds Private Key - TPP-APIHub Skip the step to generate the private key and CSR. Upload the CSR provided by Ozone. The Trust Framework will generate the certificate. Once complete, the certificate detail page will display: The Key ID (KID) — copy this value exactly as shown (it is case-sensitive). The JWKS URL — this is your organisation's transport JWKS URL. Provide the KID and JWKS URL back to Ozone via the Service Desk ticket. Your organisation's transport JWKS URL follows this pattern: You can also find it on the Organisation Certificates page in the Trust Framework. What happens next Ozone will install the certificate (paired with the private key they hold) onto the API Hub servers. TPPs connecting to your API Hub instance will see this certificate during the TLS handshake. S4 identifies the LFI's Ozone Connect server to the API Hub. The LFI holds the private key and is responsible for generating the key, CSR, and certificate. Prerequisites You have your organisation's Legal Name and Organisation ID from the Trust Framework. You are signed in to the correct Trust Framework directory: Pre-production → Sandbox Trust Framework ( web.sandbox.directory.openfinance.ae ) Production → Production Trust Framework ( web.directory.openfinance.ae ) Step 1 — Generate the private key and CSR Generate a 2048-bit RSA private key and a SHA-256 signed CSR. The CSR subject fields MUST match your Trust Framework organisation details: Replace: <LegalName> with your organisation's legal name as it appears in the Trust Framework <OrganisationId> with your organisation's ID from the Trust Framework The OpenSSL command shown is for demonstration. In production, private key generation and CSR creation MUST be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies. Store the .key file securely — it MUST never be shared. See Secure Management for requirements. Step 2 — Upload the CSR to the Trust Framework Navigate to your Organisation in the Trust Framework. Open the Organisation Certificates section. Click + New Certificate . Select OPF UAE SERVER TRANSPORT as the certificate type. Set the description to S4 - I hold Private Key - APIHub-OzoneConnect Click Next . Upload the .csr file generated in Step 1. Step 3 — Record the KID and JWKS URL Once the Trust Framework processes the CSR: The certificate detail page will display the Key ID (KID) — copy this value exactly (case-sensitive). Note your organisation's transport JWKS URL . Provide the KID and JWKS URL to Ozone via the Service Desk ticket. Your organisation's transport JWKS URL follows this pattern: You can also find it on the Org"
  },
  {
    "title": "Client Signing Certificate",
    "path": "/tech/lfi-api-hub/trust-framework/certificates/client-signing",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework · Certificates Client Signing Certificate 2 min read The Signing Certificate is used to digitally sign JWTs that your application sends — including Client…",
    "headings": [
      "Client Signing Certificate 2 min read",
      "Generating Your Signing Certificate",
      "Using the Signing Key"
    ],
    "body": "Trust Framework · Certificates Client Signing Certificate 2 min read The Signing Certificate is used to digitally sign JWTs that your application sends — including Client Assertions, PAR Request JWTs, and any other signed payloads. Purpose Proving integrity and authenticity of signed payloads Usage Signing the contents of JWTs Required Yes Every signed JWT must include a kid header referencing this certificate's Key ID, so that the receiving party can look up your public key in the Trust Framework and verify the signature. Generating Your Signing Certificate Follow the Keys & Certificates guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate. When selecting the certificate type during generation, choose Signing . Using the Signing Key The Key ID ( kid ) of your signing certificate must be included in the JWT header for every signed request. See Finding Your Key ID and Message Signing for full details on how this value is used."
  },
  {
    "title": "Client Transport Certificate",
    "path": "/tech/lfi-api-hub/trust-framework/certificates/client-transport",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework · Certificates Client Transport Certificate 2 min read The Transport Certificate is used for mutual TLS (mTLS) to authenticate your application when making API…",
    "headings": [
      "Client Transport Certificate 2 min read",
      "Generating Your Transport Certificate"
    ],
    "body": "Trust Framework · Certificates Client Transport Certificate 2 min read The Transport Certificate is used for mutual TLS (mTLS) to authenticate your application when making API requests to LFIs. Purpose Secure transport and client authentication Usage mTLS handshake for all API calls Presented to API providers during every connection Required Yes All API calls you make as a TPP must present this certificate. Without it, LFI endpoints will reject the connection before any request is processed. Generating Your Transport Certificate Follow the Keys & Certificates guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate. When selecting the certificate type during generation, choose Transport . Using the kid Once issued, note the Key ID ( kid ) from the certificate detail page — you will need it when configuring your mTLS client. See Finding Your Key ID ."
  },
  {
    "title": "CMI — Bank Data Sharing Requirements",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "CMI — Bank Data Sharing User Experience",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/user-experience",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "LFI · CMI · Bank Data Sharing · UX Bank Data Sharing — User Experience 2 min read The LFI Consent Management Interface for Bank Data Sharing consents. Customers see all third…",
    "headings": [
      "Bank Data Sharing — User Experience 2 min read",
      "Configure simulated consents and watch the preview respond"
    ],
    "body": "LFI · CMI · Bank Data Sharing · UX Bank Data Sharing — User Experience 2 min read The LFI Consent Management Interface for Bank Data Sharing consents. Customers see all third party providers connected to their accounts, the data permissions they have granted, and can cancel a connection at any time. While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval. The component below shows the LFI Connections page filtered to Data Sharing consents. Tap any consent card to open its details and manage it. Configure simulated consents and watch the preview respond Use the editor below to add, remove, and adjust the simulated consents. Every change is reflected immediately in the preview above. Example"
  },
  {
    "title": "CMI — Bank Service Initiation Requirements",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "CMI — Bank Service Initiation User Experience",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/user-experience",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "LFI · CMI · Bank Service Initiation · UX Bank Service Initiation — User Experience 2 min read The LFI Consent Management Interface for Bank Service Initiation (payment) consents.…",
    "headings": [
      "Bank Service Initiation — User Experience 2 min read",
      "Configure simulated consents and watch the preview respond"
    ],
    "body": "LFI · CMI · Bank Service Initiation · UX Bank Service Initiation — User Experience 2 min read The LFI Consent Management Interface for Bank Service Initiation (payment) consents. Customers see the single payments and Flexi Pay (multi-payment) permissions they have granted to third party providers, the payer and payee details, and can cancel an active permission at any time. While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval. The component below shows the LFI Connections page filtered to payment consents. Tap any consent card to open its details and manage it. Configure simulated consents and watch the preview respond Use the editor below to add, remove, and adjust the simulated consents. Every change is reflected immediately in the preview above. Example"
  },
  {
    "title": "CMI — Insurance Data Sharing Requirements",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "CMI — Insurance Data Sharing User Experience",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/user-experience",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "LFI · CMI · Insurance Data Sharing · UX Insurance Data Sharing — User Experience 2 min read The LFI Consent Management Interface for Insurance Data Sharing consents. Customers see…",
    "headings": [
      "Insurance Data Sharing — User Experience 2 min read",
      "Configure simulated consents"
    ],
    "body": "LFI · CMI · Insurance Data Sharing · UX Insurance Data Sharing — User Experience 2 min read The LFI Consent Management Interface for Insurance Data Sharing consents. Customers see all third party providers connected to their insurance policies, the data permissions they have granted, and can cancel a connection at any time. While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval. The component below shows the LFI Connections page for insurance consents. Tap any consent card to open its details and manage it. Each consent shows the policies of a given insurance type the customer has shared with a third party provider. Configure simulated consents Use the editor below to add, remove, and adjust the simulated insurance consents. Every change is reflected immediately in the preview above."
  },
  {
    "title": "Complete a User Challenge",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-challenge-complete",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Complete a User Challenge",
    "headings": [],
    "body": ""
  },
  {
    "title": "Complete User Registration",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Complete User Registration",
    "headings": [],
    "body": ""
  },
  {
    "title": "Configuring Inbound mTLS",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Configuring Auth Configuring Inbound mTLS 5 min read This page describes how the LFI MUST configure inbound mutual TLS (mTLS) on its Ozone Connect…",
    "headings": [
      "Configuring Inbound mTLS 5 min read",
      "Production",
      "Pre-production",
      "3a. Trust the CA bundle",
      "3b. Pin to the API Hub's C4 client"
    ],
    "body": "LFI · API Hub · Onboarding · Configuring Auth Configuring Inbound mTLS 5 min read This page describes how the LFI MUST configure inbound mutual TLS (mTLS) on its Ozone Connect server so that calls from the API Hub are authenticated and all other calls are rejected. Every request the API Hub sends to the LFI is a mutual TLS connection in which the API Hub presents the C4 transport client certificate. The LFI's Ozone Connect server — or whichever component terminates TLS in front of it (reverse proxy, load balancer, WAF, API gateway) — MUST be configured to: Require a client certificate on every inbound connection, and Trust certificates signed by the Trust Framework Issuing CA for the relevant environment. Without this: If the server accepts connections that do not present a client certificate, unauthenticated callers reach Ozone Connect endpoints — a critical security failure. If the server's default trust store is used (operating system CA bundle, public Web PKI roots), the Trust Framework roots are not present and every API Hub call is rejected at the handshake. The API Hub does not terminate TLS on the LFI's behalf for the API Hub → Ozone Connect leg. Ozone Connect is the party that validates the API Hub's C4 client certificate. LFIs sometimes assume the Hub handles all mTLS — it does not. Each API Hub environment pairs with a distinct Trust Framework PKI: Production API Hub → Production Trust Framework Pre-production API Hub → Sandbox Trust Framework To validate the API Hub's C4 client certificate, the LFI MUST configure its Ozone Connect server with the Root and Issuing CA of the Trust Framework that pairs with the API Hub environment in use. Production The Production API Hub uses certificates issued by the Production Trust Framework . Its CAs are below. Root CA The self-signed root of trust for the Production Trust Framework PKI. Field Value Distinguished Name C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Root CA - G1 PEM https://crl.pki.openfinance.ae/root-ca.pem Algorithm RSA 2048, signed with sha512WithRSAEncryption Valid from 2024-10-01 Valid until 2039-09-28 Issuing CA The subordinate CA that signs all participant certificates on Production (C1, C3, C4, S1, S3, S4, Sig1–Sig4, Enc1, Enc2). Field Value Distinguished Name C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Production Trust Framework Issuing CA - G1 Issued by Al Tareq Production Trust Framework Root CA - G1 PEM https://crl.pki.openfinance.ae/issuer-ca.pem OCSP responder http://ocsp.pki.openfinance.ae CRL distribution point http://crl.pki.openfinance.ae/issuer.crl Algorithm RSA 2048, signed with sha512WithRSAEncryption Valid from 2024-10-01 Valid until 2034-09-29 Pre-production Root CA The self-signed root of trust for the Pre-production PKI. Field Value Distinguished Name C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Root CA - G1 PEM https://crl.sandbox.pki.openfinance.ae/root-ca.pem Algorithm RSA 2048, signed with sha512WithRSAEncryption Valid from 2024-08-22 Valid until 2039-08-19 Issuing CA The subordinate CA that signs all participant certificates on Pre-production. Field Value Distinguished Name C=AE, O=Nebras Open Finance Company, OU=Al Tareq Trust Framework, CN=Al Tareq Sandbox Trust Framework Issuing CA - G1 Issued by Al Tareq Sandbox Trust Framework Root CA - G1 PEM https://crl.sandbox.pki.openfinance.ae/issuer-ca.pem OCSP responder http://ocsp.sandbox.pki.openfinance.ae CRL distribution point http://crl.sandbox.pki.openfinance.ae/issuer.crl Algorithm RSA 2048, signed with sha512WithRSAEncryption Valid from 2024-08-22 Valid until 2034-08-20 Inbound mTLS configuration has two parts: Trust the Trust Framework CA bundle so the handshake accepts C4 and is rejected for anything not signed by the Trust Framework. Pin the connection to the API Hub's C4 client so that a certificate signed by the same Trust Framewo"
  },
  {
    "title": "Configuring Outbound mTLS",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-client",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Configuring Auth Configuring Outbound mTLS 3 min read This page describes how the LFI MUST configure outbound mutual TLS (mTLS) when its authorisation…",
    "headings": [
      "Configuring Outbound mTLS 3 min read",
      "3a. Present the C3 client certificate",
      "3b. Trust the API Hub's server chain"
    ],
    "body": "LFI · API Hub · Onboarding · Configuring Auth Configuring Outbound mTLS 3 min read This page describes how the LFI MUST configure outbound mutual TLS (mTLS) when its authorisation server calls the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints during consent and authorisation flows. Every request from the LFI to the API Hub's Consent Manager or Headless Heimdall Auth Server is a mutual TLS connection in which the LFI presents the C3 transport client certificate. The API Hub rejects any call to these endpoints that does not present a valid C3 certificate. The LFI's outbound HTTP client — typically the authorisation server application that orchestrates consent — MUST be configured to: Present the C3 client certificate and its private key on every outbound connection, and Trust the API Hub's server certificate chain so the TLS handshake succeeds. Outbound mTLS uses the same Trust Framework PKI as the inbound direction. Each API Hub environment pairs with a distinct Trust Framework: Production API Hub → Production Trust Framework Pre-production API Hub → Sandbox Trust Framework The Root and Issuing CA details for each environment are documented on Configuring Inbound mTLS — Section 2 . The same CA bundle assembled for inbound mTLS is re-used on the outbound direction. Outbound mTLS configuration has two parts: Present the C3 client certificate so the API Hub accepts the TLS handshake and can identify your organisation. Trust the API Hub's server chain so the handshake completes and your client does not fall back to an untrusted state. 3a. Present the C3 client certificate The C3 transport client certificate is created inside the C3-hh-cm-client Application in your Trust Framework Organisation. The same Application also holds the Sig4 signing certificate used for JWT Auth — Client-side when JWT Auth is enabled on the LFI → Hub direction. In your Trust Framework Organisation, open the C3-hh-cm-client Application. Create (or reuse) the C3 transport client certificate, following the code snippets provided in the Trust Framework. Export the C3 certificate and its private key in a format your HTTP client accepts (typically PEM or PKCS#12). Load the C3 certificate and private key into the HTTP client used by your authorisation server when calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints. The C3 certificate created in your Sandbox Trust Framework Organisation is only valid against the Pre-production API Hub. For Production, the C3 is issued by the Production Trust Framework. Do not share key material between environments. The C3 certificate subject — specifically its OU and O — also determines the JWKS URL where the API Hub looks up your Sig4 public key when JWT Auth is enabled. See JWT Auth — Client-side for how the subject binds the transport and application layers. 3b. Trust the API Hub's server chain This section depends on whether the API Hub's Consent Manager and Headless Heimdall endpoints present a Trust Framework-issued server certificate or a commercial (public Web PKI) certificate. Confirm with Ozone before finalising. If the API Hub presents a Trust Framework-issued server certificate, the LFI's outbound HTTP client MUST load the Trust Framework bundle (Issuing CA + Root CA) as a trust anchor. This is the same bundle assembled for Configuring Inbound mTLS — Section 3a . If the API Hub presents a commercial server certificate, most HTTP clients will validate it against the operating-system trust store without any LFI-side configuration. In that case no additional trust setup is required beyond ensuring the OS trust store is up to date. Ozone verifies your outbound mTLS configuration end-to-end as part of onboarding. The API Hub is only considered set up for an environment once your authorisation server can successfully: Establish a mutual TLS session with the Consent Manager presenting the C3 certificate issued by the paired Trust Framework, and Establish a mutual TLS sess"
  },
  {
    "title": "Confirm Authorization",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Confirm Authorization",
    "headings": [],
    "body": ""
  },
  {
    "title": "Confirm the IBAN matches the Name on the Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Confirm the IBAN matches the Name on the Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Confirmation of Payee",
    "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · LFI capability Confirmation of Payee 2 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is…",
    "headings": [
      "Confirmation of Payee 2 min read",
      "Bank Service Initiation Provider",
      "Who's using Confirmation of Payee",
      "Browse this section",
      "Confirmation of Payee — Requirements",
      "Confirmation of Payee — API Guide",
      "Confirmation of Payee — User Journeys"
    ],
    "body": 'Banking · LFI capability Confirmation of Payee 2 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is initiated. The check happens outside the consent and authorisation flow — it requires no user interaction, runs against the LFI that holds the destination account, and returns a name-match result in real time. Access control Required role BSIP Bank Service Initiation Provider Access to the Confirmation of Payee API requires TPPs to hold the BSIP role. The API Hub validates the role on every request before proxying it to the LFI. Live ecosystem Who\'s using Confirmation of Payee TPPs currently calling the Confirmation of Payee API across UAE Open Finance. liveTpps.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&family=confirmation" :title="`See all ${totalTppCount} TPPs`" > … + more Live data is currently unavailable. No TPPs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?type=tpp&family=confirmation" > liveTpps.length"> See all TPPs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Confirmation of Payee API. Requirements Confirmation of Payee — Requirements Validation rules and behaviour your Ozone Connect CoP endpoint must follow. Open → API Guide Confirmation of Payee — API Guide Implementation notes, payload structure, and worked examples. Open → User Journeys Confirmation of Payee — User Journeys The end-to-end flows your customer experiences when CoP runs against your account data. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "Confirmation of Payee - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Confirmation of Payee · UX Confirmation of Payee — User Experience 2 min read You must display the Confirmation of Payee result next to the Payees Name in the…",
    "headings": [
      "Confirmation of Payee — User Experience 2 min read"
    ],
    "body": "Banking · Confirmation of Payee · UX Confirmation of Payee — User Experience 2 min read You must display the Confirmation of Payee result next to the Payees Name in the Authorization Page faithfully aligned with the demo and examples below. Your CoP screen must be submitted as part of CX certification prior to production. Edit the message.Data fields and see to change the signed JWS is embedded inside the domestic_payment_pii creditor block and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Confirmation of Payee — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Confirmation of Payee Confirmation of Payee — API Guide 2 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or…",
    "headings": [
      "Confirmation of Payee — API Guide 2 min read",
      "Request headers",
      "Query parameters",
      "Request body",
      "Response"
    ],
    "body": "LFI · Banking · Confirmation of Payee Confirmation of Payee — API Guide 2 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or business before initiating a payment. POST /customers/action/cop-query Request headers Header Required Description o3-provider-id Yes Identifier for your LFI registered in the Hub o3-aspsp-id Yes (deprecated) Deprecated alias for o3-provider-id . Will be removed in a future version — use o3-provider-id o3-caller-org-id Yes Organisation ID of the TPP making the underlying request o3-caller-client-id Yes OIDC client ID of the TPP application o3-caller-software-statement-id Yes Software statement ID of the TPP application o3-api-uri Yes The parameterised URL of the API being called by the TPP o3-api-operation Yes The HTTP method of the operation carried out by the TPP (e.g. POST ) o3-ozone-interaction-id Yes Hub-generated interaction ID. Equals o3-caller-interaction-id if the TPP provided one o3-caller-interaction-id No Interaction ID passed in by the TPP, if present Query parameters Parameter Required Default Description page Yes 1 Page number for paginated results page-size Yes 100 Number of records per page Request body Content-Type: application/json The Hub sends a plain JSON body — not a JWS. The body always contains a single account identified by IBAN and a name to match against. data.account Field Type Required Description schemeName string Yes Always IBAN identification string Yes The IBAN to look up name object Yes Either a PersonName or BusinessName — see below PersonName Field Type Required Description fullName string Yes The full name of the person as submitted by the TPP firstName string No Given name, if provided by the TPP lastName string No Family name, if provided by the TPP BusinessName Field Type Required Description businessName string Yes The business name as submitted by the TPP Example — personal name Example — business name Response Content-Type: application/json Return 200 in all lookup scenarios — whether the account is found or not. The Hub interprets the data array contents to determine the match result returned to the TPP. 200 — Account found Return a data array containing one record per account holder. Joint accounts may return multiple records. Personal account verifiedClaims[].claims.fullName is mandatory. Include givenName and familyName if your system holds them separately — the Hub uses these to improve match precision. Business account Populate verifiedClaims[].organisationClaims.name with the registered business name on the account. 200 — Account not found, opted out Return 200 with an empty data array for scenarios where no account was found matching the IBAN or if the account opted out of CoP. Do not use 404 or 204 — the Hub expects 200 and treats an empty array as a no-result response. Error responses All error bodies must include errorCode and errorMessage . 403 — Forbidden errorCode errorMessage When to use Consent.AccountTemporarilyBlocked The account is blocked from receiving payments. The account is blocked from receiving payments for a temporary reason — e.g. account status is Suspended Consent.PermanentAccountAccessFailure The account is blocked from receiving payments. The account is blocked from receiving payments permanently — e.g. account status is Closed , Deceased , or Unclaimed"
  },
  {
    "title": "Confirmation of Payee — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Confirmation of Payee Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Confirmation of Payee Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Confirmation of Payee — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Consent Events & Actions",
    "path": "/tech/lfi-api-hub/v2.1/consent-events/",
    "category": "LFI Integration",
    "section": "Consent Events",
    "description": "LFI · Ozone Connect · Consent Events & Actions Consent Events & Actions 3 min read The Consent Events & Actions API is implemented by your LFI. Unlike the other APIs in the Ozone…",
    "headings": [
      "Consent Events & Actions 3 min read",
      "POST /consent/event/post — Consent created",
      "POST /consent/event/patch — Consent updated",
      "Response"
    ],
    "body": "LFI · Ozone Connect · Consent Events & Actions Consent Events & Actions 3 min read The Consent Events & Actions API is implemented by your LFI. Unlike the other APIs in the Ozone Connect specification where the API Hub calls your endpoints to retrieve data or execute payments, these endpoints allow the API Hub to notify you of consent lifecycle changes and request your input during consent creation. All other Ozone Connect APIs follow the pattern: API Hub → LFI (the Hub requests data or actions from you). The Consent Events & Actions API follows the same direction — API Hub → LFI — but the purpose is reversed: the Hub is informing you or asking you, rather than requesting business data. Endpoint Type When the Hub calls it Recommendation POST /consent/action/validate Action During consent creation — before the consent is stored. The Hub sends the consent the TPP is requesting and asks your LFI to confirm it is supported. Highly recommended for all LFIs POST /consent/event/post Event After a consent is successfully created Recommended for LFIs that store consents locally POST /consent/event/patch Event Every time a consent changes — e.g. status transitions to Authorized , Rejected , Expired , or Revoked Recommended for LFIs that store consents locally The validate endpoint is called when a TPP submits a POST /par request to the API Hub to create a new consent. Before the consent is stored, the Hub forwards the full consent payload to your LFI and waits for a response. Your LFI inspects the consent and determines whether it can be supported — for example: Does the consent version match what your LFI supports? Are the requested permissions within the scope of what your LFI offers? Each consent type defines its own specific validation rules in its Requirements page (e.g. Bank Data Sharing — Requirements ). Refer to the Requirements page for each consent type your LFI supports. Your LFI responds with a data.status of either valid or invalid : Response Effect valid The consent is created in the API Hub and the authorization journey proceeds invalid The consent is not created. The API Hub returns an error to the TPP We highly recommend all LFIs implement the validate endpoint. It gives your institution early control over which consents enter the authorization journey, preventing unsupported consents from reaching your end users. If your LFI has not configured the validate endpoint, the API Hub assumes all consents are valid and creates them immediately without LFI input. The consent event endpoint is called by the Hub to notify your LFI of consent lifecycle changes. The {operation} path parameter indicates the type of change: POST /consent/event/post — Consent created Called immediately after a consent is successfully created (i.e. after validation passes, if configured). The request body contains the full consent object as stored in the API Hub's Consent Manager. POST /consent/event/patch — Consent updated Called every time a consent's state changes. This includes transitions such as: AwaitingAuthorisation → Authorized (end user approved the consent) AwaitingAuthorisation → Rejected (end user declined the consent) Authorized → Revoked (consent revoked by TPP, LFI, or end user) Authorized → Expired (consent reached its expiration date) The request body contains the full, updated consent object. Response For both operations, your LFI MUST return 204 No Content to acknowledge receipt. The Hub does not retry failed notifications, and consent state changes are not rolled back if your endpoint returns an error. If your LFI maintains a local copy of consents — for example, to power a Consent Management Interface or to support internal business logic — we recommend implementing the consent event endpoints. This ensures your local consent state stays aligned with the API Hub, which is the single source of truth for all consent data. Without these events, your local consent records may drift out of sync with the Hub, requiring you to poll the "
  },
  {
    "title": "Consent Events & Actions — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/consent-events/api-guide",
    "category": "LFI Integration",
    "section": "Consent Events",
    "description": "LFI · Ozone Connect · Consent Events & Actions · API Guide Consent Events & Actions — API Guide 3 min read This guide covers the implementation of the Consent Events & Actions…",
    "headings": [
      "Consent Events & Actions — API Guide 3 min read",
      "API Sequence Flow",
      "What to validate",
      "Response schema",
      "API Sequence Flow",
      "What to do with the event",
      "Response"
    ],
    "body": "LFI · Ozone Connect · Consent Events & Actions · API Guide Consent Events & Actions — API Guide 3 min read This guide covers the implementation of the Consent Events & Actions endpoints on your Ozone Connect server. These are endpoints your LFI exposes and the API Hub calls . Before implementing these endpoints, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete Ozone Connect base URL configured — The API Hub knows the base URL of your Ozone Connect server. See Ozone Connect Base URL Connectivity verified — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. See Connectivity & Certificates API Sequence Flow The API Hub calls this endpoint during consent creation, before the consent is stored. The trigger is a TPP submitting a POST /par request to the API Hub. What to validate Your LFI SHOULD validate that the consent is one you can support. At a high level, typical checks include: Does the consent version match what your LFI supports? Are the requested permissions within the scope of what your LFI offers? Each consent type defines its own specific validation rules in its Requirements page (e.g. Bank Data Sharing — Requirements ). Refer to the Requirements page for each consent type your LFI supports to understand the full set of validation checks you MUST implement. Response schema Field Type Required Description data.status string Yes valid or invalid data.code string No An error code — returned when status is invalid data.description string No A human-readable description of why the consent was rejected meta object Yes Empty object {} See the POST /consent/action/validate API Reference for the full request and response schemas. API Sequence Flow The API Hub calls this endpoint to notify your LFI of consent lifecycle changes: Operation Trigger POST /consent/event/post A consent has been created — i.e. after POST /par succeeds (and after validation, if configured) POST /consent/event/patch A consent has been updated — e.g. status changed to Authorized , Rejected , Revoked , or Expired What to do with the event If your LFI stores consents locally, use these events to keep your local state in sync with the API Hub: On post — Store the new consent in your local system On patch — Update your local consent record to reflect the latest state The request body contains the full consent object as stored in the API Hub's Consent Manager — not a diff. Your LFI can replace its local record entirely with the received payload. The API Hub is the single source of truth for consent state. Your local copy is a convenience cache. If there is ever a discrepancy, the Hub's state takes precedence. Response Your LFI MUST return 204 No Content to acknowledge receipt. If your endpoint returns an error (e.g. 400 or 500 ), the API Hub will not retry the notification and will not roll back the consent change. The consent state in the Hub proceeds regardless. Because the Hub is the source of truth and your local copy is a cache, any missed event can be reconciled by reading from the Consent Manager: Handler received the payload but failed to process it — you have the consentId , so call GET /consents/{consentId} to fetch the latest state. Your system was offline and never received the event — reconcile lazily at end user login by calling GET /psu/{userId}/consents before rendering the CMI. LFIs that do not maintain a local consent cache do not need to reconcile — read from the Consent Manager on demand. POST /consent/action/validate — Full request and response schema POST /consent/event/{operation} — Full request and response schema"
  },
  {
    "title": "Consent Journey - API Guide",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/api-guide",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "LFI · Consent Journey · API Guide Consent Journey — API Guide 6 min read End-to-end implementation guide for the consent authorization journey: from the TPP's POST /par through…",
    "headings": [
      "Consent Journey — API Guide 6 min read",
      "Required API implementations",
      "Step 1 — TPP creates the consent via /par",
      "Step 2 — (Optional) Validate the consent",
      "Step 3 — (Optional) Receive the consent event",
      "Step 4 — End user is redirected to your Authorization Endpoint",
      "Step 5 — Call GET /auth",
      "Step 6 — Retrieve the consent details",
      "Step 8 — Present the authorization page",
      "Step 9a — end user authorizes: PATCH consent and doConfirm",
      "Step 9b — end user rejects: PATCH consent and doFail",
      "psuIdentifiers.userId"
    ],
    "body": "LFI · Consent Journey · API Guide Consent Journey — API Guide 6 min read End-to-end implementation guide for the consent authorization journey: from the TPP's POST /par through your Authorization Endpoint, the Headless Heimdall and Consent Manager API calls, and the final doConfirm / doFail redirect back to the TPP. Before implementing the consent journey, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete C3-hh-cm-client application created — Registered in the Trust Framework with mTLS connectivity established in both directions. See Creating the C3-hh-cm-client Application Connectivity verified — Bidirectional mTLS connectivity confirmed between your systems and the API Hub. Use GET /hello-mtls on both the Headless Heimdall and Consent Manager base URLs to verify. See Connectivity & Certificates Authorization Endpoint registered — Your Authorization Endpoint is configured in the API Hub to receive TPP user redirects Required API implementations You MUST implement the following endpoints: Endpoint Direction Purpose GET /auth LFI → API Hub Initiate the authorization interaction GET /consents/{consentId} LFI → API Hub Retrieve the full consent details PATCH /consents/{consentId} LFI → API Hub Update consent status, end user identifiers, and account IDs POST /auth/{interactionId}/doConfirm LFI → API Hub Complete the authorization interaction and redirect back to TPP successfully POST /auth/{interactionId}/doFail LFI → API Hub Complete the authorization interaction and redirect back to TPP with a failure Step 1 — TPP creates the consent via /par The consent journey begins when a TPP sends a Pushed Authorization Request ( POST /par ) to the API Hub. The TPP embeds the consent definition inside a signed Request JWT. See the TPP Consent API Guide for the TPP's API Guide and POST /par for the full /par request structure. At this point your LFI systems are not yet involved — the API Hub receives the request and begins processing the consent. Step 2 — (Optional) Validate the consent If your LFI has configured the POST /consent/action/validate endpoint in the API Hub, the API Hub will call your Ozone Connect server with the full consent payload before the consent is created. This gives your LFI the opportunity to inspect the consent and determine whether it is one you support — for example, validating that a debtor account exists in your systems, or that the requested permissions are supported. Your LFI MUST return data.status set to one of: Status Effect valid The consent is created and processing continues invalid The consent is rejected and an error is returned to the TPP If you have not configured the POST /consent/action/validate endpoint, the API Hub assumes all consents are valid and creates them immediately. See the Validate Consent API Reference for the full request and response schemas. Step 3 — (Optional) Receive the consent event If your LFI has configured the POST /consent/event/{operation} endpoint, the API Hub will call POST /consent/event/post on your Ozone Connect server once the consent has been successfully created. This is an informational notification — the API Hub does not expect a response body. Return 204 No Content to acknowledge receipt. Step 4 — End user is redirected to your Authorization Endpoint After the consent is created via POST /par , the TPP redirects the end user to your Authorization Endpoint with the following query parameters: Where request_uri is the value returned from the /par response. Your Authorization Endpoint is the URL you registered during environment-specific configuration . Your Authorization Endpoint MUST NOT reject the redirect based on the query parameters it receives. If a TPP appends additional parameters beyond client_id , response_type , and request_uri , simply ignore them — do not treat the redirect as malformed. The authoritative authorization request is the signed Request JWT ref"
  },
  {
    "title": "Consent Management Interface",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "LFI · API Hub · v2.1 · Consent Management Interface Consent Management Interface 2 min read Every LFI must provide a Consent Management Interface (CMI) — a section of their…",
    "headings": [
      "Consent Management Interface 2 min read",
      "Dashboard",
      "Detail page"
    ],
    "body": "LFI · API Hub · v2.1 · Consent Management Interface Consent Management Interface 2 min read Every LFI must provide a Consent Management Interface (CMI) — a section of their digital banking application where customers can see all active and historical consents they have granted to third party providers, and take action on them. The CMI is a requirement, not an optional feature. The LFI CMI serves as the primary transparency and control mechanism for customers within the LFI's own product. It complements the consent management interfaces provided by TPPs. A compliant CMI covers two core user journeys: Journey What the customer does Unlike the TPP CMI, the LFI CMI does not support Pause and Reactivate . Pause is a TPP-only concept that does not affect the consent state at the API Hub. The CMI must present consent information at two levels: Level 1 Dashboard Lists all consents the customer has granted to TPPs via this LFI, with enough detail to identify each one. The information shown varies by consent type; see the per-product Requirements pages for Bank Data Sharing , Bank Service Initiation , and Insurance Data Sharing . Any consent can be selected to open its detail page. Level 2 Detail page Shows the full parameters of a consent exactly as they were defined at consent creation. The detail page also hosts the Revoke action button where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent. For any consent in the Authorized , AwaitingAuthorization , or Suspended state, the option to revoke must be present on the detail page. When a customer revokes a consent, the LFI must: Present a single confirmation page that clearly describes the impact — what the TPP will lose access to and what happens to any data already retrieved. Update the consent status to Revoked via the Consent Manager API. Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are irrevocable . Do not display a revoke button for consents in the Consumed state."
  },
  {
    "title": "Consent Management Interface — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide",
    "category": "LFI Integration",
    "section": "CMI",
    "description": "LFI · Consent Management Interface · API Guide Consent Management Interface — API Guide 6 min read This guide explains how to use the API Hub's Consent Manager API to retrieve and…",
    "headings": [
      "Consent Management Interface — API Guide 6 min read",
      "Query parameters",
      "Alternative retrieval operations",
      "Data Sharing",
      "Single Instant Payment",
      "Multi Payment (all subtypes)",
      "How BaseConsentId works",
      "Connection history — Data Sharing & Insurance",
      "Connection history — Service Initiation"
    ],
    "body": 'LFI · Consent Management Interface · API Guide Consent Management Interface — API Guide 6 min read This guide explains how to use the API Hub\'s Consent Manager API to retrieve and manage the data needed to populate each page of the LFI Consent Management Interface (CMI). See the per-product Requirements pages ( Bank Data Sharing , Bank Service Initiation , Insurance Data Sharing ) for what each page must display, and the matching User Experience pages for interactive wireframes. Before making Consent Manager API calls the LFI must: Have a working mTLS connection to the API Hub — verify with GET /hello-mtls Patch the end user identifier onto each consent using PATCH /consents/{consentId} so that consents can be retrieved by user To retrieve all consents associated with a customer use: GET /psu/{userId}/consents where userId is the LFI\'s unique identifier for the customer. The response returns a paginated array of consent objects. Each consent object contains the fields needed to populate the dashboard cards and detail pages described in the per-product Requirements pages ( Bank Data Sharing , Bank Service Initiation , Insurance Data Sharing ). Query parameters Parameter Required Description Alternative retrieval operations Operation Use when The sections below map each CMI field from the per-product Requirements ( Bank Data Sharing , Bank Service Initiation , Insurance Data Sharing ) to the API response property and any transformation the LFI must apply. Data Sharing # CMI field Operation JSONPath Guidelines ${r.operation} `" /> ${r.jsonPath} `" /> Single Instant Payment # CMI field Operation JSONPath Guidelines ${r.operation} `" /> ${r.jsonPath} `" /> Multi Payment (all subtypes) Multi Payment consents follow the same field mappings as Single Instant Payment, with these additions: # CMI field Operation JSONPath Guidelines ${r.operation} `" /> ${r.jsonPath} `" /> To provide the List of Updates view described in the Bank Data Sharing Requirements , use: GET /consent-groups/{consentGroupId}/consents where consentGroupId is the value of BaseConsentId on the current consent. This returns all consents in a consent group — consents that are linked by the same BaseConsentId . How BaseConsentId works Connection history is driven by “revisions” to consents orchestrated by TPPs: an existing consent is replaced by a new consent with updated permissions or data-access terms. The TPP links the new consent to the original by setting BaseConsentId on the new consent to the ConsentId of the original consent. All subsequent consents sharing the same history use the same BaseConsentId value. When a consent is created it contains no customer information — the end user identity is only added later when the LFI patches in the end user ID. This means two consents sharing the same BaseConsentId are not guaranteed to belong to the same customer. LFIs must ensure that only consents belonging to the same end user are returned when resolving related consents. The GET /consents/{consentId}/audit operation is not the correct way to retrieve connection history. It relates to changes within a single consent, not changes across multiple consents linked by BaseConsentId . Connection history — Data Sharing & Insurance # CMI field JSONPath Guidelines ${r.jsonPath} `" /> Connection history — Service Initiation # CMI field JSONPath Guidelines ${r.jsonPath} `" /> To provide the Payment History tab described in the Bank Service Initiation Requirements , use: GET /payment-log?consentId={consentId} This returns a summary of all payments for a given consent. Each payment log entry contains the fields needed to populate a single row in the Payment History tab. # CMI field JSONPath Guidelines ${r.jsonPath} `" /> When the customer confirms a revocation action on the CMI, the LFI must immediately revoke the consent via: POST /consents/{consentId}/action/revoke This also revokes any associated tokens. The request body must include revokedBy set to LFI.InitiatedByUser . To r'
  },
  {
    "title": "Consent Manager",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Consent Manager Consent Manager 2 min read The Consent Manager is an API provided by the API Hub that gives the LFI read and write access to the consent records…",
    "headings": [
      "Consent Manager 2 min read",
      "1. Authentication and authorisation journey",
      "2. Consent Management Interface",
      "3. Payment status updates"
    ],
    "body": "LFI · API Hub · Consent Manager Consent Manager 2 min read The Consent Manager is an API provided by the API Hub that gives the LFI read and write access to the consent records held centrally by the API Hub. The API Hub is the single source of truth for all consents — the Consent Manager is how your systems interact with that source of truth. Environment URL Pre-production https://cm.{lfiCode}.preprod.apihub.openfinance.ae Production https://cm.{lfiCode}.apihub.openfinance.ae Where {lfiCode} is the LFI Code assigned during API Hub onboarding . All requests to the Consent Manager MUST be made using the C3-hh-cm-client application registered in the Trust Framework. This is the same client used to call the Headless Heimdall Auth Server . Requests MUST be made over mutual TLS using the C3 transport client certificate. If your API Hub is configured for JWT Auth , you MUST also include a signed JWT in the Authorization header, signed with the Sig4 signing key. See Connectivity & Certificates for the full certificate mapping, and Creating the C3-hh-cm-client Application for setup instructions. The Consent Manager is used in three contexts: 1. Authentication and authorisation journey During the consent authorisation flow, the LFI's authorisation server calls the Consent Manager to read the consent details and update the consent state after the end user has authenticated and made their authorisation decision. For full details on the end-to-end flow — including how the Consent Manager fits alongside the Headless Heimdall Auth Server — see the Consent Journey API Guide . 2. Consent Management Interface The LFI MUST provide a Consent Management Interface (CMI) within its digital banking application. The CMI is powered by Consent Manager API calls — retrieving consents by user, by account, or by ID, and revoking consents on the customer's behalf. For the requirements, user experience specifications, and a detailed API guide for building the CMI, see the Consent Management Interface . 3. Payment status updates For every Open Finance payment executed under a consent, the LFI MUST update the payment status on the API Hub by calling PATCH /payment-log/{id} . This keeps the API Hub's payment log accurate and ensures the CMI can display up-to-date payment history to the customer. The full API reference for each endpoint is available in the sidebar under API Reference . Use GET /hello-mtls to verify your mTLS connectivity before calling other endpoints."
  },
  {
    "title": "Create a Employment Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-employment-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Employment Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Employment Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/employment-insurance-quotes",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Employment Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Health Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-health-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Health Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Health Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/health-insurance-quotes",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Health Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Home Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-home-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Home Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Home Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/home-insurance-quotes",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Home Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Life Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-life-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Life Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Life Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/life-insurance-quotes",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Life Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Motor Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-motor-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Motor Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Motor Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/motor-insurance-quotes",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Motor Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Payment",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Create a Payment",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Renters Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-renters-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Renters Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Renters Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/renters-insurance-quotes",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Renters Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Travel Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-travel-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Travel Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Travel Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/travel-insurance-quotes",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Create a Travel Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Creditor",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · PII Creditor 2 min read At consent validation — POST /consent/action/validate — the LFI MUST validate Initiation.Creditor in the decrypted PII…",
    "headings": [
      "Creditor 2 min read"
    ],
    "body": `LFI · Banking · Service Initiation · PII Creditor 2 min read At consent validation — POST /consent/action/validate — the LFI MUST validate Initiation.Creditor in the decrypted PII against three concerns: Cardinality — the shape of Initiation.Creditor matches a beneficiary model permitted by the requested payment type. Mandatory fields — every entry carries the fields required for a UAE domestic payment. Domestic creditor validity — each entry names an account reachable on a supported UAE domestic rail. If any check fails, the LFI MUST mark the consent invalid in its validate response — see Rejecting an invalid consent below. The shape of Initiation.Creditor determines the beneficiary model. Three models are defined: Beneficiary model Initiation.Creditor Single Array of exactly 1 entry Multiple Array of 2–10 entries Open Array omitted — no creditor fixed at consent time Each payment type accepts only certain beneficiary models. The LFI MUST reject a consent where the cardinality doesn't align with a model permitted for the requested payment type. The allowed models are documented on each payment type's Requirements page (e.g. Variable On-Demand — Requirements ). For every entry in Initiation.Creditor[] , the following fields MUST be present for a UAE domestic payment: Field Rule CreditorAccount.SchemeName MUST be "IBAN" — "AccountNumber" is not valid for domestic payments CreditorAccount.Identification MUST be a valid UAE IBAN CreditorAccount.Name.en OR CreditorAccount.Name.ar At least one MUST be present If any required field is missing, SchemeName is set to "AccountNumber" , or the IBAN is invalid, the LFI MUST invalidate the consent. Schema conformance — including additionalProperties: false at every level — is enforced through the OpenAPI spec. See How to Decrypt PII for how to plug the PII schema into a validator. Scenario LFI behaviour CreditorAgent.Identification not provided LFI MUST derive the BIC from the IBAN CreditorAgent.Identification provided MUST be in 8- or 11-character BIC format, and MUST match the BIC derivable from the IBAN For each entry, the LFI MUST validate that the creditor account is reachable on a supported UAE domestic rail — AANI or UAEFTS . Where the LFI can determine the state of the receiving account, it MUST also check that the account is able to receive payments. If any check above fails, the LFI MUST mark the consent invalid in its POST /consent/action/validate response. The API Hub will then reject the consent back to the TPP. See Consent Events & Actions — API Guide for the full POST /consent/action/validate flow and response schema.`
  },
  {
    "title": "Debtor Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/debtor-account",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · PII Debtor Account 2 min read Initiation.DebtorAccount is only present in the PII the LFI receives at POST /consent/action/validate (consent…",
    "headings": [
      "Debtor Account 2 min read"
    ],
    "body": "LFI · Banking · Service Initiation · PII Debtor Account 2 min read Initiation.DebtorAccount is only present in the PII the LFI receives at POST /consent/action/validate (consent validation). It is not part of the PII delivered with a payment instruction via Ozone Connect — by the time a payment is created, the debtor account has been fixed by the consent authorisation journey. When a TPP supplies Initiation.DebtorAccount in the consent PII, the LFI MUST validate it during consent validation — POST /consent/action/validate . At this stage the customer has not yet authenticated , so the LFI cannot check ownership. The checks are limited to whether the account exists at this LFI, is reachable through this API Hub, and is eligible for payment initiation. Checks that depend on the authenticated customer — e.g. whether the DebtorAccount supplied by the TPP actually belongs to the user who logs in at the LFI — are covered separately under the authorisation journey. This page covers only what the LFI MUST validate before the consent is stored. Perform these checks after decrypting the PII in the POST /consent/action/validate handler: Check Rule Schema DebtorAccount conforms to AEDomesticPaymentPII — see PII Schema — Consent Scheme SchemeName MUST be IBAN Account exists Identification (IBAN) corresponds to an account held at this LFI and reachable through this API Hub Payments enabled The account is in a state that permits payment initiation (e.g. not blocked, dormant, or closed) If any check fails, the LFI MUST mark the consent invalid in its POST /consent/action/validate response. The API Hub will then reject the consent back to the TPP. See Consent Events & Actions — API Guide for the full POST /consent/action/validate flow and response schema."
  },
  {
    "title": "Decrypt PII for a User",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-pii-decrypt",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Decrypt PII for a User",
    "headings": [],
    "body": ""
  },
  {
    "title": "Delegated SCA - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Delegated SCA · UX Delegated SCA — User Experience 3 min read When a customer is redirected to you to authorize a Delegated SCA payment consent…",
    "headings": [
      "Delegated SCA — User Experience 3 min read"
    ],
    "body": "Banking · Service Initiation · Delegated SCA · UX Delegated SCA — User Experience 3 min read When a customer is redirected to you to authorize a Delegated SCA payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that the TPP is seeking permission to initiate payments on their behalf, but the customer will be required to authenticate and approve each individual payment before it is executed — no payment will be taken automatically. The page must accurately reflect the payee and the nature of the delegated consent being granted. The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Delegated SCA — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Multi-Payments · Delegated SCA Delegated SCA — API Guide 18 min read Delegated SCA lets a TPP initiate multiple domestic payments from a…",
    "headings": [
      "Delegated SCA — API Guide 18 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor list",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Validating the delegated-SCA authentication assertion",
      "Matching the PII against the consent",
      "Validating an open-beneficiary creditor at payment time"
    ],
    "body": `LFI · Banking · Service Initiation · Multi-Payments · Delegated SCA Delegated SCA — API Guide 18 min read Delegated SCA lets a TPP initiate multiple domestic payments from a customer's account at your LFI via the API Hub, where the Strong Customer Authentication step is performed at the TPP rather than at the LFI. The customer authorises the consent once and selects the debtor account; on each subsequent payment the TPP attaches a fresh SCA assertion in Risk.DebtorIndicators.Authentication to evidence that the customer authenticated at the TPP for that specific payment, and no redirect back to the LFI is needed. The consent may fix a list of up to ten allowed creditors or leave the creditor list open (the "open beneficiaries" model), in which case the TPP supplies the creditor fresh on each payment. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every payment under the consent from creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Delegated SCA Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor list (or confirming it is open), matching the payment-time PII against the consent, validating the delegated authentication assertion, and applying the duplicate-in-flight check that is specific to on-demand consent types. Before implementing Delegated SCA, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Delegated SCA beneficiary models advertised — For each beneficiary model you support, the corresponding flag MUST be set to true on your authorisation server entry in the Trust Framework: ApiMetadata.DelegatedAuthentication.SingleBeneficiarySupported (consents carrying exactly 1 creditor), ApiMetadata.DelegatedAuthentication.MultipleBeneficiariesSupported (consents carrying 2–10 creditors), and/or ApiMetadata.DelegatedAuthentication.OpenBeneficiariesSupported (consents that omit Initiation.Creditor ). A consent for a model the LFI has not advertised MUST be rejected at consent validation. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules — standardVersion , Initiation.DebtorAccount , BaseConsentId , CurrencyRequest , beneficiary-model support, PII conformance, creditor checks — is enumerated in Delegated SCA Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor list ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. The end-to-end flow is: Read the kid from the JWE protected header and look up t`
  },
  {
    "title": "Delegated SCA — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/delegated-sca/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Delegated SCA Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Delegated SCA Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Delegated SCA — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Deregister a User",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-deregister",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Deregister a User",
    "headings": [],
    "body": ""
  },
  {
    "title": "Echo Cert",
    "path": "/tech/lfi-api-hub/v2.1/health-check/open-api/echo-cert",
    "category": "LFI Integration",
    "section": "Health Check",
    "description": "Health Check — Echo Cert",
    "headings": [],
    "body": ""
  },
  {
    "title": "Environment Specific Configuration",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Environment-Specific Environment Specific Configuration 9 min read Each API Hub instance requires environment-specific configuration that is exchanged…",
    "headings": [
      "Environment Specific Configuration 9 min read",
      "Domain names allocated by Ozone",
      "LFI-specific discovery document",
      "URLs provided by the LFI",
      "Values provided by Ozone",
      "Optional API family base paths",
      "S1 — Transport Server Certificate",
      "S3 — Transport Server Certificate",
      "C4 — Transport Client Certificate",
      "Sig2 — Signing Certificate",
      "Sig3 — Signing Certificate (JWT Auth only)",
      "C3 — Transport Client Certificate"
    ],
    "body": "LFI · API Hub · Onboarding · Environment-Specific Environment Specific Configuration 9 min read Each API Hub instance requires environment-specific configuration that is exchanged between the LFI and Ozone during onboarding. This configuration MUST be completed separately for each environment : Pre-production — certificates from the Sandbox Trust Framework. Production — certificates from the Production Trust Framework. The configuration is submitted via a Service Desk ticket . This page describes all the information that is exchanged. You MUST complete this process twice — once for pre-production and once for production. All certificates referenced in the pre-production form MUST be created in the Sandbox Trust Framework. All certificates referenced in the production form MUST be created in the Production Trust Framework. For a full understanding of how each certificate fits into the API Hub network architecture, see API Hub Connectivity & Certificates . Field Provided By Description LFI Legal Name LFI Your legal name as it appears on the Trust Framework organisation page (Sandbox for pre-production, Production for production). LFI Organisation ID LFI Your organisation ID from the Trust Framework organisation page. Domain names allocated by Ozone Ozone allocates domain names for each API Hub instance based on the LFI Code provided during prerequisites onboarding . Field Convention (Pre-production) Convention (Production) TPP-facing domain as1.{lfiCode}.preprod.apihub.openfinance.ae as1.{lfiCode}.apihub.openfinance.ae TPP-facing resource server rs1.{lfiCode}.preprod.apihub.openfinance.ae rs1.{lfiCode}.apihub.openfinance.ae Headless Heimdall hh.{lfiCode}.preprod.apihub.openfinance.ae hh.{lfiCode}.apihub.openfinance.ae Consent Manager cm.{lfiCode}.preprod.apihub.openfinance.ae cm.{lfiCode}.apihub.openfinance.ae Admin Portal admin.{lfiCode}.preprod.apihub.openfinance.ae admin.{lfiCode}.apihub.openfinance.ae LFI-specific discovery document Your API Hub's well-known discovery document will be available at: This document exposes your authorization_endpoint , token_endpoint , jwks_uri , and supported parameters. TPPs use it to discover where to redirect their users. URLs provided by the LFI Field Provided By Description Ozone Connect Base URL LFI The base URL on which your Ozone Connect endpoints are hosted. See Ozone Connect Base URL for details. Authorisation URL LFI The OIDC authorisation URL for your institution. See Authorization Endpoint for details. Values provided by Ozone Field Provided By Description Admin Portal URL Ozone The URL to your Admin Portal for this environment. IP Address Ozone The IP address(es) for API Hub outbound traffic. You MUST allowlist these IPs at your network/firewall level to permit traffic from the API Hub to your Ozone Connect endpoints. Optional API family base paths The onboarding form includes optional base path fields for each API family. If provided, the path is inserted between your Ozone Connect Base URL and the API endpoint — allowing the LFI to route different API families to different path prefixes on the same server. API Family Example Endpoints Path Effect Data Sharing /accounts , /balances , /transactions OzoneConnectURL/<path>/accounts Service Initiation /domestic-payments , /multi-payments OzoneConnectURL/<path>/domestic-payments Products /products , /leads OzoneConnectURL/<path>/products Consent Events & Notifications /event-notifications OzoneConnectURL/<path>/event-notifications Health Check /hello , /hello-mtls , /echo-cert OzoneConnectURL/<path>/echo-cert All fields are optional. For any API families without a path specified — either because the field was left blank or because the family does not appear in the form — the API Hub sends requests directly to OzoneConnectURL/<endpoint> . If the LFI sets the Data Sharing base path to /retail/data and their Ozone Connect Base URL is https://openapi.example.com , a TPP request for accounts will be forwarded to: These are certificates wh"
  },
  {
    "title": "Event When a Consent Is Updated or Created",
    "path": "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op",
    "category": "LFI Integration",
    "section": "Consent Events",
    "description": "Consent Events — Event When a Consent Is Updated or Created",
    "headings": [],
    "body": ""
  },
  {
    "title": "Fail Authorization",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Fail Authorization",
    "headings": [],
    "body": ""
  },
  {
    "title": "Fixed Defined Schedule - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Fixed Defined Schedule · UX Fixed Defined Schedule — User Experience 4 min read Before a customer authorises a Fixed Defined Schedule payment…",
    "headings": [
      "Fixed Defined Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Fixed Defined Schedule · UX Fixed Defined Schedule — User Experience 4 min read Before a customer authorises a Fixed Defined Schedule payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make a pre-defined series of payments, each on a specific date for a fixed amount. This page must accurately reflect the key details of the consent (payee, the complete list of scheduled payment dates and the fixed amount for each, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Fixed Defined Schedule — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Multi-Payments · Fixed Defined Schedule Fixed Defined Schedule — API Guide 14 min read Fixed Defined Schedule lets a TPP initiate a series of…",
    "headings": [
      "Fixed Defined Schedule — API Guide 14 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Matching the PII against the consent",
      "Response",
      "Error responses"
    ],
    "body": `LFI · Banking · Service Initiation · Multi-Payments · Fixed Defined Schedule Fixed Defined Schedule — API Guide 14 min read Fixed Defined Schedule lets a TPP initiate a series of domestic payments at a fixed amount on a pre-agreed set of specific dates from a customer's account at your LFI via the API Hub. The TPP supplies an explicit schedule at consent time — each PaymentExecutionDate with its precise amount — and the customer authorises the full schedule once. On each scheduled date the TPP submits one payment without re-authorisation. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every scheduled payment under the consent from creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Fixed Defined Schedule Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor, and matching the payment-time PII against the consent. Before implementing Fixed Defined Schedule, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Fixed Defined Schedule advertised — ApiMetadata.FixedDefinedSchedule.Supported is set to true on your authorisation server entry in the Trust Framework. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules — standardVersion , Initiation.DebtorAccount , BaseConsentId , CurrencyRequest , payment-type support, PII conformance, creditor checks — is enumerated in Fixed Defined Schedule Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. The end-to-end flow is: Read the kid from the JWE protected header and look up the matching Enc1 private key Decrypt the JWE → recover the inner JWS Decode the JWS payload (signature verification is optional — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit) Validate the decoded payload against the consent-time PII schema — AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII in uae-api-hub-consent-manager-openapi.yaml . additionalProperties: false is set at every level, so any unexpected field fails validation Happy-path snippet: For the per-step deep dive — kid lookup conventions, key import options, the optional JWS signature verification, building the ajv / jsonschema validator with all $ref schemas registered — see How to Decrypt PII . The decrypted consent-time PII for a Fixed Defined Schedule consent l`
  },
  {
    "title": "Fixed Defined Schedule — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-defined-schedule/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Fixed Defined Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Fixed Defined Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Fixed Defined Schedule — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Fixed On Demand - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Fixed On Demand · UX Fixed On Demand — User Experience 4 min read When a customer is redirected to you to authorize a Fixed On Demand payment…",
    "headings": [
      "Fixed On Demand — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Fixed On Demand · UX Fixed On Demand — User Experience 4 min read When a customer is redirected to you to authorize a Fixed On Demand payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that multiple payments of a fixed amount will be made at any time of the TPP's choosing. The page must collect the customer's explicit and informed consent, and it must accurately reflect the key details of the consent (payee, the fixed amount per payment, the first payment date, etc.) The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Fixed On Demand — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Fixed On Demand Fixed On Demand — API Guide 15 min read Fixed On Demand lets a TPP initiate multiple domestic payments at a fixed amount from…",
    "headings": [
      "Fixed On Demand — API Guide 15 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Matching the PII against the consent",
      "Duplicate-in-flight check",
      "Response"
    ],
    "body": `LFI · Banking · Service Initiation · Fixed On Demand Fixed On Demand — API Guide 15 min read Fixed On Demand lets a TPP initiate multiple domestic payments at a fixed amount from a customer's account at your LFI via the API Hub. The customer authorises the consent once — approving a specific per-payment amount and periodic limits — and the TPP can then submit individual payments on-demand without re-authorisation. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every payment under the consent from creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Fixed On Demand Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor, matching the payment-time PII against the consent, and applying the duplicate-in-flight check that is specific to on-demand consent types. Before implementing Fixed On Demand, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Fixed On Demand advertised — ApiMetadata.FixedOnDemand.Supported is set to true on your authorisation server entry in the Trust Framework. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules is enumerated in Fixed On Demand Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. Read the kid from the JWE protected header and look up the matching Enc1 private key. Decrypt the JWE → recover the inner JWS. Decode the JWS payload (signature verification is optional ). Validate the decoded payload against the consent-time PII schema — AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII . For the per-step deep dive see How to Decrypt PII . The decrypted consent-time PII for a Fixed On Demand consent looks like: If decryption fails, schema validation fails, or any required field is missing, respond with invalid per Rejecting an invalid consent . Validating the Creditor For Fixed On Demand, Initiation.Creditor MUST be an array of exactly one entry — the single creditor that every payment under this consent will pay. The full Creditor rules are in Creditor . Cardinality — exactly one entry. Mandatory fields — CreditorAccount.SchemeName == "IBAN" , valid UAE IBAN, at least one of Name.en or Name.ar . BIC consistency — derive the BIC from the IBAN; if CreditorAgent.Identification was supplied it MUST match. Domestic rail reachability — the receiving bank is reachable on AANI or UAEFTS. Validating the DebtorAccount If the TPP supplied Initiation.DebtorAccount in the consent PII, your LFI MUST also validat`
  },
  {
    "title": "Fixed On Demand — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Fixed On-Demand — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-on-demand/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Fixed On-Demand Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Fixed On-Demand Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Fixed Periodic Schedule - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Fixed Periodic Schedule · UX Fixed Periodic Schedule — User Experience 4 min read When a customer is redirected to you to authorize a Fixed Periodic…",
    "headings": [
      "Fixed Periodic Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Fixed Periodic Schedule · UX Fixed Periodic Schedule — User Experience 4 min read When a customer is redirected to you to authorize a Fixed Periodic Schedule payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that recurring payments of a fixed amount will be made at a set frequency. The page must collect the customer's explicit and informed consent, and it must accurately reflect the key details of the consent (payee, amount per payment, payment frequency, etc.) The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Fixed Periodic Schedule — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Multi-Payments · Fixed Periodic Schedule Fixed Periodic Schedule — API Guide 14 min read Fixed Periodic Schedule lets a TPP initiate a…",
    "headings": [
      "Fixed Periodic Schedule — API Guide 14 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Matching the PII against the consent",
      "Response",
      "Error responses"
    ],
    "body": `LFI · Banking · Service Initiation · Multi-Payments · Fixed Periodic Schedule Fixed Periodic Schedule — API Guide 14 min read Fixed Periodic Schedule lets a TPP initiate a recurring series of domestic payments at a fixed amount on a regular period (e.g. weekly, monthly, quarterly) from a customer's account at your LFI via the API Hub. The TPP supplies the amount, the period, and the overall date range at consent time, and the customer authorises the full periodic schedule once. In each period the TPP submits one payment without re-authorisation — the Hub enforces at-most-one execution per period. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every periodic payment under the consent from creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Fixed Periodic Schedule Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor, and matching the payment-time PII against the consent. Before implementing Fixed Periodic Schedule, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Fixed Periodic Schedule advertised — ApiMetadata.FixedPeriodicSchedule.Supported is set to true on your authorisation server entry in the Trust Framework. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules — standardVersion , Initiation.DebtorAccount , BaseConsentId , CurrencyRequest , payment-type support, PII conformance, creditor checks — is enumerated in Fixed Periodic Schedule Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. The end-to-end flow is: Read the kid from the JWE protected header and look up the matching Enc1 private key Decrypt the JWE → recover the inner JWS Decode the JWS payload (signature verification is optional — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit) Validate the decoded payload against the consent-time PII schema — AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII in uae-api-hub-consent-manager-openapi.yaml . additionalProperties: false is set at every level, so any unexpected field fails validation Happy-path snippet: For the per-step deep dive — kid lookup conventions, key import options, the optional JWS signature verification, building the ajv / jsonschema validator with all $ref schemas registered — see How to Decrypt PII . The de`
  },
  {
    "title": "Fixed Periodic Schedule — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-periodic-schedule/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Fixed Periodic Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Fixed Periodic Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Fixed Periodic Schedule — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Functional Certification — Bank Data Sharing",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Testing & Certification · Functional Certification Functional Certification — Bank Data Sharing 3 min read Functional Certification proves that your Ozone Connect implementation…",
    "headings": [
      "Functional Certification — Bank Data Sharing 3 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Bank Data Sharing 3 min read Functional Certification proves that your Ozone Connect implementation of the Bank Data Sharing endpoints returns correct, complete data — endpoint by endpoint — and that the same data flows through the API Hub to a TPP. This page explains what the evidence is and how to produce it; the portal then builds your submission for you. Start your submission ↗ Functional Certification is one of the certification areas an LFI must satisfy before publishing API resources to the production Trust Framework. For Bank Data Sharing, it demonstrates — endpoint by endpoint — that your Ozone Connect endpoints behave as the standard requires, and that the same data is correctly returned to a TPP through the API Hub resource server. All evidence must come from your own pre-production environment . The portal walks you through Bank Data Sharing endpoints. For every endpoint your implementation exposes, have the following ready: Testing Tool output — the HTML report the Testing Tool produces for your Ozone Connect endpoint (e.g. GET /accounts/{AccountId}/balances ). Outcome & notes — whether every test passed, and where any failed or were skipped, a short explanation of why. Postman success screenshot — a screenshot from the Postman collection showing a successful response from the TPP-facing equivalent endpoint on the API Hub resource server (e.g. /accounts ). Full JSON response — the complete JSON body returned by that same TPP-facing call. Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document and every file you uploaded, organised per endpoint. Attach that ZIP to a Service Desk certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Functional Certification — Confirmation of Payee",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Testing & Certification · Functional Certification Functional Certification — Confirmation of Payee 3 min read Functional Certification proves that your Ozone Connect Confirmation…",
    "headings": [
      "Functional Certification — Confirmation of Payee 3 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Confirmation of Payee 3 min read Functional Certification proves that your Ozone Connect Confirmation of Payee implementation returns the correct account-holder name, and that the API Hub then produces the right name-match verdict — Yes, Partial, No, and account-not-found — for the payee names a TPP submits. This page explains what the evidence is and how to produce it; the portal then builds your submission for you. Start your submission ↗ Confirmation of Payee has a single Ozone Connect endpoint, . Unlike Bank Data Sharing, the LFI does not decide the match — your endpoint returns the account-holder name and the API Hub applies the name-matching rules to produce the verdict. Functional Certification therefore proves each match outcome , per segment: that the name you return, matched against the name a TPP submits, yields the correct NameMatchIndicator . All evidence must come from your own pre-production environment . You choose the version and segments (Retail is evidenced with a personal name; SME and Corporate with a business name), then evidence each of the outcomes per segment. Have the following ready: Testing Tool output — one HTML report the Testing Tool produces for your Ozone Connect cop-query endpoint. Requested name & IBAN — for each outcome, the name and IBAN you sent in the confirmation request. Craft the name to force the outcome: exact for Yes, close for Partial, different for No, and an unrecognised IBAN for account-not-found. Name you returned — the full name (and, if collected, first and last name) or business name your cop-query returned as the LFI. Account-not-found returns an empty data object instead. Postman verdict screenshot — a screenshot from the Postman collection showing the TPP-facing POST /confirmation response with the expected NameMatchIndicator (or HTTP 204 for account-not-found). Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per scenario. Attach that ZIP to a Service Desk certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Functional Certification — Delegated SCA",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/delegated-sca/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — Functional Certification — Delegated SCA",
    "headings": [],
    "body": ""
  },
  {
    "title": "Functional Certification — Fixed Defined Schedule",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-defined-schedule/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — Functional Certification — Fixed Defined Schedule",
    "headings": [],
    "body": ""
  },
  {
    "title": "Functional Certification — Fixed On-Demand",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-on-demand/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — Functional Certification — Fixed On-Demand",
    "headings": [],
    "body": ""
  },
  {
    "title": "Functional Certification — Fixed Periodic Schedule",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-periodic-schedule/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — Functional Certification — Fixed Periodic Schedule",
    "headings": [],
    "body": ""
  },
  {
    "title": "Functional Certification — Insurance Data Sharing",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/insurance-data-sharing/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Testing & Certification · Functional Certification Functional Certification — Insurance Data Sharing 3 min read Functional Certification proves that your Ozone Connect…",
    "headings": [
      "Functional Certification — Insurance Data Sharing 3 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Insurance Data Sharing 3 min read Functional Certification proves that your Ozone Connect implementation of the Insurance Data Sharing endpoints returns correct, complete policy data — sector by sector — and that the same data flows through the API Hub to a TPP. This page explains what the evidence is and how to produce it; the portal then builds your submission for you. Start your submission ↗ Functional Certification is one of the certification areas an LFI must satisfy before publishing API resources to the production Trust Framework. For Insurance Data Sharing, it demonstrates — endpoint by endpoint — that your Ozone Connect endpoints return the policies the standard requires for each insurance sector you underwrite, and that the same data is correctly returned to a TPP through the API Hub resource server. All evidence must come from your own pre-production environment . This area certifies policy retrieval ( ReadInsurancePolicies ). The encrypted Premium field — returned as a JWE and gated by ReadInsurancePremium — has its own certification and is out of scope here. The portal walks you through the Insurance Data Sharing endpoints — a policy-collection and a policy-by-id endpoint per sector. Implement only the sectors your LFI underwrites; for every endpoint you expose, have the following ready: Testing Tool output — the HTML report the Testing Tool produces for your Ozone Connect endpoint (e.g. GET /motor-insurance-policies/{InsurancePolicyId} ). Outcome & notes — whether every test passed, and where any failed or were skipped, a short explanation of why. Postman success screenshot — a screenshot from the Postman collection showing a successful response from the TPP-facing equivalent endpoint on the API Hub resource server (e.g. /motor-insurance-policies ). Full JSON response — the complete JSON body returned by that same TPP-facing call. Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document and every file you uploaded, organised per endpoint. Attach that ZIP to a Service Desk certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Functional Certification — Single Instant Payment",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Testing & Certification · Functional Certification Functional Certification — Single Instant Payment 4 min read Functional Certification proves that your Ozone Connect Single…",
    "headings": [
      "Functional Certification — Single Instant Payment 4 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Single Instant Payment 4 min read Functional Certification proves that your Ozone Connect Single Instant Payment implementation executes a payment correctly end to end: it selects the right rail, reaches the correct terminal status for that rail, propagates status to the Consent Manager Payment Log, decrypts and validates the Creditor, consumes the Risk object, and honours the account, balance, and refund reads a payment consent can carry. This page explains what the evidence is and how to produce it; the portal then builds your submission for you. Start your submission ↗ Single Instant Payment is the first of the seven UAE Open Finance payment types, and each type is certified separately. Your Ozone Connect POST /payments returns 201 with status Pending ; your LFI then executes the payment on a rail and PATCHes the terminal status to the Consent Manager Payment Log . Because your LFI is the only party that sees the raw rail outcome, Functional Certification proves that each supported rail reaches the correct terminal status, that timing and rejection are handled, and that the encryption-model steps — decrypting the Creditor and consuming the Risk object — are performed. All evidence must come from your own pre-production environment . You choose the version and segments (Retail / SME / Corporate), declare the rails you support ( ), and state your payment limit. Then have the following ready: Testing Tool output — one HTML report the Testing Tool produces for your Ozone Connect POST /payments endpoint, plus a Postman screenshot of a successful POST /payments returning 201 Pending . Terminal status per rail — for each rail you declare, a Postman screenshot evidencing the terminal status it reaches (AANI → AcceptedWithoutPosting ; Intra-bank and UAEFTS → AcceptedCreditSettlementCompleted ). AANI timing, reference & a rejection — the POST /payments , rail-submission, and terminal-PATCH timestamps (with screenshots); the CreditorReference received on POST /payments and a screenshot showing it carried into the AANI (pacs.008) submission to the receiving bank; and one example of an AANI rejection mapped to Rejected with an AANI.<code> reason. Creditor & Risk — screenshots evidencing decryption of the payment PII, validation of the Creditor account, and that the Risk object is used in your screening. Account, balance & refund reads — Postman screenshots of GET /accounts and GET /accounts/{AccountId}/balances before a payment, and GET /payment-consents/{ConsentId}/refund after one, on the same payment consent ( ), each with a screenshot of the authorisation page the customer authorised that consent on. Authorisation-screen scenarios — screenshots of your authorisation page, each with its pre-production ConsentId: the debtor account when the TPP specified it in the consent, and each Confirmation of Payee NameMatchIndicator — ConfirmationOfPayee.Yes , ConfirmationOfPayee.Partial , and ConfirmationOfPayee.No — surfaced to the customer. Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your LFI. When you have filled in the form and attached your evidence, the portal generates a single ZIP containing a summary document, your Testing Tool report, and every screenshot, organised per evidence group. Attach that ZIP to a Service Desk certification-evidence ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Functional Certification — Variable Defined Schedule",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-defined-schedule/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — Functional Certification — Variable Defined Schedule",
    "headings": [],
    "body": ""
  },
  {
    "title": "Functional Certification — Variable On-Demand",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-on-demand/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — Functional Certification — Variable On-Demand",
    "headings": [],
    "body": ""
  },
  {
    "title": "Functional Certification — Variable Periodic Schedule",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-periodic-schedule/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — Functional Certification — Variable Periodic Schedule",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Health Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/health-insurance-policies-InsurancePolicyId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get a Health Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Home Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/home-insurance-policies-InsurancePolicyId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get a Home Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Life Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/life-insurance-policies-InsurancePolicyId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get a Life Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Motor Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/motor-insurance-policies-InsurancePolicyId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get a Motor Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Payment by PaymentId",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get a Payment by PaymentId",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Renters Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/renters-insurance-policies-InsurancePolicyId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get a Renters Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Travel Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/travel-insurance-policies-InsurancePolicyId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get a Travel Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Accounts",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Accounts",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Accounts — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Accounts — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get an Employment Insurance Policy",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/employment-insurance-policies-InsurancePolicyId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get an Employment Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Auth",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Auth",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Balances for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Balances for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Balances for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-balances",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Balances for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Beneficiaries for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Beneficiaries for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Beneficiaries for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-beneficiaries",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Beneficiaries for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Consent Audit",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-audit",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Consent Audit",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Consent by ID",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Consent by ID",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Consents",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Consents",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Consents by Account",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/accounts-accountId-consents",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Consents by Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Consents by End User",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Consents by End User",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Consents in Consent Group",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Consents in Consent Group",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Customer for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Customer for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Customer for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-customer",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Customer for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Customers",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Customers",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Customers — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/customer",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Customers — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Direct Debits for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Direct Debits for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Direct Debits for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-direct-debits",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Direct Debits for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Employment Insurance Policies",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/employment-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get Employment Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Health Insurance Policies",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/health-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get Health Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Home Insurance Policies",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/home-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get Home Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Life Insurance Policies",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/life-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get Life Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Motor Insurance Policies",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/motor-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get Motor Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Payment Log",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Get Payment Log",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Product Configuration for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Product Configuration for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Product Configuration for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-products",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Product Configuration for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Products",
    "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/products",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Products",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Products — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/field-mapping/products",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Products — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Renters Insurance Policies",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/renters-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get Renters Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Scheduled Payments for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Scheduled Payments for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Scheduled Payments for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-scheduled-payments",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Scheduled Payments for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Standing Orders for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Standing Orders for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Standing Orders for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-standing-orders",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Standing Orders for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Statements for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Statements for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Statements for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-statements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Statements for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Transactions for an Account",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Transactions for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Transactions for an Account — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-transactions",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Get Transactions for an Account — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Travel Insurance Policies",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/travel-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Get Travel Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Getting Started as an LFI",
    "path": "/tech/lfi-api-hub/getting-started/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Getting Started Getting Started as an LFI 6 min read This page outlines the end-to-end journey for a Licensed Financial Institution (LFI) integrating with the UAE Open…",
    "headings": [
      "Getting Started as an LFI 6 min read",
      "Pre-production: Build & Integrate",
      "Certification",
      "Production: Launch",
      "Step 1. Onboard to the Sandbox Trust Framework",
      "Step 2. Set Up and Connect to the Pre-Production API Hub",
      "Step 3. Develop Your Open Finance APIs",
      "Step 4. Test and Certify Your Open Finance Capabilities",
      "Step 5. Onboard to the Production Trust Framework",
      "Step 6. Set Up and Connect to the Production API Hub",
      "Step 7. Validate Your APIs in Production",
      "Step 8. Publish Your Open Finance Resources to the Ecosystem"
    ],
    "body": "LFI · Getting Started Getting Started as an LFI 6 min read This page outlines the end-to-end journey for a Licensed Financial Institution (LFI) integrating with the UAE Open Finance ecosystem — from first onboarding in the sandbox environment through to live operation with Third-Party Providers (TPPs). The journey is organised into three phases. Each step builds on the previous one, and each phase should be completed before progressing to the next. Phase A Pre-production: Build & Integrate Register, connect, and develop against the pre-production environment. Jump to phase ↓ Phase B Certification Evidence that your implementation meets the functional, user experience, performance, and security standards. Jump to phase ↓ Phase C Production: Launch Repeat onboarding in production, validate, publish your resources, and prove live with TPPs. Jump to phase ↓ A consolidated view of responsibilities across the ecosystem is maintained in the LFI Integration Guide overview . Steps 1, 2, 5 and 6 (Trust Framework and API Hub onboarding) are one-off activities per environment. Steps 3, 4 and 7–9 can be delivered iteratively — capability by capability. A bank may, for example, take Data Sharing through development, certification and production first, then return to deliver Service Initiation through the same steps later. All in-scope capabilities MUST be live by the regulatory compliance deadline, but the path to get there can be staged. See the Recommended Bank Rollout Plan or the Recommended Insurance Rollout Plan for suggested sequencing. Step 1. Onboard to the Sandbox Trust Framework Register your organisation with the UAE Open Finance Trust Framework in the sandbox. The Trust Framework is the central directory of ecosystem participants — you must be registered here before you can connect to anything else. Prerequisites Organisation details and authorised signatories identified. Nominated Organisation Admins and additional users. Transport and signing certificates issued by an approved Certificate Authority (see Keys & Certificates ). Agreement on the Trust Framework Roles your organisation requires. What to do Complete the Trust Framework onboarding process , including organisation admin sign-up and adding users . Upload your Client Transport and Client Signing certificates. Register your Application and create the C3-hh-cm-client that the API Hub will use to call your services. Record organisation contacts . Done when Your organisation is visible in the sandbox directory with the correct LFI role. Your application is registered and certificates are bound to it. At least one Organisation Admin and one technical user can authenticate. Step 2. Set Up and Connect to the Pre-Production API Hub The UAE Open Finance API Hub (operated by Nebras, with vendor support from Ozone API) is the central intermediary that sits between LFIs and TPPs. It handles OIDC/FAPI security, consent lifecycle, request routing, and schema enforcement. You connect to the Hub once; the Hub manages the complexity of multi-TPP interoperability on your behalf. Prerequisites Step 1 complete. Infrastructure and network teams engaged; outbound/inbound routes to pre-production Hub endpoints agreed. mTLS certificate material in place from Step 1. What to do Complete the Prerequisites Questionnaire . Set up Connectivity & Certificates . Configure Application Layer Authentication , then implement the mTLS and JWT Auth layers . Apply the Environment-Specific configuration for pre-production (Ozone Connect base URL, authorization endpoint, certificate walkthroughs). Done when The Hub can complete an mTLS handshake with your pre-production environment. A test request flows end-to-end: Hub → your Ozone Connect endpoint → response back to the Hub. Your application-layer authentication (JWT signatures, audience, expiry) is verified by the Hub. Step 3. Develop Your Open Finance APIs This is the core build phase. It covers both directions of integration between the LFI and the Hub: "
  },
  {
    "title": "Headless Heimdall Auth Server",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Headless Heimdall Headless Heimdall Auth Server 2 min read The Headless Heimdall Auth Server is an API provided by the API Hub that powers the consent…",
    "headings": [
      "Headless Heimdall Auth Server 2 min read"
    ],
    "body": "LFI · API Hub · Headless Heimdall Headless Heimdall Auth Server 2 min read The Headless Heimdall Auth Server is an API provided by the API Hub that powers the consent authorisation journey. It shields your authorisation server from the complexity of raw OIDC and FAPI 2.0 — your system calls three endpoints at the appropriate points in the customer journey and the API Hub handles the rest. Environment URL Pre-production https://hh.{lfiCode}.preprod.apihub.openfinance.ae Production https://hh.{lfiCode}.apihub.openfinance.ae Where {lfiCode} is the LFI Code assigned during API Hub onboarding . All requests to the Headless Heimdall Auth Server MUST be made using the C3-hh-cm-client application registered in the Trust Framework. This is the same client used to call the Consent Manager . Requests MUST be made over mutual TLS using the C3 transport client certificate. If your API Hub is configured for JWT Auth , you MUST also include a signed JWT in the Authorization header, signed with the Sig4 signing key. See Connectivity & Certificates for the full certificate mapping, and Creating the C3-hh-cm-client Application for setup instructions. When a TPP initiates a consent request, the API Hub creates the consent record and redirects the end user to your authorisation endpoint. From that point, your authorisation server interacts with the Headless Heimdall Auth Server to coordinate the FAPI 2.0 authorisation code flow: GET /auth — Your authorisation server calls this at the start of every authorisation code grant. The API Hub validates the FAPI/OIDC request and returns the interaction context and the decoded consent details. Your system uses these details to present the consent to the end user for approval. POST /auth/{interactionId}/doConfirm — After the end user has authenticated and authorised the consent, your system calls this to complete the interaction. The API Hub updates the consent state and issues tokens to the TPP. POST /auth/{interactionId}/doFail — If authentication fails or the end user rejects the consent, your system calls this to end the interaction. The API Hub initiates an error redirect back to the TPP. During the authorisation journey, your system will typically also call the Consent Manager to read the full consent object and update its state. Both APIs work together to complete the journey. For the full API flow, see the Consent Journey API Guide . The full API reference for each endpoint is available in the sidebar under API Reference . Use GET /hello-mtls to verify your mTLS connectivity before calling other endpoints."
  },
  {
    "title": "Health Check",
    "path": "/tech/lfi-api-hub/v2.1/health-check/",
    "category": "LFI Integration",
    "section": "Health Check",
    "description": "LFI · Ozone Connect · Health Check Health Check 2 min read The Health Check API is a small family of Ozone Connect endpoints implemented by your LFI. The API Hub calls these…",
    "headings": [
      "Health Check 2 min read"
    ],
    "body": "LFI · Ozone Connect · Health Check Health Check 2 min read The Health Check API is a small family of Ozone Connect endpoints implemented by your LFI. The API Hub calls these endpoints to verify end-to-end connectivity, mutual TLS, and client-certificate propagation between the Hub and your Ozone Connect surface. These endpoints MUST be implemented and reachable before your integration can proceed to testing — they are the first endpoints Ozone will call during onboarding connectivity validation , and they are used again whenever you rotate certificates or change network routing. Endpoint Purpose GET /hello Basic connectivity check with no mTLS. Confirms network routing and that your Ozone Connect server is reachable from the Hub. GET /hello-mtls Same as /hello but requires a valid client certificate. Confirms that mutual TLS is correctly terminated at your edge. GET /echo-cert Returns the client certificate details your server received. Used to debug certificate propagation through reverse proxies and load balancers — useful when mTLS appears to succeed at the edge but the cert is stripped before reaching your application. During onboarding. Before your integration can proceed to testing, Ozone runs end-to-end connectivity validation in both directions. On the LFI side, this means calling /hello , /hello-mtls , and /echo-cert on your Ozone Connect server. See Environment Specific — end-to-end validation . After certificate rotation. Whenever transport certificates are rotated or network routing changes, the same endpoints are used to re-verify connectivity. For ongoing health monitoring. The Hub may periodically call /hello and /hello-mtls to confirm the LFI surface remains reachable. These endpoints sit on your Ozone Connect server alongside the Banking and Consent Events APIs. If you configure a path override for the Health Check family during onboarding, the Hub calls OzoneConnectURL/<path>/<endpoint> — see Environment Specific — optional API family base paths ."
  },
  {
    "title": "Hello",
    "path": "/tech/lfi-api-hub/v2.1/health-check/open-api/hello",
    "category": "LFI Integration",
    "section": "Health Check",
    "description": "Health Check — Hello",
    "headings": [],
    "body": ""
  },
  {
    "title": "Hello MTLS",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/hello-mtls",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Hello MTLS",
    "headings": [],
    "body": ""
  },
  {
    "title": "Hello MTLS",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/hello-mtls",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Hello MTLS",
    "headings": [],
    "body": ""
  },
  {
    "title": "Hello MTLS",
    "path": "/tech/lfi-api-hub/v2.1/health-check/open-api/hello-mtls",
    "category": "LFI Integration",
    "section": "Health Check",
    "description": "Health Check — Hello MTLS",
    "headings": [],
    "body": ""
  },
  {
    "title": "How to Decrypt PII",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · PII · API Guide How to Decrypt PII 3 min read The PersonalIdentifiableInformation field is a compact JWE (JSON Web Encryption) string. It was…",
    "headings": [
      "How to Decrypt PII 3 min read",
      "Obtaining the OpenAPI specification",
      "Validating against the schema"
    ],
    "body": "LFI · Banking · Service Initiation · PII · API Guide How to Decrypt PII 3 min read The PersonalIdentifiableInformation field is a compact JWE (JSON Web Encryption) string. It was encrypted by the TPP using your LFI's public encryption key ( Enc1 ). To decrypt it, you need the corresponding Enc1 private key . The JWE protected header contains the kid (Key ID) of the encryption key that was used. Decode the first segment of the JWE to identify which private key to use: Decrypt the JWE using your Enc1 private key. The result is the inner JWS (signed JWT): The inner JWS contains the PII JSON in its payload. Decode the payload to access the PII fields: The JWS is signed by the TPP. You may optionally verify this signature against the TPP's public signing key. However, this is not required — the entire request containing the PII field is itself sent as a JWS that the API Hub has already verified was signed by the TPP. The PII therefore cannot have been tampered with in transit. If you choose to implement JWS verification for defence-in-depth, see Verify TPP Signature (Optional) . After decrypting, the LFI MUST validate the PII payload against the relevant OpenAPI schema. The PII has not been validated by the API Hub — schema validation is the LFI's responsibility. Stage Spec file Schema Consent uae-api-hub-consent-manager-openapi.yaml AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII Payment uae-ozone-connect-bank-service-initiation-openapi.yaml AEBankServiceInitiation.AEDomesticPaymentPIIProperties Obtaining the OpenAPI specification The OpenAPI YAML files are the source of truth for PII schemas. They are maintained in the canonical specification repository: Nebras-Open-Finance/api-specs Spec files are located under dist/ by category: Stage Path Consent dist/api-hub/{version}/openapi/uae-api-hub-consent-manager-openapi.yaml Payment dist/ozone-connect/{version}/openapi/uae-ozone-connect-bank-service-initiation-openapi.yaml Specifications may have errata releases (e.g. v2.1.x-errata1 ) that contain targeted corrections. When multiple version folders exist for the same major.minor version, use the highest errata that contains the file you need. If a file is not present in an errata folder, fall back to the base version. Always check for errata before bundling a spec into your service. Validating against the schema Extract the relevant components/schemas entry from the YAML file and validate the decrypted PII payload against it. The PII schemas in the OpenAPI specification already declare the constraints needed for validation: additionalProperties: false is set at every level of the PII schema — any unexpected fields will cause validation to fail. required arrays are declared on sub-schemas (e.g. CreditorAccount is required on each creditor entry, SchemeName and Identification are required on account objects) — missing mandatory fields will cause validation to fail. enum constraints restrict values to allowed options (e.g. SchemeName must be IBAN ). $ref pointers link to nested schemas (creditor, debtor, risk). For validation to work correctly, all components/schemas entries from the spec MUST be registered with the validator so that $ref pointers resolve. When you register the full set of component schemas and compile the PII schema, standard JSON Schema validators ( ajv for Node.js, jsonschema for Python) will enforce all of these constraints automatically. No custom validation logic is needed for schema conformance — the OpenAPI spec is the single source of truth. The following example shows how to validate a domestic payment PII at consent time: If the decrypted PII fails schema validation, the LFI MUST reject the consent or payment. Do not attempt to process a payment with malformed PII — return an appropriate error response. See Personal Identifiable Information for the full set of validation rules."
  },
  {
    "title": "Implementation Guide",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "LFI · Consent Journey · Authentication · Implementation Implementation Guide 5 min read This page provides best-practice guidance for LFIs implementing authentication in the Open…",
    "headings": [
      "Implementation Guide 5 min read",
      "How it works",
      "Device binding",
      "Native biometrics",
      "Fallback to PIN/password",
      "Mobile browser — browser-based authentication",
      "Mobile browser — app handoff via push notification",
      "Desktop browser — QR code or push notification",
      "FIDO2",
      "Passkeys",
      "Secure Payment Confirmation (SPC)",
      "OpenID for Verifiable Credentials"
    ],
    "body": "LFI · Consent Journey · Authentication · Implementation Implementation Guide 5 min read This page provides best-practice guidance for LFIs implementing authentication in the Open Finance consent journey. The recommendations here reflect the approach most likely to satisfy SCA requirements , pass CX certification, and deliver an experience consistent with best-in-class mobile banking. The strongest and most seamless authentication approach combines a device-bound mobile app with native biometric authentication . This is the approach used by leading banking apps globally and satisfies SCA with minimal friction. How it works Step What happens SCA factor 1 The Authorization Endpoint deep link opens the LFI app — 2 The app verifies it is running on the bound device by checking cryptographic keys stored in the secure element Possession — the device the app is bound to 3 The app prompts for a native biometric (Face ID, Touch ID, fingerprint) Inherence — the end user's biometric 4 SCA is satisfied (two factors). The end user proceeds to review and authorize the consent — This is best-in-class because: It is fast — a single biometric gesture, no typing, no waiting for OTPs It is familiar — identical to opening the banking app normally It is secure — private keys in the secure element, biometric verification on-device It satisfies SCA — possession (bound device) + inherence (biometric) Device binding The LFI app MUST be bound to the end user's device during the app's initial registration or enrolment. Binding MUST be established through: A cryptographic key pair generated in the device's secure element (Secure Enclave on iOS, StrongBox/TEE on Android) The public key registered with the LFI's backend during enrolment The private key remaining on-device and never exported On each authentication, the app verifies device binding by performing a cryptographic operation with the private key. This is silent to the end user — no user interaction is required for the possession factor. Native biometrics The biometric authentication MUST use the device's native biometric APIs: Platform API Biometrics supported iOS Local Authentication framework / Face ID / Touch ID Face ID, Touch ID Android BiometricPrompt API Fingerprint, face unlock, iris (device-dependent) The biometric prompt MUST be the platform-native prompt. LFIs MUST NOT implement custom biometric capture. The operating system handles the biometric matching against enrolled biometrics; the result is an assertion that the enrolled user is present. Fallback to PIN/password If native biometrics are not available (not enrolled, hardware not present, or user preference), the app MUST fall back to a knowledge factor: PIN or password entry within the LFI app This combined with the bound device still satisfies SCA (possession + knowledge) For payment consents, the flow extends with a biometric confirmation at the point of authorization: The step-up biometric at step 5 confirms the end user's intent to authorize the specific payment. This maps directly to how banking apps handle payment confirmation and satisfies the CBUAE directive's step-up requirement for sensitive actions. The Overview defines the scenarios where the end user does not have the LFI app installed. This section provides implementation detail for those flows. Mobile browser — browser-based authentication If the LFI already supports browser-based authentication in its digital channels, the same capability MUST be available for Open Finance. The SCA requirements apply — the browser flow must achieve two-factor authentication: Factor Browser-based approach Possession Verified through a registered credential (e.g. a FIDO2/Passkey credential bound to the device, or a device fingerprint established during prior enrolment) Inherence or Knowledge Biometric authentication via WebAuthn/FIDO2 (if supported), or PIN/password entry Mobile browser — app handoff via push notification When the LFI does not support browser-based authentication, the"
  },
  {
    "title": "Initialize a User Challenge",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-challenge-initialize",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Initialize a User Challenge",
    "headings": [],
    "body": ""
  },
  {
    "title": "Initialize User Registration",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Initialize User Registration",
    "headings": [],
    "body": ""
  },
  {
    "title": "Insurance",
    "path": "/tech/lfi-api-hub/v2.1/insurance/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI Standards · v2.1 · Insurance Insurance 2 min read The Open Finance Insurance capabilities enable secure and efficient sharing of insurance policy data — empowering third-party…",
    "headings": [
      "Insurance 2 min read",
      "Browse the Insurance capabilities"
    ],
    "body": "LFI Standards · v2.1 · Insurance Insurance 2 min read The Open Finance Insurance capabilities enable secure and efficient sharing of insurance policy data — empowering third-party providers (TPPs) with the tools they need to deliver policy aggregation, switching, broking, and value-added digital insurance services. All services operate under strict consent management and granular data access permissions, mediated and validated by the API Hub. Capabilities Browse the Insurance capabilities The full set of capability areas covered by the LFI Insurance standards. Open →"
  },
  {
    "title": "Insurance Data Sharing",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Insurance · LFI capability Insurance Data Sharing 2 min read The Open Finance Insurance Data Sharing capabilities let your LFI expose a customer’s policy data to consented TPPs…",
    "headings": [
      "Insurance Data Sharing 2 min read",
      "Insurance Service Provider",
      "Coverage matrix Insurance types covered Implement the endpoint pair for each insurance sector your LFI underwrites. The Hub routes requests by path; sectors you do not offer simply remain unmounted. Insurance Type List policies Get a policy / -insurance-policies GET GET Section contents Browse this section The full set of pages for the Insurance Data Sharing API on the LFI side. Requirements Insurance Data Sharing — Requirements",
      "Insurance Data Sharing — API Guide",
      "Insurance Data Sharing — User Journeys"
    ],
    "body": "Insurance · LFI capability Insurance Data Sharing 2 min read The Open Finance Insurance Data Sharing capabilities let your LFI expose a customer’s policy data to consented TPPs across the UAE’s major insurance sectors. Implementation mirrors Bank Data Sharing: the API Hub validates consent, proxies requests to your Ozone Connect server, and returns the response to the TPP. Access control Required role ISP Insurance Service Provider Access to the Insurance Data Sharing APIs requires TPPs to hold the ISP role. The API Hub validates the role on every request before proxying it to your Ozone Connect endpoints. What your Ozone Connect endpoints expose Coverage matrix Insurance types covered Implement the endpoint pair for each insurance sector your LFI underwrites. The Hub routes requests by path; sectors you do not offer simply remain unmounted. Insurance Type List policies Get a policy / -insurance-policies GET GET Section contents Browse this section The full set of pages for the Insurance Data Sharing API on the LFI side. Requirements Insurance Data Sharing — Requirements Validation rules and behaviour your Ozone Connect endpoints must follow. Open → API Guide Insurance Data Sharing — API Guide How your Ozone Connect server receives, processes, and responds to Insurance Data Sharing requests proxied by the API Hub. Open → User Journeys Insurance Data Sharing — User Journeys The end-to-end customer flow when sharing insurance data — from the TPP consent screen through your LFI’s authorisation pages and back. Open → Endpoint OpenAPI reference for the Ozone Connect endpoint. Open spec →"
  },
  {
    "title": "Insurance Data Sharing — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Insurance · Data Sharing Insurance Data Sharing — API Guide 5 min read How your Ozone Connect server receives, processes, and responds to Insurance Data Sharing requests…",
    "headings": [
      "Insurance Data Sharing — API Guide 5 min read",
      "Field population",
      "Common request headers",
      "No pagination",
      "Error responses",
      "Required permission",
      "Example response",
      "Example response"
    ],
    "body": "LFI · Insurance · Data Sharing Insurance Data Sharing — API Guide 5 min read How your Ozone Connect server receives, processes, and responds to Insurance Data Sharing requests proxied by the API Hub. The end-to-end flow — consent validation, authorisation, token issuance — is identical to Bank Data Sharing; this page focuses on the insurance-specific differences. For Insurance Data Sharing, your LFI implements one pair of endpoints per insurance sector you underwrite on your Ozone Connect server: Endpoint Purpose GET /{type}-insurance-policies Return every policy of the named sector the consent grants access to. GET /{type}-insurance-policies/{InsurancePolicyId} Return the single policy identified by the path parameter, after checking it belongs to the consented customer. Substitute the sector slug ( employment , health , home , life , motor , renters , travel ) for {type} . Implement only the sectors your LFI underwrites — the API Hub will not route requests for unmounted sectors. During consent creation, if your LFI has configured the POST /consent/action/validate endpoint, the API Hub forwards the full insurance consent payload to your Ozone Connect server before the consent is created. For Insurance Data Sharing consents, consentType is cbuae-insurance-consents . The mechanics are identical to Bank Data Sharing — respond with data.status: valid to allow the consent, or invalid with an error if the requested permissions cannot be granted. See the Consent Journey API Guide — Validate the consent for the request and response shapes. Once the consent has been created, the TPP redirects the customer to your LFI’s authorisation endpoint — the same URL you registered for Bank Data Sharing. From there, your LFI runs the standard consent journey: authenticate the customer, retrieve the consent, let the customer approve or reject it, patch the customer identifier onto the consent, and redirect back to the Hub. The endpoints your LFI implements against the API Hub for this flow are the same as Bank Data Sharing — see Bank Data Sharing — Consent flow for the full list. The only difference for insurance is that there are no per-account identifiers to patch; the consent is granted at the policy-collection level per sector, and the Hub forwards each policy lookup directly to your endpoints. Field population Every field that exists on the LFI’s systems, or is derivable from them, MUST be populated in the response. TPPs rely on this data to serve customer use cases end-to-end — a field omitted by the LFI is a feature the TPP cannot build. Common request headers Insurance endpoints receive the same set of o3-* headers from the API Hub as Bank Data Sharing. See Common request headers for the full table. No pagination Insurance policy endpoints return the full set of consented policies for the named sector in a single response. There is no page query parameter, and Meta does not carry TotalPages or TotalRecords . If the consent grants access to twelve motor policies, your /motor-insurance-policies response MUST contain all twelve. Error responses Use the same UAE Open Finance error envelope and HTTP status codes as Bank Data Sharing. 404 for an InsurancePolicyId the consent does not grant access to. 403 if the policy exists but is not in a state your LFI surfaces (e.g. cancelled and outside the retention window). The Hub validates token, consent, and TPP role before the request reaches your endpoint; you do not re-validate any of those. GET /{type}-insurance-policies Return every active policy of the named sector the consent grants access to. Each Policy entry MUST include the fields required by the OpenAPI spec for that sector, plus every optional field your LFI holds. Required permission The Hub only routes the request to your endpoint if the consent contains ReadInsurancePolicies for the named sector. You do not need to re-check the permission. Example response GET /{type}-insurance-policies/{InsurancePolicyId} Return the single policy ide"
  },
  {
    "title": "Insurance Data Sharing — Encrypted Premiums",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/premiums",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Insurance · Data Sharing · API Guide Encrypted Premiums 4 min read The Premium field on every insurance policy response is an anyOf of a structured cleartext object or a…",
    "headings": [
      "Encrypted Premiums 4 min read"
    ],
    "body": "LFI · Insurance · Data Sharing · API Guide Encrypted Premiums 4 min read The Premium field on every insurance policy response is an anyOf of a structured cleartext object or a compact JWE string. Your LFI chooses, per policy, which shape to return. When you return a JWE, the TPP backend MUST NOT decrypt it — the payload is unwrapped only on the customer’s device. Encrypted premiums let your LFI surface commercially sensitive premium values to a customer-present TPP experience without the TPP backend ever holding the cleartext. The decision is per policy and entirely yours — the TPP and the API Hub do not influence it. Both shapes are valid under the OpenAPI spec, so the TPP is required to handle either on every call. Cleartext — appropriate when the premium is non-sensitive or already publicly disclosed (e.g. tariff-based products with published rates). Encrypted (JWE) — appropriate for individually underwritten policies where the premium reflects pricing decisions you do not want exposed in a TPP’s server-side analytics, switching pipelines, or third-party data flows. The Hub only routes the request with Premium in scope when the consent grants ReadInsurancePremium . If the permission is absent for the relevant sector, omit the Premium field entirely — do not return an empty object or a placeholder JWE. Populate the structured object directly under the Premium key. All five fields are required by the OpenAPI spec. Field Type Description PremiumAmountExcludingVAT string (amount) The Premium Amount excluding any VAT amount. PremiumVATAmount string (amount) The Premium VAT amount. TotalPremiumAmount string (amount) The total Premium amount including VAT. Currency string (ISO 4217) Currency of the premium amounts. PremiumFrequency enum The payment frequency the calculated Premium has been based on. Encrypt the same structured premium object as a compact JWE and place the resulting string directly under the Premium key — not wrapped in another object. The JWE mechanism mirrors Bank Data Sharing’s encrypted FinanceRates field — same algorithms, same client-side decryption pattern, same handling obligations on the TPP. The customer-side decryption flow is documented for TPPs at Encrypted Premiums ; treat the LFI obligations on this page as the producer-side equivalent. A single policy response carries exactly one of the two shapes — either the cleartext object or the JWE string. Do not include both keys, do not embed the JWE inside the structured object, and do not return a partially populated structured object alongside a JWE."
  },
  {
    "title": "Insurance Data Sharing — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/insurance-data-sharing/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Insurance Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Insurance Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Insurance Data Sharing — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Insurance Data Sharing — User Experience",
    "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/user-journeys",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Insurance · Data Sharing · UX Insurance Data Sharing — User Experience 2 min read When a customer is redirected to you to authorize an Open Finance consent for Insurance…",
    "headings": [
      "Insurance Data Sharing — User Experience 2 min read"
    ],
    "body": "LFI · Insurance · Data Sharing · UX Insurance Data Sharing — User Experience 2 min read When a customer is redirected to you to authorize an Open Finance consent for Insurance Data Sharing, you must present an Authorization Page that clearly explains what they are authorizing. The page must collect the customer’s explicit and informed consent, and it must accurately reflect each insurance type and permission set requested. Policies must be presented grouped by status — Active policies are selectable by default; policies in an end state ( Expired , Lapsed , Cancelled , Surrendered , Converted , DeathClaim , RiderClaim ) appear in a collapsible Inactive Policies group so the customer can see what is in scope but not select policies that can’t be shared. Statuses follow the AEInsurancePolicyStatusCodes enum defined in the Insurance OpenAPI spec. The wireframe below is interactive: edit the consent body and the simulated policies, and watch the LFI screen filter to the insurance types the TPP requested and bucket them by status. Customise the consentBody below and watch the wireframes above update live. The LFI screen only shows policies whose InsuranceType appears in Data.Permissions , and groups them by status."
  },
  {
    "title": "Insurance Quotation",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Insurance · LFI capability Insurance Quotation 3 min read The Insurance Quotation capability lets TPPs request quotes, drive the application through to policy issuance, and…",
    "headings": [
      "Insurance Quotation 3 min read",
      "Insurance Service Provider",
      "Coverage matrix Insurance types covered Implement the quote and policy endpoints for each insurance sector your LFI underwrites. The Hub routes requests by path; sectors you do not offer simply remain unmounted. Insurance Type Create Quote Retrieve / Accept Quote Create Policy / -insurance-quotes POST GET / PATCH POST Section contents Browse this section The full set of pages for the Insurance Quotation API on the LFI side. Requirements Insurance Quotation — Requirements",
      "New, Renewal & Switch",
      "Insurance Quotation — API Guide",
      "Insurance Quotation — User Journeys"
    ],
    "body": "Insurance · LFI capability Insurance Quotation 3 min read The Insurance Quotation capability lets TPPs request quotes, drive the application through to policy issuance, and receive real-time status updates — for every insurance sector your LFI underwrites. Your Ozone Connect endpoints execute the quote and policy lifecycle; the Hub mediates and fans status events out to subscribed TPPs. Access control Required role ISP Insurance Service Provider Access to the Insurance Quotation APIs requires TPPs to hold the ISP role. The API Hub validates the role on every request before proxying to your Ozone Connect endpoints. Unlike Insurance Data Sharing, there is no per-customer consent — TPPs authenticate with the Client Credentials Grant and act as themselves. What your Ozone Connect endpoints expose Coverage matrix Insurance types covered Implement the quote and policy endpoints for each insurance sector your LFI underwrites. The Hub routes requests by path; sectors you do not offer simply remain unmounted. Insurance Type Create Quote Retrieve / Accept Quote Create Policy / -insurance-quotes POST GET / PATCH POST Section contents Browse this section The full set of pages for the Insurance Quotation API on the LFI side. Requirements Insurance Quotation — Requirements Validation rules and behaviour your Ozone Connect endpoints must follow across the quote, accept, and policy creation steps. Open → Quote Types New, Renewal & Switch The semantic differences between the three QuoteType values and the per-type field requirements. Shared explainer referenced from the TPP standards as well. Open → API Guide Insurance Quotation — API Guide End-to-end walkthrough of the LFI-Led and TPP-Led flows, status emission via the quote-log, and the mapping from each PATCH to the event the Hub fans out. Open → User Journeys Insurance Quotation — User Journeys The hosted screens your LFI presents in LFI-Led mode (quote summary, customer verification, payment, documents) and the hosted payment URL handed back to the TPP in TPP-Led mode. Open →"
  },
  {
    "title": "Insurance Quotation — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Insurance · Quotation Insurance Quotation — API Guide 6 min read How your Ozone Connect server receives quote requests, accepts them, issues policies, and emits status…",
    "headings": [
      "Insurance Quotation — API Guide 6 min read",
      "PATCH-to-event mapping",
      "Your LFI hosts customer verification, payment, and documents",
      "TPP collects KYC; LFI hosts only the payment page"
    ],
    "body": "LFI · Insurance · Quotation Insurance Quotation — API Guide 6 min read How your Ozone Connect server receives quote requests, accepts them, issues policies, and emits status events through the Hub. Unlike Insurance Data Sharing there is no consent journey — the TPP authenticates with Client Credentials. The flow forks into two modes on accept: LFI-Led (your LFI hosts the customer through completion) and TPP-Led (the TPP collects KYC and surfaces an LFI-hosted payment URL). For each insurance sector your LFI underwrites, expose four endpoints on Ozone Connect: Endpoint Purpose POST /{type}-insurance-quotes Underwrite the request and return one or more quotes (or 204 to decline). GET /{type}-insurance-quotes/{QuoteId} Return the current state of a quote — used by TPPs polling between events. PATCH /{type}-insurance-quotes/{QuoteId} Accept the quote (declaring PolicyIssuanceAllowed ) and, in TPP-Led mode, receive KYC submissions. POST /{type}-insurance-policies Issue the policy from the accepted quote. Substitute the sector slug ( employment , health , home , life , motor , renters , travel ) for {type} . Mount only the sectors your LFI offers — the Hub returns 404 for unmounted sectors. Every status transition between Accept Quote and the terminal state is announced to the Hub by the LFI via PATCH /insurance-quote-log/{logId} on the Consent Manager surface. The Hub records the event and, where the TPP subscribed via the Subscription object on PATCH Accept Quote, delivers it to the TPP\\'s webhook. logId is the same value as the QuoteId . Each PATCH carries one of three body schemas drawn from the Hub spec — pending-completion, completed, or terminal. PATCH-to-event mapping Use this table to predict the event a TPP will receive for each PATCH you emit. The Hub forwards verbatim — the body you send is the body the webhook sees. When you emit QuoteStatus Required additional fields Resulting webhook event Immediately after Accept Quote ApplicationPending None Pending Completion event with QuoteStatus: ApplicationPending After TPP submits KYC (TPP-Led only) ApplicationApproved BrokerInstructions[].Url — the LFI-hosted payment page Pending Completion event with BrokerInstructions Premium adjustment requires re-pay PaymentRequired BrokerInstructions[].Url Pending Completion event with BrokerInstructions Policy issued (LFI-Led) PolicyIssued InsurancePolicyId Pending Completion event with policy reference Policy issued (TPP-Led) PolicyIssued Documents[] with SHA-256 hashes Pending Completion event with policy documents Flow complete Completed PolicyTerm , Premium , CustomerPaidInFull , PolicyCountrySubDivision , (optional) Commission Completed Status event — final Quote expired Expired (optional) Reason Terminal Status event — final LFI declines mid-flow Rejected / LFICancelled (optional) Reason Terminal Status event — final Customer abandons CustomerCancelled (optional) Reason Terminal Status event — final The Hub MUST receive statuses in the order shown above — PolicyIssued before Completed , never the reverse. Once any terminal ( Completed , Expired , Rejected , CustomerCancelled , LFICancelled ) is emitted, no further PATCHes are accepted for that logId . The two modes share the create/accept/issue skeleton but diverge in where customer KYC and payment happen. The walkthroughs below cover each end-to-end with the matching status events. LFI-Led Your LFI hosts customer verification, payment, and documents Single-PATCH accept flow. TPP redirects the customer to your LFI on accept; you drive the rest. Status events fan back through the Hub to the TPP. Open → TPP-Led TPP collects KYC; LFI hosts only the payment page Two-PATCH flow on the same quote. The TPP submits KYC; you respond with an LFI-hosted payment URL. After the customer pays, you issue and emit policy documents. Open → The validation differences between New , Renewal , and Switch are documented in the shared Quote Types explainer — the same page the TPP standards link to. Read"
  },
  {
    "title": "Insurance Quotation — LFI-Led Flow",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/lfi-led",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Insurance · Quotation · LFI-Led LFI-Led Flow 5 min read The TPP creates a quote and hands the customer to your LFI on accept. Your LFI hosts customer verification, payment,…",
    "headings": [
      "LFI-Led Flow 5 min read",
      "QuoteId minting"
    ],
    "body": 'LFI · Insurance · Quotation · LFI-Led LFI-Led Flow 5 min read The TPP creates a quote and hands the customer to your LFI on accept. Your LFI hosts customer verification, payment, and document delivery; the TPP’s only role after acceptance is to observe lifecycle events through the quote-log. The Hub validates the TPP’s access token, signed request, and schema, then proxies to your endpoint with the sector slug in the path. Receive the quote request, run your underwriting, and respond with 201 + data: [...] for one or more quotes, or 204 to decline. QuoteId minting Mint a unique QuoteId per quote — UUIDv4 is recommended. Persist it for at least the policy retention period of the sector. The QuoteId threads the rest of the lifecycle: TPP retrievals, the accept PATCH, policy creation, and every status event you emit to the quote-log. For LFI-Led mode, respond 204 No Content . You are signalling: the TPP has done its part; the LFI will drive everything from here. Then immediately PATCH the quote-log with ApplicationPending so the TPP (subscribed or polling) sees the application has been registered. The Subscription.Webhook object on the PATCH body is consumed by the Hub for its own event delivery to the TPP. Your LFI MUST NOT act on it — just emit quote-log status updates as normal, and the Hub fans them out. After PATCH Accept, your LFI presents the customer with the quote summary, KYC capture, and payment screens. These are entirely under your control — the Hub is not in the loop. See the User Journeys page for the screens you typically host. The TPP’s view of progress comes from the quote-log events you emit at each transition. You can emit additional intermediate events with BrokerInstructions[].Reason explaining customer-facing status the TPP should surface (e.g. "Document upload required", "Awaiting payment confirmation"). Once your hosted flow completes (KYC passed, payment confirmed), the TPP calls POST to create the policy. In LFI-Led mode the body is minimal — just the originating QuoteId : Run your standard policy issuance. Return 201 Created . The InsurancePolicyId is delivered to the TPP via the PolicyIssued event, not in this response body — this keeps the API symmetric with TPP-Led mode. Emit a Pending Completion event carrying the issued policy reference. In LFI-Led mode the documents stay with your LFI (you have already delivered them to the customer via your hosted screens), so only the InsurancePolicyId is needed. After any post-issuance work has settled (commission booked, customer onboarding emails sent), emit a final Completed Status event with the finalised premium breakdown and policy term. This is the terminal event — the Hub will reject any subsequent PATCH for this logId .'
  },
  {
    "title": "Insurance Quotation — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/requirements",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Insurance Quotation — TPP-Led Flow",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/tpp-led",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Insurance · Quotation · TPP-Led TPP-Led Flow 7 min read The TPP collects KYC in its own UI and surfaces an LFI-hosted payment URL to the customer. Your LFI is responsible…",
    "headings": [
      "TPP-Led Flow 7 min read"
    ],
    "body": "LFI · Insurance · Quotation · TPP-Led TPP-Led Flow 7 min read The TPP collects KYC in its own UI and surfaces an LFI-hosted payment URL to the customer. Your LFI is responsible for underwriting, premium pricing, payment hosting, and policy document generation — but customer interaction outside the payment page lives entirely with the TPP. Create Quote behaves identically to LFI-Led mode — mint a QuoteId , run underwriting, return 201 with the quote details (or 204 to decline). The mode forks on PATCH Accept, not on Create. Respond 200 with data.PolicyIssuanceAllowed declaring which steps the TPP may perform. All three booleans are required. Immediately after responding, PATCH the quote-log with QuoteStatus: ApplicationPending so the TPP knows the application has been registered. The TPP will then collect KYC in its own UI. The TPP submits the collected KYC by PATCHing the same quote endpoint again. The body conforms to the sector\\'s accept-quote request schema ( AEInsurance.AE{Type}InsuranceQuoteAcceptQuoteRequestProperties ). Validate it as you would a direct application: Emirates ID checks, sanctions screening, any sector-specific underwriting confirmations. If KYC fails, respond 400 with a descriptive errorMessage ; the TPP will surface the error to the customer and let them retry. If KYC passes, respond 200 (no body) and proceed to issue the payment URL. Generate a single-use payment URL on your LFI-hosted payment surface and emit a Pending Completion event: The TPP will redirect the customer to this URL. Customer payment is collected on your LFI’s page — the TPP never sees the card details. After payment success, your LFI redirects the customer back to the URL the TPP supplied (typically as part of its webhook subscription or out-of-band registration). Invalidate the URL after first redemption or after a session window of 15–30 minutes. The TPP MUST NOT cache or replay it. If the customer abandons and returns later, you can emit a fresh PaymentRequired event with a new URL. Once payment is confirmed, the TPP calls POST to create the policy. The body carries the originating QuoteId plus any additional data your LFI requires (most KYC was already submitted via the second PATCH). Issue the policy and respond 201 . If the TPP retries with the same QuoteId , return the same policy reference — policy creation MUST be idempotent. In TPP-Led mode the TPP is the document delivery channel — your LFI MUST NOT email or post documents to the customer directly. Attach every customer-facing document (Policy Booklet, Terms & Conditions, IPID, etc.) as base64-encoded Documents entries with SHA-256 hashes for integrity verification. Documents MUST be PDFs ( application/pdf ) or images ( image/jpeg , image/png ). The TPP verifies each Hash against the decoded Content before surfacing to the customer. Same as LFI-Led: emit a final Completed Status event with the finalised premium breakdown, policy term, and (where applicable) the Commission due to the TPP. The Hub rejects any subsequent PATCH for this logId . Commission.PaymentMethod controls how the LFI pays the TPP: DirectToTPP for direct bilateral settlement, or ThroughAPIHub for Hub-routed payment."
  },
  {
    "title": "Insurance Quotation — User Journeys",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/user-journeys",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Insurance · Quotation · LFI hosted screens User Journeys 3 min read Insurance Quotation does not have a Hub-mediated consent journey — the TPP authenticates with the Client…",
    "headings": [
      "User Journeys 3 min read",
      "Screens your LFI hosts",
      "Status emission",
      "Payment page requirements",
      "Document delivery"
    ],
    "body": "Insurance · Quotation · LFI hosted screens User Journeys 3 min read Insurance Quotation does not have a Hub-mediated consent journey — the TPP authenticates with the Client Credentials Grant and the customer interacts either with the TPP\\'s own UI or with screens your LFI hosts. This page describes what your LFI hosts and when. In LFI-Led mode, the TPP creates the quote and (on acceptance) hands the customer to your LFI to complete the application. Your LFI is responsible for the customer-facing screens from acceptance through to policy issuance. The TPP\\'s only customer touchpoint after acceptance is the document delivery you push back via the quote-log. Screens your LFI hosts Quote summary — confirms the quote details (sums insured, premium, coverage period, exclusions) before the customer commits. Customer verification (KYC) — Emirates ID capture, address confirmation, and any additional declarations required for underwriting. Payment — premium collection through your LFI\\'s payment provider (card, wallet, or direct debit, as supported). Confirmation — on successful issuance, an in-LFI confirmation screen that hands the customer back to the originating TPP (typically via a return URL the TPP supplied on quote creation). Status emission At each transition (KYC submitted, payment confirmed, policy issued), emit the matching quote-log status via PATCH /insurance-quote-log/{logId} so the TPP — and any subscribed webhook — sees the lifecycle progress. The TPP uses these events to update its own customer-facing UI in parallel. In TPP-Led mode, the TPP collects KYC in its own UI and submits it to your LFI via PATCH on the quote. Your LFI\\'s only hosted screen is the payment page — delivered to the TPP as a BrokerInstructions.Url on the ApplicationApproved event, then surfaced to the customer by the TPP as a redirect. Payment page requirements Branded as LFI — the customer must clearly see they are paying the insurer, not the TPP. Single-use URL — the URL MUST be invalidated after first redemption or after a reasonable session window (15–30 minutes). The TPP MUST NOT cache or replay it. Return handling — on payment success or cancellation, return the customer to a destination the TPP specified when subscribing to events. The customer\\'s status thereafter is observable to the TPP via subsequent quote-log events ( PolicyIssued , CustomerCancelled , etc.). No KYC capture — KYC has already been collected by the TPP and accepted by the LFI before the payment URL is issued. The payment page MUST NOT re-prompt for it. Document delivery Once the policy is issued, your LFI MUST NOT email or post documents to the customer directly in TPP-Led mode — the TPP becomes the document delivery channel. Attach all policy documents (Policy Booklet, Terms & Conditions, IPID, etc.) as base64-encoded Documents entries on the PolicyIssued quote-log event, with SHA-256 hashes for integrity verification. The TPP surfaces them to the customer in its own UI. Screen / responsibility LFI-Led TPP-Led Quote summary & acceptance LFI TPP Customer verification (KYC) LFI TPP Premium payment LFI LFI (via redirect from TPP) Policy document delivery LFI (direct to customer) TPP (via Documents on PolicyIssued event) Post-issuance customer support LFI LFI (per standard insurance regulatory obligations)"
  },
  {
    "title": "JWT Auth — Client-side",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Configuring Auth JWT Auth — Client-side (LFI Sending a Token) 2 min read This page describes how your authorisation server constructs and sends JWT…",
    "headings": [
      "JWT Auth — Client-side (LFI Sending a Token) 2 min read",
      "Header",
      "Body"
    ],
    "body": "LFI · API Hub · Onboarding · Configuring Auth JWT Auth — Client-side (LFI Sending a Token) 2 min read This page describes how your authorisation server constructs and sends JWT Auth tokens when calling the API Hub's Consent Manager and Headless Heimdall Auth Server endpoints. See Application Layer Authentication for an overview of all available methods and when to select JWT Auth. Sending JWT Auth from the LFI to the API Hub is optional even when JWT Auth is selected. It is configured separately from the API Hub → LFI direction — indicate your preference on the onboarding Service Desk ticket. When your authorisation server calls API Hub endpoints (Consent Manager or Headless Heimdall Auth Server), you MUST construct a JWT Auth token and include it as a Bearer token in the Authorization HTTP header. The request MUST also be made over mutual TLS — see Configuring Outbound mTLS . Create an Application in your Trust Framework Organisation labelled C3-hh-cm-client . Create both the C3 transport client certificate and Sig4 signing certificate in this Application using the code snippets provided in the Trust Framework. The Trust Framework will create a unique kid and host the JWKS. When publishing a new key, wait 10 minutes before issuing a message signed with that key. This allows the receiver's JWKS cache to refresh. Ensure the machine generating the signature uses NTP to synchronise its clock. Construct the JWT header and payload as specified in the Claims Reference below. Sign the JWT using the PS256 algorithm with a private signing key from the C3-hh-cm-client application. Include the JWT as a Bearer token in the Authorization HTTP header. The HTTPS request MUST be made over mutual TLS. The C3 client certificate MUST be used to initiate the mTLS session, and MUST have a DN and OU that match the values placed in the JWT signature claims. Header Claim Expected Value Mandatory Notes alg PS256 Yes typ JOSE Yes cty json Yes kid The key ID of the keypair used to sign the message, as published on the JWKS. Yes Other means of identifying the key (e.g. x5c , x5u ) are not supported. Body Claim Expected Value Mandatory Notes iss The organisation O value from the TLS certificate Subject used in the transport layer. Yes For a certificate with Subject CN=ABC, OU=XYZ, O=Acme Bank, C=AE , this would be Acme Bank . sub The organisation unit OU value from the TLS certificate Subject used in the transport layer. Yes For the same certificate, this would be XYZ . aud Identifier for the party receiving the JWT. Yes This MUST be set to the PROVIDER_ID specified during configuration. exp Time when the JWT will expire, in UTC seconds since epoch. Yes Recommended expiry: 10–30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value. iat Time when the JWT was issued, in UTC seconds since epoch. Yes When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value. nbf Time before which the JWT is invalid, in UTC seconds since epoch. No When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified). jti A unique identifier for the JWT. Yes Recommended: populate with a UUIDv4 to increase entropy."
  },
  {
    "title": "JWT Auth — Server-side",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Configuring Auth JWT Auth — Server-side (LFI Receiving a Token) 2 min read This page describes how your Ozone Connect server validates JWT Auth tokens…",
    "headings": [
      "JWT Auth — Server-side (LFI Receiving a Token) 2 min read",
      "Template",
      "Example",
      "Header",
      "Body"
    ],
    "body": "LFI · API Hub · Onboarding · Configuring Auth JWT Auth — Server-side (LFI Receiving a Token) 2 min read This page describes how your Ozone Connect server validates JWT Auth tokens sent by the API Hub. See Application Layer Authentication for an overview of all available methods and when to select JWT Auth. When the API Hub sends requests to your Ozone Connect endpoints, it includes a JWT Auth token in the Authorization header. Your server MUST validate this token on every request. Ensure the machine verifying the signature uses NTP to synchronise its clock. Verify that the request was received over a mutual TLS connection. Extract the JWT Auth token from the Authorization HTTP header. Verify the signature on the JWT using the kid specified in the JWS header. Derive the JWKS URI from the requestor's client certificate subject. The OU and CN values are substituted as follows: Template Example For a requestor client certificate subject CN=ABC, OU=XYZ, O=Organisation Name, C=AE : The JWKS MAY be cached for up to 10 minutes . Verify each claim in the JWT against the expected values specified in the Claims Reference below. Header Claim Expected Value Mandatory Notes alg PS256 Yes typ JOSE Yes cty json Yes kid The key ID of the keypair used to sign the message, as published on the JWKS. Yes Other means of identifying the key (e.g. x5c , x5u ) are not supported. Body Claim Expected Value Mandatory Notes iss The organisation O value from the TLS certificate Subject used in the transport layer. Yes For a certificate with Subject CN=ABC, OU=XYZ, O=Acme Bank, C=AE , this would be Acme Bank . sub The organisation unit OU value from the TLS certificate Subject used in the transport layer. Yes For the same certificate, this would be XYZ . aud Identifier for the party receiving the JWT. Yes This MUST be set to the PROVIDER_ID specified during configuration. exp Time when the JWT will expire, in UTC seconds since epoch. Yes Recommended expiry: 10–30 seconds. When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is greater than this value. iat Time when the JWT was issued, in UTC seconds since epoch. Yes When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value. nbf Time before which the JWT is invalid, in UTC seconds since epoch. No When validating, allow for a 10-second clock skew. The JWT is invalid if the current time is less than this value (when specified). jti A unique identifier for the JWT. Yes Recommended: populate with a UUIDv4 to increase entropy."
  },
  {
    "title": "LFI Functional Certification",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Production — LFI Functional Certification",
    "headings": [],
    "body": ""
  },
  {
    "title": "LFI Integration Guide",
    "path": "/tech/lfi-api-hub/",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Integrate · Certify · Operate LFI — Integration Guide The implementation guide for Licensed Financial Institutions (LFIs) connecting to UAE Open Finance. It covers the APIs your…",
    "headings": [
      "LFI — Integration Guide",
      "Where the LFI sits",
      "LFI Integration Journey",
      "Recommended Bank Rollout Plan",
      "Sections"
    ],
    "body": "Integrate · Certify · Operate LFI — Integration Guide The implementation guide for Licensed Financial Institutions (LFIs) connecting to UAE Open Finance. It covers the APIs your bank exposes, the API Hub services your bank consumes, the Trust Framework registrations required to participate, and the onboarding and certification path from sandbox through to live production traffic. TPP? See the TPP Standards → Architecture Where the LFI sits UAE Open Finance is strictly mediated : TPPs never call LFIs directly. All TPP traffic is routed through the API Hub (operated by Nebras, with vendor support from Ozone API), which acts as the OIDC/FAPI authorization server, the consent source of truth, and the gateway that proxies every request to the relevant LFI. The LFI's role is the execution layer . 0 Consent state, token issuance, schema enforcement, and TPP-facing routing all live in the Hub. The LFI does not maintain independent consent state and does not issue tokens. Start here LFI Integration Journey If this is your first time on this guide, follow the Integration Journey end-to-end. It sequences the work into three phases — Pre-production build & integrate , Certification , and Production launch — and links out to every section below at the right point in the journey. 1 Pre-production build & integrate → 2 Certification → 3 Production launch Open the Integration Journey → Companion plan Recommended Bank Rollout Plan How to stage delivery capability-by-capability against the regulatory deadline. → Guide sections Sections Each section covers one area of the integration. Work through them in the order suggested by the Integration Journey, or jump in where you need. Open section → → Open Finance overview →"
  },
  {
    "title": "Logs",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/logs",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Admin Portal · Logs Logs 3 min read The Admin Portal provides two types of logs: Audit Logs that track all portal activity, and API Logs that trace every request…",
    "headings": [
      "Logs 3 min read",
      "Searching by interaction ID",
      "What the logs show"
    ],
    "body": "LFI · API Hub · Admin Portal · Logs Logs 3 min read The Admin Portal provides two types of logs: Audit Logs that track all portal activity, and API Logs that trace every request processed by the API Hub. The audit log records every action taken by every user within the Admin Portal. This includes reading consent data, viewing TPP details, activating or blocking TPPs, and any other portal interaction. Each audit log entry includes: User — the portal user who performed the action Action — the operation performed (e.g. read, update, activate, block) Target — the resource affected (e.g. TPP, client, consent) Timestamp — when the action occurred Audit logs are particularly important for tracking administrative changes. If a TPP is blocked or a configuration is changed, the audit log provides a complete record of who made the change and when. API logs provide a complete, granular trace of every request that flows through the API Hub. This is the primary debugging tool for investigating API issues. Searching by interaction ID Every API request carries an x-fapi-interaction-id header. To trace a request, enter this interaction ID in the API logs search field. The portal will return every log entry associated with that request — typically hundreds of entries covering every stage of processing. What the logs show For a single interaction ID, the API logs show the complete lifecycle of the request through the API Hub: Inbound request — the TPP's request arriving at the API Hub, including headers, certificate details, and the original URL Validation and enrichment — each step of token validation, consent checking, schema enforcement, and request enrichment Outbound request to LFI — the request forwarded to the LFI's Ozone Connect endpoint LFI response — the response received from the LFI Response processing — normalization, error mapping, and response construction Outbound response to TPP — the final response returned to the TPP Each log entry contains detailed metadata. From the request headers alone you can identify: Header / Field Information Host Which API Hub endpoint received the request (resource server, authorization server, etc.) X-Original-URL The API path called, including the API version and resource (e.g. /account-information/v1.2/accounts/{AccountId}/beneficiaries ) X-Cert-DN The certificate distinguished name, identifying which TPP made the request The log entries follow the same pattern for every request . After reviewing a few traces, you will quickly learn which entries correspond to which stage of processing. Common debugging scenarios: Unexpected error response — search by interaction ID, locate the LFI response entry, and inspect the status code and body returned by your Ozone Connect endpoint Schema validation failure — the log will show the validation step that rejected the request or response, with the specific schema error Consent or token issue — the validation entries will indicate whether consent or token checks failed, and why When a TPP reports an issue, ask them for the x-fapi-interaction-id from the request. With this ID, you can trace the entire request lifecycle in the API logs and identify exactly where the issue occurred — whether in the API Hub's processing or in your LFI response. API logs cover everything that happens within the API Hub . Once the request is forwarded to your Ozone Connect endpoint, any processing within your own systems is logged in your own infrastructure. The API logs show the request sent to you and the response received back."
  },
  {
    "title": "Multi-Authorization",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/multi-authorization",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Multi-Authorization Multi-Authorization 2 min read The Open Finance standards support payment journeys that require more than one authorizer.…",
    "headings": [
      "Multi-Authorization 2 min read",
      "Step 1 — Setting IsSingleAuthorization and AuthorizationExpirationDateTime in the PAR Request",
      "Step 2 — Account selection based on authorization type",
      "Step 3 — Managing the authorization flow",
      "Step 4 — Updating consent status after each authorization",
      "Step 5 — Initiating the payment"
    ],
    "body": "LFI · Banking · Service Initiation · Multi-Authorization Multi-Authorization 2 min read The Open Finance standards support payment journeys that require more than one authorizer. This guide explains how TPPs and LFIs must coordinate multi-authorization for payment consents and how the consent lifecycle is reflected in API calls and responses. Before initiating a multi-authorization payment, ensure the following are in place: Registered Application — The application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . An active payment consent — A payment consent must have been created through the relevant Service Initiation API Guide . Multi-authorization applies after the first authorizer has completed their step. Understanding of the Consent Journey — You should understand consent status transitions, including AwaitingAuthorization , Authorized , and Rejected . Step 1 — Setting IsSingleAuthorization and AuthorizationExpirationDateTime in the PAR Request When submitting the Pushed Authorization Request (PAR), the TPP MUST set IsSingleAuthorization inside authorization_details[].consent : true — only a single authorizer is supported for the payment. false — multiple authorizers are supported (multi-authorization enabled). When IsSingleAuthorization is false , the TPP SHOULD also set AuthorizationExpirationDateTime inside authorization_details[].consent . This field represents the deadline by which all remaining authorizers must have acted — that is, the consent MUST reach Status=Authorized before this time, otherwise the consent transitions to rejected/expired. AuthorizationExpirationDateTime MUST NOT be after ExpirationDateTime . When IsSingleAuthorization is true , TPPs SHOULD NOT include AuthorizationExpirationDateTime . These fields are carried in the Rich Authorization Request ( authorization_details[].consent.IsSingleAuthorization , authorization_details[].consent.AuthorizationExpirationDateTime ). See the Authorization Endpoints OpenAPI for the full schema reference. Step 2 — Account selection based on authorization type Before showing eligible accounts during the consent journey, the LFI checks IsSingleAuthorization from the PAR request: If true : allow selection only from accounts that require a single authorizer. If none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an appropriate error. If false : allow selection from accounts that require either single or multiple authorizers. Step 3 — Managing the authorization flow After the first user authorizes, the LFI must: Inform OFH of required authorizers by PATCHing the consent to include Meta.MultipleAuthorizers . Keep consent status as AwaitingAuthorization — do not set Status=Authorized yet. Redirect back to the TPP via /doConfirm once the PATCH is accepted. Example PATCH consents/{consentId} body after first authorizer (still awaiting others): The TPP receives the redirect/callback, exchanges the authorization code at /token , and receives an access token plus the consent object still marked AwaitingAuthorization , including the Meta.MultipleAuthorizers structure above. Step 4 — Updating consent status after each authorization The LFI must PATCH the consent after each additional authorization to reflect progress: If any required authorizer rejects → set Status=Rejected . When all required authorizers approve → set Status=Authorized . Example: one authorizer approved, another still pending Example: final approval — consent becomes Authorized Example: a required authorizer rejects — consent becomes Rejected Step 5 — Initiating the payment The TPP MAY initiate the payment only after Status=Authorized . Additional authorizers must act before AuthorizationExpirationDateTime if set, otherwise before ExpirationDateTime . TPPs can monitor progress by: Subscribing to event notifications; or Polling GET /payment-consents/{ConsentId} . Once the consent is Authorized , the TPP can exchange the refresh "
  },
  {
    "title": "Obtain an Access Token",
    "path": "/tech/lfi-api-hub/trust-framework/api/token",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework — Obtain an Access Token",
    "headings": [],
    "body": ""
  },
  {
    "title": "Opening the Return Redirect",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/opening-the-redirect",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "LFI · Consent Journey · Redirect Opening the Return Redirect 4 min read Once the customer has authenticated and made their decision, you complete the interaction by calling…",
    "headings": [
      "Opening the Return Redirect 4 min read"
    ],
    "body": "LFI · Consent Journey · Redirect Opening the Return Redirect 4 min read Once the customer has authenticated and made their decision, you complete the interaction by calling doConfirm or doFail on the Headless Heimdall Auth Server. The response returns the URL to send the customer back to the TPP . How your app opens that URL is security-critical — get it wrong and you break app-to-app redirection or expose the customer to credential theft. After you post the customer's decision, Headless Heimdall responds with an HTTP 303 whose Location header carries the redirect URI — the URL that returns the authorization result (or error) to the TPP. Your app is responsible for opening it: This URL is the TPP's registered redirect_uri . On mobile it may be a verified deep link into the TPP's app, so opening it correctly can hand the customer straight back into the app they started in. See the endpoint references for doConfirm and doFail , and the Consent Journey API Guide for the full flow. This page covers the outbound redirect — sending the customer from your app back to the TPP. For the inbound direction — how the customer's arrival at your Authorization Endpoint opens your own app — see Authorization Endpoint . If the customer authenticated in a web browser — your desktop or mobile web channel — instead of your native app, opening the return redirect is simpler. Just follow the doConfirm / doFail 303 as a normal full-page browser redirect back to the TPP's redirect_uri . Follow the Location header at the top level of the browser — a standard 303 redirect. Do not wrap the return in an <iframe> or embedded frame. Desktop cross-device journeys — where the customer started on a desktop browser and authenticated on their phone — complete on your Authorization Endpoint page, which polls for completion and then performs this redirect. See Authorization Endpoint — Desktop browser behaviour . UK Open Banking's redirection model is domain-to-domain and full-page in both directions — the outbound screen returns the customer from the LFI domain to the TPP domain — and never embeds one party's pages inside the other. Desktop customers who authenticate on a second device are handled by decoupled / QR-code hand-off on your Authorization Endpoint."
  },
  {
    "title": "Organisation Details Form",
    "path": "/tech/lfi-api-hub/trust-framework/onboarding-form-organisation",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "← Onboarding LFI · Trust Framework · Onboarding Organisation Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email .",
    "headings": [
      "Organisation Details Form 2 min read"
    ],
    "body": "← Onboarding LFI · Trust Framework · Onboarding Organisation Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email ."
  },
  {
    "title": "Ozone Connect Base URL",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Environment-Specific Ozone Connect Base URL 2 min read The Ozone Connect Base URL is the root URL of your Ozone Connect API endpoints — the server…",
    "headings": [
      "Ozone Connect Base URL 2 min read"
    ],
    "body": "LFI · API Hub · Onboarding · Environment-Specific Ozone Connect Base URL 2 min read The Ozone Connect Base URL is the root URL of your Ozone Connect API endpoints — the server that the API Hub calls when proxying TPP requests to your institution. When a TPP makes a valid API request to the API Hub, the API Hub validates the token and consent, enforces the OpenAPI schema, enriches the request, and then forwards it to your Ozone Connect Base URL. You MUST provide a base URL for each environment: Environment Example Pre-production https://openapi-uat.example.com Production https://openapi.example.com The API Hub appends the API path to your base URL. For example, if your base URL is https://openapi.example.com , a TPP request for account data will be forwarded to: The Ozone Connect Base URL MUST: Use HTTPS Be reachable from the API Hub's egress IP addresses (provided during onboarding — see Environment Specific Configuration ) Not include a trailing slash Not include path segments beyond the root (e.g. /v2.1 is not required — the API Hub manages versioned routing) You MUST allowlist the API Hub's outbound IP address(es) at your network or firewall level. These IPs are provided by Ozone as part of the environment-specific onboarding . Your pre-production and production Ozone Connect Base URLs will typically point to different infrastructure (e.g. a UAT environment and a live environment). Each is configured independently via the environment-specific Service Desk ticket."
  },
  {
    "title": "Patch Insurance Quote Log",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Patch Insurance Quote Log",
    "headings": [],
    "body": ""
  },
  {
    "title": "Payment Refunds — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Refunds Payment Refunds — API Guide 2 min read The Payment Refunds endpoint lets the API Hub retrieve the debtor's payment account details…",
    "headings": [
      "Payment Refunds — API Guide 2 min read",
      "Request headers",
      "Path parameters",
      "Response"
    ],
    "body": "LFI · Banking · Service Initiation · Refunds Payment Refunds — API Guide 2 min read The Payment Refunds endpoint lets the API Hub retrieve the debtor's payment account details from your LFI after a payment has been made. The TPP uses those details to initiate a refund back to the original payer. This endpoint does not execute the refund itself — it only returns the account details needed to initiate one. GET /payment-consents/{consentId}/refund Request headers Header Required Description o3-provider-id Yes Identifier for your LFI registered in the Hub o3-aspsp-id Yes (deprecated) Deprecated alias for o3-provider-id . Will be removed in a future version — use o3-provider-id o3-caller-org-id Yes Organisation ID of the TPP making the underlying request o3-caller-client-id Yes OIDC client ID of the TPP application o3-caller-software-statement-id Yes Software statement ID of the TPP application o3-api-uri Yes The parameterised URL of the API being called by the TPP o3-api-operation Yes The HTTP method of the operation carried out by the TPP (e.g. GET ) o3-ozone-interaction-id Yes Hub-generated interaction ID. Equals o3-caller-interaction-id if the TPP provided one o3-caller-interaction-id No Interaction ID passed in by the TPP, if present o3-psu-identifier Yes Base64-encoded representation of the customer identifier JSON object Path parameters Parameter Required Description consentId Yes The consent ID of the original payment consent Response Content-Type: application/json Return 200 with the debtor's refund account details. The Hub wraps the response in a signed JWS before returning it to the TPP — your LFI returns plain JSON. 200 — Refund account found Return the debtor's account details under data.refundAccount . The refundAccount object is required and must contain the debtor's IBAN and name. data.refundAccount Field Type Required Description schemeName string Yes Account identifier scheme — always IBAN identification string Yes The debtor's IBAN name object Yes The account holder name name.en string Yes Account holder name in English (max 70 characters) name.ar string No Account holder name in Arabic (max 70 characters) Error responses All error bodies must include errorCode and errorMessage . 403 — Forbidden errorCode errorMessage When to use Consent.AccountTemporarilyBlocked The debtor account is blocked from receiving payments. The account is blocked from receiving payments for a temporary reason — e.g. account status is Suspended , or the account is otherwise unable to receive a credit transaction refund on a transient basis Consent.PermanentAccountAccessFailure The debtor account is blocked from receiving payments. The account is blocked from receiving payments permanently — e.g. account status is Closed , Deceased , or Unclaimed See the GET /payment-consents/{consentId}/refund API Reference for the full request and response schema."
  },
  {
    "title": "Payment Refunds — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Payment Status",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Domestic Payments Payment Status 7 min read Every domestic payment initiated through the API Hub is executed in one of three modes: intra-bank…",
    "headings": [
      "Payment Status 7 min read",
      "Illustrative AANI Reject Reason Codes",
      "What your LFI MUST PATCH",
      "What your LFI MAY PATCH",
      "How to PATCH",
      "Example PATCH body",
      "Example rejected PATCH body"
    ],
    "body": "LFI · Banking · Service Initiation · Domestic Payments Payment Status 7 min read Every domestic payment initiated through the API Hub is executed in one of three modes: intra-bank (both debtor and creditor accounts are held at your LFI, so no rail is used), or one of the two domestic payment rails — AANI (the UAE's instant payment rail) and UAEFTS (the UAE Funds Transfer System). Your LFI is the only party that sees the raw execution outcome, so your LFI MUST map that outcome to an Open Finance payment status and propagate it to the Hub via the Consent Manager Payment Log. This page covers both concerns: how your LFI selects an execution mode, and how outcomes from each mode map to Open Finance statuses. For the consent lifecycle, see the Consent Manager section. The Open Finance payment status enum is defined in the Ozone Connect Bank Service Initiation OpenAPI and aligns with ISO 20022 ExternalPaymentTransactionStatus1Code . Six values are in scope: Open Finance status ISO 20022 Meaning Pending PDNG Payment accepted for processing; further checks or rail submission outstanding AcceptedSettlementCompleted ACSC Settlement of the debtor account has been completed — a payment-processing state AcceptedWithoutPosting ACWP The receiving bank has accepted the payment but your LFI cannot confirm the creditor account has been credited — a settlement state AcceptedCreditSettlementCompleted ACCC The creditor account has been credited with the funds of the payment Rejected RJCT The payment was rejected, either pre-rail by your LFI or post-rail by AANI / UAEFTS Pending is the initial status your Ozone Connect POST /payments response returns — your LFI does not PATCH a payment to Pending . PATCH is only used to transition away from Pending to a terminal status. The statuses your LFI PATCHes for a domestic payment are therefore AcceptedWithoutPosting , AcceptedCreditSettlementCompleted , and Rejected . AcceptedSettlementCompleted is available in the enum but is rarely written in isolation on AANI or UAEFTS, where debtor settlement and the receiving-side outcome resolve in a single rail response. The Open Finance enum also includes a sixth value, Received (ISO 20022 RCVD ), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions before processing individual payments. Bulk and batch payments are not yet documented in v2.1 — for the domestic single and multi-payments covered by this page, you can ignore Received . Once a payment reaches a terminal status ( AcceptedWithoutPosting , AcceptedCreditSettlementCompleted , or Rejected ), your LFI MUST NOT transition it to a different value. Your LFI is responsible for choosing the execution mode for every domestic payment. The API Hub does not select a rail on your behalf, and the TPP and customer are not involved in the decision. Apply the following logic on receipt of POST /payments : Intra-bank — if both the debtor and creditor accounts are held at your LFI, execute the payment internally. No rail is used, and your LFI has end-to-end visibility of both legs. AANI — otherwise, submit the payment to AANI as the primary rail whenever the receiving bank and receiving account are reachable on AANI. UAEFTS — if AANI is unavailable or the receiving bank cannot receive via AANI, fall back to UAEFTS. The fall-back is automatic and MUST NOT require TPP or customer intervention. Your LFI MUST only reject a payment pre-rail for reachability reasons once both rails have been ruled out — that is, when the receiving bank is reachable on neither AANI nor UAEFTS. Set RejectReasonCode.Code = LFI.<reasonCode> (for example, LFI.CreditorBankNotReachable ). When the debtor account and creditor account are both held at your LFI, there is no interbank rail involved — the payment is executed by an internal debit-and-credit within your core banking system. Your LFI has full visibility of both legs, so the payment can reach the most specific Open Finance terminal status: AcceptedCr"
  },
  {
    "title": "Payments (Service Initiation)",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · LFI capability Payments (Service Initiation) 2 min read The Payment Service Initiation capabilities allow customers to authorise payments at their LFI which a TPP then…",
    "headings": [
      "Payments (Service Initiation) 2 min read",
      "Bank Service Initiation Provider",
      "Who's initiating Payments",
      "Browse this section"
    ],
    "body": 'Banking · LFI capability Payments (Service Initiation) 2 min read The Payment Service Initiation capabilities allow customers to authorise payments at their LFI which a TPP then submits within the bounds of that authorisation. Payment types range from one-time instant payments through to long-running multi-payment consents with variable amounts, schedules, or delegated authentication. Access control Required role BSIP Bank Service Initiation Provider Access to the Payment Service Initiation APIs requires TPPs to hold the BSIP role. The API Hub validates the role on every request before proxying it to the LFI. If the consent also includes data-sharing permissions ( ReadAccountsBasic , ReadAccountsDetail , ReadBalances ), TPPs additionally require the BDSP role. Live ecosystem Who\'s initiating Payments TPPs currently submitting payments across UAE Open Finance. liveTpps.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&family=payment" :title="`See all ${totalTppCount} TPPs`" > … + more Live data is currently unavailable. No TPPs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?type=tpp&family=payment" > liveTpps.length"> See all TPPs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Payments (Service Initiation) API. →'
  },
  {
    "title": "Performance Testing",
    "path": "/tech/lfi-api-hub/production/testing-certification/performance",
    "category": "LFI Integration",
    "section": "Production",
    "description": "🕒 2 minute read Performance Testing ::: info Coming soon This page will detail the performance testing requirements and benchmarks LFIs must meet. :::",
    "headings": [
      "Performance Testing"
    ],
    "body": "🕒 2 minute read Performance Testing ::: info Coming soon This page will detail the performance testing requirements and benchmarks LFIs must meet. :::"
  },
  {
    "title": "Personal Identifiable Information (PII)",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · PII Personal Identifiable Information (PII) 2 min read Every payment instruction carries sensitive data about who is paying and who is…",
    "headings": [
      "Personal Identifiable Information (PII) 2 min read",
      "At consent validation ( POST /consent/action/validate )",
      "At payment time (Ozone Connect payment instruction)"
    ],
    "body": "LFI · Banking · Service Initiation · PII Personal Identifiable Information (PII) 2 min read Every payment instruction carries sensitive data about who is paying and who is receiving the funds — creditor account details, optional debtor account, and risk indicators. This data is collectively referred to as Personal Identifiable Information (PII) . PII arrives at the LFI as an encrypted JWE string in the PersonalIdentifiableInformation field. The API Hub passes the JWE through without inspection — it cannot read or validate the contents. This means: The LFI is solely responsible for decrypting and validating PII. The PII has not been schema-validated by the API Hub. The PII content has not been read or inspected by any intermediary. Unlike other fields in the consent or payment request — which the API Hub validates against the OpenAPI specification before forwarding — PII is opaque to the API Hub. The LFI MUST decrypt, parse, and validate the PII independently against the schema defined in the OpenAPI specification. A malformed or invalid PII payload MUST be rejected by the LFI. PII is present at two points in the payment lifecycle: Stage Source Field Consent authorisation Consent Manager → LFI consent.PersonalIdentifiableInformation Payment creation Ozone Connect → LFI payment.PersonalIdentifiableInformation The structure of the decrypted PII differs between the two stages — see PII (Consent — Consent Manager) and PII (Payments — Ozone Connect) for the full schemas. Payment consents are stored centrally at the API Hub. Because the API Hub acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that the API Hub, and any other party in transit, cannot read the sensitive payment details. The encryption uses the LFI's public encryption key ( Enc1 ). Only the LFI can decrypt the payload using the corresponding Enc1 private key. Because the API Hub cannot inspect PII, the LFI takes on additional responsibilities compared to other parts of the request: Responsibility Description Decryption Decrypt the JWE using the Enc1 private key — see How to Decrypt PII Schema validation Validate the decrypted payload against the OpenAPI schema — no additional properties are permitted Field validation Verify mandatory fields, IBAN format, BIC consistency, and creditor matching rules — see Debtor Account and Creditor Rejection Mark the consent invalid via POST /consent/action/validate if PII is malformed, missing required fields, or fails validation The decrypted PII contains two top-level sections: Property Description Initiation Creditor and debtor account details — structure differs between consent and payment stages Risk Fraud and risk indicators about the debtor, transaction, and creditor At consent validation ( POST /consent/action/validate ) Initiation.Creditor is an array of 1–10 creditor entries (or omitted for open beneficiary) Initiation.DebtorAccount is optionally present At payment time (Ozone Connect payment instruction) Creditor fields sit directly on Initiation as a single creditor (not an array) DebtorAccount is absent — the debtor account was fixed during consent authorisation"
  },
  {
    "title": "PII Schema — Consent (Consent Manager)",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Service Initiation · PII · Schema PII Schema — Consent (Consent Manager) The schema below shows the full structure of the decrypted PersonalIdentifiableInformation payload…",
    "headings": [
      "PII Schema — Consent (Consent Manager)"
    ],
    "body": "LFI · Service Initiation · PII · Schema PII Schema — Consent (Consent Manager) The schema below shows the full structure of the decrypted PersonalIdentifiableInformation payload as received during consent authorisation via the Consent Manager. This is the PII the LFI MUST decrypt and validate before authorising a payment consent. At this stage, the PII includes the Initiation.Creditor array (1–10 entries, or omitted for open beneficiary) and optionally Initiation.DebtorAccount . See the Overview for decryption steps."
  },
  {
    "title": "PII Schema — Payments (Ozone Connect)",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Service Initiation · PII · Schema PII Schema — Payments (Ozone Connect) The schema below shows the full structure of the decrypted PersonalIdentifiableInformation payload as…",
    "headings": [
      "PII Schema — Payments (Ozone Connect)"
    ],
    "body": "LFI · Service Initiation · PII · Schema PII Schema — Payments (Ozone Connect) The schema below shows the full structure of the decrypted PersonalIdentifiableInformation payload as received with a payment instruction via Ozone Connect. This is the PII the LFI MUST decrypt and validate before processing a payment. At this stage, DebtorAccount is absent — the debtor account was fixed during consent authorisation. The creditor fields sit directly on Initiation as a single creditor (not inside an array). See the Overview for decryption steps."
  },
  {
    "title": "Prerequisites",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Onboarding · Prerequisites Prerequisites 4 min read Before your API Hub can be provisioned, you MUST complete the prerequisites questionnaire via a Service Desk…",
    "headings": [
      "Prerequisites 4 min read",
      "Choosing a value",
      "Multi-brand institutions",
      "Hosting Environment",
      "Digital Channels",
      "Consent Pre-Validation",
      "Consent Event Notification",
      "Consent Augmentation"
    ],
    "body": "LFI · API Hub · Onboarding · Prerequisites Prerequisites 4 min read Before your API Hub can be provisioned, you MUST complete the prerequisites questionnaire via a Service Desk ticket. This page describes the information you will need to provide and why it is required. Ensure your organisation is registered in the Trust Framework before starting the prerequisites process. See Trust Framework Onboarding for details. Field Description LFI Legal Name Your legal name as it appears on your Trust Framework organisation page. IBAN Bank Code The IBAN bank code for the brand associated with this onboarding. Not applicable for insurers. Primary Technical Contact (PTC) Email address of the main technical contact for integration queries. Primary Business Contact (PBC) Email address of the main business contact. Your LFI Code is the short identifier that represents your institution across the API Hub. It is used in two places: Hostnames. It forms part of the URL for both the TPP-facing and LFI-facing domain names — including your API Hub's well-known discovery document URI. See Environment Specific Configuration for the full list of auth1.{lfiCode}.* , rs1.{lfiCode}.* , hh.{lfiCode}.* , cm.{lfiCode}.* , and admin.{lfiCode}.* hostnames. The o3-provider-id request header. Every request the API Hub forwards to your Ozone Connect endpoints carries o3-provider-id set to your LFI Code, so Ozone Connect can identify which Hub the call originated from. This matters most for multi-segment LFIs . Choosing a value Pick a code that is: Short — typically 3–8 characters. It will appear in every TPP integration and every URL. Lowercase alphanumeric — no spaces, hyphens, underscores, or special characters (it must be DNS-safe). Recognisable as your brand — usually an abbreviation of your legal or trading name. Stable — once you go live, the LFI Code is effectively immutable. Changing it later means re-issuing every URL TPPs depend on, and is highly disruptive. Multi-brand institutions If your institution operates multiple brands (e.g. retail and business), each brand will have its own API Hub and its own LFI Code, and each brand is onboarded separately. The common convention is to take your single-brand short code and append the segment as a single lowercase token — for example, FAB uses fabretail for its retail Hub and fabbusiness for its business Hub. See Multi-Segment LFIs for the full deployment model. Hosting Environment Indicate where your Ozone Connect endpoints will be hosted: Azure AWS OCI (Oracle Cloud Infrastructure) GCP (Google Cloud Platform) On-premises Digital Channels Indicate which digital channels you currently support for end user authentication and consent journeys: Web Mobile Both Indicate whether you intend to adopt CAAP — the Nebras-operated Central Authentication and Authorization Platform — for the end user's authentication and consent authorisation experience. Yes — CAAP. When a TPP creates a consent, the end user is redirected to CAAP for authentication and consent approval, and CAAP delivers the Consent Management Interface. You do not provide an Authorization Endpoint URL, and you do not implement the LFI-side Consent Management Interface or build directly against Headless Heimdall. You MUST implement the CAAP Operations endpoints on Ozone Connect — see CAAP . No — LFI-operated. The end user is redirected to your Authorization Endpoint ; you implement the authentication and consent authorisation UX and the Consent Management Interface yourself. Adopting CAAP does not change the LFI's responsibility to deliver the Ozone Connect endpoints for Bank Data Sharing, Bank Service Initiation, Insurance Data Sharing, and the other Open Finance services exposed to TPPs. Indicate how many business brands you will be implementing. Each brand represents a separate API Hub instance — for example, a bank may have separate brands for retail and corporate, each requiring its own onboarding. Indicate which API families you plan to support. The a"
  },
  {
    "title": "Primary Organisation Admin Details Form",
    "path": "/tech/lfi-api-hub/trust-framework/onboarding-form-admin",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "← Onboarding LFI · Trust Framework · Onboarding Primary Organisation Admin Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email .",
    "headings": [
      "Primary Organisation Admin Details Form 2 min read"
    ],
    "body": "← Onboarding LFI · Trust Framework · Onboarding Primary Organisation Admin Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email ."
  },
  {
    "title": "Products & Leads",
    "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · LFI capability Products & Leads 2 min read The Products & Leads API allows LFIs to publish their banking product catalogue and to receive customer leads forwarded by…",
    "headings": [
      "Products & Leads 2 min read",
      "Bank Data Sharing Provider",
      "Who's consuming Products & Leads",
      "Browse this section",
      "Products & Leads — Requirements",
      "Products & Leads — API Guide"
    ],
    "body": 'Banking · LFI capability Products & Leads 2 min read The Products & Leads API allows LFIs to publish their banking product catalogue and to receive customer leads forwarded by TPPs. Customers browse products in the TPP application and either apply directly via a channel the LFI configures (redirect URI, phone, email, or written instructions), or request follow-up contact — in which case the API Hub forwards the lead and the LFI follows up within 30 days. Access control Required role BDSP Bank Data Sharing Provider Access to the Products & Leads API requires TPPs to hold the BDSP role. The API Hub validates the role on every request before proxying it to the LFI. Live ecosystem Who\'s consuming Products & Leads TPPs currently calling the Products & Leads API across UAE Open Finance. liveTpps.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?type=tpp&family=product" :title="`See all ${totalTppCount} TPPs`" > … + more Live data is currently unavailable. No TPPs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?type=tpp&family=product" > liveTpps.length"> See all TPPs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Products & Leads API. Requirements Products & Leads — Requirements Validation rules and behaviour your Ozone Connect Products & Leads endpoints must follow. Open → API Guide Products & Leads — API Guide Implementation notes, payload structure, and worked examples. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "Products & Leads — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Products & Leads Products & Leads — API Guide 2 min read This page will provide a practical guide to implementing the Products & Leads API.",
    "headings": [
      "Products & Leads — API Guide 2 min read"
    ],
    "body": "LFI · Banking · Products & Leads Products & Leads — API Guide 2 min read This page will provide a practical guide to implementing the Products & Leads API."
  },
  {
    "title": "Products & Leads — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "🕒 2 minute read Products & Leads — Requirements ::: info Coming soon This page will detail the requirements for implementing the Products & Leads API. :::",
    "headings": [
      "Products & Leads — Requirements"
    ],
    "body": "🕒 2 minute read Products & Leads — Requirements ::: info Coming soon This page will detail the requirements for implementing the Products & Leads API. :::"
  },
  {
    "title": "Query a User Challenge",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-challenge-query",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Query a User Challenge",
    "headings": [],
    "body": ""
  },
  {
    "title": "Quote Types — New, Renewal, Switch",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Insurance · Quotation · Shared explainer Quote Types 4 min read Every quote request carries a QuoteType of New , Renewal , or Switch . The three values determine what data the TPP…",
    "headings": [
      "Quote Types 4 min read",
      "What the TPP must supply",
      "What the LFI may assume",
      "What the TPP must supply",
      "What the LFI may assume",
      "What the TPP must supply",
      "What the LFI may assume"
    ],
    "body": `Insurance · Quotation · Shared explainer Quote Types 4 min read Every quote request carries a QuoteType of New , Renewal , or Switch . The three values determine what data the TPP MUST supply, what the LFI MAY assume about the customer, and how the resulting policy relates to any prior policy. This page is the single source of truth referenced from both the LFI Integration Guide and TPP Standards. The customer has no existing policy of this sector that the quote is intended to replace or continue. The TPP supplies the customer\\'s demographic and risk-relevant data inline; the LFI underwrites from scratch. What the TPP must supply A unique QuoteReference — TPP-generated, used by the TPP to thread the quote through its own systems. Distinct from QuoteId , which the LFI mints. Sector-specific risk data (vehicle for Motor, property address for Home, trip details for Travel, salary band for Health, etc.). Customer identifying data sufficient for the LFI to KYC and underwrite (Emirates ID, date of birth, etc.). What the LFI may assume No prior policy history with this LFI for this customer at this sector. The LFI MUST run its full new-business underwriting process — risk scoring, screening, pricing — from the supplied data alone. The customer holds an existing policy with this LFI at the same sector and wishes to renew it. The TPP references the prior policy so the LFI can carry forward underwriting context (no-claims discount, established risk profile, customer history) rather than re-underwriting from scratch. What the TPP must supply The InsurancePolicyId of the prior policy at this LFI, retrieved through Insurance Data Sharing under a customer consent. The TPP MUST have held a valid consent at the time of the policy retrieval — the LFI MAY refuse to renew where it cannot evidence prior data sharing. Any data the customer wishes to update at renewal (address change, vehicle change, beneficiary update, etc.). The same QuoteReference shape as for New . What the LFI may assume The customer is already known — KYC may be lighter-touch. The prior policy\\'s claims history, no-claims discount, and risk rating may be carried forward where appropriate. The LFI MAY decline to renew where its underwriting appetite has changed — 204 is the correct response, not a 201 with adverse pricing. Renewal always references a policy held at this LFI . If the customer is moving from a different insurer, the correct QuoteType is Switch . The customer holds an existing policy at a different LFI (the incumbent) and wishes to move. The TPP supplies enough information about the incumbent policy for the LFI to price competitively and, where applicable, coordinate the switch (handing back NCD, avoiding double-coverage). What the TPP must supply The incumbent policy\\'s details — insurer name, policy number, sums insured, premium, renewal date — retrieved through Insurance Data Sharing against the incumbent under a customer consent. The customer\\'s demographic and risk data, the same way as for New . Switching does not exempt the new LFI from underwriting. Any switch-specific instructions (effective date, overlap window). What the LFI may assume Claims history from the incumbent is declared , not authoritative — the LFI MUST run its own screening and, where required, request additional declarations. The incumbent policy is not yet cancelled. The LFI MAY make policy issuance contingent on the customer cancelling the incumbent within the policy effective date. If the LFI does not offer a particular combination of sector and quote type (e.g. switching is not supported for Travel, or the LFI does not renew expired policies older than 30 days), the Create Quote endpoint MUST return 204 with an empty body. Do not return 201 with no quotes — a 201 implies success and breaks the TPP\\'s ability to surface a "no quote available" outcome cleanly to the customer. The set of supported sector + quote type combinations SHOULD be published in the LFI\\'s Trust Framework metadata`
  },
  {
    "title": "Recommended Bank Rollout Plan",
    "path": "/tech/lfi-api-hub/getting-started/bank-rollout-plan",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Getting Started · Rollout Plan Recommended Bank Rollout Plan 6 min read This page proposes a sensible delivery sequence for an LFI working through Step 3 of the LFI…",
    "headings": [
      "Recommended Bank Rollout Plan 6 min read",
      "1. Consent Validate",
      "2. Consent Journey",
      "3. Retail Data Sharing — Current & Savings Accounts",
      "4. Retail Domestic — Single Instant Payment",
      "5. Refunds",
      "6. Confirmation of Payee",
      "7. Consent Management Interface",
      "Domestic Multi-Payments (all flavours)",
      "Products & Leads",
      "Extended Retail Data Sharing",
      "SME Data Sharing — Current & Savings Accounts"
    ],
    "body": "LFI · Getting Started · Rollout Plan Recommended Bank Rollout Plan 6 min read This page proposes a sensible delivery sequence for an LFI working through Step 3 of the LFI Integration Journey . It is intended as a starting path that breaks the work into manageable increments — once you have completed Phase 1 you will be well-placed to decide the order of subsequent capabilities based on your own priorities and constraints. This rollout plan is guidance. The Central Bank of the UAE sets the actual regulatory requirements and deadlines — those MUST always take precedence. It is the LFI's responsibility to assess how best to meet their obligations. This page recommends a delivery order; it does not define scope or timing. Each phase below is a self-contained delivery increment. A phase can be taken end-to-end through Step 3 → Step 9 (build, certify, go live) before the next phase is started, or phases can be run in parallel where resourcing allows. Phase 1 establishes the foundational integration with the API Hub and delivers the first customer-facing capability (Retail Data Sharing) followed by the simplest payment journey. The steps are ordered so each builds on the last — ordering within the phase is a recommendation, not a hard dependency graph, except where an API clearly depends on another being present (e.g. Refunds requires a completed payment). 1. Consent Validate Implement the POST /consent/action/validate endpoint on your Ozone Connect server. This endpoint is called by the API Hub before a consent is stored, and lets your LFI signal which consent types and permissions you support. Building this first means you can safely reject any consent type you haven't yet implemented, and then expand the accepted set as each subsequent capability comes online. See the Consent Events API Guide for implementation details. 2. Consent Journey Implement the authorization interaction between your LFI and the API Hub. These are the five endpoints your LFI calls against the Hub to drive a consent through customer authentication, authorization, and return to TPP: Endpoint Direction Purpose GET /auth LFI → API Hub Initiate the authorization interaction GET /consents/{consentId} LFI → API Hub Retrieve the full consent details PATCH /consents/{consentId} LFI → API Hub Update consent status, customer identifiers, and account IDs POST /auth/{interactionId}/doConfirm LFI → API Hub Complete the authorization interaction and redirect back to TPP successfully POST /auth/{interactionId}/doFail LFI → API Hub Complete the authorization interaction and redirect back to TPP with a failure See the Consent Journey API Guide for the end-to-end sequence, including customer authentication requirements ( SCA ) and identifier rules. 3. Retail Data Sharing — Current & Savings Accounts Implement Bank Data Sharing for retail Current Accounts and Savings Accounts. Data Sharing is recommended as the first productised capability because it exercises the full consent journey end-to-end without the additional complexity of payment execution or encrypted PII. Prioritise the following endpoints: Endpoint Purpose GET /accounts List the accounts covered by the consent GET /accounts/{AccountId} Retrieve details for a single account GET /accounts/{AccountId}/balances Retrieve balances for an account GET /accounts/{AccountId}/transactions Retrieve the transaction history for an account GET /customer Retrieve the customer details covered by the consent GET /accounts/{AccountId}/customer Retrieve customer details for a specific account See Data Sharing — Requirements and the Data Sharing API Guide . Once live, update the POST /consent/action/validate response to accept Bank Data Sharing consents. 4. Retail Domestic — Single Instant Payment Implement the Single Instant Payment journey for retail customers. This introduces payment execution and the handling of encrypted PII on payment consents. Key endpoints: Endpoint Purpose POST /payments Execute an authorised payment GET /pay"
  },
  {
    "title": "Recommended Insurance Rollout Plan",
    "path": "/tech/lfi-api-hub/getting-started/insurance-rollout-plan",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "LFI · Getting Started · Insurance Rollout Plan Recommended Insurance Rollout Plan 5 min read This page proposes a sensible delivery sequence for an LFI working through Step 3 of…",
    "headings": [
      "Recommended Insurance Rollout Plan 5 min read",
      "1. Consent Validate",
      "2. Consent Journey",
      "3. Pick a Primary Insurance Type",
      "4. Insurance Data Sharing — Primary Type",
      "5. Consent Management Interface"
    ],
    "body": "LFI · Getting Started · Insurance Rollout Plan Recommended Insurance Rollout Plan 5 min read This page proposes a sensible delivery sequence for an LFI working through Step 3 of the LFI Integration Journey when its Open Finance scope covers insurance. It is intended as a starting path that breaks the work into manageable increments — the LFI picks a single insurance type to deliver end-to-end first, then extends to the rest of its book once the first type is live. This rollout plan is guidance. The Central Bank of the UAE sets the actual regulatory requirements and deadlines — those MUST always take precedence. It is the LFI's responsibility to assess how best to meet their obligations. This page recommends a delivery order; it does not define scope or timing. Each phase below is a self-contained delivery increment. A phase can be taken end-to-end through Step 3 → Step 9 (build, certify, go live) before the next phase is started, or phases can be run in parallel where resourcing allows. The plan is shaped around one core idea: an LFI that underwrites more than one insurance type should pick a primary insurance type first — typically the type with the largest in-force book or the highest expected TPP demand — and deliver it through every phase before extending to the rest. This contains scope, lets the LFI prove the consent journey and Ozone Connect endpoints against a single product model, and avoids spreading certification and production launch effort across multiple insurance types in parallel. Phase 1 establishes the foundational integration with the API Hub and delivers Insurance Data Sharing for the LFI's chosen primary insurance type, end-to-end through certification and production launch. 1. Consent Validate Implement the POST /consent/action/validate endpoint on your Ozone Connect server. This endpoint is called by the API Hub before a consent is stored, and lets your LFI signal which consent types and permissions you support. Building this first means you can safely reject any consent type you haven't yet implemented, and then expand the accepted set as each subsequent capability comes online. See the Consent Events API Guide for implementation details. 2. Consent Journey Implement the authorization interaction between your LFI and the API Hub. These are the five endpoints your LFI calls against the Hub to drive a consent through customer authentication, authorization, and return to TPP: Endpoint Direction Purpose GET /auth LFI → API Hub Initiate the authorization interaction GET /consents/{consentId} LFI → API Hub Retrieve the full consent details PATCH /consents/{consentId} LFI → API Hub Update consent status, customer identifiers, and policy IDs POST /auth/{interactionId}/doConfirm LFI → API Hub Complete the authorization interaction and redirect back to TPP successfully POST /auth/{interactionId}/doFail LFI → API Hub Complete the authorization interaction and redirect back to TPP with a failure See the Consent Journey API Guide for the end-to-end sequence, including customer authentication requirements ( SCA ) and identifier rules. 3. Pick a Primary Insurance Type Before building any Insurance Data Sharing endpoints, select one insurance type from the seven sectors covered by the standard: Employment insurance Health insurance Home insurance Life insurance Motor insurance Renters insurance Travel insurance If your LFI underwrites more than one of these, pick the type you judge best to start with — typically the one with the largest in-force book, the highest expected TPP demand, or the cleanest mapping from your existing policy administration system into the standard's schema. The remaining types are picked up in Phase 3 once Phase 1 and Phase 2 are live for the primary type. 4. Insurance Data Sharing — Primary Type Implement Insurance Data Sharing for the primary insurance type chosen above. Each insurance type is exposed through one pair of Ozone Connect endpoints — substitute the sector slug for your chosen typ"
  },
  {
    "title": "Reports",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/reports",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Admin Portal · Reports Reports 2 min read The Admin Portal provides a set of operational reports covering API performance, error rates, call volumes, payment…",
    "headings": [
      "Reports 2 min read",
      "LFI performance",
      "Payment values",
      "Payment volumes"
    ],
    "body": "LFI · API Hub · Admin Portal · Reports Reports 2 min read The Admin Portal provides a set of operational reports covering API performance, error rates, call volumes, payment activity, and consent statistics. All reports can be filtered by date range, sorted by any column, and exported to CSV for further analysis. The performance report aggregates API request data and provides response time metrics across all endpoints. Each row includes: Column Description LFI Name Your organisation name (always your LFI for your portal) TPP Name The TPP that made the request — blank for requests that do not involve a TPP (e.g. LFI-to-Hub calls) Date The date of the aggregated data Endpoint The API endpoint called (e.g. accounts, balances, beneficiaries, payments) Response Code The HTTP response status code Max Response Time (ms) The slowest response time for the endpoint in the period Min Response Time (ms) The fastest response time for the endpoint in the period Average Response Time (ms) The mean response time across all calls to the endpoint in the period Number of Calls Total number of requests to the endpoint in the period Response times represent the end-to-end request duration as observed by the API Hub — from receiving the inbound request to returning the response. This includes the LFI's response time. LFI performance A separate LFI Performance report isolates your response times by removing API Hub processing latency. This report shows only the time between the API Hub forwarding the request to your Ozone Connect endpoint and receiving your response — giving you a clear view of your own system's performance. The error rates report provides a breakdown of failed requests by endpoint, TPP, and error code. Use this to identify: Endpoints with elevated error rates TPPs that are consistently sending malformed requests Trends in error volumes over time The call volumes report shows the total number of API requests over a given period, broken down by endpoint and TPP. This is useful for understanding traffic patterns and capacity usage. Payment values The payment values report shows the monetary value of payments processed through the API Hub, broken down by payment type, TPP, and time period. Payment volumes The payment volumes report shows the number of payment transactions processed, broken down by payment type, TPP, status, and time period. The consent statistics report provides an overview of consent activity — including consents created, authorised, expired, revoked, and consumed — broken down by consent type, TPP, and time period. All reports share common controls: Date range filter — adjust the reporting period using the date picker Column sorting — click any column header to sort ascending or descending Column filters — filter rows by specific values (e.g. a specific TPP, endpoint, or response code) Export — download the current report view as a CSV file for offline analysis in Excel or other tools"
  },
  {
    "title": "Retrieve a Employment Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve a Employment Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Health Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve a Health Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Home Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve a Home Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Life Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve a Life Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Motor Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve a Motor Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Renters Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve a Renters Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Travel Insurance Quote",
    "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve a Travel Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Account Details for a Refund",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Retrieve Account Details for a Refund",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Account Details for a Refund — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/field-mapping/payment-consents-ConsentId-refund",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Retrieve Account Details for a Refund — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Accounts (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/accounts",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Accounts (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all API Families",
    "path": "/tech/lfi-api-hub/trust-framework/api/api-families",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework — Retrieve all API Families",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all API Resources for an Authorisation Server",
    "path": "/tech/lfi-api-hub/trust-framework/api/api-resources",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework — Retrieve all API Resources for an Authorisation Server",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Authorisation Servers for an Organisation",
    "path": "/tech/lfi-api-hub/trust-framework/api/auth-servers",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework — Retrieve all Authorisation Servers for an Organisation",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Contacts for an Organisation",
    "path": "/tech/lfi-api-hub/trust-framework/api/contacts",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework — Retrieve all Contacts for an Organisation",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Organisations",
    "path": "/tech/lfi-api-hub/trust-framework/api/organisations",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework — Retrieve all Organisations",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Software Statements for an Organisation",
    "path": "/tech/lfi-api-hub/trust-framework/api/software-statements",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework — Retrieve all Software Statements for an Organisation",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve an Account (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/accounts-accountId",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve an Account (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve ATMs",
    "path": "/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Retrieve ATMs",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve ATMs — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/atms/field-mapping/atm",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Retrieve ATMs — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Employment Insurance Policies (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Employment Insurance Policies (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Health Insurance Policies (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/health-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Health Insurance Policies (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Home Insurance Policies (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/home-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Home Insurance Policies (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Life Insurance Policies (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/life-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Life Insurance Policies (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Motor Insurance Policies (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/motor-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Motor Insurance Policies (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Renters Insurance Policies (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/renters-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Renters Insurance Policies (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Travel Insurance Policies (CAAP)",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/travel-insurance-policies",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Retrieve Travel Insurance Policies (CAAP)",
    "headings": [],
    "body": ""
  },
  {
    "title": "Revoke Consent",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Revoke Consent",
    "headings": [],
    "body": ""
  },
  {
    "title": "Revoke Consents in Consent Group",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Revoke Consents in Consent Group",
    "headings": [],
    "body": ""
  },
  {
    "title": "Security Validation",
    "path": "/tech/lfi-api-hub/production/testing-certification/security-validation",
    "category": "LFI Integration",
    "section": "Production",
    "description": "🕒 2 minute read Security Validation ::: info Coming soon This page will detail the security validation requirements and processes for LFI certification. :::",
    "headings": [
      "Security Validation"
    ],
    "body": "🕒 2 minute read Security Validation ::: info Coming soon This page will detail the security validation requirements and processes for LFI certification. :::"
  },
  {
    "title": "Single Instant Payment - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Single Instant Payment · UX Single Instant Payment — User Experience 4 min read When a customer is redirected to you to authorize an Open Finance…",
    "headings": [
      "Single Instant Payment — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Single Instant Payment · UX Single Instant Payment — User Experience 4 min read When a customer is redirected to you to authorize an Open Finance consent for a single instant payment, you must present an Authorization Page that clearly explains the payment the customer is authorizing. The page must collect the customer's explicit and informed consent, and it must accurately reflect the payee, amount, schedule, and all material terms of the payment consent. The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live. Simulated Accounts Behaviour Duplicate Payment Alert Payment Limit Exceeded Already a Trusted Payee"
  },
  {
    "title": "Single Instant Payment — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Single Instant Payment Single Instant Payment — API Guide 14 min read Single Instant Payment lets a TPP initiate a one-off domestic payment…",
    "headings": [
      "Single Instant Payment — API Guide 14 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Matching the PII against the consent",
      "Reading the FAPI customer headers",
      "Response"
    ],
    "body": `LFI · Banking · Service Initiation · Single Instant Payment Single Instant Payment — API Guide 14 min read Single Instant Payment lets a TPP initiate a one-off domestic payment from a customer's account at your LFI via the API Hub. The payment runs on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve a TPP payment from consent creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Single Instant Payment Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor, matching the payment-time PII against the consent, and reading the FAPI customer headers. Before implementing Single Instant Payment, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Single Instant Payment advertised — ApiMetadata.SingleInstantPayment.Supported is set to true on your authorisation server entry in the Trust Framework. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules — standardVersion , Initiation.DebtorAccount , BaseConsentId , CurrencyRequest , payment-type support, PII conformance, creditor checks — is enumerated in Single Instant Payment Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. The end-to-end flow is: Read the kid from the JWE protected header and look up the matching Enc1 private key. Decrypt the JWE → recover the inner JWS. Decode the JWS payload (signature verification is optional — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit). Validate the decoded payload against the consent-time PII schema — AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII in uae-api-hub-consent-manager-openapi.yaml . additionalProperties: false is set at every level, so any unexpected field fails validation. Happy-path snippet: For the per-step deep dive — kid lookup conventions, key import options, the optional JWS signature verification, building the ajv / jsonschema validator with all $ref schemas registered — see How to Decrypt PII . The decrypted consent-time PII for a Single Instant Payment looks like: If decryption fails, schema validation fails, or any required field is missing, respond with invalid per Rejecting an invalid consent . Validating the Creditor For Single Instant Payment, Initiation.Creditor MUST be an array of exactly one entry. The full Creditor rules — cardinality, m`
  },
  {
    "title": "Single Instant Payment — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Single Instant Payment Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Single Instant Payment Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Single Instant Payment — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Strong Customer Authentication",
    "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca",
    "category": "LFI Integration",
    "section": "Consent Journey",
    "description": "LFI · Consent Journey · Authentication · SCA Strong Customer Authentication 4 min read Strong Customer Authentication (SCA) is multi-factor authentication (MFA) that requires the…",
    "headings": [
      "Strong Customer Authentication 4 min read",
      "Data sharing consents",
      "Payment consents — step-up authentication"
    ],
    "body": "LFI · Consent Journey · Authentication · SCA Strong Customer Authentication 4 min read Strong Customer Authentication (SCA) is multi-factor authentication (MFA) that requires the end user to authenticate using at least two independent factors. SCA is a regulatory requirement under the CBUAE directive Prevention of Fraud Incidents Impacting Consumers (Notice No. 3057/2025) and applies to all Open Finance consent journeys. SCA requires at least two of the following three factors: Factor Category Examples Possession Something you have A bound mobile device, hardware token, SIM card Inherence Something you are Fingerprint, facial recognition, voice recognition Knowledge Something you know PIN, password, passphrase Each factor used MUST be independent — compromise of one factor MUST NOT compromise another. The following methods are prohibited in Open Finance consent journeys: Method Status Rationale SMS OTP (as standalone) MUST NOT be used Prohibited by CBUAE directive as a standalone authentication method Email OTP (as standalone) MUST NOT be used Prohibited by CBUAE directive as a standalone authentication method Static passcodes (as standalone) MUST NOT be used Prohibited by CBUAE directive as a standalone authentication method SMS OTP (as a factor in Open Finance MFA) MUST NOT be used Open Finance authentication MUST NOT introduce methods that are more obstructive or weaker than the LFI's existing digital channels. If the LFI does not use SMS OTP in its own mobile banking authentication, it MUST NOT introduce it for Open Finance. Email OTP (as a factor in Open Finance MFA) MUST NOT be used Same rationale as above. These methods add friction and latency that degrade the customer experience below the standard of the LFI's own channels. LFIs MUST NOT introduce authentication factors into the Open Finance journey that are not used in their existing digital channels. Open Finance authentication MUST be equivalent to — not more burdensome than — the LFI's current authentication experience. Data sharing consents For data sharing consents, a single MFA ceremony at the start of the consent journey is sufficient. No step-up authentication is required. The end user authenticates, reviews the data sharing permissions, selects accounts, and authorizes the consent. Payment consents — step-up authentication For payment consents (single payments and multi-payment consents), the CBUAE directive requires step-up authentication for sensitive actions including the initiation of payments. This means an additional authentication gesture is required at the point the end user confirms the payment authorization. In practice, a well-implemented payment consent journey has two authentication touchpoints: Touchpoint Purpose What happens Initial authentication Establish the end user's identity The end user opens the LFI app (or web page) and completes MFA — typically device possession + biometric or PIN. This is identical to how the end user would normally open their banking app. Payment confirmation Confirm intent for the specific payment After reviewing the payment details, the end user confirms authorization with a native biometric gesture (e.g. Face ID, fingerprint). This is identical to how the end user would confirm a payment in their banking app. These two touchpoints serve distinct purposes — identity establishment and payment intent confirmation — and align with how banking apps already handle payment flows. The end user experience is familiar: open the app with your face or fingerprint, review the payment, confirm with your face or fingerprint. The initial authentication is the natural act of opening and unlocking the banking app. The payment confirmation is the natural act of approving a specific transaction. End users already do this in their banking apps today. The step-up requirement simply ensures this existing pattern is preserved in the Open Finance journey. The table below maps specific clauses from CBUAE Notice No. 3057/2025 Prevention o"
  },
  {
    "title": "Submit Lead",
    "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/leads",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Submit Lead",
    "headings": [],
    "body": ""
  },
  {
    "title": "Submit Lead — Field Mapping",
    "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/field-mapping/leads",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking — Submit Lead — Field Mapping",
    "headings": [],
    "body": ""
  },
  {
    "title": "Testing & Certification Overview",
    "path": "/tech/lfi-api-hub/production/testing-certification/overview",
    "category": "LFI Integration",
    "section": "Production",
    "description": "🕒 2 minute read Testing & Certification Overview ::: info Coming soon This page will provide an overview of the testing and certification requirements LFIs must meet before going…",
    "headings": [
      "Testing & Certification Overview"
    ],
    "body": "🕒 2 minute read Testing & Certification Overview ::: info Coming soon This page will provide an overview of the testing and certification requirements LFIs must meet before going live. :::"
  },
  {
    "title": "TPP Buddying",
    "path": "/tech/lfi-api-hub/production/testing-certification/tpp-buddying",
    "category": "LFI Integration",
    "section": "Production",
    "description": "🕒 2 minute read TPP Buddying ::: info Coming soon This page will cover the TPP buddying process, where LFIs test with a partner TPP before going live. :::",
    "headings": [
      "TPP Buddying"
    ],
    "body": "🕒 2 minute read TPP Buddying ::: info Coming soon This page will cover the TPP buddying process, where LFIs test with a partner TPP before going live. :::"
  },
  {
    "title": "TPP Management & Activation",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "LFI · API Hub · Admin Portal · TPP Management TPP Management & Activation 3 min read The TPP Management section of the Admin Portal is where you manage all TPPs that have…",
    "headings": [
      "TPP Management & Activation 3 min read",
      "Step 1 — Activate the TPP",
      "Step 2 — Activate the Software Statement",
      "Step 3 — Activate the Client"
    ],
    "body": "LFI · API Hub · Admin Portal · TPP Management TPP Management & Activation 3 min read The TPP Management section of the Admin Portal is where you manage all TPPs that have registered with your API Hub. It contains three sub-sections: TPP List , Software Statements , and Clients . All three levels — TPP, software statement, and client — MUST be active for a TPP to make API requests. If any one of the three is blocked, the TPP's requests will be rejected. The TPP List shows every TPP organisation that has registered with your API Hub. Each TPP entry represents an organisation from the Trust Framework. A single TPP organisation may have multiple software statements (applications) and multiple clients. You will see TPP entries for Nebras and Ozone with active clients against them. These are used internally to validate and monitor your API Hub — they MUST remain active. If any of these clients' requests are causing issues, contact Nebras before blocking them. After a TPP has registered with you — after the /tpp-registration endpoint is called successfully (for detail on how a TPP registers, see Registration API Guide ) — the TPP is not automatically granted access. The LFI MUST activate the TPP within the Admin Portal for access to be granted. The activation is done in three steps and MUST be performed in this order. Step 1 — Activate the TPP Step 2 — Activate the Software Statement Step 3 — Activate the Client In certain circumstances, Nebras may instruct an LFI to block a TPP — for example, if a TPP is consistently sending malformed requests and is unresponsive to communications. Blocking can be applied at any of the three levels: Block the client — immediately stops requests from that specific client Block the software statement — stops all clients under that software statement Block the TPP — stops all software statements and clients for the entire TPP organisation To block, navigate to the relevant entity (TPP, software statement, or client), open its detail page, and click Block . To restore access, open the blocked entity and click Activate . Do NOT block a TPP, software statement, or client without explicit instruction from Nebras. If you observe issues with a specific TPP's traffic, raise it with Nebras first. In cases where the Central Bank revokes a TPP's licence, Nebras will remove the TPP from the ecosystem centrally — no LFI action is required."
  },
  {
    "title": "Trust Framework — Adding Users",
    "path": "/tech/lfi-api-hub/trust-framework/adding-users",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Onboarding Adding Users 2 min read Organisation Administrators can onboard Users. User Type Access Scope Primary Technical Contact (PTC) Can manage all…",
    "headings": [
      "Adding Users 2 min read"
    ],
    "body": "LFI · Trust Framework · Onboarding Adding Users 2 min read Organisation Administrators can onboard Users. User Type Access Scope Primary Technical Contact (PTC) Can manage all technical resources of an Organisation — Applications and Certificates. Secondary Technical Contact (STC) Can manage Data Providers, adding and removing API Endpoints and Certifications. Cannot manage Applications and Certificates. Primary Business Contact (PBC) Can manage Contacts in the Organisation. Cannot manage Technical Resources. Secondary Business Contact (SBC) Has read-only access to Trust Framework resources. Cannot manage Applications, Certificates or any other resource in the Trust Framework. Onboarding a user as a Secondary Business Contact (SBC) in the Sandbox Trust Framework ( https://web.sandbox.directory.openfinance.ae/ ) is recommended if the user only needs access to the Nebras Jira Service Desk via Trust Framework SSO. The Primary Technical Contact is the key technical owner within the organisation on the Trust Framework. The PTC is responsible for managing all applications and the keys and certificates within those applications. This includes: Creating and configuring applications Managing certificates (Transport, Signing, and Encryption) for each application Keeping keys and certificates current and renewing them before expiry Ensuring applications are correctly configured with the required roles and certificates See Applications for more on creating and managing applications, and Keys & Certificates for certificate management. Log in to the Trust Framework and navigate to the Roles section within your organisation. Navigate to a role within your organisation. Users can be added under any role, but for easier management it is recommended to add all users consistently under the same role. Navigate to the Domain Users section of your organisation. Click + New Domain User . Select the System as AlTareq Trust Framework and select the relevant user role — PTC , PBC , STC , or SBC . Enter the new user's email address and confirm. The invited user will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what the user must do next, see Sign Up . If a user does not receive the invitation email, ask them to check their spam folder."
  },
  {
    "title": "Trust Framework — API",
    "path": "/tech/lfi-api-hub/trust-framework/api/",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · API API 2 min read Several things that you can do in the Trust Framework portal can also be done via API — managing organisations, software statements,…",
    "headings": [
      "API 2 min read",
      "Browse this section",
      "API Guide",
      "Create a token",
      "Get organisations",
      "Get software statements",
      "Get contacts",
      "Get authorisation servers",
      "Get API resources",
      "Get API families"
    ],
    "body": "LFI · Trust Framework · API API 2 min read Several things that you can do in the Trust Framework portal can also be done via API — managing organisations, software statements, authorisation servers, certificates, and contacts. The API uses mTLS for all authenticated requests. A valid transport certificate registered in the Trust Framework is required. Production Sandbox Well Known auth.directory.openfinance.ae/.well-known/openid-configuration auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration Auth https://matls-auth.directory.openfinance.ae https://matls-auth.sandbox.directory.openfinance.ae API https://matls-api.directory.openfinance.ae https://matls-api.sandbox.directory.openfinance.ae As per the Trust Framework, the API is powered by Raidiam and the official documentation can be found at raidiam.com/developers/docs/apis . Section contents Browse this section The full set of pages covering the Trust Framework API. Page API Guide Implementation notes, signing helpers, and worked examples for calling the Trust Framework API. Open → Endpoint POST /token Create a token OpenAPI reference for the Trust Framework POST /token endpoint. Open spec → Endpoint GET /organisations Get organisations OpenAPI reference for fetching organisations from the Trust Framework Directory. Open spec → Endpoint GET .../{OrganisationId}/softwarestatements Get software statements OpenAPI reference for fetching software statements registered for an organisation. Open spec → Endpoint GET .../{OrganisationId}/contacts Get contacts OpenAPI reference for fetching the contacts registered for an organisation. Open spec → Endpoint GET .../{OrganisationId}/authorisationservers Get authorisation servers OpenAPI reference for fetching authorisation servers under an organisation. Open spec → Endpoint GET .../{AuthorisationServerId}/apiresources Get API resources OpenAPI reference for fetching API resources registered on an authorisation server. Open spec → Endpoint GET /references/apifamilies Get API families OpenAPI reference for retrieving the full set of API family definitions and metadata schemas. Open spec →"
  },
  {
    "title": "Trust Framework — API Guide",
    "path": "/tech/lfi-api-hub/trust-framework/api/api-guide",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · API API Guide 2 min read The Trust Framework directory provides a set of APIs that enable Applications within the framework to communicate and exchange…",
    "headings": [
      "API Guide 2 min read",
      "Key response fields",
      "Key response fields"
    ],
    "body": `LFI · Trust Framework · API API Guide 2 min read The Trust Framework directory provides a set of APIs that enable Applications within the framework to communicate and exchange data. This guide explains how a registered Application can: Retrieve all registered Organisations Filter those Organisations to identify TPPs Retrieve the associated Software Statements for each TPP These steps can be used, for example, to generate a report that cross-references Organisations with their corresponding Software Statement applications. Before calling the Trust Framework API, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework. Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . The directory uses the OAuth 2.0 client credentials grant. POST to the directory's token endpoint, presenting your transport certificate over mTLS: See the POST /token API reference for the full request and response schema. With the token, call the /organisations endpoint to retrieve every organisation registered in the directory: Key response fields Field Type Description OrganisationId string Unique identifier for the organisation — used in subsequent calls OrganisationName string Human-readable name of the organisation Size string 255 chars, ^[^<>]*$ Organisation type — "TPP" for Third Party Providers, "LFI" for Licensed Financial Institutions. Use this field to filter results to TPPs only. Status string Registration status, e.g. Active CreatedOn string (ISO 8601) Date the organisation was registered See the GET /organisations API reference for the full response schema. The /organisations response includes both LFIs and TPPs. Use the Size field to narrow the list to TPPs only before iterating: For each TPP from Step 3, call the /softwarestatements sub-resource using its OrganisationId : Key response fields Field Type Description SoftwareStatementId string Unique identifier for the Software Statement SoftwareClientName string Human-readable name of the client application Status string Status of the Software Statement, e.g. Active SoftwareRoles string[] Roles assigned to this application (e.g. BDSP , BSIP ) OrganisationId string The owning organisation (not always returned inline — join from Step 2) See the GET /softwarestatements API reference for the full response schema.`
  },
  {
    "title": "Trust Framework — API Resource Meta Data",
    "path": "/tech/lfi-api-hub/trust-framework/servers/api/meta",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Servers · API Resources Meta Data 4 min read Each API resource registered in the Trust Framework carries a metadata schema specific to its API family.…",
    "headings": [
      "Meta Data 4 min read",
      "Example",
      "Simple payment types",
      "Beneficiary-aware payment types",
      "Lifecycle fields",
      "Example"
    ],
    "body": "LFI · Trust Framework · Servers · API Resources Meta Data 4 min read Each API resource registered in the Trust Framework carries a metadata schema specific to its API family. These metadata fields are surfaced in the directory and via GET /participants , allowing TPPs to discover your institution's capabilities and configuration. The metadata schemas described below correspond to version 2.1 of the Open Finance UAE standards. The full schema definitions can be retrieved programmatically via GET /references/apifamilies . Click the actions menu on the API resource and select Configure API Metadata . Enter the metadata fields for the API family. The required fields vary per family — see the sections below for details. Field Required Type Description AccountSubType Yes array Account sub-types supported for data sharing. One or more of: CurrentAccount , Savings , CreditCard , Mortgage , Finance OverLimitFees Optional string The cost per API call (in AED) for each data sharing transactional data request when usage limits have been exceeded (15 pages per customer per day for attended calls, or 5 pages per customer per day for unattended calls). Format: up to 16 digits with 2 decimal places (e.g. 0.50 ) DeprecationDate Optional string The date ( YYYY-MM-DD ) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing users until the Retirement Date RetirementDate Optional string The date ( YYYY-MM-DD ) on which this API version or resource will be permanently retired and become unavailable. After this date, requests will fail, and any existing consents or integrations will cease to function. TPPs MUST complete migration before this date Example The payment family declares which payment types and consent models your institution supports. All payment type fields are required — set Supported to false for payment types you do not support. Simple payment types These payment types require a single Supported boolean: Field Required Description SingleInstantPayment.Supported Yes true if single instant payments are supported FixedDefinedSchedule.Supported Yes true if fixed amount payments on a defined schedule are supported VariableDefinedSchedule.Supported Yes true if variable amount payments on a defined schedule are supported FixedPeriodicSchedule.Supported Yes true if fixed amount periodic payments are supported VariablePeriodicSchedule.Supported Yes true if variable amount periodic payments are supported FixedOnDemand.Supported Yes true if fixed amount on-demand payments are supported Beneficiary-aware payment types These payment types require additional detail about which beneficiary models are supported: Field Required Description VariableOnDemand.SingleBeneficiarySupported Yes true if variable on-demand consents support a single beneficiary VariableOnDemand.MultipleBeneficiariesSupported Yes true if variable on-demand consents support multiple beneficiaries (2–10) VariableOnDemand.OpenBeneficiariesSupported Yes true if variable on-demand consents support unrestricted beneficiaries defined at the point of payment DelegatedAuthentication.SingleBeneficiarySupported Yes true if delegated authentication consents support a single beneficiary DelegatedAuthentication.MultipleBeneficiariesSupported Yes true if delegated authentication consents support multiple beneficiaries (2–10) DelegatedAuthentication.OpenBeneficiariesSupported Yes true if delegated authentication consents support unrestricted beneficiaries defined at the point of payment Lifecycle fields Field Required Type Description DeprecationDate Optional string The date ( YYYY-MM-DD ) from which this API version or resource is officially deprecated. After this date, no new consents SHOULD be created for this family, and migration to a newer version is strongly recommended. The API remains functional for existing use"
  },
  {
    "title": "Trust Framework — API Resources",
    "path": "/tech/lfi-api-hub/trust-framework/servers/api/",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Servers · API Resources API Resources 2 min read API Resources are registered under your Authorisation Server and describe the specific API endpoints your…",
    "headings": [
      "API Resources 2 min read",
      "Add and configure API resources",
      "Creating an API Resource",
      "API Resource Meta Data"
    ],
    "body": "LFI · Trust Framework · Servers · API Resources API Resources 2 min read API Resources are registered under your Authorisation Server and describe the specific API endpoints your organisation exposes to TPPs. Each API resource is associated with a set of scopes and a base URL, allowing TPPs to discover what you offer and how to reach it. TPPs can discover the endpoints you expose via GET /participants . An API resource entry in the Trust Framework directory tells TPPs: Which API family you support (e.g. banking data sharing, payment initiation) Where to send requests (the base URL for that API on your infrastructure) Which scopes are applicable for that API family When a TPP dynamically registers with your authorisation server, it uses the API resource entries to understand which scopes to request and which base URL to call. The Open Finance UAE ecosystem organises APIs into API families . Each family groups a set of related endpoints that the API Hub exposes to TPPs . The Base URL for these TPP-facing endpoints is always your API Hub resource server: Environment Base URL Pre-production https://rs1.{lfiCode}.preprod.apihub.openfinance.ae Production https://rs1.{lfiCode}.apihub.openfinance.ae When a TPP calls one of these endpoints, the API Hub validates the request and routes it to the corresponding endpoint on your Ozone Connect implementation. The tables below show each TPP-facing API resource and the Ozone Connect endpoint it maps to. The structure and schema of all available API families can be retrieved from the Trust Framework via GET /references/apifamilies — this returns the family definitions, including their endpoint patterns and metadata schemas. An LFI can only publish API resources to the production Trust Framework once they have completed Functional Certification . API resources MAY be published to the sandbox Trust Framework at any time for development and testing. Endpoints marked API Hub default are delivered entirely by the API Hub — the LFI does not need to implement them in Ozone Connect. These endpoints MUST always be included when publishing the API family. The following families are available in version 2.1 . Banking data sharing — account information, balances, transactions, beneficiaries, and related sub-resources. API Resource (TPP-facing) Ozone Connect Endpoint GET /accounts GET /accounts GET /accounts/{AccountId} GET /accounts/{accountId} GET /accounts/{AccountId}/balances GET /accounts/{accountId}/balances GET /accounts/{AccountId}/transactions GET /accounts/{accountId}/transactions GET /accounts/{AccountId}/beneficiaries GET /accounts/{accountId}/beneficiaries GET /accounts/{AccountId}/direct-debits GET /accounts/{accountId}/direct-debits GET /accounts/{AccountId}/standing-orders GET /accounts/{accountId}/standing-orders GET /accounts/{AccountId}/scheduled-payments GET /accounts/{accountId}/scheduled-payments GET /accounts/{AccountId}/statements GET /accounts/{accountId}/statements GET /accounts/{AccountId}/product GET /accounts/{accountId}/products GET /accounts/{AccountId}/parties GET /accounts/{accountId}/customer GET /parties GET /customer GET /account-access-consents API Hub default GET /account-access-consents/{ConsentId} API Hub default Payment initiation — domestic single payments and multi-payments. API Resource (TPP-facing) Ozone Connect Endpoint POST /payments POST /payments GET /payments/{PaymentId} GET /payments/{paymentId} POST /payment-consents/{ConsentId}/refund POST /payment-consents/{consentId}/refund GET /payment-consents API Hub default GET /payment-consents/{ConsentId} API Hub default Confirmation of payee — payee name verification before initiating a payment. API Resource (TPP-facing) Ozone Connect Endpoint POST /confirmation POST /customers/action/cop-query GET /discovery API Hub default ATM location data — publicly accessible, no consent required. API Resource (TPP-facing) Ozone Connect Endpoint GET /atms GET /atm Product catalogue and lead generation — publicly accessible "
  },
  {
    "title": "Trust Framework — Application",
    "path": "/tech/lfi-api-hub/trust-framework/application",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Applications Application 2 min read Within the Trust Framework, an application performs two closely related roles: software statement and client . As a…",
    "headings": [
      "Application 2 min read"
    ],
    "body": "LFI · Trust Framework · Applications Application 2 min read Within the Trust Framework, an application performs two closely related roles: software statement and client . As a software statement, the application contains the key information required to establish a trusted connection with other organisations. This includes: The roles it is permitted to perform (e.g. BDSP , BSIP ) The organisation it belongs to Its approved capabilities and permissions In this role, it defines the identity and permissions of the application as authorised within the ecosystem. As a client, the same application becomes the active connection to another organisation (such as the API Hub). In this role, it: Is issued credentials (such as a client ID and certificates) Uses those credentials to make API calls and perform transactions Is registered with the API Hub In simple terms: An application both defines what it is allowed to do and uses those permissions to interact with other participants , in line with the rules set by the Central Bank of the UAE. Each application must include the following details: Feature Description Example Roles Functional roles assigned to the application, inherited from the parent organisation's registered roles. BSIP , BDSP Client Name The public-facing name of the application as registered in the Trust Framework. MyApp v1 Version The current version of the application or software statement. 1.0.3 Federation Entity Management Type Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated). federation-managed Logo A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens. logo.png Redirect URI Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication. More information on Mobile app Redirect URIs . https://app.example.com/callback"
  },
  {
    "title": "Trust Framework — Certificates with a SAN",
    "path": "/tech/lfi-api-hub/trust-framework/certificates-san/",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Certificates Certificates with a SAN 2 min read The Subject Alternative Name (SAN) extension is required on server-side certificates — specifically the…",
    "headings": [
      "Certificates with a SAN 2 min read"
    ],
    "body": "LFI · Trust Framework · Certificates Certificates with a SAN 2 min read The Subject Alternative Name (SAN) extension is required on server-side certificates — specifically the transport certificates LFIs present at their API Hub endpoints. The Subject Alternative Name (SAN) extension is required on server-side certificates — specifically the transport certificates LFIs present at their API Hub endpoints. TPPs generating client certificates (transport, signing, or encryption) do not add a SAN; they set the CN to their application's Client ID instead. See Keys and Certificates for client certificate requirements. Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for hostname validation on server certificates. Instead, they require the Subject Alternative Name (SAN) extension specifying the DNS hostnames the certificate is valid for — in this context, the API Hub instance the LFI operates. To include a SAN directly in the CSR without needing a separate config file, you can use the -addext option: In this example, some.hostname.com will appear in the SAN extension of the CSR. Historically, SSL/TLS server certificates included the Common Name (CN) to specify the hostname. However: CN is deprecated — as of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for hostname validation on server certificates. SAN is mandatory — the Subject Alternative Name is now the authoritative field for hostname checking. Multiple hostnames — SAN supports multiple DNS names (and IP addresses), whereas CN supports only one. For server certificates, modern CSRs omit CN and rely solely on SAN. The -addext option was introduced in OpenSSL 1.1.1 (released September 2018). If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above. On older versions of OpenSSL, you will need to use an external configuration file ( openssl.cnf ) to include SANs."
  },
  {
    "title": "Trust Framework — Contacts",
    "path": "/tech/lfi-api-hub/trust-framework/contacts",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Contacts Contacts 2 min read Organisation Contacts allow Organisations to register specific personnel contact information within the Trust Framework,…",
    "headings": [
      "Contacts 2 min read"
    ],
    "body": "LFI · Trust Framework · Contacts Contacts 2 min read Organisation Contacts allow Organisations to register specific personnel contact information within the Trust Framework, ensuring that participants from other Organisations can easily reach the appropriate departments when needed. The contact details registered here are visible to other participants outside your organisation. Type Purpose Security Security incidents, vulnerability disclosures, and certificate issues Billing Commercial and billing enquiries Incident Operational incidents and service disruptions Technical Technical integration and API support Business General business and partnership enquiries Each contact requires an email address and a phone number . Log in to the Trust Framework and navigate to your organisation. Navigate to the Contacts section of your organisation. Click + New Contact . Select the Contact Type and enter the email address and phone number of the contact. Save the contact."
  },
  {
    "title": "Trust Framework — Creating a Server",
    "path": "/tech/lfi-api-hub/trust-framework/servers/creating",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Servers Creating a Server 3 min read This walkthrough covers publishing your API Hub as a server in the Trust Framework. You MUST complete this before…",
    "headings": [
      "Creating a Server 3 min read",
      "Obtain Your Issuer",
      "Navigate to your Organisation",
      "Provide the Server Details",
      "Set the Account Type",
      "Upload the Logo",
      "Save the Server",
      "Add API resources to your server",
      "API Resources — Overview",
      "Creating an API Resource"
    ],
    "body": "LFI · Trust Framework · Servers Creating a Server 3 min read This walkthrough covers publishing your API Hub as a server in the Trust Framework. You MUST complete this before registering API resources or being discoverable by TPPs. Before creating a server: Your organisation MUST be onboarded to the Trust Framework with the necessary admin permissions. See Onboarding if you have not yet completed this step. Your API Hub MUST be provisioned and you MUST have received your environment-specific configuration , including your well-known discovery document URI. Obtain Your Issuer Before creating the server entry, retrieve the issuer value from your API Hub's well-known discovery document. The discovery document URI is provided as part of your environment-specific onboarding configuration . Open the discovery document URI in a browser or HTTP client and locate the issuer field. You will need this value in Step 3. Navigate to your Organisation Sign in to the Trust Framework directory. Ensure you are creating the server in the correct Trust Framework environment: Pre-production API Hub → Sandbox Trust Framework ( web.sandbox.directory.openfinance.ae ) Production API Hub → Production Trust Framework ( web.directory.openfinance.ae ) Navigate to your Organisation . Open the Auth Servers section. Click + New Server . Provide the Server Details Fill in the required fields. These values are published in the directory and are visible to TPPs. Field Guidance Customer Friendly Server Name A public-facing name that reflects the brand this API Hub supports (e.g. Acme Bank Retail or Acme Bank Business ). If your institution operates multiple API Hubs for different brands, each MUST have a distinct name. Issuer The issuer value from your API Hub's well-known discovery document, obtained in Step 1. Description A short description of the Open Finance service (e.g. Open Finance APIs for Demo Bank's retail customers ). Set the Account Type Indicate the account type(s) supported by this server: Retail — personal and individual customer accounts SME — small and medium enterprise accounts Corporate — corporate and institutional accounts This allows TPPs to identify which server to use when requesting access to a specific category of accounts. Upload the Logo Upload a logo for this server entry. The logo MUST match the brand that this API Hub supports. If your institution has multiple API Hubs (e.g. one for retail and one for business), each server MUST use the logo corresponding to its specific brand. This logo is displayed to TPPs and end users during consent and authorisation journeys. Save the Server Skip Additional Details and Server Validity sections. Click Save to register the server. Your Server now appears in the Server section of your Organisation. After creation, your Authorisation Server ID is visible on the server detail page. It is also discoverable to TPPs via the API Discovery process. Next Steps Add API resources to your server With your server published, describe the APIs your institution exposes by registering API resources. Sub-section API Resources — Overview What API resources are, how they relate to API families, and how they tie into your server entry. Open → Walkthrough Creating an API Resource Step-by-step walkthrough of registering an API family on your server. Open →"
  },
  {
    "title": "Trust Framework — Creating an API Resource",
    "path": "/tech/lfi-api-hub/trust-framework/servers/api/creating",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Servers · API Resources Creating an API Resource 3 min read This walkthrough covers registering an API resource under your server. You must have a server…",
    "headings": [
      "Creating an API Resource 3 min read",
      "Navigate to your Authorisation Server",
      "Create the API Resource",
      "Add API Discovery Endpoints"
    ],
    "body": "LFI · Trust Framework · Servers · API Resources Creating an API Resource 3 min read This walkthrough covers registering an API resource under your server. You must have a server already created before following these steps. Navigate to your Authorisation Server Sign in to the Trust Framework directory. Navigate to your Organisation . Click into the Server we are adding the APIs to. Open the API Resources section. Click + New API Resource . Create the API Resource From the API Family dropdown, select the family that corresponds to the API you are registering. The following API families are available: Account Information ( account-information ) — banking data sharing Payment Initiation ( payment ) — domestic single and multi-payments Confirmation of Payee ( confirmation ) — payee name verification ATM ( atm ) — ATM location data Products & Leads ( product ) — product catalogue and lead generation For full details on what each family contains, including the endpoints and their mappings, see the API Resources Overview . Set the API Version (e.g. 2.1 ). Click Save . The resource now appears in your Active API Resources list. If your institution offers multiple API families (e.g. both data sharing and payment initiation), repeat Steps 1–2 for each family. Each family MUST be registered as a separate API resource. Add API Discovery Endpoints Once your API resource is saved, you MUST add the discovery endpoints so that TPPs can discover and call your APIs. Click the actions menu on the API resource and select + Add API Discovery Endpoints . Enter the API Base URL . The format is always your API Hub resource server: Environment Base URL Pre-production https://rs1.{lfiCode}.preprod.apihub.openfinance.ae Production https://rs1.{lfiCode}.apihub.openfinance.ae Replace {lfiCode} with your institution's LFI code. Click Generate Endpoints . The system will populate the list of available endpoints for this API family. Tick all the endpoints you support. Check all endpoints are correct, then click Save . Some endpoints are served directly by the API Hub and do not call your Ozone Connect server — for example, /account-information/v2.1/account-access-consents . These endpoints MUST always remain ticked. See the API Resources Overview for which endpoints are marked as API Hub default . The endpoints are now published to your server entry in the Trust Framework. TPPs can discover them via the API Discovery process. You can verify that your API resource is correctly registered by calling the Trust Framework API: GET /organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources This returns the list of API resources associated with your authorisation server, as they would appear to a TPP querying the directory."
  },
  {
    "title": "Trust Framework — Creating the C3-hh-cm-client Application",
    "path": "/tech/lfi-api-hub/trust-framework/creating-c3-application",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Applications Creating the C3-hh-cm-client Application 2 min read The C3-hh-cm-client is the LFI-side application used to make requests to the API Hub. This…",
    "headings": [
      "Creating the C3-hh-cm-client Application 2 min read",
      "Navigate to '+ New Application'",
      "Select the application roles",
      "Provide the Client Details",
      "Provide the Redirect URI",
      "Finish creating the application"
    ],
    "body": "LFI · Trust Framework · Applications Creating the C3-hh-cm-client Application 2 min read The C3-hh-cm-client is the LFI-side application used to make requests to the API Hub. This walkthrough covers creating that application in the Trust Framework Directory. Navigate to '+ New Application' Navigate to your organisation. Open the Applications section. Click + New Application . Select the application roles Assign the LFI role only to this client. It must not be assigned any TPP roles. Select the LFI role . This client is used solely to make requests to the API Hub on behalf of your LFI and must not be assigned TPP roles. Provide the Client Details Client Name — enter a clear name that identifies this client as your C3-hh-cm-client (e.g. C3-hh-cm-client ). Software Version — enter a version for your software (e.g. 1.0.0 ). Logo — a logo is required by the form. Because this client is never used in a user-facing redirect flow, the logo will not be displayed to end users; any valid image will suffice. Federation — we recommend setting Federation to Enabled and Federation Entity Management Type to Managed . This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so the API Hub can discover and validate your client without manual configuration. Provide the Redirect URI A redirect URI is required by the form. Because this client is never used in an authorisation flow with an end user, it will not be called; any valid HTTPS URI will suffice (e.g. https://localhost/callback ). Finish creating the application Click through to Create and register the application. Once your application is created, the Trust Framework assigns it a Client ID — a UUID that permanently identifies this application. You will use this value as client_id , iss , and sub in every JWT — keep a note of it. Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application."
  },
  {
    "title": "Trust Framework — Keys and Certificates",
    "path": "/tech/lfi-api-hub/trust-framework/certificates/",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Keys & Certificates Keys and Certificates 4 min read To operate within the ecosystem, your application must use certificates issued and stored within the…",
    "headings": [
      "Keys and Certificates 4 min read",
      "1. Transport Certificate — Required",
      "2. Signing Certificate — Required",
      "Generating the Private Key and CSR",
      "Navigate to App Certificates",
      "Select the certificate type",
      "Generate the private key and CSR",
      "Upload the CSR",
      "Download the certificate"
    ],
    "body": "LFI · Trust Framework · Keys & Certificates Keys and Certificates 4 min read To operate within the ecosystem, your application must use certificates issued and stored within the Trust Framework. There are three types of certificates, each serving a distinct security function. As an LFI, you are required to create two certificate types per application: 1. Transport Certificate — Required Used for mutual TLS (mTLS) to authenticate your client (application) when making API requests. Purpose: Secure transport and client authentication Usage: mTLS handshake for all API calls Presented to: API providers during connection 2. Signing Certificate — Required Used to digitally sign JWTs your application sends — such as client assertions, request objects, etc. Purpose: Proving integrity and authenticity of signed payloads Usage: Signing the contents of JWTs The Trust Framework also supports an Encryption Certificate , but this is not required for LFI clients . Note that the encryption keys you may see on your organisation (e.g. ENC1) are server-side keys used by the platform — these are distinct from application-level encryption certificates. An application-level encryption certificate is only needed by TPPs that wish to receive encrypted webhook event notifications. See Webhooks for more information. Each certificate plays a critical role in securing communication and asserting identity. Once you understand the certificate types, you can generate the required keys and CSRs according to the Trust Framework specifications. Keys and certificates within the Trust Framework (TF) must meet the following requirements: 2048-bit RSA private key (unencrypted) A corresponding Certificate Signing Request (CSR) signed with SHA-256 CSR subject fields must include: C → Country — must be set to AE (United Arab Emirates) O → Organization — must equal the Organization's legal name in the Trust Framework OU → Organizational Unit — must equal the Organization's ID in the Trust Framework CN → Common Name — must equal the application's Client ID (the UUID assigned by the Trust Framework when the application was created) Generating the Private Key and CSR The Trust Framework provides an example using OpenSSL to generate: A private key file ( .key ) A Certificate Signing Request file ( .csr ) Example: Replace LegalName and OrganizationId with your organisation's details from the Trust Framework. Replace UUID with your application's Client ID — the UUID assigned when the application was created (see Creating an Application ). Equivalent cryptographic tools may be used, provided all requirements above are met. The .csr file (Certificate Signing Request) must be uploaded to the Trust Framework. The .key file (Private Key) must be kept secure and must never be shared . More information on private key handling and security requirements can be found here . Navigate to App Certificates Open your application in the Trust Framework. Click App Certificates . Click + New Certificate . Select the certificate type Select Transport or Signing . You will need to repeat this process for each. Do not create an Encryption certificate for your LFI client. Generate the private key and CSR Generate your private key ( .key ) and Certificate Signing Request ( .csr ). Confirm that the CSR has been generated successfully before proceeding. The OpenSSL command shown is intended for demonstration and testing only. In production, private key generation and CSR creation must be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies. Upload the CSR Click Upload your CSR and select the .csr file generated in the previous step. Download the certificate Once the Trust Framework processes the CSR, your certificate is ready. Download the .pem certificate file. You now have the .pem / .key pair. Store your private key securely — it must never be shared. See Secure Management for requirements. Certificates are valid for"
  },
  {
    "title": "Trust Framework — Onboarding",
    "path": "/tech/lfi-api-hub/trust-framework/onboarding",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Onboarding Onboarding 2 min read The onboarding process to the Trust Framework works in tandem with the licensing processes defined by the Central Bank of…",
    "headings": [
      "Onboarding 2 min read"
    ],
    "body": "LFI · Trust Framework · Onboarding Onboarding 2 min read The onboarding process to the Trust Framework works in tandem with the licensing processes defined by the Central Bank of the UAE (CBUAE) . As a Licensed Financial Institution (LFI) , you may begin onboarding to the appropriate Trust Framework environment based on your licensing status: Sandbox Environment — you may onboard to the Sandbox Trust Framework once the CBUAE has confirmed receipt of your licence application or provided in-principle approval . Production Environment — you may onboard to the Production Trust Framework once the CBUAE has approved your licence . If you have not yet started your Open Finance licensing process and are interested in finding out more, please contact connect@nebrasopenfinance.ae . Once the CBUAE has confirmed receipt of your licence application, send the following to support@nebrasopenfinance.ae to begin sandbox onboarding: To: support@nebrasopenfinance.ae Subject: Trust Framework Sandbox Onboarding Request — [Your Organisation Name] Dear Nebras Support, I wish to proceed with onboarding my organisation to the Trust Framework Sandbox. Please review the attached documents: 1. CBUAE Licence / Letter of Intent A copy of your valid Central Bank of the UAE (CBUAE) Licence, or in-principle approval letter and supporting documentation submitted to the CBUAE. 2. Organisation Details The completed Organisation Details form . 3. Primary Organisation Admin Details The completed Primary Organisation Admin form with the nominated administrator's details. 4. Primary Organisation Admin Approval A signed letter from your Chief Compliance Officer confirming the approval of the designated Primary Organisation Admin. As part of your licence application, you must nominate a Primary Organisation Admin . The Primary Organisation Admin will act as your organization's main point of contact with Nebras and the CBUAE during onboarding and ongoing operations. Within the Trust Framework, the Primary Organisation Admin will: Serve as system administrator Manage user access Appoint technical contacts Coordinate the signing and submission of required legal documentation Once your onboarding request has been accepted, the Primary Organisation Admin will receive an invitation email from the Trust Framework platform. They can complete registration by following the steps in the Sign Up guide . In addition to the steps in the Sign Up guide , as part of registration, the Primary Organisation Admin will receive the LFI Participation Agreement for electronic signature. This document must be signed by an authorised signatory — someone with the authority to legally bind the organisation. The Primary Organisation Admin must coordinate this signing before the organisation can access the Trust Framework. After the Primary Organisation Admin account is set up, they can add additional users within the Trust Framework platform."
  },
  {
    "title": "Trust Framework — Organisation Admins",
    "path": "/tech/lfi-api-hub/trust-framework/organisation-admins",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Onboarding Organisation Admins 2 min read Organisation Admins are responsible for ensuring the Organisation within the Trust Framework is properly…",
    "headings": [
      "Organisation Admins 2 min read"
    ],
    "body": "LFI · Trust Framework · Onboarding Organisation Admins 2 min read Organisation Admins are responsible for ensuring the Organisation within the Trust Framework is properly maintained. This includes ensuring all users have the correct access, that the Organisation's details are current and correct, and that assets such as logos are kept up to date. The first Organisation Admin is the Primary Organisation Admin — nominated during the CBUAE licensing process and granted access when onboarding begins. The Primary Organisation Admin can add other Organisation Admins. For other user roles, see Adding Users . Organisation Admins are responsible for: Ensuring all users have the correct level of access Adding a Primary Technical Contact (PTC) — required before applications and certificates can be managed Keeping Organisation details current and accurate Keeping logos and branding assets up to date Log in to the Trust Framework and navigate to your organisation. Navigate to the Administrators section of your Organisation. Click + New Organisation Administrator . Enter the new Organisation Administrator's email address. The invited Organisation Admin will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what they must do next, see Sign Up . If a user does not receive the invitation email, ask them to check their spam folder."
  },
  {
    "title": "Trust Framework — Overview & Organisations",
    "path": "/tech/lfi-api-hub/trust-framework/",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Directory Trust Framework 2 min read The Trust Framework facilitates secure data sharing between Licensed Financial Institutions (LFIs) and Third-Party…",
    "headings": [
      "Trust Framework 2 min read",
      "Sandbox Trust Framework",
      "Production Trust Framework",
      "Trust Anchors",
      "API Portal for Discovery",
      "Keystore",
      "Public Key Infrastructure (PKI)"
    ],
    "body": "LFI · Trust Framework · Directory Trust Framework 2 min read The Trust Framework facilitates secure data sharing between Licensed Financial Institutions (LFIs) and Third-Party Providers (TPPs) by delivering key services such as API discovery, client onboarding, and client authentication. Sandbox Trust Framework Web Application: https://web.sandbox.directory.openfinance.ae/ OIDC Discovery API: https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration Production Trust Framework Web Application: https://web.directory.openfinance.ae/ OIDC Discovery API: https://auth.directory.openfinance.ae/.well-known/openid-configuration Trust Anchors Maintain a registry of authorized participants, defining their roles and scopes of access within the ecosystem. API Portal for Discovery Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem. Keystore Manage a registry of active cryptographic keys for each participant. These keys are used to validate identities, enabling mutual trust — an essential foundation for secure data sharing. Public Key Infrastructure (PKI) Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for verifying certificates generated within the platform. All organisations participating in Open Finance operate within the Trust Framework. Upon successful onboarding, participants are registered within the Framework and gain visibility of other authorised organisations in the ecosystem. Organisations are classified according to their role: Licensed Financial Institutions (LFIs) provide capabilities into the Open Finance ecosystem. For example, an institution such as ADCB may expose payment initiation services or account information APIs for consumption by authorised participants. Third Party Providers (TPPs) consume the capabilities made available through Open Finance. For example, a fintech organisation such as Spare Technologies may access payment or data services provided by LFIs to deliver customer-facing solutions. Where permitted by their regulatory licence, an LFI may also operate in the capacity of a TPP. In such cases, the organisation retains its LFI classification within the Trust Framework while exercising TPP capabilities."
  },
  {
    "title": "Trust Framework — Roles",
    "path": "/tech/lfi-api-hub/trust-framework/roles",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "Trust Framework · Access scopes Trust Framework — Roles 2 min read The Trust Framework defines the rights and permissions granted to each organisation and its applications within…",
    "headings": [
      "Trust Framework — Roles 2 min read",
      "Defined roles for LFIs"
    ],
    "body": "Trust Framework · Access scopes Trust Framework — Roles 2 min read The Trust Framework defines the rights and permissions granted to each organisation and its applications within the Open Finance ecosystem. Roles are assigned to organisations during onboarding based on the services they provide. All LFIs are assigned the LFI role , which enables them to make operational calls to the API Hub. In addition, you will be assigned the relevant TPP roles corresponding to the Open Finance services your institution offers, so that you can test end-to-end flows as a TPP would: A Bank providing both payment initiation and data sharing services will be assigned BSIP and BDSP . An Insurer providing data sharing services will be assigned ISP . Defined roles for LFIs Role Description Typical Grant Types LFI Licensed Financial Institution Assigned to all LFIs. Used by the C3-hh-cm-client to make operational calls to the API Hub (e.g. GET /auth , PATCH /consents/{consentId} ). client_credentials BSIP Bank Service Initiation Provider Assigned to banks offering payment initiation services. Used to test service initiation flows as a TPP. client_credentials authorization_code refresh_token BDSP Bank Data Sharing Provider Assigned to banks offering account data sharing services. Used to test data sharing flows as a TPP. client_credentials authorization_code refresh_token ISP Insurance Service Provider Assigned to insurers offering insurance data sharing services. Used to test insurance data flows as a TPP. client_credentials authorization_code refresh_token When creating an application, ensure you assign the correct roles for its purpose. Your C3-hh-cm-client must have the LFI role only ; your TPP test client must have the appropriate TPP roles (e.g. BDSP for data sharing). See Creating the C3-hh-cm-client and the TPP Standards — Creating an Application for guidance."
  },
  {
    "title": "Trust Framework — Servers",
    "path": "/tech/lfi-api-hub/trust-framework/servers/",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Servers Servers 3 min read A Server in the Trust Framework represents your LFI's API Hub — the centralised platform that acts as the OIDC Authorisation…",
    "headings": [
      "Servers 3 min read",
      "Continue setting up your server",
      "Creating a Server",
      "API Resources"
    ],
    "body": "LFI · Trust Framework · Servers Servers 3 min read A Server in the Trust Framework represents your LFI's API Hub — the centralised platform that acts as the OIDC Authorisation Server, Resource Server, and Open Finance Gateway for your institution. Each API Hub instance is provisioned by the platform and is the entry point through which TPPs discover and interact with your Open Finance APIs. As an LFI you MUST publish your API Hub as a server to the Trust Framework and associate your API Resources with it so that TPPs can discover the endpoints you expose via GET /participants . You MUST publish your pre-production API Hub to the Sandbox Trust Framework and your production API Hub to the Production Trust Framework . Within the Trust Framework, a server entry is a directory record that represents your API Hub. It tells TPPs: Where to send users for authentication and consent (the API Hub's authorisation endpoint) Where to obtain tokens (the API Hub's token endpoint) What APIs you expose and at which base URLs (via your registered API Resources ) How to validate identity (via the API Hub's JWKS URI and OIDC discovery document) When a TPP initiates an authorisation code flow, it queries the Trust Framework directory to locate the correct server (API Hub) for the institution it wants to interact with. When your API Hub is provisioned, the platform provides you with a well-known discovery document URI . This URI is unique to your institution and environment. It exposes your API Hub's authorization_endpoint , token_endpoint , jwks_uri , issuer , and supported parameters. You will receive this URI as part of your environment-specific onboarding configuration . The issuer value from the discovery document is a required field when creating your server entry in the Trust Framework. To create a server in the Trust Framework, you MUST provide: Field Description Customer Friendly Server Name A public-facing name for your institution's Open Finance service, displayed in TPP-facing portals and consent screens. This MUST reflect the brand that the API Hub supports (see Logo below). Issuer The issuer value from your API Hub's well-known discovery document. Description A short description of your institution's Open Finance offering. Logo Your institution's logo for this API Hub instance (see Logo and Branding below). Account Type The account type(s) supported by this server: Retail , SME , or Corporate (see Account Types below). The logo you provide MUST match the brand that the API Hub supports. If your institution operates multiple API Hubs — for example, one for retail banking and one for business banking — each server entry MUST use the logo corresponding to that specific brand. This ensures that TPPs and end users see the correct branding during consent and authorisation journeys. Each server MUST indicate the account type(s) it supports. This allows TPPs to identify which server to use when requesting access to a specific category of accounts. Account Type Description Retail Personal and individual customer accounts. SME Small and medium enterprise accounts. Corporate Corporate and institutional accounts. An institution MAY register multiple servers if it operates separate API Hubs for different account types or brands. A server acts as the parent for one or more API Resources . Each API resource entry associates a specific API family (e.g. banking data sharing, payment initiation) with the scopes your implementation supports. TPPs retrieving your directory entry will see both the server endpoints and the list of API resources, giving them everything they need to dynamically register and call your APIs. Next Steps Continue setting up your server Walkthrough Creating a Server Step-by-step walkthrough of registering your API Hub as a server in the Trust Framework Directory. Open → Sub-section API Resources What API resources are, how they relate to API families, and how to configure them on your server. Open →"
  },
  {
    "title": "Trust Framework — Sign Up",
    "path": "/tech/lfi-api-hub/trust-framework/user-sign-up",
    "category": "LFI Integration",
    "section": "Trust Framework",
    "description": "LFI · Trust Framework · Onboarding Sign Up 2 min read This guide walks through the steps a newly invited Organisation Admin or User must complete after receiving an invitation to…",
    "headings": [
      "Sign Up 2 min read",
      "Receive Onboarding Email",
      "Open the Registration Link",
      "Access the Sign-In Page",
      "Complete Registration",
      "Set Up Two-Factor Authentication",
      "Accept Terms of Acceptance",
      "Review and Sign the Document",
      "Check Your Request Status",
      "Log In to the Platform"
    ],
    "body": "LFI · Trust Framework · Onboarding Sign Up 2 min read This guide walks through the steps a newly invited Organisation Admin or User must complete after receiving an invitation to the Trust Framework platform. Receive Onboarding Email Once you have been invited, you will receive an email from the Al Tareq Trust Framework Sandbox . This email contains a registration link — keep it to hand before proceeding. Open the Registration Link Click on the registration link provided in the email. Access the Sign-In Page You will be redirected to the Trust Framework Sandbox sign-in page. Click Registration to begin the registration process. Complete Registration Fill in the required registration details and submit your request. Make sure the email address you register with exactly matches the email address you were invited with. Set Up Two-Factor Authentication Scan the QR code displayed on screen using Google Authenticator or another authenticator app of your choice. Enter the one-time code generated by the app to complete the setup. Accept Terms of Acceptance After successful registration, you will receive another email at your registered email address requesting you to review and accept the Terms of Acceptance from the Al Tareq Platform. Review and Sign the Document Open the Terms of Acceptance document and electronically sign it. Check Your Request Status Return to the Trust Framework Sandbox portal and check the status of your registration request. Log In to the Platform Once the process is completed, you will be able to log in to the Trust Framework Sandbox and access the resources your role permits."
  },
  {
    "title": "Update Consent by ID",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Update Consent by ID",
    "headings": [],
    "body": ""
  },
  {
    "title": "Update Payment Log Entry",
    "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id",
    "category": "LFI Integration",
    "section": "API Hub",
    "description": "API Hub — Update Payment Log Entry",
    "headings": [],
    "body": ""
  },
  {
    "title": "User Experience Evidence",
    "path": "/tech/lfi-api-hub/production/testing-certification/user-experience",
    "category": "LFI Integration",
    "section": "Production",
    "description": "🕒 2 minute read User Experience Evidence ::: info Coming soon This page will detail the user experience evidence required for certification. :::",
    "headings": [
      "User Experience Evidence"
    ],
    "body": "🕒 2 minute read User Experience Evidence ::: info Coming soon This page will detail the user experience evidence required for certification. :::"
  },
  {
    "title": "Validate a Consent",
    "path": "/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate",
    "category": "LFI Integration",
    "section": "Overview",
    "description": "Overview — Validate a Consent",
    "headings": [],
    "body": ""
  },
  {
    "title": "Validate Consent Before Creation",
    "path": "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
    "category": "LFI Integration",
    "section": "Consent Events",
    "description": "Consent Events — Validate Consent Before Creation",
    "headings": [],
    "body": ""
  },
  {
    "title": "Variable Defined Schedule - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Variable Defined Schedule · UX Variable Defined Schedule — User Experience 4 min read When a customer is redirected to you to authorize a Variable…",
    "headings": [
      "Variable Defined Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Variable Defined Schedule · UX Variable Defined Schedule — User Experience 4 min read When a customer is redirected to you to authorize a Variable Defined Schedule payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that a pre-defined series of payments will be made, each on a specific date and up to a variable maximum amount. The page must collect the customer's explicit and informed consent, and it must accurately reflect the key details of the consent (payee, the complete list of scheduled payment dates and the maximum amount for each, etc.) The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Variable Defined Schedule — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Multi-Payments · Variable Defined Schedule Variable Defined Schedule — API Guide 14 min read Variable Defined Schedule lets a TPP initiate a…",
    "headings": [
      "Variable Defined Schedule — API Guide 14 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Matching the PII against the consent",
      "Response",
      "Error responses"
    ],
    "body": `LFI · Banking · Service Initiation · Multi-Payments · Variable Defined Schedule Variable Defined Schedule — API Guide 14 min read Variable Defined Schedule lets a TPP initiate a series of domestic payments on a pre-agreed set of specific dates , where each scheduled entry carries its own amount , from a customer's account at your LFI via the API Hub. The TPP supplies an explicit schedule at consent time — each PaymentExecutionDate paired with the amount due on that date — and the customer authorises the full schedule once. On each scheduled date the TPP submits one payment without re-authorisation. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every scheduled payment under the consent from creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Variable Defined Schedule Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor, and matching the payment-time PII against the consent. Before implementing Variable Defined Schedule, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Variable Defined Schedule advertised — ApiMetadata.VariableDefinedSchedule.Supported is set to true on your authorisation server entry in the Trust Framework. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules — standardVersion , Initiation.DebtorAccount , BaseConsentId , CurrencyRequest , payment-type support, PII conformance, creditor checks — is enumerated in Variable Defined Schedule Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. The end-to-end flow is: Read the kid from the JWE protected header and look up the matching Enc1 private key Decrypt the JWE → recover the inner JWS Decode the JWS payload (signature verification is optional — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit) Validate the decoded payload against the consent-time PII schema — AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII in uae-api-hub-consent-manager-openapi.yaml . additionalProperties: false is set at every level, so any unexpected field fails validation Happy-path snippet: For the per-step deep dive — kid lookup conventions, key import options, the optional JWS signature verification, building the ajv / jsonschema validator with all $ref schemas registered — see How to Decrypt`
  },
  {
    "title": "Variable Defined Schedule — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-defined-schedule/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Variable Defined Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Variable Defined Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Variable Defined Schedule — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Variable On Demand - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Variable On Demand · UX Variable On Demand — User Experience 4 min read When a customer is redirected to you to authorize a Variable On Demand…",
    "headings": [
      "Variable On Demand — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Variable On Demand · UX Variable On Demand — User Experience 4 min read When a customer is redirected to you to authorize a Variable On Demand payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that multiple payments of varying amounts will be made at any time of the TPP's choosing. The page must collect the customer's explicit and informed consent, and it must accurately reflect the key details of the consent (payee, the maximum amount per individual payment, etc.) The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Variable On Demand — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Multi-Payments · Variable On Demand Variable On Demand — API Guide 17 min read Variable On Demand lets a TPP initiate multiple domestic…",
    "headings": [
      "Variable On Demand — API Guide 17 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor list",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Matching the PII against the consent",
      "Validating an open-beneficiary creditor at payment time",
      "Duplicate-in-flight check"
    ],
    "body": `LFI · Banking · Service Initiation · Multi-Payments · Variable On Demand Variable On Demand — API Guide 17 min read Variable On Demand lets a TPP initiate multiple domestic payments at a variable amount from a customer's account at your LFI via the API Hub. The customer authorises the consent once — approving the per-payment maximum and periodic spend limits — and the TPP can then submit individual payments on-demand, each with its own amount, without re-authorisation. The consent may fix a list of up to ten allowed creditors or leave the creditor list open (the "open beneficiaries" model), in which case the TPP supplies the creditor fresh on each payment. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every payment under the consent from creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Variable On Demand Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor list (or confirming it is open), matching the payment-time PII against the consent, and applying the duplicate-in-flight check that is specific to on-demand consent types. Before implementing Variable On Demand, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Variable On Demand beneficiary models advertised — For each beneficiary model you support, the corresponding flag MUST be set to true on your authorisation server entry in the Trust Framework: ApiMetadata.VariableOnDemand.SingleBeneficiarySupported (consents carrying exactly 1 creditor), ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported (consents carrying 2–10 creditors), and/or ApiMetadata.VariableOnDemand.OpenBeneficiariesSupported (consents that omit Initiation.Creditor ). A consent for a model the LFI has not advertised MUST be rejected at consent validation. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules — standardVersion , Initiation.DebtorAccount , BaseConsentId , CurrencyRequest , beneficiary-model support, PII conformance, creditor checks — is enumerated in Variable On Demand Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor list ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. The end-to-end flow is: Read the kid from the JWE protected header and look up the matching Enc1 private key Decrypt the JWE → recover the inner JWS Decode the JWS payload (signature verification is optional — the outer Ozone Connect request is itself a JWS that the API Hub has`
  },
  {
    "title": "Variable On Demand — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Variable On-Demand — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-on-demand/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Variable On-Demand Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here?…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Variable On-Demand Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Variable Periodic Schedule - User Experience",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "Banking · Service Initiation · Variable Periodic Schedule · UX Variable Periodic Schedule — User Experience 4 min read When a customer is redirected to you to authorize a Variable…",
    "headings": [
      "Variable Periodic Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Variable Periodic Schedule · UX Variable Periodic Schedule — User Experience 4 min read When a customer is redirected to you to authorize a Variable Periodic Schedule payment consent through Open Finance, you must present an Authorization Page that clearly explains the payment the customer is authorizing — that recurring payments of varying amounts will be made at a set frequency. The page must collect the customer's explicit and informed consent, and it must accurately reflect the key details of the consent (payee, the maximum amount per payment, payment frequency, etc.) The examples and interactive wireframes provided below define the expected structure, content, and behavior of the Authorization Page and must be followed. While you may adapt visual elements such as color palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown. The representation of AlTareq (including logos, naming, and action buttons) must be preserved at all times. The customer must be able to clearly understand what payment they are authorizing and that the authorization is part of the AlTareq ecosystem. Your Authorization Page must be submitted as part of CX certification prior to production. Any material changes to a production Authorization Page must also be resubmitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Variable Periodic Schedule — API Guide",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · Multi-Payments · Variable Periodic Schedule Variable Periodic Schedule — API Guide 14 min read Variable Periodic Schedule lets a TPP initiate…",
    "headings": [
      "Variable Periodic Schedule — API Guide 14 min read",
      "Decrypting and validating the PII",
      "Validating the Creditor",
      "Validating the DebtorAccount",
      "Returning the validate response",
      "After the consent is authorized",
      "Common request headers",
      "Request body",
      "Reading the PII at payment time",
      "Matching the PII against the consent",
      "Response",
      "Error responses"
    ],
    "body": `LFI · Banking · Service Initiation · Multi-Payments · Variable Periodic Schedule Variable Periodic Schedule — API Guide 14 min read Variable Periodic Schedule lets a TPP initiate a recurring series of domestic payments at a variable amount on a regular period (e.g. weekly, monthly, quarterly) from a customer's account at your LFI via the API Hub. The TPP supplies the period, the overall date range, and the per-period maximum amount at consent time, and the customer authorises the full periodic schedule once. In each period the TPP submits one payment without re-authorisation — the Hub enforces at-most-one execution per period and that the submitted amount does not exceed the consent-time per-period maximum. Payments run on AANI as the primary rail with UAEFTS as the fallback. This guide covers the Ozone Connect endpoints your LFI MUST implement so the Hub can serve every periodic payment under the consent from creation through to execution and status retrieval. The behavioural rules for each endpoint — validation conditions, error mappings, post-execution lifecycle — are in the Variable Periodic Schedule Requirements . This guide covers the request and response shape of each endpoint, with code walkthroughs for the parts that need them: decrypting the PII, validating the creditor, and matching the payment-time PII against the consent. Before implementing Variable Periodic Schedule, ensure the following are in place: API Hub onboarded — Your API Hub instance is provisioned and your environment-specific configuration is complete. Enc1 key pair generated and registered — The TPP encrypts PII to your LFI's Enc1 public key . Your LFI MUST hold the corresponding private key and be able to look it up by kid . Consent Journey implemented — The Consent Journey API Guide MUST be implemented first. A payment cannot be initiated without an authorized consent. Ozone Connect connectivity verified — Bidirectional mTLS connectivity is confirmed between the API Hub and your Ozone Connect base URL. See Connectivity & Certificates . Variable Periodic Schedule advertised — ApiMetadata.VariablePeriodicSchedule.Supported is set to true on your authorisation server entry in the Trust Framework. When a TPP creates a payment consent, the API Hub calls your POST /consent/action/validate endpoint before the consent is created. Your LFI MUST validate the consent and respond with data.status: "valid" or data.status: "invalid" . An invalid response prevents the consent being created and the TPP receives an error. The full set of validation rules — standardVersion , Initiation.DebtorAccount , BaseConsentId , CurrencyRequest , payment-type support, PII conformance, creditor checks — is enumerated in Variable Periodic Schedule Requirements — Consent Validation . The two parts that need a code walkthrough are decrypting the PII and validating the creditor ; both are covered below. Decrypting and validating the PII The consent.PersonalIdentifiableInformation field arrives as a JWE compact string encrypted by the TPP to your LFI's Enc1 public key. The API Hub passes it through unchanged — it cannot inspect the contents and has not validated them. Decryption, schema validation, and field-level checks are entirely the LFI's responsibility. The end-to-end flow is: Read the kid from the JWE protected header and look up the matching Enc1 private key Decrypt the JWE → recover the inner JWS Decode the JWS payload (signature verification is optional — the outer Ozone Connect request is itself a JWS that the API Hub has already verified, so the PII cannot have been tampered with in transit) Validate the decoded payload against the consent-time PII schema — AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII in uae-api-hub-consent-manager-openapi.yaml . additionalProperties: false is set at every level, so any unexpected field fails validation Happy-path snippet: For the per-step deep dive — kid lookup conventions, key import options, the optional JWS si`
  },
  {
    "title": "Variable Periodic Schedule — Functional Certification Submission",
    "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-periodic-schedule/submission",
    "category": "LFI Integration",
    "section": "Production",
    "description": "Functional Certification · Variable Periodic Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Variable Periodic Schedule Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Variable Periodic Schedule — Requirements",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Verifying the TPP JWS Signature",
    "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature",
    "category": "LFI Integration",
    "section": "Banking",
    "description": "LFI · Banking · Service Initiation · PII · API Guide Verifying the TPP JWS Signature 2 min read The PersonalIdentifiableInformation field is embedded within a request that the API…",
    "headings": [
      "Verifying the TPP JWS Signature 2 min read",
      "Step 1 — Discover the TPP's JWKS",
      "Step 2 — Verify the JWS",
      "Claims to validate"
    ],
    "body": "LFI · Banking · Service Initiation · PII · API Guide Verifying the TPP JWS Signature 2 min read The PersonalIdentifiableInformation field is embedded within a request that the API Hub has already verified was signed by the TPP. The outer JWS signature confirms that the PII was submitted by the authenticated TPP and has not been modified in transit. Verifying the inner JWS signature on the PII payload is therefore not required , but LFIs may choose to implement it as a defence-in-depth measure. You may want to verify the TPP's JWS signature on the PII if: Your security policy requires independent verification of all signed payloads, regardless of upstream validation. You want to confirm the specific TPP identity that constructed the PII (available in the iss and sub claims). You are building an audit trail that requires cryptographic proof tied to the TPP's signing key. The inner JWS (the result of decrypting the JWE) is signed by the TPP using their signing key. The JWS header contains the kid of the TPP's signing key, and the iss / sub claims identify the TPP's client_id . Step 1 — Discover the TPP's JWKS The TPP's public signing keys are published through the Trust Framework directory. You can resolve the TPP's JWKS URI using the o3-caller-software-statement-id header from the inbound request: Step 2 — Verify the JWS Claims to validate If you verify the JWS, you SHOULD also validate the following claims: Claim Validation iss Must match the TPP's client_id (available in the o3-caller-client-id request header) sub Must match the TPP's client_id aud Must contain your LFI's issuer identifier exp Must not be expired iat Must be in the past jti Record for replay detection if required by your security policy"
  },
  {
    "title": "News",
    "path": "/news",
    "category": "News",
    "section": "Updates",
    "description": "Section · Articles ISSUE · Articles & press. entries indexed A running log of industry coverage, regulatory milestones and press releases tracking the UAE Open Finance programme —…",
    "headings": [
      "Articles & press.",
      "Nothing yet in “ ”"
    ],
    "body": 'Section · Articles ISSUE · Articles & press. entries indexed A running log of industry coverage, regulatory milestones and press releases tracking the UAE Open Finance programme — and the global Open Banking scene it’s measured against. Sort Newest first Oldest first By source (A–Z) No match Nothing yet in “ ” Try a different category or clear the filter. Clear filter → 1" class="ed-pager" aria-label="Pagination"> ← Previous Next →'
  },
  {
    "title": "Accessing the Document Repository",
    "path": "/doc-repository/how-to-access",
    "category": "Participants",
    "section": "Documents",
    "description": `browse the Document Repository , how to sign in against the production Trust Framework directory, and who may view an organisation's protected and private documents." /> The…`,
    "headings": [
      "Who can read them",
      "Managing shares",
      "Qualifying roles",
      "Organisation list",
      "Public documents",
      "Protected documents",
      "Private documents"
    ],
    "body": `browse the Document Repository , how to sign in against the production Trust Framework directory, and who may view an organisation's protected and private documents." /> The directory itself is open: you can search and filter participants without signing in. Selecting an organisation opens its documents page, at which point you are asked to sign in. Once signed in, an organisation's documents appear in up to three groups: Public documents — visible to any signed-in participant; for example trade licences and Central Bank licences. Protected documents — visible to the owning organisation and to any other organisation it has chosen to share with. The protected tab is hidden if neither applies to you. Private documents — visible only to people authorised within that organisation. The private tab is hidden if you do not have access. production UAE Open Finance Trust Framework directory using OpenID Connect." tone="surface" > When you open an organisation's documents page you are redirected to the directory to sign in with your directory account, then returned to the page. You need only an account in the production Trust Framework directory — there is no separate repository login. A signed-in session lasts approximately one hour, after which you are asked to sign in again. Who can read them The owning organisation's administrators and Active PBCs — the same people who can see its private documents. Any member of an organisation the owner has shared with. Unlike private access, this is not limited to privileged roles — once an organisation is granted, all of its members can read the documents. Nebras operators , who may view every organisation's documents. Managing shares A privileged member of the owning organisation (administrator or Active PBC), or a Nebras operator, manages the share list from the Protected tab — adding or removing organisations at any time. Sharing is granted per whole organisation and covers all of the owner's protected documents. Organisations that have only been granted access cannot themselves change who else can see the documents, and only Nebras may upload them. Qualifying roles Organisation administrators of that organisation. Holders of the Principal Business Contact (PBC) contact role, where the role is Active . Access is assessed per organisation: a PBC or organisation administrator role in one organisation only grants access to that organisation's private documents, not those of any other organisation. Nebras operators may view every organisation's documents. docs.nebras-open-finance.com . It may be called directly — for example to script downloads." tone="surface" > Organisation list A request to https://docs.nebras-open-finance.com/ returns the list of all production organisations as JSON, each with its identifier and links to its public and private documents. This is the same list the directory page shows, and it requires no sign-in. Public documents https://docs.nebras-open-finance.com/{id}/public lists the public documents for a single organisation, where {id} is that organisation's identifier from the root list. Appending a file name to the path returns the file itself. Public documents are open. Protected documents https://docs.nebras-open-finance.com/{id}/protected lists — and serves — that organisation's protected documents. This endpoint is gated: you must be signed in and either authorised for the organisation (an administrator or PBC), a member of an organisation it has shared with, or a Nebras operator. The owner's share list is managed at https://docs.nebras-open-finance.com/{id}/grants . Private documents https://docs.nebras-open-finance.com/{id}/private lists — and serves — that organisation's private documents. This endpoint is gated: you must be signed in and authorised for the organisation (an administrator or PBC, as above), or a Nebras operator. Without access it returns an authentication or permission error rather than the documents.`
  },
  {
    "title": "Document Repository",
    "path": "/doc-repository/",
    "category": "Participants",
    "section": "Documents",
    "description": "Directory · Participants · Documents Document Repository Public documentation from Licensed Financial Institutions and Third-Party Providers participating in UAE Open Finance. How…",
    "headings": [
      "Document Repository",
      "Loading organisations…",
      "Could not load organisations",
      "No organisations found"
    ],
    "body": 'Directory · Participants · Documents Document Repository Public documentation from Licensed Financial Institutions and Third-Party Providers participating in UAE Open Finance. How Accessing the Document Repository works → · ⧖ Loading organisations… ⚠ Could not load organisations · Search: " " 0" class="ed-kb-grid"> Live since → ⌕ No organisations found No matches for " " . Try adjusting your search or filter criteria.'
  },
  {
    "title": "API Response Time Policy",
    "path": "/policy/api-response-time",
    "category": "Policy",
    "section": "Standards",
    "description": "The subject of this policy is the request as the TPP experiences it — not any single hop within it. A request that is fast on one leg and slow on another is a slow request, and is…",
    "headings": [
      "Out of scope",
      "Endpoints in scope (examples)",
      "Nebras owns the API Hub segment",
      "The LFI owns the Ozone Connect segment",
      "When the target is persistently missed",
      "Severity definitions",
      "Obligations during a P1 or P2 degradation",
      "Post-incident review"
    ],
    "body": `The subject of this policy is the request as the TPP experiences it — not any single hop within it. A request that is fast on one leg and slow on another is a slow request, and is measured as such. A request is in scope where the API Hub calls Ozone Connect to serve it. Requests the API Hub answers entirely on its own are out of scope, because there is no LFI segment for the end-to-end figure to say anything about. Out of scope Requests the API Hub serves without calling Ozone Connect — consent reads, authorisation, and token endpoints among them. The Hub's performance on these is managed by Nebras outside this policy. Sandbox or non-production environments The public internet between the TPP and the API Hub, and anything happening inside the TPP's own systems Time taken by the LFI to complete fraud, sanctions, and compliance screening of a payment after the API response has been returned Time taken by the underlying payment rail to process and settle a payment (for example Aani), governed by the applicable scheme rules Time a customer spends completing authentication at the LFI — measured separately under the Consent Journey requirements Nothing else is excluded. In particular, there is no exclusion for time spent calling an external service — whether that call is made by the API Hub or by the LFI, and whether the service is the Trust Framework, a core banking platform, or any other dependency. Dependency latency is response time. p95 response time of 500 ms or better . A single target keeps the policy simple to reason about, and reflects the reality that customers expect comparable responsiveness whether they are checking a balance, retrieving transactions, confirming a payee, or initiating a payment consent." tone="surface" > Endpoints in scope (examples) Bank Data Sharing — GET /accounts , GET /accounts/{accountId}/balances , GET /accounts/{accountId}/transactions , GET /accounts/{accountId}/standing-orders , GET /accounts/{accountId}/beneficiaries , and other account-scoped reads Service Initiation — POST /payments , POST /payment-consents , POST /payment-consents/{consentId}/file , POST /payment-consents/{consentId}/refund , GET /payments/{paymentId} Confirmation of Payee — POST /customers/action/cop-query Products and Leads — GET /products , POST /leads Insurance, FX, Account Opening, ATM, User Operations, and Consent Events — all endpoints under the corresponding API families This target aligns with the 500 ms average response time published in the Availability, Performance and Usage Benchmarks standard. Holding each endpoint to this p95 figure — rather than only an average — ensures the customer experience remains consistent across the long tail of requests, not just on average. Time to Last Byte (TTLB) at the API Hub resource server: the clock starts when the API Hub receives the first byte of the TPP's request, and stops when the last byte of the response is written back to the TPP. Everything in between is inside the window." tone="cream" > The request arrives at the API Hub resource server ( rs1.{lfiCode}.apihub.openfinance.ae ). Measurement begins here, which is why the public internet between the TPP and the Hub falls outside the window. mTLS and DPoP verification, access token validation, consent validation, OpenAPI schema enforcement, and request enrichment with the customer, account, and TPP information the LFI needs. Any call the Hub makes to an external service while handling the request — including the Trust Framework — is inside the window. Both network legs, plus everything Ozone Connect does in between. The LFI's own onward calls are inside the window too — to its core banking platform, to internal authorisation or decisioning services, and to any external service it depends on. No portion of the elapsed time is deducted for a slow dependency. Response normalisation and error mapping, until the last byte is written to the TPP. The measurement is taken as observed . There is no mechanism for either Nebra`
  },
  {
    "title": "Changes to Published Documentation Policy",
    "path": "/policy/changes-to-published-content",
    "category": "Policy",
    "section": "Standards",
    "description": 'TPP — Open Finance Standards and LFI — Integration Guide . Read alongside the Version Management Policy ." /> This policy defines how published documentation may be changed for…',
    "headings": [
      "Errata example",
      "Consent State Transitions"
    ],
    "body": 'TPP — Open Finance Standards and LFI — Integration Guide . Read alongside the Version Management Policy ." /> This policy defines how published documentation may be changed for TPP — Open Finance Standards and LFI — Integration Guide , ensuring that every post-publication change is traceable, auditable, and surfaced to readers. For any published documentation version, content may only be changed through a formally published Errata . This applies to all normative and implementation-impacting content in published versions Any correction or clarification made after publication must be traceable to a specific Errata identifier The affected page or section should clearly display that it has been modified by Errata Errata example Consent State Transitions Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Original content that now no longer applies as the Errata clearly says their is new content that supersedes this. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. For non-published versions (for example v3.1-rc or v3.1-rc-final ), content may be updated without issuing an Errata. These versions remain draft / pre-publication artifacts Normal review and approval controls still apply Once the version is published, post-publication changes must follow the Errata process Nebras is responsible for enforcing this policy across published documentation baselines for both TPP and LFI documentation sets.'
  },
  {
    "title": "Major Version Deprecation Policy",
    "path": "/policy/lfi-deprecation",
    "category": "Policy",
    "section": "Standards",
    "description": "When dual-running does not apply Where an LFI implements the API for the first time, only a single version is required initially. There is no expectation to support dual-running…",
    "headings": [
      "When dual-running does not apply",
      "How dual-running works",
      "Milestone summary"
    ],
    "body": 'When dual-running does not apply Where an LFI implements the API for the first time, only a single version is required initially. There is no expectation to support dual-running before a prior version exists. There is also no expectation for LFIs to implement dual-running or formal deprecation processes for: Minor (non-breaking) API version updates Errata or corrective changes UI components or presentation-layer changes Downstream system or internal implementation changes These changes are expected to be backward compatible and managed without requiring concurrent version support. must operate both the prior and new version concurrently for the duration of the deprecation window." tone="surface" > How dual-running works Deploy two active versions of their API Hub implementation simultaneously (e.g. V1.x and V2.0) Route incoming API requests to the correct implementation based on the version the TPP requested — currently via the o3-api-uri header Ensure each implementation is independently maintained and supported, with no cross-version dependencies that could cause instability Both implementations must remain fully functional and compliant with their respective standards throughout the dual-running period. An LFI running V1.2 and V2.1 simultaneously would route a request to https://api.bank.ae/open-finance/v1.2/accounts to the V1.2 implementation, and a request to https://api.bank.ae/open-finance/v2.1/accounts to the V2.1 implementation. Stand up the new version — The LFI deploys and validates the new major version of their API Hub implementation in production. Validate readiness — The LFI confirms the new version is functioning correctly, including end-to-end consent flows, data sharing, and service initiation (as applicable). Formal communication via Nebras — Nebras issues a formal ecosystem-wide communication informing all TPPs that the new version is available, that they are expected to begin migrating, and that the prior version will be deprecated in accordance with this policy. From the date of the formal communication, LFIs must actively monitor the creation of new consents across both versions. At the 3-month mark , LFIs must report to Nebras on the status of TPP migration, specifically identifying any TPPs that are still raising new consents on the prior version. Nebras will use this information to engage directly with non-migrated TPPs. A further 2-month window is provided for remaining TPPs to complete migration. At the 5-month mark , LFIs must again report to Nebras identifying any TPPs still raising new consents on the prior version. If no new consents are being raised on the prior version at this point, the LFI may request Nebras approval to proceed to Phase 4. With Nebras approval, the LFI may restrict the creation of new consents on the prior version. This means: Existing consents on the prior version remain valid and must continue to be honoured No new consent journeys can be initiated against the prior version TPPs with active consents on the prior version may continue to exercise those consents until they expire From the point at which new consent creation is restricted, the prior version must remain operational for a further 12 months , providing sufficient time for all existing consents on the prior version to expire naturally. After this 12-month period, and once Nebras confirms that no active consents remain on the prior version, the LFI may decommission the prior version entirely. Milestone summary Where TPPs have not completed migration to the new version by the 6-month mark from the date of formal communication, Nebras will take an active role in managing the deprecation. Directly engaging with non-migrated TPPs to understand technical or operational blockers Setting individual migration deadlines for non-migrated TPPs, with formal written notice Escalating persistent non-compliance to the relevant regulatory authority where appropriate Coordinating with the LFI to ensure migration support is availabl'
  },
  {
    "title": "Open License and Contribution Agreement",
    "path": "/policy/open-license-contribution-agreement",
    "category": "Policy",
    "section": "Standards",
    "description": 'Agreement to these terms is mandatory before submitting any Contribution. " /> Accesses or implements the UAE Open Finance Standards Contributes to the development of the…',
    "headings": [
      "It establishes",
      "General principles",
      "Contributor representations and warranties",
      "2. No conflicting obligations"
    ],
    "body": 'Agreement to these terms is mandatory before submitting any Contribution. " /> Accesses or implements the UAE Open Finance Standards Contributes to the development of the Standards Participates in consultations, working groups, or technical discussions It establishes The open copyright license granted by the Central Bank of the United Arab Emirates (CBUAE) The rights and obligations of Contributors The intellectual property framework governing Contributions Confidentiality and governing law provisions Agreement to these terms is mandatory before submitting any Contribution. The UAE Open Finance Standards, specifications, documentation, and related materials (the "Standards") All Contributions submitted now or in the future All draft and final versions of the Standards Participation in working groups, consultations, and development activities Copyright © 2024 — Central Bank of the United Arab Emirates CBUAE grants a non-exclusive, royalty-free, worldwide copyright license to any contributor, developer, implementer, or interested party to: Reproduce Prepare derivative works Distribute Perform Display the UAE Open Finance Standards solely for the purpose of developing and implementing the Standards. Attribution must be made to CBUAE as the source of the material. Such attribution must not imply endorsement by CBUAE. The Standards are provided "as is", without warranty of any kind, express or implied, including but not limited to: Merchantability Fitness for a particular purpose Non-infringement CBUAE shall not be liable for any claim, damages, or other liability arising from: Use of the Standards Implementation of the Standards Contributions made by any party The Standards, amendments, and Contributions are considered a "Collective Work" under UAE Federal Decree-Law No. 38/2021 , which governs copyright protection for innovative literary, artistic, and scientific creations in the United Arab Emirates. General principles CBUAE makes the Standards available for implementation without fee. Any feedback, submission, suggestion, upload, or other material related to the Standards (unless clearly marked "Not a Submission" or "Not a Contribution") constitutes a "Contribution." By submitting a Contribution, the Contributor agrees to the terms below. Contributor representations and warranties The Contributor represents and warrants that: Contributions are made by employees within the scope of employment, or Independent contractors under written IP assignment obligations The employer has authorized the Contribution, waived relevant rights, or Has entered into a separate agreement with CBUAE 2. No conflicting obligations Contributor has no third-party obligations that would prevent: Participating in working groups Making Contributions Granting rights in intellectual property'
  },
  {
    "title": "Ozone Connect Availability Policy",
    "path": "/policy/ozone-connect-availability",
    "category": "Policy",
    "section": "Standards",
    "description": "Out of scope Sandbox or non-production environments Downtime caused by the API Hub, the TPP, or the broader internet Downtime caused by upstream payment rails (for example Aani)…",
    "headings": [
      "Out of scope",
      "How unavailability is defined",
      "When the target is missed",
      "Severity definitions",
      "LFI obligations during an incident",
      "Post-incident review"
    ],
    "body": `Out of scope Sandbox or non-production environments Downtime caused by the API Hub, the TPP, or the broader internet Downtime caused by upstream payment rails (for example Aani) where the issue is demonstrably outside the LFI's control 99.5% availability across its Ozone Connect endpoints, equating to no more than approximately 3 hours and 39 minutes of downtime per month — enough headroom to absorb planned releases and genuinely unforeseen issues, while still delivering a reliable service to customers and TPPs." tone="surface" > This target aligns with the end-to-end availability benchmark published in the Availability, Performance and Usage Benchmarks standard. Because the API Hub itself is engineered for very high availability, the LFI's Ozone Connect availability is the dominant factor in the end-to-end figure. How unavailability is defined A request to Ozone Connect is treated as a failure where: Ozone Connect returns a 5xx response The TLS connection cannot be established The response is not received within the API Hub's upstream timeout Ozone Connect rejects valid Hub traffic below the capacity the LFI has agreed to sustain Client errors (4xx responses attributable to the TPP or to an invalid request) are not counted against availability. Partial outages count. An outage affecting only POST /payments , only one API family, or only a subset of TPPs is still an outage for the purposes of this policy. Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a live proving period with one or more TPPs. During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production The 99.5% availability target defined in this policy must be demonstrably met over the proving period Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live. LFIs are expected to review their own Ozone Connect availability. When the target is missed Where an LFI falls below the 99.5% target in any calendar month, or where the monitoring surfaces a pattern of repeated incidents, Nebras will engage directly with the LFI. This engagement may include: A formal review meeting between Nebras and the LFI's engineering and operations leadership A written remediation plan, agreed with Nebras, setting out specific actions, owners, and target dates Enhanced reporting — typically weekly — until the LFI is consistently meeting the target Escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it Nebras will act proportionately. A single month below target that is attributable to a well-understood, remediated incident will normally require only a post-incident review. Repeated shortfalls, or shortfalls without a credible remediation plan, will attract progressively firmer engagement. Severity definitions LFI obligations during an incident For P1 incidents, acknowledgement is expected within 15 minutes of the LFI becoming aware. For P2 , within 1 hour . For P3 , within the next business day. Nebras operates a dedicated incident channel for each LFI. Incidents are not to be reported by email alone. For P1 , updates at least every 30 minutes until service is restored. For P2 , at least every 2 hours . Only once service has been stable for a reasonable observation period (typically 15 minutes for P1, 30 minutes for P2). Nebras takes responsibility for cascading incident information to affected TPPs through its own communication channels. LFIs are not expected to communicate directly with TPPs during incidents. Post-incident review For every P1 incident — and for any P2 incident that recurs within 30 days — the LFI is ex`
  },
  {
    "title": "Ozone Connect Data Quality Policy",
    "path": "/policy/ozone-connect-data-quality",
    "category": "Policy",
    "section": "Standards",
    "description": "response payloads of Ozone Connect endpoints that return data — that is, endpoints whose role is to provide information back to the TPP about customers, accounts, products, or…",
    "headings": [
      "In scope (examples)",
      "Out of scope",
      "Accuracy",
      "Real-time data",
      "Forward commitment",
      "What is monitored",
      "When delivery falls short"
    ],
    "body": `response payloads of Ozone Connect endpoints that return data — that is, endpoints whose role is to provide information back to the TPP about customers, accounts, products, or services." tone="cream" > In scope (examples) Bank Data Sharing reads ( GET /accounts , GET /accounts/{accountId}/balances , GET /accounts/{accountId}/transactions , and related endpoints) Products and Leads reads ( GET /products , and the data returned after lead creation) Insurance policy and related data reads Any future Ozone Connect endpoint whose primary purpose is to return data about a customer, account, product, or service Out of scope Action and initiation endpoints that do not return domain data (for example POST /payments , POST /customers/action/cop-query , and similar). These are governed by the Availability Policy and the API Response Time Policy , not this one. Internal system data that is not part of the published Ozone Connect OpenAPI specifications Where a data-returning endpoint is involved in a service initiation flow (for example returning payment status data), the data quality expectations in this policy apply to the data fields in the response. Fields marked as required in the Ozone Connect OpenAPI specification must be delivered on every response where the endpoint returns data for the relevant resource A required field is required because TPPs and downstream use cases cannot function reliably without it Missing or null required fields are treated as a data quality defect regardless of the underlying cause in the LFI's systems Fields that are optional in the spec must be delivered whenever the underlying data exists in the LFI's systems and can be mapped to the specification "Exists and can be mapped" means the data is held by the LFI in some form, and there is a reasonable mapping from the LFI's internal representation to the specified field LFIs are not expected to invent data they do not hold, but are expected to deliver data they do hold Accuracy Data returned on in-scope responses must match the LFI's system of record. Values that are present must be correct — amounts, identifiers, dates, statuses, names, and every other specified field. Field values — the value returned is the value held in the LFI's systems Units and formats — currency, precision, date-time format, status enumerations, and identifiers conform to the specification Relationships between fields — values that relate to one another remain consistent (for example available balance consistent with booked and pending movements) Defects in accuracy are treated with the same severity as missing required fields. Real-time data Data returned on in-scope responses must reflect the current state of the LFI's systems at the time of the request. TPPs and their customers act on what they see; stale data breaks that trust. Data must be sourced from systems that reflect the current position of the customer, account, product, or service Where caching is used in the LFI's implementation, it must be bounded such that the data returned remains current for the purpose of the endpoint End-of-day or overnight batch propagation is not acceptable for any in-scope field unless explicitly recorded in the Data Mapping Commitment and agreed with Nebras Where an LFI operates processes that cause transient divergence (for example end-of-day cutover windows), these must be disclosed to Nebras and communicated to TPPs through the standard incident and maintenance channels defined in the Availability Policy . Forward commitment LFIs are expected to progressively align their internal systems so that more optional fields can be delivered, more accurately, and more current, over time. The objective is for every LFI to converge on delivering the full specified data set, accurately and in real time, wherever the data realistically exists in the banking estate. As part of onboarding to the ecosystem, each LFI provides a Data Mapping Commitment that records, for each in-scope endpoint and field, whe`
  },
  {
    "title": "Policies",
    "path": "/policy/",
    "category": "Policy",
    "section": "Standards",
    "description": "Govern · Operate · Evolve Policies Governance and operational policies for participants in the UAE Open Finance ecosystem — Licensed Financial Institutions, Third-Party Providers,…",
    "headings": [
      "Policies",
      "No policies found"
    ],
    "body": 'Govern · Operate · Evolve Policies Governance and operational policies for participants in the UAE Open Finance ecosystem — Licensed Financial Institutions, Third-Party Providers, and the technology service providers that support them. · · Search: " " 0" class="ed-kb-grid"> · Updated → ⌕ No policies found No matches for " " . Try adjusting your search or filter criteria.'
  },
  {
    "title": "Secure Management of Keys and Credentials in UAE Open Finance",
    "path": "/policy/secure-management",
    "category": "Policy",
    "section": "Standards",
    "description": "mandatory and recommended practices for the secure management of cryptographic keys and credentials within the UAE Open Finance ecosystem — ensuring regulatory compliance,…",
    "headings": [
      "Key requirements"
    ],
    "body": 'mandatory and recommended practices for the secure management of cryptographic keys and credentials within the UAE Open Finance ecosystem — ensuring regulatory compliance, protecting organizational and user data, and maintaining trust across participants." :key-nums="keyNums" /> Generation, storage, use, rotation, revocation, and destruction of cryptographic keys and credentials Authentication, authorization, and token handling in Open Finance APIs and consent flows Integration with Key Management Systems (KMS) , Hardware Security Modules (HSMs) , and other cryptographic infrastructure Roles and responsibilities for LFIs, TPPs, and ecosystem participants Information Assurance Regulation and the CBUAE Open Finance guidelines ." tone="surface" > Key requirements Key lifecycle management — secure generation, storage, distribution, rotation, revocation, and destruction Protection of sensitive material — secret and private keys must be protected against unauthorized access, loss, or disclosure Auditing and logging — all key usage and lifecycle activities must be logged and auditable Certification and revocation — procedures to maintain trust across ecosystem participants LFIs and TPPs must implement these controls to ensure confidentiality, integrity, and availability of Open Finance systems. Use FIPS 140-3 certified HSMs for key generation, signing, encryption, and storage. Ensure centralized key management using modern KMS (on-premises or cloud) that supports UAE data governance and local control principles, such as data residency and access controls. Rotate transport and signing keys at least every 13 months or more frequently if mandated. Define clear policies for key expiration, recovery, and destruction . Maintain audit logs of all key usage. Use phishing-resistant, modern authentication methods: FIDO2 / Passkeys for customer authentication OAuth 2.0 + FAPI 2.0 for secure API access Mutual TLS (mTLS) for client-server authentication Ensure secure handling of credentials and tokens throughout consent and API flows. Implement role-based access control (RBAC) and separation of duties for key access. Limit key access to authorized personnel and system components only . LFIs may use Bring Your Own Key (BYOK) or Manage Your Own Key (MYOK) strategies to maintain control over sensitive key material while leveraging cloud infrastructure. Secure key and credential management is a regulatory requirement, operational imperative, and trust enabler in the UAE Open Finance ecosystem. By implementing hardware-backed cryptography, modern authentication standards, robust key lifecycle management, and strong access controls, LFIs and TPPs can: Protect user and organizational data Maintain regulatory compliance Enable secure, consented financial data sharing Foster trust and resilience across the Open Finance ecosystem ↗'
  },
  {
    "title": "Version Management Policy",
    "path": "/policy/version-management",
    "category": "Policy",
    "section": "Standards",
    "description": 'Live ." :key-nums="keyNums" /> This policy takes effect from V2.1 of the UAE Open Finance Standard. Standards, specifications, and documentation published prior to V2.1 —…',
    "headings": [
      "Capabilities not yet declared Live",
      "Version documentation",
      "UI adoption",
      "Compliance",
      "Review and updates"
    ],
    "body": 'Live ." :key-nums="keyNums" /> This policy takes effect from V2.1 of the UAE Open Finance Standard. Standards, specifications, and documentation published prior to V2.1 — including V2.0 and any earlier errata — are not governed by this policy. Breaking changes introduced before V2.1 do not constitute non-compliance. The stability guarantees set out in this policy — in particular, the restriction of breaking changes to major version releases and the scope constraints on errata — apply only to Live capabilities . A capability is Live when Nebras has formally declared it in production use within the UAE Open Finance ecosystem. Capabilities not yet declared Live Breaking changes MAY be introduced in minor versions or errata without requiring a major version increment The release cadence defined below continues to apply Once a capability is declared Live, all subsequent changes MUST comply with this policy in full Nebras is responsible for maintaining and publishing the register of Live capabilities. Vx.y , where x is the major version and y is the minor version." tone="cream" > MAY include breaking changes that are not backward compatible MUST NOT be released more frequently than every 18 months from the last major release MUST include a comprehensive record of all breaking changes, with migration guidance and a clear deprecation timeline for the prior major version MUST NOT include breaking changes MUST NOT be released more frequently than every 6 months from the previous release MAY include non-breaking enhancements such as additional optional fields, additional GET response fields, additional endpoints, or non-breaking changes to field types Version documentation Every major and minor version MUST be accompanied by: A complete change log covering all modifications since the previous version Implementer guidance describing how to adopt the new version For major versions, migration guidance for each breaking change UI elements MUST NOT rely on API versioning for core functionality Where UI behaviour depends on new data in a consent object, LFIs and TPPs MUST implement logic based on the presence of the data itself, not on the consent version If a new consent permission ReadStatements is added in V2.1, the UI SHOULD check whether ReadStatements is present on the consent rather than checking whether the consent version equals V2.1. UI adoption LFIs MAY adopt visual or branding changes from a future version before upgrading their API version. Example: new UI requirements published in V2.0 may be implemented while still serving API V1.2 Adoption of new UI elements requires successful Customer Experience (CX) certification When an LFI upgrades its API to a given version, the UI MUST also align with that version. UI enhancements MAY precede API version upgrades but MUST NOT lag behind them A standards version MAY only be declared published once it is fully available to TPPs via the API Hub. A release candidate (e.g. V1.2-rc ) MAY be issued ahead of official publication. Once a version is agreed but not yet delivered into the API Hub, it carries a -rc-final suffix to indicate fixed-but-not-yet-published state. Post-publication changes are limited to guidance clarifications or bug fixes, and MUST follow the Changes to Published Documentation Policy No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version Errata MUST NOT introduce breaking changes Errata MUST NOT introduce new functionality — additive enhancements MUST be delivered through a new minor version Compliance Nebras, LFIs, and TPPs are required to adhere to this policy. Nebras is responsible for maintaining the versioning scheme, publishing version artefacts, and coordinating with ecosystem participants on upcoming releases. Review and updates This policy will be reviewed periodically by Nebras to ensure alignment with industry best practice and the evolving UAE Open Finance ecosystem. Mate'
  },
  {
    "title": "Data-sharing overage rates by LFI",
    "path": "/pricing/lfi-rates/",
    "category": "Pricing",
    "section": "Commercial",
    "description": "AlTareq · Per‑LFI overage rates Data‑sharing overage rates by LFI Above the free per‑customer, per‑day threshold each LFI sets its own per‑call rate for continued data‑sharing…",
    "headings": [
      "Data‑sharing overage rates by LFI",
      "Reading overage rates from the directory",
      "Endpoint",
      "Where the value lives",
      "Reading the rate"
    ],
    "body": `AlTareq · Per‑LFI overage rates Data‑sharing overage rates by LFI Above the free per‑customer, per‑day threshold each LFI sets its own per‑call rate for continued data‑sharing requests. The rates below are read live from the Open Finance directory ( ApiMetadata.OverLimitFees ). LFIs that have not published a rate charge nothing above the threshold. ← Back to pricing Loading rates from the directory… Institution Rate per call above threshold Pull this yourself Reading overage rates from the directory The rates above come from ApiMetadata.OverLimitFees on each LFI’s account-information API resource, returned by the directory’s /participants endpoint. One call gives you the rate for every LFI. Endpoint Production GET https://data.directory.openfinance.ae/participants Sandbox GET https://data.sandbox.directory.openfinance.ae/participants Where the value lives participants[] .AuthorisationServers[] .ApiResources[] // ApiFamilyType === "account-information" .ApiMetadata.OverLimitFees // string in AED, e.g. "0.50" // missing or empty → 0 (free above threshold) Reading the rate Node.js Python const res = await fetch('https://data.directory.openfinance.ae/participants') const participants = await res.json() const rates = [] for (const org of participants) { for (const server of org.AuthorisationServers || []) { const ds = (server.ApiResources || []) .find(r => r.ApiFamilyType === 'account-information') if (!ds) continue const raw = ds.ApiMetadata?.OverLimitFees const aedPerCall = raw && String(raw).trim() !== '' ? Number(raw) : 0 rates.push({ server: server.CustomerFriendlyName || org.OrganisationName, aedPerCall, }) } } import requests resp = requests.get('https://data.directory.openfinance.ae/participants') participants = resp.json() rates = [] for org in participants: for server in org.get('AuthorisationServers') or []: ds = next( (r for r in (server.get('ApiResources') or []) if r.get('ApiFamilyType') == 'account-information'), None, ) if not ds: continue raw = (ds.get('ApiMetadata') or {}).get('OverLimitFees') aed_per_call = float(raw) if raw and str(raw).strip() != '' else 0 rates.append({ 'server': server.get('CustomerFriendlyName') or org.get('OrganisationName'), 'aed_per_call': aed_per_call, }) Cache the response. The directory is the source of truth, but rates change rarely — refreshing daily is plenty.`
  },
  {
    "title": "Pricing",
    "path": "/pricing/",
    "category": "Pricing",
    "section": "Commercial",
    "description": "AlTareq · Commercial and Pricing Model Pricing Pricing in UAE Open Finance is built on three clear streams: API Hub fees from Nebras for use of the platform, payment fees from the…",
    "headings": [
      "Pricing",
      "How the fee structure works",
      "API Hub fees",
      "Payment fees",
      "Data‑sharing fees above threshold",
      "Try a scenario",
      "Where this model comes from",
      "Fee caps are regulatory",
      "Fees follow successful calls",
      "All figures are VAT‑inclusive"
    ],
    "body": "AlTareq · Commercial and Pricing Model Pricing Pricing in UAE Open Finance is built on three clear streams: API Hub fees from Nebras for use of the platform, payment fees from the LFI that executes each transaction, and data‑sharing fees from the LFI once a customer’s usage passes a generous free threshold. This page walks through how each one is calculated. In scope The three fee streams a TPP will encounter when operating in the ecosystem — Nebras API Hub fees, LFI payment fees, and LFI data‑sharing fees above the free threshold. Not covered here End‑user pricing (what a TPP may charge its own customers), LFI‑to‑TPP commissions on referred business, and any CBUAE license fees. These are governed elsewhere in the AlTareq Standards. The three fees How the fee structure works Fees only apply to technically successful API calls. The three streams stack: a single consumer payment through Open Finance will typically attract a Nebras API fee and a payment fee to the LFI executing it. Headline rate See the detail ↓ Fee 01 · TPP → Nebras API Hub fees Nebras charges TPPs a flat per‑call fee for chargeable APIs served through the API Hub. Only endpoints that pull data from an LFI or instruct a payment are chargeable. Everything else — raising or checking a consent, authentication, discovery, and reference‑data lookups — is free. Chargeability Rate per successful call Chargeable 2.5 fils Not chargeable Free Payment‑paired discount Balance and Confirmation of Payee calls are billed at 0.5 fils instead of 2.5 fils when made within 2 hours of a payment. One payment discounts only one Balance call and one CoP call. Insurance Quotes tier Insurance Quote calls ( POST /{sector}-insurance-quotes ) are billed by the number of LFIs that returned a quote, not at the flat 2.5 fils rate: 5 fils — up to 4 LFIs 7.5 fils — up to 10 LFIs 10 fils — up to 25 LFIs 12.5 fils — more than 25 LFIs PATCH /{sector}-insurance-quotes/{QuoteId} (accept, submit KYC) and POST /{sector}-insurance-policies are billed at the flat 2.5 fils rate. GET /{sector}-insurance-quotes/{QuoteId} is free. See the full list of chargeable endpoints → Fee 02 · TPP → LFI Payment fees When a TPP initiates a successful payment through the API Hub, the LFI that executes the payment charges the TPP a fee. Rates are capped by the AlTareq model and vary by customer segment (Retail/SME vs Corporate) and payment context. Nebras calculates and collects these fees on behalf of LFIs. Retail & SME Caps are binding Payment context Cap paid by TPP to LFI Merchant Collections Debit‑card‑equivalent, initiated by the merchant via the TPP. 38 bps in Year 1, stepping down to 25 bps by Year 5 Y1 38 bps Y2 35 bps Y3 32 bps Y4 29 bps Y5 25 bps Also capped at 50 AED per transaction; first 200 AED collected per merchant per day is exempt. Transfer (P2P) & SME‑to‑SME Outbound payment from the customer’s own account. 25 fils per transaction Me‑to‑Me Outbound payment from a customer’s own account to another of their own. 20 fils in Year 1, stepping down to 17 fils by Year 3 Y1 20 fils Y2 18 fils Y3 17 fils Bulk Payment — SME only Outbound bulk payment initiated by the business. 25 fils per transaction, and 250 fils per batch No limit on the number of transactions in a batch. Large Value / Rent / Invoice Collection Collected via an embedded payment link in a smart invoice or equivalent. 4 AED per transaction E.g. rent payments; retail/SME invoices above AED 5,000. Corporate Turnover > 100m AED / year Payment context Cap paid by TPP to LFI Merchant Collections Initiated by a corporate merchant via the TPP. 38 bps in Year 1, stepping down to 25 bps by Year 5 Y1 38 bps Y2 35 bps Y3 32 bps Y4 29 bps Y5 25 bps Also capped at 50 AED per transaction. Corporate Payments Outbound payment from the corporate’s own account. Includes bulk payments. 250 fils per individual transaction Large Value / Rent / Invoice Collection Collected via an embedded payment link in a smart invoice or equivalent. 4 AED per transaction E.g. rent"
  },
  {
    "title": "Which endpoints are chargeable?",
    "path": "/pricing/endpoints/",
    "category": "Pricing",
    "section": "Commercial",
    "description": "AlTareq · Chargeable endpoints Which endpoints are chargeable? Every TPP‑callable endpoint in the UAE Open Finance standards is listed below with its API Hub fee status.…",
    "headings": [
      "Which endpoints are chargeable?"
    ],
    "body": "AlTareq · Chargeable endpoints Which endpoints are chargeable? Every TPP‑callable endpoint in the UAE Open Finance standards is listed below with its API Hub fee status. Chargeable endpoints attract the per‑call API Hub fee defined in Fee 01 ; non‑chargeable endpoints are served at no API Hub fee. A small number are discounted to 0.5 fils when paired with a payment within two hours. ← Back to pricing No endpoints match the current filter. chargeable · not chargeable Method Endpoint Status 0.5 fils when paired with a payment"
  },
  {
    "title": "In Production",
    "path": "/program/whats-live",
    "category": "Program",
    "section": "Activity",
    "description": "Section · In Production Open Finance in production today. LFI (Bank) LFI (Insurer) TPPs Loading live data… Error Could not load live data No match No insurers offering yet. No…",
    "headings": [
      "Open Finance in production today.",
      "Could not load live data",
      "No insurers offering yet.",
      "No banks offering yet.",
      "★",
      "No TPPs consuming in the last days."
    ],
    "body": "Section · In Production Open Finance in production today. LFI (Bank) LFI (Insurer) TPPs Loading live data… Error Could not load live data No match No insurers offering yet. No banks offering yet. → ★ ★ › Over-limit fee: AED › endpoints ( ) › ( ) No match No TPPs consuming in the last days. Show all services → TPP Consumed at › requests How live status is determined. Every LFI listed here is deployed in the production environment — services and certifications come from the Nebras Open Finance production directory. An LFI is marked live once its authorisation server holds a certified Commercial Go-Live Approval ; the approval start date is the go-live date shown on the card. Everything else is in production testing. TPP activity is aggregated from production API Hub access logs over a rolling -day window. All listed institutions are CBUAE-licensed."
  },
  {
    "title": "Release Notes & Erratas",
    "path": "/tech/release-notes-and-erratas/",
    "category": "Release Notes",
    "section": "Changelog",
    "description": "Post-publication register Release Notes & Erratas The authoritative record of changes made after publication. The register is split in two — one side tracks changes to the…",
    "headings": [
      "Release Notes & Erratas",
      "What has changed since publication",
      "How these registers are governed"
    ],
    "body": "Post-publication register Release Notes & Erratas The authoritative record of changes made after publication. The register is split in two — one side tracks changes to the operational systems participants integrate with, the other tracks corrections to published documentation . Two registers What has changed since publication Release Notes describe what was deployed to the platform. Erratas describe what was corrected in the published documentation. Use them together to understand where the ecosystem stands. Covers → Policy controls How these registers are governed Both registers are bound by the policies that control how published content evolves and how versions are promoted. Policy Read policy → Rule of thumb Once a version is published, its existing content MUST NOT be changed without an associated Errata record. Platform deployments that affect behaviour participants depend on are captured in Release Notes."
  },
  {
    "title": "Support Service Desk",
    "path": "/support-service-desk",
    "category": "Support",
    "section": "Help",
    "description": "Support · Jira Service Management Support & the Service Desk The Service Desk is the single entry point for any question or concern you have as an Open Finance participant.…",
    "headings": [
      "Support & the Service Desk",
      "Nebras Open Finance Service Desk",
      "Raising a ticket",
      "What to include when raising a ticket",
      "Clear summary",
      "Organisation name",
      "Contact email",
      "Environment affected",
      "A specific example of what happened",
      "Attachments & screenshots",
      "Email & telephone",
      "Support@Nebrasopenfinance.ae"
    ],
    "body": "Support · Jira Service Management Support & the Service Desk The Service Desk is the single entry point for any question or concern you have as an Open Finance participant. Tickets are routed through Nebras, but the question itself doesn't have to be for Nebras — it can be about Ozone API and the API Hub, Raidiam and the Trust Framework, another participant, or the UAE Open Finance specification itself. It's a tool for every Open Finance participant, supported alongside email and telephone channels. Atlassian Jira Service Management Nebras Open Finance Service Desk Hosted on Atlassian Jira Service Management , the Service Desk is the tool the Nebras team uses to triage and track every ecosystem ticket — and to spot patterns that drive improvements to the documentation and the platform. Access required The Service Desk is gated by Sandbox Trust Framework SSO . Your organisation must be onboarded to the Trust Framework in Sandbox before anyone in your organisation can log in and raise tickets. Onboarding guide — TPPs ↗ LFIs ↗ Minimal role If your organisation wants to add a user only to access the Service Desk, the minimally‑scoped role is SBC (Secondary Business Contact) . Because the Service Desk is powered by Sandbox SSO only, these users do not need to be onboarded to the Trust Framework in Production. Open the Service Desk ↗ Service requests Raising a ticket Four request types are available. I need help and Technical support cover most queries; the two below handle specific access and certification scenarios. Raise this ticket ↗ Raise this ticket ↗ Your tickets Open your requests dashboard to see everything you’ve raised with the Service Desk — filters there let you include closed tickets and anything raised by your organisation. View all your requests ↗ Or jump straight to a ticket by its OF number OF‑ ↗ Before you raise What to include when raising a ticket What we need varies a bit by ticket type — the basics apply to every ticket, and issue-type tickets need more detail so we can reproduce and trace what happened. The same applies whether you raise through the Service Desk or by email. Every ticket 01 Clear summary A short, one-line summary of what you’re raising, followed by any context needed to understand it. 02 Organisation name The name of the participant organisation raising the ticket. 03 Contact email An email address we can reach you on for follow-ups and clarifications. When raising an issue I need help · Trouble logging in · Technical support 04 Environment affected Sandbox or Production — and, if relevant, the specific Hub or LFI deployment involved. 05 A specific example of what happened A concrete example of the failing interaction, not a general description. Where applicable, include: Any x-fapi-interaction-id values from the affected request(s). Any consent IDs involved. Any people involved — e.g. the end user, a TPP engineer, an LFI operator — and their role in the interaction. 06 Attachments & screenshots Screenshots of errors, request/response bodies, logs, or any other artefact that shows what happened. Attach rather than paraphrase where possible. Certification evidence Items 01–03 still apply. The specific artefacts required are defined by the certification programme and listed inside the Service Desk form itself — follow the form’s prompts and attach the requested evidence. Why this matters. Tickets with complete information move through triage quickly. Missing interaction IDs or consent IDs typically block investigation until they’re provided — and every round of back-and-forth adds delay, both in our internal triage and in how quickly we can get back to you. Additional channels Email & telephone Alongside the Service Desk, the support team is reachable by email and telephone. These channels are open to every participant — useful if you need a quicker conversation, want to follow up on an existing ticket, or your organisation isn't yet onboarded to the Sandbox Trust Framework. Email Support@Nebra"
  },
  {
    "title": "Accept a Employment Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-employment-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Accept a Employment Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Health Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-health-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Accept a Health Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Home Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-home-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Accept a Home Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Life Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-life-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Accept a Life Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Motor Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-motor-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Accept a Motor Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Renters Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-renters-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Accept a Renters Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Accept a Travel Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-travel-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Accept a Travel Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Access Encrypted Resource Data",
    "path": "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Production · Testing & Certification · Optional Access Encrypted Resource Data 3 min read A TPP MUST hold this optional certification before requesting the ReadProductFinanceRates…",
    "headings": [
      "Access Encrypted Resource Data 3 min read"
    ],
    "body": "Production · Testing & Certification · Optional Access Encrypted Resource Data 3 min read A TPP MUST hold this optional certification before requesting the ReadProductFinanceRates permission on a live LFI. The certification proves the TPP has completed the required CX certification for this permission, and that it can handle both cleartext and encrypted FinanceRates — decrypting JWE payloads locally on the user's device with the unencrypted rates never reaching the TPP's servers. Content to follow."
  },
  {
    "title": "Application — Redirect URIs",
    "path": "/tech/tpp-standards/trust-framework/redirect-uri",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Applications Redirect URIs 2 min read Every application in the Trust Framework must have a configured RedirectURI . This RedirectURI is a specific, web…",
    "headings": [
      "Redirect URIs 2 min read",
      "Platform documentation",
      "Supporting Universal Links in Your App",
      "Android App Links"
    ],
    "body": `TPP · Trust Framework · Applications Redirect URIs 2 min read Every application in the Trust Framework must have a configured RedirectURI . This RedirectURI is a specific, web address controlled by your application. It acts as the callback destination where the LFI sends the user after they complete authentication and authorizing the consent. The following guide outlines how your RedirectURI can meet FAPI 2.0 requirements while still enabling deep linking into a mobile app. FAPI 2.0 does not allow non-HTTPS redirect URIs. Therefore, you will not be able to use a custom URL scheme (e.g., myapp://home ). To remain compliant with FAPI 2.0 and still support deep linking into your application, follow the steps below. You'll need to make your app respond to a secure URL like: For how to validate the callback ( state , iss , single-use code, replay protection), see Handling Authorization Callbacks . Once the user is redirected to the HTTPS URL: If your app is installed, it should open and process the URL (e.g., extract the authorization code). If your app is not installed, it should fall back to an appropriate web page to either complete the user journey on web or to encourage the user to install the app. By adopting this approach, you can continue supporting deep linking while ensuring compliance with the security standards required by FAPI 2.0. Additional Resources Platform documentation Vendor guides for setting up the secure HTTPS-based deep links Apple and Google require on iOS and Android. iOS · Apple Supporting Universal Links in Your App Apple's Xcode documentation covering the Associated Domains entitlement, the apple-app-site-association file your HTTPS host must serve, and how iOS routes a tapped link straight to your app when it's installed (and to Safari when it isn't). Open on developer.apple.com ↗ Android Android App Links Google's training guide covering verified App Links, the assetlinks.json Digital Asset Links file your HTTPS host must serve, intent filters with android:autoVerify="true" , and how Android opens your app directly without the disambiguation dialog. Open on developer.android.com ↗`
  },
  {
    "title": "ATMs",
    "path": "/tech/tpp-standards/v2.1/banking/atms/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · TPP capability ATMs 2 min read The ATM API lets a TPP retrieve ATM location and service data published by LFIs. It is a read-only, public-data API — no user consent or…",
    "headings": [
      "ATMs 2 min read",
      "Bank Data Sharing Provider",
      "Which LFIs are live with ATM data",
      "Browse this section",
      "ATMs — Requirements",
      "ATMs — API Guide"
    ],
    "body": 'Banking · TPP capability ATMs 2 min read The ATM API lets a TPP retrieve ATM location and service data published by LFIs. It is a read-only, public-data API — no user consent or redirect is required. Access control Required role BDSP Bank Data Sharing Provider Access to the ATM API requires the BDSP role. This role must be assigned to your application in the Trust Framework before calling the endpoint. See Roles for the full list of scopes and grant types this role permits. What the API returns A single GET /atms call returns all ATMs published by an LFI. Each ATM record includes: Field Description ATMId Unique terminal identifier LFIId / LFIBrandId Identifies the owning LFI and brand Location Address and GPS coordinates Services Supported transaction types (e.g. CashWithdrawal , Balance , PINChange ) Accessibility Accessibility features (e.g. WheelchairAccess , AudioCashMachine ) SupportedCurrencies ISO 4217 currency codes accepted Availability Operational status and opening hours ATMFee Fee schedule for cross-bank and international transactions MinimumPossibleAmount / MaximumPossibleAmount Withdrawal amount limits Live ecosystem Which LFIs are live with ATM data LFIs currently publishing ATM data across UAE Open Finance. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=atm" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?family=atm" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the ATMs API. Requirements ATMs — Requirements Validation rules and behaviour the ATM endpoint enforces. Open → API Guide ATMs — API Guide Implementation notes, payload structure, and worked examples. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "ATMs — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/atms/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · ATMs ATMs — API Guide 2 min read The ATM API exposes a single endpoint — GET /atms — that returns the details of all ATMs managed by the LFI. Before calling the…",
    "headings": [
      "ATMs — API Guide 2 min read",
      "Response structure"
    ],
    "body": "TPP · Banking · ATMs ATMs — API Guide 2 min read The ATM API exposes a single endpoint — GET /atms — that returns the details of all ATMs managed by the LFI. Before calling the ATM API, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BDSP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication with the LFI. Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework for client authentication. Understanding of Tokens & Assertions — you should understand how client authentication works with private_key_jwt before calling the token endpoint. The ATM API uses the OAuth 2.0 client credentials grant with scope=atm . Use the signJWT() helper to build a client assertion proving your application's identity: See Client Assertion for the full claims reference. POST to the LFI's token endpoint with scope=atm : GET /atms Call the endpoint with the access token. Include x-fapi-interaction-id on every request. See Request Headers . x-fapi-customer-ip-address is not required for ATMs — the data is static and public, so no customer is involved in the call. LFI_API_BASE is the LFI's API Hub resource server — https://rs1.<lfiCode>.apihub.openfinance.ae (production) or https://rs1.<lfiCode>.sandbox.apihub.openfinance.ae (sandbox). Resolve the <lfiCode> from the Trust Framework Directory . See API Resources for the full endpoint format. Response structure See the GET /atms API reference for the full response schema."
  },
  {
    "title": "ATMs — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/atms/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Authorisation Server Discovery (.well-known)",
    "path": "/tech/tpp-standards/trust-framework/well-known",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · LFI Discovery Authorisation Server Discovery 2 min read The .well-known/openid-configuration endpoint provides a standardized way for Third Party Providers…",
    "headings": [
      "Authorisation Server Discovery 2 min read"
    ],
    "body": "TPP · Trust Framework · LFI Discovery Authorisation Server Discovery 2 min read The .well-known/openid-configuration endpoint provides a standardized way for Third Party Providers (TPPs) to retrieve OAuth 2.0 and OpenID Connect configuration for a Licensed Financial Institution (LFI). This allows TPPs to discover authorization, token, and other endpoints programmatically, without hardcoding URLs. For UAE Open Finance, the discovery URL format is: Property Description issuer Identifier for the Authorization Server, used in JWT validation. authorization_endpoint URL where end-users are redirected to in order to authenticate and authorize access. token_endpoint Endpoint to exchange authorization codes or other grants for access tokens. registration_endpoint Endpoint for Dynamic Client Registration (DCR) using software statements. jwks_uri URL exposing the server's public keys for validating JWT signatures. pushed_authorization_request_endpoint Endpoint for submitting signed authorization requests (PAR flow). The information returned from GET /.well-known/openid-configuration changes infrequently and is cached accordingly. Cache-Control header: max-age=900 Cache duration: 15 minutes"
  },
  {
    "title": "Bank Data Sharing",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · TPP capability Bank Data Sharing 2 min read The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These…",
    "headings": [
      "Bank Data Sharing 2 min read",
      "Bank Data Sharing Provider",
      "Endpoint & account type coverage",
      "Account subtypes by account type",
      "Endpoints by account subtype",
      "Which LFIs are live for Account Information",
      "Browse this section",
      "Bank Data Sharing — Requirements",
      "Bank Data Sharing — API Guide",
      "Bank Data Sharing — User Journeys"
    ],
    "body": 'Banking · TPP capability Bank Data Sharing 2 min read The Open Finance Banking Data Sharing capabilities enable secure, consent-driven access to customer banking data. These services empower licensed third-party providers (TPPs) to deliver account aggregation, financial management tools, lending assessments, and value-added digital services. All data access operates under explicit customer consent, with granular permission scopes, strict expiry controls, and full auditability. Access control Required role BDSP Bank Data Sharing Provider Access to the Bank Data Sharing APIs requires the BDSP role. This role must be assigned to your application in the Trust Framework before making any account information requests. See Roles for the full list of scopes and grant types this role permits. What Bank Data Sharing covers Coverage matrix Endpoint & account type coverage Not all endpoints are available for every account subtype, and not all account subtypes are available for every account type. Account subtypes by account type AccountSubType Retail SME Corporate Endpoints by account subtype Endpoint Live ecosystem Which LFIs are live for Account Information LFIs currently serving Account Information requests across UAE Open Finance. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=account-information" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently serving Account Information requests. 0" class="ed-landing__live-cta" href="/program/whats-live?family=account-information" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Bank Data Sharing API. Requirements Bank Data Sharing — Requirements Validation rules and behaviour every Bank Data Sharing endpoint must follow. Open → API Guide Bank Data Sharing — API Guide Implementation notes, payload structure, pagination, and worked examples. Open → User Journeys Bank Data Sharing — User Journeys The end-to-end flows your customer experiences when sharing data through your application. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "Bank Data Sharing - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Data Sharing · UX Bank Data Sharing — User Experience 2 min read Before a customer is redirected to Open Finance to consent to Data Sharing, you must present a Consent…",
    "headings": [
      "Bank Data Sharing — User Experience 2 min read"
    ],
    "body": "Banking · Data Sharing · UX Bank Data Sharing — User Experience 2 min read Before a customer is redirected to Open Finance to consent to Data Sharing, you must present a Consent Page that clearly explains what the customer is consenting to and collects their explicit, informed consent. This page must accurately reflect the scope, purpose, and nature of the data being shared. The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the consent content, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the authorization_details object below and watch the wireframes above update live. Try changing permissions, account types, date ranges, or the TPP name to see how the pages respond, or pick one of the scenarios beside the editor to load a preset consent."
  },
  {
    "title": "Bank Data Sharing — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Bank Data Sharing Bank Data Sharing — API Guide 5 min read Create a Bank Data Sharing consent, redirect the user to authenticate at their LFI, exchange the…",
    "headings": [
      "Bank Data Sharing — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "OpenFinanceBilling (Required) | authorization_details.consent.OpenFinanceBilling",
      "OnBehalfOf (Optional) | authorization_details.consent.OnBehalfOf",
      "subscription (Optional) | authorization_details.subscription",
      "Webhook (Required) | authorization_details.subscription.Webhook",
      "Example request"
    ],
    "body": "TPP · Banking · Bank Data Sharing Bank Data Sharing — API Guide 5 min read Create a Bank Data Sharing consent, redirect the user to authenticate at their LFI, exchange the authorization code for tokens, and call the account APIs — an end-to-end walkthrough of the customer-present data-sharing flow. Before creating a Bank Data Sharing consent, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BDSP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI for which you intend to create a Bank Data Sharing consent. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Consents — you should understand how to create, retrieve, and manage consents, including consent states and lifecycle transitions. POST /par To send a /par request, first we need to generate the request JWT . We do this by first constructing authorization_details of type ( urn:openfinanceuae:account-access-consent:v2.1 ). authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:account-access-consent:v2.1 urn:openfinanceuae:account-access-consent:v2.1 consent * object Properties of the consent agreed by the User with the TPP. Described below. Described below subscription object Optional subscription to Event Notifications, to be sent to the TPP Webhook Url. Described below. Described below consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) 123e4567-e89b-12d3-a456-426614174001 BaseConsentId string (uuid) Used when renewing or modifying an existing consent 123e4567-e89b-12d3-a456-426614174000 Permissions * array<enum> List of account access permissions being consented by the user ReadAccountsBasic , ReadBalances ExpirationDateTime * date-time Expiry date/time (ISO 8601 with timezone, max 1 year) 2025-11-03T15:46:00+00:00 FromDate date Start date for transaction access (ISO 8601 format) 2023-11-03 ToDate date End date for transaction access (ISO 8601 format) 2025-11-03 AccountType array<enum> Allowed: Retail , SME , Corporate Retail AccountSubType array<enum> Allowed: CurrentAccount , Savings , CreditCard , Mortgage , Finance Savings OpenFinanceBilling * object Billing parameters specified by the TPP. Described below. Described below OnBehalfOf object Provided when TPP is acting for another regulated entity. Described below. Described below OpenFinanceBilling (Required) | authorization_details.consent.OpenFinanceBilling Field Type Allowed Values Example UserType * enum Retail , SME , Corporate Retail Purpose * enum AccountAggregation , RiskAssessment , TaxFiling , Onboarding , Verification , QuoteComparison , BudgetingAnalysis , FinancialAdvice , AuditReconciliation AccountAggregation OnBehalfOf (Optional) | authorization_details.consent.OnBehalfOf Field Type Description Example TradingName string Trading name if acting on behalf of another entity Acme Ltd LegalName string Legal name of represented entity Acme Legal Name IdentifierType enum Only Other currently supported Other Identifier string Identifier value 9876543210 subscription (Optional) | authorization_details.subscription Field Type Description Example Webhook * object Described below. Described below Webhook (Required) | authorization_details.subscription.Webhook Field Type Descript"
  },
  {
    "title": "Bank Data Sharing — Encrypted FinanceRates",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Bank Data Sharing · API Guide Encrypted FinanceRates 6 min read When a TPP holds the ReadProductFinanceRates permission and calls GET /accounts/{AccountId}/product…",
    "headings": [
      "Encrypted FinanceRates 6 min read",
      "Example response — cleartext",
      "Example response — encrypted JWE",
      "What the customer receives",
      "Handling the 429 response"
    ],
    "body": "TPP · Banking · Bank Data Sharing · API Guide Encrypted FinanceRates 6 min read When a TPP holds the ReadProductFinanceRates permission and calls GET /accounts/{AccountId}/product for a credit card, finance, or mortgage account, the LFI MAY return the FinanceRates field as an encrypted JWE rather than a structured object. The TPP MUST present the rates to the customer without the unencrypted values ever reaching or being stored on its servers — decryption happens locally on the user's device using a one-time code sent to the customer by the LFI. The FinanceRates field on GET /accounts/{AccountId}/product is defined as anyOf a structured AEProductFinanceRates object or an AEJwe compact string. Each LFI decides, per product, whether to return the rate in cleartext or as an encrypted JWE. A TPP holding ReadProductFinanceRates MUST therefore be ready for either shape on every call. Cleartext — FinanceRates is a JSON object. Render the rates directly. No special handling required. Encrypted (JWE) — FinanceRates is a compact JWE string. The TPP server MUST forward this opaque string to the user's device without inspecting, logging, or persisting it. Decryption happens in the browser using a one-time code the LFI sends to the customer. Some LFIs treat product finance rates as commercially sensitive and require an additional customer-present authentication step before the rate can be revealed. The encrypted JWE shape lets the rate flow through the TPP to the customer's screen without the TPP ever holding the cleartext value. The Access Encrypted Resource Data optional certification — the TPP MUST hold this certification with Nebras before it requests ReadProductFinanceRates on any consent. An uncertified TPP MUST NOT include ReadProductFinanceRates in the authorization_details at consent creation; the API Hub rejects the consent if it does. See Access Encrypted Resource Data . A consent that includes ReadProductFinanceRates — this permission MUST be requested in the authorization_details when the TPP creates the consent. See Step 1 — Constructing Authorization Details . An active customer-present session — when the consent carries ReadProductFinanceRates , the TPP MUST only call GET /accounts/{AccountId}/product while the customer is actively using the TPP application. Background or scheduled calls are not permitted on a consent that carries this permission, because the encrypted-rate flow requires the customer to receive and enter the one-time code in real time. A valid access token and the FAPI headers for a customer-present call — x-fapi-interaction-id , x-fapi-auth-date , and x-fapi-customer-ip-address . Because the call is always customer-present (see above), x-fapi-customer-ip-address MUST be set to the customer's device IP on every request; omitting it is not permitted on this endpoint when the consent carries ReadProductFinanceRates . See Request Headers . GET /accounts/{AccountId}/product Whether the LFI returns cleartext or an encrypted JWE, the request itself is unchanged. Make the call as you would for any other Bank Data Sharing endpoint: Example response — cleartext Example response — encrypted JWE Apart from FinanceRates , every other field in the response is returned in cleartext in both shapes — Charges , DepositRates , ProductName , Tenor , and so on. Only FinanceRates is ever encrypted. If FinanceRates is a JSON object, render its ProductFinanceRateProperties directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer's browser. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. The encrypted JWE is opaque to the TPP. Pass it through to the browser response and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-rate handl"
  },
  {
    "title": "Bank Data Sharing — Functional Certification Submission",
    "path": "/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/submission",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Functional Certification · Bank Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here?…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Bank Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Bank Data Sharing — Pagination",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/pagination",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Bank Data Sharing Pagination 3 min read List endpoints on the Bank Data Sharing API return pagination information in the response body. The TPP walks through a…",
    "headings": [
      "Pagination 3 min read"
    ],
    "body": "TPP · Banking · Bank Data Sharing Pagination 3 min read List endpoints on the Bank Data Sharing API return pagination information in the response body. The TPP walks through a paginated result set by following the URLs in the Links object — there are no page or page-size query parameters to set on the request. For the end-to-end picture — including how the API Hub converts LFI meta into the TPP Links envelope — see Pagination — LFI meta to TPP Links . Pagination is ultimately driven by the LFI. The UAE Open Finance standard requires LFIs to paginate /accounts/{AccountId}/transactions and /accounts/{AccountId}/statements , but during rollout not every LFI will have implemented it on day one. A TPP SHOULD therefore be ready for either of the following: Paginated — the LFI returned a page of the filtered result set. Meta.TotalPages > 1 and Links.Next is populated while more pages remain. Unpaginated — the LFI returned the full result set in a single response. Meta.TotalPages is 1 (or 0 for an empty result) and Links contains only Self . The loop pattern below — follow Links.Next until it is absent — handles both cases without branching. A TPP that only supports the paginated shape will appear to work correctly while the LFI is unpaginated (it fetches page 1 and stops), but will silently truncate to the first page once the LFI enables pagination. Using Links.Next as the stop condition avoids that regression. Endpoint Pagination GET /accounts/{AccountId}/transactions Required GET /accounts/{AccountId}/statements Required GET /accounts Optional GET /accounts/{AccountId}/balances Optional GET /accounts/{AccountId}/beneficiaries Optional GET /accounts/{AccountId}/direct-debits Optional GET /accounts/{AccountId}/scheduled-payments Optional GET /accounts/{AccountId}/standing-orders Optional GET /accounts/{AccountId}/product Optional GET /accounts/{AccountId}/parties Optional Transactions and statements span long history (at least two years) and routinely produce large result sets. For other list endpoints the full result set is usually returned in one response, but TPPs SHOULD still follow Links.Next defensively in case an LFI chooses to paginate them. Every paginated response includes a Links object alongside Data : Field Required Meaning Self Yes The URL that produced this response First No Link to the first page. Omitted when the response is unpaginated Prev No Link to the previous page. Omitted on the first page Next No Link to the next page. Omitted on the last page and when the response is unpaginated Last No Link to the last page. Omitted when the response is unpaginated The URLs in Links are opaque — treat them as strings to fetch, not as templates to parse or rebuild. The API Hub may evolve the pagination parameters it embeds in these URLs without breaking your client. Field Applies to Meaning TotalPages All list endpoints Total number of pages in the filtered result set. 1 when the response is unpaginated, 0 for an empty result set FirstAvailableDateTime Transactions, statements ISO 8601 timestamp of the earliest record the LFI holds for this account LastAvailableDateTime Transactions, statements ISO 8601 timestamp of the most recent record the LFI holds for this account FirstAvailableDateTime and LastAvailableDateTime reflect the full history the LFI holds, not the slice returned by the current query. They are useful for narrowing follow-up requests with fromBookingDateTime / toBookingDateTime . The canonical pattern is a loop that fetches Links.Next until the field is absent. The same logic terminates correctly whether the LFI paginated the result or returned it in a single response. The access token is valid for the same 10-minute window used elsewhere. For very large result sets, refresh proactively using the refresh token flow in Step 10 — Refreshing the Access Token rather than waiting for a 401 mid-loop. Each page is a separate HTTP request. Cap your loop with a sensible maximum page count and respect any 429 Too Many R"
  },
  {
    "title": "Bank Data Sharing — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Banking",
    "path": "/tech/tpp-standards/v2.1/banking/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP Standards · v2.1 · Banking Banking 2 min read The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification,…",
    "headings": [
      "Banking 2 min read",
      "Which LFIs are live on Open Finance Banking",
      "Browse the Banking capabilities"
    ],
    "body": 'TPP Standards · v2.1 · Banking Banking 2 min read The Open Finance Banking capabilities enable secure and efficient financial data sharing, payment initiation, and verification, empowering third-party providers (TPPs) with the necessary tools to enhance user experience and financial services. All services are provided with strict consent management and detailed data access permissions. Live ecosystem Which LFIs are live on Open Finance Banking LFIs currently serving Banking requests — across data sharing, payments, CoP, products, and ATMs — on UAE Open Finance. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently live for Banking capabilities. 0" class="ed-landing__live-cta" href="/program/whats-live" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Capabilities Browse the Banking capabilities The full set of capability areas covered by the TPP Banking standards. Open →'
  },
  {
    "title": "Client Encryption Certificate",
    "path": "/tech/tpp-standards/trust-framework/certificates/client-encryption",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "Trust Framework · Certificates Client Encryption Certificate 2 min read The Encryption Certificate is used to encrypt data sent to your application — such as event notifications —…",
    "headings": [
      "Client Encryption Certificate 2 min read",
      "Generating Your Encryption Certificate"
    ],
    "body": "Trust Framework · Certificates Client Encryption Certificate 2 min read The Encryption Certificate is used to encrypt data sent to your application — such as event notifications — ensuring only your application can read it. Purpose Ensuring only your application can read sensitive data Usage Decrypting encrypted responses and event payloads Required Optional — required if your application subscribes to receive encrypted events When an LFI or the platform sends an encrypted payload, it encrypts it using the public key from this certificate. Your application uses the corresponding private key to decrypt it. Generating Your Encryption Certificate Follow the Keys & Certificates guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate. When selecting the certificate type during generation, choose Encryption . Keep your encryption private key stored securely. If it is lost, you will be unable to decrypt any events received during the period the certificate was active. See Secure Management of Keys and Credentials for guidance."
  },
  {
    "title": "Client Signing Certificate",
    "path": "/tech/tpp-standards/trust-framework/certificates/client-signing",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "Trust Framework · Certificates Client Signing Certificate 2 min read The Signing Certificate is used to digitally sign JWTs that your application sends — including Client…",
    "headings": [
      "Client Signing Certificate 2 min read",
      "Generating Your Signing Certificate",
      "Using the Signing Key"
    ],
    "body": "Trust Framework · Certificates Client Signing Certificate 2 min read The Signing Certificate is used to digitally sign JWTs that your application sends — including Client Assertions, PAR Request JWTs, and any other signed payloads. Purpose Proving integrity and authenticity of signed payloads Usage Signing the contents of JWTs Required Yes Every signed JWT must include a kid header referencing this certificate's Key ID, so that the receiving party can look up your public key in the Trust Framework and verify the signature. Generating Your Signing Certificate Follow the Keys & Certificates guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate. When selecting the certificate type during generation, choose Signing . Using the Signing Key The Key ID ( kid ) of your signing certificate must be included in the JWT header for every signed request. See Finding Your Key ID and Message Signing for full details on how this value is used."
  },
  {
    "title": "Client Transport Certificate",
    "path": "/tech/tpp-standards/trust-framework/certificates/client-transport",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "Trust Framework · Certificates Client Transport Certificate 2 min read The Transport Certificate is used for mutual TLS (mTLS) to authenticate your application when making API…",
    "headings": [
      "Client Transport Certificate 2 min read",
      "Generating Your Transport Certificate"
    ],
    "body": "Trust Framework · Certificates Client Transport Certificate 2 min read The Transport Certificate is used for mutual TLS (mTLS) to authenticate your application when making API requests to LFIs. Purpose Secure transport and client authentication Usage mTLS handshake for all API calls Presented to API providers during every connection Required Yes All API calls you make as a TPP must present this certificate. Without it, LFI endpoints will reject the connection before any request is processed. Generating Your Transport Certificate Follow the Keys & Certificates guide to generate your private key and CSR, then upload the CSR to the Trust Framework to receive your certificate. When selecting the certificate type during generation, choose Transport . Using the kid Once issued, note the Key ID ( kid ) from the certificate detail page — you will need it when configuring your mTLS client. See Finding Your Key ID ."
  },
  {
    "title": "CMI — Bank Data Sharing Requirements",
    "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-data-sharing/requirements",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "CMI — Bank Data Sharing User Experience",
    "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-data-sharing/user-experience",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "TPP · CMI · Bank Data Sharing · UX Bank Data Sharing — User Experience 2 min read The TPP Consent Management Interface for Bank Data Sharing consents. Users see their connected…",
    "headings": [
      "Bank Data Sharing — User Experience 2 min read",
      "Configure simulated consents and watch the preview respond"
    ],
    "body": "TPP · CMI · Bank Data Sharing · UX Bank Data Sharing — User Experience 2 min read The TPP Consent Management Interface for Bank Data Sharing consents. Users see their connected accounts, the data permissions they granted, and can pause, reactivate, or revoke at any time. While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval. The component below shows the AlTareq Connections page filtered to Data Sharing consents. Tap any consent card to open its details and manage it. Configure simulated consents and watch the preview respond Use the editor below to add, remove, and adjust the simulated consents. Every change is reflected immediately in the preview above. Example"
  },
  {
    "title": "CMI — Bank Service Initiation Requirements",
    "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-service-initiation/requirements",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "CMI — Bank Service Initiation User Experience",
    "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-service-initiation/user-experience",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "TPP · CMI · Bank Service Initiation · UX Bank Service Initiation — User Experience 2 min read The TPP Consent Management Interface for Bank Service Initiation (payment) consents.…",
    "headings": [
      "Bank Service Initiation — User Experience 2 min read",
      "Configure simulated consents and watch the preview respond"
    ],
    "body": "TPP · CMI · Bank Service Initiation · UX Bank Service Initiation — User Experience 2 min read The TPP Consent Management Interface for Bank Service Initiation (payment) consents. Users see their single payments and Flexi Pay (multi-payment) permissions, the payer and payee details, and can pause, reactivate, or cancel an active permission at any time. While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval. The component below shows the AlTareq Connections page filtered to payment consents. Tap any consent card to open its details and manage it. Configure simulated consents and watch the preview respond Use the editor below to add, remove, and adjust the simulated consents. Every change is reflected immediately in the preview above. Example"
  },
  {
    "title": "CMI — Insurance Data Sharing Requirements",
    "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/insurance-data-sharing/requirements",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "CMI — Insurance Data Sharing User Experience",
    "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/insurance-data-sharing/user-experience",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "TPP · CMI · Insurance Data Sharing · UX Insurance Data Sharing — User Experience 2 min read The TPP Consent Management Interface for Insurance Data Sharing consents. Users see…",
    "headings": [
      "Insurance Data Sharing — User Experience 2 min read",
      "Configure simulated consents"
    ],
    "body": "TPP · CMI · Insurance Data Sharing · UX Insurance Data Sharing — User Experience 2 min read The TPP Consent Management Interface for Insurance Data Sharing consents. Users see their connected insurance policies, the data permissions they granted, and can pause, reactivate, or revoke at any time. While you may adapt visual elements such as colour palette, fonts, and styling to align with your brand, you must not alter the meaning, clarity, or completeness of the consent management content. The representation of AlTareq — including logos, naming, and action buttons — must be preserved. Your Consent Management Interface must be submitted as part of CX certification prior to production, and any material changes to a production CMI must be re-submitted for review and approval. The component below shows the AlTareq Connections page for insurance consents. Tap any consent card to open its details and manage it. Each consent connects the TPP to the user's policies of a given insurance type. Configure simulated consents Use the editor below to add, remove, and adjust the simulated insurance consents. Every change is reflected immediately in the preview above."
  },
  {
    "title": "Confirm the IBAN matches the Name on the Account",
    "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Confirm the IBAN matches the Name on the Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Confirmation of Payee",
    "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · TPP capability Confirmation of Payee 2 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is…",
    "headings": [
      "Confirmation of Payee 2 min read",
      "Bank Service Initiation Provider",
      "Match results",
      "Which LFIs are live for Confirmation of Payee",
      "Browse this section",
      "Confirmation of Payee — Requirements",
      "Confirmation of Payee — API Guide",
      "Confirmation of Payee — User Journeys"
    ],
    "body": 'Banking · TPP capability Confirmation of Payee 2 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is initiated. The check happens outside the consent and authorisation flow — it requires no user interaction, runs against the LFI that holds the destination account, and returns a name-match result in real time. Access control Required role BSIP Bank Service Initiation Provider Access to the Confirmation of Payee API requires the BSIP role. This role must be assigned to your application in the Trust Framework before calling either endpoint. See Roles for the full list of scopes and grant types this role permits. How it works CoP is a two-call flow: discovery, then confirmation. Discovery is called against the API Hub. The TPP submits the destination IBAN; the Hub resolves which LFI holds the account and returns that LFI\'s discovery endpoint URL and resource server URL. Confirmation is called directly against the resolved LFI. The TPP authenticates using a client credentials grant (no user redirect), sends a signed request containing the IBAN and account holder name, and receives a signed response with the match result. Step Endpoint Called against Discovery POST /open-finance/confirmation-of-payee/v2.1/discovery API Hub Confirmation POST /open-finance/confirmation-of-payee/v1.2/confirmation Resolved LFI Both request and response bodies are compact JWS strings ( Content-Type: application/jwt ). The Hub discovery response carries DiscoveryEndpointUrl and ResourceServerUrl . The LFI confirmation response carries NameMatchIndicator and, on non-Yes results, a MaskedName . Reference Match results A Partial or No result must be disclosed to the user — see User Journeys for the required consent and authorisation page behaviour. NameMatchIndicator Meaning Required TPP action ConfirmationOfPayee.Yes Name and account match Proceed normally ConfirmationOfPayee.Partial Name partially matches Surface MaskedName to the payer before proceeding ConfirmationOfPayee.No Name does not match Surface MaskedName to the payer before proceeding Live ecosystem Which LFIs are live for Confirmation of Payee LFIs currently serving Confirmation of Payee requests across UAE Open Finance. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=confirmation" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?family=confirmation" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Confirmation of Payee API. Requirements Confirmation of Payee — Requirements Validation rules and behaviour every CoP request must follow. Open → API Guide Confirmation of Payee — API Guide Implementation notes for discovery, signed payloads, and confirmation responses. Open → User Journeys Confirmation of Payee — User Journeys How match results must be surfaced to the payer across all scenarios. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "Confirmation of Payee - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Confirmation of Payee · UX Confirmation of Payee — User Experience 2 min read You must display the Confirmation of Payee result faithfully aligned with the demo and…",
    "headings": [
      "Confirmation of Payee — User Experience 2 min read"
    ],
    "body": "Banking · Confirmation of Payee · UX Confirmation of Payee — User Experience 2 min read You must display the Confirmation of Payee result faithfully aligned with the demo and examples below. You may not suppress, reorder, or alter the result as this could mislead the customer about whether the payee name matched. The customer must always be able to make an informed decision about whether to proceed with the payment based on the result shown. Your CoP screen must be submitted as part of CX certification prior to production. Edit the message.Data fields returned by the LFI and see to change the signed JWS is embedded inside the domestic_payment_pii creditor block and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Confirmation of Payee — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Confirmation of Payee Confirmation of Payee — API Guide 4 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or…",
    "headings": [
      "Confirmation of Payee — API Guide 4 min read",
      "Request payload fields",
      "Example payload (inside the JWT message claim)",
      "Signing the request",
      "Response",
      "Decoding the JWS"
    ],
    "body": "TPP · Banking · Confirmation of Payee Confirmation of Payee — API Guide 4 min read Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named individual or business before initiating a payment. Unlike payment flows, CoP does not require user authorization — the TPP authenticates directly using a client credentials grant and the LFI responds with a match result in seconds. CoP is served by each participating LFI independently. Before calling an LFI directly, the TPP first calls the API Hub's discovery endpoint to identify which LFI holds the destination account and retrieve its endpoint URLs. Before calling the CoP API, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign the confirmation request JWT and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI that holds the destination account. Understanding of Tokens & Assertions — you should understand how client authentication works with private_key_jwt before calling the token endpoint. CoP is served by individual LFIs — the /discovery endpoint resolves a payee IBAN to the correct LFI and returns two URLs you will need for the rest of the flow: Field Description DiscoveryEndpointUrl The .well-known endpoint for the LFI's Authorisation Server. Fetch this to obtain the token_endpoint and issuer used in later steps. ResourceServerUrl The base URL of the LFI's API Hub resource server. Use this as the base URL when calling /confirmation . Before calling /discovery you must obtain an access token from any LFI you are registered with using a client credentials grant. The API Hub does not make any requests to the LFI when processing /discovery — it resolves the IBAN centrally — so the response is the same regardless of which LFI you authenticate with. You only need to perform discovery once, and the POST /discovery request must be sent to the LFI whose token you are using. Use the signJWT() helper to build a client assertion proving your application's identity: See Client Assertion for the full claims reference. POST to any LFI's token endpoint with scope=confirmation-of-payee : The request body is a signed JWT containing the IBAN, signed with your signing key: POST /discovery Include x-fapi-interaction-id on the request. See Request Headers . See the POST /discovery API reference for the full request and response schema. Fetch the DiscoveryEndpointUrl directly to read the LFI's OpenID configuration. This gives you the token_endpoint and issuer needed for the next steps: Use the signJWT() helper to build a client assertion proving your application's identity: See Client Assertion for the full claims reference. POST to the token endpoint (resolved in Step 6) with scope=confirmation-of-payee : POST /open-finance/confirmation-of-payee/v2.1/confirmation The confirmation request is sent as a signed JWT ( Content-Type: application/jwt ). Build the JWT payload containing the account details you want to verify, then sign it with your signing key. Request payload fields Field Type Description Example Data.SchemeName * enum Account identifier type — always IBAN IBAN Data.Identification * string The IBAN to verify AE070331234567890123456 Data.Name.FullName * string Full name of the account holder Ibrahim Al Suwaidi Data.Name.GivenName string Given (first) name — individual accounts Ibrahim Data.Name.LastName string Family name — individual accounts Al Suwaidi Data.Name.BusinessName string Registered business name — use instead of personal name fields for busi"
  },
  {
    "title": "Confirmation of Payee — Functional Certification Submission",
    "path": "/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/submission",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Functional Certification · Confirmation of Payee Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Confirmation of Payee Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Confirmation of Payee — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Consent",
    "path": "/tech/tpp-standards/v2.1/consent/",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "TPP Standards · v2.1 · Consent Consent 4 min read A Consent is an authorisation object that represents a user's explicit permission for a TPP to access their data or initiate…",
    "headings": [
      "Consent 4 min read"
    ],
    "body": "TPP Standards · v2.1 · Consent Consent 4 min read A Consent is an authorisation object that represents a user's explicit permission for a TPP to access their data or initiate services at an LFI. Every protected resource request in UAE Open Finance is bound to a consent — there is no access without one. There are two types of consent, corresponding to the two service families. Type Used for Created via Bank Data Sharing Reading account data, balances, transactions, and related resources authorization_details with type: urn:openfinanceuae:account-access-consent:v2.1 Bank Service Initiation Initiating payments authorization_details with type: urn:openfinanceuae:payment-consent:v2.1 Before any UserOAuth2Security protected resource can be accessed, a consent must go through a two-phase flow: staging and authorization . The API Hub maintains all Open Finance consents and acts as the authoritative system of record for consents across the ecosystem. All consent creation, modification, and revocation events are recorded within the API Hub to ensure a single, consistent source of truth. Whenever a TPP initiates a request to access customer data or initiate a payment, the request is validated against the consent record stored in the API Hub. To maintain ecosystem-wide consistency, consent updates such as status changes must be synchronised with the API Hub. Once a consent is staged, the only field under Data that may change is Status . All other Data values are fixed for the lifetime of that consent. Subscription and Meta may be patched, but they sit outside the Data object. See the request/response models in the OpenAPI (e.g. /account-access-consents ) for the canonical structure. If a user needs to change any Data value (for example, to adjust ExpirationDateTime or add or remove a permission), the TPP must create a new consent , revoke the previous one, and link the two via BaseConsentId . Resources secured with UserOAuth2Security require user involvement — the user must authenticate with the LFI and explicitly authorise the consent before the TPP can access any resource on their behalf. Two independent conditions must both be satisfied before the API Hub will serve a UserOAuth2Security resource: Requests must carry a Bearer access token in the Authorization header: Authorization: Bearer <access_token> Access tokens are short-lived (10-minute lifetime) and are bound to the consent they were issued for. See Tokens & Assertions for the full token lifecycle. The consent referenced in the access token's authorization_details must be in the Authorized state. The authorization_details object defines the exact scope of access — which permissions are granted, to which endpoints, for which accounts, and for how long. The API Hub must reject all requests to UserOAuth2Security resources where the associated consent is not in the Authorized state — including consents that are AwaitingAuthorization , Suspended , Expired , Revoked , Rejected , or Consumed . A consent moves through a defined set of states during its lifecycle. Your application must track these states and respond appropriately — particularly to terminal states, which require a new consent flow."
  },
  {
    "title": "Consent — API Guide",
    "path": "/tech/tpp-standards/v2.1/consent/api-guide",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "TPP Standards · v2.1 · Consent · API Guide Consent — API Guide 3 min read In UAE Open Finance, a Consent is a structured, user-authorized agreement that grants a TPP specific…",
    "headings": [
      "Consent — API Guide 3 min read",
      "Subscribe to webhook events Recommended",
      "Poll the consent endpoint"
    ],
    "body": "TPP Standards · v2.1 · Consent · API Guide Consent — API Guide 3 min read In UAE Open Finance, a Consent is a structured, user-authorized agreement that grants a TPP specific rights to access data or initiate payments on a user's behalf. All API access is consent-bound — you cannot call a resource endpoint without a valid, authorized consent. Consents are created through the Pushed Authorization Request flow ( FAPI 2.0 PAR ). Rather than creating a consent resource directly, the TPP embeds the consent definition inside a signed Request JWT and pushes it to the Authorization Server. The user then authenticates at the LFI and explicitly authorizes the consent. Type authorization_details.type Used for Bank Data Sharing urn:openfinanceuae:account-access-consent:v2.1 Reading account information, balances, transactions Service Initiation urn:openfinanceuae:service-initiation-consent:v2.1 Initiating domestic payments Insurance Data Sharing urn:openfinanceuae:insurance-consent:v2.1 Reading insurance policy details POST /par Push the signed Request JWT to the Authorization Server. The authorization_details inside the JWT carries the full consent definition — account permissions, payment amounts, billing details, and (for payments) encrypted PII. For the full construction of authorization_details — including field tables, PII encryption, and code examples — see the specific API guides, for example: Bank Data Sharing — API Guide Single Instant Payment — API Guide Insurance Data Sharing — API Guide See Preparing the Request JWT for how to build and sign the Request JWT, and POST /par for the full API reference. Build the authorization URL using the authorization_endpoint from the LFI's .well-known/openid-configuration and the request_uri returned by /par : The user will authenticate with their bank and authorize the consent on the LFI's authorization screen. After authorization, the LFI redirects the user back to your redirect_uri : Always validate state and iss before proceeding. See Handling Authorization Callbacks for the full security guide. POST /token Exchange the authorization code for an access token and refresh token. The code_verifier must match the code_challenge sent in the Request JWT (PKCE). The access token is consent-bound — it carries the scope and ConsentId granted during authorization. See Tokens & Assertions for token lifetimes and the refresh flow. When obtaining an access token you also receive the current state of the consent (including the status) to confirm it has moved to the Authorized state before making resource API calls. After a consent is created, your application needs to track its status over time. There are two approaches: Option 1 Subscribe to webhook events Recommended When a consent is created with subscription.Webhook.IsActive: true , on every consent status change — for example, when a user revokes, or the consent expires — the API Hub delivers a Consent Status Event to your registered webhook URL. This avoids the need to poll and ensures your application reacts to status changes in real time. Note: as Events are delivered as JWEs, this approach requires a valid Encryption Certificate on your Application . See the Consent Status Event — API Guide for the full flow. Option 2 Poll the consent endpoint If you need to check the current state of a consent on demand, call the consent endpoint directly. Both endpoints require a client credentials access token — not the user's consent-bound access token. Obtaining a client credentials token Bank Data Sharing See GET /account-access-consents/{ConsentId} for the full response schema. You can also retrieve all consents created under a long-lived base consent by passing baseConsentId as a query parameter to GET /account-access-consents . Service Initiation See GET /payment-consents/{ConsentId} for the full response schema. You can also retrieve all payment consents under a long-lived base consent by passing baseConsentId as a query parameter to GET /payment-con"
  },
  {
    "title": "Consent Management Interface",
    "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "TPP Standards · v2.1 · Consent · Consent Management Interface Consent Management Interface 3 min read Every TPP must provide a Consent Management Interface (CMI) — a section of…",
    "headings": [
      "Consent Management Interface 3 min read",
      "Dashboard",
      "Detail page"
    ],
    "body": "TPP Standards · v2.1 · Consent · Consent Management Interface Consent Management Interface 3 min read Every TPP must provide a Consent Management Interface (CMI) — a section of their application where users can see all active and historical consents they have granted, and take action on them. The CMI is a requirement, not an optional feature. The CMI serves as the primary transparency and control mechanism for users within the TPP's own product. It complements the consent management interfaces provided by LFIs. A compliant CMI covers four core user journeys: Journey What the user does The CMI must present consent information at two levels: Level 1 Dashboard Lists all consents between the user and the TPP with enough detail to identify each one. The information shown varies by consent type; see the per-product Requirements pages for Bank Data Sharing , Bank Service Initiation , and Insurance Data Sharing . Any consent can be selected to open its detail page. Level 2 Detail page Shows the full parameters of a consent exactly as they were defined at consent creation. The detail page also hosts the Pause , Reactivate , and Revoke action buttons where applicable, and — for long-lived payment consents — a full log of payments initiated under that consent. For any consent in the Authorized , AwaitingAuthorization , Suspended , or Paused state, the option to revoke must be present on the detail page. When a user revokes a consent, the TPP must: Present a single confirmation page that clearly describes the impact — what the user will lose access to and what happens to any data already retrieved. PATCH the API Hub to update the consent status to Revoked : Data Sharing: PATCH /account-access-consents/{ConsentId} Service Initiation: PATCH /payment-consents/{ConsentId} Single-use consents that have already been submitted (such as a Single Instant Payment that has completed) are irrevocable . Do not display a revoke button for consents in the Consumed state. For any consent in the Authorized state, the option to pause must be present on the detail page. When a user pauses a consent, the TPP must: Present a single confirmation page that clearly describes that the connection has been paused and how this will affect the service the TPP provides to the user. Record the paused status in the TPP's own system. Do not PATCH the API Hub — the consent remains Authorized at the LFI. Paused is a user-initiated action within the TPP CMI. It stops the TPP from accessing data or initiating payments locally. The consent remains Authorized at the LFI and no re-authentication is needed to resume. Suspended is an LFI-initiated state change recorded in the API Hub — for example when a user's Emirates ID has expired. It is a change to the consent's actual state. Do not present a Paused consent as Suspended, and do not conflate the two in your UI or business logic. For any consent the TPP has recorded as Paused, the option to reactivate must be present on the detail page. When a user reactivates a consent, the TPP must: Present a single confirmation page that clearly describes that access has been restored and what the TPP will now be able to do on the user's behalf. Remove the paused status in the TPP's own system, resuming normal data access or payment initiation under the existing consent. No interaction with the API Hub is required — the consent is already Authorized at the LFI. The user does not need to re-authenticate."
  },
  {
    "title": "Consent Requirements",
    "path": "/tech/tpp-standards/v2.1/consent/requirements",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "TPP Standards · v2.1 · Consent · Requirements Consent Requirements 2 min read These requirements apply to all TPPs operating within UAE Open Finance, regardless of the service…",
    "headings": [
      "Consent Requirements 2 min read",
      "Polling",
      "Webhooks Event Subscriptions"
    ],
    "body": "TPP Standards · v2.1 · Consent · Requirements Consent Requirements 2 min read These requirements apply to all TPPs operating within UAE Open Finance, regardless of the service type. They are assessed as part of the Functional Certification certification process. A consent must be minimally scoped — it may only request the permissions genuinely necessary to deliver the service being offered to the user at the time of authorisation. Requesting permissions speculatively, in anticipation of future features, or as a blanket grant is not permitted. If a TPP's service requires only account balances, it must not also request transaction history or beneficiary data. LFIs may reject a consent at the /par stage if the authorization_details object contains values that are unsupported or disproportionate to the service offered and described via the /participants endpoint . This includes: A Permissions set broader than the service the LFI supports Field values the LFI does not support — for example, requesting AccountSubType: CreditCard at an LFI that only supports CurrentAccount and Savings A consent's ExpirationDateTime must not exceed one year from the date of consent creation. Consents submitted with an expiry beyond this limit will be rejected by the API Hub. The ExpirationDateTime must reflect the minimum period required for the service. A consent must not be issued with an unnecessarily long expiry when the underlying service covers a shorter, defined period. Before any protected resource is accessed, the user must be presented with a clear, accurate consent screen at the LFI and must take an affirmative action to approve it. The consent screen is rendered by the LFI during the authorization flow and is driven directly by the authorization_details submitted in the /par request — the permissions, account scope, and expiry the user sees must exactly match what the TPP requested. TPPs must not present users with a pre-consent screen that describes a different scope than what is ultimately submitted to /par . Each service type has a defined user experience standard that governs what must be shown to the user. The consent and authorisation screens for each service type are documented in the corresponding User Experience pages, e.g. Bank Data Sharing User Experience . A TPP must maintain an accurate and up-to-date record of every consent it holds in its own systems. The state of a consent can change at any time — the user may revoke it directly at the LFI, the LFI may suspend it, or it may expire — without the TPP initiating the change. This record must be kept current and must be accurately reflected in the Consent Management Interface the TPP exposes to its users, so that users can always see exactly what they have consented to and take action to revoke or amend it. TPPs have two mechanisms to keep their records in sync with the LFI: Mechanism A Polling The TPP periodically calls the consent status endpoint to check the current state: GET /account-access-consents/{ConsentId} for Bank Data Sharing consents GET /payment-consents/{ConsentId} for Bank Service Initiation consents Polling should be performed at a reasonable interval. Excessive polling rates are subject to rate limiting by LFIs. Mechanism B Webhooks Event Subscriptions The TPP subscribes to consent status events and is notified by the API Hub whenever a consent transitions between states (e.g. Authorized , Revoked , Expired ). This avoids the latency and overhead of polling. See Consent Status Event for the event payload and subscription model."
  },
  {
    "title": "Consent Status Change Event",
    "path": "/tech/tpp-standards/v2.1/webhooks/consent-status/open-api",
    "category": "TPP Standards",
    "section": "Webhooks",
    "description": "Webhooks — Consent Status Change Event",
    "headings": [],
    "body": ""
  },
  {
    "title": "Consent Status Event — API Guide",
    "path": "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide",
    "category": "TPP Standards",
    "section": "Webhooks",
    "description": "Webhooks · Consent Status Consent Status Event — API Guide 3 min read When a consent's status changes — for example, when a User revokes it or it expires — the API Hub delivers a…",
    "headings": [
      "Consent Status Event — API Guide 3 min read",
      "Request headers you will receive",
      "Consent Status values",
      "RevokedBy values"
    ],
    "body": `Webhooks · Consent Status Consent Status Event — API Guide 3 min read When a consent's status changes — for example, when a User revokes it or it expires — the API Hub delivers a Consent Status Event to your registered webhook URL as a JWE-encrypted POST. Events fire for both Bank Data Sharing and Bank Service Initiation consents, and the Data object mirrors the full consent resource at the time of the change. Before receiving a Consent Status Event, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the appropriate role as defined in Roles . Valid Encryption Certificate — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. On every consent status change — for example, when a User revokes the consent or it expires — the API Hub delivers a Consent Status Event to your registered webhook URL as a JWE-encrypted POST request. No per-consent subscription flag is required; events are delivered based on your webhook registration in the Trust Framework. Events are sent for both Bank Data Sharing and Bank Service Initiation consents. The Data object mirrors the full consent resource at the time of the status change. The JWE is encrypted using your public Encryption Certificate registered in the Trust Framework. You must respond with 202 Accepted immediately and decrypt the event payload asynchronously. Revoked"> The Hub delivers the event as an HTTP POST to your registered webhook URL. The request body is a JWE compact serialisation string and the Content-Type is application/jwe . Request headers you will receive Header Description Content-Type application/jwe x-fapi-interaction-id RFC4122 UUID used as a correlation ID for this event delivery You must respond with 202 Accepted and an empty body before performing any processing. The Hub expects an immediate acknowledgement — do not wait for decryption or business logic before responding. Failure to respond with 202 promptly may cause the Hub to retry delivery. Process the event payload asynchronously after acknowledging receipt. The event is a JWE compact serialisation encrypted with your public Encryption Certificate . The JWE header contains a kid that identifies which of your registered encryption keys was used — decode the header first to select the correct private key, then decrypt. See Receiving Event Notifications for the full FAPI-aligned guidance, including key selection by kid , JWS signature verification, and required security checks. The decrypted and decoded event payload contains the following structure under the message claim. Field Type Description EventDateTime string (date-time) When the event was generated EventResource string The resource URI that triggered the event EventType string One of: Resource.Created , Resource.Updated , Resource.Deleted ConsentId string The consent identifier associated with the event A replica of the consent resource at the time of the status change, with Status and StatusUpdateDateTime updated to reflect the new state. Where the consent was revoked, RevokedBy will indicate who initiated the revocation. The shape of Data depends on the consent type: Bank Data Sharing Consent — includes Permissions , AccountType , AccountSubType , and ExpirationDateTime Bank Service Initiation Consent — includes ControlParameters , PaymentPurposeCode , and optionally PaymentConsumption tracking cumulative payment usage Consent Status values Status Description AwaitingAuthorization The consent is awaiting User authorization Authorized The consent has been successfully authorized by the User Rejected The unauthorized consent was rejected at the LFI Revoked The consent has been revoked — check RevokedBy for who initiated it Expired The consent has passed its ExpirationDateTime Consumed The consented action(s) have been completed (payment consents) Suspended The consent has been suspended pending fur`
  },
  {
    "title": "Create a Employment Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-employment-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Employment Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Employment Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/employment-insurance-quotes",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Employment Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Health Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-health-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Health Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Health Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/health-insurance-quotes",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Health Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Home Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-home-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Home Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Home Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/home-insurance-quotes",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Home Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Life Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-life-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Life Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Life Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/life-insurance-quotes",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Life Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Motor Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-motor-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Motor Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Motor Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/motor-insurance-quotes",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Motor Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Payment",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Create a Payment",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Renters Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-renters-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Renters Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Renters Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/renters-insurance-quotes",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Renters Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Travel Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-travel-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Travel Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Create a Travel Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/travel-insurance-quotes",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Create a Travel Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Creditor",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · PII · Creditor Creditor 4 min read Creditor data is submitted as part of the PII payload at two points in the payment lifecycle. The structure is different at…",
    "headings": [
      "Creditor 4 min read",
      "Single Beneficiary (1 entry)",
      "Multiple Beneficiaries (2–10 entries)",
      "Open Beneficiary (array omitted)",
      "Matching the authorised creditor",
      "1. Schema conformance",
      "2. Mandatory fields",
      "3. CreditorAgent — BIC derivation and validation"
    ],
    "body": "Service Initiation · PII · Creditor Creditor 4 min read Creditor data is submitted as part of the PII payload at two points in the payment lifecycle. The structure is different at each stage. Stage Endpoint Structure Consent staging POST /par Initiation.Creditor — an array of creditor entries Payment creation POST /payments Initiation.CreditorAccount , Initiation.CreditorAgent , Initiation.Creditor , Initiation.ConfirmationOfPayeeResponse — flat fields on Initiation At consent staging, creditor data lives in Initiation.Creditor — an array of creditor entry objects. Each entry has the structure: The number of entries in the array determines the beneficiary model, which constrains which payment types are available. Single Beneficiary (1 entry) The Creditor array contains exactly one entry . The consent is bound to that creditor — every payment made under this consent must go to that account. Supported payment types: Payment Type Single Instant Payment — domestic Single Instant Payment — international Fixed Defined Schedule multi-payment Variable Defined Schedule multi-payment Fixed Periodic Schedule multi-payment Variable Periodic Schedule multi-payment Fixed On-Demand multi-payment Variable On-Demand multi-payment Delegated SCA ( IsDelegatedAuthentication: true ) Multiple Beneficiaries (2–10 entries) The Creditor array contains between 2 and 10 entries . The consent authorises payments to any one of the listed creditors — each individual payment specifies which one. Supported payment types: Payment Type Variable On-Demand multi-payment Delegated SCA ( IsDelegatedAuthentication: true ) Open Beneficiary (array omitted) The Creditor array is not provided . No beneficiary is fixed at consent time — the creditor is supplied with each POST /payments call. Supported payment types: Payment Type Variable On-Demand multi-payment Delegated SCA ( IsDelegatedAuthentication: true ) At payment creation, the Initiation object in the PII payload is a single AEDomesticCreditor — the creditor fields are flat properties of Initiation , not nested inside an array. Initiation.Creditor at POST /payments is the party identity object ( { Name, PostalAddress } ) — not the array that appears at POST /par . The two uses of the word Creditor refer to different things. Matching the authorised creditor The creditor supplied at POST /payments must correspond to one of the creditors authorised on the consent. The rule depends on the beneficiary model: Consent model Creditor at POST /par Requirement at POST /payments Single beneficiary 1 entry in Initiation.Creditor[] Must exactly match that entry — same IBAN and account name Multiple beneficiaries 2–10 entries in Initiation.Creditor[] Must exactly match one entry from the pre-approved list Open beneficiary Initiation.Creditor[] omitted Any valid creditor — no consent-time match required For Single and Multiple Beneficiary consents, the LFI validates that the CreditorAccount.Identification (IBAN) at POST /payments matches a creditor entry from the authorised consent. A mismatch will result in the payment being rejected. For Open Beneficiary consents, this is where the creditor details appear for the first time. The LFI validates the supplied creditor against the same mandatory field and IBAN rules that apply at consent time — there is no consent-time entry to match against. The following schema applies to each entry in Initiation.Creditor[] at POST /par , and to the flat fields on Initiation at POST /payments . Field Type Required Description CreditorAccount.SchemeName enum Yes Always IBAN for domestic payments CreditorAccount.Identification string Yes The IBAN of the creditor account CreditorAccount.Name.en string Yes* Account holder name in English CreditorAccount.Name.ar string Yes* Account holder name in Arabic CreditorAccount.TradingName object No Trading brand name, if applicable CreditorAccount.Type enum No Account type: Individual , Merchant , Business , Charity , GovernmentBody , Other Creditor.Name st"
  },
  {
    "title": "Debtor Account",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/debtor-account",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · PII · Debtor Account Debtor Account 2 min read Initiation.DebtorAccount is an optional field in the consent PII. It is used when the TPP already knows which…",
    "headings": [
      "Debtor Account 2 min read"
    ],
    "body": "Service Initiation · PII · Debtor Account Debtor Account 2 min read Initiation.DebtorAccount is an optional field in the consent PII. It is used when the TPP already knows which account the user wants to pay from — for example, because the user selected it within the TPP's own application before being redirected to the LFI. When provided, the LFI will pre-select this account on their authorisation screen. When omitted, the user chooses their account directly at the LFI during authorisation. Initiation.DebtorAccount is only present in the PII submitted at POST /par (consent staging). It is not part of the POST /payments PII schema . At payment time, the debtor account has already been determined: the user selected and authorised it during the consent flow at the LFI. There is no mechanism to change or re-specify the debtor account at POST /payments . Field Type Required Description Example SchemeName enum Yes Account identifier scheme — always IBAN IBAN Identification string Yes The IBAN of the debtor account AE070331234567890123456 Name.en string Yes* Account holder name in English Ahmad Al Mansouri Name.ar string No Account holder name in Arabic أحمد المنصوري * At least one of Name.en or Name.ar must be provided if Name is included. If your application does not hold the user's IBAN — for example, in a checkout flow where the user is paying from an account you have never seen — omit DebtorAccount entirely. The user will select their account at the LFI."
  },
  {
    "title": "Delegated SCA - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Delegated SCA · UX Delegated SCA — User Experience 4 min read Before a customer authorises a Delegated SCA payment consent through Open Finance, you…",
    "headings": [
      "Delegated SCA — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Delegated SCA · UX Delegated SCA — User Experience 4 min read Before a customer authorises a Delegated SCA payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to initiate payments on their behalf, but that the customer will be required to authenticate and approve each individual payment before it is executed — no payment will be taken automatically. This page must accurately reflect the payee and the nature of the delegated consent being granted. No payment amounts or schedule are shown at this stage as each payment will require separate customer authorisation. The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Delegated SCA — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Delegated SCA Delegated SCA — API Guide 4 min read A Delegated SCA consent authorises a TPP to initiate multiple payments at variable amounts…",
    "headings": [
      "Delegated SCA — API Guide 4 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters — Delegated SCA",
      "Example request"
    ],
    "body": "TPP · Banking · Service Initiation · Delegated SCA Delegated SCA — API Guide 4 min read A Delegated SCA consent authorises a TPP to initiate multiple payments at variable amounts over the lifetime of the consent. The user authorises the consent once. Unlike other multi-payments a Delegated SCA consent does not contain predefined control parameters. Instead, the TPP is responsible for performing Strong Customer Authentication (SCA) on the user before each payment request (POST /payments). Common use cases include digital wallet experiences where the TPP authenticates the user within its own app, as well as usage-based services such as taxi rides, EV charging sessions, and other metered services where the final charge is presented to the user after the service is completed. Before initiating a Delegated SCA payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par Unlike standard payment flows, Delegated SCA MUST prove the SCA already performed at the TPP. At minimum, Risk.DebtorIndicators.Authentication must demonstrate MFA with two distinct factors, and the wider Risk block must be fully populated with everything derivable from your system. See the Delegated SCA Payment example for a fully-populated version and the Risk reference for the field-by-field schema. With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . For Delegated SCA you must set ControlParameters.IsDelegatedAuthentication to true and leave ConsentSchedule empty, indicating that the TPP will perform SCA on the user before each POST /payments request. authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year) 2027-03-02T00:00:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-03-03T10:00:00+00:00 BaseConsentId string (uuid) Links to prior consent if renewing — see Base Consent ID — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Must include IsDelegatedAuthentication: "
  },
  {
    "title": "Delegated SCA — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Discover the LFI that will confirm the payee",
    "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Discover the LFI that will confirm the payee",
    "headings": [],
    "body": ""
  },
  {
    "title": "Domestic Payments — Functional Certification Submission",
    "path": "/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Functional Certification · Domestic Payments Build your submission Complete each step, provide the Consent and Risk objects for every payment type you offer, and download a ZIP to…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Domestic Payments Build your submission Complete each step, provide the Consent and Risk objects for every payment type you offer, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "FAPI Conformance",
    "path": "/tech/tpp-standards/production/testing-certification/fapi",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Testing & Certification · FAPI FAPI Conformance 2 min read Every TPP must obtain a Relying Party (RP) certification for their application against the CBUAE FAPI 2.0 Message…",
    "headings": [
      "FAPI Conformance 2 min read",
      "1. Access the Conformance Suite",
      "2. Configure the Test Plan",
      "3. Note on Test Data Visibility",
      "4. Submit for Certification"
    ],
    "body": "Testing & Certification · FAPI FAPI Conformance 2 min read Every TPP must obtain a Relying Party (RP) certification for their application against the CBUAE FAPI 2.0 Message Signing Profile before being promoted to production. This certification is issued by the OpenID Foundation (OIDF) and is an exit criterion from the API Hub Sandbox. TPPs integrate as OAuth 2.0 clients — they consume the LFI's Authorization Server. The correct certification track is therefore the Relying Party (RP) test, not the Authorization Server (AS) test. Selecting the wrong track will produce results that are not accepted. TPPs must achieve the CBUAE FAPI 2.0 RP Message Signing ID1 certification. A public list of organisations that have already certified is available at: Certification must be renewed for each major new version of the Standards. 1. Access the Conformance Suite The OIDF conformance suite is available at www.certification.openid.net . Log in with a Google or GitLab account to create and run test plans. 2. Configure the Test Plan When scheduling a new test, use the following configuration exactly: Setting Value Test Plan FAPI2-Message-Signing-ID1: Relying Party (client) test Sender Constraining mtls Client Authentication Type private_key_jwt Authorization Request Type rar Request Method signed_non_repudiation FAPI Client Type oidc FAPI Profile cbuae FAPI Response Mode plain_response 3. Note on Test Data Visibility After running the conformance tests, all data used — including public and private keys of certificates and client data from the test — will be made available in the ecosystem and visible to other participants. If you run the certification in a production environment, you must revoke the certificates used during the tests and obtain any required customer consent. It is strongly recommended to use dedicated test certificates. 4. Submit for Certification Once tests pass, submit your results to the OIDF for certification. Follow the submission instructions at: TPPs must inform Nebras immediately upon receipt of their FAPI Certification from the OIDF. Receipt of certification is an exit criterion from the API Hub Sandbox — production promotion will not proceed until this has been confirmed. Certification fees are fixed and paid directly to the OIDF. The current fee schedule is available at: Fees are significantly reduced for OIDF members. Institutions that expect to certify multiple implementations or renew frequently may find OIDF membership cost-effective. Membership information and benefits: Join the OpenID Foundation Membership fee schedule For questions about running conformance tests or the certification process, contact the OIDF directly: Email: Certification@oidf.org"
  },
  {
    "title": "FAPI Security Profile",
    "path": "/tech/tpp-standards/security/fapi/",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · OAuth 2.0 · OpenID Connect FAPI Security Profile 2 min read UAE Open Finance mandates the FAPI 2.0 Security Profile ( Financial-grade API ) as the security foundation…",
    "headings": [
      "FAPI Security Profile 2 min read",
      "Pushed Authorization Requests (PAR)",
      "Signed Request Objects (JAR)",
      "PKCE (Proof Key for Code Exchange)",
      "mTLS (Mutual TLS)",
      "Browse this section",
      "Preparing the Request JWT",
      "Message Signing",
      "Message Encryption",
      "Receiving Event Notifications",
      "JWT Claim Rules",
      "Scopes"
    ],
    "body": "Security · OAuth 2.0 · OpenID Connect FAPI Security Profile 2 min read UAE Open Finance mandates the FAPI 2.0 Security Profile ( Financial-grade API ) as the security foundation for all API interactions. FAPI 2.0 is an extension of OAuth 2.0 and OpenID Connect designed specifically for high-value financial APIs, where the consequences of a security breach are significant. Pushed Authorization Requests (PAR) Rather than passing authorization parameters directly in a browser redirect URL (where they're visible and potentially manipulable), consent parameters are first sent server-to-server to the /par endpoint. The Authorization Server returns a short-lived request_uri which is the only thing passed in the browser redirect. This ensures authorization parameters are never exposed in browser history or server logs. Signed Request Objects (JAR) The body of the /par request must be a signed JWT — a JSON Web Signature (JWS) . This is a cryptographically signed package of claims that proves: Authenticity — the request genuinely came from your registered application Integrity — no parameter was modified in transit See Preparing the Request JWT for the full structure. PKCE (Proof Key for Code Exchange) Every authorization request includes a code_challenge derived from a secret code_verifier . When the authorization code is later exchanged for tokens, the code_verifier must be provided. This prevents authorization code interception attacks. The only supported method is S256 (SHA-256 hash of the verifier). mTLS (Mutual TLS) All API requests use mutual TLS — both client and server present certificates during the TLS handshake. Your application must present its transport certificate (issued by the Trust Framework) to authenticate at the network level. This ensures that even a stolen access token cannot be used without the corresponding private key. Requirement Value Signing algorithm PS256 (RSA-PSS with SHA-256) Minimum RSA key size 2048 bits Token endpoint auth method private_key_jwt Request object signing Required for /par Encryption Optional (see Message Encryption ) Section contents Browse this section The full set of pages covering the FAPI 2.0 Security Profile in UAE Open Finance. Page Preparing the Request JWT Full structure of the signed JWT sent to /par . Open → Page Message Signing How to sign JWTs using PS256 — used for request objects and client assertions. Open → Page Message Encryption How to encrypt a request object using the LFI's public key. Open → Page Receiving Event Notifications How to decrypt inbound JWEs, verify signatures, and apply FAPI-required security checks on webhook events. Open → Knowledge base JWT Claim Rules Strict per-claim reference for both the Request Object and Client Assertion — aud , jti , lifetime windows, and common rejection causes. Open → Page Scopes All OAuth 2.0 scopes available in UAE Open Finance. Open →"
  },
  {
    "title": "Fixed Defined Schedule - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Fixed Defined Schedule · UX Fixed Defined Schedule — User Experience 4 min read Before a customer authorises a Fixed Defined Schedule payment…",
    "headings": [
      "Fixed Defined Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Fixed Defined Schedule · UX Fixed Defined Schedule — User Experience 4 min read Before a customer authorises a Fixed Defined Schedule payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make a pre-defined series of payments, each on a specific date for a fixed amount. This page must accurately reflect the key details of the consent (payee, the complete list of scheduled payment dates and the fixed amount for each, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Fixed Defined Schedule — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Fixed Defined Schedule Fixed Defined Schedule — API Guide 5 min read A Fixed Defined Schedule consent authorises a TPP to initiate payments on…",
    "headings": [
      "Fixed Defined Schedule — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters — Fixed Defined Schedule",
      "Example request"
    ],
    "body": `TPP · Banking · Service Initiation · Fixed Defined Schedule Fixed Defined Schedule — API Guide 5 min read A Fixed Defined Schedule consent authorises a TPP to initiate payments on a pre-agreed set of specific dates , each with a fixed exact amount . Rather than a recurring period, the TPP supplies an explicit schedule at consent time — listing each PaymentExecutionDate alongside the precise amount to be collected on that date. The user authorises once, approving the full schedule, and the TPP submits one payment per scheduled date without requiring re-authorisation. Common use cases include fixed instalment plans, structured loan repayments, and membership or subscription billing where both the dates and exact amounts are known upfront. Fixed Defined Schedule is the locked-amount variant of Variable Defined Schedule — same schedule shape, but each entry carries an exact Amount rather than a MaximumIndividualAmount ceiling. Before initiating a Fixed Defined Schedule payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . Set PeriodicSchedule.Type to "FixedDefinedSchedule" . Unlike a Periodic Schedule, there is no recurring period — instead, the Schedule array lists each specific PaymentExecutionDate alongside the exact amount to be collected on that date. The TPP submits one POST /payments per scheduled entry for exactly the amount defined in the schedule. authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year). All scheduled dates must fall before this value. 2027-03-02T00:00:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-03-03T10:00:00+00:00 BaseConsentId string (uuid) Links to prior consent if renewing — see Base Consent ID — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Payment controls — see below — PersonalIdentifiableInformation * string (JWE) Encrypted creditor`
  },
  {
    "title": "Fixed Defined Schedule — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Fixed On Demand - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Fixed On Demand · UX Fixed On Demand — User Experience 4 min read Before a customer authorises a Fixed On Demand payment consent through Open…",
    "headings": [
      "Fixed On Demand — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Fixed On Demand · UX Fixed On Demand — User Experience 4 min read Before a customer authorises a Fixed On Demand payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make multiple payments of a fixed amount at any time of your choosing. This page must accurately reflect the key details of the consent (payee, the fixed amount per payment, the first payment date, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Fixed On Demand — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Fixed On-Demand — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Fixed On-Demand Fixed On-Demand — API Guide 5 min read A Fixed On-Demand consent authorises a TPP to initiate multiple payments at a fixed…",
    "headings": [
      "Fixed On-Demand — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters — Fixed On-Demand",
      "Example request"
    ],
    "body": `TPP · Banking · Service Initiation · Fixed On-Demand Fixed On-Demand — API Guide 5 min read A Fixed On-Demand consent authorises a TPP to initiate multiple payments at a fixed amount over the lifetime of the consent. The user authorises once — approving a specific per-payment amount and periodic limits — and the TPP can then submit individual payments on-demand without requiring re-authorisation for each one. Common use cases include fixed-amount subscription billing, regular instalment collection, and scheduled membership fees where the charge is always the same. Before initiating a Fixed On-Demand payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . The key difference from Variable On-Demand is that PeriodicSchedule.Amount is a mandatory fixed amount — every payment under this consent must be for exactly this value. authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year) 2027-03-02T00:00:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-03-03T10:00:00+00:00 BaseConsentId string (uuid) Links to prior consent if renewing — see Base Consent ID — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Payment controls — see below — PersonalIdentifiableInformation * string (JWE) Encrypted creditor and risk data — the encryptedPII string from Step 1 eyJhbGci... PaymentPurposeCode * string (3 chars) AANI payment purpose code ACM DebtorReference string Reference shown on the debtor's statement Subscription CreditorReference string Reference shown on the creditor's statement Subscription ControlParameters — Fixed On-Demand ControlParameters.ConsentSchedule.MultiPayment carries the control definition. Set PeriodicSchedule.Type to "FixedOnDemand" . The payment amount is fixed at consent time via PeriodicSchedule.Amount — every POST /payments call under this consent must use exactly this`
  },
  {
    "title": "Fixed Periodic Schedule - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Fixed Periodic Schedule · UX Fixed Periodic Schedule — User Experience 4 min read Before a customer authorises a Fixed Periodic Schedule payment…",
    "headings": [
      "Fixed Periodic Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Fixed Periodic Schedule · UX Fixed Periodic Schedule — User Experience 4 min read Before a customer authorises a Fixed Periodic Schedule payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make recurring payments of a fixed amount at a set frequency. This page must accurately reflect the key details of the consent (payee, amount per payment, payment frequency, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Fixed Periodic Schedule — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Fixed Periodic Schedule Fixed Periodic Schedule — API Guide 5 min read A Fixed Periodic Schedule consent authorises a TPP to initiate one…",
    "headings": [
      "Fixed Periodic Schedule — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters — Fixed Periodic Schedule",
      "Example request"
    ],
    "body": `TPP · Banking · Service Initiation · Fixed Periodic Schedule Fixed Periodic Schedule — API Guide 5 min read A Fixed Periodic Schedule consent authorises a TPP to initiate one payment per period at a fixed amount over the lifetime of the consent. The user authorises once — approving a specific payment amount and the recurring period — and the TPP submits one payment per period without requiring re-authorisation each time. Common use cases include fixed monthly subscriptions, regular instalment collection, and recurring membership fees where the charge is always the same and payments follow a predictable calendar. Before initiating a Fixed Periodic Schedule payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . Set PeriodicSchedule.Type to "FixedPeriodicSchedule" . The payment amount is fixed at consent time via PeriodicSchedule.Amount — every POST /payments call under this consent must use exactly this amount, and only one payment may be submitted per period. authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year) 2027-03-02T00:00:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-03-03T10:00:00+00:00 BaseConsentId string (uuid) Links to prior consent if renewing — see Base Consent ID — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Payment controls — see below — PersonalIdentifiableInformation * string (JWE) Encrypted creditor and risk data — the encryptedPII string from Step 1 eyJhbGci... PaymentPurposeCode * string (3 chars) AANI payment purpose code ACM DebtorReference string Reference shown on the debtor's statement Subscription CreditorReference string Reference shown on the creditor's statement Subscription ControlParameters — Fixed Periodic Schedule ControlParameters.ConsentSchedule.MultiPayment carries the control definition. Set PeriodicSchedule.Type to "FixedPer`
  },
  {
    "title": "Fixed Periodic Schedule — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Functional Certification — Bank Data Sharing",
    "path": "/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Testing & Certification · Functional Certification Functional Certification — Bank Data Sharing 3 min read Functional Certification proves that your proposition consumes Bank Data…",
    "headings": [
      "Functional Certification — Bank Data Sharing 3 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Bank Data Sharing 3 min read Functional Certification proves that your proposition consumes Bank Data Sharing correctly: you request only the permissions your endpoints need, and you can retrieve that data from the AlTareq Model Bank. This page explains what evidence to gather; the portal then builds your submission for you. Start your submission ↗ Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Bank Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the data from the AlTareq Model Bank sandbox. The portal covers the Bank Data Sharing endpoints available to TPPs. Have the following ready: Use case — a sentence or two on why you consume this data (for example, powering a retail PFM product with the customer’s balances and transactions). Your consent (RAR object) — the authorization_details object you send at /par , and confirmation that its permissions align to the endpoints you consume. Postman evidence — for each endpoint you consume, a screenshot showing you retrieved that data from the sandbox Model Bank. Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type “ ” . Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Functional Certification — Confirmation of Payee",
    "path": "/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Testing & Certification · Functional Certification Functional Certification — Confirmation of Payee 3 min read Functional Certification proves that your proposition consumes…",
    "headings": [
      "Functional Certification — Confirmation of Payee 3 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Confirmation of Payee 3 min read Functional Certification proves that your proposition consumes Confirmation of Payee correctly: you resolve the LFI, submit a payee name and IBAN, and handle the name-match verdict the API Hub returns — both a full match and a no match — using the AlTareq Model Bank. This page explains what evidence to gather; the portal then builds your submission for you. Start your submission ↗ Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Confirmation of Payee it demonstrates that you can resolve the servicing LFI via POST /discovery , submit a payee name and IBAN to POST /confirmation , and correctly handle the NameMatchIndicator the API Hub returns — retrieved from the AlTareq Model Bank sandbox. For each segment you support (Retail with a personal name, SME and Corporate with a business name), you evidence a full match and a no match. Have the following ready: Requested name & IBAN — for each outcome, the payee name and IBAN you submitted. Use the account holder’s exact name for the full match, and a different name for the no match. Postman verdict screenshot — a screenshot from the Postman collection showing the /confirmation response with the expected NameMatchIndicator ( ConfirmationOfPayee.Yes for the full match, ConfirmationOfPayee.No for the no match), retrieved from the Model Bank. Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per scenario. Attach that ZIP to a Service Desk ticket with the Certification Type “ ” . Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Functional Certification — Domestic Payments (TPP)",
    "path": "/tech/tpp-standards/production/testing-certification/functional/domestic-payments/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Testing & Certification · Functional Certification Functional Certification — Domestic Payments 4 min read Functional Certification proves that your TPP initiates domestic…",
    "headings": [
      "Functional Certification — Domestic Payments 4 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Domestic Payments 4 min read Functional Certification proves that your TPP initiates domestic payments through the API Hub correctly. You tick the payment types you offer, and for each one provide the two objects your TPP is responsible for constructing — the Consent ( authorization_details ) you send at PAR and the Risk ( AERisk ) object you send for fraud scoring. You then evidence each type by making a payment against it on the sandbox Model Bank and attaching the Postman screenshot. This page explains the evidence; the portal then builds your submission for you. Start your submission ↗ Unlike the LFI side — which certifies one payment type per ticket — the TPP side is a single Domestic Payments submission covering every type you offer. All UAE Open Finance domestic payment types are available: Single Instant Payment, the six Multi-Payment variants, and Delegated SCA. You are the party that constructs the consent and the risk signals, so certification is about those two objects and a payment made against them — all evidenced from the AlTareq Model Bank sandbox using the Postman collection . Consent object — the authorization_details (RAR) entry you send at /par , edited in a schema-validated JSON editor. Each type is pre-seeded with a valid consent shape you adapt to your proposition. Risk object — the AERisk object you send for fraud scoring, also edited against the schema. A payment against that consent — a Postman screenshot of a POST /payments made against a consent of that type on the Model Bank. If you certify Delegated SCA ( IsDelegatedAuthentication: true ), you perform the customer authentication yourself before each payment. You additionally upload a screenshot of that authentication and describe how it populates the Authentication section of the Risk object — Risk.DebtorIndicators.Authentication (the factors used, the ChallengeOutcome , and the AuthenticationFlow ). A payment consent can also carry account and balance reads and a refund-account read. If your proposition uses them, tick the matching capability and evidence a balance read before the payment and a refund read after it, each with a Postman screenshot. Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed to your TPP. When you have selected your types and attached your evidence, the portal generates a single ZIP containing a summary document, the Consent and Risk JSON for each type, and every screenshot. Attach that ZIP to a Service Desk ticket. Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Functional Certification — Insurance Data Sharing",
    "path": "/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Testing & Certification · Functional Certification Functional Certification — Insurance Data Sharing 3 min read Functional Certification proves that your proposition consumes…",
    "headings": [
      "Functional Certification — Insurance Data Sharing 3 min read"
    ],
    "body": "Testing & Certification · Functional Certification Functional Certification — Insurance Data Sharing 3 min read Functional Certification proves that your proposition consumes Insurance Data Sharing correctly: you request only the permissions your endpoints need, across the insurance sectors you support, and you can retrieve that policy data from the AlTareq Model Insurer. This page explains what evidence to gather; the portal then builds your submission for you. Start your submission ↗ Functional Certification is one of the mandatory certification areas a TPP must satisfy before production access. For Insurance Data Sharing, it demonstrates that your consent requests only the permissions your proposition uses, that those permissions align to the endpoints you consume, and that you can retrieve the policy data from the AlTareq Model Insurer sandbox. This area certifies policy retrieval ( ReadInsurancePolicies ). Consuming the encrypted Premium field — a JWE gated by ReadInsurancePremium — has its own certification and is out of scope here. The portal covers the Insurance Data Sharing endpoints available to TPPs — a policy-collection and a policy-by-id endpoint per sector. Have the following ready: Use case — a sentence or two on why you consume this data (for example, aggregating a customer’s motor and health policies to power a coverage-comparison product). Your consent (RAR object) — the authorization_details object you send at /par , and confirmation that its per-sector permissions align to the endpoints you consume. Postman evidence — for each endpoint you consume, a screenshot showing you retrieved that policy data from the sandbox Model Insurer. Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not type them in. Sign in when the portal prompts you so your submission is attributed correctly. When you have filled in the form and attached your screenshots, the portal generates a single ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP to a Service Desk ticket with the Certification Type “ ” . Nothing is sent anywhere until you attach it — the submission is built entirely in your browser. Start your submission ↗"
  },
  {
    "title": "Get a Health Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/health-insurance-policies-InsurancePolicyId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get a Health Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Home Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/home-insurance-policies-InsurancePolicyId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get a Home Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Life Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/life-insurance-policies-InsurancePolicyId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get a Life Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Motor Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies-InsurancePolicyId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get a Motor Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Payment",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get a Payment",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a PaymentId from Idempotency Key",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get a PaymentId from Idempotency Key",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Renters Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/renters-insurance-policies-InsurancePolicyId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get a Renters Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get a Travel Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/travel-insurance-policies-InsurancePolicyId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get a Travel Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Account Details for a Refund",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Account Details for a Refund",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Accounts",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Accounts",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get an Employment Insurance Policy",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/employment-insurance-policies-InsurancePolicyId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get an Employment Insurance Policy",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Balances for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Balances for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Beneficiaries for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Beneficiaries for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Customer for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Customer for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Customers",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Customers",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Direct Debits for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Direct Debits for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Employment Insurance Policies",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/employment-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get Employment Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Health Insurance Policies",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/health-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get Health Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Home Insurance Policies",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/home-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get Home Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Life Insurance Policies",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/life-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get Life Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Motor Insurance Policies",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get Motor Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Product Configuration for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Product Configuration for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Renters Insurance Policies",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/renters-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get Renters Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Scheduled Payments for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Scheduled Payments for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Standing Orders for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Standing Orders for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Statements for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Statements for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Transactions for an Account",
    "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Get Transactions for an Account",
    "headings": [],
    "body": ""
  },
  {
    "title": "Get Travel Insurance Policies",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/travel-insurance-policies",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Get Travel Insurance Policies",
    "headings": [],
    "body": ""
  },
  {
    "title": "Getting Started for TPPs (Sandbox)",
    "path": "/tech/tpp-standards/v2.1/getting-started/",
    "category": "TPP Standards",
    "section": "Getting Started",
    "description": "TPP · Getting Started · Sandbox Getting Started for TPPs (Sandbox) 6 min read A guided walkthrough that takes you from a freshly onboarded sandbox application to a successful…",
    "headings": [
      "Getting Started for TPPs (Sandbox) 6 min read",
      "Install Postman",
      "Import the collection",
      "Configure mTLS certificates in Postman",
      "Prepare the requests for /par",
      "Stage the consent and redirect to the LFI",
      "Authenticate and authorize",
      "Exchange the authorization code for a token",
      "Initiate the payment",
      "Retrieve the Payment ID and status"
    ],
    "body": "TPP · Getting Started · Sandbox Getting Started for TPPs (Sandbox) 6 min read A guided walkthrough that takes you from a freshly onboarded sandbox application to a successful end-to-end payment, using the Postman collection and the included O3 sandbox utilities. You are onboarded to the sandbox Trust Framework. If not, see Trust Framework Onboarding . Fill in the values below using an Application (Client) you have created in the Sandbox Trust Framework . Install Postman Download Postman from postman.com/downloads . Launch Postman and sign in (or create a free account). Import the collection In Postman, click Import (top left). Select the downloaded .json file. The collection will appear in your Collections sidebar. Configure mTLS certificates in Postman Open Postman settings: gear icon (top right) → Settings → Certificates tab. Click Add Certificate . Enter the host of the LFI Discovery URL, e.g. *.altareq1.sandbox.apihub.openfinance.ae or *.[LFI CODE].preprod.apihub.openfinance.ae . Leave port blank (defaults to 443). Attach CRT : client_transport.pem . Attach KEY : client_transport.key . Save the certificate entry. Test by registering Send a request to the TPP's registration endpoint. A 204 (No Content) response confirms the certificate is correctly attached. Note: if you are testing multiple LFIs in sandbox/pre-prod you may need to change the host in the Add Certificate step. Prepare the requests for /par Navigate to the Auth Flow folder within Single Instant Payment and run the three O3 utility requests in order: Send O3 Util: Prepare Encrypted PII — encrypts the PII payload required for the consent. Send O3 Util: Prepare Request Object JWT — builds the signed request object for the /par call. Send O3 Util: Prepare Private Key JWT — creates the client assertion used for authentication. Stage the consent and redirect to the LFI Send the POST /par request to stage the payment consent. Click Visualize in the Postman response panel — this renders the response as a clickable redirect link. Copy the link and open it in a browser to start the authorization redirect to the LFI. Authenticate and authorize Authenticate with the LFI. If you are using the Model Bank , the sandbox credentials are: Username Password Select the account to debit and authorize the payment consent. Exchange the authorization code for a token After the LFI redirects back to your redirect_uri , the URL will contain a code query parameter. Copy the code value from the redirect URL. Set it as the authorizationCode collection variable in Postman. Send the token request to exchange the code for an access token. Initiate the payment Navigate to the Payments folder and run the O3 utility requests, then submit the payment: Send O3 Util: Prepare Encrypted PII — encrypts the payment PII . Send O3 Util: Prepare Request Object JWT for SIP — builds the signed request object for the payment. Send POST /payments . A 201 response confirms the payment was successfully initiated. Retrieve the Payment ID and status Decode the JWT received in the POST /payments response to retrieve the PaymentId and Status . The status will typically start as Pending ."
  },
  {
    "title": "Handling Authorization Callbacks",
    "path": "/tech/tpp-standards/security/fapi/handling-callback",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · FAPI · Callbacks Handling Authorization Callbacks 2 min read After the user approves (or declines) consent at the LFI, the Authorization Server redirects them back to…",
    "headings": [
      "Handling Authorization Callbacks 2 min read"
    ],
    "body": "Security · FAPI · Callbacks Handling Authorization Callbacks 2 min read After the user approves (or declines) consent at the LFI, the Authorization Server redirects them back to your registered redirect_uri . How you handle this callback is security-critical — mistakes here can allow CSRF attacks, token theft, and authorization code replay. The callback URL will be of the form: Parameter Description code The authorization code to exchange at /token . Single-use and short-lived state The value you sent in the Request JWT — must match what you stored before redirecting iss The issuer of the Authorization Server that issued the code Confirm that the state value returned in the callback matches the one you set in your Request JWT . This protects against CSRF (Cross-Site Request Forgery) attacks where a malicious page triggers an unintended authorization. Check that the iss parameter matches the Authorization Server you sent the /par request to. This ensures the response comes from the expected LFI and not a confused deputy or misconfigured redirect. Authorization codes are single-use and short-lived — typically valid for only a few minutes. Exchange the code immediately upon receipt. Exchange the code at /token within seconds of receiving it — do not queue or defer Do not accept callbacks that arrive long after the authorization request was initiated Once a code has been exchanged successfully, treat it as consumed and reject any attempt to use it again Store a timestamp when you send the user to /par . In your callback handler, reject any callback where too much time has elapsed since that timestamp (e.g. more than 10 minutes), even if state is otherwise valid. When handling the callback, execute only the minimum necessary logic: Validate state and iss Exchange the code for tokens at /token Store tokens securely Redirect the user to the next step in your application flow Avoid running complex business logic, sending external requests (other than /token ), or initiating sensitive operations at this stage. A failed or slow callback should not leave the user in an inconsistent state. If validation fails or the code exchange returns an error, show the user a clean error message and discard all parameters from the callback. Do not log authorization codes or tokens. On a successful POST /token (HTTP 200), the Authorization Server returns not only the access_token and refresh_token but also the Consent object, including its current Status . See the token endpoint reference for details: CreateAccessTokenRequestV21 (OpenAPI: docs/public/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml , schema AEAuthorizationEndpointsV21.AEAuthorizationCodeGrantTokenResponseProperties ). Example response: Because access to resources requires both a valid access token and an authorized consent, the TPP can determine from this response whether resource access is permitted. In most flows the consent status will be Authorized . However, for payment (Bank Service Initiation) consents that support and require multi-authorization, the consent status may instead be AwaitingAuthorization , indicating the first authorizer has approved but additional authorizers are still required before a payment can be made."
  },
  {
    "title": "Insurance",
    "path": "/tech/tpp-standards/v2.1/insurance/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP Standards · v2.1 · Insurance Insurance 2 min read The Open Finance Insurance capabilities enable secure, consent-driven access to a customer’s insurance policy data across the…",
    "headings": [
      "Insurance 2 min read",
      "Which LFIs are live for Insurance",
      "Browse the Insurance capabilities"
    ],
    "body": 'TPP Standards · v2.1 · Insurance Insurance 2 min read The Open Finance Insurance capabilities enable secure, consent-driven access to a customer’s insurance policy data across the UAE’s major insurance sectors. These services empower licensed third-party providers (TPPs) to deliver policy aggregation, switching, advisory, and value-added digital insurance services. All services are provided with strict consent management, granular permission scopes, and full auditability. Live ecosystem Which LFIs are live for Insurance LFIs currently exposing any Insurance API resource in the Open Finance directory. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently exposing Insurance APIs in the directory. 0" class="ed-landing__live-cta" href="/program/whats-live" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Capabilities Browse the Insurance capabilities The full set of capability areas covered by the TPP Insurance standards. Open →'
  },
  {
    "title": "Insurance Data Sharing",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Insurance · TPP capability Insurance Data Sharing 2 min read The Open Finance Insurance Data Sharing capabilities enable secure, consent-driven access to a customer’s insurance…",
    "headings": [
      "Insurance Data Sharing 2 min read",
      "Insurance Service Provider",
      'Coverage matrix Insurance types covered Each insurance type has its own pair of endpoints — a list endpoint and a per-policy detail endpoint. An LFI exposes the endpoints for the types it underwrites. Insurance Type List policies Get a policy / -insurance-policies GET GET Live ecosystem Which LFIs are live for Insurance Data Sharing LFIs currently exposing any Insurance API resource in the Open Finance directory. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently exposing Insurance APIs in the directory. 0" class="ed-landing__live-cta" href="/program/whats-live" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Insurance Data Sharing API. Requirements Insurance Data Sharing — Requirements',
      "Insurance Data Sharing — API Guide",
      "Insurance Data Sharing — User Journeys"
    ],
    "body": 'Insurance · TPP capability Insurance Data Sharing 2 min read The Open Finance Insurance Data Sharing capabilities enable secure, consent-driven access to a customer’s insurance policy data across the UAE’s major sectors. These services empower licensed third-party providers (TPPs) to deliver policy aggregation, switching support, broking, claims assistance, and value-added digital insurance services. All data access operates under explicit customer consent, with granular permission scopes, strict expiry controls, and full auditability. Access control Required role ISP Insurance Service Provider Access to the Insurance Data Sharing APIs requires the ISP role. This role must be assigned to your application in the Trust Framework before making any insurance policy requests. See Roles for the full list of scopes and grant types this role permits. What Insurance Data Sharing covers Coverage matrix Insurance types covered Each insurance type has its own pair of endpoints — a list endpoint and a per-policy detail endpoint. An LFI exposes the endpoints for the types it underwrites. Insurance Type List policies Get a policy / -insurance-policies GET GET Live ecosystem Which LFIs are live for Insurance Data Sharing LFIs currently exposing any Insurance API resource in the Open Finance directory. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently exposing Insurance APIs in the directory. 0" class="ed-landing__live-cta" href="/program/whats-live" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Insurance Data Sharing API. Requirements Insurance Data Sharing — Requirements Validation rules and behaviour every Insurance Data Sharing endpoint must follow. Open → API Guide Insurance Data Sharing — API Guide Implementation walkthrough — consent, redirect, token exchange, calling the policy endpoints, and decrypting the premium JWE. Open → User Journeys Insurance Data Sharing — User Journeys The end-to-end flows your customer experiences when sharing insurance data through your application. Open → Endpoint OpenAPI reference for the endpoint. Open spec →'
  },
  {
    "title": "Insurance Data Sharing — API Guide",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP · Insurance · Data Sharing Insurance Data Sharing — API Guide 5 min read Create an Insurance Data Sharing consent, redirect the user to authenticate at their LFI, exchange the…",
    "headings": [
      "Insurance Data Sharing — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "Permissions entry | authorization_details.consent.Permissions[*]",
      "OpenFinanceBilling (Required) | authorization_details.consent.OpenFinanceBilling",
      "OnBehalfOf (Optional) | authorization_details.consent.OnBehalfOf",
      "subscription (Optional) | authorization_details.subscription",
      "Webhook (Required) | authorization_details.subscription.Webhook",
      "Example request"
    ],
    "body": "TPP · Insurance · Data Sharing Insurance Data Sharing — API Guide 5 min read Create an Insurance Data Sharing consent, redirect the user to authenticate at their LFI, exchange the authorization code for tokens, and call the policy APIs — an end-to-end walkthrough of the customer-present insurance data-sharing flow. Before creating an Insurance Data Sharing consent, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the ISP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Valid Encryption Certificate — required to decrypt the Premium JWE when the customer has granted ReadInsurancePremium . See Encrypted Premiums . Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI for which you intend to create an Insurance Data Sharing consent. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Consents — you should understand how to create, retrieve, and manage consents, including consent states and lifecycle transitions. POST /par To send a /par request, first we need to generate the request JWT . We do this by first constructing authorization_details of type ( urn:openfinanceuae:insurance-consent:v2.1 ). authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:insurance-consent:v2.1 urn:openfinanceuae:insurance-consent:v2.1 consent * object Properties of the consent agreed by the User with the TPP. Described below. Described below subscription object Optional subscription to Event Notifications, to be sent to the TPP Webhook Url. Described below. Described below consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) 123e4567-e89b-12d3-a456-426614174001 BaseConsentId string (uuid) Used when renewing or modifying an existing consent 123e4567-e89b-12d3-a456-426614174000 Permissions * array<object> One entry per insurance sector being consented — described below Described below ExpirationDateTime * date-time Expiry date/time (ISO 8601 with timezone, max 1 year) 2025-11-03T15:46:00+00:00 OpenFinanceBilling * object Billing parameters specified by the TPP. Described below. Described below OnBehalfOf object Provided when TPP is acting for another regulated entity. Described below. Described below Permissions entry | authorization_details.consent.Permissions[*] Field Type Allowed Values InsuranceType * enum Employment , Health , Home , Life , Motor , Renters , Travel Permissions * array<enum> ReadInsurancePolicies , ReadCustomerBasic , ReadCustomerDetail , ReadCustomerPaymentDetails , ReadInsuranceProduct , ReadCustomerClaims , ReadInsurancePremium OpenFinanceBilling (Required) | authorization_details.consent.OpenFinanceBilling Field Type Allowed Values Example UserType * enum Retail , SME , Corporate Retail Purpose * enum AccountAggregation , RiskAssessment , TaxFiling , Onboarding , Verification , QuoteComparison , BudgetingAnalysis , FinancialAdvice , AuditReconciliation QuoteComparison OnBehalfOf (Optional) | authorization_details.consent.OnBehalfOf Field Type Description Example TradingName string Trading name if acting on behalf of another entity Acme Ltd LegalName string Legal name of represented entity Acme Legal Name IdentifierType enum Only Other currently supported Other Identifier string Identifier value 9876543210 subscription (Optional) | authorization_det"
  },
  {
    "title": "Insurance Data Sharing — Encrypted Premiums",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP · Insurance · Data Sharing · API Guide Encrypted Premiums 5 min read When a TPP holds the ReadInsurancePremium permission and calls any /{type}-insurance-policies endpoint,…",
    "headings": [
      "Encrypted Premiums 5 min read",
      "Example response — cleartext",
      "Example response — encrypted JWE"
    ],
    "body": "TPP · Insurance · Data Sharing · API Guide Encrypted Premiums 5 min read When a TPP holds the ReadInsurancePremium permission and calls any /{type}-insurance-policies endpoint, the LFI MAY return the Premium field as an encrypted JWE rather than a structured object. The TPP MUST present the premium to the customer without the unencrypted value ever reaching or being stored on its servers — decryption happens locally on the customer’s device. The Premium field on every insurance policy response is defined as anyOf a structured AEInsuranceDataSharingPremiumProperties object or an AEInsurancePremiumJWE compact string. Each LFI decides, per policy, whether to return the premium in cleartext or as an encrypted JWE. A TPP holding ReadInsurancePremium MUST therefore be ready for either shape on every call. Cleartext — Premium is a JSON object containing PremiumAmountExcludingVAT , PremiumVATAmount , TotalPremiumAmount , Currency , and PremiumFrequency . Render directly. No special handling required. Encrypted (JWE) — Premium is a compact JWE string. The TPP server MUST forward this opaque string to the customer’s device without inspecting, logging, or persisting it. Decryption happens in the browser or mobile app using key material tied to the customer’s authenticated session. Some insurers treat the premium as commercially sensitive — in particular for switching and quote-comparison use cases where premium parity is a competitive lever. The encrypted JWE shape lets the premium flow through the TPP to the customer’s screen without the TPP ever holding the cleartext value. A consent that includes ReadInsurancePremium for the relevant InsuranceType — this permission MUST be present in the per-sector block of authorization_details.consent.Permissions when the TPP creates the consent. See Constructing Authorization Details . The Access Encrypted Resource Data optional certification — before requesting ReadInsurancePremium on a live LFI, the TPP MUST hold this certification with Nebras. See Access Encrypted Resource Data . A valid access token and the standard FAPI headers — x-fapi-interaction-id , x-fapi-auth-date , and x-fapi-customer-ip-address . See Request Headers . GET /{type}-insurance-policies/{InsurancePolicyId} Premium values are returned on the per-policy detail endpoint. Use an InsurancePolicyId obtained from a prior GET /{type}-insurance-policies call (Step 8 of the API Guide ) and request the detailed policy. Whether the LFI returns cleartext or an encrypted JWE for Premium , the request itself is unchanged. Make the call as you would for any other Insurance Data Sharing endpoint: Example response — cleartext Example response — encrypted JWE Apart from Premium , every other field on the policy is returned in cleartext in both shapes — PolicyNumber , PolicyStatus , Insurer , dates, coverage, riders, and so on. Only Premium is ever encrypted. If Premium is a JSON object, render its fields directly. If it is a string, treat it as an opaque compact JWE and forward it to the customer’s browser or mobile app. The TPP server MUST NOT attempt to decrypt the JWE, parse its header beyond detecting the string type, log its contents, or persist it. The encrypted JWE is opaque to the TPP. Pass it through to the customer device and discard the server-side copy as soon as the response is sent. Do not write the JWE to application logs, request traces, or analytics pipelines — even though it is encrypted, persisting it would put the TPP in scope of the encrypted-data handling requirements documented in Access Encrypted Resource Data . Decryption MUST run on the customer’s device — the cleartext premium MUST NOT be sent to the TPP server or any third party. The mechanism mirrors the Bank Data Sharing encrypted-rate flow described in Encrypted FinanceRates ; use the same JOSE-library pattern, keep the OTP/key material in browser memory only, and discard the decrypted premium when the customer navigates away. The decrypted Premium object MUST s"
  },
  {
    "title": "Insurance Data Sharing — Functional Certification Submission",
    "path": "/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/submission",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Functional Certification · Insurance Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New…",
    "headings": [
      "Build your submission"
    ],
    "body": "Functional Certification · Insurance Data Sharing Build your submission Complete each step, attach your evidence, and download a ZIP to attach to your Service Desk ticket. New here? Read what Functional Certification involves first."
  },
  {
    "title": "Insurance Data Sharing — Requirements",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/requirements",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Insurance Data Sharing — User Experience",
    "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/user-journeys",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Insurance · Data Sharing · UX Insurance Data Sharing — User Experience 2 min read Before a customer is redirected to Open Finance to consent to Insurance Data Sharing, you must…",
    "headings": [
      "Insurance Data Sharing — User Experience 2 min read"
    ],
    "body": "Insurance · Data Sharing · UX Insurance Data Sharing — User Experience 2 min read Before a customer is redirected to Open Finance to consent to Insurance Data Sharing, you must present a Consent Page that clearly explains what the customer is consenting to and collects their explicit, informed consent. The page must accurately reflect each insurance type requested and the permissions selected within it. The interactive wireframe below defines the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the consent content, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the authorization_details object below and watch the wireframes above update live. Each entry in consent.Permissions is an InsuranceType paired with the permissions requested for it — add, remove, or change types to see how the pages respond."
  },
  {
    "title": "Insurance Quotation",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Insurance · TPP capability Insurance Quotation 3 min read The Insurance Quotation capabilities let TPPs request quotes from LFIs on behalf of customers, drive the application…",
    "headings": [
      "Insurance Quotation 3 min read",
      "Insurance Service Provider",
      "Coverage matrix Insurance types covered All seven insurance sectors expose the same four endpoints. Where an LFI does not underwrite a given sector, the Hub returns 404 for that path. Insurance Type Create Quote Retrieve / Accept Quote Create Policy / -insurance-quotes POST GET / PATCH POST Section contents Browse this section The full set of pages for the Insurance Quotation API on the TPP side. Requirements Insurance Quotation — Requirements",
      "New, Renewal & Switch",
      "Insurance Quotation — API Guide",
      "Insurance Quotation — User Journeys"
    ],
    "body": "Insurance · TPP capability Insurance Quotation 3 min read The Insurance Quotation capabilities let TPPs request quotes from LFIs on behalf of customers, drive the application through to policy issuance, and receive real-time status updates — across all seven major insurance sectors. The flow runs on the Client Credentials Grant: no per-customer consent is required at the Hub. Access control Required role ISP Insurance Service Provider Access to the Insurance Quotation APIs requires the ISP role. This role must be assigned to your application in the Trust Framework before making any quote requests. See Roles for the full list of scopes and grant types this role permits. What Insurance Quotation covers Coverage matrix Insurance types covered All seven insurance sectors expose the same four endpoints. Where an LFI does not underwrite a given sector, the Hub returns 404 for that path. Insurance Type Create Quote Retrieve / Accept Quote Create Policy / -insurance-quotes POST GET / PATCH POST Section contents Browse this section The full set of pages for the Insurance Quotation API on the TPP side. Requirements Insurance Quotation — Requirements Validation rules your TPP must follow when creating quotes, accepting, submitting KYC, subscribing to events, and creating policies. Open → Quote Types New, Renewal & Switch The semantic differences between the three QuoteType values and the per-type field requirements. Shared explainer linked from both LFI and TPP guides. Open → API Guide Insurance Quotation — API Guide End-to-end walkthrough of the LFI-Led and TPP-Led flows, the webhook subscription mechanism, and the full Insurance Quote Event schema you receive on status changes. Open → User Journeys Insurance Quotation — User Journeys The end-to-end customer flow in your TPP app — quote selection, KYC collection (TPP-Led), payment redirect, and policy document presentation. Open →"
  },
  {
    "title": "Insurance Quotation — API Guide",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/api-guide/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP · Insurance · Quotation Insurance Quotation — API Guide 8 min read End-to-end walkthrough of the Insurance Quotation flow from the TPP perspective. The flow runs on the Client…",
    "headings": [
      "Insurance Quotation — API Guide 8 min read",
      "The LFI hosts the customer through completion",
      "You collect KYC; the LFI hosts only payment",
      "Subscription object",
      "Updating the subscription mid-lifecycle",
      "1. Pending Completion Status",
      "2. Completed Status",
      "3. Terminal Status",
      "PolicyIssued with documents (TPP-Led)",
      "Document object",
      "Verification"
    ],
    "body": 'TPP · Insurance · Quotation Insurance Quotation — API Guide 8 min read End-to-end walkthrough of the Insurance Quotation flow from the TPP perspective. The flow runs on the Client Credentials Grant — no per-customer consent journey. After accepting a quote, you can subscribe to webhook events to receive status updates without polling. This page covers the subscription mechanism and the full event schema; the per-mode pages walk through the specific call sequences. LFI-Led The LFI hosts the customer through completion Single-PATCH accept flow. Your app collects quote inputs, the LFI hosts everything from acceptance through to issuance. You observe progress via webhook events or polling. Open → TPP-Led You collect KYC; the LFI hosts only payment Two-PATCH flow. You submit KYC, the LFI returns a payment URL via webhook event, you redirect the customer to pay, then deliver documents in your app. Open → When you PATCH a quote to accept it, you can attach a Subscription.Webhook object to register for event notifications. The Hub will POST status events to your registered URL whenever the LFI emits a quote-log update. Subscribing once on accept covers the entire lifecycle — you do not need to re-subscribe for each status. The webhook delivery surface is documented in Insurance Quote Status Event — API Guide , with the OpenAPI schema at Insurance Quote Status Change Event . Subscription object Field Type Required Description Webhook.Url string (HTTPS URL) On first registration Your HTTPS endpoint that will receive event POSTs. Must match ^https://.+ . Webhook.IsActive boolean Always true enables delivery; false pauses without removing the URL. Updating the subscription mid-lifecycle You can PATCH the quote again at any time with only a Subscription object to update or pause webhook delivery. Omit the Data field; the LFI will not treat this as a re-acceptance. If you do not register a webhook, poll GET /{type}-insurance-quotes/{QuoteId} to retrieve the current status. Do not exceed one request per minute under normal load — the Hub may rate-limit aggressive polling. Webhooks are strongly preferred. Every event delivered to your webhook conforms to one of three schemas, drawn from the API Hub Consent Manager spec. The QuoteStatus field identifies which schema applies. 1. Pending Completion Status Sent when the quote is making progress but not yet final. QuoteStatus is one of: ApplicationPending , ApplicationApproved , PaymentRequired , PolicyIssued . Field Required Notes QuoteStatus Always One of the pending-completion enum values above. BrokerInstructions[] When LFI requires TPP action Each entry: ActionRequired (text), Reason (text), Url (e.g. payment URL). Documents[] On PolicyIssued in TPP-Led mode Base64-encoded policy documents with SHA-256 hashes. See "Documents" below. 2. Completed Status Final event for a successful flow. QuoteStatus: Completed . Carries the finalised premium, policy term, and commission information. No further events follow. Field Required Notes QuoteStatus Always Always "Completed" . PolicyTerm Always ISO 8601 duration, e.g. P1Y , P2Y3M . Premium Always Object with OneYearPremiumExcludingVAT , VATAmount , TotalOneYearPremium , and (optionally) TotalPolicyPremium . CustomerPaidInFull Always Boolean indicating full payment was received. PolicyCountrySubDivision Always UAE Emirate where the policy was issued. PolicyStartDate / PolicyEndDate Recommended ISO 8601 date. CustomerSalary Required for Health Under4K or Over4K (AED/month). Commission When TPP commission applies CommissionAmount + PaymentMethod ( DirectToTPP or ThroughAPIHub ). Documents[] Optional Final policy documents if not already delivered on PolicyIssued . 3. Terminal Status Negative terminal events. QuoteStatus is one of: Expired , Rejected , CustomerCancelled , LFICancelled . No further events follow. Field Required Notes QuoteStatus Always One of the four terminal enum values. Reason Optional Free-text (1–1000 chars) explaining the termination '
  },
  {
    "title": "Insurance Quotation — LFI-Led Flow",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/api-guide/lfi-led",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP · Insurance · Quotation · LFI-Led LFI-Led Flow 6 min read You collect quote inputs in your app and hand the customer to the LFI on accept. The LFI hosts customer verification,…",
    "headings": [
      "LFI-Led Flow 6 min read"
    ],
    "body": 'TPP · Insurance · Quotation · LFI-Led LFI-Led Flow 6 min read You collect quote inputs in your app and hand the customer to the LFI on accept. The LFI hosts customer verification, payment, and document delivery. Your role after acceptance is to observe status events — either via webhook subscription or polling — and surface progress to the customer. Authenticate with the Client Credentials Grant using a signed client assertion. Request the insurance scope. The returned access_token is valid for all Insurance Quotation calls until expiry. There is no per-customer token in this flow. Send the quote request as an application/jwt signed Request JWT. The body carries a QuoteReference you generate (for your own tracking), a QuoteType of New , Renewal , or Switch , and sector-specific risk and policy holder data. The LFI returns 201 with one or more quotes, or 204 if it declines to quote. Each entry includes a QuoteId (LFI-minted) you use for subsequent calls. QuoteId is the LFI’s identifier — required for every subsequent call. QuoteReference is your own tracking identifier, echoed back by the LFI so you can correlate quotes to your internal session. Persist both. Customer picks a quote in your UI. PATCH the chosen QuoteId with the accept data and a Subscription.Webhook object if you want event notifications. Send as a signed application/jwt . In LFI-Led mode the LFI responds 204 No Content . The customer is now in the LFI’s hosted journey. Your app should surface a "your application is being processed" state and wait for the first event. The mechanism for handing the customer off depends on the LFI — typically a hosted application URL returned at quote creation time or out-of-band. From this point until the PolicyIssued event, the customer interacts with the LFI’s screens, not yours. Your app receives ApplicationPending (and any interim status updates the LFI emits) through the webhook. Surface them in the customer’s timeline so they can re-enter your app and see where their application has reached. Events arrive at your webhook in this typical order: ApplicationPending — LFI has registered the application. (optional intermediate events with BrokerInstructions ) — LFI surfacing status the customer needs to see. PolicyIssued — carries the InsurancePolicyId . Completed — finalised premium, term, and commission. Terminal event. Verify each event’s signature and dedupe by QuoteId . The PolicyIssued event in LFI-Led mode carries only InsurancePolicyId — the LFI has delivered the policy documents directly to the customer through its hosted journey. After the customer has progressed through the LFI’s hosted KYC and payment, your app calls POST to formally create the policy resource. In LFI-Led mode the body is minimal — just the QuoteId . The LFI runs its issuance and responds 201 Created . The final InsurancePolicyId arrives via the PolicyIssued webhook event, not in this response body. Retries are safe: the LFI is required to return the same policy reference for the same QuoteId . On the Completed event, finalise the customer-facing timeline: policy is live, documents are with the customer (delivered by the LFI), and any commission owed is being processed via Commission.PaymentMethod . Manage subscription lifecycle in your own systems — you can let the subscription lapse (it’s tied to the QuoteId ) or PATCH with IsActive: false if you explicitly want to stop delivery (for example, before deprovisioning a webhook URL).'
  },
  {
    "title": "Insurance Quotation — Requirements",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/requirements",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Insurance Quotation — TPP-Led Flow",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/api-guide/tpp-led",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP · Insurance · Quotation · TPP-Led TPP-Led Flow 8 min read You collect quote inputs, KYC, and surface the LFI’s hosted payment URL to the customer inside your own app. Document…",
    "headings": [
      "TPP-Led Flow 8 min read",
      "Hash verification"
    ],
    "body": "TPP · Insurance · Quotation · TPP-Led TPP-Led Flow 8 min read You collect quote inputs, KYC, and surface the LFI’s hosted payment URL to the customer inside your own app. Document delivery also lives with you. The LFI handles underwriting, payment hosting, and policy issuance; your TPP is the customer-facing surface for everything else. Obtain a Client Credentials token ( insurance scope) and POST the quote request exactly as in LFI-Led . The mode is not declared on Create Quote — it’s determined by the LFI’s response to PATCH Accept. Customer picks a quote; PATCH it with the accept data and your Subscription.Webhook . The LFI’s response signals whether the flow is TPP-Led: a 200 response with data.PolicyIssuanceAllowed means you are responsible for the steps listed as true . All three flags true is the full TPP-Led mode. You MUST honour the declaration — do not perform a step set to false even if you can technically do so. After ApplicationPending arrives, collect the customer’s KYC in your app (see User Journeys — KYC capture for the screens to present). Submit by PATCHing the same quote endpoint a second time with the gathered data. The body conforms to the sector’s accept-quote schema. Required fields vary by sector — consult the OpenAPI spec . If KYC fails, you receive 400 with a descriptive message; surface it to the customer and allow retry. The LFI processes KYC asynchronously and, on success, emits ApplicationApproved with a BrokerInstructions[].Url pointing at its hosted payment page. Redirect the customer to BrokerInstructions[0].Url . They pay on the LFI’s page; the LFI redirects them back to a return URL you nominated when configuring your webhook or out-of-band with the LFI. Do not cache, log, or replay the URL. If the customer abandons and returns, request a fresh URL by asking the LFI to re-emit (typically via your support process or by re-triggering the flow). The LFI will emit a new PaymentRequired event. After payment confirmation (which you can correlate with the customer’s return from the LFI’s payment page or by waiting for the LFI’s next status event), call POST /{type}-insurance-policies with the QuoteId . The body is similar to the KYC submission but represents the formal policy creation request. The LFI runs its issuance and responds 201 . The InsurancePolicyId and policy documents arrive in the subsequent PolicyIssued event — not in this response body. In TPP-Led mode the PolicyIssued event carries every customer-facing document the LFI would normally deliver itself. Verify each Hash against the decoded Content before presenting to the customer. Hash verification If a document’s computed hash does not match the supplied Hash , treat the document as corrupt or tampered. Do not surface it to the customer. Log the x-fapi-interaction-id from the event delivery, raise a support ticket including that ID and the QuoteId , and request the LFI re-emit the event. On Completed , finalise the policy in your records, surface it as live to the customer, and reconcile any commission against the event’s Commission block. PaymentMethod: ThroughAPIHub means the Hub will route payment to you; the commission and timing are governed by the AlTareq Commercial and Pricing Model . No further events follow. You can let the subscription lapse, or explicitly PATCH the quote with IsActive: false if you prefer to clean up — though no further events would be sent regardless."
  },
  {
    "title": "Insurance Quotation — User Journeys",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/user-journeys",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Insurance · Quotation · TPP screens User Journeys 4 min read The customer-facing flow in your TPP application, broken down by mode. Insurance Quotation has no Hub-mediated consent…",
    "headings": [
      "User Journeys 4 min read",
      "Screens in your app",
      "Where the flow forks",
      "Screens in your app",
      "Screens in your app",
      "Screens in your app"
    ],
    "body": `Insurance · Quotation · TPP screens User Journeys 4 min read The customer-facing flow in your TPP application, broken down by mode. Insurance Quotation has no Hub-mediated consent journey — the screens below are entirely yours to design (LFI-Led: minimal handoff; TPP-Led: full application capture before redirect to the LFI for payment). Regardless of mode, you collect the data needed to request quotes in your own UI: sector, QuoteType , sector-specific risk data (vehicle, property, trip, etc.), and customer identifiers. POST /{type}-insurance-quotes may return one or more quotes from each LFI; present them so the customer can compare and choose. Screens in your app Quote inputs — collect sector, QuoteType , and sector-specific risk inputs. Validate locally before submission. Quote comparison — render the returned quotes. Surface premium, coverage, exclusions, and any sector-specific selling points. Indicate which LFI declined (received 204 ) so the customer is not left wondering. Quote acceptance — the customer picks one quote. Confirm the selection before sending the PATCH Accept Quote. PATCH /{type}-insurance-quotes/{QuoteId} carries both the accept payload and (optionally) a Subscription.Webhook object. Subscribe at accept time so you receive every subsequent status change — ApplicationPending through Completed — on your webhook endpoint without polling. Where the flow forks LFI-Led mode — the response is 204 . The customer is handed to the LFI for KYC, payment, and document delivery. Your app waits for status events (or returns control to the customer with a "we\\'ll let you know when your policy is ready" screen). TPP-Led mode — the response is 200 with PolicyIssuanceAllowed declaring you handle CustomerVerification , Payment , and/or PolicyDocuments . Continue in your app with KYC capture. For TPP-Led quotes where PolicyIssuanceAllowed.CustomerVerification: true , your app collects the customer\\'s KYC data — Emirates ID, address, occupation, etc., per the sector\\'s accept-quote schema — and submits it via a second PATCH on the same quote endpoint. Screens in your app Identity capture — Emirates ID front/back scan or manual entry. UAE PASS integration is encouraged where available. Declarations — any sector-specific declarations the LFI requires (claims history, smoking status for Life/Health, named drivers for Motor, etc.). Review & submit — surface the gathered data for the customer to confirm before transmission. This submission is treated as the customer\\'s instruction to proceed. After the LFI emits ApplicationApproved on the quote-log (delivered to your webhook or visible via polling), the event carries a BrokerInstructions.Url . This is the LFI\\'s hosted payment page. Redirect the customer to it; payment is collected by the LFI. Screens in your app Handoff confirmation — a short screen explaining the customer is being taken to the insurer\\'s secure payment page. Show the LFI brand so the customer recognises where they\\'re going. Return landing — the LFI redirects the customer back to a URL you control after payment. Show a "your policy is being finalised" state until the PolicyIssued / Completed events arrive. The BrokerInstructions.Url is single-use and time-bound. Do not store, log, or replay it. If the customer abandons and returns later, request a fresh URL from the LFI (typically via a new PaymentRequired event) rather than reusing the stale one. On PolicyIssued , you receive the policy reference and (in TPP-Led mode) the full set of policy documents as base64-encoded Documents entries. Verify each document\\'s SHA-256 hash, then present them to the customer. Screens in your app Policy summary — the issued policy with key terms surfaced (sums insured, premium, coverage dates, beneficiaries). In LFI-Led mode you receive an InsurancePolicyId ; in TPP-Led mode the documents themselves are authoritative. Document downloads — Policy Booklet, Terms & Conditions, IPID, etc. Allow the customer to download each PDF and o`
  },
  {
    "title": "Insurance Quote Status Change Event",
    "path": "/tech/tpp-standards/v2.1/webhooks/insurance-status/open-api",
    "category": "TPP Standards",
    "section": "Webhooks",
    "description": "Webhooks — Insurance Quote Status Change Event",
    "headings": [],
    "body": ""
  },
  {
    "title": "Insurance Quote Status Event — API Guide",
    "path": "/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide",
    "category": "TPP Standards",
    "section": "Webhooks",
    "description": "Webhooks · Insurance Quote Status Insurance Quote Status Event — API Guide 3 min read When you accept an insurance quote with a Subscription.Webhook attached, the API Hub delivers…",
    "headings": [
      "Insurance Quote Status Event — API Guide 3 min read"
    ],
    "body": "Webhooks · Insurance Quote Status Insurance Quote Status Event — API Guide 3 min read When you accept an insurance quote with a Subscription.Webhook attached, the API Hub delivers an Insurance Quote Status Event to your registered URL each time the LFI emits a quote-log update. Events flow through the full lifecycle from ApplicationPending to a terminal state. Before receiving an Insurance Quote Status Event, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the ISP role as defined in Roles . Valid Encryption Certificate — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. Accepted quote with a Subscription.Webhook — the webhook is registered per-quote on PATCH Accept (see Insurance Quotation API Guide ). Insurance Quotation does not use a per-customer consent. The webhook subscription is attached to the quote itself when you PATCH Accept. From that point, every time the LFI emits a status to PATCH /insurance-quote-log/{logId} , the Hub delivers an Insurance Quote Status Event to your registered Webhook.Url as a JWE-encrypted POST. The JWE is encrypted using your public Encryption Certificate . You must respond with 202 Accepted immediately and decrypt the event payload asynchronously. Attach a Subscription.Webhook object to the PATCH Accept Quote body. The subscription covers the entire lifecycle of the quote — you do not need to re-subscribe for each status. Update or pause delivery mid-flow by PATCHing again with only a Subscription object (omit Data ). The Hub POSTs the event to your Webhook.Url with Content-Type: application/jwe . Respond 202 Accepted with an empty body immediately — process the payload asynchronously. Failure to respond with 202 promptly may cause the Hub to retry delivery. Treat events as idempotent — the same event may arrive more than once. The event is a JWE compact serialisation encrypted with your registered Encryption Certificate . The JWE header contains a kid that identifies which of your keys to use — decode the header first to select the correct private key, then decrypt. See Receiving Event Notifications for the full FAPI-aligned guidance: key selection by kid , JWS signature verification, and required security checks. Field Type Description EventDateTime string (date-time) When the event was generated. EventResource string The resource URI that triggered the event — e.g. /motor-insurance-quotes/{QuoteId} . EventType string One of: Resource.Created , Resource.Updated , Resource.Deleted . QuoteId string (UUID) The identifier of the quote the status change applies to. The Data object conforms to one of three schemas drawn from AEInsurance.AEInsuranceEvent : Pending Completion Status — QuoteStatus is one of ApplicationPending , ApplicationApproved , PaymentRequired , PolicyIssued . May include BrokerInstructions[] (typically a payment URL) and Documents[] (on PolicyIssued in TPP-Led mode). Completed Status — QuoteStatus: Completed . Carries the finalised Premium , PolicyTerm , CustomerPaidInFull , PolicyCountrySubDivision , and (where applicable) the Commission due to the TPP. Terminal Status — QuoteStatus is one of Expired , Rejected , CustomerCancelled , LFICancelled . May include a Reason string. The full schema is documented in Insurance Quotation API Guide — Event Schema and surfaced as an OpenAPI viewer in Insurance Quote Status Change Event ."
  },
  {
    "title": "Message Encryption (JWE)",
    "path": "/tech/tpp-standards/security/fapi/message-encryption",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · FAPI · JWE Message Encryption (JWE) 3 min read A JWE (JSON Web Encryption — RFC 7516 ) is the cryptographic mechanism that encrypts a payload so that only the intended…",
    "headings": [
      "Message Encryption (JWE) 3 min read",
      "Step 1 — Discover the JWKS URI",
      "Step 2 — Select the encryption key"
    ],
    "body": `Security · FAPI · JWE Message Encryption (JWE) 3 min read A JWE (JSON Web Encryption — RFC 7516 ) is the cryptographic mechanism that encrypts a payload so that only the intended recipient can read it. In UAE Open Finance, JWE is used specifically for payment consents — to encrypt the consent's PII payload (creditor and debtor names, account numbers, risk indicators) end-to-end with the LFI's public key. The encrypted blob is carried in the consent's pii field, nested inside the Request JWT 's authorization_details . The Request JWT itself is signed (JWS) but is not wrapped in a JWE; only the pii field is. See Payment PII Encryption for the data privacy rationale and the LFI/TPP validation responsibilities that flow from this design. A compact-serialised JWE consists of five base64url-encoded parts joined by . : Field Value Description alg RSA-OAEP-256 Key-wrapping algorithm — encrypts the content encryption key using the LFI's RSA public key enc A256GCM Content encryption algorithm — encrypts the actual payload using AES-256-GCM kid string Key ID of the LFI's encryption key, taken from their JWKS Step 1 — Discover the JWKS URI Each LFI publishes its public keys at a JWKS URI. You can find this URI by performing API Discovery via the .well-known endpoint. The JWKS URI follows this format: Step 2 — Select the encryption key Fetch the JWKS and find a key where "use": "enc" . This is the LFI's public key intended for encryption. Example encryption key from a JWKS: If the JWKS contains multiple keys, always select the one where "use": "enc" . Do not use a signing key ( "use": "sig" ) for encryption — the operations are not interchangeable. The plaintext to encrypt is the PII JSON object — the Initiation and RiskIndicators structures defined by the consent schema. Encrypt it as a compact JWE before placing the result in the consent's pii field. The sandbox provides an O3 Utility endpoint that accepts your PII payload and the LFI's JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See O3 Sandbox Utilities . Once you have the JWE string, place it in the pii field of the consent inside the Request JWT's authorization_details . The surrounding Request JWT is signed (JWS) as usual — only the pii field is encrypted. Each encryption is fresh: a new payload is produced and encrypted at consent creation, and a fresh payload is produced and encrypted again at each POST /payments . The two payloads are independently validated by the LFI after decryption. For guidance on receiving and decrypting inbound JWEs from the API Hub — including key selection by kid , signature verification, and FAPI-required security checks — see Receiving Event Notifications .`
  },
  {
    "title": "Message Signing (JWS)",
    "path": "/tech/tpp-standards/security/fapi/message-signing",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · FAPI · JWS Message Signing (JWS) 2 min read A JWS (JSON Web Signature — RFC 7515 ) is the cryptographic mechanism that signs a JSON payload to prove two things:…",
    "headings": [
      "Message Signing (JWS) 2 min read"
    ],
    "body": "Security · FAPI · JWS Message Signing (JWS) 2 min read A JWS (JSON Web Signature — RFC 7515 ) is the cryptographic mechanism that signs a JSON payload to prove two things: Authenticity — it genuinely came from the holder of the private key Integrity — the content has not been modified since it was signed In UAE Open Finance, signing is required whenever your application sends a JWT to an Authorization Server: The Request Object sent to /par The Client Assertion sent to /token A signed JWT consists of three base64url-encoded parts joined by . : Field Value Description alg PS256 RSA-PSS with SHA-256. The only algorithm supported by the UAE Open Finance FAPI profile kid string The Key ID of your signing certificate, as registered in the Trust Framework Your kid is assigned by the Trust Framework when your signing certificate is issued. Find it on the certificate detail page: Application → App Certificates → select the certificate. See Finding Your Key ID for a screenshot. The payload is a JSON object of claims. The structure depends on the use case — see Request JWT and Client Assertion for the specific claim sets. All signed JWTs must include timing claims to prevent replay attacks: Claim Description iat Issued At — current Unix timestamp nbf Not Before — slightly before iat to allow for clock skew (e.g. iat - 10 ) exp Expiry — short-lived; typically 5 minutes ( iat + 300 ) An application registered in the Trust Framework with an appropriate role A valid signing certificate and its corresponding private key The Key ID ( kid ) of your signing certificate from the Trust Framework The Node.js example uses the jose library (available for Node.js, browsers, Deno, and Cloudflare Workers); the Python example uses PyJWT . Some environments require the PEM key to have no line breaks when passed as an environment variable. Strip them with: The sandbox provides O3 Utility endpoints that accept your private key and return ready-made signed JWTs — useful for validating your signing setup before writing your own code. See O3 Sandbox Utilities . LFIs will verify your signatures using your public key fetched from your application's JWKS URI in the Trust Framework. You do not need to implement verification yourself, but it is useful for testing:"
  },
  {
    "title": "Modify a Bank Data Sharing Consent",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/patch-account-access-consents-ConsentId",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Modify a Bank Data Sharing Consent",
    "headings": [],
    "body": ""
  },
  {
    "title": "Modify a Payment Consent",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Modify a Payment Consent",
    "headings": [],
    "body": ""
  },
  {
    "title": "Modify an Insurance Data Sharing Consent",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/patch-insurance-consents-ConsentId",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Modify an Insurance Data Sharing Consent",
    "headings": [],
    "body": ""
  },
  {
    "title": "Multi-Authorization",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · Multi-Authorization Multi-Authorization 2 min read The Open Finance standards support payment journeys that require more than one authorizer. This guide…",
    "headings": [
      "Multi-Authorization 2 min read"
    ],
    "body": "Service Initiation · Multi-Authorization Multi-Authorization 2 min read The Open Finance standards support payment journeys that require more than one authorizer. This guide explains how TPPs and LFIs must coordinate multi-authorization for payment consents and how the consent lifecycle is reflected in API calls and responses. Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . An active payment consent — a payment consent must have been created through the relevant Service Initiation API Guide . Multi-authorization applies after the first authorizer has completed their step. Understanding of the Consent Lifecycle — you should understand consent status transitions, including AwaitingAuthorization , Authorized , and Rejected . When submitting the Pushed Authorization Request (PAR), the TPP MUST set IsSingleAuthorization inside authorization_details[].consent : true — only a single authorizer is supported for the payment. false — multiple authorizers are supported (multi-authorization enabled). When IsSingleAuthorization is false , the TPP SHOULD also set AuthorizationExpirationDateTime inside authorization_details[].consent . This field represents the deadline by which all remaining authorizers must have acted — that is, the consent MUST reach Status=Authorized before this time, otherwise the consent transitions to rejected/expired. AuthorizationExpirationDateTime MUST NOT be after ExpirationDateTime . When IsSingleAuthorization is true , TPPs SHOULD NOT include AuthorizationExpirationDateTime . These fields are carried in the Rich Authorization Request ( authorization_details[].consent.IsSingleAuthorization , authorization_details[].consent.AuthorizationExpirationDateTime ). See the Authorization Endpoints OpenAPI for the full schema reference. Before showing eligible accounts during the consent journey, the LFI checks IsSingleAuthorization from the PAR request: If true : allow selection only from accounts that require a single authorizer. If none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an appropriate error. If false : allow selection from accounts that require either single or multiple authorizers. After the first user authorizes, the LFI must: Inform OFH of required authorizers by PATCHing the consent to include Meta.MultipleAuthorizers . Keep consent status as AwaitingAuthorization — do not set Status=Authorized yet. Redirect back to the TPP via /doConfirm once the PATCH is accepted. The TPP receives the redirect/callback, exchanges the authorization code at /token , and receives an access token plus the consent object still marked AwaitingAuthorization , including the Meta.MultipleAuthorizers structure above. The LFI must PATCH the consent after each additional authorization to reflect progress: If any required authorizer rejects → set Status=Rejected . When all required authorizers approve → set Status=Authorized . The TPP MAY initiate the payment only after Status=Authorized . Additional authorizers must act before AuthorizationExpirationDateTime if set, otherwise before ExpirationDateTime . TPPs can monitor progress by: Subscribing to event notifications; or Polling GET /payment-consents/{ConsentId} . Once the consent is Authorized , the TPP can exchange the refresh token for a new access token via /token and proceed to initiate the payment."
  },
  {
    "title": "O3 Sandbox Utilities",
    "path": "/tech/tpp-standards/security/fapi/o3-utils",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · Sandbox · O3 Utilities O3 Sandbox Utilities 4 min read The Nebras Open Finance sandbox exposes a small set of O3 Utility endpoints to help you verify that your signing…",
    "headings": [
      "O3 Sandbox Utilities 4 min read",
      "Base URL",
      "Required environment variables"
    ],
    "body": "Security · Sandbox · O3 Utilities O3 Sandbox Utilities 4 min read The Nebras Open Finance sandbox exposes a small set of O3 Utility endpoints to help you verify that your signing and encryption logic is correct before wiring everything together in your own application. You send a signing key (and, for encryption, a JWKS URL) in the request body, and the utility returns the signed or encrypted token directly — so you can validate output at any stage of the flow without having to build the full cryptographic pipeline first. These endpoints accept raw private key material in the request body. They exist exclusively for development and testing on the sandbox . They are not available in any production environment , and you should never send real private keys to any external service. Base URL All O3 Utility requests target the sandbox resource server: Required environment variables Each example below references Postman environment variables. Set these before running: Variable Description kid-local The Key ID ( kid ) of your signing certificate, from the Trust Framework pem-local Your signing private key in PEM format (PKCS#8, stripped of newlines — see Message Signing ) _clientId Your application's client_id , from the Trust Framework jwksUrl The LFI's JWKS URI (required for encryption only) — e.g. https://keystore.sandbox.directory.openfinance.ae/{lfi-uuid}/application.jwks Postman environment variables cannot contain literal newlines. Strip them with: Endpoint: GET /o3/v1.0/message-encryption Produces an encrypted PII token (JWE) from a structured payload containing creditor and risk data. The output is stored in encryptedPII and is used directly as the PersonalIdentifiableInformation field in a consent's authorization_details . This utility signs the PII payload with your private key and then encrypts it using the LFI's public encryption key (fetched from jwksUrl ), producing a Nested JWT (JWS wrapped inside a JWE) — exactly as described in Message Encryption . Pre-request script Generates a PKCE code pair and sets timing claims: Test script Saves the encrypted PII for use in subsequent requests: Request body Output: A compact JWE string (five base64url-encoded segments separated by . ). Use the saved variable as PersonalIdentifiableInformation in your consent's authorization_details . See Message Encryption for a full explanation of the JWE structure, algorithm choices, and how to produce this token in your own code. Endpoint: GET /o3/v1.0/message-signature Produces a Client Assertion JWT for use as client_assertion when calling /par . The client assertion proves your application's identity to the Authorization Server without a shared secret — it is signed with your private key and verified by the LFI using your public key from the Trust Framework JWKS. Pre-request script Sets timing claims: Test script Saves the client assertion for use in the PAR request: Request body Output: A compact JWS string. Pass it as client_assertion in your /par request body, alongside client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer . See Client Assertion for the full claim set requirements and Message Signing for how to produce this token in your own code. Endpoint: GET /o3/v1.0/message-signature Produces the same Client Assertion JWT as Example 2, but intended for use at the /token endpoint — for exchanging an authorization code for tokens, refreshing an access token, or obtaining a client credentials token. A fresh assertion with a new jti must be generated for every request. Pre-request script Test script Request body Output: A compact JWS string. Pass it as client_assertion in your /token request body: The jti claim must be a fresh UUID on every call. The Authorization Server tracks seen jti values and will reject replayed assertions. Postman's variable generates a new UUID on each request automatically. See Client Assertion for the full claim set and Message Signing for code examples. Endpoint: GET /o3/v1.0/message-s"
  },
  {
    "title": "OAuth 2.0 Scopes",
    "path": "/tech/tpp-standards/security/fapi/scopes",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · OAuth 2.0 · Scopes OAuth 2.0 Scopes 2 min read Scopes define what your application is requesting permission to do on behalf of the user. They are declared in the scope…",
    "headings": [
      "OAuth 2.0 Scopes 2 min read"
    ],
    "body": "Security · OAuth 2.0 · Scopes OAuth 2.0 Scopes 2 min read Scopes define what your application is requesting permission to do on behalf of the user. They are declared in the scope field of your Request JWT and echoed back in the access token issued by the Authorization Server. In UAE Open Finance, scopes are consent-bound — the scope alone does not grant access. The authorization_details in your request object describes the specific consent (account access permissions, payment details, etc.), and the scope indicates which API family the consent belongs to. Scope API Description openid All Activates OpenID Connect support. Required on every request — enables the Authorization Server to return an ID Token alongside the access token accounts Bank Data Sharing Grants access to account information APIs ( /accounts , /balances , /transactions , etc.). The access token is bound to the account-access-consent from authorization_details payments Service Initiation Grants access to payment initiation APIs ( /payments ). The access token is bound to the payment consent from authorization_details . Also grants read access to account information required for payment context products Products & Leads Grants access to product discovery and leads APIs. Does not require a user consent flow Scopes are space-separated in the scope field. Always include openid . Use Case Scope Value Bank Data Sharing accounts openid Payment Initiation payments openid Products (public data) products openid For accounts and payments , the access token issued by the Authorization Server is cryptographically bound to the specific consent created in your authorization_details . The token cannot be used to access resources outside that consent's permissions. If the scope in your Request JWT does not match any of the supported values, or is inconsistent with the authorization_details type, the Authorization Server will reject the request with: Error Description invalid_scope The requested scope is unknown or not supported by this Authorization Server AccessToken.InvalidScope The access token presented to a resource endpoint does not have the scope required for that operation The accounts and payments scopes are described in the OpenAPI specifications as parameterized with the ConsentId . This means the issued access token internally encodes the consent it was granted against. When presenting the token to a resource endpoint, the server validates that the requested resource falls within the permissions of the bound consent — this is handled automatically by the Authorization Server and is transparent to your application."
  },
  {
    "title": "Opening the Authorization Redirect",
    "path": "/tech/tpp-standards/security/fapi/opening-the-redirect",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · FAPI · Redirect Opening the Authorization Redirect 4 min read After you submit a /par request, you construct the authorization URL and send the customer to the LFI's…",
    "headings": [
      "Opening the Authorization Redirect 4 min read"
    ],
    "body": "Security · FAPI · Redirect Opening the Authorization Redirect 4 min read After you submit a /par request, you construct the authorization URL and send the customer to the LFI's Authorization Endpoint to authenticate and authorise the consent. How your application opens that URL is security-critical — get it wrong and you break app-to-app redirection or expose the customer to credential theft. The API Hub returns a request_uri from your PAR request . You combine it with the LFI's authorization_endpoint (read from .well-known/openid-configuration ) to build the redirect URL: This URL is a stable, publicly accessible HTTPS endpoint owned by the LFI. On mobile it is configured as a verified deep link, so opening it correctly can hand the customer straight into the LFI's banking app. The guidance below covers how to open it from within your app; once the customer finishes at the LFI, they are redirected back to your redirect_uri — see Handling Authorization Callbacks . If your app runs in a web browser instead of as a native mobile app — on desktop or mobile web — opening the redirect is simpler. Send the customer to the LFI's Authorization Endpoint with a normal full-page browser redirect . Navigate the whole page — window.location.assign(url) client-side, or a 302 / 303 from your server. The customer sees the LFI's real domain in the address bar, a key anti-phishing signal. Never render the LFI's authorization or authentication screens in an <iframe> or embedded frame (including hidden iframes). This is the web equivalent of the embedded-WebView prohibition — the same RFC 8252 / FAPI rationale, plus clickjacking — and the LFI sends frame-busting headers that will block it regardless. Avoid popups and new tabs or windows — popup blockers, lost address-bar visibility, and poor mobile-web behaviour make same-tab redirection the reliable choice. Preserve state and the PKCE code_verifier in server-side session or secure storage so they survive the round-trip. On desktop , handing the customer to a mobile app is the LFI's responsibility once they land on the Authorization Endpoint — via QR scan, push-to-app, or browser-based authentication. Your job is only the full-page redirect. See Authorization Endpoint — Desktop browser behaviour . UK Open Banking's redirection model is always domain-to-domain and full-page — an inbound screen (TPP domain → LFI domain) and an outbound screen (LFI domain → TPP domain) — which explicitly excludes iframes and embedded webviews. Desktop customers who need a mobile app are served by decoupled / QR-code hand-off, driven by the LFI. The rule for the TPP is the same in both cases: redirect the full page and let the LFI drive the hand-off."
  },
  {
    "title": "Optional Certifications Overview",
    "path": "/tech/tpp-standards/production/testing-certification/optional/overview",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Production · Testing & Certification · Optional Optional Certifications Overview 2 min read Optional certifications gate access to specific permissions that carry additional…",
    "headings": [
      "Optional Certifications Overview 2 min read"
    ],
    "body": "Production · Testing & Certification · Optional Optional Certifications Overview 2 min read Optional certifications gate access to specific permissions that carry additional handling requirements beyond the core Bank Data Sharing standards. A TPP requests an optional certification only when its proposition needs the corresponding permission. Content to follow."
  },
  {
    "title": "Organisation Details Form",
    "path": "/tech/tpp-standards/trust-framework/onboarding-form-organisation",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "← Onboarding TPP · Trust Framework · Onboarding Organisation Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email .",
    "headings": [
      "Organisation Details Form 2 min read"
    ],
    "body": "← Onboarding TPP · Trust Framework · Onboarding Organisation Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email ."
  },
  {
    "title": "Payment Refunds — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/refunds/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Refunds Payment Refunds — API Guide 2 min read The Refunds API lets a TPP retrieve the debtor's payment account details from the LFI after a…",
    "headings": [
      "Payment Refunds — API Guide 2 min read",
      "Response",
      "Example decoded payload",
      "Decoding the JWS"
    ],
    "body": "TPP · Banking · Service Initiation · Refunds Payment Refunds — API Guide 2 min read The Refunds API lets a TPP retrieve the debtor's payment account details from the LFI after a payment has been made, so a merchant can initiate a refund back to the original payer. This guide starts after a payment consent has been created with the ReadRefundAccount permission and the underlying payment has been authorised. Unlike the payment consent flow, retrieving refund details does not require a user redirect — the TPP authenticates directly using a client credentials grant. Before calling the Refunds API, ensure the following requirements are met: Completed payment consent with ReadRefundAccount permission — the original payment consent must have been created with ReadRefundAccount in the Permissions array, and the payment must have been authorised by the user. See the Payment Consent API Guide . Registered Application — the application must be assigned the BSIP role in the Trust Framework. See Roles . Valid Transport Certificate — an active transport certificate for mTLS communication with the LFI. Valid Signing Certificate — an active signing certificate for signing client assertions. LFI token endpoint — you should already hold the LFI's token_endpoint and ResourceServerUrl from the original payment consent flow. If not, fetch the LFI's .well-known/openid-configuration to resolve them. Understanding of Tokens & Assertions — familiarise yourself with private_key_jwt client authentication before calling the token endpoint. Retrieving refund details uses the OAuth 2.0 client credentials grant — no user consent or redirect is required. Use the signJWT() helper to build a client assertion proving your application's identity: See Client Assertion for the full claims reference. POST to the LFI's token endpoint with scope=payments : GET /payment-consents/{ConsentId}/refund Call the LFI's refund endpoint using the ConsentId from the original payment consent. Include x-fapi-interaction-id on every request. See Request Headers . Response The response is a signed JWT. Decode the payload to read the refund account details: Field Type Description Data.ConsentId string The ConsentId of the original payment consent Data.BaseConsentId string The BaseConsentId, if the consent was part of a multi-payment arrangement Data.RefundAccount.SchemeName enum Account identifier type — always IBAN Data.RefundAccount.Identification string The debtor's IBAN Data.RefundAccount.Name object The debtor's account name Example decoded payload Decoding the JWS The response body is a compact JWS — three base64url-encoded segments separated by . : Verify the signature using the LFI's public key (from their JWKS endpoint), then base64url-decode the payload: See the GET /payment-consents/{ConsentId}/refund API reference for the full request and response schema. Once you have the debtor's RefundAccount details, use the returned IBAN and name as the creditor in a new payment consent to initiate the refund. The refund payment follows the same initiation flow as any other payment. See Creditor PII for how to populate the creditor fields using the retrieved account details."
  },
  {
    "title": "Payment Refunds — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/refunds/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Payment Status",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/overview/payment-status",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · Domestic Payments · Status Payment Status 5 min read Every domestic payment initiated through the API Hub is executed by the LFI in one of three modes:…",
    "headings": [
      "Payment Status 5 min read",
      "Event notifications (recommended)",
      "Polling (fallback)",
      "Intra-bank",
      "AANI",
      "UAEFTS",
      "Illustrative AANI Reject Reason Codes"
    ],
    "body": "Service Initiation · Domestic Payments · Status Payment Status 5 min read Every domestic payment initiated through the API Hub is executed by the LFI in one of three modes: intra-bank (both debtor and creditor accounts are held at the same LFI, so no rail is used), AANI (the UAE's instant payment rail, used as the primary interbank rail), or UAEFTS (the UAE Funds Transfer System, used as the fallback interbank rail). Your TPP does not select the execution mode — the LFI owns that decision. Your TPP receives status updates for every payment through two complementary mechanisms: event notifications (the Hub pushes a webhook to your registered endpoint each time status changes) and polling ( GET /payments/{paymentId} on the API Hub). This page covers how to receive status, what each status means, and which statuses you can expect for each execution mode. Event notifications (recommended) When your consent is created with subscription.Webhook.IsActive: true and a registered Webhook.Url , the API Hub pushes a Payment Status Event to your endpoint each time the LFI PATCHes a new status to the Hub. Events are delivered as JWE-encrypted POST requests signed with your registered Encryption Certificate. Your TPP MUST respond with 202 Accepted immediately and decrypt the payload asynchronously. Event notifications are the recommended mechanism — they provide the lowest latency and remove the need for your TPP to poll. See the Payment Status Event API Guide for the full event shape, encryption requirements, and retry semantics. Polling (fallback) Your TPP MAY instead call GET /payments/{paymentId} on the API Hub to retrieve the current status on demand. Polling is appropriate when: Your TPP has not registered a webhook endpoint for this consent. You need to reconcile a missed or late event. You want to confirm the authoritative status before acting on an event payload. When polling, start shortly after POST /payments to catch immediate pre-rail rejections, back off as time passes, and stop polling once the payment reaches a terminal status ( AcceptedWithoutPosting , AcceptedCreditSettlementCompleted , or Rejected ). The Open Finance payment status enum aligns with ISO 20022 ExternalPaymentTransactionStatus1Code . Five values are relevant for domestic payments: Open Finance status ISO 20022 Meaning Terminal? Pending PDNG Payment accepted for processing; rail submission or internal execution outstanding. This is the initial status returned in the POST /payments response No AcceptedSettlementCompleted ACSC Settlement of the debtor account has been completed. Indicates progression but does not guarantee the creditor side is complete No AcceptedWithoutPosting ACWP The receiving bank has accepted the payment; the originating LFI cannot confirm that the credit has posted to the creditor account Yes (on AANI) AcceptedCreditSettlementCompleted ACCC The creditor account has been credited with the funds of the payment Yes (on UAEFTS and intra-bank) Rejected RJCT The payment was rejected, either pre-rail by the LFI or post-rail by AANI or UAEFTS Yes The Open Finance enum also includes Received (ISO 20022 RCVD ), used only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions. Bulk and batch payments are not yet documented in v2.1 — for the domestic single and multi-payments covered by this page, you can ignore Received . Once a payment reaches a terminal status ( AcceptedWithoutPosting , AcceptedCreditSettlementCompleted , or Rejected ), its status will not change again. The LFI selects the execution mode on receipt of each POST /payments . The rule is: Intra-bank — if both the debtor and creditor accounts are held at the same LFI, the payment is executed internally without a rail. AANI — otherwise, the LFI submits the payment to AANI whenever the receiving bank and account are reachable on AANI. UAEFTS — if AANI is unavailable or cannot reach the receiving bank, the LFI falls back to UAEFTS. The fall-back is automa"
  },
  {
    "title": "Payment Status Change Event",
    "path": "/tech/tpp-standards/v2.1/webhooks/payment-status/open-api",
    "category": "TPP Standards",
    "section": "Webhooks",
    "description": "Webhooks — Payment Status Change Event",
    "headings": [],
    "body": ""
  },
  {
    "title": "Payment Status Event — API Guide",
    "path": "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide",
    "category": "TPP Standards",
    "section": "Webhooks",
    "description": "Webhooks · Payment Status Payment Status Event — API Guide 2 min read When a payment consent is created with subscription.Webhook.IsActive: true , the API Hub monitors that…",
    "headings": [
      "Payment Status Event — API Guide 2 min read",
      "Request headers you will receive"
    ],
    "body": 'Webhooks · Payment Status Payment Status Event — API Guide 2 min read When a payment consent is created with subscription.Webhook.IsActive: true , the API Hub monitors that consent for payment status changes. Each time the LFI processes the payment and updates its status — by PATCHing the API Hub — the Hub delivers a Payment Status Event to your registered Webhook.Url as a JWE-encrypted POST. Before receiving a Payment Status Event, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BDSP role as defined in Roles . Valid Encryption Certificate — an active encryption certificate must be issued and registered in the Trust Framework to receive the event as an encrypted JWE. When a payment consent is created with subscription.Webhook.IsActive: true , the API Hub monitors that consent for payment status changes. Each time the LFI processes the payment and updates its status — by PATCHing the API Hub — the Hub delivers a Payment Status Event to your registered Webhook.Url as a JWE-encrypted POST request. The JWE is encrypted using your public Encryption Certificate registered in the Trust Framework. You must respond with 202 Accepted immediately and decrypt the event payload asynchronously. AcceptedWithoutPosting"> Set subscription.Webhook.IsActive to true and provide your webhook URL when creating the payment consent PII. The URL must be registered and accessible from the API Hub. The Webhook.Url must be the URL of your registered webhook endpoint — the API Hub will POST events directly to this address. The Hub delivers the event as an HTTP POST to your Webhook.Url . The request body is a JWE compact serialisation string and the Content-Type is application/jwe . Request headers you will receive Header Description Content-Type application/jwe x-fapi-interaction-id RFC4122 UUID used as a correlation ID for this event delivery You must respond with 202 Accepted and an empty body before performing any processing. The Hub expects an immediate acknowledgement — do not wait for decryption or business logic before responding. Failure to respond with 202 promptly may cause the Hub to retry delivery. Process the event payload asynchronously after acknowledging receipt. The event is a JWE compact serialisation encrypted with your public Encryption Certificate . The JWE header contains a kid that identifies which of your registered encryption keys was used — decode the header first to select the correct private key, then decrypt. See Receiving Event Notifications for the full FAPI-aligned guidance, including key selection by kid , JWS signature verification, and required security checks. The decrypted and decoded event payload contains the following structure under the message claim. Field Type Description EventDateTime string (date-time) When the event was generated EventResource string The resource URI that triggered the event EventType string One of: Resource.Created , Resource.Updated , Resource.Deleted ConsentId string The consent identifier associated with the event A replica of the payment resource at the time of the status change, with Status and StatusUpdateDateTime updated to reflect the new state. Where the payment was rejected, RejectReasonCode will be populated. Where the payment has been processed by the underlying rails, PaymentTransactionId will be present.'
  },
  {
    "title": "Payments (Service Initiation)",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · TPP capability Payments (Service Initiation) 2 min read The Open Finance Payment Service Initiation capabilities enable TPPs to initiate payments on behalf of customers…",
    "headings": [
      "Payments (Service Initiation) 2 min read",
      "Bank Service Initiation Provider",
      "Single Instant Payment",
      "Multi-Payment Consents",
      "Delegated SCA",
      "Which LFIs are live for Payment Initiation",
      "Browse this section"
    ],
    "body": 'Banking · TPP capability Payments (Service Initiation) 2 min read The Open Finance Payment Service Initiation capabilities enable TPPs to initiate payments on behalf of customers under explicit, consent-driven authorisation. All payment initiations operate under explicit customer consent. The TPP requests the consent, the customer authorises it at their LFI, and the TPP may then submit payments within the bounds of what was authorised. Access control Required role BSIP Bank Service Initiation Provider Access to the Payment Service Initiation APIs requires the BSIP role. This role must be assigned to your application in the Trust Framework before making any payment requests. See Roles for the full list of scopes and grant types this role permits. Note — within payments there is the ability to receive a small amount of data sharing permissions. If your consent includes ReadAccountsBasic , ReadAccountsDetail , or ReadBalances , in order to access this functionality you will also need the BDSP role. What\'s included Single Instant Payment A one-time payment initiated immediately upon consent authorisation. The TPP specifies a fixed creditor account and amount at consent time; the customer authorises and the payment is submitted in a single flow. Suitable for checkout payments, bill settlement, and any scenario where a single, known amount is being paid to a known recipient. Multi-Payment Consents Multi-payment consents allow a TPP to initiate a series of payments over time under a single customer authorisation. The customer authorises the consent once; the TPP can then submit payments as needed within the rules defined at consent time. There are several variants, each suited to different use cases: Consent Type Amount Timing Creditor Variable On Demand Variable, within limits On demand 1–10 defined, or undefined Fixed On Demand Fixed per-payment On demand 1 defined Variable Periodic Schedule Variable per payment Fixed schedule (1 per period) 1 defined Fixed Periodic Schedule Fixed per payment Fixed schedule (1 per period) 1 defined Variable Defined Schedule Variable per payment Defined dates 1 defined Fixed Defined Schedule Fixed per payment Defined dates 1 defined On Demand types let the TPP trigger payments at any time within the consent\'s period and limits, making them suitable for subscription billing, wallet top-ups, and discretionary recurring charges. Periodic Schedule types enforce exactly one payment per calendar period (e.g. weekly, monthly), making them well suited to regular bills and standing payment arrangements. Defined Schedule types lock payments to specific future dates set at consent time, which is ideal for instalment plans and known future obligations. Delegated SCA Delegated SCA is a variant of multi-payment consent where Strong Customer Authentication is performed by the TPP rather than the LFI. This enables a frictionless in-app payment experience — the customer authenticates once within the TPP\'s interface, and the LFI accepts that authentication for subsequent payments. Delegated SCA requires the TPP to hold an explicit delegation from the LFI and is subject to additional requirements. See Delegated SCA for details. Live ecosystem Which LFIs are live for Payment Initiation LFIs currently accepting payment consents across UAE Open Finance. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=payment" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?family=payment" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Payments (Service Initiation) API. →'
  },
  {
    "title": "Personal Identifiable Information (PII)",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · PII Personal Identifiable Information (PII) 3 min read Every payment instruction carries sensitive data about who is paying and who is receiving the funds.…",
    "headings": [
      "Personal Identifiable Information (PII) 3 min read",
      "Example",
      "At POST /par (consent staging)",
      "At POST /payments (payment creation)"
    ],
    "body": `Service Initiation · PII Personal Identifiable Information (PII) 3 min read Every payment instruction carries sensitive data about who is paying and who is receiving the funds. This data — the creditor account details, optional debtor account, and risk indicators — is collectively referred to as Personal Identifiable Information (PII) . PII is encrypted and embedded at two points in the payment lifecycle: Stage Endpoint PII form Consent staging POST /par Embedded in consent.PersonalIdentifiableInformation Payment creation POST /payments Embedded in payment.PersonalIdentifiableInformation The Risk structure is the same at both stages. DebtorAccount is only present at POST /par — by the time POST /payments is called, the debtor account has already been fixed through the consent authorisation flow. The creditor data also differs between stages — both in structure and cardinality. See Creditor for the full breakdown. Payment consents are stored centrally at Nebras , the UAE Open Finance Hub. Because Nebras acts as an intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP — ensuring that Nebras, and any other party in transit, cannot read the sensitive payment details. The encryption uses the destination LFI's public key (see Message Encryption for full cryptographic details). Only the LFI can decrypt the payload. Nebras passes the opaque JWE through without inspection — all PII validation is performed by the LFI after the consent is authorised. The PersonalIdentifiableInformation field MUST be sent as a compact JWE — a signed-then-encrypted token (Nested JWT). The process is: Build the PII JSON — construct the PII object for the stage you are at ( POST /par or POST /payments ). See The PII payload structure below. Sign — sign the PII payload as a JWS using your TPP signing key. The JWS MUST include standard claims ( iat , exp , jti , iss , sub , aud ). Fetch the LFI's encryption key — retrieve the LFI's JWKS and select the key where "use": "enc" . Encrypt — encrypt the signed JWS into a compact JWE using RSA-OAEP-256 / A256GCM . Embed — place the resulting JWE string in the PersonalIdentifiableInformation field of your request. Example For the full breakdown of JWKS discovery, key selection, and JWE structure, see Message Encryption . The sandbox provides an O3 Utility endpoint that accepts your private key and JWKS URL and returns a ready-made encrypted PII token — useful for validating your payload structure before writing your own encryption code. See O3 Sandbox Utilities . The PersonalIdentifiableInformation field is defined as a oneOf : Variant Form Purpose Domestic Payment PII Schema Object object Unencrypted reference form for domestic payments International Payment PII Schema Object object Unencrypted reference form for international payments Encrypted PII Object ( AEJWEPaymentPII ) string (compact JWE) The form that MUST be sent at both POST /par and POST /payments The two object variants document the structure implementers MUST follow when constructing the PII payload before encryption. The encrypted form — AEJWEPaymentPII — is a compact JWE string wrapping a signed JWS containing the serialised PII JSON. The structure of the unencrypted PII differs between the two stages. At POST /par (consent staging) At POST /payments (payment creation) The key difference: at POST /par the creditor data is inside an Initiation.Creditor[] array (allowing 1–10 entries, or omitted for open beneficiary). At POST /payments the same fields sit directly on Initiation as a single creditor. Property POST /par POST /payments Initiation.DebtorAccount Optional object Not present — debtor account is fixed by consent Initiation.Creditor Array of creditor entry objects (0–10) Object — the party name/address ( { Name, PostalAddress } ) Initiation.CreditorAccount Nested inside each Creditor[] entry Direct field on Initiation Initiation.CreditorAgent Nested inside each Creditor[] entry Direct field on Initiation Initia`
  },
  {
    "title": "PII Schema — POST /par",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · PII · Schema PII Schema — POST /par The schema below shows the full structure of the PersonalIdentifiableInformation field as it must be constructed for the…",
    "headings": [
      "PII Schema — POST /par"
    ],
    "body": "Service Initiation · PII · Schema PII Schema — POST /par The schema below shows the full structure of the PersonalIdentifiableInformation field as it must be constructed for the consent staging step ( POST /par ). The encrypted form ( AEJWEPaymentPII ) is what must be sent — the object variants document the payload to sign and encrypt."
  },
  {
    "title": "PII Schema — POST /payments",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · PII · Schema PII Schema — POST /payments The schema below shows the full structure of the PersonalIdentifiableInformation field as it must be constructed for…",
    "headings": [
      "PII Schema — POST /payments"
    ],
    "body": "Service Initiation · PII · Schema PII Schema — POST /payments The schema below shows the full structure of the PersonalIdentifiableInformation field as it must be constructed for the payment creation step ( POST /payments ). Note that DebtorAccount is absent at this stage — the debtor account is fixed by the consent authorisation flow. The creditor fields sit directly on Initiation rather than inside an array."
  },
  {
    "title": "Postman Guide",
    "path": "/tech/tpp-standards/v2.1/getting-started/postman",
    "category": "TPP Standards",
    "section": "Getting Started",
    "description": "Sandbox testing · Postman Postman Collection 2 min read A Postman collection provided to the UAE Open Finance ecosystem to help LFIs and TPPs test their API implementations…",
    "headings": [
      "Postman Collection 2 min read",
      "What's inside",
      "Banking",
      "Insurance"
    ],
    "body": "Sandbox testing · Postman Postman Collection 2 min read A Postman collection provided to the UAE Open Finance ecosystem to help LFIs and TPPs test their API implementations against the Open Finance Trust Framework. The collection covers the full sandbox flow — TPP registration, consent, authorization, and payments — and can be downloaded pre-configured for your application from the Getting Started page. ) ──── --> GitHub repository Nebras-Open-Finance / postman The two .postman_collection.json files at the root of the repository are the published surface — import either one into Postman to start using it. Open on GitHub ↗ Collections What's inside Folders inside each .postman_collection.json , the role they require, and what they cover. Banking V1.2 · V2.0 · V2.1 (current) Folder Role Description Insurance V2.1 (current) Folder Description"
  },
  {
    "title": "Preparing Client Assertion",
    "path": "/tech/tpp-standards/security/tokens/client-assertion",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · OAuth 2.0 · Client authentication Client Assertion 2 min read A client assertion is a short-lived, signed JWT that your application presents to the Authorization Server…",
    "headings": [
      "Client Assertion 2 min read"
    ],
    "body": "Security · OAuth 2.0 · Client authentication Client Assertion 2 min read A client assertion is a short-lived, signed JWT that your application presents to the Authorization Server to prove its identity. It takes the place of a static client secret, providing a stronger and more auditable form of client authentication. Because each assertion is signed with your application's private key, the Authorization Server can verify it using your public key from the Trust Framework — without any shared secret ever leaving your system. In UAE Open Finance, a client assertion is required on two endpoints: Endpoint Use /token Exchanging an authorisation code for tokens, refreshing an access token, or obtaining a client credentials token /par Submitting a Pushed Authorization Request to initiate a consent journey A client assertion must be freshly generated for every request. The jti claim (a unique UUID) ensures the Authorization Server can detect and reject replayed assertions. For a complete per-claim reference — including the exact aud value, jti uniqueness requirements, exp / iat lifetime window, and a side-by-side comparison with the Request Object — see JWT Claim Rules . The client assertion is a signed JWT composed of a header and a set of claims. Field Value Description alg PS256 The only algorithm supported by the UAE Open Finance FAPI profile kid string Key ID of your signing certificate, as registered in the Trust Framework Claim Description Example aud The Authorization Server's issuer URI — obtained from the .well-known discovery endpoint https://auth.[LFICode].apihub.openfinance.ae iss Your application's client_id from the Trust Framework a1b2c3d4-... sub Same as iss — your client_id a1b2c3d4-... iat Unix timestamp of when the JWT was issued 1713196123 exp Unix timestamp when the JWT expires. Keep this short — 5 minutes is standard 1713196423 jti A unique identifier (UUID) for this assertion. Prevents replay attacks f47ac10b-58cc-... Set exp to no more than 5 minutes after iat . Long-lived assertions increase the window of exposure if intercepted. The sandbox provides O3 Utility endpoints that accept your private key and return a ready-made client assertion JWT — useful for confirming your key setup is correct before writing your own signing code. See O3 Sandbox Utilities . Once the header and claims are assembled, sign the JWT as a JWS using the PS256 algorithm and your private signing key. Send the resulting string in the client_assertion form parameter alongside client_assertion_type when calling /par or /token : See Message Signing (JWS) for the underlying signing helper and additional context on how the signature is produced."
  },
  {
    "title": "Preparing the Request JWT",
    "path": "/tech/tpp-standards/security/fapi/request-jwt",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · FAPI · /par Preparing the Request JWT 2 min read To send a /par request, you must first construct a signed Request JWT (also called a Request Object or JAR — JWT…",
    "headings": [
      "Preparing the Request JWT 2 min read"
    ],
    "body": "Security · FAPI · /par Preparing the Request JWT 2 min read To send a /par request, you must first construct a signed Request JWT (also called a Request Object or JAR — JWT Authorization Request). This JWT is a signed package of all authorization parameters, proving they came from your registered application and haven't been tampered with. For a precise per-claim reference covering aud , exp / nbf lifetime windows, clock skew, and the difference between the Request Object and Client Assertion, see JWT Claim Rules . Field Value Description alg PS256 Signing algorithm — RSA-PSS with SHA-256 kid string Key ID of your signing certificate, as registered in the Trust Framework Claim Type Required Description Example aud string ✓ The issuer of the Authorization Server — found via API Discovery https://auth1.[LFICode].apihub.openfinance.ae iat number ✓ Issued At Unix timestamp — when the JWT was created 1713196113 exp number ✓ Expiry as a Unix timestamp. Must be shortly after nbf — maximum 5 minutes 1713196423 iss string ✓ Your application's Client ID from the Trust Framework your-client-id client_id string ✓ Your application's Client ID (same as iss ) your-client-id redirect_uri string ✓ The callback URI registered in your Trust Framework application https://yourapp.com/callback scope string ✓ Space-separated OAuth 2.0 scopes accounts openid nonce string ✓ Random UUID — prevents replay attacks by binding the ID token to this request a1b2c3d4-... state string ✓ Random UUID — returned in the redirect; prevents CSRF attacks e5f6g7h8-... nbf number ✓ Not Before Unix timestamp. Set slightly before iat (e.g. iat - 10 ) to allow for clock skew 1713196103 response_type string ✓ Must be code code code_challenge_method string ✓ PKCE method — only S256 is supported S256 code_challenge string ✓ Base64url-encoded SHA-256 hash of your code_verifier E9Melhoa2Ow... max_age number Maximum age (seconds) of the user's existing authentication session. Capped at 3600 3600 authorization_details array ✓ Describes what the user is consenting to — see Consent [{...}] Before building the JWT, generate a code_verifier and derive the code_challenge from it: Store the code_verifier securely — you'll need it when exchanging the authorization code for tokens. Store codeVerifier in your session — you'll need it at the /token endpoint to exchange the authorization code for access tokens. For payment consents, the consent's PII payload (creditor and debtor names, account numbers, and related personal data) must be encrypted with the LFI's public encryption key and carried as a JWE in the consent's pii field — nested inside authorization_details within this Request JWT. The Request JWT itself is signed (JWS) but is not wrapped in a JWE; only the pii field is. This keeps the PII end-to-end encrypted: the API Hub routes the consent without being able to read the personal data, and only the LFI — holder of the private key — can decrypt and validate it. See Message Encryption for how to produce the JWE, and Payment PII Encryption for the rationale and validation responsibilities."
  },
  {
    "title": "Primary Organisation Admin Details Form",
    "path": "/tech/tpp-standards/trust-framework/onboarding-form-admin",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "← Onboarding TPP · Trust Framework · Onboarding Primary Organisation Admin Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email .",
    "headings": [
      "Primary Organisation Admin Details Form 2 min read"
    ],
    "body": "← Onboarding TPP · Trust Framework · Onboarding Primary Organisation Admin Details Form 2 min read Complete this form and attach it to your sandbox onboarding request email ."
  },
  {
    "title": "Production Live Proving",
    "path": "/tech/tpp-standards/production/live-proving",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Production · Live Proving Production Live Proving 2 min read Once all certification requirements have been met, TPPs enter the Production Proving Phase — a controlled live period…",
    "headings": [
      "Production Live Proving 2 min read"
    ],
    "body": "Production · Live Proving Production Live Proving 2 min read Once all certification requirements have been met, TPPs enter the Production Proving Phase — a controlled live period where the TPP's integration is validated against real production infrastructure before being opened to all customers and LFIs. During Production Proving, each TPP is paired with a small set of buddy LFIs (Authorization Servers). Testing in production is restricted to these buddied LFIs only — the TPP must not make production requests to any LFI or Authorization Server outside of its assigned buddy set during this phase. This pairing allows the TPP to validate its end-to-end use case in a controlled real-world environment, with LFI teams available to support and investigate any issues that arise. Expected duration: 2 weeks to 1 month, depending on the complexity of the integration and the number of use cases being validated. During the buddying phase, all testing must be conducted using test users only . Real customer accounts must not be used until go-live approval has been granted. The Production Proving Phase is non-commercial . None of the following apply until go-live approval is granted: API Hub fees LFI-to-TPP fees TPP-to-LFI commissions Any other commercial charges All commercial terms take effect only once Nebras grants go-live approval. Once the TPP is satisfied that live proving has been completed successfully, it can apply to Nebras for go-live sign-off . Go-live approval allows the TPP to: Work with all production LFIs, not just the buddied set Open their service to all customers Operate under the full commercial model Nebras will review the TPP's live proving activity before granting approval. Given the nature of Open Finance integrations — where each LFI operates its own Authorization Server with its own configuration, supported account types, and capabilities — each new LFI a TPP onboards requires its own validation period . TPPs should expect to spend time confirming that a newly integrated LFI behaves as expected for their use case before directing live customer traffic to it. This should be factored into integration and release planning."
  },
  {
    "title": "Products & Leads",
    "path": "/tech/tpp-standards/v2.1/banking/products-leads/",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · TPP capability Products & Leads 2 min read The Products & Leads API lets a TPP fetch the banking product catalogues published by LFIs and forward customer leads back to…",
    "headings": [
      "Products & Leads 2 min read",
      "Bank Data Sharing Provider",
      "Which LFIs are live for Products & Leads",
      "Browse this section",
      "Products & Leads — Requirements",
      "Products & Leads — API Guide",
      "Products & Leads — User Journeys"
    ],
    "body": 'Banking · TPP capability Products & Leads 2 min read The Products & Leads API lets a TPP fetch the banking product catalogues published by LFIs and forward customer leads back to them. Products are aggregated across LFIs and presented to the user; leads are submitted on demand when the user requests follow-up. Access control Required role BDSP Bank Data Sharing Provider Access to the Products & Leads API requires the BDSP role. This role must be assigned to your application in the Trust Framework before calling the endpoints. See Roles for the full list of scopes and grant types this role permits. How it works The TPP fetches products from each LFI in parallel. The results are aggregated and presented to the user together. Once a user selects a product, they have two options: Apply Now — the TPP directs the user to apply using whichever channel the LFI has configured: a redirect URI, a phone number, an email address, or a written description of the application process. Request contact from bank — the TPP submits a POST /leads with the user\'s contact details. The API Hub forwards the lead to the LFI and does not retain the data. The LFI is expected to follow up within 30 days. Live ecosystem Which LFIs are live for Products & Leads LFIs currently publishing product catalogues across UAE Open Finance. liveLfis.length" class="ed-landing__tpp ed-landing__tpp--more" href="/program/whats-live?family=product" :title="`See all ${totalLfiCount} LFIs`" > … + more Live data is currently unavailable. No LFIs are currently active for this capability. 0" class="ed-landing__live-cta" href="/program/whats-live?family=product" > liveLfis.length"> See all LFIs in the live ecosystem View in the live ecosystem dashboard → Section contents Browse this section The full set of pages for the Products & Leads API. Requirements Products & Leads — Requirements Validation rules and behaviour every Products & Leads request must follow. Open → API Guide Products & Leads — API Guide Implementation notes, payload structure, and worked examples. Open → User Journeys Products & Leads — User Journeys How users browse products and submit leads through your application. Open →'
  },
  {
    "title": "Products & Leads — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/products-leads/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Products & Leads Products & Leads — API Guide 3 min read The Products & Leads API lets a TPP retrieve publicly available banking products from participating LFIs…",
    "headings": [
      "Products & Leads — API Guide 3 min read",
      "Query parameters",
      "Response structure",
      "Application fields",
      "Lead request fields"
    ],
    "body": "TPP · Banking · Products & Leads Products & Leads — API Guide 3 min read The Products & Leads API lets a TPP retrieve publicly available banking products from participating LFIs and present them to a user. Products are fetched from each LFI individually and aggregated for display. No user consent or redirect is required — the TPP authenticates directly with a client credentials grant. Once the user selects a product they have two options: Apply Now , which directs them to the LFI using whichever application channel the LFI has configured, or Request contact from bank , which submits a lead to the LFI on the user's behalf. Before calling the Products & Leads API, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BDSP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework for client authentication. Understanding of Tokens & Assertions — you should understand how client authentication works with private_key_jwt before calling the token endpoint. Each LFI has its own authorisation server, so the TPP must obtain a separate access token for every LFI it intends to query. Because the token endpoint and aud claim differ per LFI, a new client assertion must also be built for each one. These calls should all be made in parallel — do not wait for one LFI's token before requesting the next. See Client Assertion for the full claims reference. GET /products With a token for each LFI, call GET /products for all of them simultaneously. Aggregate the results into a single list before presenting them to the user. Include x-fapi-interaction-id and x-fapi-customer-ip-address on every request. The x-fapi-customer-ip-address header is required because GET /products can only be called while a customer is in a live session with the TPP. See Request Headers . Each LFI's apiBase is its API Hub resource server — https://rs1.<lfiCode>.apihub.openfinance.ae (production) or https://rs1.<lfiCode>.sandbox.apihub.openfinance.ae (sandbox). Resolve the <lfiCode> from the Trust Framework Directory . See API Resources for the full endpoint format. Query parameters Parameter Type Description ProductCategory string Filter by category — SavingsAccount , CurrentAccount , CreditCard , Finance , or Mortgage IsShariaCompliant boolean Filter to Sharia-compliant products only LastUpdatedDateTime date-time Return only products updated after this timestamp SortField string Sort by LastUpdatedDateTime (default) or ProductId SortOrder string asc (default) or desc Response structure Products are returned grouped by LFI. The Data array groups products by LFIId : Application fields At least one of the following fields must be returned by the LFI for every product. This determines how the TPP presents the page for the end user to apply for their selected product: Field Type Description ApplicationUri string <uri> A link to apply for the product. ApplicationPhoneNumber string A phone number to apply for the product. ApplicationEmail string An email address to apply for the product. ApplicationDescription string A free text description of the application process for the product, with ways to contact the LFI if applicable. Step 4 below covers how the TPP should respond to each of these fields when the user chooses to apply. Use the LFI's logo and brand name from the Trust Framework Directory. Do not rank or order products based on commercial agreements with specific LFIs — ordering must reflect the user's own preferences. See the GET /products API reference for the full response schema. When a user selects a product and chooses to apply, the action depends on which application fields the LFI has populated. Check the fields in priority order: Field Present "
  },
  {
    "title": "Products and Leads - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/products-leads/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Products & Leads · UX Products and Leads — User Experience 5 min read The following wireframes and guidelines outline the essential information and functionality that…",
    "headings": [
      "Products and Leads — User Experience 5 min read",
      "Example 1 — User requests product comparison and selects 'Apply Now'",
      "Example 2 — User requests product comparison and selects 'Request contact from bank'",
      "Example 3 — User requests product comparison and selects 'Apply Now' — No Application URL Provided"
    ],
    "body": `Banking · Products & Leads · UX Products and Leads — User Experience 5 min read The following wireframes and guidelines outline the essential information and functionality that must be provided to the User, while enabling TPPs to implement additional features and capabilities to address their commercial and service-specific needs. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the product information presented to the User. The style and presentation of the returned product information within the 'Product Features & Characteristics' section falls within the competitive domain of TPPs, enabling them to design and implement their own customer experience — including how product information is summarised and how detailed information is presented. Your Products and Leads user experience must be submitted as part of CX certification prior to production, and any material changes to a production implementation must be re-submitted for review and approval. ID Requirement UX Guidelines Statement 1 MAY Include additional text and information about the service they will be providing to the User. This additional information should clarify that the products returned will NOT include: tailored individual quotes, or confirmation of pre-approval for the product by the LFI 1.1 MUST Request that the User selects the LFI into which their salary is currently deposited, and confirm whether they would be willing to switch banks and have their salary deposited into a different LFI if required by the product's eligibility criteria. This information is necessary for LFIs to determine whether the User is an existing customer and to assess eligibility for specific products or rates. 1.2 MUST Allow the User to select whether they only wish to see Shari'a compliant banking products. When Shari'a compliant products are displayed, the appropriate Shari'a compliant product names must be used. 1.3 MUST Allow the User to select the type of Banking products they are interested in. 1.4 MUST Display a list of optional Preference options that the User can populate to filter LFI products that do not meet their requirements or personal circumstances. TPPs MAY : Include different and/or additional Preferences to assess the suitability of each returned LFI product Make a Preference option mandatory if the information is essential for the TPP's product assessment or User service Decide what option values are displayed in each Preference drop-down list 1.5 MUST Provide the User the option on what order or ranking the returned products are displayed to them, and ensure products are displayed in the selected order. Depending on the product type the order options could be: Rate Annual Return Minimum Opening Balance Minimum Salary Minimum Balance Required Annual Fee Alphabetically 1.6 MUST Show a list of LFIs the product information will be requested from, using LFI logos and brand names as defined in the Trust Framework Directory (or the Alternative Brand Name provided by the LFI for Shari'a compliant products). The User must be able to de-select specific LFIs they do not wish to receive products from. By default "All LFIs" must be selected. 1.7 MUST Show a "Loading Products" screen when the User selects "View Products" to indicate that products are being requested from the selected LFIs. 2.1 MUST NOT Give preference to or recommend products based on commercial agreements with specific LFIs. 2.2 MAY Choose how they show the returned product information and the level of data displayed to the User based on the service they wish to provide. 2.3 MUST Provide three options when the User selects an individual product: Apply Now Request contact from bank Cancel The User must be able to exit the individual product view and return to the product list. 2.4 MUST When the User selects the "Apply Now" option: If the LFI has provided a URI in the ApplicationUri field, confirm that the User will be`
  },
  {
    "title": "Products and Leads — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/products-leads/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Provide user lead details",
    "path": "/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Provide user lead details",
    "headings": [],
    "body": ""
  },
  {
    "title": "Pushed Authorization Request endpoint",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/par",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Pushed Authorization Request endpoint",
    "headings": [],
    "body": ""
  },
  {
    "title": "Receiving Event Notifications",
    "path": "/tech/tpp-standards/security/fapi/receiving-events",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · FAPI · Webhooks Receiving Event Notifications 2 min read When the API Hub delivers a webhook event (such as a Payment Status or Consent Status change), it POSTs a JWE…",
    "headings": [
      "Receiving Event Notifications 2 min read"
    ],
    "body": "Security · FAPI · Webhooks Receiving Event Notifications 2 min read When the API Hub delivers a webhook event (such as a Payment Status or Consent Status change), it POSTs a JWE compact serialisation to your registered webhook URL. The JWE is encrypted with your public Encryption Certificate , and the decrypted payload is a signed JWT (JWS) containing the event. This page covers how to correctly decrypt, verify, and validate the event in line with the FAPI 2.0 Security Profile. The JWE protected header identifies which of your registered encryption keys was used via the kid claim. Decode the first segment to read it before attempting decryption: Keep retired private keys available until you are confident no in-flight events were encrypted with them — the kid tells you exactly which key to use. Decrypt the JWE using the private key selected above. The result is the inner JWS: The inner JWS is signed by the API Hub. Verify the signature using the Hub's public JWKS, then validate the JWT claims. After decrypting and verifying the signature, validate the following claims before processing the event. These checks are required by the FAPI 2.0 Security Profile. Check Claim What to verify Issuer iss Must match the issuer of the LFI that owns the consent — cross-reference with the ConsentId in Meta . Reject events where iss does not match the expected LFI to prevent an event from one LFI being replayed against a consent held at another. Audience aud Must contain your application's client_id . Reject events addressed to a different client. Expiry exp Must be in the future. Reject expired tokens. Not Before nbf If present, must not be in the future. Replay jti If present, record the value and reject any future event with the same jti . This prevents a delivered event from being replayed. Consent match Meta.ConsentId Must correspond to a consent your application created. Discard events for unknown consent IDs. Always verify that iss corresponds to the LFI tied to the consent in Meta.ConsentId . Without this check, a malicious actor could craft or replay an event from a different LFI to influence your application's view of a consent it holds elsewhere."
  },
  {
    "title": "Registering your Application",
    "path": "/tech/tpp-standards/registration/api-guide",
    "category": "TPP Standards",
    "section": "Registration",
    "description": "TPP · Registration · Dynamic Client Registration Registering your Application 2 min read TPPs dynamically register their applications with LFIs by submitting a registration…",
    "headings": [
      "Registering your Application 2 min read",
      "Example request"
    ],
    "body": "TPP · Registration · Dynamic Client Registration Registering your Application 2 min read TPPs dynamically register their applications with LFIs by submitting a registration request to the LFI's registration_endpoint , which is discovered via the .well-known endpoint. This request includes the TPP application's transport certificate and corresponding private key to establish a secure and trusted connection. Before registering with an Authorisation Server, ensure the following requirements are met: Onboarded Organisation in the Trust Framework — your organisation must be successfully registered and approved within the Trust Framework. Registered Application — the application must be created within the Trust Framework and assigned the appropriate roles required for the intended use case. Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to enable secure mTLS communication with the Authorisation Server. Selected Authorisation Server — you must identify the Authorisation Server you intend to register with by using API Discovery to locate and select the appropriate endpoint. The roles assigned to your application ( BSIP , BDSP , ISP ) determine what it is permitted to do with the LFI. Once registered, editing the application's roles in the Trust Framework has no effect — the registered roles are fixed. If the roles later need to change, you must disable the application, create a new one with the correct roles, and register it again. Once you have identified the Authorisation Server you want to register with, you can locate its registration endpoint via the .well-known OpenID configuration . Within the returned JSON from the .well-known look for: This is the endpoint your TPP will use to register the application with. POST /tpp-registration Example request This endpoint uses mutual TLS (mTLS) with transport-level certificates. Make sure that: --cert — path to your transport client certificate ( .pem ) --key — path to your transport private key ( .key ) Once the registration is successful, you will receive a 204 No Content response. This indicates that your application is registered with the server. POST /tpp-registration returns no body. Your ClientId is the UUID assigned to your application when it was created in the Trust Framework Directory — it is not issued by this endpoint. Find it on the application detail page: Organisation → Applications → select your application. See Creating an Application for a screenshot. You will need this value as client_id , iss , and sub in all Client Assertions and Request JWTs. Registration does not automatically grant access. Once a TPP submits a registration request to an LFI, the LFI must activate the TPP, the associated Client, and the Software Statement before the TPP can communicate with the LFI. Registration with the model bank is activated automatically — no manual approval is required. For all other LFIs, activation must be performed by the LFI via their Admin Portal before the TPP can make API calls. For guidance on how an LFI activates a TPP's registration request via their Admin Portal, please review the TPP Management & Activation page ."
  },
  {
    "title": "Request Headers",
    "path": "/tech/tpp-standards/security/request-headers",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · FAPI · HTTP headers Request Headers 3 min read These headers apply to all authenticated API calls made in the UAE Open Finance ecosystem. They are defined by the FAPI…",
    "headings": [
      "Request Headers 3 min read",
      "Rules"
    ],
    "body": "Security · FAPI · HTTP headers Request Headers 3 min read These headers apply to all authenticated API calls made in the UAE Open Finance ecosystem. They are defined by the FAPI 2.0 Security Profile and the UAE Open Finance standard. Header Level Applies To x-fapi-interaction-id Recommended All endpoints x-fapi-customer-ip-address Conditional All endpoints x-fapi-auth-date Conditional Data Sharing, Service Initiation, Confirmation of Payee x-customer-user-agent Optional Data Sharing, Service Initiation, Confirmation of Payee x-idempotency-key Required POST /payments A UUID v4 correlation identifier that links a request to its response and enables end-to-end traceability across the ecosystem. Format: UUID v4 (RFC 4122), e.g. 7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c Level: Recommended on all requests. TPPs SHOULD include this header on every outbound call. LFI behaviour: The API Hub echoes the value verbatim in the x-fapi-interaction-id response header. If the header is absent, the API Hub generates a UUID and returns it in the response. TPPs should log the interaction ID alongside every outbound request and its response. This enables correlation of issues across TPP systems, the API Hub and the LFI systems, and Nebras support. The API Hub validates the format of x-fapi-interaction-id . If the value is not a valid UUID v4, the request will not fail , but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID cannot be used for tracing or support — the value in your logs will not match anything on the API Hub side. Do not use any format that does not conform to RFC 4122 UUID v4. Even values that look similar (e.g. GUIDs or UUIDs without hyphens) will be discarded. The IP address of the customer's device at the time of the request. Format: IPv4 or IPv6 string, e.g. 192.168.1.1 or 2001:db8::1 Level: Required when the customer is present in an active end user-facing session. Required on all Product and Leads endpoints regardless of session context. Where the TPP cannot determine the customer's IP address (e.g. in a server-to-server background call), this header should be omitted. The date and time at which the customer last authenticated with the TPP. Format: RFC 7231 HTTP-date, e.g. Sun, 10 Sep 2023 19:43:31 UTC Level: Required when the customer is present in an active end user-facing session (i.e. the request is being made on behalf of a customer who is currently logged in). Optional for background/automated calls. This header informs the LFI's fraud and risk controls. Omitting it during an end user-facing session may cause the LFI to treat the call as a background operation, which can affect consent and session handling. The user-agent string of the customer's browser or application. Format: Standard HTTP User-Agent string, e.g. Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) Level: Optional. Recommended where the customer is accessing the TPP via a browser or native application. This header supports LFI fraud detection and device fingerprinting. It should reflect the customer's actual device, not the TPP's server. A unique key that guarantees exactly-once processing of payment initiation requests. Format: String, maximum 40 characters, no whitespace — pattern ^(\\S*)$ Level: Required on all POST /payments requests. Scope: Unique per consent. The same key must not be reused across different consents. Rules If the API Hub receives a POST /payments request with an x-idempotency-key it has already processed for the same consent, it must return the original response without re-processing the payment. TPPs must not change the request body when replaying a request with the same idempotency key. TPPs must preserve the idempotency key when retrying after a network failure or timeout. Do not generate a new key for a retry — this would create a duplicate payment. The API Hub echoes the x-idempotency-key in the response header. If a TPP generates a new x-idempotency-key on retry after a time"
  },
  {
    "title": "Retrieve a Employment Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Retrieve a Employment Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Health Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Retrieve a Health Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Home Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Retrieve a Home Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Life Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Retrieve a Life Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Motor Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Retrieve a Motor Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Renters Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Retrieve a Renters Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve a Travel Insurance Quote",
    "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — Retrieve a Travel Insurance Quote",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve all Available Open Finance Servers and API Resources",
    "path": "/tech/tpp-standards/trust-framework/open-api/participants",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "Trust Framework — Retrieve all Available Open Finance Servers and API Resources",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve ATMs",
    "path": "/tech/tpp-standards/v2.1/banking/atms/open-api/atms",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Retrieve ATMs",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Bank Data Sharing Consent by ConsentId",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Retrieve Bank Data Sharing Consent by ConsentId",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Bank Data Sharing Consents by BaseConsentId",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Retrieve Bank Data Sharing Consents by BaseConsentId",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Banking products currently publicly available",
    "path": "/tech/tpp-standards/v2.1/banking/products-leads/open-api/products",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking — Retrieve Banking products currently publicly available",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Insurance Data Sharing Consent by ConsentId",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents-ConsentId",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Retrieve Insurance Data Sharing Consent by ConsentId",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Insurance Data Sharing Consents by BaseConsentId",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Retrieve Insurance Data Sharing Consents by BaseConsentId",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Payment Consent by ConsentId",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Retrieve Payment Consent by ConsentId",
    "headings": [],
    "body": ""
  },
  {
    "title": "Retrieve Payment Consents by BaseConsentId",
    "path": "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
    "category": "TPP Standards",
    "section": "Consent",
    "description": "Consent — Retrieve Payment Consents by BaseConsentId",
    "headings": [],
    "body": ""
  },
  {
    "title": "Risk",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Service Initiation · PII · Risk Risk 5 min read The Risk object is a required part of the PII payload submitted at both POST /par (consent staging) and POST /payments (payment…",
    "headings": [
      "Risk 5 min read",
      "Authentication",
      "UserName",
      "GeoLocation",
      "DeviceInformation",
      "AppInformation (mobile apps)",
      "BrowserInformation (web sessions)",
      "BiometricCapabilities",
      "UserBehavior",
      "AccountRiskIndicators",
      "SupplementaryData",
      "MerchantRisk (e-commerce payments)"
    ],
    "body": "Service Initiation · PII · Risk Risk 5 min read The Risk object is a required part of the PII payload submitted at both POST /par (consent staging) and POST /payments (payment initiation). It carries contextual signals about the debtor, the transaction, and the creditor that the LFI uses for fraud scoring and risk assessment. TPPs must populate every field that is known or derivable from their system. Omitting available data degrades the LFI's ability to assess the payment accurately. At the same time, the schema enforces additionalProperties: false at the root — no fields outside the defined schema are permitted. Like all PII, the Risk object is encrypted inside the JWE and is only readable by the destination LFI. Property Description DebtorIndicators Signals about the user: authentication method, device, location, account history TransactionIndicators Signals about the transaction itself: channel, customer presence, merchant context CreditorIndicators Signals about the payee: account type, merchant details, COP verification DestinationDeliveryAddress Postal delivery address for the goods or services, if applicable Authentication Field Type Description AuthenticationChannel enum Channel on which the user authenticated: App , Web PossessionFactor.IsUsed boolean Whether a possession factor was used PossessionFactor.Type enum FIDO2SecurityKey , Passkey , OTPDevice , OTPApp , SMSOTP , EmailOTP , PushNotification , WebauthnToken , SecureEnclaveKey , HardwareOTPKey , TrustedDevice , Other KnowledgeFactor.IsUsed boolean Whether a knowledge factor was used KnowledgeFactor.Type enum PIN , Password , SecurityQuestion , SMSOTP , EmailOTP , OTPPush , Other InherenceFactor.IsUsed boolean Whether a biometric/inherence factor was used InherenceFactor.Type enum Biometric , Fingerprint , FaceRecognition , IrisScan , VoiceRecognition , FIDOBiometric , DeviceBiometrics , Other ChallengeOutcome enum Result of MFA: Pass , Fail , NotPerformed AuthenticationFlow enum MFA , Other AuthenticationValue string Cryptographic proof of authentication, where supported ChallengeDateTime date-time When the authentication challenge was completed UserName Field Type Description en string User's name in English ar string User's name in Arabic GeoLocation Field Type Required Description Latitude string Yes GPS latitude of the user's device Longitude string Yes GPS longitude of the user's device DeviceInformation Field Type Description DeviceId string IMEISV number of the device AlternativeDeviceId string Alternative device identifier DeviceOperatingSystem string OS name (e.g. iOS, Android) DeviceOperatingSystemVersion string OS version DeviceBindingId string Identifier binding the device to this application LastBindingDateTime date-time When the device was last bound BindingDuration duration ISO 8601 duration since last binding (e.g. P30D ) BindingStatus enum Active , Expired , Revoked , Suspended DeviceType enum Mobile , Desktop , Tablet , Wearable , Other DeviceManufacturer.Model string Device model name DeviceManufacturer.Manufacturer string Device manufacturer DeviceLanguage string Device language setting DeviceLocalDateTime string Local time on the device at initiation ConnectionType enum WiFi , Cellular , Other ScreenInformation.PixelDensity number Screen pixel density ScreenInformation.Orientation enum Portrait , Landscape BatteryStatus.Level number Battery level 0–100 BatteryStatus.IsCharging boolean Whether device is charging TouchSupport.Supported boolean Whether the device supports touch input TouchSupport.MaxTouchPoints integer Maximum simultaneous touch points MotionSensors.Status enum InMotion , Stationary MotionSensors.Accelerometer boolean Whether accelerometer is present MotionSensors.Gyroscope boolean Whether gyroscope is present DeviceEnvironmentContext array<enum> VPNDetected , EmulatorDetected AppInformation (mobile apps) Field Type Description AppVersion string Version of the TPP's mobile app PackageName string Application package identifier"
  },
  {
    "title": "Sandbox — Model Bank",
    "path": "/tech/tpp-standards/sandbox/model-bank",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP · Sandbox · Model Bank Sandbox — Model Bank 2 min read To support onboarding and early development, a Model Bank has been deployed within the sandbox environment. This…",
    "headings": [
      "Sandbox — Model Bank 2 min read",
      "Banking API Current"
    ],
    "body": 'TPP · Sandbox · Model Bank Sandbox — Model Bank 2 min read To support onboarding and early development, a Model Bank has been deployed within the sandbox environment. This simulated Licensed Financial Institution mirrors the structure and behavior of a real LFI, providing TPPs with a safe, compliant space to test their end-to-end integration flows. The Model Bank is registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and Open Finance APIs — just like any production LFI. TPPs can use it to: Explore API discovery via the .well-known endpoint Test registration with real (sandbox) software statements Validate certificate-based authentication and mutual TLS setups Simulate consent flows, account access, and payment initiation The .well-known endpoint for the Model Bank is: The .well-known endpoint exposes the following critical information values: Field Value issuer https://auth1.altareq1.sandbox.apihub.openfinance.ae authorization_endpoint https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth par_endpoint https://as1.altareq1.sandbox.apihub.openfinance.ae/par token_endpoint https://as1.altareq1.sandbox.apihub.openfinance.ae/token registration_endpoint https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration jwks_uri https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks Resource Server ( rs ) https://rs1.altareq1.sandbox.apihub.openfinance.ae 0 }" > Banking API Current Login Username Password Accounts AccountId SchemeName Identification AccountType Name'
  },
  {
    "title": "Sandbox — Model Insurer",
    "path": "/tech/tpp-standards/sandbox/model-insurer",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "TPP · Sandbox · Model Insurer Sandbox — Model Insurer 2 min read To support onboarding and early development, a Model Insurer has been deployed within the sandbox environment.…",
    "headings": [
      "Sandbox — Model Insurer 2 min read"
    ],
    "body": "TPP · Sandbox · Model Insurer Sandbox — Model Insurer 2 min read To support onboarding and early development, a Model Insurer has been deployed within the sandbox environment. This simulated Licensed Financial Institution mirrors the structure and behavior of a real insurer, providing TPPs with a safe, compliant space to test their end-to-end Insurance Data Sharing integration flows. Like the Model Bank , the Model Insurer is registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and Open Finance APIs — just like any production LFI. TPPs use it to gather Insurance Data Sharing Functional Certification evidence. It lets you: Explore API discovery via the .well-known endpoint Test registration with real (sandbox) software statements Validate certificate-based authentication and mutual TLS setups Simulate consent flows and retrieve insurance policy data across sectors The .well-known endpoint for the Model Insurer is: The .well-known endpoint exposes the following critical information values: Field Value issuer https://auth1.altareq2.sandbox.apihub.openfinance.ae authorization_endpoint https://auth1.altareq2.sandbox.apihub.openfinance.ae/auth par_endpoint https://as1.altareq2.sandbox.apihub.openfinance.ae/par token_endpoint https://as1.altareq2.sandbox.apihub.openfinance.ae/token registration_endpoint https://rs1.altareq2.sandbox.apihub.openfinance.ae/tpp-registration jwks_uri https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks Resource Server ( rs ) https://rs1.altareq2.sandbox.apihub.openfinance.ae Login Username Password mits mits Policies Two policies are available per sector, across the six insurance sectors the Model Insurer underwrites. InsurancePolicyId Type PolicyNumber 10000000-0000-0000-0000-000000000001 employment P1000000000000001 10000000-0000-0000-0000-000000000002 employment P0000000000000002 20000000-0000-0000-0000-000000000001 health P2000000000000001 20000000-0000-0000-0000-000000000002 health P2000000000000002 30000000-0000-0000-0000-000000000001 home P3000000000000001 30000000-0000-0000-0000-000000000002 home P3000000000000002 40000000-0000-0000-0000-000000000001 life P4000000000000001 40000000-0000-0000-0000-000000000002 life P4000000000000002 50000000-0000-0000-0000-000000000001 motor P5000000000000001 50000000-0000-0000-0000-000000000002 motor P5000000000000002 60000000-0000-0000-0000-000000000001 renters P6000000000000001 60000000-0000-0000-0000-000000000002 renters P6000000000000002"
  },
  {
    "title": "Security Validation",
    "path": "/tech/tpp-standards/production/testing-certification/security-validation",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Testing & Certification · Security Security Validation 2 min read Before a TPP is approved for production access, it must submit the results of a penetration test to Nebras. This…",
    "headings": [
      "Security Validation 2 min read",
      "Scope",
      "Independence",
      "Application State",
      "Security Resilience"
    ],
    "body": "Testing & Certification · Security Security Validation 2 min read Before a TPP is approved for production access, it must submit the results of a penetration test to Nebras. This requirement provides independent assurance that the TPP's application can withstand real-world attack scenarios and that user data and financial transactions are adequately protected. Scope The penetration test must cover the full extent of the TPP's services that rely on the Open Finance implementation — including all integration points, authentication flows, consent handling, data access, and payment initiation paths. Testing a subset of the application is not sufficient. Independence The test must be carried out by an independent third party . Internal security assessments or self-attested reviews do not satisfy this requirement. The testing organisation must have no material conflict of interest with the TPP. Application State The test must be conducted against the application in a production-like state — meaning the codebase, configuration, and infrastructure assessed must closely reflect what will be deployed to production. The test should not be run against an application that is mid-development or expected to undergo significant change before go-live. The penetration test does not need to be run against the live production environment. A staging or pre-production environment that mirrors production in architecture, configuration, and behaviour is acceptable, provided it is representative of what will go live. Security Resilience The test report must demonstrate significant security resilience across the areas relevant to an Open Finance TPP integration, including but not limited to: Authentication and session management (OAuth 2.0, PKCE, token handling) mTLS certificate usage and private key protection Consent data handling and access control enforcement Input validation and injection attack resistance Sensitive data storage and transmission API rate limiting and abuse prevention Third-party dependency and supply chain risk The penetration test report must be submitted to Nebras as part of the production approval process. Nebras reserves the right to request clarification, require remediation of identified findings, or request a re-test before granting production access. Any critical or high severity findings identified in the penetration test must be remediated and evidenced before production access will be granted. Medium and lower severity findings must be acknowledged with a documented remediation plan. The penetration test is a point-in-time assessment required before go-live — it is not a substitute for a continuous security posture. Once live in production, TPPs take full responsibility for the ongoing security of their platform. This includes, but is not limited to, keeping dependencies patched, monitoring for vulnerabilities, responding promptly to security incidents, and repeating penetration testing whenever significant changes are made to the application or its Open Finance integration. A material change to the platform — such as a new payment flow, a new data access surface, or a change in infrastructure — should trigger a targeted security review. Nebras may request updated evidence of security assurance at any point after go-live."
  },
  {
    "title": "Single Instant Payment - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Single Instant Payment · UX Single Instant Payment — User Experience 4 min read Before a customer authorises a payment through Open Finance, you…",
    "headings": [
      "Single Instant Payment — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Single Instant Payment · UX Single Instant Payment — User Experience 4 min read Before a customer authorises a payment through Open Finance, you must present a Consent Page that clearly explains the payment they are consenting to. This page must accurately reflect the payee, amount, schedule, and all material terms of the payment consent. The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live. Simulated Accounts Behaviour Duplicate Payment Alert Payment Limit Exceeded Already a Trusted Payee"
  },
  {
    "title": "Single Instant Payment — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Single Instant Payment Single Instant Payment — API Guide 5 min read A Single Instant Payment is a one-time, immediate domestic payment…",
    "headings": [
      "Single Instant Payment — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters.ConsentSchedule.SinglePayment (Required)",
      "Example request",
      "A successful POST /payments"
    ],
    "body": "TPP · Banking · Service Initiation · Single Instant Payment Single Instant Payment — API Guide 5 min read A Single Instant Payment is a one-time, immediate domestic payment initiated by the TPP on behalf of the user. The payment amount and destination are fixed at the point of consent — the user approves once, and the payment executes immediately after authorization. Before initiating a Single Instant Payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . The encrypted PII is embedded as consent.PersonalIdentifiableInformation . authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year) 2026-05-03T15:46:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-05-03T16:00:00+00:00 BaseConsentId string (uuid) Used when amending or renewing an existing consent — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Payment schedule and amount. Described below. — PersonalIdentifiableInformation * string (JWE) Encrypted creditor and risk data — the encryptedPII string from Step 1 eyJhbGci... PaymentPurposeCode * string (3 chars) AANI payment purpose code ACM DebtorReference string Reference shown on the debtor's statement Test Purchase CreditorReference string Reference shown on the creditor's statement Test Purchase ControlParameters.ConsentSchedule.SinglePayment (Required) Field Type Description Example Type * enum Must be SingleInstantPayment SingleInstantPayment Amount.Amount * string Payment amount (decimal, max 2 d.p.) 100.00 Amount.Currency * string ISO 4217 currency code AED Example request Save codeVerifier in your server-side session or an httpOnly cookie — you will need it in Step 8 to exchange the authorization code for tokens. See Preparing the Request JWT for the full JWT claim reference and PKCE helpers. The authorization_endpoint is found in the LFI's .well-known/openid-config"
  },
  {
    "title": "Single Instant Payment — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Testing & Certification Overview",
    "path": "/tech/tpp-standards/production/testing-certification/overview",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Production · Testing & Certification Testing & Certification Overview 3 min read Before a Third Party Provider (TPP) can connect to a live Licensed Financial Institution (LFI) in…",
    "headings": [
      "Testing & Certification Overview 3 min read",
      "Functional Evidence",
      "User Experience Evidence",
      "FAPI Conformance",
      "Security Validation"
    ],
    "body": "Production · Testing & Certification Testing & Certification Overview 3 min read Before a Third Party Provider (TPP) can connect to a live Licensed Financial Institution (LFI) in production, it must satisfy two independent sets of requirements: regulatory licensing and Nebras technical certification. TPPs must hold a valid licence issued by the Central Bank of the UAE (CBUAE) before being granted access to production. Nebras certification is a separate, technical requirement and does not replace or supersede any CBUAE licensing obligation. You must contact the CBUAE directly to understand the licensing requirements applicable to your proposition and business model. Production access will not be granted until a valid CBUAE licence has been confirmed. You may work through the Nebras certification process in parallel with your licensing application, but both must be satisfied before go-live. Nebras requires all TPPs to complete the following certification areas before production access is granted. These requirements apply regardless of which LFI you are connecting to and are in addition to any requirements that individual LFIs may impose. Each area maps to a Certification Type in the Service Desk evidence ticket. 01 · Evidence Functional Evidence Documented proof that your proposition calls only the APIs it needs, requests only the minimum permissions required, and handles consent states correctly. Certification Type TPP Functional Certification Evidence Start certification ↗ 02 · Evidence User Experience Evidence Evidence that your consent and authorisation flows meet Nebras user experience requirements. Certification Type TPP CX Certification Evidence Open requirements ↗ 03 · Conformance FAPI Conformance Results from running the OpenID Foundation FAPI conformance test suite against your client configuration. Certification Type TPP FAPI Certification Evidence Open guidance ↗ 04 · Validation Security Validation Confirmation that your key management, certificate handling, and data security practices meet Nebras policy requirements. Certification Type Penetration Test Results Open requirements ↗ All four areas must be satisfied before Nebras will grant production access to a live LFI environment. Certification evidence is submitted to Nebras through the Service Desk , using the dedicated Providing certification evidence request type. The link is the same for every area, but each area is its own ticket: raise four tickets — one for Functional, one for User Experience, one for FAPI, and one for Security — and pick the matching Certification Type from the dropdown on each. The Service Desk is gated by Sandbox Trust Framework SSO — see Support & Service Desk for access prerequisites, what to include in a ticket, and the alternative email and telephone channels. Once in production, the TPP MUST maintain its certified state across every area continuously, not only at the point of certification. Material changes to the TPP's platform, to the Open Finance standards, or to the FAPI profile may trigger re-certification of the affected area; Nebras may also request fresh evidence at any time after go-live. Functional conformance — the TPP MUST continue to call only the APIs required by its proposition, request only the minimum permissions needed, and handle consent state changes correctly as the Open Finance specification evolves. User experience — consent and authorisation flows MUST continue to meet Nebras CX requirements as those requirements are updated. Security of the TPP's systems — the TPP MUST keep dependencies patched, monitor for vulnerabilities, respond to incidents, and repeat penetration testing whenever significant changes are made to the application or its Open Finance integration. FAPI alignment — the TPP MUST maintain a current OIDF CBUAE FAPI 2.0 RP Message Signing certification, and re-certify against each new major version of the standards. The certification requirements in this section are set by Nebras and govern techni"
  },
  {
    "title": "Token endpoint",
    "path": "/tech/tpp-standards/security/tokens/open-api/token",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security — Token endpoint",
    "headings": [],
    "body": ""
  },
  {
    "title": "Tokens & Assertions",
    "path": "/tech/tpp-standards/security/tokens/",
    "category": "TPP Standards",
    "section": "Security",
    "description": "Security · OAuth 2.0 · Bearer tokens Tokens 2 min read In UAE Open Finance, your application uses two types of OAuth 2.0 bearer tokens to make API calls on behalf of a consenting…",
    "headings": [
      "Tokens 2 min read",
      "Browse this section",
      "Preparing Client Assertion",
      "Create an Access Token"
    ],
    "body": "Security · OAuth 2.0 · Bearer tokens Tokens 2 min read In UAE Open Finance, your application uses two types of OAuth 2.0 bearer tokens to make API calls on behalf of a consenting customer. Token Purpose Lifetime Access token Authorises individual API requests 10 minutes Refresh token Obtains new access tokens without re-authorising the customer Duration of the consent An access token is a short-lived credential that your application includes in the Authorization header of every protected API call: Access tokens expire after 10 minutes . Once expired, any API call using that token will receive a 401 Unauthorized response. Your application must silently refresh the access token using the refresh token before retrying. Check the expires_in field returned by the /token endpoint (value: 600 seconds). Track the issue time and proactively refresh before the window closes rather than waiting for a 401. A refresh token allows your application to obtain a new access token without prompting the customer to re-authorise. It is issued alongside the access token during the authorisation code exchange. The refresh token remains valid for the lifetime of the consent . Once the consent expires — determined by its ExpirationDateTime — the refresh token is also invalidated and the customer must re-authorise. The ExpirationDateTime is set when the consent resource is created and returned in the consent response object. See the Consent API Guide for details on consent lifecycle and expiry. To exchange a refresh token for a new access token, POST to the /token endpoint with grant_type=refresh_token and a freshly signed client assertion . See the Token endpoint API Reference for the full request and response schema. Section contents Browse this section The full set of pages covering tokens and client assertions in UAE Open Finance. Page Preparing Client Assertion How to construct and sign the JWT used to authenticate your application at /par and /token . Open → Endpoint POST /token Create an Access Token OpenAPI reference for the POST /token endpoint — authorization code exchange, refresh token grant, and the consent object returned in the response. Open spec →"
  },
  {
    "title": "TPP Functional Certification",
    "path": "/tech/tpp-standards/production/testing-certification/functional/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Overview — TPP Functional Certification",
    "headings": [],
    "body": ""
  },
  {
    "title": "TPP Registration endpoint",
    "path": "/tech/tpp-standards/registration/open-api/tpp-registration",
    "category": "TPP Standards",
    "section": "Registration",
    "description": "Registration — TPP Registration endpoint",
    "headings": [],
    "body": ""
  },
  {
    "title": "TPP Standards",
    "path": "/tech/tpp-standards/",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Build · Integrate · Certify TPP Standards The Open Finance Standards in the United Arab Emirates form the technical and operational foundation for secure, interoperable, and…",
    "headings": [
      "TPP Standards",
      "Sections"
    ],
    "body": "Build · Integrate · Certify TPP Standards The Open Finance Standards in the United Arab Emirates form the technical and operational foundation for secure, interoperable, and customer-consented data sharing across the financial ecosystem. Led by the Central Bank of the UAE (CBUAE) , the framework extends beyond traditional open banking to enable broader financial data access, payment initiation, and value-added services — all built on strong security, governance, and consumer protection principles. This documentation is for Third-Party Providers (TPPs) consuming Open Finance capabilities — including account information services, payment initiation, and other regulated financial data use cases. LFI? See the LFI Integration Guide → Guide sections Sections Work through each area of the TPP integration. Start with Getting Started to register your sandbox client and generate a ready-to-use Postman collection, then progress through Trust Framework registration, security profile, consent, and the banking APIs. Open section → → Open Finance overview →"
  },
  {
    "title": "Trust Framework — Adding Users",
    "path": "/tech/tpp-standards/trust-framework/adding-users",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Onboarding Adding Users 2 min read Organisation Administrators can onboard Users. User Type Access Scope Primary Technical Contact (PTC) Can manage all…",
    "headings": [
      "Adding Users 2 min read"
    ],
    "body": "TPP · Trust Framework · Onboarding Adding Users 2 min read Organisation Administrators can onboard Users. User Type Access Scope Primary Technical Contact (PTC) Can manage all technical resources of an Organisation — Applications and Certificates. Secondary Technical Contact (STC) Can manage Data Providers, adding and removing API Endpoints and Certifications. Cannot manage Applications and Certificates. Primary Business Contact (PBC) Can manage Contacts in the Organisation. Cannot manage Technical Resources. Secondary Business Contact (SBC) Has read-only access to Trust Framework resources. Cannot manage Applications, Certificates or any other resource in the Trust Framework. Onboarding a user as a Secondary Business Contact (SBC) in the Sandbox Trust Framework ( https://web.sandbox.directory.openfinance.ae/ ) is recommended if the user only needs access to the Nebras Jira Service Desk via Trust Framework SSO. The Primary Technical Contact is the key technical owner within the organisation on the Trust Framework. The PTC is responsible for managing all applications and the keys and certificates within those applications. This includes: Creating and configuring applications Managing certificates (Transport, Signing, and Encryption) for each application Keeping keys and certificates current and renewing them before expiry Ensuring applications are correctly configured with the required roles and certificates See Applications for more on creating and managing applications, and Keys & Certificates for certificate management. Log in to the Trust Framework and navigate to the Roles section within your organisation. Navigate to a role within your organisation. Users can be added under any role, but for easier management it is recommended to add all users consistently under the same role. Navigate to the Domain Users section of your organisation. Click + New Domain User . Select the System as AlTareq Trust Framework and select the relevant user role — PTC , PBC , STC , or SBC . Enter the new user's email address and confirm. The invited user will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what the user must do next, see Sign Up . If a user does not receive the invitation email, ask them to check their spam folder."
  },
  {
    "title": "Trust Framework — API Discovery",
    "path": "/tech/tpp-standards/trust-framework/api-discovery",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · LFI Discovery API Discovery 2 min read The Trust Framework also serves as a central hub for API discovery. LFIs publish their Open Finance API endpoints,…",
    "headings": [
      "API Discovery 2 min read",
      "Example Request",
      "Endpoint",
      "Caching",
      "Legal & Regulatory Identity"
    ],
    "body": "TPP · Trust Framework · LFI Discovery API Discovery 2 min read The Trust Framework also serves as a central hub for API discovery. LFIs publish their Open Finance API endpoints, capabilities, and registration details — allowing TPPs to programmatically discover, onboard, and integrate with confidence across the entire Open Finance network. Understanding of the various organizations within the Trust Framework and their respective roles in enabling Open Finance. The Participants endpoint serves as the entry point for discovering Open Finance resources published by Licensed Financial Institutions (LFIs). When queried, it returns a list of LFI's associated Authorization Servers. Each Authorization Server record includes detailed metadata such as the OpenID Discovery Document (also referred to as the .well-known endpoint), as well as the API resources and endpoints exposed by that server. This information enables Third Party Providers (TPPs) to programmatically discover, register with, and integrate against the APIs offered by each LFI. GET /participants Example Request Endpoint Sandbox: https://data.sandbox.directory.openfinance.ae/participants Production: https://data.directory.openfinance.ae/participants Example Response Caching The information returned from GET /participants changes infrequently and is cached accordingly. Cache-Control header: max-age=900 Cache duration: 15 minutes Each object in the /participants response represents an Organisation (typically a Licensed Financial Institution) that has exposed at least one Authorisation Server available for discovery and integration within the ecosystem. Legal & Regulatory Identity OrganisationName LegalEntityName RegistrationNumber CompanyRegister CountryOfRegistration Status CreatedOn These fields confirm the legal identity and operational status of the organization. Each Authorisation Server represents an Ozone API Hub through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. Each server record includes customer-facing metadata, API resources, and a pointer to its Discovery endpoint. See Authorisation Servers for full details on key properties and how to use them. See API Resources for details on the API families exposed by LFIs. See Flags & Meta Data for details on organisation/server flags and API metadata fields."
  },
  {
    "title": "Trust Framework — API Resources",
    "path": "/tech/tpp-standards/trust-framework/api-resources",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · LFI Discovery API Resources 2 min read The API resources hosted on an LFI's Authorisation Server represent the key resources that are exposed through…",
    "headings": [
      "API Resources 2 min read",
      "Consent Endpoints",
      "Resource Endpoints",
      "Consent Endpoints",
      "Resource Endpoints"
    ],
    "body": "TPP · Trust Framework · LFI Discovery API Resources 2 min read The API resources hosted on an LFI's Authorisation Server represent the key resources that are exposed through various endpoints. The format of these endpoints is: Production: https://rs1.[LFICode].apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint] Sandbox: https://rs1.[LFICode].sandbox.apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint] These endpoints are organized into structured categories known as API families . Each API family groups together related functionality, making it easier for TPPs to understand the available services. This family includes endpoints related to initiating and managing payments. These endpoints are part of the Bank Service Initiation functionality and associated with the BSIP role. Allowed API scopes: openid payments Consent Endpoints These endpoints are used to create and manage payment consents. Supported grant type: client_credentials Example endpoints: https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents/{ConsentId} Resource Endpoints These endpoints are used to initiate and retrieve payments, including file-based payments. Supported grant types: authorization_code , refresh_token Example endpoints: https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments/{PaymentId} https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/file-payments This family includes endpoints related to retrieving bank data e.g. accounts, balances, transactions, etc. These endpoints are part of the Bank Data Sharing functionality and are associated with the BDSP role. Allowed API scopes: openid accounts Supported grant types: authorization_code , refresh_token Consent Endpoints These endpoints are used to create and manage account information consents. Supported grant type: client_credentials Example endpoints: https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents/{ConsentId} Resource Endpoints These endpoints are used to retrieve account information. Supported grant types: authorization_code , refresh_token Example endpoints: https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/balances https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/transactions This family includes endpoints related to the discovery and confirmation of bank account details, such as verifying account ownership before initiating payments. These endpoints are part of the Confirmation of Payee functionality and are associated with the BSIP role. Allowed API scopes: openid payments Supported grant types: client_credentials Resource Endpoint examples: https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/confirmation https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/discovery This family includes endpoints related to the discovery of banking products and posting a user who is interested in applying for a banking product. Associated with the BDSP role. Allowed API scopes: openid accounts Supported grant types: client_credentials Resource Endpoint examples: https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/products https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/leads This family includes endpoints related to the discovery of an LFI's ATM network — locations, services, and accessibility data. These endpoints are "
  },
  {
    "title": "Trust Framework — Application",
    "path": "/tech/tpp-standards/trust-framework/application",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Applications Application 2 min read Within the Trust Framework, an application performs two closely related roles: software statement and client . As a…",
    "headings": [
      "Application 2 min read"
    ],
    "body": "TPP · Trust Framework · Applications Application 2 min read Within the Trust Framework, an application performs two closely related roles: software statement and client . As a software statement, the application contains the key information required to establish a trusted connection with other organisations. This includes: The roles it is permitted to perform (e.g. BDSP , BSIP ) The organisation it belongs to Its approved capabilities and permissions In this role, it defines the identity and permissions of the application as authorised within the ecosystem. As a client, the same application becomes the active connection to another organisation (such as the API Hub). In this role, it: Is issued credentials (such as a client ID and certificates) Uses those credentials to make API calls and perform transactions Is registered with the API Hub In simple terms: An application both defines what it is allowed to do and uses those permissions to interact with other participants , in line with the rules set by the Central Bank of the UAE. Each application must include the following details: Feature Description Example Roles Functional roles assigned to the application, inherited from the parent organisation's registered roles. BSIP , BDSP Client Name The public-facing name of the application as registered in the Trust Framework. MyApp v1 Version The current version of the application or software statement. 1.0.3 Federation Entity Management Type Specifies how the application's entity is managed within the federation (e.g., self-managed or delegated). federation-managed Logo A PNG or JPEG image uploaded to represent the application. Used in portals and consent screens. logo.png Redirect URI Must be a valid HTTPS URI that complies with FAPI standards for redirection after authentication. More information on Mobile app Redirect URIs . https://app.example.com/callback"
  },
  {
    "title": "Trust Framework — Authorisation Servers",
    "path": "/tech/tpp-standards/trust-framework/authorisation-servers",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · LFI Discovery Authorisation Servers 2 min read Each Authorisation Server represents an Ozone API Hub through which a Licensed Financial Institution (LFI)…",
    "headings": [
      "Authorisation Servers 2 min read"
    ],
    "body": `TPP · Trust Framework · LFI Discovery Authorisation Servers 2 min read Each Authorisation Server represents an Ozone API Hub through which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. These servers allow Third Party Providers (TPPs) to authenticate, request consent, and interact securely with the LFI's API ecosystem. Each server object provides both technical and customer-facing metadata, enabling TPPs to integrate programmatically while also presenting consistent branding to end-users. Property Description AuthorisationServerId Unique identifier for this Authorisation Server. Status Current status of the server (e.g., Active). Issuer Base URL of the Authorization Server used for token validation and JWT verification. OpenIDDiscoveryDocument URL of the .well-known/openid-configuration endpoint containing OAuth 2.0 and OpenID Connect metadata. This document provides TPPs with all necessary endpoints for registration, authentication, and token exchange. CustomerFriendlyName Display name chosen by the LFI to represent the server to Customers. TPPs should present this to end-users. Example: "ENBDX" . CustomerFriendlyLogoUri URL to the logo the LFI considers best for the server. TPPs should use this logo when displaying the server to end-users to maintain consistent branding. Example: https://data.directory.openfinance.ae/logos/.../authorisationservers/...png . The CustomerFriendlyLogoUri and CustomerFriendlyName allow TPPs to display a consistent user interface for end-users when selecting or authenticating with an Authorisation Server. This ensures the server is easily identifiable and trusted by customers. Always use the logo dynamically from CustomerFriendlyLogoUri rather than hardcoding, so any updates made by the LFI are automatically reflected. OpenIDDiscoveryDocument is the URL of the LFI's .well-known/openid-configuration endpoint — it is a pointer, not the configuration data itself. To obtain the actual endpoints your application needs (such as authorization_endpoint , token_endpoint , pushed_authorization_request_endpoint , and registration_endpoint ), you must make a separate GET request to that URL. Additional details about the Discovery endpoint can be found in Discovery .`
  },
  {
    "title": "Trust Framework — Certificates with a SAN",
    "path": "/tech/tpp-standards/trust-framework/certificates-san/",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Certificates Certificates with a SAN 2 min read The Subject Alternative Name (SAN) extension is required on server-side certificates — specifically the…",
    "headings": [
      "Certificates with a SAN 2 min read"
    ],
    "body": "TPP · Trust Framework · Certificates Certificates with a SAN 2 min read The Subject Alternative Name (SAN) extension is required on server-side certificates — specifically the transport certificates LFIs present at their API Hub endpoints. The Subject Alternative Name (SAN) extension is required on server-side certificates — specifically the transport certificates LFIs present at their API Hub endpoints. TPPs generating client certificates (transport, signing, or encryption) do not add a SAN; they set the CN to their application's Client ID instead. See Keys and Certificates for client certificate requirements. Modern browsers and certificate authorities no longer rely on the Common Name (CN) field for hostname validation on server certificates. Instead, they require the Subject Alternative Name (SAN) extension specifying the DNS hostnames the certificate is valid for — in this context, the API Hub instance the LFI operates. To include a SAN directly in the CSR without needing a separate config file, you can use the -addext option: In this example, some.hostname.com will appear in the SAN extension of the CSR. Historically, SSL/TLS server certificates included the Common Name (CN) to specify the hostname. However: CN is deprecated — as of RFC 2818 and subsequent updates, browsers and certificate authorities have stopped using CN for hostname validation on server certificates. SAN is mandatory — the Subject Alternative Name is now the authoritative field for hostname checking. Multiple hostnames — SAN supports multiple DNS names (and IP addresses), whereas CN supports only one. For server certificates, modern CSRs omit CN and rely solely on SAN. The -addext option was introduced in OpenSSL 1.1.1 (released September 2018). If you are using OpenSSL 1.1.1 or later, you can add SANs inline as shown above. On older versions of OpenSSL, you will need to use an external configuration file ( openssl.cnf ) to include SANs."
  },
  {
    "title": "Trust Framework — Contacts",
    "path": "/tech/tpp-standards/trust-framework/contacts",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Contacts Contacts 2 min read Organisation Contacts allow Organisations to register specific personnel contact information within the Trust Framework,…",
    "headings": [
      "Contacts 2 min read"
    ],
    "body": "TPP · Trust Framework · Contacts Contacts 2 min read Organisation Contacts allow Organisations to register specific personnel contact information within the Trust Framework, ensuring that participants from other Organisations can easily reach the appropriate departments when needed. The contact details registered here are visible to other participants outside your organisation. Type Purpose Security Security incidents, vulnerability disclosures, and certificate issues Billing Commercial and billing enquiries Incident Operational incidents and service disruptions Technical Technical integration and API support Business General business and partnership enquiries Each contact requires an email address and a phone number . Log in to the Trust Framework and navigate to your organisation. Navigate to the Contacts section of your organisation. Click + New Contact . Select the Contact Type and enter the email address and phone number of the contact. Save the contact."
  },
  {
    "title": "Trust Framework — Creating an Application",
    "path": "/tech/tpp-standards/trust-framework/creating-an-application",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Applications Creating an Application 3 min read Step-by-step walkthrough for creating a new Application in the Trust Framework Directory. Navigate to '+…",
    "headings": [
      "Creating an Application 3 min read",
      "Navigate to '+ New Application'",
      "Select the application roles",
      "Provide the Client Details",
      "Provide the Redirect URI",
      "Add Webhook URIs (optional)",
      "Finish creating the application"
    ],
    "body": "TPP · Trust Framework · Applications Creating an Application 3 min read Step-by-step walkthrough for creating a new Application in the Trust Framework Directory. Navigate to '+ New Application' Navigate to your organisation. Open the Applications section. Click + New Application . Select the application roles Select the roles for your application. Roles define what the application is permitted to do. You can assign multiple roles, but only roles that are already assigned to your organisation are available for selection. The roles you select here determine what this application is permitted to do. Once the application has been registered with an LFI , editing its roles in the Trust Framework has no effect. If the roles later need to change, you must disable the existing application, create a new one with the correct roles, and register it again. Make sure the selected roles ( BSIP , BDSP , ISP ) match the app's intended functionality before continuing. Provide the Client Details Client Name — enter a clear, human-readable name that identifies this application (e.g. My TPP – Production ). This name may be visible to users during consent flows. Software Version — enter the version of your software (e.g. 1.0.0 ). Use a consistent versioning scheme so you can distinguish between releases in the directory. Logo — upload a clear, recognisable logo. This image is shown to users on the redirect screen when returning from an LFI, so it should accurately represent the application to a User. Federation — we recommend setting Federation to Enabled and Federation Entity Management Type to Managed . This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so LFIs can discover and validate your client without manual configuration. Provide the Redirect URI Enter the Redirect URI — the HTTPS endpoint(s) in your application that the LFI will redirect the user back to after authentication or authorisation. The redirect_uri sent in the PAR request must exactly match one of the values registered here. You can register multiple redirect URIs if your application requires them (e.g. separate URIs for different environments). See Redirect URIs for full guidance. Add Webhook URIs (optional) If your application will receive event notifications via webhooks (e.g. consent or payment status updates), enter one or more API Webhook URIs . These work in the same way as redirect URIs — multiple values are allowed, and the subscription.Webhook.Url in each consent must exactly match one of the values registered here. If you are not using webhooks, leave this field blank. See Webhooks for full guidance. Finish creating the application Click through to Create and register the application. Once your application is created, the Trust Framework assigns it a Client ID — a UUID that permanently identifies this application. You will use this value as client_id , iss , and sub in every JWT you sign, including Client Assertions and Request JWTs. Keep a note of it. Your Client ID is always visible on the application detail page in the Trust Framework Directory. If you need to retrieve it again, navigate to your Organisation → Applications → select the application."
  },
  {
    "title": "Trust Framework — Flags & Meta Data",
    "path": "/tech/tpp-standards/trust-framework/flags-metadata",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · LFI Discovery Flags & Meta Data 2 min read Flags and API metadata returned alongside /participants let TPPs filter, select, and drive business logic on top…",
    "headings": [
      "Flags & Meta Data 2 min read"
    ],
    "body": "TPP · Trust Framework · LFI Discovery Flags & Meta Data 2 min read Flags and API metadata returned alongside /participants let TPPs filter, select, and drive business logic on top of the LFIs and API families published in the Trust Framework Directory. Flags provide additional attributes about an Organisation or Authorisation Server within the /participants response. Example: This example indicates that the Authorisation Server supports Retail account types only. Integrators should interpret this as a restriction, meaning non-retail (e.g., corporate or SME) account types are not supported by this server. TPPs should use flags to apply filtering and implement business logic decisions during participant selection and integration. Each ApiResources object may include an ApiMetadata section, which provides additional information about the API that TPPs can use for business logic, filtering, or display purposes. Example: This example indicates that the account-information API family supports the account subtypes CurrentAccount , Savings , and CreditCard , and that data sharing fees exceeding the limits as defined in the commercial model will be set at 0.01 AED for this API family. TPPs can leverage ApiMetadata to: Filter available APIs by account types or product subtypes. Calculate or display applicable data sharing fees to end-users. Apply conditional business logic based on API capabilities."
  },
  {
    "title": "Trust Framework — Keys and Certificates",
    "path": "/tech/tpp-standards/trust-framework/certificates/",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Keys & Certificates Keys and Certificates 4 min read To operate within the ecosystem, your application must use certificates issued and stored within the…",
    "headings": [
      "Keys and Certificates 4 min read",
      "1. Transport Certificate — Required",
      "2. Signing Certificate — Required",
      "3. Encryption Certificate — Optional (required for participants subscribing to receive events)",
      "Generating the Private Key and CSR",
      "Navigate to App Certificates",
      "Select the certificate type",
      "Generate the private key and CSR",
      "Upload the CSR",
      "Download the certificate"
    ],
    "body": "TPP · Trust Framework · Keys & Certificates Keys and Certificates 4 min read To operate within the ecosystem, your application must use certificates issued and stored within the Trust Framework. There are three types of certificates, each serving a distinct security function. 1. Transport Certificate — Required Used for mutual TLS (mTLS) to authenticate your client (application) when making API requests. Purpose: Secure transport and client authentication Usage: mTLS handshake for all API calls Presented to: API providers during connection 2. Signing Certificate — Required Used to digitally sign JWTs your application sends — such as client assertions, request objects, etc. Purpose: Proving integrity and authenticity of signed payloads Usage: Signing the contents of JWTs 3. Encryption Certificate — Optional (required for participants subscribing to receive events) Used to encrypt data such as an event. Purpose: Ensuring only your application can read sensitive data Usage: Decrypting encrypted responses Each certificate plays a critical role in securing communication, asserting identity, and protecting data in transit. Once you understand the different certificate types, you can generate the required keys and CSRs according to the Trust Framework specifications. Keys and certificates within the Trust Framework (TF) must meet the following requirements: 2048-bit RSA private key (unencrypted) A corresponding Certificate Signing Request (CSR) signed with SHA-256 CSR subject fields must include: C → Country — must be set to AE (United Arab Emirates) O → Organization — must equal the Organization's legal name in the Trust Framework OU → Organizational Unit — must equal the Organization's ID in the Trust Framework CN → Common Name — must equal the application's Client ID (the UUID assigned by the Trust Framework when the application was created) Generating the Private Key and CSR The Trust Framework provides an example using OpenSSL to generate: A private key file ( .key ) A Certificate Signing Request file ( .csr ) Example: Replace LegalName and OrganizationId with your organisation's details from the Trust Framework. Replace UUID with your application's Client ID — the UUID assigned when the application was created (see Creating an Application ). Equivalent cryptographic tools may be used, provided all requirements above are met. The .csr file (Certificate Signing Request) must be uploaded to the Trust Framework. The .key file (Private Key) must be kept secure and must never be shared . More information on private key handling and security requirements can be found here . Navigate to App Certificates Open your application in the Trust Framework. Click App Certificates . Click + New Certificate . Select the certificate type Select the type of certificate you want to generate: Transport , Signing , or Encryption . You will need to repeat this process for each type. Generate the private key and CSR Generate your private key ( .key ) and Certificate Signing Request ( .csr ). Confirm that the CSR has been generated successfully before proceeding. The OpenSSL command shown is intended for demonstration and testing only. In production, private key generation and CSR creation must be performed within your HSM or equivalent secure key management infrastructure, in accordance with your institution's security policies. Upload the CSR Click Upload your CSR and select the .csr file generated in the previous step. Download the certificate Once the Trust Framework processes the CSR, your certificate is ready. Download the .pem certificate file. You now have the .pem / .key pair. Store your private key securely — it must never be shared. See Secure Management for requirements. Certificates are valid for 13 months and must be rotated before they expire to avoid breaking services. As a TPP you hold the private key for all of your application certificates, so you rotate each of them yourself. See Certificate Rotation for the best-practice guide coveri"
  },
  {
    "title": "Trust Framework — Onboarding",
    "path": "/tech/tpp-standards/trust-framework/onboarding",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Onboarding Onboarding 3 min read The onboarding process to the Trust Framework works in tandem with the licensing processes defined by the Central Bank of…",
    "headings": [
      "Onboarding 3 min read",
      "Sandbox Environment",
      "Production Environment"
    ],
    "body": "TPP · Trust Framework · Onboarding Onboarding 3 min read The onboarding process to the Trust Framework works in tandem with the licensing processes defined by the Central Bank of the UAE (CBUAE) . As a Third-Party Provider (TPP) , you may begin onboarding to the appropriate Trust Framework environment based on your licensing status: 01 · Sandbox Sandbox Environment You may onboard to the Sandbox Trust Framework once the CBUAE has confirmed receipt of your licence application and business plan. Request onboarding by emailing support@nebrasopenfinance.ae . View email template ↓ 02 · Production Production Environment You may onboard to the Production Trust Framework once the CBUAE has approved your licence. Request onboarding by raising a Service Desk ticket. Raise a Service Desk ticket ↗ If you have not yet started your Open Finance licensing process and are interested in finding out more, please contact connect@nebrasopenfinance.ae . Once the CBUAE has confirmed receipt of your licence application, send the following to support@nebrasopenfinance.ae to begin sandbox onboarding: To: support@nebrasopenfinance.ae Subject: Trust Framework Sandbox Onboarding Request — [Your Organisation Name] Dear Nebras Support, I wish to proceed with onboarding my organisation to the Trust Framework Sandbox. Please review the attached documents: 1. CBUAE Licence / Letter of Intent A copy of your valid Central Bank of the UAE (CBUAE) Licence, or a Letter of Intent along with the Business Proposal submitted to the CBUAE. 2. Organisation Details The completed Organisation Details form . 3. Primary Organisation Admin Details The completed Primary Organisation Admin form with the nominated administrator's details. 4. Primary Organisation Admin Approval A signed letter from your Chief Compliance Officer confirming the approval of the designated Primary Organisation Admin. As part of your licence application, you must nominate a Primary Organisation Admin . The Primary Organisation Admin will act as your organization's main point of contact with Nebras and the CBUAE during onboarding and ongoing operations. Within the Trust Framework, the Primary Organisation Admin will: Serve as system administrator Manage user access Appoint technical contacts Coordinate the signing and submission of required legal documentation Once your onboarding request has been accepted, the Primary Organisation Admin will receive an invitation email from the Trust Framework platform. They can complete registration by following the steps in the Sign Up guide . In addition to the steps in the Sign Up guide , as part of registration, the Primary Organisation Admin will receive the TPP Agreement for electronic signature. This document must be signed by an authorised signatory — someone with the authority to legally bind the organisation. The Primary Organisation Admin must coordinate this signing before the organisation can access the Trust Framework. After the Primary Organisation Admin account is set up, they can add additional users within the Trust Framework platform."
  },
  {
    "title": "Trust Framework — Organisation Admins",
    "path": "/tech/tpp-standards/trust-framework/organisation-admins",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Onboarding Organisation Admins 2 min read Organisation Admins are responsible for ensuring the Organisation within the Trust Framework is properly…",
    "headings": [
      "Organisation Admins 2 min read"
    ],
    "body": "TPP · Trust Framework · Onboarding Organisation Admins 2 min read Organisation Admins are responsible for ensuring the Organisation within the Trust Framework is properly maintained. This includes ensuring all users have the correct access, that the Organisation's details are current and correct, and that assets such as logos are kept up to date. The first Organisation Admin is the Primary Organisation Admin — nominated during the CBUAE licensing process and granted access when onboarding begins. The Primary Organisation Admin can add other Organisation Admins. For other user roles, see Adding Users . Organisation Admins are responsible for: Ensuring all users have the correct level of access Adding a Primary Technical Contact (PTC) — required before applications and certificates can be managed Keeping Organisation details current and accurate Keeping logos and branding assets up to date Log in to the Trust Framework and navigate to your organisation. Navigate to the Administrators section of your Organisation. Click + New Organisation Administrator . Enter the new Organisation Administrator's email address. The invited Organisation Admin will receive an email with a registration link. They must use the same email address to complete registration. For a full walkthrough of what they must do next, see Sign Up . If a user does not receive the invitation email, ask them to check their spam folder."
  },
  {
    "title": "Trust Framework — Overview & Organisations",
    "path": "/tech/tpp-standards/trust-framework/",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Directory Trust Framework 2 min read The Trust Framework facilitates secure data sharing between Licensed Financial Institutions (LFIs) and Third-Party…",
    "headings": [
      "Trust Framework 2 min read",
      "Sandbox Trust Framework",
      "Production Trust Framework",
      "Trust Anchors",
      "API Portal for Discovery",
      "Keystore",
      "Public Key Infrastructure (PKI)"
    ],
    "body": "TPP · Trust Framework · Directory Trust Framework 2 min read The Trust Framework facilitates secure data sharing between Licensed Financial Institutions (LFIs) and Third-Party Providers (TPPs) by delivering key services such as API discovery, client onboarding, and client authentication. Sandbox Trust Framework Web Application: https://web.sandbox.directory.openfinance.ae/ OIDC Discovery API: https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration Production Trust Framework Web Application: https://web.directory.openfinance.ae/ OIDC Discovery API: https://auth.directory.openfinance.ae/.well-known/openid-configuration Trust Anchors Maintain a registry of authorized participants, defining their roles and scopes of access within the ecosystem. API Portal for Discovery Serve as a centralized directory of all servers, clients, and APIs participating in the ecosystem. Keystore Manage a registry of active cryptographic keys for each participant. These keys are used to validate identities, enabling mutual trust — an essential foundation for secure data sharing. Public Key Infrastructure (PKI) Issue and manage TLS, signature, and encryption certificates. The PKI also provides mechanisms for verifying certificates generated within the platform. All organisations participating in Open Finance operate within the Trust Framework. Upon successful onboarding, participants are registered within the Framework and gain visibility of other authorised organisations in the ecosystem. Organisations are classified according to their role: Licensed Financial Institutions (LFIs) provide capabilities into the Open Finance ecosystem. For example, an institution such as ADCB may expose payment initiation services or account information APIs for consumption by authorised participants. Third Party Providers (TPPs) consume the capabilities made available through Open Finance. For example, a fintech organisation such as Spare Technologies may access payment or data services provided by LFIs to deliver customer-facing solutions. Where permitted by their regulatory licence, an LFI may also operate in the capacity of a TPP. In such cases, the organisation retains its LFI classification within the Trust Framework while exercising TPP capabilities."
  },
  {
    "title": "Trust Framework — Roles",
    "path": "/tech/tpp-standards/trust-framework/roles",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "Trust Framework · Access scopes Trust Framework — Roles 2 min read The Trust Framework defines the rights and permissions granted to each organisation and its applications within…",
    "headings": [
      "Trust Framework — Roles 2 min read",
      "Defined roles and access scopes for TPPs"
    ],
    "body": "Trust Framework · Access scopes Trust Framework — Roles 2 min read The Trust Framework defines the rights and permissions granted to each organisation and its applications within the Open Finance ecosystem. Roles are initially assigned to organisations during their onboarding into the ecosystem depending on their licencing with the Central Bank of the UAE. These roles reflect the Technical Access Scopes that the organisation's applications can request and use within the Open Finance ecosystem. When creating an application, include all relevant roles required for interaction with LFIs. This ensures successful registration and full functionality across the ecosystem. Defined roles and access scopes for TPPs Each role grants access to two classes of API: User-consented APIs that act on a specific end user's data or instructions. They require a stored consent in the API Hub, are authorised via authorization_code and re-used via refresh_token , and the access token carries an Authorization Details object that binds it to a single consent. Application-only APIs that do not act on a specific end user and require no consent or user interaction (e.g. ATM locations, public product catalogues, IBAN name-match checks). Access tokens are obtained via client_credentials only. Role Access Type Allowed API Scopes Allowed Authorization Details Types Allowed Grant Types BSIP Bank Service Initiation Provider User-consented openid payments urn:openfinanceuae:service-initiation-consent:* client_credentials authorization_code refresh_token BSIP Application-only confirmation-of-payee — client_credentials BDSP Bank Data Sharing Provider User-consented openid accounts urn:openfinanceuae:account-access-consent:* client_credentials authorization_code refresh_token BDSP Application-only atm products — client_credentials ISP Insurance Service Provider User-consented openid insurance urn:openfinanceuae:insurance-consent:* client_credentials authorization_code refresh_token"
  },
  {
    "title": "Trust Framework — Sign Up",
    "path": "/tech/tpp-standards/trust-framework/user-sign-up",
    "category": "TPP Standards",
    "section": "Trust Framework",
    "description": "TPP · Trust Framework · Onboarding Sign Up 2 min read This guide walks through the steps a newly invited Organisation Admin or User must complete after receiving an invitation to…",
    "headings": [
      "Sign Up 2 min read",
      "Receive Onboarding Email",
      "Open the Registration Link",
      "Access the Sign-In Page",
      "Complete Registration",
      "Set Up Two-Factor Authentication",
      "Accept Terms of Acceptance",
      "Review and Sign the Document",
      "Check Your Request Status",
      "Log In to the Platform"
    ],
    "body": "TPP · Trust Framework · Onboarding Sign Up 2 min read This guide walks through the steps a newly invited Organisation Admin or User must complete after receiving an invitation to the Trust Framework platform. Receive Onboarding Email Once you have been invited, you will receive an email from the Al Tareq Trust Framework Sandbox . This email contains a registration link — keep it to hand before proceeding. Open the Registration Link Click on the registration link provided in the email. Access the Sign-In Page You will be redirected to the Trust Framework Sandbox sign-in page. Click Registration to begin the registration process. Complete Registration Fill in the required registration details and submit your request. Make sure the email address you register with exactly matches the email address you were invited with. Set Up Two-Factor Authentication Scan the QR code displayed on screen using Google Authenticator or another authenticator app of your choice. Enter the one-time code generated by the app to complete the setup. Accept Terms of Acceptance After successful registration, you will receive another email at your registered email address requesting you to review and accept the Terms of Acceptance from the Al Tareq Platform. Review and Sign the Document Open the Terms of Acceptance document and electronically sign it. Check Your Request Status Return to the Trust Framework Sandbox portal and check the status of your registration request. Log In to the Platform Once the process is completed, you will be able to log in to the Trust Framework Sandbox and access the resources your role permits."
  },
  {
    "title": "User Experience Evidence",
    "path": "/tech/tpp-standards/production/testing-certification/user-experience",
    "category": "TPP Standards",
    "section": "Overview",
    "description": "Testing & Certification · CX Evidence User Experience Evidence 2 min read Evidence that your consent and authorisation flows meet Nebras user experience requirements. Detailed CX…",
    "headings": [
      "User Experience Evidence 2 min read"
    ],
    "body": "Testing & Certification · CX Evidence User Experience Evidence 2 min read Evidence that your consent and authorisation flows meet Nebras user experience requirements. Detailed CX evidence requirements will be published here ahead of the next certification window."
  },
  {
    "title": "Variable Defined Schedule - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Variable Defined Schedule · UX Variable Defined Schedule — User Experience 4 min read Before a customer authorises a Variable Defined Schedule…",
    "headings": [
      "Variable Defined Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Variable Defined Schedule · UX Variable Defined Schedule — User Experience 4 min read Before a customer authorises a Variable Defined Schedule payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make a pre-defined series of payments, each on a specific date and up to a variable maximum amount. This page must accurately reflect the key details of the consent (payee, the complete list of scheduled payment dates and the maximum amount for each, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Variable Defined Schedule — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Variable Defined Schedule Variable Defined Schedule — API Guide 5 min read A Variable Defined Schedule consent authorises a TPP to initiate…",
    "headings": [
      "Variable Defined Schedule — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters — Variable Defined Schedule",
      "Example request"
    ],
    "body": `TPP · Banking · Service Initiation · Variable Defined Schedule Variable Defined Schedule — API Guide 5 min read A Variable Defined Schedule consent authorises a TPP to initiate payments on a pre-agreed set of specific dates , each with its own maximum amount ceiling . Rather than a recurring period, the TPP supplies an explicit schedule at consent time — listing each PaymentExecutionDate alongside the maximum amount permitted on that date. The user authorises once, approving the full schedule, and the TPP submits one payment per scheduled date without requiring re-authorisation. Common use cases include milestone-based project billing, staged instalment plans, and seasonal payment programmes where both the dates and indicative amounts are known upfront but the final charge may vary per date. Variable Defined Schedule is the ceiling variant of Fixed Defined Schedule — same schedule shape, but each entry carries a MaximumIndividualAmount rather than a locked Amount . Before initiating a Variable Defined Schedule payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . Set PeriodicSchedule.Type to "VariableDefinedSchedule" . Unlike a Periodic Schedule, there is no recurring period — instead, the Schedule array lists each specific PaymentExecutionDate and the maximum amount permitted on that date. The TPP submits one POST /payments per scheduled entry. authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year). All scheduled dates must fall before this value. 2027-03-02T00:00:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-03-03T10:00:00+00:00 BaseConsentId string (uuid) Links to prior consent if renewing — see Base Consent ID — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Payment controls — see below — PersonalIdentifiableInformation * string (JWE) Encrypted creditor and ris`
  },
  {
    "title": "Variable Defined Schedule — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Variable On Demand - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Variable On Demand · UX Variable On Demand — User Experience 4 min read Before a customer authorises a Variable On Demand payment consent through…",
    "headings": [
      "Variable On Demand — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Variable On Demand · UX Variable On Demand — User Experience 4 min read Before a customer authorises a Variable On Demand payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make multiple payments of varying amounts at any time of your choosing. This page must accurately reflect the key details of the consent (payee, the maximum amount per individual payment, etc.). The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Variable On Demand — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Variable On-Demand — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Variable On-Demand Variable On-Demand — API Guide 5 min read A Variable On-Demand consent authorises a TPP to initiate multiple payments at…",
    "headings": [
      "Variable On-Demand — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters — Variable On-Demand",
      "Example request"
    ],
    "body": `TPP · Banking · Service Initiation · Variable On-Demand Variable On-Demand — API Guide 5 min read A Variable On-Demand consent authorises a TPP to initiate multiple payments at variable amounts over the lifetime of the consent. The user authorises once — setting a ceiling on individual payments and optional period-based limits — and the TPP can then submit individual payments on-demand without requiring re-authorisation for each one. Common use cases include subscription billing with variable charges, metered service payments, and TPP-managed savings top-ups. Before initiating a Variable On-Demand payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . The critical difference from Single Instant Payment is that ControlParameters uses MultiPayment with Type: "VariableOnDemand" — no fixed amount is set at consent time. Instead, limits are defined via cumulative caps and periodic controls. authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year) 2027-03-02T00:00:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-03-03T10:00:00+00:00 BaseConsentId string (uuid) Links to prior consent if renewing — see Base Consent ID — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Payment controls — see below — PersonalIdentifiableInformation * string (JWE) Encrypted creditor and risk data — the encryptedPII string from Step 1 eyJhbGci... PaymentPurposeCode * string (3 chars) AANI payment purpose code ACM DebtorReference string Reference shown on the debtor's statement Subscription CreditorReference string Reference shown on the creditor's statement Subscription ControlParameters — Variable On-Demand ControlParameters.ConsentSchedule.MultiPayment carries the control definition. Set PeriodicSchedule.Type to "VariableOnDemand" . The amount is not fixed at consent time — each POST /payments call `
  },
  {
    "title": "Variable Periodic Schedule - User Experience",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "Banking · Service Initiation · Variable Periodic Schedule · UX Variable Periodic Schedule — User Experience 4 min read Before a customer authorises a Variable Periodic Schedule…",
    "headings": [
      "Variable Periodic Schedule — User Experience 4 min read"
    ],
    "body": "Banking · Service Initiation · Variable Periodic Schedule · UX Variable Periodic Schedule — User Experience 4 min read Before a customer authorises a Variable Periodic Schedule payment consent through Open Finance, you must present a Consent Page that clearly explains that you are seeking permission to make recurring payments of varying amounts at a set frequency. This page must accurately reflect the key details of the consent (payee, the maximum amount per payment, payment frequency, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of AlTareq (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of CX certification prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. Customise the request body fields below and watch the Consent and Authorisation page previews update live."
  },
  {
    "title": "Variable Periodic Schedule — API Guide",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "TPP · Banking · Service Initiation · Variable Periodic Schedule Variable Periodic Schedule — API Guide 5 min read A Variable Periodic Schedule consent authorises a TPP to initiate…",
    "headings": [
      "Variable Periodic Schedule — API Guide 5 min read",
      "authorization_details",
      "consent (Required) | authorization_details.consent",
      "ControlParameters — Variable Periodic Schedule",
      "Example request"
    ],
    "body": `TPP · Banking · Service Initiation · Variable Periodic Schedule Variable Periodic Schedule — API Guide 5 min read A Variable Periodic Schedule consent authorises a TPP to initiate one payment per period at a variable amount up to a defined ceiling. The user authorises once — approving a maximum per-payment amount and the recurring period — and the TPP submits one payment per period without requiring re-authorisation each time. Common use cases include variable monthly utility bills, periodic service charges, and TPP-managed savings sweeps where the amount differs each period but must stay within a pre-approved cap. Before initiating a Variable Periodic Schedule payment, ensure the following requirements are met: Registered Application — the application must be created within the Trust Framework and assigned the BSIP role as defined in Roles . Valid Transport Certificate — an active transport certificate must be issued and registered in the Trust Framework to establish secure mTLS communication . Valid Signing Certificate — an active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions. Registration with the relevant API Hub (Authorisation Server) — the application must be registered with the API Hub (Server) of the LFI with which you intend to initiate payments. Understanding of the FAPI Security Profile and Tokens & Assertions — you should understand how request object signing, client authentication, and access token validation underpin secure API interactions. Understanding of Message Encryption — PII (creditor name and account details) must be encrypted as a JWE before being embedded in the consent. You will need the LFI's public encryption key from their JWKS. POST /par With the encrypted PII ready, construct the authorization_details of type urn:openfinanceuae:service-initiation-consent:v2.1 . Set PeriodicSchedule.Type to "VariablePeriodicSchedule" . Unlike Fixed Periodic Schedule, the amount is not fixed at consent time — each POST /payments call specifies its own amount, subject to the MaximumIndividualAmount ceiling. Only one payment may be submitted per period. authorization_details Field Type Description Example type * enum Must be urn:openfinanceuae:service-initiation-consent:v2.1 urn:openfinanceuae:service-initiation-consent:v2.1 consent * object Consent properties agreed by the User with the TPP. Described below. — subscription object Optional subscription to Event Notifications via Webhook. Described below. — consent (Required) | authorization_details.consent Field Type Description Example ConsentId * string (uuid) Unique ID assigned by the TPP (1–128 chars) b8f42378-10ac-46a1-8d20-4e020484216d IsSingleAuthorization * boolean Whether the payment requires only one authorizing party true ExpirationDateTime * date-time Consent expiry (ISO 8601 with timezone, max 1 year) 2027-03-02T00:00:00+00:00 AuthorizationExpirationDateTime date-time Deadline by which all authorizers must have acted (multi-authorization only). SHOULD be set when IsSingleAuthorization is false ; SHOULD NOT be set when IsSingleAuthorization is true . MUST NOT be after ExpirationDateTime . 2026-03-03T10:00:00+00:00 BaseConsentId string (uuid) Links to prior consent if renewing — see Base Consent ID — Permissions array<enum> Optional access permissions granted alongside the payment consent ReadAccountsBasic , ReadBalances ControlParameters * object Payment controls — see below — PersonalIdentifiableInformation * string (JWE) Encrypted creditor and risk data — the encryptedPII string from Step 1 eyJhbGci... PaymentPurposeCode * string (3 chars) AANI payment purpose code ACM DebtorReference string Reference shown on the debtor's statement Utility Bill CreditorReference string Reference shown on the creditor's statement Utility Bill ControlParameters — Variable Periodic Schedule ControlParameters.ConsentSchedule.MultiPayment carries the control definition. Set Pe`
  },
  {
    "title": "Variable Periodic Schedule — Requirements",
    "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements",
    "category": "TPP Standards",
    "section": "Banking",
    "description": "read # Field Rule Validated by",
    "headings": [
      "read"
    ],
    "body": "read # Field Rule Validated by"
  },
  {
    "title": "Webhooks — Event Notifications",
    "path": "/tech/tpp-standards/v2.1/webhooks/",
    "category": "TPP Standards",
    "section": "Webhooks",
    "description": "Webhooks · Push notifications Webhooks — Event Notifications 2 min read Rather than requiring TPPs to poll for status changes, UAE Open Finance supports push-based event…",
    "headings": [
      "Webhooks — Event Notifications 2 min read",
      "Browse this section",
      "Consent Status",
      "Payment Status",
      "Insurance Quote Status",
      "Receiving Event Notifications"
    ],
    "body": "Webhooks · Push notifications Webhooks — Event Notifications 2 min read Rather than requiring TPPs to poll for status changes, UAE Open Finance supports push-based event notifications . When a relevant event occurs — such as a consent being authorized or revoked, or a payment status changing — the API Hub can deliver a notification directly to your registered webhook endpoint. Events are delivered as an HTTP POST to the webhook URL you provide along with the consent. The request body is a JWE compact serialisation encrypted using the public Encryption Certificate registered in the Trust Framework and in the Application that created the Consent. Inside the JWE is a signed JWT (JWS) containing the event payload. You must respond with 202 Accepted and an empty body immediately upon receipt. Decrypt and process the payload asynchronously — the Hub may retry delivery if it does not receive a timely acknowledgement. See Receiving Event Notifications for the full decryption, signature-verification, and FAPI-required claim-validation flow — including how to use the kid in the JWE header to select the correct private key. A webhook URL registered on your Application in the Trust Framework A valid Encryption Certificate on your Application — events cannot be delivered without one Event Trigger Guide Consent Status Any consent status change ( Authorized , Revoked , Expired , etc.) Consent Status Event Payment Status Payment status update on a consent with subscription.Webhook.IsActive: true Payment Status Event Insurance Quote Status Quote lifecycle event on a quote with Subscription.Webhook.IsActive: true ( ApplicationPending , ApplicationApproved , PolicyIssued , Completed , terminal states) Insurance Quote Status Event Section contents Browse this section The full set of pages covering event notifications and webhooks in UAE Open Finance. Sub-section Consent Status How consent state changes ( Authorized , Revoked , Expired ) are pushed to your webhook. Open → Sub-section Payment Status Per-payment status updates on consents that opted into webhook delivery. Open → Sub-section Insurance Quote Status Quote lifecycle updates delivered when a TPP attaches a Subscription.Webhook to an accepted insurance quote. Open → Reference Receiving Event Notifications FAPI-aligned decryption, signature verification, and replay protection for inbound JWE events. Open →"
  }
];
const MAX_RESULTS = 40;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SearchModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useRouter();
    const query = ref("");
    const selectedIndex = ref(0);
    const inputRef = ref(null);
    ref(null);
    function tokenize(s) {
      return s.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((t) => t.length >= 2);
    }
    function scoreItem(item, tokens, raw) {
      const title = item.title.toLowerCase();
      const section = item.section.toLowerCase();
      const category = item.category.toLowerCase();
      const description = item.description.toLowerCase();
      const headings = item.headings.map((h) => h.toLowerCase());
      const body = item.body.toLowerCase();
      let score = 0;
      for (const tok of tokens) {
        let matched = false;
        if (title.includes(tok)) {
          score += title.startsWith(tok) ? 14 : 10;
          matched = true;
        }
        if (headings.some((h) => h.includes(tok))) {
          score += 6;
          matched = true;
        }
        if (section.includes(tok) || category.includes(tok)) {
          score += 4;
          matched = true;
        }
        if (description.includes(tok)) {
          score += 2;
          matched = true;
        }
        if (body.includes(tok)) {
          score += 1;
          matched = true;
        }
        if (!matched) return 0;
      }
      if (raw.length >= 3) {
        if (title.includes(raw)) score += 20;
        if (description.includes(raw)) score += 5;
      }
      return score;
    }
    const results = computed(() => {
      const raw = query.value.trim().toLowerCase();
      if (!raw) return [];
      const tokens = tokenize(raw);
      if (tokens.length === 0) return [];
      const scored = [];
      for (const item of SEARCH_DATA) {
        const s = scoreItem(item, tokens, raw);
        if (s > 0) scored.push({ ...item, score: s });
      }
      scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
      return scored.slice(0, MAX_RESULTS);
    });
    const renderRows = computed(() => {
      const rows = [];
      let last = "";
      results.value.forEach((item, idx) => {
        if (item.category !== last) {
          rows.push({ kind: "label", category: item.category });
          last = item.category;
        }
        rows.push({ kind: "result", category: item.category, item, index: idx });
      });
      return rows;
    });
    const flatResults = computed(() => results.value);
    function categoryColor(category) {
      switch (category) {
        case "TPP Standards":
          return "var(--at-teal-deep)";
        case "LFI Integration":
          return "var(--at-gold)";
        case "Knowledge Base":
          return "var(--at-blue-deep)";
        case "API Specs":
          return "var(--at-navy-mid)";
        case "Policy":
        case "Release Notes":
          return "var(--at-navy-deep)";
        default:
          return "var(--at-mute-2)";
      }
    }
    function focusInput() {
      nextTick(() => {
        var _a;
        return (_a = inputRef.value) == null ? void 0 : _a.focus();
      });
    }
    function resetAndFocus() {
      query.value = "";
      selectedIndex.value = 0;
      focusInput();
    }
    onMounted(() => {
      if (props.open) resetAndFocus();
    });
    watch(
      () => props.open,
      (open) => {
        if (open) {
          resetAndFocus();
        }
      }
    );
    watch(query, () => {
      selectedIndex.value = 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.open) {
          _push2(`<div class="ed-search-overlay" data-v-409b72e8><div class="ed-search-card" role="dialog" aria-label="Search documentation" data-v-409b72e8><div class="ed-search-header" data-v-409b72e8><svg class="ed-search-header__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-v-409b72e8><circle cx="10" cy="10" r="7" data-v-409b72e8></circle><path d="M21 21l-6-6" data-v-409b72e8></path></svg><input${ssrRenderAttr("value", query.value)} type="text" class="ed-search-input" placeholder="Search documentation…" autocomplete="off" spellcheck="false" data-v-409b72e8>`);
          if (query.value) {
            _push2(`<button type="button" class="ed-search-clear" aria-label="Clear search" data-v-409b72e8>×</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="ed-search-results" data-v-409b72e8>`);
          if (!query.value.trim()) {
            _push2(`<div class="ed-search-empty" data-v-409b72e8><div class="ed-search-empty__title" data-v-409b72e8>Search the documentation</div><div class="ed-search-empty__hint" data-v-409b72e8> Try &quot;confirmation of payee&quot;, &quot;consent&quot;, or &quot;webhooks&quot;. </div></div>`);
          } else if (flatResults.value.length === 0) {
            _push2(`<div class="ed-search-empty" data-v-409b72e8><div class="ed-search-empty__title" data-v-409b72e8>No results found</div><div class="ed-search-empty__hint" data-v-409b72e8> Try different keywords or check your spelling. </div></div>`);
          } else {
            _push2(`<!--[-->`);
            ssrRenderList(renderRows.value, (row, rowIdx) => {
              _push2(`<!--[-->`);
              if (row.kind === "label") {
                _push2(`<div class="ed-search-group__label" style="${ssrRenderStyle({ color: categoryColor(row.category) })}" data-v-409b72e8>${ssrInterpolate(row.category)}</div>`);
              } else if (row.item && typeof row.index === "number") {
                _push2(`<a${ssrRenderAttr("href", row.item.path)}${ssrRenderAttr("data-result-index", row.index)} class="${ssrRenderClass([{ "is-selected": selectedIndex.value === row.index }, "ed-search-result"])}" style="${ssrRenderStyle({ "--ed-search-accent": categoryColor(row.category) })}" data-v-409b72e8><div class="ed-search-result__head" data-v-409b72e8><div class="ed-search-result__title" data-v-409b72e8>${ssrInterpolate(row.item.title)}</div><div class="ed-search-result__section" style="${ssrRenderStyle({ color: categoryColor(row.category) })}" data-v-409b72e8>${ssrInterpolate(row.item.section)}</div></div><div class="ed-search-result__desc" data-v-409b72e8>${ssrInterpolate(row.item.description)}</div><div class="ed-search-result__path" data-v-409b72e8>${ssrInterpolate(row.item.path)}</div></a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
          }
          _push2(`</div><div class="ed-search-footer" data-v-409b72e8><span data-v-409b72e8><kbd data-v-409b72e8>↑</kbd><kbd data-v-409b72e8>↓</kbd> navigate</span><span data-v-409b72e8><kbd data-v-409b72e8>↵</kbd> open</span><span data-v-409b72e8><kbd data-v-409b72e8>esc</kbd> close</span>`);
          if (flatResults.value.length) {
            _push2(`<span class="ed-search-footer__count" data-v-409b72e8>${ssrInterpolate(flatResults.value.length)} result${ssrInterpolate(flatResults.value.length === 1 ? "" : "s")}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/chrome/SearchModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SearchModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-409b72e8"]]);
export {
  SearchModal as default
};

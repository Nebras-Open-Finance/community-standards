// Shape of a Functional Certification portal "area" — one product family
// (Bank Data Sharing, Bank Service Initiation, Confirmation of Payee, Insurance
// Data Sharing, Insurance Quotation). Each area drives its own explainer page
// and submission portal from a single config object, so adding an area later is
// a config file plus two thin page wrappers — not new component code.

import type { HttpMethod } from '../endpoints/types'

/**
 * One Ozone Connect endpoint a TPP may exercise for this area. Derived from the
 * canonical endpoint registry (src/data/endpoints) and annotated with the
 * consent permissions that grant it and its TPP-facing (API Hub resource
 * server) equivalent path. The `supporting/tests` guard asserts this list stays
 * in lock-step with the fetched Ozone Connect OpenAPI spec.
 */
export interface FcEndpoint {
  /** Stable id — the Ozone Connect registry slug (e.g. 'accounts-AccountId-balances'). */
  slug: string
  method: HttpMethod
  /** Ozone Connect path the LFI implements — e.g. '/accounts/{AccountId}/balances'. */
  ozonePath: string
  /** Human title from the registry. */
  title: string
  /** Consent permission(s) that authorise this endpoint. */
  permissions: string[]
  /**
   * Path of the TPP-facing equivalent under the area's resource-server base
   * (e.g. '/accounts'). Undefined when the Hub exposes no direct TPP-facing
   * equivalent for this endpoint (e.g. Ozone Connect account product config).
   */
  tppPath?: string
}

export interface FcArea {
  /** URL segment / stable key — e.g. 'bank-data-sharing'. */
  key: string
  /** Display label — e.g. 'Bank Data Sharing'. */
  label: string
  /** The API family name — e.g. 'Account Information'. */
  apiName: string
  /** Service Desk Certification Type value for this area's evidence ticket. */
  certType: string
  /**
   * TPP-facing base URL, with `{LFICODE}` and `{VERSION}` placeholders — e.g.
   * 'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/account-information/{VERSION}'.
   * The portal substitutes the LFI code and the version selected on the form.
   */
  tppBaseUrlTemplate: string
  /** Route path of the sandbox evidence source (Model Bank). */
  sandboxEvidenceHref: string
  /** Endpoints in scope, in presentation order. */
  endpoints: FcEndpoint[]
}

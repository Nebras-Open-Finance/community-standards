// Which specs a draft documentation version serves from `public/openapi-drafts/`
// rather than the fetched `public/openapi/{version}/` tree.
//
// A draft version documents changes that have not reached api-specs yet, so for
// the specs listed here the fetched file still describes the PREVIOUS version
// and would render the wrong thing. Two kinds of file end up in the drafts
// folder, and the distinction matters when you go looking for one:
//
//   Hand-authored   No upstream spec exists for the capability at all, so the
//                   document is written by hand and committed to the repo.
//
//   Generated       The change edits an operation inside an existing upstream
//                   spec. `scripts/build-openapi-drafts.mjs` applies a declared
//                   patch to the fetched spec and writes the result, which is
//                   gitignored like every other derived OpenAPI file.
//
// Adding an entry here is half the job — a generated spec also needs its patch
// in that script, and `supporting/tests/openapi-drafts.test.mjs` fails if the
// two fall out of step or the file is simply missing.
//
// When a change lands upstream, remove its entry here (and its patch, if it had
// one) and flip SPEC_FOLDER in versions.ts — see
// supporting/internal_helpers/v2.2-draft-plan.md, phase 3.

export type DraftSpecOrigin = 'hand-authored' | 'generated'

export interface DraftSpec {
  /** Spec basename, without extension. */
  name: string
  origin: DraftSpecOrigin
  /** Why this version diverges from the fetched spec. */
  reason: string
}

export const DRAFT_SPECS: Record<string, readonly DraftSpec[]> = {
  'v2.2-draft': [
    {
      name: 'uae-consent-attestations-openapi',
      origin: 'hand-authored',
      reason: 'v2.1-to-v2.2 §1 — the attestations sub-resource has no upstream spec',
    },
    {
      name: 'uae-api-hub-consent-manager-openapi',
      origin: 'generated',
      reason:
        'v2.1-to-v2.2 §2 — multi-status filter on GET /psu/{userId}/consents; ' +
        '§3 — payment rail on the payment log; ' +
        '§4 — pagination on GET /payment-log',
    },
    {
      name: 'uae-account-information-openapi',
      origin: 'generated',
      reason: 'v2.1-to-v2.2 §5 — TransactionInformation is required on AETransaction',
    },
    {
      name: 'uae-ozone-connect-bank-data-sharing-openapi',
      origin: 'generated',
      reason:
        'v2.1-to-v2.2 §5 — transactionInformation is required on CbuaeTransaction, ' +
        'and bounded to match the TPP-facing schema; ' +
        '§6 — the Confirmation of Payee request is reduced to the IBAN and the ' +
        'response is flattened, removing the verifiedClaims / verification envelope',
    },
  ],
}

/** The public URL a drafted spec is served from. */
export function draftSpecUrl(version: string, name: string): string {
  return `/openapi-drafts/${version}/${name}.yaml`
}

/** Every drafted spec name for a version. */
export function draftSpecNames(version: string): string[] {
  return (DRAFT_SPECS[version] ?? []).map((s) => s.name)
}

/** `/openapi/v2.2-draft/api-hub/foo-openapi.yaml` → `foo-openapi`. */
export function specBasename(specPath: string): string {
  const file = specPath.split('/').pop() ?? ''
  return file.replace(/\.ya?ml$/i, '')
}

/**
 * Point a fetched-spec URL at its draft counterpart where one exists, and leave
 * it alone otherwise. Callers pass the URL already rewritten to the target
 * version, so this only has to decide which of the two trees serves it.
 */
export function resolveSpecUrl(specPath: string, version: string): string {
  const name = specBasename(specPath)
  return draftSpecNames(version).includes(name)
    ? draftSpecUrl(version, name)
    : specPath
}

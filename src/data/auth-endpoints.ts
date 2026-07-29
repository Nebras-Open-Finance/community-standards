import rawData from '../../public/api/authorization-endpoints.json'

/**
 * Build-time snapshot of every Active authorisation server in the participants
 * directory, with the `authorization_endpoint` resolved from its OpenID
 * discovery document. Written by scripts/fetch-auth-endpoints.mjs.
 */
export type VerificationVerdict = 'pass' | 'warn' | 'fail'

/** Result of probing one deep-link verification file at build time. */
export interface VerificationProbe {
  url: string
  /** HTTP status, or null on a network error / timeout. */
  status: number | null
  contentType: string | null
  jsonValid: boolean
  verdict: VerificationVerdict
  /** Human-readable reason for a warn/fail, or null on a clean pass. */
  note: string | null
}

/** The deep-link verification files for one authorisation origin. */
export interface Verification {
  origin: string
  /** /.well-known/assetlinks.json — Google-Android App Links (required) */
  android: VerificationProbe
  /** /.well-known/apple-app-site-association — iOS Universal Links (required) */
  ios: VerificationProbe
  /**
   * /.well-known/applinking.json — HarmonyOS App Linking (informational).
   * Optional so older snapshots without a Huawei probe still parse. Never
   * contributes to the headline verdict.
   */
  huawei?: VerificationProbe
}

export interface AuthServerEndpoint {
  organisationId: string
  organisationName: string
  legalEntityName: string
  sector: 'bank' | 'insurer' | null
  authorisationServerId: string
  customerFriendlyName: string
  customerFriendlyDescription: string | null
  logoUri: string | null
  issuer: string
  discoveryUri: string
  /** LFI code from the Hub hostname (auth1.<code>.apihub…). */
  lfiCode: string | null
  accountTypes: string[]
  apiFamilies: string[]
  authorizationEndpoint: string
  parEndpoint: string | null
  tokenEndpoint: string | null
  /** Deep-link verification-file probe for this server's origin, if resolved. */
  verification: Verification | null
}

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

function strOrNull(v: unknown): string | null {
  return typeof v === 'string' && v ? v : null
}

function strArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
}

function num(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

function narrowProbe(raw: unknown): VerificationProbe | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const v = r['verdict']
  const verdict: VerificationVerdict = v === 'pass' || v === 'warn' ? v : 'fail'
  return {
    url: str(r['url']),
    status: num(r['status']),
    contentType: strOrNull(r['contentType']),
    jsonValid: r['jsonValid'] === true,
    verdict,
    note: strOrNull(r['note']),
  }
}

function narrowVerification(raw: unknown): Verification | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const android = narrowProbe(r['android'])
  const ios = narrowProbe(r['ios'])
  if (!android || !ios) return null
  const huawei = narrowProbe(r['huawei'])
  return { origin: str(r['origin']), android, ios, ...(huawei ? { huawei } : {}) }
}

function narrow(raw: unknown): AuthServerEndpoint | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>

  const organisationName = str(r['organisationName'])
  const authorizationEndpoint = str(r['authorizationEndpoint'])
  if (!organisationName || !authorizationEndpoint) return null

  const sectorRaw = r['sector']
  const sector = sectorRaw === 'bank' || sectorRaw === 'insurer' ? sectorRaw : null

  return {
    organisationId: str(r['organisationId']),
    organisationName,
    legalEntityName: str(r['legalEntityName']),
    sector,
    authorisationServerId: str(r['authorisationServerId']),
    customerFriendlyName: str(r['customerFriendlyName']) || organisationName,
    customerFriendlyDescription: strOrNull(r['customerFriendlyDescription']),
    logoUri: strOrNull(r['logoUri']),
    issuer: str(r['issuer']),
    discoveryUri: str(r['discoveryUri']),
    lfiCode: strOrNull(r['lfiCode']),
    accountTypes: strArray(r['accountTypes']),
    apiFamilies: strArray(r['apiFamilies']),
    authorizationEndpoint,
    parEndpoint: strOrNull(r['parEndpoint']),
    tokenEndpoint: strOrNull(r['tokenEndpoint']),
    verification: narrowVerification(r['verification']),
  }
}

const payload = (rawData ?? {}) as { source?: unknown; servers?: unknown }

export const authEndpointsSource: string = str(payload.source)

export const authServerEndpoints: AuthServerEndpoint[] =
  (Array.isArray(payload.servers) ? payload.servers : [])
    .map(narrow)
    .filter((s): s is AuthServerEndpoint => s !== null)

if (authServerEndpoints.length === 0) {
  // eslint-disable-next-line no-console
  console.error(
    '[redirect-testing] No authorisation servers in authorization-endpoints.json — run `npm run fetch:authendpoints`.',
  )
}

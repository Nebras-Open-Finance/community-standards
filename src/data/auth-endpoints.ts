import rawData from '../../public/api/authorization-endpoints.json'

/**
 * Build-time snapshot of every Active authorisation server in the participants
 * directory, with the `authorization_endpoint` resolved from its OpenID
 * discovery document. Written by scripts/fetch-auth-endpoints.mjs.
 */
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

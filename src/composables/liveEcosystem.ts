// Shared types and constants for the live-ecosystem mini-feeds shown on
// landing pages (TPP and LFI sides). Counts and groupings here MUST stay
// aligned with `/program/whats-live` — when the source-of-truth changes,
// update both.

export const FAMILY_KEYS = [
  'account-information',
  'payment',
  'confirmation',
  'product',
  'atm',
  'insurance',
] as const

export type FamilyKey = (typeof FAMILY_KEYS)[number]

// The directory feed reports `ApiFamilyType` using the FamilyKey values
// directly. The api-log uses URL path segments — same as FamilyKey except
// `confirmation` becomes `confirmation-of-payee`.
export const FAMILY_URL_PREFIX: Record<FamilyKey, string> = {
  'account-information': 'account-information',
  'payment': 'payment',
  'confirmation': 'confirmation-of-payee',
  'product': 'product',
  'atm': 'atm',
  'insurance': 'insurance',
}

// Mirrors `DAYS_WINDOW` in `/program/whats-live` so a TPP "live" on a
// landing page matches what the dashboard shows. If you change this, change
// it in `whats-live.vue` too.
export const LIVE_TPP_DAYS_WINDOW = 30

export const DIRECTORY_PARTICIPANTS_URL =
  'https://data.directory.openfinance.ae/participants'

export const TRUST_FRAMEWORK_PROXY_URL = '/api/trust-framework.json'
// The API log is sharded by quarter — read it via `loadApiLog()` in
// ./apiLog.ts rather than fetching a URL directly.

export const PLACEHOLDER_LOGO_URL =
  'https://data.directory.openfinance.ae/logos/placeholder-logo.png'

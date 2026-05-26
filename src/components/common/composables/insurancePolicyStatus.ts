/**
 * Insurance policy statuses, keyed by AEInsurancePolicyStatusCodes (and the
 * Life-only AELifeInsurancePolicyStatusCodes which adds InForce). Grouped into
 * two buckets for the LFI authorization wireframe:
 *
 * - `active`   — policies currently in force or otherwise meaningful for data
 *                sharing (New, Renewed, InForce, PaidUp).
 * - `inactive` — policies that have ended or otherwise can't be shared
 *                (Expired, Lapsed, Cancelled, Surrendered, Converted, DeathClaim,
 *                RiderClaim).
 *
 * The PolicyEditor lets the demo flip a policy's status freely; the wireframe
 * groups visible policies by `insurancePolicyStatusGroup(status)`.
 */

export type InsurancePolicyStatus =
  | 'New'
  | 'Renewed'
  | 'InForce'
  | 'PaidUp'
  | 'Expired'
  | 'Lapsed'
  | 'Cancelled'
  | 'Surrendered'
  | 'Converted'
  | 'DeathClaim'
  | 'RiderClaim'

export type InsurancePolicyStatusGroup = 'active' | 'inactive'

export const ACTIVE_STATUSES: InsurancePolicyStatus[] = [
  'New',
  'Renewed',
  'InForce',
  'PaidUp',
]

export const INACTIVE_STATUSES: InsurancePolicyStatus[] = [
  'Expired',
  'Lapsed',
  'Cancelled',
  'Surrendered',
  'Converted',
  'DeathClaim',
  'RiderClaim',
]

export const ALL_STATUSES: InsurancePolicyStatus[] = [
  ...ACTIVE_STATUSES,
  ...INACTIVE_STATUSES,
]

export const STATUS_LABELS: Record<InsurancePolicyStatus, string> = {
  New: 'New',
  Renewed: 'Renewed',
  InForce: 'In Force',
  PaidUp: 'Paid Up',
  Expired: 'Expired',
  Lapsed: 'Lapsed',
  Cancelled: 'Cancelled',
  Surrendered: 'Surrendered',
  Converted: 'Converted',
  DeathClaim: 'Death Claim',
  RiderClaim: 'Rider Claim',
}

export function insurancePolicyStatusGroup(status: string): InsurancePolicyStatusGroup {
  return (ACTIVE_STATUSES as string[]).includes(status) ? 'active' : 'inactive'
}

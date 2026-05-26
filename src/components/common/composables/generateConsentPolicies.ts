/**
 * Deterministically generate 1–2 policies for an insurance consent, keyed off
 * the consent id and each insurance type it carries. Used by the Insurance CMI
 * preview (connections + detail) so the same consent always renders the same
 * set of policies without needing an externally-configured policy pool.
 *
 * The CMI shows live data-sharing connections, so generated policies are
 * always in an active status — the wireframe's "Active/Inactive" distinction
 * is exercised on the LFI authorization page instead.
 */

import type { InsurancePolicyStatus } from './insurancePolicyStatus'

export interface GeneratedPolicy {
  id: string
  insuranceType: string
  status: InsurancePolicyStatus
  policyNumber: string
  premium: number
}

interface ConsentLike {
  id?: number | string
  types?: { type: string }[]
}

const TYPE_PREFIX: Record<string, string> = {
  Motor: 'MOT',
  Health: 'HLT',
  Home: 'HOM',
  Life: 'LIF',
  Travel: 'TRV',
  Renters: 'RNT',
  Employment: 'EMP',
}

const ACTIVE_STATUSES: InsurancePolicyStatus[] = ['New', 'Renewed', 'InForce', 'PaidUp']

function hashString(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6D2B79F5) | 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function generateConsentPolicies(consent: ConsentLike | null | undefined): GeneratedPolicy[] {
  const types = Array.isArray(consent?.types) ? consent!.types! : []
  const consentId = String(consent?.id ?? 'consent')
  const out: GeneratedPolicy[] = []
  for (const entry of types) {
    const type = entry?.type
    if (!type) continue
    const rng = mulberry32(hashString(`${consentId}::${type}`))
    const count = rng() < 0.5 ? 1 : 2
    const prefix = TYPE_PREFIX[type] || type.slice(0, 3).toUpperCase()
    for (let i = 0; i < count; i++) {
      const seq = String(Math.floor(rng() * 9000) + 1000).padStart(4, '0')
      const premium = (Math.floor(rng() * 80) + 5) * 100
      const status = ACTIVE_STATUSES[Math.floor(rng() * ACTIVE_STATUSES.length)] ?? 'InForce'
      out.push({
        id: `${consentId}-${type}-${i}`,
        insuranceType: type,
        status,
        policyNumber: `${prefix}-2026-${seq}`,
        premium,
      })
    }
  }
  return out
}

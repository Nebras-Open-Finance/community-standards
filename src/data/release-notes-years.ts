import { apiHubYears } from '@/data/api-hub-releases-registry'
import { trustFrameworkYears } from '@/data/trust-framework-releases-registry'

export const API_HUB_YEARS: readonly string[] = apiHubYears

export const TRUST_FRAMEWORK_YEARS: readonly string[] = trustFrameworkYears

export const latestApiHubYear: string = API_HUB_YEARS.at(-1) ?? '2026'
export const latestTrustFrameworkYear: string = TRUST_FRAMEWORK_YEARS.at(-1) ?? '2026'

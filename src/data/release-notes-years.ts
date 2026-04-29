// Phase 5b-v — release-notes years registry, ported from
// `docs/.vitepress/release-notes-years.ts`.
//
// Tracks which calendar years have release-note pages for each operational
// register. The "latest year" values are used by the Release Notes & Erratas
// home page and cross-page links to point visitors at the current year.
//
// Both registers derive their years automatically from their release
// registries — `apiHubYears` and `trustFrameworkYears` are exported from the
// per-register registries in this directory and re-exported here under the
// historical names so the porting touch on call sites stays minimal.
//
// When the first release of a new year is added to either register, no shim
// file is needed — the SSG path enumeration in `vite.config.ts` picks the
// year up automatically from the derived array.

import { apiHubYears } from '@/data/api-hub-releases-registry'
import { trustFrameworkYears } from '@/data/trust-framework-releases-registry'

export const API_HUB_YEARS: readonly string[] = apiHubYears

export const TRUST_FRAMEWORK_YEARS: readonly string[] = trustFrameworkYears

// Latest-year fallbacks. The `2026` fallback matches the original behaviour
// for the (theoretically impossible) case of an empty registry — keeping the
// home page's cross-link valid even before the first entry is seeded.
export const latestApiHubYear: string = API_HUB_YEARS.at(-1) ?? '2026'
export const latestTrustFrameworkYear: string = TRUST_FRAMEWORK_YEARS.at(-1) ?? '2026'

// Tracks which calendar years have release note pages for each operational
// register. The "latest year" values are used by the Release Notes & Erratas
// home page and cross-links to point visitors at the current year's page.
//
// Both registers derive their years automatically from their release
// registries. When the first release of a new year is added, also create a
// shim at docs/tech/release-notes-and-erratas/release-notes/{register}/{year}.md
// that mounts the relevant page component.

import { API_HUB_RELEASES, yearOf as apiHubYearOf } from './api-hub-releases-registry'
import {
  TRUST_FRAMEWORK_RELEASES,
  yearOf as trustFrameworkYearOf,
} from './trust-framework-releases-registry'

export const API_HUB_YEARS: string[] = [
  ...new Set(API_HUB_RELEASES.map((e) => apiHubYearOf(e.release))),
].sort()

export const TRUST_FRAMEWORK_YEARS: string[] = [
  ...new Set(TRUST_FRAMEWORK_RELEASES.map((e) => trustFrameworkYearOf(e))),
].sort()

export const latestApiHubYear: string = API_HUB_YEARS.at(-1) ?? '2026'
export const latestTrustFrameworkYear: string = TRUST_FRAMEWORK_YEARS.at(-1) ?? '2026'

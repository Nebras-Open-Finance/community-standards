// Password gate for the /biopay space. The mechanics live in useSpaceAuth —
// see the note there on why this is not real security.
//
// Deliberately a different password and a different sessionStorage key from
// /internal: the two spaces have different audiences, and unlocking one must
// not unlock the other.

import { createSpaceAuth, type SpaceAuth } from './useSpaceAuth'

/** Shared BioPay password. Intentionally in source — see useSpaceAuth. */
export const BIOPAY_PASSWORD = 'BioPay@1234'

export type UseBiopayAuth = SpaceAuth

export const useBiopayAuth = createSpaceAuth(BIOPAY_PASSWORD, 'biopay-unlocked')

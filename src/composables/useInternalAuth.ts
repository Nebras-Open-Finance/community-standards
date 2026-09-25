// Password gate for the /internal section. The mechanics live in
// useSpaceAuth — see the note there on why this is not real security.

import { createSpaceAuth, type SpaceAuth } from './useSpaceAuth'

/** Shared internal password. Intentionally in source — see useSpaceAuth. */
export const INTERNAL_PASSWORD = 'NOF@1234'

export type UseInternalAuth = SpaceAuth

export const useInternalAuth = createSpaceAuth(INTERNAL_PASSWORD, 'internal-unlocked')

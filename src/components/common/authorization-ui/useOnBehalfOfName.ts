import { computed, type ComputedRef } from 'vue'
import { useSharedState } from '../composables/useSharedState.ts'
import { useRouteVersion } from '@/composables/useSelectedVersion'

/**
 * The name shown as "on-behalf of …" on the payment Authorisation Page.
 *
 * v2.1 payment consents carry no `OnBehalfOf`, so the name comes from the PII
 * `Risk.CreditorIndicators.MerchantDetails.MerchantName`. From v2.2 the payment
 * consent carries `OnBehalfOf` (changelog §11), and its `TradingName` is the only
 * source — `MerchantName` stays a risk field and no longer drives the display.
 */
export function useOnBehalfOfName(): ComputedRef<string | undefined> {
  const { sharedState, consentData } = useSharedState()
  const { docsVersion } = useRouteVersion()

  return computed(() =>
    docsVersion.value === 'v2.1'
      ? sharedState.value?.pii?.Risk?.CreditorIndicators?.MerchantDetails?.MerchantName
      : consentData.value?.OnBehalfOf?.TradingName,
  )
}

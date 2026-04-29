import { ref, computed } from 'vue'

// Shared across imports
const sharedState = ref({})

// Reset on SPA navigation so state seeded by one page (e.g. Data Sharing writing
// sharedState.consent) doesn't leak into another page that reads different keys
// (e.g. payment pages write sharedState.value). Wired from the theme router hook.
export function resetSharedState() {
  sharedState.value = {}
}

export function useSharedState() {

  function updateField(field, newValue) {
    sharedState.value = { ...sharedState.value, [field]: JSON.parse(newValue) }
  }

  // Normalises the consent data path regardless of stateField or data shape:
  //   stateField="consent" → TPP: .consent.consent, LFI: .consent.Data
  //   stateField="value"   → TPP: .value.consent,   LFI: .value.Data
  const consentData = computed(() => {
    const s = sharedState.value
    return s?.consent?.consent ?? s?.consent?.Data ?? s?.value?.consent ?? s?.value?.Data ?? {}
  })

  return {
    sharedState,
    updateField,
    consentData
  }
}
import { ref, computed } from 'vue'

// Shared across imports
const sharedState = ref({})

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
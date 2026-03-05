import { ref } from 'vue'

// Shared across imports
const sharedState = ref({})

export function useSharedState() {

  function updateField(field, newValue) {
    sharedState.value = { ...sharedState.value, [field]: JSON.parse(newValue) }
  }

  return {
    sharedState,
    updateField
  }
}
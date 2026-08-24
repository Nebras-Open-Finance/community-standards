<script setup>
import { ref, watch } from 'vue'
import { useSharedState } from '@/components/common/composables/useSharedState.ts'
import { confirmationOfPayeeScenarios } from '@/data/editor-scenarios'

const { sharedState } = useSharedState()

const myCustomValidator = (value) => {
  if (
    (value.NameMatchIndicator === 'ConfirmationOfPayee.Yes'
     &&
    value.MaskedName) ||
(value.NameMatchIndicator === 'ConfirmationOfPayee.Partial'
     &&
    !value.MaskedName) ||
(value.NameMatchIndicator === 'ConfirmationOfPayee.No'
     &&
    !value.MaskedName)
  ){
      return "MaskedName must be returned when NameMatchIndicator is Partial or No, and omitted when it is Yes"
    }
  return null
}

const scenarios = confirmationOfPayeeScenarios()

const initialFormData = ref(scenarios.find(s => s.id === 'match-partial').data)
</script>

<template>
  <EditableJson
    spec="/openapi/v2.2-rc1/standards/uae-confirmation-of-payee-openapi.yaml"
    schema-name="AEAccountConfirmationResponseProperties"
    :initial-data="initialFormData"
    :custom-validator="myCustomValidator"
    :scenarios="scenarios"
    scenarios-label="Match results"
    state-field="copData"
    label="message.Data"
    description="Confirmation Response"
    endpoint-href="/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/open-api/confirmation"
    endpoint-label="View confirmation endpoint"
  />

  <COPPiiBlock />
</template>

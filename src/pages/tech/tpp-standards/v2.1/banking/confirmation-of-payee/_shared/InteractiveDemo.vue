<script setup>
import { ref, watch } from 'vue'
import { useSharedState } from '@/components/common/composables/useSharedState.ts'

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
      return "MaskedName returned when NameMatchIndicator is No or Partial"
    }
  return null
}

const initialFormData = ref({
  "NameMatchIndicator": "ConfirmationOfPayee.Partial",
  "MaskedName": "Ib*** A***** Sa***"
})
</script>

<template>
  <EditableJson
    spec="/openapi/v2.1/standards/uae-confirmation-of-payee-openapi.yaml"
    schema-name="AEAccountConfirmationResponseProperties"
    :initial-data="initialFormData"
    :custom-validator="myCustomValidator"
    state-field="copData"
    label="message.Data"
    description="Confirmation Response"
    endpoint-href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation"
    endpoint-label="View confirmation endpoint"
  />

  <COPPiiBlock />
</template>

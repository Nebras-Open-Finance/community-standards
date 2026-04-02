<div style="border: 1px solid #bfdbfe; border-radius: 10px; overflow: hidden; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(0,39,127,0.06);">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 1rem; background: rgba(0,39,127,0.04); border-bottom: 1px solid #bfdbfe; flex-wrap: wrap; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.6rem;">
      <span style="font-size: 0.72rem; font-weight: 700; color: rgba(0,39,127,0.8); letter-spacing: 0.07em; text-transform: uppercase;">Confirmation Response</span>
      <span style="font-size: 0.7rem; color: rgba(0,39,127,0.45);"></span>
    </div>
    <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation" style="font-size: 0.75rem; color: rgba(0,39,127,0.6); text-decoration: none; display: flex; align-items: center; gap: 3px;">View confirmation endpoint ↗</a>
  </div>
  <EditableJson style="height: 120px;" spec="/openapi/v2.1/standards/uae-confirmation-of-payee-openapi.yaml"
    schemaName="AEAccountConfirmationResponseProperties"
    :initialData="initialFormData"
    :customValidator="myCustomValidator"
    stateField="copData"
  />
</div>

<COPPiiBlock />




<script setup>
import { ref, watch } from 'vue'
import { useSharedState } from '../../../../../components/Composables/useSharedState.ts'

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





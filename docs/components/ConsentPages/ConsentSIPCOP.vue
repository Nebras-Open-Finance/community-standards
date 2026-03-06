<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useSharedState } from '../Composables/useSharedState.ts'

const { sharedState } = useSharedState()

const COP_PII = {
  Initiation: {
    Creditor: [{
      Creditor: { Name: 'Ibrahim Al Sabah' },
      CreditorAccount: {
        SchemeName: 'IBAN',
        Identification: 'AE070331234567890123456',
        Name: { en: 'Ibrahim Al Sabah' }
      }
    }]
  }
}

const COP_VALUE = {
  consent: {
    ControlParameters: {
      ConsentSchedule: {
        SinglePayment: {
          Amount: { Amount: '250.00', Currency: 'AED' }
        }
      }
    },
    DebtorReference: 'Split bill',
    PaymentPurposeCode: 'TOF'
  }
}

let savedPii
let savedValue

onMounted(() => {
  savedPii   = sharedState.value.pii
  savedValue = sharedState.value.value
  sharedState.value = { ...sharedState.value, pii: COP_PII, value: COP_VALUE }
})

onUnmounted(() => {
  sharedState.value = { ...sharedState.value, pii: savedPii, value: savedValue }
})

const indicator  = computed(() => sharedState.value?.copData?.NameMatchIndicator)
const maskedName = computed(() => sharedState.value?.copData?.MaskedName)
</script>

<template>
  <ConsentSingleInstantPayment>
    <template #cop-result>

      <!-- ConfirmationOfPayee.Yes -->
      <div v-if="indicator === 'ConfirmationOfPayee.Yes'" class="cop-row">
        <div class="cop-status-row" style="margin-top: 0px;">
          <span class="cop-label cop-label--green">Confirmed</span>
                    <div class="cop-icon-wrap cop-icon-wrap--green" style="margin-left: auto;">
            <svg width="9" height="7" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- ConfirmationOfPayee.Partial -->
      <div v-else-if="indicator === 'ConfirmationOfPayee.Partial'" class="cop-row">
        <div class="cop-status-row">
          <div class="cop-icon-wrap cop-icon-wrap--amber">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.5L14.93 13.5H1.07L8 1.5Z" fill="white"/>
              <rect x="7.25" y="6" width="1.5" height="4" rx="0.75" fill="#FDAA35"/>
              <rect x="7.25" y="11" width="1.5" height="1.5" rx="0.75" fill="#FDAA35"/>
            </svg>
          </div>
          <span class="cop-label cop-label--amber">Partial Match</span>
          <span class="cop-masked cop-masked--amber">{{ maskedName }}</span>
        </div>
        <p class="cop-desc cop-desc--amber">The Name you provided is similar to, but does NOT match the Name of the account owner.</p>
        <p class="cop-warn cop-warn--amber">Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee details OR proceed at your own risk to make the payment to this account.</p>
      </div>

      <!-- ConfirmationOfPayee.No -->
      <div v-else-if="indicator === 'ConfirmationOfPayee.No'" class="cop-row">
        <div class="cop-status-row">
          <div class="cop-icon-wrap cop-icon-wrap--red">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7M7 1L1 7" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="cop-label cop-label--red">No Match</span>
          <span class="cop-masked cop-masked--red">{{ maskedName }}</span>
        </div>
        <p class="cop-desc cop-desc--red">The Name you provided does NOT match the Name of the account owner.</p>
        <p class="cop-warn cop-warn--red">Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee Name OR proceed at your own risk to make the payment to this account.</p>
      </div>

    </template>
  </ConsentSingleInstantPayment>
</template>

<style scoped>
.cop-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 292px;
  margin-top: 8px;
}
.cop-status-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 292px;
}
.cop-icon-wrap {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cop-icon-wrap--green { background: #22A35D; }
.cop-icon-wrap--amber { background: #FDAA35; }
.cop-icon-wrap--red   { background: #C92B25; }

.cop-label {
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -0.01em;
}
.cop-label--green { color: #22A35D; }
.cop-label--amber { color: #FDAA35; }
.cop-label--red   { color: #C92B25; }

.cop-masked {
  margin-left: auto;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: -0.01em;
}
.cop-masked--amber { color: #FDAA35; }
.cop-masked--red   { color: #C92B25; }

.cop-desc, .cop-warn {
  margin: 0;
  width: 292px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: -0.01em;
}
.cop-desc--amber, .cop-warn--amber { color: #FDAA35; }
.cop-desc--red,   .cop-warn--red   { color: #C92B25; }
</style>

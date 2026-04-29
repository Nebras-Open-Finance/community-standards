<template>
  <div v-if="text" class="payment-perm-frame">
    <div class="payment-perm-text">{{ text }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSharedState } from '../composables/useSharedState.ts'
import { getPaymentPermissionText } from '../composables/serviceInitiationPermissionDescriptions.ts'

const { consentData } = useSharedState()

const text = computed(() =>
  getPaymentPermissionText(consentData.value?.Permissions)
)
</script>

<style scoped>
.payment-perm-frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 12px;
  gap: 12px;
  width: 316px;
  background: #ffffff;
  border-radius: 12px;
  flex: none;
  flex-grow: 0;
}

.payment-perm-text {
  width: 292px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 160%;
  color: #0c1441;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
}
</style>

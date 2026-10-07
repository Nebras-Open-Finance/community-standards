<script setup>
import { ref } from 'vue'

// Themes of the TPP consent and LFI authorisation wireframes — each toggled
// on its own, independent of the site theme.
const consentDark = ref(false)
const authDark = ref(false)
</script>

<template>
  <div class="wf-frame">
    <ConsentAuthLayout>
      <template #consent>
        <ConsentBankDataSharing v-model:dark="consentDark" theme-toggle />
      </template>
      <template #auth>
        <AuthorizationBankDataSharing v-model:dark="authDark" theme-toggle />
      </template>
    </ConsentAuthLayout>
  </div>
</template>

<style scoped>
/* Each panel ~41% of the section width, pushed to the outer edges so the
   central hop sits in a whitespace lane between them. The page itself sets
   the wider --at-page-max, so no breakout positioning is needed here. */
.wf-frame :deep(.cal__layout) {
  grid-template-columns: 41% 41%;
  justify-content: space-between;
  gap: 0;
}

@media (max-width: 768px) {
  .wf-frame :deep(.cal__layout) {
    grid-template-columns: 1fr;
    justify-content: stretch;
  }
}
</style>

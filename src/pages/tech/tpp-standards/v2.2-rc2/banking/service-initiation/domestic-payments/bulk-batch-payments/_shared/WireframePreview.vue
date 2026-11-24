<script setup>
import { ref } from 'vue'

// Themes of the TPP and LFI wireframes, independent of the site theme. The
// two TPP screens are the same app, so they share one theme.
const tppDark = ref(false)
const authDark = ref(false)
</script>

<template>
  <!-- Upload (TPP, fixed content) → Consent (TPP) → Authorisation (LFI). -->
  <ConsentAuthLayout before-title="Upload page">
    <template #before>
      <ConsentBulkBatchPayment screen="upload" v-model:dark="tppDark" theme-toggle />
    </template>
    <template #consent>
      <ConsentBulkBatchPayment screen="consent" v-model:dark="tppDark" theme-toggle />
    </template>
    <template #auth>
      <AuthorizationBulkBatchPayment v-model:dark="authDark" theme-toggle />
    </template>
  </ConsentAuthLayout>
</template>

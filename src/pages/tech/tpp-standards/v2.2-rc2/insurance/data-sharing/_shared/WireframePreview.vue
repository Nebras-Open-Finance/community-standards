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
        <ConsentInsuranceDataSharing v-model:dark="consentDark" theme-toggle />
      </template>
      <template #auth>
        <AuthorizationInsuranceDataSharing v-model:dark="authDark" theme-toggle />
      </template>
    </ConsentAuthLayout>
  </div>
</template>

<style scoped>
/* Push each panel to the outer edge so the central hop sits in the
   whitespace lane between them — matches bank's WireframePreview. */
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

<route lang="yaml">
meta:
  layout: internal
  title: LFI go-live certificate
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
useHead({ title: 'LFI go-live certificate' })
</script>

<template>
  <CertificateDoc variant="lfi" />
</template>

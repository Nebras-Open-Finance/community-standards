<route lang="yaml">
meta:
  title: Functional Certification — Delegated SCA
  isIndex: true
</route>

<script setup lang="ts">
import { delegatedScaArea as area } from '@/data/functional-certification/delegated-sca'
</script>

<template>
  <FcDelegatedScaExplainer :area="area" />
</template>

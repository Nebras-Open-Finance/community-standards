<route lang="yaml">
meta:
  title: Functional Certification — Fixed On-Demand
  isIndex: true
</route>

<script setup lang="ts">
import { fixedOnDemandArea as area } from '@/data/functional-certification/multi-payments'
</script>

<template>
  <FcMultiPaymentExplainer :area="area" />
</template>

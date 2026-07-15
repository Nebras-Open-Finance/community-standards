<route lang="yaml">
meta:
  title: Functional Certification — Variable On-Demand
  isIndex: true
</route>

<script setup lang="ts">
import { variableOnDemandArea as area } from '@/data/functional-certification/multi-payments'
</script>

<template>
  <FcMultiPaymentExplainer :area="area" />
</template>

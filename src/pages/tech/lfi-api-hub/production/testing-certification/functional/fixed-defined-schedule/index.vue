<route lang="yaml">
meta:
  title: Functional Certification — Fixed Defined Schedule
  isIndex: true
</route>

<script setup lang="ts">
import { fixedDefinedScheduleArea as area } from '@/data/functional-certification/multi-payments'
</script>

<template>
  <FcMultiPaymentExplainer :area="area" />
</template>

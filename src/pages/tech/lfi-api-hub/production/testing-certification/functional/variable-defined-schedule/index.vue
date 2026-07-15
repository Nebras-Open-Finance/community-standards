<route lang="yaml">
meta:
  title: Functional Certification — Variable Defined Schedule
  isIndex: true
</route>

<script setup lang="ts">
import { variableDefinedScheduleArea as area } from '@/data/functional-certification/multi-payments'
</script>

<template>
  <FcMultiPaymentExplainer :area="area" />
</template>

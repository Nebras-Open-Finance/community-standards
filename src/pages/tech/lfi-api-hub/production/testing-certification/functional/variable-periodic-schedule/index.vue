<route lang="yaml">
meta:
  title: Functional Certification — Variable Periodic Schedule
  isIndex: true
</route>

<script setup lang="ts">
import { variablePeriodicScheduleArea as area } from '@/data/functional-certification/multi-payments'
</script>

<template>
  <FcMultiPaymentExplainer :area="area" />
</template>

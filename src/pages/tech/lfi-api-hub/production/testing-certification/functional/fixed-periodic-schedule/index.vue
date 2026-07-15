<route lang="yaml">
meta:
  title: Functional Certification — Fixed Periodic Schedule
  isIndex: true
</route>

<script setup lang="ts">
import { fixedPeriodicScheduleArea as area } from '@/data/functional-certification/multi-payments'
</script>

<template>
  <FcMultiPaymentExplainer :area="area" />
</template>

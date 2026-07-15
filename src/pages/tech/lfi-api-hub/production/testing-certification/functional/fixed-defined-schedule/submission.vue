<route lang="yaml">
meta:
  title: Fixed Defined Schedule — Functional Certification Submission
</route>

<script setup lang="ts">
import { fixedDefinedScheduleArea as area } from '@/data/functional-certification/multi-payments'

const explainerPath =
  '/tech/lfi-api-hub/production/testing-certification/functional/fixed-defined-schedule'
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Functional Certification &middot; Fixed Defined Schedule
        </div>
        <h1 class="ed-doc__title">Build your submission</h1>
        <p class="ed-doc__lede">
          Complete each step, attach your evidence, and download a ZIP to attach to your
          <strong>{{ area.certType }}</strong> Service Desk ticket. New here?
          Read <a :href="explainerPath">what Functional Certification involves</a> first.
        </p>
      </div>
    </section>

    <div class="ed-doc__body">
      <div class="ed-doc__inner">
        <FcMultiPaymentPortal :area="area" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 3rem 2rem 2rem; }
.ed-doc__body .ed-doc__inner { padding: 2rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0;
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 1.25rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede a { color: var(--at-teal-deep); }
.ed-doc__lede strong { color: var(--at-navy-deep); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.25rem 1.25rem 1.5rem; }
  .ed-doc__body .ed-doc__inner { padding: 1.5rem 1.25rem 2rem; }
}
</style>

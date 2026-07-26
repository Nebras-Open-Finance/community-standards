<route lang="yaml">
meta:
  title: TPP Functional Certification
  isIndex: true
</route>

<script setup lang="ts">
// Standalone TPP Functional Certification landing page. Deliberately NOT wired
// into the TPP sidebar — it is linked from the Service Desk / Jira
// certification-evidence tickets as a single entry point to every functional
// area. The cards mirror the "Functional Evidence" section of the TPP sidebar
// (src/data/sidebars/tpp.ts); keep them in step when that section changes.

const BASE = '/tech/tpp-standards/production/testing-certification'

const cards = [
  {
    category: 'Data Sharing',
    title: 'Bank Data Sharing',
    desc: 'Prove your TPP consumes the Bank Data Sharing endpoints through the API Hub correctly — the right consent, the endpoints you use, and a Postman screenshot per endpoint from the sandbox Model Bank.',
    url: `${BASE}/functional/bank-data-sharing`,
    tags: ['Accounts', 'Balances', 'Transactions'],
  },
  {
    category: 'Service Initiation',
    title: 'Domestic Payments',
    desc: 'Evidence your TPP initiates domestic payments through the API Hub — the Consent and Risk objects you construct for each payment type, and a payment made against each. Covers all eight types including Delegated SCA.',
    url: `${BASE}/functional/domestic-payments`,
    tags: ['Payments', 'Consent', 'Risk', 'Refunds'],
  },
  {
    category: 'Confirmation of Payee',
    title: 'Confirmation of Payee',
    desc: 'Prove your TPP performs pre-payment payee verification through the API Hub and handles each name-match verdict the Hub returns.',
    url: `${BASE}/functional/confirmation-of-payee`,
    tags: ['Yes', 'Partial', 'No'],
  },
  {
    category: 'Insurance',
    title: 'Insurance Data Sharing',
    desc: 'Evidence your TPP consumes the Insurance Data Sharing endpoints through the API Hub across the insurance policy types you support.',
    url: `${BASE}/functional/insurance-data-sharing`,
    tags: ['Policies', 'Motor', 'Health', 'Travel'],
  },
] as const
</script>

<template>
  <FcCertLanding
    audience="TPP"
    title="Functional Certification"
    lede="Functional Certification proves your TPP consumes Open Finance APIs through the API Hub correctly — the right consent, the endpoints you call, and evidence retrieved from the sandbox: the AlTareq Model Bank for banking, the AlTareq Model Insurer for insurance. Choose the area you are submitting evidence for below; each area's page explains what the evidence is and how to produce it, then its portal builds your submission for you."
    :cards="cards"
  />
</template>

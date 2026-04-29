<script setup lang="ts">
const props = defineProps<{
  certType?: string
}>()

const ticketUrl = 'https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/37'

const allCertTypes = [
  'TPP Functional Certification Evidence',
  'TPP FAPI Certification Evidence',
  'TPP CX Certification Evidence',
  'Penetration Test Results',
] as const
</script>

<template>
  <aside class="cert-banner">
    <div class="cert-banner__rail" />
    <div class="cert-banner__body">
      <div class="cert-banner__eyebrow">Service Desk &middot; Providing certification evidence</div>

      <p v-if="props.certType" class="cert-banner__lede">
        Submit this evidence by raising a Service Desk ticket. In the
        <strong>Certification Type</strong> field, select
        <strong>&ldquo;{{ props.certType }}&rdquo;</strong>, then attach your evidence to the ticket.
      </p>
      <p v-else class="cert-banner__lede">
        Each certification area is submitted as its own Service Desk ticket. The link below opens the
        same request type each time &mdash; raise one ticket per area, and in the
        <strong>Certification Type</strong> field, pick the option that matches the evidence you are
        attaching:
      </p>

      <ul v-if="!props.certType" class="cert-banner__types">
        <li v-for="t in allCertTypes" :key="t">{{ t }}</li>
      </ul>

      <div class="cert-banner__actions">
        <a class="cert-banner__primary" :href="ticketUrl" target="_blank" rel="noopener">
          Raise a certification evidence ticket
          <span class="cert-banner__arrow">&nearr;</span>
        </a>
        <a class="cert-banner__secondary" href="/support-service-desk">
          Service Desk access &amp; alternatives
        </a>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.cert-banner {
  display: grid;
  grid-template-columns: 4px 1fr;
  background: color-mix(in srgb, var(--at-teal) 6%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  margin: 0 0 2rem;
}

.cert-banner__rail { background: var(--at-teal); }

.cert-banner__body {
  padding: 1.25rem 1.5rem 1.4rem;
}

.cert-banner__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  margin-bottom: 0.75rem;
}

.cert-banner__lede {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0 0 0.85rem;
  max-width: 50rem;
}
.cert-banner__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.cert-banner__types {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.cert-banner__types li {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 0.32rem 0.65rem;
}

.cert-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  align-items: center;
  margin-top: 0.4rem;
}

.cert-banner__primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  text-decoration: none;
  padding: 0.7rem 1.1rem;
  transition: background 0.15s;
}
.cert-banner__primary:hover { background: var(--at-teal-deep); }

.cert-banner__arrow { font-weight: 400; }

.cert-banner__secondary {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.cert-banner__secondary:hover { color: var(--at-teal-deep); }
</style>

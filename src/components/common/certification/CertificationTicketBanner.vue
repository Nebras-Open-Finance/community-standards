<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  certType?: string
  audience?: 'TPP' | 'LFI'
  /**
   * Which Service Desk request type the banner points at:
   * - `evidence` — the shared "Certification Evidence" request, where the
   *   area is chosen in the Certification Type field.
   * - `cx` — the dedicated "CX Certification" request (Summary + Attachment
   *   only), which carries the CX template instead of a Certification Type.
   */
  request?: 'evidence' | 'cx'
  /** Download path for the CX certification template (`request="cx"` only). */
  templateHref?: string
  /** Filename offered to the browser for the template download. */
  templateFilename?: string
}>(), {
  audience: 'TPP',
  request: 'evidence',
})

const ticketUrls = {
  evidence: 'https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/37',
  cx: 'https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/543',
} as const

const ticketUrl = computed(() => ticketUrls[props.request])

const certTypesByAudience = {
  TPP: [
    'TPP Functional Certification Evidence',
    'TPP FAPI Certification Evidence',
    'TPP CX Certification Evidence',
    'Penetration Test Results',
  ],
  LFI: [
    'LFI Functional Certification Evidence',
    'LFI Performance Test Results',
    'Penetration Test Results',
  ],
} as const

const allCertTypes = computed(() => certTypesByAudience[props.audience])
</script>

<template>
  <aside class="cert-banner">
    <div class="cert-banner__rail" />
    <div class="cert-banner__body">
      <template v-if="props.request === 'cx'">
        <div class="cert-banner__eyebrow">Service Desk &middot; CX Certification</div>
        <p class="cert-banner__lede">
          CX evidence has its own Service Desk request type, <strong>CX Certification</strong>. It
          has no Certification Type field. Complete the CX certification template for each brand or
          segment, then raise a <strong>CX Certification</strong> ticket and attach the completed
          workbook to it.
        </p>
      </template>

      <template v-else>
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

        <p v-if="!props.certType && props.audience === 'LFI'" class="cert-banner__aside">
          CX evidence is the exception: it is raised through the dedicated
          <strong>CX Certification</strong> request. See
          <a href="/tech/lfi-api-hub/production/testing-certification/user-experience">User Experience Evidence</a>.
        </p>
      </template>

      <div class="cert-banner__actions">
        <a class="cert-banner__primary" :href="ticketUrl" target="_blank" rel="noopener">
          {{ props.request === 'cx' ? 'Raise a CX Certification ticket' : 'Raise a certification evidence ticket' }}
          <span class="cert-banner__arrow">&nearr;</span>
        </a>
        <a
          v-if="props.request === 'cx' && props.templateHref"
          class="cert-banner__primary cert-banner__primary--ghost"
          :href="props.templateHref"
          :download="props.templateFilename || ''"
        >
          Download the CX template (.xlsx)
          <span class="cert-banner__arrow">&darr;</span>
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

.cert-banner__aside {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1rem;
  max-width: 50rem;
}
.cert-banner__aside strong { color: var(--at-navy-deep); font-weight: 600; }
.cert-banner__aside a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
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
  border: 1px solid var(--at-navy-deep);
  text-decoration: none;
  padding: 0.7rem 1.1rem;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.cert-banner__primary:hover { background: var(--at-teal-deep); border-color: var(--at-teal-deep); }

.cert-banner__primary--ghost {
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border-color: var(--at-navy-deep);
}
.cert-banner__primary--ghost:hover { color: var(--at-bg-cream); }

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

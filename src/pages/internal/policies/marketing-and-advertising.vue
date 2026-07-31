<route lang="yaml">
meta:
  layout: internal
  title: Marketing and Advertising Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Marketing and Advertising Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'scope',        label: 'Scope & definitions' },
  { id: 'principles',   label: 'Core principles' },
  { id: 'approval',     label: 'Approval process' },
  { id: 'controls',     label: 'Controls' },
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'oversight',    label: 'Training & oversight' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0' },
]

const keyNums: KeyNum[] = [
  { value: '7–14', unit: 'days', label: 'Internal review timeline for materials' },
  { value: '14', unit: 'days', label: 'CBUAE advance notice for industry-wide messaging' },
  { value: '5', unit: 'yr', label: 'Minimum approval-record retention' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-teal)"
      title="Marketing and Advertising Policy"
      :meta="meta"
      lede="As the CBUAE-regulated national API Hub and Trust Framework provider, Nebras markets and advertises to promote the <strong>AlTareq</strong> brand and trust-mark and the broader Open Finance ecosystem. This policy ensures all such activity is ethical, compliant, and transparent &mdash; preventing misleading information and preserving Nebras&rsquo;s neutral position."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Purpose of this policy"
      lede="Marketing activities include educational campaigns, promotional materials, and digital communications aimed at LFIs, TPPs, and the public. All must align with CBUAE Circulars on marketing guidelines, Federal Laws on consumer protection, and UAE media standards."
      tone="cream"
    >
      <h3>This policy aims to</h3>
      <EdBullets>
        <li>Ensure all marketing and advertising is truthful, transparent, and fully compliant with relevant CBUAE and UAE regulations.</li>
        <li>Establish an approval process, including mandatory prior CBUAE approval for communications involving industry-wide impacts or references to the regulator.</li>
        <li>Prevent misleading claims, exaggeration, or discriminatory content that could harm Nebras&rsquo;s reputation or the ecosystem&rsquo;s integrity.</li>
        <li>Support Nebras&rsquo;s role in fostering trust by clearly communicating its neutral position as infrastructure operator, scheme brand, and standard setter &mdash; without endorsing specific financial products, TPPs, or LFIs.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope & definitions"
      title="What this policy covers"
      lede="This policy applies to all forms of Nebras-issued communications and promotional activity, across both digital and traditional media, with particular emphasis on national campaigns with UAE-wide reach."
      tone="surface"
    >
      <EdBullets>
        <li>The AlTareq brand and trust-mark.</li>
        <li>Advertisements, brochures, and promotional materials.</li>
        <li>Social media posts, website content, and email marketing campaigns.</li>
        <li>Industry publicity, marketing events, and national awareness campaigns.</li>
      </EdBullets>
      <EdProse>
        The policy does not apply to confidential engagements conducted bilaterally or multilaterally with the industry (including product development and other consultations), nor to product or standards collateral circulated in the ecosystem. Industry conferences and similar non-marketing activities are conducted at the discretion of the CEO.
      </EdProse>

      <h3>Definitions</h3>
      <EdBullets>
        <li><strong>Industry-wide activity</strong> &mdash; any marketing or communication that affects or targets multiple LFIs, TPPs, or the entire Open Finance ecosystem, such as ecosystem adoption drives.</li>
        <li><strong>CBUAE-related messaging</strong> &mdash; content that references the CBUAE, its logos, or regulatory approvals, or implies endorsement by the regulator.</li>
        <li><strong>(National) campaigns</strong> &mdash; broad, public-facing initiatives to promote Open Finance across the UAE, often involving media partnerships or public events.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="principles"
      num="03"
      color="var(--at-blue)"
      eyebrow="Core principles"
      title="Principles guiding Nebras marketing"
      tone="cream"
    >
      <EdBullets>
        <li><strong>Truthfulness</strong> &mdash; all statements must be accurate, evidence-based, and verifiable, avoiding unsubstantiated claims about benefits or performance.</li>
        <li><strong>Transparency</strong> &mdash; clearly disclose Nebras&rsquo;s role, any limitations of services, and disclaimers regarding liability or endorsements.</li>
        <li><strong>Fairness</strong> &mdash; ensure content is inclusive, non-discriminatory, and does not favour specific participants.</li>
        <li><strong>Compliance</strong> &mdash; strictly adhere to CBUAE Circulars and UAE media standards, including prohibitions on false advertising.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="approval"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Approval process"
      title="How marketing materials are approved"
      tone="surface"
    >
      <EdStages>
        <EdStage num="01" title="Internal approval" num-color="var(--at-blue-deep)">
          <p>The Nebras team drafts materials and submits them to the CEO for initial review, ensuring alignment with policy principles. For national campaigns, additional sign-off from the Chairman is required to confirm strategic fit.</p>
          <p><strong>Review timeline: 7–14 business days</strong>, with revisions tracked.</p>
        </EdStage>
        <EdStage num="02" title="External approval" num-color="var(--at-blue-deep)">
          <p>Industry-wide activities or CBUAE-related messaging must be submitted to the CBUAE Communications team at least <strong>14 days in advance</strong>. Approval must be obtained in writing, with any required modifications implemented before release.</p>
        </EdStage>
        <EdStage num="03" title="Logging & release" num-color="var(--at-blue-deep)">
          <p>All materials are routed through the CPO for logging. No unauthorised releases are permitted; digital tools may be used for efficiency.</p>
        </EdStage>
      </EdStages>
    </EdSectionBand>

    <EdSectionBand
      id="controls"
      num="05"
      color="var(--at-navy)"
      eyebrow="Controls & restrictions"
      title="What is controlled and restricted"
      tone="cream"
    >
      <EdBullets>
        <li><strong>Content restrictions</strong> &mdash; prohibit exaggeration of ecosystem benefits; include mandatory disclaimers for any regulatory references or potential risks.</li>
        <li><strong>Social media controls</strong> &mdash; all posts must be pre-approved by the CEO or CPO; staff personal accounts may not promote Nebras without authorisation.</li>
        <li><strong>Third-party endorsements</strong> &mdash; any collaboration requires written agreements, CEO/CPO review, and compliance checks to ensure alignment with Nebras&rsquo;s neutrality.</li>
        <li><strong>Recordkeeping</strong> &mdash; maintain detailed logs of all approvals, revisions, and releases for a minimum of <strong>5 years</strong> in a secure database.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="responsibilities"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Responsibilities"
      title="Who does what"
      tone="surface"
    >
      <EdBullets>
        <li><strong>Chief Product Officer (CPO)</strong> &mdash; oversees content creation, internal approvals, and coordination with external parties.</li>
        <li><strong>CBUAE Communications team</strong> &mdash; reviews and provides input on all industry-wide materials, or those involving CBUAE-related content or branding.</li>
        <li><strong>CEO</strong> &mdash; grants final internal sign-off and ensures regulatory compliance.</li>
        <li><strong>Staff and contractors</strong> &mdash; submit all proposed materials to the CPO, adhere to restrictions, and report any potential violations immediately.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="oversight"
      num="07"
      color="var(--at-teal)"
      eyebrow="Training & oversight"
      title="Training, monitoring, and enforcement"
      tone="cream"
      narrow
    >
      <h3>Training and awareness</h3>
      <EdBullets>
        <li>Annual mandatory training for all staff on this policy, including CBUAE Circulars, Federal Laws, and UAE media standards.</li>
        <li>Topics include identifying compliant content, navigating approval processes, social media best practices, and recognising misleading claims.</li>
      </EdBullets>

      <h3>Monitoring and reporting</h3>
      <EdBullets>
        <li><strong>Monitoring</strong> &mdash; the CPO conducts annual reviews of ongoing campaigns to verify compliance and effectiveness.</li>
        <li><strong>Reporting</strong> &mdash; an annual report to the Board detailing activities, approval metrics, any breaches, and lessons learned.</li>
        <li><strong>Escalation</strong> &mdash; detected non-compliance is reported to the CEO immediately, with severe issues escalated to the CBUAE where they involve regulatory violations.</li>
      </EdBullets>

      <h3>Enforcement and disciplinary actions</h3>
      <EdBullets>
        <li>Violations, such as releasing unapproved materials or making misleading claims, are likely to result in disciplinary measures.</li>
        <li>Systemic or repeated issues are reported to the CBUAE for potential regulatory enforcement.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/product-and-services"
        category="Customers & Conduct"
        title="Product and Services Policy"
        desc="How Nebras defines, governs, and manages the products and services it provides."
      />
      <EdRelatedCard
        href="/internal/policies/retail-consumer-protection"
        category="Customers & Conduct"
        title="Retail Consumer Protection Policy"
        desc="Nebras's indirect role in supporting fair, transparent retail consumer experiences."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}
</style>

<route lang="yaml">
meta:
  layout: internal
  title: Product and Services Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Product and Services Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'scope',        label: 'Scope & definitions' },
  { id: 'principles',   label: 'Core principles' },
  { id: 'development',  label: 'Development process' },
  { id: 'approval',     label: 'Approval workflow' },
  { id: 'risk',         label: 'Risk & consultation' },
  { id: 'responsibilities', label: 'Responsibilities' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0' },
]

const keyNums: KeyNum[] = [
  { value: '4', unit: 'stages', label: 'Multi-stage approval workflow' },
  { value: '30–45', unit: 'days', label: 'Standard approval timeline' },
  { value: 'Major', unit: 'changes', label: 'Trigger mandatory ERM risk assessment & consultation' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-teal)"
      title="Product and Services Policy"
      :meta="meta"
      lede="As the UAE national API Hub, Nebras develops and maintains standardised APIs, centralised consent management, and integration tools (SDKs, components, MCPs). This policy provides the framework for creating, developing, and approving those products and services &mdash; enhancing interoperability, security, and efficiency while maintaining Nebras&rsquo;s neutrality as an infrastructure provider."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Purpose of this policy"
      tone="cream"
    >
      <h3>This policy aims to</h3>
      <EdBullets>
        <li>Establish a structured, transparent, and efficient process for the ideation, development, and approval of Nebras products and services.</li>
        <li>Ensure all offerings comply with CBUAE regulations &mdash; particularly the Open Finance Regulation 2025 &mdash; and align with the evolving needs of LFIs, TPPs, and the broader ecosystem.</li>
        <li>Promote innovation while managing risks through evaluation and stakeholder engagement.</li>
        <li>Clarify that Nebras&rsquo;s products facilitate secure data sharing, service initiation, quotes, and onboarding <strong>without assuming liability for end-user outcomes</strong>, which remain with LFIs and TPPs.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope & definitions"
      title="What this policy applies to"
      lede="This policy applies to all stages of product and service lifecycle management &mdash; ideation, design, development, testing, approval, and deployment. It does not cover routine maintenance or minor bug fixes, which are handled under operational procedures."
      tone="surface"
    >
      <EdBullets>
        <li>APIs for data sharing, service initiation (including payments), onboarding, and quotes.</li>
        <li>Centralised consent records and management systems for secure, compliant user permissions.</li>
        <li>SDKs and other API components provided on an &ldquo;as-is&rdquo; basis, with no ongoing support or liability from Nebras.</li>
      </EdBullets>

      <h3>Definitions</h3>
      <EdBullets>
        <li><strong>Product / service</strong> &mdash; any offering developed by Nebras to support the Open Finance infrastructure, including technical tools, standards, and protocols enabling secure interactions between LFIs and TPPs.</li>
        <li><strong>Major change</strong> &mdash; a significant modification or addition, such as a new API endpoint, a novel feature impacting ecosystem interoperability, or expansion to new participant groups (e.g. e-wallet providers or fintech innovators).</li>
        <li><strong>Minor update</strong> &mdash; routine enhancements, such as performance optimisations or security patches, that do not alter core functionality or require stakeholder consultation.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="principles"
      num="03"
      color="var(--at-blue)"
      eyebrow="Core principles"
      title="Principles for product and service development"
      tone="cream"
    >
      <EdBullets>
        <li><strong>Innovation</strong> &mdash; prioritise secure, scalable, and interoperable solutions that drive ecosystem growth and Open Finance adoption.</li>
        <li><strong>Stakeholder alignment</strong> &mdash; actively account for feedback from LFIs, TPPs, and other participants, especially for major changes.</li>
        <li><strong>Compliance</strong> &mdash; fully adhere to CBUAE regulations, including data security standards and independence requirements, without requiring direct CBUAE approval unless specified.</li>
        <li><strong>Sustainability</strong> &mdash; design products to be useful to customers and to support long-term ecosystem stability.</li>
        <li><strong>Risk mitigation</strong> &mdash; embed risk assessments to protect against operational, technical, and regulatory vulnerabilities.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="development"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Development process"
      title="A phased approach to development"
      tone="surface"
    >
      <EdStages>
        <EdStage num="01" title="Ideation" num-color="var(--at-blue-deep)">
          <p>Led by the CEO/CPO, this identifies emerging needs from market trends, regulatory updates, Board strategic directives, or ecosystem feedback. Ideas are documented in a standardised template outlining benefits, challenges, and alignment with Nebras&rsquo;s mandate.</p>
        </EdStage>
        <EdStage num="02" title="Feasibility study" num-color="var(--at-blue-deep)">
          <p>The CTO, with relevant vendors or partners, conducts a technical viability assessment (resource requirements, integration challenges, scalability). In parallel, the CEO/CPO evaluates the business case &mdash; ecosystem impact, adoption potential, and cost.</p>
        </EdStage>
        <EdStage num="03" title="Design" num-color="var(--at-blue-deep)">
          <p>Led by the CPO, CTO, and partners, detailed specifications are developed incorporating security protocols, CX guidelines, and interoperability requirements. Prototypes may be created for internal testing with cross-functional input.</p>
        </EdStage>
        <EdStage num="04" title="Development & testing" num-color="var(--at-blue-deep)">
          <p>Implementation occurs in a controlled environment, followed by rigorous testing for functionality, security, and performance &mdash; including simulated ecosystem scenarios to verify compatibility with LFI/TPP systems.</p>
        </EdStage>
      </EdStages>
    </EdSectionBand>

    <EdSectionBand
      id="approval"
      num="05"
      color="var(--at-navy)"
      eyebrow="Approval workflow"
      title="Multi-staged approval"
      lede="Standard process takes 30–45 days; minor updates may be expedited with CEO authorisation."
      tone="cream"
    >
      <EdBullets>
        <li><strong>Stage 1 &mdash; Proposal submission</strong> &mdash; the CPO submits a detailed plan (scope, objectives, timeline, resource needs, ecosystem impacts).</li>
        <li><strong>Stage 2 &mdash; Technical review</strong> &mdash; the CTO verifies technical feasibility and alignment with Nebras&rsquo;s infrastructure and security standards.</li>
        <li><strong>Stage 3 &mdash; Risk assessment</strong> &mdash; for major changes, a formal assessment is conducted per the Enterprise Risk Management Policy, identifying and mitigating risks such as data breaches or interoperability issues.</li>
        <li><strong>Stage 4 &mdash; Final approval</strong> &mdash; the CEO approves product and operational details; the Board of Managers approves only high-level strategic elements (e.g. expansion to new LFI groups).</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="risk"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Risk & consultation"
      title="Risk, compliance, and industry consultation"
      tone="surface"
    >
      <h3>Risk and compliance considerations</h3>
      <EdBullets>
        <li>Revisions of existing or new risk assessments are mandatory for major changes, focusing on data security, system interoperability, and regulatory compliance.</li>
        <li>All products and services must align with the Open Finance Regulation, including adherence to the Federal Law on Personal Data Protection.</li>
      </EdBullets>

      <h3>Industry consultation</h3>
      <EdBullets>
        <li>For major changes, Nebras conducts mandatory consultations with LFIs, TPPs, and other stakeholders via workshops, surveys, or virtual forums, allowing a feedback period.</li>
        <li>Feedback is analysed and incorporated into the final design where feasible, with a summary report justifying any rejections.</li>
        <li>This ensures ecosystem buy-in and compliance with the Open Finance Regulation 2025 principles of collaboration.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="responsibilities"
      num="07"
      color="var(--at-teal)"
      eyebrow="Responsibilities"
      title="Accountability and review"
      tone="cream"
      narrow
    >
      <EdBullets>
        <li><strong>Chief Product Officer (CPO)</strong> &mdash; leads ideation, proposal development, and overall process coordination.</li>
        <li><strong>Chief Technology Officer (CTO)</strong> &mdash; ensures technical integrity, feasibility, and security throughout development.</li>
        <li><strong>CEO</strong> &mdash; provides final operational approval and oversees alignment with Nebras&rsquo;s strategic goals.</li>
        <li><strong>Board of Managers</strong> &mdash; sets high-level strategic direction and approves major initiatives.</li>
        <li><strong>All staff</strong> &mdash; contribute to relevant phases and report potential issues promptly.</li>
      </EdBullets>

      <h3>Monitoring and policy review</h3>
      <EdBullets>
        <li>Annual audits of the product development process evaluate efficiency and compliance.</li>
        <li>The policy is reviewed annually, or ad hoc in response to regulatory changes, ecosystem feedback, or internal incidents, with updates approved by the Board.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The risk framework under which major product changes are formally assessed."
      />
      <EdRelatedCard
        href="/internal/policies/marketing-and-advertising"
        category="Customers & Conduct"
        title="Marketing and Advertising Policy"
        desc="Standards for how new products and the ecosystem are promoted."
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

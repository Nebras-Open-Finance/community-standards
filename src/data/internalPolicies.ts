// Single source of truth for the internal Policies space (/internal/policies).
//
// These are Nebras's internal corporate-governance policies. The source
// documents are "Restricted" PDFs held in supporting/internal_helpers/policies
// and are deliberately NOT served — each policy is transcribed into an
// editorial Vue page under src/pages/internal/policies/. This module lists them,
// grouped by theme, and drives both the index page and the section sidebar.
//
// The /internal password gate is not a real security boundary (see
// useInternalAuth) — it only keeps this area out of casual sight.

import type { EdSidebarItemData } from '@/components/editorial/EdSidebarItem.vue'

export interface InternalPolicy {
  slug: string
  title: string
  /** One-line summary shown on the index card. */
  purpose: string
  /** Short audience tags shown as chips on the card. */
  appliesToShort: string[]
  /** Approximate reading time for the transcribed page, e.g. "6 min". */
  readTime: string
  /** ISO date the source policy was last approved/reviewed. */
  updated: string
  /** Source-document classification, e.g. "Restricted". */
  classification: string
}

export interface InternalPolicyTheme {
  id: string
  label: string
  color: string
  policies: InternalPolicy[]
}

export const internalPolicyThemes: readonly InternalPolicyTheme[] = [
  {
    id: 'governance',
    label: 'Governance & Oversight',
    color: 'var(--at-navy)',
    policies: [
      {
        slug: 'corporate-governance',
        title: 'Corporate Governance Policy',
        purpose:
          'The governance framework, board and committee structure, and responsibilities that direct and control Nebras.',
        appliesToShort: ['Nebras'],
        readTime: '12 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'internal-audit',
        title: 'Internal Audit Policy',
        purpose:
          "How Nebras's internal audit function provides independent assurance over governance, risk management, and controls.",
        appliesToShort: ['Nebras'],
        readTime: '15 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'outsourcing',
        title: 'Outsourcing Policy',
        purpose:
          'Requirements for selecting, onboarding, and overseeing third parties to whom Nebras outsources material functions.',
        appliesToShort: ['Nebras'],
        readTime: '13 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'procurement',
        title: 'Procurement Policy',
        purpose:
          'Principles and controls governing how Nebras sources goods and services and manages its suppliers.',
        appliesToShort: ['Nebras'],
        readTime: '18 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
    ],
  },
  {
    id: 'risk',
    label: 'Risk, Security & Compliance',
    color: 'var(--at-blue)',
    policies: [
      {
        slug: 'enterprise-risk-management',
        title: 'Enterprise Risk Management Policy',
        purpose:
          "Nebras's ERM framework — risk categories, the three-lines model, and the identify, assess, mitigate, and monitor cycle.",
        appliesToShort: ['Nebras'],
        readTime: '22 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'aml-cft-and-fraud',
        title: 'AML/CFT and Fraud Policy',
        purpose:
          "Controls to prevent money laundering, terrorist financing, and operational fraud across Nebras's role as API Hub operator.",
        appliesToShort: ['Nebras', 'LFI', 'TPP'],
        readTime: '11 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'business-continuity',
        title: 'Business Continuity & Disaster Recovery Policy',
        purpose:
          "Continuity and disaster-recovery foundations protecting Nebras's critical Open Finance infrastructure.",
        appliesToShort: ['Nebras'],
        readTime: '18 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'information-security',
        title: 'Information Security Policy',
        purpose:
          'How Nebras protects the confidentiality, integrity, and availability of its systems and data.',
        appliesToShort: ['Nebras'],
        readTime: '30 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
    ],
  },
  {
    id: 'conduct',
    label: 'Customers & Conduct',
    color: 'var(--at-teal)',
    policies: [
      {
        slug: 'retail-consumer-protection',
        title: 'Retail Consumer Protection Policy',
        purpose:
          "Nebras's indirect role in supporting fair, transparent, and secure experiences for retail consumers in the ecosystem.",
        appliesToShort: ['Nebras', 'LFI', 'TPP'],
        readTime: '6 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'complaints-and-disputes',
        title: 'Complaints and Disputes Management Policy',
        purpose:
          'A structured process for raising, assessing, resolving, and escalating complaints and disputes across the ecosystem.',
        appliesToShort: ['Nebras', 'LFI', 'TPP'],
        readTime: '5 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'marketing-and-advertising',
        title: 'Marketing and Advertising Policy',
        purpose:
          'Standards for how Nebras conducts marketing and advertising, ensuring accuracy and regulatory alignment.',
        appliesToShort: ['Nebras'],
        readTime: '6 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
      {
        slug: 'product-and-services',
        title: 'Product and Services Policy',
        purpose:
          'How Nebras defines, governs, and manages the products and services it provides to the ecosystem.',
        appliesToShort: ['Nebras'],
        readTime: '6 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
    ],
  },
  {
    id: 'people',
    label: 'People',
    color: 'var(--at-gold)',
    policies: [
      {
        slug: 'hr',
        title: 'Human Resources Policy',
        purpose:
          'The people policies governing employment, conduct, and the working environment at Nebras.',
        appliesToShort: ['Nebras'],
        readTime: '35 min',
        updated: '2026-05-01',
        classification: 'Restricted',
      },
    ],
  },
] as const

/** Flat list of every internal policy, in theme order. */
export const internalPolicies: readonly InternalPolicy[] = internalPolicyThemes.flatMap(
  (t) => t.policies,
)

/** Look up the theme a policy belongs to. */
export function themeForPolicy(slug: string): InternalPolicyTheme | undefined {
  return internalPolicyThemes.find((t) => t.policies.some((p) => p.slug === slug))
}

/** Sidebar tree for the /internal/policies section: one group per theme. */
export const internalPolicySidebar: EdSidebarItemData[] = internalPolicyThemes.map((t) => ({
  text: t.label,
  collapsed: false,
  items: t.policies.map((p) => ({
    text: p.title,
    link: `/internal/policies/${p.slug}`,
  })),
}))

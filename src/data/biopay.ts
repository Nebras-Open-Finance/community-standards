// Single source of truth for the BioPay space (/biopay).
//
// BioPay is a proposed UAE Open Finance payment journey: a customer is
// identified biometrically by ICP (the government identity service), and a
// Biometric Payment Initiation Provider (BPIP) — the merchant's acquirer —
// initiates a payment through the API Hub using a client_credentials grant.
// No biometric ever crosses into Open Finance; what crosses is a uaeKycId
// plus ICP's signed, transaction-bound token that it identified the person.
//
// The journey has two halves:
//   Registration — the LFI registers the customer with ICP directly through
//     the ICP SDK. The API Hub plays no part.
//   Payment — the BPIP resolves the customer with ICP through the ICP SDK,
//     queries the payment instrument at the LFI through the API Hub
//     (POST /instrument-query), then either pays account-to-account through
//     the Hub (tracked by PaymentId) or submits a card authorisation to the
//     card scheme.
//
// Everything here is Draft. The API Reference renders the Standards and Ozone
// Connect specs from api-specs PR #37, which is not merged (see biopay-spec.ts).
// PR #37 specifies only the instrument query. The account payment, payment
// status and payment log operations are still the earlier site-held proposal
// in openapi-drafts/biopay-icp-schema.yaml.
//
// The /biopay password gate is not a real security boundary (see useSpaceAuth)
// — it only keeps this area out of casual sight.

import type { EdSidebarItemData } from '@/components/editorial/EdSidebarItem.vue'

/** The OpenAPI documents behind the pages under the API Reference group. */
export { BIOPAY_STANDARDS_SPEC, BIOPAY_OZONE_CONNECT_SPEC } from './biopay-spec'

export type BiopayStatus = 'Draft' | 'In review' | 'Agreed'

export interface BiopaySection {
  slug: string
  title: string
  /** One-line summary shown on the index card. */
  summary: string
  /** What the reader will be able to do or decide after reading. */
  outcome: string
  status: BiopayStatus
  /** Approximate reading time, e.g. "8 min". */
  readTime: string
  /** Accent colour for the card rail and page eyebrow. */
  color: string
}

/**
 * The three destinations the overview page cards point at, in reading order.
 * Registration and Payment are groups — their card links at their first page.
 */
export const biopaySections: readonly BiopaySection[] = [
  {
    slug: 'directory',
    title: 'Directory',
    summary:
      'The BPIP and ICP roles, how applications, software statements and clients inherit them, the endpoints each entitles them to, and the certificates they need.',
    outcome: 'Know how an authorised initiator is registered and entitled.',
    status: 'Draft',
    readTime: '4 min',
    color: 'var(--at-blue-deep)',
  },
  {
    slug: 'registration/technical-architecture',
    title: 'Registration',
    summary:
      'How the LFI registers a customer for BioPay by integrating with ICP directly through the ICP SDK, and where the result is held.',
    outcome: 'See how a registration is completed and who holds what.',
    status: 'Draft',
    readTime: '9 min',
    color: 'var(--at-gold)',
  },
  {
    slug: 'payment/technical-architecture',
    title: 'Payment',
    summary:
      'Token exchange, rail-agnostic payment initiation across the supported payment rails (AANI, CBDC, Jaywan, …), the LFI’s payment log patch, and status tracking by event or polling.',
    outcome: 'See the full consentless payment sequence and its API surface.',
    status: 'Draft',
    readTime: '12 min',
    color: 'var(--at-navy)',
  },
]

/** Everything under /biopay, in reading order. Drives the space sidebar. */
export const biopaySidebar: EdSidebarItemData[] = [
  { text: 'Overview', link: '/biopay/' },
  { text: 'Directory', link: '/biopay/directory' },
  {
    text: 'Registration',
    collapsed: false,
    items: [
      { text: 'API Sequence Flow', link: '/biopay/registration/technical-architecture' },
      { text: 'User Experience', link: '/biopay/registration/user-experience' },
      { text: 'API Guide', link: '/biopay/registration/api-guide' },
    ],
  },
  {
    text: 'Payment',
    collapsed: false,
    items: [
      {
        text: 'API Sequence Flow',
        link: '/biopay/payment/technical-architecture',
      },
      {
        text: 'API Guide',
        link: '/biopay/payment/api-guide/',
        collapsed: false,
        items: [
          {
            text: 'Signing and Encryption',
            link: '/biopay/payment/api-guide/signing-and-encryption',
          },
          {
            text: 'Payment Token',
            link: '/biopay/payment/api-guide/payment-token',
          },
        ],
      },
      {
        text: 'API Reference',
        collapsed: false,
        items: [
          {
            text: 'Standards (BPIP → API Hub)',
            collapsed: false,
            items: [
              {
                text: 'POST /instrument-query',
                link: '/biopay/payment/api-reference/standards/instrument-query',
              },
            ],
          },
          {
            text: 'Ozone Connect (API Hub → LFI)',
            collapsed: false,
            items: [
              {
                text: 'POST /customers/action/instrument-query',
                link: '/biopay/payment/api-reference/ozone-connect/instrument-query',
              },
            ],
          },
        ],
      },
    ],
  },
]

/** Lookup for a section's own metadata from its slug. */
export function biopaySection(slug: string): BiopaySection | undefined {
  return biopaySections.find((s) => s.slug === slug)
}

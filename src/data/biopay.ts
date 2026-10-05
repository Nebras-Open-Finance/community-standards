// Single source of truth for the BioPay space (/biopay).
//
// BioPay is a proposed UAE Open Finance payment journey: a customer is
// identified biometrically by ICP (the government identity service), and a
// specifically authorised third party — ICP itself, holding the BPIP role —
// initiates a payment through the API Hub using a client_credentials grant.
// No biometric ever crosses into Open Finance; what crosses is a uaeKycId
// plus ICP's assertion that it identified the person.
//
// The journey has two halves:
//   Registration — the customer registers with their LFI directly, the LFI
//     posts the completed registration to the API Hub, the Hub stores the
//     binding (uaeKycId → LFI → payment instrument) and drives an event to
//     ICP. Discovery is then answered by the Hub from that store.
//   Payment — ICP discovers the registration, posts a payment shaped to the
//     registered payment rail (AANI, CBDC, Jaywan, ...), and tracks it by PaymentId
//     or by idempotency key while the Hub proxies execution to the LFI.
//
// Everything here is Draft. No endpoint is published and the schemas are
// proposals, not specifications.
//
// The /biopay password gate is not a real security boundary (see useSpaceAuth)
// — it only keeps this area out of casual sight.

import type { EdSidebarItemData } from '@/components/editorial/EdSidebarItem.vue'

/** The draft OpenAPI document behind every page under an API Reference group. */
export { BIOPAY_SPEC } from './biopay-spec'

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
      { text: 'Technical Architecture', link: '/biopay/registration/technical-architecture' },
      { text: 'User Experience', link: '/biopay/registration/user-experience' },
      { text: 'API Guide', link: '/biopay/registration/api-guide' },
    ],
  },
  {
    text: 'Payment',
    collapsed: false,
    items: [
      {
        text: 'Technical Architecture (Account-to-Account Payments)',
        link: '/biopay/payment/technical-architecture',
        collapsed: false,
        items: [
          {
            text: 'Card Scheme (e.g. Jaywan) / Card Flow',
            link: '/biopay/payment/card-flow',
            collapsed: false,
            items: [
              {
                text: 'API Reference',
                collapsed: false,
                items: [
                  {
                    text: 'Option 1 — POST /instrument-lookup',
                    link: '/biopay/payment/api-reference/instrument-lookup',
                  },
                ],
              },
            ],
          },
        ],
      },
      { text: 'API Guide', link: '/biopay/payment/api-guide' },
      {
        text: 'API Reference',
        collapsed: false,
        items: [
          {
            text: 'POST /biometric-payments',
            link: '/biopay/payment/api-reference/biometric-payments',
          },
          {
            text: 'GET /biometric-payments/{PaymentId}',
            link: '/biopay/payment/api-reference/biometric-payments-payment-id',
          },
          {
            text: 'GET /biometric-payments',
            link: '/biopay/payment/api-reference/biometric-payments-by-idempotency-key',
          },
          {
            text: 'PATCH /biometrics-payment-log',
            link: '/biopay/payment/api-reference/biometrics-payment-log',
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

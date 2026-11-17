<route lang="yaml">
meta:
  title: User Experience Evidence
</route>

<script setup lang="ts">
const templateHref = '/downloads/certification/lfi-cx-certification-v2.1.xlsx'
const templateFilename = 'LFI - CX Certification v2.1.xlsx'

const V = '/tech/lfi-api-hub/v2.1'

interface ScreenRef { label: string; to: string }
interface Screen {
  tab: number
  name: string
  applies: 'All' | 'Bank' | 'Bank / FX house' | 'Insurance'
  include: string[]
  refs: ScreenRef[]
}

const screens: Screen[] = [
  {
    tab: 1,
    name: 'Centralized Authentication Screen',
    applies: 'All',
    include: ['Confirm whether your organisation will use CAAP.'],
    refs: [{ label: 'CAAP user experience', to: `${V}/caap/user-experience` }],
  },
  {
    tab: 2,
    name: 'LFI to TPP Redirection Screen',
    applies: 'All',
    include: [],
    refs: [{ label: 'Opening the Return Redirect', to: `${V}/consent-journey/opening-the-redirect` }],
  },
  {
    tab: 3,
    name: 'LFI Authentication Screen (1st factor / biometrics)',
    applies: 'All',
    include: ['Every first-factor method you apply, e.g. UAE Pass, Face ID, EFR, password.'],
    refs: [
      { label: 'Authentication requirements', to: `${V}/consent-journey/authentication/requirements` },
      { label: 'Strong Customer Authentication', to: `${V}/consent-journey/authentication/sca` },
    ],
  },
  {
    tab: 4,
    name: 'LFI Authentication Screen (2nd factor)',
    applies: 'All',
    include: ['Every second-factor method you apply, e.g. one-time password, push notification, token.'],
    refs: [
      { label: 'Authentication requirements', to: `${V}/consent-journey/authentication/requirements` },
      { label: 'Strong Customer Authentication', to: `${V}/consent-journey/authentication/sca` },
    ],
  },
  {
    tab: 5,
    name: 'LFI Authorization Screen (Single Immediate Payment)',
    applies: 'Bank',
    include: [
      'Exception handling and error message scenarios.',
      'Confirmation of Payee outcomes: match, partial match and no match.',
      'Customer-facing payment notifications (push, SMS, email, in-app).',
    ],
    refs: [
      { label: 'Single Instant Payment user journeys', to: `${V}/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys` },
      { label: 'Confirmation of Payee user journeys', to: `${V}/banking/confirmation-of-payee/user-journeys` },
    ],
  },
  {
    tab: 6,
    name: 'LFI Authorization Screen (Single Immediate Payment, with Shari’ah compliance message)',
    applies: 'Bank',
    include: ['Both the Shari’ah-compliant and non-compliant variants.'],
    refs: [{ label: 'Single Instant Payment user journeys', to: `${V}/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys` }],
  },
  {
    tab: 7,
    name: 'LFI Authorization Screen (Single Future Dated Payment)',
    applies: 'Bank',
    include: ['Customer-facing payment notifications (push, SMS, email, in-app).'],
    refs: [],
  },
  {
    tab: 8,
    name: 'LFI Authorization Screen (Multi-Payment)',
    applies: 'Bank',
    include: [
      'Each of the seven VRP variations.',
      'At least one journey with account selection at the TPP and one with account selection at the LFI.',
      'For combined payments, payments to different creditors.',
      'Customer-facing payment notifications (push, SMS, email, in-app).',
    ],
    refs: [{ label: 'Authorization pages by consent type', to: `${V}/consent-journey/authorization/#by-consent-type` }],
  },
  {
    tab: 9,
    name: 'LFI Authorization Screen (International Payment)',
    applies: 'Bank',
    include: ['Customer-facing payment notifications (push, SMS, email, in-app).'],
    refs: [],
  },
  {
    tab: 10,
    name: 'LFI Authorization Screen (FX & Remittance Quote and Service Initiation)',
    applies: 'Bank / FX house',
    include: ['Customer-facing transaction notifications (push, SMS, email, in-app).'],
    refs: [],
  },
  {
    tab: 11,
    name: 'LFI Account Opening Screens (Dynamic Account Opening)',
    applies: 'Bank / FX house',
    include: [],
    refs: [],
  },
  {
    tab: 12,
    name: 'LFI Authorization Screen (Refund)',
    applies: 'Bank',
    include: [
      'A refund of a Single Immediate Payment and of at least one multi-payment variation.',
      'Customer-facing transaction notifications (push, SMS, email, in-app).',
    ],
    refs: [{ label: 'Refund requirements', to: `${V}/banking/service-initiation/refunds/requirements` }],
  },
  {
    tab: 13,
    name: 'LFI Authorization Screen (Payments with Open Beneficiaries and optional Delegated Authentication)',
    applies: 'Bank',
    include: ['Customer-facing payment notifications (push, SMS, email, in-app).'],
    refs: [{ label: 'Delegated SCA user journeys', to: `${V}/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys` }],
  },
  {
    tab: 14,
    name: 'LFI Authorization Screen (Bulk / Batch Payment)',
    applies: 'Bank',
    include: ['Customer-facing payment notifications (push, SMS, email, in-app).'],
    refs: [],
  },
  {
    tab: 15,
    name: 'LFI Authorization Screen (Bank Data Sharing — ongoing)',
    applies: 'Bank / FX house',
    include: ['The encrypted product finance rates variant.'],
    refs: [
      { label: 'Bank Data Sharing user journeys', to: `${V}/banking/data-sharing/user-journeys` },
      { label: 'Encrypted FinanceRates', to: `${V}/banking/data-sharing/api-guide/finance-rates` },
    ],
  },
  {
    tab: 16,
    name: 'Supplementary Information',
    applies: 'Bank',
    include: ['One example, e.g. for a multi-payment or a future-dated payment.'],
    refs: [],
  },
  {
    tab: 17,
    name: 'LFI Insurance Data Sharing (ongoing)',
    applies: 'Insurance',
    include: [
      'The expanded data sharing clusters, and both active and expired policies.',
      'The authorization screen for each insurance type you offer: home, renters, motor, travel, health, life.',
      'The authorization screen with multiple insurance types selected, where applicable.',
    ],
    refs: [{ label: 'Insurance Data Sharing user journeys', to: `${V}/insurance/data-sharing/user-journeys` }],
  },
  {
    tab: 18,
    name: 'LFI Insurance Quote Initiation (details screen)',
    applies: 'Insurance',
    include: [],
    refs: [{ label: 'Insurance Quotation user journeys', to: `${V}/insurance/quotation/user-journeys` }],
  },
  {
    tab: 19,
    name: 'LFI Consent Dashboard (list)',
    applies: 'All',
    include: ['Both data sharing and service initiation consents.'],
    refs: [{ label: 'Consent Management Interface', to: `${V}/consent-management-interface/` }],
  },
  {
    tab: 20,
    name: 'LFI Consent Dashboard (details)',
    applies: 'All',
    include: ['Both data sharing and service initiation consents.'],
    refs: [{ label: 'Consent Management Interface', to: `${V}/consent-management-interface/` }],
  },
  {
    tab: 21,
    name: 'LFI Consent Dashboard (revocation confirmation)',
    applies: 'All',
    include: ['Both data sharing and service initiation consents.'],
    refs: [{ label: 'Consent Management Interface', to: `${V}/consent-management-interface/` }],
  },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Testing &amp; Certification &middot; CX Evidence
        </div>
        <h1 class="ed-doc__title">
          User Experience Evidence
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          CX Certification confirms that the screens your customers see in an Open Finance journey
          &mdash; authentication, authorization and your consent management interface &mdash; meet the
          user experience requirements in the Standards and are consistent with your existing digital
          channels. It is one of the two
          <a href="/tech/lfi-api-hub/production/testing-certification/overview#gate-1">Gate 1</a>
          certifications that unlock production onboarding, and it is managed through the Nebras
          <strong>Service Desk</strong>.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner
          audience="LFI"
          request="cx"
          :template-href="templateHref"
          :template-filename="templateFilename"
        />
      </div>
    </div>

    <EdSectionBand
      id="how-it-works"
      num="01"
      color="var(--at-teal)"
      eyebrow="How CX Certification Works"
      title="Submit screen designs in the template; Nebras assesses them"
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="Download the template" num-color="var(--at-teal)">
          <p>
            Download the <a :href="templateHref" :download="templateFilename">LFI CX certification
            template</a> (v2.1). It contains a Summary sheet and one tab for each screen in the
            consent journey and consent management interface.
          </p>
        </EdStage>
        <EdStage num="02" title="Complete one workbook per brand or segment" num-color="var(--at-blue-deep, #1d4ed8)">
          <p>
            Paste your screen designs into each applicable tab, for both your web browser and mobile app
            channels, and self-assess each screen against the requirements.
          </p>
        </EdStage>
        <EdStage num="03" title="Raise a CX Certification ticket" num-color="var(--at-gold)">
          <p>
            Attach the completed workbook to a <strong>CX Certification</strong> ticket on the Service
            Desk. Raise one ticket per brand or segment.
          </p>
        </EdStage>
        <EdStage num="04" title="Nebras assesses your screens" num-color="var(--at-navy)">
          <p>
            Nebras assesses each screen against the requirements in the Standards and for consistency
            with your current customer experience. Each tab has a <strong>CBUAE / Nebras
            Assessment</strong> section for the result.
          </p>
        </EdStage>
      </EdStages>
    </EdSectionBand>

    <EdSectionBand
      id="what-is-assessed"
      num="02"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="What Nebras Assesses"
      title="Every screen is assessed against the Standards and against your own experience"
      tone="surface"
    >
      <h3>Conformance with the Standards</h3>
      <EdProse>
        Each screen MUST meet the user experience requirements the Standards define for it: the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements">authentication requirements</a>,
        the <a href="/tech/lfi-api-hub/v2.1/consent-journey/authorization/#principles">authorization page principles</a>
        (including AlTareq branding), the user journeys for each consent type, and the
        <a href="/tech/lfi-api-hub/v2.1/consent-management-interface/">consent management interface</a>
        requirements. The <a href="#screens">screen table</a> below gives the reference for each tab.
      </EdProse>

      <h3>Consistency with your current experience</h3>
      <EdProse>
        Open Finance screens MUST look and read like the rest of your digital channels. Nebras checks
        that the following are consistent with your existing web and mobile experience:
      </EdProse>
      <EdBullets>
        <li><strong>Language</strong> &mdash; wording, tone and terminology.</li>
        <li><strong>Colour scheme</strong> &mdash; the same palette your customers already see.</li>
        <li><strong>Typography</strong> &mdash; the same typefaces, sizes and weights.</li>
        <li>
          <strong>Other visual elements</strong> &mdash; for example iconography, buttons and layout
          conventions.
        </li>
      </EdBullets>
      <EdProse>
        This applies the <em>Parity of experience</em> principle: the authorization experience MUST be
        consistent with the quality of the LFI's own digital channels.
      </EdProse>

      <EdNote type="warning" title="Submit high-fidelity designs">
        <p>
          Because language, colour and typography are assessed, your designs MUST show each screen as
          customers will see it, with final copy, colours, typefaces and branding. Nebras cannot assess
          low-fidelity wireframes.
        </p>
      </EdNote>

      <h3>Assessment outcomes</h3>
      <EdProse>
        Nebras records one of the following outcomes against each screen:
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:9rem">Outcome</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pass</strong></td>
              <td>The screen meets the CX requirements.</td>
            </tr>
            <tr>
              <td><strong>Fail</strong></td>
              <td>A mandatory (MUST) requirement is not met.</td>
            </tr>
            <tr>
              <td><strong>Warning</strong></td>
              <td>A non-mandatory (SHOULD) requirement is not met.</td>
            </tr>
            <tr>
              <td><strong>N/A</strong></td>
              <td>The screen does not apply to your institution.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="template"
      num="03"
      color="var(--at-gold)"
      eyebrow="Completing the Template"
      title="One workbook per brand or segment, covering every channel"
      tone="cream"
    >
      <div class="ed-doc__contents-grid">
        <a
          class="ed-link-card"
          :href="templateHref"
          :download="templateFilename"
          :style="{ '--card-color': 'var(--at-gold)' }"
        >
          <span class="ed-link-card__top" />
          <div class="ed-link-card__meta">
            <span class="ed-link-card__cat">Template &middot; .xlsx</span>
          </div>
          <h3 class="ed-link-card__title">LFI CX Certification v2.1</h3>
          <p class="ed-link-card__desc">
            A Summary sheet and 21 screen tabs. Each tab names the screen, links its requirements, and
            has space for your evidence, your self-assessment and the Nebras assessment.
          </p>
          <div class="ed-link-card__cert">
            <span class="ed-link-card__cert-label">Attach to</span>
            <span class="ed-link-card__cert-value">CX Certification ticket</span>
          </div>
          <div class="ed-link-card__foot">
            <span class="ed-link-card__cta">Download template</span>
            <span class="ed-link-card__arrow">&darr;</span>
          </div>
        </a>
      </div>

      <EdProse>
        Complete a separate workbook for each brand or segment you are certifying, for example one for
        your retail brand and one for your corporate brand. Each workbook covers both your web browser
        and mobile app channels.
      </EdProse>

      <h3>Summary sheet</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:13rem">Field</th>
              <th>What to enter</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>LFI Legal Name</strong></td><td>Your legal entity name.</td></tr>
            <tr><td><strong>LFI Brand / Segment</strong></td><td>The brand or segment this workbook covers.</td></tr>
            <tr>
              <td><strong>Interface</strong></td>
              <td>
                Your primary interface: <em>Web browser</em> or <em>Mobile app</em>. Each screen tab
                still includes designs for every channel you support.
              </td>
            </tr>
            <tr><td><strong>Submitter name</strong></td><td>Your first and last name.</td></tr>
            <tr><td><strong>Job Title</strong></td><td>Your position.</td></tr>
            <tr><td><strong>Date Submitted</strong></td><td>The date you raise the ticket.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Then filter the <strong>Applicability</strong> column of the screen list to the screens that
        apply to your institution:
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:13rem">Institution</th>
              <th>Applicability values to include</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Bank</strong></td><td>All, Bank, Bank/FX-house</td></tr>
            <tr><td><strong>FX house</strong></td><td>All, Bank/FX-house</td></tr>
            <tr><td><strong>Insurance</strong></td><td>All, Insurance</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Each screen tab</h3>
      <EdBullets>
        <li>
          <strong>Evidence</strong> &mdash; paste your screen designs for both your desktop browser and
          mobile app interfaces, in English. Cover every variant the tab's <em>Instructions</em> ask
          for.
        </li>
        <li>
          <strong>Compliant</strong> &mdash; in the <em>LFI Submission</em> section, select
          <em>Yes</em>, <em>No</em> or <em>N/A</em>.
        </li>
        <li>
          <strong>Notes</strong> &mdash; add any supplementary comments or justification. If you have
          adjusted a consent management interface requirement, document the adjustment here. The CMI
          requirements only permit adjustments that are documented in your CX certification submission.
        </li>
        <li>
          <strong>N/A</strong> &mdash; mark a screen <em>N/A</em> when it covers a capability you do
          not offer.
        </li>
        <li>
          Leave the <strong>CBUAE / Nebras Assessment</strong> section blank. Nebras completes it.
        </li>
      </EdBullets>

      <EdNote type="tip" title="Phased delivery">
        <p>
          If you are delivering a capability later, for example Service Initiation after Data Sharing,
          mark its screens <em>N/A</em> for now. Those screens go through CX certification when the
          capability is delivered, before it enters TPP Buddying. See
          <a href="/tech/lfi-api-hub/production/testing-certification/overview#path-to-live">The Path to Live</a>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="screens"
      num="04"
      color="var(--at-navy)"
      eyebrow="Screens in the Template"
      title="21 screens, filtered by institution type"
      tone="surface"
    >
      <EdProse>
        Every tab asks for the screen's variants across all your digital channels (mobile and desktop).
        The table lists the additional evidence each tab asks for and where its requirements are
        defined. Where no page is listed, use the <em>Reference URL</em> in the tab.
      </EdProse>

      <EdRefTable>
        <table class="cx-screens">
          <thead>
            <tr>
              <th style="width:3rem">Tab</th>
              <th>Screen</th>
              <th style="width:8rem">Applies to</th>
              <th>Also include</th>
              <th>Requirements</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in screens" :key="s.tab">
              <td class="cx-screens__tab">{{ s.tab }}</td>
              <td><strong>{{ s.name }}</strong></td>
              <td><span class="cx-screens__applies">{{ s.applies }}</span></td>
              <td>
                <ul v-if="s.include.length" class="cx-screens__list">
                  <li v-for="item in s.include" :key="item">{{ item }}</li>
                </ul>
                <span v-else class="cx-screens__none">&mdash;</span>
              </td>
              <td>
                <ul v-if="s.refs.length" class="cx-screens__list cx-screens__list--refs">
                  <li v-for="r in s.refs" :key="r.to"><a :href="r.to">{{ r.label }}</a></li>
                </ul>
                <span v-else class="cx-screens__none">Reference URL in tab</span>
              </td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="ticket"
      num="05"
      color="var(--at-teal)"
      eyebrow="Raising the Ticket"
      title="What to include in your CX Certification ticket"
      tone="cream"
    >
      <EdProse>
        Raise your submission through the
        <a href="https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/543" target="_blank" rel="noopener">CX Certification</a>
        request type, in the <em>Certification</em> group of the Service Desk portal. Raise one ticket
        per brand or segment, each carrying that brand or segment's workbook.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th style="width:9rem">Field</th>
              <th style="width:7rem">Required</th>
              <th>What to include</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Summary</strong></td>
              <td>Yes</td>
              <td>
                The LFI and the brand or segment the workbook covers, for example
                <code>CX Certification &ndash; &lt;LFI legal name&gt; &ndash; &lt;brand or segment&gt;</code>.
              </td>
            </tr>
            <tr>
              <td><strong>Attachment</strong></td>
              <td>Yes</td>
              <td>The completed CX certification workbook (.xlsx) for that brand or segment.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The request has no organisation, environment, certification type or description fields. Nebras
        identifies your submission from the ticket Summary and the workbook's Summary sheet, so both
        MUST be complete.
      </EdProse>

      <h3>Before you submit</h3>
      <EdBullets>
        <li>The Summary sheet is complete: legal name, brand or segment, interface, submitter, job title and date.</li>
        <li>Every applicable tab has designs for both your web browser and mobile app channels, and a <em>Compliant</em> value.</li>
        <li>Every tab that does not apply is marked <em>N/A</em>.</li>
        <li>The <em>CBUAE / Nebras Assessment</em> sections are blank.</li>
        <li>Colleagues who need updates are added to the ticket as request participants (optional).</li>
      </EdBullets>

      <EdNote type="info" title="Not the Certification Evidence request">
        <p>
          Do not submit CX evidence through the <em>Certification Evidence</em> request type used for
          functional, performance and penetration test evidence. Use the CX Certification request. The
          Service Desk is gated by Sandbox Trust Framework SSO; see
          <a href="/support-service-desk">Support &amp; Service Desk</a> for access prerequisites and
          alternative channels.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="after-certification"
      num="06"
      color="var(--at-gold)"
      eyebrow="After Certification"
      title="Material changes to certified screens are resubmitted"
      tone="surface"
    >
      <EdProse>
        Any material change to a production authorization page MUST be resubmitted for review and
        approval, as set out in the
        <a href="/tech/lfi-api-hub/v2.1/consent-journey/authorization/#principles">authorization page principles</a>.
        Your consent journey and consent management interface MUST also continue to meet the CX
        requirements as those requirements are updated. See
        <a href="/tech/lfi-api-hub/production/testing-certification/overview#ongoing">Ongoing Conformance</a>.
      </EdProse>
    </EdSectionBand>
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
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__intro { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__intro .ed-doc__inner { padding: 2rem 2rem 2.5rem; }

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
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.ed-doc__lede strong { color: var(--at-navy-deep); }

.ed-doc__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(22.5rem, 100%), 1fr));
  gap: 1.25rem;
  margin: 0 0 1.5rem;
}

.ed-link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-wrap: wrap;
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}
.ed-link-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 0.95rem;
  flex: 1;
}
.ed-link-card__cert {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.6rem 0.75rem;
  margin-bottom: 1rem;
  background: color-mix(in srgb, var(--card-color, var(--at-navy)) 6%, var(--at-bg-cream));
  border-left: 2px solid var(--card-color, var(--at-navy));
}
.ed-link-card__cert-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}
.ed-link-card__cert-value {
  font-family: var(--at-mono);
  font-size: 0.82rem;
  color: var(--at-navy-deep);
  font-weight: 600;
}
.ed-link-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateY(3px); }

.cx-screens__tab {
  font-family: var(--at-mono);
  font-weight: 700;
  color: var(--at-navy-deep);
}
.cx-screens__applies {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 0.18rem 0.5rem;
  white-space: nowrap;
}
.cx-screens__list {
  margin: 0;
  padding-left: 1rem;
}
.cx-screens__list li + li { margin-top: 0.3rem; }
.cx-screens__list--refs { list-style: none; padding-left: 0; }
.cx-screens__list a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.cx-screens__none { color: var(--at-mute); font-size: 0.85rem; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__intro .ed-doc__inner { padding: 1.5rem 1.25rem 2rem; }
}
</style>

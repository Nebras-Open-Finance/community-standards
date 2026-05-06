<route lang="yaml">
meta:
  title: Support Service Desk
  isIndex: true
</route>

<script setup lang="ts">
interface RequestType {
  category: string
  color: string
  title: string
  url: string
  desc: string
}

const PORTAL = 'https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2'

const ticketNumber = ref<string>('')
const normalizedTicket = computed<string>(() => {
  const digits = ticketNumber.value.replace(/\D/g, '')
  return digits ? `OF-${digits}` : ''
})
const invalidInput = computed<boolean>(
  () => ticketNumber.value.length > 0 && !normalizedTicket.value,
)
function openTicket(): void {
  if (!normalizedTicket.value) return
  window.open(`${PORTAL}/${normalizedTicket.value}`, '_blank', 'noopener')
}

const primaryRequestTypes: RequestType[] = [
  {
    category: 'Service request',
    color: 'var(--at-teal)',
    title: 'I need help',
    url: `${PORTAL}/create/38`,
    desc: 'A generic &ldquo;I need help on something&rdquo; question. Use this for any general query &mdash; onboarding, access, guidance, or anything that doesn&rsquo;t require deep technical investigation.',
  },
  {
    category: 'Service request',
    color: 'var(--at-blue-deep)',
    title: 'Technical support',
    url: `${PORTAL}/create/97`,
    desc: 'A more technical question &mdash; a suspected defect, behaviour that doesn&rsquo;t look right in the spec or the platform, or a technical integration problem you&rsquo;re running into. Generally the right choice for engineering&#8209;level queries.',
  },
]

const secondaryRequestTypes: RequestType[] = [
  {
    category: 'Access',
    color: 'var(--at-navy)',
    title: 'Trouble logging in',
    url: `${PORTAL}/create/18`,
    desc: 'Issues accessing Nebras portals or services &mdash; login failures, credentials not working, SSO problems, or access that needs restoring.',
  },
  {
    category: 'Submission',
    color: 'var(--at-gold)',
    title: 'Providing certification evidence',
    url: `${PORTAL}/create/37`,
    desc: 'For submitting certification evidence to Nebras as part of the Open Finance certification process.',
  },
]
</script>

<template>
  <div class="ed-sd">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-sd-hero">
      <div class="ed-sd-hero__inner">
        <div class="ed-sd-hero__label">
          <span class="ed-sd-hero__label-dash" />
          Support &middot; Jira Service Management
        </div>
        <h1 class="ed-sd-hero__title">Support &amp; the Service Desk</h1>
        <p class="ed-sd-hero__sub">
          The Service Desk is the single entry point for any question or concern you
          have as an Open Finance participant. Tickets are routed through Nebras, but
          the question itself doesn't have to be for Nebras &mdash; it can be about
          Ozone API and the API Hub, Raidiam and the Trust Framework, another
          participant, or the UAE Open Finance specification itself. It's a tool for
          every Open Finance participant, supported alongside email and telephone
          channels.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         ATLASSIAN FEATURED CARD
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-sd-repo">
      <div class="ed-sd-repo__inner">
        <div class="ed-sd-repo__card">
          <div class="ed-sd-repo__meta">
            <span class="ed-sd-repo__meta-dot" />
            Atlassian Jira Service Management
          </div>

          <div class="ed-sd-repo__head">
            <svg class="ed-sd-repo__logo" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
              <defs>
                <linearGradient id="atlassian-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#2684FF"/>
                  <stop offset="100%" stop-color="#0052CC"/>
                </linearGradient>
              </defs>
              <path fill="#2684FF" d="M16 20 L2 44 L30 44 Z"/>
              <path fill="url(#atlassian-grad)" d="M24 4 L46 44 L14 44 Z"/>
            </svg>
            <div class="ed-sd-repo__head-text">
              <h2 class="ed-sd-repo__title">Nebras Open Finance Service Desk</h2>
              <p class="ed-sd-repo__sub">
                Hosted on <strong>Atlassian Jira Service Management</strong>, the
                Service Desk is the tool the Nebras team uses to triage and track
                every ecosystem ticket &mdash; and to spot patterns that drive
                improvements to the documentation and the platform.
              </p>
            </div>
          </div>

          <!-- Access prerequisite -->
          <div class="ed-sd-repo__access">
            <div class="ed-sd-repo__access-row">
              <span class="ed-sd-repo__access-tag">Access required</span>
              <span class="ed-sd-repo__access-desc">
                The Service Desk is gated by <strong>Sandbox Trust Framework SSO</strong>.
                Your organisation must be onboarded to the Trust Framework in Sandbox
                before anyone in your organisation can log in and raise tickets.
                Onboarding guide &mdash;
                <a class="ed-sd-repo__access-link"
                   href="/tech/tpp-standards/trust-framework/onboarding"
                   >TPPs &nearr;</a>
                <a class="ed-sd-repo__access-link"
                   href="/tech/lfi-api-hub/trust-framework/onboarding"
                   >LFIs &nearr;</a>
              </span>
            </div>

            <div class="ed-sd-repo__access-row ed-sd-repo__access-row--muted">
              <span class="ed-sd-repo__access-tag ed-sd-repo__access-tag--muted">Minimal role</span>
              <span class="ed-sd-repo__access-desc">
                If your organisation wants to add a user <em>only</em> to access the Service
                Desk, the minimally&#8209;scoped role is <strong>SBC (Secondary Business
                Contact)</strong>. Because the Service Desk is powered by Sandbox SSO only,
                these users <strong>do not</strong> need to be onboarded to the Trust
                Framework in Production.
              </span>
            </div>
          </div>

          <a
            class="ed-sd-repo__cta"
            href="https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2"
            target="_blank"
            rel="noopener"
          >
            <span>Open the Service Desk</span>
            <span class="ed-sd-repo__cta-arrow">&nearr;</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         REQUEST TYPES
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-sd-sections">
      <div class="ed-sd-sections__inner">
        <div class="ed-sd-sections__head">
          <div class="ed-sd-sections__eyebrow">
            <span class="ed-sd-sections__eyebrow-dash" />
            Service requests
          </div>
          <h2 class="ed-sd-sections__title">Raising a ticket</h2>
          <p class="ed-sd-sections__lede">
            Four request types are available. <strong>I need help</strong> and
            <strong>Technical support</strong> cover most queries; the two below
            handle specific access and certification scenarios.
          </p>
        </div>

        <!-- Primary: main two request types -->
        <div class="ed-sd-grid ed-sd-grid--primary">
          <a
            v-for="req in primaryRequestTypes"
            :key="req.title"
            :href="req.url"
            target="_blank"
            rel="noopener"
            class="ed-sd-card ed-sd-card--primary"
            :style="{ '--card-color': req.color }"
          >
            <span class="ed-sd-card__top" :style="{ background: req.color }" />

            <div class="ed-sd-card__meta">
              <span class="ed-sd-card__cat" :style="{ color: req.color }">
                {{ req.category }}
              </span>
            </div>

            <h3 class="ed-sd-card__title">{{ req.title }}</h3>

            <p class="ed-sd-card__desc" v-html="req.desc" />

            <div class="ed-sd-card__foot">
              <span class="ed-sd-card__cta">Raise this ticket</span>
              <span class="ed-sd-card__arrow" :style="{ color: req.color }">&nearr;</span>
            </div>
          </a>
        </div>

        <!-- Secondary: less common request types -->
        <div class="ed-sd-grid ed-sd-grid--secondary">
          <a
            v-for="req in secondaryRequestTypes"
            :key="req.title"
            :href="req.url"
            target="_blank"
            rel="noopener"
            class="ed-sd-card ed-sd-card--secondary"
            :style="{ '--card-color': req.color }"
          >
            <span class="ed-sd-card__top" :style="{ background: req.color }" />

            <div class="ed-sd-card__meta">
              <span class="ed-sd-card__cat" :style="{ color: req.color }">
                {{ req.category }}
              </span>
            </div>

            <h3 class="ed-sd-card__title">{{ req.title }}</h3>

            <p class="ed-sd-card__desc" v-html="req.desc" />

            <div class="ed-sd-card__foot">
              <span class="ed-sd-card__cta">Raise this ticket</span>
              <span class="ed-sd-card__arrow" :style="{ color: req.color }">&nearr;</span>
            </div>
          </a>
        </div>

        <!-- Ticket lookup -->
        <div class="ed-sd-lookup">
          <div class="ed-sd-lookup__text">
            <div class="ed-sd-lookup__eyebrow">Your tickets</div>
            <p class="ed-sd-lookup__desc">
              Open your requests dashboard to see everything you&rsquo;ve raised with
              the Service Desk &mdash; filters there let you include closed tickets
              and anything raised by your organisation.
            </p>
          </div>

          <div class="ed-sd-lookup__actions">
            <a
              class="ed-sd-lookup__button"
              href="https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/user/requests?status=open"
              target="_blank"
              rel="noopener"
            >
              <span>View all your requests</span>
              <span class="ed-sd-lookup__button-arrow">&nearr;</span>
            </a>

            <form class="ed-sd-lookup__jump" @submit.prevent="openTicket">
              <span class="ed-sd-lookup__jump-label">
                Or jump straight to a ticket by its <strong>OF number</strong>
              </span>
              <div class="ed-sd-lookup__jump-row">
                <div class="ed-sd-lookup__field" :class="{ 'ed-sd-lookup__field--invalid': invalidInput }">
                  <span class="ed-sd-lookup__prefix">OF&#8209;</span>
                  <input
                    v-model="ticketNumber"
                    class="ed-sd-lookup__input"
                    type="text"
                    inputmode="numeric"
                    pattern="\d*"
                    placeholder="1001"
                    aria-label="Ticket number"
                    maxlength="8"
                  />
                </div>
                <button
                  type="submit"
                  class="ed-sd-lookup__jump-button"
                  :disabled="!normalizedTicket"
                  aria-label="Open ticket"
                >
                  <span class="ed-sd-lookup__jump-button-arrow">&nearr;</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         WHAT TO INCLUDE IN A TICKET
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="what-to-include" class="ed-sd-include">
      <div class="ed-sd-include__inner">
        <div class="ed-sd-include__head">
          <div class="ed-sd-include__eyebrow">
            <span class="ed-sd-include__eyebrow-dash" />
            Before you raise
          </div>
          <h2 class="ed-sd-include__title">What to include when raising a ticket</h2>
          <p class="ed-sd-include__lede">
            What we need varies a bit by ticket type &mdash; the basics apply to every
            ticket, and issue-type tickets need more detail so we can reproduce and
            trace what happened. The same applies whether you raise through the
            Service Desk or by email.
          </p>
        </div>

        <!-- Group 1: universal basics -->
        <div class="ed-sd-include__group">
          <div class="ed-sd-include__group-head">
            <span class="ed-sd-include__group-label">Every ticket</span>
          </div>
          <ol class="ed-sd-include__list">
            <li class="ed-sd-include__item">
              <span class="ed-sd-include__num">01</span>
              <div class="ed-sd-include__body">
                <h3 class="ed-sd-include__item-title">Clear summary</h3>
                <p class="ed-sd-include__item-desc">
                  A short, one-line summary of what you&rsquo;re raising, followed
                  by any context needed to understand it.
                </p>
              </div>
            </li>

            <li class="ed-sd-include__item">
              <span class="ed-sd-include__num">02</span>
              <div class="ed-sd-include__body">
                <h3 class="ed-sd-include__item-title">Organisation name</h3>
                <p class="ed-sd-include__item-desc">
                  The name of the participant organisation raising the ticket.
                </p>
              </div>
            </li>

            <li class="ed-sd-include__item">
              <span class="ed-sd-include__num">03</span>
              <div class="ed-sd-include__body">
                <h3 class="ed-sd-include__item-title">Contact email</h3>
                <p class="ed-sd-include__item-desc">
                  An email address we can reach you on for follow-ups and
                  clarifications.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <!-- Group 2: issue-type tickets -->
        <div class="ed-sd-include__group">
          <div class="ed-sd-include__group-head">
            <span class="ed-sd-include__group-label">When raising an issue</span>
            <span class="ed-sd-include__group-hint">
              I need help &middot; Trouble logging in &middot; Technical support
            </span>
          </div>
          <ol class="ed-sd-include__list">
            <li class="ed-sd-include__item">
              <span class="ed-sd-include__num">04</span>
              <div class="ed-sd-include__body">
                <h3 class="ed-sd-include__item-title">Environment affected</h3>
                <p class="ed-sd-include__item-desc">
                  Sandbox or Production &mdash; and, if relevant, the specific Hub
                  or LFI deployment involved.
                </p>
              </div>
            </li>

            <li class="ed-sd-include__item">
              <span class="ed-sd-include__num">05</span>
              <div class="ed-sd-include__body">
                <h3 class="ed-sd-include__item-title">A specific example of what happened</h3>
                <p class="ed-sd-include__item-desc">
                  A concrete example of the failing interaction, not a general
                  description. Where applicable, include:
                </p>
                <ul class="ed-sd-include__sub">
                  <li>
                    Any <code>x-fapi-interaction-id</code> values from the affected
                    request(s).
                  </li>
                  <li>Any <strong>consent IDs</strong> involved.</li>
                  <li>
                    Any <strong>people involved</strong> &mdash; e.g. the PSU, a TPP
                    engineer, an LFI operator &mdash; and their role in the
                    interaction.
                  </li>
                </ul>
              </div>
            </li>

            <li class="ed-sd-include__item">
              <span class="ed-sd-include__num">06</span>
              <div class="ed-sd-include__body">
                <h3 class="ed-sd-include__item-title">Attachments &amp; screenshots</h3>
                <p class="ed-sd-include__item-desc">
                  Screenshots of errors, request/response bodies, logs, or any
                  other artefact that shows what happened. Attach rather than
                  paraphrase where possible.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <!-- Certification evidence note -->
        <div class="ed-sd-include__type-note">
          <span class="ed-sd-include__type-note-tag">Certification evidence</span>
          <span class="ed-sd-include__type-note-body">
            Items 01&ndash;03 still apply. The specific artefacts required are
            defined by the certification programme and listed inside the Service
            Desk form itself &mdash; follow the form&rsquo;s prompts and attach
            the requested evidence.
          </span>
        </div>

        <p class="ed-sd-include__note">
          <strong>Why this matters.</strong>
          Tickets with complete information move through triage quickly. Missing
          interaction IDs or consent IDs typically block investigation until
          they&rsquo;re provided &mdash; and every round of back-and-forth adds
          delay, both in our internal triage and in how quickly we can get back
          to you.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         ALTERNATIVE CHANNELS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-sd-ref">
      <div class="ed-sd-ref__inner">
        <div class="ed-sd-ref__head">
          <div class="ed-sd-ref__eyebrow">
            <span class="ed-sd-ref__eyebrow-dash" />
            Additional channels
          </div>
          <h2 class="ed-sd-ref__title">Email &amp; telephone</h2>
          <p class="ed-sd-ref__lede">
            Alongside the Service Desk, the support team is reachable by email and
            telephone. These channels are open to every participant &mdash; useful if
            you need a quicker conversation, want to follow up on an existing ticket,
            or your organisation isn't yet onboarded to the Sandbox Trust Framework.
          </p>
        </div>

        <div class="ed-sd-ref__grid">
          <article class="ed-sd-ref__tile">
            <div class="ed-sd-ref__tile-eyebrow">Email</div>
            <h3 class="ed-sd-ref__tile-title">
              <a href="mailto:Support@Nebrasopenfinance.ae">Support@Nebrasopenfinance.ae</a>
            </h3>
            <p class="ed-sd-ref__tile-body">
              For general technical support or assistance related to the Nebras Open
              Finance platform, send an email with a detailed description of your issue.
              Apply the <a href="#what-to-include">checklist above</a> &mdash; summary,
              organisation, environment, example, interaction&nbsp;IDs, consent&nbsp;IDs,
              and attachments.
            </p>
          </article>

          <article class="ed-sd-ref__tile">
            <div class="ed-sd-ref__tile-eyebrow">Telephone</div>
            <h3 class="ed-sd-ref__tile-title">
              <a href="tel:+97143282979">+971 4 328 2979</a>
            </h3>
            <p class="ed-sd-ref__tile-body">
              The dedicated telephone line connects directly to the support team, who can
              open cases on your behalf, track progress, and provide real-time updates.
              <strong>Available during business hours.</strong>
            </p>
          </article>
        </div>

        <div class="ed-sd-ref__tip">
          <span class="ed-sd-ref__tip-label">A note on channels</span>
          <span class="ed-sd-ref__tip-body">
            The Service Desk is the best starting point for anything you want tracked as
            a ticket. Email and telephone sit alongside it &mdash; use whichever channel
            suits the conversation. If you're struggling to get traction on the Service
            Desk, try <strong>email</strong>, then <strong>telephone</strong>.
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-sd {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-sd-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-sd-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-sd-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-sd-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-sd-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-sd-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

/* ─── Atlassian featured card ───────────────────────────────────────────── */
.ed-sd-repo {
  padding: 3rem 0;
  background: var(--at-bg-cream);
}

.ed-sd-repo__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-sd-repo__card {
  position: relative;
  background: #E8F1FC;
  color: var(--at-navy-deep);
  padding: 2.75rem 2.5rem 2.25rem;
  overflow: hidden;
  border: 1px solid #B8D4F0;
}

.ed-sd-repo__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4D9BFF 0%, #2684FF 50%, var(--at-blue) 100%);
}

.ed-sd-repo__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: #0052CC;
  margin-bottom: 1.5rem;
}

.ed-sd-repo__meta-dot {
  width: 8px;
  height: 8px;
  background: #0052CC;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 82, 204, 0.16);
}

.ed-sd-repo__head {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.ed-sd-repo__logo {
  flex-shrink: 0;
  margin-top: 0.35rem;
}

.ed-sd-repo__title {
  font-family: var(--at-serif);
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.65rem;
  color: var(--at-navy-deep);
}

.ed-sd-repo__sub {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 46rem;
}

.ed-sd-repo__sub strong { color: var(--at-navy-deep); font-weight: 600; }

/* Access prereq rows */
.ed-sd-repo__access {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 2rem;
  border: 1px solid #CFE0F5;
  background: rgba(255, 255, 255, 0.55);
}

.ed-sd-repo__access-row {
  display: grid;
  grid-template-columns: 10rem 1fr;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid #DBE8F7;
}

.ed-sd-repo__access-row:last-child { border-bottom: none; }

.ed-sd-repo__access-tag {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 0.55rem;
  padding: 0.3rem 0 0;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
}

.ed-sd-repo__access-tag::before {
  content: '';
  width: 18px;
  height: 1px;
  background: currentColor;
}

.ed-sd-repo__access-tag--muted {
  color: #0052CC;
}

.ed-sd-repo__access-desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}

.ed-sd-repo__access-desc strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-sd-repo__access-desc em { font-style: italic; color: var(--at-navy-deep); }

.ed-sd-repo__access-link {
  color: #0052CC;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  margin-left: 0.35em;
}

.ed-sd-repo__access-link:hover { color: var(--at-navy-deep); }

/* CTA */
.ed-sd-repo__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.35rem;
  background: #0052CC;
  color: var(--at-bg-cream);
  text-decoration: none;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  transition: transform 0.2s, background 0.2s;
}

.ed-sd-repo__cta:hover {
  background: var(--at-navy-deep);
  transform: translateY(-1px);
}

.ed-sd-repo__cta-arrow { font-size: 0.95rem; transition: transform 0.2s; }
.ed-sd-repo__cta:hover .ed-sd-repo__cta-arrow { transform: translate(2px, -2px); }

/* ─── Request types ─────────────────────────────────────────────────────── */
.ed-sd-sections {
  padding: 4rem 0 4.5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-sd-sections__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-sd-sections__head { max-width: 48rem; margin-bottom: 2.5rem; }

.ed-sd-sections__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-sd-sections__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-sd-sections__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-sd-sections__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-sd-grid {
  display: grid;
  gap: 1.25rem;
}

.ed-sd-grid--primary {
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 1rem;
}

.ed-sd-grid--secondary {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.ed-sd-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ed-sd-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-sd-card--primary { padding: 2.25rem 2rem 1.75rem; }
.ed-sd-card--secondary { padding: 1.4rem 1.4rem 1.15rem; }

.ed-sd-card--primary .ed-sd-card__title { font-size: 1.55rem; }
.ed-sd-card--primary .ed-sd-card__desc { font-size: 0.95rem; }

.ed-sd-card--secondary .ed-sd-card__title {
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
}

.ed-sd-card--secondary .ed-sd-card__desc {
  font-size: 0.85rem;
  margin-bottom: 0.9rem;
}

.ed-sd-card--secondary .ed-sd-card__foot { padding-top: 0.75rem; }
.ed-sd-card--secondary .ed-sd-card__meta { margin-bottom: 0.6rem; }

.ed-sd-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-sd-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ed-sd-card__cat { font-weight: 700; }

.ed-sd-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 1rem;
}

.ed-sd-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}

.ed-sd-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-sd-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-sd-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-sd-card:hover .ed-sd-card__arrow { transform: translate(3px, -3px); }
.ed-sd-card:hover .ed-sd-card__cta { color: var(--at-navy-deep); }

/* ─── Ticket lookup ─────────────────────────────────────────────────────── */
.ed-sd-lookup {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr minmax(20rem, 28rem);
  align-items: center;
  gap: 2rem;
  padding: 1.75rem 2rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid #0052CC;
}

.ed-sd-lookup__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #0052CC;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.ed-sd-lookup__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-sd-lookup__desc strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-sd-lookup__desc code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 82, 204, 0.08);
  color: var(--at-navy-deep);
  padding: 0.1em 0.4em;
  border-radius: 0;
}

.ed-sd-lookup__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

/* Primary CTA — "View all your requests" */
.ed-sd-lookup__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.35rem;
  background: #0052CC;
  color: var(--at-bg-cream);
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  transition: background 0.15s, transform 0.15s;
  white-space: nowrap;
}

.ed-sd-lookup__button:hover {
  background: var(--at-navy-deep);
  transform: translateY(-1px);
}

.ed-sd-lookup__button-arrow { font-size: 1.05rem; transition: transform 0.15s; }
.ed-sd-lookup__button:hover .ed-sd-lookup__button-arrow { transform: translate(2px, -2px); }

/* Secondary — OF-#### quick jump */
.ed-sd-lookup__jump {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--at-grid-line-2);
}

.ed-sd-lookup__jump-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

.ed-sd-lookup__jump-label strong { color: var(--at-navy-deep); font-weight: 700; }

.ed-sd-lookup__jump-row {
  display: flex;
  gap: 0.4rem;
  align-items: stretch;
}

.ed-sd-lookup__field {
  flex: 1;
  display: flex;
  align-items: stretch;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  transition: border-color 0.15s;
}

.ed-sd-lookup__field:focus-within { border-color: #0052CC; box-shadow: 0 0 0 2px rgba(0, 82, 204, 0.14); }
.ed-sd-lookup__field--invalid { border-color: #C9372C; }

.ed-sd-lookup__prefix {
  display: flex;
  align-items: center;
  padding: 0 0.65rem;
  background: rgba(0, 82, 204, 0.08);
  border-right: 1px solid var(--at-grid-line-2);
  font-family: var(--at-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: #0052CC;
  letter-spacing: 0.02em;
}

.ed-sd-lookup__input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.55rem 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.85rem;
  color: var(--at-navy-deep);
  letter-spacing: 0.02em;
}

.ed-sd-lookup__input::placeholder { color: var(--at-mute); font-weight: 400; }

.ed-sd-lookup__jump-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  padding: 0;
  background: var(--at-surface);
  color: #0052CC;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.ed-sd-lookup__jump-button:hover:not(:disabled) {
  background: #0052CC;
  color: var(--at-bg-cream);
  border-color: #0052CC;
}

.ed-sd-lookup__jump-button:disabled {
  color: var(--at-mute);
  cursor: not-allowed;
  opacity: 0.55;
}

.ed-sd-lookup__jump-button-arrow { font-size: 0.95rem; transition: transform 0.15s; }
.ed-sd-lookup__jump-button:hover:not(:disabled) .ed-sd-lookup__jump-button-arrow { transform: translate(2px, -2px); }

/* ─── What to include ───────────────────────────────────────────────────── */
.ed-sd-include {
  padding: 4rem 0 4.5rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
}

.ed-sd-include__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-sd-include__head { max-width: 48rem; margin-bottom: 2.5rem; }

.ed-sd-include__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-sd-include__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-sd-include__title {
  font-family: var(--at-serif);
  font-size: clamp(1.85rem, 3.6vw, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-sd-include__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-sd-include__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-sd-include__group { margin-bottom: 1.5rem; }
.ed-sd-include__group:last-of-type { margin-bottom: 0; }

.ed-sd-include__group-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
  padding: 0 0.15rem;
}

.ed-sd-include__group-label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
}

.ed-sd-include__group-hint {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 500;
}

.ed-sd-include__type-note {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.9rem;
  padding: 1rem 1.25rem;
  background: rgba(179, 120, 25, 0.06);
  border-left: 3px solid var(--at-gold);
}

.ed-sd-include__type-note-tag {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  flex-shrink: 0;
}

.ed-sd-include__type-note-body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  flex: 1;
  min-width: 14rem;
}

.ed-sd-include__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-sd-include__item {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 1.25rem;
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid var(--at-grid-line);
  align-items: flex-start;
}

.ed-sd-include__item:last-child { border-bottom: none; }

.ed-sd-include__num {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: var(--at-teal);
  font-weight: 700;
  padding-top: 0.25rem;
}

.ed-sd-include__item-title {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  margin: 0 0 0.45rem;
  color: var(--at-navy-deep);
}

.ed-sd-include__item-desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-sd-include__item-desc code,
.ed-sd-include__sub code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.08);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

.ed-sd-include__sub {
  list-style: disc;
  padding-left: 1.15rem;
  margin: 0.65rem 0 0;
  color: var(--at-mute-2);
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
}

.ed-sd-include__sub li { margin-bottom: 0.25rem; }
.ed-sd-include__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-sd-include__note {
  margin: 1.5rem 0 0;
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  max-width: 48rem;
}

.ed-sd-include__note strong {
  color: var(--at-navy-deep);
  font-weight: 600;
}

/* ─── Alternative channels ──────────────────────────────────────────────── */
.ed-sd-ref {
  padding: 4rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-sd-ref__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-sd-ref__head { max-width: 48rem; margin-bottom: 2.5rem; }

.ed-sd-ref__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-sd-ref__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-sd-ref__title {
  font-family: var(--at-serif);
  font-size: clamp(1.85rem, 3.6vw, 2.4rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-sd-ref__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-sd-ref__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-sd-ref__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.ed-sd-ref__tile {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid var(--at-grid-line);
}

.ed-sd-ref__tile:last-child { border-right: none; }

.ed-sd-ref__tile-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  margin-bottom: 0.6rem;
}

.ed-sd-ref__tile-title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.25;
  margin: 0 0 0.75rem;
  color: var(--at-navy-deep);
  word-break: break-word;
}

.ed-sd-ref__tile-title a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--at-teal);
}

.ed-sd-ref__tile-title a:hover { color: var(--at-teal-deep); }

.ed-sd-ref__tile-body {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-sd-ref__tile-body a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-sd-ref__tile-body a:hover { color: var(--at-navy-deep); }

.ed-sd-ref__tip {
  margin-top: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--at-bg-cream);
  border-left: 3px solid var(--at-teal);
}

.ed-sd-ref__tip-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  flex-shrink: 0;
}

.ed-sd-ref__tip-body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}

.ed-sd-ref__tip-body strong { color: var(--at-navy-deep); font-weight: 700; }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-sd-repo__access-row { grid-template-columns: 1fr; gap: 0.5rem; }
  .ed-sd-ref__grid { grid-template-columns: 1fr; }
  .ed-sd-ref__tile { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
  .ed-sd-ref__tile:last-child { border-bottom: none; }
  .ed-sd-lookup { grid-template-columns: 1fr; gap: 1.25rem; padding: 1.5rem; }
}

@media (max-width: 640px) {
  .ed-sd-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-sd-repo { padding: 2rem 0; }
  .ed-sd-repo__inner { padding: 0 1.25rem; }
  .ed-sd-repo__card { padding: 2rem 1.5rem 1.75rem; }
  .ed-sd-sections { padding: 3rem 0 3.5rem; }
  .ed-sd-sections__inner { padding: 0 1.25rem; }
  .ed-sd-grid--primary,
  .ed-sd-grid--secondary { grid-template-columns: 1fr; }
  .ed-sd-include { padding: 3rem 0 3.5rem; }
  .ed-sd-include__inner { padding: 0 1.25rem; }
  .ed-sd-include__item { grid-template-columns: 1fr; gap: 0.35rem; padding: 1.25rem 1.15rem; }
  .ed-sd-ref { padding: 3rem 0 4rem; }
  .ed-sd-ref__inner { padding: 0 1.25rem; }
  .ed-sd-ref__tip { flex-direction: column; gap: 0.5rem; }
  .ed-sd-lookup__button { padding: 0.9rem 1.1rem; font-size: 0.72rem; }
}
</style>

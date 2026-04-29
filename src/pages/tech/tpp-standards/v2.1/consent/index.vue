<route lang="yaml">
meta:
  title: Consent
  isIndex: true
</route>

<script setup lang="ts">
type StateKind = 'transient' | 'terminal' | 'recoverable'

interface ConsentState {
  id: string
  name: string
  kind: StateKind
  intro: string
  detail?: string
  bullets?: string[]
}

const states: ConsentState[] = [
  {
    id: 'awaitingauthorization',
    name: 'AwaitingAuthorization',
    kind: 'transient',
    intro: `The initial state for all consents. The TPP has submitted a Rich Authorization
            Request (RAR) via <code>/par</code> and is waiting for the user to authenticate
            with the LFI and authorise the consent.`,
    detail: `If the LFI requires multiple authorizers (e.g. joint account), the consent
             remains in <code>AwaitingAuthorization</code> until all required parties have
             authorized.`,
  },
  {
    id: 'authorized',
    name: 'Authorized',
    kind: 'transient',
    intro: `The consent has been fully authorized and is active. The TPP may make resource
            requests referencing this consent.`,
    detail: `The consent leaves <code>Authorized</code> when one of the following occurs:`,
    bullets: [
      'Fully used (Service Initiation only) → <code>Consumed</code>',
      '<code>ExpirationDateTime</code> reached → <code>Expired</code>',
      'User revokes it → <code>Revoked</code>',
      'LFI temporarily blocks it → <code>Suspended</code>',
    ],
  },
  {
    id: 'rejected',
    name: 'Rejected',
    kind: 'terminal',
    intro: `The consent moves from <code>AwaitingAuthorization</code> to <code>Rejected</code> when:`,
    bullets: [
      `The user declines at the LFI's authorization screen, or`,
      'The LFI rejects the consent during processing',
    ],
    detail: `<strong>Terminal state.</strong> The TPP must submit a new <code>/par</code>
             request with a fresh <code>ConsentId</code> to restart the flow.`,
  },
  {
    id: 'suspended',
    name: 'Suspended',
    kind: 'recoverable',
    intro: `The LFI moves the consent from <code>Authorized</code> to <code>Suspended</code>
            when it temporarily blocks access — for example, if the user's Emirates ID has
            expired and must be renewed before access can be restored.`,
    detail: `Once the block is cleared, the LFI must return the consent to
             <code>Authorized</code>. <strong>Not a terminal state.</strong>`,
  },
  {
    id: 'consumed',
    name: 'Consumed',
    kind: 'terminal',
    intro: `The consent moves from <code>Authorized</code> to <code>Consumed</code> when the
            action it covers has been fully used.`,
    detail: `<strong>Terminal state.</strong> Applies <strong>only to Service Initiation
             consents</strong> — a Data Sharing consent can never move to
             <code>Consumed</code> under any circumstances.`,
  },
  {
    id: 'expired',
    name: 'Expired',
    kind: 'terminal',
    intro: `The consent moves from <code>Authorized</code> or <code>Suspended</code> to
            <code>Expired</code> when it reaches its <code>ExpirationDateTime</code>.`,
    detail: `<strong>Terminal state.</strong> The TPP must prompt the user to re-consent and
             begin a new authorization flow with a new <code>ConsentId</code>.`,
  },
  {
    id: 'revoked',
    name: 'Revoked',
    kind: 'terminal',
    intro: `The consent moves from <code>Authorized</code> or <code>Suspended</code> to
            <code>Revoked</code> when the user explicitly revokes it — either through the
            TPP's consent management interface or directly at the LFI.`,
    detail: `<strong>Terminal state.</strong>`,
  },
]

function pillLabel(kind: StateKind): string {
  if (kind === 'terminal') return 'Terminal'
  if (kind === 'recoverable') return 'Recoverable'
  return 'In flight'
}
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP Standards · v2.1 · Consent
        </div>
        <h1 class="ed-doc__title">
          Consent
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A <strong>Consent</strong> is an authorisation object that represents a user's explicit
          permission for a TPP to access their data or initiate services at an LFI. Every protected
          resource request in UAE Open Finance is bound to a consent &mdash; there is no access
          without one.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="consent-types"
      num="01"
      color="var(--at-teal)"
      eyebrow="Two flavours"
      title="Consent types"
      tone="cream"
    >
      <EdProse>
        There are two types of consent, corresponding to the two service families.
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Used for</th>
              <th>Created via</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bank Data Sharing</strong></td>
              <td>Reading account data, balances, transactions, and related resources</td>
              <td>
                <code>authorization_details</code> with
                <code>type: urn:openfinanceuae:account-access-consent:v2.1</code>
              </td>
            </tr>
            <tr>
              <td><strong>Bank Service Initiation</strong></td>
              <td>Initiating payments</td>
              <td>
                <code>authorization_details</code> with
                <code>type: urn:openfinanceuae:payment-consent:v2.1</code>
              </td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="high-level-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="Lifecycle at a glance"
      title="From creation to authorized"
      tone="surface"
    >
      <EdProse>
        Before any <code>UserOAuth2Security</code> protected resource can be accessed, a consent
        must go through a two-phase flow: <strong>staging</strong> and <strong>authorization</strong>.
      </EdProse>
      <ImageViewer
        src="/images/journeys/oauth-wireframe.png"
        alt="OAuth flow — staging, redirect, authentication and authorization across TPP, API Hub and LFI"
      />
    </EdSectionBand>

    <EdSectionBand
      id="source-of-truth"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Authoritative record"
      title="API Hub as the source of truth"
      tone="cream"
    >
      <EdProse>
        The API Hub maintains all Open Finance consents and acts as the
        <strong>authoritative system of record</strong> for consents across the ecosystem. All
        consent creation, modification, and revocation events are recorded within the API Hub to
        ensure a single, consistent source of truth.
      </EdProse>
      <EdProse>
        Whenever a TPP initiates a request to access customer data or initiate a payment, the
        request is validated against the consent record stored in the API Hub.
      </EdProse>
      <EdProse>
        To maintain ecosystem-wide consistency, consent updates such as status changes must be
        synchronised with the API Hub.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="immutability"
      num="04"
      color="var(--at-teal)"
      eyebrow="What can change"
      title="Consent immutability after staging"
      tone="surface"
    >
      <EdProse>
        Once a consent is staged, the <strong>only field under <code>Data</code> that may change is
        <code>Status</code></strong>. All other <code>Data</code> values are fixed for the lifetime
        of that consent. <code>Subscription</code> and <code>Meta</code> may be patched, but they
        sit outside the <code>Data</code> object. See the request/response models in the OpenAPI
        (e.g.
        <a href="/tech/tpp-standards/v2.1/consent/open-api/account-access-consents"><code>/account-access-consents</code></a>)
        for the canonical structure.
      </EdProse>
      <EdProse>
        If a user needs to change any <code>Data</code> value (for example, to adjust
        <code>ExpirationDateTime</code> or add or remove a permission), the TPP must create a
        <strong>new consent</strong>, revoke the previous one, and link the two via
        <code>BaseConsentId</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="accessing-protected-resource"
      num="05"
      color="var(--at-gold)"
      eyebrow="Two conditions to satisfy"
      title="Accessing a protected resource"
      tone="cream"
    >
      <EdProse>
        Resources secured with <code>UserOAuth2Security</code> require user involvement &mdash; the
        user must authenticate with the LFI and explicitly authorise the consent before the TPP can
        access any resource on their behalf.
      </EdProse>
      <EdProse>
        Two independent conditions must <strong>both</strong> be satisfied before the API Hub will
        serve a <code>UserOAuth2Security</code> resource:
      </EdProse>

      <EdStages>
        <EdStage num="1" title="A valid Access Token" num-color="var(--at-teal)">
          <p>
            Requests must carry a Bearer access token in the <code>Authorization</code> header:
          </p>
          <pre class="ed-doc__pre"><code>Authorization: Bearer &lt;access_token&gt;</code></pre>
          <p>
            Access tokens are short-lived (10-minute lifetime) and are bound to the consent they
            were issued for. See
            <a href="/tech/tpp-standards/security/tokens/">Tokens &amp; Assertions</a> for the full
            token lifecycle.
          </p>
        </EdStage>

        <EdStage num="2" title="An Authorized Consent" num-color="var(--at-teal)">
          <p>
            The consent referenced in the access token's <code>authorization_details</code> must be
            in the <code>Authorized</code> state. The <code>authorization_details</code> object
            defines the exact scope of access &mdash; which permissions are granted, to which
            endpoints, for which accounts, and for how long.
          </p>
        </EdStage>
      </EdStages>

      <EdNote type="warning">
        <p>
          The API Hub <strong>must</strong> reject all requests to <code>UserOAuth2Security</code>
          resources where the associated consent is not in the <code>Authorized</code> state
          &mdash; including consents that are <code>AwaitingAuthorization</code>,
          <code>Suspended</code>, <code>Expired</code>, <code>Revoked</code>, <code>Rejected</code>,
          or <code>Consumed</code>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="consent-states"
      num="06"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Lifecycle states"
      title="Consent states"
      tone="surface"
    >
      <EdProse>
        A consent moves through a defined set of states during its lifecycle. Your application must
        track these states and respond appropriately &mdash; particularly to terminal states, which
        require a new consent flow.
      </EdProse>

      <ImageViewer
        src="/images/journeys/consent-states.png"
        alt="Consent state machine — states and transitions"
      />

      <div class="ed-doc__states">
        <article
          v-for="s in states"
          :id="s.id"
          :key="s.id"
          class="ed-doc__state"
          :class="`ed-doc__state--${s.kind}`"
        >
          <header class="ed-doc__state-head">
            <h3 class="ed-doc__state-name">{{ s.name }}</h3>
            <span class="ed-doc__state-pill">{{ pillLabel(s.kind) }}</span>
          </header>
          <p class="ed-doc__state-body" v-html="s.intro" />
          <ul v-if="s.bullets && s.bullets.length" class="ed-doc__state-bullets">
            <li v-for="(b, bi) in s.bullets" :key="bi" v-html="b" />
          </ul>
          <p v-if="s.detail" class="ed-doc__state-body" v-html="s.detail" />
        </article>
      </div>
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
.ed-doc__lede :deep(strong), .ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__pre {
  font-family: var(--at-mono);
  font-size: 0.86rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 0.75rem 0.95rem;
  margin: 0.75rem 0 0;
  overflow-x: auto;
  color: var(--at-navy-deep);
}
.ed-doc__pre code { font-family: inherit; background: none; border: 0; padding: 0; }

/* Consent state cards */
.ed-doc__states {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 1rem;
}

.ed-doc__state {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.4rem 1.5rem 1.5rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--state-accent, var(--at-mute));
}
.ed-doc__state--transient    { --state-accent: var(--at-teal-deep); }
.ed-doc__state--recoverable  { --state-accent: var(--at-gold, #b08800); }
.ed-doc__state--terminal     { --state-accent: #b91c1c; }

.ed-doc__state-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  flex-wrap: wrap;
}
.ed-doc__state-name {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  margin: 0;
}
.ed-doc__state-pill {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--state-accent, var(--at-mute));
  border: 1px solid currentColor;
  padding: 0.25rem 0.55rem;
  white-space: nowrap;
}

.ed-doc__state-body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-doc__state-body :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
.ed-doc__state-body :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

.ed-doc__state-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.ed-doc__state-bullets :deep(li) {
  position: relative;
  padding-left: 1.1rem;
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}
.ed-doc__state-bullets :deep(li::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 0.4rem;
  height: 0.4rem;
  background: var(--state-accent, var(--at-mute));
}
.ed-doc__state-bullets :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__states { grid-template-columns: 1fr; }
}
</style>

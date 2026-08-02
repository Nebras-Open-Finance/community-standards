<route lang="yaml">
meta:
  title: Authentication
  isIndex: true
</route>

<script setup lang="ts">
interface Principle {
  num: number
  name: string
  detail: string
}

const principles: Principle[] = [
  {
    num: 1,
    name: 'LFIs authenticate',
    detail: `The end user MUST go through Multi-Factor Authentication (MFA) at their LFI. The API Hub
             does not perform end user authentication.`,
  },
  {
    num: 2,
    name: 'Parity of experience',
    detail: `The end user MUST be able to use the same authentication methods they use when accessing
             the LFI's own digital channels. Open Finance authentication MUST NOT be more
             obstructive, slower, or require more steps than the LFI's existing channels.`,
  },
  {
    num: 3,
    name: 'Single MFA ceremony',
    detail: `Unlike an LFI's online channels which may require authentication for login and again
             for sensitive actions, the Open Finance consent journey requires the end user to complete
             MFA <strong>once</strong> before authorization. The exception is
             <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authentication/sca#step-up-authentication-for-payment-consents">step-up authentication for payment consents</a>.`,
  },
  {
    num: 4,
    name: 'No obstacles',
    detail: `LFIs MUST NOT introduce unnecessary delay or friction during authentication. This
             includes advertising, language that discourages TPP usage, or additional steps beyond
             what is required for authentication.`,
  },
  {
    num: 5,
    name: 'Immediate challenge',
    detail: `The authentication challenge MUST be presented immediately on app open or page load,
             with no preceding splash, welcome screen, or tap-to-continue. The end user arrives from
             the TPP having already expressed intent to authenticate; no further action MUST be
             required to initiate the challenge. This takes precedence over parity with the LFI's
             own channels.`,
  },
  {
    num: 6,
    name: 'CX certification',
    detail: `The authentication experience will be reviewed for customer experience (CX)
             compliance as part of production certification.`,
  },
]

interface Scenario {
  scenario: string
  behaviour: string
}

const scenarios: Scenario[] = [
  {
    scenario: 'LFI app is installed',
    behaviour: `The Authorization Endpoint MUST open the LFI's native mobile app directly. No
                intermediate screens, browser pages, or app-store prompts may be shown before the
                app opens.`,
  },
  {
    scenario: 'LFI app is not installed',
    behaviour: `The Authorization Endpoint MUST open a mobile-optimised web page where the end user can
                complete authentication.`,
  },
]

interface ImmediateRow {
  channel: string
  meaning: string
}

const immediate: ImmediateRow[] = [
  {
    channel: 'Native app — biometrics available',
    meaning: `The native biometric prompt (Face ID, Touch ID, fingerprint) MUST fire automatically
              as the app opens. A &ldquo;Log in with Face ID&rdquo; button that the end user must tap to
              invoke the prompt is <strong>NOT</strong> permitted.`,
  },
  {
    channel: 'Native app — biometrics unavailable',
    meaning: `Where the app falls back to a knowledge factor, the PIN or password entry screen
              MUST be shown immediately on app open.`,
  },
  {
    channel: 'Web page',
    meaning: `The credential entry form (e.g. username and password fields) MUST be the first
              screen rendered. A preceding page with a &ldquo;Log in&rdquo; button that navigates
              to the form is <strong>NOT</strong> permitted.`,
  },
]

interface FlowStep { num: number; text: string }
const flowSteps: FlowStep[] = [
  { num: 1, text: 'The TPP creates a consent and receives a redirect URI from the API Hub' },
  { num: 2, text: `The end user's device opens the LFI's <strong>Authorization Endpoint</strong>` },
  {
    num: 3,
    text: `<strong>The LFI authenticates the end user</strong> using Strong Customer Authentication (SCA)`,
  },
  { num: 4, text: 'The LFI presents the consent for authorization' },
  { num: 5, text: 'The LFI completes the interaction and redirects back to the TPP' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Consent Journey · Authentication
        </div>
        <h1 class="ed-doc__title">
          Authentication
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a TPP initiates a consent journey, the API Hub redirects the end user (Payment Services
          User) to the LFI's <strong>Authorization Endpoint</strong> so the end user can prove their
          identity. This is the <strong>authentication</strong> step &mdash; the end user demonstrates
          to the LFI that they are who they claim to be, using the same credentials and methods
          they use when accessing the LFI's own digital channels.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          Authentication is distinct from
          <a href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authorization/">authorization</a>, which
          is the subsequent step where the authenticated end user reviews and approves the consent (e.g.
          selecting accounts, confirming a payment).
        </p>
      </div>
    </section>

    <EdSectionBand
      id="where-it-sits"
      num="01"
      color="var(--at-teal)"
      eyebrow="Step in the flow"
      title="Where authentication sits in the consent flow"
      tone="cream"
    >
      <ImageViewer
        src="/images/journeys/oauth-wireframe.png"
        alt="OAuth flow — staging, redirect, authentication and authorization across TPP, API Hub and LFI"
      />

      <ol class="ed-doc__flow">
        <li v-for="s in flowSteps" :key="s.num">
          <span class="ed-doc__flow-num">{{ s.num }}</span>
          <span class="ed-doc__flow-text" v-html="s.text" />
        </li>
      </ol>
    </EdSectionBand>

    <EdSectionBand
      id="principles"
      num="02"
      color="var(--at-gold)"
      eyebrow="Six rules"
      title="Principles"
      tone="surface"
    >
      <EdProse>
        The following principles govern authentication in the Open Finance Framework:
      </EdProse>

      <ol class="ed-doc__principles">
        <li v-for="p in principles" :key="p.num">
          <header class="ed-doc__principle-head">
            <span class="ed-doc__principle-num">{{ p.num.toString().padStart(2, '0') }}</span>
            <h3 class="ed-doc__principle-name">{{ p.name }}</h3>
          </header>
          <p class="ed-doc__principle-detail" v-html="p.detail" />
        </li>
      </ol>
    </EdSectionBand>

    <EdSectionBand
      id="app-invocation"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Native app or web"
      title="App invocation"
      tone="cream"
    >
      <EdProse>
        The LFI's <strong>Authorization Endpoint</strong> MUST support two scenarios based on the
        end user's device:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Behaviour</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in scenarios" :key="s.scenario">
              <td><strong>{{ s.scenario }}</strong></td>
              <td>{{ s.behaviour }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Both scenarios MUST be supported. The Authorization Endpoint is expected to directly open
        the native app when this is how end users typically interact with the LFI digitally.
      </EdProse>

      <h3 class="ed-doc__sub">Immediate authentication challenge</h3>
      <EdProse>
        Whichever scenario applies, the authentication challenge MUST be the first thing the end user
        sees. No tap, button press, or intermediate screen may precede the challenge. Concretely:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Channel</th>
              <th>What &ldquo;immediate&rdquo; means</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in immediate" :key="r.channel">
              <td><strong>{{ r.channel }}</strong></td>
              <td v-html="r.meaning" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        This requirement takes precedence over parity with the LFI's own digital channels. If the
        LFI's own mobile app or website requires the user to tap a login button before the
        authentication challenge is shown, that tap MUST NOT be present in the Open Finance journey
        &mdash; the end user has arrived from the TPP with explicit intent to authenticate and
        authorize, and any further action to initiate the challenge is redundant friction.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="whats-next"
      num="04"
      color="var(--at-teal)"
      eyebrow="Continue reading"
      title="What's next"
      tone="surface"
    >
      <div class="ed-doc__nextcards">
        <a
          href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authentication/sca"
          class="ed-doc__nextcard"
        >
          <span class="ed-doc__nextcard-tag">Standards</span>
          <h3 class="ed-doc__nextcard-title">Strong Customer Authentication</h3>
          <p class="ed-doc__nextcard-desc">
            SCA requirements, prohibited methods, and CBUAE regulatory alignment.
          </p>
          <span class="ed-doc__nextcard-arrow">&rarr;</span>
        </a>
        <a
          href="/tech/lfi-api-hub/v2.2-draft/consent-journey/authentication/implementation"
          class="ed-doc__nextcard"
        >
          <span class="ed-doc__nextcard-tag">Guide</span>
          <h3 class="ed-doc__nextcard-title">Implementation Guide</h3>
          <p class="ed-doc__nextcard-desc">
            Best-practice approaches for biometric authentication, device binding, and step-up
            flows.
          </p>
          <span class="ed-doc__nextcard-arrow">&rarr;</span>
        </a>
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
.ed-doc__lede--tight { margin-top: 0.85rem; }
.ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede a {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede a:hover { color: var(--at-teal-deep); }

/* Numbered flow steps under the OAuth image */
.ed-doc__flow {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 56rem;
}
.ed-doc__flow li {
  display: grid;
  grid-template-columns: 2.4rem 1fr;
  gap: 0.85rem;
  padding: 0.7rem 1rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  align-items: center;
}
.ed-doc__flow-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 700;
}
.ed-doc__flow-text {
  font-family: var(--at-sans);
  font-size: 0.96rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}
.ed-doc__flow-text :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

/* Principle cards */
.ed-doc__principles {
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 1rem;
}
.ed-doc__principles li {
  position: relative;
  padding: 1.4rem 1.5rem 1.35rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-teal-deep);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.ed-doc__principle-head {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
}
.ed-doc__principle-num {
  font-family: var(--at-mono);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--at-teal-deep);
}
.ed-doc__principle-name {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0;
}
.ed-doc__principle-detail {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-doc__principle-detail :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__principle-detail :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__principle-detail :deep(a:hover) { color: var(--at-teal-deep); }

/* Sub-heading inside section bands */
.ed-doc__sub {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 2rem 0 0.85rem;
}

/* What's next link cards */
.ed-doc__nextcards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.25rem;
  margin-top: 0.5rem;
}
.ed-doc__nextcard {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 1.6rem 1.75rem 1.5rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.ed-doc__nextcard:hover {
  border-color: var(--at-teal-deep);
  transform: translateY(-1px);
}
.ed-doc__nextcard-tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
}
.ed-doc__nextcard-title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0;
}
.ed-doc__nextcard-desc {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}
.ed-doc__nextcard-arrow {
  margin-top: 0.5rem;
  font-family: var(--at-mono);
  font-size: 1.1rem;
  color: var(--at-teal-deep);
  align-self: flex-start;
  transition: transform 0.15s ease;
}
.ed-doc__nextcard:hover .ed-doc__nextcard-arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__principles { grid-template-columns: 1fr; }
  .ed-doc__nextcards { grid-template-columns: 1fr; }
}
</style>

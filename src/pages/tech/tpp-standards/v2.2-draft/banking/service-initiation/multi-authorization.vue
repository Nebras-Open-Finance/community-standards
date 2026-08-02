<route lang="yaml">
meta:
  title: Multi-Authorization
</route>

<script setup lang="ts">
const firstAuthorizerPatch = `{
  "psuIdentifiers": {
    "userId": "52738e3b-eacf-4a7c-a73b-da01caa45c3f"
  },
  "accountIds": [
    "100004000000000000000001",
    "100004000000000000000003",
    "100004000000000000000004"
  ],
  "consentBody": {
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}`

const partialApprovalPatch = `{
  "consentBody": {
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Pending"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}`

const finalApprovalPatch = `{
  "consentBody": {
    "Data": {
      "Status": "Authorized"
    },
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T08:10:02Z",
            "AuthorizationStatus": "Approved"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}`

const rejectionPatch = `{
  "consentBody": {
    "Data": {
      "Status": "Rejected"
    },
    "Meta": {
      "MultipleAuthorizers": {
        "TotalRequired": 2,
        "Authorizations": [
          {
            "AuthorizerId": "ab7eb4fb-2446-4058-bbc4-114fe6d3f44a",
            "AuthorizerType": "admin-group",
            "AuthorizationDate": "2025-06-19T06:28:17Z",
            "AuthorizationStatus": "Approved"
          },
          {
            "AuthorizerId": "e5afc3c6-5064-4a9a-baab-5fd39c4cf1eb",
            "AuthorizerType": "admin-group",
            "AuthorizationStatus": "Rejected"
          }
        ]
      }
    }
  },
  "authorizationChannel": "App"
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Service Initiation · Multi-Authorization
        </div>
        <h1 class="ed-doc__title">
          Multi-Authorization
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Open Finance standards support payment journeys that require more than one authorizer. This
          guide explains how TPPs and LFIs must coordinate multi-authorization for payment consents and
          how the consent lifecycle is reflected in API calls and responses.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before initiating a multi-authorization payment"
      tone="cream"
    >
      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>BSIP role</strong> as defined in
          <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>An active payment consent</strong> &mdash; a payment consent must have been created
          through the relevant
          <a href="/tech/tpp-standards/v2.2-draft/banking/service-initiation/domestic-payments/single-instant-payment/api-guide">Service Initiation API Guide</a>.
          Multi-authorization applies after the first authorizer has completed their step.
        </li>
        <li>
          <strong>Understanding of the <a href="/tech/tpp-standards/v2.2-draft/consent/">Consent Lifecycle</a></strong>
          &mdash; you should understand consent status transitions, including
          <code>AwaitingAuthorization</code>, <code>Authorized</code>, and <code>Rejected</code>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end multi-authorization journey"
      tone="surface"
    >
      <APIFlowViewer
        title="Multi-Authorization"
        downloadUrl="/images/consent-flows/uae-multi-auth-sequence-diagram.png"
      >
        <APIFlowsMultiAuthorization />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="indicating-support"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1"
      title="Indicate multi-authorization support in the PAR request"
      tone="cream"
    >
      <EdProse>
        When submitting the Pushed Authorization Request (PAR), the TPP MUST set
        <code>IsSingleAuthorization</code> inside <code>authorization_details[].consent</code>:
      </EdProse>

      <EdBullets>
        <li><code>true</code> &mdash; only a single authorizer is supported for the payment.</li>
        <li><code>false</code> &mdash; multiple authorizers are supported (multi-authorization enabled).</li>
      </EdBullets>

      <EdProse>
        When <code>IsSingleAuthorization</code> is <code>false</code>, the TPP SHOULD also set
        <code>AuthorizationExpirationDateTime</code> inside <code>authorization_details[].consent</code>.
        This field represents the deadline by which <strong>all</strong> remaining authorizers must have
        acted &mdash; that is, the consent MUST reach <code>Status=Authorized</code> before this time,
        otherwise the consent transitions to rejected/expired.
      </EdProse>

      <EdBullets>
        <li>
          <code>AuthorizationExpirationDateTime</code> MUST NOT be after <code>ExpirationDateTime</code>.
        </li>
        <li>
          When <code>IsSingleAuthorization</code> is <code>true</code>, TPPs SHOULD NOT include
          <code>AuthorizationExpirationDateTime</code>.
        </li>
      </EdBullets>

      <EdNote type="tip">
        <p>
          These fields are carried in the Rich Authorization Request
          (<code>authorization_details[].consent.IsSingleAuthorization</code>,
          <code>authorization_details[].consent.AuthorizationExpirationDateTime</code>). See the
          Authorization Endpoints OpenAPI for the full schema reference.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-account-selection"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2 · LFI Behavior"
      title="Account selection based on authorization type"
      tone="surface"
    >
      <EdProse>
        Before showing eligible accounts during the consent journey, the LFI checks
        <code>IsSingleAuthorization</code> from the PAR request:
      </EdProse>

      <EdBullets>
        <li>
          If <code>true</code>: allow selection only from accounts that require a single authorizer. If
          none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an
          appropriate error.
        </li>
        <li>
          If <code>false</code>: allow selection from accounts that require either single or multiple
          authorizers.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-managing-flow"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3 · LFI Behavior"
      title="Managing the authorization flow"
      tone="cream"
    >
      <EdProse>After the first user authorizes, the LFI must:</EdProse>

      <EdBullets>
        <li>
          <strong>Inform OFH of required authorizers</strong> by PATCHing the consent to include
          <code>Meta.MultipleAuthorizers</code>.
        </li>
        <li>
          <strong>Keep consent status as <code>AwaitingAuthorization</code></strong> &mdash; do
          <strong>not</strong> set <code>Status=Authorized</code> yet.
        </li>
        <li>
          <strong>Redirect back to the TPP</strong> via <code>/doConfirm</code> once the PATCH is accepted.
        </li>
      </EdBullets>

      <EdCode
        :code="firstAuthorizerPatch"
        lang="json"
        filename="PATCH consents/{consentId} — first authorizer complete, others pending"
      />

      <EdProse>
        The TPP receives the redirect/callback, exchanges the authorization code at <code>/token</code>,
        and receives an access token <strong>plus</strong> the consent object still marked
        <code>AwaitingAuthorization</code>, including the <code>Meta.MultipleAuthorizers</code> structure
        above.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="tracking-additional"
      num="06"
      color="var(--at-gold)"
      eyebrow="Step 4 · Tracking Additional Authorizations"
      title="Updating consent status after each authorization"
      tone="surface"
    >
      <EdProse>
        The LFI must PATCH the consent after each additional authorization to reflect progress:
      </EdProse>

      <EdBullets>
        <li>If any required authorizer rejects &rarr; set <code>Status=Rejected</code>.</li>
        <li>When all required authorizers approve &rarr; set <code>Status=Authorized</code>.</li>
      </EdBullets>

      <EdCode
        :code="partialApprovalPatch"
        lang="json"
        filename="Example — one authorizer approved, another still pending"
      />

      <EdCode
        :code="finalApprovalPatch"
        lang="json"
        filename="Example — final approval, consent becomes Authorized"
      />

      <EdCode
        :code="rejectionPatch"
        lang="json"
        filename="Example — a required authorizer rejects, consent becomes Rejected"
      />
    </EdSectionBand>

    <EdSectionBand
      id="consent-and-payment"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 5"
      title="Consent status and payment initiation"
      tone="cream"
    >
      <EdBullets>
        <li>The TPP MAY initiate the payment only after <code>Status=Authorized</code>.</li>
        <li>
          Additional authorizers must act before <code>AuthorizationExpirationDateTime</code> if set,
          otherwise before <code>ExpirationDateTime</code>.
        </li>
      </EdBullets>

      <EdNote type="tip" title="Tracking consent status">
        <p>TPPs can monitor progress by:</p>
        <ul>
          <li>Subscribing to event notifications; or</li>
          <li>
            Polling
            <a href="/tech/tpp-standards/v2.2-draft/consent/open-api/payment-consents-ConsentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents/{ConsentId}</code></a>.
          </li>
        </ul>
      </EdNote>

      <EdProse>
        Once the consent is <code>Authorized</code>, the TPP can exchange the refresh token for a new
        access token via <a href="/tech/tpp-standards/security/tokens/"><code>/token</code></a> and
        proceed to initiate the payment.
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>

<route lang="yaml">
meta:
  title: Multi-Authorization
</route>

<script setup lang="ts">
const patchFirstAuthorizerExample = `{
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
}
`

const patchOneApprovedExample = `{
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
}
`

const patchFinalApprovalExample = `{
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
}
`

const patchRejectedExample = `{
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
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Banking · Service Initiation · Multi-Authorization
        </div>
        <h1 class="ed-doc__title">
          Multi-Authorization
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Open Finance standards support payment journeys that require more than one authorizer.
          This guide explains how TPPs and LFIs must coordinate multi-authorization for payment
          consents and how the consent lifecycle is reflected in API calls and responses.
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
      <EdProse>Before initiating a multi-authorization payment, ensure the following are in place:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/lfi-api-hub/trust-framework/application">Application</a></strong>
          &mdash; The application must be created within the Trust Framework and assigned the
          <strong>BSIP role</strong> as defined in
          <a href="/tech/lfi-api-hub/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>An active payment consent</strong> &mdash; A payment consent must have been created
          through the relevant
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide">Service
          Initiation API Guide</a>. Multi-authorization applies after the first authorizer has
          completed their step.
        </li>
        <li>
          <strong>Understanding of the
          <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey</a></strong>
          &mdash; You should understand consent status transitions, including
          <code>AwaitingAuthorization</code>, <code>Authorized</code>, and <code>Rejected</code>.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="api-sequence-flow"
      num="02"
      color="var(--at-gold)"
      eyebrow="Sequence Flow"
      title="API sequence flow"
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
      id="indicating-multi-authorization-support"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="PAR Request"
      title="Indicating multi-authorization support"
      tone="cream"
    >
      <h3 class="ed-doc__subhead">Step 1 &mdash; Setting <code>IsSingleAuthorization</code> and <code>AuthorizationExpirationDateTime</code> in the PAR Request</h3>

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
        <code>AuthorizationExpirationDateTime</code> inside
        <code>authorization_details[].consent</code>. This field represents the deadline by which
        <strong>all</strong> remaining authorizers must have acted &mdash; that is, the consent MUST
        reach <code>Status=Authorized</code> before this time, otherwise the consent transitions to
        rejected/expired.
      </EdProse>

      <EdBullets>
        <li><code>AuthorizationExpirationDateTime</code> MUST NOT be after <code>ExpirationDateTime</code>.</li>
        <li>When <code>IsSingleAuthorization</code> is <code>true</code>, TPPs SHOULD NOT include <code>AuthorizationExpirationDateTime</code>.</li>
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
      id="lfi-behavior"
      num="04"
      color="var(--at-navy)"
      eyebrow="LFI Behaviour"
      title="LFI behavior"
      tone="surface"
    >
      <h3 class="ed-doc__subhead">Step 2 &mdash; Account selection based on authorization type</h3>
      <EdProse>
        Before showing eligible accounts during the consent journey, the LFI checks
        <code>IsSingleAuthorization</code> from the PAR request:
      </EdProse>
      <EdBullets>
        <li>If <code>true</code>: allow selection only from accounts that require a single authorizer. If none exist, decline the consent, cancel the journey, and redirect the user to the TPP with an appropriate error.</li>
        <li>If <code>false</code>: allow selection from accounts that require either single or multiple authorizers.</li>
      </EdBullets>

      <h3 class="ed-doc__subhead">Step 3 &mdash; Managing the authorization flow</h3>
      <EdProse>After the first user authorizes, the LFI must:</EdProse>
      <EdBullets>
        <li><strong>Inform OFH of required authorizers</strong> by PATCHing the consent to include <code>Meta.MultipleAuthorizers</code>.</li>
        <li><strong>Keep consent status as <code>AwaitingAuthorization</code></strong> &mdash; do <strong>not</strong> set <code>Status=Authorized</code> yet.</li>
        <li><strong>Redirect back to the TPP</strong> via <code>/doConfirm</code> once the PATCH is accepted.</li>
      </EdBullets>

      <EdProse>
        Example PATCH <code>consents/{consentId}</code> body after first authorizer (still awaiting
        others):
      </EdProse>
      <EdCode :code="patchFirstAuthorizerExample" lang="json" filename="PATCH consents/{consentId}" />

      <EdProse>
        The TPP receives the redirect/callback, exchanges the authorization code at
        <code>/token</code>, and receives an access token <strong>plus</strong> the consent object
        still marked <code>AwaitingAuthorization</code>, including the
        <code>Meta.MultipleAuthorizers</code> structure above.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="tracking-additional-authorizations"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Tracking"
      title="Tracking additional authorizations"
      tone="cream"
    >
      <h3 class="ed-doc__subhead">Step 4 &mdash; Updating consent status after each authorization</h3>
      <EdProse>The LFI must PATCH the consent after each additional authorization to reflect progress:</EdProse>
      <EdBullets>
        <li>If any required authorizer rejects &rarr; set <code>Status=Rejected</code>.</li>
        <li>When all required authorizers approve &rarr; set <code>Status=Authorized</code>.</li>
      </EdBullets>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Example: one authorizer approved, another still pending</h4>
      <EdCode :code="patchOneApprovedExample" lang="json" filename="one approved, one pending" />

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Example: final approval &mdash; consent becomes Authorized</h4>
      <EdCode :code="patchFinalApprovalExample" lang="json" filename="final approval" />

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Example: a required authorizer rejects &mdash; consent becomes Rejected</h4>
      <EdCode :code="patchRejectedExample" lang="json" filename="authorizer rejects" />
    </EdSectionBand>

    <EdSectionBand
      id="consent-status-and-payment-initiation"
      num="06"
      color="var(--at-gold)"
      eyebrow="Payment Initiation"
      title="Consent status and payment initiation"
      tone="surface"
    >
      <h3 class="ed-doc__subhead">Step 5 &mdash; Initiating the payment</h3>
      <EdBullets>
        <li>The TPP MAY initiate the payment only after <code>Status=Authorized</code>.</li>
        <li>Additional authorizers must act before <code>AuthorizationExpirationDateTime</code> if set, otherwise before <code>ExpirationDateTime</code>.</li>
      </EdBullets>

      <EdNote type="tip" title="Tracking consent status">
        <p>TPPs can monitor progress by:</p>
        <ul>
          <li>Subscribing to event notifications; or</li>
          <li>
            Polling
            <a href="/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-consents/{ConsentId}</code></a>.
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
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ed-doc__subhead--small { font-size: 1.05rem; margin-top: 1.5rem; }
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>

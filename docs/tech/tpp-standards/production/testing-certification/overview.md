---
aside: false
---

# Testing & Certification Overview

Before a Third Party Provider (TPP) can connect to a live Licensed Financial Institution (LFI) in production, it must satisfy two independent sets of requirements: regulatory licensing and Nebras technical certification.

## Regulatory Licensing

TPPs must hold a valid licence issued by the **Central Bank of the UAE (CBUAE)** before being granted access to production. Nebras certification is a separate, technical requirement and does not replace or supersede any CBUAE licensing obligation. You must contact the CBUAE directly to understand the licensing requirements applicable to your proposition and business model.

::: warning Licence required for production access
Production access will not be granted until a valid CBUAE licence has been confirmed. You may work through the Nebras certification process in parallel with your licensing application, but both must be satisfied before go-live.
:::

## Nebras Certification

Nebras requires all TPPs to complete the following certification areas before production access is granted. These requirements apply regardless of which LFI you are connecting to and are in addition to any requirements that individual LFIs may impose.

<div class="ed-card-grid">

<a href="./functional" class="ed-card" style="--ed-card-color: var(--at-blue-deep);">
  <span class="ed-card__top"></span>
  <div class="ed-card__meta">
    <span class="ed-card__cat">01 &middot; Evidence</span>
  </div>
  <h3 class="ed-card__title">Functional Evidence</h3>
  <p class="ed-card__desc">Documented proof that your proposition calls only the APIs it needs, requests only the minimum permissions required, and handles consent states correctly.</p>
  <div class="ed-card__foot">
    <span class="ed-card__cta">Open template</span>
    <span class="ed-card__arrow">&nearr;</span>
  </div>
</a>

<a href="./user-experience" class="ed-card" style="--ed-card-color: var(--at-teal);">
  <span class="ed-card__top"></span>
  <div class="ed-card__meta">
    <span class="ed-card__cat">02 &middot; Evidence</span>
  </div>
  <h3 class="ed-card__title">User Experience Evidence</h3>
  <p class="ed-card__desc">Evidence that your consent and authorisation flows meet Nebras user experience requirements.</p>
  <div class="ed-card__foot">
    <span class="ed-card__cta">Open requirements</span>
    <span class="ed-card__arrow">&nearr;</span>
  </div>
</a>

<a href="./fapi" class="ed-card" style="--ed-card-color: var(--at-blue);">
  <span class="ed-card__top"></span>
  <div class="ed-card__meta">
    <span class="ed-card__cat">03 &middot; Conformance</span>
  </div>
  <h3 class="ed-card__title">FAPI Conformance</h3>
  <p class="ed-card__desc">Results from running the OpenID Foundation FAPI conformance test suite against your client configuration.</p>
  <div class="ed-card__foot">
    <span class="ed-card__cta">Open guidance</span>
    <span class="ed-card__arrow">&nearr;</span>
  </div>
</a>

<a href="./security-validation" class="ed-card" style="--ed-card-color: var(--at-gold);">
  <span class="ed-card__top"></span>
  <div class="ed-card__meta">
    <span class="ed-card__cat">04 &middot; Validation</span>
  </div>
  <h3 class="ed-card__title">Security Validation</h3>
  <p class="ed-card__desc">Confirmation that your key management, certificate handling, and data security practices meet Nebras policy requirements.</p>
  <div class="ed-card__foot">
    <span class="ed-card__cta">Open requirements</span>
    <span class="ed-card__arrow">&nearr;</span>
  </div>
</a>

</div>

All four areas must be satisfied before Nebras will grant production access to a live LFI environment.

## Submitting Your Evidence

Certification evidence is submitted to Nebras through the **Service Desk**, using the dedicated *Providing certification evidence* request type. This is the single channel for all five areas above &mdash; bundle the artefacts for each area into the form's prompts and attach the supporting files.

<div class="ed-action">
  <div class="ed-action__body">
    <div class="ed-action__eyebrow">Service Desk &middot; Request type</div>
    <div class="ed-action__title">Providing certification evidence</div>
    <p class="ed-action__desc">
      The Service Desk is gated by Sandbox Trust Framework SSO &mdash; see <a href="/support-service-desk">Support &amp; Service Desk</a> for access prerequisites, what to include in a ticket, and the alternative email and telephone channels.
    </p>
  </div>
  <div class="ed-action__actions">
    <a class="ed-action__primary" href="https://servicedesk.nebrasopenfinance.ae/servicedesk/customer/portal/2/create/37" target="_blank" rel="noopener">
      Raise a certification evidence ticket <span class="ed-action__arrow">&nearr;</span>
    </a>
  </div>
</div>

## Scope of These Requirements

The certification requirements in this section are set by Nebras and govern technical and operational readiness for participation in the Open Finance UAE ecosystem. They do not constitute legal or regulatory advice. TPPs are solely responsible for ensuring they hold the appropriate regulatory authorisations for their proposition before going live.

import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { c as useSelectedVersion, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedVersion } = useSelectedVersion();
    const pillars = [
      {
        title: "Operate Ozone Connect",
        desc: "The LFI-built backend that implements the Open Finance endpoints the Hub calls &mdash; account data, payments, Confirmation of Payee, products &amp; leads, ATMs, and consent events.",
        color: "var(--at-teal)"
      },
      {
        title: "Authenticate the customer",
        desc: "During the consent journey, the end user is redirected from the Hub to the LFI to authenticate and authorise the consent. Your authorisation server hands the result back to the Hub via Headless Heimdall.",
        color: "var(--at-blue-deep)"
      },
      {
        title: "Provide a CMI",
        desc: "The customer-facing Consent Management Interface where end users review and revoke active consents, backed by the Hub's Consent Manager API.",
        color: "var(--at-gold)"
      }
    ];
    const sections = computed(() => [
      {
        category: "Identity",
        color: "var(--at-gold)",
        title: "Trust Framework",
        url: "/tech/lfi-api-hub/trust-framework/",
        desc: "The participant directory and certificate authority that underpins the ecosystem. Register your organisation, nominate Organisation Admins and users, upload transport and signing certificates, and create the <code>C3-hh-cm-client</code> application the Hub uses to call your services. Once live, this is also where you publish your authorisation server and API resources so TPPs can discover them.",
        tags: ["Registration", "Certificates", "C3 client"]
      },
      {
        category: "Hub",
        color: "var(--at-teal)",
        title: "API Hub",
        url: `/tech/lfi-api-hub/${selectedVersion.value}/api-hub/`,
        desc: "Everything the Hub provides to your LFI: connectivity and mTLS setup, application-layer authentication, environment-specific configuration, the Admin Portal for TPP management and operational reporting, the Headless Heimdall auth-server API used during the consent journey, and the Consent Manager API for reading and managing consents.",
        tags: ["Onboarding", "Headless Heimdall", "Consent Manager", "Admin Portal"]
      },
      {
        category: "Ozone Connect",
        color: "var(--at-navy-deep)",
        title: "Ozone Connect - Banking",
        url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/`,
        desc: "The Ozone Connect APIs your LFI implements for the Hub to call on behalf of authorised TPPs.",
        subItems: [
          {
            label: "Data Sharing",
            hint: "accounts, balances, transactions, beneficiaries, standing orders, statements, customer data (BDSP, consented)",
            url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/data-sharing/`
          },
          {
            label: "Payments (Service Initiation)",
            hint: "single instant &amp; multi-payments, refunds, PII, multi-authorization (BSIP, consented)",
            url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/service-initiation/`
          },
          {
            label: "Confirmation of Payee",
            hint: "pre-payment payee verification (BSIP, client credentials)",
            url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/confirmation-of-payee/`
          },
          {
            label: "Products &amp; Leads",
            hint: "open product catalogue and lead capture (BDSP, client credentials)",
            url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/products-and-leads/`
          },
          {
            label: "ATMs",
            hint: "ATM location data (BDSP, client credentials)",
            url: `/tech/lfi-api-hub/${selectedVersion.value}/banking/atms/`
          }
        ]
      },
      {
        category: "Ozone Connect",
        color: "var(--at-navy-deep)",
        title: "Ozone Connect - Insurance",
        url: `/tech/lfi-api-hub/${selectedVersion.value}/insurance/`,
        desc: "The Ozone Connect APIs your LFI implements for insurance &mdash; one endpoint pair per sector you underwrite, called by the Hub on behalf of authorised TPPs.",
        subItems: [
          {
            label: "Data Sharing",
            hint: "policies across employment, health, home, life, motor, renters &amp; travel, with encrypted premiums (ISP, consented)",
            url: `/tech/lfi-api-hub/${selectedVersion.value}/insurance/data-sharing/`
          }
        ]
      },
      {
        category: "Ozone Connect",
        color: "var(--at-navy-deep)",
        title: "Ozone Connect - Consent Events",
        url: `/tech/lfi-api-hub/${selectedVersion.value}/consent-events/`,
        desc: "The events-and-actions API your LFI implements so the Hub can validate consents at creation time and notify your systems when consents are created, modified, or revoked. This is the LFI's hook into the consent lifecycle owned by the Hub.",
        tags: ["Validate", "Event dispatch"]
      },
      {
        category: "end user Journey",
        color: "var(--at-blue-deep)",
        title: "Consent Journey",
        url: `/tech/lfi-api-hub/${selectedVersion.value}/consent-journey/api-guide`,
        desc: "The customer journey at the LFI between PAR and token issuance: authentication (including Strong Customer Authentication), authorization, and the Headless Heimdall handoff back to the Hub.",
        tags: ["Authentication", "SCA", "Authorization"]
      },
      {
        category: "end user Journey",
        color: "var(--at-blue-deep)",
        title: "Consent Management Interface",
        url: `/tech/lfi-api-hub/${selectedVersion.value}/consent-management-interface/`,
        desc: "Requirements, user experience, and API guide for the consent management surface every LFI must expose to its customers &mdash; the place where end users view and revoke active Open Finance consents.",
        tags: ["Requirements", "UX", "API guide"]
      },
      {
        category: "Launch",
        color: "var(--at-navy)",
        title: "Testing & Certification",
        url: "/tech/lfi-api-hub/production/testing-certification/overview",
        desc: "The certification evidence required before going live &mdash; functional, user experience, performance, and security validation &mdash; and the production live-proving steps (attestation, self-testing, TPP buddying) that follow.",
        tags: ["Functional", "UX", "Performance", "Security", "TPP buddying"]
      }
    ]);
    function withAlpha(cssVar, alpha) {
      return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-lfi" }, _attrs))} data-v-4328cf45><section class="ed-lfi-hero" data-v-4328cf45><div class="ed-lfi-hero__inner" data-v-4328cf45><div class="ed-lfi-hero__label" data-v-4328cf45><span class="ed-lfi-hero__label-dash" data-v-4328cf45></span> Integrate · Certify · Operate </div><h1 class="ed-lfi-hero__title" data-v-4328cf45> LFI — Integration Guide <span class="ed-lfi-hero__badge" data-v-4328cf45>${ssrInterpolate(unref(selectedVersion))}</span></h1><p class="ed-lfi-hero__sub" data-v-4328cf45> The implementation guide for <strong data-v-4328cf45>Licensed Financial Institutions (LFIs)</strong> connecting to UAE Open Finance. It covers the APIs your bank exposes, the API Hub services your bank consumes, the Trust Framework registrations required to participate, and the onboarding and certification path from sandbox through to live production traffic. </p><div class="ed-lfi-hero__links" data-v-4328cf45><a href="/tech/tpp-standards/" class="ed-lfi-hero__link" data-v-4328cf45><span class="ed-lfi-hero__link-label" data-v-4328cf45>TPP?</span><span class="ed-lfi-hero__link-text" data-v-4328cf45>See the TPP Standards</span><span class="ed-lfi-hero__link-arrow" data-v-4328cf45>→</span></a></div></div></section><section class="ed-lfi-pillars" data-v-4328cf45><div class="ed-lfi-pillars__inner" data-v-4328cf45><div class="ed-lfi-pillars__head" data-v-4328cf45><div class="ed-lfi-pillars__eyebrow" data-v-4328cf45><span class="ed-lfi-pillars__eyebrow-dash" data-v-4328cf45></span> Architecture </div><h2 class="ed-lfi-pillars__title" data-v-4328cf45>Where the LFI sits</h2><p class="ed-lfi-pillars__lede" data-v-4328cf45> UAE Open Finance is <strong data-v-4328cf45>strictly mediated</strong>: TPPs never call LFIs directly. All TPP traffic is routed through the <strong data-v-4328cf45>API Hub</strong> (operated by Nebras, with vendor support from Ozone API), which acts as the OIDC/FAPI authorization server, the consent source of truth, and the gateway that proxies every request to the relevant LFI. The LFI&#39;s role is the <strong data-v-4328cf45>execution layer</strong>. </p></div><div class="ed-lfi-pillars__grid" data-v-4328cf45><!--[-->`);
      ssrRenderList(pillars, (pillar, i) => {
        _push(`<div class="ed-lfi-pillar" style="${ssrRenderStyle({ "--pillar-color": pillar.color })}" data-v-4328cf45><div class="ed-lfi-pillar__num" data-v-4328cf45>0${ssrInterpolate(i + 1)}</div><h3 class="ed-lfi-pillar__title" data-v-4328cf45>${ssrInterpolate(pillar.title)}</h3><p class="ed-lfi-pillar__desc" data-v-4328cf45>${pillar.desc ?? ""}</p></div>`);
      });
      _push(`<!--]--></div><p class="ed-lfi-pillars__footnote" data-v-4328cf45> Consent state, token issuance, schema enforcement, and TPP-facing routing all live in the Hub. The LFI does not maintain independent consent state and does not issue tokens. </p></div></section><section class="ed-lfi-featured" data-v-4328cf45><div class="ed-lfi-featured__inner" data-v-4328cf45><a href="/tech/lfi-api-hub/getting-started/" class="ed-lfi-featured__card" data-v-4328cf45><div class="ed-lfi-featured__meta" data-v-4328cf45><span class="ed-lfi-featured__meta-dot" data-v-4328cf45></span> Start here </div><h2 class="ed-lfi-featured__title" data-v-4328cf45>LFI Integration Journey</h2><p class="ed-lfi-featured__desc" data-v-4328cf45> If this is your first time on this guide, follow the Integration Journey end-to-end. It sequences the work into three phases — <strong data-v-4328cf45>Pre-production build &amp; integrate</strong>, <strong data-v-4328cf45>Certification</strong>, and <strong data-v-4328cf45>Production launch</strong> — and links out to every section below at the right point in the journey. </p><div class="ed-lfi-featured__phases" data-v-4328cf45><div class="ed-lfi-featured__phase" data-v-4328cf45><span class="ed-lfi-featured__phase-num" data-v-4328cf45>1</span><span class="ed-lfi-featured__phase-label" data-v-4328cf45>Pre-production build &amp; integrate</span></div><div class="ed-lfi-featured__phase-sep" data-v-4328cf45>→</div><div class="ed-lfi-featured__phase" data-v-4328cf45><span class="ed-lfi-featured__phase-num" data-v-4328cf45>2</span><span class="ed-lfi-featured__phase-label" data-v-4328cf45>Certification</span></div><div class="ed-lfi-featured__phase-sep" data-v-4328cf45>→</div><div class="ed-lfi-featured__phase" data-v-4328cf45><span class="ed-lfi-featured__phase-num" data-v-4328cf45>3</span><span class="ed-lfi-featured__phase-label" data-v-4328cf45>Production launch</span></div></div><div class="ed-lfi-featured__foot" data-v-4328cf45><span class="ed-lfi-featured__cta" data-v-4328cf45>Open the Integration Journey</span><span class="ed-lfi-featured__arrow" data-v-4328cf45>→</span></div></a><a href="/tech/lfi-api-hub/getting-started/bank-rollout-plan" class="ed-lfi-featured__aside" data-v-4328cf45><div class="ed-lfi-featured__aside-label" data-v-4328cf45>Companion plan</div><h3 class="ed-lfi-featured__aside-title" data-v-4328cf45>Recommended Bank Rollout Plan</h3><p class="ed-lfi-featured__aside-desc" data-v-4328cf45> How to stage delivery capability-by-capability against the regulatory deadline. </p><span class="ed-lfi-featured__aside-arrow" data-v-4328cf45>→</span></a></div></section><section class="ed-lfi-sections" data-v-4328cf45><div class="ed-lfi-sections__inner" data-v-4328cf45><div class="ed-lfi-sections__head" data-v-4328cf45><div class="ed-lfi-sections__eyebrow" data-v-4328cf45><span class="ed-lfi-sections__eyebrow-dash" data-v-4328cf45></span> Guide sections </div><h2 class="ed-lfi-sections__title" data-v-4328cf45>Sections</h2><p class="ed-lfi-sections__lede" data-v-4328cf45> Each section covers one area of the integration. Work through them in the order suggested by the Integration Journey, or jump in where you need. </p></div><div class="ed-lfi-grid" data-v-4328cf45><!--[-->`);
      ssrRenderList(unref(sections), (section) => {
        _push(`<!--[-->`);
        if (!section.subItems) {
          _push(`<a${ssrRenderAttr("href", section.url)} class="ed-lfi-card" style="${ssrRenderStyle({ "--card-color": section.color })}" data-v-4328cf45><span class="ed-lfi-card__top" style="${ssrRenderStyle({ background: section.color })}" data-v-4328cf45></span><div class="ed-lfi-card__meta" data-v-4328cf45><span class="ed-lfi-card__cat" style="${ssrRenderStyle({ color: section.color })}" data-v-4328cf45>${ssrInterpolate(section.category)}</span></div><h3 class="ed-lfi-card__title" data-v-4328cf45>${section.title ?? ""}</h3><p class="ed-lfi-card__desc" data-v-4328cf45>${section.desc ?? ""}</p>`);
          if (section.tags && section.tags.length) {
            _push(`<div class="ed-lfi-card__tags" data-v-4328cf45><!--[-->`);
            ssrRenderList(section.tags, (tag) => {
              _push(`<span class="ed-lfi-card__tag" style="${ssrRenderStyle({
                background: withAlpha(section.color, 0.1),
                color: section.color
              })}" data-v-4328cf45>${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="ed-lfi-card__foot" data-v-4328cf45><span class="ed-lfi-card__cta" data-v-4328cf45>Open section</span><span class="ed-lfi-card__arrow" style="${ssrRenderStyle({ color: section.color })}" data-v-4328cf45>→</span></div></a>`);
        } else {
          _push(`<div class="ed-lfi-card ed-lfi-card--split" style="${ssrRenderStyle({ "--card-color": section.color })}" data-v-4328cf45><span class="ed-lfi-card__top" style="${ssrRenderStyle({ background: section.color })}" data-v-4328cf45></span><a${ssrRenderAttr("href", section.url)} class="ed-lfi-card__head" data-v-4328cf45><div class="ed-lfi-card__meta" data-v-4328cf45><span class="ed-lfi-card__cat" style="${ssrRenderStyle({ color: section.color })}" data-v-4328cf45>${ssrInterpolate(section.category)}</span></div><h3 class="ed-lfi-card__title" data-v-4328cf45>${section.title ?? ""}</h3><p class="ed-lfi-card__desc" data-v-4328cf45>${section.desc ?? ""}</p></a><ul class="ed-lfi-card__subs" data-v-4328cf45><!--[-->`);
          ssrRenderList(section.subItems, (sub) => {
            _push(`<li data-v-4328cf45><a${ssrRenderAttr("href", sub.url)} class="ed-lfi-card__sub" data-v-4328cf45><span class="ed-lfi-card__sub-marker" style="${ssrRenderStyle({ background: section.color })}" data-v-4328cf45></span><span class="ed-lfi-card__sub-body" data-v-4328cf45><span class="ed-lfi-card__sub-label" data-v-4328cf45>${sub.label ?? ""}</span>`);
            if (sub.hint) {
              _push(`<span class="ed-lfi-card__sub-hint" data-v-4328cf45>${sub.hint ?? ""}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span><span class="ed-lfi-card__sub-arrow" style="${ssrRenderStyle({ color: section.color })}" data-v-4328cf45>→</span></a></li>`);
          });
          _push(`<!--]--></ul><a${ssrRenderAttr("href", section.url)} class="ed-lfi-card__foot ed-lfi-card__foot--link" data-v-4328cf45><span class="ed-lfi-card__cta" data-v-4328cf45>Open Finance overview</span><span class="ed-lfi-card__arrow" style="${ssrRenderStyle({ color: section.color })}" data-v-4328cf45>→</span></a></div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4328cf45"]]);
export {
  index as default
};

import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
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
    const sections = computed(() => [
      {
        category: "Start here",
        color: "var(--at-teal)",
        title: "Getting Started",
        url: `/tech/tpp-standards/${selectedVersion.value}/getting-started/`,
        desc: "Enter your sandbox client details and generate a ready-to-use Postman collection so you can call the APIs end-to-end in minutes. Includes the Sandbox Quickstart, the Postman Guide, and the Sandbox Model Bank reference data.",
        tags: ["Sandbox", "Postman", "Model Bank"]
      },
      {
        category: "Directory",
        color: "var(--at-gold)",
        title: "Trust Framework",
        url: "/tech/tpp-standards/trust-framework/",
        desc: "The participant directory that underpins the ecosystem. Register your organisation, nominate Organisation Admins, create applications, upload transport/signing/encryption keys, and discover authorisation servers, roles, and API resources for every LFI you intend to call.",
        tags: ["Organisations", "Applications", "Keys", "LFI Discovery"]
      },
      {
        category: "Onboarding",
        color: "var(--at-blue)",
        title: "Registration",
        url: "/tech/tpp-standards/registration/api-guide",
        desc: "How your TPP registers a client dynamically with each LFI's authorisation server via <code>/tpp-registration</code>. Covers the request contract, the software statement, and the registration response you use to call downstream APIs.",
        tags: ["/tpp-registration", "Software statement"]
      },
      {
        category: "Security",
        color: "var(--at-blue-deep)",
        title: "Security, Auth &amp; Headers",
        url: "/tech/tpp-standards/security/fapi",
        desc: "The FAPI security profile TPPs must implement &mdash; request-object JWTs, message signing and encryption, receiving event notifications, and handling authorization callbacks &mdash; plus token exchange, client assertions, and the standard request headers every call must carry.",
        tags: ["FAPI", "mTLS", "JWT", "Client assertion"]
      },
      {
        category: "Consent",
        color: "var(--at-navy)",
        title: "Consent",
        url: `/tech/tpp-standards/${selectedVersion.value}/consent/`,
        desc: "Create, manage, and revoke customer consents through the API Hub. Covers PAR, account-access and payment consents, the Consent Management Interface your customers see, and the patch flow for consent state transitions.",
        tags: ["PAR", "Account access", "Payment consents", "CMI"]
      },
      {
        category: "Core APIs",
        color: "var(--at-navy-deep)",
        title: "Banking",
        url: `/tech/tpp-standards/${selectedVersion.value}/banking/`,
        desc: "The banking APIs the API Hub exposes to TPPs on behalf of authorised customers.",
        subItems: [
          {
            label: "Data Sharing",
            hint: "accounts, balances, transactions, beneficiaries, statements, parties",
            url: `/tech/tpp-standards/${selectedVersion.value}/banking/data-sharing/`
          },
          {
            label: "Payments (Service Initiation)",
            hint: "single instant &amp; multi-payments, refunds, PII, multi-authorization",
            url: `/tech/tpp-standards/${selectedVersion.value}/banking/service-initiation/`
          },
          {
            label: "Confirmation of Payee",
            hint: "pre-payment payee verification",
            url: `/tech/tpp-standards/${selectedVersion.value}/banking/confirmation-of-payee/`
          },
          {
            label: "Products and Leads",
            hint: "open product catalogue, lead capture",
            url: `/tech/tpp-standards/${selectedVersion.value}/banking/products-leads/`
          },
          {
            label: "ATMs",
            hint: "ATM location data",
            url: `/tech/tpp-standards/${selectedVersion.value}/banking/atms/`
          }
        ]
      },
      {
        category: "Core APIs",
        color: "var(--at-teal-deep)",
        title: "Insurance",
        url: `/tech/tpp-standards/${selectedVersion.value}/insurance/`,
        desc: "The insurance APIs the API Hub exposes to TPPs on behalf of authorised customers.",
        subItems: [
          {
            label: "Data Sharing",
            hint: "policies across employment, health, home, life, motor, renters &amp; travel, with encrypted premiums",
            url: `/tech/tpp-standards/${selectedVersion.value}/insurance/data-sharing/`
          }
        ]
      },
      {
        category: "Events",
        color: "var(--at-teal-deep)",
        title: "Event Notifications &amp; Webhooks",
        url: `/tech/tpp-standards/${selectedVersion.value}/webhooks/`,
        desc: "Receive real-time notifications from the API Hub when consent or payment state changes. Covers the webhook payload contracts, delivery guarantees, and the validation your endpoint must perform.",
        tags: ["Consent status", "Payment status"]
      },
      {
        category: "Launch",
        color: "var(--at-gold)",
        title: "Testing &amp; Certification",
        url: "/tech/tpp-standards/production/testing-certification/overview",
        desc: "The required certifications before going live &mdash; Trust Framework checklist, functional evidence, user experience evidence, FAPI conformance, and security validation &mdash; followed by the production live-proving step.",
        tags: ["Functional", "UX", "FAPI", "Security", "Live proving"]
      }
    ]);
    function withAlpha(cssVar, alpha) {
      return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-tpp" }, _attrs))} data-v-e07f6ce2><section class="ed-tpp-hero" data-v-e07f6ce2><div class="ed-tpp-hero__inner" data-v-e07f6ce2><div class="ed-tpp-hero__label" data-v-e07f6ce2><span class="ed-tpp-hero__label-dash" data-v-e07f6ce2></span> Build · Integrate · Certify </div><h1 class="ed-tpp-hero__title" data-v-e07f6ce2> TPP Standards <span class="ed-tpp-hero__badge" data-v-e07f6ce2>${ssrInterpolate(unref(selectedVersion))}</span></h1><p class="ed-tpp-hero__sub" data-v-e07f6ce2> The Open Finance Standards in the United Arab Emirates form the technical and operational foundation for secure, interoperable, and customer-consented data sharing across the financial ecosystem. Led by the <strong data-v-e07f6ce2>Central Bank of the UAE (CBUAE)</strong>, the framework extends beyond traditional open banking to enable broader financial data access, payment initiation, and value-added services — all built on strong security, governance, and consumer protection principles. </p><p class="ed-tpp-hero__sub ed-tpp-hero__sub--tight" data-v-e07f6ce2> This documentation is for <strong data-v-e07f6ce2>Third-Party Providers (TPPs)</strong> consuming Open Finance capabilities — including account information services, payment initiation, and other regulated financial data use cases. </p><div class="ed-tpp-hero__links" data-v-e07f6ce2><a href="/tech/lfi-api-hub/" class="ed-tpp-hero__link" data-v-e07f6ce2><span class="ed-tpp-hero__link-label" data-v-e07f6ce2>LFI?</span><span class="ed-tpp-hero__link-text" data-v-e07f6ce2>See the LFI Integration Guide</span><span class="ed-tpp-hero__link-arrow" data-v-e07f6ce2>→</span></a></div></div></section><section class="ed-tpp-sections" data-v-e07f6ce2><div class="ed-tpp-sections__inner" data-v-e07f6ce2><div class="ed-tpp-sections__head" data-v-e07f6ce2><div class="ed-tpp-sections__eyebrow" data-v-e07f6ce2><span class="ed-tpp-sections__eyebrow-dash" data-v-e07f6ce2></span> Guide sections </div><h2 class="ed-tpp-sections__title" data-v-e07f6ce2>Sections</h2><p class="ed-tpp-sections__lede" data-v-e07f6ce2> Work through each area of the TPP integration. Start with <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(selectedVersion)}/getting-started/`)} class="ed-tpp-sections__lede-link" data-v-e07f6ce2> Getting Started </a> to register your sandbox client and generate a ready-to-use Postman collection, then progress through Trust Framework registration, security profile, consent, and the banking APIs. </p></div><div class="ed-tpp-grid" data-v-e07f6ce2><!--[-->`);
      ssrRenderList(unref(sections), (section) => {
        _push(`<!--[-->`);
        if (!section.subItems) {
          _push(`<a${ssrRenderAttr("href", section.url)} class="ed-tpp-card" style="${ssrRenderStyle({ "--card-color": section.color })}" data-v-e07f6ce2><span class="ed-tpp-card__top" style="${ssrRenderStyle({ background: section.color })}" data-v-e07f6ce2></span><div class="ed-tpp-card__meta" data-v-e07f6ce2><span class="ed-tpp-card__cat" style="${ssrRenderStyle({ color: section.color })}" data-v-e07f6ce2>${ssrInterpolate(section.category)}</span></div><h3 class="ed-tpp-card__title" data-v-e07f6ce2>${section.title ?? ""}</h3><p class="ed-tpp-card__desc" data-v-e07f6ce2>${section.desc ?? ""}</p>`);
          if (section.tags && section.tags.length) {
            _push(`<div class="ed-tpp-card__tags" data-v-e07f6ce2><!--[-->`);
            ssrRenderList(section.tags, (tag) => {
              _push(`<span class="ed-tpp-card__tag" style="${ssrRenderStyle({
                background: withAlpha(section.color, 0.1),
                color: section.color
              })}" data-v-e07f6ce2>${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="ed-tpp-card__foot" data-v-e07f6ce2><span class="ed-tpp-card__cta" data-v-e07f6ce2>Open section</span><span class="ed-tpp-card__arrow" style="${ssrRenderStyle({ color: section.color })}" data-v-e07f6ce2>→</span></div></a>`);
        } else {
          _push(`<div class="ed-tpp-card ed-tpp-card--split" style="${ssrRenderStyle({ "--card-color": section.color })}" data-v-e07f6ce2><span class="ed-tpp-card__top" style="${ssrRenderStyle({ background: section.color })}" data-v-e07f6ce2></span><a${ssrRenderAttr("href", section.url)} class="ed-tpp-card__head" data-v-e07f6ce2><div class="ed-tpp-card__meta" data-v-e07f6ce2><span class="ed-tpp-card__cat" style="${ssrRenderStyle({ color: section.color })}" data-v-e07f6ce2>${ssrInterpolate(section.category)}</span></div><h3 class="ed-tpp-card__title" data-v-e07f6ce2>${section.title ?? ""}</h3><p class="ed-tpp-card__desc" data-v-e07f6ce2>${section.desc ?? ""}</p></a><ul class="ed-tpp-card__subs" data-v-e07f6ce2><!--[-->`);
          ssrRenderList(section.subItems, (sub) => {
            _push(`<li data-v-e07f6ce2><a${ssrRenderAttr("href", sub.url)} class="ed-tpp-card__sub" data-v-e07f6ce2><span class="ed-tpp-card__sub-marker" style="${ssrRenderStyle({ background: section.color })}" data-v-e07f6ce2></span><span class="ed-tpp-card__sub-body" data-v-e07f6ce2><span class="ed-tpp-card__sub-label" data-v-e07f6ce2>${sub.label ?? ""}</span>`);
            if (sub.hint) {
              _push(`<span class="ed-tpp-card__sub-hint" data-v-e07f6ce2>${sub.hint ?? ""}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span><span class="ed-tpp-card__sub-arrow" style="${ssrRenderStyle({ color: section.color })}" data-v-e07f6ce2>→</span></a></li>`);
          });
          _push(`<!--]--></ul><a${ssrRenderAttr("href", section.url)} class="ed-tpp-card__foot ed-tpp-card__foot--link" data-v-e07f6ce2><span class="ed-tpp-card__cta" data-v-e07f6ce2>Open Finance overview</span><span class="ed-tpp-card__arrow" style="${ssrRenderStyle({ color: section.color })}" data-v-e07f6ce2>→</span></a></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e07f6ce2"]]);
export {
  index as default
};

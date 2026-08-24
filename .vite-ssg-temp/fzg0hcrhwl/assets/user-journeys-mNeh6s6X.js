import { _ as __unplugin_components_2 } from "./EditableJson-BkohSb0c.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { f as futureDateTime } from "./futureDates-0AiAgH8u.js";
import { W as WireframePreview, P as PolicySetup, _ as _sfc_main$1 } from "./UIBehaviour-D7v3PZVS.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "yaml";
import "./useSharedState-qc0PNim7.js";
import "./PolicyEditor-DUDwNaB2.js";
import "./ConsentAuthLayout-JnFOe0gl.js";
import "./formatDate-CaaKrjgT.js";
import "./insurancePolicyStatus-7keZa3ks.js";
import "./DirhamAmount-BJSUbugi.js";
import "./EdNote-BQLptLjy.js";
import "./EdRefTable-B_zH_eaF.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "user-journeys",
  __ssrInlineRender: true,
  setup(__props) {
    const expirationDateTime = futureDateTime(330);
    const myCustomValidator = (value) => {
      var _a, _b;
      const expiration = new Date((_a = value == null ? void 0 : value.consent) == null ? void 0 : _a.ExpirationDateTime);
      const now = /* @__PURE__ */ new Date();
      const oneYearFromNow = /* @__PURE__ */ new Date();
      oneYearFromNow.setFullYear(now.getFullYear() + 1);
      if (Number.isNaN(expiration.getTime()) || expiration <= now || expiration >= oneYearFromNow) {
        return "consent.ExpirationDateTime cannot be in the past and must be less than a year in the future.";
      }
      const groups = (_b = value == null ? void 0 : value.consent) == null ? void 0 : _b.Permissions;
      if (!Array.isArray(groups) || groups.length === 0) {
        return "consent.Permissions must contain at least one insurance type entry.";
      }
      for (const g of groups) {
        if (!(g == null ? void 0 : g.InsuranceType)) {
          return "Each Permissions entry must specify an InsuranceType.";
        }
        if (!Array.isArray(g == null ? void 0 : g.Permissions) || g.Permissions.length === 0) {
          return `Insurance type "${g.InsuranceType}" must declare at least one permission.`;
        }
      }
      return null;
    };
    const initialFormData = ref({
      type: "urn:openfinanceuae:insurance-consent:v2.2",
      consent: {
        ExpirationDateTime: expirationDateTime,
        OnBehalfOf: {
          TradingName: "Nebras",
          LegalName: "Nebras Open Finance Ltd",
          IdentifierType: "Other",
          Identifier: "Identifier"
        },
        ConsentId: "c1a42378-10ac-46a1-8d20-4e020484216d",
        BaseConsentId: "c2a42378-10ac-46a1-8d20-4e020484216d",
        Permissions: [
          {
            InsuranceType: "Motor",
            Permissions: [
              "ReadInsurancePolicies",
              "ReadCustomerBasic",
              "ReadInsuranceProduct",
              "ReadInsurancePremium",
              "ReadCustomerClaims"
            ]
          },
          {
            InsuranceType: "Health",
            Permissions: [
              "ReadInsurancePolicies",
              "ReadCustomerDetail",
              "ReadInsuranceProduct",
              "ReadInsurancePremium",
              "ReadCustomerPaymentDetails",
              "ReadCustomerClaims"
            ]
          },
          {
            InsuranceType: "Travel",
            Permissions: [
              "ReadInsurancePolicies",
              "ReadCustomerBasic"
            ]
          }
        ],
        OpenFinanceBilling: {
          Purpose: "QuoteComparison"
        }
      },
      subscription: {
        Webhook: {
          Url: "https://webhook.site/mock-event-receiver",
          IsActive: false
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EditableJson = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-a3704cd9><section class="ed-doc__hero" data-v-a3704cd9><div class="ed-doc__inner" data-v-a3704cd9><div class="ed-doc__eyebrow" data-v-a3704cd9><span class="ed-doc__eyebrow-dash" data-v-a3704cd9></span> Insurance · Data Sharing · UX </div><h1 class="ed-doc__title" data-v-a3704cd9> Insurance Data Sharing — User Experience <span class="ed-doc__read" data-v-a3704cd9>2 min read</span></h1><p class="ed-doc__lede" data-v-a3704cd9> Before a customer is redirected to Open Finance to consent to Insurance Data Sharing, you must present a <strong data-v-a3704cd9>Consent Page</strong> that clearly explains what the customer is consenting to and collects their explicit, informed consent. The page must accurately reflect each insurance type requested and the permissions selected within it. The interactive wireframe below defines the expected structure, content, and behaviour of the Consent Page and must be followed. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-a3704cd9> While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the consent content, and the representation of <strong data-v-a3704cd9>AlTareq</strong> (including logos, naming, and action buttons) must be preserved. Your Consent Page must be submitted as part of <strong data-v-a3704cd9>CX certification</strong> prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "interactive-demo",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Interactive Demo",
        title: "Edit the consent and watch the preview respond",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(WireframePreview, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Customise the <code data-v-a3704cd9${_scopeId2}>authorization_details</code> object below and watch the wireframes above update live. Each entry in <code data-v-a3704cd9${_scopeId2}>consent.Permissions</code> is an <code data-v-a3704cd9${_scopeId2}>InsuranceType</code> paired with the permissions requested for it — add, remove, or change types to see how the pages respond. `);
                } else {
                  return [
                    createTextVNode(" Customise the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" object below and watch the wireframes above update live. Each entry in "),
                    createVNode("code", null, "consent.Permissions"),
                    createTextVNode(" is an "),
                    createVNode("code", null, "InsuranceType"),
                    createTextVNode(" paired with the permissions requested for it — add, remove, or change types to see how the pages respond. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EditableJson, {
              spec: "/openapi/v2.2-rc1/standards/uae-authorization-endpoints-openapi.yaml",
              "schema-name": "AEInsuranceDataSharingRichAuthorizationRequestsV21.AEInsuranceDataSharingAuthorizationDetailsProperties",
              "initial-data": unref(initialFormData),
              "custom-validator": myCustomValidator,
              "state-field": "consent",
              label: "authorization_details",
              description: "PAR request body field",
              "endpoint-href": "/tech/tpp-standards/v2.2-rc1/consent/open-api/par",
              "endpoint-label": "View PAR endpoint"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(PolicySetup, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(WireframePreview),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Customise the "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" object below and watch the wireframes above update live. Each entry in "),
                  createVNode("code", null, "consent.Permissions"),
                  createTextVNode(" is an "),
                  createVNode("code", null, "InsuranceType"),
                  createTextVNode(" paired with the permissions requested for it — add, remove, or change types to see how the pages respond. ")
                ]),
                _: 1
              }),
              createVNode(_component_EditableJson, {
                spec: "/openapi/v2.2-rc1/standards/uae-authorization-endpoints-openapi.yaml",
                "schema-name": "AEInsuranceDataSharingRichAuthorizationRequestsV21.AEInsuranceDataSharingAuthorizationDetailsProperties",
                "initial-data": unref(initialFormData),
                "custom-validator": myCustomValidator,
                "state-field": "consent",
                label: "authorization_details",
                description: "PAR request body field",
                "endpoint-href": "/tech/tpp-standards/v2.2-rc1/consent/open-api/par",
                "endpoint-label": "View PAR endpoint"
              }, null, 8, ["initial-data"]),
              createVNode(PolicySetup)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "ui-behaviour",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Field-Driven UI",
        title: "How API request fields change what the user sees",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a3704cd9"]]);
export {
  userJourneys as default
};

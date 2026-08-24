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
      const expiration = new Date((_a = value == null ? void 0 : value.Data) == null ? void 0 : _a.ExpirationDateTime);
      const now = /* @__PURE__ */ new Date();
      const oneYearFromNow = /* @__PURE__ */ new Date();
      oneYearFromNow.setFullYear(now.getFullYear() + 1);
      if (Number.isNaN(expiration.getTime()) || expiration <= now || expiration >= oneYearFromNow) {
        return "Data.ExpirationDateTime cannot be in the past and must be less than a year in the future.";
      }
      const groups = (_b = value == null ? void 0 : value.Data) == null ? void 0 : _b.Permissions;
      if (!Array.isArray(groups) || groups.length === 0) {
        return "Data.Permissions must contain at least one insurance type entry.";
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
      Data: {
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
      Subscription: {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-01e9c5f4><section class="ed-doc__hero" data-v-01e9c5f4><div class="ed-doc__inner" data-v-01e9c5f4><div class="ed-doc__eyebrow" data-v-01e9c5f4><span class="ed-doc__eyebrow-dash" data-v-01e9c5f4></span> LFI · Insurance · Data Sharing · UX </div><h1 class="ed-doc__title" data-v-01e9c5f4> Insurance Data Sharing — User Experience <span class="ed-doc__read" data-v-01e9c5f4>2 min read</span></h1><p class="ed-doc__lede" data-v-01e9c5f4> When a customer is redirected to you to authorize an Open Finance consent for Insurance Data Sharing, you must present an <strong data-v-01e9c5f4>Authorization Page</strong> that clearly explains what they are authorizing. The page must collect the customer’s explicit and informed consent, and it must accurately reflect each insurance type and permission set requested. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-01e9c5f4> Policies must be presented grouped by status — <strong data-v-01e9c5f4>Active</strong> policies are selectable by default; policies in an end state (<code data-v-01e9c5f4>Expired</code>, <code data-v-01e9c5f4>Lapsed</code>, <code data-v-01e9c5f4>Cancelled</code>, <code data-v-01e9c5f4>Surrendered</code>, <code data-v-01e9c5f4>Converted</code>, <code data-v-01e9c5f4>DeathClaim</code>, <code data-v-01e9c5f4>RiderClaim</code>) appear in a collapsible <strong data-v-01e9c5f4>Inactive Policies</strong> group so the customer can see what is in scope but not select policies that can’t be shared. Statuses follow the <code data-v-01e9c5f4>AEInsurancePolicyStatusCodes</code> enum defined in the Insurance OpenAPI spec. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-01e9c5f4> The wireframe below is interactive: edit the consent body and the simulated policies, and watch the LFI screen filter to the insurance types the TPP requested and bucket them by status. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "interactive-demo",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Interactive Demo",
        title: "Edit the consent and policies, then watch the LFI screen respond",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(WireframePreview, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Customise the <code data-v-01e9c5f4${_scopeId2}>consentBody</code> below and watch the wireframes above update live. The LFI screen only shows policies whose <code data-v-01e9c5f4${_scopeId2}>InsuranceType</code> appears in <code data-v-01e9c5f4${_scopeId2}>Data.Permissions</code>, and groups them by status. `);
                } else {
                  return [
                    createTextVNode(" Customise the "),
                    createVNode("code", null, "consentBody"),
                    createTextVNode(" below and watch the wireframes above update live. The LFI screen only shows policies whose "),
                    createVNode("code", null, "InsuranceType"),
                    createTextVNode(" appears in "),
                    createVNode("code", null, "Data.Permissions"),
                    createTextVNode(", and groups them by status. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EditableJson, {
              spec: "/openapi/v2.2-rc1/api-hub/uae-api-hub-consent-manager-openapi.yaml",
              "schema-name": "AEInsuranceConsentBody",
              "initial-data": unref(initialFormData),
              "custom-validator": myCustomValidator,
              "state-field": "consent",
              label: "consentBody",
              description: "AEInsuranceConsentBody",
              "endpoint-href": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
              "endpoint-label": "View Consent endpoint"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(PolicySetup, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(WireframePreview),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Customise the "),
                  createVNode("code", null, "consentBody"),
                  createTextVNode(" below and watch the wireframes above update live. The LFI screen only shows policies whose "),
                  createVNode("code", null, "InsuranceType"),
                  createTextVNode(" appears in "),
                  createVNode("code", null, "Data.Permissions"),
                  createTextVNode(", and groups them by status. ")
                ]),
                _: 1
              }),
              createVNode(_component_EditableJson, {
                spec: "/openapi/v2.2-rc1/api-hub/uae-api-hub-consent-manager-openapi.yaml",
                "schema-name": "AEInsuranceConsentBody",
                "initial-data": unref(initialFormData),
                "custom-validator": myCustomValidator,
                "state-field": "consent",
                label: "consentBody",
                description: "AEInsuranceConsentBody",
                "endpoint-href": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
                "endpoint-label": "View Consent endpoint"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-01e9c5f4"]]);
export {
  userJourneys as default
};

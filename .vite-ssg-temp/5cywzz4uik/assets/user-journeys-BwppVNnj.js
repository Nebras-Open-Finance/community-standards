import { _ as __unplugin_components_2 } from "./EditableJson-BkohSb0c.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { ref, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { p as purposeCodes } from "./PaymentConsentPermissionsText-DEZshb6t.js";
import { d as domesticPaymentPiiScenarios, p as paymentConsentScenarios } from "./editor-scenarios-CAtfwFsI.js";
import { f as futureDateTime, a as futureDateOnly } from "./futureDates-0AiAgH8u.js";
import { W as WireframePreview, A as AccountSetup, U as UIBehaviour, E as ExampleJourneys } from "./ExampleJourneys-Bejlcl3D.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "yaml";
import "./useSharedState-qc0PNim7.js";
import "./ConsentOnDemand-3pWZdhZX.js";
import "./ConsentAuthLayout-JnFOe0gl.js";
import "./formatDate-CaaKrjgT.js";
import "./DirhamAmount-BJSUbugi.js";
import "./AccountEditor-CP6oAJ9S.js";
import "./ServiceInitiationPermissionText-DAXAxMmQ.js";
import "vue-router";
import "./EdRefTable-B_zH_eaF.js";
import "./EdNote-BQLptLjy.js";
import "./ImageViewer-DmHTopUf.js";
import "vite-ssg";
import "axios";
import "@unhead/vue";
const _sfc_main = {
  __name: "user-journeys",
  __ssrInlineRender: true,
  setup(__props) {
    const expirationDateTime = futureDateTime(330);
    const periodStartDate = futureDateOnly(14);
    const myCustomValidator = (value) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O;
      if (((_b = (_a = value == null ? void 0 : value.consent) == null ? void 0 : _a.ControlParameters) == null ? void 0 : _b.IsDelegatedAuthentication) === true) {
        return "value?.consent?.ControlParameters?.IsDelegatedAuthentication must be false or not set.";
      }
      if (!(value == null ? void 0 : value.consent) || !((_c = value == null ? void 0 : value.consent) == null ? void 0 : _c.ControlParameters) || !((_e = (_d = value == null ? void 0 : value.consent) == null ? void 0 : _d.ControlParameters) == null ? void 0 : _e.ConsentSchedule) || !((_h = (_g = (_f = value == null ? void 0 : value.consent) == null ? void 0 : _f.ControlParameters) == null ? void 0 : _g.ConsentSchedule) == null ? void 0 : _h.MultiPayment) || !((_l = (_k = (_j = (_i = value == null ? void 0 : value.consent) == null ? void 0 : _i.ControlParameters) == null ? void 0 : _j.ConsentSchedule) == null ? void 0 : _k.MultiPayment) == null ? void 0 : _l.PeriodicSchedule) || ((_q = (_p = (_o = (_n = (_m = value == null ? void 0 : value.consent) == null ? void 0 : _m.ControlParameters) == null ? void 0 : _n.ConsentSchedule) == null ? void 0 : _o.MultiPayment) == null ? void 0 : _p.PeriodicSchedule) == null ? void 0 : _q.Type) !== "FixedOnDemand" || ((_t = (_s = (_r = value == null ? void 0 : value.consent) == null ? void 0 : _r.ControlParameters) == null ? void 0 : _s.ConsentSchedule) == null ? void 0 : _t.SinglePayment) || ((_w = (_v = (_u = value == null ? void 0 : value.consent) == null ? void 0 : _u.ControlParameters) == null ? void 0 : _v.ConsentSchedule) == null ? void 0 : _w.FilePayment)) {
        return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.Type must be 'FixedOnDemand'";
      }
      if (!((_C = (_B = (_A = (_z = (_y = (_x = value == null ? void 0 : value.consent) == null ? void 0 : _x.ControlParameters) == null ? void 0 : _y.ConsentSchedule) == null ? void 0 : _z.MultiPayment) == null ? void 0 : _A.PeriodicSchedule) == null ? void 0 : _B.Controls) == null ? void 0 : _C.MaximumCumulativeNumberOfPaymentsPerPeriod) && !((_J = (_I = (_H = (_G = (_F = (_E = (_D = value == null ? void 0 : value.consent) == null ? void 0 : _D.ControlParameters) == null ? void 0 : _E.ConsentSchedule) == null ? void 0 : _F.MultiPayment) == null ? void 0 : _G.PeriodicSchedule) == null ? void 0 : _H.Controls) == null ? void 0 : _I.MaximumCumulativeValueOfPaymentsPerPeriod) == null ? void 0 : _J.Amount)) {
        return "ONE OF MaximumCumulativeNumberOfPaymentsPerPeriod/MaximumCumulativeValueOfPaymentsPerPeriod is required";
      }
      if ((() => {
        const expiration = new Date(value.consent.ExpirationDateTime);
        const now = /* @__PURE__ */ new Date();
        const oneYearFromNow = /* @__PURE__ */ new Date();
        oneYearFromNow.setFullYear(now.getFullYear() + 1);
        return expiration <= now || expiration >= oneYearFromNow;
      })()) {
        return "consent.ExpirationDateTime cannot be in the past and must be less than a year in the future.";
      }
      if (value.consent.PaymentPurposeCode && !purposeCodes[value.consent.PaymentPurposeCode]) {
        return `consent.PaymentPurposeCode '${value.consent.PaymentPurposeCode}' is not a valid purpose code`;
      }
      const perms = value.consent.Permissions || [];
      if (perms.includes("ReadBalances") && !perms.includes("ReadAccountsBasic") && !perms.includes("ReadAccountsDetail")) {
        return "consent.Permissions: ReadBalances requires ReadAccountsBasic or ReadAccountsDetail";
      }
      if (value.consent.AuthorizationExpirationDateTime) {
        const authExpiry = new Date(value.consent.AuthorizationExpirationDateTime);
        const now = /* @__PURE__ */ new Date();
        if (authExpiry < now) {
          return "consent.AuthorizationExpirationDateTime must not be in the past";
        }
        if (value.consent.ExpirationDateTime && authExpiry > new Date(value.consent.ExpirationDateTime)) {
          return "consent.AuthorizationExpirationDateTime must not be after consent.ExpirationDateTime";
        }
      }
      const periodStartDate2 = (_O = (_N = (_M = (_L = (_K = value == null ? void 0 : value.consent) == null ? void 0 : _K.ControlParameters) == null ? void 0 : _L.ConsentSchedule) == null ? void 0 : _M.MultiPayment) == null ? void 0 : _N.PeriodicSchedule) == null ? void 0 : _O.PeriodStartDate;
      if (periodStartDate2) {
        const startDate = new Date(periodStartDate2);
        startDate.setHours(0, 0, 0, 0);
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        if (startDate < today) {
          return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate must not be in the past";
        }
        if (value.consent.ExpirationDateTime && startDate > new Date(value.consent.ExpirationDateTime)) {
          return "consent.ControlParameters.ConsentSchedule.MultiPayment.PeriodicSchedule.PeriodStartDate must not be after consent.ExpirationDateTime";
        }
      }
      return null;
    };
    const initialFormDataSIP = ref({
      "type": "urn:openfinanceuae:service-initiation-consent:v2.1",
      "consent": {
        "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
        "IsSingleAuthorization": true,
        "ExpirationDateTime": expirationDateTime,
        "BaseConsentId": "b9f42378-10ac-46a1-8d20-4e020484216d",
        "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadRefundAccount"],
        "ControlParameters": {
          "ConsentSchedule": {
            "MultiPayment": {
              "MaximumCumulativeNumberOfPayments": 2,
              "MaximumCumulativeValueOfPayments": {
                "Amount": "500.00",
                "Currency": "AED"
              },
              "PeriodicSchedule": {
                "Type": "FixedOnDemand",
                "PeriodType": "Week",
                "PeriodStartDate": periodStartDate,
                "Amount": {
                  "Amount": "200.00",
                  "Currency": "AED"
                },
                "Controls": {
                  "MaximumCumulativeNumberOfPaymentsPerPeriod": 2,
                  "MaximumCumulativeValueOfPaymentsPerPeriod": {
                    "Amount": "200.00",
                    "Currency": "AED"
                  }
                }
              }
            }
          }
        },
        "PaymentPurposeCode": "ACM",
        "DebtorReference": "Test Purchase",
        "CreditorReference": "Test Purchase"
      },
      "subscription": {
        "Webhook": {
          "Url": "https://webhook.site/mock-event-receiver",
          "IsActive": false
        }
      }
    });
    const myPIICustomValidator = (value) => {
      if (!value.Initiation.Creditor) {
        return "value.Initiation.Creditor is required for Type 'FixedOnDemand'";
      } else if (value.Initiation.Creditor.length > 1) {
        return "Only a single Creditor is required for Type 'FixedOnDemand'";
      }
      return null;
    };
    const initialFormDataPII = ref({
      "Initiation": {
        "DebtorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": {
            "en": "Mohammed Al Rashidi"
          }
        },
        "Creditor": [
          {
            "Creditor": {
              "Name": "Ivan England"
            },
            "CreditorAccount": {
              "SchemeName": "IBAN",
              "Identification": "AE070331234567890123456",
              "Name": {
                "en": "Ivan David England"
              }
            }
          }
        ]
      }
    });
    const piiScenarios = domesticPaymentPiiScenarios(initialFormDataPII.value);
    const consentScenarios = paymentConsentScenarios(initialFormDataSIP.value, "consent");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EditableJson = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-0ae60091><section class="ed-doc__hero" data-v-0ae60091><div class="ed-doc__inner" data-v-0ae60091><div class="ed-doc__eyebrow" data-v-0ae60091><span class="ed-doc__eyebrow-dash" data-v-0ae60091></span> Banking · Service Initiation · Fixed On Demand · UX </div><h1 class="ed-doc__title" data-v-0ae60091> Fixed On Demand — User Experience <span class="ed-doc__read" data-v-0ae60091>4 min read</span></h1><p class="ed-doc__lede" data-v-0ae60091> Before a customer authorises a Fixed On Demand payment consent through Open Finance, you must present a <strong data-v-0ae60091>Consent Page</strong> that clearly explains that you are seeking permission to make multiple payments of a fixed amount at any time of your choosing. This page must accurately reflect the key details of the consent (payee, the fixed amount per payment, the first payment date, etc.) The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-0ae60091> While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of <strong data-v-0ae60091>AlTareq</strong> (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of <strong data-v-0ae60091>CX certification</strong> prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "interactive-demo",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Interactive Demo",
        title: "Edit the consent and watch the previews respond",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(WireframePreview, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Customise the request body fields below and watch the <strong data-v-0ae60091${_scopeId2}>Consent</strong> and <strong data-v-0ae60091${_scopeId2}>Authorisation</strong> page previews update live. `);
                } else {
                  return [
                    createTextVNode(" Customise the request body fields below and watch the "),
                    createVNode("strong", null, "Consent"),
                    createTextVNode(" and "),
                    createVNode("strong", null, "Authorisation"),
                    createTextVNode(" page previews update live. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EditableJson, {
              spec: "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml",
              "schema-name": "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII",
              "initial-data": unref(initialFormDataPII),
              scenarios: unref(piiScenarios),
              "state-field": "pii",
              "custom-validator": myPIICustomValidator,
              label: "domestic_payment_pii",
              description: "PAR request body (AEDomesticPaymentPII)",
              "endpoint-href": "/tech/tpp-standards/v2.1/consent/open-api/par",
              "endpoint-label": "View PAR endpoint"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EditableJson, {
              spec: "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml",
              "schema-name": "AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties",
              "excluded-fields": ["consent.PersonalIdentifiableInformation"],
              "initial-data": unref(initialFormDataSIP),
              scenarios: unref(consentScenarios),
              "custom-validator": myCustomValidator,
              label: "authorization_details",
              description: "PAR request body field",
              "endpoint-href": "/tech/tpp-standards/v2.1/consent/open-api/par",
              "endpoint-label": "View PAR endpoint"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AccountSetup, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(WireframePreview),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Customise the request body fields below and watch the "),
                  createVNode("strong", null, "Consent"),
                  createTextVNode(" and "),
                  createVNode("strong", null, "Authorisation"),
                  createTextVNode(" page previews update live. ")
                ]),
                _: 1
              }),
              createVNode(_component_EditableJson, {
                spec: "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml",
                "schema-name": "AEBankServiceInitiationRichAuthorizationRequests.AEDomesticPaymentPII",
                "initial-data": unref(initialFormDataPII),
                scenarios: unref(piiScenarios),
                "state-field": "pii",
                "custom-validator": myPIICustomValidator,
                label: "domestic_payment_pii",
                description: "PAR request body (AEDomesticPaymentPII)",
                "endpoint-href": "/tech/tpp-standards/v2.1/consent/open-api/par",
                "endpoint-label": "View PAR endpoint"
              }, null, 8, ["initial-data", "scenarios"]),
              createVNode(_component_EditableJson, {
                spec: "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml",
                "schema-name": "AEBankServiceInitiationRichAuthorizationRequestsV21.AEBankServiceInitiationAuthorizationDetailsProperties",
                "excluded-fields": ["consent.PersonalIdentifiableInformation"],
                "initial-data": unref(initialFormDataSIP),
                scenarios: unref(consentScenarios),
                "custom-validator": myCustomValidator,
                label: "authorization_details",
                description: "PAR request body field",
                "endpoint-href": "/tech/tpp-standards/v2.1/consent/open-api/par",
                "endpoint-label": "View PAR endpoint"
              }, null, 8, ["initial-data", "scenarios"]),
              createVNode(AccountSetup)
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
            _push2(ssrRenderComponent(UIBehaviour, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(UIBehaviour)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example-journeys",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Examples",
        title: "Sample user journeys",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ExampleJourneys, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ExampleJourneys)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ae60091"]]);
export {
  userJourneys as default
};

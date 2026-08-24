import { _ as __unplugin_components_2 } from "./EditableJson-BkohSb0c.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { ref, watch, mergeProps, withCtx, createTextVNode, createVNode, unref, withDirectives, isRef, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { p as purposeCodes } from "./PaymentConsentPermissionsText-DEZshb6t.js";
import { d as domesticPaymentPiiScenarios, p as paymentConsentScenarios } from "./editor-scenarios-CAtfwFsI.js";
import { f as futureDateTime } from "./futureDates-0AiAgH8u.js";
import { W as WireframePreview, A as AccountSetup, U as UIBehaviour, E as ExampleJourneys } from "./ExampleJourneys-DcHeGnda.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "yaml";
import "./ConsentSingleInstantPayment-BmbvVWg6.js";
import "./ConsentAuthLayout-JnFOe0gl.js";
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
    const { sharedState } = useSharedState();
    const simulateDuplicatePayment = ref(false);
    watch(simulateDuplicatePayment, (val) => {
      sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, duplicatePaymentAlert: val };
    }, { immediate: true });
    const simulatePaymentLimitExceeded = ref(false);
    watch(simulatePaymentLimitExceeded, (val) => {
      sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, paymentLimitExceeded: val };
    }, { immediate: true });
    const simulateAlreadyTrustedPayee = ref(false);
    watch(simulateAlreadyTrustedPayee, (val) => {
      sharedState.value.simulatedBehaviour = { ...sharedState.value.simulatedBehaviour, alreadyTrustedPayee: val };
    }, { immediate: true });
    const myCustomValidator = (value) => {
      if (!value.consent || !value.consent.ControlParameters || !value.consent.ControlParameters.ConsentSchedule || !value.consent.ControlParameters.ConsentSchedule.SinglePayment || value.consent.ControlParameters.ConsentSchedule.SinglePayment.Type !== "SingleInstantPayment" || value.consent.ControlParameters.ConsentSchedule.MultiPayment || value.consent.ControlParameters.ConsentSchedule.FilePayment) {
        return "consent.ControlParameters.ConsentSchedule.SinglePayment.Type must be 'SingleInstantPayment'";
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
            "SinglePayment": {
              "Type": "SingleInstantPayment",
              "Amount": {
                "Amount": "100.00",
                "Currency": "AED"
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
        return "value.Initiation.Creditor is required for Type 'SingleInstantPayment'";
      } else if (value.Initiation.Creditor.length > 1) {
        return "Only a single Creditor is required for Type 'SingleInstantPayment'";
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
      },
      "Risk": {
        "CreditorIndicators": {
          "MerchantDetails": {
            "MerchantName": "Al Noor General"
          }
        }
      }
    });
    const piiScenarios = domesticPaymentPiiScenarios(initialFormDataPII.value);
    const consentScenarios = paymentConsentScenarios(initialFormDataSIP.value, "consent");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EditableJson = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-63e754d2><section class="ed-doc__hero" data-v-63e754d2><div class="ed-doc__inner" data-v-63e754d2><div class="ed-doc__eyebrow" data-v-63e754d2><span class="ed-doc__eyebrow-dash" data-v-63e754d2></span> Banking · Service Initiation · Single Instant Payment · UX </div><h1 class="ed-doc__title" data-v-63e754d2> Single Instant Payment — User Experience <span class="ed-doc__read" data-v-63e754d2>4 min read</span></h1><p class="ed-doc__lede" data-v-63e754d2> Before a customer authorises a payment through Open Finance, you must present a <strong data-v-63e754d2>Consent Page</strong> that clearly explains the payment they are consenting to. This page must accurately reflect the payee, amount, schedule, and all material terms of the payment consent. The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-63e754d2> While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the payment information shown, and the representation of <strong data-v-63e754d2>AlTareq</strong> (including logos, naming, and action buttons) must be preserved. The customer must always be able to clearly understand what payment they are consenting to and that it is part of the AlTareq ecosystem. Your Consent Page must be submitted as part of <strong data-v-63e754d2>CX certification</strong> prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. </p></div></section>`);
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
                  _push3(` Customise the request body fields below and watch the <strong data-v-63e754d2${_scopeId2}>Consent</strong> and <strong data-v-63e754d2${_scopeId2}>Authorisation</strong> page previews update live. `);
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
            _push2(`<div class="sim-card" data-v-63e754d2${_scopeId}><div class="sim-card__head" data-v-63e754d2${_scopeId}>Simulated Accounts Behaviour</div><div class="sim-card__body" data-v-63e754d2${_scopeId}><label class="sim-card__row" data-v-63e754d2${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(simulateDuplicatePayment)) ? ssrLooseContain(unref(simulateDuplicatePayment), null) : unref(simulateDuplicatePayment)) ? " checked" : ""} data-v-63e754d2${_scopeId}><span data-v-63e754d2${_scopeId}>Duplicate Payment Alert</span></label><label class="sim-card__row" data-v-63e754d2${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(simulatePaymentLimitExceeded)) ? ssrLooseContain(unref(simulatePaymentLimitExceeded), null) : unref(simulatePaymentLimitExceeded)) ? " checked" : ""} data-v-63e754d2${_scopeId}><span data-v-63e754d2${_scopeId}>Payment Limit Exceeded</span></label><label class="sim-card__row" data-v-63e754d2${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(simulateAlreadyTrustedPayee)) ? ssrLooseContain(unref(simulateAlreadyTrustedPayee), null) : unref(simulateAlreadyTrustedPayee)) ? " checked" : ""} data-v-63e754d2${_scopeId}><span data-v-63e754d2${_scopeId}>Already a Trusted Payee</span></label></div></div>`);
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
              createVNode("div", { class: "sim-card" }, [
                createVNode("div", { class: "sim-card__head" }, "Simulated Accounts Behaviour"),
                createVNode("div", { class: "sim-card__body" }, [
                  createVNode("label", { class: "sim-card__row" }, [
                    withDirectives(createVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => isRef(simulateDuplicatePayment) ? simulateDuplicatePayment.value = $event : null
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(simulateDuplicatePayment)]
                    ]),
                    createVNode("span", null, "Duplicate Payment Alert")
                  ]),
                  createVNode("label", { class: "sim-card__row" }, [
                    withDirectives(createVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => isRef(simulatePaymentLimitExceeded) ? simulatePaymentLimitExceeded.value = $event : null
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(simulatePaymentLimitExceeded)]
                    ]),
                    createVNode("span", null, "Payment Limit Exceeded")
                  ]),
                  createVNode("label", { class: "sim-card__row" }, [
                    withDirectives(createVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => isRef(simulateAlreadyTrustedPayee) ? simulateAlreadyTrustedPayee.value = $event : null
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(simulateAlreadyTrustedPayee)]
                    ]),
                    createVNode("span", null, "Already a Trusted Payee")
                  ])
                ])
              ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-63e754d2"]]);
export {
  userJourneys as default
};

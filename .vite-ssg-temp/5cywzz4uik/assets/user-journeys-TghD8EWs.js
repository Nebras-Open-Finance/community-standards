import { _ as __unplugin_components_2 } from "./EditableJson-BkohSb0c.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { ref, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { f as futureDateTime } from "./futureDates-0AiAgH8u.js";
import { b as bankDataSharingScenarios } from "./editor-scenarios-CAtfwFsI.js";
import { W as WireframePreview, A as AccountSetup, U as UIBehaviour, E as ExampleJourneys } from "./ExampleJourneys-CGIJE_3q.js";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "yaml";
import "./useSharedState-qc0PNim7.js";
import "./ConsentBankDataSharing-Dh6olf2f.js";
import "./ConsentAuthLayout-JnFOe0gl.js";
import "./formatDate-CaaKrjgT.js";
import "./DirhamAmount-BJSUbugi.js";
import "./permissionDescriptions-WkI-8pYN.js";
import "./AccountEditor-CP6oAJ9S.js";
import "./EdNote-BQLptLjy.js";
import "./EdRefTable-B_zH_eaF.js";
import "./PermissionsReference-CYEmgELB.js";
import "./ImageViewer-DmHTopUf.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {
  __name: "user-journeys",
  __ssrInlineRender: true,
  setup(__props) {
    const expirationDateTime = futureDateTime(330);
    const myCustomValidator = (value) => {
      if ((() => {
        const expiration = new Date(value.consent.ExpirationDateTime);
        const now = /* @__PURE__ */ new Date();
        const oneYearFromNow = /* @__PURE__ */ new Date();
        oneYearFromNow.setFullYear(now.getFullYear() + 1);
        return expiration <= now || expiration >= oneYearFromNow;
      })()) {
        return "consent.ExpirationDateTime cannot be in the past and must be less than a year in the future.";
      } else if ((() => {
        var _a;
        const perms = ((_a = value.consent) == null ? void 0 : _a.Permissions) || [];
        const dependentPermissions = [
          "ReadBalances",
          "ReadBeneficiariesBasic",
          "ReadBeneficiariesDetail",
          "ReadTransactionsBasic",
          "ReadTransactionsDetail",
          "ReadProduct",
          "ReadScheduledPaymentsBasic",
          "ReadScheduledPaymentsDetail",
          "ReadDirectDebits",
          "ReadStandingOrdersBasic",
          "ReadStandingOrdersDetail",
          "ReadStatements",
          "ReadProductFinanceRates"
        ];
        const hasDependentPermission = dependentPermissions.some((p) => perms.includes(p));
        const hasAccountPermission = perms.includes("ReadAccountsBasic") || perms.includes("ReadAccountsDetail");
        return hasDependentPermission && !hasAccountPermission;
      })()) {
        return "ReadAccountsBasic or ReadAccountsDetail must be provided when permissions that require an accountId are included.";
      }
      return null;
    };
    const initialFormData = ref({
      type: "urn:openfinanceuae:account-access-consent:v2.2",
      consent: {
        ExpirationDateTime: expirationDateTime,
        OnBehalfOf: {
          TradingName: "Nebras",
          LegalName: "Nebras Open Finance Ltd",
          IdentifierType: "Other",
          Identifier: "Identifier"
        },
        ConsentId: "b8f42378-10ac-46a1-8d20-4e020484216d",
        BaseConsentId: "b9f42378-10ac-46a1-8d20-4e020484216d",
        AccountType: ["Retail"],
        AccountSubType: ["CurrentAccount", "Savings"],
        Permissions: [
          "ReadAccountsBasic",
          "ReadAccountsDetail",
          "ReadBalances",
          "ReadBeneficiariesBasic",
          "ReadBeneficiariesDetail",
          // 'ReadFXTransactionsBasic',
          // 'ReadFXTransactionsDetail',
          // 'ReadFXRemittanceCharges',
          "ReadTransactionsBasic",
          "ReadTransactionsDetail",
          "ReadProduct",
          "ReadScheduledPaymentsBasic",
          "ReadScheduledPaymentsDetail",
          "ReadDirectDebits",
          "ReadStandingOrdersBasic",
          "ReadStandingOrdersDetail",
          "ReadStatements",
          "ReadPartyUser",
          "ReadPartyUserIdentity",
          "ReadParty",
          "ReadProductFinanceRates"
        ],
        FromDate: "2025-03-01",
        ToDate: "2025-03-31",
        OpenFinanceBilling: {
          UserType: "Retail",
          Purpose: "AccountAggregation"
        }
      },
      subscription: {
        Webhook: {
          Url: "https://webhook.site/mock-event-receiver",
          IsActive: false
        }
      }
    });
    const scenarios = bankDataSharingScenarios(initialFormData.value, "consent");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EditableJson = __unplugin_components_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-bc568ade><section class="ed-doc__hero" data-v-bc568ade><div class="ed-doc__inner" data-v-bc568ade><div class="ed-doc__eyebrow" data-v-bc568ade><span class="ed-doc__eyebrow-dash" data-v-bc568ade></span> Banking · Data Sharing · UX </div><h1 class="ed-doc__title" data-v-bc568ade> Bank Data Sharing — User Experience <span class="ed-doc__read" data-v-bc568ade>2 min read</span></h1><p class="ed-doc__lede" data-v-bc568ade> Before a customer is redirected to Open Finance to consent to Data Sharing, you must present a <strong data-v-bc568ade>Consent Page</strong> that clearly explains what the customer is consenting to and collects their explicit, informed consent. This page must accurately reflect the scope, purpose, and nature of the data being shared. The examples and interactive wireframes below define the expected structure, content, and behaviour of the Consent Page and must be followed. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-bc568ade> While you may adapt visual elements such as colour palette, fonts, and styling, you must not alter the meaning, clarity, or completeness of the consent content, and the representation of <strong data-v-bc568ade>AlTareq</strong> (including logos, naming, and action buttons) must be preserved. Your Consent Page must be submitted as part of <strong data-v-bc568ade>CX certification</strong> prior to production, and any material changes to a production Consent Page must be re-submitted for review and approval. </p></div></section>`);
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
                  _push3(` Customise the <code data-v-bc568ade${_scopeId2}>authorization_details</code> object below and watch the wireframes above update live. Try changing permissions, account types, date ranges, or the TPP name to see how the pages respond, or pick one of the scenarios beside the editor to load a preset consent. `);
                } else {
                  return [
                    createTextVNode(" Customise the "),
                    createVNode("code", null, "authorization_details"),
                    createTextVNode(" object below and watch the wireframes above update live. Try changing permissions, account types, date ranges, or the TPP name to see how the pages respond, or pick one of the scenarios beside the editor to load a preset consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EditableJson, {
              spec: "/openapi/v2.2-rc1/standards/uae-authorization-endpoints-openapi.yaml",
              "schema-name": "AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties",
              "initial-data": unref(initialFormData),
              "custom-validator": myCustomValidator,
              scenarios: unref(scenarios),
              "state-field": "consent",
              label: "authorization_details",
              description: "PAR request body field",
              "endpoint-href": "/tech/tpp-standards/v2.2-rc1/consent/open-api/par",
              "endpoint-label": "View PAR endpoint"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AccountSetup, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(WireframePreview),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Customise the "),
                  createVNode("code", null, "authorization_details"),
                  createTextVNode(" object below and watch the wireframes above update live. Try changing permissions, account types, date ranges, or the TPP name to see how the pages respond, or pick one of the scenarios beside the editor to load a preset consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EditableJson, {
                spec: "/openapi/v2.2-rc1/standards/uae-authorization-endpoints-openapi.yaml",
                "schema-name": "AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties",
                "initial-data": unref(initialFormData),
                "custom-validator": myCustomValidator,
                scenarios: unref(scenarios),
                "state-field": "consent",
                label: "authorization_details",
                description: "PAR request body field",
                "endpoint-href": "/tech/tpp-standards/v2.2-rc1/consent/open-api/par",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/data-sharing/user-journeys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const userJourneys = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bc568ade"]]);
export {
  userJourneys as default
};

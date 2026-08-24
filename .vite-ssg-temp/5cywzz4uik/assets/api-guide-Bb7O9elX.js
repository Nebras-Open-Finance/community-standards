import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const revokeBody = `{
  "revokedBy": "LFI.InitiatedByUser"
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "api-guide",
  __ssrInlineRender: true,
  setup(__props) {
    const queryParams = [
      { name: "consentType", required: false, description: "Filter by consent type" },
      { name: "status", required: false, description: "Filter by consent status" },
      { name: "page", required: false, description: "Page number for paginated results" },
      { name: "pageSize", required: false, description: "Number of records per page" }
    ];
    const altOps = [
      {
        method: "GET",
        path: "/consents/{consentId}",
        href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId",
        useWhen: "You need a single consent by its ID"
      },
      {
        method: "GET",
        path: "/accounts/{accountId}/consents",
        href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/accounts-accountId-consents",
        useWhen: "You need all consents linked to a specific account"
      },
      {
        method: "GET",
        path: "/consents",
        href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents",
        useWhen: "You need to search consents by criteria other than user"
      }
    ];
    const dataSharingRows = [
      {
        num: 1,
        field: "TPP name",
        operation: "GET /psu/{userId}/consents",
        jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
        guidelines: "If a trading name is supplied in the consent, display it. Otherwise fall back to the TPP name from the Trust Framework."
      },
      {
        num: 2,
        field: "Last data shared",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].consentUsage.lastDataShared",
        guidelines: ""
      },
      {
        num: 3,
        field: "Connection expires",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].request.consent.ExpirationDateTime",
        guidelines: ""
      },
      {
        num: 4,
        field: "Status",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].status",
        guidelines: 'Map to user-friendly label per <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#status-labels">Status labels</a>.'
      },
      {
        num: 5,
        field: "Consent ID",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].id",
        guidelines: "Display truncated with copy button."
      },
      {
        num: 6,
        field: "IBAN",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].accountIds",
        guidelines: "The surrogate account identifiers patched onto the consent are returned. The LFI must replace these with the real IBAN &mdash; PII is not stored in the API Hub."
      },
      {
        num: 7,
        field: "Data permissions",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].request.consent.Permissions",
        guidelines: "Permissions must be displayed using the standardised data cluster language provided in the Customer Data standards. Map each permission code to its correct language label."
      },
      {
        num: 8,
        field: "First Connected",
        operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /consent-groups/{consentGroupId}/consents',
        jsonPath: "$.data[*].consentBody.Data.CreationDateTime",
        guidelines: "If the consent has a <code>BaseConsentId</code>, this must be the <code>CreationDateTime</code> of the <strong>first</strong> consent in the consent group. The <code>BaseConsentId</code> value is used as the <code>consentGroupId</code> parameter. If <code>BaseConsentId</code> is not set, use the consent's own <code>CreationDateTime</code>."
      },
      {
        num: 9,
        field: "Last Updated",
        operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /consent-groups/{consentGroupId}/consents',
        jsonPath: '$.data[*].consentBody.Data.CreationDateTime <span class="ed-or">or</span> $.data[*].updatedAt',
        guidelines: "If the consent has a <code>BaseConsentId</code>, this must be the <code>CreationDateTime</code> of the <strong>latest</strong> consent in the consent group. If <code>BaseConsentId</code> is not set, use the consent's <code>updatedAt</code> value."
      }
    ];
    const sipRows = [
      {
        num: 1,
        field: "TPP name",
        operation: "GET /psu/{userId}/consents",
        jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
        guidelines: "Same trading name / TPP name fallback as Data Sharing."
      },
      {
        num: 2,
        field: "Total paid",
        operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
        jsonPath: '$.data[*].consentBody.Data.PaymentConsumption.CumulativeValueOfPayments <span class="ed-or">or</span> $.data[*].requestBody.Data.Instruction.Amount.Amount',
        guidelines: "For single instant payments the amount matches the payment value."
      },
      {
        num: 3,
        field: "Permission Cancelled / Expired / Consumed",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].updatedAt",
        guidelines: "Terminal states &mdash; the last update date reflects when the consent entered that state."
      },
      {
        num: 4,
        field: "Last payment made",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].consentUsage.lastServiceInitiationAttempt",
        guidelines: ""
      },
      {
        num: 5,
        field: "Payment to",
        operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
        jsonPath: '$.data[*].request.consent.PersonalIdentifiableInformation <span class="ed-or">or</span> $.data[*].requestBody.Data.PersonalIdentifiableInformation',
        guidelines: "Use the value of <code>Creditor.Name</code> from either the consent or the payment initiation request, depending on the payment type."
      },
      {
        num: 6,
        field: "IBAN",
        operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
        jsonPath: "Same as above",
        guidelines: "Use the value of <code>CreditorAccount.Identification</code> from either the consent or the payment initiation request."
      },
      {
        num: 7,
        field: "Reference",
        operation: "GET /payment-log",
        jsonPath: "$.data[*].requestBody.Data.CreditorReference",
        guidelines: ""
      },
      {
        num: 8,
        field: "Payment Purpose",
        operation: "GET /payment-log",
        jsonPath: "$.data[*].requestBody.Data.PaymentPurposeCode",
        guidelines: "The payment request provides the Aani purpose code, which must be transposed to the correct purpose code description based on Aani reference information."
      },
      {
        num: 9,
        field: "From account",
        operation: "GET /psu/{userId}/consents",
        jsonPath: '$.data[*].accountIds <span class="ed-or">or</span> $.data[*].request.consent.PersonalIdentifiableInformation',
        guidelines: "The surrogate account identifiers patched onto the consent must be replaced with the real IBAN. Alternatively, if the TPP provided the debtor IBAN on the consent, use <code>DebtorAccount.Identification</code>."
      },
      {
        num: 10,
        field: "Payment Rules",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].request.consent.ControlParameters",
        guidelines: 'The displayed properties depend on the values found in control parameters, which differ by payment type. Refer to the <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents">API spec</a> for available properties.'
      },
      {
        num: 11,
        field: "You started this permission",
        operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /consent-groups/{consentGroupId}/consents',
        jsonPath: "$.data[*].consentBody.Data.CreationDateTime",
        guidelines: `Same consent-group logic as Data Sharing "First Connected" &mdash; use the first consent's <code>CreationDateTime</code> when <code>BaseConsentId</code> is set.`
      },
      {
        num: 12,
        field: "You cancelled this permission",
        operation: "GET /psu/{userId}/consents",
        jsonPath: "$.data[*].updatedAt",
        guidelines: ""
      }
    ];
    const multiPaymentRows = [
      {
        num: 2,
        field: "Total paid to date",
        operation: 'GET /psu/{userId}/consents <span class="ed-or">or</span> GET /payment-log',
        jsonPath: "$.data[*].consentBody.Data.PaymentConsumption.CumulativeValueOfPayments",
        guidelines: "For long-lived consents the <code>CumulativeValueOfPayments</code> property is maintained to provide the cumulative value of all payments."
      }
    ];
    const historyDataSharingRows = [
      {
        num: 1,
        field: "TPP name",
        jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
        guidelines: "Same trading name / TPP name fallback."
      },
      { num: 2, field: "Consent ID", jsonPath: "$.data[*].id", guidelines: "" },
      {
        num: 3,
        field: "IBAN (Data Sharing)",
        jsonPath: "$.data[*].accountIds",
        guidelines: "Replace surrogate IDs with real IBANs."
      },
      {
        num: 4,
        field: "Policy number (Insurance)",
        jsonPath: "$.data[*].supplementaryInformation.{{policyNumber}}",
        guidelines: "Same <code>supplementaryInformation</code> or <code>insurancePolicyIds</code> approach."
      },
      {
        num: 5,
        field: "Policy expires (Insurance)",
        jsonPath: "$.data[*].supplementaryInformation.{{policyExpires}}",
        guidelines: "Same approach."
      },
      {
        num: 6,
        field: "Data permissions",
        jsonPath: "$.data[*].request.consent.Permissions",
        guidelines: "Map permission codes to standardised language."
      },
      {
        num: 7,
        field: "Connection date (shown as label)",
        jsonPath: "$.data[*].consentBody.Data.CreationDateTime",
        guidelines: ""
      }
    ];
    const historyServiceInitRows = [
      {
        num: 1,
        field: "Payment to",
        jsonPath: '$.data[*].request.consent.PersonalIdentifiableInformation <span class="ed-or">or</span> payment-log $.data[*].requestBody.Data.PersonalIdentifiableInformation',
        guidelines: "Use <code>Creditor.Name</code> from the consent group member or the payment initiation request."
      },
      {
        num: 2,
        field: "IBAN",
        jsonPath: "Same as above",
        guidelines: "Use <code>CreditorAccount.Identification</code>."
      },
      {
        num: 3,
        field: "Reference",
        jsonPath: "$.data[*].request.consent.DebtorReference",
        guidelines: ""
      },
      {
        num: 4,
        field: "Payment Purpose",
        jsonPath: "$.data[*].request.consent.PaymentPurposeCode",
        guidelines: "Transpose to purpose code description."
      },
      {
        num: 5,
        field: "From account",
        jsonPath: '$.data[*].accountIds <span class="ed-or">or</span> $.data[*].request.consent.PersonalIdentifiableInformation',
        guidelines: "Replace surrogate IDs with real IBANs, or use <code>DebtorAccount.Identification</code> if provided by the TPP."
      },
      {
        num: 6,
        field: "Payment Rules",
        jsonPath: "$.data[*].request.consent.ControlParameters",
        guidelines: "Properties vary by payment type."
      },
      {
        num: 7,
        field: "Connection date (shown as label)",
        jsonPath: "$.data[*].consentBody.Data.CreationDateTime",
        guidelines: ""
      }
    ];
    const paymentHistoryRows = [
      {
        num: 1,
        field: "TPP name",
        jsonPath: '$..TradingName <span class="ed-or">or</span> $.data[*].tpp.tppName',
        guidelines: "Same trading name / TPP name fallback."
      },
      {
        num: 2,
        field: "Total paid to date",
        jsonPath: "$.data[*].requestBody.Data.Instruction.Amount.Amount",
        guidelines: "Sum the amounts of all successful payments returned by this operation."
      },
      {
        num: 3,
        field: "Payment date/time",
        jsonPath: "$.data[*].paymentResponse.creationDateTime",
        guidelines: "Display as date and time, e.g. <code>15/02/2025 14:22</code>."
      },
      {
        num: 4,
        field: "Status",
        jsonPath: "$.data[*].paymentResponse.status",
        guidelines: "Map API status to display label: <code>AcceptedSettlementCompleted</code>, <code>AcceptedCreditSettlementCompleted</code>, <code>AcceptedWithoutPosting</code> &rarr; <strong>Successful</strong>; <code>Rejected</code> &rarr; <strong>Failed</strong>; <code>Pending</code> &rarr; <strong>Pending</strong>."
      },
      {
        num: 5,
        field: "Amount",
        jsonPath: "$.data[*].requestBody.Data.Instruction.Amount.Amount",
        guidelines: "Display with currency symbol."
      },
      {
        num: 6,
        field: "Purpose",
        jsonPath: "$.data[*].requestBody.Data.PaymentPurposeCode",
        guidelines: "The payment request provides the Aani purpose code. Transpose to the purpose code description, e.g. <code>ACM</code> &rarr; <code>Agency Commission (ACM)</code>."
      },
      {
        num: 7,
        field: "Reference",
        jsonPath: "$.data[*].requestBody.Data.CreditorReference",
        guidelines: ""
      }
    ];
    const statusRows = [
      { api: "Authorized", cmi: "Active" },
      { api: "AwaitingAuthorization", cmi: "Pending" },
      { api: "Revoked", cmi: "Cancelled" },
      { api: "Suspended", cmi: "Suspended" },
      { api: "Consumed", cmi: "Consumed (or Successful/Failed for payments)" },
      { api: "Expired", cmi: "Expired" },
      { api: "Rejected", cmi: "Rejected" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-9eb6139b><section class="ed-doc__hero" data-v-9eb6139b><div class="ed-doc__inner" data-v-9eb6139b><div class="ed-doc__eyebrow" data-v-9eb6139b><span class="ed-doc__eyebrow-dash" data-v-9eb6139b></span> LFI · Consent Management Interface · API Guide </div><h1 class="ed-doc__title" data-v-9eb6139b> Consent Management Interface — API Guide <span class="ed-doc__read" data-v-9eb6139b>6 min read</span></h1><p class="ed-doc__lede" data-v-9eb6139b> This guide explains how to use the API Hub&#39;s Consent Manager API to retrieve and manage the data needed to populate each page of the LFI Consent Management Interface (CMI). See the per-product Requirements pages (<a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements" data-v-9eb6139b>Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements" data-v-9eb6139b>Bank Service Initiation</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements" data-v-9eb6139b>Insurance Data Sharing</a>) for what each page must display, and the matching User Experience pages for interactive wireframes. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "prerequisites",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Before you begin",
        title: "Prerequisites",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Before making Consent Manager API calls the LFI must:`);
                } else {
                  return [
                    createTextVNode("Before making Consent Manager API calls the LFI must:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="ed-doc__steps" data-v-9eb6139b${_scopeId}><li data-v-9eb6139b${_scopeId}> Have a working mTLS connection to the API Hub — verify with <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/hello-mtls" class="endpoint" data-v-9eb6139b${_scopeId}><span class="http-method http-method--get" data-v-9eb6139b${_scopeId}>GET</span><code data-v-9eb6139b${_scopeId}>/hello-mtls</code></a></li><li data-v-9eb6139b${_scopeId}> Patch the end user identifier onto each consent using <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId" class="endpoint" data-v-9eb6139b${_scopeId}><span class="http-method http-method--patch" data-v-9eb6139b${_scopeId}>PATCH</span><code data-v-9eb6139b${_scopeId}>/consents/{consentId}</code></a> so that consents can be retrieved by user </li></ol>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Before making Consent Manager API calls the LFI must:")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "ed-doc__steps" }, [
                createVNode("li", null, [
                  createTextVNode(" Have a working mTLS connection to the API Hub — verify with "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/hello-mtls",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--get" }, "GET"),
                    createVNode("code", null, "/hello-mtls")
                  ])
                ]),
                createVNode("li", null, [
                  createTextVNode(" Patch the end user identifier onto each consent using "),
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--patch" }, "PATCH"),
                    createVNode("code", null, "/consents/{consentId}")
                  ]),
                  createTextVNode(" so that consents can be retrieved by user ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "retrieving-user-consents",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Primary lookup",
        title: "Retrieving user consents",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`To retrieve all consents associated with a customer use:`);
                } else {
                  return [
                    createTextVNode("To retrieve all consents associated with a customer use:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__endpoint" data-v-9eb6139b${_scopeId}><span class="http-badge http-get" data-v-9eb6139b${_scopeId}>GET</span><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents" class="ed-doc__endpoint-path" data-v-9eb6139b${_scopeId}><code data-v-9eb6139b${_scopeId}>/psu/{userId}/consents</code></a></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` where <code data-v-9eb6139b${_scopeId2}>userId</code> is the LFI&#39;s unique identifier for the customer. `);
                } else {
                  return [
                    createTextVNode(" where "),
                    createVNode("code", null, "userId"),
                    createTextVNode(" is the LFI's unique identifier for the customer. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The response returns a paginated array of consent objects. Each consent object contains the fields needed to populate the dashboard cards and detail pages described in the per-product Requirements pages (<a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements" data-v-9eb6139b${_scopeId2}>Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements" data-v-9eb6139b${_scopeId2}>Bank Service Initiation</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements" data-v-9eb6139b${_scopeId2}>Insurance Data Sharing</a>). `);
                } else {
                  return [
                    createTextVNode(" The response returns a paginated array of consent objects. Each consent object contains the fields needed to populate the dashboard cards and detail pages described in the per-product Requirements pages ("),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements" }, "Bank Data Sharing"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements" }, "Bank Service Initiation"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements" }, "Insurance Data Sharing"),
                    createTextVNode("). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>Query parameters</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>Parameter</th><th data-v-9eb6139b${_scopeId2}>Required</th><th data-v-9eb6139b${_scopeId2}>Description</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(queryParams, (q) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}><code data-v-9eb6139b${_scopeId2}>${ssrInterpolate(q.name)}</code></td><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(q.required ? "Yes" : "No")}</td><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(q.description)}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Parameter"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(queryParams, (q) => {
                          return createVNode("tr", {
                            key: q.name
                          }, [
                            createVNode("td", null, [
                              createVNode("code", null, toDisplayString(q.name), 1)
                            ]),
                            createVNode("td", null, toDisplayString(q.required ? "Yes" : "No"), 1),
                            createVNode("td", null, toDisplayString(q.description), 1)
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>Alternative retrieval operations</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>Operation</th><th data-v-9eb6139b${_scopeId2}>Use when</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(altOps, (op) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}><span class="${ssrRenderClass([`http-${op.method.toLowerCase()}`, "http-badge"])}" data-v-9eb6139b${_scopeId2}>${ssrInterpolate(op.method)}</span><a${ssrRenderAttr("href", op.href)} data-v-9eb6139b${_scopeId2}><code data-v-9eb6139b${_scopeId2}>${ssrInterpolate(op.path)}</code></a></td><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(op.useWhen)}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Operation"),
                          createVNode("th", null, "Use when")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(altOps, (op) => {
                          return createVNode("tr", {
                            key: op.path
                          }, [
                            createVNode("td", null, [
                              createVNode("span", {
                                class: ["http-badge", `http-${op.method.toLowerCase()}`]
                              }, toDisplayString(op.method), 3),
                              createVNode("a", {
                                href: op.href
                              }, [
                                createVNode("code", null, toDisplayString(op.path), 1)
                              ], 8, ["href"])
                            ]),
                            createVNode("td", null, toDisplayString(op.useWhen), 1)
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("To retrieve all consents associated with a customer use:")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents",
                  class: "ed-doc__endpoint-path"
                }, [
                  createVNode("code", null, "/psu/{userId}/consents")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" where "),
                  createVNode("code", null, "userId"),
                  createTextVNode(" is the LFI's unique identifier for the customer. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The response returns a paginated array of consent objects. Each consent object contains the fields needed to populate the dashboard cards and detail pages described in the per-product Requirements pages ("),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements" }, "Bank Data Sharing"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements" }, "Bank Service Initiation"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements" }, "Insurance Data Sharing"),
                  createTextVNode("). ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Query parameters"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Parameter"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(queryParams, (q) => {
                        return createVNode("tr", {
                          key: q.name
                        }, [
                          createVNode("td", null, [
                            createVNode("code", null, toDisplayString(q.name), 1)
                          ]),
                          createVNode("td", null, toDisplayString(q.required ? "Yes" : "No"), 1),
                          createVNode("td", null, toDisplayString(q.description), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Alternative retrieval operations"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Operation"),
                        createVNode("th", null, "Use when")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(altOps, (op) => {
                        return createVNode("tr", {
                          key: op.path
                        }, [
                          createVNode("td", null, [
                            createVNode("span", {
                              class: ["http-badge", `http-${op.method.toLowerCase()}`]
                            }, toDisplayString(op.method), 3),
                            createVNode("a", {
                              href: op.href
                            }, [
                              createVNode("code", null, toDisplayString(op.path), 1)
                            ], 8, ["href"])
                          ]),
                          createVNode("td", null, toDisplayString(op.useWhen), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "dashboard-mapping",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Field-by-field",
        title: "Dashboard — mapping API fields to CMI",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The sections below map each CMI field from the per-product Requirements (<a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#dashboard-card-content" data-v-9eb6139b${_scopeId2}>Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#dashboard-card-content" data-v-9eb6139b${_scopeId2}>Bank Service Initiation</a>, <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements#dashboard-card-content" data-v-9eb6139b${_scopeId2}>Insurance Data Sharing</a>) to the API response property and any transformation the LFI must apply. `);
                } else {
                  return [
                    createTextVNode(" The sections below map each CMI field from the per-product Requirements ("),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#dashboard-card-content" }, "Bank Data Sharing"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#dashboard-card-content" }, "Bank Service Initiation"),
                    createTextVNode(", "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements#dashboard-card-content" }, "Insurance Data Sharing"),
                    createTextVNode(") to the API response property and any transformation the LFI must apply. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>Data Sharing</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>#</th><th data-v-9eb6139b${_scopeId2}>CMI field</th><th data-v-9eb6139b${_scopeId2}>Operation</th><th data-v-9eb6139b${_scopeId2}>JSONPath</th><th data-v-9eb6139b${_scopeId2}>Guidelines</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(dataSharingRows, (r) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.num)}</td><td data-v-9eb6139b${_scopeId2}><strong data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.field)}</strong></td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.operation}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.jsonPath}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${r.guidelines ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "#"),
                          createVNode("th", null, "CMI field"),
                          createVNode("th", null, "Operation"),
                          createVNode("th", null, "JSONPath"),
                          createVNode("th", null, "Guidelines")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(dataSharingRows, (r) => {
                          return createVNode("tr", {
                            key: r.num
                          }, [
                            createVNode("td", null, toDisplayString(r.num), 1),
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(r.field), 1)
                            ]),
                            createVNode("td", {
                              innerHTML: `<code>${r.operation}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: `<code>${r.jsonPath}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: r.guidelines
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>Single Instant Payment</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>#</th><th data-v-9eb6139b${_scopeId2}>CMI field</th><th data-v-9eb6139b${_scopeId2}>Operation</th><th data-v-9eb6139b${_scopeId2}>JSONPath</th><th data-v-9eb6139b${_scopeId2}>Guidelines</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(sipRows, (r) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.num)}</td><td data-v-9eb6139b${_scopeId2}><strong data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.field)}</strong></td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.operation}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.jsonPath}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${r.guidelines ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "#"),
                          createVNode("th", null, "CMI field"),
                          createVNode("th", null, "Operation"),
                          createVNode("th", null, "JSONPath"),
                          createVNode("th", null, "Guidelines")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(sipRows, (r) => {
                          return createVNode("tr", {
                            key: r.num
                          }, [
                            createVNode("td", null, toDisplayString(r.num), 1),
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(r.field), 1)
                            ]),
                            createVNode("td", {
                              innerHTML: `<code>${r.operation}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: `<code>${r.jsonPath}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: r.guidelines
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>Multi Payment (all subtypes)</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Multi Payment consents follow the same field mappings as Single Instant Payment, with these additions: `);
                } else {
                  return [
                    createTextVNode(" Multi Payment consents follow the same field mappings as Single Instant Payment, with these additions: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>#</th><th data-v-9eb6139b${_scopeId2}>CMI field</th><th data-v-9eb6139b${_scopeId2}>Operation</th><th data-v-9eb6139b${_scopeId2}>JSONPath</th><th data-v-9eb6139b${_scopeId2}>Guidelines</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(multiPaymentRows, (r) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.num)}</td><td data-v-9eb6139b${_scopeId2}><strong data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.field)}</strong></td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.operation}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.jsonPath}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${r.guidelines ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "#"),
                          createVNode("th", null, "CMI field"),
                          createVNode("th", null, "Operation"),
                          createVNode("th", null, "JSONPath"),
                          createVNode("th", null, "Guidelines")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(multiPaymentRows, (r) => {
                          return createVNode("tr", {
                            key: r.num
                          }, [
                            createVNode("td", null, toDisplayString(r.num), 1),
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(r.field), 1)
                            ]),
                            createVNode("td", {
                              innerHTML: `<code>${r.operation}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: `<code>${r.jsonPath}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: r.guidelines
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The sections below map each CMI field from the per-product Requirements ("),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#dashboard-card-content" }, "Bank Data Sharing"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#dashboard-card-content" }, "Bank Service Initiation"),
                  createTextVNode(", "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements#dashboard-card-content" }, "Insurance Data Sharing"),
                  createTextVNode(") to the API response property and any transformation the LFI must apply. ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Data Sharing"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "CMI field"),
                        createVNode("th", null, "Operation"),
                        createVNode("th", null, "JSONPath"),
                        createVNode("th", null, "Guidelines")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(dataSharingRows, (r) => {
                        return createVNode("tr", {
                          key: r.num
                        }, [
                          createVNode("td", null, toDisplayString(r.num), 1),
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(r.field), 1)
                          ]),
                          createVNode("td", {
                            innerHTML: `<code>${r.operation}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: `<code>${r.jsonPath}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: r.guidelines
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Single Instant Payment"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "CMI field"),
                        createVNode("th", null, "Operation"),
                        createVNode("th", null, "JSONPath"),
                        createVNode("th", null, "Guidelines")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(sipRows, (r) => {
                        return createVNode("tr", {
                          key: r.num
                        }, [
                          createVNode("td", null, toDisplayString(r.num), 1),
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(r.field), 1)
                          ]),
                          createVNode("td", {
                            innerHTML: `<code>${r.operation}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: `<code>${r.jsonPath}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: r.guidelines
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Multi Payment (all subtypes)"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Multi Payment consents follow the same field mappings as Single Instant Payment, with these additions: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "CMI field"),
                        createVNode("th", null, "Operation"),
                        createVNode("th", null, "JSONPath"),
                        createVNode("th", null, "Guidelines")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(multiPaymentRows, (r) => {
                        return createVNode("tr", {
                          key: r.num
                        }, [
                          createVNode("td", null, toDisplayString(r.num), 1),
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(r.field), 1)
                          ]),
                          createVNode("td", {
                            innerHTML: `<code>${r.operation}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: `<code>${r.jsonPath}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: r.guidelines
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "connection-history",
        num: "04",
        color: "var(--at-teal)",
        eyebrow: "List of updates",
        title: "Connection history",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To provide the <strong data-v-9eb6139b${_scopeId2}>List of Updates</strong> view described in the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#detail-page" data-v-9eb6139b${_scopeId2}>Bank Data Sharing Requirements</a>, use: `);
                } else {
                  return [
                    createTextVNode(" To provide the "),
                    createVNode("strong", null, "List of Updates"),
                    createTextVNode(" view described in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#detail-page" }, "Bank Data Sharing Requirements"),
                    createTextVNode(", use: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__endpoint" data-v-9eb6139b${_scopeId}><span class="http-badge http-get" data-v-9eb6139b${_scopeId}>GET</span><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents" class="ed-doc__endpoint-path" data-v-9eb6139b${_scopeId}><code data-v-9eb6139b${_scopeId}>/consent-groups/{consentGroupId}/consents</code></a></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` where <code data-v-9eb6139b${_scopeId2}>consentGroupId</code> is the value of <code data-v-9eb6139b${_scopeId2}>BaseConsentId</code> on the current consent. `);
                } else {
                  return [
                    createTextVNode(" where "),
                    createVNode("code", null, "consentGroupId"),
                    createTextVNode(" is the value of "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" on the current consent. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This returns all consents in a consent group — consents that are linked by the same <code data-v-9eb6139b${_scopeId2}>BaseConsentId</code>. `);
                } else {
                  return [
                    createTextVNode(" This returns all consents in a consent group — consents that are linked by the same "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>How <code data-v-9eb6139b${_scopeId}>BaseConsentId</code> works</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Connection history is driven by “revisions” to consents orchestrated by TPPs: an existing consent is replaced by a new consent with updated permissions or data-access terms. The TPP links the new consent to the original by setting <code data-v-9eb6139b${_scopeId2}>BaseConsentId</code> on the new consent to the <code data-v-9eb6139b${_scopeId2}>ConsentId</code> of the original consent. All subsequent consents sharing the same history use the same <code data-v-9eb6139b${_scopeId2}>BaseConsentId</code> value. `);
                } else {
                  return [
                    createTextVNode(" Connection history is driven by “revisions” to consents orchestrated by TPPs: an existing consent is replaced by a new consent with updated permissions or data-access terms. The TPP links the new consent to the original by setting "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" on the new consent to the "),
                    createVNode("code", null, "ConsentId"),
                    createTextVNode(" of the original consent. All subsequent consents sharing the same history use the same "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" value. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "End user isolation risk"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9eb6139b${_scopeId2}> When a consent is created it contains no customer information — the end user identity is only added later when the LFI patches in the end user ID. This means two consents sharing the same <code data-v-9eb6139b${_scopeId2}>BaseConsentId</code> are <strong data-v-9eb6139b${_scopeId2}>not</strong> guaranteed to belong to the same customer. LFIs must ensure that only consents belonging to the same end user are returned when resolving related consents. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" When a consent is created it contains no customer information — the end user identity is only added later when the LFI patches in the end user ID. This means two consents sharing the same "),
                      createVNode("code", null, "BaseConsentId"),
                      createTextVNode(" are "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" guaranteed to belong to the same customer. LFIs must ensure that only consents belonging to the same end user are returned when resolving related consents. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "info" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9eb6139b${_scopeId2}> The <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit" class="endpoint" data-v-9eb6139b${_scopeId2}><span class="http-method http-method--get" data-v-9eb6139b${_scopeId2}>GET</span><code data-v-9eb6139b${_scopeId2}>/consents/{consentId}/audit</code></a> operation is <strong data-v-9eb6139b${_scopeId2}>not</strong> the correct way to retrieve connection history. It relates to changes within a single consent, not changes across multiple consents linked by <code data-v-9eb6139b${_scopeId2}>BaseConsentId</code>. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The "),
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/consents/{consentId}/audit")
                      ]),
                      createTextVNode(" operation is "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" the correct way to retrieve connection history. It relates to changes within a single consent, not changes across multiple consents linked by "),
                      createVNode("code", null, "BaseConsentId"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>Connection history — Data Sharing &amp; Insurance</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>#</th><th data-v-9eb6139b${_scopeId2}>CMI field</th><th data-v-9eb6139b${_scopeId2}>JSONPath</th><th data-v-9eb6139b${_scopeId2}>Guidelines</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(historyDataSharingRows, (r) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.num)}</td><td data-v-9eb6139b${_scopeId2}><strong data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.field)}</strong></td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.jsonPath}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${r.guidelines ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "#"),
                          createVNode("th", null, "CMI field"),
                          createVNode("th", null, "JSONPath"),
                          createVNode("th", null, "Guidelines")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(historyDataSharingRows, (r) => {
                          return createVNode("tr", {
                            key: r.num
                          }, [
                            createVNode("td", null, toDisplayString(r.num), 1),
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(r.field), 1)
                            ]),
                            createVNode("td", {
                              innerHTML: `<code>${r.jsonPath}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: r.guidelines
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 class="ed-doc__sub" data-v-9eb6139b${_scopeId}>Connection history — Service Initiation</h3>`);
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>#</th><th data-v-9eb6139b${_scopeId2}>CMI field</th><th data-v-9eb6139b${_scopeId2}>JSONPath</th><th data-v-9eb6139b${_scopeId2}>Guidelines</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(historyServiceInitRows, (r) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.num)}</td><td data-v-9eb6139b${_scopeId2}><strong data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.field)}</strong></td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.jsonPath}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${r.guidelines ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "#"),
                          createVNode("th", null, "CMI field"),
                          createVNode("th", null, "JSONPath"),
                          createVNode("th", null, "Guidelines")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(historyServiceInitRows, (r) => {
                          return createVNode("tr", {
                            key: r.num
                          }, [
                            createVNode("td", null, toDisplayString(r.num), 1),
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(r.field), 1)
                            ]),
                            createVNode("td", {
                              innerHTML: `<code>${r.jsonPath}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: r.guidelines
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To provide the "),
                  createVNode("strong", null, "List of Updates"),
                  createTextVNode(" view described in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements#detail-page" }, "Bank Data Sharing Requirements"),
                  createTextVNode(", use: ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
                  class: "ed-doc__endpoint-path"
                }, [
                  createVNode("code", null, "/consent-groups/{consentGroupId}/consents")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" where "),
                  createVNode("code", null, "consentGroupId"),
                  createTextVNode(" is the value of "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(" on the current consent. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This returns all consents in a consent group — consents that are linked by the same "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, [
                createTextVNode("How "),
                createVNode("code", null, "BaseConsentId"),
                createTextVNode(" works")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Connection history is driven by “revisions” to consents orchestrated by TPPs: an existing consent is replaced by a new consent with updated permissions or data-access terms. The TPP links the new consent to the original by setting "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(" on the new consent to the "),
                  createVNode("code", null, "ConsentId"),
                  createTextVNode(" of the original consent. All subsequent consents sharing the same history use the same "),
                  createVNode("code", null, "BaseConsentId"),
                  createTextVNode(" value. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "End user isolation risk"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" When a consent is created it contains no customer information — the end user identity is only added later when the LFI patches in the end user ID. This means two consents sharing the same "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(" are "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" guaranteed to belong to the same customer. LFIs must ensure that only consents belonging to the same end user are returned when resolving related consents. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "info" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The "),
                    createVNode("a", {
                      href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit",
                      class: "endpoint"
                    }, [
                      createVNode("span", { class: "http-method http-method--get" }, "GET"),
                      createVNode("code", null, "/consents/{consentId}/audit")
                    ]),
                    createTextVNode(" operation is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" the correct way to retrieve connection history. It relates to changes within a single consent, not changes across multiple consents linked by "),
                    createVNode("code", null, "BaseConsentId"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Connection history — Data Sharing & Insurance"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "CMI field"),
                        createVNode("th", null, "JSONPath"),
                        createVNode("th", null, "Guidelines")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(historyDataSharingRows, (r) => {
                        return createVNode("tr", {
                          key: r.num
                        }, [
                          createVNode("td", null, toDisplayString(r.num), 1),
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(r.field), 1)
                          ]),
                          createVNode("td", {
                            innerHTML: `<code>${r.jsonPath}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: r.guidelines
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", { class: "ed-doc__sub" }, "Connection history — Service Initiation"),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "CMI field"),
                        createVNode("th", null, "JSONPath"),
                        createVNode("th", null, "Guidelines")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(historyServiceInitRows, (r) => {
                        return createVNode("tr", {
                          key: r.num
                        }, [
                          createVNode("td", null, toDisplayString(r.num), 1),
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(r.field), 1)
                          ]),
                          createVNode("td", {
                            innerHTML: `<code>${r.jsonPath}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: r.guidelines
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "payment-history",
        num: "05",
        color: "var(--at-gold)",
        eyebrow: "Payment log",
        title: "Payment history",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To provide the <strong data-v-9eb6139b${_scopeId2}>Payment History</strong> tab described in the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#detail-page" data-v-9eb6139b${_scopeId2}>Bank Service Initiation Requirements</a>, use: `);
                } else {
                  return [
                    createTextVNode(" To provide the "),
                    createVNode("strong", null, "Payment History"),
                    createTextVNode(" tab described in the "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#detail-page" }, "Bank Service Initiation Requirements"),
                    createTextVNode(", use: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__endpoint" data-v-9eb6139b${_scopeId}><span class="http-badge http-get" data-v-9eb6139b${_scopeId}>GET</span><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log" class="ed-doc__endpoint-path" data-v-9eb6139b${_scopeId}><code data-v-9eb6139b${_scopeId}>/payment-log?consentId={consentId}</code></a></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This returns a summary of the payments made under a given consent. Each payment log entry contains the fields needed to populate a single row in the Payment History tab. `);
                } else {
                  return [
                    createTextVNode(" This returns a summary of the payments made under a given consent. Each payment log entry contains the fields needed to populate a single row in the Payment History tab. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "important" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9eb6139b${_scopeId2}> From <strong data-v-9eb6139b${_scopeId2}>v2.2</strong> this response is <strong data-v-9eb6139b${_scopeId2}>paginated</strong>, using the same <code data-v-9eb6139b${_scopeId2}>page</code> and <code data-v-9eb6139b${_scopeId2}>pageSize</code> parameters as the consent queries above. In v2.1 it returned every payment under the consent in one response. </p><p data-v-9eb6139b${_scopeId2}> Read <code data-v-9eb6139b${_scopeId2}>meta.totalPages</code> to know when to stop; do not treat a short page as the last one. A Payment History tab that renders only the first response will silently show one page of payments on any consent that has more. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" From "),
                      createVNode("strong", null, "v2.2"),
                      createTextVNode(" this response is "),
                      createVNode("strong", null, "paginated"),
                      createTextVNode(", using the same "),
                      createVNode("code", null, "page"),
                      createTextVNode(" and "),
                      createVNode("code", null, "pageSize"),
                      createTextVNode(" parameters as the consent queries above. In v2.1 it returned every payment under the consent in one response. ")
                    ]),
                    createVNode("p", null, [
                      createTextVNode(" Read "),
                      createVNode("code", null, "meta.totalPages"),
                      createTextVNode(" to know when to stop; do not treat a short page as the last one. A Payment History tab that renders only the first response will silently show one page of payments on any consent that has more. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>#</th><th data-v-9eb6139b${_scopeId2}>CMI field</th><th data-v-9eb6139b${_scopeId2}>JSONPath</th><th data-v-9eb6139b${_scopeId2}>Guidelines</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(paymentHistoryRows, (r) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.num)}</td><td data-v-9eb6139b${_scopeId2}><strong data-v-9eb6139b${_scopeId2}>${ssrInterpolate(r.field)}</strong></td><td data-v-9eb6139b${_scopeId2}>${`<code>${r.jsonPath}</code>` ?? ""}</td><td data-v-9eb6139b${_scopeId2}>${r.guidelines ?? ""}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "#"),
                          createVNode("th", null, "CMI field"),
                          createVNode("th", null, "JSONPath"),
                          createVNode("th", null, "Guidelines")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(paymentHistoryRows, (r) => {
                          return createVNode("tr", {
                            key: r.num
                          }, [
                            createVNode("td", null, toDisplayString(r.num), 1),
                            createVNode("td", null, [
                              createVNode("strong", null, toDisplayString(r.field), 1)
                            ]),
                            createVNode("td", {
                              innerHTML: `<code>${r.jsonPath}</code>`
                            }, null, 8, ["innerHTML"]),
                            createVNode("td", {
                              innerHTML: r.guidelines
                            }, null, 8, ["innerHTML"])
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To provide the "),
                  createVNode("strong", null, "Payment History"),
                  createTextVNode(" tab described in the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#detail-page" }, "Bank Service Initiation Requirements"),
                  createTextVNode(", use: ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log",
                  class: "ed-doc__endpoint-path"
                }, [
                  createVNode("code", null, "/payment-log?consentId={consentId}")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This returns a summary of the payments made under a given consent. Each payment log entry contains the fields needed to populate a single row in the Payment History tab. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "important" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" From "),
                    createVNode("strong", null, "v2.2"),
                    createTextVNode(" this response is "),
                    createVNode("strong", null, "paginated"),
                    createTextVNode(", using the same "),
                    createVNode("code", null, "page"),
                    createTextVNode(" and "),
                    createVNode("code", null, "pageSize"),
                    createTextVNode(" parameters as the consent queries above. In v2.1 it returned every payment under the consent in one response. ")
                  ]),
                  createVNode("p", null, [
                    createTextVNode(" Read "),
                    createVNode("code", null, "meta.totalPages"),
                    createTextVNode(" to know when to stop; do not treat a short page as the last one. A Payment History tab that renders only the first response will silently show one page of payments on any consent that has more. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "CMI field"),
                        createVNode("th", null, "JSONPath"),
                        createVNode("th", null, "Guidelines")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(paymentHistoryRows, (r) => {
                        return createVNode("tr", {
                          key: r.num
                        }, [
                          createVNode("td", null, toDisplayString(r.num), 1),
                          createVNode("td", null, [
                            createVNode("strong", null, toDisplayString(r.field), 1)
                          ]),
                          createVNode("td", {
                            innerHTML: `<code>${r.jsonPath}</code>`
                          }, null, 8, ["innerHTML"]),
                          createVNode("td", {
                            innerHTML: r.guidelines
                          }, null, 8, ["innerHTML"])
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "revoking",
        num: "06",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Action revoke",
        title: "Revoking a consent",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When the customer confirms a revocation action on the CMI, the LFI must immediately revoke the consent via: `);
                } else {
                  return [
                    createTextVNode(" When the customer confirms a revocation action on the CMI, the LFI must immediately revoke the consent via: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__endpoint" data-v-9eb6139b${_scopeId}><span class="http-badge http-post" data-v-9eb6139b${_scopeId}>POST</span><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-action-revoke" class="ed-doc__endpoint-path" data-v-9eb6139b${_scopeId}><code data-v-9eb6139b${_scopeId}>/consents/{consentId}/action/revoke</code></a></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This also revokes any associated tokens. The request body must include <code data-v-9eb6139b${_scopeId2}>revokedBy</code> set to <code data-v-9eb6139b${_scopeId2}>LFI.InitiatedByUser</code>. `);
                } else {
                  return [
                    createTextVNode(" This also revokes any associated tokens. The request body must include "),
                    createVNode("code", null, "revokedBy"),
                    createTextVNode(" set to "),
                    createVNode("code", null, "LFI.InitiatedByUser"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: revokeBody,
              lang: "json"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`To revoke all consents in a consent group at once, use:`);
                } else {
                  return [
                    createTextVNode("To revoke all consents in a consent group at once, use:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__endpoint" data-v-9eb6139b${_scopeId}><span class="http-badge http-post" data-v-9eb6139b${_scopeId}>POST</span><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke" class="ed-doc__endpoint-path" data-v-9eb6139b${_scopeId}><code data-v-9eb6139b${_scopeId}>/consent-groups/{consentGroupId}/consents/action/revoke</code></a></div>`);
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When the customer confirms a revocation action on the CMI, the LFI must immediately revoke the consent via: ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-action-revoke",
                  class: "ed-doc__endpoint-path"
                }, [
                  createVNode("code", null, "/consents/{consentId}/action/revoke")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This also revokes any associated tokens. The request body must include "),
                  createVNode("code", null, "revokedBy"),
                  createTextVNode(" set to "),
                  createVNode("code", null, "LFI.InitiatedByUser"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: revokeBody,
                lang: "json"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("To revoke all consents in a consent group at once, use:")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-post" }, "POST"),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke",
                  class: "ed-doc__endpoint-path"
                }, [
                  createVNode("code", null, "/consent-groups/{consentGroupId}/consents/action/revoke")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "audit",
        num: "07",
        color: "var(--at-teal)",
        eyebrow: "Change history",
        title: "Audit trail",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`To inspect the change history of a single consent use:`);
                } else {
                  return [
                    createTextVNode("To inspect the change history of a single consent use:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-doc__endpoint" data-v-9eb6139b${_scopeId}><span class="http-badge http-get" data-v-9eb6139b${_scopeId}>GET</span><a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit" class="ed-doc__endpoint-path" data-v-9eb6139b${_scopeId}><code data-v-9eb6139b${_scopeId}>/consents/{consentId}/audit</code></a></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This returns a chronological list of all operations performed on the consent, including the caller details and patch content. This is useful for debugging and compliance but is <strong data-v-9eb6139b${_scopeId2}>not</strong> the same as <a href="#connection-history" data-v-9eb6139b${_scopeId2}>connection history</a>. `);
                } else {
                  return [
                    createTextVNode(" This returns a chronological list of all operations performed on the consent, including the caller details and patch content. This is useful for debugging and compliance but is "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" the same as "),
                    createVNode("a", { href: "#connection-history" }, "connection history"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("To inspect the change history of a single consent use:")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-doc__endpoint" }, [
                createVNode("span", { class: "http-badge http-get" }, "GET"),
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit",
                  class: "ed-doc__endpoint-path"
                }, [
                  createVNode("code", null, "/consents/{consentId}/audit")
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This returns a chronological list of all operations performed on the consent, including the caller details and patch content. This is useful for debugging and compliance but is "),
                  createVNode("strong", null, "not"),
                  createTextVNode(" the same as "),
                  createVNode("a", { href: "#connection-history" }, "connection history"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "status-mapping",
        num: "08",
        color: "var(--at-gold)",
        eyebrow: "Translate API to UI",
        title: "Status code mapping",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The Consent Manager API returns status codes that must be mapped to user-friendly labels. See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#status-labels" data-v-9eb6139b${_scopeId2}>Status labels (Bank Service Initiation)</a> for the full mapping table. `);
                } else {
                  return [
                    createTextVNode(" The Consent Manager API returns status codes that must be mapped to user-friendly labels. See "),
                    createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#status-labels" }, "Status labels (Bank Service Initiation)"),
                    createTextVNode(" for the full mapping table. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9eb6139b${_scopeId2}><thead data-v-9eb6139b${_scopeId2}><tr data-v-9eb6139b${_scopeId2}><th data-v-9eb6139b${_scopeId2}>API status</th><th data-v-9eb6139b${_scopeId2}>CMI label</th></tr></thead><tbody data-v-9eb6139b${_scopeId2}><!--[-->`);
                  ssrRenderList(statusRows, (s) => {
                    _push3(`<tr data-v-9eb6139b${_scopeId2}><td data-v-9eb6139b${_scopeId2}><code data-v-9eb6139b${_scopeId2}>${ssrInterpolate(s.api)}</code></td><td data-v-9eb6139b${_scopeId2}>${ssrInterpolate(s.cmi)}</td></tr>`);
                  });
                  _push3(`<!--]--></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "API status"),
                          createVNode("th", null, "CMI label")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(), createBlock(Fragment, null, renderList(statusRows, (s) => {
                          return createVNode("tr", {
                            key: s.api
                          }, [
                            createVNode("td", null, [
                              createVNode("code", null, toDisplayString(s.api), 1)
                            ]),
                            createVNode("td", null, toDisplayString(s.cmi), 1)
                          ]);
                        }), 64))
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If a status code does not appear in this list, it should be normalised by splitting on word boundaries and maintaining case. If the status requires truncation for display, return the whole of the leftmost word. `);
                } else {
                  return [
                    createTextVNode(" If a status code does not appear in this list, it should be normalised by splitting on word boundaries and maintaining case. If the status requires truncation for display, return the whole of the leftmost word. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The Consent Manager API returns status codes that must be mapped to user-friendly labels. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements#status-labels" }, "Status labels (Bank Service Initiation)"),
                  createTextVNode(" for the full mapping table. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "API status"),
                        createVNode("th", null, "CMI label")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(), createBlock(Fragment, null, renderList(statusRows, (s) => {
                        return createVNode("tr", {
                          key: s.api
                        }, [
                          createVNode("td", null, [
                            createVNode("code", null, toDisplayString(s.api), 1)
                          ]),
                          createVNode("td", null, toDisplayString(s.cmi), 1)
                        ]);
                      }), 64))
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If a status code does not appear in this list, it should be normalised by splitting on word boundaries and maintaining case. If the status requires truncation for display, return the whole of the leftmost word. ")
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/api-guide.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const apiGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9eb6139b"]]);
export {
  apiGuide as default
};

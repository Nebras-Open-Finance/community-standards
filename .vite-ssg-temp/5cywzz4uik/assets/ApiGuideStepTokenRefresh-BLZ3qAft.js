import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, createVNode, unref, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { u as useRouteVersion, _ as _export_sfc } from "../main.mjs";
import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepPaymentResponse",
  __ssrInlineRender: true,
  setup(__props) {
    const { docsVersion, protocolVersion } = useRouteVersion();
    const examplePayload = computed(() => `{
  "message": {
    "Data": {
      "PaymentId": "83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
      "ConsentId": "b8f42378-10ac-46a1-8d20-4e020484216d",
      "Status": "Pending",
      "StatusUpdateDateTime": "2026-05-03T15:46:01+00:00",
      "CreationDateTime": "2026-05-03T15:46:01+00:00",
      "Instruction": {
        "Amount": {
          "Amount": "100.00",
          "Currency": "AED"
        }
      },
      "PaymentPurposeCode": "ACM",
      "DebtorReference": "Invoice 1234",
      "OpenFinanceBilling": {
        "Type": "PushP2P"
      }
    },
    "Links": {
      "Self": "https://api.lfi.example/open-finance/payment/${protocolVersion.value}/payments/83b47199-90c2-4c05-9ef1-aeae68b0fc7c",
      "Related": "https://api.lfi.example/open-finance/${protocolVersion.value}/payment-consents/b8f42378-10ac-46a1-8d20-4e020484216d"
    }
  }
}
`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))} data-v-da70cd8f>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` A <code data-v-da70cd8f${_scopeId}>201 Created</code> response is returned as a signed JWT (<code data-v-da70cd8f${_scopeId}>application/jwt</code>). Verify the signature using the LFI&#39;s public signing key before reading the payload. `);
          } else {
            return [
              createTextVNode(" A "),
              createVNode("code", null, "201 Created"),
              createTextVNode(" response is returned as a signed JWT ("),
              createVNode("code", null, "application/jwt"),
              createTextVNode("). Verify the signature using the LFI's public signing key before reading the payload. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h4 class="ag-step__subhead ag-step__subhead--small" data-v-da70cd8f>Response headers</h4>`);
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-da70cd8f${_scopeId}><thead data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><th data-v-da70cd8f${_scopeId}>Header</th><th data-v-da70cd8f${_scopeId}>Description</th></tr></thead><tbody data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>Location</code></td><td data-v-da70cd8f${_scopeId}>URL of the created payment resource — <code data-v-da70cd8f${_scopeId}>/open-finance/payment/${ssrInterpolate(unref(protocolVersion))}/payments/{PaymentId}</code></td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>x-fapi-interaction-id</code></td><td data-v-da70cd8f${_scopeId}>Echo of the interaction ID from the request</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>x-idempotency-key</code></td><td data-v-da70cd8f${_scopeId}>Echo of the idempotency key from the request</td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Header"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Location")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("URL of the created payment resource — "),
                      createVNode("code", null, "/open-finance/payment/" + toDisplayString(unref(protocolVersion)) + "/payments/{PaymentId}", 1)
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "x-fapi-interaction-id")
                    ]),
                    createVNode("td", null, "Echo of the interaction ID from the request")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "x-idempotency-key")
                    ]),
                    createVNode("td", null, "Echo of the idempotency key from the request")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h4 class="ag-step__subhead ag-step__subhead--small" data-v-da70cd8f>Response body — <code data-v-da70cd8f>Data</code></h4>`);
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-da70cd8f${_scopeId}><thead data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><th data-v-da70cd8f${_scopeId}>Field</th><th data-v-da70cd8f${_scopeId}>Required</th><th data-v-da70cd8f${_scopeId}>Description</th></tr></thead><tbody data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>PaymentId</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>LFI-assigned unique identifier for this payment resource (use this to poll for status)</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>ConsentId</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>The consent this payment is bound to</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>Status</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>Current payment status — see status lifecycle below</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>StatusUpdateDateTime</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>ISO 8601 datetime of the last status change</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>CreationDateTime</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>ISO 8601 datetime when the payment resource was created</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>Instruction.Amount</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>Echoes back the amount and currency from the request</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>PaymentPurposeCode</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>Echoes back the payment purpose code</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>OpenFinanceBilling</code></td><td data-v-da70cd8f${_scopeId}>Yes</td><td data-v-da70cd8f${_scopeId}>Echoes back the billing parameters</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>PaymentTransactionId</code></td><td data-v-da70cd8f${_scopeId}>No</td><td data-v-da70cd8f${_scopeId}>End-to-end transaction ID generated by the Aani payment rails once the payment is submitted for settlement. Not present at <code data-v-da70cd8f${_scopeId}>Pending</code>.</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>DebtorReference</code></td><td data-v-da70cd8f${_scopeId}>No</td><td data-v-da70cd8f${_scopeId}>Echoes back the debtor reference if provided</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>RejectReasonCode</code></td><td data-v-da70cd8f${_scopeId}>No</td><td data-v-da70cd8f${_scopeId}>Array of <code data-v-da70cd8f${_scopeId}>{ Code, Message }</code> objects — present only when <code data-v-da70cd8f${_scopeId}>Status</code> is <code data-v-da70cd8f${_scopeId}>Rejected</code></td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Field"),
                    createVNode("th", null, "Required"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "PaymentId")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "LFI-assigned unique identifier for this payment resource (use this to poll for status)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "ConsentId")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "The consent this payment is bound to")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Status")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "Current payment status — see status lifecycle below")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "StatusUpdateDateTime")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "ISO 8601 datetime of the last status change")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "CreationDateTime")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "ISO 8601 datetime when the payment resource was created")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Instruction.Amount")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "Echoes back the amount and currency from the request")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "PaymentPurposeCode")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "Echoes back the payment purpose code")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "OpenFinanceBilling")
                    ]),
                    createVNode("td", null, "Yes"),
                    createVNode("td", null, "Echoes back the billing parameters")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "PaymentTransactionId")
                    ]),
                    createVNode("td", null, "No"),
                    createVNode("td", null, [
                      createTextVNode("End-to-end transaction ID generated by the Aani payment rails once the payment is submitted for settlement. Not present at "),
                      createVNode("code", null, "Pending"),
                      createTextVNode(".")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "DebtorReference")
                    ]),
                    createVNode("td", null, "No"),
                    createVNode("td", null, "Echoes back the debtor reference if provided")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "RejectReasonCode")
                    ]),
                    createVNode("td", null, "No"),
                    createVNode("td", null, [
                      createTextVNode("Array of "),
                      createVNode("code", null, "{ Code, Message }"),
                      createTextVNode(" objects — present only when "),
                      createVNode("code", null, "Status"),
                      createTextVNode(" is "),
                      createVNode("code", null, "Rejected")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h4 class="ag-step__subhead ag-step__subhead--small" data-v-da70cd8f>Status lifecycle</h4>`);
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-da70cd8f${_scopeId}><thead data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><th data-v-da70cd8f${_scopeId}>Status</th><th data-v-da70cd8f${_scopeId}>Description</th></tr></thead><tbody data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>Pending</code></td><td data-v-da70cd8f${_scopeId}>The payment has been accepted by the LFI and queued for processing. This is the typical status immediately after creation.</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>AcceptedSettlementCompleted</code></td><td data-v-da70cd8f${_scopeId}>The debtor&#39;s account has been debited.</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>AcceptedWithoutPosting</code></td><td data-v-da70cd8f${_scopeId}>The receiving LFI has accepted the payment but has not yet credited the creditor account.</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>AcceptedCreditSettlementCompleted</code></td><td data-v-da70cd8f${_scopeId}>The creditor account has been credited. Payment is fully settled.</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>Rejected</code></td><td data-v-da70cd8f${_scopeId}>The payment was rejected. Inspect <code data-v-da70cd8f${_scopeId}>RejectReasonCode</code> for the reason.</td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Status"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Pending")
                    ]),
                    createVNode("td", null, "The payment has been accepted by the LFI and queued for processing. This is the typical status immediately after creation.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AcceptedSettlementCompleted")
                    ]),
                    createVNode("td", null, "The debtor's account has been debited.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AcceptedWithoutPosting")
                    ]),
                    createVNode("td", null, "The receiving LFI has accepted the payment but has not yet credited the creditor account.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "AcceptedCreditSettlementCompleted")
                    ]),
                    createVNode("td", null, "The creditor account has been credited. Payment is fully settled.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Rejected")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The payment was rejected. Inspect "),
                      createVNode("code", null, "RejectReasonCode"),
                      createTextVNode(" for the reason.")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h4 class="ag-step__subhead ag-step__subhead--small" data-v-da70cd8f><code data-v-da70cd8f>Links</code></h4>`);
      _push(ssrRenderComponent(_component_EdRefTable, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<table data-v-da70cd8f${_scopeId}><thead data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><th data-v-da70cd8f${_scopeId}>Field</th><th data-v-da70cd8f${_scopeId}>Description</th></tr></thead><tbody data-v-da70cd8f${_scopeId}><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>Self</code></td><td data-v-da70cd8f${_scopeId}>URL to this payment resource — use for status polling</td></tr><tr data-v-da70cd8f${_scopeId}><td data-v-da70cd8f${_scopeId}><code data-v-da70cd8f${_scopeId}>Related</code></td><td data-v-da70cd8f${_scopeId}>URL to the associated consent — <code data-v-da70cd8f${_scopeId}>/open-finance/${ssrInterpolate(unref(protocolVersion))}/payment-consents/{ConsentId}</code></td></tr></tbody></table>`);
          } else {
            return [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Field"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Self")
                    ]),
                    createVNode("td", null, "URL to this payment resource — use for status polling")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "Related")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("URL to the associated consent — "),
                      createVNode("code", null, "/open-finance/" + toDisplayString(unref(protocolVersion)) + "/payment-consents/{ConsentId}", 1)
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h4 class="ag-step__subhead ag-step__subhead--small" data-v-da70cd8f>Example response payload</h4>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` The payload is the verified body of the signed JWT. Per <code data-v-da70cd8f${_scopeId}>AEPaymentIdResponseSigned</code>, <code data-v-da70cd8f${_scopeId}>Data</code> and <code data-v-da70cd8f${_scopeId}>Links</code> are wrapped in a <code data-v-da70cd8f${_scopeId}>message</code> envelope. `);
          } else {
            return [
              createTextVNode(" The payload is the verified body of the signed JWT. Per "),
              createVNode("code", null, "AEPaymentIdResponseSigned"),
              createTextVNode(", "),
              createVNode("code", null, "Data"),
              createTextVNode(" and "),
              createVNode("code", null, "Links"),
              createTextVNode(" are wrapped in a "),
              createVNode("code", null, "message"),
              createTextVNode(" envelope. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdCode, {
        code: unref(examplePayload),
        lang: "json",
        filename: "201 Created — decoded JWT body"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdNote, {
        type: "tip",
        title: "Store the PaymentId"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-da70cd8f${_scopeId}> Persist <code data-v-da70cd8f${_scopeId}>PaymentId</code> immediately — it is required to poll <code data-v-da70cd8f${_scopeId}>GET /payments/{PaymentId}</code> for status updates. A payment typically moves from <code data-v-da70cd8f${_scopeId}>Pending</code> to a terminal status within seconds, but network conditions may require polling. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createTextVNode(" Persist "),
                createVNode("code", null, "PaymentId"),
                createTextVNode(" immediately — it is required to poll "),
                createVNode("code", null, "GET /payments/{PaymentId}"),
                createTextVNode(" for status updates. A payment typically moves from "),
                createVNode("code", null, "Pending"),
                createTextVNode(" to a terminal status within seconds, but network conditions may require polling. ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` See the <a${ssrRenderAttr("href", `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/open-api/payments`)} data-v-da70cd8f${_scopeId}>POST /payments</a> API reference for the full request and response schema. `);
          } else {
            return [
              createTextVNode(" See the "),
              createVNode("a", {
                href: `/tech/tpp-standards/${unref(docsVersion)}/banking/service-initiation/open-api/payments`
              }, "POST /payments", 8, ["href"]),
              createTextVNode(" API reference for the full request and response schema. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepPaymentResponse.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_18 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-da70cd8f"]]);
const node = `// Token endpoint is read from .well-known/openid-configuration —
// not constructed from the issuer URL (it lives on a different host).
const TOKEN_ENDPOINT = discoveryDoc.token_endpoint

const refreshResponse = await fetch(TOKEN_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type:            'refresh_token',
    refresh_token:         storedRefreshToken,
    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    client_assertion:      await buildClientAssertion(),
  }),
  // agent: new https.Agent({ cert: transportCert, key: transportKey }),
})

const { access_token: newToken, refresh_token: newRefresh } = await refreshResponse.json()
// Update your stored tokens
`;
const python = `# Token endpoint is read from .well-known/openid-configuration —
# not constructed from the issuer URL (it lives on a different host).
token_endpoint = discovery_doc["token_endpoint"]

refresh_response = httpx.post(
    token_endpoint,
    data={
        "grant_type":            "refresh_token",
        "refresh_token":         stored_refresh_token,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        "client_assertion":      build_client_assertion(),
    },
    # cert=("transport.crt", "transport.key"),
)

tokens        = refresh_response.json()
access_token  = tokens["access_token"]
refresh_token = tokens["refresh_token"]
# Update your stored tokens
`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ApiGuideStepTokenRefresh",
  __ssrInlineRender: true,
  setup(__props) {
    const tabs = [
      { label: "Node.js", lang: "typescript", code: node },
      { label: "Python", lang: "python", code: python }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ag-step" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` The initial access token expires after 10 minutes. For subsequent on-demand payments, use the <code${_scopeId}>refresh_token</code> to obtain a new access token without re-involving the user: `);
          } else {
            return [
              createTextVNode(" The initial access token expires after 10 minutes. For subsequent on-demand payments, use the "),
              createVNode("code", null, "refresh_token"),
              createTextVNode(" to obtain a new access token without re-involving the user: ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdCodeGroup, { tabs }, null, _parent));
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` See <a href="/tech/tpp-standards/security/tokens/"${_scopeId}>Tokens &amp; Assertions</a> for refresh token lifetimes and rotation policy. `);
          } else {
            return [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/tpp-standards/security/tokens/" }, "Tokens & Assertions"),
              createTextVNode(" for refresh token lifetimes and rotation policy. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/api-guide-steps/ApiGuideStepTokenRefresh.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  __unplugin_components_18 as a
};

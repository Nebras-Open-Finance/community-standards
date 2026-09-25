import { _ as __unplugin_components_4, a as __unplugin_components_3 } from "./ConsentSingleInstantPayment-BmbvVWg6.js";
import { onMounted, onUnmounted, computed, withCtx, openBlock, createBlock, createVNode, createCommentVNode, useSSRContext, toDisplayString, defineComponent, ref, watchEffect, mergeProps } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
import { u as useSharedState } from "./useSharedState-qc0PNim7.js";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main$2 = {
  __name: "AuthorizationSIPCOP",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState } = useSharedState();
    const COP_PII = {
      Initiation: {
        Creditor: [{
          Creditor: { Name: "Ibrahim Al Sabah" },
          CreditorAccount: {
            SchemeName: "IBAN",
            Identification: "AE070331234567890123456",
            Name: { en: "Ibrahim Al Sabah" }
          }
        }]
      }
    };
    const COP_VALUE = {
      consent: {
        ControlParameters: {
          ConsentSchedule: {
            SinglePayment: {
              Amount: { Amount: "250.00", Currency: "AED" }
            }
          }
        },
        DebtorReference: "Split bill",
        PaymentPurposeCode: "TOF"
      }
    };
    const COP_ACCOUNTS = [
      { id: 1, type: "CurrentAccount", iban: "AE07 0331 2345 6789 0123 456", balance: 5e3, secondary: 1500, currency: "AED" },
      { id: 2, type: "Savings", iban: "AE07 0331 2345 6789 0123 457", balance: 25e3, secondary: null, currency: "AED" }
    ];
    let savedPii;
    let savedValue;
    let savedAccounts;
    onMounted(() => {
      savedPii = sharedState.value.pii;
      savedValue = sharedState.value.value;
      savedAccounts = sharedState.value.accounts;
      sharedState.value = { ...sharedState.value, pii: COP_PII, value: COP_VALUE, accounts: COP_ACCOUNTS };
    });
    onUnmounted(() => {
      sharedState.value = { ...sharedState.value, pii: savedPii, value: savedValue, accounts: savedAccounts };
    });
    const indicator = computed(() => {
      var _a, _b;
      return (_b = (_a = sharedState.value) == null ? void 0 : _a.copData) == null ? void 0 : _b.NameMatchIndicator;
    });
    computed(() => {
      var _a, _b;
      return (_b = (_a = sharedState.value) == null ? void 0 : _a.copData) == null ? void 0 : _b.MaskedName;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthorizationSingleInstantPayment = __unplugin_components_4;
      _push(ssrRenderComponent(_component_AuthorizationSingleInstantPayment, _attrs, {
        "cop-icon": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (indicator.value === "ConfirmationOfPayee.Yes") {
              _push2(`<div class="acop-icon-wrap acop-icon-wrap--green" data-v-8de4ee23${_scopeId}><svg width="9" height="7" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-8de4ee23${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z" fill="white" data-v-8de4ee23${_scopeId}></path></svg></div>`);
            } else if (indicator.value === "ConfirmationOfPayee.Partial") {
              _push2(`<div class="acop-icon-wrap acop-icon-wrap--amber" data-v-8de4ee23${_scopeId}><svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-8de4ee23${_scopeId}><path d="M8 1.5L14.93 13.5H1.07L8 1.5Z" fill="white" data-v-8de4ee23${_scopeId}></path><rect x="7.25" y="6" width="1.5" height="4" rx="0.75" fill="#FDAA35" data-v-8de4ee23${_scopeId}></rect><rect x="7.25" y="11" width="1.5" height="1.5" rx="0.75" fill="#FDAA35" data-v-8de4ee23${_scopeId}></rect></svg></div>`);
            } else if (indicator.value === "ConfirmationOfPayee.No") {
              _push2(`<div class="acop-icon-wrap acop-icon-wrap--red" data-v-8de4ee23${_scopeId}><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-8de4ee23${_scopeId}><path d="M1 1L7 7M7 1L1 7" stroke="white" stroke-width="1.5" stroke-linecap="round" data-v-8de4ee23${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              indicator.value === "ConfirmationOfPayee.Yes" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "acop-icon-wrap acop-icon-wrap--green"
              }, [
                (openBlock(), createBlock("svg", {
                  width: "9",
                  height: "7",
                  viewBox: "0 0 10 8",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createVNode("path", {
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    d: "M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z",
                    fill: "white"
                  })
                ]))
              ])) : indicator.value === "ConfirmationOfPayee.Partial" ? (openBlock(), createBlock("div", {
                key: 1,
                class: "acop-icon-wrap acop-icon-wrap--amber"
              }, [
                (openBlock(), createBlock("svg", {
                  width: "10",
                  height: "10",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createVNode("path", {
                    d: "M8 1.5L14.93 13.5H1.07L8 1.5Z",
                    fill: "white"
                  }),
                  createVNode("rect", {
                    x: "7.25",
                    y: "6",
                    width: "1.5",
                    height: "4",
                    rx: "0.75",
                    fill: "#FDAA35"
                  }),
                  createVNode("rect", {
                    x: "7.25",
                    y: "11",
                    width: "1.5",
                    height: "1.5",
                    rx: "0.75",
                    fill: "#FDAA35"
                  })
                ]))
              ])) : indicator.value === "ConfirmationOfPayee.No" ? (openBlock(), createBlock("div", {
                key: 2,
                class: "acop-icon-wrap acop-icon-wrap--red"
              }, [
                (openBlock(), createBlock("svg", {
                  width: "8",
                  height: "8",
                  viewBox: "0 0 8 8",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createVNode("path", {
                    d: "M1 1L7 7M7 1L1 7",
                    stroke: "white",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round"
                  })
                ]))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        "cop-warning": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (indicator.value === "ConfirmationOfPayee.Partial") {
              _push2(`<div class="acop-warning acop-warning--amber" data-v-8de4ee23${_scopeId}><p class="acop-warn acop-warn--amber" data-v-8de4ee23${_scopeId}>Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee Name OR proceed at your own risk to make the payment to this account.</p></div>`);
            } else if (indicator.value === "ConfirmationOfPayee.No") {
              _push2(`<div class="acop-warning acop-warning--red" data-v-8de4ee23${_scopeId}><p class="acop-warn acop-warn--red" data-v-8de4ee23${_scopeId}>Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee Name OR proceed at your own risk to make the payment to this account.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              indicator.value === "ConfirmationOfPayee.Partial" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "acop-warning acop-warning--amber"
              }, [
                createVNode("p", { class: "acop-warn acop-warn--amber" }, "Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee Name OR proceed at your own risk to make the payment to this account.")
              ])) : indicator.value === "ConfirmationOfPayee.No" ? (openBlock(), createBlock("div", {
                key: 1,
                class: "acop-warning acop-warning--red"
              }, [
                createVNode("p", { class: "acop-warn acop-warn--red" }, "Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee Name OR proceed at your own risk to make the payment to this account.")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/authorization-ui/AuthorizationSIPCOP.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-8de4ee23"]]);
const _sfc_main$1 = {
  __name: "ConsentSIPCOP",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState } = useSharedState();
    const COP_PII = {
      Initiation: {
        Creditor: [{
          Creditor: { Name: "Ibrahim Al Sabah" },
          CreditorAccount: {
            SchemeName: "IBAN",
            Identification: "AE070331234567890123456",
            Name: { en: "Ibrahim Al Sabah" }
          }
        }]
      }
    };
    const COP_VALUE = {
      consent: {
        ControlParameters: {
          ConsentSchedule: {
            SinglePayment: {
              Amount: { Amount: "250.00", Currency: "AED" }
            }
          }
        },
        DebtorReference: "Split bill",
        PaymentPurposeCode: "TOF"
      }
    };
    let savedPii;
    let savedValue;
    onMounted(() => {
      savedPii = sharedState.value.pii;
      savedValue = sharedState.value.value;
      sharedState.value = { ...sharedState.value, pii: COP_PII, value: COP_VALUE };
    });
    onUnmounted(() => {
      sharedState.value = { ...sharedState.value, pii: savedPii, value: savedValue };
    });
    const indicator = computed(() => {
      var _a, _b;
      return (_b = (_a = sharedState.value) == null ? void 0 : _a.copData) == null ? void 0 : _b.NameMatchIndicator;
    });
    const maskedName = computed(() => {
      var _a, _b;
      return (_b = (_a = sharedState.value) == null ? void 0 : _a.copData) == null ? void 0 : _b.MaskedName;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ConsentSingleInstantPayment = __unplugin_components_3;
      _push(ssrRenderComponent(_component_ConsentSingleInstantPayment, _attrs, {
        "cop-result": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (indicator.value === "ConfirmationOfPayee.Yes") {
              _push2(`<div class="cop-row" data-v-c24c9e0d${_scopeId}><div class="cop-status-row" style="${ssrRenderStyle({ "margin-top": "0px" })}" data-v-c24c9e0d${_scopeId}><span class="cop-label cop-label--green" data-v-c24c9e0d${_scopeId}>Confirmed</span><div class="cop-icon-wrap cop-icon-wrap--green" style="${ssrRenderStyle({ "margin-left": "auto" })}" data-v-c24c9e0d${_scopeId}><svg width="9" height="7" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c24c9e0d${_scopeId}><path fill-rule="evenodd" clip-rule="evenodd" d="M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z" fill="white" data-v-c24c9e0d${_scopeId}></path></svg></div></div></div>`);
            } else if (indicator.value === "ConfirmationOfPayee.Partial") {
              _push2(`<div class="cop-row" data-v-c24c9e0d${_scopeId}><div class="cop-status-row" data-v-c24c9e0d${_scopeId}><div class="cop-icon-wrap cop-icon-wrap--amber" data-v-c24c9e0d${_scopeId}><svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c24c9e0d${_scopeId}><path d="M8 1.5L14.93 13.5H1.07L8 1.5Z" fill="white" data-v-c24c9e0d${_scopeId}></path><rect x="7.25" y="6" width="1.5" height="4" rx="0.75" fill="#FDAA35" data-v-c24c9e0d${_scopeId}></rect><rect x="7.25" y="11" width="1.5" height="1.5" rx="0.75" fill="#FDAA35" data-v-c24c9e0d${_scopeId}></rect></svg></div><span class="cop-label cop-label--amber" data-v-c24c9e0d${_scopeId}>Partial Match</span><span class="cop-masked cop-masked--amber" data-v-c24c9e0d${_scopeId}>${ssrInterpolate(maskedName.value)}</span></div><p class="cop-desc cop-desc--amber" data-v-c24c9e0d${_scopeId}>The Name you provided is similar to, but does NOT match the Name of the account owner.</p><p class="cop-warn cop-warn--amber" data-v-c24c9e0d${_scopeId}>Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee details OR proceed at your own risk to make the payment to this account.</p></div>`);
            } else if (indicator.value === "ConfirmationOfPayee.No") {
              _push2(`<div class="cop-row" data-v-c24c9e0d${_scopeId}><div class="cop-status-row" data-v-c24c9e0d${_scopeId}><div class="cop-icon-wrap cop-icon-wrap--red" data-v-c24c9e0d${_scopeId}><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c24c9e0d${_scopeId}><path d="M1 1L7 7M7 1L1 7" stroke="white" stroke-width="1.5" stroke-linecap="round" data-v-c24c9e0d${_scopeId}></path></svg></div><span class="cop-label cop-label--red" data-v-c24c9e0d${_scopeId}>No Match</span><span class="cop-masked cop-masked--red" data-v-c24c9e0d${_scopeId}>${ssrInterpolate(maskedName.value)}</span></div><p class="cop-desc cop-desc--red" data-v-c24c9e0d${_scopeId}>The Name you provided does NOT match the Name of the account owner.</p><p class="cop-warn cop-warn--red" data-v-c24c9e0d${_scopeId}>Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee Name OR proceed at your own risk to make the payment to this account.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              indicator.value === "ConfirmationOfPayee.Yes" ? (openBlock(), createBlock("div", {
                key: 0,
                class: "cop-row"
              }, [
                createVNode("div", {
                  class: "cop-status-row",
                  style: { "margin-top": "0px" }
                }, [
                  createVNode("span", { class: "cop-label cop-label--green" }, "Confirmed"),
                  createVNode("div", {
                    class: "cop-icon-wrap cop-icon-wrap--green",
                    style: { "margin-left": "auto" }
                  }, [
                    (openBlock(), createBlock("svg", {
                      width: "9",
                      height: "7",
                      viewBox: "0 0 10 8",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M9.74921 0.14973C10.043 0.379879 10.0847 0.7926 9.84231 1.07157L3.92582 7.88094C3.80177 8.02371 3.57785 8.04054 3.43169 7.91809L0.233372 5.23854C-0.0522299 4.99927 -0.0794683 4.58546 0.172533 4.31428C0.424535 4.0431 0.860349 4.01724 1.14595 4.25651L3.5424 6.26425L8.77835 0.238125C9.02074 -0.0408436 9.45541 -0.0804196 9.74921 0.14973Z",
                        fill: "white"
                      })
                    ]))
                  ])
                ])
              ])) : indicator.value === "ConfirmationOfPayee.Partial" ? (openBlock(), createBlock("div", {
                key: 1,
                class: "cop-row"
              }, [
                createVNode("div", { class: "cop-status-row" }, [
                  createVNode("div", { class: "cop-icon-wrap cop-icon-wrap--amber" }, [
                    (openBlock(), createBlock("svg", {
                      width: "10",
                      height: "10",
                      viewBox: "0 0 16 16",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M8 1.5L14.93 13.5H1.07L8 1.5Z",
                        fill: "white"
                      }),
                      createVNode("rect", {
                        x: "7.25",
                        y: "6",
                        width: "1.5",
                        height: "4",
                        rx: "0.75",
                        fill: "#FDAA35"
                      }),
                      createVNode("rect", {
                        x: "7.25",
                        y: "11",
                        width: "1.5",
                        height: "1.5",
                        rx: "0.75",
                        fill: "#FDAA35"
                      })
                    ]))
                  ]),
                  createVNode("span", { class: "cop-label cop-label--amber" }, "Partial Match"),
                  createVNode("span", { class: "cop-masked cop-masked--amber" }, toDisplayString(maskedName.value), 1)
                ]),
                createVNode("p", { class: "cop-desc cop-desc--amber" }, "The Name you provided is similar to, but does NOT match the Name of the account owner."),
                createVNode("p", { class: "cop-warn cop-warn--amber" }, "Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee details OR proceed at your own risk to make the payment to this account.")
              ])) : indicator.value === "ConfirmationOfPayee.No" ? (openBlock(), createBlock("div", {
                key: 2,
                class: "cop-row"
              }, [
                createVNode("div", { class: "cop-status-row" }, [
                  createVNode("div", { class: "cop-icon-wrap cop-icon-wrap--red" }, [
                    (openBlock(), createBlock("svg", {
                      width: "8",
                      height: "8",
                      viewBox: "0 0 8 8",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        d: "M1 1L7 7M7 1L1 7",
                        stroke: "white",
                        "stroke-width": "1.5",
                        "stroke-linecap": "round"
                      })
                    ]))
                  ]),
                  createVNode("span", { class: "cop-label cop-label--red" }, "No Match"),
                  createVNode("span", { class: "cop-masked cop-masked--red" }, toDisplayString(maskedName.value), 1)
                ]),
                createVNode("p", { class: "cop-desc cop-desc--red" }, "The Name you provided does NOT match the Name of the account owner."),
                createVNode("p", { class: "cop-warn cop-warn--red" }, "Your payment could go to the wrong person or organisation. Please go back to re-enter the Payee Name OR proceed at your own risk to make the payment to this account.")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/consent-ui/ConsentSIPCOP.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c24c9e0d"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "COPPiiBlock",
  __ssrInlineRender: true,
  setup(__props) {
    const { sharedState } = useSharedState();
    const jws = ref("…");
    function b64url(str) {
      return btoa(Array.from(new TextEncoder().encode(str), (b) => String.fromCharCode(b)).join("")).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
    watchEffect(async () => {
      var _a;
      const data = (_a = sharedState.value) == null ? void 0 : _a.copData;
      if (!data) return;
      const hdr = b64url(JSON.stringify({ alg: "HS256", kid: "demo" }));
      const pld = b64url(JSON.stringify({
        iss: "https://rs1.altareq1.sandbox.apihub.openfinance.ae",
        message: { Data: data }
      }));
      try {
        const key = await crypto.subtle.importKey(
          "raw",
          new TextEncoder().encode("demo-key"),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
        );
        const raw = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${hdr}.${pld}`));
        const sig = btoa(String.fromCharCode(...new Uint8Array(raw))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        jws.value = `${hdr}.${pld}.${sig}`;
      } catch {
        jws.value = `${hdr}.${pld}.demo`;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "cop" }, _attrs))} data-v-0e8d2f06><header class="cop__header" data-v-0e8d2f06><span class="cop__eyebrow" data-v-0e8d2f06><span class="cop__eyebrow-dash" data-v-0e8d2f06></span> Domestic Payment PII </span><span class="cop__subtitle" data-v-0e8d2f06>signed JWS embedded in the creditor PII block (demo only)</span></header><pre class="cop__code" data-v-0e8d2f06><code data-v-0e8d2f06><span class="cop__punc" data-v-0e8d2f06>{</span>
  <span class="cop__key" data-v-0e8d2f06>&quot;Initiation&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__punc" data-v-0e8d2f06>{</span>
    <span class="cop__key" data-v-0e8d2f06>&quot;Creditor&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__punc" data-v-0e8d2f06>[</span>
      <span class="cop__punc" data-v-0e8d2f06>{</span>
        <span class="cop__key" data-v-0e8d2f06>&quot;Creditor&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__punc" data-v-0e8d2f06>{</span> <span class="cop__key" data-v-0e8d2f06>&quot;Name&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__str" data-v-0e8d2f06>&quot;Ibrahim Al Sabah&quot;</span> <span class="cop__punc" data-v-0e8d2f06>}</span><span class="cop__punc" data-v-0e8d2f06>,</span>
        <span class="cop__key" data-v-0e8d2f06>&quot;CreditorAccount&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__punc" data-v-0e8d2f06>{</span>
          <span class="cop__key" data-v-0e8d2f06>&quot;SchemeName&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__str" data-v-0e8d2f06>&quot;IBAN&quot;</span><span class="cop__punc" data-v-0e8d2f06>,</span>
          <span class="cop__key" data-v-0e8d2f06>&quot;Identification&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__str" data-v-0e8d2f06>&quot;AE070331234567890123456&quot;</span><span class="cop__punc" data-v-0e8d2f06>,</span>
          <span class="cop__key" data-v-0e8d2f06>&quot;Name&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__punc" data-v-0e8d2f06>{</span> <span class="cop__key" data-v-0e8d2f06>&quot;en&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__str" data-v-0e8d2f06>&quot;Ibrahim Al Sabah&quot;</span> <span class="cop__punc" data-v-0e8d2f06>}</span>
        <span class="cop__punc" data-v-0e8d2f06>}</span><span class="cop__punc" data-v-0e8d2f06>,</span>
        <span class="cop__key" data-v-0e8d2f06>&quot;ConfirmationOfPayeeResponse&quot;</span><span class="cop__punc" data-v-0e8d2f06>:</span> <span class="cop__jws" data-v-0e8d2f06>&quot;${ssrInterpolate(jws.value)}&quot;</span>
      <span class="cop__punc" data-v-0e8d2f06>}</span>
    <span class="cop__punc" data-v-0e8d2f06>]</span>
  <span class="cop__punc" data-v-0e8d2f06>}</span>
<span class="cop__punc" data-v-0e8d2f06>}</span></code></pre></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/permissions/COPPiiBlock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e8d2f06"]]);
export {
  __unplugin_components_2 as _,
  __unplugin_components_1$1 as a,
  __unplugin_components_1 as b
};

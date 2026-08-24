import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const exampleSample = `{
  "Initiation": {
    "DebtorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": {
        "en": "Ahmad Al Mansouri",
        "ar": "أحمد المنصوري"
      }
    },
    "Creditor": [ ... ]   // see Creditor page
  },
  "Risk": { ... }
}`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "debtor-account",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdNote = __unplugin_components_7;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-9f383c2f><section class="ed-doc__hero" data-v-9f383c2f><div class="ed-doc__inner" data-v-9f383c2f><div class="ed-doc__eyebrow" data-v-9f383c2f><span class="ed-doc__eyebrow-dash" data-v-9f383c2f></span> Service Initiation · PII · Debtor Account </div><h1 class="ed-doc__title" data-v-9f383c2f> Debtor Account <span class="ed-doc__read" data-v-9f383c2f>2 min read</span></h1><p class="ed-doc__lede" data-v-9f383c2f><code data-v-9f383c2f>Initiation.DebtorAccount</code> is an <strong data-v-9f383c2f>optional</strong> field in the consent PII. It is used when the TPP already knows which account the user wants to pay from — for example, because the user selected it within the TPP&#39;s own application before being redirected to the LFI. </p><p class="ed-doc__lede" data-v-9f383c2f> When provided, the LFI will pre-select this account on their authorisation screen. When omitted, the user chooses their account directly at the LFI during authorisation. </p>`);
      _push(ssrRenderComponent(_component_EdNote, {
        type: "info",
        title: "POST /par only"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-9f383c2f${_scopeId}><code data-v-9f383c2f${_scopeId}>Initiation.DebtorAccount</code> is only present in the PII submitted at <span class="endpoint" data-v-9f383c2f${_scopeId}><span class="http-method http-method--post" data-v-9f383c2f${_scopeId}>POST</span><code data-v-9f383c2f${_scopeId}>/par</code></span> (consent staging). It is <strong data-v-9f383c2f${_scopeId}>not part of the <span class="endpoint" data-v-9f383c2f${_scopeId}><span class="http-method http-method--post" data-v-9f383c2f${_scopeId}>POST</span><code data-v-9f383c2f${_scopeId}>/payments</code></span> PII schema</strong>. </p><p data-v-9f383c2f${_scopeId}> At payment time, the debtor account has already been determined: the user selected and authorised it during the consent flow at the LFI. There is no mechanism to change or re-specify the debtor account at <span class="endpoint" data-v-9f383c2f${_scopeId}><span class="http-method http-method--post" data-v-9f383c2f${_scopeId}>POST</span><code data-v-9f383c2f${_scopeId}>/payments</code></span>. </p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("code", null, "Initiation.DebtorAccount"),
                createTextVNode(" is only present in the PII submitted at "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/par")
                ]),
                createTextVNode(" (consent staging). It is "),
                createVNode("strong", null, [
                  createTextVNode("not part of the "),
                  createVNode("span", { class: "endpoint" }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/payments")
                  ]),
                  createTextVNode(" PII schema")
                ]),
                createTextVNode(". ")
              ]),
              createVNode("p", null, [
                createTextVNode(" At payment time, the debtor account has already been determined: the user selected and authorised it during the consent flow at the LFI. There is no mechanism to change or re-specify the debtor account at "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/payments")
                ]),
                createTextVNode(". ")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "schema",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Schema",
        title: "DebtorAccount fields",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9f383c2f${_scopeId2}><thead data-v-9f383c2f${_scopeId2}><tr data-v-9f383c2f${_scopeId2}><th data-v-9f383c2f${_scopeId2}>Field</th><th data-v-9f383c2f${_scopeId2}>Type</th><th data-v-9f383c2f${_scopeId2}>Required</th><th data-v-9f383c2f${_scopeId2}>Description</th><th data-v-9f383c2f${_scopeId2}>Example</th></tr></thead><tbody data-v-9f383c2f${_scopeId2}><tr data-v-9f383c2f${_scopeId2}><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>SchemeName</code></td><td data-v-9f383c2f${_scopeId2}>enum</td><td data-v-9f383c2f${_scopeId2}>Yes</td><td data-v-9f383c2f${_scopeId2}>Account identifier scheme — always <code data-v-9f383c2f${_scopeId2}>IBAN</code></td><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>IBAN</code></td></tr><tr data-v-9f383c2f${_scopeId2}><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>Identification</code></td><td data-v-9f383c2f${_scopeId2}>string</td><td data-v-9f383c2f${_scopeId2}>Yes</td><td data-v-9f383c2f${_scopeId2}>The IBAN of the debtor account</td><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>AE070331234567890123456</code></td></tr><tr data-v-9f383c2f${_scopeId2}><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>Name.en</code></td><td data-v-9f383c2f${_scopeId2}>string</td><td data-v-9f383c2f${_scopeId2}>Yes*</td><td data-v-9f383c2f${_scopeId2}>Account holder name in English</td><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>Ahmad Al Mansouri</code></td></tr><tr data-v-9f383c2f${_scopeId2}><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>Name.ar</code></td><td data-v-9f383c2f${_scopeId2}>string</td><td data-v-9f383c2f${_scopeId2}>No</td><td data-v-9f383c2f${_scopeId2}>Account holder name in Arabic</td><td data-v-9f383c2f${_scopeId2}><code data-v-9f383c2f${_scopeId2}>أحمد المنصوري</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Field"),
                          createVNode("th", null, "Type"),
                          createVNode("th", null, "Required"),
                          createVNode("th", null, "Description"),
                          createVNode("th", null, "Example")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "SchemeName")
                          ]),
                          createVNode("td", null, "enum"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Account identifier scheme — always "),
                            createVNode("code", null, "IBAN")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "IBAN")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Identification")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The IBAN of the debtor account"),
                          createVNode("td", null, [
                            createVNode("code", null, "AE070331234567890123456")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Name.en")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes*"),
                          createVNode("td", null, "Account holder name in English"),
                          createVNode("td", null, [
                            createVNode("code", null, "Ahmad Al Mansouri")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "Name.ar")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Account holder name in Arabic"),
                          createVNode("td", null, [
                            createVNode("code", null, "أحمد المنصوري")
                          ])
                        ])
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
                  _push3(` * At least one of <code data-v-9f383c2f${_scopeId2}>Name.en</code> or <code data-v-9f383c2f${_scopeId2}>Name.ar</code> must be provided if <code data-v-9f383c2f${_scopeId2}>Name</code> is included. `);
                } else {
                  return [
                    createTextVNode(" * At least one of "),
                    createVNode("code", null, "Name.en"),
                    createTextVNode(" or "),
                    createVNode("code", null, "Name.ar"),
                    createTextVNode(" must be provided if "),
                    createVNode("code", null, "Name"),
                    createTextVNode(" is included. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Field"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Required"),
                        createVNode("th", null, "Description"),
                        createVNode("th", null, "Example")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "SchemeName")
                        ]),
                        createVNode("td", null, "enum"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Account identifier scheme — always "),
                          createVNode("code", null, "IBAN")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "IBAN")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Identification")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The IBAN of the debtor account"),
                        createVNode("td", null, [
                          createVNode("code", null, "AE070331234567890123456")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Name.en")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes*"),
                        createVNode("td", null, "Account holder name in English"),
                        createVNode("td", null, [
                          createVNode("code", null, "Ahmad Al Mansouri")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "Name.ar")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Account holder name in Arabic"),
                        createVNode("td", null, [
                          createVNode("code", null, "أحمد المنصوري")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" * At least one of "),
                  createVNode("code", null, "Name.en"),
                  createTextVNode(" or "),
                  createVNode("code", null, "Name.ar"),
                  createTextVNode(" must be provided if "),
                  createVNode("code", null, "Name"),
                  createTextVNode(" is included. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "example",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Example",
        title: "POST /par PII with DebtorAccount provided",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdCode, {
              code: exampleSample,
              lang: "json",
              filename: "POST /par PII (excerpt)"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "When to omit DebtorAccount"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9f383c2f${_scopeId2}> If your application does not hold the user&#39;s IBAN — for example, in a checkout flow where the user is paying from an account you have never seen — omit <code data-v-9f383c2f${_scopeId2}>DebtorAccount</code> entirely. The user will select their account at the LFI. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If your application does not hold the user's IBAN — for example, in a checkout flow where the user is paying from an account you have never seen — omit "),
                      createVNode("code", null, "DebtorAccount"),
                      createTextVNode(" entirely. The user will select their account at the LFI. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdCode, {
                code: exampleSample,
                lang: "json",
                filename: "POST /par PII (excerpt)"
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "When to omit DebtorAccount"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If your application does not hold the user's IBAN — for example, in a checkout flow where the user is paying from an account you have never seen — omit "),
                    createVNode("code", null, "DebtorAccount"),
                    createTextVNode(" entirely. The user will select their account at the LFI. ")
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const debtorAccount = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9f383c2f"]]);
export {
  debtorAccount as default
};

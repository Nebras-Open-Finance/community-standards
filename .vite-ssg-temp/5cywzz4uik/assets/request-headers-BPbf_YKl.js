import { _ as __unplugin_components_9 } from "./EdCodeGroup-zEBrHWfH.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "request-headers",
  __ssrInlineRender: true,
  setup(__props) {
    const interactionIdTabs = [
      {
        label: "Node.js",
        lang: "javascript",
        code: `import { v4 as uuidv4 } from 'uuid'
const interactionId = uuidv4()
// e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`
      },
      {
        label: "Python",
        lang: "python",
        code: `import uuid
interaction_id = str(uuid.uuid4())
# e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCodeGroup = __unplugin_components_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-9ab16669><section class="ed-doc__hero" data-v-9ab16669><div class="ed-doc__inner" data-v-9ab16669><div class="ed-doc__eyebrow" data-v-9ab16669><span class="ed-doc__eyebrow-dash" data-v-9ab16669></span> Security · FAPI · HTTP headers </div><h1 class="ed-doc__title" data-v-9ab16669> Request Headers <span class="ed-doc__read" data-v-9ab16669>3 min read</span></h1><p class="ed-doc__lede" data-v-9ab16669> These headers apply to all authenticated API calls made in the UAE Open Finance ecosystem. They are defined by the <a href="https://openid.net/specs/fapi-2_0-security-profile.html" data-v-9ab16669>FAPI 2.0 Security Profile</a> and the UAE Open Finance standard. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "header-reference",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Header Reference",
        title: "At-a-glance summary of every supported header",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-9ab16669${_scopeId2}><thead data-v-9ab16669${_scopeId2}><tr data-v-9ab16669${_scopeId2}><th data-v-9ab16669${_scopeId2}>Header</th><th data-v-9ab16669${_scopeId2}>Level</th><th data-v-9ab16669${_scopeId2}>Applies To</th></tr></thead><tbody data-v-9ab16669${_scopeId2}><tr data-v-9ab16669${_scopeId2}><td data-v-9ab16669${_scopeId2}><code data-v-9ab16669${_scopeId2}>x-fapi-interaction-id</code></td><td data-v-9ab16669${_scopeId2}>Recommended</td><td data-v-9ab16669${_scopeId2}>All endpoints</td></tr><tr data-v-9ab16669${_scopeId2}><td data-v-9ab16669${_scopeId2}><code data-v-9ab16669${_scopeId2}>x-fapi-customer-ip-address</code></td><td data-v-9ab16669${_scopeId2}>Conditional</td><td data-v-9ab16669${_scopeId2}>All endpoints</td></tr><tr data-v-9ab16669${_scopeId2}><td data-v-9ab16669${_scopeId2}><code data-v-9ab16669${_scopeId2}>x-fapi-auth-date</code></td><td data-v-9ab16669${_scopeId2}>Conditional</td><td data-v-9ab16669${_scopeId2}>Data Sharing, Service Initiation, Confirmation of Payee</td></tr><tr data-v-9ab16669${_scopeId2}><td data-v-9ab16669${_scopeId2}><code data-v-9ab16669${_scopeId2}>x-customer-user-agent</code></td><td data-v-9ab16669${_scopeId2}>Optional</td><td data-v-9ab16669${_scopeId2}>Data Sharing, Service Initiation, Confirmation of Payee</td></tr><tr data-v-9ab16669${_scopeId2}><td data-v-9ab16669${_scopeId2}><code data-v-9ab16669${_scopeId2}>x-idempotency-key</code></td><td data-v-9ab16669${_scopeId2}>Required</td><td data-v-9ab16669${_scopeId2}><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments" data-v-9ab16669${_scopeId2}>POST /payments</a></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Header"),
                          createVNode("th", null, "Level"),
                          createVNode("th", null, "Applies To")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "x-fapi-interaction-id")
                          ]),
                          createVNode("td", null, "Recommended"),
                          createVNode("td", null, "All endpoints")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "x-fapi-customer-ip-address")
                          ]),
                          createVNode("td", null, "Conditional"),
                          createVNode("td", null, "All endpoints")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "x-fapi-auth-date")
                          ]),
                          createVNode("td", null, "Conditional"),
                          createVNode("td", null, "Data Sharing, Service Initiation, Confirmation of Payee")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "x-customer-user-agent")
                          ]),
                          createVNode("td", null, "Optional"),
                          createVNode("td", null, "Data Sharing, Service Initiation, Confirmation of Payee")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "x-idempotency-key")
                          ]),
                          createVNode("td", null, "Required"),
                          createVNode("td", null, [
                            createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments" }, "POST /payments")
                          ])
                        ])
                      ])
                    ])
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
                        createVNode("th", null, "Header"),
                        createVNode("th", null, "Level"),
                        createVNode("th", null, "Applies To")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "x-fapi-interaction-id")
                        ]),
                        createVNode("td", null, "Recommended"),
                        createVNode("td", null, "All endpoints")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "x-fapi-customer-ip-address")
                        ]),
                        createVNode("td", null, "Conditional"),
                        createVNode("td", null, "All endpoints")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "x-fapi-auth-date")
                        ]),
                        createVNode("td", null, "Conditional"),
                        createVNode("td", null, "Data Sharing, Service Initiation, Confirmation of Payee")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "x-customer-user-agent")
                        ]),
                        createVNode("td", null, "Optional"),
                        createVNode("td", null, "Data Sharing, Service Initiation, Confirmation of Payee")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "x-idempotency-key")
                        ]),
                        createVNode("td", null, "Required"),
                        createVNode("td", null, [
                          createVNode("a", { href: "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments" }, "POST /payments")
                        ])
                      ])
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
        id: "interaction-id",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "x-fapi-interaction-id",
        title: "UUID v4 correlation ID for end-to-end tracing",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A UUID v4 correlation identifier that links a request to its response and enables end-to-end traceability across the ecosystem. `);
                } else {
                  return [
                    createTextVNode(" A UUID v4 correlation identifier that links a request to its response and enables end-to-end traceability across the ecosystem. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Format:</strong> UUID v4 (RFC 4122), e.g. <code data-v-9ab16669${_scopeId2}>7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c</code></li><li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Level:</strong> Recommended on all requests. TPPs SHOULD include this header on every outbound call.</li><li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>LFI behaviour:</strong> The API Hub echoes the value verbatim in the <code data-v-9ab16669${_scopeId2}>x-fapi-interaction-id</code> response header. If the header is absent, the API Hub generates a UUID and returns it in the response.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Format:"),
                      createTextVNode(" UUID v4 (RFC 4122), e.g. "),
                      createVNode("code", null, "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Level:"),
                      createTextVNode(" Recommended on all requests. TPPs SHOULD include this header on every outbound call.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "LFI behaviour:"),
                      createTextVNode(" The API Hub echoes the value verbatim in the "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(" response header. If the header is absent, the API Hub generates a UUID and returns it in the response.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` TPPs should log the interaction ID alongside every outbound request and its response. This enables correlation of issues across TPP systems, the API Hub and the LFI systems, and Nebras support. `);
                } else {
                  return [
                    createTextVNode(" TPPs should log the interaction ID alongside every outbound request and its response. This enables correlation of issues across TPP systems, the API Hub and the LFI systems, and Nebras support. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "UUID v4 format is strictly required"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9ab16669${_scopeId2}> The API Hub validates the format of <code data-v-9ab16669${_scopeId2}>x-fapi-interaction-id</code>. If the value is not a valid UUID v4, <strong data-v-9ab16669${_scopeId2}>the request will not fail</strong>, but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID cannot be used for tracing or support — the value in your logs will not match anything on the API Hub side. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" The API Hub validates the format of "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(". If the value is not a valid UUID v4, "),
                      createVNode("strong", null, "the request will not fail"),
                      createTextVNode(", but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID cannot be used for tracing or support — the value in your logs will not match anything on the API Hub side. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCodeGroup, { tabs: interactionIdTabs }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Do not use any format that does not conform to RFC 4122 UUID v4. Even values that look similar (e.g. GUIDs or UUIDs without hyphens) will be discarded. `);
                } else {
                  return [
                    createTextVNode(" Do not use any format that does not conform to RFC 4122 UUID v4. Even values that look similar (e.g. GUIDs or UUIDs without hyphens) will be discarded. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A UUID v4 correlation identifier that links a request to its response and enables end-to-end traceability across the ecosystem. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Format:"),
                    createTextVNode(" UUID v4 (RFC 4122), e.g. "),
                    createVNode("code", null, "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Level:"),
                    createTextVNode(" Recommended on all requests. TPPs SHOULD include this header on every outbound call.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "LFI behaviour:"),
                    createTextVNode(" The API Hub echoes the value verbatim in the "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" response header. If the header is absent, the API Hub generates a UUID and returns it in the response.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" TPPs should log the interaction ID alongside every outbound request and its response. This enables correlation of issues across TPP systems, the API Hub and the LFI systems, and Nebras support. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "UUID v4 format is strictly required"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" The API Hub validates the format of "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(". If the value is not a valid UUID v4, "),
                    createVNode("strong", null, "the request will not fail"),
                    createTextVNode(", but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID cannot be used for tracing or support — the value in your logs will not match anything on the API Hub side. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCodeGroup, { tabs: interactionIdTabs }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Do not use any format that does not conform to RFC 4122 UUID v4. Even values that look similar (e.g. GUIDs or UUIDs without hyphens) will be discarded. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "customer-ip",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "x-fapi-customer-ip-address",
        title: "IP address of the customer's device at request time",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The IP address of the customer&#39;s device at the time of the request.`);
                } else {
                  return [
                    createTextVNode("The IP address of the customer's device at the time of the request.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Format:</strong> IPv4 or IPv6 string, e.g. <code data-v-9ab16669${_scopeId2}>192.168.1.1</code> or <code data-v-9ab16669${_scopeId2}>2001:db8::1</code></li><li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Level:</strong> Required when the customer is present in an active end user-facing session. Required on all Product and Leads endpoints regardless of session context.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Format:"),
                      createTextVNode(" IPv4 or IPv6 string, e.g. "),
                      createVNode("code", null, "192.168.1.1"),
                      createTextVNode(" or "),
                      createVNode("code", null, "2001:db8::1")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Level:"),
                      createTextVNode(" Required when the customer is present in an active end user-facing session. Required on all Product and Leads endpoints regardless of session context.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Where the TPP cannot determine the customer&#39;s IP address (e.g. in a server-to-server background call), this header should be omitted. `);
                } else {
                  return [
                    createTextVNode(" Where the TPP cannot determine the customer's IP address (e.g. in a server-to-server background call), this header should be omitted. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The IP address of the customer's device at the time of the request.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Format:"),
                    createTextVNode(" IPv4 or IPv6 string, e.g. "),
                    createVNode("code", null, "192.168.1.1"),
                    createTextVNode(" or "),
                    createVNode("code", null, "2001:db8::1")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Level:"),
                    createTextVNode(" Required when the customer is present in an active end user-facing session. Required on all Product and Leads endpoints regardless of session context.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Where the TPP cannot determine the customer's IP address (e.g. in a server-to-server background call), this header should be omitted. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "auth-date",
        num: "04",
        color: "var(--at-navy)",
        eyebrow: "x-fapi-auth-date",
        title: "Last time the customer authenticated with the TPP",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The date and time at which the customer last authenticated with the TPP.`);
                } else {
                  return [
                    createTextVNode("The date and time at which the customer last authenticated with the TPP.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Format:</strong> RFC 7231 HTTP-date, e.g. <code data-v-9ab16669${_scopeId2}>Sun, 10 Sep 2023 19:43:31 UTC</code></li><li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Level:</strong> Required when the customer is present in an active end user-facing session (i.e. the request is being made on behalf of a customer who is currently logged in). Optional for background/automated calls.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Format:"),
                      createTextVNode(" RFC 7231 HTTP-date, e.g. "),
                      createVNode("code", null, "Sun, 10 Sep 2023 19:43:31 UTC")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Level:"),
                      createTextVNode(" Required when the customer is present in an active end user-facing session (i.e. the request is being made on behalf of a customer who is currently logged in). Optional for background/automated calls.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "tip" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9ab16669${_scopeId2}> This header informs the LFI&#39;s fraud and risk controls. Omitting it during an end user-facing session may cause the LFI to treat the call as a background operation, which can affect consent and session handling. </p>`);
                } else {
                  return [
                    createVNode("p", null, " This header informs the LFI's fraud and risk controls. Omitting it during an end user-facing session may cause the LFI to treat the call as a background operation, which can affect consent and session handling. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The date and time at which the customer last authenticated with the TPP.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Format:"),
                    createTextVNode(" RFC 7231 HTTP-date, e.g. "),
                    createVNode("code", null, "Sun, 10 Sep 2023 19:43:31 UTC")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Level:"),
                    createTextVNode(" Required when the customer is present in an active end user-facing session (i.e. the request is being made on behalf of a customer who is currently logged in). Optional for background/automated calls.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "tip" }, {
                default: withCtx(() => [
                  createVNode("p", null, " This header informs the LFI's fraud and risk controls. Omitting it during an end user-facing session may cause the LFI to treat the call as a background operation, which can affect consent and session handling. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "user-agent",
        num: "05",
        color: "var(--at-teal-deep)",
        eyebrow: "x-customer-user-agent",
        title: "The customer's browser or app user-agent string",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The user-agent string of the customer&#39;s browser or application.`);
                } else {
                  return [
                    createTextVNode("The user-agent string of the customer's browser or application.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Format:</strong> Standard HTTP User-Agent string, e.g. <code data-v-9ab16669${_scopeId2}>Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)</code></li><li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Level:</strong> Optional. Recommended where the customer is accessing the TPP via a browser or native application.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Format:"),
                      createTextVNode(" Standard HTTP User-Agent string, e.g. "),
                      createVNode("code", null, "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Level:"),
                      createTextVNode(" Optional. Recommended where the customer is accessing the TPP via a browser or native application.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` This header supports LFI fraud detection and device fingerprinting. It should reflect the customer&#39;s actual device, not the TPP&#39;s server. `);
                } else {
                  return [
                    createTextVNode(" This header supports LFI fraud detection and device fingerprinting. It should reflect the customer's actual device, not the TPP's server. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The user-agent string of the customer's browser or application.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Format:"),
                    createTextVNode(" Standard HTTP User-Agent string, e.g. "),
                    createVNode("code", null, "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Level:"),
                    createTextVNode(" Optional. Recommended where the customer is accessing the TPP via a browser or native application.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" This header supports LFI fraud detection and device fingerprinting. It should reflect the customer's actual device, not the TPP's server. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "idempotency-key",
        num: "06",
        color: "var(--at-gold)",
        eyebrow: "x-idempotency-key",
        title: "Exactly-once processing for payment initiation",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A unique key that guarantees exactly-once processing of payment initiation requests.`);
                } else {
                  return [
                    createTextVNode("A unique key that guarantees exactly-once processing of payment initiation requests.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Format:</strong> String, maximum 40 characters, no whitespace — pattern <code data-v-9ab16669${_scopeId2}>^(\\S*)$</code></li><li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Level:</strong> Required on all <span class="endpoint" data-v-9ab16669${_scopeId2}><span class="http-method http-method--post" data-v-9ab16669${_scopeId2}>POST</span><code data-v-9ab16669${_scopeId2}>/payments</code></span> requests.</li><li data-v-9ab16669${_scopeId2}><strong data-v-9ab16669${_scopeId2}>Scope:</strong> Unique per consent. The same key must not be reused across different consents.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Format:"),
                      createTextVNode(" String, maximum 40 characters, no whitespace — pattern "),
                      createVNode("code", null, "^(\\S*)$")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Level:"),
                      createTextVNode(" Required on all "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" requests.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Scope:"),
                      createTextVNode(" Unique per consent. The same key must not be reused across different consents.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-9ab16669${_scopeId}>Rules</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-9ab16669${_scopeId2}>If the API Hub receives a <span class="endpoint" data-v-9ab16669${_scopeId2}><span class="http-method http-method--post" data-v-9ab16669${_scopeId2}>POST</span><code data-v-9ab16669${_scopeId2}>/payments</code></span> request with an <code data-v-9ab16669${_scopeId2}>x-idempotency-key</code> it has already processed for the same consent, it must return the original response without re-processing the payment.</li><li data-v-9ab16669${_scopeId2}>TPPs must not change the request body when replaying a request with the same idempotency key.</li><li data-v-9ab16669${_scopeId2}>TPPs must preserve the idempotency key when retrying after a network failure or timeout. Do not generate a new key for a retry — this would create a duplicate payment.</li><li data-v-9ab16669${_scopeId2}>The API Hub echoes the <code data-v-9ab16669${_scopeId2}>x-idempotency-key</code> in the response header.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode("If the API Hub receives a "),
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/payments")
                      ]),
                      createTextVNode(" request with an "),
                      createVNode("code", null, "x-idempotency-key"),
                      createTextVNode(" it has already processed for the same consent, it must return the original response without re-processing the payment.")
                    ]),
                    createVNode("li", null, "TPPs must not change the request body when replaying a request with the same idempotency key."),
                    createVNode("li", null, "TPPs must preserve the idempotency key when retrying after a network failure or timeout. Do not generate a new key for a retry — this would create a duplicate payment."),
                    createVNode("li", null, [
                      createTextVNode("The API Hub echoes the "),
                      createVNode("code", null, "x-idempotency-key"),
                      createTextVNode(" in the response header.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, { type: "warning" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-9ab16669${_scopeId2}> If a TPP generates a new <code data-v-9ab16669${_scopeId2}>x-idempotency-key</code> on retry after a timeout, it risks creating a duplicate payment. The correct behaviour on retry is to resend the original key with the original request body. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" If a TPP generates a new "),
                      createVNode("code", null, "x-idempotency-key"),
                      createTextVNode(" on retry after a timeout, it risks creating a duplicate payment. The correct behaviour on retry is to resend the original key with the original request body. ")
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
                  createTextVNode("A unique key that guarantees exactly-once processing of payment initiation requests.")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Format:"),
                    createTextVNode(" String, maximum 40 characters, no whitespace — pattern "),
                    createVNode("code", null, "^(\\S*)$")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Level:"),
                    createTextVNode(" Required on all "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" requests.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Scope:"),
                    createTextVNode(" Unique per consent. The same key must not be reused across different consents.")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Rules"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode("If the API Hub receives a "),
                    createVNode("span", { class: "endpoint" }, [
                      createVNode("span", { class: "http-method http-method--post" }, "POST"),
                      createVNode("code", null, "/payments")
                    ]),
                    createTextVNode(" request with an "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(" it has already processed for the same consent, it must return the original response without re-processing the payment.")
                  ]),
                  createVNode("li", null, "TPPs must not change the request body when replaying a request with the same idempotency key."),
                  createVNode("li", null, "TPPs must preserve the idempotency key when retrying after a network failure or timeout. Do not generate a new key for a retry — this would create a duplicate payment."),
                  createVNode("li", null, [
                    createTextVNode("The API Hub echoes the "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(" in the response header.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, { type: "warning" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" If a TPP generates a new "),
                    createVNode("code", null, "x-idempotency-key"),
                    createTextVNode(" on retry after a timeout, it risks creating a duplicate payment. The correct behaviour on retry is to resend the original key with the original request body. ")
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
        id: "message-signing",
        num: "07",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Message Signing",
        title: "Request signing is handled separately",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Request signing (<code data-v-9ab16669${_scopeId2}>x-jws-signature</code>) is handled separately. Refer to <a href="/tech/tpp-standards/security/fapi/message-signing" data-v-9ab16669${_scopeId2}>Message Signing</a> for requirements and implementation guidance. `);
                } else {
                  return [
                    createTextVNode(" Request signing ("),
                    createVNode("code", null, "x-jws-signature"),
                    createTextVNode(") is handled separately. Refer to "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                    createTextVNode(" for requirements and implementation guidance. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Request signing ("),
                  createVNode("code", null, "x-jws-signature"),
                  createTextVNode(") is handled separately. Refer to "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/message-signing" }, "Message Signing"),
                  createTextVNode(" for requirements and implementation guidance. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/security/request-headers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requestHeaders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9ab16669"]]);
export {
  requestHeaders as default
};

import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const nodeUuid = `import { v4 as uuidv4 } from 'uuid'
const interactionId = uuidv4()
// e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`;
const pythonUuid = `import uuid
interaction_id = str(uuid.uuid4())
# e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "request-headers",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "interaction", label: "x-fapi-interaction-id" },
      { id: "others", label: "Other headers" }
    ];
    const meta = [
      { label: "Category", value: "Security" },
      { label: "Read", value: "7 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["FAPI", "Headers", "Traceability"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-3b2ffb48>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "FAPI Request Headers — Traceability, Context, and Safe Retries",
        meta,
        lede: "Every API call in the UAE Open Finance ecosystem supports a set of HTTP headers defined by the <a href='https://openid.net/specs/fapi-2_0-security-profile.html'>FAPI 2.0 Security Profile</a> and the UAE Open Finance standard. They carry no business logic, but significantly affect how problems are diagnosed, how fraud controls operate, and how payment retries behave safely."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-3b2ffb48${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-3b2ffb48${_scopeId}>${ssrInterpolate(t)}</span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "ed-tags" }, [
                (openBlock(), createBlock(Fragment, null, renderList(tags, (t) => {
                  return createVNode("span", {
                    key: t,
                    class: "ed-tag"
                  }, toDisplayString(t), 1);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdProse, { class: "ed-page__intro" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` The <a href="/tech/tpp-standards/security/request-headers" data-v-3b2ffb48${_scopeId}>Request Headers reference</a> covers the full rules. This article explains the intent behind each one. `);
          } else {
            return [
              createTextVNode(" The "),
              createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers reference"),
              createTextVNode(" covers the full rules. This article explains the intent behind each one. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "interaction",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "x-fapi-interaction-id",
        title: "The most important header to get right",
        lede: "A UUID you generate and attach to every outbound request. Acts as a correlation handle that follows the request through your system, through the API Hub, and into the LFI — and comes back to you in the response.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Every log line on every system that touched that request can be tagged with the same ID. Without it, tracing a failed payment across three systems means reconciling timestamps and guessing. With it, you ask Nebras support for a trace by interaction ID and get a complete picture in minutes.`);
                } else {
                  return [
                    createTextVNode("Every log line on every system that touched that request can be tagged with the same ID. Without it, tracing a failed payment across three systems means reconciling timestamps and guessing. With it, you ask Nebras support for a trace by interaction ID and get a complete picture in minutes.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-3b2ffb48${_scopeId}>How it works in practice</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-3b2ffb48${_scopeId2}>Generate a fresh UUID v4 for each request — never reuse across requests.</li><li data-v-3b2ffb48${_scopeId2}>Send it as <code data-v-3b2ffb48${_scopeId2}>x-fapi-interaction-id: 7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c</code>.</li><li data-v-3b2ffb48${_scopeId2}>The API Hub echoes the exact value back in the <code data-v-3b2ffb48${_scopeId2}>x-fapi-interaction-id</code> response header. If you omit it, the API Hub generates one for you — but you won&#39;t know what it is until you read the response header, and any log lines emitted <em data-v-3b2ffb48${_scopeId2}>before</em> the response arrives will have no ID to correlate against.</li><li data-v-3b2ffb48${_scopeId2}>Log the interaction ID the moment you compose the request, not when you receive the response. This ensures it appears in your logs even if the request never returns.</li>`);
                } else {
                  return [
                    createVNode("li", null, "Generate a fresh UUID v4 for each request — never reuse across requests."),
                    createVNode("li", null, [
                      createTextVNode("Send it as "),
                      createVNode("code", null, "x-fapi-interaction-id: 7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("The API Hub echoes the exact value back in the "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(" response header. If you omit it, the API Hub generates one for you — but you won't know what it is until you read the response header, and any log lines emitted "),
                      createVNode("em", null, "before"),
                      createTextVNode(" the response arrives will have no ID to correlate against.")
                    ]),
                    createVNode("li", null, "Log the interaction ID the moment you compose the request, not when you receive the response. This ensures it appears in your logs even if the request never returns.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-3b2ffb48${_scopeId2}>When debugging:</strong> if a request fails, search your logs for the interaction ID to pull the full request and response together. Pass it to Nebras when raising a support case — it is the single fastest way to get an end-to-end trace.`);
                } else {
                  return [
                    createVNode("strong", null, "When debugging:"),
                    createTextVNode(" if a request fails, search your logs for the interaction ID to pull the full request and response together. Pass it to Nebras when raising a support case — it is the single fastest way to get an end-to-end trace.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Format must be UUID v4 — silent discard if invalid"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3b2ffb48${_scopeId2}>The API Hub validates the <code data-v-3b2ffb48${_scopeId2}>x-fapi-interaction-id</code> value. If it is not a valid UUID v4, <strong data-v-3b2ffb48${_scopeId2}>the request will not fail</strong> — but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID you logged will not match anything on the API Hub side, and end-to-end tracing becomes impossible.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("The API Hub validates the "),
                      createVNode("code", null, "x-fapi-interaction-id"),
                      createTextVNode(" value. If it is not a valid UUID v4, "),
                      createVNode("strong", null, "the request will not fail"),
                      createTextVNode(" — but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID you logged will not match anything on the API Hub side, and end-to-end tracing becomes impossible.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: nodeUuid,
              lang: "javascript",
              filename: "Node.js"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: pythonUuid,
              lang: "python",
              filename: "Python"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Values that look similar but are not RFC 4122 UUID v4 will be discarded without any error response.`);
                } else {
                  return [
                    createTextVNode("Values that look similar but are not RFC 4122 UUID v4 will be discarded without any error response.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Always send it"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-3b2ffb48${_scopeId2}>The header is defined as <em data-v-3b2ffb48${_scopeId2}>recommended</em> in FAPI 2.0, but in practice it is essential. There is no meaningful cost to sending it and significant cost to omitting it when you need to investigate a problem.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode("The header is defined as "),
                      createVNode("em", null, "recommended"),
                      createTextVNode(" in FAPI 2.0, but in practice it is essential. There is no meaningful cost to sending it and significant cost to omitting it when you need to investigate a problem.")
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
                  createTextVNode("Every log line on every system that touched that request can be tagged with the same ID. Without it, tracing a failed payment across three systems means reconciling timestamps and guessing. With it, you ask Nebras support for a trace by interaction ID and get a complete picture in minutes.")
                ]),
                _: 1
              }),
              createVNode("h3", null, "How it works in practice"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Generate a fresh UUID v4 for each request — never reuse across requests."),
                  createVNode("li", null, [
                    createTextVNode("Send it as "),
                    createVNode("code", null, "x-fapi-interaction-id: 7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("The API Hub echoes the exact value back in the "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" response header. If you omit it, the API Hub generates one for you — but you won't know what it is until you read the response header, and any log lines emitted "),
                    createVNode("em", null, "before"),
                    createTextVNode(" the response arrives will have no ID to correlate against.")
                  ]),
                  createVNode("li", null, "Log the interaction ID the moment you compose the request, not when you receive the response. This ensures it appears in your logs even if the request never returns.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "When debugging:"),
                  createTextVNode(" if a request fails, search your logs for the interaction ID to pull the full request and response together. Pass it to Nebras when raising a support case — it is the single fastest way to get an end-to-end trace.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Format must be UUID v4 — silent discard if invalid"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("The API Hub validates the "),
                    createVNode("code", null, "x-fapi-interaction-id"),
                    createTextVNode(" value. If it is not a valid UUID v4, "),
                    createVNode("strong", null, "the request will not fail"),
                    createTextVNode(" — but the interaction ID will be silently discarded and will not be stored at the API Hub. This means the ID you logged will not match anything on the API Hub side, and end-to-end tracing becomes impossible.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: nodeUuid,
                lang: "javascript",
                filename: "Node.js"
              }),
              createVNode(_component_EdCode, {
                code: pythonUuid,
                lang: "python",
                filename: "Python"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Values that look similar but are not RFC 4122 UUID v4 will be discarded without any error response.")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Always send it"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("The header is defined as "),
                    createVNode("em", null, "recommended"),
                    createTextVNode(" in FAPI 2.0, but in practice it is essential. There is no meaningful cost to sending it and significant cost to omitting it when you need to investigate a problem.")
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
        id: "others",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Other headers",
        title: "Context, fraud controls, and idempotency",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-3b2ffb48${_scopeId}><code data-v-3b2ffb48${_scopeId}>x-fapi-customer-ip-address</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The IP address of the customer&#39;s device; send it whenever the customer is actively present in a session, so the LFI&#39;s fraud controls can see that the request originated from a real user rather than a background process.`);
                } else {
                  return [
                    createTextVNode("The IP address of the customer's device; send it whenever the customer is actively present in a session, so the LFI's fraud controls can see that the request originated from a real user rather than a background process.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-3b2ffb48${_scopeId}><code data-v-3b2ffb48${_scopeId}>x-fapi-auth-date</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The date and time the customer last authenticated with your system (RFC 7231 HTTP-date format); send it on end user-facing calls so the LFI knows how fresh the authentication is and can apply appropriate session risk controls.`);
                } else {
                  return [
                    createTextVNode("The date and time the customer last authenticated with your system (RFC 7231 HTTP-date format); send it on end user-facing calls so the LFI knows how fresh the authentication is and can apply appropriate session risk controls.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-3b2ffb48${_scopeId}><code data-v-3b2ffb48${_scopeId}>x-customer-user-agent</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The user-agent string of the customer&#39;s browser or app; send it when the customer is accessing your service through a browser or native application, as it supports API Hub device fingerprinting and fraud detection.`);
                } else {
                  return [
                    createTextVNode("The user-agent string of the customer's browser or app; send it when the customer is accessing your service through a browser or native application, as it supports API Hub device fingerprinting and fraud detection.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-3b2ffb48${_scopeId}><code data-v-3b2ffb48${_scopeId}>x-idempotency-key</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`A stable, unique key you attach to every <code data-v-3b2ffb48${_scopeId2}>POST /payments</code> request; if the API Hub has already processed a request with the same key for the same consent, it returns the original response without re-processing — always reuse the same key on retries, never generate a fresh one, or you risk creating a duplicate payment.`);
                } else {
                  return [
                    createTextVNode("A stable, unique key you attach to every "),
                    createVNode("code", null, "POST /payments"),
                    createTextVNode(" request; if the API Hub has already processed a request with the same key for the same consent, it returns the original response without re-processing — always reuse the same key on retries, never generate a fresh one, or you risk creating a duplicate payment.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`See the <a href="/tech/tpp-standards/security/request-headers" data-v-3b2ffb48${_scopeId2}>Request Headers reference</a> for format rules, exact conditions, and validation requirements.`);
                } else {
                  return [
                    createTextVNode("See the "),
                    createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers reference"),
                    createTextVNode(" for format rules, exact conditions, and validation requirements.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, [
                createVNode("code", null, "x-fapi-customer-ip-address")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The IP address of the customer's device; send it whenever the customer is actively present in a session, so the LFI's fraud controls can see that the request originated from a real user rather than a background process.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "x-fapi-auth-date")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The date and time the customer last authenticated with your system (RFC 7231 HTTP-date format); send it on end user-facing calls so the LFI knows how fresh the authentication is and can apply appropriate session risk controls.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "x-customer-user-agent")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The user-agent string of the customer's browser or app; send it when the customer is accessing your service through a browser or native application, as it supports API Hub device fingerprinting and fraud detection.")
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "x-idempotency-key")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("A stable, unique key you attach to every "),
                  createVNode("code", null, "POST /payments"),
                  createTextVNode(" request; if the API Hub has already processed a request with the same key for the same consent, it returns the original response without re-processing — always reuse the same key on retries, never generate a fresh one, or you risk creating a duplicate payment.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("See the "),
                  createVNode("a", { href: "/tech/tpp-standards/security/request-headers" }, "Request Headers reference"),
                  createTextVNode(" for format rules, exact conditions, and validation requirements.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Related articles",
        title: "Read alongside"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/jwt-claims",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "JWT Claim Rules",
              desc: "Per-claim rules for the Request Object and Client Assertion sent to /par and /token."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/mtls-endpoint-aliases",
              category: "Security",
              "category-color": "var(--at-blue)",
              title: "mtls_endpoint_aliases",
              desc: "The mTLS-bound endpoint set returned by .well-known/openid-configuration."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/jwt-claims",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "JWT Claim Rules",
                desc: "Per-claim rules for the Request Object and Client Assertion sent to /par and /token."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/mtls-endpoint-aliases",
                category: "Security",
                "category-color": "var(--at-blue)",
                title: "mtls_endpoint_aliases",
                desc: "The mTLS-bound endpoint set returned by .well-known/openid-configuration."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/request-headers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const requestHeaders = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b2ffb48"]]);
export {
  requestHeaders as default
};

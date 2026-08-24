import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7$1 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tpp-context-block",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "ignore", label: "Safe to ignore" },
      { id: "useful", label: "When useful" },
      { id: "tpp", label: "tpp object" },
      { id: "ssa", label: "decodedSsa" },
      { id: "avoid", label: "What not to do" },
      { id: "where", label: "Where it appears" }
    ];
    const meta = [
      { label: "Category", value: "Integration" },
      { label: "Read", value: "7 min" },
      { label: "Updated", value: "21 Apr 2026" }
    ];
    const tags = ["TPP", "SSA", "Context"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdRefTable = __unplugin_components_12;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-946c13df>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/knowledge-base/",
        text: "All knowledge base articles"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Learn · Understand · Build",
        title: "The tpp and decodedSsa Context Blocks on Ozone Connect Calls",
        meta,
        lede: "Every request the API Hub forwards to your Ozone Connect endpoints carries a <code>tpp</code> object identifying the calling TPP, plus its decoded Software Statement Assertion (<code>decodedSsa</code>). None are required for payment execution — the Hub has already authenticated the TPP and validated entitlement — but the fields are passed through as <strong>context</strong> for audit logs, fraud signals, customer-facing display, compliance reports, and support investigations."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-946c13df${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-946c13df${_scopeId}>${ssrInterpolate(t)}</span>`);
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
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "ignore",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Safe to ignore",
        title: "When you don't need to do anything",
        lede: "The default position is: <strong>safely ignore everything in <code>tpp</code> and <code>decodedSsa</code></strong>. The Hub has already done the work that protects the LFI.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-946c13df${_scopeId2}>Verified the TPP&#39;s mTLS transport certificate against the Trust Framework directory</li><li data-v-946c13df${_scopeId2}>Verified the TPP&#39;s signing certificate against the SSA&#39;s <code data-v-946c13df${_scopeId2}>jwks_uri</code></li><li data-v-946c13df${_scopeId2}>Confirmed the TPP&#39;s role (<code data-v-946c13df${_scopeId2}>BSIP</code>, <code data-v-946c13df${_scopeId2}>BDSP</code>, etc.) entitles it to call this endpoint</li><li data-v-946c13df${_scopeId2}>Confirmed the consent referenced by the request belongs to this TPP</li>`);
                } else {
                  return [
                    createVNode("li", null, "Verified the TPP's mTLS transport certificate against the Trust Framework directory"),
                    createVNode("li", null, [
                      createTextVNode("Verified the TPP's signing certificate against the SSA's "),
                      createVNode("code", null, "jwks_uri")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Confirmed the TPP's role ("),
                      createVNode("code", null, "BSIP"),
                      createTextVNode(", "),
                      createVNode("code", null, "BDSP"),
                      createTextVNode(", etc.) entitles it to call this endpoint")
                    ]),
                    createVNode("li", null, "Confirmed the consent referenced by the request belongs to this TPP")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`If your LFI&#39;s payment processing logic does not look at <code data-v-946c13df${_scopeId2}>tpp</code> or <code data-v-946c13df${_scopeId2}>decodedSsa</code>, no rule is being broken. They are passed through so the LFI <strong data-v-946c13df${_scopeId2}>can</strong> consume them when it has a reason to — they are not a validation surface.`);
                } else {
                  return [
                    createTextVNode("If your LFI's payment processing logic does not look at "),
                    createVNode("code", null, "tpp"),
                    createTextVNode(" or "),
                    createVNode("code", null, "decodedSsa"),
                    createTextVNode(", no rule is being broken. They are passed through so the LFI "),
                    createVNode("strong", null, "can"),
                    createTextVNode(" consume them when it has a reason to — they are not a validation surface.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "Verified the TPP's mTLS transport certificate against the Trust Framework directory"),
                  createVNode("li", null, [
                    createTextVNode("Verified the TPP's signing certificate against the SSA's "),
                    createVNode("code", null, "jwks_uri")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Confirmed the TPP's role ("),
                    createVNode("code", null, "BSIP"),
                    createTextVNode(", "),
                    createVNode("code", null, "BDSP"),
                    createTextVNode(", etc.) entitles it to call this endpoint")
                  ]),
                  createVNode("li", null, "Confirmed the consent referenced by the request belongs to this TPP")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("If your LFI's payment processing logic does not look at "),
                  createVNode("code", null, "tpp"),
                  createTextVNode(" or "),
                  createVNode("code", null, "decodedSsa"),
                  createTextVNode(", no rule is being broken. They are passed through so the LFI "),
                  createVNode("strong", null, "can"),
                  createTextVNode(" consume them when it has a reason to — they are not a validation surface.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "useful",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "When useful",
        title: "Use cases per field",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-946c13df${_scopeId2}><thead data-v-946c13df${_scopeId2}><tr data-v-946c13df${_scopeId2}><th data-v-946c13df${_scopeId2}>Use case</th><th data-v-946c13df${_scopeId2}>What you&#39;d read</th></tr></thead><tbody data-v-946c13df${_scopeId2}><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Audit log enrichment</strong> — labelling each Ozone Connect call with the human-readable identity of the TPP that triggered it</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tpp.tppName</code>, <code data-v-946c13df${_scopeId2}>tpp.tppId</code>, <code data-v-946c13df${_scopeId2}>decodedSsa.client_name</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Customer-facing display</strong> — surfacing the TPP brand in app history (e.g. &quot;Payment initiated by Mario Money&quot;)</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>decodedSsa.client_name</code>, <code data-v-946c13df${_scopeId2}>decodedSsa.logo_uri</code>, <code data-v-946c13df${_scopeId2}>decodedSsa.client_uri</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Fraud and risk signals</strong> — feeding TPP identity, organisation, and roles into your scoring model</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tpp.clientId</code>, <code data-v-946c13df${_scopeId2}>tpp.orgId</code>, <code data-v-946c13df${_scopeId2}>decodedSsa.roles</code>, <code data-v-946c13df${_scopeId2}>decodedSsa.organisation_id</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Compliance / regulatory reporting</strong> — producing per-TPP volume and value reports for the CBUAE</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tpp.tppId</code>, <code data-v-946c13df${_scopeId2}>tpp.tppName</code>, <code data-v-946c13df${_scopeId2}>tpp.softwareStatementId</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Support investigations</strong> — correlating an incident to a specific TPP application without round-tripping through Nebras</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tpp.softwareStatementId</code>, <code data-v-946c13df${_scopeId2}>decodedSsa.client_id</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Privacy / right-to-be-forgotten</strong> — pinning the directory record at the moment of the call so the LFI can prove what was advertised about the TPP at that point in time</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tpp.directoryRecord</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Use case"),
                          createVNode("th", null, "What you'd read")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Audit log enrichment"),
                            createTextVNode(" — labelling each Ozone Connect call with the human-readable identity of the TPP that triggered it")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "tpp.tppName"),
                            createTextVNode(", "),
                            createVNode("code", null, "tpp.tppId"),
                            createTextVNode(", "),
                            createVNode("code", null, "decodedSsa.client_name")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Customer-facing display"),
                            createTextVNode(' — surfacing the TPP brand in app history (e.g. "Payment initiated by Mario Money")')
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "decodedSsa.client_name"),
                            createTextVNode(", "),
                            createVNode("code", null, "decodedSsa.logo_uri"),
                            createTextVNode(", "),
                            createVNode("code", null, "decodedSsa.client_uri")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Fraud and risk signals"),
                            createTextVNode(" — feeding TPP identity, organisation, and roles into your scoring model")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "tpp.clientId"),
                            createTextVNode(", "),
                            createVNode("code", null, "tpp.orgId"),
                            createTextVNode(", "),
                            createVNode("code", null, "decodedSsa.roles"),
                            createTextVNode(", "),
                            createVNode("code", null, "decodedSsa.organisation_id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Compliance / regulatory reporting"),
                            createTextVNode(" — producing per-TPP volume and value reports for the CBUAE")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "tpp.tppId"),
                            createTextVNode(", "),
                            createVNode("code", null, "tpp.tppName"),
                            createTextVNode(", "),
                            createVNode("code", null, "tpp.softwareStatementId")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Support investigations"),
                            createTextVNode(" — correlating an incident to a specific TPP application without round-tripping through Nebras")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "tpp.softwareStatementId"),
                            createTextVNode(", "),
                            createVNode("code", null, "decodedSsa.client_id")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Privacy / right-to-be-forgotten"),
                            createTextVNode(" — pinning the directory record at the moment of the call so the LFI can prove what was advertised about the TPP at that point in time")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "tpp.directoryRecord")
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
                        createVNode("th", null, "Use case"),
                        createVNode("th", null, "What you'd read")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Audit log enrichment"),
                          createTextVNode(" — labelling each Ozone Connect call with the human-readable identity of the TPP that triggered it")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "tpp.tppName"),
                          createTextVNode(", "),
                          createVNode("code", null, "tpp.tppId"),
                          createTextVNode(", "),
                          createVNode("code", null, "decodedSsa.client_name")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Customer-facing display"),
                          createTextVNode(' — surfacing the TPP brand in app history (e.g. "Payment initiated by Mario Money")')
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "decodedSsa.client_name"),
                          createTextVNode(", "),
                          createVNode("code", null, "decodedSsa.logo_uri"),
                          createTextVNode(", "),
                          createVNode("code", null, "decodedSsa.client_uri")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Fraud and risk signals"),
                          createTextVNode(" — feeding TPP identity, organisation, and roles into your scoring model")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "tpp.clientId"),
                          createTextVNode(", "),
                          createVNode("code", null, "tpp.orgId"),
                          createTextVNode(", "),
                          createVNode("code", null, "decodedSsa.roles"),
                          createTextVNode(", "),
                          createVNode("code", null, "decodedSsa.organisation_id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Compliance / regulatory reporting"),
                          createTextVNode(" — producing per-TPP volume and value reports for the CBUAE")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "tpp.tppId"),
                          createTextVNode(", "),
                          createVNode("code", null, "tpp.tppName"),
                          createTextVNode(", "),
                          createVNode("code", null, "tpp.softwareStatementId")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Support investigations"),
                          createTextVNode(" — correlating an incident to a specific TPP application without round-tripping through Nebras")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "tpp.softwareStatementId"),
                          createTextVNode(", "),
                          createVNode("code", null, "decodedSsa.client_id")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Privacy / right-to-be-forgotten"),
                          createTextVNode(" — pinning the directory record at the moment of the call so the LFI can prove what was advertised about the TPP at that point in time")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "tpp.directoryRecord")
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
        id: "tpp",
        num: "03",
        color: "var(--at-blue)",
        eyebrow: "The tpp object",
        title: "Field reference",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-946c13df${_scopeId2}><thead data-v-946c13df${_scopeId2}><tr data-v-946c13df${_scopeId2}><th data-v-946c13df${_scopeId2}>Field</th><th data-v-946c13df${_scopeId2}>Type</th><th data-v-946c13df${_scopeId2}>Required</th><th data-v-946c13df${_scopeId2}>Description</th><th data-v-946c13df${_scopeId2}>Example</th></tr></thead><tbody data-v-946c13df${_scopeId2}><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>clientId</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>Yes</td><td data-v-946c13df${_scopeId2}>The OIDC client identifier issued to the TPP by the Trust Framework. Stable for the life of the TPP application.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>1675793e-d6e3-4954-96c8-acb9aaa83c53</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>orgId</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>Yes</td><td data-v-946c13df${_scopeId2}>The organisation identifier issued to the TPP&#39;s parent organisation by the Trust Framework. One organisation may own many <code data-v-946c13df${_scopeId2}>clientId</code>s.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>a1b2c3d4-e5f6-7890-abcd-ef0123456789</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tppId</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>Yes</td><td data-v-946c13df${_scopeId2}>The identifier the API Hub uses internally to uniquely identify the TPP. Useful when raising support cases with Nebras.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tppName</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>Yes</td><td data-v-946c13df${_scopeId2}>The TPP&#39;s registered name as recorded in the Trust Framework.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>Example TPP</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>softwareStatementId</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>Yes</td><td data-v-946c13df${_scopeId2}>The identifier of the specific software statement (i.e. the registered application) being used. A single <code data-v-946c13df${_scopeId2}>clientId</code> may have multiple software statements over time.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>XvAjPeeYZAdWwrFF..</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>directoryRecord</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>The full TPP directory record retrieved from the CBUAE Trust Framework directory at the time of the call, encoded as a Base64 string. Only present when the Hub fetched it for this request.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>eyJhbW91bnQiOiIxMDAuMDAi..</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>decodedSsa</code></td><td data-v-946c13df${_scopeId2}>object</td><td data-v-946c13df${_scopeId2}>Yes</td><td data-v-946c13df${_scopeId2}>The decoded Software Statement Assertion — see the next section.</td><td data-v-946c13df${_scopeId2}>—</td></tr></tbody></table>`);
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
                            createVNode("code", null, "clientId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The OIDC client identifier issued to the TPP by the Trust Framework. Stable for the life of the TPP application."),
                          createVNode("td", null, [
                            createVNode("code", null, "1675793e-d6e3-4954-96c8-acb9aaa83c53")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "orgId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The organisation identifier issued to the TPP's parent organisation by the Trust Framework. One organisation may own many "),
                            createVNode("code", null, "clientId"),
                            createTextVNode("s.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "a1b2c3d4-e5f6-7890-abcd-ef0123456789")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "tppId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The identifier the API Hub uses internally to uniquely identify the TPP. Useful when raising support cases with Nebras."),
                          createVNode("td", null, [
                            createVNode("code", null, "fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "tppName")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The TPP's registered name as recorded in the Trust Framework."),
                          createVNode("td", null, [
                            createVNode("code", null, "Example TPP")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "softwareStatementId")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("The identifier of the specific software statement (i.e. the registered application) being used. A single "),
                            createVNode("code", null, "clientId"),
                            createTextVNode(" may have multiple software statements over time.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "XvAjPeeYZAdWwrFF..")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "directoryRecord")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "The full TPP directory record retrieved from the CBUAE Trust Framework directory at the time of the call, encoded as a Base64 string. Only present when the Hub fetched it for this request."),
                          createVNode("td", null, [
                            createVNode("code", null, "eyJhbW91bnQiOiIxMDAuMDAi..")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "decodedSsa")
                          ]),
                          createVNode("td", null, "object"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, "The decoded Software Statement Assertion — see the next section."),
                          createVNode("td", null, "—")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-946c13df${_scopeId}><code data-v-946c13df${_scopeId}>clientId</code> vs <code data-v-946c13df${_scopeId}>tppId</code> vs <code data-v-946c13df${_scopeId}>softwareStatementId</code></h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`These three identifiers commonly cause confusion. The mental model:`);
                } else {
                  return [
                    createTextVNode("These three identifiers commonly cause confusion. The mental model:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>clientId</code></strong> — issued by the Trust Framework when the TPP registers an OIDC client. This is the value the TPP uses as <code data-v-946c13df${_scopeId2}>iss</code> and <code data-v-946c13df${_scopeId2}>sub</code> on its client assertions, and what the API Hub records against tokens.</li><li data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>softwareStatementId</code></strong> — issued by the Trust Framework when the TPP registers a <em data-v-946c13df${_scopeId2}>specific application</em> (the SSA). One <code data-v-946c13df${_scopeId2}>clientId</code> typically has one active SSA, but the SSA can be re-issued (for example after rotating keys) without a new <code data-v-946c13df${_scopeId2}>clientId</code>.</li><li data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>tppId</code></strong> — the Hub&#39;s internal identifier. Use this when raising tickets with Nebras; use <code data-v-946c13df${_scopeId2}>clientId</code> or <code data-v-946c13df${_scopeId2}>softwareStatementId</code> when correlating with anything published in the Trust Framework.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "clientId")
                      ]),
                      createTextVNode(" — issued by the Trust Framework when the TPP registers an OIDC client. This is the value the TPP uses as "),
                      createVNode("code", null, "iss"),
                      createTextVNode(" and "),
                      createVNode("code", null, "sub"),
                      createTextVNode(" on its client assertions, and what the API Hub records against tokens.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "softwareStatementId")
                      ]),
                      createTextVNode(" — issued by the Trust Framework when the TPP registers a "),
                      createVNode("em", null, "specific application"),
                      createTextVNode(" (the SSA). One "),
                      createVNode("code", null, "clientId"),
                      createTextVNode(" typically has one active SSA, but the SSA can be re-issued (for example after rotating keys) without a new "),
                      createVNode("code", null, "clientId"),
                      createTextVNode(".")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createVNode("code", null, "tppId")
                      ]),
                      createTextVNode(" — the Hub's internal identifier. Use this when raising tickets with Nebras; use "),
                      createVNode("code", null, "clientId"),
                      createTextVNode(" or "),
                      createVNode("code", null, "softwareStatementId"),
                      createTextVNode(" when correlating with anything published in the Trust Framework.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`For audit logging, log all three. They cost nothing to store and answer different questions later.`);
                } else {
                  return [
                    createTextVNode("For audit logging, log all three. They cost nothing to store and answer different questions later.")
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
                          createVNode("code", null, "clientId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The OIDC client identifier issued to the TPP by the Trust Framework. Stable for the life of the TPP application."),
                        createVNode("td", null, [
                          createVNode("code", null, "1675793e-d6e3-4954-96c8-acb9aaa83c53")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "orgId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The organisation identifier issued to the TPP's parent organisation by the Trust Framework. One organisation may own many "),
                          createVNode("code", null, "clientId"),
                          createTextVNode("s.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "a1b2c3d4-e5f6-7890-abcd-ef0123456789")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "tppId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The identifier the API Hub uses internally to uniquely identify the TPP. Useful when raising support cases with Nebras."),
                        createVNode("td", null, [
                          createVNode("code", null, "fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "tppName")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The TPP's registered name as recorded in the Trust Framework."),
                        createVNode("td", null, [
                          createVNode("code", null, "Example TPP")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "softwareStatementId")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("The identifier of the specific software statement (i.e. the registered application) being used. A single "),
                          createVNode("code", null, "clientId"),
                          createTextVNode(" may have multiple software statements over time.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "XvAjPeeYZAdWwrFF..")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "directoryRecord")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "The full TPP directory record retrieved from the CBUAE Trust Framework directory at the time of the call, encoded as a Base64 string. Only present when the Hub fetched it for this request."),
                        createVNode("td", null, [
                          createVNode("code", null, "eyJhbW91bnQiOiIxMDAuMDAi..")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "decodedSsa")
                        ]),
                        createVNode("td", null, "object"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, "The decoded Software Statement Assertion — see the next section."),
                        createVNode("td", null, "—")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, [
                createVNode("code", null, "clientId"),
                createTextVNode(" vs "),
                createVNode("code", null, "tppId"),
                createTextVNode(" vs "),
                createVNode("code", null, "softwareStatementId")
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("These three identifiers commonly cause confusion. The mental model:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "clientId")
                    ]),
                    createTextVNode(" — issued by the Trust Framework when the TPP registers an OIDC client. This is the value the TPP uses as "),
                    createVNode("code", null, "iss"),
                    createTextVNode(" and "),
                    createVNode("code", null, "sub"),
                    createTextVNode(" on its client assertions, and what the API Hub records against tokens.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "softwareStatementId")
                    ]),
                    createTextVNode(" — issued by the Trust Framework when the TPP registers a "),
                    createVNode("em", null, "specific application"),
                    createTextVNode(" (the SSA). One "),
                    createVNode("code", null, "clientId"),
                    createTextVNode(" typically has one active SSA, but the SSA can be re-issued (for example after rotating keys) without a new "),
                    createVNode("code", null, "clientId"),
                    createTextVNode(".")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createVNode("code", null, "tppId")
                    ]),
                    createTextVNode(" — the Hub's internal identifier. Use this when raising tickets with Nebras; use "),
                    createVNode("code", null, "clientId"),
                    createTextVNode(" or "),
                    createVNode("code", null, "softwareStatementId"),
                    createTextVNode(" when correlating with anything published in the Trust Framework.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("For audit logging, log all three. They cost nothing to store and answer different questions later.")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "ssa",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "The decodedSsa object",
        title: "Field reference",
        lede: "The Software Statement Assertion is a JWT signed by the Trust Framework that asserts a TPP's identity, the public key set used to verify its requests, and the OAuth metadata for its registered application. The Hub verifies the SSA's signature on every request and forwards the decoded claims under <code>decodedSsa</code>.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-946c13df${_scopeId2}><thead data-v-946c13df${_scopeId2}><tr data-v-946c13df${_scopeId2}><th data-v-946c13df${_scopeId2}>Field</th><th data-v-946c13df${_scopeId2}>Type</th><th data-v-946c13df${_scopeId2}>Required</th><th data-v-946c13df${_scopeId2}>Description</th><th data-v-946c13df${_scopeId2}>Example</th></tr></thead><tbody data-v-946c13df${_scopeId2}><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>client_id</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>Yes</td><td data-v-946c13df${_scopeId2}>Globally unique TPP client identifier issued by the Trust Framework. Matches <code data-v-946c13df${_scopeId2}>tpp.clientId</code>.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>1675793e-d6e3-4954-96c8-acb9aaa83c53</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>client_name</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>Human-readable name of the client as the TPP wants it displayed to end users during authorization flows. Suitable for surfacing in customer-facing app history.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>Example TPP</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>client_uri</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>Home page URI of the TPP&#39;s client application. Suitable for linking from a &quot;Connected apps&quot; screen.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>https://example.com</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>logo_uri</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>URL of the TPP&#39;s logo. Suitable for inline display next to historical activity.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>https://example.com/logo.png</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>jwks_uri</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>URL where the TPP&#39;s JSON Web Key Set is hosted. The Hub uses this to verify the TPP&#39;s signed requests; the LFI does <strong data-v-946c13df${_scopeId2}>not</strong> need to fetch it.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>https://example.com/jwks.json</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>redirect_uris</code></td><td data-v-946c13df${_scopeId2}>array of string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>The OAuth redirect endpoints registered for this client. Useful for a sanity check during incident response — never call them directly from the LFI.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>[&quot;https://example.com/callback&quot;]</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>roles</code></td><td data-v-946c13df${_scopeId2}>array of string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>The Open Finance roles the TPP is entitled to. The presence of <code data-v-946c13df${_scopeId2}>BSIP</code> (payment initiation), <code data-v-946c13df${_scopeId2}>BDSP</code> (data sharing), etc. tells you what categories of API the TPP can call.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>[&quot;BSIP&quot;, &quot;BDSP&quot;]</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>sector_identifier_uri</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>OIDC sector identifier URI used for pairwise subject identifiers. Rarely consumed by an LFI.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>https://example.com/sector</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>application_type</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>OAuth application type — <code data-v-946c13df${_scopeId2}>web</code> or <code data-v-946c13df${_scopeId2}>native</code>. Can feed into device-aware fraud rules.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>web</code></td></tr><tr data-v-946c13df${_scopeId2}><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>organisation_id</code></td><td data-v-946c13df${_scopeId2}>string</td><td data-v-946c13df${_scopeId2}>No</td><td data-v-946c13df${_scopeId2}>Identifier of the organisation that owns the client. Matches <code data-v-946c13df${_scopeId2}>tpp.orgId</code>.</td><td data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>org-1234</code></td></tr></tbody></table>`);
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
                            createVNode("code", null, "client_id")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "Yes"),
                          createVNode("td", null, [
                            createTextVNode("Globally unique TPP client identifier issued by the Trust Framework. Matches "),
                            createVNode("code", null, "tpp.clientId"),
                            createTextVNode(".")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "1675793e-d6e3-4954-96c8-acb9aaa83c53")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "client_name")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "Human-readable name of the client as the TPP wants it displayed to end users during authorization flows. Suitable for surfacing in customer-facing app history."),
                          createVNode("td", null, [
                            createVNode("code", null, "Example TPP")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "client_uri")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, `Home page URI of the TPP's client application. Suitable for linking from a "Connected apps" screen.`),
                          createVNode("td", null, [
                            createVNode("code", null, "https://example.com")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "logo_uri")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "URL of the TPP's logo. Suitable for inline display next to historical activity."),
                          createVNode("td", null, [
                            createVNode("code", null, "https://example.com/logo.png")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "jwks_uri")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("URL where the TPP's JSON Web Key Set is hosted. The Hub uses this to verify the TPP's signed requests; the LFI does "),
                            createVNode("strong", null, "not"),
                            createTextVNode(" need to fetch it.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "https://example.com/jwks.json")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "redirect_uris")
                          ]),
                          createVNode("td", null, "array of string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "The OAuth redirect endpoints registered for this client. Useful for a sanity check during incident response — never call them directly from the LFI."),
                          createVNode("td", null, [
                            createVNode("code", null, '["https://example.com/callback"]')
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "roles")
                          ]),
                          createVNode("td", null, "array of string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("The Open Finance roles the TPP is entitled to. The presence of "),
                            createVNode("code", null, "BSIP"),
                            createTextVNode(" (payment initiation), "),
                            createVNode("code", null, "BDSP"),
                            createTextVNode(" (data sharing), etc. tells you what categories of API the TPP can call.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, '["BSIP", "BDSP"]')
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "sector_identifier_uri")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, "OIDC sector identifier URI used for pairwise subject identifiers. Rarely consumed by an LFI."),
                          createVNode("td", null, [
                            createVNode("code", null, "https://example.com/sector")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "application_type")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("OAuth application type — "),
                            createVNode("code", null, "web"),
                            createTextVNode(" or "),
                            createVNode("code", null, "native"),
                            createTextVNode(". Can feed into device-aware fraud rules.")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "web")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("code", null, "organisation_id")
                          ]),
                          createVNode("td", null, "string"),
                          createVNode("td", null, "No"),
                          createVNode("td", null, [
                            createTextVNode("Identifier of the organisation that owns the client. Matches "),
                            createVNode("code", null, "tpp.orgId"),
                            createTextVNode(".")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "org-1234")
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Display fields are TPP-controlled"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-946c13df${_scopeId2}><code data-v-946c13df${_scopeId2}>client_name</code>, <code data-v-946c13df${_scopeId2}>client_uri</code>, and <code data-v-946c13df${_scopeId2}>logo_uri</code> are values the TPP set when it registered the SSA. They are signed by the Trust Framework, so they have not been tampered with in transit, but the LFI is trusting that the Trust Framework&#39;s onboarding controls are sufficient for these to be safe to display to customers. Treat them as trusted display strings, not as authoritative identifiers — use <code data-v-946c13df${_scopeId2}>client_id</code> / <code data-v-946c13df${_scopeId2}>tpp.tppId</code> for anything that needs to be a primary key.</p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createVNode("code", null, "client_name"),
                      createTextVNode(", "),
                      createVNode("code", null, "client_uri"),
                      createTextVNode(", and "),
                      createVNode("code", null, "logo_uri"),
                      createTextVNode(" are values the TPP set when it registered the SSA. They are signed by the Trust Framework, so they have not been tampered with in transit, but the LFI is trusting that the Trust Framework's onboarding controls are sufficient for these to be safe to display to customers. Treat them as trusted display strings, not as authoritative identifiers — use "),
                      createVNode("code", null, "client_id"),
                      createTextVNode(" / "),
                      createVNode("code", null, "tpp.tppId"),
                      createTextVNode(" for anything that needs to be a primary key.")
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
                          createVNode("code", null, "client_id")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "Yes"),
                        createVNode("td", null, [
                          createTextVNode("Globally unique TPP client identifier issued by the Trust Framework. Matches "),
                          createVNode("code", null, "tpp.clientId"),
                          createTextVNode(".")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "1675793e-d6e3-4954-96c8-acb9aaa83c53")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "client_name")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "Human-readable name of the client as the TPP wants it displayed to end users during authorization flows. Suitable for surfacing in customer-facing app history."),
                        createVNode("td", null, [
                          createVNode("code", null, "Example TPP")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "client_uri")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, `Home page URI of the TPP's client application. Suitable for linking from a "Connected apps" screen.`),
                        createVNode("td", null, [
                          createVNode("code", null, "https://example.com")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "logo_uri")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "URL of the TPP's logo. Suitable for inline display next to historical activity."),
                        createVNode("td", null, [
                          createVNode("code", null, "https://example.com/logo.png")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "jwks_uri")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("URL where the TPP's JSON Web Key Set is hosted. The Hub uses this to verify the TPP's signed requests; the LFI does "),
                          createVNode("strong", null, "not"),
                          createTextVNode(" need to fetch it.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "https://example.com/jwks.json")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "redirect_uris")
                        ]),
                        createVNode("td", null, "array of string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "The OAuth redirect endpoints registered for this client. Useful for a sanity check during incident response — never call them directly from the LFI."),
                        createVNode("td", null, [
                          createVNode("code", null, '["https://example.com/callback"]')
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "roles")
                        ]),
                        createVNode("td", null, "array of string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("The Open Finance roles the TPP is entitled to. The presence of "),
                          createVNode("code", null, "BSIP"),
                          createTextVNode(" (payment initiation), "),
                          createVNode("code", null, "BDSP"),
                          createTextVNode(" (data sharing), etc. tells you what categories of API the TPP can call.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, '["BSIP", "BDSP"]')
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "sector_identifier_uri")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, "OIDC sector identifier URI used for pairwise subject identifiers. Rarely consumed by an LFI."),
                        createVNode("td", null, [
                          createVNode("code", null, "https://example.com/sector")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "application_type")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("OAuth application type — "),
                          createVNode("code", null, "web"),
                          createTextVNode(" or "),
                          createVNode("code", null, "native"),
                          createTextVNode(". Can feed into device-aware fraud rules.")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "web")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("code", null, "organisation_id")
                        ]),
                        createVNode("td", null, "string"),
                        createVNode("td", null, "No"),
                        createVNode("td", null, [
                          createTextVNode("Identifier of the organisation that owns the client. Matches "),
                          createVNode("code", null, "tpp.orgId"),
                          createTextVNode(".")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "org-1234")
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Display fields are TPP-controlled"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createVNode("code", null, "client_name"),
                    createTextVNode(", "),
                    createVNode("code", null, "client_uri"),
                    createTextVNode(", and "),
                    createVNode("code", null, "logo_uri"),
                    createTextVNode(" are values the TPP set when it registered the SSA. They are signed by the Trust Framework, so they have not been tampered with in transit, but the LFI is trusting that the Trust Framework's onboarding controls are sufficient for these to be safe to display to customers. Treat them as trusted display strings, not as authoritative identifiers — use "),
                    createVNode("code", null, "client_id"),
                    createTextVNode(" / "),
                    createVNode("code", null, "tpp.tppId"),
                    createTextVNode(" for anything that needs to be a primary key.")
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
        id: "avoid",
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "What not to do",
        title: "What an LFI should not do with these fields",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Do not re-authenticate the TPP.</strong> The Hub has already verified the SSA&#39;s signature, the TPP&#39;s mTLS certificate, and the consent ownership. There is no scenario where re-fetching <code data-v-946c13df${_scopeId2}>jwks_uri</code> from the LFI side adds security.</li><li data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Do not enforce role checks the Hub already enforces.</strong> If <code data-v-946c13df${_scopeId2}>decodedSsa.roles</code> does not include the role required for the endpoint, the request would not have reached your Ozone Connect surface in the first place.</li><li data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Do not call any URI in the SSA from the LFI.</strong> <code data-v-946c13df${_scopeId2}>client_uri</code>, <code data-v-946c13df${_scopeId2}>redirect_uris</code>, <code data-v-946c13df${_scopeId2}>sector_identifier_uri</code>, and <code data-v-946c13df${_scopeId2}>jwks_uri</code> are TPP-controlled URLs. The only system that should fetch them is the API Hub.</li><li data-v-946c13df${_scopeId2}><strong data-v-946c13df${_scopeId2}>Do not reject requests for missing optional fields.</strong> Optional means optional; the TPP may legitimately not have set them at registration time.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Do not re-authenticate the TPP."),
                      createTextVNode(" The Hub has already verified the SSA's signature, the TPP's mTLS certificate, and the consent ownership. There is no scenario where re-fetching "),
                      createVNode("code", null, "jwks_uri"),
                      createTextVNode(" from the LFI side adds security.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Do not enforce role checks the Hub already enforces."),
                      createTextVNode(" If "),
                      createVNode("code", null, "decodedSsa.roles"),
                      createTextVNode(" does not include the role required for the endpoint, the request would not have reached your Ozone Connect surface in the first place.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Do not call any URI in the SSA from the LFI."),
                      createTextVNode(),
                      createVNode("code", null, "client_uri"),
                      createTextVNode(", "),
                      createVNode("code", null, "redirect_uris"),
                      createTextVNode(", "),
                      createVNode("code", null, "sector_identifier_uri"),
                      createTextVNode(", and "),
                      createVNode("code", null, "jwks_uri"),
                      createTextVNode(" are TPP-controlled URLs. The only system that should fetch them is the API Hub.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Do not reject requests for missing optional fields."),
                      createTextVNode(" Optional means optional; the TPP may legitimately not have set them at registration time.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Do not re-authenticate the TPP."),
                    createTextVNode(" The Hub has already verified the SSA's signature, the TPP's mTLS certificate, and the consent ownership. There is no scenario where re-fetching "),
                    createVNode("code", null, "jwks_uri"),
                    createTextVNode(" from the LFI side adds security.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Do not enforce role checks the Hub already enforces."),
                    createTextVNode(" If "),
                    createVNode("code", null, "decodedSsa.roles"),
                    createTextVNode(" does not include the role required for the endpoint, the request would not have reached your Ozone Connect surface in the first place.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Do not call any URI in the SSA from the LFI."),
                    createTextVNode(),
                    createVNode("code", null, "client_uri"),
                    createTextVNode(", "),
                    createVNode("code", null, "redirect_uris"),
                    createTextVNode(", "),
                    createVNode("code", null, "sector_identifier_uri"),
                    createTextVNode(", and "),
                    createVNode("code", null, "jwks_uri"),
                    createTextVNode(" are TPP-controlled URLs. The only system that should fetch them is the API Hub.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Do not reject requests for missing optional fields."),
                    createTextVNode(" Optional means optional; the TPP may legitimately not have set them at registration time.")
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
        id: "where",
        num: "06",
        color: "var(--at-teal-deep)",
        eyebrow: "Where it appears",
        title: "Identical across every Ozone Connect endpoint",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The same <code data-v-946c13df${_scopeId2}>tpp</code> and <code data-v-946c13df${_scopeId2}>decodedSsa</code> blocks are present on every Ozone Connect endpoint the API Hub calls — including all payment-initiation endpoints (Single Instant Payment and every Multi-Payment variant), data-sharing endpoints, and consent-action callbacks. The schema is identical across all of them. If your LFI builds a single helper to extract and log this block, the same helper will work everywhere.`);
                } else {
                  return [
                    createTextVNode("The same "),
                    createVNode("code", null, "tpp"),
                    createTextVNode(" and "),
                    createVNode("code", null, "decodedSsa"),
                    createTextVNode(" blocks are present on every Ozone Connect endpoint the API Hub calls — including all payment-initiation endpoints (Single Instant Payment and every Multi-Payment variant), data-sharing endpoints, and consent-action callbacks. The schema is identical across all of them. If your LFI builds a single helper to extract and log this block, the same helper will work everywhere.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("The same "),
                  createVNode("code", null, "tpp"),
                  createTextVNode(" and "),
                  createVNode("code", null, "decodedSsa"),
                  createTextVNode(" blocks are present on every Ozone Connect endpoint the API Hub calls — including all payment-initiation endpoints (Single Instant Payment and every Multi-Payment variant), data-sharing endpoints, and consent-action callbacks. The schema is identical across all of them. If your LFI builds a single helper to extract and log this block, the same helper will work everywhere.")
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
              href: "/knowledge-base/articles/multi-segment-api-hubs",
              category: "Integration",
              "category-color": "var(--at-blue-deep)",
              title: "Multi-Segment API Hubs",
              desc: "How segments share an Ozone Connect via o3-provider-id."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/knowledge-base/articles/identity-assurance-claims",
              category: "Integration",
              "category-color": "var(--at-blue-deep)",
              title: "Identity Assurance Claims",
              desc: "The OIDC IDA envelope used for customer-returning endpoints."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/multi-segment-api-hubs",
                category: "Integration",
                "category-color": "var(--at-blue-deep)",
                title: "Multi-Segment API Hubs",
                desc: "How segments share an Ozone Connect via o3-provider-id."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/knowledge-base/articles/identity-assurance-claims",
                category: "Integration",
                "category-color": "var(--at-blue-deep)",
                title: "Identity Assurance Claims",
                desc: "The OIDC IDA envelope used for customer-returning endpoints."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/knowledge-base/articles/tpp-context-block.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tppContextBlock = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-946c13df"]]);
export {
  tppContextBlock as default
};

import { _ as __unplugin_components_5 } from "./EdNote-61YjJPRT.js";
import { E as EdCode } from "./EdCode-DdFAg-H5.js";
import { _ as __unplugin_components_6 } from "./EdBullets-gB3sPgIp.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-DD63-Oxz.js";
import { _ as __unplugin_components_4 } from "./EdProse-D3vi_RS_.js";
import { _ as __unplugin_components_2 } from "./EdInPageNav-DkIq-w7S.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-BRdU9xqH.js";
import { _ as __unplugin_components_0 } from "./EdBackStrip-CrlwbtLm.js";
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const OG_TITLE = "Date & Time Handling Across the Standard";
const OG_DESCRIPTION = "Every date-time in the standard is an instant, not a wall clock. What TPPs must send, what LFIs must accept, and how to verify your normalisation. Draft article attached to OFP-014.";
const equivalentEncodings = `2027-07-22T00:00:00Z
2027-07-22T00:00:00.000Z
2027-07-22T00:00:00+00:00
2027-07-22T00:00:00.000+00:00
2027-07-22T04:00:00+04:00

# Five encodings. One instant. A conforming implementation
# resolves all five to the same moment.`;
const selfTest = `2027-07-22T00:00:00Z
2027-07-22T04:00:00+04:00

# The same moment, written two ways. If your system behaves
# differently for these two, it is not applying the offset.`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "knowledge-base-article",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "OFP-014 · Date & Time Handling Across the Standard (draft article)",
      meta: [
        { property: "og:title", content: `${OG_TITLE} | UAE Open Finance` },
        { property: "og:description", content: OG_DESCRIPTION },
        { name: "twitter:description", content: OG_DESCRIPTION }
      ]
    });
    const sections = [
      { id: "model", label: "The model" },
      { id: "tpp", label: "For TPPs" },
      { id: "lfi", label: "For LFIs" },
      { id: "vectors", label: "Test vectors" }
    ];
    const meta = [
      { label: "Category", value: "Integration" },
      { label: "Read", value: "5 min" },
      { label: "Status", value: "Draft · OFP-014" }
    ];
    const tags = ["Data Sharing", "Consents", "Ozone Connect"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdBullets = __unplugin_components_6;
      const _component_EdCode = EdCode;
      const _component_EdNote = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-e1e041d5>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/proposals/ofp-014",
        text: "Back to OFP-014"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Draft · Proposed for publication with OFP-014",
        title: "Date & Time Handling Across the Standard",
        meta,
        lede: "Every date-time field in the standard identifies <strong>an instant in time</strong>, not a wall-clock reading. The same instant has many valid spellings, and all of them must behave identically. Getting this wrong produces errors that are invisible at long time horizons and severe at short ones."
      }, {
        lede: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ed-tags" data-v-e1e041d5${_scopeId}><!--[-->`);
            ssrRenderList(tags, (t) => {
              _push2(`<span class="ed-tag" data-v-e1e041d5${_scopeId}>${ssrInterpolate(t)}</span>`);
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
      _push(`<div class="ed-page__intro" data-v-e1e041d5>`);
      _push(ssrRenderComponent(_component_EdProse, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` This article is a <strong data-v-e1e041d5${_scopeId}>draft attached to OFP-014</strong>. It sets out how to produce and consume date-times across the standard, and publishes to the knowledge base if that proposal is agreed. The date-range <em data-v-e1e041d5${_scopeId}>query parameters</em> on the transaction and statement list endpoints are specified separately and are not covered here. `);
          } else {
            return [
              createTextVNode(" This article is a "),
              createVNode("strong", null, "draft attached to OFP-014"),
              createTextVNode(". It sets out how to produce and consume date-times across the standard, and publishes to the knowledge base if that proposal is agreed. The date-range "),
              createVNode("em", null, "query parameters"),
              createTextVNode(" on the transaction and statement list endpoints are specified separately and are not covered here. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "model",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "The model",
        title: "A date-time is an instant, not a wall clock",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Date-time fields across the standard — <code data-v-e1e041d5${_scopeId2}>ExpirationDateTime</code>, <code data-v-e1e041d5${_scopeId2}>CreationDateTime</code>, <code data-v-e1e041d5${_scopeId2}>TransactionDateTime</code>, <code data-v-e1e041d5${_scopeId2}>BookingDateTime</code>, <code data-v-e1e041d5${_scopeId2}>ValueDateTime</code> and the rest — are defined as <code data-v-e1e041d5${_scopeId2}>type: string</code>, <code data-v-e1e041d5${_scopeId2}>format: date-time</code>: an ISO 8601 / RFC 3339 date-time carrying a mandatory timezone offset. Three rules follow, and everything else here is a consequence of them. `);
                } else {
                  return [
                    createTextVNode(" Date-time fields across the standard — "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(", "),
                    createVNode("code", null, "CreationDateTime"),
                    createTextVNode(", "),
                    createVNode("code", null, "TransactionDateTime"),
                    createTextVNode(", "),
                    createVNode("code", null, "BookingDateTime"),
                    createTextVNode(", "),
                    createVNode("code", null, "ValueDateTime"),
                    createTextVNode(" and the rest — are defined as "),
                    createVNode("code", null, "type: string"),
                    createTextVNode(", "),
                    createVNode("code", null, "format: date-time"),
                    createTextVNode(": an ISO 8601 / RFC 3339 date-time carrying a mandatory timezone offset. Three rules follow, and everything else here is a consequence of them. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>A date-time is an instant.</strong> The offset is part of the value, not decoration.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>Equivalent representations MUST behave identically.</strong> Two encodings of the same moment are the same value.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>The offset is mandatory.</strong> A value without one is not valid against the standard and MUST NOT be produced.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "A date-time is an instant."),
                      createTextVNode(" The offset is part of the value, not decoration.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Equivalent representations MUST behave identically."),
                      createTextVNode(" Two encodings of the same moment are the same value.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "The offset is mandatory."),
                      createTextVNode(" A value without one is not valid against the standard and MUST NOT be produced.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: equivalentEncodings,
              lang: "text",
              filename: "Five spellings of one moment"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-e1e041d5${_scopeId2}>Why this matters more than it looks.</strong> The UAE is UTC+04:00. An implementation that reads the digits and ignores the offset resolves a UTC value to an instant <strong data-v-e1e041d5${_scopeId2}>four hours earlier</strong> than intended. At a thirty-day consent expiry that error is invisible. At a one-hour expiry the consent is already expired on arrival. The bug does not announce itself — it ships, and surfaces later as an unreproducible customer complaint. `);
                } else {
                  return [
                    createVNode("strong", null, "Why this matters more than it looks."),
                    createTextVNode(" The UAE is UTC+04:00. An implementation that reads the digits and ignores the offset resolves a UTC value to an instant "),
                    createVNode("strong", null, "four hours earlier"),
                    createTextVNode(" than intended. At a thirty-day consent expiry that error is invisible. At a one-hour expiry the consent is already expired on arrival. The bug does not announce itself — it ships, and surfaces later as an unreproducible customer complaint. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "warning",
              title: "Do not rely on your counterparty, or on the platform, to normalise for you"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e1e041d5${_scopeId2}> Normalise at your own boundary, on the way in. Treat every date-time you receive as a string that must be parsed into an instant before it is used, stored, or compared. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Normalise at your own boundary, on the way in. Treat every date-time you receive as a string that must be parsed into an instant before it is used, stored, or compared. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Date-time fields across the standard — "),
                  createVNode("code", null, "ExpirationDateTime"),
                  createTextVNode(", "),
                  createVNode("code", null, "CreationDateTime"),
                  createTextVNode(", "),
                  createVNode("code", null, "TransactionDateTime"),
                  createTextVNode(", "),
                  createVNode("code", null, "BookingDateTime"),
                  createTextVNode(", "),
                  createVNode("code", null, "ValueDateTime"),
                  createTextVNode(" and the rest — are defined as "),
                  createVNode("code", null, "type: string"),
                  createTextVNode(", "),
                  createVNode("code", null, "format: date-time"),
                  createTextVNode(": an ISO 8601 / RFC 3339 date-time carrying a mandatory timezone offset. Three rules follow, and everything else here is a consequence of them. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "A date-time is an instant."),
                    createTextVNode(" The offset is part of the value, not decoration.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Equivalent representations MUST behave identically."),
                    createTextVNode(" Two encodings of the same moment are the same value.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "The offset is mandatory."),
                    createTextVNode(" A value without one is not valid against the standard and MUST NOT be produced.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: equivalentEncodings,
                lang: "text",
                filename: "Five spellings of one moment"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Why this matters more than it looks."),
                  createTextVNode(" The UAE is UTC+04:00. An implementation that reads the digits and ignores the offset resolves a UTC value to an instant "),
                  createVNode("strong", null, "four hours earlier"),
                  createTextVNode(" than intended. At a thirty-day consent expiry that error is invisible. At a one-hour expiry the consent is already expired on arrival. The bug does not announce itself — it ships, and surfaces later as an unreproducible customer complaint. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "warning",
                title: "Do not rely on your counterparty, or on the platform, to normalise for you"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Normalise at your own boundary, on the way in. Treat every date-time you receive as a string that must be parsed into an instant before it is used, stored, or compared. ")
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
        num: "02",
        color: "var(--at-blue)",
        eyebrow: "For TPPs",
        title: "What to send, and how to read what comes back",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-e1e041d5${_scopeId2}>Sending</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Sending")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>SHOULD emit UTC</strong> — <code data-v-e1e041d5${_scopeId2}>Z</code> or <code data-v-e1e041d5${_scopeId2}>+00:00</code>. Both are equally valid; pick one and be consistent.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>MUST include an offset.</strong> A value with no offset is rejected by the API Hub on consent creation, with a <code data-v-e1e041d5${_scopeId2}>format - date-time</code> error.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>MUST NOT use <code data-v-e1e041d5${_scopeId2}>-00:00</code>.</strong> ISO 8601 prohibits a negative zero offset; RFC 3339 permits it but assigns it <em data-v-e1e041d5${_scopeId2}>“UTC, local offset unknown”</em> semantics, which is not what you mean.</li><li data-v-e1e041d5${_scopeId2}>Fractional seconds are optional. Send them or omit them — but do not rely on the value coming back at the same precision.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "SHOULD emit UTC"),
                      createTextVNode(" — "),
                      createVNode("code", null, "Z"),
                      createTextVNode(" or "),
                      createVNode("code", null, "+00:00"),
                      createTextVNode(". Both are equally valid; pick one and be consistent.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "MUST include an offset."),
                      createTextVNode(" A value with no offset is rejected by the API Hub on consent creation, with a "),
                      createVNode("code", null, "format - date-time"),
                      createTextVNode(" error.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, [
                        createTextVNode("MUST NOT use "),
                        createVNode("code", null, "-00:00"),
                        createTextVNode(".")
                      ]),
                      createTextVNode(" ISO 8601 prohibits a negative zero offset; RFC 3339 permits it but assigns it "),
                      createVNode("em", null, "“UTC, local offset unknown”"),
                      createTextVNode(" semantics, which is not what you mean.")
                    ]),
                    createVNode("li", null, "Fractional seconds are optional. Send them or omit them — but do not rely on the value coming back at the same precision.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-e1e041d5${_scopeId2}>Receiving</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Receiving")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>Parse into an instant.</strong> Apply the offset. Never read the wall-clock digits.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>Never default a missing offset to local time.</strong> Treat it as an error, or at minimum default to <strong data-v-e1e041d5${_scopeId2}>UTC</strong>. Defaulting to local is what turns a missing offset into a silent four-hour error.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>Never compare date-times as strings.</strong> <code data-v-e1e041d5${_scopeId2}>2027-07-22T00:00:00Z</code> and <code data-v-e1e041d5${_scopeId2}>2027-07-22T00:00:00.000Z</code> are the same instant and different strings. Anything built on string equality — deduplication keys, idempotency hashes, change detection — breaks the moment a counterparty adjusts its serialiser. Key on identifiers such as <code data-v-e1e041d5${_scopeId2}>TransactionId</code>, or on the parsed instant at a fixed precision.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>A single payload may legitimately mix offsets.</strong> A consent record can carry the TPP&#39;s <code data-v-e1e041d5${_scopeId2}>ExpirationDateTime</code> as <code data-v-e1e041d5${_scopeId2}>Z</code> alongside the platform&#39;s own <code data-v-e1e041d5${_scopeId2}>CreationDateTime</code> as <code data-v-e1e041d5${_scopeId2}>+04:00</code>. Both are correct.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Parse into an instant."),
                      createTextVNode(" Apply the offset. Never read the wall-clock digits.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Never default a missing offset to local time."),
                      createTextVNode(" Treat it as an error, or at minimum default to "),
                      createVNode("strong", null, "UTC"),
                      createTextVNode(". Defaulting to local is what turns a missing offset into a silent four-hour error.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Never compare date-times as strings."),
                      createTextVNode(),
                      createVNode("code", null, "2027-07-22T00:00:00Z"),
                      createTextVNode(" and "),
                      createVNode("code", null, "2027-07-22T00:00:00.000Z"),
                      createTextVNode(" are the same instant and different strings. Anything built on string equality — deduplication keys, idempotency hashes, change detection — breaks the moment a counterparty adjusts its serialiser. Key on identifiers such as "),
                      createVNode("code", null, "TransactionId"),
                      createTextVNode(", or on the parsed instant at a fixed precision.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "A single payload may legitimately mix offsets."),
                      createTextVNode(" A consent record can carry the TPP's "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" as "),
                      createVNode("code", null, "Z"),
                      createTextVNode(" alongside the platform's own "),
                      createVNode("code", null, "CreationDateTime"),
                      createTextVNode(" as "),
                      createVNode("code", null, "+04:00"),
                      createTextVNode(". Both are correct.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "tip",
              title: "Expect variation across LFIs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e1e041d5${_scopeId2}> Different institutions serialise differently, and legitimately so. Record what each counterparty emits and alert when the shape changes — a serialiser change upstream produces no error, only different bytes. </p>`);
                } else {
                  return [
                    createVNode("p", null, " Different institutions serialise differently, and legitimately so. Record what each counterparty emits and alert when the shape changes — a serialiser change upstream produces no error, only different bytes. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Sending")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "SHOULD emit UTC"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Z"),
                    createTextVNode(" or "),
                    createVNode("code", null, "+00:00"),
                    createTextVNode(". Both are equally valid; pick one and be consistent.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "MUST include an offset."),
                    createTextVNode(" A value with no offset is rejected by the API Hub on consent creation, with a "),
                    createVNode("code", null, "format - date-time"),
                    createTextVNode(" error.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, [
                      createTextVNode("MUST NOT use "),
                      createVNode("code", null, "-00:00"),
                      createTextVNode(".")
                    ]),
                    createTextVNode(" ISO 8601 prohibits a negative zero offset; RFC 3339 permits it but assigns it "),
                    createVNode("em", null, "“UTC, local offset unknown”"),
                    createTextVNode(" semantics, which is not what you mean.")
                  ]),
                  createVNode("li", null, "Fractional seconds are optional. Send them or omit them — but do not rely on the value coming back at the same precision.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Receiving")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Parse into an instant."),
                    createTextVNode(" Apply the offset. Never read the wall-clock digits.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Never default a missing offset to local time."),
                    createTextVNode(" Treat it as an error, or at minimum default to "),
                    createVNode("strong", null, "UTC"),
                    createTextVNode(". Defaulting to local is what turns a missing offset into a silent four-hour error.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Never compare date-times as strings."),
                    createTextVNode(),
                    createVNode("code", null, "2027-07-22T00:00:00Z"),
                    createTextVNode(" and "),
                    createVNode("code", null, "2027-07-22T00:00:00.000Z"),
                    createTextVNode(" are the same instant and different strings. Anything built on string equality — deduplication keys, idempotency hashes, change detection — breaks the moment a counterparty adjusts its serialiser. Key on identifiers such as "),
                    createVNode("code", null, "TransactionId"),
                    createTextVNode(", or on the parsed instant at a fixed precision.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "A single payload may legitimately mix offsets."),
                    createTextVNode(" A consent record can carry the TPP's "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" as "),
                    createVNode("code", null, "Z"),
                    createTextVNode(" alongside the platform's own "),
                    createVNode("code", null, "CreationDateTime"),
                    createTextVNode(" as "),
                    createVNode("code", null, "+04:00"),
                    createTextVNode(". Both are correct.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "tip",
                title: "Expect variation across LFIs"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " Different institutions serialise differently, and legitimately so. Record what each counterparty emits and alert when the shape changes — a serialiser change upstream produces no error, only different bytes. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "lfi",
        num: "03",
        color: "var(--at-gold)",
        eyebrow: "For LFIs",
        title: "Apply the offset, and check your own stack first",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-e1e041d5${_scopeId2}>Receiving from the API Hub</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Receiving from the API Hub")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>Parse the offset.</strong> This is the single most important line in this article. A consent expiry of <code data-v-e1e041d5${_scopeId2}>2027-07-22T00:00:00Z</code> is <code data-v-e1e041d5${_scopeId2}>2027-07-22T04:00:00</code> UAE time — <strong data-v-e1e041d5${_scopeId2}>not</strong> <code data-v-e1e041d5${_scopeId2}>2027-07-22T00:00:00</code> UAE time.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>Do not re-implement validation the platform already performs.</strong> The API Hub validates consent date-times on creation: it rejects values with no offset, and rejects an <code data-v-e1e041d5${_scopeId2}>ExpirationDateTime</code> that is not in the future. Re-validating in the LFI adds a second, divergent implementation of a centralised check.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>Beware your own framework.</strong> In most reported cases of “we received it without an offset”, the offset was present on the wire and removed by a deserialiser, an ORM column mapping, or a log formatter.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Parse the offset."),
                      createTextVNode(" This is the single most important line in this article. A consent expiry of "),
                      createVNode("code", null, "2027-07-22T00:00:00Z"),
                      createTextVNode(" is "),
                      createVNode("code", null, "2027-07-22T04:00:00"),
                      createTextVNode(" UAE time — "),
                      createVNode("strong", null, "not"),
                      createTextVNode(),
                      createVNode("code", null, "2027-07-22T00:00:00"),
                      createTextVNode(" UAE time.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Do not re-implement validation the platform already performs."),
                      createTextVNode(" The API Hub validates consent date-times on creation: it rejects values with no offset, and rejects an "),
                      createVNode("code", null, "ExpirationDateTime"),
                      createTextVNode(" that is not in the future. Re-validating in the LFI adds a second, divergent implementation of a centralised check.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Beware your own framework."),
                      createTextVNode(" In most reported cases of “we received it without an offset”, the offset was present on the wire and removed by a deserialiser, an ORM column mapping, or a log formatter.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "important",
              title: "Capture the raw body before you raise a ticket"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-e1e041d5${_scopeId2}> When diagnosing a missing offset, capture the <strong data-v-e1e041d5${_scopeId2}>raw request body before any JSON parsing</strong>. A value read back from your own database or logs has already passed through the layer most likely to be at fault, so it cannot tell you what arrived. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" When diagnosing a missing offset, capture the "),
                      createVNode("strong", null, "raw request body before any JSON parsing"),
                      createTextVNode(". A value read back from your own database or logs has already passed through the layer most likely to be at fault, so it cannot tell you what arrived. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-e1e041d5${_scopeId2}>Emitting</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "Emitting")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>SHOULD emit UTC</strong> — <code data-v-e1e041d5${_scopeId2}>Z</code> or <code data-v-e1e041d5${_scopeId2}>+00:00</code> — on every date-time you produce.</li><li data-v-e1e041d5${_scopeId2}><strong data-v-e1e041d5${_scopeId2}>MUST include an offset</strong> on every date-time in every response.</li><li data-v-e1e041d5${_scopeId2}>Where a transaction&#39;s local context matters, carry it in the dedicated <code data-v-e1e041d5${_scopeId2}>LocalTimeZone</code> field (format <code data-v-e1e041d5${_scopeId2}>UTC+04:00</code>, including the <code data-v-e1e041d5${_scopeId2}>UTC</code> prefix — a bare <code data-v-e1e041d5${_scopeId2}>+04:00</code> fails that field&#39;s pattern). Do <strong data-v-e1e041d5${_scopeId2}>not</strong> express local context by shifting the offset on <code data-v-e1e041d5${_scopeId2}>TransactionDateTime</code>.</li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "SHOULD emit UTC"),
                      createTextVNode(" — "),
                      createVNode("code", null, "Z"),
                      createTextVNode(" or "),
                      createVNode("code", null, "+00:00"),
                      createTextVNode(" — on every date-time you produce.")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "MUST include an offset"),
                      createTextVNode(" on every date-time in every response.")
                    ]),
                    createVNode("li", null, [
                      createTextVNode("Where a transaction's local context matters, carry it in the dedicated "),
                      createVNode("code", null, "LocalTimeZone"),
                      createTextVNode(" field (format "),
                      createVNode("code", null, "UTC+04:00"),
                      createTextVNode(", including the "),
                      createVNode("code", null, "UTC"),
                      createTextVNode(" prefix — a bare "),
                      createVNode("code", null, "+04:00"),
                      createTextVNode(" fails that field's pattern). Do "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" express local context by shifting the offset on "),
                      createVNode("code", null, "TransactionDateTime"),
                      createTextVNode(".")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-e1e041d5${_scopeId2}>A two-minute self-test</strong>`);
                } else {
                  return [
                    createVNode("strong", null, "A two-minute self-test")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: selfTest,
              lang: "text",
              filename: "Submit the same instant twice, spelled differently"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` If your system behaves differently for those two values, your implementation is not applying the offset — and you have reproduced the defect without instrumenting anything. `);
                } else {
                  return [
                    createTextVNode(" If your system behaves differently for those two values, your implementation is not applying the offset — and you have reproduced the defect without instrumenting anything. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Receiving from the API Hub")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Parse the offset."),
                    createTextVNode(" This is the single most important line in this article. A consent expiry of "),
                    createVNode("code", null, "2027-07-22T00:00:00Z"),
                    createTextVNode(" is "),
                    createVNode("code", null, "2027-07-22T04:00:00"),
                    createTextVNode(" UAE time — "),
                    createVNode("strong", null, "not"),
                    createTextVNode(),
                    createVNode("code", null, "2027-07-22T00:00:00"),
                    createTextVNode(" UAE time.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Do not re-implement validation the platform already performs."),
                    createTextVNode(" The API Hub validates consent date-times on creation: it rejects values with no offset, and rejects an "),
                    createVNode("code", null, "ExpirationDateTime"),
                    createTextVNode(" that is not in the future. Re-validating in the LFI adds a second, divergent implementation of a centralised check.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Beware your own framework."),
                    createTextVNode(" In most reported cases of “we received it without an offset”, the offset was present on the wire and removed by a deserialiser, an ORM column mapping, or a log formatter.")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "important",
                title: "Capture the raw body before you raise a ticket"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" When diagnosing a missing offset, capture the "),
                    createVNode("strong", null, "raw request body before any JSON parsing"),
                    createTextVNode(". A value read back from your own database or logs has already passed through the layer most likely to be at fault, so it cannot tell you what arrived. ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "Emitting")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "SHOULD emit UTC"),
                    createTextVNode(" — "),
                    createVNode("code", null, "Z"),
                    createTextVNode(" or "),
                    createVNode("code", null, "+00:00"),
                    createTextVNode(" — on every date-time you produce.")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "MUST include an offset"),
                    createTextVNode(" on every date-time in every response.")
                  ]),
                  createVNode("li", null, [
                    createTextVNode("Where a transaction's local context matters, carry it in the dedicated "),
                    createVNode("code", null, "LocalTimeZone"),
                    createTextVNode(" field (format "),
                    createVNode("code", null, "UTC+04:00"),
                    createTextVNode(", including the "),
                    createVNode("code", null, "UTC"),
                    createTextVNode(" prefix — a bare "),
                    createVNode("code", null, "+04:00"),
                    createTextVNode(" fails that field's pattern). Do "),
                    createVNode("strong", null, "not"),
                    createTextVNode(" express local context by shifting the offset on "),
                    createVNode("code", null, "TransactionDateTime"),
                    createTextVNode(".")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "A two-minute self-test")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: selfTest,
                lang: "text",
                filename: "Submit the same instant twice, spelled differently"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" If your system behaves differently for those two values, your implementation is not applying the offset — and you have reproduced the defect without instrumenting anything. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "vectors",
        num: "04",
        color: "var(--at-blue-deep)",
        eyebrow: "Test vectors",
        title: "Verify your normalisation",
        tone: "surface",
        narrow: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-e1e041d5${_scopeId2}>Epoch</code> is seconds since <code data-v-e1e041d5${_scopeId2}>1970-01-01T00:00:00Z</code>. `);
                } else {
                  return [
                    createVNode("code", null, "Epoch"),
                    createTextVNode(" is seconds since "),
                    createVNode("code", null, "1970-01-01T00:00:00Z"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ed-table-wrap" data-v-e1e041d5${_scopeId}><table class="ed-table" data-v-e1e041d5${_scopeId}><thead data-v-e1e041d5${_scopeId}><tr data-v-e1e041d5${_scopeId}><th data-v-e1e041d5${_scopeId}>Value</th><th data-v-e1e041d5${_scopeId}>Epoch</th><th data-v-e1e041d5${_scopeId}>UAE local time</th></tr></thead><tbody data-v-e1e041d5${_scopeId}><tr data-v-e1e041d5${_scopeId}><td data-v-e1e041d5${_scopeId}><code data-v-e1e041d5${_scopeId}>2027-07-22T00:00:00Z</code></td><td data-v-e1e041d5${_scopeId}>1816214400</td><td data-v-e1e041d5${_scopeId}>2027-07-22T04:00:00+04:00</td></tr><tr data-v-e1e041d5${_scopeId}><td data-v-e1e041d5${_scopeId}><code data-v-e1e041d5${_scopeId}>2027-07-22T00:00:00.000Z</code></td><td data-v-e1e041d5${_scopeId}>1816214400</td><td data-v-e1e041d5${_scopeId}>2027-07-22T04:00:00+04:00</td></tr><tr data-v-e1e041d5${_scopeId}><td data-v-e1e041d5${_scopeId}><code data-v-e1e041d5${_scopeId}>2027-07-22T00:00:00+00:00</code></td><td data-v-e1e041d5${_scopeId}>1816214400</td><td data-v-e1e041d5${_scopeId}>2027-07-22T04:00:00+04:00</td></tr><tr data-v-e1e041d5${_scopeId}><td data-v-e1e041d5${_scopeId}><code data-v-e1e041d5${_scopeId}>2027-07-22T00:00:00.000+00:00</code></td><td data-v-e1e041d5${_scopeId}>1816214400</td><td data-v-e1e041d5${_scopeId}>2027-07-22T04:00:00+04:00</td></tr><tr data-v-e1e041d5${_scopeId}><td data-v-e1e041d5${_scopeId}><code data-v-e1e041d5${_scopeId}>2027-07-22T04:00:00+04:00</code></td><td data-v-e1e041d5${_scopeId}>1816214400</td><td data-v-e1e041d5${_scopeId}>2027-07-22T04:00:00+04:00</td></tr><tr data-v-e1e041d5${_scopeId}><td data-v-e1e041d5${_scopeId}><code data-v-e1e041d5${_scopeId}>2027-07-22T00:00:00-05:00</code></td><td data-v-e1e041d5${_scopeId}>1816232400</td><td data-v-e1e041d5${_scopeId}>2027-07-22T09:00:00+04:00</td></tr><tr data-v-e1e041d5${_scopeId}><td data-v-e1e041d5${_scopeId}><code data-v-e1e041d5${_scopeId}>2027-04-05T10:43:07+00:00</code></td><td data-v-e1e041d5${_scopeId}>1806921787</td><td data-v-e1e041d5${_scopeId}>2027-04-05T14:43:07+04:00</td></tr></tbody></table></div>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-e1e041d5${_scopeId2}>The first five rows are one instant.</strong> If your implementation produces more than one distinct value for them, it is not conforming. The sixth row is a genuinely different instant, five hours later — included so the test distinguishes “applies the offset” from “ignores the offset and happens to agree”. `);
                } else {
                  return [
                    createVNode("strong", null, "The first five rows are one instant."),
                    createTextVNode(" If your implementation produces more than one distinct value for them, it is not conforming. The sixth row is a genuinely different instant, five hours later — included so the test distinguishes “applies the offset” from “ignores the offset and happens to agree”. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "Epoch"),
                  createTextVNode(" is seconds since "),
                  createVNode("code", null, "1970-01-01T00:00:00Z"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "ed-table-wrap" }, [
                createVNode("table", { class: "ed-table" }, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Value"),
                      createVNode("th", null, "Epoch"),
                      createVNode("th", null, "UAE local time")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "2027-07-22T00:00:00Z")
                      ]),
                      createVNode("td", null, "1816214400"),
                      createVNode("td", null, "2027-07-22T04:00:00+04:00")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "2027-07-22T00:00:00.000Z")
                      ]),
                      createVNode("td", null, "1816214400"),
                      createVNode("td", null, "2027-07-22T04:00:00+04:00")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "2027-07-22T00:00:00+00:00")
                      ]),
                      createVNode("td", null, "1816214400"),
                      createVNode("td", null, "2027-07-22T04:00:00+04:00")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "2027-07-22T00:00:00.000+00:00")
                      ]),
                      createVNode("td", null, "1816214400"),
                      createVNode("td", null, "2027-07-22T04:00:00+04:00")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "2027-07-22T04:00:00+04:00")
                      ]),
                      createVNode("td", null, "1816214400"),
                      createVNode("td", null, "2027-07-22T04:00:00+04:00")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "2027-07-22T00:00:00-05:00")
                      ]),
                      createVNode("td", null, "1816232400"),
                      createVNode("td", null, "2027-07-22T09:00:00+04:00")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "2027-04-05T10:43:07+00:00")
                      ]),
                      createVNode("td", null, "1806921787"),
                      createVNode("td", null, "2027-04-05T14:43:07+04:00")
                    ])
                  ])
                ])
              ]),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "The first five rows are one instant."),
                  createTextVNode(" If your implementation produces more than one distinct value for them, it is not conforming. The sixth row is a genuinely different instant, five hours later — included so the test distinguishes “applies the offset” from “ignores the offset and happens to agree”. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/proposals/ofp-014/knowledge-base-article.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const knowledgeBaseArticle = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e1e041d5"]]);
export {
  knowledgeBaseArticle as default
};

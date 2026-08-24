import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-7475afb0><section class="ed-doc__hero" data-v-7475afb0><div class="ed-doc__inner" data-v-7475afb0><div class="ed-doc__eyebrow" data-v-7475afb0><span class="ed-doc__eyebrow-dash" data-v-7475afb0></span> LFI · Ozone Connect · Consent Events &amp; Actions </div><h1 class="ed-doc__title" data-v-7475afb0> Consent Events &amp; Actions <span class="ed-doc__read" data-v-7475afb0>3 min read</span></h1><p class="ed-doc__lede" data-v-7475afb0> The <strong data-v-7475afb0>Consent Events &amp; Actions API</strong> is implemented by your LFI. Unlike the other APIs in the Ozone Connect specification where the API Hub calls your endpoints to retrieve data or execute payments, these endpoints allow the API Hub to notify you of consent lifecycle changes and request your input during consent creation. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "direction",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Direction of communication",
    title: "API Hub → LFI, but informing rather than requesting data",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` All other Ozone Connect APIs follow the pattern: <strong data-v-7475afb0${_scopeId2}>API Hub → LFI</strong> (the Hub requests data or actions from you). The Consent Events &amp; Actions API follows the same direction — <strong data-v-7475afb0${_scopeId2}>API Hub → LFI</strong> — but the purpose is reversed: the Hub is <em data-v-7475afb0${_scopeId2}>informing</em> you or <em data-v-7475afb0${_scopeId2}>asking</em> you, rather than requesting business data. `);
            } else {
              return [
                createTextVNode(" All other Ozone Connect APIs follow the pattern: "),
                createVNode("strong", null, "API Hub → LFI"),
                createTextVNode(" (the Hub requests data or actions from you). The Consent Events & Actions API follows the same direction — "),
                createVNode("strong", null, "API Hub → LFI"),
                createTextVNode(" — but the purpose is reversed: the Hub is "),
                createVNode("em", null, "informing"),
                createTextVNode(" you or "),
                createVNode("em", null, "asking"),
                createTextVNode(" you, rather than requesting business data. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" All other Ozone Connect APIs follow the pattern: "),
              createVNode("strong", null, "API Hub → LFI"),
              createTextVNode(" (the Hub requests data or actions from you). The Consent Events & Actions API follows the same direction — "),
              createVNode("strong", null, "API Hub → LFI"),
              createTextVNode(" — but the purpose is reversed: the Hub is "),
              createVNode("em", null, "informing"),
              createTextVNode(" you or "),
              createVNode("em", null, "asking"),
              createTextVNode(" you, rather than requesting business data. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "endpoints",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Endpoints",
    title: "One action and two events",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-7475afb0${_scopeId2}><thead data-v-7475afb0${_scopeId2}><tr data-v-7475afb0${_scopeId2}><th data-v-7475afb0${_scopeId2}>Endpoint</th><th data-v-7475afb0${_scopeId2}>Type</th><th data-v-7475afb0${_scopeId2}>When the Hub calls it</th><th data-v-7475afb0${_scopeId2}>Recommendation</th></tr></thead><tbody data-v-7475afb0${_scopeId2}><tr data-v-7475afb0${_scopeId2}><td data-v-7475afb0${_scopeId2}><span class="endpoint" data-v-7475afb0${_scopeId2}><span class="http-method http-method--post" data-v-7475afb0${_scopeId2}>POST</span><code data-v-7475afb0${_scopeId2}>/consent/action/validate</code></span></td><td data-v-7475afb0${_scopeId2}>Action</td><td data-v-7475afb0${_scopeId2}>During consent creation — before the consent is stored. The Hub sends the consent the TPP is requesting and asks your LFI to confirm it is supported.</td><td data-v-7475afb0${_scopeId2}><strong data-v-7475afb0${_scopeId2}>Highly recommended</strong> for all LFIs</td></tr><tr data-v-7475afb0${_scopeId2}><td data-v-7475afb0${_scopeId2}><span class="endpoint" data-v-7475afb0${_scopeId2}><span class="http-method http-method--post" data-v-7475afb0${_scopeId2}>POST</span><code data-v-7475afb0${_scopeId2}>/consent/event/post</code></span></td><td data-v-7475afb0${_scopeId2}>Event</td><td data-v-7475afb0${_scopeId2}>After a consent is successfully created</td><td data-v-7475afb0${_scopeId2}>Recommended for LFIs that store consents locally</td></tr><tr data-v-7475afb0${_scopeId2}><td data-v-7475afb0${_scopeId2}><span class="endpoint" data-v-7475afb0${_scopeId2}><span class="http-method http-method--post" data-v-7475afb0${_scopeId2}>POST</span><code data-v-7475afb0${_scopeId2}>/consent/event/patch</code></span></td><td data-v-7475afb0${_scopeId2}>Event</td><td data-v-7475afb0${_scopeId2}>Every time a consent changes — e.g. status transitions to <code data-v-7475afb0${_scopeId2}>Authorized</code>, <code data-v-7475afb0${_scopeId2}>Rejected</code>, <code data-v-7475afb0${_scopeId2}>Expired</code>, or <code data-v-7475afb0${_scopeId2}>Revoked</code></td><td data-v-7475afb0${_scopeId2}>Recommended for LFIs that store consents locally</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Type"),
                      createVNode("th", null, "When the Hub calls it"),
                      createVNode("th", null, "Recommendation")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent/action/validate")
                        ])
                      ]),
                      createVNode("td", null, "Action"),
                      createVNode("td", null, "During consent creation — before the consent is stored. The Hub sends the consent the TPP is requesting and asks your LFI to confirm it is supported."),
                      createVNode("td", null, [
                        createVNode("strong", null, "Highly recommended"),
                        createTextVNode(" for all LFIs")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent/event/post")
                        ])
                      ]),
                      createVNode("td", null, "Event"),
                      createVNode("td", null, "After a consent is successfully created"),
                      createVNode("td", null, "Recommended for LFIs that store consents locally")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("span", { class: "endpoint" }, [
                          createVNode("span", { class: "http-method http-method--post" }, "POST"),
                          createVNode("code", null, "/consent/event/patch")
                        ])
                      ]),
                      createVNode("td", null, "Event"),
                      createVNode("td", null, [
                        createTextVNode("Every time a consent changes — e.g. status transitions to "),
                        createVNode("code", null, "Authorized"),
                        createTextVNode(", "),
                        createVNode("code", null, "Rejected"),
                        createTextVNode(", "),
                        createVNode("code", null, "Expired"),
                        createTextVNode(", or "),
                        createVNode("code", null, "Revoked")
                      ]),
                      createVNode("td", null, "Recommended for LFIs that store consents locally")
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
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Type"),
                    createVNode("th", null, "When the Hub calls it"),
                    createVNode("th", null, "Recommendation")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/action/validate")
                      ])
                    ]),
                    createVNode("td", null, "Action"),
                    createVNode("td", null, "During consent creation — before the consent is stored. The Hub sends the consent the TPP is requesting and asks your LFI to confirm it is supported."),
                    createVNode("td", null, [
                      createVNode("strong", null, "Highly recommended"),
                      createTextVNode(" for all LFIs")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/event/post")
                      ])
                    ]),
                    createVNode("td", null, "Event"),
                    createVNode("td", null, "After a consent is successfully created"),
                    createVNode("td", null, "Recommended for LFIs that store consents locally")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("span", { class: "endpoint" }, [
                        createVNode("span", { class: "http-method http-method--post" }, "POST"),
                        createVNode("code", null, "/consent/event/patch")
                      ])
                    ]),
                    createVNode("td", null, "Event"),
                    createVNode("td", null, [
                      createTextVNode("Every time a consent changes — e.g. status transitions to "),
                      createVNode("code", null, "Authorized"),
                      createTextVNode(", "),
                      createVNode("code", null, "Rejected"),
                      createTextVNode(", "),
                      createVNode("code", null, "Expired"),
                      createTextVNode(", or "),
                      createVNode("code", null, "Revoked")
                    ]),
                    createVNode("td", null, "Recommended for LFIs that store consents locally")
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
    id: "validate",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "POST /consent/action/validate",
    title: "LFI input gates consent creation",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The validate endpoint is called when a TPP submits a <span class="endpoint" data-v-7475afb0${_scopeId2}><span class="http-method http-method--post" data-v-7475afb0${_scopeId2}>POST</span><code data-v-7475afb0${_scopeId2}>/par</code></span> request to the API Hub to create a new consent. <strong data-v-7475afb0${_scopeId2}>Before</strong> the consent is stored, the Hub forwards the full consent payload to your LFI and waits for a response. `);
            } else {
              return [
                createTextVNode(" The validate endpoint is called when a TPP submits a "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/par")
                ]),
                createTextVNode(" request to the API Hub to create a new consent. "),
                createVNode("strong", null, "Before"),
                createTextVNode(" the consent is stored, the Hub forwards the full consent payload to your LFI and waits for a response. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Your LFI inspects the consent and determines whether it can be supported — for example: `);
            } else {
              return [
                createTextVNode(" Your LFI inspects the consent and determines whether it can be supported — for example: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-7475afb0${_scopeId2}>Does the consent version match what your LFI supports?</li><li data-v-7475afb0${_scopeId2}>Are the requested permissions within the scope of what your LFI offers?</li>`);
            } else {
              return [
                createVNode("li", null, "Does the consent version match what your LFI supports?"),
                createVNode("li", null, "Are the requested permissions within the scope of what your LFI offers?")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Each consent type defines its own specific validation rules in its <strong data-v-7475afb0${_scopeId2}>Requirements</strong> page (e.g. <a href="/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements" data-v-7475afb0${_scopeId2}>Bank Data Sharing — Requirements</a>). Refer to the Requirements page for each consent type your LFI supports. `);
            } else {
              return [
                createTextVNode(" Each consent type defines its own specific validation rules in its "),
                createVNode("strong", null, "Requirements"),
                createTextVNode(" page (e.g. "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements" }, "Bank Data Sharing — Requirements"),
                createTextVNode("). Refer to the Requirements page for each consent type your LFI supports. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Your LFI responds with a <code data-v-7475afb0${_scopeId2}>data.status</code> of either <code data-v-7475afb0${_scopeId2}>valid</code> or <code data-v-7475afb0${_scopeId2}>invalid</code>: `);
            } else {
              return [
                createTextVNode(" Your LFI responds with a "),
                createVNode("code", null, "data.status"),
                createTextVNode(" of either "),
                createVNode("code", null, "valid"),
                createTextVNode(" or "),
                createVNode("code", null, "invalid"),
                createTextVNode(": ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-7475afb0${_scopeId2}><thead data-v-7475afb0${_scopeId2}><tr data-v-7475afb0${_scopeId2}><th data-v-7475afb0${_scopeId2}>Response</th><th data-v-7475afb0${_scopeId2}>Effect</th></tr></thead><tbody data-v-7475afb0${_scopeId2}><tr data-v-7475afb0${_scopeId2}><td data-v-7475afb0${_scopeId2}><code data-v-7475afb0${_scopeId2}>valid</code></td><td data-v-7475afb0${_scopeId2}>The consent is created in the API Hub and the authorization journey proceeds</td></tr><tr data-v-7475afb0${_scopeId2}><td data-v-7475afb0${_scopeId2}><code data-v-7475afb0${_scopeId2}>invalid</code></td><td data-v-7475afb0${_scopeId2}>The consent is <strong data-v-7475afb0${_scopeId2}>not</strong> created. The API Hub returns an error to the TPP</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Response"),
                      createVNode("th", null, "Effect")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "valid")
                      ]),
                      createVNode("td", null, "The consent is created in the API Hub and the authorization journey proceeds")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("code", null, "invalid")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("The consent is "),
                        createVNode("strong", null, "not"),
                        createTextVNode(" created. The API Hub returns an error to the TPP")
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
          title: "Highly recommended"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-7475afb0${_scopeId2}> We <strong data-v-7475afb0${_scopeId2}>highly recommend</strong> all LFIs implement the validate endpoint. It gives your institution early control over which consents enter the authorization journey, preventing unsupported consents from reaching your end users. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" We "),
                  createVNode("strong", null, "highly recommend"),
                  createTextVNode(" all LFIs implement the validate endpoint. It gives your institution early control over which consents enter the authorization journey, preventing unsupported consents from reaching your end users. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Not configured?"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-7475afb0${_scopeId2}> If your LFI has not configured the validate endpoint, the API Hub assumes all consents are valid and creates them immediately without LFI input. </p>`);
            } else {
              return [
                createVNode("p", null, " If your LFI has not configured the validate endpoint, the API Hub assumes all consents are valid and creates them immediately without LFI input. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The validate endpoint is called when a TPP submits a "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/par")
              ]),
              createTextVNode(" request to the API Hub to create a new consent. "),
              createVNode("strong", null, "Before"),
              createTextVNode(" the consent is stored, the Hub forwards the full consent payload to your LFI and waits for a response. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Your LFI inspects the consent and determines whether it can be supported — for example: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Does the consent version match what your LFI supports?"),
              createVNode("li", null, "Are the requested permissions within the scope of what your LFI offers?")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Each consent type defines its own specific validation rules in its "),
              createVNode("strong", null, "Requirements"),
              createTextVNode(" page (e.g. "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements" }, "Bank Data Sharing — Requirements"),
              createTextVNode("). Refer to the Requirements page for each consent type your LFI supports. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Your LFI responds with a "),
              createVNode("code", null, "data.status"),
              createTextVNode(" of either "),
              createVNode("code", null, "valid"),
              createTextVNode(" or "),
              createVNode("code", null, "invalid"),
              createTextVNode(": ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Response"),
                    createVNode("th", null, "Effect")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "valid")
                    ]),
                    createVNode("td", null, "The consent is created in the API Hub and the authorization journey proceeds")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("code", null, "invalid")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The consent is "),
                      createVNode("strong", null, "not"),
                      createTextVNode(" created. The API Hub returns an error to the TPP")
                    ])
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "Highly recommended"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" We "),
                createVNode("strong", null, "highly recommend"),
                createTextVNode(" all LFIs implement the validate endpoint. It gives your institution early control over which consents enter the authorization journey, preventing unsupported consents from reaching your end users. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Not configured?"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " If your LFI has not configured the validate endpoint, the API Hub assumes all consents are valid and creates them immediately without LFI input. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "event-op",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "POST /consent/event/{operation}",
    title: "Consent lifecycle notifications",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The consent event endpoint is called by the Hub to notify your LFI of consent lifecycle changes. The <code data-v-7475afb0${_scopeId2}>{operation}</code> path parameter indicates the type of change: `);
            } else {
              return [
                createTextVNode(" The consent event endpoint is called by the Hub to notify your LFI of consent lifecycle changes. The "),
                createVNode("code", null, "{operation}"),
                createTextVNode(" path parameter indicates the type of change: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-7475afb0${_scopeId}><span class="endpoint" data-v-7475afb0${_scopeId}><span class="http-method http-method--post" data-v-7475afb0${_scopeId}>POST</span><code data-v-7475afb0${_scopeId}>/consent/event/post</code></span> — Consent created</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Called immediately after a consent is successfully created (i.e. after validation passes, if configured). The request body contains the full consent object as stored in the API Hub&#39;s Consent Manager. `);
            } else {
              return [
                createTextVNode(" Called immediately after a consent is successfully created (i.e. after validation passes, if configured). The request body contains the full consent object as stored in the API Hub's Consent Manager. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-7475afb0${_scopeId}><span class="endpoint" data-v-7475afb0${_scopeId}><span class="http-method http-method--post" data-v-7475afb0${_scopeId}>POST</span><code data-v-7475afb0${_scopeId}>/consent/event/patch</code></span> — Consent updated</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Called every time a consent&#39;s state changes. This includes transitions such as:`);
            } else {
              return [
                createTextVNode("Called every time a consent's state changes. This includes transitions such as:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-7475afb0${_scopeId2}><code data-v-7475afb0${_scopeId2}>AwaitingAuthorisation</code> → <code data-v-7475afb0${_scopeId2}>Authorized</code> (end user approved the consent)</li><li data-v-7475afb0${_scopeId2}><code data-v-7475afb0${_scopeId2}>AwaitingAuthorisation</code> → <code data-v-7475afb0${_scopeId2}>Rejected</code> (end user declined the consent)</li><li data-v-7475afb0${_scopeId2}><code data-v-7475afb0${_scopeId2}>Authorized</code> → <code data-v-7475afb0${_scopeId2}>Revoked</code> (consent revoked by TPP, LFI, or end user)</li><li data-v-7475afb0${_scopeId2}><code data-v-7475afb0${_scopeId2}>Authorized</code> → <code data-v-7475afb0${_scopeId2}>Expired</code> (consent reached its expiration date)</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("code", null, "AwaitingAuthorisation"),
                  createTextVNode(" → "),
                  createVNode("code", null, "Authorized"),
                  createTextVNode(" (end user approved the consent)")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "AwaitingAuthorisation"),
                  createTextVNode(" → "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(" (end user declined the consent)")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "Authorized"),
                  createTextVNode(" → "),
                  createVNode("code", null, "Revoked"),
                  createTextVNode(" (consent revoked by TPP, LFI, or end user)")
                ]),
                createVNode("li", null, [
                  createVNode("code", null, "Authorized"),
                  createTextVNode(" → "),
                  createVNode("code", null, "Expired"),
                  createTextVNode(" (consent reached its expiration date)")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`The request body contains the full, updated consent object.`);
            } else {
              return [
                createTextVNode("The request body contains the full, updated consent object.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-7475afb0${_scopeId}>Response</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For both operations, your LFI MUST return <code data-v-7475afb0${_scopeId2}>204 No Content</code> to acknowledge receipt. The Hub does not retry failed notifications, and consent state changes are <strong data-v-7475afb0${_scopeId2}>not</strong> rolled back if your endpoint returns an error. `);
            } else {
              return [
                createTextVNode(" For both operations, your LFI MUST return "),
                createVNode("code", null, "204 No Content"),
                createTextVNode(" to acknowledge receipt. The Hub does not retry failed notifications, and consent state changes are "),
                createVNode("strong", null, "not"),
                createTextVNode(" rolled back if your endpoint returns an error. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: "Recommended for LFIs storing consents locally"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-7475afb0${_scopeId2}> If your LFI maintains a local copy of consents — for example, to power a Consent Management Interface or to support internal business logic — we <strong data-v-7475afb0${_scopeId2}>recommend</strong> implementing the consent event endpoints. This ensures your local consent state stays aligned with the API Hub, which is the <strong data-v-7475afb0${_scopeId2}>single source of truth</strong> for all consent data. </p><p data-v-7475afb0${_scopeId2}> Without these events, your local consent records may drift out of sync with the Hub, requiring you to poll the Consent Manager API to detect changes. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" If your LFI maintains a local copy of consents — for example, to power a Consent Management Interface or to support internal business logic — we "),
                  createVNode("strong", null, "recommend"),
                  createTextVNode(" implementing the consent event endpoints. This ensures your local consent state stays aligned with the API Hub, which is the "),
                  createVNode("strong", null, "single source of truth"),
                  createTextVNode(" for all consent data. ")
                ]),
                createVNode("p", null, " Without these events, your local consent records may drift out of sync with the Hub, requiring you to poll the Consent Manager API to detect changes. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The consent event endpoint is called by the Hub to notify your LFI of consent lifecycle changes. The "),
              createVNode("code", null, "{operation}"),
              createTextVNode(" path parameter indicates the type of change: ")
            ]),
            _: 1
          }),
          createVNode("h3", null, [
            createVNode("span", { class: "endpoint" }, [
              createVNode("span", { class: "http-method http-method--post" }, "POST"),
              createVNode("code", null, "/consent/event/post")
            ]),
            createTextVNode(" — Consent created")
          ]),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Called immediately after a consent is successfully created (i.e. after validation passes, if configured). The request body contains the full consent object as stored in the API Hub's Consent Manager. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, [
            createVNode("span", { class: "endpoint" }, [
              createVNode("span", { class: "http-method http-method--post" }, "POST"),
              createVNode("code", null, "/consent/event/patch")
            ]),
            createTextVNode(" — Consent updated")
          ]),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Called every time a consent's state changes. This includes transitions such as:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("code", null, "AwaitingAuthorisation"),
                createTextVNode(" → "),
                createVNode("code", null, "Authorized"),
                createTextVNode(" (end user approved the consent)")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "AwaitingAuthorisation"),
                createTextVNode(" → "),
                createVNode("code", null, "Rejected"),
                createTextVNode(" (end user declined the consent)")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "Authorized"),
                createTextVNode(" → "),
                createVNode("code", null, "Revoked"),
                createTextVNode(" (consent revoked by TPP, LFI, or end user)")
              ]),
              createVNode("li", null, [
                createVNode("code", null, "Authorized"),
                createTextVNode(" → "),
                createVNode("code", null, "Expired"),
                createTextVNode(" (consent reached its expiration date)")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("The request body contains the full, updated consent object.")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Response"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For both operations, your LFI MUST return "),
              createVNode("code", null, "204 No Content"),
              createTextVNode(" to acknowledge receipt. The Hub does not retry failed notifications, and consent state changes are "),
              createVNode("strong", null, "not"),
              createTextVNode(" rolled back if your endpoint returns an error. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "Recommended for LFIs storing consents locally"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" If your LFI maintains a local copy of consents — for example, to power a Consent Management Interface or to support internal business logic — we "),
                createVNode("strong", null, "recommend"),
                createTextVNode(" implementing the consent event endpoints. This ensures your local consent state stays aligned with the API Hub, which is the "),
                createVNode("strong", null, "single source of truth"),
                createTextVNode(" for all consent data. ")
              ]),
              createVNode("p", null, " Without these events, your local consent records may drift out of sync with the Hub, requiring you to poll the Consent Manager API to detect changes. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "api-reference",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "API Reference",
    title: "Full request and response schemas",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-7475afb0${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate" class="endpoint" data-v-7475afb0${_scopeId2}><span class="http-method http-method--post" data-v-7475afb0${_scopeId2}>POST</span><code data-v-7475afb0${_scopeId2}>/consent/action/validate</code></a> — Full request and response schema</li><li data-v-7475afb0${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op" class="endpoint" data-v-7475afb0${_scopeId2}><span class="http-method http-method--post" data-v-7475afb0${_scopeId2}>POST</span><code data-v-7475afb0${_scopeId2}>/consent/event/{operation}</code></a> — Full request and response schema</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/action/validate")
                  ]),
                  createTextVNode(" — Full request and response schema")
                ]),
                createVNode("li", null, [
                  createVNode("a", {
                    href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op",
                    class: "endpoint"
                  }, [
                    createVNode("span", { class: "http-method http-method--post" }, "POST"),
                    createVNode("code", null, "/consent/event/{operation}")
                  ]),
                  createTextVNode(" — Full request and response schema")
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
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/validate")
                ]),
                createTextVNode(" — Full request and response schema")
              ]),
              createVNode("li", null, [
                createVNode("a", {
                  href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op",
                  class: "endpoint"
                }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/event/{operation}")
                ]),
                createTextVNode(" — Full request and response schema")
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
}
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/consent-events/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-7475afb0"]]);
export {
  index as default
};

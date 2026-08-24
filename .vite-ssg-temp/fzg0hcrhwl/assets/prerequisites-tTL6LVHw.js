import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdNote = __unplugin_components_7;
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdBullets = __unplugin_components_5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-86119446><section class="ed-doc__hero" data-v-86119446><div class="ed-doc__inner" data-v-86119446><div class="ed-doc__eyebrow" data-v-86119446><span class="ed-doc__eyebrow-dash" data-v-86119446></span> LFI · API Hub · Onboarding · Prerequisites </div><h1 class="ed-doc__title" data-v-86119446> Prerequisites <span class="ed-doc__read" data-v-86119446>4 min read</span></h1><p class="ed-doc__lede" data-v-86119446> Before your API Hub can be provisioned, you MUST complete the prerequisites questionnaire via a Service Desk ticket. This page describes the information you will need to provide and why it is required. </p>`);
  _push(ssrRenderComponent(_component_EdNote, { type: "info" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p data-v-86119446${_scopeId}> Ensure your organisation is registered in the Trust Framework before starting the prerequisites process. See <a href="/tech/lfi-api-hub/trust-framework/onboarding" data-v-86119446${_scopeId}>Trust Framework Onboarding</a> for details. </p>`);
      } else {
        return [
          createVNode("p", null, [
            createTextVNode(" Ensure your organisation is registered in the Trust Framework before starting the prerequisites process. See "),
            createVNode("a", { href: "/tech/lfi-api-hub/trust-framework/onboarding" }, "Trust Framework Onboarding"),
            createTextVNode(" for details. ")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "organisation-details",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Organisation details",
    title: "Legal name, IBAN, and contacts",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-86119446${_scopeId2}><thead data-v-86119446${_scopeId2}><tr data-v-86119446${_scopeId2}><th data-v-86119446${_scopeId2}>Field</th><th data-v-86119446${_scopeId2}>Description</th></tr></thead><tbody data-v-86119446${_scopeId2}><tr data-v-86119446${_scopeId2}><td data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>LFI Legal Name</strong></td><td data-v-86119446${_scopeId2}>Your legal name as it appears on your Trust Framework organisation page.</td></tr><tr data-v-86119446${_scopeId2}><td data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>IBAN Bank Code</strong></td><td data-v-86119446${_scopeId2}>The IBAN bank code for the brand associated with this onboarding. Not applicable for insurers.</td></tr><tr data-v-86119446${_scopeId2}><td data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Primary Technical Contact (PTC)</strong></td><td data-v-86119446${_scopeId2}>Email address of the main technical contact for integration queries.</td></tr><tr data-v-86119446${_scopeId2}><td data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Primary Business Contact (PBC)</strong></td><td data-v-86119446${_scopeId2}>Email address of the main business contact.</td></tr></tbody></table>`);
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
                        createVNode("strong", null, "LFI Legal Name")
                      ]),
                      createVNode("td", null, "Your legal name as it appears on your Trust Framework organisation page.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "IBAN Bank Code")
                      ]),
                      createVNode("td", null, "The IBAN bank code for the brand associated with this onboarding. Not applicable for insurers.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Primary Technical Contact (PTC)")
                      ]),
                      createVNode("td", null, "Email address of the main technical contact for integration queries.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Primary Business Contact (PBC)")
                      ]),
                      createVNode("td", null, "Email address of the main business contact.")
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
                    createVNode("th", null, "Field"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "LFI Legal Name")
                    ]),
                    createVNode("td", null, "Your legal name as it appears on your Trust Framework organisation page.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "IBAN Bank Code")
                    ]),
                    createVNode("td", null, "The IBAN bank code for the brand associated with this onboarding. Not applicable for insurers.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Primary Technical Contact (PTC)")
                    ]),
                    createVNode("td", null, "Email address of the main technical contact for integration queries.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Primary Business Contact (PBC)")
                    ]),
                    createVNode("td", null, "Email address of the main business contact.")
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
    id: "lfi-code",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "LFI Code",
    title: "Short identifier used in hostnames and headers",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Your <strong data-v-86119446${_scopeId2}>LFI Code</strong> is the short identifier that represents your institution across the API Hub. It is used in two places: `);
            } else {
              return [
                createTextVNode(" Your "),
                createVNode("strong", null, "LFI Code"),
                createTextVNode(" is the short identifier that represents your institution across the API Hub. It is used in two places: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Hostnames.</strong> It forms part of the URL for both the TPP-facing and LFI-facing domain names — including your API Hub&#39;s well-known discovery document URI. See <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" data-v-86119446${_scopeId2}>Environment Specific Configuration</a> for the full list of <code data-v-86119446${_scopeId2}>auth1.{lfiCode}.*</code>, <code data-v-86119446${_scopeId2}>rs1.{lfiCode}.*</code>, <code data-v-86119446${_scopeId2}>hh.{lfiCode}.*</code>, <code data-v-86119446${_scopeId2}>cm.{lfiCode}.*</code>, and <code data-v-86119446${_scopeId2}>admin.{lfiCode}.*</code> hostnames. </li><li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>The <code data-v-86119446${_scopeId2}>o3-provider-id</code> request header.</strong> Every request the API Hub forwards to your Ozone Connect endpoints carries <code data-v-86119446${_scopeId2}>o3-provider-id</code> set to your LFI Code, so Ozone Connect can identify which Hub the call originated from. This matters most for <a href="/knowledge-base/articles/multi-segment-api-hubs" data-v-86119446${_scopeId2}>multi-segment LFIs</a>. </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Hostnames."),
                  createTextVNode(" It forms part of the URL for both the TPP-facing and LFI-facing domain names — including your API Hub's well-known discovery document URI. See "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
                  createTextVNode(" for the full list of "),
                  createVNode("code", null, "auth1.{lfiCode}.*"),
                  createTextVNode(", "),
                  createVNode("code", null, "rs1.{lfiCode}.*"),
                  createTextVNode(", "),
                  createVNode("code", null, "hh.{lfiCode}.*"),
                  createTextVNode(", "),
                  createVNode("code", null, "cm.{lfiCode}.*"),
                  createTextVNode(", and "),
                  createVNode("code", null, "admin.{lfiCode}.*"),
                  createTextVNode(" hostnames. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, [
                    createTextVNode("The "),
                    createVNode("code", null, "o3-provider-id"),
                    createTextVNode(" request header.")
                  ]),
                  createTextVNode(" Every request the API Hub forwards to your Ozone Connect endpoints carries "),
                  createVNode("code", null, "o3-provider-id"),
                  createTextVNode(" set to your LFI Code, so Ozone Connect can identify which Hub the call originated from. This matters most for "),
                  createVNode("a", { href: "/knowledge-base/articles/multi-segment-api-hubs" }, "multi-segment LFIs"),
                  createTextVNode(". ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-86119446${_scopeId}>Choosing a value</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Pick a code that is:`);
            } else {
              return [
                createTextVNode("Pick a code that is:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Short</strong> — typically 3–8 characters. It will appear in every TPP integration and every URL.</li><li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Lowercase alphanumeric</strong> — no spaces, hyphens, underscores, or special characters (it must be DNS-safe).</li><li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Recognisable as your brand</strong> — usually an abbreviation of your legal or trading name.</li><li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Stable</strong> — once you go live, the LFI Code is effectively immutable. Changing it later means re-issuing every URL TPPs depend on, and is highly disruptive.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Short"),
                  createTextVNode(" — typically 3–8 characters. It will appear in every TPP integration and every URL.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Lowercase alphanumeric"),
                  createTextVNode(" — no spaces, hyphens, underscores, or special characters (it must be DNS-safe).")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Recognisable as your brand"),
                  createTextVNode(" — usually an abbreviation of your legal or trading name.")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Stable"),
                  createTextVNode(" — once you go live, the LFI Code is effectively immutable. Changing it later means re-issuing every URL TPPs depend on, and is highly disruptive.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-86119446${_scopeId}>Multi-brand institutions</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` If your institution operates multiple brands (e.g. retail and business), each brand will have its own API Hub and its own LFI Code, and each brand is onboarded separately. The common convention is to take your single-brand short code and append the segment as a single lowercase token — for example, FAB uses <code data-v-86119446${_scopeId2}>fabretail</code> for its retail Hub and <code data-v-86119446${_scopeId2}>fabbusiness</code> for its business Hub. See <a href="/knowledge-base/articles/multi-segment-api-hubs" data-v-86119446${_scopeId2}>Multi-Segment LFIs</a> for the full deployment model. `);
            } else {
              return [
                createTextVNode(" If your institution operates multiple brands (e.g. retail and business), each brand will have its own API Hub and its own LFI Code, and each brand is onboarded separately. The common convention is to take your single-brand short code and append the segment as a single lowercase token — for example, FAB uses "),
                createVNode("code", null, "fabretail"),
                createTextVNode(" for its retail Hub and "),
                createVNode("code", null, "fabbusiness"),
                createTextVNode(" for its business Hub. See "),
                createVNode("a", { href: "/knowledge-base/articles/multi-segment-api-hubs" }, "Multi-Segment LFIs"),
                createTextVNode(" for the full deployment model. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Your "),
              createVNode("strong", null, "LFI Code"),
              createTextVNode(" is the short identifier that represents your institution across the API Hub. It is used in two places: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Hostnames."),
                createTextVNode(" It forms part of the URL for both the TPP-facing and LFI-facing domain names — including your API Hub's well-known discovery document URI. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/" }, "Environment Specific Configuration"),
                createTextVNode(" for the full list of "),
                createVNode("code", null, "auth1.{lfiCode}.*"),
                createTextVNode(", "),
                createVNode("code", null, "rs1.{lfiCode}.*"),
                createTextVNode(", "),
                createVNode("code", null, "hh.{lfiCode}.*"),
                createTextVNode(", "),
                createVNode("code", null, "cm.{lfiCode}.*"),
                createTextVNode(", and "),
                createVNode("code", null, "admin.{lfiCode}.*"),
                createTextVNode(" hostnames. ")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, [
                  createTextVNode("The "),
                  createVNode("code", null, "o3-provider-id"),
                  createTextVNode(" request header.")
                ]),
                createTextVNode(" Every request the API Hub forwards to your Ozone Connect endpoints carries "),
                createVNode("code", null, "o3-provider-id"),
                createTextVNode(" set to your LFI Code, so Ozone Connect can identify which Hub the call originated from. This matters most for "),
                createVNode("a", { href: "/knowledge-base/articles/multi-segment-api-hubs" }, "multi-segment LFIs"),
                createTextVNode(". ")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Choosing a value"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Pick a code that is:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Short"),
                createTextVNode(" — typically 3–8 characters. It will appear in every TPP integration and every URL.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Lowercase alphanumeric"),
                createTextVNode(" — no spaces, hyphens, underscores, or special characters (it must be DNS-safe).")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Recognisable as your brand"),
                createTextVNode(" — usually an abbreviation of your legal or trading name.")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Stable"),
                createTextVNode(" — once you go live, the LFI Code is effectively immutable. Changing it later means re-issuing every URL TPPs depend on, and is highly disruptive.")
              ])
            ]),
            _: 1
          }),
          createVNode("h3", null, "Multi-brand institutions"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" If your institution operates multiple brands (e.g. retail and business), each brand will have its own API Hub and its own LFI Code, and each brand is onboarded separately. The common convention is to take your single-brand short code and append the segment as a single lowercase token — for example, FAB uses "),
              createVNode("code", null, "fabretail"),
              createTextVNode(" for its retail Hub and "),
              createVNode("code", null, "fabbusiness"),
              createTextVNode(" for its business Hub. See "),
              createVNode("a", { href: "/knowledge-base/articles/multi-segment-api-hubs" }, "Multi-Segment LFIs"),
              createTextVNode(" for the full deployment model. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "infrastructure",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Infrastructure",
    title: "Hosting environment and digital channels",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3 data-v-86119446${_scopeId}>Hosting Environment</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Indicate where your Ozone Connect endpoints will be hosted:`);
            } else {
              return [
                createTextVNode("Indicate where your Ozone Connect endpoints will be hosted:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-86119446${_scopeId2}>Azure</li><li data-v-86119446${_scopeId2}>AWS</li><li data-v-86119446${_scopeId2}>OCI (Oracle Cloud Infrastructure)</li><li data-v-86119446${_scopeId2}>GCP (Google Cloud Platform)</li><li data-v-86119446${_scopeId2}>On-premises</li>`);
            } else {
              return [
                createVNode("li", null, "Azure"),
                createVNode("li", null, "AWS"),
                createVNode("li", null, "OCI (Oracle Cloud Infrastructure)"),
                createVNode("li", null, "GCP (Google Cloud Platform)"),
                createVNode("li", null, "On-premises")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-86119446${_scopeId}>Digital Channels</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Indicate which digital channels you currently support for end user authentication and consent journeys: `);
            } else {
              return [
                createTextVNode(" Indicate which digital channels you currently support for end user authentication and consent journeys: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-86119446${_scopeId2}>Web</li><li data-v-86119446${_scopeId2}>Mobile</li><li data-v-86119446${_scopeId2}>Both</li>`);
            } else {
              return [
                createVNode("li", null, "Web"),
                createVNode("li", null, "Mobile"),
                createVNode("li", null, "Both")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("h3", null, "Hosting Environment"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Indicate where your Ozone Connect endpoints will be hosted:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Azure"),
              createVNode("li", null, "AWS"),
              createVNode("li", null, "OCI (Oracle Cloud Infrastructure)"),
              createVNode("li", null, "GCP (Google Cloud Platform)"),
              createVNode("li", null, "On-premises")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Digital Channels"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Indicate which digital channels you currently support for end user authentication and consent journeys: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Web"),
              createVNode("li", null, "Mobile"),
              createVNode("li", null, "Both")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "caap",
    num: "04",
    color: "var(--at-teal-deep)",
    eyebrow: "Authentication & Consent",
    title: "Will you adopt CAAP?",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Indicate whether you intend to adopt <strong data-v-86119446${_scopeId2}>CAAP</strong> — the Nebras-operated Central Authentication and Authorization Platform — for the end user&#39;s authentication and consent authorisation experience. `);
            } else {
              return [
                createTextVNode(" Indicate whether you intend to adopt "),
                createVNode("strong", null, "CAAP"),
                createTextVNode(" — the Nebras-operated Central Authentication and Authorization Platform — for the end user's authentication and consent authorisation experience. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Yes — CAAP.</strong> When a TPP creates a consent, the end user is redirected to CAAP for authentication and consent approval, and CAAP delivers the Consent Management Interface. You do not provide an Authorization Endpoint URL, and you do not implement the LFI-side Consent Management Interface or build directly against Headless Heimdall. You MUST implement the CAAP Operations endpoints on Ozone Connect — see <a href="/tech/lfi-api-hub/v2.2-rc1/caap/" data-v-86119446${_scopeId2}>CAAP</a>.</li><li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>No — LFI-operated.</strong> The end user is redirected to your <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" data-v-86119446${_scopeId2}>Authorization Endpoint</a>; you implement the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication" data-v-86119446${_scopeId2}>authentication and consent authorisation</a> UX and the <a href="/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" data-v-86119446${_scopeId2}>Consent Management Interface</a> yourself.</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Yes — CAAP."),
                  createTextVNode(" When a TPP creates a consent, the end user is redirected to CAAP for authentication and consent approval, and CAAP delivers the Consent Management Interface. You do not provide an Authorization Endpoint URL, and you do not implement the LFI-side Consent Management Interface or build directly against Headless Heimdall. You MUST implement the CAAP Operations endpoints on Ozone Connect — see "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/caap/" }, "CAAP"),
                  createTextVNode(".")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "No — LFI-operated."),
                  createTextVNode(" The end user is redirected to your "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                  createTextVNode("; you implement the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication" }, "authentication and consent authorisation"),
                  createTextVNode(" UX and the "),
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
                  createTextVNode(" yourself.")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Either way, Ozone Connect is still yours"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-86119446${_scopeId2}> Adopting CAAP does not change the LFI&#39;s responsibility to deliver the Ozone Connect endpoints for Bank Data Sharing, Bank Service Initiation, Insurance Data Sharing, and the other Open Finance services exposed to TPPs. </p>`);
            } else {
              return [
                createVNode("p", null, " Adopting CAAP does not change the LFI's responsibility to deliver the Ozone Connect endpoints for Bank Data Sharing, Bank Service Initiation, Insurance Data Sharing, and the other Open Finance services exposed to TPPs. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Indicate whether you intend to adopt "),
              createVNode("strong", null, "CAAP"),
              createTextVNode(" — the Nebras-operated Central Authentication and Authorization Platform — for the end user's authentication and consent authorisation experience. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Yes — CAAP."),
                createTextVNode(" When a TPP creates a consent, the end user is redirected to CAAP for authentication and consent approval, and CAAP delivers the Consent Management Interface. You do not provide an Authorization Endpoint URL, and you do not implement the LFI-side Consent Management Interface or build directly against Headless Heimdall. You MUST implement the CAAP Operations endpoints on Ozone Connect — see "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/caap/" }, "CAAP"),
                createTextVNode(".")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "No — LFI-operated."),
                createTextVNode(" The end user is redirected to your "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint" }, "Authorization Endpoint"),
                createTextVNode("; you implement the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication" }, "authentication and consent authorisation"),
                createTextVNode(" UX and the "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/" }, "Consent Management Interface"),
                createTextVNode(" yourself.")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Either way, Ozone Connect is still yours"
          }, {
            default: withCtx(() => [
              createVNode("p", null, " Adopting CAAP does not change the LFI's responsibility to deliver the Ozone Connect endpoints for Bank Data Sharing, Bank Service Initiation, Insurance Data Sharing, and the other Open Finance services exposed to TPPs. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "brands",
    num: "05",
    color: "var(--at-navy)",
    eyebrow: "Brands",
    title: "One Hub per business brand",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Indicate how many business brands you will be implementing. Each brand represents a separate API Hub instance — for example, a bank may have separate brands for retail and corporate, each requiring its own onboarding. `);
            } else {
              return [
                createTextVNode(" Indicate how many business brands you will be implementing. Each brand represents a separate API Hub instance — for example, a bank may have separate brands for retail and corporate, each requiring its own onboarding. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Indicate how many business brands you will be implementing. Each brand represents a separate API Hub instance — for example, a bank may have separate brands for retail and corporate, each requiring its own onboarding. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "supported-api-families",
    num: "06",
    color: "var(--at-teal-deep)",
    eyebrow: "Supported API Families",
    title: "Which API families you plan to support",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Indicate which API families you plan to support. The available families are:`);
            } else {
              return [
                createTextVNode("Indicate which API families you plan to support. The available families are:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Bank Data Sharing</strong> — account information, balances, transactions, and related data</li><li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Bank &amp; FX Service Initiation</strong> — payment initiation, including domestic transfers</li><li data-v-86119446${_scopeId2}><strong data-v-86119446${_scopeId2}>Consent Events &amp; Actions</strong> — consent lifecycle event notifications</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Bank Data Sharing"),
                  createTextVNode(" — account information, balances, transactions, and related data")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Bank & FX Service Initiation"),
                  createTextVNode(" — payment initiation, including domestic transfers")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Consent Events & Actions"),
                  createTextVNode(" — consent lifecycle event notifications")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Insurance"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-86119446${_scopeId2}>Insurance API families (e.g. Health, Motor, Travel) will be covered in a future update to this documentation.</p>`);
            } else {
              return [
                createVNode("p", null, "Insurance API families (e.g. Health, Motor, Travel) will be covered in a future update to this documentation.")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Indicate which API families you plan to support. The available families are:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Bank Data Sharing"),
                createTextVNode(" — account information, balances, transactions, and related data")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Bank & FX Service Initiation"),
                createTextVNode(" — payment initiation, including domestic transfers")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Consent Events & Actions"),
                createTextVNode(" — consent lifecycle event notifications")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Insurance"
          }, {
            default: withCtx(() => [
              createVNode("p", null, "Insurance API families (e.g. Health, Motor, Travel) will be covered in a future update to this documentation.")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "health-check",
    num: "07",
    color: "var(--at-gold)",
    eyebrow: "Health Check Endpoints",
    title: "Three mandatory endpoints",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The following health check endpoints are <strong data-v-86119446${_scopeId2}>mandatory</strong> for all LFI implementations: `);
            } else {
              return [
                createTextVNode(" The following health check endpoints are "),
                createVNode("strong", null, "mandatory"),
                createTextVNode(" for all LFI implementations: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-86119446${_scopeId2}><thead data-v-86119446${_scopeId2}><tr data-v-86119446${_scopeId2}><th data-v-86119446${_scopeId2}>Endpoint</th><th data-v-86119446${_scopeId2}>Description</th></tr></thead><tbody data-v-86119446${_scopeId2}><tr data-v-86119446${_scopeId2}><td data-v-86119446${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello" class="endpoint" data-v-86119446${_scopeId2}><span class="http-method http-method--get" data-v-86119446${_scopeId2}>GET</span><code data-v-86119446${_scopeId2}>/hello</code></a></td><td data-v-86119446${_scopeId2}>Basic connectivity check.</td></tr><tr data-v-86119446${_scopeId2}><td data-v-86119446${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello-mtls" class="endpoint" data-v-86119446${_scopeId2}><span class="http-method http-method--get" data-v-86119446${_scopeId2}>GET</span><code data-v-86119446${_scopeId2}>/hello-mtls</code></a></td><td data-v-86119446${_scopeId2}>Verifies mutual TLS is correctly configured.</td></tr><tr data-v-86119446${_scopeId2}><td data-v-86119446${_scopeId2}><a href="/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/echo-cert" class="endpoint" data-v-86119446${_scopeId2}><span class="http-method http-method--get" data-v-86119446${_scopeId2}>GET</span><code data-v-86119446${_scopeId2}>/echo-cert</code></a></td><td data-v-86119446${_scopeId2}>Returns the client certificate details received by your server, used to verify certificate propagation.</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Endpoint"),
                      createVNode("th", null, "Description")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/hello")
                        ])
                      ]),
                      createVNode("td", null, "Basic connectivity check.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello-mtls",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/hello-mtls")
                        ])
                      ]),
                      createVNode("td", null, "Verifies mutual TLS is correctly configured.")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("a", {
                          href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/echo-cert",
                          class: "endpoint"
                        }, [
                          createVNode("span", { class: "http-method http-method--get" }, "GET"),
                          createVNode("code", null, "/echo-cert")
                        ])
                      ]),
                      createVNode("td", null, "Returns the client certificate details received by your server, used to verify certificate propagation.")
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
              _push3(` These endpoints MUST be implemented and reachable before your integration can proceed to testing. See <a href="/tech/lfi-api-hub/v2.2-rc1/health-check/" data-v-86119446${_scopeId2}>Ozone Connect — Health Check</a> for full API reference and usage. `);
            } else {
              return [
                createTextVNode(" These endpoints MUST be implemented and reachable before your integration can proceed to testing. See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/health-check/" }, "Ozone Connect — Health Check"),
                createTextVNode(" for full API reference and usage. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The following health check endpoints are "),
              createVNode("strong", null, "mandatory"),
              createTextVNode(" for all LFI implementations: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Endpoint"),
                    createVNode("th", null, "Description")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/hello")
                      ])
                    ]),
                    createVNode("td", null, "Basic connectivity check.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello-mtls",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/hello-mtls")
                      ])
                    ]),
                    createVNode("td", null, "Verifies mutual TLS is correctly configured.")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("a", {
                        href: "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/echo-cert",
                        class: "endpoint"
                      }, [
                        createVNode("span", { class: "http-method http-method--get" }, "GET"),
                        createVNode("code", null, "/echo-cert")
                      ])
                    ]),
                    createVNode("td", null, "Returns the client certificate details received by your server, used to verify certificate propagation.")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" These endpoints MUST be implemented and reachable before your integration can proceed to testing. See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/health-check/" }, "Ozone Connect — Health Check"),
              createTextVNode(" for full API reference and usage. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "optional-features",
    num: "08",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Optional Features",
    title: "Pre-validation, event notifications, augmentation",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` During onboarding you will be asked which optional features you plan to implement. These are configured per API family. `);
            } else {
              return [
                createTextVNode(" During onboarding you will be asked which optional features you plan to implement. These are configured per API family. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-86119446${_scopeId}>Consent Pre-Validation</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Allows your Ozone Connect implementation to validate a consent before it is created. When enabled, the API Hub calls your validation endpoint during consent creation. `);
            } else {
              return [
                createTextVNode(" Allows your Ozone Connect implementation to validate a consent before it is created. When enabled, the API Hub calls your validation endpoint during consent creation. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Strongly Recommended"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-86119446${_scopeId2}> Consent Pre-Validation is <strong data-v-86119446${_scopeId2}>strongly recommended</strong> for all LFI implementations. Implementing this feature allows you to catch invalid consent parameters early — before the end user begins the authorization journey — resulting in a significantly better customer experience. This feature may become a <strong data-v-86119446${_scopeId2}>mandatory requirement</strong> in a future version of the specification if adoption is insufficient. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" Consent Pre-Validation is "),
                  createVNode("strong", null, "strongly recommended"),
                  createTextVNode(" for all LFI implementations. Implementing this feature allows you to catch invalid consent parameters early — before the end user begins the authorization journey — resulting in a significantly better customer experience. This feature may become a "),
                  createVNode("strong", null, "mandatory requirement"),
                  createTextVNode(" in a future version of the specification if adoption is insufficient. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/" data-v-86119446${_scopeId2}>Consent Events &amp; Actions</a> for details. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/" }, "Consent Events & Actions"),
                createTextVNode(" for details. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-86119446${_scopeId}>Consent Event Notification</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Enables asynchronous notification of consent lifecycle events to your Ozone Connect implementation. When enabled, the API Hub sends event notifications when consents are created, authorized, revoked, or otherwise modified. `);
            } else {
              return [
                createTextVNode(" Enables asynchronous notification of consent lifecycle events to your Ozone Connect implementation. When enabled, the API Hub sends event notifications when consents are created, authorized, revoked, or otherwise modified. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` See <a href="/tech/lfi-api-hub/v2.2-rc1/consent-events/" data-v-86119446${_scopeId2}>Consent Events &amp; Actions</a> for details. `);
            } else {
              return [
                createTextVNode(" See "),
                createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/" }, "Consent Events & Actions"),
                createTextVNode(" for details. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-86119446${_scopeId}>Consent Augmentation</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Enables the <span class="endpoint" data-v-86119446${_scopeId2}><span class="http-method http-method--post" data-v-86119446${_scopeId2}>POST</span><code data-v-86119446${_scopeId2}>/consent/action/augment</code></span> endpoint on your Ozone Connect implementation, which the API Hub calls to request an augmented consent payload during consent creation. `);
            } else {
              return [
                createTextVNode(" Enables the "),
                createVNode("span", { class: "endpoint" }, [
                  createVNode("span", { class: "http-method http-method--post" }, "POST"),
                  createVNode("code", null, "/consent/action/augment")
                ]),
                createTextVNode(" endpoint on your Ozone Connect implementation, which the API Hub calls to request an augmented consent payload during consent creation. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "warning",
          title: "Not currently recommended"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-86119446${_scopeId2}> LFIs SHOULD NOT enable Consent Augmentation. Select <strong data-v-86119446${_scopeId2}>No</strong> on the onboarding form unless Nebras has specifically advised you to enable it. The feature may be revisited in a future version of the specification. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" LFIs SHOULD NOT enable Consent Augmentation. Select "),
                  createVNode("strong", null, "No"),
                  createTextVNode(" on the onboarding form unless Nebras has specifically advised you to enable it. The feature may be revisited in a future version of the specification. ")
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
              createTextVNode(" During onboarding you will be asked which optional features you plan to implement. These are configured per API family. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Consent Pre-Validation"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Allows your Ozone Connect implementation to validate a consent before it is created. When enabled, the API Hub calls your validation endpoint during consent creation. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Strongly Recommended"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" Consent Pre-Validation is "),
                createVNode("strong", null, "strongly recommended"),
                createTextVNode(" for all LFI implementations. Implementing this feature allows you to catch invalid consent parameters early — before the end user begins the authorization journey — resulting in a significantly better customer experience. This feature may become a "),
                createVNode("strong", null, "mandatory requirement"),
                createTextVNode(" in a future version of the specification if adoption is insufficient. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/" }, "Consent Events & Actions"),
              createTextVNode(" for details. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Consent Event Notification"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Enables asynchronous notification of consent lifecycle events to your Ozone Connect implementation. When enabled, the API Hub sends event notifications when consents are created, authorized, revoked, or otherwise modified. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" See "),
              createVNode("a", { href: "/tech/lfi-api-hub/v2.2-rc1/consent-events/" }, "Consent Events & Actions"),
              createTextVNode(" for details. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Consent Augmentation"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Enables the "),
              createVNode("span", { class: "endpoint" }, [
                createVNode("span", { class: "http-method http-method--post" }, "POST"),
                createVNode("code", null, "/consent/action/augment")
              ]),
              createTextVNode(" endpoint on your Ozone Connect implementation, which the API Hub calls to request an augmented consent payload during consent creation. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "warning",
            title: "Not currently recommended"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" LFIs SHOULD NOT enable Consent Augmentation. Select "),
                createVNode("strong", null, "No"),
                createTextVNode(" on the onboarding form unless Nebras has specifically advised you to enable it. The feature may be revisited in a future version of the specification. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const prerequisites = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-86119446"]]);
export {
  prerequisites as default
};

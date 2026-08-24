import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
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
  const _component_EdBullets = __unplugin_components_5;
  const _component_ImageViewer = ImageViewer;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdNote = __unplugin_components_7;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-4728f367><section class="ed-doc__hero" data-v-4728f367><div class="ed-doc__inner" data-v-4728f367><div class="ed-doc__eyebrow" data-v-4728f367><span class="ed-doc__eyebrow-dash" data-v-4728f367></span> LFI · API Hub · Admin Portal · Logs </div><h1 class="ed-doc__title" data-v-4728f367> Logs <span class="ed-doc__read" data-v-4728f367>3 min read</span></h1><p class="ed-doc__lede" data-v-4728f367> The Admin Portal provides two types of logs: <strong data-v-4728f367>Audit Logs</strong> that track all portal activity, and <strong data-v-4728f367>API Logs</strong> that trace every request processed by the API Hub. </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "audit-logs",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Audit logs",
    title: "Every action taken by every portal user",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The audit log records every action taken by every user within the Admin Portal. This includes reading consent data, viewing TPP details, activating or blocking TPPs, and any other portal interaction. `);
            } else {
              return [
                createTextVNode(" The audit log records every action taken by every user within the Admin Portal. This includes reading consent data, viewing TPP details, activating or blocking TPPs, and any other portal interaction. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`Each audit log entry includes:`);
            } else {
              return [
                createTextVNode("Each audit log entry includes:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>User</strong> — the portal user who performed the action</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Action</strong> — the operation performed (e.g. read, update, activate, block)</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Target</strong> — the resource affected (e.g. TPP, client, consent)</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Timestamp</strong> — when the action occurred</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "User"),
                  createTextVNode(" — the portal user who performed the action")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Action"),
                  createTextVNode(" — the operation performed (e.g. read, update, activate, block)")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Target"),
                  createTextVNode(" — the resource affected (e.g. TPP, client, consent)")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Timestamp"),
                  createTextVNode(" — when the action occurred")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Audit logs are particularly important for tracking administrative changes. If a TPP is blocked or a configuration is changed, the audit log provides a complete record of who made the change and when. `);
            } else {
              return [
                createTextVNode(" Audit logs are particularly important for tracking administrative changes. If a TPP is blocked or a configuration is changed, the audit log provides a complete record of who made the change and when. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/Audit-logs.png",
          alt: "Audit Log showing a list of portal actions with user, action type, target, and timestamp"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The audit log records every action taken by every user within the Admin Portal. This includes reading consent data, viewing TPP details, activating or blocking TPPs, and any other portal interaction. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("Each audit log entry includes:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "User"),
                createTextVNode(" — the portal user who performed the action")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Action"),
                createTextVNode(" — the operation performed (e.g. read, update, activate, block)")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Target"),
                createTextVNode(" — the resource affected (e.g. TPP, client, consent)")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Timestamp"),
                createTextVNode(" — when the action occurred")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Audit logs are particularly important for tracking administrative changes. If a TPP is blocked or a configuration is changed, the audit log provides a complete record of who made the change and when. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/Audit-logs.png",
            alt: "Audit Log showing a list of portal actions with user, action type, target, and timestamp"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "api-logs",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "API logs",
    title: "Granular trace of every request through the Hub",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` API logs provide a complete, granular trace of every request that flows through the API Hub. This is the primary debugging tool for investigating API issues. `);
            } else {
              return [
                createTextVNode(" API logs provide a complete, granular trace of every request that flows through the API Hub. This is the primary debugging tool for investigating API issues. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<h3 data-v-4728f367${_scopeId}>Searching by interaction ID</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Every API request carries an <code data-v-4728f367${_scopeId2}>x-fapi-interaction-id</code> header. To trace a request, enter this interaction ID in the API logs search field. The portal will return <strong data-v-4728f367${_scopeId2}>every log entry</strong> associated with that request — typically hundreds of entries covering every stage of processing. `);
            } else {
              return [
                createTextVNode(" Every API request carries an "),
                createVNode("code", null, "x-fapi-interaction-id"),
                createTextVNode(" header. To trace a request, enter this interaction ID in the API logs search field. The portal will return "),
                createVNode("strong", null, "every log entry"),
                createTextVNode(" associated with that request — typically hundreds of entries covering every stage of processing. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/API-logs.png",
          alt: "API Log search field with an x-fapi-interaction-id entered"
        }, null, _parent2, _scopeId));
        _push2(`<h3 data-v-4728f367${_scopeId}>What the logs show</h3>`);
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` For a single interaction ID, the API logs show the complete lifecycle of the request through the API Hub: `);
            } else {
              return [
                createTextVNode(" For a single interaction ID, the API logs show the complete lifecycle of the request through the API Hub: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Inbound request</strong> — the TPP&#39;s request arriving at the API Hub, including headers, certificate details, and the original URL</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Validation and enrichment</strong> — each step of token validation, consent checking, schema enforcement, and request enrichment</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Outbound request to LFI</strong> — the request forwarded to the LFI&#39;s Ozone Connect endpoint</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>LFI response</strong> — the response received from the LFI</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Response processing</strong> — normalization, error mapping, and response construction</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Outbound response to TPP</strong> — the final response returned to the TPP</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Inbound request"),
                  createTextVNode(" — the TPP's request arriving at the API Hub, including headers, certificate details, and the original URL")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Validation and enrichment"),
                  createTextVNode(" — each step of token validation, consent checking, schema enforcement, and request enrichment")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Outbound request to LFI"),
                  createTextVNode(" — the request forwarded to the LFI's Ozone Connect endpoint")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "LFI response"),
                  createTextVNode(" — the response received from the LFI")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Response processing"),
                  createTextVNode(" — normalization, error mapping, and response construction")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Outbound response to TPP"),
                  createTextVNode(" — the final response returned to the TPP")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Each log entry contains detailed metadata. From the request headers alone you can identify: `);
            } else {
              return [
                createTextVNode(" Each log entry contains detailed metadata. From the request headers alone you can identify: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-4728f367${_scopeId2}><thead data-v-4728f367${_scopeId2}><tr data-v-4728f367${_scopeId2}><th data-v-4728f367${_scopeId2}>Header / Field</th><th data-v-4728f367${_scopeId2}>Information</th></tr></thead><tbody data-v-4728f367${_scopeId2}><tr data-v-4728f367${_scopeId2}><td data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Host</strong></td><td data-v-4728f367${_scopeId2}>Which API Hub endpoint received the request (resource server, authorization server, etc.)</td></tr><tr data-v-4728f367${_scopeId2}><td data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>X-Original-URL</strong></td><td data-v-4728f367${_scopeId2}>The API path called, including the API version and resource (e.g. <code data-v-4728f367${_scopeId2}>/account-information/v1.2/accounts/{AccountId}/beneficiaries</code>)</td></tr><tr data-v-4728f367${_scopeId2}><td data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>X-Cert-DN</strong></td><td data-v-4728f367${_scopeId2}>The certificate distinguished name, identifying which TPP made the request</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Header / Field"),
                      createVNode("th", null, "Information")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Host")
                      ]),
                      createVNode("td", null, "Which API Hub endpoint received the request (resource server, authorization server, etc.)")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "X-Original-URL")
                      ]),
                      createVNode("td", null, [
                        createTextVNode("The API path called, including the API version and resource (e.g. "),
                        createVNode("code", null, "/account-information/v1.2/accounts/{AccountId}/beneficiaries"),
                        createTextVNode(")")
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "X-Cert-DN")
                      ]),
                      createVNode("td", null, "The certificate distinguished name, identifying which TPP made the request")
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/API-logs-detail.png",
          alt: "API Log detail view showing the sequence of log entries for a single x-fapi-interaction-id, including request headers and processing steps"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/logs-reports/Log-Entry.png",
          alt: "Expanded log entry showing request headers with host, X-Original-URL, and X-Cert-DN fields"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" API logs provide a complete, granular trace of every request that flows through the API Hub. This is the primary debugging tool for investigating API issues. ")
            ]),
            _: 1
          }),
          createVNode("h3", null, "Searching by interaction ID"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Every API request carries an "),
              createVNode("code", null, "x-fapi-interaction-id"),
              createTextVNode(" header. To trace a request, enter this interaction ID in the API logs search field. The portal will return "),
              createVNode("strong", null, "every log entry"),
              createTextVNode(" associated with that request — typically hundreds of entries covering every stage of processing. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/API-logs.png",
            alt: "API Log search field with an x-fapi-interaction-id entered"
          }),
          createVNode("h3", null, "What the logs show"),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" For a single interaction ID, the API logs show the complete lifecycle of the request through the API Hub: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Inbound request"),
                createTextVNode(" — the TPP's request arriving at the API Hub, including headers, certificate details, and the original URL")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Validation and enrichment"),
                createTextVNode(" — each step of token validation, consent checking, schema enforcement, and request enrichment")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Outbound request to LFI"),
                createTextVNode(" — the request forwarded to the LFI's Ozone Connect endpoint")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "LFI response"),
                createTextVNode(" — the response received from the LFI")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Response processing"),
                createTextVNode(" — normalization, error mapping, and response construction")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Outbound response to TPP"),
                createTextVNode(" — the final response returned to the TPP")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Each log entry contains detailed metadata. From the request headers alone you can identify: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Header / Field"),
                    createVNode("th", null, "Information")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Host")
                    ]),
                    createVNode("td", null, "Which API Hub endpoint received the request (resource server, authorization server, etc.)")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "X-Original-URL")
                    ]),
                    createVNode("td", null, [
                      createTextVNode("The API path called, including the API version and resource (e.g. "),
                      createVNode("code", null, "/account-information/v1.2/accounts/{AccountId}/beneficiaries"),
                      createTextVNode(")")
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "X-Cert-DN")
                    ]),
                    createVNode("td", null, "The certificate distinguished name, identifying which TPP made the request")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/API-logs-detail.png",
            alt: "API Log detail view showing the sequence of log entries for a single x-fapi-interaction-id, including request headers and processing steps"
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/logs-reports/Log-Entry.png",
            alt: "Expanded log entry showing request headers with host, X-Original-URL, and X-Cert-DN fields"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "debugging",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Debugging with API logs",
    title: "Common scenarios and practical tips",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The log entries follow the <strong data-v-4728f367${_scopeId2}>same pattern for every request</strong>. After reviewing a few traces, you will quickly learn which entries correspond to which stage of processing. Common debugging scenarios: `);
            } else {
              return [
                createTextVNode(" The log entries follow the "),
                createVNode("strong", null, "same pattern for every request"),
                createTextVNode(". After reviewing a few traces, you will quickly learn which entries correspond to which stage of processing. Common debugging scenarios: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Unexpected error response</strong> — search by interaction ID, locate the LFI response entry, and inspect the status code and body returned by your Ozone Connect endpoint</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Schema validation failure</strong> — the log will show the validation step that rejected the request or response, with the specific schema error</li><li data-v-4728f367${_scopeId2}><strong data-v-4728f367${_scopeId2}>Consent or token issue</strong> — the validation entries will indicate whether consent or token checks failed, and why</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Unexpected error response"),
                  createTextVNode(" — search by interaction ID, locate the LFI response entry, and inspect the status code and body returned by your Ozone Connect endpoint")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Schema validation failure"),
                  createTextVNode(" — the log will show the validation step that rejected the request or response, with the specific schema error")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Consent or token issue"),
                  createTextVNode(" — the validation entries will indicate whether consent or token checks failed, and why")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "tip",
          title: "Practical tip"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-4728f367${_scopeId2}> When a TPP reports an issue, ask them for the <code data-v-4728f367${_scopeId2}>x-fapi-interaction-id</code> from the request. With this ID, you can trace the entire request lifecycle in the API logs and identify exactly where the issue occurred — whether in the API Hub&#39;s processing or in your LFI response. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" When a TPP reports an issue, ask them for the "),
                  createVNode("code", null, "x-fapi-interaction-id"),
                  createTextVNode(" from the request. With this ID, you can trace the entire request lifecycle in the API logs and identify exactly where the issue occurred — whether in the API Hub's processing or in your LFI response. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Scope of API logs"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-4728f367${_scopeId2}> API logs cover everything that happens <strong data-v-4728f367${_scopeId2}>within the API Hub</strong>. Once the request is forwarded to your Ozone Connect endpoint, any processing within your own systems is logged in your own infrastructure. The API logs show the request sent to you and the response received back. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" API logs cover everything that happens "),
                  createVNode("strong", null, "within the API Hub"),
                  createTextVNode(". Once the request is forwarded to your Ozone Connect endpoint, any processing within your own systems is logged in your own infrastructure. The API logs show the request sent to you and the response received back. ")
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
              createTextVNode(" The log entries follow the "),
              createVNode("strong", null, "same pattern for every request"),
              createTextVNode(". After reviewing a few traces, you will quickly learn which entries correspond to which stage of processing. Common debugging scenarios: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Unexpected error response"),
                createTextVNode(" — search by interaction ID, locate the LFI response entry, and inspect the status code and body returned by your Ozone Connect endpoint")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Schema validation failure"),
                createTextVNode(" — the log will show the validation step that rejected the request or response, with the specific schema error")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Consent or token issue"),
                createTextVNode(" — the validation entries will indicate whether consent or token checks failed, and why")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "tip",
            title: "Practical tip"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" When a TPP reports an issue, ask them for the "),
                createVNode("code", null, "x-fapi-interaction-id"),
                createTextVNode(" from the request. With this ID, you can trace the entire request lifecycle in the API logs and identify exactly where the issue occurred — whether in the API Hub's processing or in your LFI response. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Scope of API logs"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" API logs cover everything that happens "),
                createVNode("strong", null, "within the API Hub"),
                createTextVNode(". Once the request is forwarded to your Ozone Connect endpoint, any processing within your own systems is logged in your own infrastructure. The API logs show the request sent to you and the response received back. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/admin-portal/logs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const logs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4728f367"]]);
export {
  logs as default
};

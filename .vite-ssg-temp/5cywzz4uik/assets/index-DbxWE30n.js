import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_EdSectionBand = __unplugin_components_3;
  const _component_EdBullets = __unplugin_components_5;
  const _component_EdProse = __unplugin_components_4;
  const _component_EdRefTable = __unplugin_components_12;
  const _component_EdNote = __unplugin_components_7;
  const _component_ImageViewer = ImageViewer;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-1d62558d><section class="ed-doc__hero" data-v-1d62558d><div class="ed-doc__inner" data-v-1d62558d><div class="ed-doc__eyebrow" data-v-1d62558d><span class="ed-doc__eyebrow-dash" data-v-1d62558d></span> LFI · API Hub · Admin Portal </div><h1 class="ed-doc__title" data-v-1d62558d> Admin Portal <span class="ed-doc__read" data-v-1d62558d>2 min read</span></h1><p class="ed-doc__lede" data-v-1d62558d> Each API Hub includes a dedicated <strong data-v-1d62558d>Admin Portal</strong> — a web-based management interface where LFI teams can manage TPP access, investigate API traffic, and review operational reports. </p><p class="ed-doc__lede ed-doc__lede--tight" data-v-1d62558d> The following key areas of the Admin Portal are covered in detail on their own pages: </p></div></section>`);
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "key-areas",
    num: "01",
    color: "var(--at-teal)",
    eyebrow: "Key areas",
    title: "Dedicated pages for the most-used sections",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-1d62558d${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation" data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>TPP Management</strong></a> — view, activate, and block TPPs, software statements, and clients </li><li data-v-1d62558d${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/logs" data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Logs</strong></a> — audit logs and API request tracing </li><li data-v-1d62558d${_scopeId2}><a href="/tech/lfi-api-hub/v2.1/api-hub/admin-portal/reports" data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Reports</strong></a> — performance metrics, call volumes, and consent statistics </li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation" }, [
                    createVNode("strong", null, "TPP Management")
                  ]),
                  createTextVNode(" — view, activate, and block TPPs, software statements, and clients ")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/logs" }, [
                    createVNode("strong", null, "Logs")
                  ]),
                  createTextVNode(" — audit logs and API request tracing ")
                ]),
                createVNode("li", null, [
                  createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/reports" }, [
                    createVNode("strong", null, "Reports")
                  ]),
                  createTextVNode(" — performance metrics, call volumes, and consent statistics ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The remaining portal sections — Dashboard, Consent Management, and Planned Outages — are described below. `);
            } else {
              return [
                createTextVNode(" The remaining portal sections — Dashboard, Consent Management, and Planned Outages — are described below. ")
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
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation" }, [
                  createVNode("strong", null, "TPP Management")
                ]),
                createTextVNode(" — view, activate, and block TPPs, software statements, and clients ")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/logs" }, [
                  createVNode("strong", null, "Logs")
                ]),
                createTextVNode(" — audit logs and API request tracing ")
              ]),
              createVNode("li", null, [
                createVNode("a", { href: "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/reports" }, [
                  createVNode("strong", null, "Reports")
                ]),
                createTextVNode(" — performance metrics, call volumes, and consent statistics ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The remaining portal sections — Dashboard, Consent Management, and Planned Outages — are described below. ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "environments",
    num: "02",
    color: "var(--at-gold)",
    eyebrow: "Environments",
    title: "One portal per Hub instance, per environment",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Every LFI receives one Admin Portal per API Hub instance, per environment: `);
            } else {
              return [
                createTextVNode(" Every LFI receives one Admin Portal per API Hub instance, per environment: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdRefTable, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<table data-v-1d62558d${_scopeId2}><thead data-v-1d62558d${_scopeId2}><tr data-v-1d62558d${_scopeId2}><th data-v-1d62558d${_scopeId2}>Environment</th><th data-v-1d62558d${_scopeId2}>URL</th><th data-v-1d62558d${_scopeId2}>SSO Provider</th></tr></thead><tbody data-v-1d62558d${_scopeId2}><tr data-v-1d62558d${_scopeId2}><td data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Production</strong></td><td data-v-1d62558d${_scopeId2}><code data-v-1d62558d${_scopeId2}>https://admin.{lficode}.apihub.openfinance.ae</code></td><td data-v-1d62558d${_scopeId2}>Production Trust Framework</td></tr><tr data-v-1d62558d${_scopeId2}><td data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Pre-production</strong></td><td data-v-1d62558d${_scopeId2}><code data-v-1d62558d${_scopeId2}>https://admin.{lficode}.preprod.apihub.openfinance.ae</code></td><td data-v-1d62558d${_scopeId2}>Sandbox Trust Framework</td></tr></tbody></table>`);
            } else {
              return [
                createVNode("table", null, [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "Environment"),
                      createVNode("th", null, "URL"),
                      createVNode("th", null, "SSO Provider")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Production")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "https://admin.{lficode}.apihub.openfinance.ae")
                      ]),
                      createVNode("td", null, "Production Trust Framework")
                    ]),
                    createVNode("tr", null, [
                      createVNode("td", null, [
                        createVNode("strong", null, "Pre-production")
                      ]),
                      createVNode("td", null, [
                        createVNode("code", null, "https://admin.{lficode}.preprod.apihub.openfinance.ae")
                      ]),
                      createVNode("td", null, "Sandbox Trust Framework")
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
              _push3(` Organisations with multiple API Hubs (e.g. separate hubs for retail and corporate banking) receive a portal per hub. `);
            } else {
              return [
                createTextVNode(" Organisations with multiple API Hubs (e.g. separate hubs for retail and corporate banking) receive a portal per hub. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "LFI Code"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-1d62558d${_scopeId2}><code data-v-1d62558d${_scopeId2}>{lficode}</code> is the unique identifier assigned to your organisation. Your Nebras onboarding contact will confirm your LFI code. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createVNode("code", null, "{lficode}"),
                  createTextVNode(" is the unique identifier assigned to your organisation. Your Nebras onboarding contact will confirm your LFI code. ")
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
              createTextVNode(" Every LFI receives one Admin Portal per API Hub instance, per environment: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdRefTable, null, {
            default: withCtx(() => [
              createVNode("table", null, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Environment"),
                    createVNode("th", null, "URL"),
                    createVNode("th", null, "SSO Provider")
                  ])
                ]),
                createVNode("tbody", null, [
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Production")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "https://admin.{lficode}.apihub.openfinance.ae")
                    ]),
                    createVNode("td", null, "Production Trust Framework")
                  ]),
                  createVNode("tr", null, [
                    createVNode("td", null, [
                      createVNode("strong", null, "Pre-production")
                    ]),
                    createVNode("td", null, [
                      createVNode("code", null, "https://admin.{lficode}.preprod.apihub.openfinance.ae")
                    ]),
                    createVNode("td", null, "Sandbox Trust Framework")
                  ])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Organisations with multiple API Hubs (e.g. separate hubs for retail and corporate banking) receive a portal per hub. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "LFI Code"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createVNode("code", null, "{lficode}"),
                createTextVNode(" is the unique identifier assigned to your organisation. Your Nebras onboarding contact will confirm your LFI code. ")
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
    id: "access",
    num: "03",
    color: "var(--at-blue-deep, #1d4ed8)",
    eyebrow: "Access & authentication",
    title: "Trust Framework SSO with role-based access",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Portal access is managed via <strong data-v-1d62558d${_scopeId2}>Single Sign-On (SSO)</strong> from the Trust Framework. Users who hold the relevant roles in the Trust Framework — such as Primary Technical Contact (PTC), Primary Business Contact (PBC), or Secondary Technical Contact (STC) — are automatically granted access. `);
            } else {
              return [
                createTextVNode(" Portal access is managed via "),
                createVNode("strong", null, "Single Sign-On (SSO)"),
                createTextVNode(" from the Trust Framework. Users who hold the relevant roles in the Trust Framework — such as Primary Technical Contact (PTC), Primary Business Contact (PBC), or Secondary Technical Contact (STC) — are automatically granted access. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Production</strong> portal authenticates against the <strong data-v-1d62558d${_scopeId2}>Production Trust Framework</strong></li><li data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Pre-production</strong> portal authenticates against the <strong data-v-1d62558d${_scopeId2}>Sandbox Trust Framework</strong></li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Production"),
                  createTextVNode(" portal authenticates against the "),
                  createVNode("strong", null, "Production Trust Framework")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Pre-production"),
                  createTextVNode(" portal authenticates against the "),
                  createVNode("strong", null, "Sandbox Trust Framework")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` There is no separate user management within the portal itself. To grant or revoke portal access, manage the user&#39;s roles in the Trust Framework. The portal&#39;s <strong data-v-1d62558d${_scopeId2}>User Management</strong> section displays all users who currently have access and their roles. `);
            } else {
              return [
                createTextVNode(" There is no separate user management within the portal itself. To grant or revoke portal access, manage the user's roles in the Trust Framework. The portal's "),
                createVNode("strong", null, "User Management"),
                createTextVNode(" section displays all users who currently have access and their roles. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/User-Management.png",
          alt: "User Management page showing users with PTC, PBC, and STC roles"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Portal access is managed via "),
              createVNode("strong", null, "Single Sign-On (SSO)"),
              createTextVNode(" from the Trust Framework. Users who hold the relevant roles in the Trust Framework — such as Primary Technical Contact (PTC), Primary Business Contact (PBC), or Secondary Technical Contact (STC) — are automatically granted access. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Production"),
                createTextVNode(" portal authenticates against the "),
                createVNode("strong", null, "Production Trust Framework")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Pre-production"),
                createTextVNode(" portal authenticates against the "),
                createVNode("strong", null, "Sandbox Trust Framework")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" There is no separate user management within the portal itself. To grant or revoke portal access, manage the user's roles in the Trust Framework. The portal's "),
              createVNode("strong", null, "User Management"),
              createTextVNode(" section displays all users who currently have access and their roles. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/User-Management.png",
            alt: "User Management page showing users with PTC, PBC, and STC roles"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "dashboard",
    num: "04",
    color: "var(--at-navy)",
    eyebrow: "Dashboard",
    title: "At-a-glance API Hub health",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The dashboard is the landing page after login. It provides a summary of API Hub health and request distribution. While useful for a quick overview, the <strong data-v-1d62558d${_scopeId2}>Reports</strong> and <strong data-v-1d62558d${_scopeId2}>Logs</strong> sections provide the detailed data needed for day-to-day operations and debugging. `);
            } else {
              return [
                createTextVNode(" The dashboard is the landing page after login. It provides a summary of API Hub health and request distribution. While useful for a quick overview, the "),
                createVNode("strong", null, "Reports"),
                createTextVNode(" and "),
                createVNode("strong", null, "Logs"),
                createTextVNode(" sections provide the detailed data needed for day-to-day operations and debugging. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/Admin-Portal.png",
          alt: "Admin Portal dashboard showing performance overview and request distribution"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The dashboard is the landing page after login. It provides a summary of API Hub health and request distribution. While useful for a quick overview, the "),
              createVNode("strong", null, "Reports"),
              createTextVNode(" and "),
              createVNode("strong", null, "Logs"),
              createTextVNode(" sections provide the detailed data needed for day-to-day operations and debugging. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/Admin-Portal.png",
            alt: "Admin Portal dashboard showing performance overview and request distribution"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "consent-management",
    num: "05",
    color: "var(--at-teal-deep)",
    eyebrow: "Consent Management",
    title: "Browse, filter, and inspect consents",
    tone: "cream"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The consent management section lists all consents created against your API Hub. Each entry shows the consent ID, TPP name, consent type, status, and creation date. `);
            } else {
              return [
                createTextVNode(" The consent management section lists all consents created against your API Hub. Each entry shows the consent ID, TPP name, consent type, status, and creation date. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`You can filter and sort consents by:`);
            } else {
              return [
                createTextVNode("You can filter and sort consents by:")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Consent type</strong> — data sharing or service initiation</li><li data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Status</strong> — e.g. <code data-v-1d62558d${_scopeId2}>Authorised</code>, <code data-v-1d62558d${_scopeId2}>Rejected</code>, <code data-v-1d62558d${_scopeId2}>Expired</code>, <code data-v-1d62558d${_scopeId2}>Revoked</code>, <code data-v-1d62558d${_scopeId2}>Consumed</code></li><li data-v-1d62558d${_scopeId2}><strong data-v-1d62558d${_scopeId2}>Created date</strong> — ascending or descending</li>`);
            } else {
              return [
                createVNode("li", null, [
                  createVNode("strong", null, "Consent type"),
                  createTextVNode(" — data sharing or service initiation")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Status"),
                  createTextVNode(" — e.g. "),
                  createVNode("code", null, "Authorised"),
                  createTextVNode(", "),
                  createVNode("code", null, "Rejected"),
                  createTextVNode(", "),
                  createVNode("code", null, "Expired"),
                  createTextVNode(", "),
                  createVNode("code", null, "Revoked"),
                  createTextVNode(", "),
                  createVNode("code", null, "Consumed")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Created date"),
                  createTextVNode(" — ascending or descending")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdNote, {
          type: "info",
          title: "Ozone Health Probe"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p data-v-1d62558d${_scopeId2}> You will see regular data-sharing consents created by the <strong data-v-1d62558d${_scopeId2}>Ozone Health Probe</strong> client. This is an automated monitoring client that periodically creates consents (via PAR) to verify the health of your API Hub. These consents are never authorised and will expire automatically. When reviewing consent data, filter out the Ozone client to focus on real TPP activity. </p>`);
            } else {
              return [
                createVNode("p", null, [
                  createTextVNode(" You will see regular data-sharing consents created by the "),
                  createVNode("strong", null, "Ozone Health Probe"),
                  createTextVNode(" client. This is an automated monitoring client that periodically creates consents (via PAR) to verify the health of your API Hub. These consents are never authorised and will expire automatically. When reviewing consent data, filter out the Ozone client to focus on real TPP activity. ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/Consent-Management.png",
          alt: "Consent Management page showing consent list with filters"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The consent management section lists all consents created against your API Hub. Each entry shows the consent ID, TPP name, consent type, status, and creation date. ")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode("You can filter and sort consents by:")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, [
                createVNode("strong", null, "Consent type"),
                createTextVNode(" — data sharing or service initiation")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Status"),
                createTextVNode(" — e.g. "),
                createVNode("code", null, "Authorised"),
                createTextVNode(", "),
                createVNode("code", null, "Rejected"),
                createTextVNode(", "),
                createVNode("code", null, "Expired"),
                createTextVNode(", "),
                createVNode("code", null, "Revoked"),
                createTextVNode(", "),
                createVNode("code", null, "Consumed")
              ]),
              createVNode("li", null, [
                createVNode("strong", null, "Created date"),
                createTextVNode(" — ascending or descending")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_EdNote, {
            type: "info",
            title: "Ozone Health Probe"
          }, {
            default: withCtx(() => [
              createVNode("p", null, [
                createTextVNode(" You will see regular data-sharing consents created by the "),
                createVNode("strong", null, "Ozone Health Probe"),
                createTextVNode(" client. This is an automated monitoring client that periodically creates consents (via PAR) to verify the health of your API Hub. These consents are never authorised and will expire automatically. When reviewing consent data, filter out the Ozone client to focus on real TPP activity. ")
              ])
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/Consent-Management.png",
            alt: "Consent Management page showing consent list with filters"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_EdSectionBand, {
    id: "planned-outages",
    num: "06",
    color: "var(--at-gold)",
    eyebrow: "Planned Outages",
    title: "Register downtime windows so Nebras can notify TPPs",
    tone: "surface"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` The portal includes an <strong data-v-1d62558d${_scopeId2}>Outage Management</strong> section where LFIs can register planned downtime windows. When you schedule maintenance that will affect API availability: `);
            } else {
              return [
                createTextVNode(" The portal includes an "),
                createVNode("strong", null, "Outage Management"),
                createTextVNode(" section where LFIs can register planned downtime windows. When you schedule maintenance that will affect API availability: ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdBullets, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<li data-v-1d62558d${_scopeId2}>Navigate to the outage management section</li><li data-v-1d62558d${_scopeId2}>Select your organisation</li><li data-v-1d62558d${_scopeId2}>Enter the date, time, duration, and description of the planned outage</li>`);
            } else {
              return [
                createVNode("li", null, "Navigate to the outage management section"),
                createVNode("li", null, "Select your organisation"),
                createVNode("li", null, "Enter the date, time, duration, and description of the planned outage")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_EdProse, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Nebras will be notified and will communicate the outage to affected TPPs. Errors during registered outage windows are treated sympathetically in performance reporting. `);
            } else {
              return [
                createTextVNode(" Nebras will be notified and will communicate the outage to affected TPPs. Errors during registered outage windows are treated sympathetically in performance reporting. ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_ImageViewer, {
          src: "/images/ozone/admin-portal/Outage-Management.png",
          alt: "Outage Management form showing date, time, and duration fields"
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" The portal includes an "),
              createVNode("strong", null, "Outage Management"),
              createTextVNode(" section where LFIs can register planned downtime windows. When you schedule maintenance that will affect API availability: ")
            ]),
            _: 1
          }),
          createVNode(_component_EdBullets, null, {
            default: withCtx(() => [
              createVNode("li", null, "Navigate to the outage management section"),
              createVNode("li", null, "Select your organisation"),
              createVNode("li", null, "Enter the date, time, duration, and description of the planned outage")
            ]),
            _: 1
          }),
          createVNode(_component_EdProse, null, {
            default: withCtx(() => [
              createTextVNode(" Nebras will be notified and will communicate the outage to affected TPPs. Errors during registered outage windows are treated sympathetically in performance reporting. ")
            ]),
            _: 1
          }),
          createVNode(_component_ImageViewer, {
            src: "/images/ozone/admin-portal/Outage-Management.png",
            alt: "Outage Management form showing date, time, and duration fields"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/lfi-api-hub/v2.1/api-hub/admin-portal/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1d62558d"]]);
export {
  index as default
};

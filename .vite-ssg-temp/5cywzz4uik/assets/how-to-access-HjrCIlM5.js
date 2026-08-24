import { _ as __unplugin_components_0, a as __unplugin_components_2, b as __unplugin_components_6, c as __unplugin_components_7 } from "./EdBackStrip-COkyNhGh.js";
import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { _ as __unplugin_components_0$1 } from "./EdHero-DawHPCxB.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "how-to-access",
  __ssrInlineRender: true,
  setup(__props) {
    const meta = [
      { label: "Applies to", value: "LFIs · TPPs · Participants" },
      { label: "Read", value: "4 min" },
      { label: "Updated", value: "22 Jun 2026" }
    ];
    const sections = [
      { id: "browsing", label: "Browsing" },
      { id: "signing-in", label: "Signing in" },
      { id: "protected-access", label: "Protected access" },
      { id: "private-access", label: "Private access" },
      { id: "endpoints", label: "Endpoints" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdBackStrip = __unplugin_components_0;
      const _component_EdHero = __unplugin_components_0$1;
      const _component_EdInPageNav = __unplugin_components_2;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdBullets = __unplugin_components_5;
      const _component_EdRelatedCards = __unplugin_components_6;
      const _component_EdRelatedCard = __unplugin_components_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-page" }, _attrs))} data-v-f3e637af>`);
      _push(ssrRenderComponent(_component_EdBackStrip, {
        href: "/doc-repository/",
        text: "Document Repository"
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdHero, {
        eyebrow: "Document Repository · Access Guide",
        title: "Accessing the Document Repository",
        meta,
        lede: "Explains how to <strong>browse the Document Repository</strong>, how to <strong>sign in</strong> against the production Trust Framework directory, and <strong>who may view</strong> an organisation's protected and private documents."
      }, null, _parent));
      _push(ssrRenderComponent(_component_EdInPageNav, { sections }, null, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "browsing",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "Browsing",
        title: "Finding an organisation's documents",
        lede: "The Document Repository lists every production participant in UAE Open Finance — Licensed Financial Institutions and Third-Party Providers.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The <a href="/doc-repository/" data-v-f3e637af${_scopeId2}>directory</a> itself is open: you can search and filter participants without signing in. Selecting an organisation opens its documents page, at which point you are asked to sign in. Once signed in, an organisation&#39;s documents appear in up to three groups: `);
                } else {
                  return [
                    createTextVNode(" The "),
                    createVNode("a", { href: "/doc-repository/" }, "directory"),
                    createTextVNode(" itself is open: you can search and filter participants without signing in. Selecting an organisation opens its documents page, at which point you are asked to sign in. Once signed in, an organisation's documents appear in up to three groups: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f3e637af${_scopeId2}><strong data-v-f3e637af${_scopeId2}>Public documents</strong> — visible to any signed-in participant; for example trade licences and Central Bank licences. </li><li data-v-f3e637af${_scopeId2}><strong data-v-f3e637af${_scopeId2}>Protected documents</strong> — visible to the owning organisation and to any other organisation it has chosen to share with. The protected tab is hidden if neither applies to you. </li><li data-v-f3e637af${_scopeId2}><strong data-v-f3e637af${_scopeId2}>Private documents</strong> — visible only to people authorised within that organisation. The private tab is hidden if you do not have access. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Public documents"),
                      createTextVNode(" — visible to any signed-in participant; for example trade licences and Central Bank licences. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Protected documents"),
                      createTextVNode(" — visible to the owning organisation and to any other organisation it has chosen to share with. The protected tab is hidden if neither applies to you. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Private documents"),
                      createTextVNode(" — visible only to people authorised within that organisation. The private tab is hidden if you do not have access. ")
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
                  createTextVNode(" The "),
                  createVNode("a", { href: "/doc-repository/" }, "directory"),
                  createTextVNode(" itself is open: you can search and filter participants without signing in. Selecting an organisation opens its documents page, at which point you are asked to sign in. Once signed in, an organisation's documents appear in up to three groups: ")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Public documents"),
                    createTextVNode(" — visible to any signed-in participant; for example trade licences and Central Bank licences. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Protected documents"),
                    createTextVNode(" — visible to the owning organisation and to any other organisation it has chosen to share with. The protected tab is hidden if neither applies to you. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Private documents"),
                    createTextVNode(" — visible only to people authorised within that organisation. The private tab is hidden if you do not have access. ")
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
        id: "signing-in",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Signing in",
        title: "Authenticating with the Trust Framework directory",
        lede: 'The repository authenticates you against the <strong><a href="https://web.directory.openfinance.ae/" target="_blank" rel="noopener">production UAE Open Finance Trust Framework directory</a></strong> using OpenID Connect.',
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When you open an organisation&#39;s documents page you are redirected to the directory to sign in with your directory account, then returned to the page. You need only an account in the production Trust Framework directory — there is no separate repository login. `);
                } else {
                  return [
                    createTextVNode(" When you open an organisation's documents page you are redirected to the directory to sign in with your directory account, then returned to the page. You need only an account in the production Trust Framework directory — there is no separate repository login. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A signed-in session lasts approximately one hour, after which you are asked to sign in again. `);
                } else {
                  return [
                    createTextVNode(" A signed-in session lasts approximately one hour, after which you are asked to sign in again. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When you open an organisation's documents page you are redirected to the directory to sign in with your directory account, then returned to the page. You need only an account in the production Trust Framework directory — there is no separate repository login. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A signed-in session lasts approximately one hour, after which you are asked to sign in again. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "protected-access",
        num: "03",
        color: "var(--at-blue-deep)",
        eyebrow: "Protected access",
        title: "Who may view protected documents",
        lede: "Protected documents sit between public and private: the owning organisation controls which other organisations may read them.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-f3e637af${_scopeId}>Who can read them</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f3e637af${_scopeId2}> The owning organisation&#39;s <strong data-v-f3e637af${_scopeId2}>administrators and Active PBCs</strong> — the same people who can see its private documents. </li><li data-v-f3e637af${_scopeId2}><strong data-v-f3e637af${_scopeId2}>Any member</strong> of an organisation the owner has shared with. Unlike private access, this is not limited to privileged roles — once an organisation is granted, all of its members can read the documents. </li><li data-v-f3e637af${_scopeId2}><strong data-v-f3e637af${_scopeId2}>Nebras operators</strong>, who may view every organisation&#39;s documents. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createTextVNode(" The owning organisation's "),
                      createVNode("strong", null, "administrators and Active PBCs"),
                      createTextVNode(" — the same people who can see its private documents. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Any member"),
                      createTextVNode(" of an organisation the owner has shared with. Unlike private access, this is not limited to privileged roles — once an organisation is granted, all of its members can read the documents. ")
                    ]),
                    createVNode("li", null, [
                      createVNode("strong", null, "Nebras operators"),
                      createTextVNode(", who may view every organisation's documents. ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e637af${_scopeId}>Managing shares</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A privileged member of the owning organisation (administrator or Active PBC), or a Nebras operator, manages the share list from the Protected tab — adding or removing organisations at any time. Sharing is granted per whole organisation and covers all of the owner&#39;s protected documents. Organisations that have only been granted access cannot themselves change who else can see the documents, and only Nebras may upload them. `);
                } else {
                  return [
                    createTextVNode(" A privileged member of the owning organisation (administrator or Active PBC), or a Nebras operator, manages the share list from the Protected tab — adding or removing organisations at any time. Sharing is granted per whole organisation and covers all of the owner's protected documents. Organisations that have only been granted access cannot themselves change who else can see the documents, and only Nebras may upload them. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Who can read them"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createTextVNode(" The owning organisation's "),
                    createVNode("strong", null, "administrators and Active PBCs"),
                    createTextVNode(" — the same people who can see its private documents. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Any member"),
                    createTextVNode(" of an organisation the owner has shared with. Unlike private access, this is not limited to privileged roles — once an organisation is granted, all of its members can read the documents. ")
                  ]),
                  createVNode("li", null, [
                    createVNode("strong", null, "Nebras operators"),
                    createTextVNode(", who may view every organisation's documents. ")
                  ])
                ]),
                _: 1
              }),
              createVNode("h3", null, "Managing shares"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A privileged member of the owning organisation (administrator or Active PBC), or a Nebras operator, manages the share list from the Protected tab — adding or removing organisations at any time. Sharing is granted per whole organisation and covers all of the owner's protected documents. Organisations that have only been granted access cannot themselves change who else can see the documents, and only Nebras may upload them. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "private-access",
        num: "04",
        color: "var(--at-blue)",
        eyebrow: "Private access",
        title: "Who may view private documents",
        lede: "An organisation's private documents are visible only to people who hold a privileged role for that organisation in the Trust Framework directory.",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-f3e637af${_scopeId}>Qualifying roles</h3>`);
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-f3e637af${_scopeId2}><strong data-v-f3e637af${_scopeId2}>Organisation administrators</strong> of that organisation. </li><li data-v-f3e637af${_scopeId2}> Holders of the <strong data-v-f3e637af${_scopeId2}>Principal Business Contact (PBC)</strong> contact role, where the role is <em data-v-f3e637af${_scopeId2}>Active</em>. </li>`);
                } else {
                  return [
                    createVNode("li", null, [
                      createVNode("strong", null, "Organisation administrators"),
                      createTextVNode(" of that organisation. ")
                    ]),
                    createVNode("li", null, [
                      createTextVNode(" Holders of the "),
                      createVNode("strong", null, "Principal Business Contact (PBC)"),
                      createTextVNode(" contact role, where the role is "),
                      createVNode("em", null, "Active"),
                      createTextVNode(". ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Access is assessed per organisation: a PBC or organisation administrator role in one organisation only grants access to that organisation&#39;s private documents, not those of any other organisation. Nebras operators may view every organisation&#39;s documents. `);
                } else {
                  return [
                    createTextVNode(" Access is assessed per organisation: a PBC or organisation administrator role in one organisation only grants access to that organisation's private documents, not those of any other organisation. Nebras operators may view every organisation's documents. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Qualifying roles"),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, [
                    createVNode("strong", null, "Organisation administrators"),
                    createTextVNode(" of that organisation. ")
                  ]),
                  createVNode("li", null, [
                    createTextVNode(" Holders of the "),
                    createVNode("strong", null, "Principal Business Contact (PBC)"),
                    createTextVNode(" contact role, where the role is "),
                    createVNode("em", null, "Active"),
                    createTextVNode(". ")
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" Access is assessed per organisation: a PBC or organisation administrator role in one organisation only grants access to that organisation's private documents, not those of any other organisation. Nebras operators may view every organisation's documents. ")
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
        num: "05",
        color: "var(--at-navy)",
        eyebrow: "Endpoints",
        title: "What the document endpoints provide",
        lede: "The repository pages are powered by a small API at <code>docs.nebras-open-finance.com</code>. It may be called directly — for example to script downloads.",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 data-v-f3e637af${_scopeId}>Organisation list</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` A request to <code data-v-f3e637af${_scopeId2}>https://docs.nebras-open-finance.com/</code> returns the list of all production organisations as JSON, each with its identifier and links to its public and private documents. This is the same list the directory page shows, and it requires no sign-in. `);
                } else {
                  return [
                    createTextVNode(" A request to "),
                    createVNode("code", null, "https://docs.nebras-open-finance.com/"),
                    createTextVNode(" returns the list of all production organisations as JSON, each with its identifier and links to its public and private documents. This is the same list the directory page shows, and it requires no sign-in. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e637af${_scopeId}>Public documents</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-f3e637af${_scopeId2}>https://docs.nebras-open-finance.com/{id}/public</code> lists the public documents for a single organisation, where <code data-v-f3e637af${_scopeId2}>{id}</code> is that organisation&#39;s identifier from the root list. Appending a file name to the path returns the file itself. Public documents are open. `);
                } else {
                  return [
                    createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/public"),
                    createTextVNode(" lists the public documents for a single organisation, where "),
                    createVNode("code", null, "{id}"),
                    createTextVNode(" is that organisation's identifier from the root list. Appending a file name to the path returns the file itself. Public documents are open. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e637af${_scopeId}>Protected documents</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-f3e637af${_scopeId2}>https://docs.nebras-open-finance.com/{id}/protected</code> lists — and serves — that organisation&#39;s protected documents. This endpoint is gated: you must be signed in and either authorised for the organisation (an administrator or PBC), a member of an organisation it has shared with, or a Nebras operator. The owner&#39;s share list is managed at <code data-v-f3e637af${_scopeId2}>https://docs.nebras-open-finance.com/{id}/grants</code>. `);
                } else {
                  return [
                    createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/protected"),
                    createTextVNode(" lists — and serves — that organisation's protected documents. This endpoint is gated: you must be signed in and either authorised for the organisation (an administrator or PBC), a member of an organisation it has shared with, or a Nebras operator. The owner's share list is managed at "),
                    createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/grants"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h3 data-v-f3e637af${_scopeId}>Private documents</h3>`);
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<code data-v-f3e637af${_scopeId2}>https://docs.nebras-open-finance.com/{id}/private</code> lists — and serves — that organisation&#39;s private documents. This endpoint is gated: you must be signed in and authorised for the organisation (an administrator or PBC, as above), or a Nebras operator. Without access it returns an authentication or permission error rather than the documents. `);
                } else {
                  return [
                    createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/private"),
                    createTextVNode(" lists — and serves — that organisation's private documents. This endpoint is gated: you must be signed in and authorised for the organisation (an administrator or PBC, as above), or a Nebras operator. Without access it returns an authentication or permission error rather than the documents. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h3", null, "Organisation list"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" A request to "),
                  createVNode("code", null, "https://docs.nebras-open-finance.com/"),
                  createTextVNode(" returns the list of all production organisations as JSON, each with its identifier and links to its public and private documents. This is the same list the directory page shows, and it requires no sign-in. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Public documents"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/public"),
                  createTextVNode(" lists the public documents for a single organisation, where "),
                  createVNode("code", null, "{id}"),
                  createTextVNode(" is that organisation's identifier from the root list. Appending a file name to the path returns the file itself. Public documents are open. ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Protected documents"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/protected"),
                  createTextVNode(" lists — and serves — that organisation's protected documents. This endpoint is gated: you must be signed in and either authorised for the organisation (an administrator or PBC), a member of an organisation it has shared with, or a Nebras operator. The owner's share list is managed at "),
                  createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/grants"),
                  createTextVNode(". ")
                ]),
                _: 1
              }),
              createVNode("h3", null, "Private documents"),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("code", null, "https://docs.nebras-open-finance.com/{id}/private"),
                  createTextVNode(" lists — and serves — that organisation's private documents. This endpoint is gated: you must be signed in and authorised for the organisation (an administrator or PBC, as above), or a Nebras operator. Without access it returns an authentication or permission error rather than the documents. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdRelatedCards, {
        eyebrow: "Read alongside",
        title: "Related"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/doc-repository/",
              category: "Directory",
              "category-color": "var(--at-teal)",
              title: "Document Repository",
              desc: "Browse and search every production LFI and TPP, and open their published documents."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRelatedCard, {
              href: "/policy/secure-management",
              category: "Nebras",
              title: "Secure Management of Keys and Credentials",
              desc: "The authentication and access-control standards underpinning the directory and repository."
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdRelatedCard, {
                href: "/doc-repository/",
                category: "Directory",
                "category-color": "var(--at-teal)",
                title: "Document Repository",
                desc: "Browse and search every production LFI and TPP, and open their published documents."
              }),
              createVNode(_component_EdRelatedCard, {
                href: "/policy/secure-management",
                category: "Nebras",
                title: "Secure Management of Keys and Credentials",
                desc: "The authentication and access-control standards underpinning the directory and repository."
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/doc-repository/how-to-access.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const howToAccess = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f3e637af"]]);
export {
  howToAccess as default
};

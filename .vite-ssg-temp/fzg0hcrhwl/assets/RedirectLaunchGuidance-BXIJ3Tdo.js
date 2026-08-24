import { _ as __unplugin_components_12 } from "./EdRefTable-B_zH_eaF.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_7 } from "./EdNote-BQLptLjy.js";
import { _ as __unplugin_components_4$1 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { defineComponent, computed, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RedirectLaunchGuidance",
  __ssrInlineRender: true,
  props: {
    audience: {},
    targetApp: {},
    redirectName: {},
    startNum: { default: 2 }
  },
  setup(__props) {
    const props = __props;
    const pad = (n2) => String(n2).padStart(2, "0");
    const n = (offset) => pad(props.startNum + offset);
    const flutterCode = computed(() => `import 'package:url_launcher/url_launcher.dart';

/// Opens an outbound Open Finance redirect URL from within the app.
Future<void> openRedirect(Uri redirectUri) async {
  try {
    // 1. Prefer an external user-agent. Where ${props.targetApp} is installed
    //    and the URL is a verified Universal Link / App Link, the OS opens
    //    that app directly (app-to-app). Otherwise it opens the system browser.
    final launched = await launchUrl(
      redirectUri,
      mode: LaunchMode.externalApplication,
    );
    if (!launched) {
      throw Exception('externalApplication launch returned false');
    }
  } catch (_) {
    // 2. Fall back to the platform default. For https URLs this resolves to an
    //    in-app browser tab (Chrome Custom Tabs / SFSafariViewController) —
    //    still a compliant external user-agent.
    //    NEVER fall back to LaunchMode.inAppWebView (an embedded WebView).
    await launchUrl(
      redirectUri,
      mode: LaunchMode.platformDefault,
    );
  }
}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4$1;
      const _component_EdNote = __unplugin_components_7;
      const _component_EdCode = EdCode;
      const _component_EdRefTable = __unplugin_components_12;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "launch-from-app",
        num: n(0),
        color: "var(--at-teal)",
        eyebrow: "Opening from within a mobile app",
        title: "Prefer an external user-agent, then fall back",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` When your customer is inside your native app and you need to open the ${ssrInterpolate(__props.redirectName)}, you MUST open it in an <strong data-v-f5c3943c${_scopeId2}>external user-agent</strong> — never an embedded WebView. Two launch modes satisfy this, and you SHOULD try them in order: `);
                } else {
                  return [
                    createTextVNode(" When your customer is inside your native app and you need to open the " + toDisplayString(__props.redirectName) + ", you MUST open it in an ", 1),
                    createVNode("strong", null, "external user-agent"),
                    createTextVNode(" — never an embedded WebView. Two launch modes satisfy this, and you SHOULD try them in order: ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<ol class="rlg__ol" data-v-f5c3943c${_scopeId}><li data-v-f5c3943c${_scopeId}><strong data-v-f5c3943c${_scopeId}>External application mode (preferred).</strong> Hand the URL to the operating system. Where ${ssrInterpolate(__props.targetApp)} is installed and the URL is a verified Universal Link (iOS) or App Link (Android), the OS opens that app directly — this is <strong data-v-f5c3943c${_scopeId}>app-to-app</strong> redirection. If the app is not installed, the OS opens the device&#39;s <strong data-v-f5c3943c${_scopeId}>system browser</strong>. Both are compliant external user-agents. </li><li data-v-f5c3943c${_scopeId}><strong data-v-f5c3943c${_scopeId}>Platform default mode (fallback).</strong> If the external-application launch throws or returns <code data-v-f5c3943c${_scopeId}>false</code>, catch the error and retry in platform-default mode. For <code data-v-f5c3943c${_scopeId}>https</code> URLs this resolves to an <strong data-v-f5c3943c${_scopeId}>in-app browser tab</strong> — Chrome Custom Tabs on Android, <code data-v-f5c3943c${_scopeId}>SFSafariViewController</code> on iOS — which is still an acceptable external user-agent. </li></ol>`);
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "info",
              title: "Why this order"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-f5c3943c${_scopeId2}> External-application mode is tried first because it is the only mode that can hand the customer straight into ${ssrInterpolate(__props.targetApp)} (app-to-app), giving the smoothest, most trusted experience. The in-app browser tab reached by platform-default mode renders the URL in a tab rather than handing off to the app, so app-to-app generally will not trigger — which is why it is the fallback, not the default. </p>`);
                } else {
                  return [
                    createVNode("p", null, " External-application mode is tried first because it is the only mode that can hand the customer straight into " + toDisplayString(__props.targetApp) + " (app-to-app), giving the smoothest, most trusted experience. The in-app browser tab reached by platform-default mode renders the URL in a tab rather than handing off to the app, so app-to-app generally will not trigger — which is why it is the fallback, not the default. ", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" When your customer is inside your native app and you need to open the " + toDisplayString(__props.redirectName) + ", you MUST open it in an ", 1),
                  createVNode("strong", null, "external user-agent"),
                  createTextVNode(" — never an embedded WebView. Two launch modes satisfy this, and you SHOULD try them in order: ")
                ]),
                _: 1
              }),
              createVNode("ol", { class: "rlg__ol" }, [
                createVNode("li", null, [
                  createVNode("strong", null, "External application mode (preferred)."),
                  createTextVNode(" Hand the URL to the operating system. Where " + toDisplayString(__props.targetApp) + " is installed and the URL is a verified Universal Link (iOS) or App Link (Android), the OS opens that app directly — this is ", 1),
                  createVNode("strong", null, "app-to-app"),
                  createTextVNode(" redirection. If the app is not installed, the OS opens the device's "),
                  createVNode("strong", null, "system browser"),
                  createTextVNode(". Both are compliant external user-agents. ")
                ]),
                createVNode("li", null, [
                  createVNode("strong", null, "Platform default mode (fallback)."),
                  createTextVNode(" If the external-application launch throws or returns "),
                  createVNode("code", null, "false"),
                  createTextVNode(", catch the error and retry in platform-default mode. For "),
                  createVNode("code", null, "https"),
                  createTextVNode(" URLs this resolves to an "),
                  createVNode("strong", null, "in-app browser tab"),
                  createTextVNode(" — Chrome Custom Tabs on Android, "),
                  createVNode("code", null, "SFSafariViewController"),
                  createTextVNode(" on iOS — which is still an acceptable external user-agent. ")
                ])
              ]),
              createVNode(_component_EdNote, {
                type: "info",
                title: "Why this order"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, " External-application mode is tried first because it is the only mode that can hand the customer straight into " + toDisplayString(__props.targetApp) + " (app-to-app), giving the smoothest, most trusted experience. The in-app browser tab reached by platform-default mode renders the URL in a tab rather than handing off to the app, so app-to-app generally will not trigger — which is why it is the fallback, not the default. ", 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "launch-implementation",
        num: n(1),
        color: "var(--at-gold)",
        eyebrow: "Implementation",
        title: "Try external-application, catch the error, fall back",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The pattern is the same across native stacks: attempt to launch in external-application mode, and on failure fall back to the platform default. The example below uses Flutter&#39;s <code data-v-f5c3943c${_scopeId2}>url_launcher</code>; the same shape applies to native iOS, native Android, and React Native. `);
                } else {
                  return [
                    createTextVNode(" The pattern is the same across native stacks: attempt to launch in external-application mode, and on failure fall back to the platform default. The example below uses Flutter's "),
                    createVNode("code", null, "url_launcher"),
                    createTextVNode("; the same shape applies to native iOS, native Android, and React Native. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: flutterCode.value,
              lang: "dart",
              filename: "Flutter · url_launcher"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdRefTable, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<table data-v-f5c3943c${_scopeId2}><thead data-v-f5c3943c${_scopeId2}><tr data-v-f5c3943c${_scopeId2}><th data-v-f5c3943c${_scopeId2}>Platform</th><th data-v-f5c3943c${_scopeId2}>External application (try first)</th><th data-v-f5c3943c${_scopeId2}>Platform default / in-app tab (fallback)</th></tr></thead><tbody data-v-f5c3943c${_scopeId2}><tr data-v-f5c3943c${_scopeId2}><td data-v-f5c3943c${_scopeId2}><strong data-v-f5c3943c${_scopeId2}>iOS</strong></td><td data-v-f5c3943c${_scopeId2}><code data-v-f5c3943c${_scopeId2}>UIApplication.open(_:)</code></td><td data-v-f5c3943c${_scopeId2}><code data-v-f5c3943c${_scopeId2}>SFSafariViewController</code></td></tr><tr data-v-f5c3943c${_scopeId2}><td data-v-f5c3943c${_scopeId2}><strong data-v-f5c3943c${_scopeId2}>Android</strong></td><td data-v-f5c3943c${_scopeId2}><code data-v-f5c3943c${_scopeId2}>Intent.ACTION_VIEW</code> to the system default</td><td data-v-f5c3943c${_scopeId2}>Chrome Custom Tabs</td></tr><tr data-v-f5c3943c${_scopeId2}><td data-v-f5c3943c${_scopeId2}><strong data-v-f5c3943c${_scopeId2}>Flutter</strong></td><td data-v-f5c3943c${_scopeId2}><code data-v-f5c3943c${_scopeId2}>LaunchMode.externalApplication</code></td><td data-v-f5c3943c${_scopeId2}><code data-v-f5c3943c${_scopeId2}>LaunchMode.platformDefault</code></td></tr></tbody></table>`);
                } else {
                  return [
                    createVNode("table", null, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Platform"),
                          createVNode("th", null, "External application (try first)"),
                          createVNode("th", null, "Platform default / in-app tab (fallback)")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "iOS")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "UIApplication.open(_:)")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "SFSafariViewController")
                          ])
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Android")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "Intent.ACTION_VIEW"),
                            createTextVNode(" to the system default")
                          ]),
                          createVNode("td", null, "Chrome Custom Tabs")
                        ]),
                        createVNode("tr", null, [
                          createVNode("td", null, [
                            createVNode("strong", null, "Flutter")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "LaunchMode.externalApplication")
                          ]),
                          createVNode("td", null, [
                            createVNode("code", null, "LaunchMode.platformDefault")
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
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" The pattern is the same across native stacks: attempt to launch in external-application mode, and on failure fall back to the platform default. The example below uses Flutter's "),
                  createVNode("code", null, "url_launcher"),
                  createTextVNode("; the same shape applies to native iOS, native Android, and React Native. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: flutterCode.value,
                lang: "dart",
                filename: "Flutter · url_launcher"
              }, null, 8, ["code"]),
              createVNode(_component_EdRefTable, null, {
                default: withCtx(() => [
                  createVNode("table", null, [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "Platform"),
                        createVNode("th", null, "External application (try first)"),
                        createVNode("th", null, "Platform default / in-app tab (fallback)")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "iOS")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "UIApplication.open(_:)")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "SFSafariViewController")
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Android")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "Intent.ACTION_VIEW"),
                          createTextVNode(" to the system default")
                        ]),
                        createVNode("td", null, "Chrome Custom Tabs")
                      ]),
                      createVNode("tr", null, [
                        createVNode("td", null, [
                          createVNode("strong", null, "Flutter")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "LaunchMode.externalApplication")
                        ]),
                        createVNode("td", null, [
                          createVNode("code", null, "LaunchMode.platformDefault")
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
        id: "no-embedded-webview",
        num: n(2),
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Prohibited",
        title: "Never use an embedded WebView",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` The redirect MUST NOT be opened in an <strong data-v-f5c3943c${_scopeId2}>embedded WebView</strong> (for example <code data-v-f5c3943c${_scopeId2}>WKWebView</code>, Android <code data-v-f5c3943c${_scopeId2}>WebView</code>, or <code data-v-f5c3943c${_scopeId2}>LaunchMode.inAppWebView</code>). This is a hard requirement of <a href="https://www.rfc-editor.org/rfc/rfc8252.html" target="_blank" rel="noopener" data-v-f5c3943c${_scopeId2}>RFC 8252 (OAuth 2.0 for Native Apps)</a>, which the FAPI security profile and UAE Open Finance are built on. `);
                } else {
                  return [
                    createTextVNode(" The redirect MUST NOT be opened in an "),
                    createVNode("strong", null, "embedded WebView"),
                    createTextVNode(" (for example "),
                    createVNode("code", null, "WKWebView"),
                    createTextVNode(", Android "),
                    createVNode("code", null, "WebView"),
                    createTextVNode(", or "),
                    createVNode("code", null, "LaunchMode.inAppWebView"),
                    createTextVNode("). This is a hard requirement of "),
                    createVNode("a", {
                      href: "https://www.rfc-editor.org/rfc/rfc8252.html",
                      target: "_blank",
                      rel: "noopener"
                    }, "RFC 8252 (OAuth 2.0 for Native Apps)"),
                    createTextVNode(", which the FAPI security profile and UAE Open Finance are built on. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdNote, {
              type: "danger",
              title: "Embedded WebViews are forbidden for authorization"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p data-v-f5c3943c${_scopeId2}> A host app can read everything inside its own embedded WebView — entered credentials, cookies, and session tokens. Embedded WebViews also break verified deep linking, so app-to-app redirection cannot occur and the customer is forced to re-authenticate from scratch. If a launch fails, fall back to the <strong data-v-f5c3943c${_scopeId2}>in-app browser tab</strong> (platform-default mode) — never to an embedded WebView. </p>`);
                } else {
                  return [
                    createVNode("p", null, [
                      createTextVNode(" A host app can read everything inside its own embedded WebView — entered credentials, cookies, and session tokens. Embedded WebViews also break verified deep linking, so app-to-app redirection cannot occur and the customer is forced to re-authenticate from scratch. If a launch fails, fall back to the "),
                      createVNode("strong", null, "in-app browser tab"),
                      createTextVNode(" (platform-default mode) — never to an embedded WebView. ")
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
                  createTextVNode(" The redirect MUST NOT be opened in an "),
                  createVNode("strong", null, "embedded WebView"),
                  createTextVNode(" (for example "),
                  createVNode("code", null, "WKWebView"),
                  createTextVNode(", Android "),
                  createVNode("code", null, "WebView"),
                  createTextVNode(", or "),
                  createVNode("code", null, "LaunchMode.inAppWebView"),
                  createTextVNode("). This is a hard requirement of "),
                  createVNode("a", {
                    href: "https://www.rfc-editor.org/rfc/rfc8252.html",
                    target: "_blank",
                    rel: "noopener"
                  }, "RFC 8252 (OAuth 2.0 for Native Apps)"),
                  createTextVNode(", which the FAPI security profile and UAE Open Finance are built on. ")
                ]),
                _: 1
              }),
              createVNode(_component_EdNote, {
                type: "danger",
                title: "Embedded WebViews are forbidden for authorization"
              }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode(" A host app can read everything inside its own embedded WebView — entered credentials, cookies, and session tokens. Embedded WebViews also break verified deep linking, so app-to-app redirection cannot occur and the customer is forced to re-authenticate from scratch. If a launch fails, fall back to the "),
                    createVNode("strong", null, "in-app browser tab"),
                    createTextVNode(" (platform-default mode) — never to an embedded WebView. ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderSlot(_ctx.$slots, "web-desktop", {
        num: n(3)
      }, null, _push, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/RedirectLaunchGuidance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f5c3943c"]]);
export {
  __unplugin_components_4 as _
};

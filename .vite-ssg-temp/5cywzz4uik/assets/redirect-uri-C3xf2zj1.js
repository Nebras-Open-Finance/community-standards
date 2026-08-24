import { _ as __unplugin_components_5 } from "./EdBullets-DF2K09hg.js";
import { E as EdCode } from "./EdCode-BQ4YLUeg.js";
import { _ as __unplugin_components_4 } from "./EdProse-DgPVkafE.js";
import { _ as __unplugin_components_3 } from "./EdSectionBand-cb9ozyvX.js";
import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const callbackUrl = `https://yourapp.com/callback?code=fbe03604-baf2-4220-b7dd-05b14de19e5c&state=d2fe5e2c-77cd-4788-b0ef-7cf0fc8a3e54&iss=https://auth1.altareq1.sandbox.apihub.openfinance.ae`;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "redirect-uri",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImageViewer = ImageViewer;
      const _component_EdSectionBand = __unplugin_components_3;
      const _component_EdProse = __unplugin_components_4;
      const _component_EdCode = EdCode;
      const _component_EdBullets = __unplugin_components_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-doc" }, _attrs))} data-v-5ce8e694><section class="ed-doc__hero" data-v-5ce8e694><div class="ed-doc__inner" data-v-5ce8e694><div class="ed-doc__eyebrow" data-v-5ce8e694><span class="ed-doc__eyebrow-dash" data-v-5ce8e694></span> TPP · Trust Framework · Applications </div><h1 class="ed-doc__title" data-v-5ce8e694> Redirect URIs <span class="ed-doc__read" data-v-5ce8e694>2 min read</span></h1><p class="ed-doc__lede" data-v-5ce8e694> Every application in the Trust Framework must have a configured <code data-v-5ce8e694>RedirectURI</code>. This <code data-v-5ce8e694>RedirectURI</code> is a specific, web address controlled by your application. It acts as the callback destination where the LFI sends the user after they complete authentication and authorizing the consent. </p>`);
      _push(ssrRenderComponent(_component_ImageViewer, {
        src: "/images/journeys/oauth-wireframe.png",
        alt: "OAuth flow"
      }, null, _parent));
      _push(`<p class="ed-doc__lede ed-doc__lede--tight" data-v-5ce8e694> The following guide outlines how your <code data-v-5ce8e694>RedirectURI</code> can meet FAPI 2.0 requirements while still enabling deep linking into a mobile app. </p></div></section>`);
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "fapi-constraint",
        num: "01",
        color: "var(--at-teal)",
        eyebrow: "FAPI 2.0 Constraint",
        title: "Redirect URIs must be HTTPS — no custom URL schemes",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong data-v-5ce8e694${_scopeId2}>FAPI 2.0</strong> does not allow non-HTTPS redirect URIs. Therefore, you will not be able to use a custom URL scheme (e.g., <code data-v-5ce8e694${_scopeId2}>myapp://home</code>). `);
                } else {
                  return [
                    createVNode("strong", null, "FAPI 2.0"),
                    createTextVNode(" does not allow non-HTTPS redirect URIs. Therefore, you will not be able to use a custom URL scheme (e.g., "),
                    createVNode("code", null, "myapp://home"),
                    createTextVNode("). ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` To remain compliant with FAPI 2.0 and still support deep linking into your application, follow the steps below. `);
                } else {
                  return [
                    createTextVNode(" To remain compliant with FAPI 2.0 and still support deep linking into your application, follow the steps below. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createVNode("strong", null, "FAPI 2.0"),
                  createTextVNode(" does not allow non-HTTPS redirect URIs. Therefore, you will not be able to use a custom URL scheme (e.g., "),
                  createVNode("code", null, "myapp://home"),
                  createTextVNode("). ")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" To remain compliant with FAPI 2.0 and still support deep linking into your application, follow the steps below. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "universal-link",
        num: "02",
        color: "var(--at-gold)",
        eyebrow: "Step 1",
        title: "Set up an HTTPS-based Universal / App Link",
        tone: "surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`You&#39;ll need to make your app respond to a secure URL like:`);
                } else {
                  return [
                    createTextVNode("You'll need to make your app respond to a secure URL like:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdCode, {
              code: callbackUrl,
              lang: "plaintext",
              filename: "Callback URL"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` For how to validate the callback (<code data-v-5ce8e694${_scopeId2}>state</code>, <code data-v-5ce8e694${_scopeId2}>iss</code>, single-use code, replay protection), see <a href="/tech/tpp-standards/security/fapi/handling-callback" data-v-5ce8e694${_scopeId2}>Handling Authorization Callbacks</a>. `);
                } else {
                  return [
                    createTextVNode(" For how to validate the callback ("),
                    createVNode("code", null, "state"),
                    createTextVNode(", "),
                    createVNode("code", null, "iss"),
                    createTextVNode(", single-use code, replay protection), see "),
                    createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                    createTextVNode(". ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("You'll need to make your app respond to a secure URL like:")
                ]),
                _: 1
              }),
              createVNode(_component_EdCode, {
                code: callbackUrl,
                lang: "plaintext",
                filename: "Callback URL"
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" For how to validate the callback ("),
                  createVNode("code", null, "state"),
                  createTextVNode(", "),
                  createVNode("code", null, "iss"),
                  createTextVNode(", single-use code, replay protection), see "),
                  createVNode("a", { href: "/tech/tpp-standards/security/fapi/handling-callback" }, "Handling Authorization Callbacks"),
                  createTextVNode(". ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_EdSectionBand, {
        id: "handle-redirect",
        num: "03",
        color: "var(--at-blue-deep, #1d4ed8)",
        eyebrow: "Step 2",
        title: "Handle the redirect in your app",
        tone: "cream"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Once the user is redirected to the HTTPS URL:`);
                } else {
                  return [
                    createTextVNode("Once the user is redirected to the HTTPS URL:")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdBullets, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<li data-v-5ce8e694${_scopeId2}>If your app is installed, it should open and process the URL (e.g., extract the authorization code).</li><li data-v-5ce8e694${_scopeId2}>If your app is not installed, it should fall back to an appropriate web page to either complete the user journey on web or to encourage the user to install the app.</li>`);
                } else {
                  return [
                    createVNode("li", null, "If your app is installed, it should open and process the URL (e.g., extract the authorization code)."),
                    createVNode("li", null, "If your app is not installed, it should fall back to an appropriate web page to either complete the user journey on web or to encourage the user to install the app.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_EdProse, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` By adopting this approach, you can continue supporting deep linking while ensuring compliance with the security standards required by FAPI 2.0. `);
                } else {
                  return [
                    createTextVNode(" By adopting this approach, you can continue supporting deep linking while ensuring compliance with the security standards required by FAPI 2.0. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode("Once the user is redirected to the HTTPS URL:")
                ]),
                _: 1
              }),
              createVNode(_component_EdBullets, null, {
                default: withCtx(() => [
                  createVNode("li", null, "If your app is installed, it should open and process the URL (e.g., extract the authorization code)."),
                  createVNode("li", null, "If your app is not installed, it should fall back to an appropriate web page to either complete the user journey on web or to encourage the user to install the app.")
                ]),
                _: 1
              }),
              createVNode(_component_EdProse, null, {
                default: withCtx(() => [
                  createTextVNode(" By adopting this approach, you can continue supporting deep linking while ensuring compliance with the security standards required by FAPI 2.0. ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="ed-doc__contents" data-v-5ce8e694><div class="ed-doc__inner" data-v-5ce8e694><div class="ed-doc__contents-head" data-v-5ce8e694><div class="ed-doc__contents-eyebrow" data-v-5ce8e694><span class="ed-doc__eyebrow-dash" data-v-5ce8e694></span> Additional Resources </div><h2 class="ed-doc__contents-title" data-v-5ce8e694>Platform documentation</h2><p class="ed-doc__contents-sub" data-v-5ce8e694>Vendor guides for setting up the secure HTTPS-based deep links Apple and Google require on iOS and Android.</p></div><div class="ed-doc__contents-grid" data-v-5ce8e694><a class="ed-link-card" href="https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app" target="_blank" rel="noopener" style="${ssrRenderStyle({ "--card-color": "var(--at-navy)" })}" data-v-5ce8e694><span class="ed-link-card__top" data-v-5ce8e694></span><div class="ed-link-card__meta" data-v-5ce8e694><span class="ed-link-card__cat" data-v-5ce8e694>iOS · Apple</span></div><h3 class="ed-link-card__title" data-v-5ce8e694>Supporting Universal Links in Your App</h3><p class="ed-link-card__desc" data-v-5ce8e694>Apple&#39;s Xcode documentation covering the Associated Domains entitlement, the <code data-v-5ce8e694>apple-app-site-association</code> file your HTTPS host must serve, and how iOS routes a tapped link straight to your app when it&#39;s installed (and to Safari when it isn&#39;t).</p><div class="ed-link-card__foot" data-v-5ce8e694><span class="ed-link-card__cta" data-v-5ce8e694>Open on developer.apple.com</span><span class="ed-link-card__arrow" data-v-5ce8e694>↗</span></div></a><a class="ed-link-card" href="https://developer.android.com/training/app-links" target="_blank" rel="noopener" style="${ssrRenderStyle({ "--card-color": "var(--at-teal-deep)" })}" data-v-5ce8e694><span class="ed-link-card__top" data-v-5ce8e694></span><div class="ed-link-card__meta" data-v-5ce8e694><span class="ed-link-card__cat" data-v-5ce8e694>Android</span></div><h3 class="ed-link-card__title" data-v-5ce8e694>Android App Links</h3><p class="ed-link-card__desc" data-v-5ce8e694>Google&#39;s training guide covering verified App Links, the <code data-v-5ce8e694>assetlinks.json</code> Digital Asset Links file your HTTPS host must serve, intent filters with <code data-v-5ce8e694>android:autoVerify=&quot;true&quot;</code>, and how Android opens your app directly without the disambiguation dialog.</p><div class="ed-link-card__foot" data-v-5ce8e694><span class="ed-link-card__cta" data-v-5ce8e694>Open on developer.android.com</span><span class="ed-link-card__arrow" data-v-5ce8e694>↗</span></div></a></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tech/tpp-standards/trust-framework/redirect-uri.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const redirectUri = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5ce8e694"]]);
export {
  redirectUri as default
};

import { I as ImageViewer } from "./ImageViewer-DmHTopUf.js";
import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { n as biopaySections, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "BioPay" });
    const pillars = [
      {
        num: "01",
        title: "Identified via biometrics",
        body: "The biometric match at the terminal is all that is needed to pay. A face or a palm resolves the customer to an identity the ecosystem already trusts &mdash; nothing is typed, scanned or presented alongside it."
      },
      {
        num: "02",
        title: "Deviceless",
        body: "No hand-off to another device to instruct the payment. The customer does not reach for a card, unlock a phone, open an app or approve a push notification. The terminal is the whole interaction."
      },
      {
        num: "03",
        title: "Payment rail agnostic",
        body: "A single payment instruction that is not directly tied to any one payment rail. The rail underneath &mdash; AANI, CBDC, Jaywan, and others over time &mdash; is chosen after the terminal has already done its job."
      }
    ];
    const contributions = [
      {
        title: "A control plane between the initiator and the bank",
        body: "Every call runs through the API Hub. The party initiating the payment never reaches a bank directly, and the bank never has to expose itself to a new counterparty &mdash; it integrates once, with the Hub, exactly as it already does for every other Open Finance journey."
      },
      {
        title: "Every transaction recorded in one place",
        body: "The Hub records each payment as it passes through: who initiated it, against which institution, and how it resolved. That gives the ecosystem a single, consistent record for reconciliation, dispute handling and supervision."
      },
      {
        title: "The security layer banks already accept",
        body: "Mutual TLS and application-layer authentication on every request, with the same certificate and signing model used across Open Finance. This is what lets the journey meet LFIs&rsquo; own security postures and the requirements of the Central Bank without each bank negotiating a bespoke arrangement."
      },
      {
        title: "No sensitive information stored at the Hub",
        body: "No biometric ever enters Open Finance &mdash; capture and matching happen before the first API call. The Hub holds no templates, no account numbers and no card numbers. What it keeps is described on the technical pages."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImageViewer = ImageViewer;
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bp-home" }, _attrs))} data-v-4e4c0cfd><section class="bp-hero" data-v-4e4c0cfd><div class="bp-hero__inner" data-v-4e4c0cfd><div class="bp-hero__label" data-v-4e4c0cfd><span class="bp-hero__dash" data-v-4e4c0cfd></span> BioPay · Draft · Internal </div><h1 class="bp-hero__title" data-v-4e4c0cfd>Pay by being yourself</h1><p class="bp-hero__sub" data-v-4e4c0cfd> A payment journey for the whole of the UAE. The customer registers once with their bank, then presents a face or a palm at the terminal and the payment completes. No card. No phone. No app. Nothing carried at all. </p><p class="bp-hero__sub" data-v-4e4c0cfd> Three things are true at once: identity comes from biometrics, funds come from a real bank account at a licensed institution, and the rail underneath is chosen after the terminal has already done its job. </p></div></section><section class="bp-section bp-section--paper" data-v-4e4c0cfd><div class="bp-section__inner" data-v-4e4c0cfd><div class="bp-eyebrow" data-v-4e4c0cfd><span class="bp-eyebrow__dash" data-v-4e4c0cfd></span> The vision </div><h2 class="bp-heading" data-v-4e4c0cfd>Three commitments the design is held to</h2><div class="bp-principles" data-v-4e4c0cfd><!--[-->`);
      ssrRenderList(pillars, (p) => {
        _push(`<article class="bp-principle" data-v-4e4c0cfd><span class="bp-principle__num" data-v-4e4c0cfd>${ssrInterpolate(p.num)}</span><div class="bp-principle__body" data-v-4e4c0cfd><h3 class="bp-principle__title" data-v-4e4c0cfd>${p.title ?? ""}</h3><p class="bp-principle__text" data-v-4e4c0cfd>${p.body ?? ""}</p></div></article>`);
      });
      _push(`<!--]--></div></div></section><section class="bp-section" data-v-4e4c0cfd><div class="bp-section__inner" data-v-4e4c0cfd><div class="bp-eyebrow" data-v-4e4c0cfd><span class="bp-eyebrow__dash" data-v-4e4c0cfd></span> At the terminal </div><h2 class="bp-heading" data-v-4e4c0cfd>What the customer actually does</h2><p class="bp-lede" data-v-4e4c0cfd> The basket is totalled and the terminal asks for a biometric. The customer holds a palm above the reader — or uses face or fingerprint instead — and that is the end of their involvement. Behind those two screens sits an identity check, a registration lookup, a payment instruction and a bank transfer; none of it is something the customer has to do. </p><div class="bp-shots" data-v-4e4c0cfd><figure class="bp-shot" data-v-4e4c0cfd>`);
      _push(ssrRenderComponent(_component_ImageViewer, {
        src: "/images/biopay/terminal-verify-to-pay.png",
        alt: "Example terminal prompting for a biometric"
      }, null, _parent));
      _push(`<figcaption class="bp-shot__cap" data-v-4e4c0cfd><span class="bp-shot__step" data-v-4e4c0cfd>01</span> Verify to pay — the amount, and a prompt for a palm, face or fingerprint. Paying by card remains available as a fallback. </figcaption></figure><figure class="bp-shot" data-v-4e4c0cfd>`);
      _push(ssrRenderComponent(_component_ImageViewer, {
        src: "/images/biopay/terminal-payment-made.png",
        alt: "Example terminal showing payment complete"
      }, null, _parent));
      _push(`<figcaption class="bp-shot__cap" data-v-4e4c0cfd><span class="bp-shot__step" data-v-4e4c0cfd>02</span> Payment made — paid from the customer’s own bank account, with a receipt showing how it was verified and the reference to quote. </figcaption></figure></div></div></section><section class="bp-section bp-section--paper" data-v-4e4c0cfd><div class="bp-section__inner" data-v-4e4c0cfd><div class="bp-eyebrow" data-v-4e4c0cfd><span class="bp-eyebrow__dash" data-v-4e4c0cfd></span> The role of Open Finance </div><h2 class="bp-heading" data-v-4e4c0cfd>A control plane, not a data store</h2><p class="bp-lede" data-v-4e4c0cfd> The biometric match happens before Open Finance is involved, and the money moves on rails that already exist. What Open Finance and the API Hub add is the layer in between: a single, governed path from the party initiating the payment to the licensed institution that holds the money. </p><div class="bp-points" data-v-4e4c0cfd><!--[-->`);
      ssrRenderList(contributions, (c) => {
        _push(`<article class="bp-point" data-v-4e4c0cfd><h3 class="bp-point__title" data-v-4e4c0cfd>${c.title ?? ""}</h3><p class="bp-point__text" data-v-4e4c0cfd>${c.body ?? ""}</p></article>`);
      });
      _push(`<!--]--></div></div></section><section class="bp-section" data-v-4e4c0cfd><div class="bp-section__inner" data-v-4e4c0cfd><div class="bp-eyebrow" data-v-4e4c0cfd><span class="bp-eyebrow__dash" data-v-4e4c0cfd></span> In this space </div><h2 class="bp-heading" data-v-4e4c0cfd>Where the detail lives</h2><div class="bp-count" data-v-4e4c0cfd>${ssrInterpolate(unref(biopaySections).length)} sections</div><div class="bp-grid" data-v-4e4c0cfd><!--[-->`);
      ssrRenderList(unref(biopaySections), (page) => {
        _push(ssrRenderComponent(_component_RouterLink, {
          key: page.slug,
          to: "/biopay/" + page.slug,
          class: "bp-card",
          style: { "--bp-card-color": page.color }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="bp-card__top" style="${ssrRenderStyle({ background: page.color })}" data-v-4e4c0cfd${_scopeId}></span><div class="bp-card__meta" data-v-4e4c0cfd${_scopeId}><span class="bp-card__status" style="${ssrRenderStyle({ color: page.color })}" data-v-4e4c0cfd${_scopeId}>${ssrInterpolate(page.status)}</span><span class="bp-card__dot" data-v-4e4c0cfd${_scopeId}>·</span><span class="bp-card__read" data-v-4e4c0cfd${_scopeId}>${ssrInterpolate(page.readTime)}</span></div><h2 class="bp-card__title" data-v-4e4c0cfd${_scopeId}>${ssrInterpolate(page.title)}</h2><p class="bp-card__desc" data-v-4e4c0cfd${_scopeId}>${ssrInterpolate(page.summary)}</p><div class="bp-card__foot" data-v-4e4c0cfd${_scopeId}><span class="bp-card__outcome" data-v-4e4c0cfd${_scopeId}>${ssrInterpolate(page.outcome)}</span><span class="bp-card__arrow" style="${ssrRenderStyle({ color: page.color })}" data-v-4e4c0cfd${_scopeId}>→</span></div>`);
            } else {
              return [
                createVNode("span", {
                  class: "bp-card__top",
                  style: { background: page.color }
                }, null, 4),
                createVNode("div", { class: "bp-card__meta" }, [
                  createVNode("span", {
                    class: "bp-card__status",
                    style: { color: page.color }
                  }, toDisplayString(page.status), 5),
                  createVNode("span", { class: "bp-card__dot" }, "·"),
                  createVNode("span", { class: "bp-card__read" }, toDisplayString(page.readTime), 1)
                ]),
                createVNode("h2", { class: "bp-card__title" }, toDisplayString(page.title), 1),
                createVNode("p", { class: "bp-card__desc" }, toDisplayString(page.summary), 1),
                createVNode("div", { class: "bp-card__foot" }, [
                  createVNode("span", { class: "bp-card__outcome" }, toDisplayString(page.outcome), 1),
                  createVNode("span", {
                    class: "bp-card__arrow",
                    style: { color: page.color }
                  }, "→", 4)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/biopay/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4e4c0cfd"]]);
export {
  index as default
};

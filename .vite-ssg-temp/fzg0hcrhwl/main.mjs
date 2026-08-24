import { ViteSSG } from "vite-ssg";
import { defineComponent, mergeProps, useSSRContext, ref, computed, onMounted, unref, watch, resolveComponent, createVNode, resolveDynamicComponent, nextTick, onBeforeUnmount, withCtx, createTextVNode, toDisplayString, onUnmounted, defineAsyncComponent } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrRenderTeleport, ssrIncludeBooleanAttr } from "vue/server-renderer";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "ArticleLink",
  __ssrInlineRender: true,
  props: {
    link: {},
    title: {},
    date: {},
    text: {},
    imageSrc: {},
    imageAlt: { default: "Article image" },
    kind: { default: "" },
    source: { default: "" },
    variant: { default: "standard" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.link,
        target: "_blank",
        rel: "noopener noreferrer",
        class: ["ed-article", {
          "ed-article--feature": __props.variant === "feature",
          "ed-article--compact": __props.variant === "compact"
        }]
      }, _attrs))} data-v-fd340763><div class="ed-article__media" data-v-fd340763><img${ssrRenderAttr("src", __props.imageSrc)}${ssrRenderAttr("alt", __props.imageAlt)} loading="lazy" data-v-fd340763></div><div class="ed-article__body" data-v-fd340763><div class="ed-article__meta" data-v-fd340763>`);
      if (__props.kind) {
        _push(`<span class="ed-article__tag" data-v-fd340763>${ssrInterpolate(__props.kind)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.kind) {
        _push(`<span class="ed-article__sep" data-v-fd340763>·</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="ed-article__date" data-v-fd340763>${ssrInterpolate(__props.date)}</span>`);
      if (__props.source) {
        _push(`<span class="ed-article__sep" data-v-fd340763>·</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.source) {
        _push(`<span class="ed-article__source" data-v-fd340763>${ssrInterpolate(__props.source)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><h3 class="ed-article__title" data-v-fd340763>${ssrInterpolate(__props.title)}</h3><p class="ed-article__text" data-v-fd340763>${ssrInterpolate(__props.text)}</p><span class="ed-article__read" data-v-fd340763>Read the article ↗</span></div></a>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/home/ArticleLink.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __unplugin_components_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-fd340763"]]);
const SECONDS_PER_ORG = 1.6;
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "OrganizationScroller",
  __ssrInlineRender: true,
  setup(__props) {
    const orgs = ref([]);
    const totalCount = ref(0);
    const scrollerStyle = computed(() => ({
      // CSS custom property — typed via the `as` cast because TS's CSSProperties
      // doesn't allow arbitrary `--` keys.
      ["--org-scroll-duration"]: `${Math.max(orgs.value.length, 1) * SECONDS_PER_ORG}s`
    }));
    function initialsFor(name) {
      return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase();
    }
    function isParticipant(o) {
      return o.type === "LFI" || o.type === "TPP";
    }
    function toDisplayOrg(o) {
      if (typeof o.id !== "string" || typeof o.name !== "string") return null;
      return {
        id: o.id,
        name: o.name,
        initials: initialsFor(o.name),
        logoUri: typeof o.logoUri === "string" ? o.logoUri : null
      };
    }
    onMounted(async () => {
      try {
        const { data } = await axios.get("/api/trust-framework.json");
        const list = Array.isArray(data) ? data : [];
        const participants = list.filter(isParticipant).slice().sort(
          (a, b) => Number(b.isProduction === true) - Number(a.isProduction === true)
        ).map(toDisplayOrg).filter((x) => x !== null);
        totalCount.value = participants.length;
        orgs.value = participants;
      } catch {
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (orgs.value.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "org-strip" }, _attrs))} data-v-2bb0ecf2><div class="org-strip__inner" data-v-2bb0ecf2><div class="org-strip__label" data-v-2bb0ecf2> Onboarded · ${ssrInterpolate(totalCount.value)} organisations </div></div><div class="org-scroller" style="${ssrRenderStyle(scrollerStyle.value)}" data-v-2bb0ecf2><div class="org-scroller__track" aria-hidden="false" data-v-2bb0ecf2><!--[-->`);
        ssrRenderList(orgs.value, (org) => {
          _push(`<div class="org-card"${ssrRenderAttr("title", org.name)} data-v-2bb0ecf2><div class="org-card__logo" data-v-2bb0ecf2>`);
          if (org.logoUri) {
            _push(`<img${ssrRenderAttr("src", org.logoUri)}${ssrRenderAttr("alt", org.name)} loading="lazy" data-v-2bb0ecf2>`);
          } else {
            _push(`<span class="org-card__fallback" data-v-2bb0ecf2>${ssrInterpolate(org.initials)}</span>`);
          }
          _push(`</div><div class="org-card__name" data-v-2bb0ecf2>${ssrInterpolate(org.name)}</div></div>`);
        });
        _push(`<!--]--></div><div class="org-scroller__track" aria-hidden="true" data-v-2bb0ecf2><!--[-->`);
        ssrRenderList(orgs.value, (org) => {
          _push(`<div class="org-card"${ssrRenderAttr("title", org.name)} data-v-2bb0ecf2><div class="org-card__logo" data-v-2bb0ecf2>`);
          if (org.logoUri) {
            _push(`<img${ssrRenderAttr("src", org.logoUri)} alt="" loading="lazy" data-v-2bb0ecf2>`);
          } else {
            _push(`<span class="org-card__fallback" data-v-2bb0ecf2>${ssrInterpolate(org.initials)}</span>`);
          }
          _push(`</div><div class="org-card__name" data-v-2bb0ecf2>${ssrInterpolate(org.name)}</div></div>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/home/OrganizationScroller.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-2bb0ecf2"]]);
const width = 280;
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "MiniChart",
  __ssrInlineRender: true,
  props: {
    data: {},
    color: { default: "#00277F" },
    height: { default: 60 },
    type: { default: "area" }
  },
  setup(__props) {
    const props = __props;
    const safeData = computed(
      () => props.data.length ? props.data : [0, 0]
    );
    const max = computed(() => Math.max(...safeData.value, 1));
    const step = computed(
      () => width / Math.max(safeData.value.length - 1, 1)
    );
    const points = computed(
      () => safeData.value.map((v, i) => ({
        x: i * step.value,
        y: props.height - v / max.value * props.height * 0.9 - 2
      }))
    );
    const pathD = computed(
      () => points.value.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ")
    );
    const areaD = computed(
      () => `${pathD.value} L ${width} ${props.height} L 0 ${props.height} Z`
    );
    const bars = computed(() => {
      if (props.type !== "bars") return [];
      const bw = step.value * 0.7;
      return safeData.value.map((v, i) => ({
        x: i * step.value + (step.value - bw) / 2,
        y: props.height - v / max.value * props.height * 0.9,
        width: bw,
        height: v / max.value * props.height * 0.9
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        viewBox: `0 0 ${width} ${__props.height}`,
        style: { width: "100%", height: `${__props.height}px`, display: "block" },
        preserveAspectRatio: "none",
        role: "img",
        "aria-label": `${safeData.value.length} data points`
      }, _attrs))}>`);
      if (__props.type === "bars") {
        _push(`<!--[-->`);
        ssrRenderList(bars.value, (bar, i) => {
          _push(`<rect${ssrRenderAttr("x", bar.x)}${ssrRenderAttr("y", bar.y)}${ssrRenderAttr("width", bar.width)}${ssrRenderAttr("height", bar.height)}${ssrRenderAttr("fill", __props.color)} opacity="0.85"></rect>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[--><path${ssrRenderAttr("d", areaD.value)}${ssrRenderAttr("fill", __props.color)} opacity="0.12"></path><path${ssrRenderAttr("d", pathD.value)} fill="none"${ssrRenderAttr("stroke", __props.color)} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path><!--]-->`);
      }
      _push(`</svg>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/home/MiniChart.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const ARTICLE_KIND_LABELS = {
  "press-release": "Press release",
  "news": "News",
  "regulation": "Regulation",
  "conference": "Conference"
};
const ARTICLE_KINDS = [
  "press-release",
  "news",
  "regulation",
  "conference"
];
const rawArticles = [
  {
    link: "https://fintechnews.media/2026/06/lean-and-ziina-launch-the-uaes-first-one-tap-pay-by-bank-experience-under-open-finance/",
    source: "Fintech News",
    kind: "press-release",
    date: "2026-06-25",
    dateLabel: "25 June 2026",
    imageSrc: "/images/articles/lean-ziina.png",
    title: "Lean and Ziina launch the UAE's first One-Tap Pay by Bank experience under Open Finance",
    text: "Lean Technologies and Ziina have launched the UAE's first One-Tap Pay by Bank experience under the Open Finance framework, marking a significant step in the maturation of account-to-account payments in the region."
  },
  {
    link: "https://fintechnews.media/2026/05/06/lean-technologies-scales-pay-by-bank-in-the-uae-as-open-finance-payments-go-live/",
    source: "Fintech News",
    kind: "press-release",
    date: "2026-05-06",
    dateLabel: "6 May 2026",
    imageSrc: "/images/articles/lean-scales.png",
    title: "Lean Technologies Scales Pay by Bank in the UAE as Open Finance Payments Go Live",
    text: "Lean Technologies, the MENA region's leading financial infrastructure provider, today announced the expansion of its Pay by Bank capabilities, built on the UAE's newly operational Open Finance framework."
  },
  {
    link: "https://wio.io/altareq",
    source: "Wio Bank",
    kind: "press-release",
    date: "2026-04-16",
    dateLabel: "16 April 2026",
    imageSrc: "/images/articles/wio.png",
    title: "Wio Bank has successfully completed its Open Finance enablement under AlTareq, Central Bank of The UAE's Open Finance initiative",
    text: "AlTareq, the UAE's open finance initiative, is now live and enabled for your Wio account, so you can manage your finances on your terms in a new era of connected financial services."
  },
  {
    link: "https://www.adib.ae/en/news/2026/apr/uaes-open-finance-altareq-initiative?utm_source=social&oczpid=195a1219-9152-473b-9a3f-55119be2446a",
    source: "ADIB",
    kind: "press-release",
    date: "2026-04-16",
    dateLabel: "16 April 2026",
    imageSrc: "/images/articles/adib-tpp.png",
    title: "ADIB becomes the UAE's first bank licensed to operate as an open finance provider under the UAE's Open Finance Altareq Initiative",
    text: "Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has become the first bank in the UAE to be licensed as a Third-Party Provider (TPP) or Open Finance Provider under the UAE Central Bank Open Finance AlTareq initiative. This milestone marks a significant step in ADIB's transformation journey and 2035 vision to build the bank of the future."
  },
  {
    link: "https://www.zawya.com/en/press-release/companies-news/adib-becomes-the-uaes-first-bank-licensed-to-operate-as-an-open-finance-provider-under-the-uaes-open-finance-altareq-initiative-ybyjb320",
    source: "Zawya",
    kind: "press-release",
    date: "2026-04-16",
    dateLabel: "16 April 2026",
    imageSrc: "/images/articles/adib-tpp-2.png",
    title: "ADIB becomes the UAE's first bank licensed to operate as an open finance provider under the UAE's Open Finance Altareq Initiative",
    text: "Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has become the first bank in the UAE to be licensed as a Third-Party Provider (TPP) or Open Finance Provider under the UAE Central Bank Open Finance AlTareq initiative. This milestone marks a significant step in ADIB's transformation journey and 2035 vision to build the bank of the future."
  },
  {
    link: "https://www.openbankingexpo.com/news/amazon-expands-uk-payment-options-with-pay-by-bank-via-partnership-with-truelayer/",
    source: "Open Banking Expo",
    kind: "news",
    date: "2026-02-10",
    dateLabel: "10 Feb 2026",
    imageSrc: "/images/articles/amazon.png",
    title: "Amazon expands UK payment options with Pay by Bank via partnership with TrueLayer",
    text: "Amazon has expanded the range of payment options available to UK customers, giving shoppers more choice over how they pay at checkout. From Pay by Bank to cards, instalments, gift cards and rewards points, the move reflects a broader shift towards more flexible, account-to-account payment experiences in everyday commerce."
  },
  {
    link: "https://gulfnews.com/business/banking/how-open-finance-in-uae-banks-is-driving-faster-credit-and-new-services-1.500418393",
    source: "Gulf News",
    kind: "news",
    date: "2026-01-23",
    dateLabel: "23 Jan 2026",
    imageSrc: "/images/articles/faster-credit.png",
    title: "How open finance in UAE banks is driving faster credit and new services",
    text: "UAE banking sector is entering a new phase of digital transformation as open finance begins to roll out, allowing individuals and businesses to securely share and initiate services such as payments through regulated third-party providers, all within a strict, consent-based framework."
  },
  {
    link: "https://uaefintechvibes.com/adib-leads-open-finance-initiative-altareq/",
    source: "UAE Fintech Vibes",
    kind: "news",
    date: "2026-01-21",
    dateLabel: "21 Jan 2026",
    imageSrc: "/images/articles/adib-sharia.png",
    title: "ADIB Leads the Shariah-Compliant Digital Wave with the Open Finance Initiative AlTareq",
    text: "Abu Dhabi Islamic Bank (ADIB), a global leader in Islamic finance, has announced a landmark achievement in its digital transformation journey. In alignment with its Vision 2035, ADIB has officially become the first Islamic bank in the UAE to implement Open Finance under the Open Finance Initiative AlTareq, a strategic project led by the Central Bank of the UAE (CBUAE)."
  },
  {
    link: "https://www.openbankingexpo.com/news/abu-dhabi-islamic-bank-implements-open-finance-with-support-from-altareq/",
    source: "Open Banking Expo",
    kind: "news",
    date: "2026-01-20",
    dateLabel: "20 Jan 2026",
    imageSrc: "/images/articles/adib-live.jpg",
    title: "Abu Dhabi Islamic Bank implements Open Finance with support from AlTareq",
    text: "Abu Dhabi Islamic Bank (ADIB), a leading Islamic financial institution, has taken another major step in shaping the future of financial services as part of its Vision 2035 by rolling out Open Finance, marking a key milestone in the UAE's Open Finance journey under AlTareq, the Central Bank of the UAE's (CBUAE) Open Finance Initiative."
  },
  {
    link: "https://www.linkedin.com/pulse/when-open-finance-became-real-customers-uae-faisal-toukan-9kvsf/",
    source: "LinkedIn · Faisal Toukan",
    kind: "news",
    date: "2026-01-20",
    dateLabel: "20 Jan 2026",
    imageSrc: "/images/articles/of-real-zina.png",
    title: "When Open Finance Became Real for Customers in the UAE",
    text: "We are witnessing the beginning of a shift in how money moves in the UAE. For the first time, a customer in the country has completed a live, regulated Open Finance payment from inside a Ziina app experience. What was once a policy framework and a technical standard is now a real interaction available to people who use Ziina every day."
  },
  {
    link: "https://ffnews.com/newsarticle/fintech/adib-becomes-first-islamic-bank-to-implement-open-finance-with-the-support-of-the-cbuaes-open-finance-initiative-altareq/",
    source: "FF News",
    kind: "news",
    date: "2026-01-20",
    dateLabel: "20 Jan 2026",
    imageSrc: "/images/articles/adib-first.jpg",
    title: "ADIB Becomes First Islamic Bank to Implement Open Finance With the Support of the CBUAE's Open Finance Initiative AlTareq",
    text: "Abu Dhabi Islamic Bank (ADIB) has taken another major step in shaping the future of financial services as part of its Vision 2035 by rolling out Open Finance, marking a key milestone in the UAE's Open Finance journey under AlTareq."
  },
  {
    link: "https://www.wamda.com/2026/01/ziina-uae-execute-live-open-finance-payments-lean",
    source: "Wamda",
    kind: "news",
    date: "2026-01-15",
    dateLabel: "15 Jan 2026",
    imageSrc: "/images/articles/zina-lean.jpg",
    title: "Ziina becomes first in the UAE to execute live Open Finance payments with Lean",
    text: "Lean Technologies, the MENA region's leading financial infrastructure provider, and Ziina, the UAE's homegrown consumer and business payments platform, announce the launch of the country's first live customer-initiated Open Finance payment experience under the Central Bank of the UAE's (CBUAE) Open Finance framework."
  },
  {
    link: "https://mena-fintech.org/news/pay10-and-first-abu-dhabi-bank-announce-open-finance-go-live-under-al-tareq-scheme/",
    source: "MENA Fintech",
    kind: "press-release",
    date: "2026-01-01",
    dateLabel: "01 Jan 2026",
    imageSrc: "/images/articles/pay10-fab.png",
    title: "Pay10 and First Abu Dhabi Bank announce Open Finance go live under Al Tareq scheme",
    text: "Pay10 and First Abu Dhabi Bank (FAB) have gone live on Open Finance for its retail customers in the UAE, marking a key milestone in the UAE's Open Finance journey under the Central Bank of the UAE's Open Finance Initiative, AlTareq."
  },
  {
    link: "https://gulfnews.com/amp/story/business%2Fbanking%2Ffab-pay10-go-live-with-uae-open-finance-initiative-1.500394316",
    source: "Gulf News",
    kind: "news",
    date: "2025-12-30",
    dateLabel: "30 Dec 2025",
    imageSrc: "/images/articles/fab-live.png",
    title: "FAB, Pay10 go live with UAE Open Finance initiative",
    text: "Abu Dhabi: First Abu Dhabi Bank (FAB) and Pay10 have officially gone live on Open Finance for retail customers, marking a significant step in the UAE's Open Finance journey under the Central Bank's Al Tareq initiative."
  },
  {
    link: "https://www.zawya.com/en/press-release/companies-news/pay10-and-commercial-bank-of-dubai-launch-open-finance-under-the-uaes-al-tareq-initiative-oduv1ph5",
    source: "Zawya",
    kind: "press-release",
    date: "2025-12-28",
    dateLabel: "28 Dec 2025",
    imageSrc: "/images/articles/cbd-pay10.png",
    title: "Pay10 and Commercial Bank of Dubai launch Open Finance under the UAE's Al Tareq Initiative",
    text: "Dubai, UAE: Pay10 and Commercial Bank of Dubai has announced the successful go-live of Open Finance services under the UAE's Open Finance Initiative, AlTareq, marking a significant advancement in the country's transition toward regulated, customer-centric digital financial services."
  },
  {
    link: "https://www.cbd.ae/aboutus/media-centre/press-room/news?Id=bb1563ff-458f-66de-b8c5-ff0b00b6b24a",
    source: "CBD",
    kind: "press-release",
    date: "2025-12-23",
    dateLabel: "23 Dec 2025",
    imageSrc: "/images/articles/cbd-live.jpg",
    title: "Commercial Bank of Dubai Sets New Benchmark as UAE's First Bank to Fully Activate Open Finance for Customers",
    text: "Commercial Bank of Dubai (CBD) has set a new benchmark for the UAE banking sector by becoming the first bank in the country to fully activate Open Finance into live operational use under the Central Bank of the UAE's Open Finance Initiative, AlTareq."
  },
  {
    link: "https://openfinance-hackathon.com/",
    source: "UAE Open Finance + AI Hackathon",
    kind: "conference",
    date: "2025-11-14",
    dateLabel: "14 Nov 2025",
    imageSrc: "/images/articles/hackathon.png",
    title: "The Grand Finale: UAE Open Finance + AI Hackathon",
    text: "The stage is set for the final showdown, where the region's brightest developers, fintech innovators, and AI visionaries come together to present the future of financial services."
  },
  {
    link: "https://fintechnews.media/2025/11/04/mercury-receives-deemed-open-finance-license-approval-from-the-central-bank-of-the-uae/",
    source: "Fintech News",
    kind: "regulation",
    date: "2025-11-04",
    dateLabel: "4 Nov 2025",
    imageSrc: "/images/articles/merc.png",
    title: "Mercury receives deemed Open Finance License approval from the Central Bank of the UAE",
    text: "Dubai: Mercury Payments Services (Mercury), a leading regional payments infrastructure and technology provider, is proud to announce that it has been granted approval for a deemed Open Finance License by the Central Bank of the UAE (CBUAE)."
  },
  {
    link: "https://fintechnews.ae/27167/fintechdubai/tarabut-uae-central-bank-open-finance-approval/",
    source: "Fintech News AE",
    kind: "regulation",
    date: "2025-08-05",
    dateLabel: "5 Aug 2025",
    imageSrc: "/images/articles/tarabut-lic.png",
    title: "Tarabut Secures UAE Central Bank Approval for Open Finance Operations",
    text: "Tarabut, a Dubai-based open banking and embedded finance platform, has received in-principle approval from the Central Bank of the United Arab Emirates (CBUAE), following the introduction of the UAE's Open Finance regulation."
  },
  {
    link: "https://mena-fintech.org/news/pay10-processes-the-uaes-first-open-finance-transaction-under-central-bank-of-the-uaes-framework/",
    source: "MENA Fintech",
    kind: "news",
    date: "2025-08-04",
    dateLabel: "4 Aug 2025",
    imageSrc: "/images/articles/pay10.png",
    title: "Pay10 Processes the UAE's First Open Finance Transaction Under Central Bank of the UAE's Framework",
    text: "Pay10, the UAE's first licensed third-party provider (TPP) under the Central Bank of the UAE's (CBUAE) Open Finance framework, announces it has successfully processed the country's first live Open Finance transaction in partnership with Abu Dhabi Commercial Bank (ADCB)."
  },
  {
    link: "https://www.agbi.com/banking-finance/2025/08/adcb-open-finance-uae-will-transform-the-banking-experience/",
    source: "AGBI",
    kind: "news",
    date: "2025-08-01",
    dateLabel: "1 Aug 2025",
    imageSrc: "/images/articles/adcb-pay10.png",
    title: "ADCB is proud to be the first certified bank in the UAE to complete a transaction with Pay10",
    text: "The UAE is on the cusp of a transformation in financial services, as the Central Bank of the UAE (CBUAE) rolls out its pioneering Open Finance initiative — a key pillar of the country's ambition to become a leading global financial hub."
  },
  {
    link: "https://ffnews.com/newsarticle/fintech/spare-open-finance-uae-approval/",
    source: "FF News",
    kind: "regulation",
    date: "2025-08-01",
    dateLabel: "1 Aug 2025",
    imageSrc: "/images/articles/spare.png",
    title: "Spare Receives In-Principle Approval From the Central Bank of the UAE for Open Finance License",
    text: "Spare, a leading Open Finance infrastructure provider, has received In-Principle Approval (IPA) from the Central Bank of the UAE (CBUAE) to operate under the country's Open Finance regulatory framework."
  },
  {
    link: "https://www.openbankingexpo.com/news/spare-secures-uae-central-bank-approval-for-open-finance-license/",
    source: "Open Banking Expo",
    kind: "regulation",
    date: "2025-07-31",
    dateLabel: "31 Jul 2025",
    imageSrc: "/images/articles/spare-lic.png",
    title: "Spare secures UAE central bank approval for Open Finance license",
    text: "Spare, a leading Open Finance infrastructure provider, has received in-principle approval from the Central Bank of the UAE (CBUAE) to operate under the country's Open Finance regulatory framework."
  },
  {
    link: "https://nymcard.com/2025/05/09/nymcard-launches-open-finance-services-under-cbuae-open-finance-regulation/",
    source: "NymCard",
    kind: "regulation",
    date: "2025-05-09",
    dateLabel: "9 May 2025",
    imageSrc: "/images/articles/nymcard.png",
    title: "NymCard Launches Open Finance Services Under CBUAE Open Finance Regulation",
    text: "NymCard, the MENA region's leading embedded finance platform, today announced that it is now officially licensed to provide Open Finance services under the Central Bank of the UAE's Open Finance regulation."
  }
];
function deriveId(link) {
  return link.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 90);
}
const articles = rawArticles.slice().sort((a, b) => b.date.localeCompare(a.date)).map((a) => ({ ...a, id: deriveId(a.link) }));
function countByKind() {
  const counts = {
    all: articles.length,
    "press-release": 0,
    "news": 0,
    "regulation": 0,
    "conference": 0
  };
  for (const a of articles) counts[a.kind] += 1;
  return counts;
}
const isOpen = ref(false);
const everOpened = ref(false);
function openSearchModal() {
  everOpened.value = true;
  isOpen.value = true;
}
function closeSearchModal() {
  isOpen.value = false;
}
function useSearchModal() {
  return {
    isOpen,
    everOpened,
    open: openSearchModal,
    close: closeSearchModal,
    toggle: () => {
      if (isOpen.value) closeSearchModal();
      else openSearchModal();
    }
  };
}
const VERSIONS = ["v2.1", "v2.2-rc1"];
const CURRENT_VERSION = "v2.1";
const DRAFT_VERSIONS = ["v2.2-rc1"];
function isDraftVersion(v) {
  return DRAFT_VERSIONS.includes(v);
}
const PROTOCOL_VERSION = {
  "v2.1": "v2.1",
  "v2.2-rc1": "v2.2"
};
const FIELD_MAP_DIR = {
  "v2.1": "field-map/v2.1",
  "v2.2-rc1": "field-map/v2.1"
};
const selectedVersion = ref(CURRENT_VERSION);
let seeded = false;
function isVersion(value) {
  return VERSIONS.includes(value);
}
function versionFromPath(path) {
  const segments = path.split("/").filter(Boolean);
  for (const segment of segments) {
    if (isVersion(segment)) return segment;
  }
  return null;
}
function seedFromRoute() {
  if (seeded) return;
  seeded = true;
  try {
    const route = useRoute();
    const path = route == null ? void 0 : route.path;
    if (typeof path !== "string") return;
    const candidate = versionFromPath(path);
    if (candidate) {
      selectedVersion.value = candidate;
    }
  } catch {
  }
}
const RELEASE_NOTES_PREFIX$1 = "/tech/release-notes-and-erratas";
function routeHasVersionDropdown(path) {
  return path.startsWith("/tech/") && !path.startsWith(RELEASE_NOTES_PREFIX$1);
}
function setSelectedVersion(v) {
  if (!isVersion(v)) return;
  selectedVersion.value = v;
}
function useSelectedVersion() {
  seedFromRoute();
  return { selectedVersion, setSelectedVersion };
}
function useRouteVersion() {
  const route = useRoute();
  const docsVersion = computed(
    () => versionFromPath(route.path) ?? CURRENT_VERSION
  );
  return {
    docsVersion,
    protocolVersion: computed(() => PROTOCOL_VERSION[docsVersion.value])
  };
}
const MANIFEST_URL = "/api/api-log-index.json";
function decodeApiLogPayload(payload) {
  if (Array.isArray(payload)) return payload;
  const shard = payload;
  if (!Array.isArray(shard == null ? void 0 : shard.rows) || !Array.isArray(shard == null ? void 0 : shard.fields)) return [];
  const { fields, dicts, rows } = shard;
  return rows.map((tuple) => {
    const row = {};
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const dict = dicts == null ? void 0 : dicts[field];
      row[field] = dict ? dict[tuple[i]] : tuple[i];
    }
    return row;
  });
}
let inFlight = null;
async function fetchAll() {
  const manifestRes = await fetch(MANIFEST_URL);
  if (!manifestRes.ok) throw new Error(`api-log manifest ${manifestRes.status}`);
  const manifest = await manifestRes.json();
  const shards = Array.isArray(manifest.shards) ? manifest.shards : [];
  if (!shards.length) throw new Error("api-log manifest lists no shards");
  const payloads = await Promise.all(
    shards.map(async (file) => {
      const res = await fetch(`/api/${file}`);
      if (!res.ok) throw new Error(`api-log shard ${file} ${res.status}`);
      return await res.json();
    })
  );
  return payloads.flatMap(decodeApiLogPayload);
}
function loadApiLog() {
  if (!inFlight) {
    inFlight = fetchAll().catch((err) => {
      inFlight = null;
      throw err;
    });
  }
  return inFlight;
}
const CONSENT_AUTH_URL = "/auth/:interactionId/doConfirm";
const AUTH_START_URL = "/auth";
const CHART_MONTHS = 4;
const BASELINE_MONTHS = 3;
const SUPPORT_EMAIL = "support@nebrasopenfinance.ae";
const communityOrg = "Nebras-Open-Finance";
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedVersion: selectedVersion2 } = useSelectedVersion();
    const kindLabels = ARTICLE_KIND_LABELS;
    const ACCENT = {
      teal: "#00C2A9",
      gold: "#B37819",
      navy: "#00277F",
      blueDeep: "#0043A6",
      sky: "#00A2FB"
    };
    const SUCCESS_PAYMENT_STATUSES = /* @__PURE__ */ new Set([
      "AcceptedSettlementCompleted",
      "AcceptedCreditSettlementCompleted",
      "AcceptedWithoutPosting"
    ]);
    const CONSENT_SUCCESS_CODES = /* @__PURE__ */ new Set(["2xx", "3xx"]);
    const tfData = ref([]);
    const apiData = ref([]);
    const paymentData = ref([]);
    const authData = ref([]);
    onMounted(async () => {
      const [tf, api, payments, auth] = await Promise.all([
        axios.get("/api/trust-framework.json").catch(() => ({ data: [] })),
        loadApiLog().catch(() => []),
        fetch("/api/payments-log.json").then((r) => r.json()).catch(() => []),
        fetch("/api/auth-log.json").then((r) => r.json()).catch(() => [])
      ]);
      tfData.value = Array.isArray(tf.data) ? tf.data : [];
      apiData.value = Array.isArray(api) ? api : [];
      paymentData.value = Array.isArray(payments) ? payments : [];
      authData.value = Array.isArray(auth) ? auth : [];
    });
    function isConsentAuthorised(r) {
      return r.url === CONSENT_AUTH_URL && typeof r.tppresponsecodegroup === "string" && CONSENT_SUCCESS_CODES.has(r.tppresponsecodegroup);
    }
    function isAuthStart(r) {
      return r.url === AUTH_START_URL && r.tppresponsecodegroup === "2xx";
    }
    function monthlyTotals(rows, valueFn, dateFn) {
      const byMonth = {};
      for (const r of rows) {
        const date = dateFn(r) ?? "";
        const m = date.substring(0, 7);
        if (!m) continue;
        byMonth[m] = (byMonth[m] ?? 0) + (valueFn(r) ?? 0);
      }
      return byMonth;
    }
    function monthlySeries(rows, valueFn, dateFn) {
      const byMonth = monthlyTotals(rows, valueFn, dateFn);
      return Object.keys(byMonth).sort().map((k) => byMonth[k] ?? 0);
    }
    const MONTH_SHORT = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    function monthLabel(m) {
      if (!m) return "";
      const parts = m.split("-");
      const y = parts[0] ?? "";
      const mm = parts[1] ?? "";
      const idx = parseInt(mm, 10) - 1;
      return `${MONTH_SHORT[idx] ?? mm} ${y.slice(2)}`;
    }
    function thinLabels(labels, max = 6) {
      if (labels.length <= max) return labels.map(monthLabel);
      const step = (labels.length - 1) / (max - 1);
      return Array.from({ length: max }, (_, i) => monthLabel(labels[Math.round(i * step)]));
    }
    function partialMonth() {
      const d = /* @__PURE__ */ new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    }
    function completeMonthly(rows, valueFn, dateFn) {
      const byMonth = monthlyTotals(rows, valueFn, dateFn);
      const partial = partialMonth();
      const keys = Object.keys(byMonth).sort().filter((k) => k !== partial);
      return { labels: keys, series: keys.map((k) => byMonth[k] ?? 0) };
    }
    function lastMonths(arr, n = CHART_MONTHS) {
      return arr.length <= n ? arr.slice() : arr.slice(arr.length - n);
    }
    function vsRecentAvg(series) {
      if (series.length < 2) return null;
      const last = series[series.length - 1] ?? 0;
      const prior = series.slice(Math.max(0, series.length - 1 - BASELINE_MONTHS), series.length - 1);
      const base = prior.reduce((sum, v) => sum + v, 0) / prior.length;
      if (base <= 0) return null;
      return { pct: Math.round((last / base - 1) * 100), months: prior.length };
    }
    function compact(n) {
      if (n == null) return "—";
      if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
      if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
      if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
      return String(n);
    }
    function lfiOrgs(orgs) {
      return orgs.filter((o) => o.type === "LFI");
    }
    function tppOrgs(orgs) {
      return orgs.filter((o) => o.type === "TPP" || !!o.tppGoLiveDate);
    }
    function pad2(n) {
      return String(n).padStart(2, "0");
    }
    function tppIdsByName(orgs) {
      const byName = /* @__PURE__ */ new Map();
      for (const o of tppOrgs(orgs)) {
        const id = o.id ?? o.legalName ?? o.name ?? "";
        if (!id) continue;
        if (o.legalName) byName.set(o.legalName.toUpperCase(), id);
        if (o.name) byName.set(o.name.toUpperCase(), id);
      }
      return byName;
    }
    const lastUpdatedLabel = computed(() => {
      let max = "";
      const sources = [apiData.value, paymentData.value, authData.value];
      for (const rows of sources) {
        for (const r of rows) {
          if (r.date && r.date > max) max = r.date;
        }
      }
      if (!max) return "—";
      const parts = max.split("-");
      const y = parts[0] ?? "";
      const m = parts[1] ?? "";
      const d = parts[2] ?? "";
      const idx = parseInt(m, 10) - 1;
      return `${parseInt(d, 10)} ${MONTH_SHORT[idx] ?? m} ${y}`;
    });
    function fmtMomentum(d) {
      if (d == null) return "—";
      return `${d.pct >= 0 ? "↑" : "↓"} ${Math.abs(d.pct)}%`;
    }
    const tickerCells = computed(() => {
      const apiTotal = monthlySeries(apiData.value, (r) => r.totalapicalls, (r) => r.date).reduce((s, v) => s + v, 0);
      const apiComplete = completeMonthly(apiData.value, (r) => r.totalapicalls, (r) => r.date);
      const apiDelta = vsRecentAvg(apiComplete.series);
      const paySuccess = paymentData.value.filter(
        (r) => typeof r.status === "string" && SUCCESS_PAYMENT_STATUSES.has(r.status) && !!r.lfinamekey
      );
      const payTotal = monthlySeries(paySuccess, (r) => r.amount, (r) => r.date).reduce((s, v) => s + v, 0);
      const payComplete = completeMonthly(paySuccess, (r) => r.amount, (r) => r.date);
      const payDelta = vsRecentAvg(payComplete.series);
      return [
        {
          label: "API Calls",
          value: compact(apiTotal),
          delta: fmtMomentum(apiDelta),
          color: ACCENT.teal,
          series: lastMonths(apiComplete.series)
        },
        {
          label: "Payments (AED)",
          value: compact(payTotal),
          delta: fmtMomentum(payDelta),
          color: ACCENT.gold,
          series: lastMonths(payComplete.series)
        }
      ];
    });
    const participantRows = computed(() => {
      const lfis = lfiOrgs(tfData.value);
      const tpps = tppOrgs(tfData.value);
      return [
        {
          label: "LFIs",
          color: ACCENT.navy,
          stats: [
            { label: "Live", value: pad2(lfis.filter((o) => !!o.lfiGoLiveDate).length) },
            { label: "Production", value: pad2(lfis.filter((o) => o.isProduction === true).length) },
            { label: "Onboarded", value: pad2(lfis.length) }
          ]
        },
        {
          label: "TPPs",
          color: ACCENT.blueDeep,
          stats: [
            { label: "Live", value: pad2(tpps.filter((o) => !!o.tppGoLiveDate).length) },
            { label: "Production", value: pad2(tpps.filter((o) => o.isProduction === true).length) },
            { label: "Onboarded", value: pad2(tpps.length) }
          ]
        }
      ];
    });
    const storyCharts = computed(() => {
      const consentSuccess = authData.value.filter(isConsentAuthorised);
      const consentsTotal = monthlySeries(consentSuccess, (r) => r.totalapicalls, (r) => r.date).reduce((s, v) => s + v, 0);
      const consentsComplete = completeMonthly(consentSuccess, (r) => r.totalapicalls, (r) => r.date);
      const confByMonth = monthlyTotals(authData.value.filter(isConsentAuthorised), (r) => r.totalapicalls, (r) => r.date);
      const startByMonth = monthlyTotals(authData.value.filter(isAuthStart), (r) => r.totalapicalls, (r) => r.date);
      const partial = partialMonth();
      const rateMonths = Object.keys(startByMonth).sort().filter((m) => m !== partial);
      const rateSeries = rateMonths.map((m) => {
        const s = startByMonth[m] ?? 0;
        return s > 0 ? (confByMonth[m] ?? 0) / s * 100 : 0;
      });
      const totalStarts = Object.values(startByMonth).reduce((s, v) => s + v, 0);
      const totalConf = Object.values(confByMonth).reduce((s, v) => s + v, 0);
      const overallRate = totalStarts > 0 ? totalConf / totalStarts * 100 : null;
      return [
        {
          label: "Consents Authorised · by Month",
          value: consentsTotal.toLocaleString(),
          color: ACCENT.teal,
          series: lastMonths(consentsComplete.series),
          labels: thinLabels(lastMonths(consentsComplete.labels))
        },
        {
          label: "Consent Success Rate · by Month",
          value: overallRate == null ? "—" : `${overallRate.toFixed(1)}%`,
          color: ACCENT.sky,
          series: lastMonths(rateSeries),
          labels: thinLabels(lastMonths(rateMonths))
        }
      ];
    });
    const heroKpis = computed(() => {
      const consentsAuthorised = authData.value.filter(isConsentAuthorised).reduce((s, r) => s + (r.totalapicalls ?? 0), 0);
      const authStarts = authData.value.filter(isAuthStart).reduce((s, r) => s + (r.totalapicalls ?? 0), 0);
      const successRate = authStarts > 0 ? consentsAuthorised / authStarts * 100 : null;
      let activeLfis = 0;
      let activeTpps = 0;
      const registeredTpps = tppIdsByName(tfData.value);
      if (apiData.value.length > 0) {
        const first = apiData.value[0];
        const initial = (first == null ? void 0 : first.date) ?? "";
        const maxDate = apiData.value.reduce(
          (m, r) => r.date && r.date > m ? r.date : m,
          initial
        );
        if (maxDate) {
          const d = /* @__PURE__ */ new Date(maxDate + "T00:00:00Z");
          d.setUTCDate(d.getUTCDate() - 30);
          const windowStart = d.toISOString().substring(0, 10);
          const lfiSet = /* @__PURE__ */ new Set();
          const tppSet = /* @__PURE__ */ new Set();
          for (const r of apiData.value) {
            if (r.date && r.date >= windowStart) {
              if (r.lfinamekey) lfiSet.add(r.lfinamekey);
              const tppId = r.tppname ? registeredTpps.get(r.tppname.toUpperCase()) : void 0;
              if (tppId) tppSet.add(tppId);
            }
          }
          activeLfis = lfiSet.size;
          activeTpps = tppSet.size;
        }
      }
      return [
        {
          label: "Consents Authorised",
          value: consentsAuthorised.toLocaleString(),
          desc: "Successful customer authorisations",
          color: ACCENT.teal
        },
        {
          label: "Consent Success Rate",
          value: successRate == null ? "—" : `${successRate.toFixed(1)}%`,
          desc: "Customers completing authorisation",
          color: ACCENT.sky
        },
        {
          label: "LFIs Serving Traffic · 30d",
          value: String(activeLfis).padStart(2, "0"),
          desc: "Received API traffic in the last 30 days",
          color: ACCENT.navy
        },
        {
          label: "TPPs Making Requests · 30d",
          value: String(activeTpps).padStart(2, "0"),
          desc: "Sent API requests in the last 30 days",
          color: ACCENT.blueDeep
        }
      ];
    });
    const docsCols = computed(() => [
      {
        tag: "FOR TPPs",
        title: "Third Party Providers",
        sub: "Build on Open Finance",
        tone: "teal",
        badge: `Standards ${selectedVersion2.value}`,
        cta: "/tech/tpp-standards/",
        ctaLabel: "TPP",
        items: [
          { title: "Getting Started", desc: "Sandbox, Postman, first API call.", href: `/tech/tpp-standards/${selectedVersion2.value}/getting-started/` },
          { title: "Consent", desc: "Create, manage, and revoke consents.", href: `/tech/tpp-standards/${selectedVersion2.value}/consent/` },
          { title: "Security & FAPI", desc: "FAPI profile, tokens, signing, events.", href: "/tech/tpp-standards/security/fapi/" },
          { title: "Banking APIs", desc: "Accounts, payments, CoP, products, ATMs.", href: `/tech/tpp-standards/${selectedVersion2.value}/banking/` },
          { title: "Insurance APIs", desc: "Policy data sharing and quotation.", href: `/tech/tpp-standards/${selectedVersion2.value}/insurance/` },
          { title: "Testing & Certification", desc: "Conformance, then go live.", href: "/tech/tpp-standards/production/testing-certification/overview" }
        ]
      },
      {
        tag: "FOR LFIs",
        title: "Licensed Financial Institutions",
        sub: "Power Open Finance",
        tone: "gold",
        badge: "Integration Guide",
        cta: "/tech/lfi-api-hub/",
        ctaLabel: "LFI",
        items: [
          { title: "Integration Journey", desc: "Step-by-step onboarding.", href: "/tech/lfi-api-hub/getting-started/" },
          { title: "Trust Framework", desc: "Organisations, users, certificates, C3 client.", href: "/tech/lfi-api-hub/trust-framework/" },
          { title: "API Hub", desc: "Connectivity, Heimdall, Consent Manager.", href: `/tech/lfi-api-hub/${selectedVersion2.value}/api-hub/` },
          { title: "Ozone Connect", desc: "Accounts, payments & data endpoints you build.", href: `/tech/lfi-api-hub/${selectedVersion2.value}/banking/` },
          { title: "Consent Journey", desc: "Authenticate & authorise the customer (SCA).", href: `/tech/lfi-api-hub/${selectedVersion2.value}/consent-journey/api-guide` },
          { title: "Testing & Certification", desc: "Certification and live proving.", href: "/tech/lfi-api-hub/production/testing-certification/overview" }
        ]
      }
    ]);
    const programCards = [
      {
        category: "Support",
        color: "var(--at-teal)",
        title: "Service Desk",
        desc: "Raise onboarding, certification, and support tickets, and track them through to resolution.",
        url: "/support-service-desk",
        tags: ["Onboarding", "Certification", "Support"]
      },
      {
        category: "Pricing",
        color: "var(--at-gold)",
        title: "Commercial Model",
        desc: "The charging structure for Open Finance &mdash; per-call fees, discounts, and an interactive cost calculator.",
        url: "/pricing/",
        tags: ["Fees", "Calculator"]
      },
      {
        category: "Governance",
        color: "var(--at-blue)",
        title: "Policies",
        desc: "The operational policies you commit to as a participant &mdash; availability, response time, data quality, and version management.",
        url: "/policy/",
        tags: ["SLAs", "Operational"]
      },
      {
        category: "Participants",
        color: "var(--at-blue-deep)",
        title: "Document Repository",
        desc: "Production documents and endpoint details published by each live LFI and TPP in the ecosystem.",
        url: "/doc-repository/",
        tags: ["LFI docs", "TPP docs"]
      },
      {
        category: "Adoption",
        color: "var(--at-navy)",
        title: "Live Ecosystem",
        desc: "Who&rsquo;s live and what&rsquo;s running in production &mdash; participants, APIs, and recent activity.",
        url: "/program/whats-live",
        tags: ["Production", "Activity"]
      }
    ];
    function programTagBg(cssVar) {
      return `color-mix(in srgb, ${cssVar} 10%, transparent)`;
    }
    const featuredArticle = computed(() => articles[0] ?? null);
    const sidebarArticles = computed(() => articles.slice(1, 3));
    const bodyArticles = computed(() => articles.slice(3, 9));
    const communityStats = ref({
      openPRs: null,
      openIssues: null,
      contributors: null,
      recentCommits: null
    });
    onMounted(async () => {
      try {
        const res = await fetch("/api/github-stats.json");
        if (!res.ok) return;
        const d = await res.json();
        if (!d || typeof d !== "object") return;
        const obj = d;
        const num = (key) => typeof obj[key] === "number" ? obj[key] : null;
        communityStats.value = {
          openPRs: num("openPRs"),
          openIssues: num("openIssues"),
          contributors: num("contributors"),
          recentCommits: num("recentCommits")
        };
      } catch {
      }
    });
    function fmtStat(n) {
      return n == null ? "—" : String(n);
    }
    const communityStatRows = computed(() => [
      { label: "Open pull requests", value: fmtStat(communityStats.value.openPRs) },
      { label: "Open issues & erratas", value: fmtStat(communityStats.value.openIssues) },
      { label: "Contributors · all time", value: fmtStat(communityStats.value.contributors) },
      { label: "Commits · last 30d", value: fmtStat(communityStats.value.recentCommits) }
    ]);
    const communityDrafts = [
      {
        title: "Machine-readable specification",
        desc: 'The standard, as code. OpenAPI + JSON Schema + an executable conformance suite, so "compliant" means something a CI pipeline can prove.'
      },
      {
        title: "Bulk & Batch Payments",
        desc: "One consent, many payments. Payroll, supplier runs, and recurring disbursements without re-prompting the customer for every transfer."
      },
      {
        title: "International Payments, reimagined",
        desc: "A ground-up redesign of the cross-border flow — FX transparency, beneficiary verification, and SWIFT/instant rails treated as first-class citizens."
      }
    ];
    const communityWays = [
      { title: "File an errata", desc: "Spot an error or ambiguity in the published specs? Open an issue." },
      { title: "Improve the docs", desc: "Clarify integration guides, add examples, fix typos — every PR counts." },
      { title: "Share implementation notes", desc: "What tripped you up? How did you test? Document it for the next team." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MiniChart = _sfc_main$c;
      const _component_OrganizationScroller = __unplugin_components_1$1;
      const _component_ArticleLink = __unplugin_components_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-home" }, _attrs))} data-v-c38fe334><section class="ed-hero" data-v-c38fe334><div class="ed-hero__inner" data-v-c38fe334><div class="ed-hero__grid" data-v-c38fe334><div class="ed-hero__lede" data-v-c38fe334><div class="ed-hero__label" data-v-c38fe334><span class="ed-hero__label-dash" data-v-c38fe334></span> The UAE Open Finance Community </div><h1 class="ed-hero__title" data-v-c38fe334> Building open<br data-v-c38fe334><span class="ed-hero__title-italic" data-v-c38fe334>finance,</span><br data-v-c38fe334> together. </h1><p class="ed-hero__sub" data-v-c38fe334> Insights, tools, and live ecosystem data for everyone building on — and powering — the UAE’s Open Finance framework. Community-driven and open source. <strong data-v-c38fe334>Not official.</strong></p><div class="ed-hero__cta-row" data-v-c38fe334><a class="ed-btn ed-btn--ink" href="/tech/tpp-standards/" data-v-c38fe334>Open Finance Standards</a><a class="ed-btn ed-btn--ink" href="/tech/lfi-api-hub/" data-v-c38fe334>LFI Integration Guide</a><button type="button" class="ed-btn ed-btn--ghost ed-btn--search" data-v-c38fe334><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-v-c38fe334><circle cx="10" cy="10" r="7" data-v-c38fe334></circle><path d="M21 21l-6-6" data-v-c38fe334></path></svg> Search Docs </button></div></div><aside class="ed-ticker" data-v-c38fe334><div class="ed-ticker__header" data-v-c38fe334><span class="ed-ticker__dot" data-v-c38fe334></span> Live Ecosystem · Updated ${ssrInterpolate(lastUpdatedLabel.value)}</div><!--[-->`);
      ssrRenderList(tickerCells.value, (t) => {
        _push(`<div class="ed-ticker__row" data-v-c38fe334><div class="ed-ticker__cell" data-v-c38fe334><div class="ed-ticker__label" data-v-c38fe334>${ssrInterpolate(t.label)}</div><div class="ed-ticker__value" data-v-c38fe334>${ssrInterpolate(t.value)}</div></div><div class="ed-ticker__delta" style="${ssrRenderStyle({ color: t.color })}" data-v-c38fe334>${ssrInterpolate(t.delta)}</div><div class="ed-ticker__spark" data-v-c38fe334>`);
        _push(ssrRenderComponent(_component_MiniChart, {
          data: t.series,
          color: t.color,
          type: "area",
          height: 40
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(participantRows.value, (p) => {
        _push(`<div class="ed-ticker__row ed-ticker__row--counts" data-v-c38fe334><div class="ed-ticker__label" data-v-c38fe334>${ssrInterpolate(p.label)}</div><div class="ed-ticker__counts" data-v-c38fe334><!--[-->`);
        ssrRenderList(p.stats, (s) => {
          _push(`<div class="ed-ticker__count" data-v-c38fe334><div class="ed-ticker__value" data-v-c38fe334>${ssrInterpolate(s.value)}</div><div class="ed-ticker__count-label" style="${ssrRenderStyle({ color: p.color })}" data-v-c38fe334>${ssrInterpolate(s.label)}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></aside></div></div></section>`);
      _push(ssrRenderComponent(_component_OrganizationScroller, null, null, _parent));
      _push(`<section class="ed-section" data-v-c38fe334><div class="ed-section__inner" data-v-c38fe334><header class="ed-section__head" data-v-c38fe334><div class="ed-section__head-left" data-v-c38fe334><span class="ed-section__mark" data-v-c38fe334>§ 01</span><h2 class="ed-section__title" data-v-c38fe334> The story,<br data-v-c38fe334>in numbers. </h2></div><p class="ed-section__intro" data-v-c38fe334> Key metrics tracking adoption and expansion of the CBUAE Open Finance framework. Every call, every payment, every consent — counted and open. Visit the <a href="/metrics" data-v-c38fe334>metrics dashboard</a> for the full picture. </p></header><div class="ed-kpis" data-v-c38fe334><!--[-->`);
      ssrRenderList(heroKpis.value, (k) => {
        _push(`<div class="ed-kpi" data-v-c38fe334><span class="ed-kpi__accent" style="${ssrRenderStyle({ background: k.color })}" data-v-c38fe334></span><div class="ed-kpi__label" data-v-c38fe334>${ssrInterpolate(k.label)}</div><div class="ed-kpi__value" data-v-c38fe334>${ssrInterpolate(k.value)}</div><div class="ed-kpi__desc" data-v-c38fe334>${ssrInterpolate(k.desc)}</div></div>`);
      });
      _push(`<!--]--></div><div class="ed-chart-row" data-v-c38fe334><!--[-->`);
      ssrRenderList(storyCharts.value, (c) => {
        _push(`<div class="ed-story-chart" data-v-c38fe334><div class="ed-story-chart__head" data-v-c38fe334><span class="ed-story-chart__accent" style="${ssrRenderStyle({ background: c.color })}" data-v-c38fe334></span><span class="ed-story-chart__label" data-v-c38fe334>${ssrInterpolate(c.label)}</span></div><div class="ed-story-chart__value" data-v-c38fe334>${ssrInterpolate(c.value)}</div>`);
        _push(ssrRenderComponent(_component_MiniChart, {
          data: c.series,
          color: c.color,
          type: "area",
          height: 200
        }, null, _parent));
        if (c.labels.length) {
          _push(`<div class="ed-story-chart__axis" data-v-c38fe334><!--[-->`);
          ssrRenderList(c.labels, (l, i) => {
            _push(`<span data-v-c38fe334>${ssrInterpolate(l)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><a href="/metrics" class="ed-more-link" data-v-c38fe334> Explore all metrics <span data-v-c38fe334>→</span></a></div></section><section class="ed-section ed-section--paper" data-v-c38fe334><div class="ed-section__inner" data-v-c38fe334><header class="ed-section__head" data-v-c38fe334><div class="ed-section__head-left" data-v-c38fe334><span class="ed-section__mark ed-section__mark--gold" data-v-c38fe334>§ 02</span><h2 class="ed-section__title" data-v-c38fe334> Developer<br data-v-c38fe334>documentation. </h2></div><p class="ed-section__intro" data-v-c38fe334> Technical documentation for every participant — whether you’re <strong data-v-c38fe334>building on top of</strong> Open Finance or <strong data-v-c38fe334>powering it</strong>. </p></header><div class="ed-docs" data-v-c38fe334><!--[-->`);
      ssrRenderList(docsCols.value, (col) => {
        _push(`<div class="${ssrRenderClass([col.tone === "gold" ? "ed-docs__col--gold" : "ed-docs__col--teal", "ed-docs__col"])}" data-v-c38fe334><div class="ed-docs__col-head" data-v-c38fe334><div data-v-c38fe334><div class="ed-docs__col-kicker" data-v-c38fe334>${ssrInterpolate(col.tag)}</div><h3 class="ed-docs__col-title" data-v-c38fe334>${ssrInterpolate(col.title)}</h3><p class="ed-docs__col-sub" data-v-c38fe334>${ssrInterpolate(col.sub)}</p></div><span class="ed-docs__col-badge" data-v-c38fe334>${ssrInterpolate(col.badge)}</span></div><!--[-->`);
        ssrRenderList(col.items, (item, i) => {
          _push(`<a${ssrRenderAttr("href", item.href)} class="ed-docs__row" data-v-c38fe334><span class="ed-docs__num" data-v-c38fe334>0${ssrInterpolate(i + 1)}</span><div data-v-c38fe334><div class="ed-docs__row-title" data-v-c38fe334>${ssrInterpolate(item.title)}</div><div class="ed-docs__row-desc" data-v-c38fe334>${ssrInterpolate(item.desc)}</div></div><span class="ed-docs__arrow" data-v-c38fe334>→</span></a>`);
        });
        _push(`<!--]--><a${ssrRenderAttr("href", col.cta)} class="ed-docs__cta" data-v-c38fe334>View full ${ssrInterpolate(col.ctaLabel)} docs →</a></div>`);
      });
      _push(`<!--]--></div><a href="/tech/api-specs/" class="ed-docs__specs" data-v-c38fe334><div class="ed-docs__specs-text" data-v-c38fe334><div class="ed-docs__specs-label" data-v-c38fe334>OpenAPI YAML specs</div><div class="ed-docs__specs-title" data-v-c38fe334>Browse the full API specifications</div><div class="ed-docs__specs-sub" data-v-c38fe334> Every endpoint, schema, and example — the OpenAPI specs that define UAE Open Finance. </div></div><span class="ed-docs__specs-cta" data-v-c38fe334>View API specs <span data-v-c38fe334>→</span></span></a></div></section><section class="ed-section" data-v-c38fe334><div class="ed-section__inner" data-v-c38fe334><header class="ed-section__head" data-v-c38fe334><div class="ed-section__head-left" data-v-c38fe334><span class="ed-section__mark ed-section__mark--navy" data-v-c38fe334>§ 03</span><h2 class="ed-section__title" data-v-c38fe334> The<br data-v-c38fe334>programme. </h2></div><p class="ed-section__intro" data-v-c38fe334> Everything beyond the specs — how to get help, what it costs, the policies you operate under, and who’s already live in the ecosystem. </p></header><div class="ed-program" data-v-c38fe334><!--[-->`);
      ssrRenderList(programCards, (card) => {
        _push(`<a${ssrRenderAttr("href", card.url)} class="ed-program-card" style="${ssrRenderStyle({ "--card-color": card.color })}" data-v-c38fe334><span class="ed-program-card__top" style="${ssrRenderStyle({ background: card.color })}" data-v-c38fe334></span><div class="ed-program-card__meta" data-v-c38fe334><span class="ed-program-card__cat" style="${ssrRenderStyle({ color: card.color })}" data-v-c38fe334>${ssrInterpolate(card.category)}</span></div><h3 class="ed-program-card__title" data-v-c38fe334>${card.title ?? ""}</h3><p class="ed-program-card__desc" data-v-c38fe334>${card.desc ?? ""}</p>`);
        if (card.tags && card.tags.length) {
          _push(`<div class="ed-program-card__tags" data-v-c38fe334><!--[-->`);
          ssrRenderList(card.tags, (tag) => {
            _push(`<span class="ed-program-card__tag" style="${ssrRenderStyle({ background: programTagBg(card.color), color: card.color })}" data-v-c38fe334>${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="ed-program-card__foot" data-v-c38fe334><span class="ed-program-card__cta" data-v-c38fe334>Open section</span><span class="ed-program-card__arrow" style="${ssrRenderStyle({ color: card.color })}" data-v-c38fe334>→</span></div></a>`);
      });
      _push(`<!--]--></div></div></section><section class="ed-section ed-section--paper" data-v-c38fe334><div class="ed-section__inner" data-v-c38fe334><header class="ed-section__head" data-v-c38fe334><div class="ed-section__head-left" data-v-c38fe334><span class="ed-section__mark ed-section__mark--navy" data-v-c38fe334>§ 04</span><h2 class="ed-section__title" data-v-c38fe334> Community<br data-v-c38fe334><span class="ed-section__title-italic" data-v-c38fe334>&amp;</span> contributions. </h2></div><p class="ed-section__intro" data-v-c38fe334> This site is community-driven and open source — built by the LFIs, TPPs, and Hub operator working within the ecosystem. Every contribution makes the framework more legible for everyone. </p></header><div class="ed-community__grid" data-v-c38fe334><div class="ed-community__card" data-v-c38fe334><div class="ed-community__card-head" data-v-c38fe334><div class="ed-community__kicker ed-community__kicker--teal" data-v-c38fe334> github · nebras-open-finance </div><h3 class="ed-community__card-title" data-v-c38fe334>Contribute to docs &amp; standards</h3></div><div class="ed-community__stats" data-v-c38fe334><!--[-->`);
      ssrRenderList(communityStatRows.value, (s) => {
        _push(`<div class="ed-community__stat" data-v-c38fe334><div class="ed-community__stat-label" data-v-c38fe334>${ssrInterpolate(s.label)}</div><div class="ed-community__stat-value" data-v-c38fe334>${ssrInterpolate(s.value)}</div></div>`);
      });
      _push(`<!--]--></div><a${ssrRenderAttr("href", `https://github.com/${communityOrg}`)} class="ed-community__link ed-community__link--teal" target="_blank" rel="noopener" data-v-c38fe334> View on GitHub <span data-v-c38fe334>→</span></a></div><div class="ed-community__card" data-v-c38fe334><div class="ed-community__card-head" data-v-c38fe334><div class="ed-community__kicker ed-community__kicker--blue" data-v-c38fe334>drafting</div><h3 class="ed-community__card-title" data-v-c38fe334>What’s next…</h3></div><div class="ed-community__list" data-v-c38fe334><!--[-->`);
      ssrRenderList(communityDrafts, (d, i) => {
        _push(`<div class="ed-community__item" data-v-c38fe334><div class="ed-community__item-num ed-community__item-num--blue" data-v-c38fe334>0${ssrInterpolate(i + 1)}</div><div data-v-c38fe334><div class="ed-community__item-title" data-v-c38fe334>${ssrInterpolate(d.title)}</div><div class="ed-community__item-desc" data-v-c38fe334>${ssrInterpolate(d.desc)}</div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="ed-community__card ed-community__card--accent" data-v-c38fe334><div class="ed-community__card-head" data-v-c38fe334><div class="ed-community__kicker ed-community__kicker--gold" data-v-c38fe334>get involved</div><h3 class="ed-community__card-title" data-v-c38fe334>How to participate</h3></div><div class="ed-community__list" data-v-c38fe334><!--[-->`);
      ssrRenderList(communityWays, (w, i) => {
        _push(`<div class="ed-community__item" data-v-c38fe334><div class="ed-community__item-num ed-community__item-num--gold" data-v-c38fe334>0${ssrInterpolate(i + 1)}</div><div data-v-c38fe334><div class="ed-community__item-title" data-v-c38fe334>${ssrInterpolate(w.title)}</div><div class="ed-community__item-desc" data-v-c38fe334>${ssrInterpolate(w.desc)}</div></div></div>`);
      });
      _push(`<!--]--></div></div></div><a${ssrRenderAttr("href", `mailto:${SUPPORT_EMAIL}`)} class="ed-community__reachout" data-v-c38fe334><div class="ed-community__reachout-text" data-v-c38fe334><div class="ed-community__reachout-label" data-v-c38fe334>First time here?</div><div class="ed-community__reachout-title" data-v-c38fe334> Not sure how to get started? No worries — just ask. </div><div class="ed-community__reachout-sub" data-v-c38fe334> Email <span class="ed-community__reachout-email" data-v-c38fe334>${ssrInterpolate(SUPPORT_EMAIL)}</span> and we’ll point you in the right direction. </div></div><span class="ed-community__reachout-cta" data-v-c38fe334>Email us <span data-v-c38fe334>→</span></span></a></div></section><section class="ed-section" data-v-c38fe334><div class="ed-section__inner" data-v-c38fe334><header class="ed-section__head" data-v-c38fe334><div class="ed-section__head-left" data-v-c38fe334><span class="ed-section__mark ed-section__mark--blue" data-v-c38fe334>§ 05</span><h2 class="ed-section__title" data-v-c38fe334> Articles<br data-v-c38fe334><span class="ed-section__title-italic" data-v-c38fe334>&amp;</span> press. </h2></div><p class="ed-section__intro" data-v-c38fe334> Coverage of AlTareq across the region’s financial press, and from the ecosystem participants themselves. </p></header>`);
      if (featuredArticle.value) {
        _push(`<div class="ed-articles" data-v-c38fe334>`);
        _push(ssrRenderComponent(_component_ArticleLink, {
          variant: "feature",
          link: featuredArticle.value.link,
          title: featuredArticle.value.title,
          date: featuredArticle.value.dateLabel,
          text: featuredArticle.value.text,
          "image-src": featuredArticle.value.imageSrc,
          kind: unref(kindLabels)[featuredArticle.value.kind],
          source: featuredArticle.value.source
        }, null, _parent));
        _push(`<!--[-->`);
        ssrRenderList(sidebarArticles.value, (a) => {
          _push(ssrRenderComponent(_component_ArticleLink, {
            key: a.id,
            variant: "compact",
            link: a.link,
            title: a.title,
            date: a.dateLabel,
            text: a.text,
            "image-src": a.imageSrc,
            kind: unref(kindLabels)[a.kind],
            source: a.source
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="ed-articles-grid" data-v-c38fe334><!--[-->`);
      ssrRenderList(bodyArticles.value, (a) => {
        _push(ssrRenderComponent(_component_ArticleLink, {
          key: a.id,
          link: a.link,
          title: a.title,
          date: a.dateLabel,
          text: a.text,
          "image-src": a.imageSrc,
          kind: unref(kindLabels)[a.kind],
          source: a.source
        }, null, _parent));
      });
      _push(`<!--]--></div><a href="/news" class="ed-more-link" data-v-c38fe334> All articles <span data-v-c38fe334>→</span></a></div></section></div>`);
    };
  }
});
const block0 = {};
if (typeof block0 === "function") block0(_sfc_main$b);
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __pages_import_973__ = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-c38fe334"]]);
const __pages_import_0__ = () => import("./assets/user-journeys-DiJ_5Azg.js");
const __pages_import_1__ = () => import("./assets/requirements-Tzznf-W0.js");
const __pages_import_2__ = () => import("./assets/api-guide-dtz6HSw5.js");
const __pages_import_3__ = () => import("./assets/user-journeys-a3T6dNXO.js");
const __pages_import_4__ = () => import("./assets/requirements-JM1pU6e-.js");
const __pages_import_5__ = () => import("./assets/api-guide-DtXBk3JM.js");
const __pages_import_6__ = () => import("./assets/user-journeys-Bh5aupNQ.js");
const __pages_import_7__ = () => import("./assets/requirements-DfGOf_JF.js");
const __pages_import_8__ = () => import("./assets/api-guide-CbwRGhiE.js");
const __pages_import_9__ = () => import("./assets/user-journeys-Du5yMDTK.js");
const __pages_import_10__ = () => import("./assets/requirements-PBhWUny-.js");
const __pages_import_11__ = () => import("./assets/api-guide-DVLvjKr6.js");
const __pages_import_12__ = () => import("./assets/user-journeys-DEQzwf6g.js");
const __pages_import_13__ = () => import("./assets/requirements-D6MPWIjH.js");
const __pages_import_14__ = () => import("./assets/api-guide-DdqXGfvT.js");
const __pages_import_15__ = () => import("./assets/user-journeys-BerfDokZ.js");
const __pages_import_16__ = () => import("./assets/requirements-CXzzgiLB.js");
const __pages_import_17__ = () => import("./assets/api-guide-BI8dJYbw.js");
const __pages_import_18__ = () => import("./assets/user-journeys-DC5Ofx9O.js");
const __pages_import_19__ = () => import("./assets/requirements-Dte_ZGfk.js");
const __pages_import_20__ = () => import("./assets/api-guide-DKz7FDdj.js");
const __pages_import_21__ = () => import("./assets/user-journeys-ZD11TUjT.js");
const __pages_import_22__ = () => import("./assets/requirements-BvlW973j.js");
const __pages_import_23__ = () => import("./assets/api-guide-DcyMm0dK.js");
const __pages_import_24__ = () => import("./assets/user-journeys-EojMR7Qn.js");
const __pages_import_25__ = () => import("./assets/requirements-BzhnYfS2.js");
const __pages_import_26__ = () => import("./assets/api-guide-DgQqW8Mf.js");
const __pages_import_27__ = () => import("./assets/user-journeys-ChzSELyU.js");
const __pages_import_28__ = () => import("./assets/requirements-B0fHj_6x.js");
const __pages_import_29__ = () => import("./assets/api-guide-B2fNlvoB.js");
const __pages_import_30__ = () => import("./assets/user-journeys-jGE-BLI_.js");
const __pages_import_31__ = () => import("./assets/requirements-xWKZlrxh.js");
const __pages_import_32__ = () => import("./assets/api-guide-DcrCmCeq.js");
const __pages_import_33__ = () => import("./assets/user-journeys-BwppVNnj.js");
const __pages_import_34__ = () => import("./assets/requirements-CDym7I3A.js");
const __pages_import_35__ = () => import("./assets/api-guide-D9Ch-kCj.js");
const __pages_import_36__ = () => import("./assets/user-journeys-DTakZ4U1.js");
const __pages_import_37__ = () => import("./assets/requirements-DOPcFx10.js");
const __pages_import_38__ = () => import("./assets/api-guide-Be2o9zNB.js");
const __pages_import_39__ = () => import("./assets/user-journeys-CLJiHIDR.js");
const __pages_import_40__ = () => import("./assets/requirements-BnCjhXwo.js");
const __pages_import_41__ = () => import("./assets/api-guide-C3H0NBtD.js");
const __pages_import_42__ = () => import("./assets/user-journeys-CzfwuH6G.js");
const __pages_import_43__ = () => import("./assets/requirements-cMbhEMiR.js");
const __pages_import_44__ = () => import("./assets/api-guide-h7D0T7kx.js");
const __pages_import_45__ = () => import("./assets/user-journeys-DPHBa6Hl.js");
const __pages_import_46__ = () => import("./assets/requirements-Cg6jfc-U.js");
const __pages_import_47__ = () => import("./assets/api-guide-DFz9x3r-.js");
const __pages_import_48__ = () => import("./assets/user-journeys-D2ybLzAE.js");
const __pages_import_49__ = () => import("./assets/requirements-D0ovCqZE.js");
const __pages_import_50__ = () => import("./assets/api-guide-MQH9xzl6.js");
const __pages_import_51__ = () => import("./assets/user-journeys-Dxw1DoJU.js");
const __pages_import_52__ = () => import("./assets/requirements--QusXsbt.js");
const __pages_import_53__ = () => import("./assets/api-guide-DV9uOOEW.js");
const __pages_import_54__ = () => import("./assets/user-journeys-_Pi_7TxS.js");
const __pages_import_55__ = () => import("./assets/requirements-Dke7q3cj.js");
const __pages_import_56__ = () => import("./assets/api-guide-BpaBfe48.js");
const __pages_import_57__ = () => import("./assets/user-journeys-WHukUxae.js");
const __pages_import_58__ = () => import("./assets/requirements-DCav1iEe.js");
const __pages_import_59__ = () => import("./assets/api-guide-DkTaTDvz.js");
const __pages_import_60__ = () => import("./assets/user-journeys-3228U1fM.js");
const __pages_import_61__ = () => import("./assets/requirements-DgYDT7p7.js");
const __pages_import_62__ = () => import("./assets/api-guide-f63WSeST.js");
const __pages_import_63__ = () => import("./assets/user-journeys-pXI0hwWP.js");
const __pages_import_64__ = () => import("./assets/requirements-Drf1qqmd.js");
const __pages_import_65__ = () => import("./assets/api-guide-BQWC5dhJ.js");
const __pages_import_66__ = () => import("./assets/user-journeys-DuEU6TbQ.js");
const __pages_import_67__ = () => import("./assets/requirements-Cuo2RnyQ.js");
const __pages_import_68__ = () => import("./assets/api-guide-CfEf3H_w.js");
const __pages_import_69__ = () => import("./assets/user-journeys-UDf0xOUm.js");
const __pages_import_70__ = () => import("./assets/requirements-CC3x5z6R.js");
const __pages_import_71__ = () => import("./assets/api-guide-D03NjdXV.js");
const __pages_import_72__ = () => import("./assets/user-journeys-B417ahvE.js");
const __pages_import_73__ = () => import("./assets/requirements-D28caPr9.js");
const __pages_import_74__ = () => import("./assets/api-guide-BK8wA9cN.js");
const __pages_import_75__ = () => import("./assets/user-journeys--okaHpJx.js");
const __pages_import_76__ = () => import("./assets/requirements-CvbPLPt_.js");
const __pages_import_77__ = () => import("./assets/api-guide-0UPAMQ1m.js");
const __pages_import_78__ = () => import("./assets/user-journeys-BWDzkr-C.js");
const __pages_import_79__ = () => import("./assets/requirements-nlvC0b7h.js");
const __pages_import_80__ = () => import("./assets/api-guide-DTM4svJl.js");
const __pages_import_81__ = () => import("./assets/user-journeys-BtOgVAAk.js");
const __pages_import_82__ = () => import("./assets/requirements-DyIOTeHt.js");
const __pages_import_83__ = () => import("./assets/api-guide-EHxSWAoO.js");
const __pages_import_84__ = () => import("./assets/pii-payments-DmosDOug.js");
const __pages_import_85__ = () => import("./assets/pii-par-dq3YtkuG.js");
const __pages_import_86__ = () => import("./assets/user-journeys-DZfzqYut.js");
const __pages_import_87__ = () => import("./assets/requirements--X9EkFPU.js");
const __pages_import_88__ = () => import("./assets/api-guide-CVXotVn6.js");
const __pages_import_89__ = () => import("./assets/payment-status-DKDM0qLE.js");
const __pages_import_90__ = () => import("./assets/pii-payments-Budu_3iw.js");
const __pages_import_91__ = () => import("./assets/pii-par-vm1WD1cP.js");
const __pages_import_92__ = () => import("./assets/user-journeys-BSK-WCqo.js");
const __pages_import_93__ = () => import("./assets/requirements-DPyUGrGb.js");
const __pages_import_94__ = () => import("./assets/api-guide-t-OhoX4R.js");
const __pages_import_95__ = () => import("./assets/payment-status-Cbg3nRMN.js");
const __pages_import_96__ = () => import("./assets/pii-payments-XULWr0q5.js");
const __pages_import_97__ = () => import("./assets/pii-par-DYMK5Cng.js");
const __pages_import_98__ = () => import("./assets/verify-tpp-signature-PQYs-MNl.js");
const __pages_import_99__ = () => import("./assets/decrypt-pii-5JKLHlwZ.js");
const __pages_import_100__ = () => import("./assets/user-journeys-JozQdyVI.js");
const __pages_import_101__ = () => import("./assets/requirements-COiuWUrR.js");
const __pages_import_102__ = () => import("./assets/api-guide-DGuqKRwJ.js");
const __pages_import_103__ = () => import("./assets/payment-status-ChGvFzYN.js");
const __pages_import_104__ = () => import("./assets/pii-payments-DsrwogWj.js");
const __pages_import_105__ = () => import("./assets/pii-par-bpQxWcTe.js");
const __pages_import_106__ = () => import("./assets/verify-tpp-signature-CHwg8vaf.js");
const __pages_import_107__ = () => import("./assets/decrypt-pii-C-HtoWGH.js");
const __pages_import_108__ = () => import("./assets/user-journeys-DGZQ5ufU.js");
const __pages_import_109__ = () => import("./assets/requirements-l0CUKGPv.js");
const __pages_import_110__ = () => import("./assets/api-guide-BoBPSdp0.js");
const __pages_import_111__ = () => import("./assets/payment-status-7qSuUj73.js");
const __pages_import_112__ = () => import("./assets/travel-insurance-quotes-DFBEpFj5.js");
const __pages_import_113__ = () => import("./assets/renters-insurance-quotes-Bj7-A8G0.js");
const __pages_import_114__ = () => import("./assets/post-travel-insurance-policies-BwaqEhlR.js");
const __pages_import_115__ = () => import("./assets/post-renters-insurance-policies-CzXwhKfv.js");
const __pages_import_116__ = () => import("./assets/post-motor-insurance-policies-C6Qi_PAt.js");
const __pages_import_117__ = () => import("./assets/post-life-insurance-policies-SGtqxf7G.js");
const __pages_import_118__ = () => import("./assets/post-home-insurance-policies-DzN4oNmx.js");
const __pages_import_119__ = () => import("./assets/post-health-insurance-policies-BYlD9upz.js");
const __pages_import_120__ = () => import("./assets/post-employment-insurance-policies-BzJzyttc.js");
const __pages_import_121__ = () => import("./assets/patch-travel-insurance-quotes-QuoteId-BlQ6vKzT.js");
const __pages_import_122__ = () => import("./assets/patch-renters-insurance-quotes-QuoteId-C_KJH7D3.js");
const __pages_import_123__ = () => import("./assets/patch-motor-insurance-quotes-QuoteId-CFlRyob1.js");
const __pages_import_124__ = () => import("./assets/patch-life-insurance-quotes-QuoteId-BSqscA0E.js");
const __pages_import_125__ = () => import("./assets/patch-home-insurance-quotes-QuoteId-_m3NqCji.js");
const __pages_import_126__ = () => import("./assets/patch-health-insurance-quotes-QuoteId-Cn8XGow3.js");
const __pages_import_127__ = () => import("./assets/patch-employment-insurance-quotes-QuoteId-DHCc1xIp.js");
const __pages_import_128__ = () => import("./assets/motor-insurance-quotes-03KZdPF5.js");
const __pages_import_129__ = () => import("./assets/life-insurance-quotes-BqWFSFXF.js");
const __pages_import_130__ = () => import("./assets/home-insurance-quotes-0xdBi_Vh.js");
const __pages_import_131__ = () => import("./assets/health-insurance-quotes-CZTyds-P.js");
const __pages_import_132__ = () => import("./assets/get-travel-insurance-quotes-QuoteId-BkTIp9Wg.js");
const __pages_import_133__ = () => import("./assets/get-renters-insurance-quotes-QuoteId-BdPkuo4H.js");
const __pages_import_134__ = () => import("./assets/get-motor-insurance-quotes-QuoteId-B9K9xs_l.js");
const __pages_import_135__ = () => import("./assets/get-life-insurance-quotes-QuoteId-Dge7i9nD.js");
const __pages_import_136__ = () => import("./assets/get-home-insurance-quotes-QuoteId-CLjLUHI7.js");
const __pages_import_137__ = () => import("./assets/get-health-insurance-quotes-QuoteId-CAo1q9aR.js");
const __pages_import_138__ = () => import("./assets/get-employment-insurance-quotes-QuoteId-oBNRrHH8.js");
const __pages_import_139__ = () => import("./assets/employment-insurance-quotes-BLaX6nyi.js");
const __pages_import_140__ = () => import("./assets/tpp-led-cE8pzFGf.js");
const __pages_import_141__ = () => import("./assets/lfi-led-BbKppbTj.js");
const __pages_import_142__ = () => import("./assets/index-CA185fGY.js");
const __pages_import_143__ = () => import("./assets/travel-insurance-policies-BXJ8G-lk.js");
const __pages_import_144__ = () => import("./assets/travel-insurance-policies-InsurancePolicyId-C4mZt2Yg.js");
const __pages_import_145__ = () => import("./assets/renters-insurance-policies-CxrT9Y4s.js");
const __pages_import_146__ = () => import("./assets/renters-insurance-policies-InsurancePolicyId-Dx52jbph.js");
const __pages_import_147__ = () => import("./assets/motor-insurance-policies-CyNfYG74.js");
const __pages_import_148__ = () => import("./assets/motor-insurance-policies-InsurancePolicyId-BOrHOdGB.js");
const __pages_import_149__ = () => import("./assets/life-insurance-policies-CjiCslcS.js");
const __pages_import_150__ = () => import("./assets/life-insurance-policies-InsurancePolicyId-CnWNg0T8.js");
const __pages_import_151__ = () => import("./assets/home-insurance-policies-CVX9ccOT.js");
const __pages_import_152__ = () => import("./assets/home-insurance-policies-InsurancePolicyId-xqWVXxBB.js");
const __pages_import_153__ = () => import("./assets/health-insurance-policies-DsEGLde6.js");
const __pages_import_154__ = () => import("./assets/health-insurance-policies-InsurancePolicyId-DCotdNRN.js");
const __pages_import_155__ = () => import("./assets/employment-insurance-policies-DWZGHQLO.js");
const __pages_import_156__ = () => import("./assets/employment-insurance-policies-InsurancePolicyId-CsIiHJDn.js");
const __pages_import_157__ = () => import("./assets/premiums-BpHbEITk.js");
const __pages_import_158__ = () => import("./assets/index-Bj0Wv7B5.js");
const __pages_import_159__ = () => import("./assets/post-payment-consents-ConsentId-attestations-bNIOf4Pm.js");
const __pages_import_160__ = () => import("./assets/post-insurance-consents-ConsentId-attestations-ChvjEomq.js");
const __pages_import_161__ = () => import("./assets/post-account-access-consents-ConsentId-attestations-DGqO1NN_.js");
const __pages_import_162__ = () => import("./assets/get-payment-consents-ConsentId-attestations-YbOvh-NN.js");
const __pages_import_163__ = () => import("./assets/get-insurance-consents-ConsentId-attestations-CGLDOenO.js");
const __pages_import_164__ = () => import("./assets/get-account-access-consents-ConsentId-attestations-CMtQDZrg.js");
const __pages_import_165__ = () => import("./assets/user-experience-B0hSQJUR.js");
const __pages_import_166__ = () => import("./assets/requirements-q8UDWBSf.js");
const __pages_import_167__ = () => import("./assets/user-experience-CtsIG4aP.js");
const __pages_import_168__ = () => import("./assets/requirements-CBc2m9cD.js");
const __pages_import_169__ = () => import("./assets/user-experience-DCXnyqgG.js");
const __pages_import_170__ = () => import("./assets/requirements-Bi0_MNRx.js");
const __pages_import_171__ = () => import("./assets/requirements-B-YRC_Pr.js");
const __pages_import_172__ = () => import("./assets/api-guide-Doih1Phw.js");
const __pages_import_173__ = () => import("./assets/risk-BID4BEHU.js");
const __pages_import_174__ = () => import("./assets/index-B6qLZ_Cr.js");
const __pages_import_175__ = () => import("./assets/debtor-account-GcLMRAol.js");
const __pages_import_176__ = () => import("./assets/creditor-D6C8IXcy.js");
const __pages_import_177__ = () => import("./assets/payments-C3Qw36yz.js");
const __pages_import_178__ = () => import("./assets/payments-PaymentId-Ye3P9yi_.js");
const __pages_import_179__ = () => import("./assets/payments-idempotency-Bznk1cgg.js");
const __pages_import_180__ = () => import("./assets/payment-consents-ConsentId-refund-CAdAxEkZ.js");
const __pages_import_181__ = () => import("./assets/products-CRtm0fkB.js");
const __pages_import_182__ = () => import("./assets/leads-DKKfhlfy.js");
const __pages_import_183__ = () => import("./assets/parties-DjFMZtkN.js");
const __pages_import_184__ = () => import("./assets/accounts-Dxq2U_9D.js");
const __pages_import_185__ = () => import("./assets/accounts-AccountId-DpfTgP6J.js");
const __pages_import_186__ = () => import("./assets/accounts-AccountId-transactions-dmU8uChW.js");
const __pages_import_187__ = () => import("./assets/accounts-AccountId-statements-Di_UL0LQ.js");
const __pages_import_188__ = () => import("./assets/accounts-AccountId-standing-orders-CQWfIebI.js");
const __pages_import_189__ = () => import("./assets/accounts-AccountId-scheduled-payments-CLXls9gj.js");
const __pages_import_190__ = () => import("./assets/accounts-AccountId-product-u-nruPxc.js");
const __pages_import_191__ = () => import("./assets/accounts-AccountId-parties-C-sMV4_-.js");
const __pages_import_192__ = () => import("./assets/accounts-AccountId-direct-debits-CtgdV2Io.js");
const __pages_import_193__ = () => import("./assets/accounts-AccountId-beneficiaries-0KHMexLm.js");
const __pages_import_194__ = () => import("./assets/accounts-AccountId-balances-jTEk0eSo.js");
const __pages_import_195__ = () => import("./assets/pagination-CVMucgSM.js");
const __pages_import_196__ = () => import("./assets/index-Cfqs3xdn.js");
const __pages_import_197__ = () => import("./assets/finance-rates-6FT3Ls0z.js");
const __pages_import_198__ = () => import("./assets/discovery-QuxAb5io.js");
const __pages_import_199__ = () => import("./assets/confirmation-_iT92Cp8.js");
const __pages_import_200__ = () => import("./assets/atms-HyWgRPG1.js");
const __pages_import_201__ = () => import("./assets/travel-insurance-quotes-9NesHXL-.js");
const __pages_import_202__ = () => import("./assets/renters-insurance-quotes-CUJsP5Au.js");
const __pages_import_203__ = () => import("./assets/post-travel-insurance-policies-BqcW76lV.js");
const __pages_import_204__ = () => import("./assets/post-renters-insurance-policies-fQMaiMVT.js");
const __pages_import_205__ = () => import("./assets/post-motor-insurance-policies-APftQTrX.js");
const __pages_import_206__ = () => import("./assets/post-life-insurance-policies-DTSrdM5U.js");
const __pages_import_207__ = () => import("./assets/post-home-insurance-policies-Cd2K3MJs.js");
const __pages_import_208__ = () => import("./assets/post-health-insurance-policies-DRKCy9oQ.js");
const __pages_import_209__ = () => import("./assets/post-employment-insurance-policies-DKc-pyb5.js");
const __pages_import_210__ = () => import("./assets/patch-travel-insurance-quotes-QuoteId-CqcczpsK.js");
const __pages_import_211__ = () => import("./assets/patch-renters-insurance-quotes-QuoteId-QZe0flk3.js");
const __pages_import_212__ = () => import("./assets/patch-motor-insurance-quotes-QuoteId-BLqhIgKR.js");
const __pages_import_213__ = () => import("./assets/patch-life-insurance-quotes-QuoteId-DtszRMNe.js");
const __pages_import_214__ = () => import("./assets/patch-home-insurance-quotes-QuoteId-DHjzx1V1.js");
const __pages_import_215__ = () => import("./assets/patch-health-insurance-quotes-QuoteId-BjaVs5Zw.js");
const __pages_import_216__ = () => import("./assets/patch-employment-insurance-quotes-QuoteId-0p797yvq.js");
const __pages_import_217__ = () => import("./assets/motor-insurance-quotes-vksOHX5l.js");
const __pages_import_218__ = () => import("./assets/life-insurance-quotes-DYUT_A2I.js");
const __pages_import_219__ = () => import("./assets/home-insurance-quotes-D7FmhHwP.js");
const __pages_import_220__ = () => import("./assets/health-insurance-quotes-DIoAVylw.js");
const __pages_import_221__ = () => import("./assets/get-travel-insurance-quotes-QuoteId-CBOj1F6f.js");
const __pages_import_222__ = () => import("./assets/get-renters-insurance-quotes-QuoteId-BOsyQ0or.js");
const __pages_import_223__ = () => import("./assets/get-motor-insurance-quotes-QuoteId-CR6YKUnp.js");
const __pages_import_224__ = () => import("./assets/get-life-insurance-quotes-QuoteId-DXBBiUDj.js");
const __pages_import_225__ = () => import("./assets/get-home-insurance-quotes-QuoteId-D90LJ9z0.js");
const __pages_import_226__ = () => import("./assets/get-health-insurance-quotes-QuoteId-CwcJKd37.js");
const __pages_import_227__ = () => import("./assets/get-employment-insurance-quotes-QuoteId-BoIkg67a.js");
const __pages_import_228__ = () => import("./assets/employment-insurance-quotes-mEqHsTQG.js");
const __pages_import_229__ = () => import("./assets/tpp-led-BFBbm_-D.js");
const __pages_import_230__ = () => import("./assets/lfi-led-IbkeEh60.js");
const __pages_import_231__ = () => import("./assets/index-DUmkRavj.js");
const __pages_import_232__ = () => import("./assets/travel-insurance-policies-BHi4s-35.js");
const __pages_import_233__ = () => import("./assets/travel-insurance-policies-InsurancePolicyId-BCIka9YJ.js");
const __pages_import_234__ = () => import("./assets/renters-insurance-policies-DbrBlJlB.js");
const __pages_import_235__ = () => import("./assets/renters-insurance-policies-InsurancePolicyId-Bd_Q8X3m.js");
const __pages_import_236__ = () => import("./assets/motor-insurance-policies-CRo3eQki.js");
const __pages_import_237__ = () => import("./assets/motor-insurance-policies-InsurancePolicyId-CDTKu7K0.js");
const __pages_import_238__ = () => import("./assets/life-insurance-policies-D3EnOg7I.js");
const __pages_import_239__ = () => import("./assets/life-insurance-policies-InsurancePolicyId-DLf3oUx-.js");
const __pages_import_240__ = () => import("./assets/home-insurance-policies-dhnow8fl.js");
const __pages_import_241__ = () => import("./assets/home-insurance-policies-InsurancePolicyId-CsEzlZmw.js");
const __pages_import_242__ = () => import("./assets/health-insurance-policies-C2tDY4qW.js");
const __pages_import_243__ = () => import("./assets/health-insurance-policies-InsurancePolicyId-CnGJjecF.js");
const __pages_import_244__ = () => import("./assets/employment-insurance-policies-DvxQOM2o.js");
const __pages_import_245__ = () => import("./assets/employment-insurance-policies-InsurancePolicyId-CZf1RdEm.js");
const __pages_import_246__ = () => import("./assets/premiums-CGIPu1A3.js");
const __pages_import_247__ = () => import("./assets/index-DBcT7gS_.js");
const __pages_import_248__ = () => import("./assets/user-experience-BzsbP5Y_.js");
const __pages_import_249__ = () => import("./assets/requirements-Bdnl5Kjo.js");
const __pages_import_250__ = () => import("./assets/user-experience-D48JNLdz.js");
const __pages_import_251__ = () => import("./assets/requirements-C1nDmz6g.js");
const __pages_import_252__ = () => import("./assets/user-experience-0vW4HzZj.js");
const __pages_import_253__ = () => import("./assets/requirements-CYJ7vMAt.js");
const __pages_import_254__ = () => import("./assets/requirements-itNk8U18.js");
const __pages_import_255__ = () => import("./assets/api-guide-fV5P6XFQ.js");
const __pages_import_256__ = () => import("./assets/risk-BEq9KWW3.js");
const __pages_import_257__ = () => import("./assets/index-CfJozEhq.js");
const __pages_import_258__ = () => import("./assets/debtor-account-C8qcHoTO.js");
const __pages_import_259__ = () => import("./assets/creditor-DQ1uFnfX.js");
const __pages_import_260__ = () => import("./assets/payments-DXkKcex1.js");
const __pages_import_261__ = () => import("./assets/payments-PaymentId-DKRBTS3U.js");
const __pages_import_262__ = () => import("./assets/payments-idempotency-B1jHEe4Z.js");
const __pages_import_263__ = () => import("./assets/payment-consents-ConsentId-refund-B-g1pEGB.js");
const __pages_import_264__ = () => import("./assets/products-sjcFW8dC.js");
const __pages_import_265__ = () => import("./assets/leads-Dya4JaQu.js");
const __pages_import_266__ = () => import("./assets/parties-BVj97H0Y.js");
const __pages_import_267__ = () => import("./assets/accounts-B-mtaB3y.js");
const __pages_import_268__ = () => import("./assets/accounts-AccountId-DszGvjyO.js");
const __pages_import_269__ = () => import("./assets/accounts-AccountId-transactions-BZbgy9Qt.js");
const __pages_import_270__ = () => import("./assets/accounts-AccountId-statements-1WkU2vyA.js");
const __pages_import_271__ = () => import("./assets/accounts-AccountId-standing-orders-DOC0IW_-.js");
const __pages_import_272__ = () => import("./assets/accounts-AccountId-scheduled-payments-CoQ0gCu5.js");
const __pages_import_273__ = () => import("./assets/accounts-AccountId-product-BlKMvrrn.js");
const __pages_import_274__ = () => import("./assets/accounts-AccountId-parties-B95aLZ79.js");
const __pages_import_275__ = () => import("./assets/accounts-AccountId-direct-debits-CBF2LP_T.js");
const __pages_import_276__ = () => import("./assets/accounts-AccountId-beneficiaries-Cq0kzne2.js");
const __pages_import_277__ = () => import("./assets/accounts-AccountId-balances-Hk6VWDkE.js");
const __pages_import_278__ = () => import("./assets/pagination-BHMwAfeL.js");
const __pages_import_279__ = () => import("./assets/index-DDnxbnY6.js");
const __pages_import_280__ = () => import("./assets/finance-rates-uQ9bFeLk.js");
const __pages_import_281__ = () => import("./assets/discovery-DML4CgLh.js");
const __pages_import_282__ = () => import("./assets/confirmation-CU3sNDoe.js");
const __pages_import_283__ = () => import("./assets/atms-Cp3icBOW.js");
const __pages_import_284__ = () => import("./assets/submission-CBj2h-Xe.js");
const __pages_import_285__ = () => import("./assets/index-r6-N0TMD.js");
const __pages_import_286__ = () => import("./assets/submission-mwEzEer-.js");
const __pages_import_287__ = () => import("./assets/index-CDWvD5OH.js");
const __pages_import_288__ = () => import("./assets/submission-Vo-KoBrR.js");
const __pages_import_289__ = () => import("./assets/index-OY41oKl4.js");
const __pages_import_290__ = () => import("./assets/submission-Bz74Xwik.js");
const __pages_import_291__ = () => import("./assets/index-_ea7RlcT.js");
const __pages_import_292__ = () => import("./assets/travel-insurance-quotes-BSNj6emC.js");
const __pages_import_293__ = () => import("./assets/renters-insurance-quotes-0qquYJOZ.js");
const __pages_import_294__ = () => import("./assets/post-travel-insurance-policies-0kDXKr2Z.js");
const __pages_import_295__ = () => import("./assets/post-renters-insurance-policies-DWBPGeRd.js");
const __pages_import_296__ = () => import("./assets/post-motor-insurance-policies-B1W4Xh6X.js");
const __pages_import_297__ = () => import("./assets/post-life-insurance-policies-BlQLenUb.js");
const __pages_import_298__ = () => import("./assets/post-home-insurance-policies-D5FFsYdl.js");
const __pages_import_299__ = () => import("./assets/post-health-insurance-policies-CkLO2tFC.js");
const __pages_import_300__ = () => import("./assets/post-employment-insurance-policies-B08qQcAk.js");
const __pages_import_301__ = () => import("./assets/patch-travel-insurance-quotes-QuoteId-BAqNNmXE.js");
const __pages_import_302__ = () => import("./assets/patch-renters-insurance-quotes-QuoteId-CEaFJ_v3.js");
const __pages_import_303__ = () => import("./assets/patch-motor-insurance-quotes-QuoteId-gJtgKpJ0.js");
const __pages_import_304__ = () => import("./assets/patch-life-insurance-quotes-QuoteId-B4W6R9Vl.js");
const __pages_import_305__ = () => import("./assets/patch-home-insurance-quotes-QuoteId-sWmdRHVi.js");
const __pages_import_306__ = () => import("./assets/patch-health-insurance-quotes-QuoteId-BKI9hCwe.js");
const __pages_import_307__ = () => import("./assets/patch-employment-insurance-quotes-QuoteId-C3_HA0f5.js");
const __pages_import_308__ = () => import("./assets/motor-insurance-quotes-9YIDhEhv.js");
const __pages_import_309__ = () => import("./assets/life-insurance-quotes-BDWcGpfc.js");
const __pages_import_310__ = () => import("./assets/home-insurance-quotes-C_O_suiA.js");
const __pages_import_311__ = () => import("./assets/health-insurance-quotes-dVgUQit3.js");
const __pages_import_312__ = () => import("./assets/get-travel-insurance-quotes-QuoteId-z6BE0kBS.js");
const __pages_import_313__ = () => import("./assets/get-renters-insurance-quotes-QuoteId-CbV6Inyb.js");
const __pages_import_314__ = () => import("./assets/get-motor-insurance-quotes-QuoteId-DkfT0NyM.js");
const __pages_import_315__ = () => import("./assets/get-life-insurance-quotes-QuoteId-BYHS0Cv-.js");
const __pages_import_316__ = () => import("./assets/get-home-insurance-quotes-QuoteId-D0ZvS7gA.js");
const __pages_import_317__ = () => import("./assets/get-health-insurance-quotes-QuoteId-NINdcXiW.js");
const __pages_import_318__ = () => import("./assets/get-employment-insurance-quotes-QuoteId-CbN5msuW.js");
const __pages_import_319__ = () => import("./assets/employment-insurance-quotes-BW4ihXI_.js");
const __pages_import_320__ = () => import("./assets/tpp-led-CV4GheNZ.js");
const __pages_import_321__ = () => import("./assets/lfi-led-DQ9QxUt8.js");
const __pages_import_322__ = () => import("./assets/index-CeAjXRhl.js");
const __pages_import_323__ = () => import("./assets/travel-insurance-policies-BuSXRvzC.js");
const __pages_import_324__ = () => import("./assets/travel-insurance-policies-InsurancePolicyId-D6H-EIBF.js");
const __pages_import_325__ = () => import("./assets/renters-insurance-policies-CUNnKBTs.js");
const __pages_import_326__ = () => import("./assets/renters-insurance-policies-InsurancePolicyId-PzKoVqVQ.js");
const __pages_import_327__ = () => import("./assets/motor-insurance-policies-B6BEooYb.js");
const __pages_import_328__ = () => import("./assets/motor-insurance-policies-InsurancePolicyId-DMdVXIvL.js");
const __pages_import_329__ = () => import("./assets/life-insurance-policies-B6I2QsXr.js");
const __pages_import_330__ = () => import("./assets/life-insurance-policies-InsurancePolicyId-NxmmGani.js");
const __pages_import_331__ = () => import("./assets/home-insurance-policies-8WA3msV4.js");
const __pages_import_332__ = () => import("./assets/home-insurance-policies-InsurancePolicyId-DvGmGiDi.js");
const __pages_import_333__ = () => import("./assets/health-insurance-policies-n4bAx7ei.js");
const __pages_import_334__ = () => import("./assets/health-insurance-policies-InsurancePolicyId-DTSVJNg6.js");
const __pages_import_335__ = () => import("./assets/employment-insurance-policies-CltZ9wdL.js");
const __pages_import_336__ = () => import("./assets/employment-insurance-policies-InsurancePolicyId-5A5ajc5Q.js");
const __pages_import_337__ = () => import("./assets/premiums-FmAVcOyo.js");
const __pages_import_338__ = () => import("./assets/index-C9PCKcYb.js");
const __pages_import_339__ = () => import("./assets/requirements-m5fUo2jB.js");
const __pages_import_340__ = () => import("./assets/api-guide-D6FtVtca.js");
const __pages_import_341__ = () => import("./assets/index-e8j0m15l.js");
const __pages_import_342__ = () => import("./assets/debtor-account-Bjyx2kad.js");
const __pages_import_343__ = () => import("./assets/creditor-CaPzPnl6.js");
const __pages_import_344__ = () => import("./assets/payments-D_iK_g2u.js");
const __pages_import_345__ = () => import("./assets/payments-PaymentId-A-64qLnB.js");
const __pages_import_346__ = () => import("./assets/payment-consents-ConsentId-refund-8lt6Om1m.js");
const __pages_import_347__ = () => import("./assets/payment-consents-ConsentId-refund-C41S63Qe.js");
const __pages_import_348__ = () => import("./assets/products-B5NrzBOl.js");
const __pages_import_349__ = () => import("./assets/leads-BA9xZRE4.js");
const __pages_import_350__ = () => import("./assets/products-9flRT7vi.js");
const __pages_import_351__ = () => import("./assets/leads-KYQ6toXU.js");
const __pages_import_352__ = () => import("./assets/customer-D20M-Fhs.js");
const __pages_import_353__ = () => import("./assets/accounts-DasRLS5K.js");
const __pages_import_354__ = () => import("./assets/accounts-AccountId-DWxYSJnJ.js");
const __pages_import_355__ = () => import("./assets/accounts-AccountId-transactions-C7cSJPWt.js");
const __pages_import_356__ = () => import("./assets/accounts-AccountId-statements-BFBZ2_qS.js");
const __pages_import_357__ = () => import("./assets/accounts-AccountId-standing-orders-DBcKfKUE.js");
const __pages_import_358__ = () => import("./assets/accounts-AccountId-scheduled-payments-_uoLMNle.js");
const __pages_import_359__ = () => import("./assets/accounts-AccountId-products-DxY3HSOA.js");
const __pages_import_360__ = () => import("./assets/accounts-AccountId-direct-debits-Hl4SMr64.js");
const __pages_import_361__ = () => import("./assets/accounts-AccountId-customer-Bh4eLf-l.js");
const __pages_import_362__ = () => import("./assets/accounts-AccountId-beneficiaries-D5T4Me_z.js");
const __pages_import_363__ = () => import("./assets/accounts-AccountId-balances-B18Cz0RY.js");
const __pages_import_364__ = () => import("./assets/customer-65zvJTef.js");
const __pages_import_365__ = () => import("./assets/accounts-D-FI0Bik.js");
const __pages_import_366__ = () => import("./assets/accounts-AccountId-Bp1EnP6w.js");
const __pages_import_367__ = () => import("./assets/accounts-AccountId-transactions-Bg6NLK8e.js");
const __pages_import_368__ = () => import("./assets/accounts-AccountId-statements-ZrmMNyjg.js");
const __pages_import_369__ = () => import("./assets/accounts-AccountId-standing-orders-BpVXs96e.js");
const __pages_import_370__ = () => import("./assets/accounts-AccountId-scheduled-payments-BdXxQe9V.js");
const __pages_import_371__ = () => import("./assets/accounts-AccountId-products-FoI5SWxi.js");
const __pages_import_372__ = () => import("./assets/accounts-AccountId-direct-debits-ChM7GPfw.js");
const __pages_import_373__ = () => import("./assets/accounts-AccountId-customer-CT2VMpeP.js");
const __pages_import_374__ = () => import("./assets/accounts-AccountId-beneficiaries-9Qgf20QD.js");
const __pages_import_375__ = () => import("./assets/accounts-AccountId-balances-CNiG9m4j.js");
const __pages_import_376__ = () => import("./assets/pagination-Dt2G-QKz.js");
const __pages_import_377__ = () => import("./assets/index-Cv2VRVAC.js");
const __pages_import_378__ = () => import("./assets/finance-rates-HvUz317j.js");
const __pages_import_379__ = () => import("./assets/cop-query-C-RehIIX.js");
const __pages_import_380__ = () => import("./assets/atm-BM7rP6rH.js");
const __pages_import_381__ = () => import("./assets/atm-Bi9ElAGX.js");
const __pages_import_382__ = () => import("./assets/ozone-connect-url-dShhCxjZ.js");
const __pages_import_383__ = () => import("./assets/index-DnDt-JMQ.js");
const __pages_import_384__ = () => import("./assets/certificate-walkthroughs-CZUhOqCk.js");
const __pages_import_385__ = () => import("./assets/auth-endpoint-e-IQo3_Z.js");
const __pages_import_386__ = () => import("./assets/mtls-server-BTeip0Fo.js");
const __pages_import_387__ = () => import("./assets/mtls-client-BozXUmPv.js");
const __pages_import_388__ = () => import("./assets/jwt-server-i2l9i0fP.js");
const __pages_import_389__ = () => import("./assets/jwt-client-BEQjgk3S.js");
const __pages_import_390__ = () => import("./assets/hello-mtls-DpuYYFn9.js");
const __pages_import_391__ = () => import("./assets/auth-DtEG23o_.js");
const __pages_import_392__ = () => import("./assets/auth-interactionId-doFail-nlUyQK-2.js");
const __pages_import_393__ = () => import("./assets/auth-interactionId-doConfirm-DQpnHULh.js");
const __pages_import_394__ = () => import("./assets/psu-userId-consents-BPo3bpgJ.js");
const __pages_import_395__ = () => import("./assets/payment-log-c9QcKrwp.js");
const __pages_import_396__ = () => import("./assets/payment-log-id-DdXX8q6o.js");
const __pages_import_397__ = () => import("./assets/patch-consents-consentId-D5OtKnQA.js");
const __pages_import_398__ = () => import("./assets/insurance-quote-log-logId-D42w_42y.js");
const __pages_import_399__ = () => import("./assets/hello-mtls-CB_4CIcm.js");
const __pages_import_400__ = () => import("./assets/consents-BFIEpji2.js");
const __pages_import_401__ = () => import("./assets/consents-consentId-Bk8HaswB.js");
const __pages_import_402__ = () => import("./assets/consents-consentId-audit-CymsVeVS.js");
const __pages_import_403__ = () => import("./assets/consents-consentId-action-revoke-D3djuQXr.js");
const __pages_import_404__ = () => import("./assets/consent-groups-consentGroupId-consents-DpoGceeG.js");
const __pages_import_405__ = () => import("./assets/consent-groups-consentGroupId-consents-action-revoke-XOEMtvha.js");
const __pages_import_406__ = () => import("./assets/accounts-accountId-consents-D6LkdhUp.js");
const __pages_import_407__ = () => import("./assets/travel-insurance-quotes-CVM_kxjk.js");
const __pages_import_408__ = () => import("./assets/renters-insurance-quotes-DCG__bHH.js");
const __pages_import_409__ = () => import("./assets/post-travel-insurance-policies-CWq301eN.js");
const __pages_import_410__ = () => import("./assets/post-renters-insurance-policies-cajlU8Sm.js");
const __pages_import_411__ = () => import("./assets/post-motor-insurance-policies-Ci76fYux.js");
const __pages_import_412__ = () => import("./assets/post-life-insurance-policies-0wtbtaMZ.js");
const __pages_import_413__ = () => import("./assets/post-home-insurance-policies-CAAwnoxO.js");
const __pages_import_414__ = () => import("./assets/post-health-insurance-policies-B4pHneN5.js");
const __pages_import_415__ = () => import("./assets/post-employment-insurance-policies-CFY4kOlP.js");
const __pages_import_416__ = () => import("./assets/patch-travel-insurance-quotes-QuoteId-D9MinFEW.js");
const __pages_import_417__ = () => import("./assets/patch-renters-insurance-quotes-QuoteId-DnReAgUx.js");
const __pages_import_418__ = () => import("./assets/patch-motor-insurance-quotes-QuoteId-DNlDYnO6.js");
const __pages_import_419__ = () => import("./assets/patch-life-insurance-quotes-QuoteId-CEkfaoAf.js");
const __pages_import_420__ = () => import("./assets/patch-home-insurance-quotes-QuoteId-JDm59ZVD.js");
const __pages_import_421__ = () => import("./assets/patch-health-insurance-quotes-QuoteId-M1EWip_d.js");
const __pages_import_422__ = () => import("./assets/patch-employment-insurance-quotes-QuoteId-p9710_Zm.js");
const __pages_import_423__ = () => import("./assets/motor-insurance-quotes-VyeQo3tL.js");
const __pages_import_424__ = () => import("./assets/life-insurance-quotes-maY0zVG1.js");
const __pages_import_425__ = () => import("./assets/home-insurance-quotes-C8auqSGM.js");
const __pages_import_426__ = () => import("./assets/health-insurance-quotes-C6DfkXmB.js");
const __pages_import_427__ = () => import("./assets/get-travel-insurance-quotes-QuoteId-DQN5eooE.js");
const __pages_import_428__ = () => import("./assets/get-renters-insurance-quotes-QuoteId-DwJW5KCS.js");
const __pages_import_429__ = () => import("./assets/get-motor-insurance-quotes-QuoteId-esPJobDH.js");
const __pages_import_430__ = () => import("./assets/get-life-insurance-quotes-QuoteId-BJE2nsZc.js");
const __pages_import_431__ = () => import("./assets/get-home-insurance-quotes-QuoteId-CGLQSSFh.js");
const __pages_import_432__ = () => import("./assets/get-health-insurance-quotes-QuoteId-Dds6omnL.js");
const __pages_import_433__ = () => import("./assets/get-employment-insurance-quotes-QuoteId-BMzAvvC4.js");
const __pages_import_434__ = () => import("./assets/employment-insurance-quotes-BTLlPK80.js");
const __pages_import_435__ = () => import("./assets/tpp-led-Cou6GEqA.js");
const __pages_import_436__ = () => import("./assets/lfi-led-CncT0QVz.js");
const __pages_import_437__ = () => import("./assets/index-C2niP3BK.js");
const __pages_import_438__ = () => import("./assets/travel-insurance-policies-BsT22NPw.js");
const __pages_import_439__ = () => import("./assets/travel-insurance-policies-InsurancePolicyId-B6oBkD9b.js");
const __pages_import_440__ = () => import("./assets/renters-insurance-policies-DgXJmJbN.js");
const __pages_import_441__ = () => import("./assets/renters-insurance-policies-InsurancePolicyId-CjvQnxJo.js");
const __pages_import_442__ = () => import("./assets/motor-insurance-policies-C5zq0pzh.js");
const __pages_import_443__ = () => import("./assets/motor-insurance-policies-InsurancePolicyId-xCCzimFs.js");
const __pages_import_444__ = () => import("./assets/life-insurance-policies-DpfCAlM4.js");
const __pages_import_445__ = () => import("./assets/life-insurance-policies-InsurancePolicyId-Gb2XPjgd.js");
const __pages_import_446__ = () => import("./assets/home-insurance-policies-Cn6Pkimt.js");
const __pages_import_447__ = () => import("./assets/home-insurance-policies-InsurancePolicyId-Ch0pWfcq.js");
const __pages_import_448__ = () => import("./assets/health-insurance-policies-BtMZe9-v.js");
const __pages_import_449__ = () => import("./assets/health-insurance-policies-InsurancePolicyId-C3eVDROM.js");
const __pages_import_450__ = () => import("./assets/employment-insurance-policies-HtuP67Sz.js");
const __pages_import_451__ = () => import("./assets/employment-insurance-policies-InsurancePolicyId-BTZZbYLa.js");
const __pages_import_452__ = () => import("./assets/premiums-vPhw1pgM.js");
const __pages_import_453__ = () => import("./assets/index-BNEynEWG.js");
const __pages_import_454__ = () => import("./assets/requirements-DpJ7eyv0.js");
const __pages_import_455__ = () => import("./assets/api-guide-DCJt85yZ.js");
const __pages_import_456__ = () => import("./assets/index-B9Ktrrut.js");
const __pages_import_457__ = () => import("./assets/debtor-account-D1U1Grrf.js");
const __pages_import_458__ = () => import("./assets/creditor-DYKgAvhZ.js");
const __pages_import_459__ = () => import("./assets/payments-CHjfdXpK.js");
const __pages_import_460__ = () => import("./assets/payments-PaymentId-Bu-dsI4P.js");
const __pages_import_461__ = () => import("./assets/payment-consents-ConsentId-refund-BXvFI4Pp.js");
const __pages_import_462__ = () => import("./assets/payment-consents-ConsentId-refund-dKRLKbYA.js");
const __pages_import_463__ = () => import("./assets/products-3naPXvPb.js");
const __pages_import_464__ = () => import("./assets/leads-BdJ4hAfK.js");
const __pages_import_465__ = () => import("./assets/products-MVIU-rFv.js");
const __pages_import_466__ = () => import("./assets/leads-CYMAnHrj.js");
const __pages_import_467__ = () => import("./assets/customer-BVIYPzwv.js");
const __pages_import_468__ = () => import("./assets/accounts-CPVwvTia.js");
const __pages_import_469__ = () => import("./assets/accounts-AccountId-DoID-rul.js");
const __pages_import_470__ = () => import("./assets/accounts-AccountId-transactions-_tCGDsuH.js");
const __pages_import_471__ = () => import("./assets/accounts-AccountId-statements-BgQiLToj.js");
const __pages_import_472__ = () => import("./assets/accounts-AccountId-standing-orders-CwHgCBpD.js");
const __pages_import_473__ = () => import("./assets/accounts-AccountId-scheduled-payments-DTtRZzAo.js");
const __pages_import_474__ = () => import("./assets/accounts-AccountId-products-CX9y2fT-.js");
const __pages_import_475__ = () => import("./assets/accounts-AccountId-direct-debits-dJ-0VK44.js");
const __pages_import_476__ = () => import("./assets/accounts-AccountId-customer-CvOk30Ub.js");
const __pages_import_477__ = () => import("./assets/accounts-AccountId-beneficiaries-DV3Dru7q.js");
const __pages_import_478__ = () => import("./assets/accounts-AccountId-balances-C34k9Qtc.js");
const __pages_import_479__ = () => import("./assets/customer-CK0fB4kJ.js");
const __pages_import_480__ = () => import("./assets/accounts-9Tmlmvfs.js");
const __pages_import_481__ = () => import("./assets/accounts-AccountId-DPQz-KYu.js");
const __pages_import_482__ = () => import("./assets/accounts-AccountId-transactions-Bl6jMtl0.js");
const __pages_import_483__ = () => import("./assets/accounts-AccountId-statements-bYVi0G3k.js");
const __pages_import_484__ = () => import("./assets/accounts-AccountId-standing-orders-DaKpIrvC.js");
const __pages_import_485__ = () => import("./assets/accounts-AccountId-scheduled-payments-C2VYQ-YU.js");
const __pages_import_486__ = () => import("./assets/accounts-AccountId-products-CXU3n5Qg.js");
const __pages_import_487__ = () => import("./assets/accounts-AccountId-direct-debits-vOgfuUz7.js");
const __pages_import_488__ = () => import("./assets/accounts-AccountId-customer-C7ZefxIr.js");
const __pages_import_489__ = () => import("./assets/accounts-AccountId-beneficiaries-DOQYRVO3.js");
const __pages_import_490__ = () => import("./assets/accounts-AccountId-balances-DPB-c-SW.js");
const __pages_import_491__ = () => import("./assets/pagination-CWKivYeS.js");
const __pages_import_492__ = () => import("./assets/index-CuL0qkyK.js");
const __pages_import_493__ = () => import("./assets/finance-rates-DExIo_OV.js");
const __pages_import_494__ = () => import("./assets/cop-query-BvLnpNkE.js");
const __pages_import_495__ = () => import("./assets/atm-BhxvTrT6.js");
const __pages_import_496__ = () => import("./assets/atm-D3P5OOyz.js");
const __pages_import_497__ = () => import("./assets/ozone-connect-url-CH_w9b9C.js");
const __pages_import_498__ = () => import("./assets/index-RQWltgz_.js");
const __pages_import_499__ = () => import("./assets/certificate-walkthroughs-DbZuaYjP.js");
const __pages_import_500__ = () => import("./assets/auth-endpoint-DDA1HtnO.js");
const __pages_import_501__ = () => import("./assets/mtls-server-ChdZ0hJy.js");
const __pages_import_502__ = () => import("./assets/mtls-client-m_QC6BQc.js");
const __pages_import_503__ = () => import("./assets/jwt-server-hG8-X7SO.js");
const __pages_import_504__ = () => import("./assets/jwt-client-Cq2qjN3C.js");
const __pages_import_505__ = () => import("./assets/hello-mtls-BOsp4e-S.js");
const __pages_import_506__ = () => import("./assets/auth-DUOPu8pd.js");
const __pages_import_507__ = () => import("./assets/auth-interactionId-doFail-MqzN9d-c.js");
const __pages_import_508__ = () => import("./assets/auth-interactionId-doConfirm-raOU33kP.js");
const __pages_import_509__ = () => import("./assets/psu-userId-consents-DuoyDLxr.js");
const __pages_import_510__ = () => import("./assets/payment-log-DM9DNB24.js");
const __pages_import_511__ = () => import("./assets/payment-log-id-mOznEZwF.js");
const __pages_import_512__ = () => import("./assets/patch-consents-consentId-C0CJxgm_.js");
const __pages_import_513__ = () => import("./assets/insurance-quote-log-logId-m5967yX3.js");
const __pages_import_514__ = () => import("./assets/hello-mtls-ZFhf5FVe.js");
const __pages_import_515__ = () => import("./assets/consents-DCwKPoX7.js");
const __pages_import_516__ = () => import("./assets/consents-consentId-DVj52GZ6.js");
const __pages_import_517__ = () => import("./assets/consents-consentId-audit-fBJZlSMx.js");
const __pages_import_518__ = () => import("./assets/consents-consentId-action-revoke-CQ5AA-JE.js");
const __pages_import_519__ = () => import("./assets/consent-groups-consentGroupId-consents-C8JLqtTI.js");
const __pages_import_520__ = () => import("./assets/consent-groups-consentGroupId-consents-action-revoke-DxAFQM-w.js");
const __pages_import_521__ = () => import("./assets/accounts-accountId-consents-DPAqCFbi.js");
const __pages_import_522__ = () => import("./assets/submission-BqBg3V8j.js");
const __pages_import_523__ = () => import("./assets/index-CQ13gzpI.js");
const __pages_import_524__ = () => import("./assets/submission-D37U3Vi8.js");
const __pages_import_525__ = () => import("./assets/index-hGv5jLGp.js");
const __pages_import_526__ = () => import("./assets/submission-DpadxgzR.js");
const __pages_import_527__ = () => import("./assets/index-BUIALtl_.js");
const __pages_import_528__ = () => import("./assets/submission-C-DN5Y5I.js");
const __pages_import_529__ = () => import("./assets/index-BEZ_RksV.js");
const __pages_import_530__ = () => import("./assets/submission-C9Rh3OYT.js");
const __pages_import_531__ = () => import("./assets/index-DcrSqZuo.js");
const __pages_import_532__ = () => import("./assets/submission-Da-gbO4j.js");
const __pages_import_533__ = () => import("./assets/index-1tFntpd7.js");
const __pages_import_534__ = () => import("./assets/submission-Co3wj68s.js");
const __pages_import_535__ = () => import("./assets/index-DVxo6hee.js");
const __pages_import_536__ = () => import("./assets/submission-FlPUCGBo.js");
const __pages_import_537__ = () => import("./assets/index-BnAG3T38.js");
const __pages_import_538__ = () => import("./assets/submission-DvLnKNq6.js");
const __pages_import_539__ = () => import("./assets/index-DjwdaJH2.js");
const __pages_import_540__ = () => import("./assets/submission-Tho4fvfb.js");
const __pages_import_541__ = () => import("./assets/index-Dg7kk4Cl.js");
const __pages_import_542__ = () => import("./assets/submission-CFKU0q1O.js");
const __pages_import_543__ = () => import("./assets/index-BoGhPKWt.js");
const __pages_import_544__ = () => import("./assets/open-api-CKx0yu5m.js");
const __pages_import_545__ = () => import("./assets/api-guide-B4HarOt6.js");
const __pages_import_546__ = () => import("./assets/open-api-Dts4JBJe.js");
const __pages_import_547__ = () => import("./assets/api-guide-rR5gdZJ0.js");
const __pages_import_548__ = () => import("./assets/open-api-D2Y5tF8A.js");
const __pages_import_549__ = () => import("./assets/api-guide-DQVRm4Ye.js");
const __pages_import_550__ = () => import("./assets/user-journeys-DehAnEeP.js");
const __pages_import_551__ = () => import("./assets/requirements-DQKTWQFR.js");
const __pages_import_552__ = () => import("./assets/index-DlRvkazR.js");
const __pages_import_553__ = () => import("./assets/user-journeys-mNeh6s6X.js");
const __pages_import_554__ = () => import("./assets/requirements-CNfdc-Y3.js");
const __pages_import_555__ = () => import("./assets/index-DjKnIG5p.js");
const __pages_import_556__ = () => import("./assets/payment-consents-B8fET0BX.js");
const __pages_import_557__ = () => import("./assets/payment-consents-ConsentId-CuyV9CUi.js");
const __pages_import_558__ = () => import("./assets/patch-payment-consents-ConsentId-D0Ltsq6p.js");
const __pages_import_559__ = () => import("./assets/patch-insurance-consents-ConsentId--8x4PJGo.js");
const __pages_import_560__ = () => import("./assets/patch-account-access-consents-ConsentId-uLrlIsg2.js");
const __pages_import_561__ = () => import("./assets/par-D5-hTdRG.js");
const __pages_import_562__ = () => import("./assets/insurance-consents-C5gsi314.js");
const __pages_import_563__ = () => import("./assets/insurance-consents-ConsentId-ByWHR5fH.js");
const __pages_import_564__ = () => import("./assets/account-access-consents-DUqJgv26.js");
const __pages_import_565__ = () => import("./assets/account-access-consents-ConsentId-B3_5JQ2D.js");
const __pages_import_566__ = () => import("./assets/index-BRPViD0f.js");
const __pages_import_567__ = () => import("./assets/index-B9R2nLUX.js");
const __pages_import_568__ = () => import("./assets/multi-authorization-Cnv25hQX.js");
const __pages_import_569__ = () => import("./assets/index-NezWsf3C.js");
const __pages_import_570__ = () => import("./assets/user-journeys-BcxOMxl_.js");
const __pages_import_571__ = () => import("./assets/requirements-Dm7AKnUs.js");
const __pages_import_572__ = () => import("./assets/index-BWa8RlXC.js");
const __pages_import_573__ = () => import("./assets/api-guide-CwMjskrJ.js");
const __pages_import_574__ = () => import("./assets/user-journeys-TghD8EWs.js");
const __pages_import_575__ = () => import("./assets/requirements-R1cZM3wx.js");
const __pages_import_576__ = () => import("./assets/index-C_2b44Xi.js");
const __pages_import_577__ = () => import("./assets/user-journeys-BQea-8FW.js");
const __pages_import_578__ = () => import("./assets/requirements-Bdlt_Xqf.js");
const __pages_import_579__ = () => import("./assets/index-CjUTYyD2.js");
const __pages_import_580__ = () => import("./assets/api-guide-DD0jutRi.js");
const __pages_import_581__ = () => import("./assets/requirements-DT2Nlhrd.js");
const __pages_import_582__ = () => import("./assets/index-B_zkrHAg.js");
const __pages_import_583__ = () => import("./assets/api-guide-City7ivJ.js");
const __pages_import_584__ = () => import("./assets/open-api-DdJjZ4MM.js");
const __pages_import_585__ = () => import("./assets/api-guide-76nZlYfe.js");
const __pages_import_586__ = () => import("./assets/open-api-tnd6xu9V.js");
const __pages_import_587__ = () => import("./assets/api-guide-CCZ4T1JM.js");
const __pages_import_588__ = () => import("./assets/open-api-DdqL7Wba.js");
const __pages_import_589__ = () => import("./assets/api-guide-DGSyOZ2V.js");
const __pages_import_590__ = () => import("./assets/user-journeys-lpBaWTQX.js");
const __pages_import_591__ = () => import("./assets/requirements-CeC1nowO.js");
const __pages_import_592__ = () => import("./assets/index-DkkLzrxk.js");
const __pages_import_593__ = () => import("./assets/user-journeys-B4QRsaLp.js");
const __pages_import_594__ = () => import("./assets/requirements-HR-Mz1HD.js");
const __pages_import_595__ = () => import("./assets/index-BM3uS-o7.js");
const __pages_import_596__ = () => import("./assets/payment-consents-C7_9eITB.js");
const __pages_import_597__ = () => import("./assets/payment-consents-ConsentId-B9DGkZNH.js");
const __pages_import_598__ = () => import("./assets/patch-payment-consents-ConsentId-D2hW6-Ls.js");
const __pages_import_599__ = () => import("./assets/patch-insurance-consents-ConsentId-Dv0fPjyl.js");
const __pages_import_600__ = () => import("./assets/patch-account-access-consents-ConsentId-9HCbfi1x.js");
const __pages_import_601__ = () => import("./assets/par-D39-xTeh.js");
const __pages_import_602__ = () => import("./assets/insurance-consents-CGU4viBR.js");
const __pages_import_603__ = () => import("./assets/insurance-consents-ConsentId-DzBusZjd.js");
const __pages_import_604__ = () => import("./assets/account-access-consents-8TH3QIzE.js");
const __pages_import_605__ = () => import("./assets/account-access-consents-ConsentId-C0q6D79e.js");
const __pages_import_606__ = () => import("./assets/index-Ce6Dyilc.js");
const __pages_import_607__ = () => import("./assets/multi-authorization-BfB_QzRz.js");
const __pages_import_608__ = () => import("./assets/index-DiQtafWd.js");
const __pages_import_609__ = () => import("./assets/user-journeys-MpaGwq9K.js");
const __pages_import_610__ = () => import("./assets/requirements-DbvEQYVb.js");
const __pages_import_611__ = () => import("./assets/index-JNTT9Jsw.js");
const __pages_import_612__ = () => import("./assets/api-guide-CrJV55jg.js");
const __pages_import_613__ = () => import("./assets/user-journeys-YEIIIXiN.js");
const __pages_import_614__ = () => import("./assets/requirements-DjJ34d7I.js");
const __pages_import_615__ = () => import("./assets/index-k291-PgA.js");
const __pages_import_616__ = () => import("./assets/user-journeys-faWEeUXg.js");
const __pages_import_617__ = () => import("./assets/requirements-CukKgSPn.js");
const __pages_import_618__ = () => import("./assets/index-DQMHo-z2.js");
const __pages_import_619__ = () => import("./assets/api-guide-_-XSylnj.js");
const __pages_import_620__ = () => import("./assets/requirements-COE1rAeQ.js");
const __pages_import_621__ = () => import("./assets/index-C1Xb-q6J.js");
const __pages_import_622__ = () => import("./assets/api-guide-M7giQ5zE.js");
const __pages_import_623__ = () => import("./assets/token-JcsnENvH.js");
const __pages_import_624__ = () => import("./assets/overview-CyDw4Bgo.js");
const __pages_import_625__ = () => import("./assets/access-encrypted-resource-data-BMZFiNcP.js");
const __pages_import_626__ = () => import("./assets/index--Hby5vMQ.js");
const __pages_import_627__ = () => import("./assets/user-journeys-D6FufrRs.js");
const __pages_import_628__ = () => import("./assets/requirements-uqz6LiXS.js");
const __pages_import_629__ = () => import("./assets/quote-types-CFZ-cofd.js");
const __pages_import_630__ = () => import("./assets/index-BmvJBXri.js");
const __pages_import_631__ = () => import("./assets/user-journeys-5AKnbNI7.js");
const __pages_import_632__ = () => import("./assets/requirements-B1k4rjY5.js");
const __pages_import_633__ = () => import("./assets/index-FBCIESLD.js");
const __pages_import_634__ = () => import("./assets/hello-DQ-_YxUI.js");
const __pages_import_635__ = () => import("./assets/hello-mtls-DcldVQJZ.js");
const __pages_import_636__ = () => import("./assets/echo-cert-8B2VUjGp.js");
const __pages_import_637__ = () => import("./assets/user-experience-B3jJXAAw.js");
const __pages_import_638__ = () => import("./assets/requirements-B4PE99fM.js");
const __pages_import_639__ = () => import("./assets/user-experience-PSe7d-Jm.js");
const __pages_import_640__ = () => import("./assets/requirements-BTUuMUxL.js");
const __pages_import_641__ = () => import("./assets/user-experience-EjtjreVN.js");
const __pages_import_642__ = () => import("./assets/requirements-D0VZbZBl.js");
const __pages_import_643__ = () => import("./assets/requirements-CsaAaaHW.js");
const __pages_import_644__ = () => import("./assets/index-HYMjZIFW.js");
const __pages_import_645__ = () => import("./assets/sca-C_Brs-uv.js");
const __pages_import_646__ = () => import("./assets/requirements-B2ju24Ol.js");
const __pages_import_647__ = () => import("./assets/index-DhSob4Qb.js");
const __pages_import_648__ = () => import("./assets/implementation-Cb0ilhTy.js");
const __pages_import_649__ = () => import("./assets/validate-1Ye_5cDF.js");
const __pages_import_650__ = () => import("./assets/event-op-cE94WNC9.js");
const __pages_import_651__ = () => import("./assets/users-register-initialize-8O8tb43m.js");
const __pages_import_652__ = () => import("./assets/users-register-complete-D6Uw3H4Z.js");
const __pages_import_653__ = () => import("./assets/users-pii-decrypt-DGFCMUrO.js");
const __pages_import_654__ = () => import("./assets/users-deregister-lhdxQUGr.js");
const __pages_import_655__ = () => import("./assets/users-challenge-query-zbbmzRSC.js");
const __pages_import_656__ = () => import("./assets/users-challenge-initialize-BeSIbJOE.js");
const __pages_import_657__ = () => import("./assets/users-challenge-complete-tMxIaTLK.js");
const __pages_import_658__ = () => import("./assets/travel-insurance-policies-CkKm8C8L.js");
const __pages_import_659__ = () => import("./assets/renters-insurance-policies-DQvu8i1L.js");
const __pages_import_660__ = () => import("./assets/motor-insurance-policies-CgWF9Crm.js");
const __pages_import_661__ = () => import("./assets/life-insurance-policies-BLe-ITVt.js");
const __pages_import_662__ = () => import("./assets/home-insurance-policies-vky-SXV7.js");
const __pages_import_663__ = () => import("./assets/health-insurance-policies-DVYL8UhV.js");
const __pages_import_664__ = () => import("./assets/employment-insurance-policies-DjHZf7xq.js");
const __pages_import_665__ = () => import("./assets/consent-actions-validate-CuusMglu.js");
const __pages_import_666__ = () => import("./assets/accounts-BNikJP6O.js");
const __pages_import_667__ = () => import("./assets/accounts-accountId-Cvf3DAtT.js");
const __pages_import_668__ = () => import("./assets/multi-authorization-B5l2ngME.js");
const __pages_import_669__ = () => import("./assets/index-tFLzdWMO.js");
const __pages_import_670__ = () => import("./assets/requirements-qHS73uRy.js");
const __pages_import_671__ = () => import("./assets/index-BGqeOgle.js");
const __pages_import_672__ = () => import("./assets/api-guide-Cd9A0G84.js");
const __pages_import_673__ = () => import("./assets/user-journeys-u0gRDGCN.js");
const __pages_import_674__ = () => import("./assets/requirements-CYUbJusu.js");
const __pages_import_675__ = () => import("./assets/index-CnukYMKq.js");
const __pages_import_676__ = () => import("./assets/user-journeys-etEfG0N3.js");
const __pages_import_677__ = () => import("./assets/requirements-DUfQtkbM.js");
const __pages_import_678__ = () => import("./assets/index-DQm0fs6U.js");
const __pages_import_679__ = () => import("./assets/api-guide-eWM2Phgh.js");
const __pages_import_680__ = () => import("./assets/requirements-_lRTvuug.js");
const __pages_import_681__ = () => import("./assets/index-BML_Tjbx.js");
const __pages_import_682__ = () => import("./assets/api-guide-BlID5DZY.js");
const __pages_import_683__ = () => import("./assets/prerequisites-tTL6LVHw.js");
const __pages_import_684__ = () => import("./assets/index-BsT-Y-st.js");
const __pages_import_685__ = () => import("./assets/application-layer-auth-Cey6k_xH.js");
const __pages_import_686__ = () => import("./assets/index-CL7BMCOK.js");
const __pages_import_687__ = () => import("./assets/index-QG92Ymi1.js");
const __pages_import_688__ = () => import("./assets/index-CbeQx8Bn.js");
const __pages_import_689__ = () => import("./assets/tpp-activation-Csjxfgg-.js");
const __pages_import_690__ = () => import("./assets/reports-Kjpp00Ku.js");
const __pages_import_691__ = () => import("./assets/logs-_zObInta.js");
const __pages_import_692__ = () => import("./assets/index-DIuF87mA.js");
const __pages_import_693__ = () => import("./assets/user-journeys-CMA667F8.js");
const __pages_import_694__ = () => import("./assets/requirements-B3D4UGp_.js");
const __pages_import_695__ = () => import("./assets/quote-types-u8fYk9ky.js");
const __pages_import_696__ = () => import("./assets/index-D-ubcF0q.js");
const __pages_import_697__ = () => import("./assets/user-journeys-CvQkC-Y5.js");
const __pages_import_698__ = () => import("./assets/requirements-BpGHpdqT.js");
const __pages_import_699__ = () => import("./assets/index-CKCEd371.js");
const __pages_import_700__ = () => import("./assets/hello-BhR9ZzA8.js");
const __pages_import_701__ = () => import("./assets/hello-mtls-DTskXAYv.js");
const __pages_import_702__ = () => import("./assets/echo-cert-BaSydaya.js");
const __pages_import_703__ = () => import("./assets/user-experience-CrdyskTm.js");
const __pages_import_704__ = () => import("./assets/requirements-sVxW7M2p.js");
const __pages_import_705__ = () => import("./assets/user-experience-e6nRfKzc.js");
const __pages_import_706__ = () => import("./assets/requirements-gRfPrk1I.js");
const __pages_import_707__ = () => import("./assets/user-experience-X67P0DWt.js");
const __pages_import_708__ = () => import("./assets/requirements-B3Zxh5Zz.js");
const __pages_import_709__ = () => import("./assets/requirements-BtiKjrnO.js");
const __pages_import_710__ = () => import("./assets/index-nf4vG_ZV.js");
const __pages_import_711__ = () => import("./assets/sca-D4ClAOR8.js");
const __pages_import_712__ = () => import("./assets/requirements-Ds9L0iaE.js");
const __pages_import_713__ = () => import("./assets/index-CvEcI8zR.js");
const __pages_import_714__ = () => import("./assets/implementation-D22_XG7k.js");
const __pages_import_715__ = () => import("./assets/validate-Dirt8MES.js");
const __pages_import_716__ = () => import("./assets/event-op-BBkZQ1qk.js");
const __pages_import_717__ = () => import("./assets/users-register-initialize-CSn7aCXz.js");
const __pages_import_718__ = () => import("./assets/users-register-complete-B1MTtD3C.js");
const __pages_import_719__ = () => import("./assets/users-pii-decrypt-Dah47Rd7.js");
const __pages_import_720__ = () => import("./assets/users-deregister-olYoYl7c.js");
const __pages_import_721__ = () => import("./assets/users-challenge-query-ByTdrV1j.js");
const __pages_import_722__ = () => import("./assets/users-challenge-initialize-CNIVeeb9.js");
const __pages_import_723__ = () => import("./assets/users-challenge-complete-P1mGfTVu.js");
const __pages_import_724__ = () => import("./assets/travel-insurance-policies-ClWQfVDP.js");
const __pages_import_725__ = () => import("./assets/renters-insurance-policies-DEbWQVEA.js");
const __pages_import_726__ = () => import("./assets/motor-insurance-policies-Ben9pOou.js");
const __pages_import_727__ = () => import("./assets/life-insurance-policies-D40iKEGq.js");
const __pages_import_728__ = () => import("./assets/home-insurance-policies-PuzKJMVE.js");
const __pages_import_729__ = () => import("./assets/health-insurance-policies-BPDVGs0v.js");
const __pages_import_730__ = () => import("./assets/employment-insurance-policies-DOlPIfWY.js");
const __pages_import_731__ = () => import("./assets/consent-actions-validate-Cmjaf7IZ.js");
const __pages_import_732__ = () => import("./assets/accounts-R8e4b3mw.js");
const __pages_import_733__ = () => import("./assets/accounts-accountId-B3MicmEw.js");
const __pages_import_734__ = () => import("./assets/multi-authorization-C8SCyvEU.js");
const __pages_import_735__ = () => import("./assets/index-D1k5xHz8.js");
const __pages_import_736__ = () => import("./assets/requirements-jrDyfBik.js");
const __pages_import_737__ = () => import("./assets/index-Dz8ns1El.js");
const __pages_import_738__ = () => import("./assets/api-guide-ivpxms9B.js");
const __pages_import_739__ = () => import("./assets/user-journeys-Bxqwf37q.js");
const __pages_import_740__ = () => import("./assets/requirements-wFWfpRgC.js");
const __pages_import_741__ = () => import("./assets/index-CsiXoq8N.js");
const __pages_import_742__ = () => import("./assets/user-journeys-CDTtHPrL.js");
const __pages_import_743__ = () => import("./assets/requirements-_VuNtXJx.js");
const __pages_import_744__ = () => import("./assets/index-C-C9tV0D.js");
const __pages_import_745__ = () => import("./assets/api-guide-BTpLYMuN.js");
const __pages_import_746__ = () => import("./assets/requirements-ZErDmi4t.js");
const __pages_import_747__ = () => import("./assets/index-CH7p1uk2.js");
const __pages_import_748__ = () => import("./assets/api-guide-flpejrU6.js");
const __pages_import_749__ = () => import("./assets/prerequisites-DetfYpzL.js");
const __pages_import_750__ = () => import("./assets/index-CgQQCHkX.js");
const __pages_import_751__ = () => import("./assets/application-layer-auth-BUvveOid.js");
const __pages_import_752__ = () => import("./assets/index-DSXwVdkA.js");
const __pages_import_753__ = () => import("./assets/index-p_BXt_Qj.js");
const __pages_import_754__ = () => import("./assets/index-zD6uIQCI.js");
const __pages_import_755__ = () => import("./assets/tpp-activation-BSK_JMb0.js");
const __pages_import_756__ = () => import("./assets/reports-NwPZ7_LJ.js");
const __pages_import_757__ = () => import("./assets/logs-CcB5UDHT.js");
const __pages_import_758__ = () => import("./assets/index-DbxWE30n.js");
const __pages_import_759__ = () => import("./assets/meta-D0SPcqjM.js");
const __pages_import_760__ = () => import("./assets/index-bObzLeMs.js");
const __pages_import_761__ = () => import("./assets/creating-CVdd72Uj.js");
const __pages_import_762__ = () => import("./assets/index-B7qT3DSO.js");
const __pages_import_763__ = () => import("./assets/index-Cc-zqKMu.js");
const __pages_import_764__ = () => import("./assets/index-CYnh8E4n.js");
const __pages_import_765__ = () => import("./assets/postman-CipNQwNE.js");
const __pages_import_766__ = () => import("./assets/index-YlKpRQJW.js");
const __pages_import_767__ = () => import("./assets/requirements-BienTK5h.js");
const __pages_import_768__ = () => import("./assets/index-Dvix931u.js");
const __pages_import_769__ = () => import("./assets/api-guide-DKzS_h0s.js");
const __pages_import_770__ = () => import("./assets/index-BA9NS-PJ.js");
const __pages_import_771__ = () => import("./assets/index-Bsst0yuu.js");
const __pages_import_772__ = () => import("./assets/index-B3hAoPkt.js");
const __pages_import_773__ = () => import("./assets/postman-BmiI3SGo.js");
const __pages_import_774__ = () => import("./assets/index-BNuBHmNE.js");
const __pages_import_775__ = () => import("./assets/requirements-DfZR0R4C.js");
const __pages_import_776__ = () => import("./assets/index-CkT6JIbW.js");
const __pages_import_777__ = () => import("./assets/api-guide-CTpbRUe3.js");
const __pages_import_778__ = () => import("./assets/index-ZhXlTPsV.js");
const __pages_import_779__ = () => import("./assets/participants-Br5bxel5.js");
const __pages_import_780__ = () => import("./assets/index-L-3ucNw-.js");
const __pages_import_781__ = () => import("./assets/index-DFkR6YVG.js");
const __pages_import_782__ = () => import("./assets/client-transport-By5Z7hra.js");
const __pages_import_783__ = () => import("./assets/client-signing-BTAbaDTd.js");
const __pages_import_784__ = () => import("./assets/client-encryption-BAUZ-Kom.js");
const __pages_import_785__ = () => import("./assets/index-mTC-F4Ew.js");
const __pages_import_786__ = () => import("./assets/client-assertion-QNKDgDK1.js");
const __pages_import_787__ = () => import("./assets/scopes-D6KR5qjN.js");
const __pages_import_788__ = () => import("./assets/request-jwt-DP5aKoQZ.js");
const __pages_import_789__ = () => import("./assets/receiving-events-BqdhajZJ.js");
const __pages_import_790__ = () => import("./assets/opening-the-redirect-BhBkDsaj.js");
const __pages_import_791__ = () => import("./assets/o3-utils-ChuB-WvV.js");
const __pages_import_792__ = () => import("./assets/message-signing-BqcfOGGN.js");
const __pages_import_793__ = () => import("./assets/message-encryption-DlvOVrnA.js");
const __pages_import_794__ = () => import("./assets/index-WKV7q9MQ.js");
const __pages_import_795__ = () => import("./assets/handling-callback-DuEwXUpa.js");
const __pages_import_796__ = () => import("./assets/tpp-registration-Do-QXLGX.js");
const __pages_import_797__ = () => import("./assets/user-experience-DQldFySp.js");
const __pages_import_798__ = () => import("./assets/security-validation-DVqfCyWj.js");
const __pages_import_799__ = () => import("./assets/overview-DrTDwqNp.js");
const __pages_import_800__ = () => import("./assets/fapi-LaTWIO5K.js");
const __pages_import_801__ = () => import("./assets/index-XM0QYIEB.js");
const __pages_import_802__ = () => import("./assets/index-D3OBhvaf.js");
const __pages_import_803__ = () => import("./assets/index-CCk-K1xo.js");
const __pages_import_804__ = () => import("./assets/api-guide-Bb7O9elX.js");
const __pages_import_805__ = () => import("./assets/opening-the-redirect-Dr8DbC0C.js");
const __pages_import_806__ = () => import("./assets/api-guide-D44b_c-k.js");
const __pages_import_807__ = () => import("./assets/index-CTEGZfgN.js");
const __pages_import_808__ = () => import("./assets/api-guide-D-n_JiFf.js");
const __pages_import_809__ = () => import("./assets/user-experience-BB56pxRl.js");
const __pages_import_810__ = () => import("./assets/pricing-K_gL19SL.js");
const __pages_import_811__ = () => import("./assets/index-Cej6zFWi.js");
const __pages_import_812__ = () => import("./assets/api-guide-CoTH4Bmb.js");
const __pages_import_813__ = () => import("./assets/index-D87qQAOH.js");
const __pages_import_814__ = () => import("./assets/index-DSuisY8W.js");
const __pages_import_815__ = () => import("./assets/index-s8tyVlOR.js");
const __pages_import_816__ = () => import("./assets/index-CyUSYZbd.js");
const __pages_import_817__ = () => import("./assets/index-CQCHr3mg.js");
const __pages_import_818__ = () => import("./assets/api-guide-1-ANYAJ9.js");
const __pages_import_819__ = () => import("./assets/opening-the-redirect-Ce2DIZ8-.js");
const __pages_import_820__ = () => import("./assets/api-guide-D3-nHJZ_.js");
const __pages_import_821__ = () => import("./assets/index-B8ynobI_.js");
const __pages_import_822__ = () => import("./assets/api-guide-BQWV49sm.js");
const __pages_import_823__ = () => import("./assets/user-experience-Df2r9jNm.js");
const __pages_import_824__ = () => import("./assets/pricing-BTw9YGhg.js");
const __pages_import_825__ = () => import("./assets/index-DXNHtgWr.js");
const __pages_import_826__ = () => import("./assets/api-guide-BZ4G-x5g.js");
const __pages_import_827__ = () => import("./assets/index-DYx5PpLb.js");
const __pages_import_828__ = () => import("./assets/index-DZNdk0HO.js");
const __pages_import_829__ = () => import("./assets/index-igAYW3KT.js");
const __pages_import_830__ = () => import("./assets/creating-DkDzSy60.js");
const __pages_import_831__ = () => import("./assets/index-CTzr8gwY.js");
const __pages_import_832__ = () => import("./assets/index-D5eMz2G8.js");
const __pages_import_833__ = () => import("./assets/client-transport-CaZwv1pl.js");
const __pages_import_834__ = () => import("./assets/client-signing-tL_xqcWG.js");
const __pages_import_835__ = () => import("./assets/token-BZacpuJv.js");
const __pages_import_836__ = () => import("./assets/software-statements-DY6shNdc.js");
const __pages_import_837__ = () => import("./assets/organisations-CzK3KuPJ.js");
const __pages_import_838__ = () => import("./assets/index-C67Y5CpL.js");
const __pages_import_839__ = () => import("./assets/contacts-BJ2UF9wX.js");
const __pages_import_840__ = () => import("./assets/auth-servers-3szJQgq7.js");
const __pages_import_841__ = () => import("./assets/api-resources-C2uz6sSS.js");
const __pages_import_842__ = () => import("./assets/api-guide-BE7KDm_W.js");
const __pages_import_843__ = () => import("./assets/api-families-BvCHhHQj.js");
const __pages_import_844__ = () => import("./assets/user-experience-77oBEtHU.js");
const __pages_import_845__ = () => import("./assets/tpp-buddying-DZlMpJvy.js");
const __pages_import_846__ = () => import("./assets/self-testing-BL2DMT7c.js");
const __pages_import_847__ = () => import("./assets/security-validation-yi5k-p6i.js");
const __pages_import_848__ = () => import("./assets/performance-Cu1eo61W.js");
const __pages_import_849__ = () => import("./assets/overview-CWzgwTL4.js");
const __pages_import_850__ = () => import("./assets/well-known-DNFs3RfF.js");
const __pages_import_851__ = () => import("./assets/user-sign-up-1NKPNivF.js");
const __pages_import_852__ = () => import("./assets/roles-zHXrInBr.js");
const __pages_import_853__ = () => import("./assets/redirect-uri-C3xf2zj1.js");
const __pages_import_854__ = () => import("./assets/organisation-admins-CT4YaQJ4.js");
const __pages_import_855__ = () => import("./assets/onboarding-BxMXwGqF.js");
const __pages_import_856__ = () => import("./assets/onboarding-form-organisation-CtvsSTdv.js");
const __pages_import_857__ = () => import("./assets/onboarding-form-admin-DF-YpRkE.js");
const __pages_import_858__ = () => import("./assets/index-DYnvO6Nv.js");
const __pages_import_859__ = () => import("./assets/flags-metadata-CB5pb6BG.js");
const __pages_import_860__ = () => import("./assets/creating-an-application-CFg4Dgd6.js");
const __pages_import_861__ = () => import("./assets/contacts-wORgP0wA.js");
const __pages_import_862__ = () => import("./assets/authorisation-servers-D5YlotWP.js");
const __pages_import_863__ = () => import("./assets/application-B3CIra9X.js");
const __pages_import_864__ = () => import("./assets/api-resources-TjP8fhai.js");
const __pages_import_865__ = () => import("./assets/api-discovery-CXlyLCdR.js");
const __pages_import_866__ = () => import("./assets/adding-users-DNySEZse.js");
const __pages_import_867__ = () => import("./assets/request-headers-BPbf_YKl.js");
const __pages_import_868__ = () => import("./assets/model-insurer-C2icDlia.js");
const __pages_import_869__ = () => import("./assets/model-bank-VITFu-mf.js");
const __pages_import_870__ = () => import("./assets/api-guide-DW6f_cay.js");
const __pages_import_871__ = () => import("./assets/live-proving-BSQcjpqK.js");
const __pages_import_872__ = () => import("./assets/user-sign-up-DpxBHUqN.js");
const __pages_import_873__ = () => import("./assets/roles-DRpMXVpD.js");
const __pages_import_874__ = () => import("./assets/organisation-admins-DMtCw0jf.js");
const __pages_import_875__ = () => import("./assets/onboarding-CeI-Qsv3.js");
const __pages_import_876__ = () => import("./assets/onboarding-form-organisation-DtgmfB1I.js");
const __pages_import_877__ = () => import("./assets/onboarding-form-admin-BkmqUu3D.js");
const __pages_import_878__ = () => import("./assets/index-BQAl_4bY.js");
const __pages_import_879__ = () => import("./assets/creating-c3-application-BvSUQzww.js");
const __pages_import_880__ = () => import("./assets/contacts-CesI-6jV.js");
const __pages_import_881__ = () => import("./assets/application-CAUet1Wc.js");
const __pages_import_882__ = () => import("./assets/adding-users-CuK0v6tL.js");
const __pages_import_883__ = () => import("./assets/insurance-rollout-plan-C8kjm1ew.js");
const __pages_import_884__ = () => import("./assets/index-avpe3cFZ.js");
const __pages_import_885__ = () => import("./assets/bank-rollout-plan-B2POIN6w.js");
const __pages_import_886__ = () => import("./assets/token-BsLIWIcM.js");
const __pages_import_887__ = () => import("./assets/software-statements-KCjhTaWL.js");
const __pages_import_888__ = () => import("./assets/participants-5EUkFuRM.js");
const __pages_import_889__ = () => import("./assets/organisations-CFRhIZKp.js");
const __pages_import_890__ = () => import("./assets/contacts-MJ78TuSq.js");
const __pages_import_891__ = () => import("./assets/auth-servers-DT1tXVio.js");
const __pages_import_892__ = () => import("./assets/api-resources-Uq5NQiYR.js");
const __pages_import_893__ = () => import("./assets/api-families-DDfsGAWp.js");
const __pages_import_894__ = () => import("./assets/index-D5x8gTcE.js");
const __pages_import_895__ = () => import("./assets/index-CuGSujXC.js");
const __pages_import_896__ = () => import("./assets/attestation-schema-BpWsXHqz.js");
const __pages_import_897__ = () => import("./assets/international-schema-Cr95YEKF.js");
const __pages_import_898__ = () => import("./assets/index-CPfdzyyO.js");
const __pages_import_899__ = () => import("./assets/domestic-schema-CjAgST8p.js");
const __pages_import_900__ = () => import("./assets/index-CFW8GEmx.js");
const __pages_import_901__ = () => import("./assets/index-CGv4kYP9.js");
const __pages_import_902__ = () => import("./assets/checker-CaDwB32v.js");
const __pages_import_903__ = () => import("./assets/index-Cmn5taiv.js");
const __pages_import_904__ = () => import("./assets/index-x3ykXTGB.js");
const __pages_import_905__ = () => import("./assets/index-BN7blfvn.js");
const __pages_import_906__ = () => import("./assets/index-BX1-A1P4.js");
const __pages_import_907__ = () => import("./assets/index-Cab3-i9n.js");
const __pages_import_908__ = () => import("./assets/index-BpP40k5G.js");
const __pages_import_909__ = () => import("./assets/index-BAPEQj8L.js");
const __pages_import_910__ = () => import("./assets/index-T4ugmUk2.js");
const __pages_import_911__ = () => import("./assets/index-Ai1nJ_Tx.js");
const __pages_import_912__ = () => import("./assets/index-QeP1_2tL.js");
const __pages_import_913__ = () => import("./assets/schema-C5_iVXfl.js");
const __pages_import_914__ = () => import("./assets/par-schema-D7nNfxqk.js");
const __pages_import_915__ = () => import("./assets/index-CTfdlrgk.js");
const __pages_import_916__ = () => import("./assets/index-Bt3A4JDH.js");
const __pages_import_917__ = () => import("./assets/index-BYGidyRR.js");
const __pages_import_918__ = () => import("./assets/transaction-date-filters--VTZD231.js");
const __pages_import_919__ = () => import("./assets/tpp-context-block-DDtyDb0f.js");
const __pages_import_920__ = () => import("./assets/request-headers-CdvPUnhJ.js");
const __pages_import_921__ = () => import("./assets/pii-encryption-DKw4G0a7.js");
const __pages_import_922__ = () => import("./assets/payment-account-permissions-DqQqxSML.js");
const __pages_import_923__ = () => import("./assets/pagination-ibSIwDTw.js");
const __pages_import_924__ = () => import("./assets/on-behalf-of-kidXinNw.js");
const __pages_import_925__ = () => import("./assets/o3-utils-BvtKZV6v.js");
const __pages_import_926__ = () => import("./assets/multi-segment-api-hubs-DykWRizu.js");
const __pages_import_927__ = () => import("./assets/mtls-endpoint-aliases-BRPgZkIc.js");
const __pages_import_928__ = () => import("./assets/jwt-claims-By9CZeEv.js");
const __pages_import_929__ = () => import("./assets/identity-assurance-claims-Dhhk-x7P.js");
const __pages_import_930__ = () => import("./assets/consent-identifiers-BIsbkL2W.js");
const __pages_import_931__ = () => import("./assets/choosing-a-payment-type-hkaOaIVk.js");
const __pages_import_932__ = () => import("./assets/certificate-rotation-DndWOIv7.js");
const __pages_import_933__ = () => import("./assets/base-consent-id-DCYLHlQM.js");
const __pages_import_934__ = () => import("./assets/ofp-008-CIUsTWV7.js");
const __pages_import_935__ = () => import("./assets/index-B0M30pST.js");
const __pages_import_936__ = () => import("./assets/retail-consumer-protection-B4AGpj3m.js");
const __pages_import_937__ = () => import("./assets/product-and-services-mkj-dsd7.js");
const __pages_import_938__ = () => import("./assets/procurement-6O340aXY.js");
const __pages_import_939__ = () => import("./assets/outsourcing-xG-RNmW9.js");
const __pages_import_940__ = () => import("./assets/marketing-and-advertising-ByVv6Ko2.js");
const __pages_import_941__ = () => import("./assets/internal-audit-DjfOfXAu.js");
const __pages_import_942__ = () => import("./assets/information-security-DTUKeg-I.js");
const __pages_import_943__ = () => import("./assets/index-4KtEw7ck.js");
const __pages_import_944__ = () => import("./assets/hr-jTKxUW7F.js");
const __pages_import_945__ = () => import("./assets/enterprise-risk-management-D--7ajYB.js");
const __pages_import_946__ = () => import("./assets/corporate-governance-By-fQuaN.js");
const __pages_import_947__ = () => import("./assets/complaints-and-disputes-DENUQfLe.js");
const __pages_import_948__ = () => import("./assets/business-continuity-DMUShrrh.js");
const __pages_import_949__ = () => import("./assets/aml-cft-and-fraud-DIYsxXHe.js");
const __pages_import_950__ = () => import("./assets/kit-NdgimSUr.js");
const __pages_import_951__ = () => import("./assets/component-viewer-B8wR6Ibz.js");
const __pages_import_952__ = () => import("./assets/ofp-006-QFv8dxCG.js");
const __pages_import_953__ = () => import("./assets/index-DUqNxN8_.js");
const __pages_import_954__ = () => import("./assets/whats-live-CPxMdaD2.js");
const __pages_import_955__ = () => import("./assets/index-Bzjjg4x2.js");
const __pages_import_956__ = () => import("./assets/version-management-B9Cb03nX.js");
const __pages_import_957__ = () => import("./assets/secure-management-DOLW_ngs.js");
const __pages_import_958__ = () => import("./assets/ozone-connect-data-quality-Cbk99mOe.js");
const __pages_import_959__ = () => import("./assets/ozone-connect-availability-DeFJvgXk.js");
const __pages_import_960__ = () => import("./assets/open-license-contribution-agreement-DITZMFin.js");
const __pages_import_961__ = () => import("./assets/lfi-deprecation-48r0LqiS.js");
const __pages_import_962__ = () => import("./assets/index-BAW0ATTE.js");
const __pages_import_963__ = () => import("./assets/changes-to-published-content-BTGcNQQN.js");
const __pages_import_964__ = () => import("./assets/api-response-time-QRTIErpj.js");
const __pages_import_965__ = () => import("./assets/index-CiEPgzSj.js");
const __pages_import_966__ = () => import("./assets/index-ButQGan6.js");
const __pages_import_967__ = () => import("./assets/example-M6EDQZSO.js");
const __pages_import_968__ = () => import("./assets/index-CoGbGOuS.js");
const __pages_import_969__ = () => import("./assets/how-to-access-HjrCIlM5.js");
const __pages_import_970__ = () => import("./assets/support-service-desk-CQXX4Kcp.js");
const __pages_import_971__ = () => import("./assets/news-B2KfGnWz.js");
const __pages_import_972__ = () => import("./assets/metrics-C9tft_wL.js");
const __pages_import_974__ = () => import("./assets/_...notFound_-CyFnSnJ5.js");
const __pages_import_975__ = () => import("./assets/_id_-D0jmy82k.js");
const __pages_import_976__ = () => import("./assets/_slug_-DHvfay8y.js");
const __pages_import_977__ = () => import("./assets/votes-CBvuP7Ra.js");
const __pages_import_978__ = () => import("./assets/_...slug_-C4skE7dr.js");
const __pages_import_979__ = () => import("./assets/_version_-CN3Xa-1A.js");
const __pages_import_980__ = () => import("./assets/_version_-CX3PxhUq.js");
const __pages_import_981__ = () => import("./assets/_year_-Bu05Ka7H.js");
const __pages_import_982__ = () => import("./assets/_year_-DRj_0_Xn.js");
const routes$1 = [{ "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys", "component": __pages_import_0__, "props": true, "meta": { "title": "Variable Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements", "component": __pages_import_1__, "props": true, "meta": { "title": "Variable Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide", "component": __pages_import_2__, "props": true, "meta": { "title": "Variable Periodic Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys", "component": __pages_import_3__, "props": true, "meta": { "title": "Variable On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements", "component": __pages_import_4__, "props": true, "meta": { "title": "Variable On Demand — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide", "component": __pages_import_5__, "props": true, "meta": { "title": "Variable On-Demand — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys", "component": __pages_import_6__, "props": true, "meta": { "title": "Variable Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements", "component": __pages_import_7__, "props": true, "meta": { "title": "Variable Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide", "component": __pages_import_8__, "props": true, "meta": { "title": "Variable Defined Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys", "component": __pages_import_9__, "props": true, "meta": { "title": "Fixed Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements", "component": __pages_import_10__, "props": true, "meta": { "title": "Fixed Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide", "component": __pages_import_11__, "props": true, "meta": { "title": "Fixed Periodic Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys", "component": __pages_import_12__, "props": true, "meta": { "title": "Fixed On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements", "component": __pages_import_13__, "props": true, "meta": { "title": "Fixed On Demand — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide", "component": __pages_import_14__, "props": true, "meta": { "title": "Fixed On-Demand — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys", "component": __pages_import_15__, "props": true, "meta": { "title": "Fixed Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements", "component": __pages_import_16__, "props": true, "meta": { "title": "Fixed Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide", "component": __pages_import_17__, "props": true, "meta": { "title": "Fixed Defined Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys", "component": __pages_import_18__, "props": true, "meta": { "title": "Delegated SCA - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements", "component": __pages_import_19__, "props": true, "meta": { "title": "Delegated SCA — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide", "component": __pages_import_20__, "props": true, "meta": { "title": "Delegated SCA — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys", "component": __pages_import_21__, "props": true, "meta": { "title": "Variable Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements", "component": __pages_import_22__, "props": true, "meta": { "title": "Variable Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide", "component": __pages_import_23__, "props": true, "meta": { "title": "Variable Periodic Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys", "component": __pages_import_24__, "props": true, "meta": { "title": "Variable On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements", "component": __pages_import_25__, "props": true, "meta": { "title": "Variable On Demand — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide", "component": __pages_import_26__, "props": true, "meta": { "title": "Variable On-Demand — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys", "component": __pages_import_27__, "props": true, "meta": { "title": "Variable Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements", "component": __pages_import_28__, "props": true, "meta": { "title": "Variable Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide", "component": __pages_import_29__, "props": true, "meta": { "title": "Variable Defined Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys", "component": __pages_import_30__, "props": true, "meta": { "title": "Fixed Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements", "component": __pages_import_31__, "props": true, "meta": { "title": "Fixed Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide", "component": __pages_import_32__, "props": true, "meta": { "title": "Fixed Periodic Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys", "component": __pages_import_33__, "props": true, "meta": { "title": "Fixed On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements", "component": __pages_import_34__, "props": true, "meta": { "title": "Fixed On Demand — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide", "component": __pages_import_35__, "props": true, "meta": { "title": "Fixed On-Demand — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys", "component": __pages_import_36__, "props": true, "meta": { "title": "Fixed Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements", "component": __pages_import_37__, "props": true, "meta": { "title": "Fixed Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide", "component": __pages_import_38__, "props": true, "meta": { "title": "Fixed Defined Schedule — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys", "component": __pages_import_39__, "props": true, "meta": { "title": "Delegated SCA - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements", "component": __pages_import_40__, "props": true, "meta": { "title": "Delegated SCA — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide", "component": __pages_import_41__, "props": true, "meta": { "title": "Delegated SCA — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys", "component": __pages_import_42__, "props": true, "meta": { "title": "Variable Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements", "component": __pages_import_43__, "props": true, "meta": { "title": "Variable Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide", "component": __pages_import_44__, "props": true, "meta": { "title": "Variable Periodic Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys", "component": __pages_import_45__, "props": true, "meta": { "title": "Variable On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements", "component": __pages_import_46__, "props": true, "meta": { "title": "Variable On Demand — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide", "component": __pages_import_47__, "props": true, "meta": { "title": "Variable On Demand — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys", "component": __pages_import_48__, "props": true, "meta": { "title": "Variable Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements", "component": __pages_import_49__, "props": true, "meta": { "title": "Variable Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide", "component": __pages_import_50__, "props": true, "meta": { "title": "Variable Defined Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys", "component": __pages_import_51__, "props": true, "meta": { "title": "Fixed Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements", "component": __pages_import_52__, "props": true, "meta": { "title": "Fixed Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide", "component": __pages_import_53__, "props": true, "meta": { "title": "Fixed Periodic Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys", "component": __pages_import_54__, "props": true, "meta": { "title": "Fixed On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements", "component": __pages_import_55__, "props": true, "meta": { "title": "Fixed On Demand — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide", "component": __pages_import_56__, "props": true, "meta": { "title": "Fixed On Demand — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys", "component": __pages_import_57__, "props": true, "meta": { "title": "Fixed Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements", "component": __pages_import_58__, "props": true, "meta": { "title": "Fixed Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide", "component": __pages_import_59__, "props": true, "meta": { "title": "Fixed Defined Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys", "component": __pages_import_60__, "props": true, "meta": { "title": "Delegated SCA - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements", "component": __pages_import_61__, "props": true, "meta": { "title": "Delegated SCA — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide", "component": __pages_import_62__, "props": true, "meta": { "title": "Delegated SCA — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/user-journeys", "component": __pages_import_63__, "props": true, "meta": { "title": "Variable Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/requirements", "component": __pages_import_64__, "props": true, "meta": { "title": "Variable Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-periodic-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide", "component": __pages_import_65__, "props": true, "meta": { "title": "Variable Periodic Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys", "component": __pages_import_66__, "props": true, "meta": { "title": "Variable On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements", "component": __pages_import_67__, "props": true, "meta": { "title": "Variable On Demand — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-on-demand-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide", "component": __pages_import_68__, "props": true, "meta": { "title": "Variable On Demand — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/user-journeys", "component": __pages_import_69__, "props": true, "meta": { "title": "Variable Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/requirements", "component": __pages_import_70__, "props": true, "meta": { "title": "Variable Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-variable-defined-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide", "component": __pages_import_71__, "props": true, "meta": { "title": "Variable Defined Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/user-journeys", "component": __pages_import_72__, "props": true, "meta": { "title": "Fixed Periodic Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/requirements", "component": __pages_import_73__, "props": true, "meta": { "title": "Fixed Periodic Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-periodic-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide", "component": __pages_import_74__, "props": true, "meta": { "title": "Fixed Periodic Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/user-journeys", "component": __pages_import_75__, "props": true, "meta": { "title": "Fixed On Demand - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/requirements", "component": __pages_import_76__, "props": true, "meta": { "title": "Fixed On Demand — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-on-demand-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide", "component": __pages_import_77__, "props": true, "meta": { "title": "Fixed On Demand — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/user-journeys", "component": __pages_import_78__, "props": true, "meta": { "title": "Fixed Defined Schedule - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/requirements", "component": __pages_import_79__, "props": true, "meta": { "title": "Fixed Defined Schedule — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-fixed-defined-schedule-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide", "component": __pages_import_80__, "props": true, "meta": { "title": "Fixed Defined Schedule — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/user-journeys", "component": __pages_import_81__, "props": true, "meta": { "title": "Delegated SCA - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements", "component": __pages_import_82__, "props": true, "meta": { "title": "Delegated SCA — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-multi-payments-delegated-sca-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/api-guide", "component": __pages_import_83__, "props": true, "meta": { "title": "Delegated SCA — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-personal-identifiable-information-api-schema-pii-payments", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments", "component": __pages_import_84__, "props": true, "meta": { "title": "PII Schema — POST /payments" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-personal-identifiable-information-api-schema-pii-par", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par", "component": __pages_import_85__, "props": true, "meta": { "title": "PII Schema — POST /par" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-single-instant-payment-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys", "component": __pages_import_86__, "props": true, "meta": { "title": "Single Instant Payment - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-single-instant-payment-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/requirements", "component": __pages_import_87__, "props": true, "meta": { "title": "Single Instant Payment — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-single-instant-payment-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide", "component": __pages_import_88__, "props": true, "meta": { "title": "Single Instant Payment — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-domestic-payments-overview-payment-status", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status", "component": __pages_import_89__, "props": true, "meta": { "title": "Payment Status" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-personal-identifiable-information-api-schema-pii-payments", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments", "component": __pages_import_90__, "props": true, "meta": { "title": "PII Schema — POST /payments" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-personal-identifiable-information-api-schema-pii-par", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par", "component": __pages_import_91__, "props": true, "meta": { "title": "PII Schema — POST /par" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-single-instant-payment-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys", "component": __pages_import_92__, "props": true, "meta": { "title": "Single Instant Payment - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-single-instant-payment-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements", "component": __pages_import_93__, "props": true, "meta": { "title": "Single Instant Payment — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-single-instant-payment-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide", "component": __pages_import_94__, "props": true, "meta": { "title": "Single Instant Payment — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-domestic-payments-overview-payment-status", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/overview/payment-status", "component": __pages_import_95__, "props": true, "meta": { "title": "Payment Status" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-personal-identifiable-information-api-schema-pii-payments", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments", "component": __pages_import_96__, "props": true, "meta": { "title": "PII Schema — Payments (Ozone Connect)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-personal-identifiable-information-api-schema-pii-par", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par", "component": __pages_import_97__, "props": true, "meta": { "title": "PII Schema — Consent (Consent Manager)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-personal-identifiable-information-api-guide-verify-tpp-signature", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature", "component": __pages_import_98__, "props": true, "meta": { "title": "Verifying the TPP JWS Signature" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-personal-identifiable-information-api-guide-decrypt-pii", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii", "component": __pages_import_99__, "props": true, "meta": { "title": "How to Decrypt PII" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-single-instant-payment-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys", "component": __pages_import_100__, "props": true, "meta": { "title": "Single Instant Payment - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-single-instant-payment-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/requirements", "component": __pages_import_101__, "props": true, "meta": { "title": "Single Instant Payment — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-single-instant-payment-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide", "component": __pages_import_102__, "props": true, "meta": { "title": "Single Instant Payment — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-domestic-payments-overview-payment-status", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/domestic-payments/overview/payment-status", "component": __pages_import_103__, "props": true, "meta": { "title": "Payment Status" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-personal-identifiable-information-api-schema-pii-payments", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments", "component": __pages_import_104__, "props": true, "meta": { "title": "PII Schema — Payments (Ozone Connect)" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-personal-identifiable-information-api-schema-pii-par", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par", "component": __pages_import_105__, "props": true, "meta": { "title": "PII Schema — Consent (Consent Manager)" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-personal-identifiable-information-api-guide-verify-tpp-signature", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature", "component": __pages_import_106__, "props": true, "meta": { "title": "Verifying the TPP JWS Signature" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-personal-identifiable-information-api-guide-decrypt-pii", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii", "component": __pages_import_107__, "props": true, "meta": { "title": "How to Decrypt PII" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-single-instant-payment-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/user-journeys", "component": __pages_import_108__, "props": true, "meta": { "title": "Single Instant Payment - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-single-instant-payment-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements", "component": __pages_import_109__, "props": true, "meta": { "title": "Single Instant Payment — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-single-instant-payment-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/api-guide", "component": __pages_import_110__, "props": true, "meta": { "title": "Single Instant Payment — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-domestic-payments-overview-payment-status", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status", "component": __pages_import_111__, "props": true, "meta": { "title": "Payment Status" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-travel-insurance-quotes", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/travel-insurance-quotes", "component": __pages_import_112__, "props": true, "meta": { "title": "Create a Travel Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-renters-insurance-quotes", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/renters-insurance-quotes", "component": __pages_import_113__, "props": true, "meta": { "title": "Create a Renters Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-post-travel-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/post-travel-insurance-policies", "component": __pages_import_114__, "props": true, "meta": { "title": "Create a Travel Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-post-renters-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/post-renters-insurance-policies", "component": __pages_import_115__, "props": true, "meta": { "title": "Create a Renters Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-post-motor-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/post-motor-insurance-policies", "component": __pages_import_116__, "props": true, "meta": { "title": "Create a Motor Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-post-life-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/post-life-insurance-policies", "component": __pages_import_117__, "props": true, "meta": { "title": "Create a Life Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-post-home-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/post-home-insurance-policies", "component": __pages_import_118__, "props": true, "meta": { "title": "Create a Home Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-post-health-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/post-health-insurance-policies", "component": __pages_import_119__, "props": true, "meta": { "title": "Create a Health Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-post-employment-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/post-employment-insurance-policies", "component": __pages_import_120__, "props": true, "meta": { "title": "Create a Employment Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-patch-travel-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/patch-travel-insurance-quotes-QuoteId", "component": __pages_import_121__, "props": true, "meta": { "title": "Accept a Travel Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-patch-renters-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/patch-renters-insurance-quotes-QuoteId", "component": __pages_import_122__, "props": true, "meta": { "title": "Accept a Renters Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-patch-motor-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/patch-motor-insurance-quotes-QuoteId", "component": __pages_import_123__, "props": true, "meta": { "title": "Accept a Motor Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-patch-life-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/patch-life-insurance-quotes-QuoteId", "component": __pages_import_124__, "props": true, "meta": { "title": "Accept a Life Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-patch-home-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/patch-home-insurance-quotes-QuoteId", "component": __pages_import_125__, "props": true, "meta": { "title": "Accept a Home Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-patch-health-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/patch-health-insurance-quotes-QuoteId", "component": __pages_import_126__, "props": true, "meta": { "title": "Accept a Health Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-patch-employment-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/patch-employment-insurance-quotes-QuoteId", "component": __pages_import_127__, "props": true, "meta": { "title": "Accept a Employment Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-motor-insurance-quotes", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/motor-insurance-quotes", "component": __pages_import_128__, "props": true, "meta": { "title": "Create a Motor Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-life-insurance-quotes", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/life-insurance-quotes", "component": __pages_import_129__, "props": true, "meta": { "title": "Create a Life Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-home-insurance-quotes", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/home-insurance-quotes", "component": __pages_import_130__, "props": true, "meta": { "title": "Create a Home Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-health-insurance-quotes", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/health-insurance-quotes", "component": __pages_import_131__, "props": true, "meta": { "title": "Create a Health Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-get-travel-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId", "component": __pages_import_132__, "props": true, "meta": { "title": "Retrieve a Travel Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-get-renters-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId", "component": __pages_import_133__, "props": true, "meta": { "title": "Retrieve a Renters Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-get-motor-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId", "component": __pages_import_134__, "props": true, "meta": { "title": "Retrieve a Motor Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-get-life-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId", "component": __pages_import_135__, "props": true, "meta": { "title": "Retrieve a Life Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-get-home-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId", "component": __pages_import_136__, "props": true, "meta": { "title": "Retrieve a Home Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-get-health-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId", "component": __pages_import_137__, "props": true, "meta": { "title": "Retrieve a Health Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-get-employment-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId", "component": __pages_import_138__, "props": true, "meta": { "title": "Retrieve a Employment Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-open-api-employment-insurance-quotes", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/open-api/employment-insurance-quotes", "component": __pages_import_139__, "props": true, "meta": { "title": "Create a Employment Insurance Quote" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-api-guide-tpp-led", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/tpp-led", "component": __pages_import_140__, "props": true, "meta": { "title": "Insurance Quotation — TPP-Led Flow" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-api-guide-lfi-led", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide/lfi-led", "component": __pages_import_141__, "props": true, "meta": { "title": "Insurance Quotation — LFI-Led Flow" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/api-guide", "component": __pages_import_142__, "props": true, "meta": { "title": "Insurance Quotation — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-travel-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/travel-insurance-policies", "component": __pages_import_143__, "props": true, "meta": { "title": "Get Travel Insurance Policies" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-travel-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/travel-insurance-policies-InsurancePolicyId", "component": __pages_import_144__, "props": true, "meta": { "title": "Get a Travel Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-renters-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/renters-insurance-policies", "component": __pages_import_145__, "props": true, "meta": { "title": "Get Renters Insurance Policies" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-renters-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/renters-insurance-policies-InsurancePolicyId", "component": __pages_import_146__, "props": true, "meta": { "title": "Get a Renters Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-motor-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/motor-insurance-policies", "component": __pages_import_147__, "props": true, "meta": { "title": "Get Motor Insurance Policies" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-motor-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/motor-insurance-policies-InsurancePolicyId", "component": __pages_import_148__, "props": true, "meta": { "title": "Get a Motor Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-life-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/life-insurance-policies", "component": __pages_import_149__, "props": true, "meta": { "title": "Get Life Insurance Policies" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-life-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/life-insurance-policies-InsurancePolicyId", "component": __pages_import_150__, "props": true, "meta": { "title": "Get a Life Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-home-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/home-insurance-policies", "component": __pages_import_151__, "props": true, "meta": { "title": "Get Home Insurance Policies" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-home-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/home-insurance-policies-InsurancePolicyId", "component": __pages_import_152__, "props": true, "meta": { "title": "Get a Home Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-health-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/health-insurance-policies", "component": __pages_import_153__, "props": true, "meta": { "title": "Get Health Insurance Policies" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-health-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/health-insurance-policies-InsurancePolicyId", "component": __pages_import_154__, "props": true, "meta": { "title": "Get a Health Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-employment-insurance-policies", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/employment-insurance-policies", "component": __pages_import_155__, "props": true, "meta": { "title": "Get Employment Insurance Policies" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-open-api-employment-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/open-api/employment-insurance-policies-InsurancePolicyId", "component": __pages_import_156__, "props": true, "meta": { "title": "Get an Employment Insurance Policy" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-api-guide-premiums", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide/premiums", "component": __pages_import_157__, "props": true, "meta": { "title": "Insurance Data Sharing — Encrypted Premiums" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/api-guide", "component": __pages_import_158__, "props": true, "meta": { "title": "Insurance Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-data-deletion-confirmation-open-api-post-payment-consents-ConsentId-attestations", "path": "/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/post-payment-consents-ConsentId-attestations", "component": __pages_import_159__, "props": true, "meta": { "title": "Append a Bank Service Initiation Attestation Event" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-data-deletion-confirmation-open-api-post-insurance-consents-ConsentId-attestations", "path": "/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/post-insurance-consents-ConsentId-attestations", "component": __pages_import_160__, "props": true, "meta": { "title": "Append an Insurance Attestation Event" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-data-deletion-confirmation-open-api-post-account-access-consents-ConsentId-attestations", "path": "/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/post-account-access-consents-ConsentId-attestations", "component": __pages_import_161__, "props": true, "meta": { "title": "Append a Bank Data Sharing Attestation Event" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-data-deletion-confirmation-open-api-get-payment-consents-ConsentId-attestations", "path": "/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/get-payment-consents-ConsentId-attestations", "component": __pages_import_162__, "props": true, "meta": { "title": "List Bank Service Initiation Attestation Events" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-data-deletion-confirmation-open-api-get-insurance-consents-ConsentId-attestations", "path": "/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/get-insurance-consents-ConsentId-attestations", "component": __pages_import_163__, "props": true, "meta": { "title": "List Insurance Attestation Events" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-data-deletion-confirmation-open-api-get-account-access-consents-ConsentId-attestations", "path": "/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation/open-api/get-account-access-consents-ConsentId-attestations", "component": __pages_import_164__, "props": true, "meta": { "title": "List Bank Data Sharing Attestation Events" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-consent-management-interface-insurance-data-sharing-user-experience", "path": "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/insurance-data-sharing/user-experience", "component": __pages_import_165__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-consent-management-interface-insurance-data-sharing-requirements", "path": "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/insurance-data-sharing/requirements", "component": __pages_import_166__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-consent-management-interface-bank-service-initiation-user-experience", "path": "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-service-initiation/user-experience", "component": __pages_import_167__, "props": true, "meta": { "title": "CMI — Bank Service Initiation User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-consent-management-interface-bank-service-initiation-requirements", "path": "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-service-initiation/requirements", "component": __pages_import_168__, "props": true, "meta": { "title": "CMI — Bank Service Initiation Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-consent-management-interface-bank-data-sharing-user-experience", "path": "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-data-sharing/user-experience", "component": __pages_import_169__, "props": true, "meta": { "title": "CMI — Bank Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-consent-management-interface-bank-data-sharing-requirements", "path": "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface/bank-data-sharing/requirements", "component": __pages_import_170__, "props": true, "meta": { "title": "CMI — Bank Data Sharing Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-refunds-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/refunds/requirements", "component": __pages_import_171__, "props": true, "meta": { "title": "Payment Refunds — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-refunds-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/refunds/api-guide", "component": __pages_import_172__, "props": true, "meta": { "title": "Payment Refunds — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-personal-identifiable-information-risk", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/risk", "component": __pages_import_173__, "props": true, "meta": { "title": "Risk" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-personal-identifiable-information", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information", "component": __pages_import_174__, "props": true, "meta": { "title": "Personal Identifiable Information (PII)", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-personal-identifiable-information-debtor-account", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account", "component": __pages_import_175__, "props": true, "meta": { "title": "Debtor Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-personal-identifiable-information-creditor", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor", "component": __pages_import_176__, "props": true, "meta": { "title": "Creditor" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-open-api-payments", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments", "component": __pages_import_177__, "props": true, "meta": { "title": "Create a Payment" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-open-api-payments-PaymentId", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId", "component": __pages_import_178__, "props": true, "meta": { "title": "Get a Payment" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-open-api-payments-idempotency", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payments-idempotency", "component": __pages_import_179__, "props": true, "meta": { "title": "Get a PaymentId from Idempotency Key" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-open-api-payment-consents-ConsentId-refund", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/open-api/payment-consents-ConsentId-refund", "component": __pages_import_180__, "props": true, "meta": { "title": "Get Account Details for a Refund" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-products-leads-open-api-products", "path": "/tech/tpp-standards/v2.2-rc1/banking/products-leads/open-api/products", "component": __pages_import_181__, "props": true, "meta": { "title": "Retrieve Banking products currently publicly available" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-products-leads-open-api-leads", "path": "/tech/tpp-standards/v2.2-rc1/banking/products-leads/open-api/leads", "component": __pages_import_182__, "props": true, "meta": { "title": "Provide user lead details" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-parties", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/parties", "component": __pages_import_183__, "props": true, "meta": { "title": "Get Customers" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts", "component": __pages_import_184__, "props": true, "meta": { "title": "Get Accounts" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId", "component": __pages_import_185__, "props": true, "meta": { "title": "Get an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-transactions", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-transactions", "component": __pages_import_186__, "props": true, "meta": { "title": "Get Transactions for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-statements", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-statements", "component": __pages_import_187__, "props": true, "meta": { "title": "Get Statements for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-standing-orders", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-standing-orders", "component": __pages_import_188__, "props": true, "meta": { "title": "Get Standing Orders for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-scheduled-payments", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments", "component": __pages_import_189__, "props": true, "meta": { "title": "Get Scheduled Payments for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-product", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-product", "component": __pages_import_190__, "props": true, "meta": { "title": "Get Product Configuration for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-parties", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-parties", "component": __pages_import_191__, "props": true, "meta": { "title": "Get Customer for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-direct-debits", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-direct-debits", "component": __pages_import_192__, "props": true, "meta": { "title": "Get Direct Debits for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-beneficiaries", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries", "component": __pages_import_193__, "props": true, "meta": { "title": "Get Beneficiaries for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-balances", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-balances", "component": __pages_import_194__, "props": true, "meta": { "title": "Get Balances for an Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-api-guide-pagination", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/pagination", "component": __pages_import_195__, "props": true, "meta": { "title": "Bank Data Sharing — Pagination" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide", "component": __pages_import_196__, "props": true, "meta": { "title": "Bank Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-api-guide-finance-rates", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/api-guide/finance-rates", "component": __pages_import_197__, "props": true, "meta": { "title": "Bank Data Sharing — Encrypted FinanceRates" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-confirmation-of-payee-open-api-discovery", "path": "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/open-api/discovery", "component": __pages_import_198__, "props": true, "meta": { "title": "Discover the LFI that will confirm the payee" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-confirmation-of-payee-open-api-confirmation", "path": "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/open-api/confirmation", "component": __pages_import_199__, "props": true, "meta": { "title": "Confirm the IBAN matches the Name on the Account" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-atms-open-api-atms", "path": "/tech/tpp-standards/v2.2-rc1/banking/atms/open-api/atms", "component": __pages_import_200__, "props": true, "meta": { "title": "Retrieve ATMs" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-travel-insurance-quotes", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/travel-insurance-quotes", "component": __pages_import_201__, "props": true, "meta": { "title": "Create a Travel Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-renters-insurance-quotes", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/renters-insurance-quotes", "component": __pages_import_202__, "props": true, "meta": { "title": "Create a Renters Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-post-travel-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-travel-insurance-policies", "component": __pages_import_203__, "props": true, "meta": { "title": "Create a Travel Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-post-renters-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-renters-insurance-policies", "component": __pages_import_204__, "props": true, "meta": { "title": "Create a Renters Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-post-motor-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-motor-insurance-policies", "component": __pages_import_205__, "props": true, "meta": { "title": "Create a Motor Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-post-life-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-life-insurance-policies", "component": __pages_import_206__, "props": true, "meta": { "title": "Create a Life Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-post-home-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-home-insurance-policies", "component": __pages_import_207__, "props": true, "meta": { "title": "Create a Home Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-post-health-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-health-insurance-policies", "component": __pages_import_208__, "props": true, "meta": { "title": "Create a Health Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-post-employment-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/post-employment-insurance-policies", "component": __pages_import_209__, "props": true, "meta": { "title": "Create a Employment Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-patch-travel-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-travel-insurance-quotes-QuoteId", "component": __pages_import_210__, "props": true, "meta": { "title": "Accept a Travel Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-patch-renters-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-renters-insurance-quotes-QuoteId", "component": __pages_import_211__, "props": true, "meta": { "title": "Accept a Renters Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-patch-motor-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-motor-insurance-quotes-QuoteId", "component": __pages_import_212__, "props": true, "meta": { "title": "Accept a Motor Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-patch-life-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-life-insurance-quotes-QuoteId", "component": __pages_import_213__, "props": true, "meta": { "title": "Accept a Life Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-patch-home-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-home-insurance-quotes-QuoteId", "component": __pages_import_214__, "props": true, "meta": { "title": "Accept a Home Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-patch-health-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-health-insurance-quotes-QuoteId", "component": __pages_import_215__, "props": true, "meta": { "title": "Accept a Health Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-patch-employment-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/patch-employment-insurance-quotes-QuoteId", "component": __pages_import_216__, "props": true, "meta": { "title": "Accept a Employment Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-motor-insurance-quotes", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/motor-insurance-quotes", "component": __pages_import_217__, "props": true, "meta": { "title": "Create a Motor Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-life-insurance-quotes", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/life-insurance-quotes", "component": __pages_import_218__, "props": true, "meta": { "title": "Create a Life Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-home-insurance-quotes", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/home-insurance-quotes", "component": __pages_import_219__, "props": true, "meta": { "title": "Create a Home Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-health-insurance-quotes", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/health-insurance-quotes", "component": __pages_import_220__, "props": true, "meta": { "title": "Create a Health Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-get-travel-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId", "component": __pages_import_221__, "props": true, "meta": { "title": "Retrieve a Travel Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-get-renters-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId", "component": __pages_import_222__, "props": true, "meta": { "title": "Retrieve a Renters Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-get-motor-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId", "component": __pages_import_223__, "props": true, "meta": { "title": "Retrieve a Motor Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-get-life-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId", "component": __pages_import_224__, "props": true, "meta": { "title": "Retrieve a Life Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-get-home-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId", "component": __pages_import_225__, "props": true, "meta": { "title": "Retrieve a Home Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-get-health-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId", "component": __pages_import_226__, "props": true, "meta": { "title": "Retrieve a Health Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-get-employment-insurance-quotes-QuoteId", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId", "component": __pages_import_227__, "props": true, "meta": { "title": "Retrieve a Employment Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-open-api-employment-insurance-quotes", "path": "/tech/tpp-standards/v2.1/insurance/quotation/open-api/employment-insurance-quotes", "component": __pages_import_228__, "props": true, "meta": { "title": "Create a Employment Insurance Quote" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-api-guide-tpp-led", "path": "/tech/tpp-standards/v2.1/insurance/quotation/api-guide/tpp-led", "component": __pages_import_229__, "props": true, "meta": { "title": "Insurance Quotation — TPP-Led Flow" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-api-guide-lfi-led", "path": "/tech/tpp-standards/v2.1/insurance/quotation/api-guide/lfi-led", "component": __pages_import_230__, "props": true, "meta": { "title": "Insurance Quotation — LFI-Led Flow" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-api-guide", "path": "/tech/tpp-standards/v2.1/insurance/quotation/api-guide", "component": __pages_import_231__, "props": true, "meta": { "title": "Insurance Quotation — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-travel-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/travel-insurance-policies", "component": __pages_import_232__, "props": true, "meta": { "title": "Get Travel Insurance Policies" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-travel-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/travel-insurance-policies-InsurancePolicyId", "component": __pages_import_233__, "props": true, "meta": { "title": "Get a Travel Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-renters-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/renters-insurance-policies", "component": __pages_import_234__, "props": true, "meta": { "title": "Get Renters Insurance Policies" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-renters-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/renters-insurance-policies-InsurancePolicyId", "component": __pages_import_235__, "props": true, "meta": { "title": "Get a Renters Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-motor-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies", "component": __pages_import_236__, "props": true, "meta": { "title": "Get Motor Insurance Policies" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-motor-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/motor-insurance-policies-InsurancePolicyId", "component": __pages_import_237__, "props": true, "meta": { "title": "Get a Motor Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-life-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/life-insurance-policies", "component": __pages_import_238__, "props": true, "meta": { "title": "Get Life Insurance Policies" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-life-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/life-insurance-policies-InsurancePolicyId", "component": __pages_import_239__, "props": true, "meta": { "title": "Get a Life Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-home-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/home-insurance-policies", "component": __pages_import_240__, "props": true, "meta": { "title": "Get Home Insurance Policies" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-home-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/home-insurance-policies-InsurancePolicyId", "component": __pages_import_241__, "props": true, "meta": { "title": "Get a Home Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-health-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/health-insurance-policies", "component": __pages_import_242__, "props": true, "meta": { "title": "Get Health Insurance Policies" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-health-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/health-insurance-policies-InsurancePolicyId", "component": __pages_import_243__, "props": true, "meta": { "title": "Get a Health Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-employment-insurance-policies", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/employment-insurance-policies", "component": __pages_import_244__, "props": true, "meta": { "title": "Get Employment Insurance Policies" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-open-api-employment-insurance-policies-InsurancePolicyId", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/open-api/employment-insurance-policies-InsurancePolicyId", "component": __pages_import_245__, "props": true, "meta": { "title": "Get an Employment Insurance Policy" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-api-guide-premiums", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums", "component": __pages_import_246__, "props": true, "meta": { "title": "Insurance Data Sharing — Encrypted Premiums" } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-api-guide", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide", "component": __pages_import_247__, "props": true, "meta": { "title": "Insurance Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-consent-consent-management-interface-insurance-data-sharing-user-experience", "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/insurance-data-sharing/user-experience", "component": __pages_import_248__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-consent-consent-management-interface-insurance-data-sharing-requirements", "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/insurance-data-sharing/requirements", "component": __pages_import_249__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-consent-consent-management-interface-bank-service-initiation-user-experience", "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-service-initiation/user-experience", "component": __pages_import_250__, "props": true, "meta": { "title": "CMI — Bank Service Initiation User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-consent-consent-management-interface-bank-service-initiation-requirements", "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-service-initiation/requirements", "component": __pages_import_251__, "props": true, "meta": { "title": "CMI — Bank Service Initiation Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-consent-consent-management-interface-bank-data-sharing-user-experience", "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-data-sharing/user-experience", "component": __pages_import_252__, "props": true, "meta": { "title": "CMI — Bank Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-consent-consent-management-interface-bank-data-sharing-requirements", "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface/bank-data-sharing/requirements", "component": __pages_import_253__, "props": true, "meta": { "title": "CMI — Bank Data Sharing Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-refunds-requirements", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/refunds/requirements", "component": __pages_import_254__, "props": true, "meta": { "title": "Payment Refunds — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-refunds-api-guide", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/refunds/api-guide", "component": __pages_import_255__, "props": true, "meta": { "title": "Payment Refunds — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-personal-identifiable-information-risk", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/risk", "component": __pages_import_256__, "props": true, "meta": { "title": "Risk" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-personal-identifiable-information", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information", "component": __pages_import_257__, "props": true, "meta": { "title": "Personal Identifiable Information (PII)", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-personal-identifiable-information-debtor-account", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/debtor-account", "component": __pages_import_258__, "props": true, "meta": { "title": "Debtor Account" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-personal-identifiable-information-creditor", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor", "component": __pages_import_259__, "props": true, "meta": { "title": "Creditor" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-open-api-payments", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments", "component": __pages_import_260__, "props": true, "meta": { "title": "Create a Payment" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-open-api-payments-PaymentId", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId", "component": __pages_import_261__, "props": true, "meta": { "title": "Get a Payment" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-open-api-payments-idempotency", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency", "component": __pages_import_262__, "props": true, "meta": { "title": "Get a PaymentId from Idempotency Key" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-open-api-payment-consents-ConsentId-refund", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund", "component": __pages_import_263__, "props": true, "meta": { "title": "Get Account Details for a Refund" } }, { "name": "tech-tpp-standards-v2.1-banking-products-leads-open-api-products", "path": "/tech/tpp-standards/v2.1/banking/products-leads/open-api/products", "component": __pages_import_264__, "props": true, "meta": { "title": "Retrieve Banking products currently publicly available" } }, { "name": "tech-tpp-standards-v2.1-banking-products-leads-open-api-leads", "path": "/tech/tpp-standards/v2.1/banking/products-leads/open-api/leads", "component": __pages_import_265__, "props": true, "meta": { "title": "Provide user lead details" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-parties", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties", "component": __pages_import_266__, "props": true, "meta": { "title": "Get Customers" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts", "component": __pages_import_267__, "props": true, "meta": { "title": "Get Accounts" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId", "component": __pages_import_268__, "props": true, "meta": { "title": "Get an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-transactions", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions", "component": __pages_import_269__, "props": true, "meta": { "title": "Get Transactions for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-statements", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements", "component": __pages_import_270__, "props": true, "meta": { "title": "Get Statements for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-standing-orders", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders", "component": __pages_import_271__, "props": true, "meta": { "title": "Get Standing Orders for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-scheduled-payments", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments", "component": __pages_import_272__, "props": true, "meta": { "title": "Get Scheduled Payments for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-product", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-product", "component": __pages_import_273__, "props": true, "meta": { "title": "Get Product Configuration for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-parties", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties", "component": __pages_import_274__, "props": true, "meta": { "title": "Get Customer for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-direct-debits", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits", "component": __pages_import_275__, "props": true, "meta": { "title": "Get Direct Debits for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-beneficiaries", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries", "component": __pages_import_276__, "props": true, "meta": { "title": "Get Beneficiaries for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-open-api-accounts-AccountId-balances", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances", "component": __pages_import_277__, "props": true, "meta": { "title": "Get Balances for an Account" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-api-guide-pagination", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/pagination", "component": __pages_import_278__, "props": true, "meta": { "title": "Bank Data Sharing — Pagination" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-api-guide", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide", "component": __pages_import_279__, "props": true, "meta": { "title": "Bank Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-api-guide-finance-rates", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/finance-rates", "component": __pages_import_280__, "props": true, "meta": { "title": "Bank Data Sharing — Encrypted FinanceRates" } }, { "name": "tech-tpp-standards-v2.1-banking-confirmation-of-payee-open-api-discovery", "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery", "component": __pages_import_281__, "props": true, "meta": { "title": "Discover the LFI that will confirm the payee" } }, { "name": "tech-tpp-standards-v2.1-banking-confirmation-of-payee-open-api-confirmation", "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation", "component": __pages_import_282__, "props": true, "meta": { "title": "Confirm the IBAN matches the Name on the Account" } }, { "name": "tech-tpp-standards-v2.1-banking-atms-open-api-atms", "path": "/tech/tpp-standards/v2.1/banking/atms/open-api/atms", "component": __pages_import_283__, "props": true, "meta": { "title": "Retrieve ATMs" } }, { "name": "tech-tpp-standards-production-testing-certification-functional-insurance-data-sharing-submission", "path": "/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/submission", "component": __pages_import_284__, "props": true, "meta": { "title": "Insurance Data Sharing — Functional Certification Submission" } }, { "name": "tech-tpp-standards-production-testing-certification-functional-insurance-data-sharing", "path": "/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing", "component": __pages_import_285__, "props": true, "meta": { "title": "Functional Certification — Insurance Data Sharing", "isIndex": true } }, { "name": "tech-tpp-standards-production-testing-certification-functional-domestic-payments-submission", "path": "/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission", "component": __pages_import_286__, "props": true, "meta": { "title": "Domestic Payments — Functional Certification Submission" } }, { "name": "tech-tpp-standards-production-testing-certification-functional-domestic-payments", "path": "/tech/tpp-standards/production/testing-certification/functional/domestic-payments", "component": __pages_import_287__, "props": true, "meta": { "title": "Functional Certification — Domestic Payments (TPP)", "isIndex": true } }, { "name": "tech-tpp-standards-production-testing-certification-functional-confirmation-of-payee-submission", "path": "/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee/submission", "component": __pages_import_288__, "props": true, "meta": { "title": "Confirmation of Payee — Functional Certification Submission" } }, { "name": "tech-tpp-standards-production-testing-certification-functional-confirmation-of-payee", "path": "/tech/tpp-standards/production/testing-certification/functional/confirmation-of-payee", "component": __pages_import_289__, "props": true, "meta": { "title": "Functional Certification — Confirmation of Payee", "isIndex": true } }, { "name": "tech-tpp-standards-production-testing-certification-functional-bank-data-sharing-submission", "path": "/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing/submission", "component": __pages_import_290__, "props": true, "meta": { "title": "Bank Data Sharing — Functional Certification Submission" } }, { "name": "tech-tpp-standards-production-testing-certification-functional-bank-data-sharing", "path": "/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing", "component": __pages_import_291__, "props": true, "meta": { "title": "Functional Certification — Bank Data Sharing", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-travel-insurance-quotes", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/travel-insurance-quotes", "component": __pages_import_292__, "props": true, "meta": { "title": "Create a Travel Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-renters-insurance-quotes", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/renters-insurance-quotes", "component": __pages_import_293__, "props": true, "meta": { "title": "Create a Renters Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-post-travel-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/post-travel-insurance-policies", "component": __pages_import_294__, "props": true, "meta": { "title": "Create a Travel Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-post-renters-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/post-renters-insurance-policies", "component": __pages_import_295__, "props": true, "meta": { "title": "Create a Renters Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-post-motor-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/post-motor-insurance-policies", "component": __pages_import_296__, "props": true, "meta": { "title": "Create a Motor Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-post-life-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/post-life-insurance-policies", "component": __pages_import_297__, "props": true, "meta": { "title": "Create a Life Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-post-home-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/post-home-insurance-policies", "component": __pages_import_298__, "props": true, "meta": { "title": "Create a Home Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-post-health-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/post-health-insurance-policies", "component": __pages_import_299__, "props": true, "meta": { "title": "Create a Health Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-post-employment-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/post-employment-insurance-policies", "component": __pages_import_300__, "props": true, "meta": { "title": "Create a Employment Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-patch-travel-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/patch-travel-insurance-quotes-QuoteId", "component": __pages_import_301__, "props": true, "meta": { "title": "Accept a Travel Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-patch-renters-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/patch-renters-insurance-quotes-QuoteId", "component": __pages_import_302__, "props": true, "meta": { "title": "Accept a Renters Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-patch-motor-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/patch-motor-insurance-quotes-QuoteId", "component": __pages_import_303__, "props": true, "meta": { "title": "Accept a Motor Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-patch-life-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/patch-life-insurance-quotes-QuoteId", "component": __pages_import_304__, "props": true, "meta": { "title": "Accept a Life Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-patch-home-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/patch-home-insurance-quotes-QuoteId", "component": __pages_import_305__, "props": true, "meta": { "title": "Accept a Home Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-patch-health-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/patch-health-insurance-quotes-QuoteId", "component": __pages_import_306__, "props": true, "meta": { "title": "Accept a Health Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-patch-employment-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/patch-employment-insurance-quotes-QuoteId", "component": __pages_import_307__, "props": true, "meta": { "title": "Accept a Employment Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-motor-insurance-quotes", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/motor-insurance-quotes", "component": __pages_import_308__, "props": true, "meta": { "title": "Create a Motor Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-life-insurance-quotes", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/life-insurance-quotes", "component": __pages_import_309__, "props": true, "meta": { "title": "Create a Life Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-home-insurance-quotes", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/home-insurance-quotes", "component": __pages_import_310__, "props": true, "meta": { "title": "Create a Home Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-health-insurance-quotes", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/health-insurance-quotes", "component": __pages_import_311__, "props": true, "meta": { "title": "Create a Health Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-get-travel-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId", "component": __pages_import_312__, "props": true, "meta": { "title": "Retrieve a Travel Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-get-renters-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId", "component": __pages_import_313__, "props": true, "meta": { "title": "Retrieve a Renters Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-get-motor-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId", "component": __pages_import_314__, "props": true, "meta": { "title": "Retrieve a Motor Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-get-life-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId", "component": __pages_import_315__, "props": true, "meta": { "title": "Retrieve a Life Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-get-home-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId", "component": __pages_import_316__, "props": true, "meta": { "title": "Retrieve a Home Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-get-health-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId", "component": __pages_import_317__, "props": true, "meta": { "title": "Retrieve a Health Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-get-employment-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId", "component": __pages_import_318__, "props": true, "meta": { "title": "Retrieve a Employment Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-open-api-employment-insurance-quotes", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/open-api/employment-insurance-quotes", "component": __pages_import_319__, "props": true, "meta": { "title": "Create a Employment Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-api-guide-tpp-led", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/api-guide/tpp-led", "component": __pages_import_320__, "props": true, "meta": { "title": "Insurance Quotation — TPP-Led Flow" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-api-guide-lfi-led", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/api-guide/lfi-led", "component": __pages_import_321__, "props": true, "meta": { "title": "Insurance Quotation — LFI-Led Flow" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/api-guide", "component": __pages_import_322__, "props": true, "meta": { "title": "Insurance Quotation — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-travel-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/travel-insurance-policies", "component": __pages_import_323__, "props": true, "meta": { "title": "Get Travel Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-travel-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/travel-insurance-policies-InsurancePolicyId", "component": __pages_import_324__, "props": true, "meta": { "title": "Get a Travel Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-renters-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/renters-insurance-policies", "component": __pages_import_325__, "props": true, "meta": { "title": "Get Renters Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-renters-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/renters-insurance-policies-InsurancePolicyId", "component": __pages_import_326__, "props": true, "meta": { "title": "Get a Renters Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-motor-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/motor-insurance-policies", "component": __pages_import_327__, "props": true, "meta": { "title": "Get Motor Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-motor-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/motor-insurance-policies-InsurancePolicyId", "component": __pages_import_328__, "props": true, "meta": { "title": "Get a Motor Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-life-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/life-insurance-policies", "component": __pages_import_329__, "props": true, "meta": { "title": "Get Life Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-life-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/life-insurance-policies-InsurancePolicyId", "component": __pages_import_330__, "props": true, "meta": { "title": "Get a Life Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-home-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/home-insurance-policies", "component": __pages_import_331__, "props": true, "meta": { "title": "Get Home Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-home-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/home-insurance-policies-InsurancePolicyId", "component": __pages_import_332__, "props": true, "meta": { "title": "Get a Home Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-health-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/health-insurance-policies", "component": __pages_import_333__, "props": true, "meta": { "title": "Get Health Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-health-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/health-insurance-policies-InsurancePolicyId", "component": __pages_import_334__, "props": true, "meta": { "title": "Get a Health Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-employment-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/employment-insurance-policies", "component": __pages_import_335__, "props": true, "meta": { "title": "Get Employment Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-open-api-employment-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/open-api/employment-insurance-policies-InsurancePolicyId", "component": __pages_import_336__, "props": true, "meta": { "title": "Get an Employment Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-api-guide-premiums", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/api-guide/premiums", "component": __pages_import_337__, "props": true, "meta": { "title": "Insurance Data Sharing — Encrypted Premiums" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/api-guide", "component": __pages_import_338__, "props": true, "meta": { "title": "Insurance Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-refunds-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/refunds/requirements", "component": __pages_import_339__, "props": true, "meta": { "title": "Payment Refunds — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-refunds-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/refunds/api-guide", "component": __pages_import_340__, "props": true, "meta": { "title": "Payment Refunds — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-personal-identifiable-information", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information", "component": __pages_import_341__, "props": true, "meta": { "title": "Personal Identifiable Information (PII)", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-personal-identifiable-information-debtor-account", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/debtor-account", "component": __pages_import_342__, "props": true, "meta": { "title": "Debtor Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-personal-identifiable-information-creditor", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/personal-identifiable-information/creditor", "component": __pages_import_343__, "props": true, "meta": { "title": "Creditor" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-open-api-payments", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments", "component": __pages_import_344__, "props": true, "meta": { "title": "Create a Payment" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-open-api-payments-PaymentId", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payments-PaymentId", "component": __pages_import_345__, "props": true, "meta": { "title": "Get a Payment by PaymentId" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-open-api-payment-consents-ConsentId-refund", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/open-api/payment-consents-ConsentId-refund", "component": __pages_import_346__, "props": true, "meta": { "title": "Retrieve Account Details for a Refund" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-field-mapping-payment-consents-ConsentId-refund", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/field-mapping/payment-consents-ConsentId-refund", "component": __pages_import_347__, "props": true, "meta": { "title": "Retrieve Account Details for a Refund — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-products-and-leads-open-api-products", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/open-api/products", "component": __pages_import_348__, "props": true, "meta": { "title": "Get Products" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-products-and-leads-open-api-leads", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/open-api/leads", "component": __pages_import_349__, "props": true, "meta": { "title": "Submit Lead" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-products-and-leads-field-mapping-products", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/field-mapping/products", "component": __pages_import_350__, "props": true, "meta": { "title": "Get Products — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-products-and-leads-field-mapping-leads", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/field-mapping/leads", "component": __pages_import_351__, "props": true, "meta": { "title": "Submit Lead — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-customer", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/customer", "component": __pages_import_352__, "props": true, "meta": { "title": "Get Customers" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts", "component": __pages_import_353__, "props": true, "meta": { "title": "Get Accounts" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId", "component": __pages_import_354__, "props": true, "meta": { "title": "Get an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-transactions", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-transactions", "component": __pages_import_355__, "props": true, "meta": { "title": "Get Transactions for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-statements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-statements", "component": __pages_import_356__, "props": true, "meta": { "title": "Get Statements for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-standing-orders", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-standing-orders", "component": __pages_import_357__, "props": true, "meta": { "title": "Get Standing Orders for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-scheduled-payments", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments", "component": __pages_import_358__, "props": true, "meta": { "title": "Get Scheduled Payments for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-products", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-products", "component": __pages_import_359__, "props": true, "meta": { "title": "Get Product Configuration for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-direct-debits", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-direct-debits", "component": __pages_import_360__, "props": true, "meta": { "title": "Get Direct Debits for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-customer", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-customer", "component": __pages_import_361__, "props": true, "meta": { "title": "Get Customer for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-beneficiaries", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries", "component": __pages_import_362__, "props": true, "meta": { "title": "Get Beneficiaries for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-open-api-accounts-AccountId-balances", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/open-api/accounts-AccountId-balances", "component": __pages_import_363__, "props": true, "meta": { "title": "Get Balances for an Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-customer", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/customer", "component": __pages_import_364__, "props": true, "meta": { "title": "Get Customers — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts", "component": __pages_import_365__, "props": true, "meta": { "title": "Get Accounts — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId", "component": __pages_import_366__, "props": true, "meta": { "title": "Get an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-transactions", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-transactions", "component": __pages_import_367__, "props": true, "meta": { "title": "Get Transactions for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-statements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-statements", "component": __pages_import_368__, "props": true, "meta": { "title": "Get Statements for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-standing-orders", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-standing-orders", "component": __pages_import_369__, "props": true, "meta": { "title": "Get Standing Orders for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-scheduled-payments", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-scheduled-payments", "component": __pages_import_370__, "props": true, "meta": { "title": "Get Scheduled Payments for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-products", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-products", "component": __pages_import_371__, "props": true, "meta": { "title": "Get Product Configuration for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-direct-debits", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-direct-debits", "component": __pages_import_372__, "props": true, "meta": { "title": "Get Direct Debits for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-customer", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-customer", "component": __pages_import_373__, "props": true, "meta": { "title": "Get Customer for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-beneficiaries", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-beneficiaries", "component": __pages_import_374__, "props": true, "meta": { "title": "Get Beneficiaries for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-field-mapping-accounts-AccountId-balances", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/field-mapping/accounts-AccountId-balances", "component": __pages_import_375__, "props": true, "meta": { "title": "Get Balances for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-api-guide-pagination", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/pagination", "component": __pages_import_376__, "props": true, "meta": { "title": "Bank Data Sharing — Pagination" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide", "component": __pages_import_377__, "props": true, "meta": { "title": "Bank Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-api-guide-finance-rates", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/api-guide/finance-rates", "component": __pages_import_378__, "props": true, "meta": { "title": "Bank Data Sharing — Encrypted FinanceRates" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-confirmation-of-payee-open-api-cop-query", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/open-api/cop-query", "component": __pages_import_379__, "props": true, "meta": { "title": "Confirm the IBAN matches the Name on the Account" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-atms-open-api-atm", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/atms/open-api/atm", "component": __pages_import_380__, "props": true, "meta": { "title": "Retrieve ATMs" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-atms-field-mapping-atm", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/atms/field-mapping/atm", "component": __pages_import_381__, "props": true, "meta": { "title": "Retrieve ATMs — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-environment-specific-ozone-connect-url", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/ozone-connect-url", "component": __pages_import_382__, "props": true, "meta": { "title": "Ozone Connect Base URL" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-environment-specific", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific", "component": __pages_import_383__, "props": true, "meta": { "title": "Environment Specific Configuration", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-environment-specific-certificate-walkthroughs", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/certificate-walkthroughs", "component": __pages_import_384__, "props": true, "meta": { "title": "Certificate Walkthroughs" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-environment-specific-auth-endpoint", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/environment-specific/auth-endpoint", "component": __pages_import_385__, "props": true, "meta": { "title": "Authorization Endpoint" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-configuring-authentication-mtls-server", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-server", "component": __pages_import_386__, "props": true, "meta": { "title": "Configuring Inbound mTLS" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-configuring-authentication-mtls-client", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/mtls-client", "component": __pages_import_387__, "props": true, "meta": { "title": "Configuring Outbound mTLS" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-configuring-authentication-jwt-server", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-server", "component": __pages_import_388__, "props": true, "meta": { "title": "JWT Auth — Server-side" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-configuring-authentication-jwt-client", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/configuring-authentication/jwt-client", "component": __pages_import_389__, "props": true, "meta": { "title": "JWT Auth — Client-side" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-headless-heimdall-open-api-hello-mtls", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/hello-mtls", "component": __pages_import_390__, "props": true, "meta": { "title": "Hello MTLS" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-headless-heimdall-open-api-auth", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth", "component": __pages_import_391__, "props": true, "meta": { "title": "Get Auth" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-headless-heimdall-open-api-auth-interactionId-doFail", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail", "component": __pages_import_392__, "props": true, "meta": { "title": "Fail Authorization" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-headless-heimdall-open-api-auth-interactionId-doConfirm", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm", "component": __pages_import_393__, "props": true, "meta": { "title": "Confirm Authorization" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-psu-userId-consents", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/psu-userId-consents", "component": __pages_import_394__, "props": true, "meta": { "title": "Get Consents by End User" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-payment-log", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log", "component": __pages_import_395__, "props": true, "meta": { "title": "Get Payment Log" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-payment-log-id", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/payment-log-id", "component": __pages_import_396__, "props": true, "meta": { "title": "Update Payment Log Entry" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-patch-consents-consentId", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/patch-consents-consentId", "component": __pages_import_397__, "props": true, "meta": { "title": "Update Consent by ID" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-insurance-quote-log-logId", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/insurance-quote-log-logId", "component": __pages_import_398__, "props": true, "meta": { "title": "Patch Insurance Quote Log" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-hello-mtls", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/hello-mtls", "component": __pages_import_399__, "props": true, "meta": { "title": "Hello MTLS" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-consents", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents", "component": __pages_import_400__, "props": true, "meta": { "title": "Get Consents" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-consents-consentId", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId", "component": __pages_import_401__, "props": true, "meta": { "title": "Get Consent by ID" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-consents-consentId-audit", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-audit", "component": __pages_import_402__, "props": true, "meta": { "title": "Get Consent Audit" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-consents-consentId-action-revoke", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consents-consentId-action-revoke", "component": __pages_import_403__, "props": true, "meta": { "title": "Revoke Consent" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-consent-groups-consentGroupId-consents", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents", "component": __pages_import_404__, "props": true, "meta": { "title": "Get Consents in Consent Group" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-consent-groups-consentGroupId-consents-action-revoke", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke", "component": __pages_import_405__, "props": true, "meta": { "title": "Revoke Consents in Consent Group" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager-open-api-accounts-accountId-consents", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/accounts-accountId-consents", "component": __pages_import_406__, "props": true, "meta": { "title": "Get Consents by Account" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-travel-insurance-quotes", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/travel-insurance-quotes", "component": __pages_import_407__, "props": true, "meta": { "title": "Create a Travel Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-renters-insurance-quotes", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/renters-insurance-quotes", "component": __pages_import_408__, "props": true, "meta": { "title": "Create a Renters Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-post-travel-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-travel-insurance-policies", "component": __pages_import_409__, "props": true, "meta": { "title": "Create a Travel Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-post-renters-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-renters-insurance-policies", "component": __pages_import_410__, "props": true, "meta": { "title": "Create a Renters Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-post-motor-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-motor-insurance-policies", "component": __pages_import_411__, "props": true, "meta": { "title": "Create a Motor Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-post-life-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-life-insurance-policies", "component": __pages_import_412__, "props": true, "meta": { "title": "Create a Life Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-post-home-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-home-insurance-policies", "component": __pages_import_413__, "props": true, "meta": { "title": "Create a Home Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-post-health-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-health-insurance-policies", "component": __pages_import_414__, "props": true, "meta": { "title": "Create a Health Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-post-employment-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/post-employment-insurance-policies", "component": __pages_import_415__, "props": true, "meta": { "title": "Create a Employment Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-patch-travel-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-travel-insurance-quotes-QuoteId", "component": __pages_import_416__, "props": true, "meta": { "title": "Accept a Travel Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-patch-renters-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-renters-insurance-quotes-QuoteId", "component": __pages_import_417__, "props": true, "meta": { "title": "Accept a Renters Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-patch-motor-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-motor-insurance-quotes-QuoteId", "component": __pages_import_418__, "props": true, "meta": { "title": "Accept a Motor Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-patch-life-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-life-insurance-quotes-QuoteId", "component": __pages_import_419__, "props": true, "meta": { "title": "Accept a Life Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-patch-home-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-home-insurance-quotes-QuoteId", "component": __pages_import_420__, "props": true, "meta": { "title": "Accept a Home Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-patch-health-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-health-insurance-quotes-QuoteId", "component": __pages_import_421__, "props": true, "meta": { "title": "Accept a Health Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-patch-employment-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/patch-employment-insurance-quotes-QuoteId", "component": __pages_import_422__, "props": true, "meta": { "title": "Accept a Employment Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-motor-insurance-quotes", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/motor-insurance-quotes", "component": __pages_import_423__, "props": true, "meta": { "title": "Create a Motor Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-life-insurance-quotes", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/life-insurance-quotes", "component": __pages_import_424__, "props": true, "meta": { "title": "Create a Life Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-home-insurance-quotes", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/home-insurance-quotes", "component": __pages_import_425__, "props": true, "meta": { "title": "Create a Home Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-health-insurance-quotes", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/health-insurance-quotes", "component": __pages_import_426__, "props": true, "meta": { "title": "Create a Health Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-get-travel-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId", "component": __pages_import_427__, "props": true, "meta": { "title": "Retrieve a Travel Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-get-renters-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId", "component": __pages_import_428__, "props": true, "meta": { "title": "Retrieve a Renters Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-get-motor-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId", "component": __pages_import_429__, "props": true, "meta": { "title": "Retrieve a Motor Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-get-life-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId", "component": __pages_import_430__, "props": true, "meta": { "title": "Retrieve a Life Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-get-home-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId", "component": __pages_import_431__, "props": true, "meta": { "title": "Retrieve a Home Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-get-health-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId", "component": __pages_import_432__, "props": true, "meta": { "title": "Retrieve a Health Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-get-employment-insurance-quotes-QuoteId", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId", "component": __pages_import_433__, "props": true, "meta": { "title": "Retrieve a Employment Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-open-api-employment-insurance-quotes", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/employment-insurance-quotes", "component": __pages_import_434__, "props": true, "meta": { "title": "Create a Employment Insurance Quote" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-api-guide-tpp-led", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/tpp-led", "component": __pages_import_435__, "props": true, "meta": { "title": "Insurance Quotation — TPP-Led Flow" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-api-guide-lfi-led", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide/lfi-led", "component": __pages_import_436__, "props": true, "meta": { "title": "Insurance Quotation — LFI-Led Flow" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-api-guide", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/api-guide", "component": __pages_import_437__, "props": true, "meta": { "title": "Insurance Quotation — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-travel-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/travel-insurance-policies", "component": __pages_import_438__, "props": true, "meta": { "title": "Get Travel Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-travel-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/travel-insurance-policies-InsurancePolicyId", "component": __pages_import_439__, "props": true, "meta": { "title": "Get a Travel Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-renters-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/renters-insurance-policies", "component": __pages_import_440__, "props": true, "meta": { "title": "Get Renters Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-renters-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/renters-insurance-policies-InsurancePolicyId", "component": __pages_import_441__, "props": true, "meta": { "title": "Get a Renters Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-motor-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/motor-insurance-policies", "component": __pages_import_442__, "props": true, "meta": { "title": "Get Motor Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-motor-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/motor-insurance-policies-InsurancePolicyId", "component": __pages_import_443__, "props": true, "meta": { "title": "Get a Motor Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-life-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/life-insurance-policies", "component": __pages_import_444__, "props": true, "meta": { "title": "Get Life Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-life-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/life-insurance-policies-InsurancePolicyId", "component": __pages_import_445__, "props": true, "meta": { "title": "Get a Life Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-home-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/home-insurance-policies", "component": __pages_import_446__, "props": true, "meta": { "title": "Get Home Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-home-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/home-insurance-policies-InsurancePolicyId", "component": __pages_import_447__, "props": true, "meta": { "title": "Get a Home Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-health-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/health-insurance-policies", "component": __pages_import_448__, "props": true, "meta": { "title": "Get Health Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-health-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/health-insurance-policies-InsurancePolicyId", "component": __pages_import_449__, "props": true, "meta": { "title": "Get a Health Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-employment-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/employment-insurance-policies", "component": __pages_import_450__, "props": true, "meta": { "title": "Get Employment Insurance Policies" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-open-api-employment-insurance-policies-InsurancePolicyId", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/open-api/employment-insurance-policies-InsurancePolicyId", "component": __pages_import_451__, "props": true, "meta": { "title": "Get an Employment Insurance Policy" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-api-guide-premiums", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide/premiums", "component": __pages_import_452__, "props": true, "meta": { "title": "Insurance Data Sharing — Encrypted Premiums" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-api-guide", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/api-guide", "component": __pages_import_453__, "props": true, "meta": { "title": "Insurance Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-refunds-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/requirements", "component": __pages_import_454__, "props": true, "meta": { "title": "Payment Refunds — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-refunds-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/refunds/api-guide", "component": __pages_import_455__, "props": true, "meta": { "title": "Payment Refunds — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-personal-identifiable-information", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information", "component": __pages_import_456__, "props": true, "meta": { "title": "Personal Identifiable Information (PII)", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-personal-identifiable-information-debtor-account", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/debtor-account", "component": __pages_import_457__, "props": true, "meta": { "title": "Debtor Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-personal-identifiable-information-creditor", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor", "component": __pages_import_458__, "props": true, "meta": { "title": "Creditor" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-open-api-payments", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments", "component": __pages_import_459__, "props": true, "meta": { "title": "Create a Payment" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-open-api-payments-PaymentId", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId", "component": __pages_import_460__, "props": true, "meta": { "title": "Get a Payment by PaymentId" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-open-api-payment-consents-ConsentId-refund", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund", "component": __pages_import_461__, "props": true, "meta": { "title": "Retrieve Account Details for a Refund" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-field-mapping-payment-consents-ConsentId-refund", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/field-mapping/payment-consents-ConsentId-refund", "component": __pages_import_462__, "props": true, "meta": { "title": "Retrieve Account Details for a Refund — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-products-and-leads-open-api-products", "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/products", "component": __pages_import_463__, "props": true, "meta": { "title": "Get Products" } }, { "name": "tech-lfi-api-hub-v2.1-banking-products-and-leads-open-api-leads", "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/open-api/leads", "component": __pages_import_464__, "props": true, "meta": { "title": "Submit Lead" } }, { "name": "tech-lfi-api-hub-v2.1-banking-products-and-leads-field-mapping-products", "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/field-mapping/products", "component": __pages_import_465__, "props": true, "meta": { "title": "Get Products — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-products-and-leads-field-mapping-leads", "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/field-mapping/leads", "component": __pages_import_466__, "props": true, "meta": { "title": "Submit Lead — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-customer", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/customer", "component": __pages_import_467__, "props": true, "meta": { "title": "Get Customers" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts", "component": __pages_import_468__, "props": true, "meta": { "title": "Get Accounts" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId", "component": __pages_import_469__, "props": true, "meta": { "title": "Get an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-transactions", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions", "component": __pages_import_470__, "props": true, "meta": { "title": "Get Transactions for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-statements", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements", "component": __pages_import_471__, "props": true, "meta": { "title": "Get Statements for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-standing-orders", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders", "component": __pages_import_472__, "props": true, "meta": { "title": "Get Standing Orders for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-scheduled-payments", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments", "component": __pages_import_473__, "props": true, "meta": { "title": "Get Scheduled Payments for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-products", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products", "component": __pages_import_474__, "props": true, "meta": { "title": "Get Product Configuration for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-direct-debits", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-direct-debits", "component": __pages_import_475__, "props": true, "meta": { "title": "Get Direct Debits for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-customer", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-customer", "component": __pages_import_476__, "props": true, "meta": { "title": "Get Customer for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-beneficiaries", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries", "component": __pages_import_477__, "props": true, "meta": { "title": "Get Beneficiaries for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-open-api-accounts-AccountId-balances", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-balances", "component": __pages_import_478__, "props": true, "meta": { "title": "Get Balances for an Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-customer", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/customer", "component": __pages_import_479__, "props": true, "meta": { "title": "Get Customers — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts", "component": __pages_import_480__, "props": true, "meta": { "title": "Get Accounts — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId", "component": __pages_import_481__, "props": true, "meta": { "title": "Get an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-transactions", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-transactions", "component": __pages_import_482__, "props": true, "meta": { "title": "Get Transactions for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-statements", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-statements", "component": __pages_import_483__, "props": true, "meta": { "title": "Get Statements for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-standing-orders", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-standing-orders", "component": __pages_import_484__, "props": true, "meta": { "title": "Get Standing Orders for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-scheduled-payments", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-scheduled-payments", "component": __pages_import_485__, "props": true, "meta": { "title": "Get Scheduled Payments for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-products", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-products", "component": __pages_import_486__, "props": true, "meta": { "title": "Get Product Configuration for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-direct-debits", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-direct-debits", "component": __pages_import_487__, "props": true, "meta": { "title": "Get Direct Debits for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-customer", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-customer", "component": __pages_import_488__, "props": true, "meta": { "title": "Get Customer for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-beneficiaries", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-beneficiaries", "component": __pages_import_489__, "props": true, "meta": { "title": "Get Beneficiaries for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-field-mapping-accounts-AccountId-balances", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/field-mapping/accounts-AccountId-balances", "component": __pages_import_490__, "props": true, "meta": { "title": "Get Balances for an Account — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-api-guide-pagination", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/pagination", "component": __pages_import_491__, "props": true, "meta": { "title": "Bank Data Sharing — Pagination" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide", "component": __pages_import_492__, "props": true, "meta": { "title": "Bank Data Sharing — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-api-guide-finance-rates", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/finance-rates", "component": __pages_import_493__, "props": true, "meta": { "title": "Bank Data Sharing — Encrypted FinanceRates" } }, { "name": "tech-lfi-api-hub-v2.1-banking-confirmation-of-payee-open-api-cop-query", "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query", "component": __pages_import_494__, "props": true, "meta": { "title": "Confirm the IBAN matches the Name on the Account" } }, { "name": "tech-lfi-api-hub-v2.1-banking-atms-open-api-atm", "path": "/tech/lfi-api-hub/v2.1/banking/atms/open-api/atm", "component": __pages_import_495__, "props": true, "meta": { "title": "Retrieve ATMs" } }, { "name": "tech-lfi-api-hub-v2.1-banking-atms-field-mapping-atm", "path": "/tech/lfi-api-hub/v2.1/banking/atms/field-mapping/atm", "component": __pages_import_496__, "props": true, "meta": { "title": "Retrieve ATMs — Field Mapping" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-environment-specific-ozone-connect-url", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/ozone-connect-url", "component": __pages_import_497__, "props": true, "meta": { "title": "Ozone Connect Base URL" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-environment-specific", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific", "component": __pages_import_498__, "props": true, "meta": { "title": "Environment Specific Configuration", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-environment-specific-certificate-walkthroughs", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/certificate-walkthroughs", "component": __pages_import_499__, "props": true, "meta": { "title": "Certificate Walkthroughs" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-environment-specific-auth-endpoint", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint", "component": __pages_import_500__, "props": true, "meta": { "title": "Authorization Endpoint" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-configuring-authentication-mtls-server", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-server", "component": __pages_import_501__, "props": true, "meta": { "title": "Configuring Inbound mTLS" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-configuring-authentication-mtls-client", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/mtls-client", "component": __pages_import_502__, "props": true, "meta": { "title": "Configuring Outbound mTLS" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-configuring-authentication-jwt-server", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-server", "component": __pages_import_503__, "props": true, "meta": { "title": "JWT Auth — Server-side" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-configuring-authentication-jwt-client", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/configuring-authentication/jwt-client", "component": __pages_import_504__, "props": true, "meta": { "title": "JWT Auth — Client-side" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-headless-heimdall-open-api-hello-mtls", "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/hello-mtls", "component": __pages_import_505__, "props": true, "meta": { "title": "Hello MTLS" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-headless-heimdall-open-api-auth", "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth", "component": __pages_import_506__, "props": true, "meta": { "title": "Get Auth" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-headless-heimdall-open-api-auth-interactionId-doFail", "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doFail", "component": __pages_import_507__, "props": true, "meta": { "title": "Fail Authorization" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-headless-heimdall-open-api-auth-interactionId-doConfirm", "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm", "component": __pages_import_508__, "props": true, "meta": { "title": "Confirm Authorization" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-psu-userId-consents", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/psu-userId-consents", "component": __pages_import_509__, "props": true, "meta": { "title": "Get Consents by End User" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-payment-log", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log", "component": __pages_import_510__, "props": true, "meta": { "title": "Get Payment Log" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-payment-log-id", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id", "component": __pages_import_511__, "props": true, "meta": { "title": "Update Payment Log Entry" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-patch-consents-consentId", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId", "component": __pages_import_512__, "props": true, "meta": { "title": "Update Consent by ID" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-insurance-quote-log-logId", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/insurance-quote-log-logId", "component": __pages_import_513__, "props": true, "meta": { "title": "Patch Insurance Quote Log" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-hello-mtls", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/hello-mtls", "component": __pages_import_514__, "props": true, "meta": { "title": "Hello MTLS" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-consents", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents", "component": __pages_import_515__, "props": true, "meta": { "title": "Get Consents" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-consents-consentId", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId", "component": __pages_import_516__, "props": true, "meta": { "title": "Get Consent by ID" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-consents-consentId-audit", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-audit", "component": __pages_import_517__, "props": true, "meta": { "title": "Get Consent Audit" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-consents-consentId-action-revoke", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId-action-revoke", "component": __pages_import_518__, "props": true, "meta": { "title": "Revoke Consent" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-consent-groups-consentGroupId-consents", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents", "component": __pages_import_519__, "props": true, "meta": { "title": "Get Consents in Consent Group" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-consent-groups-consentGroupId-consents-action-revoke", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke", "component": __pages_import_520__, "props": true, "meta": { "title": "Revoke Consents in Consent Group" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager-open-api-accounts-accountId-consents", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/accounts-accountId-consents", "component": __pages_import_521__, "props": true, "meta": { "title": "Get Consents by Account" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-variable-periodic-schedule-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-periodic-schedule/submission", "component": __pages_import_522__, "props": true, "meta": { "title": "Variable Periodic Schedule — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-variable-periodic-schedule", "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-periodic-schedule", "component": __pages_import_523__, "props": true, "meta": { "title": "Functional Certification — Variable Periodic Schedule", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-variable-on-demand-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-on-demand/submission", "component": __pages_import_524__, "props": true, "meta": { "title": "Variable On-Demand — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-variable-on-demand", "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-on-demand", "component": __pages_import_525__, "props": true, "meta": { "title": "Functional Certification — Variable On-Demand", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-variable-defined-schedule-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-defined-schedule/submission", "component": __pages_import_526__, "props": true, "meta": { "title": "Variable Defined Schedule — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-variable-defined-schedule", "path": "/tech/lfi-api-hub/production/testing-certification/functional/variable-defined-schedule", "component": __pages_import_527__, "props": true, "meta": { "title": "Functional Certification — Variable Defined Schedule", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-single-instant-payment-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission", "component": __pages_import_528__, "props": true, "meta": { "title": "Single Instant Payment — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-single-instant-payment", "path": "/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment", "component": __pages_import_529__, "props": true, "meta": { "title": "Functional Certification — Single Instant Payment", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-insurance-data-sharing-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/insurance-data-sharing/submission", "component": __pages_import_530__, "props": true, "meta": { "title": "Insurance Data Sharing — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-insurance-data-sharing", "path": "/tech/lfi-api-hub/production/testing-certification/functional/insurance-data-sharing", "component": __pages_import_531__, "props": true, "meta": { "title": "Functional Certification — Insurance Data Sharing", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-fixed-periodic-schedule-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-periodic-schedule/submission", "component": __pages_import_532__, "props": true, "meta": { "title": "Fixed Periodic Schedule — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-fixed-periodic-schedule", "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-periodic-schedule", "component": __pages_import_533__, "props": true, "meta": { "title": "Functional Certification — Fixed Periodic Schedule", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-fixed-on-demand-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-on-demand/submission", "component": __pages_import_534__, "props": true, "meta": { "title": "Fixed On-Demand — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-fixed-on-demand", "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-on-demand", "component": __pages_import_535__, "props": true, "meta": { "title": "Functional Certification — Fixed On-Demand", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-fixed-defined-schedule-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-defined-schedule/submission", "component": __pages_import_536__, "props": true, "meta": { "title": "Fixed Defined Schedule — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-fixed-defined-schedule", "path": "/tech/lfi-api-hub/production/testing-certification/functional/fixed-defined-schedule", "component": __pages_import_537__, "props": true, "meta": { "title": "Functional Certification — Fixed Defined Schedule", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-delegated-sca-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/delegated-sca/submission", "component": __pages_import_538__, "props": true, "meta": { "title": "Delegated SCA — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-delegated-sca", "path": "/tech/lfi-api-hub/production/testing-certification/functional/delegated-sca", "component": __pages_import_539__, "props": true, "meta": { "title": "Functional Certification — Delegated SCA", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-confirmation-of-payee-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee/submission", "component": __pages_import_540__, "props": true, "meta": { "title": "Confirmation of Payee — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-confirmation-of-payee", "path": "/tech/lfi-api-hub/production/testing-certification/functional/confirmation-of-payee", "component": __pages_import_541__, "props": true, "meta": { "title": "Functional Certification — Confirmation of Payee", "isIndex": true } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-bank-data-sharing-submission", "path": "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing/submission", "component": __pages_import_542__, "props": true, "meta": { "title": "Bank Data Sharing — Functional Certification Submission" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional-bank-data-sharing", "path": "/tech/lfi-api-hub/production/testing-certification/functional/bank-data-sharing", "component": __pages_import_543__, "props": true, "meta": { "title": "Functional Certification — Bank Data Sharing", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-webhooks-payment-status-open-api", "path": "/tech/tpp-standards/v2.2-rc1/webhooks/payment-status/open-api", "component": __pages_import_544__, "props": true, "meta": { "title": "Payment Status Change Event" } }, { "name": "tech-tpp-standards-v2.2-rc1-webhooks-payment-status-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/webhooks/payment-status/api-guide", "component": __pages_import_545__, "props": true, "meta": { "title": "Payment Status Event — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-webhooks-insurance-status-open-api", "path": "/tech/tpp-standards/v2.2-rc1/webhooks/insurance-status/open-api", "component": __pages_import_546__, "props": true, "meta": { "title": "Insurance Quote Status Change Event" } }, { "name": "tech-tpp-standards-v2.2-rc1-webhooks-insurance-status-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/webhooks/insurance-status/api-guide", "component": __pages_import_547__, "props": true, "meta": { "title": "Insurance Quote Status Event — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-webhooks-consent-status-open-api", "path": "/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/open-api", "component": __pages_import_548__, "props": true, "meta": { "title": "Consent Status Change Event" } }, { "name": "tech-tpp-standards-v2.2-rc1-webhooks-consent-status-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/webhooks/consent-status/api-guide", "component": __pages_import_549__, "props": true, "meta": { "title": "Consent Status Event — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/user-journeys", "component": __pages_import_550__, "props": true, "meta": { "title": "Insurance Quotation — User Journeys", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation-requirements", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation/requirements", "component": __pages_import_551__, "props": true, "meta": { "title": "Insurance Quotation — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-quotation", "path": "/tech/tpp-standards/v2.2-rc1/insurance/quotation", "component": __pages_import_552__, "props": true, "meta": { "title": "Insurance Quotation", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/user-journeys", "component": __pages_import_553__, "props": true, "meta": { "title": "Insurance Data Sharing — User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing-requirements", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing/requirements", "component": __pages_import_554__, "props": true, "meta": { "title": "Insurance Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance-data-sharing", "path": "/tech/tpp-standards/v2.2-rc1/insurance/data-sharing", "component": __pages_import_555__, "props": true, "meta": { "title": "Insurance Data Sharing", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-payment-consents", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/payment-consents", "component": __pages_import_556__, "props": true, "meta": { "title": "Retrieve Payment Consents by BaseConsentId" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-payment-consents-ConsentId", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/payment-consents-ConsentId", "component": __pages_import_557__, "props": true, "meta": { "title": "Retrieve Payment Consent by ConsentId" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-patch-payment-consents-ConsentId", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-payment-consents-ConsentId", "component": __pages_import_558__, "props": true, "meta": { "title": "Modify a Payment Consent" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-patch-insurance-consents-ConsentId", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-insurance-consents-ConsentId", "component": __pages_import_559__, "props": true, "meta": { "title": "Modify an Insurance Data Sharing Consent" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-patch-account-access-consents-ConsentId", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/patch-account-access-consents-ConsentId", "component": __pages_import_560__, "props": true, "meta": { "title": "Modify a Bank Data Sharing Consent" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-par", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/par", "component": __pages_import_561__, "props": true, "meta": { "title": "Pushed Authorization Request endpoint" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-insurance-consents", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/insurance-consents", "component": __pages_import_562__, "props": true, "meta": { "title": "Retrieve Insurance Data Sharing Consents by BaseConsentId" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-insurance-consents-ConsentId", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/insurance-consents-ConsentId", "component": __pages_import_563__, "props": true, "meta": { "title": "Retrieve Insurance Data Sharing Consent by ConsentId" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-account-access-consents", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/account-access-consents", "component": __pages_import_564__, "props": true, "meta": { "title": "Retrieve Bank Data Sharing Consents by BaseConsentId" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-open-api-account-access-consents-ConsentId", "path": "/tech/tpp-standards/v2.2-rc1/consent/open-api/account-access-consents-ConsentId", "component": __pages_import_565__, "props": true, "meta": { "title": "Retrieve Bank Data Sharing Consent by ConsentId" } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-data-deletion-confirmation", "path": "/tech/tpp-standards/v2.2-rc1/consent/data-deletion-confirmation", "component": __pages_import_566__, "props": true, "meta": { "title": "Data Deletion Confirmation", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-consent-management-interface", "path": "/tech/tpp-standards/v2.2-rc1/consent/consent-management-interface", "component": __pages_import_567__, "props": true, "meta": { "title": "Consent Management Interface", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation-multi-authorization", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation/multi-authorization", "component": __pages_import_568__, "props": true, "meta": { "title": "Multi-Authorization" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-service-initiation", "path": "/tech/tpp-standards/v2.2-rc1/banking/service-initiation", "component": __pages_import_569__, "props": true, "meta": { "title": "Payments (Service Initiation)", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-products-leads-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/products-leads/user-journeys", "component": __pages_import_570__, "props": true, "meta": { "title": "Products and Leads - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-products-leads-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/products-leads/requirements", "component": __pages_import_571__, "props": true, "meta": { "title": "Products and Leads — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-products-leads", "path": "/tech/tpp-standards/v2.2-rc1/banking/products-leads", "component": __pages_import_572__, "props": true, "meta": { "title": "Products & Leads", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-products-leads-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/products-leads/api-guide", "component": __pages_import_573__, "props": true, "meta": { "title": "Products & Leads — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/user-journeys", "component": __pages_import_574__, "props": true, "meta": { "title": "Bank Data Sharing - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing/requirements", "component": __pages_import_575__, "props": true, "meta": { "title": "Bank Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-data-sharing", "path": "/tech/tpp-standards/v2.2-rc1/banking/data-sharing", "component": __pages_import_576__, "props": true, "meta": { "title": "Bank Data Sharing", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-confirmation-of-payee-user-journeys", "path": "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/user-journeys", "component": __pages_import_577__, "props": true, "meta": { "title": "Confirmation of Payee - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-confirmation-of-payee-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/requirements", "component": __pages_import_578__, "props": true, "meta": { "title": "Confirmation of Payee — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-confirmation-of-payee", "path": "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee", "component": __pages_import_579__, "props": true, "meta": { "title": "Confirmation of Payee", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-confirmation-of-payee-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/api-guide", "component": __pages_import_580__, "props": true, "meta": { "title": "Confirmation of Payee — API Guide" } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-atms-requirements", "path": "/tech/tpp-standards/v2.2-rc1/banking/atms/requirements", "component": __pages_import_581__, "props": true, "meta": { "title": "ATMs — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-atms", "path": "/tech/tpp-standards/v2.2-rc1/banking/atms", "component": __pages_import_582__, "props": true, "meta": { "title": "ATMs", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking-atms-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/banking/atms/api-guide", "component": __pages_import_583__, "props": true, "meta": { "title": "ATMs — API Guide" } }, { "name": "tech-tpp-standards-v2.1-webhooks-payment-status-open-api", "path": "/tech/tpp-standards/v2.1/webhooks/payment-status/open-api", "component": __pages_import_584__, "props": true, "meta": { "title": "Payment Status Change Event" } }, { "name": "tech-tpp-standards-v2.1-webhooks-payment-status-api-guide", "path": "/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide", "component": __pages_import_585__, "props": true, "meta": { "title": "Payment Status Event — API Guide" } }, { "name": "tech-tpp-standards-v2.1-webhooks-insurance-status-open-api", "path": "/tech/tpp-standards/v2.1/webhooks/insurance-status/open-api", "component": __pages_import_586__, "props": true, "meta": { "title": "Insurance Quote Status Change Event" } }, { "name": "tech-tpp-standards-v2.1-webhooks-insurance-status-api-guide", "path": "/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide", "component": __pages_import_587__, "props": true, "meta": { "title": "Insurance Quote Status Event — API Guide" } }, { "name": "tech-tpp-standards-v2.1-webhooks-consent-status-open-api", "path": "/tech/tpp-standards/v2.1/webhooks/consent-status/open-api", "component": __pages_import_588__, "props": true, "meta": { "title": "Consent Status Change Event" } }, { "name": "tech-tpp-standards-v2.1-webhooks-consent-status-api-guide", "path": "/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide", "component": __pages_import_589__, "props": true, "meta": { "title": "Consent Status Event — API Guide" } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-user-journeys", "path": "/tech/tpp-standards/v2.1/insurance/quotation/user-journeys", "component": __pages_import_590__, "props": true, "meta": { "title": "Insurance Quotation — User Journeys", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation-requirements", "path": "/tech/tpp-standards/v2.1/insurance/quotation/requirements", "component": __pages_import_591__, "props": true, "meta": { "title": "Insurance Quotation — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-insurance-quotation", "path": "/tech/tpp-standards/v2.1/insurance/quotation", "component": __pages_import_592__, "props": true, "meta": { "title": "Insurance Quotation", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-user-journeys", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/user-journeys", "component": __pages_import_593__, "props": true, "meta": { "title": "Insurance Data Sharing — User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing-requirements", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing/requirements", "component": __pages_import_594__, "props": true, "meta": { "title": "Insurance Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-insurance-data-sharing", "path": "/tech/tpp-standards/v2.1/insurance/data-sharing", "component": __pages_import_595__, "props": true, "meta": { "title": "Insurance Data Sharing", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-payment-consents", "path": "/tech/tpp-standards/v2.1/consent/open-api/payment-consents", "component": __pages_import_596__, "props": true, "meta": { "title": "Retrieve Payment Consents by BaseConsentId" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-payment-consents-ConsentId", "path": "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId", "component": __pages_import_597__, "props": true, "meta": { "title": "Retrieve Payment Consent by ConsentId" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-patch-payment-consents-ConsentId", "path": "/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId", "component": __pages_import_598__, "props": true, "meta": { "title": "Modify a Payment Consent" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-patch-insurance-consents-ConsentId", "path": "/tech/tpp-standards/v2.1/consent/open-api/patch-insurance-consents-ConsentId", "component": __pages_import_599__, "props": true, "meta": { "title": "Modify an Insurance Data Sharing Consent" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-patch-account-access-consents-ConsentId", "path": "/tech/tpp-standards/v2.1/consent/open-api/patch-account-access-consents-ConsentId", "component": __pages_import_600__, "props": true, "meta": { "title": "Modify a Bank Data Sharing Consent" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-par", "path": "/tech/tpp-standards/v2.1/consent/open-api/par", "component": __pages_import_601__, "props": true, "meta": { "title": "Pushed Authorization Request endpoint" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-insurance-consents", "path": "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents", "component": __pages_import_602__, "props": true, "meta": { "title": "Retrieve Insurance Data Sharing Consents by BaseConsentId" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-insurance-consents-ConsentId", "path": "/tech/tpp-standards/v2.1/consent/open-api/insurance-consents-ConsentId", "component": __pages_import_603__, "props": true, "meta": { "title": "Retrieve Insurance Data Sharing Consent by ConsentId" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-account-access-consents", "path": "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents", "component": __pages_import_604__, "props": true, "meta": { "title": "Retrieve Bank Data Sharing Consents by BaseConsentId" } }, { "name": "tech-tpp-standards-v2.1-consent-open-api-account-access-consents-ConsentId", "path": "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId", "component": __pages_import_605__, "props": true, "meta": { "title": "Retrieve Bank Data Sharing Consent by ConsentId" } }, { "name": "tech-tpp-standards-v2.1-consent-consent-management-interface", "path": "/tech/tpp-standards/v2.1/consent/consent-management-interface", "component": __pages_import_606__, "props": true, "meta": { "title": "Consent Management Interface", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation-multi-authorization", "path": "/tech/tpp-standards/v2.1/banking/service-initiation/multi-authorization", "component": __pages_import_607__, "props": true, "meta": { "title": "Multi-Authorization" } }, { "name": "tech-tpp-standards-v2.1-banking-service-initiation", "path": "/tech/tpp-standards/v2.1/banking/service-initiation", "component": __pages_import_608__, "props": true, "meta": { "title": "Payments (Service Initiation)", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-products-leads-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/products-leads/user-journeys", "component": __pages_import_609__, "props": true, "meta": { "title": "Products and Leads - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-products-leads-requirements", "path": "/tech/tpp-standards/v2.1/banking/products-leads/requirements", "component": __pages_import_610__, "props": true, "meta": { "title": "Products and Leads — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-products-leads", "path": "/tech/tpp-standards/v2.1/banking/products-leads", "component": __pages_import_611__, "props": true, "meta": { "title": "Products & Leads", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-products-leads-api-guide", "path": "/tech/tpp-standards/v2.1/banking/products-leads/api-guide", "component": __pages_import_612__, "props": true, "meta": { "title": "Products & Leads — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/user-journeys", "component": __pages_import_613__, "props": true, "meta": { "title": "Bank Data Sharing - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing-requirements", "path": "/tech/tpp-standards/v2.1/banking/data-sharing/requirements", "component": __pages_import_614__, "props": true, "meta": { "title": "Bank Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-data-sharing", "path": "/tech/tpp-standards/v2.1/banking/data-sharing", "component": __pages_import_615__, "props": true, "meta": { "title": "Bank Data Sharing", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-confirmation-of-payee-user-journeys", "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/user-journeys", "component": __pages_import_616__, "props": true, "meta": { "title": "Confirmation of Payee - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-banking-confirmation-of-payee-requirements", "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/requirements", "component": __pages_import_617__, "props": true, "meta": { "title": "Confirmation of Payee — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-confirmation-of-payee", "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee", "component": __pages_import_618__, "props": true, "meta": { "title": "Confirmation of Payee", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-confirmation-of-payee-api-guide", "path": "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/api-guide", "component": __pages_import_619__, "props": true, "meta": { "title": "Confirmation of Payee — API Guide" } }, { "name": "tech-tpp-standards-v2.1-banking-atms-requirements", "path": "/tech/tpp-standards/v2.1/banking/atms/requirements", "component": __pages_import_620__, "props": true, "meta": { "title": "ATMs — Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-atms", "path": "/tech/tpp-standards/v2.1/banking/atms", "component": __pages_import_621__, "props": true, "meta": { "title": "ATMs", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking-atms-api-guide", "path": "/tech/tpp-standards/v2.1/banking/atms/api-guide", "component": __pages_import_622__, "props": true, "meta": { "title": "ATMs — API Guide" } }, { "name": "tech-tpp-standards-security-tokens-open-api-token", "path": "/tech/tpp-standards/security/tokens/open-api/token", "component": __pages_import_623__, "props": true, "meta": { "title": "Token endpoint" } }, { "name": "tech-tpp-standards-production-testing-certification-optional-overview", "path": "/tech/tpp-standards/production/testing-certification/optional/overview", "component": __pages_import_624__, "props": true, "meta": { "title": "Optional Certifications Overview", "isIndex": true } }, { "name": "tech-tpp-standards-production-testing-certification-optional-access-encrypted-resource-data", "path": "/tech/tpp-standards/production/testing-certification/optional/access-encrypted-resource-data", "component": __pages_import_625__, "props": true, "meta": { "title": "Access Encrypted Resource Data" } }, { "name": "tech-tpp-standards-production-testing-certification-functional", "path": "/tech/tpp-standards/production/testing-certification/functional", "component": __pages_import_626__, "props": true, "meta": { "title": "TPP Functional Certification", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/user-journeys", "component": __pages_import_627__, "props": true, "meta": { "title": "Insurance Quotation — User Journeys", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/requirements", "component": __pages_import_628__, "props": true, "meta": { "title": "Insurance Quotation — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation-quote-types", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/quote-types", "component": __pages_import_629__, "props": true, "meta": { "title": "Quote Types — New, Renewal, Switch" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-quotation", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/quotation", "component": __pages_import_630__, "props": true, "meta": { "title": "Insurance Quotation", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/user-journeys", "component": __pages_import_631__, "props": true, "meta": { "title": "Insurance Data Sharing — User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing/requirements", "component": __pages_import_632__, "props": true, "meta": { "title": "Insurance Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance-data-sharing", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance/data-sharing", "component": __pages_import_633__, "props": true, "meta": { "title": "Insurance Data Sharing", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-health-check-open-api-hello", "path": "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello", "component": __pages_import_634__, "props": true, "meta": { "title": "Hello" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-health-check-open-api-hello-mtls", "path": "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/hello-mtls", "component": __pages_import_635__, "props": true, "meta": { "title": "Hello MTLS" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-health-check-open-api-echo-cert", "path": "/tech/lfi-api-hub/v2.2-rc1/health-check/open-api/echo-cert", "component": __pages_import_636__, "props": true, "meta": { "title": "Echo Cert" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface-insurance-data-sharing-user-experience", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/user-experience", "component": __pages_import_637__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface-insurance-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/insurance-data-sharing/requirements", "component": __pages_import_638__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface-bank-service-initiation-user-experience", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/user-experience", "component": __pages_import_639__, "props": true, "meta": { "title": "CMI — Bank Service Initiation User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface-bank-service-initiation-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-service-initiation/requirements", "component": __pages_import_640__, "props": true, "meta": { "title": "CMI — Bank Service Initiation Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface-bank-data-sharing-user-experience", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/user-experience", "component": __pages_import_641__, "props": true, "meta": { "title": "CMI — Bank Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface-bank-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/bank-data-sharing/requirements", "component": __pages_import_642__, "props": true, "meta": { "title": "CMI — Bank Data Sharing Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-authorization-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization/requirements", "component": __pages_import_643__, "props": true, "meta": { "title": "Authorization Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-authorization", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authorization", "component": __pages_import_644__, "props": true, "meta": { "title": "Authorization", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-authentication-sca", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/sca", "component": __pages_import_645__, "props": true, "meta": { "title": "Strong Customer Authentication" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-authentication-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/requirements", "component": __pages_import_646__, "props": true, "meta": { "title": "Authentication Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-authentication", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication", "component": __pages_import_647__, "props": true, "meta": { "title": "Authentication", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-authentication-implementation", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/authentication/implementation", "component": __pages_import_648__, "props": true, "meta": { "title": "Implementation Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-events-open-api-validate", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/validate", "component": __pages_import_649__, "props": true, "meta": { "title": "Validate Consent Before Creation" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-events-open-api-event-op", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-events/open-api/event-op", "component": __pages_import_650__, "props": true, "meta": { "title": "Event When a Consent Is Updated or Created" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-users-register-initialize", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-register-initialize", "component": __pages_import_651__, "props": true, "meta": { "title": "Initialize User Registration" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-users-register-complete", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-register-complete", "component": __pages_import_652__, "props": true, "meta": { "title": "Complete User Registration" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-users-pii-decrypt", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-pii-decrypt", "component": __pages_import_653__, "props": true, "meta": { "title": "Decrypt PII for a User" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-users-deregister", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-deregister", "component": __pages_import_654__, "props": true, "meta": { "title": "Deregister a User" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-users-challenge-query", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-challenge-query", "component": __pages_import_655__, "props": true, "meta": { "title": "Query a User Challenge" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-users-challenge-initialize", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-challenge-initialize", "component": __pages_import_656__, "props": true, "meta": { "title": "Initialize a User Challenge" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-users-challenge-complete", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/users-challenge-complete", "component": __pages_import_657__, "props": true, "meta": { "title": "Complete a User Challenge" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-travel-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/travel-insurance-policies", "component": __pages_import_658__, "props": true, "meta": { "title": "Retrieve Travel Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-renters-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/renters-insurance-policies", "component": __pages_import_659__, "props": true, "meta": { "title": "Retrieve Renters Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-motor-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/motor-insurance-policies", "component": __pages_import_660__, "props": true, "meta": { "title": "Retrieve Motor Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-life-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/life-insurance-policies", "component": __pages_import_661__, "props": true, "meta": { "title": "Retrieve Life Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-home-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/home-insurance-policies", "component": __pages_import_662__, "props": true, "meta": { "title": "Retrieve Home Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-health-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/health-insurance-policies", "component": __pages_import_663__, "props": true, "meta": { "title": "Retrieve Health Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-employment-insurance-policies", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/employment-insurance-policies", "component": __pages_import_664__, "props": true, "meta": { "title": "Retrieve Employment Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-consent-actions-validate", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/consent-actions-validate", "component": __pages_import_665__, "props": true, "meta": { "title": "Validate a Consent" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-accounts", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/accounts", "component": __pages_import_666__, "props": true, "meta": { "title": "Retrieve Accounts (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-open-api-accounts-accountId", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/open-api/accounts-accountId", "component": __pages_import_667__, "props": true, "meta": { "title": "Retrieve an Account (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation-multi-authorization", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation/multi-authorization", "component": __pages_import_668__, "props": true, "meta": { "title": "Multi-Authorization" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-service-initiation", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/service-initiation", "component": __pages_import_669__, "props": true, "meta": { "title": "Payments (Service Initiation)", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-products-and-leads-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/requirements", "component": __pages_import_670__, "props": true }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-products-and-leads", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads", "component": __pages_import_671__, "props": true, "meta": { "title": "Products & Leads", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-products-and-leads-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/products-and-leads/api-guide", "component": __pages_import_672__, "props": true, "meta": { "title": "Products & Leads — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/user-journeys", "component": __pages_import_673__, "props": true, "meta": { "title": "Bank Data Sharing - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing/requirements", "component": __pages_import_674__, "props": true, "meta": { "title": "Bank Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-data-sharing", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/data-sharing", "component": __pages_import_675__, "props": true, "meta": { "title": "Bank Data Sharing", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-confirmation-of-payee-user-journeys", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/user-journeys", "component": __pages_import_676__, "props": true, "meta": { "title": "Confirmation of Payee - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-confirmation-of-payee-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/requirements", "component": __pages_import_677__, "props": true, "meta": { "title": "Confirmation of Payee — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-confirmation-of-payee", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee", "component": __pages_import_678__, "props": true, "meta": { "title": "Confirmation of Payee", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-confirmation-of-payee-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/confirmation-of-payee/api-guide", "component": __pages_import_679__, "props": true, "meta": { "title": "Confirmation of Payee — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-atms-requirements", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/atms/requirements", "component": __pages_import_680__, "props": true }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-atms", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/atms", "component": __pages_import_681__, "props": true, "meta": { "title": "ATMs", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking-atms-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/banking/atms/api-guide", "component": __pages_import_682__, "props": true, "meta": { "title": "ATMs — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-prerequisites", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/prerequisites", "component": __pages_import_683__, "props": true, "meta": { "title": "Prerequisites" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding", "component": __pages_import_684__, "props": true, "meta": { "title": "API Hub Onboarding", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-onboarding-application-layer-auth", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/onboarding/application-layer-auth", "component": __pages_import_685__, "props": true, "meta": { "title": "Application Layer Authentication" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-headless-heimdall", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/headless-heimdall", "component": __pages_import_686__, "props": true, "meta": { "title": "Headless Heimdall Auth Server", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-consent-manager", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager", "component": __pages_import_687__, "props": true, "meta": { "title": "Consent Manager", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-connectivity", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/connectivity", "component": __pages_import_688__, "props": true, "meta": { "title": "API Hub Connectivity & Certificates", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-admin-portal-tpp-activation", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal/tpp-activation", "component": __pages_import_689__, "props": true, "meta": { "title": "TPP Management & Activation" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-admin-portal-reports", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal/reports", "component": __pages_import_690__, "props": true, "meta": { "title": "Reports" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-admin-portal-logs", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal/logs", "component": __pages_import_691__, "props": true, "meta": { "title": "Logs" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub-admin-portal", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub/admin-portal", "component": __pages_import_692__, "props": true, "meta": { "title": "Admin Portal", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-user-journeys", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/user-journeys", "component": __pages_import_693__, "props": true, "meta": { "title": "Insurance Quotation — User Journeys", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-requirements", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/requirements", "component": __pages_import_694__, "props": true, "meta": { "title": "Insurance Quotation — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation-quote-types", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types", "component": __pages_import_695__, "props": true, "meta": { "title": "Quote Types — New, Renewal, Switch" } }, { "name": "tech-lfi-api-hub-v2.1-insurance-quotation", "path": "/tech/lfi-api-hub/v2.1/insurance/quotation", "component": __pages_import_696__, "props": true, "meta": { "title": "Insurance Quotation", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-user-journeys", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/user-journeys", "component": __pages_import_697__, "props": true, "meta": { "title": "Insurance Data Sharing — User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing/requirements", "component": __pages_import_698__, "props": true, "meta": { "title": "Insurance Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-insurance-data-sharing", "path": "/tech/lfi-api-hub/v2.1/insurance/data-sharing", "component": __pages_import_699__, "props": true, "meta": { "title": "Insurance Data Sharing", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-health-check-open-api-hello", "path": "/tech/lfi-api-hub/v2.1/health-check/open-api/hello", "component": __pages_import_700__, "props": true, "meta": { "title": "Hello" } }, { "name": "tech-lfi-api-hub-v2.1-health-check-open-api-hello-mtls", "path": "/tech/lfi-api-hub/v2.1/health-check/open-api/hello-mtls", "component": __pages_import_701__, "props": true, "meta": { "title": "Hello MTLS" } }, { "name": "tech-lfi-api-hub-v2.1-health-check-open-api-echo-cert", "path": "/tech/lfi-api-hub/v2.1/health-check/open-api/echo-cert", "component": __pages_import_702__, "props": true, "meta": { "title": "Echo Cert" } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface-insurance-data-sharing-user-experience", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/user-experience", "component": __pages_import_703__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface-insurance-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/insurance-data-sharing/requirements", "component": __pages_import_704__, "props": true, "meta": { "title": "CMI — Insurance Data Sharing Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface-bank-service-initiation-user-experience", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/user-experience", "component": __pages_import_705__, "props": true, "meta": { "title": "CMI — Bank Service Initiation User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface-bank-service-initiation-requirements", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-service-initiation/requirements", "component": __pages_import_706__, "props": true, "meta": { "title": "CMI — Bank Service Initiation Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface-bank-data-sharing-user-experience", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/user-experience", "component": __pages_import_707__, "props": true, "meta": { "title": "CMI — Bank Data Sharing User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface-bank-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/bank-data-sharing/requirements", "component": __pages_import_708__, "props": true, "meta": { "title": "CMI — Bank Data Sharing Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-authorization-requirements", "path": "/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements", "component": __pages_import_709__, "props": true, "meta": { "title": "Authorization Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-authorization", "path": "/tech/lfi-api-hub/v2.1/consent-journey/authorization", "component": __pages_import_710__, "props": true, "meta": { "title": "Authorization", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-authentication-sca", "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication/sca", "component": __pages_import_711__, "props": true, "meta": { "title": "Strong Customer Authentication" } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-authentication-requirements", "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements", "component": __pages_import_712__, "props": true, "meta": { "title": "Authentication Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-authentication", "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication", "component": __pages_import_713__, "props": true, "meta": { "title": "Authentication", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-authentication-implementation", "path": "/tech/lfi-api-hub/v2.1/consent-journey/authentication/implementation", "component": __pages_import_714__, "props": true, "meta": { "title": "Implementation Guide" } }, { "name": "tech-lfi-api-hub-v2.1-consent-events-open-api-validate", "path": "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate", "component": __pages_import_715__, "props": true, "meta": { "title": "Validate Consent Before Creation" } }, { "name": "tech-lfi-api-hub-v2.1-consent-events-open-api-event-op", "path": "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op", "component": __pages_import_716__, "props": true, "meta": { "title": "Event When a Consent Is Updated or Created" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-users-register-initialize", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-initialize", "component": __pages_import_717__, "props": true, "meta": { "title": "Initialize User Registration" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-users-register-complete", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-register-complete", "component": __pages_import_718__, "props": true, "meta": { "title": "Complete User Registration" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-users-pii-decrypt", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-pii-decrypt", "component": __pages_import_719__, "props": true, "meta": { "title": "Decrypt PII for a User" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-users-deregister", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-deregister", "component": __pages_import_720__, "props": true, "meta": { "title": "Deregister a User" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-users-challenge-query", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-challenge-query", "component": __pages_import_721__, "props": true, "meta": { "title": "Query a User Challenge" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-users-challenge-initialize", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-challenge-initialize", "component": __pages_import_722__, "props": true, "meta": { "title": "Initialize a User Challenge" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-users-challenge-complete", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/users-challenge-complete", "component": __pages_import_723__, "props": true, "meta": { "title": "Complete a User Challenge" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-travel-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/travel-insurance-policies", "component": __pages_import_724__, "props": true, "meta": { "title": "Retrieve Travel Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-renters-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/renters-insurance-policies", "component": __pages_import_725__, "props": true, "meta": { "title": "Retrieve Renters Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-motor-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/motor-insurance-policies", "component": __pages_import_726__, "props": true, "meta": { "title": "Retrieve Motor Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-life-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/life-insurance-policies", "component": __pages_import_727__, "props": true, "meta": { "title": "Retrieve Life Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-home-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/home-insurance-policies", "component": __pages_import_728__, "props": true, "meta": { "title": "Retrieve Home Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-health-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/health-insurance-policies", "component": __pages_import_729__, "props": true, "meta": { "title": "Retrieve Health Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-employment-insurance-policies", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/employment-insurance-policies", "component": __pages_import_730__, "props": true, "meta": { "title": "Retrieve Employment Insurance Policies (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-consent-actions-validate", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate", "component": __pages_import_731__, "props": true, "meta": { "title": "Validate a Consent" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-accounts", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/accounts", "component": __pages_import_732__, "props": true, "meta": { "title": "Retrieve Accounts (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-caap-open-api-accounts-accountId", "path": "/tech/lfi-api-hub/v2.1/caap/open-api/accounts-accountId", "component": __pages_import_733__, "props": true, "meta": { "title": "Retrieve an Account (CAAP)" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation-multi-authorization", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation/multi-authorization", "component": __pages_import_734__, "props": true, "meta": { "title": "Multi-Authorization" } }, { "name": "tech-lfi-api-hub-v2.1-banking-service-initiation", "path": "/tech/lfi-api-hub/v2.1/banking/service-initiation", "component": __pages_import_735__, "props": true, "meta": { "title": "Payments (Service Initiation)", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-products-and-leads-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/requirements", "component": __pages_import_736__, "props": true }, { "name": "tech-lfi-api-hub-v2.1-banking-products-and-leads", "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads", "component": __pages_import_737__, "props": true, "meta": { "title": "Products & Leads", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-products-and-leads-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/products-and-leads/api-guide", "component": __pages_import_738__, "props": true, "meta": { "title": "Products & Leads — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/user-journeys", "component": __pages_import_739__, "props": true, "meta": { "title": "Bank Data Sharing - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements", "component": __pages_import_740__, "props": true, "meta": { "title": "Bank Data Sharing — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-data-sharing", "path": "/tech/lfi-api-hub/v2.1/banking/data-sharing", "component": __pages_import_741__, "props": true, "meta": { "title": "Bank Data Sharing", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-confirmation-of-payee-user-journeys", "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/user-journeys", "component": __pages_import_742__, "props": true, "meta": { "title": "Confirmation of Payee - User Experience", "next": false, "prev": false, "aside": false } }, { "name": "tech-lfi-api-hub-v2.1-banking-confirmation-of-payee-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/requirements", "component": __pages_import_743__, "props": true, "meta": { "title": "Confirmation of Payee — Requirements", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-confirmation-of-payee", "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee", "component": __pages_import_744__, "props": true, "meta": { "title": "Confirmation of Payee", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-confirmation-of-payee-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/api-guide", "component": __pages_import_745__, "props": true, "meta": { "title": "Confirmation of Payee — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking-atms-requirements", "path": "/tech/lfi-api-hub/v2.1/banking/atms/requirements", "component": __pages_import_746__, "props": true }, { "name": "tech-lfi-api-hub-v2.1-banking-atms", "path": "/tech/lfi-api-hub/v2.1/banking/atms", "component": __pages_import_747__, "props": true, "meta": { "title": "ATMs", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-banking-atms-api-guide", "path": "/tech/lfi-api-hub/v2.1/banking/atms/api-guide", "component": __pages_import_748__, "props": true, "meta": { "title": "ATMs — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-prerequisites", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites", "component": __pages_import_749__, "props": true, "meta": { "title": "Prerequisites" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding", "component": __pages_import_750__, "props": true, "meta": { "title": "API Hub Onboarding", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-onboarding-application-layer-auth", "path": "/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth", "component": __pages_import_751__, "props": true, "meta": { "title": "Application Layer Authentication" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-headless-heimdall", "path": "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall", "component": __pages_import_752__, "props": true, "meta": { "title": "Headless Heimdall Auth Server", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-consent-manager", "path": "/tech/lfi-api-hub/v2.1/api-hub/consent-manager", "component": __pages_import_753__, "props": true, "meta": { "title": "Consent Manager", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-connectivity", "path": "/tech/lfi-api-hub/v2.1/api-hub/connectivity", "component": __pages_import_754__, "props": true, "meta": { "title": "API Hub Connectivity & Certificates", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-admin-portal-tpp-activation", "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/tpp-activation", "component": __pages_import_755__, "props": true, "meta": { "title": "TPP Management & Activation" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-admin-portal-reports", "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/reports", "component": __pages_import_756__, "props": true, "meta": { "title": "Reports" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-admin-portal-logs", "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal/logs", "component": __pages_import_757__, "props": true, "meta": { "title": "Logs" } }, { "name": "tech-lfi-api-hub-v2.1-api-hub-admin-portal", "path": "/tech/lfi-api-hub/v2.1/api-hub/admin-portal", "component": __pages_import_758__, "props": true, "meta": { "title": "Admin Portal", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-servers-api-meta", "path": "/tech/lfi-api-hub/trust-framework/servers/api/meta", "component": __pages_import_759__, "props": true, "meta": { "title": "Trust Framework — API Resource Meta Data" } }, { "name": "tech-lfi-api-hub-trust-framework-servers-api", "path": "/tech/lfi-api-hub/trust-framework/servers/api", "component": __pages_import_760__, "props": true, "meta": { "title": "Trust Framework — API Resources", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-servers-api-creating", "path": "/tech/lfi-api-hub/trust-framework/servers/api/creating", "component": __pages_import_761__, "props": true, "meta": { "title": "Trust Framework — Creating an API Resource" } }, { "name": "tech-lfi-api-hub-production-testing-certification-functional", "path": "/tech/lfi-api-hub/production/testing-certification/functional", "component": __pages_import_762__, "props": true, "meta": { "title": "LFI Functional Certification", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-webhooks", "path": "/tech/tpp-standards/v2.2-rc1/webhooks", "component": __pages_import_763__, "props": true, "meta": { "title": "Webhooks — Event Notifications", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-insurance", "path": "/tech/tpp-standards/v2.2-rc1/insurance", "component": __pages_import_764__, "props": true, "meta": { "title": "Insurance", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-getting-started-postman", "path": "/tech/tpp-standards/v2.2-rc1/getting-started/postman", "component": __pages_import_765__, "props": true, "meta": { "title": "Postman Guide", "isIndex": false, "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.2-rc1-getting-started", "path": "/tech/tpp-standards/v2.2-rc1/getting-started", "component": __pages_import_766__, "props": true, "meta": { "title": "Getting Started for TPPs (Sandbox)", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-requirements", "path": "/tech/tpp-standards/v2.2-rc1/consent/requirements", "component": __pages_import_767__, "props": true, "meta": { "title": "Consent Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent", "path": "/tech/tpp-standards/v2.2-rc1/consent", "component": __pages_import_768__, "props": true, "meta": { "title": "Consent", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-consent-api-guide", "path": "/tech/tpp-standards/v2.2-rc1/consent/api-guide", "component": __pages_import_769__, "props": true, "meta": { "title": "Consent — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.2-rc1-banking", "path": "/tech/tpp-standards/v2.2-rc1/banking", "component": __pages_import_770__, "props": true, "meta": { "title": "Banking", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-webhooks", "path": "/tech/tpp-standards/v2.1/webhooks", "component": __pages_import_771__, "props": true, "meta": { "title": "Webhooks — Event Notifications", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-insurance", "path": "/tech/tpp-standards/v2.1/insurance", "component": __pages_import_772__, "props": true, "meta": { "title": "Insurance", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-getting-started-postman", "path": "/tech/tpp-standards/v2.1/getting-started/postman", "component": __pages_import_773__, "props": true, "meta": { "title": "Postman Guide", "isIndex": false, "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards-v2.1-getting-started", "path": "/tech/tpp-standards/v2.1/getting-started", "component": __pages_import_774__, "props": true, "meta": { "title": "Getting Started for TPPs (Sandbox)", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-consent-requirements", "path": "/tech/tpp-standards/v2.1/consent/requirements", "component": __pages_import_775__, "props": true, "meta": { "title": "Consent Requirements", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-consent", "path": "/tech/tpp-standards/v2.1/consent", "component": __pages_import_776__, "props": true, "meta": { "title": "Consent", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-consent-api-guide", "path": "/tech/tpp-standards/v2.1/consent/api-guide", "component": __pages_import_777__, "props": true, "meta": { "title": "Consent — API Guide", "isIndex": true } }, { "name": "tech-tpp-standards-v2.1-banking", "path": "/tech/tpp-standards/v2.1/banking", "component": __pages_import_778__, "props": true, "meta": { "title": "Banking", "isIndex": true } }, { "name": "tech-tpp-standards-trust-framework-open-api-participants", "path": "/tech/tpp-standards/trust-framework/open-api/participants", "component": __pages_import_779__, "props": true, "meta": { "title": "Retrieve all Available Open Finance Servers and API Resources" } }, { "name": "tech-tpp-standards-trust-framework-certificates-san", "path": "/tech/tpp-standards/trust-framework/certificates-san", "component": __pages_import_780__, "props": true, "meta": { "title": "Trust Framework — Certificates with a SAN", "isIndex": true } }, { "name": "tech-tpp-standards-trust-framework-certificates", "path": "/tech/tpp-standards/trust-framework/certificates", "component": __pages_import_781__, "props": true, "meta": { "title": "Trust Framework — Keys and Certificates", "isIndex": true } }, { "name": "tech-tpp-standards-trust-framework-certificates-client-transport", "path": "/tech/tpp-standards/trust-framework/certificates/client-transport", "component": __pages_import_782__, "props": true, "meta": { "title": "Client Transport Certificate", "isIndex": true } }, { "name": "tech-tpp-standards-trust-framework-certificates-client-signing", "path": "/tech/tpp-standards/trust-framework/certificates/client-signing", "component": __pages_import_783__, "props": true, "meta": { "title": "Client Signing Certificate", "isIndex": true } }, { "name": "tech-tpp-standards-trust-framework-certificates-client-encryption", "path": "/tech/tpp-standards/trust-framework/certificates/client-encryption", "component": __pages_import_784__, "props": true, "meta": { "title": "Client Encryption Certificate", "isIndex": true } }, { "name": "tech-tpp-standards-security-tokens", "path": "/tech/tpp-standards/security/tokens", "component": __pages_import_785__, "props": true, "meta": { "title": "Tokens & Assertions", "isIndex": true } }, { "name": "tech-tpp-standards-security-tokens-client-assertion", "path": "/tech/tpp-standards/security/tokens/client-assertion", "component": __pages_import_786__, "props": true, "meta": { "title": "Preparing Client Assertion" } }, { "name": "tech-tpp-standards-security-fapi-scopes", "path": "/tech/tpp-standards/security/fapi/scopes", "component": __pages_import_787__, "props": true, "meta": { "title": "OAuth 2.0 Scopes" } }, { "name": "tech-tpp-standards-security-fapi-request-jwt", "path": "/tech/tpp-standards/security/fapi/request-jwt", "component": __pages_import_788__, "props": true, "meta": { "title": "Preparing the Request JWT" } }, { "name": "tech-tpp-standards-security-fapi-receiving-events", "path": "/tech/tpp-standards/security/fapi/receiving-events", "component": __pages_import_789__, "props": true, "meta": { "title": "Receiving Event Notifications" } }, { "name": "tech-tpp-standards-security-fapi-opening-the-redirect", "path": "/tech/tpp-standards/security/fapi/opening-the-redirect", "component": __pages_import_790__, "props": true, "meta": { "title": "Opening the Authorization Redirect" } }, { "name": "tech-tpp-standards-security-fapi-o3-utils", "path": "/tech/tpp-standards/security/fapi/o3-utils", "component": __pages_import_791__, "props": true, "meta": { "title": "O3 Sandbox Utilities" } }, { "name": "tech-tpp-standards-security-fapi-message-signing", "path": "/tech/tpp-standards/security/fapi/message-signing", "component": __pages_import_792__, "props": true, "meta": { "title": "Message Signing (JWS)" } }, { "name": "tech-tpp-standards-security-fapi-message-encryption", "path": "/tech/tpp-standards/security/fapi/message-encryption", "component": __pages_import_793__, "props": true, "meta": { "title": "Message Encryption (JWE)" } }, { "name": "tech-tpp-standards-security-fapi", "path": "/tech/tpp-standards/security/fapi", "component": __pages_import_794__, "props": true, "meta": { "title": "FAPI Security Profile", "isIndex": true } }, { "name": "tech-tpp-standards-security-fapi-handling-callback", "path": "/tech/tpp-standards/security/fapi/handling-callback", "component": __pages_import_795__, "props": true, "meta": { "title": "Handling Authorization Callbacks" } }, { "name": "tech-tpp-standards-registration-open-api-tpp-registration", "path": "/tech/tpp-standards/registration/open-api/tpp-registration", "component": __pages_import_796__, "props": true, "meta": { "title": "TPP Registration endpoint" } }, { "name": "tech-tpp-standards-production-testing-certification-user-experience", "path": "/tech/tpp-standards/production/testing-certification/user-experience", "component": __pages_import_797__, "props": true, "meta": { "title": "User Experience Evidence" } }, { "name": "tech-tpp-standards-production-testing-certification-security-validation", "path": "/tech/tpp-standards/production/testing-certification/security-validation", "component": __pages_import_798__, "props": true, "meta": { "title": "Security Validation" } }, { "name": "tech-tpp-standards-production-testing-certification-overview", "path": "/tech/tpp-standards/production/testing-certification/overview", "component": __pages_import_799__, "props": true, "meta": { "title": "Testing & Certification Overview", "isIndex": true } }, { "name": "tech-tpp-standards-production-testing-certification-fapi", "path": "/tech/tpp-standards/production/testing-certification/fapi", "component": __pages_import_800__, "props": true, "meta": { "title": "FAPI Conformance" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-insurance", "path": "/tech/lfi-api-hub/v2.2-rc1/insurance", "component": __pages_import_801__, "props": true, "meta": { "title": "Insurance", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-health-check", "path": "/tech/lfi-api-hub/v2.2-rc1/health-check", "component": __pages_import_802__, "props": true, "meta": { "title": "Health Check", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface", "component": __pages_import_803__, "props": true, "meta": { "title": "Consent Management Interface", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-management-interface-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-management-interface/api-guide", "component": __pages_import_804__, "props": true, "meta": { "title": "Consent Management Interface — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-opening-the-redirect", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/opening-the-redirect", "component": __pages_import_805__, "props": true, "meta": { "title": "Opening the Return Redirect" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-journey-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-journey/api-guide", "component": __pages_import_806__, "props": true, "meta": { "title": "Consent Journey - API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-events", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-events", "component": __pages_import_807__, "props": true, "meta": { "title": "Consent Events & Actions", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-consent-events-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/consent-events/api-guide", "component": __pages_import_808__, "props": true, "meta": { "title": "Consent Events & Actions — API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-user-experience", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/user-experience", "component": __pages_import_809__, "props": true, "meta": { "title": "CAAP - User Experience" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-pricing", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/pricing", "component": __pages_import_810__, "props": true, "meta": { "title": "CAAP - Pricing" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap", "path": "/tech/lfi-api-hub/v2.2-rc1/caap", "component": __pages_import_811__, "props": true, "meta": { "title": "CAAP", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-caap-api-guide", "path": "/tech/lfi-api-hub/v2.2-rc1/caap/api-guide", "component": __pages_import_812__, "props": true, "meta": { "title": "CAAP - API Guide" } }, { "name": "tech-lfi-api-hub-v2.2-rc1-banking", "path": "/tech/lfi-api-hub/v2.2-rc1/banking", "component": __pages_import_813__, "props": true, "meta": { "title": "Banking", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.2-rc1-api-hub", "path": "/tech/lfi-api-hub/v2.2-rc1/api-hub", "component": __pages_import_814__, "props": true, "meta": { "title": "API Hub Overview", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-insurance", "path": "/tech/lfi-api-hub/v2.1/insurance", "component": __pages_import_815__, "props": true, "meta": { "title": "Insurance", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-health-check", "path": "/tech/lfi-api-hub/v2.1/health-check", "component": __pages_import_816__, "props": true, "meta": { "title": "Health Check", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface", "component": __pages_import_817__, "props": true, "meta": { "title": "Consent Management Interface", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-management-interface-api-guide", "path": "/tech/lfi-api-hub/v2.1/consent-management-interface/api-guide", "component": __pages_import_818__, "props": true, "meta": { "title": "Consent Management Interface — API Guide", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-opening-the-redirect", "path": "/tech/lfi-api-hub/v2.1/consent-journey/opening-the-redirect", "component": __pages_import_819__, "props": true, "meta": { "title": "Opening the Return Redirect" } }, { "name": "tech-lfi-api-hub-v2.1-consent-journey-api-guide", "path": "/tech/lfi-api-hub/v2.1/consent-journey/api-guide", "component": __pages_import_820__, "props": true, "meta": { "title": "Consent Journey - API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-consent-events", "path": "/tech/lfi-api-hub/v2.1/consent-events", "component": __pages_import_821__, "props": true, "meta": { "title": "Consent Events & Actions", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-consent-events-api-guide", "path": "/tech/lfi-api-hub/v2.1/consent-events/api-guide", "component": __pages_import_822__, "props": true, "meta": { "title": "Consent Events & Actions — API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-caap-user-experience", "path": "/tech/lfi-api-hub/v2.1/caap/user-experience", "component": __pages_import_823__, "props": true, "meta": { "title": "CAAP - User Experience" } }, { "name": "tech-lfi-api-hub-v2.1-caap-pricing", "path": "/tech/lfi-api-hub/v2.1/caap/pricing", "component": __pages_import_824__, "props": true, "meta": { "title": "CAAP - Pricing" } }, { "name": "tech-lfi-api-hub-v2.1-caap", "path": "/tech/lfi-api-hub/v2.1/caap", "component": __pages_import_825__, "props": true, "meta": { "title": "CAAP", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-caap-api-guide", "path": "/tech/lfi-api-hub/v2.1/caap/api-guide", "component": __pages_import_826__, "props": true, "meta": { "title": "CAAP - API Guide" } }, { "name": "tech-lfi-api-hub-v2.1-banking", "path": "/tech/lfi-api-hub/v2.1/banking", "component": __pages_import_827__, "props": true, "meta": { "title": "Banking", "isIndex": true } }, { "name": "tech-lfi-api-hub-v2.1-api-hub", "path": "/tech/lfi-api-hub/v2.1/api-hub", "component": __pages_import_828__, "props": true, "meta": { "title": "API Hub Overview", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-servers", "path": "/tech/lfi-api-hub/trust-framework/servers", "component": __pages_import_829__, "props": true, "meta": { "title": "Trust Framework — Servers", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-servers-creating", "path": "/tech/lfi-api-hub/trust-framework/servers/creating", "component": __pages_import_830__, "props": true, "meta": { "title": "Trust Framework — Creating a Server" } }, { "name": "tech-lfi-api-hub-trust-framework-certificates-san", "path": "/tech/lfi-api-hub/trust-framework/certificates-san", "component": __pages_import_831__, "props": true, "meta": { "title": "Trust Framework — Certificates with a SAN", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-certificates", "path": "/tech/lfi-api-hub/trust-framework/certificates", "component": __pages_import_832__, "props": true, "meta": { "title": "Trust Framework — Keys and Certificates", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-certificates-client-transport", "path": "/tech/lfi-api-hub/trust-framework/certificates/client-transport", "component": __pages_import_833__, "props": true, "meta": { "title": "Client Transport Certificate", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-certificates-client-signing", "path": "/tech/lfi-api-hub/trust-framework/certificates/client-signing", "component": __pages_import_834__, "props": true, "meta": { "title": "Client Signing Certificate", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-api-token", "path": "/tech/lfi-api-hub/trust-framework/api/token", "component": __pages_import_835__, "props": true, "meta": { "title": "Obtain an Access Token" } }, { "name": "tech-lfi-api-hub-trust-framework-api-software-statements", "path": "/tech/lfi-api-hub/trust-framework/api/software-statements", "component": __pages_import_836__, "props": true, "meta": { "title": "Retrieve all Software Statements for an Organisation" } }, { "name": "tech-lfi-api-hub-trust-framework-api-organisations", "path": "/tech/lfi-api-hub/trust-framework/api/organisations", "component": __pages_import_837__, "props": true, "meta": { "title": "Retrieve all Organisations" } }, { "name": "tech-lfi-api-hub-trust-framework-api", "path": "/tech/lfi-api-hub/trust-framework/api", "component": __pages_import_838__, "props": true, "meta": { "title": "Trust Framework — API", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-api-contacts", "path": "/tech/lfi-api-hub/trust-framework/api/contacts", "component": __pages_import_839__, "props": true, "meta": { "title": "Retrieve all Contacts for an Organisation" } }, { "name": "tech-lfi-api-hub-trust-framework-api-auth-servers", "path": "/tech/lfi-api-hub/trust-framework/api/auth-servers", "component": __pages_import_840__, "props": true, "meta": { "title": "Retrieve all Authorisation Servers for an Organisation" } }, { "name": "tech-lfi-api-hub-trust-framework-api-api-resources", "path": "/tech/lfi-api-hub/trust-framework/api/api-resources", "component": __pages_import_841__, "props": true, "meta": { "title": "Retrieve all API Resources for an Authorisation Server" } }, { "name": "tech-lfi-api-hub-trust-framework-api-api-guide", "path": "/tech/lfi-api-hub/trust-framework/api/api-guide", "component": __pages_import_842__, "props": true, "meta": { "title": "Trust Framework — API Guide" } }, { "name": "tech-lfi-api-hub-trust-framework-api-api-families", "path": "/tech/lfi-api-hub/trust-framework/api/api-families", "component": __pages_import_843__, "props": true, "meta": { "title": "Retrieve all API Families" } }, { "name": "tech-lfi-api-hub-production-testing-certification-user-experience", "path": "/tech/lfi-api-hub/production/testing-certification/user-experience", "component": __pages_import_844__, "props": true }, { "name": "tech-lfi-api-hub-production-testing-certification-tpp-buddying", "path": "/tech/lfi-api-hub/production/testing-certification/tpp-buddying", "component": __pages_import_845__, "props": true }, { "name": "tech-lfi-api-hub-production-testing-certification-self-testing", "path": "/tech/lfi-api-hub/production/testing-certification/self-testing", "component": __pages_import_846__, "props": true }, { "name": "tech-lfi-api-hub-production-testing-certification-security-validation", "path": "/tech/lfi-api-hub/production/testing-certification/security-validation", "component": __pages_import_847__, "props": true }, { "name": "tech-lfi-api-hub-production-testing-certification-performance", "path": "/tech/lfi-api-hub/production/testing-certification/performance", "component": __pages_import_848__, "props": true }, { "name": "tech-lfi-api-hub-production-testing-certification-overview", "path": "/tech/lfi-api-hub/production/testing-certification/overview", "component": __pages_import_849__, "props": true }, { "name": "tech-tpp-standards-trust-framework-well-known", "path": "/tech/tpp-standards/trust-framework/well-known", "component": __pages_import_850__, "props": true, "meta": { "title": "Authorisation Server Discovery (.well-known)" } }, { "name": "tech-tpp-standards-trust-framework-user-sign-up", "path": "/tech/tpp-standards/trust-framework/user-sign-up", "component": __pages_import_851__, "props": true, "meta": { "title": "Trust Framework — Sign Up" } }, { "name": "tech-tpp-standards-trust-framework-roles", "path": "/tech/tpp-standards/trust-framework/roles", "component": __pages_import_852__, "props": true, "meta": { "title": "Trust Framework — Roles", "isIndex": true } }, { "name": "tech-tpp-standards-trust-framework-redirect-uri", "path": "/tech/tpp-standards/trust-framework/redirect-uri", "component": __pages_import_853__, "props": true, "meta": { "title": "Application — Redirect URIs" } }, { "name": "tech-tpp-standards-trust-framework-organisation-admins", "path": "/tech/tpp-standards/trust-framework/organisation-admins", "component": __pages_import_854__, "props": true, "meta": { "title": "Trust Framework — Organisation Admins" } }, { "name": "tech-tpp-standards-trust-framework-onboarding", "path": "/tech/tpp-standards/trust-framework/onboarding", "component": __pages_import_855__, "props": true, "meta": { "title": "Trust Framework — Onboarding" } }, { "name": "tech-tpp-standards-trust-framework-onboarding-form-organisation", "path": "/tech/tpp-standards/trust-framework/onboarding-form-organisation", "component": __pages_import_856__, "props": true, "meta": { "title": "Organisation Details Form" } }, { "name": "tech-tpp-standards-trust-framework-onboarding-form-admin", "path": "/tech/tpp-standards/trust-framework/onboarding-form-admin", "component": __pages_import_857__, "props": true, "meta": { "title": "Primary Organisation Admin Details Form" } }, { "name": "tech-tpp-standards-trust-framework", "path": "/tech/tpp-standards/trust-framework", "component": __pages_import_858__, "props": true, "meta": { "title": "Trust Framework — Overview & Organisations", "isIndex": true } }, { "name": "tech-tpp-standards-trust-framework-flags-metadata", "path": "/tech/tpp-standards/trust-framework/flags-metadata", "component": __pages_import_859__, "props": true, "meta": { "title": "Trust Framework — Flags & Meta Data" } }, { "name": "tech-tpp-standards-trust-framework-creating-an-application", "path": "/tech/tpp-standards/trust-framework/creating-an-application", "component": __pages_import_860__, "props": true, "meta": { "title": "Trust Framework — Creating an Application" } }, { "name": "tech-tpp-standards-trust-framework-contacts", "path": "/tech/tpp-standards/trust-framework/contacts", "component": __pages_import_861__, "props": true, "meta": { "title": "Trust Framework — Contacts" } }, { "name": "tech-tpp-standards-trust-framework-authorisation-servers", "path": "/tech/tpp-standards/trust-framework/authorisation-servers", "component": __pages_import_862__, "props": true, "meta": { "title": "Trust Framework — Authorisation Servers" } }, { "name": "tech-tpp-standards-trust-framework-application", "path": "/tech/tpp-standards/trust-framework/application", "component": __pages_import_863__, "props": true, "meta": { "title": "Trust Framework — Application" } }, { "name": "tech-tpp-standards-trust-framework-api-resources", "path": "/tech/tpp-standards/trust-framework/api-resources", "component": __pages_import_864__, "props": true, "meta": { "title": "Trust Framework — API Resources" } }, { "name": "tech-tpp-standards-trust-framework-api-discovery", "path": "/tech/tpp-standards/trust-framework/api-discovery", "component": __pages_import_865__, "props": true, "meta": { "title": "Trust Framework — API Discovery" } }, { "name": "tech-tpp-standards-trust-framework-adding-users", "path": "/tech/tpp-standards/trust-framework/adding-users", "component": __pages_import_866__, "props": true, "meta": { "title": "Trust Framework — Adding Users" } }, { "name": "tech-tpp-standards-security-request-headers", "path": "/tech/tpp-standards/security/request-headers", "component": __pages_import_867__, "props": true, "meta": { "title": "Request Headers" } }, { "name": "tech-tpp-standards-sandbox-model-insurer", "path": "/tech/tpp-standards/sandbox/model-insurer", "component": __pages_import_868__, "props": true, "meta": { "title": "Sandbox — Model Insurer" } }, { "name": "tech-tpp-standards-sandbox-model-bank", "path": "/tech/tpp-standards/sandbox/model-bank", "component": __pages_import_869__, "props": true, "meta": { "title": "Sandbox — Model Bank" } }, { "name": "tech-tpp-standards-registration-api-guide", "path": "/tech/tpp-standards/registration/api-guide", "component": __pages_import_870__, "props": true, "meta": { "title": "Registering your Application" } }, { "name": "tech-tpp-standards-production-live-proving", "path": "/tech/tpp-standards/production/live-proving", "component": __pages_import_871__, "props": true, "meta": { "title": "Production Live Proving" } }, { "name": "tech-lfi-api-hub-trust-framework-user-sign-up", "path": "/tech/lfi-api-hub/trust-framework/user-sign-up", "component": __pages_import_872__, "props": true, "meta": { "title": "Trust Framework — Sign Up" } }, { "name": "tech-lfi-api-hub-trust-framework-roles", "path": "/tech/lfi-api-hub/trust-framework/roles", "component": __pages_import_873__, "props": true, "meta": { "title": "Trust Framework — Roles", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-organisation-admins", "path": "/tech/lfi-api-hub/trust-framework/organisation-admins", "component": __pages_import_874__, "props": true, "meta": { "title": "Trust Framework — Organisation Admins" } }, { "name": "tech-lfi-api-hub-trust-framework-onboarding", "path": "/tech/lfi-api-hub/trust-framework/onboarding", "component": __pages_import_875__, "props": true, "meta": { "title": "Trust Framework — Onboarding" } }, { "name": "tech-lfi-api-hub-trust-framework-onboarding-form-organisation", "path": "/tech/lfi-api-hub/trust-framework/onboarding-form-organisation", "component": __pages_import_876__, "props": true, "meta": { "title": "Organisation Details Form" } }, { "name": "tech-lfi-api-hub-trust-framework-onboarding-form-admin", "path": "/tech/lfi-api-hub/trust-framework/onboarding-form-admin", "component": __pages_import_877__, "props": true, "meta": { "title": "Primary Organisation Admin Details Form" } }, { "name": "tech-lfi-api-hub-trust-framework", "path": "/tech/lfi-api-hub/trust-framework", "component": __pages_import_878__, "props": true, "meta": { "title": "Trust Framework — Overview & Organisations", "isIndex": true } }, { "name": "tech-lfi-api-hub-trust-framework-creating-c3-application", "path": "/tech/lfi-api-hub/trust-framework/creating-c3-application", "component": __pages_import_879__, "props": true, "meta": { "title": "Trust Framework — Creating the C3-hh-cm-client Application" } }, { "name": "tech-lfi-api-hub-trust-framework-contacts", "path": "/tech/lfi-api-hub/trust-framework/contacts", "component": __pages_import_880__, "props": true, "meta": { "title": "Trust Framework — Contacts" } }, { "name": "tech-lfi-api-hub-trust-framework-application", "path": "/tech/lfi-api-hub/trust-framework/application", "component": __pages_import_881__, "props": true, "meta": { "title": "Trust Framework — Application" } }, { "name": "tech-lfi-api-hub-trust-framework-adding-users", "path": "/tech/lfi-api-hub/trust-framework/adding-users", "component": __pages_import_882__, "props": true, "meta": { "title": "Trust Framework — Adding Users" } }, { "name": "tech-lfi-api-hub-getting-started-insurance-rollout-plan", "path": "/tech/lfi-api-hub/getting-started/insurance-rollout-plan", "component": __pages_import_883__, "props": true, "meta": { "title": "Recommended Insurance Rollout Plan" } }, { "name": "tech-lfi-api-hub-getting-started", "path": "/tech/lfi-api-hub/getting-started", "component": __pages_import_884__, "props": true, "meta": { "title": "Getting Started as an LFI", "isIndex": true } }, { "name": "tech-lfi-api-hub-getting-started-bank-rollout-plan", "path": "/tech/lfi-api-hub/getting-started/bank-rollout-plan", "component": __pages_import_885__, "props": true, "meta": { "title": "Recommended Bank Rollout Plan" } }, { "name": "tech-api-specs-trust-framework-token", "path": "/tech/api-specs/trust-framework/token", "component": __pages_import_886__, "props": true, "meta": { "title": "Obtain an Access Token" } }, { "name": "tech-api-specs-trust-framework-software-statements", "path": "/tech/api-specs/trust-framework/software-statements", "component": __pages_import_887__, "props": true, "meta": { "title": "Retrieve all Software Statements for an Organisation" } }, { "name": "tech-api-specs-trust-framework-participants", "path": "/tech/api-specs/trust-framework/participants", "component": __pages_import_888__, "props": true, "meta": { "title": "Retrieve all Available Open Finance Servers and API Resources" } }, { "name": "tech-api-specs-trust-framework-organisations", "path": "/tech/api-specs/trust-framework/organisations", "component": __pages_import_889__, "props": true, "meta": { "title": "Retrieve all Organisations" } }, { "name": "tech-api-specs-trust-framework-contacts", "path": "/tech/api-specs/trust-framework/contacts", "component": __pages_import_890__, "props": true, "meta": { "title": "Retrieve all Contacts for an Organisation" } }, { "name": "tech-api-specs-trust-framework-auth-servers", "path": "/tech/api-specs/trust-framework/auth-servers", "component": __pages_import_891__, "props": true, "meta": { "title": "Retrieve all Authorisation Servers for an Organisation" } }, { "name": "tech-api-specs-trust-framework-api-resources", "path": "/tech/api-specs/trust-framework/api-resources", "component": __pages_import_892__, "props": true, "meta": { "title": "Retrieve all API Resources for an Authorisation Server" } }, { "name": "tech-api-specs-trust-framework-api-families", "path": "/tech/api-specs/trust-framework/api-families", "component": __pages_import_893__, "props": true, "meta": { "title": "Retrieve all API Families" } }, { "name": "internal-proposals-ofp-011", "path": "/internal/proposals/ofp-011", "component": __pages_import_894__, "props": true, "meta": { "layout": "internal", "title": "OFP-011 · Replace certification testing windows with a Nebras-operated conformance portal" } }, { "name": "internal-proposals-ofp-005", "path": "/internal/proposals/ofp-005", "component": __pages_import_895__, "props": true, "meta": { "layout": "internal", "title": "OFP-005 · Confirm data deletion when a consent is revoked" } }, { "name": "internal-proposals-ofp-005-attestation-schema", "path": "/internal/proposals/ofp-005/attestation-schema", "component": __pages_import_896__, "props": true, "meta": { "layout": "internal", "title": "OFP-005 · Consent attestations sub-resource (draft)" } }, { "name": "internal-proposals-ofp-002-international-schema", "path": "/internal/proposals/ofp-002/international-schema", "component": __pages_import_897__, "props": true, "meta": { "layout": "internal", "title": "OFP-002 · International payment schema (draft)" } }, { "name": "internal-proposals-ofp-002", "path": "/internal/proposals/ofp-002", "component": __pages_import_898__, "props": true, "meta": { "layout": "internal", "title": "OFP-002 · Split the payment schema into Domestic and International definitions" } }, { "name": "internal-proposals-ofp-002-domestic-schema", "path": "/internal/proposals/ofp-002/domestic-schema", "component": __pages_import_899__, "props": true, "meta": { "layout": "internal", "title": "OFP-002 · Domestic payment schema (draft)" } }, { "name": "internal-pages-tpp-certificate", "path": "/internal/pages/tpp-certificate", "component": __pages_import_900__, "props": true, "meta": { "layout": "internal", "title": "TPP go-live certificate", "next": false, "prev": false, "aside": false } }, { "name": "internal-pages-redirect-testing", "path": "/internal/pages/redirect-testing", "component": __pages_import_901__, "props": true, "meta": { "layout": "internal", "title": "Redirect testing", "next": false, "prev": false, "aside": false } }, { "name": "internal-pages-redirect-testing-checker", "path": "/internal/pages/redirect-testing/checker", "component": __pages_import_902__, "props": true, "meta": { "layout": "internal", "title": "Redirect checker", "next": false, "prev": false, "aside": false } }, { "name": "internal-pages-lfi-certificate", "path": "/internal/pages/lfi-certificate", "component": __pages_import_903__, "props": true, "meta": { "layout": "internal", "title": "LFI go-live certificate", "next": false, "prev": false, "aside": false } }, { "name": "tech-tpp-standards", "path": "/tech/tpp-standards", "component": __pages_import_904__, "props": true, "meta": { "title": "TPP Standards", "isIndex": true } }, { "name": "tech-release-notes-and-erratas", "path": "/tech/release-notes-and-erratas", "component": __pages_import_905__, "props": true, "meta": { "title": "Release Notes & Erratas", "isIndex": true } }, { "name": "tech-lfi-api-hub", "path": "/tech/lfi-api-hub", "component": __pages_import_906__, "props": true, "meta": { "title": "LFI Integration Guide", "isIndex": true } }, { "name": "tech-api-specs", "path": "/tech/api-specs", "component": __pages_import_907__, "props": true, "meta": { "title": "API Specifications" } }, { "name": "proposals-ofp-010", "path": "/proposals/ofp-010", "component": __pages_import_908__, "props": true, "meta": { "title": "OFP-010 · Make the transaction narrative (TransactionInformation) a required field" } }, { "name": "proposals-ofp-009", "path": "/proposals/ofp-009", "component": __pages_import_909__, "props": true, "meta": { "title": "OFP-009 · Define validation patterns for the Leads API personal-data fields" } }, { "name": "proposals-ofp-007", "path": "/proposals/ofp-007", "component": __pages_import_910__, "props": true, "meta": { "title": "OFP-007 · Show an LFI its own API Hub configuration in the Admin Portal" } }, { "name": "proposals-ofp-004", "path": "/proposals/ofp-004", "component": __pages_import_911__, "props": true, "meta": { "title": "OFP-004 · Enforce a minimum ExpirationDateTime for consents" } }, { "name": "proposals-ofp-003", "path": "/proposals/ofp-003", "component": __pages_import_912__, "props": true, "meta": { "title": "OFP-003 · Define an allowed character set for Debtor and Creditor References" } }, { "name": "proposals-ofp-001-schema", "path": "/proposals/ofp-001/schema", "component": __pages_import_913__, "props": true, "meta": { "title": "OFP-001 · Bulk/Batch payment schema (draft)" } }, { "name": "proposals-ofp-001-par-schema", "path": "/proposals/ofp-001/par-schema", "component": __pages_import_914__, "props": true, "meta": { "title": "OFP-001 · PAR File Payment consent (draft)" } }, { "name": "proposals-ofp-001", "path": "/proposals/ofp-001", "component": __pages_import_915__, "props": true, "meta": { "title": "OFP-001 · Replace file-based Bulk/Batch Payments with a JSON array" } }, { "name": "pricing-lfi-rates", "path": "/pricing/lfi-rates", "component": __pages_import_916__, "props": true, "meta": { "title": "Data-sharing overage rates by LFI", "isIndex": true } }, { "name": "pricing-endpoints", "path": "/pricing/endpoints", "component": __pages_import_917__, "props": true, "meta": { "title": "Which endpoints are chargeable?", "isIndex": true } }, { "name": "knowledge-base-articles-transaction-date-filters", "path": "/knowledge-base/articles/transaction-date-filters", "component": __pages_import_918__, "props": true, "meta": { "title": "Date Filters — fromBookingDateTime & toBookingDateTime", "description": "What the date-range filters on GET /accounts/{accountId}/transactions and /statements accept, what the API Hub rejects, and what an LFI's Ozone Connect implementation must do.", "category": "Integration", "readTime": "3 min", "updated": "2026-05-21", "tags": ["Data Sharing", "Ozone Connect", "Transactions"] } }, { "name": "knowledge-base-articles-tpp-context-block", "path": "/knowledge-base/articles/tpp-context-block", "component": __pages_import_919__, "props": true, "meta": { "title": "The tpp and decodedSsa Context Blocks on Ozone Connect Calls", "description": "Every call the API Hub makes to your Ozone Connect endpoints carries a tpp object identifying the calling TPP, plus its decoded Software Statement Assertion. This article explains what each field is, why it's there, and the operational reasons an LFI might want to use it — even though none are required for payment execution.", "category": "Integration", "readTime": "7 min", "updated": "2026-04-21", "tags": ["TPP", "SSA", "Context"] } }, { "name": "knowledge-base-articles-request-headers", "path": "/knowledge-base/articles/request-headers", "component": __pages_import_920__, "props": true, "meta": { "title": "FAPI Request Headers — Traceability, Context, and Safe Retries", "description": "What the FAPI and Open Finance request headers are for, why x-fapi-interaction-id is the most important one to get right, and a one-line guide to each of the others.", "category": "Security", "readTime": "7 min", "updated": "2026-04-21", "tags": ["FAPI", "Headers", "Traceability"] } }, { "name": "knowledge-base-articles-pii-encryption", "path": "/knowledge-base/articles/pii-encryption", "component": __pages_import_921__, "props": true, "meta": { "title": "Payment PII Encryption — Why It Exists and What It Means for You", "description": "Why personal identifiable information in payment consents is encrypted end-to-end, what that means for LFI validation responsibility, TPP onboarding care, and how creditor rules differ by payment type.", "category": "Security", "readTime": "8 min", "updated": "2026-04-21", "tags": ["PII", "Encryption", "JWE"] } }, { "name": "knowledge-base-articles-payment-account-permissions", "path": "/knowledge-base/articles/payment-account-permissions", "component": __pages_import_922__, "props": true, "meta": { "title": "Account Permissions in a Payment Consent", "description": "How to use ReadAccountsBasic, ReadAccountsDetail, and ReadBalances on a payment consent, which endpoints they unlock, and why they're useful during a payment flow.", "category": "Payments", "readTime": "6 min", "updated": "2026-04-21", "tags": ["Payments", "Permissions", "Account Data"] } }, { "name": "knowledge-base-articles-pagination", "path": "/knowledge-base/articles/pagination", "component": __pages_import_923__, "props": true, "meta": { "title": "Pagination — LFI `meta` to TPP `Links`", "description": "How page-based pagination flows from the LFI's Ozone Connect response through the API Hub, converted into the Links envelope consumed by the TPP.", "category": "Integration", "readTime": "7 min", "updated": "2026-04-21", "tags": ["Pagination", "Ozone Connect", "Data Sharing"] } }, { "name": "knowledge-base-articles-on-behalf-of", "path": "/knowledge-base/articles/on-behalf-of", "component": __pages_import_924__, "props": true, "meta": { "title": "OnBehalfOf — When to Use It and When Not To", "description": "When to populate OnBehalfOf in PAR requests, which consent types support it, and how payment (service initiation) consents handle merchant identity via creditor fields instead.", "category": "Consents", "readTime": "5 min", "updated": "2026-04-21", "tags": ["Consents", "OnBehalfOf", "Data Sharing"] } }, { "name": "knowledge-base-articles-o3-utils", "path": "/knowledge-base/articles/o3-utils", "component": __pages_import_925__, "props": true, "meta": { "title": "O3 Sandbox Utilities — Signing and Encryption Helpers", "description": "What the O3 Util endpoints are, why they exist, and how to use them in Postman to test message signing, PII encryption, and client assertions without writing your own cryptographic code.", "category": "Integration", "readTime": "6 min", "updated": "2026-04-21", "tags": ["Sandbox", "Tooling", "JWT"] } }, { "name": "knowledge-base-articles-multi-segment-api-hubs", "path": "/knowledge-base/articles/multi-segment-api-hubs", "component": __pages_import_926__, "props": true, "meta": { "title": "Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments", "description": "When an LFI serves multiple customer segments (e.g. retail and SME) with different authentication endpoints, they need one API Hub per segment but can share a single Ozone Connect — minimising LFI-maintained certificates.", "category": "Integration", "readTime": "8 min", "updated": "2026-04-21", "tags": ["API Hub", "LFI", "Topology"] } }, { "name": "knowledge-base-articles-mtls-endpoint-aliases", "path": "/knowledge-base/articles/mtls-endpoint-aliases", "component": __pages_import_927__, "props": true, "meta": { "title": "mtls_endpoint_aliases — what it is and when it matters", "description": "FYI explainer for the mtls_endpoint_aliases object returned by .well-known/openid-configuration. Today the aliases match the top-level endpoints, but the FAPI 2.0 spec allows them to diverge — preferring the alias keeps your client future-proof.", "category": "Security", "readTime": "5 min", "updated": "2026-04-21", "tags": ["mTLS", "Discovery", "FAPI 2.0"] } }, { "name": "knowledge-base-articles-jwt-claims", "path": "/knowledge-base/articles/jwt-claims", "component": __pages_import_928__, "props": true, "meta": { "title": "JWT Claim Rules — Request Object and Client Assertion", "description": "Per-claim reference for both JWTs sent to /par and /token: aud, jti, lifetime windows, sub rules, and the most common rejection causes.", "category": "Security", "readTime": "12 min", "updated": "2026-04-21", "tags": ["JWT", "FAPI", "PAR"] } }, { "name": "knowledge-base-articles-identity-assurance-claims", "path": "/knowledge-base/articles/identity-assurance-claims", "component": __pages_import_929__, "props": true, "meta": { "title": "Identity Assurance Claims — OIDC IDA as the response format for customer data", "description": "Why GET /customer, GET /accounts/{AccountId}/customer, and the CoP query response all share a verifiedClaims envelope derived from OpenID Connect for Identity Assurance 1.0.", "category": "Integration", "readTime": "9 min", "updated": "2026-04-21", "tags": ["OIDC IDA", "Customer Data", "Ozone Connect"] } }, { "name": "knowledge-base-articles-consent-identifiers", "path": "/knowledge-base/articles/consent-identifiers", "component": __pages_import_930__, "props": true, "meta": { "title": "Consent Identifiers — Why End User and Account IDs Must Be Opaque", "description": "Why any identifier patched onto a consent (psuIdentifiers, accountIds) must be an opaque, non-sensitive, stable LFI-defined value.", "category": "Consents", "readTime": "6 min", "updated": "2026-04-21", "tags": ["Consents", "end user Identifiers", "Data Protection"] } }, { "name": "knowledge-base-articles-choosing-a-payment-type", "path": "/knowledge-base/articles/choosing-a-payment-type", "component": __pages_import_931__, "props": true, "meta": { "title": "Choosing a Payment Type", "description": "Guide to the seven UAE Open Finance payment types — Single Instant Payment and the six Multi-Payment variants — with a decision framework for selecting the right one and notes on the Delegated SCA overlay.", "category": "Payments", "readTime": "10 min", "updated": "2026-04-21", "tags": ["Payments", "Multi-Payment", "Decision Guide"] } }, { "name": "knowledge-base-articles-certificate-rotation", "path": "/knowledge-base/articles/certificate-rotation", "component": __pages_import_932__, "props": true, "meta": { "title": "Certificate Rotation — A Best-Practice Guide for LFIs and TPPs", "description": "How to rotate your Trust Framework certificates before they expire. You rotate only the certificates whose private key you hold; Nebras rotates the rest. All certificates expire after 13 months except the server encryption key, and the Trust Framework emails expiry reminders starting two months out.", "category": "Security", "readTime": "7 min", "updated": "2026-06-03", "tags": ["Certificates", "Trust Framework", "mTLS"] } }, { "name": "knowledge-base-articles-base-consent-id", "path": "/knowledge-base/articles/base-consent-id", "component": __pages_import_933__, "props": true, "meta": { "title": "Base Consent ID (consentGroupId) – How to Link Consents", "description": "How to use a Base Consent ID to link related consents within a TPP's service, and when it applies.", "category": "Consents", "readTime": "7 min", "updated": "2026-04-21", "tags": ["Consents", "Consent Linking", "consentGroupId"] } }, { "name": "internal-proposals-ofp-008", "path": "/internal/proposals/ofp-008", "component": __pages_import_934__, "props": true, "meta": { "layout": "internal", "title": "OFP-008 · Protect FinanceRates with an LFI-hosted display element" } }, { "name": "internal-proposals", "path": "/internal/proposals", "component": __pages_import_935__, "props": true, "meta": { "layout": "internal", "title": "Internal proposals", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-retail-consumer-protection", "path": "/internal/policies/retail-consumer-protection", "component": __pages_import_936__, "props": true, "meta": { "layout": "internal", "title": "Retail Consumer Protection Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-product-and-services", "path": "/internal/policies/product-and-services", "component": __pages_import_937__, "props": true, "meta": { "layout": "internal", "title": "Product and Services Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-procurement", "path": "/internal/policies/procurement", "component": __pages_import_938__, "props": true, "meta": { "layout": "internal", "title": "Procurement Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-outsourcing", "path": "/internal/policies/outsourcing", "component": __pages_import_939__, "props": true, "meta": { "layout": "internal", "title": "Outsourcing Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-marketing-and-advertising", "path": "/internal/policies/marketing-and-advertising", "component": __pages_import_940__, "props": true, "meta": { "layout": "internal", "title": "Marketing and Advertising Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-internal-audit", "path": "/internal/policies/internal-audit", "component": __pages_import_941__, "props": true, "meta": { "layout": "internal", "title": "Internal Audit Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-information-security", "path": "/internal/policies/information-security", "component": __pages_import_942__, "props": true, "meta": { "layout": "internal", "title": "Information Security Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies", "path": "/internal/policies", "component": __pages_import_943__, "props": true, "meta": { "layout": "internal", "title": "Policies", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-hr", "path": "/internal/policies/hr", "component": __pages_import_944__, "props": true, "meta": { "layout": "internal", "title": "Human Resources Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-enterprise-risk-management", "path": "/internal/policies/enterprise-risk-management", "component": __pages_import_945__, "props": true, "meta": { "layout": "internal", "title": "Enterprise Risk Management Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-corporate-governance", "path": "/internal/policies/corporate-governance", "component": __pages_import_946__, "props": true, "meta": { "layout": "internal", "title": "Corporate Governance Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-complaints-and-disputes", "path": "/internal/policies/complaints-and-disputes", "component": __pages_import_947__, "props": true, "meta": { "layout": "internal", "title": "Complaints and Disputes Management Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-business-continuity", "path": "/internal/policies/business-continuity", "component": __pages_import_948__, "props": true, "meta": { "layout": "internal", "title": "Business Continuity & Disaster Recovery Policy", "next": false, "prev": false, "aside": false } }, { "name": "internal-policies-aml-cft-and-fraud", "path": "/internal/policies/aml-cft-and-fraud", "component": __pages_import_949__, "props": true, "meta": { "layout": "internal", "title": "AML/CFT and Fraud Policy", "next": false, "prev": false, "aside": false } }, { "name": "_dev-kit", "path": "/_dev/kit", "component": __pages_import_950__, "props": true }, { "name": "_dev-component-viewer", "path": "/_dev/component-viewer", "component": __pages_import_951__, "props": true }, { "name": "proposals-ofp-006", "path": "/proposals/ofp-006", "component": __pages_import_952__, "props": true, "meta": { "title": "OFP-006 · Carry the requested API version into the Ozone Connect path" } }, { "name": "proposals", "path": "/proposals", "component": __pages_import_953__, "props": true, "meta": { "title": "Proposals & Voting", "isIndex": true } }, { "name": "program-whats-live", "path": "/program/whats-live", "component": __pages_import_954__, "props": true, "meta": { "title": "In Production", "isIndex": true } }, { "name": "pricing", "path": "/pricing", "component": __pages_import_955__, "props": true, "meta": { "title": "Pricing", "isIndex": true } }, { "name": "policy-version-management", "path": "/policy/version-management", "component": __pages_import_956__, "props": true, "meta": { "title": "Version Management Policy", "appliesTo": ["Nebras"], "purpose": "Defines how API specifications, UI components, and related standards are versioned for the UAE Open Finance ecosystem — major and minor cadence, errata constraints, and the stability guarantees that apply once a capability is declared Live.", "readTime": "5 min", "updated": "2026-04-21" } }, { "name": "policy-secure-management", "path": "/policy/secure-management", "component": __pages_import_957__, "props": true, "meta": { "title": "Secure Management of Keys and Credentials in UAE Open Finance", "appliesTo": ["Licensed Financial Institutions (LFIs)", "Third-Party Providers (TPPs)", "System Integrators and Technology Service Providers", "Ozone (API Hub)", "Raidiam (Trust Framework)"], "purpose": "Mandatory and recommended practices for the secure management of cryptographic keys and credentials across the UAE Open Finance ecosystem — HSMs, KMS, key lifecycle, strong authentication, access management, and BYOK / MYOK.", "readTime": "3 min", "updated": "2026-04-21" } }, { "name": "policy-ozone-connect-data-quality", "path": "/policy/ozone-connect-data-quality", "component": __pages_import_958__, "props": true, "meta": { "title": "Ozone Connect Data Quality Policy", "appliesTo": ["Licensed Financial Institutions (LFIs)", "Nebras"], "purpose": "Defines data quality expectations — required and optional field delivery, accuracy, real-time freshness — for data returned by an LFI's Ozone Connect endpoints, plus the Data Mapping Commitment and the monitoring that holds LFIs to it.", "readTime": "7 min", "updated": "2026-04-22" } }, { "name": "policy-ozone-connect-availability", "path": "/policy/ozone-connect-availability", "component": __pages_import_959__, "props": true, "meta": { "title": "Ozone Connect Availability Policy", "appliesTo": ["Licensed Financial Institutions (LFIs)", "Nebras"], "purpose": "Sets the 99.5% monthly availability standard for an LFI's Ozone Connect endpoints — including how unavailability is defined, how it is monitored, and the incident, maintenance, and remediation processes that apply when the target is missed.", "readTime": "6 min", "updated": "2026-04-22" } }, { "name": "policy-open-license-contribution-agreement", "path": "/policy/open-license-contribution-agreement", "component": __pages_import_960__, "props": true, "meta": { "title": "Open License and Contribution Agreement", "appliesTo": ["Licensed Financial Institutions (LFIs)", "Third-Party Providers (TPPs)", "System Integrators and Technology Service Providers"], "purpose": "The legal terms, copyright license, attribution rules, warranty disclaimer, and contribution agreement applicable to anyone who accesses, implements, or contributes to the UAE Open Finance Standards.", "readTime": "3 min", "updated": "2026-04-21" } }, { "name": "policy-lfi-deprecation", "path": "/policy/lfi-deprecation", "component": __pages_import_961__, "props": true, "meta": { "title": "Major Version Deprecation Policy", "appliesTo": ["Licensed Financial Institutions (LFIs)", "System Integrators and Technology Service Providers", "Nebras"], "purpose": "Defines dual-running and deprecation requirements LFIs must follow when a new major version of the Open Finance standard is introduced — protecting TPPs and their customers from disruption while the ecosystem moves forward.", "readTime": "6 min", "updated": "2026-04-21" } }, { "name": "policy", "path": "/policy", "component": __pages_import_962__, "props": true, "meta": { "title": "Policies", "isIndex": true } }, { "name": "policy-changes-to-published-content", "path": "/policy/changes-to-published-content", "component": __pages_import_963__, "props": true, "meta": { "title": "Changes to Published Documentation Policy", "appliesTo": ["Nebras"], "purpose": "Defines how published documentation may be changed — Errata-only for published versions, free updates for non-published release-candidate baselines, with traceability and surfacing requirements.", "readTime": "2 min", "updated": "2026-04-21" } }, { "name": "policy-api-response-time", "path": "/policy/api-response-time", "component": __pages_import_964__, "props": true, "meta": { "title": "API Response Time Policy", "appliesTo": ["Licensed Financial Institutions (LFIs)", "Nebras"], "purpose": "Defines the 500 ms p95 response-time target for every TPP-facing Open Finance API request that reaches an LFI — measured end to end across TPP → API Hub → Ozone Connect → API Hub → TPP, how the window is attributed between Nebras and the LFI, and the degradation incident process when the target is missed.", "readTime": "8 min", "updated": "2026-08-04" } }, { "name": "knowledge-base", "path": "/knowledge-base", "component": __pages_import_965__, "props": true, "meta": { "title": "Knowledge Base", "isIndex": true } }, { "name": "internal", "path": "/internal", "component": __pages_import_966__, "props": true, "meta": { "layout": "internal", "title": "Internal", "next": false, "prev": false, "aside": false } }, { "name": "internal-example", "path": "/internal/example", "component": __pages_import_967__, "props": true, "meta": { "layout": "internal", "title": "Example page", "next": false, "prev": false, "aside": false } }, { "name": "doc-repository", "path": "/doc-repository", "component": __pages_import_968__, "props": true, "meta": { "title": "Document Repository", "isIndex": true } }, { "name": "doc-repository-how-to-access", "path": "/doc-repository/how-to-access", "component": __pages_import_969__, "props": true, "meta": { "title": "Accessing the Document Repository", "purpose": "How to browse the Document Repository, sign in via the production Trust Framework directory, and who can see an organisation's protected and private documents.", "updated": "2026-06-22" } }, { "name": "support-service-desk", "path": "/support-service-desk", "component": __pages_import_970__, "props": true, "meta": { "title": "Support Service Desk", "isIndex": true } }, { "name": "news", "path": "/news", "component": __pages_import_971__, "props": true, "meta": { "title": "News", "isIndex": true } }, { "name": "metrics", "path": "/metrics", "component": __pages_import_972__, "props": true, "meta": { "title": "Metrics" } }, { "name": "index", "path": "/", "component": __pages_import_973__, "props": true, "meta": { "title": "Home", "isIndex": true } }, { "name": "notFound", "path": "/:notFound(.*)*", "component": __pages_import_974__, "props": true, "meta": { "title": "Page not found" } }, { "name": "doc-repository-id", "path": "/doc-repository/:id", "component": __pages_import_975__, "props": true, "meta": { "title": "Document Repository — Org" } }, { "name": "internal-draft-slug", "path": "/internal/draft/:slug", "component": __pages_import_976__, "props": true, "meta": { "layout": "internal", "title": "Internal draft", "next": false, "prev": false, "aside": false } }, { "name": "proposals-id-votes", "path": "/proposals/:id/votes", "component": __pages_import_977__, "props": true, "meta": { "title": "Proposal votes" } }, { "name": "tech-api-specs-slug", "path": "/tech/api-specs/:slug(.+)", "component": __pages_import_978__, "props": true, "meta": { "title": "API Reference", "isIndex": true } }, { "name": "tech-release-notes-and-erratas-changelog-version", "path": "/tech/release-notes-and-erratas/changelog/:version", "component": __pages_import_979__, "props": true, "meta": { "title": "Version Changelog" } }, { "name": "tech-release-notes-and-erratas-erratas-version", "path": "/tech/release-notes-and-erratas/erratas/:version", "component": __pages_import_980__, "props": true, "meta": { "title": "Erratas" } }, { "name": "tech-release-notes-and-erratas-release-notes-api-hub-year", "path": "/tech/release-notes-and-erratas/release-notes/api-hub/:year", "component": __pages_import_981__, "props": true, "meta": { "title": "API Hub Release Notes" } }, { "name": "tech-release-notes-and-erratas-release-notes-trust-framework-year", "path": "/tech/release-notes-and-erratas/release-notes/trust-framework/:year", "component": __pages_import_982__, "props": true, "meta": { "title": "Trust Framework Release Notes" } }];
const _imports_0 = "/AlTareq.png";
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "PageFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "ed-footer" }, _attrs))} data-v-ab646351><div class="ed-footer__inner" data-v-ab646351><div class="ed-footer__col ed-footer__col--brand" data-v-ab646351><div class="ed-footer__brand" data-v-ab646351><img${ssrRenderAttr("src", _imports_0)} alt="AlTareq" class="ed-footer__logo" data-v-ab646351><span class="ed-footer__beta" data-v-ab646351>Beta<i aria-hidden="true" data-v-ab646351></i></span></div><div class="ed-footer__tag" data-v-ab646351>UAE Open Finance · Community</div></div><div class="ed-footer__col" data-v-ab646351><div class="ed-footer__heading" data-v-ab646351>The project</div><p class="ed-footer__copy" data-v-ab646351> This site is open source. Help improve the data, documentation, guides, or supporting content. Every contribution strengthens the ecosystem. </p></div><div class="ed-footer__col ed-footer__col--links" data-v-ab646351><div class="ed-footer__heading" data-v-ab646351>Sections</div><a class="ed-footer__link" href="/tech/tpp-standards/" data-v-ab646351>TPP standards</a><a class="ed-footer__link" href="/tech/lfi-api-hub/" data-v-ab646351>LFI Hub integration guide</a><a class="ed-footer__link" href="/support-service-desk/" data-v-ab646351>Service Desk</a><a class="ed-footer__link" href="/metrics" data-v-ab646351>Metrics</a></div><div class="ed-footer__col ed-footer__col--links" data-v-ab646351><div class="ed-footer__heading" data-v-ab646351>Contribute</div><a class="ed-footer__link" href="https://github.com/Nebras-Open-Finance/community-standards" target="_blank" rel="noopener noreferrer" data-v-ab646351>View on GitHub ↗</a><a class="ed-footer__link" href="https://github.com/Nebras-Open-Finance/community-standards/issues" target="_blank" rel="noopener noreferrer" data-v-ab646351>Open an issue</a></div></div><div class="ed-footer__base" data-v-ab646351><span data-v-ab646351>© ${ssrInterpolate(unref(year))} · Community project · Not an official CBUAE publication</span><span class="ed-footer__base-mono" data-v-ab646351>Authors · Thomas Catchpole &amp; Nowaier AlQahtani</span></div></footer>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/chrome/PageFooter.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __unplugin_components_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-ab646351"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "EdSidebarItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    level: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const level = computed(() => props.level ?? 0);
    const route = useRoute();
    function normalize(p) {
      return p.replace(/\/$/, "");
    }
    function linkMatches(link) {
      if (!link) return false;
      return normalize(route.path ?? "") === normalize(link);
    }
    function containsActive(item) {
      if (linkMatches(item.link)) return true;
      return Array.isArray(item.items) && item.items.some(containsActive);
    }
    const isActive = computed(() => linkMatches(props.item.link));
    const hasActiveDescendant = computed(() => containsActive(props.item));
    const hasChildren = computed(() => Array.isArray(props.item.items) && props.item.items.length > 0);
    const initialLevel = props.level ?? 0;
    const initialOpen = hasActiveDescendant.value ? true : props.item.collapsed === false ? true : props.item.collapsed === true ? false : initialLevel < 2;
    const open = ref(initialOpen);
    watch(hasActiveDescendant, (active) => {
      if (active) open.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EdSidebarItem = resolveComponent("EdSidebarItem", true);
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["ed-sb-item", [`ed-sb-item--level-${level.value}`, { "is-active": isActive.value, "has-children": hasChildren.value, "is-open": open.value }]]
      }, _attrs))} data-v-406d8e50><div class="${ssrRenderClass([{ "is-row-toggle": hasChildren.value && !__props.item.link }, "ed-sb-item__row"])}" data-v-406d8e50>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.item.link ? "a" : "span"), {
        href: __props.item.link || void 0,
        class: "ed-sb-item__label"
      }, null), _parent);
      if (hasChildren.value) {
        _push(`<button type="button" class="ed-sb-item__caret"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-label", open.value ? "Collapse" : "Expand")} data-v-406d8e50><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" data-v-406d8e50><path${ssrRenderAttr("d", open.value ? "M2 4 L5 7 L8 4" : "M3.5 2 L6.5 5 L3.5 8")} stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" data-v-406d8e50></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (hasChildren.value && open.value) {
        _push(`<ul class="ed-sb-item__children" data-v-406d8e50><!--[-->`);
        ssrRenderList(__props.item.items, (child, i) => {
          _push(ssrRenderComponent(_component_EdSidebarItem, {
            key: (child.link || child.text || "") + i,
            item: child,
            level: level.value + 1
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdSidebarItem.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const EdSidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-406d8e50"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "EdHoverSidebar",
  __ssrInlineRender: true,
  props: {
    items: {},
    title: { default: "Sections" },
    rootHref: { default: "" }
  },
  setup(__props) {
    const open = ref(false);
    const supportsHover = ref(false);
    onMounted(() => {
      if (typeof window !== "undefined" && window.matchMedia) {
        supportsHover.value = window.matchMedia("(hover: hover)").matches;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["ed-hsb", { "is-open": open.value }],
        "aria-label": __props.title
      }, _attrs))} data-v-e62eed83><div class="ed-hsb__hit" data-v-e62eed83><div class="ed-hsb__rail" aria-hidden="true" data-v-e62eed83></div><button type="button" class="ed-hsb__tab"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-controls", `ed-hsb-nav-${__props.title}`)} tabindex="0" data-v-e62eed83><svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true" data-v-e62eed83><path d="M1 1.5h14M1 7h10M1 12.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" data-v-e62eed83></path></svg><span class="ed-hsb__tab-text" data-v-e62eed83>Sidebar</span></button></div><button type="button" class="ed-hsb__mobile-toggle"${ssrRenderAttr("aria-expanded", open.value)}${ssrRenderAttr("aria-controls", `ed-hsb-nav-${__props.title}`)} data-v-e62eed83><svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true" data-v-e62eed83><path d="M1 1.5h14M1 7h10M1 12.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" data-v-e62eed83></path></svg><span data-v-e62eed83>Sidebar</span></button><div class="ed-hsb__drawer"${ssrRenderAttr("id", `ed-hsb-nav-${__props.title}`)} data-v-e62eed83><header class="ed-hsb__head" data-v-e62eed83>`);
      if (__props.rootHref) {
        _push(`<a${ssrRenderAttr("href", __props.rootHref)} class="ed-hsb__title" data-v-e62eed83>${ssrInterpolate(__props.title)}</a>`);
      } else {
        _push(`<span class="ed-hsb__title" data-v-e62eed83>${ssrInterpolate(__props.title)}</span>`);
      }
      _push(`<button type="button" class="ed-hsb__close" aria-label="Close sidebar" data-v-e62eed83><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" data-v-e62eed83><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" data-v-e62eed83></path></svg></button></header><nav class="ed-hsb__nav" data-v-e62eed83><ul class="ed-hsb__list" data-v-e62eed83><!--[-->`);
      ssrRenderList(__props.items, (item, i) => {
        _push(ssrRenderComponent(EdSidebarItem, {
          key: (item.link || item.text || "") + i,
          item,
          level: 0
        }, null, _parent));
      });
      _push(`<!--]--></ul></nav></div></aside>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/editorial/EdHoverSidebar.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __unplugin_components_23 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-e62eed83"]]);
const RELEASE_NOTES_PREFIX = "/tech/release-notes-and-erratas";
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DraftVersionBanner",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const draftVersion = computed(() => {
      if (route.path.startsWith(RELEASE_NOTES_PREFIX)) return null;
      const segments = route.path.split("/").filter(Boolean);
      return DRAFT_VERSIONS.find((v) => segments.includes(v)) ?? null;
    });
    const protocolVersion = computed(
      () => draftVersion.value ? PROTOCOL_VERSION[draftVersion.value] : ""
    );
    const changelogUrl = computed(
      () => `/tech/release-notes-and-erratas/changelog/${draftVersion.value}/`
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(draftVersion)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "dvb",
          role: "note"
        }, _attrs))} data-v-b96f6a30><div class="dvb__inner" data-v-b96f6a30><span class="dvb__tag" data-v-b96f6a30>Release candidate</span><p class="dvb__text" data-v-b96f6a30> This is <strong data-v-b96f6a30>${ssrInterpolate(unref(draftVersion))}</strong> — a release candidate for the ${ssrInterpolate(unref(protocolVersion))} standards, published for review and not yet ratified. It MUST NOT be used as the basis for a production implementation. For the current standards, switch to <strong data-v-b96f6a30>${ssrInterpolate(unref(CURRENT_VERSION))}</strong> using the version selector. See the <a${ssrRenderAttr("href", unref(changelogUrl))} data-v-b96f6a30>${ssrInterpolate(unref(CURRENT_VERSION))} → ${ssrInterpolate(unref(draftVersion))} changelog</a> for every change in this version. </p></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/chrome/DraftVersionBanner.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-b96f6a30"]]);
const SITE_ANNOUNCEMENT = {
  id: "2026-08-v2.1-errata-and-v2.2-rc1",
  enabled: true,
  eyebrow: "What's new",
  title: "v2.1 errata and v2.2-rc1 are now published",
  lede: "Two publications affect implementers on the current standards. Both are worth reading before your next release.",
  items: [
    {
      tag: "v2.1",
      title: "v2.1 errata changes",
      summary: "Corrections to the ratified v2.1 standards. Errata are binding on v2.1 implementations — review the affected endpoints and schemas against what you have built.",
      // Points at the existing v2.1 errata page until the dedicated
      // errata-changes page is written.
      path: "/tech/release-notes-and-erratas/erratas/v2.1/",
      linkLabel: "Read the v2.1 errata"
    },
    {
      tag: "v2.2-rc1",
      title: "v2.2-rc1 published for review",
      summary: "The first release candidate for v2.2, published for community review. It is not ratified and MUST NOT be used as the basis for a production implementation.",
      // Points at the v2.1 -> v2.2-rc1 changelog until a dedicated v2.2-rc1
      // landing page is written.
      path: "/tech/release-notes-and-erratas/changelog/v2.2-rc1/",
      linkLabel: "See what changed in v2.2",
      switchTo: { version: "v2.2-rc1", label: "Switch to v2.2-rc1" }
    }
  ],
  dismissLabel: "Got it"
};
const tourTarget = ref(null);
const WIDE_QUERY = "(min-width: 960px)";
const wideViewport = ref(false);
let mediaWatched = false;
function watchViewport() {
  if (mediaWatched || typeof window === "undefined" || !window.matchMedia) return;
  mediaWatched = true;
  const mq = window.matchMedia(WIDE_QUERY);
  wideViewport.value = mq.matches;
  mq.addEventListener("change", (e) => {
    wideViewport.value = e.matches;
    if (!e.matches) endVersionTour();
  });
}
function startVersionTour(v) {
  tourTarget.value = v;
}
function endVersionTour() {
  tourTarget.value = null;
}
function useVersionTour() {
  watchViewport();
  return {
    tourTarget,
    tourActive: computed(() => tourTarget.value !== null && wideViewport.value),
    wideViewport,
    startTour: startVersionTour,
    endTour: endVersionTour
  };
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SiteAnnouncementModal",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { selectedVersion: selectedVersion2 } = useSelectedVersion();
    const { wideViewport: wideViewport2 } = useVersionTour();
    const NON_PUBLIC_RE = [
      /^\/_dev(\/|$)/,
      /^\/internal(\/|$)/,
      /(^|\/)_shared(\/|$)/
    ];
    const isPublicPage = computed(
      () => !NON_PUBLIC_RE.some((re) => re.test(route.path))
    );
    const STORAGE_KEY2 = `at-announcement-dismissed:${SITE_ANNOUNCEMENT.id}`;
    const dismissed = ref(true);
    const mounted = ref(false);
    const open = computed(
      () => mounted.value && SITE_ANNOUNCEMENT.enabled && !dismissed.value && isPublicPage.value
    );
    const panelRef = ref(null);
    const dismissRef = ref(null);
    let previouslyFocused = null;
    function readDismissed() {
      try {
        return sessionStorage.getItem(STORAGE_KEY2) === "1";
      } catch {
        return true;
      }
    }
    function dismiss() {
      dismissed.value = true;
      try {
        sessionStorage.setItem(STORAGE_KEY2, "1");
      } catch {
      }
    }
    function onFollow() {
      dismiss();
    }
    function canGuide(item) {
      if (!item.switchTo) return false;
      if (!wideViewport2.value) return false;
      if (!routeHasVersionDropdown(route.path)) return false;
      return selectedVersion2.value !== item.switchTo.version;
    }
    function onKeydown(e) {
      if (!open.value) return;
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.value;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll("a[href], button:not([disabled])")
      ).filter((el) => el.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    let previousOverflow = "";
    watch(open, (isOpen2) => {
      var _a;
      if (typeof document === "undefined") return;
      if (isOpen2) {
        previouslyFocused = document.activeElement;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        void nextTick(() => {
          var _a2;
          return (_a2 = dismissRef.value) == null ? void 0 : _a2.focus();
        });
      } else {
        document.body.style.overflow = previousOverflow;
        (_a = previouslyFocused == null ? void 0 : previouslyFocused.focus) == null ? void 0 : _a.call(previouslyFocused);
        previouslyFocused = null;
      }
    });
    onMounted(() => {
      dismissed.value = readDismissed();
      mounted.value = true;
      document.addEventListener("keydown", onKeydown);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onKeydown);
      if (typeof document !== "undefined") document.body.style.overflow = previousOverflow;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      ssrRenderTeleport(_push, (_push2) => {
        if (open.value) {
          _push2(`<div class="at-ann-overlay" data-v-e6c08ac0><div class="at-ann" role="dialog" aria-modal="true" aria-labelledby="at-ann-title" aria-describedby="at-ann-lede" data-v-e6c08ac0><button type="button" class="at-ann__close" aria-label="Close announcement" data-v-e6c08ac0><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-v-e6c08ac0><path d="M5 5l14 14M19 5L5 19" data-v-e6c08ac0></path></svg></button><div class="at-ann__eyebrow" data-v-e6c08ac0><span class="at-ann__dash" data-v-e6c08ac0></span> ${ssrInterpolate(unref(SITE_ANNOUNCEMENT).eyebrow)}</div><h2 id="at-ann-title" class="at-ann__title" data-v-e6c08ac0>${ssrInterpolate(unref(SITE_ANNOUNCEMENT).title)}</h2><p id="at-ann-lede" class="at-ann__lede" data-v-e6c08ac0>${ssrInterpolate(unref(SITE_ANNOUNCEMENT).lede)}</p><ul class="at-ann__list" data-v-e6c08ac0><!--[-->`);
          ssrRenderList(unref(SITE_ANNOUNCEMENT).items, (item) => {
            var _a;
            _push2(`<li class="at-ann__item" data-v-e6c08ac0><span class="at-ann__tag" data-v-e6c08ac0>${ssrInterpolate(item.tag)}</span><div class="at-ann__body" data-v-e6c08ac0><h3 class="at-ann__item-title" data-v-e6c08ac0>${ssrInterpolate(item.title)}</h3><p class="at-ann__summary" data-v-e6c08ac0>${ssrInterpolate(item.summary)}</p><div class="at-ann__actions" data-v-e6c08ac0>`);
            _push2(ssrRenderComponent(_component_RouterLink, {
              to: item.path,
              class: "at-ann__link",
              onClick: onFollow
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(item.linkLabel)} <span aria-hidden="true" data-v-e6c08ac0${_scopeId}>→</span>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.linkLabel) + " ", 1),
                    createVNode("span", { "aria-hidden": "true" }, "→")
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (canGuide(item)) {
              _push2(`<button type="button" class="at-ann__link at-ann__link--button" data-v-e6c08ac0>${ssrInterpolate((_a = item.switchTo) == null ? void 0 : _a.label)} <span aria-hidden="true" data-v-e6c08ac0>→</span></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></li>`);
          });
          _push2(`<!--]--></ul><button type="button" class="at-ann__btn" data-v-e6c08ac0>${ssrInterpolate(unref(SITE_ANNOUNCEMENT).dismissLabel)}</button></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/chrome/SiteAnnouncementModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e6c08ac0"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "VersionDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const { selectedVersion: selectedVersion2 } = useSelectedVersion();
    const showVersion = computed(() => routeHasVersionDropdown(route.path));
    const isOpen2 = ref(false);
    const dropdownEl = ref(null);
    const btnEl = ref(null);
    const { tourTarget: tourTarget2, tourActive, endTour } = useVersionTour();
    const inTour = computed(() => tourActive.value && showVersion.value);
    const coachText = computed(
      () => isOpen2.value ? `Now choose ${tourTarget2.value}` : "Open the version menu"
    );
    function handleOutsideClick(e) {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (dropdownEl.value && !dropdownEl.value.contains(target)) {
        isOpen2.value = false;
      }
    }
    function handleTourKeydown(e) {
      if (inTour.value && e.key === "Escape") endTour();
    }
    watch(() => route.path, () => endTour());
    watch(inTour, (active) => {
      if (active) void nextTick(() => {
        var _a;
        return (_a = btnEl.value) == null ? void 0 : _a.focus();
      });
    });
    onMounted(() => {
      document.addEventListener("click", handleOutsideClick, true);
      document.addEventListener("keydown", handleTourKeydown);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleOutsideClick, true);
      document.removeEventListener("keydown", handleTourKeydown);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(showVersion)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          ref_key: "dropdownEl",
          ref: dropdownEl,
          class: ["vd-wrap", { open: unref(isOpen2), tour: unref(inTour) }]
        }, _attrs))} data-v-e0492b63>`);
        ssrRenderTeleport(_push, (_push2) => {
          if (unref(inTour)) {
            _push2(`<div class="vd-scrim" data-v-e0492b63></div>`);
          } else {
            _push2(`<!---->`);
          }
        }, "body", false, _parent);
        if (unref(inTour)) {
          _push(`<div class="vd-coach" role="status" aria-live="polite" data-v-e0492b63><span class="vd-coach__text" data-v-e0492b63>${ssrInterpolate(unref(coachText))}</span><button type="button" class="vd-coach__skip" data-v-e0492b63>Skip</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="${ssrRenderClass([{ "is-pulsing": unref(inTour) && !unref(isOpen2) }, "vd-btn"])}"${ssrRenderAttr("aria-expanded", unref(isOpen2) ? "true" : "false")} data-v-e0492b63>${ssrInterpolate(unref(selectedVersion2))} <svg class="vd-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-e0492b63><path d="m6 9 6 6 6-6" data-v-e0492b63></path></svg></button><div class="vd-menu" role="listbox" data-v-e0492b63><!--[-->`);
        ssrRenderList(unref(VERSIONS), (v) => {
          _push(`<button type="button" role="option" class="${ssrRenderClass([{ active: v === unref(selectedVersion2), "is-tour-pick": unref(inTour) && v === unref(tourTarget2) }, "vd-item"])}"${ssrRenderAttr("aria-selected", v === unref(selectedVersion2) ? "true" : "false")} data-v-e0492b63><span class="vd-label" data-v-e0492b63>${ssrInterpolate(v)} `);
          if (unref(isDraftVersion)(v)) {
            _push(`<span class="vd-draft" data-v-e0492b63>rc</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span>`);
          if (v === unref(selectedVersion2)) {
            _push(`<svg class="vd-check" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-e0492b63><polyline points="20 6 9 17 4 12" data-v-e0492b63></polyline></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/chrome/VersionDropdown.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __unplugin_components_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e0492b63"]]);
const DARK_CLASS = "dark";
const STORAGE_KEY$2 = "theme";
function readInitial() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains(DARK_CLASS);
}
const enabled = ref(readInitial());
function applyClass(on) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle(DARK_CLASS, on);
}
function persist$1(on) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY$2, on ? "dark" : "light");
  } catch {
  }
}
function useDarkPreview() {
  function toggle() {
    enabled.value = !enabled.value;
    applyClass(enabled.value);
    persist$1(enabled.value);
  }
  return { enabled, toggle };
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PageHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { enabled: darkPreview } = useDarkPreview();
    const SearchModal = defineAsyncComponent(() => import("./assets/SearchModal-CstaJWsW.js"));
    const route = useRoute();
    const { isOpen: searchOpen, everOpened: searchEverOpened, close, toggle } = useSearchModal();
    const menuOpen = ref(false);
    const docsOpen = ref(false);
    const programOpen = ref(false);
    function handleClickOutside(e) {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(".ed-nav__group")) {
        docsOpen.value = false;
        programOpen.value = false;
      }
    }
    function handleKey(e) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!searchOpen.value) menuOpen.value = false;
        toggle();
      }
    }
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKey);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    });
    function isActive(prefix) {
      return route.path === prefix || route.path.startsWith(prefix + "/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VersionDropdown = __unplugin_components_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "ed-header" }, _attrs))} data-v-7d0f8878><div class="ed-header__inner" data-v-7d0f8878><button type="button" class="${ssrRenderClass([{ "is-dark": unref(darkPreview) }, "ed-theme-toggle"])}"${ssrRenderAttr("aria-pressed", unref(darkPreview) ? "true" : "false")}${ssrRenderAttr("aria-label", unref(darkPreview) ? "Switch to light mode" : "Switch to dark mode")}${ssrRenderAttr("title", unref(darkPreview) ? "Light mode" : "Dark mode")} data-v-7d0f8878>`);
      if (!unref(darkPreview)) {
        _push(`<svg class="ed-theme-toggle__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-7d0f8878><circle cx="12" cy="12" r="4.2" data-v-7d0f8878></circle><path d="M12 2.5v2.2M12 19.3v2.2M4.5 12H2.3M21.7 12h-2.2M5.6 5.6L4 4M20 20l-1.6-1.6M5.6 18.4L4 20M20 4l-1.6 1.6" data-v-7d0f8878></path></svg>`);
      } else {
        _push(`<svg class="ed-theme-toggle__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-v-7d0f8878><path d="M20.5 14.2A8.4 8.4 0 0 1 9.8 3.5a.6.6 0 0 0-.8-.7 9.6 9.6 0 1 0 12.2 12.2.6.6 0 0 0-.7-.8z" data-v-7d0f8878></path></svg>`);
      }
      _push(`</button><a href="/" class="ed-masthead" aria-label="AlTareq home" data-v-7d0f8878><img${ssrRenderAttr("src", _imports_0)} alt="AlTareq" class="ed-masthead__logo" data-v-7d0f8878><span class="ed-masthead__beta" data-v-7d0f8878>Beta<i aria-hidden="true" data-v-7d0f8878></i></span><span class="ed-masthead__tag" data-v-7d0f8878>Built by the community</span></a><nav class="ed-nav" aria-label="Primary" data-v-7d0f8878><div class="ed-nav__group" data-v-7d0f8878><button type="button" class="${ssrRenderClass([{ "is-active": isActive("/support-service-desk") || isActive("/pricing") || isActive("/policy") || isActive("/doc-repository") || isActive("/program") }, "ed-nav__link ed-nav__trigger ed-nav__trigger--compact"])}"${ssrRenderAttr("aria-expanded", programOpen.value ? "true" : "false")} data-v-7d0f8878> Program <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true" data-v-7d0f8878><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-7d0f8878></path></svg></button><div class="${ssrRenderClass([{ open: programOpen.value }, "ed-nav__menu"])}" data-v-7d0f8878><a href="/support-service-desk/" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Support</span><span class="ed-nav__menu-label" data-v-7d0f8878>Service Desk</span></a><a href="/pricing/" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Pricing</span><span class="ed-nav__menu-label" data-v-7d0f8878>Commercial Model</span></a><a href="/policy" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Governance</span><span class="ed-nav__menu-label" data-v-7d0f8878>Policies</span></a><a href="/doc-repository/" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Participants</span><span class="ed-nav__menu-label" data-v-7d0f8878>Document Repository</span></a><a href="/program/whats-live" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Activity</span><span class="ed-nav__menu-label" data-v-7d0f8878>In Production</span></a></div></div><div class="ed-nav__group" data-v-7d0f8878><button type="button" class="${ssrRenderClass([{ "is-active": isActive("/tech") || isActive("/knowledge-base") || isActive("/proposals") }, "ed-nav__link ed-nav__trigger"])}"${ssrRenderAttr("aria-expanded", docsOpen.value ? "true" : "false")} data-v-7d0f8878> Developer Docs <svg width="10" height="7" viewBox="0 0 10 7" fill="none" aria-hidden="true" data-v-7d0f8878><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-7d0f8878></path></svg></button><div class="${ssrRenderClass([{ open: docsOpen.value }, "ed-nav__menu"])}" data-v-7d0f8878><a href="/tech/tpp-standards" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>For TPPs</span><span class="ed-nav__menu-label" data-v-7d0f8878>Open Finance Standards</span></a><a href="/tech/lfi-api-hub" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>For LFIs</span><span class="ed-nav__menu-label" data-v-7d0f8878>Integration Guide</span></a><a href="/tech/api-specs/" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Reference</span><span class="ed-nav__menu-label" data-v-7d0f8878>API Specs</span></a><a href="/knowledge-base" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Library</span><span class="ed-nav__menu-label" data-v-7d0f8878>Knowledge Base</span></a><a href="/proposals/" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Community</span><span class="ed-nav__menu-label" data-v-7d0f8878>Proposals &amp; Voting</span></a><a href="/tech/release-notes-and-erratas/" class="ed-nav__menu-item" data-v-7d0f8878><span class="ed-nav__menu-kicker" data-v-7d0f8878>Changelog</span><span class="ed-nav__menu-label" data-v-7d0f8878>Release Notes &amp; Erratas</span></a></div></div><a href="/metrics" class="${ssrRenderClass([{ "is-active": isActive("/metrics") }, "ed-nav__link"])}" data-v-7d0f8878>Metrics</a><a href="/news" class="${ssrRenderClass([{ "is-active": isActive("/news") }, "ed-nav__link"])}" data-v-7d0f8878>News</a><button type="button" class="ed-search-trigger" aria-label="Search documentation (Ctrl+K)" data-v-7d0f8878><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-v-7d0f8878><circle cx="10" cy="10" r="7" data-v-7d0f8878></circle><path d="M21 21l-6-6" data-v-7d0f8878></path></svg></button><a href="https://github.com/Nebras-Open-Finance/community-standards" class="ed-github" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub" data-v-7d0f8878><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-v-7d0f8878><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" data-v-7d0f8878></path></svg></a>`);
      _push(ssrRenderComponent(_component_VersionDropdown, null, null, _parent));
      _push(`</nav><button type="button" class="ed-search-trigger ed-search-trigger--mobile" aria-label="Search documentation" data-v-7d0f8878><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-v-7d0f8878><circle cx="10" cy="10" r="7" data-v-7d0f8878></circle><path d="M21 21l-6-6" data-v-7d0f8878></path></svg></button><button type="button" class="${ssrRenderClass([{ active: menuOpen.value }, "ed-hamburger"])}" aria-label="Toggle menu" data-v-7d0f8878><span data-v-7d0f8878></span><span data-v-7d0f8878></span><span data-v-7d0f8878></span></button></div><div class="${ssrRenderClass([{ open: menuOpen.value }, "ed-drawer"])}" data-v-7d0f8878><div class="ed-drawer__inner" data-v-7d0f8878><div class="ed-drawer__label" data-v-7d0f8878>Navigation</div><a href="/metrics" class="ed-drawer__link" data-v-7d0f8878>Metrics</a><div class="ed-drawer__section" data-v-7d0f8878>Program</div><a href="/support-service-desk/" class="ed-drawer__sublink" data-v-7d0f8878>Service Desk</a><a href="/pricing/" class="ed-drawer__sublink" data-v-7d0f8878>Pricing</a><a href="/policy" class="ed-drawer__sublink" data-v-7d0f8878>Policies</a><a href="/doc-repository/" class="ed-drawer__sublink" data-v-7d0f8878>Document Repository</a><a href="/program/whats-live" class="ed-drawer__sublink" data-v-7d0f8878>In Production</a><div class="ed-drawer__section" data-v-7d0f8878>Developer Docs</div><a href="/tech/tpp-standards" class="ed-drawer__sublink" data-v-7d0f8878>TPP — Open Finance Standards</a><a href="/tech/lfi-api-hub" class="ed-drawer__sublink" data-v-7d0f8878>LFI — Integration Guide</a><a href="/tech/api-specs/" class="ed-drawer__sublink" data-v-7d0f8878>API Specs</a><a href="/knowledge-base" class="ed-drawer__sublink" data-v-7d0f8878>Knowledge Base</a><a href="/proposals/" class="ed-drawer__sublink" data-v-7d0f8878>Proposals &amp; Voting</a><a href="/tech/release-notes-and-erratas/" class="ed-drawer__sublink" data-v-7d0f8878>Release Notes &amp; Erratas</a></div></div>`);
      if (unref(searchEverOpened)) {
        _push(ssrRenderComponent(unref(SearchModal), {
          open: unref(searchOpen),
          onClose: unref(close)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/chrome/PageHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-7d0f8878"]]);
function apiRef(method, path, link) {
  return {
    text: `<span class="http-badge http-${method.toLowerCase()}">${method}</span> <span class="http-path">${path}</span>`,
    link
  };
}
const BASE$1 = "/tech/tpp-standards";
const DATA_DELETION_CONFIRMATION_VERSIONS = ["v2.2-rc1"];
function hasDataDeletionConfirmation(version) {
  return DATA_DELETION_CONFIRMATION_VERSIONS.includes(version);
}
const ATTESTATION_CONSENTS$1 = [
  ["/account-access-consents", "account-access-consents"],
  ["/payment-consents", "payment-consents"],
  ["/insurance-consents", "insurance-consents"]
];
function dataDeletionApiRefs(base) {
  return ATTESTATION_CONSENTS$1.flatMap(([path, slug]) => [
    apiRef("POST", `${path}/{ConsentId}/attestations`, `${base}/post-${slug}-ConsentId-attestations`),
    apiRef("GET", `${path}/{ConsentId}/attestations`, `${base}/get-${slug}-ConsentId-attestations`)
  ]);
}
function multiPaymentItems$1(base) {
  return [
    { text: "Requirements", link: `${base}/requirements` },
    { text: "User Experience", link: `${base}/user-journeys` },
    { text: "API Guide", link: `${base}/api-guide` }
  ];
}
const INSURANCE_TYPES$1 = [
  ["Employment", "employment"],
  ["Health", "health"],
  ["Home", "home"],
  ["Life", "life"],
  ["Motor", "motor"],
  ["Renters", "renters"],
  ["Travel", "travel"]
];
function insuranceApiRef$1(base) {
  return INSURANCE_TYPES$1.map(([label, slug]) => ({
    text: `${label} Insurance`,
    collapsed: true,
    items: [
      apiRef("GET", `/${slug}-insurance-policies`, `${base}/${slug}-insurance-policies`),
      apiRef("GET", `/${slug}-insurance-policies/{InsurancePolicyId}`, `${base}/${slug}-insurance-policies-InsurancePolicyId`)
    ]
  }));
}
function insuranceQuotationApiRef$1(base) {
  return INSURANCE_TYPES$1.map(([label, slug]) => ({
    text: `${label} Insurance`,
    collapsed: true,
    items: [
      apiRef("POST", `/${slug}-insurance-quotes`, `${base}/${slug}-insurance-quotes`),
      apiRef("GET", `/${slug}-insurance-quotes/{QuoteId}`, `${base}/get-${slug}-insurance-quotes-QuoteId`),
      apiRef("PATCH", `/${slug}-insurance-quotes/{QuoteId}`, `${base}/patch-${slug}-insurance-quotes-QuoteId`),
      apiRef("POST", `/${slug}-insurance-policies`, `${base}/post-${slug}-insurance-policies`)
    ]
  }));
}
const buildTppSidebar = (version) => [
  {
    text: "Getting Started",
    collapsed: true,
    items: [
      { text: "Sandbox Quickstart", link: `${BASE$1}/${version}/getting-started/` },
      { text: "Postman Guide", link: `${BASE$1}/${version}/getting-started/postman` },
      { text: "Sandbox Model Bank", link: `${BASE$1}/sandbox/model-bank` },
      { text: "Sandbox Model Insurer", link: `${BASE$1}/sandbox/model-insurer` }
    ]
  },
  {
    text: "Trust Framework (Directory)",
    collapsed: true,
    items: [
      { text: "Overview & Organisations", link: `${BASE$1}/trust-framework/` },
      {
        text: "Onboarding",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/trust-framework/onboarding/` },
          { text: "Organisation Admins", link: `${BASE$1}/trust-framework/organisation-admins` },
          { text: "Adding Users", link: `${BASE$1}/trust-framework/adding-users` },
          { text: "User/Admin Sign Up", link: `${BASE$1}/trust-framework/user-sign-up` }
        ]
      },
      { text: "Roles", link: `${BASE$1}/trust-framework/roles/` },
      {
        text: "Applications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/trust-framework/application` },
          { text: "Creating An Application", link: `${BASE$1}/trust-framework/creating-an-application` },
          { text: "Redirect URIs", link: `${BASE$1}/trust-framework/redirect-uri/` },
          {
            text: "Keys & Certificates",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE$1}/trust-framework/certificates/` },
              { text: "Client Transport", link: `${BASE$1}/trust-framework/certificates/client-transport` },
              { text: "Client Signing", link: `${BASE$1}/trust-framework/certificates/client-signing` },
              { text: "Client Encryption", link: `${BASE$1}/trust-framework/certificates/client-encryption` },
              { text: "Certificates with a SAN", link: `${BASE$1}/trust-framework/certificates-san/` }
            ]
          }
        ]
      },
      { text: "Contacts", link: `${BASE$1}/trust-framework/contacts` },
      {
        text: "LFI Discovery",
        collapsed: true,
        items: [
          { text: "Overview & /participants", link: `${BASE$1}/trust-framework/api-discovery/` },
          {
            text: "Authorisation Servers",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE$1}/trust-framework/authorisation-servers` },
              { text: "Discovery", link: `${BASE$1}/trust-framework/well-known/` }
            ]
          },
          { text: "API Resources", link: `${BASE$1}/trust-framework/api-resources` },
          { text: "Flags & Meta Data", link: `${BASE$1}/trust-framework/flags-metadata` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/participants", `${BASE$1}/trust-framework/open-api/participants`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Registration",
    collapsed: true,
    items: [
      { text: "Overview & API Guide", link: `${BASE$1}/registration/api-guide` },
      {
        text: "API Reference",
        collapsed: true,
        items: [
          apiRef("POST", "/tpp-registration", `${BASE$1}/registration/open-api/tpp-registration`)
        ]
      }
    ]
  },
  {
    text: "Security, Auth & Headers",
    collapsed: true,
    items: [
      {
        text: "FAPI Security Profile",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/security/fapi` },
          { text: "Preparing /par request JWT", link: `${BASE$1}/security/fapi/request-jwt` },
          { text: "Message Signing", link: `${BASE$1}/security/fapi/message-signing` },
          { text: "Message Encryption", link: `${BASE$1}/security/fapi/message-encryption` },
          { text: "Receiving Event Notifications", link: `${BASE$1}/security/fapi/receiving-events` },
          { text: "Opening the Authorization Redirect", link: `${BASE$1}/security/fapi/opening-the-redirect` },
          { text: "Handling Authorization Callbacks", link: `${BASE$1}/security/fapi/handling-callback` }
        ]
      },
      {
        text: "Tokens & Assertions",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/security/tokens` },
          { text: "Preparing Client Assertion", link: `${BASE$1}/security/tokens/client-assertion` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/token", `${BASE$1}/security/tokens/open-api/token`)
            ]
          }
        ]
      },
      { text: "Request Headers", link: `${BASE$1}/security/request-headers` }
    ]
  },
  {
    text: "Consent",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE$1}/${version}/consent/` },
      { text: "Requirements", link: `${BASE$1}/${version}/consent/requirements` },
      { text: "API Guide", link: `${BASE$1}/${version}/consent/api-guide` },
      {
        text: "Consent Management Interface",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/consent/consent-management-interface` },
          {
            text: "Bank Data Sharing",
            collapsed: true,
            items: [
              { text: "Requirements", link: `${BASE$1}/${version}/consent/consent-management-interface/bank-data-sharing/requirements` },
              { text: "User Experience", link: `${BASE$1}/${version}/consent/consent-management-interface/bank-data-sharing/user-experience` }
            ]
          },
          {
            text: "Bank Service Initiation",
            collapsed: true,
            items: [
              { text: "Requirements", link: `${BASE$1}/${version}/consent/consent-management-interface/bank-service-initiation/requirements` },
              { text: "User Experience", link: `${BASE$1}/${version}/consent/consent-management-interface/bank-service-initiation/user-experience` }
            ]
          },
          {
            text: "Insurance Data Sharing",
            collapsed: true,
            items: [
              { text: "Requirements", link: `${BASE$1}/${version}/consent/consent-management-interface/insurance-data-sharing/requirements` },
              { text: "User Experience", link: `${BASE$1}/${version}/consent/consent-management-interface/insurance-data-sharing/user-experience` }
            ]
          }
        ]
      },
      // Introduced in v2.2 — omitted from versions that predate it.
      ...hasDataDeletionConfirmation(version) ? [{
        text: "Data Deletion Confirmation",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/consent/data-deletion-confirmation/` },
          {
            text: "API Reference",
            collapsed: true,
            items: dataDeletionApiRefs(`${BASE$1}/${version}/consent/data-deletion-confirmation/open-api`)
          }
        ]
      }] : [],
      {
        text: "API Reference",
        collapsed: true,
        items: [
          {
            text: "Create Consent",
            items: [
              apiRef("POST", "/par", `${BASE$1}/${version}/consent/open-api/par`)
            ]
          },
          {
            text: "Bank Data Sharing",
            items: [
              apiRef("GET", "/account-access-consents", `${BASE$1}/${version}/consent/open-api/account-access-consents`),
              apiRef("GET", "/account-access-consents/{ConsentId}", `${BASE$1}/${version}/consent/open-api/account-access-consents-ConsentId`),
              apiRef("PATCH", "/account-access-consents/{ConsentId}", `${BASE$1}/${version}/consent/open-api/patch-account-access-consents-ConsentId`)
            ]
          },
          {
            text: "Bank Service Initiation",
            items: [
              apiRef("GET", "/payment-consents", `${BASE$1}/${version}/consent/open-api/payment-consents`),
              apiRef("GET", "/payment-consents/{ConsentId}", `${BASE$1}/${version}/consent/open-api/payment-consents-ConsentId`),
              apiRef("PATCH", "/payment-consents/{ConsentId}", `${BASE$1}/${version}/consent/open-api/patch-payment-consents-ConsentId`)
            ]
          },
          {
            text: "Insurance Data Sharing",
            items: [
              apiRef("GET", "/insurance-consents", `${BASE$1}/${version}/consent/open-api/insurance-consents`),
              apiRef("GET", "/insurance-consents/{ConsentId}", `${BASE$1}/${version}/consent/open-api/insurance-consents-ConsentId`),
              apiRef("PATCH", "/insurance-consents/{ConsentId}", `${BASE$1}/${version}/consent/open-api/patch-insurance-consents-ConsentId`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Banking",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE$1}/${version}/banking` },
      {
        text: "Data Sharing",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/banking/data-sharing` },
          { text: "Requirements", link: `${BASE$1}/${version}/banking/data-sharing/requirements` },
          { text: "User Experience", link: `${BASE$1}/${version}/banking/data-sharing/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE$1}/${version}/banking/data-sharing/api-guide` },
              { text: "Pagination", link: `${BASE$1}/${version}/banking/data-sharing/api-guide/pagination` },
              { text: "Encrypted FinanceRates", link: `${BASE$1}/${version}/banking/data-sharing/api-guide/finance-rates` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/accounts", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts`),
              apiRef("GET", "/accounts/{AccountId}", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId`),
              apiRef("GET", "/accounts/{AccountId}/balances", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-balances`),
              apiRef("GET", "/accounts/{AccountId}/beneficiaries", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
              apiRef("GET", "/accounts/{AccountId}/direct-debits", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
              apiRef("GET", "/parties", `${BASE$1}/${version}/banking/data-sharing/open-api/parties`),
              apiRef("GET", "/accounts/{AccountId}/parties", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-parties`),
              apiRef("GET", "/accounts/{AccountId}/product", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-product`),
              apiRef("GET", "/accounts/{AccountId}/scheduled-payments", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
              apiRef("GET", "/accounts/{AccountId}/standing-orders", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
              apiRef("GET", "/accounts/{AccountId}/statements", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-statements`),
              apiRef("GET", "/accounts/{AccountId}/transactions", `${BASE$1}/${version}/banking/data-sharing/open-api/accounts-AccountId-transactions`)
            ]
          }
        ]
      },
      {
        text: "Payments (Service Initiation)",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/banking/service-initiation/` },
          {
            text: "Domestic Payments",
            collapsed: true,
            items: [
              {
                text: "Overview",
                collapsed: true,
                items: [
                  { text: "Payment Rails and Status", link: `${BASE$1}/${version}/banking/service-initiation/domestic-payments/overview/payment-status` }
                ]
              },
              {
                text: "Single Instant Payment",
                collapsed: true,
                items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/single-instant-payment`)
              },
              {
                text: "Multi Payments",
                collapsed: true,
                items: [
                  { text: "Variable On Demand", collapsed: true, items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand`) },
                  { text: "Fixed On Demand", collapsed: true, items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand`) },
                  { text: "Variable Periodic Schedule", collapsed: true, items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule`) },
                  { text: "Fixed Periodic Schedule", collapsed: true, items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule`) },
                  { text: "Variable Defined Schedule", collapsed: true, items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule`) },
                  { text: "Fixed Defined Schedule", collapsed: true, items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule`) },
                  { text: "Delegated SCA", collapsed: true, items: multiPaymentItems$1(`${BASE$1}/${version}/banking/service-initiation/domestic-payments/multi-payments/delegated-sca`) }
                ]
              }
            ]
          },
          {
            text: "Personal Identifiable Information",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE$1}/${version}/banking/service-initiation/personal-identifiable-information/` },
              { text: "Debtor Account", link: `${BASE$1}/${version}/banking/service-initiation/personal-identifiable-information/debtor-account` },
              { text: "Creditor", link: `${BASE$1}/${version}/banking/service-initiation/personal-identifiable-information/creditor` },
              { text: "Risk", link: `${BASE$1}/${version}/banking/service-initiation/personal-identifiable-information/risk` },
              {
                text: "API Schemas",
                collapsed: true,
                items: [
                  { text: "PII (Post /par)", link: `${BASE$1}/${version}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                  { text: "PII (Post /payments)", link: `${BASE$1}/${version}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` }
                ]
              }
            ]
          },
          {
            text: "Multi Authorization",
            link: `${BASE$1}/${version}/banking/service-initiation/multi-authorization`
          },
          {
            text: "Refunds",
            collapsed: true,
            items: [
              { text: "Requirements", link: `${BASE$1}/${version}/banking/service-initiation/refunds/requirements` },
              { text: "API Guide", link: `${BASE$1}/${version}/banking/service-initiation/refunds/api-guide` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/payments", `${BASE$1}/${version}/banking/service-initiation/open-api/payments`),
              apiRef("GET", "/payments/{PaymentId}", `${BASE$1}/${version}/banking/service-initiation/open-api/payments-PaymentId`),
              apiRef("GET", "/payments", `${BASE$1}/${version}/banking/service-initiation/open-api/payments-idempotency`),
              apiRef("GET", "/payment-consents/{ConsentId}/refund", `${BASE$1}/${version}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`)
            ]
          }
        ]
      },
      {
        text: "Confirmation of Payee",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/banking/confirmation-of-payee` },
          { text: "Requirements", link: `${BASE$1}/${version}/banking/confirmation-of-payee/requirements` },
          { text: "User Experience", link: `${BASE$1}/${version}/banking/confirmation-of-payee/user-journeys` },
          { text: "API Guide", link: `${BASE$1}/${version}/banking/confirmation-of-payee/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/discovery", `${BASE$1}/${version}/banking/confirmation-of-payee/open-api/discovery`),
              apiRef("POST", "/confirmation", `${BASE$1}/${version}/banking/confirmation-of-payee/open-api/confirmation`)
            ]
          }
        ]
      },
      {
        text: "Products and Leads",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/banking/products-leads/` },
          { text: "Requirements", link: `${BASE$1}/${version}/banking/products-leads/requirements` },
          { text: "User Experience", link: `${BASE$1}/${version}/banking/products-leads/user-journeys` },
          { text: "API Guide", link: `${BASE$1}/${version}/banking/products-leads/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/products", `${BASE$1}/${version}/banking/products-leads/open-api/products`),
              apiRef("POST", "/leads", `${BASE$1}/${version}/banking/products-leads/open-api/leads`)
            ]
          }
        ]
      },
      {
        text: "ATMs",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/banking/atms` },
          { text: "Requirements", link: `${BASE$1}/${version}/banking/atms/requirements` },
          { text: "API Guide", link: `${BASE$1}/${version}/banking/atms/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/atms", `${BASE$1}/${version}/banking/atms/open-api/atms`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Insurance",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE$1}/${version}/insurance/` },
      {
        text: "Data Sharing",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/insurance/data-sharing/` },
          { text: "Requirements", link: `${BASE$1}/${version}/insurance/data-sharing/requirements` },
          { text: "User Experience", link: `${BASE$1}/${version}/insurance/data-sharing/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE$1}/${version}/insurance/data-sharing/api-guide/` },
              { text: "Encrypted Premiums", link: `${BASE$1}/${version}/insurance/data-sharing/api-guide/premiums` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: insuranceApiRef$1(`${BASE$1}/${version}/insurance/data-sharing/open-api`)
          }
        ]
      },
      {
        text: "Quotation",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/${version}/insurance/quotation/` },
          { text: "Requirements", link: `${BASE$1}/${version}/insurance/quotation/requirements` },
          { text: "Quote Types (New / Renewal / Switch)", link: `/tech/lfi-api-hub/${version}/insurance/quotation/quote-types` },
          { text: "User Journeys", link: `${BASE$1}/${version}/insurance/quotation/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview & Event Schema", link: `${BASE$1}/${version}/insurance/quotation/api-guide/` },
              { text: "LFI-Led Flow", link: `${BASE$1}/${version}/insurance/quotation/api-guide/lfi-led` },
              { text: "TPP-Led Flow", link: `${BASE$1}/${version}/insurance/quotation/api-guide/tpp-led` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: insuranceQuotationApiRef$1(`${BASE$1}/${version}/insurance/quotation/open-api`)
          }
        ]
      }
    ]
  },
  {
    text: "Event Notifications & Webhooks",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE$1}/${version}/webhooks/` },
      {
        text: "Consent Status",
        collapsed: true,
        items: [
          { text: "API Guide", link: `${BASE$1}/${version}/webhooks/consent-status/api-guide` },
          {
            text: "API Referrence",
            collapsed: true,
            items: [
              apiRef("POST", "[consent status]", `${BASE$1}/${version}/webhooks/consent-status/open-api`)
            ]
          }
        ]
      },
      {
        text: "Payment Status",
        collapsed: true,
        items: [
          { text: "API Guide", link: `${BASE$1}/${version}/webhooks/payment-status/api-guide` },
          {
            text: "API Referrence",
            collapsed: true,
            items: [
              apiRef("POST", "[payment status]", `${BASE$1}/${version}/webhooks/payment-status/open-api`)
            ]
          }
        ]
      },
      {
        text: "Insurance Quote Status",
        collapsed: true,
        items: [
          { text: "API Guide", link: `${BASE$1}/${version}/webhooks/insurance-status/api-guide` },
          {
            text: "API Referrence",
            collapsed: true,
            items: [
              apiRef("POST", "[insurance quote status]", `${BASE$1}/${version}/webhooks/insurance-status/open-api`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Testing & Certification",
    collapsed: true,
    items: [
      {
        text: "Required Certifications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/production/testing-certification/overview` },
          {
            text: "Functional Evidence",
            collapsed: true,
            items: [
              { text: "Bank Data Sharing", link: `${BASE$1}/production/testing-certification/functional/bank-data-sharing` },
              { text: "Domestic Payments", link: `${BASE$1}/production/testing-certification/functional/domestic-payments` },
              { text: "Confirmation of Payee", link: `${BASE$1}/production/testing-certification/functional/confirmation-of-payee` },
              { text: "Insurance Data Sharing", link: `${BASE$1}/production/testing-certification/functional/insurance-data-sharing` }
            ]
          },
          { text: "User Experience Evidence", link: `${BASE$1}/production/testing-certification/user-experience` },
          { text: "FAPI Conformance", link: `${BASE$1}/production/testing-certification/fapi` },
          { text: "Security Validation", link: `${BASE$1}/production/testing-certification/security-validation` }
        ]
      },
      {
        text: "Optional Certifications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE$1}/production/testing-certification/optional/overview` },
          { text: "Access Encrypted Resource Data", link: `${BASE$1}/production/testing-certification/optional/access-encrypted-resource-data` }
        ]
      },
      { text: "Production Live Proving", link: `${BASE$1}/production/live-proving` }
    ]
  }
];
function useTppSidebar() {
  const { selectedVersion: selectedVersion2 } = useSelectedVersion();
  return computed(() => buildTppSidebar(selectedVersion2.value));
}
const BASE = "/tech/lfi-api-hub";
function fieldMapItems(base, endpoints) {
  return {
    text: "Field Mapping",
    collapsed: true,
    items: endpoints.map(
      ([method, path, slug]) => apiRef(method, path, `${base}/field-mapping/${slug}`)
    )
  };
}
const DATA_SHARING_FIELD_MAP = [
  ["GET", "/accounts", "accounts"],
  ["GET", "/accounts/{accountId}", "accounts-AccountId"],
  ["GET", "/accounts/{accountId}/balances", "accounts-AccountId-balances"],
  ["GET", "/accounts/{accountId}/beneficiaries", "accounts-AccountId-beneficiaries"],
  ["GET", "/accounts/{accountId}/customer", "accounts-AccountId-customer"],
  ["GET", "/accounts/{accountId}/direct-debits", "accounts-AccountId-direct-debits"],
  ["GET", "/accounts/{accountId}/products", "accounts-AccountId-products"],
  ["GET", "/accounts/{accountId}/scheduled-payments", "accounts-AccountId-scheduled-payments"],
  ["GET", "/accounts/{accountId}/standing-orders", "accounts-AccountId-standing-orders"],
  ["GET", "/accounts/{accountId}/statements", "accounts-AccountId-statements"],
  ["GET", "/accounts/{accountId}/transactions", "accounts-AccountId-transactions"],
  ["GET", "/customer", "customer"]
];
const SERVICE_INITIATION_FIELD_MAP = [
  ["GET", "/payment-consents/{consentId}/refund", "payment-consents-ConsentId-refund"]
];
const PRODUCTS_LEADS_FIELD_MAP = [
  ["GET", "/products", "products"],
  ["POST", "/leads", "leads"]
];
const ATMS_FIELD_MAP = [["GET", "/atm", "atm"]];
function multiPaymentItems(base) {
  return [
    { text: "Requirements", link: `${base}/requirements` },
    { text: "User Experience", link: `${base}/user-journeys` },
    { text: "API Guide", link: `${base}/api-guide` }
  ];
}
const INSURANCE_TYPES = [
  ["Employment", "employment"],
  ["Health", "health"],
  ["Home", "home"],
  ["Life", "life"],
  ["Motor", "motor"],
  ["Renters", "renters"],
  ["Travel", "travel"]
];
function insuranceApiRef(base) {
  return INSURANCE_TYPES.map(([label, slug]) => ({
    text: `${label} Insurance`,
    collapsed: true,
    items: [
      apiRef("GET", `/${slug}-insurance-policies`, `${base}/${slug}-insurance-policies`),
      apiRef("GET", `/${slug}-insurance-policies/{InsurancePolicyId}`, `${base}/${slug}-insurance-policies-InsurancePolicyId`)
    ]
  }));
}
function insuranceQuotationApiRef(base) {
  return INSURANCE_TYPES.map(([label, slug]) => ({
    text: `${label} Insurance`,
    collapsed: true,
    items: [
      apiRef("POST", `/${slug}-insurance-quotes`, `${base}/${slug}-insurance-quotes`),
      apiRef("GET", `/${slug}-insurance-quotes/{QuoteId}`, `${base}/get-${slug}-insurance-quotes-QuoteId`),
      apiRef("PATCH", `/${slug}-insurance-quotes/{QuoteId}`, `${base}/patch-${slug}-insurance-quotes-QuoteId`),
      apiRef("POST", `/${slug}-insurance-policies`, `${base}/post-${slug}-insurance-policies`)
    ]
  }));
}
const buildLfiSidebar = (version) => [
  {
    text: "Getting Started",
    collapsed: true,
    items: [
      { text: "LFI Integration Journey", link: `${BASE}/getting-started/` },
      { text: "Recommended Bank Rollout Plan", link: `${BASE}/getting-started/bank-rollout-plan` },
      { text: "Recommended Insurance Rollout Plan", link: `${BASE}/getting-started/insurance-rollout-plan` }
    ]
  },
  {
    text: "Trust Framework",
    collapsed: true,
    items: [
      { text: "Overview & Organisations", link: `${BASE}/trust-framework/` },
      {
        text: "Onboarding",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/trust-framework/onboarding` },
          { text: "Organisation Admins", link: `${BASE}/trust-framework/organisation-admins` },
          { text: "Adding Users", link: `${BASE}/trust-framework/adding-users` },
          { text: "User/Admin Sign Up", link: `${BASE}/trust-framework/user-sign-up` }
        ]
      },
      { text: "Roles", link: `${BASE}/trust-framework/roles` },
      {
        text: "Servers",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/trust-framework/servers` },
          { text: "Creating a Server", link: `${BASE}/trust-framework/servers/creating` },
          {
            text: "API Resources",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/trust-framework/servers/api` },
              { text: "Creating an API resource", link: `${BASE}/trust-framework/servers/api/creating` },
              { text: "Meta Data", link: `${BASE}/trust-framework/servers/api/meta` }
            ]
          }
        ]
      },
      {
        text: "Applications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/trust-framework/application` },
          { text: "Creating C3-hh-cm-client", link: `${BASE}/trust-framework/creating-c3-application` },
          {
            text: "Keys & Certificates",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/trust-framework/certificates/` },
              { text: "Client Transport", link: `${BASE}/trust-framework/certificates/client-transport` },
              { text: "Client Signing", link: `${BASE}/trust-framework/certificates/client-signing` },
              { text: "Certificates with a SAN", link: `${BASE}/trust-framework/certificates-san/` }
            ]
          }
        ]
      },
      { text: "Contacts", link: `${BASE}/trust-framework/contacts` },
      {
        text: "Trust Framework APIs",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/trust-framework/api/` },
          {
            text: "API Guide",
            link: `${BASE}/trust-framework/api/api-guide`
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/token", `${BASE}/trust-framework/api/token`),
              apiRef("GET", "/organisations", `${BASE}/trust-framework/api/organisations`),
              apiRef("GET", ".../{OrganisationId}/softwarestatements", `${BASE}/trust-framework/api/software-statements`),
              apiRef("GET", ".../{OrganisationId}/contacts", `${BASE}/trust-framework/api/contacts`),
              apiRef("GET", ".../{OrganisationId}/authorisationservers", `${BASE}/trust-framework/api/auth-servers`),
              apiRef("GET", ".../{AuthorisationServerId}/apiresources", `${BASE}/trust-framework/api/api-resources`),
              apiRef("GET", "/references/apifamilies", `${BASE}/trust-framework/api/api-families`)
            ]
          }
        ]
      }
    ]
  },
  {
    text: "API Hub",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${version}/api-hub/` },
      { text: "Connectivity & Certificates", link: `${BASE}/${version}/api-hub/connectivity/` },
      {
        text: "Onboarding",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/api-hub/onboarding/` },
          { text: "Prerequisites Questionnaire", link: `${BASE}/${version}/api-hub/onboarding/prerequisites` },
          { text: "Application Layer Authentication", link: `${BASE}/${version}/api-hub/onboarding/application-layer-auth` },
          {
            text: "Environment Specific",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/${version}/api-hub/onboarding/environment-specific` },
              { text: "Certificate Walkthroughs", link: `${BASE}/${version}/api-hub/onboarding/environment-specific/certificate-walkthroughs` },
              { text: "Ozone Connect Base URL", link: `${BASE}/${version}/api-hub/onboarding/environment-specific/ozone-connect-url` },
              { text: "Authorization Endpoint", link: `${BASE}/${version}/api-hub/onboarding/environment-specific/auth-endpoint` }
            ]
          },
          {
            text: "Configuring Authentication",
            collapsed: true,
            items: [
              { text: "mTLS — Server-side", link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/mtls-server` },
              { text: "mTLS — Client-side", link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/mtls-client` },
              { text: "JWT — Server-side", link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/jwt-server` },
              { text: "JWT — Client-side", link: `${BASE}/${version}/api-hub/onboarding/configuring-authentication/jwt-client` }
            ]
          }
        ]
      },
      {
        text: "Admin Portal",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/api-hub/admin-portal/` },
          { text: "TPP Management & Activation", link: `${BASE}/${version}/api-hub/admin-portal/tpp-activation` },
          { text: "Logs", link: `${BASE}/${version}/api-hub/admin-portal/logs` },
          { text: "Reports", link: `${BASE}/${version}/api-hub/admin-portal/reports` }
        ]
      },
      {
        text: "Headless Heimdall Auth Server",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/api-hub/headless-heimdall` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              {
                text: "Health Check",
                items: [
                  apiRef("GET", "/hello-mtls", `${BASE}/${version}/api-hub/headless-heimdall/open-api/hello-mtls`)
                ]
              },
              {
                text: "Authorization",
                items: [
                  apiRef("GET", "/auth", `${BASE}/${version}/api-hub/headless-heimdall/open-api/auth`),
                  apiRef("POST", "/auth/{interactionId}/doConfirm", `${BASE}/${version}/api-hub/headless-heimdall/open-api/auth-interactionId-doConfirm`),
                  apiRef("POST", "/auth/{interactionId}/doFail", `${BASE}/${version}/api-hub/headless-heimdall/open-api/auth-interactionId-doFail`)
                ]
              }
            ]
          }
        ]
      },
      {
        text: "Consent Manager",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/api-hub/consent-manager/` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              {
                text: "Health Check",
                items: [
                  apiRef("GET", "/hello-mtls", `${BASE}/${version}/api-hub/consent-manager/open-api/hello-mtls`)
                ]
              },
              {
                text: "Consents",
                items: [
                  apiRef("GET", "/consents", `${BASE}/${version}/api-hub/consent-manager/open-api/consents`),
                  apiRef("GET", "/consents/{consentId}", `${BASE}/${version}/api-hub/consent-manager/open-api/consents-consentId`),
                  apiRef("PATCH", "/consents/{consentId}", `${BASE}/${version}/api-hub/consent-manager/open-api/patch-consents-consentId`),
                  apiRef("GET", "/consents/{consentId}/audit", `${BASE}/${version}/api-hub/consent-manager/open-api/consents-consentId-audit`),
                  apiRef("GET", "/consent-groups/{consentGroupId}/consents", `${BASE}/${version}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents`),
                  apiRef("GET", "/psu/{userId}/consents", `${BASE}/${version}/api-hub/consent-manager/open-api/psu-userId-consents`),
                  apiRef("GET", "/accounts/{accountId}/consents", `${BASE}/${version}/api-hub/consent-manager/open-api/accounts-accountId-consents`),
                  apiRef("POST", "/consent-groups/{consentGroupId}/consents/action/revoke", `${BASE}/${version}/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke`),
                  apiRef("POST", "/consents/{consentId}/action/revoke", `${BASE}/${version}/api-hub/consent-manager/open-api/consents-consentId-action-revoke`)
                ]
              },
              {
                text: "Payment Log",
                items: [
                  apiRef("GET", "/payment-log", `${BASE}/${version}/api-hub/consent-manager/open-api/payment-log`),
                  apiRef("PATCH", "/payment-log/{id}", `${BASE}/${version}/api-hub/consent-manager/open-api/payment-log-id`)
                ]
              },
              {
                text: "Insurance Quote Log",
                items: [
                  apiRef("PATCH", "/insurance-quote-log/{logId}", `${BASE}/${version}/api-hub/consent-manager/open-api/insurance-quote-log-logId`)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Ozone Connect | Health Check",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${version}/health-check/` },
      {
        text: "API Reference",
        collapsed: true,
        items: [
          apiRef("GET", "/hello", `${BASE}/${version}/health-check/open-api/hello`),
          apiRef("GET", "/hello-mtls", `${BASE}/${version}/health-check/open-api/hello-mtls`),
          apiRef("GET", "/echo-cert", `${BASE}/${version}/health-check/open-api/echo-cert`)
        ]
      }
    ]
  },
  {
    text: "Ozone Connect | Consent Events",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${version}/consent-events` },
      { text: "API Guide", link: `${BASE}/${version}/consent-events/api-guide` },
      {
        text: "API Reference",
        collapsed: true,
        items: [
          apiRef("POST", "/consent/action/validate", `${BASE}/${version}/consent-events/open-api/validate`),
          apiRef("POST", "/consent/event/{operation}", `${BASE}/${version}/consent-events/open-api/event-op`)
        ]
      }
    ]
  },
  {
    text: "Ozone Connect | Banking",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${version}/banking` },
      {
        text: "Data Sharing",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/banking/data-sharing` },
          { text: "Requirements", link: `${BASE}/${version}/banking/data-sharing/requirements` },
          { text: "User Experience", link: `${BASE}/${version}/banking/data-sharing/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/${version}/banking/data-sharing/api-guide` },
              { text: "Pagination", link: `${BASE}/${version}/banking/data-sharing/api-guide/pagination` },
              { text: "Encrypted FinanceRates", link: `${BASE}/${version}/banking/data-sharing/api-guide/finance-rates` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/accounts", `${BASE}/${version}/banking/data-sharing/open-api/accounts`),
              apiRef("GET", "/accounts/{AccountId}", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId`),
              apiRef("GET", "/accounts/{AccountId}/balances", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-balances`),
              apiRef("GET", "/accounts/{AccountId}/beneficiaries", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-beneficiaries`),
              apiRef("GET", "/customer", `${BASE}/${version}/banking/data-sharing/open-api/customer`),
              apiRef("GET", "/accounts/{AccountId}/customer", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-customer`),
              apiRef("GET", "/accounts/{AccountId}/direct-debits", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-direct-debits`),
              apiRef("GET", "/accounts/{AccountId}/products", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-products`),
              apiRef("GET", "/accounts/{AccountId}/scheduled-payments", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments`),
              apiRef("GET", "/accounts/{AccountId}/standing-orders", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-standing-orders`),
              apiRef("GET", "/accounts/{AccountId}/statements", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-statements`),
              apiRef("GET", "/accounts/{AccountId}/transactions", `${BASE}/${version}/banking/data-sharing/open-api/accounts-AccountId-transactions`)
            ]
          },
          fieldMapItems(`${BASE}/${version}/banking/data-sharing`, DATA_SHARING_FIELD_MAP)
        ]
      },
      {
        text: "Payments (Service Initiation)",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/banking/service-initiation/` },
          {
            text: "Domestic Payments",
            collapsed: true,
            items: [
              {
                text: "Overview",
                collapsed: true,
                items: [
                  { text: "Payment Rails and Status", link: `${BASE}/${version}/banking/service-initiation/domestic-payments/overview/payment-status` }
                ]
              },
              {
                text: "Single Instant Payment",
                collapsed: true,
                items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/single-instant-payment`)
              },
              {
                text: "Multi Payments",
                collapsed: true,
                items: [
                  {
                    text: "Variable On Demand",
                    collapsed: true,
                    items: [
                      { text: "Requirements", link: `${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/requirements` },
                      { text: "User Experience", link: `${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/user-journeys` },
                      { text: "API Guide", link: `${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide` }
                    ]
                  },
                  { text: "Fixed On Demand", collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand`) },
                  { text: "Variable Periodic Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule`) },
                  { text: "Fixed Periodic Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule`) },
                  { text: "Variable Defined Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule`) },
                  { text: "Fixed Defined Schedule", collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule`) },
                  { text: "Delegated SCA", collapsed: true, items: multiPaymentItems(`${BASE}/${version}/banking/service-initiation/domestic-payments/multi-payments/delegated-sca`) }
                ]
              }
            ]
          },
          {
            text: "Personal Identifiable Information",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/` },
              { text: "Debtor Account", link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/debtor-account` },
              { text: "Creditor", link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/creditor` },
              {
                text: "API Guide",
                collapsed: true,
                items: [
                  { text: "How to Decrypt PII", link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii` },
                  { text: "Verify TPP Signature (Optional)", link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-guide/verify-tpp-signature` }
                ]
              },
              {
                text: "API Schemas",
                collapsed: true,
                items: [
                  { text: "PII (Consent - Consent Manager)", link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-schema/pii-par` },
                  { text: "PII (Payments - Ozone Connect)", link: `${BASE}/${version}/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments` }
                ]
              }
            ]
          },
          {
            text: "Multi Authorization",
            link: `${BASE}/${version}/banking/service-initiation/multi-authorization`
          },
          {
            text: "Refunds",
            collapsed: true,
            items: [
              { text: "Requirements", link: `${BASE}/${version}/banking/service-initiation/refunds/requirements` },
              { text: "API Guide", link: `${BASE}/${version}/banking/service-initiation/refunds/api-guide` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/payments", `${BASE}/${version}/banking/service-initiation/open-api/payments`),
              apiRef("GET", "/payments/{PaymentId}", `${BASE}/${version}/banking/service-initiation/open-api/payments-PaymentId`),
              apiRef("GET", "/payment-consents/{ConsentId}/refund", `${BASE}/${version}/banking/service-initiation/open-api/payment-consents-ConsentId-refund`)
            ]
          },
          fieldMapItems(`${BASE}/${version}/banking/service-initiation`, SERVICE_INITIATION_FIELD_MAP)
        ]
      },
      {
        text: "Confirmation of Payee",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/banking/confirmation-of-payee/` },
          { text: "Requirements", link: `${BASE}/${version}/banking/confirmation-of-payee/requirements` },
          { text: "User Experience", link: `${BASE}/${version}/banking/confirmation-of-payee/user-journeys` },
          { text: "API Guide", link: `${BASE}/${version}/banking/confirmation-of-payee/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("POST", "/customers/action/cop-query", `${BASE}/${version}/banking/confirmation-of-payee/open-api/cop-query`)
            ]
          }
        ]
      },
      {
        text: "Products & Leads",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/banking/products-and-leads/` },
          { text: "Requirements", link: `${BASE}/${version}/banking/products-and-leads/requirements` },
          { text: "API Guide", link: `${BASE}/${version}/banking/products-and-leads/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/products", `${BASE}/${version}/banking/products-and-leads/open-api/products`),
              apiRef("POST", "/leads", `${BASE}/${version}/banking/products-and-leads/open-api/leads`)
            ]
          },
          fieldMapItems(`${BASE}/${version}/banking/products-and-leads`, PRODUCTS_LEADS_FIELD_MAP)
        ]
      },
      {
        text: "ATMs",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/banking/atms/` },
          { text: "Requirements", link: `${BASE}/${version}/banking/atms/requirements` },
          { text: "API Guide", link: `${BASE}/${version}/banking/atms/api-guide` },
          {
            text: "API Reference",
            collapsed: true,
            items: [
              apiRef("GET", "/atm", `${BASE}/${version}/banking/atms/open-api/atm`)
            ]
          },
          fieldMapItems(`${BASE}/${version}/banking/atms`, ATMS_FIELD_MAP)
        ]
      }
    ]
  },
  {
    text: "Ozone Connect | Insurance",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${version}/insurance/` },
      {
        text: "Data Sharing",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/insurance/data-sharing/` },
          { text: "Requirements", link: `${BASE}/${version}/insurance/data-sharing/requirements` },
          { text: "User Experience", link: `${BASE}/${version}/insurance/data-sharing/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview", link: `${BASE}/${version}/insurance/data-sharing/api-guide/` },
              { text: "Encrypted Premiums", link: `${BASE}/${version}/insurance/data-sharing/api-guide/premiums` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: insuranceApiRef(`${BASE}/${version}/insurance/data-sharing/open-api`)
          }
        ]
      },
      {
        text: "Quotation",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/insurance/quotation/` },
          { text: "Requirements", link: `${BASE}/${version}/insurance/quotation/requirements` },
          { text: "Quote Types (New / Renewal / Switch)", link: `${BASE}/${version}/insurance/quotation/quote-types` },
          { text: "User Journeys", link: `${BASE}/${version}/insurance/quotation/user-journeys` },
          {
            text: "API Guide",
            collapsed: true,
            items: [
              { text: "Overview & Status Events", link: `${BASE}/${version}/insurance/quotation/api-guide/` },
              { text: "LFI-Led Flow", link: `${BASE}/${version}/insurance/quotation/api-guide/lfi-led` },
              { text: "TPP-Led Flow", link: `${BASE}/${version}/insurance/quotation/api-guide/tpp-led` }
            ]
          },
          {
            text: "API Reference",
            collapsed: true,
            items: insuranceQuotationApiRef(`${BASE}/${version}/insurance/quotation/open-api`)
          }
        ]
      }
    ]
  },
  {
    text: "Consent Journey",
    collapsed: true,
    items: [
      {
        text: "Authentication",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/consent-journey/authentication` },
          { text: "Requirements", link: `${BASE}/${version}/consent-journey/authentication/requirements` },
          { text: "Strong Customer Authentication", link: `${BASE}/${version}/consent-journey/authentication/sca` },
          { text: "Implementation Guide", link: `${BASE}/${version}/consent-journey/authentication/implementation` }
        ]
      },
      {
        text: "Authorization",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/${version}/consent-journey/authorization` },
          { text: "Requirements", link: `${BASE}/${version}/consent-journey/authorization/requirements` }
        ]
      },
      { text: "Opening the Return Redirect", link: `${BASE}/${version}/consent-journey/opening-the-redirect` },
      { text: "API Guide", link: `${BASE}/${version}/consent-journey/api-guide` }
    ]
  },
  {
    text: "Consent Management Interface",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${version}/consent-management-interface/` },
      {
        text: "Bank Data Sharing",
        collapsed: true,
        items: [
          { text: "Requirements", link: `${BASE}/${version}/consent-management-interface/bank-data-sharing/requirements` },
          { text: "User Experience", link: `${BASE}/${version}/consent-management-interface/bank-data-sharing/user-experience` }
        ]
      },
      {
        text: "Bank Service Initiation",
        collapsed: true,
        items: [
          { text: "Requirements", link: `${BASE}/${version}/consent-management-interface/bank-service-initiation/requirements` },
          { text: "User Experience", link: `${BASE}/${version}/consent-management-interface/bank-service-initiation/user-experience` }
        ]
      },
      {
        text: "Insurance Data Sharing",
        collapsed: true,
        items: [
          { text: "Requirements", link: `${BASE}/${version}/consent-management-interface/insurance-data-sharing/requirements` },
          { text: "User Experience", link: `${BASE}/${version}/consent-management-interface/insurance-data-sharing/user-experience` }
        ]
      },
      { text: "API Guide", link: `${BASE}/${version}/consent-management-interface/api-guide` }
    ]
  },
  {
    text: "Testing & Certification",
    collapsed: true,
    items: [
      {
        text: "Required Certifications",
        collapsed: true,
        items: [
          { text: "Overview", link: `${BASE}/production/testing-certification/overview` },
          {
            text: "Functional Evidence",
            collapsed: true,
            items: [
              { text: "Bank Data Sharing", link: `${BASE}/production/testing-certification/functional/bank-data-sharing` },
              {
                text: "Domestic Payments",
                collapsed: true,
                items: [
                  { text: "Single Instant Payment", link: `${BASE}/production/testing-certification/functional/single-instant-payment` },
                  { text: "Variable On-Demand", link: `${BASE}/production/testing-certification/functional/variable-on-demand` },
                  { text: "Fixed On-Demand", link: `${BASE}/production/testing-certification/functional/fixed-on-demand` },
                  { text: "Variable Periodic Schedule", link: `${BASE}/production/testing-certification/functional/variable-periodic-schedule` },
                  { text: "Fixed Periodic Schedule", link: `${BASE}/production/testing-certification/functional/fixed-periodic-schedule` },
                  { text: "Variable Defined Schedule", link: `${BASE}/production/testing-certification/functional/variable-defined-schedule` },
                  { text: "Fixed Defined Schedule", link: `${BASE}/production/testing-certification/functional/fixed-defined-schedule` },
                  { text: "Delegated SCA", link: `${BASE}/production/testing-certification/functional/delegated-sca` }
                ]
              },
              { text: "Confirmation of Payee", link: `${BASE}/production/testing-certification/functional/confirmation-of-payee` },
              { text: "Insurance Data Sharing", link: `${BASE}/production/testing-certification/functional/insurance-data-sharing` }
            ]
          },
          { text: "User Experience Evidence", link: `${BASE}/production/testing-certification/user-experience` },
          { text: "Performance Testing", link: `${BASE}/production/testing-certification/performance` },
          { text: "Security Validation", link: `${BASE}/production/testing-certification/security-validation` }
        ]
      },
      {
        text: "Production Live Proving",
        collapsed: true,
        items: [
          { text: "Attestation & Self Testing", link: `${BASE}/production/testing-certification/self-testing` },
          { text: "TPP Buddying", link: `${BASE}/production/testing-certification/tpp-buddying` }
        ]
      }
    ]
  },
  {
    text: "CAAP",
    collapsed: true,
    items: [
      { text: "Overview", link: `${BASE}/${version}/caap/` },
      { text: "User Experience", link: `${BASE}/${version}/caap/user-experience` },
      { text: "API Guide", link: `${BASE}/${version}/caap/api-guide` },
      { text: "Pricing", link: `${BASE}/${version}/caap/pricing` },
      {
        text: "API Reference",
        collapsed: true,
        items: [
          {
            text: "User Verification",
            collapsed: true,
            items: [
              apiRef("POST", "/users/actions/challenge/initialize", `${BASE}/${version}/caap/open-api/users-challenge-initialize`),
              apiRef("POST", "/users/actions/challenge/query", `${BASE}/${version}/caap/open-api/users-challenge-query`),
              apiRef("POST", "/users/actions/challenge/complete", `${BASE}/${version}/caap/open-api/users-challenge-complete`)
            ]
          },
          {
            text: "User Registration",
            collapsed: true,
            items: [
              apiRef("POST", "/users/actions/register/initialize", `${BASE}/${version}/caap/open-api/users-register-initialize`),
              apiRef("POST", "/users/actions/register/complete", `${BASE}/${version}/caap/open-api/users-register-complete`),
              apiRef("POST", "/users/actions/deregister", `${BASE}/${version}/caap/open-api/users-deregister`)
            ]
          },
          {
            text: "PII Decryption",
            collapsed: true,
            items: [
              apiRef("POST", "/users/actions/pii/decrypt", `${BASE}/${version}/caap/open-api/users-pii-decrypt`)
            ]
          },
          {
            text: "Consent",
            collapsed: true,
            items: [
              apiRef("POST", "/consent/actions/validate", `${BASE}/${version}/caap/open-api/consent-actions-validate`)
            ]
          },
          {
            text: "Accounts",
            collapsed: true,
            items: [
              apiRef("GET", "/accounts", `${BASE}/${version}/caap/open-api/accounts`),
              apiRef("GET", "/accounts/{accountId}", `${BASE}/${version}/caap/open-api/accounts-accountId`)
            ]
          },
          {
            text: "Insurance Policies",
            collapsed: true,
            items: [
              apiRef("GET", "/employment-insurance-policies", `${BASE}/${version}/caap/open-api/employment-insurance-policies`),
              apiRef("GET", "/health-insurance-policies", `${BASE}/${version}/caap/open-api/health-insurance-policies`),
              apiRef("GET", "/home-insurance-policies", `${BASE}/${version}/caap/open-api/home-insurance-policies`),
              apiRef("GET", "/life-insurance-policies", `${BASE}/${version}/caap/open-api/life-insurance-policies`),
              apiRef("GET", "/motor-insurance-policies", `${BASE}/${version}/caap/open-api/motor-insurance-policies`),
              apiRef("GET", "/renters-insurance-policies", `${BASE}/${version}/caap/open-api/renters-insurance-policies`),
              apiRef("GET", "/travel-insurance-policies", `${BASE}/${version}/caap/open-api/travel-insurance-policies`)
            ]
          }
        ]
      }
    ]
  }
];
function useLfiSidebar() {
  const { selectedVersion: selectedVersion2 } = useSelectedVersion();
  return computed(() => buildLfiSidebar(selectedVersion2.value));
}
const VERSION$2 = "v2.1";
const PAYMENT_SERVERS = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/payment/${VERSION$2}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/payment/${VERSION$2}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/payment/${VERSION$2}` }
];
const COP_SERVERS = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/confirmation-of-payee/${VERSION$2}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/confirmation-of-payee/${VERSION$2}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/${VERSION$2}` }
];
const ATM_SERVERS = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/atm/${VERSION$2}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/atm/${VERSION$2}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/atm/${VERSION$2}` }
];
const PRODUCT_SERVERS = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/product/${VERSION$2}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/product/${VERSION$2}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/product/${VERSION$2}` }
];
const INSURANCE_SERVERS = [
  { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/insurance/${VERSION$2}` },
  { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/insurance/${VERSION$2}` },
  { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/insurance/${VERSION$2}` }
];
const PAR_TOKEN_SERVERS = [
  { url: `https://as1.[LFICODE].apihub.openfinance.ae` },
  { url: `https://as1.[LFICODE].preprod.apihub.openfinance.ae` },
  { url: `https://as1.[LFICODE].sandbox.apihub.openfinance.ae` }
];
const REGISTRATION_SERVERS = [
  { url: "https://rs1.[LFICODE].apihub.openfinance.ae" },
  { url: "https://rs1.[LFICODE].preprod.apihub.openfinance.ae" },
  { url: "https://rs1.altareq1.sandbox.apihub.openfinance.ae" }
];
const WEBHOOK_SERVERS = [
  { url: `https://[subscription.Webhook.Url]` }
];
const SPEC_ACCOUNT_INFO = "/openapi/v2.1/standards/uae-account-information-openapi.yaml";
const SPEC_BANK_INITIATION = "/openapi/v2.1/standards/uae-bank-initiation-openapi.yaml";
const SPEC_CONFIRMATION = "/openapi/v2.1/standards/uae-confirmation-of-payee-openapi.yaml";
const SPEC_ATM = "/openapi/v2.1/standards/uae-atm-openapi.yaml";
const SPEC_PRODUCT = "/openapi/v2.1/standards/uae-product-openapi.yaml";
const SPEC_INSURANCE$1 = "/openapi/v2.1/standards/uae-insurance-openapi.yaml";
const SPEC_AUTH_ENDPOINTS = "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml";
const SPEC_REGISTRATION = "/openapi/v2.1/api-hub/uae-api-hub-tpp-onboarding-openapi.yaml";
const SPEC_WEBHOOK = "/openapi/v2.1/standards/uae-webhook-template-openapi.yaml";
function entry$2(input) {
  return {
    surface: "standards",
    version: VERSION$2,
    ...input
  };
}
function draftEntry(input) {
  return {
    surface: "standards",
    version: "v2.2-rc1",
    ...input
  };
}
const ATTESTATION_CONSENTS = [
  ["/account-access-consents", "account-access-consents", "a Bank Data Sharing", "uae-account-information-openapi"],
  ["/payment-consents", "payment-consents", "a Bank Service Initiation", "uae-bank-initiation-openapi"],
  ["/insurance-consents", "insurance-consents", "an Insurance", "uae-insurance-openapi"]
];
const standardsEndpoints = [
  // Registration
  entry$2({
    section: "Registration",
    sectionSlug: "registration",
    slug: "tpp-registration",
    method: "POST",
    path: "/tpp-registration",
    title: "Post Registration to Request Onboarding to an LFI",
    redoc: {
      spec: SPEC_REGISTRATION,
      filterPath: "/tpp-registration",
      overrideServers: REGISTRATION_SERVERS
    }
  }),
  // Token
  entry$2({
    section: "Token",
    sectionSlug: "token",
    slug: "token",
    method: "POST",
    path: "/token",
    title: "Token endpoint",
    redoc: {
      spec: SPEC_AUTH_ENDPOINTS,
      filterPath: "/token",
      overrideServers: PAR_TOKEN_SERVERS
    }
  }),
  // Consent — Create Consent
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Create Consent",
    slug: "par",
    method: "POST",
    path: "/par",
    title: "Pushed Authorization Request endpoint",
    redoc: {
      spec: SPEC_AUTH_ENDPOINTS,
      filterPath: "/par",
      overrideServers: PAR_TOKEN_SERVERS
    }
  }),
  // Consent — Bank Data Sharing
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Bank Data Sharing",
    slug: "account-access-consents",
    method: "GET",
    path: "/account-access-consents",
    title: "Retrieve Bank Data Sharing Consents by BaseConsentId",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/account-access-consents" }
  }),
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Bank Data Sharing",
    slug: "account-access-consents-ConsentId",
    method: "GET",
    path: "/account-access-consents/{ConsentId}",
    title: "Retrieve Bank Data Sharing Consent by ConsentId",
    redoc: {
      spec: SPEC_ACCOUNT_INFO,
      filterPath: "/account-access-consents/{ConsentId}",
      filterMethod: "get"
    }
  }),
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Bank Data Sharing",
    slug: "patch-account-access-consents-ConsentId",
    method: "PATCH",
    path: "/account-access-consents/{ConsentId}",
    title: "Modify a Bank Data Sharing Consent",
    redoc: {
      spec: SPEC_ACCOUNT_INFO,
      filterPath: "/account-access-consents/{ConsentId}",
      filterMethod: "patch"
    }
  }),
  // Consent — Bank Service Initiation
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Bank Service Initiation",
    slug: "payment-consents",
    method: "GET",
    path: "/payment-consents",
    title: "Retrieve Payment Consents by BaseConsentId",
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: "/payment-consents",
      overrideServers: PAYMENT_SERVERS
    }
  }),
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Bank Service Initiation",
    slug: "payment-consents-ConsentId",
    method: "GET",
    path: "/payment-consents/{ConsentId}",
    title: "Retrieve Payment Consent by ConsentId",
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: "/payment-consents/{ConsentId}",
      filterMethod: "get",
      overrideServers: PAYMENT_SERVERS
    }
  }),
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Bank Service Initiation",
    slug: "patch-payment-consents-ConsentId",
    method: "PATCH",
    path: "/payment-consents/{ConsentId}",
    title: "Modify a Payment Consent",
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: "/payment-consents/{ConsentId}",
      filterMethod: "patch",
      overrideServers: PAYMENT_SERVERS
    }
  }),
  // Consent — Insurance Data Sharing
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Insurance Data Sharing",
    slug: "insurance-consents",
    method: "GET",
    path: "/insurance-consents",
    title: "Retrieve Insurance Data Sharing Consents by BaseConsentId",
    redoc: { spec: SPEC_INSURANCE$1, filterPath: "/insurance-consents" }
  }),
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Insurance Data Sharing",
    slug: "insurance-consents-ConsentId",
    method: "GET",
    path: "/insurance-consents/{ConsentId}",
    title: "Retrieve Insurance Data Sharing Consent by ConsentId",
    redoc: {
      spec: SPEC_INSURANCE$1,
      filterPath: "/insurance-consents/{ConsentId}",
      filterMethod: "get"
    }
  }),
  entry$2({
    section: "Consent",
    sectionSlug: "consent",
    subsection: "Insurance Data Sharing",
    slug: "patch-insurance-consents-ConsentId",
    method: "PATCH",
    path: "/insurance-consents/{ConsentId}",
    title: "Modify an Insurance Data Sharing Consent",
    redoc: {
      spec: SPEC_INSURANCE$1,
      filterPath: "/insurance-consents/{ConsentId}",
      filterMethod: "patch"
    }
  }),
  // Bank Data Sharing
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts",
    method: "GET",
    path: "/accounts",
    title: "Get Accounts",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId",
    method: "GET",
    path: "/accounts/{AccountId}",
    title: "Get an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-balances",
    method: "GET",
    path: "/accounts/{AccountId}/balances",
    title: "Get Balances for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/balances" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-beneficiaries",
    method: "GET",
    path: "/accounts/{AccountId}/beneficiaries",
    title: "Get Beneficiaries for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/beneficiaries" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-direct-debits",
    method: "GET",
    path: "/accounts/{AccountId}/direct-debits",
    title: "Get Direct Debits for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/direct-debits" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "parties",
    method: "GET",
    path: "/parties",
    title: "Get Customers",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/parties" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-parties",
    method: "GET",
    path: "/accounts/{AccountId}/parties",
    title: "Get Customer for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/parties" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-product",
    method: "GET",
    path: "/accounts/{AccountId}/product",
    title: "Get Product Configuration for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/product" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-scheduled-payments",
    method: "GET",
    path: "/accounts/{AccountId}/scheduled-payments",
    title: "Get Scheduled Payments for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/scheduled-payments" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-standing-orders",
    method: "GET",
    path: "/accounts/{AccountId}/standing-orders",
    title: "Get Standing Orders for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/standing-orders" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-statements",
    method: "GET",
    path: "/accounts/{AccountId}/statements",
    title: "Get Statements for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/statements" }
  }),
  entry$2({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-transactions",
    method: "GET",
    path: "/accounts/{AccountId}/transactions",
    title: "Get Transactions for an Account",
    redoc: { spec: SPEC_ACCOUNT_INFO, filterPath: "/accounts/{AccountId}/transactions" }
  }),
  // Bank Service Initiation
  entry$2({
    section: "Bank Service Initiation",
    sectionSlug: "service-initiation",
    slug: "payments",
    method: "POST",
    path: "/payments",
    title: "Create a Payment",
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: "/payments",
      filterMethod: "post",
      overrideServers: PAYMENT_SERVERS
    }
  }),
  entry$2({
    section: "Bank Service Initiation",
    sectionSlug: "service-initiation",
    slug: "payments-PaymentId",
    method: "GET",
    path: "/payments/{PaymentId}",
    title: "Get a Payment",
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: "/payments/{PaymentId}",
      filterMethod: "get",
      overrideServers: PAYMENT_SERVERS
    }
  }),
  entry$2({
    section: "Bank Service Initiation",
    sectionSlug: "service-initiation",
    slug: "payments-idempotency",
    method: "GET",
    path: "/payments",
    title: "Get a PaymentId from Idempotency Key",
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: "/payments",
      filterMethod: "get",
      overrideServers: PAYMENT_SERVERS
    }
  }),
  entry$2({
    section: "Bank Service Initiation",
    sectionSlug: "service-initiation",
    slug: "payment-consents-ConsentId-refund",
    method: "GET",
    path: "/payment-consents/{ConsentId}/refund",
    title: "Get Account Details for a Refund",
    redoc: {
      spec: SPEC_BANK_INITIATION,
      filterPath: "/payment-consents/{ConsentId}/refund",
      filterMethod: "get",
      overrideServers: PAYMENT_SERVERS
    }
  }),
  // Confirmation of Payee
  entry$2({
    section: "Confirmation of Payee",
    sectionSlug: "confirmation-of-payee",
    slug: "discovery",
    method: "POST",
    path: "/discovery",
    title: "Discover the LFI that will confirm the payee",
    redoc: {
      spec: SPEC_CONFIRMATION,
      filterPath: "/discovery",
      overrideServers: COP_SERVERS
    }
  }),
  entry$2({
    section: "Confirmation of Payee",
    sectionSlug: "confirmation-of-payee",
    slug: "confirmation",
    method: "POST",
    path: "/confirmation",
    title: "Confirm the IBAN matches the Name on the Account",
    redoc: {
      spec: SPEC_CONFIRMATION,
      filterPath: "/confirmation",
      overrideServers: COP_SERVERS
    }
  }),
  // Products & Leads
  entry$2({
    section: "Products & Leads",
    sectionSlug: "products-and-leads",
    slug: "products",
    method: "GET",
    path: "/products",
    title: "Retrieve Banking products currently publicly available",
    redoc: {
      spec: SPEC_PRODUCT,
      filterPath: "/products",
      overrideServers: PRODUCT_SERVERS
    }
  }),
  entry$2({
    section: "Products & Leads",
    sectionSlug: "products-and-leads",
    slug: "leads",
    method: "POST",
    path: "/leads",
    title: "Provide user lead details",
    redoc: {
      spec: SPEC_PRODUCT,
      filterPath: "/leads"
    }
  }),
  // ATMs
  entry$2({
    section: "ATMs",
    sectionSlug: "atms",
    slug: "atms",
    method: "GET",
    path: "/atms",
    title: "Retrieve ATMs",
    redoc: {
      spec: SPEC_ATM,
      filterPath: "/atms",
      overrideServers: ATM_SERVERS
    }
  }),
  // Insurance Data Sharing — 7 insurance types × 2 endpoints (list + by-id)
  ...["employment", "health", "home", "life", "motor", "renters", "travel"].flatMap(
    (type) => {
      const Type = type.charAt(0).toUpperCase() + type.slice(1);
      return [
        entry$2({
          section: "Insurance Data Sharing",
          sectionSlug: "insurance-data-sharing",
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-policies`,
          method: "GET",
          path: `/${type}-insurance-policies`,
          title: `Get ${Type} Insurance Policies`,
          redoc: {
            spec: SPEC_INSURANCE$1,
            filterPath: `/${type}-insurance-policies`,
            filterMethod: "get",
            overrideServers: INSURANCE_SERVERS
          }
        }),
        entry$2({
          section: "Insurance Data Sharing",
          sectionSlug: "insurance-data-sharing",
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-policies-InsurancePolicyId`,
          method: "GET",
          path: `/${type}-insurance-policies/{InsurancePolicyId}`,
          title: `Get a ${Type} Insurance Policy`,
          redoc: {
            spec: SPEC_INSURANCE$1,
            filterPath: `/${type}-insurance-policies/{InsurancePolicyId}`,
            overrideServers: INSURANCE_SERVERS
          }
        })
      ];
    }
  ),
  // Insurance Quotation — 7 insurance types × 4 endpoints
  // (POST quotes, GET/PATCH quotes/{QuoteId}, POST policies)
  ...["employment", "health", "home", "life", "motor", "renters", "travel"].flatMap(
    (type) => {
      const Type = type.charAt(0).toUpperCase() + type.slice(1);
      return [
        entry$2({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-quotes`,
          method: "POST",
          path: `/${type}-insurance-quotes`,
          title: `Create a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE$1,
            filterPath: `/${type}-insurance-quotes`,
            filterMethod: "post",
            overrideServers: INSURANCE_SERVERS
          }
        }),
        entry$2({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `get-${type}-insurance-quotes-QuoteId`,
          method: "GET",
          path: `/${type}-insurance-quotes/{QuoteId}`,
          title: `Retrieve a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE$1,
            filterPath: `/${type}-insurance-quotes/{QuoteId}`,
            filterMethod: "get",
            overrideServers: INSURANCE_SERVERS
          }
        }),
        entry$2({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `patch-${type}-insurance-quotes-QuoteId`,
          method: "PATCH",
          path: `/${type}-insurance-quotes/{QuoteId}`,
          title: `Accept a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE$1,
            filterPath: `/${type}-insurance-quotes/{QuoteId}`,
            filterMethod: "patch",
            overrideServers: INSURANCE_SERVERS
          }
        }),
        entry$2({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `post-${type}-insurance-policies`,
          method: "POST",
          path: `/${type}-insurance-policies`,
          title: `Create a ${Type} Insurance Policy`,
          redoc: {
            spec: SPEC_INSURANCE$1,
            filterPath: `/${type}-insurance-policies`,
            filterMethod: "post",
            overrideServers: INSURANCE_SERVERS
          }
        })
      ];
    }
  ),
  // Events & Webhooks (schema-only, patched)
  entry$2({
    section: "Events & Webhooks",
    sectionSlug: "webhooks",
    slug: "consent-status",
    method: "POST",
    path: "[consent status]",
    title: "Consent Status Change Event",
    redoc: {
      spec: SPEC_WEBHOOK,
      patchSchemas: {
        AEWebhookEventTypes: { $ref: "#/components/schemas/AEWebhookConsentedEventProperties" }
      },
      overrideServers: WEBHOOK_SERVERS
    }
  }),
  entry$2({
    section: "Events & Webhooks",
    sectionSlug: "webhooks",
    slug: "payment-status",
    method: "POST",
    path: "[payment status]",
    title: "Payment Status Change Event",
    redoc: {
      spec: SPEC_WEBHOOK,
      patchSchemas: {
        AEWebhookEventTypes: { $ref: "#/components/schemas/AEWebhookPaymentInitiationEventProperties" }
      },
      overrideServers: WEBHOOK_SERVERS
    }
  }),
  entry$2({
    section: "Events & Webhooks",
    sectionSlug: "webhooks",
    slug: "insurance-status",
    method: "POST",
    path: "[insurance quote status]",
    title: "Insurance Quote Status Change Event",
    redoc: {
      spec: SPEC_WEBHOOK,
      patchSchemas: {
        AEWebhookEventTypes: { $ref: "#/components/schemas/AEWebhookInsuranceEventProperties" }
      },
      overrideServers: WEBHOOK_SERVERS
    }
  }),
  // ── Consent · Data Deletion Confirmation (v2.2-rc1 only) ────────────────
  // Introduced by OFP-005. Authored here rather than produced by
  // cloneForVersion (see src/data/endpoints/index.ts), which only mirrors the
  // endpoints v2.1 and v2.2-rc1 have in common.
  ...ATTESTATION_CONSENTS.flatMap(
    ([path, slug, label, spec]) => ["POST", "GET"].map((method) => draftEntry({
      section: "Consent",
      sectionSlug: "consent",
      subsection: "Data Deletion Confirmation",
      slug: `${method.toLowerCase()}-${slug}-ConsentId-attestations`,
      method,
      path: `${path}/{ConsentId}/attestations`,
      title: method === "POST" ? `Append ${label} Attestation Event` : `List ${label} Attestation Events`,
      redoc: {
        spec: `/openapi/v2.2-rc1/standards/${spec}.yaml`,
        filterPath: `${path}/{ConsentId}/attestations`,
        filterMethod: method
      }
    }))
  )
];
const VERSION$1 = "v2.1";
const HEIMDALL_SERVERS = [
  { url: "https://hh.[LFICODE].apihub.openfinance.ae" },
  { url: "https://hh.[LFICODE].preprod.apihub.openfinance.ae" }
];
const CONSENT_MANAGER_SERVERS = [
  { url: "https://cm.[LFICODE].apihub.openfinance.ae" },
  { url: "https://cm.[LFICODE].preprod.apihub.openfinance.ae" }
];
const SPEC_HEIMDALL = "/openapi/v2.1/api-hub/uae-api-hub-authorisation-server-openapi.yaml";
const SPEC_CONSENT_MANAGER = "/openapi/v2.1/api-hub/uae-api-hub-consent-manager-openapi.yaml";
function entry$1(input) {
  return {
    surface: "api-hub",
    version: VERSION$1,
    ...input
  };
}
const apiHubEndpoints = [
  // Headless Heimdall — Health Check
  entry$1({
    section: "Headless Heimdall Auth Server",
    sectionSlug: "headless-heimdall/open-api",
    subsection: "Health Check",
    slug: "hello-mtls",
    method: "GET",
    path: "/hello-mtls",
    title: "Hello MTLS",
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: "/hello-mtls",
      filterMethod: "get",
      overrideServers: HEIMDALL_SERVERS
    }
  }),
  // Headless Heimdall — Authorization
  entry$1({
    section: "Headless Heimdall Auth Server",
    sectionSlug: "headless-heimdall/open-api",
    subsection: "Authorization",
    slug: "auth",
    method: "GET",
    path: "/auth",
    title: "Get Auth",
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: "/auth",
      filterMethod: "get",
      overrideServers: HEIMDALL_SERVERS
    }
  }),
  entry$1({
    section: "Headless Heimdall Auth Server",
    sectionSlug: "headless-heimdall/open-api",
    subsection: "Authorization",
    slug: "auth-interactionId-doConfirm",
    method: "POST",
    path: "/auth/{interactionId}/doConfirm",
    title: "Confirm Authorization",
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: "/auth/{interactionId}/doConfirm",
      filterMethod: "post",
      overrideServers: HEIMDALL_SERVERS
    }
  }),
  entry$1({
    section: "Headless Heimdall Auth Server",
    sectionSlug: "headless-heimdall/open-api",
    subsection: "Authorization",
    slug: "auth-interactionId-doFail",
    method: "POST",
    path: "/auth/{interactionId}/doFail",
    title: "Fail Authorization",
    redoc: {
      spec: SPEC_HEIMDALL,
      filterPath: "/auth/{interactionId}/doFail",
      filterMethod: "post",
      overrideServers: HEIMDALL_SERVERS
    }
  }),
  // Consent Manager — Health Check
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Health Check",
    slug: "hello-mtls",
    method: "GET",
    path: "/hello-mtls",
    title: "Hello MTLS",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/hello-mtls",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  // Consent Manager — Consents
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "consents",
    method: "GET",
    path: "/consents",
    title: "Get Consents",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/consents",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "consents-consentId",
    method: "GET",
    path: "/consents/{consentId}",
    title: "Get Consent by ID",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/consents/{consentId}",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "patch-consents-consentId",
    method: "PATCH",
    path: "/consents/{consentId}",
    title: "Get Consent by ID",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/consents/{consentId}",
      filterMethod: "patch",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "consents-consentId-audit",
    method: "GET",
    path: "/consents/{consentId}/audit",
    title: "Get Consent Audit",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/consents/{consentId}/audit",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "consent-groups-consentGroupId-consents",
    method: "GET",
    path: "/consent-groups/{consentGroupId}/consents",
    title: "Get Consents in Consent Group",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/consent-groups/{consentGroupId}/consents",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "psu-userId-consents",
    method: "GET",
    path: "/psu/{userId}/consents",
    title: "Get Consents by End User",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/psu/{userId}/consents",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "accounts-accountId-consents",
    method: "GET",
    path: "/accounts/{accountId}/consents",
    title: "Get Consents by Account",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/accounts/{accountId}/consents",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "consent-groups-consentGroupId-consents-action-revoke",
    method: "POST",
    path: "/consent-groups/{consentGroupId}/consents/action/revoke",
    title: "Revoke Consents in Consent Group",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/consent-groups/{consentGroupId}/consents/action/revoke",
      filterMethod: "post",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Consents",
    slug: "consents-consentId-action-revoke",
    method: "POST",
    path: "/consents/{consentId}/action/revoke",
    title: "Revoke Consent",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/consents/{consentId}/action/revoke",
      filterMethod: "post",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  // Consent Manager — Payment Log
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Payment Log",
    slug: "payment-log",
    method: "GET",
    path: "/payment-log",
    title: "Get Payment Log",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/payment-log",
      filterMethod: "get",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Payment Log",
    slug: "payment-log-id",
    method: "PATCH",
    path: "/payment-log/{id}",
    title: "Get Payment Log",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/payment-log/{id}",
      filterMethod: "patch",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  }),
  // Consent Manager — Insurance Quote Log
  entry$1({
    section: "Consent Manager",
    sectionSlug: "consent-manager/open-api",
    subsection: "Insurance Quote Log",
    slug: "insurance-quote-log-logId",
    method: "PATCH",
    path: "/insurance-quote-log/{logId}",
    title: "Patch Insurance Quote Log",
    redoc: {
      spec: SPEC_CONSENT_MANAGER,
      filterPath: "/insurance-quote-log/{logId}",
      filterMethod: "patch",
      overrideServers: CONSENT_MANAGER_SERVERS
    }
  })
];
const VERSION = "v2.1";
const OZONE_SERVERS = [
  { url: "https://[Ozone_Connect_API]" }
];
const SPEC_HEALTH = "/openapi/v2.1/ozone-connect/uae-ozone-connect-health-check-openapi.yaml";
const SPEC_DATA_SHARING = "/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-data-sharing-openapi.yaml";
const SPEC_SERVICE_INITIATION = "/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml";
const SPEC_CONSENT_EVENTS = "/openapi/v2.1/ozone-connect/uae-ozone-connect-consent-events-actions-openapi.yaml";
const SPEC_PRODUCTS = "/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-products-data-openapi.yaml";
const SPEC_OPEN_DATA = "/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-open-data-openapi.yaml";
const SPEC_INSURANCE = "/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml";
const SPEC_CAAP = "/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml";
function entry(input) {
  return {
    surface: "ozone-connect",
    version: VERSION,
    ...input
  };
}
const ozoneConnectEndpoints = [
  // Health Check
  entry({
    section: "Health Check",
    sectionSlug: "health-check",
    slug: "hello",
    method: "GET",
    path: "/hello",
    title: "Hello",
    redoc: {
      spec: SPEC_HEALTH,
      filterPath: "/hello",
      filterMethod: "get",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Health Check",
    sectionSlug: "health-check",
    slug: "hello-mtls",
    method: "GET",
    path: "/hello-mtls",
    title: "Hello MTLS",
    redoc: {
      spec: SPEC_HEALTH,
      filterPath: "/hello-mtls",
      filterMethod: "get",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Health Check",
    sectionSlug: "health-check",
    slug: "echo-cert",
    method: "GET",
    path: "/echo-cert",
    title: "Echo Cert",
    redoc: {
      spec: SPEC_HEALTH,
      filterPath: "/echo-cert",
      filterMethod: "get",
      overrideServers: OZONE_SERVERS
    }
  }),
  // Consent Events
  entry({
    section: "Consent Events",
    sectionSlug: "consent-events",
    slug: "validate",
    method: "POST",
    path: "/consent/action/validate",
    title: "Validate consent before Creation",
    redoc: {
      spec: SPEC_CONSENT_EVENTS,
      filterPath: "/consent/action/validate",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Consent Events",
    sectionSlug: "consent-events",
    slug: "event-op",
    method: "POST",
    path: "/consent/event/{operation}",
    title: "Event when a consent is updated or created",
    redoc: {
      spec: SPEC_CONSENT_EVENTS,
      filterPath: "/consent/event/{operation}",
      overrideServers: OZONE_SERVERS
    }
  }),
  // Bank Data Sharing
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts",
    method: "GET",
    path: "/accounts",
    title: "Get Accounts",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId",
    method: "GET",
    path: "/accounts/{AccountId}",
    title: "Get an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-balances",
    method: "GET",
    path: "/accounts/{AccountId}/balances",
    title: "Get Balances for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/balances",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-beneficiaries",
    method: "GET",
    path: "/accounts/{AccountId}/beneficiaries",
    title: "Get Beneficiaries for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/beneficiaries",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "customer",
    method: "GET",
    path: "/customer",
    title: "Get Customers",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/customer",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-customer",
    method: "GET",
    path: "/accounts/{AccountId}/customer",
    title: "Get Customer for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/customer",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-direct-debits",
    method: "GET",
    path: "/accounts/{AccountId}/direct-debits",
    title: "Get Direct Debits for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/direct-debits",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-products",
    method: "GET",
    path: "/accounts/{AccountId}/products",
    title: "Get Product Configuration for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/products",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-scheduled-payments",
    method: "GET",
    path: "/accounts/{AccountId}/scheduled-payments",
    title: "Get Scheduled Payments for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/scheduled-payments",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-standing-orders",
    method: "GET",
    path: "/accounts/{AccountId}/standing-orders",
    title: "Get Standing Orders for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/standing-orders",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-statements",
    method: "GET",
    path: "/accounts/{AccountId}/statements",
    title: "Get Statements for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/statements",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Data Sharing",
    sectionSlug: "data-sharing",
    slug: "accounts-AccountId-transactions",
    method: "GET",
    path: "/accounts/{AccountId}/transactions",
    title: "Get Transactions for an Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/accounts/{accountId}/transactions",
      overrideServers: OZONE_SERVERS
    }
  }),
  // Bank Service Initiation
  entry({
    section: "Bank Service Initiation",
    sectionSlug: "service-initiation",
    slug: "payments",
    method: "POST",
    path: "/payments",
    title: "Create a Payment",
    redoc: {
      spec: SPEC_SERVICE_INITIATION,
      filterSchema: "AEPaymentRequest",
      displayPath: "/payments",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Service Initiation",
    sectionSlug: "service-initiation",
    slug: "payments-PaymentId",
    method: "GET",
    path: "/payments/{PaymentId}",
    title: "Get a Payment by PaymentId",
    redoc: {
      spec: SPEC_SERVICE_INITIATION,
      filterPath: "/payments/{paymentId}",
      filterMethod: "GET",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Bank Service Initiation",
    sectionSlug: "service-initiation",
    slug: "payment-consents-ConsentId-refund",
    method: "GET",
    path: "/payment-consents/{ConsentId}/refund",
    title: "Retrieve Account Details for a Refund",
    redoc: {
      spec: SPEC_SERVICE_INITIATION,
      filterPath: "/payment-consents/{consentId}/refund",
      filterMethod: "GET",
      overrideServers: OZONE_SERVERS
    }
  }),
  // Confirmation of Payee
  entry({
    section: "Confirmation of Payee",
    sectionSlug: "confirmation-of-payee",
    slug: "cop-query",
    method: "POST",
    path: "/customers/action/cop-query",
    title: "Confirm the IBAN matches the Name on the Account",
    redoc: {
      spec: SPEC_DATA_SHARING,
      filterPath: "/customers/action/cop-query",
      overrideServers: OZONE_SERVERS
    }
  }),
  // Products & Leads
  entry({
    section: "Products & Leads",
    sectionSlug: "products-and-leads",
    slug: "products",
    method: "GET",
    path: "/products",
    title: "Get Products",
    redoc: {
      spec: SPEC_PRODUCTS,
      filterPath: "/products",
      overrideServers: OZONE_SERVERS
    }
  }),
  entry({
    section: "Products & Leads",
    sectionSlug: "products-and-leads",
    slug: "leads",
    method: "POST",
    path: "/leads",
    title: "Submit Lead",
    redoc: {
      spec: SPEC_PRODUCTS,
      filterPath: "/leads",
      overrideServers: OZONE_SERVERS
    }
  }),
  // ATMs
  entry({
    section: "ATMs",
    sectionSlug: "atms",
    slug: "atm",
    method: "GET",
    path: "/atm",
    title: "Retrieve ATMs",
    redoc: {
      spec: SPEC_OPEN_DATA,
      filterPath: "/atm",
      overrideServers: OZONE_SERVERS
    }
  }),
  // CAAP — User Verification
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "User Verification",
    slug: "users-challenge-initialize",
    method: "POST",
    path: "/users/actions/challenge/initialize",
    title: "Initialize a User Challenge",
    redoc: { spec: SPEC_CAAP, filterPath: "/users/actions/challenge/initialize", overrideServers: OZONE_SERVERS }
  }),
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "User Verification",
    slug: "users-challenge-query",
    method: "POST",
    path: "/users/actions/challenge/query",
    title: "Query a User Challenge",
    redoc: { spec: SPEC_CAAP, filterPath: "/users/actions/challenge/query", overrideServers: OZONE_SERVERS }
  }),
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "User Verification",
    slug: "users-challenge-complete",
    method: "POST",
    path: "/users/actions/challenge/complete",
    title: "Complete a User Challenge",
    redoc: { spec: SPEC_CAAP, filterPath: "/users/actions/challenge/complete", overrideServers: OZONE_SERVERS }
  }),
  // CAAP — User Registration
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "User Registration",
    slug: "users-register-initialize",
    method: "POST",
    path: "/users/actions/register/initialize",
    title: "Initialize User Registration",
    redoc: { spec: SPEC_CAAP, filterPath: "/users/actions/register/initialize", overrideServers: OZONE_SERVERS }
  }),
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "User Registration",
    slug: "users-register-complete",
    method: "POST",
    path: "/users/actions/register/complete",
    title: "Complete User Registration",
    redoc: { spec: SPEC_CAAP, filterPath: "/users/actions/register/complete", overrideServers: OZONE_SERVERS }
  }),
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "User Registration",
    slug: "users-deregister",
    method: "POST",
    path: "/users/actions/deregister",
    title: "Deregister a User",
    redoc: { spec: SPEC_CAAP, filterPath: "/users/actions/deregister", overrideServers: OZONE_SERVERS }
  }),
  // CAAP — PII Decryption
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "PII Decryption",
    slug: "users-pii-decrypt",
    method: "POST",
    path: "/users/actions/pii/decrypt",
    title: "Decrypt PII for a User",
    redoc: { spec: SPEC_CAAP, filterPath: "/users/actions/pii/decrypt", overrideServers: OZONE_SERVERS }
  }),
  // CAAP — Consent Validation
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "Consent",
    slug: "consent-actions-validate",
    method: "POST",
    path: "/consent/actions/validate",
    title: "Validate a Consent",
    redoc: { spec: SPEC_CAAP, filterPath: "/consent/actions/validate", overrideServers: OZONE_SERVERS }
  }),
  // CAAP — Accounts (CAAP-specific variant)
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "Accounts",
    slug: "accounts",
    method: "GET",
    path: "/accounts",
    title: "Retrieve Accounts (CAAP)",
    redoc: { spec: SPEC_CAAP, filterPath: "/accounts", filterMethod: "get", overrideServers: OZONE_SERVERS }
  }),
  entry({
    section: "CAAP",
    sectionSlug: "caap",
    subsection: "Accounts",
    slug: "accounts-accountId",
    method: "GET",
    path: "/accounts/{accountId}",
    title: "Retrieve an Account (CAAP)",
    redoc: { spec: SPEC_CAAP, filterPath: "/accounts/{accountId}", filterMethod: "get", overrideServers: OZONE_SERVERS }
  }),
  // CAAP — Insurance Policies (list only; CAAP-only response properties)
  ...["employment", "health", "home", "life", "motor", "renters", "travel"].map((type) => {
    const Type = type.charAt(0).toUpperCase() + type.slice(1);
    return entry({
      section: "CAAP",
      sectionSlug: "caap",
      subsection: "Insurance Policies",
      slug: `${type}-insurance-policies`,
      method: "GET",
      path: `/${type}-insurance-policies`,
      title: `Retrieve ${Type} Insurance Policies (CAAP)`,
      redoc: { spec: SPEC_CAAP, filterPath: `/${type}-insurance-policies`, overrideServers: OZONE_SERVERS }
    });
  }),
  // Insurance Data Sharing — 7 insurance types × 2 endpoints (list + by-id)
  ...["employment", "health", "home", "life", "motor", "renters", "travel"].flatMap(
    (type) => {
      const Type = type.charAt(0).toUpperCase() + type.slice(1);
      return [
        entry({
          section: "Insurance Data Sharing",
          sectionSlug: "insurance-data-sharing",
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-policies`,
          method: "GET",
          path: `/${type}-insurance-policies`,
          title: `Get ${Type} Insurance Policies`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-policies`,
            filterMethod: "get",
            overrideServers: OZONE_SERVERS
          }
        }),
        entry({
          section: "Insurance Data Sharing",
          sectionSlug: "insurance-data-sharing",
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-policies-InsurancePolicyId`,
          method: "GET",
          path: `/${type}-insurance-policies/{InsurancePolicyId}`,
          title: `Get a ${Type} Insurance Policy`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-policies/{InsurancePolicyId}`,
            overrideServers: OZONE_SERVERS
          }
        })
      ];
    }
  ),
  // Insurance Quotation — 7 insurance types × 4 endpoints
  // (POST quotes, GET/PATCH quotes/{QuoteId}, POST policies)
  ...["employment", "health", "home", "life", "motor", "renters", "travel"].flatMap(
    (type) => {
      const Type = type.charAt(0).toUpperCase() + type.slice(1);
      return [
        entry({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `${type}-insurance-quotes`,
          method: "POST",
          path: `/${type}-insurance-quotes`,
          title: `Create a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-quotes`,
            filterMethod: "post",
            overrideServers: OZONE_SERVERS
          }
        }),
        entry({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `get-${type}-insurance-quotes-QuoteId`,
          method: "GET",
          path: `/${type}-insurance-quotes/{QuoteId}`,
          title: `Retrieve a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-quotes/{QuoteId}`,
            filterMethod: "get",
            overrideServers: OZONE_SERVERS
          }
        }),
        entry({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `patch-${type}-insurance-quotes-QuoteId`,
          method: "PATCH",
          path: `/${type}-insurance-quotes/{QuoteId}`,
          title: `Accept a ${Type} Insurance Quote`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-quotes/{QuoteId}`,
            filterMethod: "patch",
            overrideServers: OZONE_SERVERS
          }
        }),
        entry({
          section: "Insurance Quotation",
          sectionSlug: "insurance-quotation",
          subsection: `${Type} Insurance`,
          slug: `post-${type}-insurance-policies`,
          method: "POST",
          path: `/${type}-insurance-policies`,
          title: `Create a ${Type} Insurance Policy`,
          redoc: {
            spec: SPEC_INSURANCE,
            filterPath: `/${type}-insurance-policies`,
            filterMethod: "post",
            overrideServers: OZONE_SERVERS
          }
        })
      ];
    }
  )
];
const authoredEndpoints = [
  ...standardsEndpoints,
  ...apiHubEndpoints,
  ...ozoneConnectEndpoints
];
function cloneForVersion(endpoints, from, to) {
  return endpoints.filter((e) => e.version === from).map((e) => ({
    ...e,
    version: to,
    redoc: {
      ...e.redoc,
      spec: e.redoc.spec.replace(`/openapi/${from}/`, `/openapi/${to}/`)
    }
  }));
}
const sectionRank = /* @__PURE__ */ new Map();
const subsectionRank = /* @__PURE__ */ new Map();
for (const e of authoredEndpoints) {
  const sectionKey = `${e.surface}\0${e.sectionSlug}`;
  const subsectionKey = `${sectionKey}\0${e.subsection ?? ""}`;
  if (!sectionRank.has(sectionKey)) sectionRank.set(sectionKey, sectionRank.size);
  if (!subsectionRank.has(subsectionKey)) subsectionRank.set(subsectionKey, subsectionRank.size);
}
function rankOf(map, key) {
  return map.get(key) ?? Number.MAX_SAFE_INTEGER;
}
function authoredOrder(a, b) {
  const versionDelta = VERSIONS.indexOf(a.version) - VERSIONS.indexOf(b.version);
  if (versionDelta !== 0) return versionDelta;
  const aSection = `${a.surface}\0${a.sectionSlug}`;
  const bSection = `${b.surface}\0${b.sectionSlug}`;
  const sectionDelta = rankOf(sectionRank, aSection) - rankOf(sectionRank, bSection);
  if (sectionDelta !== 0) return sectionDelta;
  return rankOf(subsectionRank, `${aSection}\0${a.subsection ?? ""}`) - rankOf(subsectionRank, `${bSection}\0${b.subsection ?? ""}`);
}
const allEndpoints = [
  ...authoredEndpoints,
  ...cloneForVersion(authoredEndpoints, "v2.1", "v2.2-rc1")
].sort(authoredOrder);
const SURFACE_TO_URL = {
  standards: "tpp",
  "api-hub": "api-hub",
  "ozone-connect": "ozone-connect"
};
const URL_TO_SURFACE = {
  tpp: "standards",
  "api-hub": "api-hub",
  "ozone-connect": "ozone-connect"
};
function surfaceToUrlSegment(surface) {
  return SURFACE_TO_URL[surface];
}
function urlSegmentToSurface(segment) {
  return URL_TO_SURFACE[segment];
}
function endpointUrl(endpoint) {
  const seg = surfaceToUrlSegment(endpoint.surface);
  return `/tech/api-specs/${endpoint.version}/${seg}/${endpoint.sectionSlug}/${endpoint.slug}`;
}
function getEndpointBySlug(tail) {
  const trimmed = tail.replace(/^\/+|\/+$/g, "");
  return allEndpoints.find((e) => endpointUrl(e) === `/tech/api-specs/${trimmed}`);
}
function getSectionScope(tail) {
  const trimmed = tail.replace(/^\/+|\/+$/g, "");
  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length < 2) return void 0;
  const versionSeg = segments[0];
  const surfaceSeg = segments[1];
  const rest = segments.slice(2);
  const surface = urlSegmentToSurface(surfaceSeg);
  if (!surface) return void 0;
  const versioned = allEndpoints.filter(
    (e) => e.surface === surface && e.version === versionSeg
  );
  if (versioned.length === 0) return void 0;
  const version = versionSeg;
  if (rest.length === 0) {
    return { kind: "surface", surface, version, endpoints: versioned };
  }
  for (let i = rest.length; i > 0; i--) {
    const candidate = rest.slice(0, i).join("/");
    const matches = versioned.filter((e) => e.sectionSlug === candidate);
    if (matches.length > 0) {
      return {
        kind: "section",
        surface,
        version,
        sectionSlug: candidate,
        sectionLabel: matches[0].section,
        endpoints: matches
      };
    }
  }
  return void 0;
}
function sectionUrl(surface, version, sectionSlug) {
  const seg = surfaceToUrlSegment(surface);
  return `/tech/api-specs/${version}/${seg}/${sectionSlug}`;
}
function surfaceUrl(surface, version) {
  const seg = surfaceToUrlSegment(surface);
  return `/tech/api-specs/${version}/${seg}`;
}
const SURFACE_ORDER = ["standards", "api-hub", "ozone-connect"];
const SURFACE_LABEL = {
  standards: "TPP - Standards",
  "api-hub": "API Hub",
  "ozone-connect": "Ozone Connect"
};
const TRUST_FRAMEWORK_GROUP = {
  text: "Trust Framework",
  items: [
    {
      text: "Participants",
      collapsed: true,
      items: [
        apiRef("GET", "/participants", "/tech/api-specs/trust-framework/participants")
      ]
    },
    {
      text: "Token",
      collapsed: true,
      items: [
        apiRef("POST", "/token", "/tech/api-specs/trust-framework/token")
      ]
    },
    {
      text: "Organisations",
      collapsed: true,
      items: [
        apiRef("GET", "/organisations", "/tech/api-specs/trust-framework/organisations"),
        apiRef("GET", "/organisations/{OrganisationId}/softwarestatements", "/tech/api-specs/trust-framework/software-statements"),
        apiRef("GET", "/organisations/{OrganisationId}/contacts", "/tech/api-specs/trust-framework/contacts"),
        apiRef("GET", "/organisations/{OrganisationId}/authorisationservers", "/tech/api-specs/trust-framework/auth-servers"),
        apiRef("GET", "/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources", "/tech/api-specs/trust-framework/api-resources")
      ]
    },
    {
      text: "References",
      collapsed: true,
      items: [
        apiRef("GET", "/references/apifamilies", "/tech/api-specs/trust-framework/api-families")
      ]
    }
  ]
};
function buildApiSpecsSidebar(version) {
  const endpoints = allEndpoints.filter((e) => e.version === version);
  const caapEndpoints = endpoints.filter((e) => e.sectionSlug === "caap");
  const nonCaapEndpoints = endpoints.filter((e) => e.sectionSlug !== "caap");
  const surfaceGroups = SURFACE_ORDER.map((surface) => {
    const surfaceEndpoints = nonCaapEndpoints.filter((e) => e.surface === surface);
    const sections = groupBy(surfaceEndpoints, (e) => e.section);
    const sectionItems = sections.map(([sectionLabel, sectionEndpoints]) => {
      const subsections = groupBy(sectionEndpoints, (e) => e.subsection ?? "");
      const hasSubsections = subsections.some(([key]) => key !== "");
      const items = hasSubsections ? subsections.map(([subLabel, subEndpoints]) => {
        if (subLabel === "") {
          return subEndpoints.map(toLeaf);
        }
        return [{
          text: subLabel,
          items: subEndpoints.map(toLeaf)
        }];
      }).flat() : sectionEndpoints.map(toLeaf);
      return {
        text: sectionLabel,
        collapsed: true,
        items
      };
    });
    return {
      text: SURFACE_LABEL[surface],
      items: sectionItems
    };
  });
  const caapGroup = caapEndpoints.length === 0 ? null : (() => {
    const subsections = groupBy(caapEndpoints, (e) => e.subsection ?? "");
    const items = subsections.map(([subLabel, subEndpoints]) => {
      if (subLabel === "") return subEndpoints.map(toLeaf);
      return [{ text: subLabel, collapsed: true, items: subEndpoints.map(toLeaf) }];
    }).flat();
    return { text: "CAAP", collapsed: true, items };
  })();
  return [...surfaceGroups, TRUST_FRAMEWORK_GROUP, ...caapGroup ? [caapGroup] : []];
}
function toLeaf(e) {
  return apiRef(e.method, e.path, endpointUrl(e));
}
function groupBy(items, keyOf) {
  const map = /* @__PURE__ */ new Map();
  for (const item of items) {
    const key = keyOf(item);
    const list = map.get(key);
    if (list) list.push(item);
    else map.set(key, [item]);
  }
  return [...map.entries()];
}
function useApiSpecsSidebar() {
  const { selectedVersion: selectedVersion2 } = useSelectedVersion();
  return computed(() => buildApiSpecsSidebar(selectedVersion2.value));
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const apiSpecsSidebar = useApiSpecsSidebar();
    const tppSidebar = useTppSidebar();
    const lfiSidebar = useLfiSidebar();
    function isPrefix(path, prefix) {
      return path === prefix || path.startsWith(prefix + "/");
    }
    const chromeSidebar = computed(() => {
      const p = route.path;
      if (isPrefix(p, "/tech/api-specs")) {
        return { items: apiSpecsSidebar.value, title: "API Specs", rootHref: "/tech/api-specs/" };
      }
      if (isPrefix(p, "/tech/tpp-standards")) {
        return { items: tppSidebar.value, title: "TPP Standards", rootHref: "/tech/tpp-standards/" };
      }
      if (isPrefix(p, "/tech/lfi-api-hub")) {
        return { items: lfiSidebar.value, title: "LFI Guide", rootHref: "/tech/lfi-api-hub/" };
      }
      return null;
    });
    const isTech = computed(() => isPrefix(route.path, "/tech"));
    const isHome = computed(() => route.path === "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = __unplugin_components_0;
      const _component_SiteAnnouncementModal = __unplugin_components_1;
      const _component_DraftVersionBanner = __unplugin_components_2;
      const _component_EdHoverSidebar = __unplugin_components_23;
      const _component_router_view = resolveComponent("router-view");
      const _component_PageFooter = __unplugin_components_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["app-shell", { "is-tech": unref(isTech), "is-home": unref(isHome) }]
      }, _attrs))} data-v-2c0987ba>`);
      _push(ssrRenderComponent(_component_PageHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_SiteAnnouncementModal, null, null, _parent));
      _push(`<main class="app-shell__main" data-v-2c0987ba>`);
      _push(ssrRenderComponent(_component_DraftVersionBanner, null, null, _parent));
      if (unref(chromeSidebar)) {
        _push(ssrRenderComponent(_component_EdHoverSidebar, {
          items: unref(chromeSidebar).items,
          title: unref(chromeSidebar).title,
          "root-href": unref(chromeSidebar).rootHref
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_router_view, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_PageFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/default.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __layout_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-2c0987ba"]]);
const INTERNAL_PASSWORD = "NOF@1234";
const STORAGE_KEY$1 = "internal-unlocked";
const unlocked = ref(false);
let hydrated$1 = false;
function hydrate$1() {
  if (hydrated$1) return;
  hydrated$1 = true;
  if (typeof window === "undefined") return;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY$1) === "1") unlocked.value = true;
  } catch {
  }
}
function useInternalAuth() {
  hydrate$1();
  function unlock(candidate) {
    if (candidate !== INTERNAL_PASSWORD) return false;
    unlocked.value = true;
    try {
      window.sessionStorage.setItem(STORAGE_KEY$1, "1");
    } catch {
    }
    return true;
  }
  function lock() {
    unlocked.value = false;
    try {
      window.sessionStorage.removeItem(STORAGE_KEY$1);
    } catch {
    }
  }
  return { unlocked, unlock, lock };
}
const __vite_glob_2_0 = '<route lang="yaml">\nmeta:\n  layout: internal\n  title: Example page\n  next: false\n  prev: false\n  aside: false\n</route>\n\n# Example page\n\nThis page is a starter template. Duplicate it with the widget above to get a draft seeded\nwith everything below, then edit the Markdown freely. The block elements shown here cover\nthe formatting you can use on an internal page — headings, prose, lists, tables, quotes,\nimages and code.\n\n## What an internal page is for\n\nInternal pages are a low-friction space for documentation that is not yet ready to live in\nthe public site. Drafts stay in your browser; only pages committed to the repository at\n`src/pages/internal/*.md` are visible to anyone else. Use the section to capture working\nnotes, draft proposals, and onboarding material before promoting it into the wider docs.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt\nut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\nreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n### A smaller subsection\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit\nanim id est laborum. **Bold text** stands out, *italic text* sets a softer emphasis, and\n`inline code` is for short identifiers like `clientId` or `POST /payments`. Links look\nlike [this one to the TPP standards](/tech/tpp-standards/).\n\n## Lists\n\nUnordered:\n\n- The TPP initiates the consent via PAR\n- The API Hub stores the consent and brokers authorization\n- The end user authenticates at the LFI\n- The TPP exchanges the auth code for an access token\n\nOrdered:\n\n1. Validate the access token\n2. Validate the consent is still authorised\n3. Enrich the request with `customerId` and `accountIds`\n4. Proxy the request to the Ozone Connect endpoint\n5. Normalise the response and return it to the TPP\n\nNested list:\n\n- Banking\n  - Account information\n  - Payment initiation\n  - Confirmation of funds\n- Insurance\n  - Policy information\n  - Claim status\n\n## A table\n\n| Term | Role | Operated by |\n| --- | --- | --- |\n| TPP | Third-Party Provider | Third party |\n| API Hub | Authorization Server & Gateway | Nebras |\n| Ozone Connect | LFI backend exposing Open Finance endpoints | LFI |\n\n## A blockquote\n\n> "Strict mediation is the foundation of the trust model: every TPP request flows through\n> the API Hub, which validates the token and consent before proxying to the LFI."\n\n## An image\n\nStandalone images render as a zoomable `ImageViewer`. Use a URL or a path under `public/`.\n\n![A sample article cover image](/images/articles/adib-first.jpg)\n\n## Code blocks\n\nA JSON example:\n\n```json\n{\n  "Data": {\n    "ConsentId": "urn:apihub:consent:abc-123",\n    "Status": "Authorised",\n    "Permissions": [\n      "ReadAccountsBasic",\n      "ReadBalances",\n      "ReadTransactionsDetail"\n    ]\n  }\n}\n```\n\nA `curl` example:\n\n```bash\ncurl -X POST https://rs1.demo-bank.apihub.openfinance.ae/open-banking/v2.1/aisp/account-access-consents \\\n  -H "Authorization: Bearer eyJhbGciOi..." \\\n  -H "Content-Type: application/json" \\\n  -d @consent.json\n```\n\nA short TypeScript snippet:\n\n```ts\ninterface ConsentRequest {\n  permissions: string[]\n  expirationDateTime?: string\n  transactionFromDateTime?: string\n  transactionToDateTime?: string\n}\n\nfunction isExpired(consent: { expirationDateTime?: string }): boolean {\n  if (!consent.expirationDateTime) return false\n  return new Date(consent.expirationDateTime).getTime() < Date.now()\n}\n```\n\n## Horizontal rules separate sections\n\n---\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique sapien at\nneque dignissim, vitae cursus mauris pulvinar. Praesent volutpat tortor in justo\nfermentum, sit amet faucibus enim luctus.\n\n---\n\n## When you\'re ready to publish\n\nDrafts live only in this browser. When a page is ready to share, the publish flow copies\nthe draft into `src/pages/internal/{slug}.md` and ships it through a normal repo commit.\nAfter deploy, the page is reachable at `/internal/{slug}` and the local draft can be\ndeleted from the internal home.\n';
const STORAGE_KEY = "internal-drafts";
const drafts = ref([]);
let hydrated = false;
function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts.value));
  } catch {
  }
}
function hydrate() {
  if (hydrated) return;
  hydrated = true;
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) drafts.value = parsed;
  } catch {
    drafts.value = [];
  }
}
const committedModules = /* @__PURE__ */ Object.assign({ "/src/pages/internal/example.md": () => import("./assets/example-M6EDQZSO.js") });
const committedSlugs = Object.keys(committedModules).map((p) => p.replace("/src/pages/internal/", "").replace(/\.md$/, "").replace(/\/index$/, "")).sort();
const appPageModules = /* @__PURE__ */ Object.assign({ "/src/pages/internal/pages/lfi-certificate/index.vue": () => import("./assets/index-Cmn5taiv.js"), "/src/pages/internal/pages/redirect-testing/checker.vue": () => import("./assets/checker-CaDwB32v.js"), "/src/pages/internal/pages/redirect-testing/index.vue": () => import("./assets/index-CGv4kYP9.js"), "/src/pages/internal/pages/tpp-certificate/index.vue": () => import("./assets/index-CFW8GEmx.js") });
const appPageSlugs = Object.keys(appPageModules).map((p) => p.replace("/src/pages/internal/pages/", "").replace(/\.vue$/, "").replace(/\/index$/, "")).sort();
const committedSources = /* @__PURE__ */ Object.assign({
  "/src/pages/internal/example.md": __vite_glob_2_0
});
function getCommittedSource(slug) {
  const raw = committedSources[`/src/pages/internal/${slug}.md`];
  if (raw === void 0) return void 0;
  return stripFrontmatter(raw).replace(/^\s*\n+/, "");
}
function stripFrontmatter(raw) {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 4).replace(/^\r?\n/, "");
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function isValidSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
function prettifySlug(slug) {
  return slug.split(/[-/]/).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
function useInternalPages() {
  hydrate();
  function slugExists(slug) {
    return committedSlugs.includes(slug) || drafts.value.some((d) => d.slug === slug);
  }
  function getDraft(slug) {
    return drafts.value.find((d) => d.slug === slug);
  }
  function createDraft(slug, title) {
    return createDraftWithBody(
      slug,
      title,
      `# ${title || prettifySlug(slug)}

Start writing in Markdown…
`
    );
  }
  function createDraftWithBody(slug, title, body) {
    if (slugExists(slug)) return false;
    drafts.value.push({
      slug,
      title: title || prettifySlug(slug),
      body,
      updatedAt: Date.now()
    });
    persist();
    return true;
  }
  function saveDraft(slug, patch) {
    const draft = drafts.value.find((d) => d.slug === slug);
    if (!draft) return;
    if (patch.title !== void 0) draft.title = patch.title;
    if (patch.body !== void 0) draft.body = patch.body;
    draft.updatedAt = Date.now();
    persist();
  }
  function deleteDraft(slug) {
    drafts.value = drafts.value.filter((d) => d.slug !== slug);
    persist();
  }
  return {
    drafts,
    committedSlugs,
    slugExists,
    getDraft,
    createDraft,
    createDraftWithBody,
    saveDraft,
    deleteDraft
  };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InternalDuplicate",
  __ssrInlineRender: true,
  props: {
    sourcePage: {}
  },
  setup(__props) {
    const props = __props;
    useRouter();
    const { slugExists } = useInternalPages();
    const newTitle = ref("");
    const slug = computed(() => slugify(newTitle.value));
    const sourceBody = computed(() => getCommittedSource(props.sourcePage) ?? "");
    const problem = computed(() => {
      if (!newTitle.value.trim()) return null;
      if (!slug.value || !isValidSlug(slug.value)) return "Use letters and numbers.";
      if (slugExists(slug.value)) return "A page or draft with this name already exists.";
      if (!sourceBody.value) return "Could not find the source page Markdown.";
      return null;
    });
    const canDuplicate = computed(
      () => !!slug.value && isValidSlug(slug.value) && !slugExists(slug.value) && !!sourceBody.value
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: "int-dup",
        "aria-label": "Duplicate this page"
      }, _attrs))} data-v-bd968011><div class="int-dup__eyebrow" data-v-bd968011><span class="int-dup__dash" data-v-bd968011></span> Use this page as a starting point </div><p class="int-dup__lede" data-v-bd968011> Duplicate this page to create a new draft in your browser. You can edit the Markdown freely and preview how it will look when published. </p><form class="int-dup__form" data-v-bd968011><label class="int-dup__label" for="int-dup-name" data-v-bd968011>New draft name</label><div class="int-dup__row" data-v-bd968011><input id="int-dup-name"${ssrRenderAttr("value", newTitle.value)} type="text" class="${ssrRenderClass([{ "is-error": !!problem.value }, "int-dup__input"])}" placeholder="e.g. Onboarding checklist" data-v-bd968011><button type="submit" class="int-dup__btn"${ssrIncludeBooleanAttr(!canDuplicate.value) ? " disabled" : ""} data-v-bd968011>Duplicate</button></div>`);
      if (problem.value) {
        _push(`<p class="int-dup__msg int-dup__msg--error" data-v-bd968011>${ssrInterpolate(problem.value)}</p>`);
      } else if (slug.value) {
        _push(`<p class="int-dup__msg" data-v-bd968011> Will be created at <code data-v-bd968011>/internal/draft/${ssrInterpolate(slug.value)}</code></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/InternalDuplicate.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const InternalDuplicate = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bd968011"]]);
const internalPolicyThemes = [
  {
    id: "governance",
    label: "Governance & Oversight",
    color: "var(--at-navy)",
    policies: [
      {
        slug: "corporate-governance",
        title: "Corporate Governance Policy",
        purpose: "The governance framework, board and committee structure, and responsibilities that direct and control Nebras.",
        appliesToShort: ["Nebras"],
        readTime: "12 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "internal-audit",
        title: "Internal Audit Policy",
        purpose: "How Nebras's internal audit function provides independent assurance over governance, risk management, and controls.",
        appliesToShort: ["Nebras"],
        readTime: "15 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "outsourcing",
        title: "Outsourcing Policy",
        purpose: "Requirements for selecting, onboarding, and overseeing third parties to whom Nebras outsources material functions.",
        appliesToShort: ["Nebras"],
        readTime: "13 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "procurement",
        title: "Procurement Policy",
        purpose: "Principles and controls governing how Nebras sources goods and services and manages its suppliers.",
        appliesToShort: ["Nebras"],
        readTime: "18 min",
        updated: "2026-05-01",
        classification: "Restricted"
      }
    ]
  },
  {
    id: "risk",
    label: "Risk, Security & Compliance",
    color: "var(--at-blue)",
    policies: [
      {
        slug: "enterprise-risk-management",
        title: "Enterprise Risk Management Policy",
        purpose: "Nebras's ERM framework — risk categories, the three-lines model, and the identify, assess, mitigate, and monitor cycle.",
        appliesToShort: ["Nebras"],
        readTime: "22 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "aml-cft-and-fraud",
        title: "AML/CFT and Fraud Policy",
        purpose: "Controls to prevent money laundering, terrorist financing, and operational fraud across Nebras's role as API Hub operator.",
        appliesToShort: ["Nebras", "LFI", "TPP"],
        readTime: "11 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "business-continuity",
        title: "Business Continuity & Disaster Recovery Policy",
        purpose: "Continuity and disaster-recovery foundations protecting Nebras's critical Open Finance infrastructure.",
        appliesToShort: ["Nebras"],
        readTime: "18 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "information-security",
        title: "Information Security Policy",
        purpose: "How Nebras protects the confidentiality, integrity, and availability of its systems and data.",
        appliesToShort: ["Nebras"],
        readTime: "30 min",
        updated: "2026-05-01",
        classification: "Restricted"
      }
    ]
  },
  {
    id: "conduct",
    label: "Customers & Conduct",
    color: "var(--at-teal)",
    policies: [
      {
        slug: "retail-consumer-protection",
        title: "Retail Consumer Protection Policy",
        purpose: "Nebras's indirect role in supporting fair, transparent, and secure experiences for retail consumers in the ecosystem.",
        appliesToShort: ["Nebras", "LFI", "TPP"],
        readTime: "6 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "complaints-and-disputes",
        title: "Complaints and Disputes Management Policy",
        purpose: "A structured process for raising, assessing, resolving, and escalating complaints and disputes across the ecosystem.",
        appliesToShort: ["Nebras", "LFI", "TPP"],
        readTime: "5 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "marketing-and-advertising",
        title: "Marketing and Advertising Policy",
        purpose: "Standards for how Nebras conducts marketing and advertising, ensuring accuracy and regulatory alignment.",
        appliesToShort: ["Nebras"],
        readTime: "6 min",
        updated: "2026-05-01",
        classification: "Restricted"
      },
      {
        slug: "product-and-services",
        title: "Product and Services Policy",
        purpose: "How Nebras defines, governs, and manages the products and services it provides to the ecosystem.",
        appliesToShort: ["Nebras"],
        readTime: "6 min",
        updated: "2026-05-01",
        classification: "Restricted"
      }
    ]
  },
  {
    id: "people",
    label: "People",
    color: "var(--at-gold)",
    policies: [
      {
        slug: "hr",
        title: "Human Resources Policy",
        purpose: "The people policies governing employment, conduct, and the working environment at Nebras.",
        appliesToShort: ["Nebras"],
        readTime: "35 min",
        updated: "2026-05-01",
        classification: "Restricted"
      }
    ]
  }
];
const internalPolicies = internalPolicyThemes.flatMap(
  (t) => t.policies
);
const internalPolicySidebar = internalPolicyThemes.map((t) => ({
  text: t.label,
  collapsed: false,
  items: t.policies.map((p) => ({
    text: p.title,
    link: `/internal/policies/${p.slug}`
  }))
}));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "internal",
  __ssrInlineRender: true,
  setup(__props) {
    const { unlocked: unlocked2 } = useInternalAuth();
    const { drafts: drafts2 } = useInternalPages();
    const route = useRoute();
    const ready = ref(false);
    onMounted(() => {
      ready.value = true;
    });
    const password = ref("");
    const error = ref(false);
    const isContentPage = computed(() => {
      const p = route.path.replace(/\/$/, "");
      if (p === "/internal") return false;
      if (p.startsWith("/internal/draft/")) return false;
      if (p.startsWith("/internal/pages/")) return false;
      if (p === "/internal/policies" || p.startsWith("/internal/policies/")) return false;
      if (p === "/internal/proposals" || p.startsWith("/internal/proposals/")) return false;
      return true;
    });
    const isPoliciesSection = computed(() => {
      const p = route.path.replace(/\/$/, "");
      return p === "/internal/policies" || p.startsWith("/internal/policies/");
    });
    const contentSlug = computed(() => {
      if (!isContentPage.value) return "";
      return route.path.replace(/\/$/, "").replace(/^\/internal\//, "");
    });
    const isExamplePage = computed(() => contentSlug.value === "example");
    const rawSource = computed(() => getCommittedSource(contentSlug.value) ?? "");
    const view = ref("markdown");
    watch(contentSlug, () => {
      view.value = "markdown";
    });
    const sidebarItems = computed(() => {
      const published = committedSlugs.map((s) => ({
        text: prettifySlug(s),
        link: "/internal/" + s
      }));
      const draftItems = drafts2.value.map((d) => ({
        text: d.title || prettifySlug(d.slug),
        link: "/internal/draft/" + d.slug
      }));
      const CERT_LABELS = {
        "lfi-certificate": "LFI certificate",
        "tpp-certificate": "TPP certificate"
      };
      const certSlugs = appPageSlugs.filter((s) => s in CERT_LABELS);
      const otherToolSlugs = appPageSlugs.filter((s) => !(s in CERT_LABELS));
      const toolItems = [
        ...otherToolSlugs.map((s) => ({
          text: prettifySlug(s),
          link: "/internal/pages/" + s
        })),
        ...certSlugs.length ? [{
          text: "Commercial Go-Live Certificates",
          collapsed: false,
          items: certSlugs.map((s) => ({
            text: CERT_LABELS[s] ?? prettifySlug(s),
            link: "/internal/pages/" + s
          }))
        }] : []
      ];
      return [
        // Proposals under internal review. The list itself is API-driven, so only
        // the listing is linked here — it renders the individual pages.
        { text: "Internal proposals", link: "/internal/proposals/" },
        ...toolItems.length ? [{ text: "Tools", collapsed: false, items: toolItems }] : [],
        {
          text: "Published pages",
          collapsed: false,
          items: published.length ? published : [{ text: "<em>None yet</em>" }]
        },
        {
          text: "Drafts (this browser)",
          collapsed: false,
          items: draftItems.length ? draftItems : [{ text: "<em>None yet</em>" }]
        }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageHeader = __unplugin_components_0;
      const _component_EdHoverSidebar = __unplugin_components_23;
      const _component_router_view = resolveComponent("router-view");
      const _component_PageFooter = __unplugin_components_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-shell" }, _attrs))} data-v-2b14e459>`);
      _push(ssrRenderComponent(_component_PageHeader, null, null, _parent));
      _push(`<main class="app-shell__main" data-v-2b14e459>`);
      if (!ready.value || !unref(unlocked2)) {
        _push(`<div class="int-gate" data-v-2b14e459><form class="int-gate__card" data-v-2b14e459><div class="int-gate__eyebrow" data-v-2b14e459><span class="int-gate__dash" data-v-2b14e459></span> Internal </div><h1 class="int-gate__title" data-v-2b14e459>This area is password-protected</h1><p class="int-gate__lede" data-v-2b14e459> Enter the internal password to continue. Access lasts for this browser session. </p><label class="int-gate__label" for="int-pw" data-v-2b14e459>Password</label><input id="int-pw"${ssrRenderAttr("value", password.value)} type="password" class="${ssrRenderClass([{ "is-error": error.value }, "int-gate__input"])}" autocomplete="off" placeholder="••••••••" data-v-2b14e459>`);
        if (error.value) {
          _push(`<p class="int-gate__error" data-v-2b14e459>Incorrect password — try again.</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit" class="int-gate__btn" data-v-2b14e459>Unlock</button></form></div>`);
      } else {
        _push(`<!--[-->`);
        if (isPoliciesSection.value) {
          _push(ssrRenderComponent(_component_EdHoverSidebar, {
            items: unref(internalPolicySidebar),
            title: "Policies",
            "root-href": "/internal/policies/"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_EdHoverSidebar, {
            items: sidebarItems.value,
            title: "Internal",
            "root-href": "/internal/"
          }, null, _parent));
        }
        if (isContentPage.value) {
          _push(`<div class="int-shell" data-v-2b14e459><header class="int-shell__head" data-v-2b14e459>`);
          if (isExamplePage.value) {
            _push(ssrRenderComponent(InternalDuplicate, { "source-page": "example" }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="int-shell__bar" data-v-2b14e459><div class="int-shell__eyebrow" data-v-2b14e459><span class="int-shell__dash" data-v-2b14e459></span> Internal · <code data-v-2b14e459>/internal/${ssrInterpolate(contentSlug.value)}</code></div><div class="int-shell__toggle" role="tablist" aria-label="View mode" data-v-2b14e459><button type="button" role="tab" class="${ssrRenderClass([{ "is-active": view.value === "markdown" }, "int-shell__toggle-btn"])}"${ssrRenderAttr("aria-selected", view.value === "markdown")} data-v-2b14e459> Markdown </button><button type="button" role="tab" class="${ssrRenderClass([{ "is-active": view.value === "preview" }, "int-shell__toggle-btn"])}"${ssrRenderAttr("aria-selected", view.value === "preview")} data-v-2b14e459> Preview </button></div></div></header>`);
          if (view.value === "preview") {
            _push(`<div class="internal-prose" data-v-2b14e459>`);
            _push(ssrRenderComponent(_component_router_view, null, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<pre class="int-shell__source" data-v-2b14e459><code data-v-2b14e459>${ssrInterpolate(rawSource.value)}</code></pre>`);
          }
          _push(`</div>`);
        } else {
          _push(ssrRenderComponent(_component_router_view, null, null, _parent));
        }
        _push(`<!--]-->`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(_component_PageFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/internal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __layout_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2b14e459"]]);
const layouts = {
  "default": __layout_0,
  "internal": __layout_1
};
function setupLayouts(routes2) {
  function deepSetupLayout(routes3, top = true) {
    return routes3.map((route) => {
      var _a, _b, _c, _d, _e, _f;
      if (((_a = route.children) == null ? void 0 : _a.length) > 0) {
        route.children = deepSetupLayout(route.children, false);
      }
      if (top) {
        const skipLayout = !route.component && ((_b = route.children) == null ? void 0 : _b.find((r) => {
          var _a2;
          return (r.path === "" || r.path === "/") && ((_a2 = r.meta) == null ? void 0 : _a2.isLayout);
        }));
        if (skipLayout) {
          return route;
        }
        if (((_c = route.meta) == null ? void 0 : _c.layout) !== false) {
          return {
            path: route.path,
            component: layouts[((_d = route.meta) == null ? void 0 : _d.layout) || "default"],
            children: route.path === "/" ? [route] : [{ ...route, path: "" }],
            meta: {
              isLayout: true
            }
          };
        }
      }
      if ((_e = route.meta) == null ? void 0 : _e.layout) {
        return {
          path: route.path,
          component: layouts[(_f = route.meta) == null ? void 0 : _f.layout],
          children: [{ ...route, path: "" }],
          meta: {
            isLayout: true
          }
        };
      }
      return route;
    });
  }
  return deepSetupLayout(routes2);
}
const SITE_URL = "https://nebras-open-finance.com";
const SITE_NAME = "UAE Open Finance";
const DEFAULT_DESCRIPTION = "Technical standards and documentation for UAE Open Finance — TPP standards, LFI integration via the API Hub, OpenAPI specifications, and consent, authentication and authorization flows.";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    const DEFAULT_OG_IMAGE = `${SITE_URL}/AlTareq.png`;
    const route = useRoute();
    const canonicalUrl = computed(() => SITE_URL + route.path);
    const pageTitle = computed(() => route.meta.title || "");
    const ogTitle = computed(() => route.meta.title || void 0);
    const pageDescription = computed(
      () => route.meta.description || DEFAULT_DESCRIPTION
    );
    const NOINDEX_RE = [
      /^\/_dev(\/|$)/,
      /^\/internal(\/|$)/,
      /(^|\/)_shared(\/|$)/
    ];
    const robotsDirective = computed(
      () => NOINDEX_RE.some((re) => re.test(route.path)) ? "noindex, nofollow" : void 0
    );
    useHead({
      title: pageTitle,
      titleTemplate: (title) => title ? `${title} | ${SITE_NAME}` : SITE_NAME,
      link: [{ rel: "canonical", href: canonicalUrl }],
      meta: [
        { name: "robots", content: robotsDirective },
        { name: "description", content: pageDescription },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:type", content: "website" },
        // og:title/twitter:title fall back to the per-page <title> when the page
        // declares one; when it doesn't, Unhead drops the tag and scrapers use the
        // bare <title>. Kept in sync with the route meta so share cards match the page.
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: pageDescription },
        { property: "og:image", content: DEFAULT_OG_IMAGE },
        { property: "og:image:alt", content: SITE_NAME },
        { property: "og:url", content: canonicalUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: pageDescription },
        { name: "twitter:image", content: DEFAULT_OG_IMAGE }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      _push(ssrRenderComponent(_component_router_view, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const routes = setupLayouts(routes$1);
const createApp = ViteSSG(_sfc_main, {
  routes,
  // Reset scroll on every navigation so a new page always opens at the top.
  // Honour the browser's saved position on back/forward, and jump to an
  // in-page anchor when the target has a hash.
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: 0 };
    return { top: 0 };
  }
}, ({ router, isClient }) => {
  if (!isClient) return;
  const recover = (path) => {
    const KEY = "chunk-reload-at";
    if (Date.now() - Number(sessionStorage.getItem(KEY) || 0) < 1e4) return;
    try {
      sessionStorage.setItem(KEY, String(Date.now()));
    } catch {
    }
    if (path) window.location.assign(path);
    else window.location.reload();
  };
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    recover();
  });
  router.onError((err, to) => {
    if (/dynamically imported module|module script failed|Failed to fetch/i.test((err == null ? void 0 : err.message) || "")) {
      recover(to == null ? void 0 : to.fullPath);
    }
  });
});
export {
  ARTICLE_KINDS as A,
  CURRENT_VERSION as C,
  FIELD_MAP_DIR as F,
  VERSIONS as V,
  _export_sfc as _,
  allEndpoints as a,
  block0 as b,
  useSelectedVersion as c,
  createApp,
  surfaceUrl as d,
  endpointUrl as e,
  internalPolicies as f,
  __unplugin_components_23 as g,
  useInternalPages as h,
  internalPolicyThemes as i,
  appPageSlugs as j,
  countByKind as k,
  loadApiLog as l,
  ARTICLE_KIND_LABELS as m,
  articles as n,
  ozoneConnectEndpoints as o,
  prettifySlug as p,
  __unplugin_components_0$2 as q,
  routes$1 as r,
  sectionUrl as s,
  committedSlugs as t,
  useRouteVersion as u,
  getEndpointBySlug as v,
  getSectionScope as w
};

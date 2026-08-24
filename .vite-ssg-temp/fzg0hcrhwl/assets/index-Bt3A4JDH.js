import { defineComponent, ref, onMounted, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const lfiOverageFees = ref([]);
    const activeLang = ref("node");
    onMounted(async () => {
      try {
        const res = await fetch("https://data.directory.openfinance.ae/participants");
        if (!res.ok) return;
        const data = await res.json();
        lfiOverageFees.value = extractOverageFees(data);
      } catch {
      }
    });
    function extractOverageFees(data) {
      var _a;
      const seen = /* @__PURE__ */ new Map();
      for (const org of data || []) {
        for (const server of org.AuthorisationServers || []) {
          const ds = (server.ApiResources || []).find(
            (r) => r.ApiFamilyType === "account-information"
          );
          if (!ds) continue;
          const name = server.CustomerFriendlyName || org.OrganisationName;
          if (!name || seen.has(name)) continue;
          const raw = (_a = ds.ApiMetadata) == null ? void 0 : _a.OverLimitFees;
          const aed = raw !== void 0 && raw !== null && String(raw).trim() !== "" ? Number(raw) : 0;
          const fils = Number.isFinite(aed) ? Math.round(aed * 100) : 0;
          seen.set(name, {
            name,
            logo: server.CustomerFriendlyLogoUri || "",
            fils,
            label: formatOverageRate(fils)
          });
        }
      }
      return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
    }
    function formatOverageRate(fils) {
      if (fils === 0) return "Free above threshold";
      if (fils < 100) return `${fils} fils per call`;
      const aed = (fils / 100).toFixed(2).replace(/\.?0+$/, "");
      return `${aed} AED per call`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-lfir" }, _attrs))} data-v-f75852b1><section class="ed-lfir-hero" data-v-f75852b1><div class="ed-lfir-hero__inner" data-v-f75852b1><div class="ed-lfir-hero__label" data-v-f75852b1><span class="ed-lfir-hero__label-dash" data-v-f75852b1></span> AlTareq · Per‑LFI overage rates </div><h1 class="ed-lfir-hero__title" data-v-f75852b1>Data‑sharing overage rates by LFI</h1><p class="ed-lfir-hero__sub" data-v-f75852b1> Above the free per‑customer, per‑day threshold each LFI sets its own per‑call rate for continued data‑sharing requests. The rates below are read live from the Open Finance directory (<code data-v-f75852b1>ApiMetadata.OverLimitFees</code>). LFIs that have not published a rate charge nothing above the threshold. </p><p class="ed-lfir-hero__back" data-v-f75852b1><a href="/pricing/" data-v-f75852b1>← Back to pricing</a></p></div></section><section class="ed-lfir-section" data-v-f75852b1><div class="ed-lfir-section__inner" data-v-f75852b1>`);
      if (unref(lfiOverageFees).length === 0) {
        _push(`<div class="ed-lfir-empty" data-v-f75852b1> Loading rates from the directory… </div>`);
      } else {
        _push(`<div class="ed-lfir-table" data-v-f75852b1><div class="ed-lfir-table__head" data-v-f75852b1><span data-v-f75852b1>Institution</span><span data-v-f75852b1>Rate per call above threshold</span></div><!--[-->`);
        ssrRenderList(unref(lfiOverageFees), (lfi) => {
          _push(`<div class="ed-lfir-table__row" data-v-f75852b1><span class="ed-lfir-table__name" data-v-f75852b1>`);
          if (lfi.logo) {
            _push(`<img${ssrRenderAttr("src", lfi.logo)} alt="" class="ed-lfir-table__logo" loading="lazy" data-v-f75852b1>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(lfi.name)}</span><span class="${ssrRenderClass([{ "is-free": lfi.fils === 0 }, "ed-lfir-table__rate"])}" data-v-f75852b1>${ssrInterpolate(lfi.label)}</span></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></section><section class="ed-lfir-howto" data-v-f75852b1><div class="ed-lfir-howto__inner" data-v-f75852b1><div class="ed-lfir-howto__label" data-v-f75852b1><span class="ed-lfir-hero__label-dash" data-v-f75852b1></span> Pull this yourself </div><h2 class="ed-lfir-howto__title" data-v-f75852b1>Reading overage rates from the directory</h2><p class="ed-lfir-howto__lede" data-v-f75852b1> The rates above come from <code data-v-f75852b1>ApiMetadata.OverLimitFees</code> on each LFI’s <code data-v-f75852b1>account-information</code> API resource, returned by the directory’s <code data-v-f75852b1>/participants</code> endpoint. One call gives you the rate for every LFI. </p><h3 class="ed-lfir-howto__sub" data-v-f75852b1>Endpoint</h3><ul class="ed-lfir-howto__list" data-v-f75852b1><li data-v-f75852b1><span class="ed-lfir-howto__tag" data-v-f75852b1>Production</span><code data-v-f75852b1>GET https://data.directory.openfinance.ae/participants</code></li><li data-v-f75852b1><span class="ed-lfir-howto__tag" data-v-f75852b1>Sandbox</span><code data-v-f75852b1>GET https://data.sandbox.directory.openfinance.ae/participants</code></li></ul><h3 class="ed-lfir-howto__sub" data-v-f75852b1>Where the value lives</h3><pre class="ed-lfir-howto__code" data-v-f75852b1><code data-v-f75852b1>participants[]
  .AuthorisationServers[]
    .ApiResources[]                        // ApiFamilyType === &quot;account-information&quot;
      .ApiMetadata.OverLimitFees           // string in AED, e.g. &quot;0.50&quot;
                                           // missing or empty → 0 (free above threshold)</code></pre><h3 class="ed-lfir-howto__sub" data-v-f75852b1>Reading the rate</h3><div class="ed-lfir-howto__tabs" role="tablist" data-v-f75852b1><button type="button" role="tab" class="${ssrRenderClass(["ed-lfir-howto__tab", { "is-active": unref(activeLang) === "node" }])}"${ssrRenderAttr("aria-selected", unref(activeLang) === "node")} data-v-f75852b1>Node.js</button><button type="button" role="tab" class="${ssrRenderClass(["ed-lfir-howto__tab", { "is-active": unref(activeLang) === "python" }])}"${ssrRenderAttr("aria-selected", unref(activeLang) === "python")} data-v-f75852b1>Python</button></div><pre class="ed-lfir-howto__code ed-lfir-howto__code--tabbed" style="${ssrRenderStyle(unref(activeLang) === "node" ? null : { display: "none" })}" data-v-f75852b1><code data-v-f75852b1>const res = await fetch(&#39;https://data.directory.openfinance.ae/participants&#39;)
const participants = await res.json()

const rates = []
for (const org of participants) {
  for (const server of org.AuthorisationServers || []) {
    const ds = (server.ApiResources || [])
      .find(r =&gt; r.ApiFamilyType === &#39;account-information&#39;)
    if (!ds) continue

    const raw = ds.ApiMetadata?.OverLimitFees
    const aedPerCall = raw &amp;&amp; String(raw).trim() !== &#39;&#39; ? Number(raw) : 0

    rates.push({
      server: server.CustomerFriendlyName || org.OrganisationName,
      aedPerCall,
    })
  }
}</code></pre><pre class="ed-lfir-howto__code ed-lfir-howto__code--tabbed" style="${ssrRenderStyle(unref(activeLang) === "python" ? null : { display: "none" })}" data-v-f75852b1><code data-v-f75852b1>import requests

resp = requests.get(&#39;https://data.directory.openfinance.ae/participants&#39;)
participants = resp.json()

rates = []
for org in participants:
    for server in org.get(&#39;AuthorisationServers&#39;) or []:
        ds = next(
            (r for r in (server.get(&#39;ApiResources&#39;) or [])
             if r.get(&#39;ApiFamilyType&#39;) == &#39;account-information&#39;),
            None,
        )
        if not ds:
            continue

        raw = (ds.get(&#39;ApiMetadata&#39;) or {}).get(&#39;OverLimitFees&#39;)
        aed_per_call = float(raw) if raw and str(raw).strip() != &#39;&#39; else 0

        rates.append({
            &#39;server&#39;: server.get(&#39;CustomerFriendlyName&#39;) or org.get(&#39;OrganisationName&#39;),
            &#39;aed_per_call&#39;: aed_per_call,
        })</code></pre><p class="ed-lfir-howto__note" data-v-f75852b1> Cache the response. The directory is the source of truth, but rates change rarely — refreshing daily is plenty. </p></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/pricing/lfi-rates/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f75852b1"]]);
export {
  index as default
};

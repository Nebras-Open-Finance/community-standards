import { computed, shallowRef, ref, onMounted, watch, toValue, defineComponent, mergeProps, unref, useSSRContext, withCtx, createVNode, openBlock, createBlock, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { F as FIELD_MAP_DIR, _ as _export_sfc, u as useRouteVersion } from "../main.mjs";
import { _ as __unplugin_components_0$2 } from "./EndpointPage-BtLubFvo.js";
const TRANSFORM_LABELS = {
  identity: "same",
  "case-only": "case-only",
  renamed: "renamed",
  hoisted: "restructured"
};
function mappingLabelOf(record) {
  if (record.transform === "no-ozone-counterpart") return "hub-generated";
  if (!record.ozonePath || !record.standardsPath) return "unmapped";
  if (wasFetchedButAbsent(record)) return "unmapped";
  if (samePathIgnoringArrays(record.ozonePath, record.standardsPath)) {
    return record.ozonePath === record.standardsPath ? "same" : "case-only";
  }
  return TRANSFORM_LABELS[record.transform] ?? "mapped";
}
function samePathIgnoringArrays(ozone, standards) {
  const normalise = (path) => path.split("[]").join("").toLowerCase();
  return normalise(ozone) === normalise(standards);
}
function mappingBlurbOf(record) {
  if (mappingLabelOf(record) === "unmapped" && wasFetchedButAbsent(record)) {
    return NOT_OBSERVED_NOTE;
  }
  return MAPPING_LABEL_META[mappingLabelOf(record)].blurb;
}
const MAPPING_LABEL_META = {
  same: {
    text: "Same name",
    blurb: "The field keeps its name and position on both sides."
  },
  "case-only": {
    text: "Case only",
    blurb: "Same path, same name — only the casing convention changes: camelCase on Ozone Connect, PascalCase on Standards."
  },
  renamed: {
    text: "Renamed",
    blurb: "The API Hub returns the same value under a different field name, confirmed by matching the value across the boundary."
  },
  restructured: {
    text: "Restructured",
    blurb: "The value survives but moves in the shape — the Hub nests, flattens, or re-parents it."
  },
  "hub-generated": {
    text: "Hub-generated",
    blurb: "The endpoint has no Ozone Connect equivalent at all — the API Hub serves it."
  },
  mapped: {
    text: "Mapped",
    blurb: "Paired across the boundary. The map does not describe how the two differ."
  },
  unmapped: {
    text: "Unmapped",
    blurb: "Nothing is known to cross the boundary here — the field exists on one side only, or the live run fetched the resource and it was absent from the payload. Do not assume the value reaches the other side."
  }
};
function wasFetchedButAbsent(record) {
  return record.verified === "not-observed";
}
const NOT_OBSERVED_NOTE = "The verification run fetched this resource and this field was absent from the payload. The schemas pair on both sides — either the LFI does not populate it, or the Hub does not forward it. Which of those has not been established.";
const PERMISSION_SOURCE_META = {
  observed: {
    text: "Observed",
    blurb: "Established empirically: a consent was authorised carrying exactly these permissions, the resource fetched, and the returned fields recorded. The specifications do not contain this."
  },
  "spec-endpoint": {
    text: "Endpoint-declared",
    blurb: "The endpoint's declared permissions, inherited by every field on it because nothing finer exists in the spec. Treat as at most what the field needs, not a measurement."
  },
  "none-declared": {
    text: "None declared",
    blurb: "The endpoint declares no permissions — open data, or a consent resource."
  }
};
function permissionSourceMeta(source) {
  return PERMISSION_SOURCE_META[source] ?? { text: source, blurb: "Unrecognised permission provenance." };
}
const RESOURCE_PAGES = {
  "/accounts": {
    lfi: "/banking/data-sharing/open-api/accounts",
    tpp: "/banking/data-sharing/open-api/accounts"
  },
  "/accounts/{}": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId"
  },
  "/accounts/{}/balances": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-balances",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-balances"
  },
  "/accounts/{}/beneficiaries": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-beneficiaries"
  },
  "/accounts/{}/direct-debits": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-direct-debits",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-direct-debits"
  },
  "/accounts/{}/products": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-products",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-product"
  },
  "/accounts/{}/scheduled-payments": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-scheduled-payments"
  },
  "/accounts/{}/standing-orders": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-standing-orders",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-standing-orders"
  },
  "/accounts/{}/transactions": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-transactions",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-transactions"
  },
  "/accounts/{}/customer": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-customer",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-parties"
  },
  "/accounts/{}/statements": {
    lfi: "/banking/data-sharing/open-api/accounts-AccountId-statements",
    tpp: "/banking/data-sharing/open-api/accounts-AccountId-statements"
  },
  "/customer": {
    lfi: "/banking/data-sharing/open-api/customer",
    tpp: "/banking/data-sharing/open-api/parties"
  },
  "/payment-consents/{}/refund": {
    lfi: "/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
    tpp: "/banking/service-initiation/open-api/payment-consents-ConsentId-refund"
  },
  "/products": {
    lfi: "/banking/products-and-leads/open-api/products",
    tpp: "/banking/products-leads/open-api/products"
  },
  "/leads": {
    lfi: "/banking/products-and-leads/open-api/leads",
    tpp: "/banking/products-leads/open-api/leads"
  },
  "/atm": {
    lfi: "/banking/atms/open-api/atm",
    tpp: "/banking/atms/open-api/atms"
  }
};
function resourceLinks(resource, version) {
  const pages = RESOURCE_PAGES[resource];
  if (!pages) return { lfi: null, tpp: null };
  return {
    lfi: pages.lfi ? `/tech/lfi-api-hub/${version}${pages.lfi}` : null,
    tpp: pages.tpp ? `/tech/tpp-standards/${version}${pages.tpp}` : null
  };
}
const cache = /* @__PURE__ */ new Map();
function loadJson(path) {
  const existing = cache.get(path);
  if (existing) return existing;
  const request = fetch(path).then(async (res) => {
    if (!res.ok) throw new Error(`${path}: ${res.status}`);
    const body = await res.text();
    if (body.trimStart().startsWith("<")) {
      throw new Error(`${path} is not on this server — it needs a rebuild or redeploy`);
    }
    return JSON.parse(body);
  }).catch((err) => {
    cache.delete(path);
    throw err;
  });
  cache.set(path, request);
  return request;
}
function loadFieldMapIndex(version) {
  return loadJson(`/api/${FIELD_MAP_DIR[version]}/index.json`);
}
function loadFieldMapResource(version, slug) {
  return loadJson(`/api/${FIELD_MAP_DIR[version]}/resources/${slug}.json`);
}
function useAsync(load, deps) {
  const data = shallowRef(null);
  const loading = ref(true);
  const error = ref(null);
  function run() {
    const token = deps();
    loading.value = true;
    error.value = null;
    load().then((value) => {
      if (deps() !== token) return;
      data.value = value;
    }).catch((err) => {
      error.value = err instanceof Error ? err.message : String(err);
    }).finally(() => {
      loading.value = false;
    });
  }
  onMounted(run);
  watch(deps, run);
  return { data, loading, error };
}
function useFieldMapIndex(version) {
  const { data, loading, error } = useAsync(
    () => loadFieldMapIndex(toValue(version)),
    () => toValue(version)
  );
  const endpoints = computed(
    () => {
      var _a, _b;
      return Array.isArray((_a = data.value) == null ? void 0 : _a.endpoints) ? (_b = data.value) == null ? void 0 : _b.endpoints : [];
    }
  );
  return { index: data, endpoints, loading, error };
}
function useFieldMapResource(version, slug) {
  const { data, loading, error } = useAsync(
    () => loadFieldMapResource(toValue(version), toValue(slug)),
    () => `${toValue(version)}::${toValue(slug)}`
  );
  const records = computed(
    () => {
      var _a, _b;
      return Array.isArray((_a = data.value) == null ? void 0 : _a.records) ? (_b = data.value) == null ? void 0 : _b.records : [];
    }
  );
  return { file: data, records, loading, error };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FieldMapTable",
  __ssrInlineRender: true,
  props: {
    rows: {},
    showPermissions: { type: Boolean }
  },
  setup(__props) {
    function typeOf(row) {
      const parts = [row.standardsType ?? row.ozoneType ?? "—"];
      if (row.standardsFormat) parts.push(row.standardsFormat);
      return parts.join(" · ");
    }
    function enumTitle(row) {
      var _a;
      if (!((_a = row.enum) == null ? void 0 : _a.length)) return void 0;
      return `Allowed values: ${row.enum.join(", ")}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fm-table" }, _attrs))} data-v-bf57a77d><div class="fm-table__scroll" data-v-bf57a77d><table data-v-bf57a77d><thead data-v-bf57a77d><tr data-v-bf57a77d><th data-v-bf57a77d>Ozone Connect</th><th data-v-bf57a77d>Standards</th><th data-v-bf57a77d>Type</th><th data-v-bf57a77d>Mapping</th>`);
      if (__props.showPermissions) {
        _push(`<th data-v-bf57a77d>Permissions</th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody data-v-bf57a77d><!--[-->`);
      ssrRenderList(__props.rows, (row, i) => {
        var _a;
        _push(`<tr data-v-bf57a77d><td class="fm-table__path" data-v-bf57a77d>`);
        if (row.ozonePath) {
          _push(`<code data-v-bf57a77d>${ssrInterpolate(row.ozonePath)}</code>`);
        } else {
          _push(`<span class="fm-table__none" title="No Ozone Connect source — the API Hub adds this field" data-v-bf57a77d>—</span>`);
        }
        _push(`</td><td class="fm-table__path" data-v-bf57a77d>`);
        if (row.standardsPath) {
          _push(`<code data-v-bf57a77d>${ssrInterpolate(row.standardsPath)}</code>`);
        } else {
          _push(`<span class="fm-table__none" title="Not paired with a Standards field" data-v-bf57a77d>—</span>`);
        }
        if (row.required) {
          _push(`<span class="fm-table__req" title="Required in the Standards schema" data-v-bf57a77d>required</span>`);
        } else {
          _push(`<!---->`);
        }
        if (row.variant) {
          _push(`<span class="fm-table__variant"${ssrRenderAttr("title", `Only present in schema variant ${row.variant}`)} data-v-bf57a77d>${ssrInterpolate(row.variant)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td class="fm-table__type" data-v-bf57a77d><span${ssrRenderAttr("title", enumTitle(row))} class="${ssrRenderClass({ "fm-table__has-enum": (_a = row.enum) == null ? void 0 : _a.length })}" data-v-bf57a77d>${ssrInterpolate(typeOf(row))}</span></td><td data-v-bf57a77d><span class="${ssrRenderClass([`fm-chip--${unref(mappingLabelOf)(row)}`, "fm-chip"])}"${ssrRenderAttr("title", unref(mappingBlurbOf)(row))} data-v-bf57a77d>${ssrInterpolate(unref(MAPPING_LABEL_META)[unref(mappingLabelOf)(row)].text)}</span></td>`);
        if (__props.showPermissions) {
          _push(`<td class="fm-table__perms" data-v-bf57a77d>`);
          if (row.permissions.length) {
            _push(`<!--[-->`);
            ssrRenderList(row.permissions, (perm) => {
              _push(`<span class="${ssrRenderClass([`fm-perm--${row.permissionSource}`, "fm-perm"])}"${ssrRenderAttr("title", unref(permissionSourceMeta)(row.permissionSource).blurb)} data-v-bf57a77d>${ssrInterpolate(perm)}</span>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<span class="fm-table__none" title="Not permission-gated" data-v-bf57a77d>—</span>`);
          }
          _push(`</td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/field-map/FieldMapTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bf57a77d"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FieldMapExplorer",
  __ssrInlineRender: true,
  props: {
    slug: {}
  },
  setup(__props) {
    const props = __props;
    const { docsVersion } = useRouteVersion();
    const { records, loading, error } = useFieldMapResource(docsVersion, () => props.slug);
    const { endpoints } = useFieldMapIndex(docsVersion);
    const endpoint = computed(() => endpoints.value.find((e) => e.slug === props.slug));
    const ENVELOPE_STANDARDS = /^(\[\]\.)?(Links|Meta)(\.|$)/;
    const ENVELOPE_OZONE = /^(\[\]\.)?(links|meta)(\.|$)/;
    function isEnvelope(record) {
      return ENVELOPE_STANDARDS.test(record.standardsPath ?? "") || ENVELOPE_OZONE.test(record.ozonePath ?? "");
    }
    const rows = computed(() => records.value.filter((r) => !isEnvelope(r)));
    const showPermissions = computed(() => rows.value.some((r) => r.permissions.length > 0));
    const permissionSets = computed(() => {
      var _a, _b;
      const sets = ((_a = endpoint.value) == null ? void 0 : _a.permissionSets) ?? {};
      const observed = (((_b = endpoint.value) == null ? void 0 : _b.observedPermissions) ?? 0) > 0;
      return Object.entries(sets).map(([key, count]) => ({ key, count, observed }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FieldMapTable = __unplugin_components_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fm" }, _attrs))} data-v-04cb160a>`);
      if (unref(loading) && !unref(records).length) {
        _push(`<p class="fm__status" data-v-04cb160a>Loading the field map…</p>`);
      } else if (unref(error)) {
        _push(`<p class="fm__status fm__status--error" data-v-04cb160a> The field map could not be loaded (${ssrInterpolate(unref(error))}). Reload the page to try again. </p>`);
      } else {
        _push(`<!---->`);
      }
      if (rows.value.length) {
        _push(`<!--[--><div class="fm__bar" data-v-04cb160a>`);
        if (permissionSets.value.length) {
          _push(`<div class="fm__perm-sets" data-v-04cb160a><span class="fm__perm-sets-label" data-v-04cb160a>Fields per permission set</span><!--[-->`);
          ssrRenderList(permissionSets.value, (set) => {
            _push(`<span class="${ssrRenderClass([{ "fm__perm-set--observed": set.observed }, "fm__perm-set"])}"${ssrRenderAttr("title", set.observed ? "Measured: a consent carrying exactly these permissions returned this many fields in the verification run." : "Not measured: the endpoint declares these permissions, and this is how many Standards fields the specification defines for it.")} data-v-04cb160a>${ssrInterpolate(set.key)} <strong data-v-04cb160a>${ssrInterpolate(set.count)}</strong>`);
            if (!set.observed) {
              _push(`<em data-v-04cb160a>declared</em>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (showPermissions.value) {
          _push(`<p class="fm__enforcement" data-v-04cb160a><strong data-v-04cb160a>The API Hub applies these permissions before the TPP sees the response.</strong> Your Ozone Connect endpoint can return the full payload for the account it was asked about, and the Hub removes whatever the consent does not permit. You may apply the same filtering yourself if you prefer, but nothing requires it — the Hub enforces the consent either way. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_FieldMapTable, {
          rows: rows.value,
          "show-permissions": showPermissions.value
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/field-map/FieldMapExplorer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-04cb160a"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FieldMapEndpointPage",
  __ssrInlineRender: true,
  props: {
    resource: {},
    slug: {},
    eyebrow: {},
    title: {},
    method: {},
    path: {},
    ozone: {},
    standards: {},
    version: {}
  },
  setup(__props) {
    const props = __props;
    const { docsVersion } = useRouteVersion();
    const links = computed(() => resourceLinks(props.resource, docsVersion.value));
    const description = computed(
      () => `Field mapping for ${props.method} ${props.path}: every Ozone Connect field the LFI returns, the field the TPP receives for it in ${props.standards}, and the consent permission that exposes it. UAE Open Finance ${props.version}.`
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_EndpointPage = __unplugin_components_0$2;
      const _component_FieldMapExplorer = __unplugin_components_1;
      _push(ssrRenderComponent(_component_EndpointPage, mergeProps({
        eyebrow: __props.eyebrow,
        title: __props.title,
        version: __props.version,
        method: __props.method,
        path: __props.path,
        description: description.value
      }, _attrs), {
        hero: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="fmp-pair" data-v-590c0219${_scopeId}><div class="fmp-pair__side" data-v-590c0219${_scopeId}><span class="fmp-pair__label" data-v-590c0219${_scopeId}>Ozone Connect</span>`);
            if (__props.ozone && links.value.lfi) {
              _push2(`<a${ssrRenderAttr("href", links.value.lfi)} data-v-590c0219${_scopeId}><code data-v-590c0219${_scopeId}>${ssrInterpolate(__props.ozone)}</code></a>`);
            } else if (__props.ozone) {
              _push2(`<code data-v-590c0219${_scopeId}>${ssrInterpolate(__props.ozone)}</code>`);
            } else {
              _push2(`<span class="fmp-pair__none" data-v-590c0219${_scopeId}>Served by the API Hub</span>`);
            }
            _push2(`</div><span class="fmp-pair__arrow" aria-hidden="true" data-v-590c0219${_scopeId}>→</span><div class="fmp-pair__side" data-v-590c0219${_scopeId}><span class="fmp-pair__label" data-v-590c0219${_scopeId}>Standards</span>`);
            if (links.value.tpp) {
              _push2(`<a${ssrRenderAttr("href", links.value.tpp)} data-v-590c0219${_scopeId}><code data-v-590c0219${_scopeId}>${ssrInterpolate(__props.standards)}</code></a>`);
            } else {
              _push2(`<code data-v-590c0219${_scopeId}>${ssrInterpolate(__props.standards)}</code>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "fmp-pair" }, [
                createVNode("div", { class: "fmp-pair__side" }, [
                  createVNode("span", { class: "fmp-pair__label" }, "Ozone Connect"),
                  __props.ozone && links.value.lfi ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: links.value.lfi
                  }, [
                    createVNode("code", null, toDisplayString(__props.ozone), 1)
                  ], 8, ["href"])) : __props.ozone ? (openBlock(), createBlock("code", { key: 1 }, toDisplayString(__props.ozone), 1)) : (openBlock(), createBlock("span", {
                    key: 2,
                    class: "fmp-pair__none"
                  }, "Served by the API Hub"))
                ]),
                createVNode("span", {
                  class: "fmp-pair__arrow",
                  "aria-hidden": "true"
                }, "→"),
                createVNode("div", { class: "fmp-pair__side" }, [
                  createVNode("span", { class: "fmp-pair__label" }, "Standards"),
                  links.value.tpp ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: links.value.tpp
                  }, [
                    createVNode("code", null, toDisplayString(__props.standards), 1)
                  ], 8, ["href"])) : (openBlock(), createBlock("code", { key: 1 }, toDisplayString(__props.standards), 1))
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_FieldMapExplorer, { slug: __props.slug }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_FieldMapExplorer, { slug: __props.slug }, null, 8, ["slug"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/field-map/FieldMapEndpointPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-590c0219"]]);
export {
  __unplugin_components_0 as _
};

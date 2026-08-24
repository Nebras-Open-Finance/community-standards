import { defineComponent, computed, ref, onMounted, reactive, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { u as useUrlSearchParam } from "./useUrlSearchParam-CAJ_AAT-.js";
import { l as loadApiLog, _ as _export_sfc, b as block0 } from "../main.mjs";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const DAYS_WINDOW = 30;
const GO_LIVE_PROFILE_TYPE = "Commercial Go-Live Approval";
const INSURANCE_GENERAL_KEY = "general";
const INSURANCE_GENERAL_LABEL = "Consents";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "whats-live",
  __ssrInlineRender: true,
  setup(__props) {
    const FAMILY_KEYS = [
      "account-information",
      "payment",
      "confirmation",
      "product",
      "atm",
      "insurance"
    ];
    const BANKING_FAMILIES = [
      "account-information",
      "payment",
      "confirmation",
      "product",
      "atm"
    ];
    const INSURANCE_TYPES = ["health", "motor", "travel", "home"];
    const INSURANCE_TYPE_LABELS = {
      health: "Health",
      motor: "Motor",
      travel: "Travel",
      home: "Home"
    };
    const FAMILY_LABELS = {
      "all": "All services",
      "account-information": "Account Information",
      "payment": "Payment Initiation",
      "confirmation": "Confirmation of Payee",
      "product": "Products & Leads",
      "atm": "ATMs",
      "insurance": "Insurance"
    };
    const FAMILY_URL_PREFIX = {
      "account-information": "account-information",
      "payment": "payment",
      "confirmation": "confirmation-of-payee",
      "product": "product",
      "atm": "atm",
      "insurance": "insurance"
    };
    const ENDPOINT_ORDER = {
      "account-information": [
        "/accounts",
        "/accounts/{AccountId}",
        "/accounts/{AccountId}/balances",
        "/accounts/{AccountId}/beneficiaries",
        "/accounts/{AccountId}/direct-debits",
        "/parties",
        "/accounts/{AccountId}/parties",
        "/accounts/{AccountId}/products",
        "/accounts/{AccountId}/scheduled-payments",
        "/accounts/{AccountId}/standing-orders",
        "/accounts/{AccountId}/statements",
        "/accounts/{AccountId}/transactions"
      ],
      "payment": [
        "/payments",
        "/payments/{PaymentId}",
        "/payment-consents/{ConsentId}/refund"
      ],
      "confirmation": [
        "/discovery",
        "/confirmation"
      ],
      "product": [
        "/products",
        "/leads"
      ],
      "atm": [
        "/atms"
      ],
      "insurance": [
        "/insurance-consents",
        "/insurance-consents/{ConsentId}",
        "/health-insurance-policies",
        "/health-insurance-policies/{InsurancePolicyId}",
        "/health-insurance-policies/{InsurancePolicyId}/payment-details",
        "/health-insurance-quotes",
        "/health-insurance-quotes/{QuoteId}",
        "/motor-insurance-policies",
        "/motor-insurance-policies/{InsurancePolicyId}",
        "/motor-insurance-policies/{InsurancePolicyId}/payment-details",
        "/motor-insurance-quotes",
        "/motor-insurance-quotes/{QuoteId}",
        "/travel-insurance-policies",
        "/travel-insurance-policies/{InsurancePolicyId}",
        "/travel-insurance-policies/{InsurancePolicyId}/payment-details",
        "/travel-insurance-quotes",
        "/travel-insurance-quotes/{QuoteId}",
        "/home-insurance-policies",
        "/home-insurance-policies/{InsurancePolicyId}",
        "/home-insurance-policies/{InsurancePolicyId}/payment-details",
        "/home-insurance-quotes",
        "/home-insurance-quotes/{QuoteId}"
      ]
    };
    const MODE_OPTIONS = ["lfi-bank", "lfi-insurer", "tpp"];
    const FAMILY_OPTIONS = [
      "all",
      ...FAMILY_KEYS,
      ...INSURANCE_TYPES
    ];
    const modeParam = useUrlSearchParam("type", "lfi-bank", { allowed: MODE_OPTIONS });
    const familyParam = useUrlSearchParam("family", "all", { allowed: FAMILY_OPTIONS });
    const mode = modeParam.value;
    const family = familyParam.value;
    const isLfi = computed(() => mode.value !== "tpp");
    const filterChips = computed(() => {
      if (mode.value === "lfi-insurer")
        return INSURANCE_TYPES.map((t) => ({ key: t, label: INSURANCE_TYPE_LABELS[t] }));
      const keys = mode.value === "lfi-bank" ? BANKING_FAMILIES : FAMILY_KEYS;
      return keys.map((k) => ({ key: k, label: FAMILY_LABELS[k] }));
    });
    function filterLabel(f) {
      if (f === "all") return FAMILY_LABELS.all;
      if (INSURANCE_TYPES.includes(f))
        return INSURANCE_TYPE_LABELS[f];
      return FAMILY_LABELS[f];
    }
    const activeInsuranceType = computed(
      () => INSURANCE_TYPES.includes(family.value) ? family.value : null
    );
    const loading = ref(true);
    const error = ref(null);
    const processedLfis = ref([]);
    const apiLog = ref([]);
    const paymentsLog = ref([]);
    onMounted(async () => {
      try {
        const [lfiRes, apiRes, payRes] = await Promise.all([
          fetch("https://data.directory.openfinance.ae/participants").then(
            (r) => r.json()
          ),
          loadApiLog().catch(() => []),
          fetch("/api/payments-log.json").then((r) => r.json()).catch(() => [])
        ]);
        processedLfis.value = processLfis(lfiRes);
        apiLog.value = Array.isArray(apiRes) ? apiRes : [];
        paymentsLog.value = Array.isArray(payRes) ? payRes : [];
      } catch (e) {
        error.value = e instanceof Error ? e.message : String(e);
      } finally {
        loading.value = false;
      }
    });
    const expandedTppServices = reactive(/* @__PURE__ */ new Set());
    function isTppServiceExpanded(tppName, familyKey) {
      return expandedTppServices.has(`${tppName}|${familyKey}`);
    }
    function processLfis(data) {
      var _a, _b, _c, _d, _e;
      const out = [];
      const orgs = Array.isArray(data) ? data : [];
      for (const org of orgs) {
        if (!((_a = org.AuthorisationServers) == null ? void 0 : _a.length)) continue;
        for (const server of org.AuthorisationServers) {
          const serviceMap = /* @__PURE__ */ new Map();
          for (const resource of server.ApiResources || []) {
            const key = resource.ApiFamilyType;
            if (!key || !FAMILY_KEYS.includes(key)) continue;
            const familyKey = key;
            if (!serviceMap.has(familyKey)) serviceMap.set(familyKey, []);
            const rawEndpoints = ((_b = resource.ApiDiscoveryEndpoints) == null ? void 0 : _b.map((ep) => ep.ApiEndpoint || "")) || [];
            const normalized = rawEndpoints.map((url) => normalizeEndpoint(url, resource.ApiVersion)).filter((p, i, arr) => arr.indexOf(p) === i);
            const sortedEndpoints = sortEndpoints(familyKey, normalized);
            serviceMap.get(familyKey).push({
              version: resource.ApiVersion || "",
              endpoints: sortedEndpoints,
              paymentTypes: familyKey === "payment" ? getPaymentTypes(resource.ApiMetadata) : [],
              accountSubTypes: familyKey === "account-information" ? ((_c = resource.ApiMetadata) == null ? void 0 : _c.AccountSubType) || [] : [],
              overLimitFees: familyKey === "account-information" ? formatOverLimitFees((_d = resource.ApiMetadata) == null ? void 0 : _d.OverLimitFees) : "",
              insuranceTypes: familyKey === "insurance" ? insuranceTypesOf(sortedEndpoints) : [],
              insuranceGroups: familyKey === "insurance" ? buildInsuranceGroups(sortedEndpoints) : [],
              expanded: false
            });
          }
          if (serviceMap.size === 0) continue;
          const goLive = goLiveOf(server);
          const services = [];
          for (const [familyKey, versions] of serviceMap) {
            services.push({
              familyKey,
              label: FAMILY_LABELS[familyKey],
              versions: versions.sort((a, b) => a.version.localeCompare(b.version)),
              expanded: false
            });
          }
          services.sort((a, b) => a.label.localeCompare(b.label));
          out.push({
            key: `${org.OrganisationId || org.OrganisationName || ""}::${server.AuthorisationServerId || server.CustomerFriendlyName || ""}`,
            name: server.CustomerFriendlyName || org.OrganisationName || "",
            logo: server.CustomerFriendlyLogoUri || "https://data.directory.openfinance.ae/logos/placeholder-logo.png",
            accountTypes: ((_e = server.Flags) == null ? void 0 : _e.AccountType) || [],
            services,
            goLiveDate: (goLive == null ? void 0 : goLive.date) || null,
            goLiveScheduled: (goLive == null ? void 0 : goLive.scheduled) === true,
            isLive: !!goLive && !goLive.scheduled
          });
        }
      }
      return out;
    }
    function parseDirectoryDate(value) {
      const m = String(value || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (!m) return null;
      const d = new Date(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1])));
      return Number.isNaN(d.getTime()) ? null : d;
    }
    function goLiveOf(server) {
      const now = Date.now();
      let earliest = null;
      for (const cert of server.AuthorisationServerCertifications || []) {
        if (cert.ProfileType !== GO_LIVE_PROFILE_TYPE) continue;
        if ((cert.CertificationStatus || cert.Status || "") !== "Certified") continue;
        const start = parseDirectoryDate(cert.CertificationStartDate);
        if (!start) continue;
        const expiry = parseDirectoryDate(cert.CertificationExpirationDate);
        if (expiry && expiry.getTime() < now) continue;
        if (!earliest || start.getTime() < earliest.getTime()) earliest = start;
      }
      if (!earliest) return null;
      return { date: earliest, scheduled: earliest.getTime() > now };
    }
    const GO_LIVE_DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC"
    });
    function formatGoLive(d) {
      return d ? GO_LIVE_DATE_FORMAT.format(d) : "";
    }
    function normalizeEndpoint(url, version) {
      const s = String(url || "");
      if (version) {
        const marker = `/v${version}/`;
        const idx = s.indexOf(marker);
        if (idx >= 0) return "/" + s.slice(idx + marker.length);
      }
      const match = s.match(/\/v\d[\d.]*\/(.*)$/i);
      return match ? "/" + match[1] : s;
    }
    function sortEndpoints(familyKey, endpoints) {
      const order = ENDPOINT_ORDER[familyKey] || [];
      return [...endpoints].sort((a, b) => {
        const ai = order.indexOf(a);
        const bi = order.indexOf(b);
        if (ai === -1 && bi === -1) return a.localeCompare(b);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });
    }
    function insuranceTypeOf(endpoint) {
      const m = endpoint.match(/^\/(health|motor|travel|home)-insurance-/);
      return m ? m[1] : null;
    }
    function insuranceTypesOf(endpoints) {
      const present = /* @__PURE__ */ new Set();
      for (const ep of endpoints) {
        const t = insuranceTypeOf(ep);
        if (t) present.add(t);
      }
      return INSURANCE_TYPES.filter((t) => present.has(t));
    }
    function buildInsuranceGroups(endpoints) {
      const byType = /* @__PURE__ */ new Map();
      for (const ep of endpoints) {
        const key = insuranceTypeOf(ep) || INSURANCE_GENERAL_KEY;
        if (!byType.has(key)) byType.set(key, []);
        byType.get(key).push(ep);
      }
      const groups = [];
      for (const t of INSURANCE_TYPES) {
        if (byType.has(t))
          groups.push({ key: t, label: INSURANCE_TYPE_LABELS[t], endpoints: byType.get(t), expanded: false });
      }
      if (byType.has(INSURANCE_GENERAL_KEY))
        groups.push({
          key: INSURANCE_GENERAL_KEY,
          label: INSURANCE_GENERAL_LABEL,
          endpoints: byType.get(INSURANCE_GENERAL_KEY),
          expanded: false
        });
      return groups;
    }
    function formatOverLimitFees(v) {
      const s = (v || "").trim();
      return s === "" ? "0" : s;
    }
    function beneficiaryModes(m) {
      if (!m) return [];
      const modes = [];
      if (m.OpenBeneficiariesSupported) modes.push("Open");
      if (m.SingleBeneficiarySupported) modes.push("Single");
      if (m.MultipleBeneficiariesSupported) modes.push("Multiple");
      return modes;
    }
    function getPaymentTypes(meta) {
      var _a, _b, _c, _d, _e, _f;
      if (!meta) return [];
      const types = [];
      if ((_a = meta.SingleInstantPayment) == null ? void 0 : _a.Supported) types.push("Single Instant");
      if ((_b = meta.FixedOnDemand) == null ? void 0 : _b.Supported) types.push("Fixed On-Demand");
      if ((_c = meta.FixedPeriodicSchedule) == null ? void 0 : _c.Supported) types.push("Fixed Periodic");
      if ((_d = meta.FixedDefinedSchedule) == null ? void 0 : _d.Supported) types.push("Fixed Defined Schedule");
      const vod = beneficiaryModes(meta.VariableOnDemand);
      if (vod.length) types.push(`Variable On-Demand · ${vod.join(", ")}`);
      if ((_e = meta.VariablePeriodicSchedule) == null ? void 0 : _e.Supported) types.push("Variable Periodic");
      if ((_f = meta.VariableDefinedSchedule) == null ? void 0 : _f.Supported)
        types.push("Variable Defined Schedule");
      const dsca = beneficiaryModes(meta.DelegatedAuthentication);
      if (dsca.length) types.push(`Delegated SCA · ${dsca.join(", ")}`);
      return types;
    }
    function isBankingFamily(k) {
      return BANKING_FAMILIES.includes(k);
    }
    function serverHasBanking(s) {
      return s.services.some((svc) => isBankingFamily(svc.familyKey));
    }
    function serverInsuranceService(s) {
      return s.services.find((svc) => svc.familyKey === "insurance");
    }
    function serverInsuranceTypes(s) {
      const svc = serverInsuranceService(s);
      if (!svc) return [];
      const present = /* @__PURE__ */ new Set();
      for (const v of svc.versions) for (const t of v.insuranceTypes) present.add(t);
      return INSURANCE_TYPES.filter((t) => present.has(t));
    }
    const bankServers = computed(
      () => processedLfis.value.filter(serverHasBanking)
    );
    const insurerServers = computed(
      () => processedLfis.value.filter((s) => !!serverInsuranceService(s))
    );
    const visibleServers = computed(() => {
      if (mode.value === "lfi-insurer") {
        const t = activeInsuranceType.value;
        return insurerServers.value.filter(
          (s) => !t || serverInsuranceTypes(s).includes(t)
        );
      }
      if (mode.value === "lfi-bank") {
        return bankServers.value.filter(
          (s) => family.value === "all" || s.services.some((svc) => svc.familyKey === family.value)
        );
      }
      return [];
    });
    function visibleServices(server) {
      if (mode.value === "lfi-insurer") {
        const svc = serverInsuranceService(server);
        return svc ? [svc] : [];
      }
      const banking = server.services.filter((svc) => isBankingFamily(svc.familyKey));
      return family.value === "all" ? banking : banking.filter((svc) => svc.familyKey === family.value);
    }
    function visibleInsuranceGroups(v) {
      const t = activeInsuranceType.value;
      if (!t) return v.insuranceGroups;
      return v.insuranceGroups.filter(
        (g) => g.key === t || g.key === INSURANCE_GENERAL_KEY
      );
    }
    const lfiServerCount = computed(
      () => visibleServers.value.filter((s) => s.isLive).length
    );
    const bankServerCount = computed(
      () => bankServers.value.filter((s) => s.isLive).length
    );
    const insurerServerCount = computed(
      () => insurerServers.value.filter((s) => s.isLive).length
    );
    const sectorNoun = computed(
      () => mode.value === "lfi-insurer" ? "Insurers" : "Banks"
    );
    const serverGroups = computed(() => {
      const live = visibleServers.value.filter((s) => s.isLive).sort((a, b) => {
        var _a, _b;
        return (((_a = a.goLiveDate) == null ? void 0 : _a.getTime()) || 0) - (((_b = b.goLiveDate) == null ? void 0 : _b.getTime()) || 0);
      });
      const testing = visibleServers.value.filter((s) => !s.isLive).sort((a, b) => a.name.localeCompare(b.name));
      const groups = [];
      if (live.length)
        groups.push({
          key: "live",
          title: "Live",
          note: `${sectorNoun.value} holding a Commercial Go-Live Approval in the directory — fully live to all customers and all licensed, live TPPs.`,
          servers: live
        });
      if (testing.length)
        groups.push({
          key: "testing",
          title: "Production testing",
          note: `${sectorNoun.value} deployed and serving these APIs in the production environment, working towards Commercial Go-Live Approval. Not yet open to all customers and all TPPs.`,
          servers: testing
        });
      return groups;
    });
    const paymentOnly = computed(() => family.value === "payment");
    const filteredTpps = computed(
      () => paymentOnly.value ? processPayments(paymentsLog.value) : processApiLog(apiLog.value)
    );
    const tppCount = computed(() => filteredTpps.value.length);
    function processApiLog(data) {
      if (!Array.isArray(data) || data.length === 0) return [];
      const allowedPrefixes = family.value === "all" ? Object.values(FAMILY_URL_PREFIX) : [FAMILY_URL_PREFIX[family.value]].filter(Boolean);
      const latestMs = data.reduce((max, row) => {
        const t = Date.parse(row.date || "");
        return t > max ? t : max;
      }, 0);
      const cutoffMs = latestMs - (DAYS_WINDOW - 1) * 24 * 60 * 60 * 1e3;
      const tppMap = /* @__PURE__ */ new Map();
      for (const row of data) {
        if (!row.tppname || !row.tppname.trim()) continue;
        const ts = Date.parse(row.date || "");
        if (ts < cutoffMs) continue;
        const parts = (row.url || "").split("/");
        if (parts[0] !== "open-finance") continue;
        const urlFamily = parts[1] || "";
        const version = parts[2] || "";
        const endpointPath = "/" + parts.slice(3).join("/");
        if (!urlFamily || !allowedPrefixes.includes(urlFamily)) continue;
        const familyKey = Object.keys(FAMILY_URL_PREFIX).find(
          (k) => FAMILY_URL_PREFIX[k] === urlFamily
        );
        if (!familyKey) continue;
        if (!tppMap.has(row.tppname)) {
          tppMap.set(row.tppname, {
            name: row.tppname,
            familyVersions: /* @__PURE__ */ new Map(),
            lfis: /* @__PURE__ */ new Set(),
            totalRequests: 0
          });
        }
        const tpp = tppMap.get(row.tppname);
        if (row.lfinamekey) tpp.lfis.add(row.lfinamekey);
        tpp.totalRequests += row.totalapicalls || 0;
        if (!tpp.familyVersions.has(familyKey))
          tpp.familyVersions.set(familyKey, /* @__PURE__ */ new Map());
        const versions = tpp.familyVersions.get(familyKey);
        if (!versions.has(version)) {
          versions.set(version, { requests: 0, endpoints: /* @__PURE__ */ new Map() });
        }
        const ve = versions.get(version);
        ve.requests += row.totalapicalls || 0;
        const epKey = `${row.httpmethod || ""} ${endpointPath}`;
        ve.endpoints.set(epKey, (ve.endpoints.get(epKey) || 0) + (row.totalapicalls || 0));
      }
      return [...tppMap.values()].map((t) => ({
        name: t.name,
        lfis: [...t.lfis].sort(),
        totalRequests: t.totalRequests,
        totalPayments: 0,
        consentTypes: [],
        services: FAMILY_KEYS.filter((k) => t.familyVersions.has(k)).map(
          (k) => ({
            familyKey: k,
            label: FAMILY_LABELS[k],
            versions: [...t.familyVersions.get(k).entries()].map(([version, payload]) => ({
              version,
              requests: payload.requests,
              endpoints: sortTppEndpoints(
                k,
                [...payload.endpoints.entries()].map(([key, count]) => ({
                  key,
                  count
                }))
              ),
              expanded: false
            })).sort((a, b) => a.version.localeCompare(b.version)),
            expanded: false
          })
        )
      })).sort((a, b) => b.totalRequests - a.totalRequests);
    }
    function sortTppEndpoints(familyKey, endpoints) {
      const order = ENDPOINT_ORDER[familyKey] || [];
      return [...endpoints].sort((a, b) => {
        const aPath = a.key.split(" ").slice(1).join(" ");
        const bPath = b.key.split(" ").slice(1).join(" ");
        const ai = order.indexOf(aPath);
        const bi = order.indexOf(bPath);
        if (ai === -1 && bi === -1) return b.count - a.count;
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });
    }
    function processPayments(data) {
      if (!Array.isArray(data) || data.length === 0) return [];
      const latestMs = data.reduce((max, row) => {
        const t = Date.parse(row.date || "");
        return t > max ? t : max;
      }, 0);
      const cutoffMs = latestMs - (DAYS_WINDOW - 1) * 24 * 60 * 60 * 1e3;
      const tppMap = /* @__PURE__ */ new Map();
      for (const row of data) {
        if (!row.tppname || !row.tppname.trim()) continue;
        const ts = Date.parse(row.date || "");
        if (ts < cutoffMs) continue;
        const count = Number(row.count) || 0;
        if (!tppMap.has(row.tppname)) {
          tppMap.set(row.tppname, {
            name: row.tppname,
            lfis: /* @__PURE__ */ new Set(),
            consentTypes: /* @__PURE__ */ new Map(),
            totalPayments: 0
          });
        }
        const tpp = tppMap.get(row.tppname);
        if (row.lfinamekey) tpp.lfis.add(row.lfinamekey);
        tpp.totalPayments += count;
        const type = row.paymentconsenttype || "Unknown";
        tpp.consentTypes.set(type, (tpp.consentTypes.get(type) || 0) + count);
      }
      return [...tppMap.values()].map((t) => ({
        name: t.name,
        lfis: [...t.lfis].sort(),
        totalRequests: 0,
        totalPayments: t.totalPayments,
        services: [],
        consentTypes: [...t.consentTypes.entries()].map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count)
      })).sort((a, b) => b.totalPayments - a.totalPayments);
    }
    function latestDateFrom(log) {
      if (!Array.isArray(log) || log.length === 0) return null;
      let max = 0;
      for (const row of log) {
        const t = Date.parse(row.date || "");
        if (t > max) max = t;
      }
      return max > 0 ? new Date(max) : null;
    }
    const updatedLabel = computed(() => {
      if (loading.value) return "LOADING…";
      if (isLfi.value) return "LIVE FROM DIRECTORY";
      const d = latestDateFrom(paymentOnly.value ? paymentsLog.value : apiLog.value);
      if (!d) return "NO DATA";
      const formatted = d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).toUpperCase();
      return `UPDATED ${formatted}`;
    });
    const summaryCount = computed(() => {
      if (loading.value) return "—";
      return isLfi.value ? lfiServerCount.value : tppCount.value;
    });
    const summaryUnit = computed(() => {
      if (mode.value === "lfi-bank") {
        const n2 = lfiServerCount.value;
        return n2 === 1 ? "live bank" : "live banks";
      }
      if (mode.value === "lfi-insurer") {
        const n2 = lfiServerCount.value;
        return n2 === 1 ? "live insurer" : "live insurers";
      }
      const n = tppCount.value;
      return n === 1 ? "TPP live" : "TPPs live";
    });
    const summarySub = computed(() => {
      if (mode.value === "lfi-bank") {
        const familyText2 = family.value === "all" ? "Open Finance" : filterLabel(family.value);
        return `Banks running ${familyText2} in the production environment. Those holding a Commercial Go-Live Approval are fully live to all customers and all licensed, live TPPs; the rest are in production testing. Data pulled directly from the Nebras Open Finance directory.`;
      }
      if (mode.value === "lfi-insurer") {
        const typeText = activeInsuranceType.value ? `${INSURANCE_TYPE_LABELS[activeInsuranceType.value]} insurance` : "insurance";
        return `Insurers running ${typeText} in the production environment. Those holding a Commercial Go-Live Approval are fully live to all customers and all licensed, live TPPs; the rest are in production testing. Data pulled directly from the Nebras Open Finance directory.`;
      }
      const familyText = family.value === "all" ? "Open Finance" : filterLabel(family.value);
      if (paymentOnly.value) {
        return `Third-party providers who have initiated payments in production through the API Hub in the last ${DAYS_WINDOW} days, broken down by consent type.`;
      }
      return `Third-party providers consuming ${familyText} in production through the API Hub in the last ${DAYS_WINDOW} days.`;
    });
    const formatNumber = (n) => Number(n).toLocaleString();
    const prettifyConsentType = (s) => String(s).replace(/([a-z])([A-Z])/g, "$1 $2");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ed-le" }, _attrs))} data-v-e9e56b45><section class="ed-le-masthead" data-v-e9e56b45><div class="ed-le-masthead__inner" data-v-e9e56b45><div class="ed-le-masthead__meta" data-v-e9e56b45><div class="ed-le-masthead__label" data-v-e9e56b45><span class="ed-le-masthead__label-dash" data-v-e9e56b45></span> Section · In Production </div><div class="ed-le-masthead__updated" data-v-e9e56b45>${ssrInterpolate(unref(updatedLabel))}</div></div><h1 class="ed-le-masthead__title" data-v-e9e56b45> Open Finance<br data-v-e9e56b45> in production today. </h1><div class="ed-le-masthead__count" data-v-e9e56b45>${ssrInterpolate(unref(summaryCount))} <span class="ed-le-masthead__count-unit" data-v-e9e56b45>${ssrInterpolate(unref(summaryUnit))}</span></div></div><p class="ed-le-masthead__sub" data-v-e9e56b45>${ssrInterpolate(unref(summarySub))}</p></section><section class="ed-le-controls" data-v-e9e56b45><div class="ed-le-controls__inner" data-v-e9e56b45><div class="ed-le-mode" role="tablist" aria-label="View by participant type" data-v-e9e56b45><button type="button" role="tab"${ssrRenderAttr("aria-selected", unref(mode) === "lfi-bank" ? "true" : "false")} class="${ssrRenderClass([{ "is-active": unref(mode) === "lfi-bank" }, "ed-le-mode__btn"])}" data-v-e9e56b45> LFI (Bank) <span class="ed-le-mode__count" data-v-e9e56b45>${ssrInterpolate(unref(bankServerCount))}</span></button><button type="button" role="tab"${ssrRenderAttr("aria-selected", unref(mode) === "lfi-insurer" ? "true" : "false")} class="${ssrRenderClass([{ "is-active": unref(mode) === "lfi-insurer" }, "ed-le-mode__btn"])}" data-v-e9e56b45> LFI (Insurer) <span class="ed-le-mode__count" data-v-e9e56b45>${ssrInterpolate(unref(insurerServerCount))}</span></button><button type="button" role="tab"${ssrRenderAttr("aria-selected", unref(mode) === "tpp" ? "true" : "false")} class="${ssrRenderClass([{ "is-active": unref(mode) === "tpp" }, "ed-le-mode__btn"])}" data-v-e9e56b45> TPPs <span class="ed-le-mode__count" data-v-e9e56b45>${ssrInterpolate(unref(tppCount))}</span></button></div><nav class="ed-le-filter"${ssrRenderAttr("aria-label", unref(mode) === "lfi-insurer" ? "Filter by insurance type" : "Filter by service")} data-v-e9e56b45><button type="button" class="${ssrRenderClass([{ "is-active": unref(family) === "all" }, "ed-le-filter__btn"])}" data-v-e9e56b45>${ssrInterpolate(unref(mode) === "lfi-insurer" ? "All types" : "All services")}</button><!--[-->`);
      ssrRenderList(unref(filterChips), (chip) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "is-active": unref(family) === chip.key }, "ed-le-filter__btn"])}" data-v-e9e56b45>${ssrInterpolate(chip.label)}</button>`);
      });
      _push(`<!--]--></nav></div></section><section class="ed-le-body" data-v-e9e56b45><div class="ed-le-body__inner" data-v-e9e56b45>`);
      if (unref(loading)) {
        _push(`<div class="ed-le-loading" data-v-e9e56b45><div class="ed-le-spinner" data-v-e9e56b45></div> Loading live data… </div>`);
      } else if (unref(error)) {
        _push(`<div class="ed-le-empty" data-v-e9e56b45><span class="ed-le-empty-kicker" data-v-e9e56b45>Error</span><h3 data-v-e9e56b45>Could not load live data</h3><p data-v-e9e56b45>${ssrInterpolate(unref(error))}</p></div>`);
      } else if (unref(isLfi)) {
        _push(`<!--[-->`);
        if (unref(visibleServers).length === 0) {
          _push(`<div class="ed-le-empty" data-v-e9e56b45><span class="ed-le-empty-kicker" data-v-e9e56b45>No match</span>`);
          if (unref(mode) === "lfi-insurer") {
            _push(`<h3 data-v-e9e56b45> No insurers offering ${ssrInterpolate(unref(family) === "all" ? "insurance" : filterLabel(unref(family)))} yet. </h3>`);
          } else {
            _push(`<h3 data-v-e9e56b45>No banks offering ${ssrInterpolate(unref(family) === "all" ? "this service" : filterLabel(unref(family)))} yet.</h3>`);
          }
          _push(`<button class="ed-le-clear" data-v-e9e56b45>${ssrInterpolate(unref(mode) === "lfi-insurer" ? "Show all types" : "Show all services")} → </button></div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(serverGroups), (group) => {
            _push(`<section class="${ssrRenderClass([`ed-le-group--${group.key}`, "ed-le-group"])}" data-v-e9e56b45><header class="ed-le-group__head" data-v-e9e56b45><h2 class="ed-le-group__title" data-v-e9e56b45>`);
            if (group.key === "live") {
              _push(`<span class="ed-le-group__star" aria-hidden="true" data-v-e9e56b45>★</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(` ${ssrInterpolate(group.title)} <span class="ed-le-group__count" data-v-e9e56b45>${ssrInterpolate(group.servers.length)}</span></h2><p class="ed-le-group__note" data-v-e9e56b45>${ssrInterpolate(group.note)}</p></header><div class="ed-le-grid" data-v-e9e56b45><!--[-->`);
            ssrRenderList(group.servers, (server) => {
              _push(`<article class="${ssrRenderClass([{ "ed-le-card--live": server.isLive }, "ed-le-card"])}" data-v-e9e56b45><header class="ed-le-card__head" data-v-e9e56b45><div class="ed-le-card__logo" data-v-e9e56b45><img${ssrRenderAttr("src", server.logo)}${ssrRenderAttr("alt", server.name)} loading="lazy" data-v-e9e56b45></div><div class="ed-le-card__title" data-v-e9e56b45><h3 data-v-e9e56b45>${ssrInterpolate(server.name)}</h3>`);
              if (server.goLiveDate) {
                _push(`<div class="${ssrRenderClass([{ "is-scheduled": server.goLiveScheduled }, "ed-le-card__golive"])}" data-v-e9e56b45><span class="ed-le-card__golive-star" aria-hidden="true" data-v-e9e56b45>★</span><span data-v-e9e56b45>${ssrInterpolate(server.goLiveScheduled ? "Go-live approved for" : "Live since")} ${ssrInterpolate(formatGoLive(server.goLiveDate))}</span></div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div class="ed-le-card__types" data-v-e9e56b45><!--[-->`);
              ssrRenderList(server.accountTypes, (t) => {
                _push(`<span class="ed-le-pill ed-le-pill--type" data-v-e9e56b45>${ssrInterpolate(t)}</span>`);
              });
              _push(`<!--]--></div></div></header><ul class="ed-le-card__services" data-v-e9e56b45><!--[-->`);
              ssrRenderList(visibleServices(server), (svc) => {
                _push(`<li class="${ssrRenderClass([{ "is-expanded": svc.expanded }, "ed-le-card__service"])}" data-v-e9e56b45><button type="button" class="ed-le-card__service-head"${ssrRenderAttr("aria-expanded", svc.expanded ? "true" : "false")} data-v-e9e56b45><span class="ed-le-card__service-name" data-v-e9e56b45>${ssrInterpolate(svc.label)}</span><span class="ed-le-card__service-versions" data-v-e9e56b45>${ssrInterpolate(svc.versions.map((v) => v.version).join(", "))}</span><span class="${ssrRenderClass([{ "is-open": svc.expanded }, "ed-le-chev ed-le-chev--small"])}" data-v-e9e56b45>›</span></button>`);
                if (svc.expanded) {
                  _push(`<div class="ed-le-card__service-detail" data-v-e9e56b45><!--[-->`);
                  ssrRenderList(svc.versions, (v) => {
                    _push(`<div class="ed-le-card__version" data-v-e9e56b45>`);
                    if (svc.familyKey !== "insurance") {
                      _push(`<!--[--><div class="ed-le-card__version-head" data-v-e9e56b45><span class="ed-le-card__version-label" data-v-e9e56b45>${ssrInterpolate(v.version)}</span><!--[-->`);
                      ssrRenderList(v.paymentTypes, (t) => {
                        _push(`<span class="ed-le-pill ed-le-pill--meta" data-v-e9e56b45>${ssrInterpolate(t)}</span>`);
                      });
                      _push(`<!--]--><!--[-->`);
                      ssrRenderList(v.accountSubTypes, (t) => {
                        _push(`<span class="ed-le-pill ed-le-pill--subtype" data-v-e9e56b45>${ssrInterpolate(t)}</span>`);
                      });
                      _push(`<!--]-->`);
                      if (svc.familyKey === "account-information") {
                        _push(`<span class="ed-le-pill ed-le-pill--meta" data-v-e9e56b45>Over-limit fee: AED ${ssrInterpolate(v.overLimitFees)}</span>`);
                      } else {
                        _push(`<!---->`);
                      }
                      _push(`</div>`);
                      if (v.endpoints.length) {
                        _push(`<button type="button" class="ed-le-card__endpoints-toggle"${ssrRenderAttr("aria-expanded", v.expanded ? "true" : "false")} data-v-e9e56b45><span class="${ssrRenderClass([{ "is-open": v.expanded }, "ed-le-chev ed-le-chev--small"])}" data-v-e9e56b45>›</span> ${ssrInterpolate(v.expanded ? "Hide" : "Show")} endpoints (${ssrInterpolate(v.endpoints.length)}) </button>`);
                      } else {
                        _push(`<!---->`);
                      }
                      if (v.expanded) {
                        _push(`<ul class="ed-le-card__endpoints" data-v-e9e56b45><!--[-->`);
                        ssrRenderList(v.endpoints, (ep) => {
                          _push(`<li data-v-e9e56b45><code data-v-e9e56b45>${ssrInterpolate(ep)}</code></li>`);
                        });
                        _push(`<!--]--></ul>`);
                      } else {
                        _push(`<!---->`);
                      }
                      _push(`<!--]-->`);
                    } else {
                      _push(`<!--[--><div class="ed-le-card__version-head" data-v-e9e56b45><span class="ed-le-card__version-label" data-v-e9e56b45>${ssrInterpolate(v.version)}</span><!--[-->`);
                      ssrRenderList(v.insuranceTypes, (t) => {
                        _push(`<span class="ed-le-pill ed-le-pill--subtype" data-v-e9e56b45>${ssrInterpolate(INSURANCE_TYPE_LABELS[t])}</span>`);
                      });
                      _push(`<!--]--></div><!--[-->`);
                      ssrRenderList(visibleInsuranceGroups(v), (g) => {
                        _push(`<div class="ed-le-card__ins-group" data-v-e9e56b45><button type="button" class="ed-le-card__endpoints-toggle"${ssrRenderAttr("aria-expanded", g.expanded ? "true" : "false")} data-v-e9e56b45><span class="${ssrRenderClass([{ "is-open": g.expanded }, "ed-le-chev ed-le-chev--small"])}" data-v-e9e56b45>›</span> ${ssrInterpolate(g.label)} (${ssrInterpolate(g.endpoints.length)}) </button>`);
                        if (g.expanded) {
                          _push(`<ul class="ed-le-card__endpoints" data-v-e9e56b45><!--[-->`);
                          ssrRenderList(g.endpoints, (ep) => {
                            _push(`<li data-v-e9e56b45><code data-v-e9e56b45>${ssrInterpolate(ep)}</code></li>`);
                          });
                          _push(`<!--]--></ul>`);
                        } else {
                          _push(`<!---->`);
                        }
                        _push(`</div>`);
                      });
                      _push(`<!--]--><!--]-->`);
                    }
                    _push(`</div>`);
                  });
                  _push(`<!--]--></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</li>`);
              });
              _push(`<!--]--></ul></article>`);
            });
            _push(`<!--]--></div></section>`);
          });
          _push(`<!--]-->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        if (unref(filteredTpps).length === 0) {
          _push(`<div class="ed-le-empty" data-v-e9e56b45><span class="ed-le-empty-kicker" data-v-e9e56b45>No match</span><h3 data-v-e9e56b45>No TPPs consuming ${ssrInterpolate(unref(family) === "all" ? "this service" : filterLabel(unref(family)))} in the last ${ssrInterpolate(DAYS_WINDOW)} days.</h3><button class="ed-le-clear" data-v-e9e56b45>Show all services →</button></div>`);
        } else {
          _push(`<div class="ed-le-grid" data-v-e9e56b45><!--[-->`);
          ssrRenderList(unref(filteredTpps), (tpp) => {
            _push(`<article class="ed-le-card ed-le-card--tpp" data-v-e9e56b45><header class="ed-le-card__head ed-le-card__head--tpp" data-v-e9e56b45><div class="ed-le-card__title" data-v-e9e56b45><div class="ed-le-card__kicker" data-v-e9e56b45>TPP</div><h3 data-v-e9e56b45>${ssrInterpolate(tpp.name)}</h3></div><div class="ed-le-card__total" data-v-e9e56b45><div class="ed-le-card__total-num" data-v-e9e56b45>${ssrInterpolate(formatNumber(unref(paymentOnly) ? tpp.totalPayments : tpp.totalRequests))}</div><div class="ed-le-card__total-unit" data-v-e9e56b45>${ssrInterpolate(unref(paymentOnly) ? "payments" : "requests")}</div></div></header><div class="ed-le-card__lfis" data-v-e9e56b45><div class="ed-le-card__lfis-label" data-v-e9e56b45>Consumed at</div><div class="ed-le-card__lfis-pills" data-v-e9e56b45><!--[-->`);
            ssrRenderList(tpp.lfis, (lfi) => {
              _push(`<span class="ed-le-pill ed-le-pill--lfi" data-v-e9e56b45>${ssrInterpolate(lfi)}</span>`);
            });
            _push(`<!--]--></div></div>`);
            if (!unref(paymentOnly)) {
              _push(`<ul class="ed-le-card__services" data-v-e9e56b45><!--[-->`);
              ssrRenderList(tpp.services, (svc) => {
                _push(`<li class="${ssrRenderClass([{ "is-expanded": isTppServiceExpanded(tpp.name, svc.familyKey) }, "ed-le-card__service"])}" data-v-e9e56b45><button type="button" class="ed-le-card__service-head"${ssrRenderAttr("aria-expanded", isTppServiceExpanded(tpp.name, svc.familyKey) ? "true" : "false")} data-v-e9e56b45><span class="ed-le-card__service-name" data-v-e9e56b45>${ssrInterpolate(svc.label)}</span><span class="ed-le-card__service-versions" data-v-e9e56b45>${ssrInterpolate(svc.versions.map((v) => v.version).join(", "))}</span><span class="${ssrRenderClass([{ "is-open": isTppServiceExpanded(tpp.name, svc.familyKey) }, "ed-le-chev ed-le-chev--small"])}" data-v-e9e56b45>›</span></button>`);
                if (isTppServiceExpanded(tpp.name, svc.familyKey)) {
                  _push(`<div class="ed-le-card__service-detail" data-v-e9e56b45><!--[-->`);
                  ssrRenderList(svc.versions, (v) => {
                    _push(`<div class="ed-le-card__version" data-v-e9e56b45><div class="ed-le-card__version-head" data-v-e9e56b45><span class="ed-le-card__version-label" data-v-e9e56b45>${ssrInterpolate(v.version)}</span><span class="ed-le-pill ed-le-pill--meta" data-v-e9e56b45>${ssrInterpolate(formatNumber(v.requests))} requests </span></div>`);
                    if (v.endpoints.length) {
                      _push(`<ul class="ed-le-card__endpoints" data-v-e9e56b45><!--[-->`);
                      ssrRenderList(v.endpoints, (ep) => {
                        _push(`<li data-v-e9e56b45><code data-v-e9e56b45>${ssrInterpolate(ep.key)}</code><span class="ed-le-card__endpoint-count" data-v-e9e56b45>${ssrInterpolate(formatNumber(ep.count))}</span></li>`);
                      });
                      _push(`<!--]--></ul>`);
                    } else {
                      _push(`<!---->`);
                    }
                    _push(`</div>`);
                  });
                  _push(`<!--]--></div>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<ul class="ed-le-card__services" data-v-e9e56b45><!--[-->`);
              ssrRenderList(tpp.consentTypes, (ct) => {
                _push(`<li class="ed-le-card__service ed-le-card__service--static" data-v-e9e56b45><span class="ed-le-card__service-name" data-v-e9e56b45>${ssrInterpolate(prettifyConsentType(ct.type))}</span><span class="ed-le-card__endpoint-count" data-v-e9e56b45>${ssrInterpolate(formatNumber(ct.count))}</span></li>`);
              });
              _push(`<!--]--></ul>`);
            }
            _push(`</article>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`<!--]-->`);
      }
      _push(`<aside class="ed-le-source" data-v-e9e56b45><div class="ed-le-source__icon" aria-hidden="true" data-v-e9e56b45><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" data-v-e9e56b45><circle cx="12" cy="12" r="9" data-v-e9e56b45></circle><path d="M12 7v5l3 2" stroke-linecap="round" data-v-e9e56b45></path></svg></div><div class="ed-le-source__text" data-v-e9e56b45><strong data-v-e9e56b45>How live status is determined.</strong> Every LFI listed here is deployed in the production environment — services and certifications come from the Nebras Open Finance production directory. An LFI is marked live once its authorisation server holds a certified <em data-v-e9e56b45>Commercial Go-Live Approval</em>; the approval start date is the go-live date shown on the card. Everything else is in production testing. TPP activity is aggregated from production API Hub access logs over a rolling ${ssrInterpolate(DAYS_WINDOW)}-day window. All listed institutions are CBUAE-licensed. </div></aside></div></section></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/program/whats-live.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const whatsLive = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9e56b45"]]);
export {
  whatsLive as default
};

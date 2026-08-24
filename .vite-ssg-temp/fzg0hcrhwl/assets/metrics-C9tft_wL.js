import { defineComponent, ref, computed, onMounted, watch, onBeforeUnmount, mergeProps, unref, useSSRContext, reactive, watchEffect, onUnmounted, resolveComponent, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Chart, BarController, BarElement, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, DoughnutController, ArcElement } from "chart.js";
import { o as onThemeChange, c as chartTokens } from "./useChartTheme-DtmiKid7.js";
import { _ as _export_sfc, l as loadApiLog, b as block0 } from "../main.mjs";
import { u as useUrlSearchParam } from "./useUrlSearchParam-CAJ_AAT-.js";
import "vite-ssg";
import "axios";
import "vue-router";
import "@unhead/vue";
const C_TEAL = "#00C2A9";
const C_GOLD = "#B37819";
const C_BLUE = "#008BE4";
const C_BLUE_DK = "#0043A6";
const C_SKY = "#00A2FB";
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DashResponseTimeChart",
  __ssrInlineRender: true,
  props: {
    data: {},
    mode: { default: "avg-line" },
    groupBy: { default: "month" },
    title: { default: "" }
  },
  setup(__props) {
    Chart.register(
      BarController,
      BarElement,
      LineController,
      LineElement,
      PointElement,
      CategoryScale,
      LinearScale,
      Tooltip,
      Legend
    );
    const props = __props;
    const canvasRef = ref(null);
    let chart = null;
    function buildStyle() {
      const t = chartTokens();
      return {
        TOOLTIP: {
          backgroundColor: t.tooltipBg,
          titleColor: t.tooltipTitle,
          bodyColor: t.tooltipBody,
          borderRadius: 0,
          padding: 10,
          titleFont: { family: "IBM Plex Mono, monospace", size: 10, weight: 500 },
          bodyFont: { family: "IBM Plex Mono, monospace", size: 10 }
        },
        AXIS_TICK: { color: t.axisTick, font: { family: "Poppins, sans-serif", size: 10 } },
        AXIS_LABEL: { color: t.axisLabel, font: { family: "Poppins, sans-serif", size: 10 } },
        AXIS_TITLE: { font: { family: "IBM Plex Mono, monospace", size: 10, weight: 500 }, color: t.axisTitle },
        GRID: { color: t.grid },
        LEGEND: { boxWidth: 10, boxHeight: 10, font: { family: "Poppins, sans-serif", size: 11 }, color: t.legend },
        POINT_BORDER: t.pointBorder
      };
    }
    const INTERACTION = { mode: "index", intersect: false };
    function readField(row, key) {
      return row[key];
    }
    function getAvgMs(row) {
      const v = row.avgMs;
      return typeof v === "number" ? v : 0;
    }
    function getPercentile(row, key) {
      const v = row[key];
      return typeof v === "number" ? v : 0;
    }
    const metaValue = computed(() => {
      if (!props.data.length) return "";
      if (props.mode === "histogram") return `${props.data.length.toLocaleString()} samples`;
      const sum = props.data.reduce((s, r) => s + getAvgMs(r), 0);
      return `${Math.round(sum / props.data.length)}ms avg`;
    });
    function buildAvgLine() {
      const field = props.groupBy || "month";
      const byGroup = {};
      for (const r of props.data) {
        const key = String(readField(r, field) ?? "unknown");
        const slot = byGroup[key] ?? (byGroup[key] = { total: 0, n: 0 });
        slot.total += getAvgMs(r);
        slot.n += 1;
      }
      const labels = Object.keys(byGroup).sort();
      const values = labels.map((m) => {
        const slot = byGroup[m];
        return slot ? Math.round(slot.total / slot.n) : 0;
      });
      const s = buildStyle();
      const config = {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Avg Latency",
            data: values,
            borderColor: C_TEAL,
            backgroundColor: "rgba(0, 194, 169, 0.10)",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: C_TEAL,
            pointBorderColor: s.POINT_BORDER,
            pointBorderWidth: 1,
            fill: true,
            tension: 0.35
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: { display: false },
            tooltip: { ...s.TOOLTIP, callbacks: { label: (ctx) => `${ctx.parsed.y}ms` } }
          },
          scales: {
            y: { beginAtZero: true, grid: s.GRID, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}ms` }, title: { display: true, text: "ms", ...s.AXIS_TITLE } },
            x: { grid: { display: false }, ticks: s.AXIS_LABEL }
          }
        }
      };
      return new Chart(canvasRef.value, config);
    }
    function buildAvgBar() {
      const byGroup = {};
      for (const r of props.data) {
        const key = String(readField(r, props.groupBy) ?? "Unknown");
        if (!key || key.toLowerCase() === "unknown") continue;
        const slot = byGroup[key] ?? (byGroup[key] = { total: 0, n: 0 });
        slot.total += getAvgMs(r);
        slot.n += 1;
      }
      const labels = Object.keys(byGroup).sort();
      const values = labels.map((k) => {
        const slot = byGroup[k];
        return slot ? Math.round(slot.total / slot.n) : 0;
      });
      const max = values.length ? Math.max(...values) : 0;
      const colors = values.map((v) => {
        const ratio = max > 0 ? v / max : 0;
        if (ratio < 0.4) return C_TEAL;
        if (ratio < 0.7) return C_GOLD;
        return C_BLUE_DK;
      });
      const s = buildStyle();
      const config = {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Avg Latency",
            data: values,
            backgroundColor: colors,
            borderRadius: 0,
            maxBarThickness: 60
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: { display: false },
            tooltip: { ...s.TOOLTIP, callbacks: { label: (ctx) => `${ctx.parsed.y}ms` } }
          },
          scales: {
            y: { beginAtZero: true, grid: s.GRID, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}ms` } },
            x: { grid: { display: false }, ticks: s.AXIS_LABEL }
          }
        }
      };
      return new Chart(canvasRef.value, config);
    }
    function buildPercentiles() {
      const field = props.groupBy || "month";
      const byGroup = {};
      for (const r of props.data) {
        const key = String(readField(r, field) ?? "unknown");
        const slot = byGroup[key] ?? (byGroup[key] = { p50: 0, p95: 0, p99: 0, n: 0 });
        slot.p50 += getPercentile(r, "p50");
        slot.p95 += getPercentile(r, "p95");
        slot.p99 += getPercentile(r, "p99");
        slot.n += 1;
      }
      const labels = Object.keys(byGroup).sort();
      const s = buildStyle();
      const mkDs = (k, color, dash) => ({
        type: "line",
        label: k.toUpperCase(),
        data: labels.map((m) => {
          const slot = byGroup[m];
          return slot ? Math.round(slot[k] / slot.n) : 0;
        }),
        borderColor: color,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderDash: dash ?? [],
        pointRadius: 3,
        pointBackgroundColor: color,
        pointBorderColor: s.POINT_BORDER,
        pointBorderWidth: 1,
        fill: false,
        tension: 0.3
      });
      const config = {
        type: "line",
        data: {
          labels,
          datasets: [
            mkDs("p50", C_TEAL),
            mkDs("p95", C_BLUE, [5, 3]),
            mkDs("p99", C_BLUE_DK, [2, 2])
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: s.LEGEND
            },
            tooltip: { ...s.TOOLTIP, callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}ms` } }
          },
          scales: {
            y: { beginAtZero: true, grid: s.GRID, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}ms` }, title: { display: true, text: "ms", ...s.AXIS_TITLE } },
            x: { grid: { display: false }, ticks: s.AXIS_LABEL }
          }
        }
      };
      return new Chart(canvasRef.value, config);
    }
    function buildHistogram() {
      const BUCKETS = [
        { label: "< 100ms", max: 100 },
        { label: "100–200ms", max: 200 },
        { label: "200–400ms", max: 400 },
        { label: "400–800ms", max: 800 },
        { label: "800ms+", max: Infinity }
      ];
      const counts = Array(BUCKETS.length).fill(0);
      for (const r of props.data) {
        const v = getAvgMs(r);
        const found = BUCKETS.findIndex((b) => v < b.max);
        const idx = found >= 0 ? found : BUCKETS.length - 1;
        counts[idx] = (counts[idx] ?? 0) + 1;
      }
      const s = buildStyle();
      const config = {
        type: "bar",
        data: {
          labels: BUCKETS.map((b) => b.label),
          datasets: [{
            label: "Requests",
            data: counts,
            backgroundColor: [C_TEAL, C_SKY, C_BLUE, C_BLUE_DK, C_GOLD],
            borderRadius: 0,
            maxBarThickness: 70
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: { display: false },
            tooltip: { ...s.TOOLTIP, callbacks: { label: (ctx) => `${Number(ctx.parsed.y).toLocaleString()} requests` } }
          },
          scales: {
            y: { beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: "Requests", ...s.AXIS_TITLE } },
            x: { grid: { display: false }, ticks: s.AXIS_LABEL }
          }
        }
      };
      return new Chart(canvasRef.value, config);
    }
    function render() {
      if (!canvasRef.value) return;
      chart == null ? void 0 : chart.destroy();
      chart = null;
      if (!props.data.length) return;
      if (props.mode === "avg-line") chart = buildAvgLine();
      else if (props.mode === "avg-bar") chart = buildAvgBar();
      else if (props.mode === "p-percentiles") chart = buildPercentiles();
      else if (props.mode === "histogram") chart = buildHistogram();
    }
    onMounted(render);
    watch(() => props.data, render, { deep: false });
    onThemeChange(render);
    onBeforeUnmount(() => {
      chart == null ? void 0 : chart.destroy();
      chart = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-wrap" }, _attrs))} data-v-e70c54e5><div class="chart-title" data-v-e70c54e5>${ssrInterpolate(__props.title)}</div>`);
      if (unref(metaValue)) {
        _push(`<div class="chart-meta" data-v-e70c54e5>${ssrInterpolate(unref(metaValue))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="chart-container" data-v-e70c54e5><canvas data-v-e70c54e5></canvas></div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashResponseTimeChart.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __unplugin_components_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-e70c54e5"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DashApiVolumeChart",
  __ssrInlineRender: true,
  props: {
    data: {},
    groupBy: { default: "month" },
    stackBy: {},
    grouped: { type: Boolean, default: false },
    valueKey: { default: "volume" },
    title: { default: "" }
  },
  setup(__props) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
    const props = __props;
    const canvasRef = ref(null);
    let chart = null;
    const PALETTE = [
      "#00277F",
      "#00C2A9",
      "#008BE4",
      "#B37819",
      "#0043A6",
      "#00A2FB",
      "#008B78",
      "#5F6A8F"
    ];
    function buildTooltip() {
      const t = chartTokens();
      return {
        backgroundColor: t.tooltipBg,
        titleColor: t.tooltipTitle,
        bodyColor: t.tooltipBody,
        borderRadius: 0,
        padding: 10,
        titleFont: { family: "IBM Plex Mono, monospace", size: 10, weight: 500 },
        bodyFont: { family: "IBM Plex Mono, monospace", size: 10 }
      };
    }
    function readField(row, key) {
      return row[key];
    }
    function axisTitle(valueKey) {
      switch (valueKey) {
        case "amount":
          return "Amount (AED)";
        case "count":
          return "Count";
        case "errors":
          return "Errors";
        default:
          return "API Calls";
      }
    }
    function aggregate(data, groupBy, stackBy, valueKey) {
      const bucket = {};
      const stackKeys = /* @__PURE__ */ new Set();
      for (const row of data) {
        const gRaw = readField(row, groupBy);
        const gKey = String(gRaw ?? "Unknown");
        const sRaw = stackBy ? readField(row, stackBy) : void 0;
        const sKey = stackBy ? String(sRaw ?? "Unknown") : "_";
        const vRaw = readField(row, valueKey);
        const val = Number(vRaw) || 0;
        if (!gKey || gKey.toLowerCase() === "unknown" || gKey === "/other") continue;
        const slot = bucket[gKey] ?? (bucket[gKey] = {});
        slot[sKey] = (slot[sKey] ?? 0) + val;
        stackKeys.add(sKey);
      }
      const groupLabels = Object.keys(bucket).sort();
      const stacks = stackBy ? [...stackKeys].sort() : ["_"];
      const datasets = stacks.map((sKey, i) => ({
        label: stackBy ? sKey : props.title,
        data: groupLabels.map((g) => {
          var _a;
          return ((_a = bucket[g]) == null ? void 0 : _a[sKey]) ?? 0;
        }),
        backgroundColor: PALETTE[i % PALETTE.length],
        borderColor: PALETTE[i % PALETTE.length],
        borderWidth: 0,
        borderRadius: 0,
        maxBarThickness: 60,
        ...stackBy && !props.grouped ? { stack: "stack" } : {}
      }));
      return { groupLabels, datasets };
    }
    const total = computed(
      () => props.data.reduce((s, r) => s + (Number(readField(r, props.valueKey)) || 0), 0)
    );
    function render() {
      if (!canvasRef.value) return;
      const { groupLabels, datasets } = aggregate(props.data, props.groupBy, props.stackBy, props.valueKey);
      if (chart) {
        chart.data.labels = groupLabels;
        chart.data.datasets = datasets;
        chart.update("active");
        return;
      }
      const t = chartTokens();
      const stacked = !!props.stackBy && !props.grouped;
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            display: !!props.stackBy,
            position: "bottom",
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              font: { family: "Poppins, sans-serif", size: 11 },
              color: t.legend
            }
          },
          tooltip: {
            ...buildTooltip(),
            callbacks: {
              label: (ctx) => {
                const width = Math.max(
                  ...ctx.chart.data.datasets.map((d) => String(d.label ?? "").length)
                );
                const name = String(ctx.dataset.label ?? "").padEnd(width);
                return `${name}   ${Number(ctx.parsed.y).toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            stacked,
            beginAtZero: true,
            grid: { color: t.grid },
            ticks: { color: t.axisTick, font: { family: "Poppins, sans-serif", size: 10 } },
            title: {
              display: true,
              text: axisTitle(props.valueKey),
              font: { family: "IBM Plex Mono, monospace", size: 10, weight: 500 },
              color: t.axisTitle
            }
          },
          x: {
            stacked,
            grid: { display: false },
            ticks: { color: t.axisLabel, font: { family: "Poppins, sans-serif", size: 10 } }
          }
        }
      };
      chart = new Chart(canvasRef.value, {
        type: "bar",
        data: { labels: groupLabels, datasets },
        options
      });
    }
    function rebuild() {
      chart == null ? void 0 : chart.destroy();
      chart = null;
      render();
    }
    onMounted(render);
    watch(() => props.data, render, { deep: false });
    onThemeChange(rebuild);
    onBeforeUnmount(() => {
      chart == null ? void 0 : chart.destroy();
      chart = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-wrap" }, _attrs))} data-v-bb2046a3><div class="chart-title" data-v-bb2046a3>${ssrInterpolate(__props.title)}</div>`);
      if (unref(total) > 0) {
        _push(`<div class="chart-meta" data-v-bb2046a3>${ssrInterpolate(unref(total).toLocaleString())} total</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="chart-container" data-v-bb2046a3><canvas data-v-bb2046a3></canvas></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashApiVolumeChart.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __unplugin_components_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-bb2046a3"]]);
const SECTORS = [
  { id: "banking", label: "Banking" },
  { id: "insurance", label: "Insurance" }
];
const API_GROUP = {
  id: "api",
  label: "API",
  icon: "api",
  items: [
    { id: "api-volumes", label: "API Volumes" },
    { id: "api-errors", label: "API Errors" },
    { id: "api-response-times", label: "Response Times" }
  ]
};
const PAYMENTS_GROUP = {
  id: "payments",
  label: "Payments",
  icon: "payments",
  items: [
    { id: "payment-volumes", label: "Payment Volumes" },
    { id: "payment-errors", label: "Payment Errors" },
    { id: "payment-status", label: "Payment Status" }
  ]
};
const AUTH_GROUP = {
  id: "authorization",
  label: "Authorization",
  icon: "auth",
  items: [
    { id: "auth-conversion", label: "Auth Conversion" }
  ]
};
const SECTOR_NAV = {
  banking: [API_GROUP, PAYMENTS_GROUP, AUTH_GROUP],
  insurance: [API_GROUP, AUTH_GROUP]
};
function sectionIdsForSector(sector) {
  return SECTOR_NAV[sector].flatMap((g) => g.items.map((i) => i.id));
}
function sectionInSector(sectionId, sector) {
  return sectionIdsForSector(sector).includes(sectionId);
}
function firstSectionOfSector(sector) {
  var _a, _b;
  return ((_b = (_a = SECTOR_NAV[sector][0]) == null ? void 0 : _a.items[0]) == null ? void 0 : _b.id) ?? "api-volumes";
}
const SECTION_META = {
  "api-volumes": { title: "API Volumes", description: "Call volume across LFIs, TPPs and API families" },
  "api-errors": { title: "API Errors", description: "Error counts, rates and code distributions" },
  "api-response-times": { title: "API Response Times", description: "Latency trends, percentiles and endpoint rankings" },
  "payment-volumes": { title: "Payment Volumes", description: "Payment counts and AED amounts by LFI and TPP" },
  "payment-errors": { title: "Payment Errors", description: "Failed payments and success rate analysis" },
  "payment-status": { title: "Payment Status", description: "Payment breakdown by actual ISO 20022 status" },
  "auth-conversion": { title: "Auth Conversion", description: "Authorization success and cancellation rates across LFIs and months" }
};
const CHART_REGISTRY = {
  "api-volumes": [
    { id: "vol_by_month", title: "Successful Volume by Month", component: "volume", props: { groupBy: "month", stackBy: "family" }, dataSource: "api-success" },
    { id: "vol_by_lfi", title: "Successful Volume by LFI", component: "volume", props: { groupBy: "lfi" }, dataSource: "api-success", hideIfFiltered: "lfi" },
    { id: "vol_by_version", title: "Successful Volume by API Version", component: "volume", props: { groupBy: "version" }, dataSource: "api-success" },
    { id: "vol_by_tpp", title: "Successful Volume by TPP", component: "volume", props: { groupBy: "tpp" }, dataSource: "api-success", hideIfFiltered: "tpp" },
    { id: "vol_by_endpoint", title: "Successful Volume by Endpoint", component: "volume", props: { groupBy: "endpoint" }, dataSource: "api-success", showOnlyIfFiltered: true }
  ],
  "api-errors": [
    { id: "err_by_month", title: "Success vs Error by Month", component: "volume", props: { groupBy: "month", stackBy: "status" }, dataSource: "api" },
    { id: "err_vol_by_lfi", title: "Error Volume by LFI", component: "volume", props: { groupBy: "lfi", valueKey: "errors" }, dataSource: "api", hideIfFiltered: "lfi" },
    { id: "err_rate", title: "Error Rate by LFI", component: "error-rate", dataSource: "api" },
    { id: "err_rate_version", title: "Error Rate by API Version", component: "error-rate", props: { groupBy: "version" }, dataSource: "api" },
    { id: "err_vol_by_endpoint", title: "Volume by Endpoint", component: "volume", props: { groupBy: "endpoint", stackBy: "status" }, dataSource: "api", showOnlyIfFiltered: true },
    { id: "err_rate_by_endpoint", title: "Error Rate by Endpoint", component: "error-rate", props: { groupBy: "endpoint" }, dataSource: "api", showOnlyIfFiltered: true }
  ],
  "api-response-times": [
    { id: "rt_avg_month", title: "Avg Response Time by Month", component: "rt", props: { mode: "avg-line" }, dataSource: "rt" },
    { id: "rt_by_family", title: "Avg Latency by API Family", component: "rt", props: { mode: "avg-bar", groupBy: "family" }, dataSource: "rt", hideIfFiltered: "apiFamily" },
    { id: "rt_by_endpoint", title: "Avg Latency by Endpoint", component: "rt", props: { mode: "avg-bar", groupBy: "endpoint" }, dataSource: "rt", showOnlyIfFiltered: "apiFamily" },
    { id: "rt_by_lfi", title: "Avg Latency by LFI", component: "rt", props: { mode: "avg-bar", groupBy: "lfi" }, dataSource: "rt", hideIfFiltered: "lfi" },
    { id: "rt_ranked", title: "Slowest Endpoints (Top 8)", component: "rt-ranked", dataSource: "rt" }
  ],
  "payment-volumes": [
    { id: "pay_success_amount_month", title: "Successful Payment Amount by Month (AED)", component: "volume", props: { groupBy: "month", stackBy: "consentType", valueKey: "amount" }, dataSource: "payment-success", hideIfFiltered: "month" },
    { id: "pay_success_count_month", title: "Successful Payment Count by Month", component: "volume", props: { groupBy: "month", stackBy: "consentType", valueKey: "count" }, dataSource: "payment-success", hideIfFiltered: "month" },
    { id: "pay_success_amount_lfi", title: "Successful Payment Amount by LFI (AED)", component: "volume", props: { groupBy: "lfi", stackBy: "consentType", valueKey: "amount" }, dataSource: "payment-success", hideIfFiltered: "lfi" },
    { id: "pay_success_count_lfi", title: "Successful Payment Count by LFI", component: "volume", props: { groupBy: "lfi", stackBy: "consentType", valueKey: "count" }, dataSource: "payment-success", hideIfFiltered: "lfi" },
    { id: "pay_success_amount_tpp", title: "Successful Payment Amount by TPP (AED)", component: "volume", props: { groupBy: "tpp", stackBy: "consentType", valueKey: "amount" }, dataSource: "payment-success", hideIfFiltered: "tpp" },
    { id: "pay_success_count_tpp", title: "Successful Payment Count by TPP", component: "volume", props: { groupBy: "tpp", stackBy: "consentType", valueKey: "count" }, dataSource: "payment-success", hideIfFiltered: "tpp" },
    { id: "pay_success_amount_lfi_status", title: "Successful Payment Amount by LFI (AED)", component: "volume", props: { groupBy: "lfi", stackBy: "rawStatus", valueKey: "amount" }, dataSource: "payment-success", showOnlyIfFiltered: true },
    { id: "pay_success_count_lfi_status", title: "Successful Payment Count by LFI", component: "volume", props: { groupBy: "lfi", stackBy: "rawStatus", valueKey: "count" }, dataSource: "payment-success", showOnlyIfFiltered: true },
    { id: "pay_success_size_dist", title: "Payment Size Distribution (AED)", component: "pay-size-dist", dataSource: "payment-success", span: 2 }
  ],
  "payment-errors": [
    { id: "pay_err_amount_month", title: "Payment Amount by Month (AED)", component: "volume", props: { groupBy: "month", stackBy: "status", valueKey: "amount" }, dataSource: "payment-all", hideIfFiltered: "month" },
    { id: "pay_err_count_month", title: "Payment Count by Month", component: "volume", props: { groupBy: "month", stackBy: "status", valueKey: "count" }, dataSource: "payment-all", hideIfFiltered: "month" },
    { id: "pay_err_amount_lfi", title: "Payment Amount by LFI (AED)", component: "volume", props: { groupBy: "lfi", stackBy: "status", valueKey: "amount" }, dataSource: "payment-all", hideIfFiltered: "lfi" },
    { id: "pay_err_count_lfi", title: "Payment Count by LFI", component: "volume", props: { groupBy: "lfi", stackBy: "status", valueKey: "count" }, dataSource: "payment-all", hideIfFiltered: "lfi" },
    { id: "pay_err_amount_tpp", title: "Payment Amount by TPP (AED)", component: "volume", props: { groupBy: "tpp", stackBy: "status", valueKey: "amount" }, dataSource: "payment-all", hideIfFiltered: "tpp" },
    { id: "pay_err_count_tpp", title: "Payment Count by TPP", component: "volume", props: { groupBy: "tpp", stackBy: "status", valueKey: "count" }, dataSource: "payment-all", hideIfFiltered: "tpp" }
  ],
  "payment-status": [
    { id: "pay_status_count_lfi", title: "Payment Count by LFI", component: "volume", props: { groupBy: "lfi", stackBy: "rawStatus", valueKey: "count" }, dataSource: "payment-all", hideIfFiltered: "lfi", span: 2 },
    { id: "pay_status_count_month", title: "Payment Count by Month", component: "volume", props: { groupBy: "month", stackBy: "rawStatus", valueKey: "count" }, dataSource: "payment-all", hideIfFiltered: "month" },
    { id: "pay_status_amount_month", title: "Payment Amount by Month (AED)", component: "volume", props: { groupBy: "month", stackBy: "rawStatus", valueKey: "amount" }, dataSource: "payment-all", hideIfFiltered: "month" },
    { id: "pay_status_count_breakdown", title: "Payment Count by Status", component: "volume", props: { groupBy: "rawStatus", valueKey: "count" }, dataSource: "payment-all" },
    { id: "pay_status_count_tpp", title: "Payment Count by TPP", component: "volume", props: { groupBy: "tpp", stackBy: "rawStatus", valueKey: "count" }, dataSource: "payment-all", hideIfFiltered: "tpp" }
  ],
  "auth-conversion": [
    { id: "auth_count_lfi", title: "Auth Count by LFI", component: "volume", props: { groupBy: "lfi", stackBy: "type", valueKey: "count", grouped: true }, dataSource: "auth", hideIfFiltered: "lfi" },
    { id: "auth_conversion_lfi", title: "Conversion Rate by LFI", component: "auth-rate", props: { groupBy: "lfi", numeratorType: "doConfirm" }, dataSource: "auth", hideIfFiltered: "lfi" },
    { id: "auth_dropoff_lfi", title: "Drop-off Rate by LFI", component: "auth-rate", props: { groupBy: "lfi", numeratorType: "dropOff" }, dataSource: "auth", hideIfFiltered: "lfi" },
    { id: "auth_count_month", title: "Auth Count by Month", component: "volume", props: { groupBy: "month", stackBy: "type", valueKey: "count", grouped: true }, dataSource: "auth", hideIfFiltered: "month" },
    { id: "auth_conversion_month", title: "Conversion Rate by Month", component: "auth-rate", props: { groupBy: "month", numeratorType: "doConfirm" }, dataSource: "auth", hideIfFiltered: "month" },
    { id: "auth_dropoff_month", title: "Drop-off Rate by Month", component: "auth-rate", props: { groupBy: "month", numeratorType: "dropOff" }, dataSource: "auth", hideIfFiltered: "month" },
    { id: "auth_cancel_lfi", title: "Cancellation Rate by LFI", component: "auth-rate", props: { groupBy: "lfi", numeratorType: "doFail" }, dataSource: "auth", hideIfFiltered: "lfi" },
    { id: "auth_cancel_month", title: "Cancellation Rate by Month", component: "auth-rate", props: { groupBy: "month", numeratorType: "doFail" }, dataSource: "auth", hideIfFiltered: "month" }
  ]
};
const CURRENT_MONTH = (/* @__PURE__ */ new Date()).toISOString().substring(0, 7);
const SUCCESS_STATUSES = /* @__PURE__ */ new Set([
  "AcceptedSettlementCompleted",
  "AcceptedCreditSettlementCompleted",
  "AcceptedWithoutPosting"
]);
const FAILED_STATUSES = /* @__PURE__ */ new Set(["Rejected"]);
const RT_EXCLUDED_ENDPOINTS = [
  "/account-access-consents",
  "/account-access-consents/:consentId",
  "/payment-consents/:consentId",
  "/auth"
];
function transformApiRow(row) {
  const date = row.date ?? "";
  const month = date.substring(0, 7);
  const lfi = row.lfinamekey ?? "Unknown";
  const tpp = row.tppname ?? "Unknown";
  const url = row.url ?? "";
  const familyMatch = url.match(/open-finance\/([^/]+)(?:\/|$)/);
  const family = (familyMatch == null ? void 0 : familyMatch[1]) ?? "other";
  const versionMatch = url.match(/\/(v\d+\.\d+)(\/.*)?$/);
  const version = (versionMatch == null ? void 0 : versionMatch[1]) ?? "unknown";
  const endpoint = (versionMatch == null ? void 0 : versionMatch[2]) ?? (family !== "other" ? `/${family}` : url || "/other");
  const codeGroup = row.tppresponsecodegroup ?? "2xx";
  const isError = codeGroup !== "2xx";
  const volume = row.totalapicalls ?? 0;
  const ttlb = row.executiontime ?? 0;
  const avgMs = volume > 0 ? Math.round(ttlb / volume) : 0;
  return {
    month,
    day: date.substring(0, 10),
    lfi,
    tpp,
    family,
    version,
    endpoint,
    volume,
    errors: isError ? volume : 0,
    status: isError ? "error" : "success",
    avgMs,
    p50: Math.round(avgMs * 0.85),
    p95: Math.round(avgMs * 1.5),
    p99: Math.round(avgMs * 2.2)
  };
}
function transformPaymentRow(row) {
  const date = row.date ?? "";
  const month = date.substring(0, 7) || "unknown";
  const day = date.substring(0, 10) || "unknown";
  const lfi = row.lfinamekey ?? "Unknown";
  const tpp = row.tppname ?? "Unknown";
  const consentType = row.paymentconsenttype ?? "Unknown";
  const count = row.count ?? 0;
  const amount = row.amount ?? 0;
  const rawStatus = row.status ?? "";
  let statusGroup;
  if (SUCCESS_STATUSES.has(rawStatus)) statusGroup = "Successful";
  else if (FAILED_STATUSES.has(rawStatus)) statusGroup = "Failed";
  else statusGroup = "Pending";
  const successCount = statusGroup === "Successful" ? count : 0;
  const failCount = statusGroup === "Failed" ? count : 0;
  return { month, day, lfi, tpp, consentType, count, amount, successCount, failCount, status: statusGroup, rawStatus };
}
function transformAuthRow(row) {
  const date = row.date ?? "";
  const month = date.substring(0, 7) || "unknown";
  const day = date.substring(0, 10) || "unknown";
  const lfi = row.lfinamekey ?? "Unknown";
  const url = row.url ?? "";
  const count = row.totalapicalls ?? 0;
  let type = "other";
  if (url.endsWith("/doConfirm")) type = "doConfirm";
  else if (url.endsWith("/doFail")) type = "doFail";
  else if (url === "/auth") type = "auth";
  return { month, day, lfi, url, type, count };
}
const rawApiData = ref([]);
const rawRtData = ref([]);
const rawPaymentData = ref([]);
const rawAuthData = ref([]);
const lfiSectorMap = reactive({});
const observedInsurerLfis = computed(() => {
  const s = /* @__PURE__ */ new Set();
  for (const r of rawApiData.value) if (r.family === "insurance") s.add(r.lfi);
  return s;
});
function sectorOf(lfi) {
  if (observedInsurerLfis.value.has(lfi)) return "insurance";
  if (lfiSectorMap[lfi] === "insurer") return "insurance";
  return "banking";
}
const filterOptions = reactive({
  lfis: [],
  tpps: [],
  months: [],
  apiFamilies: [],
  paymentLfis: [],
  paymentTpps: [],
  paymentMonths: [],
  authLfis: [],
  authMonths: []
});
function uniqueSorted(values) {
  return [...new Set(values)].sort();
}
let dataRequested = false;
function ensureDashboardData() {
  if (dataRequested) return;
  dataRequested = true;
  loadDataIfClient();
}
function loadDataIfClient() {
  if (typeof window === "undefined") return;
  loadApiLog().then((json) => {
    const arr = Array.isArray(json) ? json : [];
    const rows = arr.map(transformApiRow);
    rawApiData.value = rows;
    rawRtData.value = rows.filter(
      (r) => r.status === "success" && !RT_EXCLUDED_ENDPOINTS.includes(r.endpoint)
    );
  }).catch((err) => console.error("[dashboard] Failed to load the API log", err));
  fetch("/api/payments-log.json").then((r) => r.json()).then((json) => {
    const arr = Array.isArray(json) ? json : [];
    rawPaymentData.value = arr.map(transformPaymentRow);
  }).catch((err) => console.error("[dashboard] Failed to load payments-log.json", err));
  fetch("/api/auth-log.json").then((r) => r.json()).then((json) => {
    const arr = Array.isArray(json) ? json : [];
    rawAuthData.value = arr.map(transformAuthRow);
  }).catch((err) => console.error("[dashboard] Failed to load auth-log.json", err));
  fetch("/api/lfi-sectors.json").then((r) => r.json()).then((json) => {
    if (json && typeof json === "object" && !Array.isArray(json)) {
      Object.assign(lfiSectorMap, json);
    }
  }).catch(() => {
  });
}
const state = reactive({
  filters: { lfi: [], tpp: [], month: [], apiFamily: [] },
  sector: "banking",
  activeSection: "api-volumes",
  sidebarCollapsed: false,
  excludePartialMonths: true
});
watchEffect(() => {
  const sec = state.sector;
  const api = rawApiData.value.filter((r) => sectorOf(r.lfi) === sec);
  filterOptions.lfis = uniqueSorted(api.map((r) => r.lfi));
  filterOptions.tpps = uniqueSorted(api.map((r) => r.tpp));
  filterOptions.months = uniqueSorted(api.map((r) => r.month));
  filterOptions.apiFamilies = uniqueSorted(api.map((r) => r.family));
  const pay = rawPaymentData.value.filter((r) => sectorOf(r.lfi) === sec);
  filterOptions.paymentLfis = uniqueSorted(pay.map((r) => r.lfi).filter((v) => v !== "Unknown"));
  filterOptions.paymentTpps = uniqueSorted(pay.map((r) => r.tpp).filter((v) => v !== "Unknown"));
  filterOptions.paymentMonths = uniqueSorted(pay.map((r) => r.month).filter((v) => v !== "unknown"));
  const auth = rawAuthData.value.filter((r) => sectorOf(r.lfi) === sec);
  filterOptions.authLfis = uniqueSorted(auth.map((r) => r.lfi).filter((v) => v !== "Unknown"));
  filterOptions.authMonths = uniqueSorted(auth.map((r) => r.month).filter((v) => v !== "unknown"));
});
function monthIsAllowed(month) {
  if (state.filters.month.length) return state.filters.month.includes(month);
  if (state.excludePartialMonths && month >= CURRENT_MONTH) return false;
  return true;
}
const filteredApiData = computed(
  () => rawApiData.value.filter(
    (r) => sectorOf(r.lfi) === state.sector && (!state.filters.lfi.length || state.filters.lfi.includes(r.lfi)) && (!state.filters.tpp.length || state.filters.tpp.includes(r.tpp)) && monthIsAllowed(r.month) && (!state.filters.apiFamily.length || state.filters.apiFamily.includes(r.family))
  )
);
const filteredSuccessApiData = computed(
  () => filteredApiData.value.filter((r) => r.status === "success")
);
const filteredPaymentData = computed(
  () => rawPaymentData.value.filter(
    (r) => sectorOf(r.lfi) === state.sector && (!state.filters.lfi.length || state.filters.lfi.includes(r.lfi)) && (!state.filters.tpp.length || state.filters.tpp.includes(r.tpp)) && monthIsAllowed(r.month)
  )
);
const filteredSuccessPaymentData = computed(
  () => filteredPaymentData.value.filter(
    (r) => r.status === "Successful" && r.lfi !== "Unknown"
  )
);
const filteredAllPaymentData = computed(
  () => filteredPaymentData.value.filter((r) => r.lfi !== "Unknown")
);
const filteredAuthData = computed(
  () => rawAuthData.value.filter(
    (r) => sectorOf(r.lfi) === state.sector && (!state.filters.lfi.length || state.filters.lfi.includes(r.lfi)) && monthIsAllowed(r.month)
  )
);
const filteredRtData = computed(
  () => rawRtData.value.filter(
    (r) => sectorOf(r.lfi) === state.sector && (!state.filters.lfi.length || state.filters.lfi.includes(r.lfi)) && (!state.filters.tpp.length || state.filters.tpp.includes(r.tpp)) && monthIsAllowed(r.month) && (!state.filters.apiFamily.length || state.filters.apiFamily.includes(r.family))
  )
);
const kpis = computed(() => {
  const successRows = filteredApiData.value.filter((r) => r.status === "success");
  const errorRows = filteredApiData.value.filter((r) => r.status === "error");
  const totalVol = successRows.reduce((s, r) => s + r.volume, 0);
  const totalErr = errorRows.reduce((s, r) => s + r.volume, 0);
  const rtRows = filteredRtData.value;
  const avgRtMs = rtRows.length ? Math.round(rtRows.reduce((s, r) => s + r.avgMs, 0) / rtRows.length) : 0;
  const successData = filteredSuccessPaymentData.value;
  const allPaymentData = filteredPaymentData.value.filter((r) => r.lfi !== "Unknown");
  const totalPayments = successData.reduce((s, r) => s + r.count, 0);
  const totalAmountAed = successData.reduce((s, r) => s + r.amount, 0);
  const allPaymentCount = allPaymentData.reduce((s, r) => s + r.count, 0);
  const successRate = allPaymentCount > 0 ? (totalPayments / allPaymentCount * 100).toFixed(1) : "0.0";
  const avgPaymentSize = totalPayments > 0 ? (totalAmountAed / totalPayments).toFixed(2) : "0.00";
  const authData = filteredAuthData.value;
  const authCount = authData.filter((r) => r.type === "auth").reduce((s, r) => s + r.count, 0);
  const doConfirmCount = authData.filter((r) => r.type === "doConfirm").reduce((s, r) => s + r.count, 0);
  const doFailCount = authData.filter((r) => r.type === "doFail").reduce((s, r) => s + r.count, 0);
  const conversionRate = authCount > 0 ? (doConfirmCount / authCount * 100).toFixed(1) : "0.0";
  const cancellationRate = authCount > 0 ? (doFailCount / authCount * 100).toFixed(1) : "0.0";
  const doConfirmMonths = uniqueSorted(
    authData.filter((r) => r.type === "doConfirm" && r.month !== "unknown").map((r) => r.month)
  );
  let momGrowth = "0.0";
  if (doConfirmMonths.length >= 2) {
    const latest = doConfirmMonths[doConfirmMonths.length - 1];
    const prior = doConfirmMonths[doConfirmMonths.length - 2];
    const latestCount = authData.filter((r) => r.type === "doConfirm" && r.month === latest).reduce((s, r) => s + r.count, 0);
    const priorCount = authData.filter((r) => r.type === "doConfirm" && r.month === prior).reduce((s, r) => s + r.count, 0);
    if (priorCount > 0) {
      const pct = (latestCount - priorCount) / priorCount * 100;
      momGrowth = `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}`;
    }
  }
  return {
    totalApiCalls: totalVol + totalErr,
    totalApiErrors: totalErr,
    errorRate: totalVol + totalErr > 0 ? (totalErr / (totalVol + totalErr) * 100).toFixed(1) : "0.0",
    avgResponseMs: avgRtMs,
    totalPayments,
    totalAmountAed,
    successRate,
    avgPaymentSize,
    consentsAuthorized: doConfirmCount,
    conversionRate,
    momGrowth,
    cancellationRate
  };
});
function toggleFilter(key, value) {
  const values = state.filters[key];
  const i = values.indexOf(value);
  if (i === -1) values.push(value);
  else values.splice(i, 1);
}
function clearFilter(key) {
  state.filters[key] = [];
}
function resetFilters() {
  state.filters.lfi = [];
  state.filters.tpp = [];
  state.filters.month = [];
  state.filters.apiFamily = [];
  state.excludePartialMonths = true;
}
function setSection(id) {
  state.activeSection = id;
}
function setSector(sector) {
  if (state.sector === sector) return;
  state.sector = sector;
  resetFilters();
  if (!sectionInSector(state.activeSection, sector)) {
    state.activeSection = firstSectionOfSector(sector);
  }
}
function dataForSource(source) {
  switch (source) {
    case "api":
      return filteredApiData.value;
    case "api-success":
      return filteredSuccessApiData.value;
    case "payment":
      return filteredPaymentData.value;
    case "payment-success":
      return filteredSuccessPaymentData.value;
    case "payment-all":
      return filteredAllPaymentData.value;
    case "rt":
      return filteredRtData.value;
    case "auth":
      return filteredAuthData.value;
  }
}
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DashboardChart",
  __ssrInlineRender: true,
  props: {
    config: {},
    data: {}
  },
  setup(__props) {
    Chart.register(
      BarController,
      BarElement,
      LineController,
      LineElement,
      PointElement,
      DoughnutController,
      ArcElement,
      CategoryScale,
      LinearScale,
      Tooltip,
      Legend
    );
    const props = __props;
    const canvasRef = ref(null);
    let chartInstance = null;
    const INLINE_TYPES = [
      "error-rate",
      "error-codes",
      "success-rate",
      "pay-status",
      "pay-size-dist",
      "auth-rate"
    ];
    const ACCENT = {
      teal: "#00C2A9",
      gold: "#B37819",
      navy: "#00277F",
      blue: "#008BE4",
      sky: "#00A2FB",
      blueDeep: "#0043A6",
      mute: "rgba(0,23,56,0.45)"
    };
    const PALETTE = [
      "#00277F",
      "#00C2A9",
      "#008BE4",
      "#B37819",
      "#0043A6",
      "#00A2FB",
      "#008B78",
      "#5F6A8F"
    ];
    function buildStyle() {
      const t = chartTokens();
      return {
        TOOLTIP: {
          backgroundColor: t.tooltipBg,
          titleColor: t.tooltipTitle,
          bodyColor: t.tooltipBody,
          borderRadius: 0,
          padding: 10,
          titleFont: { family: "IBM Plex Mono, monospace", size: 10, weight: 500 },
          bodyFont: { family: "IBM Plex Mono, monospace", size: 10 }
        },
        AXIS_TICK: { color: t.axisTick, font: { family: "Poppins, sans-serif", size: 10 } },
        AXIS_LABEL: { color: t.axisLabel, font: { family: "Poppins, sans-serif", size: 10 } },
        AXIS_TITLE: { font: { family: "IBM Plex Mono, monospace", size: 10, weight: 500 }, color: t.axisTitle },
        GRID: { color: t.grid },
        LEGEND: { boxWidth: 10, boxHeight: 10, font: { family: "Poppins, sans-serif", size: 11 }, color: t.legend },
        POINT_BORDER: t.pointBorder,
        DOUGHNUT_BORDER: t.pointBorder
      };
    }
    function comboTooltipLabel(ctx) {
      const width = Math.max(
        ...ctx.chart.data.datasets.map((d) => String(d.label ?? "").length)
      );
      const name = String(ctx.dataset.label ?? "").padEnd(width);
      const isRate = ctx.dataset.yAxisID === "yRate";
      const value = isRate ? `${ctx.parsed.y}%` : Number(ctx.parsed.y).toLocaleString();
      return `${name}   ${value}`;
    }
    const INTERACTION = { mode: "index", intersect: false };
    function asApiRow(r) {
      return r;
    }
    function asPaymentRow(r) {
      return r;
    }
    function asAuthRow(r) {
      return r;
    }
    function readField(row, key) {
      return row[key];
    }
    const avgErrorRate = computed(() => {
      if (props.config.component !== "error-rate") return "0.00";
      let vol = 0;
      let err = 0;
      for (const row of props.data) {
        const r = asApiRow(row);
        if (r.status === "error") err += r.volume;
        else vol += r.volume;
      }
      return vol + err > 0 ? (err / (vol + err) * 100).toFixed(2) : "0.00";
    });
    const slowestEndpoints = computed(() => {
      if (props.config.component !== "rt-ranked") return [];
      const byEndpoint = {};
      for (const row of props.data) {
        const r = asApiRow(row);
        const key = r.endpoint || r.family;
        const slot = byEndpoint[key] ?? (byEndpoint[key] = { total: 0, n: 0 });
        slot.total += r.avgMs;
        slot.n += 1;
      }
      return Object.entries(byEndpoint).map(([endpoint, { total, n }]) => ({ endpoint, avgMs: Math.round(total / n) })).sort((a, b) => b.avgMs - a.avgMs).slice(0, 8);
    });
    const topRankedAvgMs = computed(() => {
      var _a;
      return ((_a = slowestEndpoints.value[0]) == null ? void 0 : _a.avgMs) ?? 1;
    });
    const authRateSummary = computed(() => {
      var _a;
      if (props.config.component !== "auth-rate") return "";
      const numeratorType = ((_a = props.config.props) == null ? void 0 : _a.numeratorType) ?? "doConfirm";
      let auth = 0;
      let confirm = 0;
      let fail = 0;
      for (const row of props.data) {
        const r = asAuthRow(row);
        if (r.type === "auth") auth += r.count;
        if (r.type === "doConfirm") confirm += r.count;
        if (r.type === "doFail") fail += r.count;
      }
      const num = numeratorType === "doConfirm" ? confirm : numeratorType === "doFail" ? fail : Math.max(0, auth - confirm - fail);
      const rate = auth > 0 ? (num / auth * 100).toFixed(1) : "0.0";
      const label = numeratorType === "doConfirm" ? "conversion" : numeratorType === "doFail" ? "cancellation" : "drop-off";
      return `${rate}% avg ${label} rate`;
    });
    const SIZE_BANDS = [
      { label: "0 – 100", max: 100 },
      { label: "100 – 1K", max: 1e3 },
      { label: "1K – 5K", max: 5e3 },
      { label: "5K – 10K", max: 1e4 },
      { label: "10K – 50K", max: 5e4 },
      { label: "50K+", max: Infinity }
    ];
    const paySizeSummary = computed(() => {
      if (props.config.component !== "pay-size-dist") return "";
      let payments = 0;
      for (const row of props.data) payments += asPaymentRow(row).count;
      return `${payments.toLocaleString()} payments`;
    });
    function destroyChart() {
      chartInstance == null ? void 0 : chartInstance.destroy();
      chartInstance = null;
    }
    function buildErrorRate() {
      var _a;
      const groupBy = ((_a = props.config.props) == null ? void 0 : _a.groupBy) ?? "lfi";
      const byGroup = {};
      for (const row of props.data) {
        const r = asApiRow(row);
        const key = String(readField(r, groupBy) ?? "Unknown");
        if (!key || key.toLowerCase() === "unknown" || key === "/other") continue;
        const slot = byGroup[key] ?? (byGroup[key] = { vol: 0, err: 0 });
        slot.vol += r.volume;
        slot.err += r.errors;
      }
      const labels = Object.keys(byGroup).sort();
      const volumes = labels.map((k) => {
        var _a2;
        return ((_a2 = byGroup[k]) == null ? void 0 : _a2.vol) ?? 0;
      });
      const rates = labels.map((k) => {
        const slot = byGroup[k];
        if (!slot || !slot.vol) return 0;
        return Number((slot.err / slot.vol * 100).toFixed(2));
      });
      const s = buildStyle();
      const config = {
        type: "bar",
        data: {
          labels,
          datasets: [
            { type: "bar", label: "API Calls", data: volumes, backgroundColor: ACCENT.navy, borderRadius: 0, maxBarThickness: 50, yAxisID: "yVol" },
            { type: "line", label: "Error Rate (%)", data: rates, borderColor: ACCENT.gold, backgroundColor: "rgba(179,120,25,0.08)", borderWidth: 2, pointRadius: 4, pointBackgroundColor: ACCENT.gold, pointBorderColor: s.POINT_BORDER, pointBorderWidth: 1, yAxisID: "yRate", tension: 0.3, fill: false }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: { display: true, position: "bottom", labels: s.LEGEND },
            tooltip: { ...s.TOOLTIP, callbacks: { label: comboTooltipLabel } }
          },
          scales: {
            yVol: { beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: "API Calls", ...s.AXIS_TITLE } },
            yRate: { beginAtZero: true, position: "right", grid: { drawOnChartArea: false }, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}%` }, title: { display: true, text: "%", ...s.AXIS_TITLE } },
            x: { grid: { display: false }, ticks: s.AXIS_LABEL }
          }
        }
      };
      chartInstance = new Chart(canvasRef.value, config);
    }
    function buildErrorCodes() {
      const s = buildStyle();
      const config = {
        type: "doughnut",
        data: {
          labels: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "429 Rate Limit", "500 Server Error", "503 Unavailable"],
          datasets: [{
            data: [38, 22, 15, 11, 9, 5],
            backgroundColor: [ACCENT.navy, ACCENT.blue, ACCENT.teal, ACCENT.sky, ACCENT.gold, ACCENT.blueDeep],
            borderWidth: 2,
            borderColor: s.DOUGHNUT_BORDER
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: { legend: { position: "right", labels: { ...s.LEGEND, padding: 8 } }, tooltip: s.TOOLTIP }
        }
      };
      chartInstance = new Chart(canvasRef.value, config);
    }
    function buildSuccessRate() {
      const byLfi = {};
      for (const row of props.data) {
        const r = asPaymentRow(row);
        if (!r.lfi || r.lfi.toLowerCase() === "unknown") continue;
        const slot = byLfi[r.lfi] ?? (byLfi[r.lfi] = { count: 0, success: 0 });
        slot.count += r.count;
        slot.success += r.successCount;
      }
      const labels = Object.keys(byLfi).sort();
      const counts = labels.map((k) => {
        var _a;
        return ((_a = byLfi[k]) == null ? void 0 : _a.count) ?? 0;
      });
      const rates = labels.map((k) => {
        const slot = byLfi[k];
        if (!slot || !slot.count) return 0;
        return Number((slot.success / slot.count * 100).toFixed(1));
      });
      const s = buildStyle();
      const config = {
        type: "bar",
        data: {
          labels,
          datasets: [
            { type: "bar", label: "Payment Count", data: counts, backgroundColor: ACCENT.navy, borderRadius: 0, maxBarThickness: 50, yAxisID: "yCount" },
            { type: "line", label: "Success Rate (%)", data: rates, borderColor: ACCENT.teal, borderWidth: 2, pointRadius: 4, pointBackgroundColor: ACCENT.teal, pointBorderColor: s.POINT_BORDER, pointBorderWidth: 1, yAxisID: "yRate", tension: 0.3, fill: false }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: { display: true, position: "bottom", labels: s.LEGEND },
            tooltip: { ...s.TOOLTIP, callbacks: { label: comboTooltipLabel } }
          },
          scales: {
            yCount: { beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: "Count", ...s.AXIS_TITLE } },
            yRate: { beginAtZero: false, min: 80, max: 100, position: "right", grid: { drawOnChartArea: false }, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}%` }, title: { display: true, text: "%", ...s.AXIS_TITLE } },
            x: { grid: { display: false }, ticks: s.AXIS_LABEL }
          }
        }
      };
      chartInstance = new Chart(canvasRef.value, config);
    }
    function buildPayStatus() {
      const statusMap = {};
      for (const row of props.data) {
        const r = asPaymentRow(row);
        const status = r.status || "Unknown";
        statusMap[status] = (statusMap[status] ?? 0) + r.count;
      }
      const COLORS = {
        Successful: ACCENT.teal,
        Pending: ACCENT.gold,
        Failed: ACCENT.blueDeep
      };
      const labels = Object.keys(statusMap);
      const s = buildStyle();
      const config = {
        type: "doughnut",
        data: {
          labels,
          datasets: [{
            data: labels.map((k) => statusMap[k] ?? 0),
            backgroundColor: labels.map((k) => COLORS[k] ?? ACCENT.mute),
            borderWidth: 2,
            borderColor: s.DOUGHNUT_BORDER
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: { legend: { position: "right", labels: { ...s.LEGEND, padding: 10 } }, tooltip: s.TOOLTIP }
        }
      };
      chartInstance = new Chart(canvasRef.value, config);
    }
    function buildPaySizeDist() {
      const stackByLfi = state.filters.lfi.length !== 1;
      const bandsByLfi = {};
      for (const row of props.data) {
        const r = asPaymentRow(row);
        if (r.count <= 0 || r.amount <= 0) continue;
        if (!r.lfi || r.lfi.toLowerCase() === "unknown") continue;
        const mean = r.amount / r.count;
        const found = SIZE_BANDS.findIndex((b) => mean < b.max);
        const band = found === -1 ? SIZE_BANDS.length - 1 : found;
        const arr = bandsByLfi[r.lfi] ?? (bandsByLfi[r.lfi] = SIZE_BANDS.map(() => 0));
        arr[band] = (arr[band] ?? 0) + r.count;
      }
      const bandTotals = SIZE_BANDS.map(
        (_, i) => Object.values(bandsByLfi).reduce((sum, arr) => sum + (arr[i] ?? 0), 0)
      );
      const ALWAYS_SHOWN = SIZE_BANDS.length - 1;
      const shownBands = SIZE_BANDS.map((_, i) => i).filter((i) => i < ALWAYS_SHOWN || (bandTotals[i] ?? 0) > 0);
      const labels = shownBands.map((i) => SIZE_BANDS[i].label);
      const lfis = Object.keys(bandsByLfi).sort();
      const datasets = stackByLfi && lfis.length > 1 ? lfis.map((lfi, i) => ({
        label: lfi,
        data: shownBands.map((bi) => {
          var _a;
          return ((_a = bandsByLfi[lfi]) == null ? void 0 : _a[bi]) ?? 0;
        }),
        backgroundColor: PALETTE[i % PALETTE.length],
        borderColor: PALETTE[i % PALETTE.length],
        borderWidth: 0,
        borderRadius: 0,
        maxBarThickness: 80,
        stack: "stack"
      })) : [{
        label: "Payments",
        data: shownBands.map((i) => bandTotals[i] ?? 0),
        backgroundColor: ACCENT.navy,
        borderWidth: 0,
        borderRadius: 0,
        maxBarThickness: 80
      }];
      const stacked = datasets.length > 1;
      const s = buildStyle();
      const config = {
        type: "bar",
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: { display: stacked, position: "bottom", labels: s.LEGEND },
            tooltip: {
              ...s.TOOLTIP,
              callbacks: {
                label: (ctx) => stacked ? `  ${String(ctx.dataset.label ?? "")}   ${Number(ctx.parsed.y).toLocaleString()}` : `  ${Number(ctx.parsed.y).toLocaleString()} payments`
              }
            }
          },
          scales: {
            y: { stacked, beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: "Payment Count", ...s.AXIS_TITLE } },
            x: { stacked, grid: { display: false }, ticks: s.AXIS_LABEL, title: { display: true, text: "Mean Ticket Size (AED)", ...s.AXIS_TITLE } }
          }
        }
      };
      chartInstance = new Chart(canvasRef.value, config);
    }
    function buildAuthRate() {
      var _a, _b;
      const groupBy = ((_a = props.config.props) == null ? void 0 : _a.groupBy) ?? "lfi";
      const numeratorType = ((_b = props.config.props) == null ? void 0 : _b.numeratorType) ?? "doConfirm";
      const rateLabel = numeratorType === "doConfirm" ? "Conversion Rate (%)" : numeratorType === "doFail" ? "Cancellation Rate (%)" : "Drop-off Rate (%)";
      const lineColor = numeratorType === "doConfirm" ? ACCENT.teal : numeratorType === "doFail" ? ACCENT.gold : ACCENT.navy;
      const byGroup = {};
      for (const row of props.data) {
        const r = asAuthRow(row);
        const key = String(readField(r, groupBy) ?? "Unknown");
        if (!key || key.toLowerCase() === "unknown") continue;
        const slot = byGroup[key] ?? (byGroup[key] = { auth: 0, confirm: 0, fail: 0 });
        if (r.type === "auth") slot.auth += r.count;
        if (r.type === "doConfirm") slot.confirm += r.count;
        if (r.type === "doFail") slot.fail += r.count;
      }
      const numerator = (slot) => numeratorType === "doConfirm" ? slot.confirm : numeratorType === "doFail" ? slot.fail : Math.max(0, slot.auth - slot.confirm - slot.fail);
      const labels = Object.keys(byGroup).sort();
      const authCounts = labels.map((k) => {
        var _a2;
        return ((_a2 = byGroup[k]) == null ? void 0 : _a2.auth) ?? 0;
      });
      const rates = labels.map((k) => {
        const slot = byGroup[k];
        if (!slot || !slot.auth) return 0;
        return Number((numerator(slot) / slot.auth * 100).toFixed(1));
      });
      const s = buildStyle();
      const config = {
        type: "bar",
        data: {
          labels,
          datasets: [
            { type: "bar", label: "Auth Requests", data: authCounts, backgroundColor: ACCENT.blueDeep, borderRadius: 0, maxBarThickness: 50, yAxisID: "yCount" },
            { type: "line", label: rateLabel, data: rates, borderColor: lineColor, borderWidth: 2, pointRadius: 4, pointBackgroundColor: lineColor, pointBorderColor: s.POINT_BORDER, pointBorderWidth: 1, yAxisID: "yRate", tension: 0.3, fill: false }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: INTERACTION,
          plugins: {
            legend: { display: true, position: "bottom", labels: s.LEGEND },
            tooltip: { ...s.TOOLTIP, callbacks: { label: comboTooltipLabel } }
          },
          scales: {
            yCount: { beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: "Auth Requests", ...s.AXIS_TITLE } },
            yRate: { beginAtZero: true, max: 100, position: "right", grid: { drawOnChartArea: false }, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}%` }, title: { display: true, text: "%", ...s.AXIS_TITLE } },
            x: { grid: { display: false }, ticks: s.AXIS_LABEL }
          }
        }
      };
      chartInstance = new Chart(canvasRef.value, config);
    }
    function buildInlineChart() {
      if (!canvasRef.value) return;
      destroyChart();
      switch (props.config.component) {
        case "error-rate":
          buildErrorRate();
          break;
        case "error-codes":
          buildErrorCodes();
          break;
        case "success-rate":
          buildSuccessRate();
          break;
        case "pay-status":
          buildPayStatus();
          break;
        case "pay-size-dist":
          buildPaySizeDist();
          break;
        case "auth-rate":
          buildAuthRate();
          break;
      }
    }
    onMounted(async () => {
      if (INLINE_TYPES.includes(props.config.component)) {
        await Promise.resolve();
        buildInlineChart();
      }
    });
    watch(() => props.data, async () => {
      if (INLINE_TYPES.includes(props.config.component)) {
        await Promise.resolve();
        buildInlineChart();
      }
    });
    onThemeChange(() => {
      if (INLINE_TYPES.includes(props.config.component)) {
        buildInlineChart();
      }
    });
    onBeforeUnmount(destroyChart);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashApiVolumeChart = __unplugin_components_0$4;
      const _component_DashResponseTimeChart = __unplugin_components_1$1;
      if (__props.config.component === "volume") {
        _push(ssrRenderComponent(_component_DashApiVolumeChart, mergeProps({ data: __props.data }, __props.config.props, {
          title: __props.config.title
        }, _attrs), null, _parent));
      } else if (__props.config.component === "rt") {
        _push(ssrRenderComponent(_component_DashResponseTimeChart, mergeProps({ data: __props.data }, __props.config.props, {
          title: __props.config.title
        }, _attrs), null, _parent));
      } else if (__props.config.component === "error-rate") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-card" }, _attrs))} data-v-7ad6f82c><div class="chart-card__title" data-v-7ad6f82c>${ssrInterpolate(__props.config.title)}</div><div class="chart-card__meta" data-v-7ad6f82c>${ssrInterpolate(unref(avgErrorRate))}% avg error rate</div><div class="chart-card__canvas" data-v-7ad6f82c><canvas data-v-7ad6f82c></canvas></div></div>`);
      } else if (__props.config.component === "error-codes") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-card" }, _attrs))} data-v-7ad6f82c><div class="chart-card__title" data-v-7ad6f82c>${ssrInterpolate(__props.config.title)}</div><div class="chart-card__canvas" data-v-7ad6f82c><canvas data-v-7ad6f82c></canvas></div></div>`);
      } else if (__props.config.component === "success-rate") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-card" }, _attrs))} data-v-7ad6f82c><div class="chart-card__title" data-v-7ad6f82c>${ssrInterpolate(__props.config.title)}</div><div class="chart-card__canvas" data-v-7ad6f82c><canvas data-v-7ad6f82c></canvas></div></div>`);
      } else if (__props.config.component === "pay-status") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-card" }, _attrs))} data-v-7ad6f82c><div class="chart-card__title" data-v-7ad6f82c>${ssrInterpolate(__props.config.title)}</div><div class="chart-card__canvas" data-v-7ad6f82c><canvas data-v-7ad6f82c></canvas></div></div>`);
      } else if (__props.config.component === "pay-size-dist") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-card" }, _attrs))} data-v-7ad6f82c><div class="chart-card__title" data-v-7ad6f82c>${ssrInterpolate(__props.config.title)}</div><div class="chart-card__meta" data-v-7ad6f82c>${ssrInterpolate(unref(paySizeSummary))}</div><div class="chart-card__canvas" data-v-7ad6f82c><canvas data-v-7ad6f82c></canvas></div></div>`);
      } else if (__props.config.component === "auth-rate") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-card" }, _attrs))} data-v-7ad6f82c><div class="chart-card__title" data-v-7ad6f82c>${ssrInterpolate(__props.config.title)}</div><div class="chart-card__meta" data-v-7ad6f82c>${ssrInterpolate(unref(authRateSummary))}</div><div class="chart-card__canvas" data-v-7ad6f82c><canvas data-v-7ad6f82c></canvas></div></div>`);
      } else if (__props.config.component === "rt-ranked") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "chart-card" }, _attrs))} data-v-7ad6f82c><div class="chart-card__title" data-v-7ad6f82c>${ssrInterpolate(__props.config.title)}</div><div class="ranked-list" data-v-7ad6f82c><!--[-->`);
        ssrRenderList(unref(slowestEndpoints), (item, idx) => {
          _push(`<div class="ranked-row" data-v-7ad6f82c><span class="rank-num" data-v-7ad6f82c>${ssrInterpolate(String(idx + 1).padStart(2, "0"))}</span><div class="rank-content" data-v-7ad6f82c><div class="rank-top" data-v-7ad6f82c><span class="rank-label" data-v-7ad6f82c>${ssrInterpolate(item.endpoint)}</span><span class="rank-value" data-v-7ad6f82c>${ssrInterpolate(item.avgMs)}ms</span></div><div class="rank-bar-track" data-v-7ad6f82c><div class="rank-bar-fill" style="${ssrRenderStyle({ width: `${item.avgMs / unref(topRankedAvgMs) * 100}%` })}" data-v-7ad6f82c></div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashboardChart.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __unplugin_components_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-7ad6f82c"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DashboardCharts",
  __ssrInlineRender: true,
  setup(__props) {
    function datedFilename(prefix, ext = "csv") {
      const iso = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      return `${prefix}-${iso}.${ext}`;
    }
    const meta = computed(
      () => SECTION_META[state.activeSection] ?? { title: "", description: "" }
    );
    const sectionEyebrow = computed(() => {
      const s = state.activeSection;
      if (s.startsWith("payment")) return "Payments";
      if (s.startsWith("auth")) return "Authentication";
      if (s.startsWith("rt") || s === "response-time") return "Performance";
      return "API Hub";
    });
    const visibleCharts = computed(() => {
      const configs = CHART_REGISTRY[state.activeSection] ?? [];
      const hasAnyFilter = Object.values(state.filters).some((v) => v.length > 0);
      const monthFiltered = state.filters.month.length === 1;
      return configs.filter((c) => {
        if (c.hideIfFiltered && c.hideIfFiltered !== "month" && state.filters[c.hideIfFiltered].length === 1) return false;
        if (c.showOnlyIfFiltered === true && !hasAnyFilter) return false;
        if (typeof c.showOnlyIfFiltered === "string" && !state.filters[c.showOnlyIfFiltered].length) return false;
        return true;
      }).map((c) => {
        var _a, _b;
        if (!monthFiltered) return c;
        const isByMonth = ((_a = c.props) == null ? void 0 : _a.groupBy) === "month" || c.hideIfFiltered === "month" || ((_b = c.props) == null ? void 0 : _b.mode) === "avg-line";
        if (!isByMonth) return c;
        return {
          ...c,
          title: c.title.replace("by Month", "by Day"),
          props: { ...c.props, groupBy: "day" }
        };
      });
    });
    const recordCount = computed(() => {
      const section = state.activeSection;
      if (section === "api-volumes") return filteredSuccessApiData.value.length;
      if (section.startsWith("api")) return filteredApiData.value.length;
      if (section.startsWith("payment")) return filteredPaymentData.value.length;
      return filteredRtData.value.length;
    });
    const csvExport = computed(() => {
      const s = state.activeSection;
      if (s.startsWith("payment")) {
        return {
          label: "Download payments log",
          filename: datedFilename("payments-log"),
          rows: filteredPaymentData.value,
          columns: ["day", "month", "lfi", "tpp", "consentType", "status", "rawStatus", "count", "amount", "successCount", "failCount"]
        };
      }
      if (s.startsWith("auth")) {
        return {
          label: "Download auth log",
          filename: datedFilename("auth-log"),
          rows: filteredAuthData.value,
          columns: ["day", "month", "lfi", "url", "type", "count"]
        };
      }
      if (s.startsWith("api") || s === "response-time" || s.startsWith("rt")) {
        return {
          label: "Download API log",
          filename: datedFilename("api-log"),
          rows: filteredApiData.value,
          columns: ["day", "month", "lfi", "tpp", "family", "version", "endpoint", "status", "volume", "errors", "avgMs", "p50", "p95", "p99"]
        };
      }
      return null;
    });
    function dataFor(source) {
      return dataForSource(source);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardChart = __unplugin_components_0$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "db-charts" }, _attrs))} data-v-eb61976b><div class="db-charts__header" data-v-eb61976b><div class="db-charts__title-block" data-v-eb61976b><span class="db-charts__eyebrow" data-v-eb61976b>§ ${ssrInterpolate(unref(sectionEyebrow))}</span><h2 class="db-charts__title" data-v-eb61976b>${ssrInterpolate(unref(meta).title)}</h2><p class="db-charts__desc" data-v-eb61976b>${ssrInterpolate(unref(meta).description)}</p></div><div class="db-charts__actions" data-v-eb61976b><span class="db-charts__count" data-v-eb61976b>${ssrInterpolate(unref(recordCount).toLocaleString())} records</span>`);
      if (unref(csvExport)) {
        _push(`<button class="db-charts__csv"${ssrIncludeBooleanAttr(!unref(csvExport).rows.length) ? " disabled" : ""} data-v-eb61976b><svg width="12" height="12" viewBox="0 0 24 24" fill="none" data-v-eb61976b><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-eb61976b></path></svg> ${ssrInterpolate(unref(csvExport).label)}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="db-charts__grid" data-v-eb61976b><!--[-->`);
      ssrRenderList(unref(visibleCharts), (chart) => {
        _push(`<div class="db-charts__cell" style="${ssrRenderStyle({
          gridColumn: chart.span ? `span ${chart.span}` : void 0,
          gridRow: chart.rowSpan ? `span ${chart.rowSpan}` : void 0,
          maxHeight: chart.maxHeight || void 0
        })}" data-v-eb61976b>`);
        _push(ssrRenderComponent(_component_DashboardChart, {
          config: chart,
          data: dataFor(chart.dataSource)
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashboardCharts.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-eb61976b"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DashboardMetricCards",
  __ssrInlineRender: true,
  setup(__props) {
    const isPaymentSection = computed(() => state.activeSection.startsWith("payment"));
    const isAuthSection = computed(() => state.activeSection.startsWith("auth"));
    const ACCENT = {
      teal: "#00C2A9",
      tealDeep: "#008B78",
      gold: "#B37819",
      navy: "#00277F",
      blue: "#008BE4",
      blueDeep: "#0043A6"
    };
    const cards = computed(() => {
      if (isAuthSection.value) {
        return [
          {
            id: "consents-authorized",
            label: "Consents authorized",
            value: kpis.value.consentsAuthorized.toLocaleString(),
            color: ACCENT.tealDeep
          },
          {
            id: "conversion-rate",
            label: "Conversion rate",
            value: `${kpis.value.conversionRate}%`,
            color: ACCENT.navy
          },
          {
            id: "mom-growth",
            label: "MoM growth in consents",
            value: `${kpis.value.momGrowth}%`,
            color: ACCENT.blue
          },
          {
            id: "cancellation-rate",
            label: "Cancellation rate",
            value: `${kpis.value.cancellationRate}%`,
            color: ACCENT.gold
          }
        ];
      }
      if (isPaymentSection.value) {
        return [
          {
            id: "payments",
            label: "Successful payments",
            value: kpis.value.totalPayments.toLocaleString(),
            color: ACCENT.navy
          },
          {
            id: "payment-amount",
            label: "Successful amount (AED)",
            value: kpis.value.totalAmountAed.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            color: ACCENT.blueDeep
          },
          {
            id: "success-rate",
            label: "Payment success rate",
            value: `${kpis.value.successRate}%`,
            color: ACCENT.tealDeep
          },
          {
            id: "avg-payment-size",
            label: "Avg payment size (AED)",
            value: Number(kpis.value.avgPaymentSize).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            color: ACCENT.gold
          }
        ];
      }
      return [
        {
          id: "api-calls",
          label: "Total API calls",
          value: kpis.value.totalApiCalls.toLocaleString(),
          color: ACCENT.teal
        },
        {
          id: "api-errors",
          label: "Total API errors",
          value: kpis.value.totalApiErrors.toLocaleString(),
          color: ACCENT.gold
        },
        {
          id: "error-rate",
          label: "API error rate",
          value: `${kpis.value.errorRate}%`,
          color: ACCENT.blueDeep
        },
        {
          id: "avg-response",
          label: "Avg response time",
          value: `${kpis.value.avgResponseMs}ms`,
          color: ACCENT.tealDeep
        }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "db-kpi-row" }, _attrs))} data-v-ae960519><!--[-->`);
      ssrRenderList(unref(cards), (card) => {
        _push(`<div class="db-kpi-card" style="${ssrRenderStyle({ "--accent": card.color })}" data-v-ae960519><div class="db-kpi-card__icon" data-v-ae960519>`);
        if (card.id === "api-calls") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "payments") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2" data-v-ae960519></rect><path d="M2 10h20" stroke="currentColor" stroke-width="2" data-v-ae960519></path><circle cx="7" cy="15" r="1.5" fill="currentColor" data-v-ae960519></circle></svg>`);
        } else if (card.id === "error-rate") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" data-v-ae960519></circle><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "success-rate") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" data-v-ae960519></circle><path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "api-errors") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" data-v-ae960519></path><path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "avg-response") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" data-v-ae960519></circle><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "payment-amount") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "avg-payment-size") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><path d="M3 3h18M3 9h18M3 15h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-ae960519></path><circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2" data-v-ae960519></circle><path d="M18 16.5v1.5l1 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "consents-authorized") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" data-v-ae960519></path><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "conversion-rate") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><path d="M4 17l5-5 4 4 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ae960519></path><path d="M14 9h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "mom-growth") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><path d="M3 20V10M9 20V4M15 20v-8M21 20V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-ae960519></path></svg>`);
        } else if (card.id === "cancellation-rate") {
          _push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" data-v-ae960519><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" data-v-ae960519></circle><path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-ae960519></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="db-kpi-card__body" data-v-ae960519><div class="db-kpi-card__value" data-v-ae960519>${ssrInterpolate(card.value)}</div><div class="db-kpi-card__label" data-v-ae960519>${ssrInterpolate(card.label)}</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashboardMetricCards.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __unplugin_components_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-ae960519"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DashboardSidebar",
  __ssrInlineRender: true,
  props: {
    sections: {},
    activeSection: {},
    sector: {},
    collapsed: { type: Boolean, default: false }
  },
  emits: ["select", "select-sector"],
  setup(__props, { emit: __emit }) {
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["db-sidebar", { "is-open": open.value, "is-mobile-open": !__props.collapsed }],
        "aria-label": "Metrics"
      }, _attrs))} data-v-3319f59f><div class="db-sidebar__hit" data-v-3319f59f><div class="db-sidebar__rail" aria-hidden="true" data-v-3319f59f></div><button type="button" class="db-sidebar__tab"${ssrRenderAttr("aria-expanded", open.value)} aria-controls="db-sidebar-nav" tabindex="0" data-v-3319f59f><svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true" data-v-3319f59f><path d="M1 1.5h14M1 7h10M1 12.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" data-v-3319f59f></path></svg><span class="db-sidebar__tab-text" data-v-3319f59f>Sidebar</span></button></div><div id="db-sidebar-nav" class="db-sidebar__drawer" data-v-3319f59f><header class="db-sidebar__head" data-v-3319f59f><span class="db-sidebar__title" data-v-3319f59f>Metrics</span></header><div class="db-sidebar__sectors" role="tablist" aria-label="LFI sector" data-v-3319f59f><!--[-->`);
      ssrRenderList(unref(SECTORS), (s) => {
        _push(`<button type="button" role="tab" class="${ssrRenderClass([{ "is-active": __props.sector === s.id }, "db-sidebar__sector"])}"${ssrRenderAttr("aria-selected", __props.sector === s.id ? "true" : "false")} data-v-3319f59f>${ssrInterpolate(s.label)}</button>`);
      });
      _push(`<!--]--></div><nav class="db-sidebar__nav" data-v-3319f59f><ul class="db-sidebar__list" data-v-3319f59f><!--[-->`);
      ssrRenderList(__props.sections, (group) => {
        _push(`<li class="db-sidebar__group" data-v-3319f59f><span class="db-sidebar__group-label" data-v-3319f59f>${ssrInterpolate(group.label)}</span><ul class="db-sidebar__items" data-v-3319f59f><!--[-->`);
        ssrRenderList(group.items, (item) => {
          _push(`<li data-v-3319f59f><button type="button" class="${ssrRenderClass([{ "is-active": __props.activeSection === item.id }, "db-sidebar__item"])}" data-v-3319f59f>${ssrInterpolate(item.label)}</button></li>`);
        });
        _push(`<!--]--></ul></li>`);
      });
      _push(`<!--]--></ul></nav></div></aside>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashboardSidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-3319f59f"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DashboardMultiSelect",
  __ssrInlineRender: true,
  props: {
    label: {},
    allLabel: {},
    options: {},
    selected: {}
  },
  emits: ["toggle", "clear"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const open = ref(false);
    const root = ref(null);
    const summary = computed(() => {
      if (props.selected.length === 0) return props.allLabel;
      if (props.selected.length === 1) return props.selected[0] ?? props.allLabel;
      return `${props.selected.length} selected`;
    });
    function isChecked(opt) {
      return props.selected.includes(opt);
    }
    function onDocPointer(ev) {
      if (root.value && !root.value.contains(ev.target)) open.value = false;
    }
    function onDocKey(ev) {
      if (ev.key === "Escape") open.value = false;
    }
    watch(open, (isOpen) => {
      if (typeof document === "undefined") return;
      if (isOpen) {
        document.addEventListener("mousedown", onDocPointer);
        document.addEventListener("keydown", onDocKey);
      } else {
        document.removeEventListener("mousedown", onDocPointer);
        document.removeEventListener("keydown", onDocKey);
      }
    });
    onBeforeUnmount(() => {
      if (typeof document === "undefined") return;
      document.removeEventListener("mousedown", onDocPointer);
      document.removeEventListener("keydown", onDocKey);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "root",
        ref: root,
        class: ["db-ms", { "is-open": open.value }]
      }, _attrs))} data-v-1ee630d3><button type="button" class="${ssrRenderClass([{ "is-active": __props.selected.length > 0 }, "db-ms__button"])}"${ssrRenderAttr("aria-expanded", open.value)} data-v-1ee630d3><span class="db-ms__summary" data-v-1ee630d3>${ssrInterpolate(summary.value)}</span><svg class="db-ms__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" data-v-1ee630d3><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-1ee630d3></path></svg></button>`);
      if (open.value) {
        _push(`<div class="db-ms__panel" data-v-1ee630d3>`);
        if (__props.selected.length) {
          _push(`<button type="button" class="db-ms__clear" data-v-1ee630d3> Clear ${ssrInterpolate(__props.label)}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<ul class="db-ms__list" data-v-1ee630d3><!--[-->`);
        ssrRenderList(__props.options, (opt) => {
          _push(`<li data-v-1ee630d3><label class="db-ms__option" data-v-1ee630d3><input type="checkbox" class="db-ms__checkbox"${ssrIncludeBooleanAttr(isChecked(opt)) ? " checked" : ""} data-v-1ee630d3><span class="db-ms__option-label" data-v-1ee630d3>${ssrInterpolate(opt)}</span></label></li>`);
        });
        _push(`<!--]-->`);
        if (!__props.options.length) {
          _push(`<li class="db-ms__empty" data-v-1ee630d3>No options</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashboardMultiSelect.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __unplugin_components_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1ee630d3"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DashboardFilters",
  __ssrInlineRender: true,
  setup(__props) {
    const FILTER_DEFS_API = [
      { key: "lfi", label: "LFI", allLabel: "All LFIs", optKey: "lfis" },
      { key: "tpp", label: "TPP", allLabel: "All TPPs", optKey: "tpps" },
      { key: "month", label: "Month", allLabel: "All Months", optKey: "months" },
      { key: "apiFamily", label: "API Family", allLabel: "All Families", optKey: "apiFamilies" }
    ];
    const FILTER_DEFS_PAYMENT = [
      { key: "lfi", label: "LFI", allLabel: "All LFIs", optKey: "paymentLfis" },
      { key: "tpp", label: "TPP", allLabel: "All TPPs", optKey: "paymentTpps" },
      { key: "month", label: "Month", allLabel: "All Months", optKey: "paymentMonths" }
    ];
    const isPaymentSection = computed(() => state.activeSection.startsWith("payment"));
    const filterDefs = computed(
      () => isPaymentSection.value ? FILTER_DEFS_PAYMENT : FILTER_DEFS_API
    );
    const LABELS = {
      lfi: "LFI",
      tpp: "TPP",
      month: "Month",
      apiFamily: "Family"
    };
    const activeEntries = computed(
      () => Object.entries(state.filters).flatMap(([key, values]) => values.map((value) => ({ key, value })))
    );
    const hasActiveFilters = computed(
      () => activeEntries.value.length > 0 || !state.excludePartialMonths
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardMultiSelect = __unplugin_components_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "db-filters" }, _attrs))} data-v-c553ee59><div class="db-filters__controls" data-v-c553ee59><!--[-->`);
      ssrRenderList(unref(filterDefs), (f) => {
        _push(`<div class="db-filters__group" data-v-c553ee59><label class="db-filters__label" data-v-c553ee59>${ssrInterpolate(f.label)}</label>`);
        _push(ssrRenderComponent(_component_DashboardMultiSelect, {
          label: f.label,
          "all-label": f.allLabel,
          options: unref(filterOptions)[f.optKey],
          selected: unref(state).filters[f.key],
          onToggle: ($event) => unref(toggleFilter)(f.key, $event),
          onClear: ($event) => unref(clearFilter)(f.key)
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><button class="db-filters__reset"${ssrIncludeBooleanAttr(!unref(hasActiveFilters)) ? " disabled" : ""} data-v-c553ee59><svg width="12" height="12" viewBox="0 0 24 24" fill="none" data-v-c553ee59><path d="M1 4v6h6M23 20v-6h-6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c553ee59></path></svg> Reset </button></div><div class="db-filters__chips" data-v-c553ee59><label class="${ssrRenderClass([{ "is-off": !unref(state).excludePartialMonths }, "db-filters__chip db-filters__chip--toggle"])}" title="Hide the current calendar month while it is still in progress." data-v-c553ee59><input type="checkbox" class="db-filters__chip-input"${ssrIncludeBooleanAttr(unref(state).excludePartialMonths) ? " checked" : ""} data-v-c553ee59> Full months only </label><!--[-->`);
      ssrRenderList(unref(activeEntries), (entry) => {
        _push(`<span class="db-filters__chip" data-v-c553ee59>${ssrInterpolate(LABELS[entry.key])}: ${ssrInterpolate(entry.value)} <svg width="8" height="8" viewBox="0 0 8 8" fill="none" data-v-c553ee59><path d="M1 1l6 6M7 1L1 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" data-v-c553ee59></path></svg></span>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashboardFilters.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __unplugin_components_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c553ee59"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DashboardNavbar",
  __ssrInlineRender: true,
  emits: ["toggle-sidebar"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardFilters = __unplugin_components_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "db-navbar" }, _attrs))} data-v-04b83aa9><div class="db-navbar__inner" data-v-04b83aa9><div class="db-navbar__left" data-v-04b83aa9><button class="db-navbar__menu-btn" aria-label="Toggle sidebar" data-v-04b83aa9><svg width="18" height="18" viewBox="0 0 24 24" fill="none" data-v-04b83aa9><path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-04b83aa9></path></svg></button><div class="db-navbar__title-wrap" data-v-04b83aa9><span class="db-navbar__eyebrow" data-v-04b83aa9>§ Metrics</span><h1 class="db-navbar__title" data-v-04b83aa9>Open Finance Dashboard</h1></div></div><div class="db-navbar__right" data-v-04b83aa9>`);
      _push(ssrRenderComponent(_component_DashboardFilters, null, null, _parent));
      _push(`</div></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/dashboard/DashboardNavbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-04b83aa9"]]);
const MOBILE_BREAKPOINT = 959;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "metrics",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = computed(() => SECTOR_NAV[state.sector]);
    const SECTOR_IDS = SECTORS.map((s) => s.id);
    const ALL_SECTION_IDS = [
      ...new Set(Object.values(SECTOR_NAV).flatMap((g) => g.flatMap((s) => s.items.map((i) => i.id))))
    ];
    const sectorParam = useUrlSearchParam("sector", "banking", { allowed: SECTOR_IDS });
    const sectionParam = useUrlSearchParam("section", "api-volumes", { allowed: ALL_SECTION_IDS });
    watch(sectorParam.value, (next) => {
      if (next !== state.sector) setSector(next);
    }, { immediate: true });
    watch(() => state.sector, (next) => {
      if (next !== sectorParam.value.value) sectorParam.value.value = next;
    });
    watch(sectionParam.value, (next) => {
      if (next !== state.activeSection) state.activeSection = next;
    }, { immediate: true });
    watch(() => state.activeSection, (next) => {
      if (next !== sectionParam.value.value) sectionParam.value.value = next;
    });
    if (!sectionInSector(state.activeSection, state.sector)) {
      state.activeSection = firstSectionOfSector(state.sector);
    }
    onMounted(() => {
      ensureDashboardData();
      if (typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT) {
        state.sidebarCollapsed = true;
      }
    });
    function onToggleSidebar() {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    }
    function onSelect(id) {
      setSection(id);
      if (typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT) {
        state.sidebarCollapsed = true;
      }
    }
    function onSelectSector(id) {
      setSector(id);
    }
    onUnmounted(() => resetFilters());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DashboardNavbar = __unplugin_components_0;
      const _component_DashboardSidebar = __unplugin_components_1;
      const _component_DashboardMetricCards = __unplugin_components_2;
      const _component_ClientOnly = resolveComponent("ClientOnly");
      const _component_DashboardCharts = __unplugin_components_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "db-shell" }, _attrs))} data-v-39dc6097>`);
      _push(ssrRenderComponent(_component_DashboardNavbar, { onToggleSidebar }, null, _parent));
      _push(ssrRenderComponent(_component_DashboardSidebar, {
        sections: unref(sections),
        "active-section": unref(state).activeSection,
        sector: unref(state).sector,
        collapsed: unref(state).sidebarCollapsed,
        onSelect,
        onSelectSector
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([{ "is-visible": !unref(state).sidebarCollapsed }, "db-shell__scrim"])}" data-v-39dc6097></div><div class="db-shell__body" data-v-39dc6097><div class="db-shell__main" data-v-39dc6097>`);
      _push(ssrRenderComponent(_component_DashboardMetricCards, null, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="db-shell__chart-placeholder" data-v-39dc6097${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "db-shell__chart-placeholder" })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DashboardCharts, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DashboardCharts)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
if (typeof block0 === "function") block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/metrics.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const metrics = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39dc6097"]]);
export {
  metrics as default
};

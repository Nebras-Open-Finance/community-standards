import { onBeforeUnmount } from "vue";
const LIGHT = {
  axisTick: "rgba(0, 23, 56, 0.55)",
  axisLabel: "rgba(0, 23, 56, 0.72)",
  axisTitle: "rgba(0, 23, 56, 0.55)",
  grid: "rgba(0, 39, 127, 0.08)",
  legend: "#001738",
  tooltipBg: "#001738",
  tooltipTitle: "#FAFAF7",
  tooltipBody: "#D7DEE8",
  pointBorder: "#FFFFFF"
};
const DARK = {
  axisTick: "rgba(232, 238, 246, 0.62)",
  axisLabel: "rgba(232, 238, 246, 0.82)",
  axisTitle: "rgba(232, 238, 246, 0.62)",
  grid: "rgba(255, 255, 255, 0.10)",
  legend: "#E8EEF6",
  tooltipBg: "#1A2440",
  tooltipTitle: "#FAFAF7",
  tooltipBody: "#D7DEE8",
  pointBorder: "#161F33"
};
function chartTokens() {
  if (typeof document === "undefined") return LIGHT;
  return document.documentElement.classList.contains("dark") ? DARK : LIGHT;
}
const subscribers = /* @__PURE__ */ new Set();
let observer = null;
function ensureObserver() {
  if (observer || typeof document === "undefined") return;
  observer = new MutationObserver(() => {
    subscribers.forEach((cb) => cb());
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"]
  });
}
function maybeTeardown() {
  if (subscribers.size === 0 && observer) {
    observer.disconnect();
    observer = null;
  }
}
function onThemeChange(cb) {
  if (typeof document === "undefined") return;
  ensureObserver();
  subscribers.add(cb);
  onBeforeUnmount(() => {
    subscribers.delete(cb);
    maybeTeardown();
  });
}
export {
  chartTokens as c,
  onThemeChange as o
};

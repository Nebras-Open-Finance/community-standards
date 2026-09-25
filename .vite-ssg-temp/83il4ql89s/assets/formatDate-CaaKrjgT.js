function formatDateTime(iso) {
  return new Date(iso).toLocaleString("en-UK", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}
function formatDate(iso) {
  return new Date(iso).toLocaleString("en-UK", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
}
export {
  formatDateTime as a,
  formatDate as f
};

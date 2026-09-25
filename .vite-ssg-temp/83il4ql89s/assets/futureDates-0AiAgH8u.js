function futureDateOnly(daysAhead) {
  const d = /* @__PURE__ */ new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}
function futureDateTime(daysAhead) {
  return `${futureDateOnly(daysAhead)}T23:59:59.000Z`;
}
function generateScheduleDates(count = 12, startInDays = 10, stepDays = 28) {
  return Array.from(
    { length: count },
    (_, i) => futureDateOnly(startInDays + i * stepDays)
  );
}
export {
  futureDateOnly as a,
  futureDateTime as f,
  generateScheduleDates as g
};

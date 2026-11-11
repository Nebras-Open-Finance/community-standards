<script setup lang="ts">
// Optional guidance for the LFI's GET /payments/{paymentId}: answer it from the
// API Hub Consent Manager's payment log instead of keeping an own copy of each
// payment. Rendered inside the GET /payments/{paymentId} section of every LFI
// payment API guide, v2.1 and v2.2-rc2.
//
// Version differences (from the Consent Manager specs):
//   v2.1      GET /payment-log takes consentId only and returns every payment
//             under the consent. A PATCH may write paymentResponse.OpenFinanceBilling.
//   v2.2-rc2  GET /payment-log is paged (page, pageSize, default 25). Every PATCH
//             writes paymentResponse.paymentRail; OpenFinanceBilling is no longer
//             patchable.

const props = defineProps<{
  version: 'v2.1' | 'v2.2-rc2'
}>()

const paged = computed(() => props.version !== 'v2.1')
const base = computed(() => `/tech/lfi-api-hub/${props.version}`)

const findNodeV21 = `async function findLogEntry(consentId: string, paymentId: string) {
  const log = await cm.get(\`/payment-log?consentId=\${encodeURIComponent(consentId)}\`)
  return log.data.find((e) => e.paymentId === paymentId) ?? null
}`

const findNodePaged = `const PAGE_SIZE = 25

async function findLogEntry(consentId: string, paymentId: string) {
  for (let page = 1; ; page++) {
    const log = await cm.get(
      \`/payment-log?consentId=\${encodeURIComponent(consentId)}&page=\${page}&pageSize=\${PAGE_SIZE}\`,
    )
    const entry = log.data.find((e) => e.paymentId === paymentId)
    if (entry) return entry
    if (log.data.length < PAGE_SIZE) return null
  }
}`

const billingNode = `
  // A v2.1 PATCH can record the billing count under paymentResponse.OpenFinanceBilling.
  const count = p.OpenFinanceBilling?.NumberOfSuccessfulTransactions
  if (count !== undefined && data.openFinanceBilling) {
    data.openFinanceBilling = { ...data.openFinanceBilling, NumberOfSuccessfulTransactions: count }
  }
`

const findPythonV21 = `def find_log_entry(consent_id: str, payment_id: str) -> dict | None:
    log = cm.get("/payment-log", params={"consentId": consent_id})
    return next((e for e in log["data"] if e["paymentId"] == payment_id), None)`

const findPythonPaged = `PAGE_SIZE = 25

def find_log_entry(consent_id: str, payment_id: str) -> dict | None:
    page = 1
    while True:
        log = cm.get("/payment-log", params={
            "consentId": consent_id, "page": page, "pageSize": PAGE_SIZE,
        })
        entry = next((e for e in log["data"] if e["paymentId"] == payment_id), None)
        if entry:
            return entry
        if len(log["data"]) < PAGE_SIZE:
            return None
        page += 1`

const billingPython = `
    # A v2.1 PATCH can record the billing count under paymentResponse.OpenFinanceBilling.
    count = (p.get("OpenFinanceBilling") or {}).get("NumberOfSuccessfulTransactions")
    if count is not None and "openFinanceBilling" in data:
        data["openFinanceBilling"] = {**data["openFinanceBilling"], "NumberOfSuccessfulTransactions": count}
`

const tabs = computed(() => {
  const v21 = props.version === 'v2.1'

  const node = `// Answer GET /payments/{paymentId} from the API Hub payment log.
// \`cm.get\` is your Consent Manager client: the same connection your LFI uses
// for PATCH /payment-log/{id}. It returns the parsed JSON body.

${v21 ? findNodeV21 : findNodePaged}

// Fields copied from paymentResponse only when present, so an absent field is
// omitted rather than sent empty.
const OPTIONAL = ['paymentTransactionId', 'rejectReasonCode', 'instruction', 'debtorReference', 'openFinanceBilling']

async function getPayment(headers: Record<string, string>, paymentId: string) {
  const entry = await findLogEntry(headers['o3-consent-id'], paymentId)
  if (!entry) return null // 404 Resource.NotFound

  const p = entry.paymentResponse
  const data: Record<string, any> = {
    id: entry.paymentId,
    consentId: entry.consentId,
    status: p.status,
    statusUpdateDateTime: p.statusUpdateDateTime,
    creationDateTime: p.creationDateTime,
    paymentPurposeCode: p.paymentPurposeCode,
  }
  for (const key of OPTIONAL) if (p[key] !== undefined) data[key] = p[key]
${v21 ? billingNode : ''}
  return { data, meta: {} }
}
`

  const python = `# Answer GET /payments/{paymentId} from the API Hub payment log.
# \`cm.get\` is your Consent Manager client: the same connection your LFI uses
# for PATCH /payment-log/{id}. It returns the parsed JSON body.

${v21 ? findPythonV21 : findPythonPaged}

# Fields copied from paymentResponse only when present, so an absent field is
# omitted rather than sent empty.
OPTIONAL = ["paymentTransactionId", "rejectReasonCode", "instruction", "debtorReference", "openFinanceBilling"]

def get_payment(headers: dict, payment_id: str) -> dict | None:
    entry = find_log_entry(headers["o3-consent-id"], payment_id)
    if entry is None:
        return None  # 404 Resource.NotFound

    p = entry["paymentResponse"]
    data = {
        "id": entry["paymentId"],
        "consentId": entry["consentId"],
        "status": p["status"],
        "statusUpdateDateTime": p["statusUpdateDateTime"],
        "creationDateTime": p["creationDateTime"],
        "paymentPurposeCode": p["paymentPurposeCode"],
    }
    data.update({k: p[k] for k in OPTIONAL if k in p})
${v21 ? billingPython : ''}
    return {"data": data, "meta": {}}
`

  return [
    { label: 'Node.js', lang: 'typescript', code: node },
    { label: 'Python', lang: 'python', code: python },
  ] as const
})
</script>

<template>
  <div class="ag-step">
    <h3 id="payment-status-from-log" class="ag-step__subhead">Optional: answer from the API Hub payment log</h3>

    <EdProse>
      Your LFI MAY build this response from the API Hub payment log instead of keeping its own
      copy of each payment. When your LFI returns the <code>201</code> on
      <a :href="`${base}/banking/service-initiation/open-api/payments`" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>,
      the Consent Manager stores its <code>data</code> object as the payment log entry's
      <code>paymentResponse</code>, and applies each
      <a :href="`${base}/api-hub/consent-manager/open-api/payment-log-id`" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></a>
      to it. The <code>201</code> and this endpoint share one schema, so the entry already holds
      every field this response needs, carrying the status your LFI last PATCHed.
    </EdProse>

    <EdProse>
      A response built this way meets rules 2 and 3 by construction: <code>status</code> and
      <code>paymentTransactionId</code> are read from the record your PATCHes wrote. The API Hub
      keeps payment log entries well beyond the 1-year sustain period, so rule 1 is met without
      a copy of your own.
    </EdProse>

    <h4 class="ag-step__subhead ag-step__subhead--small">Steps</h4>
    <EdRefTable>
      <table>
        <thead><tr><th>#</th><th>Step</th></tr></thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Read the consent ID from the <code>o3-consent-id</code> request header, which the API Hub sends on every call to this endpoint</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              Call
              <a :href="`${base}/api-hub/consent-manager/open-api/payment-log`" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payment-log?consentId={consentId}</code></a>
              on the Consent Manager, over the same connection your LFI uses for
              <span class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></span>.
              <template v-if="paged">
                The response is paged, 25 entries per page unless you set <code>pageSize</code>.
                If the payment is not on the first page, request the next (<code>page=2</code>,
                and so on) until you find it or a page returns fewer entries than the page size
              </template>
              <template v-else>
                The response lists every payment made under the consent. <code>consentId</code>
                is the only query parameter
              </template>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Select the entry whose <code>paymentId</code> equals the <code>paymentId</code> path parameter. Do not rely on the order of the entries. If no entry matches, the payment does not exist under this consent: return <code>404</code> <code>Resource.NotFound</code></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Build the response <code>data</code> from the entry, using the mapping below</td>
          </tr>
        </tbody>
      </table>
    </EdRefTable>

    <EdProse>
      If the Consent Manager cannot be reached or does not return <code>200</code>, return
      <code>500</code> <code>GenericRecoverableError</code>.
    </EdProse>

    <h4 class="ag-step__subhead ag-step__subhead--small">Field mapping</h4>
    <EdProse>
      Copy only the fields below. The response <code>data</code> object does not allow additional
      properties, and <code>paymentResponse</code> can hold keys that are not part of it
      <template v-if="paged">(for example <code>paymentRail</code>, which every PATCH sets)</template>
      <template v-else>(for example the <code>OpenFinanceBilling</code> object a PATCH writes)</template>.
      Omit any optional field that is absent from the entry.
    </EdProse>
    <EdRefTable>
      <table>
        <thead><tr><th>Response field</th><th>Payment log entry field</th></tr></thead>
        <tbody>
          <tr><td><code>data.id</code></td><td><code>paymentId</code></td></tr>
          <tr><td><code>data.consentId</code></td><td><code>consentId</code></td></tr>
          <tr><td><code>data.status</code></td><td><code>paymentResponse.status</code></td></tr>
          <tr><td><code>data.statusUpdateDateTime</code></td><td><code>paymentResponse.statusUpdateDateTime</code></td></tr>
          <tr><td><code>data.creationDateTime</code></td><td><code>paymentResponse.creationDateTime</code></td></tr>
          <tr><td><code>data.paymentTransactionId</code></td><td><code>paymentResponse.paymentTransactionId</code></td></tr>
          <tr><td><code>data.rejectReasonCode</code></td><td><code>paymentResponse.rejectReasonCode</code> (the same <code>code</code> / <code>message</code> items)</td></tr>
          <tr><td><code>data.paymentPurposeCode</code></td><td><code>paymentResponse.paymentPurposeCode</code></td></tr>
          <tr><td>Any other field your LFI returned on the <code>201</code>, such as <code>data.instruction</code>, <code>data.debtorReference</code> or <code>data.openFinanceBilling</code></td><td>The field of the same name in <code>paymentResponse</code>, unchanged</td></tr>
          <tr v-if="!paged"><td><code>data.openFinanceBilling.NumberOfSuccessfulTransactions</code></td><td><code>paymentResponse.OpenFinanceBilling.NumberOfSuccessfulTransactions</code>, if your LFI PATCHed it</td></tr>
        </tbody>
      </table>
    </EdRefTable>

    <EdCodeGroup :tabs="tabs" />
  </div>
</template>

<style scoped>
.ag-step__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
.ag-step__subhead--small { font-size: 1.05rem; margin-top: 1.5rem; }
.ag-step__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
</style>

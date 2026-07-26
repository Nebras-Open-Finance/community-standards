/**
 * Shared deep-link verification-file probe.
 *
 * Used by BOTH:
 *   - scripts/fetch-auth-endpoints.mjs — the build-time snapshot behind the
 *     /internal redirect-testing directory, and
 *   - functions/api/probe-well-known.js — the live Cloudflare Pages Function
 *     behind the ad-hoc redirect checker.
 *
 * Keeping the verdict logic in one place means an origin is graded by identical
 * rules whether it is probed at build time or on demand — the two pages can
 * never drift apart. The implementation uses only web-standard APIs (fetch,
 * AbortController, URL) so it runs unchanged under Node and the Workers runtime.
 */

// The two deep-link verification files an LFI MUST serve from its auth origin.
export const WELL_KNOWN = {
  android: '/.well-known/assetlinks.json',
  ios: '/.well-known/apple-app-site-association',
}

// A browser-like User-Agent. The OS verifiers (Apple CDN / Google Digital Asset
// Links) are not browsers, but some LFI WAFs return a false 403 to default
// fetch/curl UAs — this probes what a real device is closer to seeing.
export const PROBE_UA =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'

const DEFAULT_TIMEOUT_MS = 20000

/**
 * Probe one verification file. Returns a plain record — never throws, because a
 * failed probe is a result to display, not an error.
 *
 * Verdicts:
 *   pass — 200, valid JSON body, Content-Type application/json
 *   warn — 200, valid JSON body, but wrong Content-Type (e.g. text/plain).
 *          The OS has historically tolerated this; it is a spec deviation.
 *   fail — any redirect, non-200 status, non-JSON body, or network error.
 */
export async function probeFile(url, { timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'manual', // a redirect on these paths is itself a failure
      headers: { 'User-Agent': PROBE_UA, Accept: 'application/json, */*' },
    })
    const status = res.status
    const contentType = res.headers.get('content-type')

    if (status >= 300 && status < 400) {
      const location = res.headers.get('location') || 'unknown target'
      return { url, status, contentType, jsonValid: false, verdict: 'fail', note: `redirect to ${location}` }
    }

    const text = await res.text()
    let jsonValid = false
    try { JSON.parse(text); jsonValid = true } catch { jsonValid = false }
    const isJsonType = /application\/json/i.test(contentType || '')

    let verdict
    let note = null
    if (status !== 200) { verdict = 'fail'; note = `HTTP ${status}` }
    else if (!jsonValid) { verdict = 'fail'; note = 'body is not valid JSON' }
    else if (!isJsonType) { verdict = 'warn'; note = `served as ${contentType || 'no Content-Type'} — expected application/json` }
    else { verdict = 'pass' }

    return { url, status, contentType, jsonValid, verdict, note }
  } catch (err) {
    const note = err.name === 'AbortError' ? `timed out after ${timeoutMs}ms` : err.message
    return { url, status: null, contentType: null, jsonValid: false, verdict: 'fail', note }
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Probe both deep-link verification files for one origin, in parallel.
 * Returns { origin, android, ios } — the shape the redirect-testing pages read.
 */
export async function probeOrigin(origin, opts = {}) {
  const [android, ios] = await Promise.all([
    probeFile(origin + WELL_KNOWN.android, opts),
    probeFile(origin + WELL_KNOWN.ios, opts),
  ])
  return { origin, android, ios }
}

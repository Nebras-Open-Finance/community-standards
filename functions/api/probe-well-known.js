/**
 * Cloudflare Pages Function — GET /api/probe-well-known?url=<origin-or-url>
 *
 * Server-side proxy for the /internal redirect checker. A browser cannot fetch
 * another origin's /.well-known/assetlinks.json or apple-app-site-association —
 * those files almost never send CORS headers, so a client-side fetch is blocked
 * and indistinguishable from "server down". This function runs the same probe
 * the build-time directory uses (shared logic in scripts/lib/well-known-probe.mjs)
 * from the Cloudflare edge, where there is no CORS, and returns the verdicts.
 *
 * Only the origin of the supplied URL is used; the two well-known paths are
 * fixed here, so the caller can never steer this at an arbitrary path. Scheme is
 * restricted to http/https and obviously-internal hosts are refused, so this
 * cannot be turned into an SSRF pivot.
 */

import { probeOrigin } from '../../scripts/lib/well-known-probe.mjs'

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
}

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS })
}

/** Reject loopback, link-local, private and other non-routable hosts. */
function isPublicHostname(hostname) {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, '')
  if (!h) return false
  if (h === 'localhost' || h.endsWith('.localhost')) return false
  if (h.endsWith('.local') || h.endsWith('.internal') || h.endsWith('.home.arpa')) return false
  if (h === '::1' || h === '::' || h.startsWith('fe80:') || h.startsWith('fc') || h.startsWith('fd')) return false

  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])]
    if ([a, b, Number(m[3]), Number(m[4])].some((n) => n > 255)) return false
    if (a === 0 || a === 10 || a === 127) return false          // this-host, private, loopback
    if (a === 169 && b === 254) return false                    // link-local (incl. cloud metadata)
    if (a === 172 && b >= 16 && b <= 31) return false           // private
    if (a === 192 && b === 168) return false                    // private
    if (a === 100 && b >= 64 && b <= 127) return false          // CGNAT
  }
  return true
}

export async function onRequestGet(context) {
  const reqUrl = new URL(context.request.url)
  const input = (reqUrl.searchParams.get('url') || reqUrl.searchParams.get('origin') || '').trim()
  if (!input) return json(400, { error: 'Provide a ?url= query parameter.' })

  let parsed
  try {
    parsed = new URL(input)
  } catch {
    return json(400, { error: `Not a valid URL: ${input}` })
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return json(400, { error: `Unsupported scheme "${parsed.protocol}" — only http and https are probed.` })
  }
  if (!isPublicHostname(parsed.hostname)) {
    return json(400, { error: `Refusing to probe non-public host "${parsed.hostname}".` })
  }

  try {
    const result = await probeOrigin(parsed.origin)
    return json(200, result)
  } catch (err) {
    return json(502, { error: `Probe failed: ${err?.message || 'unknown error'}` })
  }
}

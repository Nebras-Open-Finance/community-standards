// Shared helpers + document shell for the Functional Certification summary.html
// generated inside each submission bundle (LFI and TPP). Self-contained inline
// CSS, printable.

export function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function row(label: string, value: string): string {
  return `<tr><th>${esc(label)}</th><td>${value ? esc(value) : '<em>—</em>'}</td></tr>`
}

export function fileLink(path: string | undefined): string {
  return path ? `<a href="${esc(path)}">${esc(path)}</a>` : '<span class="missing">Not provided</span>'
}

export interface ShellOptions {
  title: string
  certType: string
  label: string
  generatedAt: string
  org: string
  name: string
}

/** Wrap a body (the numbered sections) in the standard summary document. */
export function summaryShell(opts: ShellOptions, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(opts.title)}</title>
<style>
  :root { color-scheme: light; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a2233; max-width: 60rem; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; line-height: 1.55; }
  h1 { font-size: 1.9rem; margin: 0 0 0.25rem; }
  h2 { font-size: 1.2rem; margin: 2.2rem 0 0.6rem; border-bottom: 2px solid #d8dee9; padding-bottom: 0.3rem; }
  h3 { font-size: 1rem; margin: 1.4rem 0 0.5rem; }
  .eyebrow { font-family: ui-monospace, Menlo, monospace; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: #2a7d6f; font-weight: 700; }
  table { border-collapse: collapse; width: 100%; margin: 0.5rem 0 1rem; font-size: 0.9rem; }
  th, td { text-align: left; vertical-align: top; padding: 0.45rem 0.6rem; border: 1px solid #e2e6ee; }
  th { width: 15rem; background: #f6f8fb; font-weight: 600; }
  code { font-family: ui-monospace, Menlo, monospace; font-size: 0.85em; background: #f2f5f9; padding: 0.05rem 0.3rem; border-radius: 3px; }
  .method { color: #fff; background: #2a7d6f; padding: 0.1rem 0.35rem; border-radius: 3px; font-size: 0.75em; }
  .endpoint { border: 1px solid #e2e6ee; border-left: 3px solid #2a7d6f; padding: 0.5rem 1rem 1rem; margin: 0.75rem 0; }
  .missing { color: #a6391f; font-style: italic; }
  .ok { color: #166534; font-weight: 600; }
  pre { background: #f2f5f9; border: 1px solid #e2e6ee; padding: 0.8rem; overflow-x: auto; font-size: 0.82rem; white-space: pre-wrap; }
  .meta { color: #5b6472; font-size: 0.85rem; }
  a { color: #1d5fb3; }
  @media print { body { padding: 0; } a { color: inherit; text-decoration: none; } }
</style>
</head>
<body>
  <div class="eyebrow">Functional Certification &middot; ${esc(opts.certType)}</div>
  <h1>${esc(opts.title)}</h1>
  <p class="meta">Generated ${esc(opts.generatedAt)} &middot; ${esc(opts.org || '—')}${opts.name ? ' &middot; ' + esc(opts.name) : ''}</p>
${body}
</body>
</html>`
}

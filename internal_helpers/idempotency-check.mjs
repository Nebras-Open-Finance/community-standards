import { build } from 'esbuild'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const outFile = resolve('docs/.vitepress/config/sidebars/.config-bundle.mjs')

await build({
  entryPoints: [resolve('docs/.vitepress/config.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: outFile,
  packages: 'external',
  logLevel: 'error',
  banner: {
    js: "import { fileURLToPath as __fu } from 'node:url'; import { dirname as __dn } from 'node:path'; const __filename = __fu(import.meta.url); const __dirname = __dn(__filename);",
  },
})

const mod = await import(pathToFileURL(outFile).href)
const config = mod.default

const pageData = {
  relativePath: 'tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites.md',
  frontmatter: {},
  title: 'Prerequisites',
}
const ctx = { siteConfig: { srcDir: resolve('docs') } }

config.transformPageData(pageData, ctx)
const afterFirst = pageData.frontmatter.head.length
config.transformPageData(pageData, ctx)
const afterSecond = pageData.frontmatter.head.length

const head = pageData.frontmatter.head
const counts = {
  canonical: head.filter(([, a]) => a?.rel === 'canonical').length,
  'og:title': head.filter(([, a]) => a?.property === 'og:title').length,
  'og:description': head.filter(([, a]) => a?.property === 'og:description').length,
  'og:url': head.filter(([, a]) => a?.property === 'og:url').length,
  'twitter:title': head.filter(([, a]) => a?.name === 'twitter:title').length,
  'twitter:description': head.filter(([, a]) => a?.name === 'twitter:description').length,
  robots: head.filter(([, a]) => a?.name === 'robots').length,
}

console.log(`head length after 1st call: ${afterFirst}`)
console.log(`head length after 2nd call: ${afterSecond}`)
console.log('managed tag counts:', JSON.stringify(counts))
const allOne = Object.values(counts).every((c) => c === 1)
console.log(allOne ? 'PASS: idempotent' : 'FAIL: duplicates present')
process.exit(allOne ? 0 : 1)

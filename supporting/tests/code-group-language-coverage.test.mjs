// Every <EdCodeGroup> on the site must offer both Node.js and Python so that
// readers in either ecosystem can copy-paste a runnable snippet.
//
// The rule is enforced on the tabs array, not the template: any
// `const X = [...] as const` whose entries look like { label, lang, code }
// must contain at least one Node.js label AND at least one Python label.
//
// Note: this does not flag single-language `<EdCode>` blocks — those exist
// intentionally for cases where one runtime applies (e.g. Postman pre-request
// and test scripts, which only run in Postman's JS sandbox).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url))
const SRC_DIR = join(REPO_ROOT, 'src')

async function* walkVue(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walkVue(full)
    else if (entry.isFile() && full.endsWith('.vue')) yield full
  }
}

const TABS_BLOCK = /const\s+(\w+)\s*=\s*\[([\s\S]*?)\]\s*as\s+const/g
const LABEL = /label\s*:\s*['"]([^'"]+)['"]/g

function extractTabArrays(content) {
  const arrays = []
  for (const m of content.matchAll(TABS_BLOCK)) {
    const name = m[1]
    const body = m[2]
    // Only treat this as a code-group tab array if it has both label and lang keys.
    if (!/label\s*:\s*['"]/.test(body) || !/lang\s*:\s*['"]/.test(body)) continue
    const labels = [...body.matchAll(LABEL)].map((x) => x[1])
    arrays.push({ name, labels })
  }
  return arrays
}

test('every EdCodeGroup tab array provides both Node.js and Python', async () => {
  const offenders = []
  for await (const file of walkVue(SRC_DIR)) {
    const content = await readFile(file, 'utf8')
    for (const { name, labels } of extractTabArrays(content)) {
      const hasNode = labels.some((l) => /^Node\.js/.test(l))
      const hasPython = labels.some((l) => /^Python/.test(l))
      if (!(hasNode && hasPython)) {
        offenders.push(`${relative(REPO_ROOT, file)} :: ${name} :: [${labels.join(', ')}]`)
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `EdCodeGroup tab arrays must include both Node.js and Python:\n  ${offenders.join('\n  ')}`,
  )
})

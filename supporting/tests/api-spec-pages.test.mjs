import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..')
const DOCS = resolve(ROOT, 'docs')
const PUBLIC = resolve(DOCS, 'public')
const SIDEBAR_FILE = resolve(DOCS, '.vitepress', 'config', 'sidebars', 'api-specs.ts')

function parseCurrentVersion() {
  const src = readFileSync(resolve(DOCS, '.vitepress', 'version.ts'), 'utf-8')
  const match = src.match(/VERSIONS\s*=\s*\[([^\]]+)\]/)
  if (!match) throw new Error('Could not parse VERSIONS from version.ts')
  const versions = match[1].split(',').map(v => v.trim().replace(/['"]/g, '')).filter(Boolean)
  return versions[versions.length - 1]
}

const CURRENT_VERSION = parseCurrentVersion()
const BASE = `/tech/api-specs/${CURRENT_VERSION}`

// Extracts every apiRef('METHOD', 'path', `link`) call from the sidebar source.
function extractApiRefs(source) {
  const re = /apiRef\(\s*'([A-Z]+)'\s*,\s*'([^']+)'\s*,\s*`([^`]+)`\s*\)/g
  const refs = []
  let m
  while ((m = re.exec(source)) !== null) {
    const [, method, path, linkTemplate] = m
    const link = linkTemplate.replace(/\$\{BASE\}/g, BASE)
    refs.push({ method, path, link })
  }
  return refs
}

// Resolves an include directive relative to the including file's directory.
function resolveInclude(fromFile, includePath) {
  return resolve(dirname(fromFile), includePath)
}

// A doc page may forward to an included file via `<!--@include: ../path.md-->`.
// Returns the final file path (after following one include) or the original if none.
function resolveFinalDocFile(docFile) {
  const src = readFileSync(docFile, 'utf-8')
  const includeMatch = src.match(/<!--\s*@include:\s*([^\s]+?)\s*-->/)
  if (!includeMatch) return { finalFile: docFile, source: src }
  const included = resolveInclude(docFile, includeMatch[1])
  if (!existsSync(included)) {
    return { finalFile: docFile, source: src, missingInclude: included }
  }
  return { finalFile: included, source: readFileSync(included, 'utf-8') }
}

function extractRedocWrapper(source) {
  // Match the opening tag (self-closing or not) up to the first `/>` or `>`.
  const tagMatch = source.match(/<RedocWrapper\b([\s\S]*?)\/>/)
  if (!tagMatch) return null
  const attrs = tagMatch[1]
  const attr = (name) => {
    const m = attrs.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`))
    return m ? m[1] : null
  }
  return {
    spec: attr('spec'),
    filterPath: attr('filterPath'),
    filterMethod: attr('filterMethod'),
  }
}

function specPathToYamlFile(specAttr) {
  // spec="/openapi/v2.1/standards/foo.yaml" → docs/public/openapi/v2.1/standards/foo.yaml
  if (!specAttr.startsWith('/')) return null
  return join(PUBLIC, specAttr.replace(/^\//, ''))
}

const sidebarSrc = readFileSync(SIDEBAR_FILE, 'utf-8')
const refs = extractApiRefs(sidebarSrc)

// Cache parsed YAML specs so we don't re-parse for every apiRef.
// Stores `{ doc, error }` — error is non-null when the YAML failed to parse.
const yamlCache = new Map()
function loadYaml(file) {
  if (!yamlCache.has(file)) {
    try {
      yamlCache.set(file, { doc: parseYaml(readFileSync(file, 'utf-8')), error: null })
    } catch (err) {
      yamlCache.set(file, { doc: null, error: err })
    }
  }
  return yamlCache.get(file)
}

describe('api-specs sidebar links', () => {
  it('sidebar contains at least one apiRef entry', () => {
    assert.ok(refs.length > 0, `No apiRef calls found in ${SIDEBAR_FILE}`)
  })

  for (const ref of refs) {
    describe(`${ref.method} ${ref.path} → ${ref.link}`, () => {
      const docFile = join(DOCS, ref.link.replace(/^\//, '')) + '.md'

      it('sidebar link resolves to an existing .md page', () => {
        assert.ok(
          existsSync(docFile),
          `Missing page: ${docFile}\n  Referenced from sidebar link: ${ref.link}`,
        )
      })

      if (!existsSync(docFile)) return

      const resolved = resolveFinalDocFile(docFile)

      it('any @include directive resolves to an existing file', () => {
        assert.ok(
          !resolved.missingInclude,
          `@include target does not exist: ${resolved.missingInclude}\n  From: ${docFile}`,
        )
      })

      const redoc = extractRedocWrapper(resolved.source)

      it('final page contains a <RedocWrapper> with a spec attribute', () => {
        assert.ok(redoc, `No <RedocWrapper .../> tag found in ${resolved.finalFile}`)
        assert.ok(
          redoc.spec,
          `<RedocWrapper> in ${resolved.finalFile} is missing a spec="..." attribute`,
        )
      })

      if (!redoc?.spec) return

      const yamlFile = specPathToYamlFile(redoc.spec)

      it('spec attribute points to an existing yaml file', () => {
        assert.ok(yamlFile, `Unresolvable spec path: ${redoc.spec}`)
        assert.ok(
          existsSync(yamlFile),
          `YAML file does not exist: ${yamlFile}\n  spec="${redoc.spec}" in ${resolved.finalFile}`,
        )
      })

      if (!yamlFile || !existsSync(yamlFile)) return

      it('yaml parses and declares the filterPath (if given)', () => {
        const { doc, error } = loadYaml(yamlFile)
        assert.ok(!error, `YAML parse error in ${yamlFile}: ${error?.message}`)
        assert.ok(doc && typeof doc === 'object', `YAML did not parse to object: ${yamlFile}`)

        if (!redoc.filterPath) return
        assert.ok(
          doc.paths && Object.prototype.hasOwnProperty.call(doc.paths, redoc.filterPath),
          `filterPath "${redoc.filterPath}" not found in ${yamlFile}\n  Referenced from ${resolved.finalFile}`,
        )

        if (!redoc.filterMethod) return
        const pathItem = doc.paths[redoc.filterPath]
        assert.ok(
          pathItem && Object.prototype.hasOwnProperty.call(pathItem, redoc.filterMethod.toLowerCase()),
          `filterMethod "${redoc.filterMethod}" not found under "${redoc.filterPath}" in ${yamlFile}`,
        )
      })
    })
  }
})

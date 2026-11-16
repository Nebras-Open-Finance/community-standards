// Render-time adjustments that let Redoc 2.x display valid OpenAPI it would
// otherwise render incorrectly. Applied to the in-memory document RedocWrapper
// hands to Redoc — never to the YAML served under /openapi/, which stays
// byte-for-byte as published in api-specs.

const SCHEMA_REF_PREFIX = '#/components/schemas/'

type Schemas = Record<string, unknown>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function branchRefs(schema: Record<string, unknown>, discriminator: Record<string, unknown>): string[] {
  const variants = [schema['oneOf'], schema['anyOf']]
    .flatMap(list => (Array.isArray(list) ? list : []))
    .map(variant => (isRecord(variant) ? variant['$ref'] : undefined))
  const mapping = isRecord(discriminator['mapping']) ? Object.values(discriminator['mapping']) : []
  return [...variants, ...mapping].filter((ref): ref is string => typeof ref === 'string')
}

function resolveSchemaRef(schemas: Schemas, ref: string): unknown {
  return ref.startsWith(SCHEMA_REF_PREFIX) ? schemas[ref.slice(SCHEMA_REF_PREFIX.length)] : undefined
}

// A branch Redoc cannot render under a discriminator: it has no properties of
// its own and is instead a further `oneOf`/`anyOf`.
function isCompositeBranch(schema: unknown): boolean {
  return isRecord(schema)
    && schema['properties'] === undefined
    && (schema['oneOf'] !== undefined || schema['anyOf'] !== undefined)
}

/**
 * Removes `discriminator` from any schema whose branches are themselves
 * `oneOf`/`anyOf` compositions, and returns the names of the schemas changed.
 *
 * Redoc 2.x renders a discriminated schema by passing the selected branch to
 * its object renderer, which lists only that branch's own `properties`. A
 * branch that splits again — e.g. v2.2 `CbuaePatchPaymentRecordBody`, where
 * each payment rail is a further `oneOf` by status — therefore renders as an
 * empty body with no selector. Without the discriminator Redoc falls back to
 * its plain "One of" rendering, which nests correctly. The `oneOf` itself is
 * kept, so the set of valid bodies shown is unchanged.
 *
 * Mutates `schemas` by replacing the affected entries with shallow copies.
 */
export function dropUnrenderableDiscriminators(schemas: Schemas | undefined): string[] {
  if (!schemas) return []
  const changed: string[] = []
  for (const [name, schema] of Object.entries(schemas)) {
    if (!isRecord(schema) || !isRecord(schema['discriminator'])) continue
    const refs = branchRefs(schema, schema['discriminator'])
    if (!refs.some(ref => isCompositeBranch(resolveSchemaRef(schemas, ref)))) continue
    const { discriminator: _discriminator, ...rest } = schema
    schemas[name] = rest
    changed.push(name)
  }
  return changed
}

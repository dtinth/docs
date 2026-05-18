# Generating a Type Definition File

Before using the type-safe client, you need to generate a TypeScript type definition file from your live Grist document. This file describes your tables and columns, and is passed as a type parameter to `gristDoc` to enable typesafe column access, filters, and inserts.

The `generate` command reads the document schema via the Grist API and writes the type definition file. See {doc}`../cli/configuration` for how to configure the document URL and API key.

```bash
npx grist-kit generate [options]
```

`--out <path>`
: Output file path. Defaults to `./grist-schema.ts`.

`--type-name <name>`
: Name of the exported TypeScript type. Defaults to `GristSchema`.

Example:

```bash
npx grist-kit generate --out grist-schema.ts
```

Re-run this command whenever the document's columns change.

:::{tip}
Save it as a `package.json` script so it's easy to remember:

```bash
pnpm pkg set scripts.update-schema="grist-kit generate --out grist-schema.ts"
```

:::

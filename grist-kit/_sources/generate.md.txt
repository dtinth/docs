<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Generating a Type Definition File

Before using the type-safe client library, generate a TypeScript type definition file from your live Grist document. This file describes your tables and columns, and is passed as a type parameter to `gristDoc` to enable typesafe column access, filters, and inserts.

The `generate` command reads the document schema via the Grist API and writes the type definition file. See `grist-kit help configuration` for how to configure the document URL and API key.

```bash
grist-kit generate [options]
```

Options:

- `--out <path>` — output file path. Defaults to `./grist-schema.ts`.
- `--type-name <name>` — name of the exported TypeScript type. Defaults to `GristSchema`.

Example:

```bash
npx grist-kit generate --out grist-schema.ts
```

Re-run this command whenever the document's columns change.

> **Tip:** Save it as a `package.json` script so it's easy to remember:
>
> ```bash
> pnpm pkg set scripts.update-schema="grist-kit generate --out grist-schema.ts"
> ```

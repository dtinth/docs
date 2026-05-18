# Creating a Client

## Prerequisites

Before using the client, generate a schema file from your live doc:

```bash
npx grist-kit generate --out grist-schema.ts
```

See {doc}`generate` for details.

## Instantiating

```ts
import { gristDoc } from "grist-kit";
import type { GristSchema } from "./grist-schema.ts";

const doc = gristDoc<GristSchema>({
  baseDocUrl: process.env.GRIST_DOC_URL!,
  apiKey: process.env.GRIST_API_KEY,
});
```

Pass the generated schema as the type parameter to enable type inference across all table and column operations.

`baseDocUrl`
: Base URL of the Grist document. Required.

`apiKey`
: Grist API key. Required unless the document is public.

`fetchOptions`
: Additional options forwarded to the underlying `ofetch` client — useful for custom headers or timeouts.

## API reference

- [gristDoc](https://apiref-site.vercel.app/package/grist-kit/gristDoc) — factory function
- [GristDoc](https://apiref-site.vercel.app/package/grist-kit/GristDoc) — document client

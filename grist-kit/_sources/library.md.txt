<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Using the Client Library

The grist-kit client library lets you query and manipulate Grist documents from TypeScript with full type safety. Column names, filter values, and write payloads are all checked against a generated schema at compile time.

## Installation

```bash
npm install grist-kit
```

## Prerequisites

Before using the client, generate a schema file from your live doc:

```bash
npx grist-kit generate --out grist-schema.ts
```

See `grist-kit help generate` for details.

## Creating a client

```ts
import { gristDoc } from "grist-kit";
import type { GristSchema } from "./grist-schema.ts";

const doc = gristDoc<GristSchema>({
  baseDocUrl: process.env.GRIST_DOC_URL!,
  apiKey: process.env.GRIST_API_KEY,
});
```

Pass the generated schema as the type parameter to enable type inference across all table and column operations.

Options:

- `baseDocUrl` — base URL of the Grist document. Required.
- `apiKey` / `accessToken` — one of these is required unless the document is public. See `grist-kit help authentication` for the difference and security checklist.
- `fetchOptions` — additional options forwarded to the underlying `ofetch` client — useful for custom headers or timeouts.

Next steps:

- Read and write rows — see `grist-kit help crud`.
- Work with attachments — see `grist-kit help attachments`.

## API reference

- [gristDoc](https://apiref-site.vercel.app/package/grist-kit/gristDoc) — factory function
- [GristDoc](https://apiref-site.vercel.app/package/grist-kit/GristDoc) — document client

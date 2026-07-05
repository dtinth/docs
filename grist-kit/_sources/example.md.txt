<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Full Example

This example shows a complete script that connects to a Grist doc, reads low-stock products, and places a refill order. It uses the [Inventory Manager](https://www.getgrist.com/templates/inventory-manager/) template and covers the full workflow: setup, type generation, and a typesafe read/write script.

Prerequisites: [Node.js 24+](https://nodejs.org/docs/latest/api/typescript.html) and [pnpm](https://pnpm.io/).

## Setup

Create a project and install grist-kit:

```bash
mkdir grist-inventory && cd grist-inventory
pnpm init --init-type module
pnpm add grist-kit
pnpm add -D typescript @types/node @tsconfig/node24
```

Create `tsconfig.json`:

```json
{
  "extends": "@tsconfig/node24/tsconfig.json"
}
```

Open the [Inventory Manager template doc](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager). In the left sidebar, click **Settings** → **API** → expand **Document ID** → copy the **Base doc URL**.

Create `.env`:

```
GRIST_DOC_URL=https://templates.getgrist.com/api/docs/sXsBGDTKau1F3fvxkCyoaJ
```

Generate types from the live doc:

```bash
pnpm exec grist-kit generate --out grist-schema.ts
```

## The script

Create `refill.ts`:

```ts
import { parseArgs } from "node:util";
import { gristDoc } from "grist-kit";
import type { GristSchema } from "./grist-schema.ts";

const { values } = parseArgs({
  options: { "dry-run": { type: "boolean", default: false } },
});

const doc = gristDoc<GristSchema>({
  baseDocUrl: process.env.GRIST_DOC_URL!,
  apiKey: process.env.GRIST_API_KEY,
});

const needsRefill = await doc.table("All_Products").list({
  filter: { Stock_Alert: ["Low Stock", "OUT OF STOCK"] },
});

console.log(`${needsRefill.length} products need a refill:\n`);
for (const p of needsRefill) {
  console.log(`  [${p.Stock_Alert}] ${p.SKU} — ${p.Product} (in stock: ${p.In_Stock})`);
}

if (needsRefill.length === 0 || values["dry-run"]) {
  if (values["dry-run"]) console.log("\n(dry run — no order created)");
  process.exit(0);
}

const [orderId] = await doc
  .table("Incoming_Orders")
  .insert([{ Order_Date: Math.floor(Date.now() / 1000), Status: "Order Placed" }]);

await doc.table("Incoming_Order_Line_Items").insert(
  needsRefill.map((p) => ({
    Order_Number: orderId,
    SKU: p.id,
    Qty: 10,
  })),
);

console.log(`\nCreated order ${orderId} with ${needsRefill.length} line items.`);
```

A few things worth noticing:

- The `filter` argument is fully typed against the schema. Try misspelling `"OUT OF STOCK"` — TypeScript will reject it, because `Stock_Alert`'s allowed values are baked into the generated schema.
- `In_Stock` and `Stock_Alert` are formula columns. The schema marks them as such, so they don't appear in the `insert()` payload type — you can't accidentally try to write them.
- `Order_Date` is a Grist `Date`, encoded as epoch seconds.
- Every Grist row has a numeric `id`. `Order_Number` is a `Ref` to `Incoming_Orders`, so it expects that row id.

## Run it

Test against the public template (read-only, no API key needed):

```bash
node --env-file=.env refill.ts --dry-run
```

To actually place the order, make a copy of the template doc under your own account, generate an API key in **Profile Settings** → **API**, and update `.env`:

```
GRIST_DOC_URL=https://<your-host>/api/docs/<your-doc-id>
GRIST_API_KEY=<your-api-key>
```

Then run:

```bash
node --env-file=.env refill.ts
```

Open your doc — there's a new row in **Incoming Orders** with line items for each low-stock product.

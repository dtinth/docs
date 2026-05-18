# Working with Records

Access a table via `doc.table("TableName")`. All methods are typed against the generated schema.

## list

Fetches rows matching the given options.

```ts
const products = await doc.table("All_Products").list({
  filter: { Stock_Alert: ["Low Stock", "OUT OF STOCK"] },
  sort: "-In_Stock",
  limit: 100,
});
```

`filter`
: Equality-style filters keyed by column name. Each value is an array of allowed values.

`sort`
: Column name to sort by. Prefix with `-` for descending order. Accepts a single value or an array.

`limit`
: Maximum number of rows to return.

`hidden`
: Include hidden columns in the response.

## insert

Inserts one or more rows and returns their row IDs.

```ts
const [orderId] = await doc
  .table("Incoming_Orders")
  .insert([{ Order_Date: Math.floor(Date.now() / 1000), Status: "Order Placed" }]);
```

Formula columns are excluded from the insert payload type automatically.

## update

Updates existing rows by ID.

```ts
await doc.table("Incoming_Orders").update([{ id: orderId, Status: "Received" }]);
```

## upsert

Creates or updates rows using Grist's upsert endpoint. Each record specifies `require` (match criteria) and `fields` (values to write).

```ts
await doc
  .table("Customers")
  .upsert([{ require: { Email: "alice@example.com" }, fields: { Name: "Alice", Tier: "pro" } }]);
```

`onMany`
: Behavior when multiple rows match: `"first"`, `"none"`, or `"all"`.

`noCreate`
: Do not create a new row when no match is found.

`noUpdate`
: Do not update an existing row when a match is found.

## delete

Deletes rows by row ID.

```ts
await doc.table("Incoming_Orders").delete([orderId]);
```

## API reference

- [GristTable](https://apiref-site.vercel.app/package/grist-kit/GristTable) — table client
- [GristTable.list](https://apiref-site.vercel.app/package/grist-kit/GristTable/list)

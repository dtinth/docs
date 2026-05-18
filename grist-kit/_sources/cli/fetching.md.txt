# Fetching Records

## records

Fetches rows from a table and prints them as JSON.

```bash
npx -y grist-kit records <table> [options]
```

`--filter <key=value>`
: Filter rows by column value. Repeatable for multiple filters.

`--limit <n>`
: Maximum number of rows to return.

`--format <json|csv>`
: Output format. Defaults to `json`.

Examples:

```bash
npx -y grist-kit records All_Products --limit 2
```

```
[
  {
    "id": 1,
    "SKU": "VEG-BLCK-28",
    "Product": "Men's Stretch Five-Pocket Pants",
    "In_Stock": 8,
    "Stock_Alert": "In Stock"
  },
  ...
]
```

```bash
npx -y grist-kit records All_Products --filter Stock_Alert=Low Stock --format csv
```

## sql

Runs a SQL query against the document and prints results.

```bash
npx -y grist-kit sql "<query>" [options]
```

`--format <json|csv>`
: Output format. Defaults to `json`.

Examples:

```bash
npx -y grist-kit sql "SELECT SKU, In_Stock FROM All_Products ORDER BY In_Stock LIMIT 3" --format csv
```

```
SKU,In_Stock
VEG-BLCK-34,0
SEW-LTBL-36,0
SEW-LTBL-28,0
```

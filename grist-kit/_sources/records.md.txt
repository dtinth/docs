<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Fetching Records

The `records` command fetches rows from a table and prints them as JSON (default) or CSV.

```bash
grist-kit records <table> [options]
```

Options:

- `--filter <key=value>` — filter rows by column value. Repeatable; repeating the same key matches rows where the column equals any of the given values. Values `true`, `false`, `null`, and numbers are coerced to their JSON types; everything else is treated as a string.
- `--limit <n>` — maximum number of rows to return.
- `--format <json|csv>` — output format. Defaults to `json`.

Examples:

```bash
grist-kit records All_Products --limit 2
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
grist-kit records All_Products --filter Stock_Alert="Low Stock" --format csv
```

For anything beyond equality filters, use SQL — see `grist-kit help sql`.

<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Running SQL Queries

The `sql` command runs a read-only SQL query against the document and prints the results.

```bash
grist-kit sql "<query>" [options]
```

Options:

- `--format <json|csv>` — output format. Defaults to `json`.

Example:

```bash
grist-kit sql "SELECT SKU, In_Stock FROM All_Products ORDER BY In_Stock LIMIT 3" --format csv
```

```
SKU,In_Stock
VEG-BLCK-34,0
SEW-LTBL-36,0
SEW-LTBL-28,0
```

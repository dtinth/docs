<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Quick Start

You can query any public Grist document with just `--doc-url` — no configuration needed. The examples below use the public [Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager) template.

List the tables and their columns:

```bash
npx -y grist-kit --doc-url https://templates.getgrist.com/api/docs/sXsBGDTKau1F3fvxkCyoaJ tables
```

Fetch records as CSV:

```bash
npx -y grist-kit --doc-url https://templates.getgrist.com/api/docs/sXsBGDTKau1F3fvxkCyoaJ \
  records All_Products --limit 3 --format csv
```

```
id,SKU,Product,In_Stock,Stock_Alert,...
1,VEG-BLCK-28,Men's Stretch Five-Pocket Pants,8,In Stock,...
2,VEG-BLCK-30,Men's Stretch Five-Pocket Pants,8,In Stock,...
3,VEG-BLCK-32,Men's Stretch Five-Pocket Pants,9,In Stock,...
```

Filter by a column value:

```bash
npx -y grist-kit --doc-url https://templates.getgrist.com/api/docs/sXsBGDTKau1F3fvxkCyoaJ \
  records All_Products --filter Stock_Alert="Low Stock" --format csv
```

```
id,SKU,Product,In_Stock,Stock_Alert,...
5,VEG-BLCK-36,Men's Stretch Five-Pocket Pants,2,Low Stock,...
6,VEG-BLCK-38,Men's Stretch Five-Pocket Pants,2,Low Stock,...
...
```

For private documents, set up credentials — see `grist-kit help configuration`.

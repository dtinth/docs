# Listing Tables

The `tables` command lists all tables in a Grist document, along with their columns and types.

```bash
npx -y grist-kit tables [options]
```

`--format <text|json>`
: Output format. Defaults to `text`.

## Text output

```bash
npx -y grist-kit tables
```

```
All_Products
  SKU Text
  Product Text
  Size Choice
  In_Stock Numeric
  Stock_Alert Choice
  Brand Ref:Add_Products
  Color Ref:Color
  ...
Incoming_Orders
  Order_Date Date
  Status Choice
  Total Numeric
  ...
```

## JSON output

Use `--format json` to get the full column metadata from the Grist API, including labels, formulas, and widget options. Useful for inspecting the document schema.

```bash
npx -y grist-kit tables --format json
```

```
[
  {
    "id": "All_Products",
    "fields": { "tableRef": 1, "primaryViewId": 1, ... },
    "columns": [
      {
        "id": "SKU",
        "fields": {
          "label": "SKU",
          "type": "Text",
          "isFormula": false,
          "formula": "",
          ...
        }
      },
      ...
    ]
  },
  ...
]
```

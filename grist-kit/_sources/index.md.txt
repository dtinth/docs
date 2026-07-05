<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# grist-kit

grist-kit is a CLI and type-safe client library for [Grist](https://www.getgrist.com), written in TypeScript. It provides:

- An agent-friendly **CLI** for inspecting and querying Grist documents from the shell: list tables, fetch records, run SQL queries.
- A **type-safe client library**: generate a TypeScript schema from a live doc, then read and write records with column names, filter values, and write payloads checked at compile time.

```{toctree}
:caption: CLI
:maxdepth: 1

quickstart
configuration
tables
records
sql
generate
```

```{toctree}
:caption: Client library
:maxdepth: 1

library
authentication
crud
attachments
```

```{toctree}
:caption: Tutorial
:maxdepth: 1

example
```

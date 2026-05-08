# Getting Started

Welcome to thdocs. This guide covers installation, basic project setup, and your first build.

## Installation

Install thdocs from source using {index}`uv`:

```bash
uv tool install -e . --reinstall
```

This installs the `thdocs` command globally.

## Creating a New Project

To scaffold a new documentation project:

```bash
mkdir my-docs
cd my-docs
thdocs init
```

This creates:
- `thdocs.toml` — project metadata (title, author, version)
- `docs/index.md` — root page with a `{toctree}` directive
- `.gitignore` entry for the `_build/` output directory

## Project Layout

A typical thdocs project looks like:

```
my-project/
  thdocs.toml
  docs/
    index.md
    getting-started.md
    cli.md
    adr/
      index.md
      0001-something.md
  _build/
    html/
      index.html
      ...
```

The source is pure Markdown (MyST format). Use `{toctree}` directives in `index.md` files to structure your navigation.

## Authoring

Write Markdown files in `docs/` using {index}`MyST` syntax:

```markdown
# My Page

This is a paragraph with **bold** and *italic*.

[Link to another page](other-page.md)
```

Use Sphinx directives directly for structure:

````markdown
# Contents

```{toctree}
subpage-1
subpage-2
```
````

See [CLI Reference](cli.md) for build and dev commands.

## Next Steps

- Read the [CLI Reference](cli.md) to learn `thdocs build` and `thdocs dev`
- Check the [Kitchen Sink](kitchen-sink.md) to see all supported Markdown constructs

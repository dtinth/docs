# Configuration

```{index} Configuration; thdocs.toml
```

Project settings live in a `thdocs.toml` file at the project root. The file uses [TOML](https://toml.io/en/) format.

## Structure

```toml
[site]
title = "My Project"
author = "Your Name"
version = "1.0.0"
```

## Options

`[site].title`
:   ```{index} title (config)
    ```

    The project title. Used as the page `<title>` prefix, the site header, and the PDF document title.

    **Required.** If missing, `thdocs build` and `thdocs dev` will fail.

`[site].author`
:   ```{index} author (config)
    ```

    The author or organization name. Used in the PDF metadata, the Sphinx `author` field, and the site footer copyright notice.

    Optional. Defaults to an empty string. When set, the footer shows `© Copyright 2026, Author Name.`; when empty, it shows `© Copyright 2026.`

`[site].version`
:   ```{index} version (config)
    ```

    The project version string. Displayed in the site header and PDF metadata.

    Optional. Defaults to an empty string. Three forms are supported:

    1. **Plain string** — used as-is:
       ```toml
       version = "2.5.0"
       ```
    2. **JSON file path** — thdocs reads the file and extracts the `"version"` field:
       ```toml
       version = "package.json"
       ```
    3. **Auto-detect** — if `version` is omitted and `package.json` exists in the project root, the `"version"` field is read automatically.

## Example

```toml
[site]
title = "Widget SDK"
author = "Acme Corp"
version = "2.5.0"
```

## How It Works

`thdocs.toml` is the only configuration file you need. There is no `conf.py` to maintain — thdocs generates the Sphinx configuration internally based on this file's contents.

When you run `thdocs init`, a minimal `thdocs.toml` with just the `title` field is created automatically.

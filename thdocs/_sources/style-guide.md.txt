# Style Guide

This guide defines how to write documentation for thdocs projects. It is written for human authors and coding agents.

## Philosophy

- **One idea per page.** Pages are navigation targets. If a page covers too much, split it.
- **Self-contained pages.** Any page might be the entry point (via search or index). It should make sense in isolation.
- **Flat hierarchy.** Use `{toctree}` to group pages by topic. Prefer two levels of depth; nest deeper only when it truly helps.

## Page Structure

Every page starts with an `h1` title. Use `h2` for sections and `h3` for subsections. Do not go deeper than `h3`. A short page may have no `h2` at all if the content is focused enough.

```markdown
# Page Title

Introductory paragraph that stands on its own.

## A Section

Content here.

### A Subsection

More content.
```

## Navigation

Use `{toctree}` directives in section `index.md` files to define the page hierarchy. Keep `:maxdepth:` at `2`.

````markdown
```{toctree}
:caption: User Guide
:maxdepth: 2

getting-started
configuration
cli
```
````

Do not create orphan pages. Every page must be reachable from a `{toctree}`.

## Index Entries

Use the inline `{index}` role to mark key concepts **at the point where they appear in the text**. The role anchors the index entry to that exact location, so the Index tab jumps the reader to the right paragraph.

Only index **nouns, commands, features, and domain concepts**. Do not index structural headings like "Summary" or "See Also".

```markdown
## Installation

Install thdocs with {index}`uv`:

```bash
uv tool install thdocs
```

## Configuration

Edit {index}`thdocs.toml` to set the site title.
```

## Cross-References

Prefer Markdown link syntax when you want custom link text:

```markdown
Please [configure](configuration.md) it before continuing.
```

Use the `{doc}` role when you want the target page title to appear as the link text:

```markdown
For more information, see {doc}`configuration`.
```

### Linking to Headings

Before referencing a heading from another page, give it an explicit target with `(target)=`:

```markdown
(installation-steps)=
## Installation Steps

1. Run the installer.
```

Then reference it with `{ref}`:

```markdown
See {ref}`installation-steps` for details.
```

Explicit targets are stable. Implicit heading anchors are available as a fallback, but prefer explicit ones.

## Glossary

Create a glossary page only when the project has enough domain-specific terms to justify one.

````markdown
```{glossary}
toctree
    A Sphinx directive that generates a table of contents tree.
```
````

Reference glossary terms with `{term}`:

```markdown
The {term}`toctree` directive controls navigation.
```

## Admonitions and Callouts

Use `{note}` for extra context and `{warning}` for cautions:

````markdown
```{note}
This is supplementary information.
```

```{warning}
This is a caution.
```
````

### Custom Titles

Use the `{admonition}` directive when you need a custom title:

````markdown
```{admonition} Pro tip
:class: tip
You can customize the title of any admonition.
```
````

### Collapsible Admonitions

Add `:collapsible:` to let readers expand or collapse the block. Use `closed` to hide the content by default, or `open` to show it:

````markdown
```{admonition} Advanced configuration
:class: note
:collapsible: closed

This section is hidden until the reader expands it. Use collapsible admonitions for optional or advanced details that should not clutter the main flow.
```
````

## See Also

Use the `{seealso}` directive for all related reading sections:

````markdown
```{seealso}
- {doc}`configuration`
- {doc}`cli`
```
````

## Definition Lists

Use definition lists for options, parameters, or term explanations. The `deflist` extension is enabled.

```markdown
term
: The definition of the term.

another-term
: Another definition.
```

## Anti-Patterns

- Do not skip heading levels (e.g., `h1` directly to `h3`).
- Do not write walls of text without structural breaks. Use headings, lists, and code blocks.
- Do not use bare Markdown links to internal pages when `{doc}` or explicit anchors are more robust.
- Do not index every heading. The index is a curated keyword list, not a mechanical dump.

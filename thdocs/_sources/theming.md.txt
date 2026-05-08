# Theming

The thdocs theme renders documentation in a dark, CHM-inspired layout with a three-tab sidebar.

## Layout

Pages use a two-column grid:

- **Left sidebar** (230px) — navigation and search
- **Main content** (flexible) — rendered Markdown

The sidebar has three tabs, each with a distinct purpose:

1. **Contents** — tree-style table of contents (toctree)
2. **Index** — alphabetical index of terms (from `{index}` directives)
3. **Search** — full-text search (Pagefind)

Tabs are rendered server-side; JavaScript toggles visibility based on `data-tab` and `data-panel` attributes.

## Colors and Fonts

The theme uses a dark color scheme and custom fonts:

### Color Tokens

- `--color-thdocs-bg` — body background (#353433)
- `--color-thdocs-text` — body text (#e9e8e7, light cream)
- `--color-thdocs-sidebar` — sidebar background (#252423, darker)
- `--color-thdocs-header` — chrome header (#090807, darkest)
- `--color-thdocs-border` — UI borders (#454443)
- `--color-thdocs-accent` — general accent (#bbeeff, cyan)
- `--color-thdocs-accent-yellow` — links, highlights (#ffffbb)
- `--color-thdocs-accent-green` — secondary accent (#d7fc70)
- `--color-thdocs-muted` — secondary text (#8b8685)

### Fonts

- **Sans-serif:** Arimo (via Google Fonts) with system fallbacks
- **Monospace:** Comic Mono (via CDN) with system fallbacks

## Prose Rendering

Content inside `<main class="prose">` uses Tailwind Typography with dark theme CSS variables. All prose elements—headings, paragraphs, code blocks, tables, blockquotes—are styled consistently for readability on dark backgrounds.

## Responsive Behavior

The layout is optimized for desktop viewing. At narrow widths, the grid may stack or adjust; exact breakpoints depend on CSS media queries in the compiled stylesheet.

## Theme Source

The theme is implemented in:

- `src/thdocs/theme/thdocs/layout.html` — Jinja template extending Sphinx's basic layout
- `src/thdocs/sphinx/conf.py` — Sphinx configuration (internal)
- `theme-src/src/main.css` — Tailwind CSS input (compiled to `thdocs.css`)

End users do not edit theme files—the theme is bundled with thdocs and applied automatically.

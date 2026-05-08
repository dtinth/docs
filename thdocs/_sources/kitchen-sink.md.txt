# Kitchen Sink

This page exercises every renderable construct supported by thdocs and MyST. Use this to visually verify that your theme renders all elements correctly.

## Headings

Heading levels {index}`Headings` h1–h4 are shown below (h1 is the page title).

### Level 3 Heading

This is a {index}`Level 3 Heading` for demonstration.

#### Level 4 Heading

This is a {index}`Level 4 Heading` for demonstration.

## Text Formatting

This paragraph demonstrates {index}`Text Formatting` with **bold text**, *italic text*, and `inline code`. You can also combine them: ***bold italic***.

A [link to example.com](https://example.com) and a [link to another page](getting-started.md) in the documentation.

## Lists

### Unordered Lists

This section shows {index}`Lists` and {index}`Unordered Lists`.

- Item one
- Item two
  - Nested item 2a
  - Nested item 2b
- Item three

### Ordered Lists

This section shows {index}`Ordered Lists`.

1. First step
2. Second step
   1. Sub-step 2.1
   2. Sub-step 2.2
3. Third step

## Blockquote

This section demonstrates a {index}`Blockquote`.

> This is a blockquote. It stands out from the main text and is used to highlight
> important information, quotes, or tangential notes.
>
> Blockquotes can span multiple paragraphs.

## Code Blocks

This section demonstrates {index}`Code Blocks`.

A Python code block with syntax highlighting:

```python
#!/usr/bin/env python3
"""A simple example script."""

def greet(name: str) -> str:
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("World"))
```

A shell code block:

```bash
#!/bin/bash
echo "Building documentation..."
thdocs build --strict
```

## Table

This section demonstrates a {index}`Table`.

A table with header and content rows:

| Feature | Supported | Notes |
|---------|-----------|-------|
| MyST Markdown | Yes | Full CommonMark + MyST extensions |
| Dark Theme | Yes | Custom thdocs theme with Tailwind |
| Search | Yes | Powered by Pagefind |

## Admonitions

This section demonstrates {index}`Admonitions`.

### Note

This section demonstrates a {index}`Note` admonition.

```{note}
This is a note admonition. Use notes to provide additional context or helpful information.
```

### Warning

This section demonstrates a {index}`Warning` admonition.

```{warning}
This is a warning admonition. Use warnings to highlight important cautions or gotchas.
```

## Keyboard Input

This section demonstrates {index}`Keyboard Input`.

To run thdocs, press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> or type:

```bash
thdocs dev
```

## Details / Summary

This section demonstrates {index}`Details / Summary` blocks.

<details>
<summary>Click to expand this details block</summary>

This is hidden content that appears when you click the summary. It's useful for optional or advanced information that shouldn't clutter the main page.

You can include multiple paragraphs and other elements inside a details block.

</details>

## Images and Figures

This section demonstrates {index}`Images and Figures`.

An image with a caption using a figure element:

```html
<figure>
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect fill='%23454443' width='200' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23e9e8e7' font-family='Arimo' font-size='16'%3ESample Image%3C/text%3E%3C/svg%3E" alt="A sample SVG image" width="200" height="100">
  <figcaption>This is a figure caption. It describes the image above.</figcaption>
</figure>
```

## Horizontal Rule

This section demonstrates a {index}`Horizontal Rule`.

A horizontal rule divides sections visually:

---

## Superscript and Subscript

This section demonstrates {index}`Superscript and Subscript`.

The chemical formula H<sub>2</sub>O uses subscript. E = mc<sup>2</sup> uses superscript.

## Thai Text

This section demonstrates {index}`Thai Text` rendering.

นี่คือข้อความภาษาไทย — ทดสอบการแสดงผลฟอนต์ภาษาไทยใน thdocs ด้วย Sarabun ซึ่งรองรับภาษาไทยอย่างสมบูรณ์

## Summary

This page demonstrates:

- ✅ Headings (h1–h4)
- ✅ Paragraph text with bold, italic, and inline code
- ✅ Links (external and cross-document)
- ✅ Ordered and unordered nested lists
- ✅ Blockquotes
- ✅ Fenced code blocks with syntax highlighting
- ✅ Tables with headers
- ✅ MyST admonitions (note, warning)
- ✅ HTML `<kbd>` elements
- ✅ HTML `<details><summary>` blocks
- ✅ Images with captions (via `<figure>`)
- ✅ Horizontal rules
- ✅ Superscript and subscript

All constructs should render cleanly with the thdocs dark theme.

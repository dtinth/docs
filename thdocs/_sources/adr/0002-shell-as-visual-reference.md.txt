# thdocs's theme CSS is independent; @apiref/shell is a visual reference

**Context.** The thdocs site must share a design language with the author's other property, `dtinth/apiref`, whose `@apiref/shell` package owns the design tokens, prose treatments, and chrome styling. shell ships a compiled Tailwind v4 stylesheet plus four Lit web components (`<ar-shell>`, `<ar-header>`, `<ar-nav>`, `<ar-outline>`) consumed by apiref via CDN.

**Decision.** thdocs does not consume shell as a runtime dependency. shell is treated as a *visual reference*: tokens, prose treatments, and CSS idioms are copied into thdocs and adapted to fit Sphinx's HTML output shape. thdocs's theme has its own class names, its own Jinja templates, and its own compiled `thdocs.css` (Tailwind v4 + `@tailwindcss/typography`, compiled at theme-author time and shipped inside the Python wheel). End users do not need a Node toolchain.

**Why.** apiref's HTML is shaped by Lit components; Sphinx's HTML is shaped by Jinja templates and the toctree model. Adopting shell's classes wholesale would mean either reshaping Sphinx's output (fighting Sphinx) or shipping classes that don't match the markup. PDF output further rules out anything that requires Lit hydration. Independent CSS, with shell as inspiration, gives us alignment with both Sphinx and the LaTeX builder while preserving the visual family resemblance.

**Rejected.** (a) Linking shell's compiled `dist/styles.css` and emitting `.ar-*` classes from Sphinx templates — class names assume apiref's HTML shape, and the bundle doesn't include `prose` styles. (b) Embedding shell's Lit components and feeding them a JSON nav blob — breaks PDF, fights `toctree`, couples thdocs to a private API. (c) Extending shell to bundle a Sphinx-aware build — couples shell to thdocs's needs and defeats Tailwind's whole-program purging.

**Consequence.** Drift between the doc theme and the website is managed manually. Acceptable while shell's tokens are stable; if drift becomes painful we can elevate shared tokens to a real package later.

# thdocs is a CLI wrapper that exposes MyST/Sphinx authoring directly

**Context.** thdocs is a documentation generator the author wants to reuse across all their projects. The user-facing input is Markdown; PDF output and a custom theme are required.

**Decision.** thdocs is a thin CLI wrapper (`thdocs build|dev|init`) over Sphinx. Sphinx *configuration* (`conf.py`, extension wiring, theme paths, builder names) is hidden from users. Sphinx *content authoring* — MyST directives, notably `{toctree}`, plus `{index}`, `{glossary}`, `{seealso}`, `{ref}`, `{doc}` — is part of the user-facing contract. Authors write Markdown and use these directives directly.

**Why.** Sphinx is stable and mature; abstracting over its authoring directives would be premature complexity for no benefit. The custom theme is the part still in flux, which is what justifies a wrapper at all. Principle: hide config plumbing, embrace authoring vocabulary.

**Rejected.** (a) Treating Sphinx as fully invisible — would require reinventing toctree, cross-refs, the index, the glossary, and a dozen other directives, all of which already work. (b) Consuming Sphinx as a library with no wrapper — would force every project to own a `conf.py` and learn theme-loading mechanics, which contradicts the whole "Markdown in, site out" pitch.

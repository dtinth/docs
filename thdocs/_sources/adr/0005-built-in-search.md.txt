# Use Sphinx's built-in client-side search instead of Pagefind

**Context.** The sidebar has a Search tab; initially the plan was to run
Pagefind as a post-build step over Sphinx's HTML output and use its JS API
to power the tab. Pagefind required a separate binary (npm/PyPI), a
post-build subprocess invocation, and its own indexing step.

**Decision.** thdocs uses Sphinx's built-in client-side search engine
(`searchtools.js` + `searchindex.js` + `language_data.js`) instead of
Pagefind. The search index (`searchindex.js`) is lazy-loaded when the
Search tab is first activated. Results are rendered directly into the
sidebar panel via the `Search` API — no full-page redirect.

**Why.** Sphinx already generates a complete, working client-side search
engine as part of every build — a stemmed inverted index with full-text,
title, index-entry, and object search. It is included with every Sphinx
installation, needs no extra dependencies, requires no post-build step, and
works in both production and dev mode (since `sphinx-autobuild` generates
`searchindex.js` too). Pagefind would have added complexity (binary
management, post-build hook, dev-mode special-casing) with no meaningful
benefit for a documentation site of this scale.

**Rejected.** (a) Pagefind — adds a native binary dependency, a post-build
step, and extra CI complexity for marginal improvement. (b) Full-page
redirect to Sphinx's `search.html` — takes the user away from their current
page, breaks the CHM-inspired sidebar-chrome pattern.

**Consequence.** The ~200 KB `searchindex.js` payload is loaded on demand
when the Search tab is first activated. It is cached by the browser on
subsequent page loads (it has a stable URL per build). The built-in
`makeSearchSummary` fetches each result page to extract context snippets,
which means extra HTTP requests — acceptable for the typical doc-site
workload.

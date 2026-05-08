# Contents sidebar uses Lit component with JSON tree data, not Sphinx's native toctree markup

**Context.** The Contents tab must render a full, interactive tree of all pages and sections (for CHM-style navigation) while keeping the initial HTML lean and avoiding duplication. Sphinx's `{toctree}` directive generates the tree as part of the HTML sidebar — nested `<ul>/<li>` with `<p class="caption">` section headers interspersed. This creates two problems: (a) embedding the full tree in every page's HTML bloats initial markup, especially in large docs with API references, and (b) the mixed HTML structure (captions as `<p>` elements, pages as `<li>` elements) requires two code paths in JavaScript to handle uniformly.

**Decision.** The build process generates a separate `toctree.json` file (via a Sphinx extension) containing the full tree structure. The sidebar HTML is minimal — just the current-page nav context, like normal Sphinx docs. A Lit-based `<tdhocs-tree>` web component fetches `toctree.json` at runtime and renders the full interactive tree. Tree state (expanded/collapsed sections, scroll position, focused link) is persisted in `sessionStorage`.

**Why.** This approach decouples data (the tree) from markup (the sidebar HTML), giving us:

- **Lean initial HTML.** Only the current page's nav context is embedded; the full tree is fetched on demand.
- **No duplication.** The tree is defined once (in `toctree.json`) and consumed by JavaScript, not duplicated in every page's HTML.
- **Unified structure.** Captions and pages become uniform tree nodes in JSON, with one JavaScript code path instead of two.
- **Full control.** A Lit component lets us implement exactly the UX we want (collapse/expand, scrolling, focus restoration, keyboard nav) without fighting Sphinx's rendered HTML.
- **Graceful degradation.** If JavaScript is unavailable, the minimal Sphinx nav is still present and functional.
- **Reusable component.** `<tdhocs-tree>` is a web component that could be reused or shared with other projects (e.g., apiref/shell).

**Rejected.** (a) Parse Sphinx's HTML tree in JavaScript — fragile if Sphinx's output changes, and the mixed `<p>` / `<li>` structure requires two code paths. (b) Embed the full tree in HTML and let JavaScript enhance it — bloats every page's initial HTML by duplicating the tree. (c) Use vanilla JavaScript instead of Lit — would work but loses the component model and reusability. (d) Fetch HTML instead of JSON — JSON is smaller and more structured; HTML would require parsing and reconstruction.

**Consequence.** The build process must generate `toctree.json` from Sphinx's internal toctree state. This requires a Sphinx extension hook (e.g., `config-inited` or `build-finished`). The tree JSON schema is owned by thdocs, not Sphinx, so the contract is explicit and stable.

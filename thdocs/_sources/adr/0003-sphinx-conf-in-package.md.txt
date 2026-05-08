# Sphinx is invoked with a `conf.py` shipped inside the thdocs package

**Context.** Sphinx requires a `confdir` containing a `conf.py`. thdocs needs to invoke Sphinx without exposing Sphinx config to users.

**Decision.** thdocs ships a static `conf.py` inside its own Python package (e.g. `src/thdocs/sphinx/conf.py`). The CLI invokes Sphinx with `-c <thdocs-pkg>/sphinx`, passing the user's project root via the `THDOCS_PROJECT` env var. The shipped `conf.py` reads `<project>/thdocs.toml` at config time and translates fields into Sphinx settings (project, author, extensions, theme path, static path).

**Why.** This is the most idiomatic Sphinx integration: `conf.py` is *designed* to be Python that reads its environment. It keeps the user's project free of Sphinx config files, and stays fully compatible with `sphinx-autobuild` (which `thdocs dev` relies on).

**Rejected.** (a) Generating `conf.py` per build into a temp dir — extra file thrash, more glue to maintain. (b) Using the programmatic `Sphinx(...)` API with `confoverrides` — loses `sphinx-autobuild` compatibility, since that tool wants `-c <dir>` semantics.

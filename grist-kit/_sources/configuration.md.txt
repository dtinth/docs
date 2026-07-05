<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Configuration

All CLI commands require a Grist document URL. Credentials are read from environment variables or flags.

## Environment variables

- `GRIST_DOC_URL` — base doc URL, e.g. `https://grist.example.com/api/docs/xxxx`. Required for all commands. Find it in Grist under **Settings** → **API** → **Document ID** → **Base doc URL**.
- `GRIST_API_KEY` / `GRIST_ACCESS_TOKEN` — provide one (not both). Neither is needed for public documents. See `grist-kit help authentication` for the difference.

The CLI reads from environment variables. It also supports loading a `.env` file, though real environment variables take precedence.

## Flags

These flags are accepted by every command and override the corresponding environment variable.

- `--doc-url <url>` — overrides `GRIST_DOC_URL`.
- `--api-key <key>` — overrides `GRIST_API_KEY`.
- `--access-token <token>` — overrides `GRIST_ACCESS_TOKEN`.
- `--env-file <path>` — load a specific `.env` file instead of the default.

# Configuration

All CLI commands require a Grist document URL. Credentials are read from environment variables or flags.

## Environment variables

`GRIST_DOC_URL`
: Base doc URL — e.g. `https://grist.example.com/api/docs/xxxx`. Required for all commands.

`GRIST_API_KEY` / `GRIST_ACCESS_TOKEN`
: Provide one (not both). See {doc}`../library/authentication` for the difference.

The CLI reads from environment variables. It also supports loading a `.env` file, though real environment variables take precedence.

## Flags

These flags are accepted by every command and override the corresponding environment variable.

`--doc-url <url>`
: Overrides `GRIST_DOC_URL`.

`--api-key <key>`
: Overrides `GRIST_API_KEY`.

`--access-token <token>`
: Overrides `GRIST_ACCESS_TOKEN`.

`--env-file <path>`
: Load a specific `.env` file instead of the default.

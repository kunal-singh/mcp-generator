# create-mcp

Scaffold a new [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server with a clean, layered architecture — ready to wire up to any external API.

## Usage

**From GitHub (no npm publish required):**

```bash
# interactive
npx github:kunal-singh/mcp-generator

# with name
npx github:kunal-singh/mcp-generator github
pnpx github:kunal-singh/mcp-generator github
```

This generates a ready-to-build project at `./<name>-mcp/`.

## What gets generated

```
<name>-mcp/
  src/
    main.ts               # Entry point
    bootstrap.ts          # Infrastructure wiring
    config/               # Environment & schema validation (Zod)
    core/                 # MCP SDK wiring: server, builder, transport, errors
    lib/                  # Shared utilities: logger, TTL cache, response formatter
    registry/             # Generic tool / resource / prompt registries
    types/                # Shared TypeScript interfaces
    domain/
      api/
        client.interface.ts     # I<Name>Client interface — define your API surface
        client.ts               # <Name>Client extends HttpClientBase
        cached-client.ts        # Cached<Name>Client — TTL-cached wrapper
        http-client.base.ts     # Generic Bearer-auth HTTP base class
      tools/
        definitions/            # Tool input schemas (MCP ToolDefinition)
        handlers/               # Tool handler functions
      resources/
        definitions/            # Resource definitions (URI + mimeType)
        handlers/               # Resource handler functions
      prompts/
        definitions/            # Prompt definitions (name + arguments)
        handlers/               # Prompt handler functions
      manifest.ts               # Wires everything into a ServerManifest
```

## Template variables

| Placeholder  | Example input `github` |
| ------------ | ---------------------- |
| `{{name}}`   | `github`               |
| `{{Name}}`   | `Github`               |
| `{{NAME}}`   | `GITHUB`               |

## After scaffolding

```bash
cd <name>-mcp
pnpm install
pnpm build
```

1. Set `TOKEN` env var to your API token
2. Implement `src/domain/api/client.ts` with your actual API base URL and methods
3. Replace the example tool/resource/prompt stubs with real implementations
4. Register everything in `src/domain/manifest.ts`
5. Run `pnpm inspect` to test with the MCP inspector

## Architecture

The generated project enforces a clean separation between MCP infrastructure and domain logic:

- **`core/`** — pure MCP SDK wiring; knows nothing about your API
- **`registry/`** — generic, type-safe registries for tools, resources, prompts
- **`domain/`** — all API-specific code lives here; core never imports from domain

The only file that touches both is `bootstrap.ts`, which wires them together.

## Development

```bash
pnpm install
pnpm run setup   # Install git hooks (run once after cloning)

pnpm build       # Build CLI
pnpm dev         # Watch mode
pnpm typecheck   # TypeScript check
pnpm lint        # ESLint
```

## License

MIT

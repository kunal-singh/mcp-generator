# {{name}}-mcp

A Model Context Protocol (MCP) server for {{Name}}, giving AI assistants access to your {{Name}} data and operations.

## Requirements

- **Node.js** ≥ 22.0.0
- **pnpm** (recommended) or npm
- A {{Name}} API token

## Getting Your API Token

1. Log in to your {{Name}} account
2. Navigate to API / Developer settings
3. Create a new token or copy your existing one

## Installation

```bash
git clone <your-repo-url>
cd {{name}}-mcp
pnpm install
pnpm build
```

## Configure Your MCP Client

The server communicates over stdio. Add it to your MCP client by pointing to the built binary and passing `TOKEN` in the environment.

### Claude Desktop

Add this to your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "{{name}}": {
      "command": "/path/to/node",
      "args": ["/path/to/{{name}}-mcp/dist/main.js"],
      "env": {
        "TOKEN": "your-api-token"
      }
    }
  }
}
```

### Cursor

Add this to Cursor's MCP settings (`.cursor/mcp.json` or Cursor Settings → MCP):

```json
{
  "mcpServers": {
    "{{name}}": {
      "command": "node",
      "args": ["/path/to/{{name}}-mcp/dist/main.js"],
      "env": {
        "TOKEN": "your-api-token"
      }
    }
  }
}
```

Optional env vars:

- `LOG_LEVEL` — `debug`, `info`, or `error` (default: `info`)

## Available Tools

| Tool          | Description                    |
| ------------- | ------------------------------ |
| `get_example` | Retrieve example data from the API |

> TODO: Replace with your actual tools.

## Resources

| Resource URI        | Description          |
| ------------------- | -------------------- |
| `{{name}}://example` | Example resource data |

> TODO: Replace with your actual resources.

## Prompts

| Prompt           | Description                   |
| ---------------- | ----------------------------- |
| `example_prompt` | An example prompt stub        |

> TODO: Replace with your actual prompts.

## Development

```bash
pnpm install
pnpm dev          # Watch mode
pnpm build        # Production build
pnpm clean        # Remove dist/
pnpm inspect      # Run MCP inspector for debugging
```

## License

MIT

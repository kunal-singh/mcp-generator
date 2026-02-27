import type { ServerManifest } from '../types/manifest.types';
import { ToolRegistry } from '../registry/tools';
import { ResourceRegistry } from '../registry/resources';
import { PromptRegistry } from '../registry/prompts';
import type { I{{Name}}Client } from './api/client.interface';
import { Cached{{Name}}Client } from './api/cached-client';
import { logger } from '../lib/logger';

// Tool definitions
import { getExampleTool } from './tools/definitions';

// Tool handlers
import { getExampleHandler } from './tools/handlers';

// Resource definitions and handlers
import { exampleResource } from './resources/definitions';
import { exampleHandler } from './resources/handlers';

// Prompt definitions and handlers
import { examplePrompt } from './prompts/definitions';
import { examplePromptHandler } from './prompts/handlers';

/**
 * Build the complete {{Name}} MCP server manifest
 *
 * This function encapsulates all {{Name}}-specific capability declarations.
 * To add a new tool, resource, or prompt, register it here alongside its handler.
 *
 * @param client - {{Name}} API client instance
 * @returns Complete server manifest with all providers
 */
export function build{{Name}}Manifest(client: I{{Name}}Client): ServerManifest {
  const cachedClient = new Cached{{Name}}Client(client);

  // Construct and populate tool registry
  const toolRegistry = new ToolRegistry(cachedClient);
  toolRegistry.registerMany([
    // TODO: Register your tool definitions and handlers here
    { definition: getExampleTool, handler: getExampleHandler },
  ]);

  // Construct and populate resource registry
  const resourceRegistry = new ResourceRegistry(cachedClient);
  resourceRegistry.registerMany([
    // TODO: Register your resource definitions and handlers here
    { definition: exampleResource, handler: exampleHandler },
  ]);

  // Construct and populate prompt registry
  const promptRegistry = new PromptRegistry(cachedClient);
  promptRegistry.registerMany([
    // TODO: Register your prompt definitions and handlers here
    { definition: examplePrompt, handler: examplePromptHandler },
  ]);

  return {
    tools: toolRegistry,
    resources: resourceRegistry,
    prompts: promptRegistry,
  };
}

/**
 * Pre-warm the cache by fetching all cacheable endpoints at startup.
 * Failures are non-fatal — the cache will populate lazily on first request.
 *
 * @param client - Must be a Cached{{Name}}Client instance for warming to have effect
 *
 * TODO: Replace example endpoints with your actual cacheable endpoints
 */
export async function primeCache(client: I{{Name}}Client): Promise<void> {
  const endpoints = [
    // TODO: Add your cacheable endpoints here
    // Example:
    { name: 'example', fn: () => client.getData() },
  ];

  await Promise.allSettled(
    endpoints.map(async ({ name, fn }) => {
      try {
        await fn();
        logger.info(`Cache warmed: ${name}`);
      } catch (error) {
        logger.warn(
          `Cache warm failed for ${name}, will populate on first request`,
          {
            error: error instanceof Error ? error.message : String(error),
          },
        );
      }
    }),
  );
}

import { loadConfig } from './config/environment';
import { {{Name}}Client } from './domain/api/client';
import { build{{Name}}Manifest, primeCache } from './domain/manifest';
import { MCPServerBuilder } from './core/builder';
import { createTransport } from './core/transport/index';
import { logger } from './lib/logger';

/**
 * Bootstrap the MCP server
 * Pure infrastructure wiring - domain capabilities defined in manifest
 */
export async function bootstrap() {
  logger.info('Loading configuration...');
  const config = loadConfig();

  logger.info('Creating {{Name}} client...');
  const client = new {{Name}}Client(config.token);

  logger.info('Building server manifest...');
  const manifest = build{{Name}}Manifest(client);

  logger.info('Warming cache...');
  primeCache(client).catch((error) => {
    logger.warn('Cache warm-up failed, will populate lazily', {
      error: error instanceof Error ? error.message : String(error),
    });
  });

  logger.info('Creating transport...');
  const transport = createTransport(config);

  logger.info('Building MCP server...');
  const server = await MCPServerBuilder.create()
    .withConfig(config)
    .withManifest(manifest)
    .withTransport(transport)
    .build();

  logger.info('MCP server started successfully');

  return server;
}

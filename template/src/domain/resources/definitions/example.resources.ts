import type { ResourceDefinition } from '../../../types/resource.types';

/**
 * Example resource definition
 *
 * TODO: Replace this with your actual resource definitions.
 * Resources are read-only data endpoints exposed to the MCP client.
 * The URI scheme should reflect your domain (e.g., {{name}}://collections).
 */
export const exampleResource: ResourceDefinition = {
  uri: '{{name}}://example',
  name: 'Example',
  description: 'Example data from the {{Name}} API',
  mimeType: 'application/json',
};

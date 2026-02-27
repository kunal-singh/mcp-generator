import type { ToolDefinition } from '../../../types/tool.types';

/**
 * Example tool definition
 *
 * TODO: Replace this with your actual tool definitions.
 * Each tool definition describes the tool's name, description, and input schema.
 * The name must be unique across all registered tools.
 */
export const getExampleTool: ToolDefinition = {
  name: 'get_example',
  description: 'Retrieve example data from the {{Name}} API',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the item to retrieve (optional)',
      },
    },
  },
};

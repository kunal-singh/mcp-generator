import type { ToolHandler } from '../../../types/tool.types';
import type { I{{Name}}Client } from '../../api/client.interface';
import { formatToolResponse } from '../../../lib/response-formatter';

/**
 * Example tool handler
 *
 * TODO: Replace this with your actual tool handlers.
 * Each handler receives the tool arguments and a typed client instance.
 * Call the appropriate client method(s) and return a formatted response.
 */
export const getExampleHandler: ToolHandler<I{{Name}}Client> = async (
  args,
  client,
) => {
  const result = await client.getData(args.id as string | undefined);
  return formatToolResponse(result);
};

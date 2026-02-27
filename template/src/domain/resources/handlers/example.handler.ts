import type {
  ResourceHandler,
  ResourceContent,
} from '../../../types/resource.types';
import type { I{{Name}}Client } from '../../api/client.interface';

/**
 * Example resource handler
 *
 * TODO: Replace this with your actual resource handlers.
 * Each handler receives the resource URI and a typed client instance.
 * Fetch the data and return it as a ResourceContent object.
 */
export const exampleHandler: ResourceHandler<I{{Name}}Client> = async (
  uri,
  client,
): Promise<ResourceContent> => {
  const result = await client.getData();

  return {
    uri,
    mimeType: 'application/json',
    text: JSON.stringify(result, null, 2),
  };
};

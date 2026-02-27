import type {
  PromptHandler,
  PromptResponse,
} from '../../../types/prompt.types';
import type { I{{Name}}Client } from '../../api/client.interface';

/**
 * Example prompt handler
 *
 * TODO: Replace this with your actual prompt handlers.
 * Each handler receives the prompt name, arguments, and a typed client instance.
 * Return a PromptResponse with an array of messages (the conversation to replay).
 * The client is available if you need to fetch data to populate the prompt.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const examplePromptHandler: PromptHandler<I{{Name}}Client> = async (
  _name,
  args,
  _client,
): Promise<PromptResponse> => {
  const { input } = args as { input: string };

  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Process the following input from {{Name}}: "${input}"`,
        },
      },
    ],
  };
};

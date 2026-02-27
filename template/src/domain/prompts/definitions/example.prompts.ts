import type { PromptDefinition } from '../../../types/prompt.types';

/**
 * Example prompt definition
 *
 * TODO: Replace this with your actual prompt definitions.
 * Prompts are structured templates that guide the AI to perform specific tasks.
 * They are useful when a simple tool call isn't enough — they teach the model
 * how to transform inputs, apply domain logic, and return structured outputs.
 */
export const examplePrompt: PromptDefinition = {
  name: 'example_prompt',
  description:
    'An example prompt that demonstrates how to structure a prompt definition for the {{Name}} MCP server',
  arguments: [
    {
      name: 'input',
      description: 'The input to process',
      required: true,
    },
  ],
};

import { createInterface } from 'node:readline';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { scaffold, toPascalCase, toKebabCase } from './scaffold.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function prompt(question: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\ncreate-mcp — scaffold a new MCP server\n');

  // Accept project name from CLI arg or prompt interactively
  let projectName = process.argv[2];
  if (!projectName) {
    projectName = await prompt('Project name (e.g. github): ');
  }

  if (!projectName) {
    console.error('Error: project name is required.');
    process.exit(1);
  }

  // Derive the template variable `name` (lowercase-kebab) and the output directory name
  const name = toKebabCase(projectName.toLowerCase());
  const outputDir = path.resolve(process.cwd(), `${name}-mcp`);

  if (fs.existsSync(outputDir)) {
    console.error(`Error: directory "${outputDir}" already exists.`);
    process.exit(1);
  }

  // The template directory ships alongside this package
  const templateDir = path.resolve(__dirname, '../template');

  if (!fs.existsSync(templateDir)) {
    console.error(
      `Error: template directory not found at "${templateDir}". Is the package installed correctly?`,
    );
    process.exit(1);
  }

  console.log(`\nScaffolding ${name}-mcp into ${outputDir} ...`);

  scaffold({
    projectName,
    name,
    templateDir,
    outputDir,
  });

  const Name = toPascalCase(name);
  const NAME = name.toUpperCase();

  console.log(`
Done! Your new MCP server is ready.

  cd ${name}-mcp
  pnpm install
  pnpm build

Next steps:
  1. Set the TOKEN environment variable to your ${Name} API token
  2. Update src/domain/api/client.ts with your actual API base URL and methods
  3. Replace the example tool/resource/prompt stubs in src/domain/ with real implementations
  4. Add your token to your MCP client config:

     {
       "env": { "TOKEN": "your-${name}-api-token" }
     }

  5. Run \`pnpm inspect\` to test with the MCP inspector

Template variables used:
  {{name}}  → ${name}
  {{Name}}  → ${Name}
  {{NAME}}  → ${NAME}
`);
}

main().catch((err: unknown) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

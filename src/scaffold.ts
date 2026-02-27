import fs from 'node:fs';
import path from 'node:path';

export interface ScaffoldOptions {
  /** The raw project name as entered (e.g. "my-github" or "GitHub") */
  projectName: string;
  /** The template variable name (e.g. "github") */
  name: string;
  /** Source template directory */
  templateDir: string;
  /** Destination project directory */
  outputDir: string;
}

/**
 * Convert a string to PascalCase.
 * "my-github" -> "MyGithub", "github" -> "Github", "GitHub" -> "Github"
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c: string) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (c) => c.toUpperCase());
}

/**
 * Convert a string to lowercase-kebab-case.
 * "GitHub" -> "github", "MyGithub" -> "mygithub", "my-github" -> "my-github"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * Replace all template placeholders in a string.
 */
function replacePlaceholders(
  content: string,
  name: string,
  Name: string,
  NAME: string,
): string {
  return content
    .replaceAll('{{name}}', name)
    .replaceAll('{{Name}}', Name)
    .replaceAll('{{NAME}}', NAME);
}

/**
 * Files/directories to skip when copying the template.
 * These are the scaffolder's own build artifacts.
 */
const SKIP_PATTERNS = new Set(['node_modules', 'dist', 'pnpm-lock.yaml']);

/**
 * Recursively copy template directory to outputDir,
 * replacing {{name}}, {{Name}}, {{NAME}} placeholders in all file contents.
 */
export function scaffold(options: ScaffoldOptions): void {
  const { name, templateDir, outputDir } = options;
  const Name = toPascalCase(name);
  const NAME = name.toUpperCase();

  copyDir(templateDir, outputDir, name, Name, NAME);
}

function copyDir(
  src: string,
  dest: string,
  name: string,
  Name: string,
  NAME: string,
): void {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_PATTERNS.has(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destName = replacePlaceholders(entry.name, name, Name, NAME);
    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, name, Name, NAME);
    } else {
      const content = fs.readFileSync(srcPath, 'utf-8');
      const transformed = replacePlaceholders(content, name, Name, NAME);
      fs.writeFileSync(destPath, transformed, 'utf-8');
    }
  }
}

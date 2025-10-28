// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Build outputs
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "storybook-static/**",
    ".storybook-static/**",
    // Dependencies
    "node_modules/**",
    // Config files
    "*.config.js",
    "*.config.ts",
    "*.config.mjs",
    // TypeScript
    "next-env.d.ts",
    "*.tsbuildinfo",
    // Git hooks
    ".husky/**",
    // Public assets
    "public/**",
    // Other
    "coverage/**",
    ".turbo/**",
  ]),
  {
    rules: {
      // Custom rule to discourage raw hex colors - use Tailwind tokens instead
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'Literal[value=/#[0-9a-fA-F]{3,8}/]',
          message: 'Use Tailwind color tokens (bg-primary, text-foreground, etc.) instead of raw hex colors',
        },
        {
          selector: 'TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}/]',
          message: 'Use Tailwind color tokens instead of raw hex colors in template literals',
        },
      ],
    },
  },
]);

export default eslintConfig;

import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import globals from "globals";

/**
 * Custom ESLint 10 flat config.
 *
 * Replaces `eslint-config-next` with its directly-compatible building blocks.
 * `eslint-config-next@16.3.6` depends on eslint-plugin-react, eslint-plugin-import,
 * and eslint-plugin-jsx-a11y, none of which declare ESLint 10 support. The four
 * plugins below do.
 *
 * See docs/decision-log.md for the full rationale.
 */
const eslintConfig = defineConfig([
  {
    name: "next/core-web-vitals",
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    ...nextPlugin.configs["core-web-vitals"],
  },
  {
    name: "react-hooks/recommended",
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    ...reactHooks.configs.flat.recommended,
  },
  ...tseslint.configs.recommended,
  {
    name: "globals/browser-node",
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;

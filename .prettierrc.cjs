/**
 * Prettier configuration translated from a PHPStorm code style export.
 * Each option below maps to a setting in the exported Project.xml.
 */

/** @type {import('prettier').Config} */
module.exports = {
  // SOFT_MARGINS = 80
  printWidth: 80,

  // Overridden to match the Google TypeScript Style Guide (2-space indent).
  // PHPStorm export had USE_TAB_CHARACTER = true; intentionally using spaces.
  useTabs: false,
  tabWidth: 2,

  // FORCE_SEMICOLON_STYLE = true
  semi: true,

  // USE_DOUBLE_QUOTES = false  (FORCE_QUOTE_STYLE = true enforces it)
  singleQuote: true,

  // ENFORCE_TRAILING_COMMA = WhenMultiline
  trailingComma: 'all',

  // SPACES_WITHIN_OBJECT_LITERAL_BRACES = true
  // SPACES_WITHIN_IMPORTS = true
  bracketSpacing: true,

  // Overridden to match the Google TypeScript Style Guide (LF).
  // PHPStorm export had LINE_SEPARATOR = \r\n; intentionally using LF.
  endOfLine: 'lf',

  // Format Svelte component files via the official plugin.
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};

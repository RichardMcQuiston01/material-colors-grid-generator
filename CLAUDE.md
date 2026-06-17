## Project Configuration

- **Language**: TypeScript
- **Package Manager**: bun
- **Add-ons**: eslint, vitest, tailwindcss, sveltekit-adapter

---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A SvelteKit SPA that renders a grid of color swatches onto an HTML Canvas element, which users can download/export. Intended for use in product listings to display available colors (e.g. filament colors grouped by material type like PLA, PETG).

> **Project status:** Core app implemented. SvelteKit (Svelte 5 runes) + TailwindCSS v4 static-adapter SPA (`fallback: '200.html'`, `ssr = false`). Tooling: `bun`, ESLint, Vitest, Prettier (custom `.prettierrc.cjs` + `prettier-plugin-svelte`). Adapter/runes config live in `vite.config.ts` (no `svelte.config.js`).
>
> Implemented in `src/lib/`: domain `types`, `ordering` (dark→light), `render-model` (flattening/grouping), `defaults`, `persistence` (localStorage), `factories`, `document.svelte.ts` (runes store), `layout` + `units` + `renderer` (canvas), and `components/` (ColorEditor, StyleControls, FontControls, CanvasPreview). Pure logic is test-driven. Still **planned**: header/footer text, watermark, JSON import/export (see Planned Features).

## Tech Stack

- **SvelteKit** — SPA framework
- **TailwindCSS** — styling

## Development Commands

Use **`bun`** for running scripts and managing dependencies — avoid `npm` and `yarn`.

Once the project is scaffolded:

```bash
bun install          # install dependencies
bun run dev          # start dev server
bun run build        # production build
bun run preview      # preview production build
bun run typecheck    # type-check (fast; svelte-check)
bun run lint         # lint
bun run test         # run tests
```

### Workflow

1. Make changes.
2. Typecheck (fast): `bun run typecheck`.
3. Write tests wherever possible.
4. Run tests.
5. Lint before committing.

## Code Style

Formatting is governed by `.prettierrc.cjs`: 2-space indent (no tabs), single quotes, semicolons, trailing commas everywhere, `bracketSpacing`, LF line endings, 80-char print width. These were derived from a PHPStorm export reconciled with the Google TypeScript Style Guide — match them in all generated code.

Markdown files follow the [Google Markdown Style Guide](https://google.github.io/styleguide/docguide/style.html).

## UI Design & Accessibility

These apply to the **application's own interface** (the editor chrome, controls, and layout) — distinct from the canvas output, whose appearance is user-configurable at runtime.

- **Visual language:** Modern, clean, flat design. Use flat icons (no skeuomorphism, gradients, or drop shadows beyond subtle elevation). Favor whitespace and clear hierarchy.
- **Color:** Use **dark green** as the primary accent/brand color. Build a small, consistent palette around it via Tailwind theme tokens rather than ad-hoc hex values.
- **Typography:** Sans-serif throughout (e.g. the system sans stack or a single bundled sans-serif family).
- **Contrast:** Meet **WCAG 2** contrast requirements — at minimum AA (4.5:1 for normal text, 3:1 for large text and UI/graphical elements). Verify the dark-green accent against its backgrounds and the chosen accent foreground.
- **Accessibility:** Full keyboard navigation (logical tab/focus order, visible focus indicators, no keyboard traps). Provide `title` / `aria-*` attributes and accessible names on interactive controls and icon-only buttons. Use semantic HTML and associate `<label>`s with inputs.

## Architecture

### Domain Model

- **Category** — top-level grouping (e.g. "PLA", "PETG"). A "Default" category exists but its header is omitted if it's the only one.
- **Sub-Category** — optional grouping within a Category.
- **Color** — belongs to a Category or Sub-Category; has a name and hex value.

### Rendering Order

1. Categories — alphabetical
2. Sub-Categories within each category — alphabetical
3. Colors within each group — dark to light (`#000000` → `#ffffff`)
4. Cards wrap to next row after reaching the configured cards-per-row limit.

### Output

- Rendered to an HTML `<canvas>` element.
- Each color is displayed as a card: color chip + hex code + color name.
- Configurable: canvas dimensions, aspect ratio (portrait/landscape), font per text level (category, sub-category, card), card border, cards per row, card background color.

### State & Persistence

- **State management:** Svelte 5 runes (`$state` / `$derived`), not the legacy writable-store API. Hold the whole document — the category/sub-category/color tree plus all style config — in a single `$state` object.
- **Derived, never stored:** The render layout (alphabetical categories → alphabetical sub-categories → dark-to-light colors, wrapped at cards-per-row) is computed via `$derived` from the source data. Persist only what the user authored, so saved data re-sorts correctly if ordering rules change.
- **Persistence:** Auto-save the document to **localStorage** via a `$effect` that serializes on change (`JSON.stringify`). The dataset is small and non-sensitive, so localStorage is sufficient — no IndexedDB or backend.
- **SSR guard:** `localStorage` only exists in the browser. Guard access with `browser` from `$app/environment` (or read inside `onMount`), and disable SSR/prerender for the editor route (`export const ssr = false`) since canvas rendering is client-only.
- **Backup/share (planned):** Offer JSON export/import of the document so users can back up or share a color set, since localStorage is per-browser and cleared with site data.

### Default Configuration

Per the README, the initial/default values are:

| Setting                  | Default                                                                        |
| ------------------------ | ------------------------------------------------------------------------------ |
| Category font            | Arial, Black, 1rem                                                             |
| Sub-category font        | Arial, Black, 0.85rem                                                          |
| Card font                | Arial, **Auto**, 0.75rem                                                       |
| Orientation              | Landscape                                                                      |
| Aspect ratio             | 4:3                                                                            |
| Dimensions               | 1440×1280 (chosen from a list of standard sizes for the selected aspect ratio) |
| Cards per row            | 5                                                                              |
| Card background          | `#f7f7f7`                                                                      |
| Rounded corners          | Yes                                                                            |
| Border thickness / color | 0.25rem / `#dddddd`                                                            |

Font color options are Black / White / Custom for headers; Black / White / **Auto** for cards, where Auto uses the card's own hex value as the font color.

### Key UI Sections

- **Output Style Inputs** — controls canvas dimensions, aspect ratio, orientation, and card appearance (rounded corners, border, background).
- **Font Controls** — separate font name/color/size for: category headers, sub-category headers, and color cards. Card font color supports "Auto" mode (uses the card's hex value as the font color).
- **Color Inputs** — CRUD for categories, sub-categories, and colors.
- **Preview/Export** — renders canvas; provides download button.

## Planned Features

Tracked in the README as not-yet-built:

1. Header and/or footer text with configurable background color and font.
2. Watermark image placed in a specified corner (top-left, top-right, bottom-left, bottom-right).
3. JSON export/import of the document for backup and sharing (complements the per-browser localStorage persistence — see [State & Persistence](#state--persistence)).

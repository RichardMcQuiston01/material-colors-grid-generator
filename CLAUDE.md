# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A SvelteKit SPA that renders a grid of color swatches onto an HTML Canvas element, which users can download/export. Intended for use in product listings to display available colors (e.g. filament colors grouped by material type like PLA, PETG).

## Tech Stack

- **SvelteKit** — SPA framework
- **TailwindCSS** — styling

## Development Commands

Once the project is scaffolded, standard SvelteKit commands apply:

```bash
npm install          # install dependencies
npm run dev          # start dev server
npm run build        # production build
npm run preview      # preview production build
npm run check        # type-check with svelte-check
npm run lint         # lint
```

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

### Key UI Sections

- **Output Style Inputs** — controls canvas dimensions, aspect ratio, orientation, and card appearance (rounded corners, border, background).
- **Font Controls** — separate font name/color/size for: category headers, sub-category headers, and color cards. Card font color supports "Auto" mode (uses the card's hex value as the font color).
- **Color Inputs** — CRUD for categories, sub-categories, and colors.
- **Preview/Export** — renders canvas; provides download button.

# Material Colors Grid Generator

A SvelteKit single-page app that renders a grid of color swatches onto an HTML
canvas and exports it as an image. It is intended for product listings — for
example, showing the filament colors available for a 3D-printing product,
grouped by material type (PLA, PETG, and so on).

Each color is drawn as a card with a color chip, its hex code, and its name.
Everything is configurable: canvas size, card appearance, fonts, an optional
header/footer, and a corner watermark. Your work is saved automatically in the
browser and can be exported/imported as JSON.

## Features

- **Color grid** organized by category and optional sub-category.
- **Automatic ordering**: categories and sub-categories alphabetical; colors
  dark to light (`#000000` → `#ffffff`). The sole "Default" category prints no
  header.
- **Configurable output**: dimensions, aspect ratio, orientation, cards per
  row, card background, and card border (rounded corners, thickness, color).
- **Per-level fonts** for category headers, sub-category headers, and cards.
  Card font color supports an "Auto" mode that uses each card's own hex value.
- **Header/footer text** bands with their own background color and font.
- **Watermark image** placed in any corner, with size and opacity controls.
- **PNG export** of the rendered canvas.
- **JSON import/export** to back up or share a color set.
- **Auto-save** to the browser's `localStorage`.

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5 runes), configured as a
  static-adapter SPA.
- [Tailwind CSS](https://tailwindcss.com) v4.
- [Vitest](https://vitest.dev) for unit tests, ESLint and Prettier for quality.
- [Bun](https://bun.sh) as the package manager and script runner.

## Getting started

### Prerequisites

- [Bun](https://bun.sh) (used for installing dependencies and running scripts).

### Install

```sh
bun install
```

### Run the dev server

```sh
bun run dev

# or open the app in a new browser tab automatically
bun run dev -- --open
```

### Build and preview

```sh
bun run build     # production build into ./build
bun run preview   # serve the production build locally
```

The build uses `@sveltejs/adapter-static` with a `200.html` fallback, so the
output in `build/` is a static SPA you can host on any static file server.

### Quality checks

```sh
bun run typecheck   # svelte-check
bun run test        # run unit tests
bun run lint        # Prettier check + ESLint
bun run format      # apply Prettier formatting
```

## Usage

1. **Add colors.** In the **Colors** panel, rename the default category or add
   more. Within a category you can add colors directly and/or add
   sub-categories that each hold their own colors. Every color has a name and a
   hex value.
2. **Adjust the output.** Use **Output Style** to set canvas dimensions, aspect
   ratio, orientation, cards per row, the card background, and the card border.
3. **Set fonts.** Use **Fonts** to choose the font family, color, and size for
   category headers, sub-category headers, and cards. Choose **Auto** for the
   card font color to match each card's own hex value.
4. **Add a header/footer (optional).** In **Header & Footer**, type text for a
   band to show it; leave the text empty to hide it. Each band has its own
   background color and font.
5. **Add a watermark (optional).** In **Watermark**, upload an image and choose
   its corner, size, and opacity.
6. **Export.** The live **Preview** updates as you edit. Click **Download PNG**
   to save the image.
7. **Back up or share.** Use **Export JSON** / **Import JSON** in the header to
   save or load a document. **Reset** returns to a blank document.

Your document is saved in the browser automatically; clearing site data
removes it, so use **Export JSON** for a durable backup.

## License

Released under the [MIT License](LICENSE.md).

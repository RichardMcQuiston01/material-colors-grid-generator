/**
 * Framework-free public core of the Material Colors Grid Generator.
 *
 * This barrel is the package entry point (see `package.json` `exports`). It
 * re-exports every part of `src/lib` that does NOT depend on Svelte, so the
 * same domain model, layout engine, and canvas renderer can back a non-Svelte
 * UI (e.g. the React app in maker-template-pro) without pulling in the editor
 * chrome. The Svelte runes store (`document.svelte.ts`) and the `.svelte`
 * components are deliberately excluded — a consumer supplies its own state
 * management and controls.
 *
 * The renderer draws to a `CanvasRenderingContext2D`, which is a DOM API but
 * framework-agnostic; a React consumer passes the context from its own
 * `<canvas>` ref.
 */
export type { Color, SubCategory, Category, RenderSection, FontConfig, CardFontConfig, Orientation, BandConfig, WatermarkPosition, WatermarkConfig, StyleConfig, ProjectDocument, } from '../lib/types.js';
export { createId, DEFAULT_CATEGORY_ID, createDefaultDocument, } from '../lib/defaults.js';
export { createColor, createCategory, createSubCategory, } from '../lib/factories.js';
export { luminance, sortColorsDarkToLight } from '../lib/ordering.js';
export { MIN_CARD_TEXT_CONTRAST, relativeLuminance, contrastRatio, readableTextColor, resolveAutoTextColor, } from '../lib/contrast.js';
export { cssSizeToPx } from '../lib/units.js';
export { buildRenderModel } from '../lib/render-model.js';
export { DEFAULT_METRICS, bandHeight, computeLayout, type CardBox, type HeaderBox, type LayoutItem, type Layout, type LayoutMetrics, } from '../lib/layout.js';
export { drawDocument } from '../lib/renderer.js';
export { watermarkRect, type WatermarkRect } from '../lib/watermark.js';
export { normalizeDocument } from '../lib/normalize.js';
export { documentToJson, parseImportedDocument, type ImportResult, } from '../lib/import-export.js';
export { STORAGE_KEY, serializeDocument, deserializeDocument, } from '../lib/persistence.js';
//# sourceMappingURL=index.d.ts.map
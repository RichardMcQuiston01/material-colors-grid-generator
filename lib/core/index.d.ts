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
export type { Color, SubCategory, Category, RenderSection, FontConfig, CardFontConfig, Orientation, BandConfig, WatermarkPosition, WatermarkConfig, StyleConfig, ProjectDocument, } from '../lib/types';
export { createId, DEFAULT_CATEGORY_ID, createDefaultDocument } from '../lib/defaults';
export { createColor, createCategory, createSubCategory } from '../lib/factories';
export { luminance, sortColorsDarkToLight } from '../lib/ordering';
export { MIN_CARD_TEXT_CONTRAST, relativeLuminance, contrastRatio, readableTextColor, resolveAutoTextColor, } from '../lib/contrast';
export { cssSizeToPx } from '../lib/units';
export { buildRenderModel } from '../lib/render-model';
export { DEFAULT_METRICS, bandHeight, computeLayout, type CardBox, type HeaderBox, type LayoutItem, type Layout, type LayoutMetrics, } from '../lib/layout';
export { drawDocument } from '../lib/renderer';
export { watermarkRect, type WatermarkRect } from '../lib/watermark';
export { normalizeDocument } from '../lib/normalize';
export { documentToJson, parseImportedDocument, type ImportResult, } from '../lib/import-export';
export { STORAGE_KEY, serializeDocument, deserializeDocument, } from '../lib/persistence';
//# sourceMappingURL=index.d.ts.map
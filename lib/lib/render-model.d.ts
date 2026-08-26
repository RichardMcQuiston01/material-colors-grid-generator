import type { Category, RenderSection } from './types.js';
/**
 * Flattens the category tree into ordered render sections:
 * categories alphabetical → direct colors, then sub-categories alphabetical →
 * colors dark → light. The category header is omitted when the sole category
 * is "Default".
 */
export declare function buildRenderModel(categories: Category[]): RenderSection[];
//# sourceMappingURL=render-model.d.ts.map
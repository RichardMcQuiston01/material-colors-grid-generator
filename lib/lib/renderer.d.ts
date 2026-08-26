import { type LayoutMetrics } from './layout.js';
import type { ProjectDocument } from './types.js';
/**
 * Draws a document onto a 2D canvas context. Sizes the canvas to the
 * configured output dimensions, then paints headers and color cards using the
 * layout engine.
 */
export declare function drawDocument(ctx: CanvasRenderingContext2D, doc: ProjectDocument, metrics?: LayoutMetrics, watermarkImage?: HTMLImageElement | null): void;
//# sourceMappingURL=renderer.d.ts.map
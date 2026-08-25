import type { WatermarkConfig } from './types';
export interface WatermarkRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * Computes the destination rectangle for a watermark image: width is a
 * fraction of the canvas width (height preserves the image aspect ratio), and
 * the image is pinned to the configured corner inset by `padding`.
 */
export declare function watermarkRect(imageWidth: number, imageHeight: number, canvasWidth: number, canvasHeight: number, config: WatermarkConfig, padding: number): WatermarkRect;
//# sourceMappingURL=watermark.d.ts.map
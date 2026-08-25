/**
 * Minimum WCAG contrast ratio for "Auto" card text to keep using the swatch
 * color; below this it falls back to a readable color. 3:1 keeps the colored
 * text aesthetic for most swatches while catching illegible ones (white, pale
 * greys, yellow on a near-white card).
 */
export declare const MIN_CARD_TEXT_CONTRAST = 3;
/** WCAG relative luminance (0–1) of a hex color, with sRGB linearization. */
export declare function relativeLuminance(hex: string): number;
/** WCAG contrast ratio between two hex colors (1–21, order-independent). */
export declare function contrastRatio(a: string, b: string): number;
/** Black or white — whichever contrasts better with the given background. */
export declare function readableTextColor(background: string): string;
/**
 * Resolves the text color for "Auto" card font mode: the swatch's own color
 * when it contrasts adequately with the card background, otherwise a readable
 * fallback so the text never disappears.
 */
export declare function resolveAutoTextColor(swatchHex: string, background: string, minContrast?: number): string;
//# sourceMappingURL=contrast.d.ts.map
import type { Color } from './types.js';
/**
 * Perceived luminance of a hex color on a 0–255 scale using the Rec. 709
 * coefficients. `#000000` → 0, `#ffffff` → 255. A malformed hex (which can
 * reach here from imported/legacy data) is treated as darkest (0) rather than
 * throwing, so one bad swatch never breaks ordering.
 */
export declare function luminance(hex: string): number;
/** Returns a new array of colors ordered dark → light by luminance. */
export declare function sortColorsDarkToLight(colors: Color[]): Color[];
//# sourceMappingURL=ordering.d.ts.map
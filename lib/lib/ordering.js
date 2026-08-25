import { hexToRgb } from './color';
/**
 * Perceived luminance of a hex color on a 0–255 scale using the Rec. 709
 * coefficients. `#000000` → 0, `#ffffff` → 255.
 */
export function luminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/** Returns a new array of colors ordered dark → light by luminance. */
export function sortColorsDarkToLight(colors) {
    return [...colors].sort((a, b) => luminance(a.hex) - luminance(b.hex));
}
//# sourceMappingURL=ordering.js.map
import type { Color } from './types';

/**
 * Perceived luminance of a hex color on a 0–255 scale using the Rec. 709
 * coefficients. `#000000` → 0, `#ffffff` → 255.
 */
export function luminance(hex: string): number {
  const { r, g, b } = parseHex(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Returns a new array of colors ordered dark → light by luminance. */
export function sortColorsDarkToLight(colors: Color[]): Color[] {
  return [...colors].sort((a, b) => luminance(a.hex) - luminance(b.hex));
}

function parseHex(hex: string): { r: number; g: number; b: number } {
  let value = hex.replace(/^#/, '');
  if (value.length === 3) {
    value = value
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const int = parseInt(value, 16);
  return {
    r: (int >> 16) & 0xff,
    g: (int >> 8) & 0xff,
    b: int & 0xff,
  };
}

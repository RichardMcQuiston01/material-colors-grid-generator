/**
 * Parses a hex color (`#rgb` or `#rrggbb`, with or without the leading `#`)
 * into 0–255 channels. Rejects malformed values — a partial string like
 * `#ffff` would otherwise `parseInt` to bogus channels and silently skew
 * ordering and contrast — by throwing a `TypeError`.
 */
export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
};
//# sourceMappingURL=color.d.ts.map
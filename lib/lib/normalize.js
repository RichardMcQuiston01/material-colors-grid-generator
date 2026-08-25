import { createDefaultDocument } from './defaults';
/**
 * Fills any missing fields of a (possibly older or partial) document from the
 * current defaults, so the renderer and UI can rely on a complete shape.
 * Authored values always win over defaults.
 */
export function normalizeDocument(doc) {
    const defaults = createDefaultDocument();
    return {
        categories: Array.isArray(doc.categories)
            ? doc.categories
            : defaults.categories,
        style: normalizeStyle(doc.style, defaults.style),
    };
}
function normalizeStyle(style, d) {
    const s = style ?? {};
    return {
        ...d,
        ...s,
        border: { ...d.border, ...(s.border ?? {}) },
        fonts: {
            category: { ...d.fonts.category, ...(s.fonts?.category ?? {}) },
            subCategory: { ...d.fonts.subCategory, ...(s.fonts?.subCategory ?? {}) },
            card: { ...d.fonts.card, ...(s.fonts?.card ?? {}) },
        },
        header: normalizeBand(s.header, d.header),
        footer: normalizeBand(s.footer, d.footer),
        watermark: { ...d.watermark, ...(s.watermark ?? {}) },
    };
}
function normalizeBand(band, d) {
    const b = band ?? {};
    return { ...d, ...b, font: { ...d.font, ...(b.font ?? {}) } };
}
//# sourceMappingURL=normalize.js.map
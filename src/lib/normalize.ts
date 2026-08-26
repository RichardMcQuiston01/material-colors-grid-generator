import { createDefaultDocument } from './defaults.js';
import { isCategory } from './validate.js';
import type { BandConfig, ProjectDocument, StyleConfig } from './types.js';

/**
 * Fills any missing fields of a (possibly older or partial) document from the
 * current defaults, so the renderer and UI can rely on a complete shape.
 * Authored values always win over defaults. Structurally invalid category
 * entries are dropped defensively, so a direct call on untrusted data can't
 * leak a malformed category into the render pipeline.
 */
export function normalizeDocument(doc: ProjectDocument): ProjectDocument {
  const defaults = createDefaultDocument();
  return {
    categories: Array.isArray(doc.categories)
      ? doc.categories.filter(isCategory)
      : defaults.categories,
    style: normalizeStyle(doc.style, defaults.style),
  };
}

/** Deep-merges a partial style over the defaults `d`, filling every field. */
function normalizeStyle(
  style: Partial<StyleConfig> | undefined,
  d: StyleConfig,
): StyleConfig {
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

/** Deep-merges a partial header/footer band over the default band `d`. */
function normalizeBand(
  band: Partial<BandConfig> | undefined,
  d: BandConfig,
): BandConfig {
  const b = band ?? {};
  return { ...d, ...b, font: { ...d.font, ...(b.font ?? {}) } };
}

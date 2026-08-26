/**
 * Runtime structural validation for imported/stored documents. The color tree
 * comes from user-supplied JSON (file import) or localStorage, so it cannot be
 * trusted to match the TypeScript types — a malformed entry like a `null`
 * category must be rejected rather than flowing into the renderer.
 */
import type { Category, Color, ProjectDocument, SubCategory } from './types.js';

/** True when `value` is a non-null object usable as a keyed record. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** True when `value` is a well-formed {@link Color}. */
export function isColor(value: unknown): value is Color {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.hex === 'string'
  );
}

/** True when `value` is a well-formed {@link SubCategory} (with valid colors). */
export function isSubCategory(value: unknown): value is SubCategory {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    Array.isArray(value.colors) &&
    value.colors.every(isColor)
  );
}

/** True when `value` is a well-formed {@link Category} (deeply validated). */
export function isCategory(value: unknown): value is Category {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    Array.isArray(value.colors) &&
    value.colors.every(isColor) &&
    Array.isArray(value.subCategories) &&
    value.subCategories.every(isSubCategory)
  );
}

/**
 * True when `value` structurally matches a {@link ProjectDocument}: a
 * deeply-valid category array plus a style object. Style fields are filled by
 * `normalizeDocument`, so only its presence is checked here.
 */
export function isProjectDocument(value: unknown): value is ProjectDocument {
  return (
    isRecord(value) &&
    Array.isArray(value.categories) &&
    value.categories.every(isCategory) &&
    isRecord(value.style)
  );
}

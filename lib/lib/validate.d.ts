/**
 * Runtime structural validation for imported/stored documents. The color tree
 * comes from user-supplied JSON (file import) or localStorage, so it cannot be
 * trusted to match the TypeScript types — a malformed entry like a `null`
 * category must be rejected rather than flowing into the renderer.
 */
import type { Category, Color, ProjectDocument, SubCategory } from './types.js';
/** True when `value` is a well-formed {@link Color}. */
export declare function isColor(value: unknown): value is Color;
/** True when `value` is a well-formed {@link SubCategory} (with valid colors). */
export declare function isSubCategory(value: unknown): value is SubCategory;
/** True when `value` is a well-formed {@link Category} (deeply validated). */
export declare function isCategory(value: unknown): value is Category;
/**
 * True when `value` structurally matches a {@link ProjectDocument}: a
 * deeply-valid category array plus a style object. Style fields are filled by
 * `normalizeDocument`, so only its presence is checked here.
 */
export declare function isProjectDocument(value: unknown): value is ProjectDocument;
//# sourceMappingURL=validate.d.ts.map
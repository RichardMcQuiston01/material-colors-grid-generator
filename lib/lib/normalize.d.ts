import type { ProjectDocument, StyleConfig } from './types.js';
/**
 * Recursively-optional version of `T`: every property, at every depth, is
 * optional. Matches how the normalizer deep-merges input, so a caller can pass
 * just `{ style: { border: { color } } }` without the sibling fields.
 */
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
/**
 * Loose input shape for {@link normalizeDocument}: a possibly older, partial, or
 * untrusted document. `categories` is `unknown` because each entry is validated
 * and filtered; `style` may be any deeply-partial subset of the full config.
 */
export interface DocumentInput {
    categories?: unknown;
    style?: DeepPartial<StyleConfig>;
}
/**
 * Fills any missing fields of a (possibly older or partial) document from the
 * current defaults, so the renderer and UI can rely on a complete shape.
 * Authored values always win over defaults. Structurally invalid category
 * entries are dropped defensively, so a direct call on untrusted data can't
 * leak a malformed category into the render pipeline.
 */
export declare function normalizeDocument(doc: DocumentInput): ProjectDocument;
//# sourceMappingURL=normalize.d.ts.map
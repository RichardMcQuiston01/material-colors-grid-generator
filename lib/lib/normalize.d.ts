import type { ProjectDocument, StyleConfig } from './types.js';
/**
 * Loose input shape for {@link normalizeDocument}: a possibly older, partial, or
 * untrusted document. `categories` is `unknown` because each entry is validated
 * and filtered; `style` may be any subset of the full config.
 */
export interface DocumentInput {
    categories?: unknown;
    style?: Partial<StyleConfig>;
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
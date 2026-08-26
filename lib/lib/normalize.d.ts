import type { ProjectDocument } from './types.js';
/**
 * Fills any missing fields of a (possibly older or partial) document from the
 * current defaults, so the renderer and UI can rely on a complete shape.
 * Authored values always win over defaults. Structurally invalid category
 * entries are dropped defensively, so a direct call on untrusted data can't
 * leak a malformed category into the render pipeline.
 */
export declare function normalizeDocument(doc: ProjectDocument): ProjectDocument;
//# sourceMappingURL=normalize.d.ts.map
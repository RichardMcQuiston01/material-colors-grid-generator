import type { ProjectDocument } from './types';
/**
 * Fills any missing fields of a (possibly older or partial) document from the
 * current defaults, so the renderer and UI can rely on a complete shape.
 * Authored values always win over defaults.
 */
export declare function normalizeDocument(doc: ProjectDocument): ProjectDocument;
//# sourceMappingURL=normalize.d.ts.map
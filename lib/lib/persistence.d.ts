import type { ProjectDocument } from './types';
/** localStorage key under which the document is persisted. */
export declare const STORAGE_KEY = "material-colors-grid:document";
export declare function serializeDocument(doc: ProjectDocument): string;
/**
 * Parses a stored document, falling back to a fresh default document when the
 * input is missing, not valid JSON, or structurally unrecognizable.
 */
export declare function deserializeDocument(raw: string | null): ProjectDocument;
//# sourceMappingURL=persistence.d.ts.map
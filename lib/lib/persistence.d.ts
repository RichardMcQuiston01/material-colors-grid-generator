import type { ProjectDocument } from './types.js';
/** localStorage key under which the document is persisted. */
export declare const STORAGE_KEY = "material-colors-grid:document";
/** Serializes a document to compact JSON for localStorage. */
export declare function serializeDocument(doc: ProjectDocument): string;
/**
 * Parses a stored document, falling back to a fresh default document when the
 * input is missing, not valid JSON, or structurally unrecognizable. The
 * category tree is deeply validated, so stored data with a malformed entry
 * falls back to defaults rather than yielding an invalid document.
 */
export declare function deserializeDocument(raw: string | null): ProjectDocument;
//# sourceMappingURL=persistence.d.ts.map
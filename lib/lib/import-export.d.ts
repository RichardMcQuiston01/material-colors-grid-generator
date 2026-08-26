import type { ProjectDocument } from './types.js';
export type ImportResult = {
    ok: true;
    document: ProjectDocument;
} | {
    ok: false;
    error: string;
};
/** Serializes a document to pretty-printed JSON for download. */
export declare function documentToJson(doc: ProjectDocument): string;
/**
 * Parses user-supplied JSON into a document. Unlike the localStorage loader,
 * this reports an error instead of silently falling back to defaults, so the
 * UI can tell the user their file was not imported. The category tree is
 * deeply validated, so a structurally malformed entry (e.g. a `null` category)
 * is rejected rather than imported.
 */
export declare function parseImportedDocument(raw: string): ImportResult;
//# sourceMappingURL=import-export.d.ts.map
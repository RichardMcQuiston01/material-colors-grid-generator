import { normalizeDocument } from './normalize.js';
import { isProjectDocument } from './validate.js';
/** Serializes a document to pretty-printed JSON for download. */
export function documentToJson(doc) {
    return JSON.stringify(doc, null, 2);
}
/**
 * Parses user-supplied JSON into a document. Unlike the localStorage loader,
 * this reports an error instead of silently falling back to defaults, so the
 * UI can tell the user their file was not imported. The category tree is
 * deeply validated, so a structurally malformed entry (e.g. a `null` category)
 * is rejected rather than imported.
 */
export function parseImportedDocument(raw) {
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        return { ok: false, error: 'File is not valid JSON.' };
    }
    if (!isProjectDocument(parsed)) {
        return {
            ok: false,
            error: 'File is not a Material Colors Grid document.',
        };
    }
    return { ok: true, document: normalizeDocument(parsed) };
}
//# sourceMappingURL=import-export.js.map
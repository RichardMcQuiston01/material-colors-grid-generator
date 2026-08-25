import { normalizeDocument } from './normalize';
/** Serializes a document to pretty-printed JSON for download. */
export function documentToJson(doc) {
    return JSON.stringify(doc, null, 2);
}
/**
 * Parses user-supplied JSON into a document. Unlike the localStorage loader,
 * this reports an error instead of silently falling back to defaults, so the
 * UI can tell the user their file was not imported.
 */
export function parseImportedDocument(raw) {
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        return { ok: false, error: 'File is not valid JSON.' };
    }
    if (!isDocumentLike(parsed)) {
        return {
            ok: false,
            error: 'File is not a Material Colors Grid document.',
        };
    }
    return { ok: true, document: normalizeDocument(parsed) };
}
function isDocumentLike(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const doc = value;
    return (Array.isArray(doc.categories) &&
        typeof doc.style === 'object' &&
        doc.style !== null);
}
//# sourceMappingURL=import-export.js.map
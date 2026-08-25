import { createDefaultDocument } from './defaults';
import { normalizeDocument } from './normalize';
/** localStorage key under which the document is persisted. */
export const STORAGE_KEY = 'material-colors-grid:document';
export function serializeDocument(doc) {
    return JSON.stringify(doc);
}
/**
 * Parses a stored document, falling back to a fresh default document when the
 * input is missing, not valid JSON, or structurally unrecognizable.
 */
export function deserializeDocument(raw) {
    if (raw === null)
        return createDefaultDocument();
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        return createDefaultDocument();
    }
    if (!isProjectDocument(parsed))
        return createDefaultDocument();
    return normalizeDocument(parsed);
}
function isProjectDocument(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const doc = value;
    return (Array.isArray(doc.categories) &&
        typeof doc.style === 'object' &&
        doc.style !== null);
}
//# sourceMappingURL=persistence.js.map
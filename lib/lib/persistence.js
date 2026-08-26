import { createDefaultDocument } from './defaults.js';
import { normalizeDocument } from './normalize.js';
import { isProjectDocument } from './validate.js';
/** localStorage key under which the document is persisted. */
export const STORAGE_KEY = 'material-colors-grid:document';
/** Serializes a document to compact JSON for localStorage. */
export function serializeDocument(doc) {
    return JSON.stringify(doc);
}
/**
 * Parses a stored document, falling back to a fresh default document when the
 * input is missing, not valid JSON, or structurally unrecognizable. The
 * category tree is deeply validated, so stored data with a malformed entry
 * falls back to defaults rather than yielding an invalid document.
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
//# sourceMappingURL=persistence.js.map
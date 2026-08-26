import type { ProjectDocument } from './types.js';
/** Generates a unique id for categories, sub-categories, and colors. */
export declare function createId(): string;
/** Stable id for the seed "Default" category, so a fresh document is reproducible. */
export declare const DEFAULT_CATEGORY_ID = "default";
/** Builds a fresh, independent document with the README default settings. */
export declare function createDefaultDocument(): ProjectDocument;
//# sourceMappingURL=defaults.d.ts.map
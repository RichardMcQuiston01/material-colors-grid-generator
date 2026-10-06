import { browser } from '$app/environment';
import {
  STORAGE_KEY,
  buildRenderModel,
  createDefaultDocument,
  deserializeDocument,
  serializeDocument,
  type ProjectDocument,
  type RenderSection,
} from '@richardmcquiston01/material-colors-grid';

function loadInitial(): ProjectDocument {
  if (!browser) return createDefaultDocument();
  return deserializeDocument(localStorage.getItem(STORAGE_KEY));
}

/**
 * The single source of truth for the editor. Holds the persisted document in a
 * rune so the whole UI reacts to edits, derives the ordered render model, and
 * auto-saves to localStorage. `sections` is derived — never persisted — so the
 * stored document only ever contains user-authored data.
 */
class DocumentStore {
  current = $state<ProjectDocument>(loadInitial());

  readonly sections = $derived<RenderSection[]>(
    buildRenderModel(this.current.categories),
  );

  constructor() {
    if (browser) {
      // Module-scoped effect (no component owner) to persist on every change.
      $effect.root(() => {
        $effect(() => {
          localStorage.setItem(STORAGE_KEY, serializeDocument(this.current));
        });
      });
    }
  }

  /** Replaces the entire document (e.g. JSON import or reset). */
  replace(doc: ProjectDocument): void {
    this.current = doc;
  }

  /** Resets to a fresh default document. */
  reset(): void {
    this.current = createDefaultDocument();
  }
}

export const documentStore = new DocumentStore();

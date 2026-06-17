/** A single color swatch: a display name plus its hex value (e.g. '#1b5e20'). */
export interface Color {
  id: string;
  name: string;
  hex: string;
}

/** An optional grouping of colors within a category. */
export interface SubCategory {
  id: string;
  name: string;
  colors: Color[];
}

/** A top-level grouping of colors and/or sub-categories. */
export interface Category {
  id: string;
  name: string;
  colors: Color[];
  subCategories: SubCategory[];
}

/**
 * A flattened, render-ready group produced from the category tree. Headers are
 * `null` when they should not be drawn (e.g. the sole "Default" category).
 */
export interface RenderSection {
  categoryHeader: string | null;
  subCategoryHeader: string | null;
  colors: Color[];
}

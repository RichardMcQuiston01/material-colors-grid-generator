import { createId } from './defaults.js';
import type { Category, Color, SubCategory } from './types.js';

export function createColor(name: string, hex: string): Color {
  return { id: createId(), name, hex };
}

export function createCategory(name: string): Category {
  return { id: createId(), name, colors: [], subCategories: [] };
}

export function createSubCategory(name: string): SubCategory {
  return { id: createId(), name, colors: [] };
}

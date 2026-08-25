import { sortColorsDarkToLight } from './ordering';
const byName = (a, b) => a.name.localeCompare(b.name);
/**
 * Flattens the category tree into ordered render sections:
 * categories alphabetical → direct colors, then sub-categories alphabetical →
 * colors dark → light. The category header is omitted when the sole category
 * is "Default".
 */
export function buildRenderModel(categories) {
    const omitHeader = categories.length === 1 && categories[0].name === 'Default';
    const sections = [];
    for (const category of [...categories].sort(byName)) {
        const header = omitHeader ? null : category.name;
        if (category.colors.length > 0) {
            sections.push({
                categoryHeader: header,
                subCategoryHeader: null,
                colors: sortColorsDarkToLight(category.colors),
            });
        }
        for (const sub of [...category.subCategories].sort(byName)) {
            sections.push({
                categoryHeader: header,
                subCategoryHeader: sub.name,
                colors: sortColorsDarkToLight(sub.colors),
            });
        }
    }
    return sections;
}
//# sourceMappingURL=render-model.js.map
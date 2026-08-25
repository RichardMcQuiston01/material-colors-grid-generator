import { createId } from './defaults';
export function createColor(name, hex) {
    return { id: createId(), name, hex };
}
export function createCategory(name) {
    return { id: createId(), name, colors: [], subCategories: [] };
}
export function createSubCategory(name) {
    return { id: createId(), name, colors: [] };
}
//# sourceMappingURL=factories.js.map
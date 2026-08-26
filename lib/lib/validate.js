/** True when `value` is a non-null object usable as a keyed record. */
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
/** True when `value` is a well-formed {@link Color}. */
export function isColor(value) {
    return (isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        typeof value.hex === 'string');
}
/** True when `value` is a well-formed {@link SubCategory} (with valid colors). */
export function isSubCategory(value) {
    return (isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        Array.isArray(value.colors) &&
        value.colors.every(isColor));
}
/** True when `value` is a well-formed {@link Category} (deeply validated). */
export function isCategory(value) {
    return (isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        Array.isArray(value.colors) &&
        value.colors.every(isColor) &&
        Array.isArray(value.subCategories) &&
        value.subCategories.every(isSubCategory));
}
/**
 * True when `value` structurally matches a {@link ProjectDocument}: a
 * deeply-valid category array plus a style object. Style fields are filled by
 * `normalizeDocument`, so only its presence is checked here.
 */
export function isProjectDocument(value) {
    return (isRecord(value) &&
        Array.isArray(value.categories) &&
        value.categories.every(isCategory) &&
        isRecord(value.style));
}
//# sourceMappingURL=validate.js.map
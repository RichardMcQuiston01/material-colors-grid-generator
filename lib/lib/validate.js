/** True when `value` is a non-null object usable as a keyed record. */
function isRecord(value) {
    return typeof value === 'object' && value !== null;
}
/** A 3- or 6-digit hex color, with or without a leading `#`. */
const HEX_COLOR = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
/** True when `value` is a supported 3- or 6-digit hex color string. */
export function isHexColor(value) {
    return typeof value === 'string' && HEX_COLOR.test(value);
}
/**
 * True when `value` is a well-formed {@link Color}. `hex` must be a real 3- or
 * 6-digit hex string — an arbitrary string would pass structural validation but
 * later fail to parse in the colour math.
 */
export function isColor(value) {
    return (isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        isHexColor(value.hex));
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
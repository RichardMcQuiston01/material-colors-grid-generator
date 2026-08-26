/**
 * Computes the destination rectangle for a watermark image: width is a
 * fraction of the canvas width (height preserves the image aspect ratio), and
 * the image is pinned to the configured corner inset by `padding`.
 */
export function watermarkRect(imageWidth, imageHeight, canvasWidth, canvasHeight, config, padding) {
    const width = canvasWidth * config.scale;
    const height = imageWidth === 0 ? 0 : width * (imageHeight / imageWidth);
    const left = padding;
    const right = canvasWidth - width - padding;
    const top = padding;
    const bottom = canvasHeight - height - padding;
    const isRight = config.position.endsWith('right');
    const isBottom = config.position.startsWith('bottom');
    return {
        x: isRight ? right : left,
        y: isBottom ? bottom : top,
        width,
        height,
    };
}
//# sourceMappingURL=watermark.js.map
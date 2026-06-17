import { buildRenderModel } from './render-model';
import {
  DEFAULT_METRICS,
  computeLayout,
  type CardBox,
  type HeaderBox,
  type LayoutMetrics,
} from './layout';
import { cssSizeToPx } from './units';
import type { ProjectDocument, StyleConfig } from './types';

/** Overall canvas background; ensures exported PNGs are not transparent. */
const CANVAS_BACKGROUND = '#ffffff';

/**
 * Draws a document onto a 2D canvas context. Sizes the canvas to the
 * configured output dimensions, then paints headers and color cards using the
 * layout engine.
 */
export function drawDocument(
  ctx: CanvasRenderingContext2D,
  doc: ProjectDocument,
  metrics: LayoutMetrics = DEFAULT_METRICS,
): void {
  const sections = buildRenderModel(doc.categories);
  const layout = computeLayout(sections, doc.style, metrics);

  ctx.canvas.width = layout.width;
  ctx.canvas.height = layout.height;

  ctx.fillStyle = CANVAS_BACKGROUND;
  ctx.fillRect(0, 0, layout.width, layout.height);

  for (const item of layout.items) {
    if (item.type === 'header') {
      drawHeader(ctx, item, doc.style);
    } else {
      drawCard(ctx, item, doc.style);
    }
  }
}

function drawHeader(
  ctx: CanvasRenderingContext2D,
  header: HeaderBox,
  style: StyleConfig,
): void {
  const font =
    header.level === 'category'
      ? style.fonts.category
      : style.fonts.subCategory;
  const sizePx = cssSizeToPx(font.size);

  ctx.font = `bold ${sizePx}px ${font.family}`;
  ctx.fillStyle = font.color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(header.text, header.x, header.y + header.height / 2);
}

function drawCard(
  ctx: CanvasRenderingContext2D,
  card: CardBox,
  style: StyleConfig,
): void {
  const radius = style.border.rounded ? 8 : 0;
  const borderWidth = cssSizeToPx(style.border.thickness);

  // Card surface.
  traceRect(ctx, card.x, card.y, card.width, card.height, radius);
  ctx.fillStyle = style.cardBackground;
  ctx.fill();
  if (borderWidth > 0) {
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = style.border.color;
    ctx.stroke();
  }

  // Color chip occupying the top half of the card.
  const inset = 10;
  const chipHeight = card.height * 0.5;
  traceRect(
    ctx,
    card.x + inset,
    card.y + inset,
    card.width - inset * 2,
    chipHeight,
    radius / 2,
  );
  ctx.fillStyle = card.color.hex;
  ctx.fill();

  // Card text: name then hex. 'auto' uses the swatch's own color.
  const cardFont = style.fonts.card;
  const sizePx = cssSizeToPx(cardFont.size);
  const textColor = cardFont.color === 'auto' ? card.color.hex : cardFont.color;
  const textX = card.x + inset;
  let textY = card.y + inset + chipHeight + sizePx;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.font = `600 ${sizePx}px ${cardFont.family}`;
  ctx.fillStyle = textColor;
  ctx.fillText(card.color.name, textX, textY);

  textY += sizePx * 1.3;
  ctx.font = `${sizePx}px ${cardFont.family}`;
  ctx.fillText(card.color.hex, textX, textY);
}

/** Traces a (optionally rounded) rectangle path without filling or stroking. */
function traceRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  ctx.beginPath();
  if (radius > 0 && typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.rect(x, y, width, height);
  }
}

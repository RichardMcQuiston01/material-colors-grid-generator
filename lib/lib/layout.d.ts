import type { BandConfig, Color, RenderSection, StyleConfig } from './types';
export interface CardBox {
    type: 'card';
    x: number;
    y: number;
    width: number;
    height: number;
    color: Color;
}
export interface HeaderBox {
    type: 'header';
    level: 'category' | 'subCategory';
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
}
export type LayoutItem = CardBox | HeaderBox;
export interface Layout {
    width: number;
    height: number;
    items: LayoutItem[];
}
/** Spacing/sizing in canvas pixels. Tunable; defaults chosen for legibility. */
export interface LayoutMetrics {
    padding: number;
    gap: number;
    cardHeight: number;
    categoryHeaderHeight: number;
    subCategoryHeaderHeight: number;
}
export declare const DEFAULT_METRICS: LayoutMetrics;
/**
 * Pixel height reserved for a header/footer band, or 0 when the band has no
 * text (and is therefore not drawn).
 */
export declare function bandHeight(band: BandConfig, metrics: LayoutMetrics): number;
/**
 * Computes absolute positions for every header and card. Cards flow left to
 * right, wrapping after `style.cardsPerRow`; each section begins on a new row,
 * and a category header is emitted only when the category changes. Content is
 * shifted down to clear a header band when one is present.
 */
export declare function computeLayout(sections: RenderSection[], style: StyleConfig, metrics?: LayoutMetrics): Layout;
//# sourceMappingURL=layout.d.ts.map
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import CanvasPreview from './CanvasPreview.svelte';
import { documentStore } from '$lib/document.svelte';
import { createColor } from '@richardmcquiston01/material-colors-grid';

let drawnText: string[];
let downloads: { download: string; href: string }[];

/** Fake 2D context that records text drawn and accepts every other call. */
function createFakeContext(canvas: HTMLCanvasElement) {
  return new Proxy(
    { canvas },
    {
      get(target, prop) {
        if (prop in target) return target[prop as keyof typeof target];
        if (prop === 'fillText') {
          return (text: string) => {
            drawnText.push(text);
          };
        }
        return () => undefined;
      },
      set() {
        return true;
      },
    },
  ) as unknown as CanvasRenderingContext2D;
}

beforeEach(() => {
  documentStore.reset();
  drawnText = [];
  downloads = [];
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
    function (this: HTMLCanvasElement) {
      return createFakeContext(this);
    } as unknown as HTMLCanvasElement['getContext'],
  );
  URL.createObjectURL = vi.fn(
    () => 'blob:mock',
  ) as unknown as typeof URL.createObjectURL;
  URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL;
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    downloads.push({ download: this.download, href: this.href });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CanvasPreview', () => {
  it('renders the document onto the canvas', async () => {
    documentStore.current.categories[0].colors.push(
      createColor('Forest', '#1b5e20'),
    );
    render(CanvasPreview);

    await waitFor(() => expect(drawnText).toContain('Forest'));
    const canvas = screen.getByLabelText('Rendered color grid preview');
    expect((canvas as HTMLCanvasElement).width).toBe(
      documentStore.current.style.width,
    );
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('repaints when the document changes', async () => {
    render(CanvasPreview);
    documentStore.current.categories[0].colors.push(
      createColor('Snow', '#ffffff'),
    );

    await waitFor(() => expect(drawnText).toContain('Snow'));
  });

  it('shows a descriptive error when no 2D context is available', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    render(CanvasPreview);

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toMatch(/2D rendering context/);
  });

  it('downloads the canvas as a PNG', async () => {
    const user = userEvent.setup();
    const blob = new Blob(['png'], { type: 'image/png' });
    const toBlob = vi
      .spyOn(HTMLCanvasElement.prototype, 'toBlob')
      .mockImplementation((callback: BlobCallback) => callback(blob));
    render(CanvasPreview);

    await user.click(screen.getByRole('button', { name: /download png/i }));

    await waitFor(() => expect(downloads).toHaveLength(1));
    expect(toBlob).toHaveBeenCalledWith(
      expect.any(Function),
      'image/png',
      undefined,
    );
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(downloads[0].download).toBe('color-grid.png');
    expect(downloads[0].href).toBe('blob:mock');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows an error and skips the download when encoding fails', async () => {
    const user = userEvent.setup();
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(
      (callback: BlobCallback) => callback(null),
    );
    render(CanvasPreview);

    await user.click(screen.getByRole('button', { name: /download png/i }));

    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toMatch(/could not be encoded as image\/png/);
    expect(downloads).toHaveLength(0);
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });
});

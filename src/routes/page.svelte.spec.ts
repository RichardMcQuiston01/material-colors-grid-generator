import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Page from './+page.svelte';
import { documentStore } from '$lib/document.svelte';

// Heading id of the section each tab shows.
const PANEL_HEADING_IDS: Record<string, string> = {
  Colors: 'colors-heading',
  'Output Style': 'style-heading',
  Fonts: 'font-heading',
  'Header & Footer': 'bands-heading',
  Watermark: 'watermark-heading',
};

beforeEach(() => {
  documentStore.reset();
  // jsdom has no canvas; the preview then shows its "no 2D context" alert.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('page layout', () => {
  it('has a header, the settings tabs, a preview and a footer', () => {
    render(Page);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('tablist', { name: 'Settings' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Preview' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      'Richard McQuiston',
    );
  });

  it('offers a tab for each group of settings, starting on Colors', () => {
    render(Page);

    expect(
      screen.getAllByRole('tab').map((tab) => tab.textContent?.trim()),
    ).toEqual(Object.keys(PANEL_HEADING_IDS));
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      'Colors',
    );
    expect(
      screen.getByRole('tabpanel').querySelector('#colors-heading'),
    ).not.toBeNull();
  });

  it.each(Object.entries(PANEL_HEADING_IDS))(
    'shows only the %s settings when its tab is selected',
    async (label, headingId) => {
      const user = userEvent.setup();
      render(Page);

      await user.click(screen.getByRole('tab', { name: label }));

      const panel = screen.getByRole('tabpanel');
      expect(panel.querySelector(`#${headingId}`)).not.toBeNull();
      const otherHeadings = Object.values(PANEL_HEADING_IDS).filter(
        (id) => id !== headingId,
      );
      for (const id of otherHeadings) {
        expect(panel.querySelector(`#${id}`)).toBeNull();
      }
    },
  );

  it('keeps edits when switching tabs', async () => {
    const user = userEvent.setup();
    render(Page);
    const name = screen.getByLabelText('Category name') as HTMLInputElement;
    await user.clear(name);
    await user.type(name, 'PETG');

    await user.click(screen.getByRole('tab', { name: 'Fonts' }));
    await user.click(screen.getByRole('tab', { name: 'Colors' }));

    expect(
      (screen.getByLabelText('Category name') as HTMLInputElement).value,
    ).toBe('PETG');
  });
});

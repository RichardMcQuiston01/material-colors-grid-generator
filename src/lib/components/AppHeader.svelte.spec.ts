import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AppHeader from './AppHeader.svelte';

const PACKAGE_NAME = '@richardmcquiston01/material-colors-grid';

describe('AppHeader', () => {
  it('shows the app title as the page heading', () => {
    render(AppHeader);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Material Colors Grid Generator',
      }),
    ).toBeInTheDocument();
  });

  it('links to the npm package in a smaller font, opening safely', () => {
    render(AppHeader);
    const link = screen.getByRole('link', { name: PACKAGE_NAME });

    expect(link).toHaveAttribute(
      'href',
      `https://www.npmjs.com/package/${PACKAGE_NAME}`,
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link).toHaveClass('text-xs');
  });

  it('puts the npm link under the title', () => {
    render(AppHeader);
    const heading = screen.getByRole('heading', { level: 1 });
    const link = screen.getByRole('link', { name: PACKAGE_NAME });

    expect(
      heading.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('includes the document actions', () => {
    render(AppHeader);

    expect(
      screen.getByRole('button', { name: 'Export JSON' }),
    ).toBeInTheDocument();
  });
});

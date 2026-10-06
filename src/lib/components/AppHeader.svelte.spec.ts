import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
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

  it('places the donation card between the title and the actions', () => {
    localStorage.clear();
    render(AppHeader);
    const heading = screen.getByRole('heading', { level: 1 });
    const card = screen.getByRole('complementary', {
      name: 'Support this project',
    });
    const exportButton = screen.getByRole('button', { name: 'Export JSON' });

    expect(
      heading.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      card.compareDocumentPosition(exportButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('lets the donation card be dismissed without affecting the header', async () => {
    localStorage.clear();
    const user = userEvent.setup();
    render(AppHeader);

    await user.click(
      screen.getByRole('button', { name: /dismiss donation message/i }),
    );

    expect(
      screen.queryByRole('complementary', { name: 'Support this project' }),
    ).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Export JSON' }),
    ).toBeInTheDocument();
  });
});

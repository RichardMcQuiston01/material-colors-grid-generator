import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AppFooter from './AppFooter.svelte';

describe('AppFooter', () => {
  it('is a contentinfo landmark with the copyright notice', () => {
    render(AppFooter);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(
      '© 2026 Richard McQuiston. All rights reserved.',
    );
  });

  it('links to the author site and the source, opening safely', () => {
    render(AppFooter);
    const author = screen.getByRole('link', { name: 'Richard McQuiston' });
    const source = screen.getByRole('link', { name: 'Source on GitHub' });

    expect(author).toHaveAttribute('href', 'https://richardmcquiston.com/');
    expect(source).toHaveAttribute(
      'href',
      'https://github.com/RichardMcQuiston01/material-colors-grid-generator',
    );
    for (const link of [author, source]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });
});

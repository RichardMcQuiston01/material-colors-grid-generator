import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Icon, { type IconName } from './Icon.svelte';

const ICON_NAMES: IconName[] = [
  'download',
  'upload',
  'reset',
  'help',
  'package',
  'plus',
  'x',
  'copy',
  'check',
];

describe('Icon', () => {
  it.each(ICON_NAMES)(
    'renders a decorative %s icon with drawn shapes',
    (name) => {
      const { container } = render(Icon, { name });
      const svg = container.querySelector('svg');

      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('focusable', 'false');
      expect(svg).toHaveAttribute('data-icon', name);
      expect(
        svg?.querySelectorAll('path, circle, rect').length,
      ).toBeGreaterThan(0);
    },
  );

  it('applies a custom size class', () => {
    const { container } = render(Icon, { name: 'plus', class: 'h-8 w-8' });

    expect(container.querySelector('svg')).toHaveClass('h-8', 'w-8');
  });
});

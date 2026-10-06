import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import TabsHarness from './TabsHarness.svelte';

describe('Tabs', () => {
  it('renders a labelled tab list with the first tab selected', () => {
    render(TabsHarness);

    expect(
      screen.getByRole('tablist', { name: 'Example tabs' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByText('Panel for one')).toBeInTheDocument();
  });

  it('shows only the active panel and ties it to its tab', async () => {
    const user = userEvent.setup();
    render(TabsHarness);

    await user.click(screen.getByRole('tab', { name: 'Two' }));

    expect(screen.getByText('Panel for two')).toBeInTheDocument();
    expect(screen.queryByText('Panel for one')).toBeNull();
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute(
      'aria-labelledby',
      screen.getByRole('tab', { name: 'Two' }).id,
    );
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-controls',
      panel.id,
    );
  });

  it('uses a roving tabindex so only the selected tab is tabbable', async () => {
    const user = userEvent.setup();
    render(TabsHarness);

    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'tabindex',
      '0',
    );
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'tabindex',
      '-1',
    );

    await user.click(screen.getByRole('tab', { name: 'Three' }));

    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute(
      'tabindex',
      '0',
    );
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it('moves between tabs with the arrow keys, wrapping at the ends', async () => {
    const user = userEvent.setup();
    render(TabsHarness);
    screen.getByRole('tab', { name: 'One' }).focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
  });

  it('jumps to the first and last tab with Home and End', async () => {
    const user = userEvent.setup();
    render(TabsHarness);
    screen.getByRole('tab', { name: 'One' }).focus();

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveFocus();
    expect(screen.getByText('Panel for three')).toBeInTheDocument();

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveFocus();
    expect(screen.getByText('Panel for one')).toBeInTheDocument();
  });
});

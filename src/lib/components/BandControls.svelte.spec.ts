import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import BandControls from './BandControls.svelte';
import { documentStore } from '$lib/document.svelte';

beforeEach(() => {
  documentStore.reset();
});

describe('BandControls', () => {
  it('renders a Header and Footer band', () => {
    render(BandControls);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('starts with empty band text (bands hidden by default)', () => {
    render(BandControls);
    const texts = screen.getAllByLabelText('Text') as HTMLInputElement[];
    expect(texts).toHaveLength(2);
    expect(texts[0].value).toBe('');
    expect(texts[1].value).toBe('');
  });

  it('binds header text to the store', async () => {
    const user = userEvent.setup();
    render(BandControls);

    await user.type(screen.getAllByLabelText('Text')[0], 'Available Colors');

    expect(documentStore.current.style.header.text).toBe('Available Colors');
  });

  it('binds footer font family to the store', async () => {
    const user = userEvent.setup();
    render(BandControls);

    const family = screen.getAllByLabelText('Font')[1]; // footer
    await user.clear(family);
    await user.type(family, 'Georgia');

    expect(documentStore.current.style.footer.font.family).toBe('Georgia');
  });
});

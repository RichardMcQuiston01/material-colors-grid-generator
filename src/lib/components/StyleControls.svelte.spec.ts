import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import StyleControls from './StyleControls.svelte';
import { documentStore } from '$lib/document.svelte';

beforeEach(() => {
  documentStore.reset();
});

describe('StyleControls accessibility', () => {
  it('gives the color picker and its hex text field distinct accessible names', () => {
    render(StyleControls);

    // Each color control is a pair; both halves must be reachable by name so
    // a screen reader does not announce the text field as "blank".
    expect(screen.getByLabelText('Card background color')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Card background hex value'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Border color')).toBeInTheDocument();
    expect(screen.getByLabelText('Border color hex value')).toBeInTheDocument();
  });

  it('binds the card background hex field to the store', async () => {
    const user = userEvent.setup();
    render(StyleControls);

    const hex = screen.getByLabelText('Card background hex value');
    await user.clear(hex);
    await user.type(hex, '#123456');

    expect(documentStore.current.style.cardBackground).toBe('#123456');
  });
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import DocumentActions from './DocumentActions.svelte';
import { documentStore } from '$lib/document.svelte';
import { createDefaultDocument } from '$lib/defaults';

let createObjectURL: ReturnType<typeof vi.fn>;
let revokeObjectURL: ReturnType<typeof vi.fn>;
let anchorClick: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  documentStore.reset();
  createObjectURL = vi.fn(() => 'blob:mock');
  revokeObjectURL = vi.fn();
  // jsdom does not implement these; stub them so export can run.
  URL.createObjectURL =
    createObjectURL as unknown as typeof URL.createObjectURL;
  URL.revokeObjectURL =
    revokeObjectURL as unknown as typeof URL.revokeObjectURL;
  // Prevent jsdom "navigation not implemented" noise from link.click().
  anchorClick = vi
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

/** Reads back the Blob handed to URL.createObjectURL as text. */
async function exportedText(): Promise<string> {
  const blob = createObjectURL.mock.calls[0][0] as Blob;
  return blob.text();
}

describe('DocumentActions', () => {
  it('exports the current document as JSON', async () => {
    const user = userEvent.setup();
    documentStore.current.categories[0].name = 'PETG';
    render(DocumentActions);

    await user.click(screen.getByRole('button', { name: 'Export JSON' }));

    expect(createObjectURL).toHaveBeenCalledOnce();
    expect(anchorClick).toHaveBeenCalledOnce();
    const parsed = JSON.parse(await exportedText());
    expect(parsed.categories[0].name).toBe('PETG');
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock');
  });

  it('imports a valid document and replaces the store', async () => {
    const user = userEvent.setup();
    render(DocumentActions);

    const incoming = createDefaultDocument();
    incoming.categories[0].name = 'Imported';
    const file = new File([JSON.stringify(incoming)], 'grid.json', {
      type: 'application/json',
    });

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(input, file);

    expect(documentStore.current.categories[0].name).toBe('Imported');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows an error alert for an invalid file', async () => {
    const user = userEvent.setup();
    render(DocumentActions);

    const file = new File(['not json'], 'bad.json', {
      type: 'application/json',
    });
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(input, file);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('File is not valid JSON.');
    // The store is untouched on a failed import.
    expect(documentStore.current.categories[0].name).toBe('Default');
  });

  it('resets only after the user confirms', async () => {
    const user = userEvent.setup();
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    documentStore.current.categories.push({
      id: 'x',
      name: 'Extra',
      colors: [],
      subCategories: [],
    });
    render(DocumentActions);

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(confirm).toHaveBeenCalledOnce();
    expect(documentStore.current.categories).toHaveLength(2); // cancelled

    confirm.mockReturnValue(true);
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(documentStore.current.categories).toHaveLength(1); // confirmed
    expect(documentStore.current.categories[0].name).toBe('Default');
  });
});

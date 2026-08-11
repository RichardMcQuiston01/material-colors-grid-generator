import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ColorEditor from './ColorEditor.svelte';
import { documentStore } from '$lib/document.svelte';

beforeEach(() => {
  documentStore.reset();
});

describe('ColorEditor', () => {
  it('renders the seed "Default" category', () => {
    render(ColorEditor);
    const name = screen.getByLabelText('Category name') as HTMLInputElement;
    expect(name.value).toBe('Default');
  });

  it('adds a category', async () => {
    const user = userEvent.setup();
    render(ColorEditor);

    expect(screen.getAllByLabelText('Category name')).toHaveLength(1);
    await user.click(screen.getByTitle('Add a category'));

    const names = screen.getAllByLabelText(
      'Category name',
    ) as HTMLInputElement[];
    expect(names).toHaveLength(2);
    expect(names[1].value).toBe('New category');
    expect(documentStore.current.categories).toHaveLength(2);
  });

  it('disables removing the only category, and enables it once a second exists', async () => {
    const user = userEvent.setup();
    render(ColorEditor);

    expect(screen.getByLabelText('Remove category Default')).toBeDisabled();

    await user.click(screen.getByTitle('Add a category'));
    expect(screen.getByLabelText('Remove category Default')).toBeEnabled();
  });

  it('removes a category', async () => {
    const user = userEvent.setup();
    render(ColorEditor);
    await user.click(screen.getByTitle('Add a category'));
    expect(documentStore.current.categories).toHaveLength(2);

    await user.click(screen.getByLabelText('Remove category New category'));

    expect(screen.getAllByLabelText('Category name')).toHaveLength(1);
    expect(documentStore.current.categories).toHaveLength(1);
  });

  it('adds and removes a color within a category', async () => {
    const user = userEvent.setup();
    render(ColorEditor);

    expect(screen.queryByLabelText('Color name')).toBeNull();
    await user.click(screen.getByTitle('Add a color to Default'));

    const colorName = screen.getByLabelText('Color name') as HTMLInputElement;
    expect(colorName.value).toBe('New color');
    expect(documentStore.current.categories[0].colors).toHaveLength(1);

    await user.click(screen.getByLabelText('Remove color New color'));
    expect(screen.queryByLabelText('Color name')).toBeNull();
    expect(documentStore.current.categories[0].colors).toHaveLength(0);
  });

  it('adds and removes a sub-category', async () => {
    const user = userEvent.setup();
    render(ColorEditor);

    expect(screen.queryByLabelText('Sub-category name')).toBeNull();
    await user.click(screen.getByTitle('Add a sub-category to Default'));

    const subName = screen.getByLabelText(
      'Sub-category name',
    ) as HTMLInputElement;
    expect(subName.value).toBe('New sub-category');
    expect(documentStore.current.categories[0].subCategories).toHaveLength(1);

    await user.click(
      screen.getByLabelText('Remove sub-category New sub-category'),
    );
    expect(screen.queryByLabelText('Sub-category name')).toBeNull();
    expect(documentStore.current.categories[0].subCategories).toHaveLength(0);
  });

  it('binds category name edits back to the store', async () => {
    const user = userEvent.setup();
    render(ColorEditor);

    const name = screen.getByLabelText('Category name');
    await user.clear(name);
    await user.type(name, 'PLA');

    expect(documentStore.current.categories[0].name).toBe('PLA');
  });
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import HelpDialog from './HelpDialog.svelte';

const PACKAGE_NAME = '@richardmcquiston01/material-colors-grid';

function dialogElement(container: HTMLElement): HTMLDialogElement {
  return container.querySelector('dialog') as HTMLDialogElement;
}

describe('HelpDialog', () => {
  beforeEach(() => {
    // jsdom lacks the dialog methods; the component falls back to the `open`
    // attribute, so keep these unset to exercise that path.
    HTMLDialogElement.prototype.showModal =
      undefined as unknown as HTMLDialogElement['showModal'];
    HTMLDialogElement.prototype.close =
      undefined as unknown as HTMLDialogElement['close'];
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('stays closed until opened', () => {
    const { container } = render(HelpDialog, { open: false });

    expect(dialogElement(container)).not.toHaveAttribute('open');
  });

  it('opens with a description of the package and install commands', async () => {
    const { container } = render(HelpDialog, { open: true });

    await waitFor(() =>
      expect(dialogElement(container)).toHaveAttribute('open'),
    );
    expect(dialogElement(container)).toHaveAccessibleName('About this package');
    expect(screen.getByText(/framework-free TypeScript library/)).toBeVisible();
    expect(screen.getByText(`bun add ${PACKAGE_NAME}`)).toBeInTheDocument();
    expect(screen.getByText(`npm install ${PACKAGE_NAME}`)).toBeInTheDocument();
  });

  it('links to npm, the guide and the repository, opening safely', () => {
    render(HelpDialog, { open: true });
    const links = [
      screen.getByRole('link', { name: PACKAGE_NAME }),
      screen.getByRole('link', { name: 'Getting Started guide' }),
      screen.getByRole('link', { name: 'source on GitHub' }),
    ];

    expect(links[0]).toHaveAttribute(
      'href',
      `https://www.npmjs.com/package/${PACKAGE_NAME}`,
    );
    expect(links[1].getAttribute('href')).toMatch(/GETTING_STARTED\.md$/);
    expect(links[2]).toHaveAttribute(
      'href',
      'https://github.com/RichardMcQuiston01/material-colors-grid',
    );
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('copies an install command and confirms it', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeText);
    render(HelpDialog, { open: true });

    await user.click(
      screen.getByRole('button', { name: 'Copy npm install command' }),
    );

    expect(writeText).toHaveBeenCalledWith(`npm install ${PACKAGE_NAME}`);
    expect(
      await screen.findByRole('button', { name: 'Copy npm install command' }),
    ).toHaveTextContent('Copied');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows a descriptive error when the clipboard is unavailable', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new Error('permission denied'),
    );
    render(HelpDialog, { open: true });

    await user.click(
      screen.getByRole('button', { name: 'Copy bun install command' }),
    );

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/Could not copy to the clipboard/);
    expect(alert).toHaveTextContent(/permission denied/);
    expect(alert).toHaveTextContent(/copy it manually/);
  });

  it('closes from the Close button', async () => {
    const user = userEvent.setup();
    const { container } = render(HelpDialog, { open: true });
    await waitFor(() =>
      expect(dialogElement(container)).toHaveAttribute('open'),
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(dialogElement(container)).not.toHaveAttribute('open'),
    );
  });
});

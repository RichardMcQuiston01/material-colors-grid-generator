<script lang="ts">
  import Icon from './Icon.svelte';

  const PACKAGE_NAME = '@richardmcquiston01/material-colors-grid';
  const NPM_URL = `https://www.npmjs.com/package/${PACKAGE_NAME}`;
  const REPO_URL = 'https://github.com/RichardMcQuiston01/material-colors-grid';
  const GUIDE_URL =
    'https://github.com/RichardMcQuiston01/material-colors-grid/blob/main/GETTING_STARTED.md';
  const INSTALL_COMMANDS = [
    { label: 'bun', command: `bun add ${PACKAGE_NAME}` },
    { label: 'npm', command: `npm install ${PACKAGE_NAME}` },
  ];

  let { open = $bindable(false) }: { open: boolean } = $props();

  let dialog = $state<HTMLDialogElement>();
  let copiedCommand = $state<string | null>(null);
  let copyError = $state('');
  let copiedTimer: ReturnType<typeof setTimeout> | undefined;

  // Keep the native <dialog> in step with `open`. showModal() gives a focus
  // trap, Escape-to-close and a backdrop for free; fall back to the plain
  // `open` attribute where it is unavailable.
  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  });

  async function copy(command: string): Promise<void> {
    copyError = '';
    try {
      await navigator.clipboard.writeText(command);
    } catch (error) {
      copyError =
        'Could not copy to the clipboard' +
        (error instanceof Error && error.message ? ` (${error.message})` : '') +
        '. Select the command and copy it manually.';
      return;
    }
    copiedCommand = command;
    clearTimeout(copiedTimer);
    copiedTimer = setTimeout(() => (copiedCommand = null), 2000);
  }

  // Close when the backdrop (the dialog element itself) is clicked.
  function onClick(event: MouseEvent): void {
    if (event.target === dialog) open = false;
  }

  const linkClass =
    'font-medium text-brand-700 underline underline-offset-2 ' +
    'hover:text-brand-900 focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-brand-700';
</script>

<dialog
  bind:this={dialog}
  aria-labelledby="help-dialog-title"
  onclose={() => (open = false)}
  onclick={onClick}
  class="m-auto w-[calc(100vw-2rem)] max-w-lg rounded-lg bg-white p-0
    text-gray-900 shadow-xl backdrop:bg-black/50"
>
  <div class="flex flex-col gap-4 p-5">
    <div class="flex items-start justify-between gap-3">
      <h2 id="help-dialog-title" class="text-lg font-semibold">
        About this package
      </h2>
      <button
        type="button"
        onclick={() => (open = false)}
        aria-label="Close"
        title="Close"
        class="rounded p-1 text-gray-500 transition-colors hover:bg-gray-100
          hover:text-gray-700 focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        <Icon name="x" class="h-5 w-5" />
      </button>
    </div>

    <p class="text-sm leading-relaxed text-gray-700">
      This demo is built on
      <a
        href={NPM_URL}
        target="_blank"
        rel="noopener noreferrer"
        class={linkClass}>{PACKAGE_NAME}</a
      >, a framework-free TypeScript library that lays out a grid of color
      swatches (for example filament colors grouped by material) and renders it
      onto a canvas you can export as a PNG for product pages.
    </p>

    <div class="flex flex-col gap-2">
      <h3 class="text-sm font-semibold">Install</h3>
      {#each INSTALL_COMMANDS as { label, command } (label)}
        <div
          class="flex items-center gap-2 rounded-md bg-gray-900 py-1.5 pr-1.5
            pl-3 text-gray-100"
        >
          <code class="min-w-0 flex-1 overflow-x-auto font-mono text-xs"
            >{command}</code
          >
          <button
            type="button"
            onclick={() => copy(command)}
            aria-label="Copy {label} install command"
            title="Copy {label} install command"
            class="flex items-center gap-1 rounded px-2 py-1 text-xs
              font-medium text-gray-100 transition-colors hover:bg-white/15
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-white"
          >
            <Icon name={copiedCommand === command ? 'check' : 'copy'} />
            {copiedCommand === command ? 'Copied' : 'Copy'}
          </button>
        </div>
      {/each}
      {#if copyError}
        <p role="alert" class="text-xs text-red-700">{copyError}</p>
      {/if}
    </div>

    <p class="text-sm text-gray-700">
      Read the
      <a
        href={GUIDE_URL}
        target="_blank"
        rel="noopener noreferrer"
        class={linkClass}>Getting Started guide</a
      >
      for usage and examples, or browse the
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        class={linkClass}>source on GitHub</a
      >.
    </p>
  </div>
</dialog>

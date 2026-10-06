<script lang="ts">
  import { documentStore } from '$lib/document.svelte';
  import HelpDialog from './HelpDialog.svelte';
  import Icon from './Icon.svelte';
  import {
    documentToJson,
    parseImportedDocument,
  } from '@richardmcquiston01/material-colors-grid';

  let fileInput = $state<HTMLInputElement>();
  let error = $state('');
  let helpOpen = $state(false);

  function exportJson() {
    const blob = new Blob([documentToJson(documentStore.current)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'color-grid.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(event: Event) {
    error = '';
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const result = parseImportedDocument(await file.text());
    if (result.ok) {
      documentStore.replace(result.document);
    } else {
      error = result.error;
    }
    input.value = ''; // allow re-importing the same file
  }

  function reset() {
    if (confirm('Reset to a blank document? This cannot be undone.')) {
      documentStore.reset();
    }
  }

  const btnClass =
    'flex items-center gap-1.5 rounded-md border border-white/40 px-3 py-1.5 ' +
    'text-sm font-medium ' +
    'text-white transition-colors hover:bg-white/10 focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-white';
</script>

<div class="flex flex-wrap items-center gap-2">
  <button
    type="button"
    onclick={() => (helpOpen = true)}
    aria-label="About this package and how to install it"
    aria-haspopup="dialog"
    title="About this package and how to install it"
    class="{btnClass} px-2"
  >
    <Icon name="help" class="h-5 w-5" />
  </button>
  <button type="button" onclick={exportJson} class={btnClass}>
    <Icon name="download" />
    Export JSON
  </button>
  <button type="button" onclick={() => fileInput?.click()} class={btnClass}>
    <Icon name="upload" />
    Import JSON
  </button>
  <button type="button" onclick={reset} class={btnClass}>
    <Icon name="reset" />
    Reset
  </button>

  <input
    bind:this={fileInput}
    type="file"
    accept="application/json,.json"
    onchange={importJson}
    class="sr-only"
    aria-hidden="true"
    tabindex="-1"
  />
</div>

<HelpDialog bind:open={helpOpen} />

{#if error}
  <p role="alert" class="mt-2 text-sm text-red-100">
    {error}
  </p>
{/if}

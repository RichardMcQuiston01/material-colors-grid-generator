<script lang="ts">
  import { documentStore } from '$lib/document.svelte';
  import { documentToJson, parseImportedDocument } from '$lib/import-export';

  let fileInput = $state<HTMLInputElement>();
  let error = $state('');

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
    'rounded-md border border-white/40 px-3 py-1.5 text-sm font-medium ' +
    'text-white transition-colors hover:bg-white/10 focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-white';
</script>

<div class="flex flex-wrap items-center gap-2">
  <button type="button" onclick={exportJson} class={btnClass}>
    Export JSON
  </button>
  <button type="button" onclick={() => fileInput?.click()} class={btnClass}>
    Import JSON
  </button>
  <button type="button" onclick={reset} class={btnClass}>Reset</button>

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

{#if error}
  <p role="alert" class="mt-2 text-sm text-red-100">
    {error}
  </p>
{/if}

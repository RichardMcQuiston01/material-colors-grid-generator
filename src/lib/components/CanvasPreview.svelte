<script lang="ts">
  import { documentStore } from '$lib/document.svelte';
  import { drawDocument } from '$lib/renderer';

  let canvas = $state<HTMLCanvasElement>();

  // Repaint whenever the document changes; reading documentStore.current
  // inside drawDocument registers the reactive dependency.
  $effect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) drawDocument(ctx, documentStore.current);
  });

  function downloadPng() {
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'color-grid.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
</script>

<section aria-labelledby="preview-heading" class="flex flex-col gap-3">
  <div class="flex items-center justify-between">
    <h2 id="preview-heading" class="text-lg font-semibold text-gray-900">
      Preview
    </h2>
    <button
      type="button"
      onclick={downloadPng}
      title="Download the rendered grid as a PNG image"
      class="rounded-md bg-brand-700 px-4 py-2 text-sm font-medium text-white
        transition-colors hover:bg-brand-800 focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      Download PNG
    </button>
  </div>

  <div class="overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3">
    <canvas
      bind:this={canvas}
      aria-label="Rendered color grid preview"
      class="h-auto w-full max-w-full"
    ></canvas>
  </div>
</section>

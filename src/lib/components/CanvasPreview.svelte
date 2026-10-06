<script lang="ts">
  import { documentStore } from '$lib/document.svelte';
  import {
    canvasToBlob,
    renderToCanvas,
  } from '@richardmcquiston01/material-colors-grid';

  let canvas = $state<HTMLCanvasElement>();
  let watermarkImage = $state<HTMLImageElement | null>(null);
  let renderError = $state<string | null>(null);
  let downloadError = $state<string | null>(null);

  // Load the watermark image whenever its data URL changes; setting the loaded
  // image triggers the repaint effect below once it is ready to draw.
  $effect(() => {
    const url = documentStore.current.style.watermark.dataUrl;
    if (!url) {
      watermarkImage = null;
      return;
    }
    const image = new Image();
    image.onload = () => {
      watermarkImage = image;
    };
    image.src = url;
  });

  // Repaint whenever the document or the loaded watermark changes; reading
  // documentStore.current inside renderToCanvas registers the dependency.
  $effect(() => {
    if (!canvas) return;
    const result = renderToCanvas(canvas, documentStore.current, {
      watermarkImage,
    });
    renderError = result.ok ? null : result.error;
  });

  async function downloadPng(): Promise<void> {
    if (!canvas) return;
    const result = await canvasToBlob(canvas, 'image/png');
    if (!result.ok) {
      downloadError = result.error;
      return;
    }
    downloadError = null;

    const objectUrl = URL.createObjectURL(result.blob);
    const link = document.createElement('a');
    link.download = 'color-grid.png';
    link.href = objectUrl;
    link.click();
    // Give the browser time to start the download before releasing the URL.
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
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

  {#if renderError || downloadError}
    <p role="alert" class="text-sm text-red-700">
      {renderError ?? downloadError}
    </p>
  {/if}

  <div class="overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-3">
    <canvas
      bind:this={canvas}
      aria-label="Rendered color grid preview"
      class="h-auto w-full max-w-full"
    ></canvas>
  </div>
</section>

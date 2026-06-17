<script lang="ts">
  import BandControls from '$lib/components/BandControls.svelte';
  import CanvasPreview from '$lib/components/CanvasPreview.svelte';
  import ColorEditor from '$lib/components/ColorEditor.svelte';
  import DocumentActions from '$lib/components/DocumentActions.svelte';
  import FontControls from '$lib/components/FontControls.svelte';
  import StyleControls from '$lib/components/StyleControls.svelte';
  import WatermarkControls from '$lib/components/WatermarkControls.svelte';
</script>

<svelte:head>
  <title>Material Colors Grid Generator</title>
  <meta
    name="description"
    content="Generate a downloadable grid of color swatches for product listings."
  />
</svelte:head>

<div class="min-h-screen bg-gray-100 text-gray-900">
  <header class="bg-brand-700 text-white">
    <div
      class="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 sm:flex-row
        sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-xl font-bold">Material Colors Grid Generator</h1>
        <p class="text-sm text-brand-100">
          Build a downloadable grid of color swatches for product listings.
        </p>
      </div>
      <DocumentActions />
    </div>
  </header>

  <main class="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-2">
    <div class="flex flex-col gap-6">
      <div class="rounded-lg bg-white p-5 shadow-sm">
        <ColorEditor />
      </div>
      <div class="rounded-lg bg-white p-5 shadow-sm">
        <StyleControls />
      </div>
      <div class="rounded-lg bg-white p-5 shadow-sm">
        <FontControls />
      </div>
      <div class="rounded-lg bg-white p-5 shadow-sm">
        <BandControls />
      </div>
      <div class="rounded-lg bg-white p-5 shadow-sm">
        <WatermarkControls />
      </div>
    </div>

    <div class="lg:sticky lg:top-6 lg:self-start">
      <div class="rounded-lg bg-white p-5 shadow-sm">
        <CanvasPreview />
      </div>
    </div>
  </main>
</div>

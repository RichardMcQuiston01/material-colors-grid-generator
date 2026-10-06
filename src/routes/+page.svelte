<script lang="ts">
  import AppFooter from '$lib/components/AppFooter.svelte';
  import AppHeader from '$lib/components/AppHeader.svelte';
  import BandControls from '$lib/components/BandControls.svelte';
  import CanvasPreview from '$lib/components/CanvasPreview.svelte';
  import ColorEditor from '$lib/components/ColorEditor.svelte';
  import FontControls from '$lib/components/FontControls.svelte';
  import StyleControls from '$lib/components/StyleControls.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import WatermarkControls from '$lib/components/WatermarkControls.svelte';

  type ControlTab = 'colors' | 'style' | 'fonts' | 'bands' | 'watermark';

  const TABS: { id: ControlTab; label: string }[] = [
    { id: 'colors', label: 'Colors' },
    { id: 'style', label: 'Output Style' },
    { id: 'fonts', label: 'Fonts' },
    { id: 'bands', label: 'Header & Footer' },
    { id: 'watermark', label: 'Watermark' },
  ];

  let activeTab = $state<ControlTab>('colors');
</script>

<svelte:head>
  <title>Material Colors Grid Generator</title>
  <meta
    name="description"
    content="Generate a downloadable grid of color swatches for product listings."
  />
</svelte:head>

<!-- On desktop the app fills the viewport and only the tab panel scrolls (when
     it has to), so the page itself never scrolls. Below lg the columns stack
     and the page scrolls normally. -->
<div
  class="flex min-h-dvh flex-col bg-gray-100 text-gray-900 lg:h-dvh lg:min-h-0"
>
  <AppHeader />

  <main
    class="mx-auto grid min-h-0 w-full max-w-7xl flex-1 gap-4 px-6 py-4
      grid-cols-1 lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)]"
  >
    <div
      class="flex min-h-[28rem] flex-col rounded-lg bg-white shadow-sm lg:min-h-0"
    >
      <Tabs tabs={TABS} label="Settings" bind:active={activeTab}>
        {#snippet panel(id)}
          {#if id === 'colors'}
            <ColorEditor />
          {:else if id === 'style'}
            <StyleControls />
          {:else if id === 'fonts'}
            <FontControls />
          {:else if id === 'bands'}
            <BandControls />
          {:else}
            <WatermarkControls />
          {/if}
        {/snippet}
      </Tabs>
    </div>

    <div
      class="flex min-h-0 min-w-0 flex-col rounded-lg bg-white p-4 shadow-sm"
    >
      <CanvasPreview />
    </div>
  </main>

  <AppFooter />
</div>

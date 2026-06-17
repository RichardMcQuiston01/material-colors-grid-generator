<script lang="ts">
  import { documentStore } from '$lib/document.svelte';
  import type { WatermarkPosition } from '$lib/types';

  const wm = $derived(documentStore.current.style.watermark);

  const positions: { value: WatermarkPosition; label: string }[] = [
    { value: 'top-left', label: 'Top left' },
    { value: 'top-right', label: 'Top right' },
    { value: 'bottom-left', label: 'Bottom left' },
    { value: 'bottom-right', label: 'Bottom right' },
  ];

  const labelClass = 'block text-sm font-medium text-gray-700';
  const inputClass =
    'mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm ' +
    'shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 ' +
    'focus:ring-brand-600';

  function loadImage(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      wm.dataUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    wm.dataUrl = null;
  }
</script>

<section aria-labelledby="watermark-heading" class="flex flex-col gap-3">
  <h2 id="watermark-heading" class="text-lg font-semibold text-gray-900">
    Watermark
  </h2>

  <label>
    <span class={labelClass}>Image</span>
    <input
      type="file"
      accept="image/*"
      onchange={loadImage}
      class="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded-md
        file:border-0 file:bg-brand-700 file:px-3 file:py-1.5
        file:text-sm file:font-medium file:text-white hover:file:bg-brand-800"
    />
  </label>

  {#if wm.dataUrl}
    <div class="flex items-center gap-3">
      <img
        src={wm.dataUrl}
        alt="Watermark preview"
        class="h-12 w-12 rounded border border-gray-200 object-contain"
      />
      <button
        type="button"
        onclick={removeImage}
        class="rounded-md border border-gray-300 px-3 py-1 text-sm
          text-gray-700 hover:bg-gray-50 focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        Remove watermark
      </button>
    </div>

    <label>
      <span class={labelClass}>Position</span>
      <select bind:value={wm.position} class={inputClass}>
        {#each positions as p (p.value)}
          <option value={p.value}>{p.label}</option>
        {/each}
      </select>
    </label>

    <label>
      <span class={labelClass}
        >Size ({Math.round(wm.scale * 100)}% of width)</span
      >
      <input
        type="range"
        min="0.05"
        max="0.5"
        step="0.01"
        bind:value={wm.scale}
        class="mt-1 w-full accent-brand-700"
      />
    </label>

    <label>
      <span class={labelClass}>Opacity ({Math.round(wm.opacity * 100)}%)</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        bind:value={wm.opacity}
        class="mt-1 w-full accent-brand-700"
      />
    </label>
  {/if}
</section>
